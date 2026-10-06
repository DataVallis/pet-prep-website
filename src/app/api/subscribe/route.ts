import { NextResponse, type NextRequest } from "next/server";
import { klaviyoConfig, subscribeToEarlyAccess } from "@/lib/klaviyo";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

// Simple in-memory limit per client IP (one container; resets on deploy).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still rate limited
  try {
    const host = new URL(origin).host;
    return host === new URL(site.url).host || host === `www.${new URL(site.url).host}` || host === req.headers.get("host");
  } catch {
    return false;
  }
}

/** Diagnostics without secrets: is Klaviyo configured in this container? */
export function GET() {
  const cfg = klaviyoConfig();
  return NextResponse.json(
    { configured: Boolean(cfg), listIdLength: cfg?.listId.length ?? 0, revision: cfg?.revision ?? null },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success to bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const language = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "en";
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const cfg = klaviyoConfig();
  if (!cfg) {
    console.error("[subscribe] KLAVIYO_PRIVATE_API_KEY or KLAVIYO_LIST_ID is not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const result = await subscribeToEarlyAccess(cfg, { email, language, page });
    if (result.ok) return NextResponse.json({ ok: true });
    console.error(`[subscribe] Klaviyo answered ${result.status}: ${result.detail}`);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  } catch (e) {
    console.error("[subscribe] Klaviyo request failed:", e);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
