import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { realCostAlternates, realCostCopy, realCostLocales, realCostPath, realCostSlug } from "../content/realCost.ts";
import { buildHtml, outFile } from "../../scripts/build-real-cost.mjs";

test("paths: English at the root, Slovenian under /sl, slugs match the route folders", async () => {
  assert.equal(realCostPath("en"), "/how-much-work-is-a-labrador");
  assert.equal(realCostPath("sl"), "/sl/koliko-dela-je-z-labradorcem");
  for (const l of realCostLocales) {
    const page = await readFile(new URL(`../app/[locale]/${realCostSlug[l]}/page.tsx`, import.meta.url), "utf8");
    assert.ok(page.includes(`const LOCALE = "${l}" as const;`), `${realCostSlug[l]}/page.tsx serves ${l}`);
  }
});

test("hreflang: both languages and x-default = English", () => {
  const abs = (p: string) => `https://petprep.si${p}`;
  assert.deepEqual(realCostAlternates(abs), {
    en: "https://petprep.si/how-much-work-is-a-labrador",
    sl: "https://petprep.si/sl/koliko-dela-je-z-labradorcem",
    "x-default": "https://petprep.si/how-much-work-is-a-labrador",
  });
});

test("copy: same shape in both languages", () => {
  const { en, sl } = realCostCopy;
  assert.equal(sl.facts.rows.length, en.facts.rows.length);
  assert.equal(sl.how.items.length, en.how.items.length);
  assert.equal(sl.sources.items.length, en.sources.items.length);
  for (const c of [en, sl]) {
    assert.ok(c.meta.description.length <= 170, "meta description fits a search snippet");
    assert.ok(c.meta.title.includes("PetPrep"));
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
