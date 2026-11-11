// Gift voucher (M6-S01) unit tests: `npm test` (node:test). Contract §9.2 W1–W8.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  giftBuyUrl,
  giftPath,
  giftPathsOf,
  storedGiftLocale,
  isGiftEnabled,
  isPlausibleCode,
  isPromiseKitEnabled,
  messageKeys,
  clientOnlyKeys,
  isGiftPrivatePath,
  normalizeCode,
  redeemOutcome,
  validUntil,
  apiBase,
  formatGiftPrice,
} from "./gift.ts";
import { giftSitemapPaths, giftSlugParams, giftThanksParams } from "./giftRoutes.ts";
import { giftCopy } from "../content/gift/index.ts";
import { locales, salesSlugs, pageSlugs } from "../i18n/config.ts";

const src = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");

// W1
test("normalizeCode removes all whitespace, isPlausibleCode checks 8-64 of [A-Za-z0-9-]", () => {
  assert.equal(normalizeCode(" 38b1460a-5104 \n-4067-a91d-77b872934d51\t"), "38b1460a-5104-4067-a91d-77b872934d51");
  assert.ok(isPlausibleCode("38b1460a-5104-4067-a91d-77b872934d51"));
  assert.ok(isPlausibleCode("  abcd efgh  "));
  assert.ok(isPlausibleCode("A".repeat(64)));
  assert.ok(!isPlausibleCode("A".repeat(65)));
  assert.ok(!isPlausibleCode("abc1234"));
  assert.ok(!isPlausibleCode(""));
  assert.ok(!isPlausibleCode("abcd_efgh1"));
  assert.ok(!isPlausibleCode("abcdéfgh12"));
  assert.ok(!isPlausibleCode("abcd/efgh12"));
});

// W2
test("validUntil adds 12 months, clamps month ends, rejects bad dates", () => {
  assert.equal(validUntil("2026-11-11"), "2027-11-11");
  assert.equal(validUntil("2028-02-29"), "2029-02-28");
  assert.equal(validUntil("2027-01-31"), "2028-01-31");
  assert.equal(validUntil("2026-12-31"), "2027-12-31");
  assert.equal(validUntil("2026-11-11", 3), "2027-02-11");
  assert.equal(validUntil("2026-11-31"), null);
  assert.equal(validUntil("11.11.2026"), null);
  assert.equal(validUntil(""), null);
});

// W3: every row of contract §5.1
test("redeemOutcome maps every contract answer to its message key", () => {
  const cases: [number, unknown, string][] = [
    [200, { status: "redeemed", already: false }, "redeemed"],
    [200, { status: "redeemed", already: true }, "redeemed_already"],
    [422, { error: "invalid_request" }, "invalid_request"],
    [422, { error: "invalid_code" }, "invalid_code"],
    [422, { error: "expired" }, "expired"],
    [422, { error: "refunded" }, "refunded"],
    [401, { error: "unauthenticated" }, "session_expired"],
    [403, { error: "not_parent" }, "signin_not_parent"],
    [409, { error: "already_redeemed" }, "already_redeemed"],
    [429, { error: "rate_limited" }, "rate_limited"],
    [502, { error: "upstream_error" }, "upstream_error"],
    [503, { error: "unavailable" }, "unavailable"],
  ];
  for (const [status, body, key] of cases) assert.equal(redeemOutcome(status, { ...(body as object), message: "x" }), key, `${status} ${JSON.stringify(body)}`);
  // every message key is reachable from some answer (the sign-in keys come from src/lib/webSignin.ts, tested there)
  const signInOnly = messageKeys.filter((k) => k.startsWith("signin_") && k !== "signin_not_parent");
  assert.deepEqual(new Set([...cases.map((c) => c[2]), ...clientOnlyKeys, ...signInOnly]), new Set(messageKeys));
  // M6-S01b: the e-mail lookup is gone, so is its answer
  assert.ok(!(messageKeys as readonly string[]).includes("no_account"));
  assert.equal(redeemOutcome(422, { error: "no_account" }), "upstream_error");
  assert.equal(redeemOutcome(401, null), "upstream_error");
});

test("redeemOutcome: unknown, unparsable and network answers are upstream_error", () => {
  assert.equal(redeemOutcome(0, null), "upstream_error"); // fetch threw
  assert.equal(redeemOutcome(200, null), "upstream_error");
  assert.equal(redeemOutcome(200, { status: "something" }), "upstream_error");
  assert.equal(redeemOutcome(422, { error: "brand_new_code" }), "upstream_error");
  assert.equal(redeemOutcome(422, null), "upstream_error");
  assert.equal(redeemOutcome(500, { error: "invalid_code" }), "upstream_error");
  assert.equal(redeemOutcome(409, { error: "invalid_code" }), "upstream_error");
  assert.equal(redeemOutcome(404, "<html>"), "upstream_error");
  assert.equal(redeemOutcome(429, { error: "rate_limited", retry: 1 }), "rate_limited");
});

