// Unit test for the /investors live numbers: `npm test` (node:test, TypeScript run natively by Node 22).
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeInvestorStats, sourceIdsOf } from "./investorStatsCore.ts";

const registry = {
  species: [{ id: "dog" }, { id: "cat" }],
  breeds: [
    { id: "a", species: "dog", facts: [{ source_ids: ["S1", "S2"] }], health: [{ source_ids: ["S2"] }] },
    { id: "b", species: "dog", facts: [{ source_ids: ["S3"] }] },
    { id: "c", species: "cat", facts: [{ source_ids: ["S1"] }], intro: { source_id: "S4" } },
  ],
  sources: [
    { id: "S1", url: "https://www.fci.be/x" },
    { id: "S2", url: "https://pdsa.org.uk/y/" },
    { id: "S3", url: "https://akc.org/z" },
    { id: "S4" },
    { id: "S9", url: "https://unused.example" },
  ],
};
const care = {
  foods: [
    { species: "dog", slug: "grapes", locales: ["en", "sl"] },
    { species: "cat", slug: "grapes", locales: ["en"] },
    { species: "dog", slug: "draft", locales: [] },
  ],
  sources: [{ url: "http://fci.be/x" }, { url: "https://vca.com/a" }],
  vets: [{ country: "SI" }, { country: "SI" }, { country: "HR" }],
};

test("counts come from the data", () => {
  const s = computeInvestorStats({ registry, care, locales: ["en", "sl", "de"], coloringPages: 12, youtube: { episodes: 10, views: 1234 } });
  assert.deepEqual(s.breeds, { total: 3, perSpecies: { dog: 2, cat: 1 } });
  // S1–S4 used (S9 not), care adds vca.com; fci.be is the same URL as S1 → 5.
  assert.equal(s.sources, 5);
  assert.equal(s.foods, 2);
  assert.equal(s.languages, 3);
  assert.equal(s.vetCountries, 2);
  assert.equal(s.coloringPages, 12);
  assert.equal(s.episodes, 10);
  assert.equal(s.views, 1234);
});

test("a missing source hides its card (null, never 0)", () => {
  const s = computeInvestorStats({ registry: null, care: null, locales: null, coloringPages: 0, youtube: null });
  assert.equal(s.breeds, null);
  assert.equal(s.sources, null);
  assert.equal(s.foods, null);
  assert.equal(s.languages, null);
  assert.equal(s.vetCountries, null);
  assert.equal(s.coloringPages, null);
  assert.equal(s.episodes, null);
  assert.equal(s.views, null);
});

test("no vet directory yet → hidden; no YouTube key → episodes and views hidden", () => {
  const s = computeInvestorStats({ registry, care: { ...care, vets: [] }, locales: ["en"], coloringPages: 12, youtube: null });
  assert.equal(s.vetCountries, null);
  assert.equal(s.episodes, null);
  assert.equal(s.views, null);
});

test("views without episodes are not shown", () => {
  const s = computeInvestorStats({ registry, care, locales: ["en"], coloringPages: 1, youtube: { episodes: null, views: 99 } });
  assert.equal(s.views, null);
});

test("source ids are collected from any depth", () => {
  assert.deepEqual([...sourceIdsOf({ a: [{ b: { source_ids: ["X"] } }], source_id: "Y" })].sort(), ["X", "Y"]);
});
