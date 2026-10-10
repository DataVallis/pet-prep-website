import type { RegistryCopy } from "./types";

const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** "a Border Collie", "an Akita". */
const a = (name: string) => `${/^[AEIOU]/.test(name) ? "an" : "a"} ${name}`;
type Fci = { number: number; group: number; origin: string };
const fciGroups: Record<number, string> = { 1: "sheepdogs and cattle dogs", 8: "retrievers, flushing dogs and water dogs", 9: "companion and toy dogs" };
const origins: Record<string, string> = { GB: "Great Britain", FR: "France" };

const en: RegistryCopy = {
  hub: {
    title: "Know the animal before it comes home.",
    intro:
      "What each species and breed in PetPrep really needs — from kennel clubs, cat registries, veterinary charities and studies, with every source linked. Plus the rules PetPrep uses to simulate it.",
    breedCount: (n) => `${n} ${s(n, "breed", "breeds")} in the register`,
    open: "See breeds",
    openA11y: (many) => `See breeds: ${many.toLowerCase()}`,
    freePlan: (name, activity) => `Free plan: ${name.toLowerCase()} (${activity} as an adult). It has no breed page.`,
    otherSpecies: "More animals are planned.",
    methodTitle: "How we build this register",
    method: [
      "Every fact comes from a named source — kennel clubs, cat registries, veterinary charities and associations, and peer-reviewed studies — and links to it. Breed standards are summarised in our own words.",
      "Values that no source supports are never shown as facts. Where PetPrep has to choose a number for the game, it appears only under “How PetPrep simulates it”, labelled as a game rule.",
      "The same data drives the app: the tags, meal counts, step goals and play sessions on these pages are the ones the pet in the app uses.",
      "This register is not veterinary advice. Health information is for orientation only and has not been reviewed by a vet.",
    ],
  },
  speciesStatus: { available: "In the app", coming_soon: "Coming soon to the app", info_only: "Information only" },
  availability: {
    in_app: { label: "In the app", text: "Available in the 12-week PetPrep Challenge (paid breed)." },
    coming_soon: { label: "Coming soon to the app", text: "Built and tested; it arrives with a coming app release." },
    info_only: { label: "Information only", text: "In the register for information; you can't adopt it in the app yet." },
  },
  catalogue: {
    eyebrow: "Animal register",
    title: (many) => `${many}: breeds in the register`,
    lead: (many, count) =>
      `${count} ${s(count, "breed", "breeds")} of ${many.toLowerCase()} with sourced needs, who they suit and how PetPrep simulates them. Search, filter and compare up to three.`,
    metaTitle: (many) => `${many} — breed register with sources | PetPrep`,
    metaDescription: (many) =>
      `Search and compare ${many.toLowerCase()} by needs, size and who they suit. Every fact links to its source; plus the rules PetPrep uses to simulate each breed.`,
    searchLabel: "Search breeds",
    searchPlaceholder: "Name, e.g. Labrador",
    filtersTitle: "Filters",
    any: "Any",
    availabilityLabel: "In PetPrep",
    sortLabel: "Sort",
    sort: { recommended: "In the app first", az: "A–Z", size: "Size (small to large)" },
    clear: "Clear all",
    results: (total) => `{n} of ${total} ${s(total, "breed", "breeds")}`,
    none: "No breed matches. Try fewer filters.",
    loading: "Loading the search…",
    page: "Page {n} of {total}",
    prev: "Previous",
    next: "Next",
    compareAdd: "Compare {name}",
    compareBar: "{n} of {max} selected for comparison",
    compareGo: "Compare",
    compareMax: "You can compare up to {max} breeds.",
    azTitle: "All breeds A–Z",
    azIntro: "Every breed in the register, alphabetically.",
    freePlanTitle: "Free plan",
    guideTitle: "How to choose a breed",
    guide: () => [
      "Start with what your household can give every day: time for exercise, grooming and space. Each breed page lists these needs at a glance, with the named source of every value; where sources differ, all values are shown.",
      "Where a breed has a size class (for dogs: toy, small, medium, large or giant), it is the class the named source gives — usually a kennel club — and weights are the ranges the sources state, not our estimates.",
      "Tags such as “Good for: an active family” are the same as in the app and each is backed by sources. The numbers under “How PetPrep simulates it” are PetPrep's game rules, not care instructions. [How we build the register](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Compare ${many.toLowerCase()}`,
    metaTitle: (many) => `Compare ${many.toLowerCase()} | PetPrep register`,
    intro: "Key needs side by side, from the same sources as the breed pages.",
    pick: "Pick two or three breeds in the catalogue to compare them.",
    back: "Back to the catalogue",
    remove: "Remove {name}",
    note: "Values are given as the named source states them. Where sources differ, the breed page lists each one.",
    availabilityRow: "In PetPrep",
    activityRow: "Adult daily goal in PetPrep (game rule)",
  },
  facets: {
    size: { label: "Size", values: { toy: "Toy", small: "Small", medium: "Medium", large: "Large", giant: "Giant" } },
    exercise: { label: "Daily exercise", values: { under_1h: "Up to 1 hour", h1_2: "1–2 hours", over_2h: "More than 2 hours" }, line: (v) => `${v.toLowerCase()} a day` },
    grooming: { label: "Brushing", values: { weekly: "Once a week", several_weekly: "Several times a week", daily: "Daily", other: "Other" }, line: (v) => `brushing ${v.toLowerCase()}` },
  },
  groups: {
    exercise: "Exercise",
    play: "Play",
    litter: "Litter box",
    scratching: "Scratching",
    grooming: "Coat and grooming",
    feeding: "Meals",
    water: "Water",
    lifespan: "Lifespan",
    stages: "Life stages",
    size: "Size and weight",
    training: "Training",
  },
  fields: {
    size: "Size",
    height: "Height at the withers",
    weight: "Adult weight",
    growth_end: "Reaches adult size at",
    lifespan: "Lifespan",
    exercise: "Daily exercise",
    coat: "Coat",
    grooming_frequency: "Brushing",
    grooming_level: "Grooming needs",
    shedding: "Shedding",
    litter_scoop: "Scoop the litter",
    litter_full_change: "Change all the litter",
    litter_pee: "Urinates (adult)",
    litter_poo: "Passes faeces (adult)",
    water_need: "Water need",
    sleep: "Sleep (adult)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 weeks",
    puppy_3_6_months: "3–6 months",
    puppy_6_12_months: "6–12 months",
    kitten_6_12_weeks: "6–12 weeks",
    kitten_3_6_months: "3–6 months",
    kitten_6_12_months: "6–12 months",
    puppy: "Puppy",
    kitten: "Kitten",
    young_adult: "Young adult",
    mature_adult: "Mature adult",
    adult: "Adult",
    senior: "Senior",
  },
  categories: {
    size: { toy: "toy", small: "small", medium: "medium", large: "large", giant: "giant" },
    coat: { moderately_long: "moderately long", smooth: "smooth (short)", short: "short", medium: "medium length" },
    grooming_frequency: { once_a_week: "once a week", more_than_once_a_week: "more than once a week", daily: "daily" },
    grooming_level: { moderate: "moderate", high: "high", low: "low" },
    shedding: { yes: "sheds", high: "sheds a lot", moderate: "sheds moderately", low: "sheds little", minimal: "sheds minimally" },
  },
  statements: {
    food_motivated: () => "Strongly motivated by food — helpful in training, but watch the portions.",
    coren_rank: (v) => `No. ${String(v)} in Stanley Coren's ranking of working and obedience intelligence.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI standard no. ${x.number}, group ${x.group} (${fciGroups[x.group] ?? "—"}); origin: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Play: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} sessions of ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} minutes a day.`;
    },
    kittens_play_more: () => "Kittens need to play more often.",
    scratching_natural: () => "Scratching is natural and necessary: give a scratching post and never punish it.",
    water_fresh: () => "Fresh water at all times; wash and refill the bowl daily.",
    grooming_sources_differ: () => "Sources differ on combing: from daily to once a week.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `median ${t}`,
    more_than: (t) => `more than ${t}`,
    at_least: (t) => `at least ${t}`,
    up_to: (t) => `up to ${t}`,
    ideal: (t) => `ideal (breed standard): ${t}`,
    mean: (t) => `measured average: ${t}`,
    about: (t) => `about ${t}`,
    until: (t) => `until ${t}`,
    until_about: (t) => `until about ${t}`,
    span: (t) => t,
    from: (t) => `from ${t}`,
    last: (t) => `the last ${t}`,
    every: (t) => `every ${t}`,
    expectancy: (t) => `life expectancy at birth ${t}`,
    smaller_meals: (t) => `${t}, smaller portions`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "year", "years")}`,
    months: (t, n) => `${t} ${s(n, "month", "months")}`,
    days: (t, n) => `${t} ${s(n, "day", "days")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "hour", "hours")} a day` : `${t} minutes a day`),
    meals_per_day: (t, n) => `${t} ${s(n, "meal", "meals")} a day`,
    times_per_day: (t, n) => `${t} ${s(n, "time", "times")} a day`,
    hours_per_day: (t) => `${t} hours a day`,
    ml_per_kg_day: (t) => `${t} ml per kg of body weight a day`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)} % of the expected lifespan`,
  },
  males: "males",
  females: "females",
  or: " or ",
  notes: { size_class_guidance: "guidance for its size class" },
  stageLabels: {
    dog: { puppy: "Puppy", young: "Young dog", adult: "Adult", senior: "Senior" },
    cat: { puppy: "Kitten", young: "Young cat", adult: "Mature cat", senior: "Senior" },
  },
  activity: {
    steps: (n) => `${n} steps`,
    steps_range: (from, to) => `${from} → ${to} steps`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} steps per month of age (${first} on arrival), up to ${cap} from month ${capMonth}`,
    play_sessions: (n) => `${n} play ${s(n, "session", "sessions")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Step goal = minutes of daily exercise × ${p.per_minute} steps: an adult gets ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "hour", "hours")}` : `${p.minutes} minutes`}, so ${f.num(p.steps)} steps a day.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Learns commands more slowly than the mixed breed of the free plan (${f.num(p.multiplier)}× its speed).`
        : `Learns commands ${f.num(p.multiplier)}× as fast as the mixed breed of the free plan.`,
    senior_share: (p, f) => `Becomes a senior in month ${p.months} (${f.num(p.months / 12, 1)} years) — the last quarter of the breed's median lifespan.`,
    walk_sensor: () => "Walks count real steps from the phone's motion sensor — no GPS.",
    play_instead_of_steps: (p, f) =>
      `No walks: an adult cat needs ${p.sessions} play sessions a day with a wand toy, at least ${f.num(p.gap_minutes / 60)} hours apart.`,
    litter_rule: (p) =>
      `Litter box: an adult cat uses it ${p.uses} times a day; each use is scooped within ${p.scoop_hours} hours (outside quiet hours), and all the litter is changed every ${p.change_days} days.`,
    scratching_after_missed_play: () => "After a day without enough play the cat scratches something once; the child carries it to the scratching post.",
    grooming_rule: (p) => `Combing ${p.per_week} times a week.`,
  },
  health: {
    weight_gain: "Puts on weight easily — portions and treats need watching.",
    hip_elbow_dysplasia_eye_conditions: "Can be prone to hip and elbow dysplasia and to several inherited eye conditions.",
    cancer_risk: "Sources describe a higher risk of cancer in this breed.",
    flat_face_breathing: "Flat-faced (brachycephalic) breed: the short muzzle, narrow nostrils and extra soft tissue in the airway can make breathing harder (brachycephalic obstructive airway syndrome, BOAS).",
    heat_stroke_risk: "Overheats quickly and is more vulnerable to heatstroke than most dogs, especially in warm weather.",
    skin_fold_ear_problems: "Prone to ear inflammation and skin-fold infections; the skin folds need to be kept clean and dry.",
    merle_colour_risk: "Merle is not a breed-standard colour; in this breed it carries a higher risk of hearing and sight problems.",
  },
  page: {
    eyebrow: "Animal register",
    metaTitle: (name, one, species) =>
      species === "dog"
        ? `${name}: exercise, size, lifespan & care | PetPrep`
        : species === "cat"
          ? `${name}: size, lifespan, grooming & care | PetPrep`
          : `${name} (${one.toLowerCase()}): needs, lifespan & care | PetPrep`,
    metaDescription: (name, one) =>
      `${name}: sourced needs of this ${one.toLowerCase()} breed — exercise, grooming, meals, size, lifespan, who it suits — and how PetPrep simulates it.`,
    suitabilityTitle: "Who it suits",
    suitabilityNote: "The same tags as in the app. Each tag is backed by the sources listed at the bottom of the page.",
    suitabilityNone: "No sourced suitability tags for this breed yet.",
    needsTitle: "What it needs",
    needsIntro: (species) =>
      species === "cat"
        ? "From cat breed registries, veterinary organisations and studies. Where sources differ, each one is shown."
        : "From breed standards, kennel clubs, veterinary charities and studies. Where sources differ, each one is shown.",
    general: (many) => `General guidance for ${many.toLowerCase()} (not breed-specific):`,
    noData: "Not in our sources yet.",
    simTitle: "How PetPrep simulates it",
    simBadge: "Game rules, not veterinary advice",
    simIntro:
      "In PetPrep one real week is one month of the pet's life. These are the rules the game uses for this breed. PetPrep chose them from the sources on this page; they are not care instructions for a real animal.",
    simInfoOnly: "This breed is in the register for information only; the app does not simulate it yet.",
    simTable: { stage: "Life stage", starts: "Starts", meals: "Meals a day", activity: { steps: "Daily step goal", play_sessions: "Play a day" } },
    arrives: (m) => `arrives at ${m} months`,
    fromMonth: (m, years) => (years ? `month ${m} (${years})` : `month ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `from month ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Each game number is a PetPrep decision recorded with its sources.",
    healthTitle: "Health",
    healthNote: "For information only, not vet-reviewed. Ask your vet about your own animal.",
    healthNone: "Our sources do not include breed-specific health information for this breed yet.",
    sourcesTitle: "Sources",
    sourcesIntro: "Every fact on this page cites one of these sources.",
    sourceLabel: (id, publisher) => `Source ${id}: ${publisher}`,
    disclaimer: "PetPrep is a simulation for families. This page is not veterinary advice — for a real animal, ask a vet or the breed club.",
    backTo: (many) => `All ${many.toLowerCase()}`,
    compareWith: "Compare with other breeds",
    updated: "Updated",
    glanceTitle: "At a glance",
    glanceNote: "Key facts from the sources at the bottom of the page. Where sources differ, each value is listed.",
    portraitAlt: { ai_photo: (name) => `${name} — photo (AI)`, ai_illustration: (name) => `${name} — illustration (AI)` },
    portraitCaption: { ai_photo: "AI-generated photo", ai_illustration: "AI-generated illustration" },
    qa: {
      title: "Questions and answers",
      intro: "Answered only from the sourced facts on this page; every answer names its sources.",
      questions: {
        exercise: (n) => `How much exercise does ${a(n)} need?`,
        lifespan: (n) => `How long does ${a(n)} live?`,
        size: (n) => `How big does ${a(n)} get?`,
        grooming: (n) => `How much grooming does ${a(n)} need?`,
        suits: (n) => `Who is the ${n} a good fit for?`,
      },
      leads: {
        exercise: (n) => `According to our sources, the ${n} needs this much exercise:`,
        lifespan: (n) => `According to our sources, the lifespan of the ${n} is:`,
        size: (n) => `Size and adult weight of the ${n}, according to our sources:`,
        grooming: (n) => `Coat and grooming of the ${n}, according to our sources:`,
        suits: (n) => `Our sources describe the ${n} as a good fit for:`,
      },
      considerLead: "Keep in mind:",
      differ: "The sources give different values, so each one is listed.",
      join: "; ",
    },
  },
  intros: {
    border_collie: {
      text: [
        "The Border Collie is a medium-sized herding dog from Great Britain, built for endurance and hard work. Its breed standard describes a keen, alert, responsive and intelligent dog that is neither nervous nor aggressive.",
        "Kennel clubs and vets agree on one thing above all: this is a very high-energy breed. It needs more than two hours of exercise every day and plenty to think about. When it is bored or under-exercised it finds its own jobs — chewing whatever is in reach, or trying to herd children at play.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador",
      text: [
        "The Labrador Retriever is a large, strongly built gundog from Great Britain, bred to retrieve. Its standard describes a good-tempered, kindly and adaptable companion that is keen to please and loves water. The coat is short and dense, in black, yellow or liver/chocolate.",
        "UK charities describe the Labrador as a family dog that bonds with the whole household when it is well socialised. It is very active and highly food-motivated: treats help with training, but Labradors are also prone to putting on weight.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden",
      text: [
        "The Golden Retriever is a large gundog from Great Britain with a flat or wavy coat in shades of gold or cream. Its standard describes a biddable, intelligent dog that is kindly, friendly and confident.",
        "UK charities call it a great family dog for an active family, and one that can be a good first dog. The trade-offs are clear in the sources: at least two hours of exercise a day, brushing several times a week, and a coat that sheds a lot.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Frenchie",
      text: [
        "The French Bulldog is a small, sturdy companion dog from France with a short, smooth coat and upright “bat ears”. Its standard describes a sociable, lively and playful dog; UK charities call it laid back and adaptable and say it tends to get along well with children, which has made it a popular family pet.",
        "It needs up to an hour of exercise a day and suits a flat. The trade-off every source raises is the flat face: it can make breathing harder, and Frenchies overheat quickly, especially in warm weather — so shade, water and calm walks matter. PDSA suggests families also consider adopting an adult French Bulldog.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
  },
};

export default en;
