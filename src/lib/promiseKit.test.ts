// Switch, URL and sitemap behaviour of the Pet Promise Kit sales page: `npm test` (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkoutUrl, giftEnabled, promiseKitAlternatePaths, promiseKitEnabled, promiseKitFooterHref, promiseKitLocales, promiseKitPath, promiseKitSitemapEntries } from "./promiseKit.ts";
import { kitCopy } from "../content/promise-kit/index.ts";

test("switch is on only for the exact value 1", () => {
  assert.equal(promiseKitEnabled("1"), true);
  for (const v of [undefined, "", "0", "true", "yes", " 1"]) assert.equal(promiseKitEnabled(v), false, String(v));
  assert.equal(giftEnabled("1"), true);
  assert.equal(giftEnabled(undefined), false);
});

test("localized paths: English at the root, Slovenian under /sl", () => {
  assert.equal(promiseKitPath("en"), "/promise-kit");
  assert.equal(promiseKitPath("sl"), "/sl/obljuba-o-ljubljencku");
});

test("switch off: no locales, no sitemap rows, no footer link", () => {
  assert.deepEqual(promiseKitLocales(false), []);
  assert.deepEqual(promiseKitSitemapEntries(false), []);
  assert.equal(promiseKitFooterHref(false, "en"), undefined);
  assert.equal(promiseKitFooterHref(false, "sl"), undefined);
});

test("switch on: only English and Slovenian, hreflang points to those two only", () => {
  assert.deepEqual(promiseKitLocales(true), ["en", "sl"]);
  const rows = promiseKitSitemapEntries(true);
  assert.deepEqual(rows.map((r) => r.path), ["/promise-kit", "/sl/obljuba-o-ljubljencku"]);
  for (const r of rows) assert.deepEqual(Object.keys(r.languages).sort(), ["en", "sl", "x-default"]);
  assert.equal(rows[0].languages["x-default"], "/promise-kit");
  assert.deepEqual(promiseKitAlternatePaths(), { en: "/promise-kit", sl: "/sl/obljuba-o-ljubljencku" });
  assert.equal(promiseKitFooterHref(true, "sl"), "/sl/obljuba-o-ljubljencku");
  for (const other of ["de", "fr", "es", "it", "pt", "nl", "pl", "cs", "hr", "sv", "da", "fi", "nb"]) assert.equal(promiseKitFooterHref(true, other), undefined, other);
});

test("checkout URL: missing, empty, non-https or invalid values hide the button", () => {
  assert.equal(checkoutUrl(undefined), undefined);
  assert.equal(checkoutUrl("  "), undefined);
  assert.equal(checkoutUrl("http://shop.example/x"), undefined);
  assert.equal(checkoutUrl("javascript:alert(1)"), undefined);
  assert.equal(checkoutUrl("not a url"), undefined);
  assert.equal(checkoutUrl(" https://petprep.lemonsqueezy.com/buy/abc "), "https://petprep.lemonsqueezy.com/buy/abc");
});

test("kit copy: both languages have the same shape, ten questions, empty cost fields, no ages or company name", () => {
  const { en, sl } = kitCopy;
  assert.equal(en.talk.questions.length, 10);
  assert.equal(sl.talk.questions.length, 10);
  assert.deepEqual(en.sections.map((s) => s.id), sl.sections.map((s) => s.id));
  assert.equal(en.cost.rows.length, sl.cost.rows.length);
  assert.equal(en.weeks.notes.length, 4);
  assert.equal(sl.weeks.notes.length, 4);
  const all = JSON.stringify(kitCopy);
  assert.doesNotMatch(all, /Data Vallis/i);
  assert.doesNotMatch(all, /\d\s?(€|EUR)/, "the kit prints no amounts");
  assert.doesNotMatch(all, /\b\d+\s?(years? old|let star|leti|let\b)/i, "no ages");
});
