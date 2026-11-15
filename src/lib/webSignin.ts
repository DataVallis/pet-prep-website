/**
 * Web sign-in for gift voucher redemption (M6-S01b, CONTRACT_WEB_SIGNIN.md). Pure helpers shared by the redeem
 * flow and the /auth/return page; relative imports only, so `npm test` (node:test) runs them directly.
 *
 * Rules (contract §1.8, §2.3, §5.3):
 * - Google and Apple sign in by a full-page redirect (OIDC, `id_token` in the URL fragment). No provider script is
 *   ever loaded on this site.
 * - The web session token lives in JS memory only. The one exception is the read-once redirect handoff
 *   (`petprep.webSession.handoff`, at most 60 s old) from /auth/return to the redeem page.
 * - Nothing in this file writes to the browser console, and the token, the ID token and the nonce never go into a URL.
 */

import { apiBase, giftPath, type MessageKey } from "./gift.ts";
import { isLocale, type Locale } from "../i18n/config.ts";

export type SignInProvider = "google" | "apple";

/** sessionStorage keys (contract §5.3). */
export const SIGNIN_KEY = "petprep.signin";
export const HANDOFF_KEY = "petprep.webSession.handoff";
/** The sign-in entry is ignored after 10 minutes, the handoff after 60 seconds. */
export const SIGNIN_MAX_AGE_MS = 10 * 60 * 1000;
export const HANDOFF_MAX_AGE_MS = 60 * 1000;

/** The part of `Storage` this module uses (sessionStorage in the browser, a fake in the tests). */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const AUTH_ENDPOINTS = {
  google: "https://accounts.google.com/o/oauth2/v2/auth",
  apple: "https://appleid.apple.com/auth/authorize",
} as const;

/** Public identifiers (not secrets). Empty/unset → that sign-in button is not rendered. */
export function googleClientId(value: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID): string | null {
  const v = value?.trim();
  return v ? v : null;
}
export function appleServicesId(value: string | undefined = process.env.NEXT_PUBLIC_APPLE_SERVICES_ID): string | null {
  const v = value?.trim();
  return v ? v : null;
}
/** Which of the two redirect sign-ins have an id configured, in display order. */
export function availableProviders(
  google: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  apple: string | undefined = process.env.NEXT_PUBLIC_APPLE_SERVICES_ID,
): SignInProvider[] {
  return [...(googleClientId(google) ? (["google"] as const) : []), ...(appleServicesId(apple) ? (["apple"] as const) : [])];
}

/** Fixed return URL for every language: `${origin}/auth/return`. */
export function returnUrl(origin: string): string {
  return `${origin.replace(/\/+$/, "")}/auth/return`;
}

const enc = encodeURIComponent;
const query = (pairs: [string, string][]) => pairs.map(([k, v]) => `${k}=${enc(v)}`).join("&");

/** Google OIDC implicit flow, §2.1 (exactly these parameters). */
export function googleAuthUrl(p: { clientId: string; redirectUri: string; nonceHash: string; state: string }): string {
  return `${AUTH_ENDPOINTS.google}?${query([
    ["client_id", p.clientId],
    ["redirect_uri", p.redirectUri],
    ["response_type", "id_token"],
    ["scope", "openid"],
    ["nonce", p.nonceHash],
    ["state", p.state],
    ["prompt", "select_account"],
  ])}`;
}

/** Apple, §2.2: fragment response, no `scope` (no name and no e-mail are asked for or received). */
export function appleAuthUrl(p: { servicesId: string; redirectUri: string; nonceHash: string; state: string }): string {
  return `${AUTH_ENDPOINTS.apple}?${query([
    ["client_id", p.servicesId],
    ["redirect_uri", p.redirectUri],
    ["response_type", "code id_token"],
    ["response_mode", "fragment"],
    ["nonce", p.nonceHash],
    ["state", p.state],
  ])}`;
}

