import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { rejectInvalidOrigin, rejectRateLimited } from "@/lib/security";

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

    const subject = `Portfolio inquiry from ${name}`;
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
      from: "Colby Portfolio <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email, // so you can hit Reply in Gmail
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