// W4
test("every message key has an SL and an EN text; SL uses the formal address", () => {
  for (const lang of locales) {
    for (const key of messageKeys) assert.ok(giftCopy[lang].messages[key]?.trim().length > 5, `${lang}.${key}`);
  }
  assert.equal(giftCopy.sl.messages.redeemed, "Izziv je dodan. Odprite aplikacijo in izberite ljubljenčka.");
  // Informal 2nd person singular must not occur in the Slovenian text. Forms that equal the 3rd person
  // ("preveri", "ustvari", "unovči") are left out; letters are matched with Unicode so "pošti" does not match "ti".
  const informal = /(?<![\p{L}])(vnesi|tvoj\p{L}*|prilepi|kupi|poskusi|počakaj|piši|imaš|boš|tebi|ti|si lahko|lahko vrneš)(?![\p{L}])/iu;
  const text = JSON.stringify(giftCopy.sl);
  assert.doesNotMatch(text, informal);
  assert.doesNotMatch(text, /\b(Natisni|Unovči|Kupi|Vnesi)\b/); // button labels use the formal plural
});

test("copy has no child ages, no 'Data Vallis' and no invented promise of a pet", () => {
  const all = JSON.stringify(giftCopy);
  assert.doesNotMatch(all, /Data Vallis/i);
  assert.doesNotMatch(all, /\b\d{1,2}[- ]?(year|let|leta|leti)\b/i);
  for (const l of locales) assert.doesNotMatch(JSON.stringify(giftCopy[l]), /Data Vallis/i, l);
  assert.equal(giftCopy.sl.title, "Ne podarite kužka. Podarite preizkus.");
});

test("price is formatted per language with Intl", () => {
  const nb = (s: string) => s.replace(/[\u00a0\u202f]/g, " ");
  assert.equal(nb(formatGiftPrice("sl")), "49,99 €");
  assert.equal(nb(formatGiftPrice("de")), "49,99 €");
  assert.equal(nb(formatGiftPrice("fr")), "49,99 €");
  assert.equal(nb(formatGiftPrice("en")), "€49.99");
  for (const l of locales) assert.match(formatGiftPrice(l), /49[.,]99/, l);
});

// W5
test("switch: only the exact value 1 turns the feature on", () => {
  assert.equal(isGiftEnabled("1"), true);
  for (const v of [undefined, "", "0", "true", "on", " 1", "yes"]) assert.equal(isGiftEnabled(v), false, String(v));
  assert.equal(isPromiseKitEnabled("1"), true);
  assert.equal(isPromiseKitEnabled(undefined), false);
});

test("switch off: no static params and no sitemap entry", () => {
  assert.deepEqual(giftSlugParams(false), []);
  for (const l of locales) assert.deepEqual(giftThanksParams(l, false), []);
  assert.equal(giftSitemapPaths(false), null);
});

