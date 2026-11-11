// Gift voucher (M6-S01) unit tests: `npm test` (node:test). Contract §9.2 W1–W8.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  giftBuyUrl,
  giftPaths,
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
import { giftRedirects, giftSitemapPaths, giftStaticLocale } from "./giftRoutes.ts";
import { giftCopy } from "../content/gift.ts";
import { locales } from "../i18n/config.ts";

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
    [422, { error: "no_account" }, "no_account"],
    [409, { error: "already_redeemed" }, "already_redeemed"],
    [429, { error: "rate_limited" }, "rate_limited"],
    [502, { error: "upstream_error" }, "upstream_error"],
    [503, { error: "unavailable" }, "unavailable"],
  ];
  for (const [status, body, key] of cases) assert.equal(redeemOutcome(status, { ...(body as object), message: "x" }), key, `${status} ${JSON.stringify(body)}`);
  // every message key is reachable from some answer
  assert.deepEqual(new Set([...cases.map((c) => c[2]), ...clientOnlyKeys]), new Set(messageKeys));
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
  for (const lang of ["sl", "en"] as const) {
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
  assert.equal(giftCopy.sl.title, "Ne podarite kužka. Podarite preizkus.");
});

test("price and validity come from one constant", () => {
  assert.equal(formatGiftPrice("sl"), "49,99 €");
  assert.equal(formatGiftPrice("en"), "49.99 €");
});

// W5
test("switch: only the exact value 1 turns the feature on", () => {
  assert.equal(isGiftEnabled("1"), true);
  for (const v of [undefined, "", "0", "true", "on", " 1", "yes"]) assert.equal(isGiftEnabled(v), false, String(v));
  assert.equal(isPromiseKitEnabled("1"), true);
  assert.equal(isPromiseKitEnabled(undefined), false);
});

test("switch off: no static params, no redirects, no sitemap entry", () => {
  assert.deepEqual(giftStaticLocale("en", false), []);
  assert.deepEqual(giftStaticLocale("sl", false), []);
  assert.deepEqual(giftRedirects(false), []);
  assert.equal(giftSitemapPaths(false), null);
});

test("switch on: static params for EN and SL only; sitemap has the sales page only", () => {
  assert.deepEqual(giftStaticLocale("en", true), [{ locale: "en" }]);
  assert.deepEqual(giftStaticLocale("sl", true), [{ locale: "sl" }]);
  assert.deepEqual(giftSitemapPaths(true, true), { en: "/gift", sl: "/sl/darilni-bon" });
  const sitemap = src("../app/sitemap.ts");
  assert.doesNotMatch(sitemap, /thanks|hvala|redeem|unovci/);
});

// W8
test("other locales redirect to the English URL (308) when on", () => {
  const r = giftRedirects(true);
  const others = locales.filter((l) => l !== "en" && l !== "sl");
  assert.equal(r.length, others.length * 3 + 3);
  assert.ok(r.every((x) => x.permanent && x.destination.startsWith("/")));
  assert.ok(r.filter((x) => !x.source.startsWith("/sl/")).every((x) => !x.destination.startsWith("/sl")));
  // m7: the English slug under /sl goes to the Slovenian page
  assert.deepEqual(r.filter((x) => x.source.startsWith("/sl/")).map((x) => [x.source, x.destination]), [["/sl/gift", "/sl/darilni-bon"], ["/sl/gift/thanks", "/sl/darilni-bon/hvala"], ["/sl/redeem", "/sl/unovci"]]);
  assert.deepEqual(r.find((x) => x.source === "/de/gift"), { source: "/de/gift", destination: "/gift", permanent: true });
  assert.deepEqual(r.find((x) => x.source === "/nb/gift/thanks"), { source: "/nb/gift/thanks", destination: "/gift/thanks", permanent: true });
  assert.deepEqual(r.find((x) => x.source === "/fr/redeem"), { source: "/fr/redeem", destination: "/redeem", permanent: true });
  assert.ok(!r.some((x) => x.source.startsWith("/en/")));
});

