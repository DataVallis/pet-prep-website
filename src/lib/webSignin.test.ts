// Web sign-in for gift voucher redemption (M6-S01b) unit tests: `npm test` (node:test). CONTRACT_WEB_SIGNIN §6.2.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import {
  HANDOFF_KEY,
  HANDOFF_MAX_AGE_MS,
  SIGNIN_KEY,
  SIGNIN_MAX_AGE_MS,
  appleAuthUrl,
  appleServicesId,
  availableProviders,
  beginSignIn,
  checkState,
  closeWebSession,
  googleAuthUrl,
  googleClientId,
  parseReturnFragment,
  parseSession,
  randomToken,
  readHandoff,
  requestWebSession,
  returnUrl,
  sessionOutcome,
  sha256Hex,
  takeSignInEntry,
  writeHandoff,
  type SignInEntry,
  type StorageLike,
} from "./webSignin.ts";
import { AUTH_RETURN_PATH, isGiftPrivatePath, messageKeys, redeemOutcome, type MessageKey } from "./gift.ts";
import { authReturnParams } from "./giftRoutes.ts";
import { giftCopy } from "../content/gift/index.ts";
import { locales } from "../i18n/config.ts";

const src = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");

/** In-memory sessionStorage that records every write. */
function fakeStorage() {
  const data = new Map<string, string>();
  const writes: [string, string][] = [];
  const s: StorageLike & { data: Map<string, string>; writes: [string, string][] } = {
    data,
    writes,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => {
      writes.push([k, v]);
      data.set(k, v);
    },
    removeItem: (k) => void data.delete(k),
  };
  return s;
}

const NOW = Date.UTC(2026, 10, 11, 22, 0, 0);
const REDIRECT = "https://petprep.si/auth/return";
const entry = (over: Partial<SignInEntry> = {}): SignInEntry => ({ state: "STATE", rawNonce: "NONCE", provider: "google", locale: "sl", createdAt: NOW, ...over });