test("switch on: static params for all 15 languages; sitemap has the sales page only", () => {
  const params = giftSlugParams(true);
  assert.equal(params.length, locales.length * 2);
  for (const l of locales) {
    assert.ok(params.some((p) => p.locale === l && p.slug === salesSlugs.gift[l]), l);
    assert.ok(params.some((p) => p.locale === l && p.slug === salesSlugs.redeem[l]), l);
    assert.deepEqual(giftThanksParams(l, true), [{ slug: salesSlugs.gift[l], species: salesSlugs.giftThanks[l] }]);
  }
  const paths = giftSitemapPaths(true, true);
  assert.deepEqual(Object.keys(paths ?? {}).sort(), [...locales].sort());
  assert.equal(paths?.en, "/gift");
  assert.equal(paths?.sl, "/sl/darilni-bon");
  assert.equal(paths?.de, "/de/geschenkgutschein");
  const sitemap = src("../app/sitemap.ts");
  assert.doesNotMatch(sitemap.replace(/\/\/.*$/gm, ""), /thanks|hvala|redeem|unovci|giftPath\(/);
});

test("no redirects: every language has its own page", () => {
  assert.doesNotMatch(src("../../next.config.ts"), /giftRedirects|darilni-bon|promise-kit/);
});

test("public paths: localized slugs, English at the root", () => {
  assert.equal(giftPath("en", "gift"), "/gift");
  assert.equal(giftPath("sl", "gift"), "/sl/darilni-bon");
  assert.equal(giftPath("en", "thanks"), "/gift/thanks");
  assert.equal(giftPath("sl", "thanks"), "/sl/darilni-bon/hvala");
  assert.equal(giftPath("en", "redeem"), "/redeem");
  assert.equal(giftPath("sl", "redeem"), "/sl/unovci");
  assert.equal(giftPath("de", "thanks"), "/de/geschenkgutschein/danke");
  assert.equal(giftPath("nb", "redeem"), "/nb/los-inn");
  for (const page of ["gift", "thanks", "redeem"] as const) {
    const all = giftPathsOf(page);
    assert.equal(new Set(Object.values(all)).size, locales.length, page);
  }
  // slugs never collide with another page slug of the same language
  for (const l of locales) {
    const taken = new Set(Object.values(pageSlugs).map((m) => (m as Record<string, string>)[l]));
    for (const k of ["gift", "redeem", "promiseKit"] as const) assert.ok(!taken.has(salesSlugs[k][l]), `${l} ${k}`);
  }
});

test("stored language is any of the 15; the redeem request sends the real website language", () => {
  assert.match(src("../components/gift/RedeemFlow.tsx"), /JSON\.stringify\(\{ code: normalizeCode\(code\), locale \}\)/);
  for (const l of locales) assert.equal(storedGiftLocale(l), l);
  assert.equal(storedGiftLocale("xx"), null);
  assert.equal(storedGiftLocale(null), null);
});

test("buy URL: https only, unset or bad → null (button disabled)", () => {
  assert.equal(giftBuyUrl(undefined), null);
  assert.equal(giftBuyUrl(""), null);
  assert.equal(giftBuyUrl("javascript:alert(1)"), null);
  assert.equal(giftBuyUrl("http://example.com/x"), null);
  assert.equal(giftBuyUrl("https://petprep.lemonsqueezy.com/checkout/buy/abc"), "https://petprep.lemonsqueezy.com/checkout/buy/abc");
});

test("API base defaults to api.petprep.si and drops a trailing slash", () => {
  assert.equal(apiBase(undefined), "https://api.petprep.si");
  assert.equal(apiBase("http://localhost:8000/"), "http://localhost:8000");
});

// W7
test("buy link opens in a new tab with noopener", () => {
  const buy = src("../components/gift/BuyButton.tsx");
  assert.match(buy, /target="_blank"/);
  assert.match(buy, /rel="noopener noreferrer"/);
});

// W6 + the voucher privacy rule
test("the code never reaches a URL, storage, a request or analytics", () => {
  const thanks = src("../components/gift/ThanksClient.tsx");
  const voucher = src("../components/gift/Voucher.tsx");
  const redeem = src("../components/gift/RedeemFlow.tsx");
  const all = [thanks, voucher, redeem, src("../components/gift/BuyButton.tsx"), src("../components/gift/GiftPages.tsx")];
  for (const file of all) {
    assert.doesNotMatch(file, /searchParams|useSearchParams|location\.(search|hash)|URLSearchParams/);
    assert.doesNotMatch(file, /indexedDB|document\.cookie|gtag|dataLayer|console\.(log|info|debug)/);
  }
  // sessionStorage appears only in the redeem flow, and only as the handoff / sign-in entry helpers' storage argument
  for (const file of [thanks, voucher, src("../components/gift/BuyButton.tsx"), src("../components/gift/GiftPages.tsx")]) assert.doesNotMatch(file, /sessionStorage/);
  for (const m of redeem.match(/[\w.]*sessionStorage/g) ?? []) assert.equal(m, "window.sessionStorage");
  // thanks + voucher: no network at all, no router push with a query, storage only for the language marker
  for (const file of [thanks, voucher]) {
    assert.doesNotMatch(file, /fetch\(|XMLHttpRequest|sendBeacon|WebSocket/);
    assert.doesNotMatch(file, /setItem/);
  }
  const storageCalls = thanks.match(/localStorage\.\w+\(([^)]*)\)/g) ?? [];
  assert.ok(storageCalls.length > 0);
  for (const call of storageCalls) assert.match(call, /^localStorage\.(getItem|removeItem)\(GIFT_LANG_KEY\)$/);
  assert.doesNotMatch(thanks, /router\.(push|replace)\([^)]*code/);
  // redeem: no localStorage; the only request of its own is the POST to the API with the code in the JSON body (sign-in requests live in webSignin.ts)
  assert.doesNotMatch(redeem, /localStorage/);
  assert.equal((redeem.match(/fetch\(/g) ?? []).length, 1);
  assert.match(redeem, /\/api\/gift\/redeem/);
  assert.match(redeem, /method: "POST"/);
  assert.match(redeem, /JSON\.stringify\(\{ code: normalizeCode\(code\), locale \}\)/); // no e-mail in the redeem body (M6-S01b)
  assert.doesNotMatch(redeem, /code: normalizeCode\(code\),[^}]*email/);
  // the buy button only ever stores the language
  const buy = src("../components/gift/BuyButton.tsx");
  assert.deepEqual(buy.match(/localStorage\.\w+\([^)]*\)/g), ["localStorage.setItem(GIFT_LANG_KEY, locale)", "localStorage.removeItem(GIFT_LANG_KEY)"]);
});

