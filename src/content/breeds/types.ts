import type { BreedId } from "@/i18n/config";

/** Where a breed stands in the app (marketing state, set in ./availability.ts). */
export type Availability = "in_app" | "coming_soon";

export type BreedText = {
  /** Display name, e.g. "Labrador Retriever" / "Labradorec". */
  name: string;
  /** Other names people search for, shown under the title. */
  alsoKnownAs?: string;
  /** Meta description of the breed page (≤ 160 characters). */
  metaDescription: string;
  /** Short intro in our own words, based only on sourced facts. */
  intro: string[];
  /** Sources the intro paraphrases — must all be in the breed's source list (checked at build). */
  introSources: string[];
};

/** All UI strings of the breed register in one language. */
export type BreedCopy = {
  breeds: Record<BreedId, BreedText>;
  availability: Record<Availability, { label: string; text: string }>;
  overview: {
    filterTitle: string;
    filterIntro: string;
    filterClear: string;
    filterResult: (shown: number, total: number) => string;
    filterNone: string;
    notYet: (tags: string) => string;
    compareTitle: string;
    compareIntro: string;
    compareNote: string;
    open: (name: string) => string;
    mixedTitle: string;
    mixedText: (steps: string) => string;
    catsLine: string;
    methodTitle: string;
    method: string[];
  };
  rows: {
    availability: string;
    size: string;
    weight: string;
    height: string;
    exercise: string;
    grooming: string;
    coat: string;
    shedding: string;
    lifespan: string;
    growth: string;
    stepGoal: string;
  };
  page: {
    eyebrow: string;
    backToRegister: string;
    suitabilityTitle: string;
    suitabilityNote: string;
    needsTitle: string;
    needsIntro: string;
    cards: {
      exercise: string;
      grooming: string;
      feeding: string;
      lifespan: string;
      stages: string;
      size: string;
      training: string;
    };
    noData: string;
    feedingGeneral: string;
    foodMotivated: string;
    /** Raw number ranges without units, e.g. "6–9", "3–4", "25 %". */
    stagesText: (puppyMonths: string, youngYears: string, seniorShare: string) => string;
    growth: (months: string) => string;
    coren: (rank: number) => string;
    fci: (number: number, group: string, origin: string) => string;
    simTitle: string;
    simBadge: string;
    simIntro: string;
    simTable: { stage: string; starts: string; meals: string; steps: string };
    stage: { puppy: string; young: string; adult: string; senior: string };
    simArrives: (months: number) => string;
    simFromMonth: (months: number, years?: string) => string;
    simPuppyMeals: (m4: number, m3: number, from3: number, m2: number, from6: number) => string;
    simGrowingSteps: (perMonth: string, first: string, cap: string, capMonth: number) => string;
    simStepsRule: (minutes: string, steps: string, perMinute: number) => string;
    simLearning: (multiplier: string) => string;
    simSenior: (months: number, years: string) => string;
    simNote: string;
    simDecisions: string;
    healthTitle: string;
    healthNote: string;
    healthNone: string;
    health: Record<string, string>;
    sourcesTitle: string;
    sourcesIntro: (date: string) => string;
    sourceLabel: (id: string, publisher: string) => string;
    disclaimer: string;
  };
  values: {
    size: Record<string, string>;
    coat: Record<string, string>;
    grooming: Record<string, string>;
    shedding: Record<string, string>;
    fciGroup: Record<number, string>;
    origin: Record<string, string>;
    or: string;
    males: string;
    females: string;
    femalesNote: Record<string, string>;
    mean: string;
    median: (years: string) => string;
    moreThanYears: (years: string) => string;
    moreThan: (duration: string) => string;
    atLeast: (duration: string) => string;
    hours: (n: number) => string;
    minutes: (n: number) => string;
    years: (n: string) => string;
    months: (n: string) => string;
    steps: (n: string) => string;
    perDay: string;
    mealsExact: (n: number) => string;
    mealsAtLeast: (n: number) => string;
    mealsSmaller: (a: number, b: number) => string;
    mealsStage: Record<string, string>;
  };
};
