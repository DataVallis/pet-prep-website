import type { RegistryCopy } from "./types";

/**
 * Polish plural: 1 → one ("1 rasa"); 2–4, except 12–14, → few ("3 rasy", "22 rasy"); everything else → many
 * ("5 ras", "12 ras", "25 ras"). Non-integers take `frac` (genitive singular: "2,5 roku", "1,5 godziny").
 */
function form(n: number, one: string, few: string, many: string, frac: string = few): string {
  if (!Number.isInteger(n)) return frac;
  const a = Math.abs(n);
  if (a === 1) return one;
  const t = a % 10;
  const h = a % 100;
  if (t >= 2 && t <= 4 && !(h >= 12 && h <= 14)) return few;
  return many;
}
/** First letter lower case for values that continue a phrase ("Psy" → "psy", "Do 1 godziny" → "do 1 godziny"). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("pl") + t.slice(1);
/**
 * Breed names are common nouns in Polish: lower case inside a sentence ("owczarek niemiecki", "border collie").
 * Names that start with a proper name keep the capital ("Jack Russell terrier"); later proper-name parts stay as they are
 * ("gryfon Korthalsa", "retriever z Nowej Szkocji").
 */
const PROPER_START = /^(Jack Russell)\b/;
const mid = (name: string) => (PROPER_START.test(name) ? name : lc(name));
/** "Psy" → "psów", "Koty" → "kotów" (genitive plural after "rasy …"); other species: "(ptaki)". */
const gen = (many: string) => {
  const m = lc(many);
  if (m === "psy") return "psów";
  if (m === "koty") return "kotów";
  return `(${m})`;
};
type Fci = { number: number; group: number; origin: string };
/** FCI group names as ZKwP uses them, in running-text form. */
const fciGroups: Record<number, string> = {
  1: "owczarki i psy pasterskie, z wyjątkiem szwajcarskich psów do bydła",
  2: "pinczery i sznaucery, molosy, szwajcarskie psy górskie i do bydła",
  3: "teriery",
  4: "jamniki",
  5: "szpice i psy w typie pierwotnym",
  6: "psy gończe i rasy pokrewne",
  7: "wyżły",
  8: "aportery, płochacze i psy dowodne",
  9: "psy do towarzystwa",
  10: "charty",
};
const origins: Record<string, string> = { GB: "Wielka Brytania", FR: "Francja", DE: "Niemcy", US: "USA", CU: "Kuba", CH: "Szwajcaria", IT: "Włochy", "CN-XZ": "Tybet (Chiny)", CN: "Chiny", MX: "Meksyk", BE: "Belgia", HU: "Węgry", JP: "Japonia", ZA: "Republika Południowej Afryki", "BE-FR": "Belgia / Francja", PT: "Portugalia", CA: "Kanada", HR: "Chorwacja", AU: "Australia", RU: "Rosja", IE: "Irlandia", "AF-C": "Afryka Środkowa" };
/** "godzina" in the nominative after a number: 1 godzina, 2 godziny, 5 godzin, 1,5 godziny. */
const hours = (n: number) => form(n, "godzina", "godziny", "godzin", "godziny");

