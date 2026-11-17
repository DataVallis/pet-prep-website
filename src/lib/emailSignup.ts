/**
 * Every e-mail left on petprep.si goes to PetPrep's own database, segmented (David 2026-11-17: where it was left,
 * for what purpose, which breed, UTM …). Contract: POST https://api.petprep.si/api/email-signups (204; 422 invalid;
 * 429 throttled), pet-prep docs/engineering (email contract). Used by the breed quiz, the early-access form and the
 * embedded "How much work is a dog?" app (bundled by scripts/build-real-cost.mjs), so keep it dependency-free.
 *
 * Fallback: while the endpoint is not deployed it answers 404 / 405; the newsletter forms then post the old
 * payload to POST /api/summary-leads (201) exactly as before, so no e-mail is lost. The IP is never sent or stored.
 */
export const SIGNUP_API = "https://api.petprep.si";
/** Wording of the newsletter consent (quiz result, calculator step 5: strings.js `news_consent`). */
export const NEWSLETTER_CONSENT_VERSION = "2026-11";
/** Wording of the early-access consent (dictionary `earlyAccess.consent`: "By subscribing you agree to receive emails about PetPrep"), which differs from the newsletter one. */
export const EARLY_ACCESS_CONSENT_VERSION = "ea-2026-11";

export type Utm = { source?: string; medium?: string; campaign?: string; content?: string; term?: string };
export type SignupPurpose = "newsletter" | "early_access";
export type SignupResult = "ok" | "email" | "error" | "proto";

export type SignupInput = {
  email: string;
  purpose: SignupPurpose;
  /** What form on the site: real_cost | breed_quiz | early_access_form (^[a-z0-9_]{1,32}$). */
  source: string;
  /** Where on the page: hero | footer | result | step5 … (^[a-z0-9_-]{1,40}$). */
  section?: string;
  locale: string;
  species?: "dog" | "cat";
  breed?: string;
  stage?: "adult" | "puppy";
  quiz?: { result: string[]; answers: string };
  consentVersion: string;
  /** Hidden honeypot field; anything but "" means a bot. */
  honeypot?: string;
};

/** Where the visitor is: the page (the parent page when running inside the calculator iframe) and how they arrived. */
export type SignupContext = {
  hostname: string;
  pagePath: string;
  search: string;
  referrer: string;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
};

type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

export const onPetprep = (hostname: string) => /(^|\.)petprep\.si$/.test(hostname);

const UTM_KEYS = ["source", "medium", "campaign", "content", "term"] as const;
const UTM_STORE_KEY = "petprep.utm";

