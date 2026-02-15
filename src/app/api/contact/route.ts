import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message, company, website, honey } = await req.json();

    // Honeypot: if filled, silently succeed (bot trap)
    if (honey) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
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