test("sha256Hex matches the known vectors, lowercase hex", async () => {
  assert.equal(await sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  assert.equal(await sha256Hex(""), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
});

test("randomToken is 32 random bytes as base64url, different every time", () => {
  const a = randomToken();
  assert.match(a, /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(a, randomToken());
  assert.equal(randomToken(new Uint8Array(32).fill(255)), "_".repeat(42) + "8");
});

test("googleAuthUrl has exactly the parameters of contract §2.1", () => {
  const u = new URL(googleAuthUrl({ clientId: "cid.apps.googleusercontent.com", redirectUri: REDIRECT, nonceHash: "abc123", state: "st" }));
  assert.equal(u.origin + u.pathname, "https://accounts.google.com/o/oauth2/v2/auth");
  assert.deepEqual(Object.fromEntries(u.searchParams), {
    client_id: "cid.apps.googleusercontent.com",
    redirect_uri: REDIRECT,
    response_type: "id_token",
    scope: "openid",
    nonce: "abc123",
    state: "st",
    prompt: "select_account",
  });
});

test("appleAuthUrl has exactly the parameters of contract §2.2: no scope, fragment response", () => {
  const raw = appleAuthUrl({ servicesId: "com.datavallis.petprep.web", redirectUri: REDIRECT, nonceHash: "abc123", state: "st" });
  assert.match(raw, /response_type=code%20id_token/); // a space is %20, never "+"
  const u = new URL(raw);
  assert.equal(u.origin + u.pathname, "https://appleid.apple.com/auth/authorize");
  assert.deepEqual(Object.fromEntries(u.searchParams), {
    client_id: "com.datavallis.petprep.web",
    redirect_uri: REDIRECT,
    response_type: "code id_token",
    response_mode: "fragment",
    nonce: "abc123",
    state: "st",
  });
  assert.ok(!u.searchParams.has("scope"));
});

test("returnUrl is the one fixed /auth/return URL", () => {
  assert.equal(returnUrl("https://petprep.si"), REDIRECT);
  assert.equal(returnUrl("http://localhost:3000/"), "http://localhost:3000/auth/return");
  assert.equal(AUTH_RETURN_PATH, "/auth/return");
});

test("beginSignIn stores state + raw nonce, sends the provider the nonce hash, never the raw nonce", async () => {
  const st = fakeStorage();
  let n = 0;
  const url = await beginSignIn({ provider: "apple", locale: "de", redirectUri: REDIRECT, storage: st, now: NOW, googleId: "g", appleId: "com.datavallis.petprep.web", random: () => `r${++n}` });
  assert.ok(url);
  const u = new URL(url);
  assert.equal(u.searchParams.get("state"), "r1");
  assert.equal(u.searchParams.get("nonce"), await sha256Hex("r2"));
  assert.ok(!url.includes("r2")); // the raw nonce is not in the URL
  assert.deepEqual(JSON.parse(st.data.get(SIGNIN_KEY)!), { state: "r1", rawNonce: "r2", provider: "apple", locale: "de", createdAt: NOW });
  assert.equal(st.writes.length, 1);
});

test("beginSignIn does nothing for a provider without an id", async () => {
  const st = fakeStorage();
  assert.equal(await beginSignIn({ provider: "google", locale: "en", redirectUri: REDIRECT, storage: st, googleId: null, appleId: "x" }), null);
  assert.equal(await beginSignIn({ provider: "apple", locale: "en", redirectUri: REDIRECT, storage: st, googleId: "x", appleId: "  " }), null);
  assert.equal(st.writes.length, 0);
});

test("buttons are hidden without client ids: empty, whitespace or unset → no provider", () => {
  assert.deepEqual(availableProviders(undefined, undefined), []);
  assert.deepEqual(availableProviders("", " "), []);
  assert.deepEqual(availableProviders("gid", undefined), ["google"]);
  assert.deepEqual(availableProviders(undefined, "sid"), ["apple"]);
  assert.deepEqual(availableProviders("gid", "sid"), ["google", "apple"]);
  assert.equal(googleClientId(" x.apps.googleusercontent.com "), "x.apps.googleusercontent.com");
  assert.equal(googleClientId(""), null);
  assert.equal(appleServicesId(undefined), null);
  // wired: the production env has both ids, empty, so both buttons are off until David pastes them
  const env = src("../../.env.production");
  assert.match(env, /^NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID=$/m);
  assert.match(env, /^NEXT_PUBLIC_APPLE_SERVICES_ID=$/m);
  const flow = src("../components/gift/RedeemFlow.tsx");
  assert.match(flow, /googleClientId\(\) \?[\s\S]*continueWithGoogle/);
  assert.match(flow, /appleServicesId\(\) \?[\s\S]*continueWithApple/);
  assert.match(flow, /hasProviders \?/);
});

test("parseReturnFragment: success, provider error, missing state, garbage", () => {
  assert.deepEqual(parseReturnFragment("#id_token=aaa.bbb.ccc&state=S1"), { kind: "ok", idToken: "aaa.bbb.ccc", state: "S1" });
  assert.deepEqual(parseReturnFragment("#code=xyz&id_token=aaa.bbb.ccc&state=S1"), { kind: "ok", idToken: "aaa.bbb.ccc", state: "S1" }); // Apple: the code is ignored
  assert.deepEqual(parseReturnFragment("#error=access_denied&state=S1"), { kind: "error", error: "access_denied", state: "S1" });
  assert.deepEqual(parseReturnFragment("#error=user_cancelled_authorize"), { kind: "error", error: "user_cancelled_authorize", state: null });
  assert.deepEqual(parseReturnFragment("#id_token=aaa.bbb.ccc"), { kind: "invalid" }); // no state
  assert.deepEqual(parseReturnFragment("#state=S1"), { kind: "invalid" }); // no token
  for (const bad of ["", "#", "garbage", "#%%%", "#=&=", "id_token"]) assert.deepEqual(parseReturnFragment(bad), { kind: "invalid" }, bad);
});

test("takeSignInEntry reads once and removes at once; malformed entries are refused", () => {
  const st = fakeStorage();
  st.setItem(SIGNIN_KEY, JSON.stringify(entry()));
  assert.deepEqual(takeSignInEntry(st), entry());
  assert.equal(st.getItem(SIGNIN_KEY), null);
  assert.equal(takeSignInEntry(st), null);
  for (const bad of ["not json", "null", "[]", JSON.stringify({ ...entry(), provider: "facebook" }), JSON.stringify({ ...entry(), locale: "xx" }), JSON.stringify({ ...entry(), state: "" }), JSON.stringify({ ...entry(), createdAt: "now" })]) {
    st.setItem(SIGNIN_KEY, bad);
    assert.equal(takeSignInEntry(st), null, bad);
    assert.equal(st.getItem(SIGNIN_KEY), null); // removed even when refused
  }
});

test("checkState: mismatch, older than 10 minutes, from the future, missing entry", () => {
  assert.ok(checkState(entry(), "STATE", NOW + 1000));
  assert.ok(checkState(entry(), "STATE", NOW + SIGNIN_MAX_AGE_MS));
  assert.ok(!checkState(entry(), "STATE", NOW + SIGNIN_MAX_AGE_MS + 1));
  assert.ok(!checkState(entry(), "OTHER!", NOW));
  assert.ok(!checkState(entry(), "STAT", NOW)); // shorter
  assert.ok(!checkState(entry(), "", NOW));
  assert.ok(!checkState(entry(), null, NOW));
  assert.ok(!checkState(null, "STATE", NOW));
  assert.ok(!checkState(entry({ createdAt: NOW + 60_000 }), "STATE", NOW)); // created in the future
});

test("handoff is read once", () => {
  const st = fakeStorage();
  writeHandoff(st, { token: "1|secret", expiresAt: NOW + 900_000 }, NOW);
  assert.deepEqual(readHandoff(st, NOW + 1000), { token: "1|secret", expiresAt: NOW + 900_000 });
  assert.equal(st.getItem(HANDOFF_KEY), null);
  assert.equal(readHandoff(st, NOW + 1000), null);
});

test("handoff is refused after 60 s, when expired, from the future and when malformed, and is removed anyway", () => {
  const cases: [string, number][] = [
    ["older than 60 s", NOW + HANDOFF_MAX_AGE_MS + 1],
    ["token already expired", NOW + 1000],
  ];
  for (const [label, at] of cases) {
    const st = fakeStorage();
    writeHandoff(st, { token: "t", expiresAt: label === "token already expired" ? NOW + 500 : NOW + 900_000 }, NOW);
    assert.equal(readHandoff(st, at), null, label);
    assert.equal(st.getItem(HANDOFF_KEY), null, `${label}: removed`);
  }
  const st = fakeStorage();
  writeHandoff(st, { token: "t", expiresAt: NOW + 900_000 }, NOW);
  assert.ok(readHandoff(st, NOW + HANDOFF_MAX_AGE_MS)); // exactly 60 s still counts
  writeHandoff(st, { token: "t", expiresAt: NOW + 900_000 }, NOW + 60_000);
  assert.equal(readHandoff(st, NOW), null); // written in the future
  for (const bad of ["x", "null", "[]", "{}", JSON.stringify({ token: "", expiresAt: NOW + 1, createdAt: NOW }), JSON.stringify({ token: "t", expiresAt: "soon", createdAt: NOW })]) {
    st.setItem(HANDOFF_KEY, bad);
    assert.equal(readHandoff(st, NOW), null, bad);
    assert.equal(st.getItem(HANDOFF_KEY), null);
  }
});

test("sessionOutcome covers every row of the contract mapping (§5.5)", () => {
  const rows: [number, unknown, MessageKey][] = [
    [401, { error: "invalid_credentials" }, "signin_invalid_credentials"],
    [401, { error: "invalid_token" }, "signin_invalid_token"],
    [401, { error: "something_else" }, "signin_failed"],
    [404, { error: "account_not_found" }, "signin_account_not_found"],
    [403, { error: "not_parent" }, "signin_not_parent"],
    [429, { error: "rate_limited" }, "signin_rate_limited"],
    [503, { error: "provider_disabled" }, "signin_unavailable"],
    [503, { error: "provider_unavailable" }, "signin_unavailable"],
    [503, { error: "unavailable" }, "unavailable"],
    [503, {}, "signin_failed"],
    [422, { error: "invalid_request" }, "signin_failed"],
    [500, { error: "server_error" }, "signin_failed"],
    [418, null, "signin_failed"],
  ];
  for (const [status, body, key] of rows) assert.equal(sessionOutcome(status, { ...(body as object), message: "ignored" }), key, `${status} ${JSON.stringify(body)}`);
  assert.equal(sessionOutcome(0, null), "signin_failed"); // network failure
  assert.equal(sessionOutcome(401, "<html>not json</html>"), "signin_failed"); // unparsable body
  assert.equal(sessionOutcome(200, { token: "x" }), "signin_failed"); // 200 is handled by parseSession, never here
  // redeem side: 401 → sign in again, 403 → not a parent
  assert.equal(redeemOutcome(401, { error: "unauthenticated" }), "session_expired");
  assert.equal(redeemOutcome(403, { error: "not_parent" }), "signin_not_parent");
});

test("parseSession needs a token and a future expiry (expires_at, else expires_in)", () => {
  assert.deepEqual(parseSession({ token: "1|a", expires_at: new Date(NOW + 900_000).toISOString() }, NOW), { ok: true, token: "1|a", expiresAt: NOW + 900_000 });
  assert.deepEqual(parseSession({ token: "1|a", expires_in: 900 }, NOW), { ok: true, token: "1|a", expiresAt: NOW + 900_000 });
  for (const bad of [null, {}, { token: "" }, { token: "1|a" }, { token: "1|a", expires_at: new Date(NOW - 1).toISOString() }, { token: 5, expires_in: 900 }, { token: "1|a", expires_at: "tomorrow" }]) {
    assert.deepEqual(parseSession(bad, NOW), { ok: false, key: "signin_failed" }, JSON.stringify(bad));
  }
});

test("requestWebSession: the exact request, every answer mapped, never throws", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  const answer = (status: number, body: unknown) => async (url: string, init?: RequestInit) => {
    calls.push({ url, init: init! });
    return new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
  };
  const ok = await requestWebSession(
    { method: "password", email: "p@example.com", password: "pw", locale: "de" },
    { base: "https://api.petprep.si", now: NOW, fetchFn: answer(200, { token: "9|tok", token_type: "Bearer", abilities: ["gift:redeem"], expires_at: new Date(NOW + 900_000).toISOString(), expires_in: 900 }) },
  );
  assert.deepEqual(ok, { ok: true, token: "9|tok", expiresAt: NOW + 900_000 });
  assert.equal(calls[0].url, "https://api.petprep.si/api/web/parent-session");
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].init.body as string), { method: "password", email: "p@example.com", password: "pw", locale: "de" });
  assert.ok(!("Authorization" in (calls[0].init.headers as Record<string, string>)));
  await requestWebSession({ method: "google", id_token: "a.b.c", nonce: "RAW", locale: "sl" }, { fetchFn: answer(404, { error: "account_not_found" }) });
  assert.deepEqual(JSON.parse(calls[1].init.body as string), { method: "google", id_token: "a.b.c", nonce: "RAW", locale: "sl" });
  const key = async (status: number, body: unknown) => (await requestWebSession({ method: "apple", id_token: "t", nonce: "n", locale: "en" }, { fetchFn: answer(status, body) }) as { key: MessageKey }).key;
  assert.equal(await key(401, { error: "invalid_credentials" }), "signin_invalid_credentials");
  assert.equal(await key(404, { error: "account_not_found" }), "signin_account_not_found");
  assert.equal(await key(403, { error: "not_parent" }), "signin_not_parent");
  assert.equal(await key(429, { error: "rate_limited" }), "signin_rate_limited");
  assert.equal(await key(503, { error: "provider_disabled" }), "signin_unavailable");
  assert.equal(await key(503, { error: "unavailable" }), "unavailable");
  assert.equal(await key(500, "<html>"), "signin_failed"); // unparsable body
  assert.equal(await key(200, {}), "signin_failed"); // 200 without a token
  const down = await requestWebSession({ method: "apple", id_token: "t", nonce: "n", locale: "en" }, { fetchFn: async () => { throw new TypeError("network"); } });
  assert.deepEqual(down, { ok: false, key: "signin_failed" });
});