/** Lowercase hex SHA-256 of a string (the provider gets the hash of the nonce, the API gets the raw nonce). */
export async function sha256Hex(text: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** 32 random bytes as base64url (no padding). */
export function randomToken(bytes: Uint8Array = globalThis.crypto.getRandomValues(new Uint8Array(32))): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export type SignInEntry = { state: string; rawNonce: string; provider: SignInProvider; locale: Locale; createdAt: number };

/**
 * Prepares a redirect sign-in: random state and nonce, the entry stored in sessionStorage, and the URL to go to.
 * Returns null when the provider has no id configured. The caller then does `location.assign(url)`.
 */
export async function beginSignIn(args: {
  provider: SignInProvider;
  locale: Locale;
  redirectUri: string;
  storage: StorageLike;
  now?: number;
  googleId?: string | null;
  appleId?: string | null;
  random?: () => string;
}): Promise<string | null> {
  const random = args.random ?? (() => randomToken());
  const clean = (v: string | null) => v?.trim() || null;
  const googleId = args.googleId === undefined ? googleClientId() : clean(args.googleId);
  const appleId = args.appleId === undefined ? appleServicesId() : clean(args.appleId);
  const id = args.provider === "google" ? googleId : appleId;
  if (!id) return null;
  const state = random();
  const rawNonce = random();
  const nonceHash = await sha256Hex(rawNonce);
  const entry: SignInEntry = { state, rawNonce, provider: args.provider, locale: args.locale, createdAt: args.now ?? Date.now() };
  args.storage.setItem(SIGNIN_KEY, JSON.stringify(entry));
  return args.provider === "google"
    ? googleAuthUrl({ clientId: id, redirectUri: args.redirectUri, nonceHash, state })
    : appleAuthUrl({ servicesId: id, redirectUri: args.redirectUri, nonceHash, state });
}

export type ReturnFragment =
  | { kind: "ok"; idToken: string; state: string }
  | { kind: "error"; error: string; state: string | null }
  | { kind: "invalid" };

/** Parses `location.hash` of /auth/return. Garbage, a missing token or a missing state → invalid. */
export function parseReturnFragment(hash: string): ReturnFragment {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return { kind: "invalid" };
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(raw);
  } catch {
    return { kind: "invalid" };
  }
  const state = params.get("state");
  const error = params.get("error");
  if (error) return { kind: "error", error, state: state || null };
  const idToken = params.get("id_token");
  if (!idToken || !state) return { kind: "invalid" };
  return { kind: "ok", idToken, state };
}

/** Reads and removes the sign-in entry at once (read once). Missing, unparsable or malformed → null. */
export function takeSignInEntry(storage: StorageLike): SignInEntry | null {
  let raw: string | null = null;
  try {
    raw = storage.getItem(SIGNIN_KEY);
  } finally {
    try {
      storage.removeItem(SIGNIN_KEY);
    } catch {
      // Storage blocked: nothing to remove.
    }
  }
  if (!raw) return null;
  try {
    const e = JSON.parse(raw) as Partial<SignInEntry> | null;
    if (!e || typeof e !== "object") return null;
    if (typeof e.state !== "string" || !e.state || typeof e.rawNonce !== "string" || !e.rawNonce) return null;
    if (e.provider !== "google" && e.provider !== "apple") return null;
    if (typeof e.locale !== "string" || !isLocale(e.locale)) return null;
    if (typeof e.createdAt !== "number" || !Number.isFinite(e.createdAt)) return null;
    return { state: e.state, rawNonce: e.rawNonce, provider: e.provider, locale: e.locale, createdAt: e.createdAt };
  } catch {
    return null;
  }
}

