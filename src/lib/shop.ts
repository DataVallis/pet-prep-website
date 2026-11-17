/**
 * Website shop on Stripe (M6-S09): pure helpers for the buy buttons, the thank-you pages and the free kit sample.
 * Relative imports only, so `npm test` (node:test) runs them directly.
 *
 * Contract (pet-prep, docs/business/WEBSITE_SALES_SPEC.md §3.4):
 * - POST /api/shop/checkout {product, locale, success_path, cancel_path} → 200 {url} · 422 invalid_request ·
 *   429 · 502 upstream_error · 503 unavailable. The paths are paths on petprep.si; the server adds
 *   `?session_id={CHECKOUT_SESSION_ID}` to the success path and refuses anything that is not a plain path.
 * - GET /api/shop/orders/{session_id} → 200 order · 202 {status: pending} · 404 not_found · 429 · 502 upstream_error.
 * - POST /api/summary-leads {source: promise_kit_sample, …} → 201 {ok, sample_url?}.
 *
 * Privacy: the session id is the only thing read from the address; the voucher code comes from our API and is
 * never written to a URL, storage or an analytics event.
 */
import { localeMeta, locales, salesSlugs, type Locale } from "../i18n/config.ts";
import { apiBase, giftPath, promiseKitHref } from "./gift.ts";

export type ShopProduct = "gift_voucher" | "promise_kit";

/** Path of the kit's thank-you page: a child of the kit page, with the same "thanks" word as the gift page. */
export function kitThanksPath(locale: Locale): string {
  return `${promiseKitHref(locale)}/${salesSlugs.giftThanks[locale]}`;
}

/** Every kit thank-you path (private-page list, language switcher). */
export function kitThanksPathsOf(): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, kitThanksPath(l)])) as Record<Locale, string>;
}

/** Where the buyer comes back to after paying (success) or after leaving the checkout (cancel). */
export function checkoutPaths(product: ShopProduct, locale: Locale): { success_path: string; cancel_path: string } {
  return product === "gift_voucher"
    ? { success_path: giftPath(locale, "thanks"), cancel_path: giftPath(locale, "gift") }
    : { success_path: kitThanksPath(locale), cancel_path: promiseKitHref(locale) };
}

/** The same rule as the server (ShopCheckoutRequest::PATH_RULE): a plain lower-case path on our own site. */
export function isSafeReturnPath(path: string): boolean {
  return /^\/(?!\/)[a-z0-9/-]{0,200}$/.test(path);
}

export function checkoutBody(product: ShopProduct, locale: Locale): string {
  return JSON.stringify({ product, locale, ...checkoutPaths(product, locale) });
}

export const checkoutUrlOf = (base: string = apiBase()) => `${base}/api/shop/checkout`;

export type CheckoutError = "unavailable" | "rate_limited" | "error";
export type CheckoutResult = { url: string } | { error: CheckoutError };

/** Only a Stripe-hosted https checkout page is followed; anything else is an error (never an open redirect). */
export function isStripeCheckoutUrl(raw: unknown): raw is string {
  if (typeof raw !== "string") return false;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && (u.hostname === "checkout.stripe.com" || u.hostname.endsWith(".stripe.com") || u.hostname === "buy.link.com" || u.hostname.endsWith(".link.com"));
  } catch {
    return false;
  }
}

export function checkoutOutcome(status: number, body: unknown): CheckoutResult {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (status === 200 && isStripeCheckoutUrl(b?.url)) return { url: b.url as string };
  if (status === 503) return { error: "unavailable" };
  if (status === 429) return { error: "rate_limited" };
  return { error: "error" };
}

/** Stripe Checkout Session ids look like `cs_test_…` / `cs_live_…` (the server route accepts the same shape). */
export function isPlausibleSessionId(raw: string | null | undefined): raw is string {
  return typeof raw === "string" && /^cs_[A-Za-z0-9_]{10,250}$/.test(raw);
}

/** `session_id` from a query string, or null when it is missing or not a Checkout Session id. */
export function sessionIdFrom(search: string): string | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }
  const id = params.get("session_id");
  return isPlausibleSessionId(id) ? id : null;
}

export const orderUrlOf = (sessionId: string, base: string = apiBase()) => `${base}/api/shop/orders/${encodeURIComponent(sessionId)}`;

