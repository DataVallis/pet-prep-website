import type { RegistryCopy } from "./types";

/**
 * Croatian plural: 1, 21, 31 … (not 11) → one ("1 pasmina", "21 godina"); 2–4, 22–24 … (not 12–14) → few, the paucal
 * ("3 pasmine", "22 godine"); 0, 5–20, 25–30 … → many, the genitive plural ("5 pasmina", "12 godina"). Non-integers take
 * `frac`, by default the paucal form, which equals the genitive singular ("2,5 godine", "1,5 sata").
 */
function form(n: number, one: string, few: string, many: string, frac: string = few): string {
  if (!Number.isInteger(n)) return frac;
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (b === 1 && a !== 11) return one;
  if (b >= 2 && b <= 4 && (a < 12 || a > 14)) return few;
  return many;
}
/** "svaki" / "svaka" / "svakih" agreeing with a masculine noun after a number: svaki 21 dan, svaka 2 tjedna, svakih 7 dana. */
const every = (n: number) => form(n, "svaki", "svaka", "svakih");
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = " ";
/** First letter lower case for values that continue a phrase ("Psi" → "psi", "Do 1 sata" → "do 1 sata"). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("hr") + t.slice(1);
/**
 * Breed names are common nouns in Croatian: lower case inside a sentence ("njemački ovčar", "zlatni retriver"). Names that
 * start with a proper name keep the capital ("Jack Russell terijer", "Cavalier King Charles španijel", "Airedale terijer");
 * adjectives formed from names are lower case ("bostonski terijer", "jorkširski terijer"), so the match ends at a word boundary.
 */
const PROPER_START = /^(Jack Russell|Russell|Chesapeake|Airedale|Cavalier|King Charles|Korthals\p{L}*|West Highland|Staffordshire|Nova Scotia|Maine|Yorkshire|Boston|Lagotto)(?=[\s -]|$)/u;
const mid = (name: string) => (PROPER_START.test(name) ? name : lc(name));
/** "Psi" → "pasa", "Mačke" → "mačaka" (genitive plural after "pasmine …"); other species: "(ptice)". */
const gen = (many: string) => {
  const m = lc(many);
  if (m === "psi") return "pasa";
  if (m === "mačke") return "mačaka";
  return `(${m})`;
};
/** "Psi" → "pse", "Mačke" → "mačke" (accusative plural after "za …"); other species: "(ptice)". */
const acc = (many: string) => {
  const m = lc(many);
  if (m === "psi") return "pse";
  if (m === "mačke") return "mačke";
  return `(${m})`;
};
/**
 * A formatted duration ("1 godina", "2 sata dnevno", "12 mjeseci") in the genitive, for "do …", "od …", "više od …"
 * ("do 1 godine", "više od 1 sata dnevno"). Only a number ending in 1 (not 11) changes the noun: after 2–4 the paucal and
 * after 5+ the genitive plural are already genitive forms ("do 2 godine", "do 12 mjeseci"); decimals too ("do 2,5 godine").
 */
const GEN: Record<string, string> = { put: "puta", godina: "godine", mjesec: "mjeseca", dan: "dana", tjedan: "tjedna", sat: "sata", minuta: "minute", obrok: "obroka", korak: "koraka" };
const toGen = (t: string) =>
  t.replace(/(?<![\d.,])(\d+) (\p{L}+)((?: dnevno)?)$/u, (m, num: string, w: string, d: string) => (form(Number(num), "1", "2", "5") === "1" && GEN[w] ? `${num}${NB}${GEN[w]}${d}` : m));
type Fci = { number: number; group: number; origin: string };
/** FCI group names as the Croatian Kennel Club (HKS) uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "ovčarski i govedarski psi",
  2: "pinčeri i šnauceri, molosi te švicarski planinski i govedarski psi",
  3: "terijeri",
  4: "jazavčari",
  5: "špicevi i psi primitivnog tipa",
  6: "goniči, krvoslijednici i srodne pasmine",
  7: "ptičari",
  8: "retriveri, psi dizači i psi za vodu",
  9: "psi za društvo i patuljasti psi",
  10: "hrtovi",
};
const origins: Record<string, string> = { GB: "Velika Britanija", FR: "Francuska", DE: "Njemačka", US: "SAD", CU: "Kuba", CH: "Švicarska", IT: "Italija", "CN-XZ": "Tibet (Kina)", CN: "Kina", MX: "Meksiko", BE: "Belgija", HU: "Mađarska", JP: "Japan", ZA: "Južnoafrička Republika", "BE-FR": "Belgija / Francuska", PT: "Portugal", CA: "Kanada", HR: "Hrvatska", AU: "Australija", RU: "Rusija", IE: "Irska", "AF-C": "Srednja Afrika", TR: "Turska", MG: "Madagaskar", AF: "Afganistan", NO: "Norveška", FI: "Finska" };
/** "sat" in the nominative after a number: 1 sat, 2 sata, 5 sati, 1,5 sata. */
const hours = (n: number) => form(n, "sat", "sata", "sati");
/** "sat" in the genitive after "od" / "u roku od": od 1 sata, od 2 sata, od 5 sati. */
const hoursGen = (n: number) => form(n, "sata", "sata", "sati");
const steps = (n: number) => form(n, "korak", "koraka", "koraka");