/** utm_source … utm_term from a query string, each trimmed and cut to 100 characters; undefined when there are none. */
export function parseUtm(search: string): Utm | undefined {
  let params: URLSearchParams;
  try { params = new URLSearchParams(search); } catch { return undefined; }
  const utm: Utm = {};
  for (const k of UTM_KEYS) {
    const v = (params.get(`utm_${k}`) ?? "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 100);
    if (v) utm[k] = v;
  }
  return Object.keys(utm).length ? utm : undefined;
}

/** First page of a visit: keep its UTM in sessionStorage (never overwrites), so a later page without them still has them. Never throws. */
export function rememberUtm(search: string, storage: SignupContext["storage"]): void {
  try {
    const utm = parseUtm(search);
    if (!utm || !storage || storage.getItem(UTM_STORE_KEY)) return;
    storage.setItem(UTM_STORE_KEY, JSON.stringify(utm));
  } catch { /* storage blocked (private mode): the current URL still works */ }
}

/** UTM of the current URL, else the one remembered from the first page of the visit. */
export function resolveUtm(search: string, storage: SignupContext["storage"]): Utm | undefined {
  const now = parseUtm(search);
  if (now) return now;
  try {
    const raw = storage?.getItem(UTM_STORE_KEY);
    if (!raw) return undefined;
    const stored = JSON.parse(raw) as Record<string, unknown>;
    const utm: Utm = {};
    for (const k of UTM_KEYS) if (typeof stored[k] === "string" && stored[k]) utm[k] = (stored[k] as string).slice(0, 100);
    return Object.keys(utm).length ? utm : undefined;
  } catch { return undefined; }
}

/** Host of document.referrer when it is another site (not petprep.si itself); undefined otherwise. */
export function referrerHost(referrer: string, hostname: string): string | undefined {
  try {
    if (!referrer) return undefined;
    const host = new URL(referrer).hostname.toLowerCase().slice(0, 190);
    if (!host || host === hostname.toLowerCase() || onPetprep(host)) return undefined;
    return host;
  } catch { return undefined; }
}

/** The JSON body of POST /api/email-signups. Optional fields that are empty are left out. */
export function buildSignupBody(input: SignupInput, ctx: SignupContext): Record<string, unknown> {
  const body: Record<string, unknown> = {
    email: input.email.trim(),
    consent: true,
    consent_version: input.consentVersion,
    purpose: input.purpose,
    source: input.source,
    page_path: ctx.pagePath.startsWith("/") ? ctx.pagePath.slice(0, 300) : `/${ctx.pagePath}`.slice(0, 300),
    locale: input.locale,
    website: input.honeypot ?? "",
  };
  if (input.section) body.section = input.section;
  if (input.species) body.species = input.species;
  if (input.breed && /^[a-z0-9_]{1,64}$/.test(input.breed)) body.breed = input.breed;
  if (input.stage) body.stage = input.stage;
  if (input.quiz && input.quiz.result.length) body.quiz = { result: input.quiz.result.slice(0, 3), answers: input.quiz.answers };
  const utm = resolveUtm(ctx.search, ctx.storage);
  if (utm) body.utm = utm;
  const ref = referrerHost(ctx.referrer, ctx.hostname);
  if (ref) body.referrer_host = ref;
  return body;
}

/** The pre-2026-11-17 payload of POST /api/summary-leads (used only while /api/email-signups answers 404 / 405). */
export function buildLegacyBody(input: SignupInput): Record<string, unknown> {
  const body: Record<string, unknown> = { email: input.email.trim(), consent: true, consent_version: input.consentVersion, source: input.source, locale: input.locale, website: "" };
  if (input.breed) body.breed = input.breed;
  if (input.stage) body.stage = input.stage;
  return body;
}

async function emailErrorOf(res: Response): Promise<SignupResult> {
  const body = (await res.json().catch(() => ({}))) as { errors?: { email?: unknown } };
  return body?.errors?.email ? "email" : "error";
}

/**
 * Sends one signup to our own database. Only from petprep.si ("proto" elsewhere), nothing for a filled honeypot
 * ("error"), never throws. `allowLegacy` (newsletter forms) turns a 404 / 405 into the old /api/summary-leads call.
 */
export async function postEmailSignup(input: SignupInput, ctx: SignupContext, opts: { fetchFn?: FetchFn; allowLegacy?: boolean; api?: string } = {}): Promise<SignupResult> {
  if (!onPetprep(ctx.hostname) && !opts.api) return "proto";
  if (input.honeypot) return "error";
  const api = opts.api ?? SIGNUP_API;
  const f: FetchFn = opts.fetchFn ?? ((u, i) => fetch(u, i));
  const send = (path: string, body: unknown) => f(`${api}${path}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body), credentials: "omit" });
  try {
    const res = await send("/api/email-signups", buildSignupBody(input, ctx));
    if (res.status === 204 || res.status === 200 || res.status === 201) return "ok";
    if (res.status === 422) return await emailErrorOf(res);
    if ((res.status === 404 || res.status === 405) && opts.allowLegacy) {
      const old = await send("/api/summary-leads", buildLegacyBody(input));
      if (old.status === 201 || old.status === 200 || old.status === 204) return "ok";
      return old.status === 422 ? await emailErrorOf(old) : "error";
    }
    return "error";
  } catch { return "error"; }
}

/**
 * Browser context for a form. Inside the calculator iframe the visitor's page is the parent (same origin), so its
 * path, query and referrer describe the visit; elsewhere it is the page itself.
 */
export function browserContext(win: Window = window): SignupContext {
  let w: Window = win;
  try {
    if (win.parent && win.parent !== win && win.parent.location.origin === win.location.origin) w = win.parent;
  } catch { /* cross-origin parent: use own window */ }
  let storage: SignupContext["storage"] = null;
  try { storage = win.sessionStorage; } catch { /* blocked */ }
  return { hostname: win.location.hostname, pagePath: w.location.pathname, search: w.location.search, referrer: w.document.referrer, storage };
}
