/**
 * Breed quiz "Which breed is for you?" (M6-S06, spec docs/product/BREED_QUIZ_SPEC.md in pet-prep): the pure part.
 * Input: the nine answers + the register's breeds (only sourced fields) → a ranked list with reasons. No alias
 * imports, no I/O, so the unit tests and the client component use the same code.
 *
 * Rules (David's / the spec's): only register data scores — `suitability.suits` / `consider` tags, `facets.size`
 * and `facets.exercise`. A missing tag is "no data", never a minus. A suits tag that matches an answer = +2 (a few
 * weaker rules +1), a consider tag that clashes with an answer = −1 … −3, size chosen +2 / far away −2. The only hard
 * exclusion is a clear sourced conflict (flat + a breed that suits a large home and not an apartment); "alone more
 * than 8 hours" returns no breeds at all. A breed with fewer than 3 tags never makes the list (the result would rest
 * on "no data"). Ties: the register's `order`. Health tags never subtract; they come back in `consider` as calm notes.
 */

/** Answer slots, in the order the questions are asked. Each answer is the index of the chosen option. */
export const QUESTION_IDS = ["home", "exercise", "alone", "kids", "first", "pets", "hair", "size", "training"] as const;
export type QuestionId = (typeof QUESTION_IDS)[number];
/** Options per question. home: flat · house, no garden · house with garden · house with a large garden. exercise: <30 min · 30–60 min · 1–2 h · >2 h. alone: almost never · up to 4 h · 4–8 h · >8 h. kids: none · youngest ≤5 · 6–12 · 13+. first: yes · no. pets: none · cat · dog · other. hair: bothers a lot · a little · not at all. size: small · medium · large · any. training: little · some · a lot. */
export const OPTION_COUNTS: Record<QuestionId, number> = { home: 4, exercise: 4, alone: 4, kids: 4, first: 2, pets: 4, hair: 3, size: 4, training: 3 };
export const QUESTION_COUNT = QUESTION_IDS.length;

export type Answers = readonly number[];

/** The fields of a register breed the quiz needs. */
export type QuizBreed = {
  id: string;
  /** Register order (popularity); breaks ties. */
  order: number;
  /** registry `facets.size`: toy · small · small_medium · medium · medium_large · large · giant. */
  size?: string;
  /** registry `facets.exercise`: under_1h · h1_2 · over_2h. */
  exercise?: string;
  suits: readonly string[];
  consider: readonly string[];
};

/** Synthetic reasons that are not register tags (their words are in the quiz copy). */
export type Fit = "size" | "exercise";

export type QuizPick = {
  id: string;
  score: number;
  /** Suits tags that matched an answer ("good for"). */
  matched: string[];
  /** Fits that are not tags: size / exercise level as asked for. */
  fits: Fit[];
  /** Consider tags that clash with an answer, plus synthetic clashes ("size", "exercise"). */
  clashes: string[];
  /** All of the breed's consider tags, clashing ones first (health tags included, shown as calm notes). */
  consider: string[];
};

export type QuizOutcome =
  | { kind: "notNow"; reason: "alone" }
  | { kind: "breeds"; picks: QuizPick[]; /** breeds with enough sourced tags the choice was made among */ pool: number };

/** Minimum number of register tags (suits + consider) a breed needs to be recommended. */
export const MIN_TAGS = 3;
export const PICKS = 3;

const EXERCISE_LEVEL: Record<string, number> = { under_1h: 0, h1_2: 1, over_2h: 2 };
const SIZE_RANK: Record<string, number> = { toy: 0, small: 1, small_medium: 2, medium: 3, medium_large: 4, large: 5, giant: 6 };
/** Size answer (small / medium / large) → the ranks it covers. */
const SIZE_RANGE: [number, number][] = [[0, 2], [2, 4], [4, 6]];
const OLDER_CHILDREN_TAGS = ["older_children", "fragile_older_children", "independent_older_children", "lively_older_children", "sensitive_older_children", "defensive_older_children"];

export function answersValid(a: unknown): a is number[] {
  return Array.isArray(a) && a.length === QUESTION_COUNT && QUESTION_IDS.every((id, i) => Number.isInteger(a[i]) && a[i] >= 0 && a[i] < OPTION_COUNTS[id]);
}

/** "120310221": one digit per question — the result link carries no personal data. */
export function encodeAnswers(a: Answers): string {
  return a.join("");
}

export function decodeAnswers(raw: string | null | undefined): number[] | null {
  if (typeof raw !== "string" || !/^\d{9}$/.test(raw)) return null;
  const a = [...raw].map(Number);
  return answersValid(a) ? a : null;
}

/** True when the answers say no dog would be happy now (alone more than 8 hours a day). */
export function notNow(a: Answers): boolean {
  return a[2] === 3;
}

type Scored = { breed: QuizBreed; score: number; matched: Set<string>; fits: Set<Fit>; clashes: Set<string> } | null;