const pl: RegistryCopy = {
  mistakes: {
    title: (breed) => `Częste błędy właścicieli: ${mid(breed)}`,
    intro: "Drobne nawyki, które prowadzą do większych problemów – każdy punkt pochodzi ze źródeł dotyczących tej rasy.",
    exercise: "Za mało codziennego ruchu",
    exerciseText: (amount) => `Potrzebny ruch: ${amount}. Zaplanuj go na każdy dzień, nie tylko na weekendy.`,
    coat: "Zaniedbywanie pielęgnacji sierści",
    coatText: (brushing, shedding) => `Szczotkowanie: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Za dużo smakołyków i za duże posiłki",
    heat: "Spacery w upale",
    growth: "Zapominanie, że szczeniak wciąż rośnie",
    growthText: (growthEnd) => `Dorosłe rozmiary osiąga w wieku: ${growthEnd}. Do tego czasu planuj ruch i jedzenie dla młodego zwierzęcia, które wciąż rośnie, i zapytaj weterynarza, co będzie odpowiednie dla twojego pupila.`,
    mind: "Za mało zajęć dla głowy",
    health: "Przeoczenie znanych problemów zdrowotnych rasy",
    practise: "W aplikacji PetPrep dziecko ćwiczy właśnie te nawyki – kroki, posiłki, pielęgnację – zanim prawdziwy pupil zamieszka w domu.",
  },
  hub: {
    title: "Poznaj zwierzę, zanim zamieszka w domu.",
    intro:
      "Czego naprawdę potrzebuje każdy gatunek i każda rasa w aplikacji PetPrep – według związków kynologicznych, organizacji felinologicznych, weterynaryjnych organizacji charytatywnych i badań, z linkiem do każdego źródła. Do tego zasady, według których PetPrep symuluje zwierzę.",
    breedCount: (n) => `${n} ${form(n, "rasa", "rasy", "ras")} w encyklopedii`,
    open: "Zobacz rasy",
    openA11y: (many) => `Zobacz rasy ${gen(many)}`,
    freePlan: (name, activity) => `Plan bezpłatny: ${lc(name)} (dorosłe zwierzę: ${activity}). Nie ma osobnej strony w encyklopedii.`,
    otherSpecies: "Kolejne zwierzęta są w planach.",
    methodTitle: "Jak powstaje ta encyklopedia",
    method: [
      "Każdy fakt pochodzi z wymienionego z nazwy źródła – związków kynologicznych, organizacji felinologicznych, weterynaryjnych organizacji charytatywnych i stowarzyszeń oraz recenzowanych badań – i ma do niego link. Wzorce ras streszczamy własnymi słowami.",
      "Wartości, których nie potwierdza żadne źródło, nigdy nie są pokazywane jako fakty. Gdy PetPrep musi wybrać liczbę na potrzeby gry, pojawia się ona tylko w części „Jak symuluje to PetPrep” i jest oznaczona jako zasada gry.",
      "Te same dane napędzają aplikację: oznaczenia, liczba posiłków, cele kroków i sesje zabawy na tych stronach to te same wartości, których używa pupil w aplikacji.",
      "Ta encyklopedia nie jest poradą weterynaryjną. Informacje o zdrowiu mają charakter wyłącznie orientacyjny i nie zostały sprawdzone przez weterynarza.",
    ],
  },
  speciesStatus: { available: "W aplikacji", coming_soon: "Wkrótce w aplikacji", info_only: "Tylko informacyjnie" },
  availability: {
    in_app: { label: "W aplikacji", text: "Dostępna w 12-tygodniowym wyzwaniu PetPrep (rasa płatna)." },
    coming_soon: { label: "Wkrótce w aplikacji", text: "Rasa jest gotowa i przetestowana; pojawi się w jednej z najbliższych wersji aplikacji." },
    info_only: { label: "Tylko informacyjnie", text: "Rasa jest w encyklopedii w celach informacyjnych; w aplikacji nie możesz jej jeszcze wybrać." },
  },
  catalogue: {
    eyebrow: "Encyklopedia zwierząt",
    title: (many) => `${many}: rasy w encyklopedii`,
    lead: (many, count) =>
      `${count} ${form(count, "rasa", "rasy", "ras")} ${gen(many)} – z potrzebami według źródeł, informacją, dla kogo się nadają, i zasadami, według których symuluje je PetPrep. Wyszukuj, filtruj i porównuj do trzech ras naraz.`,
    metaTitle: (many) => `Rasy ${gen(many)} – encyklopedia ze źródłami | PetPrep`,
    metaDescription: (many) =>
      `Wyszukaj i porównaj rasy ${gen(many)} według potrzeb, wielkości i tego, dla kogo się nadają. Każdy fakt ma link do źródła; do tego zasady, według których PetPrep symuluje każdą rasę.`,
    searchLabel: "Szukaj rasy",
    searchPlaceholder: "Nazwa, np. labrador",
    filtersTitle: "Filtry",
    any: "Wszystkie",
    availabilityLabel: "W PetPrep",
    sortLabel: "Sortuj",
    sort: { recommended: "Najpierw w aplikacji", az: "A–Z", size: "Wielkość (od najmniejszych)" },
    clear: "Wyczyść wszystko",
    results: (total) => `{n} z ${total} ${form(total, "rasy", "ras", "ras", "rasy")}`,
    none: "Żadna rasa nie pasuje. Spróbuj z mniejszą liczbą filtrów.",
    loading: "Ładowanie wyszukiwarki…",
    page: "Strona {n} z {total}",
    prev: "Poprzednia",
    next: "Następna",
    compareAdd: "Porównaj: {name}",
    compareBar: "Wybrane do porównania: {n} z {max}",
    compareGo: "Porównaj",
    compareMax: "Możesz porównać maksymalnie {max} rasy.",
    azTitle: "Wszystkie rasy od A do Z",
    azIntro: "Wszystkie rasy w encyklopedii w kolejności alfabetycznej.",
    freePlanTitle: "Plan bezpłatny",
    guideTitle: "Jak wybrać rasę",
    guide: () => [
      "Zacznij od tego, co twój dom może dać każdego dnia: czas na ruch, pielęgnację i przestrzeń. Na stronie każdej rasy te potrzeby są zebrane w skrócie, a przy każdej wartości podane jest źródło; gdy źródła się różnią, pokazujemy wszystkie wartości.",
      "Gdy rasa ma klasę wielkości (u psów: miniaturowy, mały, średni, średni do dużego, duży lub olbrzymi), jest to klasa podana przez wymienione źródło – zwykle związek kynologiczny – a masa ciała to zakresy podane przez źródła, a nie nasze szacunki.",
      "Oznaczenia takie jak „Dobrze się sprawdzi: w aktywnej rodzinie” są takie same jak w aplikacji i każde potwierdzają źródła. Liczby w części „Jak symuluje to PetPrep” to zasady gry PetPrep, a nie instrukcje opieki. [Jak powstaje encyklopedia](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Porównanie ras ${gen(many)}`,
    metaTitle: (many) => `Porównanie ras ${gen(many)} | Encyklopedia PetPrep`,
    intro: "Najważniejsze potrzeby obok siebie, z tych samych źródeł co strony ras.",
    pick: "Wybierz w katalogu dwie lub trzy rasy, aby je porównać.",
    back: "Wróć do katalogu",
    remove: "Usuń: {name}",
    note: "Wartości podajemy tak, jak podaje je wymienione źródło. Gdy źródła się różnią, strona rasy wymienia każdą wartość.",
    availabilityRow: "W PetPrep",
    activityRow: "Dzienny cel dorosłego zwierzęcia w PetPrep (zasada gry)",
  },
  facets: {
    size: { label: "Wielkość", values: { toy: "Miniaturowy", small: "Mały", small_medium: "Mały do średniego", medium: "Średni", medium_large: "Średni do dużego", large: "Duży", giant: "Olbrzymi" } },
    exercise: { label: "Ruch dziennie", values: { under_1h: "Do 1 godziny", h1_2: "1–2 godziny", over_2h: "Ponad 2 godziny" }, line: (v) => `${lc(v)} ruchu dziennie` },
    grooming: { label: "Szczotkowanie", values: { weekly: "Raz w tygodniu", several_weekly: "Kilka razy w tygodniu", daily: "Codziennie", other: "Inne" }, line: (v) => `szczotkowanie: ${lc(v)}` },
  },
  groups: {
    exercise: "Ruch",
    play: "Zabawa",
    litter: "Kuweta",
    scratching: "Drapanie",
    grooming: "Sierść i pielęgnacja",
    feeding: "Posiłki",
    water: "Woda",
    lifespan: "Długość życia",
    stages: "Etapy życia",
    size: "Wielkość i masa ciała",
    training: "Szkolenie",
  },
  fields: {
    size: "Wielkość",
    height: "Wysokość w kłębie",
    weight: "Masa ciała dorosłego zwierzęcia",
    growth_end: "Dorosłe rozmiary osiąga w wieku",
    lifespan: "Długość życia",
    exercise: "Ruch dziennie",
    coat: "Sierść",
    grooming_frequency: "Szczotkowanie",
    grooming_level: "Potrzeby pielęgnacyjne",
    shedding: "Linienie",
    litter_scoop: "Sprzątanie kuwety",
    litter_full_change: "Wymiana całego żwirku",
    litter_pee: "Oddawanie moczu (dorosły kot)",
    litter_poo: "Oddawanie kału (dorosły kot)",
    water_need: "Zapotrzebowanie na wodę",
    sleep: "Sen (dorosły kot)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 tygodni",
    puppy_3_6_months: "3–6 miesięcy",
    puppy_6_12_months: "6–12 miesięcy",
    kitten_6_12_weeks: "6–12 tygodni",
    kitten_3_6_months: "3–6 miesięcy",
    kitten_6_12_months: "6–12 miesięcy",
    puppy: "Szczeniak",
    kitten: "Kocię",
    young_adult: "Młode dorosłe zwierzę",
    mature_adult: "Dojrzałe zwierzę",
    adult: "Dorosłe zwierzę",
    senior: "Senior",
  },
  categories: {
    size: { toy: "miniaturowy", small: "mały", small_medium: "mały do średniego", medium: "średni", medium_large: "średni do dużego", large: "duży", giant: "olbrzymi" },
    coat: { moderately_long: "umiarkowanie długa", smooth: "gładka (krótka)", short: "krótka", medium: "średniej długości", short_long: "krótka lub długa (dwie odmiany sierści)", long: "długa" },
    grooming_frequency: { at_least_once_a_week: "co najmniej raz w tygodniu", at_least_once_or_twice_a_week: "co najmniej raz lub dwa razy w tygodniu", once_a_week: "raz w tygodniu", more_than_once_a_week: "częściej niż raz w tygodniu", daily: "codziennie", every_day: "każdego dnia" },
    grooming_level: { moderate: "umiarkowane", high: "duże", low: "małe" },
    shedding: { yes: "linieje", no: "nie linieje (to nie znaczy, że jest hipoalergiczny)", high: "mocno linieje", moderate: "umiarkowanie linieje", low: "słabo linieje", minimal: "linieje minimalnie" },
  },
  statements: {
    food_motivated: () => "Jedzenie bardzo go motywuje – to pomaga w szkoleniu, ale pilnuj porcji.",
    coren_rank: (v) => `${String(v)}. miejsce w rankingu Stanleya Corena (inteligencja w pracy i posłuszeństwie).`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Wzorzec FCI nr ${x.number}, grupa ${x.group} (${fciGroups[x.group] ?? "—"}); pochodzenie: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Zabawa: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} ${form(x.sessions[1], "sesja", "sesje", "sesji")} po ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} ${form(x.minutes[1], "minutę", "minuty", "minut")} dziennie.`;
    },
    kittens_play_more: () => "Kocięta muszą bawić się częściej.",
    scratching_natural: () => "Drapanie jest naturalne i konieczne: zapewnij drapak i nigdy nie karz za drapanie.",
    water_fresh: () => "Świeża woda przez cały czas; codziennie myj i napełniaj miskę.",
    grooming_sources_differ: () => "Źródła podają różną częstotliwość czesania: od codziennego do cotygodniowego.",
  },
  // Qualifiers wrap a value already in the nominative ("2 godziny dziennie"), so they avoid prepositions that need the
  // genitive ("do", "około"): "najwyżej 1 godzina dziennie", "mniej więcej 12–15 miesięcy".
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediana: ${t}`,
    more_than: (t) => `więcej niż ${t}`,
    less_than: (t) => `mniej niż ${t}`,
    at_least: (t) => `co najmniej ${t}`,
    up_to: (t) => `najwyżej ${t}`,
    ideal: (t) => `idealnie (wzorzec rasy): ${t}`,
    mean: (t) => `zmierzona średnia: ${t}`,
    about: (t) => `mniej więcej ${t}`,
    until: (t) => `przez pierwsze ${t}`,
    until_about: (t) => `przez mniej więcej pierwsze ${t}`,
    span: (t) => t,
    from: (t) => `${t} i więcej`,
    last: (t) => `ostatnie ${t}`,
    every: (t) => `co ${t}`,
    expectancy: (t) => `oczekiwana długość życia w chwili urodzenia: ${t}`,
    smaller_meals: (t) => `${t}, mniejsze porcje`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${form(n, "rok", "lata", "lat", "roku")}`,
    months: (t, n) => `${t} ${form(n, "miesiąc", "miesiące", "miesięcy", "miesiąca")}`,
    days: (t, n) => `${t} ${form(n, "dzień", "dni", "dni", "dnia")}`,
    min_per_day: (t, n, f) =>
      n % 60 === 0 ? `${f.num(n / 60)} ${hours(n / 60)} dziennie` : `${t} ${form(n, "minuta", "minuty", "minut", "minuty")} dziennie`,
    meals_per_day: (t, n) => `${t} ${form(n, "posiłek", "posiłki", "posiłków", "posiłku")} dziennie`,
    times_per_day: (t, n) => `${t} ${form(n, "raz", "razy", "razy")} dziennie`,
    hours_per_day: (t, n) => `${t} ${hours(n)} dziennie`,
    ml_per_kg_day: (t) => `${t} ml na kg masy ciała dziennie`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}% oczekiwanej długości życia`,
  },
  males: "samce",
  females: "samice",
  or: " lub ",
  notes: { size_class_guidance: "zalecenie dla jej klasy wielkości" },
  stageLabels: {
    dog: { puppy: "Szczeniak", young: "Młody pies", adult: "Dorosły pies", senior: "Senior" },
    cat: { puppy: "Kocię", young: "Młody kot", adult: "Dojrzały kot", senior: "Senior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${form(raw, "krok", "kroki", "kroków")}`,
    steps_range: (from, to) => `${from} → ${to} kroków`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} kroków na każdy miesiąc życia (${first} w chwili przybycia), maksymalnie ${cap} od ${capMonth}. miesiąca`,
    play_sessions: (n) => `${n} ${form(n, "sesja", "sesje", "sesji")} zabawy`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Cel kroków = minuty ruchu dziennie × ${p.per_minute} ${form(p.per_minute, "krok", "kroki", "kroków")}: dla dorosłego psa to ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${hours(p.minutes / 60)}` : `${p.minutes} ${form(p.minutes, "minuta", "minuty", "minut")}`}, czyli ${f.num(p.steps)} ${form(p.steps, "krok", "kroki", "kroków")} dziennie.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Uczy się komend wolniej niż mieszaniec z planu bezpłatnego (${f.num(p.multiplier)} × jego tempo).`
        : p.multiplier === 1
          ? "Uczy się komend tak samo szybko jak mieszaniec z planu bezpłatnego."
          : `Uczy się komend ${f.num(p.multiplier)} razy szybciej niż mieszaniec z planu bezpłatnego.`,
    senior_share: (p, f) =>
      `Seniorem staje się w ${p.months}. miesiącu życia (${f.num(p.months / 12, 1)} ${form(p.months / 12, "rok", "lata", "lat", "roku")}) – w ostatniej ćwiartce oczekiwanej długości życia rasy.`,
    walk_sensor: () => "Spacery liczą prawdziwe kroki z aplikacji Apple Zdrowie lub Health Connect (za zgodą, tylko odczyt) i z czujnika ruchu w telefonie – bez GPS.",
    play_instead_of_steps: (p, f) =>
      `Bez spacerów: dorosły kot ma dziennie ${p.sessions} ${form(p.sessions, "sesję", "sesje", "sesji")} zabawy z wędką; przerwa między sesjami: co najmniej ${f.num(p.gap_minutes / 60)} ${hours(p.gap_minutes / 60)}.`,
    litter_rule: (p) =>
      `Kuweta: dorosły kot korzysta z niej ${p.uses} ${form(p.uses, "raz", "razy", "razy")} dziennie; każde użycie trzeba posprzątać w ciągu ${p.scoop_hours} ${form(p.scoop_hours, "godziny", "godzin", "godzin", "godziny")} (poza godzinami ciszy), a cały żwirek wymienić co ${p.change_days} ${form(p.change_days, "dzień", "dni", "dni")}.`,
    scratching_after_missed_play: () => "Po dniu bez wystarczającej ilości zabawy kot raz coś podrapie; dziecko przenosi go na drapak.",
    grooming_rule: (p) => (p.per_week === 1 ? "Czesanie raz w tygodniu." : p.per_week === 2 ? "Czesanie dwa razy w tygodniu." : `Czesanie ${p.per_week} razy w tygodniu.`),
    no_walk_in_heat: (p) =>
      `Latem (czerwiec–sierpień; na półkuli południowej grudzień–luty) ekran dziecka i ekran spaceru między ${p.from} a ${p.to} (czas lokalny rodziny) spokojnie przypominają: w upale bez spacerów. Bez danych pogodowych i bez kar – kroki nadal się liczą.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "czyszczenie fałdów skóry",
        tooth_brushing: "mycie zębów",
        ear_cleaning: "sprawdzanie i czyszczenie uszu",
        nail_trim: "przycinanie pazurów",
        bath: "kąpiel",
        groomer_visit: "wizyta u groomera",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "codziennie"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "raz w tygodniu"
              : `co ${weeks} ${form(weeks, "tydzień", "tygodnie", "tygodni")}`
            : `${q.times} ${form(q.times, "raz", "razy", "razy")} co ${q.period_days} ${form(q.period_days, "dzień", "dni", "dni")}`;
      const who = q.actor === "parent" ? "przypomnienie dla rodzica" : "zadanie dla dziecka";
      return `Pielęgnacja: ${what} ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Obejrzyj szczeniaka razem z matką, tam, gdzie się urodził.",
      min_age_puppy: "Szczeniak nie powinien opuszczać matki przed ukończeniem 8 tygodni.",
      pedigree_fci: "Poproś o rodowód. Zgodnie z zasadami FCI rodowód można wydać tylko przy prawidłowym pochodzeniu.",
      parents_health_tests: "Poproś o wyniki badań zdrowotnych obojga rodziców. To, które badania są ważne, zależy od rasy.",
      breed_club_rules: "Krajowe związki kynologiczne mogą ustalać zasady hodowli wykraczające poza zasady FCI – zapytaj klub rasy, jakie badania muszą mieć rodzice.",
      written_contract: "Poproś o pisemną umowę sprzedaży, która opisuje pochodzenie i zdrowie szczeniaka.",
      kitten_see_mother: "Obejrzyj kocię razem z matką, tam, gdzie mieszkają kocięta.",
      kitten_min_age: "Zgodnie z zasadami FIFe dla kotów rodowodowych kocię nie trafia do nowego domu przed ukończeniem 14 tygodni.",
      kitten_vaccination: "Kocię jest w pełni zaszczepione (panleukopenia, kaliciwiroza, herpeswiroza) i ma dokument potwierdzający szczepienia.",
      kitten_pedigree: "Kocię rodowodowe ma rodowód obejmujący co najmniej trzy pokolenia.",
      kitten_parents_tests: "Zapytaj, czy któreś z rodziców miało problemy zdrowotne, które kocię mogłoby odziedziczyć.",
    },
    tests: {
      dna_poag_pll: "Test DNA w kierunku jaskry pierwotnej otwartego kąta i pierwotnego zwichnięcia soczewki (POAG/PLL), dziedzicznych chorób oczu, które mogą prowadzić do ślepoty",
      hip_scheme: "Prześwietlenie stawów biodrowych w kierunku dysplazji (Wielka Brytania: program BVA/KC)",
      elbow_scheme: "Prześwietlenie stawów łokciowych w kierunku dysplazji (Wielka Brytania: program BVA/KC)",
      eye_scheme: "Badanie oczu u lekarza weterynarii okulisty (Wielka Brytania: program BVA/KC/ISDS; u niektórych ras z gonioskopią)",
      heart_scheme: "Badanie serca w kierunku choroby zastawki mitralnej",
      boas_grading: "Test oddychania w kierunku zespołu niedrożności dróg oddechowych u ras brachycefalicznych (ocena BOAS)",
      ivdd_screening: "Badanie kręgosłupa w kierunku choroby krążków międzykręgowych (IVDD)",
      hearing_baer: "Badanie słuchu w kierunku głuchoty (BAER)",
      cm_sm_mri: "Rezonans magnetyczny w kierunku malformacji typu Chiari i syringomielii (Wielka Brytania: program BVA/KC CM/SM)",
      inbreeding_coi: "Różnorodność genetyczna – sprawdź współczynnik inbredu",
      dna_prcd_pra: "Test DNA w kierunku postępującego zaniku siatkówki (prcd-PRA)",
      dna_rcd4_pra: "Test DNA w kierunku postępującego zaniku siatkówki (rcd4)",
      dna_gr_pra2: "Test DNA w kierunku postępującego zaniku siatkówki (GR_PRA2)",
      dna_cnm: "Test DNA w kierunku miopatii centronuklearnej (CNM)",
      dna_eic: "Test DNA w kierunku zapaści wysiłkowej (EIC)",
      dna_hnpk: "Test DNA w kierunku dziedzicznej parakeratozy nosa (HNPK)",
      dna_sd2: "Test DNA w kierunku dysplazji szkieletowej typu 2 (SD2)",
      dna_mcd: "Test DNA w kierunku plamistej dystrofii rogówki (MCD)",
      dna_stgd: "Test DNA w kierunku choroby Stargardta (STGD)",
      dna_cc_de: "Test DNA w kierunku zespołu kręconej sierści i suchego oka (CC/DE)",
      dna_ef: "Test DNA w kierunku epizodycznego upadania (EF)",
      dna_cea: "Test DNA w kierunku anomalii oka collie (CEA/CH)",
      dna_cl: "Test DNA w kierunku ceroidolipofuscynozy (CL)",
      dna_igs: "Test DNA w kierunku zespołu Imerslunda-Gräsbecka (IGS)",
      dna_mdr1: "Test DNA w kierunku nadwrażliwości na leki (MDR1)",
      dna_tns: "Test DNA w kierunku zespołu uwięzionych neutrofili (TNS)",
      dna_sn: "Test DNA w kierunku neuropatii czuciowej (SN)",
      dna_ggd: "Test DNA w kierunku goniodysgenezji i ryzyka jaskry (GGD)",
      dna_raines: "Test DNA w kierunku zespołu Raine’a",
      dna_dm: "Test DNA w kierunku mielopatii zwyrodnieniowej (DM)",
      dna_de: "Test DNA w kierunku encefalopatii zwyrodnieniowej (DE)",
      dna_jadd: "Test DNA w kierunku młodzieńczej choroby Addisona (JADD)",
      dermoid_sinus_scheme: "Badanie szczeniąt w kierunku zatoki dermoidalnej (program klubu rasy)",
      dna_jme: "Test DNA w kierunku młodzieńczej padaczki mioklonicznej (JME)",
      dna_je: "Test DNA w kierunku młodzieńczej padaczki (JE)",
      dna_lsd: "Test DNA w kierunku lizosomalnej choroby spichrzeniowej (LSD)",
      dna_ampn: "Test DNA w kierunku polineuropatii alaskan malamutów (AMPN)",
      dna_fanconi: "Test DNA w kierunku zespołu Fanconiego (choroby nerek)",
      dna_pra_bj1: "Test DNA w kierunku postępującego zaniku siatkówki u basenji (PRA-BJ1)",
      thyroid_scheme: "Badanie tarczycy rodziców",
      dna_pap_pra1: "Test DNA w kierunku postępującego zaniku siatkówki u papillonów (Pap-PRA1)",
      dna_nad: "Test DNA w kierunku dystrofii neuroaksonalnej (NAD)",
      dna_eopra: "Test DNA w kierunku wcześnie występującego postępującego zaniku siatkówki (EOPRA)",
      dna_cu: "Test DNA w kierunku cystynurii (CU), dziedzicznej skłonności do kamieni w nerkach i pęcherzu",
      heart_echo_scheme: "Badanie serca kolorowym dopplerem (program klubu rasy)",
      cardiac_exam: "Badanie serca rodziców (zalecenie klubu rasy)",
      dna_rd_osd: "Test DNA w kierunku dysplazji siatkówki / dysplazji oczno-szkieletowej (RD/OSD)",
      dna_xlpra1: "Test DNA w kierunku sprzężonego z chromosomem X postępującego zaniku siatkówki (XLPRA1)",
      dna_cmo: "Test w kierunku osteopatii czaszkowo-żuchwowej (CMO), dziedzicznej choroby kości szczęki",
      dna_hsf4: "Test DNA w kierunku dziedzicznej zaćmy (HSF4)",
      dna_lafora: "Test DNA w kierunku choroby Lafory",
      dna_nccd: "Test DNA w kierunku noworodkowego zwyrodnienia kory móżdżku (NCCD)",
      dna_fviid: "Test DNA w kierunku niedoboru czynnika VII (FVIID)",
      dna_mls: "Test DNA w kierunku zespołu Musladina-Luekego (MLS)",
      dna_vwd1: "Test DNA w kierunku choroby von Willebranda typu 1 (vWD1)",
      dna_mac: "Test DNA w kierunku podatności na zakażenie prątkami z kompleksu Mycobacterium avium (MAC)",
      dna_imgd: "Test DNA w kierunku dziedzicznej miopatii dogów niemieckich (IMGD), choroby prowadzącej do zaniku mięśni",
      dna_poag: "Test DNA w kierunku jaskry pierwotnej otwartego kąta (POAG), dziedzicznej choroby oczu, która może prowadzić do ślepoty",
      dna_aon: "Test DNA w kierunku neuropatii o początku w wieku dorosłym (AON), dziedzicznej choroby nerwów",
      dna_fn: "Test DNA w kierunku rodzinnej nefropatii (FN), dziedzicznej choroby nerek",
      patella_scheme: "Badanie rzepek w kierunku zwichnięcia rzepki przed kryciem",
      kidney_scheme: "USG nerek w kierunku brakującej lub nieprawidłowo rozwiniętej nerki (zalecenie klubu rasy)",
      kidney_upc_scheme: "Badanie moczu (stosunek białka do kreatyniny) w kierunku choroby nerek (zalecenie klubu rasy)",
      dna_gld: "Test DNA w kierunku leukodystrofii komórek globoidalnych (GLD), dziedzicznej choroby układu nerwowego",
      liver_shunt_scheme: "Badanie wątroby w kierunku przetoki wrotno-obocznej lub dysplazji mikronaczyniowej (zalecenie klubu rasy)",
      breed_health_scheme: "Program zdrowotny klubu rasy dla rodziców",
      hemivertebrae_scheme: "Prześwietlenie kręgosłupa rodziców w kierunku kręgów klinowatych (nieprawidłowo ukształtowanych kręgów), po ukończeniu 12 miesięcy",
      dna_hcm_mc: "Test DNA w kierunku kardiomiopatii przerostowej (MC HCM)",
      dna_sma: "Test DNA w kierunku rdzeniowego zaniku mięśni (SMA)",
      dna_pk_def: "Test DNA w kierunku niedoboru kinazy pirogronianowej (PK def)",
      hcm_negative: "Koty hodowlane muszą mieć ujemny wynik badania w kierunku HCM (choroba serca: kardiomiopatia przerostowa)",
      dna_gsd4: "Test DNA w kierunku glikogenozy typu IV (GSD IV)",
      dna_pra_b: "Test DNA w kierunku postępującego zaniku siatkówki u kotów bengalskich (PRA-b)",
      dna_jlpp: "Test DNA w kierunku młodzieńczego porażenia krtani i polineuropatii (JLPP)",
      dna_lemp2: "Test DNA w kierunku leukoencefalomielopatii (LEMP-2)",
      dna_huu: "Test DNA w kierunku hiperurikozurii (HUU)",
      dna_dcm: "Test DNA w kierunku kardiomiopatii rozstrzeniowej (DCM), choroby mięśnia sercowego",
      dna_pra5: "Test DNA w kierunku postępującego zaniku siatkówki (PRA5)",
      dna_dings2: "Test DNA w kierunku „choroby tańczących dobermanów” (DINGS2), zaburzenia nerwów i mięśni",
      dna_ams: "Test DNA w kierunku zespołu okaleczenia akralnego (AMS), zaburzenia nerwów, przez które pies nie czuje bólu w łapach",
      dna_dams: "Test DNA w kierunku zespołu niedokrwistości dyserytropoetycznej i miopatii (DAMS), zaburzenia krwi i mięśni",
      dna_fuco: "Test DNA w kierunku fukozydozy, dziedzicznej choroby układu nerwowego",
      dna_pfk: "Test DNA w kierunku niedoboru fosfofruktokinazy (PFK), dziedzicznego zaburzenia enzymatycznego krwi i mięśni",
      dna_pra_cord1: "Test DNA w kierunku postępującego zaniku siatkówki (PRA cord1)",
      dna_bbs2_pra: "Test DNA w kierunku postępującego zaniku siatkówki (BBS2-PRA)",
      dna_cnga1_pra: "Test DNA w kierunku postępującego zaniku siatkówki (CNGA1-PRA)",
      dna_pra_rcd2: "Test DNA w kierunku postępującego zaniku siatkówki (PRA-rcd2)",
      dna_gm1: "Test DNA w kierunku gangliozydozy GM1 (dziedzicznej choroby układu nerwowego)",
      dna_gm2: "Test DNA w kierunku gangliozydozy GM2 (dziedzicznej choroby układu nerwowego)",
      dna_vwd3: "Test DNA w kierunku choroby von Willebranda typu 3 (vWD3), dziedzicznego zaburzenia krzepnięcia krwi",
      dna_pra_rcd3: "Test DNA w kierunku postępującego zaniku siatkówki (PRA-rcd3)",
      dna_vwd2: "Test DNA w kierunku choroby von Willebranda typu 2 (vWD2), dziedzicznego zaburzenia krzepnięcia krwi",
      dna_l2hga: "Test DNA w kierunku kwasicy L-2-hydroksyglutarowej (L-2-HGA), dziedzicznej choroby metabolicznej układu nerwowego",
      dna_pll: "Test DNA w kierunku pierwotnego zwichnięcia soczewki (PLL), dziedzicznej choroby oczu, w której soczewka przesuwa się ze swojego miejsca",
      dna_loa: "Test DNA w kierunku ataksji o późnym początku (LOA), dziedzicznej choroby zaburzającej równowagę i koordynację ruchów",
      dna_sca: "Test DNA w kierunku ataksji rdzeniowo-móżdżkowej (SCA), dziedzicznej choroby układu nerwowego",
    },
  },
  health: {
    shar_pei_fever: "W rasie może wystąpić rodzinna gorączka shar pei: napady wysokiej gorączki z bolesnymi, obrzękniętymi stawami i obrzękiem pyska — od razu do weterynarza.",
    weight_gain: "Łatwo przybiera na wadze – pilnuj porcji i smakołyków.",
    hip_elbow_dysplasia_eye_conditions: "Może mieć skłonność do dysplazji stawów biodrowych i łokciowych oraz do kilku dziedzicznych chorób oczu.",
    cancer_risk: "Źródła opisują u tej rasy wyższe ryzyko nowotworów.",
    flat_face_breathing: "Rasa o płaskim pysku (brachycefaliczna): krótka kufa, wąskie nozdrza i nadmiar tkanek miękkich w drogach oddechowych mogą utrudniać oddychanie (zespół niedrożności dróg oddechowych u ras brachycefalicznych, BOAS).",
    heat_stroke_risk: "Szybko się przegrzewa i jest bardziej narażony na udar cieplny niż większość psów, zwłaszcza w ciepłe dni.",
    skin_fold_ear_problems: "Ma skłonność do zapaleń uszu i zakażeń fałdów skóry; fałdy skóry trzeba utrzymywać w czystości i suchości.",
    ear_infections_long_ears: "Z powodu długich uszu mogą występować zapalenia uszu; w przewodzie słuchowym mogą namnażać się bakterie.",
    collie_eye_pra: "W rasie występują dziedziczne choroby oczu: anomalia oka collie, czyli nieprawidłowość tylnej części oka, oraz postępujący zanik siatkówki, który może powoli prowadzić do ślepoty; dostępne są badania oczu i testy DNA.",
    merle_colour_risk: "Merle nie jest umaszczeniem zgodnym ze wzorcem; u tej rasy wiąże się z wyższym ryzykiem problemów ze słuchem i wzrokiem.",
    hind_leg_conformation: "The Royal Kennel Club wskazuje u tej rasy budowę tylnych kończyn i sposób poruszania się jako problem; zdrowy pies ma prosty grzbiet i umiarkowanie kątowane tylne kończyny.",
    hip_elbow_dysplasia: "Może mieć skłonność do dysplazji stawów biodrowych i łokciowych; hodowcom zaleca się zbadanie bioder i łokci rodziców przed kryciem.",
    degenerative_myelopathy: "W rasie występuje mielopatia zwyrodnieniowa, choroba rdzenia kręgowego, która powoli osłabia tylne kończyny; dostępny jest test DNA.",
    exercise_induced_collapse: "W rasie występuje zapaść wysiłkowa, dziedziczna choroba nerwowo-mięśniowa, przez którą pies może upaść po intensywnym wysiłku.",
    heart_valve_disease: "Choroba serca spowodowana osłabieniem zastawki mitralnej to w tej rasie duży problem; często pierwszym objawem jest szmer serca, a psy hodowlane powinny najpierw przejść ocenę serca.",
    chiari_syringomyelia: "W rasie występuje malformacja typu Chiari z syringomielią, bolesna choroba z wypełnionymi płynem jamami w rdzeniu kręgowym przy mózgu, związana z kształtem czaszki; rozpoznaje się ją rezonansem magnetycznym.",
    eye_conditions: "W rasie występują dziedziczne choroby oczu, np. zaćma, a wyłupiaste lub podrażnione oczy są uznawane za problem; dostępne są badania oczu i testy DNA.",
    epilepsy: "W rasie występuje padaczka, choroba mózgu, która może wywoływać drgawki.",
    storage_disease: "Dziedziczna choroba spichrzeniowa układu nerwowego może dotykać młode psy tej rasy; test DNA rodziców pozwala hodowcom jej uniknąć.",
    chondrodysplasia: "W rasie występuje chondrodysplazja, zaburzenie wzrostu chrząstek i kości; szczenięta można zbadać prześwietleniem.",
    polyneuropathy: "W rasie występuje dziedziczna choroba nerwów (polineuropatia); test DNA rodziców pozwala hodowcom jej uniknąć.",
    fanconi_syndrome: "W rasie występuje zespół Fanconiego, dziedziczna choroba nerek, przy której cukier przedostaje się do moczu; test DNA rodziców pozwala hodowcom jej uniknąć.",
    pyruvate_kinase_deficiency: "W rasie może występować niedobór kinazy pirogronianowej, dziedziczna wada czerwonych krwinek, która powoduje niedokrwistość.",
    back_disc_disease: "W rasie występuje choroba krążków międzykręgowych, czyli problem z amortyzującymi krążkami między kręgami kręgosłupa.",
    pra_eye_disease: "W rasie występuje postępujący zanik siatkówki, dziedziczna choroba oczu, która może powoli prowadzić do ślepoty; dostępne są testy DNA i badania oczu.",
    hip_dysplasia: "W rasie występuje dysplazja stawów biodrowych, czyli źle rozwinięty staw biodrowy, który może prowadzić do zwyrodnienia; hodowcom zaleca się ocenę bioder rodziców.",
    bloat_gdv: "W rasie może wystąpić skręt żołądka (rozszerzenie i skręt żołądka) – to nagły przypadek, w którym trzeba natychmiast jechać do weterynarza.",
    inherited_eye_disease: "W rasie występują dziedziczne choroby oczu, np. anomalia oka collie, zaćma i postępujący zanik siatkówki.",
    drug_sensitivity_mdr1: "Niektóre psy tej rasy mają dziedziczną nadwrażliwość na niektóre leki (MDR1) – jeśli dotyczy to twojego psa, powiedz o tym weterynarzowi.",
    merle_to_merle_breeding: "Merle jest w tej rasie umaszczeniem zgodnym ze wzorcem; nie należy łączyć dwóch psów merle, bo ich szczenięta są narażone na uszkodzenie wzroku i słuchu – The Royal Kennel Club takich szczeniąt nie rejestruje.",
    kneecap_luxation: "W rasie występuje zwichnięcie rzepki, czyli przejściowe przesuwanie się rzepki z jej miejsca.",
    pra_and_eyelashes: "W rasie występują problemy z oczami: postępujący zanik siatkówki, który może powoli prowadzić do ślepoty, oraz dodatkowe rzęsy ocierające oko (dystichiaza); hodowcom zaleca się badanie oczu rodziców.",
    liver_shunt: "W rasie może wystąpić przetoka wrotno-oboczna (wątrobowa), przy której krew omija wątrobę.",
    skin_allergies: "Alergie skórne są w tej rasie znanym problemem; The Royal Kennel Club prosi sędziów, by zwracali uwagę na oznaki zapalenia skóry, a właścicielom zaleca się, by przed wyborem szamponu zapytali weterynarza.",
    westie_lung: "W rasie, głównie u starszych psów, może wystąpić choroba płuc nazywana „płucem westie” (idiopatyczne włóknienie płuc), która utrudnia oddychanie.",
    jaw_bone_disorder: "W rasie może wystąpić dziedziczna choroba kości szczęki.",
    dry_eye: "W rasie może występować suche oko, czyli stan, w którym oczy wytwarzają za mało łez i stają się suche i bolesne.",
    heart_hcm: "W rasie występuje kardiomiopatia przerostowa (HCM), dziedziczna choroba serca, w której mięsień sercowy się pogrubia.",
    dental_weight_nail_care: "Duże brytyjskie badanie wymienia choroby zębów, nadwagę i przerośnięte pazury wśród najczęstszych problemów tej rasy, dlatego właścicielom zaleca się regularną higienę zębów, kontrolę wagi i dbanie o pazury.",
    dental_weight_care: "PetMD wymienia choroby zębów i nadwagę wśród problemów, na które trzeba uważać, dlatego właścicielom zaleca się regularne mycie zębów kota i pilnowanie jego wagi.",
    gsd_iv: "W rasie występuje glikogenoza typu IV (GSD IV), dziedziczne zaburzenie dotykające kocięta; test DNA rodziców pozwala hodowcom jej uniknąć.",
    hip_dysplasia_weight: "W rasie może wystąpić dysplazja stawów biodrowych, czyli źle rozwinięty staw biodrowy; PetMD zaleca utrzymywanie kota w prawidłowej wadze, by chronić jego stawy.",
    laryngeal_paralysis_polyneuropathy: "W rasie występuje młodzieńcze porażenie krtani i polineuropatia (JLPP), dziedziczna choroba nerwów, która dotyczy krtani i tylnych kończyn; test DNA rodziców pozwala hodowcom jej uniknąć.",
    heart_sas: "W rasie występuje zwężenie podzastawkowe aorty, czyli zwężenie tuż pod zastawką serca, które może powodować szmer; psy hodowlane powinny najpierw przejść badanie serca.",
    inherited_eye_defects: "W rasie występują dziedziczne choroby oczu, np. dysplazja siatkówki i przetrwała błona źreniczna; dostępne są badania oczu.",
    skin_fold_infections: "Fałdy skóry, zwłaszcza na pysku, mogą zatrzymywać wilgoć i ulegać zakażeniu (ropne zapalenie fałdów skóry); zmarszczki na pysku trzeba codziennie czyścić.",
    eyelid_eye_problems: "W rasie występują problemy z powiekami (podwinięte lub odwinięte powieki), suche oko i wypadnięcie gruczołu trzeciej powieki (tzw. cherry eye); dostępne są badania oczu.",
    hip_elbow_joint_disease: "W rasie występuje dysplazja stawów biodrowych i łokciowych – stawy nie rozwijają się prawidłowo, co może prowadzić do ich chorób.",
    hip_dysplasia_arthritis: "W rasie występuje dysplazja stawów biodrowych, czyli luźny, źle rozwinięty staw biodrowy, który z czasem może prowadzić do zwyrodnienia.",
    bleeding_disorder_vwd: "W rasie występuje choroba von Willebranda, dziedziczne zaburzenie krzepnięcia krwi, które może powodować nadmierne krwawienia.",
    heart_muscle_disease: "W rasie może wystąpić kardiomiopatia, czyli powiększenie serca spowodowane osłabieniem mięśnia sercowego.",
    itchy_skin_allergy: "W rasie mogą występować alergie skórne (atopia), które powodują swędzenie i podrażnienie skóry.",
    entropion_cherry_eye: "W rasie mogą występować podwinięte do środka powieki (entropium) i cherry eye, czyli wypadnięcie gruczołu trzeciej powieki; cherry eye można skorygować chirurgicznie.",
    dental_disease_tooth_brushing: "Duże brytyjskie badanie wskazuje choroby zębów jako zdecydowanie najczęstszy problem tej rasy; częste są też mleczne zęby, które nie wypadają, dlatego właścicielom zaleca się codzienną higienę zębów psa, np. ich mycie.",
    windpipe_collapse: "W rasie może wystąpić zapadanie się tchawicy – tchawica traci sztywność, co może powodować osłabienie i omdlenia.",
    eye_problems_pra_lens_dry_eye: "W rasie występują problemy z oczami, np. postępujący zanik siatkówki, który może powoli prowadzić do ślepoty, przemieszczenie soczewki (zwichnięcie soczewki) i suche oko.",
    cataracts_lens_luxation: "W rasie mogą występować problemy z oczami, np. zaćma, która zmętnia soczewkę, oraz przemieszczenie soczewki (zwichnięcie soczewki).",
    wobbler_syndrome: "W rasie może wystąpić zespół chwiejności (wobbler), w którym niestabilne kręgi szyjne uciskają rdzeń kręgowy i osłabiają tylne kończyny.",
    eye_phpv: "W rasie może wystąpić wrodzona wada oka (przetrwałe pierwotne ciało szkliste z przerostem, PHPV); hodowcom zaleca się badanie oczu rodziców.",
    certain_cancers: "W rasie mogą występować niektóre nowotwory.",
    bare_skin_sun_cold: "Naga skóra odmiany bezwłosej wymaga ochrony przed słońcem i zimnem.",
    l2hga_nervous_system: "W rasie może występować kwasica L-2-hydroksyglutarowa (L-2-HGA), dziedziczne zaburzenie metaboliczne, które dotyczy układu nerwowego; dostępny jest test DNA rodziców.",
    short_face_breathing: "Rasa o umiarkowanie krótkim pysku: niektóre psy o krótszym pysku mogą mieć poważne problemy z oddychaniem (zespół niedrożności dróg oddechowych u ras brachycefalicznych, BOAS).",
    corneal_ulcers: "Z powodu kształtu czaszki i wyłupiastych oczu częstsze są problemy z oczami, np. owrzodzenia rogówki; dostępne są badania oczu.",
    skin_folds_allergies: "Mogą występować problemy skórne, np. alergie, brodawki, włókniaki miękkie i podrażnione fałdy skóry na pysku (zapalenie fałdów skóry); fałdy na pysku trzeba utrzymywać w czystości i suchości.",
    heart_cardiomyopathy_aortic_stenosis: "W rasie mogą występować problemy z sercem, np. kardiomiopatia i zwężenie aorty.",
    dental_disease_care: "Duże brytyjskie badanie wskazuje choroby zębów jako najczęstszy problem tej rasy, a właścicielom zaleca się, by higiena zębów była priorytetem.",
    bladder_stones: "W rasie mogą występować kamienie w pęcherzu, czyli skupiska minerałów tworzące się w pęcherzu i moczu.",
    deafness: "W rasie występuje głuchota na jedno lub oba uszy; słuch szczeniąt można sprawdzić testem BAER.",
    mitral_valve_disease: "W rasie występuje choroba zastawki mitralnej, choroba serca, w której osłabiona zastawka pozwala krwi cofać się do serca; weterynarz może osłuchać serce psów hodowlanych przed kryciem.",
    eye_problems_pra_cataracts_dry_eye: "W rasie występują problemy z oczami, np. postępujący zanik siatkówki, który może powoli prowadzić do ślepoty, zaćma i suche oko; dostępne są badania oczu.",
    skin_comedo_allergy: "Mogą występować problemy skórne, np. zespół zaskórnikowy sznaucerów (rodzaj zapalenia mieszków włosowych) i alergie skórne (atopia), które powodują swędzenie.",
    shorter_face_boas: "Rasa brachycefaliczna (o krótkim pysku): krótszy pysk może powodować poważne problemy z oddychaniem (zespół niedrożności dróg oddechowych u ras brachycefalicznych, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "W rasie występują problemy z oczami, np. suche oko, zaćma, postępujący zanik siatkówki, który może powoli prowadzić do ślepoty, oraz odwarstwienie siatkówki.",
    hypothyroidism: "W rasie może występować niedoczynność tarczycy, która może wpływać na wagę, skórę i poziom energii.",
    open_fontanelle: "W rasie może występować otwarte ciemiączko, czyli miękkie miejsce na czaszce, które nie zamyka się całkowicie.",
    collapsing_trachea: "W rasie może występować zapadanie się tchawicy, czyli osłabienie tchawicy, które może powodować kaszel i trudności w oddychaniu.",
    gm1_gangliosidosis: "W rasie może występować gangliozydoza GM1, dziedziczna choroba układu nerwowego; test DNA rodziców pozwala ją wykluczyć.",
    addisons_disease: "W rasie może występować choroba Addisona, czyli niedobór hormonów nadnerczy.",
    protein_losing_disease: "W rasie mogą występować choroby nerek lub jelit z utratą białka, które mogą powodować biegunkę i chudnięcie.",
    diabetes_mellitus: "W rasie może występować cukrzyca – organizm nie potrafi prawidłowo regulować poziomu cukru we krwi.",
    dental_disease_home_brushing: "Jak wiele małych psów, ta rasa ma skłonność do chorób zębów, dlatego zaleca się mycie zębów w domu szczoteczką i pastą dla psów.",
    dermoid_sinus: "W rasie może występować zatoka dermoidalna, bolesna wada, w której kanał w skórze grzbietu łączy się z rdzeniem kręgowym; kluby rasy prowadzą program badania szczeniąt w jej kierunku.",
    cataracts: "W rasie może występować zaćma, która zmętnia soczewkę oka i może prowadzić do utraty wzroku.",
    pra_inherited_blindness: "W rasie może występować postępujący zanik siatkówki, dziedziczna choroba oczu, która może powoli prowadzić do ślepoty.",
    eyelids_turned: "W rasie mogą występować powieki podwinięte do środka (entropium) lub odwinięte na zewnątrz (ektropium); pytaj o rodziców z przebadanymi oczami.",
    glaucoma_poag: "W rasie może występować jaskra pierwotna otwartego kąta – płyn gromadzi się w oku i powoduje ból, a czasem ślepotę; istnieje test DNA dla rodziców.",
    skin_fold_dermatitis: "Luźna skóra tworzy fałdy, które mogą się podrażniać i ulegać zakażeniu; trzeba je codziennie sprawdzać i utrzymywać w czystości i suchości.",
    eyelid_problems: "W rasie mogą występować problemy z powiekami: powieki podwinięte do środka (entropium) lub odwinięte na zewnątrz (ektropium) oraz cherry eye, czyli wypadnięcie gruczołu trzeciej powieki.",
    skin_allergy_face_folds: "W rasie mogą występować alergie skórne (atopia), które powodują swędzenie, a fałdy skóry na pysku trzeba codziennie czyścić.",
    skin_ear_allergies: "W rasie mogą występować alergie środowiskowe, które mogą prowadzić do nawracających zakażeń skóry lub uszu; PetMD sugeruje cotygodniowe czyszczenie uszu psa z alergią.",
    gum_disease_daily_brushing: "Rasa ma skłonność do chorób dziąseł (zapalenia dziąseł i przyzębia), dlatego PetMD zaleca codzienne mycie zębów psa i coroczną kontrolę zębów u weterynarza.",
    pra_pk_def: "W rasie występują dwie choroby dziedziczne: postępujący zanik siatkówki, choroba oczu, która może prowadzić do ślepoty, oraz niedobór kinazy pirogronianowej, choroba krwi; testy DNA rodziców pozwalają hodowcom ich uniknąć.",
    windpipe_collapse_breathing: "W rasie może wystąpić zapadanie się tchawicy – chrząstki tchawicy zapadają się i utrudniają oddychanie.",
    eye_problems_pra_cataracts_entropion: "W rasie występują problemy z oczami, np. postępujący zanik siatkówki, który może powoli prowadzić do ślepoty, zaćma, która zmętnia soczewkę, i powieki podwinięte do środka (entropium); dostępne są badania oczu.",
    elbow_dysplasia_arthritis: "W rasie może występować dysplazja stawów łokciowych, czyli źle rozwinięty staw łokciowy, który z czasem może prowadzić do zwyrodnienia.",
    entropion: "W rasie może występować entropium – powieki podwijają się do środka i podrażniają oko; pytaj o rodziców z przebadanymi oczami.",
    autoimmune_conditions: "W rasie mogą występować choroby autoimmunologiczne, w których organizm atakuje sam siebie.",
    ear_infections_prone: "Rasa ma skłonność do zapaleń uszu; uważnie dbaj o higienę uszu.",
    familial_nephropathy: "W rasie występuje dziedziczna choroba nerek (rodzinna nefropatia); dostępny jest test DNA rodziców.",
    hereditary_nephritis: "W rasie występuje dziedziczna choroba nerek (dziedziczne zapalenie nerek, nazywane też dziedziczną glomerulopatią samojedów).",
    panosteitis: "W rasie może występować panosteitis, bolesne zapalenie kości długich, które dotyka zwykle młode, rosnące psy.",
    splenic_torsion: "Skręt śledziony, który wymaga pilnej pomocy weterynarza, występuje w tej rasie częściej niż u innych dużych ras.",
    urinary_incontinence: "W rasie może występować nietrzymanie moczu, czyli niekontrolowany wyciek moczu.",
    osteochondritis: "W rasie może występować osteochondroza rozwarstwiająca (OCD), zaburzenie chrząstki stawowej u rosnących psów.",
    scottie_cramp: "W rasie występuje „skurcz scottiego” – krótkie epizody skurczów mięśni, zwykle wywołane podekscytowaniem; nie jest bolesny.",
    periodontal_disease: "Choroba przyzębia, czyli zakażenie i zapalenie dziąseł i tkanek utrzymujących zęby, jest w tej rasie znanym problemem.",
    extra_eyelashes: "W rasie może występować dystichiaza – na wewnętrznej powierzchni lub brzegu powieki rosną małe dodatkowe rzęsy, które mogą ocierać oko; pytaj o rodziców przebadanych w programie badania oczu.",
    cm_sm_screening: "W rasie może występować malformacja typu Chiari z syringomielią, bolesna choroba z wypełnionymi płynem jamami w rdzeniu kręgowym przy mózgu; hodowcom zaleca się badanie rodziców (Wielka Brytania: program BVA/KC).",
    prominent_eyes_injury_dry_eye: "Wyłupiaste oczy łatwiej ulegają urazom, mogą też pojawić się na nich owrzodzenia i suchość; w rasie występują też suche oko i cherry eye.",
    legg_perthes: "W rasie może występować choroba Legga-Calvégo-Perthesa, bolesne schorzenie, w którym głowa kości udowej obumiera i się rozpada.",
    glaucoma: "W rasie może występować jaskra, czyli podwyższone ciśnienie w oku, które może być bolesne i prowadzić do ślepoty.",
    lethal_acrodermatitis: "W rasie występuje letalne zapalenie skóry kończyn (acrodermatitis), choroba dziedziczna, która u szczeniąt powoduje ciężkie problemy ze skórą i wzrostem.",
    kidney_disease_urine_screening: "W rasie występują problemy z nerkami; badania moczu pozwalają sprawdzić rodziców przed kryciem.",
    primary_lens_luxation: "W rasie występuje pierwotne zwichnięcie soczewki, bolesna dziedziczna choroba oczu, w której soczewka przesuwa się ze swojego miejsca i która może spowodować ślepotę; dla psów hodowlanych dostępny jest test DNA.",
    inherited_ataxia: "W rasie występują dziedziczne ataksje (ataksja o późnym początku i ataksja rdzeniowo-móżdżkowa), które powodują utratę równowagi i koordynacji; dla psów hodowlanych dostępne są testy DNA.",
    hydrocephalus: "W rasie może występować wodogłowie, czyli gromadzenie się płynu wokół mózgu.",
    heart_disease_pda: "W rasie mogą występować choroby serca, w tym przetrwały przewód tętniczy, czyli naczynie krwionośne przy sercu, które nie zamyka się po urodzeniu; weterynarz może go wykryć podczas pierwszej wizyty szczeniaka.",
    chiari_malformation: "W rasie może występować malformacja typu Chiari z syringomielią, bolesna choroba z wypełnionymi płynem jamami w rdzeniu kręgowym przy mózgu.",
    cataracts_entropion: "W rasie mogą występować zaćma, która zmętnia soczewkę oka, i powieki podwinięte do środka (entropium); pytaj o rodziców przebadanych w programie badania oczu.",
    periodontal_daily_brushing: "Rasa ma skłonność do chorób przyzębia, dlatego zaleca się codzienne mycie zębów pastą dla psów.",
    eye_problems_shallow_sockets: "W rasie występują problemy z oczami, np. suche oko, zakażenia oczu i owrzodzenia na powierzchni oka; płytkie oczodoły sprawiają też, że urazy oczu są bardziej prawdopodobne.",
    eye_problems_dry_eye_entropion_lens_luxation: "W rasie występują problemy z oczami, np. suche oko, powieki podwinięte do środka (entropium) i przemieszczenie soczewki (zwichnięcie soczewki); dostępne są badania oczu.",
    heart_valve_screening: "W rasie mogą występować choroby serca; badanie serca (USG) pozwala sprawdzić rodziców pod kątem problemów z zastawkami przed kryciem.",
    dental_weight_problems: "Duże brytyjskie badanie wymienia choroby zębów i nadwagę jako szczególnie częste problemy tej rasy – problemy, którym właściciele mogą pomóc zapobiegać; występują też stłoczone zęby i mleczne zęby, które nie wypadają.",
  },
  page: {
    eyebrow: "Encyklopedia zwierząt",
    // Search terms people use ("kot ragdoll", "charakter"); "charakter" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "charakter, " : ""}ruch, wielkość i pielęgnacja | PetPrep`
        : species === "cat"
          ? `${/^kot\b/i.test(name) ? name : `Kot ${mid(name)}`}: ${hasIntro ? "charakter, " : ""}pielęgnacja, wielkość i długość życia | PetPrep`
          : `${name} (${lc(one)}): potrzeby, długość życia i pielęgnacja | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Źródła, zdrowie i wskazówki przed zakupem.`,
    metaLabels: { weight: "masa ciała", exercise: "ruch", lifespan: "długość życia" },
    metaDescription: (name, one) =>
      `${name}: potrzeby tej rasy (${lc(one)}) według źródeł – ruch, pielęgnacja, posiłki, wielkość, długość życia, dla kogo się nada – i jak symuluje ją PetPrep.`,
    suitabilityTitle: "Dla kogo się nada",
    suitabilityNote: "Te same oznaczenia co w aplikacji. Każde potwierdzają źródła wymienione na dole strony.",
    suitabilityNone: "Dla tej rasy nie mamy jeszcze oznaczeń potwierdzonych źródłami.",
    needsTitle: "Czego potrzebuje",
    needsIntro: (species) =>
      species === "cat"
        ? "Według organizacji felinologicznych, organizacji weterynaryjnych i badań. Gdy źródła się różnią, pokazujemy każde."
        : "Według wzorców ras, związków kynologicznych, weterynaryjnych organizacji charytatywnych i badań. Gdy źródła się różnią, pokazujemy każde.",
    general: (many) => `Ogólne zalecenia dla ${gen(many)} (nie tylko dla tej rasy):`,
    noData: "Tego nie ma jeszcze w naszych źródłach.",
    simTitle: "Jak symuluje to PetPrep",
    simBadge: "Zasady gry, nie porada weterynaryjna",
    simIntro:
      "W aplikacji PetPrep jeden prawdziwy tydzień to jeden miesiąc życia pupila. Oto zasady, których gra używa dla tej rasy. PetPrep wybrał je na podstawie źródeł z tej strony; nie są to instrukcje opieki nad prawdziwym zwierzęciem.",
    simInfoOnly: "Ta rasa jest w encyklopedii tylko w celach informacyjnych; aplikacja jeszcze jej nie symuluje.",
    simTable: { stage: "Etap życia", starts: "Początek", meals: "Posiłki dziennie", activity: { steps: "Dzienny cel kroków", play_sessions: "Zabawa dziennie" } },
    arrives: (m) => `przybywa w wieku ${m} ${form(m, "miesiąca", "miesięcy", "miesięcy", "miesiąca")}`,
    fromMonth: (m, years) => (years ? `${m}. miesiąc (${years})` : `${m}. miesiąc`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `od ${x.from}. miesiąca: ${x.meals}`)).join("; "),
    simDecisions: "Każda liczba w grze to decyzja PetPrep zapisana razem ze źródłami.",
    healthTitle: "Zdrowie",
    healthNote: "Wyłącznie informacyjnie, bez weryfikacji przez weterynarza. O zdrowie swojego zwierzęcia zapytaj weterynarza.",
    healthNone: "Nasze źródła nie zawierają jeszcze informacji o zdrowiu typowych dla tej rasy.",
    checklistTitle: "Przed zakupem: co sprawdzić u hodowcy",
    checklistIntro: (speciesId) =>
      speciesId === "cat"
        ? "Pytania, które warto wyjaśnić, zanim zabierzesz kocię do domu. Punkty to rady weterynarzy, organizacji dbających o dobrostan zwierząt i federacji felinologicznych; przy każdym podano źródło."
        : "Pytania, które warto wyjaśnić, zanim zabierzesz szczeniaka do domu. Punkty to rady weterynarzy, organizacji dbających o dobrostan zwierząt i związków kynologicznych; przy każdym podano źródło.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Przepisy dotyczące minimalnego wieku, czipowania i szczepień różnią się w zależności od kraju – sprawdź zasady obowiązujące tam, gdzie mieszkasz.",
    checklistGeneralTitle: "Dla każdej rasy",
    checklistTestsTitle: "Badania zdrowotne rodziców dla tej rasy",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Badania, których federacja felinologiczna wymaga przed dopuszczeniem kota do hodowli" : "Badania, które The Royal Kennel Club zaleca jako minimum",
      best_practice: "Dodatkowe badania zgodnie z najlepszą praktyką",
      other_scheme: "Inne programy badań dla tej rasy",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Ta lista pochodzi z zasad hodowli zagranicznej federacji felinologicznej (zobacz źródło) i ma charakter orientacyjny. Zapytaj hodowcę, jakie badania przeszli rodzice."
        : "Te listy pochodzą od brytyjskiego The Royal Kennel Club i mają charakter orientacyjny; krajowe związki kynologiczne mogą mieć własne, surowsze zasady. Zapytaj klub rasy i hodowcę, jakie badania przeszli rodzice.",
    checklistStatus: {
      none_recommended: "The Royal Kennel Club nie wymienia obecnie dla tej rasy zalecanych badań zdrowotnych przed kryciem. Mimo to zapytaj hodowcę o zdrowie rodziców.",
      not_found: "Nie znaleźliśmy jeszcze wiarygodnego źródła, które wymienia badania zdrowotne rodziców tej rasy. Zapytaj klub rasy i hodowcę, jakie badania przeszli rodzice.",
      not_checked: "Nie sprawdziliśmy jeszcze badań zdrowotnych rodziców tej rasy. Zapytaj klub rasy i hodowcę, jakie badania przeszli rodzice.",
    },
    sourcesTitle: "Źródła",
    sourcesIntro: "Każdy fakt na tej stronie powołuje się na jedno z tych źródeł.",
    sourceLabel: (id, publisher) => `Źródło ${id}: ${publisher}`,
    disclaimer: "PetPrep to symulacja dla rodzin. Ta strona nie jest poradą weterynaryjną – w sprawie prawdziwego zwierzęcia zapytaj weterynarza lub klub rasy.",
    backTo: (many) => `Wszystkie rasy ${gen(many)}`,
    compareWith: "Porównaj z innymi rasami",
    related: { title: "Podobne rasy", intro: (many) => `Inne rasy ${gen(many)} w encyklopedii o podobnych potrzebach – każda z faktami ze źródeł.` },
    updated: "Zaktualizowano",
    glanceTitle: "W skrócie",
    glanceNote: "Najważniejsze fakty ze źródeł wymienionych na dole strony. Gdy źródła się różnią, podajemy każdą wartość.",
    portraitAlt: { ai_photo: (name) => `${name} – zdjęcie (AI)`, ai_illustration: (name) => `${name} – ilustracja (AI)` },
    portraitCaption: { ai_photo: "Zdjęcie wygenerowane przez AI", ai_illustration: "Ilustracja wygenerowana przez AI" },
    portraitColours: {
      legend: "Umaszczenie",
      alt: { ai_photo: (name, colour) => `${name}, umaszczenie ${lc(colour)} – zdjęcie (AI)`, ai_illustration: (name, colour) => `${name}, umaszczenie ${lc(colour)} – ilustracja (AI)` },
    },
    share: {
      button: "Udostępnij",
      title: "Udostępnij tę rasę",
      copy: "Kopiuj",
      copied: "Skopiowano",
      linkLabel: "Link do tej strony",
      more: "Więcej opcji",
      text: (name) => `${name}: potrzeby, źródła i jak symuluje ją PetPrep`,
      emailSubject: (name) => `${name} – encyklopedia zwierząt PetPrep`,
      on: (network) => `Udostępnij w: ${network}`,
    },
    og: { lead: "Potrzeby, źródła i jak symuluje ją PetPrep", photoLabel: "Zdjęcie AI" },
    qa: {
      title: "Pytania i odpowiedzi",
      intro: "Odpowiadamy wyłącznie na podstawie faktów ze źródeł z tej strony; przy każdej odpowiedzi podajemy jej źródła.",
      // Breed names are lower case in running text ("owczarek niemiecki", "border collie"); the wording avoids
      // adjectives that would have to agree with the gender of the name ("akita amerykańska" is feminine).
      questions: {
        exercise: (n) => `Ile ruchu potrzebuje ${mid(n)}?`,
        lifespan: (n) => `Jak długo żyje ${mid(n)}?`,
        size: (n) => `Jakie rozmiary osiąga ${mid(n)} i ile waży?`,
        grooming: (n) => `Jakiej pielęgnacji wymaga ${mid(n)}?`,
        suits: (n) => `Dla kogo ${mid(n)} będzie dobrym wyborem?`,
      },
      leads: {
        exercise: (n) => `Według naszych źródeł ${mid(n)} potrzebuje tyle ruchu:`,
        lifespan: (n) => `Według naszych źródeł ${mid(n)} żyje:`,
        size: (n) => `Wielkość i masa ciała (${mid(n)}) według naszych źródeł:`,
        grooming: (n) => `Sierść i pielęgnacja (${mid(n)}) według naszych źródeł:`,
        suits: (n) => `Według naszych źródeł ${mid(n)} dobrze się sprawdzi:`,
      },
      considerLead: "Pamiętaj:",
      differ: "Źródła podają różne wartości, dlatego wymieniamy każdą.",
      join: "; ",
    },
  },
  intros: {
    shar_pei: {
      aka: "chiński shar pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Shar pei (w USA „Chinese Shar-Pei”) to aktywny, zwarty, kwadratowo zbudowany pies średniej wielkości z Chin o krótkiej, szorstkiej, szczeciniastej sierści w jednym jednolitym kolorze (każdym oprócz białego), ze zmarszczkami na głowie i w kłębie oraz szeroką kufą. Wzorzec Royal Kennel Club podaje wysokość 46–51 cm, a PDSA masę 20–27 kg; pies tej wielkości kończy rosnąć w wieku około 12–15 miesięcy (PetMD). Royal Kennel Club i PDSA podają długość życia ponad 10 lat, ale badanie VetCompass psów w Wielkiej Brytanii wykazało medianę 7,3 roku.",
        "Royal Kennel Club zaleca do godziny ruchu dziennie i szczotkowanie raz w tygodniu, a rasę zalicza do kategorii 2 programu Breed Watch z powodu problemów z powiekami i fałdami skóry. PDSA opisuje shar pei jako wierne, oddane psy rodzinne, które najlepiej pasują do doświadczonych opiekunów i starszych dzieci, ostrzega przed silnym instynktem łowieckim wobec mniejszych zwierząt i radzi utrzymywać fałdy skóry w czystości i suchości oraz robić przerwę między posiłkiem a ruchem.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Border collie to średniej wielkości pies pasterski z Wielkiej Brytanii, stworzony do wytrwałej i ciężkiej pracy. Wzorzec rasy opisuje go jako psa chętnego do pracy, czujnego, wrażliwego na polecenia i inteligentnego, który nie jest ani nerwowy, ani agresywny.",
        "Związki kynologiczne i weterynarze zgadzają się przede wszystkim co do jednego: to rasa o bardzo dużej energii. Każdego dnia potrzebuje ponad dwóch godzin ruchu i wielu zadań dla głowy. Gdy się nudzi albo ma za mało ruchu, sam szuka sobie zajęcia – gryzie wszystko, co jest w zasięgu, albo próbuje „zaganiać” bawiące się dzieci.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labrador, lab",
      text: [
        "Labrador retriever to duży, mocno zbudowany pies myśliwski z Wielkiej Brytanii, wyhodowany do aportowania. Wzorzec opisuje go jako zrównoważonego, łagodnego i elastycznego towarzysza, który chętnie współpracuje i uwielbia wodę. Sierść jest krótka i gęsta, w umaszczeniu czarnym, biszkoptowym (żółtym) lub wątrobianym/czekoladowym.",
        "Brytyjskie organizacje charytatywne opisują labradora jako psa rodzinnego, który – dobrze zsocjalizowany – przywiązuje się do całego domu. Jest bardzo aktywny i mocno motywowany jedzeniem: smakołyki pomagają w szkoleniu, ale labradory łatwo też przybierają na wadze.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "golden, goldie",
      text: [
        "Golden retriever to duży pies myśliwski z Wielkiej Brytanii o prostej lub falistej sierści w odcieniach złota lub kremu. Wzorzec opisuje go jako posłusznego, inteligentnego psa, który jest łagodny, przyjazny i pewny siebie.",
        "Brytyjskie organizacje charytatywne nazywają go świetnym psem dla aktywnej rodziny, który może być dobrym pierwszym psem. Źródła jasno pokazują jednak, czego wymaga: co najmniej dwóch godzin ruchu dziennie, szczotkowania kilka razy w tygodniu – a do tego mocno linieje.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "buldożek francuski, frenchie, French bulldog",
      text: [
        "Buldog francuski to mały, krępy pies do towarzystwa z Francji o krótkiej, gładkiej sierści i stojących „nietoperzowych uszach”. Wzorzec opisuje go jako towarzyskiego, żywego i skorego do zabawy psa; brytyjskie organizacje charytatywne nazywają go spokojnym i łatwo przystosowującym się, a według nich zwykle dobrze dogaduje się z dziećmi, co uczyniło go popularnym psem rodzinnym.",
        "Potrzebuje do godziny ruchu dziennie i nadaje się do mieszkania. Każde źródło wskazuje jednak na płaski pysk: może on utrudniać oddychanie, a buldogi francuskie szybko się przegrzewają, zwłaszcza w ciepłe dni – dlatego ważne są cień, woda i spokojne spacery. PDSA sugeruje, by rodziny rozważyły też adopcję dorosłego buldoga francuskiego.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "owczarek, wilczur, ON, German shepherd",
      text: [
        "Owczarek niemiecki to duży, silny pies pasterski z Niemiec o stojących uszach i gęstej podwójnej sierści, krótkiej lub długiej. Wzorzec opisuje go jako zrównoważonego, pewnego siebie psa o mocnych nerwach, a The Royal Kennel Club nazywa go wszechstronnym psem pracującym i służbowym, znanym z odwagi i inteligencji.",
        "Potrzebuje co najmniej dwóch godzin ruchu dziennie, nadaje się do dużego domu z ogrodem i mocno linieje. Według brytyjskich organizacji charytatywnych niektóre owczarki mogą być wspaniałymi psami rodzinnymi, ale przy małych dzieciach zawsze trzeba je nadzorować. The Royal Kennel Club prosi hodowców o badanie bioder i łokci rodziców i wskazuje budowę tylnych kończyn jako problem w tej rasie.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "cavalier, cavalier king charles, king charles spaniel, CKCS",
      text: [
        "Cavalier king charles spaniel to mały spaniel do towarzystwa z Wielkiej Brytanii o długich, obficie owłosionych uszach i długiej, jedwabistej sierści w czterech umaszczeniach: blenheim, rubinowym, czarnym podpalanym i trójkolorowym. Wzorzec opisuje go jako aktywnego, pełnego wdzięku psa o łagodnym wyrazie – sportowego, czułego, przyjaznego i nieustraszonego.",
        "Potrzebuje około godziny ruchu dziennie, może mieszkać w mieszkaniu i znany jest z tego, że dobrze czuje się przy dzieciach, choć zabawę trzeba nadzorować, a on nie lubi zostawać sam. Jego sierść wymaga szczotkowania częściej niż raz w tygodniu. Brytyjskie źródła jako główne problemy zdrowotne wymieniają chorobę zastawki serca i bolesną chorobę rdzenia kręgowego związaną z kształtem czaszki, dlatego hodowców prosi się o badanie serca i rezonans magnetyczny psów.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Beagle to mały pies gończy z Wielkiej Brytanii, wyhodowany do polowania na zające po tropie. Wzorzec opisuje go jako mocnego, zwartego, wesołego psa – śmiałego, aktywnego i czujnego, przyjaznego, bez agresji i lękliwości – o krótkiej, gęstej sierści w umaszczeniach typowych dla psów gończych, np. trójkolorowym, podpalano-białym lub cytrynowo-białym, zawsze z białą końcówką ogona.",
        "Potrzebuje do około godziny ruchu dziennie i dobrze odnajduje się w życiu rodzinnym, jeśli jest socjalizowany od małego, choć przy dzieciach trzeba go nadzorować i nie należy zostawiać go samego – wtedy może szczekać i gryźć przedmioty. Krótką sierść wystarczy szczotkować raz w tygodniu, ale linieje. Szkolenie powinno zacząć się wcześnie i opierać na nagrodach. Brytyjscy weterynarze najczęściej widzą beagle z nadwagą i chorobami zębów, dlatego trzeba pilnować porcji i zębów.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "pudel, pudel królewski, pudel standardowy, Standard poodle",
      text: [
        "Pudel duży to największa z czterech odmian pudla, rasa do towarzystwa z Francji, która wywodzi się od europejskich psów do polowania na kaczki. Wzorzec opisuje go jako eleganckiego, harmonijnie zbudowanego psa o dumnej postawie – wiernego, radosnego i zrównoważonego, zdolnego do nauki i podatnego na szkolenie – o obfitej, kędzierzawej sierści w jednym jednolitym umaszczeniu: czarnym, białym, brązowym, szarym lub płowym.",
        "Potrzebuje do około godziny ruchu dziennie i nadaje się do dużego domu z dużym ogrodem. Przy właściwej socjalizacji w okresie szczenięcym zwykle dobrze dogaduje się z dziećmi i innymi zwierzętami. Jego sierść nie linieje, ale to nie znaczy, że jest hipoalergiczny: wymaga codziennej pielęgnacji i regularnego strzyżenia u groomera. Jest znany z dużego posłuszeństwa i dobrze reaguje na szkolenie.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "jamnik krótkowłosy, jamnik standardowy, Dachshund, Teckel",
      text: [
        "Jamnik to niemiecki pies do polowania na borsuki i króliki, w Niemczech nazywany teckel, który występuje w kilku wielkościach i trzech odmianach sierści; ta strona dotyczy jamnika standardowego krótkowłosego. Wzorzec opisuje psa umiarkowanie długiego w stosunku do wysokości, bez przesady w budowie – wiernego, wszechstronnego i zrównoważonego; inteligentnego, żywego i odważnego – o gęstej, krótkiej, gładkiej sierści w umaszczeniu rudym albo czarnym lub czekoladowym z podpalaniem.",
        "Potrzebuje do około godziny ruchu dziennie, podzielonej na kilka spacerów z czasem na węszenie, i nadaje się do małego domu. Kocha ludzi i zwykle dobrze dogaduje się z dziećmi w każdym wieku, zawsze pod nadzorem, ale z powodu silnego instynktu łowieckiego nie poleca się go do domów z mniejszymi zwierzętami; źle znosi też samotność. Z powodu długiego grzbietu i krótkich łap ma skłonność do dyskopatii, więc nie powinien skakać; hodowców prosi się o badanie kręgosłupa przed kryciem.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie, Australian shepherd",
      text: [
        "Owczarek australijski to, wbrew nazwie, rasa amerykańska – inteligentny pies pracujący o silnym instynkcie pasterskim i stróżującym. Wzorzec opisuje go jako harmonijnie zbudowanego psa średniej wielkości, nieco dłuższego niż wyższego, o dobrym usposobieniu, czasem powściągliwego przy pierwszym spotkaniu, z sierścią średniej długości, prostą lub falistą, w umaszczeniu blue merle, czarnym, red merle lub rudym, każde z białymi znaczeniami i podpalaniem lub bez nich.",
        "Potrzebuje ponad dwóch godzin ruchu dziennie oraz wyzwań dla głowy, takich jak gry-łamigłówki i szkolenie, i nadaje się do dużego domu z dużym ogrodem na wsi. W odpowiednim domu może być naprawdę dobrym psem rodzinnym, ale silny instynkt pasterski może sprawić, że będzie „zaganiał” dzieci, dlatego nie poleca się go rodzinom z mniejszymi dziećmi. Nie lubi zostawać sam, a jego sierść wymaga szczotkowania kilka razy w tygodniu.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "bichon hawański, Havanese, Bichon havanais",
      text: [
        "Hawańczyk to mały przedstawiciel rodziny bichonów i narodowy pies Kuby. Wzorzec opisuje krzepkiego, niskonożnego psa o bardzo długiej, miękkiej, prostej lub falistej sierści, której nigdy się nie przycina, i ogonie noszonym wysoko nad grzbietem. Występuje w umaszczeniu płowym, czarnym, hawańskim brązowym, tytoniowym, rudobrązowym i rzadko białym, z łatami i podpalaniem lub bez nich.",
        "Wzorzec nazywa go czułym, skorym do zabawy, a nawet trochę klaunem i mówi, że kocha dzieci i bez końca się z nimi bawi; brytyjskie źródła nazywają go – przy właściwej socjalizacji – doskonałym psem rodzinnym, łatwym w szkoleniu. Potrzebuje około 30 minut ruchu dziennie, może mieszkać w mieszkaniu i nie linieje – ale długą sierść trzeba pielęgnować codziennie, żeby nie tworzyły się kołtuny i supły.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie, west highland, west terrier",
      text: [
        "West highland white terrier, czyli westie, to mały terier z Wielkiej Brytanii. Wzorzec opisuje mocno zbudowanego psa o głębokiej klatce piersiowej, prostym grzbiecie i szorstkiej podwójnej sierści długości około 5\u00a0cm, z małymi, stojącymi, spiczastymi uszami i ciemnymi oczami osadzonymi pod krzaczastymi brwiami. Jedynym umaszczeniem dopuszczonym przez wzorzec jest białe.",
        "Wzorzec nazywa go czujnym, wesołym, odważnym i samodzielnym, ale przyjaznym. Brytyjskie źródła opisują go jako czułego, skorego do zabawy psa rodzinnego dla dzieci w każdym wieku, zawsze przy zabawie pod nadzorem; potrzebuje około godziny ruchu dziennie, może mieszkać w mieszkaniu, linieje i wymaga szczotkowania kilka razy w tygodniu. Z powodu instynktu łowieckiego nie powinien mieszkać z mniejszymi zwierzętami i nie lubi zostawać sam. Znanym problemem jest skóra: The Royal Kennel Club prosi sędziów, by zwracali uwagę na oznaki zapalenia skóry w tej rasie.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berneńczyk, berneński, Bernese mountain dog, Berner Sennenhund",
      text: [
        "Berneński pies pasterski to duży szwajcarski pies gospodarski, używany pierwotnie w kantonie Berno jako stróż, pies pociągowy i pies do bydła. Wzorzec opisuje silnego, zwinnego, długowłosego psa pracującego o mocnych kończynach i długiej, lśniącej, prostej lub lekko falistej sierści. Jedynym umaszczeniem dopuszczonym przez wzorzec jest trójkolorowe: kruczoczarne z intensywnym podpalaniem na policzkach, nad oczami, na łapach i piersi oraz z białymi znaczeniami na głowie i piersi.",
        "Wzorzec nazywa go pewnym siebie, dobrodusznym i przyjaznym oraz „łagodnym i oddanym psem rodzinnym”, który późno dojrzewa. Według brytyjskich źródeł potrzebuje do godziny ruchu dziennie, powinien mieszkać w dużym domu z dużym ogrodem, mocno linieje i wymaga szczotkowania częściej niż raz w tygodniu; nie należy go zostawiać samego na długo. Zwykle żyje krócej niż dziesięć lat, a brytyjskie źródła wymieniają wśród jego problemów zdrowotnych dysplazję stawów biodrowych i łokciowych, skręt żołądka i niektóre nowotwory.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "husky, haski, Siberian husky",
      text: [
        "Husky syberyjski to średniej wielkości pies zaprzęgowy, uznawany przez FCI za rasę amerykańską, a przez The Royal Kennel Club opisywany jako najlżejszy i najszybszy z psów zaprzęgowych. Wzorzec wymaga psa szybkiego i lekkiego w ruchu, o podwójnej sierści średniej długości, grubych stojących uszach, brązowych lub niebieskich oczach (dopuszczalne jest jedno oko każdego koloru) i dobrze owłosionym ogonie. Umaszczenia sięgają od czarnego po czysto białe; merle i pręgowane są niedopuszczalne.",
        "Wzorzec nazywa go przyjaznym i łagodnym, czujnym i otwartym. Według brytyjskich źródeł potrzebuje ponad dwóch godzin ruchu dziennie, dużego domu z dużym ogrodem i bardzo solidnego, wysokiego ogrodzenia, bo husky słyną z ucieczek; mocno linieje, wymaga szczotkowania kilka razy w tygodniu i źle znosi samotność. PDSA poleca go raczej do domów, w których mieszkają tylko dorośli lub nastolatki, niż rodzinom z mniejszymi dziećmi, i wymienia wśród jego problemów zdrowotnych dysplazję stawów biodrowych, problemy z oczami i padaczkę.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "rotweiler, rottie",
      text: [
        "Rottweiler to średni do dużego, silny pies pracujący z Niemiec. Wzorzec opisuje solidnego psa, ani ciężkiego, ani lekkiego, o krótkiej, szorstkiej, przylegającej sierści, średnich wiszących uszach i ciemnobrązowych oczach w kształcie migdała. Jedynym dopuszczalnym umaszczeniem jest czarne z wyraźnie odgraniczonym, intensywnym podpalaniem na policzkach, kufie, gardle, piersi i łapach; białe znaczenia są wadą.",
        "Wzorzec nazywa go dobrodusznym, spokojnym, bardzo oddanym, posłusznym i chętnym do pracy, a The Royal Kennel Club mówi, że dobrze wyszkolony rottweiler jest wspaniałym towarzyszem rodziny. Według brytyjskich źródeł potrzebuje ponad dwóch godzin ruchu dziennie, dużego domu z dużym ogrodem i doświadczonego właściciela, bo jest bardzo silny; powinien być socjalizowany od małego. PDSA nie poleca go rodzinom z młodszymi dziećmi i niemowlętami, a z innymi zwierzętami nigdy nie powinien zostawać bez nadzoru. Wystarczy szczotkowanie raz w tygodniu. Zwykle żyje krócej niż dziesięć lat, a The Royal Kennel Club zwraca uwagę na budowę jego tylnych kończyn.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "buldog, English bulldog, British bulldog",
      text: [
        "Buldog angielski to średniej wielkości, gładkowłosy pies z Wielkiej Brytanii: dość masywny, niski, szeroki, silny i zwarty, ze stosunkowo krótkim pyskiem, małymi cienkimi uszami w kształcie róży i okrągłymi, bardzo ciemnymi oczami. Wzorzec dopuszcza umaszczenia jednolite, np. rude, płowe, jasnopłowe i białe, a także pręgowane i łaciate; czarne oraz czarne podpalane są wysoce niepożądane. Wymaga dużych, szeroko otwartych nozdrzy i mówi, że psy z widocznymi trudnościami w oddychaniu są wysoce niepożądane.",
        "Wzorzec nazywa go czujnym, śmiałym, lojalnym, niezawodnym i odważnym, groźnym z wyglądu, ale czułym, a The Royal Kennel Club mówi, że dzięki charakterowi i lojalności wciąż jest bardzo popularnym psem rodzinnym. Według brytyjskich źródeł potrzebuje do godziny ruchu dziennie, nigdy w największym upale, i dobrze dogaduje się z innymi zwierzętami w domu, jeśli jest socjalizowany od małego; pielęgnacja raz w tygodniu wystarczy, ale zmarszczki na pysku trzeba czyścić codziennie. PDSA opisuje go jako rasę o skrajnie płaskim pysku, która bardzo prawdopodobnie będzie miała poważne problemy zdrowotne, np. trudności z oddychaniem, i zdecydowanie zaleca rozważenie zdrowszej rasy, krzyżówki lub mieszańca. Zwykle żyje krócej niż dziesięć lat.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "wyżeł niemiecki, kurzhaar, Deutsch Kurzhaar, German shorthaired pointer, GSP",
      text: [
        "Wyżeł niemiecki krótkowłosy to wszechstronny pies myśliwski z Niemiec, stworzony do pracy w polu i w wodzie, o krótkiej, gęstej sierści szorstkiej w dotyku, szerokich, płaskich, wysoko osadzonych uszach i ciemnobrązowych oczach w kształcie migdała. Jego amerykański wzorzec dopuszcza umaszczenie jednolicie wątrobiane, wątrobiano-białe (np. nakrapiane), jednolicie czarne i czarno-białe; rude, pomarańczowe, cytrynowe lub podpalane partie oraz jednolicie biały pies dyskwalifikują. Wzorzec opisuje kopiowany ogon – PetPrep zawsze pokazuje psa z naturalnym ogonem.",
        "Wzorzec nazywa go przyjaznym, inteligentnym i chętnym do współpracy. The Royal Kennel Club i PDSA mówią, że potrzebuje ponad dwóch godzin ruchu dziennie; PDSA dodaje, że na spacerze może się w nim obudzić instynkt tropienia, wystawiania i aportowania, więc potrzebuje dobrego szkolenia przywołania, i że szkoli się go dość łatwo. Wymaga pielęgnacji raz lub dwa razy w tygodniu i umiarkowanie linieje. Duże brytyjskie badanie podaje medianę oczekiwanej długości życia 13,4 roku.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "yorkie, york, yorek, yorkshire",
      text: [
        "Yorkshire terrier to miniaturowy terier z Wielkiej Brytanii, który według wzorca waży do 3,2\u00a0kg, o długiej, idealnie prostej, lśniącej i jedwabistej sierści opadającej równo po obu stronach od przedziałka wzdłuż grzbietu. Wzorzec dopuszcza jedno umaszczenie: ciemnostalowo-niebieskie od potylicy do ogona z intensywnym, jasnym podpalaniem na głowie, piersi i łapach; małe uszy w kształcie litery V są noszone stojąco. Wzorzec opisuje zarówno kopiowany, jak i niekopiowany ogon – PetPrep zawsze pokazuje psa z naturalnym ogonem.",
        "Wzorzec nazywa go czujnym, inteligentnym i pełnym temperamentu, o zrównoważonym usposobieniu. The Royal Kennel Club zaleca do 30 minut ruchu dziennie i codzienną pielęgnację; PDSA dodaje, że lubi biegać, aportować i bawić się, bywa dość uparty w szkoleniu i lepiej pasuje do rodzin ze starszymi dziećmi, bo ma bardzo delikatne kości. Duże brytyjskie badanie wykazało, że najczęstszym problemem w tej rasie są choroby zębów, zaleca codzienną higienę zębów, np. ich mycie, i podaje medianę wieku w chwili śmierci 13,56 roku.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "cane corso italiano, corso, włoski pies obronny",
      text: [
        "Cane corso to średni do dużego włoski molos, solidny i mocny pies z pewną elegancją, nieco dłuższy niż wyższy. Wzorzec opisuje krótką, lśniącą, bardzo gęstą sierść w umaszczeniu czarnym, w odcieniach szarości, płowym lub rudym z ciemną maską, ciemnopszenicznym lub pręgowanym; duże białe łaty są niedopuszczalne. Zgodnie z obecnym wzorcem FCI uszy pozostają nieprzycięte, a ogon naturalny – a w Wielkiej Brytanii przycinanie uszu i kopiowanie ogonów jest zakazane – dlatego PetPrep zawsze pokazuje psa z naturalnymi uszami i ogonem.",
        "Wzorzec nazywa go obrońcą mienia, rodziny i stada, niezwykle zwinnym i reagującym na polecenia. PDSA mówi, że jest towarzyski i czuły wobec właścicieli, potrzebuje około dwóch godzin ruchu dziennie i zajęć, bo nie znosi nudy, a ze względu na wielkość lepiej pasuje do doświadczonych właścicieli. Nie poleca rasy do domów z małymi dziećmi, które mógłby przewrócić; nadaje się do domów, w których mieszkają tylko dorośli, lub do rodzin ze starszymi dziećmi. Wystarczy szczotkowanie raz w tygodniu, ale linieje i znany jest ze ślinienia się. PDSA podaje, że przeciętnie żyje krócej niż dziesięć lat.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, pembroke, welsh corgi, Pembroke Welsh corgi",
      text: [
        "Welsh corgi pembroke to mały pies do bydła z Walii, niski, silny i mocno zbudowany, sprawiający wrażenie dużej siły i wytrzymałości w niewielkim ciele. Wzorzec opisuje sierść średniej długości, prostą, z gęstym podszerstkiem, w umaszczeniu rudym, sobolowym, płowym lub czarnym podpalanym, z białymi znaczeniami na łapach, piersi i szyi lub bez nich, oraz stojące uszy. Dawniej ogon zwyczajowo kopiowano; wzorzec opisuje też naturalny ogon, a PetPrep zawsze pokazuje psa z naturalnym ogonem.",
        "Wzorzec nazywa go śmiałym, chętnym do pracy, otwartym i przyjaznym. The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu; PDSA opisuje przyjazne, radosne, kochające zabawę psy, które chętnie współpracują i dość łatwo się uczą, ale mówi, że mogą podszczypywać pięty biegających dzieci, dlatego pomaga socjalizacja z dziećmi i szkolenie od małego. The Royal Kennel Club podaje, że żyje ponad 12 lat, i prosi hodowców o ocenę bioder rodziców.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "dobermann, doberman pinczer, Doberman pinscher",
      text: [
        "Doberman to średniej wielkości niemiecki pies do towarzystwa, obrony i pracy, mocny i muskularny, o eleganckich liniach i dumnej postawie. Wzorzec FCI opisuje krótką, twardą, gęstą sierść, ściśle i gładko przylegającą, w umaszczeniu czarnym lub brązowym z wyraźnie odgraniczonym rdzawoczerwonym podpalaniem; białe plamy są niedopuszczalne. Zgodnie ze wzorcem FCI uszy i ogon pozostają naturalne, a PetPrep zawsze pokazuje psa z naturalnymi uszami i ogonem.",
        "Wzorzec nazywa go przyjaznym i spokojnym oraz bardzo oddanym rodzinie. The Royal Kennel Club mówi, że dzięki lojalności i posłuszeństwu jest doskonałym psem rodzinnym, i zaleca ponad dwie godziny ruchu dziennie oraz pielęgnację raz w tygodniu. PDSA dodaje, że jest bardzo energiczny, potrzebuje dużo ruchu i zajęć dla głowy oraz wczesnej socjalizacji i – ze względu na dużą wielkość i mocną budowę – nie poleca się go rodzinom z małymi dziećmi ani osobom, które mają psa po raz pierwszy. The Royal Kennel Club podaje, że żyje ponad 10 lat.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "bokser niemiecki, Boxer, Deutscher Boxer",
      text: [
        "Bokser to średniej wielkości niemiecki pies pracujący i do towarzystwa, o kwadratowej sylwetce, mocnym kośćcu i dobrze rozwiniętych mięśniach. Wzorce opisują krótką, lśniącą, gładką sierść w umaszczeniu płowym lub pręgowanym z czarną maską; białe znaczenia są dopuszczalne, ale nie powinny zajmować więcej niż jednej trzeciej sierści. Kufa powinna być szeroka i głęboka, nigdy krótka, z szerokimi nozdrzami. Dawniej ogon zwyczajowo kopiowano; wzorzec opisuje też niekopiowany ogon, a PetPrep zawsze pokazuje psa z naturalnymi uszami i ogonem.",
        "Wzorzec nazywa go zrównoważonym, posłusznym, nieustraszonym i pewnym siebie. The Royal Kennel Club nazywa go bardzo lubianym psem rodzinnym i zaleca ponad dwie godziny ruchu dziennie oraz pielęgnację raz w tygodniu. PDSA opisuje bardzo energicznego, skorego do zabawy psa, który kocha towarzystwo ludzi i zostawiony sam może rozwinąć lęk separacyjny, ma bardzo silny instynkt łowiecki; ze względu na wielkość i żywiołowość PDSA nie poleca go do domów z młodszymi dziećmi ani osobom, które mają psa po raz pierwszy. Niektóre boksery o krótszym pysku mogą mieć poważne problemy z oddychaniem. The Royal Kennel Club podaje, że żyje ponad 10 lat.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "sznaucer, sznaucer mały, Zwergschnauzer, Miniature schnauzer",
      text: [
        "Sznaucer miniaturowy to mały niemiecki pies do towarzystwa: mocny, krępy i niemal kwadratowy, o szorstkiej, drutowatej, gęstej sierści, krzaczastych brwiach i brodzie. Wzorzec FCI dopuszcza umaszczenie pieprz z solą, czarne ze srebrem, czysto czarne i czysto białe; PetPrep pokazuje pierwsze trzy. Dawniej ogon zwyczajowo kopiowano, a uszy czasem przycinano; wzorzec FCI wymaga naturalnego ogona i opadających uszu, a PetPrep zawsze pokazuje psa z naturalnymi uszami i ogonem.",
        "FCI zalicza go do psów domowych i do towarzystwa, a The Royal Kennel Club mówi, że jest bardzo popularnym towarzyszem. The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu oraz mówi, że nie linieje. PDSA opisuje skorego do zabawy, ciekawskiego psa, który może dobrze dogadywać się z dziećmi, jeśli pozna je wcześnie, bywa uparty w szkoleniu i wymaga pielęgnacji dwa–trzy razy w tygodniu, a od czasu do czasu strzyżenia lub trymowania u groomera. The Royal Kennel Club podaje, że żyje ponad 10 lat.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "shih-tzu, shitzu",
      text: [
        "Shih tzu to mały pies do towarzystwa z Tybetu; jego wzorcem FCI opiekuje się Wielka Brytania. Wzorce opisują krzepkiego psa o obfitej sierści, dumnej postawie i pysku przypominającym chryzantemę: z długą, gęstą okrywą, dużymi, ciemnymi, okrągłymi oczami, dużymi opadającymi uszami i obficie owłosionym ogonem noszonym nad grzbietem. Wzorce dopuszczają wiele umaszczeń; PetPrep pokazuje złoto-białe, czarno-białe i wątrobiano-białe, nigdy merle. Kufa jest krótka i płaska, a PDSA wymienia problemy z oddychaniem wynikające z krótszego pyska, dlatego PetPrep zawsze rysuje umiarkowany pysk z otwartymi nozdrzami.",
        "FCI opisuje go jako inteligentnego, aktywnego i czujnego, przyjaznego i niezależnego. The Royal Kennel Club zaleca do godziny ruchu dziennie i codzienną pielęgnację, a jako odpowiedni dom wymienia mieszkanie. PDSA mówi, że shih tzu mogą być pogodnymi psami rodzinnymi, jeśli zostały właściwie zsocjalizowane i wyszkolone, nazywa je idealnymi dla osób, które mają psa po raz pierwszy, zaleca zawsze nadzorować je przy dzieciach i poleca codzienne szczotkowanie oraz strzyżenie u groomera co sześć–osiem tygodni u większości psów domowych. The Royal Kennel Club podaje, że żyje ponad 10 lat.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "dog, dog niemiecki, Deutsche Dogge, Great Dane",
      text: [
        "Dog niemiecki to niemiecki olbrzym: wzorzec FCI mówi, że łączy duże, silne, dobrze zbudowane ciało z dumą, siłą i elegancją, ma długą, wąską głowę, naturalnie opadające uszy i bardzo krótką, gładką, lśniącą sierść. Wzorce wymieniają umaszczenie płowe i pręgowane – najlepiej z czarną maską – a także arlekin, czarne i niebieskie; PetPrep pokazuje tylko umaszczenia, które wymieniają zarówno FCI, jak i The Royal Kennel Club, nigdy merle ani płaszczowe, i zawsze rysuje psa z naturalnymi uszami i ogonem oraz przylegającymi powiekami, bo The Royal Kennel Club prosi sędziów, by zwracali uwagę na podwinięte lub odwinięte powieki i słabe tylne kończyny.",
        "FCI nazywa go przyjaznym, czułym i oddanym właścicielom, choć wobec obcych może być powściągliwy. The Royal Kennel Club mówi, że mimo wielkości jest wspaniałym psem rodzinnym, i zaleca ponad dwie godziny ruchu dziennie, duży dom z ogrodem oraz pielęgnację raz w tygodniu. PDSA mówi, że dogi niemieckie słyną ze ślinienia się, mają dość silny instynkt łowiecki i ze względu na wielkość i siłę nie poleca się ich do domów z młodszymi dziećmi; zaleca odstęp między jedzeniem a ruchem, by pomóc zapobiec skrętowi żołądka. The Royal Kennel Club podaje, że żyje krócej niż 10 lat.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pomeranian, szpic pomeranian, szpic niemiecki miniaturowy, pom, Zwergspitz",
      text: [
        "Szpic miniaturowy, znany jako pomeranian, to najmniejszy szpic: FCI prowadzi go jako miniaturową odmianę szpica niemieckiego, o wysokości w kłębie 21\u00a0cm ± 3\u00a0cm, a wzorzec The Royal Kennel Club opisuje zwartego, krótkiego w lędźwiach psa o lisiej głowie, małych stojących uszach i ogonie zawiniętym nad grzbietem. Jego podwójna sierść ma miękki, puszysty podszerstek i długi, prosty włos okrywowy, który tworzy kryzę wokół szyi. Wzorzec dopuszcza wiele jednolitych umaszczeń, np. pomarańczowe, kremowe, białe, czarne i brązowe, ale nigdy merle; PetPrep rysuje naturalną, nieprzyciętą sierść.",
        "FCI nazywa jego charakter towarzyskim i pogodnym, a wzorzec The Royal Kennel Club – otwartym, żywym i inteligentnym. The Royal Kennel Club zaleca do 30 minut ruchu dziennie i uznaje, że nadaje się do mieszkania; PDSA mówi, że jego podwójna sierść wymaga szczotkowania dwa–trzy razy w tygodniu. AKC mówi, że pomeraniany zwykle lepiej pasują do rodzin ze starszymi dziećmi, mogą dobrze dogadywać się z innymi zwierzętami, jeśli są wcześnie socjalizowane, i zdecydowanie zaleca wczesną socjalizację oraz zajęcia dla szczeniąt. The Royal Kennel Club podaje, że żyje ponad 12 lat.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, American gentleman",
      text: [
        "Boston terrier pochodzi ze Stanów Zjednoczonych. Wzorzec FCI opisuje żywego, bardzo inteligentnego, gładkowłosego psa o krótkiej głowie, zwartej budowie, krótkim ogonie i harmonijnych proporcjach, w umaszczeniu pręgowanym, foczym lub czarnym z równomiernymi białymi znaczeniami: wymagane są biały pas na kufie, biała strzałka między oczami i biały przód klatki piersiowej, a umaszczenie pręgowane jest preferowane. PetPrep rysuje go w umaszczeniu pręgowanym z białym, z umiarkowaną kufą, otwartymi nozdrzami oraz naturalnymi uszami i ogonem.",
        "To rasa o płaskim pysku (brachycefaliczna), a PDSA ostrzega, że nigdy nie powinien ćwiczyć w największym upale, bo łatwo się przegrzewa. The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację raz w tygodniu, uznaje, że nadaje się do mieszkania, i podaje, że żyje ponad 10 lat. PDSA nazywa boston terriery idealnymi psami rodzinnymi, szczególnie dobrymi dla dzieci, jeśli jako szczenięta zostały dobrze zsocjalizowane; AKC mówi, że dobrze czują się z dziećmi, które wiedzą, jak delikatnie obchodzić się ze zwierzętami, źle znoszą, gdy zostają same na długo, i zdecydowanie zaleca wczesną socjalizację i szkolenie szczeniąt.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "mini aussie, Miniature American shepherd, Miniature Australian shepherd, miniaturowy owczarek australijski",
      text: [
        "Miniaturowy owczarek amerykański pochodzi ze Stanów Zjednoczonych. Wzorzec FCI opisuje małego psa pasterskiego o silnym instynkcie pasterskim i stróżującym, inteligentnego, przede wszystkim psa pracującego, nieco dłuższego niż wyższego, z sierścią średniej długości, prostą lub falistą, odporną na warunki pogodowe. Jego umaszczenia to czarne, blue merle, rude i red merle, z białymi znaczeniami i podpalaniem lub bez nich, a oczy mogą być brązowe, niebieskie, orzechowe lub bursztynowe. PetPrep rysuje go w umaszczeniu blue merle z naturalnym ogonem.",
        "PetMD mówi, że ma dużo energii i potrzebuje co najmniej godziny ruchu każdego dnia, najlepiej dwóch, oraz zadań, które zajmą mu głowę, i że należy go szczotkować parę razy w tygodniu; AKC mówi, że przez większą część roku wystarczy szczotkowanie raz w tygodniu, a w okresie linienia codzienne. AKC mówi, że po szkoleniu posłuszeństwa i wczesnej socjalizacji może być świetnym psem rodzinnym i zwykle dobrze czuje się z dziećmi, ale może próbować je „zaganiać”; PetMD dodaje, że przywiązanie do rodziny może prowadzić do lęku separacyjnego, gdy zostaje sam. PetMD podaje, że żyje 12–13 lat.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chi, czihuahua, chihuahua krótkowłosy, Chihuahueño",
      text: [
        "Chihuahua pochodzi z Meksyku. Wzorzec Kennel Clubu opisuje małego, delikatnego, zwartego psa o zadziornym wyrazie i wesołym, pełnym temperamentu i inteligentnym usposobieniu, z dobrze zaokrągloną czaszką w kształcie jabłka, umiarkowanie krótką, lekko spiczastą kufą, dużymi okrągłymi oczami, które nie są wyłupiaste, dużymi uszami i ogonem w kształcie sierpa; dopuszczalne jest każde umaszczenie i każde połączenie kolorów, ale nigdy merle, a preferowana masa ciała to 1,8–2,7\u00a0kg. The Royal Kennel Club prowadzi chihuahua krótkowłosego i długowłosego jako dwie rasy; PetPrep rysuje odmianę krótkowłosą w umaszczeniu płowym, z umiarkowaną głową.",
        "The Royal Kennel Club zaleca do 30 minut ruchu dziennie i pielęgnację raz w tygodniu, uznaje, że nadaje się do mieszkania, i podaje, że żyje ponad 12 lat. PDSA mówi, że chihuahua są tak małe i lekkie, że dzieci mają ochotę je podnosić, czego raczej nie lubią, dlatego lepiej pasują do rodzin z nieco starszymi dziećmi. PDSA dodaje, że jako psy do towarzystwa kochają towarzystwo i potrzebują, by ktoś był w domu przez cały czas, i że należy je od małego socjalizować z wieloma różnymi ludźmi, sytuacjami i miejscami.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer spaniel, springer, English springer spaniel",
      text: [
        "Springer spaniel angielski pochodzi z Wielkiej Brytanii, gdzie wyhodowano go do szukania, płoszenia i aportowania zwierzyny. Wzorzec Kennel Clubu opisuje symetrycznie zbudowanego, zwartego, mocnego, wesołego i aktywnego psa – najwyższego z brytyjskich spanieli lądowych – o przyjaznym, radosnym i posłusznym usposobieniu, długich, obficie owłosionych uszach, ciemnych orzechowych oczach i przylegającej, prostej sierści odpornej na warunki pogodowe; umaszczenie jest wątrobiano-białe lub czarno-białe, w obu przypadkach także z podpalaniem, a wysokość wynosi około 51\u00a0cm. PetPrep rysuje go w umaszczeniu wątrobiano-białym, z naturalnym ogonem.",
        "The Royal Kennel Club zaleca ponad 2 godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu oraz podaje, że żyje ponad 10 lat. PDSA mówi, że springery są dobrymi psami rodzinnymi, które dobrze dogadują się z dziećmi i innymi zwierzętami w domu, są posłuszne i chętne do nauki, i wymagają pielęgnacji raz lub dwa razy w tygodniu oraz strzyżenia co 3 miesiące. AKC dodaje, że nie należy ich zostawiać samych na długo, a wczesna socjalizacja i kursy dla szczeniąt są kluczowe.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltie, szeltie, Shetland sheepdog",
      text: [
        "Owczarek szetlandzki pochodzi z Wielkiej Brytanii i jest małym, długowłosym psem pracującym. Wzorzec FCI opisuje czujnego, łagodnego, inteligentnego, silnego i aktywnego psa, czułego i lojalnego wobec właściciela, a powściągliwego wobec obcych, o głowie w kształcie długiego, tępego klina, małych uszach noszonych półstojąco z końcówkami opadającymi do przodu i podwójnej sierści z długim, szorstkim włosem okrywowym; umaszczenia to sobolowe, trójkolorowe, blue merle, czarno-białe i czarne podpalane, a idealna wysokość to 37\u00a0cm dla psów i 35,5\u00a0cm dla suk. PetPrep rysuje go w umaszczeniu sobolowo-białym.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i codzienną pielęgnację oraz podaje, że żyje ponad 10 lat. PDSA mówi, że shelties to bardzo łagodne, skore do zabawy, posłuszne psy, które często dobrze wpasowują się w życie rodzinne i chętnie dogadują się z dziećmi, a szkolenie i socjalizacja w młodym wieku są bardzo ważne. AKC dodaje, że potrzebują regularnego ruchu i zajęć dla głowy, z powodu instynktu pasterskiego najlepiej czują się ze starszymi dziećmi i są znane z tego, że dużo szczekają.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "épagneul breton, epagneul breton, bretoński spaniel, Brittany",
      text: [
        "Spaniel bretoński to wyżeł z Francji, gdzie nazywa się Épagneul breton. The Royal Kennel Club opisuje bardzo energicznego, inteligentnego psa, który tropi, wystawia i aportuje, łagodnego i czułego, a zarazem pełnego życia i żywiołowości, o gęstej, dość cienkiej sierści, wysoko osadzonych trójkątnych uszach i ogonie, który często jest naturalnie krótki; umaszczenia zgodne ze wzorcem to pomarańczowe, wątrobiane lub czarne z białym, dereszowate lub trójkolorowe, a wysokość wynosi 48–51\u00a0cm dla psów i 47–50\u00a0cm dla suk. PetPrep rysuje go w umaszczeniu pomarańczowo-białym.",
        "The Royal Kennel Club zaleca ponad 2 godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu oraz podaje, że żyje ponad 10 lat. AKC mówi, że spaniele bretońskie to bardzo energiczne psy, które potrzebują dużo ruchu i zajęć dla głowy, są łagodne i zwykle cierpliwe wobec dzieci, a cotygodniowe szczotkowanie utrzymuje je w najlepszej formie. PetMD dodaje, że wczesna socjalizacja szczeniąt jest koniecznością, że źle znoszą, gdy zostają same na długo, i że – wyhodowane do polowania na ptaki – mają silny instynkt łowiecki.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "cocker amerykański, cocker spaniel (USA), American cocker spaniel",
      text: [
        "Cocker spaniel amerykański – w Stanach Zjednoczonych po prostu cocker spaniel – to inna rasa niż cocker spaniel angielski. Wzorzec AKC nazywa go najmniejszym członkiem grupy psów myśliwskich (Sporting Group), o długich, płatowatych, obficie owłosionych uszach, zaokrąglonej czaszce i szerokiej, głębokiej kufie oraz jedwabistej sierści, prostej lub lekko falistej; występuje w umaszczeniu czarnym, w każdym jednolitym kolorze od najjaśniejszego kremowego po najciemniejszy rudy oraz w umaszczeniach łaciatych z białym. Wzorzec wymaga zrównoważonego temperamentu bez śladu lękliwości.",
        "The Royal Kennel Club zaleca codzienną pielęgnację i ponad 2 godziny ruchu dziennie oraz podaje, że żyje ponad 10 lat; AKC i PetMD piszą, że nie potrzebuje dużo ruchu. PetMD nazywa te łagodne psy świetnymi psami rodzinnymi, przyjaznymi wobec ludzi i innych zwierząt, i zaleca wcześnie rozpocząć socjalizację i szkolenie; VCA pisze, że zwykle bardzo dobrze czują się z dziećmi, mają skłonność do nadwagi i co tydzień trzeba sprawdzać im uszy.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, owczarek belgijski, Belgian malinois",
      text: [
        "Owczarek belgijski malinois to krótkowłosa odmiana owczarka belgijskiego, rasy pasterskiej z Belgii. Wzorzec FCI opisuje psa o harmonijnych proporcjach, łączącego elegancję i siłę, i dopuszcza tylko jedno umaszczenie: płowe z czarnym nalotem i czarną maską. Wzorce FCI i AKC opisują raczej małe, stojące, trójkątne uszy, krótką, twardą sierść z gęstym podszerstkiem oraz czujny, inteligentny, ciekawski i pewny siebie temperament.",
        "The Royal Kennel Club zaleca ponad 2 godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu oraz podaje, że żyje ponad 10 lat. AKC pisze, że nie jest dobrym wyborem dla osób, które mają psa po raz pierwszy, najlepiej czuje się ze starszymi, odpowiedzialnymi dziećmi i nie powinien zostawać sam na długo; PetMD zwraca uwagę na silny instynkt łowiecki, na to, że może próbować „zaganiać” dzieci, i na to, że potrzebuje stałego codziennego szkolenia i wczesnej socjalizacji.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset, baset",
      text: [
        "Basset hound to krótkonożny pies gończy z Wielkiej Brytanii. Wzorzec FCI opisuje masywnego, harmonijnie zbudowanego psa, spokojnego, nigdy agresywnego ani lękliwego, i czułego, o nisko osadzonych, długich, aksamitnych uszach, gładkiej, krótkiej sierści i umaszczeniu czarnym z białym i podpalaniem lub cytrynowo-białym. Program Breed Watch The Royal Kennel Club prosi sędziów, by zwracali uwagę na podwinięte lub odwinięte powieki, bardzo długie uszy, podrażnione fałdy skóry i nadmiar skóry.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację raz w tygodniu oraz podaje, że żyje ponad 10 lat. PDSA opisuje tolerancyjnego psa, który bardzo dobrze dogaduje się z dziećmi i kocha towarzystwo, z dobrym apetytem, którego trzeba pilnować; zaleca codzienne sprawdzanie fałdów skóry i odstęp między jedzeniem a ruchem. AKC dodaje, że nos może go sprowadzić na manowce, dlatego ważne są pewna smycz i ogrodzone tereny.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vizsla, wyżeł węgierski, magyar vizsla, Hungarian vizsla",
      text: [
        "Wyżeł węgierski krótkowłosy to średniej wielkości, elegancki pies myśliwski z Węgier o krótkiej sierści w kolorze rdzawozłotym. Wzorzec FCI opisuje żywego, przyjaznego, zrównoważonego psa, łatwego w szkoleniu, który utrzymuje bliski kontakt z przewodnikiem; jego umaszczenia to odcienie rdzawozłote i ciemnopiaskowozłote. Program Breed Watch The Royal Kennel Club nie wymienia żadnych problemów typowych dla tej rasy.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i pielęgnację raz w tygodniu oraz podaje, że żyje ponad 12 lat. PDSA opisuje psa bardzo nastawionego na ludzi, który kocha towarzystwo i zostawiony sam może cierpieć na lęk separacyjny; dobrze dogaduje się ze starszymi dziećmi, ale PDSA nie poleciłaby go do domu z bardzo małymi dziećmi ani osobom, które mają psa po raz pierwszy, a z powodu silnego instynktu łowieckiego odradza trzymanie go z mniejszymi zwierzętami. PDSA zaleca też odstęp między jedzeniem a ruchem.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "cocker spaniel, cocker, cocker angielski, English cocker spaniel",
      text: [
        "Cocker spaniel angielski – w Wielkiej Brytanii po prostu cocker spaniel – to inna rasa niż cocker spaniel amerykański. Wzorzec FCI opisuje wesołego, krzepkiego psa myśliwskiego, harmonijnie zbudowanego i zwartego, o nisko osadzonych, płatowatych uszach i prostej, jedwabistej sierści; wzorzec AKC nazywa go wesołym i czułym, o zrównoważonym usposobieniu, i wymienia umaszczenia jednolicie czarne, wątrobiane i w odcieniach rudego oraz łaciate z białym. Program Breed Watch The Royal Kennel Club nie wymienia żadnych problemów typowych dla tej rasy.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i codzienną pielęgnację oraz podaje, że żyje ponad 10 lat; badanie VetCompass cocker spanieli angielskich w Wielkiej Brytanii wykazało medianę wieku w chwili śmierci 11,44 roku. PDSA mówi, że dzięki cierpliwej osobowości zwykle dobrze dogaduje się z dziećmi, zawsze pod nadzorem, ale ostrzega, że jest znany z lęku separacyjnego i nigdy nie powinien zostawać sam dłużej niż cztery godziny. PDSA zaleca też codzienne szczotkowanie i odstęp między jedzeniem a ruchem.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "maltańczyk biały, bichon maltański, Maltese, Bichon maltais",
      text: [
        "Maltańczyk to miniaturowy pies z regionu środkowego Morza Śródziemnego, dziś pod patronatem Włoch w FCI. Wzorzec FCI opisuje małego psa o wydłużonym tułowiu, żywego, czułego, bardzo spokojnego i bardzo inteligentnego, ważącego 3–4\u00a0kg, o bardzo długiej, gęstej, jedwabistej sierści, która ciężko opada na całe ciało. Sierść nie ma podszerstka, a jedynym umaszczeniem jest czysto białe (dopuszczalny jest jasny odcień kości słoniowej). Program Breed Watch The Royal Kennel Club nie wymienia żadnych problemów typowych dla tej rasy.",
        "The Royal Kennel Club zaleca do 30 minut ruchu dziennie i codzienną pielęgnację, mówi, że rasa nie linieje, i podaje, że żyje ponad 12 lat. PDSA opisuje bystrego, przyjaznego i czułego psa, który może być powściągliwy wobec obcych, ale przy właściwej socjalizacji w młodym wieku może nauczyć się pewności siebie i towarzyskości. PetMD ostrzega, że zostawiony sam na zbyt długo może rozwinąć lęk separacyjny, mówi, że jego kontakty z małymi dziećmi trzeba nadzorować, i zaleca codzienne mycie zębów.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "mopsik, Pug, Carlin",
      text: [
        "Mops to mały pies do towarzystwa z Chin, dziś pod patronatem Wielkiej Brytanii w FCI. Wzorzec FCI opisuje wyraźnie kwadratowego, krępego psa – „multum in parvo” – o wielkim uroku, godności i inteligencji oraz zrównoważonym, radosnym i żywym usposobieniu, o idealnej masie ciała 6,3–8,1\u00a0kg, delikatnej, gładkiej, krótkiej i lśniącej sierści w umaszczeniu srebrnym, morelowym, płowym lub czarnym i ogonie ciasno zakręconym nad biodrem. Wymaga dość dużych, dobrze otwartych nozdrzy, a ściśnięte nozdrza i ciężki fałd nad nosem uznaje za niedopuszczalne. The Royal Kennel Club umieszcza rasę w kategorii 3 programu Breed Watch, a wśród problemów wymienia trudności z oddychaniem, wyłupiaste oczy, zapalenie fałdów skóry i otyłość.",
        "PDSA nazywa mopsa rasą skrajnie brachycefaliczną (o płaskim pysku), u której łatwo o zadyszkę, zaleca unikanie ruchu w upale i mówi, że jej weterynarze zdecydowanie polecaliby zamiast niej rasę o normalnej kufie lub krzyżówkę mopsa. The Royal Kennel Club zaleca do 1 godziny ruchu dziennie i pielęgnację raz w tygodniu, mówi, że rasa linieje, i podaje, że żyje ponad 10 lat. PDSA opisuje psa, który często dobrze dogaduje się z dziećmi i innymi zwierzętami, ale uwielbia towarzystwo i źle znosi samotność; PetMD zaleca codzienne czyszczenie i osuszanie fałdów skóry na pysku i zwraca uwagę, że otyłość jest w tej rasie częsta.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "collie, collie długowłosy, owczarek szkocki, lassie, Rough collie",
      text: [
        "Owczarek szkocki długowłosy to duży pies pasterski z Wielkiej Brytanii. Wzorzec FCI opisuje psa wielkiej urody, o spokojnej godności, przyjaznym usposobieniu i bez śladu nerwowości czy agresji, z bardzo gęstą sierścią o prostym, szorstkim włosie okrywowym, w trzech umaszczeniach: sobolowym, trójkolorowym i blue merle. Wzorzec The Royal Kennel Club nazywa go wspaniałym psem do towarzystwa, przyjaznym, radosnym i aktywnym, dobrym wobec dzieci i innych psów, i podaje wysokość 56–61\u00a0cm dla psów i 51–56\u00a0cm dla suk. The Royal Kennel Club umieszcza rasę w kategorii 2 programu Breed Watch i nie rejestruje szczeniąt z połączeń merle z merle.",
        "The Royal Kennel Club zaleca do 1 godziny ruchu dziennie i codzienną pielęgnację, mówi, że rasa linieje, i podaje, że żyje ponad 12 lat. PetMD mówi, że collie są czułe, zwłaszcza wobec dzieci, i dobrze dogadują się z innymi zwierzętami, ale źle znoszą, gdy zostają same na długo, a podekscytowane mogą podszczypywać kostki i pięty. Zwraca też uwagę, że socjalizacja szczeniąt jest kluczowa i że u collie występuje mutacja MDR1, która wpływa na to, jak pies przetwarza niektóre leki.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "mastif angielski, Mastiff, English mastiff, Old English mastiff",
      text: [
        "Mastif to bardzo duży pies stróżujący z Wielkiej Brytanii. Wzorzec FCI opisuje połączenie wielkości i odwagi – psa spokojnego, czułego wobec właścicieli, ale zdolnego do obrony – o głowie sprawiającej wrażenie kwadratowej, szerokim, głębokim i silnym tułowiu oraz krótkiej, przylegającej sierści w umaszczeniu morelowym, płowym lub pręgowanym. PDSA podaje przeciętną wysokość 71–78\u00a0cm i przeciętną masę ciała 80–85\u00a0kg i zaznacza, że The Kennel Club zalicza mastifa do kategorii trzeciej: ras z widocznymi problemami budowy, które mogą powodować ból, dyskomfort lub problemy zdrowotne.",
        "PDSA zaleca dorosłym psom około godziny ruchu dziennie – ale bez przeciążania szczeniąt, dopóki ich kości i stawy się rozwijają – pielęgnację raz w tygodniu z codziennym czyszczeniem zmarszczek na pysku i podaje, że przeciętnie żyje krócej niż 10 lat. PetMD nazywa mastify świetnymi psami rodzinnymi dla domów z dziećmi, które wiedzą, jak obchodzić się ze zwierzętami, choć ze względu na wielkość raczej nie dla domów z maluchami i niemowlętami; zwykle dobrze czują się z innymi zwierzętami, które poznały jako szczenięta, bardzo się ślinią i z powodu ryzyka skrętu żołądka nie powinny ćwiczyć przez godzinę przed posiłkiem i po nim.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba inu, shiba ken, Japanese Shiba Inu",
      text: [
        "Shiba to mały szpic z Japonii; jego nazwa oznacza „mały pies”, a według The Royal Kennel Club wyhodowano go do polowania na małe ptactwo. Wzorzec FCI opisuje małego, harmonijnie zbudowanego psa o mocnym kośćcu, wiernym usposobieniu, bystrych zmysłach i dużej czujności, z szorstkim włosem okrywowym na miękkim, gęstym podszerstku, małymi, stojącymi, trójkątnymi uszami i grubym, zakręconym ogonem; umaszczenia to rude, czarne podpalane i sezamowe, zawsze z białawymi znaczeniami „urajiro” na policzkach, piersi i spodzie ciała. Wzorzec AKC podaje przeciętną masę ciała około 23 funtów (10\u00a0kg) dla psów i 17 funtów (8\u00a0kg) dla suk.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację raz w tygodniu, zaznacza, że rasa linieje, i podaje, że żyje ponad 10 lat; duże brytyjskie badanie wykazało medianę długości życia 14,6 roku. AKC opisuje pewnego siebie, niezależnego psa, który jest lepszym wyborem dla doświadczonego właściciela, najlepiej czuje się ze starszymi dziećmi i nigdy nie powinien być spuszczany ze smyczy poza ogrodzonym lub zamkniętym terenem. PetMD dodaje, że potrzebuje dużo zajęć dla głowy, socjalizacja w okresie szczenięcym wychodzi mu na dobre i powinien mieć codziennie myte zęby.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, rodezjan, afrykański pies na lwy, African lion dog",
      text: [
        "Rhodesian ridgeback pochodzi z południowej Afryki. Jego najbardziej znaną cechą jest grzebień na grzbiecie, czyli pas sierści rosnącej w przeciwnym kierunku niż reszta okrywy. Wzorzec FCI opisuje harmonijnie zbudowanego, silnego, muskularnego, zwinnego i aktywnego psa, pełnego godności, inteligentnego i zdystansowanego wobec obcych, szczególnie cenionego jako stróż i pies rodzinny. Krótka, gęsta sierść ma barwę od jasnopszenicznej do rudopszenicznej, a wzorzec podaje masę ciała około 36,5\u00a0kg dla psów i 32\u00a0kg dla suk.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i pielęgnację raz w tygodniu, zaznacza, że rasa linieje i nadaje się do dużego domu z dużym ogrodem, i podaje, że żyje ponad 10 lat. PDSA opisuje skore do zabawy, silne i bardzo lojalne psy o bardzo silnym instynkcie łowieckim, których nie poleca się osobom mającym psa po raz pierwszy, które nigdy nie powinny zostawać same dłużej niż cztery godziny i wymagają socjalizacji od małego; zaleca też odstęp między jedzeniem a ruchem. Woodgreen dodaje, że najlepiej czują się ze starszymi dziećmi.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontynentalny spaniel miniaturowy, phalène, Continental toy spaniel",
      text: [
        "Papillon to odmiana stojącoucha kontynentalnego spaniela miniaturowego, rasy z Belgii i Francji; odmiana o opadających uszach nazywa się phalène. Wzorzec FCI opisuje małego, eleganckiego spaniela miniaturowego o długiej sierści i żywym usposobieniu, o wysokości około 28\u00a0cm i masie ciała do 4,5\u00a0kg u psów i do 5\u00a0kg u suk. Jego duże uszy przypominają rozpostarte skrzydła motyla, a sierść jest zawsze biała z kolorowymi łatami.",
        "The Royal Kennel Club zaleca do 30 minut ruchu dziennie i pielęgnację częściej niż raz w tygodniu, zaznacza, że rasa linieje i może mieszkać w mieszkaniu, i podaje, że żyje ponad 12 lat. PDSA opisuje łagodne, skore do zabawy, bardzo posłuszne psy, które dobrze dogadują się ze wszystkimi i wymagają szkolenia i socjalizacji w młodym wieku; sugeruje pielęgnację dwa–trzy razy w tygodniu. PetMD dodaje, że papillony potrzebują codziennie zajęć dla głowy, mogą rozwinąć lęk separacyjny i powinny mieć codziennie myte zęby, a bardzo małe dzieci mogą niechcący zrobić krzywdę tak małemu psu.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, portugalski pies wodny, Portuguese water dog, Portie",
      text: [
        "Portugalski pies dowodny pochodzi z Portugalii, gdzie pracował z rybakami. Wzorzec The Royal Kennel Club opisuje solidnego, niemal kwadratowego, bardzo umięśnionego psa – bardzo inteligentnego i niezwykle energicznego, świetnie pływającego i nurkującego – o wysokości 50–57\u00a0cm (psy) i 43–52\u00a0cm (suki) oraz masie ciała 19–25\u00a0kg (psy) i 16–22\u00a0kg (suki). Jego obfita, pojedyncza sierść nie ma podszerstka i występuje w umaszczeniu czarnym, białym, brązowym albo czarnym lub brązowym z białym; przy tradycyjnym „lwim” strzyżeniu kufę i tylną część ciała strzyże się krótko.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i codzienną pielęgnację, zaznacza, że rasa nie linieje i nadaje się do dużego domu, i podaje, że żyje ponad 10 lat. PDSA opisuje bardzo przyjazne, kochające psy, które dobrze dogadują się z innymi zwierzętami, są doskonałymi psami rodzinnymi i wymagają szkolenia i socjalizacji w młodym wieku; dodaje, że przez cały rok potrzebne jest strzyżenie i modelowanie sierści u groomera.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "bichon, bichon frisé, bichon fryzowany, Bichon à poil frisé",
      text: [
        "Bichon frise to francusko-belgijski pies do towarzystwa. Wzorzec FCI opisuje wesołego małego psa o żywym ruchu i bardzo luźnej, białej sierści skręconej w korkociągi – prawdziwego towarzysza, którego można zabrać wszędzie, ani nerwowego, ani często szczekającego – o wysokości w kłębie 25–29\u00a0cm i masie ciała około 5\u00a0kg. Dorosły pies jest zawsze czysto biały, z bardzo ciemnymi okrągłymi oczami, czarnym nosem, opadającymi uszami i obficie owłosionym ogonem noszonym nad grzbietem.",
        "The Royal Kennel Club zaleca do 30 minut ruchu dziennie i codzienną pielęgnację, zaznacza, że rasa nie linieje i nadaje się do mieszkania, i podaje, że żyje ponad 12 lat. PDSA opisuje bardzo czułe, kochające psy, które są doskonałe wobec dzieci i innych zwierząt, i dodaje, że sierść wymaga przycinania mniej więcej co dwa miesiące, często u groomera.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "nowofundlandczyk, newfie, Newfoundland",
      text: [
        "Nowofundland pochodzi z Kanady; FCI zalicza go do molosów w typie górskim i uznaje trzy umaszczenia: czarne, biało-czarne (landseer) i brązowe. PDSA nazywa nowofundlandy łagodnymi olbrzymami i podaje przeciętną wysokość 66–71\u00a0cm i przeciętną masę ciała 50–69\u00a0kg; PetMD dodaje, że dzięki historii rasy są urodzonymi pływakami.",
        "PDSA zaleca dorosłym psom co najmniej godzinę ruchu dziennie, ale bez przeciążania szczeniąt, dopóki ich kości i stawy się rozwijają; nazywa pielęgnację codziennym obowiązkiem, zaznacza, że nowofundlandy zwykle się ślinią, i podaje, że żyją krócej niż 10 lat. PetMD nazywa rasę wybitnym psem rodzinnym, który dobrze dogaduje się z dziećmi, małymi zwierzętami i innymi psami, zaleca nadzorowanie małych dzieci przy każdym psie i ostrzega, że niektóre mogą rozwinąć lęk separacyjny, gdy zostają same.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "dalmatyńczyk, dalmatynczyk, dalmatyn, Dalmatian",
      text: [
        "Dalmatyńczyk pochodzi z Chorwacji; FCI zalicza go do ras pokrewnych psom gończym. Jego krótka, lśniąca sierść jest czysto biała z wyraźnie odgraniczonymi czarnymi lub wątrobianymi (brązowymi) cętkami, a wzorzec wymaga cętkowanych uszu. FCI podaje wysokość 56–62\u00a0cm dla psów i 54–60\u00a0cm dla suk; PDSA podaje przeciętną masę ciała 18–27\u00a0kg.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i szczotkowanie raz w tygodniu, mówi, że rasa linieje i nadaje się do dużego domu z ogrodem. PDSA nazywa dalmatyńczyki świetnymi psami dla aktywnych domów, które lepiej pasują do starszych dzieci, potrzebują towarzystwa i nigdy nie powinny zostawać same dłużej niż cztery godziny; wśród problemów zdrowotnych rasy wymienia głuchotę i zaznacza, że istnieje test słuchu BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "blue heeler, red heeler, heeler, Australian cattle dog",
      text: [
        "Australijski pies pasterski pochodzi z Australii; FCI zalicza go do psów do bydła. Wzorzec Kennel Clubu opisuje silnego, zwartego psa pracującego o gładkiej, podwójnej sierści odpornej na warunki pogodowe, w umaszczeniu niebieskim (marmurkowym lub nakrapianym) lub równomiernie nakrapianym rudym, i podaje wysokość 46–51\u00a0cm dla psów i 43–48\u00a0cm dla suk; PDSA podaje przeciętną masę ciała 16–20\u00a0kg.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i szczotkowanie raz w tygodniu oraz mówi, że rasa linieje. PDSA opisuje bardzo inteligentnego, bardzo energicznego psa, który potrzebuje dużo ruchu i zajęć dla głowy; z powodu silnego instynktu pasterskiego może podszczypywać pięty biegających dzieci, a socjalizacja i szkolenie w młodym wieku pomagają.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Whippet pochodzi z Wielkiej Brytanii; FCI zalicza go do chartów krótkowłosych. Wzorzec Kennel Clubu opisuje harmonijne połączenie siły mięśni z elegancją i wdziękiem sylwetki, delikatną, krótką, przylegającą sierść w każdym umaszczeniu i każdym połączeniu kolorów oprócz merle oraz łagodne, czułe, zrównoważone usposobienie; podaje wysokość 47–51\u00a0cm dla psów i 44–47\u00a0cm dla suk, a PDSA podaje przeciętną masę ciała 11–18\u00a0kg.",
        "PDSA zaleca co najmniej godzinę ruchu każdego dnia, z możliwością biegania bez smyczy na bezpiecznym terenie, i szczotkowanie raz w tygodniu miękką szczotką. Nazywa whippety popularnym wyborem rodzin, bo są spokojne i łagodne przy dzieciach, ale poleca dom z nieco starszymi dziećmi; whippety nie lubią zostawać same i mają naprawdę silny instynkt łowiecki, dlatego PDSA nie poleca trzymania ich z mniejszymi zwierzętami. Zimą może się przydać ubranko, a grube, miękkie posłanie chroni wystające kości.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "griffon Korthalsa, korthals, gryfon, Wirehaired pointing griffon",
      text: [
        "Gryfon Korthalsa pochodzi z Francji; FCI zalicza go do wyżłów kontynentalnych i nazywa go przede wszystkim wszechstronnym wyżłem. Wzorzec FCI opisuje energicznego, rustykalnego psa, dłuższego niż wyższego, o szorstkiej, twardej sierści, która nigdy nie jest kędzierzawa ani wełnista, nosie zawsze brązowym i najlepiej stalowoszarej sierści z brązowymi (wątrobianymi) łatami; podaje wysokość około 55–60\u00a0cm dla psów i 50–55\u00a0cm dla suk i nazywa rasę łagodną, dumną i bardzo łagodną wobec dzieci. PetMD podaje masę ciała 35–70 funtów (około 16–32\u00a0kg).",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, duży dom i duży ogród oraz pielęgnację częściej niż raz w tygodniu. PetMD zaleca szczotkowanie raz w tygodniu (niektóre psy wymagają też ręcznego trymowania), mówi, że gryfony są zwykle cierpliwe i łagodne wobec dzieci, jeśli zostały zsocjalizowane jako szczenięta, i zaznacza, że z powodu myśliwskiej przeszłości mogą mieć silny instynkt łowiecki, więc mniejsze zwierzęta, takie jak koty i króliki, mogą im się wydawać czymś do gonienia.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "chessie, chesapeake, Chesapeake Bay retriever",
      text: [
        "Chesapeake bay retriever, często nazywany chessie, pochodzi ze Stanów Zjednoczonych; FCI zalicza go do retrieverów. Wzorzec FCI opisuje pracującego aportera, równie sprawnego na lądzie i w wodzie, którego wielkość i masa nie powinny być przesadne, o grubej, krótkiej sierści na gęstym, wełnistym podszerstku i jasnych, żółtawych lub bursztynowych oczach; dopuszczalny jest każdy odcień brązu, turzycowy (sedge) i koloru suchej trawy (deadgrass), a czarna sierść dyskwalifikuje. Podaje wysokość 58–66\u00a0cm i masę ciała 29,5–36,5\u00a0kg dla psów oraz 53–61\u00a0cm i 25–32\u00a0kg dla suk.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, duży dom i duży ogród oraz pielęgnację raz w tygodniu. PetMD opisuje bystrego, pogodnego i niezwykle czułego psa, który może stać się destrukcyjny, jeśli nie ma zajęć lub zostaje sam na zbyt długo, mówi, że przy właściwym zapoznawaniu i socjalizacji chessie są świetnym uzupełnieniem rodziny, i zaleca, by pies nie ćwiczył tuż przed jedzeniem ani tuż po nim.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "samoyed, sammy, Samoyede",
      text: [
        "Samojed pochodzi z północnej Rosji i Syberii; FCI zalicza go do nordyckich psów zaprzęgowych. Wzorzec FCI opisuje białego, eleganckiego arktycznego szpica średniej wielkości o obfitej, grubej, gęstej polarnej sierści, ciemnobrązowych oczach, małych, grubych, stojących uszach i wargach lekko uniesionych w kącikach w charakterystycznym „uśmiechu samojeda”; sierść jest czysto biała, kremowa lub biała z biszkoptowym, a niebieskie lub różnobarwne oczy dyskwalifikują. Podaje idealną wysokość 57\u00a0cm dla psów i 53\u00a0cm dla suk, w obu przypadkach z tolerancją 3\u00a0cm.",
        "PDSA zaleca co najmniej dwie godziny ruchu każdego dnia i codzienną pielęgnację, mówi, że samojedy bardzo często linieją, zwykle świetnie dogadują się z dziećmi i są lojalne wobec całej rodziny, nigdy nie powinny zostawać same dłużej niż cztery godziny, jako wytrawni uciekinierzy potrzebują bardzo dobrze zabezpieczonego ogrodu i mają silny instynkt łowiecki, i zaleca odstęp po jedzeniu, zanim zaczną się ruszać. PetMD dodaje, że samojedy źle znoszą upały.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, terier szkocki, scotch terrier, Aberdeen terrier",
      text: [
        "Scottish terrier, często nazywany scottie, pochodzi z Wielkiej Brytanii; FCI zalicza go do małych terierów. Wzorzec Kennel Clubu opisuje krępego, krótkonożnego psa o czujnej postawie, sprawiającego wrażenie wielkiej siły i aktywności w niewielkim ciele, lojalnego i wiernego, pełnego godności, niezależnego i powściągliwego, ale odważnego i bardzo inteligentnego – śmiałego, ale nigdy agresywnego. Jego przylegająca, podwójna sierść ma szorstki, drutowaty włos okrywowy; umaszczenie jest czarne, pszeniczne lub pręgowane w dowolnym odcieniu. Podaje wysokość 25–28\u00a0cm i masę ciała 8,5–10,5\u00a0kg.",
        "PDSA mówi, że scottie potrzebują około godziny ruchu dziennie i codziennej pielęgnacji, z trymowaniem i strzyżeniem u groomera co dwa–trzy miesiące, opisuje je jako lojalne i oddane rodzinie i mówi, że bywają uparte, więc szkolenie wymaga cierpliwości i zaangażowania. PetMD mówi, że przy właściwym szkoleniu i socjalizacji mogą być dobrymi psami dla rodzin, że socjalizacja szczeniaka jest ważna i że nie powinny zostawać same przez dłuższy czas.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "weimaraner, wyżeł weimarski krótkowłosy, weim",
      text: [
        "Wyżeł weimarski pochodzi z Niemiec; FCI zalicza go do wyżłów kontynentalnych i uznaje odmianę krótkowłosą i długowłosą. Wzorzec FCI opisuje średniego do dużego psa myśliwskiego o funkcjonalnej, użytkowej budowie, suchego i bardzo umięśnionego, o bursztynowych oczach i szerokich, dość długich uszach; sierść jest srebrzysto-, sarnio- lub mysioszara, dopuszczalne są tylko małe białe znaczenia na piersi i palcach, a każde umaszczenie inne niż szare dyskwalifikuje. Podaje wysokość 59–70\u00a0cm i masę ciała około 30–40\u00a0kg dla psów oraz 57–65\u00a0cm i około 25–35\u00a0kg dla suk.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, duży dom i duży ogród oraz pielęgnację raz w tygodniu. PDSA mówi, że wyżły weimarskie w odpowiednich rękach są wspaniałymi psami rodzinnymi i najlepiej czują się z właścicielami, którzy znają rasę, ale z powodu bardzo silnego instynktu łowieckiego nie poleca ich do domów z mniejszymi dziećmi ani mniejszymi zwierzętami, mówi, że zostawione same mogą rozwinąć lęk separacyjny, i zaleca socjalizację od małego oraz odstęp między jedzeniem a ruchem. PetMD dodaje comiesięczne czyszczenie uszu i comiesięczną kąpiel.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "charcik, piccolo levriero italiano, Italian greyhound, iggy",
      text: [
        "Charcik włoski pochodzi z Włoch; FCI prowadzi go jako piccolo levriero italiano wśród chartów krótkowłosych. Wzorzec Kennel Clubu opisuje greyhounda w miniaturze, smuklejszego we wszystkich proporcjach, eleganckiego, pełnego wdzięku i szybkiego, inteligentnego, czułego i żywego, choć może wydawać się zdystansowany, o krótkiej, delikatnej, lśniącej sierści na cienkiej skórze. Podaje wysokość 32–38\u00a0cm i masę ciała 3,6–4,5\u00a0kg; dopuszczalne są umaszczenia czarne, niebieskie, kremowe, płowe, rude i białe lub każde z nich przerywane białym – nigdy merle, pręgowane ani z podpalaniem.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie, mówi, że rasa nadaje się do małego domu w mieście lub na wsi, wymaga pielęgnacji raz w tygodniu i nie linieje. PDSA mówi, że charciki włoskie są pełne energii, powinny biegać na ogrodzonym terenie, bo gdy zobaczą zdobycz, trudno je przywołać, mogą być lękliwe, więc wczesna socjalizacja jest konieczna, i – ponieważ w okresie wzrostu mają delikatne kości – mogą nie być idealną rasą do domów z małymi dziećmi lub innymi zwierzętami. PetMD dodaje, że cienka sierść ich nie grzeje, więc łatwo marzną.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "sznaucer olbrzymi, Riesenschnauzer, Giant schnauzer",
      text: [
        "Sznaucer olbrzym pochodzi z Niemiec; FCI prowadzi go jako Riesenschnauzer wśród pinczerów i sznaucerów. Wzorzec The Royal Kennel Club opisuje mocno zbudowanego, solidnego, suchego psa, który wygląda niemal kwadratowo, śmiałego, niezawodnego, dobrodusznego i opanowanego, o szorstkim, drutowatym włosie okrywowym i dobrym podszerstku. Podaje wysokość 65–70\u00a0cm dla psów i 60–65\u00a0cm dla suk; wzorzec FCI podaje masę ciała 35–47\u00a0kg. Dopuszczalne są umaszczenia czysto czarne, pieprz z solą z ciemną maską oraz czarne ze srebrem – żadne inne.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, mówi, że rasa nadaje się do dużego domu z dużym ogrodem, wymaga codziennej pielęgnacji i nie linieje. PDSA mówi, że sierść wymaga codziennej pielęgnacji i regularnego przycinania, że sznaucery olbrzymy mogą być kochanymi psami dla rodzin ze starszymi dziećmi, jeśli jako szczenięta zostały dobrze zsocjalizowane, i że te psy o silnej woli pasują do doświadczonych właścicieli. PetMD dodaje, że co kilka miesięcy sierść jest ręcznie trymowana przez groomera i że rasa źle znosi życie w domach, w których domownicy rzadko bywają.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "pies świętego Huberta, pies św. Huberta, posokowiec, Chien de Saint-Hubert",
      text: [
        "Bloodhound pochodzi z Belgii, gdzie FCI prowadzi go jako chien de Saint-Hubert (pies świętego Huberta), duży pies gończy. Wzorzec FCI opisuje najsilniejszego ze wszystkich psów gończych: łagodnego, spokojnego, dobrodusznego i towarzyskiego wobec ludzi, szczególnie przywiązanego do właściciela, o krótkiej, gęstej sierści odpornej na warunki pogodowe i elastycznej, luźnej skórze. Psy ważą około 46–54\u00a0kg, a suki około 40–48\u00a0kg; trzy umaszczenia to czarne podpalane, wątrobiane podpalane i rude.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, mówi, że rasa nadaje się do dużego domu z dużym ogrodem, wymaga pielęgnacji raz w tygodniu i linieje. PDSA mówi, że bloodhoundy lepiej pasują do doświadczonych właścicieli, ze względu na wielkość i bardzo silny instynkt łowiecki nie poleca się ich do domów z mniejszymi dziećmi ani mniejszymi zwierzętami, ślinią się, a ich fałdy skóry trzeba utrzymywać w czystości i suchości. Zaleca też odstęp między jedzeniem a ruchem.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "akita, American akita, duży pies japoński",
      text: [
        "Akita w tej encyklopedii to typ amerykański: FCI prowadzi ją jako akitę amerykańską, rasę pochodzenia japońskiego, odrębną od japońskiej akity inu. Wzorzec FCI opisuje dużego, mocno zbudowanego, harmonijnego psa o znacznej masie i ciężkim kośćcu, małych stojących uszach i dużym ogonie noszonym nad grzbietem; psy mają 66–71\u00a0cm wysokości w kłębie. Dopuszczalne jest każde umaszczenie, np. rude, płowe, białe, łaciate (pinto) lub pręgowane. PDSA podaje przeciętną masę ciała 31–59\u00a0kg.",
        "PDSA opisuje niezwykle lojalne psy rodzinne, które są niezależne i bardzo duże, więc najlepiej czują się z doświadczonymi właścicielami; nie poleciłaby akity do domu z małymi dziećmi i odradza zostawianie ich samych, bo wiele z nich źle to znosi. Zaleca co najmniej dwie godziny ruchu każdego dnia, socjalizację od małego, odstęp między jedzeniem a ruchem i szczotkowanie co najmniej raz w tygodniu – akity mocno linieją. Zwraca też uwagę na silny instynkt łowiecki i na to, że w bardzo gorące dni mogą się przegrzewać.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "corgi, cardigan, welsh corgi, Cardigan Welsh corgi",
      text: [
        "Welsh corgi cardigan pochodzi z Wielkiej Brytanii; FCI zalicza go do psów do bydła. Wzorzec American Kennel Club podaje wysokość w kłębie 10,5–12,5 cala (około 27–32\u00a0cm) i idealną masę ciała 30–38 funtów (około 14–17\u00a0kg) dla psów. W przeciwieństwie do swojego kuzyna pembroke ma długi, puszysty ogon.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie, uznaje mały dom z małym lub średnim ogrodem za wystarczający i mówi, że rasa wymaga pielęgnacji częściej niż raz w tygodniu i linieje; podaje, że żyje ponad 12 lat, i wymienia cardigana jako zagrożoną rodzimą rasę brytyjską. PDSA mówi, że welsh corgi chętnie współpracują, więc szkolenie powinno być dość łatwe, że zwykle wystarczy szczotkowanie dwa–trzy razy w tygodniu i że mogą podszczypywać pięty biegających dzieci – pomagają socjalizacja z dziećmi i szkolenie w młodym wieku.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "drahthaar, Deutsch Drahthaar, German wirehaired pointer, wyżeł szorstkowłosy",
      text: [
        "Wyżeł niemiecki szorstkowłosy pochodzi z Niemiec; FCI prowadzi go jako Deutsch Drahthaar wśród wyżłów kontynentalnych. Wzorzec The Royal Kennel Club opisuje średniej wielkości psa myśliwskiego o szorstkiej sierści całkowicie okrywającej skórę – łagodnego, czułego i zrównoważonego, czujnego, posłusznego i bardzo lojalnego. Psy mają 60–67\u00a0cm wysokości i ważą 25–34\u00a0kg; suki mają 56–62\u00a0cm i ważą 20,5–29\u00a0kg. Umaszczenia zgodne ze wzorcem to wątrobiano-białe, jednolicie wątrobiane i czarno-białe.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie, mówi, że rasa nadaje się do dużego domu z dużym ogrodem na wsi, wymaga pielęgnacji częściej niż raz w tygodniu i linieje. PetMD mówi, że drahthaary potrzebują dużo ruchu i zajęć dla głowy, mocno przywiązują się do rodziny i mogą być świetnymi psami rodzinnymi, jeśli są wcześnie szkolone i socjalizowane, dobrze czują się z dziećmi, które nauczono, jak zachowywać się przy zwierzętach, nigdy nie powinny zostawać same na długo i mają silny instynkt łowiecki. Sierść trymuje się ręcznie dwa razy w roku.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "pies świętego Bernarda, St. Bernard, Bernhardiner, Saint Bernard",
      text: [
        "Bernardyn pochodzi ze Szwajcarii; FCI zalicza go do molosów w typie górskim. Wzorzec FCI opisuje psa z natury przyjaznego, od spokojnego po żywego, i czujnego, i uznaje dwie odmiany: krótkowłosą, o gęstej, gładkiej, przylegającej sierści, i długowłosą. Psy mają co najmniej 70\u00a0cm, a suki co najmniej 65\u00a0cm wysokości, maksymalnie 90 i 80\u00a0cm; PDSA podaje masę ciała 54–81\u00a0kg.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie, mówi, że rasa nadaje się do dużego domu z dużym ogrodem, wymaga pielęgnacji częściej niż raz w tygodniu, linieje i zwykle żyje krócej niż dziesięć lat. PDSA mówi, że bernardyny uwielbiają być z rodziną i świetnie czują się z ludźmi w każdym wieku, także z dziećmi, powinny być dobrze zsocjalizowane jako szczenięta, wymagają szczotkowania co najmniej trzy razy w tygodniu, ślinią się, gorzej znoszą upał i potrzebują odstępu między jedzeniem a ruchem. PetMD dodaje, że te nastawione na ludzi psy mogą rozwinąć lęk separacyjny, jeśli zostają same na długo.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffik, staffie, stafford, staffy",
      text: [
        "Staffordshire bull terrier pochodzi z Wielkiej Brytanii; FCI zalicza go do terierów typu bull. Wzorzec FCI opisuje gładkowłosego, harmonijnie zbudowanego psa o wielkiej sile jak na swoją wielkość – tradycyjnie o niezłomnej odwadze i wytrwałości, bardzo inteligentnego i czułego, zwłaszcza wobec dzieci. Ma 35,5–40,5\u00a0cm wysokości; psy ważą 12,7–17\u00a0kg, a suki 11–15,4\u00a0kg. Występuje w umaszczeniu pręgowanym, rudym, płowym, czarnym, niebieskim lub białym, jednolitym albo z białym.",
        "The Royal Kennel Club nazywa go wspaniałym psem rodzinnym i zaleca do godziny ruchu dziennie; wymaga pielęgnacji raz w tygodniu, linieje i zwykle żyje ponad 12 lat. PDSA mówi, że staffiki są tolerancyjne i łagodne wobec dzieci, ale jako psy nastawione na ludzi znane są z lęku separacyjnego, gdy zostają same, lubią gryźć przedmioty, a z powodu bardzo silnego instynktu łowieckiego trzymanie przy nich mniejszych zwierząt nie jest dobrym pomysłem.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "airedale, król terierów, Waterside terrier, Bingley terrier",
      text: [
        "Airedale terrier pochodzi z Wielkiej Brytanii; FCI zalicza go do dużych i średnich terierów. Wzorzec FCI nazywa go największym z terierów – muskularnym, aktywnym, dość krępym psem, otwartym i pewnym siebie, przyjaznym, odważnym i inteligentnym, zawsze czujnym, nie agresywnym, ale nieustraszonym. Psy mają około 58–61\u00a0cm, a suki około 56–59\u00a0cm wysokości. Jego twarda, gęsta, drutowata sierść jest podpalana z czarnym lub szpakowatym czaprakiem.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie; sierść wymaga codziennej pielęgnacji i nie linieje, a rasa zwykle żyje ponad 10 lat. PetMD opisuje świetne psy rodzinne, które dobrze wyszkolone zwykle dogadują się z dziećmi, ale nie powinny zostawać zbyt długo same sobie; zaleca szczotkowanie kilka razy w tygodniu, szybkie czyszczenie uszu co tydzień i wizytę u groomera trzy lub cztery razy w roku.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "jack russell, jack russel, russell terrier, JRT",
      text: [
        "Jack Russell terrier – American Kennel Club nazywa go Russell terrier – pochodzi z Anglii, a rasę rozwinięto w Australii; FCI zalicza go do małych terierów. Jego wzorzec opisuje silnego, aktywnego, gibkiego teriera pracującego o wyrazistym charakterze: żywego, czujnego i aktywnego, śmiałego i nieustraszonego, przyjaznego, ale spokojnie pewnego siebie. Ma 25–30\u00a0cm wysokości i waży około 5–6\u00a0kg. Jego gładka, załamana lub szorstka sierść jest przeważnie biała z czarnymi i/lub podpalanymi znaczeniami.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację raz w tygodniu; rasa linieje i zwykle żyje ponad 10 lat. PDSA opisuje bystre, żywe psy, które mogą być dobrymi psami rodzinnymi, jeśli są szkolone i socjalizowane od małego, ale lepiej pasują do rodzin z nieco starszymi dziećmi; mają bardzo silny instynkt łowiecki, więc nie poleca się ich przy mniejszych zwierzętach, i uwielbiają kopać.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bullmastiff, Bull mastiff",
      text: [
        "Bullmastif to stara angielska rasa stróżująca z XIX wieku, wywodząca się od buldoga i starego mastifa angielskiego; FCI zalicza go do molosów. Jego wzorzec opisuje silnego, symetrycznie zbudowanego psa, który pokazuje wielką siłę, ale nie jest ociężały – wytrzymałego, aktywnego, niezawodnego, pełnego temperamentu, czujnego i wiernego. Psy mają 64–69\u00a0cm wysokości i ważą 50–59\u00a0kg, suki 61–66\u00a0cm i 41–50\u00a0kg. Krótka, twarda sierść ma dowolny odcień płowego, rudego lub pręgowanego, zawsze z czarną kufą.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i pielęgnację raz w tygodniu, a rasa zwykle żyje krócej niż 10 lat. PDSA opisuje bardzo lojalne psy, które ze względu na wielkość i siłę lepiej pasują do domów, w których mieszkają tylko dorośli, lub do rodzin ze starszymi dziećmi; potrzebują wczesnej socjalizacji, najlepiej, gdy ktoś jest w domu przez cały czas, mają bardzo silny instynkt łowiecki, bardzo się ślinią i potrzebują odstępu między jedzeniem a ruchem.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "grzywacz, chiński grzywacz, powder puff, Chinese crested",
      text: [
        "Grzywacz chiński to mały, aktywny i pełen wdzięku pies do towarzystwa z Chin; FCI zalicza go do psów nagich. Występuje w dwóch odmianach: nagiej, z gładkim, gołym ciałem i włosem tylko na głowie (grzywa), łapach i ogonie, oraz powder puff, całkowicie okrytej welonem długiego, miękkiego włosa. Psy mają 28–33\u00a0cm, a suki 23–30\u00a0cm wysokości; PetMD podaje masę ciała 8–12 funtów (3,6–5,4\u00a0kg). Dopuszczalne jest każde umaszczenie oprócz merle, a jego temperament opisuje się jako radosny, nigdy złośliwy.",
        "The Royal Kennel Club zaleca do 30 minut ruchu dziennie i pielęgnację raz w tygodniu; nadaje się do mieszkania, a rasa zwykle żyje ponad 12 lat. PetMD opisuje przyjaznego psa, który pasuje do większości rodzin, także tych z dziećmi i innymi zwierzętami – każdy kontakt z dziećmi trzeba nadzorować. Naga skóra wymaga ochrony przed słońcem i zimnem, pazury trzeba sprawdzać co tydzień, a szczenięta potrzebują wczesnej, konsekwentnej socjalizacji.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, Nova Scotia duck tolling retriever, NSDTR",
      text: [
        "Retriever z Nowej Szkocji – toller – to retriever z Kanady; jego wzorzec FCI opisuje, jak biega i bawi się wzdłuż brzegu na oczach kaczek, by je zwabić, a potem zostaje wysłany po ustrzelone ptaki. Wzorzec opisuje średniej wielkości, silnego, zwartego i dobrze umięśnionego psa, który jest bardzo inteligentny, łatwy w szkoleniu i bardzo wytrzymały. FCI podaje dla psów 48–51\u00a0cm i 20–23\u00a0kg, dla suk 45–48\u00a0cm i 17–20\u00a0kg. Wodoodporna podwójna sierść ma różne odcienie rudego lub pomarańczowego, zwykle z białym na końcu ogona, łapach, piersi lub w postaci strzałki.",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu, a rasa linieje; PetMD zaleca szczotkowanie raz lub dwa razy w tygodniu. Duże brytyjskie badanie (McMillan 2024, za Dogs Trust) podaje medianę oczekiwanej długości życia 13,2 roku, PetMD 12–14 lat, a jak inne średnie psy osiąga dorosłe rozmiary w wieku około 12–15 miesięcy (PetMD). AKC opisuje bardzo czułe psy, które zwykle dobrze czują się z dziećmi, potrzebują dużo ruchu i zajęć dla głowy, przy mniejszych zwierzętach mogą mieć silny instynkt łowiecki, a wczesna socjalizacja i zajęcia dla szczeniąt wychodzą im na dobre.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, cairnik, Cairn terrier",
      text: [
        "Cairn terrier pochodzi z Wielkiej Brytanii; FCI zalicza go do małych terierów. Wzorzec Kennel Clubu opisuje zwinnego, czujnego teriera o roboczym, naturalnym wyglądzie – aktywnego, zadziornego i wytrzymałego, o nieustraszonym i wesołym usposobieniu, stanowczego, ale nie agresywnego. Jego podwójna sierść odporna na warunki pogodowe ma obfity, szorstki włos okrywowy; umaszczenie jest kremowe, pszeniczne, rude, szare lub prawie czarne, pręgowanie jest dopuszczalne, a ciemne uszy i kufa są typowe. Podaje wysokość około 28–31\u00a0cm i idealną masę ciała 6–7,5\u00a0kg.",
        "PDSA zaleca co najmniej godzinę ruchu dziennie, mówi, że cairny mają niespożytą energię i silny instynkt łowiecki, więc trzeba je wcześnie socjalizować z kotami i innymi małymi zwierzętami i uważać, gdy są bez smyczy, a po socjalizacji bardzo dobrze dogadują się z dziećmi i są doskonałymi psami rodzinnymi. Zaleca ręczne trymowanie sierści dwa razy w roku i pielęgnację raz lub dwa razy w tygodniu; Dogs Trust mówi, że linieją bardzo słabo. Duże brytyjskie badanie (McMillan 2024, za Dogs Trust) podaje medianę oczekiwanej długości życia 14,0 roku, PetMD 13–15 lat, a jak inne małe psy osiąga dorosłe rozmiary w wieku około 9–12 miesięcy (PetMD). PetMD dodaje, że potrzebuje dużo ruchu i zajęć dla głowy.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "bull terrier, bulterier angielski, bully",
      text: [
        "Bulterier pochodzi z Wielkiej Brytanii; FCI zalicza go do terierów typu bull (grupa 3). To średniej wielkości, krótkowłosy terier: PDSA podaje przeciętną wysokość 51–61\u00a0cm i przeciętną masę ciała 22–31\u00a0kg, a PetMD opisuje atletyczną budowę o wysokości około 21–22 cali i masie 50–70 funtów. PetMD nazywa regularny ruch koniecznością i mówi, że bulteriery są czułe wobec rodziny, także dzieci, ale nie zawsze przyjazne wobec innych psów czy kotów, a wczesna i częsta socjalizacja i szkolenie są kluczowe.",
        "PDSA zaleca co najmniej godzinę ruchu dziennie, rozłożoną na cały dzień, i odstęp po posiłku przed ruchem. Mówi, że dobrze zsocjalizowany bulterier dogaduje się z ludźmi w każdym wieku, ale jako dość pobudliwy lepiej pasuje do starszych dzieci; lubi jak najwięcej towarzystwa i ma silny instynkt łowiecki, więc przy kotach i innych małych zwierzętach trzeba uważać. Sierść wystarczy szczotkować raz w tygodniu. PDSA podaje przeciętną długość życia ponad 10 lat, a PetMD 12–13 lat; jak inne średnie psy osiąga dorosłe rozmiary w wieku około 12–15 miesięcy (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "pinczerek, ratlerek, min pin, Zwergpinscher",
      text: [
        "Pinczer miniaturowy pochodzi z Niemiec; FCI zalicza go do pinczerów i sznaucerów (grupa 2) i opisuje go jako pomniejszone odbicie pinczera średniego – żywego, pełnego temperamentu, pewnego siebie i zrównoważonego. Jego sierść jest krótka, gęsta, gładka i lśniąca, jednolita – od jeleniorudej po ciemnorudobrązową – albo czarna podpalana, a ogon jest naturalny. Wzorzec FCI podaje wysokość 25–30\u00a0cm i masę ciała 4–6\u00a0kg dla psów i suk; jak inne miniaturowe psy osiąga dorosłe rozmiary w wieku około 8–12 miesięcy (PetMD).",
        "PDSA zaleca do pół godziny ruchu dziennie dla tych energicznych, ruchliwych małych psów, mówi, że sierść zwykle wystarczy szczotkować raz w tygodniu, i zaznacza, że mogą być uparte i niezależne, więc szkolenie wymaga ćwiczeń i cierpliwości. PetMD mówi, że przy właściwej socjalizacji i szkoleniu mogą być doskonałymi psami rodzinnymi. VCA opisuje rasę jako skorą do zabawy i bardzo dobrą wobec dzieci, choć bardzo małe lub niesforne dzieci mogą zrobić jej krzywdę w zbyt ostrej zabawie, i mówi, że z powodu cienkiej sierści i małego rozmiaru łatwo marznie. PDSA podaje przeciętną długość życia ponad 12 lat, a PetMD 12–16 lat.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "pirenejczyk, patou, Great Pyrenees, Chien de montagne des Pyrénées",
      text: [
        "Pirenejski pies górski – w Stanach Zjednoczonych nazywany Great Pyrenees – pochodzi z Francji; FCI zalicza go do molosów w typie górskim (grupa 2) i opisuje psa bardzo dużego, imponującego i mocno zbudowanego, ale nie pozbawionego pewnej elegancji. Jego sierść jest biała albo biała z łatami w kolorze borsuczym, wilczastoszarym, jasnożółtym lub pomarańczowym na głowie i uszach. Wzorzec FCI podaje wysokość 70–80\u00a0cm dla psów i 65–75\u00a0cm dla suk; PDSA podaje przeciętną masę ciała 40–50\u00a0kg. Jak inne olbrzymie psy osiąga dorosłe rozmiary w wieku około 18–24 miesięcy (PetMD).",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie, mówi, że rasa nadaje się do dużego domu z dużym ogrodem, wymaga pielęgnacji częściej niż raz w tygodniu i linieje, i podaje długość życia poniżej 10 lat (PetMD i VCA podają 10–12 lat). PDSA nazywa je łagodnymi olbrzymami – spokojnymi, dobrodusznymi psami, które zwykle dobrze dogadują się ze wszystkimi – i mówi, że szkolenie wymaga cierpliwości i metod opartych na nagrodach. VCA mówi, że pirenejczyk jest oddany rodzinie, zwłaszcza dzieciom, i że wczesna socjalizacja jest bardzo ważna; PetMD mówi, że dobrze żyje z innymi zwierzętami, ale może najlepiej czuć się w domach bez mniejszych dzieci, i zaleca unikanie intensywnego ruchu w porze posiłków z powodu ryzyka skrętu żołądka.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "wheaten terrier, wheaten, irlandzki terier pszeniczny, Soft coated wheaten terrier",
      text: [
        "Irish soft coated wheaten terrier pochodzi z Irlandii; FCI prowadzi go pod tą nazwą wśród dużych i średnich terierów. Wzorzec The Royal Kennel Club opisuje średniej wielkości, zwartego, wyprostowanego teriera o miękkiej, jedwabistej sierści koloru pszenicy, która układa się w luźne loki lub fale – zrównoważonego, pełnego temperamentu i zadziornego, pewnego siebie i z poczuciem humoru. Jedynym umaszczeniem jest czysty kolor pszeniczny. PDSA podaje przeciętną wysokość 46–49\u00a0cm i przeciętną masę ciała 16–20,5\u00a0kg (wzorzec Kennel Clubu podaje dla psów 16–20,5\u00a0kg, dla suk nieco mniej); jak inne średnie psy osiąga dorosłe rozmiary w wieku około 12–15 miesięcy (PetMD).",
        "The Royal Kennel Club zaleca do godziny ruchu dziennie, mówi, że rasa nadaje się do małego domu, wymaga codziennej pielęgnacji i nie linieje. Duże brytyjskie badanie (McMillan 2024, za Dogs Trust) podaje medianę oczekiwanej długości życia 13,7 roku; PetMD i VCA podają 12–14 lat. PDSA nazywa je przyjaznymi, godnymi zaufania psami, które są świetnymi psami rodzinnymi, choć bywają trochę uparte. VCA mówi, że dzięki łagodnej, skorej do zabawy naturze dobrze pasują do dzieci; PetMD mówi, że ich kontakty z dziećmi trzeba nadzorować, że nie lubią zostawać same na długo, i zaleca wizytę u groomera co cztery–sześć tygodni, kąpiel mniej więcej raz w miesiącu i czyszczenie uszu co jeden–dwa tygodnie.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "wilczarz, Irish wolfhound, Cú Faoil",
      text: [
        "Wilczarz irlandzki pochodzi z Irlandii; FCI zalicza go do chartów szorstkowłosych. PDSA podaje przeciętną wysokość 71–79\u00a0cm i przeciętną masę ciała 40–55\u00a0kg; jak inne olbrzymie psy osiąga dorosłe rozmiary w wieku około 18–24 miesięcy (PetMD). The Royal Kennel Club określa jego wielkość jako bardzo dużą i mówi, że nadaje się do dużego domu z dużym ogrodem na wsi.",
        "The Royal Kennel Club zaleca ponad dwie godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu oraz mówi, że rasa linieje. Kennel Club i PDSA podają długość życia poniżej 10 lat; PetMD podaje 6–8 lat. PDSA nie poleca rasy do domów z mniejszymi dziećmi ze względu na jej wielkość i siłę ani do domów z mniejszymi zwierzętami z powodu silnego instynktu łowieckiego i mówi, że nigdy nie powinna zostawać sama dłużej niż cztery godziny. PetMD zaleca socjalizowanie szczeniaka od dnia, w którym zamieszka w domu, brak ruchu tuż przed jedzeniem i tuż po nim (skręt żołądka) oraz czyszczenie uszu co dwa–cztery tygodnie.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "amstaff, am staff, amerykański staffordshire terier, Staffordshire terrier",
      text: [
        "American staffordshire terrier pochodzi z USA; FCI zalicza go do terierów typu bull. Jego wzorzec wymaga wielkiej siły jak na jego wielkość i podaje wysokość 46–48\u00a0cm dla psów i 43–46\u00a0cm dla suk, ale nie podaje masy ciała. PetMD podaje 40–70 funtów (około 18–32\u00a0kg) dla obu płci; pies tej wielkości osiąga dorosłe rozmiary w wieku około 12–15 miesięcy (PetMD).",
        "PetMD zaleca co najmniej 60 minut ruchu dziennie, mówi, że rasa jest cierpliwa i kochająca wobec dzieci, że może mieć skłonność do lęku separacyjnego i że silny instynkt łowiecki może utrudniać życie z mniejszymi psami lub kotami. Brytyjskie badanie (McMillan i in., 2024, w zestawieniu Dogs Trust) podaje medianę oczekiwanej długości życia 12,5 roku; PetMD podaje 12–16 lat. VCA zaleca cotygodniowe szczotkowanie; PetMD zaleca socjalizację szczeniaka, brak ruchu tuż po posiłku (skręt żołądka) oraz kąpiel i czyszczenie uszu mniej więcej co 4–6 tygodni.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "lagotto, lagotti, pies do trufli",
      text: [
        "Lagotto romagnolo to mały do średniego, kędzierzawy pies dowodny z Włoch, znany jako pies do szukania trufli; FCI zalicza go do psów dowodnych. Jego wzorzec podaje wysokość 43–48\u00a0cm i masę ciała 13–16\u00a0kg dla psów oraz 41–46\u00a0cm i 11–14\u00a0kg dla suk; pies tej wielkości osiąga dorosłe rozmiary w wieku około 12–15 miesięcy (PetMD).",
        "The Royal Kennel Club nazywa go doskonałym i czujnym towarzyszem rodziny, zaleca ponad dwie godziny ruchu dziennie i pielęgnację częściej niż raz w tygodniu, mówi, że nie linieje, i podaje, że żyje ponad 12 lat; PetMD mówi, że lagotto mogą dożyć 15–17 lat. PetMD zaznacza, że potrzebuje stałych zajęć dla głowy i ciała oraz szerokiej socjalizacji, bo może być nieśmiały; Woodgreen mówi, że może mieć trudności, gdy zbyt często zostaje sam, i zaleca wizytę u groomera co sześć–osiem tygodni.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "malamut, malamute, malamut alaskański",
      text: [
        "Alaskan malamute to jeden z najstarszych arktycznych psów zaprzęgowych: silny, masywnie zbudowany nordycki pies zaprzęgowy z USA o grubej, szorstkiej sierści. Wzorzec FCI podaje pożądaną wielkość 63,5\u00a0cm i 38\u00a0kg dla psów oraz 58,5\u00a0cm i 34\u00a0kg dla suk; PDSA podaje 58–64\u00a0cm i 34–39\u00a0kg. Pies tej wielkości osiąga dorosłe rozmiary w wieku około 15–18 miesięcy (PetMD), a PDSA podaje, że żyje ponad 10 lat (PetMD: 10–14 lat).",
        "PDSA zaleca co najmniej dwie godziny intensywnego ruchu każdego dnia i codzienne szczotkowanie oraz mówi, że malamuty mocno linieją, mają bardzo silny instynkt łowiecki, nie powinny zostawać same dłużej niż cztery godziny i pasują do aktywnych dorosłych lub rodzin ze starszymi dziećmi; nazywa je wymagającymi dla osób, które mają psa po raz pierwszy. PetMD zaleca sprawdzanie uszu raz w tygodniu i kąpiel co 6–8 tygodni i zaznacza, że gruba sierść utrudnia im znoszenie upałów.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "pies, który nie szczeka, pies z Konga, African barkless dog",
      text: [
        "Basenji to lekko zbudowany pies myśliwski o delikatnym kośćcu z Afryki Środkowej, który nie szczeka, ale wydaje własny, jodłujący dźwięk; FCI zalicza go do psów w typie pierwotnym. PDSA podaje wysokość 40–43\u00a0cm i masę ciała 9–11\u00a0kg. Pies tej wielkości osiąga dorosłe rozmiary w wieku około 9–12 miesięcy (PetMD), a PDSA podaje, że żyje ponad 12 lat (WebMD: 13–14 lat).",
        "PDSA zaleca co najmniej godzinę ruchu dziennie (około 60–90 minut), dużo zajęć dla głowy i szczotkowanie raz w tygodniu; nazywa basenji zdystansowanymi, ale godnymi zaufania, upartymi i bardzo nieostrożnymi na drodze. WebMD mówi, że gonią wszystko, co wygląda jak zdobycz, potrzebują bardzo wysokiego ogrodzenia lub stałego nadzoru i tylko umiarkowanie dobrze czują się z małymi dziećmi, i zaleca czyszczenie uszu co tydzień oraz mycie zębów co najmniej dwa razy w tygodniu.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "duży szwajcarski pies pasterski, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Duży szwajcarski pies pasterski to mocny, kościsty i dobrze umięśniony trójkolorowy pies pociągowy ze Szwajcarii: czarny z symetrycznymi podpalanymi i białymi znaczeniami. Wzorzec FCI podaje wysokość 65–72 cm dla psów i 60–68 cm dla suk, ale nie podaje masy ciała; WebMD podaje 52–64 kg dla psów i 39–50 kg dla suk. Pies tej wielkości osiąga dorosłe rozmiary w wieku około 18–24 miesięcy (PetMD), a Royal Kennel Club podaje, że żyje ponad 10 lat (PetMD: 8–11 lat).",
        "Royal Kennel Club zaleca do godziny ruchu dziennie i szczotkowanie raz w tygodniu oraz podaje, że rasa linieje i potrzebuje dużego domu z dużym ogrodem. PetMD nazywa te psy świetnymi psami rodzinnymi, łagodnymi wobec dzieci (każdy kontakt z dziećmi należy nadzorować), i zaleca czyszczenie uszu co tydzień oraz unikanie ruchu tuż przed posiłkiem i po nim ze względu na ryzyko skrętu żołądka (GDV); WebMD zaleca codzienne mycie zębów i ograniczanie smakołyków, bo rasa łatwo tyje.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "brytyjczyk, kot brytyjski, British blue, British shorthair, BSH",
      text: [
        "Kot brytyjski krótkowłosy to krępy kot o gęstej sierści i dużych, okrągłych oczach – CFA nazywa go kotem przypominającym „pluszowego misia”. Większość osób wyobraża go sobie w kolorze niebieskoszarym, ale występuje w wielu kolorach i wzorach. Dojrzewa powoli: według CFA osiąga pełne rozmiary w wieku około trzech lat, a według VCA osiągnięcie dojrzałości fizycznej może potrwać nawet pięć lat.",
        "CFA opisuje go jako bardzo czułego i przywiązanego do swoich ludzi; dogaduje się ze wszystkimi domownikami niezależnie od wieku, ale zwykle nie lubi być noszony na rękach i potrafi mieszkać z psami, królikami i ptakami. VCA opisuje umiarkowany poziom aktywności i zaleca czesanie sierści co najmniej raz w tygodniu. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "kot ragdoll, rag doll",
      text: [
        "CFA opisuje ragdolla jako dużego, spokojnego kota o półdługiej, pluszowej i jedwabistej sierści i niebieskich oczach. Jego ciemniejsze znaczenia („pointy”) występują w kilku wzorach – colourpoint bez białego, mitted z białymi łapkami, bicolour z większą ilością białego oraz van. Dojrzewa powoli: pełny kolor sierści osiąga w wieku dwóch lat, a pełne rozmiary i masę ciała w wieku około czterech.",
        "CFA opisuje łagodnego kota, który wita cię przy drzwiach i chodzi za tobą z pokoju do pokoju, a podczas zabawy zwykle nie wysuwa pazurów. PetMD nazywa go dobrym wyborem dla rodzin, także z dziećmi, ale zaleca powolne zapoznawanie z dziećmi i innymi zwierzętami pod nadzorem i mówi, że niektóre ragdolle wymagają czesania tylko raz lub dwa razy w tygodniu, podczas gdy CFA zaleca regularne czesanie. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "kot syberyjski leśny, syberyjczyk, Siberian cat, Siberian forest cat",
      text: [
        "GCCF opisuje kota syberyjskiego jako powoli rozwijającego się kota o grubej, odpornej na warunki pogodowe sierści: gęsty, miękki podszerstek pod twardszym włosem okrywowym, który obficie linieje wiosną i jesienią. Kocury ważą około 7,7–11,8\u00a0kg, a kotki 5,9–7,7\u00a0kg, pełny rozwój może trwać cztery–pięć lat, a GCCF podaje długość życia 12–15 lat lub więcej.",
        "GCCF nazywa go energicznym i kochającym zabawę, a jednocześnie cierpliwym – dobrym wyborem dla rodzin z małymi dziećmi – i mówi, że dobrze dogaduje się z innymi zwierzętami, także z psami. PetMD zaleca czesanie co najmniej raz w tygodniu, częściej w czasie wiosennego i jesiennego linienia, i zaznacza, że koty syberyjskie nie są uznawane za hipoalergiczne. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "kot maine coon, main coon, mainecoon",
      text: [
        "Maine coon jest powszechnie uważany za jedną z największych ras kotów domowych: ma muskularne, prostokątne ciało, szeroką klatkę piersiową, duże łapy i długi, puszysty ogon. TICA podaje przeciętną masę ciała około 5,9–8,2\u00a0kg dla dorosłych kocurów i 4,1–5,9\u00a0kg dla kotek, a CFA zaznacza, że niektóre kocury ważą ponad 9\u00a0kg. Rośnie powoli: według CFA często osiąga pełny rozwój dopiero w wieku trzech–czterech lat, a TICA mówi, że pełna dojrzałość może trwać trzy–pięć lat.",
        "TICA opisuje go jako łagodnego, przyjaznego i skorego do zabawy, CFA jako towarzyskiego, lojalnego i inteligentnego; często „mówi” ćwierkającym trelem zamiast miauczenia. Vetstreet pisze, że maine coony dogadują się ze wszystkimi, także z dziećmi, psami i innymi kotami. Jego ciężka, półdługa sierść jest krótsza na łopatkach, a dłuższa na kryzie, brzuchu i tylnej części ciała. Źródła różnią się co do pielęgnacji: według Vetstreet wystarczy czesanie raz w tygodniu, CFA zaleca szczotkowanie lub czesanie co najmniej parę razy w tygodniu, a TICA zaznacza, że gęstsza sierść może wymagać codziennego czesania. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengal, Bengal cat",
      text: [
        "PDSA opisuje kota bengalskiego jako bardzo inteligentnego i energicznego kota, który potrzebuje dużo zajęć dla głowy i okazji do ruchu i lubi wysokie punkty obserwacyjne, np. drapak z półkami. Jest czuły, ale chętniej zwinie się obok ciebie niż na twoich kolanach i bywa dość głośny. VCA zaznacza, że koty bengalskie rosną powoli i osiągnięcie dojrzałości fizycznej może im zająć nawet dwa lata.",
        "Jego krótka, miękka, cętkowana lub marmurkowa sierść wymaga tylko lekkiego szczotkowania lub czesania raz w tygodniu (PDSA). PetMD zaznacza, że kot bengalski może nie być najlepszym wyborem dla rodzin z małymi dziećmi, a z psami i innymi kotami może się dogadać, jeśli zostaną właściwie zapoznane. Rasę wyhodowano z krzyżówek azjatyckiego kota lamparciego z kotami domowymi; PetPrep pokazuje tylko zarejestrowanego, domowego kota bengalskiego. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "norweski kot leśny, kot norweski, skogkatt, Norwegian forest cat, wegie",
      text: [
        "GCCF opisuje kota norweskiego leśnego jako łagodnego i przyjaznego kota, który lubi być częścią rodziny. Dojrzewa powoli i uznaje się, że w pełni dorasta dopiero w wieku około czterech–pięciu lat; kocury ważą około 5,4–7,3\u00a0kg, a kotki 4,1–5,4\u00a0kg, a GCCF podaje długość życia 14–16 lat.",
        "Ma dużo energii, lubi interaktywne zabawy i chętnie się wspina; GCCF mówi, że jest tolerancyjny wobec dzieci, które go szanują, innych kotów i psów przyjaznych kotom. PetMD zaleca czesanie i szczotkowanie co najmniej raz w tygodniu, częściej w czasie wiosennego i jesiennego linienia, i zaznacza, że lęk separacyjny może być problemem, jeśli często zostaje sam na długo. Kocięta rodowodowe zwykle trafiają do nowego domu w wieku 12–13 tygodni (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default pl;
