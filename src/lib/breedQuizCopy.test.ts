import assert from "node:assert/strict";
import { test } from "node:test";
import { locales } from "../i18n/config.ts";
import { quizCopy, quizEmailStrings, quizSponsorStrings, quizThanks, EMAIL_KEYS, SPONSOR_KEYS } from "../content/quiz/index.ts";
import { isQuizHubSlug, isQuizSlug, quizAlternates, quizHubAlternates, quizHubPath, quizPath, quizSlugs } from "../content/quiz/slugs.ts";
import { pageSlugs, salesSlugs } from "../i18n/config.ts";
import { realCostBase } from "../content/realCost.ts";
import { OPTION_COUNTS, QUESTION_IDS } from "./breedQuiz.ts";

test("routes: English at the root, others under /<locale>, one ASCII slug per language, no collisions", () => {
  assert.equal(quizHubPath("en"), "/before-you-get-a-dog");
  assert.equal(quizPath("en"), "/before-you-get-a-dog/which-breed");
  assert.equal(quizHubPath("sl"), "/sl/pred-nakupom-psa");
  assert.equal(quizPath("sl"), "/sl/pred-nakupom-psa/katera-pasma");
  assert.equal(quizPath("de"), "/de/vor-dem-hundekauf/welche-rasse");
  const taken = new Set<string>([...Object.values(pageSlugs).flatMap((m) => Object.values(m)), ...Object.values(salesSlugs).flatMap((m) => Object.values(m)), ...Object.values(realCostBase)]);
  for (const l of locales) {
    for (const k of ["hub", "quiz"] as const) assert.match(quizSlugs[k][l], /^[a-z0-9]+(-[a-z0-9]+)*$/, `${l} ${k}`);
    assert.ok(!taken.has(quizSlugs.hub[l]), `${l} hub collides`);
    assert.ok(isQuizHubSlug(l, quizSlugs.hub[l]) && isQuizSlug(l, quizSlugs.hub[l], quizSlugs.quiz[l]));
    assert.ok(!isQuizSlug(l, quizSlugs.hub[l], "x"));
  }
  assert.equal(new Set(locales.map((l) => quizSlugs.hub[l])).size, locales.length);
  assert.equal(new Set(locales.map((l) => quizSlugs.quiz[l])).size, locales.length);
});

test("hreflang: all 15 languages and x-default = English", () => {
  const abs = (p: string) => `https://petprep.si${p}`;
  for (const [alt, path] of [[quizHubAlternates(abs), quizHubPath], [quizAlternates(abs), quizPath]] as const) {
    assert.equal(Object.keys(alt).length, locales.length + 1);
    assert.equal(alt["x-default"], abs(path("en")));
    assert.equal(alt.sl, abs(path("sl")));
    assert.equal(alt["pt-PT"], abs(path("pt")));
  }
});

test("copy: every language has every string, nine questions with the right number of options, no placeholder leftovers", () => {
  const keys = Object.keys(quizCopy.en).sort();
  const known = new Set(["n", "total", "name"]);
  for (const l of locales) {
    const c = quizCopy[l] as unknown as Record<string, unknown>;
    assert.deepEqual(Object.keys(c).sort(), keys, `${l} keys`);
    for (const k of keys) {
      const v = c[k];
      if (k === "questions") continue;
      assert.equal(typeof v, "string", `${l}.${k}`);
      assert.ok((v as string).trim().length > 0, `${l}.${k} empty`);
      for (const m of (v as string).matchAll(/\{(\w+)\}/g)) assert.ok(known.has(m[1]), `${l}.${k} unknown {${m[1]}}`);
    }
    const qs = quizCopy[l].questions;
    assert.equal(qs.length, QUESTION_IDS.length, l);
    qs.forEach((q, i) => {
      assert.ok(q.q.trim(), `${l} q${i}`);
      assert.equal(q.options.length, OPTION_COUNTS[QUESTION_IDS[i]], `${l} q${i} options`);
      for (const o of q.options) assert.ok(o.trim() && !/[{}]/.test(o), `${l} q${i} option`);
    });
    // Templates keep their placeholders.
    assert.match(quizCopy[l].stepOf, /\{n\}/); assert.match(quizCopy[l].stepOf, /\{total\}/);
    assert.match(quizCopy[l].pool, /\{n\}/); assert.match(quizCopy[l].rank, /\{n\}/); assert.match(quizCopy[l].tryCta, /\{name\}/);
    // The language is not silently English.
    if (l !== "en") assert.notEqual(quizCopy[l].hubTitle, quizCopy.en.hubTitle, `${l} untranslated`);
    // Reused app strings exist.
    const e = quizEmailStrings(l), s = quizSponsorStrings(l);
    for (const k of EMAIL_KEYS) assert.ok(e[k], `${l} ${k}`);
    for (const k of SPONSOR_KEYS) assert.ok(s[k], `${l} ${k}`);
    assert.ok(quizThanks[l]);
  }
});

test("the consent sentence keeps the Slovenian meaning (same as the real-cost app)", () => {
  assert.equal(quizEmailStrings("sl").news_consent, "Želim prejemati novice in nasvete PetPrep na ta e-naslov. Odjavim se lahko kadar koli.");
});
