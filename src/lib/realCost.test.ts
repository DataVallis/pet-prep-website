import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { realCostAlternates, realCostBase, realCostCopy, realCostLegacy, realCostLocales, realCostPath, withArticle } from "../content/realCost.ts";
import { realCostProfile, realCostQuery } from "./realCostProfile.ts";
import { buildHtml, outFile } from "../../scripts/build-real-cost.mjs";

type RegBreed = Parameters<typeof realCostProfile>[0] & { name: Record<string, string>; slug: Record<string, string> };
const registry = JSON.parse(readFileSync(new URL("../content/registry/registry.json", import.meta.url), "utf8")) as { breeds: RegBreed[] };
const dogs = registry.breeds.filter((b) => b.species === "dog");
const lab = dogs.find((b) => b.id === "labrador_retriever")!;
const labProfile = realCostProfile(lab)!;

test("paths: English at the root, Slovenian under /sl, bases match the route folders", async () => {
  assert.equal(realCostPath("en", "labrador-retriever"), "/how-much-work-is-a-dog/labrador-retriever");
  assert.equal(realCostPath("sl", "labradorec"), "/sl/koliko-je-dela-s-psom/labradorec");
  for (const l of realCostLocales) {
    const page = await readFile(new URL(`../app/[locale]/${realCostBase[l]}/[breed]/page.tsx`, import.meta.url), "utf8");
    assert.ok(page.includes(`const LOCALE = "${l}" as const;`), `${realCostBase[l]}/[breed]/page.tsx serves ${l}`);
  }
});

test("the old Labrador URLs redirect to the Labrador's page", () => {
  for (const r of realCostLegacy) assert.equal(r.breedSlug, lab.slug[r.locale]);
});

test("hreflang: both languages and x-default = English", () => {
  const abs = (p: string) => `https://petprep.si${p}`;
  assert.deepEqual(realCostAlternates(abs, { en: "labrador-retriever", sl: "labradorec" }), {
    en: "https://petprep.si/how-much-work-is-a-dog/labrador-retriever",
    sl: "https://petprep.si/sl/koliko-je-dela-s-psom/labradorec",
    "x-default": "https://petprep.si/how-much-work-is-a-dog/labrador-retriever",
  });
});

test("every dog breed of the register gets a profile (new breeds included automatically)", () => {
  const missing = dogs.filter((b) => !realCostProfile(b)).map((b) => b.id);
  assert.deepEqual(missing, [], "breeds without exercise, lifespan or size in the register");
  for (const b of dogs) {
    const p = realCostProfile(b)!;
    assert.ok(p.walkMin >= 10 && p.walkMin <= 240, `${b.id} walk ${p.walkMin}`);
    assert.ok(p.lifeYears >= 4 && p.lifeYears <= 25, `${b.id} life ${p.lifeYears}`);
  }
});

test("the Labrador keeps the numbers of the first page (90 min, 13.1 years, once a week, large dog)", () => {
  assert.equal(labProfile.walkMin, 90);
  assert.equal(labProfile.walkQ, "at_least");
  assert.equal(labProfile.lifeYears, 13.1);
  assert.equal(labProfile.groom, "once_a_week");
  assert.equal(labProfile.size, "large");
});

test("cats and breeds without data get no page", () => {
  assert.equal(realCostProfile({ id: "x", species: "cat", facets: { size: "small" }, facts: [] }), null);
  assert.equal(realCostProfile({ id: "x", species: "dog", facets: { size: "small" }, facts: [] }), null);
});

test("query for the embedded app carries the breed's numbers", () => {
  const q = realCostQuery(labProfile, "Labradorec");
  assert.deepEqual(q, { breed: "labrador_retriever", name: "Labradorec", walk: "90", walkq: "at_least", life: "13.1", lifeq: "median", lifelo: "13.1", lifehi: "13.1", groom: "once_a_week", size: "large" });
});

test("English article: a / an", () => {
  assert.equal(withArticle("Labrador Retriever"), "a Labrador Retriever");
  assert.equal(withArticle("Afghan Hound"), "an Afghan Hound");
});

test("copy: same shape in both languages, for every breed", () => {
  for (const b of dogs) {
  const p = realCostProfile(b)!;
  const en = realCostCopy("en", b.name.en, p), sl = realCostCopy("sl", b.name.sl, p);
  assert.equal(sl.facts.rows.length, en.facts.rows.length);
  assert.equal(sl.how.items.length, en.how.items.length);
  assert.equal(sl.sources.items.length, en.sources.items.length);
  for (const c of [en, sl]) {
    assert.ok(c.meta.description.length <= 170, "meta description fits a search snippet");
    assert.ok(c.meta.title.includes("PetPrep"));
    assert.ok(!/labrador/i.test(JSON.stringify(c)) || b.id === "labrador_retriever", `${b.id}: no Labrador text`);
  }
  }
});

test("public/real-cost/app.html is the current build of tools/real-cost/", async () => {
  const [built, committed] = await Promise.all([buildHtml(), readFile(outFile, "utf8")]);
  assert.equal(committed, built, "run `npm run real-cost:build` and commit public/real-cost/app.html");
});

test("the embedded app makes no third-party request and writes e-mails only from petprep.si", async () => {
  const html = await readFile(outFile, "utf8");
  for (const host of ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net", "unpkg.com"]) {
    assert.ok(!html.includes(host), `no request to ${host}`);
  }
  assert.ok(html.includes("/real-cost/fonts/InstrumentSans-400.woff2"));
  assert.ok(html.includes("https://api.petprep.si"));
  assert.ok(html.includes("/api/summary-leads"));
  // The API override exists only for localhost tests.
  const source = await readFile(new URL("../../tools/real-cost/src/main.js", import.meta.url), "utf8");
  assert.match(source, /LOCAL && QUERY\.get\('api'\)/);
});

test("the embedded app validates every breed parameter (a shared link can carry anything)", async () => {
  const source = await readFile(new URL("../../tools/real-cost/src/main.js", import.meta.url), "utf8");
  assert.match(source, /const NAME_RAW = .*replace\(\/\[<>&"'`\\\\\]\/g, ''\)/, "the breed name is stripped of HTML characters");
  for (const k of ["walk", "life", "lifelo", "lifehi"]) assert.ok(source.includes(`qNum('${k}'`), `${k} is range-checked`);
  for (const k of ["walkq", "lifeq", "groom", "size"]) assert.ok(source.includes(`qPick('${k}'`), `${k} is from a fixed list`);
});
