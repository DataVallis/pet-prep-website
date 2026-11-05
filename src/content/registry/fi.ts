import type { RegistryCopy } from "./types";

/**
 * Finnish number agreement: a numeral takes the singular partitive ("3 rotua", "2 tuntia", "1,5 tuntia");
 * only exactly 1 takes the nominative singular ("1 rotu", "1 tunti").
 */
const s = (n: number, one: string, other: string) => (n === 1 ? one : other);
/** Non-breaking space between a number and its unit ("5 kg", "15 %"). */
const NB = " ";
/** Lower case for values that continue a phrase ("Koirat" → "koirat", "Yli 2 tuntia" → "yli 2 tuntia"). */
const lc = (t: string) => t.toLocaleLowerCase("fi");
const cap = (t: string) => t.charAt(0).toLocaleUpperCase("fi") + t.slice(1);
/**
 * Breed names are common nouns in Finnish and are written in lower case in running text
 * ("labradorinnoutaja", "bordercollie", "maine coon"); words with an inner capital or all capitals
 * (abbreviations) are kept as they are. A name keeps its capital only at the start of a sentence or label.
 * Templates keep the inserted name in the nominative ("X – …", "Kenelle X sopii?") so it never needs a case ending.
 */
const mid = (name: string) => name.replace(/\p{L}+/gu, (w) => (/^\p{Lu}[\p{Ll}]*$/u.test(w) ? lc(w) : w));
/** "Koirat" → "koira", "Kissat" → "kissa" (compound stem: koirarotu, kissarotu); other species → null. */
const kindOf = (many: string) => {
  const m = lc(many);
  return m.startsWith("koira") ? "koira" : m.startsWith("kissa") ? "kissa" : null;
};
const ROTU = { nom: "rotu", part: "rotua", nomPl: "rodut", partPl: "rotuja" } as const;
/** "koirarotua", "kissarodut"; other species: "rotuja (linnut)". */
const breedsOf = (many: string, form: keyof typeof ROTU) => {
  const k = kindOf(many);
  return k ? `${k}${ROTU[form]}` : `${ROTU[form]} (${lc(many)})`;
};
/** Allative plural of the species for "Yleisiä ohjeita koirille". */
const ALLATIVE: Record<string, string> = { koira: "koirille", kissa: "kissoille" };
/** Finnish ordinal: 1., 2., 7. */
const ord = (n: number) => `${n}.`;
/** "11:00" → "11.00" (Finnish clock times). */
const clock = (t: unknown) => String(t).replace(":", ".");
/** Genitive of a formatted unit noun ("12 kuukautta" → "12 kuukauden") for "… ikään asti", "… välein". */
const GEN: Record<string, string> = {
  päivä: "päivän",
  päivää: "päivän",
  viikko: "viikon",
  viikkoa: "viikon",
  kuukausi: "kuukauden",
  kuukautta: "kuukauden",
  vuosi: "vuoden",
  vuotta: "vuoden",
  tunti: "tunnin",
  tuntia: "tunnin",
};
const gen = (t: string) => {
  const m = /^(.*\S)[\s ](\p{L}+)$/u.exec(t);
  const g = m ? GEN[m[2]] : undefined;
  return m && g ? { num: m[1], noun: g, one: m[1] === "1" ? m[2] : null } : null;
};
/** "7 päivää" → "7 päivän välein", "1 päivä" → "joka päivä". */
const every = (t: string) => {
  const g = gen(t);
  if (!g) return `${t} välein`;
  if (g.one) return `joka ${g.one}`;
  return `${g.num}${NB}${g.noun} välein`;
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as Suomen Kennelliitto writes them. */
const fciGroups: Record<number, string> = {
  1: "Lammas- ja karjakoirat (paitsi sveitsinpaimenkoirat)",
  2: "Pinserit ja snautserit, molossit, sveitsinpaimenkoirat ja muut rodut",
  3: "Terrierit",
  4: "Mäyräkoirat",
  5: "Pystykorvat ja alkukantaiset koirat",
  6: "Ajavat koirat, verijäljeskoirat ja muut rodut",
  7: "Kanakoirat",
  8: "Noutajat, ylösajavat koirat ja vesikoirat",
  9: "Seura- ja kääpiökoirat",
  10: "Vinttikoirat",
};
const origins: Record<string, string> = { GB: "Iso-Britannia", FR: "Ranska", DE: "Saksa", US: "Yhdysvallat", CU: "Kuuba", CH: "Sveitsi", IT: "Italia", "CN-XZ": "Tiibet (Kiina)", CN: "Kiina", MX: "Meksiko", BE: "Belgia", HU: "Unkari", JP: "Japani", ZA: "Etelä-Afrikka", "BE-FR": "Belgia / Ranska", PT: "Portugali", CA: "Kanada", HR: "Kroatia", AU: "Australia", RU: "Venäjä", IE: "Irlanti", "AF-C": "Keski-Afrikka", TR: "Turkki", MG: "Madagaskar" };
const hours = (n: number) => s(n, "tunti", "tuntia");
/** "kerran", "2 kertaa" (adverbial: kerran päivässä, 3 kertaa viikossa). */
const times = (n: number) => (n === 1 ? "kerran" : `${n}${NB}kertaa`);

const fi: RegistryCopy = {
  mistakes: {
    title: (breed) => `${breed}: omistajien yleisiä virheitä`,
    intro: "Pieniä tapoja, jotka aiheuttavat isompia ongelmia – jokainen kohta perustuu tämän rodun lähteisiin.",
    exercise: "Liian vähän liikuntaa päivittäin",
    exerciseText: (amount) => `Liikunnan tarve: ${amount}. Suunnittele liikunta jokaiseen päivään, ei vain viikonloppuihin.`,
    coat: "Turkinhoidon laiminlyönti",
    coatText: (brushing, shedding) => `Harjaus: ${brushing}.${shedding ? ` ${cap(shedding)}.` : ""}`,
    weight: "Liikaa herkkuja ja liian suuria aterioita",
    heat: "Lenkit helteellä",
    growth: "Unohdetaan, että pentu kasvaa vielä",
    growthText: (growthEnd) =>
      `Kasvuaika: ${growthEnd}. Siihen asti suunnittele liikunta ja ruoka nuorelle, vielä kasvavalle eläimelle ja kysy eläinlääkäriltä, mikä sopii juuri sinun lemmikillesi.`,
    mind: "Liian vähän tekemistä aivoille",
    health: "Rodun tunnettujen terveysongelmien sivuuttaminen",
    practise: "PetPrepissä lapsi harjoittelee juuri näitä tapoja – askelia, aterioita ja hoitoa – ennen kuin oikea lemmikki muuttaa kotiin.",
  },
  hub: {
    title: "Tutustu eläimeen ennen kuin se muuttaa kotiin.",
    intro:
      "Mitä kukin PetPrepin eläinlaji ja rotu todella tarvitsee – tiedot kennelliitoilta, kissajärjestöiltä, eläinten hyvinvointijärjestöiltä ja tutkimuksista, ja jokaiseen lähteeseen on linkki. Lisäksi säännöt, joilla PetPrep sitä simuloi.",
    breedCount: (n) => `${n}${NB}${s(n, "rotu", "rotua")} hakemistossa`,
    open: "Katso rodut",
    openA11y: (many) => `Katso rodut: ${lc(many)}`,
    freePlan: (name, activity) => `Ilmaisversio: ${lc(name)} (aikuisena ${activity}). Sillä ei ole omaa rotusivua.`,
    otherSpecies: "Lisää eläimiä on suunnitteilla.",
    methodTitle: "Näin kokoamme hakemiston",
    method: [
      "Jokainen tieto on peräisin nimetystä lähteestä – kennelliitoilta, kissajärjestöiltä, eläinten hyvinvointijärjestöiltä, eläinlääkäriyhdistyksiltä ja vertaisarvioiduista tutkimuksista – ja siihen on linkki. Rotumääritelmät kerromme omin sanoin.",
      "Arvoja, joita mikään lähde ei tue, ei koskaan näytetä faktoina. Kun PetPrepin on valittava luku peliä varten, se näkyy vain kohdassa ”Näin PetPrep sitä simuloi” ja on merkitty pelisäännöksi.",
      "Samat tiedot ohjaavat sovellusta: näiden sivujen tunnisteet, aterioiden määrät, askeltavoitteet ja leikkihetket ovat juuri ne, joita sovelluksen lemmikki käyttää.",
      "Tämä hakemisto ei ole eläinlääkärin neuvontaa. Terveystiedot ovat vain suuntaa antavia, eikä eläinlääkäri ole tarkistanut niitä.",
    ],
  },
  speciesStatus: { available: "Sovelluksessa", coming_soon: "Tulossa sovellukseen", info_only: "Vain tietoa" },
  availability: {
    in_app: { label: "Sovelluksessa", text: "Mukana PetPrepin 12 viikon haasteessa (maksullinen rotu)." },
    coming_soon: { label: "Tulossa sovellukseen", text: "Valmis ja testattu; tulee sovellukseen jonkin tulevan version mukana." },
    info_only: { label: "Vain tietoa", text: "Hakemistossa tiedoksi; sitä ei voi vielä adoptoida sovelluksessa." },
  },
  catalogue: {
    eyebrow: "Eläinhakemisto",
    title: (many) => `${many}: rodut hakemistossa`,
    lead: (many, count) =>
      count === 1
        ? `1${NB}${breedsOf(many, "nom")}, jonka tarpeet perustuvat lähteisiin – lisäksi kenelle se sopii ja miten PetPrep sitä simuloi. Hae, suodata ja vertaa enintään kolmea rotua.`
        : `${count}${NB}${breedsOf(many, "part")}, joiden tarpeet perustuvat lähteisiin – lisäksi kenelle ne sopivat ja miten PetPrep niitä simuloi. Hae, suodata ja vertaa enintään kolmea rotua.`,
    metaTitle: (many) => `${cap(breedsOf(many, "nomPl"))} – rotuhakemisto lähteineen | PetPrep`,
    metaDescription: (many) =>
      `Hae ja vertaa ${breedsOf(many, "partPl")} tarpeiden, koon ja sopivuuden mukaan. Jokaisesta tiedosta on linkki lähteeseen – lisäksi säännöt, joilla PetPrep simuloi kunkin rodun.`,
    searchLabel: "Hae rotuja",
    searchPlaceholder: "Nimi, esim. labradorinnoutaja",
    filtersTitle: "Suodattimet",
    any: "Kaikki",
    availabilityLabel: "PetPrepissä",
    sortLabel: "Järjestys",
    sort: { recommended: "Sovelluksessa olevat ensin", az: "A–Ö", size: "Koko (pienestä suureen)" },
    clear: "Tyhjennä kaikki",
    results: (total) => `{n}/${total} rotua`,
    none: "Mikään rotu ei vastaa hakua. Kokeile vähemmillä suodattimilla.",
    loading: "Haku latautuu…",
    page: "Sivu {n}/{total}",
    prev: "Edellinen",
    next: "Seuraava",
    compareAdd: "Vertaa: {name}",
    compareBar: "{n}/{max} valittu vertailuun",
    compareGo: "Vertaa",
    compareMax: "Voit verrata enintään {max} rotua.",
    azTitle: "Kaikki rodut A–Ö",
    azIntro: "Kaikki hakemiston rodut aakkosjärjestyksessä.",
    freePlanTitle: "Ilmaisversio",
    guideTitle: "Näin valitset rodun",
    guide: () => [
      "Aloita siitä, mitä kotitaloutesi pystyy antamaan joka päivä: aikaa liikuntaan ja turkinhoitoon sekä tilaa. Jokaisella rotusivulla nämä tarpeet näkyvät yhdellä silmäyksellä, ja jokaisen arvon lähde on nimetty; kun lähteet ovat eri mieltä, kaikki arvot näytetään.",
      "Kun rodulla on kokoluokka (koirilla erittäin pieni, pieni, keskikokoinen, keskikokoinen–suuri, suuri tai jättiläiskokoinen), se on nimetyn lähteen – yleensä kennelliiton – ilmoittama luokka, ja painot ovat lähteiden ilmoittamia vaihteluvälejä, eivät meidän arvioitamme.",
      "Tunnisteet, kuten ”Sopii: aktiiviselle perheelle”, ovat samat kuin sovelluksessa, ja jokainen perustuu lähteisiin. Kohdan ”Näin PetPrep sitä simuloi” luvut ovat PetPrepin pelisääntöjä, eivät hoito-ohjeita. [Näin kokoamme hakemiston](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Vertaa ${breedsOf(many, "partPl")}`,
    metaTitle: (many) => `Vertaa ${breedsOf(many, "partPl")} | PetPrepin eläinhakemisto`,
    intro: "Tärkeimmät tarpeet rinnakkain, samoista lähteistä kuin rotusivuilla.",
    pick: "Valitse luettelosta kaksi tai kolme rotua vertaillaksesi niitä.",
    back: "Takaisin luetteloon",
    remove: "Poista: {name}",
    note: "Arvot on esitetty niin kuin nimetty lähde ne ilmoittaa. Kun lähteet ovat eri mieltä, rotusivulla näytetään jokainen arvo.",
    availabilityRow: "PetPrepissä",
    activityRow: "Aikuisen päivätavoite PetPrepissä (pelisääntö)",
  },
  facets: {
    size: {
      label: "Koko",
      values: { toy: "Erittäin pieni", small: "Pieni", small_medium: "Pieni–keskikokoinen", medium: "Keskikokoinen", medium_large: "Keskikokoinen–suuri", large: "Suuri", giant: "Jättiläiskokoinen" },
    },
    exercise: { label: "Päivittäinen liikunta", values: { under_1h: "Enintään 1 tunti", h1_2: "1–2 tuntia", over_2h: "Yli 2 tuntia" }, line: (v) => `${lc(v)} päivässä` },
    grooming: {
      label: "Harjaus",
      values: { weekly: "Kerran viikossa", several_weekly: "Useita kertoja viikossa", daily: "Päivittäin", other: "Muu" },
      line: (v) => `harjaus: ${lc(v)}`,
    },
  },
  groups: {
    exercise: "Liikunta",
    play: "Leikki",
    litter: "Hiekkalaatikko",
    scratching: "Raapiminen",
    grooming: "Turkki ja turkinhoito",
    feeding: "Ateriat",
    water: "Vesi",
    lifespan: "Elinikä",
    stages: "Elämänvaiheet",
    size: "Koko ja paino",
    training: "Koulutus",
  },
  fields: {
    size: "Koko",
    height: "Säkäkorkeus",
    weight: "Aikuisen paino",
    growth_end: "Kasvuaika",
    lifespan: "Elinikä",
    exercise: "Päivittäinen liikunta",
    coat: "Turkki",
    grooming_frequency: "Harjaus",
    grooming_level: "Turkinhoidon tarve",
    shedding: "Karvanlähtö",
    litter_scoop: "Poista jätökset hiekasta",
    litter_full_change: "Vaihda kaikki hiekka",
    litter_pee: "Virtsaa (aikuinen)",
    litter_poo: "Ulostaa (aikuinen)",
    water_need: "Veden tarve",
    sleep: "Uni (aikuinen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 viikkoa",
    puppy_3_6_months: "3–6 kuukautta",
    puppy_6_12_months: "6–12 kuukautta",
    kitten_6_12_weeks: "6–12 viikkoa",
    kitten_3_6_months: "3–6 kuukautta",
    kitten_6_12_months: "6–12 kuukautta",
    puppy: "Pentu",
    kitten: "Kissanpentu",
    young_adult: "Nuori aikuinen",
    mature_adult: "Varttunut aikuinen",
    adult: "Aikuinen",
    senior: "Seniori",
  },
  categories: {
    size: { toy: "erittäin pieni", small: "pieni", small_medium: "pieni–keskikokoinen", medium: "keskikokoinen", medium_large: "keskikokoinen–suuri", large: "suuri", giant: "jättiläiskokoinen" },
    coat: { moderately_long: "puolipitkä", smooth: "sileä (lyhyt)", short: "lyhyt", medium: "keskipitkä", short_long: "lyhyt tai pitkä (kaksi karvanlaatua)", long: "pitkä" },
    grooming_frequency: {
      at_least_once_a_week: "vähintään kerran viikossa",
      at_least_once_or_twice_a_week: "vähintään kerran tai kaksi viikossa",
      once_a_week: "kerran viikossa",
      more_than_once_a_week: "useammin kuin kerran viikossa",
      daily: "päivittäin",
      every_day: "joka päivä",
    },
    // "Turkinhoidon tarve: kohtalainen / suuri / vähäinen"
    grooming_level: { moderate: "kohtalainen", high: "suuri", low: "vähäinen" },
    // Also used as a sentence after "Harjaus: …." in the owner-mistakes block.
    shedding: {
      yes: "karvaa lähtee",
      no: "karvaa ei lähde (se ei tarkoita samaa kuin allergiaystävällinen)",
      high: "karvaa lähtee runsaasti",
      moderate: "karvaa lähtee kohtalaisesti",
      low: "karvaa lähtee vähän",
      minimal: "karvaa lähtee hyvin vähän",
    },
  },
  statements: {
    food_motivated: () => "Erittäin ruokamotivoitunut – siitä on apua koulutuksessa, mutta pidä annokset kurissa.",
    coren_rank: (v) => `Sijalla ${String(v)} Stanley Corenin työ- ja tottelevaisuusälykkyyden listalla.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-rotumääritelmä nro ${x.number}, ryhmä ${x.group}: ${lc(fciGroups[x.group] ?? "—")}; alkuperämaa: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Leikki: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])}${NB}leikkihetkeä päivässä, kukin ${f.num(x.minutes[0])}–${f.num(x.minutes[1])}${NB}minuuttia.`;
    },
    kittens_play_more: () => "Kissanpentujen täytyy leikkiä useammin.",
    scratching_natural: () => "Raapiminen on luonnollista ja välttämätöntä: hanki raapimapuu äläkä koskaan rankaise raapimisesta.",
    water_fresh: () => "Raikasta vettä aina saatavilla; pese kuppi ja täytä se joka päivä.",
    grooming_sources_differ: () => "Lähteet ovat eri mieltä kampaamisesta: suositukset vaihtelevat päivittäisestä kerran viikossa tehtävään.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediaani ${t}`,
    more_than: (t) => `yli ${t}`,
    less_than: (t) => `alle ${t}`,
    at_least: (t) => `vähintään ${t}`,
    up_to: (t) => `enintään ${t}`,
    ideal: (t) => `ihanne (rotumääritelmä): ${t}`,
    mean: (t) => `mitattu keskiarvo: ${t}`,
    about: (t) => `noin ${t}`,
    until: (t) => {
      const g = gen(t);
      return g ? `${g.num}${NB}${g.noun} ikään asti` : `${t} asti`;
    },
    until_about: (t) => {
      const g = gen(t);
      return g ? `noin ${g.num}${NB}${g.noun} ikään asti` : `noin ${t} asti`;
    },
    span: (t) => t,
    from: (t) => {
      const g = gen(t);
      return g ? `${g.num}${NB}${g.noun} iästä alkaen` : `${t} alkaen`;
    },
    last: (t) => {
      const g = gen(t);
      return g?.one ? `viimeinen ${g.one}` : `viimeiset ${t}`;
    },
    every: (t) => every(t),
    expectancy: (t) => `elinajanodote syntymähetkellä ${t}`,
    smaller_meals: (t) => `${t}, pienempinä annoksina`,
  },
  units: {
    cm: (t) => `${t}${NB}cm`,
    kg: (t) => `${t}${NB}kg`,
    years: (t, n) => `${t}${NB}${s(n, "vuosi", "vuotta")}`,
    months: (t, n) => `${t}${NB}${s(n, "kuukausi", "kuukautta")}`,
    days: (t, n) => `${t}${NB}${s(n, "päivä", "päivää")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)}${NB}${hours(n / 60)} päivässä` : `${t}${NB}minuuttia päivässä`),
    meals_per_day: (t, n) => `${t}${NB}${s(n, "ateria", "ateriaa")} päivässä`,
    times_per_day: (t, n) => (n === 1 ? "kerran päivässä" : `${t}${NB}kertaa päivässä`),
    hours_per_day: (t, n) => `${t}${NB}${hours(n)} päivässä`,
    ml_per_kg_day: (t) => `${t}${NB}ml painokiloa kohden päivässä`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}${NB}% odotetusta eliniästä`,
  },
  // One word for dogs and cats alike; "naaraat" fits both (dogs' "nartut" would be wrong for cats).
  males: "urokset",
  females: "naaraat",
  or: " tai ",
  notes: { size_class_guidance: "kokoluokan yleisohje" },
  stageLabels: {
    dog: { puppy: "Pentu", young: "Nuori koira", adult: "Aikuinen", senior: "Seniori" },
    cat: { puppy: "Kissanpentu", young: "Nuori kissa", adult: "Varttunut kissa", senior: "Seniori" },
  },
  activity: {
    steps: (n, raw) => `${n}${NB}${s(raw, "askel", "askelta")}`,
    steps_range: (from, to) => `${from} → ${to}${NB}askelta`,
    steps_growing: (perMonth, first, cap, capMonth) =>
      `${perMonth}${NB}askelta ikäkuukautta kohden (saapumishetkellä ${first}), ${ord(capMonth)} ikäkuukaudesta alkaen enintään ${cap}`,
    play_sessions: (n) => `${n}${NB}${s(n, "leikkihetki", "leikkihetkeä")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Askeltavoite = päivittäisen liikunnan minuutit × ${p.per_minute}${NB}askelta: aikuisen liikunnan määrä on ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)}${NB}${hours(p.minutes / 60)}` : `${p.minutes}${NB}minuuttia`}, joten tavoite on ${f.num(p.steps)}${NB}askelta päivässä.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Oppii käskyt hitaammin kuin ilmaisversion sekarotuinen koira (${f.num(p.multiplier)}-kertaisella nopeudella).`
        : p.multiplier === 1
          ? "Oppii käskyt yhtä nopeasti kuin ilmaisversion sekarotuinen koira."
          : `Oppii käskyt ${f.num(p.multiplier)} kertaa niin nopeasti kuin ilmaisversion sekarotuinen koira.`,
    senior_share: (p, f) =>
      `Siirtyy senioriksi ${ord(p.months)} ikäkuukautena (${f.num(p.months / 12, 1)}${NB}${s(p.months / 12, "vuosi", "vuotta")}) – siitä alkaa rodun odotetun eliniän viimeinen neljännes.`,
    walk_sensor: () =>
      "Lenkeillä lasketaan oikeat askeleet Apple Terveys- tai Health Connect -sovelluksesta (luvallasi, vain lukuoikeus) sekä puhelimen liikeanturista – ei GPS:ää.",
    play_instead_of_steps: (p, f) =>
      `Ei lenkkejä: aikuinen kissa tarvitsee ${p.sessions}${NB}${s(p.sessions, "leikkihetken", "leikkihetkeä")} päivässä kissanongella, vähintään ${f.num(p.gap_minutes / 60)}${NB}tunnin välein.`,
    litter_rule: (p) =>
      `Hiekkalaatikko: aikuinen kissa käyttää sitä ${times(p.uses)} päivässä; jätökset poistetaan jokaisen käynnin jälkeen ${p.scoop_hours}${NB}tunnin kuluessa (hiljaisten tuntien ulkopuolella), ja kaikki hiekka vaihdetaan ${p.change_days === 7 ? "kerran viikossa" : p.change_days === 1 ? "joka päivä" : `${p.change_days}${NB}päivän välein`}.`,
    scratching_after_missed_play: () => "Jos kissa on leikkinyt päivän aikana liian vähän, se raapii kerran jotakin; lapsi kantaa sen raapimapuulle.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kampaaminen kerran viikossa." : p.per_week === 2 ? "Kampaaminen kahdesti viikossa." : `Kampaaminen ${p.per_week}${NB}kertaa viikossa.`),
    no_walk_in_heat: (p) =>
      `Kesällä (kesä–elokuussa; eteläisellä pallonpuoliskolla joulu–helmikuussa) lapsen näkymä ja lenkkinäkymä näyttävät rauhallisen muistutuksen klo ${clock(p.from)}–${clock(p.to)} (perheen paikallista aikaa): ei lenkkejä helteellä. Ei säätietoja eikä rangaistusta – askeleet lasketaan silti.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "ihopoimujen puhdistus",
        tooth_brushing: "hampaiden harjaus",
        ear_cleaning: "korvien tarkistus ja puhdistus",
        nail_trim: "kynsien leikkaus",
        bath: "kylpy",
        groomer_visit: "käynti trimmaajalla",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "joka päivä"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "kerran viikossa"
              : `${weeks}${NB}viikon välein`
            : q.period_days === 7
              ? `${times(q.times)} viikossa`
              : q.period_days === 1
                ? `${times(q.times)} päivässä`
                : `${times(q.times)} ${q.period_days}${NB}päivän aikana`;
      const who = q.actor === "parent" ? "muistutus vanhemmalle" : "tehtävä lapselle";
      return `Hoito: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Katso pentu ja sen emä paikassa, jossa pentu on syntynyt.",
      min_age_puppy: "Pennun ei pitäisi lähteä emänsä luota ennen 8 viikon ikää.",
      pedigree_fci: "Pyydä nähtäväksi sukutaulu. FCI:n sääntöjen mukaan sukutaulun saa myöntää vain, kun polveutuminen on oikein todettu.",
      parents_health_tests: "Pyydä nähtäväksi molempien vanhempien terveystutkimusten tulokset. Se, mitkä tutkimukset ovat tärkeitä, riippuu rodusta.",
      breed_club_rules: "Kansalliset kennelliitot voivat asettaa jalostukselle FCI:n sääntöjä tiukempia vaatimuksia – kysy rotujärjestöltä, mitä tutkimuksia vanhemmilta edellytetään.",
      written_contract: "Pyydä kirjallinen kauppasopimus, johon on kirjattu pennun tausta ja terveys.",
      kitten_see_mother: "Katso kissanpentu ja sen emä paikassa, jossa pennut asuvat.",
      kitten_min_age: "FIFen rekisteröintisääntöjen mukaan kissanpentu ei muuta uuteen kotiin ennen 14 viikon ikää.",
      kitten_vaccination: "Kissanpentu on täysin rokotettu (kissarutto, kalikivirus, herpesvirus), ja mukana on rokotustodistus.",
      kitten_pedigree: "Rotukissanpennun mukana tulee sukutaulu, jossa on vähintään kolme sukupolvea.",
      kitten_parents_tests: "Kysy, onko kummallakaan vanhemmalla ollut terveysongelmia, jotka voisivat periytyä pennulle.",
    },
    tests: {
      dna_poag_pll: "DNA-testi: primaarinen avokulmaglaukooma ja primaarinen linssiluksaatio (POAG/PLL) – perinnöllisiä silmäsairauksia, jotka voivat johtaa sokeuteen",
      hip_scheme: "Lonkkien röntgenkuvaus lonkkaniveldysplasian varalta (Iso-Britannia: BVA/KC-ohjelma)",
      elbow_scheme: "Kyynärnivelten röntgenkuvaus kyynärniveldysplasian varalta (Iso-Britannia: BVA/KC-ohjelma)",
      eye_scheme: "Silmätutkimus silmäsairauksiin perehtyneellä eläinlääkärillä (Iso-Britannia: BVA/KC/ISDS-ohjelma; joillakin roduilla myös gonioskopia)",
      heart_scheme: "Sydäntutkimus mitraaliläppäsairauden varalta",
      boas_grading: "Hengitystesti brakykefaalisen obstruktiivisen hengitystieoireyhtymän varalta (BOAS-luokitus)",
      ivdd_screening: "Selän tutkimus välilevysairauden (IVDD) varalta",
      hearing_baer: "Kuulotutkimus kuurouden varalta (BAER)",
      cm_sm_mri: "Magneettikuvaus Chiarin kaltaisen epämuodostuman ja syringomyelian varalta (Iso-Britannia: BVA/KC:n CM/SM-ohjelma)",
      inbreeding_coi: "Geneettinen monimuotoisuus – tarkista sukusiitosaste",
      dna_prcd_pra: "DNA-testi: etenevä verkkokalvon surkastuma (prcd-PRA)",
      dna_rcd4_pra: "DNA-testi: etenevä verkkokalvon surkastuma (rcd4)",
      dna_gr_pra2: "DNA-testi: etenevä verkkokalvon surkastuma (GR_PRA2)",
      dna_cnm: "DNA-testi: sentronukleaarinen myopatia (CNM)",
      dna_eic: "DNA-testi: rasituksen aiheuttama kollapsi (EIC)",
      dna_hnpk: "DNA-testi: perinnöllinen nenän parakeratoosi (HNPK)",
      dna_sd2: "DNA-testi: luustodysplasia 2 (SD2)",
      dna_mcd: "DNA-testi: sarveiskalvon makulaarinen dystrofia (MCD)",
      dna_stgd: "DNA-testi: Stargardtin tauti (STGD)",
      dna_cc_de: "DNA-testi: kihara turkki ja kuivasilmäisyys -oireyhtymä (CC/DE)",
      dna_ef: "DNA-testi: episodinen kaatuilu (EF)",
      dna_cea: "DNA-testi: collien silmäpoikkeavuus (CEA/CH)",
      dna_cl: "DNA-testi: seroidilipofuskinoosi (CL)",
      dna_igs: "DNA-testi: Imerslund-Gräsbeckin oireyhtymä (IGS)",
      dna_mdr1: "DNA-testi: lääkeaineyliherkkyys (MDR1)",
      dna_tns: "DNA-testi: perinnöllinen valkosolujen vapautumishäiriö (trapped neutrophil syndrome, TNS)",
      dna_sn: "DNA-testi: sensorinen neuropatia (SN)",
      dna_ggd: "DNA-testi: goniodysgeneesi ja glaukoomariski (GGD)",
      dna_raines: "DNA-testi: Rainen oireyhtymä",
      dna_dm: "DNA-testi: degeneratiivinen myelopatia (DM)",
      dna_de: "DNA-testi: degeneratiivinen enkefalopatia (DE)",
      dna_jadd: "DNA-testi: nuoruusiän Addisonin tauti (JADD)",
      dermoid_sinus_scheme: "Pentujen tarkastus dermoidisinuksen varalta (rotujärjestön ohjelma)",
      dna_jme: "DNA-testi: nuoruusiän myoklooninen epilepsia (JME)",
      dna_je: "DNA-testi: nuoruusiän epilepsia (JE)",
      dna_lsd: "DNA-testi: lysosomaalinen kertymäsairaus (LSD)",
      dna_ampn: "DNA-testi: alaskanmalamuuttien polyneuropatia (AMPN)",
      dna_fanconi: "DNA-testi: Fanconin oireyhtymä (munuaissairaus)",
      dna_pra_bj1: "DNA-testi: basenjien etenevä verkkokalvon surkastuma (PRA-BJ1)",
      thyroid_scheme: "Vanhempien kilpirauhastutkimus",
      dna_pap_pra1: "DNA-testi: papillonien etenevä verkkokalvon surkastuma (Pap-PRA1)",
      dna_nad: "DNA-testi: neuroaksonaalinen dystrofia (NAD)",
      dna_eopra: "DNA-testi: varhain alkava etenevä verkkokalvon surkastuma (EOPRA)",
      dna_cu: "DNA-testi: kystinuria (CU) – perinnöllinen sairaus, joka aiheuttaa munuais- ja virtsakiviä",
      heart_echo_scheme: "Sydämen väridoppler-ultraäänitutkimus (rotujärjestön ohjelma)",
      cardiac_exam: "Vanhempien sydäntutkimus (rotujärjestön suositus)",
      dna_rd_osd: "DNA-testi: verkkokalvon dysplasia / silmä-luustodysplasia (RD/OSD)",
      dna_xlpra1: "DNA-testi: X-kromosomiin kytkeytyvä etenevä verkkokalvon surkastuma (XLPRA1)",
      dna_cmo: "Testi: kraniomandibulaarinen osteopatia (CMO) – perinnöllinen leukaluun sairaus",
      dna_hsf4: "DNA-testi: perinnöllinen harmaakaihi (HSF4)",
      dna_lafora: "DNA-testi: Laforan tauti",
      dna_nccd: "DNA-testi: vastasyntyneiden pikkuaivokuoren rappeuma (NCCD)",
      dna_fviid: "DNA-testi: hyytymistekijä VII:n puutos (FVIID)",
      dna_mls: "DNA-testi: Musladin-Lueken oireyhtymä (MLS)",
      dna_vwd1: "DNA-testi: von Willebrandin tauti, tyyppi 1 (vWD1)",
      dna_mac: "DNA-testi: alttius Mycobacterium avium -kompleksin infektiolle (MAC)",
      dna_imgd: "DNA-testi: tanskandoggien perinnöllinen myopatia (IMGD) – lihaksia surkastuttava sairaus",
      dna_poag: "DNA-testi: primaarinen avokulmaglaukooma (POAG) – perinnöllinen silmäsairaus, joka voi johtaa sokeuteen",
      dna_aon: "DNA-testi: aikuisiällä alkava neuropatia (AON) – perinnöllinen hermosairaus",
      dna_fn: "DNA-testi: familiaalinen nefropatia (FN) – perinnöllinen munuaissairaus",
      patella_scheme: "Polvitutkimus polvilumpion sijoiltaanmenon (patellaluksaation) varalta ennen jalostusta",
      kidney_scheme: "Munuaisten ultraäänitutkimus puuttuvan tai epämuodostuneen munuaisen varalta (rotujärjestön suositus)",
      kidney_upc_scheme: "Virtsatesti (proteiini-kreatiniinisuhde) munuaissairauden varalta (rotujärjestön suositus)",
      dna_gld: "DNA-testi: globoidisoluleukodystrofia (GLD) – perinnöllinen hermosairaus",
      liver_shunt_scheme: "Maksan tutkimus maksasuntin tai mikrovaskulaarisen dysplasian varalta (rotujärjestön suositus)",
      breed_health_scheme: "Vanhempien tutkimukset rotujärjestön terveysohjelman mukaan",
      hemivertebrae_scheme: "Vanhempien selkärangan röntgenkuvaus kiilanikamien (epämuodostuneiden nikamien) varalta 12 kuukauden iän jälkeen",
      dna_hcm_mc: "DNA-testi: hypertrofinen kardiomyopatia (MC HCM)",
      dna_sma: "DNA-testi: spinaalinen lihasatrofia (SMA)",
      dna_pk_def: "DNA-testi: pyruvaattikinaasin puutos (PK def)",
      hcm_negative: "Jalostuskissojen on oltava HCM-negatiivisia (sydänsairaus: hypertrofinen kardiomyopatia)",
      dna_gsd4: "DNA-testi: glykogeenin kertymäsairaus tyyppi IV (GSD IV)",
      dna_pra_b: "DNA-testi: bengalien etenevä verkkokalvon surkastuma (PRA-b)",
      dna_jlpp: "DNA-testi: nuoruusiän kurkunpään halvaus ja polyneuropatia (JLPP)",
      dna_lemp2: "DNA-testi: leukoenkefalomyelopatia (LEMP-2)",
      dna_huu: "DNA-testi: hyperurikosuria (HUU)",
      dna_dcm: "DNA-testi: dilatoiva kardiomyopatia (DCM) – sydänlihaksen sairaus",
      dna_pra5: "DNA-testi: etenevä verkkokalvon surkastuma (PRA5)",
      dna_dings2: "DNA-testi: dobermannien ”tanssiva tauti” (DINGS2) – hermojen ja lihasten sairaus",
      dna_ams: "DNA-testi: akraalinen mutilaatio-oireyhtymä (AMS) – hermosairaus, joka vie tassuista kivuntunnon",
      dna_dams: "DNA-testi: dyserytropoieettinen anemia ja myopatia -oireyhtymä (DAMS) – veren ja lihasten sairaus",
      dna_fuco: "DNA-testi: fukosidoosi – perinnöllinen hermoston sairaus",
      dna_pfk: "DNA-testi: fosfofruktokinaasin puutos (PFK) – veren ja lihasten perinnöllinen entsyymihäiriö",
      dna_pra_cord1: "DNA-testi: etenevä verkkokalvon surkastuma (PRA cord1)",
      dna_bbs2_pra: "DNA-testi: etenevä verkkokalvon surkastuma (BBS2-PRA)",
      dna_cnga1_pra: "DNA-testi: etenevä verkkokalvon surkastuma (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-testi: etenevä verkkokalvon surkastuma (PRA-rcd2)",
      dna_gm1: "DNA-testi: GM1-gangliosidoosi (perinnöllinen hermoston sairaus)",
      dna_gm2: "DNA-testi: GM2-gangliosidoosi (perinnöllinen hermoston sairaus)",
      dna_vwd3: "DNA-testi: von Willebrandin tauti, tyyppi 3 (vWD3) – perinnöllinen verenvuotohäiriö",
      dna_pra_rcd3: "DNA-testi: etenevä verkkokalvon surkastuma (PRA-rcd3)",
      dna_clad: "DNA-testi: koiran leukosyyttien adheesiovaje (CLAD), perinnöllinen immuunipuutos",
      dna_pra_rcd1: "DNA-testi: etenevä verkkokalvon surkastuma (rcd1)",
      dna_vwd2: "DNA-testi: von Willebrandin tauti, tyyppi 2 (vWD2) – perinnöllinen verenvuotohäiriö",
      dna_l2hga: "DNA-testi: L-2-hydroksiglutaariasiduria (L-2-HGA) – perinnöllinen hermoston aineenvaihduntasairaus",
      dna_pll: "DNA-testi: primaarinen linssiluksaatio (PLL) – perinnöllinen silmäsairaus, jossa mykiö siirtyy paikaltaan",
      dna_loa: "DNA-testi: myöhään alkava ataksia (LOA) – perinnöllinen sairaus, joka heikentää tasapainoa ja liikkeiden koordinaatiota",
      dna_sca: "DNA-testi: spinoserebellaarinen ataksia (SCA) – perinnöllinen hermoston sairaus",
    },
  },
  health: {
    splenic_torsion: "Pernan kiertymä, joka vaatii kiireellistä eläinlääkärin hoitoa, on tällä rodulla yleisempi kuin muilla suurilla roduilla.",
    shar_pei_fever: "Rodulla voi esiintyä shar pein perinnöllistä kuumetta: korkean kuumeen kohtauksia, joihin liittyy kipeitä, turvonneita niveliä ja turvonnut naama – mene heti eläinlääkäriin.",
    weight_gain: "Lihoo helposti – annoksia ja herkkuja on seurattava.",
    hip_elbow_dysplasia_eye_conditions: "Voi olla altis lonkka- ja kyynärniveldysplasialle sekä useille perinnöllisille silmäsairauksille.",
    cancer_risk: "Lähteiden mukaan rodulla on tavallista suurempi syöpäriski.",
    flat_face_breathing:
      "Lyhytkuonoinen (brakykefaalinen) rotu: lyhyt kuono, ahtaat sieraimet ja ylimääräinen pehmytkudos hengitysteissä voivat vaikeuttaa hengittämistä (brakykefaalinen obstruktiivinen hengitystieoireyhtymä, BOAS).",
    heat_stroke_risk: "Ylikuumenee nopeasti ja on useimpia koiria alttiimpi lämpöhalvaukselle, etenkin lämpimällä säällä.",
    skin_fold_ear_problems: "Altis korvatulehduksille ja ihopoimujen tulehduksille; ihopoimut on pidettävä puhtaina ja kuivina.",
    ear_infections_long_ears: "Pitkien korvien vuoksi voi esiintyä korvatulehduksia; bakteereja voi kertyä korvakäytävään.",
    collie_eye_pra:
      "Rodulla esiintyy perinnöllisiä silmäsairauksia: collien silmäpoikkeavuutta, joka on silmänpohjan poikkeama, ja etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen; silmätutkimuksia ja DNA-testejä on saatavilla.",
    merle_colour_risk: "Merle ei ole rotumääritelmän mukainen väri; tällä rodulla siihen liittyy suurempi kuulo- ja näköongelmien riski.",
    hind_leg_conformation:
      "The Royal Kennel Club mainitsee takajalkojen rakenteen ja koiran liikkumistavan tämän rodun huolenaiheeksi; terveellä koiralla on suora selkä ja maltillisesti kulmautuneet takajalat.",
    hip_elbow_dysplasia: "Voi olla altis lonkka- ja kyynärniveldysplasialle; kasvattajia neuvotaan tutkituttamaan vanhempien lonkat ja kyynärät ennen jalostusta.",
    degenerative_myelopathy: "Rodulla esiintyy degeneratiivista myelopatiaa, selkäytimen sairautta, joka heikentää vähitellen takajalkoja; DNA-testi on saatavilla.",
    exercise_induced_collapse: "Rodulla esiintyy rasituksen aiheuttamaa kollapsia (EIC), perinnöllistä hermo-lihassairautta, joka voi saada koiran lyyhistymään kovan rasituksen jälkeen.",
    heart_valve_disease:
      "Mitraaliläpän heikkenemisestä johtuva sydänsairaus on tällä rodulla suuri ongelma; se havaitaan usein ensin sivuäänenä, ja jalostuskoirien sydän pitäisi tutkia ensin.",
    chiari_syringomyelia:
      "Rodulla esiintyy Chiarin kaltaista epämuodostumaa ja syringomyeliaa – kivuliasta tilaa, jossa aivojen lähellä olevaan selkäytimeen muodostuu nesteen täyttämiä onteloita; se liittyy kallon muotoon ja todetaan magneettikuvauksella.",
    eye_conditions:
      "Rodulla esiintyy perinnöllisiä silmäsairauksia, kuten harmaakaihia, ja ulkonevat tai ärtyneet silmät ovat huolenaihe; silmätutkimuksia ja DNA-testejä on saatavilla.",
    epilepsy: "Rodulla esiintyy epilepsiaa, aivojen sairautta, joka voi aiheuttaa kouristuksia.",
    storage_disease: "Perinnöllinen hermoston kertymäsairaus voi sairastuttaa rodun nuoria koiria; vanhempien DNA-testin avulla kasvattajat voivat välttää sen.",
    chondrodysplasia: "Rodulla esiintyy kondrodysplasiaa, ruston ja luun kasvun häiriötä; pennut voidaan tutkia röntgenkuvauksella.",
    polyneuropathy: "Rodulla esiintyy perinnöllistä hermosairautta (polyneuropatiaa); vanhempien DNA-testin avulla kasvattajat voivat välttää sen.",
    fanconi_syndrome:
      "Rodulla esiintyy Fanconin oireyhtymää, perinnöllistä munuaissairautta, jossa sokeria pääsee virtsaan; vanhempien DNA-testin avulla kasvattajat voivat välttää sen.",
    pyruvate_kinase_deficiency: "Rodulla voi esiintyä pyruvaattikinaasin puutosta, punasolujen perinnöllistä vikaa, joka aiheuttaa anemiaa.",
    back_disc_disease: "Rodulla esiintyy välilevysairautta, ongelmaa selkänikamien välissä olevissa iskuja vaimentavissa välilevyissä.",
    pra_eye_disease:
      "Rodulla esiintyy etenevää verkkokalvon surkastumaa, perinnöllistä silmäsairautta, joka voi vähitellen johtaa sokeuteen; DNA-testejä ja silmätutkimuksia on saatavilla.",
    hip_dysplasia:
      "Rodulla esiintyy lonkkaniveldysplasiaa, lonkkanivelen kehityshäiriötä, joka voi johtaa nivelrikkoon; kasvattajia neuvotaan kuvauttamaan vanhempien lonkat.",
    bloat_gdv: "Rodulla voi esiintyä mahalaukun kiertymää, jossa mahalaukku laajenee ja kiertyy – se on hätätilanne, joka vaatii eläinlääkäriä heti.",
    inherited_eye_disease: "Rodulla esiintyy perinnöllisiä silmäsairauksia, kuten collien silmäpoikkeavuutta, harmaakaihia ja etenevää verkkokalvon surkastumaa.",
    drug_sensitivity_mdr1:
      "Joillakin rodun koirilla on perinnöllinen herkkyys tietyille lääkkeille (lääkeaineyliherkkyys, MDR1) – jos koirasi on herkkä, kerro siitä eläinlääkärille.",
    merle_to_merle_breeding:
      "Merle on tällä rodulla rotumääritelmän mukainen väri; kahta merlekoiraa ei pidä pariuttaa keskenään, koska tällaisilla pennuilla on heikentyneen näön ja kuulon riski – The Royal Kennel Club ei rekisteröi niitä.",
    kneecap_luxation: "Rodulla esiintyy patellaluksaatiota, jossa polvilumpio siirtyy tilapäisesti pois paikaltaan.",
    pra_and_eyelashes:
      "Rodulla esiintyy silmäongelmia: etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen, ja ylimääräisiä silmäripsiä, jotka hankaavat silmää (distikiaasi); kasvattajia neuvotaan tutkituttamaan vanhempien silmät.",
    liver_shunt: "Rodulla voi esiintyä maksasunttia (portosysteeminen suntti), jossa veri ohittaa maksan.",
    skin_allergies:
      "Ihoallergiat ovat rodun tunnettu huolenaihe; The Royal Kennel Club pyytää tuomareita tarkkailemaan ihotulehduksen merkkejä, ja omistajia neuvotaan kysymään eläinlääkäriltä ennen shampoon valintaa.",
    westie_lung:
      "Rodulla voi esiintyä ”westien keuhkoiksi” kutsuttua keuhkosairautta (idiopaattinen keuhkofibroosi), joka vaikeuttaa hengittämistä, enimmäkseen vanhemmilla koirilla.",
    jaw_bone_disorder: "Rodulla voi esiintyä perinnöllistä leukaluun sairautta.",
    dry_eye: "Rodulla voi esiintyä kuivasilmäisyyttä, jossa silmät eivät tuota tarpeeksi kyynelnestettä ja muuttuvat kuiviksi ja kipeiksi.",
    heart_hcm: "Rodulla esiintyy hypertrofista kardiomyopatiaa (HCM), perinnöllistä sydänsairautta, jossa sydänlihas paksuuntuu.",
    dental_weight_nail_care:
      "Laajan brittiläisen tutkimuksen mukaan hammassairaudet, ylipaino ja liian pitkät kynnet ovat rodun yleisimpiä ongelmia, joten omistajia neuvotaan huolehtimaan hampaista, painosta ja kynsistä.",
    dental_weight_care:
      "PetMD mainitsee hammassairaudet ja ylipainon ongelmina, joita kannattaa seurata, joten omistajia neuvotaan harjaamaan kissan hampaat säännöllisesti ja pitämään sen paino kurissa.",
    gsd_iv:
      "Rodulla esiintyy glykogeenin kertymäsairautta tyyppi IV (GSD IV), perinnöllistä sairautta, joka koskee kissanpentuja; vanhempien DNA-testin avulla kasvattajat voivat välttää sen.",
    hip_dysplasia_weight: "Rodulla voi esiintyä lonkkaniveldysplasiaa, lonkkanivelen kehityshäiriötä; PetMD neuvoo pitämään kissan terveessä painossa nivelten suojaamiseksi.",
    laryngeal_paralysis_polyneuropathy:
      "Rodulla esiintyy nuoruusiän kurkunpään halvausta ja polyneuropatiaa (JLPP), perinnöllistä hermosairautta, joka vaikuttaa kurkunpäähän ja takajalkoihin; vanhempien DNA-testin avulla kasvattajat voivat välttää sen.",
    heart_sas: "Rodulla esiintyy subaorttastenoosia, sydänläpän alapuolista ahtaumaa, joka voi aiheuttaa sivuäänen; jalostuskoirien sydän pitäisi tutkia ensin.",
    inherited_eye_defects: "Rodulla esiintyy perinnöllisiä silmäsairauksia, kuten verkkokalvon dysplasiaa ja pysyvää pupillikalvoa; silmätutkimuksia on saatavilla.",
    skin_fold_infections:
      "Ihopoimuihin, etenkin kasvoissa, voi kertyä kosteutta, ja ne voivat tulehtua (ihopoimujen pyoderma); kasvojen ryppyjä on puhdistettava päivittäin.",
    eyelid_eye_problems:
      "Rodulla esiintyy luomiongelmia (sisään- tai ulospäin kääntyneet luomet), kuivasilmäisyyttä ja kirsikkasilmää; silmätutkimuksia on saatavilla.",
    hip_elbow_joint_disease: "Rodulla esiintyy lonkka- ja kyynärniveldysplasiaa, jossa nivelet eivät kehity oikein; se voi johtaa nivelsairauteen.",
    hip_dysplasia_arthritis: "Rodulla esiintyy lonkkaniveldysplasiaa, löysää ja huonosti kehittynyttä lonkkaniveltä, joka voi lopulta johtaa nivelrikkoon.",
    bleeding_disorder_vwd: "Rodulla esiintyy von Willebrandin tautia, perinnöllistä veren hyytymisen häiriötä, joka voi aiheuttaa runsasta verenvuotoa.",
    heart_muscle_disease: "Rodulla voi esiintyä kardiomyopatiaa, sydänlihaksen heikkenemisestä johtuvaa sydämen laajentumaa.",
    itchy_skin_allergy: "Rodulla voi esiintyä ihoallergioita (atopiaa), jotka aiheuttavat kutinaa ja ihon arkuutta.",
    entropion_cherry_eye:
      "Rodulla voi esiintyä sisäänpäin kääntyneitä luomia (entropium) ja kirsikkasilmää, jossa vilkkuluomi pullahtaa esiin; kirsikkasilmä voidaan korjata leikkauksella.",
    dental_disease_tooth_brushing:
      "Laajan brittiläisen tutkimuksen mukaan hammassairaudet ovat ylivoimaisesti rodun yleisin ongelma, ja myös maitohampaat, jotka eivät irtoa, ovat yleisiä, joten omistajia kannustetaan hoitamaan koiran hampaita joka päivä, esimerkiksi harjaamalla.",
    windpipe_collapse: "Rodulla voi esiintyä henkitorven kasaanpainumista, jossa henkitorvi menettää jäykkyytensä; se voi aiheuttaa heikkoutta ja lyyhistymistä.",
    eye_problems_pra_lens_dry_eye:
      "Rodulla esiintyy silmäongelmia, kuten etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen, mykiön sijoiltaanmenoa (linssiluksaatio) ja kuivasilmäisyyttä.",
    cataracts_lens_luxation: "Rodulla voi esiintyä silmäongelmia, kuten harmaakaihia, joka samentaa mykiön, ja mykiön sijoiltaanmenoa (linssiluksaatio).",
    wobbler_syndrome: "Rodulla voi esiintyä wobbler-oireyhtymää, jossa kaulan epävakaat nikamat painavat selkäydintä ja heikentävät takajalkoja.",
    eye_phpv:
      "Rodulla voi esiintyä synnynnäistä silmävikaa (persistoiva hyperplastinen primaarinen lasiainen, PHPV); kasvattajia neuvotaan tutkituttamaan vanhempien silmät.",
    certain_cancers: "Rodulla voi esiintyä tiettyjä syöpiä.",
    bare_skin_sun_cold: "Karvattoman muunnoksen paljasta ihoa on suojattava auringolta ja kylmältä.",
    l2hga_nervous_system:
      "Rodulla voi esiintyä L-2-hydroksiglutaariasiduriaa (L-2-HGA), perinnöllistä aineenvaihduntasairautta, joka vaikuttaa hermostoon; vanhemmille on saatavilla DNA-testi.",
    short_face_breathing:
      "Kohtalaisen lyhytkuonoinen rotu: joillakin lyhytkuonoisemmilla koirilla voi olla vakavia hengitysongelmia (brakykefaalinen obstruktiivinen hengitystieoireyhtymä, BOAS).",
    corneal_ulcers: "Silmäongelmat, kuten sarveiskalvon haavaumat, ovat tavallista todennäköisempiä kallon muodon ja ulkonevien silmien vuoksi; silmätutkimuksia on saatavilla.",
    skin_folds_allergies:
      "Voi esiintyä iho-ongelmia, kuten allergioita, syyliä, ihonukkeja ja kasvojen ihopoimujen arkuutta (ihopoimujen ihotulehdus); kasvojen poimut on pidettävä puhtaina ja kuivina.",
    heart_cardiomyopathy_aortic_stenosis: "Rodulla voi esiintyä sydänongelmia, kuten kardiomyopatiaa ja aorttastenoosia.",
    dental_disease_care: "Laajan brittiläisen tutkimuksen mukaan hammassairaudet ovat rodun yleisin ongelma, ja omistajia neuvotaan pitämään hampaiden hoitoa etusijalla.",
    bladder_stones: "Rodulla voi esiintyä virtsakiviä, mineraalikertymiä, jotka muodostuvat virtsarakkoon ja virtsaan.",
    deafness: "Rodulla esiintyy kuuroutta toisessa tai molemmissa korvissa; pentujen kuulo voidaan tutkia BAER-testillä.",
    mitral_valve_disease:
      "Rodulla esiintyy mitraaliläppäsairautta, sydänsairautta, jossa heikentynyt läppä päästää verta virtaamaan takaisin sydämeen; eläinlääkäri voi kuunnella jalostuskoirien sydämen ennen jalostusta.",
    eye_problems_pra_cataracts_dry_eye:
      "Rodulla esiintyy silmäongelmia, kuten etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen, harmaakaihia ja kuivasilmäisyyttä; silmätutkimuksia on saatavilla.",
    skin_comedo_allergy:
      "Voi esiintyä iho-ongelmia, kuten snautserin komedo-oireyhtymää (eräänlainen karvatuppien tulehdus) ja kutinaa aiheuttavia ihoallergioita (atopiaa).",
    shorter_face_boas: "Lyhytkuonoinen (brakykefaalinen) rotu: lyhyempi kuono voi aiheuttaa vakavia hengitysongelmia (brakykefaalinen obstruktiivinen hengitystieoireyhtymä, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina:
      "Rodulla esiintyy silmäongelmia, kuten kuivasilmäisyyttä, harmaakaihia, etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen, ja verkkokalvon irtaumaa.",
    hypothyroidism: "Rodulla voi esiintyä kilpirauhasen vajaatoimintaa (hypotyreoosi), joka voi vaikuttaa painoon, ihoon ja energiatasoon.",
    open_fontanelle: "Rodulla voi esiintyä avointa aukiletta, kallon pehmeää kohtaa, joka ei sulkeudu kokonaan.",
    collapsing_trachea: "Rodulla voi esiintyä henkitorven kasaanpainumista, henkitorven heikkoutta, joka voi aiheuttaa yskää ja hengitysvaikeuksia.",
    gm1_gangliosidosis: "Rodulla voi esiintyä GM1-gangliosidoosia, perinnöllistä hermoston sairautta; vanhempien DNA-testillä se voidaan sulkea pois.",
    addisons_disease: "Rodulla voi esiintyä Addisonin tautia, lisämunuaisten hormonien puutetta.",
    protein_losing_disease: "Rodulla voi esiintyä munuaisten tai suoliston proteiinia hukkaavia sairauksia, jotka voivat aiheuttaa ripulia ja laihtumista.",
    diabetes_mellitus: "Rodulla voi esiintyä diabetesta (diabetes mellitus), jossa elimistö ei pysty säätelemään verensokeriaan kunnolla.",
    dental_disease_home_brushing:
      "Kuten monet pienet koirat, rotu on altis hammassairauksille, joten hampaiden harjaamista kotona koiran hammasharjalla ja -tahnalla suositellaan.",
    dermoid_sinus:
      "Rodulla voi esiintyä dermoidisinusta, kivuliasta tilaa, jossa selän ihossa oleva putki on yhteydessä selkäytimeen; rotujärjestöillä on pentujen dermoidisinustarkastusohjelma.",
    cataracts: "Rodulla voi esiintyä harmaakaihia, joka samentaa silmän mykiön ja voi johtaa näön menetykseen.",
    pra_inherited_blindness: "Rodulla voi esiintyä etenevää verkkokalvon surkastumaa, perinnöllistä silmäsairautta, joka voi vähitellen johtaa sokeuteen.",
    eyelids_turned: "Rodulla voi esiintyä sisäänpäin (entropium) tai ulospäin (ektropium) kääntyneitä luomia; kysy vanhempien silmätutkimuksista.",
    glaucoma_poag:
      "Rodulla voi esiintyä primaarista avokulmaglaukoomaa, jossa silmän sisään kertyy nestettä, mikä aiheuttaa kipua ja mahdollisesti sokeutta; vanhemmille on olemassa DNA-testi.",
    skin_fold_dermatitis: "Löysä iho muodostaa poimuja, jotka voivat arastua ja tulehtua; ne on tarkistettava joka päivä ja pidettävä puhtaina ja kuivina.",
    eyelid_problems:
      "Rodulla voi esiintyä luomiongelmia: sisäänpäin (entropium) tai ulospäin (ektropium) kääntyneitä luomia ja kirsikkasilmää, jossa vilkkuluomi pullahtaa esiin.",
    skin_allergy_face_folds: "Rodulla voi esiintyä kutinaa aiheuttavia ihoallergioita (atopiaa), ja kasvojen ihopoimut on puhdistettava joka päivä.",
    skin_ear_allergies:
      "Rodulla voi esiintyä ympäristöallergioita, jotka voivat johtaa toistuviin iho- tai korvatulehduksiin; PetMD ehdottaa allergiselle koiralle korvien puhdistusta kerran viikossa.",
    gum_disease_daily_brushing:
      "Rotu on altis iensairauksille (ientulehdukselle ja parodontiitille), joten PetMD neuvoo harjaamaan koiran hampaat joka päivä ja käymään eläinlääkärin hammastarkastuksessa kerran vuodessa.",
    pra_pk_def:
      "Rodulla esiintyy kahta perinnöllistä sairautta: etenevää verkkokalvon surkastumaa, silmäsairautta, joka voi johtaa sokeuteen, ja pyruvaattikinaasin puutosta, veren sairautta; vanhempien DNA-testien avulla kasvattajat voivat välttää ne.",
    windpipe_collapse_breathing: "Rodulla voi esiintyä henkitorven kasaanpainumista, jossa henkitorven rustorenkaat painuvat kasaan ja vaikeuttavat hengittämistä.",
    eye_problems_pra_cataracts_entropion:
      "Rodulla esiintyy silmäongelmia, kuten etenevää verkkokalvon surkastumaa, joka voi vähitellen johtaa sokeuteen, harmaakaihia, joka samentaa mykiön, ja sisäänpäin kääntyneitä luomia (entropium); silmätutkimuksia on saatavilla.",
    elbow_dysplasia_arthritis: "Rodulla voi esiintyä kyynärniveldysplasiaa, kyynärnivelen kehityshäiriötä, joka voi lopulta johtaa nivelrikkoon.",
    entropion: "Rodulla voi esiintyä entropiumia, jossa luomet kääntyvät sisäänpäin ja ärsyttävät silmää; kysy vanhempien silmätutkimuksista.",
    autoimmune_conditions: "Rodulla voi esiintyä autoimmuunisairauksia, joissa elimistö reagoi itseään vastaan.",
    ear_infections_prone: "Rotu on altis korvatulehduksille; pidä korvien puhtaudesta tarkasti huolta.",
    familial_nephropathy: "Rodulla esiintyy perinnöllistä munuaissairautta (familiaalinen nefropatia); vanhemmille on saatavilla DNA-testi.",
    hereditary_nephritis: "Rodulla esiintyy perinnöllistä munuaissairautta (perinnöllinen nefriitti, jota kutsutaan myös samojedinkoiran perinnölliseksi glomerulopatiaksi).",
    panosteitis: "Rodulla voi esiintyä panosteiittia, pitkien luiden kivuliasta tulehdusta, joka koskee yleensä nuoria, kasvavia koiria.",
    urinary_incontinence: "Rodulla voi esiintyä virtsankarkailua, hallitsematonta virtsan vuotamista.",
    osteochondritis: "Rodulla voi esiintyä osteokondroosia (osteochondritis dissecans, OCD), kasvavien koirien nivelruston häiriötä.",
    scottie_cramp: "Rodulla esiintyy ”scottie crampia” – lyhyitä lihaskramppikohtauksia, jotka yleensä laukaisee innostus; se ei ole kivulias.",
    periodontal_disease: "Parodontiitti, ikenien ja hampaita tukevien kudosten infektio ja tulehdus, on rodun tunnettu ongelma.",
    extra_eyelashes:
      "Rodulla voi esiintyä distikiaasia, jossa luomen sisäpintaan tai reunaan kasvaa pieniä ylimääräisiä ripsiä, jotka voivat hangata silmää; kysy vanhemmista, jotka on tutkittu silmätutkimusohjelmassa.",
    cm_sm_screening:
      "Rodulla voi esiintyä Chiarin kaltaista epämuodostumaa ja syringomyeliaa – kivuliasta tilaa, jossa aivojen lähellä olevaan selkäytimeen muodostuu nesteen täyttämiä onteloita; kasvattajia neuvotaan tutkituttamaan vanhemmat (Iso-Britannia: BVA/KC-ohjelma).",
    prominent_eyes_injury_dry_eye: "Ulkonevat silmät vahingoittuvat helpommin, ja niihin voi tulla haavaumia, ja ne voivat kuivua; rodulla esiintyy myös kuivasilmäisyyttä ja kirsikkasilmää.",
    legg_perthes: "Rodulla voi esiintyä Legg-Perthesin tautia, kivuliasta tilaa, jossa lonkkanivelen reisiluun pää kuolioituu ja murenee.",
    glaucoma: "Rodulla voi esiintyä glaukoomaa eli silmänpainetautia, silmänsisäisen paineen nousua, joka voi olla kivulias ja johtaa sokeuteen.",
    lethal_acrodermatitis: "Rodulla esiintyy letaalia akrodermatiittia, perinnöllistä sairautta, joka aiheuttaa pennuille vakavia iho- ja kasvuongelmia.",
    kidney_disease_urine_screening: "Rodulla esiintyy munuaisongelmia; vanhemmat voidaan tutkia virtsatesteillä ennen jalostusta.",
    primary_lens_luxation:
      "Rodulla esiintyy primaarista linssiluksaatiota, kivuliasta perinnöllistä silmäsairautta, jossa mykiö siirtyy paikaltaan ja joka voi aiheuttaa sokeuden; jalostuskoirille on saatavilla DNA-testi.",
    inherited_ataxia:
      "Rodulla esiintyy perinnöllisiä ataksioita (myöhään alkava ataksia ja spinoserebellaarinen ataksia), jotka heikentävät tasapainoa ja liikkeiden koordinaatiota; jalostuskoirille on saatavilla DNA-testejä.",
    hydrocephalus: "Rodulla voi esiintyä vesipäisyyttä (hydrokefalus), nesteen kertymistä aivojen ympärille.",
    heart_disease_pda:
      "Rodulla voi esiintyä sydänsairauksia, kuten avointa valtimotiehyttä (PDA), sydämen lähellä olevaa verisuonta, joka ei sulkeudu syntymän jälkeen; eläinlääkäri voi havaita sen kuuntelemalla pennun ensimmäisessä terveystarkastuksessa.",
    chiari_malformation:
      "Rodulla voi esiintyä Chiarin kaltaista epämuodostumaa ja syringomyeliaa – kivuliasta tilaa, jossa aivojen lähellä olevaan selkäytimeen muodostuu nesteen täyttämiä onteloita.",
    cataracts_entropion:
      "Rodulla voi esiintyä harmaakaihia, joka samentaa silmän mykiön, ja sisäänpäin kääntyneitä luomia (entropium); kysy vanhemmista, jotka on tutkittu silmätutkimusohjelmassa.",
    periodontal_daily_brushing: "Rotu on altis iensairauksille (parodontiitille), joten hampaiden harjaamista joka päivä koiran hammastahnalla suositellaan.",
    eye_problems_shallow_sockets:
      "Rodulla esiintyy silmäongelmia, kuten kuivasilmäisyyttä, silmätulehduksia ja haavaumia silmän pinnalla; matalat silmäkuopat tekevät myös silmävammoista todennäköisempiä.",
    eye_problems_dry_eye_entropion_lens_luxation:
      "Rodulla esiintyy silmäongelmia, kuten kuivasilmäisyyttä, sisäänpäin kääntyneitä luomia (entropium) ja mykiön sijoiltaanmenoa (linssiluksaatio); silmätutkimuksia on saatavilla.",
    heart_valve_screening: "Rodulla voi esiintyä sydänsairauksia; sydämen ultraäänitutkimuksella vanhemmat voidaan tutkia sydänläppäongelmien varalta ennen jalostusta.",
    dental_weight_problems:
      "Laajan brittiläisen tutkimuksen mukaan hammassairaudet ja ylipaino ovat rodulla erityisen yleisiä ongelmia – ongelmia, joiden ehkäisyyn omistaja voi itse vaikuttaa; rodulla esiintyy myös ahtaita hampaita ja maitohampaita, jotka eivät irtoa.",
  },
  page: {
    eyebrow: "Eläinhakemisto",
    // Search terms people use ("ragdoll-kissa", "luonne"); "luonne" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "luonne, " : ""}liikunta, koko ja hoito | PetPrep`
        : species === "cat"
          ? `${/kissa$/i.test(name) ? name : /l[aä]inen$/.test(name) ? `${name} kissa` : /\s/.test(name) ? `${name} -kissa` : /i$/.test(name) ? `${name}kissa` : `${name}-kissa`}: ${hasIntro ? "luonne, " : ""}turkinhoito, koko ja elinikä | PetPrep`
          : `${name} (${lc(one)}): tarpeet, elinikä ja hoito | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Lähteet, terveys ja vinkit ennen ostoa.`,
    metaLabels: { weight: "paino", exercise: "liikunta", lifespan: "elinikä" },
    metaDescription: (name) =>
      `${name}: rodun tarpeet lähteiden mukaan – liikunta, turkinhoito, ateriat, koko, elinikä ja kenelle se sopii – sekä miten PetPrep sitä simuloi.`,
    suitabilityTitle: "Kenelle se sopii",
    suitabilityNote: "Samat tunnisteet kuin sovelluksessa. Jokainen tunniste perustuu sivun alalaidassa lueteltuihin lähteisiin.",
    suitabilityNone: "Tälle rodulle ei ole vielä lähteisiin perustuvia sopivuustunnisteita.",
    needsTitle: "Mitä se tarvitsee",
    needsIntro: (species) =>
      species === "cat"
        ? "Tiedot kissajärjestöjen rotukuvauksista, eläinlääkäriorganisaatioilta ja tutkimuksista. Kun lähteet ovat eri mieltä, jokainen näytetään."
        : "Tiedot rotumääritelmistä, kennelliitoilta, eläinten hyvinvointijärjestöiltä ja tutkimuksista. Kun lähteet ovat eri mieltä, jokainen näytetään.",
    general: (many) => {
      const k = kindOf(many);
      return k ? `Yleisiä ohjeita ${ALLATIVE[k]} (ei rotukohtaisia):` : `Yleisiä ohjeita – ${lc(many)} (ei rotukohtaisia):`;
    },
    noData: "Ei vielä lähteissämme.",
    simTitle: "Näin PetPrep sitä simuloi",
    simBadge: "Pelisääntöjä, ei eläinlääkärin neuvoja",
    simIntro:
      "PetPrepissä yksi oikea viikko on yksi kuukausi lemmikin elämästä. Nämä ovat säännöt, joita peli käyttää tälle rodulle. PetPrep on valinnut ne tämän sivun lähteiden perusteella; ne eivät ole hoito-ohjeita oikealle eläimelle.",
    simInfoOnly: "Tämä rotu on hakemistossa vain tiedoksi; sovellus ei vielä simuloi sitä.",
    simTable: { stage: "Elämänvaihe", starts: "Alkaa", meals: "Aterioita päivässä", activity: { steps: "Päivän askeltavoite", play_sessions: "Leikkiä päivässä" } },
    arrives: (m) => `saapuu ${m}${NB}kuukauden ikäisenä`,
    fromMonth: (m, years) => (years ? `${ord(m)} kuukausi (${years})` : `${ord(m)} kuukausi`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `${ord(x.from)} kuukaudesta alkaen: ${x.meals}`)).join("; "),
    simDecisions: "Jokainen pelin luku on PetPrepin päätös, joka on kirjattu lähteineen.",
    healthTitle: "Terveys",
    healthNote: "Vain tiedoksi; eläinlääkäri ei ole tarkistanut tietoja. Kysy omasta eläimestäsi eläinlääkäriltä.",
    healthNone: "Lähteissämme ei ole vielä rotukohtaisia terveystietoja tästä rodusta.",
    checklistTitle: "Ennen ostoa: tarkista nämä kasvattajalta",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Kysymyksiä, jotka kannattaa selvittää ennen kuin otat kissanpennun kotiin. Kohdat ovat eläinlääkäreiden, eläinsuojelujärjestöjen ja kissaliittojen neuvoja; jokaisen lähde on mainittu."
        : "Kysymyksiä, jotka kannattaa selvittää ennen kuin otat pennun kotiin. Kohdat ovat eläinlääkäreiden, eläinsuojelujärjestöjen ja kennelliittojen neuvoja; jokaisen lähde on mainittu.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Vähimmäisikää, mikrosirutusta ja rokotuksia koskevat säädökset vaihtelevat maittain – tarkista, mitä asuinpaikkasi säännöt edellyttävät.",
    checklistGeneralTitle: "Kaikille roduille",
    checklistTestsTitle: "Vanhempien terveystutkimukset tällä rodulla",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tutkimukset, joita kissaliitto edellyttää ennen kuin kissaa käytetään jalostukseen" : "Tutkimukset, joita The Royal Kennel Club suosittelee vähimmäisvaatimuksena",
      best_practice: "Lisätutkimukset parhaan käytännön mukaan",
      other_scheme: "Muut tämän rodun terveysohjelmat",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Tämä luettelo perustuu ulkomaisen kissaliiton jalostussääntöihin (katso lähde) ja on suuntaa antava. Kysy kasvattajalta, mitkä tutkimukset vanhemmille on tehty."
        : "Nämä luettelot ovat peräisin Britannian kennelliitolta (The Royal Kennel Club), ja ne ovat suuntaa antavia; kansalliset kennelliitot voivat asettaa omia, tiukempia sääntöjään. Kysy rotujärjestöltä ja kasvattajalta, mitkä tutkimukset vanhemmille on tehty.",
    checklistStatus: {
      none_recommended:
        "The Royal Kennel Club ei tällä hetkellä suosittele tälle rodulle terveystutkimuksia ennen jalostusta. Kysy silti kasvattajalta vanhempien terveydestä.",
      not_found:
        "Emme ole vielä löytäneet luotettavaa lähdettä, jossa luetellaan tämän rodun vanhempien terveystutkimukset. Kysy rotujärjestöltä ja kasvattajalta, mitkä tutkimukset vanhemmille on tehty.",
      not_checked:
        "Emme ole vielä tarkistaneet tämän rodun vanhempien terveystutkimuksia. Kysy rotujärjestöltä ja kasvattajalta, mitkä tutkimukset vanhemmille on tehty.",
    },
    sourcesTitle: "Lähteet",
    sourcesIntro: "Jokainen tämän sivun tieto viittaa johonkin näistä lähteistä.",
    sourcesAll: "Näytä kaikki lähteet",
    sourcesFewer: "Näytä vähemmän",
    sourceLabel: (id, publisher) => `Lähde ${id}: ${publisher}`,
    disclaimer: "PetPrep on simulaatio perheille. Tämä sivu ei ole eläinlääkärin neuvontaa – kysy oikeasta eläimestä eläinlääkäriltä tai rotujärjestöltä.",
    backTo: (many) => `Kaikki ${breedsOf(many, "nomPl")}`,
    compareWith: "Vertaa muihin rotuihin",
    related: {
      title: "Samankaltaiset rodut",
      intro: (many) => `Muita hakemiston ${breedsOf(many, "partPl")}, joiden tarpeet ovat samankaltaiset – kaikista lähteisiin perustuvat tiedot.`,
    },
    updated: "Päivitetty",
    glanceTitle: "Lyhyesti",
    glanceNote: "Tärkeimmät tiedot sivun alalaidan lähteistä. Kun lähteet ovat eri mieltä, jokainen arvo luetellaan.",
    portraitAlt: { ai_photo: (name) => `${name} – valokuva (tekoäly)`, ai_illustration: (name) => `${name} – kuvitus (tekoäly)` },
    portraitCaption: { ai_photo: "Tekoälyllä luotu valokuva", ai_illustration: "Tekoälyllä luotu kuvitus" },
    portraitColours: {
      legend: "Turkin väri",
      alt: {
        ai_photo: (name, colour) => `${name}, ${lc(colour)} – valokuva (tekoäly)`,
        ai_illustration: (name, colour) => `${name}, ${lc(colour)} – kuvitus (tekoäly)`,
      },
    },
    share: {
      button: "Jaa",
      title: "Jaa tämä rotu",
      copy: "Kopioi",
      copied: "Kopioitu",
      linkLabel: "Linkki tälle sivulle",
      more: "Lisää vaihtoehtoja",
      text: (name) => `${name}: tarpeet, lähteet ja miten PetPrep sitä simuloi`,
      emailSubject: (name) => `${name} – PetPrepin eläinhakemisto`,
      on: (network) => `Jaa palvelussa ${network}`,
    },
    og: { lead: "Tarpeet, lähteet ja miten PetPrep sitä simuloi", photoLabel: "Tekoälykuva" },
    qa: {
      title: "Kysymyksiä ja vastauksia",
      intro: "Vastauksissa käytetään vain tämän sivun lähteisiin perustuvia tietoja; jokaisessa vastauksessa mainitaan lähteet.",
      // The breed name stays in the nominative (subject), lower case in running text: "Kuinka kauan bordercollie elää?"
      questions: {
        exercise: (n) => `Paljonko liikuntaa ${mid(n)} tarvitsee?`,
        lifespan: (n) => `Kuinka kauan ${mid(n)} elää?`,
        size: (n) => `Kuinka suureksi ${mid(n)} kasvaa ja paljonko se painaa?`,
        grooming: (n) => `Paljonko turkinhoitoa ${mid(n)} tarvitsee?`,
        suits: (n) => `Kenelle ${mid(n)} sopii?`,
      },
      leads: {
        exercise: (n) => `Lähteidemme mukaan ${mid(n)} tarvitsee näin paljon liikuntaa:`,
        lifespan: (n) => `${n} – elinikä lähteidemme mukaan:`,
        size: (n) => `${n} – koko ja aikuisen paino lähteidemme mukaan:`,
        grooming: (n) => `${n} – turkki ja turkinhoito lähteidemme mukaan:`,
        suits: (n) => `Lähteidemme mukaan ${mid(n)} sopii:`,
      },
      considerLead: "Huomioi:",
      differ: "Lähteet ilmoittavat eri arvoja, joten jokainen niistä on lueteltu.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "Anatolianpaimenkoira on suuri ja voimakasrakenteinen karjanvartija Turkista; FCI kuvaa turkkilaisen paimenkoiran kangalina (Kangal Shepherd Dog) – yksivärisenä kellanruskeasta sudenharmaaseen ja mustalla maskilla, urokset 72–78 cm ja nartut 65–73 cm korkeita. Amerikkalainen rotumääritelmä antaa uroksille 110–150 paunaa (noin 50–68 kg) ja nartuille 80–120 paunaa (noin 36–54 kg). Tämän kokoinen koira on täysikasvuinen noin 18–24 kuukauden iässä (PetMD); The Royal Kennel Club ilmoittaa eliniäksi yli 10 vuotta ja WebMD keskimäärin 11–13 vuotta.",
        "The Royal Kennel Club suosittelee yli 2 tuntia liikuntaa päivässä ja turkinhoitoa useammin kuin kerran viikossa, kertoo rodun karvaavan ja sopivan suureen taloon, jossa on iso piha maaseudulla, ja luokittelee sen Breed Watch -luokkaan 1. PetMD kirjoittaa, että anatolianpaimenkoira sopii todennäköisesti parhaiten kotiin, jossa ei ole pieniä lapsia, että varhain muihin eläimiin tutustuneet pennut tulevat yleensä toimeen niiden kanssa, että varhainen sosiaalistaminen on tärkeää, että turkki harjataan kahden vuosittaisen karvanvaihdon ulkopuolella kerran viikossa ja että liikuntaa ruokailun aikoihin tulee välttää.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irish Setter, punainen setteri",
      text: [
        "Irlanninsetteri (Irish Red Setter) on hoikka, urheilullinen kanakoira Irlannista, jalostettu etsimään riistaa laajalta alueelta. FCI:n rotumääritelmä kuvaa vain yhden värin – syvän kastanjanpunaisen ilman mustaa – ja säkäkorkeudeksi uroksilla 58–67 cm ja nartuilla 55–62 cm; amerikkalainen rotumääritelmä pitää ihanteena noin 70 paunaa (noin 32 kg) urokselle ja 60 paunaa (noin 27 kg) nartulle. Tämänkokoinen koira on täysikasvuinen noin 15–18 kuukauden iässä (PetMD), ja The Royal Kennel Club ilmoittaa eliniäksi yli 10 vuotta.",
        "The Royal Kennel Club suosittelee yli 2 tuntia liikuntaa päivässä ja turkinhoitoa useammin kuin kerran viikossa, kertoo rodun karvaavan ja sopivan isoon taloon, jossa on iso piha, ja sijoittaa sen Breed Watch -luokkaan 1. PDSA kuvaa erittäin ystävällisiä, kiintyviä koiria, jotka tulevat hyvin toimeen lasten ja muiden lemmikkien kanssa, ja neuvoo hoitamaan turkkia 2–3 kertaa viikossa; PetMD suosittelee korvien tarkistamista ja puhdistamista viikoittain ja kirjoittaa, että irlanninsetterit tarvitsevat paljon ihmisten seuraa.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Griffon Bruxellois, Brussels Griffon",
      text: [
        "Brysselingriffoni (Griffon Bruxellois) on Belgiasta kotoisin oleva pieni seurakoira, jolla on lyhyet, litteät kasvot. FCI:n rotumääritelmä kuvaa punaisen, luonnostaan karkean, hieman laineikkaan turkin ja 3,5–6 kg:n painon; brittiläinen Royal Kennel Club, jolla on karkeakarvainen ja sileäkarvainen muunnos, kuvaa sitä fiksuksi pieneksi koiraksi, jolla on terrierimäinen luonne. Tämän kokoinen koira on täysikasvuinen noin 8–12 kuukauden iässä (PetMD), ja Royal Kennel Club ilmoittaa eliniäksi yli 12 vuotta (PetMD: 12–15 vuotta).",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa useammin kuin kerran viikossa, kertoo, että rodusta lähtee karvaa ja että se sopii kerrostaloasuntoon, ja sijoittaa rodun Breed Watchin luokkaan 2. PetMD kuvaa lyhytkuonoisen (brakykefaalisen) koiran, joka sietää huonosti kuumaa ja kosteaa säätä, neuvoo puhdistamaan kasvojen ihopoimut noin kerran viikossa ja harjaamaan hampaat päivittäin ja kertoo, että brysselingriffonit tulevat valvottuina hyvin toimeen lasten ja muiden lemmikkien kanssa mutta eivät viihdy pitkään yksin.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rat Terrier, Rattie, amerikkalainen rottaterrieri",
      text: [
        "Rottaterrieri on pieni amerikkalainen terrieri, jota kasvatetaan kahtena kokona – miniatyyri- ja standardikokoisena. Sillä on lyhyt, tiivis, sileä ja kiiltävä turkki. Rotumääritelmä sallii enintään 18 tuuman (46 cm) säkäkorkeuden, ja PetMD ilmoittaa molempien kokojen painoksi 10–25 paunaa (noin 4,5–11 kg); tämänkokoinen koira on täysikasvuinen noin 9–12 kuukauden iässä (PetMD). VCA ilmoittaa eliniäksi 12–16 vuotta, PetMD 12–18 vuotta.",
        "Rat Terrier Club of America kertoo, että rottaterrierit tulevat hyvin toimeen lasten kanssa, varsinkin jos ne kasvavat yhdessä, ja pärjäävät kerrostalossa, mutta tarvitsevat vähintään 30 minuuttia liikuntaa päivässä. PetMD:n mukaan ne tarvitsevat paljon fyysistä ja henkistä virikettä, eivät viihdy pitkään yksin ja karvaavat hieman ympäri vuoden; VCA suosittelee harjausta kerran viikossa ja varoittaa, että ne eivät välttämättä tule toimeen pienten lemmikkien, etenkään jyrsijöiden, kanssa.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grosser Schweizer Sennenhund, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Isosveitsinpaimenkoira (FCI:llä ja Isossa-Britanniassa ”Great Swiss Mountain Dog”) on vankka, vahvaluinen ja hyvin lihaksikas kolmivärinen vetokoira Sveitsistä: musta, jossa on symmetriset ruskeat ja valkoiset merkit. FCI:n rotumääritelmä ilmoittaa säkäkorkeudeksi 65–72 cm uroksille ja 60–68 cm nartuille mutta ei painoa; WebMD ilmoittaa 52–64 kg uroksille ja 39–50 kg nartuille. Tämänkokoinen koira on täysikasvuinen noin 18–24 kuukauden iässä (PetMD), ja Royal Kennel Club ilmoittaa eliniäksi yli 10 vuotta (PetMD: 8–11 vuotta).",
        "Royal Kennel Club suosittelee enintään tunnin liikuntaa päivässä ja harjausta kerran viikossa ja kertoo, että rotu karvaa ja sopii isoon taloon, jossa on iso piha. PetMD kuvaa rotua erinomaiseksi perhekoiraksi, joka on lempeä lapsia kohtaan (kaikkea yhdessäoloa tulee valvoa), neuvoo puhdistamaan korvat viikoittain ja välttämään liikuntaa juuri ennen ruokailua tai sen jälkeen mahalaukun kiertymän (GDV) vaaran vuoksi; WebMD neuvoo harjaamaan hampaat päivittäin ja antamaan vähän herkkuja, koska rotu lihoo helposti.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    shar_pei: {
      aka: "kiinalainen shar pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Shar pei (Yhdysvalloissa ”Chinese Shar-Pei”) on aktiivinen, tiivis, neliömäinen keskikokoinen koira Kiinasta. Sillä on lyhyt, karhea ja harjasmainen yksivärinen turkki (mikä tahansa väri paitsi valkoinen), poimuja päässä ja säkässä sekä leveä kuono. Royal Kennel Clubin rotumääritelmä ilmoittaa säkäkorkeudeksi 46–51 cm ja PDSA painoksi 20–27 kg; tämänkokoinen koira on täysikasvuinen noin 12–15 kuukauden iässä (PetMD). Royal Kennel Club ja PDSA ilmoittavat eliniäksi yli 10 vuotta, mutta Isossa-Britanniassa tehty VetCompass-tutkimus totesi mediaaniksi 7,3 vuotta.",
        "Royal Kennel Club suosittelee enintään tunnin liikuntaa päivässä ja harjausta kerran viikossa ja sijoittaa rodun Breed Watch -ohjelman luokkaan 2 silmäluomien ja ihopoimujen ongelmien vuoksi. PDSA kuvaa shar peitä uskollisiksi, kiintyneiksi perhekoiriksi, jotka sopivat parhaiten kokeneille omistajille ja isommille lapsille, varoittaa vahvasta saalisvietistä pienempiä eläimiä kohtaan ja neuvoo pitämään ihopoimut puhtaina ja kuivina sekä pitämään tauon ruokailun ja liikunnan välillä.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Bordercollie on Isosta-Britanniasta kotoisin oleva keskikokoinen paimenkoira, joka on jalostettu kestävyyteen ja kovaan työhön. Sen rotumääritelmä kuvaa innokkaan, valppaan, herkästi reagoivan ja älykkään koiran, joka ei ole hermostunut eikä aggressiivinen.",
        "Kenneljärjestöt ja eläinlääkärit ovat yhtä mieltä ennen kaikkea yhdestä asiasta: tämä rotu on hyvin energinen. Se tarvitsee liikuntaa yli kaksi tuntia joka päivä ja runsaasti ajateltavaa. Kun sillä on tylsää tai se saa liian vähän liikuntaa, se keksii itse tekemistä – pureskelee kaikkea, mihin ylettyy, tai yrittää paimentaa leikkiviä lapsia.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labradori, Labrador Retriever",
      text: [
        "Labradorinnoutaja on Isosta-Britanniasta kotoisin oleva suurikokoinen, vahvarakenteinen lintukoira, joka on jalostettu noutamaan. Sen rotumääritelmä kuvaa hyväluonteisen, ystävällisen ja sopeutuvaisen seuralaisen, joka haluaa miellyttää ja rakastaa vettä. Turkki on lyhyt ja tiheä, ja sen väri on musta, keltainen tai maksanruskea/suklaanruskea.",
        "Brittiläiset eläinsuojelujärjestöt kuvaavat labradoria perhekoiraksi, joka kiintyy koko perheeseen, kun se on hyvin sosiaalistettu. Se on hyvin aktiivinen ja erittäin ruokamotivoitunut: herkut auttavat koulutuksessa, mutta labradorit ovat myös taipuvaisia lihomaan.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden, Golden Retriever",
      text: [
        "Kultainennoutaja on Isosta-Britanniasta kotoisin oleva suurikokoinen lintukoira, jonka sileä tai laineikas turkki on kullan- tai kermansävyinen. Sen rotumääritelmä kuvaa tottelevaisen, älykkään koiran, joka on lempeä, ystävällinen ja itsevarma.",
        "Brittiläiset eläinsuojelujärjestöt kutsuvat sitä erinomaiseksi perhekoiraksi aktiiviselle perheelle ja koiraksi, joka voi olla hyvä ensimmäinen koira. Lähteet tuovat selvästi esiin myös varjopuolet: vähintään kaksi tuntia liikuntaa päivässä, harjausta useita kertoja viikossa ja runsaan karvanlähdön.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "ranskis, French Bulldog",
      text: [
        "Ranskanbulldoggi on Ranskasta kotoisin oleva pieni, tukeva seurakoira, jolla on lyhyt, sileä turkki ja pystyt ”lepakkokorvat”. Sen rotumääritelmä kuvaa seurallisen, eloisan ja leikkisän koiran; brittiläiset eläinsuojelujärjestöt kutsuvat sitä rennoksi ja sopeutuvaiseksi ja kertovat, että se tulee yleensä hyvin toimeen lasten kanssa, minkä ansiosta siitä on tullut suosittu perhekoira.",
        "Se tarvitsee liikuntaa enintään tunnin päivässä ja sopii kerrostaloasuntoon. Jokainen lähde nostaa esiin saman varjopuolen, lyhyen ja litteän kuonon: se voi vaikeuttaa hengitystä, ja ranskanbulldoggit ylikuumenevat nopeasti etenkin lämpimällä säällä – siksi varjo, vesi ja rauhalliset lenkit ovat tärkeitä. PDSA ehdottaa, että perheet harkitsisivat myös aikuisen ranskanbulldoggin adoptoimista.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "schäfer, German Shepherd Dog, Alsatian, GSD",
      text: [
        "Saksanpaimenkoira on Saksasta kotoisin oleva suurikokoinen, voimakas paimenkoira, jolla on pystyt korvat ja tiheä, lyhyt tai pitkä kaksikerroksinen turkki. Sen rotumääritelmä kuvaa tasapainoisen, itsevarman ja hermorakenteeltaan vahvan koiran, ja The Royal Kennel Club kutsuu sitä monipuoliseksi työ- ja palveluskoiraksi, joka tunnetaan rohkeudestaan ja älykkyydestään.",
        "Se tarvitsee liikuntaa vähintään kaksi tuntia päivässä, sopii isoon taloon, jossa on piha, ja siitä lähtee paljon karvaa. Brittiläisten eläinsuojelujärjestöjen mukaan osa saksanpaimenkoirista voi olla erinomaisia perhekoiria, mutta pienten lasten seurassa niitä pitää aina valvoa. The Royal Kennel Club pyytää kasvattajia tutkituttamaan vanhempien lonkat ja kyynärnivelet ja mainitsee takajalkojen muodon rodun huolenaiheena.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "cavalier, CKCS, Cavalier King Charles Spaniel",
      text: [
        "Cavalier kingcharlesinspanieli on Isosta-Britanniasta kotoisin oleva pieni kääpiöspanieli, jolla on pitkät, runsashapsuiset korvat ja pitkä, silkkinen turkki neljässä värissä: blenheim, ruby, musta-ruskea ja kolmivärinen. Sen rotumääritelmä kuvaa aktiivisen, sulavaliikkeisen koiran, jonka ilme on lempeä – metsästyshenkisen, hellän, ystävällisen ja pelottoman.",
        "Se tarvitsee liikuntaa noin tunnin päivässä, voi asua kerrostalossa ja tunnetaan siitä, että se on hyvä lasten kanssa, mutta leikkejä pitäisi valvoa, eikä se pidä yksin jäämisestä. Turkki pitää harjata useammin kuin kerran viikossa. Brittiläiset lähteet mainitsevat tärkeimpinä terveyshuolina sydämen läppäsairauden ja kallon muotoon liittyvän kivuliaan selkäydinsairauden, joten kasvattajia pyydetään tutkituttamaan koiriensa sydän ja magneettikuvauttamaan ne.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Beagle on Isosta-Britanniasta kotoisin oleva pieni ajokoira, joka on jalostettu metsästämään jänistä hajujälkeä seuraten. Sen rotumääritelmä kuvaa vankan, tiiviisti rakentuneen ja iloisen ajokoiran – rohkean, aktiivisen ja valppaan sekä ystävällisen, ei lainkaan aggressiivisen tai aran – jolla on lyhyt, tiheä turkki ajokoirille tyypillisissä väreissä, kuten kolmivärinen, ruskea-valkoinen tai sitruuna-valkoinen, ja hännänpää on aina valkoinen.",
        "Se tarvitsee liikuntaa enintään noin tunnin päivässä ja sopii hyvin perhe-elämään, jos se sosiaalistetaan nuoresta pitäen, mutta lasten kanssa sitä pitäisi valvoa, eikä sitä pitäisi jättää yksin, koska silloin se saattaa haukkua ja pureskella tavaroita. Lyhyt turkki kaipaa harjausta kerran viikossa, mutta siitä lähtee karvaa. Koulutus pitäisi aloittaa varhain ja perustaa palkitsemiseen. Brittiläiset eläinlääkärit hoitavat beagleja useimmin lihomisen ja hammassairauksien vuoksi, joten annoskokoja ja hampaita on syytä pitää silmällä.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "villakoira, Standard Poodle",
      text: [
        "Isovillakoira on villakoiran neljästä koosta suurin: Ranskasta kotoisin oleva seurakoirarotu, joka polveutuu eurooppalaisista sorsanmetsästyskoirista. Sen rotumääritelmä kuvaa tyylikkään, tasapainoisen ja ylväsryhtisen koiran – uskollisen, iloisen ja hyväluonteisen, joka oppii ja on koulutettavissa – jolla on runsas, kähärän kihara ja tasaisen yksivärinen turkki: musta, valkoinen, ruskea, harmaa tai fawn.",
        "Se tarvitsee liikuntaa enintään noin tunnin päivässä ja sopii isoon taloon, jossa on iso piha. Kun pentu sosiaalistetaan oikein, se tulee yleensä hyvin toimeen lasten ja muiden lemmikkien kanssa. Sen turkista ei lähde karvaa, mutta se ei silti tarkoita, että koira olisi hypoallergeeninen: turkki vaatii päivittäistä hoitoa ja säännöllistä trimmausta ammattitrimmaajalla. Isovillakoira tunnetaan hyvin tottelevaisena ja helposti koulutettavana.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "mäykky, Teckel, Dachshund",
      text: [
        "Mäyräkoira on saksalainen mäyrän- ja kaniininmetsästäjä, jota kotimaassaan kutsutaan nimellä Teckel. Sitä on useaa kokoa ja kolmea turkkityyppiä; tämä sivu käsittelee normaalikokoista lyhytkarvaista mäyräkoiraa. Sen rotumääritelmä kuvaa koiran, joka on korkeuteensa nähden kohtuullisen pitkä ilman liioittelua – uskollinen, monipuolinen ja hyväluonteinen; älykäs, eloisa ja rohkea – ja jolla on tiheä, lyhyt ja sileä turkki, väriltään punainen tai ruskein merkein musta tai suklaanruskea.",
        "Se tarvitsee liikuntaa enintään noin tunnin päivässä jaettuna parille lenkille, joilla ehtii myös nuuskia, ja sopii pieneen taloon. Se rakastaa ihmisiä ja tulee yleensä hyvin toimeen kaikenikäisten lasten kanssa, aina valvotusti, mutta voimakkaan saalisviettinsä vuoksi sitä ei suositella pienempien lemmikkien seuraan, eikä se viihdy yksin. Pitkän selkänsä ja lyhyiden jalkojensa vuoksi se on altis välilevytyrälle, joten sen ei pitäisi hyppiä; kasvattajia pyydetään tutkituttamaan selkä ennen jalostuskäyttöä.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussi, Australian Shepherd",
      text: [
        "Australianpaimenkoira on nimestään huolimatta amerikkalainen rotu – älykäs työkoira, jolla on vahvat paimennus- ja vartiointivaistot. Sen rotumääritelmä kuvaa tasapainoisen, keskikokoisen koiran, joka on hieman pidempi kuin korkea, hyväluonteinen ja ensitapaamisella joskus pidättyväinen. Sen keskipitkä turkki on suora tai laineikas, ja väri on blue merle, musta, red merle tai punainen, kukin valkoisin ja ruskein merkein tai ilman niitä.",
        "Se tarvitsee liikuntaa yli kaksi tuntia päivässä sekä henkisiä haasteita, kuten aivopelejä ja koulutusta, ja sopii maalle isoon taloon, jossa on iso piha. Oikeassa perheessä siitä voi tulla todella hyvä perhekoira, mutta vahvan paimennusvaistonsa vuoksi se saattaa paimentaa lapsia, joten sitä ei suositella perheisiin, joissa on pienempiä lapsia. Se ei pidä yksin jäämisestä, ja turkki pitää harjata muutaman kerran viikossa.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon Havanais, Havanese",
      text: [
        "Havannankoira on bichon-ryhmän pienikokoinen rotu ja Kuuban kansalliskoira. Sen rotumääritelmä kuvaa tukevan, lyhytjalkaisen pienen koiran, jolla on hyvin pitkä, pehmeä, suora tai laineikas turkki, jota ei koskaan trimmata, ja korkealla selän päällä kannettu häntä. Värit ovat fawn, musta, havannanruskea, tupakanruskea, punaruskea ja harvinaisena valkoinen, laikuin ja ruskein merkein tai ilman niitä.",
        "Rotumääritelmän mukaan se on hellä, leikkisä ja jopa vähän pelle, ja se rakastaa lapsia ja leikkii heidän kanssaan loputtomasti; brittiläiset lähteet kutsuvat sitä erinomaiseksi perhekoiraksi, kun se on sosiaalistettu oikein, ja helposti koulutettavaksi. Se tarvitsee liikuntaa noin 30 minuuttia päivässä, voi asua kerrostalossa, eikä siitä lähde karvaa – mutta pitkä turkki pitää hoitaa joka päivä, ettei siihen tule takkuja ja solmuja.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie, west highland white terrieri, West Highland White Terrier",
      text: [
        "Valkoinen länsiylämaanterrieri eli westie on Isosta-Britanniasta kotoisin oleva pieni terrieri. Sen rotumääritelmä kuvaa vahvarakenteisen pienen koiran, jolla on syvä rintakehä, suora selkä ja noin 5 cm pitkä, karkea kaksikerroksinen turkki, pienet, pystyt ja suippokärkiset korvat sekä tuuheiden kulmakarvojen alla tummat silmät. Valkoinen on ainoa rotumääritelmän sallima väri.",
        "Rotumääritelmän mukaan se on valpas, iloinen, rohkea ja itsenäinen mutta ystävällinen. Brittiläiset lähteet kutsuvat sitä helläksi ja leikkisäksi perhekoiraksi kaikenikäisille lapsille, kunhan leikkejä aina valvotaan; se tarvitsee liikuntaa noin tunnin päivässä, voi asua kerrostalossa, siitä lähtee karvaa ja se pitää harjata muutaman kerran viikossa. Saalisviettinsä vuoksi sen ei pitäisi asua pienempien lemmikkien kanssa, eikä se pidä yksin jäämisestä. Iho on tunnettu huolenaihe: The Royal Kennel Club pyytää tuomareita kiinnittämään huomiota ihotulehduksen merkkeihin rodussa.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berni, Berner Sennenhund, Bernese Mountain Dog",
      text: [
        "Berninpaimenkoira on suurikokoinen sveitsiläinen maatilakoira, jota käytettiin alun perin Bernin kantonissa vahti-, veto- ja karjakoirana. Sen rotumääritelmä kuvaa vahvan, ketterän ja pitkäkarvaisen työkoiran, jolla on vankat raajat ja pitkä, kiiltävä, suora tai hieman laineikas turkki. Ainoa rotumääritelmän sallima väri on kolmivärinen: syvänmusta, jossa on täyteläiset punaruskeat merkit poskissa, silmien yläpuolella, raajoissa ja rinnassa, sekä valkoiset merkit päässä ja rinnassa.",
        "Rotumääritelmän mukaan se on itsevarma, hyväluonteinen ja ystävällinen sekä ”lempeä ja omistautunut perhekoira”, joka kehittyy hitaasti. Brittiläisten lähteiden mukaan se tarvitsee liikuntaa enintään tunnin päivässä ja sopii isoon taloon, jossa on iso piha; siitä lähtee paljon karvaa, ja se pitää harjata useammin kuin kerran viikossa; sitä ei pitäisi jättää yksin pitkiksi ajoiksi. Se elää yleensä alle kymmenen vuotta, ja brittiläiset lähteet mainitsevat sen terveyshuolina muun muassa lonkka- ja kyynärniveldysplasian, mahalaukun kiertymän ja tietyt syövät.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky, Siberian Husky",
      text: [
        "Siperianhusky on keskikokoinen rekikoira ja työkoira, jonka FCI tunnustaa amerikkalaiseksi roduksi ja jota The Royal Kennel Club kuvaa rekikoirista kevyimmäksi ja nopeimmaksi. Sen rotumääritelmä edellyttää nopeaa ja kevytliikkeistä koiraa, jolla on keskipitkä kaksikerroksinen turkki, paksut pystyt korvat, ruskeat tai siniset silmät (myös yksi kumpaakin väriä on sallittu) ja hyvin karvoittunut, tuuhea häntä. Värit vaihtelevat mustasta puhtaaseen valkoiseen; merle ja juovikas eivät ole sallittuja.",
        "Rotumääritelmän mukaan se on ystävällinen ja lempeä, valpas ja ulospäin suuntautunut. Brittiläisten lähteiden mukaan se tarvitsee liikuntaa yli kaksi tuntia päivässä, ison talon, jossa on iso piha, ja hyvin tukevan, korkean aidan, sillä huskyt tunnetaan karkailijoina; siitä lähtee paljon karvaa, se pitää harjata muutaman kerran viikossa, eikä se pärjää hyvin yksin. PDSA ehdottaa sitä mieluummin aikuisten tai teini-ikäisten kotiin kuin perheisiin, joissa on pienempiä lapsia, ja mainitsee sen terveyshuolina muun muassa lonkkaniveldysplasian, silmäsairaudet ja epilepsian.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "rotti, Rottie",
      text: [
        "Rottweiler on Saksasta kotoisin oleva keskikokoinen tai suuri, voimakas työkoira. Sen rotumääritelmä kuvaa vankan koiran, joka ei ole raskas eikä kevyt ja jolla on lyhyt, karkea ja tiiviisti myötäilevä turkki, keskikokoiset riippuvat korvat ja tummanruskeat mantelinmuotoiset silmät. Ainoa sallittu väri on musta, jossa on selvärajaiset, täyteläiset punaruskeat merkit poskissa, kuonossa, kurkussa, rinnassa ja raajoissa; valkoiset merkit ovat virhe.",
        "Rotumääritelmän mukaan se on hyväluonteinen, rauhallinen, hyvin omistautunut, tottelevainen ja työhaluinen, ja The Royal Kennel Clubin mukaan hyvin koulutettu rottweiler on upea perheen seuralainen. Brittiläisten lähteiden mukaan se tarvitsee liikuntaa yli kaksi tuntia päivässä, ison talon, jossa on iso piha, ja kokeneen omistajan, koska se on niin voimakas; se pitäisi sosiaalistaa nuoresta pitäen. PDSA ei suosittele sitä perheisiin, joissa on pieniä lapsia ja vauvoja, eikä sitä pitäisi koskaan jättää valvomatta muiden lemmikkien kanssa. Harjaus kerran viikossa riittää. Se elää yleensä alle kymmenen vuotta, ja The Royal Kennel Club seuraa sen takajalkojen muotoa.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "bulldoggi, English Bulldog, British Bulldog",
      text: [
        "Englanninbulldoggi on Isosta-Britanniasta kotoisin oleva keskikokoinen, sileäkarvainen koira: melko tanakka, matala, leveä, voimakas ja tiivis, ja sillä on suhteellisen lyhyt kuono-osa, pienet ja ohuet ruusukorvat sekä pyöreät, hyvin tummat silmät. Rotumääritelmä sallii yksiväriset turkit, kuten punaisen, fawnin, vaalean kellanruskean (fallow) ja valkoisen, sekä juovikkaan ja kirjavan; musta ja musta-ruskea ovat erittäin epätoivottuja. Se edellyttää suuria, hyvin avoimia sieraimia ja toteaa, että hengitysvaikeuksista kärsivät koirat ovat erittäin epätoivottuja.",
        "Rotumääritelmän mukaan se on valpas, rohkea, uskollinen, luotettava ja urhea, ulkonäöltään hurja mutta hellä, ja The Royal Kennel Clubin mukaan se on luonteensa ja uskollisuutensa ansiosta yhä erittäin suosittu perheen seuralainen. Brittiläisten lähteiden mukaan se tarvitsee liikuntaa enintään tunnin päivässä, ei koskaan päivän kuumimpaan aikaan, ja tulee hyvin toimeen perheen muiden lemmikkien kanssa, jos se sosiaalistetaan nuorena; turkki pitää hoitaa kerran viikossa, mutta kasvojen ihopoimut pitää puhdistaa päivittäin. PDSA kuvaa sitä voimakkaasti lyhytkuonoiseksi roduksi, jolla on hyvin todennäköisesti vakavia terveysongelmia, kuten hengitysvaikeuksia, ja suosittelee painokkaasti harkitsemaan terveempää rotua, risteytystä tai sekarotuista koiraa. Se elää yleensä alle kymmenen vuotta.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "GSP, Deutsch Kurzhaar, German Shorthaired Pointer",
      text: [
        "Lyhytkarvainen saksanseisoja on Saksasta kotoisin oleva monipuolinen yleismetsästyskoira, joka on rakennettu työskentelemään maastossa ja vedessä. Sillä on lyhyt, tiheä ja karhealta tuntuva turkki, leveät, litteät ja korkealle kiinnittyneet korvat sekä tummanruskeat mantelinmuotoiset silmät. Sen amerikkalainen rotumääritelmä sallii yksivärisen maksanruskean, maksanruskea-valkoisen (esimerkiksi pilkullisen), yksivärisen mustan ja musta-valkoisen; punaiset, oranssit, sitruunankeltaiset tai rusehtavat alueet sekä täysin valkoinen koira johtavat hylkäämiseen. Rotumääritelmä kuvaa typistetyn hännän – PetPrepissä koiralla on aina luonnollinen häntä.",
        "Rotumääritelmän mukaan se on ystävällinen, älykäs ja halukas miellyttämään. The Royal Kennel Clubin ja PDSA:n mukaan se tarvitsee liikuntaa yli kaksi tuntia päivässä; PDSA lisää, että sen vaisto metsästää, seistä ja noutaa voi herätä lenkillä, joten se tarvitsee hyvän luoksetulokoulutuksen, ja että se on melko helppo kouluttaa. Turkki pitää hoitaa kerran tai kaksi viikossa, ja karvaa lähtee kohtalaisesti. Laajan brittiläisen tutkimuksen mukaan sen elinajanodotteen mediaani on 13,4 vuotta.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "yorkie, Yorkshire Terrier",
      text: [
        "Yorkshirenterrieri on Isosta-Britanniasta kotoisin oleva kääpiöterrieri, joka rotumääritelmän mukaan painaa enintään 3,2 kg. Sen pitkä, täysin suora, kiiltävä ja silkkinen turkki laskeutuu tasaisesti kummallekin puolelle selän keskijakauksesta. Rotumääritelmä sallii yhden värin: tumma teräksensininen takaraivosta häntään ja täyteläinen, kirkas punaruskea päässä, rinnassa ja raajoissa; pienet V-muotoiset korvat ovat pystyt. Rotumääritelmä kuvaa sekä typistetyn että typistämättömän hännän – PetPrepissä koiralla on aina luonnollinen häntä.",
        "Rotumääritelmän mukaan se on valpas, älykäs ja eloisa, ja sen luonne on tasainen. The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa joka päivä; PDSA lisää, että se pitää juoksemisesta, noutamisesta ja leikeistä, voi olla koulutuksessa melko itsepäinen ja sopii paremmin perheisiin, joissa on isompia lapsia, koska sen luut ovat hyvin hauraat. Laajassa brittiläisessä tutkimuksessa hammassairaudet olivat rodun yleisin ongelma; tutkimus kannustaa hoitamaan hampaita päivittäin esimerkiksi harjaamalla, ja sen mukaan kuoliniän mediaani oli 13,56 vuotta.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italian Corso Dog",
      text: [
        "Cane corso on keskikokoinen tai suuri italialainen molossi: vankka ja tukeva koira, jossa on myös tiettyä tyylikkyyttä ja joka on hieman pidempi kuin korkea. Sen rotumääritelmä kuvaa lyhyen, kiiltävän ja hyvin tiheän turkin, jonka väri on musta, harmaan sävyt, fawn tai punainen tumman maskin kanssa, tumma vehnänvärinen tai juovikas; suuret valkoiset laikut eivät ole sallittuja. Nykyisen FCI:n rotumääritelmän mukaan korvat jätetään typistämättä ja häntä on luonnollinen – ja Isossa-Britanniassa korvien ja hännän typistäminen on laitonta – joten PetPrepissä koiralla on aina luonnolliset korvat ja häntä.",
        "Rotumääritelmän mukaan se vartioi omaisuutta, perhettä ja karjaa ja on äärimmäisen ketterä ja herkästi reagoiva. PDSA:n mukaan se on omistajiaan kohtaan seurallinen ja rakastava, tarvitsee liikuntaa noin kaksi tuntia päivässä ja tekemistä, koska se inhoaa tylsistymistä, ja sopii kokonsa vuoksi paremmin kokeneille omistajille. PDSA ei suosittele rotua koteihin, joissa on pieniä lapsia, koska koira voi kaataa heidät; se sopii aikuisten koteihin tai perheisiin, joissa on isompia lapsia. Harjaus kerran viikossa riittää, mutta siitä lähtee karvaa, ja se tunnetaan kuolaamisesta. PDSA:n mukaan sen keskimääräinen elinikä on alle kymmenen vuotta.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, Pembroke Welsh Corgi",
      text: [
        "Welsh corgi pembroke on Walesista kotoisin oleva pieni karjakoira: matalaraajainen, vahva ja tukevarakenteinen, ja se antaa pienestä koostaan huolimatta vankan ja kestävän vaikutelman. Sen rotumääritelmä kuvaa keskipitkän, suoran turkin, jossa on tiheä pohjavilla, värinä punainen, soopeli, fawn tai musta-ruskea, raajoissa, rinnassa ja kaulassa valkoisin merkein tai ilman niitä, sekä pystyt korvat. Häntä typistettiin aikoinaan perinteisesti; rotumääritelmä kuvaa myös luonnollisen hännän, ja PetPrepissä koiralla on aina luonnollinen häntä.",
        "Rotumääritelmän mukaan se on rohkea, työteliäs, ulospäin suuntautunut ja ystävällinen. The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa useammin kuin kerran viikossa; PDSA kuvaa ystävällisiä, iloisia ja hauskanpitoa rakastavia koiria, jotka haluavat miellyttää ja ovat melko helppoja kouluttaa, mutta kertoo, että ne saattavat näykkiä juoksevien lasten kantapäitä, joten sosiaalistaminen lasten kanssa ja koulutus nuoresta pitäen auttavat. The Royal Kennel Clubin mukaan sen elinikä on yli 12 vuotta, ja se pyytää kasvattajia lonkkakuvauttamaan vanhemmat.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Dobermann, Doberman, Doberman Pinscher",
      text: [
        "Dobermanni on keskikokoinen saksalainen seura-, suojelu- ja käyttökoira: vahva ja lihaksikas, linjoiltaan tyylikäs ja ryhdiltään ylväs. Sen FCI:n rotumääritelmä kuvaa lyhyen, karkean ja tiheän turkin, joka on tiivis ja sileä, väriltään musta tai ruskea selvärajaisin ruosteenpunaisin merkein; valkoiset laikut eivät ole sallittuja. FCI:n rotumääritelmän mukaan korvat ja häntä jätetään luonnollisiksi, ja PetPrepissä koiralla on aina luonnolliset korvat ja häntä.",
        "Rotumääritelmän mukaan se on ystävällinen ja rauhallinen ja hyvin omistautunut perheelleen. The Royal Kennel Clubin mukaan sen uskollinen ja tottelevainen luonne tekee siitä erinomaisen perhekoiran; se suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa kerran viikossa. PDSA lisää, että se on hyvin energinen ja tarvitsee runsaasti sekä henkistä että fyysistä tekemistä ja varhaista sosiaalistamista ja että sitä ei – suuren kokonsa ja vahvan rakenteensa vuoksi – suositella perheisiin, joissa on pieniä lapsia, eikä ensikertalaisille omistajille. The Royal Kennel Clubin mukaan sen elinikä on yli 10 vuotta.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Boxer, Deutscher Boxer, German Boxer",
      text: [
        "Bokseri on keskikokoinen saksalainen käyttö- ja seurakoira, jonka rakenne on neliömäinen, luusto vahva ja lihaksisto hyvin kehittynyt. Sen rotumääritelmät kuvaavat lyhyen, kiiltävän ja sileän turkin, joka on väriltään keltainen tai juovikas mustalla maskilla; valkoiset merkit ovat sallittuja, mutta ne eivät saisi peittää yli kolmannesta turkista. Kuonon pitäisi olla leveä ja syvä, ei koskaan lyhyt, ja sieraimien avarat. Häntä typistettiin aikoinaan perinteisesti; rotumääritelmä kuvaa myös typistämättömän hännän, ja PetPrepissä koiralla on aina luonnolliset korvat ja häntä.",
        "Rotumääritelmän mukaan se on tasapainoinen, tottelevainen, peloton ja itsevarma. The Royal Kennel Club kutsuu sitä hyvin rakastetuksi perheen seuralaiseksi ja suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa kerran viikossa. PDSA kuvaa hyvin energisen, leikkisän koiran, joka rakastaa ihmisten seuraa ja jolle voi kehittyä eroahdistus, jos se jätetään yksin; sen saalisvietti on hyvin voimakas, eikä sitä – kokonsa ja riehakkaan luonteensa vuoksi – suositella koteihin, joissa on pienempiä lapsia, eikä ensikertalaisille omistajille; joillakin lyhytkuonoisemmilla boksereilla voi olla vakavia hengitysongelmia. The Royal Kennel Clubin mukaan sen elinikä on yli 10 vuotta.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, Miniature Schnauzer",
      text: [
        "Kääpiösnautseri on pieni saksalainen seurakoira: vahva, tanakka ja lähes neliömäinen, ja sillä on karkea, jäykkä ja tiheä turkki, tuuheat kulmakarvat ja parta. Sen FCI:n rotumääritelmä sallii värit pippuri-suola, musta-hopea, puhdas musta ja puhdas valkoinen; PetPrepissä näkyvät kolme ensimmäistä. Häntä typistettiin aikoinaan perinteisesti ja korvat joskus leikattiin; FCI:n rotumääritelmä edellyttää luonnollista häntää ja taittuvia korvia, ja PetPrepissä koiralla on aina luonnolliset korvat ja häntä.",
        "FCI luokittelee sen seura- ja kotikoiraksi, ja The Royal Kennel Clubin mukaan se on erittäin suosittu seuralainen. The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa useammin kuin kerran viikossa ja kertoo, ettei siitä lähde karvaa. PDSA kuvaa leikkisän, uteliaan koiran, joka voi tulla hyvin toimeen lasten kanssa, jos se tutustutetaan heihin varhain, voi olla koulutuksessa itsepäinen ja tarvitsee turkinhoitoa kahdesta kolmeen kertaa viikossa sekä aika ajoin ammattitrimmaajan tekemää leikkaamista tai nyppimistä. The Royal Kennel Clubin mukaan sen elinikä on yli 10 vuotta.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Shih tzu on Tiibetistä kotoisin oleva pieni seurakoira; sen FCI:n rotumääritelmästä vastaa Iso-Britannia. Rotumääritelmät kuvaavat tukevan, runsasturkkisen koiran, jolla on ylväs ryhti ja ”krysanteemia muistuttavat” kasvot: pitkä, tiheä peitinkarva, suuret, tummat ja pyöreät silmät, suuret riippuvat korvat ja runsaskarvainen häntä, joka kaartuu selän päälle. Rotumääritelmät sallivat monia värejä; PetPrepissä näkyvät kulta-valkoinen, musta-valkoinen ja maksanruskea-valkoinen, ei koskaan merle. Kuono on lyhyt ja litteä, ja PDSA mainitsee lyhyemmän kuonon aiheuttamat hengitysongelmat, joten PetPrep piirtää kasvot aina maltillisiksi ja sieraimet avoimiksi.",
        "FCI kuvaa sitä älykkääksi, aktiiviseksi ja valppaaksi, ystävälliseksi ja itsenäiseksi. The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa joka päivä ja mainitsee kerrostaloasunnon sopivaksi kodiksi. PDSA:n mukaan shih tzut voivat olla hyväluonteisia perhekoiria, jos ne on sosiaalistettu ja koulutettu oikein; se kutsuu niitä ihanteellisiksi lemmikeiksi ensikertalaisille omistajille, neuvoo valvomaan niitä aina lasten seurassa ja suosittelee useimmille lemmikkikoirille päivittäistä harjausta sekä ammattitrimmaajan trimmausta 6–8 viikon välein. The Royal Kennel Clubin mukaan sen elinikä on yli 10 vuotta.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deutsche Dogge, Great Dane",
      text: [
        "Tanskandoggi on saksalainen jättiläinen: FCI:n rotumääritelmän mukaan siinä yhdistyvät suuri, voimakas ja hyvärakenteinen runko sekä ylpeys, voima ja tyylikkyys, ja sillä on pitkä, kapea pää, luonnollisesti riippuvat korvat ja hyvin lyhyt, sileä ja kiiltävä turkki. Rotumääritelmissä mainitaan keltainen ja juovikas – mieluiten mustalla maskilla – sekä harlekiini, musta ja sininen; PetPrepissä näkyvät vain värit, jotka sekä FCI että The Royal Kennel Club mainitsevat, ei koskaan merle tai mantle, ja PetPrep piirtää koiralle aina luonnolliset korvat ja hännän sekä tiiviit silmäluomet, koska The Royal Kennel Club pyytää tuomareita kiinnittämään huomiota sisään- tai ulospäin kääntyviin silmäluomiin ja heikkoihin takajalkoihin.",
        "FCI:n mukaan se on ystävällinen, rakastava ja omistajilleen omistautunut, vaikka se voi olla pidättyväinen vieraita kohtaan. The Royal Kennel Clubin mukaan se on kokostaan huolimatta upea perhekoira; se suosittelee liikuntaa yli kaksi tuntia päivässä, isoa taloa ja pihaa sekä turkinhoitoa kerran viikossa. PDSA:n mukaan tanskandoggit tunnetaan kuolaamisesta, niillä on melko voimakas saalisvietti, eikä niitä kokonsa ja voimansa vuoksi suositella koteihin, joissa on pienempiä lapsia; se neuvoo pitämään taukoa syömisen ja liikunnan välillä mahalaukun kiertymän ehkäisemiseksi. The Royal Kennel Clubin mukaan sen elinikä on alle 10 vuotta.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pomeranian, pom, saksanpystykorva (kääpiö), Zwergspitz, German Toy Spitz",
      text: [
        "Kääpiöpystykorva on pystykorvista pienin: FCI pitää sitä saksanpystykorvan kääpiömuunnoksena, jonka säkäkorkeus on 21 cm ± 3 cm, ja The Royal Kennel Clubin rotumääritelmä kuvaa tiiviin, lyhytrunkoisen pienen koiran, jolla on ketunpäätä muistuttava pää, pienet pystyt korvat ja selän päälle kiertyvä häntä. Sen kaksikerroksisessa turkissa on pehmeä, pörröinen pohjavilla ja pitkä, suora peitinkarva, joka muodostaa kaulan ympärille kauluksen. Rotumääritelmä sallii monia yksivärisiä turkkeja, kuten oranssin, kerman, valkoisen, mustan ja ruskean, mutta ei koskaan merleä; PetPrep piirtää luonnollisen, trimmaamattoman turkin.",
        "FCI kuvaa sen luonnetta seuralliseksi ja iloiseksi, ja The Royal Kennel Clubin rotumääritelmä kutsuu sitä ulospäin suuntautuneeksi, eloisaksi ja älykkääksi. The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja pitää sitä sopivana kerrostaloasuntoon; PDSA:n mukaan kaksikerroksinen turkki pitää harjata kahdesta kolmeen kertaa viikossa. AKC:n mukaan kääpiöpystykorvat sopivat yleensä paremmin perheisiin, joissa on isompia lapsia, ja voivat tulla hyvin toimeen muiden eläinten kanssa, jos ne sosiaalistetaan varhain, ja AKC suosittelee painokkaasti varhaista sosiaalistamista ja pentukursseja. The Royal Kennel Clubin mukaan sen elinikä on yli 12 vuotta.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, Boston Terrier, American Gentleman",
      text: [
        "Bostoninterrieri on kotoisin Yhdysvalloista. FCI:n rotumääritelmä kuvaa eloisan, hyvin älykkään, sileäkarvaisen, lyhytpäisen, tiiviisti rakentuneen, lyhythäntäisen ja tasapainoisen koiran, joka on väriltään juovikas, seal tai musta tasaisin valkoisin merkein: valkoinen kuononympärys, valkoinen läsi silmien välissä ja valkoinen eturinta vaaditaan, ja juovikasta pidetään parempana. PetPrep piirtää sen juovikas-valkoisena, ja sillä on maltillinen kuono, avoimet sieraimet sekä luonnolliset korvat ja häntä.",
        "Se on lyhytkuonoinen (brakykefaalinen) rotu, ja PDSA varoittaa, ettei sitä pitäisi koskaan liikuttaa päivän kuumimpaan aikaan, koska se ylikuumenee helposti. The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa kerran viikossa, pitää sitä sopivana kerrostaloasuntoon ja kertoo sen eliniäksi yli 10 vuotta. PDSA kutsuu bostoninterriereitä täydellisiksi perhekoiriksi, jotka ovat erityisen hyviä lasten kanssa, kun ne on pentuina sosiaalistettu hyvin; AKC:n mukaan ne pärjäävät hyvin lasten kanssa, jotka osaavat kohdella eläimiä hellävaraisesti, eivätkä viihdy pitkiä aikoja yksin, ja AKC suosittelee painokkaasti varhaista sosiaalistamista ja pentukoulutusta.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "Miniature american shepherd on kotoisin Yhdysvalloista. FCI:n rotumääritelmä kuvaa pienen paimenkoiran, jolla on vahvat paimennus- ja vartiointivaistot; se on älykäs ja ennen kaikkea työkoira, hieman pidempi kuin korkea, ja sen keskipitkä, suora tai laineikas turkki kestää säätä. Värit ovat musta, blue merle, punainen ja red merle, valkoisin ja ruskein merkein tai ilman niitä, ja silmät voivat olla ruskeat, siniset, pähkinänruskeat tai meripihkanväriset. PetPrep piirtää sen blue merlenä, ja sillä on luonnollinen häntä.",
        "PetMD:n mukaan sillä on paljon energiaa ja se tarvitsee liikuntaa vähintään tunnin joka päivä, mieluiten kaksi, sekä tehtäviä, jotka pitävät sen mielen virkeänä, ja se pitäisi harjata pari kertaa viikossa; AKC:n mukaan viikoittainen harjaus riittää suurimman osan vuotta, ja karvanlähtöaikana sitä harjataan päivittäin. AKC:n mukaan siitä voi tulla erinomainen perhekoira tottelevaisuuskoulutuksen ja varhaisen sosiaalistamisen avulla, ja se on yleensä hyvä lasten kanssa mutta saattaa yrittää paimentaa heitä; PetMD lisää, että sen kiintymys perheeseensä voi johtaa eroahdistukseen, kun se jätetään yksin. PetMD:n mukaan sen elinikä on 12–13 vuotta.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chi, Chihuahueño, lyhytkarvainen chihuahua, Smooth Coat Chihuahua",
      text: [
        "Chihuahua on kotoisin Meksikosta. The Kennel Clubin rotumääritelmä kuvaa pienen, siron ja tiiviin koiran, jolla on veikeä ilme ja iloinen, eloisa ja älykäs luonne, hyvin pyöristynyt ”omenamainen” kallo, kohtuullisen lyhyt ja hieman suippeneva kuono, suuret pyöreät silmät, jotka eivät pullistu, suuret korvat ja sirppihäntä; kaikki värit ja niiden yhdistelmät merleä lukuun ottamatta ovat sallittuja, ja toivottava paino on 1,8–2,7 kg. The Royal Kennel Club pitää lyhytkarvaista ja pitkäkarvaista chihuahuaa kahtena eri rotuna; PetPrep piirtää lyhytkarvaisen chihuahuan fawnina, ja sen pää on maltillinen.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa kerran viikossa, pitää sitä sopivana kerrostaloasuntoon ja kertoo sen eliniäksi yli 12 vuotta. PDSA:n mukaan chihuahuat ovat niin pieniä ja kevyitä, että lapset haluavat nostaa niitä syliin, mistä ne tuskin pitävät, joten ne sopivat paremmin perheisiin, joissa lapset ovat hieman vanhempia. PDSA lisää, että seurakoirina ne rakastavat seuraa ja tarvitsevat jonkun kotiin koko ajan ja että ne pitäisi nuoresta pitäen tutustuttaa monenlaisiin ihmisiin, kokemuksiin ja paikkoihin.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springeri, English Springer Spaniel, ESS",
      text: [
        "Englanninspringerspanieli on kotoisin Isosta-Britanniasta, jossa se jalostettiin etsimään, ajamaan ylös ja noutamaan riistaa. The Kennel Clubin rotumääritelmä kuvaa sopusuhtaisen, tiiviin, vahvan, iloisen ja aktiivisen koiran – brittiläisistä maaspanieleista korkearaajaisimman – jolla on ystävällinen, iloinen ja tottelevainen luonne, pitkät, hapsuiset korvat, tummat pähkinänruskeat silmät ja tiivis, suora ja säänkestävä turkki; värit ovat maksanruskea-valkoinen tai musta-valkoinen, kumpikin myös punaruskein merkein, ja säkäkorkeus on noin 51 cm. PetPrep piirtää sen maksanruskea-valkoisena, ja sillä on luonnollinen häntä.",
        "The Royal Kennel Club suosittelee liikuntaa yli 2 tuntia päivässä ja turkinhoitoa useammin kuin kerran viikossa ja kertoo sen eliniäksi yli 10 vuotta. PDSA:n mukaan springerit ovat hyviä perhekoiria, jotka tulevat hyvin toimeen lasten ja perheen muiden lemmikkien kanssa, ovat tottelevaisia ja oppimishaluisia ja tarvitsevat turkinhoitoa kerran tai kaksi viikossa sekä trimmauksen 3 kuukauden välein. AKC lisää, ettei niitä pitäisi jättää yksin pitkiksi ajoiksi ja että varhainen sosiaalistaminen ja pentukurssit ovat avainasemassa.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltti, sheltie, Shetland Sheepdog, Shetland Collie (entinen nimi)",
      text: [
        "Shetlanninlammaskoira on kotoisin Isosta-Britanniasta, ja se on pieni, pitkäkarvainen työkoira. FCI:n rotumääritelmä kuvaa valppaan, lempeän, älykkään, vahvan ja aktiivisen koiran, joka on omistajalleen hellä ja uskollinen ja vieraille pidättyväinen; sillä on pitkän, tylpän kiilan muotoinen pää, pienet puolipystyt korvat, joiden kärjet taittuvat eteenpäin, ja kaksikerroksinen turkki, jonka peitinkarva on pitkä ja karkea. Värit ovat soopeli, kolmivärinen, blue merle, musta-valkoinen ja musta-ruskea, ja ihanteellinen säkäkorkeus on uroksilla 37 cm ja nartuilla 35,5 cm. PetPrep piirtää sen soopeli-valkoisena.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa joka päivä ja kertoo sen eliniäksi yli 10 vuotta. PDSA:n mukaan shetlanninlammaskoirat ovat hyvin lempeitä, leikkisiä ja tottelevaisia koiria, jotka sopivat usein hyvin perhe-elämään ja viihtyvät hyvin lasten kanssa, ja koulutus ja sosiaalistaminen nuorena ovat hyvin tärkeitä. AKC lisää, että ne tarvitsevat säännöllisesti sekä henkistä että fyysistä tekemistä, pärjäisivät paimennusvaistonsa vuoksi parhaiten isompien lasten kanssa ja tunnetaan hyvin äänekkäinä.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "bretoninspanieli, Epagneul Breton, Brittany, Brittany Spaniel",
      text: [
        "Bretoni on Ranskasta kotoisin oleva kanakoira, jota siellä kutsutaan nimellä Epagneul Breton. The Royal Kennel Club kuvaa hyvin energisen, älykkään koiran, joka metsästää, seisoo ja noutaa, lempeän ja hellän mutta täynnä elämää ja intoa; sillä on tiheä, melko hieno turkki, korkealle kiinnittyneet kolmionmuotoiset korvat ja häntä, joka on usein luonnostaan lyhyt. Rotumääritelmän värit ovat oranssi-valkoinen, maksanruskea-valkoinen tai musta-valkoinen, kimo tai kolmivärinen, ja säkäkorkeus on uroksilla 48–51 cm ja nartuilla 47–50 cm. PetPrep piirtää sen oranssi-valkoisena.",
        "The Royal Kennel Club suosittelee liikuntaa yli 2 tuntia päivässä ja turkinhoitoa useammin kuin kerran viikossa ja kertoo sen eliniäksi yli 10 vuotta. AKC:n mukaan bretonit ovat hyvin energisiä koiria, jotka tarvitsevat runsaasti liikuntaa ja henkistä virikettä, ovat lempeitä ja yleensä kärsivällisiä lasten kanssa, ja viikoittainen harjaus pitää ne parhaan näköisinä. PetMD lisää, että pentujen varhainen sosiaalistaminen on välttämätöntä, että ne eivät viihdy pitkiä aikoja yksin ja että lintujen metsästykseen jalostettuina niillä on voimakas saalisvietti.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "amerikancockeri, American Cocker Spaniel, Cocker Spaniel (USA)",
      text: [
        "Amerikancockerspanieli – Yhdysvalloissa pelkkä Cocker Spaniel – on eri rotu kuin cockerspanieli (English Cocker Spaniel). AKC:n rotumääritelmä kutsuu sitä lintukoiraryhmän (Sporting Group) pienimmäksi jäseneksi; sillä on pitkät, lehdenmuotoiset ja runsashapsuiset korvat, pyöristynyt kallo, leveä ja syvä kuono sekä silkkinen turkki, joka on suora tai hieman laineikas. Värejä ovat musta, mikä tahansa yksiväri vaaleimmasta kermasta tummimpaan punaiseen sekä kirjavat värit, joissa on valkoista. Rotumääritelmä edellyttää tasaista luonnetta ilman pienintäkään arkuutta.",
        "The Royal Kennel Club suosittelee turkinhoitoa joka päivä ja liikuntaa yli 2 tuntia päivässä ja kertoo sen eliniäksi yli 10 vuotta; AKC ja PetMD puolestaan kirjoittavat, ettei se tarvitse paljon liikuntaa. PetMD kutsuu näitä suloisluonteisia koiria erinomaisiksi perhekoiriksi, jotka ovat ystävällisiä ihmisille ja muille eläimille, ja neuvoo aloittamaan sosiaalistamisen ja koulutuksen varhain; VCA kirjoittaa, että ne ovat yleensä erittäin hyviä lasten kanssa ja taipuvaisia lihomaan ja että niiden korvat pitää tarkistaa joka viikko.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, Belgian Malinois, Belgian Shepherd Dog (Malinois)",
      text: [
        "Belgianpaimenkoira malinois on Belgiasta kotoisin olevan paimenkoirarodun, belgianpaimenkoiran, lyhytkarvainen muunnos. FCI:n rotumääritelmä kuvaa sopusuhtaisen koiran, jossa yhdistyvät tyylikkyys ja voima, ja sallii vain yhden värin: fawn, jossa on musta nokisuus ja musta maski. FCI:n ja AKC:n rotumääritelmät kuvaavat melko pienet, pystyt ja kolmionmuotoiset korvat, lyhyen ja karkean turkin, jossa on tiheä pohjavilla, sekä valppaan, älykkään, uteliaan ja itsevarman luonteen.",
        "The Royal Kennel Club suosittelee liikuntaa yli 2 tuntia päivässä ja turkinhoitoa useammin kuin kerran viikossa ja kertoo sen eliniäksi yli 10 vuotta. AKC kirjoittaa, ettei se ole hyvä valinta ensikertalaiselle koiranomistajalle, että se pärjää parhaiten isompien, vastuullisten lasten kanssa ja ettei sitä pitäisi jättää pitkäksi aikaa yksin; PetMD mainitsee voimakkaan saalisvietin ja toteaa, että se saattaa yrittää paimentaa lapsia ja tarvitsee jatkuvaa päivittäistä koulutusta ja varhaista sosiaalistamista.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset, Basset Hound",
      text: [
        "Basset hound on Isosta-Britanniasta kotoisin oleva lyhytjalkainen ajokoira. FCI:n rotumääritelmä kuvaa huomattavan vankan, tasapainoisen, rauhallisen ja hellän ajokoiran, joka ei ole koskaan aggressiivinen tai arka; sillä on matalalle kiinnittyneet, pitkät ja samettiset korvat, sileä, lyhyt turkki ja värit musta-valko-ruskea tai sitruuna-valkoinen. The Royal Kennel Clubin Breed Watch pyytää näyttelytuomareita kiinnittämään huomiota sisään- tai ulospäin kääntyviin silmäluomiin, hyvin pitkiin korviin, tulehtuneisiin ihopoimuihin ja liialliseen nahkaan.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa kerran viikossa ja kertoo sen eliniäksi yli 10 vuotta. PDSA kuvaa suvaitsevaisen koiran, joka tulee erittäin hyvin toimeen lasten kanssa ja rakastaa seuraa ja jonka hyvää ruokahalua on syytä pitää silmällä; se neuvoo tarkistamaan ihopoimut joka päivä ja pitämään taukoa syömisen ja liikunnan välillä. AKC lisää, että nenä voi viedä sen harhateille, joten tukeva talutin ja aidatut alueet ovat tärkeitä.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vizsla, Magyar Vizsla, Hungarian Vizsla, Hungarian Pointer",
      text: [
        "Lyhytkarvainen unkarinvizsla on Unkarista kotoisin oleva keskikokoinen, tyylikäs kanakoira, jolla on lyhyt, ruosteenkultainen turkki. FCI:n rotumääritelmä kuvaa eloisan, ystävällisen ja luonteeltaan tasaisen koiran, joka on helppo kouluttaa ja pitää tiiviin yhteyden ohjaajaansa; värit ovat ruosteenkullan ja tumman hiekankullan sävyjä. The Royal Kennel Clubin Breed Watch ei mainitse rotukohtaisia huolenaiheita.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa kerran viikossa ja kertoo sen eliniäksi yli 12 vuotta. PDSA kuvaa hyvin ihmisrakkaan koiran, joka rakastaa seuraa ja voi kärsiä eroahdistuksesta, kun se jätetään yksin; se tulee hyvin toimeen isompien lasten kanssa, mutta PDSA ei suosittelisi sitä perheisiin, joissa on hyvin pieniä lapsia, eikä ensikertalaisille omistajille, ja voimakkaan saalisvietin vuoksi se neuvoo olemaan pitämättä sitä pienempien lemmikkien kanssa. PDSA neuvoo myös pitämään taukoa syömisen ja liikunnan välillä.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "englantilainen cockerspanieli, cockeri, English Cocker Spaniel, Cocker Spaniel (UK), Merry Cocker",
      text: [
        "Cockerspanieli – englanniksi English Cocker Spaniel, Isossa-Britanniassa pelkkä Cocker Spaniel – on eri rotu kuin amerikancockerspanieli. FCI:n rotumääritelmä kuvaa iloisen, tukevan ja metsästyshenkisen koiran, joka on tasapainoinen ja tiivis ja jolla on matalalle kiinnittyneet lehdenmuotoiset korvat ja suora, silkkinen turkki; AKC:n rotumääritelmä kutsuu sitä iloiseksi ja helläksi, luonteeltaan tasaiseksi, ja mainitsee yksivärisen mustan, maksanruskean ja punaisen sävyt sekä kirjavat värit, joissa on valkoista. The Royal Kennel Clubin Breed Watch ei mainitse rotukohtaisia huolenaiheita.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa joka päivä ja kertoo sen eliniäksi yli 10 vuotta; brittiläisiä cockerspanieleita koskeneessa VetCompass-tutkimuksessa kuoliniän mediaani oli 11,44 vuotta. PDSA:n mukaan se tulee kärsivällisen luonteensa ansiosta yleensä hyvin toimeen lasten kanssa, aina valvotusti, mutta PDSA varoittaa, että se tunnetaan eroahdistuksesta eikä sitä pitäisi koskaan jättää yksin yli neljäksi tunniksi. PDSA neuvoo myös harjaamaan päivittäin ja pitämään taukoa syömisen ja liikunnan välillä.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon Maltais, Maltese, Maltese Terrier",
      text: [
        "Maltankoira on Välimeren keskiosista kotoisin oleva kääpiökoira, jonka rotumääritelmästä FCI:ssä vastaa nykyään Italia. FCI:n rotumääritelmä kuvaa pienen, rungoltaan pitkähkön koiran, joka on eloisa, hellä, hyvin rauhallinen ja hyvin älykäs ja painaa 3–4 kg; sen hyvin pitkä, tiheä ja silkkinen karva laskeutuu raskaasti koko vartalon yli. Turkissa ei ole pohjavillaa, ja ainoa väri on puhtaanvalkoinen (vaalea norsunluun sävy on sallittu). The Royal Kennel Clubin Breed Watch ei mainitse rotukohtaisia huolenaiheita.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa joka päivä, kertoo, ettei rodusta lähde karvaa, ja ilmoittaa sen eliniäksi yli 12 vuotta. PDSA kuvaa fiksun, ystävällisen ja hellän koiran, joka voi olla vieraille pidättyväinen mutta voi nuorena saadun oikean sosiaalistamisen ansiosta oppia olemaan itsevarma ja seurallinen. PetMD varoittaa, että sille voi kehittyä eroahdistus, jos se jätetään liian pitkäksi aikaa yksin, toteaa, että sen ja pienten lasten yhteisiä hetkiä pitää valvoa, ja neuvoo harjaamaan sen hampaat joka päivä.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Carlin, Mops",
      text: [
        "Mopsi on Kiinasta kotoisin oleva pieni seurakoira, jonka rotumääritelmästä FCI:ssä vastaa nykyään Iso-Britannia. FCI:n rotumääritelmä kuvaa selvästi neliömäisen ja tanakan koiran – ”multum in parvo” – jossa on paljon viehätysvoimaa, arvokkuutta ja älykkyyttä ja jonka luonne on tasainen, iloinen ja eloisa; ihannepaino on 6,3–8,1 kg, turkki on hieno, sileä, lyhyt ja kiiltävä, väriltään hopea, aprikoosi, fawn tai musta, ja häntä on kiertynyt tiukasti lonkan päälle. Se edellyttää melko suuria, hyvin avoimia sieraimia eikä hyväksy ahtaita sieraimia eikä raskasta kuonon yläpuolista ihopoimua. The Royal Kennel Club sijoittaa rodun Breed Watchin luokkaan 3, ja sen huolenaiheisiin kuuluvat hengitysvaikeudet, ulkonevat silmät, ihopoimujen tulehdus ja liikalihavuus.",
        "PDSA kutsuu mopsia voimakkaasti lyhytkuonoiseksi (brakykefaaliseksi) roduksi, joka hengästyy helposti, neuvoo välttämään liikuntaa helteellä ja kertoo, että sen eläinlääkärit suosittelisivat painokkaasti mieluummin rotua, jolla on normaali kuono, tai mopsiristeytystä. The Royal Kennel Club suosittelee liikuntaa enintään 1 tunnin päivässä ja turkinhoitoa kerran viikossa, kertoo, että rodusta lähtee karvaa, ja ilmoittaa sen eliniäksi yli 10 vuotta. PDSA kuvaa koiran, joka tulee usein hyvin toimeen lasten ja muiden lemmikkien kanssa mutta jumaloi seuraa eikä pärjää hyvin yksin; PetMD neuvoo puhdistamaan ja kuivaamaan kasvojen ihopoimut joka päivä ja toteaa, että lihavuus on rodussa yleistä.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "collie, Rough Collie, Long-haired Collie",
      text: [
        "Pitkäkarvainen collie on Isosta-Britanniasta kotoisin oleva suurikokoinen paimenkoira. FCI:n rotumääritelmä kuvaa erittäin kauniin koiran, joka seisoo tyynen arvokkaasti, on luonteeltaan ystävällinen eikä osoita merkkiäkään hermostuneisuudesta tai aggressiivisuudesta; sillä on hyvin tiheä turkki, jonka peitinkarva on suora ja karkea, ja kolme väriä: soopeli, kolmivärinen ja blue merle. The Royal Kennel Clubin rotumääritelmä kutsuu sitä erinomaiseksi seurakoiraksi, joka on ystävällinen, iloinen ja aktiivinen sekä hyvä lasten ja muiden koirien kanssa, ja kertoo säkäkorkeudeksi uroksilla 56–61 cm ja nartuilla 51–56 cm. The Royal Kennel Club sijoittaa rodun Breed Watchin luokkaan 2 eikä rekisteröi merle × merle -yhdistelmien pentuja.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 1 tunnin päivässä ja turkinhoitoa joka päivä, kertoo, että rodusta lähtee karvaa, ja ilmoittaa sen eliniäksi yli 12 vuotta. PetMD:n mukaan colliet ovat helliä etenkin lapsia kohtaan ja hyviä muiden eläinten kanssa, mutta ne eivät viihdy yksin pitkiä aikoja ja saattavat innostuessaan näykkiä nilkkoja ja kantapäitä. Se toteaa myös, että pentujen sosiaalistaminen on ratkaisevan tärkeää ja että collieilla esiintyy MDR1-mutaatiota, joka vaikuttaa siihen, miten koiran elimistö käsittelee tiettyjä lääkkeitä.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "englanninmastiffi, English Mastiff, Old English Mastiff",
      text: [
        "Mastiffi on Isosta-Britanniasta kotoisin oleva hyvin suurikokoinen vahtikoirarotu. FCI:n rotumääritelmä kuvaa koiran, jossa yhdistyvät suuruus ja rohkeus – rauhallinen ja omistajilleen hellä mutta kykenevä vartioimaan – ja jolla on neliömäiseltä näyttävä pää, leveä, syvä ja voimakas runko sekä lyhyt, tiivis turkki, väriltään aprikoosi, fawn tai juovikas. PDSA kertoo keskimääräiseksi säkäkorkeudeksi 71–78 cm ja keskimääräiseksi painoksi 80–85 kg ja toteaa, että The Kennel Club luokittelee mastiffin luokkaan kolme: rotuihin, joiden näkyvät rakenteelliset ongelmat voivat aiheuttaa kipua, epämukavuutta tai terveysongelmia.",
        "PDSA suosittelee aikuisille koirille noin tunnin liikuntaa päivässä (mutta ei liikaa liikuntaa, kun pennun luut ja nivelet ovat vielä kehittymässä), turkinhoitoa kerran viikossa ja kasvojen ihopoimujen päivittäistä puhdistusta ja kertoo keskimääräiseksi eliniäksi alle 10 vuotta. PetMD kutsuu mastiffeja erinomaisiksi perhekoiriksi koteihin, joissa lapset ymmärtävät, miten lemmikkien kanssa ollaan, joskin kokonsa vuoksi ne eivät ehkä sovi taaperoiden tai vauvojen seuraan; ne tulevat yleensä hyvin toimeen muiden lemmikkien kanssa, joihin ne on tutustutettu pentuna, kuolaavat paljon, eikä niiden pitäisi liikkua tuntiin ennen ateriaa eikä tuntiin sen jälkeen mahalaukun kiertymän riskin vuoksi.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba inu, Shiba Inu, Japanese Shiba Inu",
      text: [
        "Shiba eli shiba inu on Japanista kotoisin oleva pieni pystykorva; sen nimi tarkoittaa ”pientä koiraa”, ja The Royal Kennel Clubin mukaan se kehitettiin metsästämään pieniä riistalintuja. FCI:n rotumääritelmä kuvaa pienen, tasapainoisen ja hyväluustoisen koiran, joka on luonteeltaan uskollinen, aisteiltaan tarkka ja erittäin valpas; sillä on karkea peitinkarva pehmeän, tiheän pohjavillan päällä, pienet, pystyt ja kolmionmuotoiset korvat ja paksu kiertynyt häntä. Värit ovat punainen, musta-ruskea ja seesami, aina vaalein ”urajiro”-merkein poskissa, rinnassa ja vatsapuolella. AKC:n rotumääritelmän mukaan urosten keskipaino on noin 23 paunaa (10 kg) ja narttujen 17 paunaa (8 kg).",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa kerran viikossa, toteaa, että rodusta lähtee karvaa, ja ilmoittaa sen eliniäksi yli 10 vuotta; laajassa brittiläisessä tutkimuksessa eliniän mediaani oli 14,6 vuotta. AKC kuvaa itsevarman, itsenäisen koiran, joka sopii paremmin kokeneelle omistajalle ja on onnellisimmillaan isompien lasten kanssa ja jota ei pitäisi koskaan päästää irti hihnasta aidatun tai suljetun alueen ulkopuolella. PetMD lisää, että se tarvitsee runsaasti henkistä virikettä ja hyötyy sosiaalistamisesta pentuna ja että sen hampaat pitäisi harjata joka päivä.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, Rhodesian Ridgeback, African Lion Dog",
      text: [
        "Rhodesiankoira on kotoisin eteläisestä Afrikasta. Sen tunnetuin piirre on selän harja, karvakaistale, joka kasvaa vastakkaiseen suuntaan kuin muu turkki. FCI:n rotumääritelmä kuvaa tasapainoisen, vahvan, lihaksikkaan, ketterän ja aktiivisen koiran, joka on arvokas, älykäs ja vieraita kohtaan pidättyväinen ja jota arvostetaan erityisesti vahtikoirana ja perhekoirana. Lyhyt, tiheä turkki on vaalean vehnänvärisestä punaiseen vehnänväriseen, ja rotumääritelmän mukaan urokset painavat noin 36,5 kg ja nartut 32 kg.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa kerran viikossa, toteaa, että rodusta lähtee karvaa ja että se sopii isoon taloon, jossa on iso piha, ja ilmoittaa sen eliniäksi yli 10 vuotta. PDSA kuvaa leikkisiä, voimakkaita ja hyvin uskollisia koiria, joiden saalisvietti on hyvin voimakas; niitä ei suositella ensikertalaisille omistajille, niitä ei pitäisi koskaan jättää yksin yli neljäksi tunniksi, ja ne tarvitsevat sosiaalistamista nuoresta pitäen; PDSA neuvoo myös pitämään taukoa syömisen ja liikunnan välillä. Woodgreen lisää, että ne viihtyvät parhaiten isompien lasten kanssa.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Continental Toy Spaniel, phalène (luppakorvainen muunnos), perhoskoira, Butterfly Dog",
      text: [
        "Papillon on Belgiasta ja Ranskasta kotoisin olevan rodun, mannermaisen kääpiöspanielin, pystykorvainen muunnos; luppakorvaista muunnosta kutsutaan nimellä phalène. FCI:n rotumääritelmä kuvaa pienen, tyylikkään ja pitkäkarvaisen kääpiöspanielin, jolla on eloisa luonne; sen korkeus on noin 28 cm, ja urokset painavat enintään 4,5 kg ja nartut enintään 5 kg. Suuret korvat ovat kuin perhosen levitetyt siivet, ja turkki on aina valkoinen värillisin laikuin.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa useammin kuin kerran viikossa, toteaa, että rodusta lähtee karvaa ja että se voi asua kerrostalossa, ja ilmoittaa sen eliniäksi yli 12 vuotta. PDSA kuvaa lempeitä, leikkisiä ja hyvin tottelevaisia koiria, jotka tulevat hyvin toimeen kaikkien kanssa ja tarvitsevat koulutusta ja sosiaalistamista nuorena; se ehdottaa turkinhoitoa kahdesta kolmeen kertaa viikossa. PetMD lisää, että papillonit tarvitsevat päivittäin henkistä virikettä, että niille voi kehittyä eroahdistus ja niiden hampaat pitäisi harjata joka päivä ja että hyvin pienet lapset voivat vahingossa satuttaa näin pientä koiraa.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, portie, Portuguese Water Dog",
      text: [
        "Portugalinvesikoira on kotoisin Portugalista, jossa se työskenteli kalastajien apuna. The Royal Kennel Clubin rotumääritelmä kuvaa vankan, lähes neliömäisen ja erittäin lihaksikkaan koiran – hyvin älykkään ja valtavan energisen, erinomaisen uimarin ja sukeltajan – jonka säkäkorkeus on 50–57 cm (urokset) ja 43–52 cm (nartut) ja paino 19–25 kg (urokset) ja 16–22 kg (nartut). Sen runsaassa yksikerroksisessa turkissa ei ole pohjavillaa, ja värit ovat musta, valkoinen, ruskea, musta-valkoinen tai ruskea-valkoinen; perinteisessä leijonatrimmauksessa kuono ja takaosa ajetaan lyhyiksi.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa joka päivä, toteaa, ettei rodusta lähde karvaa ja että se sopii isoon taloon, ja ilmoittaa sen eliniäksi yli 10 vuotta. PDSA kuvaa hyvin ystävällisiä ja rakastavia koiria, jotka tulevat hyvin toimeen muiden lemmikkien kanssa, ovat erinomaisia perhekoiria ja tarvitsevat koulutusta ja sosiaalistamista nuorena; se mainitsee lisäksi ammattitrimmaajan tekemän leikkaamisen ja muotoilun vuoden mittaan.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frise, Bichon Tenerife",
      text: [
        "Bichon frisé on ranskalais-belgialainen seurakoira. FCI:n rotumääritelmä kuvaa iloisen pienen koiran, jonka liikkeet ovat eloisat ja karva hyvin löyhää, valkoista ja korkkiruuvikiharaa – todellisen seuralaisen, jonka voi ottaa mukaan minne tahansa ja joka ei ole hermostunut eikä haukahtele usein; sen säkäkorkeus on 25–29 cm ja paino noin 5 kg. Aikuinen on aina puhtaanvalkoinen, ja sillä on hyvin tummat pyöreät silmät, musta kirsu, riippuvat korvat ja selän päällä kannettu runsaskarvainen häntä.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa joka päivä, toteaa, ettei rodusta lähde karvaa ja että se sopii kerrostaloasuntoon, ja ilmoittaa sen eliniäksi yli 12 vuotta. PDSA kuvaa hyvin helliä ja rakastavia koiria, jotka ovat erinomaisia lasten ja muiden lemmikkien kanssa, ja lisää, että turkki pitää trimmata parin kuukauden välein, usein ammattitrimmaajalla.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "newfie, newf, Newfoundland",
      text: [
        "Newfoundlandinkoira on kotoisin Kanadasta; FCI luokittelee sen vuoristotyyppisiin molosseihin ja tunnustaa kolme väriä: musta, valkomusta (landseer) ja ruskea. PDSA kutsuu newfoundlandinkoiria lempeiksi jättiläisiksi ja kertoo keskimääräiseksi säkäkorkeudeksi 66–71 cm ja keskimääräiseksi painoksi 50–69 kg; PetMD lisää, että rodun historian vuoksi ne ovat luontaisia uimareita.",
        "PDSA suosittelee aikuisille vähintään tunnin liikuntaa päivässä mutta neuvoo olemaan liikuttamatta pentuja liikaa, kun niiden luut ja nivelet ovat vielä kehittymässä; se kutsuu turkinhoitoa päivittäiseksi tehtäväksi, toteaa, että newfoundlandinkoirat ovat taipuvaisia kuolaamaan, ja ilmoittaa eliniäksi alle 10 vuotta. PetMD kutsuu rotua erinomaiseksi perhekoiraksi, joka tulee hyvin toimeen lasten, pienten lemmikkien ja muiden koirien kanssa, neuvoo valvomaan pieniä lapsia minkä tahansa koiran seurassa ja varoittaa, että joillekin voi kehittyä eroahdistus, kun ne jätetään yksin.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "dalmatialainen, Dalmatian, Carriage Dog, Firehouse Dog",
      text: [
        "Dalmatiankoira on kotoisin Kroatiasta; FCI luokittelee sen ajokoirien sukulaisrotuihin. Sen lyhyt, kiiltävä turkki on puhtaanvalkoinen selvärajaisin mustin tai maksanruskein täplin, ja rotumääritelmä edellyttää täplikkäitä korvia. FCI:n mukaan urosten säkäkorkeus on 56–62 cm ja narttujen 54–60 cm; PDSA kertoo keskipainoksi 18–27 kg.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja harjausta kerran viikossa ja kertoo, että rodusta lähtee karvaa ja että se sopii isoon taloon, jossa on piha. PDSA kutsuu dalmatiankoiria erinomaisiksi lemmikeiksi aktiivisiin perheisiin; ne sopivat paremmin perheisiin, joissa on isompia lapsia, tarvitsevat seuraa, eikä niitä pitäisi koskaan jättää yksin yli neljäksi tunniksi; PDSA mainitsee kuurouden rodun terveysongelmien joukossa ja toteaa, että kuulon tutkimiseen on olemassa BAER-testi.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler, Australian Cattle Dog",
      text: [
        "Australiankarjakoira on kotoisin Australiasta; FCI luokittelee sen karjakoiriin. The Kennel Clubin rotumääritelmä kuvaa vahvan, tiiviin työkoiran, jolla on sileä, säänkestävä kaksikerroksinen turkki, väriltään sininen (kirjava tai pilkullinen) tai tasaisesti punapilkullinen, ja kertoo säkäkorkeudeksi uroksilla 46–51 cm ja nartuilla 43–48 cm; PDSA kertoo keskipainoksi 16–20 kg.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja harjausta kerran viikossa ja kertoo, että rodusta lähtee karvaa. PDSA kuvaa erittäin älykkään ja energisen koiran, joka tarvitsee paljon fyysistä ja henkistä tekemistä; vahvan paimennusvaistonsa vuoksi se saattaa näykkiä juoksevien lasten kantapäitä, ja sosiaalistaminen ja koulutus nuoresta pitäen auttavat.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Whippet on kotoisin Isosta-Britanniasta; FCI luokittelee sen lyhytkarvaisiin vinttikoiriin. The Kennel Clubin rotumääritelmä kuvaa tasapainoisen yhdistelmän lihasvoimaa ja vahvuutta sekä ääriviivojen tyylikkyyttä ja sulavuutta; sillä on hieno, lyhyt ja tiivis turkki missä tahansa värissä tai väriyhdistelmässä merleä lukuun ottamatta sekä lempeä, hellä ja tasainen luonne. Säkäkorkeus on uroksilla 47–51 cm ja nartuilla 44–47 cm, ja PDSA kertoo keskipainoksi 11–18 kg.",
        "PDSA suosittelee vähintään tunnin liikuntaa joka päivä ja tilaisuuksia juosta vapaana turvallisella alueella sekä harjausta kerran viikossa pehmeällä harjalla. Se kutsuu whippetejä suosituksi valinnaksi perheille, koska ne ovat rauhallisia ja lempeitä lasten seurassa, mutta suosittelee kotia, jossa lapset ovat hieman vanhempia; whippetit eivät pidä yksin jäämisestä ja niiden saalisvietti on todella voimakas, joten PDSA ei suosittele pitämään niitä pienempien lemmikkien kanssa. Talvella takista voi olla apua, ja paksu, pehmeä makuualusta suojaa niiden esiin työntyviä luita.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "korthalsinseisoja, Korthals Griffon, Griffon d’arrêt à poil dur Korthals, Wirehaired Pointing Griffon, Griff",
      text: [
        "Korthalsingriffoni (Wirehaired Pointing Griffon, Korthals Griffon) on kotoisin Ranskasta; FCI luokittelee sen mannermaisiin kanakoiriin ja kutsuu sitä pohjimmiltaan monipuoliseksi kanakoiraksi. FCI:n rotumääritelmä kuvaa tarmokkaan, maalaismaisen koiran, joka on pidempi kuin korkea ja jolla on karhea, karkea turkki, joka ei ole koskaan kihara tai villava, aina ruskea kirsu ja mieluiten teräksenharmaa turkki ruskein (maksanruskein) laikuin; säkäkorkeus on uroksilla noin 55–60 cm ja nartuilla 50–55 cm, ja rotumääritelmä kutsuu rotua lempeäksi, ylpeäksi ja lasten kanssa hyvin lempeäksi. PetMD kertoo painoksi 35–70 paunaa (noin 16–32 kg).",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä, isoa taloa ja isoa pihaa sekä turkinhoitoa useammin kuin kerran viikossa. PetMD neuvoo harjaamaan viikoittain (joidenkin koirien turkki pitää myös nyppiä käsin), kertoo, että griffonit ovat yleensä kärsivällisiä ja lempeitä lasten kanssa, kun ne on pentuina sosiaalistettu, ja toteaa, että metsästyshistorian vuoksi niillä voi olla voimakas saalisvietti, joten pienemmät eläimet, kuten kissat ja kaniinit, voivat näyttää niiden silmissä jahdattavilta.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "chessie, Chesapeake Bay Retriever",
      text: [
        "Chesapeakelahdennoutaja, jota kutsutaan usein chessieksi, on kotoisin Yhdysvalloista; FCI luokittelee sen noutajiin. FCI:n rotumääritelmä kuvaa noutajan, joka työskentelee yhtä taitavasti maalla ja vedessä ja jonka koko ja massa eivät saa olla liiallisia; sillä on paksu, lyhyt peitinkarva tiheän, villavan pohjavillan päällä ja kirkkaat kellertävät tai meripihkanväriset silmät. Kaikki ruskean, kaislanvärin (sedge) ja kuivan heinän värin (deadgrass) sävyt hyväksytään, ja musta turkki johtaa hylkäämiseen. Säkäkorkeus on uroksilla 58–66 cm ja paino 29,5–36,5 kg, nartuilla 53–61 cm ja 25–32 kg.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä, isoa taloa ja isoa pihaa sekä turkinhoitoa kerran viikossa. PetMD kuvaa fiksun, iloisen ja äärimmäisen hellän koiran, joka voi alkaa tuhota paikkoja, jos se ei saa virikkeitä tai se jätetään liian pitkäksi aikaa yksin, kertoo, että asianmukaisen tutustuttamisen ja sosiaalistamisen jälkeen chessiet ovat erinomainen lisä perheeseen, ja neuvoo olemaan liikuttamatta koiraa juuri ennen syömistä tai heti sen jälkeen.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samojedi, Samoyed, Sammy",
      text: [
        "Samojedinkoira on kotoisin Pohjois-Venäjältä ja Siperiasta; FCI luokittelee sen pohjoismaisiin rekikoiriin. FCI:n rotumääritelmä kuvaa valkoisen, tyylikkään ja keskikokoisen arktisen pystykorvan, jolla on runsas, paksu ja tiheä arktinen turkki, tummanruskeat silmät, pienet, paksut ja pystyt korvat ja suupielistä hieman ylöspäin kääntyvät huulet, jotka muodostavat tunnusomaisen ”samojedihymyn”; turkki on puhtaanvalkoinen, kermanvärinen tai valkoinen keksinvärisin merkein, ja siniset tai eriväriset silmät johtavat hylkäämiseen. Ihannesäkäkorkeus on uroksilla 57 cm ja nartuilla 53 cm, ja kummallakin sukupuolella sallittu poikkeama on 3 cm.",
        "PDSA suosittelee vähintään kahden tunnin liikuntaa joka päivä ja päivittäistä turkinhoitoa ja kertoo, että samojedinkoirista lähtee karvaa hyvin usein, että ne ovat yleensä erinomaisia lasten kanssa ja uskollisia koko perheelle, ettei niitä pitäisi koskaan jättää yksin yli neljäksi tunniksi, että ne tarvitsevat taitavina karkailijoina hyvin tukevasti aidatun pihan ja että niillä on voimakas saalisvietti; se neuvoo myös pitämään taukoa syömisen jälkeen ennen liikuntaa. PetMD lisää, että samojedinkoirat eivät viihdy kuumassa.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, Scottish Terrier, Aberdeen Terrier",
      text: [
        "Skotlanninterrieri, jota kutsutaan usein scottieksi, on kotoisin Isosta-Britanniasta; FCI luokittelee sen pienikokoisiin terriereihin. The Kennel Clubin rotumääritelmä kuvaa tanakan, lyhytjalkaisen koiran, jonka ryhti on valpas ja joka antaa pienestä koostaan huolimatta vaikutelman suuresta voimasta ja toimeliaisuudesta; se on uskollinen ja luotettava, arvokas, itsenäinen ja pidättyväinen mutta rohkea ja hyvin älykäs – uskalias, mutta ei koskaan aggressiivinen. Sen tiivis kaksikerroksinen turkki on peitinkarvaltaan karkea ja jäykkä; väri on musta, vehnänvärinen tai juovikas missä tahansa sävyssä. Säkäkorkeus on 25–28 cm ja paino 8,5–10,5 kg.",
        "PDSA:n mukaan skotlanninterrierit tarvitsevat noin tunnin liikuntaa päivittäin ja päivittäistä turkinhoitoa sekä ammattitrimmaajan nyppimisen ja leikkaamisen 2–3 kuukauden välein; se kuvaa niitä uskollisiksi ja perheelleen omistautuneiksi ja kertoo, että ne voivat olla itsepäisiä, joten koulutus vaatii kärsivällisyyttä ja sitoutumista. PetMD:n mukaan ne voivat oikean koulutuksen ja sosiaalistamisen avulla olla hyviä perhekoiria, pennun sosiaalistaminen on tärkeää, eikä niitä pitäisi jättää yksin pitkiksi ajoiksi.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "weimaraner, Weimaraner, Weim",
      text: [
        "Weimarinseisoja on kotoisin Saksasta; FCI luokittelee sen mannermaisiin kanakoiriin ja tunnustaa lyhytkarvaisen ja pitkäkarvaisen muunnoksen. FCI:n rotumääritelmä kuvaa keskikokoisen tai suuren metsästyskoiran, joka on tyypiltään käytännöllinen käyttökoira, jänteinen ja hyvin lihaksikas, ja jolla on meripihkanväriset silmät ja leveät, melko pitkät korvat; turkki on hopean-, metsäkauriin- tai hiirenharmaa, vain pienet valkoiset merkit rinnassa ja varpaissa ovat sallittuja, ja mikä tahansa muu kuin harmaa väri johtaa hylkäämiseen. Säkäkorkeus on uroksilla 59–70 cm ja paino noin 30–40 kg, nartuilla 57–65 cm ja noin 25–35 kg.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä, isoa taloa ja isoa pihaa sekä turkinhoitoa kerran viikossa. PDSA:n mukaan weimarinseisojat ovat oikeissa käsissä upeita perhekoiria ja pärjäävät parhaiten rotuun perehtyneiden omistajien kanssa, mutta PDSA ei suosittele niitä koteihin, joissa on pienempiä lapsia tai pienempiä lemmikkejä, niiden hyvin voimakkaan saalisvietin vuoksi; sen mukaan niille voi kehittyä eroahdistus, jos ne jätetään yksin, ja se neuvoo sosiaalistamaan ne nuoresta pitäen ja pitämään taukoa syömisen ja liikunnan välillä. PetMD lisää korvien puhdistuksen ja kylvyn kerran kuukaudessa.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Italian Greyhound, iggy",
      text: [
        "Italianvinttikoira on kotoisin Italiasta; FCI luokittelee sen nimellä Piccolo Levriero Italiano lyhytkarvaisiin vinttikoiriin. The Kennel Clubin rotumääritelmä kuvaa pienoiskoon greyhoundin, joka on kaikilta mittasuhteiltaan hoikempi, tyylikäs, sulava ja nopealiikkeinen sekä älykäs, hellä ja eloisa, vaikka se voi vaikuttaa etäiseltä; sillä on lyhyt, hieno ja kiiltävä turkki ohuen ihon päällä. Säkäkorkeus on 32–38 cm ja paino 3,6–4,5 kg; hyväksyttyjä värejä ovat musta, sininen, kerma, fawn, punainen ja valkoinen tai mikä tahansa niistä yhdistettynä valkoiseen – ei koskaan merle, juovikas tai ruskeat merkit.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja kertoo, että rotu sopii pieneen taloon niin kaupungissa kuin maalla, tarvitsee turkinhoitoa kerran viikossa eikä siitä lähde karvaa. PDSA:n mukaan italianvinttikoirat ovat täynnä energiaa; niitä pitäisi liikuttaa suljetulla alueella, koska niitä voi olla vaikea kutsua takaisin, kun ne näkevät saaliin, ne voivat olla arkoja, joten varhainen sosiaalistaminen on välttämätöntä, ja – koska niiden luut ovat kasvuaikana hauraat – ne eivät ehkä ole ihanteellinen rotu koteihin, joissa on pieniä lapsia tai muita lemmikkejä. PetMD lisää, että niiden ohut turkki ei pidä niitä lämpiminä, joten ne palelevat helposti.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "jättisnautseri, Riesenschnauzer, Giant Schnauzer, Munich Schnauzer",
      text: [
        "Suursnautseri on kotoisin Saksasta; FCI luokittelee sen nimellä Riesenschnauzer pinsereihin ja snautsereihin. The Royal Kennel Clubin rotumääritelmä kuvaa voimakasrakenteisen, vankan ja jänteisen koiran, joka näyttää lähes neliömäiseltä ja on rohkea, luotettava, hyväluonteinen ja tasapainoinen; sillä on karkea, jäykkä peitinkarva ja hyvä pohjavilla. Säkäkorkeus on uroksilla 65–70 cm ja nartuilla 60–65 cm; FCI:n rotumääritelmä kertoo painoksi 35–47 kg. Hyväksyttyjä värejä ovat puhdas musta, pippuri-suola tumman kasvomaskin kanssa sekä musta-hopea – muita värejä ei hyväksytä.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja kertoo, että rotu sopii isoon taloon, jossa on iso piha, tarvitsee turkinhoitoa joka päivä eikä siitä lähde karvaa. PDSA:n mukaan turkki tarvitsee päivittäistä hoitoa ja säännöllistä trimmausta, suursnautserit voivat olla rakastettavia lemmikkejä perheille, joissa on isompia lapsia, jos ne on sosiaalistettu hyvin pentuina, ja nämä vahvatahtoiset koirat sopivat kokeneille omistajille. PetMD lisää, että ammattilainen nyppii turkin käsin muutaman kuukauden välein ja että rotu ei viihdy kodeissa, joissa ihmiset ovat harvoin kotona.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "bloodhound, Chien de Saint-Hubert, St. Hubert Hound, Sleuth Hound",
      text: [
        "Vihikoira (bloodhound) on kotoisin Belgiasta; FCI luokittelee sen nimellä Chien de Saint-Hubert suurikokoisiin ajokoiriin. FCI:n rotumääritelmä kuvaa kaikista ajokoirista voimakkaimman: lempeän, rauhallisen, ystävällisen ja ihmisiä kohtaan seurallisen, erityisesti omistajaansa kiintyneen koiran, jolla on lyhyt, tiheä ja säänkestävä turkki ja notkea, löysä nahka. Urokset painavat noin 46–54 kg ja nartut noin 40–48 kg; värejä on kolme: musta-punaruskea, maksanruskea-punaruskea ja punainen.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja kertoo, että rotu sopii isoon taloon, jossa on iso piha, tarvitsee turkinhoitoa kerran viikossa ja siitä lähtee karvaa. PDSA:n mukaan vihikoirat sopivat paremmin kokeneille omistajille, eikä niitä suositella koteihin, joissa on pienempiä lapsia tai pienempiä lemmikkejä, niiden koon ja hyvin voimakkaan saalisvietin vuoksi; ne kuolaavat, ja niiden ihopoimut pitää pitää puhtaina ja kuivina. PDSA neuvoo myös pitämään taukoa syömisen ja liikunnan välillä.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "akita, American Akita, Great Japanese Dog",
      text: [
        "Tämän eläinhakemiston akita on amerikkalaista tyyppiä: FCI rekisteröi sen nimellä amerikanakita (American Akita), ja se on japanilaista alkuperää oleva rotu, erillinen japanilaisesta akitasta (akita inu). FCI:n rotumääritelmä kuvaa suuren, tukevarakenteisen ja tasapainoisen koiran, jolla on paljon massaa ja raskas luusto, pienet pystyt korvat ja selän päällä kannettu iso häntä; urosten säkäkorkeus on 66–71 cm. Kaikki värit ovat sallittuja, kuten punainen, fawn, valkoinen, pinto tai juovikas. PDSA kertoo keskipainoksi 31–59 kg.",
        "PDSA kuvaa uskomattoman uskollisia perhekoiria, jotka ovat itsenäisiä ja hyvin suuria, joten ne pärjäävät parhaiten kokeneiden omistajien kanssa; se ei suosittelisi amerikanakitaa kotiin, jossa on pieniä lapsia, ja neuvoo olemaan jättämättä niitä yksin, koska moni ei siedä sitä hyvin. Se suosittelee vähintään kahden tunnin liikuntaa joka päivä, sosiaalistamista nuoresta pitäen, taukoa syömisen ja liikunnan välillä ja harjausta vähintään kerran viikossa – amerikanakitoista lähtee paljon karvaa. Se mainitsee myös voimakkaan saalisvietin ja sen, että ne voivat ylikuumentua hyvin kuumalla säällä.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "cardi, corgi, Cardigan Welsh Corgi",
      text: [
        "Welsh corgi cardigan on kotoisin Isosta-Britanniasta; FCI luokittelee sen karjakoiriin. American Kennel Clubin rotumääritelmä kertoo säkäkorkeudeksi 10,5–12,5 tuumaa (noin 27–32 cm) ja urosten ihannepainoksi 30–38 paunaa (noin 14–17 kg). Toisin kuin serkullaan pembrokella, sillä on pitkä, tuuhea häntä.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä, pitää pientä taloa, jossa on pieni tai keskikokoinen piha, riittävänä ja kertoo, että rotu tarvitsee turkinhoitoa useammin kuin kerran viikossa ja siitä lähtee karvaa; se ilmoittaa eliniäksi yli 12 vuotta ja lukee cardiganin vaarantuneisiin brittiläisiin alkuperäisrotuihin. PDSA:n mukaan welsh corgit haluavat miellyttää, joten koulutuksen pitäisi olla melko helppoa, kaksi tai kolme harjausta viikossa riittää yleensä, ja ne saattavat näykkiä juoksevien lasten kantapäitä – sosiaalistaminen lasten kanssa ja koulutus nuoresta pitäen auttavat.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, GWP, German Wirehaired Pointer",
      text: [
        "Karkeakarvainen saksanseisoja on kotoisin Saksasta; FCI luokittelee sen nimellä Deutsch Drahthaar mannermaisiin kanakoiriin. The Royal Kennel Clubin rotumääritelmä kuvaa keskikokoisen metsästyskoiran, jonka karkea karva peittää ihon kokonaan – lempeän, hellän ja tasaisen, valppaan, tottelevaisen ja hyvin uskollisen. Urosten säkäkorkeus on 60–67 cm ja paino 25–34 kg, narttujen 56–62 cm ja 20,5–29 kg. Rotumääritelmän värit ovat maksanruskea-valkoinen, yksivärinen maksanruskea ja musta-valkoinen.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja kertoo, että rotu sopii maalle isoon taloon, jossa on iso piha, tarvitsee turkinhoitoa useammin kuin kerran viikossa ja siitä lähtee karvaa. PetMD:n mukaan karkeakarvaiset saksanseisojat tarvitsevat paljon liikuntaa ja henkistä virikettä, kiintyvät perheeseensä läheisesti ja voivat olla erinomaisia perhekoiria, kun ne koulutetaan ja sosiaalistetaan varhain, ja ne pärjäävät hyvin lasten kanssa, joille on opetettu, miten eläinten kanssa toimitaan; niitä ei pitäisi koskaan jättää yksin pitkiksi ajoiksi, ja niillä on voimakas saalisvietti. Turkki nypitään käsin kahdesti vuodessa.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "bernhardilainen, St. Bernhardshund, Bernhardiner, Saint Bernard",
      text: [
        "Bernhardinkoira on kotoisin Sveitsistä; FCI luokittelee sen vuoristotyyppisiin molosseihin. FCI:n rotumääritelmä kuvaa luonteeltaan ystävällisen, rauhallisesta eloisaan vaihtelevan ja valppaan koiran ja tunnustaa kaksi muunnosta: lyhytkarvaisen, jonka turkki on tiheä, sileä ja tiivis, ja pitkäkarvaisen. Urosten säkäkorkeus on vähintään 70 cm ja narttujen vähintään 65 cm, enintään 90 ja 80 cm; PDSA kertoo painoksi 54–81 kg.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja kertoo, että rotu sopii isoon taloon, jossa on iso piha, tarvitsee turkinhoitoa useammin kuin kerran viikossa, siitä lähtee karvaa ja se elää yleensä alle kymmenen vuotta. PDSA:n mukaan bernhardinkoirat rakastavat perheensä seuraa ja ovat erinomaisia kaikenikäisten ihmisten, myös lasten, kanssa; ne pitäisi sosiaalistaa hyvin pentuina, ne tarvitsevat harjausta vähintään kolme kertaa viikossa, ne kuolaavat, eivät viihdy yhtä hyvin helteellä ja tarvitsevat taukoa syömisen ja liikunnan välillä. PetMD lisää, että näille ihmisrakkaille koirille voi kehittyä eroahdistus, jos ne jätetään yksin pitkiksi ajoiksi.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffi, staffie, Staffordshire Bull Terrier, Stafford",
      text: [
        "Staffordshirenbullterrieri on kotoisin Isosta-Britanniasta; FCI luokittelee sen bullterrierityyppisiin terriereihin. FCI:n rotumääritelmä kuvaa sileäkarvaisen, tasapainoisen ja kokoonsa nähden hyvin voimakkaan koiran – perinteisesti lannistumattoman rohkean ja sitkeän, hyvin älykkään ja hellän, etenkin lapsia kohtaan. Säkäkorkeus on 35,5–40,5 cm; urokset painavat 12,7–17 kg ja nartut 11–15,4 kg. Värit ovat juovikas, punainen, fawn, musta, sininen tai valkoinen, joko yksivärisenä tai yhdistettynä valkoiseen.",
        "The Royal Kennel Club kutsuu sitä upeaksi perhekoiraksi ja suosittelee liikuntaa enintään tunnin päivässä; se tarvitsee turkinhoitoa kerran viikossa, siitä lähtee karvaa, ja se elää yleensä yli 12 vuotta. PDSA:n mukaan staffit ovat lapsia kohtaan suvaitsevaisia ja lempeitä, mutta ihmisrakkaina koirina niiden tiedetään kärsivän eroahdistuksesta, kun ne jätetään yksin; ne tunnetaan pureskelijoina, ja hyvin voimakkaan saalisviettinsä vuoksi pienemmät lemmikit eivät ole hyvä ajatus niiden seurassa.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Airedale Terrier, King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "Airedalenterrieri on kotoisin Isosta-Britanniasta; FCI luokittelee sen isoihin ja keskikokoisiin terriereihin. FCI:n rotumääritelmä kutsuu sitä terriereistä suurimmaksi – lihaksikkaaksi, aktiiviseksi ja melko tiiviiksi koiraksi, joka on ulospäin suuntautunut ja itsevarma, ystävällinen, rohkea ja älykäs, aina valpas, ei aggressiivinen mutta peloton. Urosten säkäkorkeus on noin 58–61 cm ja narttujen noin 56–59 cm. Sen karkea, tiheä ja jäykkä turkki on punaruskea, ja selässä on musta tai harmaansekainen satula.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä; turkki tarvitsee hoitoa joka päivä, siitä ei lähde karvaa, ja rotu elää yleensä yli 10 vuotta. PetMD kuvaa erinomaisia perhekoiria, jotka hyvin koulutettuina tulevat yleensä toimeen lasten kanssa, mutta joita ei pitäisi jättää liian pitkäksi aikaa oman onnensa nojaan; se neuvoo harjaamaan muutaman kerran viikossa, puhdistamaan korvat nopeasti joka viikko ja käymään ammattitrimmaajalla kolme tai neljä kertaa vuodessa.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "jackrussell, Jack Russell Terrier, Russell Terrier (AKC), JRT",
      text: [
        "Jackrussellinterrieri – American Kennel Club kutsuu sitä nimellä Russell Terrier – on kotoisin Englannista, ja se kehitettiin Australiassa; FCI luokittelee sen pienikokoisiin terriereihin. Sen rotumääritelmä kuvaa vahvan, aktiivisen ja notkean, hyvin persoonallisen työterrierin: eloisan, valppaan ja aktiivisen, rohkean ja pelottoman, ystävällisen mutta hillityn itsevarman. Säkäkorkeus on 25–30 cm ja paino noin 5–6 kg. Sen sileä, karkea tai välimuotoinen (broken) turkki on pääosin valkoinen mustin ja/tai ruskein merkein.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa kerran viikossa; rodusta lähtee karvaa, ja se elää yleensä yli 10 vuotta. PDSA kuvaa fiksuja, eloisia koiria, jotka voivat olla hyviä perhekoiria, jos ne koulutetaan ja sosiaalistetaan nuoresta pitäen, mutta sopivat paremmin perheisiin, joissa lapset ovat hieman vanhempia; niiden saalisvietti on hyvin voimakas, joten pienempiä lemmikkejä ei suositella, ja ne rakastavat kaivamista.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff, Bullmastiff",
      text: [
        "Bullmastiffi on 1800-luvulta peräisin oleva vanha englantilainen vahtikoirarotu, joka polveutuu bulldoggista ja vanhasta englanninmastiffista; FCI luokittelee sen molosseihin. Sen rotumääritelmä kuvaa voimakkaan, sopusuhtaisen koiran, joka osoittaa suurta voimaa olematta kömpelö – kestävän, aktiivisen, luotettavan, eloisan, valppaan ja uskollisen. Urosten säkäkorkeus on 64–69 cm ja paino 50–59 kg, narttujen 61–66 cm ja 41–50 kg. Lyhyt, karkea turkki on mikä tahansa fawnin, punaisen tai juovikkaan sävy, aina mustalla kuonolla.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa kerran viikossa, ja rotu elää yleensä alle 10 vuotta. PDSA kuvaa hyvin uskollisia koiria, jotka kokonsa ja voimansa vuoksi sopivat paremmin aikuisten koteihin tai perheisiin, joissa on isompia lapsia; ne tarvitsevat varhaista sosiaalistamista, niiden kotona olisi mieluiten aina joku, niiden saalisvietti on hyvin voimakas, ne kuolaavat paljon ja tarvitsevat taukoa syömisen ja liikunnan välillä.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested Dog, powderpuff, Powder Puff",
      text: [
        "Kiinanharjakoira on Kiinasta kotoisin oleva pieni, aktiivinen ja siro seurakoira; FCI luokittelee sen karvattomiin koiriin. Siitä on kaksi muunnosta: karvaton, jonka vartalo on sileä ja paljas ja jolla on karvaa vain päässä (harja), tassuissa ja hännässä, sekä powderpuff, jota peittää kokonaan pitkän, pehmeän karvan verho. Urosten säkäkorkeus on 28–33 cm ja narttujen 23–30 cm; PetMD kertoo painoksi 8–12 paunaa (3,6–5,4 kg). Kaikki värit ovat sallittuja paitsi merle, ja sen luonnetta kuvataan iloiseksi, ei koskaan ilkeäksi.",
        "The Royal Kennel Club suosittelee liikuntaa enintään 30 minuuttia päivässä ja turkinhoitoa kerran viikossa; rotu sopii kerrostaloasuntoon ja elää yleensä yli 12 vuotta. PetMD kuvaa ystävällisen koiran, joka sopeutuu useimpiin perheisiin, myös niihin, joissa on lapsia ja muita lemmikkejä – kaikkia sen ja lasten yhteisiä hetkiä pitäisi valvoa. Paljas iho tarvitsee suojaa auringolta ja kylmältä, kynnet pitäisi tarkistaa joka viikko, ja pennut tarvitsevat varhaista, johdonmukaista sosiaalistamista.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "tolleri, toller, Nova Scotia Duck Tolling Retriever, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "Novascotiannoutaja eli tolleri on Kanadasta kotoisin oleva noutaja; sen FCI:n rotumääritelmä kuvaa, miten se juoksee ja leikkii rantaviivalla sorsien näkyvissä houkutellakseen ne lähemmäs, minkä jälkeen se lähetetään noutamaan linnut. Rotumääritelmä kuvaa keskikokoisen, voimakkaan, tiiviin ja hyvin lihaksikkaan koiran, joka on erittäin älykäs ja helppo kouluttaa ja jolla on suuri kestävyys. FCI:n mukaan urosten koko on 48–51 cm ja 20–23 kg, narttujen 45–48 cm ja 17–20 kg. Vettä hylkivä kaksikerroksinen turkki on punaisen tai oranssin eri sävyjä, ja siinä on yleensä valkoista hännänpäässä, tassuissa, rinnassa tai läsinä.",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja turkinhoitoa useammin kuin kerran viikossa, ja rodusta lähtee karvaa; PetMD neuvoo harjaamaan kerran tai kaksi viikossa. Laajan brittiläisen tutkimuksen (McMillan 2024, Dogs Trustin kautta) mukaan elinajanodotteen mediaani on 13,2 vuotta, PetMD:n mukaan elinikä on 12–14 vuotta, ja muiden keskikokoisten koirien tavoin se on täysikasvuinen noin 12–15 kuukauden iässä (PetMD). AKC kuvaa erittäin helliä koiria, jotka ovat yleensä hyviä lasten kanssa, tarvitsevat paljon fyysistä liikuntaa ja henkistä virikettä, joilla voi olla voimakas saalisvietti pienempiä eläimiä kohtaan ja jotka hyötyvät varhaisesta sosiaalistamisesta ja pentukursseista.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, Cairnie, Cairn Terrier",
      text: [
        "Cairnterrieri on kotoisin Isosta-Britanniasta; FCI luokittelee sen pienikokoisiin terriereihin. The Kennel Clubin rotumääritelmä kuvaa ketterän ja valppaan terrierin, joka on olemukseltaan työkoiramainen ja luonnollinen – aktiivinen, sisukas ja kestävä, luonteeltaan peloton ja iloinen, itsevarma mutta ei aggressiivinen. Sen säänkestävässä kaksikerroksisessa turkissa on runsas, karkea peitinkarva; väri on kerma, vehnänvärinen, punainen, harmaa tai lähes musta, juovikkuus on hyväksyttävää, ja tummat korvat ja kuono ovat tyypillisiä. Säkäkorkeus on noin 28–31 cm ja ihannepaino 6–7,5 kg.",
        "PDSA suosittelee vähintään tunnin liikuntaa päivässä ja kertoo, että cairnterriereillä on rajattomasti energiaa ja vahva metsästysvaisto, joten ne pitää sosiaalistaa varhain kissojen ja muiden pienten lemmikkien kanssa ja vapaana ollessaan niiden kanssa pitää olla varovainen, ja että sosiaalistettuina ne tulevat erittäin hyvin toimeen lasten kanssa ja ovat erinomaisia perhekoiria. Se neuvoo nyppimään turkin käsin kahdesti vuodessa ja hoitamaan turkkia kerran tai kaksi viikossa; Dogs Trustin mukaan niistä lähtee hyvin vähän karvaa. Laajan brittiläisen tutkimuksen (McMillan 2024, Dogs Trustin kautta) mukaan elinajanodotteen mediaani on 14,0 vuotta, PetMD:n mukaan elinikä on 13–15 vuotta, ja muiden pienten koirien tavoin se on täysikasvuinen noin 9–12 kuukauden iässä (PetMD). PetMD lisää, että ne tarvitsevat paljon liikuntaa ja henkistä virikettä.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "English Bull Terrier, Bull Terrier, bully",
      text: [
        "Bullterrieri on kotoisin Isosta-Britanniasta; FCI luokittelee sen bullterrierityyppisiin terriereihin (ryhmä 3). Se on keskikokoinen, lyhytkarvainen terrieri: PDSA kertoo keskimääräiseksi säkäkorkeudeksi 51–61 cm ja keskipainoksi 22–31 kg, ja PetMD kuvaa urheilullisen rakenteen, noin 21–22 tuumaa ja 50–70 paunaa. PetMD:n mukaan säännöllinen liikunta on välttämätöntä, ja bullterrierit ovat helliä perhettään, myös lapsia, kohtaan, mutta eivät aina ystävällisiä muita koiria tai kissoja kohtaan, ja varhainen ja toistuva sosiaalistaminen ja koulutus ovat avainasemassa.",
        "PDSA suosittelee vähintään tunnin liikuntaa päivässä useampaan osaan jaettuna ja taukoa aterioiden jälkeen ennen liikuntaa. Sen mukaan hyvin sosiaalistettu bullterrieri tulee toimeen kaikenikäisten ihmisten kanssa, mutta koska se innostuu helposti, se pärjää paremmin isompien lasten kanssa; se kaipaa seuraa niin paljon kuin mahdollista, ja sillä on voimakas saalisvietti, joten kissojen ja muiden pienten eläinten kanssa tarvitaan varovaisuutta. Harjaus kerran viikossa riittää turkille. PDSA kertoo keskimääräiseksi eliniäksi yli 10 vuotta ja PetMD 12–13 vuotta; muiden keskikokoisten koirien tavoin se on täysikasvuinen noin 12–15 kuukauden iässä (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Zwergpinscher, Miniature Pinscher, Min Pin",
      text: [
        "Kääpiöpinseri on kotoisin Saksasta; FCI luokittelee sen pinsereihin ja snautsereihin (ryhmä 2) ja kuvaa sitä saksanpinserin pienennetyksi kuvaksi – eloisaksi, temperamenttiseksi, itsevarmaksi ja tasapainoiseksi. Sen turkki on lyhyt, tiheä, sileä ja kiiltävä, joko yksivärinen hirvenpunaisesta tummaan punaruskeaan tai musta punaruskein merkein, ja häntä on luonnollinen. FCI:n rotumääritelmä kertoo sekä uroksille että nartuille säkäkorkeudeksi 25–30 cm ja painoksi 4–6 kg; muiden kääpiökoirien tavoin se on täysikasvuinen noin 8–12 kuukauden iässä (PetMD).",
        "PDSA suosittelee näille energisille, touhukkaille pikkukoirille enintään puolen tunnin liikuntaa päivässä, kertoo, että harjaus kerran viikossa riittää yleensä turkille, ja toteaa, että ne voivat olla itsepäisiä ja itsenäisiä, joten koulutus vaatii harjoitusta ja kärsivällisyyttä. PetMD:n mukaan ne voivat oikean sosiaalistamisen ja koulutuksen avulla olla erinomaisia perhekoiria. VCA kuvaa rotua leikkisäksi ja erittäin hyväksi lasten kanssa, vaikka hyvin pienet tai kurittomat lapset voivat satuttaa sitä kovakouraisella leikillä, ja kertoo, että ohuen turkkinsa ja pienen kokonsa vuoksi se on altis kylmettymiselle. PDSA kertoo keskimääräiseksi eliniäksi yli 12 vuotta ja PetMD 12–16 vuotta.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Patou, Chien de Montagne des Pyrénées, Pyrenean Mountain Dog",
      text: [
        "Pyreneittenkoira – Yhdysvalloissa Great Pyrenees – on kotoisin Ranskasta; FCI luokittelee sen vuoristotyyppisiin molosseihin (ryhmä 2) ja kuvaa hyvin suurikokoisen, vaikuttavan ja vahvarakenteisen koiran, jossa on kuitenkin tiettyä tyylikkyyttä. Sen turkki on valkoinen tai valkoinen, jossa on päässä ja korvissa mäyränharmaita, sudenharmaita, vaaleankeltaisia tai oransseja laikkuja. FCI:n rotumääritelmä kertoo säkäkorkeudeksi uroksilla 70–80 cm ja nartuilla 65–75 cm; PDSA kertoo keskipainoksi 40–50 kg. Muiden jättiläiskoirien tavoin se on täysikasvuinen noin 18–24 kuukauden iässä (PetMD).",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja kertoo, että rotu sopii isoon taloon, jossa on iso piha, tarvitsee turkinhoitoa useammin kuin kerran viikossa ja siitä lähtee karvaa, ja ilmoittaa eliniäksi alle 10 vuotta (PetMD ja VCA kertovat 10–12 vuotta). PDSA kutsuu niitä lempeiksi jättiläisiksi – rauhallisiksi, hyväluonteisiksi koiriksi, jotka tulevat yleensä hyvin toimeen kaikkien kanssa – ja kertoo, että koulutus vaatii kärsivällisyyttä ja palkitsemiseen perustuvia menetelmiä. VCA:n mukaan pyreneittenkoira on omistautunut perheelleen, etenkin lapsille, ja varhainen sosiaalistaminen on hyvin tärkeää; PetMD:n mukaan se tulee hyvin toimeen muiden lemmikkien kanssa mutta saattaa sopia parhaiten koteihin, joissa ei ole pienempiä lapsia, ja se neuvoo välttämään rajua liikuntaa ruokailujen aikoihin mahalaukun kiertymän riskin vuoksi.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "irlanninsileäterrieri, wheaten, Soft Coated Wheaten Terrier, Wheaten Terrier, SCWT",
      text: [
        "Vehnäterrieri on kotoisin Irlannista; FCI luokittelee sen nimellä Irish Soft Coated Wheaten Terrier isoihin ja keskikokoisiin terriereihin. The Royal Kennel Clubin rotumääritelmä kuvaa keskikokoisen, tiiviin ja ryhdikkään terrierin, jolla on pehmeä, silkkinen ja vehnänvärinen turkki, joka laskeutuu löysinä kiharoina tai laineina – hyväluonteisen, eloisan ja sisukkaan, täynnä itsevarmuutta ja huumoria. Ainoa väri on hyvä, kirkas vehnänvärinen. PDSA kertoo keskimääräiseksi säkäkorkeudeksi 46–49 cm ja keskipainoksi 16–20,5 kg (The Kennel Clubin rotumääritelmä kertoo urosten painoksi 16–20,5 kg, nartut ovat hieman kevyempiä); muiden keskikokoisten koirien tavoin se on täysikasvuinen noin 12–15 kuukauden iässä (PetMD).",
        "The Royal Kennel Club suosittelee liikuntaa enintään tunnin päivässä ja kertoo, että rotu sopii pieneen taloon, tarvitsee turkinhoitoa joka päivä eikä siitä lähde karvaa. Laajan brittiläisen tutkimuksen (McMillan 2024, Dogs Trustin kautta) mukaan elinajanodotteen mediaani on 13,7 vuotta; PetMD ja VCA kertovat 12–14 vuotta. PDSA kutsuu niitä ystävällisiksi, luotettaviksi koiriksi, jotka ovat erinomaisia perhekoiria, vaikka ne voivat olla hieman itsepäisiä. VCA:n mukaan niiden lempeä, leikkisä luonne tekee niistä hyvän seuran lapsille; PetMD:n mukaan niiden ja lasten yhteisiä hetkiä pitäisi valvoa, ne eivät pidä pitkistä yksinoloista, ja se suosittelee ammattitrimmausta 4–6 viikon välein, kylpyä noin kerran kuukaudessa ja korvien puhdistusta 1–2 viikon välein.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Irish Wolfhound, Wolfhound, Cú Faoil",
      text: [
        "Irlanninsusikoira on kotoisin Irlannista; FCI luokittelee sen karkeakarvaisiin vinttikoiriin. PDSA kertoo keskimääräiseksi säkäkorkeudeksi 71–79 cm ja keskipainoksi 40–55 kg; muiden jättiläiskoirien tavoin se on täysikasvuinen noin 18–24 kuukauden iässä (PetMD). The Royal Kennel Club luokittelee sen kooltaan erittäin suureksi ja kertoo, että se sopii maalle isoon taloon, jossa on iso piha.",
        "The Royal Kennel Club suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa useammin kuin kerran viikossa ja kertoo, että rodusta lähtee karvaa. The Kennel Club ja PDSA kertovat eliniäksi alle 10 vuotta, PetMD 6–8 vuotta. PDSA ei suosittele rotua koteihin, joissa on pienempiä lapsia, sen koon ja voiman vuoksi eikä pienempien lemmikkien seuraan sen voimakkaan saalisvietin vuoksi, ja sen mukaan sitä ei pitäisi koskaan jättää yksin yli neljäksi tunniksi. PetMD neuvoo sosiaalistamaan pennun siitä päivästä alkaen, kun se tulee kotiin, välttämään liikuntaa juuri ennen syömistä ja heti sen jälkeen (mahalaukun kiertymä) ja puhdistamaan korvat 2–4 viikon välein.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaff, Am Staff, American Staffordshire Terrier, Staffordshire Terrier",
      text: [
        "Amerikanstaffordshirenterrieri on kotoisin Yhdysvalloista; FCI luokittelee sen bullterrierityyppisiin terriereihin. Sen rotumääritelmä edellyttää kokoon nähden suurta voimaa ja kertoo säkäkorkeudeksi uroksilla 46–48 cm ja nartuilla 43–46 cm, mutta ei mainitse painoa. PetMD kertoo kummallekin sukupuolelle painoksi 40–70 paunaa (noin 18–32 kg); tämänkokoinen koira on täysikasvuinen noin 12–15 kuukauden iässä (PetMD).",
        "PetMD suosittelee vähintään 60 minuutin liikuntaa päivässä ja kertoo, että rotu on kärsivällinen ja rakastava lapsia kohtaan, että se voi olla altis eroahdistukselle ja että sen voimakas saalisvietti voi vaikeuttaa elämää pienempien koirien tai kissojen kanssa. Brittiläisen tutkimuksen (McMillan ym. 2024, Dogs Trustin taulukoimana) mukaan elinajanodotteen mediaani on 12,5 vuotta; PetMD kertoo 12–16 vuotta. VCA suosittelee viikoittaista harjausta; PetMD neuvoo sosiaalistamaan pennun, välttämään liikuntaa heti aterian jälkeen (mahalaukun kiertymä) sekä kylvettämään koiran ja puhdistamaan sen korvat noin 4–6 viikon välein.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, lagotti, tryffelikoira, Romagna Water Dog",
      text: [
        "Lagotto romagnolo on Italiasta kotoisin oleva pieni tai keskikokoinen kiharakarvainen vesikoira, joka tunnetaan tryffelikoirana; FCI luokittelee sen vesikoiriin. Sen rotumääritelmä kertoo säkäkorkeudeksi uroksilla 43–48 cm ja painoksi 13–16 kg, nartuilla 41–46 cm ja 11–14 kg; tämänkokoinen koira on täysikasvuinen noin 12–15 kuukauden iässä (PetMD).",
        "The Royal Kennel Club kutsuu sitä erinomaiseksi ja valppaaksi perheen seuralaiseksi, suosittelee liikuntaa yli kaksi tuntia päivässä ja turkinhoitoa useammin kuin kerran viikossa, kertoo, ettei siitä lähde karvaa, ja ilmoittaa eliniäksi yli 12 vuotta; PetMD:n mukaan lagotot voivat elää 15–17-vuotiaiksi. PetMD toteaa, että se tarvitsee jatkuvaa henkistä ja fyysistä virikettä ja runsasta sosiaalistamista, koska se voi olla ujo; Woodgreenin mukaan sillä voi olla vaikeaa, jos se jätetään liian usein yksin, ja se suosittelee ammattitrimmausta 6–8 viikon välein.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamuutti, Alaskan Malamute, Malamute, Mal",
      text: [
        "Alaskanmalamuutti on yksi vanhimmista arktisista rekikoirista: voimakas ja tukevarakenteinen pohjoinen rekikoira Yhdysvalloista, ja sillä on paksu, karkea turkki. FCI:n rotumääritelmä kertoo toivottavaksi kooksi uroksilla 63,5 cm ja 38 kg ja nartuilla 58,5 cm ja 34 kg; PDSA kertoo 58–64 cm ja 34–39 kg. Tämänkokoinen koira on täysikasvuinen noin 15–18 kuukauden iässä (PetMD), ja PDSA kertoo eliniäksi yli 10 vuotta (PetMD: 10–14 vuotta).",
        "PDSA suosittelee joka päivä vähintään kaksi tuntia raskasta liikuntaa ja päivittäistä harjausta ja kertoo, että malamuuteista lähtee paljon karvaa, niillä on hyvin voimakas saalisvietti, niitä ei pitäisi jättää yksin yli neljäksi tunniksi ja ne sopivat aktiivisille aikuisille tai perheisiin, joissa on isompia lapsia; se kutsuu niitä haastaviksi ensikertalaisille omistajille. PetMD neuvoo tarkistamaan korvat kerran viikossa ja kylvettämään 6–8 viikon välein ja toteaa, että paksu turkki tekee kuumasta säästä niille vaikeaa.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "haukkumaton koira, African Barkless Dog, Congo Dog",
      text: [
        "Basenji on Keski-Afrikasta kotoisin oleva kevytrakenteinen ja hienoluustoinen metsästyskoira, joka ei hauku vaan päästää omanlaistaan jodlaavaa ääntä; FCI luokittelee sen alkukantaisiin rotuihin. PDSA kertoo säkäkorkeudeksi 40–43 cm ja painoksi 9–11 kg. Tämänkokoinen koira on täysikasvuinen noin 9–12 kuukauden iässä (PetMD), ja PDSA kertoo eliniäksi yli 12 vuotta (WebMD: 13–14 vuotta).",
        "PDSA suosittelee vähintään tunnin liikuntaa päivässä (noin 60–90 minuuttia), runsaasti henkistä virikettä ja harjausta kerran viikossa; se kutsuu basenjeja etäisiksi mutta luotettaviksi ja vahvatahtoisiksi ja kertoo, että niiden liikennetaju on hyvin heikko. WebMD:n mukaan ne jahtaavat mitä tahansa, mikä näyttää saaliilta, tarvitsevat hyvin korkeat aidat tai jatkuvaa valvontaa ja ovat vain kohtalaisen hyviä pienten lasten kanssa; se neuvoo puhdistamaan korvat viikoittain ja harjaamaan hampaat vähintään kahdesti viikossa.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Shorthair, British Blue",
      text: [
        "Brittiläinen lyhytkarva on tukeva, tiheäturkkinen kissa, jolla on suuret pyöreät silmät – CFA kutsuu sitä ”nallekarhu”-kissaksi. Useimmat kuvittelevat sen siniharmaaksi, mutta sitä on monissa väreissä ja kuvioissa. Se kehittyy hitaasti: CFA:n mukaan se saavuttaa täyden kokonsa noin kolmen vuoden iässä, ja VCA:n mukaan fyysisen täysikasvuisuuden saavuttaminen voi kestää jopa viisi vuotta.",
        "CFA kuvaa sitä hyvin helläksi ja ihmisiinsä kiintyneeksi; se tulee toimeen kaikkien perheenjäsenten kanssa iästä riippumatta, mutta ei yleensä pidä sylissä kantamisesta, ja se on elänyt koirien, kaniinien ja lintujen kanssa. VCA kuvaa sen aktiivisuustason kohtalaiseksi ja neuvoo kampaamaan turkin vähintään kerran viikossa. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "CFA kuvaa ragdollia suureksi, rennoksi kissaksi, jolla on puolipitkä, muhkea ja silkkinen turkki ja siniset silmät. Sen tummempia merkkejä (”pointeja”) on useina kuvioina – colourpoint ilman valkoista, mitted valkoisin tassuin, bicolour, jossa on enemmän valkoista, sekä van. Se kehittyy hitaasti: se saa lopullisen turkkinsa värin kahden vuoden iässä ja täyden kokonsa ja painonsa noin neljän vuoden iässä.",
        "CFA kuvaa lempeän kissan, joka tervehtii sinua ovella ja seuraa sinua huoneesta toiseen ja leikkii yleensä kynnet sisässä. PetMD kutsuu sitä hyväksi valinnaksi perheille, myös lapsiperheille, mutta neuvoo tutustuttamaan sen lapsiin ja muihin lemmikkeihin hitaasti ja valvotusti ja kertoo, että joitakin ragdolleja tarvitsee kammata vain kerran tai kaksi viikossa, kun taas CFA neuvoo kampaamaan säännöllisesti. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Siberian, Siberian Forest Cat, siperialainen",
      text: [
        "GCCF kuvaa siperiankissaa hitaasti kehittyväksi kissaksi, jolla on paksu, säänkestävä turkki: tiheä, pehmeä pohjavilla karkeamman peitinkarvan alla, ja karvaa lähtee runsaasti keväällä ja syksyllä. Urokset painavat noin 7,7–11,8 kg ja naaraat 5,9–7,7 kg, täysi kehitys voi kestää neljästä viiteen vuotta, ja GCCF kertoo eliniäksi 12–15 vuotta tai enemmän.",
        "GCCF kutsuu sitä energiseksi ja leikkisäksi mutta kärsivälliseksi – hyväksi valinnaksi perheille, joissa on pieniä lapsia – ja kertoo, että se tulee hyvin toimeen muiden eläinten, myös koirien, kanssa. PetMD neuvoo kampaamaan vähintään kerran viikossa ja tavallista huolellisemmin keväällä ja syksyllä, kun karvaa lähtee, ja toteaa, ettei siperiankissoja pidetä hypoallergeenisina. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "maine coon -kissa, Maine Coon",
      text: [
        "Maine coonia pidetään yleisesti yhtenä suurimmista kissaroduista; sillä on lihaksikas, suorakaiteen muotoinen vartalo, leveä rintakehä, suuret tassut ja pitkä, liehuva häntä. TICA kertoo täysikasvuisten urosten keskipainoksi noin 5,9–8,2 kg ja naaraiden 4,1–5,9 kg, ja CFA:n mukaan jotkin urokset painavat yli 9 kg. Se kasvaa hitaasti: CFA:n mukaan se on usein täysin kehittynyt vasta kolmen tai neljän vuoden iässä, ja TICA:n mukaan täyden kypsyyden saavuttaminen voi kestää kolmesta viiteen vuotta.",
        "TICA kuvaa sitä lempeäksi, ystävälliseksi ja leikkisäksi, CFA seuralliseksi, uskolliseksi ja älykkääksi; se ääntelee usein visertävällä trillillä naukumisen sijaan. Vetstreet kirjoittaa, että maine coonit tulevat toimeen kaikkien kanssa, myös lasten, koirien ja muiden kissojen. Sen raskas, puolipitkä turkki on lyhyempi hartioilla ja pidempi kauluksessa, vatsassa ja takaosassa. Lähteiden suositukset turkinhoidosta vaihtelevat: Vetstreetin mukaan kampaus kerran viikossa riittää, CFA neuvoo harjaamaan tai kampaamaan vähintään pari kertaa viikossa, ja TICA toteaa, että paksumpi turkki voi vaatia päivittäistä kampaamista. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalikissa, Bengal",
      text: [
        "PDSA kuvaa bengalia erittäin älykkääksi ja energiseksi kissaksi, joka tarvitsee runsaasti henkistä virikettä ja liikuntamahdollisuuksia ja pitää korkeista tähystyspaikoista, kuten kiipeilypuusta. Se on hellä, mutta käpertyy todennäköisemmin viereesi kuin syliisi ja voi olla melko äänekäs. VCA:n mukaan bengalit kasvavat hitaasti, ja fyysisen täysikasvuisuuden saavuttaminen voi kestää jopa kaksi vuotta.",
        "Sen lyhyt, pehmeä, täplikäs tai marmoroitu turkki tarvitsee vain kevyen harjauksen tai kampauksen kerran viikossa (PDSA). PetMD toteaa, ettei bengali välttämättä sovi parhaiten perheisiin, joissa on pieniä lapsia, kun taas koirien ja muiden kissojen kanssa se voi pärjätä hyvin, kun tutustuttaminen tehdään oikein. Rotu on kehitetty aasialaisen leopardikissan ja kotikissojen risteytyksistä; PetPrepissä esitetään vain rekisteröity, kotikissoihin kuuluva bengali. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Norwegian Forest Cat, wegie, skogkatt",
      text: [
        "GCCF kuvaa norjalaista metsäkissaa lempeäksi ja ystävälliseksi kissaksi, joka nauttii perheeseen kuulumisesta. Se kehittyy hitaasti, eikä sitä pidetä täysikasvuisena ennen noin neljän tai viiden vuoden ikää; urokset painavat noin 5,4–7,3 kg ja naaraat 4,1–5,4 kg, ja GCCF kertoo eliniäksi 14–16 vuotta.",
        "Sillä on paljon energiaa, se nauttii yhteisleikeistä ja kiipeilee mielellään; GCCF:n mukaan se suhtautuu suvaitsevasti lapsiin, jotka kohtelevat sitä kunnioittavasti, muihin kissoihin ja kissaystävällisiin koiriin. PetMD neuvoo kampaamaan ja harjaamaan vähintään kerran viikossa ja useammin, kun karvaa lähtee keväällä ja syksyllä, ja toteaa, että eroahdistus voi olla ongelma, jos se jätetään usein yksin pitkiksi ajoiksi. Rotukissanpennut muuttavat uuteen kotiin yleensä 12–13 viikon iässä (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default fi;
