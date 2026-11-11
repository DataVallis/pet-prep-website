/**
 * Gift voucher (M6-S01): pure helpers shared by the gift, thanks and redeem pages. Relative imports only, so the
 * unit tests (`npm test`, node:test) run them directly. Contract: CONTRACT.md §5.1, §7.2, §8.
 *
 * Privacy rule: a voucher code is never put in a URL, localStorage, sessionStorage or an analytics event.
 * Nothing in this file stores anything.
 */

import { isLocale, localeMeta, locales, salesSlugs, type Locale } from "../i18n/config.ts";

/** Gift pages exist in every site language (David 2026-11-11). */
export type GiftLocale = Locale;

/** One constant for price and validity (contract §8.1). Defaults from spec §7. */
export const GIFT_PRICE_EUR = 49.99;
export const GIFT_VALID_MONTHS = 12;
export const GIFT_REFUND_DAYS = 14;
/** Last change of the sales page text (sitemap lastmod). */
export const giftUpdated = "2026-11-11";

/** Support address shown on "already redeemed" (contract §8.5). TODO(David): confirm or replace. */
export const GIFT_SUPPORT_EMAIL = "david@petprep.si";

const prefixOf = (locale: Locale) => (locale === "en" ? "" : `/${locale}`);

/** Public path of a gift page in a language: `/gift`, `/gift/thanks`, `/redeem` (en); `/sl/darilni-bon/hvala` (sl); `/de/einloesen` (de) … */
export function giftPath(locale: Locale, page: GiftPageKey): string {
  const p = prefixOf(locale);
  if (page === "gift") return `${p}/${salesSlugs.gift[locale]}`;
  if (page === "thanks") return `${p}/${salesSlugs.gift[locale]}/${salesSlugs.giftThanks[locale]}`;
  return `${p}/${salesSlugs.redeem[locale]}`;
}
export type GiftPageKey = "gift" | "thanks" | "redeem";

/** The same page in every language (hreflang, language switcher). */
export function giftPathsOf(page: GiftPageKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, giftPath(l, page)])) as Record<Locale, string>;
}

/** Promise kit page (M6-S02); linked from the gift pages only while its own switch is on. */
export function promiseKitHref(locale: Locale): string {
  return `${prefixOf(locale)}/${salesSlugs.promiseKit[locale]}`;
}

/** Redeem page without the leading slash, as shown on the printed voucher. */
export function redeemDisplayUrl(locale: Locale): string {
  return `petprep.si${giftPath(locale, "redeem")}`;
}

/** Reads the language marker the buy button stored: any of the 15 site languages, otherwise null. */
export function storedGiftLocale(raw: string | null | undefined): Locale | null {
  return raw && isLocale(raw) ? raw : null;
}

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

/** Sign-in e-mail field: a format check only (the server decides). */
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

/** "11. november 2027" (sl), "11 November 2027" (en), … in the language's own format; a calendar date, no time zone shift. */
export function formatGiftDate(iso: string, locale: GiftLocale): string {
  const parts = parseIso(iso);
  if (!parts) return "";
  const [y, mo, d] = parts;
  return new Intl.DateTimeFormat(localeMeta[locale].intl, { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, mo - 1, d)));
}

/** Euro amount in the language's own format (Intl): "49,99 €" (sl, de, fr, …), "€49.99" (en). */
export function formatEuro(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeMeta[locale].intl, { style: "currency", currency: "EUR" }).format(amount);
}

export function formatGiftPrice(locale: GiftLocale): string {
  return formatEuro(GIFT_PRICE_EUR, locale);
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
  "unavailable",
  "rate_limited",
  "upstream_error",
  "timeout",
  // Sign-in (M6-S01b, CONTRACT_WEB_SIGNIN §5.5): produced by src/lib/webSignin.ts and by a 401/403 from redeem.
  "signin_invalid_credentials",
  "signin_invalid_token",
  "signin_account_not_found",
  "signin_not_parent",
  "signin_rate_limited",
  "signin_unavailable",
  "signin_cancelled",
  "signin_failed",
  "session_expired",
] as const;
export type MessageKey = (typeof messageKeys)[number];

/** Keys that mean "the sign-in is over, go back to step 1". */
export const signInKeys: readonly MessageKey[] = [
  "signin_invalid_credentials",
  "signin_invalid_token",
  "signin_account_not_found",
  "signin_not_parent",
  "signin_rate_limited",
  "signin_unavailable",
  "signin_cancelled",
  "signin_failed",
  "session_expired",
];

/** Key only the browser can produce (the request was aborted after the client timeout); the API never sends it. */
export const clientOnlyKeys: readonly MessageKey[] = ["timeout"];

/**
 * Pages whose content must never reach third-party scripts (analytics, tag managers): the thanks page shows the
 * code, the redeem page takes code, e-mail and password, and /auth/return briefly holds the ID token in the address.
 * Matches the public paths of all 15 languages, with or without the internal /en prefix.
 */
export function isGiftPrivatePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const bare = p.replace(/^\/en(?=\/)/, "");
  return privatePaths.has(bare);
}
/** Return page of the Google / Apple full-page sign-in redirect (one URL for all languages, M6-S01b). */
export const AUTH_RETURN_PATH = "/auth/return";
const privatePaths: ReadonlySet<string> = new Set([AUTH_RETURN_PATH, ...locales.flatMap((l) => [giftPath(l, "thanks"), giftPath(l, "redeem")])]);

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
  // M6-S01b: the web sign-in token is the only credential. Missing/expired → sign in again; not a parent → say so.
  if (status === 401 && error === "unauthenticated") return "session_expired";
  if (status === 403 && error === "not_parent") return "signin_not_parent";
  switch (`${status}:${error}`) {
    case "422:invalid_request":
      return "invalid_request";
    case "422:invalid_code":
      return "invalid_code";
    case "422:expired":
      return "expired";
    case "422:refunded":
      return "refunded";
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
