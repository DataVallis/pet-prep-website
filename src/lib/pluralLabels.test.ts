import test from "node:test";
import assert from "node:assert/strict";
import { fill, integerPluralCategories } from "./partnerStats.ts";
import { locales, localeMeta } from "../i18n/config.ts";
import { partnerCopy, kitCopy } from "../content/partners.ts";

const label = (lang: (typeof locales)[number], n: number) => `${n} ${fill(partnerCopy[lang].stats.breeds, { n }, localeMeta[lang].intl)}`;

test("sl: 118 pasem (the reported bug) and the full Slovenian rule incl. 101/102/103/111", () => {
  const expected: Record<number, string> = { 1: "pasma", 2: "pasmi", 3: "pasme", 4: "pasme", 5: "pasem", 11: "pasem", 21: "pasem", 22: "pasem", 101: "pasma", 102: "pasmi", 103: "pasme", 111: "pasem", 118: "pasem" };
  for (const [n, noun] of Object.entries(expected)) assert.equal(label("sl", Number(n)), `${n} ${noun} v registru živali`);
});

test("sub-line: 112 pasem psov in 6 pasem mačk; 101 pasma psov in 2 pasmi mačk", () => {
  const note = (dogs: number, cats: number) => fill(partnerCopy.sl.stats.breedsNote, { dogs, cats }, "sl-SI");
  assert.match(note(112, 6), /^112 pasem psov in 6 pasem mačk,/);
  assert.match(note(101, 2), /^101 pasma psov in 2 pasmi mačk,/);
  assert.match(note(3, 1), /^3 pasme psov in 1 pasma mačk,/);
});

test("pl / cs / hr have their own plural rules", () => {
  assert.equal(label("pl", 1), "1 rasa w encyklopedii zwierząt");
  assert.equal(label("pl", 3), "3 rasy w encyklopedii zwierząt");
  assert.equal(label("pl", 5), "5 ras w encyklopedii zwierząt");
  assert.equal(label("pl", 22), "22 rasy w encyklopedii zwierząt");
  assert.equal(label("pl", 118), "118 ras w encyklopedii zwierząt");
  assert.equal(label("cs", 1), "1 plemeno v encyklopedii zvířat");
  assert.equal(label("cs", 4), "4 plemena v encyklopedii zvířat");
  assert.equal(label("cs", 118), "118 plemen v encyklopedii zvířat");
  assert.equal(label("hr", 1), "1 pasmina u enciklopediji životinja");
  assert.equal(label("hr", 3), "3 pasmine u enciklopediji životinja");
  assert.equal(label("hr", 11), "11 pasmina u enciklopediji životinja");
  assert.equal(label("hr", 21), "21 pasmina u enciklopediji životinja");
  assert.equal(label("hr", 22), "22 pasmine u enciklopediji životinja");
  assert.equal(label("en", 1), "1 breed in the animal register");
  assert.equal(label("en", 118), "118 breeds in the animal register");
  assert.equal(label("fi", 118), "118 rotua eläinhakemistossa");
  assert.equal(fill(partnerCopy.sl.stats.languages, { n: 15 }, "sl-SI"), "jezikov spletne strani");
});

test("every plural selector in the numbers copy and media kit covers all categories its language can produce, for any number", () => {
  const selector = /\{(\w+)((?:\|\w+=[^|{}]*)+)\}/g;
  const has = /\{\w+\|\w+=/;
  for (const l of locales) {
    const intl = localeMeta[l].intl;
    const need = integerPluralCategories(intl);
    const texts = [partnerCopy[l].stats.breeds, partnerCopy[l].stats.breedsNote, partnerCopy[l].stats.languages, ...kitCopy[l].examples.items.flat()];
    for (const t of texts) {
      for (const m of t.matchAll(selector)) {
        const have = m[2].slice(1).split("|").map((f) => f.split("=")[0]);
        for (const c of need) assert.ok(have.includes(c), `${l}: ${m[0]} lacks "${c}"`);
      }
    }
    // the breeds label and the sub-line must have a selector for the counted noun (never a bare, number-agnostic noun)
    assert.match(partnerCopy[l].stats.breedsNote, has, `${l}: breedsNote has plural selectors`);
    assert.match(partnerCopy[l].stats.breeds, has, `${l}: breeds label has a plural selector`);
    // whatever the number, no placeholder is left in the rendered text
    for (const n of [0, 1, 2, 3, 4, 5, 11, 21, 22, 101, 112, 118]) {
      const out = [partnerCopy[l].stats.breeds, partnerCopy[l].stats.breedsNote, ...kitCopy[l].examples.items.flat()].map((t) => fill(t, { n, dogs: n, cats: n, breeds: n, date: "x" }, intl)).join(" ");
      assert.doesNotMatch(out, /[{}|]/, `${l} ${n}: ${out}`);
    }
  }
});
