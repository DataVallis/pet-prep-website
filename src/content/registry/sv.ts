import type { RegistryCopy } from "./types";

/** Swedish plural: one / other ("1 ras", "2 raser", "1,5 timmar"). */
const s = (n: number, one: string, other: string) => (n === 1 ? one : other);
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = "\u00a0";
/** Lower case for values that continue a phrase ("Hundar" → "hundar", "Upp till 1 timme" → "upp till 1 timme"). */
const lc = (t: string) => t.toLocaleLowerCase("sv");
const cap = (t: string) => t.charAt(0).toLocaleUpperCase("sv") + t.slice(1);
/**
 * Breed names are common nouns in Swedish and are written in lower case in running text, place and person names included
 * ("tysk schäferhund", "cavalier king charles spaniel", "maine coon"); they keep the capital only at the start of a sentence.
 */
const mid = (name: string) => lc(name);
/** "Hundar" → "hundraser", "Katter" → "kattraser" (compound); other species: "raser (fåglar)". */
const breedsOf = (many: string, n: number) => {
  const m = lc(many);
  const kind = m === "hundar" ? "hund" : m === "katter" ? "katt" : null;
  return kind ? `${kind}${s(n, "ras", "raser")}` : `${s(n, "ras", "raser")} (${m})`;
};
/** Swedish ordinal with colon: 1:a, 2:a, 3:e, 7:e, 11:e, 21:a. */
const ord = (n: number) => `${n}:${(n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? "a" : "e"}`;
/** "11:00" → "11.00" (Swedish clock times). */
const clock = (t: unknown) => String(t).replace(":", ".");
/** Singular of a formatted unit noun after "var …" ("var 7:e dag", "varannan vecka", "vart 2:a år"). */
const SING: Record<string, { one: string; neuter?: boolean }> = {
  dag: { one: "dag" },
  dagar: { one: "dag" },
  vecka: { one: "vecka" },
  veckor: { one: "vecka" },
  månad: { one: "månad" },
  månader: { one: "månad" },
  år: { one: "år", neuter: true },
};
const every = (t: string) => {
  const m = /^(\d+)[\s ](\p{L}+)$/u.exec(t);
  const w = m ? SING[m[2]] : undefined;
  if (!m || !w) return `med ${t}s mellanrum`;
  const n = Number(m[1]);
  const v = w.neuter ? "vart" : "var";
  if (n === 1) return `varje ${w.one}`;
  if (n === 2) return `${v}annan ${w.one}`;
  return `${v} ${ord(n)} ${w.one}`;
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as Svenska Kennelklubben (SKK) uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "vallhundar och boskapshundar",
  2: "pinscher och schnauzer, molosser samt schweiziska sennen- och boskapshundar",
  3: "terrier",
  4: "taxar",
  5: "spetsar och raser av urhundstyp",
  6: "drivande hundar samt sök- och spårhundar",
  7: "stående fågelhundar",
  8: "apporterande hundar, stötande hundar och vattenhundar",
  9: "sällskapshundar",
  10: "vinthundar",
};
const origins: Record<string, string> = { GB: "Storbritannien", FR: "Frankrike", DE: "Tyskland", US: "USA", CU: "Kuba", CH: "Schweiz", IT: "Italien", "CN-XZ": "Tibet (Kina)", CN: "Kina", MX: "Mexiko", BE: "Belgien", HU: "Ungern", JP: "Japan", ZA: "Sydafrika", "BE-FR": "Belgien / Frankrike", PT: "Portugal", CA: "Kanada", HR: "Kroatien", AU: "Australien", RU: "Ryssland", IE: "Irland", "AF-C": "Centralafrika", TR: "Turkiet" };
const hours = (n: number) => s(n, "timme", "timmar");

