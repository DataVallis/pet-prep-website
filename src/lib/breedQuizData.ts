import "server-only";
import { breedsOf } from "@/content/registry/registry";
import { portraitSrc } from "@/lib/registry/views";
import { breedHref } from "@/lib/registry/views";
import { realCostPath } from "@/content/realCost";
import { realCostBreeds } from "@/lib/realCostRoutes";
import type { Locale } from "@/i18n/config";
import type { QuizBreed } from "@/lib/breedQuiz";

/** What the client needs of one dog breed: the scoring fields plus words, picture and links in the page language. */
export type QuizBreedView = QuizBreed & { name: string; img: string; w: number; h: number; reg: string; calc: string | null };

/**
 * Every dog the register shows (breeds with a portrait, registry.ts), compact, for the quiz. A breed added to the
 * register is in the quiz and in the hub's breed list on the next build, with no hand-written entry.
 */
export function quizBreedViews(locale: Locale): QuizBreedView[] {
  const withCalc = new Set(realCostBreeds().map(({ breed }) => breed.id));
  return breedsOf("dog").flatMap((b) =>
    b.portrait
      ? [{
          id: b.id,
          order: b.order,
          size: b.facets.size,
          exercise: b.facets.exercise,
          suits: b.suitability.suits.map((t) => t.tag),
          consider: b.suitability.consider.map((t) => t.tag),
          name: b.name[locale],
          img: portraitSrc(b, b.portrait),
          w: b.portrait.width,
          h: b.portrait.height,
          reg: breedHref(locale, b),
          calc: withCalc.has(b.id) ? realCostPath(locale, b.slug[locale]) : null,
        }]
      : [],
  );
}
