import { NextResponse } from "next/server";

type RateLimitOptions = {
  key: string;
  maxRequests: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://colbynelsen.com";
const RATE_LIMIT_STORE_KEY = "__portfolioRateLimitStore__";

const getRateLimitStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __portfolioRateLimitStore__?: Map<string, RateLimitEntry>;
  };

  if (!globalStore[RATE_LIMIT_STORE_KEY]) {
    globalStore[RATE_LIMIT_STORE_KEY] = new Map<string, RateLimitEntry>();
  }

  return globalStore[RATE_LIMIT_STORE_KEY];
};

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown";
};

export const rejectInvalidOrigin = (req: Request) => {
  const allowedUrl = new URL(SITE_URL);
  const origin = req.headers.get("origin");

  if (origin) {
    try {
      const originUrl = new URL(origin);
      const isDevelopment = process.env.NODE_ENV !== "production";
      const isLocalhostOrigin =
        originUrl.hostname === "localhost" ||
        originUrl.hostname === "127.0.0.1";

      if (isDevelopment && isLocalhostOrigin) {
        return null;
      }

      if (
        originUrl.protocol !== allowedUrl.protocol ||
        originUrl.host !== allowedUrl.host
      ) {
        return NextResponse.json(
          { ok: false, error: "Invalid request origin." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request origin." },
        { status: 403 }
      );
    }
  }

  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
    return NextResponse.json(
      { ok: false, error: "Cross-site requests are not allowed." },
      { status: 403 }
    );
  }

  return null;
};

export const rejectRateLimited = (
  req: Request,
  { key, maxRequests, windowMs }: RateLimitOptions
) => {
  const store = getRateLimitStore();
  const now = Date.now();
  const clientIp = getClientIp(req);
  const storeKey = `${key}:${clientIp}`;
  const existing = store.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    store.set(storeKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  existing.count += 1;
  store.set(storeKey, existing);

  if (existing.count > maxRequests) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((existing.resetAt - now) / 1000)
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  if (store.size > 1000) {
    for (const [entryKey, entryValue] of store.entries()) {
      if (entryValue.resetAt <= now) {
        store.delete(entryKey);
      }
    }
  }

  return null;
};
