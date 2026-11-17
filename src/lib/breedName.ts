/**
 * A breed name in running text. The register writes names with a capital ("Francoski buldog"); mid-sentence
 * every site language except English and German writes the breed in lower case ("pasmo francoski buldog",
 * "la race bouledogue français"). Copy that names a breed is built as "<noun for breed> {mid}" so the name is
 * never declined (David 2026-11-17). English keeps "French Bulldog" (proper names), German keeps its noun capital.
 */
const KEEP_CAPITAL = new Set(["en", "de"]);

export function midName(name: string, locale: string): string {
  if (KEEP_CAPITAL.has(locale) || name.length < 2) return name;
  if (name[1] !== name[1].toLocaleLowerCase(locale)) return name; // acronym-like ("JRT")
  return name.charAt(0).toLocaleLowerCase(locale) + name.slice(1);
}
