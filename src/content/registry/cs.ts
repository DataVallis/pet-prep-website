import type { RegistryCopy } from "./types";

/**
 * Czech plural: 1 → one ("1 plemeno"); exactly 2–4 → few ("3 plemena"); 0, 5+ and also 22, 23 … → many ("5 plemen",
 * "22 let" — with digits Czech uses the genitive plural for compound numbers). Non-integers take `frac`
 * (genitive singular: "2,5 roku", "1,5 hodiny").
 */
function form(n: number, one: string, few: string, many: string, frac: string = few): string {
  if (!Number.isInteger(n)) return frac;
  const a = Math.abs(n);
  if (a === 1) return one;
  if (a >= 2 && a <= 4) return few;
  return many;
}
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = "\u00a0";
/** First letter lower case for values that continue a phrase ("Psi" → "psi", "Do 1 hodiny" → "do 1 hodiny"). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("cs") + t.slice(1);
/**
 * Breed names are common nouns in Czech: lower case inside a sentence ("německý ovčák", "border kolie"). Names that start
 * with a proper name keep the capital ("Jack Russell teriér", "Chesapeake Bay retrívr", "Korthalsův ohař"); later
 * proper-name parts stay as they are ("kavalír King Charles španěl"). Adjectives formed from names are lower case
 * ("bostonský teriér", "mainská mývalí kočka"), so the match must end at a word boundary (not "Bostonský").
 */
const PROPER_START = /^(Jack Russell|Russell|Boston|Chesapeake|Airedale|Cavalier|Korthals|Korthalsův)(?=[\s\u00a0-]|$)/u;
const mid = (name: string) => (PROPER_START.test(name) ? name : lc(name));
/** "Psi" → "psů", "Kočky" → "koček" (genitive plural after "plemena …"); other species: "(ptáci)". */
const gen = (many: string) => {
  const m = lc(many);
  if (m === "psi") return "psů";
  if (m === "kočky") return "koček";
  return `(${m})`;
};
/** "Psi" → "psy", "Kočky" → "kočky" (accusative plural after "pro …"); other species: "(ptáci)". */
const acc = (many: string) => {
  const m = lc(many);
  if (m === "psi") return "psy";
  if (m === "kočky") return "kočky";
  return `(${m})`;
};
/**
 * A formatted duration ("2 roky", "12–18 měsíců", "1 rok") in the genitive, for "do …" / "od …" ("do 2 let",
 * "od 1 roku", "do 12–18 měsíců"). Decimals already take the genitive singular ("2,5 roku").
 */
const GEN: Record<string, string> = {
  rok: "roku", roky: "let", měsíc: "měsíce", měsíce: "měsíců", týden: "týdne", týdny: "týdnů", den: "dne", dny: "dní",
  hodina: "hodiny", hodiny: "hodin", minuta: "minuty", minuty: "minut",
};
const toGen = (t: string) =>
  /\d,\d+\s\S+( denně)?$/.test(t) ? t : t.replace(/(\S+)( denně)?$/, (_m, w: string, d = "") => (GEN[w] ?? w) + d);
/** "z" → "ze" where the spoken number starts with s/z/š/ž or a consonant cluster ("ze 2", "ze 7", "ze 17", "z 82"). */
const zNum = (n: number) => {
  const a = Math.abs(Math.trunc(n));
  const ze = [2, 3, 4, 6, 7, 16, 17].includes(a) || (a >= 60 && a < 80) || (a >= 100 && a < 500) || (a >= 600 && a < 800);
  return ze ? "ze" : "z";
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as ČMKU uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "ovčáčtí a honáčtí psi, kromě švýcarských salašnických psů",
  2: "pinčové a knírači, molosoidní plemena, švýcarští salašničtí a honáčtí psi",
  3: "teriéři",
  4: "jezevčíci",
  5: "špicové a primitivní plemena",
  6: "honiči, barváři a příbuzná plemena",
  7: "ohaři",
  8: "retrívři, slídiči a vodní psi",
  9: "společenská plemena",
  10: "chrti",
};
const origins: Record<string, string> = { GB: "Velká Británie", FR: "Francie", DE: "Německo", US: "USA", CU: "Kuba", CH: "Švýcarsko", IT: "Itálie", "CN-XZ": "Tibet (Čína)", CN: "Čína", MX: "Mexiko", BE: "Belgie", HU: "Maďarsko", JP: "Japonsko", ZA: "Jihoafrická republika", "BE-FR": "Belgie / Francie", PT: "Portugalsko", CA: "Kanada", HR: "Chorvatsko", AU: "Austrálie", RU: "Rusko", IE: "Irsko", "AF-C": "Střední Afrika", TR: "Turecko", MG: "Madagaskar" };
/** "hodina" in the nominative after a number: 1 hodina, 2 hodiny, 5 hodin, 1,5 hodiny. */
const hours = (n: number) => form(n, "hodina", "hodiny", "hodin", "hodiny");
/** "hodina" in the genitive after "do": do 1 hodiny, do 2 hodin, do 5 hodin, do 1,5 hodiny. */
const hoursGen = (n: number) => form(n, "hodiny", "hodin", "hodin", "hodiny");
const steps = (n: number) => form(n, "krok", "kroky", "kroků", "kroku");

