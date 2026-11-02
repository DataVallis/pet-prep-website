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
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
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
const origins: Record<string, string> = { GB: "Velika Britanija", FR: "Francuska", DE: "Njemačka", US: "SAD", CU: "Kuba", CH: "Švicarska", IT: "Italija", "CN-XZ": "Tibet (Kina)", CN: "Kina", MX: "Meksiko", BE: "Belgija", HU: "Mađarska", JP: "Japan", ZA: "Južnoafrička Republika", "BE-FR": "Belgija / Francuska", PT: "Portugal", CA: "Kanada", HR: "Hrvatska", AU: "Australija", RU: "Rusija", IE: "Irska", "AF-C": "Srednja Afrika" };
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
      `Dob kad dostiže odraslu veličinu: ${growthEnd}. Do tada planiraj kretanje i hranu za mladu životinju koja još raste i pitaj veterinara što je najbolje za tvog ljubimca.`,
    mind: "Premalo zadataka za glavu",
    health: "Zanemarivanje poznatih zdravstvenih problema pasmine",
    practise: "U PetPrepu dijete vježba upravo te navike – korake, obroke, njegu – prije nego što pravi ljubimac dođe kući.",
  },
  hub: {
    title: "Upoznaj životinju prije nego što dođe kući.",
    intro:
      "Što svaka vrsta i pasmina u PetPrepu stvarno treba – prema kinološkim i felinološkim savezima, veterinarskim dobrotvornim organizacijama i studijama, uz poveznicu na svaki izvor. Uz to i pravila po kojima ih PetPrep simulira.",
    breedCount: (n) => `${n} ${form(n, "pasmina", "pasmine", "pasmina")} u enciklopediji`,
    open: "Pogledaj pasmine",
    openA11y: (many) => `Pogledaj pasmine ${gen(many)}`,
    freePlan: (name, activity) => `Besplatni plan: ${lc(name)} (odrasla životinja: ${activity}). Nema vlastitu stranicu u enciklopediji.`,
    otherSpecies: "Planiramo još životinja.",
    methodTitle: "Kako gradimo ovu enciklopediju",
    method: [
      "Svaka činjenica potječe iz imenovanog izvora – kinoloških i felinoloških saveza, veterinarskih dobrotvornih organizacija i udruga te recenziranih studija – i ima poveznicu na njega. Standarde pasmina sažimamo vlastitim riječima.",
      "Vrijednosti koje nijedan izvor ne potvrđuje nikad ne prikazujemo kao činjenice. Kad PetPrep za igru mora odabrati broj, on se pojavljuje samo u dijelu „Kako to PetPrep simulira“ i označen je kao pravilo igre.",
      "Isti podaci pokreću aplikaciju: oznake, broj obroka, ciljevi koraka i termini za igru na ovim stranicama upravo su oni koje koristi ljubimac u aplikaciji.",
      "Ova enciklopedija nije veterinarski savjet. Zdravstvene informacije služe samo za orijentaciju i veterinar ih nije pregledao.",
    ],
  },
  speciesStatus: { available: "U aplikaciji", coming_soon: "Uskoro u aplikaciji", info_only: "Samo informativno" },
  availability: {
    in_app: { label: "U aplikaciji", text: "Dostupna u 12-tjednom izazovu PetPrep (plaćena pasmina)." },
    coming_soon: { label: "Uskoro u aplikaciji", text: "Izrađena je i testirana; stiže s jednim od sljedećih izdanja aplikacije." },
    info_only: { label: "Samo informativno", text: "U enciklopediji je informativno; u aplikaciji je još ne možeš udomiti." },
  },
  catalogue: {
    eyebrow: "Enciklopedija životinja",
    title: (many) => `${many}: pasmine u enciklopediji`,
    lead: (many, count) =>
      `${count} ${form(count, "pasmina", "pasmine", "pasmina")} ${gen(many)} – s potrebama prema izvorima, podacima o tome kome odgovaraju i pravilima po kojima ih PetPrep simulira. Pretražuj, filtriraj i usporedi do tri pasmine.`,
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
      "Kreni od onoga što tvoje kućanstvo može dati svaki dan: vrijeme za kretanje, njegu dlake i prostor. Stranica svake pasmine te potrebe prikazuje pregledno, a uz svaku vrijednost navodi imenovani izvor; kad se izvori razlikuju, prikazujemo sve vrijednosti.",
      "Ako pasmina ima kategoriju veličine (za pse: patuljasta, mala, srednja, srednja do velika, velika ili divovska), to je kategorija koju navodi imenovani izvor – obično kinološki savez – a težine su rasponi koje navode izvori, a ne naše procjene.",
      "Oznake kao što je „Dobar izbor: za aktivnu obitelj“ iste su kao u aplikaciji i svaku potvrđuju izvori. Brojevi u dijelu „Kako to PetPrep simulira“ pravila su igre PetPrep, a ne upute za njegu. [Kako gradimo enciklopediju](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Usporedba pasmina ${gen(many)}`,
    metaTitle: (many) => `Usporedba pasmina ${gen(many)} | Enciklopedija PetPrep`,
    intro: "Najvažnije potrebe jedna uz drugu, iz istih izvora kao i stranice pasmina.",
    pick: "U katalogu odaberi dvije ili tri pasmine i usporedi ih.",
    back: "Natrag na katalog",
    remove: "Ukloni: {name}",
    note: "Vrijednosti navodimo onako kako ih navodi imenovani izvor. Kad se izvori razlikuju, stranica pasmine navodi svaku.",
    availabilityRow: "U PetPrepu",
    activityRow: "Dnevni cilj odrasle životinje u PetPrepu (pravilo igre)",
  },
  facets: {
    size: { label: "Veličina", values: { toy: "Patuljasta", small: "Mala", small_medium: "Mala do srednja", medium: "Srednja", medium_large: "Srednja do velika", large: "Velika", giant: "Divovska" } },
    exercise: { label: "Dnevno kretanje", values: { under_1h: "Do 1 sata", h1_2: "1–2 sata", over_2h: "Više od 2 sata" }, line: (v) => `${lc(v)} kretanja dnevno` },
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
    growth_end: "Dob kad dostiže odraslu veličinu",
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
    puppy_8_12_weeks: "8–12 tjedana",
    puppy_3_6_months: "3–6 mjeseci",
    puppy_6_12_months: "6–12 mjeseci",
    kitten_6_12_weeks: "6–12 tjedana",
    kitten_3_6_months: "3–6 mjeseci",
    kitten_6_12_months: "6–12 mjeseci",
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
    walk_sensor: () => "Šetnje broje stvarne korake iz aplikacije Apple Zdravlje ili Health Connect (uz dopuštenje, samo čitanje) i iz senzora pokreta u telefonu – bez GPS-a.",
    play_instead_of_steps: (p, f) =>
      `Bez šetnji: odrasla mačka treba ${p.sessions} ${form(p.sessions, "termin", "termina", "termina")} za igru dnevno sa štapom s igračkom, s razmakom od najmanje ${f.num(p.gap_minutes / 60)}${NB}${hoursGen(p.gap_minutes / 60)}.`,
    litter_rule: (p) =>
      `Mačji toalet: odrasla mačka koristi ga ${p.uses} ${form(p.uses, "put", "puta", "puta")} dnevno; nakon svake upotrebe toalet se očisti u roku od ${p.scoop_hours}${NB}${hoursGen(p.scoop_hours)} (izvan sati mirovanja), a sav se pijesak zamijeni ${every(p.change_days)} ${p.change_days}${NB}${form(p.change_days, "dan", "dana", "dana")}.`,
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
      min_age_puppy: "Štene ne bi smjelo napustiti majku prije dobi od 8 tjedana.",
      pedigree_fci: "Traži rodovnik. Prema pravilima FCI-ja rodovnik se smije izdati samo uz ispravno podrijetlo.",
      parents_health_tests: "Traži na uvid rezultate zdravstvenih testova obaju roditelja. Koji su testovi važni, ovisi o pasmini.",
      breed_club_rules: "Nacionalni kinološki savezi mogu propisati uzgojna pravila stroža od FCI-jevih – pitaj klub pasmine koje testove roditelji moraju imati.",
      written_contract: "Traži pisani kupoprodajni ugovor u kojem su zabilježeni podrijetlo i zdravlje šteneta.",
      kitten_see_mother: "Pogledaj mače zajedno s majkom, ondje gdje mačići žive.",
      kitten_min_age: "Prema pravilima FIFe za rodovničke mačke mače ne odlazi u novi dom prije dobi od 14 tjedana.",
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
      kidney_scheme: "Ultrazvuk bubrega na nedostajući ili nepravilno razvijen bubreg (preporuka kluba pasmine)",
      kidney_upc_scheme: "Pretraga mokraće (omjer proteina i kreatinina) na bolest bubrega (preporuka kluba pasmine)",
      dna_gld: "DNK test na leukodistrofiju globoidnih stanica (GLD), nasljednu bolest živaca",
      liver_shunt_scheme: "Pregled jetre na portosistemski šant ili mikrovaskularnu displaziju (preporuka kluba pasmine)",
      breed_health_scheme: "Zdravstveni program kluba pasmine za roditelje",
      hemivertebrae_scheme: "Rendgenska snimka kralježnice roditelja na hemivertebre (nepravilno oblikovane kralješke), nakon dobi od 12 mjeseci",
      dna_hcm_mc: "DNK test na hipertrofičnu kardiomiopatiju (MC HCM)",
      dna_sma: "DNK test na spinalnu mišićnu atrofiju (SMA)",
      dna_pk_def: "DNK test na nedostatak piruvat-kinaze (PK def)",
      hcm_negative: "Mačke za uzgoj moraju biti HCM-negativne (bolest srca: hipertrofična kardiomiopatija)",
      dna_gsd4: "DNK test na bolest nakupljanja glikogena tipa IV (GSD IV)",
      dna_pra_b: "DNK test na progresivnu atrofiju mrežnice kod bengalske mačke (PRA-b)",
      dna_jlpp: "DNK test na juvenilnu paralizu grkljana i polineuropatiju (JLPP)",
      dna_lemp2: "DNK test na leukoencefalomijelopatiju (LEMP-2)",
      dna_huu: "DNK test na hiperurikozuriju (HUU)",
      dna_dcm: "DNK test na dilatacijsku kardiomiopatiju (DCM), bolest srčanog mišića",
      dna_pra5: "DNK test na progresivnu atrofiju mrežnice (PRA5)",
      dna_dings2: "DNK test na bolest „plešućeg dobermana“ (DINGS2), poremećaj živaca i mišića",
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
      dna_pra_rcd3: "DNK test na progresivnu atrofiju mrežnice (PRA-rcd3)",
      dna_vwd2: "DNK test na von Willebrandovu bolest tipa 2 (vWD2), nasljedni poremećaj zgrušavanja krvi",
      dna_l2hga: "DNK test na L-2-hidroksiglutarnu aciduriju (L-2-HGA), nasljednu metaboličku bolest živčanog sustava",
      dna_pll: "DNK test na primarnu luksaciju leće (PLL), nasljednu bolest oka pri kojoj leća sklizne s mjesta",
      dna_loa: "DNK test na ataksiju s kasnim početkom (LOA), nasljednu bolest koja utječe na ravnotežu i koordinaciju",
      dna_sca: "DNK test na spinocerebelarnu ataksiju (SCA), nasljednu bolest živčanog sustava",
    },
  },
  health: {
    shar_pei_fever: "U pasmine se može pojaviti obiteljska groznica šarpeja: napadaji visoke temperature s bolnim, natečenim zglobovima i natečenim licem — odmah veterinaru.",
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
      "Royal Kennel Club navodi oblik stražnjih nogu i način kretanja kao točku zabrinutosti u ovoj pasmini; zdrav pas ima ravna leđa i umjereno zakutnjene stražnje noge.",
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
    panosteitis: "U pasmini se može pojaviti panosteitis, bolna upala dugih kostiju koja obično pogađa mlade pse u rastu.",
    urinary_incontinence: "U pasmini se može pojaviti urinarna inkontinencija, nekontrolirano curenje mokraće.",
    osteochondritis: "U pasmini se može pojaviti osteohondritis disekans (OCD), poremećaj zglobne hrskavice kod pasa u rastu.",
    scottie_cramp: "U pasmini se javlja „Scottie cramp“ – kratke epizode grčenja mišića, obično izazvane uzbuđenjem; nije bolno.",
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
      "U PetPrepu je jedan stvarni tjedan jedan mjesec života ljubimca. Ovo su pravila koja igra koristi za ovu pasminu. PetPrep ih je odabrao na temelju izvora s ove stranice; to nisu upute za njegu stvarne životinje.",
    simInfoOnly: "Ova je pasmina u enciklopediji samo informativno; aplikacija je još ne simulira.",
    simTable: { stage: "Životna faza", starts: "Početak", meals: "Obroci dnevno", activity: { steps: "Dnevni cilj koraka", play_sessions: "Igra dnevno" } },
    arrives: (m) => `dolazi u dobi od ${m}${NB}${form(m, "mjeseca", "mjeseca", "mjeseci")}`,
    fromMonth: (m, years) => (years ? `${m}. mjesec (${years})` : `${m}. mjesec`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `od ${x.from}. mjeseca: ${x.meals}`)).join("; "),
    simDecisions: "Svaki broj u igri odluka je PetPrepa, zabilježena zajedno s izvorima.",
    healthTitle: "Zdravlje",
    healthNote: "Samo informativno, veterinar to nije pregledao. Za svoju životinju pitaj veterinara.",
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
    sourceLabel: (id, publisher) => `Izvor ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulacija za obitelji. Ova stranica nije veterinarski savjet – za stvarnu životinju pitaj veterinara ili klub pasmine.",
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
      emailSubject: (name) => `${name} – enciklopedija životinja PetPrep`,
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
    shar_pei: {
      aka: "Shar Pei, kineski šarpej, Chinese Shar-Pei",
      text: [
        "Šarpej (u SAD-u „Chinese Shar-Pei”) aktivan je, kompaktan, kvadratno građen pas srednje veličine iz Kine s kratkom, oštrom, čekinjastom dlakom jedne boje (bilo koje osim bijele), naborima na glavi i grebenu te širokom njuškom. Standard Royal Kennel Cluba navodi visinu od 46–51 cm, a PDSA težinu od 20–27 kg; pas te veličine prestaje rasti oko 12.–15. mjeseca (PetMD). Royal Kennel Club i PDSA navode životni vijek dulji od 10 godina, no studija VetCompass na psima u Ujedinjenom Kraljevstvu pronašla je medijan od 7,3 godine.",
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
        "Cavalier King Charles španijel mali je patuljasti španijel iz Velike Britanije s dugim, resastim ušima i dugom, svilenkastom dlakom u četiri boje: blenheim, rubin, crna s palež oznakama i trobojna. Standard ga opisuje kao aktivnog, gracioznog psa blagog izraza – sportskog, privrženog, prijateljski raspoloženog i neustrašivog.",
        "Treba otprilike sat vremena kretanja dnevno, može živjeti u stanu i poznat je po tome što se dobro snalazi s djecom, iako igru treba nadzirati, a ne voli ni ostajati sam. Dlaku treba četkati češće nego jednom tjedno. Britanski izvori kao glavne zdravstvene probleme navode bolest srčanih zalistaka i bolno stanje kralježnice povezano s oblikom lubanje, pa se od uzgajivača traži da psima pregledaju srce i naprave magnetsku rezonanciju.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      aka: "Beagle",
      text: [
        "Bigl je mali gonič iz Velike Britanije, uzgojen za lov na zečeve praćenjem traga. Standard ga opisuje kao čvrstog, zbijeno građenog, veselog goniča – odvažnog, aktivnog i budnog, prijaznog, bez agresije i plašljivosti – s kratkom, gustom dlakom u bojama goniča, poput trobojne, smeđe-bijele ili limun-bijele, i uvijek s bijelim vrhom repa.",
        "Treba do otprilike sat vremena kretanja dnevno i dobro se uklapa u obiteljski život ako je socijaliziran od malih nogu, no uz djecu treba nadzor i ne bi trebao ostajati sam jer tada može lajati i grickati stvari. Kratku dlaku treba četkati jednom tjedno, ali se linja. Dresuru treba započeti rano i koristiti nagrade. Britanski veterinari bigle najčešće liječe zbog debljanja i bolesti zubi, pa treba paziti na porcije i zube.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "velika pudla, Standard Poodle, kraljevska pudla",
      text: [
        "Velika pudla najveća je od četiriju veličina pudle, pasmina za društvo iz Francuske koja potječe od europskih lovaca na patke. Standard je opisuje kao elegantnog, skladnog psa ponosnog držanja – odanog, vedrog i dobroćudnog, sposobnog za učenje i dresuru – s obilnom, kovrčavom jednobojnom dlakom – crnom, bijelom, smeđom, sivom ili žutom (fawn).",
        "Treba do otprilike sat vremena kretanja dnevno i odgovara joj velika kuća s velikim vrtom. Uz pravu socijalizaciju u dobi šteneta obično se dobro slaže s djecom i drugim ljubimcima. Dlaka joj se ne linja, ali to je ne čini hipoalergenom: treba svakodnevnu njegu i redovito šišanje kod profesionalnog frizera za pse. Poznata je po velikoj poslušnosti i dobro reagira na dresuru.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "jazavčar, Teckel, Dackel",
      text: [
        "Jazavčar je njemački lovac na jazavce i kuniće, kod kuće poznat kao Teckel, koji postoji u nekoliko veličina i s tri vrste dlake; ova stranica govori o standardnoj veličini s kratkom, glatkom dlakom. Standard ga opisuje kao psa umjereno dugog u odnosu na visinu, bez pretjerivanja – vjernog, svestranog i dobroćudnog, inteligentnog, živahnog i hrabrog – s gustom, kratkom, glatkom dlakom crvene boje ili crne ili čokoladne s palež oznakama.",
        "Treba do otprilike sat vremena kretanja dnevno, podijeljenog u nekoliko šetnji s vremenom za njuškanje, i odgovara mu mala kuća. Voli ljude i obično se dobro slaže s djecom svih uzrasta, uvijek uz nadzor, no zbog jakog lovačkog nagona ne preporučuje se uz manje ljubimce, a ne podnosi dobro ni samoću. Zbog dugih leđa i kratkih nogu sklon je hernijama diska, pa ne bi trebao skakati; od uzgajivača se traži pregled kralježnice prije uzgoja.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie",
      text: [
        "Australski ovčar, unatoč imenu, američka je pasmina – inteligentan radni pas s jakim nagonom za čuvanje stada i zaštitu. Standard ga opisuje kao skladnog psa srednje veličine, nešto duljeg nego što je visok, dobre naravi i ponekad suzdržanog pri prvom susretu, sa srednje dugom, ravnom do valovitom dlakom u bojama plavi merle, crna, crveni merle ili crvena, svaka sa ili bez bijelih i palež oznaka.",
        "Treba više od dva sata kretanja dnevno i misaone izazove poput zagonetki i dresure, a odgovara mu velika kuća s velikim vrtom na selu. U pravom kućanstvu može biti zaista dobar obiteljski ljubimac, ali ga jak ovčarski nagon može navesti da „čuva“ djecu, pa se ne preporučuje obiteljima s manjom djecom. Ne voli ostajati sam, a dlaku mu treba četkati nekoliko puta tjedno.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "havanski bišon, Bichon Havanais",
      text: [
        "Havanski bišon mali je pripadnik obitelji bišona i nacionalni pas Kube. Standard ga opisuje kao čvrstog malog psa niskih nogu s vrlo dugom, mekom, ravnom ili valovitom dlakom koja se nikad ne šiša i s repom nošenim visoko iznad leđa. Dolazi u žutoj, crnoj, havana smeđoj, duhanskoj i crvenkastosmeđoj boji te, rijetko, u bijeloj, sa ili bez mrlja i palež oznaka.",
        "Standard ga naziva privrženim, razigranim, pa čak i pomalo klaunom i kaže da voli djecu i s njima se beskrajno igra; britanski izvori nazivaju ga izvrsnim obiteljskim ljubimcem uz pravu socijalizaciju, kojeg je lako dresirati. Treba oko 30 minuta kretanja dnevno, može živjeti u stanu i ne linja se – ali dugu dlaku treba njegovati svaki dan kako se ne bi zapetljala.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "West Highland white terijer, ili westie, mali je terijer iz Velike Britanije. Standard ga opisuje kao snažno građenog malog psa dubokog prsnog koša, ravnih leđa i oštre dvostruke dlake duge oko 5 cm, s malim uspravnim šiljatim ušima i tamnim očima ispod gustih obrva. Bijela je jedina boja koju standard dopušta.",
        "Standard ga naziva budnim, veselim, hrabrim i samostalnim, ali prijaznim. Britanski izvori nazivaju ga privrženim, razigranim obiteljskim ljubimcem za djecu svih uzrasta, uz igru uvijek pod nadzorom; treba otprilike sat vremena kretanja dnevno, može živjeti u stanu, linja se i treba četkanje nekoliko puta tjedno. Zbog lovačkog nagona ne bi trebao živjeti s manjim ljubimcima, a ne voli ni ostajati sam. Koža je poznat problem: Royal Kennel Club traži od sudaca da u pasmini paze na znakove upale kože.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Berner Sennenhund",
      text: [
        "Bernski planinski pas velik je švicarski pas sa seoskih imanja, izvorno korišten kao čuvar, vučni pas i pas za goveda u kantonu Bernu. Standard ga opisuje kao snažnog, okretnog dugodlakog radnog psa čvrstih udova s dugom, sjajnom, ravnom ili blago valovitom dlakom. Jedina boja koju standard dopušta je trobojna: duboka crna s bogatim palež oznakama na obrazima, iznad očiju, na nogama i prsima te bijelim oznakama na glavi i prsima.",
        "Standard ga naziva samouvjerenim, dobroćudnim i prijaznim te „dobrim i odanim obiteljskim psom“ koji sporo sazrijeva. Britanski izvori kažu da treba do sat vremena kretanja dnevno, da mu odgovara velika kuća s velikim vrtom, da se jako linja i da ga treba četkati češće nego jednom tjedno; ne bi smio dugo ostajati sam. Obično živi kraće od deset godina, a britanski izvori među zdravstvenim problemima navode displaziju kuka i lakta, torziju želuca i određene vrste raka.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "haski, Husky",
      text: [
        "Sibirski haski srednje je velik radni pas za vuču saonica, koji FCI priznaje kao američku pasminu, a Royal Kennel Club opisuje kao najlakšeg i najbržeg među psima za saonice. Standard traži psa brzog i laganog koraka, s dvostrukom dlakom srednje duljine, debelim uspravnim ušima, smeđim ili plavim očima (dopušteno je i po jedno od svakog) i dobro obraslim repom. Boje idu od crne do čisto bijele; merle i tigrasta nisu dopuštene.",
        "Standard ga naziva prijaznim i blagim, budnim i otvorenim. Britanski izvori kažu da treba više od dva sata kretanja dnevno, veliku kuću s velikim vrtom i vrlo sigurnu, visoku ogradu jer su haskiji poznati bjegunci; jako se linja, treba četkanje nekoliko puta tjedno i ne podnosi dobro samoću. PDSA ga preporučuje za kućanstva samo s odraslima ili s tinejdžerima, a ne za obitelji s manjom djecom, te među zdravstvenim problemima navodi displaziju kuka, probleme s očima i epilepsiju.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Rotvajler je srednje velik do velik, snažan radni pas iz Njemačke. Standard ga opisuje kao čvrstog psa, ni teškog ni laganog, s kratkom, grubom, priljubljenom dlakom, srednje velikim visećim ušima i tamnosmeđim bademastim očima. Jedina dopuštena boja je crna s jasno ocrtanim, bogatim palež oznakama na obrazima, njušci, grlu, prsima i nogama; bijele oznake su mana.",
        "Standard ga naziva dobroćudnim, mirnim, vrlo odanim, poslušnim i željnim rada, a Royal Kennel Club kaže da je dobro školovan rotvajler divan obiteljski pratitelj. Britanski izvori kažu da treba više od dva sata kretanja dnevno, veliku kuću s velikim vrtom i iskusnog vlasnika jer je tako snažan; treba ga socijalizirati od malih nogu. PDSA ga ne preporučuje obiteljima s mlađom djecom i bebama, a s drugim ljubimcima nikad ne bi smio ostati bez nadzora. Dovoljno je četkanje jednom tjedno. Obično živi kraće od deset godina, a Royal Kennel Club prati oblik njegovih stražnjih nogu.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "buldog, English Bulldog, British Bulldog",
      text: [
        "Engleski buldog srednje je velik, kratkodlaki pas iz Velike Britanije: prilično zdepast, nizak, širok, snažan i zbijen, s relativno kratkim licem, malim tankim ušima u obliku ruže i okruglim, vrlo tamnim očima. Standard dopušta jednobojne boje poput crvene, žute, svijetložute i bijele, tigrastu i šarenu; crna i crna s palež oznakama vrlo su nepoželjne. Traži velike, široko otvorene nosnice i kaže da su psi koji pokazuju otežano disanje vrlo nepoželjni.",
        "Standard ga naziva budnim, odvažnim, odanim, pouzdanim i hrabrim, žestokog izgleda, ali privrženim, a Royal Kennel Club kaže da je zbog svoje naravi i odanosti i dalje vrlo omiljen obiteljski pratitelj. Britanski izvori kažu da treba do sat vremena kretanja dnevno, nikad u najtoplijem dijelu dana, i da se dobro slaže s drugim kućnim ljubimcima ako je socijaliziran rano; njega dlake potrebna je jednom tjedno, ali bore na licu treba čistiti svaki dan. PDSA ga opisuje kao pasminu izrazito spljoštenog lica koja će vrlo vjerojatno imati ozbiljne zdravstvene probleme, poput otežanog disanja, i snažno preporučuje da se razmisli o zdravijoj pasmini, križancu ili mješancu. Obično živi kraće od deset godina.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "kratkodlaki ptičar, GSP, Deutsch Kurzhaar",
      text: [
        "Njemački kratkodlaki ptičar svestran je lovački pas iz Njemačke, građen za rad u polju i vodi, s kratkom, gustom dlakom koja je pod rukom tvrda, širokim plosnatim ušima postavljenima visoko i tamnosmeđim bademastim očima. Njegov američki standard dopušta jednobojnu smeđu, smeđu s bijelim (npr. s pjegama), jednobojnu crnu te crnu s bijelim; crvena, narančasta, limun ili palež područja i potpuno bijeli pas isključuju se. Standard opisuje kupiran rep – PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva prijaznim, inteligentnim i spremnim udovoljiti. Royal Kennel Club i PDSA kažu da treba više od dva sata kretanja dnevno; PDSA dodaje da se u šetnji može probuditi njegov nagon za lov, markiranje i donošenje, pa treba dobro uvježbati dozivanje, te da ga je prilično lako dresirati. Njegu dlake treba jednom do dvaput tjedno i umjereno se linja. Velika britanska studija navodi medijan očekivanog životnog vijeka od 13,4 godine.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "jorki, Yorkie",
      text: [
        "Jorkširski terijer patuljasti je terijer iz Velike Britanije koji prema standardu pasmine teži do 3,2 kg, s dugom, savršeno ravnom, sjajnom i svilenkastom dlakom koja ravnomjerno pada s obje strane od razdjeljka duž leđa. Standard dopušta jednu boju: tamnu čeličnoplavu od zatiljka do repa i bogatu, svijetlu palež boju na glavi, prsima i nogama; male uši u obliku slova V nosi uspravno. Standard opisuje i kupiran i nekupiran rep – PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva budnim, inteligentnim i živahnim, ujednačene naravi. Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake; PDSA dodaje da voli trčati, donositi i igrati se, da zna biti prilično tvrdoglav u dresuri i da više odgovara obiteljima sa starijom djecom jer su mu kosti vrlo krhke. Velika britanska studija utvrdila je da su bolesti zubi najčešći problem u pasmini, potiče svakodnevnu njegu zubi, primjerice pranje, i utvrdila medijan dobi u trenutku smrti od 13,56 godine.",
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
        "Welsh corgi pembroke mali je pas za goveda iz Walesa, nisko postavljen, snažan i čvrsto građen, koji na malom prostoru odaje dojam čvrstoće i izdržljivosti. Standard opisuje srednje dugu, ravnu dlaku s gustom poddlakom u crvenoj, sobolj (sable), žutoj ili crnoj s palež oznakama, sa ili bez bijelih oznaka na nogama, prsima i vratu, te uspravne uši. Rep se nekoć uobičajeno kupirao; standard opisuje i prirodan rep, a PetPrep psa uvijek prikazuje s prirodnim repom.",
        "Standard ga naziva odvažnim, radišnim, otvorenim i prijaznim. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno; PDSA opisuje prijazne, vesele, zabavne pse koji rado udovoljavaju i koje je prilično lako dresirati, ali kaže da mogu štipati za pete djecu koja trče, pa pomažu socijalizacija s djecom i dresura od malih nogu. Royal Kennel Club navodi životni vijek dulji od 12 godina i traži od uzgajivača da roditeljima ocijene kukove.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "doberman, Doberman Pinscher",
      text: [
        "Doberman je njemački pas za društvo, zaštitu i rad srednje veličine, snažne i mišićave građe, elegantnih linija i ponosnog držanja. Njegov standard FCI-ja opisuje kratku, tvrdu, gustu dlaku koja je priljubljena i glatka, u crnoj ili smeđoj boji s jasno ocrtanim hrđavocrvenim palež oznakama; bijele mrlje nisu dopuštene. Prema standardu FCI-ja uši i rep ostaju prirodni, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "Standard ga naziva prijaznim i mirnim te vrlo odanim obitelji. Royal Kennel Club kaže da ga njegova vjerna i poslušna narav čini izvrsnim obiteljskim psom te preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno. PDSA dodaje da je vrlo energičan, da treba mnogo misaone i tjelesne aktivnosti te ranu socijalizaciju i da se – zbog veličine i snažne građe – ne preporučuje obiteljima s malom djecom ni vlasnicima kojima je to prvi pas. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "bokser, Deutscher Boxer",
      text: [
        "Njemački bokser radni je pas i pas za društvo iz Njemačke, srednje veličine, kvadratne građe, jakih kostiju i dobro razvijenih mišića. Njegovi standardi opisuju kratku, sjajnu, glatku dlaku žute ili tigraste boje s crnom maskom; bijele oznake su dopuštene, ali ne bi smjele prekrivati više od trećine dlake. Njuška bi trebala biti široka i duboka, nikad kratka, sa širokim nosnicama. Rep se nekoć uobičajeno kupirao; standard opisuje i nekupiran rep, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "Standard ga naziva staloženim, poslušnim, neustrašivim i samouvjerenim. Royal Kennel Club kaže da je vrlo omiljen obiteljski pratitelj te preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno. PDSA opisuje vrlo energičnog, razigranog psa koji voli ljudsko društvo i može razviti separacijsku anksioznost ako ostaje sam, ima vrlo jak lovački nagon i – zbog veličine i burne naravi – ne preporučuje se domovima s mlađom djecom ni vlasnicima kojima je to prvi pas; neki bokseri kraćeg lica mogu imati ozbiljne probleme s disanjem. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, mini šnaucer",
      text: [
        "Patuljasti šnaucer mali je njemački pas za društvo: snažan, zdepast i gotovo kvadratan, s oštrom, žičastom, gustom dlakom, gustim obrvama i bradom. Njegov standard FCI-ja dopušta boju papar-sol, crnu sa srebrnom, čisto crnu i čisto bijelu; PetPrep prikazuje prve tri. Rep se nekoć uobičajeno kupirao, a uši ponekad kupirale; standard FCI-ja traži prirodan rep i preklopljene uši, a PetPrep psa uvijek prikazuje s prirodnim ušima i repom.",
        "FCI ga svrstava među pse za kuću i društvo, a Royal Kennel Club kaže da je vrlo omiljen kao pratitelj. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno te kaže da se ne linja. PDSA opisuje razigranog, znatiželjnog psa koji se može dobro slagati s djecom ako ih upozna rano, koji zna biti tvrdoglav u dresuri i treba njegu dlake dva do tri puta tjedno te povremeno šišanje ili trimanje kod profesionalnog frizera za pse. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu, šicu",
      text: [
        "Shih tzu mali je pas za društvo s Tibeta; o njegovu standardu FCI-ja skrbi Velika Britanija. Standardi opisuju čvrstog psa obilne dlake, ponosnog držanja i lica „poput krizanteme“: s dugom, gustom pokrovnom dlakom, velikim tamnim okruglim očima, velikim visećim ušima i bogato operjanim repom nošenim iznad leđa. Standardi dopuštaju mnogo boja; PetPrep prikazuje zlatno-bijelu, crno-bijelu i smeđe-bijelu, a nikad merle. Njuška je kratka i plosnata, a PDSA navodi probleme s disanjem zbog kraćeg lica, pa PetPrep uvijek crta umjereno lice s otvorenim nosnicama.",
        "FCI ga opisuje kao inteligentnog, aktivnog i budnog, prijaznog i neovisnog. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi stan kao prikladan dom. PDSA kaže da shih tzui mogu biti dobroćudni obiteljski ljubimci ako su pravilno socijalizirani i školovani, naziva ih idealnim ljubimcima za vlasnike kojima je to prvi pas, savjetuje da ih se uz djecu uvijek nadzire i za većinu kućnih ljubimaca preporučuje svakodnevno četkanje i šišanje kod profesionalnog frizera za pse svakih šest do osam tjedana. Royal Kennel Club navodi životni vijek dulji od 10 godina.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "doga, Deutsche Dogge, Great Dane",
      text: [
        "Njemačka doga njemački je div: standard FCI-ja kaže da spaja veliko, snažno, dobro građeno tijelo s ponosom, snagom i elegancijom, s dugom, uskom glavom, prirodno visećim ušima i vrlo kratkom, glatkom, sjajnom dlakom. Standardi navode žutu i tigrastu boju – idealno s crnom maskom – te harlekin, crnu i plavu; PetPrep prikazuje samo boje koje navode i FCI i Royal Kennel Club, nikad merle ni mantle, i psa uvijek crta s prirodnim ušima i repom te priljubljenim kapcima jer Royal Kennel Club traži od sudaca da paze na kapke okrenute prema unutra ili van i na slabe stražnje noge.",
        "FCI je naziva prijaznom, punom ljubavi i odanom vlasnicima, iako prema strancima može biti suzdržana. Royal Kennel Club kaže da je unatoč veličini divan obiteljski pas te preporučuje više od dva sata kretanja dnevno, veliku kuću i vrt te njegu dlake jednom tjedno. PDSA kaže da su doge poznate po slinjenju, da imaju prilično jak lovački nagon i da se zbog veličine i snage ne preporučuju domovima s mlađom djecom; savjetuje razmak između hranjenja i kretanja kako bi se spriječila torzija želuca. Royal Kennel Club navodi životni vijek kraći od 10 godina.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "patuljasti špic, Pom, Zwergspitz",
      text: [
        "Pomeranac je najmanji špic: FCI ga vodi kao patuljastu varijantu njemačkog špica, visoku 21 cm ± 3 cm u grebenu, a standard Royal Kennel Cluba opisuje zbijenog, kratkog malog psa s glavom nalik lisičjoj, malim uspravnim ušima i repom zavrnutim preko leđa. Dvostruka dlaka ima meku, pahuljastu poddlaku i dugu, ravnu pokrovnu dlaku koja oko vrata tvori ogrlicu. Standard dopušta mnogo jednobojnih boja, poput narančaste, krem, bijele, crne i smeđe, ali nikad merle; PetPrep crta prirodnu, nešišanu dlaku.",
        "FCI njegovu narav naziva druželjubivom i vedrom, a standard Royal Kennel Cluba naziva ga otvorenim, živahnim i inteligentnim. Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i kaže da mu odgovara stan; PDSA kaže da dvostruku dlaku treba četkati dva do tri puta tjedno. AKC kaže da pomeranci obično bolje odgovaraju obiteljima sa starijom djecom, da se uz ranu socijalizaciju mogu dobro slagati s drugim životinjama i toplo preporučuje ranu socijalizaciju i školu za štenad. Royal Kennel Club navodi životni vijek dulji od 12 godina.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston Terrier, American Gentleman",
      text: [
        "Bostonski terijer potječe iz Sjedinjenih Američkih Država. Standard FCI-ja opisuje živahnog, vrlo inteligentnog, kratkodlakog psa kratke glave, zbijene građe, kratkog repa i skladnih proporcija, tigraste, tamnosmeđe (seal) ili crne boje s ravnomjernim bijelim oznakama: obvezni su bijeli pojas na njušci, bijela lisa između očiju i bijela prsa, a tigrasta je boja poželjnija. PetPrep ga crta tigrasto-bijelog, s umjerenom njuškom, otvorenim nosnicama te prirodnim ušima i repom.",
        "Riječ je o pasmini spljoštenog lica (brahicefaličnoj), a PDSA upozorava da se nikad ne bi smio kretati u najtoplijem dijelu dana jer je sklon pregrijavanju. Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno, kaže da mu odgovara stan i navodi životni vijek dulji od 10 godina. PDSA naziva bostonske terijere savršenim obiteljskim ljubimcima koji su osobito dobri s djecom ako su kao štenad dobro socijalizirani; AKC kaže da se dobro snalaze s djecom koja znaju nježno postupati sa životinjama, da ne podnose dobro dugu samoću i snažno preporučuje ranu socijalizaciju i školovanje šteneta.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd, mini aussie",
      text: [
        "Minijaturni američki ovčar potječe iz Sjedinjenih Američkih Država. Standard FCI-ja opisuje malog ovčarskog psa s jakim nagonom za čuvanje stada i zaštitu, inteligentnog i ponajprije radnog psa, nešto duljeg nego što je visok, sa srednje dugom, ravnom do valovitom dlakom otpornom na vremenske uvjete. Boje su crna, plavi merle, crvena i crveni merle, sa ili bez bijelih i palež oznaka, a oči mogu biti smeđe, plave, lješnjak ili jantarne boje. PetPrep ga crta u boji plavi merle s prirodnim repom.",
        "PetMD kaže da ima mnogo energije i treba najmanje sat vremena kretanja svaki dan, idealno dva, uz zadatke koji mu zaokupljaju um, te da ga treba četkati nekoliko puta tjedno; AKC kaže da je veći dio godine dovoljno četkanje jednom tjedno, a u sezoni linjanja svaki dan. AKC kaže da uz školovanje poslušnosti i ranu socijalizaciju može biti izvrstan obiteljski pas i da je obično dobar s djecom, ali ih može pokušati „čuvati“; PetMD dodaje da njegova privrženost obitelji može dovesti do separacijske anksioznosti kad ostane sam. PetMD navodi životni vijek od 12 do 13 godina.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "čivava, Chihuahueño, kratkodlaka čivava",
      text: [
        "Čivava potječe iz Meksika. Standard Kennel Cluba opisuje malog, nježnog, zbijenog psa drskog izraza i vesele, živahne i inteligentne naravi, s dobro zaobljenom lubanjom „u obliku jabuke“, umjereno kratkom, blago šiljatom njuškom, velikim okruglim očima koje nisu izbočene, velikim ušima i srpastim repom; dopuštena je svaka boja ili mješavina boja, ali nikad merle, a poželjna težina je 1,8–2,7 kg. Royal Kennel Club kratkodlaku i dugodlaku čivavu vodi kao dvije pasmine; PetPrep crta kratkodlaku čivavu žute boje, s umjerenom glavom.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake jednom tjedno, kaže da joj odgovara stan i navodi životni vijek dulji od 12 godina. PDSA kaže da su čivave tako male i lagane da ih djeca žele uzimati u naručje, što im najvjerojatnije neće biti drago, pa više odgovaraju obiteljima s nešto starijom djecom. PDSA dodaje da kao psi za društvo vole društvo i trebaju nekoga tko je stalno kod kuće te da ih od malih nogu treba socijalizirati s mnogo različitih ljudi, iskustava i mjesta.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer španijel, springer, ESS",
      text: [
        "Engleski springer španijel potječe iz Velike Britanije, gdje je uzgojen za pronalaženje, dizanje i donošenje divljači. Standard Kennel Cluba opisuje simetrično građenog, zbijenog, snažnog, veselog i aktivnog psa – najdužih nogu među britanskim španijelima za rad na kopnu – prijazne, vesele i poslušne naravi, s dugim, resastim ušima, tamnim očima boje lješnjaka i priljubljenom, ravnom dlakom otpornom na vremenske uvjete; boje su smeđe-bijela ili crno-bijela, obje i s palež oznakama, a približna visina je 51 cm. PetPrep ga crta smeđe-bijelog, s prirodnim repom.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. PDSA kaže da su springeri dobri obiteljski psi koji se dobro slažu s djecom i drugim kućnim ljubimcima, da su poslušni i željni učenja te da trebaju njegu dlake jednom do dvaput tjedno i šišanje svaka 3 mjeseca. AKC dodaje da ne bi smjeli dugo ostajati sami te da su rana socijalizacija i škola za štenad ključni.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "šelti, Sheltie, šetlandski kolij (nekadašnji naziv)",
      text: [
        "Šetlandski ovčar potječe iz Velike Britanije i mali je dugodlaki radni pas. Standard FCI-ja opisuje budnog, blagog, inteligentnog, snažnog i aktivnog psa, privrženog i odanog vlasniku i suzdržanog prema strancima, s glavom poput dugog, tupog klina, malim poluuspravnim ušima čiji vrhovi padaju naprijed i dvostrukom dlakom s dugom, oštrom pokrovnom dlakom; boje su sobolj (sable), trobojna, plavi merle, crno-bijela te crna s palež oznakama, a idealna visina je 37 cm za mužjake i 35,5 cm za ženke. PetPrep ga crta u boji sobolj s bijelim.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi životni vijek dulji od 10 godina. PDSA kaže da su šetlandski ovčari vrlo blagi, razigrani, poslušni psi koji se često dobro uklapaju u obiteljski život i rado se slažu s djecom te da su dresura i socijalizacija od malih nogu vrlo važne. AKC dodaje da trebaju redovitu misaonu i tjelesnu aktivnost, da bi zbog ovčarskog nagona najbolje odgovarali starijoj djeci i da su poznati po tome što puno laju.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "bretonski španijel, Epagneul Breton, Brittany Spaniel",
      text: [
        "Bretonski španijel ptičar je iz Francuske, gdje se zove Epagneul Breton. Royal Kennel Club opisuje vrlo energičnog, inteligentnog psa koji traži, markira i donosi divljač, blagog i privrženog, a ipak punog života i zanosa, s gustom, prilično finom dlakom, visoko postavljenim trokutastim ušima i repom koji je često prirodno kratak; boje prema standardu su narančasta, smeđa ili crna s bijelim, roan ili trobojna, a visina je 48–51 cm za mužjake i 47–50 cm za ženke. PetPrep ga crta narančasto-bijelog.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. AKC kaže da su bretonski španijeli vrlo energični psi kojima treba mnogo kretanja i misaonih poticaja, da su blagi i obično strpljivi s djecom te da im je za lijep izgled dovoljno četkanje jednom tjedno. PetMD dodaje da je rana socijalizacija šteneta nužna, da ne podnose dobro dugu samoću i da, uzgojeni za lov na ptice, imaju jak lovački nagon.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (SAD), American Cocker",
      text: [
        "Američki koker španijel – u Sjedinjenim Američkim Državama jednostavno koker španijel – druga je pasmina od engleskog koker španijela. Standard AKC-a naziva ga najmanjim članom skupine lovačkih pasa (Sporting Group), s dugim, režnjastim, bogato resastim ušima, zaobljenom lubanjom i širokom, dubokom njuškom te svilenkastom dlakom koja je ravna ili blago valovita; dolazi u crnoj boji, u svakoj jednobojnoj boji od najsvjetlije krem do najtamnije crvene te u višebojnim varijantama s bijelim. Standard traži staloženu narav bez ikakvog traga plašljivosti.",
        "Royal Kennel Club preporučuje svakodnevnu njegu dlake i više od 2 sata kretanja dnevno te navodi životni vijek dulji od 10 godina; AKC i PetMD pišu da ne treba mnogo kretanja. PetMD te pse blage naravi naziva izvrsnim obiteljskim psima, prijaznima prema ljudima i drugim životinjama, i savjetuje da se socijalizacija i dresura započnu rano; VCA piše da su obično vrlo dobri s djecom, da su skloni debljanju i da im uši treba pregledavati svaki tjedan.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinoa, Malinois, belgijski ovčar (malinois)",
      text: [
        "Belgijski ovčar malinois kratkodlaka je varijanta belgijskog ovčara, ovčarske pasmine iz Belgije. Standard FCI-ja opisuje skladno građenog psa koji spaja eleganciju i snagu i dopušta samo jednu boju: žutu s crnim prekrivanjem i crnom maskom. Standardi FCI-ja i AKC-a opisuju prilično male, uspravne, trokutaste uši, kratku, tvrdu dlaku s gustom poddlakom te budnu, inteligentnu, znatiželjnu i samouvjerenu narav.",
        "Royal Kennel Club preporučuje više od 2 sata kretanja dnevno i njegu dlake češće nego jednom tjedno te navodi životni vijek dulji od 10 godina. AKC piše da nije dobar izbor za vlasnike kojima je to prvi pas, da najbolje odgovara starijoj, odgovornoj djeci i da ne bi smio dugo ostajati sam; PetMD navodi jak lovački nagon, to da može pokušati „čuvati“ djecu te da treba stalnu svakodnevnu dresuru i ranu socijalizaciju.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset hound, Basset",
      text: [
        "Baset je kratkonogi gonič iz Velike Britanije. Standard FCI-ja opisuje goniča znatne mase, skladnog, mirnog, nikad agresivnog ni plašljivog i privrženog, s nisko postavljenim, dugim, baršunastim ušima, glatkom, kratkom dlakom i bojama crno-bijelo-smeđom ili limun-bijelom. Breed Watch Royal Kennel Cluba traži od izložbenih sudaca da paze na kapke okrenute prema unutra ili van, vrlo duge uši, bolne kožne nabore i višak kože.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno te navodi životni vijek dulji od 10 godina. PDSA opisuje tolerantnog psa koji se vrlo dobro slaže s djecom i voli društvo, s dobrim apetitom na koji treba paziti; savjetuje da se kožni nabori pregledavaju svaki dan i da se ostavi razmak između hranjenja i kretanja. AKC dodaje da ga njuh može odvesti na krivi put, pa su važni pouzdan povodac i ograđeni prostori.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vižla, Magyar Vizsla, mađarski ptičar",
      text: [
        "Mađarska vižla elegantan je lovački pas srednje veličine iz Mađarske s kratkom dlakom boje zlatne hrđe. Standard FCI-ja opisuje živahnog, prijaznog psa ujednačene naravi kojeg je lako dresirati i koji održava blizak kontakt s vodičem; boje su nijanse zlatne hrđe i tamne pješčane zlatne. Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno te navodi životni vijek dulji od 12 godina. PDSA opisuje psa jako usmjerenog na ljude koji voli društvo i može patiti od separacijske anksioznosti kad ostane sam; dobro se slaže sa starijom djecom, ali ga PDSA ne bi preporučio uz vrlo malu djecu ni vlasnicima kojima je to prvi pas, a zbog jakog lovačkog nagona savjetuje da ne živi s manjim ljubimcima. PDSA savjetuje i razmak između hranjenja i kretanja.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "koker španijel, Cocker Spaniel (UK), English Cocker",
      text: [
        "Engleski koker španijel – u Britaniji jednostavno koker španijel – druga je pasmina od američkog koker španijela. Standard FCI-ja opisuje veselog, čvrstog, sportskog psa, skladnog i zbijenog, s nisko postavljenim režnjastim ušima i ravnom, svilenkastom dlakom; standard AKC-a naziva ga veselim i privrženim, staložene naravi, i navodi jednobojnu crnu, smeđu i nijanse crvene te višebojne varijante s bijelim. Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake te navodi životni vijek dulji od 10 godina; studija VetCompass o engleskim koker španijelima u UK-u utvrdila je medijan dobi u trenutku smrti od 11,44 godine. PDSA kaže da se zahvaljujući strpljivoj naravi obično dobro slaže s djecom, uvijek uz nadzor, ali upozorava da je poznat po separacijskoj anksioznosti i da nikad ne bi smio ostati sam dulje od četiri sata. PDSA savjetuje i svakodnevno četkanje te razmak između hranjenja i kretanja.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, malteški bišon",
      text: [
        "Maltezer je patuljasti pas sa središnjeg Sredozemlja, danas pod talijanskim pokroviteljstvom u FCI-ju. Standard FCI-ja opisuje malog psa produljenog tijela, živahnog, privrženog, vrlo mirnog i vrlo inteligentnog, teškog 3–4 kg, s vrlo dugom, gustom, svilenkastom dlakom koja teško pada niz cijelo tijelo. Dlaka nema poddlaku, a čisto bijela je jedina boja (dopušten je blijedi ton bjelokosti). Breed Watch Royal Kennel Cluba ne navodi točke zabrinutosti specifične za pasminu.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake, kaže da se pasmina ne linja i navodi životni vijek dulji od 12 godina. PDSA opisuje bistrog, prijaznog i privrženog psa koji može biti suzdržan prema strancima, ali uz pravu socijalizaciju u mladosti može naučiti biti samouvjeren i druželjubiv. PetMD upozorava da može razviti separacijsku anksioznost kad predugo ostaje sam, kaže da druženje s malom djecom mora biti pod nadzorom i savjetuje svakodnevno pranje zubi.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "mops, Carlin, Pug",
      text: [
        "Mops je mali pas za društvo iz Kine, danas pod britanskim pokroviteljstvom u FCI-ju. Standard FCI-ja opisuje izrazito kvadratnog i zbijenog psa – „multum in parvo“ – velikog šarma, dostojanstva i inteligencije te ujednačene, vesele i živahne naravi, idealne težine 6,3–8,1 kg, s finom, glatkom, kratkom i sjajnom dlakom srebrne, marelice, žute ili crne boje i repom čvrsto uvijenim preko kuka. Traži prilično velike, dobro otvorene nosnice, a stisnute nosnice i tešku boru iznad nosa smatra neprihvatljivima. Royal Kennel Club pasminu svrstava u kategoriju 3 programa Breed Watch, s točkama zabrinutosti koje uključuju otežano disanje, izbočene oči, dermatitis kožnih nabora i pretilost.",
        "PDSA mopsa naziva izrazito brahicefaličnom pasminom (spljoštenog lica) koja lako ostane bez daha, savjetuje izbjegavanje kretanja po vrućini i kaže da bi njegovi veterinari snažno preporučili pasminu s normalnom njuškom ili križanca mopsa. Royal Kennel Club preporučuje do 1 sata kretanja dnevno i njegu dlake jednom tjedno, kaže da se pasmina linja i navodi životni vijek dulji od 10 godina. PDSA opisuje psa koji se često dobro slaže s djecom i drugim ljubimcima, ali obožava društvo i ne podnosi dobro samoću; PetMD savjetuje svakodnevno čišćenje i sušenje kožnih nabora na licu i navodi da je pretilost česta u pasmini.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "kolij, Collie, dugodlaki kolij",
      text: [
        "Dugodlaki škotski ovčar (kolij) velik je ovčarski pas iz Velike Britanije. Standard FCI-ja opisuje psa velike ljepote, koji stoji s mirnim dostojanstvom, prijazne naravi i bez traga nervoze ili agresivnosti, s vrlo gustom dlakom i ravnom, oštrom pokrovnom dlakom te u tri boje: sobolj (sable), trobojna i plavi merle. Standard Royal Kennel Cluba naziva ga izvrsnim psom za društvo, prijaznim, veselim i aktivnim, dobrim s djecom i drugim psima, i navodi visinu od 56–61 cm za mužjake i 51–56 cm za ženke. Royal Kennel Club pasminu svrstava u kategoriju 2 programa Breed Watch i ne upisuje štenad iz parenja merle s merle.",
        "Royal Kennel Club preporučuje do 1 sata kretanja dnevno i svakodnevnu njegu dlake, kaže da se pasmina linja i navodi životni vijek dulji od 12 godina. PetMD kaže da su koliji privrženi, osobito djeci, i dobri s drugim životinjama, ali ne podnose dobro dugu samoću i kad su uzbuđeni mogu štipati za gležnjeve i pete. Navodi i da je socijalizacija šteneta presudna te da se kod kolija javlja mutacija MDR1, koja utječe na to kako pasji organizam obrađuje određene lijekove.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "engleski mastif, English Mastiff, Old English Mastiff",
      text: [
        "Mastif je vrlo velika čuvarska pasmina iz Velike Britanije. Standard FCI-ja opisuje spoj veličanstvenosti i hrabrosti – mirnog psa, privrženog vlasnicima, ali sposobnog za čuvanje – s glavom kvadratnog izgleda, širokim, dubokim i snažnim tijelom te kratkom, priljubljenom dlakom boje marelice, žutom ili tigrastom. PDSA navodi prosječnu visinu od 71–78 cm i prosječnu težinu od 80–85 kg te napominje da Kennel Club mastifa svrstava u kategoriju tri: pasmine s vidljivim problemima građe koji mogu uzrokovati bol, nelagodu ili zdravstvene probleme.",
        "PDSA za odrasle pse preporučuje oko sat vremena kretanja dnevno – ali bez pretjeranog napora dok se štenetu kosti i zglobovi još razvijaju – njegu dlake jednom tjedno uz svakodnevno čišćenje bora na licu i navodi prosječan životni vijek kraći od 10 godina. PetMD mastife naziva izvrsnim obiteljskim psima za domove s djecom koja znaju kako se ponašati sa životinjama, iako zbog svoje veličine možda nisu za domove s malom djecom ili bebama; obično se dobro slažu s drugim ljubimcima koje upoznaju kao štenad, jako sline i zbog rizika od torzije želuca ne bi se smjeli kretati sat vremena prije i poslije obroka.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "šiba, Shiba, japanski shiba inu",
      text: [
        "Shiba inu mali je špic iz Japana; ime mu znači „mali pas“, a prema Royal Kennel Clubu razvijen je za lov na sitnu pernatu divljač. Standard FCI-ja opisuje malog, skladnog psa dobrih kostiju, vjerne naravi, oštrih osjetila i velike budnosti, s oštrom pokrovnom dlakom preko meke, guste poddlake, malim uspravnim trokutastim ušima i debelim uvijenim repom; boje su crvena, crna s palež oznakama i sezam, uvijek s bjelkastim oznakama „urajiro“ na obrazima, prsima i donjem dijelu tijela. Standard AKC-a navodi prosječnu težinu od oko 23 funte (10 kg) za mužjake i 17 funti (8 kg) za ženke.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno, napominje da se pasmina linja i navodi životni vijek dulji od 10 godina; velika britanska studija utvrdila je medijan životnog vijeka od 14,6 godine. AKC opisuje samouvjerenog, neovisnog psa koji je bolji izbor za iskusnog vlasnika, najsretniji je sa starijom djecom i nikad ga ne bi trebalo puštati s povoca izvan ograđenog ili zatvorenog prostora. PetMD dodaje da treba mnogo misaonih poticaja, da mu koristi socijalizacija u dobi šteneta i da mu zube treba prati svaki dan.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridžbek, Rhodesian Ridgeback, rodezijski gonič lavova",
      text: [
        "Rodezijski ridgeback potječe iz južne Afrike. Najpoznatije mu je obilježje greben na leđima, pruga dlake koja raste u smjeru suprotnom od ostatka dlake. Standard FCI-ja opisuje skladnog, snažnog, mišićavog, okretnog i aktivnog psa, dostojanstvenog, inteligentnog i rezerviranog prema strancima, osobito cijenjenog kao čuvar i obiteljski ljubimac. Kratka, gusta dlaka je od svijetle do crvene boje pšenice, a standard navodi težinu od oko 36,5 kg za mužjake i 32 kg za ženke.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno, napominje da se pasmina linja i da joj odgovara velika kuća s velikim vrtom te navodi životni vijek dulji od 10 godina. PDSA opisuje razigrane, snažne i vrlo odane pse s vrlo jakim lovačkim nagonom, koji se ne preporučuju vlasnicima kojima je to prvi pas, nikad ne bi smjeli ostati sami dulje od četiri sata i trebaju socijalizaciju od malih nogu; savjetuje i razmak između hranjenja i kretanja. Woodgreen dodaje da najbolje odgovaraju starijoj djeci.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontinentalni patuljasti španijel, Phalène (varijanta s visećim ušima), pas leptir",
      text: [
        "Papillon je varijanta kontinentalnog patuljastog španijela s uspravnim ušima, pasmine iz Belgije i Francuske; varijanta s visećim ušima zove se phalène. Standard FCI-ja opisuje malog, elegantnog patuljastog španijela duge dlake i živahne naravi, visokog oko 28 cm i teškog do 4,5 kg (mužjaci) odnosno 5 kg (ženke). Velike uši nosi poput raširenih krila leptira, a dlaka je uvijek bijela s mrljama u boji.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake češće nego jednom tjedno, napominje da se pasmina linja i može živjeti u stanu te navodi životni vijek dulji od 12 godina. PDSA opisuje blage, razigrane, vrlo poslušne pse koji se dobro slažu sa svima i trebaju dresuru i socijalizaciju od malih nogu; predlaže njegu dlake dva do tri puta tjedno. PetMD dodaje da papilloni trebaju svakodnevne misaone poticaje, da mogu razviti separacijsku anksioznost i da im zube treba prati svaki dan te da vrlo mala djeca takvog malog psa mogu slučajno ozlijediti.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie",
      text: [
        "Portugalski vodeni pas potječe iz Portugala, gdje je radio s ribarima. Standard Royal Kennel Cluba opisuje robusnog, gotovo kvadratnog psa vrlo snažnih mišića – vrlo inteligentnog i iznimno energičnog, izvrsnog plivača i ronioca – visokog 50–57 cm (mužjaci) i 43–52 cm (ženke) i teškog 19–25 kg (mužjaci) i 16–22 kg (ženke). Obilna jednostruka dlaka nema poddlaku i dolazi u crnoj, bijeloj, smeđoj ili crnoj ili smeđoj s bijelim; tradicionalno „lavlje“ šišanje ostavlja njušku i stražnji dio tijela kratko ošišanima.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i svakodnevnu njegu dlake, napominje da se pasmina ne linja i da joj odgovara velika kuća te navodi životni vijek dulji od 10 godina. PDSA opisuje vrlo prijazne pse pune ljubavi koji se dobro slažu s drugim ljubimcima, izvrsni su obiteljski ljubimci i trebaju dresuru i socijalizaciju od malih nogu; dodaje i šišanje i oblikovanje dlake kod profesionalnog frizera za pse tijekom godine.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bišon, Bichon à poil frisé, Bichon Frisé",
      text: [
        "Kovrčavi bišon (bichon frisé) francusko-belgijski je pas za društvo. Standard FCI-ja opisuje veselog malog psa živahnog hoda i vrlo rahle, bijele dlake uvijene u spiralne kovrče – pravog pratitelja kojeg se može povesti posvuda, koji nije ni nervozan ni sklon čestom lajanju – visokog 25–29 cm u grebenu i teškog oko 5 kg. Odrasli pas uvijek je čisto bijel, s vrlo tamnim okruglim očima, crnim nosom, visećim ušima i operjanim repom nošenim preko leđa.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i svakodnevnu njegu dlake, napominje da se pasmina ne linja i da joj odgovara stan te navodi životni vijek dulji od 12 godina. PDSA opisuje vrlo privržene pse pune ljubavi koji su izvrsni s djecom i drugim ljubimcima i dodaje da dlaku treba skraćivati otprilike svaka dva mjeseca, često kod profesionalnog frizera za pse.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "njufaundlender, Newfoundland, Newfie",
      text: [
        "Novofundlandski pas potječe iz Kanade; FCI ga svrstava među molose planinskog tipa i priznaje tri boje: crnu, bijelo-crnu (landseer) i smeđu. PDSA novofundlandske pse naziva nježnim divovima i navodi prosječnu visinu od 66–71 cm i prosječnu težinu od 50–69 kg; PetMD dodaje da su zbog povijesti pasmine prirodni plivači.",
        "PDSA za odrasle pse preporučuje najmanje sat vremena kretanja dnevno, ali bez pretjeranog napora za štenad dok im se kosti i zglobovi još razvijaju; njegu dlake naziva svakodnevnim zadatkom, napominje da novofundlandski psi obično sline i navodi životni vijek kraći od 10 godina. PetMD pasminu naziva izvanrednim obiteljskim ljubimcem koji se dobro slaže s djecom, malim ljubimcima i drugim psima, savjetuje nadzor male djece uz svakog psa i upozorava da neki mogu razviti separacijsku anksioznost kad ostanu sami.",
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
        "Talijanski hrtić potječe iz Italije; FCI ga pod imenom Piccolo Levriero Italiano svrstava među kratkodlake hrtove. Standard Kennel Cluba opisuje hrta u malom, vitkijeg u svim proporcijama, elegantnog, gracioznog i brzog, inteligentnog, privrženog i živahnog, iako se može činiti rezerviranim, s kratkom, finom, sjajnom dlakom preko tanke kože. Navodi visinu od 32–38 cm i težinu od 3,6–4,5 kg; prihvaćene su crna, plava, krem, žuta, crvena i bijela boja ili bilo koja od njih prekinuta bijelim – nikad merle, tigrasta ni palež oznake.",
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
        "Pas svetog Huberta (bloodhound) potječe iz Belgije; FCI ga pod imenom Chien de Saint-Hubert vodi kao velikog goniča. Standard FCI-ja opisuje najsnažnijeg od svih goniča: blagog, mirnog, ljubaznog i druželjubivog prema ljudima i osobito vezanog uz vlasnika, s kratkom, gustom dlakom otpornom na vremenske uvjete i gipkom, labavom kožom. Mužjaci teže oko 46–54 kg, a ženke oko 40–48 kg; tri boje su crna s palež oznakama, smeđa s palež oznakama i crvena.",
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
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno, navodi da je dovoljna mala kuća s malim ili srednje velikim vrtom i kaže da pasmina treba njegu dlake češće nego jednom tjedno i da se linja; navodi životni vijek dulji od 12 godina i cardigana vodi kao ranjivu domaću britansku pasminu (vulnerable native breed). PDSA kaže da korgiji rado udovoljavaju, pa bi dresura trebala biti prilično laka, da je obično dovoljno četkanje dva do tri puta tjedno i da mogu štipati za pete djecu koja trče – pomažu socijalizacija s djecom i dresura od malih nogu.",
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
        "Bernardinac potječe iz Švicarske; FCI ga pod imenom St. Bernard svrstava među molose planinskog tipa. Standard FCI-ja opisuje psa prijazne naravi, mirnog do živahnog i budnog, i priznaje dvije varijante: kratkodlaku, s gustom, glatkom, priljubljenom dlakom, i dugodlaku. Mužjaci su visoki najmanje 70 cm, a ženke najmanje 65 cm, do 90 odnosno 80 cm; PDSA navodi težinu od 54–81 kg.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba njegu dlake češće nego jednom tjedno, da se linja i da obično živi kraće od deset godina. PDSA kaže da bernardinci vole biti s obitelji i izvrsni su s ljudima svih dobi, uključujući djecu, da ih kao štenad treba dobro socijalizirati, da trebaju četkanje najmanje tri puta tjedno, da sline, da ne podnose tako dobro vrućinu i da trebaju razmak između hranjenja i kretanja. PetMD dodaje da ti psi usmjereni na ljude mogu razviti separacijsku anksioznost ako dugo ostaju sami.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staford, Staffordshire bull terijer, Staffie",
      text: [
        "Stafordski bulterijer potječe iz Velike Britanije; FCI ga svrstava među terijere bul tipa. Standard FCI-ja opisuje kratkodlakog, skladnog psa velike snage s obzirom na veličinu – tradicionalno nesalomljive hrabrosti i upornosti, vrlo inteligentnog i privrženog, osobito djeci. Visok je 35,5–40,5 cm; mužjaci teže 12,7–17 kg, a ženke 11–15,4 kg. Dolazi u tigrastoj, crvenoj, žutoj, crnoj, plavoj ili bijeloj boji, samoj ili s bijelim.",
        "Royal Kennel Club naziva ga divnim obiteljskim ljubimcem i preporučuje do sat vremena kretanja dnevno; treba njegu dlake jednom tjedno, linja se i obično živi dulje od 12 godina. PDSA kaže da su stafordi tolerantni i blage naravi prema djeci, ali kao psi usmjereni na ljude poznati su po tome što pate od separacijske anksioznosti kad ostanu sami, a i po grizenju stvari, a zbog vrlo jakog lovačkog nagona manji ljubimci uz njih nisu dobra ideja.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, kralj terijera, Waterside Terrier",
      text: [
        "Airedale terijer potječe iz Velike Britanije; FCI ga svrstava među velike i srednje velike terijere. Standard FCI-ja naziva ga najvećim od terijera – mišićav, aktivan, prilično zbijen pas, otvoren i samouvjeren, prijazan, hrabar i inteligentan, uvijek budan, nije agresivan, ali je neustrašiv. Mužjaci su visoki oko 58–61 cm, a ženke oko 56–59 cm. Tvrda, gusta, žičasta dlaka palež je boje s crnim ili sivkastim sedlom.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno; dlaka treba svakodnevnu njegu i ne linja se, a pasmina obično živi dulje od 10 godina. PetMD opisuje izvrsne obiteljske pse koji se, ako su dobro školovani, obično slažu s djecom, ali ih ne bi trebalo predugo ostavljati same sebi; savjetuje četkanje nekoliko puta tjedno, kratko čišćenje ušiju svaki tjedan i odlazak profesionalnom frizeru za pse tri ili četiri puta godišnje.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Russell Terrier (AKC), Jack Russell, JRT",
      text: [
        "Jack Russell terijer – American Kennel Club zove ga Russell terijer – potječe iz Engleske, a razvijen je u Australiji; FCI ga svrstava među male terijere. Standard ga opisuje kao snažnog, aktivnog, gipkog radnog terijera snažnog karaktera: živahnog, budnog i aktivnog, odvažnog i neustrašivog, prijaznog, ali tiho samouvjerenog. Visok je 25–30 cm i težak oko 5–6 kg. Glatka, prijelazna ili oštra dlaka većinom je bijela s crnim i/ili palež oznakama.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake jednom tjedno; pasmina se linja i obično živi dulje od 10 godina. PDSA opisuje pametne, živahne pse koji mogu biti dobri obiteljski ljubimci ako su od malih nogu školovani i socijalizirani, ali više odgovaraju obiteljima s nešto starijom djecom; imaju vrlo jak lovački nagon, pa se manji ljubimci ne preporučuju, a obožavaju kopati.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "bulmastif, Bull Mastiff",
      text: [
        "Bulmastif je stara engleska čuvarska pasmina iz 19. stoljeća, nastala od buldoga i starog engleskog mastifa; FCI ga svrstava među molose. Standard ga opisuje kao snažnog, simetričnog psa koji pokazuje veliku snagu, ali nije nezgrapan – izdržljivog, aktivnog, pouzdanog, živahnog duha, budnog i vjernog. Mužjaci su visoki 64–69 cm i teški 50–59 kg, ženke 61–66 cm i 41–50 kg. Kratka, tvrda dlaka je u bilo kojoj nijansi žute, crvene ili tigraste boje, uvijek s crnom njuškom.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake jednom tjedno, a pasmina obično živi kraće od 10 godina. PDSA opisuje vrlo odane pse kojima zbog veličine i snage više odgovaraju kućanstva samo s odraslima ili obitelji sa starijom djecom; trebaju ranu socijalizaciju, idealno nekoga tko je stalno kod kuće, imaju vrlo jak lovački nagon, jako sline i trebaju razmak između hranjenja i kretanja.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "kineski kukmasti pas, Powder Puff",
      text: [
        "Kineski kukmasti pas mali je, aktivan i graciozan pas za društvo iz Kine; FCI ga svrstava među bezdlake pse. Postoji u dvije varijante: bezdlakoj, s glatkim golim tijelom i dlakom samo na glavi (kukma), stopalima i repu, te varijanti powder puff, potpuno prekrivenoj velom duge, meke dlake. Mužjaci su visoki 28–33 cm, a ženke 23–30 cm; PetMD navodi težinu od 8–12 funti (3,6–5,4 kg). Dopuštena je svaka boja osim merle, a narav mu se opisuje kao vesela, nikad opaka.",
        "Royal Kennel Club preporučuje do 30 minuta kretanja dnevno i njegu dlake jednom tjedno; odgovara mu stan, a pasmina obično živi dulje od 12 godina. PetMD opisuje prijaznog psa koji se uklapa u većinu obitelji, uključujući one s djecom i drugim ljubimcima – svako druženje s djecom treba biti pod nadzorom. Gola koža treba zaštitu od sunca i hladnoće, nokte treba pregledavati svaki tjedan, a štenad treba ranu, dosljednu socijalizaciju.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toler, Nova Scotia Duck Tolling Retriever, NSDTR",
      text: [
        "Novoškotski retriver (Nova Scotia duck tolling retriver), zvan toler, potječe iz Kanade; njegov standard FCI-ja opisuje kako trči i igra se uz obalu na vidiku pataka da bi ih namamio, a zatim ga šalju da donese ptice. Standard opisuje srednje velikog, snažnog, zbijenog i dobro omišićenog psa koji je vrlo inteligentan, lako se dresira i vrlo je izdržljiv. FCI navodi 48–51 cm i 20–23 kg za mužjake te 45–48 cm i 17–20 kg za ženke. Vodoodbojna dvostruka dlaka različitih je nijansi crvene ili narančaste, obično s bijelim na vrhu repa, stopalima, prsima ili kao lisa.",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i njegu dlake češće nego jednom tjedno, a pasmina se linja; PetMD savjetuje četkanje jednom do dvaput tjedno. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 13,2 godine, PetMD 12–14 godina, a kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD). AKC opisuje vrlo privržene pse koji su obično dobri s djecom, trebaju mnogo tjelesnog kretanja i misaonih poticaja, mogu imati jak lovački nagon prema manjim životinjama i imaju koristi od rane socijalizacije i škole za štenad.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "Cairn terijer potječe iz Velike Britanije; FCI ga svrstava među male terijere. Standard Kennel Cluba opisuje okretnog, budnog terijera radnog, prirodnog izgleda – aktivnog, srčanog i otpornog, neustrašive i vesele naravi, samouvjerenog, ali ne agresivnog. Dvostruka dlaka otporna na vremenske uvjete ima obilnu, oštru pokrovnu dlaku; boja je krem, boje pšenice, crvena, siva ili gotovo crna, tigrasti uzorak je prihvatljiv, a tamne uši i njuška tipični su. Navodi visinu od oko 28–31 cm i idealnu težinu od 6–7,5 kg.",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno i kaže da cairn terijeri imaju neiscrpnu energiju i jak lovački nagon, pa ih treba rano socijalizirati s mačkama i drugim malim ljubimcima i paziti kad su bez povoca, te da se nakon socijalizacije vrlo dobro slažu s djecom i izvrsni su obiteljski ljubimci. Savjetuje ručno trimanje dlake dvaput godišnje i njegu jednom do dvaput tjedno; Dogs Trust kaže da se vrlo malo linjaju. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 14,0 godine, PetMD 13–15 godina, a kao i drugi mali psi potpuno naraste s oko 9–12 mjeseci (PetMD). PetMD dodaje da trebaju mnogo kretanja i misaonih poticaja.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "bulterijer, English Bull Terrier, Bully",
      text: [
        "Bulterijer potječe iz Velike Britanije; FCI ga svrstava među terijere bul tipa (skupina 3). Riječ je o srednje velikom, kratkodlakom terijeru: PDSA navodi prosječnu visinu od 51–61 cm i prosječnu težinu od 22–31 kg, a PetMD opisuje atletsku građu od oko 21–22 inča i 50–70 funti. PetMD kaže da je redovito kretanje nužno i da su bulterijeri privrženi obitelji, uključujući djecu, ali nisu uvijek prijazni prema drugim psima ili mačkama te da su rana i česta socijalizacija i dresura ključne.",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno, raspoređeno tijekom dana, i razmak nakon obroka prije kretanja. Kaže da se dobro socijalizirani bulterijer slaže s ljudima svih dobi, ali je, budući da se lako uzbudi, bolji sa starijom djecom; voli društvo što je više moguće i ima jak lovački nagon, pa je potreban oprez uz mačke i druge male životinje. Za dlaku je dovoljno četkanje jednom tjedno. PDSA navodi prosječan životni vijek dulji od 10 godina, a PetMD 12–13 godina; kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Min Pin, Zwergpinscher",
      text: [
        "Patuljasti pinč potječe iz Njemačke; FCI ga svrstava među pinčere i šnaucere (skupina 2) i opisuje ga kao umanjenu sliku njemačkog pinča – živahnog, vatrenog, samouvjerenog i ujednačene naravi. Dlaka mu je kratka, gusta, glatka i sjajna, jednobojna od jelenje crvene do tamne crvenosmeđe ili crna s palež oznakama, a rep je prirodan. Standard FCI-ja navodi visinu od 25–30 cm i težinu od 4–6 kg za mužjake i ženke; kao i drugi patuljasti psi potpuno naraste s oko 8–12 mjeseci (PetMD).",
        "PDSA za te energične, užurbane male pse preporučuje do pola sata kretanja dnevno, kaže da je za dlaku obično dovoljno četkanje jednom tjedno i napominje da znaju biti tvrdoglavi i neovisni, pa dresura traži vježbu i strpljenje. PetMD kaže da uz pravu socijalizaciju i dresuru mogu biti izvrsni obiteljski ljubimci. VCA opisuje pasminu kao razigranu i vrlo dobru s djecom, iako psa vrlo mala ili neposlušna djeca mogu ozlijediti grubom igrom, i kaže da je zbog tanke dlake i male veličine osjetljiv na hladnoću. PDSA navodi prosječan životni vijek dulji od 12 godina, a PetMD 12–16 godina.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "pirinejac, Great Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Pirinejski planinski pas – u Sjedinjenim Američkim Državama zvan Great Pyrenees – potječe iz Francuske; FCI ga svrstava među molose planinskog tipa (skupina 2) i opisuje vrlo velikog psa, impozantnog i snažne građe, ali ne bez određene elegancije. Dlaka je bijela ili bijela s mrljama boje jazavca, vučje sive, blijedožute ili narančaste na glavi i ušima. Standard FCI-ja navodi visinu od 70–80 cm za mužjake i 65–75 cm za ženke; PDSA navodi prosječnu težinu od 40–50 kg. Kao i drugi divovski psi potpuno naraste s oko 18–24 mjeseca (PetMD).",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara velika kuća s velikim vrtom, da treba njegu dlake češće nego jednom tjedno i da se linja te navodi životni vijek kraći od 10 godina (PetMD i VCA navode 10–12 godina). PDSA ih naziva nježnim divovima – mirnim, dobroćudnim psima koji se obično dobro slažu sa svima – i kaže da dresura traži strpljenje i metode s nagradama. VCA kaže da je pirinejac odan obitelji, osobito djeci, i da je rana socijalizacija vrlo važna; PetMD kaže da dobro živi s drugim ljubimcima, ali možda najbolje odgovara domovima bez manje djece, i zbog rizika od torzije želuca savjetuje izbjegavanje napornog kretanja oko obroka.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten terijer, Wheaten, Irish Soft Coated Wheaten Terrier, SCWT",
      text: [
        "Irski mekodlaki pšenični terijer potječe iz Irske; FCI ga pod imenom Irish Soft Coated Wheaten Terrier svrstava među velike i srednje velike terijere. Standard Royal Kennel Cluba opisuje srednje velikog, zbijenog, uspravnog terijera s mekom, svilenkastom dlakom boje pšenice koja pada u labavim kovrčama ili valovima – dobroćudnog, živahnog i srčanog, punog samopouzdanja i humora. Jedina boja je čista, jasna boja pšenice. PDSA navodi prosječnu visinu od 46–49 cm i prosječnu težinu od 16–20,5 kg (standard Kennel Cluba za mužjake navodi 16–20,5 kg, za ženke nešto manje); kao i drugi srednje veliki psi potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "Royal Kennel Club preporučuje do sat vremena kretanja dnevno i kaže da pasmini odgovara mala kuća, da treba svakodnevnu njegu dlake i da se ne linja. Velika britanska studija (McMillan 2024, prema Dogs Trustu) navodi medijan očekivanog životnog vijeka od 13,7 godine; PetMD i VCA navode 12–14 godina. PDSA ih naziva prijaznim, pouzdanim psima koji su izvrsni obiteljski ljubimci, iako znaju biti pomalo tvrdoglavi. VCA kaže da ih blaga, razigrana narav čini dobrim izborom za djecu; PetMD kaže da druženje s djecom treba nadzirati, da ne vole dugo ostajati sami i savjetuje profesionalnu njegu dlake svaka četiri do šest tjedana, kupanje otprilike jednom mjesečno i čišćenje ušiju svakih jedan do dva tjedna.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Wolfhound, Cú Faoil, Irish Wolf Hound",
      text: [
        "Irski vučji hrt potječe iz Irske; FCI ga svrstava među oštrodlake hrtove. PDSA navodi prosječnu visinu od 71–79 cm i prosječnu težinu od 40–55 kg; kao i drugi divovski psi potpuno naraste s oko 18–24 mjeseca (PetMD). Royal Kennel Club njegovu veličinu naziva iznimno velikom i kaže da mu odgovara velika kuća s velikim vrtom na selu.",
        "Royal Kennel Club preporučuje više od dva sata kretanja dnevno i njegu dlake češće nego jednom tjedno te kaže da se pasmina linja. Kennel Club i PDSA navode životni vijek kraći od 10 godina; PetMD navodi 6–8 godina. PDSA zbog veličine i snage ne preporučuje pasminu domovima s manjom djecom, a zbog jakog lovačkog nagona ni uz manje ljubimce, i kaže da nikad ne bi smio ostati sam dulje od četiri sata. PetMD savjetuje socijalizaciju šteneta od dana kad dođe kući, bez kretanja neposredno prije ili poslije jela (torzija želuca) i čišćenje ušiju svaka dva do četiri tjedna.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaf, AmStaff, Staffordshire Terrier",
      text: [
        "Američki stafordski terijer potječe iz SAD-a; FCI ga svrstava među terijere bul tipa. Standard traži veliku snagu s obzirom na veličinu i navodi visinu od 46–48 cm za mužjake i 43–46 cm za ženke, ali ne i težinu. PetMD navodi 40–70 funti (oko 18–32 kg) za oba spola; pas te veličine potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "PetMD preporučuje najmanje 60 minuta kretanja dnevno i kaže da je pasmina strpljiva i puna ljubavi prema djeci, da može biti sklona separacijskoj anksioznosti i da joj jak lovački nagon može otežati život s manjim psima ili mačkama. Britanska studija (McMillan i sur., 2024, u tablici Dogs Trusta) navodi medijan očekivanog životnog vijeka od 12,5 godine; PetMD navodi 12–16 godina. VCA preporučuje četkanje jednom tjedno; PetMD savjetuje socijalizaciju šteneta, bez kretanja odmah nakon obroka (torzija želuca) te kupanje i čišćenje ušiju otprilike svakih 4–6 tjedana.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, romanjski vodeni pas, pas za tartufe",
      text: [
        "Lagotto romagnolo mali je do srednje velik kovrčavi vodeni pas iz Italije, poznat kao pas za tartufe; FCI ga svrstava među pse za vodu. Standard navodi visinu od 43–48 cm i težinu od 13–16 kg za mužjake te 41–46 cm i 11–14 kg za ženke; pas te veličine potpuno naraste s oko 12–15 mjeseci (PetMD).",
        "Royal Kennel Club naziva ga izvrsnim i budnim obiteljskim pratiteljem, preporučuje više od dva sata kretanja dnevno i njegu dlake češće nego jednom tjedno, kaže da se ne linja i navodi životni vijek dulji od 12 godina; PetMD kaže da lagotti mogu doživjeti 15–17 godina. PetMD napominje da treba stalne misaone i tjelesne poticaje i opsežnu socijalizaciju jer može biti sramežljiv; Woodgreen kaže da mu može biti teško kad prečesto ostaje sam i preporučuje profesionalnu njegu dlake svakih šest do osam tjedana.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamut, Malamute, Mal",
      text: [
        "Aljaški malamut jedan je od najstarijih arktičkih pasa za saonice: snažan, čvrsto građen nordijski pas za saonice iz SAD-a s gustom, grubom dlakom. Standard FCI-ja navodi poželjne veličine od 63,5 cm i 38 kg za mužjake te 58,5 cm i 34 kg za ženke; PDSA navodi 58–64 cm i 34–39 kg. Pas te veličine potpuno naraste s oko 15–18 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 10 godina (PetMD: 10–14 godina).",
        "PDSA preporučuje najmanje dva sata napornog kretanja i četkanje svaki dan i kaže da se malamuti jako linjaju, imaju vrlo jak lovački nagon, ne bi smjeli ostati sami dulje od četiri sata i odgovaraju aktivnim odraslima ili obiteljima sa starijom djecom; za vlasnike kojima je to prvi pas naziva ih zahtjevnima. PetMD savjetuje pregled ušiju jednom tjedno i kupanje svakih 6–8 tjedana te napominje da im zbog guste dlake vruće vrijeme teško pada.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "afrički pas koji ne laje, Congo Dog",
      text: [
        "Basenji je lagano građen lovački pas finih kostiju iz Srednje Afrike koji ne laje, nego proizvodi vlastiti zvuk nalik jodlanju; FCI ga svrstava među pse primitivnog tipa. PDSA navodi visinu od 40–43 cm i težinu od 9–11 kg. Pas te veličine potpuno naraste s oko 9–12 mjeseci (PetMD), a PDSA navodi životni vijek dulji od 12 godina (WebMD: 13–14 godina).",
        "PDSA preporučuje najmanje sat vremena kretanja dnevno (oko 60–90 minuta), mnogo misaonih poticaja i četkanje jednom tjedno; basenjije naziva suzdržanima, ali pouzdanima, snažne volje i s vrlo slabim osjećajem za promet. WebMD kaže da će juriti za svime što izgleda kao plijen, da trebaju vrlo visoke ograde ili stalan nadzor i da su s malom djecom tek umjereno dobri te savjetuje čišćenje ušiju jednom tjedno i pranje zubi najmanje dvaput tjedno.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Blue, britanska plava",
      text: [
        "Britanska kratkodlaka mačka čvrsta je mačka guste dlake i velikih okruglih očiju – CFA je naziva mačkom „medvjedićem“. Većina je ljudi zamišlja plavosivom, ali dolazi u nizu boja i uzoraka. Sporo sazrijeva: CFA kaže da punu veličinu dostiže s otprilike tri godine, a VCA da tjelesna zrelost može potrajati i do pet.",
        "CFA je opisuje kao vrlo privrženu i vezanu uz svoje ljude; slaže se sa svima u kućanstvu bez obzira na dob, ali obično ne voli da je se nosi, a živjela je i sa psima, kunićima i pticama. VCA opisuje umjerenu razinu aktivnosti i savjetuje češljanje dlake najmanje jednom tjedno. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA opisuje ragdoll kao veliku, opuštenu mačku s poludugom, plišanom i svilenkastom dlakom i plavim očima. Tamnije „točke“ (points) dolaze u nekoliko uzoraka – colourpoint bez bijelog, mitted s bijelim šapama, bicolour s više bijelog i van. Sporo sazrijeva: punu boju dlake dostiže s dvije godine, a punu veličinu i težinu s otprilike četiri.",
        "CFA opisuje blagu mačku koja te dočeka na vratima i prati iz sobe u sobu, a obično se igra bez izvlačenja pandži. PetMD je naziva dobrim izborom za obitelji, uključujući one s djecom, ali savjetuje polagano upoznavanje s djecom i drugim ljubimcima uz nadzor i kaže da nekim ragdollima treba češljanje samo jednom ili dvaput tjedno, dok CFA savjetuje redovito češljanje. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibirska šumska mačka, Siberian",
      text: [
        "GCCF opisuje sibirsku mačku kao mačku koja se sporo razvija, s gustom dlakom otpornom na vremenske uvjete: gustom, mekom poddlakom ispod grublje pokrovne dlake, koja se u proljeće i jesen jako linja. Mužjaci teže oko 7,7–11,8 kg, a ženke 5,9–7,7 kg, puni razvoj može potrajati četiri do pet godina, a GCCF navodi životni vijek od 12 do 15 godina ili dulje.",
        "GCCF je naziva energičnom i zaigranom, a ipak strpljivom – dobrim izborom za obitelji s malom djecom – i kaže da se dobro slaže s drugim životinjama, uključujući pse. PetMD savjetuje češljanje najmanje jednom tjedno, uz dodatni trud dok se linja u proljeće i jesen, i napominje da se sibirske mačke ne smatraju hipoalergenima. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine Coon, mejnkun",
      text: [
        "Maine coon općenito se smatra jednom od najvećih pasmina domaćih mačaka, s mišićavim, pravokutnim tijelom, širokim prsima, velikim šapama i dugim, lepršavim repom. TICA navodi prosječnu težinu od oko 5,9–8,2 kg za zrele mužjake i 4,1–5,9 kg za ženke, a CFA napominje da neki mužjaci teže više od 9 kg. Raste polako: prema CFA-u često se potpuno razvije tek s tri ili četiri godine, a TICA kaže da puna zrelost može potrajati tri do pet godina.",
        "TICA je opisuje kao blagu, prijaznu i razigranu, a CFA kao druželjubivu, odanu i inteligentnu; često „govori“ cvrkutavim trilerom umjesto mijaukanja. Vetstreet piše da se maine coon mačke slažu sa svima, uključujući djecu, pse i druge mačke. Teška, poluduga dlaka kraća je na ramenima, a dulja na ovratniku, trbuhu i stražnjem dijelu tijela. Izvori se razlikuju u njezi: Vetstreet kaže da je dovoljno češljanje jednom tjedno, CFA savjetuje četkanje ili češljanje barem nekoliko puta tjedno, a TICA napominje da gušća dlaka može trebati svakodnevno češljanje. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalska mačka, Bengal",
      text: [
        "PDSA opisuje bengalsku mačku kao vrlo inteligentnu i energičnu mačku kojoj treba mnogo misaonih poticaja i prilika za kretanje i koja voli visoko promatračko mjesto poput penjalice za mačke. Privržena je, ali će se prije sklupčati pokraj tebe nego u tvom krilu, a zna biti i prilično glasna. VCA napominje da bengalske mačke rastu polako i da im tjelesna zrelost može potrajati i do dvije godine.",
        "Kratka, mekana, točkasta ili mramorasta dlaka treba samo lagano četkanje ili češljanje jednom tjedno (PDSA). PetMD napominje da bengalska mačka možda nije najbolji izbor za obitelji s malom djecom, dok psi i druge mačke uz pravilno upoznavanje mogu biti u redu. Pasmina je nastala križanjem azijske leopardske mačke i domaćih mačaka; PetPrep prikazuje samo registriranu domaću bengalsku mačku. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Wegie, Skogkatt, norveška šumska",
      text: [
        "GCCF opisuje norvešku šumsku mačku kao blagu i prijaznu mačku koja uživa biti dio obitelji. Sporo sazrijeva i ne smatra se potpuno odraslom do otprilike četiri do pet godina; mužjaci teže oko 5,4–7,3 kg, a ženke 4,1–5,4 kg, a GCCF navodi životni vijek od 14 do 16 godina.",
        "Ima mnogo energije, uživa u interaktivnim igrama i rado se penje; GCCF kaže da je tolerantna prema djeci koja se prema njoj odnose s poštovanjem, drugim mačkama i psima naviklima na mačke. PetMD savjetuje češljanje i četkanje najmanje jednom tjedno, češće dok se linja u proljeće i jesen, i napominje da separacijska anksioznost može biti problem ako često dugo ostaje sama. Rodovnički mačići obično odlaze u novi dom s 12–13 tjedana (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default hr;
