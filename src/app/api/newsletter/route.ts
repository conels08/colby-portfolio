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

    if (!resendKey || !notifyTo) {
      console.error(
        "Newsletter notification skipped: missing RESEND_API_KEY or NEWSLETTER_NOTIFY_TO."
      );
    } else {
      const resend = new Resend(resendKey);
      const timestamp = new Date().toISOString();
      const { error: sendError } = await resend.emails.send({
        from: "Colby Portfolio <onboarding@resend.dev>",
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
