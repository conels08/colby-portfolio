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
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" });

    const notificationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="https://colbynelsen.com/email-header.png" alt="Root Labs" width="560" style="display:block;width:100%;max-width:560px;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:32px 40px;">
              <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#111827;">New Inquiry</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">From</span><br/>
                    <span style="font-size:15px;color:#111827;">${escapeHtml(name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Email</span><br/>
                    <a href="mailto:${escapeHtml(email)}" style="font-size:15px;color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                ${company ? `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Company</span><br/>
                    <span style="font-size:15px;color:#111827;">${escapeHtml(company)}</span>
                  </td>
                </tr>` : ""}
                ${website ? `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Website</span><br/>
                    <a href="${escapeHtml(website)}" style="font-size:15px;color:#2563eb;text-decoration:none;">${escapeHtml(website)}</a>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</span><br/>
                    <p style="margin:8px 0 0;font-size:15px;color:#374151;line-height:1.6;background-color:#f9fafb;border-left:3px solid #2563eb;padding:12px 16px;border-radius:0 6px 6px 0;">${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" style="margin:28px auto 0;">
                <tr>
                  <td bgcolor="#2563eb" style="background-color:#2563eb;border-radius:8px;">
                    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Reply to ${escapeHtml(name)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:16px 40px 24px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Received ${timestamp} PT · colbynelsen.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const notificationText = [
      `From: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      website ? `Website: ${website}` : null,
      "",
      "Message:",
      message,
      "",
      `Received: ${timestamp} PT`,
    ].filter(Boolean).join("\n");

    const { error } = await resend.emails.send({
      from: "Colby Nelsen | Root Labs <colby@rootlabs.io>",
      to: [toEmail],
      replyTo: email,
      subject,
      html: notificationHtml,
      text: notificationText,
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
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- Header: baked-in black image — Gmail cannot override image colors -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="https://colbynelsen.com/email-header.png" alt="Root Labs" width="560" style="display:block;width:100%;max-width:560px;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:40px 40px 32px;">
              <p style="margin:0 0 16px;font-size:16px;color:#111827;">Hi ${escapeHtml(name)},</p>
              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
                Your message came through — thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <p style="margin:0 0 32px;font-size:16px;color:#374151;line-height:1.6;">
                In the meantime, feel free to book a call if you'd rather talk through your project directly.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td bgcolor="#2563eb" style="background-color:#2563eb;border-radius:8px;">
                    <a href="https://calendly.com/colbynelsen/phone-meeting" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">Book a Free Call</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:24px 40px;border-top:1px solid #e5e7eb;">
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