export type VoucherInfo = { code: string; purchasedAt: string; expiresAt: string; status: "purchased" | "redeemed" | "refunded" | "expired" | "disabled" };
export type Download = { locale: Locale; url: string };
export type PaidOrder = {
  kind: "paid";
  product: ShopProduct;
  orderNumber: string;
  emailMasked: string | null;
  voucher: VoucherInfo | null;
  downloads: Download[];
};
export type OrderState =
  | PaidOrder
  | { kind: "pending" }
  | { kind: "refunded" }
  | { kind: "failed" }
  | { kind: "not_found" }
  | { kind: "error" };

const VOUCHER_STATUSES = ["purchased", "redeemed", "refunded", "expired", "disabled"] as const;

function str(v: unknown): string | null {
  return typeof v === "string" && v !== "" ? v : null;
}

/** Only links to our own API are shown (a download link is a signed URL on the API host). */
export function isOwnDownloadUrl(raw: unknown, base: string = apiBase()): raw is string {
  if (typeof raw !== "string") return false;
  try {
    const u = new URL(raw);
    const b = new URL(base);
    return (u.protocol === "https:" || b.protocol === "http:") && u.host === b.host;
  } catch {
    return false;
  }
}

/** Maps the order answer to what the page shows. Anything not understood is `error` (the e-mail has everything). */
export function orderOutcome(status: number, body: unknown, base: string = apiBase()): OrderState {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (status === 202) return { kind: "pending" };
  if (status === 404) return { kind: "not_found" };
  if (status !== 200 || !b) return { kind: "error" };
  if (b.status === "refunded") return { kind: "refunded" };
  if (b.status === "failed") return { kind: "failed" };
  if (b.status !== "paid" && b.status !== "partially_refunded" && b.status !== "disputed") return { kind: "error" };
  const product = b.product === "gift_voucher" || b.product === "promise_kit" ? b.product : null;
  const orderNumber = str(b.order_number);
  if (!product || !orderNumber) return { kind: "error" };
  let voucher: VoucherInfo | null = null;
  const v = b.voucher && typeof b.voucher === "object" ? (b.voucher as Record<string, unknown>) : null;
  if (v) {
    const code = str(v.code);
    const vs = VOUCHER_STATUSES.find((s) => s === v.status);
    const purchasedAt = str(v.purchased_at);
    const expiresAt = str(v.expires_at);
    if (code && vs && purchasedAt && expiresAt) voucher = { code, status: vs, purchasedAt, expiresAt };
  }
  const downloads: Download[] = [];
  if (Array.isArray(b.downloads)) {
    for (const d of b.downloads) {
      const row = d && typeof d === "object" ? (d as Record<string, unknown>) : null;
      const l = locales.find((x) => x === row?.locale);
      if (l && isOwnDownloadUrl(row?.url, base)) downloads.push({ locale: l, url: row!.url as string });
    }
  }
  return { kind: "paid", product, orderNumber, emailMasked: str(b.email_masked), voucher, downloads };
}

/** Thank-you page polling while the payment is being confirmed: every 3 s, for at most 2 minutes. */
export const ORDER_POLL_MS = 3000;
export const ORDER_POLL_MAX_MS = 120_000;
export function shouldPollAgain(state: OrderState, elapsedMs: number): boolean {
  return state.kind === "pending" && elapsedMs + ORDER_POLL_MS <= ORDER_POLL_MAX_MS;
}

/** "2027-11-17T10:00:00+00:00" → the calendar date in the buyer's language ("17. november 2027"). */
export function formatOrderDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(localeMeta[locale].intl, { dateStyle: "long", timeZone: "Europe/Ljubljana" }).format(d);
}

/** "{email}" / "{date}" placeholders of the shop copy. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? values[k] : m));
}

/* ------------------------------------------------------------------ free kit sample (summary-leads) */

/** The newsletter consent wording the sample form shows (server SummaryLead::CONSENT_VERSIONS). */
export const SAMPLE_CONSENT_VERSION = "2026-11";
export const sampleUrlOf = (base: string = apiBase()) => `${base}/api/summary-leads`;

export function sampleBody(email: string, locale: Locale, honeypot = ""): string {
  return JSON.stringify({ email: email.trim().toLowerCase(), consent: true, consent_version: SAMPLE_CONSENT_VERSION, source: "promise_kit_sample", locale, website: honeypot });
}

export type SampleResult = { url: string } | { error: "not_ready" | "email" | "rate_limited" | "error" };

export function sampleOutcome(status: number, body: unknown, base: string = apiBase()): SampleResult {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (status === 201) return isOwnDownloadUrl(b?.sample_url, base) ? { url: b!.sample_url as string } : { error: "not_ready" };
  if (status === 422) return { error: "email" };
  if (status === 429) return { error: "rate_limited" };
  return { error: "error" };
}