/** The entry must exist, be at most 10 minutes old (and not from the future) and carry the same `state` as the fragment. */
export function checkState(entry: SignInEntry | null, fragmentState: string | null, now: number = Date.now()): entry is SignInEntry {
  if (!entry || !fragmentState) return false;
  const age = now - entry.createdAt;
  if (age < 0 || age > SIGNIN_MAX_AGE_MS) return false;
  return timingSafeEqualStrings(entry.state, fragmentState);
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Handoff from /auth/return to the redeem page (contract §5.3). The only place a token touches storage. */
export type Handoff = { token: string; expiresAt: number; createdAt: number };

export function writeHandoff(storage: StorageLike, session: { token: string; expiresAt: number }, now: number = Date.now()): void {
  const h: Handoff = { token: session.token, expiresAt: session.expiresAt, createdAt: now };
  storage.setItem(HANDOFF_KEY, JSON.stringify(h));
}

/** Read once: the entry is removed before it is parsed. Older than 60 s, expired or malformed → null. */
export function readHandoff(storage: StorageLike, now: number = Date.now()): { token: string; expiresAt: number } | null {
  let raw: string | null = null;
  try {
    raw = storage.getItem(HANDOFF_KEY);
  } finally {
    try {
      storage.removeItem(HANDOFF_KEY);
    } catch {
      // Storage blocked: nothing to remove.
    }
  }
  if (!raw) return null;
  try {
    const h = JSON.parse(raw) as Partial<Handoff> | null;
    if (!h || typeof h !== "object") return null;
    if (typeof h.token !== "string" || !h.token) return null;
    if (typeof h.expiresAt !== "number" || !Number.isFinite(h.expiresAt) || typeof h.createdAt !== "number" || !Number.isFinite(h.createdAt)) return null;
    const age = now - h.createdAt;
    if (age < 0 || age > HANDOFF_MAX_AGE_MS) return null;
    if (h.expiresAt <= now) return null;
    return { token: h.token, expiresAt: h.expiresAt };
  } catch {
    return null;
  }
}

/**
 * Maps the answer of `POST /api/web/parent-session` (HTTP status + parsed body) to a message key, §5.5.
 * A network failure is status 0, an unparsable body is null: both end as `signin_failed`.
 */
export function sessionOutcome(status: number, body: unknown): MessageKey {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const error = typeof b?.error === "string" ? b.error : null;
  switch (status) {
    case 401:
      if (error === "invalid_credentials") return "signin_invalid_credentials";
      if (error === "invalid_token") return "signin_invalid_token";
      return "signin_failed";
    case 404:
      return "signin_account_not_found";
    case 403:
      return "signin_not_parent";
    case 429:
      return "signin_rate_limited";
    case 503:
      if (error === "provider_disabled" || error === "provider_unavailable") return "signin_unavailable";
      if (error === "unavailable") return "unavailable";
      return "signin_failed";
    default:
      return "signin_failed";
  }
}

export type SessionPayload =
  | { method: "password"; email: string; password: string; locale: Locale }
  | { method: SignInProvider; id_token: string; nonce: string; locale: Locale };

export type SessionResult = { ok: true; token: string; expiresAt: number } | { ok: false; key: MessageKey };

type FetchFn = (input: string, init?: RequestInit) => Promise<Response>;

/** Reads a 200 answer: a token and an expiry (`expires_at`, else `expires_in`). Anything else is a failed sign-in. */
export function parseSession(body: unknown, now: number = Date.now()): SessionResult {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const token = typeof b?.token === "string" && b.token ? b.token : null;
  if (!token) return { ok: false, key: "signin_failed" };
  let expiresAt = typeof b?.expires_at === "string" ? Date.parse(b.expires_at) : NaN;
  if (!Number.isFinite(expiresAt) && typeof b?.expires_in === "number" && b.expires_in > 0) expiresAt = now + b.expires_in * 1000;
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return { ok: false, key: "signin_failed" };
  return { ok: true, token, expiresAt };
}

/** Opens a web session. Never throws; every failure is a message key. */
export async function requestWebSession(payload: SessionPayload, opts: { fetchFn?: FetchFn; base?: string; now?: number; timeoutMs?: number } = {}): Promise<SessionResult> {
  const fetchFn = opts.fetchFn ?? ((i, init) => fetch(i, init));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 20000);
  try {
    const res = await fetchFn(`${opts.base ?? apiBase()}/api/web/parent-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    if (res.status === 200) return parseSession(body, opts.now);
    return { ok: false, key: sessionOutcome(res.status, body) };
  } catch {
    return { ok: false, key: sessionOutcome(0, null) };
  } finally {
    clearTimeout(timer);
  }
}

/** Best-effort sign-out; `keepalive` lets it survive a closing tab (used on `pagehide`). Never throws. */
export async function closeWebSession(token: string, opts: { fetchFn?: FetchFn; base?: string; keepalive?: boolean } = {}): Promise<void> {
  const fetchFn = opts.fetchFn ?? ((i, init) => fetch(i, init));
  try {
    await fetchFn(`${opts.base ?? apiBase()}/api/web/parent-session`, {
      method: "DELETE",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      keepalive: opts.keepalive ?? false,
    });
  } catch {
    // Best effort: the token expires in at most 15 minutes anyway.
  }
}

/** Where /auth/return sends the parent after a successful sign-in: the redeem page of the stored language (a full load). */
export function redeemReturnPath(locale: Locale): string {
  return giftPath(locale, "redeem");
}
