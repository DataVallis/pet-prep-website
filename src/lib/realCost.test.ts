import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { realCostAlternates, realCostBase, realCostCopy, realCostLegacy, realCostLocales, realCostPath, withArticle } from "../content/realCost.ts";
import { locales, localeMeta, pageSlugs, salesSlugs } from "../i18n/config.ts";
import { PHRASES, unit } from "../../tools/real-cost/src/phrases.js";
import { STR } from "../../tools/real-cost/src/strings.js";
import { realCostProfile, realCostQuery } from "./realCostProfile.ts";
import { buildHtml, outFile } from "../../scripts/build-real-cost.mjs";

type RegBreed = Parameters<typeof realCostProfile>[0] & { name: Record<string, string>; slug: Record<string, string> };
const registry = JSON.parse(readFileSync(new URL("../content/registry/registry.json", import.meta.url), "utf8")) as { breeds: RegBreed[] };
const dogs = registry.breeds.filter((b) => b.species === "dog");
const lab = dogs.find((b) => b.id === "labrador_retriever")!;
const labProfile = realCostProfile(lab)!;

test("paths: English at the root, other languages under /<locale>, one ASCII base per language", () => {
  assert.equal(realCostPath("en", "labrador-retriever"), "/how-much-work-is-a-dog/labrador-retriever");
  assert.equal(realCostPath("sl", "labradorec"), "/sl/koliko-je-dela-s-psom/labradorec");
  assert.equal(realCostPath("de", "labrador-retriever"), "/de/wie-viel-arbeit-ist-ein-hund/labrador-retriever");
  assert.deepEqual([...realCostLocales], [...locales]);
  const bases = locales.map((l) => realCostBase[l]);
  assert.equal(new Set(bases).size, locales.length, "bases are unique");
  const taken = new Set<string>([...Object.values(pageSlugs).flatMap((m) => Object.values(m)), ...Object.values(salesSlugs).flatMap((m) => Object.values(m))]);
  for (const l of locales) {
    assert.match(realCostBase[l], /^[a-z0-9]+(-[a-z0-9]+)*$/, `${l} base is ASCII kebab-case`);
    assert.ok(!taken.has(realCostBase[l]), `${l} base collides with a page slug`);
  }
});

test("the old Labrador URLs redirect to the Labrador's page", () => {
  for (const r of realCostLegacy) assert.equal(r.breedSlug, lab.slug[r.locale]);
});