test("closeWebSession sends DELETE with the bearer token and never throws", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  await closeWebSession("9|tok", { base: "https://api.petprep.si", keepalive: true, fetchFn: async (url, init) => { calls.push({ url, init: init! }); return new Response(null, { status: 204 }); } });
  assert.equal(calls[0].url, "https://api.petprep.si/api/web/parent-session");
  assert.equal(calls[0].init.method, "DELETE");
  assert.equal(calls[0].init.keepalive, true);
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, "Bearer 9|tok");
  await closeWebSession("t", { fetchFn: async () => { throw new Error("offline"); } }); // must not reject
});

test("the token is never written to storage (except the one handoff), a URL or the console", async () => {
  const logged: unknown[][] = [];
  const orig = { ...console };
  for (const m of ["log", "info", "debug", "warn", "error", "trace", "dir"] as const) console[m] = ((...a: unknown[]) => void logged.push(a)) as never;
  try {
    const st = fakeStorage();
    const token = "77|VERY-SECRET-TOKEN";
    const idToken = "eyJ.ID-TOKEN-SECRET.sig";
    const urls: string[] = [];
    const fetchFn = async (url: string) => {
      urls.push(url);
      return new Response(JSON.stringify({ token, expires_at: new Date(NOW + 900_000).toISOString() }), { status: 200 });
    };
    const url = await beginSignIn({ provider: "google", locale: "en", redirectUri: REDIRECT, storage: st, googleId: "g", appleId: null });
    const e = takeSignInEntry(st)!;
    assert.ok(checkState(e, e.state));
    const r = await requestWebSession({ method: "google", id_token: idToken, nonce: e.rawNonce, locale: e.locale }, { fetchFn, now: NOW });
    assert.ok(r.ok);
    await closeWebSession(token, { fetchFn: async (u) => { urls.push(u); return new Response(null, { status: 204 }); } });
    // storage: only the sign-in entry (no token) and nothing else yet
    assert.deepEqual(st.writes.map(([k]) => k), [SIGNIN_KEY]);
    assert.ok(!st.writes.some(([, v]) => v.includes("SECRET")));
    // URLs: neither token, nor ID token, nor raw nonce
    for (const u of [url!, ...urls]) {
      assert.ok(!u.includes("SECRET") && !u.includes(encodeURIComponent(token)) && !u.includes(e.rawNonce), u);
    }
    // the handoff is the single exception and has exactly one key
    writeHandoff(st, { token, expiresAt: NOW + 1 }, NOW);
    assert.deepEqual(st.writes.map(([k]) => k), [SIGNIN_KEY, HANDOFF_KEY]);
    assert.equal(logged.length, 0, "nothing was logged");
  } finally {
    Object.assign(console, orig);
  }
  // static: the sign-in code and components have no console, no cookie, no localStorage, no analytics
  for (const f of ["../lib/webSignin.ts", "../components/gift/RedeemFlow.tsx", "../components/gift/AuthReturn.tsx"]) {
    const code = src(f);
    assert.doesNotMatch(code, /console\.|document\.cookie|localStorage|indexedDB|gtag|dataLayer|sendBeacon/, f);
    assert.doesNotMatch(code, /useSearchParams|location\.search/, f); // (webSignin.ts parses the fragment with URLSearchParams, never the query)
  }
  // the handoff key is read and written only through the helpers; no component touches the token with a URL
  const flow = src("../components/gift/RedeemFlow.tsx");
  assert.doesNotMatch(flow, /location\.(assign|replace|href)[^;]*token/i);
  assert.match(flow, /headers: \{[^}]*Authorization: `Bearer \$\{session\.token\}`/);
  const ret = src("../components/gift/AuthReturn.tsx");
  assert.doesNotMatch(ret, /location\.(assign|replace|href)[^;]*(token|idToken)/i);
  // the fragment is removed from the address bar before anything else runs
  assert.ok(ret.indexOf("history.replaceState(null") < ret.indexOf("takeSignInEntry(window"));
  assert.ok(ret.indexOf("const hash = window.location.hash") < ret.indexOf("history.replaceState(null"));
  assert.ok(ret.indexOf("const hash = window.location.hash") > ret.indexOf("started.current = true"));
  assert.match(ret, /window\.location\.replace\(giftPath\(entry\.locale, "redeem"\)\)/); // full load of the redeem page
});

