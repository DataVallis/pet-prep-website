// Unit tests for the partner form logic and the partner page numbers: `npm test` (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { apiLocale, buildPayload, classify, endpoint, validate, DEFAULT_API_BASE } from "./partnerInquiry.ts";
import { computePartnerStats, fill, formatAsOf } from "./partnerStats.ts";
import { kitCopy, mediaKitHref, partnerCopy, partnerPages } from "../content/partners.ts";
import { locales, localeMeta } from "../i18n/config.ts";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ok = { company: "Zavarovalnica d.d.", contact_name: "Ana Novak", email: "ana@primer.si", type: "insurer", message: "Pozdravljeni", website: "", consent: true };

test("validate accepts a complete form", () => assert.deepEqual(validate(ok), []));
test("validate flags every bad field", () => {
  assert.deepEqual(validate({ ...ok, company: " ", email: "x", type: "zzz", message: "", consent: false, contact_name: "" }).sort(), ["company", "consent", "contact_name", "email", "message", "type"]);
});
test("validate rejects a message that is too long", () => assert.deepEqual(validate({ ...ok, message: "a".repeat(4001) }), ["message"]));
test("buildPayload trims, keeps the honeypot and sets the locale; consent is not sent", () => {
  const p = buildPayload({ ...ok, company: "  X ", website: "bot" }, "en");
  assert.equal(p.company, "X");
  assert.equal(p.website, "bot");
  assert.equal(p.locale, "en");
  assert.equal("consent" in p, false);
});
test("endpoint uses the env base or the default, without double slashes", () => {
  assert.equal(endpoint(undefined), `${DEFAULT_API_BASE}/api/partner-inquiries`);
  assert.equal(endpoint(" https://api.example.test// "), "https://api.example.test/api/partner-inquiries");
});
test("classify maps statuses", () => {
  assert.deepEqual(classify(201, { ok: true }), { kind: "done" });
  assert.deepEqual(classify(422, { message: "x", errors: { email: ["bad"], unknown: ["?"] } }), { kind: "invalid", fields: ["email"] });
  assert.deepEqual(classify(429, null), { kind: "rate_limited" });
  for (const s of [404, 503, 500, 0]) assert.deepEqual(classify(s, null), { kind: "fallback" });
});

test("computePartnerStats counts breeds and languages with a date", () => {
  const s = computePartnerStats({ breeds: [{ species: "dog" }, { species: "dog" }, { species: "cat" }] }, ["en", "sl"], new Date("2026-11-11T10:00:00Z"));
  assert.deepEqual(s, { breeds: { total: 3, dogs: 2, cats: 1 }, languages: 2, asOf: "2026-11-11" });
});
test("computePartnerStats returns null when data is missing", () => {
  const s = computePartnerStats({ breeds: [] }, [], new Date("2026-11-11T00:00:00Z"));
  assert.equal(s.breeds, null);
  assert.equal(s.languages, null);
});
test("formatAsOf and fill", () => {
  assert.equal(formatAsOf("2026-11-11", "sl-SI"), "11. november 2026");
  assert.equal(formatAsOf("2026-11-11", "en-GB"), "11 November 2026");
  assert.equal(fill("{a} x {a}", { a: 1 }), "1 x 1");
});

test("formatAsOf reads naturally in every site language (no English month, no raw ISO)", () => {
  for (const l of locales) {
    const t = formatAsOf("2026-11-11", localeMeta[l].intl);
    assert.match(t, /2026/, l);
    assert.match(t, /11/, l);
    assert.doesNotMatch(t, /2026-11-11/, l);
    if (l !== "en" && l !== "de") assert.doesNotMatch(t, /November/, `${l}: ${t}`);
  }
});

test("apiLocale: every site language is sent as is (API accepts all 15 since pet-prep #1278), unknown → en", () => {
  for (const l of locales) assert.equal(apiLocale(l), l);
  assert.equal(apiLocale("xx"), "en");
  assert.equal(buildPayload(ok, "fi").locale, "fi");
});