const cs: RegistryCopy = {
  mistakes: {
    title: (breed) => `Časté chyby majitelů: ${mid(breed)}`,
    intro: "Drobné zvyky, ze kterých vznikají větší problémy – každý bod vychází ze zdrojů o tomto plemeni.",
    exercise: "Málo pohybu každý den",
    exerciseText: (amount) => `Potřeba pohybu: ${amount}. Naplánujte ho na každý den, nejen na víkendy.`,
    coat: "Zanedbaná péče o srst",
    coatText: (brushing, shedding) => `Kartáčování: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Příliš mnoho pamlsků a příliš velké porce",
    heat: "Procházky v horku",
    growth: "Zapomíná se, že štěně ještě roste",
    growthText: (growthEnd) => `Dospělé velikosti dosahuje ve věku: ${growthEnd}. Do té doby plánujte pohyb i krmení pro rostoucího mazlíčka a zeptejte se veterináře, co je vhodné právě pro vašeho.`,
    mind: "Málo práce pro hlavu",
    health: "Přehlížení známých zdravotních problémů plemene",
    practise: "V PetPrepu si dítě tyto návyky – procházky, krmení, péči – vyzkouší dřív, než se domů nastěhuje skutečný mazlíček.",
  },
  hub: {
    title: "Poznejte mazlíčka dřív, než se k vám nastěhuje.",
    intro:
      "Co který druh a každé plemeno opravdu potřebuje – podle kynologických svazů, felinologických organizací, veterinárních charit a studií, s odkazem na každý zdroj. A k tomu pravidla, podle kterých PetPrep mazlíčka simuluje.",
    breedCount: (n) => `${n}${NB}${form(n, "plemeno", "plemena", "plemen")} v encyklopedii`,
    open: "Zobrazit plemena",
    openA11y: (many) => `Zobrazit plemena ${gen(many)}`,
    freePlan: (name, activity) => `Bezplatný plán: ${lc(name)} (dospělé zvíře: ${activity}). Nemá vlastní stránku v encyklopedii.`,
    otherSpecies: "Další druhy zvířat plánujeme.",
    methodTitle: "Jak tuto encyklopedii tvoříme",
    method: [
      "Každý údaj pochází z konkrétního, jmenovaného zdroje – kynologických svazů, felinologických organizací, veterinárních charit a asociací či recenzovaných studií – a odkazuje na něj. Standardy plemen shrnujeme vlastními slovy.",
      "Hodnoty, které nepotvrzuje žádný zdroj, nikdy neuvádíme jako fakta. Když PetPrep musí pro hru zvolit číslo, objeví se jen v části „Jak to simuluje PetPrep“ a je označené jako pravidlo hry.",
      "Stejná data pohánějí aplikaci: štítky, počty krmení, cíle kroků a herní chvilky na těchto stránkách jsou přesně ty, které platí pro mazlíčka v aplikaci.",
      "Tato encyklopedie není veterinární poradenství. Informace o zdraví slouží jen k orientaci a veterinář je neověřoval.",
    ],
  },
  speciesStatus: { available: "V aplikaci", coming_soon: "Brzy v aplikaci", info_only: "Jen pro informaci" },
  availability: {
    in_app: { label: "V aplikaci", text: "K dispozici ve 12týdenní výzvě PetPrep (placené plemeno)." },
    coming_soon: { label: "Brzy v aplikaci", text: "Plemeno je hotové a otestované; přibude s některou z příštích verzí aplikace." },
    info_only: { label: "Jen pro informaci", text: "Plemeno je v encyklopedii pro informaci; v aplikaci si ho zatím vybrat nemůžete." },
  },
  catalogue: {
    eyebrow: "Encyklopedie zvířat",
    title: (many) => `${many}: plemena v encyklopedii`,
    lead: (many, count) =>
      `${count}${NB}${form(count, "plemeno", "plemena", "plemen")} ${gen(many)} – s potřebami podle zdrojů, s tím, komu se hodí, a s pravidly, podle kterých je PetPrep simuluje. Vyhledávejte, filtrujte a porovnávejte až tři plemena najednou.`,
    metaTitle: (many) => `Plemena ${gen(many)} – encyklopedie se zdroji | PetPrep`,
    metaDescription: (many) =>
      `Vyhledejte a porovnejte plemena ${gen(many)} podle potřeb, velikosti a toho, komu se hodí. Každý fakt má odkaz na zdroj; k tomu pravidla, podle kterých PetPrep každé plemeno simuluje.`,
    searchLabel: "Hledat plemeno",
    searchPlaceholder: "Název, např. labrador",
    filtersTitle: "Filtry",
    any: "Vše",
    availabilityLabel: "V PetPrepu",
    sortLabel: "Řazení",
    sort: { recommended: "Nejdřív v aplikaci", az: "A–Z", size: "Velikost (od nejmenších)" },
    clear: "Zrušit vše",
    results: (total) => `{n} ${zNum(total)}${NB}${total}${NB}${form(total, "plemene", "plemen", "plemen", "plemene")}`,
    none: "Žádné plemeno neodpovídá zadání. Zkuste použít méně filtrů.",
    loading: "Načítá se vyhledávání…",
    page: "Stránka {n} z {total}",
    prev: "Předchozí",
    next: "Další",
    compareAdd: "Porovnat: {name}",
    compareBar: "Vybráno k porovnání: {n} z {max}",
    compareGo: "Porovnat",
    compareMax: "Porovnat můžete nejvýše {max} plemena.",
    azTitle: "Všechna plemena od A do Z",
    azIntro: "Všechna plemena v encyklopedii podle abecedy.",
    freePlanTitle: "Bezplatný plán",
    guideTitle: "Jak vybrat plemeno",
    guide: () => [
      "Začněte tím, co může vaše domácnost nabídnout každý den: čas na pohyb, péči o srst a prostor. Na stránce každého plemene jsou tyto potřeby přehledně shrnuté, u každé hodnoty je uvedený zdroj, a když se zdroje liší, ukazujeme všechny hodnoty.",
      "Má-li plemeno velikostní kategorii (u psů: trpasličí, malý, střední, střední až velký, velký nebo obří), je to kategorie, kterou uvádí jmenovaný zdroj – obvykle kynologický svaz – a hmotnosti jsou rozpětí ze zdrojů, ne naše odhady.",
      "Štítky jako „Hodí se: do aktivní rodiny“ jsou stejné jako v aplikaci a každý z nich je podložený zdroji. Čísla v části „Jak to simuluje PetPrep“ jsou pravidla hry PetPrep, ne návod k péči. [Jak tvoříme encyklopedii](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Porovnání plemen ${gen(many)}`,
    metaTitle: (many) => `Porovnání plemen ${gen(many)} | Encyklopedie PetPrep`,
    intro: "Nejdůležitější potřeby vedle sebe, ze stejných zdrojů jako stránky plemen.",
    pick: "V katalogu vyberte dvě nebo tři plemena a porovnejte je.",
    back: "Zpět do katalogu",
    remove: "Odebrat: {name}",
    note: "Hodnoty uvádíme tak, jak je uvádí jmenovaný zdroj. Když se zdroje liší, stránka plemene uvádí každou hodnotu.",
    availabilityRow: "V PetPrepu",
    activityRow: "Denní cíl dospělého zvířete v PetPrepu (pravidlo hry)",
  },
  facets: {
    size: { label: "Velikost", values: { toy: "Trpasličí", small: "Malý", small_medium: "Malý až střední", medium: "Střední", medium_large: "Střední až velký", large: "Velký", giant: "Obří" } },
    exercise: { label: "Pohyb denně", values: { under_1h: "Do 1 hodiny", h1_2: "1–2 hodiny", over_2h: "Více než 2 hodiny" }, line: (v) => `${lc(v)} pohybu denně` },
    grooming: { label: "Kartáčování", values: { weekly: "Jednou týdně", several_weekly: "Několikrát týdně", daily: "Denně", other: "Jinak" }, line: (v) => `kartáčování: ${lc(v)}` },
  },
  groups: {
    exercise: "Pohyb",
    play: "Hra",
    litter: "Kočičí toaleta",
    scratching: "Škrábání",
    grooming: "Srst a péče",
    feeding: "Krmení",
    water: "Voda",
    lifespan: "Délka života",
    stages: "Životní fáze",
    size: "Velikost a hmotnost",
    training: "Výcvik",
  },
  fields: {
    size: "Velikost",
    height: "Výška v kohoutku",
    weight: "Hmotnost dospělého jedince",
    growth_end: "Dospělé velikosti dosahuje ve věku",
    lifespan: "Délka života",
    exercise: "Pohyb denně",
    coat: "Srst",
    grooming_frequency: "Kartáčování",
    grooming_level: "Nároky na péči o srst",
    shedding: "Línání",
    litter_scoop: "Úklid kočičí toalety",
    litter_full_change: "Výměna veškerého steliva",
    litter_pee: "Močení (dospělá kočka)",
    litter_poo: "Stolice (dospělá kočka)",
    water_need: "Potřeba vody",
    sleep: "Spánek (dospělá kočka)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 týdnů",
    puppy_3_6_months: "3–6 měsíců",
    puppy_6_12_months: "6–12 měsíců",
    kitten_6_12_weeks: "6–12 týdnů",
    kitten_3_6_months: "3–6 měsíců",
    kitten_6_12_months: "6–12 měsíců",
    puppy: "Štěně",
    kitten: "Kotě",
    young_adult: "Mladé dospělé zvíře",
    mature_adult: "Zralé dospělé zvíře",
    adult: "Dospělé zvíře",
    senior: "Senior",
  },
  categories: {
    size: { toy: "trpasličí", small: "malý", small_medium: "malý až střední", medium: "střední", medium_large: "střední až velký", large: "velký", giant: "obří" },
    coat: { moderately_long: "středně dlouhá", smooth: "hladká (krátká)", short: "krátká", medium: "středně dlouhá", short_long: "krátká nebo dlouhá (dvě variety srsti)", long: "dlouhá" },
    grooming_frequency: { at_least_once_a_week: "nejméně jednou týdně", at_least_once_or_twice_a_week: "nejméně jednou až dvakrát týdně", once_a_week: "jednou týdně", more_than_once_a_week: "víc než jednou týdně", daily: "denně", every_day: "každý den" },
    grooming_level: { moderate: "střední", high: "vysoké", low: "nízké" },
    shedding: { yes: "líná", no: "nelíná (to neznamená, že je hypoalergenní)", high: "hodně líná", moderate: "středně líná", low: "líná málo", minimal: "líná minimálně" },
  },
  statements: {
    food_motivated: () => "Plemeno silně motivuje jídlo – to usnadňuje výcvik, ale hlídejte porce.",
    coren_rank: (v) => `${String(v)}. místo v žebříčku Stanleyho Corena (pracovní a poslušnostní inteligence).`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Standard FCI č. ${x.number}, skupina ${x.group} (${fciGroups[x.group] ?? "–"}); země původu: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Hra: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])}× denně, pokaždé ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}${form(x.minutes[1], "minutu", "minuty", "minut")}.`;
    },
    kittens_play_more: () => "Koťata si potřebují hrát častěji.",
    scratching_natural: () => "Škrábání je přirozené a nutné: dejte kočce škrabadlo a nikdy ji za škrábání netrestejte.",
    water_fresh: () => "Čerstvá voda musí být stále po ruce; misku denně vymyjte a doplňte.",
    grooming_sources_differ: () => "Zdroje se v četnosti kartáčování liší: od každodenního po jednou týdně.",
  },
  // Qualifiers wrap a value already in the nominative ("2 hodiny denně"). Particles such as "více než", "nejméně",
  // "až" and "přibližně" keep it; "do" / "od" need the genitive, which toGen() supplies ("do 2 let", "od 7 let").
  qualifiers: {
    exact: (t) => t,
    median: (t) => `medián ${t}`,
    more_than: (t) => `více než ${t}`,
    less_than: (t) => `méně než ${t}`,
    at_least: (t) => `nejméně ${t}`,
    up_to: (t) => `až ${t}`,
    ideal: (t) => `ideálně (standard plemene): ${t}`,
    mean: (t) => `naměřený průměr: ${t}`,
    about: (t) => `přibližně ${t}`,
    until: (t) => `do ${toGen(t)}`,
    until_about: (t) => `přibližně do ${toGen(t)}`,
    span: (t) => t,
    from: (t) => `od ${toGen(t)}`,
    last: (t) => `posledních ${t}`,
    every: (t) => `jednou za ${t}`,
    expectancy: (t) => `očekávaná délka života při narození: ${t}`,
    smaller_meals: (t) => `${t}, menší porce`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t, n) => `${t}${NB}${form(n, "rok", "roky", "let", "roku")}`,
    months: (t, n) => `${t}${NB}${form(n, "měsíc", "měsíce", "měsíců", "měsíce")}`,
    days: (t, n) => `${t}${NB}${form(n, "den", "dny", "dní", "dne")}`,
    min_per_day: (t, n, f) =>
      n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} denně` : `${t}${NB}${form(n, "minuta", "minuty", "minut", "minuty")} denně`,
    meals_per_day: (t, n) => `${t}${NB}${form(n, "jídlo", "jídla", "jídel", "jídla")} denně`,
    times_per_day: (t) => `${t}× denně`,
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} denně`,
    ml_per_kg_day: (t) => `${t}${NB}ml na kg tělesné hmotnosti denně`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% očekávané délky života`,
  },
  males: "samci",
  females: "samice",
  or: " nebo ",
  notes: { size_class_guidance: "doporučení pro jeho velikostní kategorii" },
  stageLabels: {
    dog: { puppy: "Štěně", young: "Mladý pes", adult: "Dospělý pes", senior: "Senior" },
    cat: { puppy: "Kotě", young: "Mladá kočka", adult: "Zralá kočka", senior: "Senior" },
  },
  activity: {
    steps: (n, raw) => `${n}${NB}${steps(raw)}`,
    steps_range: (from, to) => `${from} → ${to}${NB}kroků`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth}${NB}kroků za každý měsíc věku (${first} při příchodu), nejvýše ${cap} od ${capMonth}. měsíce`,
    play_sessions: (n) => `${n}${NB}${form(n, "herní chvilka", "herní chvilky", "herních chvilek")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Cíl kroků = minuty pohybu denně × ${p.per_minute}${NB}${steps(p.per_minute)}. Dospělé zvíře: ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}${form(p.minutes, "minuta", "minuty", "minut")}`} pohybu, tedy ${f.num(p.steps)}${NB}${steps(p.steps)} denně.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Učí se povely pomaleji než kříženec z bezplatného plánu (jeho tempo × ${f.num(p.multiplier)}).`
        : p.multiplier === 1
          ? "Učí se povely stejně rychle jako kříženec z bezplatného plánu."
          : `Učí se povely ${f.num(p.multiplier)}× rychleji než kříženec z bezplatného plánu.`,
    senior_share: (p, f) =>
      `Seniorem se stává v ${p.months}. měsíci věku (${f.num(p.months / 12, 1)}${NB}${form(p.months / 12, "rok", "roky", "let", "roku")}) – v poslední čtvrtině očekávané délky života plemene.`,
    walk_sensor: () => "Procházky počítají skutečné kroky z Apple Health nebo Health Connect (se souhlasem, jen ke čtení) a ze senzoru pohybu v telefonu – bez GPS.",
    play_instead_of_steps: (p, f) =>
      `Bez procházek: dospělá kočka potřebuje denně ${p.sessions}${NB}${form(p.sessions, "herní chvilku", "herní chvilky", "herních chvilek")} s hůlkou s peřím; pauza mezi nimi: nejméně ${f.num(p.gap_minutes / 60)}${NB}${hours(p.gap_minutes / 60)}.`,
    litter_rule: (p) =>
      `Kočičí toaleta: dospělá kočka ji používá ${p.uses}× denně; každé použití je třeba uklidit do ${p.scoop_hours}${NB}${hoursGen(p.scoop_hours)} (mimo klidové hodiny) a veškeré stelivo vyměnit jednou za ${p.change_days}${NB}${form(p.change_days, "den", "dny", "dní")}.`,
    scratching_after_missed_play: () => "Po dni bez dostatku hry kočka jednou něco poškrábe; dítě ji odnese ke škrabadlu.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kartáčování jednou týdně." : p.per_week === 2 ? "Kartáčování dvakrát týdně." : `Kartáčování ${p.per_week}× týdně.`),
    no_walk_in_heat: (p) =>
      `V létě (červen–srpen; na jižní polokouli prosinec–únor) se na obrazovce dítěte a na obrazovce procházky mezi ${p.from} a ${p.to} (místní čas rodiny) zobrazí klidné připomenutí: v horku se na procházky nechodí. Bez údajů o počasí a bez trestů – kroky se počítají dál.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "čištění kožních záhybů",
        tooth_brushing: "čištění zubů",
        ear_cleaning: "kontrola a čištění uší",
        nail_trim: "stříhání drápků",
        bath: "koupel",
        groomer_visit: "návštěva u groomera",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "každý den"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "jednou týdně"
              : `jednou za ${weeks}${NB}${form(weeks, "týden", "týdny", "týdnů")}`
            : q.period_days === 7
              ? `${q.times}× týdně`
              : q.period_days === 1
                ? `${q.times}× denně`
                : `${q.times}× za ${q.period_days}${NB}${form(q.period_days, "den", "dny", "dní")}`;
      const who = q.actor === "parent" ? "připomínka pro rodiče" : "úkol pro dítě";
      return `Péče: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Prohlédněte si štěně spolu s matkou tam, kde se narodilo.",
      min_age_puppy: "Štěně by nemělo opustit matku dřív než v 8 týdnech věku.",
      pedigree_fci: "Požádejte o průkaz původu. Podle pravidel FCI lze průkaz původu vystavit jen při doloženém původu po obou rodičích.",
      parents_health_tests: "Požádejte o výsledky zdravotních vyšetření obou rodičů. Která vyšetření jsou důležitá, záleží na plemeni.",
      breed_club_rules: "Národní kynologické svazy mohou stanovit chovatelská pravidla nad rámec pravidel FCI – zeptejte se chovatelského klubu plemene, jaká vyšetření musí rodiče mít.",
      written_contract: "Požádejte o písemnou kupní smlouvu, která zaznamenává původ a zdraví štěněte.",
      kitten_see_mother: "Prohlédněte si kotě spolu s matkou tam, kde koťata žijí.",
      kitten_min_age: "Podle pravidel FIFe pro chov koček s průkazem původu neodchází kotě do nového domova dřív než ve 14 týdnech věku.",
      kitten_vaccination: "Kotě je plně očkované (panleukopenie, kaliciviróza, herpesviróza) a má doklad o očkování.",
      kitten_pedigree: "Kotě s průkazem původu má rodokmen nejméně tří generací.",
      kitten_parents_tests: "Zeptejte se, zda některý z rodičů neměl zdravotní problémy, které by kotě mohlo zdědit.",
    },
    tests: {
      dna_poag_pll: "DNA test na primární glaukom s otevřeným úhlem a primární luxaci čočky (POAG/PLL), dědičná onemocnění očí, která mohou vést ke slepotě",
      hip_scheme: "Rentgenové vyšetření kyčelních kloubů na dysplazii (Velká Británie: program BVA/KC)",
      elbow_scheme: "Rentgenové vyšetření loketních kloubů na dysplazii (Velká Británie: program BVA/KC)",
      eye_scheme: "Vyšetření očí u veterinárního oftalmologa (Velká Británie: program BVA/KC/ISDS; u některých plemen s gonioskopií)",
      heart_scheme: "Vyšetření srdce na onemocnění mitrální chlopně",
      boas_grading: "Test dýchání na brachycefalický obstrukční syndrom dýchacích cest (hodnocení BOAS)",
      ivdd_screening: "Vyšetření páteře na onemocnění meziobratlových plotének (IVDD)",
      hearing_baer: "Vyšetření sluchu na hluchotu (BAER)",
      cm_sm_mri: "Vyšetření magnetickou rezonancí na malformaci Chiariho typu a syringomyelii (Velká Británie: program BVA/KC CM/SM)",
      inbreeding_coi: "Genetická rozmanitost – ověřte koeficient příbuzenské plemenitby",
      dna_prcd_pra: "DNA test na progresivní atrofii sítnice (prcd-PRA)",
      dna_rcd4_pra: "DNA test na progresivní atrofii sítnice (rcd4)",
      dna_gr_pra2: "DNA test na progresivní atrofii sítnice (GR_PRA2)",
      dna_cnm: "DNA test na centronukleární myopatii (CNM)",
      dna_eic: "DNA test na kolaps vyvolaný zátěží (EIC)",
      dna_hnpk: "DNA test na dědičnou nosní parakeratózu (HNPK)",
      dna_sd2: "DNA test na kosterní dysplazii 2 (SD2)",
      dna_mcd: "DNA test na makulární dystrofii rohovky (MCD)",
      dna_stgd: "DNA test na Stargardtovu chorobu (STGD)",
      dna_cc_de: "DNA test na syndrom kudrnaté srsti a suchého oka (CC/DE)",
      dna_ef: "DNA test na epizodické padání (EF)",
      dna_cea: "DNA test na anomálii oka kolií (CEA/CH)",
      dna_cl: "DNA test na ceroidní lipofuscinózu (CL)",
      dna_igs: "DNA test na Imerslundův-Gräsbeckův syndrom (IGS)",
      dna_mdr1: "DNA test na citlivost na léčiva (MDR1)",
      dna_tns: "DNA test na syndrom zachycených neutrofilů (TNS)",
      dna_sn: "DNA test na senzorickou neuropatii (SN)",
      dna_ggd: "DNA test na goniodysgenezi a riziko glaukomu (GGD)",
      dna_raines: "DNA test na Raineův syndrom",
      dna_dm: "DNA test na degenerativní myelopatii (DM)",
      dna_de: "DNA test na degenerativní encefalopatii (DE)",
      dna_jadd: "DNA test na juvenilní Addisonovu chorobu (JADD)",
      dermoid_sinus_scheme: "Kontrola štěňat na dermoidní sinus (program chovatelského klubu)",
      dna_jme: "DNA test na juvenilní myoklonickou epilepsii (JME)",
      dna_je: "DNA test na juvenilní epilepsii (JE)",
      dna_lsd: "DNA test na lyzozomální střádavé onemocnění (LSD)",
      dna_ampn: "DNA test na polyneuropatii aljašských malamutů (AMPN)",
      dna_fanconi: "DNA test na Fanconiho syndrom (onemocnění ledvin)",
      dna_pra_bj1: "DNA test na progresivní atrofii sítnice u basenži (PRA-BJ1)",
      thyroid_scheme: "Vyšetření štítné žlázy rodičů",
      dna_pap_pra1: "DNA test na progresivní atrofii sítnice u papillonů (Pap-PRA1)",
      dna_nad: "DNA test na neuroaxonální dystrofii (NAD)",
      dna_eopra: "DNA test na časně nastupující progresivní atrofii sítnice (EOPRA)",
      dna_cu: "DNA test na cystinurii (CU), dědičný sklon k ledvinovým a močovým kamenům",
      heart_echo_scheme: "Vyšetření srdce barevným dopplerovským ultrazvukem (program chovatelského klubu)",
      cardiac_exam: "Vyšetření srdce rodičů (doporučení chovatelského klubu)",
      dna_rd_osd: "DNA test na dysplazii sítnice / okuloskeletální dysplazii (RD/OSD)",
      dna_xlpra1: "DNA test na X-vázanou progresivní atrofii sítnice (XLPRA1)",
      dna_cmo: "Test na kraniomandibulární osteopatii (CMO), dědičné onemocnění kostí čelisti",
      dna_hsf4: "DNA test na dědičný šedý zákal (HSF4)",
      dna_lafora: "DNA test na Laforovu chorobu",
      dna_nccd: "DNA test na neonatální degeneraci mozečkové kůry (NCCD)",
      dna_fviid: "DNA test na nedostatek faktoru VII (FVIID)",
      dna_mls: "DNA test na Musladinův-Luekeův syndrom (MLS)",
      dna_vwd1: "DNA test na von Willebrandovu chorobu typu 1 (vWD1)",
      dna_mac: "DNA test na náchylnost k infekci komplexem Mycobacterium avium (MAC)",
      dna_imgd: "DNA test na dědičnou myopatii německých dog (IMGD), onemocnění, při kterém ubývá svalů",
      dna_poag: "DNA test na primární glaukom s otevřeným úhlem (POAG), dědičné onemocnění očí, které může vést ke slepotě",
      dna_aon: "DNA test na neuropatii s nástupem v dospělosti (AON), dědičné onemocnění nervů",
      dna_fn: "DNA test na familiární nefropatii (FN), dědičné onemocnění ledvin",
      patella_scheme: "Kontrola čéšek na luxaci před zařazením do chovu",
      kidney_scheme: "Ultrazvuk ledvin na chybějící nebo nesprávně vyvinutou ledvinu (doporučení chovatelského klubu)",
      kidney_upc_scheme: "Vyšetření moči (poměr bílkoviny a kreatininu) na onemocnění ledvin (doporučení chovatelského klubu)",
      dna_gld: "DNA test na leukodystrofii globoidních buněk (GLD), dědičné onemocnění nervů",
      liver_shunt_scheme: "Vyšetření jater na portosystémový zkrat nebo mikrovaskulární dysplazii (doporučení chovatelského klubu)",
      breed_health_scheme: "Zdravotní program chovatelského klubu pro rodiče",
      hemivertebrae_scheme: "Rentgen páteře rodičů na hemivertebry (nesprávně vyvinuté obratle), ve věku nad 12 měsíců",
      dna_hcm_mc: "DNA test na hypertrofickou kardiomyopatii (MC HCM)",
      dna_sma: "DNA test na spinální svalovou atrofii (SMA)",
      dna_pk_def: "DNA test na nedostatek pyruvátkinázy (PK def)",
      hcm_negative: "Chovné kočky musí být HCM negativní (onemocnění srdce: hypertrofická kardiomyopatie)",
      dna_gsd4: "DNA test na glykogenózu typu IV (GSD IV)",
      dna_pra_b: "DNA test na progresivní atrofii sítnice u bengálských koček (PRA-b)",
      dna_jlpp: "DNA test na juvenilní obrnu hrtanu a polyneuropatii (JLPP)",
      dna_lemp2: "DNA test na leukoencefalomyelopatii (LEMP-2)",
      dna_huu: "DNA test na hyperurikosurii (HUU)",
      dna_dcm: "DNA test na dilatační kardiomyopatii (DCM), onemocnění srdečního svalu",
      dna_pra5: "DNA test na progresivní atrofii sítnice (PRA5)",
      dna_dings2: "DNA test na nemoc „tančících dobrmanů“ (DINGS2), onemocnění nervů a svalů",
      dna_slem: "DNA test na spongiformní leukoencefalomyelopatii (SLEM, „syndrom třesoucího se štěněte“), onemocnění mozku a míchy u mladých štěňat",
      dna_ams: "DNA test na syndrom akrální mutilace (AMS), onemocnění nervů, které bere tlapkám citlivost na bolest",
      dna_dams: "DNA test na syndrom dyserytropoetické anémie a myopatie (DAMS), onemocnění krve a svalů",
      dna_fuco: "DNA test na fukosidózu, dědičné onemocnění nervové soustavy",
      dna_pfk: "DNA test na nedostatek fosfofruktokinázy (PFK), dědičnou enzymovou poruchu krve a svalů",
      dna_pra_cord1: "DNA test na progresivní atrofii sítnice (PRA cord1)",
      dna_bbs2_pra: "DNA test na progresivní atrofii sítnice (BBS2-PRA)",
      dna_cnga1_pra: "DNA test na progresivní atrofii sítnice (CNGA1-PRA)",
      dna_pra_rcd2: "DNA test na progresivní atrofii sítnice (PRA-rcd2)",
      dna_gm1: "DNA test na gangliosidózu GM1 (dědičné onemocnění nervové soustavy)",
      dna_gm2: "DNA test na gangliosidózu GM2 (dědičné onemocnění nervové soustavy)",
      dna_vwd3: "DNA test na von Willebrandovu chorobu typu 3 (vWD3), dědičnou poruchu srážlivosti krve",
      dna_pra_rcd3: "DNA test na progresivní atrofii sítnice (PRA-rcd3)",
      dna_clad: "DNA test na deficit adheze leukocytů (CLAD), dědičnou poruchu imunity",
      dna_ncl8: "DNA test na neuronální ceroidní lipofuscinózu (NCL8), dědičné onemocnění nervové soustavy",
      dna_pra_rcd1: "DNA test na progresivní atrofii sítnice (rcd1)",
      dna_pra4: "DNA test na progresivní atrofii sítnice (PRA4)",
      dna_vwd2: "DNA test na von Willebrandovu chorobu typu 2 (vWD2), dědičnou poruchu srážlivosti krve",
      dna_l2hga: "DNA test na L-2-hydroxyglutarovou acidurii (L-2-HGA), dědičné metabolické onemocnění nervové soustavy",
      dna_pll: "DNA test na primární luxaci čočky (PLL), dědičné onemocnění očí, při kterém se čočka posune ze svého místa",
      dna_loa: "DNA test na pozdně nastupující ataxii (LOA), dědičné onemocnění, které narušuje rovnováhu a koordinaci",
      dna_sca: "DNA test na spinocerebelární ataxii (SCA), dědičné onemocnění nervové soustavy",
    },
  },
  health: {
    shar_pei_fever: "U plemene se může vyskytnout familiární horečka šar-pejů: záchvaty vysoké horečky s bolestivými, oteklými klouby a oteklým obličejem – ihned k veterináři.",
    weight_gain: "Snadno přibírá – je třeba hlídat porce a pamlsky.",
    hip_elbow_dysplasia_eye_conditions: "Může mít sklon k dysplazii kyčelních a loketních kloubů a k několika dědičným onemocněním očí.",
    cancer_risk: "Zdroje u tohoto plemene popisují vyšší riziko nádorových onemocnění.",
    flat_face_breathing: "Plemeno s plochým obličejem (brachycefalické): krátký čenich, úzké nozdry a nadbytečná měkká tkáň v dýchacích cestách mohou ztěžovat dýchání (brachycefalický obstrukční syndrom dýchacích cest, BOAS).",
    heat_stroke_risk: "Rychle se přehřívá a je náchylnější k úpalu než většina psů, zvlášť v teplém počasí.",
    skin_fold_ear_problems: "Má sklon k zánětům uší a infekcím kožních záhybů; kožní záhyby je třeba udržovat čisté a suché.",
    ear_infections_long_ears: "Kvůli dlouhým uším se mohou objevit infekce uší; ve zvukovodu se mohou hromadit bakterie.",
    collie_eye_pra: "U plemene se vyskytují dědičná onemocnění očí: anomálie oka kolií, vada v zadní části oka, a progresivní atrofie sítnice, která může pomalu vést ke slepotě; k dispozici jsou vyšetření očí a DNA testy.",
    merle_colour_risk: "Merle není zbarvení podle standardu plemene; u tohoto plemene s sebou nese vyšší riziko problémů se sluchem a zrakem.",
    hind_leg_conformation: "Royal Kennel Club uvádí u tohoto plemene tvar zadních končetin a způsob pohybu jako problematický bod; zdravý pes má rovný hřbet a přiměřeně zaúhlené zadní končetiny.",
    hip_elbow_dysplasia: "Může mít sklon k dysplazii kyčelních a loketních kloubů; chovatelům se doporučuje nechat rodičům před zařazením do chovu vyšetřit kyčle a lokty.",
    degenerative_myelopathy: "U plemene se vyskytuje degenerativní myelopatie, onemocnění míchy, které pomalu oslabuje zadní nohy; k dispozici je DNA test.",
    exercise_induced_collapse: "U plemene se vyskytuje kolaps vyvolaný zátěží, dědičné nervosvalové onemocnění, kvůli kterému může pes po velké námaze zkolabovat.",
    heart_valve_disease: "Onemocnění srdce způsobené ochabující mitrální chlopní je u tohoto plemene velký problém; často se nejdřív projeví jako srdeční šelest a chovní psi by měli mít srdce předem vyšetřené.",
    chiari_syringomyelia: "U plemene se vyskytuje malformace Chiariho typu a syringomyelie, bolestivé onemocnění s dutinami plnými tekutiny v míše blízko mozku, které souvisí s tvarem lebky; diagnostikuje se magnetickou rezonancí.",
    eye_conditions: "U plemene se vyskytují dědičná onemocnění očí, například šedý zákal, a vystouplé nebo podrážděné oči jsou problematickým bodem; k dispozici jsou vyšetření očí a DNA testy.",
    epilepsy: "U plemene se vyskytuje epilepsie, onemocnění mozku, které může způsobovat záchvaty.",
    storage_disease: "Mladé psy tohoto plemene může postihnout dědičné střádavé onemocnění nervové soustavy; DNA test rodičů umožňuje chovatelům se mu vyhnout.",
    chondrodysplasia: "U plemene se vyskytuje chondrodysplazie, porucha růstu chrupavek a kostí; štěňata lze vyšetřit rentgenem.",
    polyneuropathy: "U plemene se vyskytuje dědičné onemocnění nervů (polyneuropatie); DNA test rodičů umožňuje chovatelům se mu vyhnout.",
    fanconi_syndrome: "U plemene se vyskytuje Fanconiho syndrom, dědičné onemocnění ledvin, při kterém uniká cukr do moči; DNA test rodičů umožňuje chovatelům se mu vyhnout.",
    pyruvate_kinase_deficiency: "U plemene se může vyskytnout nedostatek pyruvátkinázy, dědičná vada červených krvinek, která způsobuje chudokrevnost.",
    back_disc_disease: "U plemene se vyskytuje onemocnění meziobratlových plotének, tlumicích destiček mezi obratli páteře.",
    pra_eye_disease: "U plemene se vyskytuje progresivní atrofie sítnice, dědičné onemocnění očí, které může pomalu vést ke slepotě; k dispozici jsou DNA testy a vyšetření očí.",
    hip_dysplasia: "U plemene se vyskytuje dysplazie kyčelních kloubů, špatně vyvinutý kyčelní kloub, který může vést k artróze; chovatelům se doporučuje nechat rodičům kyčle vyhodnotit.",
    bloat_gdv: "U plemene se může vyskytnout torze žaludku (dilatace a volvulus žaludku), kdy se žaludek otočí – jde o naléhavý stav, který vyžaduje okamžitou pomoc veterináře.",
    inherited_eye_disease: "U plemene se vyskytují dědičná onemocnění očí, například anomálie oka kolií, šedý zákal a progresivní atrofie sítnice.",
    drug_sensitivity_mdr1: "Někteří psi tohoto plemene mají dědičnou citlivost na určité léky (citlivost na léčiva, MDR1) – pokud se to týká vašeho psa, řekněte to veterináři.",
    merle_to_merle_breeding: "Merle je u tohoto plemene standardní zbarvení; dva psi se zbarvením merle by se spolu neměli pářit, protože takovým štěňatům hrozí poškození zraku a sluchu – Royal Kennel Club je nezapisuje.",
    kneecap_luxation: "U plemene se vyskytuje luxace čéšky, kdy čéška dočasně vyklouzne ze svého místa.",
    pra_and_eyelashes: "U plemene se vyskytují problémy s očima: progresivní atrofie sítnice, která může pomalu vést ke slepotě, a nadbytečné řasy, které dřou o oko (distichiáza); chovatelům se doporučuje nechat rodičům vyšetřit oči.",
    liver_shunt: "U plemene se může vyskytnout portosystémový (jaterní) zkrat, kdy krev obchází játra.",
    skin_allergies: "Kožní alergie jsou u plemene známým problémem; Royal Kennel Club žádá rozhodčí, aby si všímali známek zánětu kůže, a majitelům se doporučuje poradit se s veterinářem před výběrem šamponu.",
    westie_lung: "U plemene se může vyskytnout onemocnění plic známé jako „plíce westíků“ (idiopatická plicní fibróza), které ztěžuje dýchání, většinou u starších psů.",
    jaw_bone_disorder: "U plemene se může vyskytnout dědičné onemocnění kostí čelisti.",
    dry_eye: "U plemene se může vyskytnout suché oko, kdy oči netvoří dost slz a jsou suché a bolestivé.",
    heart_hcm: "U plemene se vyskytuje hypertrofická kardiomyopatie (HCM), dědičné onemocnění srdce, při kterém se srdeční sval ztlušťuje.",
    dental_weight_nail_care: "Rozsáhlá britská studie uvádí mezi nejčastějšími problémy plemene onemocnění zubů, nadváhu a přerostlé drápky, proto se majitelům doporučuje pravidelně pečovat o zuby, hlídat hmotnost a starat se o drápky.",
    dental_weight_care: "PetMD uvádí mezi problémy, na které je třeba dávat pozor, onemocnění zubů a nadváhu, proto se majitelům doporučuje kočce pravidelně čistit zuby a hlídat její hmotnost.",
    gsd_iv: "U plemene se vyskytuje glykogenóza typu IV (GSD IV), dědičné onemocnění, které postihuje koťata; DNA test rodičů umožňuje chovatelům se mu vyhnout.",
    hip_dysplasia_weight: "U plemene se může vyskytnout dysplazie kyčelních kloubů, špatně vyvinutý kyčelní kloub; PetMD doporučuje udržovat kočku ve zdravé hmotnosti, aby se šetřily klouby.",
    laryngeal_paralysis_polyneuropathy: "U plemene se vyskytuje juvenilní obrna hrtanu a polyneuropatie (JLPP), dědičné onemocnění nervů, které postihuje hrtan a zadní nohy; DNA test rodičů umožňuje chovatelům se mu vyhnout.",
    heart_sas: "U plemene se vyskytuje subaortální stenóza, zúžení těsně pod srdeční chlopní, které může způsobit šelest; chovní psi by měli mít srdce nejdřív vyšetřené.",
    inherited_eye_defects: "U plemene se vyskytují dědičné vady očí, například dysplazie sítnice a perzistující pupilární membrána; k dispozici je vyšetření očí.",
    skin_fold_infections: "V kožních záhybech, zvlášť na obličeji, se může držet vlhkost a záhyby se pak mohou zanítit (pyodermie kožních záhybů); vrásky na obličeji je třeba denně čistit.",
    eyelid_eye_problems: "U plemene se vyskytují problémy s víčky (víčka stočená dovnitř nebo ven), suché oko a vyhřezlá žláza třetího víčka („cherry eye“); k dispozici je vyšetření očí.",
    hip_elbow_joint_disease: "U plemene se vyskytuje dysplazie kyčelních a loketních kloubů, kdy se klouby nevyvinou správně, což může vést k onemocnění kloubů.",
    hip_dysplasia_arthritis: "U plemene se vyskytuje dysplazie kyčelních kloubů, volný a špatně vyvinutý kyčelní kloub, který může časem vést k artróze.",
    bleeding_disorder_vwd: "U plemene se vyskytuje von Willebrandova choroba, dědičná porucha srážení krve, která může způsobovat nadměrné krvácení.",
    heart_muscle_disease: "U plemene se může vyskytnout kardiomyopatie, zvětšené srdce v důsledku ochabnutí srdečního svalu.",
    itchy_skin_allergy: "U plemene se mohou vyskytnout kožní alergie (atopie), které způsobují svědění a podrážděnou kůži.",
    entropion_cherry_eye: "U plemene se mohou vyskytnout víčka stočená dovnitř (entropium) a vyhřezlá žláza třetího víčka („cherry eye“); vyhřezlou žlázu lze chirurgicky upravit.",
    dental_disease_tooth_brushing: "Rozsáhlá britská studie uvádí onemocnění zubů jako zdaleka nejčastější problém plemene a časté jsou i mléčné zuby, které nevypadnou, proto se majitelům doporučuje pečovat o psí zuby každý den, například čištěním.",
    windpipe_collapse: "U plemene se může vyskytnout kolaps průdušnice, kdy průdušnice ztrácí pevnost, což může vést ke slabosti a kolapsu.",
    eye_problems_pra_lens_dry_eye: "U plemene se vyskytují problémy s očima, například progresivní atrofie sítnice, která může pomalu vést ke slepotě, posunutá čočka (luxace čočky) a suché oko.",
    cataracts_lens_luxation: "U plemene se mohou vyskytnout problémy s očima, například šedý zákal, při kterém se zakaluje čočka, a posunutá čočka (luxace čočky).",
    wobbler_syndrome: "U plemene se může vyskytnout wobbler syndrom, kdy nestabilní krční obratle tlačí na míchu a oslabují zadní nohy.",
    eye_phpv: "U plemene se může vyskytnout vrozená vada oka (perzistující hyperplastický primární sklivec, PHPV); chovatelům se doporučuje nechat rodičům vyšetřit oči.",
    certain_cancers: "U plemene se mohou vyskytnout některé druhy nádorových onemocnění.",
    bare_skin_sun_cold: "Holou kůži bezsrsté variety je třeba chránit před sluncem i chladem.",
    l2hga_nervous_system: "U plemene se může vyskytnout L-2-hydroxyglutarová acidurie (L-2-HGA), dědičná porucha metabolismu, která postihuje nervovou soustavu; k dispozici je DNA test rodičů.",
    short_face_breathing: "Plemeno se středně krátkým obličejem: někteří psi s kratším obličejem mohou mít vážné potíže s dýcháním (brachycefalický obstrukční syndrom dýchacích cest, BOAS).",
    corneal_ulcers: "Kvůli tvaru lebky a vystouplým očím jsou pravděpodobnější problémy s očima, například vředy rohovky; k dispozici je vyšetření očí.",
    skin_folds_allergies: "Mohou se objevit kožní problémy, například alergie, bradavice, kožní výrůstky a podrážděné kožní záhyby na obličeji (dermatitida kožních záhybů); záhyby na obličeji je třeba udržovat čisté a suché.",
    heart_cardiomyopathy_aortic_stenosis: "U plemene se mohou vyskytnout problémy se srdcem, například kardiomyopatie a stenóza aorty.",
    dental_disease_care: "Rozsáhlá britská studie uvádí onemocnění zubů jako nejčastější problém plemene a majitelům se doporučuje dát péči o zuby přednost.",
    bladder_stones: "U plemene se mohou vyskytnout močové kameny, shluky minerálů, které se tvoří v močovém měchýři a moči.",
    deafness: "U plemene se vyskytuje hluchota na jedno nebo obě uši; sluch štěňat lze ověřit testem BAER.",
    mitral_valve_disease: "U plemene se vyskytuje onemocnění mitrální chlopně, srdeční onemocnění, při kterém oslabená chlopeň pouští krev zpět do srdce; veterinář může chovným psům před zařazením do chovu poslechnout srdce.",
    eye_problems_pra_cataracts_dry_eye: "U plemene se vyskytují problémy s očima, například progresivní atrofie sítnice, která může pomalu vést ke slepotě, šedý zákal a suché oko; k dispozici je vyšetření očí.",
    skin_comedo_allergy: "Mohou se objevit kožní problémy, například komedonový syndrom kníračů (druh zánětu vlasových folikulů) a kožní alergie (atopie), které způsobují svědění.",
    shorter_face_boas: "Brachycefalické plemeno (s krátkým obličejem): kratší obličej může způsobit vážné potíže s dýcháním (brachycefalický obstrukční syndrom dýchacích cest, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "U plemene se vyskytují problémy s očima, například suché oko, šedý zákal, progresivní atrofie sítnice, která může pomalu vést ke slepotě, a odchlípení sítnice.",
    hypothyroidism: "U plemene se může vyskytnout snížená činnost štítné žlázy (hypotyreóza), která může ovlivnit hmotnost, kůži a množství energie.",
    open_fontanelle: "U plemene se může vyskytnout otevřená fontanela, měkké místo na lebce, které se úplně neuzavře.",
    collapsing_trachea: "U plemene se může vyskytnout kolaps průdušnice, ochablost průdušnice, která může způsobovat kašel a potíže s dýcháním.",
    gm1_gangliosidosis: "U plemene se může vyskytnout gangliosidóza GM1, dědičné onemocnění nervové soustavy; DNA test rodičů ji může vyloučit.",
    addisons_disease: "U plemene se může vyskytnout Addisonova choroba, nedostatek hormonů nadledvin.",
    protein_losing_disease: "U plemene se mohou vyskytnout onemocnění ledvin nebo střev se ztrátou bílkovin, která mohou způsobit průjem a hubnutí.",
    diabetes_mellitus: "U plemene se může vyskytnout cukrovka (diabetes mellitus), kdy tělo nedokáže správně regulovat hladinu cukru v krvi.",
    dental_disease_home_brushing: "Stejně jako mnoho malých psů má i toto plemeno sklon k onemocnění zubů, proto se doporučuje čistit zuby doma psím kartáčkem a psí zubní pastou.",
    dermoid_sinus: "U plemene se může vyskytnout dermoidní sinus, bolestivé onemocnění, při kterém trubicovitý útvar v kůži na hřbetě spojuje kůži s míchou; chovatelské kluby provozují program kontroly štěňat na dermoidní sinus.",
    cataracts: "U plemene se může vyskytnout šedý zákal, který zakaluje oční čočku a může vést ke ztrátě zraku.",
    pra_inherited_blindness: "U plemene se může vyskytnout progresivní atrofie sítnice, dědičné onemocnění očí, které může pomalu vést ke slepotě.",
    eyelids_turned: "U plemene se mohou vyskytnout víčka stočená dovnitř (entropium) nebo ven (ektropium); zeptejte se, zda mají rodiče vyšetřené oči.",
    glaucoma_poag: "U plemene se může vyskytnout primární glaukom s otevřeným úhlem, kdy se v oku hromadí tekutina, což způsobuje bolest a případně slepotu; pro rodiče existuje DNA test.",
    skin_fold_dermatitis: "Volná kůže tvoří záhyby, které se mohou podráždit a zanítit; je třeba je každý den kontrolovat a udržovat čisté a suché.",
    skin_fold_care: "Kožní záhyby na obličeji se mohou podráždit a zanítit (dermatitida kožních záhybů); je třeba je pravidelně čistit a vysoušet.",
    eyelid_problems: "U plemene se mohou vyskytnout problémy s víčky: víčka stočená dovnitř (entropium) nebo ven (ektropium) a vyhřezlá žláza třetího víčka („cherry eye“).",
    skin_allergy_face_folds: "U plemene se mohou vyskytnout kožní alergie (atopie), které způsobují svědění, a kožní záhyby na obličeji je třeba každý den čistit.",
    skin_ear_allergies: "U plemene se mohou vyskytnout alergie na prostředí, které mohou vést k opakovaným infekcím kůže nebo uší; PetMD u psa s alergiemi doporučuje čistit uši jednou týdně.",
    gum_disease_daily_brushing: "Plemeno má sklon k onemocnění dásní (zánět dásní a parodontóza), proto PetMD doporučuje čistit psovi zuby každý den a jednou ročně nechat zuby zkontrolovat u veterináře.",
    pra_pk_def: "U plemene se vyskytují dvě dědičná onemocnění: progresivní atrofie sítnice, onemocnění očí, které může vést ke slepotě, a nedostatek pyruvátkinázy, onemocnění krve; DNA testy rodičů umožňují chovatelům se jim vyhnout.",
    windpipe_collapse_breathing: "U plemene se může vyskytnout kolaps průdušnice, kdy se chrupavčité prstence průdušnice zhroutí a ztěžují dýchání.",
    eye_problems_pra_cataracts_entropion: "U plemene se vyskytují problémy s očima, například progresivní atrofie sítnice, která může pomalu vést ke slepotě, šedý zákal, který zakaluje čočku, a víčka stočená dovnitř (entropium); k dispozici je vyšetření očí.",
    elbow_dysplasia_arthritis: "U plemene se může vyskytnout dysplazie loketních kloubů, špatně vyvinutý loketní kloub, který může časem vést k artróze.",
    entropion: "U plemene se může vyskytnout entropium, kdy se víčka stáčejí dovnitř a dráždí oko; zeptejte se, zda mají rodiče vyšetřené oči.",
    autoimmune_conditions: "U plemene se mohou vyskytnout autoimunitní onemocnění, kdy tělo reaguje samo proti sobě.",
    ear_infections_prone: "Plemeno má sklon k infekcím uší; pečlivě dbejte na hygienu uší.",
    familial_nephropathy: "U plemene se vyskytuje dědičné onemocnění ledvin (familiární nefropatie); k dispozici je DNA test rodičů.",
    hereditary_nephritis: "U plemene se vyskytuje dědičné onemocnění ledvin (dědičná nefritida, nazývaná také dědičná glomerulopatie samojedů).",
    panosteitis: "U plemene se může vyskytnout panosteitida, bolestivý zánět dlouhých kostí, který obvykle postihuje mladé, rostoucí psy.",
    splenic_torsion: "Torze sleziny, která vyžaduje okamžitou veterinární péči, se u tohoto plemene vyskytuje častěji než u jiných velkých plemen.",
    urinary_incontinence: "U plemene se může vyskytnout močová inkontinence, nekontrolovaný únik moči.",
    osteochondritis: "U plemene se může vyskytnout osteochondritis dissecans (OCD), porucha kloubní chrupavky u rostoucích psů.",
    scottie_cramp: "U plemene se vyskytuje „scottie cramp“ – krátké epizody svalových křečí, obvykle vyvolané vzrušením; nejsou bolestivé.",
    slem_shaking_puppy: "U plemene se může vyskytnout spongiformní leukoencefalomyelopatie (SLEM), nazývaná také syndrom třesoucího se štěněte; DNA test pomáhá chovatelům se jí vyhnout.",
    cecs_cramping: "U plemene se vyskytuje psí epileptoidní křečový syndrom (CECS) – záchvaty třesu a svalových křečí.",
    gallbladder_mucocele: "U plemene se může vyskytnout mukokéla žlučníku, kdy se žlučník naplní hustým hlenem a nemůže se správně vyprazdňovat; někdy je nutná operace.",
    periodontal_disease: "Parodontóza, infekce a zánět dásní a tkání, které drží zuby, je u plemene známým problémem.",
    extra_eyelashes: "U plemene se může vyskytnout distichiáza, kdy na vnitřní straně nebo na okraji víčka rostou drobné nadbytečné řasy, které mohou dřít o oko; zeptejte se, zda byli rodiče vyšetřeni v rámci programu pro oči.",
    cm_sm_screening: "U plemene se může vyskytnout malformace Chiariho typu a syringomyelie, bolestivé onemocnění s dutinami plnými tekutiny v míše blízko mozku; chovatelům se doporučuje rodiče vyšetřit (Velká Británie: program BVA/KC).",
    prominent_eyes_injury_dry_eye: "Vystouplé oči se snáz poraní a mohou se na nich tvořit vředy a vysychat; u plemene se vyskytuje také suché oko a vyhřezlá žláza třetího víčka („cherry eye“).",
    legg_perthes: "U plemene se může vyskytnout Leggova-Perthesova choroba, bolestivé onemocnění, při kterém hlavice kyčelního kloubu odumírá a rozpadá se.",
    glaucoma: "U plemene se může vyskytnout glaukom (zelený zákal), zvýšený tlak uvnitř oka, který může být bolestivý a vést ke slepotě.",
    lethal_acrodermatitis: "U plemene se vyskytuje letální akrodermatitida, dědičné onemocnění, které u štěňat způsobuje závažné problémy s kůží a růstem.",
    kidney_disease_urine_screening: "U plemene se vyskytují problémy s ledvinami; vyšetření moči může rodiče před zařazením do chovu prověřit.",
    primary_lens_luxation: "U plemene se vyskytuje primární luxace čočky, bolestivé dědičné onemocnění očí, při kterém se čočka posune ze svého místa a které může způsobit slepotu; pro chovné psy je k dispozici DNA test.",
    inherited_ataxia: "U plemene se vyskytují dědičné ataxie (pozdně nastupující ataxie a spinocerebelární ataxie), které způsobují ztrátu rovnováhy a koordinace; pro chovné psy jsou k dispozici DNA testy.",
    hydrocephalus: "U plemene se může vyskytnout hydrocefalus, hromadění tekutiny kolem mozku.",
    heart_disease_pda: "U plemene se mohou vyskytnout onemocnění srdce, mimo jiné perzistující ductus arteriosus, céva u srdce, která se po narození neuzavře; veterinář ji může odhalit poslechem při první prohlídce štěněte.",
    chiari_malformation: "U plemene se může vyskytnout malformace Chiariho typu se syringomyelií, bolestivé onemocnění s dutinami plnými tekutiny v míše blízko mozku.",
    cataracts_entropion: "U plemene se může vyskytnout šedý zákal, který zakaluje oční čočku, a víčka stočená dovnitř (entropium); zeptejte se, zda byli rodiče vyšetřeni v rámci programu pro oči.",
    periodontal_daily_brushing: "Plemeno má sklon k onemocnění dásní (parodontóze), proto se doporučuje čistit zuby každý den psí zubní pastou.",
    eye_problems_shallow_sockets: "U plemene se vyskytují problémy s očima, například suché oko, oční infekce a vředy na povrchu oka; mělké oční jamky navíc zvyšují riziko poranění očí.",
    eye_problems_dry_eye_entropion_lens_luxation: "U plemene se vyskytují problémy s očima, například suché oko, víčka stočená dovnitř (entropium) a posunutá čočka (luxace čočky); k dispozici je vyšetření očí.",
    heart_valve_screening: "U plemene se mohou vyskytnout onemocnění srdce; ultrazvuk srdce může rodiče před zařazením do chovu prověřit na problémy se srdečními chlopněmi.",
    dental_weight_problems: "Rozsáhlá britská studie uvádí onemocnění zubů a nadváhu jako u plemene obzvlášť časté problémy – problémy, kterým mohou majitelé pomoci předejít; vyskytují se také natěsnané zuby a mléčné zuby, které nevypadnou.",
  },
  page: {
    eyebrow: "Encyklopedie zvířat",
    // Search terms people use ("kočka ragdoll", "povaha"); "povaha" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "povaha, " : ""}pohyb, velikost a péče | PetPrep`
        : species === "cat"
          ? `${/kočka/i.test(name) ? name : `Kočka ${mid(name)}`}: ${hasIntro ? "povaha, " : ""}péče o srst, velikost a délka života | PetPrep`
          : `${name} (${lc(one)}): potřeby, délka života a péče | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Zdroje, zdraví a rady před koupí.`,
    metaLabels: { weight: "hmotnost", exercise: "pohyb", lifespan: "délka života" },
    metaDescription: (name, one) =>
      `${name}: potřeby tohoto plemene (${lc(one)}) podle zdrojů – pohyb, péče o srst, krmení, velikost, délka života, komu se hodí – a jak ho simuluje PetPrep.`,
    suitabilityTitle: "Komu se hodí",
    suitabilityNote: "Stejné štítky jako v aplikaci. Každý je podložený zdroji uvedenými dole na stránce.",
    suitabilityNone: "Pro toto plemeno zatím nemáme štítky potvrzené zdroji.",
    needsTitle: "Co potřebuje",
    needsIntro: (species) =>
      species === "cat"
        ? "Podle felinologických organizací, veterinárních organizací a studií. Když se zdroje liší, ukazujeme každý."
        : "Podle standardů plemen, kynologických svazů, veterinárních charit a studií. Když se zdroje liší, ukazujeme každý.",
    general: (many) => `Obecná doporučení pro ${acc(many)} (nejen pro toto plemeno):`,
    noData: "Naše zdroje to zatím neuvádějí.",
    simTitle: "Jak to simuluje PetPrep",
    simBadge: "Pravidla hry, ne veterinární rada",
    simIntro:
      "V PetPrepu odpovídá jeden skutečný týden jednomu měsíci života zvířete. Toto jsou pravidla, která hra pro toto plemeno používá. PetPrep je zvolil podle zdrojů na této stránce; nejsou to pokyny k péči o skutečné zvíře.",
    simInfoOnly: "Toto plemeno je v encyklopedii jen pro informaci; aplikace ho zatím nesimuluje.",
    simTable: { stage: "Životní fáze", starts: "Začátek", meals: "Krmení denně", activity: { steps: "Denní cíl kroků", play_sessions: "Hra denně" } },
    arrives: (m) => `přichází ve věku ${m}${NB}${form(m, "měsíce", "měsíců", "měsíců", "měsíce")}`,
    fromMonth: (m, years) => (years ? `${m}. měsíc (${years})` : `${m}. měsíc`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `od ${x.from}. měsíce: ${x.meals}`)).join("; "),
    simDecisions: "Každé číslo ve hře je rozhodnutí PetPrepu zaznamenané i se zdroji.",
    healthTitle: "Zdraví",
    healthNote: "Jen pro informaci – veterinář to neověřoval. S otázkami ke zdraví svého zvířete se obraťte na veterináře.",
    healthNone: "Naše zdroje zatím neobsahují zdravotní informace specifické pro toto plemeno.",
    checklistTitle: "Před koupí: co si ověřit u chovatele",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Otázky, které je dobré vyjasnit, než si kotě odvezete domů. Body jsou rady veterinářů, organizací na ochranu zvířat a felinologických federací; u každého je uvedený zdroj."
        : "Otázky, které je dobré vyjasnit, než si štěně odvezete domů. Body jsou rady veterinářů, organizací na ochranu zvířat a kynologických svazů; u každého je uvedený zdroj.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Předpisy o minimálním věku, čipování a očkování se v jednotlivých zemích liší – ověřte si pravidla tam, kde žijete.",
    checklistGeneralTitle: "Pro každé plemeno",
    checklistTestsTitle: "Zdravotní vyšetření rodičů u tohoto plemene",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Vyšetření, která felinologická federace vyžaduje před zařazením kočky do chovu" : "Vyšetření, která Royal Kennel Club doporučuje jako minimum",
      best_practice: "Další vyšetření podle osvědčené praxe",
      other_scheme: "Další programy vyšetření u tohoto plemene",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Tento seznam vychází z chovatelských pravidel zahraniční felinologické federace (viz zdroj) a slouží jen k orientaci. Zeptejte se chovatele, jaká vyšetření rodiče mají."
        : "Tyto seznamy pocházejí od britského Royal Kennel Clubu a slouží jen k orientaci; národní kynologické svazy mohou mít vlastní, přísnější pravidla. Zeptejte se chovatelského klubu plemene a chovatele, jaká vyšetření rodiče mají.",
    checklistStatus: {
      none_recommended: "Royal Kennel Club u tohoto plemene v současnosti neuvádí žádná doporučená zdravotní vyšetření před zařazením do chovu. Přesto se chovatele na zdraví rodičů zeptejte.",
      not_found: "Zatím jsme nenašli spolehlivý zdroj, který by uváděl zdravotní vyšetření rodičů u tohoto plemene. Zeptejte se chovatelského klubu plemene a chovatele, jaká vyšetření rodiče mají.",
      not_checked: "Zdravotní vyšetření rodičů u tohoto plemene jsme zatím neověřovali. Zeptejte se chovatelského klubu plemene a chovatele, jaká vyšetření rodiče mají.",
    },
    sourcesTitle: "Zdroje",
    sourcesIntro: "Každý fakt na této stránce odkazuje na jeden z těchto zdrojů.",
    sourcesAll: "Zobrazit všechny zdroje",
    sourcesFewer: "Zobrazit méně",
    sourceLabel: (id, publisher) => `Zdroj ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulace pro rodiny. Tato stránka není veterinární rada – v otázkách péče o skutečné zvíře se poraďte s veterinářem nebo s chovatelským klubem plemene.",
    backTo: (many) => `Všechna plemena ${gen(many)}`,
    compareWith: "Porovnat s jinými plemeny",
    related: { title: "Podobná plemena", intro: (many) => `Další plemena ${gen(many)} v encyklopedii s podobnými potřebami – každé s fakty ze zdrojů.` },
    updated: "Aktualizováno",
    glanceTitle: "Ve zkratce",
    glanceNote: "Nejdůležitější fakta ze zdrojů uvedených dole na stránce. Když se zdroje liší, uvádíme každou hodnotu.",
    portraitAlt: { ai_photo: (name) => `${name} – fotografie (AI)`, ai_illustration: (name) => `${name} – ilustrace (AI)` },
    portraitCaption: { ai_photo: "Fotografie vytvořená AI", ai_illustration: "Ilustrace vytvořená AI" },
    portraitColours: {
      legend: "Zbarvení srsti",
      alt: { ai_photo: (name, colour) => `${name}, zbarvení: ${lc(colour)} – fotografie (AI)`, ai_illustration: (name, colour) => `${name}, zbarvení: ${lc(colour)} – ilustrace (AI)` },
    },
    share: {
      button: "Sdílet",
      title: "Sdílet toto plemeno",
      copy: "Kopírovat",
      copied: "Zkopírováno",
      linkLabel: "Odkaz na tuto stránku",
      more: "Další možnosti",
      text: (name) => `${name}: potřeby, zdroje a jak plemeno simuluje PetPrep`,
      emailSubject: (name) => `${name} – encyklopedie zvířat PetPrep`,
      on: (network) => `Sdílet: ${network}`,
    },
    og: { lead: "Potřeby, zdroje a jak plemeno simuluje PetPrep", photoLabel: "Fotografie AI" },
    qa: {
      title: "Otázky a odpovědi",
      intro: "Odpovídáme jen na základě faktů ze zdrojů na této stránce; u každé odpovědi uvádíme její zdroje.",
      // Breed names are lower case in running text ("německý ovčák", "border kolie") and stay in the nominative; the
      // wording avoids past tense and adjectives that would have to agree with the gender of the name ("bengálská kočka").
      questions: {
        exercise: (n) => `Kolik pohybu potřebuje ${mid(n)}?`,
        lifespan: (n) => `Jak dlouho žije ${mid(n)}?`,
        size: (n) => `Jaké velikosti a hmotnosti dosahuje ${mid(n)}?`,
        grooming: (n) => `Jakou péči o srst potřebuje ${mid(n)}?`,
        suits: (n) => `Komu se hodí ${mid(n)}?`,
      },
      leads: {
        exercise: (n) => `Podle našich zdrojů potřebuje ${mid(n)} tolik pohybu:`,
        lifespan: (n) => `Délka života (${mid(n)}) podle našich zdrojů:`,
        size: (n) => `Velikost a hmotnost (${mid(n)}) podle našich zdrojů:`,
        grooming: (n) => `Srst a péče o ni (${mid(n)}) podle našich zdrojů:`,
        suits: (n) => `Podle našich zdrojů se ${mid(n)} hodí:`,
      },
      considerLead: "Mějte na paměti:",
      differ: "Zdroje uvádějí různé hodnoty, proto uvádíme každou.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolský pastevecký pes je velký, mohutně stavěný pes k ochraně stád z Turecka; FCI popisuje tureckého pasteveckého psa jako kangala (Kangal Shepherd Dog) — jednobarevného, od plavé po vlčí sobolí s černou maskou, s kohoutkovou výškou 72–78 cm u psů a 65–73 cm u fen. Americký standard plemene uvádí 110–150 liber (asi 50–68 kg) u psů a 80–120 liber (asi 36–54 kg) u fen. Pes této velikosti dorůstá zhruba v 18–24 měsících (PetMD); The Royal Kennel Club uvádí délku života přes 10 let a WebMD v průměru 11 až 13 let.",
        "The Royal Kennel Club doporučuje více než 2 hodiny pohybu denně a péči o srst víckrát týdně, uvádí, že pelichá a hodí se do velkého domu s velkou zahradou na venkově, a řadí ho do kategorie 1 programu Breed Watch. PetMD píše, že anatolský pastevecký pes se nejspíš nejlépe hodí do domácnosti bez malých dětí, že štěňata seznámená s jinými zvířaty včas s nimi obvykle vycházejí, že klíčová je časná socializace, že srst mimo línání dvakrát ročně stačí kartáčovat jednou týdně a že kolem krmení je třeba se vyhnout pohybu.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irský červený setr, Irish Setter",
      text: [
        "Irský setr (irský červený setr) je štíhlý, atletický ohař z Irska, vyšlechtěný k hledání zvěře na rozlehlém terénu. Standard FCI popisuje jedinou barvu – sytě kaštanovou bez stopy černé – a výšku 58–67 cm u psů a 55–62 cm u fen; americký standard plemene uvádí jako ideál asi 70 liber (přibližně 32 kg) u psa a 60 liber (přibližně 27 kg) u feny. Pes této velikosti dorůstá zhruba v 15–18 měsících (PetMD) a The Royal Kennel Club uvádí délku života přes 10 let.",
        "The Royal Kennel Club doporučuje více než 2 hodiny pohybu denně a péči o srst víc než jednou týdně, uvádí, že líná a hodí se do velkého domu s velkou zahradou, a řadí ho do kategorie 1 programu Breed Watch. PDSA ho popisuje jako velmi přátelského a mazlivého psa, který dobře vychází s dětmi i jinými zvířaty, a radí péči o srst 2–3krát týdně; PetMD doporučuje každý týden kontrolovat a čistit uši a píše, že irští setři potřebují hodně lidské společnosti.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Griffon Bruxellois, Brussels Griffon",
      text: [
        "Bruselský grifonek (Griffon Bruxellois) je malý společenský pes z Belgie s krátkým, plochým obličejem. Standard FCI popisuje červenou, přirozeně tvrdou, mírně zvlněnou srst a hmotnost 3,5–6 kg; britský Royal Kennel Club, který uznává drsnosrstou i hladkosrstou varietu, ho popisuje jako chytrého malého psa s povahou teriéra. Pes této velikosti dorůstá zhruba v 8–12 měsících (PetMD) a Royal Kennel Club uvádí délku života přes 12 let (PetMD: 12–15 let).",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst víc než jednou týdně, uvádí, že pes líná a hodí se do bytu, a řadí plemeno do kategorie 2 programu Breed Watch. PetMD ho popisuje jako psa s plochým obličejem (brachycefalického), který špatně snáší horké a vlhké počasí, radí čistit kožní záhyby na obličeji zhruba jednou týdně a denně čistit zuby a píše, že bruselští grifonci pod dohledem dobře vycházejí s dětmi a jinými zvířaty, ale neradi zůstávají dlouho sami.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, americký rat teriér, Rat Terrier",
      text: [
        "Rat teriér je malý americký teriér chovaný ve dvou velikostech – miniaturní a standardní – s krátkou, přiléhavou, hladkou a lesklou srstí. Standard plemene připouští výšku v kohoutku až 18 palců (46 cm) a PetMD uvádí pro obě velikosti hmotnost 10–25 liber (asi 4,5–11 kg); pes této velikosti je dorostlý přibližně v 9–12 měsících (PetMD). VCA uvádí délku života 12–16 let, PetMD 12–18 let.",
        "Rat Terrier Club of America uvádí, že rat teriéři dobře vycházejí s dětmi, zvlášť pokud s nimi vyrůstají, a zvládnou byt, ale potřebují alespoň 30 minut pohybu denně. PetMD píše, že potřebují hodně fyzické i duševní stimulace, nemají rádi dlouhou samotu a celý rok mírně línají; VCA doporučuje kartáčování jednou týdně a upozorňuje, že nemusí vycházet s malými zvířaty, zvlášť s hlodavci.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    shar_pei: {
      aka: "Shar Pei, čínský šar-pej, Chinese Shar-Pei",
      text: [
        "Šar-pej (v USA „Chinese Shar-Pei“) je aktivní, kompaktní, čtvercově stavěný středně velký pes z Číny s krátkou, tvrdou, štětinatou srstí jedné barvy (jakékoli kromě bílé), vráskami na hlavě a kohoutku a širokou tlamou. Standard Royal Kennel Clubu uvádí výšku 46–51 cm a PDSA hmotnost 20–27 kg; pes této velikosti je dorostlý přibližně ve 12–15 měsících (PetMD). Royal Kennel Club a PDSA uvádějí délku života přes 10 let, studie VetCompass u psů ve Velké Británii však zjistila medián 7,3 roku.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a kartáčování jednou týdně a řadí plemeno do kategorie 2 programu Breed Watch kvůli problémům s víčky a kožními záhyby. PDSA popisuje šar-peje jako věrné, oddané rodinné psy, kteří se nejlépe hodí ke zkušeným majitelům a starším dětem, upozorňuje na silný lovecký pud vůči menším zvířatům a radí udržovat kožní záhyby čisté a suché a mezi krmením a pohybem nechat odstup.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border kolie je středně velký pastevecký pes z Velké Británie, stvořený pro vytrvalost a tvrdou práci. Standard plemene ho popisuje jako horlivého, ostražitého, vnímavého a inteligentního psa, který není ani nervózní, ani agresivní.",
        "Kynologické svazy i veterináři se shodují především v jednom: je to plemeno s velmi velkým množstvím energie. Potřebuje více než dvě hodiny pohybu denně a spoustu podnětů pro hlavu. Když se nudí nebo nemá dost pohybu, najde si práci sám – okusuje, co je v dosahu, nebo se snaží nahánět hrající si děti.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador, Labrador Retriever",
      text: [
        "Labradorský retrívr je velký, silně stavěný lovecký pes z Velké Británie, vyšlechtěný k přinášení. Standard ho popisuje jako dobromyslného, laskavého a přizpůsobivého společníka, který se rád zavděčí a miluje vodu. Srst je krátká a hustá, černá, žlutá nebo játrová/čokoládová.",
        "Britské dobročinné organizace popisují labradora jako rodinného psa, který si při dobré socializaci vytvoří pouto s celou domácností. Je velmi aktivní a silně ho motivuje jídlo: pamlsky pomáhají při výcviku, ale labradoři mají také sklon k přibírání.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden retrívr, golden, Golden Retriever",
      text: [
        "Zlatý retrívr je velký lovecký pes z Velké Británie s rovnou nebo vlnitou srstí v odstínech zlaté nebo krémové. Standard ho popisuje jako ovladatelného, inteligentního psa, který je laskavý, přátelský a sebejistý.",
        "Britské dobročinné organizace ho označují za skvělého rodinného psa pro aktivní rodinu, který se může hodit i jako první pes. Kompromisy jsou ve zdrojích jasné: nejméně dvě hodiny pohybu denně, kartáčování několikrát týdně a srst, která hodně líná.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "buldoček, frenchie, French Bulldog",
      text: [
        "Francouzský buldoček je malý, podsaditý společenský pes z Francie s krátkou, hladkou srstí a vztyčenýma „netopýříma ušima“. Standard ho popisuje jako společenského, živého a hravého psa; britské dobročinné organizace ho označují za pohodového a přizpůsobivého a uvádějí, že s dětmi obvykle dobře vychází, a proto se stal oblíbeným rodinným mazlíčkem.",
        "Potřebuje až hodinu pohybu denně a hodí se do bytu. Kompromisem, který zmiňují všechny zdroje, je plochý obličej: může ztěžovat dýchání a buldočci se rychle přehřívají, zvlášť v teplém počasí – proto je důležitý stín, voda a klidné procházky. PDSA doporučuje, aby rodiny zvážily i adopci dospělého francouzského buldočka.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "NO, vlčák, German Shepherd, Alsatian",
      text: [
        "Německý ovčák je velký, silný pastevecký pes z Německa se vztyčenýma ušima a hustou dvojitou srstí, krátkou nebo dlouhou. Standard ho popisuje jako vyrovnaného, sebejistého psa s pevnými nervy a Royal Kennel Club ho označuje za všestranného pracovního a služebního psa, známého odvahou a inteligencí.",
        "Potřebuje nejméně dvě hodiny pohybu denně, hodí se do velkého domu se zahradou a hodně líná. Britské dobročinné organizace uvádějí, že někteří mohou být skvělými rodinnými mazlíčky, ale s malými dětmi by měli být vždy pod dohledem. Royal Kennel Club žádá chovatele, aby nechali rodičům vyšetřit kyčle a lokty, a tvar zadních končetin uvádí u plemene jako problematický bod.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "kavalír, Cavalier, CKCS",
      text: [
        "Kavalír King Charles španěl je malý společenský španěl z Velké Británie s dlouhýma, osrstěnýma ušima a dlouhou, hedvábnou srstí ve čtyřech barvách: blenheim, ruby, černá s pálením a trikolor. Standard ho popisuje jako aktivního, půvabného psa s jemným výrazem – sportovního, mazlivého, přátelského a nebojácného.",
        "Potřebuje přibližně hodinu pohybu denně, může žít v bytě a je známý tím, že dobře vychází s dětmi (hra by ale měla probíhat pod dohledem), a nerad zůstává sám. Srst je třeba kartáčovat víc než jednou týdně. Britské zdroje uvádějí jako hlavní zdravotní rizika onemocnění srdečních chlopní a bolestivé onemocnění páteře související s tvarem lebky, proto se od chovatelů žádá vyšetření srdce a vyšetření magnetickou rezonancí.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      aka: "bígl, Beagle",
      text: [
        "Bígl je malý honič z Velké Británie, vyšlechtěný k lovu zajíců po stopě. Standard ho popisuje jako statného, kompaktně stavěného, veselého honiče – odvážného, aktivního a ostražitého, přívětivého, bez agresivity či bázlivosti – s krátkou, hustou srstí v barvách honičů, například trikolor, pálená s bílou nebo citronová s bílou, a vždy s bílou špičkou ocasu.",
        "Potřebuje až zhruba hodinu pohybu denně a do rodinného života se dobře hodí, pokud je od mládí socializovaný; s dětmi by ale měl být pod dohledem a neměl by zůstávat sám, protože pak může štěkat a ničit věci. Krátkou srst stačí kartáčovat jednou týdně, bígl ale líná. S výcvikem je dobré začít brzy a používat odměny. Britští veterináři u bíglů nejčastěji řeší nadváhu a onemocnění zubů, proto je třeba hlídat porce i zuby.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "pudl, velký pudl, Standard Poodle",
      text: [
        "Pudl velký je největší ze čtyř velikostí pudla, společenské plemeno z Francie, které pochází z evropských psů na lov kachen. Standard ho popisuje jako elegantního, vyváženého psa s hrdým držením těla – věrného, veselé povahy a dobromyslného, schopného se učit a cvičit – s bohatou, kadeřavou srstí v jedné jednolité barvě: černé, bílé, hnědé, šedé nebo plavé.",
        "Potřebuje až zhruba hodinu pohybu denně a hodí se do velkého domu s velkou zahradou. Se správnou socializací ve štěněcím věku obvykle dobře vychází s dětmi i s jinými zvířaty. Srst nelíná, to ho ale nedělá hypoalergenním: potřebuje každodenní péči a pravidelné stříhání u profesionálního groomera. Je známý tím, že je velmi poslušný a na výcvik dobře reaguje.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "jezevčík, hladkosrstý jezevčík, Dachshund, Teckel",
      text: [
        "Jezevčík je německý lovec jezevců a králíků, doma nazývaný Teckel, který existuje v několika velikostech a se třemi typy srsti; tato stránka se týká standardní velikosti s hladkou srstí. Standard ho popisuje jako psa přiměřeně dlouhého v poměru k výšce, bez přehnaných rysů – věrného, všestranného a dobromyslného, inteligentního, živého a odvážného – s hustou, krátkou, hladkou srstí v červené barvě nebo černé či čokoládové s pálením.",
        "Potřebuje až zhruba hodinu pohybu denně, rozdělenou do několika procházek s časem na očichávání, a hodí se do malého domu. Má rád lidi a s dětmi všech věků obvykle dobře vychází, vždy pod dohledem; kvůli silnému loveckému pudu se ale nedoporučuje k menším zvířatům a nesnáší dobře samotu. Kvůli dlouhému hřbetu a krátkým nohám má sklon k výhřezu ploténky, proto by neměl skákat; od chovatelů se žádá vyšetření páteře před zařazením do chovu.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie, Australian Shepherd",
      text: [
        "Australský ovčák je navzdory svému jménu americké plemeno – inteligentní pracovní pes se silným pasteveckým a strážním instinktem. Standard ho popisuje jako vyváženého psa střední velikosti, o něco delšího než vyššího, dobré povahy a při prvním setkání někdy zdrženlivého, se středně dlouhou, rovnou až vlnitou srstí v barvách blue merle, černá, red merle nebo červená, u všech s bílými znaky a pálením nebo bez nich.",
        "Potřebuje více než dvě hodiny pohybu denně a úkoly pro hlavu, například hlavolamy a výcvik, a hodí se do velkého domu s velkou zahradou na venkově. Ve správné domácnosti může být opravdu dobrým rodinným psem, silný pastevecký instinkt ho ale může vést k nahánění dětí, proto se nedoporučuje do rodin s menšími dětmi. Nerad zůstává sám a jeho srst je třeba kartáčovat několikrát týdně.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "havanský psík, havaňák, Havanese, Bichon Havanais",
      text: [
        "Havanský psík je malý zástupce rodiny bišonků a národní pes Kuby. Standard ho popisuje jako statného malého psa na nízkých nohách s velmi dlouhou, jemnou, rovnou nebo vlnitou srstí, která se nikdy nezastřihává, a s ocasem neseným vysoko nad hřbetem. Vyskytuje se v barvě plavé, černé, havanské hnědé, tabákové, červenohnědé a vzácně bílé, se skvrnami a pálením nebo bez nich.",
        "Standard ho označuje za mazlivého, hravého a tak trochu klauna a uvádí, že miluje děti a dokáže si s nimi donekonečna hrát; britské zdroje ho při správné socializaci označují za vynikajícího rodinného mazlíčka, který se snadno cvičí. Potřebuje přibližně 30 minut pohybu denně, může žít v bytě a nelíná – jeho dlouhá srst ale potřebuje péči každý den, aby se necuchala a netvořily se v ní chuchvalce.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westík, westie, West Highland White Terrier",
      text: [
        "West highland white teriér, zkráceně westík, je malý teriér z Velké Británie. Standard ho popisuje jako silně stavěného malého psa s hlubokým hrudníkem, rovným hřbetem a drsnou dvojitou srstí dlouhou asi 5 cm, s malýma vztyčenýma špičatýma ušima a tmavýma očima pod hustým obočím. Jedinou barvou, kterou standard povoluje, je bílá.",
        "Standard ho označuje za ostražitého, veselého, odvážného a samostatného, ale přátelského. Britské zdroje ho popisují jako mazlivého, hravého rodinného mazlíčka pro děti každého věku, hra by však měla být vždy pod dohledem; potřebuje přibližně hodinu pohybu denně, může žít v bytě, líná a je třeba ho kartáčovat několikrát týdně. Kvůli loveckému pudu by neměl žít s menšími zvířaty a nerad zůstává sám. Známým problémem je kůže: Royal Kennel Club žádá rozhodčí, aby si u plemene všímali známek zánětu kůže.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berňák, bernský salašník, Bernese Mountain Dog, Berner Sennenhund",
      text: [
        "Bernský salašnický pes je velký švýcarský statkářský pes, původně používaný v kantonu Bern jako hlídač, tažný a honácký pes. Standard ho popisuje jako silného, hbitého dlouhosrstého pracovního psa s pevnými končetinami a dlouhou, lesklou, rovnou nebo mírně vlnitou srstí. Jediné zbarvení, které standard povoluje, je trikolor: sytě černá s výrazným pálením na lících, nad očima, na končetinách a hrudi a s bílými znaky na hlavě a hrudi.",
        "Standard ho označuje za sebejistého, dobromyslného a přátelského, za „laskavého a oddaného rodinného psa“, který pomalu dospívá. Britské zdroje uvádějí, že potřebuje až hodinu pohybu denně, patří do velkého domu s velkou zahradou, hodně líná a je třeba ho kartáčovat víc než jednou týdně; neměl by zůstávat dlouho sám. Obvykle se dožívá méně než deseti let a britské zdroje mezi jeho zdravotními riziky uvádějí dysplazii kyčelních a loketních kloubů, torzi žaludku a některé druhy nádorových onemocnění.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky, Siberian Husky",
      text: [
        "Sibiřský husky je středně velký pracovní saňový pes, kterého FCI uznává jako americké plemeno a který je podle Royal Kennel Clubu nejlehčí a nejrychlejší ze saňových psů. Standard žádá psa rychlého a lehkého v pohybu, s dvojitou, středně dlouhou srstí, hustě osrstěnýma vztyčenýma ušima, hnědýma nebo modrýma očima (povoleno je i jedno od každého) a dobře osrstěným ocasem. Barvy sahají od černé po čistě bílou; merle a žíhaná nejsou povoleny.",
        "Standard ho označuje za přátelského a jemného, ostražitého a otevřeného. Britské zdroje uvádějí, že potřebuje více než dvě hodiny pohybu denně, velký dům s velkou zahradou a velmi bezpečný, vysoký plot, protože husky jsou známí tím, že utíkají; hodně líná, je třeba ho kartáčovat několikrát týdně a samotu snáší špatně. PDSA ho doporučuje spíše do domácností jen s dospělými nebo s dospívajícími než do rodin s menšími dětmi a mezi jeho zdravotními riziky uvádí dysplazii kyčelních kloubů, problémy s očima a epilepsii.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "rotvajler, rotík, Rottweiler",
      text: [
        "Rotvajler je středně velký až velký, silný pracovní pes z Německa. Standard ho popisuje jako statného psa, ani těžkého, ani lehkého, s krátkou, hrubou, přiléhavou srstí, středně velkýma klopenýma ušima a tmavě hnědýma mandlovitýma očima. Jediné povolené zbarvení je černé s ostře ohraničeným sytě hnědým pálením na lících, čenichu, hrdle, hrudi a končetinách; bílé znaky jsou vadou.",
        "Standard ho označuje za dobromyslného, klidného, velmi oddaného, poslušného a ochotného pracovat a Royal Kennel Club uvádí, že dobře vycvičený rotvajler je skvělým rodinným společníkem. Britské zdroje uvádějí, že potřebuje více než dvě hodiny pohybu denně, velký dům s velkou zahradou a zkušeného majitele, protože je velmi silný; měl by být socializovaný od mládí. PDSA ho nedoporučuje do rodin s menšími dětmi a miminky a s jinými zvířaty by nikdy neměl zůstávat bez dozoru. Stačí ho kartáčovat jednou týdně. Obvykle se dožívá méně než deseti let a Royal Kennel Club sleduje tvar jeho zadních končetin.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "anglický buldok, buldok, English Bulldog, British Bulldog",
      text: [
        "Anglický buldok je středně velký krátkosrstý pes z Velké Británie: poměrně zavalitý, nízký, široký, silný a kompaktní, s relativně krátkým obličejem, malýma tenkýma růžicovitýma ušima a kulatýma, velmi tmavýma očima. Standard povoluje jednobarevná zbarvení, například červenou, plavou, světle plavou a bílou, dále žíhané a strakaté; černá a černá s pálením jsou vysoce nežádoucí. Žádá velké, široce otevřené nozdry a uvádí, že psi s dýchacími obtížemi jsou vysoce nežádoucí.",
        "Standard ho označuje za ostražitého, odvážného, věrného, spolehlivého a statečného, na pohled zarputilého, ale mazlivého, a Royal Kennel Club uvádí, že pro svou povahu a věrnost zůstává velmi oblíbeným rodinným společníkem. Britské zdroje uvádějí, že potřebuje až hodinu pohybu denně, nikdy ne v denním horku, a při socializaci v mládí dobře vychází s ostatními zvířaty v domácnosti; srst stačí ošetřit jednou týdně, vrásky na obličeji je ale třeba čistit denně. PDSA ho popisuje jako plemeno s výrazně plochým obličejem, u kterého jsou vážné zdravotní problémy, například potíže s dýcháním, velmi pravděpodobné, a důrazně doporučuje zvážit zdravější plemeno, křížence nebo voříška. Obvykle se dožívá méně než deseti let.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "krátkosrstý ohař, kurzhaar, Deutsch Kurzhaar, German Shorthaired Pointer, GSP",
      text: [
        "Německý krátkosrstý ohař je všestranný lovecký pes z Německa, stavěný pro práci v poli i ve vodě, s krátkou, hustou srstí, která je na omak tvrdá, širokýma plochýma vysoko nasazenýma ušima a tmavě hnědýma mandlovitýma očima. Jeho americký standard povoluje jednobarevnou hnědou, hnědou s bílou (například tečkovanou), jednobarevnou černou a černou s bílou; červené, oranžové, citronové nebo pálené plochy a čistě bílý pes vedou k diskvalifikaci. Standard popisuje kupírovaný ocas – PetPrep psa vždy zobrazuje s přirozeným ocasem.",
        "Standard ho označuje za přátelského, inteligentního a ochotného vyhovět. Royal Kennel Club i PDSA uvádějí, že potřebuje více než dvě hodiny pohybu denně; PDSA dodává, že se na procházce může probudit jeho instinkt vyhledávat, vystavovat a přinášet zvěř, proto potřebuje dobře nacvičené přivolání, a že se poměrně snadno cvičí. Srst potřebuje péči jednou až dvakrát týdně a středně líná. Rozsáhlá britská studie uvádí medián očekávané délky života 13,4 roku.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "jorkšír, yorkie, Yorkshire Terrier",
      text: [
        "Jorkšírský teriér je trpasličí teriér z Velké Británie, který podle standardu váží až 3,2 kg, s dlouhou, dokonale rovnou, lesklou a hedvábnou srstí, která rovnoměrně splývá na obě strany od pěšinky podél hřbetu. Standard povoluje jedno zbarvení: tmavě ocelově modrou od týlu po ocas se sytým, jasným pálením na hlavě, hrudi a končetinách; malé uši ve tvaru V jsou nesené vztyčeně. Standard popisuje kupírovaný i nekupírovaný ocas – PetPrep psa vždy zobrazuje s přirozeným ocasem.",
        "Standard ho označuje za ostražitého, inteligentního a temperamentního, s vyrovnanou povahou. Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst každý den; PDSA dodává, že rád běhá, aportuje a hraje si, při výcviku umí být dost tvrdohlavý a kvůli velmi křehkým kostem se lépe hodí do rodin se staršími dětmi. Rozsáhlá britská studie zjistila, že nejčastějším problémem plemene je onemocnění zubů, doporučuje každodenní péči o zuby, například čištění, a zjistila medián věku úmrtí 13,56 roku.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "corso, Cane Corso Italiano, italský corso",
      text: [
        "Cane corso je středně velký až velký italský molos, robustní a statný pes s jistou elegancí, o něco delší než vyšší. Standard popisuje krátkou, lesklou, velmi hustou srst v barvě černé, v odstínech šedé, plavé nebo červené s tmavou maskou, tmavě pšeničné nebo žíhané; velké bílé skvrny nejsou povoleny. Podle současného standardu FCI zůstávají uši nekupírované a ocas přirozený – a ve Velké Británii je kupírování nezákonné –, proto PetPrep psa vždy zobrazuje s přirozenýma ušima a ocasem.",
        "Standard ho označuje za strážce majetku, rodiny a stáda, mimořádně hbitého a vnímavého. PDSA uvádí, že je ke svým majitelům společenský a láskyplný, potřebuje přibližně dvě hodiny pohybu denně a zaměstnání, protože nesnáší nudu, a že se kvůli své velikosti lépe hodí ke zkušeným majitelům. Nedoporučuje ho do domácností s malými dětmi, které by mohl porazit; hodí se do domácností jen s dospělými nebo do rodin se staršími dětmi. Stačí ho kartáčovat jednou týdně, ale líná a je známý tím, že slintá. PDSA uvádí průměrnou délku života pod deset let.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, pembroke, Pembroke Welsh Corgi",
      text: [
        "Welsh corgi pembroke je malý honácký pes z Walesu, nízký, silný a statně stavěný, který působí dojmem síly a vytrvalosti v malém těle. Standard popisuje středně dlouhou, rovnou srst s hustou podsadou v barvě červené, sobolí, plavé nebo černé s pálením, s bílými znaky na končetinách, hrudi a krku nebo bez nich, a vztyčené uši. Ocas se dříve běžně kupíroval; standard popisuje i přirozený ocas a PetPrep psa vždy zobrazuje s přirozeným ocasem.",
        "Standard ho označuje za odvážného, pracovitého, otevřeného a přátelského. Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst víc než jednou týdně; PDSA popisuje přátelské, veselé, hravé psy, kteří se rádi zavděčí a poměrně snadno se cvičí, ale mohou chňapat po patách běhajících dětí, proto pomáhá socializace s dětmi a výcvik od mládí. Royal Kennel Club uvádí délku života přes 12 let a žádá chovatele, aby nechali rodičům vyhodnotit kyčle.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "dobrman, dobermann, Doberman Pinscher",
      text: [
        "Dobrman je německý společenský, ochranný a pracovní pes střední velikosti, silný a svalnatý, s elegantními liniemi a hrdým postojem. Standard FCI popisuje krátkou, tvrdou, hustou srst, která přiléhá těsně a hladce, v černé nebo hnědé barvě s ostře ohraničeným rezavě červeným pálením; bílé skvrny nejsou povoleny. Uši i ocas zůstávají podle standardu FCI přirozené a PetPrep psa vždy zobrazuje s přirozenýma ušima a ocasem.",
        "Standard ho označuje za přátelského a klidného a velmi oddaného rodině. Royal Kennel Club uvádí, že díky věrné a poslušné povaze je výborným rodinným psem, a doporučuje více než dvě hodiny pohybu denně a péči o srst jednou týdně. PDSA dodává, že je velmi energický, potřebuje hodně duševní i fyzické aktivity a včasnou socializaci a že se kvůli své velikosti a silné stavbě těla nedoporučuje do rodin s malými dětmi ani začínajícím majitelům. Royal Kennel Club uvádí délku života přes 10 let.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "německý boxer, Boxer, Deutscher Boxer",
      text: [
        "Boxer je německý pracovní a společenský pes střední velikosti se čtvercovou stavbou těla, silnými kostmi a dobře vyvinutým svalstvem. Standardy popisují krátkou, lesklou, hladkou srst v barvě plavé nebo žíhané s černou maskou; bílé znaky jsou povoleny, neměly by ale pokrývat více než třetinu srsti. Čenich by měl být široký a hluboký, nikdy krátký, se širokými nozdrami. Ocas se dříve běžně kupíroval; standard popisuje i nekupírovaný ocas a PetPrep psa vždy zobrazuje s přirozenýma ušima a ocasem.",
        "Standard ho označuje za vyrovnaného, ovladatelného, nebojácného a sebejistého. Royal Kennel Club o něm píše, že je velmi oblíbeným rodinným společníkem, a doporučuje více než dvě hodiny pohybu denně a péči o srst jednou týdně. PDSA popisuje velmi energického, hravého psa, který miluje lidskou společnost a může mít separační úzkost, když zůstává sám, má velmi silný lovecký pud a kvůli své velikosti a bouřlivé povaze se nedoporučuje do domácností s menšími dětmi ani začínajícím majitelům; někteří boxeři s kratším obličejem mohou mít vážné potíže s dýcháním. Royal Kennel Club uvádí délku života přes 10 let.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "trpasličí knírač, Zwergschnauzer, Miniature Schnauzer",
      text: [
        "Knírač malý je malý německý společenský pes: silný, zavalitý a téměř čtvercový, s drsnou, drátovitou, hustou srstí, huňatým obočím a vousy. Standard FCI povoluje barvu pepř a sůl, černou se stříbrnou, čistě černou a čistě bílou; PetPrep zobrazuje první tři. Ocas se dříve běžně kupíroval a uši někdy také; standard FCI žádá přirozený ocas a klopené uši a PetPrep psa vždy zobrazuje s přirozenýma ušima a ocasem.",
        "FCI ho řadí mezi psy do domu a společníky a Royal Kennel Club uvádí, že je jako společník velmi oblíbený. Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst víc než jednou týdně a uvádí, že nelíná. PDSA popisuje hravého, zvědavého psa, který může s dětmi dobře vycházet, pokud se s nimi seznámí v raném věku, při výcviku umí být tvrdohlavý a potřebuje péči o srst dvakrát až třikrát týdně a k tomu občas stříhání nebo trimování u profesionálního groomera. Royal Kennel Club uvádí délku života přes 10 let.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "shih-tzu, šicu, Shih Tzu",
      text: [
        "Shih-tzu je malý společenský pes z Tibetu; jeho standard FCI spravuje Velká Británie. Standardy popisují statného psa s bohatou srstí, hrdým držením těla a obličejem „připomínajícím chryzantému“: s dlouhou, hustou krycí srstí, velkýma tmavýma kulatýma očima, velkýma svěšenýma ušima a bohatě osrstěným ocasem neseným nad hřbetem. Standardy povolují mnoho barev; PetPrep zobrazuje zlatou s bílou, černou s bílou a játrovou s bílou, nikdy merle. Čenich je krátký a plochý a PDSA uvádí potíže s dýcháním způsobené kratším obličejem, proto PetPrep vždy kreslí přiměřený obličej s otevřenými nozdrami.",
        "FCI ho popisuje jako inteligentního, aktivního a ostražitého, přátelského a samostatného. Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst každý den a jako vhodný domov uvádí i byt. PDSA uvádí, že shih-tzu mohou být dobromyslnými rodinnými mazlíčky, pokud prošli správnou socializací a výcvikem, označuje je za ideálního mazlíčka pro začínající majitele, doporučuje mít je s dětmi vždy pod dohledem a u většiny psů chovaných pro radost doporučuje každodenní kartáčování a k tomu stříhání u profesionálního groomera každých šest až osm týdnů. Royal Kennel Club uvádí délku života přes 10 let.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "doga, Deutsche Dogge, Great Dane",
      text: [
        "Německá doga je německý obr: standard FCI uvádí, že spojuje velké, silné a dobře stavěné tělo s hrdostí, silou a elegancí, s dlouhou, úzkou hlavou, přirozeně svěšenýma ušima a velmi krátkou, hladkou, lesklou srstí. Standardy uvádějí žlutou a žíhanou – ideálně s černou maskou – a také tygrovanou (harlekýn), černou a modrou; PetPrep zobrazuje jen barvy, které uvádí FCI i Royal Kennel Club, nikdy merle ani plášťovou, a psa vždy kreslí s přirozenýma ušima a ocasem a těsně přiléhajícími víčky, protože Royal Kennel Club žádá rozhodčí, aby si všímali víček stočených dovnitř nebo ven a slabých zadních končetin.",
        "FCI ji označuje za přátelskou, láskyplnou a oddanou majitelům, i když k cizím může být zdrženlivá. Royal Kennel Club uvádí, že je navzdory své velikosti skvělým rodinným psem, a doporučuje více než dvě hodiny pohybu denně, velký dům se zahradou a péči o srst jednou týdně. PDSA uvádí, že dogy jsou známé slintáním, mají poměrně silný lovecký pud a kvůli své velikosti a síle se nedoporučují do domácností s menšími dětmi; radí dodržovat odstup mezi krmením a pohybem, což pomáhá předcházet torzi žaludku. Royal Kennel Club uvádí délku života pod 10 let.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "trpasličí špic, německý špic trpasličí, Pomeranian, Zwergspitz",
      text: [
        "Pomeranian je nejmenší špic: FCI ho vede jako trpasličí varietu německého špice s výškou v kohoutku 21 cm ± 3 cm a standard Royal Kennel Clubu popisuje kompaktního, krátce stavěného malého psa s liščí hlavou, malýma vztyčenýma ušima a ocasem stočeným nad hřbet. Dvojitá srst má jemnou, nadýchanou podsadu a dlouhou, rovnou krycí srst, která kolem krku tvoří límec. Standard povoluje mnoho jednobarevných zbarvení, například oranžovou, krémovou, bílou, černou a hnědou, nikdy však merle; PetPrep kreslí přirozenou, nezastřiženou srst.",
        "FCI označuje jeho povahu za společenskou a veselou a standard Royal Kennel Clubu ho popisuje jako extrovertního, živého a inteligentního. Royal Kennel Club doporučuje až 30 minut pohybu denně a jako vhodný domov uvádí byt; PDSA uvádí, že jeho dvojitou srst je třeba kartáčovat dvakrát až třikrát týdně. AKC uvádí, že pomeraniani se spíše hodí do rodin se staršími dětmi, při včasné socializaci mohou dobře vycházet s jinými zvířaty, a včasnou socializaci a štěněcí kurzy důrazně doporučuje. Royal Kennel Club uvádí délku života přes 12 let.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston teriér, Boston Terrier, American Gentleman",
      text: [
        "Bostonský teriér pochází ze Spojených států. Standard FCI popisuje živého, velmi inteligentního, krátkosrstého psa s krátkou hlavou, kompaktní stavbou těla, krátkým ocasem a vyváženými proporcemi, žíhaného, tuleně hnědého nebo černého a rovnoměrně bíle značeného: bílý pruh kolem čenichu, bílá lysina mezi očima a bílé předhrudí jsou povinné a žíhaná barva se upřednostňuje. PetPrep ho kreslí žíhaného s bílou, s přiměřeným čenichem, otevřenými nozdrami a přirozenýma ušima a ocasem.",
        "Jde o plemeno s plochým obličejem (brachycefalické) a PDSA upozorňuje, že by nikdy neměl mít pohyb v denním horku, protože má sklon k přehřátí. Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst jednou týdně, jako vhodný domov uvádí byt a délku života přes 10 let. PDSA označuje bostonské teriéry za dokonalé rodinné mazlíčky, kteří jsou při dobré socializaci ve štěněcím věku obzvlášť dobří k dětem; AKC uvádí, že dobře vycházejí s dětmi, které se umí ke zvířatům chovat jemně, špatně snášejí dlouhou samotu, a včasnou socializaci a štěněcí výcvik důrazně doporučuje.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "malý americký ovčák, mini aussie, Miniature American Shepherd",
      text: [
        "Miniaturní americký ovčák pochází ze Spojených států. Standard FCI popisuje malého pasteveckého psa se silným pasteveckým a strážním instinktem, inteligentního a především pracovního, o něco delšího než vyššího, se středně dlouhou, rovnou až vlnitou srstí odolnou vůči počasí. Jeho barvy jsou černá, blue merle, červená a red merle, s bílými znaky a pálením nebo bez nich, a oči mohou být hnědé, modré, oříškové nebo jantarové. PetPrep ho kreslí v barvě blue merle s přirozeným ocasem.",
        "PetMD uvádí, že má hodně energie a potřebuje nejméně hodinu pohybu každý den, ideálně dvě, k tomu úkoly, které zaměstnají jeho hlavu, a že by se měl kartáčovat několikrát týdně; AKC uvádí, že po většinu roku stačí kartáčování jednou týdně a v období línání denně. AKC uvádí, že s výcvikem poslušnosti a včasnou socializací může být skvělým rodinným psem a s dětmi obvykle dobře vychází, může je ale zkoušet nahánět; PetMD dodává, že jeho oddanost rodině může vést k separační úzkosti, když zůstává sám. PetMD uvádí délku života 12 až 13 let.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "čivava, chihuahua, Chihuahueño",
      text: [
        "Čivava pochází z Mexika. Standard Kennel Clubu popisuje malého, půvabného, kompaktního psa s prostořekým výrazem a veselou, temperamentní a inteligentní povahou, s dobře klenutou lebkou tvaru „jablka“, středně krátkým, mírně zašpičatělým čenichem, velkýma kulatýma očima, které nevystupují, velkýma ušima a srpovitým ocasem; povolena je jakákoli barva nebo kombinace barev, nikdy však merle, a upřednostňovaná hmotnost je 1,8–2,7 kg. Royal Kennel Club vede krátkosrstou a dlouhosrstou čivavu jako dvě plemena; PetPrep kreslí krátkosrstou čivavu v plavé barvě s přiměřenou hlavou.",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst jednou týdně, jako vhodný domov uvádí byt a délku života přes 12 let. PDSA uvádí, že čivavy jsou tak malé a lehké, že děti láká brát je do náruče, což se jim nejspíš líbit nebude, proto se lépe hodí do rodin s o něco staršími dětmi. PDSA dodává, že jako společenští psi milují společnost a potřebují, aby byl doma neustále někdo s nimi, a že by se od mládí měly socializovat s mnoha různými lidmi, zážitky a místy.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "špringršpaněl, springer, English Springer Spaniel, ESS",
      text: [
        "Anglický špringršpaněl pochází z Velké Británie, kde byl vyšlechtěn k vyhledávání, vyplašení a přinášení zvěře. Standard Kennel Clubu popisuje souměrně stavěného, kompaktního, silného, veselého a aktivního psa – nejvýše stavěného z britských slídičů – s přátelskou, veselou a ovladatelnou povahou, dlouhýma osrstěnýma ušima, tmavě oříškovýma očima a přiléhavou, rovnou srstí odolnou vůči počasí; barvy jsou hnědá s bílou nebo černá s bílou, obě i s pálením, a přibližná výška je 51 cm. PetPrep ho kreslí hnědobílého s přirozeným ocasem.",
        "Royal Kennel Club doporučuje více než 2 hodiny pohybu denně a péči o srst víc než jednou týdně a uvádí délku života přes 10 let. PDSA uvádí, že špringři jsou dobrými rodinnými psy, kteří dobře vycházejí s dětmi i s ostatními zvířaty v domácnosti, jsou poslušní a dychtiví se učit a potřebují péči o srst jednou až dvakrát týdně a k tomu stříhání každé 3 měsíce. AKC dodává, že by neměli zůstávat dlouho sami a že klíčová je včasná socializace a štěněcí kurzy.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "šeltie, sheltie, Shetland Sheepdog",
      text: [
        "Šeltie (shetlandský ovčák) pochází z Velké Británie a je to malý dlouhosrstý pracovní pes. Standard FCI popisuje ostražitého, jemného, inteligentního, silného a aktivního psa, mazlivého a věrného svému majiteli a zdrženlivého k cizím, s hlavou ve tvaru dlouhého tupého klínu, malýma polovztyčenýma ušima se špičkami sklopenými dopředu a dvojitou srstí s dlouhou, drsnou krycí srstí; barvy jsou sobolí, trikolor, blue merle, černobílá a černá s pálením a ideální výška je 37 cm u psů a 35,5 cm u fen. PetPrep ho kreslí sobolího s bílou.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst každý den a uvádí délku života přes 10 let. PDSA uvádí, že šeltie jsou velmi jemní, hraví a poslušní psi, kteří často dobře zapadnou do rodinného života a spokojeně vycházejí s dětmi, a že výcvik a socializace jsou v mladém věku velmi důležité. AKC dodává, že potřebují pravidelnou duševní i fyzickou aktivitu, kvůli pasteveckému instinktu se nejlépe hodí ke starším dětem a jsou známí tím, že jsou velmi hlasití.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "bretaňský ohař, épagneul breton, Brittany",
      text: [
        "Bretaňský ohař je ohař z Francie, kde se mu říká épagneul breton. Royal Kennel Club popisuje velmi energického, inteligentního psa, který vyhledává, vystavuje a přináší zvěř, jemného a mazlivého, a přesto plného života a temperamentu, s hustou, poměrně jemnou srstí, vysoko nasazenýma trojúhelníkovýma ušima a ocasem, který bývá od přírody krátký; standardní barvy jsou oranžová, hnědá nebo černá s bílou, grošovaná nebo trikolor a výška je 48–51 cm u psů a 47–50 cm u fen. PetPrep ho kreslí oranžovobílého.",
        "Royal Kennel Club doporučuje více než 2 hodiny pohybu denně a péči o srst víc než jednou týdně a uvádí délku života přes 10 let. AKC uvádí, že bretaňští ohaři jsou velmi energičtí psi, kteří potřebují hodně pohybu a duševních podnětů, jsou jemní a k dětem obvykle trpěliví a že kartáčování jednou týdně jim stačí, aby vypadali co nejlépe. PetMD dodává, že včasná socializace štěňat je nutností, že špatně snášejí dlouhou samotu a že jako psi vyšlechtění k lovu ptáků mají silný lovecký pud.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "americký kokr, Cocker Spaniel (USA), American Cocker Spaniel",
      text: [
        "Americký kokršpaněl – ve Spojených státech jednoduše cocker spaniel – je jiné plemeno než anglický kokršpaněl. Standard AKC ho označuje za nejmenšího člena skupiny loveckých psů, s dlouhýma, laločnatýma, bohatě osrstěnýma ušima, zaoblenou lebkou a širokým, hlubokým čenichem a s hedvábnou srstí, která je rovná nebo mírně vlnitá; vyskytuje se v černé, v jakékoli jednolité barvě od nejsvětlejší krémové po nejtmavší červenou a ve vícebarevném zbarvení s bílou. Standard žádá vyrovnanou povahu bez náznaku bázlivosti.",
        "Royal Kennel Club doporučuje péči o srst každý den a více než 2 hodiny pohybu denně a uvádí délku života přes 10 let; AKC a PetMD píší, že nepotřebuje mnoho pohybu. PetMD označuje tyto psy s milou povahou za skvělé rodinné psy, přátelské k lidem i jiným zvířatům, a radí začít se socializací a výcvikem brzy; VCA píše, že s dětmi obvykle vycházejí velmi dobře, mají sklon k nadváze a uši je jim třeba kontrolovat každý týden.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, belgický ovčák (malinois), Belgian Malinois",
      text: [
        "Belgický ovčák malinois je krátkosrstá varieta belgického ovčáka, pasteveckého plemene z Belgie. Standard FCI popisuje harmonicky stavěného psa, který spojuje eleganci a sílu, a povoluje jen jedno zbarvení: plavé s černým pláštěm a černou maskou. Standardy FCI a AKC popisují spíše malé, vztyčené, trojúhelníkové uši, krátkou, tvrdou srst s hustou podsadou a ostražitou, inteligentní, zvídavou a sebejistou povahu.",
        "Royal Kennel Club doporučuje více než 2 hodiny pohybu denně a péči o srst víc než jednou týdně a uvádí délku života přes 10 let. AKC píše, že není dobrou volbou pro začínající majitele psů, nejlépe se mu daří se staršími, zodpovědnými dětmi a neměl by zůstávat dlouho sám; PetMD uvádí silný lovecký pud, to, že se může pokoušet nahánět děti, a že potřebuje soustavný každodenní výcvik a včasnou socializaci.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "baset, Basset Hound",
      text: [
        "Baset je krátkonohý honič z Velké Británie. Standard FCI popisuje honiče značné robustnosti, vyváženého, klidného, nikdy agresivního ani bázlivého a mazlivého, s nízko nasazenýma, dlouhýma, sametovýma ušima, hladkou krátkou srstí a v barvách černá, bílá a pálená nebo citronová s bílou. Program Breed Watch Royal Kennel Clubu žádá rozhodčí na výstavách, aby si všímali víček stočených dovnitř nebo ven, velmi dlouhých uší, podrážděných kožních záhybů a nadbytečné kůže.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst jednou týdně a uvádí délku života přes 10 let. PDSA popisuje snášenlivého psa, který s dětmi vychází velmi dobře a miluje společnost, s dobrou chutí k jídlu, kterou je třeba hlídat; radí každý den kontrolovat kožní záhyby a dodržovat odstup mezi krmením a pohybem. AKC dodává, že ho může nos svést z cesty, proto je důležité pevné vodítko a oplocené prostory.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vižla, maďarský ohař, Magyar Vizsla, Hungarian Vizsla",
      text: [
        "Maďarský krátkosrstý ohař (vižla) je středně velký, elegantní lovecký pes z Maďarska s krátkou srstí v barvě rezavě zlaté. Standard FCI popisuje živého, přátelského psa s vyrovnanou povahou, který se snadno cvičí a udržuje úzký kontakt se svým psovodem; jeho barvy jsou odstíny rezavě zlaté a tmavě písčitě zlaté. Program Breed Watch Royal Kennel Clubu neuvádí žádné problematické body specifické pro toto plemeno.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a péči o srst jednou týdně a uvádí délku života přes 12 let. PDSA popisuje psa velmi zaměřeného na lidi, který miluje společnost a když zůstává sám, může trpět separační úzkostí; se staršími dětmi vychází dobře, PDSA by ho ale nedoporučila k velmi malým dětem ani začínajícím majitelům a kvůli silnému loveckému pudu nedoporučuje chovat ho s menšími zvířaty. PDSA také radí dodržovat odstup mezi krmením a pohybem.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "kokršpaněl, kokr, Cocker Spaniel (UK), English Cocker Spaniel",
      text: [
        "Anglický kokršpaněl – ve Velké Británii jednoduše cocker spaniel – je jiné plemeno než americký kokršpaněl. Standard FCI popisuje veselého, statného, sportovního psa, vyváženého a kompaktního, s nízko nasazenýma laločnatýma ušima a rovnou, hedvábnou srstí; standard AKC ho označuje za veselého a mazlivého, vyrovnané povahy, a uvádí jednobarevnou černou, hnědou a odstíny červené i vícebarevné zbarvení s bílou. Program Breed Watch Royal Kennel Clubu neuvádí žádné problematické body specifické pro toto plemeno.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst každý den a uvádí délku života přes 10 let; studie VetCompass u anglických kokršpanělů ve Velké Británii zjistila medián věku úmrtí 11,44 roku. PDSA uvádí, že díky trpělivé povaze s dětmi obvykle dobře vychází, vždy pod dohledem, upozorňuje ale, že je známý separační úzkostí a nikdy by neměl zůstávat sám déle než čtyři hodiny. PDSA také radí denně ho kartáčovat a dodržovat odstup mezi krmením a pohybem.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "maltézák, Bichon Maltais, Maltese",
      text: [
        "Maltézský psík je trpasličí pes ze střední části Středomoří, dnes u FCI pod italským patronátem. Standard FCI popisuje malého psa s protáhlým tělem, živého, mazlivého, velmi klidného a velmi inteligentního, s hmotností 3–4 kg a velmi dlouhou, hustou, hedvábnou srstí, která těžce splývá po celém těle. Srst nemá podsadu a jedinou barvou je čistě bílá (povolen je světle slonovinový nádech). Program Breed Watch Royal Kennel Clubu neuvádí žádné problematické body specifické pro toto plemeno.",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst každý den, uvádí, že plemeno nelíná, a délku života přes 12 let. PDSA popisuje bystrého, přátelského a mazlivého psa, který může být k cizím zdrženlivý, ale se správnou socializací v mládí se může naučit být sebejistý a společenský. PetMD upozorňuje, že když zůstává sám příliš dlouho, může se u něj rozvinout separační úzkost, uvádí, že kontakt s malými dětmi musí probíhat pod dohledem, a radí mu každý den čistit zuby.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "mopsík, Pug, Carlin",
      text: [
        "Mops je malý společenský pes z Číny, dnes u FCI pod britským patronátem. Standard FCI popisuje rozhodně čtvercového a zavalitého psa – „multum in parvo“ – s velkým šarmem, důstojností a inteligencí a vyrovnanou, veselou a živou povahou, s ideální hmotností 6,3–8,1 kg, jemnou, hladkou, krátkou a lesklou srstí ve stříbrné, meruňkové, plavé nebo černé barvě a s ocasem těsně stočeným nad kyčlí. Žádá poměrně velké, dobře otevřené nozdry a zúžené nozdry a výraznou vrásku nad nosem považuje za nepřijatelné. Royal Kennel Club řadí plemeno v programu Breed Watch do kategorie 3 s problematickými body, k nimž patří potíže s dýcháním, vystouplé oči, dermatitida kožních záhybů a nadváha.",
        "PDSA označuje mopse za výrazně brachycefalické plemeno (s plochým obličejem), které se snadno zadýchá, radí vyhýbat se pohybu v horku a uvádí, že její veterináři by místo něj důrazně doporučili plemeno s normálním čenichem nebo křížence mopse. Royal Kennel Club doporučuje až 1 hodinu pohybu denně a péči o srst jednou týdně, uvádí, že plemeno líná, a délku života přes 10 let. PDSA popisuje psa, který s dětmi a jinými zvířaty často dobře vychází, ale zbožňuje společnost a samotu nesnáší dobře; PetMD radí každý den čistit a osušit kožní záhyby na obličeji a uvádí, že obezita je u plemene častá.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "kolie, dlouhosrstá kolie, Rough Collie",
      text: [
        "Kolie dlouhosrstá je velký pastevecký pes z Velké Británie. Standard FCI popisuje psa velké krásy, který stojí s klidnou důstojností, s přátelskou povahou bez stopy nervozity či agresivity, s velmi hustou srstí s rovnou, drsnou krycí srstí a ve třech barvách: sobolí, trikolor a blue merle. Standard Royal Kennel Clubu ji označuje za skvělého společníka, přátelského, veselého a aktivního, dobrého k dětem i k jiným psům, a uvádí výšku 56–61 cm u psů a 51–56 cm u fen. Royal Kennel Club řadí plemeno v programu Breed Watch do kategorie 2 a nezapisuje štěňata ze spojení merle × merle.",
        "Royal Kennel Club doporučuje až 1 hodinu pohybu denně a péči o srst každý den, uvádí, že plemeno líná, a délku života přes 12 let. PetMD uvádí, že kolie jsou mazlivé, zvlášť k dětem, a dobře vycházejí s jinými zvířaty, ale dlouhou samotu nesnášejí dobře a ve vzrušení mohou chňapat po kotnících a patách. Uvádí také, že socializace štěněte je zásadní a že se u kolií vyskytuje mutace MDR1, která ovlivňuje, jak pes zpracovává určité léky.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "anglický mastif, Mastiff, Old English Mastiff",
      text: [
        "Mastif je velmi velké strážní plemeno z Velké Británie. Standard FCI popisuje spojení velkoleposti a odvahy – klidného psa, mazlivého k majitelům, ale schopného hlídat – s hlavou čtvercového vzhledu, širokým, hlubokým a silným tělem a krátkou, přiléhavou srstí v meruňkové, plavé nebo žíhané barvě. PDSA uvádí průměrnou výšku 71–78 cm a průměrnou hmotnost 80–85 kg a uvádí, že Kennel Club řadí mastifa do kategorie 3: plemena s viditelnými vadami stavby těla, které mohou způsobovat bolest, nepohodlí nebo zdravotní problémy.",
        "PDSA doporučuje dospělým psům přibližně hodinu pohybu denně – ale žádné přetěžování, dokud se štěněti vyvíjejí kosti a klouby –, péči o srst jednou týdně s každodenním čištěním vrásek na obličeji a uvádí průměrnou délku života pod 10 let. PetMD označuje mastify za skvělé rodinné psy do domácností s dětmi, které vědí, jak se ke zvířatům chovat, i když kvůli jejich velikosti možná ne k batolatům a miminkům; s jinými zvířaty, se kterými se seznámí ve štěněcím věku, obvykle vycházejí dobře, hodně slintají a kvůli riziku torze žaludku by neměli mít pohyb hodinu před jídlem a po něm.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "šiba, shiba, Shiba Inu",
      text: [
        "Shiba inu je malý špic z Japonska; jeho jméno znamená „malý pes“ a podle Royal Kennel Clubu byl vyšlechtěn k lovu drobné pernaté zvěře. Standard FCI popisuje malého, vyváženého psa s dobrými kostmi, věrnou povahou, bystrými smysly a velkou ostražitostí, s drsnou krycí srstí nad jemnou, hustou podsadou, malýma vztyčenýma trojúhelníkovýma ušima a silným stočeným ocasem; barvy jsou červená, černá s pálením a sezamová, vždy s bělavými znaky „urajiro“ na lících, hrudi a spodní straně těla. Standard AKC uvádí průměrnou hmotnost přibližně 10 kg u psů a 8 kg u fen.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst jednou týdně, uvádí, že plemeno líná, a délku života přes 10 let; rozsáhlá britská studie zjistila medián délky života 14,6 roku. AKC popisuje sebejistého, samostatného psa, který je lepší volbou pro zkušeného majitele, nejspokojenější je se staršími dětmi a mimo oplocený nebo uzavřený prostor by nikdy neměl být na volno. PetMD dodává, že potřebuje hodně duševních podnětů, prospívá mu socializace ve štěněcím věku a měl by mít zuby čištěné každý den.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, Rhodesian Ridgeback",
      text: [
        "Rhodéský ridgeback pochází z jižní Afriky. Jeho nejznámějším znakem je hřeben na hřbetě, pruh srsti, která roste opačným směrem než zbytek srsti. Standard FCI popisuje vyváženého, silného, svalnatého, hbitého a aktivního psa, který je důstojný, inteligentní a k cizím odtažitý a je ceněný zejména jako hlídač a rodinný pes. Krátká, hustá srst je světle až červeně pšeničná a standard uvádí hmotnost přibližně 36,5 kg u psů a 32 kg u fen.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a péči o srst jednou týdně, uvádí, že plemeno líná a hodí se do velkého domu s velkou zahradou, a délku života přes 10 let. PDSA popisuje hravé, silné a velmi věrné psy s velmi silným loveckým pudem, kteří se nedoporučují začínajícím majitelům, nikdy by neměli zůstávat sami déle než čtyři hodiny a potřebují socializaci od mládí; radí také dodržovat odstup mezi krmením a pohybem. Woodgreen dodává, že nejlépe se jim daří se staršími dětmi.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontinentální trpasličí španěl, phalène (varieta s klopenýma ušima), Papillon",
      text: [
        "Papillon je varieta kontinentálního trpasličího španěla se vztyčenýma ušima, plemene z Belgie a Francie; varieta s klopenýma ušima se nazývá phalène. Standard FCI popisuje malého, elegantního trpasličího španěla s dlouhou srstí a živou povahou, vysokého přibližně 28 cm a vážícího až 4,5 kg u psů a 5 kg u fen. Jeho velké uši jsou nesené jako roztažená křídla motýla a srst je vždy bílá s barevnými skvrnami.",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst víc než jednou týdně, uvádí, že plemeno líná a může žít v bytě, a délku života přes 12 let. PDSA popisuje jemné, hravé, velmi poslušné psy, kteří dobře vycházejí se všemi a potřebují výcvik a socializaci v mladém věku; doporučuje péči o srst dvakrát až třikrát týdně. PetMD dodává, že papilloni potřebují každý den duševní podněty, může se u nich rozvinout separační úzkost a měli by mít zuby čištěné každý den a že velmi malé děti mohou tak malého psa nechtěně zranit.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, portie, Portuguese Water Dog",
      text: [
        "Portugalský vodní pes pochází z Portugalska, kde pracoval s rybáři. Standard Royal Kennel Clubu popisuje robustního, téměř čtvercového, velmi silně osvaleného psa – velmi inteligentního a nesmírně energického, s výbornými plaveckými a potápěčskými schopnostmi – s výškou 50–57 cm (psi) a 43–52 cm (feny) a hmotností 19–25 kg (psi) a 16–22 kg (feny). Jeho bohatá jednoduchá srst nemá podsadu a je černá, bílá, hnědá nebo černá či hnědá s bílou; tradiční lví střih ponechává čenich a zadní část těla nakrátko.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst každý den, uvádí, že plemeno nelíná a hodí se do velkého domu, a délku života přes 10 let. PDSA popisuje velmi přátelské, láskyplné psy, kteří dobře vycházejí s jinými zvířaty, jsou vynikajícími rodinnými mazlíčky a potřebují výcvik a socializaci v mladém věku; dodává, že během roku je třeba srst stříhat a tvarovat u profesionálního groomera.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bichon frisé, kadeřavý bišonek, Bichon Frise",
      text: [
        "Bišonek kadeřavý je francouzsko-belgický společenský pes. Standard FCI popisuje veselého malého psa s živým pohybem a velmi volnou, bílou srstí stočenou do vývrtek – opravdového společníka, kterého lze vzít všude, není nervózní ani často neštěká – s výškou v kohoutku 25–29 cm a hmotností přibližně 5 kg. Dospělý pes je vždy čistě bílý, s velmi tmavýma kulatýma očima, černým nosem, svěšenýma ušima a bohatě osrstěným ocasem neseným nad hřbetem.",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst každý den, uvádí, že plemeno nelíná a hodí se do bytu, a délku života přes 12 let. PDSA popisuje velmi mazlivé, láskyplné psy, kteří jsou výborní k dětem i k jiným zvířatům, a dodává, že srst je třeba zhruba každé dva měsíce zastřihnout, často u profesionálního groomera.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "novofundlanďan, newfie, Newfoundland",
      text: [
        "Novofundlandský pes pochází z Kanady; FCI ho řadí mezi molosoidní psy horského typu a uznává tři zbarvení: černé, bíločerné (landseer) a hnědé. PDSA označuje novofundlanďany za jemné obry a uvádí průměrnou výšku 66–71 cm a průměrnou hmotnost 50–69 kg; PetMD dodává, že díky historii plemene jsou to rození plavci.",
        "PDSA doporučuje dospělým psům nejméně hodinu pohybu denně, štěňata by se ale neměla přetěžovat, dokud se jim vyvíjejí kosti a klouby; péči o srst označuje za každodenní úkol, uvádí, že novofundlanďané mají sklon slintat, a délku života pod 10 let. PetMD označuje plemeno za vynikajícího rodinného mazlíčka, který dobře vychází s dětmi, malými zvířaty i jinými psy, radí mít malé děti s jakýmkoli psem pod dohledem a upozorňuje, že u některých se může rozvinout separační úzkost, když zůstávají sami.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "dalmatinec, Dalmatian",
      text: [
        "Dalmatin pochází z Chorvatska; FCI ho řadí mezi plemena příbuzná honičům. Jeho krátká, lesklá srst je čistě bílá s ostře ohraničenými černými nebo játrovými (hnědými) skvrnami a standard žádá skvrnité uši. FCI uvádí výšku 56–62 cm u psů a 54–60 cm u fen; PDSA uvádí průměrnou hmotnost 18–27 kg.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a kartáčování jednou týdně a uvádí, že plemeno líná a hodí se do velkého domu se zahradou. PDSA označuje dalmatiny za skvělé mazlíčky do aktivních domácností, kteří se lépe hodí ke starším dětem, potřebují společnost a nikdy by neměli zůstávat sami déle než čtyři hodiny; mezi zdravotními problémy plemene uvádí hluchotu a uvádí, že existuje test sluchu BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "blue heeler, red heeler, Australian Cattle Dog",
      text: [
        "Australský honácký pes pochází z Austrálie; FCI ho řadí mezi honácké psy. Standard Kennel Clubu popisuje silného, kompaktního pracovního psa s hladkou dvojitou srstí odolnou vůči počasí v modré barvě (mramorované nebo tečkované) nebo s rovnoměrným červeným tečkováním a uvádí výšku 46–51 cm u psů a 43–48 cm u fen; PDSA uvádí průměrnou hmotnost 16–20 kg.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a kartáčování jednou týdně a uvádí, že plemeno líná. PDSA popisuje velmi inteligentního, energického psa, který potřebuje hodně fyzické i duševní aktivity; kvůli silnému pasteveckému instinktu může chňapat po patách běhajících dětí a pomáhá socializace a výcvik v mladém věku.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "vipet, Whippet",
      text: [
        "Whippet pochází z Velké Británie; FCI ho řadí mezi krátkosrsté chrty. Standard Kennel Clubu popisuje vyvážené spojení svalové síly a mohutnosti s elegancí a ladností obrysu, jemnou, krátkou, přiléhavou srst v jakékoli barvě nebo kombinaci barev kromě merle a jemnou, mazlivou, vyrovnanou povahu; uvádí výšku 47–51 cm u psů a 44–47 cm u fen a PDSA uvádí průměrnou hmotnost 11–18 kg.",
        "PDSA doporučuje nejméně hodinu pohybu každý den s možností proběhnout se na volno v bezpečném prostoru a kartáčování jednou týdně měkkým kartáčem. Označuje whippety za oblíbenou volbu pro rodiny, protože jsou k dětem klidní a jemní, doporučuje ale domácnost s o něco staršími dětmi; whippeti neradi zůstávají sami a mají opravdu silný lovecký pud, proto je PDSA nedoporučuje chovat s menšími zvířaty. V zimě se může hodit oblečení a silné, měkké pelíšky chrání jejich vystouplé kosti.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "korthals, Korthalsův grifon, Wirehaired Pointing Griffon, Griff",
      text: [
        "Korthalsův ohař (drsnosrstý ohař Korthals), nazývaný také Korthalsův grifon, pochází z Francie; FCI ho řadí mezi kontinentální ohaře a označuje ho především za všestranného ohaře. Standard FCI popisuje energického, rustikálního psa, který je delší než vyšší, s drsnou, hrubou srstí, která nikdy není kudrnatá ani vlnitá, s nosem vždy hnědým a nejlépe s ocelově šedou srstí s hnědými (játrovými) plotnami; uvádí výšku přibližně 55–60 cm u psů a 50–55 cm u fen a plemeno označuje za mírné, hrdé a k dětem velmi jemné. PetMD uvádí hmotnost přibližně 16–32 kg.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, velký dům a velkou zahradu a péči o srst víc než jednou týdně. PetMD radí kartáčovat ho jednou týdně (někteří psi potřebují i ruční trimování), uvádí, že při socializaci ve štěněcím věku bývají k dětem obvykle trpěliví a jemní, a upozorňuje, že kvůli lovecké minulosti mohou mít silný lovecký pud, takže menší zvířata, například kočky a králíci, pro ně mohou vypadat jako kořist.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "chessie, Chesapeake Bay Retriever",
      text: [
        "Chesapeake Bay retrívr, často nazývaný chessie, pochází ze Spojených států; FCI ho řadí mezi retrívry. Standard FCI popisuje pracovního retrívra, který je stejně schopný na souši jako ve vodě a jehož velikost a mohutnost by neměly být přehnané, s hustou, krátkou srstí nad hustou, vlnitou podsadou a s jasně nažloutlýma nebo jantarovýma očima; přijatelný je jakýkoli odstín hnědé, ostřicové (sedge) nebo barvy suché trávy (deadgrass) a černá srst vede k diskvalifikaci. Uvádí výšku 58–66 cm a hmotnost 29,5–36,5 kg u psů a 53–61 cm a 25–32 kg u fen.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, velký dům a velkou zahradu a péči o srst jednou týdně. PetMD popisuje bystrého, veselého a mimořádně mazlivého psa, který může začít ničit věci, když nemá dost podnětů nebo zůstává sám příliš dlouho, uvádí, že se správným seznámením a socializací jsou chessie skvělou součástí rodiny, a radí nenechat psa sportovat těsně před jídlem ani po něm.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samojedský pes, Samoyed",
      text: [
        "Samojed pochází ze severního Ruska a Sibiře; FCI ho řadí mezi severské saňové psy. Standard FCI popisuje bílého, elegantního arktického špice střední velikosti s bohatou, silnou a hustou polární srstí, tmavě hnědýma očima, malýma, silnýma, vztyčenýma ušima a pysky v koutcích mírně zvednutými do typického „samojedího úsměvu“; srst je čistě bílá, krémová nebo bílá s béžovou (biscuit) a modré nebo různobarevné oči vedou k diskvalifikaci. Uvádí ideální výšku 57 cm u psů a 53 cm u fen, vždy s tolerancí 3 cm.",
        "PDSA doporučuje nejméně dvě hodiny pohybu každý den a každodenní péči o srst, uvádí, že samojedi línají velmi často, s dětmi obvykle vycházejí skvěle a jsou věrní celé rodině, nikdy by neměli zůstávat sami déle než čtyři hodiny, jako zdatní útěkáři potřebují velmi dobře zabezpečenou zahradu a mají silný lovecký pud, a radí dodržovat odstup mezi jídlem a pohybem. PetMD dodává, že samojedi špatně snášejí horko.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "skotík, scottie, Scottish Terrier, aberdeenský teriér",
      text: [
        "Skotský teriér, často nazývaný scottie, pochází z Velké Británie; FCI ho řadí mezi malé teriéry. Standard Kennel Clubu popisuje zavalitého, krátkonohého psa s ostražitým držením těla, který působí dojmem velké síly a činorodosti v malém těle, věrného a oddaného, důstojného, samostatného a zdrženlivého, ale odvážného a velmi inteligentního – smělého, nikdy však agresivního. Jeho přiléhavá dvojitá srst má drsnou, drátovitou krycí srst; barva je černá, pšeničná nebo žíhaná v jakémkoli odstínu. Uvádí výšku 25–28 cm a hmotnost 8,5–10,5 kg.",
        "PDSA uvádí, že skotští teriéři potřebují přibližně hodinu pohybu denně a každodenní péči o srst, s trimováním a stříháním u profesionálního groomera každé dva až tři měsíce, popisuje je jako věrné a oddané rodině a uvádí, že umí být tvrdohlaví, takže výcvik vyžaduje trpělivost a vytrvalost. PetMD uvádí, že se správným výcvikem a socializací mohou být dobrými rodinnými psy, že socializace štěněte je důležitá a že by neměli zůstávat dlouho sami.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "výmarák, Weimaraner",
      text: [
        "Výmarský ohař pochází z Německa; FCI ho řadí mezi kontinentální ohaře a uznává krátkosrstou a dlouhosrstou varietu. Standard FCI popisuje středně velkého až velkého loveckého psa funkčního pracovního typu, šlachovitého a velmi svalnatého, s jantarovýma očima a širokýma, poměrně dlouhýma ušima; srst je stříbřitě, srnčí nebo myšově šedá, povoleny jsou jen malé bílé znaky na hrudi a prstech a jakákoli jiná barva než šedá vede k diskvalifikaci. Uvádí výšku 59–70 cm a hmotnost přibližně 30–40 kg u psů a 57–65 cm a přibližně 25–35 kg u fen.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, velký dům a velkou zahradu a péči o srst jednou týdně. PDSA uvádí, že ve správných rukou jsou výmarští ohaři skvělými rodinnými mazlíčky a nejlépe se jim daří u majitelů, kteří plemeno znají, kvůli velmi silnému loveckému pudu je ale nedoporučuje do domácností s menšími dětmi ani s menšími zvířaty, uvádí, že když zůstávají sami, může se u nich rozvinout separační úzkost, a radí je socializovat od mládí a dodržovat odstup mezi krmením a pohybem. PetMD dodává, že je dobré jednou měsíčně psovi vyčistit uši a jednou měsíčně ho vykoupat.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "chrtík, Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "Italský chrtík pochází z Itálie; FCI ho jako piccolo levriero italiano řadí mezi krátkosrsté chrty. Standard Kennel Clubu popisuje chrta v miniatuře, ve všech proporcích štíhlejšího, elegantního, ladného a rychlého v pohybu, inteligentního, mazlivého a čilého, i když může působit odtažitě, s krátkou, jemnou, lesklou srstí na jemné kůži. Uvádí výšku 32–38 cm a hmotnost 3,6–4,5 kg; přijatelná je černá, modrá, krémová, plavá, červená a bílá nebo kterákoli z nich s bílou – nikdy merle, žíhaná nebo s pálením.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně, uvádí, že se plemeno hodí do malého domu ve městě i na venkově, potřebuje péči o srst jednou týdně a nelíná. PDSA uvádí, že italští chrtíci jsou plní energie, měli by mít pohyb v ohraničeném prostoru, protože jakmile uvidí kořist, může být těžké je přivolat, mohou být bázliví, takže včasná socializace je nezbytná, a že kvůli křehkým kostem během růstu nemusí být ideálním plemenem do domácností s malými dětmi nebo jinými zvířaty. PetMD dodává, že je tenká srst nehřeje, takže jim snadno bývá zima.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "velký knírač, Riesenschnauzer, Giant Schnauzer",
      text: [
        "Knírač velký pochází z Německa; FCI ho jako Riesenschnauzer řadí mezi pinče a knírače. Standard Royal Kennel Clubu popisuje silně stavěného, robustního, šlachovitého psa téměř čtvercového vzhledu, odvážného, spolehlivého, dobromyslného a vyrovnaného, s drsnou, drátovitou krycí srstí a dobrou podsadou. Uvádí výšku 65–70 cm u psů a 60–65 cm u fen; standard FCI uvádí hmotnost 35–47 kg. Přijatelná je čistě černá, pepř a sůl s tmavou maskou a černá se stříbrnou – žádná jiná barva.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, uvádí, že se plemeno hodí do velkého domu s velkou zahradou, potřebuje péči o srst každý den a nelíná. PDSA uvádí, že srst potřebuje každodenní péči a pravidelné trimování, že velcí knírači mohou být milými mazlíčky pro rodiny se staršími dětmi, pokud jsou ve štěněcím věku dobře socializovaní, a že tito psi se silnou vůlí se hodí ke zkušeným majitelům. PetMD dodává, že srst se každých několik měsíců profesionálně ručně trimuje a že se plemeni nedaří v domácnostech, kde lidé nejsou často doma.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "svatohubertský pes, Chien de Saint-Hubert, Bloodhound",
      text: [
        "Bloodhound pochází z Belgie, kde ho FCI vede pod jménem chien de Saint-Hubert (svatohubertský pes) jako velkého honiče. Standard FCI popisuje nejsilnějšího ze všech honičů: mírného, klidného, laskavého a k lidem společenského, zvlášť oddaného svému majiteli, s krátkou, hustou srstí odolnou vůči počasí a pružnou, volnou kůží. Psi váží přibližně 46–54 kg a feny přibližně 40–48 kg; tři zbarvení jsou černá s pálením, játrová s pálením a červená.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, uvádí, že se plemeno hodí do velkého domu s velkou zahradou, potřebuje péči o srst jednou týdně a líná. PDSA uvádí, že bloodhoundi se lépe hodí ke zkušeným majitelům, kvůli své velikosti a velmi silnému loveckému pudu se nedoporučují do domácností s menšími dětmi ani s menšími zvířaty, slintají a jejich kožní záhyby je třeba udržovat čisté a suché. Radí také dodržovat odstup mezi krmením a pohybem.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "americká akita, American Akita",
      text: [
        "Akita v této encyklopedii je americký typ: FCI ji vede jako americkou akitu, plemeno japonského původu, oddělené od japonské akity inu. Standard FCI popisuje velkého, statně stavěného, vyváženého psa s velkou mohutností a silnými kostmi, malýma vztyčenýma ušima a velkým ocasem neseným nad hřbetem; psi mají v kohoutku 66–71 cm. Povolena je jakákoli barva, například červená, plavá, bílá, strakatá (pinto) nebo žíhaná. PDSA uvádí průměrnou hmotnost 31–59 kg.",
        "PDSA popisuje neuvěřitelně věrné rodinné mazlíčky, kteří jsou samostatní a velmi velcí, takže se jim nejlépe daří u zkušených majitelů; akitu by nedoporučila do domácnosti s malými dětmi a nedoporučuje je nechávat samotné, protože mnohé samotu nesnášejí dobře. Doporučuje nejméně dvě hodiny pohybu každý den, socializaci od mládí, odstup mezi krmením a pohybem a kartáčování nejméně jednou týdně – akity hodně línají. Uvádí také silný lovecký pud a to, že se ve velkém horku mohou přehřát.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "corgi, cardigan, Cardigan Welsh Corgi",
      text: [
        "Welsh corgi cardigan pochází z Velké Británie; FCI ho řadí mezi honácké psy. Standard American Kennel Clubu uvádí u psů výšku v kohoutku přibližně 27–32 cm a ideální hmotnost přibližně 14–17 kg. Na rozdíl od svého bratrance pembroka má dlouhý, plný ocas.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně, jako dostačující uvádí malý dům s malou nebo středně velkou zahradou a uvádí, že plemeno potřebuje péči o srst víc než jednou týdně a líná; uvádí délku života přes 12 let a cardigana vede jako ohrožené domácí britské plemeno. PDSA uvádí, že welsh corgiové se rádi zavděčí, takže výcvik by měl být poměrně snadný, že obvykle stačí kartáčování dvakrát až třikrát týdně a že mohou chňapat po patách běhajících dětí – pomáhá socializace s dětmi a výcvik v mladém věku.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "drahthaar, Deutsch Drahthaar, German Wirehaired Pointer",
      text: [
        "Německý drátosrstý ohař pochází z Německa; FCI ho jako Deutsch Drahthaar řadí mezi kontinentální ohaře. Standard Royal Kennel Clubu popisuje středně velkého loveckého psa s drátovitou srstí, která zcela zakrývá kůži – mírného, mazlivého a vyrovnaného, ostražitého, ovladatelného a velmi věrného. Psi mají 60–67 cm a váží 25–34 kg; feny mají 56–62 cm a váží 20,5–29 kg. Standardními barvami jsou hnědá s bílou, jednobarevná hnědá a černá s bílou.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně, uvádí, že se hodí do velkého domu s velkou zahradou na venkově, potřebuje péči o srst víc než jednou týdně a líná. PetMD uvádí, že drahthaaři potřebují hodně pohybu a duševních podnětů, vytvoří si s rodinou úzké pouto a při včasném výcviku a socializaci mohou být skvělými rodinnými psy, dobře vycházejí s dětmi, které se naučily, jak se ke zvířatům chovat, nikdy by neměli zůstávat dlouho sami a mají silný lovecký pud. Srst se dvakrát ročně ručně trimuje.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "bernardýn, St. Bernhardshund, Saint Bernard",
      text: [
        "Bernardýn pochází ze Švýcarska; FCI ho řadí mezi molosoidní plemena horského typu. Standard FCI popisuje psa přátelské povahy, klidného až živého a ostražitého, a uznává dvě variety: krátkosrstou s hustou, hladkou, přiléhavou srstí a dlouhosrstou. Psi měří nejméně 70 cm a feny nejméně 65 cm, nejvýše 90, resp. 80 cm; PDSA uvádí hmotnost 54–81 kg.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně, uvádí, že se plemeno hodí do velkého domu s velkou zahradou, potřebuje péči o srst víc než jednou týdně, líná a obvykle se dožívá méně než deseti let. PDSA uvádí, že bernardýni milují život v rodině a jsou skvělí k lidem všech věků včetně dětí, ve štěněcím věku by měli být dobře socializovaní, potřebují kartáčování nejméně třikrát týdně, slintají, hůř snášejí horko a potřebují odstup mezi krmením a pohybem. PetMD dodává, že u těchto psů zaměřených na lidi se může rozvinout separační úzkost, když zůstávají dlouho sami.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staford, staffík, Staffordshire Bull Terrier",
      text: [
        "Stafordšírský bulteriér pochází z Velké Británie; FCI ho řadí mezi teriéry bulího typu. Standard FCI popisuje krátkosrstého, vyváženého psa na svou velikost velké síly – tradičně nezdolné odvahy a houževnatosti, velmi inteligentního a mazlivého, zvlášť k dětem. Měří 35,5–40,5 cm; psi váží 12,7–17 kg a feny 11–15,4 kg. Vyskytuje se v barvě žíhané, červené, plavé, černé, modré nebo bílé, samostatně nebo s bílou.",
        "Royal Kennel Club ho označuje za skvělého rodinného mazlíčka a doporučuje až hodinu pohybu denně; potřebuje péči o srst jednou týdně, líná a obvykle se dožívá více než 12 let. PDSA uvádí, že stafordi jsou k dětem snášenliví a milé povahy, ale jako psi zaměření na lidi jsou známí tím, že trpí separační úzkostí, když zůstávají sami, rádi okusují věci a kvůli jejich velmi silnému loveckému pudu není dobrý nápad mít s nimi menší zvířata.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, král teriérů, Airedale Terrier",
      text: [
        "Airedale teriér pochází z Velké Británie; FCI ho řadí mezi velké a středně velké teriéry. Standard FCI ho označuje za největšího z teriérů – svalnatého, aktivního, poměrně zavalitého psa, který je otevřený a sebejistý, přátelský, odvážný a inteligentní, stále ostražitý, ne agresivní, ale nebojácný. Psi měří přibližně 58–61 cm a feny přibližně 56–59 cm. Jeho tvrdá, hustá, drátovitá srst je pálená s černým nebo prošedivělým sedlem.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně; srst potřebuje péči každý den, nelíná a plemeno se obvykle dožívá více než 10 let. PetMD popisuje skvělé rodinné psy, kteří při dobrém výcviku s dětmi obvykle vycházejí, ale neměli by být příliš dlouho ponecháni sami sobě; radí kartáčovat je několikrát týdně, každý týden jim krátce vyčistit uši a třikrát až čtyřikrát ročně navštívit profesionálního groomera.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, russell teriér (AKC), JRT, Jack Russell Terrier",
      text: [
        "Jack Russell teriér – American Kennel Club ho nazývá Russell teriér – pochází z Anglie a byl vyšlechtěn v Austrálii; FCI ho řadí mezi malé teriéry. Standard ho popisuje jako silného, aktivního, pružného pracovního teriéra s výraznou povahou: živého, ostražitého a aktivního, smělého a nebojácného, přátelského, ale klidně sebejistého. Měří 25–30 cm a váží přibližně 5–6 kg. Jeho hladká, zalomená nebo drsná srst je převážně bílá s černými a/nebo pálenými znaky.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst jednou týdně; plemeno líná a obvykle se dožívá více než 10 let. PDSA popisuje chytré, živé psy, kteří mohou být dobrými rodinnými mazlíčky, pokud jsou od mládí cvičeni a socializováni, lépe se ale hodí do rodin s o něco staršími dětmi; mají velmi silný lovecký pud, takže se nedoporučují k menším zvířatům, a milují hrabání.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "bulmastif, Bullmastiff",
      text: [
        "Bulmastif je staré anglické strážní plemeno z 19. století, které pochází z buldoka a starého anglického mastifa; FCI ho řadí mezi molosoidní plemena. Standard ho popisuje jako silného, souměrného psa, který projevuje velkou sílu, ale není těžkopádný – vytrvalého, aktivního, spolehlivého, temperamentního, ostražitého a věrného. Psi měří 64–69 cm a váží 50–59 kg, feny 61–66 cm a 41–50 kg. Krátká, tvrdá srst je v jakémkoli odstínu plavé, červené nebo žíhané, vždy s černým čenichem.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a péči o srst jednou týdně a plemeno se obvykle dožívá méně než 10 let. PDSA popisuje velmi věrné psy, kteří se kvůli své velikosti a síle lépe hodí do domácností jen s dospělými nebo do rodin se staršími dětmi; potřebují včasnou socializaci, ideálně by měl být doma neustále někdo s nimi, mají velmi silný lovecký pud, hodně slintají a potřebují odstup mezi krmením a pohybem.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "čínský chocholatý, powder puff, Chinese Crested",
      text: [
        "Čínský chocholatý pes je malý, aktivní a půvabný společenský pes z Číny; FCI ho řadí mezi naháče. Vyskytuje se ve dvou varietách: naháč s hladkým holým tělem a srstí jen na hlavě (chochol), tlapkách a ocase a powder puff, který je celý pokrytý závojem dlouhé jemné srsti. Psi měří 28–33 cm a feny 23–30 cm; PetMD uvádí hmotnost 3,6–5,4 kg. Povolena je jakákoli barva kromě merle a jeho povaha je popisována jako veselá, nikdy zlá.",
        "Royal Kennel Club doporučuje až 30 minut pohybu denně a péči o srst jednou týdně; hodí se do bytu a plemeno se obvykle dožívá více než 12 let. PetMD popisuje přátelského psa, který zapadne do většiny rodin, včetně rodin s dětmi a jinými zvířaty – každý kontakt s dětmi by měl probíhat pod dohledem. Holou kůži je třeba chránit před sluncem a chladem, drápky by se měly kontrolovat každý týden a štěňata potřebují včasnou, soustavnou socializaci.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, novoskotský retrívr, Nova Scotia Duck Tolling Retriever, NSDTR",
      text: [
        "Novoskotský retrívr – toller – je retrívr z Kanady; jeho standard FCI popisuje, jak běhá a hraje si podél břehu na očích kachnám, aby je přilákal, a pak je vyslán, aby ptáky přinesl. Standard popisuje středně velkého, silného, kompaktního a dobře osvaleného psa, který je velmi inteligentní, snadno se cvičí a má velkou vytrvalost. FCI uvádí u psů 48–51 cm a 20–23 kg, u fen 45–48 cm a 17–20 kg. Vodoodpudivá dvojitá srst je v různých odstínech červené nebo oranžové, obvykle s bílou na špičce ocasu, tlapkách, hrudi nebo s lysinou.",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a péči o srst víc než jednou týdně a plemeno líná; PetMD radí kartáčovat ho jednou až dvakrát týdně. Rozsáhlá britská studie (McMillan 2024, podle Dogs Trust) uvádí medián očekávané délky života 13,2 roku, PetMD 12–14 let, a stejně jako jiní středně velcí psi je plně dorostlý přibližně ve 12–15 měsících (PetMD). AKC popisuje velmi mazlivé psy, kteří s dětmi obvykle dobře vycházejí, potřebují hodně fyzického pohybu a duševních podnětů, k menším zvířatům mohou mít silný lovecký pud a prospívá jim včasná socializace a štěněcí kurzy.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, Cairn Terrier",
      text: [
        "Cairn teriér pochází z Velké Británie; FCI ho řadí mezi malé teriéry. Standard Kennel Clubu popisuje hbitého, ostražitého teriéra pracovního, přirozeného vzhledu – aktivního, kurážného a otužilého, nebojácné a veselé povahy, průbojného, ale ne agresivního. Jeho dvojitá srst odolná vůči počasí má bohatou, drsnou krycí srst; barva je krémová, pšeničná, červená, šedá nebo téměř černá, žíhání je přípustné a typické jsou tmavé uši a čenich. Uvádí výšku přibližně 28–31 cm a ideální hmotnost 6–7,5 kg.",
        "PDSA doporučuje nejméně hodinu pohybu denně, uvádí, že cairn teriéři mají nevyčerpatelnou energii a silný lovecký instinkt, takže je třeba je včas socializovat s kočkami a jinými malými zvířaty a dávat na ně pozor, když jsou na volno, a že po socializaci velmi dobře vycházejí s dětmi a jsou vynikajícími rodinnými mazlíčky. Radí srst dvakrát ročně ručně trimovat a pečovat o ni jednou až dvakrát týdně; Dogs Trust uvádí, že línají velmi málo. Rozsáhlá britská studie (McMillan 2024, podle Dogs Trust) uvádí medián očekávané délky života 14,0 roku, PetMD 13–15 let, a stejně jako jiní malí psi je plně dorostlý přibližně v 9–12 měsících (PetMD). PetMD dodává, že potřebují hodně pohybu a duševních podnětů.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "bulteriér, anglický bulteriér, Bull Terrier",
      text: [
        "Bulteriér pochází z Velké Británie; FCI ho řadí mezi teriéry bulího typu (skupina 3). Je to středně velký krátkosrstý teriér: PDSA uvádí průměrnou výšku 51–61 cm a průměrnou hmotnost 22–31 kg a PetMD popisuje atletickou stavbu těla s výškou přibližně 53–56 cm a hmotností přibližně 23–32 kg. PetMD označuje pravidelný pohyb za nutnost a uvádí, že bulteriéři jsou mazliví k rodině včetně dětí, ale ne vždy přátelští k jiným psům nebo kočkám a že klíčová je včasná a častá socializace a výcvik.",
        "PDSA doporučuje nejméně hodinu pohybu denně, rozdělenou do celého dne, a odstup mezi jídlem a pohybem. Uvádí, že dobře socializovaný bulteriér vychází s lidmi všech věků, ale protože je trochu vznětlivý, hodí se lépe ke starším dětem; chce mít co nejvíc společnosti a má silný lovecký pud, takže je třeba opatrnosti u koček a jiných malých zvířat. Na srst stačí kartáčování jednou týdně. PDSA uvádí průměrnou délku života přes 10 let a PetMD 12–13 let; stejně jako jiní středně velcí psi je plně dorostlý přibližně ve 12–15 měsících (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "trpasličí pinč, Zwergpinscher, Miniature Pinscher, Min Pin",
      text: [
        "Pinč malý pochází z Německa; FCI ho řadí mezi pinče a knírače (skupina 2) a popisuje ho jako zmenšený obraz německého pinče – živého, temperamentního, sebejistého a vyrovnaného. Jeho srst je krátká, hustá, hladká a lesklá, buď jednobarevná jelenovitě červená až tmavě červenohnědá, nebo černá s pálením, a ocas je přirozený. Standard FCI uvádí u psů i fen výšku 25–30 cm a hmotnost 4–6 kg; stejně jako jiní trpasličí psi je plně dorostlý přibližně v 8–12 měsících (PetMD).",
        "PDSA doporučuje těmto energickým, čilým malým psům až půl hodiny pohybu denně, uvádí, že na srst obvykle stačí kartáčování jednou týdně, a upozorňuje, že umí být tvrdohlaví a samostatní, takže výcvik vyžaduje vytrvalost a trpělivost. PetMD uvádí, že se správnou socializací a výcvikem mohou být vynikajícími rodinnými mazlíčky. VCA popisuje plemeno jako hravé a velmi dobré k dětem, i když velmi malé nebo neukázněné děti ho mohou hrubou hrou zranit, a uvádí, že kvůli tenké srsti a malé velikosti snadno prochladne. PDSA uvádí průměrnou délku života přes 12 let a PetMD 12–16 let.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "pyrenejský horský pes, patou, Great Pyrenees, Chien de Montagne des Pyrénées",
      text: [
        "Pyrenejský horský pes – ve Spojených státech nazývaný Great Pyrenees – pochází z Francie; FCI ho řadí mezi molosoidy horského typu (skupina 2) a popisuje psa velkého vzrůstu, impozantního a silně stavěného, ale ne bez jisté elegance. Jeho srst je bílá nebo bílá se skvrnami v barvě jezevčí, vlčí šedi, světle žluté nebo oranžové na hlavě a uších. Standard FCI uvádí výšku 70–80 cm u psů a 65–75 cm u fen; PDSA uvádí průměrnou hmotnost 40–50 kg. Stejně jako jiní obří psi je plně dorostlý přibližně v 18–24 měsících (PetMD).",
        "Royal Kennel Club doporučuje až hodinu pohybu denně, uvádí, že se plemeno hodí do velkého domu s velkou zahradou, potřebuje péči o srst víc než jednou týdně a líná, a uvádí délku života pod 10 let (PetMD a VCA uvádějí 10–12 let). PDSA je označuje za jemné obry – klidné, dobromyslné psy, kteří obvykle dobře vycházejí se všemi – a uvádí, že výcvik vyžaduje trpělivost a metody založené na odměnách. VCA uvádí, že pyrenejský pes je oddaný své rodině, zvlášť dětem, a že včasná socializace je velmi důležitá; PetMD uvádí, že dobře vychází s jinými zvířaty, ale nejlépe se mu může dařit v domácnostech bez menších dětí, a kvůli riziku torze žaludku radí vyhýbat se intenzivnímu pohybu kolem krmení.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten teriér, wheaten, Soft Coated Wheaten Terrier, SCWT",
      text: [
        "Irský jemnosrstý pšeničný teriér pochází z Irska; FCI ho řadí mezi velké a středně velké teriéry. Standard Royal Kennel Clubu popisuje středně velkého, kompaktního, vzpřímeného teriéra s jemnou, hedvábnou srstí pšeničné barvy, která splývá ve volných kadeřích nebo vlnách – dobromyslného, temperamentního a kurážného, plného sebedůvěry a humoru. Jedinou barvou je dobrá čistá pšeničná. PDSA uvádí průměrnou výšku 46–49 cm a průměrnou hmotnost 16–20,5 kg (standard Kennel Clubu uvádí u psů 16–20,5 kg, u fen o něco méně); stejně jako jiní středně velcí psi je plně dorostlý přibližně ve 12–15 měsících (PetMD).",
        "Royal Kennel Club doporučuje až hodinu pohybu denně, uvádí, že se plemeno hodí do malého domu, potřebuje péči o srst každý den a nelíná. Rozsáhlá britská studie (McMillan 2024, podle Dogs Trust) uvádí medián očekávané délky života 13,7 roku; PetMD a VCA uvádějí 12–14 let. PDSA je označuje za přátelské, spolehlivé psy, kteří jsou skvělými rodinnými mazlíčky, i když umí být trochu tvrdohlaví. VCA uvádí, že díky jemné, hravé povaze se dobře hodí k dětem; PetMD uvádí, že kontakt s dětmi by měl probíhat pod dohledem, že neradi zůstávají dlouho sami, a radí profesionální péči o srst každé čtyři až šest týdnů, koupel přibližně jednou měsíčně a čištění uší každý jeden až dva týdny.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "vlkodav, Cú Faoil, Irish Wolfhound",
      text: [
        "Irský vlkodav pochází z Irska; FCI ho řadí mezi hrubosrsté chrty. PDSA uvádí průměrnou výšku 71–79 cm a průměrnou hmotnost 40–55 kg; stejně jako jiní obří psi je plně dorostlý přibližně v 18–24 měsících (PetMD). Royal Kennel Club označuje jeho velikost za mimořádně velkou a uvádí, že se hodí do velkého domu s velkou zahradou na venkově.",
        "Royal Kennel Club doporučuje více než dvě hodiny pohybu denně a péči o srst víc než jednou týdně a uvádí, že plemeno líná. Kennel Club a PDSA uvádějí délku života pod 10 let; PetMD uvádí 6–8 let. PDSA plemeno nedoporučuje do domácností s menšími dětmi kvůli jeho velikosti a síle ani k menším zvířatům kvůli silnému loveckému pudu a uvádí, že by nikdy neměl zůstávat sám déle než čtyři hodiny. PetMD radí socializovat štěně ode dne, kdy přijde domů, nedopřávat mu pohyb těsně před jídlem ani po něm (torze žaludku) a čistit mu uši každé dva až čtyři týdny.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaf, AmStaff, American Staffordshire Terrier",
      text: [
        "Americký stafordšírský teriér pochází z USA; FCI ho řadí mezi teriéry bulího typu. Jeho standard žádá na svou velikost velkou sílu a uvádí výšku 46–48 cm u psů a 43–46 cm u fen, ale žádnou hmotnost. PetMD uvádí u obou pohlaví přibližně 18–32 kg; pes této velikosti je plně dorostlý přibližně ve 12–15 měsících (PetMD).",
        "PetMD doporučuje nejméně 60 minut pohybu denně a uvádí, že plemeno je k dětem trpělivé a láskyplné, že může mít sklon k separační úzkosti a že kvůli silnému loveckému pudu může být soužití s menšími psy nebo kočkami obtížnější. Britská studie (McMillan a kol., 2024, v tabulce Dogs Trust) uvádí medián očekávané délky života 12,5 roku; PetMD uvádí 12–16 let. VCA doporučuje kartáčování jednou týdně; PetMD radí socializovat štěně, nedopřávat mu pohyb hned po jídle (torze žaludku) a přibližně každé 4–6 týdnů ho vykoupat a vyčistit mu uši.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, romaňský vodní pes, lanýžový pes, Lagotto Romagnolo",
      text: [
        "Lagotto romagnolo je malý až středně velký vodní pes s kudrnatou srstí z Itálie, známý jako pes na hledání lanýžů; FCI ho řadí mezi vodní psy. Jeho standard uvádí výšku 43–48 cm a hmotnost 13–16 kg u psů a 41–46 cm a 11–14 kg u fen; pes této velikosti je plně dorostlý přibližně ve 12–15 měsících (PetMD).",
        "Royal Kennel Club ho označuje za vynikajícího a ostražitého rodinného společníka, doporučuje více než dvě hodiny pohybu denně a péči o srst víc než jednou týdně, uvádí, že nelíná, a délku života přes 12 let; PetMD uvádí, že lagotti se mohou dožít 15–17 let. PetMD uvádí, že potřebuje neustálé duševní i fyzické podněty a důkladnou socializaci, protože může být plachý; Woodgreen uvádí, že může mít potíže, když zůstává sám příliš často, a doporučuje profesionální péči o srst každých šest až osm týdnů.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamut, Alaskan Malamute",
      text: [
        "Aljašský malamut je jedním z nejstarších arktických saňových psů: silný, mohutně stavěný severský saňový pes z USA s hustou, hrubou srstí. Standard FCI uvádí žádoucí velikost 63,5 cm a 38 kg u psů a 58,5 cm a 34 kg u fen; PDSA uvádí 58–64 cm a 34–39 kg. Pes této velikosti je plně dorostlý přibližně v 15–18 měsících (PetMD) a PDSA uvádí délku života přes 10 let (PetMD: 10–14 let).",
        "PDSA doporučuje každý den nejméně dvě hodiny náročného pohybu a denní kartáčování a uvádí, že malamuti hodně línají, mají velmi silný lovecký pud, neměli by zůstávat sami déle než čtyři hodiny a hodí se k aktivním dospělým nebo do rodin se staršími dětmi; pro začínající majitele je označuje za náročné. PetMD radí kontrolovat uši jednou týdně a koupat psa každých 6–8 týdnů a uvádí, že kvůli husté srsti snášejí horké počasí špatně.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "basenži, africký neštěkající pes, Basenji",
      text: [
        "Basenži je lehce stavěný lovecký pes s jemnými kostmi ze Střední Afriky, který neštěká, ale vydává svůj typický jódlovací zvuk; FCI ho řadí mezi primitivní plemena. PDSA uvádí výšku 40–43 cm a hmotnost 9–11 kg. Pes této velikosti je plně dorostlý přibližně v 9–12 měsících (PetMD) a PDSA uvádí délku života přes 12 let (WebMD: 13–14 let).",
        "PDSA doporučuje nejméně hodinu pohybu denně (přibližně 60–90 minut), hodně duševních podnětů a kartáčování jednou týdně; basenži označuje za odtažité, ale spolehlivé, s pevnou vůlí a s velmi slabým smyslem pro nebezpečí na silnici. WebMD uvádí, že pronásledují vše, co vypadá jako kořist, potřebují velmi vysoké ploty nebo neustálý dohled a s malými dětmi vycházejí jen středně dobře, a radí čistit uši jednou týdně a zuby nejméně dvakrát týdně.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "velký švýcarský salašnický pes, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Velký švýcarský salašnický pes je robustní, těžce osvalený tažný pes se silnými kostmi ze Švýcarska, trikolorní: černý se symetrickými pálenými a bílými znaky. Standard FCI uvádí kohoutkovou výšku 65–72 cm u psů a 60–68 cm u fen, hmotnost však neuvádí; WebMD uvádí 52–64 kg u psů a 39–50 kg u fen. Pes této velikosti je plně dorostlý přibližně v 18–24 měsících (PetMD) a Royal Kennel Club uvádí délku života přes 10 let (PetMD: 8–11 let).",
        "Royal Kennel Club doporučuje až hodinu pohybu denně a kartáčování jednou týdně a uvádí, že plemeno líná a potřebuje velký dům s velkou zahradou. PetMD je označuje za skvělé rodinné psy, kteří jsou k dětem jemní (každý kontakt s dětmi je třeba hlídat), a radí čistit uši jednou týdně a nenechat psa běhat těsně před jídlem ani po něm kvůli riziku torze žaludku (GDV); WebMD radí čistit zuby každý den a omezit pamlsky, protože plemeno snadno přibírá.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "britka, britská modrá, British Shorthair",
      text: [
        "Britská krátkosrstá kočka je statná kočka s hustou srstí a velkýma kulatýma očima – CFA ji označuje za kočku typu „plyšový medvídek“. Většina lidí si ji představí modrošedou, vyskytuje se ale v řadě barev a kreseb. Dospívá pomalu: podle CFA dosáhne plné velikosti přibližně ve třech letech, podle VCA může tělesné dospívání trvat až pět let.",
        "CFA ji popisuje jako velmi mazlivou a připoutanou ke svým lidem; vychází se všemi v domácnosti bez ohledu na věk, ale obvykle nemá ráda, když ji někdo nosí v náručí, a žila už i se psy, králíky a ptáky. VCA popisuje střední úroveň aktivity a radí česat srst nejméně jednou týdně. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "ragdoll, Rag doll",
      text: [
        "CFA popisuje ragdolla jako velkou, pohodovou kočku s polodlouhou, plyšovou a hedvábnou srstí a modrýma očima. Jeho tmavší „odznaky“ (pointy) se vyskytují v několika kresbách – colourpoint bez bílé, mitted s bílými tlapkami, bicolour s větším podílem bílé a van. Dospívá pomalu: plného zbarvení srsti dosáhne ve dvou letech a plné velikosti a hmotnosti přibližně ve čtyřech.",
        "CFA popisuje jemnou kočku, která vás vítá u dveří a chodí za vámi z místnosti do místnosti a obvykle si hraje bez vysunutých drápů. PetMD ji označuje za dobrou volbu pro rodiny, včetně rodin s dětmi, radí ale pomalé seznamování s dětmi a jinými zvířaty pod dohledem a uvádí, že některé ragdolly stačí česat jen jednou až dvakrát týdně, zatímco CFA radí pravidelné česání. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibiřka, Siberian, Siberian Forest Cat",
      text: [
        "GCCF popisuje sibiřskou kočku jako pomalu se vyvíjející kočku s hustou srstí odolnou vůči počasí: hustou, jemnou podsadou pod hrubší krycí srstí, která na jaře a na podzim silně líná. Kocouři váží přibližně 7,7–11,8 kg a kočky 5,9–7,7 kg, plný vývoj může trvat čtyři až pět let a GCCF uvádí délku života 12 až 15 let i více.",
        "GCCF ji označuje za energickou a hravou, a přesto trpělivou – dobrou volbu pro rodiny s malými dětmi – a uvádí, že dobře vychází s jinými zvířaty včetně psů. PetMD radí česat ji nejméně jednou týdně, s větší péčí v době jarního a podzimního línání, a uvádí, že sibiřské kočky nejsou považovány za hypoalergenní. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "mainská mývalí kočka, mainská kočka, Maine Coon",
      text: [
        "Mainská mývalí kočka je všeobecně považována za jedno z největších plemen domácích koček, se svalnatým obdélníkovým tělem, širokým hrudníkem, velkými tlapkami a dlouhým, splývavým ocasem. TICA uvádí průměrnou hmotnost přibližně 5,9–8,2 kg u dospělých kocourů a 4,1–5,9 kg u koček a CFA uvádí, že někteří kocouři váží více než 9 kg. Roste pomalu: podle CFA často dosáhne plného vývoje až ve třech nebo čtyřech letech a podle TICA může plné dospění trvat tři až pět let.",
        "TICA ji popisuje jako jemnou, přátelskou a hravou, CFA jako společenskou, věrnou a inteligentní; často se neozývá mňoukáním, ale cvrlikavým trylkem. Vetstreet píše, že mainské mývalí kočky vycházejí se všemi včetně dětí, psů a jiných koček. Její těžká polodlouhá srst je kratší na plecích a delší na límci, břiše a zadní části těla. Zdroje se v péči o srst liší: Vetstreet uvádí, že stačí česání jednou týdně, CFA radí kartáčovat nebo česat nejméně několikrát týdně a TICA uvádí, že hustší srst může potřebovat každodenní česání. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengálka, Bengal",
      text: [
        "PDSA popisuje bengálskou kočku jako velmi inteligentní a energickou kočku, která potřebuje hodně duševních podnětů a příležitostí k pohybu a má ráda vyvýšená místa s rozhledem, například kočičí strom. Je mazlivá, ale spíš se stočí vedle vás než na klíně a umí být dost hlasitá. VCA uvádí, že bengálské kočky rostou pomalu a tělesná dospělost může trvat až dva roky.",
        "Její krátká, jemná, tečkovaná nebo mramorovaná srst potřebuje jen lehké kartáčování nebo česání jednou týdně (PDSA). PetMD uvádí, že bengálská kočka nemusí být nejlepší volbou pro rodiny s malými dětmi, zatímco se psy a jinými kočkami to při správném seznámení může být v pořádku. Plemeno vzniklo křížením asijské kočky bengálské (leopardí kočky) s domácími kočkami; PetPrep zobrazuje jen registrovanou domácí bengálskou kočku. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "norka, Skogkatt, Norwegian Forest Cat, Wegie",
      text: [
        "GCCF popisuje norskou lesní kočku jako jemnou a přátelskou kočku, která ráda patří do rodiny. Dospívá pomalu a za plně dorostlou se považuje až přibližně ve čtyřech až pěti letech; kocouři váží přibližně 5,4–7,3 kg a kočky 4,1–5,4 kg a GCCF uvádí délku života 14 až 16 let.",
        "Má hodně energie, ráda si hraje interaktivní hry a ochotně šplhá; GCCF uvádí, že se snáší s ohleduplnými dětmi, jinými kočkami i se psy, kteří jsou ke kočkám přátelští. PetMD radí česat a kartáčovat ji nejméně jednou týdně, častěji v době jarního a podzimního línání, a uvádí, že pokud často zůstává dlouho sama, může být problémem separační úzkost. Koťata s průkazem původu obvykle odcházejí do nového domova ve 12–13 týdnech (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default cs;