test("hreflang: all 15 languages and x-default = English", () => {
  const abs = (p: string) => `https://petprep.si${p}`;
  const slug = Object.fromEntries(locales.map((l) => [l, l === "sl" ? "labradorec" : "labrador-retriever"])) as Record<(typeof locales)[number], string>;
  const alt = realCostAlternates(abs, slug);
  assert.equal(Object.keys(alt).length, locales.length + 1);
  assert.equal(alt.en, "https://petprep.si/how-much-work-is-a-dog/labrador-retriever");
  assert.equal(alt.sl, "https://petprep.si/sl/koliko-je-dela-s-psom/labradorec");
  assert.equal(alt.pl, "https://petprep.si/pl/ile-pracy-wymaga-pies/labrador-retriever");
  assert.equal(alt["x-default"], alt.en);
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

test("copy: same shape in all 15 languages, for every breed", () => {
  for (const b of dogs) {
    const p = realCostProfile(b)!;
    const en = realCostCopy("en", b.name.en, p);
    for (const l of locales) {
      const name = b.name[l] ?? b.name.en;
      const c = realCostCopy(l, name, p);
      assert.equal(c.facts.rows.length, en.facts.rows.length, `${b.id} ${l} rows`);
      assert.equal(c.how.items.length, en.how.items.length);
      assert.equal(c.sources.items.length, en.sources.items.length);
      assert.ok(c.meta.description.length <= 170, `${b.id} ${l}: meta description ${c.meta.description.length} chars`);
      assert.ok(c.meta.title.includes("PetPrep"));
      for (const str of [c.meta.title, c.meta.description, c.eyebrow, c.title, c.lead, c.frameTitle, c.noScript, c.facts.title, c.facts.intro, c.facts.footnote, c.how.title, c.sources.title, c.email.title, c.email.text, c.registryLink.title, c.registryLink.text, c.registryLink.cta, ...c.facts.rows.flatMap((r) => [r.label, r.value, r.note]), ...c.how.items, ...c.sources.items]) assert.ok(!/[{}]/.test(str) && str.trim() !== "", `${b.id} ${l}: leftover placeholder or empty text: ${str}`);
      assert.ok(!/NaN|undefined/.test(JSON.stringify(c)), `${b.id} ${l}: NaN or undefined`);
      assert.ok(c.title.includes(name) || l === "en", `${b.id} ${l}: title carries the breed name`);
      assert.ok(!/labrador/i.test(JSON.stringify(c)) || /labrador/i.test(name) || b.id === "labrador_retriever", `${b.id} ${l}: no Labrador text`);
    }
  }
});

test("the page and the app share one language list, with the same Intl locale as the site", () => {
  assert.deepEqual(Object.keys(PHRASES).sort(), [...locales].sort());
  assert.deepEqual(Object.keys(STR).sort(), [...locales].sort());
  for (const l of locales) assert.equal(PHRASES[l].intl, localeMeta[l].intl, `${l} intl`);
});

test("app strings: every language has exactly the English keys and only known placeholders", () => {
  const known = /^\{(name|name_a|years|years_u|walk_text|life_text|groom_text|size_text|cost_m|cost_s|cost_m_c|cost_s_c|n|c|m|h|r)\}$/;
  for (const l of locales) {
    assert.deepEqual(Object.keys(STR[l]).sort(), Object.keys(STR.en).sort(), `${l} keys`);
    for (const [k, v] of Object.entries(STR[l] as Record<string, string>)) {
      assert.ok(v.trim().length > 0, `${l}.${k} empty`);
      for (const ph of v.match(/\{[^}]*\}/g) ?? []) assert.match(ph, known, `${l}.${k}: ${ph}`);
      // a placeholder of the English text must survive translation (numbers and amounts)
      for (const ph of (STR.en as Record<string, string>)[k].match(/\{(n|c|m|h|r)\}/g) ?? []) assert.ok(v.includes(ph), `${l}.${k} lost ${ph}`);
    }
  }
});

test("plural forms: Polish, Czech, Croatian and Slovenian units are right for the real values", () => {
  const f = (l: keyof typeof PHRASES, kind: "min" | "hour" | "year", n: number) => unit(l, kind, n, (x: number) => String(x).replace(".", ","));
  assert.equal(f("pl", "year", 12), "12 lat");
  assert.equal(f("pl", "year", 13.1), "13,1 roku");
  assert.equal(f("pl", "min", 90), "90 minut");
  assert.equal(f("pl", "hour", 22), "22 godziny");
  assert.equal(f("cs", "year", 7), "7 let");
  assert.equal(f("cs", "year", 13.1), "13,1 roku");
  assert.equal(f("cs", "hour", 3), "3 hodiny");
  assert.equal(f("hr", "year", 11), "11 godina");
  assert.equal(f("hr", "year", 13.1), "13,1 godine");
  assert.equal(f("hr", "hour", 21), "21 sat");
  assert.equal(f("sl", "year", 13), "13 let");
  assert.equal(f("sl", "year", 13.1), "13,1 leta");
  assert.equal(f("sl", "hour", 11.1), "11,1 ure");
  assert.equal(f("en", "year", 1), "1 year");
  assert.equal(f("de", "hour", 11.1), "11,1 Stunden");
  assert.equal(f("fi", "year", 13), "13 vuotta");
});

test("the breed page copy carries the right numbers (Labrador: 90 min, 13 years)", () => {
  assert.equal(realCostCopy("pl", "Labrador retriever", labProfile).facts.rows[0].value, "co najmniej 90 minut dziennie");
  assert.equal(realCostCopy("de", "Labrador Retriever", labProfile).facts.rows[0].value, "mindestens 90 Minuten pro Tag");
  assert.equal(realCostCopy("en", "Labrador Retriever", labProfile).facts.rows[5].value, "at least £116 a month");
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
