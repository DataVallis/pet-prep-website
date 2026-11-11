// Unit tests for the partner form logic and the partner page numbers: `npm test` (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildPayload, classify, endpoint, validate, DEFAULT_API_BASE } from "./partnerInquiry.ts";
import { computePartnerStats, fill, formatAsOf } from "./partnerStats.ts";

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
  assert.equal(formatAsOf("2026-11-11", "sl"), "11. november 2026");
  assert.equal(formatAsOf("2026-11-11", "en"), "11 November 2026");
  assert.equal(fill("{a} x {a}", { a: 1 }), "1 x 1");
});
