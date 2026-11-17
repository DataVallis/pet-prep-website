/**
 * Numbers on the partner page and in the media kit (M6-S03). Only values derivable from the repo at
 * build time, always with a date. Pure, no imports. Anything not derivable (views of the series,
 * audience size) is a TODO(David) placeholder that renders nothing in production.
 */
export type PartnerStats = { breeds: { total: number; dogs: number; cats: number } | null; languages: number | null; asOf: string };

export function computePartnerStats(registry: { breeds: { species?: unknown }[] } | null, locales: readonly string[] | null, now: Date): PartnerStats {
  let breeds: PartnerStats["breeds"] = null;
  if (registry?.breeds?.length) {
    const dogs = registry.breeds.filter((b) => b.species === "dog").length;
    const cats = registry.breeds.filter((b) => b.species === "cat").length;
    breeds = { total: registry.breeds.length, dogs, cats };
  }
  const languages = locales && locales.length > 0 ? locales.length : null;
  return { breeds, languages, asOf: now.toISOString().slice(0, 10) };
}

/**
 * "11. november 2026" / "11 November 2026" / "11. marraskuuta 2026" from an ISO date (timezone-free).
 * `intl` is the language's Intl tag (localeMeta[locale].intl), so every site language reads naturally.
 */
export function formatAsOf(iso: string, intl: string): string {
  return new Intl.DateTimeFormat(intl, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
}

/**
 * Text with placeholders. `{name}` is replaced by the value; `{name|one=…|few=…|other=…}` picks the noun
 * form that is grammatical for the number `vars[name]` in the language `intl` (Intl.PluralRules, so
 * sl 1 pasma / 2 pasmi / 3–4 pasme / 5+ pasem incl. 101, 102, 103, 111; pl, cs, hr have their own rules).
 * Categories missing from a selector fall back to `other`. Without `intl` the plural selectors use "en".
 */
export function fill(text: string, vars: Record<string, string | number>, intl = "en"): string {
  const rules = new Intl.PluralRules(intl);
  const withForms = text.replace(/\{(\w+)((?:\|\w+=[^|{}]*)+)\}/g, (whole, name: string, spec: string) => {
    const n = vars[name];
    if (n === undefined) return whole;
    const forms = Object.fromEntries(spec.slice(1).split("|").map((f) => [f.slice(0, f.indexOf("=")), f.slice(f.indexOf("=") + 1)]));
    return forms[rules.select(Number(n))] ?? forms.other ?? "";
  });
  return Object.entries(vars).reduce((t, [k, v]) => t.replaceAll(`{${k}}`, String(v)), withForms);
}

/** Plural categories an integer 0–1000 can fall into in this language (what every selector must cover). */
export function integerPluralCategories(intl: string): string[] {
  const rules = new Intl.PluralRules(intl);
  return [...new Set(Array.from({ length: 1001 }, (_, i) => rules.select(i)))];
}
