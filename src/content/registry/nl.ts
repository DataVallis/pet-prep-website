import type { RegistryCopy } from "./types";

/** Dutch plural: 1 → singular, everything else (0, 1,5, 2 …) → plural ("1 ras", "2 rassen"); "jaar", "uur" and "keer" do not change. */
const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** First letter lower case for values that continue a phrase ("Honden" → "honden", "Tot 1 uur" → "tot 1 uur", "Eén" → "één"). */
const lc = (t: string) => (t.startsWith("Eén") ? `één${t.slice(3)}` : t.charAt(0).toLocaleLowerCase("nl") + t.slice(1));
/**
 * Breed name inside a sentence: lower case ("de border collie", "een golden retriever", "de sint-bernard"),
 * except parts that are proper names or adjectives of proper names ("de Duitse herder", "de Jack Russell terrier", "de Maine coon").
 */
const rn = (name: string) =>
  /^(Duitse|Franse|Engelse|Amerikaanse|American|Australian|Berner|Hongaarse|Mechelse|Schotse|Ierse|Irish|Scottish|Portugese|Italiaans|Pyrenese|Chinese|Britse|Noorse|Siberische|Siberian|Jack|Chesapeake|Boston|Yorkshire|Airedale|Staffordshire|West|Welsh|Cavalier|Rhodesian|Maine|Nova|Korthals|Shetland|Alaskan|Bengaal)\b/.test(name)
    ? name
    : lc(name);
/** Breed name with the definite article: "de border collie", but diminutives are het-words with an inflected adjective ("het Italiaanse windhondje"). */
const deRn = (name: string) => {
  const r = rn(name);
  return /je$/.test(r) ? `het ${r.replace(/^(\S+?)s (?=\S+je$)/, "$1se ")}` : `de ${r}`;
};
/** "Honden" → "hondenras" / "hondenrassen"; other species: "ras (vogels)". */
const rasWord = (many: string, n: number) => {
  const m = lc(many);
  if (m === "honden") return s(n, "hondenras", "hondenrassen");
  if (m === "katten") return s(n, "kattenras", "kattenrassen");
  return `${s(n, "ras", "rassen")} (${m})`;
};
/** Dutch clock time: "09:00" → "9.00", "16:30" → "16.30". */
const hm = (t: unknown) => String(t).replace(/^0(\d)/, "$1").replace(":", ".");
type Fci = { number: number; group: number; origin: string };
/** Dutch FCI group names (Raad van Beheer), in running-text form. */
const fciGroups: Record<number, string> = { 1: "herdershonden en veedrijvers, behalve Zwitserse sennenhonden", 2: "pinschers en schnauzers – molossers – Zwitserse sennenhonden en verwante rassen", 3: "terriërs", 4: "teckels", 5: "keeshonden en oertypen", 6: "lopende honden, zweethonden en verwante rassen", 7: "staande honden", 8: "retrievers, spaniëls en waterhonden", 9: "gezelschapshonden", 10: "windhonden" };
const origins: Record<string, string> = { GB: "Groot-Brittannië", FR: "Frankrijk", DE: "Duitsland", US: "Verenigde Staten", CU: "Cuba", CH: "Zwitserland", IT: "Italië", "CN-XZ": "Tibet (China)", CN: "China", MX: "Mexico", BE: "België", HU: "Hongarije", JP: "Japan", ZA: "Zuid-Afrika", "BE-FR": "België / Frankrijk", PT: "Portugal", CA: "Canada", HR: "Kroatië", AU: "Australië", RU: "Rusland", IE: "Ierland", "AF-C": "Centraal-Afrika", TR: "Turkije", MG: "Madagaskar" };

