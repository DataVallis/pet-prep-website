/** Shared by the catalogue page (server) and CatalogueExplorer (client). No "use client": plain values. */

/** One row of the slim catalogue index (/registry/<species>/index.<locale>.json). */
export type Item = {
  id: string;
  n: string;
  a: string;
  s: string;
  h: string;
  k: string;
  av: "in_app" | "coming_soon" | "info_only";
  o: number;
  f: Record<string, string>;
  t: string[];
  l: string;
  p?: { src: string; w: number; h: number };
};

export const PAGE_SIZE = 24;
const AV_ORDER = { in_app: 0, coming_soon: 1, info_only: 2 } as const;

/** Default order: in the app first, then the export's order. */
export function recommendedOrder(a: Item, b: Item) {
  return AV_ORDER[a.av] - AV_ORDER[b.av] || a.o - b.o;
}