function scoreBreed(b: QuizBreed, a: Answers): Scored {
  const suits = new Set(b.suits);
  const consider = new Set(b.consider);
  const matched = new Set<string>();
  const fits = new Set<Fit>();
  const clashes = new Set<string>();
  let score = 0;
  const plus = (tag: string, pts: number) => {
    if (suits.has(tag)) { score += pts; matched.add(tag); }
  };
  const minus = (tag: string, pts: number) => {
    if (consider.has(tag)) { score -= pts; clashes.add(tag); }
  };

  const [home, exercise, alone, kids, first, pets, hair, size, training] = a;

  // 1. Home. A breed that suits a large house and has no apartment tag is the one hard exclusion for a flat.
  if (home === 0) {
    if (suits.has("large_home") && !suits.has("apartment")) return null;
    plus("apartment", 2);
  } else if (home === 1) {
    plus("apartment", 1);
    minus("secure_fencing", 1);
  } else if (home === 2) plus("large_home", 1);
  else plus("large_home", 2);

  // 2. Time for walks and exercise: the register's daily-exercise level (what the game uses) against the answer.
  const userLevel = [0, 0, 1, 2][exercise];
  const breedLevel = b.exercise === undefined ? undefined : EXERCISE_LEVEL[b.exercise];
  let tooLittle = false;
  if (breedLevel !== undefined) {
    if (breedLevel > userLevel) { score -= 3; tooLittle = true; clashes.add("exercise"); }
    else if (breedLevel === userLevel && userLevel >= 1) { score += 2; fits.add("exercise"); }
  }
  if (userLevel >= 1) plus("active_family", 1);
  if (userLevel < 2 && consider.has("long_daily_exercise")) {
    // The tag and the level are one fact told twice: never subtract both.
    if (!tooLittle) score -= 3;
    clashes.add("long_daily_exercise");
  }

  // 3. Hours alone per day (more than 8 never gets here: notNow()).
  if (alone === 1) minus("needs_company", 1);
  else if (alone === 2) { minus("needs_company", 3); plus("often_alone", 2); }

  // 4. Children and the youngest's age.
  if (kids === 1) {
    plus("small_children", 2);
    plus("children", 2);
    minus("not_for_small_children", 3);
    minus("may_herd_children", 2);
    for (const t of OLDER_CHILDREN_TAGS) minus(t, 3);
  } else if (kids === 2) {
    plus("children", 2);
    minus("may_herd_children", 1);
    for (const t of OLDER_CHILDREN_TAGS) minus(t, 1);
  } else if (kids === 3) plus("children", 1);
  if (kids !== 0) plus("family_pet", 1);

  // 5. First dog.
  if (first === 0) {
    plus("first_time_owner", 2);
    minus("experienced_owner", 3);
    minus("independent_experienced_owner", 3);
  }

  // 6. Other pets at home.
  if (pets === 1) { plus("other_pets", 2); minus("chases_small_pets", 3); }
  else if (pets === 2) plus("other_pets", 2);
  else if (pets === 3) { plus("other_pets", 1); minus("chases_small_pets", 3); }

  // 7. Hair and brushing.
  if (hair === 0) { plus("low_shedding", 2); minus("sheds", 3); minus("frequent_grooming", 3); }
  else if (hair === 1) { minus("sheds", 1); minus("frequent_grooming", 1); }

  // 8. Size.
  if (size !== 3) {
    const rank = b.size === undefined ? undefined : SIZE_RANK[b.size];
    if (rank !== undefined) {
      const [lo, hi] = SIZE_RANGE[size];
      const distance = rank < lo ? lo - rank : rank > hi ? rank - hi : 0;
      if (distance === 0) { score += 2; fits.add("size"); }
      else if (distance >= 2) { score -= 2; clashes.add("size"); }
    }
  }

  // 9. Time for training and brain games.
  if (training === 0) { minus("needs_mental_stimulation", 3); minus("chews_when_bored", 2); }
  else if (training === 1) minus("needs_mental_stimulation", 1);

  return { breed: b, score, matched, fits, clashes };
}

/** All of the quiz: ranked picks (best first) or the "no dog now" outcome. */
export function rankBreeds(answers: Answers, breeds: readonly QuizBreed[]): QuizOutcome {
  if (!answersValid(answers)) throw new Error("breedQuiz: invalid answers");
  if (notNow(answers)) return { kind: "notNow", reason: "alone" };
  const eligible = breeds.filter((b) => b.suits.length + b.consider.length >= MIN_TAGS);
  const scored = eligible.flatMap((b) => {
    const s = scoreBreed(b, answers);
    return s ? [s] : [];
  });
  scored.sort((x, y) => y.score - x.score || x.breed.order - y.breed.order);
  const picks = scored.slice(0, PICKS).map((s): QuizPick => {
    const clashes = [...s.clashes];
    const real = new Set(s.breed.consider);
    return {
      id: s.breed.id,
      score: s.score,
      matched: [...s.matched],
      fits: [...s.fits],
      clashes,
      consider: [...clashes.filter((t) => real.has(t)), ...s.breed.consider.filter((t) => !s.clashes.has(t))],
    };
  });
  return { kind: "breeds", picks, pool: eligible.length };
}
