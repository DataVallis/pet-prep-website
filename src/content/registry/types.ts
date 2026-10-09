/**
 * All words of the animal & breed register in one language. Layout code is generic: it renders
 * whatever species, fact groups, fields, facets and game rules the registry contains and looks
 * up their words here. A registry value without words here fails the build (see validate()).
 */
export type Fmt = {
  /** 1234.5 → "1,234.5" / "1.234,5". */
  num: (n: number, digits?: number) => string;
};

export type RegistryCopy = {
  hub: {
    title: string;
    intro: string;
    breedCount: (n: number) => string;
    open: (speciesMany: string) => string;
    freePlan: (name: string, activity: string) => string;
    otherSpecies: string;
    methodTitle: string;
    method: string[];
  };
  speciesStatus: Record<"available" | "coming_soon" | "info_only", string>;
  availability: Record<"in_app" | "coming_soon" | "info_only", { label: string; text: string }>;
  catalogue: {
    eyebrow: string;
    title: (many: string) => string;
    lead: (many: string, count: number) => string;
    metaTitle: (many: string) => string;
    metaDescription: (many: string) => string;
    searchLabel: string;
    searchPlaceholder: string;
    filtersTitle: string;
    any: string;
    availabilityLabel: string;
    sortLabel: string;
    sort: { recommended: string; az: string; size: string };
    clear: string;
    /** Template with {n}; the noun agrees with the total. */
    results: (total: number) => string;
    none: string;
    loading: string;
    /** Templates with {n}, {total}, {name}, {max}. */
    page: string;
    prev: string;
    next: string;
    compareAdd: string;
    compareBar: string;
    compareGo: string;
    compareMax: string;
    azTitle: string;
    azIntro: string;
    freePlanTitle: string;
  };
  compare: {
    title: (many: string) => string;
    metaTitle: (many: string) => string;
    intro: string;
    pick: string;
    back: string;
    /** Template with {name}. */
    remove: string;
    note: string;
    availabilityRow: string;
    activityRow: string;
  };
  /** Filters; `line` words the value in a catalogue row ("more than 2 hours a day"). */
  facets: Record<string, { label: string; values: Record<string, string>; line?: (value: string) => string }>;
  /** Group headings on a breed page (exercise, grooming, litter, play …). */
  groups: Record<string, string>;
  /** Label before a fact value ("Adult weight"). */
  fields: Record<string, string>;
  /** Stage / age contexts of meals and life stages ("8–12 weeks", "Kitten"). */
  contexts: Record<string, string>;
  /** Words for category values, per field. */
  categories: Record<string, Record<string, string>>;
  statements: Record<string, (value: unknown, f: Fmt) => string>;
  /** Wraps a formatted value: median 13.1 years, more than 2 hours a day … */
  qualifiers: Record<string, (text: string) => string>;
  /** Value + unit; `n` is the number the noun agrees with. */
  units: Record<string, (text: string, n: number, f: Fmt) => string>;
  males: string;
  females: string;
  or: string;
  notes: Record<string, string>;
  stageLabels: Record<string, Record<"puppy" | "young" | "adult" | "senior", string>>;
  activity: {
    steps: (n: string, raw: number) => string;
    steps_range: (from: string, to: string) => string;
    steps_growing: (perMonth: string, first: string, cap: string, capMonth: number) => string;
    play_sessions: (n: number) => string;
  };
  rules: Record<string, (p: Record<string, number>, f: Fmt) => string>;
  health: Record<string, string>;
  page: {
    eyebrow: string;
    metaTitle: (name: string, speciesOne: string) => string;
    metaDescription: (name: string, speciesOne: string) => string;
    suitabilityTitle: string;
    suitabilityNote: string;
    suitabilityNone: string;
    needsTitle: string;
    needsIntro: string;
    general: (speciesMany: string) => string;
    noData: string;
    simTitle: string;
    simBadge: string;
    simIntro: string;
    simInfoOnly: string;
    simTable: { stage: string; starts: string; meals: string; activity: Record<string, string> };
    arrives: (months: number) => string;
    fromMonth: (months: number, years: string | null) => string;
    meals: (steps: { from: number | null; meals: number }[]) => string;
    simDecisions: string;
    healthTitle: string;
    healthNote: string;
    healthNone: string;
    sourcesTitle: string;
    sourcesIntro: string;
    sourceLabel: (id: string, publisher: string) => string;
    disclaimer: string;
    backTo: (many: string) => string;
    compareWith: string;
  };
  /** Optional hand-written intro per breed id; `sources` must be in the breed's sources. */
  intros: Record<string, { aka?: string; text: string[]; sources: string[] }>;
};