const sv: RegistryCopy = {
  mistakes: {
    title: (breed) => `Vanliga misstag bland ägare till ${mid(breed)}`,
    intro: "Små vanor som leder till större problem – varje punkt bygger på källorna om den här rasen.",
    exercise: "För lite motion varje dag",
    exerciseText: (amount) => `Motionsbehov: ${amount}. Planera in det varje dag, inte bara på helgerna.`,
    coat: "Att hoppa över pälsvården",
    coatText: (brushing, shedding) => `Borstning: ${brushing}.${shedding ? ` ${cap(shedding)}.` : ""}`,
    weight: "För många godbitar och för stora måltider",
    heat: "Promenader i värmen",
    growth: "Att glömma att valpen fortfarande växer",
    growthText: (growthEnd) =>
      `Fullvuxen storlek nås vid ${growthEnd}. Fram till dess ska du planera motion och mat för ett ungt djur som fortfarande växer – fråga veterinären vad som passar just ditt djur.`,
    mind: "För lite mental stimulans",
    health: "Att förbise rasens kända hälsoproblem",
    practise: "I PetPrep övar barnet just de här vanorna – steg, måltider, skötsel – innan det riktiga husdjuret kommer hem.",
  },
  hub: {
    title: "Lär känna djuret innan det flyttar hem.",
    intro:
      "Vad varje art och ras i PetPrep verkligen behöver – från kennelklubbar, kattförbund, djurvälfärdsorganisationer och studier, med länk till varje källa. Dessutom reglerna som PetPrep använder för att simulera dem.",
    breedCount: (n) => `${n} ${s(n, "ras", "raser")} i registret`,
    open: "Se raserna",
    openA11y: (many) => `Se raserna: ${lc(many)}`,
    freePlan: (name, activity) => `Gratisversion: ${lc(name)} (${activity} som vuxen). Den har ingen egen rassida.`,
    otherSpecies: "Fler djur är planerade.",
    methodTitle: "Så bygger vi registret",
    method: [
      "Varje uppgift kommer från en namngiven källa – kennelklubbar, kattförbund, djurvälfärdsorganisationer och föreningar samt vetenskapligt granskade studier – och länkar till den. Rasstandarder sammanfattar vi med egna ord.",
      "Värden som ingen källa stöder visas aldrig som fakta. När PetPrep måste välja ett tal för spelet står det bara under ”Så simulerar PetPrep rasen”, märkt som en spelregel.",
      "Samma data styr appen: etiketterna, antalet måltider, stegmålen och lekstunderna på de här sidorna är exakt de som husdjuret i appen använder.",
      "Registret är inte veterinärrådgivning. Hälsoinformationen är bara vägledande och har inte granskats av en veterinär.",
    ],
  },
  speciesStatus: { available: "I appen", coming_soon: "Snart i appen", info_only: "Endast information" },
  availability: {
    in_app: { label: "I appen", text: "Finns i PetPreps 12-veckorsutmaning (betald ras)." },
    coming_soon: { label: "Snart i appen", text: "Färdigbyggd och testad. Kommer i en senare version av appen." },
    info_only: { label: "Endast information", text: "Finns i registret som information; du kan inte adoptera den i appen än." },
  },
  catalogue: {
    eyebrow: "Djurregister",
    title: (many) => `${many}: raser i registret`,
    lead: (many, count) =>
      `${count} ${breedsOf(many, count)} med behov enligt källorna, vilka de passar för och hur PetPrep simulerar dem. Sök, filtrera och jämför upp till tre.`,
    metaTitle: (many) => `${cap(breedsOf(many, 2))} – rasregister med källor | PetPrep`,
    metaDescription: (many) =>
      `Sök och jämför ${breedsOf(many, 2)} efter behov, storlek och vilka de passar för. Varje uppgift länkar till sin källa – plus reglerna som PetPrep använder för att simulera varje ras.`,
    searchLabel: "Sök raser",
    searchPlaceholder: "Namn, t.ex. labrador",
    filtersTitle: "Filter",
    any: "Alla",
    availabilityLabel: "I PetPrep",
    sortLabel: "Sortera",
    sort: { recommended: "I appen först", az: "A–Ö", size: "Storlek (liten till stor)" },
    clear: "Rensa alla filter",
    results: (total) => `{n} av ${total} ${s(total, "ras", "raser")}`,
    none: "Ingen ras matchar. Prova med färre filter.",
    loading: "Sökningen laddas …",
    page: "Sida {n} av {total}",
    prev: "Föregående",
    next: "Nästa",
    compareAdd: "Jämför {name}",
    compareBar: "{n} av {max} valda för jämförelse",
    compareGo: "Jämför",
    compareMax: "Du kan jämföra högst {max} raser.",
    azTitle: "Alla raser A–Ö",
    azIntro: "Alla raser i registret i bokstavsordning.",
    freePlanTitle: "Gratisversion",
    guideTitle: "Så väljer du ras",
    guide: () => [
      "Börja med vad ditt hushåll kan ge varje dag: tid för motion, pälsvård och utrymme. Varje rassida visar de här behoven i korthet, med den namngivna källan till varje värde; när källorna skiljer sig åt visas alla värden.",
      "När en ras har en storleksklass (för hundar: mycket liten, liten, medelstor, medelstor till stor, stor eller jättestor) är det den klass som den namngivna källan anger – oftast en kennelklubb – och vikterna är de intervall som källorna anger, inte våra uppskattningar.",
      "Etiketter som ”Passar bra för: en aktiv familj” är desamma som i appen, och var och en stöds av källor. Siffrorna under ”Så simulerar PetPrep rasen” är PetPreps spelregler, inte skötselråd. [Så bygger vi registret](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Jämför ${breedsOf(many, 2)}`,
    metaTitle: (many) => `Jämför ${breedsOf(many, 2)} | PetPreps register`,
    intro: "De viktigaste behoven sida vid sida, från samma källor som rassidorna.",
    pick: "Välj två eller tre raser i katalogen för att jämföra dem.",
    back: "Tillbaka till katalogen",
    remove: "Ta bort {name}",
    note: "Värdena anges så som den namngivna källan anger dem. När källorna skiljer sig åt listar rassidan varje värde.",
    availabilityRow: "I PetPrep",
    activityRow: "Dagligt mål som vuxen i PetPrep (spelregel)",
  },
  facets: {
    size: { label: "Storlek", values: { toy: "Mycket liten", small: "Liten", small_medium: "Liten till medelstor", medium: "Medelstor", medium_large: "Medelstor till stor", large: "Stor", giant: "Jättestor" } },
    exercise: { label: "Daglig motion", values: { under_1h: "Upp till 1 timme", h1_2: "1–2 timmar", over_2h: "Mer än 2 timmar" }, line: (v) => `${lc(v)} om dagen` },
    grooming: { label: "Borstning", values: { weekly: "En gång i veckan", several_weekly: "Flera gånger i veckan", daily: "Varje dag", other: "Annat" }, line: (v) => `borstning: ${lc(v)}` },
  },
  groups: {
    exercise: "Motion",
    play: "Lek",
    litter: "Kattlåda",
    scratching: "Klösning",
    grooming: "Päls och pälsvård",
    feeding: "Måltider",
    water: "Vatten",
    lifespan: "Livslängd",
    stages: "Livsstadier",
    size: "Storlek och vikt",
    training: "Träning",
  },
  fields: {
    size: "Storlek",
    height: "Mankhöjd",
    weight: "Vikt som vuxen",
    growth_end: "Fullvuxen storlek vid",
    lifespan: "Livslängd",
    exercise: "Daglig motion",
    coat: "Päls",
    grooming_frequency: "Borstning",
    grooming_level: "Pälsvårdsbehov",
    shedding: "Fällning",
    litter_scoop: "Rensa kattlådan",
    litter_full_change: "Byt all kattsand",
    litter_pee: "Urinerar (vuxen)",
    litter_poo: "Avföring (vuxen)",
    water_need: "Vattenbehov",
    sleep: "Sömn (vuxen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 veckor",
    puppy_3_6_months: "3–6 månader",
    puppy_6_12_months: "6–12 månader",
    kitten_6_12_weeks: "6–12 veckor",
    kitten_3_6_months: "3–6 månader",
    kitten_6_12_months: "6–12 månader",
    puppy: "Valp",
    kitten: "Kattunge",
    young_adult: "Ung vuxen",
    mature_adult: "Mogen vuxen",
    adult: "Vuxen",
    senior: "Senior",
  },
  categories: {
    size: { toy: "mycket liten", small: "liten", small_medium: "liten till medelstor", medium: "medelstor", medium_large: "medelstor till stor", large: "stor", giant: "jättestor" },
    coat: { moderately_long: "halvlång", smooth: "slät (kort)", short: "kort", medium: "medellång", short_long: "kort eller lång (två pälsvarianter)", long: "lång" },
    grooming_frequency: {
      at_least_once_a_week: "minst en gång i veckan",
      at_least_once_or_twice_a_week: "minst en eller två gånger i veckan",
      once_a_week: "en gång i veckan",
      more_than_once_a_week: "mer än en gång i veckan",
      daily: "dagligen",
      every_day: "varje dag",
    },
    grooming_level: { moderate: "måttliga", high: "höga", low: "låga" },
    shedding: { yes: "fäller", no: "fäller inte (det är inte samma sak som allergivänlig)", high: "fäller mycket", moderate: "fäller måttligt", low: "fäller lite", minimal: "fäller minimalt" },
  },
  statements: {
    food_motivated: () => "Mycket matmotiverad – det hjälper i träningen, men håll koll på portionerna.",
    coren_rank: (v) => `Nr ${String(v)} i Stanley Corens rangordning av arbets- och lydnadsintelligens.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-standard nr ${x.number}, grupp ${x.group} (${fciGroups[x.group] ?? "—"}); ursprung: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Lek: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} lekstunder à ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}minuter om dagen.`;
    },
    kittens_play_more: () => "Kattungar behöver leka oftare.",
    scratching_natural: () => "Att klösa är naturligt och nödvändigt: ge katten en klösmöbel och straffa den aldrig för att den klöser.",
    water_fresh: () => "Ha alltid färskt vatten framme; diska och fyll på skålen varje dag.",
    grooming_sources_differ: () => "Källorna är oense om kamningen: från varje dag till en gång i veckan.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `median ${t}`,
    more_than: (t) => `mer än ${t}`,
    less_than: (t) => `mindre än ${t}`,
    at_least: (t) => `minst ${t}`,
    up_to: (t) => `upp till ${t}`,
    ideal: (t) => `idealt (rasstandard): ${t}`,
    mean: (t) => `uppmätt medelvärde: ${t}`,
    about: (t) => `cirka ${t}`,
    until: (t) => `fram till ${t}`,
    until_about: (t) => `fram till cirka ${t}`,
    span: (t) => t,
    from: (t) => `från ${t}`,
    last: (t) => `de sista ${t}`,
    every: (t) => every(t),
    expectancy: (t) => `förväntad livslängd vid födseln: ${t}`,
    smaller_meals: (t) => `${t}, mindre portioner`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t) => `${t}${NB}år`,
    months: (t, n) => `${t}${NB}${s(n, "månad", "månader")}`,
    days: (t, n) => `${t}${NB}${s(n, "dag", "dagar")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} om dagen` : `${t}${NB}minuter om dagen`),
    meals_per_day: (t, n) => `${t}${NB}${s(n, "måltid", "måltider")} om dagen`,
    times_per_day: (t, n) => `${t}${NB}${s(n, "gång", "gånger")} om dagen`,
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} om dagen`,
    ml_per_kg_day: (t) => `${t}${NB}ml per kg kroppsvikt och dag`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% av den förväntade livslängden`,
  },
  males: "hanar",
  females: "honor",
  or: " eller ",
  notes: { size_class_guidance: "riktvärde för storleksklassen" },
  stageLabels: {
    dog: { puppy: "Valp", young: "Unghund", adult: "Vuxen", senior: "Senior" },
    cat: { puppy: "Kattunge", young: "Ung katt", adult: "Mogen katt", senior: "Senior" },
  },
  activity: {
    steps: (n) => `${n}${NB}steg`,
    steps_range: (from, to) => `${from} → ${to}${NB}steg`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth}${NB}steg per levnadsmånad (${first} vid ankomsten), högst ${cap} från månad ${capMonth}`,
    play_sessions: (n) => `${n} ${s(n, "lekstund", "lekstunder")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Stegmål = minuter daglig motion × ${p.per_minute}${NB}steg: ett vuxet djur får ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}minuter`}, alltså ${f.num(p.steps)}${NB}steg om dagen.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Lär sig kommandon långsammare än gratisversionens blandras (${f.num(p.multiplier)}× dess tempo).`
        : p.multiplier === 1
          ? "Lär sig kommandon lika snabbt som gratisversionens blandras."
          : `Lär sig kommandon ${f.num(p.multiplier)}× så snabbt som gratisversionens blandras.`,
    senior_share: (p, f) => `Blir senior i månad ${p.months} (${f.num(p.months / 12, 1)}${NB}år) – den sista fjärdedelen av rasens förväntade livslängd.`,
    walk_sensor: () => "Promenaderna räknar verkliga steg från Apple Hälsa eller Health Connect (med tillstånd, endast läsning) och mobilens rörelsesensor – ingen GPS.",
    play_instead_of_steps: (p, f) =>
      `Inga promenader: en vuxen katt behöver ${p.sessions} ${s(p.sessions, "lekstund", "lekstunder")} om dagen med ett lekspö, med minst ${f.num(p.gap_minutes / 60)}${NB}${hours(p.gap_minutes / 60)} emellan.`,
    litter_rule: (p) =>
      `Kattlåda: en vuxen katt använder den ${p.uses} ${s(p.uses, "gång", "gånger")} om dagen; lådan rensas inom ${p.scoop_hours}${NB}${hours(p.scoop_hours)} efter varje besök (utom under tysta timmar), och all kattsand byts ${p.change_days === 7 ? "en gång i veckan" : p.change_days === 1 ? "varje dag" : p.change_days === 2 ? "varannan dag" : `var ${ord(p.change_days)} dag`}.`,
    scratching_after_missed_play: () => "Efter en dag med för lite lek klöser katten på något en gång; barnet bär den till klösmöbeln.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kamning en gång i veckan." : p.per_week === 2 ? "Kamning två gånger i veckan." : `Kamning ${p.per_week} gånger i veckan.`),
    no_walk_in_heat: (p) =>
      `På sommaren (juni–augusti; december–februari på södra halvklotet) visar barnets skärm och promenadskärmen en lugn påminnelse mellan ${clock(p.from)} och ${clock(p.to)} (familjens lokala tid): inga promenader i värmen. Inga väderdata, inget straff – stegen räknas ändå.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "rengöring av hudvecken",
        tooth_brushing: "tandborstning",
        ear_cleaning: "kontroll och rengöring av öronen",
        nail_trim: "kloklippning",
        bath: "bad",
        groomer_visit: "besök hos en hundfrisör",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "varje dag"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "en gång i veckan"
              : weeks === 2
                ? "varannan vecka"
                : `var ${ord(weeks)} vecka`
            : q.period_days === 7
              ? `${q.times} ${s(q.times, "gång", "gånger")} i veckan`
              : `${q.times === 1 ? "en gång" : `${q.times} gånger`} ${q.period_days === 2 ? "varannan dag" : `var ${ord(q.period_days)} dag`}`;
      const who = q.actor === "parent" ? "en påminnelse till föräldern" : "en uppgift för barnet";
      return `Skötsel: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Träffa valpen tillsammans med dess mamma, där valpen föddes.",
      min_age_puppy: "Valpen bör inte lämna sin mamma innan den är 8 veckor gammal.",
      pedigree_fci: "Be om stamtavlan. Enligt FCI:s regler får en stamtavla bara utfärdas när härstamningen är korrekt.",
      parents_health_tests: "Be att få se resultaten av båda föräldrarnas hälsotester. Vilka tester som är viktiga beror på rasen.",
      breed_club_rules: "Nationella kennelklubbar kan ha avelsregler som går längre än FCI:s – fråga rasklubben vilka tester föräldrarna behöver.",
      written_contract: "Be om ett skriftligt köpeavtal som beskriver valpens bakgrund och hälsa.",
      kitten_see_mother: "Träffa kattungen tillsammans med dess mamma, där kattungarna bor.",
      kitten_min_age: "Enligt FIFe:s stamtavleregler flyttar en kattunge inte till ett nytt hem förrän den är 14 veckor gammal.",
      kitten_vaccination: "Kattungen är fullvaccinerad (kattpest, calicivirus, herpesvirus) och har ett vaccinationsintyg.",
      kitten_pedigree: "En kattunge med stamtavla ska levereras med en stamtavla som visar minst tre generationer.",
      kitten_parents_tests: "Fråga om någon av föräldrarna har haft hälsoproblem som kattungen kan ärva.",
    },
    tests: {
      dna_poag_pll: "DNA-test för primärt öppenvinkelglaukom och primär linsluxation (POAG/PLL), ärftliga ögonsjukdomar som kan leda till blindhet",
      hip_scheme: "Röntgen av höfterna för höftledsdysplasi (UK: BVA/KC-programmet)",
      elbow_scheme: "Röntgen av armbågarna för armbågsledsdysplasi (UK: BVA/KC-programmet)",
      eye_scheme: "Ögonundersökning hos en veterinär specialiserad på ögon (UK: BVA/KC/ISDS-programmet; för vissa raser med gonioskopi)",
      heart_scheme: "Hjärtundersökning för mitralisklaffsjukdom",
      boas_grading: "Andningstest för brakycefalt obstruktivt luftvägssyndrom (BOAS-gradering)",
      ivdd_screening: "Undersökning av ryggraden för disksjukdom (IVDD)",
      hearing_baer: "Hörseltest för dövhet (BAER)",
      cm_sm_mri: "MR-undersökning för Chiari-liknande missbildning och syringomyeli (UK: BVA/KC:s CM/SM-program)",
      inbreeding_coi: "Genetisk variation – kontrollera inavelsgraden",
      dna_prcd_pra: "DNA-test för progressiv retinal atrofi (prcd-PRA)",
      dna_rcd4_pra: "DNA-test för progressiv retinal atrofi (rcd4)",
      dna_gr_pra2: "DNA-test för progressiv retinal atrofi (GR_PRA2)",
      dna_cnm: "DNA-test för centronukleär myopati (CNM)",
      dna_eic: "DNA-test för ansträngningsutlöst kollaps (EIC)",
      dna_hnpk: "DNA-test för ärftlig nasal parakeratos (HNPK)",
      dna_sd2: "DNA-test för skelettdysplasi 2 (SD2)",
      dna_mcd: "DNA-test för makulär korneadystrofi (MCD)",
      dna_stgd: "DNA-test för Stargardts sjukdom (STGD)",
      dna_cc_de: "DNA-test för curly coat/dry eye-syndrom (CC/DE)",
      dna_ef: "DNA-test för episodisk fallsjuka (EF)",
      dna_cea: "DNA-test för collie eye anomaly (CEA/CH)",
      dna_cl: "DNA-test för ceroidlipofuscinos (CL)",
      dna_igs: "DNA-test för Imerslund-Gräsbecks syndrom (IGS)",
      dna_mdr1: "DNA-test för överkänslighet mot vissa läkemedel (MDR1)",
      dna_tns: "DNA-test för trapped neutrophil syndrome (TNS)",
      dna_sn: "DNA-test för sensorisk neuropati (SN)",
      dna_ggd: "DNA-test för goniodysgenesi och risk för glaukom (GGD)",
      dna_raines: "DNA-test för Raines syndrom",
      dna_dm: "DNA-test för degenerativ myelopati (DM)",
      dna_de: "DNA-test för degenerativ encefalopati (DE)",
      dna_jadd: "DNA-test för juvenil Addisons sjukdom (JADD)",
      dermoid_sinus_scheme: "Valpkontroll för dermoid sinus (rasklubbens program)",
      dna_jme: "DNA-test för juvenil myoklonisk epilepsi (JME)",
      dna_je: "DNA-test för juvenil epilepsi (JE)",
      dna_lsd: "DNA-test för lysosomal inlagringssjukdom (LSD)",
      dna_ampn: "DNA-test för alaskan malamute-polyneuropati (AMPN)",
      dna_fanconi: "DNA-test för Fanconis syndrom (en njursjukdom)",
      dna_pra_bj1: "DNA-test för progressiv retinal atrofi hos basenji (PRA-BJ1)",
      thyroid_scheme: "Undersökning av föräldrarnas sköldkörtel",
      dna_pap_pra1: "DNA-test för progressiv retinal atrofi hos papillon (Pap-PRA1)",
      dna_nad: "DNA-test för neuroaxonal dystrofi (NAD)",
      dna_eopra: "DNA-test för tidigt debuterande progressiv retinal atrofi (EOPRA)",
      dna_cu: "DNA-test för cystinuri (CU), en ärftlig sjukdom som ger sten i njurar och urinblåsa",
      heart_echo_scheme: "Hjärtundersökning med färgdopplerultraljud (rasklubbens program)",
      cardiac_exam: "Hjärtundersökning av föräldrarna (rasklubbens rekommendation)",
      dna_rd_osd: "DNA-test för retinal dysplasi/okuloskeletal dysplasi (RD/OSD)",
      dna_xlpra1: "DNA-test för X-bunden progressiv retinal atrofi (XLPRA1)",
      dna_cmo: "Test för kraniomandibulär osteopati (CMO), en ärftlig skelettsjukdom i käken",
      dna_hsf4: "DNA-test för ärftlig katarakt (HSF4)",
      dna_lafora: "DNA-test för Laforas sjukdom",
      dna_nccd: "DNA-test för neonatal cerebellär kortikal degeneration (NCCD)",
      dna_fviid: "DNA-test för faktor VII-brist (FVIID)",
      dna_mls: "DNA-test för Musladin-Lueke-syndrom (MLS)",
      dna_vwd1: "DNA-test för von Willebrands sjukdom typ 1 (vWD1)",
      dna_mac: "DNA-test för mottaglighet för infektion med Mycobacterium avium-komplexet (MAC)",
      dna_imgd: "DNA-test för ärftlig myopati hos grand danois (IMGD), en sjukdom som bryter ner musklerna",
      dna_poag: "DNA-test för primärt öppenvinkelglaukom (POAG), en ärftlig ögonsjukdom som kan leda till blindhet",
      dna_aon: "DNA-test för neuropati med debut i vuxen ålder (AON), en ärftlig nervsjukdom",
      dna_fn: "DNA-test för familjär nefropati (FN), en ärftlig njursjukdom",
      patella_scheme: "Kontroll av knäskålarna för patellaluxation före avel",
      kidney_scheme: "Ultraljud av njurarna för saknad eller missbildad njure (rasklubbens rekommendation)",
      kidney_upc_scheme: "Urinprov (kvoten mellan protein och kreatinin) för njursjukdom (rasklubbens rekommendation)",
      dna_gld: "DNA-test för globoidcellsleukodystrofi (GLD), en ärftlig nervsjukdom",
      liver_shunt_scheme: "Leverkontroll för portosystemisk shunt eller mikrovaskulär dysplasi (rasklubbens rekommendation)",
      breed_health_scheme: "Rasklubbens hälsoprogram för föräldrarna",
      hemivertebrae_scheme: "Röntgen av föräldrarnas ryggrad för kilkotor (hemivertebrae, missbildade ryggkotor), efter 12 månaders ålder",
      dna_hcm_mc: "DNA-test för hypertrofisk kardiomyopati (MC HCM)",
      dna_sma: "DNA-test för spinal muskelatrofi (SMA)",
      dna_pk_def: "DNA-test för pyruvatkinasbrist (PK def)",
      hcm_negative: "Avelskatter måste vara HCM-negativa (hjärtsjukdomen hypertrofisk kardiomyopati)",
      dna_gsd4: "DNA-test för glykogeninlagringssjukdom typ IV (GSD IV)",
      dna_pra_b: "DNA-test för progressiv retinal atrofi hos bengal (PRA-b)",
      dna_jlpp: "DNA-test för juvenil larynxförlamning och polyneuropati (JLPP)",
      dna_lemp2: "DNA-test för leukoencefalomyelopati (LEMP-2)",
      dna_huu: "DNA-test för hyperurikosuri (HUU)",
      dna_dcm: "DNA-test för dilaterad kardiomyopati (DCM), en sjukdom i hjärtmuskeln",
      dna_pra5: "DNA-test för progressiv retinal atrofi (PRA5)",
      dna_dings2: "DNA-test för dancing Dobermann disease (DINGS2), en nerv- och muskelsjukdom",
      dna_ams: "DNA-test för akralt mutilationssyndrom (AMS), en nervsjukdom som tar bort smärtkänslan i tassarna",
      dna_dams: "DNA-test för dyserytropoetisk anemi och myopatisyndrom (DAMS), en blod- och muskelsjukdom",
      dna_fuco: "DNA-test för fukosidos, en ärftlig sjukdom i nervsystemet",
      dna_pfk: "DNA-test för fosfofruktokinasbrist (PFK), en ärftlig enzymsjukdom i blodet och musklerna",
      dna_pra_cord1: "DNA-test för progressiv retinal atrofi (PRA cord1)",
      dna_bbs2_pra: "DNA-test för progressiv retinal atrofi (BBS2-PRA)",
      dna_cnga1_pra: "DNA-test för progressiv retinal atrofi (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-test för progressiv retinal atrofi (PRA-rcd2)",
      dna_gm1: "DNA-test för GM1-gangliosidos (en ärftlig sjukdom i nervsystemet)",
      dna_gm2: "DNA-test för GM2-gangliosidos (en ärftlig sjukdom i nervsystemet)",
      dna_vwd3: "DNA-test för von Willebrands sjukdom typ 3 (vWD3), en ärftlig blödningsrubbning",
      dna_pra_rcd3: "DNA-test för progressiv retinal atrofi (PRA-rcd3)",
      dna_clad: "DNA-test för canin leukocytadhesionsdefekt (CLAD), en ärftlig immunsjukdom",
      dna_pra_rcd1: "DNA-test för progressiv retinal atrofi (rcd1)",
      dna_vwd2: "DNA-test för von Willebrands sjukdom typ 2 (vWD2), en ärftlig blödningsrubbning",
      dna_l2hga: "DNA-test för L-2-hydroxiglutarsyrauri (L-2-HGA), en ärftlig ämnesomsättningssjukdom i nervsystemet",
      dna_pll: "DNA-test för primär linsluxation (PLL), en ärftlig ögonsjukdom där linsen glider ur sitt läge",
      dna_loa: "DNA-test för sent debuterande ataxi (LOA), en ärftlig sjukdom som påverkar balans och koordination",
      dna_sca: "DNA-test för spinocerebellär ataxi (SCA), en ärftlig sjukdom i nervsystemet",
    },
  },
  health: {
    splenic_torsion: "Mjältvridning, som kräver akut veterinärvård, är vanligare hos den här rasen än hos andra stora raser.",
    shar_pei_fever: "Familjär shar pei-feber kan förekomma i rasen: attacker av hög feber med smärtsamma, svullna leder och svullet ansikte – kontakta veterinär direkt.",
    weight_gain: "Går lätt upp i vikt – håll koll på portioner och godbitar.",
    hip_elbow_dysplasia_eye_conditions: "Kan vara benägen att få höftledsdysplasi och armbågsledsdysplasi samt flera ärftliga ögonsjukdomar.",
    cancer_risk: "Källorna beskriver en högre risk för cancer hos den här rasen.",
    flat_face_breathing:
      "Trubbnosig (brakycefal) ras: den korta nosen, de trånga näsborrarna och extra mjukvävnad i luftvägarna kan göra det svårare att andas (brakycefalt obstruktivt luftvägssyndrom, BOAS).",
    heat_stroke_risk: "Blir snabbt överhettad och är mer utsatt för värmeslag än de flesta hundar, särskilt i varmt väder.",
    skin_fold_ear_problems: "Benägen att få öroninflammation och infektioner i hudvecken; hudvecken behöver hållas rena och torra.",
    ear_infections_long_ears: "Öroninfektioner kan uppstå på grund av de långa öronen; bakterier kan samlas i hörselgången.",
    collie_eye_pra:
      "Ärftliga ögonsjukdomar förekommer i rasen: collie eye anomaly, en avvikelse i ögats bakre del, och progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet; ögonundersökning och DNA-tester finns.",
    merle_colour_risk: "Merle är ingen färg enligt rasstandarden; hos den här rasen innebär den en högre risk för problem med hörsel och syn.",
    hind_leg_conformation:
      "Royal Kennel Club nämner bakbenens form och hundens rörelser som en riskpunkt i rasen; en sund hund har rak rygg och måttligt vinklade bakben.",
    hip_elbow_dysplasia: "Kan vara benägen att få höftledsdysplasi och armbågsledsdysplasi; uppfödare rekommenderas att röntga föräldrarnas höfter och armbågar före avel.",
    degenerative_myelopathy: "Degenerativ myelopati, en sjukdom i ryggmärgen som långsamt försvagar bakbenen, förekommer i rasen; ett DNA-test finns.",
    exercise_induced_collapse: "Ansträngningsutlöst kollaps, en ärftlig neuromuskulär sjukdom som kan få en hund att kollapsa efter hård ansträngning, förekommer i rasen.",
    heart_valve_disease:
      "Hjärtsjukdom orsakad av en försvagad mitralisklaff är ett stort problem i rasen; den upptäcks ofta först som ett blåsljud, och avelshundar bör hjärtundersökas först.",
    chiari_syringomyelia:
      "Chiari-liknande missbildning och syringomyeli, ett smärtsamt tillstånd med vätskefyllda hålrum i ryggmärgen nära hjärnan, förekommer i rasen och har samband med skallens form; det diagnostiseras med MR.",
    eye_conditions:
      "Ärftliga ögonsjukdomar som katarakt (grå starr) förekommer i rasen, och utstående eller irriterade ögon är en riskpunkt; ögonundersökning och DNA-tester finns.",
    epilepsy: "Epilepsi, en sjukdom i hjärnan som kan ge krampanfall, förekommer i rasen.",
    storage_disease: "En ärftlig inlagringssjukdom i nervsystemet kan drabba unga hundar av rasen; ett DNA-test av föräldrarna gör att uppfödare kan undvika den.",
    chondrodysplasia: "Kondrodysplasi, en störning i brosk- och skelettillväxten, förekommer i rasen; valpar kan kontrolleras med röntgen.",
    polyneuropathy: "En ärftlig nervsjukdom (polyneuropati) förekommer i rasen; ett DNA-test av föräldrarna gör att uppfödare kan undvika den.",
    fanconi_syndrome: "Fanconis syndrom, en ärftlig njursjukdom som gör att socker läcker ut i urinen, förekommer i rasen; ett DNA-test av föräldrarna gör att uppfödare kan undvika den.",
    pyruvate_kinase_deficiency: "Pyruvatkinasbrist, en ärftlig defekt i de röda blodkropparna som ger blodbrist, kan förekomma i rasen.",
    back_disc_disease: "Disksjukdom, ett problem med de stötdämpande mellankotsskivorna, förekommer i rasen.",
    pra_eye_disease: "Progressiv retinal atrofi (PRA), en ärftlig ögonsjukdom som långsamt kan leda till blindhet, förekommer i rasen; DNA-tester och ögonundersökning finns.",
    hip_dysplasia: "Höftledsdysplasi, en dåligt utvecklad höftled som kan leda till artros, förekommer i rasen; uppfödare rekommenderas att låta röntga och bedöma föräldrarnas höfter.",
    bloat_gdv: "Magomvridning (dilatation-volvulus), där magsäcken vrider sig, kan förekomma i rasen – det är ett akut tillstånd som kräver veterinärvård omedelbart.",
    inherited_eye_disease: "Ärftliga ögonsjukdomar förekommer i rasen, till exempel collie eye anomaly, katarakt (grå starr) och progressiv retinal atrofi (PRA).",
    drug_sensitivity_mdr1:
      "Vissa hundar av rasen har en ärftlig överkänslighet mot vissa läkemedel (MDR1) – om din hund är drabbad, berätta det för veterinären.",
    merle_to_merle_breeding:
      "Merle är en standardfärg i rasen; två merlefärgade hundar bör inte paras med varandra, eftersom valparna riskerar nedsatt syn och hörsel – Royal Kennel Club registrerar inte sådana valpar.",
    kneecap_luxation: "Patellaluxation, där knäskålen tillfälligt hoppar ur sitt läge, förekommer i rasen.",
    pra_and_eyelashes:
      "Ögonproblem förekommer i rasen: progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet, och extra ögonfransar som skaver mot ögat (distikiasis); uppfödare rekommenderas att låta ögonundersöka föräldrarna.",
    liver_shunt: "Portosystemisk shunt (levershunt), där blodet leds förbi levern, kan förekomma i rasen.",
    skin_allergies:
      "Hudallergier är ett känt problem i rasen; Royal Kennel Club ber domare att leta efter tecken på hudinflammation, och ägare rekommenderas att fråga veterinären innan de väljer schampo.",
    westie_lung: "En lungsjukdom som kallas ”westie lung” (idiopatisk lungfibros) och som gör det svårare att andas kan förekomma i rasen, mest hos äldre hundar.",
    jaw_bone_disorder: "En ärftlig skelettsjukdom i käken kan förekomma i rasen.",
    dry_eye: "Torra ögon, där ögonen inte bildar tillräckligt med tårvätska och blir torra och ömma, kan förekomma i rasen.",
    heart_hcm: "Hypertrofisk kardiomyopati (HCM), en ärftlig hjärtsjukdom där hjärtmuskeln blir förtjockad, förekommer i rasen.",
    dental_weight_nail_care:
      "En stor brittisk studie nämner tandsjukdom, övervikt och för långa klor bland de vanligaste problemen i rasen, så ägare rekommenderas att sköta tänderna, hålla vikten och klippa klorna regelbundet.",
    dental_weight_care:
      "PetMD nämner tandsjukdom och övervikt bland problemen att hålla koll på, så ägare rekommenderas att borsta kattens tänder regelbundet och hålla vikten i schack.",
    gsd_iv: "Glykogeninlagringssjukdom typ IV (GSD IV), en ärftlig sjukdom som drabbar kattungar, förekommer i rasen; ett DNA-test av föräldrarna gör att uppfödare kan undvika den.",
    hip_dysplasia_weight: "Höftledsdysplasi, en dåligt utvecklad höftled, kan förekomma i rasen; PetMD rekommenderar att katten hålls på en hälsosam vikt för att skydda lederna.",
    laryngeal_paralysis_polyneuropathy:
      "Juvenil larynxförlamning och polyneuropati (JLPP), en ärftlig nervsjukdom som påverkar struphuvudet och bakbenen, förekommer i rasen; ett DNA-test av föräldrarna gör att uppfödare kan undvika den.",
    heart_sas: "Subaortastenos, en förträngning strax under en hjärtklaff som kan ge blåsljud, förekommer i rasen; avelshundar bör få hjärtat undersökt först.",
    inherited_eye_defects: "Ärftliga ögonsjukdomar förekommer i rasen, till exempel retinal dysplasi och persisterande pupillmembran; ögonundersökning finns.",
    skin_fold_infections: "Hudvecken, särskilt i ansiktet, kan samla fukt och bli infekterade (hudveckspyodermi); rynkorna i ansiktet behöver rengöras varje dag.",
    eyelid_eye_problems: "Ögonlocksproblem (inåt- eller utåtvända ögonlock), torra ögon och cherry eye förekommer i rasen; ögonundersökning finns.",
    hip_elbow_joint_disease: "Höftledsdysplasi och armbågsledsdysplasi, där lederna inte utvecklas korrekt, förekommer i rasen och kan leda till ledsjukdom.",
    hip_dysplasia_arthritis: "Höftledsdysplasi, en lös och dåligt utvecklad höftled, förekommer i rasen och kan med tiden leda till artros.",
    bleeding_disorder_vwd: "Von Willebrands sjukdom, en ärftlig rubbning i blodets koagulation som kan ge kraftiga blödningar, förekommer i rasen.",
    heart_muscle_disease: "Kardiomyopati, ett förstorat hjärta på grund av försvagad hjärtmuskel, kan förekomma i rasen.",
    itchy_skin_allergy: "Hudallergier (atopi), som ger klåda och öm hud, kan förekomma i rasen.",
    entropion_cherry_eye:
      "Inåtvända ögonlock (entropion) och cherry eye, där det tredje ögonlockets körtel buktar fram, kan förekomma i rasen; cherry eye kan åtgärdas med kirurgi.",
    dental_disease_tooth_brushing:
      "En stor brittisk studie nämner tandsjukdom som det överlägset vanligaste problemet i rasen, och mjölktänder som inte faller ut är också vanliga, så ägare uppmuntras att sköta hundens tänder varje dag, till exempel genom att borsta dem.",
    windpipe_collapse: "Trakeakollaps, där luftstrupen förlorar sin stadga och kan orsaka svaghet och kollaps, kan förekomma i rasen.",
    eye_problems_pra_lens_dry_eye:
      "Ögonproblem förekommer i rasen, till exempel progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet, linsluxation (en lins som glidit ur läge) och torra ögon.",
    cataracts_lens_luxation: "Ögonproblem kan förekomma i rasen, till exempel katarakt (grå starr), som grumlar linsen, och linsluxation (en lins som glidit ur läge).",
    wobbler_syndrome: "Wobbler-syndrom, där instabila kotor i nacken trycker på ryggmärgen och försvagar bakbenen, kan förekomma i rasen.",
    eye_phpv:
      "En medfödd ögondefekt (persisterande hyperplastisk primär vitreus, PHPV) kan förekomma i rasen; uppfödare rekommenderas att låta ögonundersöka föräldrarna.",
    certain_cancers: "Vissa former av cancer kan förekomma i rasen.",
    bare_skin_sun_cold: "Den nakna huden hos den hårlösa varianten behöver skyddas mot sol och kyla.",
    l2hga_nervous_system:
      "L-2-hydroxiglutarsyrauri (L-2-HGA), en ärftlig ämnesomsättningssjukdom som påverkar nervsystemet, kan förekomma i rasen; ett DNA-test av föräldrarna finns.",
    short_face_breathing:
      "En måttligt kortnosig ras: vissa hundar med kortare nos kan få allvarliga andningsproblem (brakycefalt obstruktivt luftvägssyndrom, BOAS).",
    corneal_ulcers: "Ögonproblem som hornhinnesår är vanligare på grund av skallens form och de framträdande ögonen; ögonundersökning finns.",
    skin_folds_allergies:
      "Hudproblem som allergier, vårtor, hudflikar och ömma hudveck i ansiktet (hudveckseksem) kan förekomma; ansiktsvecken bör hållas rena och torra.",
    heart_cardiomyopathy_aortic_stenosis: "Hjärtproblem som kardiomyopati och aortastenos kan förekomma i rasen.",
    dental_disease_care: "En stor brittisk studie nämner tandsjukdom som det vanligaste problemet i rasen, och ägare rekommenderas att prioritera tandvården.",
    bladder_stones: "Blåssten, ansamlingar av mineraler som bildas i urinblåsan och urinen, kan förekomma i rasen.",
    deafness: "Dövhet på ett eller båda öronen förekommer i rasen; valpars hörsel kan kontrolleras med ett BAER-test.",
    mitral_valve_disease:
      "Mitralisklaffsjukdom, en hjärtsjukdom där en försvagad klaff låter blod flöda tillbaka in i hjärtat, förekommer i rasen; en veterinär kan lyssna på avelshundarnas hjärtan innan de används i avel.",
    eye_problems_pra_cataracts_dry_eye:
      "Ögonproblem förekommer i rasen, till exempel progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet, katarakt (grå starr) och torra ögon; ögonundersökning finns.",
    skin_comedo_allergy: "Hudproblem kan förekomma, till exempel schnauzer comedo syndrome (en typ av inflammerade hårsäckar) och hudallergier (atopi) som ger klåda.",
    shorter_face_boas: "En brakycefal (kortnosig) ras: den kortare nosen kan ge allvarliga andningsproblem (brakycefalt obstruktivt luftvägssyndrom, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina:
      "Ögonproblem förekommer i rasen, till exempel torra ögon, katarakt (grå starr), progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet, och näthinneavlossning.",
    hypothyroidism: "Underfunktion i sköldkörteln (hypotyreos), som kan påverka vikt, hud och energinivå, kan förekomma i rasen.",
    open_fontanelle: "En öppen fontanell, en mjuk punkt på skallen som inte sluter sig helt, kan förekomma i rasen.",
    collapsing_trachea: "Trakeakollaps, en svaghet i luftstrupen som kan ge hosta och andningssvårigheter, kan förekomma i rasen.",
    gm1_gangliosidosis: "GM1-gangliosidos, en ärftlig sjukdom i nervsystemet, kan förekomma i rasen; ett DNA-test av föräldrarna kan utesluta den.",
    addisons_disease: "Addisons sjukdom, brist på hormoner från binjurarna, kan förekomma i rasen.",
    protein_losing_disease: "Sjukdomar där kroppen förlorar protein via njurarna eller tarmen, och som kan ge diarré och viktnedgång, kan förekomma i rasen.",
    diabetes_mellitus: "Diabetes mellitus (sockersjuka), där kroppen inte kan reglera blodsockret ordentligt, kan förekomma i rasen.",
    dental_disease_home_brushing:
      "Liksom många små hundar är rasen benägen att få tandsjukdom, så tandborstning hemma med hundtandborste och hundtandkräm rekommenderas.",
    dermoid_sinus:
      "Dermoid sinus, ett smärtsamt tillstånd där en kanal i huden på ryggen står i förbindelse med ryggmärgen, kan förekomma i rasen; rasklubbar har ett kontrollprogram för dermoid sinus hos valpar.",
    cataracts: "Katarakt (grå starr), som grumlar ögats lins och kan leda till synförlust, kan förekomma i rasen.",
    pra_inherited_blindness: "Progressiv retinal atrofi (PRA), en ärftlig ögonsjukdom som långsamt kan leda till blindhet, kan förekomma i rasen.",
    eyelids_turned: "Inåtvända (entropion) eller utåtvända (ektropion) ögonlock kan förekomma i rasen; fråga om föräldrarna är ögonundersökta.",
    glaucoma_poag:
      "Primärt öppenvinkelglaukom, där vätska samlas i ögat och orsakar smärta och möjligen blindhet, kan förekomma i rasen; det finns ett DNA-test för föräldrarna.",
    skin_fold_dermatitis: "Den lösa huden bildar veck som kan bli ömma och infekterade; de behöver kontrolleras varje dag och hållas rena och torra.",
    eyelid_problems:
      "Ögonlocksproblem kan förekomma i rasen: inåtvända (entropion) eller utåtvända (ektropion) ögonlock och cherry eye, där det tredje ögonlockets körtel buktar fram.",
    skin_allergy_face_folds: "Hudallergier (atopi) som ger klåda kan förekomma i rasen, och hudvecken i ansiktet behöver rengöras varje dag.",
    skin_ear_allergies:
      "Miljöallergier kan förekomma i rasen och kan leda till upprepade hud- eller öroninfektioner; PetMD föreslår rengöring av öronen en gång i veckan för en hund med allergier.",
    gum_disease_daily_brushing:
      "Rasen är benägen att få tandköttssjukdom (gingivit och parodontit), så PetMD rekommenderar daglig tandborstning och en årlig tandkontroll hos veterinären.",
    pra_pk_def:
      "Två ärftliga sjukdomar förekommer i rasen: progressiv retinal atrofi (PRA), en ögonsjukdom som kan leda till blindhet, och pyruvatkinasbrist, en blodsjukdom; DNA-tester av föräldrarna gör att uppfödare kan undvika dem.",
    windpipe_collapse_breathing: "Trakeakollaps, där luftstrupens broskringar faller ihop och gör det svårt att andas, kan förekomma i rasen.",
    eye_problems_pra_cataracts_entropion:
      "Ögonproblem förekommer i rasen, till exempel progressiv retinal atrofi (PRA), som långsamt kan leda till blindhet, katarakt (grå starr), som grumlar linsen, och inåtvända ögonlock (entropion); ögonundersökning finns.",
    elbow_dysplasia_arthritis: "Armbågsledsdysplasi, en dåligt utvecklad armbågsled som med tiden kan leda till artros, kan förekomma i rasen.",
    entropion: "Entropion, där ögonlocken vänds inåt och irriterar ögat, kan förekomma i rasen; fråga om föräldrarna är ögonundersökta.",
    autoimmune_conditions: "Autoimmuna sjukdomar, där kroppen reagerar mot sig själv, kan förekomma i rasen.",
    ear_infections_prone: "Rasen är benägen att få öroninfektioner; håll noga koll på öronhygienen.",
    familial_nephropathy: "En ärftlig njursjukdom (familjär nefropati) förekommer i rasen; ett DNA-test av föräldrarna finns.",
    hereditary_nephritis: "En ärftlig njursjukdom (hereditär nefrit, även kallad samojedhundens ärftliga glomerulopati) förekommer i rasen.",
    panosteitis: "Panosteit, en smärtsam inflammation i de långa rörbenen som oftast drabbar unga hundar som växer, kan förekomma i rasen.",
    urinary_incontinence: "Urininkontinens, ett okontrollerat urinläckage, kan förekomma i rasen.",
    osteochondritis: "Osteochondritis dissecans (OCD), en störning i ledbrosket hos växande hundar, kan förekomma i rasen.",
    scottie_cramp: "Scottie cramp – korta episoder av muskelkramp, oftast utlösta av upphetsning – förekommer i rasen; det gör inte ont.",
    periodontal_disease: "Parodontit, en infektion och inflammation i tandköttet och de vävnader som håller fast tänderna, är ett känt problem i rasen.",
    extra_eyelashes:
      "Distikiasis, där små extra ögonfransar växer på ögonlockets insida eller kant och kan skava mot ögat, kan förekomma i rasen; fråga om föräldrarna är undersökta inom ögonprogrammet.",
    cm_sm_screening:
      "Chiari-liknande missbildning och syringomyeli, ett smärtsamt tillstånd med vätskefyllda hålrum i ryggmärgen nära hjärnan, kan förekomma i rasen; uppfödare rekommenderas att undersöka föräldrarna (UK: BVA/KC-programmet).",
    prominent_eyes_injury_dry_eye: "Framträdande ögon skadas lättare och kan få sår och bli torra; torra ögon och cherry eye förekommer också i rasen.",
    legg_perthes: "Legg-Perthes sjukdom, ett smärtsamt tillstånd där lårbenshuvudet i höftleden dör och faller sönder, kan förekomma i rasen.",
    glaucoma: "Glaukom (grön starr), förhöjt tryck i ögat som kan vara smärtsamt och leda till blindhet, kan förekomma i rasen.",
    lethal_acrodermatitis: "Letal akrodermatit, en ärftlig sjukdom som ger allvarliga hud- och tillväxtproblem hos valpar, förekommer i rasen.",
    kidney_disease_urine_screening: "Njurproblem förekommer i rasen; urinprov kan användas för att undersöka föräldrarna före avel.",
    primary_lens_luxation:
      "Primär linsluxation, en smärtsam ärftlig ögonsjukdom där linsen glider ur sitt läge och som kan orsaka blindhet, förekommer i rasen; ett DNA-test finns för avelshundar.",
    inherited_ataxia:
      "Ärftliga ataxier (sent debuterande ataxi och spinocerebellär ataxi), som ger förlorad balans och koordination, förekommer i rasen; DNA-tester finns för avelshundar.",
    hydrocephalus: "Hydrocefalus (vattenskalle), en ansamling av vätska runt hjärnan, kan förekomma i rasen.",
    heart_disease_pda:
      "Hjärtsjukdom kan förekomma i rasen, bland annat öppetstående ductus arteriosus, ett blodkärl nära hjärtat som inte sluter sig efter födseln; en veterinär kan lyssna efter det vid valpens första hälsokontroll.",
    chiari_malformation: "Chiari-liknande missbildning med syringomyeli, ett smärtsamt tillstånd med vätskefyllda hålrum i ryggmärgen nära hjärnan, kan förekomma i rasen.",
    cataracts_entropion:
      "Katarakt (grå starr), som grumlar ögats lins, och inåtvända ögonlock (entropion) kan förekomma i rasen; fråga om föräldrarna är undersökta inom ögonprogrammet.",
    periodontal_daily_brushing: "Rasen är benägen att få tandköttssjukdom (parodontit), så daglig tandborstning med hundtandkräm rekommenderas.",
    eye_problems_shallow_sockets:
      "Ögonproblem förekommer i rasen, till exempel torra ögon, ögoninfektioner och sår på ögats yta; de grunda ögonhålorna gör också ögonskador mer sannolika.",
    eye_problems_dry_eye_entropion_lens_luxation:
      "Ögonproblem förekommer i rasen, till exempel torra ögon, inåtrullade ögonlock (entropion) och linsluxation (en lins som glidit ur läge); ögonundersökning finns.",
    heart_valve_screening: "Hjärtsjukdom kan förekomma i rasen; med ultraljud av hjärtat kan föräldrarna undersökas för klaffproblem före avel.",
    dental_weight_problems:
      "En stor brittisk studie nämner tandsjukdom och övervikt som särskilt vanliga problem i rasen – problem som ägare kan bidra till att förebygga; trångt ställda tänder och mjölktänder som inte faller ut förekommer också.",
  },
  page: {
    eyebrow: "Djurregister",
    // Search terms people use ("ragdollkatt", "temperament"); "temperament" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "temperament, " : ""}motion, storlek och skötsel | PetPrep`
        : species === "cat"
          ? `${/katt/i.test(name) ? name : /hår$/.test(name) ? `${name.replace(/^(\p{L}+)t\s/u, "$1 ")}skatt` : /\s/.test(name) ? `${name}-katt` : `${name}katt`}: ${hasIntro ? "temperament, " : ""}pälsvård, storlek och livslängd | PetPrep`
          : `${name} (${lc(one)}): behov, livslängd och skötsel | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Källor, hälsa och köpråd.`,
    metaLabels: { weight: "vikt", exercise: "motion", lifespan: "livslängd" },
    metaDescription: (name, one) =>
      `${name}: rasens behov enligt källorna (${lc(one)}) – motion, pälsvård, måltider, storlek, livslängd, vilka den passar för – och hur PetPrep simulerar den.`,
    suitabilityTitle: "Passar för",
    suitabilityNote: "Samma etiketter som i appen. Varje etikett stöds av källorna längst ner på sidan.",
    suitabilityNone: "Inga etiketter med källor för den här rasen än.",
    needsTitle: "Vad den behöver",
    needsIntro: (species) =>
      species === "cat"
        ? "Från kattförbundens rasregister, veterinärorganisationer och studier. När källorna skiljer sig åt visas varje värde."
        : "Från rasstandarder, kennelklubbar, djurvälfärdsorganisationer och studier. När källorna skiljer sig åt visas varje värde.",
    general: (many) => `Allmänna riktlinjer för ${lc(many)} (inte rasspecifika):`,
    noData: "Finns inte i våra källor än.",
    simTitle: "Så simulerar PetPrep rasen",
    simBadge: "Spelregler, inte veterinärrådgivning",
    simIntro:
      "I PetPrep motsvarar en riktig vecka en månad i djurets liv. Det här är reglerna som spelet använder för den här rasen. PetPrep har valt dem utifrån källorna på den här sidan; de är inga skötselråd för ett riktigt djur.",
    simInfoOnly: "Den här rasen finns i registret endast som information; appen simulerar den inte än.",
    simTable: { stage: "Livsstadium", starts: "Börjar", meals: "Måltider om dagen", activity: { steps: "Dagligt stegmål", play_sessions: "Lek om dagen" } },
    arrives: (m) => `kommer hem vid ${m}${NB}${s(m, "månads", "månaders")} ålder`,
    fromMonth: (m, years) => (years ? `månad ${m} (${years})` : `månad ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `från månad ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Varje tal i spelet är ett beslut som PetPrep har fattat och dokumenterat med källor.",
    healthTitle: "Hälsa",
    healthNote: "Endast information – inte granskad av en veterinär. Fråga din veterinär om ditt eget djur.",
    healthNone: "Våra källor innehåller ännu ingen rasspecifik hälsoinformation om den här rasen.",
    checklistTitle: "Innan du köper: det här kontrollerar du hos uppfödaren",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Frågor att reda ut innan du tar hem en kattunge. Punkterna är råd från veterinärer, djurskyddsorganisationer och kattförbund; varje punkt anger sin källa."
        : "Frågor att reda ut innan du tar hem en valp. Punkterna är råd från veterinärer, djurskyddsorganisationer och kennelklubbar; varje punkt anger sin källa.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Reglerna om lägsta ålder, chipmärkning och vaccination skiljer sig mellan länder – kontrollera vad som gäller där du bor.",
    checklistGeneralTitle: "För alla raser",
    checklistTestsTitle: "Föräldrarnas hälsotester för den här rasen",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tester som ett kattförbund kräver innan en katt används i avel" : "Tester som Royal Kennel Club rekommenderar som minimum",
      best_practice: "Ytterligare tester enligt bästa praxis",
      other_scheme: "Andra hälsoprogram för den här rasen",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Listan kommer från ett utländskt kattförbunds avelsregler (se källan) och är vägledande. Fråga uppfödaren vilka tester föräldrarna har gjort."
        : "Listorna kommer från brittiska Royal Kennel Club och är vägledande; nationella kennelklubbar kan ha egna, strängare regler. Fråga rasklubben och uppfödaren vilka tester föräldrarna har gjort.",
    checklistStatus: {
      none_recommended:
        "Royal Kennel Club anger för närvarande inga rekommenderade hälsoundersökningar före avel för den här rasen. Fråga ändå uppfödaren om föräldrarnas hälsa.",
      not_found:
        "Vi har ännu inte hittat någon tillförlitlig källa som anger hälsotester för föräldrarna till den här rasen. Fråga rasklubben och uppfödaren vilka tester föräldrarna har gjort.",
      not_checked: "Vi har ännu inte gått igenom hälsotesterna för föräldrarna till den här rasen. Fråga rasklubben och uppfödaren vilka tester föräldrarna har gjort.",
    },
    sourcesTitle: "Källor",
    sourcesIntro: "Varje uppgift på den här sidan hänvisar till en av de här källorna.",
    sourceLabel: (id, publisher) => `Källa ${id}: ${publisher}`,
    disclaimer: "PetPrep är en simulering för familjer. Den här sidan är inte veterinärrådgivning – för ett riktigt djur, fråga en veterinär eller rasklubben.",
    backTo: (many) => `Alla ${breedsOf(many, 2)}`,
    compareWith: "Jämför med andra raser",
    related: { title: "Liknande raser", intro: (many) => `Andra ${breedsOf(many, 2)} i registret med liknande behov – alla med uppgifter från källor.` },
    updated: "Uppdaterad",
    glanceTitle: "I korthet",
    glanceNote: "Viktiga fakta från källorna längst ner på sidan. När källorna skiljer sig åt listas varje värde.",
    portraitAlt: { ai_photo: (name) => `${name} – foto (AI)`, ai_illustration: (name) => `${name} – illustration (AI)` },
    portraitCaption: { ai_photo: "AI-genererat foto", ai_illustration: "AI-genererad illustration" },
    portraitColours: {
      legend: "Pälsfärg",
      alt: {
        ai_photo: (name, colour) => `${name}, ${lc(colour)} – foto (AI)`,
        ai_illustration: (name, colour) => `${name}, ${lc(colour)} – illustration (AI)`,
      },
    },
    share: {
      button: "Dela",
      title: "Dela den här rasen",
      copy: "Kopiera",
      copied: "Kopierat",
      linkLabel: "Länk till den här sidan",
      more: "Fler alternativ",
      text: (name) => `${name}: behov, källor och hur PetPrep simulerar rasen`,
      emailSubject: (name) => `${name} – PetPreps djurregister`,
      on: (network) => `Dela på ${network}`,
    },
    og: { lead: "Behov, källor och hur PetPrep simulerar rasen", photoLabel: "AI-foto" },
    qa: {
      title: "Frågor och svar",
      intro: "Besvaras bara utifrån uppgifterna från källorna på den här sidan; varje svar anger sina källor.",
      // Breed names are lower case in running text and all take "en" (en hund, en katt): "en tysk schäferhund", "en maine coon".
      questions: {
        exercise: (n) => `Hur mycket motion behöver en ${mid(n)}?`,
        lifespan: (n) => `Hur länge lever en ${mid(n)}?`,
        size: (n) => `Hur stor blir en ${mid(n)} och hur mycket väger den?`,
        grooming: (n) => `Hur mycket pälsvård behöver en ${mid(n)}?`,
        suits: (n) => `Vem passar en ${mid(n)} för?`,
      },
      leads: {
        exercise: (n) => `Enligt våra källor behöver en ${mid(n)} så här mycket motion:`,
        lifespan: (n) => `Livslängd för en ${mid(n)} enligt våra källor:`,
        size: (n) => `Storlek och vikt för en vuxen ${mid(n)} enligt våra källor:`,
        grooming: (n) => `Päls och pälsvård hos en ${mid(n)} enligt våra källor:`,
        suits: (n) => `Enligt våra källor passar en ${mid(n)} bra för:`,
      },
      considerLead: "Tänk på:",
      differ: "Källorna anger olika värden, så alla listas.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolisk herdehund är en stor, kraftigt byggd boskapsvaktare från Turkiet; FCI beskriver den turkiska herdehunden som kangal (Kangal Shepherd Dog) – enfärgad från fawn till vargsobel med svart mask, 72–78 cm hög för hanar och 65–73 cm för tikar. Den amerikanska rasstandarden anger 110–150 pund (cirka 50–68 kg) för hanar och 80–120 pund (cirka 36–54 kg) för tikar. En hund av den här storleken är fullvuxen vid omkring 18–24 månader (PetMD); The Royal Kennel Club anger en livslängd på över 10 år och WebMD i genomsnitt 11 till 13 år.",
        "The Royal Kennel Club rekommenderar mer än 2 timmars motion om dagen och pälsvård mer än en gång i veckan, uppger att den fäller och passar i ett stort hus med stor trädgård på landet, och placerar den i Breed Watch-kategori 1. PetMD skriver att anatoliska herdehundar troligen passar bäst i hem utan små barn, att valpar som tidigt får möta andra djur oftast kommer bra överens med dem, att tidig socialisering är avgörande, att pälsen utanför de två årliga fällningsperioderna borstas en gång i veckan och att motion kring måltiderna bör undvikas.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irländsk setter, Irish Setter",
      text: [
        "Irländsk röd setter (irländsk setter) är en elegant, atletisk fågelhund från Irland, framavlad för att söka vida i terrängen. FCI-standarden beskriver en enda färg – mättat kastanjeröd utan spår av svart — och en mankhöjd på 58–67 cm för hanar och 55–62 cm för tikar; den amerikanska rasstandarden anger omkring 70 pund (cirka 32 kg) som idealt för en hane och 60 pund (cirka 27 kg) för en tik. En hund av den här storleken är fullvuxen vid ungefär 15–18 månader (PetMD), och Royal Kennel Club anger en livslängd på över 10 år.",
        "Royal Kennel Club rekommenderar mer än 2 timmars motion om dagen och pälsvård mer än en gång i veckan, anger att rasen fäller och passar ett stort hus med stor trädgård, och placerar den i Breed Watch-kategori 1. PDSA beskriver mycket vänliga, tillgivna hundar som kommer bra överens med barn och andra husdjur och rekommenderar pälsvård 2–3 gånger i veckan; PetMD rekommenderar att öronen kontrolleras och rengörs varje vecka och skriver att irländska settrar behöver mycket mänskligt sällskap.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Brysselgriffon, Brussels Griffon",
      text: [
        "Griffon bruxellois är en liten sällskapshund från Belgien med ett kort, platt ansikte. FCI-standarden beskriver en röd, naturligt hård, lätt vågig päls och en vikt på 3,5–6 kg; brittiska Royal Kennel Club, som har en strävhårig och en släthårig variant, beskriver den som en smart liten hund med terrierliknande temperament. En hund av den här storleken är fullvuxen vid ungefär 8–12 månader (PetMD), och Royal Kennel Club anger en livslängd på över 12 år (PetMD: 12–15 år).",
        "Royal Kennel Club rekommenderar upp till 30 minuters motion om dagen och pälsvård mer än en gång i veckan, uppger att den fäller och passar i lägenhet, och placerar rasen i Breed Watch-kategori 2. PetMD beskriver en kortnosig (brakycefal) hund som har svårt för varmt, fuktigt väder, rekommenderar att rengöra ansiktsvecken ungefär en gång i veckan och borsta tänderna dagligen, och skriver att griffon bruxellois under uppsikt kommer bra överens med barn och andra husdjur men inte tycker om att vara ensam länge.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, amerikansk rat terrier, Rat Terrier",
      text: [
        "Rat terrier är en liten amerikansk terrier som avlas i två storlekar – miniatyr och standard – med kort, tätt åtliggande, slät och glansig päls. Rasstandarden tillåter en mankhöjd på upp till 18 tum (46 cm), och PetMD anger en vikt på 10–25 pund (cirka 4,5–11 kg) för båda storlekarna; en hund av den storleken är fullvuxen vid ungefär 9–12 månader (PetMD). VCA anger en livslängd på 12–16 år, PetMD 12–18 år.",
        "Rat Terrier Club of America säger att rat terrier är bra med barn, särskilt om de växer upp med dem, och klarar sig i en lägenhet men behöver minst 30 minuters motion om dagen. PetMD skriver att de behöver mycket fysisk och mental stimulans, inte trivs med att vara ensamma länge och fäller lite året runt; VCA rekommenderar borstning en gång i veckan och varnar för att de kanske inte fungerar med smådjur, särskilt gnagare.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grosser Schweizer Sennenhund, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Stor schweizisk sennenhund (FCI och i Storbritannien ”Great Swiss Mountain Dog”) är en kraftig, grovbenad och välmusklad trefärgad draghund från Schweiz: svart med symmetriska bruna och vita tecken. FCI-standarden anger en mankhöjd på 65–72 cm för hanar och 60–68 cm för tikar men ingen vikt; WebMD anger 52–64 kg för hanar och 39–50 kg för tikar. En hund av den storleken är fullvuxen vid ungefär 18–24 månader (PetMD), och Royal Kennel Club anger en livslängd på över 10 år (PetMD: 8–11 år).",
        "Royal Kennel Club rekommenderar upp till en timmes motion om dagen och borstning en gång i veckan, och säger att rasen fäller och passar i ett stort hus med stor trädgård. PetMD kallar rasen en utmärkt familjehund som är varsam med barn (all kontakt bör ske under uppsikt), rekommenderar att rengöra öronen varje vecka och att inte motionera hunden direkt före eller efter måltid på grund av risken för magomvridning (GDV); WebMD rekommenderar att borsta tänderna dagligen och vara sparsam med godis, eftersom rasen lätt blir överviktig.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    shar_pei: {
      aka: "kinesisk shar pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Shar pei (i USA ”Chinese Shar-Pei”) är en aktiv, kompakt, kvadratiskt byggd medelstor hund från Kina med kort, hård, borstig päls i en enda helfärg (vilken som helst utom vitt), veck på huvudet och manken och en bred nos. Royal Kennel Clubs standard anger en mankhöjd på 46–51 cm och PDSA en vikt på 20–27 kg; en hund av den storleken är fullvuxen vid ungefär 12–15 månader (PetMD). Royal Kennel Club och PDSA anger en livslängd på över 10 år, men en VetCompass-studie av hundar i Storbritannien fann en median på 7,3 år.",
        "Royal Kennel Club rekommenderar upp till en timmes motion om dagen och borstning en gång i veckan och placerar rasen i kategori 2 i Breed Watch på grund av problem med ögonlock och hudveck. PDSA beskriver shar pei som lojala, hängivna familjehundar som passar bäst för erfarna ägare och äldre barn, varnar för en stark jaktinstinkt mot mindre djur och rekommenderar att hålla hudvecken rena och torra och låta det gå en stund mellan mat och motion.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border collie är en medelstor vallhund från Storbritannien, avlad för uthållighet och hårt arbete. Rasstandarden beskriver en ivrig, vaken, lyhörd och intelligent hund som varken är nervös eller aggressiv.",
        "Kennelklubbar och veterinärer är framför allt överens om en sak: det här är en ras med väldigt mycket energi. Den behöver mer än två timmar motion varje dag och mycket att tänka på. När den är uttråkad eller får för lite motion hittar den på egna sysslor – tuggar på allt den kommer åt eller försöker valla barn som leker.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador, Labrador Retriever",
      text: [
        "Labrador retriever är en stor, kraftigt byggd apporterande fågelhund från Storbritannien, avlad för att apportera. Standarden beskriver en godmodig, vänlig och anpassningsbar kamrat som gärna vill vara till lags och älskar vatten. Pälsen är kort och tät, i svart, gult eller leverbrunt/choklad.",
        "Brittiska välgörenhetsorganisationer beskriver labradoren som en familjehund som knyter an till hela hushållet när den är väl socialiserad. Den är mycket aktiv och starkt matmotiverad: godbitar hjälper i träningen, men labradorer går också lätt upp i vikt.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden, Golden Retriever",
      text: [
        "Golden retriever är en stor apporterande fågelhund från Storbritannien med slät eller vågig päls i guld- eller gräddfärgade nyanser. Standarden beskriver en följsam, intelligent hund som är vänlig, tillmötesgående och trygg.",
        "Brittiska välgörenhetsorganisationer kallar den en utmärkt familjehund för en aktiv familj och en hund som kan passa bra som första hund. Nackdelarna framgår tydligt av källorna: minst två timmar motion om dagen, borstning flera gånger i veckan och en päls som fäller mycket.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "frenchie, French Bulldog",
      text: [
        "Fransk bulldogg är en liten, robust sällskapshund från Frankrike med kort, slät päls och upprättstående ”fladdermusöron”. Standarden beskriver en sällskaplig, livlig och lekfull hund; brittiska välgörenhetsorganisationer kallar den avslappnad och anpassningsbar och säger att den brukar komma bra överens med barn, vilket har gjort den till ett populärt familjedjur.",
        "Den behöver upp till en timme motion om dagen och passar i lägenhet. Nackdelen som alla källor tar upp är det platta ansiktet: det kan göra det svårare att andas, och franska bulldoggar blir snabbt överhettade, särskilt i varmt väder – därför är skugga, vatten och lugna promenader viktiga. PDSA föreslår att familjer också överväger att adoptera en vuxen fransk bulldogg.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "schäfer, German Shepherd, Alsatian, GSD",
      text: [
        "Tysk schäferhund är en stor, kraftfull vallhund från Tyskland med upprättstående öron och tät dubbelpäls, kort eller lång. Standarden beskriver en välbalanserad, självsäker hund med starka nerver, och Royal Kennel Club kallar den en mångsidig arbets- och tjänstehund känd för mod och intelligens.",
        "Den behöver minst två timmar motion om dagen, passar i ett stort hus med trädgård och fäller mycket. Brittiska välgörenhetsorganisationer säger att vissa kan bli utmärkta familjehundar men alltid bör ha tillsyn när små barn är i närheten. Royal Kennel Club ber uppfödare att röntga föräldrarnas höfter och armbågar och anger bakbenens form som en riskpunkt i rasen.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "cavalier, CKCS",
      text: [
        "Cavalier king charles spaniel är en liten toyspaniel från Storbritannien med långa, fransiga öron och lång, silkig päls i fyra färger: blenheim, ruby, black and tan och tricolour. Standarden beskriver en aktiv, graciös hund med ett milt uttryck – sportig, tillgiven, vänlig och orädd.",
        "Den behöver cirka en timme motion om dagen, kan bo i lägenhet och är känd för att fungera bra med barn, även om leken bör ske under tillsyn och den inte tycker om att lämnas ensam. Pälsen behöver borstas mer än en gång i veckan. Brittiska källor nämner hjärtklaffsjukdom och ett smärtsamt ryggmärgstillstånd som hänger ihop med skallens form som de viktigaste hälsoproblemen, så uppfödare ombeds hjärtundersöka och MR-undersöka sina hundar.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Beagle är en liten drivande hund från Storbritannien, avlad för att jaga hare genom att följa spår. Standarden beskriver en robust, kompakt byggd och glad hund – djärv, aktiv och vaken, vänlig och utan aggressivitet eller skygghet – med kort, tät päls i typiska drivhundsfärger som tricolour, tan och vitt eller citron och vitt, och alltid med vit svanstipp.",
        "Den behöver upp till ungefär en timme motion om dagen och passar bra i familjelivet om den socialiseras från ung ålder, men den bör ha tillsyn med barn och inte lämnas ensam, eftersom den då kan skälla och tugga sönder saker. Den korta pälsen behöver borstas en gång i veckan, men den fäller. Träningen bör börja tidigt och bygga på belöning. Brittiska veterinärer behandlar oftast beaglar för viktuppgång och tandsjukdom, så portioner och tänder behöver hållas under uppsikt.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "stor pudel, kungspudel, Standard Poodle",
      text: [
        "Storpudeln är den största av pudelns fyra storlekar, en sällskapsras från Frankrike som härstammar från europeiska andjakthundar. Standarden beskriver en elegant, välbalanserad hund med stolt hållning – lojal, glad och godmodig, lärvillig och mottaglig för träning – med riklig, krusig och lockig päls i en enda helfärg: svart, vit, brun, grå eller fawn.",
        "Den behöver upp till ungefär en timme motion om dagen och passar i ett stort hus med stor trädgård. Med rätt socialisering som valp kommer den i regel bra överens med barn och andra husdjur. Den fäller inte, men det betyder inte att den är allergivänlig: den behöver pälsvård varje dag och regelbunden klippning hos en hundfrisör. Den är känd för att vara mycket lydig och lätt att träna.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "tax, Teckel, Dackel, Dachshund",
      text: [
        "Taxen är en tysk grävlings- och kaninjägare, i hemlandet kallad Teckel, som finns i flera storlekar och med tre hårlag; den här sidan gäller normalstorleken med korthårig päls. Standarden beskriver en hund som är måttligt lång i förhållande till sin höjd, utan överdrifter – trofast, mångsidig och godmodig; intelligent, livlig och modig – med tät, kort och slät päls i rött, eller svart eller choklad med tanteckning.",
        "Den behöver upp till ungefär en timme motion om dagen, uppdelad på ett par promenader med tid att nosa, och passar i ett litet hus. Den älskar människor och kommer i regel bra överens med barn i alla åldrar, alltid under tillsyn, men med sin starka jaktinstinkt rekommenderas den inte tillsammans med mindre husdjur, och den trivs inte med att lämnas ensam. På grund av den långa ryggen och de korta benen är den benägen att få diskbråck, så den bör inte hoppa; uppfödare ombeds undersöka ryggen före avel.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie",
      text: [
        "Australian shepherd är trots namnet en amerikansk ras – en intelligent brukshund med starka vall- och vaktinstinkter. Standarden beskriver en välbalanserad, medelstor hund, något längre än hög, godmodig och ibland reserverad vid första mötet, med medellång, rak till vågig päls i blue merle, svart, red merle eller rött, var och en med eller utan vita teckningar och tanteckningar.",
        "Den behöver mer än två timmar motion om dagen och mentala utmaningar som problemlösningslekar och träning, och passar i ett stort hus med stor trädgård på landet. I rätt hushåll kan den bli ett riktigt bra familjedjur, men den starka vallinstinkten kan få den att valla barn, så den rekommenderas inte för familjer med mindre barn. Den tycker inte om att lämnas ensam, och pälsen behöver borstas några gånger i veckan.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon Havanais, Havanese",
      text: [
        "Havanais är en liten medlem av bichonfamiljen och Kubas nationalhund. Standarden beskriver en robust liten hund, lågställd, med mycket lång, mjuk, slät eller vågig päls som aldrig trimmas och en svans som bärs högt över ryggen. Den finns i fawn, svart, havannabrunt, tobak, rödbrunt och, sällan, vitt, med eller utan fläckar och tanteckningar.",
        "Standarden kallar den tillgiven, lekfull och till och med lite av en clown, och säger att den älskar barn och leker med dem i det oändliga; brittiska källor kallar den ett utmärkt familjedjur med rätt socialisering, och lätt att träna. Den behöver cirka 30 minuter motion om dagen, kan bo i lägenhet och fäller inte – men den långa pälsen behöver vårdas varje dag för att inte tova sig.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie",
      text: [
        "West highland white terrier, eller westie, är en liten terrier från Storbritannien. Standarden beskriver en kraftigt byggd liten hund med djup bröstkorg, rak rygg och sträv dubbelpäls som är cirka 5 cm lång, små upprättstående spetsiga öron och mörka ögon under kraftiga ögonbryn. Vitt är den enda färg standarden tillåter.",
        "Standarden kallar den vaken, glad, modig och självständig men vänlig. Brittiska källor kallar den ett tillgivet, lekfullt familjedjur för barn i alla åldrar, alltid med leken under tillsyn; den behöver cirka en timme motion om dagen, kan bo i lägenhet, fäller och behöver borstas några gånger i veckan. På grund av jaktinstinkten bör den inte bo med mindre husdjur, och den tycker inte om att lämnas ensam. Huden är ett känt problem: Royal Kennel Club ber domare att leta efter tecken på hudinflammation i rasen.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berner, Bernese Mountain Dog",
      text: [
        "Berner sennenhund är en stor schweizisk gårdshund som ursprungligen användes som vakt-, drag- och boskapshund i kantonen Bern. Standarden beskriver en stark, smidig, långhårig brukshund med kraftiga ben och lång, glänsande, rak eller lätt vågig päls. Den enda färg standarden tillåter är trefärgad: kolsvart med djupt brun färg på kinderna, ovanför ögonen, på benen och bröstet, och vita teckningar på huvudet och bröstet.",
        "Standarden kallar den självsäker, godmodig och vänlig, och ”en snäll och hängiven familjehund” som mognar sent. Brittiska källor säger att den behöver upp till en timme motion om dagen, hör hemma i ett stort hus med stor trädgård, fäller mycket och behöver borstas mer än en gång i veckan; den bör inte lämnas ensam länge. Den lever oftast mindre än tio år, och brittiska källor nämner höftledsdysplasi och armbågsledsdysplasi, magomvridning och vissa former av cancer bland dess hälsoproblem.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky",
      text: [
        "Siberian husky är en medelstor slädhund som FCI erkänner som en amerikansk ras och som Royal Kennel Club beskriver som den lättaste och snabbaste av slädhundarna. Standarden kräver en hund som är snabb och lätt på foten, med medellång dubbelpäls, tjocka upprättstående öron, bruna eller blå ögon (ett av varje är tillåtet) och en välbehårad svans. Färgerna går från svart till rent vitt; merle och brindle är inte tillåtna.",
        "Standarden kallar den vänlig och mild, vaken och utåtriktad. Brittiska källor säger att den behöver mer än två timmar motion om dagen, ett stort hus med stor trädgård och ett mycket säkert, högt staket, eftersom huskyer är kända för att rymma; den fäller mycket, behöver borstas några gånger i veckan och klarar sig dåligt ensam. PDSA föreslår den för hem med bara vuxna eller med tonåringar snarare än för familjer med mindre barn, och nämner höftledsdysplasi, ögonproblem och epilepsi bland dess hälsoproblem.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Rottweilern är en medelstor till stor, kraftfull brukshund från Tyskland. Standarden beskriver en ståndaktig hund, varken tung eller lätt, med kort, grov och tätt åtliggande päls, medelstora hängande öron och mörkbruna mandelformade ögon. Den enda färg den tillåter är svart med tydligt avgränsade, djupt bruna teckningar på kinderna, nosen, strupen, bröstet och benen; vita teckningar är ett fel.",
        "Standarden kallar den godmodig, lugn, mycket hängiven, lydig och arbetsvillig, och Royal Kennel Club säger att en vältränad rottweiler är en underbar familjekamrat. Brittiska källor säger att den behöver mer än två timmar motion om dagen, ett stort hus med stor trädgård och en erfaren ägare, eftersom den är så kraftfull; den bör socialiseras från ung ålder. PDSA rekommenderar den inte för familjer med yngre barn och bebisar, och den bör aldrig lämnas utan tillsyn med andra husdjur. Det räcker med borstning en gång i veckan. Den lever oftast mindre än tio år, och Royal Kennel Club håller ett öga på bakbenens form.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "English Bulldog, British Bulldog",
      text: [
        "Bulldoggen är en medelstor, korthårig hund från Storbritannien: ganska satt, lågställd, bred, kraftfull och kompakt, med relativt kort ansikte, små tunna rosenöron och runda, mycket mörka ögon. Standarden tillåter helfärger som rött, fawn, fallow och vitt, samt brindle och pied; svart och svart med tan är högst oönskade. Den kräver stora, vidöppna näsborrar och säger att hundar som visar andningsbesvär är högst oönskade.",
        "Standarden kallar den vaken, djärv, lojal, pålitlig och modig, med bistert utseende men tillgiven, och Royal Kennel Club säger att den fortfarande är mycket populär som familjekamrat tack vare sin personlighet och lojalitet. Brittiska källor säger att den behöver upp till en timme motion om dagen, aldrig under dagens varmaste timmar, och kommer bra överens med andra husdjur om den socialiseras ung; pälsen behöver vårdas en gång i veckan, men rynkorna i ansiktet behöver rengöras varje dag. PDSA beskriver den som en extremt trubbnosig ras som med stor sannolikhet får allvarliga hälsoproblem, som andningssvårigheter, och rekommenderar starkt att man överväger en friskare ras, en korsning eller en blandras. Den lever oftast mindre än tio år.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "vorsteh, GSP, Deutsch Kurzhaar",
      text: [
        "Korthårig vorsteh är en mångsidig stående fågelhund från Tyskland, byggd för arbete på fält och i vatten, med kort, tjock päls som känns sträv mot handen, breda platta högt ansatta öron och mörkbruna mandelformade ögon. Den amerikanska standarden tillåter helt leverbrunt, leverbrunt och vitt (till exempel prickigt), helt svart och svart och vitt; röda, orange, citronfärgade eller tanfärgade partier och en helt vit hund diskvalificerar. Standarden beskriver en kuperad svans – PetPrep visar alltid hunden med naturlig svans.",
        "Standarden kallar den vänlig, intelligent och villig att vara till lags. Royal Kennel Club och PDSA säger att den behöver mer än två timmar motion om dagen; PDSA tillägger att instinkten att jaga, stå för fågel och apportera kan sätta in på promenaden, så den behöver bra inkallningsträning, och att den är ganska lätt att träna. Pälsen behöver vårdas en eller två gånger i veckan, och den fäller måttligt. En stor brittisk studie anger dess förväntade medianlivslängd till 13,4 år.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "yorkie",
      text: [
        "Yorkshireterriern är en toyterrier från Storbritannien som enligt rasstandarden väger upp till 3,2 kg, med lång, helt rak, glansig och silkig päls som hänger jämnt ner på båda sidor från en bena längs ryggen. Standarden tillåter en färg: mörkt stålblå från bakhuvudet till svansen, med djup, klar tan på huvudet, bröstet och benen; de små V-formade öronen bärs upprätta. Standarden beskriver både kuperad och okuperad svans – PetPrep visar alltid hunden med naturlig svans.",
        "Standarden kallar den vaken, intelligent och livfull, med jämnt temperament. Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård varje dag; PDSA tillägger att den gillar att springa, apportera och leka, kan vara ganska envis att träna och passar bättre för familjer med äldre barn eftersom skelettet är mycket skört. En stor brittisk studie fann att tandsjukdom är det vanligaste problemet i rasen, uppmuntrar till daglig tandvård som tandborstning och fann en medianålder vid död på 13,56 år.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italian Corso Dog",
      text: [
        "Cane corso är en medelstor till stor italiensk molosser, en robust och kraftig hund med en viss elegans som är något längre än hög. Standarden beskriver en kort, glänsande, mycket tät päls i svart, grå nyanser, fawn eller rött med mörk mask, mörkt vetefärgat eller brindle; stora vita fläckar är inte tillåtna. Enligt den nuvarande FCI-standarden lämnas öronen okuperade och svansen naturlig – och i Storbritannien är kupering av öron och svans olagligt – så PetPrep visar alltid hunden med naturliga öron och svans.",
        "Standarden kallar den en väktare av egendom, familj och boskap, extremt smidig och lyhörd. PDSA säger att den är sällskaplig och kärleksfull mot sina ägare, behöver runt två timmar motion om dagen och saker att göra, eftersom den lätt blir uttråkad, och passar bättre för erfarna ägare på grund av sin storlek. PDSA rekommenderar inte rasen för hem med små barn, som kan bli omkullknuffade; den passar i hem med bara vuxna eller i familjer med äldre barn. Det räcker med borstning en gång i veckan, men den fäller och är känd för att dregla. PDSA anger dess genomsnittliga livslängd till under tio år.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, Pembroke Welsh Corgi",
      text: [
        "Welsh corgi pembroke är en liten boskapshund från Wales, lågställd, stark och kraftigt byggd, som ger ett intryck av substans och uthållighet i ett litet format. Standarden beskriver en medellång, rak päls med tät underull i rött, sobel, fawn eller svart och tan, med eller utan vita teckningar på benen, bröstet och halsen, och upprättstående öron. Svansen kuperades förr av tradition; standarden beskriver också den naturliga svansen, och PetPrep visar alltid hunden med naturlig svans.",
        "Standarden kallar den djärv, arbetsam, utåtriktad och vänlig. Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård mer än en gång i veckan; PDSA beskriver vänliga, glada och lekfulla hundar som gärna vill vara till lags och är ganska lätta att träna, men säger att de kan nafsa i hälarna på barn som springer, så socialisering med barn och träning från ung ålder hjälper. Royal Kennel Club anger livslängden till över 12 år och ber uppfödare att låta höftröntga föräldrarna.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "Dobermann är en tysk sällskaps-, skydds- och brukshund av medelstorlek, stark och muskulöst byggd, med eleganta linjer och stolt hållning. FCI-standarden beskriver en kort, hård, tät päls som ligger tätt och slätt, i svart eller brunt med tydligt avgränsade rostbruna teckningar; vita fläckar är inte tillåtna. Öronen och svansen lämnas naturliga enligt FCI-standarden, och PetPrep visar alltid hunden med naturliga öron och svans.",
        "Standarden kallar den vänlig och lugn och mycket hängiven sin familj. Royal Kennel Club säger att dess lojala och lydiga natur gör den till en utmärkt familjehund, och rekommenderar mer än två timmar motion om dagen och pälsvård en gång i veckan. PDSA tillägger att den är mycket energisk, behöver mycket mental och fysisk aktivitet och tidig socialisering, och – på grund av sin storlek och kraftiga byggnad – inte rekommenderas för familjer med små barn eller för förstagångsägare. Royal Kennel Club anger livslängden till över 10 år.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Deutscher Boxer, German Boxer",
      text: [
        "Boxern är en tysk bruks- och sällskapshund av medelstorlek, med kvadratisk byggnad, kraftig benstomme och välutvecklade muskler. Standarderna beskriver en kort, glansig, slät päls i gult (fawn) eller brindle med svart mask; vita teckningar är tillåtna men bör inte täcka mer än en tredjedel av pälsen. Nosen ska vara bred och djup, aldrig kort, med vida näsborrar. Svansen kuperades förr av tradition; standarden beskriver också den okuperade svansen, och PetPrep visar alltid hunden med naturliga öron och svans.",
        "Standarden kallar den harmonisk, följsam, orädd och självsäker. Royal Kennel Club kallar den mycket älskad som familjekamrat och rekommenderar mer än två timmar motion om dagen och pälsvård en gång i veckan. PDSA beskriver en mycket energisk, lekfull hund som älskar människors sällskap och kan utveckla separationsångest om den lämnas ensam, har en mycket stark jaktinstinkt och – på grund av sin storlek och sitt yra sätt – inte rekommenderas för hem med yngre barn eller för förstagångsägare; vissa boxrar med kortare nos kan få allvarliga andningsproblem. Royal Kennel Club anger livslängden till över 10 år.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Miniature Schnauzer",
      text: [
        "Dvärgschnauzern är en liten tysk sällskapshund: stark, satt och nästan kvadratisk, med sträv, trådig och tät päls, buskiga ögonbryn och skägg. FCI-standarden tillåter peppar och salt, svart och silver, helsvart och helvit; PetPrep visar de tre första. Svansen kuperades förr av tradition och öronen ibland; FCI-standarden kräver naturlig svans och hängande öron, och PetPrep visar alltid hunden med naturliga öron och svans.",
        "FCI listar den som hus- och sällskapshund, och Royal Kennel Club säger att den är mycket populär som sällskap. Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård mer än en gång i veckan och säger att den inte fäller. PDSA beskriver en lekfull, nyfiken hund som kan komma bra överens med barn om den får träffa dem tidigt, kan vara envis i träningen och behöver pälsvård två till tre gånger i veckan samt då och då klippning eller trimning hos en hundfrisör. Royal Kennel Club anger livslängden till över 10 år.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Shih tzu är en liten sällskapshund från Tibet; Storbritannien ansvarar för dess FCI-standard. Standarderna beskriver en robust hund med riklig päls, stolt hållning och ett ansikte ”som en krysantemum”: lång, tät täckpäls, stora mörka runda ögon, stora hängande öron och en rikt behårad svans som bärs över ryggen. Standarderna tillåter många färger; PetPrep visar guld och vitt, svart och vitt samt leverbrunt och vitt, och aldrig merle. Nosen är kort och platt, och PDSA nämner andningsproblem som orsakas av det kortare ansiktet, så PetPrep ritar alltid ett måttligt ansikte med öppna näsborrar.",
        "FCI beskriver den som intelligent, aktiv och vaken, vänlig och självständig. Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård varje dag, och anger lägenhet som ett lämpligt hem. PDSA säger att shih tzuer kan bli godmodiga familjedjur om de har fått rätt socialisering och träning, kallar dem ett idealiskt husdjur för förstagångsägare, rekommenderar att de alltid hålls under tillsyn tillsammans med barn, och rekommenderar daglig borstning samt klippning hos en hundfrisör var sjätte till åttonde vecka för de flesta sällskapshundar. Royal Kennel Club anger livslängden till över 10 år.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deutsche Dogge, Great Dane",
      text: [
        "Grand danois är en tysk jätte: FCI-standarden säger att den förenar en stor, kraftfull och välbyggd kropp med stolthet, styrka och elegans, med långt, smalt huvud, naturligt hängande öron och mycket kort, slät och glansig päls. Standarderna anger gul och tigrerad – helst med svart mask – samt harlekin, svart och blå; PetPrep visar bara färger som både FCI och Royal Kennel Club anger, aldrig merle eller mantel, och ritar alltid hunden med naturliga öron och svans och åtsittande ögonlock, eftersom Royal Kennel Club ber domare att se upp med inåt- eller utåtvända ögonlock och svaga bakben.",
        "FCI kallar den vänlig, kärleksfull och hängiven sina ägare, även om den kan vara reserverad mot främlingar. Royal Kennel Club säger att den trots sin storlek är en underbar familjehund, och rekommenderar mer än två timmar motion om dagen, ett stort hus och trädgård samt pälsvård en gång i veckan. PDSA säger att grand danoiser är kända för att dregla, har en ganska stark jaktinstinkt och inte rekommenderas för hem med yngre barn på grund av sin storlek och styrka; PDSA rekommenderar att låta det gå en stund mellan mat och motion för att förebygga magomvridning. Royal Kennel Club anger livslängden till under 10 år.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pom, tysk dvärgspets, Zwergspitz",
      text: [
        "Pomeranian är den minsta spetsen: FCI räknar den som dvärgvarianten av tysk spets, 21 cm ± 3 cm i mankhöjd, och Royal Kennel Clubs standard beskriver en kompakt, kort liten hund med rävlikt huvud, små upprättstående öron och en svans som bärs över ryggen. Dubbelpälsen har mjuk, fluffig underull och lång, rak täckpäls som bildar en krage runt halsen. Standarden tillåter många helfärger, som orange, crème, vitt, svart och brunt, men aldrig merle; PetPrep ritar en naturlig, otrimmad päls.",
        "FCI kallar dess temperament sällskapligt och glatt, och Royal Kennel Clubs standard kallar den utåtriktad, livlig och intelligent. Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och anser att den passar i lägenhet; PDSA säger att dubbelpälsen behöver borstas två till tre gånger i veckan. AKC säger att pomeranianer brukar passa bättre för familjer med äldre barn, kan komma bra överens med andra djur om de socialiseras tidigt, och rekommenderar starkt tidig socialisering och valpkurs. Royal Kennel Club anger livslängden till över 12 år.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, American Gentleman",
      text: [
        "Bostonterriern kommer från USA. FCI-standarden beskriver en livlig, mycket intelligent, korthårig, korthövdad, kompakt byggd, kortsvansad och välbalanserad hund, brindle, seal eller svart med jämnt fördelade vita teckningar: ett vitt band runt nosen, en vit bläs mellan ögonen och vitt förbröst krävs, och brindle föredras. PetPrep ritar den i brindle och vitt, med måttlig nos, öppna näsborrar och naturliga öron och svans.",
        "Det är en trubbnosig (brakycefal) ras, och PDSA varnar för att den aldrig bör motioneras under dagens varmaste timmar eftersom den lätt blir överhettad. Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård en gång i veckan, anser att den passar i lägenhet och anger livslängden till över 10 år. PDSA kallar bostonterrier perfekta familjedjur som är särskilt bra med barn när de har socialiserats väl som valpar; AKC säger att de fungerar bra med barn som vet hur man är försiktig med djur, inte mår bra av att lämnas ensamma länge, och rekommenderar starkt tidig socialisering och valpträning.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "Miniature american shepherd kommer från USA. FCI-standarden beskriver en liten vallhund med starka vall- och vaktinstinkter, intelligent och främst en brukshund, något längre än hög, med medellång, rak till vågig och väderbeständig päls. Färgerna är svart, blue merle, rött och red merle, med eller utan vita teckningar och tanteckningar, och ögonen kan vara bruna, blå, hasselnötsbruna eller bärnstensfärgade. PetPrep ritar den i blue merle med naturlig svans.",
        "PetMD säger att den har mycket energi och behöver minst en timme motion varje dag, helst två, tillsammans med uppgifter som håller hjärnan sysselsatt, och att den bör borstas ett par gånger i veckan; AKC säger att borstning en gång i veckan räcker större delen av året, med daglig borstning under fällningsperioden. AKC säger att den kan bli en utmärkt familjehund med lydnadsträning och tidig socialisering, och brukar vara bra med barn men kan försöka valla dem; PetMD tillägger att dess hängivenhet till familjen kan leda till separationsångest när den lämnas ensam. PetMD anger livslängden till 12–13 år.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chi, Chihuahueño, korthårig chihuahua",
      text: [
        "Chihuahuan kommer från Mexiko. Kennel Clubs standard beskriver en liten, nätt och kompakt hund med ett piggt uttryck och ett glatt, livligt och intelligent temperament, en välvd ”äppelformad” skalle, en måttligt kort, något spetsig nos, stora runda ögon som inte är utstående, stora öron och en skärformad svans; alla färger och färgkombinationer är tillåtna, men aldrig merle, och önskad vikt är 1,8–2,7 kg. Royal Kennel Club räknar korthårig och långhårig chihuahua som två raser; PetPrep ritar den korthåriga i fawn, med måttligt huvud.",
        "Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård en gång i veckan, anser att den passar i lägenhet och anger livslängden till över 12 år. PDSA säger att chihuahuor är så små och lätta att barn frestas att lyfta upp dem, vilket de knappast uppskattar, så de passar bättre för familjer med något äldre barn. PDSA tillägger att de som sällskapshundar älskar sällskap och behöver ha någon hemma hela tiden, och att de bör socialiseras från ung ålder med många olika människor, upplevelser och platser.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer, ESS",
      text: [
        "Engelsk springer spaniel kommer från Storbritannien, där den avlades för att söka, stöta och apportera vilt. Kennel Clubs standard beskriver en symmetriskt byggd, kompakt, stark, glad och aktiv hund – den mest högställda av de brittiska landspanielerna – med vänligt, glatt och följsamt temperament, långa fransiga öron, mörkt hasselnötsbruna ögon och tät, rak, väderbeständig päls; färgerna är leverbrunt och vitt eller svart och vitt, även med tanteckningar, och mankhöjden är cirka 51 cm. PetPrep ritar den leverbrun och vit, med naturlig svans.",
        "Royal Kennel Club rekommenderar mer än 2 timmar motion om dagen och pälsvård mer än en gång i veckan, och anger livslängden till över 10 år. PDSA säger att springrar blir bra familjehundar som kommer bra överens med barn och andra husdjur, är lydiga och lärvilliga och behöver pälsvård en eller två gånger i veckan samt klippning var tredje månad. AKC tillägger att de inte bör lämnas ensamma länge och att tidig socialisering och valpkurser är avgörande.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltie, Shetland Collie (tidigare namn)",
      text: [
        "Shetland sheepdog kommer från Storbritannien och är en liten, långhårig brukshund. FCI-standarden beskriver en vaken, mild, intelligent, stark och aktiv hund, tillgiven och lojal mot sin ägare och reserverad mot främlingar, med ett huvud som liknar en lång, trubbig kil, små öron som bärs halvt upprättstående med tipparna framåtfällda och dubbelpäls med lång, sträv täckpäls; färgerna är sobel, tricolour, blue merle, svart och vitt samt svart och tan, och idealisk mankhöjd är 37 cm för hanar och 35,5 cm för tikar. PetPrep ritar den sobel och vit.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård varje dag, och anger livslängden till över 10 år. PDSA säger att shelties är mycket milda, lekfulla och lydiga hundar som ofta passar bra in i familjelivet och trivs med barn, och att träning och socialisering är mycket viktiga i ung ålder. AKC tillägger att de behöver regelbunden mental och fysisk aktivitet, passar bäst med äldre barn på grund av vallinstinkten och är kända för att vara mycket skälliga.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Brittany, Brittany Spaniel",
      text: [
        "Epagneul breton är en stående fågelhund från Frankrike, på engelska kallad Brittany. Royal Kennel Club beskriver en mycket energisk, intelligent hund som söker, står för fågel och apporterar, mild och tillgiven men full av liv och livsglädje, med tät, ganska fin päls, högt ansatta triangulära öron och en svans som ofta är naturligt kort; standardfärgerna är orange, leverbrunt eller svart med vitt, skimmel eller trefärgat, och mankhöjden är 48–51 cm för hanar och 47–50 cm för tikar. PetPrep ritar den orange och vit.",
        "Royal Kennel Club rekommenderar mer än 2 timmar motion om dagen och pälsvård mer än en gång i veckan, och anger livslängden till över 10 år. AKC säger att epagneul breton är energiska hundar som behöver mycket motion och mental stimulans, är milda och brukar ha tålamod med barn, och att borstning en gång i veckan håller dem i fint skick. PetMD tillägger att tidig socialisering av valparna är ett måste, att de inte mår bra av att lämnas ensamma länge och att de, avlade för fågeljakt, har en stark jaktinstinkt.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "American Cocker Spaniel, Cocker Spaniel (USA)",
      text: [
        "Amerikansk cocker spaniel – i USA helt enkelt Cocker Spaniel – är en annan ras än engelsk cocker spaniel. AKC:s standard kallar den den minsta medlemmen i Sporting Group, med långa, lobformade, välfransade öron, rundad skalle och bred, djup nos, och silkig päls som är slät eller lätt vågig; den finns i svart, i alla helfärger från ljusaste crème till mörkaste rött, och i flerfärgat med vitt. Standarden kräver ett harmoniskt temperament utan antydan till skygghet.",
        "Royal Kennel Club rekommenderar pälsvård varje dag och mer än 2 timmar motion om dagen, och anger livslängden till över 10 år; AKC och PetMD skriver att den inte behöver särskilt mycket motion. PetMD kallar dessa godmodiga hundar utmärkta familjehundar, vänliga mot människor och andra djur, och rekommenderar att börja socialisering och träning tidigt; VCA skriver att de oftast är mycket bra med barn, lätt blir överviktiga och behöver få öronen kontrollerade varje vecka.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, belgisk vallhund (malinois)",
      text: [
        "Malinois är den korthåriga varianten av belgisk vallhund, en vallhundsras från Belgien. FCI-standarden beskriver en harmoniskt proportionerad hund som förenar elegans och kraft, och tillåter bara en färg: fawn med svart anlöpning och svart mask. FCI:s och AKC:s standarder beskriver ganska små, upprättstående, triangulära öron, kort, hård päls med tät underull och ett vaket, intelligent, nyfiket och självsäkert temperament.",
        "Royal Kennel Club rekommenderar mer än 2 timmar motion om dagen och pälsvård mer än en gång i veckan, och anger livslängden till över 10 år. AKC skriver att den inte är ett bra val för förstagångsägare, fungerar bäst med äldre, ansvarsfulla barn och inte bör lämnas ensam länge; PetMD nämner en stark jaktinstinkt, att den kan försöka valla barn och att den behöver ständig daglig träning och tidig socialisering.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset",
      text: [
        "Basset hound är en kortbent drivande hund från Storbritannien. FCI-standarden beskriver en välbalanserad hund med betydande substans, lugn, aldrig aggressiv eller skygg, och tillgiven, med lågt ansatta, långa, sammetslena öron, slät, kort päls och färgerna svart, vitt och tan eller citron och vitt. Royal Kennel Clubs Breed Watch ber utställningsdomare att se upp med inåt- eller utåtvända ögonlock, mycket långa öron, ömma hudveck och överflödig hud.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård en gång i veckan, och anger livslängden till över 10 år. PDSA beskriver en tålmodig hund som kommer mycket bra överens med barn och älskar sällskap, med god aptit som behöver hållas under uppsikt; PDSA rekommenderar att kontrollera hudvecken varje dag och låta det gå en stund mellan mat och motion. AKC tillägger att nosen kan leda den vilse, så säkra koppel och inhägnade områden är viktiga.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vizsla, Magyar Vizsla, Hungarian Pointer",
      text: [
        "Vizsla är en medelstor, elegant stående fågelhund från Ungern med kort, rostgyllene päls. FCI-standarden beskriver en livlig, vänlig hund med jämnt temperament som är lätt att träna och håller nära kontakt med sin förare; färgerna är nyanser av rostgyllene och mörkt sandgyllene. Royal Kennel Clubs Breed Watch anger inga rasspecifika riskpunkter.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och pälsvård en gång i veckan, och anger livslängden till över 12 år. PDSA beskriver en mycket människoorienterad hund som älskar sällskap och kan drabbas av separationsångest när den lämnas ensam; den kommer bra överens med äldre barn, men PDSA skulle inte rekommendera den med mycket små barn eller för förstagångsägare, och på grund av den starka jaktinstinkten avråder PDSA från att hålla den tillsammans med mindre husdjur. PDSA rekommenderar också att låta det gå en stund mellan mat och motion.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "cocker, English Cocker Spaniel, Cocker Spaniel (UK)",
      text: [
        "Engelsk cocker spaniel – i Storbritannien helt enkelt Cocker Spaniel – är en annan ras än amerikansk cocker spaniel. FCI-standarden beskriver en glad, robust jakthund, välbalanserad och kompakt, med lågt ansatta lobformade öron och slät, silkig päls; AKC:s standard kallar den glad och tillgiven, med harmoniskt sinnelag, och anger helsvart, leverbrunt och nyanser av rött samt flerfärgat med vitt. Royal Kennel Clubs Breed Watch anger inga rasspecifika riskpunkter.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård varje dag, och anger livslängden till över 10 år; en VetCompass-studie av engelsk cocker spaniel i Storbritannien fann en medianålder vid död på 11,44 år. PDSA säger att den tack vare sin tålmodiga personlighet brukar komma bra överens med barn, alltid under tillsyn, men varnar för att den är känd för separationsångest och aldrig bör lämnas ensam mer än fyra timmar. PDSA rekommenderar också daglig borstning och att låta det gå en stund mellan mat och motion.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, Maltese",
      text: [
        "Maltesern är en dvärghund från centrala Medelhavsområdet, i dag under italienskt beskydd inom FCI. FCI-standarden beskriver en liten hund med ganska lång kropp, livlig, tillgiven, mycket lugn och mycket intelligent, som väger 3–4 kg, med mycket lång, tät och silkig päls som faller tungt över hela kroppen. Pälsen saknar underull, och rent vitt är den enda färgen (en blek elfenbensnyans är tillåten). Royal Kennel Clubs Breed Watch anger inga rasspecifika riskpunkter.",
        "Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård varje dag, säger att rasen inte fäller och anger livslängden till över 12 år. PDSA beskriver en pigg, vänlig och tillgiven hund som kan vara reserverad mot främlingar men med rätt socialisering som ung kan lära sig att bli trygg och sällskaplig. PetMD varnar för att den kan utveckla separationsångest om den lämnas ensam för länge, säger att umgänget med små barn måste ske under tillsyn och rekommenderar att borsta tänderna varje dag.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Carlin",
      text: [
        "Mopsen är en liten sällskapshund från Kina, i dag under brittiskt beskydd inom FCI. FCI-standarden beskriver en tydligt kvadratisk och satt hund – ”multum in parvo” – med stor charm, värdighet och intelligens och ett jämnt, glatt och livligt temperament, en idealvikt på 6,3–8,1 kg, en fin, slät, kort och glansig päls i silver, aprikos, fawn eller svart och en svans som är tätt ringlad över höften. Den kräver ganska stora, väl öppna näsborrar och anser att trånga näsborrar och ett tungt veck över nosen är oacceptabla. Royal Kennel Club placerar rasen i Breed Watch kategori 3, med riskpunkter som bland annat andningssvårigheter, utstående ögon, hudveckseksem och fetma.",
        "PDSA kallar mopsen en extremt brakycefal (trubbnosig) ras som lätt blir andfådd, rekommenderar att undvika motion i värmen och säger att dess veterinärer starkt skulle rekommendera en ras med normal nos eller en mopskorsning i stället. Royal Kennel Club rekommenderar upp till 1 timme motion om dagen och pälsvård en gång i veckan, säger att rasen fäller och anger livslängden till över 10 år. PDSA beskriver en hund som ofta kommer bra överens med barn och andra husdjur men älskar sällskap och inte mår bra av att lämnas ensam; PetMD rekommenderar att rengöra och torka hudvecken i ansiktet varje dag och påpekar att fetma är vanligt i rasen.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "långhårig collie, Rough Collie",
      text: [
        "Långhårig collie är en stor vallhund från Storbritannien. FCI-standarden beskriver en hund med stor skönhet som står med lugn värdighet, med vänligt sinnelag utan spår av nervositet eller aggressivitet, mycket tät päls med rak, sträv täckpäls, och tre färger: sobel, tricolour och blue merle. Royal Kennel Clubs standard kallar den en utmärkt sällskapshund, vänlig, glad och aktiv, bra med barn och andra hundar, och anger mankhöjden till 56–61 cm för hanar och 51–56 cm för tikar. Royal Kennel Club placerar rasen i Breed Watch kategori 2 och registrerar inte valpar från parningar mellan två merlehundar.",
        "Royal Kennel Club rekommenderar upp till 1 timme motion om dagen och pälsvård varje dag, säger att rasen fäller och anger livslängden till över 12 år. PetMD säger att collier är tillgivna, särskilt mot barn, och bra med andra djur, men inte mår bra av att vara ensamma länge och kan nafsa i anklar och hälar när de blir uppspelta. PetMD påpekar också att valpsocialisering är avgörande och att MDR1-mutationen, som påverkar hur en hund bryter ner vissa läkemedel, förekommer hos collier.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "English Mastiff, Old English Mastiff",
      text: [
        "Mastiffen är en mycket stor vakthundsras från Storbritannien. FCI-standarden beskriver en kombination av storhet och mod – lugn, tillgiven mot sina ägare men kapabel att vakta – med kvadratiskt huvud, bred, djup och kraftfull kropp och kort, tätt åtliggande päls i aprikos, fawn eller brindle. PDSA anger en genomsnittlig mankhöjd på 71–78 cm och en genomsnittlig vikt på 80–85 kg och påpekar att Kennel Club placerar mastiffen i kategori tre: raser med synliga exteriöra problem som kan orsaka smärta, obehag eller hälsoproblem.",
        "PDSA rekommenderar runt en timme motion om dagen för vuxna hundar – men ingen överansträngning medan en valps skelett och leder fortfarande utvecklas – pälsvård en gång i veckan med daglig rengöring av rynkorna i ansiktet, och anger en genomsnittlig livslängd på under 10 år. PetMD kallar mastiffer utmärkta familjehundar för hem med barn som förstår hur man umgås med djur, men kanske inte med småbarn eller bebisar på grund av storleken; de brukar fungera bra med andra husdjur som de har vant sig vid som valpar, dreglar mycket och bör inte motioneras en timme före och efter måltider på grund av risken för magomvridning.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba, Japanese Shiba Inu",
      text: [
        "Shiba är en liten spets från Japan; namnet betyder ”liten hund”, och enligt Royal Kennel Club utvecklades den för att jaga småfågel. FCI-standarden beskriver en liten, välbalanserad hund med god benstomme, trofast temperament, skarpa sinnen och hög vaksamhet, sträv täckpäls över mjuk, tät underull, små upprättstående triangulära öron och en tjock ringlad svans; färgerna är röd, svart och tan samt sesam, alltid med vitaktiga ”urajiro”-teckningar på kinderna, bröstet och undersidan. AKC:s standard anger en genomsnittsvikt på cirka 23 pund (10 kg) för hanar och 17 pund (8 kg) för tikar.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård en gång i veckan, påpekar att rasen fäller och anger livslängden till över 10 år; en stor brittisk studie fann en medianlivslängd på 14,6 år. AKC beskriver en självsäker, självständig hund som är ett bättre val för en erfaren ägare, trivs bäst med äldre barn och aldrig bör släppas lös utanför ett staket eller inhägnat område. PetMD tillägger att den behöver mycket mental stimulans, mår bra av socialisering som valp och bör få tänderna borstade varje dag.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, African Lion Dog",
      text: [
        "Rhodesian ridgeback kommer från södra Afrika. Det mest kända kännetecknet är kammen på ryggen, en rand av hår som växer åt motsatt håll mot resten av pälsen. FCI-standarden beskriver en välbalanserad, stark, muskulös, smidig och aktiv hund som är värdig, intelligent och reserverad mot främlingar, särskilt uppskattad som vakthund och familjedjur. Den korta, täta pälsen är ljust till rött vetefärgad, och standarden anger en vikt på cirka 36,5 kg för hanar och 32 kg för tikar.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och pälsvård en gång i veckan, påpekar att rasen fäller och passar i ett stort hus med stor trädgård, och anger livslängden till över 10 år. PDSA beskriver lekfulla, kraftfulla och mycket lojala hundar med mycket stark jaktinstinkt som inte rekommenderas för förstagångsägare, aldrig bör lämnas ensamma mer än fyra timmar och behöver socialiseras från ung ålder; PDSA rekommenderar också att låta det gå en stund mellan mat och motion. Woodgreen tillägger att de passar bäst med äldre barn.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontinental toyspaniel, phalène (med hängande öron), fjärilshund",
      text: [
        "Papillon är varianten med upprättstående öron av kontinental toyspaniel, en ras från Belgien och Frankrike; varianten med hängande öron kallas phalène. FCI-standarden beskriver en liten, elegant toyspaniel med långt hår och livlig personlighet, cirka 28 cm hög och med en vikt på upp till 4,5 kg för hanar och 5 kg för tikar. De stora öronen bärs som en fjärils utbredda vingar, och pälsen är alltid vit med färgade fläckar.",
        "Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård mer än en gång i veckan, påpekar att rasen fäller och kan bo i lägenhet, och anger livslängden till över 12 år. PDSA beskriver milda, lekfulla, mycket lydiga hundar som kommer bra överens med alla och behöver träning och socialisering i ung ålder; PDSA föreslår pälsvård två till tre gånger i veckan. PetMD tillägger att papilloner behöver daglig mental stimulans, kan utveckla separationsångest och bör få tänderna borstade varje dag, och att mycket små barn av misstag kan skada en så liten hund.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, portie",
      text: [
        "Portugisisk vattenhund kommer från Portugal, där den arbetade tillsammans med fiskare. Royal Kennel Clubs standard beskriver en robust, nästan kvadratisk, mycket kraftigt musklad hund – mycket intelligent och enormt energisk, med stor förmåga att simma och dyka – med en mankhöjd på 50–57 cm (hanar) och 43–52 cm (tikar) och en vikt på 19–25 kg (hanar) och 16–22 kg (tikar). Den rikliga enkla pälsen saknar underull och finns i svart, vitt, brunt, eller svart eller brunt med vitt; den traditionella lejonklippningen lämnar nosen och bakpartiet korta.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård varje dag, påpekar att rasen inte fäller och passar i ett stort hus, och anger livslängden till över 10 år. PDSA beskriver mycket vänliga, kärleksfulla hundar som kommer bra överens med andra husdjur, blir utmärkta familjedjur och behöver träning och socialisering i ung ålder; PDSA tillägger att pälsen klipps och formas av en hundfrisör under året.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Tenerife",
      text: [
        "Bichon frisé är en fransk-belgisk sällskapshund. FCI-standarden beskriver en glad liten hund med livliga rörelser och mycket lös, vit korkskruvslockig päls – en sann sällskapshund som kan tas med överallt, varken nervös eller benägen att skälla ofta – med en mankhöjd på 25–29 cm och en vikt på cirka 5 kg. En vuxen hund är alltid helt vit, med mycket mörka runda ögon, svart nos, hängande öron och en plymliknande svans som bärs över ryggen.",
        "Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård varje dag, påpekar att rasen inte fäller och passar i lägenhet, och anger livslängden till över 12 år. PDSA beskriver mycket tillgivna, kärleksfulla hundar som är utmärkta med barn och andra husdjur, och tillägger att pälsen behöver trimmas varannan månad eller så, ofta av en hundfrisör.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "newfie",
      text: [
        "Newfoundlandshunden kommer från Kanada; FCI räknar den till molosserna av bergshundstyp och erkänner tre färger: svart, vit med svart (landseer) och brun. PDSA kallar newfoundlandshundar milda jättar och anger en genomsnittlig mankhöjd på 66–71 cm och en genomsnittlig vikt på 50–69 kg; PetMD tillägger att rasens historia gör dem till naturliga simmare.",
        "PDSA rekommenderar minst en timme motion om dagen för vuxna hundar, men att valpar inte överansträngs medan skelett och leder fortfarande utvecklas; PDSA kallar pälsvården en daglig uppgift, påpekar att newfoundlandshundar gärna dreglar och anger livslängden till under 10 år. PetMD kallar rasen ett enastående familjedjur som kommer bra överens med barn, små husdjur och andra hundar, rekommenderar tillsyn av små barn tillsammans med alla hundar och varnar för att vissa kan utveckla separationsångest när de lämnas ensamma.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Dalmatian",
      text: [
        "Dalmatinern kommer från Kroatien; FCI räknar den till raserna som är besläktade med drivande hundar. Den korta, glänsande pälsen är rent vit med tydligt avgränsade svarta eller leverbruna (bruna) fläckar, och standarden kräver fläckiga öron. FCI anger en mankhöjd på 56–62 cm för hanar och 54–60 cm för tikar; PDSA anger en genomsnittlig vikt på 18–27 kg.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och borstning en gång i veckan, och säger att rasen fäller och passar i ett stort hus med trädgård. PDSA kallar dalmatiner utmärkta husdjur för aktiva hushåll som passar bättre med äldre barn, behöver sällskap och aldrig bör lämnas ensamma mer än fyra timmar; PDSA nämner dövhet bland rasens hälsoproblem och påpekar att det finns ett BAER-hörseltest.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler",
      text: [
        "Australian cattle dog kommer från Australien; FCI räknar den till boskapshundarna. Kennel Clubs standard beskriver en stark, kompakt brukshund med slät, väderbeständig dubbelpäls i blått (fläckigt eller prickigt) eller jämnt rödprickigt, och anger en mankhöjd på 46–51 cm för hanar och 43–48 cm för tikar; PDSA anger en genomsnittlig vikt på 16–20 kg.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och borstning en gång i veckan, och säger att rasen fäller. PDSA beskriver en mycket intelligent och energisk hund som behöver mycket fysisk och mental aktivitet; på grund av den starka vallinstinkten kan den nafsa i hälarna på barn som springer, och socialisering och träning i ung ålder hjälper.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Whippeten kommer från Storbritannien; FCI räknar den till de korthåriga vinthundarna. Kennel Clubs standard beskriver en balanserad kombination av muskelkraft och styrka med elegans och graciös kontur, en fin, kort och tät päls i alla färger och färgkombinationer utom merle, och ett milt, tillgivet och jämnt sinnelag; den anger en mankhöjd på 47–51 cm för hanar och 44–47 cm för tikar, och PDSA anger en genomsnittlig vikt på 11–18 kg.",
        "PDSA rekommenderar minst en timme motion varje dag, med möjlighet att springa lös i ett säkert område, och borstning en gång i veckan med en mjuk borste. PDSA kallar whippets ett populärt val för familjer eftersom de är lugna och milda med barn, men rekommenderar ett hem med något äldre barn; whippets ogillar att lämnas ensamma och har en mycket stark jaktinstinkt, så PDSA rekommenderar inte att de hålls tillsammans med mindre husdjur. Ett täcke kan vara till hjälp på vintern, och en tjock, mjuk bädd skyddar de framträdande benen.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Korthals griffon, Griffon d’arrêt à poil dur Korthals, Griff",
      text: [
        "Korthals griffon, på engelska Wirehaired Pointing Griffon, kommer från Frankrike; FCI räknar den till de kontinentala stående fågelhundarna och kallar den i grunden en mångsidig stående fågelhund. FCI-standarden beskriver en kraftfull, rustik hund som är längre än hög, med sträv, grov päls som aldrig är lockig eller ullig, en nos som alltid är brun, och helst stålgrå päls med bruna (leverbruna) fläckar; den anger en mankhöjd på cirka 55–60 cm för hanar och 50–55 cm för tikar och kallar rasen mild, stolt och mycket snäll mot barn. PetMD anger en vikt på 35–70 pund (cirka 16–32 kg).",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, ett stort hus och en stor trädgård, och pälsvård mer än en gång i veckan. PetMD rekommenderar borstning en gång i veckan (vissa hundar behöver också handtrimmas), säger att de i regel är tålmodiga och milda med barn när de har socialiserats som valpar, och påpekar att deras jakthistoria kan ge dem en stark jaktinstinkt, så att mindre djur som katter och kaniner kan se ut som något att jaga.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "chessie, Retriever (Chesapeake Bay)",
      text: [
        "Chesapeake bay retriever, ofta kallad chessie, kommer från USA; FCI räknar den till de apporterande hundarna. FCI-standarden beskriver en apporterande brukshund som är lika skicklig på land som i vatten, vars storlek och substans inte bör vara överdrivna, med tjock, kort päls över tät, ullig underull och klara gulaktiga eller bärnstensfärgade ögon; alla bruna nyanser, sedge och deadgrass är godkända, och svart päls diskvalificerar. Den anger en mankhöjd på 58–66 cm och en vikt på 29,5–36,5 kg för hanar, och 53–61 cm och 25–32 kg för tikar.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, ett stort hus och en stor trädgård, och pälsvård en gång i veckan. PetMD beskriver en pigg, glad och extremt tillgiven hund som kan bli destruktiv om den inte stimuleras eller lämnas ensam för länge, säger att chessies med rätt introduktioner och socialisering blir ett fint tillskott till familjen, och rekommenderar att inte låta hunden motionera direkt före eller efter maten.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samojed, Samoyed, Sammy",
      text: [
        "Samojedhunden kommer från norra Ryssland och Sibirien; FCI räknar den till de nordiska slädhundarna. FCI-standarden beskriver en vit, elegant arktisk spets av medelstorlek med riklig, tjock och tät polarpäls, mörkbruna ögon, små, tjocka, upprättstående öron och läppar som är lätt uppåtvända i mungiporna i det karakteristiska ”samojedleendet”; pälsen är rent vit, crème eller vit med biscuit, och blå eller olikfärgade ögon diskvalificerar. Den anger en idealisk mankhöjd på 57 cm för hanar och 53 cm för tikar, båda med en tolerans på 3 cm.",
        "PDSA rekommenderar minst två timmar motion varje dag och pälsvård dagligen, säger att samojedhundar fäller mycket ofta, oftast är utmärkta med barn och lojala mot hela familjen, aldrig bör lämnas ensamma mer än fyra timmar, behöver en mycket säker trädgård eftersom de är skickliga på att rymma och har en stark jaktinstinkt, och rekommenderar att låta det gå en stund efter maten innan motion. PetMD tillägger att samojedhundar inte mår bra i höga temperaturer.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, Aberdeen Terrier",
      text: [
        "Skotsk terrier, ofta kallad scottie, kommer från Storbritannien; FCI räknar den till de små terriererna. Kennel Clubs standard beskriver en satt, kortbent hund med vaken hållning som ger intryck av stor kraft och aktivitet i litet format, lojal och trofast, värdig, självständig och reserverad, men modig och mycket intelligent – djärv, men aldrig aggressiv. Den tätt åtliggande dubbelpälsen har sträv, trådig täckpäls; färgen är svart, vetefärgad eller brindle i alla nyanser. Den anger en mankhöjd på 25–28 cm och en vikt på 8,5–10,5 kg.",
        "PDSA säger att scottier behöver runt en timme motion om dagen och daglig pälsvård, med trimning och klippning hos en hundfrisör varannan till var tredje månad, beskriver dem som lojala och hängivna sin familj, och säger att de kan vara envisa, så träningen kräver tålamod och engagemang. PetMD säger att de med rätt träning och socialisering kan bli bra familjehundar, att det är viktigt att socialisera valpen och att de inte bör lämnas ensamma under längre perioder.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weim",
      text: [
        "Weimaranern kommer från Tyskland; FCI räknar den till de kontinentala stående fågelhundarna och erkänner en korthårig och en långhårig variant. FCI-standarden beskriver en medelstor till stor jakthund av funktionell brukstyp, senig och mycket muskulös, med bärnstensfärgade ögon och breda, ganska långa öron; pälsen är silvergrå, rådjursgrå eller musgrå, bara små vita teckningar på bröstet och tårna är tillåtna, och alla andra färger än grå diskvalificerar. Den anger en mankhöjd på 59–70 cm och en vikt på cirka 30–40 kg för hanar, och 57–65 cm och cirka 25–35 kg för tikar.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, ett stort hus och en stor trädgård, och pälsvård en gång i veckan. PDSA säger att weimaraner blir underbara familjedjur i rätt händer och passar bäst med ägare som känner rasen, men rekommenderar dem inte för hem med mindre barn eller mindre husdjur på grund av den mycket starka jaktinstinkten, säger att de kan utveckla separationsångest om de lämnas ensamma, och rekommenderar att socialisera dem från ung ålder och låta det gå en stund mellan mat och motion. PetMD tillägger rengöring av öronen och bad en gång i månaden.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "Italiensk vinthund kommer från Italien; FCI listar den som Piccolo Levriero Italiano bland de korthåriga vinthundarna. Kennel Clubs standard beskriver en greyhound i miniatyr, smäckrare i alla proportioner, elegant, graciös och snabb, intelligent, tillgiven och livlig även om den kan verka reserverad, med kort, fin och glansig päls över tunn hud. Den anger en mankhöjd på 32–38 cm och en vikt på 3,6–4,5 kg; svart, blått, crème, fawn, rött och vitt, eller någon av dessa uppbrutna med vitt, godkänns – aldrig merle, brindle eller tanteckningar.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen, säger att rasen passar i ett litet hus i stad eller på landet, behöver pälsvård en gång i veckan och inte fäller. PDSA säger att italienska vinthundar är fulla av energi, bör motioneras i ett inhägnat område eftersom de kan vara svåra att kalla in när de har sett ett byte, kan vara skygga så att tidig socialisering är nödvändig, och – eftersom skelettet är skört medan de växer – kanske inte är den perfekta rasen för hem med små barn eller andra husdjur. PetMD tillägger att den tunna pälsen inte håller dem varma, så de fryser lätt.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Giant Schnauzer, Munich Schnauzer",
      text: [
        "Riesenschnauzern kommer från Tyskland; FCI listar den som Riesenschnauzer bland pinscher och schnauzer. Royal Kennel Clubs standard beskriver en kraftigt byggd, robust, senig hund som ser nästan kvadratisk ut, djärv, pålitlig, godmodig och samlad, med sträv, trådig täckpäls och god underull. Den anger en mankhöjd på 65–70 cm för hanar och 60–65 cm för tikar; FCI-standarden anger en vikt på 35–47 kg. Helsvart, peppar och salt med mörk ansiktsmask samt svart och silver godkänns – inga andra färger.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, säger att rasen passar i ett stort hus med stor trädgård, behöver pälsvård varje dag och inte fäller. PDSA säger att pälsen behöver daglig vård och regelbunden trimning, att riesenschnauzrar kan bli älskvärda husdjur för familjer med äldre barn om de är väl socialiserade som valpar, och att dessa viljestarka hundar passar erfarna ägare. PetMD tillägger att pälsen handtrimmas professionellt med några månaders mellanrum och att rasen inte trivs i hem där människorna sällan är hemma.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Chien de Saint-Hubert, Bloodhound, St. Hubert Hound",
      text: [
        "Blodhunden kommer från Belgien, där FCI listar den som Chien de Saint-Hubert, en stor drivande hund. FCI-standarden beskriver den mest kraftfulla av alla drivande hundar: mild, lugn, snäll och sällskaplig med människor och särskilt fäst vid sin ägare, med kort, tät, väderbeständig päls och smidig, lös hud. Hanar väger cirka 46–54 kg och tikar cirka 40–48 kg; de tre färgerna är svart och tan, leverbrunt och tan samt rött.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, säger att rasen passar i ett stort hus med stor trädgård, behöver pälsvård en gång i veckan och fäller. PDSA säger att blodhundar passar bättre för erfarna ägare, inte rekommenderas för hem med mindre barn eller mindre husdjur på grund av sin storlek och mycket starka jaktinstinkt, dreglar och behöver få hudvecken hållna rena och torra. PDSA rekommenderar också att låta det gå en stund mellan mat och motion.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "American Akita, Great Japanese Dog",
      text: [
        "Akitan i det här registret är den amerikanska typen: FCI listar den som amerikansk akita, en ras av japanskt ursprung, skild från japansk akita (akita inu). FCI-standarden beskriver en stor, kraftigt byggd, välbalanserad hund med mycket substans och grov benstomme, små upprättstående öron och en stor svans som bärs över ryggen; hanar har en mankhöjd på 66–71 cm. Alla färger är tillåtna, som rött, fawn, vitt, pinto eller brindle. PDSA anger en genomsnittlig vikt på 31–59 kg.",
        "PDSA beskriver otroligt lojala familjehundar som är självständiga och mycket stora, så de passar bäst med erfarna ägare; PDSA skulle inte rekommendera en akita för ett hem med små barn och avråder från att lämna dem ensamma, eftersom många inte klarar det bra. PDSA rekommenderar minst två timmar motion varje dag, socialisering från ung ålder, en paus mellan mat och motion och borstning minst en gång i veckan – akitor fäller mycket. PDSA påpekar också en stark jaktinstinkt och att de kan bli överhettade i mycket varmt väder.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "cardi, Cardigan Welsh Corgi",
      text: [
        "Welsh corgi cardigan kommer från Storbritannien; FCI räknar den till boskapshundarna. American Kennel Clubs standard anger en mankhöjd på 10,5–12,5 tum (cirka 27–32 cm) och en idealvikt på 30–38 pund (cirka 14–17 kg) för hanar. Till skillnad från sin kusin pembroke har den en lång, yvig svans.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen, anger att ett litet hus med liten eller medelstor trädgård räcker, och säger att rasen behöver pälsvård mer än en gång i veckan och fäller; den anger en livslängd på över 12 år och listar cardigan som en sårbar inhemsk ras. PDSA säger att welsh corgier gärna vill vara till lags, så träningen bör vara ganska enkel, att två till tre borstningar i veckan oftast räcker och att de kan nafsa i hälarna på barn som springer – socialisering med barn och träning i ung ålder hjälper.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, GWP",
      text: [
        "Strävhårig vorsteh kommer från Tyskland; FCI listar den som Deutsch Drahthaar bland de kontinentala stående fågelhundarna. Royal Kennel Clubs standard beskriver en medelstor jakthund med strävt hår som helt täcker huden – mild, tillgiven och med jämnt temperament, vaken, följsam och mycket lojal. Hanar har en mankhöjd på 60–67 cm och väger 25–34 kg; tikar har en mankhöjd på 56–62 cm och väger 20,5–29 kg. Leverbrunt och vitt, helt leverbrunt samt svart och vitt är standardfärgerna.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen, säger att den passar i ett stort hus med stor trädgård på landet, behöver pälsvård mer än en gång i veckan och fäller. PetMD säger att strävhåriga vorstehar behöver mycket motion och mental stimulans, knyter starka band till sin familj och kan bli utmärkta familjehundar när de tränas och socialiseras tidigt, fungerar bra med barn som har lärt sig hur man beter sig mot djur, aldrig bör lämnas ensamma länge och har en stark jaktinstinkt. Pälsen handtrimmas två gånger om året.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "St. Bernhardshund, Bernhardiner, Saint Bernard",
      text: [
        "Sankt bernhardshunden kommer från Schweiz; FCI listar den som St. Bernhardshund bland molosserna av bergshundstyp. FCI-standarden beskriver en hund som är vänlig till sin natur, lugn till livlig och vaksam, och erkänner två varianter: korthårig, med tät, slät och åtliggande päls, och långhårig. Hanar har en mankhöjd på minst 70 cm och tikar minst 65 cm, upp till 90 respektive 80 cm; PDSA anger en vikt på 54–81 kg.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen, säger att rasen passar i ett stort hus med stor trädgård, behöver pälsvård mer än en gång i veckan, fäller och oftast lever mindre än tio år. PDSA säger att sankt bernhardshundar älskar att vara med en familj och är underbara med människor i alla åldrar, även barn, bör socialiseras väl som valpar, behöver borstas minst tre gånger i veckan, dreglar, klarar värme sämre och behöver en paus mellan mat och motion. PetMD tillägger att dessa människoorienterade hundar kan utveckla separationsångest om de lämnas ensamma länge.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffie, staffy, Stafford",
      text: [
        "Staffordshire bullterrier kommer från Storbritannien; FCI räknar den till terrierer av bullterriertyp. FCI-standarden beskriver en korthårig, välbalanserad hund med stor styrka i förhållande till sin storlek – traditionellt med okuvligt mod och envishet, mycket intelligent och tillgiven, särskilt mot barn. Mankhöjden är 35,5–40,5 cm; hanar väger 12,7–17 kg och tikar 11–15,4 kg. Den finns i brindle, rött, fawn, svart, blått eller vitt, enfärgad eller i kombination med vitt.",
        "Royal Kennel Club kallar den ett underbart familjedjur och rekommenderar upp till en timme motion om dagen; den behöver pälsvård en gång i veckan, fäller och lever oftast mer än 12 år. PDSA säger att staffies är tåliga och godmodiga mot barn, men som människoorienterade hundar är de kända för att drabbas av separationsångest när de lämnas ensamma, de är kända för att tugga på saker, och med sin mycket starka jaktinstinkt är mindre husdjur ingen bra idé i deras närhet.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "Airedaleterriern kommer från Storbritannien; FCI räknar den till de stora och medelstora terriererna. FCI-standarden kallar den den största av terriererna – en muskulös, aktiv, ganska kompakt hund som är utåtriktad och självsäker, vänlig, modig och intelligent, alltid vaken, inte aggressiv men orädd. Hanar har en mankhöjd på cirka 58–61 cm och tikar cirka 56–59 cm. Den hårda, täta och strävhåriga pälsen är tan med svart eller gråsprängd sadel.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen; pälsen behöver vårdas varje dag och fäller inte, och rasen lever oftast mer än 10 år. PetMD beskriver utmärkta familjehundar som, om de är vältränade, i regel kommer överens med barn, men inte bör lämnas åt sig själva för länge; PetMD rekommenderar borstning några gånger i veckan, en snabb öronrengöring varje vecka och besök hos en hundfrisör tre eller fyra gånger om året.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, JRT, Russell Terrier (AKC)",
      text: [
        "Jack russell terrier – American Kennel Club kallar den Russell Terrier – kommer från England och utvecklades i Australien; FCI räknar den till de små terriererna. Standarden beskriver en stark, aktiv och smidig arbetsterrier med stark personlighet: livlig, vaken och aktiv, djärv och orädd, vänlig men stillsamt självsäker. Mankhöjden är 25–30 cm och vikten cirka 5–6 kg. Den släthåriga, brutna eller strävhåriga pälsen är mestadels vit med svarta och/eller tanfärgade teckningar.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård en gång i veckan; rasen fäller och lever oftast mer än 10 år. PDSA beskriver smarta, livliga hundar som kan bli bra familjedjur om de tränas och socialiseras från ung ålder, men som passar bättre för familjer med något äldre barn; de har en mycket stark jaktinstinkt, så mindre husdjur rekommenderas inte, och de älskar att gräva.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Bullmastiffen är en gammal engelsk vakthundsras från 1800-talet, som härstammar från bulldogg och gammal engelsk mastiff; FCI räknar den till molosserna. Standarden beskriver en kraftfull, symmetrisk hund som visar stor styrka utan att vara klumpig – uthållig, aktiv, pålitlig, livfull, vaken och trofast. Hanar har en mankhöjd på 64–69 cm och väger 50–59 kg, tikar 61–66 cm och 41–50 kg. Den korta, hårda pälsen är fawn, röd eller brindle i alla nyanser, alltid med svart nos.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och pälsvård en gång i veckan, och rasen lever oftast mindre än 10 år. PDSA beskriver mycket lojala hundar vars storlek och kraft gör att de passar bättre i hem med bara vuxna eller i familjer med äldre barn; de behöver tidig socialisering, har helst någon hemma hela tiden, har en mycket stark jaktinstinkt, dreglar mycket och behöver en paus mellan mat och motion.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested Dog, kinesisk nakenhund, powder puff",
      text: [
        "Chinese crested dog är en liten, aktiv och graciös sällskapshund från Kina; FCI räknar den till de nakna hundarna. Den finns i två varianter: den hårlösa, med slät, naken kropp och hår bara på huvudet (kammen), fötterna och svansen, och powder puff, som är helt täckt av en slöja av långt, mjukt hår. Hanar har en mankhöjd på 28–33 cm och tikar 23–30 cm; PetMD anger en vikt på 8–12 pund (3,6–5,4 kg). Alla färger är tillåtna utom merle, och temperamentet beskrivs som glatt, aldrig elakt.",
        "Royal Kennel Club rekommenderar upp till 30 minuter motion om dagen och pälsvård en gång i veckan; den passar i lägenhet, och rasen lever oftast mer än 12 år. PetMD beskriver en vänlig hund som passar in i de flesta familjer, även med barn och andra husdjur – allt umgänge med barn bör ske under tillsyn. Den nakna huden behöver skydd mot sol och kyla, klorna bör kontrolleras varje vecka, och valpar behöver tidig, konsekvent socialisering.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, NSDTR, Nova Scotia Retriever",
      text: [
        "Nova scotia duck tolling retriever – tollern – är en apporterande hund från Kanada; FCI-standarden beskriver hur den springer och leker längs strandkanten fullt synlig för änderna för att locka dem närmare, och sedan skickas ut för att apportera fåglarna. Standarden beskriver en medelstor, kraftfull, kompakt och välmusklad hund som är mycket intelligent, lätt att träna och har stor uthållighet. FCI anger 48–51 cm och 20–23 kg för hanar, 45–48 cm och 17–20 kg för tikar. Den vattenavstötande dubbelpälsen finns i olika nyanser av rött eller orange, oftast med vitt på svanstippen, tassarna, bröstet eller som bläs.",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen och pälsvård mer än en gång i veckan, och rasen fäller; PetMD rekommenderar borstning en eller två gånger i veckan. En stor brittisk studie (McMillan 2024, via Dogs Trust) anger en förväntad medianlivslängd på 13,2 år, PetMD 12–14 år, och liksom andra medelstora hundar är den fullvuxen vid cirka 12–15 månader (PetMD). AKC beskriver mycket tillgivna hundar som brukar vara bra med barn, behöver mycket fysisk motion och mental stimulans, kan ha en stark jaktinstinkt mot mindre djur och mår bra av tidig socialisering och valpkurser.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, Cairnie",
      text: [
        "Cairnterriern kommer från Storbritannien; FCI räknar den till de små terriererna. Kennel Clubs standard beskriver en smidig, vaken terrier med arbetsmässigt, naturligt utseende – aktiv, modig och tålig, orädd och glad till sinnet, bestämd men inte aggressiv. Den väderbeständiga dubbelpälsen har riklig, sträv täckpäls; färgen är crème, vetefärgad, röd, grå eller nästan svart, brindle är godkänt och mörka öron och nos är typiska. Den anger en mankhöjd på cirka 28–31 cm och en idealvikt på 6–7,5 kg.",
        "PDSA rekommenderar minst en timme motion om dagen, säger att cairnterrier har outtömlig energi och en stark jaktinstinkt, så de behöver socialiseras tidigt med katter och andra små husdjur och hanteras försiktigt utan koppel, och att de väl socialiserade kommer mycket bra överens med barn och blir utmärkta familjedjur. PDSA rekommenderar att handtrimma pälsen två gånger om året och ge den pälsvård en eller två gånger i veckan; Dogs Trust säger att de fäller mycket lite. En stor brittisk studie (McMillan 2024, via Dogs Trust) anger en förväntad medianlivslängd på 14,0 år, PetMD 13–15 år, och liksom andra små hundar är den fullvuxen vid cirka 9–12 månader (PetMD). PetMD tillägger att de behöver mycket motion och mental stimulans.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "English Bull Terrier, Bully",
      text: [
        "Bullterriern kommer från Storbritannien; FCI räknar den till terrierer av bullterriertyp (grupp 3). Den är en medelstor, korthårig terrier: PDSA anger en genomsnittlig mankhöjd på 51–61 cm och en genomsnittlig vikt på 22–31 kg, och PetMD beskriver en atletisk byggnad på cirka 21–22 tum och 50–70 pund. PetMD kallar regelbunden motion ett måste och säger att bullterrier är tillgivna mot familjen, även barn, men inte alltid vänliga mot andra hundar eller katter, och att tidig och upprepad socialisering och träning är avgörande.",
        "PDSA rekommenderar minst en timme motion om dagen, uppdelad över dagen, och en paus efter måltider innan motion. PDSA säger att en väl socialiserad bullterrier kommer överens med människor i alla åldrar men, eftersom den är lite lättuppspelt, passar bättre med äldre barn; den vill ha sällskap så mycket som möjligt och har en stark jaktinstinkt, så försiktighet behövs med katter och andra små djur. Det räcker med borstning en gång i veckan. PDSA anger en genomsnittlig livslängd på över 10 år och PetMD 12–13 år; liksom andra medelstora hundar är den fullvuxen vid cirka 12–15 månader (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Zwergpinscher, Min Pin",
      text: [
        "Dvärgpinschern kommer från Tyskland; FCI räknar den till pinscher och schnauzer (grupp 2) och beskriver den som en förminskad bild av tysk pinscher – livlig, temperamentsfull, självsäker och med jämnt temperament. Pälsen är kort, tät, slät och glänsande, antingen enfärgad hjortröd till mörkt rödbrun eller svart med tanteckning, och svansen är naturlig. FCI-standarden anger en mankhöjd på 25–30 cm och en vikt på 4–6 kg för både hanar och tikar; liksom andra dvärghundar är den fullvuxen vid cirka 8–12 månader (PetMD).",
        "PDSA rekommenderar upp till en halvtimme motion om dagen för dessa energiska, livliga små hundar, säger att borstning en gång i veckan oftast räcker för pälsen, och påpekar att de kan vara envisa och självständiga, så träningen kräver övning och tålamod. PetMD säger att de kan bli utmärkta familjedjur med rätt socialisering och träning. VCA beskriver rasen som lekfull och mycket bra med barn, även om mycket små eller vilda barn kan skada den vid hårdhänt lek, och säger att den tunna pälsen och den lilla storleken gör att den lätt blir kall. PDSA anger en genomsnittlig livslängd på över 12 år och PetMD 12–16 år.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Pyrenéerhunden – i USA kallad Great Pyrenees – kommer från Frankrike; FCI räknar den till molosserna av bergshundstyp (grupp 2) och beskriver en mycket stor hund, imponerande och kraftigt byggd, men inte utan en viss elegans. Pälsen är vit, eller vit med fläckar i grävlingsgrått, varggrått, blekgult eller orange på huvudet och öronen. FCI-standarden anger en mankhöjd på 70–80 cm för hanar och 65–75 cm för tikar; PDSA anger en genomsnittlig vikt på 40–50 kg. Liksom andra jättehundar är den fullvuxen vid cirka 18–24 månader (PetMD).",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen, säger att rasen passar i ett stort hus med stor trädgård, behöver pälsvård mer än en gång i veckan och fäller, och anger en livslängd på under 10 år (PetMD och VCA anger 10–12 år). PDSA kallar dem milda jättar – lugna, godmodiga hundar som brukar komma bra överens med alla – och säger att träningen kräver tålamod och belöningsbaserade metoder. VCA säger att pyrenéerhunden är hängiven sin familj, särskilt barnen, och att tidig socialisering är mycket viktig; PetMD säger att den lever bra med andra husdjur men kanske passar bäst i hem utan mindre barn, och rekommenderar att undvika kraftig motion kring måltiderna på grund av risken för magomvridning.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten, Wheaten Terrier, SCWT",
      text: [
        "Irish soft coated wheaten terrier kommer från Irland; FCI listar den som Irish Soft Coated Wheaten Terrier bland de stora och medelstora terriererna. Royal Kennel Clubs standard beskriver en medelstor, kompakt, högställd terrier med mjuk, silkig, vetefärgad päls som faller i lösa lockar eller vågor – godmodig, livfull och modig, full av självförtroende och humor. Den enda färgen är en klar vetefärg. PDSA anger en genomsnittlig mankhöjd på 46–49 cm och en genomsnittlig vikt på 16–20,5 kg (Kennel Clubs standard anger 16–20,5 kg för hanar och något mindre för tikar); liksom andra medelstora hundar är den fullvuxen vid cirka 12–15 månader (PetMD).",
        "Royal Kennel Club rekommenderar upp till en timme motion om dagen, säger att rasen passar i ett litet hus, behöver pälsvård varje dag och inte fäller. En stor brittisk studie (McMillan 2024, via Dogs Trust) anger en förväntad medianlivslängd på 13,7 år; PetMD och VCA anger 12–14 år. PDSA kallar dem vänliga, pålitliga hundar som blir utmärkta familjedjur, även om de kan vara lite envisa. VCA säger att deras milda, lekfulla natur gör dem till ett bra val för barn; PetMD säger att umgänget med barn bör ske under tillsyn, att de ogillar att lämnas ensamma länge, och rekommenderar professionell pälsvård var fjärde till sjätte vecka, bad ungefär en gång i månaden och rengöring av öronen varannan vecka eller en gång i veckan.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Irish Wolfhound, Cú Faoil",
      text: [
        "Irländsk varghund kommer från Irland; FCI räknar den till de strävhåriga vinthundarna. PDSA anger en genomsnittlig mankhöjd på 71–79 cm och en genomsnittlig vikt på 40–55 kg; liksom andra jättehundar är den fullvuxen vid cirka 18–24 månader (PetMD). Royal Kennel Club kallar dess storlek extra stor och säger att den passar i ett stort hus med stor trädgård på landet.",
        "Royal Kennel Club rekommenderar mer än två timmar motion om dagen och pälsvård mer än en gång i veckan, och säger att rasen fäller. Kennel Club och PDSA anger en livslängd på under 10 år; PetMD anger 6–8 år. PDSA rekommenderar inte rasen för hem med mindre barn på grund av dess storlek och styrka, inte heller med mindre husdjur på grund av den starka jaktinstinkten, och säger att den aldrig bör lämnas ensam mer än fyra timmar. PetMD rekommenderar att socialisera valpen från den dag den kommer hem, ingen motion direkt före eller efter maten (magomvridning) och rengöring av öronen varannan till var fjärde vecka.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaff, Staffordshire Terrier",
      text: [
        "Amerikansk staffordshireterrier kommer från USA; FCI räknar den till terrierer av bullterriertyp. Standarden kräver stor styrka i förhållande till storleken och anger en mankhöjd på 46–48 cm för hanar och 43–46 cm för tikar, men ingen vikt. PetMD anger 40–70 pund (cirka 18–32 kg) för båda könen; en hund av den här storleken är fullvuxen vid cirka 12–15 månader (PetMD).",
        "PetMD rekommenderar minst 60 minuter motion om dagen, säger att rasen är tålmodig och kärleksfull mot barn, att den kan vara benägen att få separationsångest och att den starka jaktinstinkten kan göra livet med mindre hundar eller katter svårare. En brittisk studie (McMillan m.fl., 2024, som Dogs Trust sammanställt i tabell) anger en förväntad medianlivslängd på 12,5 år; PetMD anger 12–16 år. VCA rekommenderar borstning en gång i veckan; PetMD rekommenderar att socialisera valpen, ingen motion direkt efter en måltid (magomvridning) samt bad och öronrengöring ungefär var fjärde till sjätte vecka.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, tryffelhund, Romagna Water Dog",
      text: [
        "Lagotto romagnolo är en liten till medelstor lockig vattenhund från Italien, känd som tryffelhund; FCI räknar den till vattenhundarna. Standarden anger en mankhöjd på 43–48 cm och en vikt på 13–16 kg för hanar, och 41–46 cm och 11–14 kg för tikar; en hund av den här storleken är fullvuxen vid cirka 12–15 månader (PetMD).",
        "Royal Kennel Club kallar den en utmärkt och vaken familjekamrat, rekommenderar mer än två timmar motion om dagen och pälsvård mer än en gång i veckan, säger att den inte fäller och anger en livslängd på över 12 år; PetMD säger att lagotton kan bli 15–17 år. PetMD påpekar att den behöver ständig mental och fysisk stimulans och omfattande socialisering, eftersom den kan vara blyg; Woodgreen säger att den kan ha svårt att klara sig när den lämnas ensam för ofta och rekommenderar professionell pälsvård var sjätte till åttonde vecka.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamute, Mal",
      text: [
        "Alaskan malamute är en av de äldsta arktiska slädhundarna: en kraftfull, stadigt byggd nordisk slädhund från USA med tjock, grov päls. FCI-standarden anger önskade storlekar på 63,5 cm och 38 kg för hanar och 58,5 cm och 34 kg för tikar; PDSA anger 58–64 cm och 34–39 kg. En hund av den här storleken är fullvuxen vid cirka 15–18 månader (PetMD), och PDSA anger en livslängd på över 10 år (PetMD: 10–14 år).",
        "PDSA rekommenderar minst två timmar kraftig motion och borstning varje dag, och säger att malamuter fäller mycket, har en mycket stark jaktinstinkt, inte bör lämnas ensamma mer än fyra timmar och passar aktiva vuxna eller familjer med äldre barn; PDSA kallar dem krävande för förstagångsägare. PetMD rekommenderar att kontrollera öronen en gång i veckan och bad var sjätte till åttonde vecka, och påpekar att den tjocka pälsen gör varmt väder svårt för dem.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "kongohund, African Barkless Dog",
      text: [
        "Basenjin är en lätt byggd jakthund med fin benstomme från Centralafrika som inte skäller men gör ett eget joddlande ljud; FCI räknar den till raserna av urhundstyp. PDSA anger en mankhöjd på 40–43 cm och en vikt på 9–11 kg. En hund av den här storleken är fullvuxen vid cirka 9–12 månader (PetMD), och PDSA anger en livslängd på över 12 år (WebMD: 13–14 år).",
        "PDSA rekommenderar minst en timme motion om dagen (runt 60–90 minuter), mycket mental stimulans och borstning en gång i veckan; PDSA kallar basenjier reserverade men pålitliga, viljestarka och med mycket dåligt trafiksinne. WebMD säger att de jagar allt som ser ut som ett byte, behöver mycket höga staket eller ständig tillsyn och bara är måttligt bra med små barn, och rekommenderar att rengöra öronen varje vecka och borsta tänderna minst två gånger i veckan.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Blue, British Shorthair",
      text: [
        "Brittiskt korthår är en robust katt med tät päls och stora runda ögon – CFA kallar den en ”nallebjörnskatt”. De flesta tänker sig den blågrå, men den finns i ett antal färger och mönster. Den mognar långsamt: CFA säger att den når full storlek vid ungefär tre års ålder, VCA säger att den fysiska mognaden kan ta upp till fem år.",
        "CFA beskriver den som mycket tillgiven och fäst vid sina människor; den kommer överens med alla i hushållet oavsett ålder, men tycker oftast inte om att bli buren, och den har levt tillsammans med hundar, kaniner och fåglar. VCA beskriver en måttlig aktivitetsnivå och rekommenderar att kamma pälsen minst en gång i veckan. Kattungar med stamtavla flyttar oftast till sitt nya hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA beskriver ragdollen som en stor, avslappnad katt med halvlång, plyschig och silkig päls och blå ögon. De mörkare ”points” finns i flera mönster – colourpoint utan vitt, mitted med vita tassar, bicolour med mer vitt, och van. Den mognar långsamt: den får sin fulla pälsfärg vid två års ålder och sin fulla storlek och vikt vid ungefär fyra.",
        "CFA beskriver en mild katt som möter dig vid dörren och följer efter dig från rum till rum, och som oftast leker utan att använda klorna. PetMD kallar den ett bra val för familjer, även med barn, men rekommenderar långsamma introduktioner under tillsyn till barn och andra husdjur, och säger att vissa ragdollkatter bara behöver kammas en eller två gånger i veckan, medan CFA rekommenderar regelbunden kamning. Kattungar med stamtavla flyttar oftast till ett nytt hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Siberian Forest Cat, sibirisk skogskatt",
      text: [
        "GCCF beskriver sibirisk katt som en katt som utvecklas långsamt, med tjock, väderbeständig päls: en tät, mjuk underull under en grövre täckpäls, som fäller kraftigt på våren och hösten. Hanar väger cirka 7,7–11,8 kg och honor 5,9–7,7 kg, full utveckling kan ta fyra till fem år, och GCCF anger en livslängd på 12 till 15 år eller mer.",
        "GCCF kallar den energisk och lekfull men tålmodig – ett bra val för familjer med små barn – och säger att den fungerar bra med andra djur, även hundar. PetMD rekommenderar kamning minst en gång i veckan, med extra insats under fällningen på våren och hösten, och påpekar att sibiriska katter inte räknas som allergivänliga. Kattungar med stamtavla flyttar oftast till sitt nya hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "maine coon-katt, Maine Coon",
      text: [
        "Maine coon anses allmänt vara en av de största tamkattsraserna, med muskulös, rektangulär kropp, bred bröstkorg, stora tassar och en lång, böljande svans. TICA anger en genomsnittsvikt på cirka 5,9–8,2 kg för vuxna hanar och 4,1–5,9 kg för honor, och CFA påpekar att vissa hanar väger mer än 9 kg. Den växer långsamt: enligt CFA är den ofta inte fullt utvecklad förrän vid tre eller fyra års ålder, och TICA säger att full mognad kan ta tre till fem år.",
        "TICA beskriver den som mild, vänlig och lekfull, CFA som sällskaplig, lojal och intelligent; den pratar ofta med en kvittrande drill snarare än ett jamande. Vetstreet skriver att maine coon-katter kommer överens med alla, även barn, hundar och andra katter. Den tunga, halvlånghåriga pälsen är kortare på axlarna och längre på kragen, magen och bakpartiet. Källorna skiljer sig åt om pälsvården: Vetstreet säger att kamning en gång i veckan räcker, CFA rekommenderar borstning eller kamning minst ett par gånger i veckan, och TICA påpekar att en tjockare päls kan behöva kammas varje dag. Kattungar med stamtavla flyttar oftast till sitt nya hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalkatt",
      text: [
        "PDSA beskriver bengalen som mycket intelligent och energisk, en katt som behöver mycket mental stimulans och möjligheter att röra sig och gillar en hög utsiktsplats som ett klätterträd. Den är tillgiven, men lägger sig hellre bredvid dig än i knät, och kan vara ganska pratsam. VCA påpekar att bengaler växer långsamt och kan ta upp till två år på sig att bli fysiskt mogna.",
        "Den korta, mjuka, prickiga eller marmorerade pälsen behöver bara en lätt borstning eller kamning en gång i veckan (PDSA). PetMD påpekar att bengalen kanske inte passar bäst för familjer med små barn, medan hundar och andra katter kan fungera bra med rätt introduktioner. Rasen utvecklades genom korsningar mellan asiatisk leopardkatt och tamkatter; PetPrep visar bara den registrerade tama bengalen. Kattungar med stamtavla flyttar oftast till sitt nya hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Skogkatt, Wegie, Norwegian Forest Cat",
      text: [
        "GCCF beskriver norsk skogkatt som mild och vänlig, en katt som trivs med att vara en del av en familj. Den mognar långsamt och anses inte fullvuxen förrän vid ungefär fyra till fem års ålder; hanar väger cirka 5,4–7,3 kg och honor 4,1–5,4 kg, och GCCF anger en livslängd på 14 till 16 år.",
        "Den har mycket energi, gillar interaktiva lekar och klättrar gärna; GCCF säger att den är tolerant mot respektfulla barn, andra katter och kattvänliga hundar. PetMD rekommenderar kamning och borstning minst en gång i veckan, oftare under fällningen på våren och hösten, och påpekar att separationsångest kan bli ett problem om den ofta lämnas ensam länge. Kattungar med stamtavla flyttar oftast till sitt nya hem vid 12–13 veckors ålder (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default sv;
