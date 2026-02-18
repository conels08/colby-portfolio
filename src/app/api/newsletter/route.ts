import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const newsletterPayloadSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().optional(),
  honey: z.string().optional(),
});

export async function POST(req: Request) {
  try {
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
      source: source ?? "portfolio_home",
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected newsletter API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
