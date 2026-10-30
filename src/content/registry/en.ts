import type { RegistryCopy } from "./types";

const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** "a Border Collie", "an Akita". */
const a = (name: string) => `${/^[AEIOU]/.test(name) ? "an" : "a"} ${name}`;
type Fci = { number: number; group: number; origin: string };
const fciGroups: Record<number, string> = { 1: "sheepdogs and cattle dogs", 2: "pinscher and schnauzer types, molossoid breeds and Swiss mountain and cattle dogs", 3: "terriers", 4: "dachshunds", 5: "spitz and primitive types", 6: "scent hounds and related breeds", 7: "pointing dogs", 8: "retrievers, flushing dogs and water dogs", 9: "companion and toy dogs", 10: "sighthounds" };
const origins: Record<string, string> = { GB: "Great Britain", FR: "France", DE: "Germany", US: "USA", CU: "Cuba", CH: "Switzerland", IT: "Italy", "CN-XZ": "Tibet (China)", CN: "China", MX: "Mexico", BE: "Belgium", HU: "Hungary", JP: "Japan", ZA: "South Africa", "BE-FR": "Belgium / France", PT: "Portugal", CA: "Canada", HR: "Croatia", AU: "Australia", RU: "Russia", IE: "Ireland" };

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
      "Where a breed has a size class (for dogs: toy, small, medium, medium to large, large or giant), it is the class the named source gives — usually a kennel club — and weights are the ranges the sources state, not our estimates.",
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
    size: { label: "Size", values: { toy: "Toy", small: "Small", small_medium: "Small to medium", medium: "Medium", medium_large: "Medium to large", large: "Large", giant: "Giant" } },
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
    size: { toy: "toy", small: "small", small_medium: "small to medium", medium: "medium", medium_large: "medium to large", large: "large", giant: "giant" },
    coat: { moderately_long: "moderately long", smooth: "smooth (short)", short: "short", medium: "medium length", short_long: "short or long (two coat varieties)", long: "long" },
    grooming_frequency: { at_least_once_a_week: "at least once a week", at_least_once_or_twice_a_week: "at least once or twice a week", once_a_week: "once a week", more_than_once_a_week: "more than once a week", daily: "daily", every_day: "every day" },
    grooming_level: { moderate: "moderate", high: "high", low: "low" },
    shedding: { yes: "sheds", no: "does not shed (not the same as hypoallergenic)", high: "sheds a lot", moderate: "sheds moderately", low: "sheds little", minimal: "sheds minimally" },
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
    less_than: (t) => `less than ${t}`,
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
        : p.multiplier === 1
          ? "Learns commands as fast as the mixed breed of the free plan."
          : `Learns commands ${f.num(p.multiplier)}× as fast as the mixed breed of the free plan.`,
    senior_share: (p, f) => `Becomes a senior in month ${p.months} (${f.num(p.months / 12, 1)} years) — the last quarter of the breed's expected lifespan.`,
    walk_sensor: () => "Walks count real steps from Apple Health or Health Connect (with permission, read-only) and the phone's motion sensor — no GPS.",
    play_instead_of_steps: (p, f) =>
      `No walks: an adult cat needs ${p.sessions} play sessions a day with a wand toy, at least ${f.num(p.gap_minutes / 60)} hours apart.`,
    litter_rule: (p) =>
      `Litter box: an adult cat uses it ${p.uses} times a day; each use is scooped within ${p.scoop_hours} hours (outside quiet hours), and all the litter is changed every ${p.change_days} days.`,
    scratching_after_missed_play: () => "After a day without enough play the cat scratches something once; the child carries it to the scratching post.",
    grooming_rule: (p) => (p.per_week === 1 ? "Combing once a week." : p.per_week === 2 ? "Combing twice a week." : `Combing ${p.per_week} times a week.`),
    no_walk_in_heat: (p) =>
      `In summer (June–August; December–February in the southern hemisphere) the child and walk screens show a calm reminder between ${p.from} and ${p.to} family time: no walks in the heat. No weather data, no penalty — steps still count.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "cleaning the skin folds",
        tooth_brushing: "brushing the teeth",
        ear_cleaning: "checking and cleaning the ears",
        nail_trim: "trimming the nails",
        bath: "a bath",
        groomer_visit: "a visit to the groomer",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "every day"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "once a week"
              : `every ${q.period_days / 7} weeks`
            : `${q.times} ${s(q.times, "time", "times")} every ${q.period_days} days`;
      const who = q.actor === "parent" ? "a reminder for the parent" : "a task for the child";
      return `Care: ${what} ${when} — ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "See the puppy with its mother, where it was born.",
      min_age_puppy: "The puppy should not leave its mother before 8 weeks of age.",
      pedigree_fci: "Ask for the pedigree. Under FCI rules a pedigree may be issued for correct parentage only.",
      parents_health_tests: "Ask to see the health-test results of both parents. Which tests matter depends on the breed.",
      breed_club_rules: "National kennel clubs can set breeding rules that go beyond the FCI's — ask the breed club which tests the parents need.",
      written_contract: "Ask for a written sale contract that records the puppy's background and health.",
      kitten_see_mother: "See the kitten with its mother, where the kittens live.",
      kitten_min_age: "Under FIFe pedigree rules, a kitten does not go to a new home before 14 weeks of age.",
      kitten_vaccination: "The kitten is fully vaccinated (panleukopenia, calicivirus, herpesvirus) and comes with a vaccination record.",
      kitten_pedigree: "A pedigree kitten comes with a pedigree certificate showing at least three generations.",
      kitten_parents_tests: "Ask whether either parent has had health problems the kitten could inherit.",
    },
    tests: {
      hip_scheme: "Hip X-ray screening for hip dysplasia (UK: BVA/KC scheme)",
      elbow_scheme: "Elbow X-ray screening for elbow dysplasia (UK: BVA/KC scheme)",
      eye_scheme: "Eye examination by a veterinary eye specialist (UK: BVA/KC/ISDS scheme; for some breeds with gonioscopy)",
      heart_scheme: "Heart screening for mitral valve disease",
      boas_grading: "Breathing test for brachycephalic obstructive airway syndrome (BOAS grading)",
      ivdd_screening: "Spine screening for intervertebral disc disease (IVDD)",
      hearing_baer: "Hearing test for deafness (BAER)",
      cm_sm_mri: "MRI screening for Chiari-like malformation and syringomyelia (UK: BVA/KC CM/SM scheme)",
      inbreeding_coi: "Genetic diversity — check the inbreeding coefficient",
      dna_prcd_pra: "DNA test for progressive retinal atrophy (prcd-PRA)",
      dna_rcd4_pra: "DNA test for progressive retinal atrophy (rcd4)",
      dna_gr_pra2: "DNA test for progressive retinal atrophy (GR_PRA2)",
      dna_cnm: "DNA test for centronuclear myopathy (CNM)",
      dna_eic: "DNA test for exercise-induced collapse (EIC)",
      dna_hnpk: "DNA test for hereditary nasal parakeratosis (HNPK)",
      dna_sd2: "DNA test for skeletal dysplasia 2 (SD2)",
      dna_mcd: "DNA test for macular corneal dystrophy (MCD)",
      dna_stgd: "DNA test for Stargardt disease (STGD)",
      dna_cc_de: "DNA test for curly coat / dry eye syndrome (CC/DE)",
      dna_ef: "DNA test for episodic falling (EF)",
      dna_cea: "DNA test for collie eye anomaly (CEA/CH)",
      dna_cl: "DNA test for ceroid lipofuscinosis (CL)",
      dna_igs: "DNA test for Imerslund-Gräsbeck syndrome (IGS)",
      dna_mdr1: "DNA test for multi-drug sensitivity (MDR1)",
      dna_tns: "DNA test for trapped neutrophil syndrome (TNS)",
      dna_sn: "DNA test for sensory neuropathy (SN)",
      dna_ggd: "DNA test for goniodysgenesis and glaucoma risk (GGD)",
      dna_raines: "DNA test for Raine's syndrome",
      dna_dm: "DNA test for degenerative myelopathy (DM)",
      dna_de: "DNA test for degenerative encephalopathy (DE)",
      dna_jadd: "DNA test for juvenile Addison's disease (JADD)",
      dermoid_sinus_scheme: "Puppy check for dermoid sinus (breed club scheme)",
      dna_jme: "DNA test for juvenile myoclonic epilepsy (JME)",
      dna_pap_pra1: "DNA test for progressive retinal atrophy in Papillons (Pap-PRA1)",
      dna_nad: "DNA test for neuroaxonal dystrophy (NAD)",
      dna_eopra: "DNA test for early-onset progressive retinal atrophy (EOPRA)",
      dna_cu: "DNA test for cystinuria (CU), an inherited kidney and bladder stone condition",
      heart_echo_scheme: "Heart screening by colour Doppler ultrasound (breed club scheme)",
      cardiac_exam: "Heart examination of the parents (breed club recommendation)",
      dna_rd_osd: "DNA test for retinal dysplasia / oculoskeletal dysplasia (RD/OSD)",
      dna_xlpra1: "DNA test for X-linked progressive retinal atrophy (XLPRA1)",
      dna_cmo: "Test for craniomandibular osteopathy (CMO), an inherited bone disorder of the jaw",
      dna_hsf4: "DNA test for hereditary cataract (HSF4)",
      dna_lafora: "DNA test for Lafora disease",
      dna_nccd: "DNA test for neonatal cerebellar cortical degeneration (NCCD)",
      dna_fviid: "DNA test for factor VII deficiency (FVIID)",
      dna_mls: "DNA test for Musladin-Lueke syndrome (MLS)",
      dna_vwd1: "DNA test for von Willebrand disease type 1 (vWD1)",
      dna_mac: "DNA test for susceptibility to Mycobacterium avium complex infection (MAC)",
      dna_imgd: "DNA test for inherited myopathy of Great Danes (IMGD), a muscle-wasting disease",
      dna_poag: "DNA test for primary open-angle glaucoma (POAG), an inherited eye disease that can lead to blindness",
      dna_aon: "DNA test for adult-onset neuropathy (AON), an inherited nerve disease",
      dna_fn: "DNA test for familial nephropathy (FN), an inherited kidney disease",
      patella_scheme: "Kneecap check for luxating patella before breeding",
      kidney_scheme: "Ultrasound of the kidneys for a missing or malformed kidney (breed club recommendation)",
      kidney_upc_scheme: "Urine test (protein to creatinine ratio) for kidney disease (breed club recommendation)",
      dna_gld: "DNA test for globoid cell leukodystrophy (GLD), an inherited nerve disease",
      liver_shunt_scheme: "Liver check for a portosystemic shunt or microvascular dysplasia (breed club recommendation)",
      breed_health_scheme: "The breed club's health scheme for the parents",
      hemivertebrae_scheme: "X-ray of the parents' spine for hemivertebrae (malformed spinal bones), after 12 months of age",
      dna_hcm_mc: "DNA test for hypertrophic cardiomyopathy (MC HCM)",
      dna_sma: "DNA test for spinal muscular atrophy (SMA)",
      dna_pk_def: "DNA test for pyruvate kinase deficiency (PK def)",
      hcm_negative: "Breeding cats must be HCM negative (heart disease: hypertrophic cardiomyopathy)",
      dna_gsd4: "DNA test for glycogen storage disease type IV (GSD IV)",
      dna_pra_b: "DNA test for progressive retinal atrophy in the Bengal (PRA-b)",
      dna_jlpp: "DNA test for juvenile laryngeal paralysis and polyneuropathy (JLPP)",
      dna_lemp2: "DNA test for leukoencephalomyelopathy (LEMP-2)",
      dna_huu: "DNA test for hyperuricosuria (HUU)",
      dna_dcm: "DNA test for dilated cardiomyopathy (DCM), a heart muscle disease",
      dna_pra5: "DNA test for progressive retinal atrophy (PRA5)",
      dna_dings2: "DNA test for dancing Dobermann disease (DINGS2), a nerve and muscle disorder",
      dna_ams: "DNA test for acral mutilation syndrome (AMS), a nerve disorder that takes away pain feeling in the paws",
      dna_dams: "DNA test for dyserythropoietic anaemia and myopathy syndrome (DAMS), a blood and muscle disorder",
      dna_fuco: "DNA test for fucosidosis, an inherited disease of the nervous system",
      dna_pfk: "DNA test for phosphofructokinase deficiency (PFK), an inherited enzyme disorder of the blood and muscles",
      dna_pra_cord1: "DNA test for progressive retinal atrophy (PRA cord1)",
      dna_bbs2_pra: "DNA test for progressive retinal atrophy (BBS2-PRA)",
      dna_cnga1_pra: "DNA test for progressive retinal atrophy (CNGA1-PRA)",
      dna_pra_rcd2: "DNA test for progressive retinal atrophy (PRA-rcd2)",
      dna_gm1: "DNA test for GM1 gangliosidosis (an inherited disease of the nervous system)",
      dna_gm2: "DNA test for GM2 gangliosidosis (an inherited disease of the nervous system)",
      dna_vwd3: "DNA test for von Willebrand disease type 3 (vWD3), an inherited bleeding disorder",
      dna_pra_rcd3: "DNA test for progressive retinal atrophy (PRA-rcd3)",
      dna_vwd2: "DNA test for von Willebrand disease type 2 (vWD2), an inherited bleeding disorder",
      dna_l2hga: "DNA test for L-2-hydroxyglutaric aciduria (L-2-HGA), an inherited metabolic disease of the nervous system",
      dna_pll: "DNA test for primary lens luxation (PLL), an inherited eye disease in which the lens slips out of place",
      dna_loa: "DNA test for late onset ataxia (LOA), an inherited disease that affects balance and coordination",
      dna_sca: "DNA test for spinocerebellar ataxia (SCA), an inherited disease of the nervous system",
    },
  },
  health: {
    weight_gain: "Puts on weight easily — portions and treats need watching.",
    hip_elbow_dysplasia_eye_conditions: "Can be prone to hip and elbow dysplasia and to several inherited eye conditions.",
    cancer_risk: "Sources describe a higher risk of cancer in this breed.",
    flat_face_breathing: "Flat-faced (brachycephalic) breed: the short muzzle, narrow nostrils and extra soft tissue in the airway can make breathing harder (brachycephalic obstructive airway syndrome, BOAS).",
    heat_stroke_risk: "Overheats quickly and is more vulnerable to heatstroke than most dogs, especially in warm weather.",
    skin_fold_ear_problems: "Prone to ear inflammation and skin-fold infections; the skin folds need to be kept clean and dry.",
    ear_infections_long_ears: "Ear infections can occur because of the long ears; bacteria can build up in the ear canal.",
    collie_eye_pra: "Inherited eye diseases occur in the breed: collie eye anomaly, an abnormality at the back of the eye, and progressive retinal atrophy, which can slowly lead to blindness; eye testing and DNA tests are available.",
    merle_colour_risk: "Merle is not a breed-standard colour; in this breed it carries a higher risk of hearing and sight problems.",
    hind_leg_conformation: "The Royal Kennel Club names the shape of the hind legs and the way the dog moves as a point of concern in this breed; a sound dog has a level back and moderate hind legs.",
    hip_elbow_dysplasia: "Can be prone to hip and elbow dysplasia; breeders are advised to have the parents' hips and elbows tested before breeding.",
    degenerative_myelopathy: "Degenerative myelopathy, a disease of the spinal cord that slowly weakens the back legs, occurs in the breed; a DNA test is available.",
    exercise_induced_collapse: "Exercise-induced collapse, an inherited neuromuscular condition that can make a dog collapse after hard exercise, occurs in the breed.",
    heart_valve_disease: "Heart disease caused by a weakening mitral valve is a big problem in this breed; it is often first noticed as a heart murmur, and breeding dogs should be heart-graded first.",
    chiari_syringomyelia: "Chiari-like malformation and syringomyelia, a painful condition with fluid-filled cavities in the spinal cord near the brain, occurs in the breed and is linked to skull shape; it is diagnosed by MRI scan.",
    eye_conditions: "Inherited eye conditions such as cataracts occur in the breed, and protruding or irritated eyes are a point of concern; eye testing and DNA tests are available.",
    epilepsy: "Epilepsy, a brain disorder that can cause seizures, occurs in the breed.",
    back_disc_disease: "Intervertebral disc disease, a problem with the cushioning discs between the bones of the back, occurs in the breed.",
    pra_eye_disease: "Progressive retinal atrophy, an inherited eye disease that can slowly lead to blindness, occurs in the breed; DNA tests and eye testing are available.",
    hip_dysplasia: "Hip dysplasia, a poorly developed hip joint that can lead to arthritis, occurs in the breed; breeders are advised to have the parents' hips scored.",
    bloat_gdv: "Bloat (gastric dilatation-volvulus), where the stomach twists, can occur in the breed — it is an emergency that needs a vet straight away.",
    inherited_eye_disease: "Inherited eye diseases occur in the breed, such as collie eye anomaly, cataracts and progressive retinal atrophy.",
    drug_sensitivity_mdr1: "Some dogs of the breed have an inherited sensitivity to certain medicines (multi-drug sensitivity, MDR1) — if your dog is affected, tell your vet.",
    merle_to_merle_breeding: "Merle is a standard colour in this breed; two merle dogs should not be bred together, because such puppies risk impaired sight and hearing — the Royal Kennel Club does not register them.",
    kneecap_luxation: "Luxating patellas, where the kneecap temporarily slips out of place, occur in the breed.",
    pra_and_eyelashes: "Eye problems occur in the breed: progressive retinal atrophy, which can slowly lead to blindness, and extra eyelashes that rub on the eye (distichiasis); breeders are advised to have the parents' eyes tested.",
    liver_shunt: "A portosystemic (liver) shunt, where blood bypasses the liver, can occur in the breed.",
    skin_allergies: "Skin allergies are a known concern in the breed; The Royal Kennel Club asks judges to look for signs of skin inflammation, and owners are advised to ask their vet before choosing a shampoo.",
    westie_lung: "A lung disease known as \"Westie lung\" (idiopathic pulmonary fibrosis), which makes breathing harder, can occur in the breed, mostly in older dogs.",
    jaw_bone_disorder: "An inherited bone disorder of the jaw can occur in the breed.",
    dry_eye: "Dry eye, where the eyes do not make enough tears and become dry and painful, can occur in the breed.",
    heart_hcm: "Hypertrophic cardiomyopathy (HCM), an inherited heart disease in which the heart muscle thickens, occurs in the breed.",
    dental_weight_nail_care: "A large UK study names dental disease, being overweight and overgrown claws among the most common problems in the breed, so owners are advised to keep up dental care, weight control and claw care.",
    dental_weight_care: "PetMD names dental disease and being overweight among the problems to watch for, so owners are advised to brush the cat's teeth regularly and keep its weight in check.",
    gsd_iv: "Glycogen storage disease type IV (GSD IV), an inherited disorder that affects kittens, occurs in the breed; a DNA test of the parents lets breeders avoid it.",
    hip_dysplasia_weight: "Hip dysplasia, a poorly developed hip joint, can occur in the breed; PetMD advises keeping the cat at a healthy weight to protect its joints.",
    laryngeal_paralysis_polyneuropathy: "Juvenile laryngeal paralysis and polyneuropathy (JLPP), an inherited nerve disease that affects the voice box and the back legs, occurs in the breed; a DNA test of the parents lets breeders avoid it.",
    heart_sas: "Subaortic stenosis, a narrowing just below a heart valve that can cause a murmur, occurs in the breed; breeding dogs should have their hearts checked first.",
    inherited_eye_defects: "Inherited eye conditions occur in the breed, such as retinal dysplasia and persistent pupillary membrane; eye testing is available.",
    skin_fold_infections: "The skin folds, especially on the face, can trap moisture and become infected (skin fold pyoderma); the facial wrinkles need daily cleaning.",
    eyelid_eye_problems: "Eyelid problems (eyelids turned in or out), dry eye and cherry eye occur in the breed; eye testing is available.",
    hip_elbow_joint_disease: "Hip and elbow dysplasia, where the joints do not develop correctly, occur in the breed and can lead to joint disease.",
    hip_dysplasia_arthritis: "Hip dysplasia, a loose, poorly developed hip joint, occurs in the breed and can eventually lead to arthritis.",
    bleeding_disorder_vwd: "Von Willebrand's disease, an inherited problem with blood clotting that can cause excessive bleeding, occurs in the breed.",
    heart_muscle_disease: "Cardiomyopathy, an enlarged heart caused by a weakening of the heart muscle, can occur in the breed.",
    itchy_skin_allergy: "Skin allergies (atopy), which cause itching and sore skin, can occur in the breed.",
    entropion_cherry_eye: "Eyelids that turn inwards (entropion) and cherry eye, where the third eyelid pops out, can occur in the breed; cherry eye can be corrected surgically.",
    dental_disease_tooth_brushing: "A large UK study names dental disease as by far the most common problem in the breed, and puppy teeth that do not fall out are also common, so owners are encouraged to care for the dog's teeth every day, for example by brushing them.",
    windpipe_collapse: "Tracheal collapse, where the windpipe loses its stiffness and can cause weakness and collapse, can occur in the breed.",
    eye_problems_pra_lens_dry_eye: "Eye problems occur in the breed, such as progressive retinal atrophy, which can slowly lead to blindness, a dislocated lens (lens luxation) and dry eye.",
    cataracts_lens_luxation: "Eye problems can occur in the breed, such as cataracts, which cloud the lens, and a dislocated lens (lens luxation).",
    wobbler_syndrome: "Wobbler syndrome, where unstable bones in the neck press on the spinal cord and weaken the back legs, can occur in the breed.",
    eye_phpv: "An eye defect that is present from birth (persistent hyperplastic primary vitreous, PHPV) can occur in the breed; breeders are advised to have the parents' eyes tested.",
    certain_cancers: "Certain cancers can occur in the breed.",
    bare_skin_sun_cold: "The bare skin of the hairless variety needs protection from the sun and from the cold.",
    l2hga_nervous_system: "L-2-hydroxyglutaric aciduria (L-2-HGA), an inherited metabolic disorder that affects the nervous system, can occur in the breed; a DNA test of the parents is available.",
    short_face_breathing: "A moderately short-faced breed: some dogs with shorter faces can have serious breathing problems (brachycephalic obstructive airway syndrome, BOAS).",
    corneal_ulcers: "Eye problems such as corneal ulcers are more likely because of the skull shape and prominent eyes; eye testing is available.",
    skin_folds_allergies: "Skin problems such as allergies, warts, skin tags and sore skin folds on the face (skin fold dermatitis) can occur; the face folds should be kept clean and dry.",
    heart_cardiomyopathy_aortic_stenosis: "Heart problems such as cardiomyopathy and aortic stenosis can occur in the breed.",
    dental_disease_care: "A large UK study names dental disease as the most common problem in the breed, and owners are advised to make dental care a priority.",
    bladder_stones: "Bladder stones, collections of minerals that form in the bladder and urine, can occur in the breed.",
    deafness: "Deafness in one or both ears occurs in the breed; puppies' hearing can be checked with a BAER test.",
    mitral_valve_disease: "Mitral valve disease, a heart condition where a weakened valve lets blood flow back into the heart, occurs in the breed; a vet can listen to breeding dogs' hearts before they are bred.",
    eye_problems_pra_cataracts_dry_eye: "Eye problems occur in the breed, such as progressive retinal atrophy, which can slowly lead to blindness, cataracts and dry eye; eye testing is available.",
    skin_comedo_allergy: "Skin problems can occur, such as Schnauzer comedo syndrome (a type of inflamed hair follicles) and skin allergies (atopy) that cause itching.",
    shorter_face_boas: "A brachycephalic (short-faced) breed: the shorter face can cause serious breathing problems (brachycephalic obstructive airway syndrome, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Eye problems occur in the breed, such as dry eye, cataracts, progressive retinal atrophy, which can slowly lead to blindness, and retinal detachment.",
    hypothyroidism: "An underactive thyroid (hypothyroidism), which can affect weight, skin and energy levels, can occur in the breed.",
    open_fontanelle: "An open fontanelle, a soft spot on the skull that does not close fully, can occur in the breed.",
    collapsing_trachea: "A collapsing trachea, a weakness of the windpipe that can cause coughing and breathing difficulty, can occur in the breed.",
    gm1_gangliosidosis: "GM1 gangliosidosis, an inherited disease of the nervous system, can occur in the breed; a DNA test of the parents can rule it out.",
    addisons_disease: "Addison's disease, a lack of hormones from the adrenal glands, can occur in the breed.",
    protein_losing_disease: "Protein-losing diseases of the kidneys or the gut, which can cause diarrhoea and weight loss, can occur in the breed.",
    diabetes_mellitus: "Diabetes mellitus, where the body cannot control its blood sugar properly, can occur in the breed.",
    dental_disease_home_brushing: "Like many small dogs, the breed is prone to dental disease, so brushing the teeth at home with a dog toothbrush and toothpaste is advised.",
    dermoid_sinus: "Dermoid sinus, a painful condition in which a tube in the skin of the back connects to the spinal cord, can occur in the breed; breed clubs run a dermoid sinus checking scheme for puppies.",
    cataracts: "Cataracts, which cloud the lens of the eye and can lead to vision loss, can occur in the breed.",
    pra_inherited_blindness: "Progressive retinal atrophy, an inherited eye disease that can slowly lead to blindness, can occur in the breed.",
    eyelids_turned: "Eyelids that turn inwards (entropion) or outwards (ectropion) can occur in the breed; ask for eye-checked parents.",
    glaucoma_poag: "Primary open-angle glaucoma, where fluid builds up inside the eye and causes pain and possibly blindness, can occur in the breed; a DNA test for the parents exists.",
    skin_fold_dermatitis: "The loose skin forms folds that can become sore and infected; they need checking every day and keeping clean and dry.",
    eyelid_problems: "Eyelid problems can occur in the breed: eyelids that turn inwards (entropion) or outwards (ectropion), and cherry eye, where the third eyelid pops out.",
    skin_allergy_face_folds: "Skin allergies (atopy) that cause itching can occur in the breed, and the folds of skin on the face need cleaning every day.",
    skin_ear_allergies: "Environmental allergies can occur in the breed and may lead to repeated skin or ear infections; PetMD suggests weekly ear cleaning for a dog with allergies.",
    gum_disease_daily_brushing: "The breed is prone to gum disease (gingivitis and periodontal disease), so PetMD advises brushing the dog's teeth every day and a yearly dental check at the vet.",
    pra_pk_def: "Two inherited conditions occur in the breed: progressive retinal atrophy, an eye disease that can lead to blindness, and pyruvate kinase deficiency, a blood disorder; DNA tests of the parents let breeders avoid them.",
    windpipe_collapse_breathing: "Tracheal collapse, where the rings of the windpipe collapse and make breathing difficult, can occur in the breed.",
    eye_problems_pra_cataracts_entropion: "Eye problems occur in the breed, such as progressive retinal atrophy, which can slowly lead to blindness, cataracts, which cloud the lens, and eyelids that turn inwards (entropion); eye testing is available.",
    elbow_dysplasia_arthritis: "Elbow dysplasia, a poorly developed elbow joint that can eventually lead to arthritis, can occur in the breed.",
    entropion: "Entropion, where the eyelids turn inwards and irritate the eye, can occur in the breed; ask for eye-checked parents.",
    autoimmune_conditions: "Autoimmune conditions, where the body reacts against itself, can occur in the breed.",
    ear_infections_prone: "The breed is prone to ear infections; keep a close eye on ear hygiene.",
    familial_nephropathy: "An inherited kidney disease (familial nephropathy) occurs in the breed; a DNA test of the parents is available.",
    hereditary_nephritis: "An inherited kidney disease (hereditary nephritis, also called Samoyed hereditary glomerulopathy) occurs in the breed.",
    panosteitis: "Panosteitis, a painful inflammation of the long bones that usually affects young, growing dogs, can occur in the breed.",
    urinary_incontinence: "Urinary incontinence, an uncontrolled leaking of urine, can occur in the breed.",
    osteochondritis: "Osteochondritis dissecans (OCD), a disorder of the joint cartilage in growing dogs, can occur in the breed.",
    scottie_cramp: "Scottie cramp — short episodes of muscle cramping, usually brought on by excitement — occurs in the breed; it is not painful.",
    periodontal_disease: "Periodontal disease, an infection and inflammation of the gums and the tissues that hold the teeth, is a known problem in the breed.",
    extra_eyelashes: "Distichiasis, where small extra eyelashes grow on the inner surface or the edge of the eyelid and can rub the eye, can occur in the breed; ask for parents tested under the eye scheme.",
    cm_sm_screening: "Chiari-like malformation and syringomyelia, a painful condition with fluid-filled cavities in the spinal cord near the brain, can occur in the breed; breeders are advised to screen the parents (UK: BVA/KC scheme).",
    prominent_eyes_injury_dry_eye: "Prominent eyes are more easily injured and can develop ulcers and dryness; dry eye and cherry eye also occur in the breed.",
    legg_perthes: "Legg-Perthes disease, a painful condition in which the hip joint dies and crumbles, can occur in the breed.",
    glaucoma: "Glaucoma, increased pressure inside the eye that can be painful and lead to blindness, can occur in the breed.",
    lethal_acrodermatitis: "Lethal acrodermatitis, an inherited disease that causes severe skin and growth problems in puppies, occurs in the breed.",
    kidney_disease_urine_screening: "Kidney problems occur in the breed; urine tests can screen the parents before breeding.",
    primary_lens_luxation: "Primary lens luxation, a painful inherited eye condition in which the lens slips out of place and which can cause blindness, occurs in the breed; a DNA test is available for breeding dogs.",
    inherited_ataxia: "Inherited ataxias (late onset ataxia and spinocerebellar ataxia), which cause loss of balance and coordination, occur in the breed; DNA tests are available for breeding dogs.",
    hydrocephalus: "Hydrocephalus, a build-up of fluid around the brain, can occur in the breed.",
    heart_disease_pda: "Heart disease can occur in the breed, including patent ductus arteriosus, a blood vessel near the heart that fails to close after birth; a vet can listen for it at the puppy's first check-up.",
    chiari_malformation: "Chiari-like malformation with syringomyelia, a painful condition with fluid-filled cavities in the spinal cord near the brain, can occur in the breed.",
    cataracts_entropion: "Cataracts, which cloud the lens of the eye, and eyelids that turn inwards (entropion) can occur in the breed; ask for parents tested under the eye scheme.",
    periodontal_daily_brushing: "The breed is prone to gum (periodontal) disease, so brushing the teeth every day with a dog toothpaste is advised.",
    eye_problems_shallow_sockets: "Eye problems occur in the breed, such as dry eye, eye infections and ulcers on the surface of the eye; the shallow eye sockets also make eye injuries more likely.",
    eye_problems_dry_eye_entropion_lens_luxation: "Eye problems occur in the breed, such as dry eye, eyelids that roll inwards (entropion) and a dislocated lens (lens luxation); eye testing is available.",
    heart_valve_screening: "Heart disease can occur in the breed; heart scans can check the parents for heart valve problems before breeding.",
    dental_weight_problems: "A large UK study names dental disease and being overweight as particularly common problems in the breed — problems owners can help prevent; crowded teeth and puppy teeth that do not fall out also occur.",
  },
  page: {
    eyebrow: "Animal register",
    // Search terms people use ("ragdoll cat", "temperament"); "temperament" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "temperament, " : ""}exercise, size & care | PetPrep`
        : species === "cat"
          ? `${/\bcat\b/i.test(name) ? name : `${name} cat`}: ${hasIntro ? "temperament, " : ""}grooming, size & lifespan | PetPrep`
          : `${name} (${one.toLowerCase()}): needs, lifespan & care | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Sources, health and buying tips.`,
    metaLabels: { weight: "weight", exercise: "exercise", lifespan: "lifespan" },
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
    checklistTitle: "Before you buy: what to check with the breeder",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Questions to settle before you take a kitten home. The points are advice from vets, welfare charities and cat federations; each cites its source." : "Questions to settle before you take a puppy home. The points are advice from vets, welfare charities and kennel clubs; each cites its source.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Laws on the minimum age, microchipping and vaccination differ by country — check the rules where you live.",
    checklistGeneralTitle: "For every breed",
    checklistTestsTitle: "Health tests of the parents for this breed",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tests a cat federation requires before a cat is bred" : "Tests the Royal Kennel Club recommends as a minimum",
      best_practice: "Further tests for best practice",
      other_scheme: "Other screening schemes for this breed",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "This list comes from a foreign cat federation's breeding rules (see the source) and is an orientation. Ask the breeder which tests the parents have done."
        : "These lists come from the UK's Royal Kennel Club and are an orientation; national kennel clubs can set their own, stricter rules. Ask the breed club and the breeder which tests the parents have done.",
    checklistStatus: {
      none_recommended: "The Royal Kennel Club currently lists no recommended pre-breeding health screening for this breed. Still ask the breeder about the parents' health.",
      not_found: "We have not yet found a reliable source that lists health tests for the parents of this breed. Ask the breed club and the breeder which tests the parents have done.",
      not_checked: "We have not yet checked the health tests for the parents of this breed. Ask the breed club and the breeder which tests the parents have done.",
    },
    sourcesTitle: "Sources",
    sourcesIntro: "Every fact on this page cites one of these sources.",
    sourceLabel: (id, publisher) => `Source ${id}: ${publisher}`,
    disclaimer: "PetPrep is a simulation for families. This page is not veterinary advice — for a real animal, ask a vet or the breed club.",
    backTo: (many) => `All ${many.toLowerCase()}`,
    compareWith: "Compare with other breeds",
    related: { title: "Similar breeds", intro: (many) => `Other ${many.toLowerCase()} in the register with similar needs — each with sourced facts.` },
    updated: "Updated",
    glanceTitle: "At a glance",
    glanceNote: "Key facts from the sources at the bottom of the page. Where sources differ, each value is listed.",
    portraitAlt: { ai_photo: (name) => `${name} — photo (AI)`, ai_illustration: (name) => `${name} — illustration (AI)` },
    portraitCaption: { ai_photo: "AI-generated photo", ai_illustration: "AI-generated illustration" },
    portraitColours: {
      legend: "Coat colour",
      alt: { ai_photo: (name, colour) => `${name}, ${colour} — photo (AI)`, ai_illustration: (name, colour) => `${name}, ${colour} — illustration (AI)` },
    },
    share: {
      button: "Share",
      title: "Share this breed",
      copy: "Copy",
      copied: "Copied",
      linkLabel: "Link to this page",
      more: "More options",
      text: (name) => `${name}: needs, sources and how PetPrep simulates it`,
      emailSubject: (name) => `${name} — PetPrep animal register`,
      on: (network) => `Share on ${network}`,
    },
    og: { lead: "Needs, sources and how PetPrep simulates it", photoLabel: "AI photo" },
    qa: {
      title: "Questions and answers",
      intro: "Answered only from the sourced facts on this page; every answer names its sources.",
      questions: {
        exercise: (n) => `How much exercise does ${a(n)} need?`,
        lifespan: (n) => `How long does ${a(n)} live?`,
        size: (n) => `How big does ${a(n)} get and how much does it weigh?`,
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
    german_shepherd: {
      aka: "Alsatian, GSD",
      text: [
        "The German Shepherd Dog is a large, powerful herding dog from Germany with erect ears and a dense double coat, short or long. Its standard describes a well-balanced, self-assured dog with strong nerves, and the Royal Kennel Club calls it a versatile worker and service dog noted for bravery and intelligence.",
        "It needs at least two hours of exercise a day, suits a large house with a garden and sheds a lot. UK charities say some can make great family pets but should always be supervised around young children. The Royal Kennel Club asks breeders to test the parents' hips and elbows and lists the shape of the hind legs as a point of concern in the breed.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "The Cavalier King Charles Spaniel is a small toy spaniel from Great Britain with long, feathered ears and a long, silky coat in four colours: Blenheim, ruby, black and tan, and tricolour. Its standard describes an active, graceful dog with a gentle expression — sporting, affectionate, friendly and fearless.",
        "It needs about an hour of exercise a day, can live in a flat and is known to be good around children, though play should be supervised and it does not like being left alone. Its coat needs brushing more than once a week. UK sources name heart valve disease and a painful spinal condition linked to skull shape as the main health concerns, so breeders are asked to heart-test and MRI-scan their dogs.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "The Beagle is a small scent hound from Great Britain, bred to hunt hare by following a scent. Its standard describes a sturdy, compactly built, merry hound — bold, active and alert, amiable and showing no aggression or timidity — with a short, dense coat in hound colours such as tricolour, tan and white or lemon and white, and always a white tip to the tail.",
        "It needs up to about an hour of exercise a day and suits family life well if it is socialised from a young age, though it should be supervised with children and not left alone, when it may bark and chew things. Its short coat needs a weekly brush but it sheds. Training should start early and use rewards. UK vets most often see Beagles for weight gain and dental disease, so portions and teeth need watching.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Standard Poodle",
      text: [
        "The Standard Poodle is the largest of the four Poodle sizes, a companion breed from France descended from European duck hunters. Its standard describes an elegant, well-balanced dog with a proud carriage — loyal, gay-spirited and good-tempered, capable of learning and being trained — with a profuse, frizzy curly coat in one solid colour: black, white, brown, grey or fawn.",
        "It needs up to about an hour of exercise a day and suits a large house with a large garden. Given the right socialisation as a puppy it generally gets on well with children and other pets. Its coat does not shed, but that does not make it hypoallergenic: it needs daily grooming and regular clipping by a professional groomer. It is known for being very obedient and responding well to training.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Sausage dog, Teckel",
      text: [
        "The Dachshund is a German badger and rabbit hunter, known at home as the Teckel, that comes in several sizes and three coats; this page is about the standard size with the smooth coat. Its standard describes a dog that is moderately long in proportion to its height, with no exaggeration — faithful, versatile and good tempered; intelligent, lively and courageous — with a dense, short, smooth coat in red, or black or chocolate with tan markings.",
        "It needs up to about an hour of exercise a day, split into a couple of walks with time for sniffing, and suits a small house. It loves people and generally gets along well with children of all ages, always supervised, but with its strong prey drive it is not recommended with smaller pets, and it does not do well left alone. Because of its long back and short legs it is prone to slipped discs, so it should not jump; breeders are asked to screen the spine before breeding.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie",
      text: [
        "The Australian Shepherd is, despite its name, an American breed — an intelligent working dog with strong herding and guarding instincts. Its standard describes a well-balanced dog of medium size, slightly longer than tall, good natured and sometimes reserved at first meetings, with a medium-length, straight to wavy coat in blue merle, black, red merle or red, each with or without white and tan markings.",
        "It needs more than two hours of exercise a day and mental challenges such as puzzle games and training, and suits a large house with a large garden in the country. In the right household it can make a really good family pet, but its strong herding instinct can make it herd children, so it is not recommended for families with smaller children. It does not like being left alone, and its coat needs brushing a few times a week.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon Havanais",
      text: [
        "The Havanese is a small member of the bichon family and the national dog of Cuba. Its standard describes a sturdy little dog, low on its legs, with a very long, soft, flat or wavy coat that is never trimmed, and a tail carried high over the back. It comes in fawn, black, havana brown, tobacco, reddish brown and, rarely, white, with or without patches and tan markings.",
        "Its standard calls it affectionate, playful and even a bit of a clown, and says it loves children and plays endlessly with them; UK sources call it an excellent family pet given the right socialisation, and easy to train. It needs about 30 minutes of exercise a day, can live in a flat, and does not shed — but its long coat needs grooming every day to prevent knots and tangles.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "The West Highland White Terrier, or Westie, is a small terrier from Great Britain. Its standard describes a strongly built little dog with a deep chest, a level back and a harsh double coat about 5 cm long, small erect pointed ears and dark eyes set under heavy eyebrows. White is the only colour the standard allows.",
        "Its standard calls it alert, gay, courageous and self-reliant but friendly. UK sources call it an affectionate, playful family pet for children of any age, with play always supervised; it needs about an hour of exercise a day, can live in a flat, sheds, and needs brushing a few times a week. Because of its prey drive it should not live with smaller pets, and it does not like being left alone. Skin is a known concern: The Royal Kennel Club asks judges to look for signs of skin inflammation in the breed.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Berner Sennenhund",
      text: [
        "The Bernese Mountain Dog is a large Swiss farm dog, originally used as a guard, draught and cattle dog in the Canton of Bern. Its standard describes a strong, agile, longhaired working dog with sturdy limbs and a long, shining, straight or slightly wavy coat. The only colour the standard allows is tricolour: jet black with rich tan on the cheeks, above the eyes, on the legs and chest, and white markings on the head and chest.",
        "Its standard calls it self-confident, good-natured and friendly, and \"a kind and devoted family dog\" that is slow to mature. UK sources say it needs up to an hour of exercise a day, belongs in a large house with a large garden, sheds a lot and needs brushing more than once a week; it should not be left alone for long. It usually lives less than ten years, and UK sources list hip and elbow dysplasia, bloat and certain cancers among its health concerns.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky",
      text: [
        "The Siberian Husky is a medium-sized working sled dog, recognised by the FCI as an American breed and described by The Royal Kennel Club as the lightest and fastest of the sled dogs. Its standard asks for a dog that is quick and light on its feet, with a double, medium-length coat, thick erect ears, brown or blue eyes (one of each is allowed) and a well-furred brush tail. Colours range from black to pure white; merle and brindle are not allowed.",
        "Its standard calls it friendly and gentle, alert and outgoing. UK sources say it needs more than two hours of exercise a day, a large house with a large garden and a very secure, high fence, as Huskies are known to escape; it sheds a lot, needs brushing a few times a week and does not cope well alone. The PDSA suggests it for adult-only homes or homes with teenagers rather than families with smaller children, and lists hip dysplasia, eye problems and epilepsy among its health concerns.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "The Rottweiler is a medium to large, powerful working dog from Germany. Its standard describes a stalwart dog, neither heavy nor light, with a short, coarse, flat-lying coat, medium pendant ears and dark brown almond-shaped eyes. The only colour it allows is black with clearly defined rich tan markings on the cheeks, muzzle, throat, chest and legs; white markings are a fault.",
        "Its standard calls it good-natured, placid, very devoted, obedient and eager to work, and The Royal Kennel Club says a well-trained Rottweiler makes a wonderful family companion. UK sources say it needs more than two hours of exercise a day, a large house with a large garden and an experienced owner, because it is so powerful; it should be socialised from a young age. The PDSA does not recommend it for families with younger children and babies, and it should never be left unattended with other pets. A weekly brush is enough. It usually lives less than ten years, and The Royal Kennel Club watches the shape of its hind legs.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "English Bulldog, British Bulldog",
      text: [
        "The Bulldog is a medium-sized, smooth-coated dog from Great Britain: fairly thick set, low, broad, powerful and compact, with a relatively short face, small thin rose ears and round, very dark eyes. Its standard allows whole colours such as red, fawn, fallow and white, brindle and pied; black and black with tan are highly undesirable. It asks for large, wide-open nostrils and says that dogs showing breathing distress are highly undesirable.",
        "Its standard calls it alert, bold, loyal, dependable and courageous, fierce in appearance but affectionate, and The Royal Kennel Club says it remains hugely popular as a family companion for its character and loyalty. UK sources say it needs up to an hour of exercise a day, never in the heat of the day, and gets on well with other household pets if socialised young; it needs grooming once a week, but its facial wrinkles need daily cleaning. The PDSA describes it as a severely flat-faced breed that is very likely to have serious health problems, such as breathing difficulties, and strongly recommends considering a healthier breed, a crossbreed or a mongrel. It usually lives less than ten years.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "GSP, German Pointer, Deutsch Kurzhaar",
      text: [
        "The German Shorthaired Pointer is a versatile, all-purpose gun dog from Germany, built for work in field and water, with a short, thick coat that feels tough to the hand, broad flat ears set high and dark brown almond-shaped eyes. Its American standard allows solid liver, liver and white (such as ticked), solid black and black and white; red, orange, lemon or tan areas and a solid white dog are disqualified. Its standard describes a docked tail — PetPrep always shows the dog with its natural tail.",
        "Its standard calls it friendly, intelligent and willing to please. The Royal Kennel Club and the PDSA say it needs more than two hours of exercise a day; the PDSA adds that its instinct to hunt, point and retrieve may kick in on a walk, so it needs good recall training, and that it is fairly easy to train. It needs grooming once or twice a week and sheds moderately. A large UK study puts its median life expectancy at 13.4 years.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie",
      text: [
        "The Yorkshire Terrier is a toy terrier from Great Britain that weighs up to 3.2 kg under its breed standard, with a long, perfectly straight, glossy and silky coat hanging evenly down each side from a parting along the back. The standard allows one colour: dark steel blue from the back of the head to the tail, with rich, bright tan on the head, chest and legs; the small V-shaped ears are carried erect. The standard describes both a docked and an undocked tail — PetPrep always shows the dog with its natural tail.",
        "Its standard calls it alert, intelligent and spirited, with an even disposition. The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming every day; the PDSA adds that it enjoys running, fetching and playing games, can be quite stubborn to train, and is better suited to families with older children because its bones are very fragile. A large UK study found dental disease to be the most common problem in the breed, encourages daily care of the teeth such as tooth brushing, and found a median age at death of 13.56 years.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italian Corso Dog",
      text: [
        "The Cane Corso is a medium to large Italian molosser, a robust and sturdy dog with some elegance that is slightly longer than tall. Its standard describes a short, shiny, very dense coat in black, shades of grey, fawn or red with a dark mask, dark wheat, or brindle; large white patches are not allowed. Under the current FCI standard the ears are left uncropped and the tail is natural — and in the UK cropping and docking are illegal — so PetPrep always shows the dog with natural ears and tail.",
        "Its standard calls it a guardian of property, family and livestock, extremely agile and responsive. The PDSA says it is sociable and loving with its owners, needs around two hours of exercise a day and things to do, because it hates being bored, and is better suited to experienced owners because of its size. It does not recommend the breed for homes with small children, who could be knocked over; it suits adult-only homes or families with older children. A weekly brush is enough, but it sheds and is known to drool. The PDSA gives its average lifespan as under ten years.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Welsh Corgi (Pembroke), Corgi",
      text: [
        "The Pembroke Welsh Corgi is a small cattle dog from Wales, low set, strong and sturdily built, giving an impression of substance and stamina in a small space. Its standard describes a medium-length, straight coat with a dense undercoat in red, sable, fawn, or black and tan, with or without white markings on the legs, chest and neck, and pricked ears. The tail was once customarily docked; the standard also describes the natural tail, and PetPrep always shows the dog with its natural tail.",
        "Its standard calls it bold, workmanlike, outgoing and friendly. The Royal Kennel Club recommends up to an hour of exercise a day and grooming more than once a week; the PDSA describes friendly, happy, fun-loving dogs that are willing to please and fairly easy to train, but says they may nip at the heels of running children, so socialisation with children and training from a young age help. The Royal Kennel Club gives its lifespan as over 12 years and asks breeders to hip-score the parents.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "The Dobermann is a German companion, protection and working dog of medium size, strong and muscularly built, with elegant lines and a proud stature. Its FCI standard describes a short, hard, dense coat that lies tight and smooth, in black or brown with clearly defined rust red tan markings; white spots are not allowed. The ears and the tail are left natural under the FCI standard, and PetPrep always shows the dog with natural ears and tail.",
        "Its standard calls it friendly and calm and very devoted to the family. The Royal Kennel Club says its loyal and obedient nature makes it an excellent family dog, and recommends more than two hours of exercise a day and grooming once a week. The PDSA adds that it is very energetic, needs plenty of mental and physical exercise and early socialisation, and — because of its large size and strong build — is not recommended for families with young children or first-time owners. The Royal Kennel Club gives its lifespan as over 10 years.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "German Boxer, Deutscher Boxer",
      text: [
        "The Boxer is a German working and companion dog of medium size, with a square build, strong bone and well developed muscles. Its standards describe a short, glossy, smooth coat in fawn or brindle with a black mask; white markings are allowed but should not cover more than a third of the coat. The muzzle should be broad and deep, never short, with wide nostrils. The tail was once customarily docked; the standard also describes the undocked tail, and PetPrep always shows the dog with natural ears and tail.",
        "Its standard calls it equable, biddable, fearless and self-assured. The Royal Kennel Club calls it much loved as a family companion and recommends more than two hours of exercise a day and grooming once a week. The PDSA describes a very high-energy, playful dog that loves human company and can develop separation anxiety if left alone, has a very high prey drive and — because of its size and boisterous nature — is not recommended for homes with younger children or for first-time owners; some Boxers with shorter faces can have serious breathing problems. The Royal Kennel Club gives its lifespan as over 10 years.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Mini Schnauzer",
      text: [
        "The Miniature Schnauzer is a small German companion dog: strong, stocky and nearly square, with a harsh, wiry, dense coat, bushy eyebrows and a beard. Its FCI standard allows pepper and salt, black and silver, pure black and pure white; PetPrep shows the first three. The tail was once customarily docked and the ears sometimes cropped; the FCI standard asks for a natural tail and drop ears, and PetPrep always shows the dog with natural ears and tail.",
        "The FCI lists it as a house and companion dog, and The Royal Kennel Club says it is hugely popular as a companion. The Royal Kennel Club recommends up to an hour of exercise a day and grooming more than once a week and says it does not shed. The PDSA describes a playful, inquisitive dog that can get on well with children if introduced to them at an early age, can be stubborn in training, and needs grooming two to three times a week plus clipping or stripping by a professional groomer from time to time. The Royal Kennel Club gives its lifespan as over 10 years.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "The Shih Tzu is a small companion dog from Tibet; Great Britain looks after its FCI standard. The standards describe a sturdy, abundantly coated dog with a proud carriage and a \"chrysanthemum-like\" face: a long, dense outer coat, large dark round eyes, large drooping ears and a heavily plumed tail carried over the back. The standards allow many colours; PetPrep shows gold and white, black and white, and liver and white, and never merle. The muzzle is short and flat, and the PDSA names breathing problems caused by the shorter face, so PetPrep always draws a moderate face with open nostrils.",
        "The FCI describes it as intelligent, active and alert, friendly and independent. The Royal Kennel Club recommends up to an hour of exercise a day and grooming every day, and lists a flat as a suitable home. The PDSA says Shih Tzus can be good-natured family pets if they have had the right socialisation and training, calls them an ideal pet for first-time owners, advises always supervising them with children, and recommends a daily brush plus a clip by a professional groomer every six to eight weeks for most pet dogs. The Royal Kennel Club gives its lifespan as over 10 years.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deutsche Dogge",
      text: [
        "The Great Dane is a German giant: the FCI standard says it combines a large, powerful, well-constructed body with pride, strength and elegance, with a long, narrow head, ears that hang naturally and a very short, smooth, glossy coat. The standards list fawn and brindle — ideally with a black mask — as well as harlequin, black and blue; PetPrep shows only colours both the FCI and The Royal Kennel Club list, never merle or mantle, and always draws the dog with natural ears and tail and tight eyelids, because The Royal Kennel Club asks judges to watch for eyelids that turn inwards or outwards and for poor hind legs.",
        "The FCI calls it friendly, loving and devoted to its owners, though it might be reserved towards strangers. The Royal Kennel Club says that despite its size it makes a wonderful family dog, and recommends more than two hours of exercise a day, a large house and garden, and grooming once a week. The PDSA says Great Danes are known for drooling, have a fairly strong prey drive, and are not recommended for homes with younger children because of their size and strength; it advises leaving a gap between eating and exercise to help prevent bloat. The Royal Kennel Club gives its lifespan as under 10 years.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Pom, German Toy Spitz, Zwergspitz",
      text: [
        "The Pomeranian is the smallest spitz: the FCI keeps it as the toy variety of the German Spitz, 21 cm ± 3 cm at the withers, and The Royal Kennel Club's standard describes a compact, short-coupled little dog with a fox-like head, small erect ears and a tail turned over the back. Its double coat has a soft, fluffy undercoat and a long, straight outer coat that forms a frill round the neck. The standard allows many whole colours, such as orange, cream, white, black and brown, but never merle; PetPrep draws a natural, untrimmed coat.",
        "The FCI calls its character companionable and cheerful, and The Royal Kennel Club's standard calls it extrovert, lively and intelligent. The Royal Kennel Club recommends up to 30 minutes of exercise a day and suits it to a flat or apartment; the PDSA says its double coat needs brushing two to three times a week. The AKC says Pomeranians tend to be a better fit for families with older children, can get along well with other animals if socialised early, and highly recommends early socialisation and puppy classes. The Royal Kennel Club gives its lifespan as over 12 years.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "The Boston Terrier comes from the United States. The FCI standard describes a lively, highly intelligent, smooth-coated, short-headed, compactly built, short-tailed and well-balanced dog, brindle, seal or black and evenly marked with white: a white muzzle band, a white blaze between the eyes and a white forechest are required, and brindle is preferred. PetPrep draws it in brindle and white, with a moderate muzzle, open nostrils and natural ears and tail.",
        "It is a flat-faced (brachycephalic) breed, and the PDSA warns that it should never be exercised in the heat of the day because it is prone to overheating. The Royal Kennel Club recommends up to an hour of exercise a day and grooming once a week, suits it to a flat or apartment and gives its lifespan as over 10 years. The PDSA calls Boston Terriers perfect family pets that are especially good with children when well socialised as puppies; the AKC says they do well with children who know how to be gentle with animals, do not fare well when left alone for long periods, and strongly recommends early socialisation and puppy training.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "The Miniature American Shepherd comes from the United States. The FCI standard describes a small herding dog with strong herding and guardian instincts, intelligent and primarily a working dog, slightly longer than tall, with a medium-length, straight to wavy, weather-resistant coat. Its colours are black, blue merle, red and red merle, with or without white and tan markings, and its eyes may be brown, blue, hazel or amber. PetPrep draws it in blue merle with a natural tail.",
        "PetMD says it has a lot of energy and needs at least one hour of exercise every day, ideally two, along with jobs that keep its mind busy, and that it should be brushed a couple of times a week; the AKC says weekly brushing is enough for most of the year, with daily brushing in the shedding season. The AKC says it can make a great family dog with obedience training and early socialisation, and tends to be good with children but may try to herd them; PetMD adds that its devotion to its family can lead to separation anxiety when it is left alone. PetMD gives its lifespan as 12 to 13 years.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Smooth Coat Chihuahua",
      text: [
        "The Chihuahua comes from Mexico. The Kennel Club standard describes a small, dainty, compact dog with a saucy expression and a gay, spirited and intelligent temperament, a well-rounded \"apple dome\" skull, a moderately short, slightly pointed muzzle, large round eyes that do not protrude, large ears and a sickle tail; any colour or mixture of colours is allowed, but never merle, and the preferred weight is 1.8–2.7 kg. The Royal Kennel Club lists the smooth-coated and the long-coated Chihuahua as two breeds; PetPrep draws the smooth coat in fawn, with a moderate head.",
        "The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming once a week, suits it to a flat or apartment and gives its lifespan as over 12 years. The PDSA says Chihuahuas are so small and light that children are tempted to pick them up, which they are unlikely to enjoy, so they are better suited to families with slightly older children. The PDSA adds that, as companion dogs, they love company and need someone around the home all the time, and that they should be socialised from a young age with lots of different people, experiences and places.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer Spaniel, Springer, ESS",
      text: [
        "The English Springer Spaniel comes from Great Britain, where it was bred to find, flush and retrieve game. The Kennel Club standard describes a symmetrically built, compact, strong, merry and active dog — the highest on the leg of the British land spaniels — with a friendly, happy, biddable temperament, long feathered ears, dark hazel eyes and a close, straight, weather-resisting coat; the colours are liver and white or black and white, either with tan markings, and the approximate height is 51 cm. PetPrep draws it liver and white, with a natural tail.",
        "The Royal Kennel Club recommends more than 2 hours of exercise a day and grooming more than once a week, and gives its lifespan as over 10 years. The PDSA says Springers make good family dogs that get along well with children and other household pets, are obedient and keen to learn, and need grooming once or twice a week plus clipping every 3 months. The AKC adds that they should not be left alone for long periods and that early socialisation and puppy training courses are key.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Collie (former name)",
      text: [
        "The Shetland Sheepdog comes from Great Britain and is a small, long-haired working dog. The FCI standard describes an alert, gentle, intelligent, strong and active dog, affectionate and loyal to its owner and reserved towards strangers, with a head like a long, blunt wedge, small ears carried semi-erect with the tips falling forward and a double coat with a long, harsh outer coat; the colours are sable, tricolour, blue merle, black and white, and black and tan, and the ideal height is 37 cm for males and 35.5 cm for females. PetPrep draws it sable and white.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming every day, and gives its lifespan as over 10 years. The PDSA says Shelties are very gentle, playful, obedient dogs that often fit well into family life and get along happily with children, and that training and socialisation are very important at a young age. The AKC adds that they need regular mental and physical exercise, would fare best with older children because of their herding instincts, and are known to be very vocal.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Brittany Spaniel, Epagneul Breton",
      text: [
        "The Brittany is a pointing dog from France, where it is called the Epagneul Breton. The Royal Kennel Club describes a very energetic, intelligent dog that hunts, points and retrieves, gentle and affectionate yet full of life and exuberance, with a dense, fairly fine coat, high-set triangular ears and a tail that is often naturally short; the standard colours are orange, liver or black with white, roan or tricolour, and the height is 48–51 cm for dogs and 47–50 cm for bitches. PetPrep draws it orange and white.",
        "The Royal Kennel Club recommends more than 2 hours of exercise a day and grooming more than once a week, and gives its lifespan as over 10 years. The AKC says Brittanys are high-energy dogs that need plenty of exercise and mental stimulation, are gentle and tend to be patient with children, and that weekly brushing keeps them looking their best. PetMD adds that early socialisation of puppies is a must, that they don't do well when left alone for long periods and that, bred to hunt birds, they have a high prey drive.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (USA), American Cocker",
      text: [
        "The American Cocker Spaniel — in the United States simply the Cocker Spaniel — is a different breed from the English Cocker Spaniel. The AKC standard calls it the smallest member of the Sporting Group, with long, lobular, well-feathered ears, a rounded skull and a broad, deep muzzle, and a silky coat that is flat or slightly wavy; it comes in black, in any solid colour from lightest cream to darkest red, and in parti-colours with white. The standard asks for an equable temperament with no suggestion of timidity.",
        "The Royal Kennel Club recommends grooming every day and more than 2 hours of exercise a day, and gives its lifespan as over 10 years; the AKC and PetMD write that it does not need a lot of exercise. PetMD calls these sweet-tempered dogs great family dogs, friendly with people and other animals, and advises starting socialisation and training early; VCA writes that they are usually very good with children, tend to become overweight and need their ears checked every week.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, Belgian Shepherd Dog (Malinois)",
      text: [
        "The Belgian Malinois is the short-haired variety of the Belgian Shepherd Dog, a herding breed from Belgium. The FCI standard describes a harmoniously proportioned dog combining elegance and power, and allows only one colour: fawn with black overlay and a black mask. The FCI and AKC standards describe rather small, erect, triangular ears, a short, hard coat with a dense undercoat and an alert, intelligent, inquisitive and confident temperament.",
        "The Royal Kennel Club recommends more than 2 hours of exercise a day and grooming more than once a week, and gives its lifespan as over 10 years. The AKC writes that it is not a good choice for first-time dog owners, fares best with older, responsible children and should not be left alone for long; PetMD notes a high prey drive, that it may try to herd children, and that it needs constant daily training and early socialisation.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "The Basset Hound is a short-legged scent hound from Great Britain. The FCI standard describes a hound of considerable substance, well balanced, placid, never aggressive or timid, and affectionate, with low-set, long, velvety ears, a smooth, short coat and the colours black, white and tan or lemon and white. The Royal Kennel Club's Breed Watch asks show judges to watch for eyelids that turn in or out, very long ears, sore skin folds and excess skin.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming once a week, and gives its lifespan as over 10 years. PDSA describes a tolerant dog that gets along with children very well and loves company, with a healthy appetite that needs watching; it advises checking the skin folds every day and leaving a gap between eating and exercise. The AKC adds that its nose can lead it astray, so secure leads and fenced areas matter.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Magyar Vizsla, Hungarian Pointer",
      text: [
        "The Hungarian Vizsla is a medium-sized, elegant gun dog from Hungary with a short russet gold coat. The FCI standard describes a lively, friendly, evenly tempered dog that is easy to train and keeps close contact with its handler; its colours are shades of russet gold and dark sandy gold. The Royal Kennel Club's Breed Watch lists no points of concern specific to the breed.",
        "The Royal Kennel Club recommends more than two hours of exercise a day and grooming once a week, and gives its lifespan as over 12 years. PDSA describes a very people-oriented dog that loves company and can suffer from separation anxiety when left alone; it gets on well with older children, but PDSA would not recommend it with very young children or for first-time owners, and because of its high prey drive it advises against keeping it with smaller pets. PDSA also advises leaving a gap between eating and exercise.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker Spaniel (UK), English Cocker, Merry Cocker",
      text: [
        "The English Cocker Spaniel — in Britain simply the Cocker Spaniel — is a different breed from the American Cocker Spaniel. The FCI standard describes a merry, sturdy, sporting dog, well balanced and compact, with low-set lobular ears and a flat, silky coat; the AKC standard calls it merry and affectionate, of equable disposition, and lists solid black, liver and shades of red as well as parti-colours with white. The Royal Kennel Club's Breed Watch lists no points of concern specific to the breed.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming every day, and gives its lifespan as over 10 years; a VetCompass study of UK English Cocker Spaniels found a median age at death of 11.44 years. PDSA says that thanks to its patient personality it tends to get along well with children, always under supervision, but warns that it is known for separation anxiety and should never be left alone for more than four hours. PDSA also advises a daily brush and leaving a gap between eating and exercise.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, Maltese Terrier",
      text: [
        "The Maltese is a toy dog from the central Mediterranean, today under Italian patronage at the FCI. The FCI standard describes a small dog with a longish body, lively, affectionate, very calm and very intelligent, weighing 3–4 kg, with very long, dense, silky hair that falls heavily over the whole body. The coat has no undercoat, and pure white is the only colour (a pale ivory tinge is permitted). The Royal Kennel Club's Breed Watch lists no points of concern specific to the breed.",
        "The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming every day, says the breed does not shed and gives its lifespan as over 12 years. PDSA describes a bright, friendly and affectionate dog that can be reserved with strangers but, with the right socialisation when young, can learn to be confident and sociable. PetMD warns that it can develop separation anxiety when left alone for too long, says interactions with young children must be supervised and advises brushing its teeth every day.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Carlin, Pug dog",
      text: [
        "The Pug is a small companion dog from China, today under British patronage at the FCI. The FCI standard describes a decidedly square and cobby dog — \"multum in parvo\" — with great charm, dignity and intelligence and an even-tempered, happy and lively disposition, an ideal weight of 6.3–8.1 kg, a fine, smooth, short and glossy coat in silver, apricot, fawn or black, and a tail tightly curled over the hip. It asks for fairly large, well-opened nostrils and finds pinched nostrils and a heavy over-nose wrinkle unacceptable. The Royal Kennel Club places the breed in Breed Watch Category 3, with points of concern that include breathing difficulty, protruding eyes, skin-fold dermatitis and being too fat.",
        "PDSA calls the Pug a severely brachycephalic (flat-faced) breed that can easily become out of breath, advises avoiding exercise in the heat and says its vets would strongly recommend a breed with a normal snout or a Pug cross-breed instead. The Royal Kennel Club recommends up to 1 hour of exercise a day and grooming once a week, says the breed sheds and gives its lifespan as over 10 years. PDSA describes a dog that often gets on well with children and other pets but adores company and does not do well if left alone; PetMD advises cleaning and drying the facial skin folds every day and notes that obesity is common in the breed.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Collie (Rough), Long-haired Collie",
      text: [
        "The Rough Collie is a large pastoral dog from Great Britain. The FCI standard describes a dog of great beauty, standing with impassive dignity, with a friendly disposition and no trace of nervousness or aggressiveness, a very dense coat with a straight, harsh outer coat, and three colours: sable, tricolour and blue merle. The Royal Kennel Club standard calls it a great companion dog, friendly, happy and active, good with children and other dogs, and puts the height at 56–61 cm for dogs and 51–56 cm for bitches. The Royal Kennel Club places the breed in Breed Watch Category 2 and does not register puppies from merle-to-merle matings.",
        "The Royal Kennel Club recommends up to 1 hour of exercise a day and grooming every day, says the breed sheds and gives its lifespan as over 12 years. PetMD says Collies are affectionate, especially with children, and good with other animals, but do not do well by themselves for long periods of time and may nip at ankles and heels when excited. It also notes that puppy socialization is crucial and that the MDR1 mutation, which affects how a dog processes certain drugs, occurs in Collies.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "English Mastiff, Old English Mastiff",
      text: [
        "The Mastiff is a very large guarding breed from Great Britain. The FCI standard describes a combination of grandeur and courage — calm, affectionate to its owners but capable of guarding — with a square-looking head, a broad, deep and powerful body and a short, close-lying coat in apricot, fawn or brindle. PDSA gives an average height of 71–78 cm and an average weight of 80–85 kg and notes that The Kennel Club classes the Mastiff in Category Three: breeds with visible conformational issues that can cause pain, discomfort or health problems.",
        "PDSA recommends around an hour of exercise a day for adult dogs — but no over-exercising while a puppy's bones and joints are still developing — grooming once a week with daily cleaning of the facial wrinkles, and gives an average lifespan of under 10 years. PetMD calls Mastiffs great family dogs for homes with children who understand how to interact with pets, though perhaps not with toddlers or babies because of their size; they tend to do well with other pets introduced during puppyhood, drool a lot, and should not exercise for an hour before and after meals because of the risk of bloat.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Japanese Shiba Inu, Shiba",
      text: [
        "The Shiba Inu is a small spitz from Japan; its name means “small dog”, and according to The Royal Kennel Club it was developed to hunt small game birds. The FCI standard describes a small, well-balanced and well-boned dog with a faithful temperament, keen senses and high alertness, a harsh outer coat over a soft, dense undercoat, small pricked triangular ears and a thick curled tail; the colours are red, black and tan, and sesame, always with whitish “urajiro” markings on the cheeks, chest and underside. The AKC standard gives an average weight of about 23 pounds (10 kg) for males and 17 pounds (8 kg) for females.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming once a week, notes that the breed sheds, and gives its lifespan as over 10 years; a large UK study found a median lifespan of 14.6 years. The AKC describes a confident, independent dog that is a better pick for an experienced owner, is happiest with older children and should never be let off the lead outside a fenced or enclosed area. PetMD adds that it needs lots of mental stimulation, benefits from socialisation as a puppy and should have its teeth brushed every day.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, African Lion Dog",
      text: [
        "The Rhodesian Ridgeback comes from southern Africa. Its best-known feature is the ridge on its back, a strip of hair that grows in the opposite direction to the rest of the coat. The FCI standard describes a well-balanced, strong, muscular, agile and active dog that is dignified, intelligent and aloof with strangers, especially prized as a watchdog and family pet. The short, dense coat is light wheaten to red wheaten, and the standard gives a weight of about 36.5 kg for males and 32 kg for females.",
        "The Royal Kennel Club recommends more than two hours of exercise a day and grooming once a week, notes that the breed sheds and suits a large house with a large garden, and gives its lifespan as over 10 years. The PDSA describes playful, powerful and very loyal dogs with a very high prey drive that are not recommended for first-time owners, should never be left alone for more than four hours and need socialising from a young age; it also advises a gap between eating and exercise. Woodgreen adds that they do best with older children.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Continental Toy Spaniel, Phalène (drop-eared variety), Butterfly Dog",
      text: [
        "The Papillon is the erect-eared variety of the Continental Toy Spaniel, a breed from Belgium and France; the drop-eared variety is called the Phalène. The FCI standard describes a small, elegant toy spaniel with long hair and a lively personality, about 28 cm tall and weighing up to 4.5 kg for males and 5 kg for females. Its large ears are carried like the spread wings of a butterfly, and the coat is always white with patches of colour.",
        "The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming more than once a week, notes that the breed sheds and can live in a flat, and gives its lifespan as over 12 years. The PDSA describes gentle, playful, very obedient dogs that get along well with everyone and need training and socialisation at a young age; it suggests grooming two to three times a week. PetMD adds that Papillons need daily mental stimulation, may develop separation anxiety and should have their teeth brushed every day, and that very young children can accidentally injure such a small dog.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Algarvian Water Dog",
      text: [
        "The Portuguese Water Dog comes from Portugal, where it worked with fishermen. The Royal Kennel Club standard describes a robust, almost square, very strongly muscled dog — very intelligent and tremendously energetic, with great swimming and diving skills — standing 50–57 cm (males) and 43–52 cm (females) and weighing 19–25 kg (males) and 16–22 kg (females). Its profuse single coat has no undercoat and comes in black, white, brown, or black or brown with white; the traditional lion clip leaves the muzzle and hindquarters short.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming every day, notes that the breed does not shed and suits a large house, and gives its lifespan as over 10 years. The PDSA describes very friendly, loving dogs that get on well with other pets, make excellent family pets and need training and socialisation at a young age; it adds clipping and shaping by a professional groomer during the year.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frisé, Bichon Tenerife",
      text: [
        "The Bichon Frise is a Franco-Belgian companion dog. The FCI standard describes a cheerful little dog with a lively gait and very loose, white corkscrew-curled hair — a true companion that can be taken anywhere, neither nervous nor a frequent barker — standing 25–29 cm at the withers and weighing about 5 kg. An adult is always pure white, with very dark round eyes, a black nose, drooping ears and a plumed tail carried over the back.",
        "The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming every day, notes that the breed does not shed and suits a flat, and gives its lifespan as over 12 years. The PDSA describes very affectionate, loving dogs that are excellent with children and other pets, and adds that the coat needs trimming every couple of months, often by a professional groomer.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfie, Newf",
      text: [
        "The Newfoundland comes from Canada; the FCI lists it among the mountain-type molossoid dogs and recognises three colours: black, white and black (Landseer) and brown. The PDSA calls Newfies gentle giants and gives an average height of 66–71 cm and an average weight of 50–69 kg; PetMD adds that the breed's history makes them natural swimmers.",
        "The PDSA recommends at least an hour of exercise a day for adults, but not over-exercising puppies while their bones and joints are still developing; it calls grooming a daily task, notes that Newfies tend to drool and gives the lifespan as under 10 years. PetMD calls the breed an outstanding family pet that gets along well with children, small pets and other dogs, advises supervising small children with any dog, and warns that some may develop separation anxiety when left alone.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Carriage Dog, Spotted Coach Dog, Firehouse Dog",
      text: [
        "The Dalmatian comes from Croatia; the FCI lists it among the breeds related to scent hounds. Its short, shiny coat is pure white with clearly defined black or liver (brown) spots, and the standard asks for spotted ears. The FCI gives a height of 56–62 cm for males and 54–60 cm for females; the PDSA gives an average weight of 18–27 kg.",
        "The Royal Kennel Club recommends more than two hours of exercise a day and brushing once a week, and says the breed sheds and suits a large house and garden. The PDSA calls Dalmatians great pets for active households that are better suited to older children, need company and should never be left alone for more than four hours; it lists deafness among the breed's health problems and notes that a BAER hearing test exists.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "The Australian Cattle Dog comes from Australia; the FCI lists it among the cattle dogs. The Kennel Club standard describes a strong, compact working dog with a smooth, weather-resistant double coat in blue (mottled or speckled) or an even red speckle, and gives a height of 46–51 cm for males and 43–48 cm for females; the PDSA gives an average weight of 16–20 kg.",
        "The Royal Kennel Club recommends more than two hours of exercise a day and brushing once a week, and says the breed sheds. The PDSA describes a highly intelligent, high-energy dog that needs a lot of physical and mental activity; because of its strong herding instinct it may nip at the heels of running children, and socialisation and training at a young age help.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "The Whippet comes from Great Britain; the FCI lists it among the short-haired sighthounds. The Kennel Club standard describes a balanced combination of muscular power and strength with elegance and grace of outline, a fine, short, close coat in any colour or mixture of colours except merle, and a gentle, affectionate, even disposition; it gives a height of 47–51 cm for males and 44–47 cm for females, and the PDSA gives an average weight of 11–18 kg.",
        "The PDSA recommends at least an hour of exercise every day, with chances to run off-lead in a secure area, and a weekly brush with a soft brush. It calls Whippets a popular choice for families because they are calm and gentle around children, but recommends a home with slightly older children; Whippets dislike being left alone and have a really high prey drive, so the PDSA does not recommend keeping them with smaller pets. A coat may help in winter, and thick, soft bedding protects their prominent bones.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Korthals Griffon, Wire-haired Pointing Griffon Korthals, Griff",
      text: [
        "The Wirehaired Pointing Griffon, also called the Korthals Griffon, comes from France; the FCI lists it among the continental pointing dogs and calls it essentially a versatile pointing dog. The FCI standard describes a vigorous, rustic dog that is longer than tall, with a harsh, coarse coat that is never curly or woolly, a nose that is always brown, and preferably a steel grey coat with brown (liver) patches; it gives a height of about 55–60 cm for males and 50–55 cm for females and calls the breed gentle, proud and very gentle with children. PetMD gives a weight of 35–70 pounds (about 16–32 kg).",
        "The Royal Kennel Club recommends more than two hours of exercise a day, a large house and a large garden, and grooming more than once a week. PetMD advises weekly brushing (some dogs also need hand stripping), says Griffs are generally patient and gentle with children when socialised as puppies, and notes that their hunting history can give them a strong prey drive, so smaller animals such as cats and rabbits may look like something to chase.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Retriever (Chesapeake Bay)",
      text: [
        "The Chesapeake Bay Retriever, often called the Chessie, comes from the United States; the FCI lists it among the retrievers. The FCI standard describes a working retriever that is equally proficient on land and in the water, whose size and substance should not be excessive, with a thick, short coat over a dense, woolly undercoat and clear yellowish or amber eyes; any colour of brown, sedge or deadgrass is acceptable, and a black coat disqualifies. It gives a height of 58–66 cm and a weight of 29.5–36.5 kg for males, and 53–61 cm and 25–32 kg for females.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, a large house and a large garden, and grooming once a week. PetMD describes a bright, cheerful and extremely affectionate dog that can become destructive if it is not stimulated or is left alone for too long, says that with proper introductions and socialisation Chessies make a great addition to a family, and advises not to let the dog exercise directly before or after eating.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Sammy, Samoyede",
      text: [
        "The Samoyed comes from northern Russia and Siberia; the FCI lists it among the Nordic sledge dogs. The FCI standard describes a white, elegant Arctic spitz of medium size with an abundant, thick, dense polar coat, dark brown eyes, small, thick, erect ears and lips slightly upturned at the corners in the characteristic \"Samoyed smile\"; the coat is pure white, cream or white and biscuit, and blue or odd-coloured eyes disqualify. It gives an ideal height of 57 cm for males and 53 cm for females, each with a tolerance of 3 cm.",
        "The PDSA recommends a minimum of two hours of exercise every day and grooming on a daily basis, says Samoyeds shed very often, are usually great with children and loyal to the whole family, should never be left alone for more than four hours, need a very secure garden as accomplished escape artists and have a strong prey drive, and advises leaving a gap after eating and before exercising. PetMD adds that Samoyeds do not do well in hot temperatures.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Aberdeen Terrier",
      text: [
        "The Scottish Terrier, often called the Scottie, comes from Great Britain; the FCI lists it among the small-sized terriers. The Kennel Club standard describes a thick-set, short-legged dog, alert in carriage and suggestive of great power and activity in small compass, loyal and faithful, dignified, independent and reserved, but courageous and highly intelligent — bold, but never aggressive. Its close-lying double coat has a harsh, wiry outer coat; the colour is black, wheaten or brindle of any shade. It gives a height of 25–28 cm and a weight of 8.5–10.5 kg.",
        "The PDSA says Scotties need around an hour of exercise daily and daily grooming, with stripping and clipping by a professional groomer every two to three months, describes them as loyal and devoted to their family, and says they can be stubborn, so training needs patience and commitment. PetMD says that with the right training and socialisation they can be good dogs for families, that socialising the puppy is important, and that they should not be left alone for extended periods.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner Pointer, Weim",
      text: [
        "The Weimaraner comes from Germany; the FCI lists it among the continental pointing dogs and recognises a short-haired and a long-haired variety. The FCI standard describes a medium to large hunting dog of functional working type, sinewy and very muscular, with amber eyes and broad, fairly long ears; the coat is silver, roe or mouse grey, only small white markings on the chest and toes are permitted, and any colour other than grey disqualifies. It gives a height of 59–70 cm and a weight of about 30–40 kg for males, and 57–65 cm and about 25–35 kg for females.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, a large house and a large garden, and grooming once a week. The PDSA says Weimaraners make wonderful family pets in the right hands and do best with owners familiar with the breed, but does not recommend them for homes with smaller children or smaller pets because of their very strong prey drive, says they can develop separation anxiety if left alone, and advises socialising them from a young age and leaving a gap between eating and exercising. PetMD adds monthly ear cleaning and a monthly bath.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Italian Sighthound, Piccolo Levriero Italiano, Iggy",
      text: [
        "The Italian Greyhound comes from Italy; the FCI lists it as the Piccolo Levriero Italiano among the short-haired sighthounds. The Kennel Club standard describes a Greyhound in miniature, more slender in all proportions, elegant, graceful and quick-moving, intelligent, affectionate and vivacious though it may appear aloof, with a short, fine, glossy coat over fine skin. It gives a height of 32–38 cm and a weight of 3.6–4.5 kg; black, blue, cream, fawn, red and white, or any of these broken with white, are accepted — never merle, brindle or tan markings.",
        "The Royal Kennel Club recommends up to an hour of exercise a day, says the breed suits a small house and either town or country, needs grooming once a week and does not shed. The PDSA says Italian Greyhounds are full of energy, should exercise in a confined area because they can be hard to call back once they see prey, can be timid so early socialisation is essential, and — because their bones are fragile while they grow — may not be the ideal breed for homes with young children or other pets. PetMD adds that their thin coat does not keep them warm, so they feel the cold easily.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer, Munich Schnauzer",
      text: [
        "The Giant Schnauzer comes from Germany; the FCI lists it as the Riesenschnauzer among the pinscher and schnauzer types. The Royal Kennel Club standard describes a powerfully built, robust, sinewy dog that appears almost square, bold, reliable, good natured and composed, with a harsh, wiry top coat and a good undercoat. It gives a height of 65–70 cm for dogs and 60–65 cm for bitches; the FCI standard gives a weight of 35–47 kg. Pure black, pepper and salt with a dark facial mask, and black and silver are accepted — any other colour is not.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, says the breed suits a large house with a large garden, needs grooming every day and does not shed. The PDSA says the coat needs daily grooming and regular trimming, that Giant Schnauzers can be lovable pets for families with older children if they are well socialised as puppies, and that these strong-minded dogs suit experienced owners. PetMD adds that the coat is professionally hand-stripped every few months and that the breed does not do well in homes where people are not home much.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "St. Hubert Hound, Chien de Saint-Hubert, Sleuth Hound",
      text: [
        "The Bloodhound comes from Belgium, where the FCI lists it as the Chien de Saint-Hubert, a large scent hound. The FCI standard describes the most powerful of all the scent hounds: gentle, placid, kind and sociable with people and particularly attached to its owner, with a short, dense, weatherproof coat and supple, loose skin. Males are about 46–54 kg and females about 40–48 kg; the three colours are black and tan, liver and tan, and red.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, says the breed suits a large house with a large garden, needs grooming once a week and sheds. The PDSA says Bloodhounds are better suited to experienced owners, are not recommended for homes with smaller children or smaller pets because of their size and very high prey drive, drool, and need their skin folds kept clean and dry. It also advises leaving a gap between eating and exercising.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "American Akita, Great Japanese Dog",
      text: [
        "The Akita in this register is the American type: the FCI lists it as the American Akita, a breed of Japanese origin, separate from the Japanese Akita Inu. The FCI standard describes a large, sturdily built, well-balanced dog with much substance and heavy bone, small erect ears and a large tail carried over the back; males stand 66–71 cm at the withers. Any colour is allowed, such as red, fawn, white, pinto or brindle. The PDSA gives an average weight of 31–59 kg.",
        "The PDSA describes incredibly loyal family pets that are independent and very large, so they do best with experienced owners; it would not recommend an Akita for a home with young children and advises against leaving them alone, as many do not cope well with it. It recommends at least two hours of exercise every day, socialisation from a young age, a gap between eating and exercising, and at least a weekly brush — Akitas shed a lot. It also notes a high prey drive and that they can overheat in very hot weather.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Welsh Corgi (Cardigan), Cardi",
      text: [
        "The Cardigan Welsh Corgi comes from Great Britain; the FCI lists it among the cattle dogs. The American Kennel Club standard gives a height of 10.5–12.5 inches (about 27–32 cm) at the withers and an ideal weight of 30–38 pounds (about 14–17 kg) for dogs. Unlike its cousin the Pembroke, it has a long, full tail.",
        "The Royal Kennel Club recommends up to an hour of exercise a day, lists a small house with a small or medium garden as enough, and says the breed needs grooming more than once a week and sheds; it gives a lifespan of over 12 years and lists the Cardigan as a vulnerable native breed. The PDSA says Welsh Corgis are willing to please, so training should be fairly easy, that two to three brushes a week are usually enough, and that they may nip at the heels of running children — socialisation with children and training at a young age help.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, GWP",
      text: [
        "The German Wirehaired Pointer comes from Germany; the FCI lists it as the Deutsch Drahthaar among the continental pointing dogs. The Royal Kennel Club standard describes a medium-sized hunting dog with wire hair completely covering the skin — gentle, affectionate and even tempered, alert, biddable and very loyal. Dogs stand 60–67 cm and weigh 25–34 kg; bitches stand 56–62 cm and weigh 20.5–29 kg. Liver and white, solid liver and black and white are the standard colours.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, says it suits a large house with a large garden in the country, needs grooming more than once a week and sheds. PetMD says GWPs need lots of exercise and mental stimulation, form a close bond with their family and can make great family dogs when trained and socialised early, do well with children who have been taught how to behave with animals, should never be left alone for long periods, and have a high prey drive. The coat is hand-stripped twice a year.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "St. Bernard, St. Bernhardshund, Bernhardiner",
      text: [
        "The Saint Bernard comes from Switzerland; the FCI lists it as the St. Bernard among the molossoid breeds of the mountain type. The FCI standard describes a dog that is friendly by nature, calm to lively and watchful, and recognises two varieties: short-haired, with a dense, smooth, close-lying coat, and long-haired. Dogs stand at least 70 cm and bitches at least 65 cm, up to 90 and 80 cm; the PDSA gives a weight of 54–81 kg.",
        "The Royal Kennel Club recommends up to an hour of exercise a day, says the breed suits a large house with a large garden, needs grooming more than once a week, sheds and usually lives under ten years. The PDSA says Saint Bernards love being with a family and are great with people of all ages, including children, should be well socialised as puppies, need brushing at least three times a week, drool, do not do as well in the heat, and need a gap between eating and exercising. PetMD adds that these people-oriented dogs can develop separation anxiety if they are left alone for long periods.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "The Staffordshire Bull Terrier comes from Great Britain; the FCI lists it among the bull-type terriers. The FCI standard describes a smooth-coated, well-balanced dog of great strength for its size — traditionally of indomitable courage and tenacity, highly intelligent and affectionate, especially with children. It stands 35.5–40.5 cm; males weigh 12.7–17 kg and females 11–15.4 kg. It comes in brindle, red, fawn, black, blue or white, alone or with white.",
        "The Royal Kennel Club calls it a wonderful family pet and recommends up to an hour of exercise a day; it needs grooming once a week, sheds and usually lives over 12 years. The PDSA says Staffies are tolerant and sweet-natured towards children, but as people-orientated dogs they are known to suffer with separation anxiety when left alone, they are known chewers, and with their very strong prey drive smaller pets are not a good idea around them.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "The Airedale Terrier comes from Great Britain; the FCI lists it among the large and medium-sized terriers. The FCI standard calls it the largest of the terriers — a muscular, active, fairly cobby dog that is outgoing and confident, friendly, courageous and intelligent, alert at all times, not aggressive but fearless. Males stand about 58–61 cm and females about 56–59 cm. Its hard, dense, wiry coat is tan with a black or grizzle saddle.",
        "The Royal Kennel Club recommends up to an hour of exercise a day; the coat needs grooming every day, does not shed and the breed usually lives over 10 years. PetMD describes great family dogs that, if trained well, generally get along with children, but should not be left to their own devices for too long; it advises brushing a few times a week, a quick ear clean every week and a professional groomer three or four times a year.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Russell Terrier (AKC), Jack Russell, JRT",
      text: [
        "The Jack Russell Terrier — the American Kennel Club calls it the Russell Terrier — comes from England and was developed in Australia; the FCI lists it among the small terriers. Its standard describes a strong, active, lithe working terrier of great character: lively, alert and active, bold and fearless, friendly but quietly confident. It stands 25–30 cm and weighs about 5–6 kg. Its smooth, broken or rough coat is mostly white with black and/or tan markings.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming once a week; the breed sheds and usually lives over 10 years. PDSA describes clever, lively dogs that can make good family pets if trained and socialised from a young age, but are better suited to families with slightly older children; they have a very high prey drive, so smaller pets are not recommended, and they love to dig.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "The Bullmastiff is an old English guard breed of the 19th century, descended from the Bulldog and the Old English Mastiff; the FCI lists it among the molossoid breeds. Its standard describes a powerful, symmetrical dog showing great strength but not cumbersome — enduring, active, reliable, high-spirited, alert and faithful. Males stand 64–69 cm and weigh 50–59 kg, females 61–66 cm and 41–50 kg. The short, hard coat is any shade of fawn, red or brindle, always with a black muzzle.",
        "The Royal Kennel Club recommends more than two hours of exercise a day and grooming once a week, and the breed usually lives under 10 years. PDSA describes very loyal dogs whose size and power make them better suited to adult-only homes or families with older children; they need early socialisation, ideally have someone at home all the time, have a very strong prey drive, drool a lot and need a gap between eating and exercise.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested Dog, Powder Puff",
      text: [
        "The Chinese Crested is a small, active and graceful companion dog from China; the FCI lists it among the hairless dogs. It comes in two varieties: the Hairless, with a smooth bare body and hair only on the head (the crest), the feet and the tail, and the Powder Puff, covered entirely with a veil of long soft hair. Males stand 28–33 cm and females 23–30 cm; PetMD gives a weight of 8–12 lb (3.6–5.4 kg). Any colour is allowed except merle, and its temperament is described as happy, never vicious.",
        "The Royal Kennel Club recommends up to 30 minutes of exercise a day and grooming once a week; it suits a flat, and the breed usually lives over 12 years. PetMD describes a friendly dog that fits in with most families, including those with kids and other pets — every interaction with children should be supervised. The bare skin needs protection from the sun and the cold, the nails should be checked every week, and puppies need early, consistent socialisation.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "The Nova Scotia Duck Tolling Retriever — the Toller — is a retriever from Canada; its FCI standard describes how it runs and plays along the shoreline in full view of the ducks to lure them in, and is then sent out to retrieve the birds. The standard describes a medium-sized, powerful, compact and well-muscled dog that is highly intelligent, easy to train and has great endurance. The FCI gives males 48–51 cm and 20–23 kg, females 45–48 cm and 17–20 kg. The water-repellent double coat is various shades of red or orange, usually with white on the tail tip, feet, chest or blaze.",
        "The Royal Kennel Club recommends up to an hour of exercise a day and grooming more than once a week, and the breed sheds; PetMD advises brushing once or twice a week. A large UK study (McMillan 2024, via Dogs Trust) gives a median life expectancy of 13.2 years, PetMD 12–14 years, and like other medium-sized dogs it is fully grown at about 12–15 months (PetMD). The AKC describes highly affectionate dogs that tend to be good with children, need lots of physical exercise and mental stimulation, may have a high prey drive around smaller animals and benefit from early socialisation and puppy classes.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "The Cairn Terrier comes from Great Britain; the FCI lists it among the small-sized terriers. The Kennel Club standard describes an agile, alert terrier of workmanlike, natural appearance — active, game and hardy, with a fearless and gay disposition, assertive but not aggressive. Its weather-resistant double coat has a profuse, harsh outer coat; the colour is cream, wheaten, red, grey or nearly black, brindling is acceptable and dark ears and muzzle are typical. It gives a height of about 28–31 cm and an ideal weight of 6–7.5 kg.",
        "The PDSA recommends at least an hour of exercise a day, says Cairns have boundless energy and a strong hunting instinct, so they need socialising early with cats and other small pets and care off the lead, and that once socialised they get on very well with children and make excellent family pets. It advises hand-stripping the coat twice a year and grooming once or twice a week; Dogs Trust says they shed very little. A large UK study (McMillan 2024, via Dogs Trust) gives a median life expectancy of 14.0 years, PetMD 13–15 years, and like other small dogs it is fully grown at about 9–12 months (PetMD). PetMD adds that they need lots of exercise and mental stimulation.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "English Bull Terrier, Bully",
      text: [
        "The Bull Terrier comes from Great Britain; the FCI lists it among the bull-type terriers (group 3). It is a medium-sized, short-coated terrier: the PDSA gives an average height of 51–61 cm and an average weight of 22–31 kg, and PetMD describes an athletic build of about 21–22 inches and 50–70 pounds. PetMD calls regular exercise a must and says Bull Terriers are affectionate with family, including children, but not always friendly with other dogs or cats, and that early and frequent socialisation and training are key.",
        "The PDSA recommends at least an hour of exercise a day, split across the day, and a gap after meals before exercise. It says a well-socialised Bull Terrier gets along with people of all ages but, being a bit excitable, is better with older children; it likes company as much as possible and has a high prey drive, so care is needed around cats and other small animals. A weekly brush is enough for the coat. The PDSA gives an average lifespan of over 10 years and PetMD 12–13 years; like other medium-sized dogs it is fully grown at about 12–15 months (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Min Pin, Zwergpinscher",
      text: [
        "The Miniature Pinscher comes from Germany; the FCI lists it among the pinschers and schnauzers (group 2) and describes it as a reduced image of the German Pinscher — lively, spirited, self-assured and even-tempered. Its coat is short, dense, smooth and shiny, either self-coloured deer red to dark red-brown or black and tan, and its tail is natural. The FCI standard gives a height of 25–30 cm and a weight of 4–6 kg for dogs and bitches; like other toy dogs it is fully grown at about 8–12 months (PetMD).",
        "The PDSA recommends up to half an hour of exercise a day for these energetic, busy little dogs, says a brush once a week is usually enough for the coat, and notes that they can be stubborn and independent, so training needs practice and patience. PetMD says they can make excellent family pets with the right socialisation and training. VCA describes the breed as playful and very good with children, though very young or unruly children may hurt it with rough play, and says its thin coat and small size make it vulnerable to chilling. The PDSA gives an average lifespan of over 12 years and PetMD 12–16 years.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "The Pyrenean Mountain Dog — called the Great Pyrenees in the United States — comes from France; the FCI lists it among the mountain-type molossoids (group 2) and describes a dog of great size, imposing and strongly built, but not without a certain elegance. Its coat is white, or white with patches of badger, wolf-grey, pale yellow or orange on the head and ears. The FCI standard gives a height of 70–80 cm for dogs and 65–75 cm for bitches; the PDSA gives an average weight of 40–50 kg. Like other giant dogs it is fully grown at about 18–24 months (PetMD).",
        "The Royal Kennel Club recommends up to an hour of exercise a day, says the breed suits a large house with a large garden, needs grooming more than once a week and sheds, and gives a lifespan of under 10 years (PetMD and VCA give 10–12 years). The PDSA calls them gentle giants — calm, good-natured dogs that tend to get on well with everyone — and says training needs patience and reward-based methods. VCA says the Pyr is devoted to its family, especially to children, and that early socialisation is very important; PetMD says it lives well with other pets but may be best in homes without smaller children, and advises avoiding vigorous exercise around mealtimes because of the risk of bloat.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Wheaten Terrier, Wheaten, Irish Soft Coated Wheaten Terrier, SCWT",
      text: [
        "The Soft Coated Wheaten Terrier comes from Ireland; the FCI lists it as the Irish Soft Coated Wheaten Terrier among the large and medium-sized terriers. The Royal Kennel Club standard describes a medium-sized, compact, upstanding terrier with a soft, silky, wheaten-coloured coat that falls in loose curls or waves — good tempered, spirited and game, full of confidence and humour. The only colour is a good clear wheaten. The PDSA gives an average height of 46–49 cm and an average weight of 16–20.5 kg (the Kennel Club standard gives dogs 16–20.5 kg, bitches somewhat less); like other medium-sized dogs it is fully grown at about 12–15 months (PetMD).",
        "The Royal Kennel Club recommends up to an hour of exercise a day, says the breed suits a small house, needs grooming every day and does not shed. A large UK study (McMillan 2024, via Dogs Trust) gives a median life expectancy of 13.7 years; PetMD and VCA give 12–14 years. The PDSA calls them friendly, trustworthy dogs that make great family pets, though they can be a little stubborn. VCA says their gentle, playful nature makes them a good match for children; PetMD says interactions with children should be supervised, that they dislike being left alone for long periods, and advises professional grooming every four to six weeks, a bath about monthly and cleaning the ears every one or two weeks.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Wolfhound, Cú Faoil, Irish Wolf Hound",
      text: [
        "The Irish Wolfhound comes from Ireland; the FCI lists it among the rough-haired sighthounds. The PDSA gives an average height of 71–79 cm and an average weight of 40–55 kg; like other giant dogs it is fully grown at about 18–24 months (PetMD). The Royal Kennel Club calls its size extra large and says it suits a large house with a large garden in the country.",
        "The Royal Kennel Club recommends more than two hours of exercise a day, grooming more than once a week, and says the breed sheds. The Kennel Club and the PDSA give a lifespan of under 10 years; PetMD gives 6–8 years. The PDSA does not recommend the breed for homes with smaller children because of its size and strength, nor with smaller pets because of its high prey drive, and says it should never be left alone for more than four hours. PetMD advises socialising the puppy from the day it comes home, no exercise right before or after eating (bloat) and cleaning the ears every two to four weeks.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "AmStaff, Am Staff, Staffordshire Terrier",
      text: [
        "The American Staffordshire Terrier comes from the USA; the FCI lists it among the bull-type terriers. Its standard asks for great strength for its size and gives a height of 46–48 cm for males and 43–46 cm for females, but no weight. PetMD gives 40–70 pounds (about 18–32 kg) for both sexes; a dog of this size is fully grown at about 12–15 months (PetMD).",
        "PetMD recommends at least 60 minutes of exercise a day, says the breed is patient and loving with children, that it can be prone to separation anxiety and that its strong prey drive can make life with smaller dogs or cats more difficult. A UK study (McMillan et al., 2024, as tabled by Dogs Trust) gives a median life expectancy of 12.5 years; PetMD gives 12–16 years. VCA recommends weekly brushing; PetMD advises socialising the puppy, no exercise right after a meal (bloat), and bathing and ear cleaning about every 4–6 weeks.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    british_shorthair: {
      aka: "British Blue",
      text: [
        "The British Shorthair is a sturdy, dense-coated cat with large round eyes — the CFA calls it a \"teddy bear\" cat. Most people picture it blue-grey, but it comes in a number of colours and patterns. It matures slowly: the CFA says it reaches full size at about three years, VCA says physical maturity can take up to five.",
        "The CFA describes it as very affectionate and attached to its people; it gets along with everyone in the household regardless of age, but is usually not fond of being carried, and it has lived with dogs, rabbits and birds. VCA describes a moderate activity level and advises combing the coat at least weekly. Pedigree kittens usually go to their new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "The CFA describes the Ragdoll as a large, laid-back cat with a semi-long, plush and silky coat and blue eyes. Its darker \"points\" come in several patterns — colourpoint with no white, mitted with white feet, bicolour with more white, and van. It is slow to mature: it reaches its full coat colour at two years and its full size and weight at about four.",
        "The CFA describes a gentle cat that greets you at the door and follows you from room to room, and usually plays without putting out its claws. PetMD calls it a good choice for families, including those with children, but advises slow, supervised introductions to children and other pets, and says some Ragdolls need combing only once or twice a week, while the CFA advises regular combing. Pedigree kittens usually go to a new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Siberian Forest Cat",
      text: [
        "The GCCF describes the Siberian as a slow-developing cat with a thick, weatherproof coat: a dense, soft undercoat under a coarser topcoat, shed heavily in spring and autumn. Males weigh about 7.7–11.8 kg and females 5.9–7.7 kg, full development can take four to five years, and the GCCF gives a lifespan of 12 to 15 years or more.",
        "The GCCF calls it energetic and fun-loving yet patient — a good choice for families with young children — and says it mixes well with other animals, including dogs. PetMD advises combing at least once a week, with extra effort while it sheds in spring and autumn, and notes that Siberians are not considered hypoallergenic. Pedigree kittens usually go to their new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine Coon cat",
      text: [
        "The Maine Coon is widely considered one of the largest domestic cat breeds, with a muscular, rectangular body, a broad chest, large paws and a long, flowing tail. TICA gives an average weight of about 5.9–8.2 kg for mature males and 4.1–5.9 kg for females, and CFA notes that some males weigh more than 9 kg. It grows slowly: according to CFA it often does not reach full development until age three or four, and TICA says full maturity may take three to five years.",
        "TICA describes it as gentle, friendly and playful, CFA as sociable, loyal and intelligent; it often talks with a chirping trill rather than a meow. Vetstreet writes that Maine Coons get along with everyone, including children, dogs and other cats. Its heavy, semi-longhaired coat is shorter on the shoulders and longer on the ruff, belly and hindquarters. Sources differ on grooming: Vetstreet says weekly combing is enough, CFA advises brushing or combing at least a couple of times a week, and TICA notes that a thicker coat can need daily combing. Pedigree kittens usually go to their new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Bengal cat",
      text: [
        "PDSA describes the Bengal as highly intelligent and energetic, a cat that needs plenty of mental stimulation and chances to exercise and likes a high vantage point such as a cat tree. It is affectionate, but more likely to curl up next to you than on your lap, and can be quite vocal. VCA notes that Bengals grow slowly and can take up to two years to reach physical maturity.",
        "Its short, soft, spotted or marbled coat needs only a light brushing or combing once a week (PDSA). PetMD notes that the Bengal may not be the best fit for families with small children, while dogs and other cats may be fine with proper introductions. The breed was developed from crosses between the Asian leopard cat and domestic cats; PetPrep shows only the registered domestic Bengal. Pedigree kittens usually go to their new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Wegie, Skogkatt",
      text: [
        "The GCCF describes the Norwegian Forest Cat as gentle and friendly, a cat that enjoys being part of a family. It is slow to mature and is not considered fully grown until about four to five years; males weigh about 5.4–7.3 kg and females 4.1–5.4 kg, and the GCCF gives a lifespan of 14 to 16 years.",
        "It has a lot of energy, enjoys interactive games and climbs readily; the GCCF says it is tolerant of respectful children, other cats and cat-friendly dogs. PetMD advises combing and brushing at least once a week, more often while it sheds in spring and autumn, and notes that separation anxiety can be an issue if it is often left alone for long periods. Pedigree kittens usually go to their new home at 12–13 weeks (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default en;