const hr: RegistryCopy = {
  mistakes: {
    title: (breed) => `Česte pogreške vlasnika: ${mid(breed)}`,
    intro: "Male navike koje stvaraju veće probleme – svaka se točka temelji na izvorima o ovoj pasmini.",
    exercise: "Premalo kretanja svaki dan",
    exerciseText: (amount) => `Potrebno kretanje: ${amount}. Planiraj ga za svaki dan, a ne samo za vikend.`,
    coat: "Zanemarena njega dlake",
    coatText: (brushing, shedding) => `Četkanje: ${brushing}.${shedding ? ` ${shedding.charAt(0).toLocaleUpperCase("hr")}${shedding.slice(1)}.` : ""}`,
    weight: "Previše poslastica i preveliki obroci",
    heat: "Šetnje po vrućini",
    growth: "Zaboravlja se da štene još raste",
    growthText: (growthEnd) =>
      `Dob u kojoj dostiže odraslu veličinu: ${growthEnd}. Do tada planiraj kretanje i hranu za mladu životinju koja još raste i pitaj veterinara što je najbolje za tvog ljubimca.`,
    mind: "Premalo zadataka za glavu",
    health: "Zanemarivanje poznatih zdravstvenih problema pasmine",
    practise: "U PetPrepu dijete vježba upravo te navike – korake, obroke, njegu – prije nego što pravi ljubimac dođe kući.",
  },
  hub: {
    title: "Upoznaj ljubimca prije nego što dođe kući.",
    intro:
      "Što svaka vrsta i pasmina u PetPrepu stvarno treba – prema kinološkim i felinološkim savezima, veterinarskim dobrotvornim organizacijama i studijama, uz poveznicu na svaki izvor. Uz to i pravila po kojima ih PetPrep simulira.",
    breedCount: (n) => `${n} ${form(n, "pasmina", "pasmine", "pasmina")} u enciklopediji`,
    open: "Pogledaj pasmine",
    openA11y: (many) => `Pogledaj pasmine ${gen(many)}`,
    freePlan: (name, activity) => `Besplatni plan: ${lc(name)} (odrasla životinja: ${activity}); 12-tjedni izazov možeš dodati kasnije. Nema vlastitu stranicu u enciklopediji.`,
    otherSpecies: "Planiramo još životinja.",
    methodTitle: "Kako gradimo ovu enciklopediju",
    method: [
      "Svaka činjenica potječe iz navedenog izvora – kinoloških i felinoloških saveza, veterinarskih dobrotvornih organizacija i udruga te recenziranih studija – i ima poveznicu na njega. Standarde pasmina sažimamo vlastitim riječima.",
      "Vrijednosti koje nijedan izvor ne potvrđuje nikad ne prikazujemo kao činjenice. Kad PetPrep za igru mora odabrati broj, on se pojavljuje samo u dijelu „Kako to PetPrep simulira“ i označen je kao pravilo igre.",
      "Isti podaci pokreću aplikaciju: oznake, broj obroka, ciljevi koraka i termini za igru na ovim stranicama upravo su oni koje koristi ljubimac u aplikaciji.",
      "Ova enciklopedija nije veterinarski savjet. Zdravstvene informacije služe samo za orijentaciju i veterinar ih nije pregledao.",
    ],
  },
  speciesStatus: { available: "U aplikaciji", coming_soon: "Uskoro u aplikaciji", info_only: "Samo informativno" },
  availability: {
    in_app: { label: "U aplikaciji", text: "Dostupna u PetPrepovu 12-tjednom izazovu." },
    coming_soon: { label: "Uskoro u aplikaciji", text: "Izrađena je i testirana; stiže s jednim od sljedećih izdanja aplikacije." },
    info_only: { label: "Samo informativno", text: "U enciklopediji je informativno; u aplikaciji je još ne možeš udomiti." },
  },
  catalogue: {
    eyebrow: "Enciklopedija životinja",
    title: (many) => `${many}: pasmine u enciklopediji`,
    lead: (many, count) =>
      `${count} ${form(count, "pasmina", "pasmine", "pasmina")} ${gen(many)} – potrebe prema izvorima, kome odgovaraju i kako ih PetPrep simulira. Pretražuj, filtriraj i usporedi do tri pasmine.`,
    metaTitle: (many) => `Pasmine ${gen(many)} – enciklopedija s izvorima | PetPrep`,
    metaDescription: (many) =>
      `Pretraži i usporedi pasmine ${gen(many)} prema potrebama, veličini i tome kome odgovaraju. Svaka činjenica ima poveznicu na izvor; uz to i pravila po kojima PetPrep simulira svaku pasminu.`,
    searchLabel: "Pretraži pasmine",
    searchPlaceholder: "Naziv, npr. labrador",
    filtersTitle: "Filtri",
    any: "Sve",
    availabilityLabel: "U PetPrepu",
    sortLabel: "Poredaj",
    sort: { recommended: "Prvo one u aplikaciji", az: "A–Ž", size: "Veličina (od manjih prema većima)" },
    clear: "Poništi sve",
    results: (total) => `{n} od ${total} ${form(total, "pasmine", "pasmine", "pasmina")}`,
    none: "Nijedna pasmina ne odgovara. Pokušaj s manje filtara.",
    loading: "Pretraga se učitava…",
    page: "Stranica {n} od {total}",
    prev: "Prethodna",
    next: "Sljedeća",
    compareAdd: "Usporedi: {name}",
    compareBar: "Odabrano za usporedbu: {n} od {max}",
    compareGo: "Usporedi",
    compareMax: "Možeš usporediti najviše {max} pasmine.",
    azTitle: "Sve pasmine od A do Ž",
    azIntro: "Sve pasmine u enciklopediji abecednim redom.",
    freePlanTitle: "Besplatni plan",
    guideTitle: "Kako odabrati pasminu",
    guide: () => [
      "Kreni od onoga što tvoje kućanstvo može dati svaki dan: vrijeme za kretanje, njegu dlake i prostor. Stranica svake pasmine te potrebe prikazuje pregledno, a uz svaku vrijednost naveden je izvor; kad se izvori razlikuju, prikazujemo sve vrijednosti.",
      "Ako pasmina ima kategoriju veličine (za pse: patuljasta, mala, srednja, srednja do velika, velika ili divovska), to je kategorija koju navodi izvor – obično kinološki savez – a težine su rasponi koje navode izvori, a ne naše procjene.",
      "Oznake kao što je „Dobar izbor: za aktivnu obitelj“ iste su kao u aplikaciji i svaku potvrđuju izvori. Brojevi u dijelu „Kako to PetPrep simulira“ pravila su igre u PetPrepu, a ne upute za njegu. [Kako gradimo enciklopediju](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Usporedba pasmina ${gen(many)}`,
    metaTitle: (many) => `Usporedba pasmina ${gen(many)} | Enciklopedija PetPrep`,
    intro: "Najvažnije potrebe jedna uz drugu, iz istih izvora kao i stranice pasmina.",
    pick: "U katalogu odaberi dvije ili tri pasmine i usporedi ih.",
    back: "Natrag na katalog",
    remove: "Ukloni: {name}",
    note: "Vrijednosti navodimo onako kako ih navodi izvor. Kad se izvori razlikuju, stranica pasmine navodi svaku.",
    availabilityRow: "U PetPrepu",
    activityRow: "Dnevni cilj odrasle životinje u PetPrepu (pravilo igre)",
  },
  facets: {
    size: { label: "Veličina", values: { toy: "Patuljasta", small: "Mala", small_medium: "Mala do srednja", medium: "Srednja", medium_large: "Srednja do velika", large: "Velika", giant: "Divovska" } },
    exercise: { label: "Dnevno kretanje", values: { under_1h: "Do 1 sata", h1_2: "1–2 sata", over_2h: "Više od 2 sata" }, line: (v) => `${lc(v)} kretanja dnevno` },
    grooming: { label: "Četkanje", values: { weekly: "Jednom tjedno", several_weekly: "Nekoliko puta tjedno", daily: "Svaki dan", other: "Drugo" }, line: (v) => `četkanje: ${lc(v)}` },
  },
  groups: {
    exercise: "Kretanje",
    play: "Igra",
    litter: "Mačji toalet",
    scratching: "Grebanje",
    grooming: "Dlaka i njega",
    feeding: "Obroci",
    water: "Voda",
    lifespan: "Životni vijek",
    stages: "Životne faze",
    size: "Veličina i težina",
    training: "Dresura",
  },
  fields: {
    size: "Veličina",
    height: "Visina u grebenu",
    weight: "Težina odrasle životinje",
    growth_end: "Dob u kojoj dostiže odraslu veličinu",
    lifespan: "Životni vijek",
    exercise: "Dnevno kretanje",
    coat: "Dlaka",
    grooming_frequency: "Četkanje",
    grooming_level: "Potrebe njege dlake",
    shedding: "Linjanje",
    litter_scoop: "Čišćenje pijeska",
    litter_full_change: "Zamjena cijelog pijeska",
    litter_pee: "Mokrenje (odrasla mačka)",
    litter_poo: "Velika nužda (odrasla mačka)",
    water_need: "Potreba za vodom",
    sleep: "Spavanje (odrasla mačka)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 tjedana",
    puppy_3_6_months: "3–6 mjeseci",
    puppy_6_12_months: "6–12 mjeseci",
    kitten_6_12_weeks: "6–12 tjedana",
    kitten_3_6_months: "3–6 mjeseci",
    kitten_6_12_months: "6–12 mjeseci",
    puppy: "Štene",
    kitten: "Mače",
    young_adult: "Mlada odrasla životinja",
    mature_adult: "Zrela odrasla životinja",
    adult: "Odrasla životinja",
    senior: "Senior",
  },
  categories: {
    size: { toy: "patuljasta", small: "mala", small_medium: "mala do srednja", medium: "srednja", medium_large: "srednja do velika", large: "velika", giant: "divovska" },
    coat: { moderately_long: "srednje duga", smooth: "glatka (kratka)", short: "kratka", medium: "srednje duljine", short_long: "kratka ili duga (dvije varijante dlake)", long: "duga" },
    grooming_frequency: {
      at_least_once_a_week: "najmanje jednom tjedno",
      at_least_once_or_twice_a_week: "najmanje jednom do dvaput tjedno",
      once_a_week: "jednom tjedno",
      more_than_once_a_week: "češće nego jednom tjedno",
      daily: "svakodnevno",
      every_day: "svaki dan",
    },
    grooming_level: { moderate: "umjerene", high: "visoke", low: "niske" },
    shedding: { yes: "linja se", no: "ne linja se (to nije isto što i hipoalergenost)", high: "jako se linja", moderate: "umjereno se linja", low: "malo se linja", minimal: "linja se minimalno" },
  },
  statements: {
    food_motivated: () => "Hrana ga jako motivira – to pomaže u dresuri, ali pazi na porcije.",
    coren_rank: (v) => `${String(v)}. mjesto na ljestvici radne i poslušne inteligencije Stanleyja Corena.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI standard br. ${x.number}, skupina ${x.group} (${fciGroups[x.group] ?? "—"}); podrijetlo: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Igra: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} puta dnevno po ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}${form(x.minutes[1], "minutu", "minute", "minuta")}.`;
    },
    kittens_play_more: () => "Mačići se trebaju igrati češće.",
    scratching_natural: () => "Grebanje je prirodno i nužno: osiguraj grebalicu i nikad ne kažnjavaj mačku zbog grebanja.",
    water_fresh: () => "Svježa voda uvijek na raspolaganju; zdjelicu svaki dan operi i ponovno napuni.",
    grooming_sources_differ: () => "Izvori se razlikuju u tome koliko često treba češljati dlaku – neki navode svaki dan, a neki jednom tjedno.",
  },
  // Qualifiers wrap a value already in the nominative ("2 sata dnevno"). "najmanje", "otprilike" and "medijan" keep it;
  // "do", "od" and "više / manje od" need the genitive, which toGen() supplies ("do 1 sata dnevno", "više od 1 godine").
  qualifiers: {
    exact: (t) => t,
    median: (t) => `medijan ${t}`,
    more_than: (t) => `više od ${toGen(t)}`,
    less_than: (t) => `manje od ${toGen(t)}`,
    at_least: (t) => `najmanje ${t}`,
    up_to: (t) => `do ${toGen(t)}`,
    ideal: (t) => `idealno (standard pasmine): ${t}`,
    mean: (t) => `izmjereni prosjek: ${t}`,
    about: (t) => `otprilike ${t}`,
    until: (t) => `do ${toGen(t)}`,
    until_about: (t) => `otprilike do ${toGen(t)}`,
    span: (t) => t,
    from: (t) => `od ${toGen(t)}`,
    last: (t) => `posljednjih ${t}`,
    every: (t) => {
      const m = /(\d+(?:,\d+)?)\D*$/.exec(t);
      return `${m ? every(Number(m[1].replace(",", "."))) : "svakih"} ${t}`;
    },
    expectancy: (t) => `očekivani životni vijek pri rođenju: ${t}`,
    smaller_meals: (t) => `${t}, manje porcije`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t, n) => `${t}${NB}${form(n, "godina", "godine", "godina")}`,
    months: (t, n) => `${t}${NB}${form(n, "mjesec", "mjeseca", "mjeseci")}`,
    days: (t, n) => `${t}${NB}${form(n, "dan", "dana", "dana")}`,
    min_per_day: (t, n, f) =>
      n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} dnevno` : `${t}${NB}${form(n, "minuta", "minute", "minuta")} dnevno`,
    meals_per_day: (t, n) => `${t}${NB}${form(n, "obrok", "obroka", "obroka")} dnevno`,
    times_per_day: (t, n) => `${t}${NB}${form(n, "put", "puta", "puta")} dnevno`,
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} dnevno`,
    ml_per_kg_day: (t) => `${t}${NB}ml po kilogramu tjelesne težine dnevno`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% očekivanog životnog vijeka`,
  },
  males: "mužjaci",
  females: "ženke",
  or: " ili ",
  notes: { size_class_guidance: "smjernica za pripadajuću kategoriju veličine" },
  stageLabels: {
    dog: { puppy: "Štene", young: "Mladi pas", adult: "Odrasli pas", senior: "Senior" },
    cat: { puppy: "Mače", young: "Mlada mačka", adult: "Zrela mačka", senior: "Senior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${steps(raw)}`,
    steps_range: (from, to) => `${from} → ${to} koraka`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} koraka po mjesecu starosti (${first} pri dolasku), najviše ${cap} od ${capMonth}. mjeseca`,
    play_sessions: (n) => `${n} ${form(n, "termin", "termina", "termina")} za igru`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Cilj koraka = minute dnevnog kretanja × ${p.per_minute} koraka. Odrasla životinja: ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}${form(p.minutes, "minuta", "minute", "minuta")}`} kretanja, dakle ${f.num(p.steps)} ${steps(p.steps)} dnevno.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Naredbe uči sporije od mješanca iz besplatnog plana (${f.num(p.multiplier)}× njegove brzine).`
        : p.multiplier === 1
          ? "Naredbe uči jednako brzo kao mješanac iz besplatnog plana."
          : `Naredbe uči ${f.num(p.multiplier)}× brže od mješanca iz besplatnog plana.`,
    senior_share: (p, f) =>
      `U seniorsku dob ulazi u ${p.months}. mjesecu (${f.num(p.months / 12, 1)}${NB}${form(Number((p.months / 12).toFixed(1)), "godina", "godine", "godina")}) – u posljednjoj četvrtini očekivanog životnog vijeka pasmine.`,
    walk_sensor: () => "Šetnje broje stvarne korake iz aplikacije Apple Health ili Health Connect (uz dopuštenje, samo čitanje) i iz senzora pokreta u telefonu – bez GPS-a.",
    play_instead_of_steps: (p, f) =>
      `Bez šetnji: odrasla mačka treba ${p.sessions} ${form(p.sessions, "termin", "termina", "termina")} za igru dnevno sa štapom s igračkom, s razmakom od najmanje ${f.num(p.gap_minutes / 60)}${NB}${hoursGen(p.gap_minutes / 60)}.`,
    litter_rule: (p) =>
      `Mačji toalet: odrasla mačka koristi ga ${p.uses} ${form(p.uses, "put", "puta", "puta")} dnevno; nakon svake upotrebe toalet se očisti u roku od ${p.scoop_hours}${NB}${hoursGen(p.scoop_hours)} (izvan tihih sati), a sav se pijesak zamijeni ${every(p.change_days)} ${p.change_days}${NB}${form(p.change_days, "dan", "dana", "dana")}.`,
    scratching_after_missed_play: () => "Nakon dana bez dovoljno igre mačka jednom nešto izgrebe; dijete je odnese do grebalice.",
    grooming_rule: (p) => (p.per_week === 1 ? "Češljanje jednom tjedno." : p.per_week === 2 ? "Češljanje dvaput tjedno." : `Češljanje ${p.per_week} puta tjedno.`),
    no_walk_in_heat: (p) =>
      `Ljeti (lipanj–kolovoz; na južnoj polutci prosinac–veljača) dječji zaslon i zaslon šetnje između ${p.from} i ${p.to} (po lokalnom vremenu obitelji) prikazuju miran podsjetnik: bez šetnji po vrućini. Bez podataka o vremenu i bez kazne – koraci se i dalje broje.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "čišćenje kožnih nabora",
        tooth_brushing: "pranje zubi",
        ear_cleaning: "pregled i čišćenje ušiju",
        nail_trim: "skraćivanje noktiju",
        bath: "kupanje",
        groomer_visit: "posjet salonu za njegu ljubimaca",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "svaki dan"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "jednom tjedno"
              : `${every(weeks)} ${weeks}${NB}${form(weeks, "tjedan", "tjedna", "tjedana")}`
            : q.period_days === 7
              ? `${q.times} ${form(q.times, "put", "puta", "puta")} tjedno`
              : `${q.times === 1 ? "jednom" : `${q.times} ${form(q.times, "put", "puta", "puta")}`} ${every(q.period_days)} ${q.period_days}${NB}${form(q.period_days, "dan", "dana", "dana")}`;
      const who = q.actor === "parent" ? "podsjetnik za roditelja" : "zadatak za dijete";
      return `Njega: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Pogledaj štene zajedno s majkom, ondje gdje je rođeno.",
      min_age_puppy: "Štene ne bi smjelo napustiti majku prije dobi od 8 tjedana.",
      pedigree_fci: "Traži rodovnik. Prema pravilima FCI-ja rodovnik se smije izdati samo uz ispravno podrijetlo.",
      parents_health_tests: "Traži na uvid rezultate zdravstvenih testova obaju roditelja. Koji su testovi važni, ovisi o pasmini.",
      breed_club_rules: "Nacionalni kinološki savezi mogu propisati uzgojna pravila stroža od FCI-jevih – pitaj klub pasmine koje testove roditelji moraju imati.",
      written_contract: "Traži pisani kupoprodajni ugovor u kojem su zabilježeni podrijetlo i zdravlje šteneta.",
      kitten_see_mother: "Pogledaj mače zajedno s majkom, ondje gdje mačići žive.",
      kitten_min_age: "Prema pravilima FIFe za rodovničke mačke mače ne odlazi u novi dom prije dobi od 14 tjedana.",
      kitten_vaccination: "Mače je potpuno cijepljeno (panleukopenija, kalicivirus, herpesvirus) i ima iskaznicu o cijepljenju.",
      kitten_pedigree: "Rodovničko mače dolazi s rodovnikom koji pokazuje najmanje tri generacije.",
      kitten_parents_tests: "Pitaj je li ijedan roditelj imao zdravstvenih problema koje bi mače moglo naslijediti.",
    },
    tests: {
      dna_poag_pll: "DNK test na primarni glaukom otvorenog kuta i primarnu luksaciju leće (POAG/PLL), nasljedne bolesti očiju koje mogu dovesti do sljepoće",
      hip_scheme: "Rendgenski pregled kukova na displaziju kuka (UK: program BVA/KC)",
      elbow_scheme: "Rendgenski pregled laktova na displaziju lakta (UK: program BVA/KC)",
      eye_scheme: "Pregled očiju kod veterinarskog oftalmologa (UK: program BVA/KC/ISDS; za neke pasmine uz gonioskopiju)",
      heart_scheme: "Pregled srca na bolest mitralnog zaliska",
      boas_grading: "Test disanja na brahicefalični opstruktivni sindrom dišnih putova (BOAS ocjena)",
      ivdd_screening: "Pregled kralježnice na bolest intervertebralnih diskova (IVDD)",
      hearing_baer: "Test sluha na gluhoću (BAER)",
      cm_sm_mri: "Pregled magnetskom rezonancijom na malformaciju nalik Chiarijevoj i siringomijeliju (UK: program BVA/KC CM/SM)",
      inbreeding_coi: "Genetska raznolikost – provjeri koeficijent srodstva (inbreedinga)",
      dna_prcd_pra: "DNK test na progresivnu atrofiju mrežnice (prcd-PRA)",
      dna_rcd4_pra: "DNK test na progresivnu atrofiju mrežnice (rcd4)",
      dna_gr_pra2: "DNK test na progresivnu atrofiju mrežnice (GR_PRA2)",
      dna_cnm: "DNK test na centronuklearnu miopatiju (CNM)",
      dna_eic: "DNK test na kolaps izazvan naporom (EIC)",
      dna_hnpk: "DNK test na nasljednu nosnu parakeratozu (HNPK)",
      dna_sd2: "DNK test na skeletnu displaziju 2 (SD2)",
      dna_mcd: "DNK test na makularnu distrofiju rožnice (MCD)",
      dna_stgd: "DNK test na Stargardtovu bolest (STGD)",
      dna_cc_de: "DNK test na sindrom kovrčave dlake i suhog oka (CC/DE)",
      dna_ef: "DNK test na epizodično padanje (EF)",
      dna_cea: "DNK test na anomaliju oka kolija (CEA/CH)",
      dna_cl: "DNK test na ceroidnu lipofuscinozu (CL)",
      dna_igs: "DNK test na Imerslund-Gräsbeckov sindrom (IGS)",
      dna_mdr1: "DNK test na osjetljivost na više lijekova (MDR1)",
      dna_tns: "DNK test na sindrom zarobljenih neutrofila (TNS)",
      dna_sn: "DNK test na senzornu neuropatiju (SN)",
      dna_ggd: "DNK test na goniodisgenezu i rizik od glaukoma (GGD)",
      dna_raines: "DNK test na Raineov sindrom",
      dna_dm: "DNK test na degenerativnu mijelopatiju (DM)",
      dna_de: "DNK test na degenerativnu encefalopatiju (DE)",
      dna_jadd: "DNK test na juvenilnu Addisonovu bolest (JADD)",
      dermoid_sinus_scheme: "Pregled štenadi na dermoidni sinus (program kluba pasmine)",
      dna_jme: "DNK test na juvenilnu miokloničku epilepsiju (JME)",
      dna_je: "DNK test na juvenilnu epilepsiju (JE)",
      dna_lsd: "DNK test na lizosomsku bolest nakupljanja (LSD)",
      dna_ampn: "DNK test na polineuropatiju aljaškog malamuta (AMPN)",
      dna_fanconi: "DNK test na Fanconijev sindrom (bolest bubrega)",
      dna_pra_bj1: "DNK test na progresivnu atrofiju mrežnice kod basenjija (PRA-BJ1)",
      thyroid_scheme: "Pretrage štitnjače roditelja",
      dna_pap_pra1: "DNK test na progresivnu atrofiju mrežnice kod papillona (Pap-PRA1)",
      dna_nad: "DNK test na neuroaksonalnu distrofiju (NAD)",
      dna_eopra: "DNK test na rano nastupajuću progresivnu atrofiju mrežnice (EOPRA)",
      dna_cu: "DNK test na cistinuriju (CU), nasljednu sklonost kamencima u bubrezima i mokraćnom mjehuru",
      heart_echo_scheme: "Pregled srca obojenim doplerskim ultrazvukom (program kluba pasmine)",
      cardiac_exam: "Pregled srca roditelja (preporuka kluba pasmine)",
      dna_rd_osd: "DNK test na displaziju mrežnice / okuloskeletnu displaziju (RD/OSD)",
      dna_xlpra1: "DNK test na X-vezanu progresivnu atrofiju mrežnice (XLPRA1)",
      dna_cmo: "Test na kraniomandibularnu osteopatiju (CMO), nasljedni poremećaj kostiju čeljusti",
      dna_hsf4: "DNK test na nasljednu kataraktu (HSF4)",
      dna_lafora: "DNK test na Laforinu bolest",
      dna_nccd: "DNK test na neonatalnu degeneraciju kore malog mozga (NCCD)",
      dna_fviid: "DNK test na nedostatak faktora VII (FVIID)",
      dna_mls: "DNK test na Musladin-Lueke sindrom (MLS)",
      dna_vwd1: "DNK test na von Willebrandovu bolest tipa 1 (vWD1)",
      dna_mac: "DNK test na sklonost infekciji kompleksom Mycobacterium avium (MAC)",
      dna_imgd: "DNK test na nasljednu miopatiju njemačke doge (IMGD), bolest propadanja mišića",
      dna_poag: "DNK test na primarni glaukom otvorenog kuta (POAG), nasljednu bolest oka koja može dovesti do sljepoće",
      dna_aon: "DNK test na neuropatiju s početkom u odrasloj dobi (AON), nasljednu bolest živaca",
      dna_fn: "DNK test na obiteljsku nefropatiju (FN), nasljednu bolest bubrega",
      patella_scheme: "Pregled čašice koljena na luksaciju patele prije uzgoja",
      legg_perthes_scheme: "Rendgenski pregled kukova na Legg-Calvé-Perthesovu bolest prije uzgoja",
      kidney_scheme: "Ultrazvuk bubrega na nedostajući ili nepravilno razvijen bubreg (preporuka kluba pasmine)",
      kidney_upc_scheme: "Pretraga mokraće (omjer proteina i kreatinina) na bolest bubrega (preporuka kluba pasmine)",
      dna_gld: "DNK test na leukodistrofiju globoidnih stanica (GLD), nasljednu bolest živaca",
      liver_shunt_scheme: "Pregled jetre na portosistemski šant ili mikrovaskularnu displaziju (preporuka kluba pasmine)",
      breed_health_scheme: "Zdravstveni program kluba pasmine za roditelje",
      hemivertebrae_scheme: "Rendgenska snimka kralježnice roditelja na hemivertebre (nepravilno oblikovane kralješke), nakon dobi od 12 mjeseci",
      dna_hcm_mc: "DNK test na hipertrofičnu kardiomiopatiju (MC HCM)",
      dna_sma: "DNK test na spinalnu mišićnu atrofiju (SMA)",
      dna_pk_def: "DNK test na nedostatak piruvat-kinaze (PK def)",
      hcm_negative: "Mačke za uzgoj moraju biti HCM-negativne (bolest srca: hipertrofična kardiomiopatija)",
      dna_gsd2: "DNK test na bolest nakupljanja glikogena tipa II (GSD II, Pompeova bolest)",
      dna_gsd4: "DNK test na bolest nakupljanja glikogena tipa IV (GSD IV)",
      dna_pra_b: "DNK test na progresivnu atrofiju mrežnice kod bengalske mačke (PRA-b)",
      dna_jlpp: "DNK test na juvenilnu paralizu grkljana i polineuropatiju (JLPP)",
      dna_lemp2: "DNK test na leukoencefalomijelopatiju (LEMP-2)",
      dna_lemp: "DNK test na leukoencefalomijelopatiju (LEMP)",
      dna_lpn1: "DNK test na polineuropatiju leonbergera (LPN1)",
      dna_lpn2: "DNK test na polineuropatiju leonbergera (LPN2)",
      dna_lppn3: "DNK test na paralizu grkljana i polineuropatiju (LPPN3)",
      dna_huu: "DNK test na hiperurikozuriju (HUU)",
      dna_dcm: "DNK test na dilatacijsku kardiomiopatiju (DCM), bolest srčanog mišića",
      dna_pra5: "DNK test na progresivnu atrofiju mrežnice (PRA5)",
      dna_dings2: "DNK test na bolest „plešućeg dobermana“ (DINGS2), poremećaj živaca i mišića",
      dna_slem: "DNK test na spongiformnu leukoencefalomijelopatiju (SLEM, „sindrom drhtavog šteneta“), bolest mozga i leđne moždine kod mladih štenaca",
      dna_ams: "DNK test na sindrom akralne mutilacije (AMS), poremećaj živaca zbog kojeg šape gube osjet boli",
      dna_dams: "DNK test na sindrom diseritropoetske anemije i miopatije (DAMS), poremećaj krvi i mišića",
      dna_fuco: "DNK test na fukozidozu, nasljednu bolest živčanog sustava",
      dna_pfk: "DNK test na nedostatak fosfofruktokinaze (PFK), nasljedni enzimski poremećaj krvi i mišića",
      dna_pra_cord1: "DNK test na progresivnu atrofiju mrežnice (PRA cord1)",
      dna_bbs2_pra: "DNK test na progresivnu atrofiju mrežnice (BBS2-PRA)",
      dna_cnga1_pra: "DNK test na progresivnu atrofiju mrežnice (CNGA1-PRA)",
      dna_pra_rcd2: "DNK test na progresivnu atrofiju mrežnice (PRA-rcd2)",
      dna_gm1: "DNK test na GM1 gangliozidozu (nasljednu bolest živčanog sustava)",
      dna_gm2: "DNK test na GM2 gangliozidozu (nasljednu bolest živčanog sustava)",
      dna_vwd3: "DNK test na von Willebrandovu bolest tipa 3 (vWD3), nasljedni poremećaj zgrušavanja krvi",
      dna_commd1: "Test na toksikozu bakrom (COMMD1), nasljedno nakupljanje bakra u jetri",
      dna_pra_rcd3: "DNK test na progresivnu atrofiju mrežnice (PRA-rcd3)",
      dna_clad: "DNK test na nedostatak adhezije leukocita (CLAD), nasljedni poremećaj imuniteta",
      dna_ncl8: "DNK test na neuronsku ceroidnu lipofuscinozu (NCL8), nasljednu bolest živčanog sustava",
      dna_pra_rcd1: "DNK test na progresivnu atrofiju mrežnice (rcd1)",
      dna_pra4: "DNK test na progresivnu atrofiju mrežnice (PRA4)",
      dna_vwd2: "DNK test na von Willebrandovu bolest tipa 2 (vWD2), nasljedni poremećaj zgrušavanja krvi",
      dna_l2hga: "DNK test na L-2-hidroksiglutarnu aciduriju (L-2-HGA), nasljednu metaboličku bolest živčanog sustava",
      dna_pll: "DNK test na primarnu luksaciju leće (PLL), nasljednu bolest oka pri kojoj leća sklizne s mjesta",
      dna_mps3b: "DNK test na mukopolisaharidozu tipa IIIB (MPS IIIB), nasljednu metaboličku bolest živčanog sustava",
      dna_tbox: "DNK test na gen T-box koji uzrokuje prirodno kratak rep",
      dna_loa: "DNK test na ataksiju s kasnim početkom (LOA), nasljednu bolest koja utječe na ravnotežu i koordinaciju",
      dna_sca: "DNK test na spinocerebelarnu ataksiju (SCA), nasljednu bolest živčanog sustava",
      dna_chg: "DNK test na prirođenu hipotireozu sa strumom (CHG), nasljednu bolest štitnjače prisutnu od rođenja",
    },
  },
  health: {
    shar_pei_fever: "U pasmine se može pojaviti obiteljska groznica šarpeja: napadaji visoke temperature s bolnim, natečenim zglobovima i natečenim licem – odmah veterinaru.",
    weight_gain: "Lako se deblja – treba paziti na porcije i poslastice.",
    hip_elbow_dysplasia_eye_conditions: "Može biti sklon displaziji kuka i lakta te nekolicini nasljednih bolesti očiju.",
    cancer_risk: "Izvori opisuju veći rizik od raka u ovoj pasmini.",
    flat_face_breathing:
      "Pasmina spljoštenog lica (brahicefalična): kratka njuška, uske nosnice i višak mekog tkiva u dišnim putovima mogu otežati disanje (brahicefalični opstruktivni sindrom dišnih putova, BOAS).",
    heat_stroke_risk: "Brzo se pregrije i osjetljiviji je na toplinski udar od većine pasa, osobito po toplom vremenu.",
    skin_fold_ear_problems: "Sklon je upalama uha i infekcijama kožnih nabora; nabore treba održavati čistima i suhima.",
    ear_infections_long_ears: "Zbog dugih ušiju mogu se pojaviti upale uha; bakterije se mogu nakupljati u zvukovodu.",
    collie_eye_pra:
      "U pasmini se javljaju nasljedne bolesti očiju: anomalija oka kolija, nepravilnost na stražnjem dijelu oka, i progresivna atrofija mrežnice, koja polako može dovesti do sljepoće; dostupni su pregledi očiju i DNK testovi.",
    merle_colour_risk: "Merle nije boja prema standardu pasmine; u ovoj pasmini nosi veći rizik od problema sa sluhom i vidom.",
    hind_leg_conformation:
      "Royal Kennel Club navodi oblik stražnjih nogu i način kretanja kao točku zabrinutosti u ovoj pasmini; zdrav pas ima ravna leđa i umjereno angulirane stražnje noge.",
    hip_elbow_dysplasia: "Može biti sklon displaziji kuka i lakta; uzgajivačima se savjetuje da prije uzgoja testiraju kukove i laktove roditelja.",
    degenerative_myelopathy: "U pasmini se javlja degenerativna mijelopatija, bolest leđne moždine koja polako slabi stražnje noge; dostupan je DNK test.",
    exercise_induced_collapse: "U pasmini se javlja kolaps izazvan naporom, nasljedno neuromišićno stanje zbog kojeg se pas nakon teškog napora može srušiti.",
    heart_valve_disease:
      "Bolest srca uzrokovana slabljenjem mitralnog zaliska velik je problem u ovoj pasmini; često se najprije primijeti kao šum na srcu, a psima za uzgoj najprije treba ocijeniti srce.",
    chiari_syringomyelia:
      "U pasmini se javljaju malformacija nalik Chiarijevoj i siringomijelija, bolno stanje sa šupljinama ispunjenima tekućinom u leđnoj moždini blizu mozga, povezano s oblikom lubanje; dijagnosticira se magnetskom rezonancijom.",
    eye_conditions:
      "U pasmini se javljaju nasljedne bolesti očiju poput katarakte, a izbočene ili nadražene oči točka su zabrinutosti; dostupni su pregledi očiju i DNK testovi.",
    epilepsy: "U pasmini se javlja epilepsija, poremećaj mozga koji može uzrokovati napadaje.",
    storage_disease: "Nasljedna bolest nakupljanja u živčanom sustavu može zahvatiti mlade pse ove pasmine; DNK test roditelja omogućuje uzgajivačima da je izbjegnu.",
    chondrodysplasia: "U pasmini se javlja hondrodisplazija, poremećaj rasta hrskavice i kostiju; štenad se može pregledati rendgenom.",
    polyneuropathy: "U pasmini se javlja nasljedna bolest živaca (polineuropatija); DNK test roditelja omogućuje uzgajivačima da je izbjegnu.",
    fanconi_kidney_disease: "U pasmi se može pojaviti Fanconijev sindrom, nasljedna bolest bubrega pri kojoj šećer prelazi u mokraću.",
    fanconi_syndrome:
      "U pasmini se javlja Fanconijev sindrom, nasljedna bolest bubrega zbog koje šećer prelazi u mokraću; DNK test roditelja omogućuje uzgajivačima da ga izbjegnu.",
    pyruvate_kinase_deficiency: "U pasmini se može pojaviti nedostatak piruvat-kinaze, nasljedna mana crvenih krvnih stanica koja uzrokuje anemiju.",
    back_disc_disease: "U pasmini se javlja bolest intervertebralnih diskova, problem s diskovima koji ublažuju pokrete između kralježaka.",
    pra_eye_disease:
      "U pasmini se javlja progresivna atrofija mrežnice, nasljedna bolest oka koja polako može dovesti do sljepoće; dostupni su DNK testovi i pregledi očiju.",
    hip_dysplasia:
      "U pasmini se javlja displazija kuka, loše razvijen zglob kuka koji može dovesti do artritisa; uzgajivačima se savjetuje da roditeljima ocijene kukove.",
    bloat_gdv: "U pasmini se može pojaviti proširenje i torzija želuca (GDV), pri kojoj se želudac uvrne – to je hitan slučaj i treba odmah k veterinaru.",
    inherited_eye_disease: "U pasmini se javljaju nasljedne bolesti očiju poput anomalije oka kolija, katarakte i progresivne atrofije mrežnice.",
    drug_sensitivity_mdr1:
      "Neki psi ove pasmine imaju nasljednu osjetljivost na određene lijekove (osjetljivost na više lijekova, MDR1) – ako je tvoj pas zahvaćen, reci to veterinaru.",
    merle_to_merle_breeding:
      "Merle je u ovoj pasmini boja prema standardu; dva merle psa ne bi se smjela pariti jer takva štenad može imati oštećen vid i sluh – Royal Kennel Club ih ne upisuje u rodovnu knjigu.",
    kneecap_luxation: "U pasmini se javlja luksacija patele, pri kojoj čašica koljena povremeno iskoči s mjesta.",
    copper_liver_disease: "U pasmini se javlja toksikoza bakrom, nasljedno nakupljanje bakra u jetri koje može dovesti do kroničnog hepatitisa; uzgajivači mogu testirati roditelje.",
    retinal_eye_conditions: "U pasmini se javljaju nasljedne bolesti očiju, primjerice displazija mrežnice; pregledi očiju su dostupni.",
    pra_and_eyelashes:
      "U pasmini se javljaju problemi s očima: progresivna atrofija mrežnice, koja polako može dovesti do sljepoće, i dodatne trepavice koje trljaju oko (distihijaza); uzgajivačima se savjetuje da roditeljima pregledaju oči.",
    liver_shunt: "U pasmini se može pojaviti portosistemski (jetreni) šant, pri kojem krv zaobilazi jetru.",
    skin_allergies:
      "Kožne alergije poznat su problem u ovoj pasmini; Royal Kennel Club traži od sudaca da paze na znakove upale kože, a vlasnicima se savjetuje da prije odabira šampona pitaju veterinara.",
    westie_lung:
      "U pasmini se može pojaviti bolest pluća poznata kao „westie lung“ (idiopatska plućna fibroza), koja otežava disanje, uglavnom kod starijih pasa.",
    jaw_bone_disorder: "U pasmini se može pojaviti nasljedni poremećaj kostiju čeljusti.",
    dry_eye: "U pasmini se može pojaviti suho oko, pri kojem oči ne stvaraju dovoljno suza pa postanu suhe i bolne.",
    heart_hcm: "U pasmini se javlja hipertrofična kardiomiopatija (HCM), nasljedna bolest srca pri kojoj se srčani mišić zadeblja.",
    dental_weight_nail_care:
      "Velika britanska studija navodi bolesti zubi, prekomjernu težinu i preduge kandže među najčešćim problemima u pasmini, pa se vlasnicima savjetuje redovita njega zubi, kontrola težine i njega kandži.",
    dental_weight_care:
      "PetMD navodi bolesti zubi i prekomjernu težinu među problemima na koje treba paziti, pa se vlasnicima savjetuje da mački redovito peru zube i paze na njezinu težinu.",
    gsd_iv:
      "U pasmini se javlja bolest nakupljanja glikogena tipa IV (GSD IV), nasljedni poremećaj koji pogađa mačiće; DNK test roditelja omogućuje uzgajivačima da je izbjegnu.",
    hip_dysplasia_weight: "U pasmini se može pojaviti displazija kuka, loše razvijen zglob kuka; PetMD savjetuje da mačka ima zdravu težinu kako bi se zaštitili zglobovi.",
    laryngeal_paralysis_polyneuropathy:
      "U pasmini se javlja juvenilna paraliza grkljana i polineuropatija (JLPP), nasljedna bolest živaca koja zahvaća grkljan i stražnje noge; DNK test roditelja omogućuje uzgajivačima da je izbjegnu.",
    heart_sas: "U pasmini se javlja subaortna stenoza, suženje odmah ispod srčanog zaliska koje može uzrokovati šum; psima za uzgoj najprije treba pregledati srce.",
    inherited_eye_defects: "U pasmini se javljaju nasljedne bolesti očiju poput displazije mrežnice i perzistentne pupilarne membrane; dostupni su pregledi očiju.",
    skin_fold_infections: "Kožni nabori, osobito na licu, mogu zadržavati vlagu i inficirati se (pioderma kožnih nabora); nabore na licu treba čistiti svaki dan.",
    eyelid_eye_problems: "U pasmini se javljaju problemi s kapcima (uvrnuti ili izvrnuti kapci), suho oko i prolaps žlijezde trećeg kapka („cherry eye“); dostupni su pregledi očiju.",
    hip_elbow_joint_disease: "U pasmini se javljaju displazija kuka i lakta, pri kojima se zglobovi ne razvijaju pravilno, a to može dovesti do bolesti zglobova.",
    hip_dysplasia_arthritis: "U pasmini se javlja displazija kuka, labav i loše razvijen zglob kuka, koja s vremenom može dovesti do artritisa.",
    bleeding_disorder_vwd: "U pasmini se javlja von Willebrandova bolest, nasljedni problem sa zgrušavanjem krvi koji može uzrokovati pretjerano krvarenje.",
    heart_muscle_disease: "U pasmini se može pojaviti kardiomiopatija, povećanje srca zbog slabljenja srčanog mišića.",
    itchy_skin_allergy: "U pasmini se mogu pojaviti kožne alergije (atopija), koje uzrokuju svrbež i bolnu kožu.",
    entropion_cherry_eye:
      "U pasmini se mogu pojaviti kapci okrenuti prema unutra (entropion) i „cherry eye“, pri kojem iskoči treći kapak; „cherry eye“ može se kirurški ispraviti.",
    dental_disease_tooth_brushing:
      "Velika britanska studija navodi bolesti zubi kao daleko najčešći problem u pasmini, a česti su i mliječni zubi koji ne ispadnu, pa se vlasnike potiče da se svaki dan brinu o psećim zubima, primjerice da ih peru.",
    windpipe_collapse: "U pasmini se može pojaviti kolaps dušnika, pri kojem dušnik gubi čvrstoću, što može uzrokovati slabost i kolaps.",
    eye_problems_pra_lens_dry_eye:
      "U pasmini se javljaju problemi s očima poput progresivne atrofije mrežnice, koja polako može dovesti do sljepoće, iščašene leće (luksacija leće) i suhog oka.",
    cataracts_lens_luxation: "U pasmini se mogu pojaviti problemi s očima poput katarakte, koja zamućuje leću, i iščašene leće (luksacija leće).",
    wobbler_syndrome: "U pasmini se može pojaviti wobbler sindrom, pri kojem nestabilni vratni kralješci pritišću leđnu moždinu i slabe stražnje noge.",
    eye_phpv:
      "U pasmini se može pojaviti prirođena mana oka (perzistentni hiperplastični primarni vitreus, PHPV); uzgajivačima se savjetuje da roditeljima pregledaju oči.",
    certain_cancers: "U pasmini se mogu pojaviti određene vrste raka.",
    bare_skin_sun_cold: "Gola koža bezdlake varijante treba zaštitu od sunca i hladnoće.",
    l2hga_nervous_system:
      "U pasmini se može pojaviti L-2-hidroksiglutarna acidurija (L-2-HGA), nasljedni metabolički poremećaj koji zahvaća živčani sustav; dostupan je DNK test roditelja.",
    short_face_breathing:
      "Pasmina umjereno kratkog lica: neki psi kraćeg lica mogu imati ozbiljne probleme s disanjem (brahicefalični opstruktivni sindrom dišnih putova, BOAS).",
    corneal_ulcers: "Zbog oblika lubanje i izbočenih očiju vjerojatniji su problemi s očima poput čira rožnice; dostupni su pregledi očiju.",
    skin_folds_allergies:
      "Mogu se pojaviti kožni problemi poput alergija, bradavica, kožnih izraslina i bolnih kožnih nabora na licu (dermatitis kožnih nabora); nabore na licu treba održavati čistima i suhima.",
    heart_cardiomyopathy_aortic_stenosis: "U pasmini se mogu pojaviti problemi sa srcem poput kardiomiopatije i stenoze aorte.",
    dental_disease_care: "Velika britanska studija navodi bolesti zubi kao najčešći problem u pasmini, a vlasnicima se savjetuje da njegu zubi stave na prvo mjesto.",
    bladder_stones: "U pasmini se mogu pojaviti kamenci u mokraćnom mjehuru, nakupine minerala koje nastaju u mjehuru i mokraći.",
    deafness: "U pasmini se javlja gluhoća na jedno ili oba uha; sluh štenadi može se provjeriti BAER testom.",
    mitral_valve_disease:
      "U pasmini se javlja bolest mitralnog zaliska, stanje srca pri kojem oslabljeni zalistak propušta krv natrag u srce; veterinar može poslušati srce psa prije uzgoja.",
    eye_problems_pra_cataracts_dry_eye:
      "U pasmini se javljaju problemi s očima poput progresivne atrofije mrežnice, koja polako može dovesti do sljepoće, katarakte i suhog oka; dostupni su pregledi očiju.",
    skin_comedo_allergy:
      "Mogu se pojaviti kožni problemi poput sindroma komedona šnaucera (vrsta upaljenih folikula dlake) i kožnih alergija (atopija) koje uzrokuju svrbež.",
    shorter_face_boas: "Brahicefalična pasmina (kratkog lica): kraće lice može uzrokovati ozbiljne probleme s disanjem (brahicefalični opstruktivni sindrom dišnih putova, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina:
      "U pasmini se javljaju problemi s očima poput suhog oka, katarakte, progresivne atrofije mrežnice, koja polako može dovesti do sljepoće, i odvajanja mrežnice.",
    hypothyroidism: "U pasmini se može pojaviti smanjena funkcija štitnjače (hipotireoza), koja može utjecati na težinu, kožu i razinu energije.",
    open_fontanelle: "U pasmini se može pojaviti otvorena fontanela, meko mjesto na lubanji koje se ne zatvori do kraja.",
    collapsing_trachea: "U pasmini se može pojaviti kolaps dušnika, slabost dušnika koja može uzrokovati kašalj i otežano disanje.",
    gm1_gangliosidosis: "U pasmini se može pojaviti GM1 gangliozidoza, nasljedna bolest živčanog sustava; DNK test roditelja može je isključiti.",
    gm2_gangliosidosis: "U pasmini je utvrđena GM2 gangliozidoza, smrtonosna nasljedna bolest živčanog sustava.",
    addisons_disease: "U pasmini se može pojaviti Addisonova bolest, nedostatak hormona nadbubrežnih žlijezda.",
    protein_losing_disease: "U pasmini se mogu pojaviti bolesti bubrega ili crijeva s gubitkom proteina, koje mogu uzrokovati proljev i gubitak težine.",
    diabetes_mellitus: "U pasmini se može pojaviti šećerna bolest (diabetes mellitus), pri kojoj tijelo ne može pravilno regulirati šećer u krvi.",
    dental_disease_home_brushing:
      "Kao i mnogi mali psi, ova je pasmina sklona bolestima zubi, pa se savjetuje pranje zubi kod kuće psećom četkicom i pastom za zube.",
    dermoid_sinus:
      "U pasmini se može pojaviti dermoidni sinus, bolno stanje pri kojem cjevčica u koži na leđima povezuje kožu s leđnom moždinom; klubovi pasmine provode program pregleda štenadi na dermoidni sinus.",
    cataracts: "U pasmini se može pojaviti katarakta, koja zamućuje očnu leću i može dovesti do gubitka vida.",
    pra_inherited_blindness: "U pasmini se može pojaviti progresivna atrofija mrežnice, nasljedna bolest oka koja polako može dovesti do sljepoće.",
    eyelids_turned: "U pasmini se mogu pojaviti kapci okrenuti prema unutra (entropion) ili prema van (ektropion); traži roditelje s pregledanim očima.",
    glaucoma_poag:
      "U pasmini se može pojaviti primarni glaukom otvorenog kuta, pri kojem se u oku nakuplja tekućina, što uzrokuje bol i moguću sljepoću; postoji DNK test za roditelje.",
    skin_fold_dermatitis: "Labava koža stvara nabore koji mogu postati bolni i inficirani; treba ih svaki dan pregledati i održavati čistima i suhima.",
    skin_fold_care: "Kožni nabori na licu mogu postati bolni i inficirani (dermatitis kožnih nabora); treba ih redovito čistiti i sušiti.",
    eyelid_problems:
      "U pasmini se mogu pojaviti problemi s kapcima: kapci okrenuti prema unutra (entropion) ili prema van (ektropion) i „cherry eye“, pri kojem iskoči treći kapak.",
    skin_allergy_face_folds: "U pasmini se mogu pojaviti kožne alergije (atopija) koje uzrokuju svrbež, a kožne nabore na licu treba čistiti svaki dan.",
    skin_ear_allergies:
      "U pasmini se mogu pojaviti alergije na okoliš, koje mogu dovesti do ponavljajućih infekcija kože ili uha; PetMD psu s alergijama predlaže čišćenje ušiju jednom tjedno.",
    gum_disease_daily_brushing:
      "Pasmina je sklona bolestima desni (gingivitis i parodontna bolest), pa PetMD savjetuje svakodnevno pranje psećih zubi i godišnji pregled zubi kod veterinara.",
    pra_pk_def:
      "U pasmini se javljaju dva nasljedna stanja: progresivna atrofija mrežnice, bolest oka koja može dovesti do sljepoće, i nedostatak piruvat-kinaze, poremećaj krvi; DNK testovi roditelja omogućuju uzgajivačima da ih izbjegnu.",
    windpipe_collapse_breathing: "U pasmini se može pojaviti kolaps dušnika, pri kojem se prstenovi dušnika uruše i otežavaju disanje.",
    eye_problems_pra_cataracts_entropion:
      "U pasmini se javljaju problemi s očima poput progresivne atrofije mrežnice, koja polako može dovesti do sljepoće, katarakte, koja zamućuje leću, i kapaka okrenutih prema unutra (entropion); dostupni su pregledi očiju.",
    elbow_dysplasia_arthritis: "U pasmini se može pojaviti displazija lakta, loše razvijen zglob lakta koji s vremenom može dovesti do artritisa.",
    entropion: "U pasmini se može pojaviti entropion, pri kojem se kapci okreću prema unutra i nadražuju oko; traži roditelje s pregledanim očima.",
    autoimmune_conditions: "U pasmini se mogu pojaviti autoimune bolesti, pri kojima tijelo reagira protiv samoga sebe.",
    ear_infections_prone: "Pasmina je sklona upalama uha; pomno prati higijenu ušiju.",
    familial_nephropathy: "U pasmini se javlja nasljedna bolest bubrega (obiteljska nefropatija); dostupan je DNK test roditelja.",
    hereditary_nephritis: "U pasmini se javlja nasljedna bolest bubrega (nasljedni nefritis, poznat i kao nasljedna glomerulopatija samojeda).",
    hereditary_nephritis_pkd: "U pasmini se javljaju nasljedne bolesti bubrega (nasljedni nefritis i policistična bolest bubrega).",
    mucopolysaccharidosis_mps3b: "U pasmini se javlja mukopolisaharidoza tipa IIIB, nasljedna metabolička bolest koja zahvaća živčani sustav; dostupan je DNK test roditelja.",
    panosteitis: "U pasmini se može pojaviti panosteitis, bolna upala dugih kostiju koja obično pogađa mlade pse u rastu.",
    splenic_torsion: "Torzija slezene, koja zahtijeva hitnu veterinarsku pomoć, u ovoj se pasmini javlja češće nego kod drugih velikih pasmina.",
    urinary_incontinence: "U pasmini se može pojaviti urinarna inkontinencija, nekontrolirano curenje mokraće.",
    osteochondritis: "U pasmini se može pojaviti osteohondritis disekans (OCD), poremećaj zglobne hrskavice kod pasa u rastu.",
    scottie_cramp: "U pasmini se javlja „Scottie cramp“ – kratke epizode grčenja mišića, obično izazvane uzbuđenjem; nije bolno.",
    slem_shaking_puppy: "Kod pasmine se može pojaviti spongiformna leukoencefalomijelopatija (SLEM), zvana i sindrom drhtavog šteneta; DNK test pomaže uzgajivačima da je izbjegnu.",
    cecs_cramping: "Kod pasmine se javlja epileptoidni sindrom grčeva u pasa (CECS) – napadaji drhtanja i mišićnih grčeva.",
    gallbladder_mucocele: "Kod pasmine se može pojaviti mukokela žučnog mjehura – mjehur se ispuni gustom sluzi i ne može se pravilno prazniti; ponekad je potrebna operacija.",
    periodontal_disease: "Parodontna bolest, infekcija i upala desni i tkiva koja drže zube, poznat je problem u pasmini.",
    extra_eyelashes:
      "U pasmini se može pojaviti distihijaza, pri kojoj sitne dodatne trepavice rastu na unutarnjoj površini ili rubu kapka i mogu trljati oko; traži roditelje pregledane u programu za oči.",
    cm_sm_screening:
      "U pasmini se mogu pojaviti malformacija nalik Chiarijevoj i siringomijelija, bolno stanje sa šupljinama ispunjenima tekućinom u leđnoj moždini blizu mozga; uzgajivačima se savjetuje pregled roditelja (UK: program BVA/KC).",
    prominent_eyes_injury_dry_eye: "Izbočene oči lakše se ozlijede i na njima se mogu razviti čirevi i suhoća; u pasmini se javljaju i suho oko i „cherry eye“.",
    legg_perthes: "U pasmini se može pojaviti Legg-Calvé-Perthesova bolest, bolno stanje pri kojem glava bedrene kosti u zglobu kuka odumire i propada.",
    glaucoma: "U pasmini se može pojaviti glaukom, povišeni tlak u oku koji može biti bolan i dovesti do sljepoće.",
    lethal_acrodermatitis: "U pasmini se javlja letalni akrodermatitis, nasljedna bolest koja kod štenadi uzrokuje teške probleme s kožom i rastom.",
    kidney_disease_urine_screening: "U pasmini se javljaju problemi s bubrezima; pretragama mokraće roditelji se mogu pregledati prije uzgoja.",
    primary_lens_luxation:
      "U pasmini se javlja primarna luksacija leće, bolno nasljedno stanje oka pri kojem leća sklizne s mjesta i koje može uzrokovati sljepoću; za pse za uzgoj dostupan je DNK test.",
    inherited_ataxia:
      "U pasmini se javljaju nasljedne ataksije (ataksija s kasnim početkom i spinocerebelarna ataksija), koje uzrokuju gubitak ravnoteže i koordinacije; za pse za uzgoj dostupni su DNK testovi.",
    hydrocephalus: "U pasmini se može pojaviti hidrocefalus, nakupljanje tekućine oko mozga.",
    heart_disease_pda:
      "U pasmini se mogu pojaviti bolesti srca, uključujući otvoreni arterijski duktus, krvnu žilu blizu srca koja se nakon rođenja ne zatvori; veterinar ga može čuti na prvom pregledu šteneta.",
    chiari_malformation:
      "U pasmini se može pojaviti malformacija nalik Chiarijevoj sa siringomijelijom, bolno stanje sa šupljinama ispunjenima tekućinom u leđnoj moždini blizu mozga.",
    cataracts_entropion:
      "U pasmini se mogu pojaviti katarakta, koja zamućuje očnu leću, i kapci okrenuti prema unutra (entropion); traži roditelje pregledane u programu za oči.",
    periodontal_daily_brushing: "Pasmina je sklona bolestima desni (parodontna bolest), pa se savjetuje svakodnevno pranje zubi psećom pastom za zube.",
    eye_problems_shallow_sockets:
      "U pasmini se javljaju problemi s očima poput suhog oka, infekcija oka i čireva na površini oka; zbog plitkih očnih duplji vjerojatnije su i ozljede očiju.",
    eye_problems_dry_eye_entropion_lens_luxation:
      "U pasmini se javljaju problemi s očima poput suhog oka, kapaka okrenutih prema unutra (entropion) i iščašene leće (luksacija leće); dostupni su pregledi očiju.",
    heart_valve_screening: "U pasmini se mogu pojaviti bolesti srca; ultrazvuk srca može prije uzgoja provjeriti imaju li roditelji problema sa srčanim zaliscima.",
    dental_weight_problems:
      "Velika britanska studija navodi bolesti zubi i prekomjernu težinu kao osobito česte probleme u pasmini – probleme koje vlasnici mogu pomoći spriječiti; javljaju se i zbijeni zubi te mliječni zubi koji ne ispadnu.",
  },
  page: {
    eyebrow: "Enciklopedija životinja",
    // Search terms people use ("ragdoll mačka", "narav"); "narav" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "narav, " : ""}kretanje, veličina i njega | PetPrep`
        : species === "cat"
          ? `${/mačka/i.test(name) ? name : `${name} mačka`}: ${hasIntro ? "narav, " : ""}njega dlake, veličina i životni vijek | PetPrep`
          : `${name} (${lc(one)}): potrebe, životni vijek i njega | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Izvori, zdravlje i savjeti prije kupnje.`,
    metaLabels: { weight: "težina", exercise: "kretanje", lifespan: "životni vijek" },
    metaDescription: (name, one) =>
      `${name}: potrebe ove pasmine (${lc(one)}) prema izvorima – kretanje, njega dlake, obroci, veličina, životni vijek, kome odgovara – i kako je PetPrep simulira.`,
    suitabilityTitle: "Kome odgovara",
    suitabilityNote: "Iste oznake kao u aplikaciji. Svaku potvrđuju izvori navedeni na dnu stranice.",
    suitabilityNone: "Za ovu pasminu još nemamo oznake potvrđene izvorima.",
    needsTitle: "Što treba",
    needsIntro: (species) =>
      species === "cat"
        ? "Prema felinološkim savezima, veterinarskim organizacijama i studijama. Kad se izvori razlikuju, prikazujemo svaki."
        : "Prema standardima pasmina, kinološkim savezima, veterinarskim dobrotvornim organizacijama i studijama. Kad se izvori razlikuju, prikazujemo svaki.",
    general: (many) => `Opće smjernice za ${acc(many)} (ne samo za ovu pasminu):`,
    noData: "Toga još nema u našim izvorima.",
    simTitle: "Kako to PetPrep simulira",
    simBadge: "Pravila igre, ne veterinarski savjet",
    simIntro:
      "U PetPrepu je jedan stvarni tjedan jedan mjesec života ljubimca. Ovo su pravila koja igra koristi za ovu pasminu. PetPrep ih je odabrao na temelju izvora s ove stranice; to nisu upute za njegu stvarnog ljubimca.",
    simInfoOnly: "Ova je pasmina u enciklopediji samo informativno; aplikacija je još ne simulira.",
    simTable: { stage: "Životna faza", starts: "Početak", meals: "Obroci dnevno", activity: { steps: "Dnevni cilj koraka", play_sessions: "Igra dnevno" } },
    arrives: (m) => `dolazi u dobi od ${m}${NB}${form(m, "mjeseca", "mjeseca", "mjeseci")}`,
    fromMonth: (m, years) => (years ? `${m}. mjesec (${years})` : `${m}. mjesec`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `od ${x.from}. mjeseca: ${x.meals}`)).join("; "),
    simDecisions: "Svaki broj u igri odluka je PetPrepa, zabilježena zajedno s izvorima.",
    healthTitle: "Zdravlje",
    healthNote: "Samo informativno, veterinar to nije pregledao. Za svog ljubimca pitaj veterinara.",
    healthNone: "Naši izvori za ovu pasminu još ne sadrže zdravstvene informacije specifične za pasminu.",
    checklistTitle: "Prije kupnje: što provjeriti kod uzgajivača",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Pitanja koja trebaš razjasniti prije nego što mače odvedeš kući. Točke su savjeti veterinara, udruga za dobrobit životinja i felinoloških saveza; uz svaku je naveden izvor."
        : "Pitanja koja trebaš razjasniti prije nego što štene odvedeš kući. Točke su savjeti veterinara, udruga za dobrobit životinja i kinoloških saveza; uz svaku je naveden izvor.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Propisi o najmanjoj dobi, čipiranju i cijepljenju razlikuju se od države do države – provjeri pravila tamo gdje živiš.",
    checklistGeneralTitle: "Za svaku pasminu",
    checklistTestsTitle: "Zdravstveni testovi roditelja za ovu pasminu",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Testovi koje felinološki savez zahtijeva prije uzgoja mačke" : "Testovi koje Royal Kennel Club preporučuje kao minimum",
      best_practice: "Dodatni testovi prema najboljoj praksi",
      other_scheme: "Drugi programi pregleda za ovu pasminu",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Ovaj popis potječe iz uzgojnih pravila stranog felinološkog saveza (vidi izvor) i služi za orijentaciju. Pitaj uzgajivača koje su testove roditelji prošli."
        : "Ovi popisi potječu od britanskog Royal Kennel Cluba i služe za orijentaciju; nacionalni kinološki savezi mogu imati vlastita, stroža pravila. Pitaj klub pasmine i uzgajivača koje su testove roditelji prošli.",
    checklistStatus: {
      none_recommended:
        "Royal Kennel Club za ovu pasminu trenutačno ne navodi preporučene zdravstvene preglede prije uzgoja. Ipak pitaj uzgajivača o zdravlju roditelja.",
      not_found:
        "Još nismo pronašli pouzdan izvor koji navodi zdravstvene testove roditelja za ovu pasminu. Pitaj klub pasmine i uzgajivača koje su testove roditelji prošli.",
      not_checked: "Zdravstvene testove roditelja za ovu pasminu još nismo provjerili. Pitaj klub pasmine i uzgajivača koje su testove roditelji prošli.",
    },
    sourcesTitle: "Izvori",
    sourcesIntro: "Svaka činjenica na ovoj stranici navodi jedan od ovih izvora.",
    sourcesAll: "Prikaži sve izvore",
    sourcesFewer: "Prikaži manje",
    sourceLabel: (id, publisher) => `Izvor ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulacija za obitelji. Ova stranica nije veterinarski savjet – za stvarnog ljubimca pitaj veterinara ili klub pasmine.",
    backTo: (many) => `Sve pasmine ${gen(many)}`,
    compareWith: "Usporedi s drugim pasminama",
    related: { title: "Slične pasmine", intro: (many) => `Druge pasmine ${gen(many)} u enciklopediji sa sličnim potrebama – svaka s činjenicama iz izvora.` },
    updated: "Ažurirano",
    glanceTitle: "Ukratko",
    glanceNote: "Ključne činjenice iz izvora na dnu stranice. Kad se izvori razlikuju, navodimo svaku vrijednost.",
    portraitAlt: { ai_photo: (name) => `${name} – fotografija (AI)`, ai_illustration: (name) => `${name} – ilustracija (AI)` },
    portraitCaption: { ai_photo: "Fotografija izrađena umjetnom inteligencijom", ai_illustration: "Ilustracija izrađena umjetnom inteligencijom" },
    portraitColours: {
      legend: "Boja dlake",
      alt: {
        ai_photo: (name, colour) => `${name}, boja dlake: ${lc(colour)} – fotografija (AI)`,
        ai_illustration: (name, colour) => `${name}, boja dlake: ${lc(colour)} – ilustracija (AI)`,
      },
    },
    share: {
      button: "Podijeli",
      title: "Podijeli ovu pasminu",
      copy: "Kopiraj",
      copied: "Kopirano",
      linkLabel: "Poveznica na ovu stranicu",
      more: "Više mogućnosti",
      text: (name) => `${name}: potrebe, izvori i kako je PetPrep simulira`,
      emailSubject: (name) => `${name} – enciklopedija životinja PetPrepa`,
      on: (network) => `Podijeli: ${network}`,
    },
    og: { lead: "Potrebe, izvori i kako je PetPrep simulira", photoLabel: "AI fotografija" },
    qa: {
      title: "Pitanja i odgovori",
      intro: "Odgovaramo samo na temelju činjenica iz izvora na ovoj stranici; svaki odgovor navodi svoje izvore.",
      // Breed names are lower case in running text ("njemački ovčar", "zlatni retriver") and stay in the nominative; the
      // wording avoids past tense and adjectives that would have to agree with the gender of the name ("bengalska mačka").
      questions: {
        exercise: (n) => `Koliko kretanja treba ${mid(n)}?`,
        lifespan: (n) => `Koliko dugo živi ${mid(n)}?`,
        size: (n) => `Koliko naraste i koliko teži ${mid(n)}?`,
        grooming: (n) => `Koliko njege dlake treba ${mid(n)}?`,
        suits: (n) => `Kome odgovara ${mid(n)}?`,
      },
      leads: {
        exercise: (n) => `Prema našim izvorima ${mid(n)} treba ovoliko kretanja:`,
        lifespan: (n) => `Životni vijek (${mid(n)}) prema našim izvorima:`,
        size: (n) => `Veličina i težina odrasle životinje (${mid(n)}) prema našim izvorima:`,
        grooming: (n) => `Dlaka i njega (${mid(n)}) prema našim izvorima:`,
        suits: (n) => `Prema našim izvorima ${mid(n)} dobar je izbor:`,
      },
      considerLead: "Imaj na umu:",
      differ: "Izvori navode različite vrijednosti, pa navodimo svaku.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolski ovčar velik je, snažno građen pas čuvar stada iz Turske; FCI turskog ovčarskog psa opisuje kao kangala (Kangal Shepherd Dog) – jednobojnog, od žućkaste do vučje sive boje s crnom maskom, visine 72–78 cm za mužjake i 65–73 cm za ženke. Američki standard pasmine navodi 110–150 funti (oko 50–68 kg) za mužjake i 80–120 funti (oko 36–54 kg) za ženke. Pas te veličine odraste s otprilike 18–24 mjeseca (PetMD); The Royal Kennel Club navodi životni vijek od preko 10 godina, a WebMD prosječno 11 do 13 godina.",
        "The Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno, navodi da linja i da mu odgovara velika kuća s velikim vrtom na selu te ga svrstava u 1. kategoriju programa Breed Watch. PetMD piše da je anatolski ovčar vjerojatno najprikladniji za dom bez male djece, da se štenci koje rano upoznamo s drugim životinjama s njima obično dobro slažu, da je rana socijalizacija ključna, da se dlaka izvan dvaju godišnjih linjanja češlja jednom tjedno te da treba izbjegavati kretanje oko obroka.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irski seter, Irish Setter",
      text: [
        "Irski crveni seter (Irish Setter) vitak je, atletski ptičar iz Irske, uzgojen za traženje divljači na prostranom terenu. Standard FCI opisuje samo jednu boju – zasićeno kestenjastu bez traga crne – i visinu od 58–67 cm za mužjake te 55–62 cm za ženke; američki standard pasmine idealnim smatra oko 70 funti (oko 32 kg) za mužjaka i 60 funti (oko 27 kg) za ženku. Pas ove veličine odraste s otprilike 15–18 mjeseci (PetMD), a The Royal Kennel Club navodi životni vijek dulji od 10 godina.",
        "The Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno, navodi da linja i da treba veliku kuću s velikim vrtom te ga svrstava u 1. kategoriju programa Breed Watch. PDSA ga opisuje kao vrlo prijateljskog i privrženog psa koji se dobro slaže s djecom i drugim ljubimcima te savjetuje njegu dlake 2 do 3 puta tjedno; PetMD preporučuje tjedni pregled i čišćenje ušiju i piše da irski seteri trebaju puno ljudskog društva.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Griffon Bruxellois, Brussels Griffon",
      text: [
        "Briselski grifon (Griffon Bruxellois) malen je pas za društvo iz Belgije, kratkog i plosnatog lica. Standard FCI opisuje crvenu, prirodno oštru, blago valovitu dlaku i težinu od 3,5 do 6 kg; britanski Royal Kennel Club, koji vodi oštrodlaku i kratkodlaku varijantu, opisuje ga kao pametnog malog psa terijerskog karaktera. Pas ove veličine odraste s otprilike 8–12 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 12 godina (PetMD: 12–15 godina).",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i češljanje više puta tjedno, navodi da linja i da je prikladan za stan te ga svrstava u 2. kategoriju programa Breed Watch. PetMD ga opisuje kao psa plosnatog lica (brahicefalnog) koji teško podnosi vruće i vlažno vrijeme, savjetuje čišćenje kožnih nabora na licu otprilike jednom tjedno i svakodnevno četkanje zubi te piše da se briselski grifoni uz nadzor dobro slažu s djecom i drugim ljubimcima, ali ne vole dugo ostajati sami.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, američki rat terijer, Rat Terrier",
      text: [
        "Rat terijer malen je američki terijer koji se uzgaja u dvije veličine – minijaturnoj i standardnoj – s kratkom, priljubljenom, glatkom i sjajnom dlakom. Standard pasmine dopušta visinu u grebenu do 18 inča (46 cm), a PetMD za obje veličine navodi težinu od 10–25 funti (oko 4,5–11 kg); pas te veličine prestaje rasti oko 9.–12. mjeseca (PetMD). VCA navodi životni vijek od 12–16 godina, PetMD 12–18 godina.",
        "Rat Terrier Club of America navodi da se rat terijeri dobro slažu s djecom, osobito ako odrastaju s njima, i snalaze se u stanu, ali trebaju barem 30 minuta kretanja dnevno. PetMD piše da im treba puno tjelesnih i mentalnih izazova, ne vole dugo biti sami i blago linjaju cijele godine; VCA savjetuje četkanje jednom tjedno i upozorava da se možda neće slagati s malim životinjama, osobito glodavcima.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    shar_pei: {
      aka: "Shar Pei, kineski šarpej, Chinese Shar-Pei",
      text: [
        "Šarpej (u SAD-u „Chinese Shar-Pei“) aktivan je, kompaktan, kvadratno građen pas srednje veličine iz Kine s kratkom, oštrom, čekinjastom dlakom jedne boje (bilo koje osim bijele), naborima na glavi i grebenu te širokom njuškom. Standard Royal Kennel Cluba navodi visinu od 46–51 cm, a PDSA težinu od 20–27 kg; pas te veličine prestaje rasti oko 12.–15. mjeseca (PetMD). Royal Kennel Club i PDSA navode životni vijek dulji od 10 godina, no studija VetCompass na psima u Ujedinjenom Kraljevstvu pronašla je medijan od 7,3 godine.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i četkanje jednom tjedno te pasminu svrstava u 2. kategoriju programa Breed Watch zbog problema s kapcima i kožnim naborima. PDSA opisuje šarpeje kao odane, privržene obiteljske pse koji najbolje odgovaraju iskusnim vlasnicima i starijoj djeci, upozorava na snažan lovački nagon prema manjim životinjama te savjetuje da kožni nabori budu čisti i suhi i da između obroka i kretanja prođe neko vrijeme.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border collie srednje je velik ovčarski pas iz Velike Britanije, stvoren za izdržljivost i težak rad. Standard pasmine opisuje ga kao poletnog, budnog, prijemčivog i inteligentnog psa koji nije ni nervozan ni agresivan.",
        "Kinološki savezi i veterinari slažu se ponajprije u jednom: to je pasmina s jako puno energije. Treba više od dva sata kretanja svaki dan i mnogo zadataka za glavu. Kad mu je dosadno ili se premalo kreće, sam si nađe posao – grize sve što mu je nadohvat ili pokušava čuvati djecu u igri kao stado.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador, Labrador Retriever",
      text: [
        "Labrador retriver velik je, snažno građen lovački pas iz Velike Britanije, uzgojen za donošenje divljači. Standard ga opisuje kao dobroćudnog, ljubaznog i prilagodljivog druga koji rado udovoljava i voli vodu. Dlaka je kratka i gusta, crna, žuta ili smeđa (boje jetre / čokolade).",
        "Britanske dobrotvorne organizacije opisuju labradora kao obiteljskog psa koji se, kad je dobro socijaliziran, veže uz cijelo kućanstvo. Vrlo je aktivan i hrana ga jako motivira: poslastice pomažu u dresuri, ali labradori su i skloni debljanju.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden, Golden Retriever",
      text: [
        "Zlatni retriver velik je lovački pas iz Velike Britanije s ravnom ili valovitom dlakom u nijansama zlatne ili krem boje. Standard ga opisuje kao poslušnog, inteligentnog psa koji je ljubazan, prijateljski raspoložen i samouvjeren.",
        "Britanske dobrotvorne organizacije nazivaju ga izvrsnim obiteljskim psom za aktivnu obitelj, koji može biti dobar i kao prvi pas. Izvori jasno navode i cijenu toga: najmanje dva sata kretanja dnevno, četkanje nekoliko puta tjedno i dlaka koja se jako linja.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Frenchie, French Bulldog",
      text: [
        "Francuski buldog malen je, čvrst pas za društvo iz Francuske s kratkom, glatkom dlakom i uspravnim „šišmišjim ušima“. Standard ga opisuje kao druželjubivog, živahnog i razigranog psa; britanske dobrotvorne organizacije kažu da je opušten i prilagodljiv te da se obično dobro slaže s djecom, zbog čega je postao omiljen obiteljski ljubimac.",
        "Treba do sat vremena kretanja dnevno i odgovara mu stan. Svaki izvor ističe istu manu – spljošteno lice: ono može otežati disanje, a francuski se buldozi brzo pregriju, osobito po toplom vremenu – zato su važni hlad, voda i mirne šetnje. PDSA predlaže obiteljima da razmisle i o udomljavanju odraslog francuskog buldoga.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Alzaški ovčar, Alsatian, GSD, Deutscher Schäferhund",
      text: [
        "Njemački ovčar velik je, snažan ovčarski pas iz Njemačke s uspravnim ušima i gustom dvostrukom dlakom, kratkom ili dugom. Standard ga opisuje kao skladnog, samouvjerenog psa čvrstih živaca, a Royal Kennel Club naziva ga svestranim radnim i službenim psom poznatim po hrabrosti i inteligenciji.",
        "Treba najmanje dva sata kretanja dnevno, odgovara mu velika kuća s vrtom i jako se linja. Britanske dobrotvorne organizacije kažu da neki mogu biti izvrsni obiteljski ljubimci, ali uz malu djecu uvijek trebaju nadzor. Royal Kennel Club traži od uzgajivača da roditeljima testiraju kukove i laktove, a oblik stražnjih nogu navodi kao točku zabrinutosti u pasmini.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "Cavalier King Charles španijel mali je patuljasti španijel iz Velike Britanije s dugim, resastim ušima i dugom, svilenkastom dlakom u četiri boje: blenheim, rubin, crna s podpalinama i trobojna. Standard ga opisuje kao aktivnog, gracioznog psa blagog izraza – sportskog, privrženog, prijateljski raspoloženog i neustrašivog.",
        "Treba otprilike sat vremena kretanja dnevno, može živjeti u stanu i poznat je po tome što se dobro snalazi s djecom, iako igru treba nadzirati, a ne voli ni ostajati sam. Dlaku treba četkati češće nego jednom tjedno. Britanski izvori kao glavne zdravstvene probleme navode bolest srčanih zalistaka i bolno stanje kralježnice povezano s oblikom lubanje, pa se od uzgajivača traži da psima pregledaju srce i naprave magnetsku rezonanciju.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      aka: "Beagle",
      text: [
        "Bigl je mali gonič iz Velike Britanije, uzgojen za lov na zečeve praćenjem traga. Standard ga opisuje kao čvrstog, zbijeno građenog, veselog goniča – odvažnog, aktivnog i budnog, ljubaznog, bez agresije i plašljivosti – s kratkom, gustom dlakom u bojama goniča, poput trobojne, smeđe-bijele ili limun-bijele, i uvijek s bijelim vrhom repa.",
        "Treba do otprilike sat vremena kretanja dnevno i dobro se uklapa u obiteljski život ako je socijaliziran od malih nogu, no uz djecu treba nadzor i ne bi trebao ostajati sam jer tada može lajati i grickati stvari. Kratku dlaku treba četkati jednom tjedno, ali se linja. Dresuru treba započeti rano i koristiti nagrade. Britanski veterinari bigle najčešće liječe zbog debljanja i bolesti zubi, pa treba paziti na porcije i zube.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "veliki pudl, Standard Poodle, kraljevski pudl",
      text: [
        "Veliki pudl najveći je od četiriju veličina pudla, pasmine za društvo iz Francuske koja potječe od europskih lovaca na patke. Standard ga opisuje kao elegantnog, skladnog psa ponosnog držanja – odanog, vedrog i dobroćudnog, sposobnog za učenje i dresuru – s obilnom, kovrčavom jednobojnom dlakom – crnom, bijelom, smeđom, sivom ili žutom (fawn).",
        "Treba do otprilike sat vremena kretanja dnevno i odgovara mu velika kuća s velikim vrtom. Uz pravu socijalizaciju u dobi šteneta obično se dobro slaže s djecom i drugim ljubimcima. Dlaka mu se ne linja, ali to ga ne čini hipoalergenim: treba svakodnevnu njegu i redovito šišanje kod profesionalnog frizera za pse. Poznat je po velikoj poslušnosti i dobro reagira na dresuru.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "jazavčar, Teckel, Dackel",
      text: [
        "Jazavčar je njemački lovac na jazavce i kuniće, kod kuće poznat kao Teckel, koji postoji u nekoliko veličina i s tri vrste dlake; ova stranica govori o standardnoj veličini s kratkom, glatkom dlakom. Standard ga opisuje kao psa umjereno dugog u odnosu na visinu, bez pretjerivanja – vjernog, svestranog i dobroćudnog, inteligentnog, živahnog i hrabrog – s gustom, kratkom, glatkom dlakom crvene boje ili crne ili čokoladne s podpalinama.",
        "Treba do otprilike sat vremena kretanja dnevno, podijeljenog u nekoliko šetnji s vremenom za njuškanje, i odgovara mu mala kuća. Voli ljude i obično se dobro slaže s djecom svih uzrasta, uvijek uz nadzor, no zbog jakog lovačkog nagona ne preporučuje se uz manje ljubimce, a ne podnosi dobro ni samoću. Zbog dugih leđa i kratkih nogu sklon je hernijama diska, pa ne bi trebao skakati; od uzgajivača se traži pregled kralježnice prije uzgoja.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie",
      text: [
        "Australski ovčar, unatoč imenu, američka je pasmina – inteligentan radni pas s jakim nagonom za čuvanje stada i zaštitu. Standard ga opisuje kao skladnog psa srednje veličine, nešto duljeg nego što je visok, dobre naravi i ponekad suzdržanog pri prvom susretu, sa srednje dugom, ravnom do valovitom dlakom u bojama plavi merle, crna, crveni merle ili crvena, svaka sa ili bez bijelih i podpalina.",
        "Treba više od dva sata kretanja dnevno i misaone izazove poput zagonetki i dresure, a odgovara mu velika kuća s velikim vrtom na selu. U pravom kućanstvu može biti zaista dobar obiteljski ljubimac, ali ga jak ovčarski nagon može navesti da „čuva“ djecu, pa se ne preporučuje obiteljima s manjom djecom. Ne voli ostajati sam, a dlaku mu treba četkati nekoliko puta tjedno.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "havanski bišon, Bichon Havanais",
      text: [
        "Havanski bišon mali je pripadnik obitelji bišona i nacionalni pas Kube. Standard ga opisuje kao čvrstog malog psa niskih nogu s vrlo dugom, mekom, ravnom ili valovitom dlakom koja se nikad ne šiša i s repom nošenim visoko iznad leđa. Dolazi u žutoj, crnoj, havana smeđoj, duhanskoj i crvenkastosmeđoj boji te, rijetko, u bijeloj, sa ili bez mrlja i podpalina.",
        "Standard ga naziva privrženim, razigranim, pa čak i pomalo klaunom i kaže da voli djecu i s njima se beskrajno igra; britanski izvori nazivaju ga izvrsnim obiteljskim ljubimcem uz pravu socijalizaciju, kojeg je lako dresirati. Treba oko 30 minuta kretanja dnevno, može živjeti u stanu i ne linja se – ali dugu dlaku treba njegovati svaki dan kako se ne bi zapetljala.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "West Highland white terijer, ili westie, mali je terijer iz Velike Britanije. Standard ga opisuje kao snažno građenog malog psa dubokog prsnog koša, ravnih leđa i oštre dvostruke dlake duge oko 5 cm, s malim uspravnim šiljatim ušima i tamnim očima ispod gustih obrva. Bijela je jedina boja koju standard dopušta.",
        "Standard ga naziva budnim, veselim, hrabrim i samostalnim, ali ljubaznim. Britanski izvori nazivaju ga privrženim, razigranim obiteljskim ljubimcem za djecu svih uzrasta, uz igru uvijek pod nadzorom; treba otprilike sat vremena kretanja dnevno, može živjeti u stanu, linja se i treba četkanje nekoliko puta tjedno. Zbog lovačkog nagona ne bi trebao živjeti s manjim ljubimcima, a ne voli ni ostajati sam. Koža je poznat problem: Royal Kennel Club traži od sudaca da u pasmini paze na znakove upale kože.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Berner Sennenhund",
      text: [
        "Bernski planinski pas velik je švicarski pas sa seoskih imanja, izvorno korišten kao čuvar, vučni pas i pas za goveda u kantonu Bernu. Standard ga opisuje kao snažnog, okretnog dugodlakog radnog psa čvrstih udova s dugom, sjajnom, ravnom ili blago valovitom dlakom. Jedina boja koju standard dopušta je trobojna: duboka crna s bogatim podpalinama na obrazima, iznad očiju, na nogama i prsima te bijelim oznakama na glavi i prsima.",
        "Standard ga naziva samouvjerenim, dobroćudnim i ljubaznim te „dobrim i odanim obiteljskim psom“ koji sporo sazrijeva. Britanski izvori kažu da treba do sat vremena kretanja dnevno, da mu odgovara velika kuća s velikim vrtom, da se jako linja i da ga treba četkati češće nego jednom tjedno; ne bi smio dugo ostajati sam. Obično živi kraće od deset godina, a britanski izvori među zdravstvenim problemima navode displaziju kuka i lakta, torziju želuca i određene vrste raka.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "haski, Husky",
      text: [
        "Sibirski haski srednje je velik radni pas za vuču saonica, koji FCI priznaje kao američku pasminu, a Royal Kennel Club opisuje kao najlakšeg i najbržeg među psima za saonice. Standard traži psa brzog i laganog koraka, s dvostrukom dlakom srednje duljine, debelim uspravnim ušima, smeđim ili plavim očima (dopušteno je i po jedno od svakog) i dobro obraslim repom. Boje idu od crne do čisto bijele; merle i tigrasta nisu dopuštene.",
        "Standard ga naziva ljubaznim i blagim, budnim i otvorenim. Britanski izvori kažu da treba više od dva sata kretanja dnevno, veliku kuću s velikim vrtom i vrlo sigurnu, visoku ogradu jer su haskiji poznati bjegunci; jako se linja, treba četkanje nekoliko puta tjedno i ne podnosi dobro samoću. PDSA ga preporučuje za kućanstva samo s odraslima ili s tinejdžerima, a ne za obitelji s manjom djecom, te među zdravstvenim problemima navodi displaziju kuka, probleme s očima i epilepsiju.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Rotvajler je srednje velik do velik, snažan radni pas iz Njemačke. Standard ga opisuje kao čvrstog psa, ni teškog ni laganog, s kratkom, grubom, priljubljenom dlakom, srednje velikim visećim ušima i tamnosmeđim bademastim očima. Jedina dopuštena boja je crna s jasno ocrtanim, bogatim podpalinama na obrazima, njušci, grlu, prsima i nogama; bijele oznake su mana.",
        "Standard ga naziva dobroćudnim, mirnim, vrlo odanim, poslušnim i željnim rada, a Royal Kennel Club kaže da je dobro školovan rotvajler divan obiteljski pratitelj. Britanski izvori kažu da treba više od dva sata kretanja dnevno, veliku kuću s velikim vrtom i iskusnog vlasnika jer je tako snažan; treba ga socijalizirati od malih nogu. PDSA ga ne preporučuje obiteljima s mlađom djecom i bebama, a s drugim ljubimcima nikad ne bi smio ostati bez nadzora. Dovoljno je četkanje jednom tjedno. Obično živi kraće od deset godina, a Royal Kennel Club prati oblik njegovih stražnjih nogu.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "buldog, English Bulldog, British Bulldog",
      text: [
        "Engleski buldog srednje je velik, kratkodlaki pas iz Velike Britanije: prilično zdepast, nizak, širok, snažan i zbijen, s relativno kratkim licem, malim tankim ušima u obliku ruže i okruglim, vrlo tamnim očima. Standard dopušta jednobojne boje poput crvene, žute, svijetložute i bijele, tigrastu i šarenu; crna i crna s podpalinama vrlo su nepoželjne. Traži velike, široko otvorene nosnice i kaže da su psi koji pokazuju otežano disanje vrlo nepoželjni.",
        "Standard ga naziva budnim, odvažnim, odanim, pouzdanim i hrabrim, žestokog izgleda, ali privrženim, a Royal Kennel Club kaže da je zbog svoje naravi i odanosti i dalje vrlo omiljen obiteljski pratitelj. Britanski izvori kažu da treba do sat vremena kretanja dnevno, nikad u najtoplijem dijelu dana, i da se dobro slaže s drugim kućnim ljubimcima ako je socijaliziran rano; njega dlake potrebna je jednom tjedno, ali bore na licu treba čistiti svaki dan. PDSA ga opisuje kao pasminu izrazito spljoštenog lica koja će vrlo vjerojatno imati ozbiljne zdravstvene probleme, poput otežanog disanja, i snažno preporučuje da se razmisli o zdravijoj pasmini, križancu ili mješancu. Obično živi kraće od deset godina.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "kratkodlaki ptičar, GSP, Deutsch Kurzhaar",
      text: [
        "Njemački kratkodlaki ptičar svestran je lovački pas iz Njemačke, građen za rad u polju i vodi, s kratkom, gustom dlakom koja je pod rukom tvrda, širokim plosnatim ušima postavljenima visoko i tamnosmeđim bademastim očima. Njegov američki standard dopušta jednobojnu smeđu, smeđu s bijelim (npr. s pjegama), jednobojnu crnu te crnu s bijelim; crvena, narančasta, limun-bijela ili podpaline i potpuno bijeli pas isključuju se. Standard opisuje kupiran rep – PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva ljubaznim, inteligentnim i spremnim udovoljiti. Royal Kennel Club i PDSA kažu da treba više od dva sata kretanja dnevno; PDSA dodaje da se u šetnji može probuditi njegov nagon za lov, markiranje i donošenje, pa treba dobro uvježbati dozivanje, te da ga je prilično lako dresirati. Dlaku treba njegovati jednom do dvaput tjedno, a umjereno se linja. Velika britanska studija navodi medijan očekivanog životnog vijeka od 13,4 godine.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "jorki, Yorkie",
      text: [
        "Jorkširski terijer patuljasti je terijer iz Velike Britanije koji prema standardu pasmine teži do 3,2 kg, s dugom, savršeno ravnom, sjajnom i svilenkastom dlakom koja ravnomjerno pada s obje strane od razdjeljka duž leđa. Standard dopušta jednu boju: tamnu čeličnoplavu od zatiljka do repa i bogatu, svijetlu podpalinu na glavi, prsima i nogama; male uši u obliku slova V nosi uspravno. Standard opisuje i kupiran i nekupiran rep – PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva budnim, inteligentnim i živahnim, ujednačene naravi. Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake; PDSA dodaje da voli trčati, donositi i igrati se, da zna biti prilično tvrdoglav u dresuri i da više odgovara obiteljima sa starijom djecom jer su mu kosti vrlo krhke. Velika britanska studija utvrdila je da su bolesti zubi najčešći problem u pasmini, potiče svakodnevnu njegu zubi, primjerice pranje, i utvrdila medijan dobi u trenutku smrti od 13,56 godine.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, talijanski korso pas",
      text: [
        "Cane corso srednje je velik do velik talijanski molos, robustan i čvrst pas s dozom elegancije, nešto dulji nego što je visok. Standard opisuje kratku, sjajnu, vrlo gustu dlaku u crnoj boji, nijansama sive, žutoj ili crvenoj s tamnom maskom, tamnoj boji pšenice ili tigrastoj; velike bijele mrlje nisu dopuštene. Prema važećem standardu FCI-ja uši se ne kupiraju, a rep je prirodan – a u UK-u su kupiranje ušiju i repa zabranjeni – pa PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "Standard ga naziva čuvarom imanja, obitelji i stoke, iznimno okretnim i prijemčivim. PDSA kaže da je druželjubiv i pun ljubavi prema vlasnicima, da treba oko dva sata kretanja dnevno i zanimaciju jer mrzi dosadu, te da zbog veličine više odgovara iskusnim vlasnicima. Ne preporučuje pasminu za domove s malom djecom, koju bi mogao srušiti; odgovara kućanstvima samo s odraslima ili obiteljima sa starijom djecom. Dovoljno je četkanje jednom tjedno, ali se linja i poznat je po slinjenju. PDSA navodi prosječan životni vijek kraći od deset godina.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "velški korgi pembroke, Pembroke Welsh Corgi, korgi",
      text: [
        "Welsh corgi pembroke mali je pas za goveda iz Walesa, nisko postavljen, snažan i čvrsto građen, koji na malom prostoru odaje dojam čvrstoće i izdržljivosti. Standard opisuje srednje dugu, ravnu dlaku s gustom poddlakom u crvenoj, sobolj (sable), žutoj ili crnoj s podpalinama, sa ili bez bijelih oznaka na nogama, prsima i vratu, te uspravne uši. Rep se nekoć uobičajeno kupirao; standard opisuje i prirodan rep, a PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva odvažnim, radišnim, otvorenim i ljubaznim. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno; PDSA opisuje ljubazne, vesele, zabavne pse koji rado udovoljavaju i koje je prilično lako dresirati, ali kaže da mogu štipati za pete djecu koja trče, pa pomažu socijalizacija s djecom i dresura od malih nogu. Royal Kennel Club navodi životni vijek dulji od 12 godina i traži od uzgajivača da roditeljima ocijene kukove.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "doberman, Doberman Pinscher",
      text: [
        "Doberman je njemački pas za društvo, zaštitu i rad srednje veličine, snažne i mišićave građe, elegantnih linija i ponosnog držanja. Njegov standard FCI-ja opisuje kratku, tvrdu, gustu dlaku koja je priljubljena i glatka, u crnoj ili smeđoj boji s jasno ocrtanim hrđavocrvenim podpalinama; bijele mrlje nisu dopuštene. Prema standardu FCI-ja uši i rep ostaju prirodni, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "Standard ga naziva ljubaznim i mirnim te vrlo odanim obitelji. Royal Kennel Club kaže da ga njegova vjerna i poslušna narav čini izvrsnim obiteljskim psom te preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno. PDSA dodaje da je vrlo energičan, da treba mnogo misaone i tjelesne aktivnosti te ranu socijalizaciju i da se – zbog veličine i snažne građe – ne preporučuje obiteljima s malom djecom ni vlasnicima kojima je to prvi pas. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "bokser, Deutscher Boxer",
      text: [
        "Njemački bokser radni je pas i pas za društvo iz Njemačke, srednje veličine, kvadratne građe, jakih kostiju i dobro razvijenih mišića. Njegovi standardi opisuju kratku, sjajnu, glatku dlaku žute ili tigraste boje s crnom maskom; bijele oznake su dopuštene, ali ne bi smjele prekrivati više od trećine dlake. Njuška bi trebala biti široka i duboka, nikad kratka, sa širokim nosnicama. Rep se nekoć uobičajeno kupirao; standard opisuje i nekupiran rep, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "Standard ga naziva staloženim, poslušnim, neustrašivim i samouvjerenim. Royal Kennel Club kaže da je vrlo omiljen obiteljski pratitelj te preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno. PDSA opisuje vrlo energičnog, razigranog psa koji voli ljudsko društvo i može razviti separacijsku anksioznost ako ostaje sam, ima vrlo jak lovački nagon i – zbog veličine i burne naravi – ne preporučuje se domovima s mlađom djecom ni vlasnicima kojima je to prvi pas; neki bokseri kraćeg lica mogu imati ozbiljne probleme s disanjem. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, mini šnaucer",
      text: [
        "Patuljasti šnaucer mali je njemački pas za društvo: snažan, zdepast i gotovo kvadratan, s oštrom, žičastom, gustom dlakom, gustim obrvama i bradom. Njegov standard FCI-ja dopušta boju papar-sol, crnu sa srebrnom, čisto crnu i čisto bijelu; PetPrep prikazuje prve tri. Rep se nekoć uobičajeno kupirao, a uši ponekad kupirale; standard FCI-ja traži prirodan rep i preklopljene uši, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "FCI ga svrstava među pse za kuću i društvo, a Royal Kennel Club kaže da je vrlo omiljen kao pratitelj. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno te kaže da se ne linja. PDSA opisuje razigranog, znatiželjnog psa koji se može dobro slagati s djecom ako ih upozna rano, koji zna biti tvrdoglav u dresuri i treba njegu dlake dva do tri puta tjedno te povremeno šišanje ili trimanje kod profesionalnog frizera za pse. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu, šicu",
      text: [
        "Shih tzu mali je pas za društvo s Tibeta; o njegovu standardu FCI-ja skrbi Velika Britanija. Standardi opisuju čvrstog psa obilne dlake, ponosnog držanja i lica „poput krizanteme“: s dugom, gustom pokrovnom dlakom, velikim tamnim okruglim očima, velikim visećim ušima i bogato operjanim repom nošenim iznad leđa. Standardi dopuštaju mnogo boja; PetPrep prikazuje zlatno-bijelu, crno-bijelu i smeđe-bijelu, a nikad merle. Njuška je kratka i plosnata, a PDSA navodi probleme s disanjem zbog kraćeg lica, pa PetPrep uvijek crta umjereno lice s otvorenim nosnicama.",
        "FCI ga opisuje kao inteligentnog, aktivnog i budnog, ljubaznog i neovisnog. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi stan kao prikladan dom. PDSA kaže da shih tzui mogu biti dobroćudni obiteljski ljubimci ako su pravilno socijalizirani i školovani, naziva ih idealnim ljubimcima za vlasnike kojima je to prvi pas, savjetuje da ih se uz djecu uvijek nadzire i za većinu kućnih ljubimaca preporučuje svakodnevno četkanje i šišanje kod profesionalnog frizera za pse svakih šest do osam tjedana. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "doga, Deutsche Dogge, Great Dane",
      text: [
        "Njemačka doga njemački je div: standard FCI-ja kaže da spaja veliko, snažno, dobro građeno tijelo s ponosom, snagom i elegancijom, s dugom, uskom glavom, prirodno visećim ušima i vrlo kratkom, glatkom, sjajnom dlakom. Standardi navode žutu i tigrastu boju – idealno s crnom maskom – te harlekin, crnu i plavu; PetPrep prikazuje samo boje koje navode i FCI i Royal Kennel Club, nikad merle ni mantle, i psa uvijek crta s prirodnim ušima i repom te priljubljenim kapcima jer Royal Kennel Club traži od sudaca da paze na kapke okrenute prema unutra ili van i na slabe stražnje noge.",
        "FCI je naziva ljubaznom, punom ljubavi i odanom vlasnicima, iako prema strancima može biti suzdržana. Royal Kennel Club kaže da je unatoč veličini divan obiteljski pas te preporučuje više od dva sata kretanja dnevno, veliku kuću i vrt te njegu dlake jednom tjedno. PDSA kaže da su doge poznate po slinjenju, da imaju prilično jak lovački nagon i da se zbog veličine i snage ne preporučuju domovima s mlađom djecom; savjetuje razmak između hranjenja i kretanja kako bi se spriječila torzija želuca. Royal Kennel Club navodi životni vijek kraći od 10 godina.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "patuljasti špic, Pom, Zwergspitz",
      text: [
        "Pomeranac je najmanji špic: FCI ga vodi kao patuljastu varijantu njemačkog špica, visoku 21 cm ± 3 cm u grebenu, a standard Royal Kennel Cluba opisuje zbijenog, kratkog malog psa s glavom nalik lisičjoj, malim uspravnim ušima i repom zavrnutim preko leđa. Dvostruka dlaka ima meku, pahuljastu poddlaku i dugu, ravnu pokrovnu dlaku koja oko vrata tvori ogrlicu. Standard dopušta mnogo jednobojnih boja, poput narančaste, krem, bijele, crne i smeđe, ali nikad merle; PetPrep crta prirodnu, nešišanu dlaku.",
        "FCI njegovu narav naziva druželjubivom i vedrom, a standard Royal Kennel Cluba naziva ga otvorenim, živahnim i inteligentnim. Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i kaže da mu odgovara stan; PDSA kaže da dvostruku dlaku treba četkati dva do tri puta tjedno. AKC kaže da pomeranci obično bolje odgovaraju obiteljima sa starijom djecom, da se uz ranu socijalizaciju mogu dobro slagati s drugim životinjama i toplo preporučuje ranu socijalizaciju i školu za štenad. Royal Kennel Club navodi životni vijek dulji od 12 godina.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston Terrier, American Gentleman",
      text: [
        "Bostonski terijer potječe iz Sjedinjenih Američkih Država. Standard FCI-ja opisuje živahnog, vrlo inteligentnog, kratkodlakog psa kratke glave, zbijene građe, kratkog repa i skladnih proporcija, tigraste, tamnosmeđe (seal) ili crne boje s ravnomjernim bijelim oznakama: obvezni su bijeli pojas na njušci, bijela lisa između očiju i bijela prsa, a tigrasta je boja poželjnija. PetPrep ga crta tigrasto-bijelog, s umjerenom njuškom, otvorenim nosnicama te prirodnim ušima i repom.",
        "Riječ je o pasmini spljoštenog lica (brahicefaličnoj), a PDSA upozorava da se nikad ne bi smio kretati u najtoplijem dijelu dana jer je sklon pregrijavanju. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno, kaže da mu odgovara stan i navodi životni vijek dulji od 10 godina. PDSA naziva bostonske terijere savršenim obiteljskim ljubimcima koji su osobito dobri s djecom ako su kao štenad dobro socijalizirani; AKC kaže da se dobro snalaze s djecom koja znaju nježno postupati sa životinjama, da ne podnose dobro dugu samoću i snažno preporučuje ranu socijalizaciju i školovanje šteneta.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd, mini aussie",
      text: [
        "Minijaturni američki ovčar potječe iz Sjedinjenih Američkih Država. Standard FCI-ja opisuje malog ovčarskog psa s jakim nagonom za čuvanje stada i zaštitu, inteligentnog i ponajprije radnog psa, nešto duljeg nego što je visok, sa srednje dugom, ravnom do valovitom dlakom otpornom na vremenske uvjete. Boje su crna, plavi merle, crvena i crveni merle, sa ili bez bijelih i podpalina, a oči mogu biti smeđe, plave, lješnjak ili jantarne boje. PetPrep ga crta u boji plavi merle s prirodnim repom.",
        "PetMD kaže da ima mnogo energije i treba najmanje sat vremena kretanja svaki dan, idealno dva, uz zadatke koji mu zaokupljaju um, te da ga treba četkati nekoliko puta tjedno; AKC kaže da je veći dio godine dovoljno četkanje jednom tjedno, a u sezoni linjanja svaki dan. AKC kaže da uz školovanje poslušnosti i ranu socijalizaciju može biti izvrstan obiteljski pas i da je obično dobar s djecom, ali ih može pokušati „čuvati“; PetMD dodaje da njegova privrženost obitelji može dovesti do separacijske anksioznosti kad ostane sam. PetMD navodi životni vijek od 12 do 13 godina.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "čivava, Chihuahueño, kratkodlaka čivava",
      text: [
        "Čivava potječe iz Meksika. Standard Kennel Cluba opisuje malog, nježnog, zbijenog psa drskog izraza i vesele, živahne i inteligentne naravi, s dobro zaobljenom lubanjom „u obliku jabuke“, umjereno kratkom, blago šiljatom njuškom, velikim okruglim očima koje nisu izbočene, velikim ušima i srpastim repom; dopuštena je svaka boja ili mješavina boja, ali nikad merle, a poželjna težina je 1,8–2,7 kg. Royal Kennel Club kratkodlaku i dugodlaku čivavu vodi kao dvije pasmine; PetPrep crta kratkodlaku čivavu žute boje, s umjerenom glavom.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake jednom tjedno, kaže da joj odgovara stan i navodi životni vijek dulji od 12 godina. PDSA kaže da su čivave tako male i lagane da ih djeca žele uzimati u naručje, što im najvjerojatnije neće biti drago, pa više odgovaraju obiteljima s nešto starijom djecom. PDSA dodaje da kao psi za društvo vole društvo i trebaju nekoga tko je stalno kod kuće te da ih od malih nogu treba socijalizirati s mnogo različitih ljudi, iskustava i mjesta.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer španijel, springer, ESS",
      text: [
        "Engleski springer španijel potječe iz Velike Britanije, gdje je uzgojen za pronalaženje, dizanje i donošenje divljači. Standard Kennel Cluba opisuje simetrično građenog, zbijenog, snažnog, veselog i aktivnog psa – najdužih nogu među britanskim španijelima za rad na kopnu – ljubazne, vesele i poslušne naravi, s dugim, resastim ušima, tamnim očima boje lješnjaka i priljubljenom, ravnom dlakom otpornom na vremenske uvjete; boje su smeđe-bijela ili crno-bijela, obje i s podpalinama, a približna visina je 51 cm. PetPrep ga crta smeđe-bijelog, s prirodnim repom.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. PDSA kaže da su springeri dobri obiteljski psi koji se dobro slažu s djecom i drugim kućnim ljubimcima, da su poslušni i željni učenja te da trebaju njegu dlake jednom do dvaput tjedno i šišanje svaka 3 mjeseca. AKC dodaje da ne bi smjeli dugo ostajati sami te da su rana socijalizacija i škola za štenad ključni.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "šelti, Sheltie, šetlandski kolij (nekadašnji naziv)",
      text: [
        "Šetlandski ovčar potječe iz Velike Britanije i mali je dugodlaki radni pas. Standard FCI-ja opisuje budnog, blagog, inteligentnog, snažnog i aktivnog psa, privrženog i odanog vlasniku i suzdržanog prema strancima, s glavom poput dugog, tupog klina, malim poluuspravnim ušima čiji vrhovi padaju naprijed i dvostrukom dlakom s dugom, oštrom pokrovnom dlakom; boje su sobolj (sable), trobojna, plavi merle, crno-bijela te crna s podpalinama, a idealna visina je 37 cm za mužjake i 35,5 cm za ženke. PetPrep ga crta u boji sobolj s bijelim.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi životni vijek dulji od 10 godina. PDSA kaže da su šetlandski ovčari vrlo blagi, razigrani, poslušni psi koji se često dobro uklapaju u obiteljski život i rado se slažu s djecom te da su dresura i socijalizacija od malih nogu vrlo važne. AKC dodaje da trebaju redovitu misaonu i tjelesnu aktivnost, da bi zbog ovčarskog nagona najbolje odgovarali starijoj djeci i da su poznati po tome što puno laju.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "bretonski španijel, Epagneul Breton, Brittany Spaniel",
      text: [
        "Bretonski španijel ptičar je iz Francuske, gdje se zove Epagneul Breton. Royal Kennel Club opisuje vrlo energičnog, inteligentnog psa koji traži, markira i donosi divljač, blagog i privrženog, a ipak punog života i zanosa, s gustom, prilično finom dlakom, visoko postavljenim trokutastim ušima i repom koji je često prirodno kratak; boje prema standardu su narančasta, smeđa ili crna s bijelim, roan ili trobojna, a visina je 48–51 cm za mužjake i 47–50 cm za ženke. PetPrep ga crta narančasto-bijelog.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. AKC kaže da su bretonski španijeli vrlo energični psi kojima treba mnogo kretanja i misaonih poticaja, da su blagi i obično strpljivi s djecom te da im je za lijep izgled dovoljno četkanje jednom tjedno. PetMD dodaje da je rana socijalizacija šteneta nužna, da ne podnose dobro dugu samoću i da, uzgojeni za lov na ptice, imaju jak lovački nagon.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (SAD), American Cocker",
      text: [
        "Američki koker španijel – u Sjedinjenim Američkim Državama jednostavno koker španijel – druga je pasmina od engleskog koker španijela. Standard AKC-a naziva ga najmanjim članom skupine lovačkih pasa (Sporting Group), s dugim, režnjastim, bogato resastim ušima, zaobljenom lubanjom i širokom, dubokom njuškom te svilenkastom dlakom koja je ravna ili blago valovita; dolazi u crnoj boji, u svakoj jednobojnoj boji od najsvjetlije krem do najtamnije crvene te u višebojnim varijantama s bijelim. Standard traži staloženu narav bez ikakvog traga plašljivosti.",
        "Royal Kennel Club preporučuje svakodnevnu njegu dlake i više od 2 sata kretanja dnevno te navodi životni vijek dulji od 10 godina; AKC i PetMD pišu da ne treba mnogo kretanja. PetMD te pse blage naravi naziva izvrsnim obiteljskim psima, ljubaznima prema ljudima i drugim životinjama, i savjetuje da se socijalizacija i dresura započnu rano; VCA piše da su obično vrlo dobri s djecom, da su skloni debljanju i da im uši treba pregledavati svaki tjedan.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinoa, Malinois, belgijski ovčar (malinois)",
      text: [
        "Belgijski ovčar malinois kratkodlaka je varijanta belgijskog ovčara, ovčarske pasmine iz Belgije. Standard FCI-ja opisuje skladno građenog psa koji spaja eleganciju i snagu i dopušta samo jednu boju: žutu s crnim prekrivanjem i crnom maskom. Standardi FCI-ja i AKC-a opisuju prilično male, uspravne, trokutaste uši, kratku, tvrdu dlaku s gustom poddlakom te budnu, inteligentnu, znatiželjnu i samouvjerenu narav.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. AKC piše da nije dobar izbor za vlasnike kojima je to prvi pas, da najbolje odgovara starijoj, odgovornoj djeci i da ne bi smio dugo ostajati sam; PetMD navodi jak lovački nagon, to da može pokušati „čuvati“ djecu te da treba stalnu svakodnevnu dresuru i ranu socijalizaciju.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset hound, Basset",
      text: [
        "Baset je kratkonogi gonič iz Velike Britanije. Standard FCI-ja opisuje goniča znatne mase, skladnog, mirnog, nikad agresivnog ni plašljivog i privrženog, s nisko postavljenim, dugim, baršunastim ušima, glatkom, kratkom dlakom i bojama crno-bijelo-smeđom ili limun-bijelom. Breed Watch Royal Kennel Cluba traži od izložbenih sudaca da paze na kapke okrenute prema unutra ili van, vrlo duge uši, bolne kožne nabore i višak kože.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno te navodi životni vijek dulji od 10 godina. PDSA opisuje tolerantnog psa koji se vrlo dobro slaže s djecom i voli društvo, s dobrim apetitom na koji treba paziti; savjetuje da se kožni nabori pregledavaju svaki dan i da se ostavi razmak između hranjenja i kretanja. AKC dodaje da ga njuh može odvesti na krivi put, pa su važni pouzdan povodac i ograđeni prostori.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vižla, Magyar Vizsla, mađarski ptičar",
      text: [
        "Mađarska vižla elegantan je lovački pas srednje veličine iz Mađarske s kratkom dlakom boje zlatne hrđe. Standard FCI-ja opisuje živahnog, ljubaznog psa ujednačene naravi kojeg je lako dresirati i koji održava blizak kontakt s vodičem; boje su nijanse zlatne hrđe i tamne pješčane zlatne. Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno te navodi životni vijek dulji od 12 godina. PDSA opisuje psa jako usmjerenog na ljude koji voli društvo i može patiti od separacijske anksioznosti kad ostane sam; dobro se slaže sa starijom djecom, ali ga PDSA ne bi preporučio uz vrlo malu djecu ni vlasnicima kojima je to prvi pas, a zbog jakog lovačkog nagona savjetuje da ne živi s manjim ljubimcima. PDSA savjetuje i razmak između hranjenja i kretanja.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "koker španijel, Cocker Spaniel (UK), English Cocker",
      text: [
        "Engleski koker španijel – u Britaniji jednostavno koker španijel – druga je pasmina od američkog koker španijela. Standard FCI-ja opisuje veselog, čvrstog, sportskog psa, skladnog i zbijenog, s nisko postavljenim režnjastim ušima i ravnom, svilenkastom dlakom; standard AKC-a naziva ga veselim i privrženim, staložene naravi, i navodi jednobojnu crnu, smeđu i nijanse crvene te višebojne varijante s bijelim. Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi životni vijek dulji od 10 godina; studija VetCompass o engleskim koker španijelima u UK-u utvrdila je medijan dobi u trenutku smrti od 11,44 godine. PDSA kaže da se zahvaljujući strpljivoj naravi obično dobro slaže s djecom, uvijek uz nadzor, ali upozorava da je poznat po separacijskoj anksioznosti i da nikad ne bi smio ostati sam dulje od četiri sata. PDSA savjetuje i svakodnevno četkanje te razmak između hranjenja i kretanja.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, malteški bišon",
      text: [
        "Maltezer je patuljasti pas sa središnjeg Sredozemlja, danas pod talijanskim pokroviteljstvom u FCI-ju. Standard FCI-ja opisuje malog psa produljenog tijela, živahnog, privrženog, vrlo mirnog i vrlo inteligentnog, teškog 3–4 kg, s vrlo dugom, gustom, svilenkastom dlakom koja teško pada niz cijelo tijelo. Dlaka nema poddlaku, a čisto bijela je jedina boja (dopušten je blijedi ton bjelokosti). Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake, kaže da se pasmina ne linja i navodi životni vijek dulji od 12 godina. PDSA opisuje bistrog, ljubaznog i privrženog psa koji može biti suzdržan prema strancima, ali uz pravu socijalizaciju u mladosti može naučiti biti samouvjeren i druželjubiv. PetMD upozorava da može razviti separacijsku anksioznost kad predugo ostaje sam, kaže da druženje s malom djecom mora biti pod nadzorom i savjetuje svakodnevno pranje zubi.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "mops, Carlin, Pug",
      text: [
        "Mops je mali pas za društvo iz Kine, danas pod britanskim pokroviteljstvom u FCI-ju. Standard FCI-ja opisuje izrazito kvadratnog i zbijenog psa – „multum in parvo“ – velikog šarma, dostojanstva i inteligencije te ujednačene, vesele i živahne naravi, idealne težine 6,3–8,1 kg, s finom, glatkom, kratkom i sjajnom dlakom srebrne, marelice, žute ili crne boje i repom čvrsto uvijenim preko kuka. Traži prilično velike, dobro otvorene nosnice, a stisnute nosnice i tešku boru iznad nosa smatra neprihvatljivima. Royal Kennel Club pasminu svrstava u kategoriju 3 programa Breed Watch, s točkama zabrinutosti koje uključuju otežano disanje, izbočene oči, dermatitis kožnih nabora i pretilost.",
        "PDSA mopsa naziva izrazito brahicefaličnom pasminom (spljoštenog lica) koja lako ostane bez daha, savjetuje izbjegavanje kretanja po vrućini i kaže da bi njegovi veterinari snažno preporučili pasminu s normalnom njuškom ili križanca mopsa. Royal Kennel Club preporučuje do 1 sata kretanja dnevno i njegu dlake jednom tjedno, kaže da se pasmina linja i navodi životni vijek dulji od 10 godina. PDSA opisuje psa koji se često dobro slaže s djecom i drugim ljubimcima, ali obožava društvo i ne podnosi dobro samoću; PetMD savjetuje svakodnevno čišćenje i sušenje kožnih nabora na licu i navodi da je pretilost česta u pasmini.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "kolij, Collie, dugodlaki kolij",
      text: [
        "Dugodlaki škotski ovčar (kolij) velik je ovčarski pas iz Velike Britanije. Standard FCI-ja opisuje psa velike ljepote, koji stoji s mirnim dostojanstvom, ljubazne naravi i bez traga nervoze ili agresivnosti, s vrlo gustom dlakom i ravnom, oštrom pokrovnom dlakom te u tri boje: sobolj (sable), trobojna i plavi merle. Standard Royal Kennel Cluba naziva ga izvrsnim psom za društvo, ljubaznim, veselim i aktivnim, dobrim s djecom i drugim psima, i navodi visinu od 56–61 cm za mužjake i 51–56 cm za ženke. Royal Kennel Club pasminu svrstava u kategoriju 2 programa Breed Watch i ne upisuje štenad iz parenja merle s merle.",
        "Royal Kennel Club preporučuje do 1 sata kretanja dnevno i svakodnevnu njegu dlake, kaže da se pasmina linja i navodi životni vijek dulji od 12 godina. PetMD kaže da su koliji privrženi, osobito djeci, i dobri s drugim životinjama, ali ne podnose dobro dugu samoću i kad su uzbuđeni mogu štipati za gležnjeve i pete. Navodi i da je socijalizacija šteneta presudna te da se kod kolija javlja mutacija MDR1, koja utječe na to kako pasji organizam obrađuje određene lijekove.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "engleski mastif, English Mastiff, Old English Mastiff",
      text: [
        "Mastif je vrlo velika čuvarska pasmina iz Velike Britanije. Standard FCI-ja opisuje spoj veličanstvenosti i hrabrosti – mirnog psa, privrženog vlasnicima, ali sposobnog za čuvanje – s glavom kvadratnog izgleda, širokim, dubokim i snažnim tijelom te kratkom, priljubljenom dlakom boje marelice, žutom ili tigrastom. PDSA navodi prosječnu visinu od 71–78 cm i prosječnu težinu od 80–85 kg te napominje da Kennel Club mastifa svrstava u kategoriju tri: pasmine s vidljivim problemima građe koji mogu uzrokovati bol, nelagodu ili zdravstvene probleme.",
        "PDSA za odrasle pse preporučuje oko sat vremena kretanja dnevno – ali bez pretjeranog napora dok se štenetu kosti i zglobovi još razvijaju – njegu dlake jednom tjedno uz svakodnevno čišćenje bora na licu i navodi prosječan životni vijek kraći od 10 godina. PetMD mastife naziva izvrsnim obiteljskim psima za domove s djecom koja znaju kako se ponašati sa životinjama, iako zbog svoje veličine možda nisu za domove s malom djecom ili bebama; obično se dobro slažu s drugim ljubimcima koje upoznaju kao štenad, jako sline i zbog rizika od torzije želuca ne bi se smjeli kretati sat vremena prije i poslije obroka.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "šiba, Shiba, japanski shiba inu",
      text: [
        "Shiba inu mali je špic iz Japana; ime mu znači „mali pas“, a prema Royal Kennel Clubu razvijen je za lov na sitnu pernatu divljač. Standard FCI-ja opisuje malog, skladnog psa dobrih kostiju, vjerne naravi, oštrih osjetila i velike budnosti, s oštrom pokrovnom dlakom preko meke, guste poddlake, malim uspravnim trokutastim ušima i debelim uvijenim repom; boje su crvena, crna s podpalinama i sezam, uvijek s bjelkastim oznakama „urajiro“ na obrazima, prsima i donjem dijelu tijela. Standard AKC-a navodi prosječnu težinu od oko 23 funte (10 kg) za mužjake i 17 funti (8 kg) za ženke.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno, napominje da se pasmina linja i navodi životni vijek dulji od 10 godina; velika britanska studija utvrdila je medijan životnog vijeka od 14,6 godine. AKC opisuje samouvjerenog, neovisnog psa koji je bolji izbor za iskusnog vlasnika, najsretniji je sa starijom djecom i nikad ga ne bi trebalo puštati s povoca izvan ograđenog ili zatvorenog prostora. PetMD dodaje da treba mnogo misaonih poticaja, da mu koristi socijalizacija u dobi šteneta i da mu zube treba prati svaki dan.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridžbek, Rhodesian Ridgeback, rodezijski gonič lavova",
      text: [
        "Rodezijski ridgeback potječe iz južne Afrike. Najpoznatije mu je obilježje greben na leđima, pruga dlake koja raste u smjeru suprotnom od ostatka dlake. Standard FCI-ja opisuje skladnog, snažnog, mišićavog, okretnog i aktivnog psa, dostojanstvenog, inteligentnog i rezerviranog prema strancima, osobito cijenjenog kao čuvar i obiteljski ljubimac. Kratka, gusta dlaka je od svijetle do crvene boje pšenice, a standard navodi težinu od oko 36,5 kg za mužjake i 32 kg za ženke.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno, napominje da se pasmina linja i da joj odgovara velika kuća s velikim vrtom te navodi životni vijek dulji od 10 godina. PDSA opisuje razigrane, snažne i vrlo odane pse s vrlo jakim lovačkim nagonom, koji se ne preporučuju vlasnicima kojima je to prvi pas, nikad ne bi smjeli ostati sami dulje od četiri sata i trebaju socijalizaciju od malih nogu; savjetuje i razmak između hranjenja i kretanja. Woodgreen dodaje da najbolje odgovaraju starijoj djeci.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontinentalni patuljasti španijel, Phalène (varijanta s visećim ušima), pas leptir",
      text: [
        "Papillon je varijanta kontinentalnog patuljastog španijela s uspravnim ušima, pasmine iz Belgije i Francuske; varijanta s visećim ušima zove se phalène. Standard FCI-ja opisuje malog, elegantnog patuljastog španijela duge dlake i živahne naravi, visokog oko 28 cm i teškog do 4,5 kg (mužjaci) odnosno 5 kg (ženke). Velike uši nosi poput raširenih krila leptira, a dlaka je uvijek bijela s mrljama u boji.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake češće nego jednom tjedno, napominje da se pasmina linja i može živjeti u stanu te navodi životni vijek dulji od 12 godina. PDSA opisuje blage, razigrane, vrlo poslušne pse koji se dobro slažu sa svima i trebaju dresuru i socijalizaciju od malih nogu; predlaže njegu dlake dva do tri puta tjedno. PetMD dodaje da papilloni trebaju svakodnevne misaone poticaje, da mogu razviti separacijsku anksioznost i da im zube treba prati svaki dan te da vrlo mala djeca takvog malog psa mogu slučajno ozlijediti.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie",
      text: [
        "Portugalski vodeni pas potječe iz Portugala, gdje je radio s ribarima. Standard Royal Kennel Cluba opisuje robusnog, gotovo kvadratnog psa vrlo snažnih mišića – vrlo inteligentnog i iznimno energičnog, izvrsnog plivača i ronioca – visokog 50–57 cm (mužjaci) i 43–52 cm (ženke) i teškog 19–25 kg (mužjaci) i 16–22 kg (ženke). Obilna jednostruka dlaka nema poddlaku i dolazi u crnoj, bijeloj, smeđoj ili crnoj ili smeđoj s bijelim; tradicionalno „lavlje“ šišanje ostavlja njušku i stražnji dio tijela kratko ošišanima.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake, napominje da se pasmina ne linja i da joj odgovara velika kuća te navodi životni vijek dulji od 10 godina. PDSA opisuje vrlo ljubazne pse pune ljubavi koji se dobro slažu s drugim ljubimcima, izvrsni su obiteljski ljubimci i trebaju dresuru i socijalizaciju od malih nogu; dodaje i šišanje i oblikovanje dlake kod profesionalnog frizera za pse tijekom godine.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bišon, Bichon à poil frisé, Bichon Frisé",
      text: [
        "Kovrčavi bišon (bichon frisé) francusko-belgijski je pas za društvo. Standard FCI-ja opisuje veselog malog psa živahnog hoda i vrlo rahle, bijele dlake uvijene u spiralne kovrče – pravog pratitelja kojeg se može povesti posvuda, koji nije ni nervozan ni sklon čestom lajanju – visokog 25–29 cm u grebenu i teškog oko 5 kg. Odrasli pas uvijek je čisto bijel, s vrlo tamnim okruglim očima, crnim nosom, visećim ušima i operjanim repom nošenim preko leđa.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake, napominje da se pasmina ne linja i da joj odgovara stan te navodi životni vijek dulji od 12 godina. PDSA opisuje vrlo privržene pse pune ljubavi koji su izvrsni s djecom i drugim ljubimcima i dodaje da dlaku treba skraćivati otprilike svaka dva mjeseca, često kod profesionalnog frizera za pse.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "njufaundlender, Newfoundland, Newfie",
      text: [
        "Novofundlandski pas potječe iz Kanade; FCI ga svrstava među molose planinskog tipa i priznaje tri boje: crnu, bijelo-crnu (landseer) i smeđu. PDSA novofundlandske pse naziva nježnim divovima i navodi prosječnu visinu od 66–71 cm i prosječnu težinu od 50–69 kg; PetMD dodaje da su zbog povijesti pasmine prirodni plivači.",
        "PDSA za odrasle pse preporučuje najmanje sat vremena kretanja dnevno, ali bez pretjeranog napora za štenad dok im se kosti i zglobovi još razvijaju; njegu dlake naziva svakodnevnim zadatkom, napominje da novofundlandski psi obično sline i navodi životni vijek kraći od 10 godina. PetMD pasminu naziva izvanrednim obiteljskim ljubimcem koji se dobro slaže s djecom, malim ljubimcima i drugim psima, savjetuje nadzor male djece uz svakog psa i upozorava da neki mogu razviti separacijsku anksioznost kad ostanu sami.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "dalmatiner, Dalmatian",
      text: [
        "Dalmatinski pas potječe iz Hrvatske; FCI ga svrstava među pasmine srodne goničima. Kratka, sjajna dlaka čisto je bijela s jasno ocrtanim crnim ili smeđim točkama, a standard traži točkaste uši. FCI navodi visinu od 56–62 cm za mužjake i 54–60 cm za ženke; PDSA navodi prosječnu težinu od 18–27 kg.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i četkanje jednom tjedno te kaže da se pasmina linja i da joj odgovaraju velika kuća i vrt. PDSA dalmatinere naziva izvrsnim ljubimcima za aktivna kućanstva koji više odgovaraju starijoj djeci, trebaju društvo i nikad ne bi smjeli ostati sami dulje od četiri sata; među zdravstvenim problemima pasmine navodi gluhoću i napominje da postoji BAER test sluha.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler",
      text: [
        "Australski govedarski pas potječe iz Australije; FCI ga svrstava među govedarske pse. Standard Kennel Cluba opisuje snažnog, zbijenog radnog psa s glatkom dvostrukom dlakom otpornom na vremenske uvjete u plavoj boji (prošaranoj ili točkastoj) ili s ravnomjernim crvenim točkicama i navodi visinu od 46–51 cm za mužjake i 43–48 cm za ženke; PDSA navodi prosječnu težinu od 16–20 kg.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i četkanje jednom tjedno te kaže da se pasmina linja. PDSA opisuje vrlo inteligentnog, energičnog psa kojemu treba mnogo tjelesne i misaone aktivnosti; zbog jakog ovčarskog nagona može štipati za pete djecu koja trče, a pomažu socijalizacija i dresura od malih nogu.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "vipet, Snap dog",
      text: [
        "Whippet potječe iz Velike Britanije; FCI ga svrstava među kratkodlake hrtove. Standard Kennel Cluba opisuje skladan spoj mišićne snage i jakosti s elegancijom i gracioznošću linija, finu, kratku, priljubljenu dlaku u svakoj boji ili mješavini boja osim merle te blagu, privrženu, ujednačenu narav; navodi visinu od 47–51 cm za mužjake i 44–47 cm za ženke, a PDSA prosječnu težinu od 11–18 kg.",
        "PDSA preporučuje najmanje sat vremena kretanja svaki dan, uz priliku za trčanje bez povoca na sigurnom prostoru, i četkanje mekom četkom jednom tjedno. Whippete naziva omiljenim izborom za obitelji jer su mirni i blagi uz djecu, ali preporučuje dom s nešto starijom djecom; whippeti ne vole biti sami i imaju zaista jak lovački nagon, pa ih PDSA ne preporučuje uz manje ljubimce. Zimi može pomoći kaput, a debeo, mekan ležaj štiti njihove istaknute kosti.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Korthalsov grifon, Griffon Korthals, Griff",
      text: [
        "Francuski oštrodlaki ptičar Korthals, zvan i Korthalsov grifon, potječe iz Francuske; FCI ga svrstava među kontinentalne ptičare i naziva ga ponajprije svestranim ptičarom. Standard FCI-ja opisuje snažnog, rustikalnog psa duljeg nego što je visok, s oštrom, grubom dlakom koja nikad nije kovrčava ni vunasta, nosom koji je uvijek smeđ i najradije čeličnosivom dlakom sa smeđim mrljama; navodi visinu od oko 55–60 cm za mužjake i 50–55 cm za ženke te pasminu naziva blagom, ponosnom i vrlo nježnom s djecom. PetMD navodi težinu od 35–70 funti (oko 16–32 kg).",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno, veliku kuću i velik vrt te njegu dlake češće nego jednom tjedno. PetMD savjetuje četkanje jednom tjedno (nekim psima treba i ručno trimanje), kaže da su grifoni uglavnom strpljivi i blagi s djecom ako su socijalizirani kao štenad i napominje da im lovačka povijest može dati jak lovački nagon, pa im manje životinje poput mačaka i kunića mogu izgledati kao plijen.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Chesapeake Bay Retriever",
      text: [
        "Chesapeake Bay retriver, često zvan chessie, potječe iz Sjedinjenih Američkih Država; FCI ga svrstava među retrivere. Standard FCI-ja opisuje radnog retrivera jednako vještog na kopnu i u vodi, čija veličina i masa ne bi smjele biti pretjerane, s gustom, kratkom dlakom preko guste, vunaste poddlake i bistrim žućkastim ili jantarnim očima; prihvatljiva je svaka nijansa smeđe, boje šaša ili suhe trave, a crna dlaka isključuje psa. Navodi visinu od 58–66 cm i težinu od 29,5–36,5 kg za mužjake te 53–61 cm i 25–32 kg za ženke.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno, veliku kuću i velik vrt te njegu dlake jednom tjedno. PetMD opisuje bistrog, vedrog i iznimno privrženog psa koji može postati razoran ako nema dovoljno poticaja ili predugo ostaje sam, kaže da su chessieji uz pravilno upoznavanje i socijalizaciju odličan dodatak obitelji i savjetuje da se pas ne kreće neposredno prije ili poslije jela.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Sammy, Samoyede",
      text: [
        "Samojed potječe iz sjeverne Rusije i Sibira; FCI ga svrstava među nordijske pse za saonice. Standard FCI-ja opisuje bijelog, elegantnog arktičkog špica srednje veličine s obilnom, debelom, gustom polarnom dlakom, tamnosmeđim očima, malim, debelim, uspravnim ušima i usnama blago podignutima u kutovima u karakterističnom „samojedskom osmijehu“; dlaka je čisto bijela, krem ili bijela s bojom keksa, a plave ili raznobojne oči isključuju psa. Navodi idealnu visinu od 57 cm za mužjake i 53 cm za ženke, uz odstupanje od 3 cm.",
        "PDSA preporučuje najmanje dva sata kretanja svaki dan i svakodnevnu njegu dlake te kaže da se samojedi vrlo često linjaju, da su obično izvrsni s djecom i odani cijeloj obitelji, da nikad ne bi smjeli ostati sami dulje od četiri sata, da kao vješti bjegunci trebaju vrlo siguran vrt i da imaju jak lovački nagon; savjetuje i razmak nakon jela prije kretanja. PetMD dodaje da samojedi ne podnose dobro visoke temperature.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Aberdeen Terrier",
      text: [
        "Škotski terijer, često zvan scottie, potječe iz Velike Britanije; FCI ga svrstava među male terijere. Standard Kennel Cluba opisuje zdepastog, kratkonogog psa budnog držanja koji na malom prostoru odaje dojam velike snage i aktivnosti – odanog i vjernog, dostojanstvenog, neovisnog i suzdržanog, ali hrabrog i vrlo inteligentnog, odvažnog, ali nikad agresivnog. Priljubljena dvostruka dlaka ima oštru, žičastu pokrovnu dlaku; boja je crna, boje pšenice ili tigrasta u bilo kojoj nijansi. Navodi visinu od 25–28 cm i težinu od 8,5–10,5 kg.",
        "PDSA kaže da škotski terijeri trebaju oko sat vremena kretanja dnevno i svakodnevnu njegu dlake, uz trimanje i šišanje kod profesionalnog frizera za pse svaka dva do tri mjeseca, opisuje ih kao odane i predane obitelji i kaže da znaju biti tvrdoglavi, pa dresura traži strpljenje i ustrajnost. PetMD kaže da uz pravu dresuru i socijalizaciju mogu biti dobri obiteljski psi, da je socijalizacija šteneta važna i da ne bi smjeli dugo ostajati sami.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "vajmarski ptičar, Weimaraner, Weim",
      text: [
        "Vajmarski ptičar potječe iz Njemačke; FCI ga svrstava među kontinentalne ptičare i priznaje kratkodlaku i dugodlaku varijantu. Standard FCI-ja opisuje srednje velikog do velikog lovačkog psa funkcionalnog radnog tipa, žilavog i vrlo mišićavog, s jantarnim očima i širokim, prilično dugim ušima; dlaka je srebrnosiva, srnećesiva ili mišjesiva, dopuštene su samo male bijele oznake na prsima i prstima, a svaka boja osim sive isključuje psa. Navodi visinu od 59–70 cm i težinu od oko 30–40 kg za mužjake te 57–65 cm i oko 25–35 kg za ženke.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno, veliku kuću i velik vrt te njegu dlake jednom tjedno. PDSA kaže da su vajmarski ptičari u pravim rukama divni obiteljski ljubimci i da najbolje odgovaraju vlasnicima koji poznaju pasminu, ali ih zbog vrlo jakog lovačkog nagona ne preporučuje domovima s manjom djecom ili manjim ljubimcima, kaže da mogu razviti separacijsku anksioznost ako ostaju sami i savjetuje socijalizaciju od malih nogu te razmak između hranjenja i kretanja. PetMD dodaje mjesečno čišćenje ušiju i kupanje jednom mjesečno.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Iggy",
      text: [
        "Talijanski hrtić potječe iz Italije; FCI ga pod imenom Piccolo Levriero Italiano svrstava među kratkodlake hrtove. Standard Kennel Cluba opisuje hrta u malom, vitkijeg u svim proporcijama, elegantnog, gracioznog i brzog, inteligentnog, privrženog i živahnog, iako se može činiti rezerviranim, s kratkom, finom, sjajnom dlakom preko tanke kože. Navodi visinu od 32–38 cm i težinu od 3,6–4,5 kg; prihvaćene su crna, plava, krem, žuta, crvena i bijela boja ili bilo koja od njih prekinuta bijelim – nikad merle, tigrasta ni s podpalinama.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara mala kuća, u gradu ili na selu, da treba njegu dlake jednom tjedno i da se ne linja. PDSA kaže da su talijanski hrtići puni energije, da bi se trebali kretati na ograđenom prostoru jer ih je teško dozvati kad ugledaju plijen, da znaju biti plašljivi, pa je rana socijalizacija nužna, i da – zbog krhkih kostiju dok rastu – možda nisu idealna pasmina za domove s malom djecom ili drugim ljubimcima. PetMD dodaje da ih tanka dlaka ne grije, pa im je lako hladno.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "divovski šnaucer, Riesenschnauzer, minhenski šnaucer",
      text: [
        "Veliki šnaucer potječe iz Njemačke; FCI ga pod imenom Riesenschnauzer svrstava među pinčere i šnaucere. Standard Royal Kennel Cluba opisuje snažno građenog, robusnog, žilavog psa gotovo kvadratnog izgleda, odvažnog, pouzdanog, dobroćudnog i staloženog, s oštrom, žičastom pokrovnom dlakom i dobrom poddlakom. Navodi visinu od 65–70 cm za mužjake i 60–65 cm za ženke; standard FCI-ja navodi težinu od 35–47 kg. Prihvaćene su čisto crna, papar-sol s tamnom maskom na licu te crna sa srebrnom – nijedna druga boja.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba svakodnevnu njegu dlake i da se ne linja. PDSA kaže da dlaka treba svakodnevnu njegu i redovito skraćivanje, da veliki šnauceri mogu biti dragi ljubimci za obitelji sa starijom djecom ako su kao štenad dobro socijalizirani i da ti psi snažne volje odgovaraju iskusnim vlasnicima. PetMD dodaje da se dlaka svakih nekoliko mjeseci profesionalno ručno trima i da se pasmina ne snalazi dobro u domovima u kojima ljudi često nisu kod kuće.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "bloodhound, St. Hubert Hound, Chien de Saint-Hubert, Sleuth Hound",
      text: [
        "Pas svetog Huberta (bloodhound) potječe iz Belgije; FCI ga pod imenom Chien de Saint-Hubert vodi kao velikog goniča. Standard FCI-ja opisuje najsnažnijeg od svih goniča: blagog, mirnog, ljubaznog i druželjubivog prema ljudima i osobito vezanog uz vlasnika, s kratkom, gustom dlakom otpornom na vremenske uvjete i gipkom, labavom kožom. Mužjaci teže oko 46–54 kg, a ženke oko 40–48 kg; tri boje su crna s podpalinama, smeđa s podpalinama i crvena.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba njegu dlake jednom tjedno i da se linja. PDSA kaže da psi svetog Huberta više odgovaraju iskusnim vlasnicima, da se zbog veličine i vrlo jakog lovačkog nagona ne preporučuju domovima s manjom djecom ili manjim ljubimcima, da sline i da im kožne nabore treba održavati čistima i suhima. Savjetuje i razmak između hranjenja i kretanja.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "američka akita, American Akita",
      text: [
        "Akita u ovoj enciklopediji američki je tip: FCI je vodi kao američku akitu, pasminu japanskog podrijetla, odvojenu od japanske akite inu. Standard FCI-ja opisuje velikog, čvrsto građenog, skladnog psa velike mase i teških kostiju, s malim uspravnim ušima i velikim repom nošenim preko leđa; mužjaci su visoki 66–71 cm u grebenu. Dopuštena je svaka boja, poput crvene, žute, bijele, šarene (pinto) ili tigraste. PDSA navodi prosječnu težinu od 31–59 kg.",
        "PDSA opisuje nevjerojatno odane obiteljske ljubimce koji su neovisni i vrlo veliki, pa najbolje odgovaraju iskusnim vlasnicima; akitu ne bi preporučio za dom s malom djecom i savjetuje da ih se ne ostavlja same jer mnoge to ne podnose dobro. Preporučuje najmanje dva sata kretanja svaki dan, socijalizaciju od malih nogu, razmak između hranjenja i kretanja i četkanje barem jednom tjedno – akite se jako linjaju. Navodi i jak lovački nagon te to da se po vrlo vrućem vremenu mogu pregrijati.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "velški korgi cardigan, Cardigan Welsh Corgi, Cardi",
      text: [
        "Welsh corgi cardigan potječe iz Velike Britanije; FCI ga svrstava među govedarske pse. Standard American Kennel Cluba navodi visinu od 10,5–12,5 inča (oko 27–32 cm) u grebenu i idealnu težinu od 30–38 funti (oko 14–17 kg) za mužjake. Za razliku od rođaka pembrokea ima dug, pun rep.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno, navodi da je dovoljna mala kuća s malim ili srednje velikim vrtom i kaže da pasmina treba njegu dlake češće nego jednom tjedno i da se linja; navodi životni vijek dulji od 12 godina i cardigana vodi kao ranjivu domaću britansku pasminu (vulnerable native breed). PDSA kaže da korgiji rado udovoljavaju, pa bi dresura trebala biti prilično laka, da je obično dovoljno četkanje dva do tri puta tjedno i da mogu štipati za pete djecu koja trče – pomažu socijalizacija s djecom i dresura od malih nogu.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, GWP",
      text: [
        "Njemački oštrodlaki ptičar potječe iz Njemačke; FCI ga pod imenom Deutsch Drahthaar svrstava među kontinentalne ptičare. Standard Royal Kennel Cluba opisuje lovačkog psa srednje veličine sa žičastom dlakom koja potpuno prekriva kožu – blagog, privrženog i ujednačene naravi, budnog, poslušnog i vrlo odanog. Mužjaci su visoki 60–67 cm i teški 25–34 kg; ženke su visoke 56–62 cm i teške 20,5–29 kg. Boje prema standardu su smeđe-bijela, jednobojna smeđa i crno-bijela.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i kaže da mu odgovara velika kuća s velikim vrtom na selu, da treba njegu dlake češće nego jednom tjedno i da se linja. PetMD kaže da njemački oštrodlaki ptičari trebaju mnogo kretanja i misaonih poticaja, da se snažno vežu uz obitelj i uz ranu dresuru i socijalizaciju mogu biti izvrsni obiteljski psi, da se dobro snalaze s djecom koja su naučila kako se ponašati sa životinjama, da nikad ne bi smjeli dugo ostajati sami i da imaju jak lovački nagon. Dlaka se ručno trima dvaput godišnje.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "bernardinac, St. Bernhardshund, Bernhardiner",
      text: [
        "Bernardinac potječe iz Švicarske; FCI ga pod imenom St. Bernard svrstava među molose planinskog tipa. Standard FCI-ja opisuje psa ljubazne naravi, mirnog do živahnog i budnog, i priznaje dvije varijante: kratkodlaku, s gustom, glatkom, priljubljenom dlakom, i dugodlaku. Mužjaci su visoki najmanje 70 cm, a ženke najmanje 65 cm, do 90 odnosno 80 cm; PDSA navodi težinu od 54–81 kg.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba njegu dlake češće nego jednom tjedno, da se linja i da obično živi kraće od deset godina. PDSA kaže da bernardinci vole biti s obitelji i izvrsni su s ljudima svih dobi, uključujući djecu, da ih kao štenad treba dobro socijalizirati, da trebaju četkanje najmanje tri puta tjedno, da sline, da ne podnose tako dobro vrućinu i da trebaju razmak između hranjenja i kretanja. PetMD dodaje da ti psi usmjereni na ljude mogu razviti separacijsku anksioznost ako dugo ostaju sami.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staford, Staffordshire bull terijer, Staffie",
      text: [
        "Stafordski bulterijer potječe iz Velike Britanije; FCI ga svrstava među terijere bul tipa. Standard FCI-ja opisuje kratkodlakog, skladnog psa velike snage s obzirom na veličinu – tradicionalno nesalomljive hrabrosti i upornosti, vrlo inteligentnog i privrženog, osobito djeci. Visok je 35,5–40,5 cm; mužjaci teže 12,7–17 kg, a ženke 11–15,4 kg. Dolazi u tigrastoj, crvenoj, žutoj, crnoj, plavoj ili bijeloj boji, samoj ili s bijelim.",
        "Royal Kennel Club naziva ga divnim obiteljskim ljubimcem i preporučuje do sat vremena kretanja dnevno; treba njegu dlake jednom tjedno, linja se i obično živi dulje od 12 godina. PDSA kaže da su stafordi tolerantni i blage naravi prema djeci, ali kao psi usmjereni na ljude poznati su po tome što pate od separacijske anksioznosti kad ostanu sami, a i po grizenju stvari, a zbog vrlo jakog lovačkog nagona manji ljubimci uz njih nisu dobra ideja.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, kralj terijera, Waterside Terrier",
      text: [
        "Airedale terijer potječe iz Velike Britanije; FCI ga svrstava među velike i srednje velike terijere. Standard FCI-ja naziva ga najvećim od terijera – mišićav, aktivan, prilično zbijen pas, otvoren i samouvjeren, prijazan, hrabar i inteligentan, uvijek budan, nije agresivan, ali je neustrašiv. Mužjaci su visoki oko 58–61 cm, a ženke oko 56–59 cm. Tvrda, gusta, žičasta dlaka je žutosmeđa (podpalina), s crnim ili sivkastim sedlom.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno; dlaka treba svakodnevnu njegu i ne linja se, a pasmina obično živi dulje od 10 godina. PetMD opisuje izvrsne obiteljske pse koji se, ako su dobro školovani, obično slažu s djecom, ali ih ne bi trebalo predugo ostavljati same sebi; savjetuje četkanje nekoliko puta tjedno, kratko čišćenje ušiju svaki tjedan i odlazak profesionalnom frizeru za pse tri ili četiri puta godišnje.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Russell Terrier (AKC), Jack Russell, JRT",
      text: [
        "Jack Russell terijer – American Kennel Club zove ga Russell terijer – potječe iz Engleske, a razvijen je u Australiji; FCI ga svrstava među male terijere. Standard ga opisuje kao snažnog, aktivnog, gipkog radnog terijera snažnog karaktera: živahnog, budnog i aktivnog, odvažnog i neustrašivog, ljubaznog, ali tiho samouvjerenog. Visok je 25–30 cm i težak oko 5–6 kg. Glatka, prijelazna ili oštra dlaka većinom je bijela s crnim i/ili podpalinama.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno; pasmina se linja i obično živi dulje od 10 godina. PDSA opisuje pametne, živahne pse koji mogu biti dobri obiteljski ljubimci ako su od malih nogu školovani i socijalizirani, ali više odgovaraju obiteljima s nešto starijom djecom; imaju vrlo jak lovački nagon, pa se manji ljubimci ne preporučuju, a obožavaju kopati.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "bulmastif, Bull Mastiff",
      text: [
        "Bulmastif je stara engleska čuvarska pasmina iz 19. stoljeća, nastala od buldoga i starog engleskog mastifa; FCI ga svrstava među molose. Standard ga opisuje kao snažnog, simetričnog psa koji pokazuje veliku snagu, ali nije nezgrapan – izdržljivog, aktivnog, pouzdanog, živahnog duha, budnog i vjernog. Mužjaci su visoki 64–69 cm i teški 50–59 kg, ženke 61–66 cm i 41–50 kg. Kratka, tvrda dlaka je u bilo kojoj nijansi žute, crvene ili tigraste boje, uvijek s crnom njuškom.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno, a pasmina obično živi kraće od 10 godina. PDSA opisuje vrlo odane pse kojima zbog veličine i snage više odgovaraju kućanstva samo s odraslima ili obitelji sa starijom djecom; trebaju ranu socijalizaciju, idealno nekoga tko je stalno kod kuće, imaju vrlo jak lovački nagon, jako sline i trebaju razmak između hranjenja i kretanja.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "kineski kukmasti pas, Powder Puff",
      text: [
        "Kineski kukmasti pas mali je, aktivan i graciozan pas za društvo iz Kine; FCI ga svrstava među bezdlake pse. Postoji u dvije varijante: bezdlakoj, s glatkim golim tijelom i dlakom samo na glavi (kukma), stopalima i repu, te varijanti powder puff, potpuno prekrivenoj velom duge, meke dlake. Mužjaci su visoki 28–33 cm, a ženke 23–30 cm; PetMD navodi težinu od 8–12 funti (3,6–5,4 kg). Dopuštena je svaka boja osim merle, a narav mu se opisuje kao vesela, nikad opaka.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake jednom tjedno; odgovara mu stan, a pasmina obično živi dulje od 12 godina. PetMD opisuje ljubaznog psa koji se uklapa u većinu obitelji, uključujući one s djecom i drugim ljubimcima – svako druženje s djecom treba biti pod nadzorom. Gola koža treba zaštitu od sunca i hladnoće, nokte treba pregledavati svaki tjedan, a štenad treba ranu, dosljednu socijalizaciju.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toler, Nova Scotia Duck Tolling Retriever, NSDTR",
      text: [
        "Novoškotski retriver (Nova Scotia duck tolling retriver), zvan toler, potječe iz Kanade; njegov standard FCI-ja opisuje kako trči i igra se uz obalu na vidiku pataka da bi ih namamio, a zatim ga šalju da donese ptice. Standard opisuje srednje velikog, snažnog, zbijenog i dobro omišićenog psa koji je vrlo inteligentan, lako se dresira i vrlo je izdržljiv. FCI navodi 48–51 cm i 20–23 kg za mužjake te 45–48 cm i 17–20 kg za ženke. Vodoodbojna dvostruka dlaka različitih je nijansi crvene ili narančaste, obično s bijelim na vrhu repa, stopalima, prsima ili kao lisa.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno, a pasmina se linja; PetMD savjetuje četkanje jednom do dvaput tjedno. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 13,2 godine, PetMD 12–14 godina, a kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD). AKC opisuje vrlo privržene pse koji su obično dobri s djecom, trebaju mnogo tjelesnog kretanja i misaonih poticaja, mogu imati jak lovački nagon prema manjim životinjama i imaju koristi od rane socijalizacije i škole za štenad.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "Cairn terijer potječe iz Velike Britanije; FCI ga svrstava među male terijere. Standard Kennel Cluba opisuje okretnog, budnog terijera radnog, prirodnog izgleda – aktivnog, srčanog i otpornog, neustrašive i vesele naravi, samouvjerenog, ali ne agresivnog. Dvostruka dlaka otporna na vremenske uvjete ima obilnu, oštru pokrovnu dlaku; boja je krem, boje pšenice, crvena, siva ili gotovo crna, tigrasti uzorak je prihvatljiv, a tamne uši i njuška tipični su. Navodi visinu od oko 28–31 cm i idealnu težinu od 6–7,5 kg.",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno i kaže da cairn terijeri imaju neiscrpnu energiju i jak lovački nagon, pa ih treba rano socijalizirati s mačkama i drugim malim ljubimcima i paziti kad su bez povoca, te da se nakon socijalizacije vrlo dobro slažu s djecom i izvrsni su obiteljski ljubimci. Savjetuje ručno trimanje dlake dvaput godišnje i njegu jednom do dvaput tjedno; Dogs Trust kaže da se vrlo malo linjaju. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 14,0 godine, PetMD 13–15 godina, a kao i drugi mali psi potpuno naraste s oko 9–12 mjeseci (PetMD). PetMD dodaje da trebaju mnogo kretanja i misaonih poticaja.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "bulterijer, English Bull Terrier, Bully",
      text: [
        "Bulterijer potječe iz Velike Britanije; FCI ga svrstava među terijere bul tipa (skupina 3). Riječ je o srednje velikom, kratkodlakom terijeru: PDSA navodi prosječnu visinu od 51–61 cm i prosječnu težinu od 22–31 kg, a PetMD opisuje atletsku građu od oko 21–22 inča i 50–70 funti. PetMD kaže da je redovito kretanje nužno i da su bulterijeri privrženi obitelji, uključujući djecu, ali nisu uvijek ljubazni prema drugim psima ili mačkama te da su rana i česta socijalizacija i dresura ključne.",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno, raspoređeno tijekom dana, i razmak nakon obroka prije kretanja. Kaže da se dobro socijalizirani bulterijer slaže s ljudima svih dobi, ali je, budući da se lako uzbudi, bolji sa starijom djecom; voli društvo što je više moguće i ima jak lovački nagon, pa je potreban oprez uz mačke i druge male životinje. Za dlaku je dovoljno četkanje jednom tjedno. PDSA navodi prosječan životni vijek dulji od 10 godina, a PetMD 12–13 godina; kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Min Pin, Zwergpinscher",
      text: [
        "Patuljasti pinč potječe iz Njemačke; FCI ga svrstava među pinčere i šnaucere (skupina 2) i opisuje ga kao umanjenu sliku njemačkog pinča – živahnog, vatrenog, samouvjerenog i ujednačene naravi. Dlaka mu je kratka, gusta, glatka i sjajna, jednobojna od jelenje crvene do tamne crvenosmeđe ili crna s podpalinama, a rep je prirodan. Standard FCI-ja navodi visinu od 25–30 cm i težinu od 4–6 kg za mužjake i ženke; kao i drugi patuljasti psi potpuno naraste s oko 8–12 mjeseci (PetMD).",
        "PDSA za te energične, užurbane male pse preporučuje do pola sata kretanja dnevno, kaže da je za dlaku obično dovoljno četkanje jednom tjedno i napominje da znaju biti tvrdoglavi i neovisni, pa dresura traži vježbu i strpljenje. PetMD kaže da uz pravu socijalizaciju i dresuru mogu biti izvrsni obiteljski ljubimci. VCA opisuje pasminu kao razigranu i vrlo dobru s djecom, iako psa vrlo mala ili neposlušna djeca mogu ozlijediti grubom igrom, i kaže da je zbog tanke dlake i male veličine osjetljiv na hladnoću. PDSA navodi prosječan životni vijek dulji od 12 godina, a PetMD 12–16 godina.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "pirinejac, Great Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Pirinejski planinski pas – u Sjedinjenim Američkim Državama zvan Great Pyrenees – potječe iz Francuske; FCI ga svrstava među molose planinskog tipa (skupina 2) i opisuje vrlo velikog psa, impozantnog i snažne građe, ali ne bez određene elegancije. Dlaka je bijela ili bijela s mrljama boje jazavca, vučje sive, blijedožute ili narančaste na glavi i ušima. Standard FCI-ja navodi visinu od 70–80 cm za mužjake i 65–75 cm za ženke; PDSA navodi prosječnu težinu od 40–50 kg. Kao i drugi divovski psi potpuno naraste s oko 18–24 mjeseca (PetMD).",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba njegu dlake češće nego jednom tjedno i da se linja te navodi životni vijek kraći od 10 godina (PetMD i VCA navode 10–12 godina). PDSA ih naziva nježnim divovima – mirnim, dobroćudnim psima koji se obično dobro slažu sa svima – i kaže da dresura traži strpljenje i metode s nagradama. VCA kaže da je pirinejac odan obitelji, osobito djeci, i da je rana socijalizacija vrlo važna; PetMD kaže da dobro živi s drugim ljubimcima, ali možda najbolje odgovara domovima bez manje djece, i zbog rizika od torzije želuca savjetuje izbjegavanje napornog kretanja oko obroka.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten terijer, Wheaten, Irish Soft Coated Wheaten Terrier, SCWT",
      text: [
        "Irski mekodlaki pšenični terijer potječe iz Irske; FCI ga pod imenom Irish Soft Coated Wheaten Terrier svrstava među velike i srednje velike terijere. Standard Royal Kennel Cluba opisuje srednje velikog, zbijenog, uspravnog terijera s mekom, svilenkastom dlakom boje pšenice koja pada u labavim kovrčama ili valovima – dobroćudnog, živahnog i srčanog, punog samopouzdanja i humora. Jedina boja je čista, jasna boja pšenice. PDSA navodi prosječnu visinu od 46–49 cm i prosječnu težinu od 16–20,5 kg (standard Kennel Cluba za mužjake navodi 16–20,5 kg, za ženke nešto manje); kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara mala kuća, da treba svakodnevnu njegu dlake i da se ne linja. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 13,7 godine; PetMD i VCA navode 12–14 godina. PDSA ih naziva ljubaznim, pouzdanim psima koji su izvrsni obiteljski ljubimci, iako znaju biti pomalo tvrdoglavi. VCA kaže da ih blaga, razigrana narav čini dobrim izborom za djecu; PetMD kaže da druženje s djecom treba nadzirati, da ne vole dugo ostajati sami i savjetuje profesionalnu njegu dlake svaka četiri do šest tjedana, kupanje otprilike jednom mjesečno i čišćenje ušiju svakih jedan do dva tjedna.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Wolfhound, Cú Faoil, Irish Wolf Hound",
      text: [
        "Irski vučji hrt potječe iz Irske; FCI ga svrstava među oštrodlake hrtove. PDSA navodi prosječnu visinu od 71–79 cm i prosječnu težinu od 40–55 kg; kao i drugi divovski psi potpuno naraste s oko 18–24 mjeseca (PetMD). Royal Kennel Club njegovu veličinu naziva iznimno velikom i kaže da mu odgovara velika kuća s velikim vrtom na selu.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake češće nego jednom tjedno te kaže da se pasmina linja. Kennel Club i PDSA navode životni vijek kraći od 10 godina; PetMD navodi 6–8 godina. PDSA zbog veličine i snage ne preporučuje pasminu domovima s manjom djecom, a zbog jakog lovačkog nagona ni uz manje ljubimce, i kaže da nikad ne bi smio ostati sam dulje od četiri sata. PetMD savjetuje socijalizaciju šteneta od dana kad dođe kući, bez kretanja neposredno prije ili poslije jela (torzija želuca) i čišćenje ušiju svaka dva do četiri tjedna.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaf, AmStaff, Staffordshire Terrier",
      text: [
        "Američki stafordski terijer potječe iz SAD-a; FCI ga svrstava među terijere bul tipa. Standard traži veliku snagu s obzirom na veličinu i navodi visinu od 46–48 cm za mužjake i 43–46 cm za ženke, ali ne i težinu. PetMD navodi 40–70 funti (oko 18–32 kg) za oba spola; pas te veličine potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "PetMD preporučuje najmanje 60 minuta kretanja dnevno i kaže da je pasmina strpljiva i puna ljubavi prema djeci, da može biti sklona separacijskoj anksioznosti i da joj jak lovački nagon može otežati život s manjim psima ili mačkama. Britanska studija (McMillan i sur., 2024, u tablici Dogs Trusta) navodi medijan očekivanog životnog vijeka od 12,5 godine; PetMD navodi 12–16 godina. VCA preporučuje četkanje jednom tjedno; PetMD savjetuje socijalizaciju šteneta, bez kretanja odmah nakon obroka (torzija želuca) te kupanje i čišćenje ušiju otprilike svakih 4–6 tjedana.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, romanjski vodeni pas, pas za tartufe",
      text: [
        "Lagotto romagnolo mali je do srednje velik kovrčavi vodeni pas iz Italije, poznat kao pas za tartufe; FCI ga svrstava među pse za vodu. Standard navodi visinu od 43–48 cm i težinu od 13–16 kg za mužjake te 41–46 cm i 11–14 kg za ženke; pas te veličine potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "Royal Kennel Club naziva ga izvrsnim i budnim obiteljskim pratiteljem, preporučuje više od dva sata kretanja dnevno i njegu dlake češće nego jednom tjedno, kaže da se ne linja i navodi životni vijek dulji od 12 godina; PetMD kaže da lagotti mogu doživjeti 15–17 godina. PetMD napominje da treba stalne misaone i tjelesne poticaje i opsežnu socijalizaciju jer može biti sramežljiv; Woodgreen kaže da mu može biti teško kad prečesto ostaje sam i preporučuje profesionalnu njegu dlake svakih šest do osam tjedana.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamut, Malamute, Mal",
      text: [
        "Aljaški malamut jedan je od najstarijih arktičkih pasa za saonice: snažan, čvrsto građen nordijski pas za saonice iz SAD-a s gustom, grubom dlakom. Standard FCI-ja navodi poželjne veličine od 63,5 cm i 38 kg za mužjake te 58,5 cm i 34 kg za ženke; PDSA navodi 58–64 cm i 34–39 kg. Pas te veličine potpuno naraste s oko 15–18 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 10 godina (PetMD: 10–14 godina).",
        "PDSA preporučuje najmanje dva sata napornog kretanja i četkanje svaki dan i kaže da se malamuti jako linjaju, imaju vrlo jak lovački nagon, ne bi smjeli ostati sami dulje od četiri sata i odgovaraju aktivnim odraslima ili obiteljima sa starijom djecom; za vlasnike kojima je to prvi pas naziva ih zahtjevnima. PetMD savjetuje pregled ušiju jednom tjedno i kupanje svakih 6–8 tjedana te napominje da im zbog guste dlake vruće vrijeme teško pada.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "afrički pas koji ne laje, Congo Dog",
      text: [
        "Basenji je lagano građen lovački pas finih kostiju iz Srednje Afrike koji ne laje, nego proizvodi vlastiti zvuk nalik jodlanju; FCI ga svrstava među pse primitivnog tipa. PDSA navodi visinu od 40–43 cm i težinu od 9–11 kg. Pas te veličine potpuno naraste s oko 9–12 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 12 godina (WebMD: 13–14 godina).",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno (oko 60–90 minuta), mnogo misaonih poticaja i četkanje jednom tjedno; basenjije naziva suzdržanima, ali pouzdanima, snažne volje i s vrlo slabim osjećajem za promet. WebMD kaže da će juriti za svime što izgleda kao plijen, da trebaju vrlo visoke ograde ili stalan nadzor i da su s malom djecom tek umjereno dobri te savjetuje čišćenje ušiju jednom tjedno i pranje zubi najmanje dvaput tjedno.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "veliki švicarski planinski pas, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Veliki švicarski planinski pas snažan je, mišićav vučni pas jakih kostiju iz Švicarske, trobojan: crn sa simetričnim smeđim i bijelim oznakama. Standard FCI navodi visinu od 65–72 cm za mužjake i 60–68 cm za ženke, ali ne navodi težinu; WebMD navodi 52–64 kg za mužjake i 39–50 kg za ženke. Pas te veličine potpuno naraste s oko 18–24 mjeseca (PetMD), a Royal Kennel Club navodi životni vijek dulji od 10 godina (PetMD: 8–11 godina).",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i četkanje jednom tjedno te navodi da pasmina linja i treba veliku kuću s velikim vrtom. PetMD ih opisuje kao izvrsne obiteljske pse koji su nježni s djecom (svaki kontakt s djecom treba nadzirati) i savjetuje čišćenje ušiju jednom tjedno te da pas ne trči neposredno prije ni poslije obroka zbog opasnosti od torzije želuca (GDV); WebMD savjetuje svakodnevno pranje zubi i što manje poslastica jer pasmina lako dobiva na težini.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "British Blue, britanska plava",
      text: [
        "Britanska kratkodlaka mačka čvrsta je mačka guste dlake i velikih okruglih očiju – CFA je naziva mačkom „medvjedićem“. Većina je ljudi zamišlja plavosivom, ali dolazi u nizu boja i uzoraka. Sporo sazrijeva: CFA kaže da punu veličinu dostiže s otprilike tri godine, a VCA da tjelesna zrelost može potrajati i do pet.",
        "CFA je opisuje kao vrlo privrženu i vezanu uz svoje ljude; slaže se sa svima u kućanstvu bez obzira na dob, ali obično ne voli da je se nosi, a živjela je i sa psima, kunićima i pticama. VCA opisuje umjerenu razinu aktivnosti i savjetuje češljanje dlake najmanje jednom tjedno. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA opisuje ragdoll kao veliku, opuštenu mačku s poludugom, plišanom i svilenkastom dlakom i plavim očima. Tamnije „točke“ (points) dolaze u nekoliko uzoraka – colourpoint bez bijelog, mitted s bijelim šapama, bicolour s više bijelog i van. Sporo sazrijeva: punu boju dlake dostiže s dvije godine, a punu veličinu i težinu s otprilike četiri.",
        "CFA opisuje blagu mačku koja te dočeka na vratima i prati iz sobe u sobu, a obično se igra bez izvlačenja pandži. PetMD je naziva dobrim izborom za obitelji, uključujući one s djecom, ali savjetuje polagano upoznavanje s djecom i drugim ljubimcima uz nadzor i kaže da nekim ragdollima treba češljanje samo jednom ili dvaput tjedno, dok CFA savjetuje redovito češljanje. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibirska šumska mačka, Siberian",
      text: [
        "GCCF opisuje sibirsku mačku kao mačku koja se sporo razvija, s gustom dlakom otpornom na vremenske uvjete: gustom, mekom poddlakom ispod grublje pokrovne dlake, koja se u proljeće i jesen jako linja. Mužjaci teže oko 7,7–11,8 kg, a ženke 5,9–7,7 kg, puni razvoj može potrajati četiri do pet godina, a GCCF navodi životni vijek od 12 do 15 godina ili dulje.",
        "GCCF je naziva energičnom i zaigranom, a ipak strpljivom – dobrim izborom za obitelji s malom djecom – i kaže da se dobro slaže s drugim životinjama, uključujući pse. PetMD savjetuje češljanje najmanje jednom tjedno, uz dodatni trud dok se linja u proljeće i jesen, i napominje da se sibirske mačke ne smatraju hipoalergenima. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine Coon, mejnkun",
      text: [
        "Maine coon općenito se smatra jednom od najvećih pasmina domaćih mačaka, s mišićavim, pravokutnim tijelom, širokim prsima, velikim šapama i dugim, lepršavim repom. TICA navodi prosječnu težinu od oko 5,9–8,2 kg za zrele mužjake i 4,1–5,9 kg za ženke, a CFA napominje da neki mužjaci teže više od 9 kg. Raste polako: prema CFA-u često se potpuno razvije tek s tri ili četiri godine, a TICA kaže da puna zrelost može potrajati tri do pet godina.",
        "TICA je opisuje kao blagu, ljubaznu i razigranu, a CFA kao druželjubivu, odanu i inteligentnu; često „govori“ cvrkutavim trilerom umjesto mijaukanja. Vetstreet piše da se maine coon mačke slažu sa svima, uključujući djecu, pse i druge mačke. Teška, poluduga dlaka kraća je na ramenima, a dulja na ovratniku, trbuhu i stražnjem dijelu tijela. Izvori se razlikuju u njezi: Vetstreet kaže da je dovoljno češljanje jednom tjedno, CFA savjetuje četkanje ili češljanje barem nekoliko puta tjedno, a TICA napominje da gušća dlaka može trebati svakodnevno češljanje. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalska mačka, Bengal",
      text: [
        "PDSA opisuje bengalsku mačku kao vrlo inteligentnu i energičnu mačku kojoj treba mnogo misaonih poticaja i prilika za kretanje i koja voli visoko promatračko mjesto poput penjalice za mačke. Privržena je, ali će se prije sklupčati pokraj tebe nego u tvom krilu, a zna biti i prilično glasna. VCA napominje da bengalske mačke rastu polako i da im tjelesna zrelost može potrajati i do dvije godine.",
        "Kratka, mekana, točkasta ili mramorasta dlaka treba samo lagano četkanje ili češljanje jednom tjedno (PDSA). PetMD napominje da bengalska mačka možda nije najbolji izbor za obitelji s malom djecom, dok psi i druge mačke uz pravilno upoznavanje mogu biti u redu. Pasmina je nastala križanjem azijske leopardske mačke i domaćih mačaka; PetPrep prikazuje samo registriranu domaću bengalsku mačku. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Wegie, Skogkatt, norveška šumska",
      text: [
        "GCCF opisuje norvešku šumsku mačku kao blagu i ljubaznu mačku koja uživa biti dio obitelji. Sporo sazrijeva i ne smatra se potpuno odraslom do otprilike četiri do pet godina; mužjaci teže oko 5,4–7,3 kg, a ženke 4,1–5,4 kg, a GCCF navodi životni vijek od 14 do 16 godina.",
        "Ima mnogo energije, uživa u interaktivnim igrama i rado se penje; GCCF kaže da je tolerantna prema djeci koja se prema njoj odnose s poštovanjem, drugim mačkama i psima naviklima na mačke. PetMD savjetuje češljanje i četkanje najmanje jednom tjedno, češće dok se linja u proljeće i jesen, i napominje da separacijska anksioznost može biti problem ako često dugo ostaje sama. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
    keeshond: {
      aka: "Vučji špic, Keeshond, Wolfsspitz, njemački vučji špic, Keeshonden",
      text: [
        "Vučji špic (keeshond) srednje je velik špic iz Njemačke, vučja varijanta njemačkog špica (Wolfsspitz). Ima dugu, odstojeću dlaku sivih nijansi, gustu grivu i tamne „naočale“ oko očiju (standard FCI-ja). Standard FCI-ja navodi visinu od 49 ± 6 cm, a PDSA prosječnu težinu od 16–20 kg. Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD). PDSA navodi životni vijek dulji od 10 godina, a VCA 12–14 godina.",
        "PDSA piše da pasmini treba do sat vremena kretanja dnevno, a gustu dvostruku dlaku treba njegovati svaki dan. Prema PDSA-u vučji špicevi izvrsni su obiteljski ljubimci koji se slažu s drugim ljubimcima u kućanstvu, a uz malo vremena i strpljenja dobro reagiraju na dresuru. VCA ih opisuje kao razigrane i obzirne prema djeci, savjetuje kupanje otprilike jednom mjesečno te navodi da se linjaju više od prosjeka i da su zbog guste dlake skloni pregrijavanju.",
      ],
      sources: ["S246", "S709", "S710", "S10"],
    },
    standard_schnauzer: {
      aka: "Srednji šnaucer, Standardni šnaucer, Schnauzer, Mittelschnauzer, Wire-Haired Pinscher",
      text: [
        "Srednji šnaucer (standardni šnaucer) potječe iz Njemačke. FCI ga vodi jednostavno kao šnaucera, u skupini pinčera i šnaucera. Standard FCI-ja opisuje srednje velika, snažna psa zdepaste, a ne vitke građe, s oštrom, grubom i gustom dlakom, visećim ušima i prirodnim repom. Visina je 45–50 cm, a težina 14–20 kg za mužjake i ženke; boje su papar i sol te čista crna. Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD). Royal Kennel Club navodi životni vijek dulji od 10 godina, a VCA 12–14 godina.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake više puta tjedno. Navodi da pasmini odgovara mala kuća s malim ili srednje velikim vrtom, u gradu ili na selu. PDSA piše da su šnauceri nježni, strpljivi psi koji se dobro slažu s djecom ako ih se rano upozna s njima, a dlaku treba njegovati dva do tri puta tjedno. VCA navodi da pasmina brzo uči, ali se i brzo dosađuje, pa joj igre i trikovi pružaju misaonu aktivnost koja joj je potrebna. PetMD preporučuje kupanje jednom mjesečno, podrezivanje noktiju, čišćenje ušiju svakih jedan do dva tjedna i odlazak profesionalnom frizeru za pse svaka tri mjeseca.",
      ],
      sources: ["S10", "S711", "S712", "S714", "S715", "S716", "S717"],
    },
    english_setter: {
      aka: "Engleski seter, English Setter, Laverack Setter, Llewellin Setter, Setter",
      text: [
        "Engleski seter elegantan je ptičar iz Velike Britanije, uzgojen za traženje pernate divljači. Standard FCI-ja opisuje psa srednje visine, čistih linija i elegantnog kretanja, s bijelom dlakom prošaranom sitnim pjegama u boji (belton): plavom, narančastom, limun-bijelom ili jetrenom, ili trobojnom. Visina je 65–68 cm za mužjake i 61–65 cm za ženke. PDSA navodi prosječnu težinu od 22–29 kg. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 10 godina.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno. Navodi da se pasmina linja i da joj odgovara velika kuća s velikim vrtom, a svrstava je u 1. kategoriju programa Breed Watch. PDSA piše da engleski seteri vole djecu i druge ljubimce pa su savršeni za obitelji, a njegu dlake savjetuje 2–3 puta tjedno. PetMD predlaže kupanje svakih šest do osam tjedana i napominje da ne vole dugo ostajati sami. VCA spominje malo šišanja i podrezivanja dlake svaki mjesec.",
      ],
      sources: ["S730", "S731", "S732", "S733", "S734", "S10"],
    },
    dogue_de_bordeaux: {
      aka: "Bordoška doga, Dogue de Bordeaux, Francuski mastif, Bordeaux Mastiff, French Mastiff, Bordeauxdogge, DDB",
      text: [
        "Bordoška doga (dogue de Bordeaux) snažan je molos iz Francuske. Standard FCI-ja opisuje zdepasta, atletska i dojmljiva psa, mirna, uravnotežena i vrlo privrženog vlasniku, s finom, kratkom dlakom u svim nijansama žute, od mahagonija do izabele. Visina je 60–68 cm za mužjake i 58–66 cm za ženke, a težina najmanje 50 kg za mužjake i najmanje 45 kg za ženke. PetMD navodi 110–145 funti (oko 50–66 kg) za mužjake i 99–120 funti (oko 45–54 kg) za ženke. Pas te veličine odraste s otprilike 18–24 mjeseca (PetMD). Izvori se ne slažu oko životnog vijeka: PetMD piše da ti psi obično žive samo 5–8 godina, dok Royal Kennel Club navodi više od 10 godina.",
        "Royal Kennel Club preporučuje do 1 sat kretanja dnevno i njegu dlake jednom tjedno. Navodi da se pasmina linja i da joj odgovara velika kuća s velikim vrtom, a svrstava je u 3. kategoriju programa Breed Watch. PDSA piše da se bordoške doge uglavnom dobro slažu sa starijom djecom, ali ih ne preporučuje uz manju djecu ni onima koji prvi put imaju psa. Upozorava na jako slinjenje i vrlo snažan lovački nagon te savjetuje redovito čišćenje kožnih nabora na licu i razmak između jela i kretanja. PetMD navodi da im zbog kratke njuške po vrućem vremenu može biti otežano disanje.",
      ],
      sources: ["S755", "S756", "S757", "S759", "S10"],
    },
    flat_coated_retriever: {
      aka: "Flat coated retriver, Ravnodlaki retriver, Flat-Coated Retriever, Flatcoat, Flattie, Flat-coat",
      text: [
        "Flat coated retriver živahan je, aktivan ptičar iz Velike Britanije, uzgojen za donošenje odstrijeljene divljači. Standard FCI-ja opisuje gustu, priljubljenu dlaku s bogatim resama na nogama i repu, samo crne ili jetrene boje, te optimističnu, prijateljsku, samouvjerenu i dobroćudnu narav. Poželjna visina je 59–61,5 cm za mužjake i 56,5–59 cm za ženke, a poželjna težina 27–36 kg za mužjake i 25–32 kg za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD). Royal Kennel Club navodi životni vijek kraći od 10 godina, a britanska studija iz 2024. koju navodi Dogs Trust utvrdila je medijan od 11,7 godine.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno. Navodi da se pasmina linja i da joj odgovara velika kuća s velikim vrtom, a svrstava je u 1. kategoriju programa Breed Watch. PetMD flat coated retrivere naziva divnim obiteljskim psima koji se uglavnom dobro slažu s djecom i drugim ljubimcima, osobito uz pravilno upoznavanje i socijalizaciju. Savjetuje četkanje dvaput tjedno, čišćenje ušiju svaki tjedan ili svaka dva tjedna te kupanje i podrezivanje noktiju svaki mjesec ili svaka dva mjeseca, a kretanje neposredno prije i poslije jela treba izbjegavati.",
      ],
      sources: ["S761", "S762", "S763", "S123", "S10"],
    },
    border_terrier: {
      aka: "Border terijer, Border Terrier",
      text: [
        "Border terijer malen je radni terijer iz Velike Britanije. Standard FCI-ja kaže da je u biti radni terijer, sposoban pratiti konja, koji spaja živahnost s hrabrošću. Opisuje grubu, gustu dlaku s gustom podlakom, tamne oči oštra pogleda i male uši u obliku slova V. Boje dlake su crvena, pšenična, sijeda s podpalinama i plava s podpalinama. Težina je 5,9–7,1 kg za mužjake i 5,1–6,4 kg za ženke. Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD). Royal Kennel Club navodi životni vijek dulji od 12 godina, a britanska studija iz 2024. (McMillan i sur.) utvrdila je medijan od 14,2 godine.",
        "Royal Kennel Club preporučuje do 1 sat kretanja dnevno i njegu dlake više puta tjedno. Navodi da se pasmina linja i da joj odgovara stan, a svrstava je u 1. kategoriju programa Breed Watch. PDSA piše da će border terijeri uz pravilnu socijalizaciju uživati u društvu djece svih uzrasta, ali preporučuje nadzor. Upozorava da mogu razviti separacijsku anksioznost ako ostaju sami, da imaju snažan lovački nagon i da ne bi smjeli živjeti s kunićima, zamorcima ni štakorima. Savjetuje četkanje nekoliko puta tjedno i razmak između jela i kretanja. Woodgreen predlaže dom s nešto starijom djecom.",
      ],
      sources: ["S768", "S769", "S770", "S771", "S773", "S10"],
    },
    leonberger: {
      aka: "Leonberger, Leonberg",
      text: [
        "Leonberger je velik pas iz Njemačke. Standard FCI-ja opisuje velika, snažna, mišićava, a ipak elegantna psa s dugom, priljubljenom dlakom, visećim ušima i bogato obraslim repom. Boja je lavlje žuta, crvena, crvenkastosmeđa ili pješčana, uvijek s crnom maskom. Visina je 72–80 cm za mužjake i 65–75 cm za ženke. PDSA navodi prosječnu težinu od 30–50 kg za mužjake i ženke te životni vijek kraći od 10 godina. Kao div među pasminama odraste s otprilike 18–24 mjeseca (PetMD, prema razredu veličine).",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno te veliku kuću s velikim vrtom. PDSA leonbergere naziva nježnim divovima i izvrsnim obiteljskim ljubimcima. Woodgreen preporučuje četkanje dva do tri puta tjedno i kaže da su zbog veličine ključni rana dresura i socijalizacija te da teško podnose kad dugo ostaju sami. Britanska studija iz 2024. (McMillan i sur., prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 10,0 godina.",
      ],
      sources: ["S783", "S781", "S10", "S780", "S784", "S123"],
    },
    beauceron: {
      aka: "Beauceron, Berger de Beauce, Bas Rouge",
      text: [
        "Beauceron (berger de Beauce) velik je francuski ovčar. Standard FCI-ja opisuje krupna, čvrsta, izdržljiva, snažna i mišićava psa koji ne djeluje glomazno, s kratkom, gustom dlakom, repom s blagom kukom u obliku slova J i dvostrukim ostrugama na stražnjim nogama. Boja je crna s podpalinama ili harlekin. Visina je 65–70 cm za mužjake i 61–68 cm za ženke. Tablica težina AKC-a navodi 70–110 funti (oko 32–50 kg) za mužjake i ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD, prema razredu veličine). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD 10–12 godina.",
        "Royal Kennel Club beauceronu pripisuje mirnoću i samouvjerenost te ga opisuje kao odanog pratitelja i čuvara. Preporučuje više od 2 sata kretanja dnevno, njegu dlake više puta tjedno i veliku kuću s velikim vrtom, a svrstava ga u 1. kategoriju programa Breed Watch. PetMD piše da mogu biti dobri s malom djecom i drugim psima ako se upoznavanja odvijaju pod nadzorom te da znaju biti oprezni prema novim ljudima, pa štenad treba rano upoznati s njima. Navodi i da vole što više vremena provoditi s obitelji. Preporučuje četkanje barem jednom tjedno te izbjegavanje kretanja sat vremena prije i poslije jela.",
      ],
      sources: ["S790", "S268", "S10", "S787", "S791"],
    },
    bouvier_des_flandres: {
      aka: "Flandrijski govedarski pas, Bouvier des Flandres, Flandrijski govedar, Bouvier, Flanders Cattle Dog, Vlaamse Koehond",
      text: [
        "Flandrijski govedarski pas (bouvier des Flandres) potječe iz Flandrije, u Belgiji i Francuskoj. Standard FCI-ja opisuje kratka, zbijena, snažna psa s jakim, dobro razvijenim mišićima nogu, grubom, suhom, lagano razbarušenom dlakom dugom oko 6 cm, s brkovima i punom bradom. Boje su uglavnom siva, tigrasta ili crnom prošarana (dopuštena je i jednobojna crna). Za mužjake navodi visinu od 62–68 cm i težinu od oko 35–40 kg, a za ženke 59–65 cm i oko 27–35 kg. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD, prema razredu veličine). Britanska studija iz 2024. (McMillan i sur., prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 11,3 godine.",
        "Royal Kennel Club flandrijskog govedarskog psa naziva snažnim i svestranim psom, izvorno pastirskim psom za goveda. Preporučuje do 1 sat kretanja dnevno, svakodnevnu njegu dlake i veliku kuću s velikim vrtom, a svrstava ga u 1. kategoriju programa Breed Watch. PetMD piše da mogu biti dobri s malom djecom i drugim velikim psima ako se upoznavanja odvijaju pod nadzorom, da imaju jak lovački nagon prema mačkama i malim ljubimcima, da trebaju ranu socijalizaciju i da su skloni debljanju. Savjetuje četkanje barem jednom do dvaput tjedno, čišćenje ušiju svaka dva do tri tjedna, podrezivanje noktiju svaka tri do četiri tjedna i izbjegavanje kretanja sat vremena prije i poslije jela.",
      ],
      sources: ["S797", "S10", "S123", "S795", "S798"],
    },
    borzoi: {
      aka: "Ruski hrt, Borzoj, Borzoi, Russian Wolfhound, Russian Hunting Sighthound, Russkaya Psovaya Borzaya",
      text: [
        "Ruski hrt (borzoj) dugodlaki je hrt iz Rusije, uzgojen za lov na zeca i lisicu. Standard FCI-ja opisuje psa aristokratskog izgleda, visokog, mršavog i snažnog, prilično dugih nogu, s dugom, svilenkastom, valovitom dlakom. Dopuštena je svaka boja od bijele do crne, osim smeđe, plave i izabele. Poželjna visina je 75–85 cm za mužjake i 68–78 cm za ženke. PDSA navodi prosječnu težinu od 27–47 kg za mužjake i ženke te životni vijek dulji od 10 godina, a PetMD 9–14 godina. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD, prema razredu veličine).",
        "PDSA preporučuje najmanje 1 sat kretanja dnevno, podijeljen na nekoliko šetnji, a bez uzice samo na sigurnom, ograđenom prostoru. Piše da borzoji imaju vrlo jak lovački nagon pa se ne preporučuju uz manje ljubimce ni uz mlađu djecu, da odgovaraju iskusnim vlasnicima i da trebaju nekoga kod kuće veći dio vremena. Dodaje da ih treba socijalizirati od malih nogu, četkati nekoliko puta tjedno i ostaviti razmak između jela i kretanja. PetMD preporučuje četkanje najmanje dva do tri puta tjedno, a nadutost želuca navodi kao najčešći zdravstveni problem.",
      ],
      sources: ["S802", "S800", "S803", "S10"],
    },
    japanese_chin: {
      aka: "Japanski čin, Japanski španijel, Japanese Chin, Japanese Spaniel, Japan Chin, Chin",
      text: [
        "Japanski čin malen je pas za društvo iz Japana. Standard Royal Kennel Cluba opisuje otmjena, aristokratska, zbijena malog psa s bogatom, dugom, svilenkastom dlakom, crno-bijelom ili crveno-bijelom (nikad trobojnom), kratkom, širokom njuškom i izrazom iznenađenja. Idealna težina je 1,8–3,2 kg, a PetMD navodi visinu od 8–11 inča (oko 20–28 cm). Pas te veličine odraste s otprilike 8–12 mjeseci (PetMD, prema razredu veličine). Britanska studija iz 2024. (McMillan i sur., prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 12,5 godine.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake više puta tjedno. Navodi da se pasmina linja i da joj odgovara stan, a svrstava je u 1. kategoriju programa Breed Watch. PetMD piše da je japanski čin pasmina plosnatog (brahicefalnog) lica koja može imati teškoća s disanjem i lako se pregrijava, pa kretanje po vrućem ili vlažnom vremenu treba ostaviti za hladnije doba dana. Navodi i da se uglavnom dobro slaže s djecom kad se druženje odvija pod nadzorom, da može razviti separacijsku anksioznost i da ga treba rano uključiti u škole za štence. Preporučuje četkanje jednom do dvaput tjedno, čišćenje ušiju svaka dva do tri tjedna i kupanje otprilike jednom mjesečno.",
      ],
      sources: ["S806", "S10", "S123", "S805", "S809"],
    },
    norwich_terrier: {
      aka: "Norwich terijer, Norwich Terrier, Norwich",
      text: [
        "Norwich terijer potječe iz Velike Britanije i jedan je od najmanjih terijera. Standard FCI-ja opisuje niska, živahna, zbijena i snažna malog psa s tvrdom, oštrom, ravnom dlakom koja oko lica tvori ovratnik i uspravnim ušima šiljastih vrhova. Dlaka može biti u svim nijansama crvene, pšenična, crna s podpalinama ili sijeda. Idealna visina je 25 cm. Standard UKC-a navodi idealnu težinu od otprilike 12 funti (oko 5,4 kg) za mužjake i ženke. Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD, prema razredu veličine). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD 12–15 godina.",
        "Royal Kennel Club norwich terijera opisuje kao jednog od najmanjih terijera, ljupke naravi. Preporučuje do 1 sat kretanja dnevno i njegu dlake više puta tjedno, navodi da se pasmina linja i da joj odgovara stan, a vodi je kao ranjivu domaću britansku pasminu (vulnerable native breed). PetMD piše da se norwich terijeri obično dobro slažu s djecom i drugim ljubimcima, da su vrlo energični i trebaju svakodnevno kretanje i misaone poticaje te da ih treba socijalizirati od malih nogu. Zbog snažnih lovačkih instinkata nužni su sigurna uzica i dobro ograđeno dvorište. Preporučuje četkanje najmanje dvaput tjedno, pranje zubi najmanje jednom tjedno, podrezivanje noktiju otprilike jednom mjesečno i kupanje najviše jednom u tri mjeseca.",
      ],
      sources: ["S812", "S815", "S10", "S813", "S814"],
    },
    miniature_bull_terrier: {
      aka: "Minijaturni bulterijer, Miniature Bull Terrier, Mini Bull Terrier, Mini Bull, Bull Terrier (Miniature)",
      text: [
        "Minijaturni bulterijer malen je terijer iz Velike Britanije. FCI ga svrstava među terijere bul tipa. Royal Kennel Club navodi da je kao zasebna varijanta prvi put priznat 1943., a uzgojen je od manjih bulterijera tako da ostane ispod 35,5 cm (14 inča). PetMD navodi visinu od 10–14 inča (oko 25–36 cm) i težinu od 18–28 funti (oko 8–13 kg). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD, prema razredu veličine). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD 11–13 godina.",
        "Royal Kennel Club opisuje pasminu kao hrabru, punu duha i veselog raspoloženja. Preporučuje do 1 sat kretanja dnevno i njegu dlake jednom tjedno, navodi da se pasmina linja, a vodi je kao ranjivu domaću britansku pasminu (vulnerable native breed). PetMD piše da su minijaturni bulterijeri uglavnom privrženi i dobri s djecom te prijateljski obiteljski pratitelji, da se uz pravilnu socijalizaciju mogu slagati s drugim ljubimcima, da trebaju redovito kretanje i misaone poticaje te da im ne odgovara dugo ostajati sami. Preporučuje ranu socijalizaciju i četkanje otprilike jednom tjedno.",
      ],
      sources: ["S818", "S820", "S821", "S10"],
    },
    schipperke: {
      aka: "Šiperke, Schipperke, Little Captain, Little Black Devil, Spitzke",
      text: [
        "Šiperke je mali ovčar iz Belgije; FCI ga svrstava među ovčare. Njegov standard opisuje psa nalik vuku, malih dimenzija, ali vrlo čvrste građe, potpuno crnog, s ovratnikom, grivom i „hlačicama“ na stražnjim nogama. Standard FCI-ja navodi težinu od 3–9 kg (poželjan je prosjek od 4–7 kg), a PetMD visinu od 10–13 inča (oko 25–33 cm). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD, prema razredu veličine). Velika britanska studija (McMillan i sur. 2024.) utvrdila je medijan očekivanog životnog vijeka od 14,2 godine, a Royal Kennel Club navodi više od 12 godina.",
        "Standard FCI-ja opisuje šiperkea kao izvrsnog malog čuvara, prepunog životne snage, suzdržanog prema strancima i vrlo nježnog prema djeci. Royal Kennel Club preporučuje do 1 sat kretanja dnevno i njegu dlake više puta tjedno, navodi da se pasmina linja i da joj odgovara stan, a svrstava je u 1. kategoriju programa Breed Watch. PetMD piše da pasmini trebaju aktivnosti koje zaokupljaju i um i tijelo. Inteligentna je, ali tvrdoglava, a neki primjerci zadržavaju snažan lovački nagon. PetMD preporučuje ranu socijalizaciju, svakodnevno pranje zubi i čišćenje ušiju svaka dva tjedna, a VCA četkanje najmanje dvaput tjedno.",
      ],
      sources: ["S824", "S825", "S826", "S827", "S828", "S771", "S10"],
    },
    belgian_tervuren: {
      aka: "Belgijski ovčar tervueren, Tervueren, Tervuren, Terv, Belgian Shepherd Dog (Tervueren)",
      text: [
        "Belgijski ovčar tervueren dugodlaka je, žutosmeđa varijanta belgijskog ovčara, pastirskog psa iz Belgije. FCI priznaje jednu pasminu belgijskog ovčara s četiri varijante. Standard FCI-ja opisuje skladno građena psa koji spaja eleganciju i snagu, s dugom dlakom koja tvori ovratnik, „hlače“ i resast rep. Za tervueren dopušta samo žutosmeđu ili sivu boju s crnim pokrovom i crnu masku (žutosmeđa je poželjnija). Visina je oko 62 cm za mužjake i 58 cm za ženke, a težina oko 25–30 kg za mužjake i 20–25 kg za ženke. Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD, prema razredu veličine). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD 12–14 godina.",
        "Standard FCI-ja opisuje belgijskog ovčara kao budna i aktivna psa, prepuna energije, bez straha i agresivnosti. Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno, navodi da se pasmina linja i da joj odgovara velika kuća s velikim vrtom, a svrstava je u 1. kategoriju programa Breed Watch. PetMD piše da tervuereni stvaraju bliske veze s obitelji, trebaju puno tjelesne aktivnosti i misaonih poticaja te mogu pokušavati „stjerivati“ djecu i manje životinje. Preporučuje ranu socijalizaciju, tjedno četkanje (gotovo svakodnevno u razdoblju linjanja), čišćenje ušiju svaki tjedan ili svaka dva tjedna i kupanje svakih četiri do šest tjedana.",
      ],
      sources: ["S312", "S313", "S830", "S832", "S10"],
    },
    toy_fox_terrier: {
      aka: "Toy foksterijer, Toy Fox Terrier, American Toy Terrier, Amertoy, TFT",
      text: [
        "Toy foksterijer malen je američki terijer iz skupine toy pasmina AKC-a. Standard AKC-a opisuje skladna toy psa atletskog izgleda, s kratkom, satenskom dlakom, uspravnim šiljastim ušima i pretežno bijelim tijelom, a glava je trobojna, bijelo-žutosmeđa, bijelo-crna ili bijelo-čokoladno-žutosmeđa. PetMD navodi težinu od 4–9 funti (oko 1,8–4 kg) i visinu od 8,5–11,5 inča (oko 21–29 cm). Pas te veličine odraste s otprilike 8–12 mjeseci (PetMD). PetMD i WebMD navode životni vijek od 13–15 godina.",
        "Standard AKC-a toy foksterijera naziva inteligentnim, budnim, prijateljskim i odanim vlasnicima. PetMD preporučuje najmanje sat vremena kretanja svaki dan, četkanje jednom do dvaput tjedno te ranu dresuru i socijalizaciju, a navodi i da pasmina i dalje ima snažan lovački nagon. WebMD piše da su toy foksterijeri sjajni pratitelji za obzirnu stariju djecu, ali se ne preporučuju obiteljima s malom djecom te da mogu pokazivati separacijsku anksioznost kad dugo ostaju sami. Preporučuje svakodnevno pranje zubi, tjedno čišćenje ušiju i mjesečno podrezivanje noktiju.",
      ],
      sources: ["S833", "S834", "S835", "S10"],
    },
    gordon_setter: {
      aka: "Gordon seter, Škotski seter, Gordon Setter, Black and Tan Setter, Scottish Setter, Gordon",
      text: [
        "Gordon seter velik je crno-podpalni ptičar iz Škotske (FCI skupina 7, ptičari; zemlja podrijetla Velika Britanija). Standard FCI-ja opisuje otmjena psa s „galopirajućim“ linijama, s dubokom, sjajnom ugljenocrnom dlakom i kestenjastocrvenim podpalinama. Visina je 66 cm, a težina 29,5 kg za mužjake, odnosno 62 cm i 25,5 kg za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 10 godina.",
        "Standard FCI-ja gordon setera naziva smjelim, otvorenim, dobroćudnim i ujednačenog temperamenta, a PDSA opisuje prijateljsku, inteligentnu pasminu koja voli biti zaposlena. Royal Kennel Club preporučuje više od dva sata kretanja dnevno te veliku kuću s vrtom, a PDSA kaže da gustu dlaku treba njegovati svaki dan. PetMD savjetuje ograničiti kretanje sat vremena prije i poslije obroka i štenad rano socijalizirati. Zbog snažnog lovačkog nagona pasmine posebnu pozornost treba posvetiti dresuri dozivanja. WebMD preporučuje svakodnevno pranje zubi i kupanje otprilike jednom mjesečno te navodi da je pasmina samo umjereno dobra s malom djecom.",
      ],
      sources: ["S841", "S842", "S843", "S844", "S845", "S10"],
    },
    afghan_hound: {
      aka: "Afganistanski hrt, Afganski hrt, Afghan Hound, Afghan, Tazi, Baluchi Hound",
      text: [
        "Afganistanski hrt visok je dugodlaki hrt iz Afganistana (FCI skupina 10, hrtovi; zemlja podrijetla Afganistan, pod britanskim pokroviteljstvom). Standard FCI-ja opisuje psa koji ostavlja dojam snage i dostojanstva, spaja brzinu i snagu te ima dugu, vrlo finu dlaku. Dopuštene su sve boje osim merle. Idealna visina je 68–74 cm za mužjake i 63–69 cm za ženke, a standard AKC-a navodi težinu od oko 60 funti (27 kg) za mužjake i oko 50 funti (23 kg) za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 10 godina.",
        "Standard FCI-ja opisuje afganistanskog hrta kao dostojanstvena i suzdržana psa, s određenom prodornom žestinom. Royal Kennel Club preporučuje više od dva sata kretanja dnevno, svakodnevnu njegu dlake i veliku kuću s vrtom. PDSA piše da dugu, svilenkastu dlaku treba četkati svaki dan, da su afganistanski hrtovi, ako su dobro socijalizirani, dobri s djecom te da zbog snažnog nagona za potjerom treba biti oprezan s drugim ljubimcima. PetMD savjetuje da nakon obroka treba pričekati najmanje sat vremena prije kretanja te da ga treba kupati najmanje jednom u tjedan ili dva, a WebMD preporučuje svakodnevno pranje zubi.",
      ],
      sources: ["S849", "S850", "S851", "S852", "S853", "S854", "S10"],
    },
    australian_silky_terrier: {
      aka: "Australski svilenasti terijer, Svilenasti terijer, Australian Silky Terrier, Silky Terrier, Silky",
      text: [
        "Australski svilenasti terijer malen je, vrlo budan toy terijer iz Australije (FCI skupina 3, terijeri; sekcija toy terijera), u Sjevernoj Americi poznat kao silky terrier. Standard FCI-ja traži ravnu, finu, sjajnu dlaku svilenaste strukture u plavoj boji s podpalinama. Dopuštene su sve nijanse plave s podpalinama, a srebrna i bijela nisu. Visina je 23–26 cm za mužjake, a ženke su nešto manje. Standardi ne navode težinu („razmjerna visini“); PetMD i WebMD navode oko 10 funti (oko 4,5 kg). Pas te veličine odraste s otprilike 8–12 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 12 godina (PetMD i WebMD: 13–15 godina).",
        "Standard FCI-ja opisuje hrabra i dostojanstvena toy terijera kojem nema premca kao pratitelju. Royal Kennel Club preporučuje do 30 minuta kretanja dnevno, svakodnevnu njegu dlake i navodi da pasmini odgovara stan. PetMD piše da su svilenasti terijeri dobri s drugim ljubimcima i djecom ako se kao mladi pravilno socijaliziraju. Preporučuje škole za štence prije navršenih 16 tjedana, čišćenje ušiju svaka dva do tri tjedna te držanje na uzici ili u ograđenom prostoru zbog lovačkog nagona. WebMD preporučuje svakodnevno pranje zubi i kupanje otprilike jednom mjesečno.",
      ],
      sources: ["S855", "S856", "S857", "S858", "S10"],
    },
    parson_russell_terrier: {
      aka: "Parson Russell terijer, Parson Russell Terrier, Parson Jack Russell Terrier, Parson Terrier, PRT",
      text: [
        "Parson russell terijer čvrst je, aktivan i okretan radni terijer iz Velike Britanije, izvorno uzgojen za rad na lisici (FCI skupina 3, terijeri; sekcija velikih i srednje velikih terijera). Riječ je o pasmini različitoj od jack russell terijera: Kennel Club ju je prvi put priznao 1990. kao Parson Jack Russell Terrier. Standard FCI-ja traži bijelog ili pretežno bijelog psa sa žutosmeđim, limun-bijelim ili crnim oznakama ili njihovom kombinacijom. Dlaka je gruba, prijelazna ili glatka, a idealna visina 36 cm za mužjake i 33 cm za ženke. PDSA navodi prosječnu težinu od 6–8 kg. Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 12 godina (WebMD: 13–15 godina).",
        "Standard FCI-ja pasminu naziva smjelom i prijateljskom. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno. PDSA piše da su ti psi puni energije, da im idealno treba 1–2 sata kretanja dnevno, da se dobro slažu s djecom, da su izvrsni obiteljski ljubimci i da ih treba rano socijalizirati s ostalim ljubimcima u obitelji. PetMD navodi da neki imaju snažan lovački nagon te preporučuje svakodnevno pranje zubi, čišćenje ušiju svaka dva tjedna i kupanje svaka dva do četiri tjedna. WebMD dodaje da ne vole biti sami i da mogu imati separacijsku anksioznost.",
      ],
      sources: ["S864", "S865", "S866", "S867", "S868", "S10"],
    },
    wire_fox_terrier: {
      aka: "Oštrodlaki foksterijer, Foksterijer oštrodlaki, Wire Fox Terrier, Fox Terrier (Wire), Wire Hair Fox Terrier, Wirehaired Fox Terrier",
      text: [
        "Oštrodlaki foksterijer aktivan je i živahan terijer iz Velike Britanije (FCI skupina 3, terijeri; sekcija velikih i srednje velikih terijera). Ne treba ga miješati s toy foksterijerom. Standard FCI-ja traži snažnu kost i čvrstoću u malom okviru, nikad nezgrapnu ni grubu. Dlaka je gusta, vrlo oštra, s mekšom podlakom, pretežno bijela s oznakama crne, crne s podpalinama ili žutosmeđe boje. Visina u grebenu je do 39 cm za mužjake, a nešto manja za ženke. Standard AKC-a navodi da mužjak u izložbenoj kondiciji teži 18 funti, a ženka oko dvije funte manje, uz odstupanje od jedne funte u oba smjera (oko 7,7–8,6 kg za mužjake i 6,8–7,7 kg za ženke). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 12 godina (PetMD: 12–15 godina).",
        "Standard FCI-ja pasminu naziva prijateljskom, otvorenom i neustrašivom. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake više puta tjedno. PDSA piše da foksterijeri vole igru i istraživanje, da su izvrsni obiteljski ljubimci i da dlaku treba njegovati jednom do dvaput tjedno. WebMD ih naziva sjajnim pratiteljima za djecu, ali savjetuje da uz malu djecu uvijek budu pod nadzorom. PetMD navodi da ih zbog snažnog lovačkog nagona treba pomno pratiti uz male ljubimce. Preporučuje dobru socijalizaciju štenceta, svakodnevno pranje zubi, kupanje otprilike jednom mjesečno i ručno trimanje dlake tri do četiri puta godišnje, a WebMD podrezivanje noktiju otprilike jednom mjesečno.",
      ],
      sources: ["S871", "S872", "S873", "S874", "S875", "S876", "S10"],
    },
    manchester_terrier: {
      aka: "Manchester terijer, Manchester Terrier (Standard), Black and Tan Terrier, Manchester",
      text: [
        "Manchester terijer zbijen je, elegantan terijer iz Velike Britanije (FCI skupina 3, terijeri; sekcija velikih i srednje velikih terijera) – riječ je o standardnoj, a ne toy veličini. Standard FCI-ja traži zbijena, elegantna i zdrava psa čvrste građe, s kratkom, glatkom, priljubljenom i sjajnom dlakom, isključivo ugljenocrne boje s bogatim podpalinama boje mahagonija. Idealna visina u grebenu je 41 cm za mužjake i 38 cm za ženke. Standard Canadian Kennel Cluba navodi težinu od 5,5 do 10 kg (12 do 22 funte). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 12 godina (WebMD: 15 do 17 godina).",
        "Standard FCI-ja pasminu opisuje kao oštroumnu, budnu, veselu, sportski nastrojenu, razboritu i odanu. PDSA preporučuje do sat vremena kretanja dnevno i kaže da je četkanje jednom tjedno obično dovoljno. PetMD piše da se manchester terijeri dobro slažu s djecom, osobito ako se s njima upoznaju kao štenad, i preporučuje socijalizaciju od dana kad štene dođe kući. Navodi i snažan lovački nagon koji potječe iz njihove prošlosti lovaca na štakore, pa možda nisu prikladni za domove s hrčcima ili gerbilima. WebMD savjetuje da malu djecu nikad ne treba ostavljati sa psom bez nadzora, preporučuje svakodnevno pranje zubi i navodi da je pasmina osjetljiva na hladnoću pa joj može zatrebati kaput ili džemper.",
      ],
      sources: ["S888", "S889", "S890", "S891", "S892", "S10"],
    },
    tibetan_terrier: {
      aka: "Tibetanski terijer, Tibetan Terrier, Tibet Terrier",
      text: [
        "Tibetanski terijer snažan je, srednje velik dugodlaki pas za društvo iz Tibeta (FCI skupina 9, pratilački i društveni psi; sekcija tibetskih pasmina) – terijer samo po imenu. Standard FCI-ja traži općenito kvadratan oblik tijela, dvostruku dlaku s bogatom, finom, dugom, ravnom ili valovitom pokrovnom dlakom, viseće uši s resama i rep koji se nosi uvijen preko leđa. Dopuštena je svaka boja osim čokoladne, jetrene i merle. Mužjaci u grebenu mjere 36–41 cm, a ženke su nešto manje. Standard Canadian Kennel Cluba navodi težinu od 8,25 do 13,5 kg (18 do 30 funti). Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 12 godina (PetMD: 15–16 godina).",
        "Standard FCI-ja pasminu opisuje kao živahnu i dobroćudnu, otvorenu, budnu i inteligentnu, ali suzdržanu u iskazivanju naklonosti prema strancima. PDSA tibetanske terijere naziva nježnim, prijateljskim i privrženim psima, dobrim obiteljskim ljubimcima, preporučuje oko sat vremena kretanja dnevno i kaže da je njega dlake potrebna svaki dan. PetMD navodi da mogu razviti separacijsku anksioznost ako dugo ostaju sami i preporučuje škole za štence prije navršenih 16 tjedana. Piše i da mogu biti dobri s malom djecom i drugim psima kad se upoznavanja odvijaju pod nadzorom, dok WebMD navodi da se neki primjerci teško snalaze s malom djecom i drugim psima. WebMD preporučuje svakodnevno pranje zubi.",
      ],
      sources: ["S904", "S905", "S906", "S907", "S909", "S10"],
    },
    greyhound: {
      aka: "Greyhound, Engleski hrt, English Greyhound",
      text: [
        "Greyhound je velik hrt iz Velike Britanije; FCI ga svrstava u skupinu 10, među kratkodlake hrtove. Standard FCI-ja opisuje snažno građena, uspravna psa velikodušnih proporcija, mišićave snage i simetrične građe, inteligentna, nježna, privržena i ujednačene naravi. Dlaka je fina i priljubljena, u crnoj, bijeloj, crvenoj, plavoj, žutosmeđoj, svijetlosmeđoj ili tigrastoj boji, ili u bilo kojoj od tih boja prekinutih bijelom. Idealna visina je 71–76 cm za mužjake i 68–71 cm za ženke. Standard AKC-a navodi težinu od 65 do 70 funti (oko 29,5–31,8 kg) za mužjake i 60 do 65 funti (oko 27,2–29,5 kg) za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD). Britanska studija VetCompass o greyhoundima pod veterinarskom skrbi utvrdila je medijan životnog vijeka od 11,4 godine; PDSA navodi životni vijek dulji od 10 godina.",
        "PDSA piše da greyhoundi nisu pretjerano energični: trebaju oko sat vremena kretanja dnevno i više vole nekoliko dobrih trčanja nego kilometre hodanja, a njihovu kratku dlaku treba njegovati jednom tjedno. Uz pravilnu socijalizaciju u štenećoj dobi mogu biti dobri obiteljski ljubimci, ali imaju snažan nagon za potjerom. PetMD piše da zbog vrlo jakog lovačkog nagona slabo odgovaraju domovima s mačkama ili drugim malim životinjama. WebMD preporučuje svakodnevno pranje zubi i navodi da su greyhoundi bez izolacijske podlake mogu biti osjetljivi na ekstremne temperature.",
      ],
      sources: ["S912", "S913", "S914", "S916", "S917", "S918", "S920", "S10"],
    },
    xoloitzcuintli: {
      aka: "Xoloitzcuintle, Xoloitzcuintli, Xolo, Meksički goli pas, Mexican Hairless Dog",
      text: [
        "Xoloitzcuintle je drevan primitivni pas iz Meksika; FCI ga svrstava u skupinu 5, među špiceve i pse primitivnog tipa. Standard FCI-ja opisuje tihog i mirnog psa, veselog, budnog i inteligentnog, nikad agresivnog. Postoje dvije varijante, jednake osim po dlaci i zubima: gola, s glatkom golom kožom, i dlakava, s kratkom, priljubljenom dlakom. Dolazi u tri veličine – 25–35 cm, 35–45 cm i 46–60 cm u grebenu – te u crnoj, crnkastosivoj, škriljastosivoj, tamnosivoj, crvenkastoj, jetrenoj, brončanoj ili blond boji, a poželjna je jednolično tamna koža. WebMD navodi težinu od 10 do 15 funti za toy, 15 do 30 za patuljastog i 30 do 55 funti za standardnog xola (oko 4,5–24,9 kg za sve veličine). Pas standardne veličine odraste s otprilike 12–15 mjeseci (PetMD). PetMD i WebMD navode životni vijek od 13–18 godina.",
        "PetMD piše da xolima treba oko 20 minuta kretanja svaki dan. Gola koža traži njegu. PetMD savjetuje kremu za sunčanje za pse prije izlaska, nikad onu za ljude, a VCA navodi da im najviše odgovara topla klima i da im pri hladnijim temperaturama treba džemper. WebMD xola naziva dobrim psom za obitelji s djecom i preporučuje pranje zubi dva do tri puta tjedno. PetMD dodaje da druženje s djecom uvijek treba biti pod nadzorom, da štenad treba socijalizirati kako ne bi odrasla sumnjičava prema novim ljudima te da pasmina ima snažan lovački nagon prema malim životinjama.",
      ],
      sources: ["S923", "S924", "S926", "S927", "S928", "S10"],
    },
    spinone_italiano: {
      aka: "Talijanski oštrodlaki ptičar, Talijanski špinone, Spinone Italiano, Italian Spinone, Spinone, Italian Griffon, Italian Wire-haired Pointer",
      text: [
        "Talijanski oštrodlaki ptičar (spinone italiano) potječe iz Italije; FCI ga svrstava u skupinu 7, među kontinentalne ptičare grifonskog tipa. Standard FCI-ja opisuje psa čvrste građe, robusna i snažna, s jakom kosti i grubom dlakom, po naravi društvena, poslušna i strpljiva te iskusna lovca na svakom terenu. Dolazi u čisto bijeloj, bijeloj s narančastim oznakama, narančastoj šarenoj, bijeloj sa smeđim oznakama i smeđoj šarenoj boji. Standard FCI-ja navodi visinu od 60–70 cm za mužjake i 58–65 cm za ženke te težinu od 32–37 kg za mužjake i 28–30 kg za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD). PDSA navodi životni vijek dulji od 10 godina, a PetMD 10–12 godina.",
        "PDSA spinonea naziva energičnom pasminom kojoj idealno treba više od 2 sata kretanja dnevno i piše da gustu, djelomično oštru dlaku treba njegovati kod kuće 2 ili 3 puta tjedno. WebMD preporučuje podrezivanje noktiju svaki tjedan i svakodnevno pranje zubi, navodi da se pasmina uglavnom dobro slaže s drugim psima i djecom te upozorava da dugo ostajanje samog često dovodi do problema. PetMD savjetuje ranu socijalizaciju štenadi te držanje psa na uzici ili u ograđenom prostoru kad je vani. Savjetuje i da se pas ne kreće sat vremena prije i poslije jela zbog opasnosti od nadutosti želuca.",
      ],
      sources: ["S935", "S936", "S937", "S938", "S10"],
    },
    pointer: {
      aka: "Pointer, Engleski pointer, Engleski ptičar, English Pointer",
      text: [
        "Pointer je britanski ptičar; FCI ga svrstava u skupinu 7, među britanske i irske ptičare i setere. Standard FCI-ja opisuje skladno građena psa elegantnih, zaobljenih obrisa, snažna, ali gipka, budna, dobroćudne i ujednačene naravi, s finom, kratkom, tvrdom i izrazito sjajnom dlakom. Uobičajene boje su limun-bijela, narančasto-bijela, jetreno-bijela i crno-bijela. Standard FCI-ja navodi visinu od 63–69 cm za mužjake i 61–66 cm za ženke, a standard UKC-a radnu težinu od 55–75 funti (oko 25–34 kg) za mužjake i 44–65 funti (oko 20–29,5 kg) za ženke. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD). PDSA navodi životni vijek dulji od 12 godina, a PetMD 10–12 godina.",
        "PDSA piše da su pointeri vrlo energični i da im idealno treba više od 2 sata kretanja dnevno, da trebaju aktivne vlasnike i dobru dresuru dozivanja te da njihovu kratku dlaku treba njegovati samo jednom tjedno. PetMD savjetuje držanje u ograđenom dvorištu kako ne bi odlutali i navodi da bi mogli ugroziti kućne ptice. WebMD preporučuje svakodnevno pranje zubi i kaže da nisu osobito dobri s malom djecom. PDSA dodaje da, kao i kod svih pasmina, pravilna socijalizacija u štenećoj dobi pomaže da se dobro uklope u obiteljski život.",
      ],
      sources: ["S943", "S944", "S945", "S946", "S947", "S10"],
    },
    welsh_terrier: {
      aka: "Velški terijer, Welsh Terrier, Welshie, Welsh",
      text: [
        "Velški terijer potječe iz Velike Britanije; FCI ga svrstava u skupinu 3, među velike i srednje velike terijere. Standard FCI-ja opisuje otmjena, radna, dobro uravnotežena i zbijena psa s oštrom, tvrdom, vrlo gustom i obilnom dlakom, privrženog, poslušnog i lako vodljivog, veselog i rijetko plašljivog. Boja je crna s podpalinama ili crno sijeda s podpalinama. Standard FCI-ja navodi visinu do 39 cm i težinu od 9–9,5 kg (20–21 funta). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD). Royal Kennel Club i PDSA navode životni vijek dulji od 12 godina, a PetMD 12–15 godina.",
        "Royal Kennel Club navodi da velškom terijeru treba do 1 sat kretanja dnevno i njega dlake više puta tjedno. PDSA navodi oko sat vremena kretanja dnevno i njegu dlake dva do tri puta tjedno te ga opisuje kao razigranog, prijateljskog psa koji voli djecu i izvrstan je obiteljski ljubimac. PetMD navodi snažan lovački nagon, zbog kojeg bi mogao progoniti manje životinje, te savjetuje uzicu ili ograđeni prostor vani, uz socijalizaciju i dresuru od najranije dobi.",
      ],
      sources: ["S955", "S956", "S957", "S958", "S10"],
    },
    american_hairless_terrier: {
      aka: "Američki bezdlaki terijer, American Hairless Terrier, Hairless Terrier, AHT",
      text: [
        "Američki bezdlaki terijer malen je do srednje velik, glatko mišićav i aktivan terijer iz SAD-a, kojeg je American Kennel Club priznao u skupini terijera; FCI ga ne vodi. Standard pasmine opisuje energična, budna, znatiželjna i inteligentna psa s ušima u obliku slova V i prirodnim repom koji se nikad ne kupira. Postoje dvije varijante: bezdlaka, bez dlake osim brkova te dlačica na obrvama i njušci, i dlakava, s kratkom, glatkom dlakom. Standard navodi idealnu visinu od 12–16 inča (30–41 cm). PetMD navodi težinu od 12–28 funti (5,4–12,7 kg) i životni vijek od 14–16 godina, a pas te veličine odraste s otprilike 9–12 mjeseci (PetMD).",
        "Dogs NSW navodi oko 20 minuta kretanja dnevno, a PetMD piše da su redovito kretanje i misaoni poticaji za ovu pasminu nužni. Naziva ih sjajnim drugovima u igri za djecu, uz nadzor kad je u blizini mala djeca. Gola koža traži njegu. Klub pasmine kaže da su krema za sunčanje ili zaštitna odjeća nužni za sprječavanje opeklina. PetMD savjetuje džemper po hladnom vremenu i redovito kupanje, po mogućnosti svaki tjedan, WebMD svakodnevno pranje zubi, a klub pasmine tjedno podrezivanje noktiju. Klub pasmine navodi i snažan lovački nagon.",
      ],
      sources: ["S967", "S971", "S972", "S973", "S977", "S10"],
    },
    tibetan_spaniel: {
      aka: "Tibetanski španijel, Tibetan Spaniel, Tibbie",
      text: [
        "Tibetanski španijel malen je, aktivan i budan pas za društvo iz Tibeta (Kina). FCI ga svrstava u skupinu pratilačkih i društvenih pasa, među tibetske pasmine, a zemlja pokroviteljica pasmine je Velika Britanija. Standard FCI-ja opisuje ga kao veselog i samouvjerenog, vrlo inteligentnog i suzdržanog prema strancima, budnog, odanog, ali neovisnog. Tijelo mu je nešto dulje nego što je visoko, dlaka svilenasta i srednje duljine, uši s resama, a rep bogato resast i nošen uvijen preko leđa. Dopuštene su sve boje osim merle. Standard navodi visinu od oko 25,4 cm i idealnu težinu od 4,1–6,8 kg. Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD). U velikoj britanskoj studiji (McMillan i sur., 2024.) pasmina je bila među najdugovječnijima, s medijanom od 15,2 godine; PDSA navodi životni vijek dulji od 12 godina.",
        "PDSA piše da tibetanskim španijelima treba oko sat vremena kretanja svaki dan, da će se rado uključiti u obiteljske igre, da se uglavnom dobro slažu sa svima i da su dobri obiteljski ljubimci. Njega dlake nekoliko puta tjedno obično je dovoljna. WebMD navodi da su skloni separacijskoj anksioznosti i da više odgovaraju obiteljima sa starijom djecom. Trebaju sigurno ograđeno dvorište, a po vrućem se vremenu mogu pregrijati. WebMD savjetuje svakodnevno pranje zubi, provjeru ušiju najmanje jednom tjedno, provjeru noktiju svaki mjesec i kupanje otprilike svaki mjesec.",
      ],
      sources: ["S980", "S981", "S982", "S771", "S10"],
    },
    black_russian_terrier: {
      aka: "Ruski crni terijer, Crni ruski terijer, Black Russian Terrier, Russian Black Terrier, Russian Terrier, Tchiorny Terrier, BRT",
      text: [
        "Ruski crni terijer velik je, robustan i vrlo atletski radni pas iz Rusije, iz FCI-jeve skupine pinčera i šnaucera. Standard FCI-ja opisuje ga kao dostojanstvenog, samouvjerenog i dobro kontroliranog, ljubaznog, nezahtjevnog, pametnog i prijateljskog, s grubom, gustom dvostrukom dlakom koja tvori bujne obrve, brkove i bradu. Jedine boje su crna i crna s djelomično primiješanim sijedim dlakama. Standard navodi 72–76 cm i 50–60 kg za mužjake te 68–72 cm i 45–50 kg za ženke. Pas te veličine obično dosegne odraslu težinu s 18–24 mjeseca. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
        "Royal Kennel Club navodi više od 2 sata kretanja i njege dlake svaki dan, veliku kuću s vrtom te da se pasmina ne linja. PetMD piše da je pasmina odana obitelji i da može biti dobra s djecom uz nadzor, da je važna rana i dosljedna socijalizacija te da treba izbjegavati naporno kretanje neposredno prije i poslije obroka zbog nadutosti želuca. VCA kao idealan dom navodi onaj sa starijom djecom i preporučuje šišanje kod profesionalnog frizera za pse svakih šest do osam tjedana.",
      ],
      sources: ["S985", "S986", "S989", "S990", "S10"],
    },
    neapolitan_mastiff: {
      aka: "Napuljski mastif, Mastino napoletano, Neapolitan Mastiff, Mastino Napoletano, Neo, Neapolitan, Italian Mastiff",
      text: [
        "Napuljski mastif (mastino napoletano) velik je, težak i masivan pas čuvar iz Italije; FCI ga svrstava u skupinu 2, među molose tipa mastifa. Standard FCI-ja opisuje ga kao postojana i odana psa, ne agresivna, s kratkom, tvrdom, gustom dlakom i debelom, opuštenom kožom koja tvori brojne nabore i bore, osobito na glavi. Poželjne boje su siva, olovnosiva i crna, ali i smeđa, žutosmeđa i tamnožutosmeđa. Standard navodi 65–75 cm i 60–70 kg za mužjake te 60–68 cm i 50–60 kg za ženke. Pas te veličine obično dosegne odraslu težinu s 18–24 mjeseca. Royal Kennel Club i PDSA navode životni vijek kraći od 10 godina, a PetMD samo 7–9 godina.",
        "Royal Kennel Club navodi do 1 sat kretanja dnevno, njegu dlake jednom tjedno, dlaku koja se linja te veliku kuću s vrtom. Pasminu svrstava u 3. kategoriju programa Breed Watch, a PDSA kaže da zbog viška kože na licu nastaju problemi s kapcima, poput entropija i ektropija. PDSA napuljske mastife naziva odanim, predanim psima koji vole obiteljski život i kaže da njihove kožne nabore treba čistiti svaki dan. PetMD piše da su sjajni s obiteljima i djecom, ali ih ne bi trebalo ostavljati samima s malim djetetom, da jako sline te da s pravilnom socijalizacijom i dresurom pozitivnim potkrepljivanjem treba početi rano.",
      ],
      sources: ["S993", "S994", "S995", "S996", "S10"],
    },
    norwegian_elkhound: {
      aka: "Norveški sivi losovac, Norveški losovac, Losovac, Norveški elkhund, Norwegian Elkhound, Elkhound, Elkie, Norsk Elghund Grå, Norwegian Moose Dog",
      text: [
        "Norveški sivi losovac nordijski je lovački špic iz Norveške, uzgojen za lov na losa; FCI ga svrstava u skupinu 5, među nordijske lovačke pse. Standard FCI-ja opisuje tipičnog špica – zbijena, kratka i kvadratne građe, s malim uspravnim ušima, repom čvrsto uvijenim preko leđa i gustom, grubom dlakom srednje duljine – neustrašiva, energična i hrabra. Dopuštena je samo siva boja, u raznim nijansama. Standard FCI-ja navodi idealnu visinu od 52 cm za mužjake i 49 cm za ženke, a standard AKC-a težinu od oko 55 funti (25 kg) za mužjake i oko 48 funti (22 kg) za ženke. Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD), a PetMD i WebMD navode životni vijek od 12–15 godina.",
        "PetMD preporučuje sat vremena kretanja dnevno i piše da pasmini podjednako kao tjelesno kretanje treba misaoni poticaj. Naziva je sjajnom uz djecu svih uzrasta kad je druženje pod nadzorom te divnim obiteljskim psom ako se kao štene socijalizira i rano dresira. PetMD savjetuje siguran, ograđeni prostor ili uzicu vani te navodi da se jako linja i da je zbog guste dlake sklon pregrijavanju. WebMD savjetuje četkanje dlake najmanje dvije minute svaki dan i svakodnevno pranje zubi.",
      ],
      sources: ["S960", "S961", "S963", "S964", "S10"],
    },
    mudi: {
      aka: "Mudi, Mađarski mudi, Hungarian Mudi",
      text: [
        "Mudi je mađarski pastirski pas; FCI ga svrstava u skupinu 1, među ovčare. Standard FCI-ja opisuje srednje velika psa klinaste glave, uspravnih ušiju i linije leđa koja se spušta prema začelju, s gustom, sjajnom, valovitom ili lagano kovrčavom dlakom, iznimno sposobna za učenje, živahna, hrabra, budna i željna rada. Dolazi u crnoj, bijeloj, žutosmeđoj, pepeljastoj (plavoj), jetrenoj, pepeljastosmeđoj i cifra (merle) boji. Standard FCI-ja navodi visinu od 41–47 cm za mužjake i 38–44 cm za ženke, a PetMD težinu od 18–29 funti (oko 8–13 kg). Pas te veličine odraste s otprilike 12–15 mjeseci (PetMD). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD 12–14 godina.",
        "Royal Kennel Club kaže da mudiju treba do 1 sat kretanja dnevno i njega dlake jednom tjedno te da je odan i privržen svojoj obitelji. Mora imati kamo usmjeriti energiju i inteligenciju, pa mu najbolje odgovara iskusan vlasnik koji mu može pružiti poticaje, strukturu i svrhu. PetMD ga opisuje kao pametnog, neovisnog i glasnog psa te piše da štenad mudija treba socijalizirati od rane dobi kako bi se osjećala ugodno uz djecu, druge ljubimce i nove ljude.",
      ],
      sources: ["S949", "S950", "S952", "S10"],
    },
    lhasa_apso: {
      aka: "Lhasa apso, Lhasa Apso, Lhasa, Apso, Lasa Apso",
      text: [
        "Lhasa apso malen je pas za društvo iz Tibeta. Royal Kennel Club navodi da su ga izvorno držali tibetski redovnici kao pratitelja i čuvara. Ima dugu dlaku; VCA navodi visinu od 10–11 inča (oko 25–28 cm) i težinu od 13–15 funti (oko 6–7 kg). Pas te veličine odraste s otprilike 9–12 mjeseci (PetMD), a Royal Kennel Club navodi životni vijek dulji od 12 godina.",
        "Royal Kennel Club preporučuje do 1 sat kretanja dnevno i svakodnevnu njegu dlake, navodi da se pasmina ne linja i da joj odgovara stan te je svrstava u 1. kategoriju programa Breed Watch. PDSA piše da se psi pasmine lhasa apso, uz pravilnu socijalizaciju u štenećoj dobi, dobro slažu s djecom i drugim ljubimcima u kućanstvu te da prema strancima mogu biti nešto oprezniji. WebMD predlaže kupanje najmanje jednom u dva tjedna, podrezivanje noktiju svaka 3 do 4 tjedna i što redovitije pranje zubi.",
      ],
      sources: ["S740", "S741", "S742", "S743", "S10"],
    },
    coton_de_tulear: {
      aka: "Coton de Tuléar, Coton de Tulear, Coton, Royal Dog of Madagascar",
      text: [
        "Coton de tuléar potječe s Madagaskara, a zemlja pokroviteljica pasmine je Francuska; FCI ga svrstava među bišone i srodne pasmine. Standard FCI-ja opisuje malog dugodlakog psa za društvo s bijelom dlakom pamučne strukture, okruglim tamnim očima i živahnim, inteligentnim izrazom lica. Narav mu je vesela i stabilna, a prema ljudima i drugim psima vrlo je društven. Visina je 26–28 cm za mužjake i 23–25 cm za ženke, a težina 4–6 kg za mužjake i 3,5–5 kg za ženke; osnovna boja je bijela. Pas te veličine odraste s otprilike 8–12 mjeseci (PetMD); Royal Kennel Club navodi životni vijek dulji od 12 godina.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno te navodi da pasmini odgovara stan, da se malo linja i da joj treba svakodnevna njega dlake. PDSA cotone naziva odanim i ljubaznim psima koji u obiteljskom životu cvjetaju i izvrsnim obiteljskim ljubimcima. PetMD piše da se uglavnom slažu s djecom i drugim ljubimcima kad se upoznavanja provedu pravilno te da mogu razviti separacijsku anksioznost ako ostaju sami dulje od nekoliko sati. Preporučuje provjeru ušiju najmanje jednom tjedno i kupanje otprilike jednom mjesečno.",
      ],
      sources: ["S10", "S721", "S722", "S724", "S725", "S726"],
    },
    chow_chow: {
      aka: "Chow chow, Čau-čau, Chow-chow, Chow Chow, Chow",
      text: [
        "Chow chow zbijen je špic nalik lavu iz Kine, s gustom, odstojećom dlakom jedne čvrste boje: crne, crvene, plave, žutosmeđe, krem ili bijele (standard FCI-ja). Standard FCI-ja navodi visinu od 48–56 cm za mužjake i 46–51 cm za ženke; PDSA navodi prosječnu težinu od 20–30 kg. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD). PDSA navodi životni vijek kraći od 10 godina, a PetMD 8–12 godina.",
        "PDSA piše da pasmini treba najmanje sat vremena kretanja dnevno, svakodnevno četkanje i razmak između jela i kretanja. Opisuje ih kao odane pse koji u pravom domu mogu biti idealni ljubimci, po mogućnosti uz iskusne vlasnike. Ne preporučuje ih uz malu djecu. Navodi snažan lovački nagon i da možda ne podnose ostajanje sami te da ih treba dobro socijalizirati od malih nogu. PetMD dodaje da su zbog guste dlake i kratke njuške skloniji pregrijavanju.",
      ],
      sources: ["S696", "S700", "S701", "S10"],
    },
    old_english_sheepdog: {
      aka: "Stari engleski ovčar, Staroengleski ovčar, Old English Sheepdog, Bobtail, Bob-tail, OES",
      text: [
        "Stari engleski ovčar velik je, snažan ovčar kvadratnog izgleda iz Velike Britanije, s bujnom, grubom, čupavom dlakom (standard FCI-ja). Tijelo može biti bilo koje nijanse sive, sijede ili plave, a glava, vrat i prednji dio tijela su bijeli. Standard FCI-ja navodi visinu od 61 cm i više za mužjake te 56 cm i više za ženke; PDSA navodi prosječnu visinu od 56–61 cm i prosječnu težinu od 27–30 kg. Pas te veličine odraste s otprilike 15–18 mjeseci (PetMD); PDSA navodi životni vijek dulji od 10 godina, a PetMD 10–12 godina.",
        "PDSA piše da pasmini treba najmanje dva sata kretanja dnevno, podijeljena na nekoliko šetnji, te da dugu dlaku treba četkati svaki dan i šišati kod profesionalnog frizera otprilike svakih šest tjedana. Opisuje ih kao staložene obiteljske ljubimce koji više odgovaraju obiteljima sa starijom djecom. Mogu patiti od separacijske anksioznosti kad ostaju sami i imaju snažan pastirski i lovački nagon, a PDSA savjetuje ostaviti razmak između jela i kretanja.",
      ],
      sources: ["S704", "S705", "S706", "S10"],
    },
    pekingese: {
      aka: "Pekinezer, Pekingese, Peke, Pekinese, Lion Dog",
      text: [
        "Pekinezer je malen pas za društvo nalik lavu iz Kine, s umjereno dugom, ravnom dlakom i grivom oko vrata. Standard FCI-ja navodi idealnu težinu od najviše 5 kg za mužjake i 5,4 kg za ženke; PDSA navodi prosječnu težinu od 5 kg i visinu od 15–22 cm. Pas te veličine odraste s otprilike 8–12 mjeseci (PetMD); PDSA navodi životni vijek dulji od 12 godina, a PetMD 12–14 godina.",
        "PDSA preporučuje najmanje pola sata kretanja dnevno, ali bez pretjerivanja jer im zbog plosnatog lica disanje može biti otežano, a po toplijim danima treba odustati od kretanja. Piše da dugu dlaku treba četkati svaki dan, da se pasmina jako linja, osobito u proljeće i jesen, i da kožni nabori na licu mogu dovesti do upala kože. Pekinezeri se bolje snalaze s odraslima ili starijom djecom, mogu patiti od separacijske anksioznosti kad ostaju sami i treba ih socijalizirati od malih nogu. PetMD savjetuje svakodnevno pranje zubi, čišćenje ušiju svaki tjedan ili svaka dva tjedna i profesionalnu njegu svakih šest do osam tjedana za dugu dlaku.",
      ],
      sources: ["S690", "S693", "S694", "S10"],
    },
    norfolk_terrier: {
      aka: "Norfolk terijer, Norfolk, Norfolk terrier",
      text: [
        "Norfolk terijer britanska je pasmina i jedan od najmanjih terijera; FCI ga svrstava u skupinu 3, među terijere malih dimenzija. Standard FCI-ja opisuje niska, žustra, zbijena i snažna psića, „demona“ za svoju veličinu, ljupke naravi, budna i neustrašiva, s tvrdom, žičastom, ravnom dlakom i srednje velikim ušima u obliku slova V koje padaju prema naprijed uz obraz; dopuštene su sve nijanse crvene, pšenična, crna s podpalinom i grizzle. Standard navodi idealnu visinu od 25 cm, ali ne i težinu; standard UKC-a navodi 11–12 funti (oko 5–5,4 kg), a PDSA 5–5,5 kg. Pas te veličine obično odraste s 9–12 mjeseci. Royal Kennel Club navodi životni vijek dulji od 10 godina, a Woodgreen 12–15 godina.",
        "Royal Kennel Club navodi da joj treba do 1 sat kretanja dnevno i njega dlake više puta tjedno, da se linja i da može živjeti u stanu; svrstava je u 1. kategoriju programa Breed Watch i ne navodi preporučene zdravstvene preglede prije uzgoja. PDSA piše da žičastu dlaku treba češljati otprilike dvaput tjedno i trimati tri do četiri puta godišnje te da norfolk terijeri vole kopati. Woodgreen ih opisuje kao nježne i strpljive s djecom, uvijek uz nadzor, i piše da ne vole dugo ostajati sami, da znaju bježati pa im treba ograda iz koje ne mogu pobjeći te da imaju jak lovački nagon, pa manji ljubimci poput kunića ili zamoraca uz njih možda nisu sigurni.",
      ],
      sources: ["S1010", "S1011", "S1012", "S1013", "S1016", "S10"],
    },
    belgian_sheepdog: {
      aka: "Belgijski ovčar groenendael, Groenendael, Belgian Shepherd Groenendael, Belgian Shepherd Dog (Groenendael), Belgian Groenendael",
      text: [
        "Belgijski ovčar groenendael crna je dugodlaka varijanta belgijskog ovčara, pastirskog psa iz Belgije; FCI belgijskog ovčara vodi kao jednu pasminu s četiri varijante i svrstava je u skupinu 1, među ovčare. Standard FCI-ja opisuje skladno građena psa koji spaja eleganciju i snagu, s prilično malim, visoko postavljenim uspravnim ušima i dugom, glatkom dlakom, duljom oko vrata i prsa; za groenendael dopušta samo jednolično crnu boju. Navodi visinu od oko 62 cm za mužjake i 58 cm za ženke te težinu od oko 25–30 kg za mužjake i 20–25 kg za ženke; pas te veličine odraste s otprilike 12–15 mjeseci (PetMD, prema razredu veličine). Royal Kennel Club navodi životni vijek dulji od 10 godina, a PetMD i WebMD 12–14 godina.",
        "Royal Kennel Club opisuje budna, oprezna i vrlo inteligentna psa koji voli raditi, preporučuje više od 2 sata kretanja dnevno i njegu dlake više puta tjedno, navodi da se pasmina linja i da joj odgovara velika kuća s velikim vrtom, a svrstava je u 1. kategoriju programa Breed Watch. PetMD piše da se belgijski ovčari jako vežu uz svoje ljude, trebaju puno kretanja i misaonih poticaja te mogu pokušavati „stjerivati“ djecu i mačke; preporučuje ranu socijalizaciju, tjedno četkanje i čišćenje ušiju jednom ili dvaput mjesečno. WebMD navodi da im treba gotovo dva sata kretanja svaki dan i da nisu dobar izbor za ljude koji dugo nisu kod kuće, a preporučuje svakodnevno pranje zubi i kupanje jednom mjesečno.",
      ],
      sources: ["S312", "S313", "S1019", "S1020", "S1021", "S10"],
    },
    finnish_lapphund: {
      aka: "Finski laponski pas, Finski lapphund, Finnish Lapphund, Finnish Lapponian Dog, Suomenlapinkoira, Lapinkoira, Lappie, Lapphund",
      text: [
        "Finski laponski pas (Suomenlapinkoira) pastirski je i čuvarski pas iz Finske koji se izvorno koristio za čuvanje sobova; FCI ga svrstava u skupinu 5, među nordijske čuvarske i pastirske pse. Standard FCI-ja opisuje psa manjeg od srednje veličine, inteligentna, hrabra, mirna i povodljiva, prijateljska i vjerna, s obilnom, dugom, grubom pokrovnom dlakom i mekom, gustom poddlakom; dopuštene su sve boje. Navodi idealnu visinu od 49 cm za mužjake i 44 cm za ženke, uz toleranciju od 3 cm, ali ne i težinu; PetMD i WebMD navode 33–53 funti (oko 15–24 kg), a pas te veličine obično odraste s 12–15 mjeseci. Royal Kennel Club navodi životni vijek dulji od 12 godina, a PetMD i WebMD 12–15 godina.",
        "Royal Kennel Club navodi da joj treba do 1 sat kretanja dnevno i njega dlake jednom tjedno, da se linja i da joj odgovara mala kuća s malim ili srednje velikim vrtom; svrstava je u 1. kategoriju programa Breed Watch. WebMD piše da su finski laponski psi dobri s djecom jer su obiteljski psi i da im nokte treba podrezivati jednom mjesečno. PetMD navodi da jako vole društvo, da su skloni lajanju, da ih je dovoljno kupati jednom mjesečno i da se mogu slagati s ljudima svih dobi ako su kao štenad socijalizirani; kao bolesti koje vrijedi poznavati navodi displaziju kuka i lakta te progresivnu atrofiju mrežnice.",
      ],
      sources: ["S1003", "S1004", "S1006", "S1007", "S10"],
    },
  },
};

export default hr;