test("thanks and redeem pages are noindex and never in the sitemap or llms files", () => {
  const pages = src("../components/gift/GiftPages.tsx");
  assert.match(pages, /noIndex = page !== "gift"/);
  assert.match(pages, /robots: \{ index: false, follow: false \}/);
  assert.doesNotMatch(src("./llms.ts"), /gift|darilni-bon/i);
});

// MA1
test("redeem flow: no field names, method post, buttons disabled until hydrated, never a GET", () => {
  const f = src("../components/gift/RedeemFlow.tsx");
  assert.doesNotMatch(f, /\bname=/);
  assert.match(f, /<form method="post"/);
  assert.doesNotMatch(f, /method="get"/i);
  assert.match(f, /disabled=\{pending \|\| !mounted\}/);
  assert.doesNotMatch(src("../components/gift/ThanksClient.tsx"), /\bname=/);
});

// MA2
test("the printed voucher never shows a computed date", () => {
  const v = src("../components/gift/Voucher.tsx");
  const t = src("../components/gift/ThanksClient.tsx");
  assert.doesNotMatch(v, /formatGiftDate|validUntil|todayIso/);
  assert.doesNotMatch(t, /type="date"|validUntil|todayIso|formatGiftDate/);
  assert.equal(giftCopy.sl.thanks.voucher.validity, "Velja 12 mesecev od nakupa");
  assert.equal(giftCopy.en.thanks.voucher.validity, "Valid for 12 months from purchase");
  for (const l of locales) assert.ok(giftCopy[l].thanks.voucher.validity.includes("12"), l);
});

// MA3
test("no third-party script on the thanks and redeem pages", () => {
  for (const p of ["/gift/thanks", "/en/gift/thanks", "/sl/darilni-bon/hvala", "/redeem", "/en/redeem", "/sl/unovci", "/sl/unovci/", "/redeem/", ...locales.flatMap((l) => [giftPath(l, "thanks"), giftPath(l, "redeem")])]) assert.ok(isGiftPrivatePath(p), p);
  for (const p of ["/", "/gift", "/sl/darilni-bon", "/de/geschenkgutschein", "/sl", "/privacy", "/sl/pogoji", "/redeemx", null, undefined]) assert.ok(!isGiftPrivatePath(p as string), String(p));
  const layout = src("../app/[locale]/layout.tsx");
  assert.match(layout, /<PrivatePageGate>\s*<GoogleAnalytics \/>\s*<GoogleTagManager \/>\s*<\/PrivatePageGate>/);
  assert.match(src("../components/gift/PrivatePageGate.tsx"), /isGiftPrivatePath\(usePathname\(\)\)/);
  // the gift components load no script of their own
  for (const f of ["ThanksClient", "RedeemFlow", "AuthReturn", "Voucher", "GiftPages"]) assert.doesNotMatch(src(`../components/gift/${f}.tsx`), /next\/script|<script|createElement\("script"/);
});

// m3
test("switch on but no checkout URL: the sales page is out of the sitemap and noindex", () => {
  assert.equal(giftSitemapPaths(true, false), null);
  assert.deepEqual(giftSitemapPaths(true, true), giftPathsOf("gift"));
  assert.match(src("../components/gift/GiftPages.tsx"), /noIndex = page !== "gift" \|\| giftBuyUrl\(\) === null/);
});

// m1 / m4 / m5 / m6
test("manual build reads .env.production; refund text marked; SL copy; timeout message", () => {
  const ignore = src("../../.dockerignore");
  assert.match(ignore, /^\.env\*$/m);
  assert.match(ignore, /^!\.env\.production$/m);
  assert.doesNotMatch(src("../../Dockerfile"), /ARG NEXT_PUBLIC_(FEATURE_GIFT|LS_GIFT_URL|PETPREP_API_URL)/);
  assert.match(src("../content/gift/index.ts"), /TODO\(David\): the refund wording/);
  assert.doesNotMatch(JSON.stringify(giftCopy.sl), /botr/i);
  for (const l of locales) assert.ok(giftCopy[l].messages.timeout.length > 20, l);
  assert.match(src("../components/gift/RedeemFlow.tsx"), /AbortError" \? "timeout"/);
});