const nl: RegistryCopy = {
  mistakes: {
    title: (breed) => `Veelgemaakte fouten met een ${rn(breed)}`,
    intro: "Kleine gewoontes die grotere problemen veroorzaken – elk punt komt uit de bronnen over dit ras.",
    exercise: "Te weinig dagelijkse beweging",
    exerciseText: (amount) => `Benodigde beweging: ${amount}. Plan het elke dag in, niet alleen in het weekend.`,
    coat: "Vachtverzorging overslaan",
    coatText: (brushing, shedding) => `Borstelen: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Te veel snoepjes en te grote maaltijden",
    heat: "Wandelen in de hitte",
    growth: "Vergeten dat de pup nog groeit",
    growthText: (growthEnd) => `Volgroeid: ${growthEnd}. Plan tot die tijd beweging en voer die passen bij een jong huisdier dat nog groeit, en vraag je dierenarts wat bij het jouwe past.`,
    mind: "Te weinig uitdaging voor de hersenen",
    health: "De bekende gezondheidsproblemen van het ras over het hoofd zien",
    practise: "In PetPrep oefent een kind precies deze gewoontes – stappen, maaltijden, verzorging – voordat het echte huisdier thuiskomt.",
  },
  hub: {
    title: "Leer je toekomstige huisdier kennen voordat het thuiskomt.",
    intro:
      "Wat elke diersoort en elk ras in PetPrep echt nodig heeft – volgens kennelclubs, kattenstamboekorganisaties, veterinaire organisaties en onderzoeken, met een link naar elke bron. Plus de regels waarmee PetPrep het dier simuleert.",
    breedCount: (n) => `${n} ${s(n, "ras", "rassen")} in het register`,
    open: "Bekijk de rassen",
    openA11y: (many) => `Bekijk de rassen: ${lc(many)}`,
    freePlan: (name, activity) => `Gratis plan: ${lc(name)} (${activity} voor een volwassen huisdier). Hiervoor is geen raspagina.`,
    otherSpecies: "Meer diersoorten staan gepland.",
    methodTitle: "Zo bouwen we dit register",
    method: [
      "Elk feit komt uit een genoemde bron – kennelclubs, kattenstamboekorganisaties, veterinaire organisaties en verenigingen, en peer-reviewed onderzoek – en linkt ernaar. Rasstandaarden vatten we in onze eigen woorden samen.",
      "Waarden die door geen enkele bron worden ondersteund, tonen we nooit als feit. Waar PetPrep voor het spel een getal moet kiezen, staat dat alleen onder “Zo simuleert PetPrep het”, gemarkeerd als spelregel.",
      "Dezelfde gegevens sturen de app aan: de labels, het aantal maaltijden, de stappendoelen en de speelsessies op deze pagina’s zijn dezelfde die het huisdier in de app gebruikt.",
      "Dit register is geen veterinair advies. Gezondheidsinformatie is alleen bedoeld als oriëntatie en is niet door een dierenarts gecontroleerd.",
    ],
  },
  speciesStatus: { available: "In de app", coming_soon: "Binnenkort in de app", info_only: "Alleen ter informatie" },
  availability: {
    in_app: { label: "In de app", text: "Beschikbaar in de PetPrep Challenge van 12 weken (betaald ras)." },
    coming_soon: { label: "Binnenkort in de app", text: "Gebouwd en getest; komt met een van de volgende app-updates." },
    info_only: { label: "Alleen ter informatie", text: "Staat ter informatie in het register; je kunt het nog niet adopteren in de app." },
  },
  catalogue: {
    eyebrow: "Dierenencyclopedie",
    title: (many) => `${many}: rassen in het register`,
    lead: (many, count) =>
      `${count} ${rasWord(many, count)} met onderbouwde behoeften, ${count === 1 ? "voor wie het geschikt is en hoe PetPrep het simuleert" : "voor wie ze geschikt zijn en hoe PetPrep ze simuleert"}. Zoek, filter en vergelijk er maximaal drie.`,
    metaTitle: (many) => `${rasWord(many, 2).charAt(0).toUpperCase()}${rasWord(many, 2).slice(1)} – register met bronnen | PetPrep`,
    metaDescription: (many) =>
      `Zoek en vergelijk ${rasWord(many, 2)} op behoeften, grootte en voor wie ze geschikt zijn. Elk feit linkt naar de bron; plus de regels waarmee PetPrep elk ras simuleert.`,
    searchLabel: "Rassen zoeken",
    searchPlaceholder: "Naam, bijv. labrador",
    filtersTitle: "Filters",
    any: "Alle",
    availabilityLabel: "In PetPrep",
    sortLabel: "Sorteren",
    sort: { recommended: "Eerst in de app", az: "A–Z", size: "Grootte (klein naar groot)" },
    clear: "Alles wissen",
    results: (total) => `{n} van ${total} ${s(total, "ras", "rassen")}`,
    none: "Geen ras gevonden. Probeer minder filters.",
    loading: "Zoekfunctie laden…",
    page: "Pagina {n} van {total}",
    prev: "Vorige",
    next: "Volgende",
    compareAdd: "{name} vergelijken",
    compareBar: "{n} van {max} geselecteerd om te vergelijken",
    compareGo: "Vergelijken",
    compareMax: "Je kunt maximaal {max} rassen vergelijken.",
    azTitle: "Alle rassen van A tot Z",
    azIntro: "Elk ras in het register, in alfabetische volgorde.",
    freePlanTitle: "Gratis plan",
    guideTitle: "Zo kies je een ras",
    guide: () => [
      "Begin bij wat je gezin elke dag kan geven: tijd voor beweging en verzorging, en ruimte. Op elke raspagina zie je die behoeften in één oogopslag, met de genoemde bron van elke waarde; waar bronnen verschillen, staan alle waarden erbij.",
      "Heeft een ras een grootteklasse (bij honden: dwerg, klein, middelgroot, middelgroot tot groot, groot of zeer groot), dan is dat de klasse die de genoemde bron geeft – meestal een kennelclub – en de gewichten zijn de bereiken die de bronnen noemen, geen schattingen van ons.",
      "Labels zoals “Geschikt voor: een actief gezin” zijn dezelfde als in de app, en elk label wordt door bronnen onderbouwd. De getallen onder “Zo simuleert PetPrep het” zijn spelregels van PetPrep, geen verzorgingsinstructies. [Zo bouwen we het register](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `${rasWord(many, 2).charAt(0).toUpperCase()}${rasWord(many, 2).slice(1)} vergelijken`,
    metaTitle: (many) => `${rasWord(many, 2).charAt(0).toUpperCase()}${rasWord(many, 2).slice(1)} vergelijken | PetPrep-register`,
    intro: "De belangrijkste behoeften naast elkaar, uit dezelfde bronnen als de raspagina’s.",
    pick: "Kies twee of drie rassen in de catalogus om ze te vergelijken.",
    back: "Terug naar de catalogus",
    remove: "{name} verwijderen",
    note: "Waarden staan zoals de genoemde bron ze geeft. Waar bronnen verschillen, noemt de raspagina ze allemaal.",
    availabilityRow: "In PetPrep",
    activityRow: "Dagdoel van een volwassen huisdier in PetPrep (spelregel)",
  },
  facets: {
    size: { label: "Grootte", values: { toy: "Dwerg", small: "Klein", small_medium: "Klein tot middelgroot", medium: "Middelgroot", medium_large: "Middelgroot tot groot", large: "Groot", giant: "Zeer groot" } },
    exercise: { label: "Dagelijkse beweging", values: { under_1h: "Tot 1 uur", h1_2: "1–2 uur", over_2h: "Meer dan 2 uur" }, line: (v) => `${lc(v)} per dag` },
    grooming: { label: "Borstelen", values: { weekly: "Eén keer per week", several_weekly: "Meerdere keren per week", daily: "Dagelijks", other: "Anders" }, line: (v) => `borstelen: ${lc(v)}` },
  },
  groups: {
    exercise: "Beweging",
    play: "Spelen",
    litter: "Kattenbak",
    scratching: "Krabben",
    grooming: "Vacht en verzorging",
    feeding: "Maaltijden",
    water: "Water",
    lifespan: "Levensduur",
    stages: "Levensfasen",
    size: "Grootte en gewicht",
    training: "Training",
  },
  fields: {
    size: "Grootte",
    height: "Schofthoogte",
    weight: "Gewicht (volwassen)",
    growth_end: "Volgroeid op een leeftijd van",
    lifespan: "Levensduur",
    exercise: "Dagelijkse beweging",
    coat: "Vacht",
    grooming_frequency: "Borstelen",
    grooming_level: "Verzorgingsbehoefte",
    shedding: "Verharen",
    litter_scoop: "Kattenbak uitscheppen",
    litter_full_change: "Alle kattenbakvulling verversen",
    litter_pee: "Plassen (volwassen kat)",
    litter_poo: "Ontlasting (volwassen kat)",
    water_need: "Waterbehoefte",
    sleep: "Slaap (volwassen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 weken",
    puppy_3_6_months: "3–6 maanden",
    puppy_6_12_months: "6–12 maanden",
    kitten_6_12_weeks: "6–12 weken",
    kitten_3_6_months: "3–6 maanden",
    kitten_6_12_months: "6–12 maanden",
    puppy: "Pup",
    kitten: "Kitten",
    young_adult: "Jongvolwassen",
    mature_adult: "Middelbare leeftijd",
    adult: "Volwassen",
    senior: "Senior",
  },
  categories: {
    size: { toy: "dwerg", small: "klein", small_medium: "klein tot middelgroot", medium: "middelgroot", medium_large: "middelgroot tot groot", large: "groot", giant: "zeer groot" },
    coat: { moderately_long: "halflang", smooth: "glad (kort)", short: "kort", medium: "middellang", short_long: "kort of lang (twee vachtvariëteiten)", long: "lang" },
    grooming_frequency: { at_least_once_a_week: "minstens één keer per week", at_least_once_or_twice_a_week: "minstens één à twee keer per week", once_a_week: "één keer per week", more_than_once_a_week: "vaker dan één keer per week", daily: "dagelijks", every_day: "elke dag" },
    grooming_level: { moderate: "gemiddeld", high: "hoog", low: "laag" },
    shedding: { yes: "verhaart", no: "verhaart niet (dat is niet hetzelfde als hypoallergeen)", high: "verhaart veel", moderate: "verhaart matig", low: "verhaart weinig", minimal: "verhaart nauwelijks" },
  },
  statements: {
    food_motivated: () => "Sterk gemotiveerd door eten – handig bij de training, maar let op de porties.",
    coren_rank: (v) => `Nr. ${String(v)} in de ranglijst van Stanley Coren voor werk- en gehoorzaamheidsintelligentie.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-standaard nr. ${x.number}, groep ${x.group} (${fciGroups[x.group] ?? "—"}); herkomst: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Spelen: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} sessies van ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} minuten per dag.`;
    },
    kittens_play_more: () => "Kittens moeten vaker spelen.",
    scratching_natural: () => "Krabben is natuurlijk en nodig: zorg voor een krabpaal en straf het nooit.",
    water_fresh: () => "Altijd vers water: was de waterbak elke dag en vul hem opnieuw.",
    grooming_sources_differ: () => "De bronnen verschillen over hoe vaak je moet kammen: van dagelijks tot één keer per week.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediaan ${t}`,
    more_than: (t) => `meer dan ${t}`,
    less_than: (t) => `minder dan ${t}`,
    at_least: (t) => `minstens ${t}`,
    up_to: (t) => `tot ${t}`,
    ideal: (t) => `ideaal (rasstandaard): ${t}`,
    mean: (t) => `gemeten gemiddelde: ${t}`,
    about: (t) => `ongeveer ${t}`,
    until: (t) => `tot ${t}`,
    until_about: (t) => `tot ongeveer ${t}`,
    span: (t) => t,
    from: (t) => `vanaf ${t}`,
    last: (t) => `de laatste ${t}`,
    every: (t) => (/^1[\s  ]dag$/.test(t) ? "elke dag" : /^1[\s  ]/.test(t) ? `elke ${t.replace(/^1[\s  ]/, "")}` : `om de ${t}`),
    expectancy: (t) => `levensverwachting bij de geboorte: ${t}`,
    smaller_meals: (t) => `${t}, kleinere porties`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t) => `${t} jaar`,
    months: (t, n) => `${t} ${s(n, "maand", "maanden")}`,
    days: (t, n) => `${t} ${s(n, "dag", "dagen")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} uur per dag` : `${t} ${s(n, "minuut", "minuten")} per dag`),
    meals_per_day: (t, n) => `${t} ${s(n, "maaltijd", "maaltijden")} per dag`,
    times_per_day: (t) => `${t} keer per dag`,
    hours_per_day: (t) => `${t} uur per dag`,
    ml_per_kg_day: (t) => `${t} ml per kg lichaamsgewicht per dag`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}% van de verwachte levensduur`,
  },
  males: "mannetjes",
  females: "vrouwtjes",
  or: " of ",
  notes: { size_class_guidance: "richtlijn voor zijn grootteklasse" },
  stageLabels: {
    dog: { puppy: "Pup", young: "Jonge hond", adult: "Volwassen", senior: "Senior" },
    cat: { puppy: "Kitten", young: "Jonge kat", adult: "Volwassen kat", senior: "Senior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${s(raw, "stap", "stappen")}`,
    steps_range: (from, to) => `${from} → ${to} stappen`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} stappen per levensmaand (${first} bij aankomst), tot ${cap} vanaf maand ${capMonth}`,
    play_sessions: (n) => `${n} ${s(n, "speelsessie", "speelsessies")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Stappendoel = minuten dagelijkse beweging × ${p.per_minute} stappen: een volwassen huisdier krijgt ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} uur` : `${p.minutes} ${s(p.minutes, "minuut", "minuten")}`}, dus ${f.num(p.steps)} stappen per dag.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Leert commando’s langzamer dan de kruising uit het gratis plan (${f.num(p.multiplier)}× zo snel).`
        : p.multiplier === 1
          ? "Leert commando’s even snel als de kruising uit het gratis plan."
          : `Leert commando’s ${f.num(p.multiplier)}× zo snel als de kruising uit het gratis plan.`,
    senior_share: (p, f) => `Wordt senior in maand ${p.months} (${f.num(p.months / 12, 1)} jaar) – het laatste kwart van de verwachte levensduur van het ras.`,
    walk_sensor: () => "Wandelingen tellen echte stappen uit Apple Health of Health Connect (met toestemming, alleen lezen) en uit de bewegingssensor van de telefoon – geen gps.",
    play_instead_of_steps: (p, f) =>
      `Geen wandelingen: een volwassen kat heeft ${p.sessions} ${s(p.sessions, "speelsessie", "speelsessies")} per dag met een kattenhengel nodig, met minstens ${f.num(p.gap_minutes / 60)} uur ertussen.`,
    litter_rule: (p) =>
      `Kattenbak: een volwassen kat gebruikt hem ${p.uses} keer per dag; na elk gebruik wordt hij binnen ${p.scoop_hours} uur uitgeschept (buiten de stille uren), en ${p.change_days === 1 ? "elke dag" : `om de ${p.change_days} dagen`} wordt alle vulling ververst.`,
    scratching_after_missed_play: () => "Na een dag met te weinig spelen krabt de kat één keer ergens aan; het kind brengt hem naar de krabpaal.",
    grooming_rule: (p) => (p.per_week === 1 ? "Eén keer per week kammen." : p.per_week === 2 ? "Twee keer per week kammen." : `${p.per_week} keer per week kammen.`),
    no_walk_in_heat: (p) =>
      `In de zomer (juni–augustus; december–februari op het zuidelijk halfrond) tonen het kinderscherm en het wandelscherm tussen ${hm(p.from)} en ${hm(p.to)} uur (tijd van het gezin) een rustige herinnering: niet wandelen in de hitte. Geen weergegevens, geen straf – stappen tellen gewoon mee.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "huidplooien schoonmaken",
        tooth_brushing: "tanden poetsen",
        ear_cleaning: "oren controleren en schoonmaken",
        nail_trim: "nagels knippen",
        bath: "in bad doen",
        groomer_visit: "een bezoek aan de trimsalon",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "elke dag"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "één keer per week"
              : `om de ${q.period_days / 7} weken`
            : q.period_days === 7
              ? `${q.times} keer per week`
              : q.times === 1
                ? `om de ${q.period_days} dagen`
                : `${q.times} keer per ${q.period_days} dagen`;
      const who = q.actor === "parent" ? "een herinnering voor de ouder" : "een taak voor het kind";
      return `Verzorging: ${what}, ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Bekijk de pup samen met de moeder, op de plek waar hij geboren is.",
      min_age_puppy: "De pup hoort niet vóór de leeftijd van 8 weken bij zijn moeder weg te gaan.",
      pedigree_fci: "Vraag naar de stamboom. Volgens de FCI-regels mag een stamboom alleen worden afgegeven bij een correcte afstamming.",
      parents_health_tests: "Vraag de uitslagen van de gezondheidstests van beide ouderdieren. Welke tests ertoe doen, hangt af van het ras.",
      breed_club_rules: "Nationale kennelclubs kunnen fokregels hebben die verder gaan dan die van de FCI – vraag de rasvereniging welke tests de ouderdieren nodig hebben.",
      written_contract: "Vraag om een schriftelijk koopcontract waarin de achtergrond en de gezondheid van de pup staan.",
      kitten_see_mother: "Bekijk de kitten samen met de moeder, op de plek waar de kittens wonen.",
      kitten_min_age: "Volgens de stamboomregels van de FIFe gaat een kitten niet vóór de leeftijd van 14 weken naar een nieuw thuis.",
      kitten_vaccination: "De kitten is volledig ingeënt (kattenziekte, calicivirus, herpesvirus) en heeft een vaccinatieboekje.",
      kitten_pedigree: "Een raskitten krijgt een stamboom mee waarop minstens drie generaties staan.",
      kitten_parents_tests: "Vraag of een van de ouderdieren gezondheidsproblemen heeft gehad die de kitten kan erven.",
    },
    tests: {
      dna_poag_pll: "DNA-test op primair openhoekglaucoom en primaire lensluxatie (POAG/PLL), erfelijke oogziekten die tot blindheid kunnen leiden",
      hip_scheme: "Röntgenonderzoek op heupdysplasie (VK: BVA/KC-programma)",
      elbow_scheme: "Röntgenonderzoek op elleboogdysplasie (VK: BVA/KC-programma)",
      eye_scheme: "Oogonderzoek door een veterinaire oogspecialist (VK: BVA/KC/ISDS-programma; bij sommige rassen met gonioscopie)",
      heart_scheme: "Hartonderzoek op mitralisklepziekte",
      boas_grading: "Ademhalingstest op brachycefaal obstructief luchtwegsyndroom (BOAS-gradering)",
      ivdd_screening: "Rugscreening op hernia (intervertebrale discusziekte, IVDD)",
      hearing_baer: "Gehoortest op doofheid (BAER)",
      cm_sm_mri: "MRI-screening op Chiari-achtige malformatie en syringomyelie (VK: BVA/KC CM/SM-programma)",
      inbreeding_coi: "Genetische diversiteit – controleer de inteeltcoëfficiënt",
      dna_prcd_pra: "DNA-test op progressieve retina-atrofie (prcd-PRA)",
      dna_rcd4_pra: "DNA-test op progressieve retina-atrofie (rcd4)",
      dna_gr_pra2: "DNA-test op progressieve retina-atrofie (GR_PRA2)",
      dna_cnm: "DNA-test op centronucleaire myopathie (CNM)",
      dna_eic: "DNA-test op inspanningsgeïnduceerde collaps (EIC)",
      dna_hnpk: "DNA-test op erfelijke neusparakeratose (HNPK)",
      dna_sd2: "DNA-test op skeletdysplasie 2 (SD2)",
      dna_mcd: "DNA-test op maculaire corneadystrofie (MCD)",
      dna_stgd: "DNA-test op de ziekte van Stargardt (STGD)",
      dna_cc_de: "DNA-test op krullende vacht / droge-ogensyndroom (CC/DE)",
      dna_ef: "DNA-test op episodic falling (EF)",
      dna_cea: "DNA-test op collie eye anomaly (CEA/CH)",
      dna_cl: "DNA-test op ceroïdlipofuscinose (CL)",
      dna_igs: "DNA-test op het syndroom van Imerslund-Gräsbeck (IGS)",
      dna_mdr1: "DNA-test op overgevoeligheid voor geneesmiddelen (MDR1)",
      dna_tns: "DNA-test op trapped neutrophil syndrome (TNS)",
      dna_sn: "DNA-test op sensorische neuropathie (SN)",
      dna_ggd: "DNA-test op goniodysgenesie en glaucoomrisico (GGD)",
      dna_raines: "DNA-test op het syndroom van Raine",
      dna_dm: "DNA-test op degeneratieve myelopathie (DM)",
      dna_de: "DNA-test op degeneratieve encefalopathie (DE)",
      dna_jadd: "DNA-test op juveniele ziekte van Addison (JADD)",
      dermoid_sinus_scheme: "Controle van pups op dermoïd sinus (programma van de rasvereniging)",
      dna_jme: "DNA-test op juveniele myoclonische epilepsie (JME)",
      dna_je: "DNA-test op juveniele epilepsie (JE)",
      dna_lsd: "DNA-test op lysosomale stapelingsziekte (LSD)",
      dna_ampn: "DNA-test op polyneuropathie bij de Alaskan malamute (AMPN)",
      dna_fanconi: "DNA-test op het syndroom van Fanconi (een nierziekte)",
      dna_pra_bj1: "DNA-test op progressieve retina-atrofie bij de basenji (PRA-BJ1)",
      thyroid_scheme: "Schildkliertest van de ouderdieren",
      dna_pap_pra1: "DNA-test op progressieve retina-atrofie bij de papillon (Pap-PRA1)",
      dna_nad: "DNA-test op neuroaxonale dystrofie (NAD)",
      dna_eopra: "DNA-test op vroeg optredende progressieve retina-atrofie (EOPRA)",
      dna_cu: "DNA-test op cystinurie (CU), een erfelijke aandoening met nier- en blaasstenen",
      heart_echo_scheme: "Hartonderzoek met kleuren-doppler-echografie (programma van de rasvereniging)",
      cardiac_exam: "Hartonderzoek van de ouderdieren (advies van de rasvereniging)",
      dna_rd_osd: "DNA-test op retinadysplasie / oculoskeletale dysplasie (RD/OSD)",
      dna_xlpra1: "DNA-test op X-gebonden progressieve retina-atrofie (XLPRA1)",
      dna_cmo: "Test op craniomandibulaire osteopathie (CMO), een erfelijke botaandoening van de kaak",
      dna_hsf4: "DNA-test op erfelijke staar (HSF4)",
      dna_lafora: "DNA-test op de ziekte van Lafora",
      dna_nccd: "DNA-test op neonatale cerebellaire corticale degeneratie (NCCD)",
      dna_fviid: "DNA-test op factor VII-deficiëntie (FVIID)",
      dna_mls: "DNA-test op het syndroom van Musladin-Lueke (MLS)",
      dna_vwd1: "DNA-test op de ziekte van Von Willebrand type 1 (vWD1)",
      dna_mac: "DNA-test op gevoeligheid voor infectie met het Mycobacterium avium-complex (MAC)",
      dna_imgd: "DNA-test op erfelijke myopathie bij de Duitse dog (IMGD), een ziekte waarbij spieren wegkwijnen",
      dna_poag: "DNA-test op primair openhoekglaucoom (POAG), een erfelijke oogziekte die tot blindheid kan leiden",
      dna_aon: "DNA-test op neuropathie die op volwassen leeftijd optreedt (AON), een erfelijke zenuwziekte",
      dna_fn: "DNA-test op familiaire nefropathie (FN), een erfelijke nierziekte",
      patella_scheme: "Controle van de knieschijf op patellaluxatie vóór het fokken",
      kidney_scheme: "Echo van de nieren op een ontbrekende of misvormde nier (advies van de rasvereniging)",
      kidney_upc_scheme: "Urinetest (eiwit-creatinineratio) op nierziekte (advies van de rasvereniging)",
      dna_gld: "DNA-test op globoïdcel-leukodystrofie (GLD), een erfelijke zenuwziekte",
      liver_shunt_scheme: "Levercontrole op een portosystemische shunt of microvasculaire dysplasie (advies van de rasvereniging)",
      breed_health_scheme: "Het gezondheidsprogramma van de rasvereniging voor de ouderdieren",
      hemivertebrae_scheme: "Röntgenfoto van de wervelkolom van de ouderdieren op hemivertebrae (misvormde wervels), na de leeftijd van 12 maanden",
      dna_hcm_mc: "DNA-test op hypertrofische cardiomyopathie (MC HCM)",
      dna_sma: "DNA-test op spinale musculaire atrofie (SMA)",
      dna_pk_def: "DNA-test op pyruvaatkinasedeficiëntie (PK def)",
      hcm_negative: "Fokkatten moeten HCM-negatief zijn (hartziekte: hypertrofische cardiomyopathie)",
      dna_gsd4: "DNA-test op glycogeenstapelingsziekte type IV (GSD IV)",
      dna_pra_b: "DNA-test op progressieve retina-atrofie bij de Bengaal (PRA-b)",
      dna_jlpp: "DNA-test op juveniele larynxparalyse en polyneuropathie (JLPP)",
      dna_lemp2: "DNA-test op leuko-encefalomyelopathie (LEMP-2)",
      dna_huu: "DNA-test op hyperuricosurie (HUU)",
      dna_dcm: "DNA-test op gedilateerde cardiomyopathie (DCM), een ziekte van de hartspier",
      dna_pra5: "DNA-test op progressieve retina-atrofie (PRA5)",
      dna_dings2: "DNA-test op dancing Dobermann disease (DINGS2), een zenuw- en spieraandoening",
      dna_ams: "DNA-test op acraal mutilatiesyndroom (AMS), een zenuwaandoening waardoor de poten geen pijn meer voelen",
      dna_dams: "DNA-test op dyserytropoëtische anemie en myopathiesyndroom (DAMS), een bloed- en spieraandoening",
      dna_fuco: "DNA-test op fucosidose, een erfelijke ziekte van het zenuwstelsel",
      dna_pfk: "DNA-test op fosfofructokinasedeficiëntie (PFK), een erfelijke enzymstoornis van bloed en spieren",
      dna_pra_cord1: "DNA-test op progressieve retina-atrofie (PRA cord1)",
      dna_bbs2_pra: "DNA-test op progressieve retina-atrofie (BBS2-PRA)",
      dna_cnga1_pra: "DNA-test op progressieve retina-atrofie (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-test op progressieve retina-atrofie (PRA-rcd2)",
      dna_gm1: "DNA-test op GM1-gangliosidose (een erfelijke ziekte van het zenuwstelsel)",
      dna_gm2: "DNA-test op GM2-gangliosidose (een erfelijke ziekte van het zenuwstelsel)",
      dna_vwd3: "DNA-test op de ziekte van Von Willebrand type 3 (vWD3), een erfelijke bloedingsstoornis",
      dna_pra_rcd3: "DNA-test op progressieve retina-atrofie (PRA-rcd3)",
      dna_clad: "DNA-test op canine leukocytenadhesiedeficiëntie (CLAD), een erfelijke afweerstoornis",
      dna_ncl8: "DNA-test op neuronale ceroïdlipofuscinose (NCL8), een erfelijke aandoening van het zenuwstelsel",
      dna_pra_rcd1: "DNA-test op progressieve retina-atrofie (rcd1)",
      dna_vwd2: "DNA-test op de ziekte van Von Willebrand type 2 (vWD2), een erfelijke bloedingsstoornis",
      dna_l2hga: "DNA-test op L-2-hydroxyglutaarzuuracidurie (L-2-HGA), een erfelijke stofwisselingsziekte van het zenuwstelsel",
      dna_pll: "DNA-test op primaire lensluxatie (PLL), een erfelijke oogziekte waarbij de lens verschuift",
      dna_loa: "DNA-test op laat optredende ataxie (LOA), een erfelijke ziekte die evenwicht en coördinatie aantast",
      dna_sca: "DNA-test op spinocerebellaire ataxie (SCA), een erfelijke ziekte van het zenuwstelsel",
    },
  },
  health: {
    shar_pei_fever: "Familiale shar-peikoorts kan bij het ras voorkomen: aanvallen van hoge koorts met pijnlijke, gezwollen gewrichten en een gezwollen gezicht – ga meteen naar de dierenarts.",
    weight_gain: "Komt makkelijk aan – let op de porties en de snoepjes.",
    hip_elbow_dysplasia_eye_conditions: "Kan vatbaar zijn voor heup- en elleboogdysplasie en voor verschillende erfelijke oogaandoeningen.",
    cancer_risk: "Bronnen beschrijven een hoger risico op kanker bij dit ras.",
    flat_face_breathing: "Ras met een platte snuit (brachycefaal): de korte snuit, nauwe neusgaten en extra zacht weefsel in de luchtweg kunnen het ademen bemoeilijken (brachycefaal obstructief luchtwegsyndroom, BOAS).",
    heat_stroke_risk: "Raakt snel oververhit en is kwetsbaarder voor een hitteberoerte dan de meeste honden, vooral bij warm weer.",
    skin_fold_ear_problems: "Vatbaar voor oorontstekingen en infecties van de huidplooien; de huidplooien moeten schoon en droog worden gehouden.",
    ear_infections_long_ears: "Door de lange oren kunnen oorontstekingen ontstaan; in de gehoorgang kunnen zich bacteriën ophopen.",
    collie_eye_pra: "Bij het ras komen erfelijke oogziekten voor: collie eye anomaly, een afwijking achter in het oog, en progressieve retina-atrofie, die langzaam tot blindheid kan leiden; er zijn oogonderzoeken en DNA-tests beschikbaar.",
    merle_colour_risk: "Merle is geen kleur uit de rasstandaard; bij dit ras brengt merle een hoger risico op gehoor- en zichtproblemen met zich mee.",
    hind_leg_conformation: "De Royal Kennel Club noemt de vorm van de achterbenen en de manier van bewegen een aandachtspunt bij dit ras; een gezonde hond heeft een rechte rug en gematigde achterbenen.",
    hip_elbow_dysplasia: "Kan vatbaar zijn voor heup- en elleboogdysplasie; fokkers wordt aangeraden de heupen en ellebogen van de ouderdieren te laten testen vóór het fokken.",
    degenerative_myelopathy: "Degeneratieve myelopathie, een ziekte van het ruggenmerg die de achterbenen langzaam verzwakt, komt bij het ras voor; er is een DNA-test beschikbaar.",
    exercise_induced_collapse: "Inspanningsgeïnduceerde collaps, een erfelijke neuromusculaire aandoening waardoor een hond na zware inspanning kan instorten, komt bij het ras voor.",
    heart_valve_disease: "Hartziekte door een verzwakkende mitralisklep is een groot probleem bij dit ras; vaak valt die het eerst op als hartruis, en fokhonden moeten eerst op hun hart worden onderzocht.",
    chiari_syringomyelia: "Chiari-achtige malformatie en syringomyelie, een pijnlijke aandoening met holtes vol vocht in het ruggenmerg vlak bij de hersenen, komt bij het ras voor en hangt samen met de schedelvorm; de diagnose wordt gesteld met een MRI-scan.",
    eye_conditions: "Erfelijke oogaandoeningen zoals staar komen bij het ras voor, en uitpuilende of geïrriteerde ogen zijn een aandachtspunt; er zijn oogonderzoeken en DNA-tests beschikbaar.",
    epilepsy: "Epilepsie, een hersenaandoening die toevallen kan veroorzaken, komt bij het ras voor.",
    storage_disease: "Een erfelijke stapelingsziekte van het zenuwstelsel kan jonge honden van dit ras treffen; met een DNA-test van de ouderdieren kunnen fokkers dit voorkomen.",
    chondrodysplasia: "Chondrodysplasie, een stoornis in de groei van kraakbeen en bot, komt bij het ras voor; pups kunnen met een röntgenfoto worden gecontroleerd.",
    polyneuropathy: "Een erfelijke zenuwziekte (polyneuropathie) komt bij het ras voor; met een DNA-test van de ouderdieren kunnen fokkers dit voorkomen.",
    fanconi_syndrome: "Het syndroom van Fanconi, een erfelijke nierziekte waarbij suiker in de urine lekt, komt bij het ras voor; met een DNA-test van de ouderdieren kunnen fokkers dit voorkomen.",
    pyruvate_kinase_deficiency: "Pyruvaatkinasedeficiëntie, een erfelijk defect van de rode bloedcellen dat bloedarmoede veroorzaakt, kan bij het ras voorkomen.",
    back_disc_disease: "Hernia (intervertebrale discusziekte), een probleem met de schokdempende tussenwervelschijven in de rug, komt bij het ras voor.",
    pra_eye_disease: "Progressieve retina-atrofie, een erfelijke oogziekte die langzaam tot blindheid kan leiden, komt bij het ras voor; er zijn DNA-tests en oogonderzoeken beschikbaar.",
    hip_dysplasia: "Heupdysplasie, een slecht ontwikkeld heupgewricht dat tot artrose kan leiden, komt bij het ras voor; fokkers wordt aangeraden de heupen van de ouderdieren te laten beoordelen.",
    bloat_gdv: "Maagtorsie (maagdilatatie-volvulus), waarbij de maag draait, kan bij het ras voorkomen – dat is een noodgeval waarvoor je meteen naar de dierenarts moet.",
    inherited_eye_disease: "Bij het ras komen erfelijke oogziekten voor, zoals collie eye anomaly, staar en progressieve retina-atrofie.",
    drug_sensitivity_mdr1: "Sommige honden van dit ras zijn erfelijk overgevoelig voor bepaalde geneesmiddelen (MDR1) – als dat bij jouw hond zo is, vertel het je dierenarts.",
    merle_to_merle_breeding: "Merle is een standaardkleur bij dit ras; twee merle-honden horen niet met elkaar te worden gefokt, omdat de pups dan risico lopen op slecht zicht en gehoor – de Royal Kennel Club registreert zulke pups niet.",
    kneecap_luxation: "Patellaluxatie, waarbij de knieschijf tijdelijk uit zijn plaats schiet, komt bij het ras voor.",
    pra_and_eyelashes: "Bij het ras komen oogproblemen voor: progressieve retina-atrofie, die langzaam tot blindheid kan leiden, en extra wimpers die tegen het oog schuren (distichiasis); fokkers wordt aangeraden de ogen van de ouderdieren te laten onderzoeken.",
    liver_shunt: "Een portosystemische shunt (levershunt), waarbij het bloed om de lever heen stroomt, kan bij het ras voorkomen.",
    skin_allergies: "Huidallergieën zijn een bekend aandachtspunt bij het ras; de Royal Kennel Club vraagt keurmeesters te letten op tekenen van huidontsteking, en eigenaren wordt aangeraden hun dierenarts te raadplegen voordat ze een shampoo kiezen.",
    westie_lung: "Een longziekte die bekendstaat als “westie-long” (idiopathische longfibrose), waardoor ademen moeilijker wordt, kan bij het ras voorkomen, vooral bij oudere honden.",
    jaw_bone_disorder: "Een erfelijke botaandoening van de kaak kan bij het ras voorkomen.",
    dry_eye: "Droge ogen, waarbij de ogen niet genoeg traanvocht aanmaken en droog en pijnlijk worden, kunnen bij het ras voorkomen.",
    heart_hcm: "Hypertrofische cardiomyopathie (HCM), een erfelijke hartziekte waarbij de hartspier verdikt, komt bij het ras voor.",
    dental_weight_nail_care: "Een groot Brits onderzoek noemt gebitsproblemen, overgewicht en te lange nagels als enkele van de meest voorkomende problemen bij het ras; eigenaren wordt daarom aangeraden goed te letten op gebitsverzorging, gewicht en nagelverzorging.",
    dental_weight_care: "PetMD noemt gebitsproblemen en overgewicht als aandachtspunten; eigenaren wordt daarom aangeraden de tanden van de kat regelmatig te poetsen en op het gewicht te letten.",
    gsd_iv: "Glycogeenstapelingsziekte type IV (GSD IV), een erfelijke aandoening die kittens treft, komt bij het ras voor; met een DNA-test van de ouderdieren kunnen fokkers dit voorkomen.",
    hip_dysplasia_weight: "Heupdysplasie, een slecht ontwikkeld heupgewricht, kan bij het ras voorkomen; PetMD raadt aan de kat op een gezond gewicht te houden om de gewrichten te beschermen.",
    laryngeal_paralysis_polyneuropathy: "Juveniele larynxparalyse en polyneuropathie (JLPP), een erfelijke zenuwziekte die het strottenhoofd en de achterbenen aantast, komt bij het ras voor; met een DNA-test van de ouderdieren kunnen fokkers dit voorkomen.",
    heart_sas: "Subaortastenose, een vernauwing net onder een hartklep die een hartruis kan veroorzaken, komt bij het ras voor; bij fokhonden hoort eerst het hart te worden gecontroleerd.",
    inherited_eye_defects: "Bij het ras komen erfelijke oogaandoeningen voor, zoals retinadysplasie en persisterende pupilmembraan; er zijn oogonderzoeken beschikbaar.",
    skin_fold_infections: "In de huidplooien, vooral in het gezicht, kan vocht blijven zitten waardoor ze ontstoken raken (huidplooipyodermie); de rimpels in het gezicht moeten elke dag worden schoongemaakt.",
    eyelid_eye_problems: "Ooglidproblemen (naar binnen of naar buiten gedraaide oogleden), droge ogen en cherry eye komen bij het ras voor; er zijn oogonderzoeken beschikbaar.",
    hip_elbow_joint_disease: "Heup- en elleboogdysplasie, waarbij de gewrichten zich niet goed ontwikkelen, komen bij het ras voor en kunnen tot gewrichtsziekte leiden.",
    hip_dysplasia_arthritis: "Heupdysplasie, een los, slecht ontwikkeld heupgewricht, komt bij het ras voor en kan uiteindelijk tot artrose leiden.",
    bleeding_disorder_vwd: "De ziekte van Von Willebrand, een erfelijk probleem met de bloedstolling dat tot overmatig bloeden kan leiden, komt bij het ras voor.",
    heart_muscle_disease: "Cardiomyopathie, een vergroot hart door een verzwakte hartspier, kan bij het ras voorkomen.",
    itchy_skin_allergy: "Huidallergieën (atopie), die jeuk en een geïrriteerde huid veroorzaken, kunnen bij het ras voorkomen.",
    entropion_cherry_eye: "Naar binnen gedraaide oogleden (entropion) en cherry eye, waarbij het derde ooglid naar voren komt, kunnen bij het ras voorkomen; cherry eye kan operatief worden verholpen.",
    dental_disease_tooth_brushing: "Een groot Brits onderzoek noemt gebitsproblemen veruit het meest voorkomende probleem bij het ras, en ook melktanden die niet uitvallen komen vaak voor; eigenaren wordt daarom aangeraden het gebit van de hond elke dag te verzorgen, bijvoorbeeld door de tanden te poetsen.",
    windpipe_collapse: "Tracheacollaps, waarbij de luchtpijp zijn stevigheid verliest en zwakte en in elkaar zakken kan veroorzaken, kan bij het ras voorkomen.",
    eye_problems_pra_lens_dry_eye: "Bij het ras komen oogproblemen voor, zoals progressieve retina-atrofie, die langzaam tot blindheid kan leiden, een verschoven lens (lensluxatie) en droge ogen.",
    cataracts_lens_luxation: "Bij het ras kunnen oogproblemen voorkomen, zoals staar, waarbij de lens troebel wordt, en een verschoven lens (lensluxatie).",
    wobbler_syndrome: "Het wobblersyndroom, waarbij instabiele halswervels op het ruggenmerg drukken en de achterbenen verzwakken, kan bij het ras voorkomen.",
    eye_phpv: "Een aangeboren oogafwijking (persisterend hyperplastisch primair vitreum, PHPV) kan bij het ras voorkomen; fokkers wordt aangeraden de ogen van de ouderdieren te laten onderzoeken.",
    certain_cancers: "Bepaalde vormen van kanker kunnen bij het ras voorkomen.",
    bare_skin_sun_cold: "De kale huid van de haarloze variant moet worden beschermd tegen zon en kou.",
    l2hga_nervous_system: "L-2-hydroxyglutaarzuuracidurie (L-2-HGA), een erfelijke stofwisselingsziekte die het zenuwstelsel aantast, kan bij het ras voorkomen; er is een DNA-test voor de ouderdieren beschikbaar.",
    short_face_breathing: "Een ras met een vrij korte snuit: sommige honden met een kortere snuit kunnen ernstige ademhalingsproblemen hebben (brachycefaal obstructief luchtwegsyndroom, BOAS).",
    corneal_ulcers: "Oogproblemen zoals hoornvlieszweren komen vaker voor door de schedelvorm en de uitstekende ogen; er zijn oogonderzoeken beschikbaar.",
    skin_folds_allergies: "Huidproblemen zoals allergieën, wratten, huidflapjes en geïrriteerde huidplooien in het gezicht (huidplooidermatitis) kunnen voorkomen; de plooien in het gezicht moeten schoon en droog worden gehouden.",
    heart_cardiomyopathy_aortic_stenosis: "Hartproblemen zoals cardiomyopathie en aortastenose kunnen bij het ras voorkomen.",
    dental_disease_care: "Een groot Brits onderzoek noemt gebitsproblemen het meest voorkomende probleem bij het ras, en eigenaren wordt aangeraden gebitsverzorging voorrang te geven.",
    bladder_stones: "Blaasstenen, ophopingen van mineralen die zich in de blaas en de urine vormen, kunnen bij het ras voorkomen.",
    deafness: "Doofheid aan één of beide oren komt bij het ras voor; het gehoor van pups kan met een BAER-test worden gecontroleerd.",
    mitral_valve_disease: "Mitralisklepziekte, een hartaandoening waarbij een verzwakte klep bloed terug laat stromen in het hart, komt bij het ras voor; een dierenarts kan het hart van fokhonden beluisteren voordat ermee wordt gefokt.",
    eye_problems_pra_cataracts_dry_eye: "Bij het ras komen oogproblemen voor, zoals progressieve retina-atrofie, die langzaam tot blindheid kan leiden, staar en droge ogen; er zijn oogonderzoeken beschikbaar.",
    skin_comedo_allergy: "Er kunnen huidproblemen voorkomen, zoals het schnauzer-comedosyndroom (een vorm van ontstoken haarzakjes) en huidallergieën (atopie) die jeuk veroorzaken.",
    shorter_face_boas: "Een brachycefaal ras (korte snuit): de kortere snuit kan ernstige ademhalingsproblemen veroorzaken (brachycefaal obstructief luchtwegsyndroom, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Bij het ras komen oogproblemen voor, zoals droge ogen, staar, progressieve retina-atrofie, die langzaam tot blindheid kan leiden, en netvliesloslating.",
    hypothyroidism: "Een te traag werkende schildklier (hypothyreoïdie), die invloed kan hebben op gewicht, huid en energie, kan bij het ras voorkomen.",
    open_fontanelle: "Een open fontanel, een zachte plek op de schedel die niet helemaal sluit, kan bij het ras voorkomen.",
    collapsing_trachea: "Tracheacollaps, een zwakte van de luchtpijp die hoesten en ademhalingsproblemen kan veroorzaken, kan bij het ras voorkomen.",
    gm1_gangliosidosis: "GM1-gangliosidose, een erfelijke ziekte van het zenuwstelsel, kan bij het ras voorkomen; met een DNA-test van de ouderdieren kan die worden uitgesloten.",
    addisons_disease: "De ziekte van Addison, een tekort aan hormonen van de bijnieren, kan bij het ras voorkomen.",
    protein_losing_disease: "Ziekten waarbij eiwit verloren gaat via de nieren of de darmen, en die diarree en gewichtsverlies kunnen veroorzaken, kunnen bij het ras voorkomen.",
    diabetes_mellitus: "Diabetes mellitus (suikerziekte), waarbij het lichaam de bloedsuiker niet goed kan regelen, kan bij het ras voorkomen.",
    dental_disease_home_brushing: "Zoals veel kleine honden is het ras vatbaar voor gebitsproblemen; daarom wordt aangeraden de tanden thuis te poetsen met een hondentandenborstel en hondentandpasta.",
    dermoid_sinus: "Dermoïd sinus, een pijnlijke aandoening waarbij een buisje in de huid van de rug in verbinding staat met het ruggenmerg, kan bij het ras voorkomen; rasverenigingen hebben een controleprogramma op dermoïd sinus voor pups.",
    cataracts: "Staar, waarbij de lens van het oog troebel wordt en het zicht kan afnemen, kan bij het ras voorkomen.",
    pra_inherited_blindness: "Progressieve retina-atrofie, een erfelijke oogziekte die langzaam tot blindheid kan leiden, kan bij het ras voorkomen.",
    eyelids_turned: "Naar binnen (entropion) of naar buiten (ectropion) gedraaide oogleden kunnen bij het ras voorkomen; vraag naar ouderdieren met een oogonderzoek.",
    glaucoma_poag: "Primair openhoekglaucoom, waarbij vocht zich in het oog ophoopt en pijn en mogelijk blindheid veroorzaakt, kan bij het ras voorkomen; er bestaat een DNA-test voor de ouderdieren.",
    skin_fold_dermatitis: "De losse huid vormt plooien die geïrriteerd en ontstoken kunnen raken; ze moeten elke dag worden gecontroleerd en schoon en droog worden gehouden.",
    eyelid_problems: "Bij het ras kunnen ooglidproblemen voorkomen: naar binnen (entropion) of naar buiten (ectropion) gedraaide oogleden, en cherry eye, waarbij het derde ooglid naar voren komt.",
    skin_allergy_face_folds: "Huidallergieën (atopie) die jeuk veroorzaken kunnen bij het ras voorkomen, en de huidplooien in het gezicht moeten elke dag worden schoongemaakt.",
    skin_ear_allergies: "Omgevingsallergieën kunnen bij het ras voorkomen en tot steeds terugkerende huid- of oorontstekingen leiden; PetMD raadt aan de oren van een hond met allergieën elke week schoon te maken.",
    gum_disease_daily_brushing: "Het ras is vatbaar voor tandvleesproblemen (tandvleesontsteking en parodontitis); daarom raadt PetMD aan de tanden van de hond elke dag te poetsen en het gebit elk jaar door de dierenarts te laten controleren.",
    pra_pk_def: "Bij het ras komen twee erfelijke aandoeningen voor: progressieve retina-atrofie, een oogziekte die tot blindheid kan leiden, en pyruvaatkinasedeficiëntie, een bloedaandoening; met DNA-tests van de ouderdieren kunnen fokkers ze voorkomen.",
    windpipe_collapse_breathing: "Tracheacollaps, waarbij de ringen van de luchtpijp inzakken en ademen moeilijk wordt, kan bij het ras voorkomen.",
    eye_problems_pra_cataracts_entropion: "Bij het ras komen oogproblemen voor, zoals progressieve retina-atrofie, die langzaam tot blindheid kan leiden, staar, waarbij de lens troebel wordt, en naar binnen gedraaide oogleden (entropion); er zijn oogonderzoeken beschikbaar.",
    elbow_dysplasia_arthritis: "Elleboogdysplasie, een slecht ontwikkeld ellebooggewricht dat uiteindelijk tot artrose kan leiden, kan bij het ras voorkomen.",
    entropion: "Entropion, waarbij de oogleden naar binnen draaien en het oog irriteren, kan bij het ras voorkomen; vraag naar ouderdieren met een oogonderzoek.",
    autoimmune_conditions: "Auto-immuunziekten, waarbij het lichaam tegen zichzelf reageert, kunnen bij het ras voorkomen.",
    ear_infections_prone: "Het ras is vatbaar voor oorontstekingen; let goed op de hygiëne van de oren.",
    familial_nephropathy: "Een erfelijke nierziekte (familiaire nefropathie) komt bij het ras voor; er is een DNA-test voor de ouderdieren beschikbaar.",
    hereditary_nephritis: "Een erfelijke nierziekte (erfelijke nefritis, ook wel erfelijke glomerulopathie van de samojeed genoemd) komt bij het ras voor.",
    panosteitis: "Panosteïtis, een pijnlijke ontsteking van de lange pijpbeenderen die meestal jonge, groeiende honden treft, kan bij het ras voorkomen.",
    splenic_torsion: "Een draaiing van de milt, waarvoor je dringend naar de dierenarts moet, komt bij dit ras vaker voor dan bij andere grote rassen.",
    urinary_incontinence: "Urine-incontinentie, het onbedoeld verliezen van urine, kan bij het ras voorkomen.",
    osteochondritis: "Osteochondritis dissecans (OCD), een aandoening van het gewrichtskraakbeen bij groeiende honden, kan bij het ras voorkomen.",
    scottie_cramp: "Scottie cramp – korte aanvallen van spierkrampen, meestal door opwinding – komt bij het ras voor; het doet geen pijn.",
    periodontal_disease: "Parodontitis, een infectie en ontsteking van het tandvlees en het weefsel dat de tanden op hun plaats houdt, is een bekend probleem bij het ras.",
    extra_eyelashes: "Distichiasis, waarbij kleine extra wimpers aan de binnenkant of op de rand van het ooglid groeien en tegen het oog kunnen schuren, kan bij het ras voorkomen; vraag naar ouderdieren die binnen het oogonderzoeksprogramma zijn getest.",
    cm_sm_screening: "Chiari-achtige malformatie en syringomyelie, een pijnlijke aandoening met holtes vol vocht in het ruggenmerg vlak bij de hersenen, kan bij het ras voorkomen; fokkers wordt aangeraden de ouderdieren te laten screenen (VK: BVA/KC-programma).",
    prominent_eyes_injury_dry_eye: "Uitstekende ogen raken sneller beschadigd en kunnen gaan zweren en uitdrogen; ook droge ogen en cherry eye komen bij het ras voor.",
    legg_perthes: "De ziekte van Legg-Perthes, een pijnlijke aandoening waarbij de heupkop afsterft en afbrokkelt, kan bij het ras voorkomen.",
    glaucoma: "Glaucoom, een verhoogde druk in het oog die pijnlijk kan zijn en tot blindheid kan leiden, kan bij het ras voorkomen.",
    lethal_acrodermatitis: "Letale acrodermatitis, een erfelijke ziekte die bij pups ernstige huid- en groeiproblemen veroorzaakt, komt bij het ras voor.",
    kidney_disease_urine_screening: "Bij het ras komen nierproblemen voor; met urinetests kunnen de ouderdieren vóór het fokken worden gescreend.",
    primary_lens_luxation: "Primaire lensluxatie, een pijnlijke erfelijke oogaandoening waarbij de lens verschuift en die blindheid kan veroorzaken, komt bij het ras voor; voor fokhonden is een DNA-test beschikbaar.",
    inherited_ataxia: "Erfelijke ataxieën (laat optredende ataxie en spinocerebellaire ataxie), die verlies van evenwicht en coördinatie veroorzaken, komen bij het ras voor; voor fokhonden zijn DNA-tests beschikbaar.",
    hydrocephalus: "Hydrocefalie (waterhoofd), een ophoping van vocht rond de hersenen, kan bij het ras voorkomen.",
    heart_disease_pda: "Bij het ras kan hartziekte voorkomen, waaronder een open ductus arteriosus, een bloedvat bij het hart dat zich na de geboorte niet sluit; een dierenarts kan dat bij de eerste controle van de pup horen.",
    chiari_malformation: "Chiari-achtige malformatie met syringomyelie, een pijnlijke aandoening met holtes vol vocht in het ruggenmerg vlak bij de hersenen, kan bij het ras voorkomen.",
    cataracts_entropion: "Staar, waarbij de lens van het oog troebel wordt, en naar binnen gedraaide oogleden (entropion) kunnen bij het ras voorkomen; vraag naar ouderdieren die binnen het oogonderzoeksprogramma zijn getest.",
    periodontal_daily_brushing: "Het ras is vatbaar voor tandvleesziekte (parodontitis); daarom wordt aangeraden de tanden elke dag te poetsen met hondentandpasta.",
    eye_problems_shallow_sockets: "Bij het ras komen oogproblemen voor, zoals droge ogen, ooginfecties en zweren op het oppervlak van het oog; door de ondiepe oogkassen raken de ogen ook sneller beschadigd.",
    eye_problems_dry_eye_entropion_lens_luxation: "Bij het ras komen oogproblemen voor, zoals droge ogen, naar binnen gedraaide oogleden (entropion) en een verschoven lens (lensluxatie); er zijn oogonderzoeken beschikbaar.",
    heart_valve_screening: "Bij het ras kan hartziekte voorkomen; met hartscans kunnen de ouderdieren vóór het fokken op hartklepproblemen worden gecontroleerd.",
    dental_weight_problems: "Een groot Brits onderzoek noemt gebitsproblemen en overgewicht als bijzonder vaak voorkomende problemen bij het ras – problemen die eigenaren kunnen helpen voorkomen; ook een te vol gebit en melktanden die niet uitvallen komen voor.",
  },
  page: {
    eyebrow: "Dierenencyclopedie",
    // Search terms people use ("ragdoll kat", "karakter"); "karakter" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "karakter, " : ""}beweging, grootte en verzorging | PetPrep`
        : species === "cat"
          ? `${/kat\b/i.test(name) ? name : `${name} (kat)`}: ${hasIntro ? "karakter, " : ""}vachtverzorging, grootte en levensduur | PetPrep`
          : `${name} (${lc(one)}): behoeften, levensduur en verzorging | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Bronnen, gezondheid en tips voor de aankoop.`,
    metaLabels: { weight: "gewicht", exercise: "beweging", lifespan: "levensduur" },
    metaDescription: (name, one) =>
      `${name}: de onderbouwde behoeften van dit ras (${lc(one)}) – beweging, verzorging, maaltijden, grootte, levensduur, voor wie het geschikt is – en hoe PetPrep het simuleert.`,
    suitabilityTitle: "Voor wie het geschikt is",
    suitabilityNote: "Dezelfde labels als in de app. Elk label wordt onderbouwd door de bronnen onderaan de pagina.",
    suitabilityNone: "Voor dit ras zijn nog geen onderbouwde geschiktheidslabels.",
    needsTitle: "Wat het nodig heeft",
    needsIntro: (species) =>
      species === "cat"
        ? "Volgens kattenstamboekorganisaties, veterinaire organisaties en onderzoeken. Waar bronnen verschillen, staat elke bron erbij."
        : "Volgens rasstandaarden, kennelclubs, veterinaire organisaties en onderzoeken. Waar bronnen verschillen, staat elke bron erbij.",
    general: (many) => `Algemene richtlijnen voor ${lc(many)} (niet specifiek voor dit ras):`,
    noData: "Nog niet in onze bronnen.",
    simTitle: "Zo simuleert PetPrep het",
    simBadge: "Spelregels, geen veterinair advies",
    simIntro:
      "In PetPrep is één echte week één maand in het leven van het huisdier. Dit zijn de regels die het spel voor dit ras gebruikt. PetPrep heeft ze gekozen op basis van de bronnen op deze pagina; het zijn geen verzorgingsinstructies voor een echt huisdier.",
    simInfoOnly: "Dit ras staat alleen ter informatie in het register; de app simuleert het nog niet.",
    simTable: { stage: "Levensfase", starts: "Begint", meals: "Maaltijden per dag", activity: { steps: "Dagelijks stappendoel", play_sessions: "Spelen per dag" } },
    arrives: (m) => `komt met ${m} maanden`,
    fromMonth: (m, years) => (years ? `maand ${m} (${years})` : `maand ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `vanaf maand ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Elk getal in het spel is een beslissing van PetPrep die met de bronnen is vastgelegd.",
    healthTitle: "Gezondheid",
    healthNote: "Alleen ter informatie, niet gecontroleerd door een dierenarts. Vraag je dierenarts naar je eigen huisdier.",
    healthNone: "Onze bronnen bevatten nog geen rasspecifieke gezondheidsinformatie voor dit ras.",
    checklistTitle: "Voordat je koopt: wat je bij de fokker controleert",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Vragen om uit te zoeken voordat je een kitten mee naar huis neemt. De punten zijn adviezen van dierenartsen, dierenwelzijnsorganisaties en kattenfederaties; bij elk punt staat de bron." : "Vragen om uit te zoeken voordat je een pup mee naar huis neemt. De punten zijn adviezen van dierenartsen, dierenwelzijnsorganisaties en kennelclubs; bij elk punt staat de bron.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Wetten over de minimumleeftijd, chippen en vaccinaties verschillen per land – zoek uit welke regels gelden waar je woont.",
    checklistGeneralTitle: "Voor elk ras",
    checklistTestsTitle: "Gezondheidstests van de ouderdieren voor dit ras",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tests die een kattenfederatie verplicht stelt voordat met een kat wordt gefokt" : "Tests die de Royal Kennel Club als minimum aanbeveelt",
      best_practice: "Extra tests als goede praktijk",
      other_scheme: "Andere screeningsprogramma’s voor dit ras",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Deze lijst komt uit de fokregels van een buitenlandse kattenfederatie (zie de bron) en is bedoeld als oriëntatie. Vraag de fokker welke tests de ouderdieren hebben gehad."
        : "Deze lijsten komen van de Britse Royal Kennel Club en zijn bedoeld als oriëntatie; nationale kennelclubs kunnen eigen, strengere regels hebben. Vraag de rasvereniging en de fokker welke tests de ouderdieren hebben gehad.",
    checklistStatus: {
      none_recommended: "De Royal Kennel Club noemt op dit moment geen aanbevolen gezondheidsscreening vóór het fokken voor dit ras. Vraag de fokker toch naar de gezondheid van de ouderdieren.",
      not_found: "We hebben nog geen betrouwbare bron gevonden die de gezondheidstests voor de ouderdieren van dit ras noemt. Vraag de rasvereniging en de fokker welke tests de ouderdieren hebben gehad.",
      not_checked: "We hebben de gezondheidstests voor de ouderdieren van dit ras nog niet gecontroleerd. Vraag de rasvereniging en de fokker welke tests de ouderdieren hebben gehad.",
    },
    sourcesTitle: "Bronnen",
    sourcesIntro: "Bij elk feit op deze pagina staat een van deze bronnen.",
    sourcesAll: "Alle bronnen tonen",
    sourcesFewer: "Minder tonen",
    sourceLabel: (id, publisher) => `Bron ${id}: ${publisher}`,
    disclaimer: "PetPrep is een simulatie voor gezinnen. Deze pagina is geen veterinair advies – vraag voor een echt huisdier een dierenarts of de rasvereniging.",
    backTo: (many) => `Alle ${lc(many)}`,
    compareWith: "Vergelijk met andere rassen",
    related: { title: "Vergelijkbare rassen", intro: (many) => `Andere ${lc(many)} in het register met vergelijkbare behoeften – elk met onderbouwde feiten.` },
    updated: "Bijgewerkt",
    glanceTitle: "In één oogopslag",
    glanceNote: "De belangrijkste feiten uit de bronnen onderaan de pagina. Waar bronnen verschillen, staat elke waarde erbij.",
    portraitAlt: { ai_photo: (name) => `${name} – foto (AI)`, ai_illustration: (name) => `${name} – illustratie (AI)` },
    portraitCaption: { ai_photo: "Met AI gemaakte foto", ai_illustration: "Met AI gemaakte illustratie" },
    portraitColours: {
      legend: "Vachtkleur",
      alt: { ai_photo: (name, colour) => `${name}, ${lc(colour)} – foto (AI)`, ai_illustration: (name, colour) => `${name}, ${lc(colour)} – illustratie (AI)` },
    },
    share: {
      button: "Delen",
      title: "Dit ras delen",
      copy: "Kopiëren",
      copied: "Gekopieerd",
      linkLabel: "Link naar deze pagina",
      more: "Meer opties",
      text: (name) => `${name}: behoeften, bronnen en hoe PetPrep het simuleert`,
      emailSubject: (name) => `${name} – dierenencyclopedie van PetPrep`,
      on: (network) => `Delen via ${network}`,
    },
    og: { lead: "Behoeften, bronnen en hoe PetPrep het simuleert", photoLabel: "AI-foto" },
    qa: {
      title: "Vragen en antwoorden",
      intro: "Alleen beantwoord met de onderbouwde feiten op deze pagina; bij elk antwoord staan de bronnen.",
      // Breed names take "de" / "een" and are lower case in running text, except proper-name parts: "een border collie", "de Duitse herder".
      questions: {
        exercise: (n) => `Hoeveel beweging heeft een ${rn(n)} nodig?`,
        lifespan: (n) => `Hoe oud wordt een ${rn(n)}?`,
        size: (n) => `Hoe groot en hoe zwaar wordt een ${rn(n)}?`,
        grooming: (n) => `Hoeveel vachtverzorging heeft een ${rn(n)} nodig?`,
        suits: (n) => `Voor wie is ${deRn(n)} geschikt?`,
      },
      leads: {
        exercise: (n) => `Volgens onze bronnen heeft ${deRn(n)} zoveel beweging nodig:`,
        lifespan: (n) => `Volgens onze bronnen is de levensduur van ${deRn(n)}:`,
        size: (n) => `Grootte en gewicht van een volwassen ${rn(n)}, volgens onze bronnen:`,
        grooming: (n) => `Vacht en verzorging van ${deRn(n)}, volgens onze bronnen:`,
        suits: (n) => `Volgens onze bronnen past ${deRn(n)} goed bij:`,
      },
      considerLead: "Let op:",
      differ: "De bronnen geven verschillende waarden, daarom staat elke waarde erbij.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "De Anatolische herder is een grote, krachtig gebouwde kuddebewaker uit Turkije; de FCI beschrijft de Turkse herdershond als kangal (Kangal Shepherd Dog) – eenkleurig van vaalgeel tot wolfsgrijs met een zwart masker, 72–78 cm hoog bij reuen en 65–73 cm bij teven. De Amerikaanse rasstandaard noemt 110–150 pond (ongeveer 50–68 kg) voor reuen en 80–120 pond (ongeveer 36–54 kg) voor teven. Een hond van dit formaat is volgroeid rond 18–24 maanden (PetMD); de Royal Kennel Club geeft een levensverwachting van meer dan 10 jaar en WebMD gemiddeld 11 tot 13 jaar.",
        "De Royal Kennel Club raadt meer dan 2 uur beweging per dag aan en vachtverzorging vaker dan eens per week, meldt dat hij verhaart en past bij een groot huis met een grote tuin op het platteland, en deelt hem in bij Breed Watch-categorie 1. PetMD schrijft dat Anatolische herders waarschijnlijk het best passen in een huis zonder jonge kinderen, dat pups die vroeg andere dieren leren kennen meestal goed met hen opschieten, dat vroege socialisatie essentieel is, dat de vacht buiten de twee jaarlijkse ruiperiodes wekelijks geborsteld moet worden en dat beweging rond de maaltijden vermeden moet worden.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Ierse rode setter, Irish Setter",
      text: [
        "De Ierse setter (Ierse rode setter) is een slanke, atletische staande hond uit Ierland, gefokt om ruim te zoeken. De FCI-standaard beschrijft één kleur — diep kastanjerood zonder spoor van zwart — en een schofthoogte van 58–67 cm voor reuen en 55–62 cm voor teven; de Amerikaanse rasstandaard noemt ongeveer 70 pond (circa 32 kg) ideaal voor een reu en 60 pond (circa 27 kg) voor een teef. Een hond van dit formaat is volgroeid rond 15–18 maanden (PetMD), en The Royal Kennel Club noemt een levensduur van meer dan 10 jaar.",
        "The Royal Kennel Club raadt meer dan 2 uur beweging per dag aan en vachtverzorging vaker dan eens per week, zegt dat het ras verhaart en past bij een groot huis met een grote tuin, en plaatst het in Breed Watch-categorie 1. De PDSA beschrijft zeer vriendelijke, aanhankelijke honden die goed overweg kunnen met kinderen en andere huisdieren en raadt vachtverzorging 2 tot 3 keer per week aan; PetMD raadt aan de oren wekelijks te controleren en schoon te maken en schrijft dat Ierse setters veel menselijk gezelschap nodig hebben.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Griffon Bruxellois, Brussels Griffon",
      text: [
        "De Brusselse griffon (Griffon Bruxellois) is een kleine gezelschapshond uit België met een kort, plat gezicht. De FCI-standaard beschrijft een rode, van nature harde, licht golvende vacht en een gewicht van 3,5–6 kg; de Britse Royal Kennel Club, die een ruwharige en een gladharige variant kent, noemt hem een slim hondje met een terrierachtig karakter. Een hond van dit formaat is met ongeveer 8–12 maanden volgroeid (PetMD), en de Royal Kennel Club noemt een levensverwachting van meer dan 12 jaar (PetMD: 12–15 jaar).",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en vachtverzorging vaker dan eens per week, vermeldt dat hij verhaart en geschikt is voor een appartement, en plaatst het ras in Breed Watch-categorie 2. PetMD beschrijft een kortsnuitige (brachycefale) hond die slecht tegen warm, vochtig weer kan, raadt aan de gezichtsplooien ongeveer eens per week schoon te maken en dagelijks de tanden te poetsen, en schrijft dat Brusselse griffons onder toezicht goed overweg kunnen met kinderen en andere huisdieren, maar niet graag lang alleen zijn.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, Amerikaanse rat terrier",
      text: [
        "De rat terrier is een kleine Amerikaanse terriër die in twee maten wordt gefokt – miniatuur en standaard – met een korte, nauw aanliggende, gladde en glanzende vacht. De rasstandaard staat een schofthoogte tot 18 inch (46 cm) toe, en PetMD noemt voor beide maten een gewicht van 10–25 pond (ongeveer 4,5–11 kg); een hond van dit formaat is rond 9–12 maanden volgroeid (PetMD). VCA noemt een levensduur van 12–16 jaar, PetMD 12–18 jaar.",
        "De Rat Terrier Club of America zegt dat rat terriers goed met kinderen omgaan, vooral als ze met hen opgroeien, en het in een appartement redden, maar minstens 30 minuten beweging per dag nodig hebben. PetMD schrijft dat ze veel lichamelijke en mentale uitdaging nodig hebben, niet graag lang alleen zijn en het hele jaar licht verharen; VCA raadt eenmaal per week borstelen aan en waarschuwt dat ze misschien niet goed samengaan met kleine huisdieren, vooral knaagdieren.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    shar_pei: {
      aka: "Chinese shar-pei, Sharpei",
      text: [
        "De shar-pei (in de VS “Chinese Shar-Pei”) is een actieve, compacte, vierkant gebouwde middelgrote hond uit China met een korte, harde, borstelige vacht in één effen kleur (elke kleur behalve wit), plooien op het hoofd en de schoft en een brede snuit. De standaard van de Royal Kennel Club noemt een schofthoogte van 46–51 cm en de PDSA een gewicht van 20–27 kg; een hond van dit formaat is rond 12–15 maanden volgroeid (PetMD). De Royal Kennel Club en de PDSA noemen een levensduur van meer dan 10 jaar, maar een VetCompass-onderzoek bij honden in het Verenigd Koninkrijk vond een mediaan van 7,3 jaar.",
        "De Royal Kennel Club raadt tot een uur beweging per dag en eenmaal per week borstelen aan, en plaatst het ras in categorie 2 van Breed Watch vanwege problemen met de oogleden en de huidplooien. De PDSA beschrijft shar-pei’s als trouwe, toegewijde gezinshonden die het best passen bij ervaren eigenaren en oudere kinderen, waarschuwt voor een sterk jachtinstinct tegenover kleinere dieren en raadt aan de huidplooien schoon en droog te houden en tussen eten en beweging wat tijd te laten.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "De border collie is een middelgrote herdershond uit Groot-Brittannië, gebouwd voor uithoudingsvermogen en hard werk. De rasstandaard beschrijft een gretige, alerte, ontvankelijke en intelligente hond die niet nerveus en niet agressief is.",
        "Kennelclubs en dierenartsen zijn het vooral over één ding eens: dit is een ras met heel veel energie. Hij heeft elke dag meer dan twee uur beweging nodig en veel om over na te denken. Verveelt hij zich of beweegt hij te weinig, dan zoekt hij zelf werk – hij knaagt aan alles wat binnen bereik ligt of probeert spelende kinderen te hoeden.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador",
      text: [
        "De labrador retriever is een grote, stevig gebouwde jachthond uit Groot-Brittannië, gefokt om wild te apporteren. De standaard beschrijft een goedaardige, vriendelijke en flexibele metgezel die graag wil behagen en dol is op water. De vacht is kort en dicht, in zwart, geel of lever/chocolade.",
        "Britse dierenwelzijnsorganisaties beschrijven de labrador als een gezinshond die zich aan het hele huishouden hecht als hij goed gesocialiseerd is. Hij is heel actief en sterk gemotiveerd door eten: snoepjes helpen bij de training, maar labradors komen ook makkelijk aan.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden",
      text: [
        "De golden retriever is een grote jachthond uit Groot-Brittannië met een vlakke of golvende vacht in tinten goud of crème. De standaard beschrijft een gehoorzame, intelligente hond die vriendelijk, hartelijk en zelfverzekerd is.",
        "Britse dierenwelzijnsorganisaties noemen hem een geweldige gezinshond voor een actief gezin, en een hond die een goede eerste hond kan zijn. De keerzijde staat duidelijk in de bronnen: minstens twee uur beweging per dag, meerdere keren per week borstelen en een vacht die flink verhaart.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Frenchie, Bouledogue français",
      text: [
        "De Franse bulldog is een kleine, stevige gezelschapshond uit Frankrijk met een korte, gladde vacht en rechtopstaande “vleermuisoren”. De standaard beschrijft een sociale, levendige en speelse hond; Britse dierenwelzijnsorganisaties noemen hem relaxed en flexibel en zeggen dat hij meestal goed met kinderen overweg kan, wat hem tot een populaire gezinshond heeft gemaakt.",
        "Hij heeft tot een uur beweging per dag nodig en past in een appartement. Het nadeel dat elke bron noemt, is de platte snuit: die kan het ademen bemoeilijken, en Franse bulldogs raken snel oververhit, vooral bij warm weer – schaduw, water en rustige wandelingen zijn dus belangrijk. De PDSA raadt gezinnen aan ook te overwegen een volwassen Franse bulldog te adopteren.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Herder, Duitse herdershond, Deutscher Schäferhund",
      text: [
        "De Duitse herder is een grote, krachtige herdershond uit Duitsland met staande oren en een dichte dubbele vacht, kort of lang. De standaard beschrijft een evenwichtige, zelfverzekerde hond met sterke zenuwen, en de Royal Kennel Club noemt hem een veelzijdige werk- en hulphond die bekendstaat om zijn moed en intelligentie.",
        "Hij heeft minstens twee uur beweging per dag nodig, past bij een groot huis met tuin en verhaart flink. Britse dierenwelzijnsorganisaties zeggen dat sommige Duitse herders geweldige gezinshonden kunnen zijn, maar dat ze bij jonge kinderen altijd onder toezicht moeten staan. De Royal Kennel Club vraagt fokkers de heupen en ellebogen van de ouderdieren te laten testen en noemt de vorm van de achterbenen een aandachtspunt bij het ras.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "De Cavalier King Charles spaniel is een kleine dwergspaniël uit Groot-Brittannië met lange, rijk behaarde oren en een lange, zijdezachte vacht in vier kleuren: blenheim, ruby, black and tan en driekleur. De standaard beschrijft een actieve, sierlijke hond met een zachte uitdrukking – sportief, aanhankelijk, vriendelijk en onbevreesd.",
        "Hij heeft ongeveer een uur beweging per dag nodig, kan in een appartement wonen en staat erom bekend goed met kinderen om te gaan, al moet het spelen onder toezicht gebeuren en vindt hij het niet fijn om alleen gelaten te worden. Zijn vacht moet vaker dan één keer per week worden geborsteld. Britse bronnen noemen hartklepziekte en een pijnlijke aandoening van het ruggenmerg die samenhangt met de schedelvorm als de belangrijkste gezondheidsproblemen; fokkers wordt daarom gevraagd het hart van hun honden te laten testen en een MRI-scan te laten maken.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "De beagle is een kleine lopende hond uit Groot-Brittannië, gefokt om hazen te jagen door een geurspoor te volgen. De standaard beschrijft een stevige, compact gebouwde, vrolijke hond – moedig, actief en alert, beminnelijk en zonder agressie of schuwheid – met een korte, dichte vacht in de typische kleuren van lopende honden, zoals driekleur, tan met wit of citroen met wit, en altijd een witte staartpunt.",
        "Hij heeft tot ongeveer een uur beweging per dag nodig en past goed in een gezin als hij van jongs af aan gesocialiseerd is, al moet hij bij kinderen onder toezicht staan en niet alleen worden gelaten, want dan kan hij gaan blaffen en dingen kapotknagen. Zijn korte vacht heeft één keer per week een borstelbeurt nodig, maar hij verhaart wel. De training moet vroeg beginnen en met beloningen werken. Britse dierenartsen zien beagles het vaakst voor overgewicht en gebitsproblemen, dus let op de porties en de tanden.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Poedel, Koningspoedel",
      text: [
        "De grote poedel is de grootste van de vier poedelmaten, een gezelschapsras uit Frankrijk dat afstamt van Europese eendenjagers. De standaard beschrijft een elegante, evenwichtige hond met een fiere houding – trouw, opgewekt en goedaardig, leergierig en goed te trainen – met een overvloedige, kroezende, krullende vacht in één effen kleur: zwart, wit, bruin, grijs of fawn.",
        "Hij heeft tot ongeveer een uur beweging per dag nodig en past bij een groot huis met een grote tuin. Met de juiste socialisatie als pup kan hij meestal goed overweg met kinderen en andere huisdieren. Zijn vacht verhaart niet, maar dat maakt hem niet hypoallergeen: hij moet elke dag worden verzorgd en regelmatig worden geknipt door een professionele trimmer. Hij staat bekend als heel gehoorzaam en goed te trainen.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Dashond, Worsthond, Dachshund",
      text: [
        "De teckel (Duits: Dachshund, in Duitsland ook Teckel genoemd) is een Duitse jager op das en konijn; hij bestaat in verschillende maten en drie vachtsoorten, en deze pagina gaat over de standaardmaat met de korte, gladde vacht. De standaard beschrijft een hond die in verhouding tot zijn hoogte vrij lang is, zonder overdrijving – trouw, veelzijdig en goedaardig; intelligent, levendig en moedig – met een dichte, korte, gladde vacht in rood, of zwart of chocoladebruin met tan aftekeningen.",
        "Hij heeft tot ongeveer een uur beweging per dag nodig, verdeeld over een paar wandelingen met tijd om te snuffelen, en past in een klein huis. Hij houdt van mensen en kan meestal goed overweg met kinderen van alle leeftijden, altijd onder toezicht, maar door zijn sterke jachtinstinct wordt hij niet aangeraden bij kleinere huisdieren, en hij vindt het niet fijn om alleen te zijn. Door zijn lange rug en korte poten is hij vatbaar voor hernia, dus hij mag niet springen; fokkers wordt gevraagd de rug te laten screenen vóór het fokken.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie, Australische herder",
      text: [
        "De Australian shepherd is, ondanks zijn naam, een Amerikaans ras – een intelligente werkhond met een sterk hoed- en waakinstinct. De standaard beschrijft een evenwichtige, middelgrote hond die iets langer is dan hoog, goedaardig en soms wat terughoudend bij een eerste ontmoeting, met een middellange, steile tot golvende vacht in blue merle, zwart, red merle of rood, elk met of zonder witte en tan aftekeningen.",
        "Hij heeft meer dan twee uur beweging per dag nodig en mentale uitdagingen zoals puzzelspellen en training, en past bij een groot huis met een grote tuin op het platteland. In het juiste huishouden kan hij een heel goede gezinshond zijn, maar door zijn sterke hoedinstinct kan hij kinderen gaan hoeden, en daarom wordt hij niet aangeraden voor gezinnen met jongere kinderen. Hij is niet graag alleen, en zijn vacht moet een paar keer per week worden geborsteld.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon havanais",
      text: [
        "De havanezer is een klein lid van de bichonfamilie en de nationale hond van Cuba. De standaard beschrijft een stevig hondje, laag op de poten, met een heel lange, zachte, steile of golvende vacht die nooit wordt getrimd, en een staart die hoog over de rug wordt gedragen. Hij komt voor in fawn, zwart, havannabruin, tabak, roodbruin en, zelden, wit, met of zonder vlekken en tan aftekeningen.",
        "De standaard noemt hem aanhankelijk, speels en zelfs een beetje een clown, en zegt dat hij dol is op kinderen en eindeloos met ze speelt; Britse bronnen noemen hem met de juiste socialisatie een uitstekende gezinshond die makkelijk te trainen is. Hij heeft ongeveer 30 minuten beweging per dag nodig, kan in een appartement wonen en verhaart niet – maar zijn lange vacht moet elke dag worden verzorgd om knopen en klitten te voorkomen.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "De West Highland white terrier, of westie, is een kleine terriër uit Groot-Brittannië. De standaard beschrijft een stevig gebouwd hondje met een diepe borst, een rechte rug en een harde dubbele vacht van ongeveer 5 cm lang, kleine, rechtopstaande puntige oren en donkere ogen onder zware wenkbrauwen. Wit is de enige kleur die de standaard toestaat.",
        "De standaard noemt hem alert, vrolijk, moedig en zelfstandig, maar vriendelijk. Britse bronnen noemen hem een aanhankelijke, speelse gezinshond voor kinderen van elke leeftijd, waarbij het spelen altijd onder toezicht gebeurt; hij heeft ongeveer een uur beweging per dag nodig, kan in een appartement wonen, verhaart en moet een paar keer per week worden geborsteld. Door zijn jachtinstinct hoort hij niet samen te leven met kleinere huisdieren, en hij is niet graag alleen. De huid is een bekend aandachtspunt: de Royal Kennel Club vraagt keurmeesters te letten op tekenen van huidontsteking bij het ras.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Bernese mountain dog",
      text: [
        "De Berner sennenhond is een grote Zwitserse boerderijhond, oorspronkelijk gebruikt als waak-, trek- en veedrijvershond in het kanton Bern. De standaard beschrijft een sterke, wendbare, langharige werkhond met stevige ledematen en een lange, glanzende, steile of licht golvende vacht. De enige kleur die de standaard toestaat is driekleur: gitzwart met warm tan op de wangen, boven de ogen, op de poten en de borst, en witte aftekeningen op het hoofd en de borst.",
        "De standaard noemt hem zelfverzekerd, goedaardig en vriendelijk, en “een vriendelijke en toegewijde gezinshond” die langzaam volwassen wordt. Britse bronnen zeggen dat hij tot een uur beweging per dag nodig heeft, thuishoort in een groot huis met een grote tuin, flink verhaart en vaker dan één keer per week moet worden geborsteld; hij mag niet lang alleen worden gelaten. Hij wordt meestal minder dan tien jaar oud, en Britse bronnen noemen heup- en elleboogdysplasie, maagtorsie en bepaalde vormen van kanker als gezondheidsproblemen.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky, Siberische husky",
      text: [
        "De Siberian husky is een middelgrote sledehond die de FCI als Amerikaans ras erkent en die de Royal Kennel Club de lichtste en snelste van de sledehonden noemt. De standaard vraagt om een hond die snel en licht ter been is, met een dubbele, middellange vacht, dikke rechtopstaande oren, bruine of blauwe ogen (van elk één mag ook) en een goed behaarde pluimstaart. De kleuren lopen van zwart tot zuiver wit; merle en gestroomd zijn niet toegestaan.",
        "De standaard noemt hem vriendelijk en zachtaardig, alert en extravert. Britse bronnen zeggen dat hij meer dan twee uur beweging per dag nodig heeft, een groot huis met een grote tuin en een heel stevig, hoog hek, want husky’s staan erom bekend dat ze ontsnappen; hij verhaart flink, moet een paar keer per week worden geborsteld en kan slecht alleen zijn. De PDSA raadt hem aan voor huishoudens met alleen volwassenen of met tieners, eerder dan voor gezinnen met jongere kinderen, en noemt heupdysplasie, oogproblemen en epilepsie als gezondheidsproblemen.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "De rottweiler is een middelgrote tot grote, krachtige werkhond uit Duitsland. De standaard beschrijft een stoere hond, niet zwaar en niet licht, met een korte, grove, vlak liggende vacht, middelgrote hangende oren en donkerbruine amandelvormige ogen. De enige kleur die is toegestaan, is zwart met duidelijk afgetekende, warme tan aftekeningen op de wangen, snuit, keel, borst en poten; witte aftekeningen zijn een fout.",
        "De standaard noemt hem goedaardig, rustig, heel toegewijd, gehoorzaam en werkwillig, en de Royal Kennel Club zegt dat een goed getrainde rottweiler een geweldige gezinshond is. Britse bronnen zeggen dat hij meer dan twee uur beweging per dag nodig heeft, een groot huis met een grote tuin en een ervaren eigenaar, omdat hij zo krachtig is; hij moet van jongs af aan worden gesocialiseerd. De PDSA raadt hem niet aan voor gezinnen met jongere kinderen en baby’s, en hij mag nooit zonder toezicht bij andere huisdieren worden gelaten. Eén keer per week borstelen is genoeg. Hij wordt meestal minder dan tien jaar oud, en de Royal Kennel Club let bij het ras op de vorm van de achterbenen.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog, English bulldog",
      text: [
        "De Engelse bulldog is een middelgrote, gladharige hond uit Groot-Brittannië: vrij gedrongen, laag, breed, krachtig en compact, met een relatief korte snuit, kleine dunne rozenoren en ronde, heel donkere ogen. De standaard staat effen kleuren toe zoals rood, fawn, vaal en wit, gestroomd en bont; zwart en zwart met tan zijn zeer ongewenst. De standaard vraagt om grote, wijd open neusgaten en zegt dat honden met ademnood zeer ongewenst zijn.",
        "De standaard noemt hem alert, moedig, trouw, betrouwbaar en dapper, woest van uiterlijk maar aanhankelijk, en de Royal Kennel Club zegt dat hij door zijn karakter en trouw enorm populair blijft als gezinshond. Britse bronnen zeggen dat hij tot een uur beweging per dag nodig heeft, nooit op het heetst van de dag, en goed met andere huisdieren overweg kan als hij jong is gesocialiseerd; hij moet één keer per week worden verzorgd, maar de rimpels in zijn gezicht moeten elke dag worden schoongemaakt. De PDSA beschrijft hem als een ras met een extreem platte snuit dat heel waarschijnlijk ernstige gezondheidsproblemen krijgt, zoals ademhalingsproblemen, en raadt sterk aan een gezonder ras, een kruising of een hond zonder stamboom te overwegen. Hij wordt meestal minder dan tien jaar oud.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Duitse staande korthaar, Kurzhaar, Deutsch Kurzhaar, German shorthaired pointer",
      text: [
        "De Duitse staande hond korthaar is een veelzijdige jachthond uit Duitsland, gebouwd voor werk op het veld en in het water, met een korte, dikke vacht die ruw aanvoelt, brede platte oren die hoog zijn aangezet en donkerbruine amandelvormige ogen. De Amerikaanse standaard staat effen leverbruin, leverbruin met wit (bijvoorbeeld getikt), effen zwart en zwart met wit toe; rode, oranje, citroenkleurige of tan vlakken en een volledig witte hond leiden tot diskwalificatie. De standaard beschrijft een gecoupeerde staart – PetPrep toont de hond altijd met zijn natuurlijke staart.",
        "De standaard noemt hem vriendelijk en intelligent, een hond die graag wil behagen. De Royal Kennel Club en de PDSA zeggen dat hij meer dan twee uur beweging per dag nodig heeft; de PDSA voegt eraan toe dat zijn instinct om te jagen, voor te staan en te apporteren tijdens een wandeling kan opspelen, zodat hij een goede terugroeptraining nodig heeft, en dat hij vrij makkelijk te trainen is. Hij moet één à twee keer per week worden verzorgd en verhaart matig. Een groot Brits onderzoek komt uit op een mediane levensverwachting van 13,4 jaar.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie",
      text: [
        "De Yorkshire terrier is een dwergterriër uit Groot-Brittannië die volgens de rasstandaard tot 3,2 kg weegt, met een lange, kaarsrechte, glanzende en zijdezachte vacht die vanaf een scheiding over de rug gelijkmatig langs beide kanten afhangt. De standaard staat één kleur toe: donker staalblauw van het achterhoofd tot de staart, met warm, helder tan op het hoofd, de borst en de poten; de kleine V-vormige oren worden rechtop gedragen. De standaard beschrijft zowel een gecoupeerde als een ongecoupeerde staart – PetPrep toont de hond altijd met zijn natuurlijke staart.",
        "De standaard noemt hem alert, intelligent en pittig, met een evenwichtig karakter. De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en dagelijkse verzorging; de PDSA voegt eraan toe dat hij graag rent, apporteert en spelletjes doet, behoorlijk koppig kan zijn bij de training, en beter past bij gezinnen met oudere kinderen omdat zijn botten heel breekbaar zijn. Een groot Brits onderzoek vond gebitsproblemen het meest voorkomende probleem bij het ras, raadt dagelijkse gebitsverzorging zoals tandenpoetsen aan, en kwam uit op een mediane leeftijd bij overlijden van 13,56 jaar.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane corso italiano, Italiaanse corso",
      text: [
        "De cane corso is een middelgrote tot grote Italiaanse molosser, een robuuste en stevige hond met een zekere elegantie, iets langer dan hoog. De standaard beschrijft een korte, glanzende, heel dichte vacht in zwart, grijstinten, fawn of rood met een donker masker, donker tarwekleurig of gestroomd; grote witte vlekken zijn niet toegestaan. Volgens de huidige FCI-standaard worden de oren niet gecoupeerd en is de staart natuurlijk – en in het Verenigd Koninkrijk is couperen van oren en staart verboden – dus PetPrep toont de hond altijd met natuurlijke oren en staart.",
        "De standaard noemt hem een bewaker van bezit, gezin en vee, uiterst wendbaar en ontvankelijk. De PDSA zegt dat hij sociaal en liefdevol is tegenover zijn eigenaren, ongeveer twee uur beweging per dag nodig heeft en dingen om te doen, omdat hij een hekel heeft aan verveling, en door zijn grootte beter past bij ervaren eigenaren. Ze raadt het ras niet aan voor gezinnen met kleine kinderen, die omver kunnen worden gelopen; hij past bij huishoudens met alleen volwassenen of gezinnen met oudere kinderen. Eén keer per week borstelen is genoeg, maar hij verhaart en staat erom bekend dat hij kwijlt. De PDSA noemt een gemiddelde levensduur van minder dan tien jaar.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Corgi, Pembroke Welsh corgi",
      text: [
        "De Welsh corgi pembroke is een kleine veedrijvershond uit Wales, laag gebouwd, sterk en stevig, die veel substantie en uithoudingsvermogen in een klein formaat laat zien. De standaard beschrijft een middellange, steile vacht met een dichte ondervacht in rood, sable, fawn of zwart met tan, met of zonder witte aftekeningen op de poten, de borst en de hals, en staande oren. Vroeger werd de staart gewoonlijk gecoupeerd; de standaard beschrijft ook de natuurlijke staart, en PetPrep toont de hond altijd met zijn natuurlijke staart.",
        "De standaard noemt hem moedig, werklustig, extravert en vriendelijk. De Royal Kennel Club raadt tot een uur beweging per dag aan en vaker dan één keer per week verzorging; de PDSA beschrijft vriendelijke, vrolijke, speelse honden die graag willen behagen en vrij makkelijk te trainen zijn, maar zegt dat ze in de hielen van rennende kinderen kunnen happen, dus socialisatie met kinderen en training van jongs af aan helpen. De Royal Kennel Club noemt een levensduur van meer dan 12 jaar en vraagt fokkers de heupen van de ouderdieren te laten beoordelen.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Dobermann pinscher",
      text: [
        "De dobermann is een Duitse gezelschaps-, bescherm- en werkhond van gemiddelde grootte, sterk en gespierd gebouwd, met elegante lijnen en een fiere houding. De FCI-standaard beschrijft een korte, harde, dichte vacht die strak en glad aanligt, in zwart of bruin met duidelijk afgetekende roestrode aftekeningen; witte vlekken zijn niet toegestaan. Volgens de FCI-standaard blijven oren en staart natuurlijk, en PetPrep toont de hond altijd met natuurlijke oren en staart.",
        "De standaard noemt hem vriendelijk en rustig en heel toegewijd aan het gezin. De Royal Kennel Club zegt dat zijn trouwe en gehoorzame aard hem tot een uitstekende gezinshond maakt, en raadt meer dan twee uur beweging per dag aan en één keer per week verzorging. De PDSA voegt eraan toe dat hij heel energiek is, veel mentale en lichamelijke beweging en vroege socialisatie nodig heeft, en – door zijn grootte en sterke bouw – niet wordt aangeraden voor gezinnen met jonge kinderen of voor beginnende eigenaren. De Royal Kennel Club noemt een levensduur van meer dan 10 jaar.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Duitse boxer, Deutscher Boxer",
      text: [
        "De boxer is een Duitse werk- en gezelschapshond van gemiddelde grootte, vierkant gebouwd, met sterke botten en goed ontwikkelde spieren. De standaarden beschrijven een korte, glanzende, gladde vacht in fawn of gestroomd met een zwart masker; witte aftekeningen zijn toegestaan, maar mogen niet meer dan een derde van de vacht bedekken. De snuit moet breed en diep zijn, nooit kort, met wijde neusgaten. Vroeger werd de staart gewoonlijk gecoupeerd; de standaard beschrijft ook de ongecoupeerde staart, en PetPrep toont de hond altijd met natuurlijke oren en staart.",
        "De standaard noemt hem evenwichtig, gehoorzaam, onbevreesd en zelfverzekerd. De Royal Kennel Club noemt hem een geliefde gezinshond en raadt meer dan twee uur beweging per dag aan en één keer per week verzorging. De PDSA beschrijft een heel energieke, speelse hond die dol is op mensen en verlatingsangst kan ontwikkelen als hij alleen wordt gelaten, een heel sterk jachtinstinct heeft en – door zijn grootte en onstuimige aard – niet wordt aangeraden voor gezinnen met jongere kinderen of voor beginnende eigenaren; sommige boxers met een kortere snuit kunnen ernstige ademhalingsproblemen hebben. De Royal Kennel Club noemt een levensduur van meer dan 10 jaar.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Miniatuurschnauzer",
      text: [
        "De dwergschnauzer is een kleine Duitse gezelschapshond: sterk, gedrongen en bijna vierkant, met een harde, draadachtige, dichte vacht, borstelige wenkbrauwen en een baard. De FCI-standaard staat peper-en-zout, zwart-zilver, effen zwart en effen wit toe; PetPrep toont de eerste drie. Vroeger werd de staart gewoonlijk gecoupeerd en werden de oren soms gecoupeerd; de FCI-standaard vraagt om een natuurlijke staart en hangende oren, en PetPrep toont de hond altijd met natuurlijke oren en staart.",
        "De FCI noemt hem een huis- en gezelschapshond, en de Royal Kennel Club zegt dat hij enorm populair is als metgezel. De Royal Kennel Club raadt tot een uur beweging per dag aan en vaker dan één keer per week verzorging en zegt dat hij niet verhaart. De PDSA beschrijft een speelse, nieuwsgierige hond die goed met kinderen overweg kan als hij al jong aan ze went, koppig kan zijn bij de training en twee à drie keer per week moet worden verzorgd, plus af en toe knippen of trimmen door een professionele trimmer. De Royal Kennel Club noemt een levensduur van meer dan 10 jaar.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-tzu",
      text: [
        "De shih tzu is een kleine gezelschapshond uit Tibet; Groot-Brittannië beheert de FCI-standaard. De standaarden beschrijven een stevige hond met een overvloedige vacht, een fiere houding en een gezicht “als een chrysant”: een lange, dichte bovenvacht, grote donkere ronde ogen, grote hangende oren en een rijk bevederde staart die over de rug wordt gedragen. De standaarden staan veel kleuren toe; PetPrep toont goud met wit, zwart met wit en lever met wit, en nooit merle. De snuit is kort en plat, en de PDSA noemt ademhalingsproblemen door de kortere snuit, dus PetPrep tekent altijd een gematigde snuit met open neusgaten.",
        "De FCI beschrijft hem als intelligent, actief en alert, vriendelijk en zelfstandig. De Royal Kennel Club raadt tot een uur beweging per dag aan en dagelijkse verzorging, en noemt een appartement een geschikt thuis. De PDSA zegt dat shih tzu’s goedaardige gezinshonden kunnen zijn als ze de juiste socialisatie en training hebben gehad, noemt ze een ideaal huisdier voor beginnende eigenaren, raadt aan ze bij kinderen altijd onder toezicht te houden, en adviseert voor de meeste honden in huis dagelijks borstelen plus om de zes à acht weken een knipbeurt door een professionele trimmer. De Royal Kennel Club noemt een levensduur van meer dan 10 jaar.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deense dog, Deutsche Dogge, Great Dane",
      text: [
        "De Duitse dog is een Duitse reus: volgens de FCI-standaard combineert hij een groot, krachtig, goed gebouwd lichaam met trots, kracht en elegantie, met een lang, smal hoofd, natuurlijk hangende oren en een heel korte, gladde, glanzende vacht. De standaarden noemen geel en gestroomd – bij voorkeur met een zwart masker – en daarnaast harlekijn, zwart en blauw; PetPrep toont alleen kleuren die zowel de FCI als de Royal Kennel Club noemen, nooit merle of manteltekening, en tekent de hond altijd met natuurlijke oren en staart en strak aansluitende oogleden, omdat de Royal Kennel Club keurmeesters vraagt te letten op naar binnen of naar buiten gedraaide oogleden en op zwakke achterbenen.",
        "De FCI noemt hem vriendelijk, liefdevol en toegewijd aan zijn eigenaren, al kan hij terughoudend zijn tegenover vreemden. De Royal Kennel Club zegt dat hij ondanks zijn grootte een geweldige gezinshond is, en raadt meer dan twee uur beweging per dag aan, een groot huis met tuin en één keer per week verzorging. De PDSA zegt dat Duitse doggen bekendstaan om hun kwijlen, een vrij sterk jachtinstinct hebben, en door hun grootte en kracht niet worden aangeraden voor gezinnen met jongere kinderen; ze adviseert tijd te laten tussen eten en bewegen om maagtorsie te helpen voorkomen. De Royal Kennel Club noemt een levensduur van minder dan 10 jaar.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Dwergkees, Dwergkeeshond, Pom",
      text: [
        "De pomeranian is de kleinste spits: de FCI voert hem als de dwergvariant van de Duitse spits (dwergkees), 21 cm ± 3 cm schofthoogte, en de standaard van de Royal Kennel Club beschrijft een compact, kort gebouwd hondje met een vosachtig hoofd, kleine rechtopstaande oren en een staart die over de rug is gekruld. De dubbele vacht heeft een zachte, pluizige ondervacht en een lange, steile bovenvacht die een kraag rond de hals vormt. De standaard staat veel effen kleuren toe, zoals oranje, crème, wit, zwart en bruin, maar nooit merle; PetPrep tekent een natuurlijke, ongetrimde vacht.",
        "De FCI noemt zijn karakter gezellig en opgewekt, en de standaard van de Royal Kennel Club noemt hem extravert, levendig en intelligent. De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en vindt hem geschikt voor een appartement; de PDSA zegt dat zijn dubbele vacht twee à drie keer per week moet worden geborsteld. De AKC zegt dat pomeranians meestal beter passen bij gezinnen met oudere kinderen, goed met andere dieren overweg kunnen als ze vroeg gesocialiseerd zijn, en raadt vroege socialisatie en puppycursussen sterk aan. De Royal Kennel Club noemt een levensduur van meer dan 12 jaar.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American gentleman",
      text: [
        "De Boston terrier komt uit de Verenigde Staten. De FCI-standaard beschrijft een levendige, zeer intelligente, gladharige hond met een kort hoofd, compact gebouwd, met een korte staart en goed in balans, gestroomd, seal of zwart en gelijkmatig met wit getekend: een witte band om de snuit, een witte bles tussen de ogen en een witte voorborst zijn verplicht, en gestroomd heeft de voorkeur. PetPrep tekent hem gestroomd met wit, met een gematigde snuit, open neusgaten en natuurlijke oren en staart.",
        "Het is een ras met een platte snuit (brachycefaal), en de PDSA waarschuwt dat hij nooit op het heetst van de dag mag bewegen, omdat hij snel oververhit raakt. De Royal Kennel Club raadt tot een uur beweging per dag aan en één keer per week verzorging, vindt hem geschikt voor een appartement en noemt een levensduur van meer dan 10 jaar. De PDSA noemt Boston terriers perfecte gezinshonden die vooral goed met kinderen omgaan als ze als pup goed gesocialiseerd zijn; de AKC zegt dat ze het goed doen bij kinderen die weten hoe ze voorzichtig met dieren omgaan, dat ze het slecht verdragen om lang alleen te zijn, en raadt vroege socialisatie en puppytraining sterk aan.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini aussie, Mini American, Miniature Australian shepherd",
      text: [
        "De miniature American shepherd komt uit de Verenigde Staten. De FCI-standaard beschrijft een kleine herdershond met een sterk hoed- en waakinstinct, intelligent en in de eerste plaats een werkhond, iets langer dan hoog, met een middellange, steile tot golvende, weerbestendige vacht. De kleuren zijn zwart, blue merle, rood en red merle, met of zonder witte en tan aftekeningen, en de ogen mogen bruin, blauw, hazelnootkleurig of amber zijn. PetPrep tekent hem in blue merle met een natuurlijke staart.",
        "PetMD zegt dat hij veel energie heeft en elke dag minstens één uur beweging nodig heeft, liefst twee, plus taken die zijn hoofd bezighouden, en dat hij een paar keer per week moet worden geborsteld; de AKC zegt dat het grootste deel van het jaar één keer per week borstelen genoeg is, en in de verhaarperiode dagelijks. De AKC zegt dat hij met gehoorzaamheidstraining en vroege socialisatie een geweldige gezinshond kan zijn en meestal goed met kinderen omgaat, maar kan proberen ze te hoeden; PetMD voegt eraan toe dat zijn toewijding aan zijn gezin tot verlatingsangst kan leiden als hij alleen wordt gelaten. PetMD noemt een levensduur van 12 tot 13 jaar.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Korthaar-chihuahua",
      text: [
        "De chihuahua komt uit Mexico. De standaard van de Kennel Club beschrijft een kleine, sierlijke, compacte hond met een brutale uitdrukking en een opgewekt, pittig en intelligent karakter, een goed afgeronde “appelkop”, een vrij korte, licht spits toelopende snuit, grote ronde ogen die niet uitpuilen, grote oren en een sikkelstaart; elke kleur of kleurencombinatie is toegestaan, maar nooit merle, en het gewenste gewicht is 1,8–2,7 kg. De Royal Kennel Club voert de korthaar- en de langhaarchihuahua als twee rassen; PetPrep tekent de korthaar in fawn, met een gematigd hoofd.",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en één keer per week verzorging, vindt hem geschikt voor een appartement en noemt een levensduur van meer dan 12 jaar. De PDSA zegt dat chihuahua’s zo klein en licht zijn dat kinderen ze graag optillen, wat ze waarschijnlijk niet fijn vinden, en dat ze daarom beter passen bij gezinnen met wat oudere kinderen. De PDSA voegt eraan toe dat ze als gezelschapshonden van gezelschap houden en altijd iemand in huis nodig hebben, en dat ze van jongs af aan gesocialiseerd moeten worden met veel verschillende mensen, ervaringen en plekken.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer spaniel, Springer, English springer spaniel",
      text: [
        "De Engelse springer spaniel komt uit Groot-Brittannië, waar hij werd gefokt om wild op te sporen, op te stoten en te apporteren. De standaard van de Kennel Club beschrijft een symmetrisch gebouwde, compacte, sterke, vrolijke en actieve hond – de hoogst gebouwde van de Britse landspaniëls – met een vriendelijk, blij en gehoorzaam karakter, lange bevederde oren, donker hazelnootkleurige ogen en een dichte, steile, weerbestendige vacht; de kleuren zijn lever met wit of zwart met wit, beide met tan aftekeningen, en de schofthoogte is ongeveer 51 cm. PetPrep tekent hem lever met wit, met een natuurlijke staart.",
        "De Royal Kennel Club raadt meer dan 2 uur beweging per dag aan en vaker dan één keer per week verzorging, en noemt een levensduur van meer dan 10 jaar. De PDSA zegt dat springers goede gezinshonden zijn die goed met kinderen en andere huisdieren overweg kunnen, gehoorzaam en leergierig zijn, en één à twee keer per week moeten worden verzorgd plus om de 3 maanden geknipt. De AKC voegt eraan toe dat ze niet lang alleen mogen worden gelaten en dat vroege socialisatie en puppycursussen essentieel zijn.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland collie (vroegere naam)",
      text: [
        "De Shetland sheepdog komt uit Groot-Brittannië en is een kleine, langharige werkhond. De FCI-standaard beschrijft een alerte, zachtaardige, intelligente, sterke en actieve hond, aanhankelijk en trouw aan zijn eigenaar en terughoudend tegenover vreemden, met een hoofd als een lange, stompe wig, kleine oren die half rechtop worden gedragen met naar voren vallende punten en een dubbele vacht met een lange, harde bovenvacht; de kleuren zijn sable, driekleur, blue merle, zwart-wit en black and tan, en de ideale schofthoogte is 37 cm voor reuen en 35,5 cm voor teven. PetPrep tekent hem sable met wit.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en dagelijkse verzorging, en noemt een levensduur van meer dan 10 jaar. De PDSA zegt dat shelties heel zachtaardige, speelse, gehoorzame honden zijn die vaak goed in een gezin passen en blij met kinderen omgaan, en dat training en socialisatie op jonge leeftijd heel belangrijk zijn. De AKC voegt eraan toe dat ze regelmatig mentale en lichamelijke beweging nodig hebben, door hun hoedinstinct het best passen bij oudere kinderen en erom bekendstaan dat ze veel blaffen.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Bretonse spaniël, Brittany",
      text: [
        "De epagneul breton is een staande hond uit Frankrijk. De Royal Kennel Club beschrijft een heel energieke, intelligente hond die jaagt, voorstaat en apporteert, zachtaardig en aanhankelijk maar vol leven en uitbundigheid, met een dichte, vrij fijne vacht, hoog aangezette driehoekige oren en een staart die vaak van nature kort is; de standaardkleuren zijn oranje, lever of zwart met wit, schimmel of driekleur, en de schofthoogte is 48–51 cm voor reuen en 47–50 cm voor teven. PetPrep tekent hem oranje met wit.",
        "De Royal Kennel Club raadt meer dan 2 uur beweging per dag aan en vaker dan één keer per week verzorging, en noemt een levensduur van meer dan 10 jaar. De AKC zegt dat epagneuls bretons energieke honden zijn die veel beweging en mentale uitdaging nodig hebben, zachtaardig zijn en meestal geduldig met kinderen, en dat ze er met een wekelijkse borstelbeurt op hun best uitzien. PetMD voegt eraan toe dat vroege socialisatie van pups een must is, dat ze het slecht verdragen om lang alleen te zijn en dat ze, gefokt voor de vogeljacht, een sterk jachtinstinct hebben.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "American cocker spaniel, Amerikaanse cocker",
      text: [
        "De Amerikaanse cocker spaniel – in de Verenigde Staten gewoon de Cocker Spaniel – is een ander ras dan de Engelse cocker spaniel. De AKC-standaard noemt hem het kleinste lid van de Sporting Group, met lange, lobvormige, rijk bevederde oren, een ronde schedel en een brede, diepe snuit, en een zijdezachte vacht die vlak of licht golvend is; hij komt voor in zwart, in elke effen kleur van het lichtste crème tot het donkerste rood, en in bonte kleuren met wit. De standaard vraagt om een evenwichtig karakter zonder enige schuwheid.",
        "De Royal Kennel Club raadt dagelijkse verzorging aan en meer dan 2 uur beweging per dag, en noemt een levensduur van meer dan 10 jaar; de AKC en PetMD schrijven dat hij niet veel beweging nodig heeft. PetMD noemt deze lieve honden geweldige gezinshonden, vriendelijk tegen mensen en andere dieren, en raadt aan vroeg met socialisatie en training te beginnen; VCA schrijft dat ze meestal heel goed met kinderen omgaan, snel te zwaar worden en elke week hun oren moeten laten controleren.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, Belgische herder (Malinois)",
      text: [
        "De Mechelse herder (malinois) is de kortharige variant van de Belgische herder, een herdershondenras uit België. De FCI-standaard beschrijft een harmonieus gebouwde hond die elegantie en kracht combineert, en staat maar één kleur toe: fawn met zwarte overlay (charbonné) en een zwart masker. De FCI- en AKC-standaarden beschrijven vrij kleine, rechtopstaande, driehoekige oren, een korte, harde vacht met een dichte ondervacht en een alert, intelligent, nieuwsgierig en zelfverzekerd karakter.",
        "De Royal Kennel Club raadt meer dan 2 uur beweging per dag aan en vaker dan één keer per week verzorging, en noemt een levensduur van meer dan 10 jaar. De AKC schrijft dat hij geen goede keus is voor beginnende hondeneigenaren, het best past bij oudere, verantwoordelijke kinderen en niet lang alleen mag worden gelaten; PetMD noemt een sterk jachtinstinct, zegt dat hij kinderen kan proberen te hoeden, en dat hij elke dag consequente training en vroege socialisatie nodig heeft.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "De basset hound is een laagbenige lopende hond uit Groot-Brittannië. De FCI-standaard beschrijft een hond met veel substantie, goed in balans, rustig, nooit agressief of schuw, en aanhankelijk, met laag aangezette, lange, fluweelzachte oren, een gladde, korte vacht en de kleuren zwart-wit-tan of citroen met wit. De Breed Watch van de Royal Kennel Club vraagt keurmeesters te letten op naar binnen of naar buiten gedraaide oogleden, heel lange oren, geïrriteerde huidplooien en overtollige huid.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en één keer per week verzorging, en noemt een levensduur van meer dan 10 jaar. De PDSA beschrijft een verdraagzame hond die heel goed met kinderen overweg kan en van gezelschap houdt, met een gezonde eetlust waar je op moet letten; ze raadt aan de huidplooien elke dag te controleren en tijd te laten tussen eten en bewegen. De AKC voegt eraan toe dat zijn neus hem op een dwaalspoor kan brengen, dus een stevige lijn en omheinde terreinen zijn belangrijk.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Magyar vizsla, Hongaarse staande hond korthaar",
      text: [
        "De Hongaarse vizsla is een middelgrote, elegante jachthond uit Hongarije met een korte, roodgouden vacht. De FCI-standaard beschrijft een levendige, vriendelijke, evenwichtige hond die makkelijk te trainen is en nauw contact houdt met zijn geleider; de kleuren zijn tinten roodgoud en donker zandgoud. De Breed Watch van de Royal Kennel Club noemt geen aandachtspunten die specifiek voor het ras gelden.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en één keer per week verzorging, en noemt een levensduur van meer dan 12 jaar. De PDSA beschrijft een heel mensgerichte hond die van gezelschap houdt en last kan krijgen van verlatingsangst als hij alleen wordt gelaten; hij kan goed overweg met oudere kinderen, maar de PDSA raadt hem niet aan bij heel jonge kinderen of voor beginnende eigenaren, en door zijn sterke jachtinstinct raadt ze af hem samen met kleinere huisdieren te houden. De PDSA adviseert ook tijd te laten tussen eten en bewegen.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker spaniel, Cocker, English cocker spaniel",
      text: [
        "De Engelse cocker spaniel – in Groot-Brittannië gewoon de Cocker Spaniel – is een ander ras dan de Amerikaanse cocker spaniel. De FCI-standaard beschrijft een vrolijke, stevige, sportieve hond, goed in balans en compact, met laag aangezette lobvormige oren en een vlakke, zijdezachte vacht; de AKC-standaard noemt hem vrolijk en aanhankelijk, met een evenwichtig karakter, en noemt effen zwart, lever en tinten rood en daarnaast bonte kleuren met wit. De Breed Watch van de Royal Kennel Club noemt geen aandachtspunten die specifiek voor het ras gelden.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en dagelijkse verzorging, en noemt een levensduur van meer dan 10 jaar; een VetCompass-onderzoek naar Engelse cocker spaniels in het VK kwam uit op een mediane leeftijd bij overlijden van 11,44 jaar. De PDSA zegt dat hij dankzij zijn geduldige karakter meestal goed met kinderen overweg kan, altijd onder toezicht, maar waarschuwt dat hij bekendstaat om verlatingsangst en nooit langer dan vier uur alleen mag worden gelaten. De PDSA adviseert ook dagelijks borstelen en tijd te laten tussen eten en bewegen.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon maltais, Maltezer leeuwtje",
      text: [
        "De maltezer is een dwerghond uit het midden van de Middellandse Zee, die bij de FCI nu onder Italiaans beheer valt. De FCI-standaard beschrijft een kleine hond met een vrij lang lichaam, levendig, aanhankelijk, heel rustig en heel intelligent, met een gewicht van 3–4 kg en heel lang, dicht, zijdezacht haar dat zwaar over het hele lichaam valt. De vacht heeft geen ondervacht, en zuiver wit is de enige kleur (een lichte ivoorkleurige zweem is toegestaan). De Breed Watch van de Royal Kennel Club noemt geen aandachtspunten die specifiek voor het ras gelden.",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en dagelijkse verzorging, zegt dat het ras niet verhaart en noemt een levensduur van meer dan 12 jaar. De PDSA beschrijft een slimme, vriendelijke en aanhankelijke hond die terughoudend kan zijn tegenover vreemden, maar met de juiste socialisatie op jonge leeftijd zelfverzekerd en sociaal kan worden. PetMD waarschuwt dat hij verlatingsangst kan ontwikkelen als hij te lang alleen wordt gelaten, zegt dat contact met jonge kinderen onder toezicht moet gebeuren en raadt aan zijn tanden elke dag te poetsen.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Mops, Pug, Carlin",
      text: [
        "De mopshond is een kleine gezelschapshond uit China, die bij de FCI nu onder Brits beheer valt. De FCI-standaard beschrijft een uitgesproken vierkante, gedrongen hond – “multum in parvo” – met veel charme, waardigheid en intelligentie en een evenwichtig, vrolijk en levendig karakter, een ideaal gewicht van 6,3–8,1 kg, een fijne, gladde, korte en glanzende vacht in zilver, abrikoos, fawn of zwart, en een staart die strak over de heup is gekruld. Ze vraagt om vrij grote, goed geopende neusgaten en vindt dichtgeknepen neusgaten en een zware neusrimpel onaanvaardbaar. De Royal Kennel Club plaatst het ras in Breed Watch-categorie 3, met aandachtspunten zoals ademhalingsproblemen, uitpuilende ogen, huidplooidermatitis en overgewicht.",
        "De PDSA noemt de mopshond een ras met een extreem platte snuit (brachycefaal) dat snel buiten adem raakt, raadt aan beweging in de hitte te vermijden en zegt dat haar dierenartsen sterk zouden aanraden om in plaats daarvan een ras met een normale snuit of een mopshondkruising te kiezen. De Royal Kennel Club raadt tot 1 uur beweging per dag aan en één keer per week verzorging, zegt dat het ras verhaart en noemt een levensduur van meer dan 10 jaar. De PDSA beschrijft een hond die vaak goed met kinderen en andere huisdieren overweg kan, maar dol is op gezelschap en het slecht doet als hij alleen wordt gelaten; PetMD raadt aan de huidplooien in het gezicht elke dag schoon te maken en te drogen en merkt op dat overgewicht vaak voorkomt bij het ras.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Langharige collie, Rough collie",
      text: [
        "De Schotse collie is een grote herdershond uit Groot-Brittannië. De FCI-standaard beschrijft een hond van grote schoonheid die er met onverstoorbare waardigheid bij staat, met een vriendelijk karakter zonder spoor van nervositeit of agressie, een heel dichte vacht met een steile, harde bovenvacht, en drie kleuren: sable, driekleur en blue merle. De standaard van de Royal Kennel Club noemt hem een geweldige gezelschapshond, vriendelijk, vrolijk en actief, goed met kinderen en andere honden, en noemt een schofthoogte van 56–61 cm voor reuen en 51–56 cm voor teven. De Royal Kennel Club plaatst het ras in Breed Watch-categorie 2 en registreert geen pups uit merle-maal-merle-combinaties.",
        "De Royal Kennel Club raadt tot 1 uur beweging per dag aan en dagelijkse verzorging, zegt dat het ras verhaart en noemt een levensduur van meer dan 12 jaar. PetMD zegt dat collies aanhankelijk zijn, vooral met kinderen, en goed met andere dieren omgaan, maar het slecht doen als ze lang alleen zijn en in enkels en hielen kunnen happen als ze opgewonden zijn. PetMD merkt ook op dat socialisatie van de pup cruciaal is en dat de MDR1-mutatie, die bepaalt hoe een hond bepaalde geneesmiddelen verwerkt, bij collies voorkomt.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "Engelse mastiff, Old English mastiff",
      text: [
        "De mastiff is een heel groot waakhondenras uit Groot-Brittannië. De FCI-standaard beschrijft een combinatie van grandeur en moed – rustig, aanhankelijk tegenover zijn eigenaren maar in staat om te waken – met een vierkant ogend hoofd, een breed, diep en krachtig lichaam en een korte, dicht aanliggende vacht in abrikoos, fawn of gestroomd. De PDSA noemt een gemiddelde schofthoogte van 71–78 cm en een gemiddeld gewicht van 80–85 kg en merkt op dat de Kennel Club de mastiff in categorie 3 plaatst: rassen met zichtbare problemen in de lichaamsbouw die pijn, ongemak of gezondheidsproblemen kunnen veroorzaken.",
        "De PDSA raadt voor volwassen honden ongeveer een uur beweging per dag aan – maar niet te veel bewegen zolang de botten en gewrichten van een pup nog in ontwikkeling zijn – en één keer per week verzorging met dagelijks schoonmaken van de rimpels in het gezicht, en noemt een gemiddelde levensduur van minder dan 10 jaar. PetMD noemt mastiffs geweldige gezinshonden voor gezinnen met kinderen die weten hoe ze met huisdieren omgaan, al misschien niet bij peuters of baby’s vanwege hun grootte; ze kunnen meestal goed overweg met andere huisdieren die ze als pup hebben leren kennen, kwijlen veel, en mogen vanwege het risico op maagtorsie een uur voor en na de maaltijd niet bewegen.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba, Japanse shiba inu",
      text: [
        "De shiba inu is een kleine spits uit Japan; zijn naam betekent “kleine hond”, en volgens de Royal Kennel Club werd hij gefokt om op klein vederwild te jagen. De FCI-standaard beschrijft een kleine, evenwichtige hond met goede botten, een trouw karakter, scherpe zintuigen en grote alertheid, een harde bovenvacht over een zachte, dichte ondervacht, kleine staande driehoekige oren en een dikke krulstaart; de kleuren zijn rood, black and tan en sesam, altijd met witachtige “urajiro”-aftekeningen op de wangen, de borst en de onderkant. De AKC-standaard noemt een gemiddeld gewicht van ongeveer 23 pond (10 kg) voor reuen en 17 pond (8 kg) voor teven.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en één keer per week verzorging, merkt op dat het ras verhaart en noemt een levensduur van meer dan 10 jaar; een groot Brits onderzoek kwam uit op een mediane levensduur van 14,6 jaar. De AKC beschrijft een zelfverzekerde, zelfstandige hond die beter past bij een ervaren eigenaar, het gelukkigst is met oudere kinderen en buiten een omheind of afgesloten terrein nooit los mag lopen. PetMD voegt eraan toe dat hij veel mentale uitdaging nodig heeft, baat heeft bij socialisatie als pup en dat zijn tanden elke dag moeten worden gepoetst.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, Afrikaanse leeuwenhond",
      text: [
        "De Rhodesian ridgeback komt uit zuidelijk Afrika. Zijn bekendste kenmerk is de ridge op zijn rug, een strook haar die tegen de rest van de vacht in groeit. De FCI-standaard beschrijft een evenwichtige, sterke, gespierde, wendbare en actieve hond die waardig, intelligent en afstandelijk tegenover vreemden is, vooral gewaardeerd als waakhond en gezinshond. De korte, dichte vacht is licht tarwekleurig tot rood tarwekleurig, en de standaard noemt een gewicht van ongeveer 36,5 kg voor reuen en 32 kg voor teven.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en één keer per week verzorging, merkt op dat het ras verhaart en past bij een groot huis met een grote tuin, en noemt een levensduur van meer dan 10 jaar. De PDSA beschrijft speelse, krachtige en heel trouwe honden met een heel sterk jachtinstinct die niet worden aangeraden voor beginnende eigenaren, nooit langer dan vier uur alleen mogen worden gelaten en van jongs af aan moeten worden gesocialiseerd; ze adviseert ook tijd te laten tussen eten en bewegen. Woodgreen voegt eraan toe dat ze het best passen bij oudere kinderen.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Continentale dwergspaniël, Phalène (variant met hangoren), Vlinderhondje",
      text: [
        "De papillon is de variant met staande oren van de continentale dwergspaniël, een ras uit België en Frankrijk; de variant met hangoren heet phalène. De FCI-standaard beschrijft een kleine, elegante dwergspaniël met lang haar en een levendige persoonlijkheid, ongeveer 28 cm hoog en tot 4,5 kg zwaar voor reuen en 5 kg voor teven. Zijn grote oren worden gedragen als de gespreide vleugels van een vlinder, en de vacht is altijd wit met gekleurde vlekken.",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en vaker dan één keer per week verzorging, merkt op dat het ras verhaart en in een appartement kan wonen, en noemt een levensduur van meer dan 12 jaar. De PDSA beschrijft zachtaardige, speelse, heel gehoorzame honden die met iedereen goed overweg kunnen en op jonge leeftijd training en socialisatie nodig hebben; ze stelt voor ze twee à drie keer per week te verzorgen. PetMD voegt eraan toe dat papillons elke dag mentale uitdaging nodig hebben, verlatingsangst kunnen ontwikkelen en dat hun tanden elke dag moeten worden gepoetst, en dat heel jonge kinderen zo’n kleine hond per ongeluk kunnen bezeren.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de água português, Portie",
      text: [
        "De Portugese waterhond komt uit Portugal, waar hij met vissers werkte. De standaard van de Royal Kennel Club beschrijft een robuuste, bijna vierkante, heel gespierde hond – heel intelligent en enorm energiek, met grote zwem- en duikvaardigheden – met een schofthoogte van 50–57 cm (reuen) en 43–52 cm (teven) en een gewicht van 19–25 kg (reuen) en 16–22 kg (teven). Zijn overvloedige enkele vacht heeft geen ondervacht en komt voor in zwart, wit, bruin, of zwart of bruin met wit; bij de traditionele leeuwenknip blijven de snuit en het achterlijf kort.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en dagelijkse verzorging, merkt op dat het ras niet verhaart en past bij een groot huis, en noemt een levensduur van meer dan 10 jaar. De PDSA beschrijft heel vriendelijke, liefdevolle honden die goed met andere huisdieren overweg kunnen, uitstekende gezinshonden zijn en op jonge leeftijd training en socialisatie nodig hebben; ze noemt daarnaast het knippen en in model brengen door een professionele trimmer in de loop van het jaar.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon, Bichon tenerife",
      text: [
        "De bichon frisé is een Frans-Belgische gezelschapshond. De FCI-standaard beschrijft een opgewekt hondje met een levendige gang en heel los, wit haar met kurkentrekkerkrullen – een echte metgezel die je overal mee naartoe kunt nemen, niet nerveus en geen vaste blaffer – met een schofthoogte van 25–29 cm en een gewicht van ongeveer 5 kg. Een volwassen bichon is altijd zuiver wit, met heel donkere ronde ogen, een zwarte neus, hangende oren en een gepluimde staart die over de rug wordt gedragen.",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en dagelijkse verzorging, merkt op dat het ras niet verhaart en in een appartement past, en noemt een levensduur van meer dan 12 jaar. De PDSA beschrijft heel aanhankelijke, liefdevolle honden die uitstekend met kinderen en andere huisdieren omgaan, en voegt eraan toe dat de vacht om de paar maanden moet worden geknipt, vaak door een professionele trimmer.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfie",
      text: [
        "De newfoundlander komt uit Canada; de FCI rekent hem tot de molossers van het berghondtype en erkent drie kleuren: zwart, wit met zwart (landseer) en bruin. De PDSA noemt newfies zachtaardige reuzen en geeft een gemiddelde schofthoogte van 66–71 cm en een gemiddeld gewicht van 50–69 kg; PetMD voegt eraan toe dat ze door de geschiedenis van het ras geboren zwemmers zijn.",
        "De PDSA raadt voor volwassen honden minstens een uur beweging per dag aan, maar pups niet te veel laten bewegen zolang hun botten en gewrichten nog in ontwikkeling zijn; ze noemt verzorging een dagelijkse taak, merkt op dat newfies vaak kwijlen en noemt een levensduur van minder dan 10 jaar. PetMD noemt het ras een uitstekende gezinshond die goed met kinderen, kleine huisdieren en andere honden overweg kan, raadt aan kleine kinderen bij elke hond onder toezicht te houden, en waarschuwt dat sommige newfies verlatingsangst kunnen ontwikkelen als ze alleen worden gelaten.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Koetshond, Brandweerhond",
      text: [
        "De dalmatiër komt uit Kroatië; de FCI rekent hem tot de rassen die verwant zijn aan lopende honden. Zijn korte, glanzende vacht is zuiver wit met duidelijk afgetekende zwarte of leverkleurige (bruine) vlekken, en de standaard vraagt om gevlekte oren. De FCI noemt een schofthoogte van 56–62 cm voor reuen en 54–60 cm voor teven; de PDSA noemt een gemiddeld gewicht van 18–27 kg.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en één keer per week borstelen, en zegt dat het ras verhaart en past bij een groot huis met tuin. De PDSA noemt dalmatiërs geweldige huisdieren voor actieve huishoudens die beter passen bij oudere kinderen, gezelschap nodig hebben en nooit langer dan vier uur alleen mogen worden gelaten; ze noemt doofheid als een van de gezondheidsproblemen van het ras en merkt op dat er een BAER-gehoortest bestaat.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue heeler, Red heeler, Queensland heeler, Cattle dog",
      text: [
        "De Australian cattle dog komt uit Australië; de FCI rekent hem tot de veedrijvers. De standaard van de Kennel Club beschrijft een sterke, compacte werkhond met een gladde, weerbestendige dubbele vacht in blauw (gevlekt of gespikkeld) of gelijkmatig rood gespikkeld, en noemt een schofthoogte van 46–51 cm voor reuen en 43–48 cm voor teven; de PDSA noemt een gemiddeld gewicht van 16–20 kg.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en één keer per week borstelen, en zegt dat het ras verhaart. De PDSA beschrijft een zeer intelligente, energieke hond die veel lichamelijke en mentale activiteit nodig heeft; door zijn sterke hoedinstinct kan hij in de hielen van rennende kinderen happen, en socialisatie en training op jonge leeftijd helpen.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "De whippet komt uit Groot-Brittannië; de FCI rekent hem tot de kortharige windhonden. De standaard van de Kennel Club beschrijft een evenwichtige combinatie van spierkracht en sterkte met elegantie en een sierlijk silhouet, een fijne, korte, dicht aanliggende vacht in elke kleur of kleurencombinatie behalve merle, en een zachtaardig, aanhankelijk, evenwichtig karakter; ze noemt een schofthoogte van 47–51 cm voor reuen en 44–47 cm voor teven, en de PDSA noemt een gemiddeld gewicht van 11–18 kg.",
        "De PDSA raadt elke dag minstens een uur beweging aan, met kansen om los te rennen op een veilig afgesloten terrein, en één keer per week borstelen met een zachte borstel. Ze noemt whippets een populaire keus voor gezinnen omdat ze rustig en zachtaardig zijn bij kinderen, maar raadt een gezin met wat oudere kinderen aan; whippets zijn niet graag alleen en hebben een heel sterk jachtinstinct, dus de PDSA raadt af ze samen met kleinere huisdieren te houden. Een jasje kan in de winter helpen, en een dik, zacht bed beschermt hun botten, die ver uitsteken.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Griffon Korthals, Draadharige staande griffon Korthals, Griff",
      text: [
        "De Korthals griffon komt uit Frankrijk; de FCI rekent hem tot de continentale staande honden en noemt hem in de eerste plaats een veelzijdige staande hond. De FCI-standaard beschrijft een krachtige, rustieke hond die langer is dan hoog, met een harde, ruwe vacht die nooit krullend of wollig is, een neus die altijd bruin is, en bij voorkeur een staalgrijze vacht met bruine (leverkleurige) platen; ze noemt een schofthoogte van ongeveer 55–60 cm voor reuen en 50–55 cm voor teven en noemt het ras zachtaardig, fier en heel lief voor kinderen. PetMD noemt een gewicht van 35–70 pond (ongeveer 16–32 kg).",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan, een groot huis met een grote tuin, en vaker dan één keer per week verzorging. PetMD adviseert één keer per week borstelen (sommige honden moeten ook met de hand worden getrimd), zegt dat griffons meestal geduldig en zachtaardig met kinderen zijn als ze als pup gesocialiseerd zijn, en merkt op dat ze door hun jachtverleden een sterk jachtinstinct kunnen hebben, zodat kleinere dieren zoals katten en konijnen er voor hen uit kunnen zien als iets om achterna te zitten.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie",
      text: [
        "De Chesapeake Bay retriever, vaak chessie genoemd, komt uit de Verenigde Staten; de FCI rekent hem tot de retrievers. De FCI-standaard beschrijft een werkende retriever die op het land en in het water even bekwaam is, waarvan grootte en substantie niet overdreven mogen zijn, met een dikke, korte vacht over een dichte, wollige ondervacht en heldere geelachtige of amberkleurige ogen; elke tint bruin, zegge of doodgras is toegestaan, en een zwarte vacht leidt tot diskwalificatie. Ze noemt een schofthoogte van 58–66 cm en een gewicht van 29,5–36,5 kg voor reuen, en 53–61 cm en 25–32 kg voor teven.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan, een groot huis met een grote tuin, en één keer per week verzorging. PetMD beschrijft een slimme, opgewekte en uiterst aanhankelijke hond die destructief kan worden als hij niet wordt uitgedaagd of te lang alleen wordt gelaten, zegt dat chessies met een goede kennismaking en socialisatie een geweldige aanwinst voor een gezin zijn, en raadt af de hond vlak voor of na het eten te laten bewegen.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Samojeedse hond, Samoyed, Sammy",
      text: [
        "De samojeed komt uit het noorden van Rusland en Siberië; de FCI rekent hem tot de noordse sledehonden. De FCI-standaard beschrijft een witte, elegante poolspits van gemiddelde grootte met een overvloedige, dikke, dichte poolvacht, donkerbruine ogen, kleine, dikke, rechtopstaande oren en lippen die bij de mondhoeken iets omhoog krullen in de typische “samojeedse glimlach”; de vacht is zuiver wit, crème of wit met biscuit, en blauwe of verschillend gekleurde ogen leiden tot diskwalificatie. Ze noemt een ideale schofthoogte van 57 cm voor reuen en 53 cm voor teven, elk met een marge van 3 cm.",
        "De PDSA raadt elke dag minimaal twee uur beweging en dagelijkse verzorging aan, zegt dat samojeden heel vaak verharen, meestal geweldig met kinderen zijn en trouw aan het hele gezin, nooit langer dan vier uur alleen mogen worden gelaten, als echte ontsnappingskunstenaars een heel goed afgesloten tuin nodig hebben en een sterk jachtinstinct hebben, en adviseert tijd te laten tussen eten en bewegen. PetMD voegt eraan toe dat samojeden slecht tegen hoge temperaturen kunnen.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Aberdeen terrier, Schotse terriër",
      text: [
        "De Scottish terrier, vaak scottie genoemd, komt uit Groot-Brittannië; de FCI rekent hem tot de kleine terriërs. De standaard van de Kennel Club beschrijft een gedrongen, laagbenige hond met een alerte houding die veel kracht en activiteit in een klein formaat doet vermoeden, loyaal en trouw, waardig, zelfstandig en terughoudend, maar moedig en zeer intelligent – dapper, maar nooit agressief. Zijn dicht aanliggende dubbele vacht heeft een harde, draadachtige bovenvacht; de kleur is zwart, tarwekleurig of gestroomd in elke tint. Ze noemt een schofthoogte van 25–28 cm en een gewicht van 8,5–10,5 kg.",
        "De PDSA zegt dat scotties ongeveer een uur beweging per dag nodig hebben en dagelijkse verzorging, met om de twee à drie maanden trimmen en knippen door een professionele trimmer, beschrijft ze als trouw en toegewijd aan hun gezin, en zegt dat ze koppig kunnen zijn, zodat training geduld en inzet vraagt. PetMD zegt dat ze met de juiste training en socialisatie goede gezinshonden kunnen zijn, dat socialisatie van de pup belangrijk is en dat ze niet lang alleen mogen worden gelaten.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimarse staande hond, Weim",
      text: [
        "De weimaraner komt uit Duitsland; de FCI rekent hem tot de continentale staande honden en erkent een kortharige en een langharige variant. De FCI-standaard beschrijft een middelgrote tot grote jachthond van functioneel werktype, pezig en heel gespierd, met amberkleurige ogen en brede, vrij lange oren; de vacht is zilver-, ree- of muisgrijs, alleen kleine witte aftekeningen op de borst en de tenen zijn toegestaan, en elke andere kleur dan grijs leidt tot diskwalificatie. Ze noemt een schofthoogte van 59–70 cm en een gewicht van ongeveer 30–40 kg voor reuen, en 57–65 cm en ongeveer 25–35 kg voor teven.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan, een groot huis met een grote tuin, en één keer per week verzorging. De PDSA zegt dat weimaraners in de juiste handen geweldige gezinshonden zijn en het best passen bij eigenaren die het ras kennen, maar raadt ze door hun heel sterke jachtinstinct niet aan voor gezinnen met jongere kinderen of kleinere huisdieren, zegt dat ze verlatingsangst kunnen ontwikkelen als ze alleen worden gelaten, en adviseert ze van jongs af aan te socialiseren en tijd te laten tussen eten en bewegen. PetMD noemt daarnaast maandelijks de oren schoonmaken en een maandelijks bad.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo levriero italiano, Italian greyhound, Iggy",
      text: [
        "Het Italiaanse windhondje komt uit Italië; de FCI voert het als Piccolo Levriero Italiano bij de kortharige windhonden. De standaard van de Kennel Club beschrijft een greyhound in miniatuur, in alle verhoudingen slanker, elegant, sierlijk en snel, intelligent, aanhankelijk en levendig, al kan het afstandelijk lijken, met een korte, fijne, glanzende vacht over een dunne huid. Ze noemt een schofthoogte van 32–38 cm en een gewicht van 3,6–4,5 kg; zwart, blauw, crème, fawn, rood en wit, of een van deze kleuren onderbroken met wit, zijn toegestaan – nooit merle, gestroomd of tan aftekeningen.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en zegt dat het ras past bij een klein huis, in de stad of op het platteland, één keer per week verzorging nodig heeft en niet verhaart. De PDSA zegt dat Italiaanse windhondjes vol energie zitten, op een afgesloten terrein moeten bewegen omdat ze moeilijk terug te roepen zijn als ze een prooi zien, schuw kunnen zijn zodat vroege socialisatie essentieel is, en – omdat hun botten tijdens de groei breekbaar zijn – misschien niet het ideale ras zijn voor gezinnen met jonge kinderen of andere huisdieren. PetMD voegt eraan toe dat hun dunne vacht ze niet warm houdt, zodat ze snel last hebben van kou.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer",
      text: [
        "De reuzenschnauzer komt uit Duitsland; de FCI voert hem als Riesenschnauzer bij de pinschers en schnauzers. De standaard van de Royal Kennel Club beschrijft een krachtig gebouwde, robuuste, pezige hond die er bijna vierkant uitziet, dapper, betrouwbaar, goedaardig en beheerst, met een harde, draadachtige bovenvacht en een goede ondervacht. Ze noemt een schofthoogte van 65–70 cm voor reuen en 60–65 cm voor teven; de FCI-standaard noemt een gewicht van 35–47 kg. Effen zwart, peper-en-zout met een donker masker en zwart-zilver zijn toegestaan – andere kleuren niet.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en zegt dat het ras past bij een groot huis met een grote tuin, dagelijkse verzorging nodig heeft en niet verhaart. De PDSA zegt dat de vacht dagelijkse verzorging en regelmatig trimmen nodig heeft, dat reuzenschnauzers lieve huisdieren kunnen zijn voor gezinnen met oudere kinderen als ze als pup goed gesocialiseerd zijn, en dat deze eigenzinnige honden passen bij ervaren eigenaren. PetMD voegt eraan toe dat de vacht om de paar maanden professioneel met de hand wordt getrimd en dat het ras het slecht doet in huishoudens waar mensen weinig thuis zijn.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Bloodhound, Sint-Hubertushond, Chien de Saint-Hubert",
      text: [
        "De bloedhond komt uit België, waar de FCI hem voert als Chien de Saint-Hubert, een grote lopende hond. De FCI-standaard beschrijft de krachtigste van alle lopende honden: zachtaardig, rustig, vriendelijk en sociaal met mensen en bijzonder gehecht aan zijn eigenaar, met een korte, dichte, weerbestendige vacht en een soepele, losse huid. Reuen wegen ongeveer 46–54 kg en teven ongeveer 40–48 kg; de drie kleuren zijn black and tan, lever met tan, en rood.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en zegt dat het ras past bij een groot huis met een grote tuin, één keer per week verzorging nodig heeft en verhaart. De PDSA zegt dat bloedhonden beter passen bij ervaren eigenaren, door hun grootte en heel sterke jachtinstinct niet worden aangeraden voor gezinnen met jongere kinderen of kleinere huisdieren, kwijlen, en dat hun huidplooien schoon en droog moeten worden gehouden. Ze adviseert ook tijd te laten tussen eten en bewegen.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita, American akita, Grote Japanse hond",
      text: [
        "De akita in dit register is het Amerikaanse type: de FCI voert hem als de Amerikaanse akita, een ras van Japanse oorsprong, los van de Japanse akita inu. De FCI-standaard beschrijft een grote, stevig gebouwde, evenwichtige hond met veel substantie en zware botten, kleine rechtopstaande oren en een grote staart die over de rug wordt gedragen; reuen hebben een schofthoogte van 66–71 cm. Elke kleur is toegestaan, zoals rood, fawn, wit, pinto of gestroomd. De PDSA noemt een gemiddeld gewicht van 31–59 kg.",
        "De PDSA beschrijft ongelooflijk trouwe gezinshonden die zelfstandig en heel groot zijn, zodat ze het best passen bij ervaren eigenaren; ze zou een akita niet aanraden voor een gezin met jonge kinderen en raadt af ze alleen te laten, omdat veel akita’s daar slecht mee overweg kunnen. Ze raadt elke dag minstens twee uur beweging aan, socialisatie van jongs af aan, tijd tussen eten en bewegen, en minstens één keer per week borstelen – akita’s verharen flink. Ze noemt ook een sterk jachtinstinct en dat ze bij heel warm weer oververhit kunnen raken.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Corgi, Cardigan Welsh corgi, Cardi",
      text: [
        "De Welsh corgi cardigan komt uit Groot-Brittannië; de FCI rekent hem tot de veedrijvers. De standaard van de American Kennel Club noemt een schofthoogte van 10,5–12,5 inch (ongeveer 27–32 cm) en een ideaal gewicht van 30–38 pond (ongeveer 14–17 kg) voor reuen. Anders dan zijn neef de pembroke heeft hij een lange, volle staart.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan, noemt een klein huis met een kleine of middelgrote tuin voldoende en zegt dat het ras vaker dan één keer per week verzorging nodig heeft en verhaart; ze noemt een levensduur van meer dan 12 jaar en voert de cardigan als kwetsbaar inheems Brits ras. De PDSA zegt dat Welsh corgi’s graag willen behagen, zodat de training vrij makkelijk moet gaan, dat twee à drie borstelbeurten per week meestal genoeg zijn, en dat ze in de hielen van rennende kinderen kunnen happen – socialisatie met kinderen en training op jonge leeftijd helpen.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Duitse draadhaar, Drahthaar, Deutsch Drahthaar",
      text: [
        "De Duitse staande hond draadhaar komt uit Duitsland; de FCI voert hem als Deutsch Drahthaar bij de continentale staande honden. De standaard van de Royal Kennel Club beschrijft een middelgrote jachthond met draadhaar dat de huid volledig bedekt – zachtaardig, aanhankelijk en evenwichtig, alert, gehoorzaam en heel trouw. Reuen hebben een schofthoogte van 60–67 cm en wegen 25–34 kg; teven hebben een schofthoogte van 56–62 cm en wegen 20,5–29 kg. Lever met wit, effen lever en zwart met wit zijn de standaardkleuren.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en zegt dat hij past bij een groot huis met een grote tuin op het platteland, vaker dan één keer per week verzorging nodig heeft en verhaart. PetMD zegt dat Duitse draadharen veel beweging en mentale uitdaging nodig hebben, een sterke band met hun gezin opbouwen en geweldige gezinshonden kunnen zijn als ze vroeg getraind en gesocialiseerd worden, het goed doen bij kinderen die hebben geleerd hoe ze met dieren omgaan, nooit lang alleen mogen worden gelaten en een sterk jachtinstinct hebben. De vacht wordt twee keer per jaar met de hand getrimd.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "Sint Bernard, Bernhardiner, Saint Bernard",
      text: [
        "De sint-bernard komt uit Zwitserland; de FCI voert hem als St. Bernhardshund bij de molossers van het berghondtype. De FCI-standaard beschrijft een hond die van nature vriendelijk is, rustig tot levendig en waakzaam, en erkent twee varianten: kortharig, met een dichte, gladde, dicht aanliggende vacht, en langharig. Reuen hebben een schofthoogte van minstens 70 cm en teven van minstens 65 cm, tot 90 en 80 cm; de PDSA noemt een gewicht van 54–81 kg.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en zegt dat het ras past bij een groot huis met een grote tuin, vaker dan één keer per week verzorging nodig heeft, verhaart en meestal minder dan tien jaar oud wordt. De PDSA zegt dat sint-bernards graag bij een gezin zijn, geweldig omgaan met mensen van alle leeftijden (ook kinderen), als pup goed gesocialiseerd moeten worden, minstens drie keer per week moeten worden geborsteld, kwijlen, minder goed tegen hitte kunnen en tijd nodig hebben tussen eten en bewegen. PetMD voegt eraan toe dat deze mensgerichte honden verlatingsangst kunnen ontwikkelen als ze lang alleen worden gelaten.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "De Staffordshire bull terrier komt uit Groot-Brittannië; de FCI rekent hem tot de terriërs van het bulltype. De FCI-standaard beschrijft een gladharige, evenwichtige hond met veel kracht voor zijn formaat – van oudsher met onverzettelijke moed en vasthoudendheid, zeer intelligent en aanhankelijk, vooral met kinderen. Hij heeft een schofthoogte van 35,5–40,5 cm; reuen wegen 12,7–17 kg en teven 11–15,4 kg. Hij komt voor in gestroomd, rood, fawn, zwart, blauw of wit, effen of met wit.",
        "De Royal Kennel Club noemt hem een geweldige gezinshond en raadt tot een uur beweging per dag aan; hij heeft één keer per week verzorging nodig, verhaart en wordt meestal ouder dan 12 jaar. De PDSA zegt dat staffies verdraagzaam en lief zijn voor kinderen, maar dat ze als mensgerichte honden bekendstaan om verlatingsangst als ze alleen worden gelaten, graag knagen, en dat kleinere huisdieren in hun buurt door hun heel sterke jachtinstinct geen goed idee zijn.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Airedale, Koning der terriërs",
      text: [
        "De Airedale terrier komt uit Groot-Brittannië; de FCI rekent hem tot de grote en middelgrote terriërs. De FCI-standaard noemt hem de grootste van de terriërs – een gespierde, actieve, vrij gedrongen hond die extravert en zelfverzekerd is, vriendelijk, moedig en intelligent, altijd alert, niet agressief maar onbevreesd. Reuen hebben een schofthoogte van ongeveer 58–61 cm en teven van ongeveer 56–59 cm. Zijn harde, dichte, draadachtige vacht is tan met een zwart of grijs gemêleerd zadel.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan; de vacht heeft dagelijkse verzorging nodig en verhaart niet, en het ras wordt meestal ouder dan 10 jaar. PetMD beschrijft geweldige gezinshonden die, als ze goed getraind zijn, meestal goed met kinderen overweg kunnen, maar niet te lang aan hun lot mogen worden overgelaten; PetMD adviseert een paar keer per week borstelen, elke week even de oren schoonmaken en drie à vier keer per jaar een trimbeurt bij een professionele trimmer.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, Russell terrier",
      text: [
        "De Jack Russell terrier – de American Kennel Club noemt hem Russell Terrier – komt uit Engeland en werd in Australië verder ontwikkeld; de FCI rekent hem tot de kleine terriërs. De standaard beschrijft een sterke, actieve, lenige werkterriër met veel karakter: levendig, alert en actief, moedig en onbevreesd, vriendelijk maar rustig zelfverzekerd. Hij heeft een schofthoogte van 25–30 cm en weegt ongeveer 5–6 kg. Zijn gladde, gebroken of ruwe vacht is overwegend wit met zwarte en/of tan aftekeningen.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en één keer per week verzorging; het ras verhaart en wordt meestal ouder dan 10 jaar. De PDSA beschrijft slimme, levendige honden die goede gezinshonden kunnen zijn als ze van jongs af aan getraind en gesocialiseerd worden, maar beter passen bij gezinnen met wat oudere kinderen; ze hebben een heel sterk jachtinstinct, dus kleinere huisdieren worden niet aangeraden, en ze graven dolgraag.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull mastiff",
      text: [
        "De bullmastiff is een oud Engels waakhondenras uit de 19e eeuw, afkomstig van de bulldog en de Old English mastiff; de FCI rekent hem tot de molossers. De standaard beschrijft een krachtige, symmetrische hond die veel kracht laat zien maar niet log is – met uithoudingsvermogen, actief, betrouwbaar, levenslustig, alert en trouw. Reuen hebben een schofthoogte van 64–69 cm en wegen 50–59 kg, teven 61–66 cm en 41–50 kg. De korte, harde vacht is fawn, rood of gestroomd in elke tint, altijd met een zwarte snuit.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en één keer per week verzorging, en het ras wordt meestal minder dan 10 jaar oud. De PDSA beschrijft heel trouwe honden die door hun grootte en kracht beter passen bij huishoudens met alleen volwassenen of gezinnen met oudere kinderen; ze hebben vroege socialisatie nodig, willen het liefst altijd iemand thuis hebben, hebben een heel sterk jachtinstinct, kwijlen veel en hebben tijd nodig tussen eten en bewegen.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese crested, Chinese kuifhond, Powder puff",
      text: [
        "De Chinese naakthond is een kleine, actieve en sierlijke gezelschapshond uit China; de FCI rekent hem tot de naakthonden. Hij bestaat in twee varianten: de naakte, met een glad, kaal lichaam en alleen haar op het hoofd (de kuif), de voeten en de staart, en de powder puff, die helemaal bedekt is met een sluier van lang zacht haar. Reuen hebben een schofthoogte van 28–33 cm en teven van 23–30 cm; PetMD noemt een gewicht van 8–12 pond (3,6–5,4 kg). Elke kleur is toegestaan behalve merle, en zijn karakter wordt beschreven als vrolijk, nooit kwaadaardig.",
        "De Royal Kennel Club raadt tot 30 minuten beweging per dag aan en één keer per week verzorging; hij past in een appartement, en het ras wordt meestal ouder dan 12 jaar. PetMD beschrijft een vriendelijke hond die in de meeste gezinnen past, ook met kinderen en andere huisdieren – elk contact met kinderen moet onder toezicht gebeuren. De kale huid moet worden beschermd tegen zon en kou, de nagels moeten elke week worden gecontroleerd, en pups hebben vroege, consequente socialisatie nodig.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, Nova Scotia retriever",
      text: [
        "De Nova Scotia duck tolling retriever – de toller – is een retriever uit Canada; de FCI-standaard beschrijft hoe hij langs de oever rent en speelt, goed zichtbaar voor de eenden, om ze naar zich toe te lokken, en daarna wordt uitgestuurd om de vogels te apporteren. De standaard beschrijft een middelgrote, krachtige, compacte en goed gespierde hond die zeer intelligent is, makkelijk te trainen en een groot uithoudingsvermogen heeft. De FCI noemt voor reuen 48–51 cm en 20–23 kg, voor teven 45–48 cm en 17–20 kg. De waterafstotende dubbele vacht heeft verschillende tinten rood of oranje, meestal met wit op de staartpunt, de voeten, de borst of als bles.",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en vaker dan één keer per week verzorging, en het ras verhaart; PetMD adviseert één à twee keer per week borstelen. Een groot Brits onderzoek (McMillan 2024, via Dogs Trust) noemt een mediane levensverwachting van 13,2 jaar, PetMD 12–14 jaar, en zoals andere middelgrote honden is hij volgroeid op ongeveer 12–15 maanden (PetMD). De AKC beschrijft heel aanhankelijke honden die meestal goed met kinderen omgaan, veel lichaamsbeweging en mentale uitdaging nodig hebben, bij kleinere dieren een sterk jachtinstinct kunnen hebben en baat hebben bij vroege socialisatie en puppycursussen.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn",
      text: [
        "De cairn terrier komt uit Groot-Brittannië; de FCI rekent hem tot de kleine terriërs. De standaard van de Kennel Club beschrijft een wendbare, alerte terriër met een werkhondachtig, natuurlijk uiterlijk – actief, onverschrokken en gehard, met een onbevreesd en vrolijk karakter, assertief maar niet agressief. Zijn weerbestendige dubbele vacht heeft een overvloedige, harde bovenvacht; de kleur is crème, tarwekleurig, rood, grijs of bijna zwart, gestroomd is toegestaan, en donkere oren en snuit zijn typisch. Ze noemt een schofthoogte van ongeveer 28–31 cm en een ideaal gewicht van 6–7,5 kg.",
        "De PDSA raadt minstens een uur beweging per dag aan en zegt dat cairns grenzeloos veel energie en een sterk jachtinstinct hebben, zodat ze vroeg aan katten en andere kleine huisdieren moeten wennen en loslopen voorzichtigheid vraagt, en dat ze, eenmaal gesocialiseerd, heel goed met kinderen overweg kunnen en uitstekende gezinshonden zijn. Ze adviseert de vacht twee keer per jaar met de hand te trimmen en één à twee keer per week verzorging; Dogs Trust zegt dat ze heel weinig verharen. Een groot Brits onderzoek (McMillan 2024, via Dogs Trust) noemt een mediane levensverwachting van 14,0 jaar, PetMD 13–15 jaar, en zoals andere kleine honden is hij volgroeid op ongeveer 9–12 maanden (PetMD). PetMD voegt eraan toe dat ze veel beweging en mentale uitdaging nodig hebben.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bullterriër, Engelse bull terrier, Bully",
      text: [
        "De bull terrier komt uit Groot-Brittannië; de FCI rekent hem tot de terriërs van het bulltype (groep 3). Het is een middelgrote, kortharige terriër: de PDSA noemt een gemiddelde schofthoogte van 51–61 cm en een gemiddeld gewicht van 22–31 kg, en PetMD beschrijft een atletische bouw van ongeveer 21–22 inch en 50–70 pond. PetMD noemt regelmatige beweging een must en zegt dat bull terriers aanhankelijk zijn tegenover hun gezin, ook tegenover kinderen, maar niet altijd vriendelijk tegenover andere honden of katten, en dat vroege en frequente socialisatie en training essentieel zijn.",
        "De PDSA raadt minstens een uur beweging per dag aan, verdeeld over de dag, en tijd na de maaltijd voordat hij beweegt. Ze zegt dat een goed gesocialiseerde bull terrier met mensen van alle leeftijden overweg kan, maar omdat hij wat snel opgewonden raakt beter past bij oudere kinderen; hij houdt van zoveel mogelijk gezelschap en heeft een sterk jachtinstinct, dus voorzichtigheid is nodig bij katten en andere kleine dieren. Eén keer per week borstelen is genoeg voor de vacht. De PDSA noemt een gemiddelde levensduur van meer dan 10 jaar en PetMD 12–13 jaar; zoals andere middelgrote honden is hij volgroeid op ongeveer 12–15 maanden (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Zwergpinscher, Min pin",
      text: [
        "De dwergpinscher komt uit Duitsland; de FCI rekent hem tot de pinschers en schnauzers (groep 2) en beschrijft hem als een verkleinde versie van de Duitse pinscher – levendig, pittig, zelfverzekerd en evenwichtig. Zijn vacht is kort, dicht, glad en glanzend, effen hertrood tot donker roodbruin of black and tan, en zijn staart is natuurlijk. De FCI-standaard noemt voor reuen en teven een schofthoogte van 25–30 cm en een gewicht van 4–6 kg; zoals andere dwerghonden is hij volgroeid op ongeveer 8–12 maanden (PetMD).",
        "De PDSA raadt tot een half uur beweging per dag aan voor deze energieke, drukke hondjes, zegt dat één keer per week borstelen meestal genoeg is voor de vacht, en merkt op dat ze koppig en zelfstandig kunnen zijn, zodat training oefening en geduld vraagt. PetMD zegt dat ze met de juiste socialisatie en training uitstekende gezinshonden kunnen zijn. VCA beschrijft het ras als speels en heel goed met kinderen, al kunnen heel jonge of wilde kinderen hem bij ruw spel bezeren, en zegt dat zijn dunne vacht en kleine formaat hem gevoelig maken voor afkoeling. De PDSA noemt een gemiddelde levensduur van meer dan 12 jaar en PetMD 12–16 jaar.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Patou, Great Pyrenees, Chien de montagne des Pyrénées",
      text: [
        "De Pyrenese berghond – in de Verenigde Staten Great Pyrenees genoemd – komt uit Frankrijk; de FCI rekent hem tot de molossers van het berghondtype (groep 2) en beschrijft een hond van grote omvang, imposant en sterk gebouwd, maar niet zonder een zekere elegantie. Zijn vacht is wit, of wit met vlekken in dassengrijs, wolfsgrijs, lichtgeel of oranje op het hoofd en de oren. De FCI-standaard noemt een schofthoogte van 70–80 cm voor reuen en 65–75 cm voor teven; de PDSA noemt een gemiddeld gewicht van 40–50 kg. Zoals andere zeer grote honden is hij volgroeid op ongeveer 18–24 maanden (PetMD).",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en zegt dat het ras past bij een groot huis met een grote tuin, vaker dan één keer per week verzorging nodig heeft en verhaart, en noemt een levensduur van minder dan 10 jaar (PetMD en VCA noemen 10–12 jaar). De PDSA noemt ze zachtaardige reuzen – rustige, goedaardige honden die meestal met iedereen goed overweg kunnen – en zegt dat training geduld en belonende methoden vraagt. VCA zegt dat de Pyrenese berghond toegewijd is aan zijn gezin, vooral aan kinderen, en dat vroege socialisatie heel belangrijk is; PetMD zegt dat hij goed samenleeft met andere huisdieren, maar misschien het best past in gezinnen zonder jongere kinderen, en raadt af rond de maaltijden flink te bewegen vanwege het risico op maagtorsie.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Wheaten terrier, Wheaten, Soft coated wheaten terrier",
      text: [
        "De Irish soft coated wheaten terrier komt uit Ierland; de FCI rekent hem tot de grote en middelgrote terriërs. De standaard van de Royal Kennel Club beschrijft een middelgrote, compacte, hoogbenige terriër met een zachte, zijdeachtige, tarwekleurige vacht die in losse krullen of golven valt – goedaardig, levenslustig en onverschrokken, vol zelfvertrouwen en humor. De enige kleur is een mooie, heldere tarwekleur. De PDSA noemt een gemiddelde schofthoogte van 46–49 cm en een gemiddeld gewicht van 16–20,5 kg (de standaard van de Kennel Club noemt 16–20,5 kg voor reuen, en voor teven iets minder); zoals andere middelgrote honden is hij volgroeid op ongeveer 12–15 maanden (PetMD).",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en zegt dat het ras past bij een klein huis, dagelijkse verzorging nodig heeft en niet verhaart. Een groot Brits onderzoek (McMillan 2024, via Dogs Trust) noemt een mediane levensverwachting van 13,7 jaar; PetMD en VCA noemen 12–14 jaar. De PDSA noemt ze vriendelijke, betrouwbare honden die geweldige gezinshonden zijn, al kunnen ze een beetje koppig zijn. VCA zegt dat ze door hun zachtaardige, speelse aard goed bij kinderen passen; PetMD zegt dat contact met kinderen onder toezicht moet gebeuren, dat ze het niet fijn vinden om lang alleen te zijn, en adviseert om de vier à zes weken een professionele trimbeurt, ongeveer maandelijks een bad en om de één à twee weken de oren schoonmaken.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Irish wolfhound, Wolfshond, Cú faoil",
      text: [
        "De Ierse wolfshond komt uit Ierland; de FCI rekent hem tot de ruwharige windhonden. De PDSA noemt een gemiddelde schofthoogte van 71–79 cm en een gemiddeld gewicht van 40–55 kg; zoals andere zeer grote honden is hij volgroeid op ongeveer 18–24 maanden (PetMD). De Royal Kennel Club noemt zijn formaat extra groot en zegt dat hij past bij een groot huis met een grote tuin op het platteland.",
        "De Royal Kennel Club raadt meer dan twee uur beweging per dag aan en vaker dan één keer per week verzorging, en zegt dat het ras verhaart. De Kennel Club en de PDSA noemen een levensduur van minder dan 10 jaar; PetMD noemt 6–8 jaar. De PDSA raadt het ras door zijn grootte en kracht niet aan voor gezinnen met jongere kinderen, en door zijn sterke jachtinstinct ook niet bij kleinere huisdieren, en zegt dat hij nooit langer dan vier uur alleen mag worden gelaten. PetMD adviseert de pup te socialiseren vanaf de dag dat hij thuiskomt, niet te bewegen vlak voor of na het eten (maagtorsie) en de oren om de twee à vier weken schoon te maken.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "Amstaff, Staffordshire terrier",
      text: [
        "De American Staffordshire terrier komt uit de VS; de FCI rekent hem tot de terriërs van het bulltype. De standaard vraagt om veel kracht voor zijn formaat en noemt een schofthoogte van 46–48 cm voor reuen en 43–46 cm voor teven, maar geen gewicht. PetMD noemt 40–70 pond (ongeveer 18–32 kg) voor beide geslachten; een hond van dit formaat is volgroeid op ongeveer 12–15 maanden (PetMD).",
        "PetMD raadt minstens 60 minuten beweging per dag aan en zegt dat het ras geduldig en liefdevol is met kinderen, last kan hebben van verlatingsangst en dat zijn sterke jachtinstinct het samenleven met kleinere honden of katten lastiger kan maken. Een Brits onderzoek (McMillan e.a., 2024, zoals weergegeven door Dogs Trust) noemt een mediane levensverwachting van 12,5 jaar; PetMD noemt 12–16 jaar. VCA raadt één keer per week borstelen aan; PetMD adviseert de pup te socialiseren, niet te bewegen direct na een maaltijd (maagtorsie), en ongeveer om de 4–6 weken een bad en de oren schoonmaken.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Truffelhond",
      text: [
        "De lagotto romagnolo is een kleine tot middelgrote waterhond met krullende vacht uit Italië, bekend als truffelhond; de FCI rekent hem tot de waterhonden. De standaard noemt een schofthoogte van 43–48 cm en een gewicht van 13–16 kg voor reuen, en 41–46 cm en 11–14 kg voor teven; een hond van dit formaat is volgroeid op ongeveer 12–15 maanden (PetMD).",
        "De Royal Kennel Club noemt hem een uitstekende en alerte gezinshond, raadt meer dan twee uur beweging per dag aan en vaker dan één keer per week verzorging, zegt dat hij niet verhaart en noemt een levensduur van meer dan 12 jaar; PetMD zegt dat lagotti 15–17 jaar oud kunnen worden. PetMD merkt op dat hij voortdurend mentale en lichamelijke uitdaging en uitgebreide socialisatie nodig heeft, omdat hij verlegen kan zijn; Woodgreen zegt dat hij er moeite mee kan hebben als hij te vaak alleen wordt gelaten en raadt om de zes à acht weken een professionele trimbeurt aan.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Malamute",
      text: [
        "De Alaskan malamute is een van de oudste arctische sledehonden: een krachtige, stevig gebouwde noordse sledehond uit de VS met een dikke, grove vacht. De FCI-standaard noemt als gewenste maten 63,5 cm en 38 kg voor reuen en 58,5 cm en 34 kg voor teven; de PDSA noemt 58–64 cm en 34–39 kg. Een hond van dit formaat is volgroeid op ongeveer 15–18 maanden (PetMD), en de PDSA noemt een levensduur van meer dan 10 jaar (PetMD: 10–14 jaar).",
        "De PDSA raadt elke dag minimaal twee uur zware beweging en dagelijks borstelen aan, en zegt dat malamutes flink verharen, een heel sterk jachtinstinct hebben, nooit langer dan vier uur alleen mogen worden gelaten en passen bij actieve volwassenen of gezinnen met oudere kinderen; ze noemt ze een uitdaging voor beginnende eigenaren. PetMD adviseert de oren één keer per week te controleren en om de 6–8 weken een bad, en merkt op dat ze door hun dikke vacht moeite hebben met warm weer.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Congohond, Afrikaanse blafloze hond",
      text: [
        "De basenji is een licht gebouwde jachthond met fijne botten uit Centraal-Afrika die niet blaft, maar een eigen jodelend geluid maakt; de FCI rekent hem tot de oertypen. De PDSA noemt een schofthoogte van 40–43 cm en een gewicht van 9–11 kg. Een hond van dit formaat is volgroeid op ongeveer 9–12 maanden (PetMD), en de PDSA noemt een levensduur van meer dan 12 jaar (WebMD: 13–14 jaar).",
        "De PDSA raadt minstens een uur beweging per dag aan (ongeveer 60–90 minuten), veel mentale uitdaging en één keer per week borstelen; ze noemt basenji’s afstandelijk maar betrouwbaar, eigenwijs en met heel weinig verkeersinzicht. WebMD zegt dat ze alles achternazitten wat op een prooi lijkt, heel hoge hekken of voortdurend toezicht nodig hebben en maar matig goed met jonge kinderen omgaan, en adviseert de oren elke week schoon te maken en de tanden minstens twee keer per week te poetsen.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grote Zwitserse Sennenhond, Greater Swiss Mountain Dog, Swissy",
      text: [
        "De Grote Zwitserse Sennenhond is een stevige, zwaar gebouwde en goed gespierde driekleurige trekhond uit Zwitserland: zwart met symmetrische bruine en witte aftekeningen. De FCI-standaard noemt een schofthoogte van 65–72 cm voor reuen en 60–68 cm voor teven, maar geen gewicht; WebMD noemt 52–64 kg voor reuen en 39–50 kg voor teven. Een hond van dit formaat is volgroeid op ongeveer 18–24 maanden (PetMD), en de Royal Kennel Club noemt een levensduur van meer dan 10 jaar (PetMD: 8–11 jaar).",
        "De Royal Kennel Club raadt tot een uur beweging per dag aan en één keer per week borstelen, en zegt dat het ras verhaart en een groot huis met een grote tuin nodig heeft. PetMD noemt ze geweldige gezinshonden die zachtaardig zijn met kinderen (elk contact moet onder toezicht), en adviseert de oren elke week schoon te maken en de hond vlak voor of na het eten niet te laten bewegen vanwege het risico op maagtorsie (GDV); WebMD adviseert de tanden dagelijks te poetsen en weinig snoepjes te geven, omdat het ras snel te zwaar wordt.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "British shorthair, British blue",
      text: [
        "De Britse korthaar is een stevige kat met een dichte vacht en grote ronde ogen – de CFA noemt hem een “teddybeerkat”. De meeste mensen kennen hem in blauwgrijs, maar hij komt voor in allerlei kleuren en patronen. Hij wordt langzaam volwassen: de CFA zegt dat hij rond zijn derde zijn volle grootte bereikt, VCA zegt dat lichamelijke volwassenheid tot vijf jaar kan duren.",
        "De CFA beschrijft hem als heel aanhankelijk en gehecht aan zijn mensen; hij kan met iedereen in huis overweg, ongeacht de leeftijd, maar wordt meestal niet graag gedragen, en hij heeft samengeleefd met honden, konijnen en vogels. VCA beschrijft een gemiddeld activiteitsniveau en raadt aan de vacht minstens één keer per week te kammen. Raskittens gaan meestal met 12–13 weken naar hun nieuwe thuis (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "De CFA beschrijft de ragdoll als een grote, relaxte kat met een halflange, pluchezachte en zijdeachtige vacht en blauwe ogen. Zijn donkerdere “points” komen in verschillende patronen voor – colourpoint zonder wit, mitted met witte voetjes, bicolour met meer wit, en het van-patroon. Hij wordt langzaam volwassen: met twee jaar heeft hij zijn volledige vachtkleur en rond zijn vierde zijn volle grootte en gewicht.",
        "De CFA beschrijft een zachtaardige kat die je bij de deur begroet en je van kamer naar kamer volgt, en meestal speelt zonder zijn nagels uit te steken. PetMD noemt hem een goede keus voor gezinnen, ook met kinderen, maar raadt aan hem rustig en onder toezicht kennis te laten maken met kinderen en andere huisdieren, en zegt dat sommige ragdolls maar één à twee keer per week gekamd hoeven te worden, terwijl de CFA regelmatig kammen aanraadt. Raskittens gaan meestal met 12–13 weken naar een nieuw thuis (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Siberiër, Siberische boskat",
      text: [
        "De GCCF beschrijft de Siberische kat als een langzaam ontwikkelende kat met een dikke, weerbestendige vacht: een dichte, zachte ondervacht onder een grovere bovenvacht, die in het voorjaar en het najaar flink verhaart. Katers wegen ongeveer 7,7–11,8 kg en poezen 5,9–7,7 kg, de volledige ontwikkeling kan vier tot vijf jaar duren, en de GCCF noemt een levensduur van 12 tot 15 jaar of meer.",
        "De GCCF noemt hem energiek en speels maar geduldig – een goede keus voor gezinnen met jonge kinderen – en zegt dat hij goed overweg kan met andere dieren, ook met honden. PetMD adviseert minstens één keer per week kammen, met extra aandacht tijdens het verharen in voorjaar en najaar, en merkt op dat Siberische katten niet als hypoallergeen worden beschouwd. Raskittens gaan meestal met 12–13 weken naar hun nieuwe thuis (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine coon-kat",
      text: [
        "De Maine coon geldt algemeen als een van de grootste huiskattenrassen, met een gespierd, rechthoekig lichaam, een brede borst, grote poten en een lange, golvende staart. TICA noemt een gemiddeld gewicht van ongeveer 5,9–8,2 kg voor volwassen katers en 4,1–5,9 kg voor poezen, en de CFA merkt op dat sommige katers meer dan 9 kg wegen. Hij groeit langzaam: volgens de CFA is hij vaak pas op drie- of vierjarige leeftijd volledig ontwikkeld, en TICA zegt dat volledige volwassenheid drie tot vijf jaar kan duren.",
        "TICA beschrijft hem als zachtaardig, vriendelijk en speels, de CFA als sociaal, trouw en intelligent; hij “praat” vaak met een kwetterend trillertje in plaats van te miauwen. Vetstreet schrijft dat Maine coons met iedereen overweg kunnen, ook met kinderen, honden en andere katten. Zijn zware, halflange vacht is korter op de schouders en langer bij de kraag, de buik en het achterlijf. De bronnen verschillen over de verzorging: Vetstreet zegt dat één keer per week kammen genoeg is, de CFA raadt minstens een paar keer per week borstelen of kammen aan, en TICA merkt op dat een dikkere vacht dagelijks kammen nodig kan hebben. Raskittens gaan meestal met 12–13 weken naar hun nieuwe thuis (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Bengal, Bengaalse kat",
      text: [
        "De PDSA beschrijft de Bengaal als heel intelligent en energiek, een kat die veel mentale uitdaging en kansen om te bewegen nodig heeft en graag hoog zit, bijvoorbeeld in een krabpaal. Hij is aanhankelijk, maar gaat eerder naast je liggen dan op schoot, en kan behoorlijk luidruchtig zijn. VCA merkt op dat Bengalen langzaam groeien en tot twee jaar nodig kunnen hebben om lichamelijk volwassen te worden.",
        "Zijn korte, zachte, gevlekte of gemarmerde vacht heeft maar één keer per week een lichte borstel- of kambeurt nodig (PDSA). PetMD merkt op dat de Bengaal misschien niet het best past bij gezinnen met kleine kinderen, terwijl honden en andere katten met een goede kennismaking geen probleem hoeven te zijn. Het ras is ontstaan uit kruisingen tussen de Aziatische luipaardkat en huiskatten; PetPrep toont alleen de geregistreerde huiskat-Bengaal. Raskittens gaan meestal met 12–13 weken naar hun nieuwe thuis (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Skogkatt, Wegie",
      text: [
        "De GCCF beschrijft de Noorse boskat als zachtaardig en vriendelijk, een kat die het fijn vindt om deel van een gezin te zijn. Hij wordt langzaam volwassen en geldt pas rond vier à vijf jaar als volgroeid; katers wegen ongeveer 5,4–7,3 kg en poezen 4,1–5,4 kg, en de GCCF noemt een levensduur van 14 tot 16 jaar.",
        "Hij heeft veel energie, houdt van interactieve spelletjes en klimt graag; de GCCF zegt dat hij verdraagzaam is tegenover kinderen die hem met respect behandelen, andere katten en kattenvriendelijke honden. PetMD adviseert minstens één keer per week kammen en borstelen, vaker tijdens het verharen in voorjaar en najaar, en merkt op dat verlatingsangst een probleem kan zijn als hij vaak lang alleen wordt gelaten. Raskittens gaan meestal met 12–13 weken naar hun nieuwe thuis (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default nl;