test("/auth/return is private (no GA/GTM), noindex, off with the switch and never in the sitemap", () => {
  for (const p of ["/auth/return", "/en/auth/return", "/auth/return/"]) assert.ok(isGiftPrivatePath(p), p);
  for (const p of ["/auth", "/auth/returns", "/sl/auth/return"]) assert.ok(!isGiftPrivatePath(p), p);
  assert.deepEqual(authReturnParams(false), []);
  assert.deepEqual(authReturnParams(true), [{ locale: "en" }]);
  const page = src("../app/[locale]/auth/return/page.tsx");
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(page, /if \(!isGiftEnabled\(\)\) notFound\(\)/);
  assert.doesNotMatch(src("../app/sitemap.ts"), /auth\/return|AUTH_RETURN|authReturn/);
  assert.doesNotMatch(src("./llms.ts"), /auth\/return/);
  // the gate wraps both Google loaders on every page
  assert.match(src("../app/[locale]/layout.tsx"), /<PrivatePageGate>\s*<GoogleAnalytics \/>\s*<GoogleTagManager \/>\s*<\/PrivatePageGate>/);
});

test("no Google or Apple script anywhere on the site; internal links to redeem and thanks pages are plain <a>", () => {
  const walk = (rel: string): string[] =>
    readdirSync(new URL(rel, import.meta.url), { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(`${rel}${d.name}/`) : [`${rel}${d.name}`]));
  const files = walk("../").filter((f) => /\.(tsx?|css)$/.test(f) && !f.endsWith(".test.ts"));
  for (const f of files) {
    const code = src(f);
    assert.doesNotMatch(code, /accounts\.google\.com\/gsi|apis\.google\.com\/js|appleid\.cdn-apple\.com|AppleID\.auth|google\.accounts\.id/, f);
  }
  const flow = src("../components/gift/RedeemFlow.tsx");
  assert.doesNotMatch(flow, /next\/script|<script|createElement\("script"/);
  // The two provider hosts appear only as redirect targets inside webSignin.ts
  assert.equal(files.filter((f) => /accounts\.google\.com|appleid\.apple\.com/.test(src(f))).join(","), "../lib/webSignin.ts");
  for (const f of ["../components/gift/GiftPages.tsx", "../components/gift/ThanksClient.tsx", "../components/gift/RedeemFlow.tsx", "../components/gift/AuthReturn.tsx"]) {
    const code = src(f);
    assert.doesNotMatch(code, /<Link[^>]*giftPath\([^)]*"(redeem|thanks)"/, f);
    assert.doesNotMatch(code, /router\.(push|replace)\(/, f);
  }
  assert.match(src("../components/gift/GiftPages.tsx"), /<a href=\{giftPath\(lang, "redeem"\)\}/);
  assert.match(src("../components/gift/ThanksClient.tsx"), /<a href=\{giftPath\(locale, "redeem"\)\}/);
});

// Content: all 15 locales
const NEW_REDEEM = ["signInHeading", "signInLead", "continueWithGoogle", "continueWithApple", "signInOr", "emailLabel", "passwordLabel", "signInButton", "signInPending", "redirecting", "signInNoAccount", "signedIn", "signOut", "codeHeading", "returnBack"] as const;
const NEW_MESSAGES = ["signin_invalid_credentials", "signin_invalid_token", "signin_account_not_found", "signin_not_parent", "signin_rate_limited", "signin_unavailable", "signin_cancelled", "signin_failed", "session_expired"] as const;

test("every one of the 15 locales has every new sign-in key, non-empty", () => {
  assert.equal(locales.length, 15);
  for (const l of locales) {
    for (const k of NEW_REDEEM) assert.ok(giftCopy[l].redeem[k]?.trim().length > 1, `${l}.redeem.${k}`);
    for (const k of NEW_MESSAGES) assert.ok(giftCopy[l].messages[k]?.trim().length > 5, `${l}.messages.${k}`);
    for (const k of messageKeys) assert.ok(giftCopy[l].messages[k]?.trim().length > 5, `${l}.messages.${k}`);
  }
});

test("the removed keys are gone from all 15 locales, the types and the lookup code", () => {
  for (const l of locales) {
    const text = src(`../content/gift/${l}.ts`);
    assert.doesNotMatch(text, /\bno_account\b|\bemailHint\b|\bnoAccountHelp\b/, l);
    assert.ok(!("emailHint" in giftCopy[l].redeem) && !("noAccountHelp" in giftCopy[l].redeem), l);
    assert.ok(!("no_account" in giftCopy[l].messages), l);
  }
  assert.doesNotMatch(src("../content/gift/types.ts"), /emailHint|noAccountHelp/);
  assert.doesNotMatch(src("./gift.ts"), /no_account/);
});

test("the redeem texts no longer ask for an e-mail address to look up (each language's e-mail word)", () => {
  const word: Record<string, RegExp> = {
    en: /e-?mail/i, sl: /e-?naslov|e-?pošt/i, de: /e-?mail/i, fr: /e-?mail|courriel/i, es: /correo|e-?mail/i, it: /e-?mail/i, pt: /e-?mail/i,
    nl: /e-?mail/i, pl: /e-?mail/i, cs: /e-?mail/i, hr: /e-?adres|e-?mail/i, sv: /e-?post/i, da: /e-?mail/i, fi: /sähköposti/i, nb: /e-?post/i,
  };
  for (const l of locales) {
    const c = giftCopy[l];
    const re = word[l];
    const texts: Record<string, string> = {
      "redeem.meta.description": c.redeem.meta.description,
      "redeem.lead": c.redeem.lead,
      "redeem.codeHint": c.redeem.codeHint,
      "messages.invalid_request": c.messages.invalid_request,
      "how.steps[2]": c.how.steps[2].text,
      "faq[account]": c.faq.items[3].a,
      "redeemLink.text": c.redeemLink.text,
      "thanks.steps[2]": c.thanks.steps[2],
      "thanks.voucher.parentNote": c.thanks.voucher.parentNote,
    };
    for (const [k, v] of Object.entries(texts)) assert.doesNotMatch(v, re, `${l} ${k}`);
    assert.doesNotMatch(c.how.steps[2].text + c.faq.items[3].a, /Controls|Nadzor/, l); // the app menu path is not needed any more
    // the sign-in field and its divider are the only places the word may stay
    assert.match(c.redeem.emailLabel, re, `${l} emailLabel`);
  }
  assert.equal(giftCopy.sl.messages.invalid_request, "Vnesite kodo bona.");
  assert.equal(giftCopy.en.messages.invalid_request, "Please enter the voucher code.");
});

test("sign-in copy keeps each language's register; Slovenian uses the formal address", () => {
  const informalSl = /(?<![\p{L}])(vnesi|prijavi te|tvoj\p{L}*|poskusi|počakaj|ustvari si|imaš|boš)(?![\p{L}])/iu;
  const slSignIn = [...NEW_REDEEM.map((k) => giftCopy.sl.redeem[k]), ...NEW_MESSAGES.map((k) => giftCopy.sl.messages[k])].join(" ");
  assert.doesNotMatch(slSignIn, informalSl);
  assert.match(giftCopy.sl.redeem.continueWithGoogle, /^Nadaljujte z Googlom$/);
  // German keeps "Sie"
  assert.match(giftCopy.de.redeem.signInLead, /\bSie\b/);
  assert.equal(giftCopy.en.redeem.continueWithApple, "Continue with Apple");
  assert.doesNotMatch(JSON.stringify(giftCopy), /Data Vallis/i);
});
