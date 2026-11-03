import type { RegistryCopy } from "./types";

/** Danish plural: one / other ("1 race", "2 racer", "1,5 timer"). */
const s = (n: number, one: string, other: string) => (n === 1 ? one : other);
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = " ";
/** Lower case for values that continue a phrase ("Hunde" → "hunde", "Op til 1 time" → "op til 1 time"). */
const lc = (t: string) => t.toLocaleLowerCase("da");
const cap = (t: string) => t.charAt(0).toLocaleUpperCase("da") + t.slice(1);
/**
 * Breed names are common nouns in Danish and are written in lower case in running text
 * ("labrador retriever", "berner sennenhund", "maine coon"); words with an inner capital or all capitals
 * (abbreviations) are kept as they are. A name keeps its capital only at the start of a sentence.
 */
const mid = (name: string) => name.replace(/\p{L}+/gu, (w) => (/^\p{Lu}[\p{Ll}]*$/u.test(w) ? lc(w) : w));
/** "Hunde" → "hunderacer", "Katte" → "katteracer" (compound); other species: "racer (fugle)". */
const breedsOf = (many: string, n: number) => {
  const m = lc(many);
  const kind = m === "hunde" || m === "hund" ? "hunde" : m === "katte" || m === "kat" ? "katte" : null;
  return kind ? `${kind}${s(n, "race", "racer")}` : `${s(n, "race", "racer")} (${m})`;
};
/** Danish ordinal: 1., 2., 7. */
const ord = (n: number) => `${n}.`;
/** "11:00" → "11.00" (Danish clock times). */
const clock = (t: unknown) => String(t).replace(":", ".");
/** Singular of a formatted unit noun after "hver …" ("hver 7. dag", "hver anden uge", "hvert andet år"). */
const SING: Record<string, { one: string; neuter?: boolean }> = {
  dag: { one: "dag" },
  dage: { one: "dag" },
  uge: { one: "uge" },
  uger: { one: "uge" },
  måned: { one: "måned" },
  måneder: { one: "måned" },
  år: { one: "år", neuter: true },
};
const every = (t: string) => {
  const m = /^(\d+)[\s ](\p{L}+)$/u.exec(t);
  const w = m ? SING[m[2]] : undefined;
  if (!m || !w) return `med ${t}s mellemrum`;
  const n = Number(m[1]);
  const v = w.neuter ? "hvert" : "hver";
  if (n === 1) return `${v} ${w.one}`;
  if (n === 2) return `${v} ${w.neuter ? "andet" : "anden"} ${w.one}`;
  return `${v} ${ord(n)} ${w.one}`;
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as Dansk Kennel Klub (DKK) uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "hyrdehunde og kvæghunde",
  2: "pinschere og schnauzere, molossere samt schweiziske sennenhunde og kvæghunde",
  3: "terriere",
  4: "gravhunde",
  5: "spidshunde og hunde af urtype",
  6: "drivende hunde, sporhunde og beslægtede racer",
  7: "stående jagthunde",
  8: "apporterende hunde, opstøvende hunde og vandhunde",
  9: "selskabshunde",
  10: "mynder",
};
const origins: Record<string, string> = { GB: "Storbritannien", FR: "Frankrig", DE: "Tyskland", US: "USA", CU: "Cuba", CH: "Schweiz", IT: "Italien", "CN-XZ": "Tibet (Kina)", CN: "Kina", MX: "Mexico", BE: "Belgien", HU: "Ungarn", JP: "Japan", ZA: "Sydafrika", "BE-FR": "Belgien/Frankrig", PT: "Portugal", CA: "Canada", HR: "Kroatien", AU: "Australien", RU: "Rusland", IE: "Irland", "AF-C": "Centralafrika", TR: "Tyrkiet" };
const hours = (n: number) => s(n, "time", "timer");
const times = (n: number) => (n === 1 ? "én gang" : `${n} gange`);

