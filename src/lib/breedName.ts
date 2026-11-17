/**
 * A breed name in running text. The register writes names with a capital ("Francoski buldog"); mid-sentence
 * every site language except English and German writes breed names in lower case (sl hr pl cs fi fr es it pt nl sv da nb) ("pasmo francoski buldog",
 * "la race bouledogue français"). Copy that names a breed is built as "<noun for breed> {mid}" so the name is
 * never declined (David 2026-11-17). A name with several capitalised words (proper nouns) is left as written. English keeps "French Bulldog" (proper names), German keeps its noun capital.
 */
const KEEP_CAPITAL = new Set(["en", "de"]);

export function midName(name: string, locale: string): string {
  if (KEEP_CAPITAL.has(locale) || name.length < 2) return name;
  if (name[1] !== name[1].toLocaleLowerCase(locale)) return name; // acronym-like ("JRT")
  // Another capitalised word ("Jack Russell terier", "Cavalier King Charles španjel") means proper nouns: keep the name as written.
  if (name.split(/\s+/).slice(1).some((w) => /^\p{Lu}/u.test(w))) return name;
  return name.charAt(0).toLocaleLowerCase(locale) + name.slice(1);
}
