// Switch, URL and sitemap behaviour of the Pet Promise Kit sales page: `npm test` (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { locales, salesSlugs, pageSlugs } from "../i18n/config.ts";
import { formatKitPrice, checkoutUrl, giftEnabled, promiseKitAlternatePaths, promiseKitEnabled, promiseKitFooterHref, promiseKitLocales, promiseKitPath, promiseKitSitemapEntries } from "./promiseKit.ts";
import { kitCopy } from "../content/promise-kit/index.ts";

test("switch is on only for the exact value 1", () => {
  assert.equal(promiseKitEnabled("1"), true);
  for (const v of [undefined, "", "0", "true", "yes", " 1"]) assert.equal(promiseKitEnabled(v), false, String(v));
  assert.equal(giftEnabled("1"), true);
  assert.equal(giftEnabled(undefined), false);
});

test("localized paths: English at the root, other languages under their prefix", () => {
  assert.equal(promiseKitPath("en"), "/promise-kit");
  assert.equal(promiseKitPath("sl"), "/sl/obljuba-o-ljubljencku");
  assert.equal(promiseKitPath("de"), "/de/haustier-versprechen");
  assert.equal(promiseKitPath("nb"), "/nb/kjaeledyrloftet");
  for (const l of locales) {
    const taken = new Set(Object.values(pageSlugs).map((m) => (m as Record<string, string>)[l]));
    assert.ok(!taken.has(salesSlugs.promiseKit[l]), l);
  }
});

test("price is formatted per language", () => {
  const nb = (x: string) => x.replace(/[\u00a0\u202f]/g, " ");
  assert.equal(nb(formatKitPrice("sl")), "6,90 €");
  assert.equal(nb(formatKitPrice("en")), "€6.90");
  for (const l of locales) assert.match(formatKitPrice(l), /6[.,]90/, l);
});

test("switch off: no locales, no sitemap rows, no footer link", () => {
  assert.deepEqual(promiseKitLocales(false), []);
  assert.deepEqual(promiseKitSitemapEntries(false), []);
  for (const l of locales) assert.equal(promiseKitFooterHref(false, l), undefined);
});

test("switch on: all 15 languages in the sitemap and the hreflang map", () => {
  assert.deepEqual([...promiseKitLocales(true)].sort(), [...locales].sort());
  const rows = promiseKitSitemapEntries(true);
  assert.equal(rows.length, locales.length);
  assert.equal(rows.find((r) => r.locale === "en")?.path, "/promise-kit");
  assert.deepEqual(Object.keys(promiseKitAlternatePaths()).sort(), [...locales].sort());
  assert.equal(promiseKitFooterHref(true, "sl"), "/sl/obljuba-o-ljubljencku");
  for (const l of locales) assert.equal(promiseKitFooterHref(true, l), promiseKitPath(l), l);
  assert.equal(promiseKitFooterHref(true, "xx"), undefined);
});

test("checkout URL: missing, empty, non-https or invalid values hide the button", () => {
  assert.equal(checkoutUrl(undefined), undefined);
  assert.equal(checkoutUrl("  "), undefined);
  assert.equal(checkoutUrl("http://shop.example/x"), undefined);
  assert.equal(checkoutUrl("javascript:alert(1)"), undefined);
  assert.equal(checkoutUrl("not a url"), undefined);
  assert.equal(checkoutUrl(" https://petprep.lemonsqueezy.com/buy/abc "), "https://petprep.lemonsqueezy.com/buy/abc");
});

test("kit copy: all 15 languages have the same shape, ten questions, empty cost fields, no ages or company name", () => {
  const ref = kitCopy.en;
  assert.deepEqual(Object.keys(kitCopy).sort(), [...locales].sort());
  for (const l of locales) {
    const c = kitCopy[l];
    assert.equal(c.talk.questions.length, 10, l);
    assert.deepEqual(c.sections.map((s) => s.id), ref.sections.map((s) => s.id), l);
    assert.equal(c.cost.rows.length, 6, l);
    assert.equal(c.cost.head.length, ref.cost.head.length, l);
    assert.equal(c.weeks.notes.length, 4, l);
    assert.equal(c.weeks.days.length, 7, l);
    assert.equal(c.weeks.tasks.length, ref.weeks.tasks.length, l);
    assert.equal(c.promise.tasks.length, ref.promise.tasks.length, l);
    assert.equal(c.ready.items.length, ref.ready.items.length, l);
    assert.equal(c.next.steps.length, ref.next.steps.length, l);
    assert.match(c.promise.childIntro, /\{name\}/, l);
    assert.match(c.common.pageOf, /\{n\}.*\{total\}/, l);
    const all = JSON.stringify(c);
    assert.doesNotMatch(all, /Data Vallis/i, l);
    assert.doesNotMatch(all, /\d\s?(€|EUR)/, `${l}: the kit prints no amounts`);
    assert.doesNotMatch(all, /\b\d+\s?(years? old|let star|leti|let\b)/i, `${l}: no ages`);
    assert.doesNotMatch(all, /→/, `${l}: the font has no arrow glyph`);
  }
});
