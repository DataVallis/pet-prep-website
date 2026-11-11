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

const months = {
  sl: ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
} as const;

/** "11. november 2026" / "11 November 2026" from an ISO date (timezone-free). */
export function formatAsOf(iso: string, lang: "sl" | "en"): string {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "sl" ? `${d}. ${months.sl[m - 1]} ${y}` : `${d} ${months.en[m - 1]} ${y}`;
}

export function fill(text: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce((t, [k, v]) => t.replaceAll(`{${k}}`, String(v)), text);
}
