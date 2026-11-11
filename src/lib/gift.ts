/**
 * Gift voucher (M6-S01): pure helpers shared by the gift, thanks and redeem pages. No imports, so the
 * unit tests (`npm test`, node:test) run them directly. Contract: CONTRACT.md §5.1, §7.2, §8.
 *
 * Privacy rule: a voucher code is never put in a URL, localStorage, sessionStorage or an analytics event.
 * Nothing in this file stores anything.
 */

export type GiftLocale = "sl" | "en";

/** One constant for price and validity (contract §8.1). Defaults from spec §7. */
export const GIFT_PRICE_EUR = 49.99;
export const GIFT_VALID_MONTHS = 12;
export const GIFT_REFUND_DAYS = 14;
/** Last change of the sales page text (sitemap lastmod). */
export const giftUpdated = "2026-11-11";

/** Support address shown on "already redeemed" (contract §8.5). TODO(David): confirm or replace. */
export const GIFT_SUPPORT_EMAIL = "david@petprep.si";

/** Public paths. English at the root, Slovenian under /sl (same rule as pathFor). */
export const giftPaths = {
  gift: { en: "/gift", sl: "/sl/darilni-bon" },
  thanks: { en: "/gift/thanks", sl: "/sl/darilni-bon/hvala" },
  redeem: { en: "/redeem", sl: "/sl/unovci" },
  /** Promise kit page (M6-S02, fixed by the spec); linked only while its own switch is on. */
  promiseKit: { en: "/promise-kit", sl: "/sl/obljuba-o-ljubljencku" },
} as const satisfies Record<string, Record<GiftLocale, string>>;
export type GiftPageKey = "gift" | "thanks" | "redeem";

/** Redeem page without the leading slash, as shown on the printed voucher. */
export const redeemDisplayUrl: Record<GiftLocale, string> = { en: "petprep.si/redeem", sl: "petprep.si/sl/unovci" };

/** localStorage key that carries the language (and nothing else) from the gift page to the thanks page. */
export const GIFT_LANG_KEY = "petprep.giftLang";

/** Exactly "1" turns the gift, thanks and redeem pages on. Anything else (unset, "true", "0") = off. */
export function isGiftEnabled(value: string | undefined = process.env.NEXT_PUBLIC_FEATURE_GIFT): boolean {
  return value === "1";
}

/** The promise kit page has its own switch (M6-S02); the gift page links to it only when it is on. */
export function isPromiseKitEnabled(value: string | undefined = process.env.NEXT_PUBLIC_FEATURE_PROMISE_KIT): boolean {
  return value === "1";
}

/** Lemon Squeezy checkout URL; empty/unset/malformed → null (the page then shows a disabled button). */
export function giftBuyUrl(value: string | undefined = process.env.NEXT_PUBLIC_LS_GIFT_URL): string | null {
  const v = value?.trim();
  if (!v) return null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export function apiBase(value: string | undefined = process.env.NEXT_PUBLIC_PETPREP_API_URL): string {
  return (value?.trim() || "https://api.petprep.si").replace(/\/+$/, "");
}

/** All whitespace removed (a code pasted with line breaks or spaces still works). Case is kept for display. */
export function normalizeCode(raw: string): string {
  return raw.replace(/\s+/g, "");
}

/** Client-side format check only: 8–64 characters of [A-Za-z0-9-]. It says nothing about validity. */
export function isPlausibleCode(raw: string): boolean {
  return /^[A-Za-z0-9-]{8,64}$/.test(normalizeCode(raw));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function isPlausibleEmail(raw: string): boolean {
  const v = raw.trim();
  return v.length <= 254 && EMAIL_RE.test(v);
}

/** Today as YYYY-MM-DD in the visitor's own calendar. */
export function todayIso(now: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** YYYY-MM-DD → [y, m, d], or null when it is not a real calendar date. */
function parseIso(iso: string): [number, number, number] | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const check = new Date(Date.UTC(y, mo - 1, d));
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  return [y, mo, d];
}

/**
 * Purchase date + 12 months, clamped to the end of the month (29 Feb + 12 months = 28 Feb), the same rule
 * as the server's addMonthsNoOverflow. Returns YYYY-MM-DD, or null for an invalid date.
 */
export function validUntil(purchaseIso: string, months: number = GIFT_VALID_MONTHS): string | null {
  const parts = parseIso(purchaseIso);
  if (!parts) return null;
  const [y, mo, d] = parts;
  const total = y * 12 + (mo - 1) + months;
  const ny = Math.floor(total / 12);
  const nm = total % 12;
  const last = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${ny}-${p(nm + 1)}-${p(Math.min(d, last))}`;
}

/** "11. 11. 2027" (sl) or "11 November 2027" (en); the date is formatted as a calendar date, no time zone shift. */
export function formatGiftDate(iso: string, locale: GiftLocale): string {
  const parts = parseIso(iso);
  if (!parts) return "";
  const [y, mo, d] = parts;
  return new Intl.DateTimeFormat(locale === "sl" ? "sl-SI" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, mo - 1, d)));
}

export function formatGiftPrice(locale: GiftLocale): string {
  return `${GIFT_PRICE_EUR.toFixed(2).replace(".", locale === "sl" ? "," : ".")} €`;
}

/** Message keys of the redeem form (contract §8.5). */
export const messageKeys = [
  "redeemed",
  "redeemed_already",
  "invalid_request",
  "invalid_code",
  "expired",
  "refunded",
  "already_redeemed",
  "no_account",
  "unavailable",
  "rate_limited",
  "upstream_error",
] as const;
export type MessageKey = (typeof messageKeys)[number];

/**
 * Maps an API answer (HTTP status + parsed body) to a message key. A body that did not parse (null), a
 * network failure (status 0) and every unknown answer count as `upstream_error`: the user is told that
 * nothing was used, which is the truth for anything we did not understand.
 */
export function redeemOutcome(status: number, body: unknown): MessageKey {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (status === 200) {
    if (b?.status === "redeemed") return b.already === true ? "redeemed_already" : "redeemed";
    return "upstream_error";
  }
  const error = typeof b?.error === "string" ? b.error : null;
  switch (`${status}:${error}`) {
    case "422:invalid_request":
      return "invalid_request";
    case "422:invalid_code":
      return "invalid_code";
    case "422:expired":
      return "expired";
    case "422:refunded":
      return "refunded";
    case "422:no_account":
      return "no_account";
    case "409:already_redeemed":
      return "already_redeemed";
    case "429:rate_limited":
      return "rate_limited";
    case "502:upstream_error":
      return "upstream_error";
    case "503:unavailable":
      return "unavailable";
    default:
      return "upstream_error";
  }
}

export function isSuccess(key: MessageKey): boolean {
  return key === "redeemed" || key === "redeemed_already";
}
