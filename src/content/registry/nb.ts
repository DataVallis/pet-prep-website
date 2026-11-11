import type { RegistryCopy } from "./types";

/** Norwegian (Bokmål) plural: one / other ("1 rase", "2 raser", "1,5 timer"). */
const s = (n: number, one: string, other: string) => (n === 1 ? one : other);
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = " ";
/** Lower case for values that continue a phrase ("Hunder" → "hunder", "Opptil 1 time" → "opptil 1 time"). */
const lc = (t: string) => t.toLocaleLowerCase("nb");
const cap = (t: string) => t.charAt(0).toLocaleUpperCase("nb") + t.slice(1);
/**
 * Breed names are common nouns in Norwegian and are written in lower case in running text
 * ("labrador retriever", "berner sennenhund", "maine coon"); words with an inner capital or all capitals
 * (abbreviations) are kept as they are. A name keeps its capital only at the start of a sentence.
 */
const mid = (name: string) => name.replace(/\p{L}+/gu, (w) => (/^\p{Lu}[\p{Ll}]*$/u.test(w) ? lc(w) : w));
/** "Hunder" → "hunde", "Katter" → "katte" (first part of a compound); other species: null. */
const kindOf = (many: string) => {
  const m = lc(many);
  return m === "hunder" || m === "hund" ? "hunde" : m === "katter" || m === "katt" ? "katte" : null;
};
/** "Hunder" → "hunderaser", "Katter" → "katteraser" (compound); other species: "raser (fugler)". */
const breedsOf = (many: string, n: number) => {
  const kind = kindOf(many);
  return kind ? `${kind}${s(n, "rase", "raser")}` : `${s(n, "rase", "raser")} (${lc(many)})`;
};
/** Definite singular after "denne": "denne hunderasen", "denne rasen (fugl)". */
const breedDef = (one: string) => {
  const kind = kindOf(one);
  return kind ? `${kind}rasen` : `rasen (${lc(one)})`;
};
/** Norwegian ordinal: 1., 2., 7. */
const ord = (n: number) => `${n}.`;
/** "11:00" → "11.00" (Norwegian clock times, "kl. 11.00"). */
const clock = (t: unknown) => String(t).replace(":", ".");
/** Singular of a formatted unit noun after "hver …" ("hver 7. dag", "annenhver uke", "annethvert år"). */
const SING: Record<string, { one: string; neuter?: boolean }> = {
  dag: { one: "dag" },
  dager: { one: "dag" },
  uke: { one: "uke" },
  uker: { one: "uke" },
  måned: { one: "måned" },
  måneder: { one: "måned" },
  år: { one: "år", neuter: true },
};
const every = (t: string) => {
  const m = /^(\d+)[\s ](\p{L}+)$/u.exec(t);
  const w = m ? SING[m[2]] : undefined;
  if (!m || !w) return `med ${t} mellomrom`;
  const n = Number(m[1]);
  if (n === 1) return `${w.neuter ? "hvert" : "hver"} ${w.one}`;
  if (n === 2) return `${w.neuter ? "annethvert" : "annenhver"} ${w.one}`;
  return `${w.neuter ? "hvert" : "hver"} ${ord(n)} ${w.one}`;
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as Norsk Kennel Klub (NKK) uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "gjeterhunder og kvegdrivere",
  2: "pinschere og schnauzere, molosser samt sveitsiske fjellhunder og kvegdrivere",
  3: "terriere",
  4: "dachshunder",
  5: "spisshunder og hunder av urtype",
  6: "drivende hunder, sporhunder og beslektede raser",
  7: "stående fuglehunder",
  8: "retrievere, støtende hunder og vannhunder",
  9: "selskapshunder",
  10: "mynder",
};
const origins: Record<string, string> = { GB: "Storbritannia", FR: "Frankrike", DE: "Tyskland", US: "USA", CU: "Cuba", CH: "Sveits", IT: "Italia", "CN-XZ": "Tibet (Kina)", CN: "Kina", MX: "Mexico", BE: "Belgia", HU: "Ungarn", JP: "Japan", ZA: "Sør-Afrika", "BE-FR": "Belgia/Frankrike", PT: "Portugal", CA: "Canada", HR: "Kroatia", AU: "Australia", RU: "Russland", IE: "Irland", "AF-C": "Sentral-Afrika", TR: "Tyrkia", MG: "Madagaskar" };
const hours = (n: number) => s(n, "time", "timer");
const times = (n: number) => (n === 1 ? "én gang" : `${n} ganger`);
/** "every N days" for the litter and care rules. */
const everyDays = (d: number) => (d === 1 ? "hver dag" : d === 2 ? "annenhver dag" : d === 7 ? "én gang i uken" : `hver ${ord(d)} dag`);