const da: RegistryCopy = {
  mistakes: {
    title: (breed) => `Typiske fejl hos ejere af en ${mid(breed)}`,
    intro: "Små vaner der fører til større problemer – hvert punkt bygger på kilderne om denne race.",
    exercise: "For lidt motion hver dag",
    exerciseText: (amount) => `Behov for motion: ${amount}. Planlæg det ind hver dag, ikke kun i weekenden.`,
    coat: "At springe pelsplejen over",
    coatText: (brushing, shedding) => `Børstning: ${brushing}.${shedding ? ` ${cap(shedding)}.` : ""}`,
    weight: "For mange godbidder og for store måltider",
    heat: "Gåture i varmen",
    growth: "At glemme at hvalpen stadig vokser",
    growthText: (growthEnd) =>
      `Udvokset ved: ${growthEnd}. Indtil da planlægger du motion og foder til et ungt dyr der stadig vokser – spørg din dyrlæge hvad der passer til netop dit dyr.`,
    mind: "For lidt at bruge hovedet til",
    health: "At overse racens kendte sundhedsproblemer",
    practise: "I PetPrep øver barnet netop disse vaner – skridt, måltider, pleje – før det rigtige kæledyr flytter ind.",
  },
  hub: {
    title: "Lær dyret at kende før det flytter ind.",
    intro:
      "Hvad hver dyreart og race i PetPrep virkelig har brug for – fra kennelklubber, katteforbund, dyrevelfærdsorganisationer og studier, med link til hver kilde. Plus de regler PetPrep bruger til at simulere dem.",
    breedCount: (n) => `${n} ${s(n, "race", "racer")} i leksikonet`,
    open: "Se racerne",
    openA11y: (many) => `Se racerne: ${lc(many)}`,
    freePlan: (name, activity) => `Gratisplan: ${lc(name)} (${activity} som voksen). Den har ingen egen raceside.`,
    otherSpecies: "Flere dyr er planlagt.",
    methodTitle: "Sådan bygger vi leksikonet",
    method: [
      "Hver oplysning kommer fra en navngiven kilde – kennelklubber, katteforbund, dyrevelfærdsorganisationer, dyrlægeforeninger og fagfællebedømte studier – og linker til den. Racestandarder gengiver vi med vores egne ord.",
      "Værdier som ingen kilde understøtter, vises aldrig som fakta. Når PetPrep skal vælge et tal til spillet, står det kun under »Sådan simulerer PetPrep racen«, markeret som en spilleregel.",
      "De samme data styrer appen: etiketterne, antallet af måltider, skridtmålene og legestunderne på disse sider er præcis dem kæledyret i appen bruger.",
      "Leksikonet er ikke dyrlægerådgivning. Sundhedsoplysningerne er kun vejledende og er ikke gennemgået af en dyrlæge.",
    ],
  },
  speciesStatus: { available: "I appen", coming_soon: "Snart i appen", info_only: "Kun til information" },
  availability: {
    in_app: { label: "I appen", text: "Findes i PetPreps 12-ugers-udfordring (betalt race)." },
    coming_soon: { label: "Snart i appen", text: "Færdigbygget og testet; kommer med en af de kommende appopdateringer." },
    info_only: { label: "Kun til information", text: "Står i leksikonet til information; du kan ikke adoptere den i appen endnu." },
  },
  catalogue: {
    eyebrow: "Dyreleksikon",
    title: (many) => `${many}: racer i leksikonet`,
    lead: (many, count) =>
      `${count} ${breedsOf(many, count)} med behov ifølge kilderne, hvem de passer til, og hvordan PetPrep simulerer dem. Søg, filtrer og sammenlign op til tre.`,
    metaTitle: (many) => `${cap(breedsOf(many, 2))} – raceleksikon med kilder | PetPrep`,
    metaDescription: (many) =>
      `Søg i og sammenlign ${breedsOf(many, 2)} efter behov, størrelse og hvem de passer til. Hver oplysning linker til sin kilde – plus de regler PetPrep bruger til at simulere hver race.`,
    searchLabel: "Søg efter racer",
    searchPlaceholder: "Navn, fx labrador",
    filtersTitle: "Filtre",
    any: "Alle",
    availabilityLabel: "I PetPrep",
    sortLabel: "Sortér",
    sort: { recommended: "I appen først", az: "A–Å", size: "Størrelse (lille til stor)" },
    clear: "Ryd alle filtre",
    results: (total) => `{n} af ${total} ${s(total, "race", "racer")}`,
    none: "Ingen racer passer. Prøv med færre filtre.",
    loading: "Søgningen indlæses …",
    page: "Side {n} af {total}",
    prev: "Forrige",
    next: "Næste",
    compareAdd: "Sammenlign {name}",
    compareBar: "{n} af {max} valgt til sammenligning",
    compareGo: "Sammenlign",
    compareMax: "Du kan sammenligne op til {max} racer.",
    azTitle: "Alle racer A–Å",
    azIntro: "Alle racer i leksikonet i alfabetisk rækkefølge.",
    freePlanTitle: "Gratisplan",
    guideTitle: "Sådan vælger du den rette race",
    guide: () => [
      "Begynd med det din husstand kan give hver dag: tid til motion, pelspleje og plads. Hver raceside viser disse behov i overblik med den navngivne kilde til hver værdi; hvor kilderne er uenige, vises alle værdier.",
      "Når en race har en størrelsesklasse (for hunde: meget lille, lille, mellemstor, mellemstor til stor, stor eller kæmpestor), er det den klasse den navngivne kilde angiver – som regel en kennelklub – og vægtene er de intervaller kilderne angiver, ikke vores skøn.",
      "Etiketter som »Passer godt til: en aktiv familie« er de samme som i appen, og hvert af dem understøttes af kilder. Tallene under »Sådan simulerer PetPrep racen« er PetPreps spilleregler, ikke plejeråd. [Sådan bygger vi leksikonet](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Sammenlign ${breedsOf(many, 2)}`,
    metaTitle: (many) => `Sammenlign ${breedsOf(many, 2)} | PetPreps dyreleksikon`,
    intro: "De vigtigste behov side om side, fra de samme kilder som racesiderne.",
    pick: "Vælg to eller tre racer i kataloget for at sammenligne dem.",
    back: "Tilbage til kataloget",
    remove: "Fjern {name}",
    note: "Værdierne gengives sådan som den navngivne kilde angiver dem. Hvor kilderne er uenige, viser racesiden hver enkelt.",
    availabilityRow: "I PetPrep",
    activityRow: "Dagligt mål som voksen i PetPrep (spilleregel)",
  },
  facets: {
    size: { label: "Størrelse", values: { toy: "Meget lille", small: "Lille", small_medium: "Lille til mellemstor", medium: "Mellemstor", medium_large: "Mellemstor til stor", large: "Stor", giant: "Kæmpestor" } },
    exercise: { label: "Daglig motion", values: { under_1h: "Op til 1 time", h1_2: "1–2 timer", over_2h: "Mere end 2 timer" }, line: (v) => `${lc(v)} om dagen` },
    grooming: { label: "Børstning", values: { weekly: "Én gang om ugen", several_weekly: "Flere gange om ugen", daily: "Hver dag", other: "Andet" }, line: (v) => `børstning: ${lc(v)}` },
  },
  groups: {
    exercise: "Motion",
    play: "Leg",
    litter: "Kattebakke",
    scratching: "Kradsning",
    grooming: "Pels og pelspleje",
    feeding: "Måltider",
    water: "Vand",
    lifespan: "Levetid",
    stages: "Livsfaser",
    size: "Størrelse og vægt",
    training: "Træning",
  },
  fields: {
    size: "Størrelse",
    height: "Skulderhøjde",
    weight: "Vægt som voksen",
    growth_end: "Udvokset ved",
    lifespan: "Levetid",
    exercise: "Daglig motion",
    coat: "Pels",
    grooming_frequency: "Børstning",
    grooming_level: "Behov for pelspleje",
    shedding: "Fældning",
    litter_scoop: "Rens kattebakken",
    litter_full_change: "Skift alt kattegruset",
    litter_pee: "Tisser (voksen)",
    litter_poo: "Har afføring (voksen)",
    water_need: "Vandbehov",
    sleep: "Søvn (voksen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 uger",
    puppy_3_6_months: "3–6 måneder",
    puppy_6_12_months: "6–12 måneder",
    kitten_6_12_weeks: "6–12 uger",
    kitten_3_6_months: "3–6 måneder",
    kitten_6_12_months: "6–12 måneder",
    puppy: "Hvalp",
    kitten: "Killing",
    young_adult: "Ung voksen",
    mature_adult: "Moden voksen",
    adult: "Voksen",
    senior: "Senior",
  },
  categories: {
    size: { toy: "meget lille", small: "lille", small_medium: "lille til mellemstor", medium: "mellemstor", medium_large: "mellemstor til stor", large: "stor", giant: "kæmpestor" },
    coat: { moderately_long: "halvlang", smooth: "glat (kort)", short: "kort", medium: "mellemlang", short_long: "kort eller lang (to pelsvarianter)", long: "lang" },
    grooming_frequency: {
      at_least_once_a_week: "mindst én gang om ugen",
      at_least_once_or_twice_a_week: "mindst en eller to gange om ugen",
      once_a_week: "én gang om ugen",
      more_than_once_a_week: "mere end én gang om ugen",
      daily: "dagligt",
      every_day: "hver dag",
    },
    // "Behov for pelspleje: moderat / stort / lille" (et behov)
    grooming_level: { moderate: "moderat", high: "stort", low: "lille" },
    shedding: { yes: "fælder", no: "fælder ikke (det er ikke det samme som allergivenlig)", high: "fælder meget", moderate: "fælder moderat", low: "fælder lidt", minimal: "fælder minimalt" },
  },
  statements: {
    food_motivated: () => "Meget madmotiveret – en hjælp i træningen, men hold øje med portionerne.",
    coren_rank: (v) => `Nr. ${String(v)} på Stanley Corens rangliste over arbejds- og lydighedsintelligens.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-standard nr. ${x.number}, gruppe ${x.group} (${fciGroups[x.group] ?? "—"}); oprindelse: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Leg: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} legestunder à ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}minutter om dagen.`;
    },
    kittens_play_more: () => "Killinger har brug for at lege oftere.",
    scratching_natural: () => "At kradse er naturligt og nødvendigt: giv katten et kradsetræ, og straf den aldrig for at kradse.",
    water_fresh: () => "Frisk vand hele tiden; vask skålen og fyld den op hver dag.",
    grooming_sources_differ: () => "Kilderne er uenige om kæmningen: fra hver dag til én gang om ugen.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `median ${t}`,
    more_than: (t) => `mere end ${t}`,
    less_than: (t) => `mindre end ${t}`,
    at_least: (t) => `mindst ${t}`,
    up_to: (t) => `op til ${t}`,
    ideal: (t) => `ideelt (racestandard): ${t}`,
    mean: (t) => `målt gennemsnit: ${t}`,
    about: (t) => `ca. ${t}`,
    until: (t) => `indtil ${t}`,
    until_about: (t) => `indtil ca. ${t}`,
    span: (t) => t,
    from: (t) => `fra ${t}`,
    last: (t) => `de sidste ${t}`,
    every: (t) => every(t),
    expectancy: (t) => `forventet levetid ved fødslen: ${t}`,
    smaller_meals: (t) => `${t}, mindre portioner`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t) => `${t}${NB}år`,
    months: (t, n) => `${t}${NB}${s(n, "måned", "måneder")}`,
    days: (t, n) => `${t}${NB}${s(n, "dag", "dage")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} om dagen` : `${t}${NB}minutter om dagen`),
    meals_per_day: (t, n) => `${t}${NB}${s(n, "måltid", "måltider")} om dagen`,
    times_per_day: (t, n) => `${t}${NB}${s(n, "gang", "gange")} om dagen`,
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} om dagen`,
    ml_per_kg_day: (t) => `${t}${NB}ml pr. kg kropsvægt om dagen`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% af den forventede levetid`,
  },
  males: "hanner",
  females: "hunner",
  or: " eller ",
  notes: { size_class_guidance: "vejledende for størrelsesklassen" },
  stageLabels: {
    dog: { puppy: "Hvalp", young: "Unghund", adult: "Voksen", senior: "Senior" },
    cat: { puppy: "Killing", young: "Ung kat", adult: "Moden kat", senior: "Senior" },
  },
  activity: {
    steps: (n) => `${n}${NB}skridt`,
    steps_range: (from, to) => `${from} → ${to}${NB}skridt`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth}${NB}skridt pr. levemåned (${first} ved ankomsten), højst ${cap} fra måned ${capMonth}`,
    play_sessions: (n) => `${n} ${s(n, "legestund", "legestunder")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Skridtmål = minutter med daglig motion × ${p.per_minute}${NB}skridt: et voksent dyr får ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}minutter`}, altså ${f.num(p.steps)}${NB}skridt om dagen.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Lærer kommandoer langsommere end gratisplanens blandingshund (${f.num(p.multiplier)}× dens tempo).`
        : p.multiplier === 1
          ? "Lærer kommandoer lige så hurtigt som gratisplanens blandingshund."
          : `Lærer kommandoer ${f.num(p.multiplier)}× så hurtigt som gratisplanens blandingshund.`,
    senior_share: (p, f) => `Bliver senior i måned ${p.months} (${f.num(p.months / 12, 1)}${NB}år) – den sidste fjerdedel af racens forventede levetid.`,
    walk_sensor: () => "Gåturene tæller rigtige skridt fra Apple Sundhed eller Health Connect (med tilladelse, kun læseadgang) og telefonens bevægelsessensor – ingen GPS.",
    play_instead_of_steps: (p, f) =>
      `Ingen gåture: en voksen kat har brug for ${p.sessions} ${s(p.sessions, "legestund", "legestunder")} om dagen med en legestang, med mindst ${f.num(p.gap_minutes / 60)}${NB}${hours(p.gap_minutes / 60)} imellem.`,
    litter_rule: (p) =>
      `Kattebakke: en voksen kat bruger den ${p.uses} ${s(p.uses, "gang", "gange")} om dagen; bakken renses inden for ${p.scoop_hours}${NB}${hours(p.scoop_hours)} efter hvert besøg (uden for de stille timer), og alt kattegruset skiftes ${p.change_days === 7 ? "én gang om ugen" : p.change_days === 1 ? "hver dag" : p.change_days === 2 ? "hver anden dag" : `hver ${ord(p.change_days)} dag`}.`,
    scratching_after_missed_play: () => "Efter en dag med for lidt leg kradser katten én gang i noget; barnet bærer den hen til kradsetræet.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kæmning én gang om ugen." : p.per_week === 2 ? "Kæmning to gange om ugen." : `Kæmning ${p.per_week} gange om ugen.`),
    no_walk_in_heat: (p) =>
      `Om sommeren (juni–august; december–februar på den sydlige halvkugle) viser barnets skærm og gåturskærmen en rolig påmindelse mellem kl. ${clock(p.from)} og ${clock(p.to)} (familiens lokale tid): ingen gåture i varmen. Ingen vejrdata, ingen straf – skridtene tæller stadig.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "rengøring af hudfolderne",
        tooth_brushing: "tandbørstning",
        ear_cleaning: "kontrol og rengøring af ørerne",
        nail_trim: "klipning af kløerne",
        bath: "bad",
        groomer_visit: "besøg hos en professionel hundefrisør",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "hver dag"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "én gang om ugen"
              : weeks === 2
                ? "hver anden uge"
                : `hver ${ord(weeks)} uge`
            : q.period_days === 7
              ? `${times(q.times)} om ugen`
              : `${times(q.times)} ${q.period_days === 1 ? "om dagen" : q.period_days === 2 ? "hver anden dag" : `hver ${ord(q.period_days)} dag`}`;
      const who = q.actor === "parent" ? "en påmindelse til forælderen" : "en opgave for barnet";
      return `Pleje: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Se hvalpen sammen med dens mor der hvor den er født.",
      min_age_puppy: "Hvalpen bør ikke forlade sin mor før den er 8 uger gammel.",
      pedigree_fci: "Bed om stamtavlen. Efter FCI's regler må der kun udstedes en stamtavle når afstamningen er korrekt.",
      parents_health_tests: "Bed om at se resultaterne af begge forældres sundhedstest. Hvilke test der er vigtige, afhænger af racen.",
      breed_club_rules: "Nationale kennelklubber kan have avlsregler der går videre end FCI's – spørg raceklubben hvilke test forældrene skal have.",
      written_contract: "Bed om en skriftlig købsaftale der beskriver hvalpens baggrund og helbred.",
      kitten_see_mother: "Se killingen sammen med dens mor der hvor killingerne bor.",
      kitten_min_age: "Efter FIFe's stambogsregler flytter en killing ikke til et nyt hjem før den er 14 uger gammel.",
      kitten_vaccination: "Killingen er fuldt vaccineret (kattesyge, calicivirus, herpesvirus) og har et vaccinationskort med.",
      kitten_pedigree: "En killing med stamtavle får stamtavlen med, og den viser mindst tre generationer.",
      kitten_parents_tests: "Spørg om en af forældrene har haft sundhedsproblemer som killingen kan arve.",
    },
    tests: {
      dna_poag_pll: "DNA-test for primær åbenvinklet glaukom og primær linseluksation (POAG/PLL), arvelige øjensygdomme, der kan føre til blindhed",
      hip_scheme: "Røntgen af hofterne for hofteledsdysplasi (UK: BVA/KC-ordningen)",
      elbow_scheme: "Røntgen af albuerne for albueledsdysplasi (UK: BVA/KC-ordningen)",
      eye_scheme: "Øjenundersøgelse hos en dyrlæge med speciale i øjne (UK: BVA/KC/ISDS-ordningen; for nogle racer med gonioskopi)",
      heart_scheme: "Hjerteundersøgelse for mitralklapsygdom",
      boas_grading: "Vejrtrækningstest for brachycefalt obstruktivt luftvejssyndrom (BOAS-graduering)",
      ivdd_screening: "Undersøgelse af rygsøjlen for sygdom i båndskiverne (IVDD)",
      hearing_baer: "Høretest for døvhed (BAER)",
      cm_sm_mri: "MR-scanning for Chiari-lignende misdannelse og syringomyeli (UK: BVA/KC's CM/SM-ordning)",
      inbreeding_coi: "Genetisk variation – tjek indavlskoefficienten",
      dna_prcd_pra: "DNA-test for progressiv retinal atrofi (prcd-PRA)",
      dna_rcd4_pra: "DNA-test for progressiv retinal atrofi (rcd4)",
      dna_gr_pra2: "DNA-test for progressiv retinal atrofi (GR_PRA2)",
      dna_cnm: "DNA-test for centronukleær myopati (CNM)",
      dna_eic: "DNA-test for motionsudløst kollaps (EIC)",
      dna_hnpk: "DNA-test for arvelig nasal parakeratose (HNPK)",
      dna_sd2: "DNA-test for skeletdysplasi 2 (SD2)",
      dna_mcd: "DNA-test for makulær korneadystrofi (MCD)",
      dna_stgd: "DNA-test for Stargardts sygdom (STGD)",
      dna_cc_de: "DNA-test for curly coat/dry eye-syndrom (CC/DE)",
      dna_ef: "DNA-test for episodic falling (EF)",
      dna_cea: "DNA-test for collie eye anomaly (CEA/CH)",
      dna_cl: "DNA-test for ceroid lipofuscinose (CL)",
      dna_igs: "DNA-test for Imerslund-Gräsbecks syndrom (IGS)",
      dna_mdr1: "DNA-test for overfølsomhed over for visse lægemidler (MDR1)",
      dna_tns: "DNA-test for trapped neutrophil syndrome (TNS)",
      dna_sn: "DNA-test for sensorisk neuropati (SN)",
      dna_ggd: "DNA-test for goniodysgenese og risiko for grøn stær (GGD)",
      dna_raines: "DNA-test for Raines syndrom",
      dna_dm: "DNA-test for degenerativ myelopati (DM)",
      dna_de: "DNA-test for degenerativ encefalopati (DE)",
      dna_jadd: "DNA-test for juvenil Addisons sygdom (JADD)",
      dermoid_sinus_scheme: "Hvalpetjek for dermoid sinus (raceklubbens ordning)",
      dna_jme: "DNA-test for juvenil myoklonisk epilepsi (JME)",
      dna_je: "DNA-test for juvenil epilepsi (JE)",
      dna_lsd: "DNA-test for lysosomal oplagringssygdom (LSD)",
      dna_ampn: "DNA-test for alaskan malamute-polyneuropati (AMPN)",
      dna_fanconi: "DNA-test for Fanconis syndrom (en nyresygdom)",
      dna_pra_bj1: "DNA-test for progressiv retinal atrofi hos basenji (PRA-BJ1)",
      thyroid_scheme: "Undersøgelse af forældrenes skjoldbruskkirtel",
      dna_pap_pra1: "DNA-test for progressiv retinal atrofi hos papillon (Pap-PRA1)",
      dna_nad: "DNA-test for neuroaksonal dystrofi (NAD)",
      dna_eopra: "DNA-test for tidligt indsættende progressiv retinal atrofi (EOPRA)",
      dna_cu: "DNA-test for cystinuri (CU), en arvelig sygdom der giver sten i nyrer og urinblære",
      heart_echo_scheme: "Hjerteundersøgelse med farvedoppler-ultralyd (raceklubbens ordning)",
      cardiac_exam: "Hjerteundersøgelse af forældrene (raceklubbens anbefaling)",
      dna_rd_osd: "DNA-test for retinal dysplasi/okuloskeletal dysplasi (RD/OSD)",
      dna_xlpra1: "DNA-test for X-bundet progressiv retinal atrofi (XLPRA1)",
      dna_cmo: "Test for kraniomandibulær osteopati (CMO), en arvelig knoglesygdom i kæben",
      dna_hsf4: "DNA-test for arvelig grå stær (HSF4)",
      dna_lafora: "DNA-test for Laforas sygdom",
      dna_nccd: "DNA-test for neonatal cerebellar kortikal degeneration (NCCD)",
      dna_fviid: "DNA-test for faktor VII-mangel (FVIID)",
      dna_mls: "DNA-test for Musladin-Lueke-syndrom (MLS)",
      dna_vwd1: "DNA-test for von Willebrands sygdom type 1 (vWD1)",
      dna_mac: "DNA-test for modtagelighed for infektion med Mycobacterium avium-kompleks (MAC)",
      dna_imgd: "DNA-test for arvelig myopati hos grand danois (IMGD), en sygdom der nedbryder musklerne",
      dna_poag: "DNA-test for primær åbenvinklet glaukom (POAG), en arvelig øjensygdom der kan føre til blindhed",
      dna_aon: "DNA-test for neuropati med debut i voksenalderen (AON), en arvelig nervesygdom",
      dna_fn: "DNA-test for familiær nefropati (FN), en arvelig nyresygdom",
      patella_scheme: "Kontrol af knæskallerne for patellaluksation før avl",
      kidney_scheme: "Ultralydsscanning af nyrerne for manglende eller misdannet nyre (raceklubbens anbefaling)",
      kidney_upc_scheme: "Urinprøve (forholdet mellem protein og kreatinin) for nyresygdom (raceklubbens anbefaling)",
      dna_gld: "DNA-test for globoidcelle-leukodystrofi (GLD), en arvelig nervesygdom",
      liver_shunt_scheme: "Leverundersøgelse for portosystemisk shunt eller mikrovaskulær dysplasi (raceklubbens anbefaling)",
      breed_health_scheme: "Raceklubbens sundhedsprogram for forældrene",
      hemivertebrae_scheme: "Røntgen af forældrenes rygsøjle for hemivertebrae (misdannede ryghvirvler) når de er mindst 12 måneder gamle",
      dna_hcm_mc: "DNA-test for hypertrofisk kardiomyopati (MC HCM)",
      dna_sma: "DNA-test for spinal muskelatrofi (SMA)",
      dna_pk_def: "DNA-test for pyruvatkinasemangel (PK def)",
      hcm_negative: "Avlskatte skal være HCM-negative (hjertesygdommen hypertrofisk kardiomyopati)",
      dna_gsd4: "DNA-test for glykogenoplagringssygdom type IV (GSD IV)",
      dna_pra_b: "DNA-test for progressiv retinal atrofi hos bengal (PRA-b)",
      dna_jlpp: "DNA-test for juvenil larynxlammelse og polyneuropati (JLPP)",
      dna_lemp2: "DNA-test for leukoencefalomyelopati (LEMP-2)",
      dna_huu: "DNA-test for hyperurikosuri (HUU)",
      dna_dcm: "DNA-test for dilateret kardiomyopati (DCM), en sygdom i hjertemusklen",
      dna_pra5: "DNA-test for progressiv retinal atrofi (PRA5)",
      dna_dings2: "DNA-test for dancing Dobermann disease (DINGS2), en nerve- og muskelsygdom",
      dna_ams: "DNA-test for akralt mutilationssyndrom (AMS), en nervesygdom der fjerner smertefølelsen i poterne",
      dna_dams: "DNA-test for dyserytropoietisk anæmi og myopatisyndrom (DAMS), en blod- og muskelsygdom",
      dna_fuco: "DNA-test for fukosidose, en arvelig sygdom i nervesystemet",
      dna_pfk: "DNA-test for fosfofruktokinasemangel (PFK), en arvelig enzymsygdom i blodet og musklerne",
      dna_pra_cord1: "DNA-test for progressiv retinal atrofi (PRA cord1)",
      dna_bbs2_pra: "DNA-test for progressiv retinal atrofi (BBS2-PRA)",
      dna_cnga1_pra: "DNA-test for progressiv retinal atrofi (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-test for progressiv retinal atrofi (PRA-rcd2)",
      dna_gm1: "DNA-test for GM1-gangliosidose (en arvelig sygdom i nervesystemet)",
      dna_gm2: "DNA-test for GM2-gangliosidose (en arvelig sygdom i nervesystemet)",
      dna_vwd3: "DNA-test for von Willebrands sygdom type 3 (vWD3), en arvelig blødersygdom",
      dna_pra_rcd3: "DNA-test for progressiv retinal atrofi (PRA-rcd3)",
      dna_clad: "DNA-test for canin leukocyt-adhæsionsdefekt (CLAD), en arvelig immunsygdom",
      dna_pra_rcd1: "DNA-test for progressiv retinal atrofi (rcd1)",
      dna_vwd2: "DNA-test for von Willebrands sygdom type 2 (vWD2), en arvelig blødersygdom",
      dna_l2hga: "DNA-test for L-2-hydroxyglutarsyreuri (L-2-HGA), en arvelig stofskiftesygdom i nervesystemet",
      dna_pll: "DNA-test for primær linseluksation (PLL), en arvelig øjensygdom hvor linsen glider ud af sin plads",
      dna_loa: "DNA-test for sent indsættende ataksi (LOA), en arvelig sygdom der påvirker balance og koordination",
      dna_sca: "DNA-test for spinocerebellar ataksi (SCA), en arvelig sygdom i nervesystemet",
    },
  },
  health: {
    splenic_torsion: "Miltdrejning, som kræver akut dyrlægehjælp, er hyppigere hos denne race end hos andre store racer.",
    shar_pei_fever: "Familiær shar pei-feber kan forekomme i racen: anfald af høj feber med smertefulde, hævede led og et hævet ansigt – kontakt straks en dyrlæge.",
    weight_gain: "Tager let på i vægt – hold øje med portioner og godbidder.",
    hip_elbow_dysplasia_eye_conditions: "Kan være disponeret for hofte- og albueledsdysplasi og for flere arvelige øjensygdomme.",
    cancer_risk: "Kilderne beskriver en højere risiko for kræft hos denne race.",
    flat_face_breathing:
      "Fladnæset (brachycefal) race: den korte snude, de smalle næsebor og ekstra blødt væv i luftvejene kan gøre det sværere at trække vejret (brachycefalt obstruktivt luftvejssyndrom, BOAS).",
    heat_stroke_risk: "Bliver hurtigt overophedet og er mere udsat for hedeslag end de fleste hunde, især i varmt vejr.",
    skin_fold_ear_problems: "Disponeret for ørebetændelse og infektioner i hudfolderne; hudfolderne skal holdes rene og tørre.",
    ear_infections_long_ears: "Ørebetændelse kan opstå på grund af de lange ører; bakterier kan samle sig i øregangen.",
    collie_eye_pra:
      "Arvelige øjensygdomme forekommer i racen: collie eye anomaly, en misdannelse bagest i øjet, og progressiv retinal atrofi som langsomt kan føre til blindhed; der findes øjenundersøgelser og DNA-test.",
    merle_colour_risk: "Merle er ikke en farve i racestandarden; hos denne race giver den en højere risiko for problemer med hørelse og syn.",
    hind_leg_conformation:
      "Royal Kennel Club nævner bagbenenes form og hundens bevægelser som et opmærksomhedspunkt i racen; en sund hund har en lige ryg og moderat vinklede bagben.",
    hip_elbow_dysplasia: "Kan være disponeret for hofte- og albueledsdysplasi; opdrættere rådes til at få forældrenes hofter og albuer undersøgt før avl.",
    degenerative_myelopathy: "Degenerativ myelopati, en sygdom i rygmarven der langsomt svækker bagbenene, forekommer i racen; der findes en DNA-test.",
    exercise_induced_collapse: "Motionsudløst kollaps, en arvelig neuromuskulær sygdom der kan få en hund til at falde om efter hård motion, forekommer i racen.",
    heart_valve_disease:
      "Hjertesygdom forårsaget af en svækket mitralklap er et stort problem i racen; den opdages ofte først som en mislyd på hjertet, og avlshunde bør hjerteundersøges først.",
    chiari_syringomyelia:
      "Chiari-lignende misdannelse og syringomyeli, en smertefuld tilstand med væskefyldte hulrum i rygmarven nær hjernen, forekommer i racen og hænger sammen med kraniets form; den diagnosticeres med MR-scanning.",
    eye_conditions:
      "Arvelige øjensygdomme som grå stær forekommer i racen, og fremstående eller irriterede øjne er et opmærksomhedspunkt; der findes øjenundersøgelser og DNA-test.",
    epilepsy: "Epilepsi, en sygdom i hjernen der kan give kramper, forekommer i racen.",
    storage_disease: "En arvelig oplagringssygdom i nervesystemet kan ramme unge hunde af racen; med en DNA-test af forældrene kan opdrættere undgå den.",
    chondrodysplasia: "Kondrodysplasi, en forstyrrelse i væksten af brusk og knogler, forekommer i racen; hvalpe kan undersøges med røntgen.",
    polyneuropathy: "En arvelig nervesygdom (polyneuropati) forekommer i racen; med en DNA-test af forældrene kan opdrættere undgå den.",
    fanconi_syndrome: "Fanconis syndrom, en arvelig nyresygdom hvor der siver sukker ud i urinen, forekommer i racen; med en DNA-test af forældrene kan opdrættere undgå den.",
    pyruvate_kinase_deficiency: "Pyruvatkinasemangel, en arvelig defekt i de røde blodlegemer der giver blodmangel (anæmi), kan forekomme i racen.",
    back_disc_disease: "Sygdom i båndskiverne, de stødpuder der sidder mellem ryghvirvlerne, forekommer i racen.",
    pra_eye_disease: "Progressiv retinal atrofi, en arvelig øjensygdom der langsomt kan føre til blindhed, forekommer i racen; der findes DNA-test og øjenundersøgelser.",
    hip_dysplasia: "Hofteledsdysplasi, et dårligt udviklet hofteled der kan føre til slidgigt, forekommer i racen; opdrættere rådes til at få forældrenes hofter vurderet.",
    bloat_gdv: "Mavedrejning (gastrisk dilatation-volvulus), hvor mavesækken drejer om sig selv, kan forekomme i racen – det er en akut tilstand der kræver dyrlægehjælp med det samme.",
    inherited_eye_disease: "Arvelige øjensygdomme forekommer i racen, fx collie eye anomaly, grå stær og progressiv retinal atrofi.",
    drug_sensitivity_mdr1: "Nogle hunde af racen har en arvelig overfølsomhed over for visse lægemidler (MDR1) – hvis din hund er ramt, så fortæl det til din dyrlæge.",
    merle_to_merle_breeding:
      "Merle er en standardfarve i denne race; to merlehunde bør ikke parres med hinanden fordi hvalpene risikerer nedsat syn og hørelse – Royal Kennel Club registrerer dem ikke.",
    kneecap_luxation: "Patellaluksation, hvor knæskallen midlertidigt glider ud af sin plads, forekommer i racen.",
    pra_and_eyelashes:
      "Øjenproblemer forekommer i racen: progressiv retinal atrofi som langsomt kan føre til blindhed, og ekstra øjenhår der gnider mod øjet (distichiasis); opdrættere rådes til at få forældrenes øjne undersøgt.",
    liver_shunt: "En portosystemisk shunt (levershunt), hvor blodet løber uden om leveren, kan forekomme i racen.",
    skin_allergies:
      "Hudallergi er et kendt problem i racen; Royal Kennel Club beder dommere om at se efter tegn på hudbetændelse, og ejere rådes til at spørge dyrlægen før de vælger en shampoo.",
    westie_lung: "En lungesygdom kendt som »Westie lung« (idiopatisk lungefibrose), som gør det sværere at trække vejret, kan forekomme i racen, mest hos ældre hunde.",
    jaw_bone_disorder: "En arvelig knoglesygdom i kæben kan forekomme i racen.",
    dry_eye: "Tørre øjne, hvor øjnene ikke danner nok tårer og bliver tørre og ømme, kan forekomme i racen.",
    heart_hcm: "Hypertrofisk kardiomyopati (HCM), en arvelig hjertesygdom hvor hjertemusklen bliver fortykket, forekommer i racen.",
    dental_weight_nail_care:
      "Et stort britisk studie nævner tandsygdom, overvægt og for lange kløer blandt de hyppigste problemer i racen, så ejere rådes til at holde fast i tandpleje, vægtkontrol og klopleje.",
    dental_weight_care: "PetMD nævner tandsygdom og overvægt blandt de problemer man skal holde øje med, så ejere rådes til at børste kattens tænder jævnligt og holde dens vægt i skak.",
    gsd_iv: "Glykogenoplagringssygdom type IV (GSD IV), en arvelig sygdom der rammer killinger, forekommer i racen; med en DNA-test af forældrene kan opdrættere undgå den.",
    hip_dysplasia_weight: "Hofteledsdysplasi, et dårligt udviklet hofteled, kan forekomme i racen; PetMD råder til at holde katten på en sund vægt for at skåne leddene.",
    laryngeal_paralysis_polyneuropathy:
      "Juvenil larynxlammelse og polyneuropati (JLPP), en arvelig nervesygdom der påvirker strubehovedet og bagbenene, forekommer i racen; med en DNA-test af forældrene kan opdrættere undgå den.",
    heart_sas: "Subaortastenose, en forsnævring lige under en hjerteklap der kan give mislyd, forekommer i racen; avlshunde bør først få hjertet undersøgt.",
    inherited_eye_defects: "Arvelige øjensygdomme forekommer i racen, fx retinal dysplasi og persisterende pupilmembran; der findes øjenundersøgelser.",
    skin_fold_infections: "Hudfolderne, især i ansigtet, kan holde på fugt og blive betændte (hudfoldspyodermi); rynkerne i ansigtet skal renses hver dag.",
    eyelid_eye_problems: "Problemer med øjenlågene (ind- eller udadrullede øjenlåg), tørre øjne og cherry eye forekommer i racen; der findes øjenundersøgelser.",
    hip_elbow_joint_disease: "Hofte- og albueledsdysplasi, hvor leddene ikke udvikler sig korrekt, forekommer i racen og kan føre til ledsygdom.",
    hip_dysplasia_arthritis: "Hofteledsdysplasi, et løst og dårligt udviklet hofteled, forekommer i racen og kan med tiden føre til slidgigt.",
    bleeding_disorder_vwd: "Von Willebrands sygdom, en arvelig forstyrrelse i blodets størkning der kan give kraftige blødninger, forekommer i racen.",
    heart_muscle_disease: "Kardiomyopati, et forstørret hjerte på grund af en svækket hjertemuskel, kan forekomme i racen.",
    itchy_skin_allergy: "Hudallergi (atopi), som giver kløe og øm hud, kan forekomme i racen.",
    entropion_cherry_eye:
      "Indadrullede øjenlåg (entropion) og cherry eye, hvor det tredje øjenlåg springer frem, kan forekomme i racen; cherry eye kan rettes med en operation.",
    dental_disease_tooth_brushing:
      "Et stort britisk studie nævner tandsygdom som langt det hyppigste problem i racen, og mælketænder der ikke falder ud, er også almindelige, så ejere opfordres til at passe hundens tænder hver dag, fx ved at børste dem.",
    windpipe_collapse: "Kollaps af luftrøret, hvor luftrøret mister sin stivhed og kan give svaghed og kollaps, kan forekomme i racen.",
    eye_problems_pra_lens_dry_eye:
      "Øjenproblemer forekommer i racen, fx progressiv retinal atrofi som langsomt kan føre til blindhed, en linse der er gledet ud af sin plads (linseluksation), og tørre øjne.",
    cataracts_lens_luxation: "Øjenproblemer kan forekomme i racen, fx grå stær, som gør linsen uklar, og en linse der er gledet ud af sin plads (linseluksation).",
    wobbler_syndrome: "Wobbler-syndrom, hvor ustabile knogler i nakken trykker på rygmarven og svækker bagbenene, kan forekomme i racen.",
    eye_phpv: "En medfødt øjendefekt (persisterende hyperplastisk primært glaslegeme, PHPV) kan forekomme i racen; opdrættere rådes til at få forældrenes øjne undersøgt.",
    certain_cancers: "Visse former for kræft kan forekomme i racen.",
    bare_skin_sun_cold: "Den nøgne hud hos den hårløse variant skal beskyttes mod sol og kulde.",
    l2hga_nervous_system:
      "L-2-hydroxyglutarsyreuri (L-2-HGA), en arvelig stofskiftesygdom der påvirker nervesystemet, kan forekomme i racen; der findes en DNA-test af forældrene.",
    short_face_breathing:
      "En race med moderat kort snude: nogle hunde med kortere snude kan få alvorlige vejrtrækningsproblemer (brachycefalt obstruktivt luftvejssyndrom, BOAS).",
    corneal_ulcers: "Øjenproblemer som sår på hornhinden er mere sandsynlige på grund af kraniets form og de fremstående øjne; der findes øjenundersøgelser.",
    skin_folds_allergies:
      "Hudproblemer som allergi, vorter, stilkvorter og ømme hudfolder i ansigtet (hudfoldsdermatitis) kan forekomme; folderne i ansigtet skal holdes rene og tørre.",
    heart_cardiomyopathy_aortic_stenosis: "Hjerteproblemer som kardiomyopati og aortastenose kan forekomme i racen.",
    dental_disease_care: "Et stort britisk studie nævner tandsygdom som det hyppigste problem i racen, og ejere rådes til at prioritere tandpleje.",
    bladder_stones: "Blæresten, ansamlinger af mineraler der dannes i blæren og urinen, kan forekomme i racen.",
    deafness: "Døvhed på det ene eller begge ører forekommer i racen; hvalpes hørelse kan undersøges med en BAER-test.",
    mitral_valve_disease:
      "Mitralklapsygdom, en hjertesygdom hvor en svækket klap lader blodet løbe tilbage i hjertet, forekommer i racen; en dyrlæge kan lytte på avlshundes hjerte før avl.",
    eye_problems_pra_cataracts_dry_eye:
      "Øjenproblemer forekommer i racen, fx progressiv retinal atrofi som langsomt kan føre til blindhed, grå stær og tørre øjne; der findes øjenundersøgelser.",
    skin_comedo_allergy:
      "Hudproblemer kan forekomme, fx schnauzer comedo syndrome (en form for betændte hårsække) og hudallergi (atopi) der giver kløe.",
    shorter_face_boas:
      "En brachycefal race (med kort snude): den kortere snude kan give alvorlige vejrtrækningsproblemer (brachycefalt obstruktivt luftvejssyndrom, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina:
      "Øjenproblemer forekommer i racen, fx tørre øjne, grå stær, progressiv retinal atrofi som langsomt kan føre til blindhed, og nethindeløsning.",
    hypothyroidism: "Lavt stofskifte (hypothyreose), som kan påvirke vægt, hud og energi, kan forekomme i racen.",
    open_fontanelle: "En åben fontanel, et blødt sted på kraniet der ikke lukker sig helt, kan forekomme i racen.",
    collapsing_trachea: "Kollaps af luftrøret, en svaghed i luftrøret der kan give hoste og åndedrætsbesvær, kan forekomme i racen.",
    gm1_gangliosidosis: "GM1-gangliosidose, en arvelig sygdom i nervesystemet, kan forekomme i racen; en DNA-test af forældrene kan udelukke den.",
    addisons_disease: "Addisons sygdom, hvor binyrerne danner for lidt hormon, kan forekomme i racen.",
    protein_losing_disease: "Sygdomme i nyrerne eller tarmen hvor kroppen taber protein, og som kan give diarré og vægttab, kan forekomme i racen.",
    diabetes_mellitus: "Sukkersyge (diabetes mellitus), hvor kroppen ikke kan styre blodsukkeret ordentligt, kan forekomme i racen.",
    dental_disease_home_brushing:
      "Som mange små hunde er racen disponeret for tandsygdom, så det anbefales at børste tænderne derhjemme med en hundetandbørste og hundetandpasta.",
    dermoid_sinus:
      "Dermoid sinus, en smertefuld tilstand hvor en kanal i huden på ryggen er forbundet med rygmarven, kan forekomme i racen; raceklubber har en ordning hvor hvalpe undersøges for dermoid sinus.",
    cataracts: "Grå stær, som gør øjets linse uklar og kan føre til synstab, kan forekomme i racen.",
    pra_inherited_blindness: "Progressiv retinal atrofi, en arvelig øjensygdom der langsomt kan føre til blindhed, kan forekomme i racen.",
    eyelids_turned: "Øjenlåg der ruller indad (entropion) eller udad (ektropion), kan forekomme i racen; spørg efter forældre med øjenundersøgelse.",
    glaucoma_poag:
      "Primær åbenvinklet glaukom, hvor der hober sig væske op i øjet, som giver smerter og muligvis blindhed, kan forekomme i racen; der findes en DNA-test til forældrene.",
    skin_fold_dermatitis: "Den løse hud danner folder der kan blive ømme og betændte; de skal tjekkes hver dag og holdes rene og tørre.",
    eyelid_problems:
      "Problemer med øjenlågene kan forekomme i racen: øjenlåg der ruller indad (entropion) eller udad (ektropion), og cherry eye, hvor det tredje øjenlåg springer frem.",
    skin_allergy_face_folds: "Hudallergi (atopi) der giver kløe, kan forekomme i racen, og hudfolderne i ansigtet skal renses hver dag.",
    skin_ear_allergies:
      "Miljøallergier kan forekomme i racen og kan føre til gentagne hud- eller øreinfektioner; PetMD foreslår at rense ørerne én gang om ugen hos en hund med allergi.",
    gum_disease_daily_brushing:
      "Racen er disponeret for tandkødssygdom (gingivitis og paradentose), så PetMD råder til at børste hundens tænder hver dag og få tænderne tjekket hos dyrlægen én gang om året.",
    pra_pk_def:
      "To arvelige sygdomme forekommer i racen: progressiv retinal atrofi, en øjensygdom der kan føre til blindhed, og pyruvatkinasemangel, en blodsygdom; med DNA-test af forældrene kan opdrættere undgå dem.",
    windpipe_collapse_breathing: "Kollaps af luftrøret, hvor luftrørets ringe falder sammen og gør det svært at trække vejret, kan forekomme i racen.",
    eye_problems_pra_cataracts_entropion:
      "Øjenproblemer forekommer i racen, fx progressiv retinal atrofi som langsomt kan føre til blindhed, grå stær, som gør linsen uklar, og øjenlåg der ruller indad (entropion); der findes øjenundersøgelser.",
    elbow_dysplasia_arthritis: "Albueledsdysplasi, et dårligt udviklet albueled der med tiden kan føre til slidgigt, kan forekomme i racen.",
    entropion: "Entropion, hvor øjenlågene ruller indad og irriterer øjet, kan forekomme i racen; spørg efter forældre med øjenundersøgelse.",
    autoimmune_conditions: "Autoimmune sygdomme, hvor kroppen reagerer mod sig selv, kan forekomme i racen.",
    ear_infections_prone: "Racen er disponeret for øreinfektioner; hold godt øje med ørehygiejnen.",
    familial_nephropathy: "En arvelig nyresygdom (familiær nefropati) forekommer i racen; der findes en DNA-test af forældrene.",
    hereditary_nephritis: "En arvelig nyresygdom (arvelig nefritis, også kaldet samojedisk arvelig glomerulopati) forekommer i racen.",
    panosteitis: "Panosteitis, en smertefuld betændelse i de lange knogler som oftest rammer unge hunde i vækst, kan forekomme i racen.",
    urinary_incontinence: "Urininkontinens, ufrivillig lækage af urin, kan forekomme i racen.",
    osteochondritis: "Osteochondritis dissecans (OCD), en forstyrrelse i ledbrusken hos hunde i vækst, kan forekomme i racen.",
    scottie_cramp: "Scottie cramp – korte anfald af muskelkramper, som regel udløst af ophidselse – forekommer i racen; det gør ikke ondt.",
    periodontal_disease: "Paradentose, en infektion og betændelse i tandkødet og det væv der holder tænderne fast, er et kendt problem i racen.",
    extra_eyelashes:
      "Distichiasis, hvor små ekstra øjenhår vokser på indersiden eller kanten af øjenlåget og kan gnide mod øjet, kan forekomme i racen; spørg efter forældre der er undersøgt i øjenordningen.",
    cm_sm_screening:
      "Chiari-lignende misdannelse og syringomyeli, en smertefuld tilstand med væskefyldte hulrum i rygmarven nær hjernen, kan forekomme i racen; opdrættere rådes til at screene forældrene (UK: BVA/KC-ordningen).",
    prominent_eyes_injury_dry_eye: "Fremstående øjne kommer lettere til skade og kan få sår og blive tørre; tørre øjne og cherry eye forekommer også i racen.",
    legg_perthes: "Legg-Perthes' sygdom, en smertefuld tilstand hvor hofteleddets knoglevæv dør og smuldrer, kan forekomme i racen.",
    glaucoma: "Grøn stær (glaukom), et forhøjet tryk i øjet der kan være smertefuldt og føre til blindhed, kan forekomme i racen.",
    lethal_acrodermatitis: "Letal akrodermatitis, en arvelig sygdom der giver alvorlige hud- og vækstproblemer hos hvalpe, forekommer i racen.",
    kidney_disease_urine_screening: "Nyreproblemer forekommer i racen; med urinprøver kan forældrene screenes før avl.",
    primary_lens_luxation:
      "Primær linseluksation, en smertefuld arvelig øjensygdom hvor linsen glider ud af sin plads, og som kan give blindhed, forekommer i racen; der findes en DNA-test til avlshunde.",
    inherited_ataxia:
      "Arvelige ataksier (sent indsættende ataksi og spinocerebellar ataksi), som giver tab af balance og koordination, forekommer i racen; der findes DNA-test til avlshunde.",
    hydrocephalus: "Hydrocephalus, en ophobning af væske omkring hjernen, kan forekomme i racen.",
    heart_disease_pda:
      "Hjertesygdom kan forekomme i racen, bl.a. persisterende ductus arteriosus, et blodkar ved hjertet der ikke lukker sig efter fødslen; en dyrlæge kan lytte efter det ved hvalpens første undersøgelse.",
    chiari_malformation: "Chiari-lignende misdannelse med syringomyeli, en smertefuld tilstand med væskefyldte hulrum i rygmarven nær hjernen, kan forekomme i racen.",
    cataracts_entropion:
      "Grå stær, som gør øjets linse uklar, og øjenlåg der ruller indad (entropion), kan forekomme i racen; spørg efter forældre der er undersøgt i øjenordningen.",
    periodontal_daily_brushing: "Racen er disponeret for paradentose, så det anbefales at børste tænderne hver dag med hundetandpasta.",
    eye_problems_shallow_sockets:
      "Øjenproblemer forekommer i racen, fx tørre øjne, øjeninfektioner og sår på øjets overflade; de flade øjenhuler gør også øjenskader mere sandsynlige.",
    eye_problems_dry_eye_entropion_lens_luxation:
      "Øjenproblemer forekommer i racen, fx tørre øjne, øjenlåg der ruller indad (entropion), og en linse der er gledet ud af sin plads (linseluksation); der findes øjenundersøgelser.",
    heart_valve_screening: "Hjertesygdom kan forekomme i racen; med hjertescanning kan forældrene undersøges for problemer med hjerteklapperne før avl.",
    dental_weight_problems:
      "Et stort britisk studie nævner tandsygdom og overvægt som særligt hyppige problemer i racen – problemer som ejere kan være med til at forebygge; tænder der står for tæt, og mælketænder der ikke falder ud, forekommer også.",
  },
  page: {
    eyebrow: "Dyreleksikon",
    // Search terms people use ("ragdollkat", "temperament"); "temperament" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "temperament, " : ""}motion, størrelse og pleje | PetPrep`
        : species === "cat"
          ? `${/kat$/i.test(name) ? name : /hår$/.test(name) ? `${name}skat` : /\s/.test(name) ? `${name}-kat` : `${name}kat`}: ${hasIntro ? "temperament, " : ""}pelspleje, størrelse og levetid | PetPrep`
          : `${name} (${lc(one)}): behov, levetid og pleje | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Kilder, sundhed og råd før køb.`,
    metaLabels: { weight: "vægt", exercise: "motion", lifespan: "levetid" },
    metaDescription: (name, one) =>
      `${name}: behovene for denne ${breedsOf(one, 1)} ifølge kilderne – motion, pelspleje, måltider, størrelse, levetid, hvem den passer til – og hvordan PetPrep simulerer den.`,
    suitabilityTitle: "Passer til",
    suitabilityNote: "De samme etiketter som i appen. Hver etiket understøttes af kilderne nederst på siden.",
    suitabilityNone: "Endnu ingen etiketter med kilder for denne race.",
    needsTitle: "Det har den brug for",
    needsIntro: (species) =>
      species === "cat"
        ? "Fra katteforbundenes raceregistre, veterinære organisationer og studier. Hvor kilderne er uenige, vises hver enkelt."
        : "Fra racestandarder, kennelklubber, dyrevelfærdsorganisationer og studier. Hvor kilderne er uenige, vises hver enkelt.",
    general: (many) => `Generelle retningslinjer for ${lc(many)} (ikke racespecifikke):`,
    noData: "Står endnu ikke i vores kilder.",
    simTitle: "Sådan simulerer PetPrep racen",
    simBadge: "Spilleregler, ikke dyrlægerådgivning",
    simIntro:
      "I PetPrep svarer en rigtig uge til en måned af kæledyrets liv. Det er de regler spillet bruger for denne race. PetPrep har valgt dem ud fra kilderne på denne side; de er ikke plejeråd til et rigtigt dyr.",
    simInfoOnly: "Denne race står kun i leksikonet til information; appen simulerer den ikke endnu.",
    simTable: { stage: "Livsfase", starts: "Begynder", meals: "Måltider om dagen", activity: { steps: "Dagligt skridtmål", play_sessions: "Leg om dagen" } },
    arrives: (m) => `flytter ind som ${m}${NB}${s(m, "måned", "måneder")} gammel`,
    fromMonth: (m, years) => (years ? `måned ${m} (${years})` : `måned ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `fra måned ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Hvert tal i spillet er en beslutning fra PetPrep, dokumenteret med sine kilder.",
    healthTitle: "Sundhed",
    healthNote: "Kun til information, ikke gennemgået af en dyrlæge. Spørg din dyrlæge om dit eget dyr.",
    healthNone: "Vores kilder indeholder endnu ingen racespecifikke sundhedsoplysninger om denne race.",
    checklistTitle: "Før du køber: det skal du tjekke hos opdrætteren",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Spørgsmål du skal have afklaret før du tager en killing med hjem. Punkterne er råd fra dyrlæger, dyreværnsorganisationer og katteforbund; hvert punkt angiver sin kilde."
        : "Spørgsmål du skal have afklaret før du tager en hvalp med hjem. Punkterne er råd fra dyrlæger, dyreværnsorganisationer og kennelklubber; hvert punkt angiver sin kilde.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Reglerne om minimumsalder, chipmærkning og vaccination er forskellige fra land til land – tjek hvad der gælder der hvor du bor.",
    checklistGeneralTitle: "For alle racer",
    checklistTestsTitle: "Forældrenes sundhedstest for denne race",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Test som et katteforbund kræver før en kat bruges i avl" : "Test som Royal Kennel Club anbefaler som minimum",
      best_practice: "Yderligere test efter bedste praksis",
      other_scheme: "Andre sundhedsordninger for denne race",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Listen stammer fra et udenlandsk katteforbunds avlsregler (se kilden) og er vejledende. Spørg opdrætteren hvilke test forældrene har fået lavet."
        : "Listerne stammer fra Royal Kennel Club i Storbritannien og er vejledende; nationale kennelklubber kan have deres egne, strengere regler. Spørg raceklubben og opdrætteren hvilke test forældrene har fået lavet.",
    checklistStatus: {
      none_recommended:
        "Royal Kennel Club angiver i øjeblikket ingen anbefalede sundhedsundersøgelser før avl for denne race. Spørg alligevel opdrætteren om forældrenes helbred.",
      not_found:
        "Vi har endnu ikke fundet en pålidelig kilde der angiver sundhedstest for forældrene til denne race. Spørg raceklubben og opdrætteren hvilke test forældrene har fået lavet.",
      not_checked: "Vi har endnu ikke gennemgået sundhedstestene for forældrene til denne race. Spørg raceklubben og opdrætteren hvilke test forældrene har fået lavet.",
    },
    sourcesTitle: "Kilder",
    sourcesIntro: "Hver oplysning på denne side henviser til en af disse kilder.",
    sourceLabel: (id, publisher) => `Kilde ${id}: ${publisher}`,
    disclaimer: "PetPrep er en simulering for familier. Denne side er ikke dyrlægerådgivning – spørg en dyrlæge eller raceklubben når det gælder et rigtigt dyr.",
    backTo: (many) => `Alle ${breedsOf(many, 2)}`,
    compareWith: "Sammenlign med andre racer",
    related: { title: "Lignende racer", intro: (many) => `Andre ${breedsOf(many, 2)} i leksikonet med lignende behov – alle med oplysninger fra kilderne.` },
    updated: "Opdateret",
    glanceTitle: "Kort fortalt",
    glanceNote: "De vigtigste fakta fra kilderne nederst på siden. Hvor kilderne er uenige, vises hver værdi.",
    portraitAlt: { ai_photo: (name) => `${name} – foto (AI)`, ai_illustration: (name) => `${name} – illustration (AI)` },
    portraitCaption: { ai_photo: "AI-genereret foto", ai_illustration: "AI-genereret illustration" },
    portraitColours: {
      legend: "Pelsfarve",
      alt: {
        ai_photo: (name, colour) => `${name}, ${lc(colour)} – foto (AI)`,
        ai_illustration: (name, colour) => `${name}, ${lc(colour)} – illustration (AI)`,
      },
    },
    share: {
      button: "Del",
      title: "Del denne race",
      copy: "Kopiér",
      copied: "Kopieret",
      linkLabel: "Link til denne side",
      more: "Flere muligheder",
      text: (name) => `${name}: behov, kilder og hvordan PetPrep simulerer racen`,
      emailSubject: (name) => `${name} – PetPreps dyreleksikon`,
      on: (network) => `Del på ${network}`,
    },
    og: { lead: "Behov, kilder og hvordan PetPrep simulerer racen", photoLabel: "AI-foto" },
    qa: {
      title: "Spørgsmål og svar",
      intro: "Besvaret udelukkende ud fra oplysningerne fra kilderne på denne side; hvert svar angiver sine kilder.",
      // Breed names are lower case in running text and all take "en" (en hund, en kat): "en schæferhund", "en maine coon".
      questions: {
        exercise: (n) => `Hvor meget motion har en ${mid(n)} brug for?`,
        lifespan: (n) => `Hvor længe lever en ${mid(n)}?`,
        size: (n) => `Hvor stor bliver en ${mid(n)}, og hvor meget vejer den?`,
        grooming: (n) => `Hvor meget pelspleje har en ${mid(n)} brug for?`,
        suits: (n) => `Hvem passer en ${mid(n)} til?`,
      },
      leads: {
        exercise: (n) => `Så meget motion har en ${mid(n)} brug for ifølge vores kilder:`,
        lifespan: (n) => `Levetiden for en ${mid(n)} ifølge vores kilder:`,
        size: (n) => `Størrelse og vægt for en voksen ${mid(n)} ifølge vores kilder:`,
        grooming: (n) => `Pels og pelspleje hos en ${mid(n)} ifølge vores kilder:`,
        suits: (n) => `Ifølge vores kilder passer en ${mid(n)} godt til:`,
      },
      considerLead: "Vær opmærksom på:",
      differ: "Kilderne angiver forskellige værdier, så hver enkelt er vist.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolsk hyrdehund er en stor, kraftigt bygget husdyrvogter fra Tyrkiet; FCI beskriver den tyrkiske hyrdehund som kangal (Kangal Shepherd Dog) — ensfarvet fra fawn til ulvegrå med sort maske, 72–78 cm høj for hanner og 65–73 cm for tæver. Den amerikanske racestandard angiver 110–150 pund (ca. 50–68 kg) for hanner og 80–120 pund (ca. 36–54 kg) for tæver. En hund af denne størrelse er udvokset ved cirka 18–24 måneder (PetMD); The Royal Kennel Club angiver en levealder på over 10 år og WebMD i gennemsnit 11 til 13 år.",
        "The Royal Kennel Club anbefaler mere end 2 timers motion om dagen og pelspleje mere end én gang om ugen, oplyser, at den fælder og passer til et stort hus med en stor have på landet, og placerer den i Breed Watch-kategori 1. PetMD skriver, at anatolske hyrdehunde nok passer bedst i hjem uden små børn, at hvalpe, der tidligt møder andre dyr, som regel kommer godt ud af det med dem, at tidlig socialisering er afgørende, at pelsen uden for de to årlige fældeperioder skal børstes ugentligt, og at motion omkring måltiderne bør undgås.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irsk rød setter, Irish Setter",
      text: [
        "Irsk setter (irsk rød setter) er en elegant, atletisk hønsehund fra Irland, avlet til at søge vidt i terrænet. FCI-standarden beskriver én farve — dyb kastanjerød uden spor af sort — og en højde på 58–67 cm for hanner og 55–62 cm for tæver; den amerikanske racestandard angiver omkring 70 pund (ca. 32 kg) som ideelt for en han og 60 pund (ca. 27 kg) for en tæve. En hund af denne størrelse er udvokset ved omkring 15–18 måneder (PetMD), og Royal Kennel Club angiver en levetid på over 10 år.",
        "Royal Kennel Club anbefaler mere end 2 timers motion om dagen og pelspleje mere end én gang om ugen, oplyser, at racen fælder og passer til et stort hus med stor have, og placerer den i Breed Watch-kategori 1. PDSA beskriver meget venlige, kærlige hunde, der kommer godt ud af det med børn og andre kæledyr, og anbefaler pelspleje 2-3 gange om ugen; PetMD anbefaler ugentlig kontrol og rengøring af ørerne og skriver, at irske settere har brug for meget menneskeligt selskab.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Brusselsk griffon, Brussels Griffon",
      text: [
        "Griffon bruxellois er en lille selskabshund fra Belgien med et kort, fladt ansigt. FCI-standarden beskriver en rød, naturligt hård, let bølget pels og en vægt på 3,5–6 kg; den britiske Royal Kennel Club, som har en ruhåret og en korthåret variant, beskriver den som en klog lille hund med et terrieragtigt temperament. En hund af denne størrelse er udvokset ved cirka 8–12 måneder (PetMD), og Royal Kennel Club angiver en levealder på over 12 år (PetMD: 12–15 år).",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og pelspleje mere end én gang om ugen, oplyser, at den fælder og egner sig til en lejlighed, og placerer racen i Breed Watch-kategori 2. PetMD beskriver en fladnæset (brachycefal) hund, der har svært ved varmt, fugtigt vejr, råder til at rense ansigtsfolderne cirka én gang om ugen og børste tænder dagligt og skriver, at griffon bruxellois under opsyn kommer godt ud af det med børn og andre kæledyr, men ikke bryder sig om at være alene længe.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, amerikansk rat terrier, Rat Terrier",
      text: [
        "Rat terrier er en lille amerikansk terrier, der avles i to størrelser – miniature og standard – med kort, tætsiddende, glat og blank pels. Racestandarden tillader en skulderhøjde på op til 18 tommer (46 cm), og PetMD angiver en vægt på 10–25 pund (omkring 4,5–11 kg) for begge størrelser; en hund af denne størrelse er udvokset ved omkring 9–12 måneder (PetMD). VCA angiver en levetid på 12–16 år, PetMD 12–18 år.",
        "Rat Terrier Club of America siger, at rat terriere er gode med børn, især hvis de vokser op med dem, og klarer sig i en lejlighed, men har brug for mindst 30 minutters motion om dagen. PetMD skriver, at de har brug for meget fysisk og mental stimulering, ikke kan lide at være alene længe og fælder lidt hele året; VCA anbefaler børstning en gang om ugen og advarer om, at de måske ikke passer sammen med små kæledyr, især gnavere.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grosser Schweizer Sennenhund, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Stor schweizisk sennenhund (hos FCI og i Storbritannien »Great Swiss Mountain Dog«) er en kraftig, grovknoglet og velmusklet trefarvet trækhund fra Schweiz: sort med symmetriske brune og hvide aftegninger. FCI-standarden angiver en skulderhøjde på 65–72 cm for hanner og 60–68 cm for tæver, men ingen vægt; WebMD angiver 52–64 kg for hanner og 39–50 kg for tæver. En hund af denne størrelse er udvokset ved omkring 18–24 måneder (PetMD), og Royal Kennel Club angiver en levetid på over 10 år (PetMD: 8–11 år).",
        "Royal Kennel Club anbefaler op til en times motion om dagen og børstning en gang om ugen og siger, at racen fælder og passer til et stort hus med stor have. PetMD kalder racen en fremragende familiehund, der er blid over for børn (al kontakt bør ske under opsyn), råder til at rense ørerne hver uge og ikke at motionere hunden lige før eller efter måltider på grund af risikoen for mavedrejning (GDV); WebMD råder til at børste tænderne dagligt og være sparsom med godbidder, da racen let bliver overvægtig.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    shar_pei: {
      aka: "kinesisk shar pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Shar pei (i USA »Chinese Shar-Pei«) er en aktiv, kompakt, kvadratisk bygget mellemstor hund fra Kina med kort, hård, børsteagtig pels i én ensfarvet farve (alle undtagen hvid), folder på hovedet og manken og en bred snude. Royal Kennel Clubs standard angiver en skulderhøjde på 46–51 cm og PDSA en vægt på 20–27 kg; en hund af denne størrelse er udvokset ved omkring 12–15 måneder (PetMD). Royal Kennel Club og PDSA angiver en levetid på over 10 år, men en VetCompass-undersøgelse af hunde i Storbritannien fandt en median på 7,3 år.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og børstning en gang om ugen og placerer racen i kategori 2 i Breed Watch på grund af problemer med øjenlåg og hudfolder. PDSA beskriver shar pei som loyale, hengivne familiehunde, der passer bedst til erfarne ejere og større børn, advarer om et stærkt jagtinstinkt over for mindre dyr og råder til at holde hudfolderne rene og tørre og lade der gå lidt tid mellem måltid og motion.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border collie er en mellemstor hyrdehund fra Storbritannien, avlet til udholdenhed og hårdt arbejde. Racestandarden beskriver en ivrig, opmærksom, lydhør og intelligent hund der hverken er nervøs eller aggressiv.",
        "Kennelklubber og dyrlæger er især enige om én ting: Det er en race med meget høj energi. Den har brug for mere end to timers motion hver dag og masser at tænke over. Når den keder sig eller får for lidt motion, finder den selv på opgaver – den tygger på alt hvad den kan nå, eller prøver at hyrde børn der leger.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador",
      text: [
        "Labrador retriever er en stor, kraftigt bygget jagthund fra Storbritannien, avlet til at apportere. Standarden beskriver en godmodig, venlig og tilpasningsdygtig kammerat der gerne vil gøre sin ejer tilfreds og elsker vand. Pelsen er kort og tæt og er sort, gul eller leverbrun/chokoladebrun.",
        "Britiske dyreværnsorganisationer beskriver labradoren som en familiehund der knytter sig til hele husstanden når den er godt socialiseret. Den er meget aktiv og stærkt motiveret af mad: Godbidder hjælper i træningen, men labradorer tager også let på.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden",
      text: [
        "Golden retriever er en stor jagthund fra Storbritannien med glat eller bølget pels i gyldne eller cremefarvede nuancer. Standarden beskriver en lydig, intelligent hund der er venlig, imødekommende og selvsikker.",
        "Britiske dyreværnsorganisationer kalder den en fremragende familiehund til en aktiv familie og en hund der kan være et godt valg som første hund. Ulemperne står klart i kilderne: mindst to timers motion om dagen, børstning flere gange om ugen og en pels der fælder meget.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "frenchie, French Bulldog",
      text: [
        "Fransk bulldog er en lille, robust selskabshund fra Frankrig med kort, glat pels og opretstående »flagermusører«. Standarden beskriver en social, livlig og legesyg hund; britiske dyreværnsorganisationer kalder den afslappet og tilpasningsdygtig og skriver at den som regel kommer godt ud af det med børn, hvilket har gjort den populær som familiehund.",
        "Den har brug for op til en times motion om dagen og egner sig til en lejlighed. Ulempen som alle kilder fremhæver, er det flade ansigt: Det kan gøre vejrtrækningen sværere, og franske bulldogger bliver hurtigt overophedede, især i varmt vejr – derfor er skygge, vand og rolige gåture vigtige. PDSA foreslår at familier også overvejer at adoptere en voksen fransk bulldog.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "schæfer, tysk schæferhund, German Shepherd Dog, Alsatian, GSD",
      text: [
        "Schæferhund er en stor, kraftfuld hyrdehund fra Tyskland med opretstående ører og en tæt dobbeltpels der kan være kort eller lang. Standarden beskriver en velafbalanceret, selvsikker hund med stærke nerver, og Royal Kennel Club kalder den en alsidig brugs- og tjenestehund, kendt for mod og intelligens.",
        "Den har brug for mindst to timers motion om dagen, egner sig til et stort hus med have og fælder meget. Britiske dyreværnsorganisationer skriver at nogle kan være fremragende familiehunde, men altid bør være under opsyn sammen med små børn. Royal Kennel Club beder opdrættere om at få forældredyrenes hofter og albuer undersøgt og nævner bagbenenes form som et opmærksomhedspunkt i racen.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "cavalier, CKCS",
      text: [
        "Cavalier king charles spaniel er en lille dværgspaniel fra Storbritannien med lange, fjerede ører og en lang, silkeagtig pels i fire farver: blenheim, ruby, black and tan og trefarvet. Standarden beskriver en aktiv, yndefuld hund med et blidt udtryk – sportslig, kærlig, venlig og frygtløs.",
        "Den har brug for omkring en times motion om dagen, kan bo i lejlighed og er kendt for at være god sammen med børn, men legen bør foregå under opsyn, og den bryder sig ikke om at være alene. Pelsen skal børstes mere end én gang om ugen. Britiske kilder nævner hjerteklapsygdom og en smertefuld lidelse i rygmarven der hænger sammen med kraniets form, som de vigtigste helbredsproblemer, og derfor bedes opdrættere hjerteundersøge og MR-scanne deres hunde.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Beagle er en lille sporhund fra Storbritannien, avlet til harejagt ved at følge et spor. Standarden beskriver en robust, kompakt bygget og munter hund – modig, aktiv og opmærksom, venlig og uden tegn på aggression eller frygtsomhed – med en kort, tæt pels i typiske støverfarver som trefarvet, tan og hvid eller citrongul og hvid og altid med hvid halespids.",
        "Den har brug for op til omkring en times motion om dagen og passer godt ind i familielivet hvis den bliver socialiseret fra ung, men den bør være under opsyn sammen med børn og ikke lades alene, for så kan den finde på at gø og tygge på ting. Den korte pels skal børstes én gang om ugen, men den fælder. Træningen bør begynde tidligt og bygge på belønning. Britiske dyrlæger ser oftest beagler på grund af vægtøgning og tandsygdom, så man skal holde øje med portionerne og tænderne.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "stor puddel, kongepuddel, Standard Poodle",
      text: [
        "Storpuddel er den største af puddelens fire størrelser, en selskabsrace fra Frankrig der nedstammer fra europæiske andejagthunde. Standarden beskriver en elegant, velafbalanceret hund med en stolt holdning – loyal, munter og godmodig, lærenem og let at træne – med en rigelig, kruset og krøllet pels i én farve: sort, hvid, brun, grå eller gul.",
        "Den har brug for op til omkring en times motion om dagen og egner sig til et stort hus med stor have. Med den rette socialisering som hvalp kommer den som regel godt ud af det med børn og andre kæledyr. Pelsen fælder ikke, men det gør ikke hunden allergivenlig: Den kræver daglig pelspleje og jævnlig klipning hos en professionel hundefrisør. Den er kendt for at være meget lydig og lære godt.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "pølsehund, Dachshund, Teckel",
      text: [
        "Gravhund er en tysk grævlinge- og kaninjæger, i hjemlandet kendt som teckel, der findes i flere størrelser og med tre pelstyper; denne side handler om standardstørrelsen med korthåret pels. Standarden beskriver en hund der er moderat lang i forhold til højden og uden overdrivelser – trofast, alsidig og godmodig; intelligent, livlig og modig – med en tæt, kort og glat pels i rød eller i sort eller chokoladebrun med tan aftegninger.",
        "Den har brug for op til omkring en times motion om dagen fordelt på et par gåture med tid til at snuse og egner sig til et lille hus. Den elsker mennesker og kommer som regel godt ud af det med børn i alle aldre, altid under opsyn, men på grund af sit stærke jagtinstinkt anbefales den ikke sammen med mindre kæledyr, og den trives ikke med at være alene. På grund af den lange ryg og de korte ben er den disponeret for diskusprolaps, så den bør ikke springe; opdrættere bedes undersøge ryggen før avl.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie",
      text: [
        "Australian shepherd er trods navnet en amerikansk race – en intelligent brugshund med stærke hyrde- og vogterinstinkter. Standarden beskriver en velafbalanceret, mellemstor hund, lidt længere end høj, godmodig og til tider reserveret ved første møde, med en mellemlang, glat til bølget pels i blue merle, sort, red merle eller rød, alle med eller uden hvide og tan aftegninger.",
        "Den har brug for mere end to timers motion om dagen og mentale udfordringer som hjernespil og træning og egner sig til et stort hus med stor have på landet. I den rette familie kan den være en rigtig god familiehund, men det stærke hyrdeinstinkt kan få den til at hyrde børn, så den anbefales ikke til familier med mindre børn. Den bryder sig ikke om at være alene, og pelsen skal børstes et par gange om ugen.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon Havanais, Havanese",
      text: [
        "Havaneser er en lille hund af bichonfamilien og Cubas nationalhund. Standarden beskriver en robust lille hund med korte ben, en meget lang, blød, glat eller bølget pels der aldrig trimmes, og en hale der bæres højt over ryggen. Den findes i gul, sort, havanabrun, tobaksbrun og rødbrun og sjældent i hvid, med eller uden pletter og tan aftegninger.",
        "Standarden kalder den kærlig, legesyg og endda lidt af en klovn og skriver at den elsker børn og kan lege med dem i det uendelige; britiske kilder kalder den en fremragende familiehund med den rette socialisering og let at træne. Den har brug for omkring 30 minutters motion om dagen, kan bo i lejlighed og fælder ikke – men den lange pels skal plejes hver dag for at undgå knuder og filt.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie",
      text: [
        "West highland white terrier, eller westie, er en lille terrier fra Storbritannien. Standarden beskriver en kraftigt bygget lille hund med dyb brystkasse, lige ryglinje og en hård dobbeltpels på omkring 5 cm, små, opretstående, spidse ører og mørke øjne under kraftige øjenbryn. Hvid er den eneste farve, standarden tillader.",
        "Standarden kalder den opmærksom, munter, modig og selvstændig, men venlig. Britiske kilder kalder den en kærlig og legesyg familiehund til børn i alle aldre når legen altid foregår under opsyn; den har brug for omkring en times motion om dagen, kan bo i lejlighed, fælder og skal børstes et par gange om ugen. På grund af sit jagtinstinkt bør den ikke bo sammen med mindre kæledyr, og den bryder sig ikke om at være alene. Huden er et kendt opmærksomhedspunkt: Royal Kennel Club beder dommere om at se efter tegn på hudbetændelse i racen.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berner, Bernese Mountain Dog",
      text: [
        "Berner sennenhund er en stor schweizisk gårdhund der oprindelig blev brugt som vagthund, trækhund og kvæghund i kantonen Bern. Standarden beskriver en stærk, adræt, langhåret brugshund med kraftige lemmer og en lang, skinnende, glat eller let bølget pels. Den eneste farve, standarden tillader, er trefarvet: kulsort med dyb tan på kinderne, over øjnene, på benene og brystet samt hvide aftegninger på hoved og bryst.",
        "Standarden kalder den selvsikker, godmodig og venlig og »en venlig og hengiven familiehund«, der modnes langsomt. Britiske kilder skriver at den har brug for op til en times motion om dagen, hører hjemme i et stort hus med stor have, fælder meget og skal børstes mere end én gang om ugen; den bør ikke være alene længe ad gangen. Den lever som regel mindre end ti år, og britiske kilder nævner hofte- og albueledsdysplasi, mavedrejning og visse kræftformer blandt racens helbredsproblemer.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky",
      text: [
        "Siberian husky er en mellemstor slædehund som FCI anerkender som en amerikansk race, og som Royal Kennel Club beskriver som den letteste og hurtigste af slædehundene. Standarden ønsker en hund der er hurtig og let på fødderne, med en mellemlang dobbeltpels, tykke, opretstående ører, brune eller blå øjne (ét af hver er tilladt) og en godt pelsklædt hale. Farverne spænder fra sort til helt hvid; merle og tigret er ikke tilladt.",
        "Standarden kalder den venlig og blid, opmærksom og udadvendt. Britiske kilder skriver at den har brug for mere end to timers motion om dagen, et stort hus med stor have og et meget sikkert, højt hegn fordi huskyer er kendt for at stikke af; den fælder meget, skal børstes et par gange om ugen og har svært ved at være alene. PDSA foreslår den til hjem med kun voksne eller med teenagere frem for familier med mindre børn og nævner hofteledsdysplasi, øjenproblemer og epilepsi blandt racens helbredsproblemer.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Rottweiler er en mellemstor til stor, kraftfuld brugshund fra Tyskland. Standarden beskriver en robust hund, hverken tung eller let, med en kort, grov, tætliggende pels, mellemstore hængende ører og mørkebrune, mandelformede øjne. Den eneste tilladte farve er sort med klart afgrænsede, dybt tanfarvede aftegninger på kinder, snude, strube, bryst og ben; hvide aftegninger er en fejl.",
        "Standarden kalder den godmodig, rolig, meget hengiven, lydig og arbejdsivrig, og Royal Kennel Club skriver at en veltrænet rottweiler er en vidunderlig familiehund. Britiske kilder skriver at den har brug for mere end to timers motion om dagen, et stort hus med stor have og en erfaren ejer fordi den er så kraftfuld; den bør socialiseres fra ung. PDSA anbefaler den ikke til familier med mindre børn og babyer, og den bør aldrig være alene uden opsyn sammen med andre kæledyr. Det er nok at børste den én gang om ugen. Den lever som regel mindre end ti år, og Royal Kennel Club holder øje med bagbenenes form.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "engelsk bulldog, English Bulldog, British Bulldog",
      text: [
        "Bulldog er en mellemstor, glathåret hund fra Storbritannien: temmelig undersætsig, lav, bred, kraftfuld og kompakt, med et relativt kort ansigt, små, tynde roseører og runde, meget mørke øjne. Standarden tillader helfarver som rød, gul, lysebrun og hvid samt tigret og broget; sort og sort med tan er meget uønsket. Den kræver store, vidt åbne næsebor og skriver at hunde med åndedrætsbesvær er meget uønskede.",
        "Standarden kalder den opmærksom, modig, loyal, pålidelig og frygtløs, barsk af udseende, men kærlig, og Royal Kennel Club skriver at den stadig er meget populær som familiehund på grund af sit væsen og sin loyalitet. Britiske kilder skriver at den har brug for op til en times motion om dagen, aldrig på dagens varmeste tidspunkt, og at den kommer godt ud af det med husstandens andre kæledyr hvis den socialiseres som ung; pelsen skal plejes én gang om ugen, men rynkerne i ansigtet skal rengøres dagligt. PDSA beskriver den som en race med et meget fladt ansigt der med stor sandsynlighed får alvorlige helbredsproblemer som vejrtrækningsbesvær, og anbefaler kraftigt at overveje en sundere race, en krydsning eller en blandingshund. Den lever som regel mindre end ti år.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "hønsehund, GSP, German Shorthaired Pointer, Deutsch Kurzhaar",
      text: [
        "Korthåret hønsehund er en alsidig jagthund fra Tyskland, bygget til arbejde i mark og vand, med en kort, tyk pels der føles ru, brede, flade og højt ansatte ører og mørkebrune, mandelformede øjne. Den amerikanske standard tillader ensfarvet leverbrun, leverbrun og hvid (fx stænket), ensfarvet sort og sort og hvid; røde, orange, citrongule eller tanfarvede partier og en helt hvid hund diskvalificerer. Standarden beskriver en kuperet hale – PetPrep viser altid hunden med naturlig hale.",
        "Standarden kalder den venlig, intelligent og villig til at samarbejde. Royal Kennel Club og PDSA skriver at den har brug for mere end to timers motion om dagen; PDSA tilføjer at dens instinkt for at jage, stå for og apportere vildt kan tage over på gåturen, så den har brug for et godt indkald, og at den er forholdsvis let at træne. Pelsen skal plejes en eller to gange om ugen, og den fælder moderat. En stor britisk undersøgelse angiver dens mediane forventede levetid til 13,4 år.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "yorkie",
      text: [
        "Yorkshire terrier er en lille dværgterrier fra Storbritannien der ifølge racestandarden vejer op til 3,2 kg, med en lang, helt glat, skinnende og silkeagtig pels som hænger jævnt ned på begge sider fra en skilning langs ryggen. Standarden tillader én farve: mørk stålblå fra baghovedet til halen og en dyb, klar tan på hoved, bryst og ben; de små, V-formede ører bæres opretstående. Standarden beskriver både kuperet og ukuperet hale – PetPrep viser altid hunden med naturlig hale.",
        "Standarden kalder den opmærksom, intelligent og livlig med et ligevægtigt temperament. Royal Kennel Club anbefaler op til 30 minutters motion om dagen og daglig pelspleje; PDSA tilføjer at den elsker at løbe, apportere og lege, kan være ret stædig at træne og passer bedre til familier med større børn fordi dens knogler er meget skrøbelige. En stor britisk undersøgelse fandt at tandsygdom er det hyppigste problem i racen, opfordrer til daglig tandpleje som tandbørstning og fandt en median dødsalder på 13,56 år.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italian Corso Dog",
      text: [
        "Cane corso er en mellemstor til stor italiensk molosser, en robust og kraftig hund med en vis elegance der er lidt længere end høj. Standarden beskriver en kort, skinnende og meget tæt pels i sort, grå nuancer, gul eller rød med mørk maske, mørk hvedefarvet eller tigret; store hvide pletter er ikke tilladt. Efter den gældende FCI-standard er ørerne ukuperede og halen naturlig – og i Storbritannien er kupering af ører og hale ulovlig – så PetPrep viser altid hunden med naturlige ører og hale.",
        "Standarden kalder den vogter af ejendom, familie og husdyr, yderst adræt og lydhør. PDSA skriver at den er social og kærlig over for sine ejere, har brug for omkring to timers motion om dagen og noget at give sig til fordi den hader at kede sig, og at den på grund af sin størrelse passer bedre til erfarne ejere. PDSA anbefaler ikke racen til hjem med små børn, som den kan vælte; den passer til hjem med kun voksne eller familier med større børn. Det er nok at børste den én gang om ugen, men den fælder og er kendt for at savle. PDSA angiver dens gennemsnitlige levetid til under ti år.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, Pembroke Welsh Corgi",
      text: [
        "Welsh corgi pembroke er en lille kvæghund fra Wales, lavstillet, stærk og kraftigt bygget, så den giver et indtryk af substans og udholdenhed på lidt plads. Standarden beskriver en mellemlang, glat pels med tæt underuld i rød, zobel, gul eller sort med tan, med eller uden hvide aftegninger på ben, bryst og hals, og opretstående ører. Halen blev tidligere traditionelt kuperet; standarden beskriver også den naturlige hale, og PetPrep viser altid hunden med naturlig hale.",
        "Standarden kalder den modig, arbejdsom, udadvendt og venlig. Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje mere end én gang om ugen; PDSA beskriver venlige, glade og legelystne hunde der gerne vil samarbejde og er forholdsvis lette at træne, men skriver at de kan finde på at nappe børn i hælene når de løber, så socialisering med børn og træning fra ung hjælper. Royal Kennel Club angiver dens levetid til over 12 år og beder opdrættere om at få forældredyrenes hofter undersøgt.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "Dobermann er en tysk selskabs-, beskyttelses- og brugshund af mellemstørrelse, stærk og muskuløst bygget, med elegante linjer og en stolt holdning. FCI-standarden beskriver en kort, hård og tæt pels der ligger tæt og glat, i sort eller brun med klart afgrænsede rustrøde aftegninger; hvide pletter er ikke tilladt. Efter FCI-standarden er ører og hale naturlige, og PetPrep viser altid hunden med naturlige ører og hale.",
        "Standarden kalder den venlig og rolig og meget hengiven over for familien. Royal Kennel Club skriver at dens loyale og lydige væsen gør den til en fremragende familiehund, og anbefaler mere end to timers motion om dagen og pelspleje én gang om ugen. PDSA tilføjer at den er meget energisk, har brug for masser af mental og fysisk aktivitet og tidlig socialisering og – på grund af sin store størrelse og kraftige bygning – ikke anbefales til familier med små børn eller til førstegangsejere. Royal Kennel Club angiver dens levetid til over 10 år.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "tysk boxer, German Boxer, Deutscher Boxer",
      text: [
        "Boxer er en tysk brugs- og selskabshund af mellemstørrelse med kvadratisk bygning, kraftige knogler og veludviklede muskler. Standarderne beskriver en kort, skinnende og glat pels i gul eller tigret med sort maske; hvide aftegninger er tilladt, men bør ikke dække mere end en tredjedel af pelsen. Snuden skal være bred og dyb, aldrig kort, med store næsebor. Halen blev tidligere traditionelt kuperet; standarden beskriver også den ukuperede hale, og PetPrep viser altid hunden med naturlige ører og hale.",
        "Standarden kalder den ligevægtig, lydig, frygtløs og selvsikker. Royal Kennel Club kalder den meget elsket som familiehund og anbefaler mere end to timers motion om dagen og pelspleje én gang om ugen. PDSA beskriver en meget energisk, legesyg hund der elsker menneskers selskab og kan udvikle separationsangst hvis den lades alene, har et meget stærkt jagtinstinkt og – på grund af sin størrelse og sit vilde temperament – ikke anbefales til hjem med mindre børn eller til førstegangsejere; nogle boxere med kortere ansigt kan få alvorlige vejrtrækningsproblemer. Royal Kennel Club angiver dens levetid til over 10 år.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Miniature Schnauzer",
      text: [
        "Dværgschnauzer er en lille tysk selskabshund: stærk, undersætsig og næsten kvadratisk, med en hård, strid og tæt pels, buskede øjenbryn og skæg. FCI-standarden tillader peber og salt, sort med sølv, helt sort og helt hvid; PetPrep viser de tre første. Halen blev tidligere traditionelt kuperet og ørerne undertiden også; FCI-standarden kræver naturlig hale og hængende ører, og PetPrep viser altid hunden med naturlige ører og hale.",
        "FCI regner den som familie- og selskabshund, og Royal Kennel Club skriver at den er meget populær som selskabshund. Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje mere end én gang om ugen og skriver at den ikke fælder. PDSA beskriver en legesyg og nysgerrig hund der kan komme godt ud af det med børn hvis den møder dem tidligt, kan være stædig i træningen og skal børstes to til tre gange om ugen og ind imellem klippes eller trimmes af en professionel hundefrisør. Royal Kennel Club angiver dens levetid til over 10 år.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Shih tzu er en lille selskabshund fra Tibet; Storbritannien varetager dens FCI-standard. Standarderne beskriver en robust hund med rigelig pels, stolt holdning og et ansigt der minder om en »krysantemum«: lang, tæt dækpels, store, mørke, runde øjne, store hængende ører og en hale med rig fane der bæres over ryggen. Standarderne tillader mange farver; PetPrep viser guld og hvid, sort og hvid samt leverbrun og hvid og aldrig merle. Snuden er kort og flad, og PDSA nævner vejrtrækningsproblemer på grund af det kortere ansigt, så PetPrep tegner altid et moderat ansigt med åbne næsebor.",
        "FCI beskriver den som intelligent, aktiv og opmærksom, venlig og selvstændig. Royal Kennel Club anbefaler op til en times motion om dagen og daglig pelspleje og nævner en lejlighed som et passende hjem. PDSA skriver at shih tzu kan være en godmodig familiehund hvis den har fået den rette socialisering og træning, kalder den et ideelt kæledyr for førstegangsejere, råder til altid at holde opsyn med den sammen med børn og anbefaler for de fleste familiehunde daglig børstning og en klipning hos en professionel hundefrisør hver sjette til ottende uge. Royal Kennel Club angiver dens levetid til over 10 år.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deutsche Dogge, Great Dane",
      text: [
        "Grand danois er en tysk kæmpe: FCI-standarden skriver at den forener en stor, kraftfuld og velbygget krop med stolthed, styrke og elegance, med et langt, smalt hoved, naturligt hængende ører og en meget kort, glat og skinnende pels. Standarderne nævner gul og tigret – helst med sort maske – samt harlekin, sort og blå; PetPrep viser kun farver som både FCI og Royal Kennel Club anerkender, aldrig merle eller mantel, og tegner altid hunden med naturlige ører og hale og tætsluttende øjenlåg fordi Royal Kennel Club beder dommere om at holde øje med øjenlåg der vender ind- eller udad, og med dårlige bagben.",
        "FCI kalder den venlig, kærlig og hengiven over for sine ejere, men muligvis reserveret over for fremmede. Royal Kennel Club skriver at den trods sin størrelse er en vidunderlig familiehund, og anbefaler mere end to timers motion om dagen, et stort hus med have og pelspleje én gang om ugen. PDSA skriver at grand danois er kendt for at savle, har et ret stærkt jagtinstinkt og ikke anbefales til hjem med mindre børn på grund af sin størrelse og styrke; PDSA råder til at holde en pause mellem måltid og motion for at hjælpe med at forebygge mavedrejning. Royal Kennel Club angiver dens levetid til under 10 år.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pom, dværgspids, Zwergspitz",
      text: [
        "Pomeranian er den mindste spids: FCI fører den som dværgvarianten af tysk spids, 21 cm ± 3 cm i skulderhøjde, og Royal Kennel Clubs standard beskriver en kompakt, kortkoblet lille hund med rævelignende hoved, små, opretstående ører og en hale der bæres over ryggen. Dobbeltpelsen har en blød, luftig underuld og en lang, glat dækpels der danner en krave om halsen. Standarden tillader mange helfarver som orange, creme, hvid, sort og brun, men aldrig merle; PetPrep tegner en naturlig, utrimmet pels.",
        "FCI kalder dens væsen selskabeligt og muntert, og Royal Kennel Clubs standard kalder den udadvendt, livlig og intelligent. Royal Kennel Club anbefaler op til 30 minutters motion om dagen og finder den egnet til en lejlighed; PDSA skriver at dobbeltpelsen skal børstes to til tre gange om ugen. AKC skriver at pomeranian som regel passer bedre til familier med større børn, kan komme godt ud af det med andre dyr hvis den socialiseres tidligt, og anbefaler stærkt tidlig socialisering og hvalpehold. Royal Kennel Club angiver dens levetid til over 12 år.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, American Gentleman",
      text: [
        "Boston terrier kommer fra USA. FCI-standarden beskriver en livlig, meget intelligent, glathåret og korthovedet hund, kompakt bygget, med kort hale og velafbalanceret, tigret, seal eller sort og jævnt tegnet med hvidt: Et hvidt bånd om snuden, en hvid blis mellem øjnene og et hvidt forbryst er påkrævet, og tigret foretrækkes. PetPrep tegner den tigret og hvid med moderat snude, åbne næsebor og naturlige ører og hale.",
        "Det er en race med fladt ansigt (brachycefal), og PDSA advarer om at den aldrig bør motioneres på dagens varmeste tidspunkt fordi den let bliver overophedet. Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje én gang om ugen, finder den egnet til en lejlighed og angiver dens levetid til over 10 år. PDSA kalder boston terrieren en perfekt familiehund der er særlig god med børn når den er godt socialiseret som hvalp; AKC skriver at den trives med børn der ved hvordan man er blid over for dyr, og at den ikke har det godt med at være alene i lange perioder, og anbefaler kraftigt tidlig socialisering og hvalpetræning.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "Miniature american shepherd kommer fra USA. FCI-standarden beskriver en lille hyrdehund med stærke hyrde- og vogterinstinkter, intelligent og først og fremmest en brugshund, lidt længere end høj, med en mellemlang, glat til bølget og vejrbestandig pels. Farverne er sort, blue merle, rød og red merle, med eller uden hvide og tan aftegninger, og øjnene kan være brune, blå, nøddebrune eller ravfarvede. PetPrep tegner den i blue merle med naturlig hale.",
        "PetMD skriver at den har masser af energi og har brug for mindst en times motion hver dag, helst to, og opgaver der holder hovedet beskæftiget, og at den bør børstes et par gange om ugen; AKC skriver at ugentlig børstning er nok det meste af året, med daglig børstning i fældeperioden. AKC skriver at den kan blive en fremragende familiehund med lydighedstræning og tidlig socialisering og som regel er god med børn, men kan prøve at hyrde dem; PetMD tilføjer at dens hengivenhed over for familien kan føre til separationsangst når den er alene. PetMD angiver dens levetid til 12–13 år.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chi, Chihuahueño, korthåret chihuahua",
      text: [
        "Chihuahua kommer fra Mexico. Kennel Club-standarden beskriver en lille, nydelig og kompakt hund med et kækt udtryk og et muntert, livligt og intelligent temperament, et velafrundet, »æbleformet« kranium, en moderat kort, let spids snude, store, runde øjne der ikke er fremstående, store ører og en seglformet hale; alle farver og farvekombinationer er tilladt, men aldrig merle, og den foretrukne vægt er 1,8–2,7 kg. Royal Kennel Club regner den korthårede og den langhårede chihuahua som to racer; PetPrep tegner den korthårede i gul med et moderat hoved.",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og pelspleje én gang om ugen, finder den egnet til en lejlighed og angiver dens levetid til over 12 år. PDSA skriver at chihuahuaen er så lille og let at børn fristes til at løfte den op, hvilket den næppe bryder sig om, så den passer bedre til familier med lidt større børn. PDSA tilføjer at den som selskabshund elsker selskab og har brug for at der altid er nogen hjemme, og at den bør socialiseres fra ung med mange forskellige mennesker, oplevelser og steder.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer, ESS",
      text: [
        "Engelsk springer spaniel kommer fra Storbritannien, hvor den blev avlet til at finde, opjage og apportere vildt. Kennel Club-standarden beskriver en symmetrisk bygget, kompakt, stærk, munter og aktiv hund – den mest højbenede af de britiske landspaniels – med et venligt, glad og lydigt temperament, lange, fjerede ører, mørke nøddebrune øjne og en tætliggende, glat og vejrbestandig pels; farverne er leverbrun og hvid eller sort og hvid, begge evt. med tan aftegninger, og skulderhøjden er omkring 51 cm. PetPrep tegner den leverbrun og hvid med naturlig hale.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje mere end én gang om ugen og angiver dens levetid til over 10 år. PDSA skriver at springere er gode familiehunde der kommer godt ud af det med børn og husstandens andre kæledyr, er lydige og lærevillige og skal plejes en eller to gange om ugen og klippes hver 3. måned. AKC tilføjer at de ikke bør være alene i lange perioder, og at tidlig socialisering og hvalpetræning er afgørende.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltie, Shetland Collie (tidligere navn)",
      text: [
        "Shetland sheepdog kommer fra Storbritannien og er en lille, langhåret brugshund. FCI-standarden beskriver en opmærksom, blid, intelligent, stærk og aktiv hund, kærlig og loyal over for sin ejer og reserveret over for fremmede, med et hoved som en lang, stump kile, små, halvt opretstående ører med fremadfaldende spidser og en dobbeltpels med lang, hård dækpels; farverne er zobel, trefarvet, blue merle, sort og hvid samt sort og tan, og den ideelle skulderhøjde er 37 cm for hanner og 35,5 cm for tæver. PetPrep tegner den zobel og hvid.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og daglig pelspleje og angiver dens levetid til over 10 år. PDSA skriver at shelties er meget blide, legesyge og lydige hunde der ofte passer godt ind i familielivet og kommer fint ud af det med børn, og at træning og socialisering er meget vigtige i en ung alder. AKC tilføjer at de har brug for regelmæssig mental og fysisk aktivitet, på grund af deres hyrdeinstinkt trives bedst med større børn og er kendt for at være meget glade for at bruge stemmen.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Brittany, Brittany Spaniel",
      text: [
        "Epagneul breton – på engelsk brittany – er en stående jagthund fra Frankrig. Royal Kennel Club beskriver en meget energisk, intelligent hund der søger, står for og apporterer vildt, blid og kærlig, men fuld af liv og livsglæde, med en tæt, temmelig fin pels, højt ansatte, trekantede ører og en hale der ofte er naturligt kort; standardfarverne er orange, leverbrun eller sort med hvidt, skimmel eller trefarvet, og skulderhøjden er 48–51 cm for hanner og 47–50 cm for tæver. PetPrep tegner den orange og hvid.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje mere end én gang om ugen og angiver dens levetid til over 10 år. AKC skriver at epagneul breton er en meget energisk hund der har brug for masser af motion og mental stimulering, er blid og som regel tålmodig med børn, og at ugentlig børstning holder den flot. PetMD tilføjer at tidlig socialisering af hvalpe er et must, at den ikke har det godt med at være alene i lange perioder, og at den som avlet til fuglejagt har et stærkt jagtinstinkt.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (USA), American Cocker",
      text: [
        "Amerikansk cocker spaniel – i USA blot cocker spaniel – er en anden race end engelsk cocker spaniel. AKC-standarden kalder den det mindste medlem af jagthundegruppen (Sporting Group), med lange, lapformede, rigt fjerede ører, et afrundet kranium, en bred, dyb snude og en silkeagtig pels der er glat eller let bølget; den findes i sort, i alle ensfarvede nuancer fra den lyseste creme til den mørkeste røde og i flerfarvet med hvidt. Standarden kræver et ligevægtigt temperament uden antydning af frygtsomhed.",
        "Royal Kennel Club anbefaler daglig pelspleje og mere end to timers motion om dagen og angiver dens levetid til over 10 år; AKC og PetMD skriver at den ikke har brug for meget motion. PetMD kalder disse søde hunde fremragende familiehunde, venlige over for mennesker og andre dyr, og råder til at begynde socialisering og træning tidligt; VCA skriver at de som regel er meget gode med børn, har tendens til overvægt og skal have ørerne tjekket hver uge.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, Belgian Shepherd Dog (Malinois)",
      text: [
        "Belgisk hyrdehund malinois er den korthårede variant af belgisk hyrdehund, en hyrderace fra Belgien. FCI-standarden beskriver en harmonisk proportioneret hund der forener elegance og kraft, og tillader kun én farve: gul med sort overdækning og sort maske. FCI- og AKC-standarderne beskriver temmelig små, opretstående, trekantede ører, en kort, hård pels med tæt underuld og et opmærksomt, intelligent, nysgerrigt og selvsikkert temperament.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje mere end én gang om ugen og angiver dens levetid til over 10 år. AKC skriver at den ikke er et godt valg for førstegangshundeejere, trives bedst med større, ansvarlige børn og ikke bør være alene længe ad gangen; PetMD nævner et stærkt jagtinstinkt, at den kan prøve at hyrde børn, og at den har brug for vedvarende daglig træning og tidlig socialisering.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset",
      text: [
        "Basset hound er en kortbenet sporhund fra Storbritannien. FCI-standarden beskriver en hund med betydelig substans, velafbalanceret, rolig, aldrig aggressiv eller frygtsom og kærlig, med lavt ansatte, lange, fløjlsbløde ører, en glat, kort pels og farverne sort, hvid og tan eller citrongul og hvid. Royal Kennel Clubs Breed Watch beder udstillingsdommere om at holde øje med øjenlåg der vender ind- eller udad, meget lange ører, ømme hudfolder og overskydende hud.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje én gang om ugen og angiver dens levetid til over 10 år. PDSA beskriver en tolerant hund der kommer rigtig godt ud af det med børn og elsker selskab, og som har en sund appetit, man skal holde øje med; PDSA råder til at tjekke hudfolderne hver dag og holde en pause mellem måltid og motion. AKC tilføjer at næsen kan lokke den på afveje, så en sikker line og indhegnede områder er vigtige.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vizsla, magyar vizsla, Hungarian Vizsla",
      text: [
        "Korthåret vizsla er en mellemstor, elegant jagthund fra Ungarn med kort, rustrød-gylden pels. FCI-standarden beskriver en livlig, venlig hund med et ligevægtigt temperament der er let at træne og holder tæt kontakt med sin fører; farverne er nuancer af rustrød-gylden og mørk sandgylden. Royal Kennel Clubs Breed Watch nævner ingen opmærksomhedspunkter der er specifikke for racen.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje én gang om ugen og angiver dens levetid til over 12 år. PDSA beskriver en meget menneskeorienteret hund der elsker selskab og kan lide af separationsangst når den er alene; den kommer godt ud af det med større børn, men PDSA vil ikke anbefale den sammen med meget små børn eller til førstegangsejere, og på grund af det stærke jagtinstinkt fraråder PDSA at holde den sammen med mindre kæledyr. PDSA råder også til at holde en pause mellem måltid og motion.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "cocker, Cocker Spaniel (UK), English Cocker, Merry Cocker",
      text: [
        "Engelsk cocker spaniel – i Storbritannien blot cocker spaniel – er en anden race end amerikansk cocker spaniel. FCI-standarden beskriver en munter, robust jagthund, velafbalanceret og kompakt, med lavt ansatte, lapformede ører og en glat, silkeagtig pels; AKC-standarden kalder den munter og kærlig med et ligevægtigt sind og nævner ensfarvet sort, leverbrun og røde nuancer samt flerfarvet med hvidt. Royal Kennel Clubs Breed Watch nævner ingen opmærksomhedspunkter der er specifikke for racen.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og daglig pelspleje og angiver dens levetid til over 10 år; en VetCompass-undersøgelse af engelske cocker spaniels i Storbritannien fandt en median dødsalder på 11,44 år. PDSA skriver at den takket være sit tålmodige væsen som regel kommer godt ud af det med børn, altid under opsyn, men advarer om at den er kendt for separationsangst og aldrig bør være alene i mere end fire timer. PDSA råder også til daglig børstning og en pause mellem måltid og motion.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "maltesisk hund, Bichon Maltais, Maltese Terrier",
      text: [
        "Malteser er en lille selskabshund fra det centrale Middelhavsområde, som i dag hører under Italien i FCI. FCI-standarden beskriver en lille hund med en lidt langstrakt krop, livlig, kærlig, meget rolig og meget intelligent, med en vægt på 3–4 kg og meget langt, tæt og silkeagtigt hår der falder tungt ned over hele kroppen. Pelsen har ingen underuld, og helt hvid er den eneste farve (et lyst elfenbensskær er tilladt). Royal Kennel Clubs Breed Watch nævner ingen opmærksomhedspunkter der er specifikke for racen.",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og daglig pelspleje, skriver at racen ikke fælder, og angiver dens levetid til over 12 år. PDSA beskriver en kvik, venlig og kærlig hund der kan være reserveret over for fremmede, men med den rette socialisering som ung kan lære at blive selvsikker og social. PetMD advarer om at den kan udvikle separationsangst hvis den er alene for længe, skriver at samvær med små børn skal foregå under opsyn, og råder til at børste dens tænder hver dag.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Carlin",
      text: [
        "Mops er en lille selskabshund fra Kina, som i dag hører under Storbritannien i FCI. FCI-standarden beskriver en udpræget kvadratisk og kompakt hund – »multum in parvo« – med stor charme, værdighed og intelligens og et ligevægtigt, glad og livligt sind, en idealvægt på 6,3–8,1 kg, en fin, glat, kort og skinnende pels i sølv, abrikos, gul eller sort og en hale der er tæt krøllet over hoften. Den kræver temmelig store, godt åbne næsebor og finder sammenklemte næsebor og en kraftig rynke over næsen uacceptable. Royal Kennel Club placerer racen i Breed Watch kategori 3 med opmærksomhedspunkter der blandt andet omfatter vejrtrækningsbesvær, fremstående øjne, betændelse i hudfolderne og overvægt.",
        "PDSA kalder mopsen en race med et meget fladt ansigt (stærkt brachycefal), der let bliver forpustet, råder til at undgå motion i varme og skriver at deres dyrlæger kraftigt vil anbefale en race med normal snude eller en mopskrydsning i stedet. Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje én gang om ugen, skriver at racen fælder, og angiver dens levetid til over 10 år. PDSA beskriver en hund der ofte kommer godt ud af det med børn og andre kæledyr, men elsker selskab og ikke trives med at være alene; PetMD råder til at rengøre og tørre hudfolderne i ansigtet hver dag og nævner at overvægt er almindelig i racen.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "collie, Rough Collie, Long-haired Collie",
      text: [
        "Langhåret collie er en stor hyrdehund fra Storbritannien. FCI-standarden beskriver en hund af stor skønhed der står med upåvirket værdighed, har et venligt sind uden spor af nervøsitet eller aggressivitet, en meget tæt pels med glat, hård dækpels og tre farver: zobel, trefarvet og blue merle. Royal Kennel Clubs standard kalder den en fremragende selskabshund, venlig, glad og aktiv, god med børn og andre hunde, og angiver skulderhøjden til 56–61 cm for hanner og 51–56 cm for tæver. Royal Kennel Club placerer racen i Breed Watch kategori 2 og registrerer ikke hvalpe fra parringer mellem to merlehunde.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og daglig pelspleje, skriver at racen fælder, og angiver dens levetid til over 12 år. PetMD skriver at collier er kærlige, især over for børn, og gode med andre dyr, men ikke har det godt med at være alene i længere tid og kan finde på at nappe i ankler og hæle når de bliver ophidsede. PetMD nævner også at socialisering af hvalpen er afgørende, og at MDR1-mutationen, som påvirker hvordan en hund omsætter visse lægemidler, forekommer hos collier.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "engelsk mastiff, English Mastiff, Old English Mastiff",
      text: [
        "Mastiff er en meget stor vogterrace fra Storbritannien. FCI-standarden beskriver en kombination af storhed og mod – rolig, kærlig over for sine ejere, men i stand til at vogte – med et hoved der ser kvadratisk ud, en bred, dyb og kraftfuld krop og en kort, tætliggende pels i abrikos, gul eller tigret. PDSA angiver en gennemsnitlig skulderhøjde på 71–78 cm og en gennemsnitlig vægt på 80–85 kg og nævner at Kennel Club placerer mastiffen i kategori 3: racer med synlige problemer i bygningen som kan give smerter, ubehag eller helbredsproblemer.",
        "PDSA anbefaler omkring en times motion om dagen for voksne hunde – men ikke for meget motion mens hvalpens knogler og led stadig udvikler sig – pelspleje én gang om ugen med daglig rengøring af rynkerne i ansigtet og angiver en gennemsnitlig levetid på under 10 år. PetMD kalder mastiffer fremragende familiehunde til hjem med børn der forstår at omgås dyr, men måske ikke sammen med tumlinger eller babyer på grund af deres størrelse; de trives som regel med andre kæledyr som de har mødt som hvalpe, savler meget og bør ikke motioneres en time før og efter måltider på grund af risikoen for mavedrejning.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba inu, Japanese Shiba Inu",
      text: [
        "Shiba er en lille spids fra Japan; navnet betyder »lille hund«, og ifølge Royal Kennel Club blev den udviklet til jagt på små vildtfugle. FCI-standarden beskriver en lille, velafbalanceret hund med gode knogler, et trofast temperament, skarpe sanser og stor årvågenhed, en hård dækpels over en blød, tæt underuld, små, opretstående, trekantede ører og en tyk, krøllet hale; farverne er rød, sort og tan samt sesam, altid med hvidlige »urajiro«-aftegninger på kinderne, brystet og undersiden. AKC-standarden angiver en gennemsnitsvægt på omkring 23 pund (10 kg) for hanner og 17 pund (8 kg) for tæver.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje én gang om ugen, nævner at racen fælder, og angiver dens levetid til over 10 år; en stor britisk undersøgelse fandt en median levetid på 14,6 år. AKC beskriver en selvsikker, selvstændig hund der er et bedre valg for en erfaren ejer, trives bedst med større børn og aldrig bør slippes løs uden for et indhegnet eller lukket område. PetMD tilføjer at den har brug for masser af mental stimulering, har gavn af socialisering som hvalp og bør have børstet tænder hver dag.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, African Lion Dog",
      text: [
        "Rhodesian ridgeback kommer fra det sydlige Afrika. Dens mest kendte kendetegn er ryggens »ridge«, en stribe hår der vokser i modsat retning af resten af pelsen. FCI-standarden beskriver en velafbalanceret, stærk, muskuløs, adræt og aktiv hund der er værdig, intelligent og reserveret over for fremmede og særlig værdsat som vagthund og familiehund. Den korte, tætte pels er lys hvedefarvet til rød hvedefarvet, og standarden angiver en vægt på omkring 36,5 kg for hanner og 32 kg for tæver.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje én gang om ugen, nævner at racen fælder og egner sig til et stort hus med stor have, og angiver dens levetid til over 10 år. PDSA beskriver legesyge, kraftfulde og meget loyale hunde med et meget stærkt jagtinstinkt, som ikke anbefales til førstegangsejere, aldrig bør være alene i mere end fire timer og skal socialiseres fra ung; PDSA råder også til en pause mellem måltid og motion. Woodgreen tilføjer at de trives bedst med større børn.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Continental Toy Spaniel, Phalène (variant med hængende ører), sommerfuglehund",
      text: [
        "Papillon er varianten med opretstående ører af continental toy spaniel, en race fra Belgien og Frankrig; varianten med hængende ører hedder phalène. FCI-standarden beskriver en lille, elegant dværgspaniel med langt hår og et livligt væsen, omkring 28 cm høj og med en vægt på op til 4,5 kg for hanner og 5 kg for tæver. De store ører bæres som en sommerfugls udbredte vinger, og pelsen er altid hvid med farvede pletter.",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og pelspleje mere end én gang om ugen, nævner at racen fælder og kan bo i lejlighed, og angiver dens levetid til over 12 år. PDSA beskriver blide, legesyge og meget lydige hunde der kommer godt ud af det med alle og har brug for træning og socialisering i en ung alder; PDSA foreslår pelspleje to til tre gange om ugen. PetMD tilføjer at papilloner har brug for daglig mental stimulering, kan udvikle separationsangst og bør have børstet tænder hver dag, og at meget små børn ved et uheld kan komme til at skade så lille en hund.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Algarvian Water Dog",
      text: [
        "Portugisisk vandhund kommer fra Portugal, hvor den arbejdede sammen med fiskere. Royal Kennel Clubs standard beskriver en robust, næsten kvadratisk og meget muskuløs hund – meget intelligent og enormt energisk, med store evner til at svømme og dykke – med en skulderhøjde på 50–57 cm (hanner) og 43–52 cm (tæver) og en vægt på 19–25 kg (hanner) og 16–22 kg (tæver). Den rigelige, enkeltlagede pels har ingen underuld og findes i sort, hvid, brun eller sort eller brun med hvidt; den traditionelle løveklipning efterlader snuden og bagparten kortklippet.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og daglig pelspleje, nævner at racen ikke fælder og egner sig til et stort hus, og angiver dens levetid til over 10 år. PDSA beskriver meget venlige og kærlige hunde der kommer godt ud af det med andre kæledyr, er fremragende familiehunde og har brug for træning og socialisering i en ung alder; PDSA tilføjer klipning og formning hos en professionel hundefrisør i løbet af året.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bichon, Bichon à poil frisé, Bichon Tenerife",
      text: [
        "Bichon frisé er en fransk-belgisk selskabshund. FCI-standarden beskriver en munter lille hund med livlige bevægelser og meget løst, hvidt hår i proptrækkerkrøller – en ægte selskabshund der kan tages med overalt, hverken nervøs eller tilbøjelig til at gø meget – med en skulderhøjde på 25–29 cm og en vægt på omkring 5 kg. En voksen hund er altid helt hvid med meget mørke, runde øjne, sort næse, hængende ører og en hale med fane der bæres over ryggen.",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og daglig pelspleje, nævner at racen ikke fælder og egner sig til en lejlighed, og angiver dens levetid til over 12 år. PDSA beskriver meget hengivne og kærlige hunde der er fremragende med børn og andre kæledyr, og tilføjer at pelsen skal klippes med et par måneders mellemrum, ofte af en professionel hundefrisør.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "newfie, Newfoundland",
      text: [
        "Newfoundlænder kommer fra Canada; FCI regner den blandt molosserne af bjergtypen og anerkender tre farver: sort, hvid og sort (landseer) samt brun. PDSA kalder newfoundlændere blide kæmper og angiver en gennemsnitlig skulderhøjde på 66–71 cm og en gennemsnitlig vægt på 50–69 kg; PetMD tilføjer at racens historie gør dem til naturlige svømmere.",
        "PDSA anbefaler mindst en times motion om dagen for voksne hunde, men ikke for meget motion til hvalpe mens deres knogler og led stadig udvikler sig; PDSA kalder pelsplejen en daglig opgave, nævner at newfoundlændere har tendens til at savle, og angiver levetiden til under 10 år. PetMD kalder racen en enestående familiehund der kommer godt ud af det med børn, små kæledyr og andre hunde, råder til at holde opsyn med små børn sammen med enhver hund og advarer om at nogle kan udvikle separationsangst når de er alene.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Carriage Dog, Spotted Coach Dog, Firehouse Dog",
      text: [
        "Dalmatiner kommer fra Kroatien; FCI regner den blandt racerne beslægtet med sporhundene. Den korte, skinnende pels er helt hvid med klart afgrænsede sorte eller leverbrune (brune) pletter, og standarden kræver plettede ører. FCI angiver en skulderhøjde på 56–62 cm for hanner og 54–60 cm for tæver; PDSA angiver en gennemsnitlig vægt på 18–27 kg.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og børstning én gang om ugen og skriver at racen fælder og egner sig til et stort hus med have. PDSA kalder dalmatinere fremragende kæledyr til aktive husstande, som passer bedre til større børn, har brug for selskab og aldrig bør være alene i mere end fire timer; PDSA nævner døvhed blandt racens helbredsproblemer og skriver at der findes en BAER-høretest.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "Australian cattle dog kommer fra Australien; FCI regner den blandt kvæghundene. Kennel Club-standarden beskriver en stærk, kompakt brugshund med en glat, vejrbestandig dobbeltpels i blå (marmoreret eller prikket) eller jævnt rødprikket og angiver en skulderhøjde på 46–51 cm for hanner og 43–48 cm for tæver; PDSA angiver en gennemsnitlig vægt på 16–20 kg.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og børstning én gang om ugen og skriver at racen fælder. PDSA beskriver en meget intelligent og energisk hund der har brug for masser af fysisk og mental aktivitet; på grund af sit stærke hyrdeinstinkt kan den finde på at nappe børn i hælene når de løber, og socialisering og træning i en ung alder hjælper.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Whippet kommer fra Storbritannien; FCI regner den blandt de korthårede mynder. Kennel Club-standarden beskriver en harmonisk kombination af muskelkraft og styrke med elegance og yndefulde linjer, en fin, kort og tætliggende pels i alle farver og farvekombinationer undtagen merle og et blidt, kærligt og ligevægtigt sind; den angiver en skulderhøjde på 47–51 cm for hanner og 44–47 cm for tæver, og PDSA angiver en gennemsnitlig vægt på 11–18 kg.",
        "PDSA anbefaler mindst en times motion hver dag med mulighed for at løbe frit i et sikkert område og børstning én gang om ugen med en blød børste. PDSA kalder whippets et populært valg for familier fordi de er rolige og blide over for børn, men anbefaler et hjem med lidt større børn; whippets bryder sig ikke om at være alene og har et rigtig stærkt jagtinstinkt, så PDSA anbefaler ikke at holde dem sammen med mindre kæledyr. Et dækken kan hjælpe om vinteren, og et tykt, blødt leje beskytter deres fremstående knogler.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Korthals Griffon, Wirehaired Pointing Griffon, Griff",
      text: [
        "Griffon korthals kommer fra Frankrig; FCI regner den blandt de kontinentale stående jagthunde og kalder den først og fremmest en alsidig stående jagthund. FCI-standarden beskriver en kraftfuld, rustik hund der er længere end høj, med en hård, grov pels der aldrig er krøllet eller uldagtig, en næse der altid er brun, og helst en stålgrå pels med brune (leverbrune) pletter; den angiver en skulderhøjde på omkring 55–60 cm for hanner og 50–55 cm for tæver og kalder racen mild, stolt og meget kærlig over for børn. PetMD angiver en vægt på 35–70 pund (ca. 16–32 kg).",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen, et stort hus med stor have og pelspleje mere end én gang om ugen. PetMD råder til ugentlig børstning (nogle hunde skal også håndtrimmes), skriver at racen som regel er tålmodig og blid med børn når den er socialiseret som hvalp, og nævner at dens jagthistorie kan give den et stærkt jagtinstinkt, så mindre dyr som katte og kaniner kan ligne noget der skal jagtes.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Retriever (Chesapeake Bay)",
      text: [
        "Chesapeake bay retriever, ofte kaldet chessie, kommer fra USA; FCI regner den blandt retrieverne. FCI-standarden beskriver en apporterende brugshund der er lige dygtig på land og i vand, og hvis størrelse og substans ikke bør være overdreven, med en tyk, kort pels over en tæt, uldagtig underuld og klare gullige eller ravfarvede øjne; alle brune nuancer samt sedge og deadgrass er tilladt, og en sort pels diskvalificerer. Den angiver en skulderhøjde på 58–66 cm og en vægt på 29,5–36,5 kg for hanner og 53–61 cm og 25–32 kg for tæver.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen, et stort hus med stor have og pelspleje én gang om ugen. PetMD beskriver en kvik, munter og yderst kærlig hund der kan blive destruktiv hvis den ikke stimuleres eller er alene for længe, skriver at chessien med den rette introduktion og socialisering er en fin tilføjelse til familien, og råder til ikke at lade hunden motionere lige før eller efter et måltid.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samojed, Samoyed, Samoyede",
      text: [
        "Samojedhund kommer fra det nordlige Rusland og Sibirien; FCI regner den blandt de nordiske slædehunde. FCI-standarden beskriver en hvid, elegant arktisk spids af mellemstørrelse med en rigelig, tyk og tæt polarpels, mørkebrune øjne, små, tykke, opretstående ører og læber der vender let opad i mundvigene i det karakteristiske »samojedsmil«; pelsen er helt hvid, creme eller hvid med biscuit, og blå øjne eller øjne i forskellig farve diskvalificerer. Den angiver en ideel skulderhøjde på 57 cm for hanner og 53 cm for tæver, begge med en tolerance på 3 cm.",
        "PDSA anbefaler mindst to timers motion hver dag og daglig pelspleje og skriver at samojeder fælder meget ofte, som regel er fremragende med børn og loyale over for hele familien, aldrig bør være alene i mere end fire timer, har brug for en meget sikker have fordi de er dygtige udbrydere, og har et stærkt jagtinstinkt; PDSA råder også til en pause efter måltidet før hunden motioneres. PetMD tilføjer at samojeder ikke har det godt i varme.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, Scottish Terrier, Aberdeen Terrier",
      text: [
        "Skotsk terrier, ofte kaldet scottie, kommer fra Storbritannien; FCI regner den blandt de små terriere. Kennel Club-standarden beskriver en undersætsig, kortbenet hund med en opmærksom holdning der giver indtryk af stor kraft og aktivitet på lidt plads, loyal og trofast, værdig, selvstændig og reserveret, men modig og meget intelligent – dristig, men aldrig aggressiv. Den tætliggende dobbeltpels har en hård, strid dækpels; farven er sort, hvedefarvet eller tigret i enhver nuance. Den angiver en skulderhøjde på 25–28 cm og en vægt på 8,5–10,5 kg.",
        "PDSA skriver at scottier har brug for omkring en times motion om dagen og daglig pelspleje med trimning og klipning hos en professionel hundefrisør hver anden til tredje måned, beskriver dem som loyale og hengivne over for deres familie og skriver at de kan være stædige, så træningen kræver tålmodighed og engagement. PetMD skriver at de med den rette træning og socialisering kan være gode familiehunde, at det er vigtigt at socialisere hvalpen, og at de ikke bør være alene i længere perioder.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner Pointer, Weim",
      text: [
        "Weimaraner kommer fra Tyskland; FCI regner den blandt de kontinentale stående jagthunde og anerkender en korthåret og en langhåret variant. FCI-standarden beskriver en mellemstor til stor jagthund af funktionel brugstype, senet og meget muskuløs, med ravfarvede øjne og brede, temmelig lange ører; pelsen er sølvgrå, rågrå eller musegrå, kun små hvide aftegninger på bryst og tæer er tilladt, og enhver anden farve end grå diskvalificerer. Den angiver en skulderhøjde på 59–70 cm og en vægt på ca. 30–40 kg for hanner og 57–65 cm og ca. 25–35 kg for tæver.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen, et stort hus med stor have og pelspleje én gang om ugen. PDSA skriver at weimaranere er vidunderlige familiehunde i de rette hænder og trives bedst hos ejere der kender racen, men anbefaler dem ikke til hjem med mindre børn eller mindre kæledyr på grund af deres meget stærke jagtinstinkt, skriver at de kan udvikle separationsangst hvis de er alene, og råder til at socialisere dem fra ung og holde en pause mellem måltid og motion. PetMD anbefaler desuden ørerensning og bad én gang om måneden.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "Italiensk mynde kommer fra Italien; FCI fører den som piccolo levriero italiano blandt de korthårede mynder. Kennel Club-standarden beskriver en greyhound i miniature, slankere i alle proportioner, elegant, yndefuld og hurtig, intelligent, kærlig og livlig, selv om den kan virke reserveret, med en kort, fin og skinnende pels over tynd hud. Den angiver en skulderhøjde på 32–38 cm og en vægt på 3,6–4,5 kg; sort, blå, creme, gul, rød og hvid eller en af disse farver brudt med hvidt er tilladt – aldrig merle, tigret eller tan aftegninger.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og skriver at racen egner sig til et lille hus både i byen og på landet, skal plejes én gang om ugen og ikke fælder. PDSA skriver at italienske mynder er fulde af energi, bør motioneres i et indhegnet område fordi de kan være svære at kalde tilbage når de har fået øje på bytte, kan være frygtsomme, så tidlig socialisering er afgørende, og – fordi deres knogler er skrøbelige mens de vokser – måske ikke er den ideelle race til hjem med små børn eller andre kæledyr. PetMD tilføjer at den tynde pels ikke holder dem varme, så de fryser let.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer, Giant Schnauzer, Munich Schnauzer",
      text: [
        "Riesenschnauzer kommer fra Tyskland; FCI regner den blandt pinschere og schnauzere. Royal Kennel Clubs standard beskriver en kraftigt bygget, robust og senet hund der virker næsten kvadratisk, modig, pålidelig, godmodig og afbalanceret, med en hård, strid dækpels og god underuld. Den angiver en skulderhøjde på 65–70 cm for hanner og 60–65 cm for tæver; FCI-standarden angiver en vægt på 35–47 kg. Helt sort, peber og salt med mørk ansigtsmaske samt sort med sølv er tilladt – ingen andre farver.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og skriver at racen egner sig til et stort hus med stor have, skal plejes hver dag og ikke fælder. PDSA skriver at pelsen kræver daglig pleje og jævnlig trimning, at riesenschnauzere kan være elskelige familiehunde for familier med større børn hvis de er godt socialiseret som hvalpe, og at disse viljestærke hunde passer til erfarne ejere. PetMD tilføjer at pelsen trimmes i hånden af en professionel med få måneders mellemrum, og at racen ikke trives i hjem hvor folk sjældent er hjemme.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "blodhund, St. Hubert Hound, Chien de Saint-Hubert, Sleuth Hound",
      text: [
        "Bloodhound kommer fra Belgien, hvor FCI fører den som chien de Saint-Hubert, en stor sporhund. FCI-standarden beskriver den kraftigste af alle sporhunde: blid, rolig, venlig og social over for mennesker og særlig knyttet til sin ejer, med en kort, tæt og vejrbestandig pels og smidig, løs hud. Hanner vejer omkring 46–54 kg og tæver omkring 40–48 kg; de tre farver er sort og tan, leverbrun og tan samt rød.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og skriver at racen egner sig til et stort hus med stor have, skal plejes én gang om ugen og fælder. PDSA skriver at bloodhounds passer bedre til erfarne ejere, ikke anbefales til hjem med mindre børn eller mindre kæledyr på grund af deres størrelse og meget stærke jagtinstinkt, savler og skal have hudfolderne holdt rene og tørre. PDSA råder også til en pause mellem måltid og motion.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "akita, American Akita, Great Japanese Dog",
      text: [
        "Akitaen i dyreleksikonet er den amerikanske type: FCI fører den som amerikansk akita, en race af japansk oprindelse, adskilt fra den japanske akita inu. FCI-standarden beskriver en stor, kraftigt bygget og velafbalanceret hund med megen substans og kraftige knogler, små, opretstående ører og en stor hale der bæres over ryggen; hanner har en skulderhøjde på 66–71 cm. Alle farver er tilladt, fx rød, gul, hvid, pinto og tigret. PDSA angiver en gennemsnitlig vægt på 31–59 kg.",
        "PDSA beskriver utroligt loyale familiehunde der er selvstændige og meget store og derfor trives bedst hos erfarne ejere; PDSA vil ikke anbefale en akita til et hjem med små børn og fraråder at lade dem være alene fordi mange har svært ved det. PDSA anbefaler mindst to timers motion hver dag, socialisering fra ung, en pause mellem måltid og motion og børstning mindst én gang om ugen – akitaer fælder meget. PDSA nævner også et stærkt jagtinstinkt, og at de kan blive overophedede i meget varmt vejr.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "corgi, Cardigan Welsh Corgi, Cardi",
      text: [
        "Welsh corgi cardigan kommer fra Storbritannien; FCI regner den blandt kvæghundene. Standarden fra American Kennel Club angiver en skulderhøjde på 10,5–12,5 tommer (ca. 27–32 cm) og en idealvægt på 30–38 pund (ca. 14–17 kg) for hanner. I modsætning til sin fætter pembroke har den en lang, fyldig hale.",
        "Royal Kennel Club anbefaler op til en times motion om dagen, finder et lille hus med en lille eller mellemstor have tilstrækkeligt og skriver at racen skal plejes mere end én gang om ugen og fælder; den angiver en levetid på over 12 år og fører cardigan som en sårbar britisk race. PDSA skriver at welsh corgier gerne vil samarbejde, så træningen burde være forholdsvis let, at to til tre børstninger om ugen som regel er nok, og at de kan finde på at nappe børn i hælene når de løber – socialisering med børn og træning i en ung alder hjælper.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, German Wirehaired Pointer, GWP",
      text: [
        "Ruhåret hønsehund kommer fra Tyskland; FCI fører den som deutsch drahthaar blandt de kontinentale stående jagthunde. Royal Kennel Clubs standard beskriver en mellemstor jagthund med strid pels der dækker huden helt – blid, kærlig og ligevægtig, opmærksom, lydig og meget loyal. Hanner har en skulderhøjde på 60–67 cm og vejer 25–34 kg; tæver har en skulderhøjde på 56–62 cm og vejer 20,5–29 kg. Leverbrun og hvid, ensfarvet leverbrun og sort og hvid er standardfarverne.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og skriver at den egner sig til et stort hus med stor have på landet, skal plejes mere end én gang om ugen og fælder. PetMD skriver at ruhårede hønsehunde har brug for masser af motion og mental stimulering, knytter sig tæt til familien og kan blive fremragende familiehunde når de trænes og socialiseres tidligt, trives med børn der har lært at omgås dyr, aldrig bør være alene i lange perioder og har et stærkt jagtinstinkt. Pelsen håndtrimmes to gange om året.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "sankt bernhard, St. Bernard, St. Bernhardshund, Bernhardiner",
      text: [
        "Sankt bernhardshund kommer fra Schweiz; FCI regner den blandt molosserne af bjergtypen. FCI-standarden beskriver en hund der er venlig af natur, rolig til livlig og årvågen, og anerkender to varianter: korthåret med tæt, glat og tætliggende pels og langhåret. Hanner har en skulderhøjde på mindst 70 cm og tæver mindst 65 cm, op til 90 og 80 cm; PDSA angiver en vægt på 54–81 kg.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og skriver at racen egner sig til et stort hus med stor have, skal plejes mere end én gang om ugen, fælder og som regel lever mindre end ti år. PDSA skriver at sankt bernhardshunde elsker at være sammen med en familie og er fremragende med mennesker i alle aldre, også børn, bør socialiseres godt som hvalpe, skal børstes mindst tre gange om ugen, savler, ikke har det så godt i varme og har brug for en pause mellem måltid og motion. PetMD tilføjer at disse menneskeorienterede hunde kan udvikle separationsangst hvis de er alene i lange perioder.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffe, Staffie, Staffy, Stafford",
      text: [
        "Staffordshire bullterrier kommer fra Storbritannien; FCI regner den blandt bullterrierne. FCI-standarden beskriver en glathåret, velafbalanceret hund med stor styrke i forhold til sin størrelse – traditionelt med ukueligt mod og vedholdenhed, meget intelligent og kærlig, især over for børn. Skulderhøjden er 35,5–40,5 cm; hanner vejer 12,7–17 kg og tæver 11–15,4 kg. Den findes i tigret, rød, gul, sort, blå eller hvid, alene eller med hvidt.",
        "Royal Kennel Club kalder den en vidunderlig familiehund og anbefaler op til en times motion om dagen; den skal plejes én gang om ugen, fælder og lever som regel over 12 år. PDSA skriver at staffordshire bullterriere er tolerante og søde over for børn, men som menneskeorienterede hunde er kendt for at lide af separationsangst når de er alene, at de er kendt for at tygge på ting, og at mindre kæledyr ikke er en god idé omkring dem på grund af deres meget stærke jagtinstinkt.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "Airedale terrier kommer fra Storbritannien; FCI regner den blandt de store og mellemstore terriere. FCI-standarden kalder den den største af terrierne – en muskuløs, aktiv og temmelig kompakt hund der er udadvendt og selvsikker, venlig, modig og intelligent, altid opmærksom, ikke aggressiv, men frygtløs. Hanner har en skulderhøjde på omkring 58–61 cm og tæver omkring 56–59 cm. Den hårde, tætte og strie pels er tan med sort eller grizzle sadel.",
        "Royal Kennel Club anbefaler op til en times motion om dagen; pelsen skal plejes hver dag og fælder ikke, og racen lever som regel over 10 år. PetMD beskriver fremragende familiehunde der, hvis de er godt trænet, som regel kommer godt ud af det med børn, men ikke bør overlades til sig selv for længe; PetMD råder til børstning et par gange om ugen, en hurtig ørerensning hver uge og en tur hos en professionel hundefrisør tre eller fire gange om året.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "jack russell, Russell Terrier (AKC), JRT",
      text: [
        "Jack russell terrier – American Kennel Club kalder den russell terrier – stammer fra England og blev udviklet i Australien; FCI regner den blandt de små terriere. Standarden beskriver en stærk, aktiv og smidig brugsterrier med stor personlighed: livlig, opmærksom og aktiv, modig og frygtløs, venlig, men stille selvsikker. Skulderhøjden er 25–30 cm, og vægten er omkring 5–6 kg. Den glatte, brudte eller ruhårede pels er overvejende hvid med sorte og/eller tan aftegninger.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje én gang om ugen; racen fælder og lever som regel over 10 år. PDSA beskriver kloge, livlige hunde der kan være gode familiehunde hvis de trænes og socialiseres fra ung, men passer bedre til familier med lidt større børn; de har et meget stærkt jagtinstinkt, så mindre kæledyr anbefales ikke, og de elsker at grave.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Bullmastiff er en gammel engelsk vogterrace fra 1800-tallet der nedstammer fra bulldog og old english mastiff; FCI regner den blandt molosserne. Standarden beskriver en kraftfuld, symmetrisk hund der udstråler stor styrke uden at være klodset – udholdende, aktiv, pålidelig, livlig, opmærksom og trofast. Hanner har en skulderhøjde på 64–69 cm og vejer 50–59 kg, tæver 61–66 cm og 41–50 kg. Den korte, hårde pels er i enhver nuance af gul, rød eller tigret, altid med sort snude.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje én gang om ugen, og racen lever som regel under 10 år. PDSA beskriver meget loyale hunde hvis størrelse og kraft gør at de passer bedre til hjem med kun voksne eller familier med større børn; de har brug for tidlig socialisering, helst nogen hjemme hele tiden, har et meget stærkt jagtinstinkt, savler meget og har brug for en pause mellem måltid og motion.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested, kinesisk nøgenhund, Powder Puff",
      text: [
        "Chinese crested dog er en lille, aktiv og yndefuld selskabshund fra Kina; FCI regner den blandt de hårløse hunde. Den findes i to varianter: den hårløse med glat, nøgen krop og hår kun på hovedet (toppen), fødderne og halen, og powder puff, der er helt dækket af et slør af langt, blødt hår. Hanner har en skulderhøjde på 28–33 cm og tæver 23–30 cm; PetMD angiver en vægt på 8–12 pund (3,6–5,4 kg). Alle farver er tilladt undtagen merle, og dens temperament beskrives som glad, aldrig ondsindet.",
        "Royal Kennel Club anbefaler op til 30 minutters motion om dagen og pelspleje én gang om ugen; den egner sig til en lejlighed, og racen lever som regel over 12 år. PetMD beskriver en venlig hund der passer ind i de fleste familier, også dem med børn og andre kæledyr – alt samvær med børn bør foregå under opsyn. Den nøgne hud skal beskyttes mod sol og kulde, kløerne bør tjekkes hver uge, og hvalpe har brug for tidlig, konsekvent socialisering.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "Nova scotia duck tolling retriever – tolleren – er en retriever fra Canada; FCI-standarden beskriver hvordan den løber og leger langs strandkanten i fuldt syn for ænderne for at lokke dem til og derefter sendes ud for at apportere fuglene. Standarden beskriver en mellemstor, kraftfuld, kompakt og velmusklet hund der er meget intelligent, let at træne og har stor udholdenhed. FCI angiver 48–51 cm og 20–23 kg for hanner og 45–48 cm og 17–20 kg for tæver. Den vandafvisende dobbeltpels er i forskellige nuancer af rød eller orange, som regel med hvidt på halespidsen, fødderne, brystet eller som blis.",
        "Royal Kennel Club anbefaler op til en times motion om dagen og pelspleje mere end én gang om ugen, og racen fælder; PetMD råder til børstning en eller to gange om ugen. En stor britisk undersøgelse (McMillan 2024, via Dogs Trust) angiver en median forventet levetid på 13,2 år, PetMD 12–14 år, og som andre mellemstore hunde er den udvokset ved omkring 12–15 måneder (PetMD). AKC beskriver meget kærlige hunde der som regel er gode med børn, har brug for masser af fysisk motion og mental stimulering, kan have et stærkt jagtinstinkt over for mindre dyr og har gavn af tidlig socialisering og hvalpehold.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, Cairnie",
      text: [
        "Cairn terrier kommer fra Storbritannien; FCI regner den blandt de små terriere. Kennel Club-standarden beskriver en adræt, opmærksom terrier med et arbejdsomt, naturligt udseende – aktiv, ivrig og hårdfør, med et frygtløst og muntert sind, bestemt, men ikke aggressiv. Den vejrbestandige dobbeltpels har en rigelig, hård dækpels; farven er creme, hvedefarvet, rød, grå eller næsten sort, tigrering er tilladt, og mørke ører og mørk snude er typisk. Den angiver en skulderhøjde på omkring 28–31 cm og en idealvægt på 6–7,5 kg.",
        "PDSA anbefaler mindst en times motion om dagen og skriver at cairn terriere har grænseløs energi og et stærkt jagtinstinkt, så de skal socialiseres tidligt med katte og andre små kæledyr og kræver forsigtighed uden line, og at de, når de er socialiseret, kommer rigtig godt ud af det med børn og er fremragende familiehunde. PDSA råder til at håndtrimme pelsen to gange om året og pelspleje en eller to gange om ugen; Dogs Trust skriver at de fælder meget lidt. En stor britisk undersøgelse (McMillan 2024, via Dogs Trust) angiver en median forventet levetid på 14,0 år, PetMD 13–15 år, og som andre små hunde er den udvokset ved omkring 9–12 måneder (PetMD). PetMD tilføjer at de har brug for masser af motion og mental stimulering.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "engelsk bullterrier, English Bull Terrier, Bully",
      text: [
        "Bullterrier kommer fra Storbritannien; FCI regner den blandt bullterrierne (gruppe 3). Det er en mellemstor, korthåret terrier: PDSA angiver en gennemsnitlig skulderhøjde på 51–61 cm og en gennemsnitlig vægt på 22–31 kg, og PetMD beskriver en atletisk bygning på omkring 21–22 tommer og 50–70 pund. PetMD kalder regelmæssig motion et must og skriver at bullterriere er kærlige over for familien, også børn, men ikke altid venlige over for andre hunde eller katte, og at tidlig og hyppig socialisering og træning er afgørende.",
        "PDSA anbefaler mindst en times motion om dagen fordelt over dagen og en pause efter måltider før hunden motioneres. PDSA skriver at en velsocialiseret bullterrier kommer godt ud af det med mennesker i alle aldre, men fordi den er lidt let at ophidse, passer den bedre til større børn; den vil helst have selskab så meget som muligt og har et stærkt jagtinstinkt, så man skal være forsigtig omkring katte og andre små dyr. Det er nok at børste pelsen én gang om ugen. PDSA angiver en gennemsnitlig levetid på over 10 år og PetMD 12–13 år; som andre mellemstore hunde er den udvokset ved omkring 12–15 måneder (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Min Pin, Zwergpinscher",
      text: [
        "Dværgpinscher kommer fra Tyskland; FCI regner den blandt pinschere og schnauzere (gruppe 2) og beskriver den som en formindsket udgave af pinscheren – livlig, temperamentsfuld, selvsikker og ligevægtig. Pelsen er kort, tæt, glat og skinnende, enten ensfarvet hjorterød til mørk rødbrun eller sort og tan, og halen er naturlig. FCI-standarden angiver en skulderhøjde på 25–30 cm og en vægt på 4–6 kg for både hanner og tæver; som andre dværghunde er den udvokset ved omkring 8–12 måneder (PetMD).",
        "PDSA anbefaler op til en halv times motion om dagen til disse energiske, travle små hunde, skriver at det som regel er nok at børste pelsen én gang om ugen, og nævner at de kan være stædige og selvstændige, så træningen kræver øvelse og tålmodighed. PetMD skriver at de med den rette socialisering og træning kan være fremragende familiehunde. VCA beskriver racen som legesyg og meget god med børn, selv om meget små eller vilde børn kan skade den ved hårdhændet leg, og skriver at den tynde pels og den lille størrelse gør at den let fryser. PDSA angiver en gennemsnitlig levetid på over 12 år og PetMD 12–16 år.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Pyrenæerhund – i USA kaldet great pyrenees – kommer fra Frankrig; FCI regner den blandt molosserne af bjergtypen (gruppe 2) og beskriver en hund af stor størrelse, imponerende og kraftigt bygget, men ikke uden en vis elegance. Pelsen er hvid eller hvid med pletter i grævlingefarvet, ulvegrå, lysegul eller orange på hoved og ører. FCI-standarden angiver en skulderhøjde på 70–80 cm for hanner og 65–75 cm for tæver; PDSA angiver en gennemsnitlig vægt på 40–50 kg. Som andre kæmpehunde er den udvokset ved omkring 18–24 måneder (PetMD).",
        "Royal Kennel Club anbefaler op til en times motion om dagen og skriver at racen egner sig til et stort hus med stor have, skal plejes mere end én gang om ugen og fælder, og angiver en levetid på under 10 år (PetMD og VCA angiver 10–12 år). PDSA kalder dem blide kæmper – rolige, godmodige hunde der som regel kommer godt ud af det med alle – og skriver at træningen kræver tålmodighed og belønningsbaserede metoder. VCA skriver at pyrenæerhunden er hengiven over for sin familie, især børnene, og at tidlig socialisering er meget vigtig; PetMD skriver at den lever godt sammen med andre kæledyr, men måske er bedst i hjem uden mindre børn, og råder til at undgå hård motion omkring måltiderne på grund af risikoen for mavedrejning.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten terrier, wheaten, Soft Coated Wheaten Terrier, SCWT",
      text: [
        "Irish soft coated wheaten terrier kommer fra Irland; FCI regner den blandt de store og mellemstore terriere. Royal Kennel Clubs standard beskriver en mellemstor, kompakt og højstillet terrier med en blød, silkeagtig, hvedefarvet pels der falder i løse krøller eller bølger – godmodig, livlig og ivrig, fuld af selvtillid og humor. Den eneste farve er en god, klar hvedefarve. PDSA angiver en gennemsnitlig skulderhøjde på 46–49 cm og en gennemsnitlig vægt på 16–20,5 kg (Kennel Club-standarden angiver 16–20,5 kg for hanner og noget mindre for tæver); som andre mellemstore hunde er den udvokset ved omkring 12–15 måneder (PetMD).",
        "Royal Kennel Club anbefaler op til en times motion om dagen og skriver at racen egner sig til et lille hus, skal plejes hver dag og ikke fælder. En stor britisk undersøgelse (McMillan 2024, via Dogs Trust) angiver en median forventet levetid på 13,7 år; PetMD og VCA angiver 12–14 år. PDSA kalder dem venlige, pålidelige hunde der er fremragende familiehunde, selv om de kan være en smule stædige. VCA skriver at deres blide, legesyge væsen gør dem til et godt match for børn; PetMD skriver at samvær med børn bør foregå under opsyn, at de ikke bryder sig om at være alene i lange perioder, og råder til professionel pelspleje hver fjerde til sjette uge, et bad omkring én gang om måneden og ørerensning hver eller hver anden uge.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "ulvehund, Irish Wolfhound, Cú Faoil",
      text: [
        "Irsk ulvehund kommer fra Irland; FCI regner den blandt de ruhårede mynder. PDSA angiver en gennemsnitlig skulderhøjde på 71–79 cm og en gennemsnitlig vægt på 40–55 kg; som andre kæmpehunde er den udvokset ved omkring 18–24 måneder (PetMD). Royal Kennel Club kalder dens størrelse ekstra stor og skriver at den egner sig til et stort hus med stor have på landet.",
        "Royal Kennel Club anbefaler mere end to timers motion om dagen og pelspleje mere end én gang om ugen og skriver at racen fælder. Kennel Club og PDSA angiver en levetid på under 10 år; PetMD angiver 6–8 år. PDSA anbefaler ikke racen til hjem med mindre børn på grund af dens størrelse og styrke og heller ikke sammen med mindre kæledyr på grund af dens stærke jagtinstinkt og skriver at den aldrig bør være alene i mere end fire timer. PetMD råder til at socialisere hvalpen fra den dag, den kommer hjem, ingen motion lige før eller efter måltider (mavedrejning) og ørerensning hver anden til fjerde uge.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaff, Am Staff, American Staffordshire Terrier",
      text: [
        "Amerikansk staffordshire terrier kommer fra USA; FCI regner den blandt bullterrierne. Standarden kræver stor styrke i forhold til størrelsen og angiver en skulderhøjde på 46–48 cm for hanner og 43–46 cm for tæver, men ingen vægt. PetMD angiver 40–70 pund (ca. 18–32 kg) for begge køn; en hund af denne størrelse er udvokset ved omkring 12–15 måneder (PetMD).",
        "PetMD anbefaler mindst 60 minutters motion om dagen og skriver at racen er tålmodig og kærlig over for børn, at den kan være tilbøjelig til separationsangst, og at dens stærke jagtinstinkt kan gøre livet med mindre hunde eller katte sværere. En britisk undersøgelse (McMillan et al., 2024, som opstillet af Dogs Trust) angiver en median forventet levetid på 12,5 år; PetMD angiver 12–16 år. VCA anbefaler ugentlig børstning; PetMD råder til at socialisere hvalpen, ingen motion lige efter et måltid (mavedrejning) og bad og ørerensning omkring hver 4.–6. uge.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, Lagotti, Romagna Water Dog, trøffelhund",
      text: [
        "Lagotto romagnolo er en lille til mellemstor krølhåret vandhund fra Italien, kendt som trøffelhunden; FCI regner den blandt vandhundene. Standarden angiver en skulderhøjde på 43–48 cm og en vægt på 13–16 kg for hanner og 41–46 cm og 11–14 kg for tæver; en hund af denne størrelse er udvokset ved omkring 12–15 måneder (PetMD).",
        "Royal Kennel Club kalder den en fremragende og opmærksom familiehund, anbefaler mere end to timers motion om dagen og pelspleje mere end én gang om ugen, skriver at den ikke fælder, og angiver en levetid på over 12 år; PetMD skriver at lagottoer kan blive 15–17 år. PetMD nævner at den har brug for konstant mental og fysisk stimulering og grundig socialisering da den kan være genert; Woodgreen skriver at den kan få det svært hvis den ofte er alene, og anbefaler professionel pelspleje hver sjette til ottende uge.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamute, Mal, Alaskan Mal",
      text: [
        "Alaskan malamute er en af de ældste arktiske slædehunde: en kraftfuld, solidt bygget nordisk slædehund fra USA med en tyk, grov pels. FCI-standarden angiver ønskede størrelser på 63,5 cm og 38 kg for hanner og 58,5 cm og 34 kg for tæver; PDSA angiver 58–64 cm og 34–39 kg. En hund af denne størrelse er udvokset ved omkring 15–18 måneder (PetMD), og PDSA angiver en levetid på over 10 år (PetMD: 10–14 år).",
        "PDSA anbefaler mindst to timers hård motion og børstning hver dag og skriver at malamuter fælder meget, har et meget stærkt jagtinstinkt, ikke bør være alene i mere end fire timer og passer til aktive voksne eller familier med større børn; PDSA kalder dem udfordrende for førstegangsejere. PetMD råder til at tjekke ørerne én gang om ugen og et bad hver 6.–8. uge og nævner at den tykke pels gør varmt vejr hårdt for dem.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "African Barkless Dog, Congo Dog, barkløs hund",
      text: [
        "Basenji er en let bygget jagthund med fine knogler fra Centralafrika, der ikke gør, men laver sin egen jodlende lyd; FCI regner den blandt hundene af urtype. PDSA angiver en skulderhøjde på 40–43 cm og en vægt på 9–11 kg. En hund af denne størrelse er udvokset ved omkring 9–12 måneder (PetMD), og PDSA angiver en levetid på over 12 år (WebMD: 13–14 år).",
        "PDSA anbefaler mindst en times motion om dagen (omkring 60–90 minutter), masser af mental stimulering og børstning én gang om ugen; PDSA kalder basenjier reserverede, men pålidelige, viljestærke og med meget dårlig trafiksans. WebMD skriver at de vil jagte alt der ligner bytte, har brug for meget høje hegn eller konstant opsyn og kun er moderat gode med små børn, og råder til at rense ørerne ugentligt og børste tænderne mindst to gange om ugen.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Shorthair, British Blue",
      text: [
        "Britisk korthår er en robust kat med tæt pels og store, runde øjne – CFA kalder den en »bamse«-kat. De fleste forestiller sig den blågrå, men den findes i en række farver og mønstre. Den modnes langsomt: Ifølge CFA når den sin fulde størrelse ved omkring tre år, og ifølge VCA kan den fysiske modning tage op til fem.",
        "CFA beskriver den som meget kærlig og knyttet til sine mennesker; den kommer godt ud af det med alle i husstanden uanset alder, men bryder sig som regel ikke om at blive båret, og den har levet sammen med hunde, kaniner og fugle. VCA beskriver et moderat aktivitetsniveau og råder til at kæmme pelsen mindst én gang om ugen. Racekillinger flytter som regel til deres nye hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA beskriver ragdoll som en stor, afslappet kat med en halvlang, plysagtig og silkeblød pels og blå øjne. De mørkere »points« findes i flere mønstre – colourpoint uden hvidt, mitted med hvide poter, bicolour med mere hvidt og van. Den modnes langsomt: Den får sin fulde pelsfarve ved to år og sin fulde størrelse og vægt ved omkring fire.",
        "CFA beskriver en blid kat der tager imod dig ved døren og følger efter dig fra rum til rum og som regel leger uden at bruge kløerne. PetMD kalder den et godt valg for familier, også familier med børn, men råder til langsomme introduktioner under opsyn til børn og andre kæledyr og skriver at nogle ragdolls kun skal kæmmes en eller to gange om ugen, mens CFA råder til regelmæssig kæmning. Racekillinger flytter som regel til et nyt hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibirisk skovkat, Siberian Forest Cat",
      text: [
        "GCCF beskriver sibirisk kat som en kat der udvikler sig langsomt, med en tyk, vejrbestandig pels: en tæt, blød underuld under en grovere dækpels, som fældes kraftigt forår og efterår. Hanner vejer omkring 7,7–11,8 kg og hunner 5,9–7,7 kg, den fulde udvikling kan tage fire til fem år, og GCCF angiver en levetid på 12 til 15 år eller mere.",
        "GCCF kalder den energisk og legelysten, men tålmodig – et godt valg for familier med små børn – og skriver at den kommer godt ud af det med andre dyr, også hunde. PetMD råder til at kæmme pelsen mindst én gang om ugen og ekstra mens den fælder forår og efterår, og nævner at sibiriske katte ikke anses for at være allergivenlige. Racekillinger flytter som regel til deres nye hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine Coon cat",
      text: [
        "Maine coon regnes bredt for at være en af de største huskatteracer, med en muskuløs, rektangulær krop, bred brystkasse, store poter og en lang, flydende hale. TICA angiver en gennemsnitsvægt på omkring 5,9–8,2 kg for voksne hanner og 4,1–5,9 kg for hunner, og CFA nævner at nogle hanner vejer mere end 9 kg. Den vokser langsomt: Ifølge CFA er den ofte først fuldt udviklet som tre- eller fireårig, og TICA skriver at fuld modenhed kan tage tre til fem år.",
        "TICA beskriver den som blid, venlig og legesyg, CFA som social, loyal og intelligent; den »taler« ofte med en kvidrende trille frem for at mjave. Vetstreet skriver at maine coons kommer godt ud af det med alle, også børn, hunde og andre katte. Den tunge, halvlanghårede pels er kortere på skuldrene og længere på kraven, maven og bagparten. Kilderne er uenige om pelsplejen: Vetstreet skriver at ugentlig kæmning er nok, CFA råder til at børste eller kæmme mindst et par gange om ugen, og TICA nævner at en tykkere pels kan kræve daglig kæmning. Racekillinger flytter som regel til deres nye hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalkat, Bengal cat",
      text: [
        "PDSA beskriver bengal som meget intelligent og energisk, en kat der har brug for masser af mental stimulering og mulighed for motion og kan lide et højt udsigtspunkt som et kradsetræ. Den er kærlig, men vil hellere krølle sig sammen ved siden af dig end på dit skød og kan være ret snakkesalig. VCA nævner at bengaler vokser langsomt og kan være op til to år om at blive fysisk udvoksede.",
        "Den korte, bløde, plettede eller marmorerede pels kræver kun let børstning eller kæmning én gang om ugen (PDSA). PetMD nævner at bengal måske ikke er det bedste valg for familier med små børn, mens hunde og andre katte kan gå fint med den rette introduktion. Racen blev udviklet ud fra krydsninger mellem asiatisk leopardkat og huskatte; PetPrep viser kun den registrerede tamme bengal. Racekillinger flytter som regel til deres nye hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "skovkat, Wegie, Skogkatt",
      text: [
        "GCCF beskriver norsk skovkat som blid og venlig, en kat der nyder at være en del af en familie. Den modnes langsomt og regnes først for fuldt udvokset ved omkring fire til fem år; hanner vejer omkring 5,4–7,3 kg og hunner 4,1–5,4 kg, og GCCF angiver en levetid på 14 til 16 år.",
        "Den har masser af energi, holder af interaktive lege og klatrer gerne; GCCF skriver at den er tolerant over for hensynsfulde børn, andre katte og kattevenlige hunde. PetMD råder til at kæmme og børste pelsen mindst én gang om ugen og oftere mens den fælder forår og efterår, og nævner at separationsangst kan blive et problem hvis den ofte er alene i lange perioder. Racekillinger flytter som regel til deres nye hjem når de er 12–13 uger (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default da;
