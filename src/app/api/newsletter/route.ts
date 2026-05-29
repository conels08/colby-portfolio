import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";
import { rejectInvalidOrigin, rejectRateLimited } from "@/lib/security";

const newsletterPayloadSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(120).optional(),
  honey: z.string().optional(),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(req: Request) {
  try {
    const originError = rejectInvalidOrigin(req);
    if (originError) {
      return originError;
    }

    const rateLimitError = rejectRateLimited(req, {
      key: "newsletter",
      maxRequests: 8,
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

    const honeyValue =
      rawPayload &&
      typeof rawPayload === "object" &&
      "honey" in rawPayload
        ? (rawPayload as { honey?: unknown }).honey
        : undefined;

    if (honeyValue && String(honeyValue).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = newsletterPayloadSchema.safeParse(rawPayload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { email, source } = parsed.data;
    const normalizedSource = source ?? "portfolio_home";
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Newsletter API misconfigured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
      return NextResponse.json(
        { ok: false, error: "Newsletter service not configured." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      source: normalizedSource,
      status: "subscribed",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }

      console.error("Newsletter insert failed:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to subscribe." },
        { status: 500 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;

    if (resendKey) {
      const welcomeResend = new Resend(resendKey);

      const welcomeHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- Header image — black bg baked in, Gmail-proof -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="https://colbynelsen.com/email-header.png" alt="Root Labs" width="560" style="display:block;width:100%;max-width:560px;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">You're on the list.</p>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;">Welcome to the Root Labs newsletter.</p>

              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.7;">
                I build AI-powered web apps and automations — and occasionally write about what I'm working on, tools worth using, and things I learn along the way.
              </p>
              <p style="margin:0 0 32px;font-size:16px;color:#374151;line-height:1.7;">
                No fluff, no spam. Just occasional updates when there's something worth sharing.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr><td style="border-top:1px solid #e5e7eb;"></td></tr>
              </table>

              <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">What to expect</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:15px;color:#374151;">🛠 Project updates &amp; launches</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:15px;color:#374151;">🤖 AI tools and workflows worth knowing</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <span style="font-size:15px;color:#374151;">🎁 Early access to things I'm building</span>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" style="margin:0 auto 0;">
                <tr>
                  <td bgcolor="#2563eb" style="background-color:#2563eb;border-radius:8px;">
                    <a href="https://colbynelsen.com/work" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">See What I've Built</a>
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
              <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">You subscribed at colbynelsen.com. No spam, ever.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      const { error: welcomeError } = await welcomeResend.emails.send({
        from: "Colby Nelsen | Root Labs <colby@rootlabs.io>",
        to: [email],
        subject: "Welcome — you're on the list",
        html: welcomeHtml,
        text: `Hey,\n\nYou're on the list. Welcome to the Root Labs newsletter.\n\nI build AI-powered web apps and automations — and occasionally write about what I'm working on, tools worth using, and things I learn along the way.\n\nNo fluff, no spam. Just occasional updates when there's something worth sharing.\n\n— Colby\nRoot Labs | rootlabs.io`,
      });

      if (welcomeError) {
        console.error("Newsletter welcome email send failed:", welcomeError);
      }
    }

    if (!resendKey || !notifyTo) {
      console.error(
        "Newsletter notification skipped: missing RESEND_API_KEY or NEWSLETTER_NOTIFY_TO."
      );
    } else {
      const resend = new Resend(resendKey);
      const timestamp = new Date().toISOString();
      const { error: sendError } = await resend.emails.send({
        from: "Colby Nelsen | Root Labs <colby@rootlabs.io>",
        to: [notifyTo],
        subject: "New Newsletter Subscriber",
        html: `
          <p>New subscriber:</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Source:</strong> ${escapeHtml(normalizedSource)}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
        `,
      });

      if (sendError) {
        console.error("Newsletter notification send failed:", sendError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected newsletter API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
