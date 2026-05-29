import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { rejectInvalidOrigin, rejectRateLimited } from "@/lib/security";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(2048).optional(),
  honey: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const originError = rejectInvalidOrigin(req);
    if (originError) {
      return originError;
    }

    const rateLimitError = rejectRateLimited(req, {
      key: "contact",
      maxRequests: 5,
      windowMs: 60_000,
    });
    if (rateLimitError) {
      return rateLimitError;
    }

    let rawPayload: unknown;
    try {
      rawPayload = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const parsed = contactPayloadSchema.safeParse(rawPayload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please complete all required fields correctly." },
        { status: 400 }
      );
    }

    const { name, email, message, company, website, honey } = parsed.data;

    // Honeypot: if filled, silently succeed (bot trap)
    if (honey && honey.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "colbynelsen@gmail.com";

    if (!resendKey) {
      console.error("Contact API misconfigured: missing RESEND_API_KEY.");
      return NextResponse.json(
        { ok: false, error: "Email service not configured on server." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const subject = `New inquiry from ${name} — Root Labs`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      website ? `Website: ${website}` : null,
      "",
      "Message:",
      message,
      "",
      `Timestamp: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: "Colby Nelsen | Root Labs <colby@rootlabs.io>",
      to: [toEmail],
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message." },
        { status: 502 }
      );
    }

    // Auto-reply confirmation to the person who submitted
    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#000000 !important;padding:32px 40px;text-align:center;mso-padding-alt:32px 40px;">
              <img src="https://colbynelsen.com/rootlabs-logo-transparent.png" alt="Root Labs" width="160" style="display:block;margin:0 auto;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 16px;font-size:16px;color:#111827;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
                Your message came through — thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <p style="margin:0 0 32px;font-size:16px;color:#374151;line-height:1.6;">
                In the meantime, feel free to book a call if you'd rather talk through your project directly.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background-color:#2563eb;border-radius:8px;">
                    <a href="https://calendly.com/colbynelsen/phone-meeting" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Book a Free Call</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:14px;color:#6b7280;">Colby Nelsen — Founder &amp; Developer</p>
              <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">
                <a href="mailto:colby@rootlabs.io" style="color:#2563eb;text-decoration:none;">colby@rootlabs.io</a>
                &nbsp;·&nbsp;
                <a href="https://rootlabs.io" style="color:#2563eb;text-decoration:none;">rootlabs.io</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const autoReplyText = `Hi ${name},\n\nYour message came through — thanks for reaching out. I'll get back to you within 24 hours.\n\nIn the meantime, feel free to book a call:\nhttps://calendly.com/colbynelsen/phone-meeting\n\nColby Nelsen\nFounder & Developer — Root Labs\ncolby@rootlabs.io | rootlabs.io`;

    // Best-effort — don't fail the request if this errors
    await resend.emails.send({
      from: "Colby Nelsen | Root Labs <colby@rootlabs.io>",
      to: [email],
      subject: "Got your message — I'll be in touch soon",
      html: autoReplyHtml,
      text: autoReplyText,
    }).catch((autoReplyErr) => {
      console.error("Auto-reply failed (non-blocking):", autoReplyErr);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
