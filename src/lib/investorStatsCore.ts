/**
 * Live numbers of the /investors page (David 2026-11-01) — pure functions, no imports, so the unit test
 * (`npm test`, node:test) runs them on fixtures. `investorStats.ts` feeds them the real data.
 * Rule: a value that cannot be computed is `null` and its card is hidden — never 0 or a placeholder.
 */

export type RegistryLike = {
  species: { id: string }[];
  breeds: Record<string, unknown>[];
  sources: { id: string; url?: string }[];
};
export type CareLike = {
  foods: { species: string; slug: string; locales: string[] }[];
  sources: { url: string }[];
  vets?: { country: string }[];
} | null;
export type YoutubeLike = { episodes: number | null; views: number | null } | null;

export type InvestorStats = {
  breeds: { total: number; perSpecies: Record<string, number> } | null;
  sources: number | null;
  foods: number | null;
  languages: number | null;
  vetCountries: number | null;
  coloringPages: number | null;
  episodes: number | null;
  views: number | null;
};

/** Every `source_ids` / `source_id` value anywhere inside a breed record. */
export function sourceIdsOf(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) {
    for (const v of value) sourceIdsOf(v, out);
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === "source_ids" && Array.isArray(v)) v.forEach((id) => typeof id === "string" && out.add(id));
      else if (k === "source_id" && typeof v === "string") out.add(v);
      else sourceIdsOf(v, out);
    }
  }
  return out;
}

const normUrl = (u: string) => u.trim().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[#?].*$/, "").replace(/\/$/, "").toLowerCase();
const positive = (n: number | null | undefined) => (typeof n === "number" && Number.isFinite(n) && n > 0 ? n : null);

export function computeInvestorStats(input: {
  registry: RegistryLike | null;
  care: CareLike;
  locales: readonly string[] | null;
  coloringPages: number | null;
  youtube: YoutubeLike;
}): InvestorStats {
  const { registry, care, youtube } = input;

  // Breeds: every breed in the register has a published page (the register builds one per breed).
  let breeds: InvestorStats["breeds"] = null;
  if (registry?.breeds?.length) {
    const perSpecies: Record<string, number> = {};
    for (const b of registry.breeds) {
      const sp = typeof b.species === "string" ? b.species : "other";
      perSpecies[sp] = (perSpecies[sp] ?? 0) + 1;
    }
    breeds = { total: registry.breeds.length, perSpecies };
  }

  // Sources: unique source ids the breeds cite, merged with the care library's sources, deduplicated by URL.
  let sources: number | null = null;
  if (registry?.breeds?.length || care?.sources?.length) {
    const keys = new Set<string>();
    if (registry) {
      const used = new Set<string>();
      for (const b of registry.breeds) sourceIdsOf(b, used);
      const byId = new Map(registry.sources.map((s) => [s.id, s]));
      for (const id of used) {
        const url = byId.get(id)?.url;
        keys.add(url ? normUrl(url) : `id:${id}`);
      }
    }
    for (const s of care?.sources ?? []) if (s.url) keys.add(normUrl(s.url));
    sources = positive(keys.size);
  }

  // Foods: care pages published in English (the export only carries independently verified locales).
  const foods = care ? positive(new Set(care.foods.filter((f) => f.locales.includes("en")).map((f) => `${f.species}/${f.slug}`)).size) : null;
  const vetCountries = care?.vets ? positive(new Set(care.vets.map((v) => v.country)).size) : null;

  return {
    breeds,
    sources,
    foods,
    languages: positive(input.locales?.length ?? null),
    vetCountries,
    coloringPages: positive(input.coloringPages),
    episodes: positive(youtube?.episodes ?? null),
    views: youtube?.episodes ? positive(youtube.views) : null,
  };
}