const nb: RegistryCopy = {
  mistakes: {
    title: (breed) => `Vanlige feil hos eiere av ${mid(breed)}`,
    intro: "Små vaner som gir større problemer – hvert punkt bygger på kildene om denne rasen.",
    exercise: "For lite mosjon hver dag",
    exerciseText: (amount) => `Behov for mosjon: ${amount}. Planlegg det inn hver dag, ikke bare i helgene.`,
    coat: "Å hoppe over pelsstellet",
    coatText: (brushing, shedding) => `Børsting: ${brushing}.${shedding ? ` ${cap(shedding)}.` : ""}`,
    weight: "For mange godbiter og for store måltider",
    heat: "Turer i varmen",
    growth: "Å glemme at valpen fortsatt vokser",
    growthText: (growthEnd) =>
      `Fullvoksen ved: ${growthEnd}. Fram til da planlegger du mosjon og fôr for et ungt dyr som fortsatt vokser – spør dyrlegen hva som passer for akkurat ditt dyr.`,
    mind: "For lite å bruke hodet til",
    health: "Å overse rasens kjente helseproblemer",
    practise: "I PetPrep øver barnet på akkurat disse vanene – skritt, måltider, stell – før det ekte kjæledyret flytter inn.",
  },
  hub: {
    title: "Bli kjent med dyret før det flytter inn.",
    intro:
      "Hva hver dyreart og rase i PetPrep virkelig trenger – fra kennelklubber, katteforbund, dyrevelferdsorganisasjoner og studier, med lenke til hver kilde. Pluss reglene PetPrep bruker for å simulere dem.",
    breedCount: (n) => `${n} ${s(n, "rase", "raser")} i leksikonet`,
    open: "Se rasene",
    openA11y: (many) => `Se rasene: ${lc(many)}`,
    freePlan: (name, activity) => `Gratisplan: ${lc(name)} (${activity} som voksen). Den har ingen egen raseside.`,
    otherSpecies: "Flere dyr er planlagt.",
    methodTitle: "Slik bygger vi leksikonet",
    method: [
      "Hvert faktum kommer fra en navngitt kilde – kennelklubber, katteforbund, dyrevelferdsorganisasjoner, veterinærforeninger og fagfellevurderte studier – og lenker til den. Rasestandarder gjengir vi med egne ord.",
      "Verdier som ingen kilde støtter, vises aldri som fakta. Når PetPrep må velge et tall til spillet, står det bare under «Slik simulerer PetPrep rasen», merket som en spilleregel.",
      "De samme dataene styrer appen: merkene, antallet måltider, skrittmålene og lekeøktene på disse sidene er nøyaktig de samme som kjæledyret i appen bruker.",
      "Leksikonet er ikke veterinærmedisinske råd. Helseopplysningene er bare veiledende og er ikke gjennomgått av en dyrlege.",
    ],
  },
  speciesStatus: { available: "I appen", coming_soon: "Snart i appen", info_only: "Bare til informasjon" },
  availability: {
    in_app: { label: "I appen", text: "Finnes i PetPreps 12-ukersutfordring (betalt rase)." },
    coming_soon: { label: "Snart i appen", text: "Ferdig bygget og testet; kommer med en av de neste versjonene av appen." },
    info_only: { label: "Bare til informasjon", text: "Står i leksikonet til informasjon; du kan ikke adoptere den i appen ennå." },
  },
  catalogue: {
    eyebrow: "Dyreleksikon",
    title: (many) => `${many}: raser i leksikonet`,
    lead: (many, count) =>
      `${count} ${breedsOf(many, count)} med behov ifølge kildene, hvem de passer for, og hvordan PetPrep simulerer dem. Søk, filtrer og sammenlign opptil tre.`,
    metaTitle: (many) => `${cap(breedsOf(many, 2))} – raseleksikon med kilder | PetPrep`,
    metaDescription: (many) =>
      `Søk i og sammenlign ${breedsOf(many, 2)} etter behov, størrelse og hvem de passer for. Hvert faktum lenker til kilden sin – pluss reglene PetPrep bruker for å simulere hver rase.`,
    searchLabel: "Søk etter raser",
    searchPlaceholder: "Navn, f.eks. labrador",
    filtersTitle: "Filtre",
    any: "Alle",
    availabilityLabel: "I PetPrep",
    sortLabel: "Sorter",
    sort: { recommended: "I appen først", az: "A–Å", size: "Størrelse (liten til stor)" },
    clear: "Fjern alle",
    results: (total) => `{n} av ${total} ${s(total, "rase", "raser")}`,
    none: "Ingen raser passer. Prøv med færre filtre.",
    loading: "Søket lastes inn …",
    page: "Side {n} av {total}",
    prev: "Forrige",
    next: "Neste",
    compareAdd: "Sammenlign {name}",
    compareBar: "{n} av {max} valgt for sammenligning",
    compareGo: "Sammenlign",
    compareMax: "Du kan sammenligne opptil {max} raser.",
    azTitle: "Alle raser A–Å",
    azIntro: "Alle rasene i leksikonet i alfabetisk rekkefølge.",
    freePlanTitle: "Gratisplan",
    guideTitle: "Slik velger du rase",
    guide: () => [
      "Begynn med det husstanden din kan gi hver dag: tid til mosjon, pelsstell og plass. Hver raseside viser disse behovene i en oversikt med den navngitte kilden til hver verdi; der kildene er uenige, vises alle verdiene.",
      "Når en rase har en størrelsesklasse (for hunder: svært liten, liten, middels stor, middels til stor, stor eller kjempestor), er det klassen den navngitte kilden oppgir – som regel en kennelklubb – og vektene er intervallene kildene oppgir, ikke våre anslag.",
      "Merker som «Passer for: en aktiv familie» er de samme som i appen, og hvert av dem er støttet av kilder. Tallene under «Slik simulerer PetPrep rasen» er PetPreps spilleregler, ikke stellråd. [Slik bygger vi leksikonet](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Sammenlign ${breedsOf(many, 2)}`,
    metaTitle: (many) => `Sammenlign ${breedsOf(many, 2)} | PetPreps dyreleksikon`,
    intro: "De viktigste behovene side om side, fra de samme kildene som rasesidene.",
    pick: "Velg to eller tre raser i katalogen for å sammenligne dem.",
    back: "Tilbake til katalogen",
    remove: "Fjern {name}",
    note: "Verdiene gjengis slik den navngitte kilden oppgir dem. Der kildene er uenige, viser rasesiden hver enkelt.",
    availabilityRow: "I PetPrep",
    activityRow: "Daglig mål som voksen i PetPrep (spilleregel)",
  },
  facets: {
    size: { label: "Størrelse", values: { toy: "Svært liten", small: "Liten", small_medium: "Liten til middels stor", medium: "Middels stor", medium_large: "Middels til stor", large: "Stor", giant: "Kjempestor" } },
    exercise: { label: "Daglig mosjon", values: { under_1h: "Opptil 1 time", h1_2: "1–2 timer", over_2h: "Mer enn 2 timer" }, line: (v) => `${lc(v)} om dagen` },
    grooming: { label: "Børsting", values: { weekly: "Én gang i uken", several_weekly: "Flere ganger i uken", daily: "Hver dag", other: "Annet" }, line: (v) => `børsting: ${lc(v)}` },
  },
  groups: {
    exercise: "Mosjon",
    play: "Lek",
    litter: "Kattedo",
    scratching: "Kloring",
    grooming: "Pels og pelsstell",
    feeding: "Måltider",
    water: "Vann",
    lifespan: "Levetid",
    stages: "Livsfaser",
    size: "Størrelse og vekt",
    training: "Trening",
  },
  fields: {
    size: "Størrelse",
    height: "Mankehøyde",
    weight: "Vekt som voksen",
    growth_end: "Fullvoksen ved",
    lifespan: "Levetid",
    exercise: "Daglig mosjon",
    coat: "Pels",
    grooming_frequency: "Børsting",
    grooming_level: "Behov for pelsstell",
    shedding: "Røyting",
    litter_scoop: "Rens kattedoen",
    litter_full_change: "Skift all kattesanden",
    litter_pee: "Tisser (voksen)",
    litter_poo: "Har avføring (voksen)",
    water_need: "Vannbehov",
    sleep: "Søvn (voksen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 uker",
    puppy_3_6_months: "3–6 måneder",
    puppy_6_12_months: "6–12 måneder",
    kitten_6_12_weeks: "6–12 uker",
    kitten_3_6_months: "3–6 måneder",
    kitten_6_12_months: "6–12 måneder",
    puppy: "Valp",
    kitten: "Kattunge",
    young_adult: "Ung voksen",
    mature_adult: "Moden voksen",
    adult: "Voksen",
    senior: "Senior",
  },
  categories: {
    size: { toy: "svært liten", small: "liten", small_medium: "liten til middels stor", medium: "middels stor", medium_large: "middels til stor", large: "stor", giant: "kjempestor" },
    coat: { moderately_long: "halvlang", smooth: "glatt (kort)", short: "kort", medium: "middels lang", short_long: "kort eller lang (to pelsvarianter)", long: "lang" },
    grooming_frequency: {
      at_least_once_a_week: "minst én gang i uken",
      at_least_once_or_twice_a_week: "minst én eller to ganger i uken",
      once_a_week: "én gang i uken",
      more_than_once_a_week: "mer enn én gang i uken",
      daily: "daglig",
      every_day: "hver dag",
    },
    // "Behov for pelsstell: moderat / stort / lite" (et behov)
    grooming_level: { moderate: "moderat", high: "stort", low: "lite" },
    shedding: { yes: "røyter", no: "røyter ikke (det er ikke det samme som allergivennlig)", high: "røyter mye", moderate: "røyter moderat", low: "røyter lite", minimal: "røyter minimalt" },
  },
  statements: {
    food_motivated: () => "Svært matmotivert – en hjelp i treningen, men følg med på porsjonene.",
    coren_rank: (v) => `Nr. ${String(v)} på Stanley Corens rangering av arbeids- og lydighetsintelligens.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-standard nr. ${x.number}, gruppe ${x.group} (${fciGroups[x.group] ?? "—"}); opprinnelse: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Lek: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} lekeøkter på ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}minutter om dagen.`;
    },
    kittens_play_more: () => "Kattunger trenger å leke oftere.",
    scratching_natural: () => "Kloring er naturlig og nødvendig: gi katten et klorestativ, og straff den aldri for å klore.",
    water_fresh: () => "Friskt vann hele tiden; vask skålen og fyll den opp hver dag.",
    grooming_sources_differ: () => "Kildene er uenige om kjemmingen: fra hver dag til én gang i uken.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `median ${t}`,
    more_than: (t) => `mer enn ${t}`,
    less_than: (t) => `mindre enn ${t}`,
    at_least: (t) => `minst ${t}`,
    up_to: (t) => `opptil ${t}`,
    ideal: (t) => `ideelt (rasestandard): ${t}`,
    mean: (t) => `målt gjennomsnitt: ${t}`,
    about: (t) => `ca. ${t}`,
    until: (t) => `fram til ${t}`,
    until_about: (t) => `fram til ca. ${t}`,
    span: (t) => t,
    from: (t) => `fra ${t}`,
    last: (t) => `de siste ${t}`,
    every: (t) => every(t),
    expectancy: (t) => `forventet levealder ved fødselen: ${t}`,
    smaller_meals: (t) => `${t}, mindre porsjoner`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t) => `${t}${NB}år`,
    months: (t, n) => `${t}${NB}${s(n, "måned", "måneder")}`,
    days: (t, n) => `${t}${NB}${s(n, "dag", "dager")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} om dagen` : `${t}${NB}minutter om dagen`),
    meals_per_day: (t, n) => `${t}${NB}${s(n, "måltid", "måltider")} om dagen`,
    times_per_day: (t, n) => `${t}${NB}${s(n, "gang", "ganger")} om dagen`,
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} om dagen`,
    ml_per_kg_day: (t) => `${t}${NB}ml per kg kroppsvekt om dagen`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% av forventet levetid`,
  },
  males: "hanner",
  females: "hunner",
  or: " eller ",
  notes: { size_class_guidance: "veiledende for størrelsesklassen" },
  stageLabels: {
    dog: { puppy: "Valp", young: "Unghund", adult: "Voksen", senior: "Senior" },
    cat: { puppy: "Kattunge", young: "Ung katt", adult: "Moden katt", senior: "Senior" },
  },
  activity: {
    steps: (n) => `${n}${NB}skritt`,
    steps_range: (from, to) => `${from} → ${to}${NB}skritt`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth}${NB}skritt per levemåned (${first} ved ankomst), høyst ${cap} fra måned ${capMonth}`,
    play_sessions: (n) => `${n} ${s(n, "lekeøkt", "lekeøkter")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Skrittmål = minutter daglig mosjon × ${p.per_minute}${NB}skritt: et voksent dyr får ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}minutter`}, altså ${f.num(p.steps)}${NB}skritt om dagen.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Lærer kommandoer langsommere enn blandingshunden i gratisplanen (${f.num(p.multiplier)}× dens tempo).`
        : p.multiplier === 1
          ? "Lærer kommandoer like raskt som blandingshunden i gratisplanen."
          : `Lærer kommandoer ${f.num(p.multiplier)}× så raskt som blandingshunden i gratisplanen.`,
    senior_share: (p, f) => `Blir senior i måned ${p.months} (${f.num(p.months / 12, 1)}${NB}år) – den siste fjerdedelen av rasens forventede levetid.`,
    walk_sensor: () => "Turene teller ekte skritt fra Apple Helse eller Health Connect (med tillatelse, bare lesetilgang) og telefonens bevegelsessensor – ingen GPS.",
    play_instead_of_steps: (p, f) =>
      `Ingen turer: en voksen katt trenger ${p.sessions} ${s(p.sessions, "lekeøkt", "lekeøkter")} om dagen med en lekestang, med minst ${f.num(p.gap_minutes / 60)}${NB}${hours(p.gap_minutes / 60)} imellom.`,
    litter_rule: (p) =>
      `Kattedo: en voksen katt bruker den ${p.uses} ${s(p.uses, "gang", "ganger")} om dagen; doen renses innen ${p.scoop_hours}${NB}${hours(p.scoop_hours)} etter hvert besøk (utenom de stille timene), og all kattesanden skiftes ${everyDays(p.change_days)}.`,
    scratching_after_missed_play: () => "Etter en dag med for lite lek klorer katten én gang på noe; barnet bærer den bort til klorestativet.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kjemming én gang i uken." : p.per_week === 2 ? "Kjemming to ganger i uken." : `Kjemming ${p.per_week} ganger i uken.`),
    no_walk_in_heat: (p) =>
      `Om sommeren (juni–august; desember–februar på den sørlige halvkule) viser barnets skjerm og turskjermen en rolig påminnelse mellom kl. ${clock(p.from)} og ${clock(p.to)} (familiens lokale tid): ingen turer i varmen. Ingen værdata, ingen straff – skrittene teller fortsatt.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "rengjøring av hudfoldene",
        tooth_brushing: "tannpuss",
        ear_cleaning: "kontroll og rengjøring av ørene",
        nail_trim: "klipping av klørne",
        bath: "bad",
        groomer_visit: "besøk hos en profesjonell hundefrisør",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "hver dag"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "én gang i uken"
              : weeks === 2
                ? "annenhver uke"
                : `hver ${ord(weeks)} uke`
            : q.period_days === 7
              ? `${times(q.times)} i uken`
              : `${times(q.times)} ${q.period_days === 1 ? "om dagen" : everyDays(q.period_days)}`;
      const who = q.actor === "parent" ? "en påminnelse til forelderen" : "en oppgave for barnet";
      return `Stell: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Se valpen sammen med moren der den er født.",
      min_age_puppy: "Valpen bør ikke forlate moren før den er 8 uker gammel.",
      pedigree_fci: "Be om stamtavlen. Etter FCIs regler kan det bare utstedes stamtavle når avstamningen er korrekt.",
      parents_health_tests: "Be om å få se resultatene av helsetestene til begge foreldrene. Hvilke tester som er viktige, avhenger av rasen.",
      breed_club_rules: "Nasjonale kennelklubber kan ha avlsregler som går lenger enn FCIs – spør raseklubben hvilke tester foreldrene må ha.",
      written_contract: "Be om en skriftlig kjøpekontrakt som beskriver valpens bakgrunn og helse.",
      kitten_see_mother: "Se kattungen sammen med moren der kattungene bor.",
      kitten_min_age: "Etter FIFes stamtavleregler flytter en kattunge ikke til et nytt hjem før den er 14 uker gammel.",
      kitten_vaccination: "Kattungen er fullvaksinert (kattepest/panleukopeni, calicivirus, herpesvirus) og har med seg et vaksinasjonskort.",
      kitten_pedigree: "En kattunge med stamtavle får med seg stamtavlen, og den viser minst tre generasjoner.",
      kitten_parents_tests: "Spør om noen av foreldrene har hatt helseproblemer som kattungen kan arve.",
    },
    tests: {
      dna_poag_pll: "DNA-test for primært åpenvinkelglaukom og primær linseluksasjon (POAG/PLL), arvelige øyesykdommer som kan føre til blindhet",
      hip_scheme: "Røntgen av hoftene for hofteleddsdysplasi (UK: BVA/KC-ordningen)",
      elbow_scheme: "Røntgen av albuene for albueleddsdysplasi (UK: BVA/KC-ordningen)",
      eye_scheme: "Øyeundersøkelse hos en dyrlege med spesialkompetanse på øyne (UK: BVA/KC/ISDS-ordningen; for noen raser med gonioskopi)",
      heart_scheme: "Hjerteundersøkelse for mitralklaffsykdom",
      boas_grading: "Pustetest for brakycefalt obstruktivt luftveissyndrom (BOAS-gradering)",
      ivdd_screening: "Undersøkelse av ryggen for sykdom i mellomvirvelskivene (IVDD)",
      hearing_baer: "Hørselstest for døvhet (BAER)",
      cm_sm_mri: "MR-undersøkelse for Chiari-lignende misdannelse og syringomyeli (UK: BVA/KC-ordningen for CM/SM)",
      inbreeding_coi: "Genetisk variasjon – sjekk innavlsgraden",
      dna_prcd_pra: "DNA-test for progressiv retinal atrofi (prcd-PRA)",
      dna_rcd4_pra: "DNA-test for progressiv retinal atrofi (rcd4)",
      dna_gr_pra2: "DNA-test for progressiv retinal atrofi (GR_PRA2)",
      dna_cnm: "DNA-test for sentronukleær myopati (CNM)",
      dna_eic: "DNA-test for anstrengelsesutløst kollaps (EIC)",
      dna_hnpk: "DNA-test for arvelig nasal parakeratose (HNPK)",
      dna_sd2: "DNA-test for skjelettdysplasi 2 (SD2)",
      dna_mcd: "DNA-test for makulær korneadystrofi (MCD)",
      dna_stgd: "DNA-test for Stargardts sykdom (STGD)",
      dna_cc_de: "DNA-test for curly coat/dry eye-syndrom (CC/DE)",
      dna_ef: "DNA-test for episodic falling (EF)",
      dna_cea: "DNA-test for collie eye anomaly (CEA/CH)",
      dna_cl: "DNA-test for ceroid lipofuscinose (CL)",
      dna_igs: "DNA-test for Imerslund-Gräsbecks syndrom (IGS)",
      dna_mdr1: "DNA-test for overfølsomhet for visse legemidler (MDR1)",
      dna_tns: "DNA-test for trapped neutrophil syndrome (TNS)",
      dna_sn: "DNA-test for sensorisk nevropati (SN)",
      dna_ggd: "DNA-test for goniodysgenese og risiko for grønn stær (GGD)",
      dna_raines: "DNA-test for Raines syndrom",
      dna_dm: "DNA-test for degenerativ myelopati (DM)",
      dna_de: "DNA-test for degenerativ encefalopati (DE)",
      dna_jadd: "DNA-test for juvenil Addisons sykdom (JADD)",
      dermoid_sinus_scheme: "Valpesjekk for dermoid sinus (raseklubbens ordning)",
      dna_jme: "DNA-test for juvenil myoklonisk epilepsi (JME)",
      dna_je: "DNA-test for juvenil epilepsi (JE)",
      dna_lsd: "DNA-test for lysosomal lagringssykdom (LSD)",
      dna_ampn: "DNA-test for alaskan malamute-polynevropati (AMPN)",
      dna_fanconi: "DNA-test for Fanconis syndrom (en nyresykdom)",
      dna_pra_bj1: "DNA-test for progressiv retinal atrofi hos basenji (PRA-BJ1)",
      thyroid_scheme: "Undersøkelse av foreldrenes skjoldbruskkjertel",
      dna_pap_pra1: "DNA-test for progressiv retinal atrofi hos papillon (Pap-PRA1)",
      dna_nad: "DNA-test for nevroaksonal dystrofi (NAD)",
      dna_eopra: "DNA-test for tidlig debuterende progressiv retinal atrofi (EOPRA)",
      dna_cu: "DNA-test for cystinuri (CU), en arvelig sykdom som gir stein i nyrer og urinblære",
      heart_echo_scheme: "Hjerteundersøkelse med fargedoppler-ultralyd (raseklubbens ordning)",
      cardiac_exam: "Hjerteundersøkelse av foreldrene (raseklubbens anbefaling)",
      dna_rd_osd: "DNA-test for retinal dysplasi/okuloskjelettal dysplasi (RD/OSD)",
      dna_xlpra1: "DNA-test for X-bundet progressiv retinal atrofi (XLPRA1)",
      dna_cmo: "Test for kraniomandibulær osteopati (CMO), en arvelig beinsykdom i kjeven",
      dna_hsf4: "DNA-test for arvelig grå stær (HSF4)",
      dna_lafora: "DNA-test for Laforas sykdom",
      dna_nccd: "DNA-test for neonatal cerebellar kortikal degenerasjon (NCCD)",
      dna_fviid: "DNA-test for faktor VII-mangel (FVIID)",
      dna_mls: "DNA-test for Musladin-Lueke-syndrom (MLS)",
      dna_vwd1: "DNA-test for von Willebrands sykdom type 1 (vWD1)",
      dna_mac: "DNA-test for mottakelighet for infeksjon med Mycobacterium avium-kompleks (MAC)",
      dna_imgd: "DNA-test for arvelig myopati hos grand danois (IMGD), en sykdom som bryter ned musklene",
      dna_poag: "DNA-test for primært åpenvinkelglaukom (POAG), en arvelig øyesykdom som kan føre til blindhet",
      dna_aon: "DNA-test for nevropati med debut i voksen alder (AON), en arvelig nervesykdom",
      dna_fn: "DNA-test for familiær nefropati (FN), en arvelig nyresykdom",
      patella_scheme: "Kontroll av kneskjellene for patellaluksasjon før avl",
      kidney_scheme: "Ultralyd av nyrene for manglende eller misdannet nyre (raseklubbens anbefaling)",
      kidney_upc_scheme: "Urinprøve (forholdet mellom protein og kreatinin) for nyresykdom (raseklubbens anbefaling)",
      dna_gld: "DNA-test for globoidcelleleukodystrofi (GLD), en arvelig nervesykdom",
      liver_shunt_scheme: "Leverundersøkelse for portosystemisk shunt eller mikrovaskulær dysplasi (raseklubbens anbefaling)",
      breed_health_scheme: "Raseklubbens helseprogram for foreldrene",
      hemivertebrae_scheme: "Røntgen av foreldrenes ryggrad for hemivertebrae (misdannede ryggvirvler) når de er minst 12 måneder gamle",
      dna_hcm_mc: "DNA-test for hypertrofisk kardiomyopati (MC HCM)",
      dna_sma: "DNA-test for spinal muskelatrofi (SMA)",
      dna_pk_def: "DNA-test for pyruvatkinasemangel (PK def)",
      hcm_negative: "Avlskatter må være HCM-negative (hjertesykdommen hypertrofisk kardiomyopati)",
      dna_gsd4: "DNA-test for glykogenlagringssykdom type IV (GSD IV)",
      dna_pra_b: "DNA-test for progressiv retinal atrofi hos bengal (PRA-b)",
      dna_jlpp: "DNA-test for juvenil larynkslammelse og polynevropati (JLPP)",
      dna_lemp2: "DNA-test for leukoencefalomyelopati (LEMP-2)",
      dna_lemp: "DNA-test for leukoencefalomyelopati (LEMP)",
      dna_lpn1: "DNA-test for leonberger-polynevropati (LPN1)",
      dna_lpn2: "DNA-test for leonberger-polynevropati (LPN2)",
      dna_lppn3: "DNA-test for larynkslammelse og polynevropati (LPPN3)",
      dna_huu: "DNA-test for hyperurikosuri (HUU)",
      dna_dcm: "DNA-test for dilatert kardiomyopati (DCM), en sykdom i hjertemuskelen",
      dna_pra5: "DNA-test for progressiv retinal atrofi (PRA5)",
      dna_dings2: "DNA-test for dancing Dobermann disease (DINGS2), en nerve- og muskelsykdom",
      dna_slem: "DNA-test for spongiform leukoencefalomyelopati (SLEM, «shaking puppy syndrome»), en lidelse i hjernen og ryggmargen hos unge valper",
      dna_ams: "DNA-test for akralt mutilasjonssyndrom (AMS), en nervesykdom som fjerner smertefølelsen i potene",
      dna_dams: "DNA-test for dyserytropoietisk anemi og myopatisyndrom (DAMS), en blod- og muskelsykdom",
      dna_fuco: "DNA-test for fukosidose, en arvelig sykdom i nervesystemet",
      dna_pfk: "DNA-test for fosfofruktokinasemangel (PFK), en arvelig enzymsykdom i blodet og musklene",
      dna_pra_cord1: "DNA-test for progressiv retinal atrofi (PRA cord1)",
      dna_bbs2_pra: "DNA-test for progressiv retinal atrofi (BBS2-PRA)",
      dna_cnga1_pra: "DNA-test for progressiv retinal atrofi (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-test for progressiv retinal atrofi (PRA-rcd2)",
      dna_gm1: "DNA-test for GM1-gangliosidose (en arvelig sykdom i nervesystemet)",
      dna_gm2: "DNA-test for GM2-gangliosidose (en arvelig sykdom i nervesystemet)",
      dna_vwd3: "DNA-test for von Willebrands sykdom type 3 (vWD3), en arvelig blødersykdom",
      dna_pra_rcd3: "DNA-test for progressiv retinal atrofi (PRA-rcd3)",
      dna_clad: "DNA-test for canin leukocytt-adhesjonsdefekt (CLAD), en arvelig immunsykdom",
      dna_ncl8: "DNA-test for nevronal ceroid lipofuscinose (NCL8), en arvelig sykdom i nervesystemet",
      dna_pra_rcd1: "DNA-test for progressiv retinal atrofi (rcd1)",
      dna_pra4: "DNA-test for progressiv retinal atrofi (PRA4)",
      dna_vwd2: "DNA-test for von Willebrands sykdom type 2 (vWD2), en arvelig blødersykdom",
      dna_l2hga: "DNA-test for L-2-hydroksyglutarsyreuri (L-2-HGA), en arvelig stoffskiftesykdom i nervesystemet",
      dna_pll: "DNA-test for primær linseluksasjon (PLL), en arvelig øyesykdom der linsen glir ut av stilling",
      dna_loa: "DNA-test for sent debuterende ataksi (LOA), en arvelig sykdom som påvirker balanse og koordinasjon",
      dna_sca: "DNA-test for spinocerebellar ataksi (SCA), en arvelig sykdom i nervesystemet",
    },
  },
  health: {
    splenic_torsion: "Miltvridning, som krever akutt hjelp fra dyrlege, er vanligere hos denne rasen enn hos andre store raser.",
    shar_pei_fever: "Familiær shar pei-feber kan forekomme i rasen: anfall av høy feber med smertefulle, hovne ledd og et hovent ansikt – kontakt dyrlege med en gang.",
    weight_gain: "Legger lett på seg – porsjoner og godbiter må følges med på.",
    hip_elbow_dysplasia_eye_conditions: "Kan være disponert for hofte- og albueleddsdysplasi og for flere arvelige øyesykdommer.",
    cancer_risk: "Kildene beskriver en høyere risiko for kreft hos denne rasen.",
    flat_face_breathing:
      "Rase med flatt ansikt (brakycefal): den korte snuten, de trange neseborene og ekstra bløtvev i luftveiene kan gjøre det tyngre å puste (brakycefalt obstruktivt luftveissyndrom, BOAS).",
    heat_stroke_risk: "Blir fort overopphetet og er mer utsatt for heteslag enn de fleste hunder, særlig når det er varmt.",
    skin_fold_ear_problems: "Disponert for ørebetennelse og infeksjoner i hudfoldene; hudfoldene må holdes rene og tørre.",
    ear_infections_long_ears: "Øreinfeksjoner kan oppstå på grunn av de lange ørene; bakterier kan hope seg opp i øregangen.",
    collie_eye_pra:
      "Arvelige øyesykdommer forekommer i rasen: collie eye anomaly, en misdannelse bakerst i øyet, og progressiv retinal atrofi, som langsomt kan føre til blindhet; det finnes øyeundersøkelser og DNA-tester.",
    merle_colour_risk: "Merle er ikke en farge rasestandarden godkjenner; hos denne rasen gir den høyere risiko for problemer med hørsel og syn.",
    hind_leg_conformation:
      "The Royal Kennel Club nevner formen på bakbeina og hundens bevegelser som et problemområde hos rasen; en sunn hund har rett rygg og moderate bakbein.",
    hip_elbow_dysplasia: "Kan være disponert for hofte- og albueleddsdysplasi; oppdrettere rådes til å teste foreldrenes hofter og albuer før avl.",
    degenerative_myelopathy: "Degenerativ myelopati, en sykdom i ryggmargen som langsomt svekker bakbeina, forekommer i rasen; det finnes en DNA-test.",
    exercise_induced_collapse: "Anstrengelsesutløst kollaps, en arvelig nevromuskulær sykdom som kan få hunden til å kollapse etter hard fysisk aktivitet, forekommer i rasen.",
    heart_valve_disease:
      "Hjertesykdom som skyldes en svekket mitralklaff, er et stort problem i rasen; den oppdages ofte først som en bilyd på hjertet, og avlshunder bør hjerteundersøkes først.",
    chiari_syringomyelia:
      "Chiari-lignende misdannelse og syringomyeli, en smertefull tilstand med væskefylte hulrom i ryggmargen nær hjernen, forekommer i rasen og henger sammen med skallens form; den påvises med MR-undersøkelse.",
    eye_conditions:
      "Arvelige øyesykdommer som grå stær forekommer i rasen, og utstående eller irriterte øyne er et problemområde; det finnes øyeundersøkelser og DNA-tester.",
    epilepsy: "Epilepsi, en sykdom i hjernen som kan gi anfall, forekommer i rasen.",
    storage_disease: "En arvelig lagringssykdom i nervesystemet kan ramme unge hunder av rasen; med en DNA-test av foreldrene kan oppdrettere unngå den.",
    chondrodysplasia: "Kondrodysplasi, en forstyrrelse i veksten av brusk og bein, forekommer i rasen; valper kan undersøkes med røntgen.",
    polyneuropathy: "En arvelig nervesykdom (polynevropati) forekommer i rasen; med en DNA-test av foreldrene kan oppdrettere unngå den.",
    fanconi_syndrome:
      "Fanconis syndrom, en arvelig nyresykdom som gjør at sukker lekker ut i urinen, forekommer i rasen; med en DNA-test av foreldrene kan oppdrettere unngå den.",
    pyruvate_kinase_deficiency: "Pyruvatkinasemangel, en arvelig feil ved de røde blodcellene som gir blodmangel (anemi), kan forekomme i rasen.",
    back_disc_disease: "Sykdom i mellomvirvelskivene, et problem med de støtdempende skivene mellom ryggvirvlene, forekommer i rasen.",
    pra_eye_disease: "Progressiv retinal atrofi, en arvelig øyesykdom som langsomt kan føre til blindhet, forekommer i rasen; det finnes DNA-tester og øyeundersøkelser.",
    hip_dysplasia: "Hofteleddsdysplasi, et dårlig utviklet hofteledd som kan føre til slitasjegikt, forekommer i rasen; oppdrettere rådes til å få foreldrenes hofter vurdert.",
    bloat_gdv: "Magedreining (gastrisk dilatasjon og volvulus), der magesekken vrir seg, kan forekomme i rasen – det er en akutt tilstand som krever øyeblikkelig hjelp fra dyrlege.",
    inherited_eye_disease: "Arvelige øyesykdommer forekommer i rasen, for eksempel collie eye anomaly, grå stær og progressiv retinal atrofi.",
    drug_sensitivity_mdr1:
      "Noen hunder av rasen har en arvelig overfølsomhet for visse legemidler (MDR1) – hvis hunden din er rammet, må du si fra til dyrlegen.",
    merle_to_merle_breeding:
      "Merle er en standardfarge hos denne rasen; to merle-hunder bør ikke pares med hverandre, fordi valpene da risikerer nedsatt syn og hørsel – The Royal Kennel Club registrerer ikke slike valper.",
    kneecap_luxation: "Patellaluksasjon, der kneskjellet midlertidig glir ut av stilling, forekommer i rasen.",
    pra_and_eyelashes:
      "Øyeproblemer forekommer i rasen: progressiv retinal atrofi, som langsomt kan føre til blindhet, og ekstra øyevipper som gnir mot øyet (distichiasis); oppdrettere rådes til å få foreldrenes øyne undersøkt.",
    liver_shunt: "Portosystemisk shunt (levershunt), der blodet går utenom leveren, kan forekomme i rasen.",
    skin_allergies:
      "Hudallergier er et kjent problem hos rasen; The Royal Kennel Club ber dommere se etter tegn på hudbetennelse, og eiere rådes til å spørre dyrlegen før de velger sjampo.",
    westie_lung: "En lungesykdom kjent som «westie lung» (idiopatisk lungefibrose), som gjør det tyngre å puste, kan forekomme i rasen, mest hos eldre hunder.",
    jaw_bone_disorder: "En arvelig beinsykdom i kjeven kan forekomme i rasen.",
    dry_eye: "Tørre øyne, der øynene ikke lager nok tårer og blir tørre og såre, kan forekomme i rasen.",
    heart_hcm: "Hypertrofisk kardiomyopati (HCM), en arvelig hjertesykdom der hjertemuskelen blir tykkere, forekommer i rasen.",
    dental_weight_nail_care:
      "En stor britisk studie nevner tannsykdom, overvekt og for lange klør blant de vanligste problemene hos rasen, så eiere rådes til å holde tannstell, vektkontroll og klostell ved like.",
    dental_weight_care:
      "PetMD nevner tannsykdom og overvekt blant problemene man bør følge med på, så eiere rådes til å pusse kattens tenner jevnlig og holde vekten under kontroll.",
    gsd_iv: "Glykogenlagringssykdom type IV (GSD IV), en arvelig sykdom som rammer kattunger, forekommer i rasen; med en DNA-test av foreldrene kan oppdrettere unngå den.",
    hip_dysplasia_weight: "Hofteleddsdysplasi, et dårlig utviklet hofteledd, kan forekomme i rasen; PetMD anbefaler å holde katten på en sunn vekt for å beskytte leddene.",
    laryngeal_paralysis_polyneuropathy:
      "Juvenil larynkslammelse og polynevropati (JLPP), en arvelig nervesykdom som rammer strupehodet og bakbeina, forekommer i rasen; med en DNA-test av foreldrene kan oppdrettere unngå den.",
    heart_sas: "Subaortastenose, en innsnevring like under en hjerteklaff som kan gi bilyd, forekommer i rasen; avlshunder bør få hjertet undersøkt først.",
    inherited_eye_defects: "Arvelige øyesykdommer forekommer i rasen, for eksempel retinal dysplasi og persisterende pupillmembran; det finnes øyeundersøkelser.",
    skin_fold_infections:
      "Hudfoldene, særlig i ansiktet, kan holde på fuktighet og bli infisert (hudfoldpyodermi); rynkene i ansiktet må rengjøres hver dag.",
    eyelid_eye_problems: "Øyelokkproblemer (øyelokk som ruller innover eller utover), tørre øyne og cherry eye forekommer i rasen; det finnes øyeundersøkelser.",
    hip_elbow_joint_disease: "Hofte- og albueleddsdysplasi, der leddene ikke utvikler seg riktig, forekommer i rasen og kan føre til leddsykdom.",
    hip_dysplasia_arthritis: "Hofteleddsdysplasi, et løst og dårlig utviklet hofteledd, forekommer i rasen og kan med tiden føre til slitasjegikt.",
    bleeding_disorder_vwd: "Von Willebrands sykdom, et arvelig problem med blodets levring som kan gi kraftige blødninger, forekommer i rasen.",
    heart_muscle_disease: "Kardiomyopati, et forstørret hjerte som skyldes en svekket hjertemuskel, kan forekomme i rasen.",
    itchy_skin_allergy: "Hudallergier (atopi), som gir kløe og sår hud, kan forekomme i rasen.",
    entropion_cherry_eye:
      "Øyelokk som ruller innover (entropion), og cherry eye, der det tredje øyelokket presses ut, kan forekomme i rasen; cherry eye kan rettes opp med operasjon.",
    dental_disease_tooth_brushing:
      "En stor britisk studie nevner tannsykdom som det klart vanligste problemet hos rasen, og melketenner som ikke faller ut, er også vanlige, så eiere oppfordres til å stelle hundens tenner hver dag, for eksempel ved å pusse dem.",
    windpipe_collapse: "Trakeakollaps, der luftrøret mister stivheten og kan gi svakhet og kollaps, kan forekomme i rasen.",
    eye_problems_pra_lens_dry_eye:
      "Øyeproblemer forekommer i rasen, for eksempel progressiv retinal atrofi, som langsomt kan føre til blindhet, en linse som har glidd ut av stilling (linseluksasjon), og tørre øyne.",
    cataracts_lens_luxation: "Øyeproblemer kan forekomme i rasen, for eksempel grå stær, som gjør linsen uklar, og en linse som har glidd ut av stilling (linseluksasjon).",
    wobbler_syndrome: "Wobbler-syndrom, der ustabile virvler i nakken trykker på ryggmargen og svekker bakbeina, kan forekomme i rasen.",
    eye_phpv:
      "En medfødt øyefeil (persisterende hyperplastisk primær vitreus, PHPV) kan forekomme i rasen; oppdrettere rådes til å få foreldrenes øyne undersøkt.",
    certain_cancers: "Visse kreftformer kan forekomme i rasen.",
    bare_skin_sun_cold: "Den nakne huden hos den hårløse varianten må beskyttes mot sol og kulde.",
    l2hga_nervous_system:
      "L-2-hydroksyglutarsyreuri (L-2-HGA), en arvelig stoffskiftesykdom som påvirker nervesystemet, kan forekomme i rasen; det finnes en DNA-test av foreldrene.",
    short_face_breathing:
      "En rase med moderat kort ansikt: noen hunder med kortere ansikt kan få alvorlige pusteproblemer (brakycefalt obstruktivt luftveissyndrom, BOAS).",
    corneal_ulcers: "Øyeproblemer som sår på hornhinnen er mer sannsynlige på grunn av skallens form og de fremtredende øynene; det finnes øyeundersøkelser.",
    skin_folds_allergies:
      "Hudproblemer som allergier, vorter, hudflik og såre hudfolder i ansiktet (hudfolddermatitt) kan forekomme; foldene i ansiktet bør holdes rene og tørre.",
    heart_cardiomyopathy_aortic_stenosis: "Hjerteproblemer som kardiomyopati og aortastenose kan forekomme i rasen.",
    dental_disease_care: "En stor britisk studie nevner tannsykdom som det vanligste problemet hos rasen, og eiere rådes til å prioritere tannstell.",
    bladder_stones: "Blærestein, ansamlinger av mineraler som dannes i blæren og urinen, kan forekomme i rasen.",
    deafness: "Døvhet på ett eller begge ører forekommer i rasen; valpers hørsel kan undersøkes med en BAER-test.",
    mitral_valve_disease:
      "Mitralklaffsykdom, en hjertesykdom der en svekket klaff lar blodet strømme tilbake i hjertet, forekommer i rasen; en dyrlege kan lytte på hjertet til avlshunder før de brukes i avl.",
    eye_problems_pra_cataracts_dry_eye:
      "Øyeproblemer forekommer i rasen, for eksempel progressiv retinal atrofi, som langsomt kan føre til blindhet, grå stær og tørre øyne; det finnes øyeundersøkelser.",
    skin_comedo_allergy: "Hudproblemer kan forekomme, for eksempel schnauzer comedo syndrome (en type betente hårsekker) og hudallergier (atopi) som gir kløe.",
    shorter_face_boas: "En brakycefal rase (kort ansikt): det kortere ansiktet kan gi alvorlige pusteproblemer (brakycefalt obstruktivt luftveissyndrom, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina:
      "Øyeproblemer forekommer i rasen, for eksempel tørre øyne, grå stær, progressiv retinal atrofi, som langsomt kan føre til blindhet, og netthinneløsning.",
    hypothyroidism: "Lavt stoffskifte (hypotyreose), som kan påvirke vekt, hud og energinivå, kan forekomme i rasen.",
    open_fontanelle: "Åpen fontanelle, et mykt punkt på skallen som ikke lukker seg helt, kan forekomme i rasen.",
    collapsing_trachea: "Trakeakollaps, en svakhet i luftrøret som kan gi hoste og pustevansker, kan forekomme i rasen.",
    gm1_gangliosidosis: "GM1-gangliosidose, en arvelig sykdom i nervesystemet, kan forekomme i rasen; en DNA-test av foreldrene kan utelukke den.",
    addisons_disease: "Addisons sykdom, mangel på hormoner fra binyrene, kan forekomme i rasen.",
    protein_losing_disease: "Proteintapende sykdommer i nyrene eller tarmen, som kan gi diaré og vekttap, kan forekomme i rasen.",
    diabetes_mellitus: "Diabetes mellitus (sukkersyke), der kroppen ikke klarer å regulere blodsukkeret ordentlig, kan forekomme i rasen.",
    dental_disease_home_brushing:
      "Som mange små hunder er rasen disponert for tannsykdom, så det anbefales å pusse tennene hjemme med hundetannbørste og hundetannkrem.",
    dermoid_sinus:
      "Dermoid sinus, en smertefull tilstand der en kanal i huden på ryggen står i forbindelse med ryggmargen, kan forekomme i rasen; raseklubbene har en kontrollordning for dermoid sinus hos valper.",
    cataracts: "Grå stær, som gjør øyelinsen uklar og kan føre til synstap, kan forekomme i rasen.",
    pra_inherited_blindness: "Progressiv retinal atrofi, en arvelig øyesykdom som langsomt kan føre til blindhet, kan forekomme i rasen.",
    eyelids_turned: "Øyelokk som ruller innover (entropion) eller utover (ektropion), kan forekomme i rasen; spør etter foreldre med øyeundersøkelse.",
    glaucoma_poag:
      "Primært åpenvinkelglaukom, der væske hoper seg opp inne i øyet og gir smerter og mulig blindhet, kan forekomme i rasen; det finnes en DNA-test for foreldrene.",
    skin_fold_dermatitis: "Den løse huden danner folder som kan bli såre og infiserte; de må sjekkes hver dag og holdes rene og tørre.",
    skin_fold_care: "Hudfoldene i ansiktet kan bli såre og infiserte (hudfolddermatitt); de må rengjøres og tørkes jevnlig.",
    eyelid_problems:
      "Øyelokkproblemer kan forekomme i rasen: øyelokk som ruller innover (entropion) eller utover (ektropion), og cherry eye, der det tredje øyelokket presses ut.",
    skin_allergy_face_folds: "Hudallergier (atopi) som gir kløe, kan forekomme i rasen, og hudfoldene i ansiktet må rengjøres hver dag.",
    skin_ear_allergies:
      "Miljøallergier kan forekomme i rasen og kan føre til gjentatte hud- eller øreinfeksjoner; PetMD foreslår ukentlig rengjøring av ørene hos en hund med allergier.",
    gum_disease_daily_brushing:
      "Rasen er disponert for tannkjøttsykdom (gingivitt og periodontitt), så PetMD anbefaler å pusse hundens tenner hver dag og en årlig tannkontroll hos dyrlegen.",
    pra_pk_def:
      "To arvelige sykdommer forekommer i rasen: progressiv retinal atrofi, en øyesykdom som kan føre til blindhet, og pyruvatkinasemangel, en blodsykdom; med DNA-tester av foreldrene kan oppdrettere unngå dem.",
    windpipe_collapse_breathing: "Trakeakollaps, der ringene i luftrøret faller sammen og gjør det vanskelig å puste, kan forekomme i rasen.",
    eye_problems_pra_cataracts_entropion:
      "Øyeproblemer forekommer i rasen, for eksempel progressiv retinal atrofi, som langsomt kan føre til blindhet, grå stær, som gjør linsen uklar, og øyelokk som ruller innover (entropion); det finnes øyeundersøkelser.",
    elbow_dysplasia_arthritis: "Albueleddsdysplasi, et dårlig utviklet albueledd som med tiden kan føre til slitasjegikt, kan forekomme i rasen.",
    entropion: "Entropion, der øyelokkene ruller innover og irriterer øyet, kan forekomme i rasen; spør etter foreldre med øyeundersøkelse.",
    autoimmune_conditions: "Autoimmune sykdommer, der kroppen reagerer mot seg selv, kan forekomme i rasen.",
    ear_infections_prone: "Rasen er disponert for øreinfeksjoner; følg godt med på ørehygienen.",
    familial_nephropathy: "En arvelig nyresykdom (familiær nefropati) forekommer i rasen; det finnes en DNA-test av foreldrene.",
    hereditary_nephritis: "En arvelig nyresykdom (arvelig nefritt, også kalt samojedhundens arvelige glomerulopati) forekommer i rasen.",
    panosteitis: "Panosteitt, en smertefull betennelse i de lange knoklene som oftest rammer unge hunder i vekst, kan forekomme i rasen.",
    urinary_incontinence: "Urininkontinens, ufrivillig lekkasje av urin, kan forekomme i rasen.",
    osteochondritis: "Osteochondritis dissecans (OCD), en forstyrrelse i leddbrusken hos hunder i vekst, kan forekomme i rasen.",
    scottie_cramp: "Scottie cramp – korte anfall av muskelkramper, som regel utløst av spenning – forekommer i rasen; det gjør ikke vondt.",
    slem_shaking_puppy: "Spongiform leukoencefalomyelopati (SLEM), også kalt shaking puppy syndrome, kan forekomme i rasen; en DNA-test hjelper oppdrettere å unngå den.",
    cecs_cramping: "Canine epileptoid cramping syndrome (CECS) – anfall med skjelving og muskelkramper – forekommer i rasen.",
    gallbladder_mucocele: "Mukocele i gallblæren, der gallblæren fylles med tykt slim og ikke tømmes ordentlig, kan forekomme i rasen; noen ganger trengs operasjon.",
    periodontal_disease: "Periodontitt, en infeksjon og betennelse i tannkjøttet og vevet som holder tennene på plass, er et kjent problem hos rasen.",
    extra_eyelashes:
      "Distichiasis, der små ekstra øyevipper vokser på innsiden eller kanten av øyelokket og kan gni mot øyet, kan forekomme i rasen; spør etter foreldre som er undersøkt i øyeordningen.",
    cm_sm_screening:
      "Chiari-lignende misdannelse og syringomyeli, en smertefull tilstand med væskefylte hulrom i ryggmargen nær hjernen, kan forekomme i rasen; oppdrettere rådes til å undersøke foreldrene (UK: BVA/KC-ordningen).",
    prominent_eyes_injury_dry_eye: "Fremtredende øyne skades lettere og kan få sår og bli tørre; tørre øyne og cherry eye forekommer også i rasen.",
    legg_perthes: "Legg-Perthes’ sykdom, en smertefull tilstand der beinvevet i hofteleddet dør og smuldrer opp, kan forekomme i rasen.",
    glaucoma: "Grønn stær (glaukom), økt trykk inne i øyet som kan være smertefullt og føre til blindhet, kan forekomme i rasen.",
    lethal_acrodermatitis: "Letal akrodermatitt, en arvelig sykdom som gir alvorlige hud- og vekstproblemer hos valper, forekommer i rasen.",
    kidney_disease_urine_screening: "Nyreproblemer forekommer i rasen; med urinprøver kan foreldrene undersøkes før avl.",
    primary_lens_luxation:
      "Primær linseluksasjon, en smertefull arvelig øyesykdom der linsen glir ut av stilling, og som kan gi blindhet, forekommer i rasen; det finnes en DNA-test for avlshunder.",
    inherited_ataxia:
      "Arvelige ataksier (sent debuterende ataksi og spinocerebellar ataksi), som gir tap av balanse og koordinasjon, forekommer i rasen; det finnes DNA-tester for avlshunder.",
    hydrocephalus: "Hydrocephalus, en opphopning av væske rundt hjernen, kan forekomme i rasen.",
    heart_disease_pda:
      "Hjertesykdom kan forekomme i rasen, blant annet persisterende ductus arteriosus, et blodkar ved hjertet som ikke lukker seg etter fødselen; en dyrlege kan lytte etter det ved valpens første undersøkelse.",
    chiari_malformation: "Chiari-lignende misdannelse med syringomyeli, en smertefull tilstand med væskefylte hulrom i ryggmargen nær hjernen, kan forekomme i rasen.",
    cataracts_entropion:
      "Grå stær, som gjør øyelinsen uklar, og øyelokk som ruller innover (entropion), kan forekomme i rasen; spør etter foreldre som er undersøkt i øyeordningen.",
    periodontal_daily_brushing: "Rasen er disponert for tannkjøttsykdom (periodontitt), så det anbefales å pusse tennene hver dag med hundetannkrem.",
    eye_problems_shallow_sockets:
      "Øyeproblemer forekommer i rasen, for eksempel tørre øyne, øyeinfeksjoner og sår på øyets overflate; de grunne øyehulene gjør også øyeskader mer sannsynlige.",
    eye_problems_dry_eye_entropion_lens_luxation:
      "Øyeproblemer forekommer i rasen, for eksempel tørre øyne, øyelokk som ruller innover (entropion), og en linse som har glidd ut av stilling (linseluksasjon); det finnes øyeundersøkelser.",
    heart_valve_screening: "Hjertesykdom kan forekomme i rasen; med ultralyd av hjertet kan foreldrene undersøkes for problemer med hjerteklaffene før avl.",
    dental_weight_problems:
      "En stor britisk studie nevner tannsykdom og overvekt som særlig vanlige problemer hos rasen – problemer eiere kan være med på å forebygge; tenner som står for tett, og melketenner som ikke faller ut, forekommer også.",
  },
  page: {
    eyebrow: "Dyreleksikon",
    // Search terms people use ("ragdollkatt", "temperament"); "temperament" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "temperament, " : ""}mosjon, størrelse og stell | PetPrep`
        : species === "cat"
          ? `${/katt$/i.test(name) ? name : /hår$/.test(name) ? `${name}katt` : /\s/.test(name) ? `${name}-katt` : `${name}katt`}: ${hasIntro ? "temperament, " : ""}pelsstell, størrelse og levetid | PetPrep`
          : `${name} (${lc(one)}): behov, levetid og stell | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Kilder, helse og råd før kjøp.`,
    metaLabels: { weight: "vekt", exercise: "mosjon", lifespan: "levetid" },
    metaDescription: (name, one) =>
      `${name}: behovene til denne ${breedDef(one)} ifølge kildene – mosjon, pelsstell, måltider, størrelse, levetid, hvem den passer for – og hvordan PetPrep simulerer den.`,
    suitabilityTitle: "Passer for",
    suitabilityNote: "De samme merkene som i appen. Hvert merke er støttet av kildene nederst på siden.",
    suitabilityNone: "Ennå ingen merker med kilder for denne rasen.",
    needsTitle: "Dette trenger den",
    needsIntro: (species) =>
      species === "cat"
        ? "Fra katteforbundenes raseregistre, veterinærfaglige organisasjoner og studier. Der kildene er uenige, vises hver enkelt."
        : "Fra rasestandarder, kennelklubber, dyrevelferdsorganisasjoner og studier. Der kildene er uenige, vises hver enkelt.",
    general: (many) => `Generelle råd for ${lc(many)} (ikke rasespesifikke):`,
    noData: "Står ennå ikke i kildene våre.",
    simTitle: "Slik simulerer PetPrep rasen",
    simBadge: "Spilleregler, ikke veterinærmedisinske råd",
    simIntro:
      "I PetPrep tilsvarer én ekte uke én måned av kjæledyrets liv. Dette er reglene spillet bruker for denne rasen. PetPrep har valgt dem ut fra kildene på denne siden; de er ikke stellråd for et ekte dyr.",
    simInfoOnly: "Denne rasen står bare i leksikonet til informasjon; appen simulerer den ikke ennå.",
    simTable: { stage: "Livsfase", starts: "Begynner", meals: "Måltider om dagen", activity: { steps: "Daglig skrittmål", play_sessions: "Lek om dagen" } },
    arrives: (m) => `flytter inn ${m}${NB}${s(m, "måned", "måneder")} gammel`,
    fromMonth: (m, years) => (years ? `måned ${m} (${years})` : `måned ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `fra måned ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Hvert tall i spillet er et valg PetPrep har tatt, dokumentert med kilder.",
    healthTitle: "Helse",
    healthNote: "Bare til informasjon, ikke gjennomgått av en dyrlege. Spør dyrlegen om ditt eget dyr.",
    healthNone: "Kildene våre inneholder ennå ingen rasespesifikke helseopplysninger om denne rasen.",
    checklistTitle: "Før du kjøper: dette bør du sjekke hos oppdretteren",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Spørsmål du bør ha avklart før du tar med deg en kattunge hjem. Punktene er råd fra dyrleger, dyrevelferdsorganisasjoner og katteforbund; hvert punkt oppgir kilden sin."
        : "Spørsmål du bør ha avklart før du tar med deg en valp hjem. Punktene er råd fra dyrleger, dyrevelferdsorganisasjoner og kennelklubber; hvert punkt oppgir kilden sin.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Reglene om minstealder, ID-merking og vaksinasjon er ulike fra land til land – sjekk hva som gjelder der du bor.",
    checklistGeneralTitle: "For alle raser",
    checklistTestsTitle: "Foreldrenes helsetester for denne rasen",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tester et katteforbund krever før en katt brukes i avl" : "Tester The Royal Kennel Club anbefaler som et minimum",
      best_practice: "Flere tester etter beste praksis",
      other_scheme: "Andre helseprogrammer for denne rasen",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Listen kommer fra avlsreglene til et utenlandsk katteforbund (se kilden) og er veiledende. Spør oppdretteren hvilke tester foreldrene har tatt."
        : "Listene kommer fra The Royal Kennel Club i Storbritannia og er veiledende; nasjonale kennelklubber kan ha egne, strengere regler. Spør raseklubben og oppdretteren hvilke tester foreldrene har tatt.",
    checklistStatus: {
      none_recommended:
        "The Royal Kennel Club oppgir for øyeblikket ingen anbefalte helseundersøkelser før avl for denne rasen. Spør likevel oppdretteren om foreldrenes helse.",
      not_found:
        "Vi har ennå ikke funnet en pålitelig kilde som oppgir helsetester for foreldrene til denne rasen. Spør raseklubben og oppdretteren hvilke tester foreldrene har tatt.",
      not_checked: "Vi har ennå ikke gått gjennom helsetestene for foreldrene til denne rasen. Spør raseklubben og oppdretteren hvilke tester foreldrene har tatt.",
    },
    sourcesTitle: "Kilder",
    sourcesIntro: "Hvert faktum på denne siden viser til en av disse kildene.",
    sourcesAll: "Vis alle kilder",
    sourcesFewer: "Vis færre",
    sourceLabel: (id, publisher) => `Kilde ${id}: ${publisher}`,
    disclaimer: "PetPrep er en simulering for familier. Denne siden er ikke veterinærmedisinske råd – spør en dyrlege eller raseklubben når det gjelder et ekte dyr.",
    backTo: (many) => `Alle ${breedsOf(many, 2)}`,
    compareWith: "Sammenlign med andre raser",
    related: { title: "Lignende raser", intro: (many) => `Andre ${breedsOf(many, 2)} i leksikonet med lignende behov – alle med fakta fra kildene.` },
    updated: "Oppdatert",
    glanceTitle: "Kort fortalt",
    glanceNote: "De viktigste faktaene fra kildene nederst på siden. Der kildene er uenige, vises hver verdi.",
    portraitAlt: { ai_photo: (name) => `${name} – foto (AI)`, ai_illustration: (name) => `${name} – illustrasjon (AI)` },
    portraitCaption: { ai_photo: "AI-generert foto", ai_illustration: "AI-generert illustrasjon" },
    portraitColours: {
      legend: "Pelsfarge",
      alt: {
        ai_photo: (name, colour) => `${name}, ${lc(colour)} – foto (AI)`,
        ai_illustration: (name, colour) => `${name}, ${lc(colour)} – illustrasjon (AI)`,
      },
    },
    share: {
      button: "Del",
      title: "Del denne rasen",
      copy: "Kopier",
      copied: "Kopiert",
      linkLabel: "Lenke til denne siden",
      more: "Flere alternativer",
      text: (name) => `${name}: behov, kilder og hvordan PetPrep simulerer rasen`,
      emailSubject: (name) => `${name} – PetPreps dyreleksikon`,
      on: (network) => `Del på ${network}`,
    },
    og: { lead: "Behov, kilder og hvordan PetPrep simulerer rasen", photoLabel: "AI-foto" },
    qa: {
      title: "Spørsmål og svar",
      intro: "Besvart bare ut fra faktaene i kildene på denne siden; hvert svar oppgir kildene sine.",
      // Breed names are lower case in running text and all take "en" (en hund, en katt): "en schäferhund", "en maine coon".
      questions: {
        exercise: (n) => `Hvor mye mosjon trenger en ${mid(n)}?`,
        lifespan: (n) => `Hvor lenge lever en ${mid(n)}?`,
        size: (n) => `Hvor stor blir en ${mid(n)}, og hvor mye veier den?`,
        grooming: (n) => `Hvor mye pelsstell trenger en ${mid(n)}?`,
        suits: (n) => `Hvem passer en ${mid(n)} for?`,
      },
      leads: {
        exercise: (n) => `Så mye mosjon trenger en ${mid(n)} ifølge kildene våre:`,
        lifespan: (n) => `Levetiden til en ${mid(n)} ifølge kildene våre:`,
        size: (n) => `Størrelse og vekt for en voksen ${mid(n)} ifølge kildene våre:`,
        grooming: (n) => `Pels og pelsstell hos en ${mid(n)} ifølge kildene våre:`,
        suits: (n) => `Ifølge kildene våre passer en ${mid(n)} godt for:`,
      },
      considerLead: "Vær oppmerksom på:",
      differ: "Kildene oppgir ulike verdier, så hver enkelt vises.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolsk gjeterhund er en stor, kraftig bygget buskapsvokter fra Tyrkia; FCI beskriver den tyrkiske gjeterhunden som kangal (Kangal Shepherd Dog) – ensfarget fra fawn til ulvegrå med svart maske, 72–78 cm høy for hannhunder og 65–73 cm for tisper. Den amerikanske rasestandarden oppgir 110–150 pund (ca. 50–68 kg) for hannhunder og 80–120 pund (ca. 36–54 kg) for tisper. En hund av denne størrelsen er utvokst ved rundt 18–24 måneder (PetMD); The Royal Kennel Club oppgir en levealder på over ti år og WebMD i snitt 11 til 13 år.",
        "The Royal Kennel Club anbefaler mer enn 2 timer mosjon om dagen og pelsstell mer enn én gang i uken, opplyser at den røyter og passer i et stort hus med stor hage på landet, og plasserer den i Breed Watch-kategori 1. PetMD skriver at anatolske gjeterhunder trolig passer best i hjem uten små barn, at valper som tidlig blir kjent med andre dyr, som regel kommer godt overens med dem, at tidlig sosialisering er avgjørende, at pelsen utenom de to årlige røyteperiodene børstes ukentlig, og at mosjon rundt måltidene bør unngås.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irsk rød setter, Irish Setter",
      text: [
        "Irsk setter (irsk rød setter) er en elegant, atletisk fuglehund fra Irland, avlet for å søke vidt i terrenget. FCI-standarden beskriver én farge – dyp kastanjerød uten spor av svart – og en høyde på 58–67 cm for hannhunder og 55–62 cm for tisper; den amerikanske rasestandarden oppgir rundt 70 pund (ca. 32 kg) som ideelt for en hannhund og 60 pund (ca. 27 kg) for en tispe. Hunder av denne størrelsen er som regel utvokste ved omkring 15–18 måneder (PetMD), og The Royal Kennel Club oppgir en levealder på over ti år.",
        "The Royal Kennel Club anbefaler mer enn 2 timers mosjon om dagen og pelsstell mer enn én gang i uken, oppgir at rasen røyter og passer til et stort hus med stor hage, og plasserer den i Breed Watch-kategori 1. PDSA beskriver svært vennlige, kjærlige hunder som kommer godt overens med barn og andre kjæledyr, og anbefaler pelsstell 2–3 ganger i uken; PetMD anbefaler ukentlig kontroll og rengjøring av ørene og skriver at irske settere trenger mye menneskelig selskap.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Brusselsk griffon, Brussels Griffon",
      text: [
        "Griffon bruxellois er en liten selskapshund fra Belgia med et kort, flatt ansikt. FCI-standarden beskriver en rød, naturlig hard, lett bølget pels og en vekt på 3,5–6 kg; britiske Royal Kennel Club, som har en strihåret og en glatthåret variant, beskriver den som en smart liten hund med et terrierlignende gemytt. Den er vanligvis utvokst ved omtrent 8–12 måneder (PetMD), og Royal Kennel Club oppgir en levealder på over 12 år (PetMD: 12–15 år).",
        "Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell mer enn én gang i uken, opplyser at den røyter og passer i leilighet, og plasserer rasen i Breed Watch-kategori 2. PetMD beskriver en flatnese (brakycefal) hund som tåler varmt, fuktig vær dårlig, råder til å rengjøre ansiktsfoldene omtrent én gang i uken og pusse tennene daglig, og skriver at griffon bruxellois under tilsyn kommer godt overens med barn og andre kjæledyr, men ikke liker å være alene lenge.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, amerikansk rat terrier, Rat Terrier",
      text: [
        "Rat terrier er en liten amerikansk terrier som avles i to størrelser – miniatyr og standard – med kort, tettliggende, glatt og blank pels. Rasestandarden tillater en mankehøyde på opptil 18 tommer (46 cm), og PetMD oppgir en vekt på 10–25 pund (omtrent 4,5–11 kg) for begge størrelsene; en hund av denne størrelsen er utvokst ved rundt 9–12 måneder (PetMD). VCA oppgir en levealder på 12–16 år, PetMD 12–18 år.",
        "Rat Terrier Club of America sier at rat terriere er gode med barn, særlig hvis de vokser opp med dem, og klarer seg i en leilighet, men trenger minst 30 minutter mosjon om dagen. PetMD skriver at de trenger mye fysisk og mental stimulering, ikke liker å være alene lenge og røyter litt hele året; VCA anbefaler børsting én gang i uken og advarer om at de kanskje ikke passer sammen med små kjæledyr, særlig gnagere.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grosser Schweizer Sennenhund, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Stor sveitsisk sennenhund (hos FCI og i Storbritannia «Great Swiss Mountain Dog») er en kraftig, grovbygd og godt muskuløs trefarget trekkhund fra Sveits: svart med symmetriske brune og hvite tegninger. FCI-standarden oppgir en mankehøyde på 65–72 cm for hannhunder og 60–68 cm for tisper, men ingen vekt; WebMD oppgir 52–64 kg for hannhunder og 39–50 kg for tisper. En hund av denne størrelsen er utvokst ved rundt 18–24 måneder (PetMD), og Royal Kennel Club oppgir en levealder på over ti år (PetMD: 8–11 år).",
        "Royal Kennel Club anbefaler opptil en times mosjon om dagen og børsting én gang i uken, og sier at rasen røyter og passer i et stort hus med stor hage. PetMD kaller rasen en flott familiehund som er forsiktig med barn (all kontakt bør skje under tilsyn), råder til å rense ørene hver uke og å ikke mosjonere hunden rett før eller etter måltider på grunn av faren for magedreining (GDV); WebMD råder til å pusse tennene daglig og være sparsom med godbiter, siden rasen lett legger på seg.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    shar_pei: {
      aka: "kinesisk shar pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Shar pei (i USA «Chinese Shar-Pei») er en aktiv, kompakt, kvadratisk bygd mellomstor hund fra Kina med kort, hard, bustete pels ensfarget (alle farger unntatt hvit), med folder på hodet og manken og en bred snute. Standarden til Royal Kennel Club oppgir en mankehøyde på 46–51 cm og PDSA en vekt på 20–27 kg; en hund av denne størrelsen er utvokst ved rundt 12–15 måneder (PetMD). Royal Kennel Club og PDSA oppgir en levealder på over ti år, men en VetCompass-studie av hunder i Storbritannia fant en median på 7,3 år.",
        "Royal Kennel Club anbefaler opptil en times mosjon om dagen og børsting én gang i uken og plasserer rasen i kategori 2 i Breed Watch på grunn av problemer med øyelokk og hudfolder. PDSA beskriver shar pei som lojale, hengivne familiehunder som passer best for erfarne eiere og større barn, advarer mot et sterkt jaktinstinkt overfor mindre dyr og råder til å holde hudfoldene rene og tørre og la det gå litt tid mellom måltid og mosjon.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border collie er en middels stor gjeterhund fra Storbritannia, avlet for utholdenhet og hardt arbeid. Rasestandarden beskriver en ivrig, våken, lydhør og intelligent hund som verken er nervøs eller aggressiv.",
        "Kennelklubber og dyrleger er enige om én ting fremfor alt: dette er en rase med svært mye energi. Den trenger mer enn to timer mosjon hver dag og mye å tenke på. Når den kjeder seg eller får for lite mosjon, finner den sine egne oppgaver – den tygger på det den når, eller prøver å gjete barn som leker.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador, labbe",
      text: [
        "Labrador retriever er en stor, kraftig bygd apporterende fuglehund fra Storbritannia, avlet for å apportere. Standarden beskriver en godmodig, vennlig og tilpasningsdyktig følgesvenn som er ivrig etter å gjøre til lags og elsker vann. Pelsen er kort og tett, i svart, gult eller leverbrunt/sjokolade.",
        "Britiske dyrevelferdsorganisasjoner beskriver labradoren som en familiehund som knytter seg til hele husstanden når den er godt sosialisert. Den er svært aktiv og veldig matmotivert: godbiter hjelper i treningen, men labradorer legger også lett på seg.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden",
      text: [
        "Golden retriever er en stor apporterende fuglehund fra Storbritannia med flat eller bølgete pels i gylne eller kremfargede nyanser. Standarden beskriver en lydig, intelligent hund som er vennlig, omgjengelig og trygg.",
        "Britiske dyrevelferdsorganisasjoner kaller den en flott familiehund for en aktiv familie og mener den kan egne seg som første hund. Kildene er tydelige på hva den krever: minst to timer mosjon om dagen, børsting flere ganger i uken og en pels som røyter mye.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "frenchie, French Bulldog",
      text: [
        "Fransk bulldog er en liten, robust selskapshund fra Frankrike med kort, glatt pels og oppreiste «flaggermusører». Standarden beskriver en sosial, livlig og leken hund; britiske dyrevelferdsorganisasjoner kaller den avslappet og tilpasningsdyktig og sier at den som regel kommer godt overens med barn, noe som har gjort den til en populær familiehund.",
        "Den trenger opptil en time mosjon om dagen og passer i en leilighet. Ulempen alle kildene tar opp, er det flate ansiktet: det kan gjøre det tyngre å puste, og franske bulldoger blir fort overopphetet, særlig når det er varmt – så skygge, vann og rolige turer er viktig. PDSA foreslår at familier også vurderer å adoptere en voksen fransk bulldog.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "schæfer, tysk schäferhund, German Shepherd Dog, Alsatian, GSD",
      text: [
        "Schäferhund er en stor, kraftig gjeterhund fra Tyskland med oppreiste ører og tett dobbel pels, kort eller lang. Standarden beskriver en velbalansert, selvsikker hund med sterke nerver, og The Royal Kennel Club kaller den en allsidig brukshund og tjenestehund kjent for mot og intelligens.",
        "Den trenger minst to timer mosjon om dagen, passer i et stort hus med hage og røyter mye. Britiske dyrevelferdsorganisasjoner sier at noen kan være flotte familiehunder, men alltid bør være under tilsyn sammen med små barn. The Royal Kennel Club ber oppdrettere teste foreldrenes hofter og albuer og nevner formen på bakbeina som et problemområde hos rasen.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "cavalier, CKCS",
      text: [
        "Cavalier king charles spaniel er en liten dvergspaniel fra Storbritannia med lange ører med frynser og lang, silkeaktig pels i fire farger: blenheim, ruby, black and tan og trefarget. Standarden beskriver en aktiv, grasiøs hund med mildt uttrykk – sporty, kjærlig, vennlig og fryktløs.",
        "Den trenger rundt en time mosjon om dagen, kan bo i leilighet og er kjent for å være god med barn, men leken bør skje under tilsyn, og den liker ikke å være alene. Pelsen må børstes mer enn én gang i uken. Britiske kilder nevner hjerteklaffsykdom og en smertefull tilstand i ryggmargen knyttet til skallens form som de viktigste helseproblemene, så oppdrettere bes om å hjerteundersøke og MR-undersøke hundene sine.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Beagle er en liten drivende hund fra Storbritannia, avlet for å jakte hare ved å følge spor. Standarden beskriver en robust, kompakt bygd, munter hund – modig, aktiv og våken, vennlig og uten aggresjon eller skyhet – med kort, tett pels i typiske hundefarger som trefarget, brunt og hvitt eller sitron og hvitt, og alltid med hvit halespiss.",
        "Den trenger opptil rundt en time mosjon om dagen og passer godt inn i familielivet hvis den sosialiseres fra ung alder, men den bør være under tilsyn med barn og ikke være alene, for da kan den bjeffe og tygge på ting. Den korte pelsen må børstes én gang i uken, men den røyter. Treningen bør begynne tidlig og bygge på belønning. Britiske dyrleger behandler oftest beagler for vektøkning og tannsykdom, så pass på porsjonene og tennene.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "stor puddel, kongepuddel, Standard Poodle",
      text: [
        "Storpuddel er den største av de fire puddelstørrelsene, en selskapsrase fra Frankrike som stammer fra europeiske andejakthunder. Standarden beskriver en elegant, velbalansert hund med stolt holdning – lojal, glad og godmodig, lærenem og lett å trene – med rikelig, kruset og krøllete pels i én ensfarget farge: svart, hvit, brun, grå eller fawn.",
        "Den trenger opptil rundt en time mosjon om dagen og passer i et stort hus med stor hage. Med riktig sosialisering som valp kommer den som regel godt overens med barn og andre kjæledyr. Pelsen røyter ikke, men det gjør den ikke allergivennlig: den trenger stell hver dag og jevnlig klipping hos en profesjonell hundefrisør. Den er kjent for å være svært lydig og reagerer godt på trening.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "grevlinghund, pølsehund, Dachshund, Teckel",
      text: [
        "Dachshund er en tysk jakthund på grevling og kanin, i hjemlandet kjent som teckel, og den finnes i flere størrelser og med tre pelstyper; denne siden handler om standardstørrelsen med korthåret pels. Standarden beskriver en hund som er moderat lang i forhold til høyden, uten overdrivelser – trofast, allsidig og godmodig; intelligent, livlig og modig – med tett, kort, glatt pels i rødt, eller svart eller sjokolade med brune tegninger.",
        "Den trenger opptil rundt en time mosjon om dagen, fordelt på et par turer med tid til å snuse, og passer i et lite hus. Den elsker mennesker og kommer som regel godt overens med barn i alle aldre, alltid under tilsyn, men med sitt sterke jaktinstinkt anbefales den ikke sammen med mindre kjæledyr, og den trives ikke alene. På grunn av den lange ryggen og de korte beina er den utsatt for skiveprolaps, så den bør ikke hoppe; oppdrettere bes om å undersøke ryggen før avl.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie",
      text: [
        "Australian shepherd er, tross navnet, en amerikansk rase – en intelligent brukshund med sterke gjeter- og vokterinstinkter. Standarden beskriver en velbalansert hund av middels størrelse, litt lengre enn høy, godmodig og noen ganger reservert ved første møte, med middels lang, rett til bølgete pels i blue merle, svart, red merle eller rødt, hver med eller uten hvite og brune tegninger.",
        "Den trenger mer enn to timer mosjon om dagen og mentale utfordringer som problemløsningsleker og trening, og passer i et stort hus med stor hage på landet. I riktig husstand kan den være en veldig god familiehund, men det sterke gjeterinstinktet kan få den til å gjete barn, så den anbefales ikke for familier med mindre barn. Den liker ikke å være alene, og pelsen må børstes noen ganger i uken.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon Havanais, Havanese",
      text: [
        "Havaneser er et lite medlem av bichonfamilien og nasjonalhunden til Cuba. Standarden beskriver en robust liten hund, lavbent, med svært lang, myk, flat eller bølgete pels som aldri trimmes, og en hale som bæres høyt over ryggen. Den finnes i fawn, svart, havannabrun, tobakk, rødbrun og, sjelden, hvit, med eller uten flekker og brune tegninger.",
        "Standarden kaller den kjærlig, leken og til og med litt av en klovn, og sier at den elsker barn og leker med dem i det uendelige; britiske kilder kaller den en utmerket familiehund med riktig sosialisering, og lett å trene. Den trenger rundt 30 minutter mosjon om dagen, kan bo i leilighet og røyter ikke – men den lange pelsen må stelles hver dag for å unngå floker og tover.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie",
      text: [
        "West highland white terrier, eller westie, er en liten terrier fra Storbritannia. Standarden beskriver en kraftig bygd liten hund med dypt bryst, rett rygg og hard dobbel pels på rundt 5 cm, små, oppreiste, spisse ører og mørke øyne under kraftige øyenbryn. Hvit er den eneste fargen standarden tillater.",
        "Ifølge standarden er den våken, glad, modig og selvstendig, men vennlig. Britiske kilder kaller den en kjærlig, leken familiehund for barn i alle aldre – lek bør alltid skje under tilsyn; den trenger rundt en time mosjon om dagen, kan bo i leilighet, røyter og må børstes noen ganger i uken. På grunn av jaktinstinktet bør den ikke bo sammen med mindre kjæledyr, og den liker ikke å være alene. Huden er et kjent problem: The Royal Kennel Club ber dommere se etter tegn på hudbetennelse hos rasen.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berner, Bernese Mountain Dog",
      text: [
        "Berner sennenhund er en stor sveitsisk gårdshund, opprinnelig brukt som vakthund, trekkhund og kvegdriver i kantonen Bern. Standarden beskriver en sterk, smidig, langhåret brukshund med kraftige lemmer og lang, skinnende, rett eller lett bølgete pels. Den eneste fargen standarden tillater, er trefarget: kullsvart med kraftig brunt på kinnene, over øynene, på beina og brystet, og hvite tegninger på hodet og brystet.",
        "Standarden beskriver den som selvsikker, godmodig og vennlig, og «en snill og hengiven familiehund» som modnes sent. Britiske kilder sier at den trenger opptil en time mosjon om dagen, hører hjemme i et stort hus med stor hage, røyter mye og må børstes mer enn én gang i uken; den bør ikke være alene lenge. Den blir som regel ikke eldre enn ti år, og britiske kilder nevner hofte- og albueleddsdysplasi, magedreining og visse kreftformer blant helseproblemene.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky",
      text: [
        "Siberian husky er en middels stor sledehund, anerkjent av FCI som en amerikansk rase og beskrevet av The Royal Kennel Club som den letteste og raskeste av sledehundene. Standarden ber om en hund som er rask og lett på foten, med dobbel, middels lang pels, tykke, oppreiste ører, brune eller blå øyne (ett av hver er tillatt) og en tett behåret hale. Fargene går fra svart til helt hvitt; merle og brindle er ikke tillatt.",
        "Standarden kaller den vennlig og mild, våken og utadvendt. Britiske kilder sier at den trenger mer enn to timer mosjon om dagen, et stort hus med stor hage og et svært sikkert, høyt gjerde, fordi huskyer er kjent for å rømme; den røyter mye, må børstes noen ganger i uken og takler ikke godt å være alene. PDSA foreslår den for hjem med bare voksne eller med tenåringer heller enn familier med mindre barn, og nevner hofteleddsdysplasi, øyeproblemer og epilepsi blant helseproblemene.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "rottis, Rottie",
      text: [
        "Rottweiler er en middels stor til stor, kraftig brukshund fra Tyskland. Standarden beskriver en solid hund, verken tung eller lett, med kort, grov, tettliggende pels, middels store hengende ører og mørkebrune mandelformede øyne. Den eneste fargen den tillater, er svart med tydelig avgrensede, kraftig brune tegninger på kinnene, snuten, strupen, brystet og beina; hvite tegninger er en feil.",
        "Ifølge standarden er den godmodig, rolig, svært hengiven, lydig og arbeidsvillig, og The Royal Kennel Club sier at en godt trent rottweiler er en fantastisk familiehund. Britiske kilder sier at den trenger mer enn to timer mosjon om dagen, et stort hus med stor hage og en erfaren eier, fordi den er så kraftig; den bør sosialiseres fra valpetiden. PDSA anbefaler den ikke for familier med yngre barn og babyer, og den bør aldri være alene uten tilsyn med andre kjæledyr. Børsting én gang i uken er nok. Den blir som regel ikke eldre enn ti år, og The Royal Kennel Club følger med på formen på bakbeina.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "engelsk bulldog, English Bulldog, British Bulldog",
      text: [
        "Bulldog er en middels stor, glatthåret hund fra Storbritannia: ganske tettbygd, lav, bred, kraftig og kompakt, med relativt kort ansikt, små, tynne roseører og runde, svært mørke øyne. Standarden tillater ensfargede varianter som rødt, fawn, fallow og hvitt, samt brindle og pied; svart og svart med brunt er svært uønsket. Den ber om store, vidåpne nesebor og sier at hunder som viser tegn på pustebesvær, er svært uønsket.",
        "Standarden beskriver den som våken, dristig, lojal, pålitelig og modig, barsk av utseende, men kjærlig, og The Royal Kennel Club sier at den fortsatt er svært populær som familiehund for sitt gemytt og sin lojalitet. Britiske kilder sier at den trenger opptil en time mosjon om dagen, aldri midt på dagen når det er varmt, og kommer godt overens med andre kjæledyr i husstanden hvis den sosialiseres tidlig; den trenger pelsstell én gang i uken, men rynkene i ansiktet må rengjøres hver dag. PDSA beskriver den som en rase med svært flatt ansikt som med stor sannsynlighet får alvorlige helseproblemer, for eksempel pustevansker, og anbefaler sterkt å vurdere en sunnere rase, en krysning eller en blandingshund. Den blir som regel ikke eldre enn ti år.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "vorsteh, GSP, German Shorthaired Pointer, Deutsch Kurzhaar",
      text: [
        "Korthåret vorsteh er en allsidig jakthund fra Tyskland, bygd for arbeid på land og i vann, med kort, tykk pels som føles hard å ta på, brede, flate, høyt ansatte ører og mørkebrune mandelformede øyne. Den amerikanske standarden tillater ensfarget leverbrunt, leverbrunt og hvitt (for eksempel skimlet), ensfarget svart og svart og hvitt; røde, oransje, sitronfargede eller brune områder og en helt hvit hund er diskvalifiserende. Standarden beskriver en kupert hale – PetPrep viser alltid hunden med naturlig hale.",
        "Standarden kaller den vennlig, intelligent og villig til å gjøre til lags. The Royal Kennel Club og PDSA sier at den trenger mer enn to timer mosjon om dagen; PDSA legger til at instinktet til å jakte, stå og apportere kan slå inn på tur, så den trenger god innkallingstrening, og at den er ganske lett å trene. Den trenger pelsstell én eller to ganger i uken og røyter moderat. En stor britisk studie oppgir en median forventet levealder på 13,4 år.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "yorkie",
      text: [
        "Yorkshire terrier er en dvergterrier fra Storbritannia som etter rasestandarden veier opptil 3,2 kg, med lang, helt rett, blank og silkeaktig pels som henger jevnt ned på hver side fra en skill langs ryggen. Standarden tillater én farge: mørk stålblå fra bakhodet til halen, med kraftig, klar brunfarge på hodet, brystet og beina; de små V-formede ørene bæres oppreist. Standarden beskriver både kupert og ukupert hale – PetPrep viser alltid hunden med naturlig hale.",
        "Ifølge standarden er den våken, intelligent og livlig, med et jevnt gemytt. The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell hver dag; PDSA nevner også at den liker å løpe, apportere og leke, kan være ganske sta å trene, og passer bedre for familier med eldre barn fordi knoklene er svært skjøre. En stor britisk studie fant at tannsykdom er det vanligste problemet hos rasen, oppfordrer til daglig tannstell som tannpuss, og fant en median alder ved død på 13,56 år.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italian Corso Dog",
      text: [
        "Cane corso er en middels stor til stor italiensk molosser, en robust og kraftig hund med en viss eleganse, litt lengre enn høy. Standarden beskriver kort, skinnende, svært tett pels i svart, grå nyanser, fawn eller rødt med mørk maske, mørk hvetefarge eller brindle; store hvite flekker er ikke tillatt. Etter gjeldende FCI-standard beholder hunden ukuperte ører og naturlig hale – og i Storbritannia er kupering av ører og hale forbudt – så PetPrep viser alltid hunden med naturlige ører og hale.",
        "Standarden beskriver den som en vokter av eiendom, familie og husdyr, ekstremt smidig og lydhør. PDSA skriver at den er sosial og kjærlig mot eierne sine, trenger rundt to timer mosjon om dagen og noe å gjøre, fordi den hater å kjede seg, og passer bedre for erfarne eiere på grunn av størrelsen. PDSA anbefaler ikke rasen i hjem med små barn, som kan bli veltet; den passer i hjem med bare voksne eller familier med eldre barn. Børsting én gang i uken er nok, men den røyter og er kjent for å sikle. PDSA oppgir en gjennomsnittlig levetid på under ti år.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, Pembroke Welsh Corgi",
      text: [
        "Welsh corgi pembroke er en liten kvegdriver fra Wales, lavstilt, sterk og solid bygd, som gir inntrykk av substans og utholdenhet på liten plass. Standarden beskriver middels lang, rett pels med tett underull i rødt, sobel, fawn eller svart og brunt, med eller uten hvite tegninger på beina, brystet og halsen, og oppreiste ører. Halen ble tidligere vanligvis kupert; standarden beskriver også naturlig hale, og PetPrep viser alltid hunden med naturlig hale.",
        "Standarden kaller den dristig, arbeidsom, utadvendt og vennlig. The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell mer enn én gang i uken; PDSA beskriver vennlige, glade, lekne hunder som er villige til å gjøre til lags og ganske lette å trene, men sier at de kan nappe barn som løper i hælene, så sosialisering med barn og trening fra ung alder hjelper. The Royal Kennel Club oppgir en levetid på over 12 år og ber oppdrettere få foreldrenes hofter vurdert.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "Dobermann er en tysk selskaps-, beskyttelses- og brukshund av middels størrelse, sterk og muskuløst bygd, med elegante linjer og stolt holdning. FCI-standarden beskriver kort, hard, tett pels som ligger tett og glatt, i svart eller brunt med tydelig avgrensede rustrøde tegninger; hvite flekker er ikke tillatt. Etter FCI-standarden har hunden naturlige ører og hale, og PetPrep viser alltid hunden med naturlige ører og hale.",
        "Ifølge standarden er den vennlig og rolig og svært hengiven mot familien. The Royal Kennel Club sier at det lojale og lydige gemyttet gjør den til en utmerket familiehund, og anbefaler mer enn to timer mosjon om dagen og pelsstell én gang i uken. PDSA legger til at den er svært energisk, trenger mye mental og fysisk aktivitet og tidlig sosialisering, og – på grunn av den store størrelsen og den kraftige kroppen – ikke anbefales for familier med små barn eller førstegangseiere. The Royal Kennel Club oppgir en levetid på over ti år.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "tysk boxer, German Boxer, Deutscher Boxer",
      text: [
        "Boxer er en tysk bruks- og selskapshund av middels størrelse, med kvadratisk bygning, kraftig benbygning og godt utviklede muskler. Standardene beskriver kort, blank, glatt pels i fawn eller brindle med svart maske; hvite tegninger er tillatt, men bør ikke dekke mer enn en tredjedel av pelsen. Snuten skal være bred og dyp, aldri kort, med vide nesebor. Halen ble tidligere vanligvis kupert; standarden beskriver også ukupert hale, og PetPrep viser alltid hunden med naturlige ører og hale.",
        "Standarden beskriver den som likevektig, lydig, fryktløs og selvsikker. The Royal Kennel Club sier at den er svært avholdt som familiehund, og anbefaler mer enn to timer mosjon om dagen og pelsstell én gang i uken. PDSA beskriver en svært energisk, leken hund som elsker selskap med mennesker og kan utvikle separasjonsangst hvis den er alene, har svært sterkt jaktinstinkt og – på grunn av størrelsen og det livlige gemyttet – ikke anbefales i hjem med yngre barn eller for førstegangseiere; noen boxere med kortere ansikt kan få alvorlige pusteproblemer. Forventet levetid er over ti år, ifølge The Royal Kennel Club.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Miniature Schnauzer",
      text: [
        "Dvergschnauzer er en liten tysk selskapshund: sterk, kompakt og nesten kvadratisk, med hard, strihåret, tett pels, buskete øyenbryn og skjegg. FCI-standarden tillater pepper og salt, svart og sølv, helt svart og helt hvit; PetPrep viser de tre første. Halen ble tidligere vanligvis kupert og ørene noen ganger klippet; FCI-standarden ber om naturlig hale og hengende ører, og PetPrep viser alltid hunden med naturlige ører og hale.",
        "FCI regner den som familie- og selskapshund, og The Royal Kennel Club sier at den er svært populær som følgesvenn. The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell mer enn én gang i uken og sier at den ikke røyter. PDSA beskriver en leken, nysgjerrig hund som kan komme godt overens med barn hvis den blir kjent med dem tidlig, kan være sta i treningen og trenger pelsstell to–tre ganger i uken pluss klipping eller trimming hos en profesjonell hundefrisør fra tid til annen. Ifølge The Royal Kennel Club blir rasen typisk over ti år gammel.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Shih tzu er en liten selskapshund fra Tibet; Storbritannia har ansvaret for FCI-standarden. Standardene beskriver en robust hund med rikelig pels og stolt holdning og et ansikt «som en krysantemum»: lang, tett dekkpels, store, mørke, runde øyne, store hengende ører og en hale med rik behåring som bæres over ryggen. Standardene tillater mange farger; PetPrep viser gull og hvitt, svart og hvitt, og leverbrunt og hvitt, og aldri merle. Snuten er kort og flat, og PDSA nevner pusteproblemer som skyldes det kortere ansiktet, så PetPrep tegner alltid et moderat ansikt med åpne nesebor.",
        "FCI beskriver den som intelligent, aktiv og våken, vennlig og selvstendig. The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell hver dag, og regner leilighet som et egnet hjem. PDSA sier at shih tzuer kan være godmodige familiehunder hvis de har fått riktig sosialisering og trening, kaller dem et ideelt kjæledyr for førstegangseiere, anbefaler at de alltid er under tilsyn med barn, og anbefaler daglig børsting pluss klipping hos en profesjonell hundefrisør hver sjette til åttende uke for de fleste familiehunder. The Royal Kennel Club oppgir en levetid på over ti år.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "dogge, Deutsche Dogge, Great Dane",
      text: [
        "Grand danois er en tysk kjempe: FCI-standarden sier at den kombinerer en stor, kraftig, velbygd kropp med stolthet, styrke og eleganse, med langt, smalt hode, naturlig hengende ører og svært kort, glatt, blank pels. Standardene oppgir gul (fawn) og brindle – helst med svart maske – samt harlekin, svart og blå; PetPrep viser bare farger som både FCI og The Royal Kennel Club oppgir, aldri merle eller mantel, og tegner alltid hunden med naturlige ører og hale og stramme øyelokk, fordi The Royal Kennel Club ber dommere se etter øyelokk som ruller innover eller utover, og etter svake bakbein.",
        "FCI kaller den vennlig, kjærlig og hengiven mot eierne, selv om den kan være reservert overfor fremmede. The Royal Kennel Club sier at den tross størrelsen er en fantastisk familiehund, og anbefaler mer enn to timer mosjon om dagen, et stort hus med hage og pelsstell én gang i uken. PDSA skriver at grand danois er kjent for å sikle, har et ganske sterkt jaktinstinkt og ikke anbefales i hjem med yngre barn på grunn av størrelsen og styrken; den anbefaler en pause mellom måltid og mosjon for å bidra til å forebygge magedreining. Forventet levetid er under ti år, ifølge The Royal Kennel Club.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pom, dvergspiss, Zwergspitz",
      text: [
        "Pomeranian er den minste spisshunden: FCI fører den som dvergvarianten av tysk spisshund, 21 cm ± 3 cm i mankehøyde, og standarden til The Royal Kennel Club beskriver en kompakt, kortkroppet liten hund med revelignende hode, små, oppreiste ører og en hale som bæres over ryggen. Den doble pelsen har myk, luftig underull og lang, rett dekkpels som danner en krage rundt halsen. Standarden tillater mange ensfargede varianter, som oransje, krem, hvit, svart og brun, men aldri merle; PetPrep tegner en naturlig, utrimmet pels.",
        "FCI kaller gemyttet omgjengelig og muntert, og standarden til The Royal Kennel Club kaller den utadvendt, livlig og intelligent. The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og mener den passer i leilighet; PDSA sier at den doble pelsen må børstes to–tre ganger i uken. AKC skriver at pomeranianer som regel passer bedre for familier med eldre barn, kan komme godt overens med andre dyr hvis de sosialiseres tidlig, og anbefaler sterkt tidlig sosialisering og valpekurs. Ifølge The Royal Kennel Club blir rasen typisk over 12 år gammel.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, American Gentleman",
      text: [
        "Boston terrier kommer fra USA. FCI-standarden beskriver en livlig, svært intelligent, glatthåret, korthodet, kompakt bygd og velbalansert hund med kort hale, i brindle, seal eller svart med jevne hvite tegninger: et hvitt bånd over snuten, en hvit bles mellom øynene og hvitt forbryst er påkrevd, og brindle foretrekkes. PetPrep tegner den i brindle og hvitt, med moderat snute, åpne nesebor og naturlige ører og hale.",
        "Det er en rase med flatt ansikt (brakycefal), og PDSA advarer om at den aldri bør mosjoneres midt på dagen når det er varmt, fordi den lett blir overopphetet. The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell én gang i uken, mener den passer i leilighet og oppgir en levetid på over ti år. PDSA kaller boston terriere perfekte familiehunder som er særlig gode med barn når de er godt sosialisert som valper; AKC sier at de trives med barn som vet hvordan man er forsiktig med dyr, ikke har det bra når de er alene lenge, og anbefaler sterkt tidlig sosialisering og valpetrening.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "Miniature american shepherd kommer fra USA. FCI-standarden beskriver en liten gjeterhund med sterke gjeter- og vokterinstinkter, intelligent og først og fremst en brukshund, litt lengre enn høy, med middels lang, rett til bølgete, værbestandig pels. Fargene er svart, blue merle, rødt og red merle, med eller uten hvite og brune tegninger, og øynene kan være brune, blå, nøttebrune eller ravfargede. PetPrep tegner den i blue merle med naturlig hale.",
        "PetMD skriver at den har mye energi og trenger minst én time mosjon hver dag, helst to, sammen med oppgaver som holder hodet i gang, og at den bør børstes et par ganger i uken; AKC sier at ukentlig børsting holder mesteparten av året, med daglig børsting i røytesesongen. AKC skriver at den kan bli en flott familiehund med lydighetstrening og tidlig sosialisering, og at den som regel er god med barn, men kan prøve å gjete dem; PetMD nevner også at hengivenheten til familien kan gi separasjonsangst når den er alene. PetMD oppgir en levetid på 12 til 13 år.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chi, Chihuahueño, korthåret chihuahua",
      text: [
        "Chihuahua kommer fra Mexico. Standarden til The Kennel Club beskriver en liten, fin, kompakt hund med frekt uttrykk og et glad, livlig og intelligent gemytt, en godt rundet «eplehodeskalle», en moderat kort, lett spiss snute, store runde øyne som ikke er utstående, store ører og sigdhale; alle farger og fargeblandinger er tillatt, men aldri merle, og ønsket vekt er 1,8–2,7 kg. The Royal Kennel Club fører korthåret og langhåret chihuahua som to raser; PetPrep tegner den korthårede i fawn, med moderat hode.",
        "The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell én gang i uken, mener den passer i leilighet og oppgir en levetid på over 12 år. PDSA sier at chihuahuaer er så små og lette at barn fristes til å løfte dem opp, noe de neppe liker, så de passer bedre for familier med litt eldre barn. PDSA legger til at de som selskapshunder elsker selskap og trenger noen hjemme hele tiden, og at de bør sosialiseres fra valpetiden med mange ulike mennesker, opplevelser og steder.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer, ESS",
      text: [
        "Engelsk springer spaniel kommer fra Storbritannia, der den ble avlet for å finne, støkke og apportere vilt. Standarden til The Kennel Club beskriver en symmetrisk bygd, kompakt, sterk, munter og aktiv hund – den mest høystilte av de britiske landspanielene – med et vennlig, glad og lydig gemytt, lange ører med frynser, mørke nøttebrune øyne og tettliggende, rett, værbestandig pels; fargene er leverbrunt og hvitt eller svart og hvitt, begge med eller uten brune tegninger, og omtrentlig høyde er 51 cm. PetPrep tegner den i leverbrunt og hvitt, med naturlig hale.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og pelsstell mer enn én gang i uken, og oppgir en levetid på over ti år. PDSA skriver at springere er gode familiehunder som kommer godt overens med barn og andre kjæledyr i huset, er lydige og lærevillige, og trenger pelsstell én eller to ganger i uken pluss klipping hver tredje måned. AKC nevner også at de ikke bør være alene lenge, og at tidlig sosialisering og valpekurs er avgjørende.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltie, Shetland Collie (tidligere navn)",
      text: [
        "Shetland sheepdog kommer fra Storbritannia og er en liten, langhåret brukshund. FCI-standarden beskriver en våken, mild, intelligent, sterk og aktiv hund, kjærlig og lojal mot eieren og reservert overfor fremmede, med et hode formet som en lang, butt kile, små ører som bæres halvt oppreist med tuppene vippet fremover, og dobbel pels med lang, hard dekkpels; fargene er sobel, trefarget, blue merle, svart og hvitt, og svart og brunt, og ideell høyde er 37 cm for hanner og 35,5 cm for tisper. PetPrep tegner den i sobel og hvitt.",
        "The Royal Kennel Club regner med opptil en time mosjon om dagen og pelsstell hver dag, og oppgir en levetid på over ti år. PDSA sier at shelties er svært milde, lekne, lydige hunder som ofte passer godt inn i familielivet og kommer fint overens med barn, og at trening og sosialisering er svært viktig tidlig i livet. AKC legger til at de trenger jevnlig mental og fysisk aktivitet, passer best med eldre barn på grunn av gjeterinstinktet, og er kjent for å bruke stemmen mye.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "breton, Brittany, Brittany Spaniel",
      text: [
        "Epagneul breton er en stående fuglehund fra Frankrike; på engelsk kalles den Brittany. The Royal Kennel Club beskriver en svært energisk, intelligent hund som søker, står og apporterer, mild og kjærlig, men full av liv og livsglede, med tett, ganske fin pels, høyt ansatte trekantede ører og en hale som ofte er naturlig kort; standardfargene er oransje, leverbrunt eller svart med hvitt, skimlet eller trefarget, og høyden er 48–51 cm for hanner og 47–50 cm for tisper. PetPrep tegner den i oransje og hvitt.",
        "The Royal Kennel Club mener rasen trenger mer enn to timer mosjon daglig og pelsstell mer enn én gang i uken, og oppgir en levetid på over ti år. AKC skriver at bretoner er energiske hunder som trenger mye mosjon og mental stimulering, at de er milde og som regel tålmodige med barn, og at ukentlig børsting holder dem fine. PetMD nevner også at tidlig sosialisering av valper er et must, at de ikke har det bra når de er alene lenge, og at de, som er avlet for å jakte fugl, har sterkt jaktinstinkt.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (USA), American Cocker",
      text: [
        "Amerikansk cocker spaniel – i USA bare kalt cocker spaniel – er en annen rase enn engelsk cocker spaniel. AKC-standarden kaller den det minste medlemmet av Sporting Group, med lange, lappformede ører med rike frynser, rund skalle, bred og dyp snute og silkeaktig pels som er flat eller lett bølgete; den finnes i svart, i alle ensfargede varianter fra lyseste krem til mørkeste rødt, og i flerfarget med hvitt. Standarden ber om et jevnt gemytt uten tegn på skyhet.",
        "The Royal Kennel Club anbefaler pelsstell hver dag og mer enn to timer mosjon om dagen, og oppgir en levetid på over ti år; AKC og PetMD skriver at den ikke trenger mye mosjon. PetMD kaller disse blide hundene flotte familiehunder, vennlige mot mennesker og andre dyr, og anbefaler å begynne tidlig med sosialisering og trening; VCA skriver at de som regel er svært gode med barn, lett blir overvektige og må få ørene sjekket hver uke.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, Belgian Shepherd Dog (Malinois)",
      text: [
        "Belgisk fårehund malinois er den korthårede varianten av belgisk fårehund, en gjeterhundrase fra Belgia. FCI-standarden beskriver en harmonisk proporsjonert hund som forener eleganse og kraft, og tillater bare én farge: fawn med svart overdrag og svart maske. FCI- og AKC-standardene beskriver ganske små, oppreiste, trekantede ører, kort, hard pels med tett underull og et våkent, intelligent, nysgjerrig og selvsikkert gemytt.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og pelsstell mer enn én gang i uken, og oppgir en levetid på over ti år. AKC skriver at den ikke er et godt valg for førstegangseiere, har det best med eldre, ansvarlige barn og ikke bør være alene lenge; PetMD nevner sterkt jaktinstinkt, at den kan prøve å gjete barn, og at den trenger konsekvent daglig trening og tidlig sosialisering.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset",
      text: [
        "Basset hound er en kortbent drivende hund fra Storbritannia. FCI-standarden beskriver en hund med betydelig substans, velbalansert, rolig, aldri aggressiv eller sky, og kjærlig, med lavt ansatte, lange, fløyelsmyke ører, glatt, kort pels og fargene svart, hvitt og brunt eller sitron og hvitt. Breed Watch fra The Royal Kennel Club ber utstillingsdommere se etter øyelokk som ruller innover eller utover, svært lange ører, såre hudfolder og overflødig hud.",
        "The Royal Kennel Club regner med opptil en time mosjon om dagen og pelsstell én gang i uken, og oppgir en levetid på over ti år. PDSA beskriver en tolerant hund som kommer svært godt overens med barn og elsker selskap, med god appetitt som må følges med på; den anbefaler å sjekke hudfoldene hver dag og ta en pause mellom måltid og mosjon. AKC legger til at nesen kan lede den på avveier, så sikre bånd og inngjerdede områder er viktig.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vizsla, magyar vizsla, Hungarian Vizsla",
      text: [
        "Korthåret vizsla er en middels stor, elegant jakthund fra Ungarn med kort, rustgyllen pels. FCI-standarden beskriver en livlig, vennlig hund med jevnt gemytt som er lett å trene og holder nær kontakt med føreren sin; fargene er nyanser av rustgull og mørkt sandgull. Breed Watch fra The Royal Kennel Club oppgir ingen problemområder som er spesifikke for rasen.",
        "The Royal Kennel Club mener rasen trenger mer enn to timer mosjon daglig og pelsstell én gang i uken, og oppgir en levetid på over 12 år. PDSA beskriver en svært menneskeorientert hund som elsker selskap og kan få separasjonsangst når den er alene; den kommer godt overens med eldre barn, men PDSA vil ikke anbefale den med svært små barn eller for førstegangseiere, og på grunn av det sterke jaktinstinktet fraråder PDSA å holde den sammen med mindre kjæledyr. PDSA anbefaler også en pause mellom måltid og mosjon.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "cocker, Cocker Spaniel (UK), English Cocker, Merry Cocker",
      text: [
        "Engelsk cocker spaniel – i Storbritannia bare kalt cocker spaniel – er en annen rase enn amerikansk cocker spaniel. FCI-standarden beskriver en munter, robust, sporty hund, velbalansert og kompakt, med lavt ansatte, lappformede ører og flat, silkeaktig pels; AKC-standarden kaller den munter og kjærlig, med jevnt gemytt, og oppgir ensfarget svart, leverbrunt og nyanser av rødt samt flerfarget med hvitt. The Royal Kennel Club peker ikke ut noen rasespesifikke problemområder i Breed Watch.",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell hver dag, og oppgir en levetid på over ti år; en VetCompass-studie av engelske cocker spanieler i Storbritannia fant en median alder ved død på 11,44 år. PDSA sier at den takket være sitt tålmodige gemytt som regel kommer godt overens med barn, alltid under tilsyn, men advarer om at den er kjent for separasjonsangst og aldri bør være alene i mer enn fire timer. PDSA anbefaler også daglig børsting og en pause mellom måltid og mosjon.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, Maltese, Maltese Terrier",
      text: [
        "Malteser er en dverghund fra det sentrale Middelhavet, i dag under italiensk patronat i FCI. FCI-standarden beskriver en liten hund med noe lang kropp, livlig, kjærlig, svært rolig og svært intelligent, som veier 3–4 kg, med svært lang, tett, silkeaktig pels som faller tungt over hele kroppen. Pelsen har ingen underull, og helt hvit er den eneste fargen (et blekt elfenbensskjær er tillatt). I Breed Watch fra The Royal Kennel Club er ingen problemområder knyttet spesielt til rasen.",
        "The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell hver dag, sier at rasen ikke røyter, og oppgir en levetid på over 12 år. PDSA beskriver en oppvakt, vennlig og kjærlig hund som kan være reservert overfor fremmede, men som med riktig sosialisering tidlig i livet kan lære å bli trygg og sosial. PetMD advarer om at den kan få separasjonsangst når den er alene for lenge, sier at samvær med små barn må skje under tilsyn, og anbefaler å pusse tennene hver dag.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Carlin",
      text: [
        "Mops er en liten selskapshund fra Kina, i dag under britisk patronat i FCI. FCI-standarden beskriver en utpreget kvadratisk og kompakt hund – «multum in parvo» – med stor sjarm, verdighet og intelligens og et jevnt, glad og livlig gemytt, en ideell vekt på 6,3–8,1 kg, fin, glatt, kort og blank pels i sølv, aprikos, fawn eller svart, og en hale som er tett krøllet over hoften. Den ber om ganske store, godt åpne nesebor og regner sammenklemte nesebor og en kraftig rynke over nesen som uakseptabelt. The Royal Kennel Club plasserer rasen i Breed Watch kategori 3, med problemområder som blant annet pustevansker, utstående øyne, hudfolddermatitt og overvekt.",
        "PDSA kaller mopsen en rase med svært flatt ansikt (sterkt brakycefal) som lett blir andpusten, anbefaler å unngå mosjon i varmen og sier at dyrlegene deres sterkt vil anbefale en rase med normal snute eller en mopskrysning i stedet. The Royal Kennel Club anbefaler opptil en time mosjon om dagen og pelsstell én gang i uken, sier at rasen røyter, og oppgir en levetid på over ti år. PDSA beskriver en hund som ofte kommer godt overens med barn og andre kjæledyr, men som elsker selskap og ikke har det bra alene; PetMD anbefaler å rengjøre og tørke hudfoldene i ansiktet hver dag og nevner at fedme er vanlig hos rasen.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "collie, Rough Collie, Long-haired Collie",
      text: [
        "Langhåret collie er en stor gjeterhund fra Storbritannia. FCI-standarden beskriver en hund med stor skjønnhet som står med rolig verdighet, med vennlig gemytt og uten spor av nervøsitet eller aggresjon, svært tett pels med rett, hard dekkpels, og tre farger: sobel, trefarget og blue merle. Standarden til The Royal Kennel Club kaller den en flott familiehund, vennlig, glad og aktiv, god med barn og andre hunder, og oppgir en høyde på 56–61 cm for hanner og 51–56 cm for tisper. The Royal Kennel Club plasserer rasen i Breed Watch kategori 2 og registrerer ikke valper fra paringer mellom to merle-hunder.",
        "The Royal Kennel Club regner med opptil en time mosjon om dagen og pelsstell hver dag, sier at rasen røyter, og oppgir en levetid på over 12 år. PetMD skriver at collier er kjærlige, særlig mot barn, og gode med andre dyr, men at de ikke har det bra alene i lange perioder og kan nappe i ankler og hæler når de blir ivrige. PetMD nevner også at sosialisering av valpen er avgjørende, og at MDR1-mutasjonen, som påvirker hvordan en hund omsetter visse legemidler, forekommer hos collier.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "engelsk mastiff, English Mastiff, Old English Mastiff",
      text: [
        "Mastiff er en svært stor vokterrase fra Storbritannia. FCI-standarden beskriver en kombinasjon av storhet og mot – rolig, kjærlig mot eierne, men i stand til å vokte – med et hode som virker kvadratisk, en bred, dyp og kraftig kropp og kort, tettliggende pels i aprikos, fawn eller brindle. PDSA oppgir en gjennomsnittlig høyde på 71–78 cm og en gjennomsnittlig vekt på 80–85 kg og nevner at The Kennel Club plasserer mastiff i kategori 3: raser med synlige eksteriørproblemer som kan gi smerte, ubehag eller helseproblemer.",
        "PDSA anbefaler rundt en time mosjon om dagen for voksne hunder – men ikke for mye mosjon mens valpens knokler og ledd fortsatt utvikler seg – pelsstell én gang i uken med daglig rengjøring av rynkene i ansiktet, og oppgir en gjennomsnittlig levetid på under ti år. PetMD kaller mastiffer flotte familiehunder i hjem med barn som forstår hvordan man omgås dyr, men kanskje ikke med småbarn eller babyer på grunn av størrelsen; de kommer som regel godt overens med andre kjæledyr de blir kjent med som valper, sikler mye og bør ikke mosjonere den siste timen før og den første timen etter måltider på grunn av risikoen for magedreining.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba inu, Japanese Shiba Inu",
      text: [
        "Shiba er en liten spisshund fra Japan; navnet betyr «liten hund», og ifølge The Royal Kennel Club ble den utviklet for å jakte små viltfugler. FCI-standarden beskriver en liten, velbalansert hund med god benbygning, et trofast gemytt, skarpe sanser og stor årvåkenhet, hard dekkpels over myk, tett underull, små, oppreiste, trekantede ører og en tykk, krøllet hale; fargene er rød, svart og brun (black and tan) og sesam, alltid med hvitaktige «urajiro»-tegninger på kinnene, brystet og undersiden. AKC-standarden oppgir en gjennomsnittsvekt på ca. 23 pund (10 kg) for hanner og 17 pund (8 kg) for tisper.",
        "The Royal Kennel Club mener rasen trenger opptil en time mosjon daglig og pelsstell én gang i uken, nevner at rasen røyter, og oppgir en levetid på over ti år; en stor britisk studie fant en median levetid på 14,6 år. AKC beskriver en selvsikker, selvstendig hund som passer bedre for en erfaren eier, trives best med eldre barn og aldri bør slippes løs utenfor et inngjerdet eller lukket område. PetMD nevner også at den trenger mye mental stimulering, har godt av sosialisering som valp og bør få tennene pusset hver dag.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, African Lion Dog",
      text: [
        "Rhodesian ridgeback kommer fra det sørlige Afrika. Det mest kjente kjennetegnet er ryggkammen, en stripe hår som vokser i motsatt retning av resten av pelsen. FCI-standarden beskriver en velbalansert, sterk, muskuløs, smidig og aktiv hund som er verdig, intelligent og reservert overfor fremmede, og som er spesielt verdsatt som vakthund og familiehund. Den korte, tette pelsen er lys hvetefarget til rødlig hvetefarget, og standarden oppgir en vekt på ca. 36,5 kg for hanner og 32 kg for tisper.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og pelsstell én gang i uken, nevner at rasen røyter og passer i et stort hus med stor hage, og oppgir en levetid på over ti år. PDSA beskriver lekne, kraftige og svært lojale hunder med svært sterkt jaktinstinkt som ikke anbefales for førstegangseiere, aldri bør være alene i mer enn fire timer og må sosialiseres fra ung alder; PDSA anbefaler også en pause mellom måltid og mosjon. Woodgreen legger til at de har det best med eldre barn.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Continental Toy Spaniel, Phalène (variant med hengende ører), sommerfuglhund",
      text: [
        "Papillon er varianten med oppreiste ører av kontinental dvergspaniel, en rase fra Belgia og Frankrike; varianten med hengende ører kalles phalène. FCI-standarden beskriver en liten, elegant dvergspaniel med lang pels og livlig personlighet, ca. 28 cm høy og med en vekt på opptil 4,5 kg for hanner og 5 kg for tisper. De store ørene bæres som en sommerfugls utbredte vinger, og pelsen er alltid hvit med fargede flekker.",
        "The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell mer enn én gang i uken, nevner at rasen røyter og kan bo i leilighet, og oppgir en levetid på over 12 år. PDSA beskriver milde, lekne, svært lydige hunder som kommer godt overens med alle og trenger trening og sosialisering tidlig i livet; PDSA foreslår pelsstell to–tre ganger i uken. PetMD nevner også at papilloner trenger daglig mental stimulering, kan få separasjonsangst og bør få tennene pusset hver dag, og at svært små barn ved et uhell kan skade en så liten hund.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Algarvian Water Dog",
      text: [
        "Portugisisk vannhund kommer fra Portugal, der den arbeidet sammen med fiskere. Standarden til The Royal Kennel Club beskriver en robust, nesten kvadratisk hund med svært kraftig muskulatur – svært intelligent og enormt energisk, med gode evner til å svømme og dykke – med en høyde på 50–57 cm (hanner) og 43–52 cm (tisper) og en vekt på 19–25 kg (hanner) og 16–22 kg (tisper). Den rikelige, enkle pelsen har ingen underull og finnes i svart, hvitt, brunt, eller svart eller brunt med hvitt; den tradisjonelle løveklippen gjør snuten og bakparten kortklipte.",
        "The Royal Kennel Club regner med opptil en time mosjon om dagen og pelsstell hver dag, nevner at rasen ikke røyter og passer i et stort hus, og oppgir en levetid på over ti år. PDSA beskriver svært vennlige, kjærlige hunder som kommer godt overens med andre kjæledyr, er utmerkede familiehunder og trenger trening og sosialisering tidlig i livet; PDSA legger til klipping og forming hos en profesjonell hundefrisør i løpet av året.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bichon, Bichon à poil frisé, Bichon Tenerife",
      text: [
        "Bichon frisé er en fransk-belgisk selskapshund. FCI-standarden beskriver en munter liten hund med livlig gange og svært løst, hvitt, korketrekkerkrøllet hår – en ekte følgesvenn som kan tas med overalt, verken nervøs eller bjeffete – med en mankehøyde på 25–29 cm og en vekt på ca. 5 kg. En voksen hund er alltid helt hvit, med svært mørke runde øyne, svart nese, hengende ører og en hale med rik behåring som bæres over ryggen.",
        "The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell hver dag, nevner at rasen ikke røyter og passer i leilighet, og oppgir en levetid på over 12 år. PDSA beskriver svært kjærlige, hengivne hunder som er utmerkede med barn og andre kjæledyr, og legger til at pelsen må trimmes annenhver måned eller så, ofte hos en profesjonell hundefrisør.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "newfie, Newfoundland",
      text: [
        "Newfoundlandshund kommer fra Canada; FCI fører den blant molossere av fjellhundtype og godkjenner tre farger: svart, hvit og svart (landseer) og brun. PDSA kaller newfoundlandshunder milde kjemper og oppgir en gjennomsnittlig høyde på 66–71 cm og en gjennomsnittlig vekt på 50–69 kg; PetMD legger til at rasens historie gjør dem til naturlige svømmere.",
        "PDSA anbefaler minst en time mosjon om dagen for voksne hunder, men ikke for mye mosjon for valper mens knoklene og leddene fortsatt utvikler seg; PDSA kaller pelsstellet en daglig oppgave, nevner at newfoundlandshunder gjerne sikler, og oppgir en levetid på under ti år. PetMD kaller rasen en enestående familiehund som kommer godt overens med barn, små kjæledyr og andre hunder, anbefaler tilsyn når små barn er sammen med en hvilken som helst hund, og advarer om at noen kan få separasjonsangst når de er alene.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Carriage Dog, Spotted Coach Dog, Firehouse Dog",
      text: [
        "Dalmatiner kommer fra Kroatia; FCI fører den blant rasene som er beslektet med drivende hunder. Den korte, skinnende pelsen er helt hvit med tydelig avgrensede svarte eller leverbrune flekker, og standarden ber om flekkete ører. FCI oppgir en høyde på 56–62 cm for hanner og 54–60 cm for tisper; PDSA oppgir en gjennomsnittlig vekt på 18–27 kg.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og børsting én gang i uken, og sier at rasen røyter og passer i et stort hus med hage. PDSA kaller dalmatinere flotte kjæledyr for aktive husstander som passer bedre med eldre barn, trenger selskap og aldri bør være alene i mer enn fire timer; PDSA nevner døvhet blant rasens helseproblemer og at det finnes en BAER-hørselstest.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "Australian cattle dog kommer fra Australia; FCI fører den blant kvegdriverne. Standarden til The Kennel Club beskriver en sterk, kompakt brukshund med glatt, værbestandig dobbel pels i blått (marmorert eller prikkete) eller jevnt rødprikket, og oppgir en høyde på 46–51 cm for hanner og 43–48 cm for tisper; PDSA oppgir en gjennomsnittlig vekt på 16–20 kg.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og børsting én gang i uken, og sier at rasen røyter. PDSA beskriver en svært intelligent og energisk hund som trenger mye fysisk og mental aktivitet; på grunn av det sterke gjeterinstinktet kan den nappe barn som løper i hælene, og sosialisering og trening tidlig i livet hjelper.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Whippet kommer fra Storbritannia; FCI fører den blant de korthårede myndene. Standarden til The Kennel Club beskriver en balansert kombinasjon av muskelkraft og styrke med eleganse og grasiøse linjer, fin, kort, tettliggende pels i alle farger og fargeblandinger unntatt merle, og et mildt, kjærlig og jevnt gemytt; den oppgir en høyde på 47–51 cm for hanner og 44–47 cm for tisper, og PDSA oppgir en gjennomsnittlig vekt på 11–18 kg.",
        "PDSA anbefaler minst en time mosjon hver dag, med muligheter til å løpe løs i et sikkert område, og ukentlig børsting med en myk børste. PDSA kaller whippeter et populært valg for familier fordi de er rolige og milde rundt barn, men anbefaler et hjem med litt eldre barn; whippeter liker ikke å være alene og har et svært sterkt jaktinstinkt, så PDSA anbefaler ikke å holde dem sammen med mindre kjæledyr. Et dekken kan hjelpe om vinteren, og tykt, mykt liggeunderlag beskytter de fremtredende knoklene.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Griffon d’arrêt à poil dur Korthals, Wirehaired Pointing Griffon, Griff",
      text: [
        "Korthals griffon, på engelsk Wirehaired Pointing Griffon, kommer fra Frankrike; FCI fører den blant de kontinentale stående fuglehundene og kaller den først og fremst en allsidig stående fuglehund. FCI-standarden beskriver en kraftfull, robust hund som er lengre enn høy, med hard, grov pels som aldri er krøllete eller ullen, en nese som alltid er brun, og helst stålgrå pels med brune (leverbrune) flekker; den oppgir en høyde på ca. 55–60 cm for hanner og 50–55 cm for tisper og kaller rasen mild, stolt og svært snill med barn. PetMD oppgir en vekt på 35–70 pund (ca. 16–32 kg).",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, et stort hus og en stor hage, og pelsstell mer enn én gang i uken. PetMD anbefaler ukentlig børsting (noen hunder må også trimmes for hånd), sier at korthals griffoner som regel er tålmodige og milde med barn når de er sosialisert som valper, og nevner at jakthistorien kan gi dem et sterkt jaktinstinkt, så mindre dyr som katter og kaniner kan se ut som noe å jage.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Retriever (Chesapeake Bay)",
      text: [
        "Chesapeake bay retriever, ofte kalt chessie, kommer fra USA; FCI fører den blant retrieverne. FCI-standarden beskriver en apporterende brukshund som er like dyktig på land som i vann, og som ikke skal være overdrevent stor eller tung, med tykk, kort pels over tett, ullen underull og klare gulaktige eller ravfargede øyne; alle brune nyanser, sedge og deadgrass er godkjent, og svart pels er diskvalifiserende. Den oppgir en høyde på 58–66 cm og en vekt på 29,5–36,5 kg for hanner, og 53–61 cm og 25–32 kg for tisper.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, et stort hus og en stor hage, og pelsstell én gang i uken. PetMD beskriver en oppvakt, munter og svært kjærlig hund som kan bli destruktiv hvis den ikke får stimulering eller er alene for lenge, sier at chessier med riktig introduksjon og sosialisering blir et flott tilskudd til familien, og anbefaler å ikke la hunden mosjonere rett før eller rett etter måltid.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samojed, Samoyed, Samoyede",
      text: [
        "Samojedhund kommer fra Nord-Russland og Sibir; FCI fører den blant de nordiske sledehundene. FCI-standarden beskriver en hvit, elegant arktisk spisshund av middels størrelse med rikelig, tykk, tett polarpels, mørkebrune øyne, små, tykke, oppreiste ører og lepper som er lett oppbøyd i munnvikene i det karakteristiske «samojedsmilet»; pelsen er helt hvit, krem eller hvit med kjeksfarge (biscuit), og blå øyne eller øyne med ulik farge er diskvalifiserende. Den oppgir en ideell høyde på 57 cm for hanner og 53 cm for tisper, hver med en toleranse på 3 cm.",
        "PDSA anbefaler minst to timer mosjon hver dag og pelsstell daglig, sier at samojedhunder røyter svært ofte, som regel er flotte med barn og lojale mot hele familien, aldri bør være alene i mer enn fire timer, trenger en svært sikker hage fordi de er dyktige rømningskunstnere, og har sterkt jaktinstinkt, og anbefaler en pause etter måltid før mosjon. PetMD nevner også at samojedhunder ikke har det bra når det er varmt.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, Scottish Terrier, Aberdeen Terrier",
      text: [
        "Skotsk terrier, ofte kalt scottie, kommer fra Storbritannia; FCI fører den blant de små terrierne. Standarden til The Kennel Club beskriver en tettbygd, kortbent hund med våken holdning som gir inntrykk av stor kraft og aktivitet i et lite format, lojal og trofast, verdig, selvstendig og reservert, men modig og svært intelligent – dristig, men aldri aggressiv. Den tettliggende doble pelsen har hard, strihåret dekkpels; fargen er svart, hvetefarget eller brindle i alle nyanser. Den oppgir en høyde på 25–28 cm og en vekt på 8,5–10,5 kg.",
        "PDSA sier at scottier trenger rundt en time mosjon daglig og pelsstell hver dag, med trimming og klipping hos en profesjonell hundefrisør hver andre til tredje måned, beskriver dem som lojale og hengivne mot familien og sier at de kan være sta, så treningen krever tålmodighet og innsats. PetMD skriver at de med riktig trening og sosialisering kan være gode familiehunder, at det er viktig å sosialisere valpen, og at de ikke bør være alene i lengre perioder.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner Pointer, Weim",
      text: [
        "Weimaraner kommer fra Tyskland; FCI fører den blant de kontinentale stående fuglehundene og godkjenner en korthåret og en langhåret variant. FCI-standarden beskriver en middels stor til stor jakthund av funksjonell brukstype, senete og svært muskuløs, med ravfargede øyne og brede, ganske lange ører; pelsen er sølvgrå, rådyrgrå eller musegrå, bare små hvite tegninger på brystet og tærne er tillatt, og alle andre farger enn grått er diskvalifiserende. Den oppgir en høyde på 59–70 cm og en vekt på ca. 30–40 kg for hanner, og 57–65 cm og ca. 25–35 kg for tisper.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, et stort hus og en stor hage, og pelsstell én gang i uken. PDSA sier at weimaranere er fantastiske familiehunder i de riktige hendene og har det best med eiere som kjenner rasen, men anbefaler dem ikke i hjem med mindre barn eller mindre kjæledyr på grunn av det svært sterke jaktinstinktet, sier at de kan få separasjonsangst hvis de er alene, og anbefaler å sosialisere dem fra valpetiden og ta en pause mellom måltid og mosjon. PetMD legger til rengjøring av ørene og et bad én gang i måneden.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "Italiensk mynde kommer fra Italia; FCI fører den som piccolo levriero italiano blant de korthårede myndene. Standarden til The Kennel Club beskriver en greyhound i miniatyr, slankere i alle proporsjoner, elegant, grasiøs og rask i bevegelsene, intelligent, kjærlig og livlig, selv om den kan virke reservert, med kort, fin, blank pels over tynn hud. Den oppgir en høyde på 32–38 cm og en vekt på 3,6–4,5 kg; svart, blå, krem, fawn, rød og hvit, eller hvilken som helst av disse med innslag av hvitt, er godkjent – aldri merle, brindle eller brune tegninger.",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen, sier at rasen passer i et lite hus i by eller på landet, trenger pelsstell én gang i uken og ikke røyter. PDSA skriver at italienske mynder er fulle av energi, bør mosjonere i et inngjerdet område fordi de kan være vanskelige å kalle inn når de ser et byttedyr, kan være sky, så tidlig sosialisering er avgjørende, og – fordi knoklene er skjøre mens de vokser – kanskje ikke er den ideelle rasen i hjem med små barn eller andre kjæledyr. PetMD legger til at den tynne pelsen ikke holder dem varme, så de fryser lett.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "kjempeschnauzer, Giant Schnauzer, Munich Schnauzer",
      text: [
        "Riesenschnauzer kommer fra Tyskland; FCI fører den blant pinscherne og schnauzerne. Standarden til The Royal Kennel Club beskriver en kraftig bygd, robust, senete hund som virker nesten kvadratisk, dristig, pålitelig, godmodig og rolig, med hard, strihåret dekkpels og god underull. Den oppgir en høyde på 65–70 cm for hanner og 60–65 cm for tisper; FCI-standarden oppgir en vekt på 35–47 kg. Helt svart, pepper og salt med mørk ansiktsmaske, og svart og sølv er godkjent – ingen andre farger.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, sier at rasen passer i et stort hus med stor hage, trenger pelsstell hver dag og ikke røyter. PDSA sier at pelsen trenger daglig stell og jevnlig trimming, at riesenschnauzere kan være elskelige kjæledyr for familier med eldre barn hvis de er godt sosialisert som valper, og at disse viljesterke hundene passer for erfarne eiere. PetMD nevner også at pelsen trimmes for hånd av en profesjonell hundefrisør med noen måneders mellomrom, og at rasen ikke trives i hjem der folk sjelden er hjemme.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Bloodhound, St. Hubert Hound, Chien de Saint-Hubert, Sleuth Hound",
      text: [
        "Blodhund kommer fra Belgia, der FCI fører den som chien de Saint-Hubert, en stor drivende hund. FCI-standarden beskriver den kraftigste av alle sporhundene: mild, rolig, snill og sosial med mennesker og spesielt knyttet til eieren sin, med kort, tett, værbestandig pels og smidig, løs hud. Hanner veier ca. 46–54 kg og tisper ca. 40–48 kg; de tre fargene er svart og brunt, leverbrunt og brunt, og rødt.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, sier at rasen passer i et stort hus med stor hage, trenger pelsstell én gang i uken og røyter. PDSA skriver at blodhunder passer bedre for erfarne eiere, ikke anbefales i hjem med mindre barn eller mindre kjæledyr på grunn av størrelsen og det svært sterke jaktinstinktet, sikler og må få hudfoldene holdt rene og tørre. PDSA anbefaler også en pause mellom måltid og mosjon.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "akita, American Akita, Great Japanese Dog",
      text: [
        "Akitaen i dette leksikonet er den amerikanske typen: FCI fører den som amerikansk akita, en rase med japansk opprinnelse, atskilt fra den japanske akita inu. FCI-standarden beskriver en stor, solid bygd, velbalansert hund med mye substans og kraftig benbygning, små, oppreiste ører og en stor hale som bæres over ryggen; hanner har en mankehøyde på 66–71 cm. Alle farger er tillatt, for eksempel rød, fawn, hvit, pinto eller brindle. PDSA oppgir en gjennomsnittlig vekt på 31–59 kg.",
        "PDSA beskriver utrolig lojale familiehunder som er selvstendige og svært store, så de har det best med erfarne eiere; PDSA vil ikke anbefale en akita i et hjem med små barn og fraråder å la dem være alene, fordi mange takler det dårlig. PDSA anbefaler minst to timer mosjon hver dag, sosialisering fra ung alder, en pause mellom måltid og mosjon og børsting minst én gang i uken – akitaer røyter mye. PDSA nevner også sterkt jaktinstinkt og at de kan bli overopphetet når det er svært varmt.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "corgi, Cardigan Welsh Corgi, Cardi",
      text: [
        "Welsh corgi cardigan kommer fra Storbritannia; FCI fører den blant kvegdriverne. Standarden til American Kennel Club oppgir en mankehøyde på 10,5–12,5 tommer (ca. 27–32 cm) og en ideell vekt på 30–38 pund (ca. 14–17 kg) for hanner. I motsetning til slektningen pembroke har den en lang, rikt behåret hale.",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen, regner et lite hus med liten eller middels stor hage som nok, og sier at rasen trenger pelsstell mer enn én gang i uken og røyter; den oppgir en levetid på over 12 år og fører cardigan som en sårbar britisk rase. PDSA sier at welsh corgier er villige til å gjøre til lags, så treningen bør være ganske lett, at to–tre børstinger i uken som regel er nok, og at de kan nappe barn som løper i hælene – sosialisering med barn og trening tidlig i livet hjelper.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, German Wirehaired Pointer, GWP",
      text: [
        "Strihåret vorsteh kommer fra Tyskland; FCI fører den som deutsch drahthaar blant de kontinentale stående fuglehundene. Standarden til The Royal Kennel Club beskriver en middels stor jakthund med strihår som dekker huden helt – mild, kjærlig og med jevnt gemytt, våken, lydig og svært lojal. Hanner er 60–67 cm høye og veier 25–34 kg; tisper er 56–62 cm høye og veier 20,5–29 kg. Leverbrunt og hvitt, ensfarget leverbrunt og svart og hvitt er standardfargene.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen, sier at den passer i et stort hus med stor hage på landet, trenger pelsstell mer enn én gang i uken og røyter. PetMD skriver at strihårede vorstehhunder trenger mye mosjon og mental stimulering, knytter seg tett til familien og kan bli flotte familiehunder når de trenes og sosialiseres tidlig, har det fint med barn som har lært hvordan man oppfører seg med dyr, aldri bør være alene i lange perioder, og har sterkt jaktinstinkt. Pelsen trimmes for hånd to ganger i året.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "sankt bernhard, St. Bernard, St. Bernhardshund, Bernhardiner",
      text: [
        "Sankt bernhardshund kommer fra Sveits; FCI fører den som St. Bernhardshund blant molosserne av fjellhundtype. FCI-standarden beskriver en hund som av natur er vennlig, rolig til livlig og årvåken, og godkjenner to varianter: korthåret, med tett, glatt, tettliggende pels, og langhåret. Hanner er minst 70 cm og tisper minst 65 cm høye, opptil 90 og 80 cm; PDSA oppgir en vekt på 54–81 kg.",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen, sier at rasen passer i et stort hus med stor hage, trenger pelsstell mer enn én gang i uken, røyter og blir som regel ikke eldre enn ti år. PDSA sier at sankt bernhardshunder elsker å være sammen med en familie og er flotte med mennesker i alle aldre, også barn, bør være godt sosialisert som valper, må børstes minst tre ganger i uken, sikler, ikke takler varme like godt, og trenger en pause mellom måltid og mosjon. PetMD legger til at disse menneskeorienterte hundene kan få separasjonsangst hvis de er alene i lange perioder.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffe, Staffie, Staffy, Stafford",
      text: [
        "Staffordshire bullterrier kommer fra Storbritannia; FCI fører den blant terriere av bulltype. FCI-standarden beskriver en glatthåret, velbalansert hund med stor styrke i forhold til størrelsen – tradisjonelt med ukuelig mot og utholdenhet, svært intelligent og kjærlig, særlig mot barn. Den er 35,5–40,5 cm høy; hanner veier 12,7–17 kg og tisper 11–15,4 kg. Den finnes i brindle, rødt, fawn, svart, blått eller hvitt, alene eller med hvitt.",
        "The Royal Kennel Club kaller den en fantastisk familiehund og anbefaler opptil en time mosjon om dagen; den trenger pelsstell én gang i uken, røyter og blir som regel eldre enn 12 år. PDSA skriver at staffordshire bullterriere er tolerante og blide mot barn, men som menneskeorienterte hunder er de kjent for å slite med separasjonsangst når de er alene, de er kjent for å tygge på ting, og med det svært sterke jaktinstinktet er det ikke lurt å ha mindre kjæledyr rundt dem.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "Airedale terrier kommer fra Storbritannia; FCI fører den blant de store og middels store terrierne. FCI-standarden kaller den den største av terrierne – en muskuløs, aktiv, ganske kompakt hund som er utadvendt og selvsikker, vennlig, modig og intelligent, alltid våken, ikke aggressiv, men fryktløs. Hanner er ca. 58–61 cm og tisper ca. 56–59 cm høye. Den harde, tette, strihårede pelsen er brun med svart eller gråspettet sal.",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen; pelsen trenger stell hver dag og røyter ikke, og rasen blir som regel eldre enn ti år. PetMD beskriver flotte familiehunder som, hvis de er godt trent, som regel kommer overens med barn, men som ikke bør overlates til seg selv for lenge; PetMD anbefaler børsting noen ganger i uken, en rask rengjøring av ørene hver uke og en profesjonell hundefrisør tre eller fire ganger i året.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "jack russell, Russell Terrier (AKC), JRT",
      text: [
        "Jack russell terrier – American Kennel Club kaller den Russell Terrier – kommer fra England og ble utviklet i Australia; FCI fører den blant de små terrierne. Standarden beskriver en sterk, aktiv, smidig arbeidsterrier med stor personlighet: livlig, våken og aktiv, dristig og fryktløs, vennlig, men stille selvsikker. Den er 25–30 cm høy og veier ca. 5–6 kg. Den glatte, brutte eller ruhårede pelsen er for det meste hvit med svarte og/eller brune tegninger.",
        "The Royal Kennel Club mener rasen trenger opptil en time mosjon daglig og pelsstell én gang i uken; rasen røyter og blir som regel eldre enn ti år. PDSA beskriver smarte, livlige hunder som kan bli gode familiehunder hvis de trenes og sosialiseres fra valpetiden, men som passer bedre for familier med litt eldre barn; de har svært sterkt jaktinstinkt, så mindre kjæledyr anbefales ikke, og de elsker å grave.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Bullmastiff er en gammel engelsk vokterrase fra 1800-tallet, som stammer fra bulldog og old english mastiff; FCI fører den blant molosserne. Standarden beskriver en kraftig, symmetrisk hund som viser stor styrke, men ikke er klumpete – utholdende, aktiv, pålitelig, livlig, våken og trofast. Hanner er 64–69 cm høye og veier 50–59 kg, tisper 61–66 cm og 41–50 kg. Den korte, harde pelsen er i alle nyanser av fawn, rødt eller brindle, alltid med svart snute.",
        "The Royal Kennel Club anbefaler mer enn to timer mosjon om dagen og pelsstell én gang i uken, og rasen blir som regel ikke eldre enn ti år. PDSA beskriver svært lojale hunder som på grunn av størrelse og kraft passer bedre i hjem med bare voksne eller familier med eldre barn; de trenger tidlig sosialisering, har det helst med noen hjemme hele tiden, har svært sterkt jaktinstinkt, sikler mye og trenger en pause mellom måltid og mosjon.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested, kinesisk nakenhund, Powder Puff",
      text: [
        "Chinese crested dog er en liten, aktiv og grasiøs selskapshund fra Kina; FCI fører den blant de hårløse hundene. Den finnes i to varianter: den hårløse, med glatt, naken kropp og hår bare på hodet (toppen), føttene og halen, og powder puff, som er helt dekket av et slør av lang, myk pels. Hanner er 28–33 cm og tisper 23–30 cm høye; PetMD oppgir en vekt på 8–12 pund (3,6–5,4 kg). Alle farger er tillatt unntatt merle, og gemyttet beskrives som glad, aldri ondsinnet.",
        "The Royal Kennel Club anbefaler opptil 30 minutter mosjon om dagen og pelsstell én gang i uken; den passer i leilighet, og rasen blir som regel eldre enn 12 år. PetMD beskriver en vennlig hund som passer inn i de fleste familier, også familier med barn og andre kjæledyr – alt samvær med barn bør skje under tilsyn. Den nakne huden må beskyttes mot sol og kulde, klørne bør sjekkes hver uke, og valper trenger tidlig og konsekvent sosialisering.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "Nova scotia duck tolling retriever – tolleren – er en retriever fra Canada; FCI-standarden beskriver hvordan den løper og leker langs strandkanten godt synlig for endene for å lokke dem inn, og deretter sendes ut for å apportere fuglene. Standarden beskriver en middels stor, kraftig, kompakt og godt muskuløs hund som er svært intelligent, lett å trene og har stor utholdenhet. FCI oppgir 48–51 cm og 20–23 kg for hanner, 45–48 cm og 17–20 kg for tisper. Den vannavstøtende doble pelsen er i ulike nyanser av rødt eller oransje, som regel med hvitt på halespissen, føttene, brystet eller som bles.",
        "The Royal Kennel Club regner med opptil en time mosjon om dagen og pelsstell mer enn én gang i uken, og rasen røyter; PetMD anbefaler børsting én eller to ganger i uken. En stor britisk studie (McMillan 2024, via Dogs Trust) oppgir en median forventet levealder på 13,2 år, PetMD 12–14 år, og som andre middels store hunder er den fullvoksen ved ca. 12–15 måneder (PetMD). AKC beskriver svært kjærlige hunder som som regel er gode med barn, trenger mye fysisk mosjon og mental stimulering, kan ha sterkt jaktinstinkt overfor mindre dyr og har godt av tidlig sosialisering og valpekurs.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, Cairnie",
      text: [
        "Cairn terrier kommer fra Storbritannia; FCI fører den blant de små terrierne. Standarden til The Kennel Club beskriver en smidig, våken terrier med et arbeidsomt, naturlig utseende – aktiv, modig og hardfør, med et fryktløst og muntert gemytt, bestemt, men ikke aggressiv. Den værbestandige doble pelsen har rikelig, hard dekkpels; fargen er krem, hvetefarget, rød, grå eller nesten svart, brindle er godkjent, og mørke ører og mørk snute er typisk. Den oppgir en høyde på ca. 28–31 cm og en ideell vekt på 6–7,5 kg.",
        "PDSA anbefaler minst en time mosjon om dagen og sier at cairn terriere har grenseløs energi og sterkt jaktinstinkt, så de må sosialiseres tidlig med katter og andre små kjæledyr og trenger forsiktighet når de går løse, og at de, når de er sosialisert, kommer svært godt overens med barn og er utmerkede familiehunder. PDSA anbefaler å trimme pelsen for hånd to ganger i året og pelsstell én eller to ganger i uken; Dogs Trust sier at de røyter svært lite. En stor britisk studie (McMillan 2024, via Dogs Trust) oppgir en median forventet levealder på 14,0 år, PetMD 13–15 år, og som andre små hunder er den fullvoksen ved ca. 9–12 måneder (PetMD). PetMD nevner også at de trenger mye mosjon og mental stimulering.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "engelsk bullterrier, English Bull Terrier, Bully",
      text: [
        "Bullterrier kommer fra Storbritannia; FCI fører den blant terriere av bulltype (gruppe 3). Det er en middels stor, korthåret terrier: PDSA oppgir en gjennomsnittlig høyde på 51–61 cm og en gjennomsnittlig vekt på 22–31 kg, og PetMD beskriver en atletisk kropp på ca. 21–22 tommer og 50–70 pund. PetMD kaller jevnlig mosjon et must og sier at bullterriere er kjærlige mot familien, også barn, men ikke alltid vennlige mot andre hunder eller katter, og at tidlig og hyppig sosialisering og trening er avgjørende.",
        "PDSA anbefaler minst en time mosjon om dagen, fordelt utover dagen, og en pause etter måltid før mosjon. PDSA skriver at en godt sosialisert bullterrier kommer overens med mennesker i alle aldre, men siden den er litt lett å hisse opp, passer den bedre med eldre barn; den vil helst ha selskap hele tiden og har sterkt jaktinstinkt, så det kreves forsiktighet rundt katter og andre små dyr. Børsting én gang i uken er nok for pelsen. PDSA oppgir en gjennomsnittlig levetid på over ti år og PetMD 12–13 år; som andre middels store hunder er den fullvoksen ved ca. 12–15 måneder (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Min Pin, Zwergpinscher",
      text: [
        "Dvergpinscher kommer fra Tyskland; FCI fører den blant pinscherne og schnauzerne (gruppe 2) og beskriver den som en forminsket utgave av tysk pinscher – livlig, temperamentsfull, selvsikker og med jevnt gemytt. Pelsen er kort, tett, glatt og blank, enten ensfarget hjorterød til mørk rødbrun eller svart med brune tegninger, og halen er naturlig. FCI-standarden oppgir en høyde på 25–30 cm og en vekt på 4–6 kg for hanner og tisper; som andre dvergraser er den fullvoksen ved ca. 8–12 måneder (PetMD).",
        "PDSA anbefaler opptil en halvtime mosjon om dagen for disse energiske, travle små hundene, sier at børsting én gang i uken som regel er nok for pelsen, og nevner at de kan være sta og selvstendige, så treningen krever øvelse og tålmodighet. PetMD sier at de kan bli utmerkede familiehunder med riktig sosialisering og trening. VCA beskriver rasen som leken og svært god med barn, selv om svært små eller ville barn kan skade den med røff lek, og sier at den tynne pelsen og den lille størrelsen gjør at den lett blir nedkjølt. PDSA oppgir en gjennomsnittlig levetid på over 12 år og PetMD 12–16 år.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Pyreneerhund – i USA kalt Great Pyrenees – kommer fra Frankrike; FCI fører den blant molosserne av fjellhundtype (gruppe 2) og beskriver en hund av stor størrelse, imponerende og kraftig bygd, men ikke uten en viss eleganse. Pelsen er hvit, eller hvit med flekker i grevlingfarge, ulvegrått, blekgult eller oransje på hodet og ørene. FCI-standarden oppgir en høyde på 70–80 cm for hanner og 65–75 cm for tisper; PDSA oppgir en gjennomsnittlig vekt på 40–50 kg. Som andre kjempehunder er den fullvoksen ved ca. 18–24 måneder (PetMD).",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen, sier at rasen passer i et stort hus med stor hage, trenger pelsstell mer enn én gang i uken og røyter, og oppgir en levetid på under ti år (PetMD og VCA oppgir 10–12 år). PDSA kaller dem milde kjemper – rolige, godmodige hunder som som regel kommer godt overens med alle – og sier at treningen krever tålmodighet og belønningsbaserte metoder. VCA skriver at pyreneerhunden er hengiven mot familien, særlig mot barn, og at tidlig sosialisering er svært viktig; PetMD sier at den lever godt sammen med andre kjæledyr, men kanskje passer best i hjem uten mindre barn, og anbefaler å unngå hard mosjon rundt måltidene på grunn av risikoen for magedreining.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten terrier, wheaten, Soft Coated Wheaten Terrier, SCWT",
      text: [
        "Irish soft coated wheaten terrier kommer fra Irland; FCI fører den blant de store og middels store terrierne. Standarden til The Royal Kennel Club beskriver en middels stor, kompakt, høystilt terrier med myk, silkeaktig, hvetefarget pels som faller i løse krøller eller bølger – godmodig, livlig og modig, full av selvtillit og humor. Den eneste fargen er en god, klar hvetefarge. PDSA oppgir en gjennomsnittlig høyde på 46–49 cm og en gjennomsnittlig vekt på 16–20,5 kg (standarden til The Kennel Club oppgir 16–20,5 kg for hanner og noe mindre for tisper); som andre middels store hunder er den fullvoksen ved ca. 12–15 måneder (PetMD).",
        "The Royal Kennel Club anbefaler opptil en time mosjon om dagen, sier at rasen passer i et lite hus, trenger pelsstell hver dag og ikke røyter. En stor britisk studie (McMillan 2024, via Dogs Trust) oppgir en median forventet levealder på 13,7 år; PetMD og VCA oppgir 12–14 år. PDSA kaller dem vennlige, pålitelige hunder som er flotte familiehunder, selv om de kan være litt sta. VCA skriver at det milde, lekne gemyttet gjør dem godt egnet for barn; PetMD sier at samvær med barn bør skje under tilsyn, at de ikke liker å være alene i lange perioder, og anbefaler profesjonelt pelsstell hver fjerde til sjette uke, bad omtrent én gang i måneden og rengjøring av ørene hver eller annenhver uke.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "ulvehund, Irish Wolfhound, Cú Faoil",
      text: [
        "Irsk ulvehund kommer fra Irland; FCI fører den blant de strihårede myndene. PDSA oppgir en gjennomsnittlig høyde på 71–79 cm og en gjennomsnittlig vekt på 40–55 kg; som andre kjempehunder er den fullvoksen ved ca. 18–24 måneder (PetMD). The Royal Kennel Club kaller størrelsen ekstra stor og sier at den passer i et stort hus med stor hage på landet.",
        "The Royal Kennel Club mener rasen trenger mer enn to timer mosjon daglig og pelsstell mer enn én gang i uken, og sier at rasen røyter. The Kennel Club og PDSA oppgir en levetid på under ti år; PetMD oppgir 6–8 år. PDSA anbefaler ikke rasen i hjem med mindre barn på grunn av størrelsen og styrken, og heller ikke sammen med mindre kjæledyr på grunn av det sterke jaktinstinktet, og sier at den aldri bør være alene i mer enn fire timer. PetMD anbefaler å sosialisere valpen fra den dagen den kommer hjem, ingen mosjon rett før eller rett etter måltid (magedreining) og rengjøring av ørene hver andre til fjerde uke.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaff, Am Staff, American Staffordshire Terrier",
      text: [
        "Amerikansk staffordshire terrier kommer fra USA; FCI fører den blant terriere av bulltype. Standarden ber om stor styrke i forhold til størrelsen og oppgir en høyde på 46–48 cm for hanner og 43–46 cm for tisper, men ingen vekt. PetMD oppgir 40–70 pund (ca. 18–32 kg) for begge kjønn; en hund av denne størrelsen er fullvoksen ved ca. 12–15 måneder (PetMD).",
        "PetMD anbefaler minst 60 minutter mosjon om dagen, sier at rasen er tålmodig og kjærlig med barn, at den kan være utsatt for separasjonsangst, og at det sterke jaktinstinktet kan gjøre livet med mindre hunder eller katter vanskeligere. En britisk studie (McMillan mfl., 2024, i tabellen fra Dogs Trust) oppgir en median forventet levealder på 12,5 år; PetMD oppgir 12–16 år. VCA anbefaler ukentlig børsting; PetMD anbefaler å sosialisere valpen, ingen mosjon rett etter et måltid (magedreining), og bad og rengjøring av ørene omtrent hver fjerde til sjette uke.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, Lagotti, Romagna Water Dog, trøffelhund",
      text: [
        "Lagotto romagnolo er en liten til middels stor krøllhåret vannhund fra Italia, kjent som trøffelhunden; FCI fører den blant vannhundene. Standarden oppgir en høyde på 43–48 cm og en vekt på 13–16 kg for hanner, og 41–46 cm og 11–14 kg for tisper; en hund av denne størrelsen er fullvoksen ved ca. 12–15 måneder (PetMD).",
        "The Royal Kennel Club kaller den en utmerket og våken familiehund, anbefaler mer enn to timer mosjon om dagen og pelsstell mer enn én gang i uken, sier at den ikke røyter, og oppgir en levetid på over 12 år; PetMD skriver at lagottoer kan bli 15–17 år. PetMD nevner at den trenger stadig mental og fysisk stimulering og grundig sosialisering, fordi den kan være sky; Woodgreen sier at den kan slite når den er alene for ofte, og anbefaler profesjonelt pelsstell hver sjette til åttende uke.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamute, Mal, Alaskan Mal",
      text: [
        "Alaskan malamute er en av de eldste arktiske sledehundene: en kraftig, solid bygd nordisk sledehund fra USA med tykk, grov pels. FCI-standarden oppgir ønsket størrelse på 63,5 cm og 38 kg for hanner og 58,5 cm og 34 kg for tisper; PDSA oppgir 58–64 cm og 34–39 kg. Hunder av denne størrelsen er som regel fullvoksne ved ca. 15–18 måneder (PetMD), og PDSA oppgir en levetid på over ti år (PetMD: 10–14 år).",
        "PDSA anbefaler minst to timer krevende mosjon og børsting hver dag, og sier at malamuter røyter mye, har svært sterkt jaktinstinkt, ikke bør være alene i mer enn fire timer og passer for aktive voksne eller familier med eldre barn; PDSA kaller dem krevende for førstegangseiere. PetMD anbefaler å sjekke ørene én gang i uken og bad hver sjette til åttende uke, og nevner at den tykke pelsen gjør varmt vær vanskelig for dem.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "African Barkless Dog, Congo Dog, kongohund",
      text: [
        "Basenji er en lett bygd jakthund med fin benbygning fra Sentral-Afrika som ikke bjeffer, men lager sin egen jodlelyd; FCI fører den blant hundene av urtype. PDSA oppgir en høyde på 40–43 cm og en vekt på 9–11 kg. Den er vanligvis fullvoksen ved ca. 9–12 måneder (PetMD), og PDSA oppgir en levetid på over 12 år (WebMD: 13–14 år).",
        "PDSA anbefaler minst en time mosjon om dagen (rundt 60–90 minutter), mye mental stimulering og børsting én gang i uken; PDSA kaller basenjier reserverte, men pålitelige, viljesterke og med svært dårlig trafikkforståelse. WebMD skriver at de jager alt som ser ut som et byttedyr, trenger svært høye gjerder eller konstant tilsyn og bare er middels gode med små barn, og anbefaler å rengjøre ørene hver uke og pusse tennene minst to ganger i uken.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Shorthair, British Blue",
      text: [
        "Britisk korthår er en robust katt med tett pels og store, runde øyne – CFA kaller den en «teddybjørn»-katt. De fleste ser den for seg i blågrått, men den finnes i en rekke farger og mønstre. Den modnes langsomt: CFA sier at den når full størrelse ved ca. tre år, og VCA skriver at den fysiske modningen kan ta opptil fem år.",
        "CFA beskriver den som svært kjærlig og knyttet til menneskene sine; den kommer overens med alle i husstanden uansett alder, men liker som regel ikke å bli båret, og den har levd sammen med hunder, kaniner og fugler. VCA beskriver et moderat aktivitetsnivå og anbefaler å kjemme pelsen minst én gang i uken. Kattunger med stamtavle flytter som regel til sitt nye hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA beskriver ragdoll som en stor, avslappet katt med halvlang, plysjaktig og silkeaktig pels og blå øyne. De mørkere «pointene» finnes i flere mønstre – colourpoint uten hvitt, mitted med hvite poter, bicolour med mer hvitt, og van. Den modnes langsomt: den får sin endelige pelsfarge ved to år og full størrelse og vekt ved ca. fire år.",
        "CFA beskriver en mild katt som møter deg i døren og følger deg fra rom til rom, og som vanligvis leker uten å bruke klørne. PetMD kaller den et godt valg for familier, også familier med barn, men anbefaler langsomme introduksjoner under tilsyn til barn og andre kjæledyr, og sier at noen ragdoller bare trenger kjemming én eller to ganger i uken, mens CFA anbefaler jevnlig kjemming. Kattunger med stamtavle flytter som regel til et nytt hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibirsk katt, sibirsk skogkatt, Siberian Forest Cat",
      text: [
        "GCCF beskriver sibirkatten som en katt som utvikler seg langsomt, med tykk, værbestandig pels: tett, myk underull under grovere dekkhår, som røyter kraftig om våren og høsten. Hanner veier ca. 7,7–11,8 kg og hunner 5,9–7,7 kg, full utvikling kan ta fire til fem år, og GCCF oppgir en levetid på 12 til 15 år eller mer.",
        "GCCF kaller den energisk og leken, men likevel tålmodig – et godt valg for familier med små barn – og sier at den kommer godt overens med andre dyr, også hunder. PetMD anbefaler kjemming minst én gang i uken, med ekstra innsats mens den røyter om våren og høsten, og nevner at sibirkatter ikke regnes som allergivennlige. Kattunger med stamtavle flytter som regel til sitt nye hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine Coon cat",
      text: [
        "Maine coon regnes bredt som en av de største tamkattrasene, med muskuløs, rektangulær kropp, bredt bryst, store poter og en lang, flytende hale. TICA oppgir en gjennomsnittsvekt på ca. 5,9–8,2 kg for voksne hanner og 4,1–5,9 kg for hunner, og CFA nevner at noen hanner veier mer enn 9 kg. Den vokser langsomt: ifølge CFA er den ofte ikke ferdig utviklet før den er tre eller fire år, og TICA sier at full modenhet kan ta tre til fem år.",
        "TICA beskriver den som mild, vennlig og leken, CFA som sosial, lojal og intelligent; den «snakker» ofte med en kvitrende trille i stedet for et mjau. Vetstreet skriver at maine coon-katter kommer overens med alle, også barn, hunder og andre katter. Den tunge, halvlange pelsen er kortere på skuldrene og lengre på kragen, magen og bakparten. Kildene er uenige om pelsstellet: Vetstreet skriver at ukentlig kjemming er nok, CFA anbefaler børsting eller kjemming minst et par ganger i uken, og TICA nevner at en tykkere pels kan trenge daglig kjemming. Kattunger med stamtavle flytter som regel til sitt nye hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalkatt, Bengal cat",
      text: [
        "PDSA beskriver bengal som svært intelligent og energisk, en katt som trenger mye mental stimulering og muligheter til å bevege seg, og som liker et høyt utsiktspunkt som et kattetre. Den er kjærlig, men legger seg heller ved siden av deg enn på fanget ditt, og kan bruke stemmen ganske mye. VCA nevner at bengaler vokser langsomt og kan bruke opptil to år på å bli fysisk voksne.",
        "Den korte, myke, flekkete eller marmorerte pelsen trenger bare en lett børsting eller kjemming én gang i uken (PDSA). PetMD nevner at bengal kanskje ikke passer best for familier med små barn, mens hunder og andre katter kan gå fint med riktig introduksjon. Rasen ble utviklet fra krysninger mellom asiatisk leopardkatt og tamkatter; PetPrep viser bare den registrerte tamme bengalen. Kattunger med stamtavle flytter som regel til sitt nye hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "skogkatt, Wegie, Norwegian Forest Cat",
      text: [
        "GCCF beskriver norsk skogkatt som mild og vennlig, en katt som liker å være en del av en familie. Den modnes langsomt og regnes ikke som fullt utvokst før ved ca. fire til fem år; hanner veier ca. 5,4–7,3 kg og hunner 4,1–5,4 kg, og GCCF oppgir en levetid på 14 til 16 år.",
        "Den har mye energi, liker interaktive leker og klatrer gjerne; GCCF sier at den er tolerant overfor barn som viser respekt, andre katter og kattevennlige hunder. PetMD anbefaler kjemming og børsting minst én gang i uken, oftere mens den røyter om våren og høsten, og nevner at separasjonsangst kan være et problem hvis den ofte er alene i lange perioder. Kattunger med stamtavle flytter som regel til sitt nye hjem ved 12–13 uker (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default nb;
