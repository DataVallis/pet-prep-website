import type { BreedId } from "@/i18n/config";
import type { Availability } from "./types";

/**
 * Where each breed stands in the app — marketing state, not research data.
 * Change a breed to "in_app" when the app release that contains it is in the stores.
 * (David, 2026-10-09: Border Collie in the app as the paid challenge breed;
 * Labrador and Golden built, not yet in a store release.)
 */
export const availability: Record<BreedId, Availability> = {
  border_collie: "in_app",
  labrador_retriever: "coming_soon",
  golden_retriever: "coming_soon",
};

/** Last content update of the breed register (sitemap lastmod, JSON-LD dateModified). */
export const registryUpdated = "2026-10-09";