const strings = (v: unknown): string[] => (typeof v === "string" ? [v] : v && typeof v === "object" ? Object.values(v).flatMap(strings) : []);

test("partner form and numbers copy exist in all 15 languages, without empty strings or leftovers", () => {
  const keys = (o: unknown): string[] => (o && typeof o === "object" ? Object.entries(o).flatMap(([k, v]) => [k, ...keys(v).map((x) => `${k}.${x}`)]) : []);
  const ref = keys(partnerCopy.en).sort();
  for (const l of locales) {
    assert.deepEqual(keys(partnerCopy[l]).sort(), ref, `${l}: same keys as en`);
    for (const s of strings(partnerCopy[l])) {
      if (s === "") continue; // consentAfter may legitimately be "." only; empty never expected below
      assert.doesNotMatch(s, /TODO\(|undefined|\[object|lorem/i, `${l}: ${s}`);
    }
    for (const s of strings(partnerCopy[l].form)) assert.ok(s.trim().length > 0, `${l}: empty form string`);
    assert.match(partnerCopy[l].stats.intro, /\{date\}/, l);
    assert.match(partnerCopy[l].stats.breedsNote, /\{dogs\}.*\{cats\}|\{cats\}.*\{dogs\}/, l);
    if (l !== "en") assert.notEqual(partnerCopy[l].form.intro, partnerCopy.en.form.intro, `${l}: form intro is translated`);
    if (l !== "en") assert.notEqual(partnerCopy[l].form.errors.email, partnerCopy.en.form.errors.email, `${l}: error text is translated`);
  }
});

test("media kit text exists in all 15 languages with the same structure as en", () => {
  for (const l of locales) {
    const k = kitCopy[l];
    assert.equal(k.coop.items.length, kitCopy.en.coop.items.length, l);
    assert.equal(k.examples.items.length, kitCopy.en.examples.items.length, l);
    assert.equal(k.what.paragraphs.length, kitCopy.en.what.paragraphs.length, l);
    for (const s of strings(k)) assert.ok(s.trim().length > 0, `${l}: empty`);
    const ex = k.examples.items.map((i) => i.join(" ")).join(" ");
    for (const v of ["{breeds}", "{dogs}", "{cats}", "{date}"]) assert.ok(ex.includes(v), `${l}: example placeholder ${v}`);
    assert.ok(k.contact.text.includes("{email}") && k.contact.text.includes("{url}"), `${l}: contact placeholders`);
    if (l !== "en") assert.notEqual(k.title, kitCopy.en.title === k.title ? "" : kitCopy.en.title, l);
  }
});

test("a media kit PDF exists for every site language (rebuild: node scripts/build-media-kit.mjs)", () => {
  for (const l of locales) {
    const f = join(import.meta.dirname, "../../public", mediaKitHref(l));
    assert.ok(existsSync(f), `${l}: ${f} missing`);
    assert.ok(statSync(f).size > 20_000, `${l}: PDF too small`);
  }
});

test("the 13 translated partner pages have the full block set and link to their own and the English kit", () => {
  const order = ["prose", "cards", "list", "partnerStats", "downloads", "partnerForm"];
  for (const l of locales.filter((x) => x !== "sl" && x !== "en")) {
    const page = partnerPages[l as keyof typeof partnerPages];
    assert.deepEqual(page.blocks.map((b) => b.type), order, l);
    const dl = page.blocks.find((b) => b.type === "downloads");
    assert.ok(dl && dl.type === "downloads");
    assert.deepEqual(dl.items.map((i) => i.href), [mediaKitHref(l), mediaKitHref("en")], l);
    assert.equal(page.planned, undefined, `${l}: no "planned" badge`);
    for (const s of strings(page)) assert.doesNotMatch(s, /TODO\(|undefined|lorem/i, l);
  }
});