test("public paths are the contract's", () => {
  assert.equal(giftPaths.gift.en, "/gift");
  assert.equal(giftPaths.gift.sl, "/sl/darilni-bon");
  assert.equal(giftPaths.thanks.en, "/gift/thanks");
  assert.equal(giftPaths.thanks.sl, "/sl/darilni-bon/hvala");
  assert.equal(giftPaths.redeem.en, "/redeem");
  assert.equal(giftPaths.redeem.sl, "/sl/unovci");
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
  const redeem = src("../components/gift/RedeemForm.tsx");
  const all = [thanks, voucher, redeem, src("../components/gift/BuyButton.tsx"), src("../components/gift/GiftPages.tsx")];
  for (const file of all) {
    assert.doesNotMatch(file, /searchParams|useSearchParams|location\.(search|hash)|URLSearchParams/);
    assert.doesNotMatch(file, /sessionStorage|indexedDB|document\.cookie|gtag|dataLayer|console\.(log|info|debug)/);
  }
  // thanks + voucher: no network at all, no router push with a query, storage only for the language marker
  for (const file of [thanks, voucher]) {
    assert.doesNotMatch(file, /fetch\(|XMLHttpRequest|sendBeacon|WebSocket/);
    assert.doesNotMatch(file, /setItem/);
  }
  const storageCalls = thanks.match(/localStorage\.\w+\(([^)]*)\)/g) ?? [];
  assert.ok(storageCalls.length > 0);
  for (const call of storageCalls) assert.match(call, /^localStorage\.(getItem|removeItem)\(GIFT_LANG_KEY\)$/);
  assert.doesNotMatch(thanks, /router\.(push|replace)\([^)]*code/);
  // redeem: no storage of any kind; the only request is the POST to the API with the code in the JSON body
  assert.doesNotMatch(redeem, /localStorage/);
  assert.equal((redeem.match(/fetch\(/g) ?? []).length, 1);
  assert.match(redeem, /\/api\/gift\/redeem/);
  assert.match(redeem, /method: "POST"/);
  // the buy button only ever stores the language
  const buy = src("../components/gift/BuyButton.tsx");
  assert.deepEqual(buy.match(/localStorage\.\w+\([^)]*\)/g), ['localStorage.setItem(GIFT_LANG_KEY, "sl")', "localStorage.removeItem(GIFT_LANG_KEY)"].map((s) => s.replace("localStorage", "window.localStorage").replace("window.", "")));
});

test("thanks and redeem pages are noindex and never in the sitemap or llms files", () => {
  const pages = src("../components/gift/GiftPages.tsx");
  assert.match(pages, /noIndex = page !== "gift"/);
  assert.match(pages, /robots: \{ index: false, follow: false \}/);
  assert.doesNotMatch(src("./llms.ts"), /gift|darilni-bon/i);
});

// MA1
test("redeem form: no field names, method post, button disabled until hydrated, never a GET", () => {
  const f = src("../components/gift/RedeemForm.tsx");
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
});

// MA3
test("no third-party script on the thanks and redeem pages", () => {
  for (const p of ["/gift/thanks", "/en/gift/thanks", "/sl/darilni-bon/hvala", "/redeem", "/en/redeem", "/sl/unovci", "/sl/unovci/", "/redeem/"]) assert.ok(isGiftPrivatePath(p), p);
  for (const p of ["/", "/gift", "/sl/darilni-bon", "/sl", "/privacy", "/sl/pogoji", "/redeemx", null, undefined]) assert.ok(!isGiftPrivatePath(p as string), String(p));
  const layout = src("../app/[locale]/layout.tsx");
  assert.match(layout, /<PrivatePageGate>\s*<GoogleAnalytics \/>\s*<GoogleTagManager \/>\s*<\/PrivatePageGate>/);
  assert.match(src("../components/gift/PrivatePageGate.tsx"), /isGiftPrivatePath\(usePathname\(\)\)/);
  // the gift components load no script of their own
  for (const f of ["ThanksClient", "RedeemForm", "Voucher", "GiftPages"]) assert.doesNotMatch(src(`../components/gift/${f}.tsx`), /next\/script|<script|createElement\("script"/);
});

// m3
test("switch on but no checkout URL: the sales page is out of the sitemap and noindex", () => {
  assert.equal(giftSitemapPaths(true, false), null);
  assert.deepEqual(giftSitemapPaths(true, true), { en: "/gift", sl: "/sl/darilni-bon" });
  assert.match(src("../components/gift/GiftPages.tsx"), /noIndex = page !== "gift" \|\| giftBuyUrl\(\) === null/);
});

// m1 / m4 / m5 / m6
test("manual build reads .env.production; refund text marked; SL copy; timeout message", () => {
  const ignore = src("../../.dockerignore");
  assert.match(ignore, /^\.env\*$/m);
  assert.match(ignore, /^!\.env\.production$/m);
  assert.doesNotMatch(src("../../Dockerfile"), /ARG NEXT_PUBLIC_(FEATURE_GIFT|LS_GIFT_URL|PETPREP_API_URL)/);
  assert.match(src("../content/gift.ts"), /TODO\(David\): the refund wording/);
  assert.doesNotMatch(JSON.stringify(giftCopy.sl), /botr/i);
  for (const l of ["sl", "en"] as const) assert.ok(giftCopy[l].messages.timeout.length > 20);
  assert.match(src("../components/gift/RedeemForm.tsx"), /AbortError" \? "timeout"/);
});
