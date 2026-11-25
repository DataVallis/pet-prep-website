import type { RegistryCopy } from "./types";

/** German plural: 1 Rasse / 2 Rassen; decimals take the plural ("1,5 Jahre"). */
const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** First letter lower case for values that continue a phrase ("Mehr als 2 Stunden" → "mehr als 2 Stunden pro Tag"). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("de") + t.slice(1);
type Fci = { number: number; group: number; origin: string };
/** Official German FCI group names (FCI / VDH). */
const fciGroups: Record<number, string> = { 1: "Hüte- und Treibhunde (ausgenommen Schweizer Sennenhunde)", 2: "Pinscher und Schnauzer – Molosser – Schweizer Sennenhunde und andere Rassen", 3: "Terrier", 4: "Dachshunde", 5: "Spitze und Hunde vom Urtyp", 6: "Laufhunde, Schweißhunde und verwandte Rassen", 7: "Vorstehhunde", 8: "Apportierhunde – Stöberhunde – Wasserhunde", 9: "Gesellschafts- und Begleithunde", 10: "Windhunde" };
const origins: Record<string, string> = { GB: "Großbritannien", FR: "Frankreich", DE: "Deutschland", US: "USA", CU: "Kuba", CH: "Schweiz", IT: "Italien", "CN-XZ": "Tibet (China)", CN: "China", MX: "Mexiko", BE: "Belgien", HU: "Ungarn", JP: "Japan", ZA: "Südafrika", "BE-FR": "Belgien / Frankreich", PT: "Portugal", CA: "Kanada", HR: "Kroatien", AU: "Australien", RU: "Russland", IE: "Irland", "AF-C": "Zentralafrika", TR: "Türkei", MG: "Madagaskar", AF: "Afghanistan", NO: "Norwegen", FI: "Finnland" };

const de: RegistryCopy = {
  mistakes: {
    title: (breed) => `Häufige Halterfehler: ${breed}`,
    intro: "Kleine Gewohnheiten, die größere Probleme verursachen – jeder Punkt stammt aus den Quellen zu dieser Rasse.",
    exercise: "Zu wenig tägliche Bewegung",
    exerciseText: (amount) => `Bewegungsbedarf: ${amount}. Planen Sie die Bewegung jeden Tag ein, nicht nur am Wochenende.`,
    coat: "Vernachlässigte Fellpflege",
    coatText: (brushing, shedding) => `Bürsten: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Zu viele Leckerlis und zu große Portionen",
    heat: "Spaziergänge bei Hitze",
    growth: "Vergessen, dass der Welpe noch wächst",
    growthText: (growthEnd) => `Ausgewachsen: ${growthEnd}. Richten Sie Bewegung und Futter bis dahin auf ein noch wachsendes Tier aus, und fragen Sie Ihren Tierarzt, was für Ihr Haustier passt.`,
    mind: "Zu wenig geistige Auslastung",
    health: "Rassetypische Gesundheitsprobleme übersehen",
    practise: "In PetPrep übt ein Kind genau diese Gewohnheiten – Schritte, Mahlzeiten, Pflege –, bevor das echte Haustier einzieht.",
  },
  hub: {
    title: "Das Haustier kennenlernen, bevor es einzieht.",
    intro:
      "Was jede Tierart und Rasse in PetPrep wirklich braucht – nach Angaben von Zuchtverbänden, Katzenzuchtverbänden, tiermedizinischen Hilfsorganisationen und Studien, mit Link zu jeder Quelle. Dazu die Regeln, nach denen PetPrep sie simuliert.",
    breedCount: (n) => `${n} ${s(n, "Rasse", "Rassen")} im Register`,
    open: "Rassen ansehen",
    openA11y: (many) => `Rassen ansehen: ${many}`,
    freePlan: (name, activity) => `Kostenloser Plan: ${name} (erwachsen: ${activity}); die 12-wöchige Challenge können Sie später hinzufügen. Dafür gibt es keine eigene Rassenseite.`,
    otherSpecies: "Weitere Tierarten sind geplant.",
    methodTitle: "Wie wir dieses Register erstellen",
    method: [
      "Jeder Fakt stammt aus einer genannten Quelle – Zuchtverbänden, Katzenzuchtverbänden, tiermedizinischen Hilfsorganisationen und Fachverbänden sowie begutachteten Studien – und ist mit ihr verlinkt. Rassestandards fassen wir in eigenen Worten zusammen.",
      "Werte, die keine Quelle stützt, zeigen wir nie als Fakten. Wo PetPrep für das Spiel eine Zahl festlegen muss, erscheint sie nur unter „So simuliert PetPrep die Rasse“ und ist als Spielregel gekennzeichnet.",
      "Dieselben Daten steuern die App: Die Merkmale, die Zahl der Mahlzeiten, die Schrittziele und die Spieleinheiten auf diesen Seiten sind dieselben, die das Haustier in der App verwendet.",
      "Dieses Register ist keine tierärztliche Beratung. Gesundheitsangaben dienen nur der Orientierung und wurden nicht von einem Tierarzt geprüft.",
    ],
  },
  speciesStatus: { available: "In der App", coming_soon: "Bald in der App", info_only: "Nur zur Information" },
  availability: {
    in_app: { label: "In der App", text: "Verfügbar in der 12-wöchigen PetPrep Challenge." },
    coming_soon: { label: "Bald in der App", text: "Fertig und getestet; sie kommt mit einem der nächsten App-Updates." },
    info_only: { label: "Nur zur Information", text: "Zur Information im Register; in der App lässt sie sich noch nicht als Haustier wählen." },
  },
  catalogue: {
    eyebrow: "Tierregister",
    title: (many) => `${many}: Rassen im Register`,
    lead: (many, count) =>
      `${many}: ${count} ${s(count, "Rasse", "Rassen")} mit belegten Bedürfnissen, Angaben dazu, zu wem sie passen, und den Regeln, nach denen PetPrep sie simuliert. Sie können suchen, filtern und bis zu drei Rassen vergleichen.`,
    metaTitle: (many) => `${many} – Rassenregister mit Quellen | PetPrep`,
    metaDescription: (many) =>
      `${many}: Rassen nach Bedürfnissen, Größe und Eignung suchen und vergleichen. Jeder Fakt ist mit seiner Quelle verlinkt; dazu die Regeln, nach denen PetPrep jede Rasse simuliert.`,
    searchLabel: "Rassen suchen",
    searchPlaceholder: "Name, z. B. Labrador",
    filtersTitle: "Filter",
    any: "Alle",
    availabilityLabel: "In PetPrep",
    sortLabel: "Sortieren",
    sort: { recommended: "Zuerst in der App", az: "A–Z", size: "Größe (klein bis groß)" },
    clear: "Alle zurücksetzen",
    results: (total) => `{n} von ${total} ${s(total, "Rasse", "Rassen")}`,
    none: "Keine Rasse passt. Versuchen Sie es mit weniger Filtern.",
    loading: "Suche wird geladen …",
    page: "Seite {n} von {total}",
    prev: "Zurück",
    next: "Weiter",
    compareAdd: "Vergleichen: {name}",
    compareBar: "{n} von {max} zum Vergleich ausgewählt",
    compareGo: "Vergleichen",
    compareMax: "Sie können bis zu {max} Rassen vergleichen.",
    azTitle: "Alle Rassen von A bis Z",
    azIntro: "Alle Rassen im Register, alphabetisch.",
    freePlanTitle: "Kostenloser Plan",
    guideTitle: "Wie Sie eine Rasse auswählen",
    guide: () => [
      "Beginnen Sie mit dem, was Ihr Haushalt jeden Tag geben kann: Zeit für Bewegung, Fellpflege und Platz. Jede Rassenseite zeigt diese Bedürfnisse auf einen Blick, mit der genannten Quelle jedes Werts; wo Quellen voneinander abweichen, werden alle Werte gezeigt.",
      "Hat eine Rasse eine Größenklasse (bei Hunden: sehr klein, klein, mittel, mittel bis groß, groß oder sehr groß), stammt sie aus der genannten Quelle – meist einem Zuchtverband –, und Gewichte sind die Spannen aus den Quellen, keine eigenen Schätzungen.",
      "Merkmale wie „Gut geeignet für: aktive Familien“ sind dieselben wie in der App, und jedes ist durch Quellen belegt. Die Zahlen unter „So simuliert PetPrep die Rasse“ sind Spielregeln von PetPrep, keine Pflegeanleitung. [Wie wir das Register erstellen](page:about#methodik)",
    ],
  },
  compare: {
    title: (many) => `${many} vergleichen`,
    metaTitle: (many) => `${many} vergleichen | PetPrep-Register`,
    intro: "Die wichtigsten Bedürfnisse nebeneinander, aus denselben Quellen wie die Rassenseiten.",
    pick: "Wählen Sie im Katalog zwei oder drei Rassen aus, um sie zu vergleichen.",
    back: "Zurück zum Katalog",
    remove: "Entfernen: {name}",
    note: "Die Werte sind so angegeben, wie die genannte Quelle sie nennt. Wo Quellen voneinander abweichen, führt die Rassenseite jeden Wert auf.",
    availabilityRow: "In PetPrep",
    activityRow: "Tagesziel für erwachsene Tiere in PetPrep (Spielregel)",
  },
  facets: {
    size: { label: "Größe", values: { toy: "Sehr klein", small: "Klein", small_medium: "Klein bis mittel", medium: "Mittel", medium_large: "Mittel bis groß", large: "Groß", giant: "Sehr groß" } },
    exercise: { label: "Bewegung pro Tag", values: { under_1h: "Bis zu 1 Stunde", h1_2: "1–2 Stunden", over_2h: "Mehr als 2 Stunden" }, line: (v) => `${lc(v)} pro Tag` },
    grooming: { label: "Bürsten", values: { weekly: "Einmal pro Woche", several_weekly: "Mehrmals pro Woche", daily: "Täglich", other: "Andere Angabe" }, line: (v) => `Bürsten: ${lc(v)}` },
  },
  groups: {
    exercise: "Bewegung",
    play: "Spiel",
    litter: "Katzenklo",
    scratching: "Kratzen",
    grooming: "Fell und Fellpflege",
    feeding: "Mahlzeiten",
    water: "Wasser",
    lifespan: "Lebenserwartung",
    stages: "Lebensphasen",
    size: "Größe und Gewicht",
    training: "Erziehung",
  },
  fields: {
    size: "Größe",
    height: "Widerristhöhe",
    weight: "Gewicht (erwachsen)",
    growth_end: "Ausgewachsen",
    lifespan: "Lebenserwartung",
    exercise: "Bewegung pro Tag",
    coat: "Fell",
    grooming_frequency: "Bürsten",
    grooming_level: "Pflegeaufwand",
    shedding: "Haarwechsel",
    litter_scoop: "Katzenklo säubern",
    litter_full_change: "Streu komplett wechseln",
    litter_pee: "Urinabsatz (erwachsen)",
    litter_poo: "Kotabsatz (erwachsen)",
    water_need: "Wasserbedarf",
    sleep: "Schlaf (erwachsen)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 Wochen",
    puppy_3_6_months: "3–6 Monate",
    puppy_6_12_months: "6–12 Monate",
    kitten_6_12_weeks: "6–12 Wochen",
    kitten_3_6_months: "3–6 Monate",
    kitten_6_12_months: "6–12 Monate",
    puppy: "Welpe",
    kitten: "Kätzchen",
    young_adult: "Junges erwachsenes Tier",
    mature_adult: "Reifes Tier",
    adult: "Erwachsenes Tier",
    senior: "Senior",
  },
  categories: {
    size: { toy: "sehr klein", small: "klein", small_medium: "klein bis mittel", medium: "mittel", medium_large: "mittel bis groß", large: "groß", giant: "sehr groß" },
    coat: { moderately_long: "mäßig lang", smooth: "glatt (kurz)", short: "kurz", medium: "mittellang", short_long: "kurz oder lang (zwei Felltypen)", long: "lang" },
    grooming_frequency: { at_least_once_a_week: "mindestens einmal pro Woche", at_least_once_or_twice_a_week: "mindestens ein- bis zweimal pro Woche", once_a_week: "einmal pro Woche", more_than_once_a_week: "mehr als einmal pro Woche", daily: "täglich", every_day: "jeden Tag" },
    grooming_level: { moderate: "mittel", high: "hoch", low: "gering" },
    shedding: { yes: "haart", no: "haart nicht (das bedeutet nicht hypoallergen)", high: "haart stark", moderate: "haart mäßig", low: "haart wenig", minimal: "haart kaum" },
  },
  statements: {
    food_motivated: () => "Stark futtermotiviert – hilfreich bei der Erziehung, aber achten Sie auf die Portionen.",
    coren_rank: (v) => `Platz ${String(v)} in Stanley Corens Rangliste der Arbeits- und Gehorsamsintelligenz.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `FCI-Standard Nr. ${x.number}, Gruppe ${x.group} (${fciGroups[x.group] ?? "–"}); Ursprung: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Spiel: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} Einheiten zu je ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} Minuten pro Tag.`;
    },
    kittens_play_more: () => "Kätzchen müssen öfter spielen.",
    scratching_natural: () => "Kratzen ist natürlich und notwendig: Stellen Sie einen Kratzbaum bereit und bestrafen Sie das Kratzen nie.",
    water_fresh: () => "Immer frisches Wasser; den Napf täglich spülen und neu füllen.",
    grooming_sources_differ: () => "Die Quellen weichen beim Kämmen voneinander ab: von täglich bis einmal pro Woche.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `Median ${t}`,
    more_than: (t) => `mehr als ${t}`,
    less_than: (t) => `weniger als ${t}`,
    at_least: (t) => `mindestens ${t}`,
    up_to: (t) => `bis zu ${t}`,
    ideal: (t) => `ideal (Rassestandard): ${t}`,
    mean: (t) => `gemessener Durchschnitt: ${t}`,
    about: (t) => `etwa ${t}`,
    until: (t) => `bis ${t}`,
    until_about: (t) => `bis etwa ${t}`,
    span: (t) => t,
    from: (t) => `ab ${t}`,
    last: (t) => `die letzten ${t}`,
    every: (t) => `alle ${t}`,
    expectancy: (t) => `Lebenserwartung bei Geburt ${t}`,
    smaller_meals: (t) => `${t}, kleinere Portionen`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "Jahr", "Jahre")}`,
    months: (t, n) => `${t} ${s(n, "Monat", "Monate")}`,
    days: (t, n) => `${t} ${s(n, "Tag", "Tage")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "Stunde", "Stunden")} pro Tag` : `${t} ${s(n, "Minute", "Minuten")} pro Tag`),
    meals_per_day: (t, n) => `${t} ${s(n, "Mahlzeit", "Mahlzeiten")} pro Tag`,
    times_per_day: (t) => `${t}-mal pro Tag`,
    hours_per_day: (t, n) => `${t} ${s(n, "Stunde", "Stunden")} pro Tag`,
    ml_per_kg_day: (t) => `${t} ml pro kg Körpergewicht und Tag`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)} % der erwarteten Lebensdauer`,
  },
  males: "männlich",
  females: "weiblich",
  or: " oder ",
  notes: { size_class_guidance: "Empfehlung für ihre Größenklasse" },
  stageLabels: {
    dog: { puppy: "Welpe", young: "Junghund", adult: "Erwachsener Hund", senior: "Senior" },
    cat: { puppy: "Kätzchen", young: "Junge Katze", adult: "Reife Katze", senior: "Senior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${s(raw, "Schritt", "Schritte")}`,
    steps_range: (from, to) => `${from} → ${to} Schritte`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} Schritte pro Lebensmonat (${first} bei der Ankunft), bis zu ${cap} ab dem ${capMonth}. Monat`,
    play_sessions: (n) => `${n} ${s(n, "Spieleinheit", "Spieleinheiten")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Schrittziel = Minuten täglicher Bewegung × ${p.per_minute} Schritte: Ein erwachsener Hund bekommt ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "Stunde", "Stunden")}` : `${p.minutes} Minuten`} Bewegung, also ${f.num(p.steps)} Schritte pro Tag.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Lernt Kommandos langsamer als der Mischling im kostenlosen Plan (${f.num(p.multiplier)}-fache Geschwindigkeit).`
        : p.multiplier === 1
          ? "Lernt Kommandos so schnell wie der Mischling im kostenlosen Plan."
          : `Lernt Kommandos ${f.num(p.multiplier)}-mal so schnell wie der Mischling im kostenlosen Plan.`,
    senior_share: (p, f) => `Wird im ${p.months}. Monat zum Senior (${f.num(p.months / 12, 1)} ${s(p.months / 12, "Jahr", "Jahre")}) – im letzten Viertel der erwarteten Lebensdauer der Rasse.`,
    walk_sensor: () => "Spaziergänge zählen echte Schritte aus Apple Health oder Health Connect (mit Erlaubnis, nur lesend) und vom Bewegungssensor des Handys – ohne GPS.",
    play_instead_of_steps: (p, f) =>
      `Keine Spaziergänge: Eine erwachsene Katze braucht ${p.sessions} ${s(p.sessions, "Spieleinheit", "Spieleinheiten")} pro Tag mit einer Katzenangel, im Abstand von mindestens ${f.num(p.gap_minutes / 60)} ${s(p.gap_minutes / 60, "Stunde", "Stunden")}.`,
    litter_rule: (p) =>
      `Katzenklo: Eine erwachsene Katze benutzt es ${p.uses}-mal pro Tag; jede Hinterlassenschaft wird innerhalb von ${p.scoop_hours === 1 ? "einer Stunde" : `${p.scoop_hours} Stunden`} entfernt (außerhalb der Ruhezeiten), und die gesamte Streu wird ${p.change_days === 1 ? "jeden Tag" : `alle ${p.change_days} Tage`} gewechselt.`,
    scratching_after_missed_play: () => "Nach einem Tag mit zu wenig Spiel kratzt die Katze einmal an etwas; das Kind trägt sie zum Kratzbaum.",
    grooming_rule: (p) => (p.per_week === 1 ? "Kämmen einmal pro Woche." : p.per_week === 2 ? "Kämmen zweimal pro Woche." : `Kämmen ${p.per_week}-mal pro Woche.`),
    no_walk_in_heat: (p) =>
      `Im Sommer (Juni–August; auf der Südhalbkugel Dezember–Februar) zeigen die Bildschirme für Kind und Spaziergang zwischen ${p.from} und ${p.to} Uhr (Ortszeit der Familie) eine ruhige Erinnerung: keine Spaziergänge bei Hitze. Keine Wetterdaten, keine Strafe – Schritte zählen trotzdem.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "Hautfalten reinigen",
        tooth_brushing: "Zähne putzen",
        ear_cleaning: "Ohren kontrollieren und reinigen",
        nail_trim: "Krallen schneiden",
        bath: "Baden",
        groomer_visit: "Besuch beim Hundefriseur",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "jeden Tag"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "einmal pro Woche"
              : `alle ${q.period_days / 7} Wochen`
            : `${q.times}-mal alle ${q.period_days} Tage`;
      const who = q.actor === "parent" ? "eine Erinnerung für die Eltern" : "eine Aufgabe für das Kind";
      return `Pflege: ${what}, ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Sehen Sie sich den Welpen zusammen mit seiner Mutter dort an, wo er geboren wurde.",
      min_age_puppy: "Der Welpe sollte seine Mutter nicht vor einem Alter von 8 Wochen verlassen.",
      pedigree_fci: "Fragen Sie nach der Ahnentafel. Nach den Regeln der FCI darf eine Ahnentafel nur bei korrekter Abstammung ausgestellt werden.",
      parents_health_tests: "Lassen Sie sich die Ergebnisse der Gesundheitsuntersuchungen beider Elterntiere zeigen. Welche Untersuchungen wichtig sind, hängt von der Rasse ab.",
      breed_club_rules: "Nationale Zuchtverbände können Zuchtregeln festlegen, die über die der FCI hinausgehen – fragen Sie den Rassezuchtverein, welche Untersuchungen die Elterntiere brauchen.",
      written_contract: "Bitten Sie um einen schriftlichen Kaufvertrag, der Herkunft und Gesundheit des Welpen festhält.",
      kitten_see_mother: "Sehen Sie sich das Kätzchen zusammen mit seiner Mutter dort an, wo die Kätzchen leben.",
      kitten_min_age: "Nach den Zuchtregeln der FIFe zieht ein Kätzchen nicht vor einem Alter von 14 Wochen in ein neues Zuhause.",
      kitten_vaccination: "Das Kätzchen ist vollständig geimpft (Panleukopenie, Calicivirus, Herpesvirus) und hat einen Impfausweis.",
      kitten_pedigree: "Zu einem Rassekätzchen gehört ein Stammbaum, der mindestens drei Generationen zeigt.",
      kitten_parents_tests: "Fragen Sie, ob eines der Elterntiere Gesundheitsprobleme hatte, die das Kätzchen erben könnte.",
    },
    tests: {
      dna_poag_pll: "DNA-Test auf primäres Offenwinkelglaukom und primäre Linsenluxation (POAG/PLL), erbliche Augenerkrankungen, die zur Erblindung führen können",
      hip_scheme: "Röntgenuntersuchung der Hüften auf Hüftdysplasie (UK: BVA/KC-Programm)",
      elbow_scheme: "Röntgenuntersuchung der Ellbogen auf Ellbogendysplasie (UK: BVA/KC-Programm)",
      eye_scheme: "Augenuntersuchung durch einen tierärztlichen Augenspezialisten (UK: BVA/KC/ISDS-Programm; bei manchen Rassen mit Gonioskopie)",
      heart_scheme: "Herzuntersuchung auf Mitralklappenerkrankung",
      boas_grading: "Atemtest auf das brachyzephale obstruktive Atemwegssyndrom (BOAS-Einstufung)",
      ivdd_screening: "Untersuchung der Wirbelsäule auf Bandscheibenerkrankung (IVDD)",
      hearing_baer: "Hörtest auf Taubheit (BAER)",
      cm_sm_mri: "MRT-Untersuchung auf Chiari-ähnliche Malformation und Syringomyelie (UK: BVA/KC-CM/SM-Programm)",
      inbreeding_coi: "Genetische Vielfalt – den Inzuchtkoeffizienten prüfen",
      dna_prcd_pra: "DNA-Test auf progressive Retinaatrophie (prcd-PRA)",
      dna_rcd4_pra: "DNA-Test auf progressive Retinaatrophie (rcd4)",
      dna_gr_pra2: "DNA-Test auf progressive Retinaatrophie (GR_PRA2)",
      dna_cnm: "DNA-Test auf zentronukleäre Myopathie (CNM)",
      dna_eic: "DNA-Test auf belastungsinduzierten Kollaps (EIC)",
      dna_hnpk: "DNA-Test auf hereditäre nasale Parakeratose (HNPK)",
      dna_sd2: "DNA-Test auf Skelettdysplasie 2 (SD2)",
      dna_mcd: "DNA-Test auf makuläre Hornhautdystrophie (MCD)",
      dna_stgd: "DNA-Test auf Morbus Stargardt (STGD)",
      dna_cc_de: "DNA-Test auf Curly-Coat-/Dry-Eye-Syndrom (CC/DE)",
      dna_ef: "DNA-Test auf Episodic Falling (EF)",
      dna_cea: "DNA-Test auf Collie-Eye-Anomalie (CEA/CH)",
      dna_cl: "DNA-Test auf Ceroid-Lipofuszinose (CL)",
      dna_igs: "DNA-Test auf Imerslund-Gräsbeck-Syndrom (IGS)",
      dna_mdr1: "DNA-Test auf Arzneimittelüberempfindlichkeit (MDR1)",
      dna_tns: "DNA-Test auf Trapped-Neutrophil-Syndrom (TNS)",
      dna_sn: "DNA-Test auf sensorische Neuropathie (SN)",
      dna_ggd: "DNA-Test auf Goniodysgenesie und Glaukomrisiko (GGD)",
      dna_raines: "DNA-Test auf Raine-Syndrom",
      dna_dm: "DNA-Test auf degenerative Myelopathie (DM)",
      dna_de: "DNA-Test auf degenerative Enzephalopathie (DE)",
      dna_jadd: "DNA-Test auf juvenilen Morbus Addison (JADD)",
      dermoid_sinus_scheme: "Untersuchung der Welpen auf Dermoidsinus (Programm des Rassezuchtvereins)",
      dna_jme: "DNA-Test auf juvenile myoklonische Epilepsie (JME)",
      dna_je: "DNA-Test auf juvenile Epilepsie (JE)",
      dna_lsd: "DNA-Test auf lysosomale Speicherkrankheit (LSD)",
      dna_ampn: "DNA-Test auf Polyneuropathie des Alaskan Malamute (AMPN)",
      dna_fanconi: "DNA-Test auf Fanconi-Syndrom (eine Nierenerkrankung)",
      dna_pra_bj1: "DNA-Test auf progressive Retinaatrophie beim Basenji (PRA-BJ1)",
      thyroid_scheme: "Schilddrüsenuntersuchung der Elterntiere",
      dna_pap_pra1: "DNA-Test auf progressive Retinaatrophie beim Papillon (Pap-PRA1)",
      dna_nad: "DNA-Test auf neuroaxonale Dystrophie (NAD)",
      dna_eopra: "DNA-Test auf früh einsetzende progressive Retinaatrophie (EOPRA)",
      dna_cu: "DNA-Test auf Cystinurie (CU), eine erbliche Erkrankung mit Nieren- und Blasensteinen",
      heart_echo_scheme: "Herzuntersuchung per Farbdoppler-Ultraschall (Programm des Rassezuchtvereins)",
      cardiac_exam: "Herzuntersuchung der Elterntiere (Empfehlung des Rassezuchtvereins)",
      dna_rd_osd: "DNA-Test auf Retinadysplasie / okuloskelettale Dysplasie (RD/OSD)",
      dna_xlpra1: "DNA-Test auf X-chromosomale progressive Retinaatrophie (XLPRA1)",
      dna_cmo: "Test auf kraniomandibuläre Osteopathie (CMO), eine erbliche Knochenerkrankung des Kiefers",
      dna_hsf4: "DNA-Test auf erbliche Katarakt (HSF4)",
      dna_lafora: "DNA-Test auf Lafora-Krankheit",
      dna_nccd: "DNA-Test auf neonatale zerebelläre kortikale Degeneration (NCCD)",
      dna_fviid: "DNA-Test auf Faktor-VII-Mangel (FVIID)",
      dna_mls: "DNA-Test auf Musladin-Lueke-Syndrom (MLS)",
      dna_vwd1: "DNA-Test auf Von-Willebrand-Krankheit Typ 1 (vWD1)",
      dna_mac: "DNA-Test auf Anfälligkeit für Infektionen mit dem Mycobacterium-avium-Komplex (MAC)",
      dna_imgd: "DNA-Test auf erbliche Myopathie der Deutschen Dogge (IMGD), eine Erkrankung mit Muskelschwund",
      dna_poag: "DNA-Test auf primäres Offenwinkelglaukom (POAG), eine erbliche Augenerkrankung, die zur Erblindung führen kann",
      dna_aon: "DNA-Test auf im Erwachsenenalter einsetzende Neuropathie (AON), eine erbliche Nervenerkrankung",
      dna_fn: "DNA-Test auf familiäre Nephropathie (FN), eine erbliche Nierenerkrankung",
      patella_scheme: "Untersuchung der Kniescheiben auf Patellaluxation vor der Zucht",
      legg_perthes_scheme: "Röntgenuntersuchung der Hüften auf Legg-Calvé-Perthes-Krankheit vor der Zucht",
      kidney_scheme: "Ultraschall der Nieren auf eine fehlende oder fehlgebildete Niere (Empfehlung des Rassezuchtvereins)",
      kidney_upc_scheme: "Urintest (Protein-Kreatinin-Verhältnis) auf Nierenerkrankung (Empfehlung des Rassezuchtvereins)",
      dna_gld: "DNA-Test auf Globoidzell-Leukodystrophie (GLD), eine erbliche Nervenerkrankung",
      liver_shunt_scheme: "Leberuntersuchung auf portosystemischen Shunt oder mikrovaskuläre Dysplasie (Empfehlung des Rassezuchtvereins)",
      breed_health_scheme: "Gesundheitsprogramm des Rassezuchtvereins für die Elterntiere",
      hemivertebrae_scheme: "Röntgen der Wirbelsäule der Elterntiere auf Keilwirbel (fehlgebildete Wirbel), ab einem Alter von 12 Monaten",
      dna_hcm_mc: "DNA-Test auf hypertrophe Kardiomyopathie (MC HCM)",
      dna_sma: "DNA-Test auf spinale Muskelatrophie (SMA)",
      dna_pk_def: "DNA-Test auf Pyruvatkinase-Mangel (PK-Mangel)",
      hcm_negative: "Zuchtkatzen müssen HCM-negativ sein (Herzerkrankung: hypertrophe Kardiomyopathie)",
      dna_gsd2: "DNA-Test auf Glykogenspeicherkrankheit Typ II (GSD II, Morbus Pompe)",
      dna_gsd4: "DNA-Test auf Glykogenspeicherkrankheit Typ IV (GSD IV)",
      dna_pra_b: "DNA-Test auf progressive Retinaatrophie bei Bengalkatzen (PRA-b)",
      dna_jlpp: "DNA-Test auf juvenile Larynxparalyse und Polyneuropathie (JLPP)",
      dna_lemp2: "DNA-Test auf Leukoenzephalomyelopathie (LEMP-2)",
      dna_lemp: "DNA-Test auf Leukoenzephalomyelopathie (LEMP)",
      dna_lpn1: "DNA-Test auf Leonberger-Polyneuropathie (LPN1)",
      dna_lpn2: "DNA-Test auf Leonberger-Polyneuropathie (LPN2)",
      dna_lppn3: "DNA-Test auf Larynxparalyse und Polyneuropathie (LPPN3)",
      dna_huu: "DNA-Test auf Hyperurikosurie (HUU)",
      dna_dcm: "DNA-Test auf dilatative Kardiomyopathie (DCM), eine Herzmuskelerkrankung",
      dna_pra5: "DNA-Test auf progressive Retinaatrophie (PRA5)",
      dna_dings2: "DNA-Test auf Dancing-Dobermann-Disease (DINGS2), eine Nerven- und Muskelerkrankung",
      dna_slem: "DNA-Test auf spongiforme Leukoenzephalomyelopathie (SLEM, „Shaking-Puppy-Syndrom“), eine Erkrankung von Gehirn und Rückenmark bei jungen Welpen",
      dna_ams: "DNA-Test auf akrales Mutilationssyndrom (AMS), eine Nervenerkrankung, bei der das Schmerzempfinden in den Pfoten verloren geht",
      dna_dams: "DNA-Test auf dyserythropoetische Anämie und Myopathie (DAMS), eine Blut- und Muskelerkrankung",
      dna_fuco: "DNA-Test auf Fucosidose, eine erbliche Erkrankung des Nervensystems",
      dna_pfk: "DNA-Test auf Phosphofruktokinase-Mangel (PFK), eine erbliche Enzymstörung von Blut und Muskeln",
      dna_pra_cord1: "DNA-Test auf progressive Retinaatrophie (PRA cord1)",
      dna_bbs2_pra: "DNA-Test auf progressive Retinaatrophie (BBS2-PRA)",
      dna_cnga1_pra: "DNA-Test auf progressive Retinaatrophie (CNGA1-PRA)",
      dna_pra_rcd2: "DNA-Test auf progressive Retinaatrophie (PRA-rcd2)",
      dna_gm1: "DNA-Test auf GM1-Gangliosidose (eine erbliche Erkrankung des Nervensystems)",
      dna_gm2: "DNA-Test auf GM2-Gangliosidose (eine erbliche Erkrankung des Nervensystems)",
      dna_vwd3: "DNA-Test auf Von-Willebrand-Krankheit Typ 3 (vWD3), eine erbliche Blutgerinnungsstörung",
      dna_commd1: "Test auf Kupfertoxikose (COMMD1), eine erbliche Kupferspeicherung in der Leber",
      dna_hfh: "DNA-Test auf erbliche Ballenhyperkeratose (HFH), eine vererbte Verdickung der Pfotenballen",
      dna_pra_rcd3: "DNA-Test auf progressive Retinaatrophie (PRA-rcd3)",
      dna_clad: "DNA-Test auf Canine Leukozyten-Adhäsionsdefizienz (CLAD), eine erbliche Störung des Immunsystems",
      dna_ncl8: "DNA-Test auf neuronale Ceroid-Lipofuszinose (NCL8), eine erbliche Erkrankung des Nervensystems",
      dna_pra_rcd1: "DNA-Test auf progressive Retinaatrophie (rcd1)",
      dna_pra4: "DNA-Test auf progressive Retinaatrophie (PRA4)",
      dna_vwd2: "DNA-Test auf Von-Willebrand-Krankheit Typ 2 (vWD2), eine erbliche Blutgerinnungsstörung",
      dna_l2hga: "DNA-Test auf L-2-Hydroxyglutarazidurie (L-2-HGA), eine erbliche Stoffwechselerkrankung des Nervensystems",
      dna_pll: "DNA-Test auf primäre Linsenluxation (PLL), eine erbliche Augenerkrankung, bei der sich die Linse verschiebt",
      dna_mps3b: "DNA-Test auf Mukopolysaccharidose Typ IIIB (MPS IIIB), eine erbliche Stoffwechselerkrankung des Nervensystems",
      dna_tbox: "DNA-Test auf das T-Box-Gen, das die natürliche Stummelrute verursacht",
      dna_loa: "DNA-Test auf spät einsetzende Ataxie (LOA), eine erbliche Erkrankung, die Gleichgewicht und Koordination beeinträchtigt",
      dna_sca: "DNA-Test auf spinozerebelläre Ataxie (SCA), eine erbliche Erkrankung des Nervensystems",
      dna_chg: "DNA-Test auf angeborene Schilddrüsenunterfunktion mit Kropf (CHG), eine erbliche Schilddrüsenerkrankung, die von Geburt an besteht",
    },
  },
  health: {
    shar_pei_fever: "Familiäres Shar-Pei-Fieber kann in der Rasse vorkommen: Schübe mit hohem Fieber, schmerzhaft geschwollenen Gelenken und geschwollenem Gesicht – sofort zum Tierarzt.",
    weight_gain: "Nimmt leicht zu – Portionen und Leckerlis im Blick behalten.",
    hip_elbow_dysplasia_eye_conditions: "Kann zu Hüft- und Ellbogendysplasie sowie zu mehreren erblichen Augenerkrankungen neigen.",
    cancer_risk: "Die Quellen beschreiben bei dieser Rasse ein höheres Krebsrisiko.",
    flat_face_breathing: "Kurzköpfige (brachyzephale) Rasse: Die kurze Schnauze, enge Nasenlöcher und zusätzliches Weichgewebe in den Atemwegen können das Atmen erschweren (brachyzephales obstruktives Atemwegssyndrom, BOAS).",
    heat_stroke_risk: "Überhitzt schnell und ist anfälliger für einen Hitzschlag als die meisten Hunde, besonders bei warmem Wetter.",
    skin_fold_ear_problems: "Neigt zu Ohrentzündungen und Infektionen der Hautfalten; die Hautfalten müssen sauber und trocken gehalten werden.",
    ear_infections_long_ears: "Wegen der langen Ohren können Ohrentzündungen auftreten; im Gehörgang können sich Bakterien ansammeln.",
    collie_eye_pra: "In der Rasse kommen erbliche Augenerkrankungen vor: die Collie-Eye-Anomalie, eine Fehlbildung im hinteren Teil des Auges, und die progressive Retinaatrophie, die langsam zur Erblindung führen kann; Augenuntersuchungen und DNA-Tests sind verfügbar.",
    merle_colour_risk: "Merle ist keine Farbe des Rassestandards; bei dieser Rasse geht sie mit einem höheren Risiko für Hör- und Sehprobleme einher.",
    hind_leg_conformation: "Der Royal Kennel Club nennt die Form der Hinterläufe und die Art, wie sich der Hund bewegt, als Problempunkt dieser Rasse; ein gesunder Hund hat einen geraden Rücken und gemäßigte Hinterläufe.",
    hip_elbow_dysplasia: "Kann zu Hüft- und Ellbogendysplasie neigen; Züchtern wird geraten, Hüften und Ellbogen der Elterntiere vor der Zucht untersuchen zu lassen.",
    degenerative_myelopathy: "In der Rasse kommt die degenerative Myelopathie vor, eine Erkrankung des Rückenmarks, die die Hinterbeine langsam schwächt; ein DNA-Test ist verfügbar.",
    exercise_induced_collapse: "In der Rasse kommt der belastungsinduzierte Kollaps vor, eine erbliche neuromuskuläre Erkrankung, durch die ein Hund nach starker Anstrengung zusammenbrechen kann.",
    heart_valve_disease: "Herzerkrankungen durch eine schwächer werdende Mitralklappe sind bei dieser Rasse ein großes Problem; sie fallen oft zuerst als Herzgeräusch auf, und Zuchthunde sollten vorher kardiologisch eingestuft werden.",
    chiari_syringomyelia: "In der Rasse kommen Chiari-ähnliche Malformation und Syringomyelie vor, eine schmerzhafte Erkrankung mit flüssigkeitsgefüllten Hohlräumen im Rückenmark nahe dem Gehirn; sie hängt mit der Schädelform zusammen und wird per MRT festgestellt.",
    eye_conditions: "In der Rasse kommen erbliche Augenerkrankungen wie Katarakt (grauer Star) vor, und hervortretende oder gereizte Augen sind ein Problempunkt; Augenuntersuchungen und DNA-Tests sind verfügbar.",
    epilepsy: "In der Rasse kommt Epilepsie vor, eine Erkrankung des Gehirns, die Krampfanfälle auslösen kann.",
    storage_disease: "Eine erbliche Speicherkrankheit des Nervensystems kann junge Hunde der Rasse betreffen; mit einem DNA-Test der Elterntiere können Züchter sie vermeiden.",
    chondrodysplasia: "In der Rasse kommt Chondrodysplasie vor, eine Störung des Knorpel- und Knochenwachstums; Welpen können per Röntgen untersucht werden.",
    polyneuropathy: "In der Rasse kommt eine erbliche Nervenerkrankung (Polyneuropathie) vor; mit einem DNA-Test der Elterntiere können Züchter sie vermeiden.",
    fanconi_kidney_disease: "In der Rasse kann das Fanconi-Syndrom vorkommen, eine erbliche Nierenerkrankung, bei der Zucker in den Urin gelangt.",
    fanconi_syndrome: "In der Rasse kommt das Fanconi-Syndrom vor, eine erbliche Nierenerkrankung, bei der Zucker in den Urin gelangt; mit einem DNA-Test der Elterntiere können Züchter es vermeiden.",
    pyruvate_kinase_deficiency: "In der Rasse kann Pyruvatkinase-Mangel auftreten, ein erblicher Defekt der roten Blutkörperchen, der zu Blutarmut führt.",
    back_disc_disease: "In der Rasse kommt die Bandscheibenerkrankung vor, ein Problem mit den polsternden Scheiben zwischen den Wirbeln des Rückens.",
    pra_eye_disease: "In der Rasse kommt die progressive Retinaatrophie vor, eine erbliche Augenerkrankung, die langsam zur Erblindung führen kann; DNA-Tests und Augenuntersuchungen sind verfügbar.",
    hip_dysplasia: "In der Rasse kommt Hüftdysplasie vor, ein schlecht entwickeltes Hüftgelenk, das zu Arthrose führen kann; Züchtern wird geraten, die Hüften der Elterntiere auswerten zu lassen.",
    bloat_gdv: "In der Rasse kann eine Magendrehung (Magendilatation-Volvulus) auftreten, bei der sich der Magen verdreht – ein Notfall: Der Hund muss sofort zum Tierarzt.",
    inherited_eye_disease: "In der Rasse kommen erbliche Augenerkrankungen vor, etwa Collie-Eye-Anomalie, Katarakt (grauer Star) und progressive Retinaatrophie.",
    drug_sensitivity_mdr1: "Manche Hunde der Rasse haben eine erbliche Überempfindlichkeit gegen bestimmte Medikamente (Multi-Drug-Sensitivity, MDR1) – wenn Ihr Hund betroffen ist, sagen Sie es Ihrem Tierarzt.",
    merle_to_merle_breeding: "Merle ist bei dieser Rasse eine anerkannte Farbe; zwei Merle-Hunde sollten nicht miteinander verpaart werden, weil solchen Welpen Seh- und Hörschäden drohen – der Royal Kennel Club registriert sie nicht.",
    kneecap_luxation: "In der Rasse kommt Patellaluxation vor, bei der die Kniescheibe zeitweise aus ihrer Position springt.",
    copper_liver_disease: "In der Rasse kommt Kupfertoxikose vor, eine erbliche Anreicherung von Kupfer in der Leber, die zu chronischer Leberentzündung führen kann; Züchter können darauf testen.",
    retinal_eye_conditions: "In der Rasse kommen erbliche Augenerkrankungen wie Netzhautdysplasie vor; Augenuntersuchungen sind möglich.",
    pra_and_eyelashes: "In der Rasse kommen Augenprobleme vor: die progressive Retinaatrophie, die langsam zur Erblindung führen kann, und zusätzliche Wimpern, die am Auge reiben (Distichiasis); Züchtern wird geraten, die Augen der Elterntiere untersuchen zu lassen.",
    liver_shunt: "In der Rasse kann ein portosystemischer Shunt (Lebershunt) auftreten, bei dem das Blut an der Leber vorbeifließt.",
    skin_allergies: "Hautallergien sind bei dieser Rasse ein bekanntes Problem; der Royal Kennel Club bittet Richter, auf Anzeichen von Hautentzündungen zu achten, und Haltern wird geraten, vor der Wahl eines Shampoos den Tierarzt zu fragen.",
    westie_lung: "Eine Lungenerkrankung, die als „Westie Lung“ bekannt ist (idiopathische Lungenfibrose) und das Atmen erschwert, kann in der Rasse auftreten, meist bei älteren Hunden.",
    jaw_bone_disorder: "In der Rasse kann eine erbliche Knochenerkrankung des Kiefers auftreten.",
    dry_eye: "In der Rasse kann das Trockene Auge auftreten, bei dem die Augen zu wenig Tränen bilden und trocken und schmerzhaft werden.",
    heart_hcm: "In der Rasse kommt die hypertrophe Kardiomyopathie (HCM) vor, eine erbliche Herzerkrankung, bei der sich der Herzmuskel verdickt.",
    dental_weight_nail_care: "Eine große britische Studie nennt Zahnerkrankungen, Übergewicht und zu lange Krallen unter den häufigsten Problemen der Rasse; Haltern wird deshalb geraten, auf Zahnpflege, Gewichtskontrolle und Krallenpflege zu achten.",
    dental_weight_care: "PetMD nennt Zahnerkrankungen und Übergewicht unter den Problemen, auf die man achten sollte; Haltern wird deshalb geraten, der Katze regelmäßig die Zähne zu putzen und ihr Gewicht im Blick zu behalten.",
    gsd_iv: "In der Rasse kommt die Glykogenspeicherkrankheit Typ IV (GSD IV) vor, eine erbliche Erkrankung, die Kätzchen betrifft; mit einem DNA-Test der Elterntiere können Züchter sie vermeiden.",
    hip_dysplasia_weight: "In der Rasse kann Hüftdysplasie auftreten, ein schlecht entwickeltes Hüftgelenk; PetMD rät, die Katze zum Schutz der Gelenke auf einem gesunden Gewicht zu halten.",
    laryngeal_paralysis_polyneuropathy: "In der Rasse kommt die juvenile Larynxparalyse und Polyneuropathie (JLPP) vor, eine erbliche Nervenerkrankung, die Kehlkopf und Hinterbeine betrifft; mit einem DNA-Test der Elterntiere können Züchter sie vermeiden.",
    heart_sas: "In der Rasse kommt die Subaortenstenose vor, eine Verengung direkt unterhalb einer Herzklappe, die ein Herzgeräusch verursachen kann; bei Zuchthunden sollte vorher das Herz untersucht werden.",
    inherited_eye_defects: "In der Rasse kommen erbliche Augenerkrankungen vor, etwa Retinadysplasie und persistierende Pupillarmembran; Augenuntersuchungen sind verfügbar.",
    skin_fold_infections: "Die Hautfalten, besonders im Gesicht, können Feuchtigkeit speichern und sich entzünden (Hautfaltenpyodermie); die Gesichtsfalten müssen täglich gereinigt werden.",
    eyelid_eye_problems: "In der Rasse kommen Lidprobleme (nach innen oder außen gerollte Lider), Trockenes Auge und Kirschauge vor; Augenuntersuchungen sind verfügbar.",
    hip_elbow_joint_disease: "In der Rasse kommen Hüft- und Ellbogendysplasie vor, bei denen sich die Gelenke nicht richtig entwickeln; sie können zu Gelenkerkrankungen führen.",
    hip_dysplasia_arthritis: "In der Rasse kommt Hüftdysplasie vor, ein lockeres, schlecht entwickeltes Hüftgelenk, das schließlich zu Arthrose führen kann.",
    bleeding_disorder_vwd: "In der Rasse kommt die Von-Willebrand-Krankheit vor, eine erbliche Störung der Blutgerinnung, die zu starken Blutungen führen kann.",
    heart_muscle_disease: "In der Rasse kann eine Kardiomyopathie auftreten, ein vergrößertes Herz durch einen geschwächten Herzmuskel.",
    itchy_skin_allergy: "In der Rasse können Hautallergien (Atopie) auftreten, die Juckreiz und wunde Haut verursachen.",
    entropion_cherry_eye: "In der Rasse können nach innen gerollte Lider (Entropium) und Kirschauge auftreten, bei dem das dritte Augenlid hervortritt; ein Kirschauge lässt sich operativ korrigieren.",
    dental_disease_tooth_brushing: "Eine große britische Studie nennt Zahnerkrankungen als mit Abstand häufigstes Problem der Rasse, und Milchzähne, die nicht ausfallen, sind ebenfalls häufig; Haltern wird deshalb empfohlen, die Zähne des Hundes jeden Tag zu pflegen, zum Beispiel durch Zähneputzen.",
    windpipe_collapse: "In der Rasse kann ein Trachealkollaps auftreten, bei dem die Luftröhre ihre Festigkeit verliert; er kann Schwäche und einen Zusammenbruch verursachen.",
    eye_problems_pra_lens_dry_eye: "In der Rasse kommen Augenprobleme vor, etwa die progressive Retinaatrophie, die langsam zur Erblindung führen kann, eine verschobene Linse (Linsenluxation) und das Trockene Auge.",
    cataracts_lens_luxation: "In der Rasse können Augenprobleme auftreten, etwa Katarakt (grauer Star), der die Linse trübt, und eine verschobene Linse (Linsenluxation).",
    wobbler_syndrome: "In der Rasse kann das Wobbler-Syndrom auftreten, bei dem instabile Halswirbel auf das Rückenmark drücken und die Hinterbeine schwächen.",
    eye_phpv: "In der Rasse kann ein angeborener Augendefekt auftreten (persistierender hyperplastischer primärer Glaskörper, PHPV); Züchtern wird geraten, die Augen der Elterntiere untersuchen zu lassen.",
    certain_cancers: "In der Rasse können bestimmte Krebsarten auftreten.",
    bare_skin_sun_cold: "Die nackte Haut der haarlosen Variante braucht Schutz vor Sonne und Kälte.",
    l2hga_nervous_system: "In der Rasse kann L-2-Hydroxyglutarazidurie (L-2-HGA) auftreten, eine erbliche Stoffwechselstörung, die das Nervensystem betrifft; ein DNA-Test der Elterntiere ist verfügbar.",
    short_face_breathing: "Eine Rasse mit mäßig kurzem Gesicht: Manche Hunde mit kürzerem Gesicht können ernste Atemprobleme haben (brachyzephales obstruktives Atemwegssyndrom, BOAS).",
    corneal_ulcers: "Wegen der Schädelform und der hervortretenden Augen sind Augenprobleme wie Hornhautgeschwüre wahrscheinlicher; Augenuntersuchungen sind verfügbar.",
    skin_folds_allergies: "Es können Hautprobleme auftreten, etwa Allergien, Warzen, Hautanhängsel und wunde Hautfalten im Gesicht (Hautfaltendermatitis); die Gesichtsfalten sollten sauber und trocken gehalten werden.",
    heart_cardiomyopathy_aortic_stenosis: "In der Rasse können Herzprobleme wie Kardiomyopathie und Aortenstenose auftreten.",
    dental_disease_care: "Eine große britische Studie nennt Zahnerkrankungen als häufigstes Problem der Rasse, und Haltern wird geraten, der Zahnpflege Vorrang zu geben.",
    bladder_stones: "In der Rasse können Blasensteine auftreten, Mineralablagerungen, die sich in der Blase und im Urin bilden.",
    footpad_hyperkeratosis: "In der Rasse kann die erbliche Ballenhyperkeratose (HFH) auftreten, eine vererbte Verdickung der Pfotenballen, die einreißen kann.",
    deafness: "In der Rasse kommt Taubheit auf einem oder beiden Ohren vor; das Gehör von Welpen kann mit einem BAER-Test geprüft werden.",
    mitral_valve_disease: "In der Rasse kommt die Mitralklappenerkrankung vor, eine Herzerkrankung, bei der eine geschwächte Klappe Blut ins Herz zurückfließen lässt; ein Tierarzt kann das Herz von Zuchthunden vor der Verpaarung abhören.",
    eye_problems_pra_cataracts_dry_eye: "In der Rasse kommen Augenprobleme vor, etwa die progressive Retinaatrophie, die langsam zur Erblindung führen kann, Katarakt (grauer Star) und das Trockene Auge; Augenuntersuchungen sind verfügbar.",
    skin_comedo_allergy: "Es können Hautprobleme auftreten, etwa das Schnauzer-Komedonen-Syndrom (eine Form entzündeter Haarfollikel) und Hautallergien (Atopie), die Juckreiz verursachen.",
    shorter_face_boas: "Eine brachyzephale (kurzköpfige) Rasse: Das kürzere Gesicht kann ernste Atemprobleme verursachen (brachyzephales obstruktives Atemwegssyndrom, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "In der Rasse kommen Augenprobleme vor, etwa das Trockene Auge, Katarakt (grauer Star), die progressive Retinaatrophie, die langsam zur Erblindung führen kann, und Netzhautablösung.",
    hypothyroidism: "In der Rasse kann eine Schilddrüsenunterfunktion (Hypothyreose) auftreten, die Gewicht, Haut und Energie beeinflussen kann.",
    open_fontanelle: "In der Rasse kann eine offene Fontanelle auftreten, eine weiche Stelle am Schädel, die sich nicht vollständig schließt.",
    collapsing_trachea: "In der Rasse kann ein Trachealkollaps auftreten, eine Schwäche der Luftröhre, die Husten und Atemnot verursachen kann.",
    gm1_gangliosidosis: "In der Rasse kann GM1-Gangliosidose auftreten, eine erbliche Erkrankung des Nervensystems; ein DNA-Test der Elterntiere kann sie ausschließen.",
    gm2_gangliosidosis: "In der Rasse wurde GM2-Gangliosidose festgestellt, eine tödliche erbliche Erkrankung des Nervensystems.",
    addisons_disease: "In der Rasse kann Morbus Addison auftreten, ein Mangel an Hormonen der Nebennieren.",
    protein_losing_disease: "In der Rasse können Erkrankungen mit Eiweißverlust über die Nieren oder den Darm auftreten, die Durchfall und Gewichtsverlust verursachen können.",
    diabetes_mellitus: "In der Rasse kann Diabetes mellitus auftreten, bei dem der Körper seinen Blutzucker nicht richtig regulieren kann.",
    dental_disease_home_brushing: "Wie viele kleine Hunde neigt die Rasse zu Zahnerkrankungen; empfohlen wird daher, die Zähne zu Hause mit Hundezahnbürste und Hundezahnpasta zu putzen.",
    dermoid_sinus: "In der Rasse kann ein Dermoidsinus auftreten, eine schmerzhafte Erkrankung, bei der ein Gang in der Rückenhaut mit dem Rückenmark verbunden ist; Rassezuchtvereine haben ein Untersuchungsprogramm für Welpen.",
    cataracts: "In der Rasse kann Katarakt (grauer Star) auftreten, der die Augenlinse trübt und zu Sehverlust führen kann.",
    pra_inherited_blindness: "In der Rasse kann die progressive Retinaatrophie auftreten, eine erbliche Augenerkrankung, die langsam zur Erblindung führen kann.",
    eyelids_turned: "In der Rasse können nach innen (Entropium) oder nach außen (Ektropium) gerollte Lider auftreten; fragen Sie nach augenuntersuchten Elterntieren.",
    glaucoma_poag: "In der Rasse kann das primäre Offenwinkelglaukom auftreten, bei dem sich Flüssigkeit im Auge staut und Schmerzen und möglicherweise Erblindung verursacht; es gibt einen DNA-Test für die Elterntiere.",
    skin_fold_dermatitis: "Die lose Haut bildet Falten, die wund werden und sich entzünden können; sie müssen jeden Tag kontrolliert und sauber und trocken gehalten werden.",
    skin_fold_care: "Die Hautfalten im Gesicht können wund werden und sich entzünden (Hautfaltendermatitis); sie müssen regelmäßig gereinigt und getrocknet werden.",
    eyelid_problems: "In der Rasse können Lidprobleme auftreten: nach innen (Entropium) oder nach außen (Ektropium) gerollte Lider und Kirschauge, bei dem das dritte Augenlid hervortritt.",
    skin_allergy_face_folds: "In der Rasse können Hautallergien (Atopie) mit Juckreiz auftreten, und die Hautfalten im Gesicht müssen jeden Tag gereinigt werden.",
    skin_ear_allergies: "In der Rasse können Umweltallergien auftreten, die zu wiederholten Haut- oder Ohrinfektionen führen können; PetMD empfiehlt bei einem Hund mit Allergien, die Ohren wöchentlich zu reinigen.",
    gum_disease_daily_brushing: "Die Rasse neigt zu Zahnfleischerkrankungen (Gingivitis und Parodontitis); PetMD rät deshalb, die Zähne des Hundes jeden Tag zu putzen und sie einmal im Jahr beim Tierarzt kontrollieren zu lassen.",
    pra_pk_def: "In der Rasse kommen zwei erbliche Erkrankungen vor: die progressive Retinaatrophie, eine Augenerkrankung, die zur Erblindung führen kann, und der Pyruvatkinase-Mangel, eine Bluterkrankung; mit DNA-Tests der Elterntiere können Züchter sie vermeiden.",
    windpipe_collapse_breathing: "In der Rasse kann ein Trachealkollaps auftreten, bei dem die Knorpelringe der Luftröhre zusammenfallen und das Atmen erschweren.",
    eye_problems_pra_cataracts_entropion: "In der Rasse kommen Augenprobleme vor, etwa die progressive Retinaatrophie, die langsam zur Erblindung führen kann, Katarakt (grauer Star), der die Linse trübt, und nach innen gerollte Lider (Entropium); Augenuntersuchungen sind verfügbar.",
    elbow_dysplasia_arthritis: "In der Rasse kann Ellbogendysplasie auftreten, ein schlecht entwickeltes Ellbogengelenk, das schließlich zu Arthrose führen kann.",
    entropion: "In der Rasse kann ein Entropium auftreten, bei dem sich die Lider nach innen rollen und das Auge reizen; fragen Sie nach augenuntersuchten Elterntieren.",
    autoimmune_conditions: "In der Rasse können Autoimmunerkrankungen auftreten, bei denen der Körper gegen sich selbst reagiert.",
    ear_infections_prone: "Die Rasse neigt zu Ohrentzündungen; achten Sie genau auf die Ohrenhygiene.",
    familial_nephropathy: "In der Rasse kommt eine erbliche Nierenerkrankung (familiäre Nephropathie) vor; ein DNA-Test der Elterntiere ist verfügbar.",
    hereditary_nephritis: "In der Rasse kommt eine erbliche Nierenerkrankung vor (hereditäre Nephritis, auch hereditäre Glomerulopathie des Samojeden genannt).",
    hereditary_nephritis_pkd: "In der Rasse kommen erbliche Nierenerkrankungen vor (hereditäre Nephritis und polyzystische Nierenerkrankung).",
    mucopolysaccharidosis_mps3b: "In der Rasse kommt Mukopolysaccharidose Typ IIIB vor, eine erbliche Stoffwechselerkrankung, die das Nervensystem betrifft; ein DNA-Test der Elterntiere ist verfügbar.",
    panosteitis: "In der Rasse kann Panostitis auftreten, eine schmerzhafte Entzündung der langen Röhrenknochen, die meist junge, wachsende Hunde betrifft.",
    splenic_torsion: "Eine Milzdrehung, die sofortige tierärztliche Hilfe braucht, kommt in dieser Rasse häufiger vor als bei anderen großen Rassen.",
    urinary_incontinence: "In der Rasse kann Harninkontinenz auftreten, ein unkontrolliertes Austreten von Urin.",
    osteochondritis: "In der Rasse kann Osteochondrosis dissecans (OCD) auftreten, eine Störung des Gelenkknorpels bei wachsenden Hunden.",
    scottie_cramp: "In der Rasse kommt der Scottie Cramp vor – kurze Episoden von Muskelkrämpfen, meist durch Aufregung ausgelöst; er ist nicht schmerzhaft.",
    slem_shaking_puppy: "In der Rasse kann die spongiforme Leukoenzephalomyelopathie (SLEM), auch Shaking-Puppy-Syndrom genannt, auftreten; ein DNA-Test hilft Züchtern, sie zu vermeiden.",
    cecs_cramping: "In der Rasse kommt das Canine Epileptoid Cramping Syndrome (CECS) vor – Episoden von Zittern und Muskelkrämpfen.",
    gallbladder_mucocele: "Eine Gallenblasen-Mukozele, bei der sich die Gallenblase mit zähem Schleim füllt und sich nicht richtig entleeren kann, kann in der Rasse auftreten; sie muss manchmal operiert werden.",
    periodontal_disease: "Parodontitis, eine Infektion und Entzündung des Zahnfleischs und des Gewebes, das die Zähne hält, ist ein bekanntes Problem der Rasse.",
    extra_eyelashes: "In der Rasse kann Distichiasis auftreten, bei der kleine zusätzliche Wimpern an der Innenseite oder am Rand des Lids wachsen und am Auge reiben können; fragen Sie nach Elterntieren, die im Augenprogramm untersucht wurden.",
    cm_sm_screening: "In der Rasse können Chiari-ähnliche Malformation und Syringomyelie auftreten, eine schmerzhafte Erkrankung mit flüssigkeitsgefüllten Hohlräumen im Rückenmark nahe dem Gehirn; Züchtern wird geraten, die Elterntiere untersuchen zu lassen (UK: BVA/KC-Programm).",
    prominent_eyes_injury_dry_eye: "Hervortretende Augen werden leichter verletzt und können Geschwüre und Trockenheit entwickeln; auch Trockenes Auge und Kirschauge kommen in der Rasse vor.",
    legg_perthes: "In der Rasse kann die Legg-Perthes-Krankheit auftreten, eine schmerzhafte Erkrankung, bei der der Hüftkopf abstirbt und zerfällt.",
    glaucoma: "In der Rasse kann ein Glaukom (grüner Star) auftreten, ein erhöhter Druck im Auge, der schmerzhaft sein und zur Erblindung führen kann.",
    lethal_acrodermatitis: "In der Rasse kommt die letale Akrodermatitis vor, eine erbliche Erkrankung, die bei Welpen schwere Haut- und Wachstumsprobleme verursacht.",
    kidney_disease_urine_screening: "In der Rasse kommen Nierenprobleme vor; mit Urintests lassen sich die Elterntiere vor der Zucht untersuchen.",
    primary_lens_luxation: "In der Rasse kommt die primäre Linsenluxation vor, eine schmerzhafte erbliche Augenerkrankung, bei der sich die Linse verschiebt und die zur Erblindung führen kann; für Zuchthunde ist ein DNA-Test verfügbar.",
    inherited_ataxia: "In der Rasse kommen erbliche Ataxien vor (spät einsetzende Ataxie und spinozerebelläre Ataxie), die zum Verlust von Gleichgewicht und Koordination führen; für Zuchthunde sind DNA-Tests verfügbar.",
    hydrocephalus: "In der Rasse kann ein Hydrozephalus auftreten, eine Ansammlung von Flüssigkeit um das Gehirn.",
    heart_disease_pda: "In der Rasse können Herzerkrankungen auftreten, darunter der persistierende Ductus arteriosus, ein Blutgefäß nahe dem Herzen, das sich nach der Geburt nicht schließt; ein Tierarzt kann ihn bei der ersten Untersuchung des Welpen abhören.",
    chiari_malformation: "In der Rasse kann eine Chiari-ähnliche Malformation mit Syringomyelie auftreten, eine schmerzhafte Erkrankung mit flüssigkeitsgefüllten Hohlräumen im Rückenmark nahe dem Gehirn.",
    cataracts_entropion: "In der Rasse können Katarakt (grauer Star), der die Augenlinse trübt, und nach innen gerollte Lider (Entropium) auftreten; fragen Sie nach Elterntieren, die im Augenprogramm untersucht wurden.",
    periodontal_daily_brushing: "Die Rasse neigt zu Zahnfleischerkrankungen (Parodontitis); empfohlen wird daher, die Zähne jeden Tag mit einer Hundezahnpasta zu putzen.",
    eye_problems_shallow_sockets: "In der Rasse kommen Augenprobleme vor, etwa Trockenes Auge, Augeninfektionen und Geschwüre auf der Augenoberfläche; die flachen Augenhöhlen machen außerdem Augenverletzungen wahrscheinlicher.",
    eye_problems_dry_eye_entropion_lens_luxation: "In der Rasse kommen Augenprobleme vor, etwa Trockenes Auge, nach innen gerollte Lider (Entropium) und eine verschobene Linse (Linsenluxation); Augenuntersuchungen sind verfügbar.",
    heart_valve_screening: "In der Rasse können Herzerkrankungen auftreten; mit Herzultraschall lassen sich die Elterntiere vor der Zucht auf Herzklappenprobleme untersuchen.",
    dental_weight_problems: "Eine große britische Studie nennt Zahnerkrankungen und Übergewicht als besonders häufige Probleme der Rasse – Probleme, denen Halter vorbeugen können; auch eng stehende Zähne und Milchzähne, die nicht ausfallen, kommen vor.",
  },
  page: {
    eyebrow: "Tierregister",
    // Search terms people use ("Ragdoll Katze", "Wesen"); "Wesen" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "Wesen, " : ""}Bewegung, Größe & Pflege | PetPrep`
        : species === "cat"
          ? `${/katze/i.test(name) ? name : `${name} (Katze)`}: ${hasIntro ? "Wesen, " : ""}Fellpflege, Größe & Lebenserwartung | PetPrep`
          : `${name} (${one}): Bedürfnisse, Lebenserwartung & Pflege | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Quellen, Gesundheit und Tipps zum Kauf.`,
    metaLabels: { weight: "Gewicht", exercise: "Bewegung", lifespan: "Lebenserwartung" },
    metaDescription: (name, one) =>
      `${name} (${one}): belegte Bedürfnisse dieser Rasse – Bewegung, Fellpflege, Mahlzeiten, Größe, Lebenserwartung, zu wem sie passt – und wie PetPrep sie simuliert.`,
    suitabilityTitle: "Zu wem sie passt",
    suitabilityNote: "Dieselben Merkmale wie in der App. Jedes Merkmal ist durch die Quellen unten auf der Seite belegt.",
    suitabilityNone: "Für diese Rasse gibt es noch keine durch Quellen belegten Merkmale zur Eignung.",
    needsTitle: "Was sie braucht",
    needsIntro: (species) =>
      species === "cat"
        ? "Nach Katzenzuchtverbänden, tiermedizinischen Organisationen und Studien. Wo Quellen voneinander abweichen, wird jede gezeigt."
        : "Nach Rassestandards, Zuchtverbänden, tiermedizinischen Hilfsorganisationen und Studien. Wo Quellen voneinander abweichen, wird jede gezeigt.",
    general: (many) => `Allgemeine Empfehlungen für ${many} (nicht rassespezifisch):`,
    noData: "In unseren Quellen noch nicht enthalten.",
    simTitle: "So simuliert PetPrep die Rasse",
    simBadge: "Spielregeln, keine tierärztliche Beratung",
    simIntro:
      "In PetPrep entspricht eine echte Woche einem Monat im Leben des Haustiers. Dies sind die Regeln, die das Spiel für diese Rasse verwendet. PetPrep hat sie anhand der Quellen auf dieser Seite festgelegt; sie sind keine Pflegeanleitung für ein echtes Haustier.",
    simInfoOnly: "Diese Rasse ist nur zur Information im Register; die App simuliert sie noch nicht.",
    simTable: { stage: "Lebensphase", starts: "Beginnt", meals: "Mahlzeiten pro Tag", activity: { steps: "Tägliches Schrittziel", play_sessions: "Spiel pro Tag" } },
    arrives: (m) => `zieht mit ${m} ${s(m, "Monat", "Monaten")} ein`,
    fromMonth: (m, years) => (years ? `${m}. Monat (${years})` : `${m}. Monat`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `ab dem ${x.from}. Monat: ${x.meals}`)).join("; "),
    simDecisions: "Jede Zahl im Spiel ist eine dokumentierte Entscheidung von PetPrep mit ihren Quellen.",
    healthTitle: "Gesundheit",
    healthNote: "Nur zur Information, nicht tierärztlich geprüft. Fragen Sie Ihren Tierarzt nach Ihrem eigenen Haustier.",
    healthNone: "Unsere Quellen enthalten für diese Rasse noch keine rassespezifischen Gesundheitsangaben.",
    checklistTitle: "Vor dem Kauf: was Sie beim Züchter prüfen sollten",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Fragen, die Sie klären sollten, bevor Sie ein Kätzchen nach Hause holen. Die Punkte sind Ratschläge von Tierärzten, Tierschutzorganisationen und Katzenzuchtverbänden; jeder nennt seine Quelle." : "Fragen, die Sie klären sollten, bevor Sie einen Welpen nach Hause holen. Die Punkte sind Ratschläge von Tierärzten, Tierschutzorganisationen und Zuchtverbänden; jeder nennt seine Quelle.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Gesetze zu Mindestalter, Mikrochip und Impfungen unterscheiden sich von Land zu Land – prüfen Sie die Regeln an Ihrem Wohnort.",
    checklistGeneralTitle: "Für jede Rasse",
    checklistTestsTitle: "Gesundheitsuntersuchungen der Elterntiere für diese Rasse",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Untersuchungen, die ein Katzenzuchtverband vor der Zucht verlangt" : "Untersuchungen, die der Royal Kennel Club als Minimum empfiehlt",
      best_practice: "Weitere Untersuchungen nach bewährter Praxis",
      other_scheme: "Weitere Untersuchungsprogramme für diese Rasse",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Diese Liste stammt aus den Zuchtregeln eines ausländischen Katzenzuchtverbands (siehe Quelle) und dient der Orientierung. Fragen Sie den Züchter, welche Untersuchungen die Elterntiere hatten."
        : "Diese Listen stammen vom britischen Royal Kennel Club und dienen der Orientierung; nationale Zuchtverbände können eigene, strengere Regeln festlegen. Fragen Sie den Rassezuchtverein und den Züchter, welche Untersuchungen die Elterntiere hatten.",
    checklistStatus: {
      none_recommended: "Der Royal Kennel Club nennt für diese Rasse derzeit keine empfohlenen Gesundheitsuntersuchungen vor der Zucht. Fragen Sie den Züchter trotzdem nach der Gesundheit der Elterntiere.",
      not_found: "Wir haben noch keine verlässliche Quelle gefunden, die Gesundheitsuntersuchungen der Elterntiere für diese Rasse nennt. Fragen Sie den Rassezuchtverein und den Züchter, welche Untersuchungen die Elterntiere hatten.",
      not_checked: "Die Gesundheitsuntersuchungen der Elterntiere für diese Rasse haben wir noch nicht geprüft. Fragen Sie den Rassezuchtverein und den Züchter, welche Untersuchungen die Elterntiere hatten.",
    },
    sourcesTitle: "Quellen",
    sourcesIntro: "Jeder Fakt auf dieser Seite nennt eine dieser Quellen.",
    sourcesAll: "Alle Quellen anzeigen",
    sourcesFewer: "Weniger anzeigen",
    sourceLabel: (id, publisher) => `Quelle ${id}: ${publisher}`,
    disclaimer: "PetPrep ist eine Simulation für Familien. Diese Seite ist keine tierärztliche Beratung – fragen Sie bei einem echten Haustier einen Tierarzt oder den Rassezuchtverein.",
    backTo: (many) => `Alle ${many}`,
    compareWith: "Mit anderen Rassen vergleichen",
    related: { title: "Ähnliche Rassen", intro: (many) => `Weitere ${many} im Register mit ähnlichen Bedürfnissen – jeweils mit belegten Fakten.` },
    updated: "Aktualisiert",
    glanceTitle: "Auf einen Blick",
    glanceNote: "Die wichtigsten Fakten aus den Quellen unten auf der Seite. Wo Quellen voneinander abweichen, wird jeder Wert aufgeführt.",
    portraitAlt: { ai_photo: (name) => `${name} – Foto (KI)`, ai_illustration: (name) => `${name} – Illustration (KI)` },
    portraitCaption: { ai_photo: "KI-generiertes Foto", ai_illustration: "KI-generierte Illustration" },
    portraitColours: {
      legend: "Fellfarbe",
      alt: { ai_photo: (name, colour) => `${name}, ${colour} – Foto (KI)`, ai_illustration: (name, colour) => `${name}, ${colour} – Illustration (KI)` },
    },
    share: {
      button: "Teilen",
      title: "Diese Rasse teilen",
      copy: "Kopieren",
      copied: "Kopiert",
      linkLabel: "Link zu dieser Seite",
      more: "Weitere Optionen",
      text: (name) => `${name}: Bedürfnisse, Quellen und wie PetPrep die Rasse simuliert`,
      emailSubject: (name) => `${name} – PetPrep-Tierregister`,
      on: (network) => `Auf ${network} teilen`,
    },
    og: { lead: "Bedürfnisse, Quellen und wie PetPrep die Rasse simuliert", photoLabel: "KI-Foto" },
    qa: {
      title: "Fragen und Antworten",
      intro: "Beantwortet nur aus den belegten Fakten auf dieser Seite; jede Antwort nennt ihre Quellen.",
      // "Rasse" constructions keep breed names uninflected (der/die/das differs per name).
      questions: {
        exercise: (n) => `${n}: Wie viel Bewegung braucht diese Rasse?`,
        lifespan: (n) => `${n}: Wie alt wird diese Rasse?`,
        size: (n) => `${n}: Wie groß und wie schwer wird diese Rasse?`,
        grooming: (n) => `${n}: Wie viel Fellpflege braucht diese Rasse?`,
        suits: (n) => `${n}: Zu wem passt diese Rasse?`,
      },
      leads: {
        exercise: (n) => `Bewegungsbedarf der Rasse ${n} laut unseren Quellen:`,
        lifespan: (n) => `Lebenserwartung der Rasse ${n} laut unseren Quellen:`,
        size: (n) => `Größe und Gewicht (erwachsen) der Rasse ${n} laut unseren Quellen:`,
        grooming: (n) => `Fell und Fellpflege der Rasse ${n} laut unseren Quellen:`,
        suits: (n) => `Laut unseren Quellen ist die Rasse ${n} gut geeignet für:`,
      },
      considerLead: "Bitte bedenken Sie:",
      differ: "Die Quellen nennen unterschiedliche Werte, deshalb wird jeder aufgeführt.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolischer Hirtenhund, Anatolian Shepherd Dog, Karabash",
      text: [
        "Der Anatolische Hirtenhund ist ein großer, kräftig gebauter Herdenschutzhund aus der Türkei; die FCI beschreibt den türkischen Hirtenhund als Kangal (Kangal Shepherd Dog) — einfarbig von Falbfarben bis Wolfsgrau mit schwarzer Maske, 72–78 cm groß bei Rüden und 65–73 cm bei Hündinnen. Der amerikanische Rassestandard nennt 110–150 Pfund (etwa 50–68 kg) für Rüden und 80–120 Pfund (etwa 36–54 kg) für Hündinnen. Ein Hund dieser Größe ist mit etwa 18–24 Monaten ausgewachsen (PetMD); der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, WebMD durchschnittlich 11 bis 13 Jahre.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und mehr als einmal pro Woche Fellpflege, gibt an, dass er haart und zu einem großen Haus mit großem Garten auf dem Land passt, und führt ihn in Breed-Watch-Kategorie 1. PetMD schreibt, dass Anatolische Hirtenhunde wohl am besten in Haushalte ohne kleinere Kinder passen, dass Welpen, die früh andere Tiere kennenlernen, meist gut mit ihnen auskommen, dass frühe Sozialisierung entscheidend ist, dass das Fell außerhalb des zweimal jährlichen Fellwechsels wöchentlich gebürstet werden sollte und dass Bewegung rund um die Mahlzeiten vermieden werden sollte.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Irischer Setter, Irischer Roter Setter, Irish Setter",
      text: [
        "Der Irish Red Setter (Irischer Setter) ist ein eleganter, athletischer Vorstehhund aus Irland, gezüchtet für die weiträumige Suche. Der FCI-Standard beschreibt nur eine Farbe — sattes Kastanienrot ohne jede Spur von Schwarz — und eine Widerristhöhe von 58–67 cm für Rüden und 55–62 cm für Hündinnen; der amerikanische Rassestandard nennt etwa 70 Pfund (rund 32 kg) als ideal für Rüden und 60 Pfund (rund 27 kg) für Hündinnen. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und mehr als einmal pro Woche Fellpflege, gibt an, dass er haart und ein großes Haus mit großem Garten braucht, und führt ihn in Breed-Watch-Kategorie 1. Die PDSA beschreibt sehr freundliche, anhängliche Hunde, die gut mit Kindern und anderen Haustieren auskommen, und rät zu Fellpflege 2- bis 3-mal pro Woche; PetMD empfiehlt, die Ohren wöchentlich zu kontrollieren und zu reinigen, und schreibt, dass Irish Setter viel menschliche Gesellschaft brauchen.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Brüsseler Griffon, Brussels Griffon",
      text: [
        "Der Griffon Bruxellois (Brüsseler Griffon) ist ein kleiner Begleithund aus Belgien mit kurzem, flachem Gesicht. Der FCI-Standard beschreibt ein rotes, von Natur aus hartes, leicht gewelltes Haar und ein Gewicht von 3,5–6 kg; der britische Royal Kennel Club, der eine rauhaarige und eine glatthaarige Variante führt, nennt ihn einen klugen kleinen Hund mit terrierähnlichem Wesen. Ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an (PetMD: 12–15 Jahre).",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung am Tag und mehr als einmal pro Woche Fellpflege, gibt an, dass er haart und sich für eine Wohnung eignet, und führt ihn in Breed-Watch-Kategorie 2. PetMD beschreibt einen kurzköpfigen (brachyzephalen) Hund, der heißes, feuchtes Wetter schlecht verträgt, rät, die Gesichtsfalten etwa einmal pro Woche zu reinigen und täglich die Zähne zu putzen, und schreibt, dass Brüsseler Griffons unter Aufsicht gut mit Kindern und anderen Haustieren zurechtkommen, aber nicht gern lange allein bleiben.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, Amerikanischer Rat Terrier",
      text: [
        "Der Rat Terrier ist ein kleiner amerikanischer Terrier, der in zwei Größen gezüchtet wird – Miniatur und Standard – mit kurzem, eng anliegendem, glattem und glänzendem Fell. Der Rassestandard erlaubt eine Widerristhöhe von bis zu 18 Zoll (46 cm), und PetMD nennt für beide Größen ein Gewicht von 10–25 Pfund (etwa 4,5–11 kg); ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD). VCA gibt eine Lebenserwartung von 12–16 Jahren an, PetMD 12–18 Jahre.",
        "Der Rat Terrier Club of America sagt, Rat Terrier seien gut mit Kindern, besonders wenn sie mit ihnen aufwachsen, und kämen in einer Wohnung zurecht, bräuchten aber mindestens 30 Minuten Bewegung am Tag. PetMD schreibt, sie bräuchten viel körperliche und geistige Auslastung, seien nicht gern lange allein und haarten das ganze Jahr leicht; VCA empfiehlt, einmal pro Woche zu bürsten, und warnt, dass sie sich mit kleinen Haustieren, besonders Nagetieren, womöglich nicht vertragen.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    shar_pei: {
      aka: "Chinesischer Shar-Pei, Chinese Shar-Pei, Sharpei",
      text: [
        "Der Shar Pei (in den USA „Chinese Shar-Pei“) ist ein aktiver, kompakter, quadratisch gebauter mittelgroßer Hund aus China mit kurzem, hartem, borstigem Fell in einer einzigen Farbe (jede außer Weiß), Falten an Kopf und Widerrist und breitem Fang. Der Standard des Royal Kennel Club gibt eine Widerristhöhe von 46–51 cm an, die PDSA ein Gewicht von 20–27 kg; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD). Royal Kennel Club und PDSA geben eine Lebenserwartung von über 10 Jahren an, eine VetCompass-Studie an Hunden in Großbritannien fand jedoch einen Median von 7,3 Jahren.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Bürsten einmal pro Woche und führt die Rasse wegen Problemen mit Augenlidern und Hautfalten in Kategorie 2 von Breed Watch. Die PDSA beschreibt Shar Peis als treue, ergebene Familienhunde, die am besten zu erfahrenen Haltern und älteren Kindern passen, warnt vor einem hohen Jagdtrieb gegenüber kleineren Tieren und rät, die Hautfalten sauber und trocken zu halten und zwischen Fressen und Bewegung eine Pause einzulegen.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "Der Border Collie ist ein mittelgroßer Hütehund aus Großbritannien, gebaut für Ausdauer und harte Arbeit. Sein Rassestandard beschreibt einen eifrigen, aufmerksamen, reaktionsschnellen und intelligenten Hund, der weder nervös noch aggressiv ist.",
        "Zuchtverbände und Tierärzte sind sich vor allem in einem einig: Diese Rasse hat sehr viel Energie. Sie braucht jeden Tag mehr als zwei Stunden Bewegung und viel geistige Beschäftigung. Langweilt sich der Hund oder bewegt er sich zu wenig, sucht er sich eigene Aufgaben – er kaut auf allem herum, was er erreicht, oder versucht, spielende Kinder zu hüten.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador",
      text: [
        "Der Labrador Retriever ist ein großer, kräftig gebauter Jagdhund aus Großbritannien, gezüchtet zum Apportieren. Sein Standard beschreibt einen gutmütigen, freundlichen und anpassungsfähigen Begleiter, der gefallen will und Wasser liebt. Das Fell ist kurz und dicht, in Schwarz, Gelb oder Leberbraun/Schokolade.",
        "Britische Tierschutzorganisationen beschreiben den Labrador als Familienhund, der sich bei guter Sozialisierung an den ganzen Haushalt bindet. Er ist sehr aktiv und stark futtermotiviert: Leckerlis helfen bei der Erziehung, doch Labradore neigen auch zu Übergewicht.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden",
      text: [
        "Der Golden Retriever ist ein großer Jagdhund aus Großbritannien mit glattem oder welligem Fell in Gold- oder Cremetönen. Sein Standard beschreibt einen führigen, intelligenten Hund, der freundlich, umgänglich und selbstsicher ist.",
        "Britische Tierschutzorganisationen nennen ihn einen großartigen Familienhund für eine aktive Familie, der auch ein guter erster Hund sein kann. Die Kehrseite ist in den Quellen klar: mindestens zwei Stunden Bewegung pro Tag, Bürsten mehrmals pro Woche und ein Fell, das stark haart.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "French Bulldog, Frenchie",
      text: [
        "Die Französische Bulldogge ist ein kleiner, stämmiger Begleithund aus Frankreich mit kurzem, glattem Fell und aufrechten „Fledermausohren“. Ihr Standard beschreibt einen geselligen, lebhaften und verspielten Hund; britische Tierschutzorganisationen nennen sie gelassen und anpassungsfähig und sagen, dass sie meist gut mit Kindern auskommt – das hat sie zu einem beliebten Familienhund gemacht.",
        "Sie braucht bis zu einer Stunde Bewegung pro Tag und passt in eine Wohnung. Die Kehrseite, die jede Quelle nennt, ist das flache Gesicht: Es kann das Atmen erschweren, und Französische Bulldoggen überhitzen schnell, besonders bei warmem Wetter – Schatten, Wasser und ruhige Spaziergänge sind deshalb wichtig. Die PDSA legt Familien nahe, auch die Aufnahme einer erwachsenen Französischen Bulldogge in Betracht zu ziehen.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Schäferhund, German Shepherd, Alsatian",
      text: [
        "Der Deutsche Schäferhund ist ein großer, kräftiger Hütehund aus Deutschland mit Stehohren und dichtem doppeltem Fell, kurz oder lang. Sein Standard beschreibt einen ausgeglichenen, selbstsicheren Hund mit festen Nerven, und der Royal Kennel Club nennt ihn einen vielseitigen Arbeits- und Diensthund, der für Mut und Intelligenz bekannt ist.",
        "Er braucht mindestens zwei Stunden Bewegung pro Tag, passt in ein großes Haus mit Garten und haart stark. Britische Tierschutzorganisationen sagen, dass manche tolle Familienhunde sein können, aber in der Nähe kleiner Kinder immer beaufsichtigt werden sollten. Der Royal Kennel Club bittet Züchter, Hüften und Ellbogen der Elterntiere untersuchen zu lassen, und nennt die Form der Hinterläufe als Problempunkt der Rasse.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "Der Cavalier King Charles Spaniel ist ein Zwergspaniel aus Großbritannien mit langen, befederten Ohren und langem, seidigem Fell in vier Farben: Blenheim, Ruby, Black and Tan und Tricolour. Sein Standard beschreibt einen aktiven, anmutigen Hund mit sanftem Ausdruck – sportlich, anhänglich, freundlich und furchtlos.",
        "Er braucht etwa eine Stunde Bewegung pro Tag, kann in einer Wohnung leben und gilt als kinderfreundlich, wobei das Spiel beaufsichtigt werden sollte; allein bleibt er nicht gern. Sein Fell muss mehr als einmal pro Woche gebürstet werden. Britische Quellen nennen eine Herzklappenerkrankung und eine schmerzhafte Erkrankung der Wirbelsäule, die mit der Schädelform zusammenhängt, als wichtigste Gesundheitsthemen; Züchter werden deshalb gebeten, das Herz ihrer Hunde untersuchen und eine MRT-Aufnahme machen zu lassen.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Der Beagle ist ein kleiner Laufhund aus Großbritannien, gezüchtet für die Hasenjagd auf der Spur. Sein Standard beschreibt einen robusten, kompakt gebauten, fröhlichen Laufhund – mutig, aktiv und aufmerksam, liebenswürdig und ohne Aggression oder Scheu – mit kurzem, dichtem Fell in Laufhundfarben wie Tricolour, Lohfarben-Weiß oder Zitronengelb-Weiß und immer mit weißer Rutenspitze.",
        "Er braucht bis zu etwa einer Stunde Bewegung pro Tag und passt gut ins Familienleben, wenn er von klein auf sozialisiert wird; mit Kindern sollte er aber beaufsichtigt werden, und er sollte nicht allein gelassen werden, sonst bellt er womöglich und zerkaut Dinge. Sein kurzes Fell braucht einmal pro Woche die Bürste, haart aber. Die Erziehung sollte früh beginnen und mit Belohnung arbeiten. Britische Tierärzte sehen Beagles am häufigsten wegen Gewichtszunahme und Zahnerkrankungen, deshalb sollten Portionen und Zähne im Blick bleiben.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Pudel, Standard Poodle",
      text: [
        "Der Großpudel ist die größte der vier Pudelgrößen, eine Begleithunderasse aus Frankreich, die von europäischen Entenjagdhunden abstammt. Sein Standard beschreibt einen eleganten, ausgewogenen Hund mit stolzer Haltung – treu, fröhlich und gutmütig, lernfähig und gut zu erziehen – mit üppigem, krausem Lockenfell in einer einheitlichen Farbe: Schwarz, Weiß, Braun, Grau oder Falbfarben.",
        "Er braucht bis zu etwa einer Stunde Bewegung pro Tag und passt in ein großes Haus mit großem Garten. Mit der richtigen Sozialisierung als Welpe kommt er im Allgemeinen gut mit Kindern und anderen Haustieren aus. Sein Fell haart nicht, das macht ihn aber nicht hypoallergen: Es braucht tägliche Pflege und regelmäßiges Scheren bei einem professionellen Hundefriseur. Er gilt als sehr gehorsam und lässt sich gut erziehen.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Teckel, Dachshund",
      text: [
        "Der Dackel, auch Teckel genannt, ist ein deutscher Jagdhund für die Jagd auf Dachs und Kaninchen, den es in mehreren Größen und drei Haararten gibt; diese Seite behandelt die Normalgröße mit Kurzhaar. Sein Standard beschreibt einen im Verhältnis zu seiner Höhe mäßig langen Hund ohne Übertreibungen – treu, vielseitig und gutmütig, intelligent, lebhaft und mutig – mit dichtem, kurzem, glattem Fell in Rot oder in Schwarz oder Schokolade mit lohfarbenen Abzeichen.",
        "Er braucht bis zu etwa einer Stunde Bewegung pro Tag, verteilt auf ein paar Spaziergänge mit Zeit zum Schnüffeln, und passt in ein kleines Haus. Er liebt Menschen und kommt im Allgemeinen gut mit Kindern jeden Alters aus, immer unter Aufsicht; wegen seines starken Jagdtriebs wird er aber nicht mit kleineren Haustieren empfohlen, und allein bleibt er nicht gern. Wegen seines langen Rückens und der kurzen Beine neigt er zu Bandscheibenvorfällen und sollte deshalb nicht springen; Züchter werden gebeten, die Wirbelsäule vor der Zucht untersuchen zu lassen.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie",
      text: [
        "Der Australian Shepherd ist trotz seines Namens eine amerikanische Rasse – ein intelligenter Arbeitshund mit starkem Hüte- und Schutztrieb. Sein Standard beschreibt einen ausgewogenen, mittelgroßen Hund, etwas länger als hoch, gutmütig und bei ersten Begegnungen manchmal zurückhaltend, mit mittellangem, glattem bis welligem Fell in Blue Merle, Schwarz, Red Merle oder Rot, jeweils mit oder ohne weiße und lohfarbene Abzeichen.",
        "Er braucht mehr als zwei Stunden Bewegung pro Tag und geistige Herausforderungen wie Denkspiele und Training und passt in ein großes Haus mit großem Garten auf dem Land. Im richtigen Haushalt kann er ein wirklich guter Familienhund sein, doch sein starker Hütetrieb kann ihn dazu bringen, Kinder zu hüten; für Familien mit kleineren Kindern wird er deshalb nicht empfohlen. Allein bleibt er nicht gern, und sein Fell muss ein paarmal pro Woche gebürstet werden.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Havanese, Bichon Havanais",
      text: [
        "Der Havaneser ist ein kleiner Vertreter der Bichon-Familie und der Nationalhund Kubas. Sein Standard beschreibt einen robusten kleinen Hund mit kurzen Beinen, sehr langem, weichem, glattem oder welligem Fell, das nie geschnitten wird, und einer hoch über dem Rücken getragenen Rute. Es gibt ihn in Falbfarben, Schwarz, Havannabraun, Tabak, Rötlichbraun und selten Weiß, mit oder ohne Flecken und lohfarbene Abzeichen.",
        "Sein Standard nennt ihn anhänglich, verspielt und sogar ein bisschen clownesk und sagt, dass er Kinder liebt und endlos mit ihnen spielt; britische Quellen nennen ihn bei richtiger Sozialisierung einen ausgezeichneten Familienhund, der leicht zu erziehen ist. Er braucht etwa 30 Minuten Bewegung pro Tag, kann in einer Wohnung leben und haart nicht – sein langes Fell muss aber jeden Tag gepflegt werden, damit es nicht verknotet und verfilzt.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "Der West Highland White Terrier oder Westie ist ein kleiner Terrier aus Großbritannien. Sein Standard beschreibt einen kräftig gebauten kleinen Hund mit tiefer Brust, geradem Rücken und hartem, doppeltem Fell von etwa 5 cm Länge, kleinen, aufrechten, spitzen Ohren und dunklen Augen unter buschigen Brauen. Weiß ist die einzige Farbe, die der Standard zulässt.",
        "Sein Standard nennt ihn aufmerksam, fröhlich, mutig und selbstständig, aber freundlich. Britische Quellen nennen ihn einen anhänglichen, verspielten Familienhund für Kinder jeden Alters, wobei das Spiel immer beaufsichtigt werden sollte; er braucht etwa eine Stunde Bewegung pro Tag, kann in einer Wohnung leben, haart und muss ein paarmal pro Woche gebürstet werden. Wegen seines Jagdtriebs sollte er nicht mit kleineren Haustieren zusammenleben, und allein bleibt er nicht gern. Die Haut ist ein bekanntes Thema: Der Royal Kennel Club bittet Richter, bei der Rasse auf Anzeichen von Hautentzündungen zu achten.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Bernese Mountain Dog",
      text: [
        "Der Berner Sennenhund ist ein großer Schweizer Bauernhund, ursprünglich als Wach-, Zug- und Treibhund im Kanton Bern eingesetzt. Sein Standard beschreibt einen kräftigen, beweglichen, langhaarigen Arbeitshund mit stämmigen Gliedmaßen und langem, glänzendem, glattem oder leicht gewelltem Fell. Die einzige Farbe, die der Standard zulässt, ist Tricolour: tiefes Schwarz mit sattem Braunrot an den Backen, über den Augen, an den Läufen und an der Brust sowie weißen Abzeichen an Kopf und Brust.",
        "Sein Standard nennt ihn selbstsicher, gutmütig und freundlich und „einen liebenswürdigen und anhänglichen Familienhund“, der spät reif wird. Britische Quellen sagen, dass er bis zu einer Stunde Bewegung pro Tag braucht, in ein großes Haus mit großem Garten gehört, stark haart und mehr als einmal pro Woche gebürstet werden muss; lange allein bleiben sollte er nicht. Er wird meist keine zehn Jahre alt, und britische Quellen nennen Hüft- und Ellbogendysplasie, Magendrehung und bestimmte Krebsarten unter seinen Gesundheitsthemen.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky",
      text: [
        "Der Siberian Husky ist ein mittelgroßer Schlittenhund, den die FCI als amerikanische Rasse anerkennt und den der Royal Kennel Club als den leichtesten und schnellsten Schlittenhund beschreibt. Sein Standard verlangt einen schnellen, leichtfüßigen Hund mit doppeltem, mittellangem Fell, dicken Stehohren, braunen oder blauen Augen (je eines ist erlaubt) und einer gut behaarten Rute. Die Farben reichen von Schwarz bis Reinweiß; Merle und Gestromt sind nicht erlaubt.",
        "Sein Standard nennt ihn freundlich und sanft, aufmerksam und kontaktfreudig. Britische Quellen sagen, dass er mehr als zwei Stunden Bewegung pro Tag braucht, ein großes Haus mit großem Garten und einem sehr sicheren, hohen Zaun, denn Huskys sind als Ausbrecher bekannt; er haart stark, muss ein paarmal pro Woche gebürstet werden und kommt allein schlecht zurecht. Die PDSA empfiehlt ihn eher für Haushalte nur mit Erwachsenen oder mit Teenagern als für Familien mit kleineren Kindern und nennt Hüftdysplasie, Augenprobleme und Epilepsie unter seinen Gesundheitsthemen.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Der Rottweiler ist ein mittelgroßer bis großer, kräftiger Arbeitshund aus Deutschland. Sein Standard beschreibt einen robusten Hund, weder schwer noch leicht, mit kurzem, derbem, anliegendem Fell, mittelgroßen Hängeohren und dunkelbraunen, mandelförmigen Augen. Die einzige erlaubte Farbe ist Schwarz mit klar abgegrenzten, satt braunen Abzeichen an Backen, Fang, Kehle, Brust und Läufen; weiße Abzeichen sind ein Fehler.",
        "Sein Standard nennt ihn gutmütig, ruhig, sehr anhänglich, gehorsam und arbeitsfreudig, und der Royal Kennel Club sagt, dass ein gut erzogener Rottweiler ein wunderbarer Familienbegleiter ist. Britische Quellen sagen, dass er mehr als zwei Stunden Bewegung pro Tag braucht, ein großes Haus mit großem Garten und einen erfahrenen Halter, weil er so kräftig ist; er sollte von klein auf sozialisiert werden. Die PDSA empfiehlt ihn nicht für Familien mit jüngeren Kindern und Babys, und er sollte nie unbeaufsichtigt mit anderen Haustieren bleiben. Einmal Bürsten pro Woche reicht. Er wird meist keine zehn Jahre alt, und der Royal Kennel Club beobachtet die Form seiner Hinterläufe.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog, English Bulldog, British Bulldog",
      text: [
        "Die Englische Bulldogge ist ein mittelgroßer, kurzhaariger Hund aus Großbritannien: recht gedrungen, niedrig, breit, kräftig und kompakt, mit relativ kurzem Gesicht, kleinen, dünnen Rosenohren und runden, sehr dunklen Augen. Ihr Standard erlaubt einfarbige Töne wie Rot, Falb, Fahlgelb und Weiß, Gestromt und Gescheckt; Schwarz und Schwarz mit Loh sind höchst unerwünscht. Er verlangt große, weit geöffnete Nasenlöcher und sagt, dass Hunde mit Atemnot höchst unerwünscht sind.",
        "Ihr Standard nennt sie aufmerksam, mutig, treu, verlässlich und tapfer, grimmig im Aussehen, aber anhänglich, und der Royal Kennel Club sagt, dass sie wegen ihres Charakters und ihrer Treue als Familienbegleiterin nach wie vor sehr beliebt ist. Britische Quellen sagen, dass sie bis zu einer Stunde Bewegung pro Tag braucht, nie in der Mittagshitze, und gut mit anderen Haustieren auskommt, wenn sie jung sozialisiert wird; das Fell braucht einmal pro Woche Pflege, die Gesichtsfalten aber täglich eine Reinigung. Die PDSA beschreibt sie als stark kurzköpfige Rasse, die sehr wahrscheinlich ernste Gesundheitsprobleme wie Atembeschwerden hat, und empfiehlt nachdrücklich, eine gesündere Rasse, eine Kreuzung oder einen Mischling in Betracht zu ziehen. Sie wird meist keine zehn Jahre alt.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Kurzhaar, German Shorthaired Pointer, GSP",
      text: [
        "Der Deutsch Kurzhaar ist ein vielseitiger Jagdhund aus Deutschland für die Arbeit in Feld und Wasser, mit kurzem, dichtem Fell, das sich derb anfühlt, breiten, flachen, hoch angesetzten Ohren und dunkelbraunen, mandelförmigen Augen. Sein amerikanischer Standard erlaubt einfarbig Leberbraun, Leberbraun mit Weiß (etwa getüpfelt), einfarbig Schwarz und Schwarz mit Weiß; rote, orange, zitronengelbe oder lohfarbene Stellen und ein ganz weißer Hund führen zum Ausschluss. Sein Standard beschreibt eine kupierte Rute – PetPrep zeigt den Hund immer mit seiner natürlichen Rute.",
        "Sein Standard nennt ihn freundlich, intelligent und bemüht zu gefallen. Der Royal Kennel Club und die PDSA sagen, dass er mehr als zwei Stunden Bewegung pro Tag braucht; die PDSA ergänzt, dass sein Trieb zu jagen, vorzustehen und zu apportieren beim Spaziergang durchbrechen kann, er also einen guten Rückruf braucht, und dass er recht leicht zu erziehen ist. Er braucht ein- bis zweimal pro Woche Fellpflege und haart mäßig. Eine große britische Studie gibt seine mediane Lebenserwartung mit 13,4 Jahren an.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie",
      text: [
        "Der Yorkshire Terrier ist ein Zwergterrier aus Großbritannien, der nach seinem Rassestandard bis zu 3,2 kg wiegt, mit langem, vollkommen glattem, glänzendem und seidigem Fell, das von einem Scheitel entlang des Rückens gleichmäßig an beiden Seiten herabfällt. Der Standard erlaubt eine Farbe: dunkles Stahlblau vom Hinterkopf bis zur Rute, mit sattem, leuchtendem Loh an Kopf, Brust und Läufen; die kleinen V-förmigen Ohren werden aufrecht getragen. Der Standard beschreibt sowohl eine kupierte als auch eine unkupierte Rute – PetPrep zeigt den Hund immer mit seiner natürlichen Rute.",
        "Sein Standard nennt ihn aufmerksam, intelligent und temperamentvoll, mit ausgeglichenem Wesen. Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und tägliche Fellpflege; die PDSA ergänzt, dass er gern rennt, apportiert und spielt, bei der Erziehung recht stur sein kann und besser zu Familien mit älteren Kindern passt, weil seine Knochen sehr zerbrechlich sind. Laut einer großen britischen Studie sind Zahnerkrankungen das häufigste Problem der Rasse; die Studie empfiehlt tägliche Zahnpflege wie Zähneputzen und ermittelte ein medianes Sterbealter von 13,56 Jahren.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Italienischer Corso-Hund",
      text: [
        "Der Cane Corso ist ein mittelgroßer bis großer italienischer Molosser, ein robuster, kräftiger Hund mit einer gewissen Eleganz, etwas länger als hoch. Sein Standard beschreibt ein kurzes, glänzendes, sehr dichtes Fell in Schwarz, Grautönen, Falb oder Rot mit dunkler Maske, dunklem Weizenfarbton oder Gestromt; große weiße Flecken sind nicht erlaubt. Nach dem aktuellen FCI-Standard bleiben die Ohren unkupiert und die Rute natürlich – in Großbritannien ist das Kupieren von Ohren und Rute verboten –, deshalb zeigt PetPrep den Hund immer mit natürlichen Ohren und natürlicher Rute.",
        "Sein Standard nennt ihn einen Beschützer von Besitz, Familie und Vieh, äußerst beweglich und reaktionsschnell. Die PDSA sagt, dass er mit seinen Haltern gesellig und liebevoll ist, etwa zwei Stunden Bewegung pro Tag und Beschäftigung braucht, weil er Langeweile hasst, und wegen seiner Größe besser zu erfahrenen Haltern passt. Sie empfiehlt die Rasse nicht für Haushalte mit kleinen Kindern, die umgestoßen werden könnten; sie passt zu Haushalten nur mit Erwachsenen oder zu Familien mit älteren Kindern. Einmal Bürsten pro Woche reicht, aber er haart und ist dafür bekannt, zu sabbern. Die PDSA gibt seine durchschnittliche Lebenserwartung mit unter zehn Jahren an.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Pembroke Welsh Corgi, Corgi",
      text: [
        "Der Welsh Corgi Pembroke ist ein kleiner Treibhund aus Wales, niedrig, kräftig und stämmig gebaut, der auf kleinem Raum Substanz und Ausdauer ausstrahlt. Sein Standard beschreibt ein mittellanges, glattes Fell mit dichter Unterwolle in Rot, Zobel, Falb oder Schwarz mit Loh, mit oder ohne weiße Abzeichen an Läufen, Brust und Hals, und Stehohren. Die Rute wurde früher üblicherweise kupiert; der Standard beschreibt auch die natürliche Rute, und PetPrep zeigt den Hund immer mit seiner natürlichen Rute.",
        "Sein Standard nennt ihn mutig, arbeitsam, kontaktfreudig und freundlich. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege mehr als einmal pro Woche; die PDSA beschreibt freundliche, fröhliche, verspielte Hunde, die gefallen wollen und recht leicht zu erziehen sind, sagt aber, dass sie rennenden Kindern in die Fersen zwicken können – Sozialisierung mit Kindern und Erziehung von klein auf helfen. Der Royal Kennel Club gibt seine Lebenserwartung mit über 12 Jahren an und bittet Züchter, die Hüften der Elterntiere auswerten zu lassen.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Dobermann Pinscher, Doberman",
      text: [
        "Der Dobermann ist ein deutscher Begleit-, Schutz- und Gebrauchshund mittlerer Größe, kräftig und muskulös gebaut, mit eleganten Linien und stolzer Haltung. Sein FCI-Standard beschreibt ein kurzes, hartes, dichtes Fell, das eng und glatt anliegt, in Schwarz oder Braun mit klar abgegrenzten rostroten Abzeichen; weiße Flecken sind nicht erlaubt. Ohren und Rute bleiben nach dem FCI-Standard natürlich, und PetPrep zeigt den Hund immer mit natürlichen Ohren und natürlicher Rute.",
        "Sein Standard nennt ihn freundlich und ruhig und sehr an die Familie gebunden. Der Royal Kennel Club sagt, dass er wegen seines treuen und gehorsamen Wesens ein ausgezeichneter Familienhund ist, und empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege einmal pro Woche. Die PDSA ergänzt, dass er sehr energiegeladen ist, viel geistige und körperliche Bewegung und frühe Sozialisierung braucht und – wegen seiner Größe und seines kräftigen Körperbaus – nicht für Familien mit kleinen Kindern oder für Ersthalter empfohlen wird. Der Royal Kennel Club gibt seine Lebenserwartung mit über 10 Jahren an.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Deutscher Boxer, German Boxer",
      text: [
        "Der Boxer ist ein deutscher Gebrauchs- und Begleithund mittlerer Größe mit quadratischem Körperbau, starken Knochen und gut entwickelter Muskulatur. Seine Standards beschreiben ein kurzes, glänzendes, glattes Fell in Gelb oder Gestromt mit schwarzer Maske; weiße Abzeichen sind erlaubt, sollten aber nicht mehr als ein Drittel des Fells bedecken. Der Fang sollte breit und tief sein, nie kurz, mit weiten Nasenlöchern. Die Rute wurde früher üblicherweise kupiert; der Standard beschreibt auch die unkupierte Rute, und PetPrep zeigt den Hund immer mit natürlichen Ohren und natürlicher Rute.",
        "Sein Standard nennt ihn ausgeglichen, führig, furchtlos und selbstsicher. Der Royal Kennel Club nennt ihn einen sehr geschätzten Familienbegleiter und empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege einmal pro Woche. Die PDSA beschreibt einen sehr energiegeladenen, verspielten Hund, der menschliche Gesellschaft liebt und Trennungsangst entwickeln kann, wenn er allein bleibt; er hat einen sehr starken Jagdtrieb und wird – wegen seiner Größe und seines ungestümen Wesens – nicht für Haushalte mit jüngeren Kindern oder für Ersthalter empfohlen; manche Boxer mit kürzerem Gesicht können ernste Atemprobleme haben. Der Royal Kennel Club gibt seine Lebenserwartung mit über 10 Jahren an.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Miniature Schnauzer, Mini Schnauzer",
      text: [
        "Der Zwergschnauzer ist ein kleiner deutscher Begleithund: kräftig, stämmig und nahezu quadratisch, mit hartem, drahtigem, dichtem Fell, buschigen Augenbrauen und Bart. Sein FCI-Standard erlaubt Pfeffer-Salz, Schwarz-Silber, reines Schwarz und reines Weiß; PetPrep zeigt die ersten drei. Die Rute wurde früher üblicherweise kupiert und die Ohren manchmal ebenfalls; der FCI-Standard verlangt eine natürliche Rute und Kippohren, und PetPrep zeigt den Hund immer mit natürlichen Ohren und natürlicher Rute.",
        "Die FCI führt ihn als Haus- und Begleithund, und der Royal Kennel Club sagt, dass er als Begleiter sehr beliebt ist. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege mehr als einmal pro Woche und sagt, dass er nicht haart. Die PDSA beschreibt einen verspielten, neugierigen Hund, der gut mit Kindern auskommen kann, wenn er sie früh kennenlernt, bei der Erziehung stur sein kann und zwei- bis dreimal pro Woche Fellpflege braucht, dazu von Zeit zu Zeit Scheren oder Trimmen bei einem professionellen Hundefriseur. Der Royal Kennel Club gibt seine Lebenserwartung mit über 10 Jahren an.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Der Shih Tzu ist ein kleiner Begleithund aus Tibet; Großbritannien betreut seinen FCI-Standard. Die Standards beschreiben einen robusten Hund mit üppigem Fell, stolzer Haltung und einem „chrysanthemenartigen“ Gesicht: langes, dichtes Deckhaar, große, dunkle, runde Augen, große Hängeohren und eine reich befederte, über dem Rücken getragene Rute. Die Standards erlauben viele Farben; PetPrep zeigt Gold-Weiß, Schwarz-Weiß und Leberbraun-Weiß und nie Merle. Der Fang ist kurz und flach, und die PDSA nennt Atemprobleme durch das kürzere Gesicht; deshalb zeichnet PetPrep immer ein gemäßigtes Gesicht mit offenen Nasenlöchern.",
        "Die FCI beschreibt ihn als intelligent, aktiv und aufmerksam, freundlich und unabhängig. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und tägliche Fellpflege und nennt eine Wohnung als geeignetes Zuhause. Die PDSA sagt, dass Shih Tzus bei richtiger Sozialisierung und Erziehung gutmütige Familienhunde sein können, nennt sie ideal für Ersthalter, rät, sie bei Kindern immer zu beaufsichtigen, und empfiehlt für die meisten Hunde tägliches Bürsten und alle sechs bis acht Wochen einen Schnitt bei einem professionellen Hundefriseur. Der Royal Kennel Club gibt seine Lebenserwartung mit über 10 Jahren an.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Dogge, Great Dane",
      text: [
        "Die Deutsche Dogge ist ein deutscher Riese: Der FCI-Standard sagt, dass sie einen großen, kräftigen, gut gebauten Körper mit Stolz, Kraft und Eleganz verbindet, mit langem, schmalem Kopf, natürlich hängenden Ohren und sehr kurzem, glattem, glänzendem Fell. Die Standards nennen Gelb und Gestromt – idealerweise mit schwarzer Maske – sowie Gefleckt (Harlekin), Schwarz und Blau; PetPrep zeigt nur Farben, die sowohl die FCI als auch der Royal Kennel Club aufführen, nie Merle oder Mantle, und zeichnet den Hund immer mit natürlichen Ohren und natürlicher Rute und straffen Lidern, weil der Royal Kennel Club Richter bittet, auf nach innen oder außen gerollte Lider und schwache Hinterläufe zu achten.",
        "Die FCI nennt sie freundlich, liebevoll und anhänglich gegenüber ihren Haltern, Fremden gegenüber womöglich zurückhaltend. Der Royal Kennel Club sagt, dass sie trotz ihrer Größe ein wunderbarer Familienhund ist, und empfiehlt mehr als zwei Stunden Bewegung pro Tag, ein großes Haus mit Garten und Fellpflege einmal pro Woche. Die PDSA sagt, dass Deutsche Doggen dafür bekannt sind, zu sabbern, einen recht starken Jagdtrieb haben und wegen ihrer Größe und Kraft nicht für Haushalte mit jüngeren Kindern empfohlen werden; sie rät, zwischen Fressen und Bewegung eine Pause einzulegen, um einer Magendrehung vorzubeugen. Der Royal Kennel Club gibt ihre Lebenserwartung mit unter 10 Jahren an.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Pomeranian, Pom",
      text: [
        "Der Zwergspitz (Pomeranian) ist der kleinste Spitz: Die FCI führt ihn als Zwergform des Deutschen Spitzes mit 21 cm ± 3 cm Widerristhöhe, und der Standard des Royal Kennel Club beschreibt einen kompakten, kurz gebauten kleinen Hund mit fuchsartigem Kopf, kleinen Stehohren und einer über den Rücken gelegten Rute. Sein doppeltes Fell hat eine weiche, flauschige Unterwolle und langes, gerades Deckhaar, das eine Halskrause bildet. Der Standard erlaubt viele einfarbige Töne wie Orange, Creme, Weiß, Schwarz und Braun, aber nie Merle; PetPrep zeichnet ein natürliches, ungetrimmtes Fell.",
        "Die FCI nennt sein Wesen gesellig und fröhlich, und der Standard des Royal Kennel Club nennt ihn extrovertiert, lebhaft und intelligent. Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und hält ihn für eine Wohnung geeignet; die PDSA sagt, dass sein doppeltes Fell zwei- bis dreimal pro Woche gebürstet werden muss. Der AKC sagt, dass Zwergspitze meist besser zu Familien mit älteren Kindern passen, bei früher Sozialisierung gut mit anderen Tieren auskommen können, und empfiehlt frühe Sozialisierung und Welpenkurse sehr. Der Royal Kennel Club gibt seine Lebenserwartung mit über 12 Jahren an.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "Der Boston Terrier stammt aus den USA. Der FCI-Standard beschreibt einen lebhaften, sehr intelligenten, kurzhaarigen, kurzköpfigen, kompakt gebauten, kurzschwänzigen und ausgewogenen Hund, gestromt, Seal oder Schwarz und gleichmäßig weiß gezeichnet: Ein weißer Fangring, eine weiße Blesse zwischen den Augen und eine weiße Vorbrust sind vorgeschrieben, und Gestromt wird bevorzugt. PetPrep zeichnet ihn gestromt mit Weiß, mit gemäßigtem Fang, offenen Nasenlöchern und natürlichen Ohren und natürlicher Rute.",
        "Er ist eine kurzköpfige (brachyzephale) Rasse, und die PDSA warnt, dass er nie in der Mittagshitze bewegt werden sollte, weil er zur Überhitzung neigt. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege einmal pro Woche, hält ihn für eine Wohnung geeignet und gibt seine Lebenserwartung mit über 10 Jahren an. Die PDSA nennt Boston Terrier perfekte Familienhunde, die besonders gut mit Kindern sind, wenn sie als Welpen gut sozialisiert wurden; der AKC sagt, dass sie gut mit Kindern zurechtkommen, die sanft mit Tieren umgehen können, schlecht damit zurechtkommen, lange allein zu sein, und empfiehlt nachdrücklich frühe Sozialisierung und Welpentraining.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, Miniature Australian Shepherd",
      text: [
        "Der Miniature American Shepherd stammt aus den USA. Der FCI-Standard beschreibt einen kleinen Hütehund mit starkem Hüte- und Schutztrieb, intelligent und vor allem ein Arbeitshund, etwas länger als hoch, mit mittellangem, glattem bis welligem, wetterfestem Fell. Seine Farben sind Schwarz, Blue Merle, Rot und Red Merle, mit oder ohne weiße und lohfarbene Abzeichen, und seine Augen können braun, blau, haselnussfarben oder bernsteinfarben sein. PetPrep zeichnet ihn in Blue Merle mit natürlicher Rute.",
        "PetMD sagt, dass er viel Energie hat und jeden Tag mindestens eine, besser zwei Stunden Bewegung braucht, dazu Aufgaben, die seinen Kopf beschäftigen, und dass er ein paarmal pro Woche gebürstet werden sollte; der AKC sagt, dass wöchentliches Bürsten den größten Teil des Jahres reicht, mit täglichem Bürsten im Fellwechsel. Der AKC sagt, dass er mit Gehorsamstraining und früher Sozialisierung ein toller Familienhund sein kann und meist gut mit Kindern ist, sie aber zu hüten versuchen kann; PetMD ergänzt, dass seine Hingabe an die Familie zu Trennungsangst führen kann, wenn er allein bleibt. PetMD gibt seine Lebenserwartung mit 12 bis 13 Jahren an.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Kurzhaar-Chihuahua",
      text: [
        "Der Chihuahua stammt aus Mexiko. Der Standard des Kennel Club beschreibt einen kleinen, zierlichen, kompakten Hund mit kessem Ausdruck und einem fröhlichen, temperamentvollen und intelligenten Wesen, einem gut gerundeten „Apfelkopf“, einem mäßig kurzen, leicht spitzen Fang, großen, runden Augen, die nicht hervortreten, großen Ohren und einer Sichelrute; jede Farbe oder Farbmischung ist erlaubt, aber nie Merle, und das bevorzugte Gewicht liegt bei 1,8–2,7 kg. Der Royal Kennel Club führt den kurzhaarigen und den langhaarigen Chihuahua als zwei Rassen; PetPrep zeichnet den Kurzhaar-Chihuahua in Falb, mit gemäßigtem Kopf.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und Fellpflege einmal pro Woche, hält ihn für eine Wohnung geeignet und gibt seine Lebenserwartung mit über 12 Jahren an. Die PDSA sagt, dass Chihuahuas so klein und leicht sind, dass Kinder versucht sind, sie hochzuheben, was ihnen kaum gefällt; sie passen deshalb besser zu Familien mit etwas älteren Kindern. Die PDSA ergänzt, dass sie als Begleithunde Gesellschaft lieben und ständig jemanden im Haus brauchen und dass sie von klein auf mit vielen verschiedenen Menschen, Erfahrungen und Orten sozialisiert werden sollten.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer Spaniel, Springer, ESS",
      text: [
        "Der English Springer Spaniel stammt aus Großbritannien, wo er gezüchtet wurde, um Wild zu finden, aufzuscheuchen und zu apportieren. Der Standard des Kennel Club beschreibt einen symmetrisch gebauten, kompakten, kräftigen, fröhlichen und aktiven Hund – den hochläufigsten der britischen Landspaniels – mit freundlichem, fröhlichem, führigem Wesen, langen befederten Ohren, dunkel haselnussbraunen Augen und dichtem, glattem, wetterfestem Fell; die Farben sind Leberbraun-Weiß oder Schwarz-Weiß, jeweils mit lohfarbenen Abzeichen, und die Widerristhöhe liegt bei etwa 51 cm. PetPrep zeichnet ihn leberbraun-weiß, mit natürlicher Rute.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung pro Tag und Fellpflege mehr als einmal pro Woche und gibt seine Lebenserwartung mit über 10 Jahren an. Die PDSA sagt, dass Springer gute Familienhunde sind, die gut mit Kindern und anderen Haustieren auskommen, gehorsam und lernwillig sind und ein- bis zweimal pro Woche Fellpflege brauchen, dazu alle 3 Monate einen Schnitt. Der AKC ergänzt, dass sie nicht lange allein bleiben sollten und dass frühe Sozialisierung und Welpenkurse entscheidend sind.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Collie (früherer Name)",
      text: [
        "Der Shetland Sheepdog stammt aus Großbritannien und ist ein kleiner, langhaariger Arbeitshund. Der FCI-Standard beschreibt einen aufmerksamen, sanften, intelligenten, kräftigen und aktiven Hund, anhänglich und seinem Halter treu, Fremden gegenüber zurückhaltend, mit einem Kopf wie ein langer, stumpfer Keil, kleinen, halb aufgerichteten Ohren mit nach vorn kippenden Spitzen und doppeltem Fell mit langem, hartem Deckhaar; die Farben sind Zobel, Tricolour, Blue Merle, Schwarz-Weiß und Schwarz mit Loh, und die ideale Höhe liegt bei 37 cm für Rüden und 35,5 cm für Hündinnen. PetPrep zeichnet ihn zobel-weiß.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und tägliche Fellpflege und gibt seine Lebenserwartung mit über 10 Jahren an. Die PDSA sagt, dass Shelties sehr sanfte, verspielte, gehorsame Hunde sind, die oft gut ins Familienleben passen und sich gut mit Kindern verstehen, und dass Erziehung und Sozialisierung in jungem Alter sehr wichtig sind. Der AKC ergänzt, dass sie regelmäßig geistige und körperliche Bewegung brauchen, wegen ihres Hütetriebs am besten mit älteren Kindern zurechtkommen und dafür bekannt sind, sehr bellfreudig zu sein.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Brittany Spaniel, Brittany",
      text: [
        "Der Epagneul Breton ist ein Vorstehhund aus Frankreich; im Englischen heißt er Brittany. Der Royal Kennel Club beschreibt einen sehr energiegeladenen, intelligenten Hund, der sucht, vorsteht und apportiert, sanft und anhänglich und doch voller Leben und Überschwang, mit dichtem, recht feinem Fell, hoch angesetzten dreieckigen Ohren und einer Rute, die oft von Natur aus kurz ist; die Standardfarben sind Orange, Leberbraun oder Schwarz mit Weiß, Schimmel oder Tricolour, und die Höhe liegt bei 48–51 cm für Rüden und 47–50 cm für Hündinnen. PetPrep zeichnet ihn orange-weiß.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung pro Tag und Fellpflege mehr als einmal pro Woche und gibt seine Lebenserwartung mit über 10 Jahren an. Der AKC sagt, dass Bretonen energiegeladene Hunde sind, die viel Bewegung und geistige Anregung brauchen, sanft und meist geduldig mit Kindern sind und dass wöchentliches Bürsten sie gepflegt hält. PetMD ergänzt, dass frühe Sozialisierung der Welpen ein Muss ist, dass sie schlecht damit zurechtkommen, lange allein zu sein, und dass sie als Vogelhunde einen starken Jagdtrieb haben.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (USA), American Cocker",
      text: [
        "Der American Cocker Spaniel – in den USA einfach Cocker Spaniel genannt – ist eine andere Rasse als der English Cocker Spaniel. Der AKC-Standard nennt ihn das kleinste Mitglied der Sporting Group, mit langen, lappenförmigen, gut befederten Ohren, rundem Schädel und breitem, tiefem Fang sowie seidigem Fell, das glatt oder leicht gewellt ist; es gibt ihn in Schwarz, in jedem einfarbigen Ton vom hellsten Creme bis zum dunkelsten Rot und mehrfarbig mit Weiß. Der Standard verlangt ein ausgeglichenes Wesen ohne jede Spur von Ängstlichkeit.",
        "Der Royal Kennel Club empfiehlt tägliche Fellpflege und mehr als 2 Stunden Bewegung pro Tag und gibt seine Lebenserwartung mit über 10 Jahren an; der AKC und PetMD schreiben, dass er nicht viel Bewegung braucht. PetMD nennt diese liebenswerten Hunde großartige Familienhunde, freundlich zu Menschen und anderen Tieren, und rät, früh mit Sozialisierung und Erziehung zu beginnen; VCA schreibt, dass sie meist sehr gut mit Kindern sind, zu Übergewicht neigen und jede Woche eine Ohrenkontrolle brauchen.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Belgian Malinois, Belgischer Schäferhund (Malinois)",
      text: [
        "Der Malinois ist die kurzhaarige Varietät des Belgischen Schäferhundes, einer Hüterasse aus Belgien. Der FCI-Standard beschreibt einen harmonisch proportionierten Hund, der Eleganz und Kraft verbindet, und erlaubt nur eine Farbe: Falb mit schwarzer Überzeichnung und schwarzer Maske. Die Standards von FCI und AKC beschreiben eher kleine, aufrechte, dreieckige Ohren, ein kurzes, hartes Fell mit dichter Unterwolle und ein aufmerksames, intelligentes, neugieriges und selbstsicheres Wesen.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung pro Tag und Fellpflege mehr als einmal pro Woche und gibt seine Lebenserwartung mit über 10 Jahren an. Der AKC schreibt, dass er keine gute Wahl für Ersthalter ist, am besten mit älteren, verantwortungsbewussten Kindern zurechtkommt und nicht lange allein bleiben sollte; PetMD nennt einen starken Jagdtrieb, sagt, dass er versuchen kann, Kinder zu hüten, und dass er ständiges tägliches Training und frühe Sozialisierung braucht.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "Der Basset Hound ist ein kurzbeiniger Laufhund aus Großbritannien. Der FCI-Standard beschreibt einen Laufhund mit beträchtlicher Substanz, ausgewogen, ruhig, nie aggressiv oder ängstlich und anhänglich, mit tief angesetzten, langen, samtigen Ohren, glattem, kurzem Fell und den Farben Schwarz-Weiß-Loh oder Zitronengelb-Weiß. Die Breed Watch des Royal Kennel Club bittet Ausstellungsrichter, auf nach innen oder außen gerollte Lider, sehr lange Ohren, wunde Hautfalten und überschüssige Haut zu achten.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege einmal pro Woche und gibt seine Lebenserwartung mit über 10 Jahren an. Die PDSA beschreibt einen toleranten Hund, der sich sehr gut mit Kindern versteht und Gesellschaft liebt, mit einem gesunden Appetit, auf den man achten muss; sie rät, die Hautfalten jeden Tag zu kontrollieren und zwischen Fressen und Bewegung eine Pause einzulegen. Der AKC ergänzt, dass ihn seine Nase vom Weg abbringen kann, sodass sichere Leinen und eingezäunte Flächen wichtig sind.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Kurzhaariger Ungarischer Vorstehhund, Hungarian Vizsla",
      text: [
        "Der Magyar Vizsla ist ein mittelgroßer, eleganter Jagdhund aus Ungarn mit kurzem, semmelgelbem Fell. Der FCI-Standard beschreibt einen lebhaften, freundlichen, ausgeglichenen Hund, der leicht zu erziehen ist und engen Kontakt zu seinem Führer hält; seine Farben sind Semmelgelb in verschiedenen Schattierungen und dunkles Sandgelb. Die Breed Watch des Royal Kennel Club nennt keine rassespezifischen Problempunkte.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege einmal pro Woche und gibt seine Lebenserwartung mit über 12 Jahren an. Die PDSA beschreibt einen sehr menschenbezogenen Hund, der Gesellschaft liebt und unter Trennungsangst leiden kann, wenn er allein bleibt; mit älteren Kindern kommt er gut aus, doch mit sehr kleinen Kindern oder für Ersthalter würde die PDSA ihn nicht empfehlen, und wegen seines starken Jagdtriebs rät sie davon ab, ihn mit kleineren Haustieren zu halten. Die PDSA rät außerdem, zwischen Fressen und Bewegung eine Pause einzulegen.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker Spaniel (UK), English Cocker, Merry Cocker",
      text: [
        "Der English Cocker Spaniel – in Großbritannien einfach Cocker Spaniel genannt – ist eine andere Rasse als der American Cocker Spaniel. Der FCI-Standard beschreibt einen fröhlichen, robusten Jagdhund, ausgewogen und kompakt, mit tief angesetzten, lappenförmigen Ohren und glattem, seidigem Fell; der AKC-Standard nennt ihn fröhlich und anhänglich, von ausgeglichenem Wesen, und führt einfarbig Schwarz, Leberbraun und Rottöne sowie Mehrfarbig mit Weiß auf. Die Breed Watch des Royal Kennel Club nennt keine rassespezifischen Problempunkte.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und tägliche Fellpflege und gibt seine Lebenserwartung mit über 10 Jahren an; eine VetCompass-Studie an English Cocker Spaniels in Großbritannien ermittelte ein medianes Sterbealter von 11,44 Jahren. Die PDSA sagt, dass er dank seines geduldigen Wesens meist gut mit Kindern auskommt, immer unter Aufsicht, warnt aber, dass er für Trennungsangst bekannt ist und nie länger als vier Stunden allein gelassen werden sollte. Die PDSA rät außerdem zu täglichem Bürsten und zu einer Pause zwischen Fressen und Bewegung.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Maltese, Bichon Maltais",
      text: [
        "Der Malteser ist ein Zwerghund aus dem zentralen Mittelmeerraum, heute unter italienischer Patenschaft bei der FCI. Der FCI-Standard beschreibt einen kleinen Hund mit länglichem Körper, lebhaft, anhänglich, sehr ruhig und sehr intelligent, 3–4 kg schwer, mit sehr langem, dichtem, seidigem Haar, das schwer über den ganzen Körper fällt. Das Fell hat keine Unterwolle, und Reinweiß ist die einzige Farbe (ein blasser Elfenbeinton ist erlaubt). Die Breed Watch des Royal Kennel Club nennt keine rassespezifischen Problempunkte.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und tägliche Fellpflege, sagt, dass die Rasse nicht haart, und gibt ihre Lebenserwartung mit über 12 Jahren an. Die PDSA beschreibt einen aufgeweckten, freundlichen und anhänglichen Hund, der Fremden gegenüber zurückhaltend sein kann, mit der richtigen Sozialisierung in jungem Alter aber lernen kann, selbstsicher und gesellig zu sein. PetMD warnt, dass er Trennungsangst entwickeln kann, wenn er zu lange allein bleibt, sagt, dass der Umgang mit kleinen Kindern beaufsichtigt werden muss, und rät, ihm jeden Tag die Zähne zu putzen.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Carlin",
      text: [
        "Der Mops ist ein kleiner Begleithund aus China, heute unter britischer Patenschaft bei der FCI. Der FCI-Standard beschreibt einen ausgesprochen quadratischen, gedrungenen Hund – „multum in parvo“ – mit großem Charme, Würde und Intelligenz und einem ausgeglichenen, fröhlichen und lebhaften Wesen, einem Idealgewicht von 6,3–8,1 kg, feinem, glattem, kurzem und glänzendem Fell in Silber, Apricot, Falb oder Schwarz und einer fest über der Hüfte geringelten Rute. Er verlangt recht große, gut geöffnete Nasenlöcher und hält verengte Nasenlöcher und eine schwere Nasenfalte für inakzeptabel. Der Royal Kennel Club stuft die Rasse in Breed-Watch-Kategorie 3 ein, mit Problempunkten wie Atemnot, hervortretenden Augen, Hautfaltendermatitis und Übergewicht.",
        "Die PDSA nennt den Mops eine stark brachyzephale (kurzköpfige) Rasse, die leicht außer Atem gerät, rät, Bewegung bei Hitze zu vermeiden, und sagt, dass ihre Tierärzte nachdrücklich eine Rasse mit normaler Schnauze oder eine Mops-Kreuzung empfehlen würden. Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung pro Tag und Fellpflege einmal pro Woche, sagt, dass die Rasse haart, und gibt ihre Lebenserwartung mit über 10 Jahren an. Die PDSA beschreibt einen Hund, der oft gut mit Kindern und anderen Haustieren auskommt, aber Gesellschaft über alles liebt und schlecht allein bleibt; PetMD rät, die Hautfalten im Gesicht jeden Tag zu reinigen und zu trocknen, und nennt Übergewicht als häufig bei der Rasse.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Langhaar-Collie, Rough Collie",
      text: [
        "Der Collie Langhaar ist ein großer Hütehund aus Großbritannien. Der FCI-Standard beschreibt einen Hund von großer Schönheit, der mit gelassener Würde dasteht, mit freundlichem Wesen ohne jede Spur von Nervosität oder Aggressivität, sehr dichtem Fell mit geradem, hartem Deckhaar und drei Farben: Zobel, Tricolour und Blue Merle. Der Standard des Royal Kennel Club nennt ihn einen großartigen Begleithund, freundlich, fröhlich und aktiv, gut mit Kindern und anderen Hunden, und gibt die Höhe mit 56–61 cm für Rüden und 51–56 cm für Hündinnen an. Der Royal Kennel Club stuft die Rasse in Breed-Watch-Kategorie 2 ein und registriert keine Welpen aus Merle-Merle-Verpaarungen.",
        "Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung pro Tag und tägliche Fellpflege, sagt, dass die Rasse haart, und gibt ihre Lebenserwartung mit über 12 Jahren an. PetMD sagt, dass Collies anhänglich sind, besonders gegenüber Kindern, und gut mit anderen Tieren auskommen, aber schlecht damit zurechtkommen, lange allein zu sein, und vor Aufregung nach Knöcheln und Fersen schnappen können. PetMD weist außerdem darauf hin, dass die Sozialisierung der Welpen entscheidend ist und dass bei Collies die MDR1-Mutation vorkommt, die beeinflusst, wie ein Hund bestimmte Medikamente verarbeitet.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "English Mastiff, Old English Mastiff",
      text: [
        "Der Mastiff ist eine sehr große Wachhunderasse aus Großbritannien. Der FCI-Standard beschreibt eine Verbindung von Größe und Mut – ruhig, anhänglich gegenüber seinen Haltern, aber fähig zu bewachen – mit quadratisch wirkendem Kopf, breitem, tiefem und kräftigem Körper und kurzem, anliegendem Fell in Apricot, Falb oder Gestromt. Die PDSA gibt eine durchschnittliche Höhe von 71–78 cm und ein durchschnittliches Gewicht von 80–85 kg an und weist darauf hin, dass der Kennel Club den Mastiff in Kategorie drei einstuft: Rassen mit sichtbaren Problemen im Körperbau, die Schmerzen, Unbehagen oder Gesundheitsprobleme verursachen können.",
        "Die PDSA empfiehlt für erwachsene Hunde etwa eine Stunde Bewegung pro Tag – aber keine Überlastung, solange sich Knochen und Gelenke eines Welpen noch entwickeln –, Fellpflege einmal pro Woche mit täglicher Reinigung der Gesichtsfalten und gibt eine durchschnittliche Lebenserwartung von unter 10 Jahren an. PetMD nennt Mastiffs großartige Familienhunde für Haushalte mit Kindern, die wissen, wie man mit Haustieren umgeht, wegen ihrer Größe aber vielleicht nicht mit Kleinkindern oder Babys; mit anderen Haustieren, die sie als Welpen kennenlernen, kommen sie meist gut aus, sie sabbern viel und sollten sich wegen des Risikos einer Magendrehung eine Stunde vor und nach den Mahlzeiten nicht körperlich anstrengen.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba Inu, Japanischer Shiba Inu",
      text: [
        "Der Shiba ist ein kleiner Spitz aus Japan; sein Name bedeutet „kleiner Hund“, und laut dem Royal Kennel Club wurde er für die Jagd auf kleines Federwild entwickelt. Der FCI-Standard beschreibt einen kleinen, ausgewogenen Hund mit guten Knochen, treuem Wesen, feinen Sinnen und hoher Wachsamkeit, hartem Deckhaar über weicher, dichter Unterwolle, kleinen, aufrechten, dreieckigen Ohren und einer dicken Ringelrute; die Farben sind Rot, Schwarz mit Loh und Sesam, immer mit weißlichen „Urajiro“-Abzeichen an Backen, Brust und Unterseite. Der AKC-Standard gibt ein durchschnittliches Gewicht von etwa 23 Pfund (10 kg) für Rüden und 17 Pfund (8 kg) für Hündinnen an.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege einmal pro Woche, weist darauf hin, dass die Rasse haart, und gibt ihre Lebenserwartung mit über 10 Jahren an; eine große britische Studie ermittelte eine mediane Lebensdauer von 14,6 Jahren. Der AKC beschreibt einen selbstsicheren, unabhängigen Hund, der besser zu einem erfahrenen Halter passt, sich mit älteren Kindern am wohlsten fühlt und außerhalb eingezäunter oder umschlossener Flächen nie von der Leine gelassen werden sollte. PetMD ergänzt, dass er viel geistige Anregung braucht, von Sozialisierung als Welpe profitiert und jeden Tag die Zähne geputzt bekommen sollte.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, Afrikanischer Löwenhund",
      text: [
        "Der Rhodesian Ridgeback stammt aus dem südlichen Afrika. Sein bekanntestes Merkmal ist der Ridge auf dem Rücken, ein Haarstreifen, der entgegen dem übrigen Fell wächst. Der FCI-Standard beschreibt einen ausgewogenen, kräftigen, muskulösen, beweglichen und aktiven Hund, würdevoll, intelligent und Fremden gegenüber reserviert, besonders geschätzt als Wachhund und Familienhund. Das kurze, dichte Fell ist hell- bis rotweizenfarben, und der Standard gibt ein Gewicht von etwa 36,5 kg für Rüden und 32 kg für Hündinnen an.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege einmal pro Woche, weist darauf hin, dass die Rasse haart und zu einem großen Haus mit großem Garten passt, und gibt ihre Lebenserwartung mit über 10 Jahren an. Die PDSA beschreibt verspielte, kräftige und sehr treue Hunde mit sehr starkem Jagdtrieb, die nicht für Ersthalter empfohlen werden, nie länger als vier Stunden allein bleiben sollten und von klein auf sozialisiert werden müssen; sie rät außerdem zu einer Pause zwischen Fressen und Bewegung. Woodgreen ergänzt, dass sie am besten mit älteren Kindern zurechtkommen.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Kontinentaler Zwergspaniel, Phalène (Varietät mit Hängeohren), Schmetterlingshündchen",
      text: [
        "Der Papillon ist die stehohrige Varietät des Kontinentalen Zwergspaniels, einer Rasse aus Belgien und Frankreich; die Varietät mit Hängeohren heißt Phalène. Der FCI-Standard beschreibt einen kleinen, eleganten Zwergspaniel mit langem Haar und lebhaftem Wesen, etwa 28 cm hoch und bis zu 4,5 kg schwer bei Rüden und 5 kg bei Hündinnen. Seine großen Ohren werden wie die ausgebreiteten Flügel eines Schmetterlings getragen, und das Fell ist immer weiß mit farbigen Flecken.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und Fellpflege mehr als einmal pro Woche, weist darauf hin, dass die Rasse haart und in einer Wohnung leben kann, und gibt ihre Lebenserwartung mit über 12 Jahren an. Die PDSA beschreibt sanfte, verspielte, sehr gehorsame Hunde, die mit allen gut auskommen und in jungem Alter Erziehung und Sozialisierung brauchen; sie schlägt Fellpflege zwei- bis dreimal pro Woche vor. PetMD ergänzt, dass Papillons täglich geistige Anregung brauchen, Trennungsangst entwickeln können und jeden Tag die Zähne geputzt bekommen sollten und dass sehr kleine Kinder einen so kleinen Hund versehentlich verletzen können.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Algarve-Wasserhund",
      text: [
        "Der Portugiesische Wasserhund stammt aus Portugal, wo er mit Fischern arbeitete. Der Standard des Royal Kennel Club beschreibt einen robusten, fast quadratischen, sehr muskulösen Hund – sehr intelligent und ungeheuer energiegeladen, ein hervorragender Schwimmer und Taucher – mit 50–57 cm (Rüden) und 43–52 cm (Hündinnen) Höhe und 19–25 kg (Rüden) und 16–22 kg (Hündinnen) Gewicht. Sein üppiges, einlagiges Fell hat keine Unterwolle und ist schwarz, weiß, braun oder schwarz bzw. braun mit Weiß; bei der traditionellen Löwenschur bleiben Fang und Hinterhand kurz.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und tägliche Fellpflege, weist darauf hin, dass die Rasse nicht haart und zu einem großen Haus passt, und gibt ihre Lebenserwartung mit über 10 Jahren an. Die PDSA beschreibt sehr freundliche, liebevolle Hunde, die gut mit anderen Haustieren auskommen, ausgezeichnete Familienhunde sind und in jungem Alter Erziehung und Sozialisierung brauchen; sie rät außerdem, das Fell im Lauf des Jahres bei einem professionellen Hundefriseur scheren und in Form schneiden zu lassen.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frise, Bichon Tenerife",
      text: [
        "Der Bichon Frisé ist ein französisch-belgischer Begleithund. Der FCI-Standard beschreibt einen fröhlichen kleinen Hund mit lebhaftem Gang und sehr lockerem, weißem, korkenzieherartig gelocktem Haar – ein echter Begleiter, den man überallhin mitnehmen kann, weder nervös noch ein häufiger Beller – mit 25–29 cm Widerristhöhe und etwa 5 kg Gewicht. Ein erwachsener Hund ist immer reinweiß, mit sehr dunklen, runden Augen, schwarzer Nase, Hängeohren und einer befederten, über dem Rücken getragenen Rute.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und tägliche Fellpflege, weist darauf hin, dass die Rasse nicht haart und in eine Wohnung passt, und gibt ihre Lebenserwartung mit über 12 Jahren an. Die PDSA beschreibt sehr anhängliche, liebevolle Hunde, die hervorragend mit Kindern und anderen Haustieren umgehen, und ergänzt, dass das Fell alle paar Monate geschnitten werden muss, oft von einem professionellen Hundefriseur.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfoundland, Newfie, Newf",
      text: [
        "Der Neufundländer stammt aus Kanada; die FCI führt ihn bei den Molossern vom Berghundtyp und erkennt drei Farben an: Schwarz, Weiß-Schwarz (Landseer) und Braun. Die PDSA nennt Neufundländer sanfte Riesen und gibt eine durchschnittliche Höhe von 66–71 cm und ein durchschnittliches Gewicht von 50–69 kg an; PetMD ergänzt, dass sie durch die Geschichte der Rasse geborene Schwimmer sind.",
        "Die PDSA empfiehlt für erwachsene Hunde mindestens eine Stunde Bewegung pro Tag, Welpen aber nicht zu überlasten, solange sich ihre Knochen und Gelenke noch entwickeln; sie nennt die Fellpflege eine tägliche Aufgabe, weist darauf hin, dass Neufundländer zum Sabbern neigen, und gibt die Lebenserwartung mit unter 10 Jahren an. PetMD nennt die Rasse einen hervorragenden Familienhund, der gut mit Kindern, kleinen Haustieren und anderen Hunden auskommt, rät, kleine Kinder bei jedem Hund zu beaufsichtigen, und warnt, dass manche Trennungsangst entwickeln können, wenn sie allein bleiben.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Dalmatian, Carriage Dog, Kutschenhund",
      text: [
        "Der Dalmatiner stammt aus Kroatien; die FCI führt ihn bei den mit den Laufhunden verwandten Rassen. Sein kurzes, glänzendes Fell ist reinweiß mit klar abgegrenzten schwarzen oder leberbraunen Tupfen, und der Standard verlangt getupfte Ohren. Die FCI gibt eine Höhe von 56–62 cm für Rüden und 54–60 cm für Hündinnen an; die PDSA gibt ein durchschnittliches Gewicht von 18–27 kg an.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Bürsten einmal pro Woche und sagt, dass die Rasse haart und zu einem großen Haus mit Garten passt. Die PDSA nennt Dalmatiner großartige Hunde für aktive Haushalte, die besser zu älteren Kindern passen, Gesellschaft brauchen und nie länger als vier Stunden allein bleiben sollten; sie nennt Taubheit unter den Gesundheitsproblemen der Rasse und weist darauf hin, dass es einen BAER-Hörtest gibt.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "Der Australian Cattle Dog stammt aus Australien; die FCI führt ihn bei den Treibhunden. Der Standard des Kennel Club beschreibt einen kräftigen, kompakten Arbeitshund mit glattem, wetterfestem doppeltem Fell in Blau (gesprenkelt oder getüpfelt) oder gleichmäßig rot getüpfelt und gibt eine Höhe von 46–51 cm für Rüden und 43–48 cm für Hündinnen an; die PDSA gibt ein durchschnittliches Gewicht von 16–20 kg an.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Bürsten einmal pro Woche und sagt, dass die Rasse haart. Die PDSA beschreibt einen sehr intelligenten, energiegeladenen Hund, der viel körperliche und geistige Beschäftigung braucht; wegen seines starken Hütetriebs kann er rennenden Kindern in die Fersen zwicken, und Sozialisierung und Erziehung in jungem Alter helfen.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap Dog",
      text: [
        "Der Whippet stammt aus Großbritannien; die FCI führt ihn bei den kurzhaarigen Windhunden. Der Standard des Kennel Club beschreibt eine ausgewogene Verbindung von Muskelkraft und Stärke mit eleganter, anmutiger Linie, ein feines, kurzes, anliegendes Fell in jeder Farbe oder Farbmischung außer Merle und ein sanftes, anhängliches, ausgeglichenes Wesen; er gibt eine Höhe von 47–51 cm für Rüden und 44–47 cm für Hündinnen an, und die PDSA gibt ein durchschnittliches Gewicht von 11–18 kg an.",
        "Die PDSA empfiehlt mindestens eine Stunde Bewegung jeden Tag, mit Gelegenheiten, in einem sicheren Bereich ohne Leine zu rennen, und einmal pro Woche Bürsten mit einer weichen Bürste. Sie nennt Whippets eine beliebte Wahl für Familien, weil sie ruhig und sanft im Umgang mit Kindern sind, empfiehlt aber ein Zuhause mit etwas älteren Kindern; Whippets bleiben nicht gern allein und haben einen sehr starken Jagdtrieb, deshalb empfiehlt die PDSA nicht, sie mit kleineren Haustieren zu halten. Im Winter kann ein Mantel helfen, und ein dickes, weiches Bett schützt ihre hervorstehenden Knochen.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Korthals Griffon, Griffon d'arrêt à poil dur Korthals, Wirehaired Pointing Griffon, Griff",
      text: [
        "Der Korthals-Griffon (Wirehaired Pointing Griffon) stammt aus Frankreich; die FCI führt ihn bei den kontinentalen Vorstehhunden und nennt ihn im Wesentlichen einen vielseitigen Vorstehhund. Der FCI-Standard beschreibt einen kraftvollen, robusten Hund, der länger als hoch ist, mit hartem, rauem Fell, das nie lockig oder wollig ist, einer stets braunen Nase und vorzugsweise stahlgrauem Fell mit braunen (leberbraunen) Platten; er gibt eine Höhe von etwa 55–60 cm für Rüden und 50–55 cm für Hündinnen an und nennt die Rasse sanft, stolz und sehr sanft im Umgang mit Kindern. PetMD gibt ein Gewicht von 35–70 Pfund (etwa 16–32 kg) an.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag, ein großes Haus mit großem Garten und Fellpflege mehr als einmal pro Woche. PetMD rät zu wöchentlichem Bürsten (manche Hunde müssen auch von Hand getrimmt werden), sagt, dass Griffons im Allgemeinen geduldig und sanft mit Kindern sind, wenn sie als Welpen sozialisiert wurden, und weist darauf hin, dass ihnen ihre Jagdgeschichte einen starken Jagdtrieb geben kann, sodass kleinere Tiere wie Katzen und Kaninchen wie Beute wirken können.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie",
      text: [
        "Der Chesapeake Bay Retriever, oft Chessie genannt, stammt aus den USA; die FCI führt ihn bei den Apportierhunden. Der FCI-Standard beschreibt einen Apportierhund für die Arbeit, der an Land und im Wasser gleich tüchtig ist, dessen Größe und Substanz nicht übertrieben sein sollen, mit dickem, kurzem Fell über dichter, wolliger Unterwolle und klaren gelblichen oder bernsteinfarbenen Augen; jeder Braunton, Sedge oder Deadgrass ist zulässig, ein schwarzes Fell führt zum Ausschluss. Er gibt eine Höhe von 58–66 cm und ein Gewicht von 29,5–36,5 kg für Rüden an und 53–61 cm und 25–32 kg für Hündinnen.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag, ein großes Haus mit großem Garten und Fellpflege einmal pro Woche. PetMD beschreibt einen aufgeweckten, fröhlichen und äußerst anhänglichen Hund, der zerstörerisch werden kann, wenn er nicht gefordert wird oder zu lange allein bleibt, sagt, dass Chessies bei richtigem Kennenlernen und guter Sozialisierung eine tolle Bereicherung für eine Familie sind, und rät, den Hund nicht direkt vor oder nach dem Fressen zu bewegen.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Samoyed, Sammy",
      text: [
        "Der Samojede stammt aus Nordrussland und Sibirien; die FCI führt ihn bei den nordischen Schlittenhunden. Der FCI-Standard beschreibt einen weißen, eleganten arktischen Spitz mittlerer Größe mit üppigem, dickem, dichtem Polarfell, dunkelbraunen Augen, kleinen, dicken, aufrechten Ohren und Lefzen, die in den Mundwinkeln leicht nach oben gezogen sind – das typische „Samojeden-Lächeln“; das Fell ist reinweiß, creme oder weiß mit Biskuit, und blaue oder verschiedenfarbige Augen führen zum Ausschluss. Er gibt eine ideale Höhe von 57 cm für Rüden und 53 cm für Hündinnen an, jeweils mit einer Toleranz von 3 cm.",
        "Die PDSA empfiehlt mindestens zwei Stunden Bewegung jeden Tag und tägliche Fellpflege, sagt, dass Samojeden sehr häufig haaren, meist großartig mit Kindern und der ganzen Familie treu sind, nie länger als vier Stunden allein bleiben sollten, als geschickte Ausbrecher einen sehr sicheren Garten brauchen und einen starken Jagdtrieb haben, und rät zu einer Pause nach dem Fressen und vor der Bewegung. PetMD ergänzt, dass Samojeden schlecht mit hohen Temperaturen zurechtkommen.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Aberdeen Terrier",
      text: [
        "Der Scottish Terrier, oft Scottie genannt, stammt aus Großbritannien; die FCI führt ihn bei den kleinen Terriern. Der Standard des Kennel Club beschreibt einen gedrungenen, kurzbeinigen Hund mit aufmerksamer Haltung, der auf kleinem Raum große Kraft und Aktivität ausstrahlt, loyal und treu, würdevoll, unabhängig und zurückhaltend, aber mutig und sehr intelligent – kühn, aber nie aggressiv. Sein anliegendes doppeltes Fell hat ein hartes, drahtiges Deckhaar; die Farbe ist Schwarz, Weizenfarben oder Gestromt in jeder Schattierung. Er gibt eine Höhe von 25–28 cm und ein Gewicht von 8,5–10,5 kg an.",
        "Die PDSA sagt, dass Scotties etwa eine Stunde Bewegung täglich und tägliche Fellpflege brauchen, mit Trimmen und Scheren bei einem professionellen Hundefriseur alle zwei bis drei Monate, beschreibt sie als loyal und ihrer Familie ergeben und sagt, dass sie stur sein können, sodass die Erziehung Geduld und Einsatz braucht. PetMD sagt, dass sie mit der richtigen Erziehung und Sozialisierung gute Familienhunde sein können, dass die Sozialisierung des Welpen wichtig ist und dass sie nicht über längere Zeit allein bleiben sollten.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner Pointer, Weim",
      text: [
        "Der Weimaraner stammt aus Deutschland; die FCI führt ihn bei den kontinentalen Vorstehhunden und erkennt eine kurzhaarige und eine langhaarige Varietät an. Der FCI-Standard beschreibt einen mittelgroßen bis großen Jagdhund vom funktionellen Gebrauchstyp, sehnig und sehr muskulös, mit bernsteinfarbenen Augen und breiten, recht langen Ohren; das Fell ist silber-, reh- oder mausgrau, nur kleine weiße Abzeichen an Brust und Zehen sind erlaubt, und jede andere Farbe als Grau führt zum Ausschluss. Er gibt eine Höhe von 59–70 cm und ein Gewicht von etwa 30–40 kg für Rüden an und 57–65 cm und etwa 25–35 kg für Hündinnen.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag, ein großes Haus mit großem Garten und Fellpflege einmal pro Woche. Die PDSA sagt, dass Weimaraner in den richtigen Händen wunderbare Familienhunde sind und am besten zu Haltern passen, die die Rasse kennen, empfiehlt sie aber wegen ihres sehr starken Jagdtriebs nicht für Haushalte mit kleineren Kindern oder kleineren Haustieren, sagt, dass sie Trennungsangst entwickeln können, wenn sie allein bleiben, und rät, sie von klein auf zu sozialisieren und zwischen Fressen und Bewegung eine Pause einzulegen. PetMD empfiehlt zusätzlich, einmal im Monat die Ohren zu reinigen und den Hund zu baden.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "Das Italienische Windspiel stammt aus Italien; die FCI führt es als Piccolo Levriero Italiano bei den kurzhaarigen Windhunden. Der Standard des Kennel Club beschreibt einen Greyhound im Kleinformat, in allen Proportionen schlanker, elegant, anmutig und schnell, intelligent, anhänglich und lebhaft, auch wenn es distanziert wirken kann, mit kurzem, feinem, glänzendem Fell über feiner Haut. Er gibt eine Höhe von 32–38 cm und ein Gewicht von 3,6–4,5 kg an; Schwarz, Blau, Creme, Falb, Rot und Weiß oder jede dieser Farben mit Weiß sind zulässig – nie Merle, Gestromt oder lohfarbene Abzeichen.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und sagt, dass die Rasse zu einem kleinen Haus in Stadt oder Land passt, einmal pro Woche Fellpflege braucht und nicht haart. Die PDSA sagt, dass Italienische Windspiele voller Energie sind, in einem abgegrenzten Bereich laufen sollten, weil sie schwer zurückzurufen sind, sobald sie Beute sehen, scheu sein können, sodass frühe Sozialisierung unverzichtbar ist, und – weil ihre Knochen im Wachstum zerbrechlich sind – vielleicht nicht die ideale Rasse für Haushalte mit kleinen Kindern oder anderen Haustieren sind. PetMD ergänzt, dass ihr dünnes Fell sie nicht warm hält, sodass sie leicht frieren.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Giant Schnauzer, Münchener Schnauzer",
      text: [
        "Der Riesenschnauzer stammt aus Deutschland; die FCI führt ihn bei den Pinschern und Schnauzern. Der Standard des Royal Kennel Club beschreibt einen kräftig gebauten, robusten, sehnigen Hund, der fast quadratisch wirkt, kühn, verlässlich, gutmütig und gelassen, mit hartem, drahtigem Deckhaar und guter Unterwolle. Er gibt eine Höhe von 65–70 cm für Rüden und 60–65 cm für Hündinnen an; der FCI-Standard gibt ein Gewicht von 35–47 kg an. Reines Schwarz, Pfeffer-Salz mit dunkler Gesichtsmaske und Schwarz-Silber sind zulässig – jede andere Farbe nicht.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und sagt, dass die Rasse zu einem großen Haus mit großem Garten passt, tägliche Fellpflege braucht und nicht haart. Die PDSA sagt, dass das Fell tägliche Pflege und regelmäßiges Trimmen braucht, dass Riesenschnauzer liebenswerte Hunde für Familien mit älteren Kindern sein können, wenn sie als Welpen gut sozialisiert wurden, und dass diese willensstarken Hunde zu erfahrenen Haltern passen. PetMD ergänzt, dass das Fell alle paar Monate professionell von Hand getrimmt wird und dass die Rasse schlecht in Haushalten zurechtkommt, in denen selten jemand zu Hause ist.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Chien de Saint-Hubert, St.-Hubertus-Hund, Sleuth Hound",
      text: [
        "Der Bloodhound stammt aus Belgien, wo die FCI ihn als Chien de Saint-Hubert führt, einen großen Laufhund. Der FCI-Standard beschreibt den kräftigsten aller Laufhunde: sanft, ruhig, freundlich und gesellig mit Menschen und besonders an seinen Halter gebunden, mit kurzem, dichtem, wetterfestem Fell und geschmeidiger, lockerer Haut. Rüden wiegen etwa 46–54 kg und Hündinnen etwa 40–48 kg; die drei Farben sind Schwarz-Loh, Leberbraun-Loh und Rot.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und sagt, dass die Rasse zu einem großen Haus mit großem Garten passt, einmal pro Woche Fellpflege braucht und haart. Die PDSA sagt, dass Bloodhounds besser zu erfahrenen Haltern passen, wegen ihrer Größe und ihres sehr starken Jagdtriebs nicht für Haushalte mit kleineren Kindern oder kleineren Haustieren empfohlen werden, sabbern und dass ihre Hautfalten sauber und trocken gehalten werden müssen. Sie rät außerdem, zwischen Fressen und Bewegung eine Pause einzulegen.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita, American Akita, Großer Japanischer Hund",
      text: [
        "Der Akita in diesem Register ist der amerikanische Typ: Die FCI führt ihn als Amerikanischen Akita, eine Rasse japanischen Ursprungs, getrennt vom japanischen Akita Inu. Der FCI-Standard beschreibt einen großen, kräftig gebauten, ausgewogenen Hund mit viel Substanz und schweren Knochen, kleinen Stehohren und einer großen, über dem Rücken getragenen Rute; Rüden messen 66–71 cm am Widerrist. Jede Farbe ist erlaubt, etwa Rot, Falb, Weiß, Gescheckt (Pinto) oder Gestromt. Die PDSA gibt ein durchschnittliches Gewicht von 31–59 kg an.",
        "Die PDSA beschreibt unglaublich treue Familienhunde, die unabhängig und sehr groß sind und deshalb am besten zu erfahrenen Haltern passen; für einen Haushalt mit kleinen Kindern würde sie einen Akita nicht empfehlen, und sie rät davon ab, Akitas allein zu lassen, da viele damit schlecht zurechtkommen. Sie empfiehlt mindestens zwei Stunden Bewegung jeden Tag, Sozialisierung von klein auf, eine Pause zwischen Fressen und Bewegung und mindestens einmal pro Woche Bürsten – Akitas haaren stark. Sie weist außerdem auf einen starken Jagdtrieb hin und darauf, dass sie bei sehr heißem Wetter überhitzen können.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Cardigan Welsh Corgi, Cardi",
      text: [
        "Der Welsh Corgi Cardigan stammt aus Großbritannien; die FCI führt ihn bei den Treibhunden. Der Standard des American Kennel Club gibt eine Widerristhöhe von 10,5–12,5 Zoll (etwa 27–32 cm) und ein Idealgewicht von 30–38 Pfund (etwa 14–17 kg) für Rüden an. Anders als sein Verwandter, der Pembroke, hat er eine lange, buschige Rute.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag, nennt ein kleines Haus mit kleinem oder mittelgroßem Garten als ausreichend und sagt, dass die Rasse mehr als einmal pro Woche Fellpflege braucht und haart; er gibt eine Lebenserwartung von über 12 Jahren an und führt den Cardigan als gefährdete einheimische Rasse. Die PDSA sagt, dass Welsh Corgis gefallen wollen, sodass die Erziehung recht leicht sein sollte, dass zwei- bis dreimal Bürsten pro Woche meist reicht und dass sie rennenden Kindern in die Fersen zwicken können – Sozialisierung mit Kindern und Erziehung in jungem Alter helfen.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Drahthaar, German Wirehaired Pointer, GWP",
      text: [
        "Der Deutsch Drahthaar stammt aus Deutschland; die FCI führt ihn bei den kontinentalen Vorstehhunden. Der Standard des Royal Kennel Club beschreibt einen mittelgroßen Jagdhund mit Drahthaar, das die Haut vollständig bedeckt – sanft, anhänglich und ausgeglichen, aufmerksam, führig und sehr treu. Rüden messen 60–67 cm und wiegen 25–34 kg; Hündinnen messen 56–62 cm und wiegen 20,5–29 kg. Braun-Weiß (Leberbraun mit Weiß), einfarbig Braun und Schwarz-Weiß sind die Standardfarben.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und sagt, dass er zu einem großen Haus mit großem Garten auf dem Land passt, mehr als einmal pro Woche Fellpflege braucht und haart. PetMD sagt, dass Drahthaar viel Bewegung und geistige Anregung brauchen, eine enge Bindung an ihre Familie aufbauen und bei früher Erziehung und Sozialisierung tolle Familienhunde sein können, gut mit Kindern zurechtkommen, die gelernt haben, sich Tieren gegenüber richtig zu verhalten, nie lange allein bleiben sollten und einen starken Jagdtrieb haben. Das Fell wird zweimal im Jahr von Hand getrimmt.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "St. Bernhardshund, Saint Bernard, St. Bernard",
      text: [
        "Der Bernhardiner stammt aus der Schweiz; die FCI führt ihn als St. Bernhardshund bei den Molossern vom Berghundtyp. Der FCI-Standard beschreibt einen von Natur aus freundlichen Hund, ruhig bis lebhaft und wachsam, und erkennt zwei Varietäten an: Kurzhaar mit dichtem, glattem, anliegendem Fell und Langhaar. Rüden messen mindestens 70 cm und Hündinnen mindestens 65 cm, bis zu 90 bzw. 80 cm; die PDSA gibt ein Gewicht von 54–81 kg an.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und sagt, dass die Rasse zu einem großen Haus mit großem Garten passt, mehr als einmal pro Woche Fellpflege braucht, haart und meist keine zehn Jahre alt wird. Die PDSA sagt, dass Bernhardiner es lieben, mit einer Familie zusammen zu sein, und großartig mit Menschen jeden Alters sind, auch mit Kindern, dass sie als Welpen gut sozialisiert werden sollten, mindestens dreimal pro Woche gebürstet werden müssen, sabbern, Hitze weniger gut vertragen und eine Pause zwischen Fressen und Bewegung brauchen. PetMD ergänzt, dass diese menschenbezogenen Hunde Trennungsangst entwickeln können, wenn sie lange allein bleiben.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffordshire Bull Terrier, Staffie, Staffy, Stafford",
      text: [
        "Der Staffordshire Bullterrier stammt aus Großbritannien; die FCI führt ihn bei den bullartigen Terriern. Der FCI-Standard beschreibt einen kurzhaarigen, ausgewogenen Hund von großer Kraft für seine Größe – traditionell von unbezähmbarem Mut und Hartnäckigkeit, sehr intelligent und anhänglich, besonders gegenüber Kindern. Er misst 35,5–40,5 cm; Rüden wiegen 12,7–17 kg und Hündinnen 11–15,4 kg. Es gibt ihn in Gestromt, Rot, Falb, Schwarz, Blau oder Weiß, einfarbig oder mit Weiß.",
        "Der Royal Kennel Club nennt ihn einen wunderbaren Familienhund und empfiehlt bis zu einer Stunde Bewegung pro Tag; er braucht einmal pro Woche Fellpflege, haart und wird meist über 12 Jahre alt. Die PDSA sagt, dass Staffies tolerant und liebenswert mit Kindern sind, als menschenbezogene Hunde aber bekanntermaßen unter Trennungsangst leiden, wenn sie allein bleiben, dass sie bekannt dafür sind, Dinge zu zerkauen, und dass kleinere Haustiere wegen ihres sehr starken Jagdtriebs keine gute Idee in ihrer Nähe sind.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "König der Terrier, Waterside Terrier, Bingley Terrier",
      text: [
        "Der Airedale Terrier stammt aus Großbritannien; die FCI führt ihn bei den großen und mittelgroßen Terriern. Der FCI-Standard nennt ihn den größten der Terrier – einen muskulösen, aktiven, recht gedrungenen Hund, der kontaktfreudig und selbstsicher, freundlich, mutig und intelligent ist, jederzeit aufmerksam, nicht aggressiv, aber furchtlos. Rüden messen etwa 58–61 cm und Hündinnen etwa 56–59 cm. Sein hartes, dichtes, drahtiges Fell ist lohfarben mit schwarzem oder grau meliertem Sattel.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag; das Fell braucht tägliche Pflege und haart nicht, und die Rasse wird meist über 10 Jahre alt. PetMD beschreibt großartige Familienhunde, die bei guter Erziehung im Allgemeinen gut mit Kindern auskommen, aber nicht zu lange sich selbst überlassen werden sollten; PetMD rät, das Fell ein paarmal pro Woche zu bürsten, jede Woche kurz die Ohren zu reinigen und drei- bis viermal im Jahr einen professionellen Hundefriseur aufzusuchen.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Russell Terrier (AKC), Jack Russell, JRT",
      text: [
        "Der Jack Russell Terrier – der American Kennel Club nennt ihn Russell Terrier – stammt aus England und wurde in Australien weiterentwickelt; die FCI führt ihn bei den kleinen Terriern. Sein Standard beschreibt einen kräftigen, aktiven, wendigen Arbeitsterrier mit viel Charakter: lebhaft, aufmerksam und aktiv, kühn und furchtlos, freundlich, aber still selbstsicher. Er misst 25–30 cm und wiegt etwa 5–6 kg. Sein glattes, gebrochenes oder raues Fell ist überwiegend weiß mit schwarzen und/oder lohfarbenen Abzeichen.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege einmal pro Woche; die Rasse haart und wird meist über 10 Jahre alt. Die PDSA beschreibt kluge, lebhafte Hunde, die gute Familienhunde sein können, wenn sie von klein auf erzogen und sozialisiert werden, aber besser zu Familien mit etwas älteren Kindern passen; sie haben einen sehr starken Jagdtrieb, sodass kleinere Haustiere nicht empfohlen werden, und sie graben leidenschaftlich gern.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Der Bullmastiff ist eine alte englische Wachhunderasse aus dem 19. Jahrhundert, die von Bulldog und Old English Mastiff abstammt; die FCI führt ihn bei den Molossern. Sein Standard beschreibt einen kräftigen, symmetrischen Hund, der große Stärke zeigt, ohne schwerfällig zu sein – ausdauernd, aktiv, verlässlich, temperamentvoll, aufmerksam und treu. Rüden messen 64–69 cm und wiegen 50–59 kg, Hündinnen 61–66 cm und 41–50 kg. Das kurze, harte Fell kommt in jeder Schattierung von Falb, Rot oder Gestromt vor, immer mit schwarzem Fang.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege einmal pro Woche, und die Rasse wird meist keine 10 Jahre alt. Die PDSA beschreibt sehr treue Hunde, die wegen ihrer Größe und Kraft besser zu Haushalten nur mit Erwachsenen oder zu Familien mit älteren Kindern passen; sie brauchen frühe Sozialisierung, idealerweise ständig jemanden zu Hause, haben einen sehr starken Jagdtrieb, sabbern viel und brauchen eine Pause zwischen Fressen und Bewegung.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chinese Crested, Powder Puff",
      text: [
        "Der Chinesische Schopfhund ist ein kleiner, aktiver und anmutiger Begleithund aus China; die FCI führt ihn bei den Nackthunden. Es gibt ihn in zwei Varietäten: den Hairless mit glattem, nacktem Körper und Haar nur am Kopf (dem Schopf), an den Pfoten und an der Rute, und den Powder Puff, ganz von einem Schleier aus langem, weichem Haar bedeckt. Rüden messen 28–33 cm und Hündinnen 23–30 cm; PetMD gibt ein Gewicht von 8–12 Pfund (3,6–5,4 kg) an. Jede Farbe außer Merle ist erlaubt, und sein Wesen wird als fröhlich, nie bösartig beschrieben.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung pro Tag und Fellpflege einmal pro Woche; er passt in eine Wohnung, und die Rasse wird meist über 12 Jahre alt. PetMD beschreibt einen freundlichen Hund, der in die meisten Familien passt, auch in solche mit Kindern und anderen Haustieren – jeder Umgang mit Kindern sollte beaufsichtigt werden. Die nackte Haut braucht Schutz vor Sonne und Kälte, die Krallen sollten jede Woche kontrolliert werden, und Welpen brauchen frühe, konsequente Sozialisierung.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "Der Nova Scotia Duck Tolling Retriever – der Toller – ist ein Apportierhund aus Kanada; sein FCI-Standard beschreibt, wie er am Ufer in voller Sicht der Enten rennt und spielt, um sie anzulocken, und dann ausgeschickt wird, um die Vögel zu apportieren. Der Standard beschreibt einen mittelgroßen, kräftigen, kompakten und gut bemuskelten Hund, der sehr intelligent und leicht zu erziehen ist und große Ausdauer hat. Die FCI gibt für Rüden 48–51 cm und 20–23 kg an, für Hündinnen 45–48 cm und 17–20 kg. Das wasserabweisende doppelte Fell kommt in verschiedenen Rot- oder Orangetönen vor, meist mit Weiß an Rutenspitze, Pfoten, Brust oder als Blesse.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Fellpflege mehr als einmal pro Woche, und die Rasse haart; PetMD rät, ein- bis zweimal pro Woche zu bürsten. Eine große britische Studie (McMillan 2024, über Dogs Trust) gibt eine mediane Lebenserwartung von 13,2 Jahren an, PetMD 12–14 Jahre, und wie andere mittelgroße Hunde ist er mit etwa 12–15 Monaten ausgewachsen (PetMD). Der AKC beschreibt sehr anhängliche Hunde, die meist gut mit Kindern sind, viel körperliche Bewegung und geistige Anregung brauchen, gegenüber kleineren Tieren einen starken Jagdtrieb haben können und von früher Sozialisierung und Welpenkursen profitieren.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "Der Cairn Terrier stammt aus Großbritannien; die FCI führt ihn bei den kleinen Terriern. Der Standard des Kennel Club beschreibt einen wendigen, aufmerksamen Terrier von arbeitstüchtigem, natürlichem Aussehen – aktiv, schneidig und robust, mit furchtlosem und fröhlichem Wesen, selbstbewusst, aber nicht aggressiv. Sein wetterfestes doppeltes Fell hat ein üppiges, hartes Deckhaar; die Farbe ist Creme, Weizenfarben, Rot, Grau oder fast Schwarz, Gestromung ist zulässig, und dunkle Ohren und Fang sind typisch. Er gibt eine Höhe von etwa 28–31 cm und ein Idealgewicht von 6–7,5 kg an.",
        "Die PDSA empfiehlt mindestens eine Stunde Bewegung pro Tag und sagt, dass Cairns grenzenlose Energie und einen starken Jagdinstinkt haben, sodass sie früh mit Katzen und anderen kleinen Haustieren sozialisiert werden müssen und ohne Leine Vorsicht geboten ist, und dass sie, einmal sozialisiert, sehr gut mit Kindern auskommen und ausgezeichnete Familienhunde sind. Sie rät, das Fell zweimal im Jahr von Hand zu trimmen und es ein- bis zweimal pro Woche zu pflegen; Dogs Trust sagt, dass sie sehr wenig haaren. Eine große britische Studie (McMillan 2024, über Dogs Trust) gibt eine mediane Lebenserwartung von 14,0 Jahren an, PetMD 13–15 Jahre, und wie andere kleine Hunde ist er mit etwa 9–12 Monaten ausgewachsen (PetMD). PetMD ergänzt, dass sie viel Bewegung und geistige Anregung brauchen.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bull Terrier, English Bull Terrier, Bully",
      text: [
        "Der Bullterrier stammt aus Großbritannien; die FCI führt ihn bei den bullartigen Terriern (Gruppe 3). Er ist ein mittelgroßer, kurzhaariger Terrier: Die PDSA gibt eine durchschnittliche Höhe von 51–61 cm und ein durchschnittliches Gewicht von 22–31 kg an, und PetMD beschreibt einen athletischen Körperbau von etwa 21–22 Zoll und 50–70 Pfund. PetMD nennt regelmäßige Bewegung ein Muss und sagt, dass Bullterrier anhänglich gegenüber der Familie sind, auch gegenüber Kindern, aber nicht immer freundlich zu anderen Hunden oder Katzen, und dass frühe und häufige Sozialisierung und Erziehung entscheidend sind.",
        "Die PDSA empfiehlt mindestens eine Stunde Bewegung pro Tag, über den Tag verteilt, und eine Pause nach den Mahlzeiten vor der Bewegung. Sie sagt, dass ein gut sozialisierter Bullterrier mit Menschen jeden Alters auskommt, aber, da er etwas aufgeregt sein kann, besser zu älteren Kindern passt; er mag so viel Gesellschaft wie möglich und hat einen starken Jagdtrieb, sodass bei Katzen und anderen kleinen Tieren Vorsicht geboten ist. Einmal Bürsten pro Woche reicht für das Fell. Die PDSA gibt eine durchschnittliche Lebenserwartung von über 10 Jahren an und PetMD 12–13 Jahre; wie andere mittelgroße Hunde ist er mit etwa 12–15 Monaten ausgewachsen (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Miniature Pinscher, Min Pin",
      text: [
        "Der Zwergpinscher stammt aus Deutschland; die FCI führt ihn bei den Pinschern und Schnauzern (Gruppe 2) und beschreibt ihn als verkleinertes Abbild des Deutschen Pinschers – lebhaft, temperamentvoll, selbstsicher und ausgeglichen. Sein Fell ist kurz, dicht, glatt und glänzend, entweder einfarbig hirschrot bis dunkel rotbraun oder schwarz mit Loh, und seine Rute ist natürlich. Der FCI-Standard gibt eine Höhe von 25–30 cm und ein Gewicht von 4–6 kg für Rüden und Hündinnen an; wie andere Zwerghunde ist er mit etwa 8–12 Monaten ausgewachsen (PetMD).",
        "Die PDSA empfiehlt für diese energiegeladenen, geschäftigen kleinen Hunde bis zu einer halben Stunde Bewegung pro Tag, sagt, dass es meist genügt, das Fell einmal pro Woche zu bürsten, und weist darauf hin, dass sie stur und unabhängig sein können, sodass die Erziehung Übung und Geduld braucht. PetMD sagt, dass sie mit der richtigen Sozialisierung und Erziehung ausgezeichnete Familienhunde sein können. VCA beschreibt die Rasse als verspielt und sehr gut mit Kindern, wobei sehr kleine oder wilde Kinder sie beim groben Spiel verletzen können, und sagt, dass sie wegen ihres dünnen Fells und ihrer geringen Größe leicht auskühlt. Die PDSA gibt eine durchschnittliche Lebenserwartung von über 12 Jahren an und PetMD 12–16 Jahre.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Great Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "Der Pyrenäenberghund – in den USA Great Pyrenees genannt – stammt aus Frankreich; die FCI führt ihn bei den Molossern vom Berghundtyp (Gruppe 2) und beschreibt einen Hund von großer Statur, imposant und kräftig gebaut, aber nicht ohne eine gewisse Eleganz. Sein Fell ist weiß oder weiß mit Flecken in Dachsfarben, Wolfsgrau, Blassgelb oder Orange an Kopf und Ohren. Der FCI-Standard gibt eine Höhe von 70–80 cm für Rüden und 65–75 cm für Hündinnen an; die PDSA gibt ein durchschnittliches Gewicht von 40–50 kg an. Wie andere Riesenhunde ist er mit etwa 18–24 Monaten ausgewachsen (PetMD).",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und sagt, dass die Rasse zu einem großen Haus mit großem Garten passt, mehr als einmal pro Woche Fellpflege braucht und haart; er gibt eine Lebenserwartung von unter 10 Jahren an (PetMD und VCA nennen 10–12 Jahre). Die PDSA nennt sie sanfte Riesen – ruhige, gutmütige Hunde, die meist mit allen gut auskommen – und sagt, dass die Erziehung Geduld und belohnungsbasierte Methoden braucht. VCA sagt, dass der Pyrenäenberghund seiner Familie ergeben ist, besonders den Kindern, und dass frühe Sozialisierung sehr wichtig ist; PetMD sagt, dass er gut mit anderen Haustieren zusammenlebt, aber vielleicht am besten in Haushalte ohne kleinere Kinder passt, und rät, wegen des Risikos einer Magendrehung rund um die Mahlzeiten starke Bewegung zu vermeiden.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Soft Coated Wheaten Terrier, Wheaten Terrier, Wheaten, SCWT",
      text: [
        "Der Irish Soft Coated Wheaten Terrier stammt aus Irland; die FCI führt ihn unter diesem Namen bei den großen und mittelgroßen Terriern. Der Standard des Royal Kennel Club beschreibt einen mittelgroßen, kompakten, hochbeinigen Terrier mit weichem, seidigem, weizenfarbenem Fell, das in lockeren Locken oder Wellen fällt – gutmütig, temperamentvoll und schneidig, voller Selbstvertrauen und Humor. Die einzige Farbe ist ein gutes, klares Weizengelb. Die PDSA gibt eine durchschnittliche Höhe von 46–49 cm und ein durchschnittliches Gewicht von 16–20,5 kg an (der Standard des Kennel Club gibt für Rüden 16–20,5 kg an, für Hündinnen etwas weniger); wie andere mittelgroße Hunde ist er mit etwa 12–15 Monaten ausgewachsen (PetMD).",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und sagt, dass die Rasse zu einem kleinen Haus passt, tägliche Fellpflege braucht und nicht haart. Eine große britische Studie (McMillan 2024, über Dogs Trust) gibt eine mediane Lebenserwartung von 13,7 Jahren an; PetMD und VCA nennen 12–14 Jahre. Die PDSA nennt sie freundliche, vertrauenswürdige Hunde, die großartige Familienhunde sind, auch wenn sie etwas stur sein können. VCA sagt, dass sie dank ihres sanften, verspielten Wesens gut zu Kindern passen; PetMD sagt, dass der Umgang mit Kindern beaufsichtigt werden sollte, dass sie nicht gern lange allein bleiben, und rät zu professioneller Fellpflege alle vier bis sechs Wochen, etwa einem Bad im Monat und einer Ohrenreinigung alle ein bis zwei Wochen.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Irish Wolfhound, Wolfhound, Cú Faoil",
      text: [
        "Der Irische Wolfshund stammt aus Irland; die FCI führt ihn bei den rauhaarigen Windhunden. Die PDSA gibt eine durchschnittliche Höhe von 71–79 cm und ein durchschnittliches Gewicht von 40–55 kg an; wie andere Riesenhunde ist er mit etwa 18–24 Monaten ausgewachsen (PetMD). Der Royal Kennel Club stuft seine Größe als sehr groß ein und sagt, dass er zu einem großen Haus mit großem Garten auf dem Land passt.",
        "Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege mehr als einmal pro Woche und sagt, dass die Rasse haart. Der Kennel Club und die PDSA geben eine Lebenserwartung von unter 10 Jahren an; PetMD nennt 6–8 Jahre. Die PDSA empfiehlt die Rasse wegen ihrer Größe und Kraft nicht für Haushalte mit kleineren Kindern und wegen ihres starken Jagdtriebs nicht mit kleineren Haustieren und sagt, dass sie nie länger als vier Stunden allein bleiben sollte. PetMD rät, den Welpen vom ersten Tag im neuen Zuhause an zu sozialisieren, ihn direkt vor oder nach dem Fressen nicht zu bewegen (Magendrehung) und die Ohren alle zwei bis vier Wochen zu reinigen.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "AmStaff, Am Staff, Staffordshire Terrier",
      text: [
        "Der American Staffordshire Terrier stammt aus den USA; die FCI führt ihn bei den bullartigen Terriern. Sein Standard verlangt große Kraft für seine Größe und gibt eine Höhe von 46–48 cm für Rüden und 43–46 cm für Hündinnen an, aber kein Gewicht. PetMD nennt 40–70 Pfund (etwa 18–32 kg) für beide Geschlechter; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD).",
        "PetMD empfiehlt mindestens 60 Minuten Bewegung pro Tag und sagt, dass die Rasse geduldig und liebevoll mit Kindern ist, zu Trennungsangst neigen kann und dass ihr starker Jagdtrieb das Zusammenleben mit kleineren Hunden oder Katzen erschweren kann. Eine britische Studie (McMillan et al., 2024, in der Tabelle von Dogs Trust) gibt eine mediane Lebenserwartung von 12,5 Jahren an; PetMD nennt 12–16 Jahre. VCA empfiehlt wöchentliches Bürsten; PetMD rät, den Welpen zu sozialisieren, den Hund direkt nach einer Mahlzeit nicht zu bewegen (Magendrehung) und ihn etwa alle 4–6 Wochen zu baden und ihm die Ohren zu reinigen.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, Romagna-Wasserhund, Trüffelhund",
      text: [
        "Der Lagotto Romagnolo ist ein kleiner bis mittelgroßer Wasserhund mit lockigem Fell aus Italien, bekannt als Trüffelhund; die FCI führt ihn bei den Wasserhunden. Sein Standard gibt eine Höhe von 43–48 cm und ein Gewicht von 13–16 kg für Rüden an und 41–46 cm und 11–14 kg für Hündinnen; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD).",
        "Der Royal Kennel Club nennt ihn einen ausgezeichneten und aufmerksamen Familienbegleiter, empfiehlt mehr als zwei Stunden Bewegung pro Tag und Fellpflege mehr als einmal pro Woche, sagt, dass er nicht haart, und gibt eine Lebenserwartung von über 12 Jahren an; PetMD sagt, dass Lagotti 15–17 Jahre alt werden können. PetMD weist darauf hin, dass er ständige geistige und körperliche Anregung und umfassende Sozialisierung braucht, da er scheu sein kann; Woodgreen sagt, dass er Schwierigkeiten haben kann, wenn er zu oft allein bleibt, und empfiehlt professionelle Fellpflege alle sechs bis acht Wochen.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Malamute, Mal, Alaskan Mal",
      text: [
        "Der Alaskan Malamute ist einer der ältesten arktischen Schlittenhunde: ein kräftiger, substanzvoll gebauter nordischer Schlittenhund aus den USA mit dickem, derbem Fell. Der FCI-Standard gibt als erwünschte Größen 63,5 cm und 38 kg für Rüden und 58,5 cm und 34 kg für Hündinnen an; die PDSA nennt 58–64 cm und 34–39 kg. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD), und die PDSA gibt eine Lebenserwartung von über 10 Jahren an (PetMD: 10–14 Jahre).",
        "Die PDSA empfiehlt jeden Tag mindestens zwei Stunden intensive Bewegung und tägliches Bürsten und sagt, dass Malamutes stark haaren, einen sehr starken Jagdtrieb haben, nicht länger als vier Stunden allein bleiben sollten und zu aktiven Erwachsenen oder Familien mit älteren Kindern passen; für Ersthalter nennt sie sie anspruchsvoll. PetMD rät, die Ohren einmal pro Woche zu kontrollieren und alle 6–8 Wochen zu baden, und weist darauf hin, dass ihnen heißes Wetter wegen des dicken Fells schwerfällt.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Kongohund, Afrikanischer bellloser Hund",
      text: [
        "Der Basenji ist ein leicht gebauter Jagdhund mit feinen Knochen aus Zentralafrika, der nicht bellt, sondern einen eigenen jodelnden Laut von sich gibt; die FCI führt ihn bei den Hunden vom Urtyp. Die PDSA gibt eine Höhe von 40–43 cm und ein Gewicht von 9–11 kg an. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD), und die PDSA gibt eine Lebenserwartung von über 12 Jahren an (WebMD: 13–14 Jahre).",
        "Die PDSA empfiehlt mindestens eine Stunde Bewegung pro Tag (etwa 60–90 Minuten), viel geistige Anregung und Bürsten einmal pro Woche; sie nennt Basenjis distanziert, aber vertrauenswürdig, eigenwillig und mit sehr schlechtem Gespür für den Straßenverkehr. WebMD sagt, dass sie allem nachjagen, was wie Beute aussieht, sehr hohe Zäune oder ständige Aufsicht brauchen und mit kleinen Kindern nur mäßig gut zurechtkommen, und rät, die Ohren wöchentlich zu reinigen und die Zähne mindestens zweimal pro Woche zu putzen.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "Großer Schweizer Sennenhund, Greater Swiss Mountain Dog, Swissy",
      text: [
        "Der Große Schweizer Sennenhund ist ein kräftiger, schwerknochiger und gut bemuskelter dreifarbiger Zughund aus der Schweiz: schwarz mit symmetrischen braunen und weißen Abzeichen. Der FCI-Standard gibt eine Widerristhöhe von 65–72 cm für Rüden und 60–68 cm für Hündinnen an, aber kein Gewicht; WebMD nennt 52–64 kg für Rüden und 39–50 kg für Hündinnen. Ein Hund dieser Größe ist mit etwa 18–24 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an (PetMD: 8–11 Jahre).",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung pro Tag und Bürsten einmal pro Woche; er sagt, dass die Rasse haart und ein großes Haus mit großem Garten braucht. PetMD nennt die Rasse einen großartigen Familienhund, der sanft mit Kindern umgeht (jeder Kontakt sollte beaufsichtigt werden), rät, die Ohren wöchentlich zu reinigen und den Hund wegen der Gefahr einer Magendrehung (GDV) nicht direkt vor oder nach dem Fressen zu bewegen; WebMD rät, täglich die Zähne zu putzen und Leckerlis knapp zu halten, da die Rasse zu Übergewicht neigt.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "British Shorthair, British Blue",
      text: [
        "Die Britisch Kurzhaar ist eine stämmige Katze mit dichtem Fell und großen, runden Augen – die CFA nennt sie eine „Teddybär“-Katze. Die meisten stellen sie sich blaugrau vor, es gibt sie aber in einer Reihe von Farben und Mustern. Sie reift langsam: Laut CFA erreicht sie ihre volle Größe mit etwa drei Jahren, laut VCA kann die körperliche Reife bis zu fünf Jahre dauern.",
        "Die CFA beschreibt sie als sehr anhänglich und ihren Menschen verbunden; sie versteht sich mit allen im Haushalt, unabhängig vom Alter, lässt sich aber meist nicht gern tragen, und sie hat schon mit Hunden, Kaninchen und Vögeln zusammengelebt. VCA beschreibt ein mäßiges Aktivitätsniveau und rät, das Fell mindestens wöchentlich zu kämmen. Rassekätzchen ziehen meist mit 12–13 Wochen in ihr neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag Doll",
      text: [
        "Die CFA beschreibt die Ragdoll als große, gelassene Katze mit halblangem, plüschigem und seidigem Fell und blauen Augen. Ihre dunkleren „Points“ gibt es in mehreren Mustern – Colourpoint ohne Weiß, Mitted mit weißen Pfoten, Bicolour mit mehr Weiß und Van. Sie reift langsam: Ihre volle Fellfarbe erreicht sie mit zwei Jahren, ihre volle Größe und ihr volles Gewicht mit etwa vier Jahren.",
        "Die CFA beschreibt eine sanfte Katze, die Sie an der Tür begrüßt und Ihnen von Raum zu Raum folgt und meist spielt, ohne die Krallen auszufahren. PetMD nennt sie eine gute Wahl für Familien, auch mit Kindern, rät aber zu langsamem, beaufsichtigtem Kennenlernen von Kindern und anderen Haustieren und sagt, dass manche Ragdolls nur ein- bis zweimal pro Woche gekämmt werden müssen, während die CFA regelmäßiges Kämmen empfiehlt. Rassekätzchen ziehen meist mit 12–13 Wochen in ein neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Siberian, Sibirische Waldkatze",
      text: [
        "Der GCCF beschreibt die Sibirische Katze als sich langsam entwickelnde Katze mit dickem, wetterfestem Fell: eine dichte, weiche Unterwolle unter derberem Deckhaar, die im Frühjahr und Herbst stark ausfällt. Kater wiegen etwa 7,7–11,8 kg und Katzen 5,9–7,7 kg, die volle Entwicklung kann vier bis fünf Jahre dauern, und der GCCF gibt eine Lebenserwartung von 12 bis 15 Jahren oder mehr an.",
        "Der GCCF nennt sie energiegeladen und verspielt und doch geduldig – eine gute Wahl für Familien mit kleinen Kindern – und sagt, dass sie sich gut mit anderen Tieren versteht, auch mit Hunden. PetMD rät, sie mindestens einmal pro Woche zu kämmen, mit zusätzlichem Aufwand während des Fellwechsels im Frühjahr und Herbst, und weist darauf hin, dass Sibirische Katzen nicht als hypoallergen gelten. Rassekätzchen ziehen meist mit 12–13 Wochen in ihr neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Maine-Coon-Katze",
      text: [
        "Die Maine Coon gilt weithin als eine der größten Hauskatzenrassen, mit muskulösem, rechteckigem Körper, breiter Brust, großen Pfoten und langem, wallendem Schwanz. Die TICA gibt ein durchschnittliches Gewicht von etwa 5,9–8,2 kg für ausgewachsene Kater und 4,1–5,9 kg für Katzen an, und die CFA weist darauf hin, dass manche Kater mehr als 9 kg wiegen. Sie wächst langsam: Laut CFA ist sie oft erst mit drei oder vier Jahren voll entwickelt, und die TICA sagt, dass die volle Reife drei bis fünf Jahre dauern kann.",
        "Die TICA beschreibt sie als sanft, freundlich und verspielt, die CFA als gesellig, treu und intelligent; oft „spricht“ sie mit einem zwitschernden Trillern statt eines Miauens. Vetstreet schreibt, dass Maine Coons mit allen gut auskommen, auch mit Kindern, Hunden und anderen Katzen. Ihr schweres, halblanges Fell ist an den Schultern kürzer und an Halskrause, Bauch und Hinterteil länger. Die Quellen weichen bei der Fellpflege voneinander ab: Vetstreet sagt, dass wöchentliches Kämmen reicht, die CFA rät, mindestens ein paarmal pro Woche zu bürsten oder zu kämmen, und die TICA weist darauf hin, dass dichteres Fell tägliches Kämmen brauchen kann. Rassekätzchen ziehen meist mit 12–13 Wochen in ihr neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Bengalkatze",
      text: [
        "Die PDSA beschreibt die Bengal als sehr intelligent und energiegeladen, eine Katze, die viel geistige Anregung und Gelegenheit zur Bewegung braucht und einen erhöhten Aussichtspunkt wie einen Kratzbaum mag. Sie ist anhänglich, rollt sich aber eher neben Ihnen zusammen als auf Ihrem Schoß und kann recht gesprächig sein. VCA weist darauf hin, dass Bengalkatzen langsam wachsen und bis zu zwei Jahre brauchen können, um körperlich ausgereift zu sein.",
        "Ihr kurzes, weiches, getupftes oder marmoriertes Fell braucht nur einmal pro Woche ein leichtes Bürsten oder Kämmen (PDSA). PetMD weist darauf hin, dass die Bengal vielleicht nicht ideal für Familien mit kleinen Kindern ist, während Hunde und andere Katzen bei richtigem Kennenlernen kein Problem sein müssen. Die Rasse entstand aus Kreuzungen zwischen der Asiatischen Leopardkatze und Hauskatzen; PetPrep zeigt nur die registrierte Haus-Bengal. Rassekätzchen ziehen meist mit 12–13 Wochen in ihr neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Norwegian Forest Cat, Wegie, Skogkatt",
      text: [
        "Der GCCF beschreibt die Norwegische Waldkatze als sanft und freundlich, eine Katze, die gern Teil einer Familie ist. Sie reift langsam und gilt erst mit etwa vier bis fünf Jahren als ausgewachsen; Kater wiegen etwa 5,4–7,3 kg und Katzen 4,1–5,4 kg, und der GCCF gibt eine Lebenserwartung von 14 bis 16 Jahren an.",
        "Sie hat viel Energie, mag interaktive Spiele und klettert gern; der GCCF sagt, dass sie tolerant gegenüber rücksichtsvollen Kindern, anderen Katzen und katzenfreundlichen Hunden ist. PetMD rät, sie mindestens einmal pro Woche zu kämmen und zu bürsten, öfter während des Fellwechsels im Frühjahr und Herbst, und weist darauf hin, dass Trennungsangst ein Thema sein kann, wenn sie oft lange allein bleibt. Rassekätzchen ziehen meist mit 12–13 Wochen in ihr neues Zuhause (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
    keeshond: {
      aka: "Keeshond, Deutscher Wolfsspitz",
      text: [
        "Der Wolfsspitz (Keeshond) ist ein mittelgroßer Spitz aus Deutschland, die Wolfsspitz-Varietät der Deutschen Spitze. Laut FCI-Rassestandard hat er ein langes, abstehendes, grau schattiertes Fell mit dichter Mähne und eine dunkle „Brille“ um die Augen. Der FCI-Standard nennt eine Widerristhöhe von 49 ± 6 cm; die PDSA gibt ein Durchschnittsgewicht von 16–20 kg an. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD). Die PDSA nennt eine Lebenserwartung von über 10 Jahren, VCA von 12–14 Jahren.",
        "Die PDSA schreibt, die Rasse brauche bis zu einer Stunde Bewegung am Tag und das dichte Doppelfell tägliche Pflege. Keeshonden seien ausgezeichnete Familienhunde, vertrügen sich mit anderen Haustieren im Haushalt und sprächen mit Zeit und Geduld gut auf Training an. VCA beschreibt sie als verspielt und im Umgang mit Kindern vorsichtig, rät zu einem Bad etwa einmal im Monat und nennt überdurchschnittliches Haaren sowie ein dichtes Fell, das sie anfällig für Überhitzung machen kann.",
      ],
      sources: ["S246", "S709", "S710", "S10"],
    },
    standard_schnauzer: {
      aka: "Schnauzer, Standardschnauzer, Standard Schnauzer",
      text: [
        "Der Mittelschnauzer stammt aus Deutschland; die FCI führt ihn schlicht als Schnauzer in der Gruppe der Pinscher und Schnauzer. Der FCI-Standard beschreibt einen mittelgroßen, kräftigen, eher gedrungenen als schlanken Hund mit drahtigem, hartem, dichtem Fell, Hängeohren und natürlich belassener Rute. Die Widerristhöhe beträgt 45–50 cm, das Gewicht 14–20 kg (Rüden und Hündinnen); die Farben sind Pfeffer und Salz sowie reines Schwarz. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, VCA 12–14 Jahre.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche. Die Rasse passe zu einem kleinen Haus mit kleinem oder mittelgroßem Garten, in der Stadt wie auf dem Land. Die PDSA schreibt, Schnauzer seien sanfte, geduldige Hunde, die gut mit Kindern auskommen, wenn sie früh an sie gewöhnt werden; das Fell müsse 2- bis 3-mal pro Woche gepflegt werden. VCA merkt an, dass die Rasse schnell lernt, sich aber auch schnell langweilt; Spiele und Tricks sorgen für die nötige geistige Auslastung. PetMD empfiehlt monatliche Bäder, Krallenkürzen und Ohrenreinigung alle ein bis zwei Wochen sowie den Besuch beim professionellen Hundefriseur alle drei Monate.",
      ],
      sources: ["S10", "S711", "S712", "S714", "S715", "S716", "S717"],
    },
    english_setter: {
      aka: "Englischer Setter, Laverack Setter, Llewellin Setter, Setter",
      text: [
        "Der English Setter ist ein eleganter Jagdhund aus Großbritannien, gezüchtet zum Auffinden von Federwild. Der FCI-Standard beschreibt einen mittelhohen Hund mit klarem Umriss und eleganter Bewegung. Sein weißes Fell ist farbig gesprenkelt („Belton“ in Blau, Orange, Zitronengelb oder Leberfarben) oder dreifarbig. Die Widerristhöhe beträgt 65–68 cm bei Rüden und 61–65 cm bei Hündinnen; die PDSA nennt ein Durchschnittsgewicht von 22–29 kg. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, passt zu einem großen Haus mit großem Garten und steht in Breed-Watch-Kategorie 1. Die PDSA schreibt, English Setter liebten Kinder und andere Haustiere und seien deshalb ideal für Familien; sie rät zu Fellpflege 2- bis 3-mal pro Woche. PetMD empfiehlt alle sechs bis acht Wochen ein Bad und schreibt, dass die Hunde nicht gern lange allein bleiben. VCA erwähnt monatliches Scheren und Trimmen.",
      ],
      sources: ["S730", "S731", "S732", "S733", "S734", "S10"],
    },
    dogue_de_bordeaux: {
      aka: "Dogue de Bordeaux, Bordeaux-Dogge, Französische Dogge, Bordeaux Mastiff, DDB",
      text: [
        "Die Bordeauxdogge ist ein kräftiger Molosser aus Frankreich. Der FCI-Standard beschreibt einen gedrungenen, athletischen und imposanten Hund, der ruhig, ausgeglichen und sehr an seinen Besitzer gebunden ist. Das Fell ist fein und kurz, in allen Falbtönen von Mahagoni bis Isabell. Die Widerristhöhe liegt bei 60–68 cm (Rüden) und 58–66 cm (Hündinnen), das Gewicht bei mindestens 50 kg (Rüden) und mindestens 45 kg (Hündinnen); PetMD gibt 110–145 Pfund (etwa 50–66 kg) für Rüden und 99–120 Pfund (etwa 45–54 kg) für Hündinnen an. Ein Hund dieser Größe ist mit etwa 18–24 Monaten ausgewachsen (PetMD). Bei der Lebenserwartung sind sich die Quellen uneins: PetMD schreibt, diese Hunde würden meist nur 5–8 Jahre alt, der Royal Kennel Club nennt über 10 Jahre.",
        "Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung am Tag und einmal pro Woche Fellpflege; die Rasse haart, passt zu einem großen Haus mit großem Garten und steht in Breed-Watch-Kategorie 3. Die PDSA schreibt, Bordeauxdoggen kämen mit älteren Kindern meist gut aus, seien für kleinere Kinder und Erstbesitzer aber nicht zu empfehlen. Sie warnt vor starkem Speicheln und einem sehr hohen Jagdtrieb und rät, die Gesichtsfalten regelmäßig zu reinigen und nach dem Fressen eine Pause vor der Bewegung einzulegen. PetMD schreibt, dass die kurze Schnauze bei heißem Wetter das Atmen erschweren kann.",
      ],
      sources: ["S755", "S756", "S757", "S759", "S10"],
    },
    flat_coated_retriever: {
      aka: "Flatcoat, Flat Coat, Flattie, Flat-Coated Retriever",
      text: [
        "Der Flat Coated Retriever ist ein aufgeweckter, aktiver Jagdhund aus Großbritannien, gezüchtet zum Apportieren von Wild. Der FCI-Standard beschreibt ein dichtes, flach anliegendes Fell mit gut befederten Läufen und Rute, nur in Schwarz oder Leberbraun, und ein optimistisches, freundliches, selbstsicheres und gutmütiges Wesen. Bevorzugt werden eine Widerristhöhe von 59–61,5 cm und ein Gewicht von 27–36 kg bei Rüden sowie 56,5–59 cm und 25–32 kg bei Hündinnen. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Der Royal Kennel Club gibt eine Lebenserwartung von unter 10 Jahren an; eine britische Studie von 2024, die dem Dogs Trust vorgelegt wurde, fand dagegen einen Median von 11,7 Jahren.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, passt zu einem großen Haus mit großem Garten und steht in Breed-Watch-Kategorie 1. PetMD nennt Flat Coated Retriever wunderbare Familienhunde, die in der Regel gut mit Kindern und anderen Haustieren auskommen, besonders bei richtigem Kennenlernen und guter Sozialisierung. Außerdem rät PetMD, zweimal pro Woche zu bürsten, die Ohren alle ein bis zwei Wochen zu reinigen, alle ein bis zwei Monate zu baden, die Krallen zu kürzen und Bewegung unmittelbar vor und nach dem Fressen zu vermeiden.",
      ],
      sources: ["S761", "S762", "S763", "S123", "S10"],
    },
    border_terrier: {
      aka: "Border-Terrier",
      text: [
        "Der Border Terrier ist ein kleiner Arbeitsterrier aus Großbritannien. Der FCI-Standard nennt ihn im Grunde einen Arbeitsterrier, der einem Pferd folgen kann und Aktivität mit Schneid verbindet. Er beschreibt ein hartes, dichtes Fell mit dichter Unterwolle, dunkle Augen mit aufmerksamem Ausdruck und kleine V-förmige Ohren. Die Farben sind Rot, Weizenfarben, Grizzle mit Lohfarben oder Blau mit Lohfarben; Rüden wiegen 5,9–7,1 kg, Hündinnen 5,1–6,4 kg. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD). Der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an, und eine britische Studie von 2024 (McMillan et al.) fand einen Median von 14,2 Jahren.",
        "Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, eignet sich für eine Wohnung und steht in Breed-Watch-Kategorie 1. Die PDSA schreibt, Border Terrier verbrächten bei richtiger Sozialisierung gern Zeit mit Kindern jeden Alters, rät aber zur Aufsicht. Sie warnt, dass die Hunde unter Trennungsangst leiden können, wenn man sie allein lässt, einen hohen Jagdtrieb haben und nicht mit Kaninchen, Meerschweinchen oder Ratten zusammenleben sollten. Außerdem rät sie, ein paarmal pro Woche zu bürsten und nach dem Fressen eine Pause vor der Bewegung einzulegen. Woodgreen empfiehlt ein Zuhause mit etwas älteren Kindern.",
      ],
      sources: ["S768", "S769", "S770", "S771", "S773", "S10"],
    },
    leonberger: {
      aka: "Leonberg",
      text: [
        "Der Leonberger ist ein großer Hund aus Deutschland. Der FCI-Standard beschreibt einen großen, kräftigen, muskulösen und dennoch eleganten Hund mit langem, eng anliegendem Fell, Hängeohren und gut behangener Rute, in Löwengelb, Rot, Rotbraun oder Sandfarben, stets mit schwarzer Maske. Die Widerristhöhe beträgt 72–80 cm bei Rüden und 65–75 cm bei Hündinnen. Die PDSA gibt ein Durchschnittsgewicht von 30–50 kg für Rüden und Hündinnen sowie eine Lebenserwartung von unter 10 Jahren an; als Riesenrasse ist er mit etwa 18–24 Monaten ausgewachsen (PetMD-Größenklasse).",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und ein großes Haus mit großem Garten; die PDSA nennt Leonberger sanfte Riesen und ausgezeichnete Familienhunde. Woodgreen empfiehlt, zwei- bis dreimal pro Woche zu bürsten, und schreibt, frühe Erziehung und Sozialisierung seien wegen ihrer Größe unverzichtbar und es falle ihnen schwer, lange allein zu sein. Eine britische Studie von 2024 (McMillan et al., dem Dogs Trust vorgelegt) nennt eine mediane Lebenserwartung von 10,0 Jahren.",
      ],
      sources: ["S783", "S781", "S10", "S780", "S784", "S123"],
    },
    beauceron: {
      aka: "Berger de Beauce, Bas Rouge",
      text: [
        "Der Beauceron oder Berger de Beauce ist ein großer französischer Schäferhund. Der FCI-Standard beschreibt einen großen, soliden, harten, kraftvollen und muskulösen Hund ohne Schwerfälligkeit, mit kurzem, dichtem Fell, einer Rute mit leichtem J-förmigem Haken und doppelten Afterkrallen an den Hinterläufen. Die Farben sind Schwarz mit Brand oder Harlekin. Die Widerristhöhe beträgt 65–70 cm bei Rüden und 61–68 cm bei Hündinnen. Laut Gewichtstabelle des American Kennel Club wiegen Rüden und Hündinnen 70–110 Pfund (etwa 32–50 kg); ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD 10–12 Jahre.",
        "Der Royal Kennel Club nennt den Beauceron ruhig und selbstsicher, einen treuen Begleiter und Wachhund. Er empfiehlt mehr als 2 Stunden Bewegung am Tag, Fellpflege mehr als einmal pro Woche und ein großes Haus mit großem Garten; der Club führt die Rasse in Breed-Watch-Kategorie 1. PetMD schreibt, Beaucerons könnten bei beaufsichtigtem Kennenlernen gut mit kleinen Kindern und anderen Hunden auskommen. Neuen Menschen gegenüber könnten sie misstrauisch sein, deshalb sollten Welpen früh viele neue Menschen kennenlernen; am liebsten verbrächten sie möglichst viel Zeit mit ihrer Familie. Außerdem empfiehlt PetMD, mindestens einmal pro Woche zu bürsten und eine Stunde vor und eine Stunde nach dem Fressen auf Bewegung zu verzichten.",
      ],
      sources: ["S790", "S268", "S10", "S787", "S791"],
    },
    bouvier_des_flandres: {
      aka: "Flandrischer Treibhund, Bouvier, Vlaamse Koehond, Flanders Cattle Dog",
      text: [
        "Der Bouvier des Flandres ist ein Treibhund aus Flandern (Belgien und Frankreich). Der FCI-Standard beschreibt einen kurz gebauten, kompakten, kraftvollen Hund mit starken, gut bemuskelten Läufen und einem groben, trockenen, leicht zerzausten Fell von etwa 6 cm Länge mit Schnurrbart und vollem Bart. Die Farben sind meist Grau, Gestromt oder mit Schwarz überlagert; auch einfarbig Schwarz ist zulässig. Rüden messen 62–68 cm und wiegen etwa 35–40 kg, Hündinnen 59–65 cm und etwa 27–35 kg. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD-Größenklasse); eine britische Studie von 2024 (McMillan et al., dem Dogs Trust vorgelegt) nennt eine mediane Lebenserwartung von 11,3 Jahren.",
        "Der Royal Kennel Club nennt den Bouvier kräftig und vielseitig, ursprünglich einen Viehtreiber. Er empfiehlt bis zu 1 Stunde Bewegung am Tag, tägliche Fellpflege und ein großes Haus mit großem Garten und führt die Rasse in Breed-Watch-Kategorie 1. PetMD schreibt, Bouviers könnten bei beaufsichtigtem Kennenlernen gut mit kleinen Kindern und anderen großen Hunden auskommen, hätten aber bei Katzen und kleinen Haustieren einen starken Jagdtrieb, brauchten frühe Sozialisierung und neigten zu Übergewicht. Außerdem rät PetMD, mindestens ein- bis zweimal pro Woche zu bürsten, die Ohren alle zwei bis drei Wochen zu reinigen, die Krallen alle drei bis vier Wochen zu kürzen und eine Stunde vor und eine Stunde nach dem Fressen auf Bewegung zu verzichten.",
      ],
      sources: ["S797", "S10", "S123", "S795", "S798"],
    },
    borzoi: {
      aka: "Borzoi, Russischer Windhund, Russischer Jagdwindhund, Russian Wolfhound, Russkaya Psovaya Borzaya",
      text: [
        "Der Barsoi, auch Russischer Jagdwindhund genannt, ist ein langhaariger Windhund aus Russland, gezüchtet zum Hetzen von Hasen und Füchsen. Der FCI-Standard beschreibt einen Hund von aristokratischem Erscheinungsbild, hochgewachsen, schlank und kräftig, ziemlich hochläufig, mit langem, seidigem, welligem Fell in jeder Farbe von Weiß bis Schwarz außer Braun, Blau und Isabell. Die erwünschte Widerristhöhe beträgt 75–85 cm bei Rüden und 68–78 cm bei Hündinnen. Die PDSA gibt ein Durchschnittsgewicht von 27–47 kg für Rüden und Hündinnen und eine Lebenserwartung von über 10 Jahren an, PetMD 9–14 Jahre; ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD-Größenklasse).",
        "Die PDSA empfiehlt mindestens 1 Stunde Bewegung am Tag, aufgeteilt auf ein paar Spaziergänge, mit Freilauf nur in einem sicher eingezäunten Bereich. Sie schreibt, Barsois hätten einen sehr hohen Jagdtrieb und seien für kleinere Haustiere oder jüngere Kinder nicht zu empfehlen. Sie passten zu erfahrenen Haltern, brauchten die meiste Zeit jemanden zu Hause, sollten von klein auf sozialisiert und ein paarmal pro Woche gebürstet werden; zwischen Fressen und Bewegung sollte eine Pause liegen. PetMD empfiehlt, mindestens zwei- bis dreimal pro Woche zu bürsten, und nennt die Magenblähung (Bloat) als häufigstes Gesundheitsproblem.",
      ],
      sources: ["S802", "S800", "S803", "S10"],
    },
    japanese_chin: {
      aka: "Chin, Japan-Chin, Japanischer Spaniel, Japanese Chin",
      text: [
        "Der Japan Chin ist ein kleiner Begleithund aus Japan. Der Rassestandard des Royal Kennel Club beschreibt einen eleganten, aristokratischen, kompakten kleinen Hund mit üppigem, langem, seidigem Fell in Schwarz-Weiß oder Rot-Weiß (nie dreifarbig), kurzem, breitem Fang und einem Ausdruck des Erstaunens. Als Idealgewicht nennt er 1,8–3,2 kg; PetMD gibt eine Größe von 8–11 Zoll (etwa 20–28 cm) an. Ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD-Größenklasse); eine britische Studie von 2024 (McMillan et al., dem Dogs Trust vorgelegt) nennt eine mediane Lebenserwartung von 12,5 Jahren.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, eignet sich für eine Wohnung und steht in Breed-Watch-Kategorie 1. PetMD schreibt, der Japan Chin sei eine flachgesichtige (brachyzephale) Rasse, die Atemprobleme haben und leicht überhitzen kann; bei heißem oder feuchtem Wetter gehöre Bewegung daher in die kühleren Tageszeiten. Unter Aufsicht komme er in der Regel gut mit Kindern aus, könne Trennungsangst entwickeln und solle früh in die Welpenschule gehen. Außerdem empfiehlt PetMD, ein- bis zweimal pro Woche zu bürsten, die Ohren alle zwei bis drei Wochen zu reinigen und etwa monatlich zu baden.",
      ],
      sources: ["S806", "S10", "S123", "S805", "S809"],
    },
    norwich_terrier: {
      aka: "Norwich",
      text: [
        "Der Norwich Terrier stammt aus Großbritannien und ist einer der kleinsten Terrier. Der FCI-Standard beschreibt einen niedrigen, aufmerksamen, kompakten und kräftigen kleinen Hund mit hartem, drahtigem, geradem Fell, das um das Gesicht einen Kragen bildet, und aufrecht getragenen Ohren mit spitzen Enden. Die Farben sind alle Rottöne, Weizenfarben, Schwarz mit Brand oder Grizzle; die ideale Widerristhöhe beträgt 25 cm. Laut UKC-Standard liegt das Idealgewicht bei etwa 12 Pfund (rund 5,4 kg) für Rüden und Hündinnen; ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD 12–15 Jahre.",
        "Der Royal Kennel Club nennt den Norwich einen der kleinsten Terrier mit liebenswertem Wesen. Er empfiehlt bis zu 1 Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, eignet sich für eine Wohnung und wird als „Vulnerable Native Breed“ (gefährdete heimische Rasse) geführt. PetMD schreibt, Norwich Terrier kämen in der Regel gut mit Kindern und anderen Haustieren aus, seien sehr energiegeladen und brauchten täglich Bewegung und geistige Anregung. Wegen ihres starken Jagdinstinkts seien eine sichere Leine und ein gut eingezäunter Garten Pflicht, und sie sollten von klein auf sozialisiert werden. PetMD empfiehlt, mindestens zweimal pro Woche zu bürsten, mindestens einmal pro Woche die Zähne zu putzen, die Krallen etwa einmal im Monat zu kürzen und höchstens alle drei Monate zu baden.",
      ],
      sources: ["S812", "S815", "S10", "S813", "S814"],
    },
    miniature_bull_terrier: {
      aka: "Zwergbullterrier, Miniature Bull Terrier, Mini Bull Terrier, Mini Bull, English Miniature Bull Terrier",
      text: [
        "Der Miniature Bullterrier ist ein kleiner Terrier aus Großbritannien. Die FCI führt ihn unter den Terriern vom Bull-Typ; der Royal Kennel Club schreibt, er sei 1943 erstmals als eigene Varietät anerkannt worden, gezüchtet aus kleineren Bullterriern, damit er unter 35,5 cm (14 Zoll) bleibt. PetMD nennt eine Größe von 10–14 Zoll (etwa 25–36 cm) und ein Gewicht von 18–28 Pfund (etwa 8–13 kg); ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD 11–13 Jahre.",
        "Der Royal Kennel Club beschreibt die Rasse als mutig und voller Temperament mit einer spaßliebenden Art. Sie brauche bis zu 1 Stunde Bewegung am Tag und einmal pro Woche Fellpflege, haare und werde als „Vulnerable Native Breed“ (gefährdete heimische Rasse) geführt. PetMD schreibt, Miniature Bullterrier seien in der Regel anhänglich und gut mit Kindern, ein freundlicher Familienbegleiter. Bei guter Sozialisierung könnten sie sich mit anderen Haustieren vertragen; sie brauchten regelmäßige Bewegung und geistige Anregung und fühlten sich nicht wohl, wenn sie lange allein bleiben. PetMD empfiehlt frühe Sozialisierung und etwa einmal pro Woche Bürsten.",
      ],
      sources: ["S818", "S820", "S821", "S10"],
    },
    schipperke: {
      aka: "Little Captain, Little Black Devil, Spitzke",
      text: [
        "Der Schipperke ist ein kleiner Schäferhund aus Belgien; die FCI ordnet ihn den Schäferhunden zu. Sein Standard beschreibt einen wolfsähnlichen Hund von geringer Größe, aber sehr solidem Körperbau, ganz schwarz, mit Kragen, Mähne und Hosen. Der FCI-Standard nennt ein Gewicht von 3–9 kg (angestrebt wird ein Durchschnitt von 4–7 kg); PetMD gibt eine Größe von 10–13 Zoll (etwa 25–33 cm) an. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD-Größenklasse). Eine große britische Studie (McMillan et al. 2024) fand eine mediane Lebenserwartung von 14,2 Jahren; der Royal Kennel Club nennt über 12 Jahre.",
        "Der FCI-Standard nennt den Schipperke einen ausgezeichneten kleinen Wachhund, sprühend vor Lebhaftigkeit, Fremden gegenüber zurückhaltend und sehr sanft zu Kindern. Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, eignet sich für eine Wohnung und steht in Breed-Watch-Kategorie 1. PetMD schreibt, Schipperkes brauchten Beschäftigung für Geist und Körper und seien intelligent, aber eigenwillig; manche behielten einen hohen Jagdtrieb. PetMD empfiehlt frühe Sozialisierung, tägliches Zähneputzen und Ohrenreinigung alle zwei Wochen; VCA rät, mindestens zweimal pro Woche zu bürsten.",
      ],
      sources: ["S824", "S825", "S826", "S827", "S828", "S771", "S10"],
    },
    belgian_tervuren: {
      aka: "Tervueren, Tervuren, Belgischer Schäferhund Tervueren, Belgian Tervuren",
      text: [
        "Der Tervueren ist die langhaarige, falbfarbene Varietät des Belgischen Schäferhundes, eines Hütehundes aus Belgien; die FCI erkennt eine einzige Rasse Belgischer Schäferhund mit vier Varietäten an. Der FCI-Standard beschreibt einen harmonisch proportionierten Hund, der Eleganz und Kraft verbindet, mit langem Fell, das Kragen, Hosen und eine Fahnenrute bildet. Beim Tervueren lässt er nur Falb oder Grau mit schwarzem Überzug und schwarzer Maske zu (Falb bevorzugt). Die Widerristhöhe beträgt etwa 62 cm bei Rüden und 58 cm bei Hündinnen, das Gewicht etwa 25–30 kg bei Rüden und 20–25 kg bei Hündinnen; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD 12–14 Jahre.",
        "Der FCI-Standard nennt den Belgischen Schäferhund wachsam und aktiv, voller Energie, ohne Furcht oder Aggressivität. Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die Rasse haart, passt zu einem großen Haus mit großem Garten und steht in Breed-Watch-Kategorie 1. PetMD schreibt, Tervueren bauten enge Bindungen zu ihrer Familie auf, brauchten viel körperliche Aktivität und geistige Anregung und versuchten möglicherweise, Kinder und kleinere Tiere zu hüten. PetMD empfiehlt frühe Sozialisierung, wöchentliches Bürsten (im Fellwechsel fast täglich), Ohrenreinigung alle ein bis zwei Wochen und ein Bad alle vier bis sechs Wochen.",
      ],
      sources: ["S312", "S313", "S830", "S832", "S10"],
    },
    toy_fox_terrier: {
      aka: "Toy Foxterrier, Toy-Foxterrier, American Toy Terrier, Amertoy, TFT",
      text: [
        "Der Toy Fox Terrier ist ein kleiner amerikanischer Terrier der Toy Group des American Kennel Club. Der AKC-Standard beschreibt einen ausgewogenen Zwerghund von athletischem Erscheinungsbild mit kurzem, seidig glänzendem Fell und aufrechten, spitzen Ohren. Der Körper ist überwiegend weiß; der Kopf ist dreifarbig, weiß und lohfarben, weiß und schwarz oder weiß, schokoladenbraun und lohfarben. PetMD nennt ein Gewicht von 4–9 Pfund (etwa 1,8–4 kg) und eine Größe von 8,5–11,5 Zoll (etwa 21–29 cm); ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD). PetMD und WebMD geben eine Lebenserwartung von 13–15 Jahren an.",
        "Der AKC-Standard nennt den Toy Fox Terrier intelligent, wachsam, freundlich und seinen Besitzern treu. PetMD empfiehlt mindestens eine Stunde Bewegung täglich, ein- bis zweimal pro Woche Bürsten sowie frühe Erziehung und Sozialisierung und schreibt, dass die Rasse nach wie vor einen starken Jagdtrieb hat. WebMD schreibt, Toy Fox Terrier seien großartige Begleiter für rücksichtsvolle, ältere Kinder, für Familien mit kleinen Kindern aber nicht zu empfehlen; sie könnten Trennungsangst zeigen, wenn sie lange allein bleiben. WebMD empfiehlt außerdem, täglich die Zähne zu putzen, wöchentlich die Ohren zu waschen und monatlich die Krallen zu kürzen.",
      ],
      sources: ["S833", "S834", "S835", "S10"],
    },
    gordon_setter: {
      aka: "Black and Tan Setter, Scottish Setter, Gordon",
      text: [
        "Der Gordon Setter ist ein großer schwarz-lohfarbener Jagdhund aus Schottland (FCI-Gruppe 7, Vorstehhunde; Ursprungsland Großbritannien). Der FCI-Standard beschreibt einen stilvollen Hund mit Galopplinien und tief glänzendem, kohlschwarzem Fell mit kastanienroten Abzeichen. Die Widerristhöhe beträgt 66 cm und das Gewicht 29,5 kg bei Rüden, bei Hündinnen 62 cm und 25,5 kg. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an.",
        "Der FCI-Standard nennt den Gordon Setter mutig, aufgeschlossen und von gutmütigem, ausgeglichenem Wesen; die PDSA beschreibt eine freundliche, intelligente Rasse, die gern beschäftigt wird. Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung am Tag sowie ein großes Haus mit Garten, und die PDSA schreibt, das schwere Fell brauche tägliche Pflege. PetMD rät, die Bewegung eine Stunde vor und nach den Mahlzeiten einzuschränken und Welpen früh zu sozialisieren; wegen des hohen Jagdtriebs der Rasse solle man besonders auf den Abruf achten. WebMD empfiehlt, täglich die Zähne zu putzen und etwa einmal im Monat zu baden, und schreibt, die Rasse komme mit kleinen Kindern nur mäßig gut aus.",
      ],
      sources: ["S841", "S842", "S843", "S844", "S845", "S10"],
    },
    afghan_hound: {
      aka: "Afghane, Afghan Hound",
      text: [
        "Der Afghanische Windhund ist ein hochgewachsener, langhaariger Windhund aus Afghanistan (FCI-Gruppe 10, Windhunde; Ursprungsland Afghanistan, unter britischem Patronat). Der FCI-Standard beschreibt einen Hund, der den Eindruck von Kraft und Würde vermittelt und Schnelligkeit mit Stärke verbindet, mit langem, sehr feinem Fell; alle Farben außer Merle sind zugelassen. Die ideale Widerristhöhe beträgt 68–74 cm bei Rüden und 63–69 cm bei Hündinnen; der AKC-Standard nennt ein Gewicht von etwa 60 Pfund (27 kg) bei Rüden und etwa 50 Pfund (23 kg) bei Hündinnen. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an.",
        "Der FCI-Standard nennt den Afghanischen Windhund würdevoll und distanziert, mit einer gewissen scharfen Wildheit. Der Royal Kennel Club empfiehlt mehr als zwei Stunden Bewegung am Tag, tägliche Fellpflege und ein großes Haus mit Garten. Die PDSA schreibt, das lange, seidige Fell brauche tägliches Bürsten, Afghanische Windhunde kämen bei guter Sozialisierung gut mit Kindern aus, und ihr starker Hetztrieb verlange Vorsicht im Umgang mit anderen Haustieren. PetMD rät, nach einer Mahlzeit mindestens eine Stunde zu warten, bevor der Hund sich bewegt, und mindestens alle ein bis zwei Wochen zu baden; WebMD empfiehlt, täglich die Zähne zu putzen.",
      ],
      sources: ["S849", "S850", "S851", "S852", "S853", "S854", "S10"],
    },
    australian_silky_terrier: {
      aka: "Australischer Silky Terrier, Silky Terrier, Silky-Terrier, Silky",
      text: [
        "Der Australian Silky Terrier ist ein kleiner, sehr aufmerksamer Zwergterrier aus Australien (FCI-Gruppe 3, Terrier; Sektion Zwergterrier), der in Nordamerika Silky Terrier genannt wird. Der FCI-Standard verlangt ein flaches, feines, glänzendes Fell von seidiger Beschaffenheit in Blau und Lohfarben; alle Schattierungen von Blau und Lohfarben sind zulässig, Silber und Weiß nicht. Die Widerristhöhe beträgt 23–26 cm bei Rüden, bei Hündinnen etwas weniger. Die Standards geben kein Gewicht an („im Verhältnis zur Größe“); PetMD und WebMD nennen etwa 10 Pfund (rund 4,5 kg). Ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an (PetMD und WebMD: 13–15 Jahre).",
        "Der FCI-Standard beschreibt einen mutigen und würdevollen Zwergterrier, als Begleiter unübertroffen. Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung am Tag und tägliche Fellpflege und sagt, dass die Rasse für eine Wohnung geeignet ist. PetMD schreibt, Silkys kämen gut mit anderen Haustieren und Kindern aus, wenn sie früh richtig sozialisiert werden. PetMD empfiehlt Sozialisierungskurse vor der 16. Lebenswoche und die Ohren alle zwei bis drei Wochen zu reinigen; wegen des Jagdtriebs solle man den Hund an der Leine oder in einem eingezäunten Bereich halten. WebMD rät, täglich die Zähne zu putzen und etwa einmal im Monat zu baden.",
      ],
      sources: ["S855", "S856", "S857", "S858", "S10"],
    },
    parson_russell_terrier: {
      aka: "Parson-Russell-Terrier, Parson Jack Russell Terrier, Parson Terrier, PRT",
      text: [
        "Der Parson Russell Terrier ist ein aktiver, gewandter und arbeitstauglicher Terrier aus Großbritannien, ursprünglich zur Arbeit am Fuchs gezüchtet (FCI-Gruppe 3, Terrier; Sektion große und mittelgroße Terrier). Er ist eine andere Rasse als der Jack Russell Terrier: Der Kennel Club erkannte ihn 1990 erstmals als Parson Jack Russell Terrier an. Der FCI-Standard verlangt einen weißen oder überwiegend weißen Hund mit lohfarbenen, zitronengelben oder schwarzen Abzeichen oder einer Kombination dieser Farben, ein raues, gebrochenes oder glattes Fell und eine ideale Widerristhöhe von 36 cm bei Rüden und 33 cm bei Hündinnen. Die PDSA gibt ein Durchschnittsgewicht von 6–8 kg an. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an (WebMD: 13 bis 15 Jahre).",
        "Der FCI-Standard nennt die Rasse mutig und freundlich. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung am Tag und einmal pro Woche Fellpflege. Die PDSA schreibt, diese Hunde seien voller Energie, brauchten idealerweise 1–2 Stunden Bewegung am Tag, kämen gut mit Kindern aus und seien ausgezeichnete Familienhunde; mit den anderen Haustieren der Familie müssten sie früh sozialisiert werden. PetMD weist darauf hin, dass manche einen hohen Jagdtrieb haben, und empfiehlt, täglich die Zähne zu putzen, die Ohren alle zwei Wochen zu reinigen und alle zwei bis vier Wochen zu baden; WebMD ergänzt, dass sie nicht gern allein sind und Trennungsangst haben können.",
      ],
      sources: ["S864", "S865", "S866", "S867", "S868", "S10"],
    },
    wire_fox_terrier: {
      aka: "Drahthaar-Foxterrier, Drahthaar Foxterrier, Foxterrier Drahthaar, Wire Fox Terrier",
      text: [
        "Der Foxterrier (Drahthaar) ist ein aktiver, lebhafter Terrier aus Großbritannien (FCI-Gruppe 3, Terrier; Sektion große und mittelgroße Terrier) – nicht zu verwechseln mit dem Toy Fox Terrier. Der FCI-Standard verlangt Knochen und Kraft auf kleinem Raum, nie plump oder grob. Das Fell ist dicht und sehr drahtig mit weicherer Unterwolle, überwiegend weiß mit schwarzen, schwarz-lohfarbenen oder lohfarbenen Abzeichen; die Widerristhöhe beträgt höchstens 39 cm bei Rüden, bei Hündinnen etwas weniger. Der AKC-Standard nennt für einen Rüden 18 Pfund in Ausstellungskondition und für eine Hündin etwa zwei Pfund weniger, jeweils mit einer Toleranz von einem Pfund in beide Richtungen (etwa 7,7–8,6 kg bei Rüden und 6,8–7,7 kg bei Hündinnen). Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an (PetMD: 12–15 Jahre).",
        "Der FCI-Standard nennt die Rasse freundlich, aufgeschlossen und furchtlos. Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die PDSA schreibt, Foxterrier liebten es zu spielen und zu erkunden, seien ausgezeichnete Familienhunde und brauchten ein- bis zweimal pro Woche Fellpflege. WebMD nennt sie großartige Begleiter für Kinder, rät aber, sie im Umgang mit kleinen Kindern stets zu beaufsichtigen. PetMD schreibt, wegen ihres hohen Jagdtriebs sollten sie bei kleinen Haustieren genau im Auge behalten werden, und empfiehlt, den Welpen gut zu sozialisieren, täglich die Zähne zu putzen, etwa einmal im Monat zu baden und das Fell drei- bis viermal im Jahr von Hand zu trimmen. WebMD empfiehlt außerdem, die Krallen etwa einmal im Monat zu kürzen.",
      ],
      sources: ["S871", "S872", "S873", "S874", "S875", "S876", "S10"],
    },
    manchester_terrier: {
      aka: "Manchester-Terrier, Manchester Terrier (Standard), Black and Tan Terrier, Manchester",
      text: [
        "Der Manchester Terrier ist ein kompakter, eleganter Terrier aus Großbritannien (FCI-Gruppe 3, Terrier; Sektion große und mittelgroße Terrier) – die Standardvariante, nicht der Zwergschlag. Der FCI-Standard verlangt einen kompakten, eleganten und gesunden Hund mit Substanz. Das Fell ist dicht, glatt, kurz und glänzend und nur in Tiefschwarz mit sattem mahagonifarbenem Brand zulässig; die ideale Widerristhöhe beträgt 41 cm bei Rüden und 38 cm bei Hündinnen. Der Standard des Canadian Kennel Club nennt ein Gewicht von 5,5 bis 10 kg (12 bis 22 Pfund). Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD), und die PDSA gibt eine Lebenserwartung von über 12 Jahren an (WebMD: 15 bis 17 Jahre).",
        "Der FCI-Standard nennt die Rasse eifrig, wachsam, fröhlich und sportlich, urteilsfähig und ergeben. Die PDSA empfiehlt bis zu einer Stunde Bewegung am Tag und sagt, dass einmal pro Woche Bürsten in der Regel genügt. PetMD schreibt, Manchester Terrier kämen gut mit Kindern aus, besonders wenn sie ihnen schon als Welpen begegnen, und empfiehlt, den Welpen vom ersten Tag im neuen Zuhause an zu sozialisieren. Außerdem weist PetMD auf einen hohen Jagdtrieb aus ihrer Geschichte als Rattenfänger hin; deshalb passten sie womöglich nicht in Haushalte mit Hamstern oder Wüstenrennmäusen. WebMD rät, kleine Kinder nie unbeaufsichtigt mit Hunden zu lassen, empfiehlt, täglich die Zähne zu putzen, und schreibt, dass die Rasse kälteempfindlich ist und deshalb ein Mantel oder Pullover nötig sein kann.",
      ],
      sources: ["S888", "S889", "S890", "S891", "S892", "S10"],
    },
    tibetan_terrier: {
      aka: "Tibet-Terrier, Tibetan Terrier, Tibetanischer Terrier",
      text: [
        "Der Tibet Terrier ist ein kräftiger, mittelgroßer, langhaariger Begleithund aus Tibet (FCI-Gruppe 9, Gesellschafts- und Begleithunde; Sektion Tibetanische Rassen) – ein Terrier nur dem Namen nach. Der FCI-Standard verlangt einen insgesamt quadratischen Umriss, ein Doppelfell mit reichlichem, feinem, langem Deckhaar, glatt oder gewellt, behangene, befederte Ohren und eine über dem Rücken eingerollt getragene Rute. Zugelassen ist jede Farbe außer Schokoladenbraun, Leberbraun oder Merle; Rüden messen 36–41 cm Widerristhöhe, Hündinnen etwas weniger. Der Standard des Canadian Kennel Club nennt ein Gewicht von 8,25 bis 13,5 kg (18 bis 30 Pfund). Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD), und die PDSA gibt eine Lebenserwartung von über 12 Jahren an (PetMD: 15–16 Jahre).",
        "Der FCI-Standard nennt die Rasse lebhaft und gutmütig, aufgeschlossen, wachsam und intelligent, aber Fremden gegenüber zurückhaltend mit Zuneigung. Die PDSA nennt Tibet Terrier sanfte, freundliche und anhängliche Hunde, die gute Familienhunde abgeben; sie empfiehlt etwa eine Stunde Bewegung am Tag und sagt, dass tägliche Fellpflege nötig ist. PetMD schreibt, dass sie Trennungsangst entwickeln können, wenn sie lange allein bleiben, und empfiehlt Sozialisierungskurse für den Welpen vor der 16. Lebenswoche. Bei beaufsichtigtem Kennenlernen könnten sie gut mit kleinen Kindern und anderen Hunden auskommen, während WebMD schreibt, dass manche Tiere mit kleinen Kindern und anderen Hunden Schwierigkeiten haben. WebMD empfiehlt, täglich die Zähne zu putzen.",
      ],
      sources: ["S904", "S905", "S906", "S907", "S909", "S10"],
    },
    greyhound: {
      aka: "Englischer Windhund, English Greyhound",
      text: [
        "Der Greyhound ist ein großer Windhund aus Großbritannien; die FCI führt ihn in Gruppe 10 unter den kurzhaarigen Windhunden. Der FCI-Standard beschreibt einen kräftig gebauten, hochgestellten Hund mit großzügigen Proportionen, muskulöser Kraft und symmetrischem Aufbau, intelligent, sanft, anhänglich und ausgeglichen. Sein Fell ist fein und dicht anliegend, in Schwarz, Weiß, Rot, Blau, Falb, Fallow oder Gestromt, auch in einer dieser Farben mit Weiß gescheckt. Die ideale Widerristhöhe beträgt 71–76 cm bei Rüden und 68–71 cm bei Hündinnen. Der AKC-Standard nennt ein Gewicht von 65 bis 70 Pfund (etwa 29,5–31,8 kg) für Rüden und 60 bis 65 Pfund (etwa 27,2–29,5 kg) für Hündinnen. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Eine britische VetCompass-Studie an Greyhounds in tierärztlicher Behandlung fand eine mediane Lebensdauer von 11,4 Jahren; die PDSA gibt eine Lebenserwartung von über 10 Jahren an.",
        "Die PDSA schreibt, Greyhounds seien nicht übermäßig energiegeladen: Sie brauchten etwa eine Stunde Bewegung am Tag und zögen ein paar gute Läufe langen Spaziergängen vor, und ihr kurzes Fell brauche wöchentliche Fellpflege. Mit richtiger Sozialisierung als Welpen könnten sie gute Familienhunde werden, doch ihr Hetztrieb sei stark. PetMD schreibt, der sehr starke Jagdtrieb mache sie für Haushalte mit Katzen oder anderen kleinen Tieren ungeeignet. WebMD empfiehlt, täglich die Zähne zu putzen, und weist darauf hin, dass Greyhounds ohne isolierende Unterwolle empfindlich auf extreme Temperaturen reagieren können.",
      ],
      sources: ["S912", "S913", "S914", "S916", "S917", "S918", "S920", "S10"],
    },
    xoloitzcuintli: {
      aka: "Xoloitzcuintli, Xolo, Mexikanischer Nackthund, Mexican Hairless Dog",
      text: [
        "Der Xoloitzcuintle ist ein uralter Hund vom Urtyp aus Mexiko; die FCI führt ihn in Gruppe 5 unter den Hunden vom Urtyp. Der FCI-Standard beschreibt einen stillen, ruhigen Hund, fröhlich, wachsam und intelligent, nie aggressiv. Es gibt zwei Varietäten, die sich nur in Fell und Gebiss unterscheiden: nackt, mit glatter, unbehaarter Haut, und behaart, mit kurzem, anliegendem Fell. Die Rasse kommt in drei Größen vor – 25–35 cm, 35–45 cm und 46–60 cm Widerristhöhe – und in den Farben Schwarz, Schwarzgrau, Schiefergrau, Dunkelgrau, Rötlich, Leberbraun, Bronze oder Blond; bevorzugt wird einfarbig dunkle Haut. WebMD nennt ein Gewicht von 10 bis 15 Pfund für den Toy-, 15 bis 30 für den Miniatur- und 30 bis 55 Pfund für den Standard-Xolo (etwa 4,5–24,9 kg über alle Größen). Ein Hund der Standardgröße ist mit etwa 12–15 Monaten ausgewachsen (PetMD). PetMD und WebMD geben beide eine Lebenserwartung von 13–18 Jahren an.",
        "PetMD schreibt, Xolos bräuchten täglich etwa 20 Minuten Bewegung. Die nackte Haut braucht Pflege: PetMD rät, den Hund vor dem Gang nach draußen mit Hundesonnencreme einzucremen, niemals mit Sonnencreme für Menschen. VCA schreibt, dass die Hunde am besten für warmes Klima geeignet sind und bei kühleren Temperaturen einen Pullover brauchen. WebMD nennt den Xolo einen guten Familienhund für Familien mit Kindern und empfiehlt, zwei- bis dreimal pro Woche die Zähne zu putzen. PetMD ergänzt, dass der Umgang mit Kindern stets beaufsichtigt werden sollte, dass Welpen sozialisiert werden müssen, damit sie nicht misstrauisch gegenüber neuen Menschen aufwachsen, und dass die Rasse einen hohen Jagdtrieb gegenüber kleinen Tieren hat.",
      ],
      sources: ["S923", "S924", "S926", "S927", "S928", "S10"],
    },
    spinone_italiano: {
      aka: "Spinone, Italienischer Spinone, Italienischer Rauhaariger Vorstehhund, Italian Spinone",
      text: [
        "Der Spinone Italiano ist ein italienischer Vorstehhund; die FCI führt ihn in Gruppe 7 unter den Kontinentalen Vorstehhunden vom Typ Griffon. Der FCI-Standard beschreibt einen Hund von solidem Körperbau, robust und kraftvoll, mit kräftigem Knochenbau und rauem Fell. Von Natur aus ist er gesellig, gelehrig und geduldig und ein erfahrener Jäger in jedem Gelände. Es gibt ihn in Reinweiß, Weiß mit orangefarbenen Abzeichen, Orangeschimmel, Weiß mit braunen Abzeichen und Braunschimmel. Die Widerristhöhe beträgt 60–70 cm bei Rüden und 58–65 cm bei Hündinnen, das Gewicht 32–37 kg bei Rüden und 28–30 kg bei Hündinnen. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Die PDSA gibt eine Lebenserwartung von über 10 Jahren an, PetMD 10–12 Jahre.",
        "Die PDSA nennt den Spinone eine energiegeladene Rasse, die idealerweise mehr als 2 Stunden Bewegung am Tag braucht; das dichte, teils drahtige Fell müsse zu Hause 2- oder 3-mal pro Woche gepflegt werden. WebMD empfiehlt wöchentliches Krallenkürzen und tägliches Zähneputzen, sagt, dass die Rasse meist gut mit anderen Hunden und Kindern auskommt, und warnt, dass langes Alleinsein oft zu Ärger führt. PetMD rät, Welpen früh zu sozialisieren, den Hund draußen an der Leine oder in einem eingezäunten Bereich zu halten und ihn wegen der Gefahr einer Magenblähung (Bloat) eine Stunde vor und nach dem Fressen nicht toben zu lassen.",
      ],
      sources: ["S935", "S936", "S937", "S938", "S10"],
    },
    pointer: {
      aka: "Englischer Pointer, English Pointer",
      text: [
        "Der Pointer ist ein britischer Vorstehhund; die FCI führt ihn in Gruppe 7 unter den Britischen und Irischen Vorstehhunden. Der FCI-Standard beschreibt einen symmetrischen, gut gebauten Hund mit einem Umriss aus anmutigen Kurven, kräftig, aber geschmeidig, aufmerksam und von gutmütigem, ausgeglichenem Wesen. Sein Fell ist fein, kurz und hart mit ausgeprägtem Glanz. Die üblichen Farben sind Zitronengelb-Weiß, Orange-Weiß, Leberbraun-Weiß und Schwarz-Weiß. Der FCI-Standard nennt eine Widerristhöhe von 63–69 cm bei Rüden und 61–66 cm bei Hündinnen; der UKC-Standard gibt ein Arbeitsgewicht von 55–75 Pfund (etwa 25–34 kg) bei Rüden und 44–65 Pfund (etwa 20–29,5 kg) bei Hündinnen an. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Die PDSA gibt eine Lebenserwartung von über 12 Jahren an, PetMD 10–12 Jahre.",
        "Die PDSA schreibt, Pointer hätten ein hohes Energieniveau und brauchten idealerweise über 2 Stunden Bewegung am Tag, aktive Halter und gutes Abruftraining; ihr kurzes Fell brauche nur einmal pro Woche Fellpflege. PetMD rät, sie in einem eingezäunten Garten zu halten, damit sie nicht davonstreifen, und weist darauf hin, dass sie für Ziervögel eine Gefahr sein können. WebMD empfiehlt, täglich die Zähne zu putzen, und schreibt, dass sie nicht besonders gut mit kleinen Kindern auskommen. Die PDSA ergänzt, dass eine gute Sozialisierung im Welpenalter wie bei allen Rassen hilft, sich gut ins Familienleben einzufügen.",
      ],
      sources: ["S943", "S944", "S945", "S946", "S947", "S10"],
    },
    welsh_terrier: {
      aka: "Walisischer Terrier, Welshie, Welsh",
      text: [
        "Der Welsh Terrier ist ein Terrier aus Großbritannien; die FCI führt ihn in Gruppe 3 unter den großen und mittelgroßen Terriern. Der FCI-Standard beschreibt einen flotten, arbeitsfähigen, ausgewogenen und kompakten Hund mit drahtigem, hartem, sehr dicht anliegendem und reichlichem Fell. Laut Standard ist er anhänglich, gehorsam und leicht zu führen, fröhlich und selten scheu. Die Farbe ist Schwarz mit Brand oder Schwarz-Grizzle mit Brand. Die Widerristhöhe beträgt bis zu 39 cm, das Gewicht 9–9,5 kg (20–21 Pfund). Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD). Der Royal Kennel Club und die PDSA geben eine Lebenserwartung von über 12 Jahren an, PetMD 12–15 Jahre.",
        "Der Royal Kennel Club sagt, der Welsh Terrier brauche bis zu 1 Stunde Bewegung am Tag und Fellpflege mehr als einmal pro Woche; die PDSA nennt etwa eine Stunde Bewegung täglich und zwei- bis dreimal pro Woche Fellpflege. Sie beschreibt einen verspielten, freundlichen Hund, der Kinder liebt und ein ausgezeichneter Familienhund ist. PetMD weist auf einen starken Jagdtrieb hin – kleinere Tiere würden möglicherweise gejagt – und rät, draußen eine Leine oder einen eingezäunten Bereich zu nutzen und früh mit Sozialisierung und Erziehung zu beginnen.",
      ],
      sources: ["S955", "S956", "S957", "S958", "S10"],
    },
    american_hairless_terrier: {
      aka: "Amerikanischer Haarloser Terrier, AHT",
      text: [
        "Der American Hairless Terrier ist ein kleiner bis mittelgroßer, geschmeidig bemuskelter und aktiver Terrier aus den USA. Der American Kennel Club erkennt ihn in der Terrier Group an; die FCI führt ihn nicht. Der Rassestandard beschreibt einen energiegeladenen, wachsamen, neugierigen und intelligenten Hund mit V-förmigen Ohren und natürlicher Rute, die nie kupiert wird. Es gibt zwei Varietäten: die nackte, die bis auf Tasthaare sowie Haare an Augenbrauen und Fang haarlos ist, und eine behaarte mit kurzem, glattem Fell. Der Standard nennt eine ideale Größe von 12–16 Zoll (30–41 cm); PetMD gibt ein Gewicht von 12–28 Pfund (5,4–12,7 kg) und eine Lebenserwartung von 14–16 Jahren an. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD).",
        "Dogs NSW nennt etwa 20 Minuten Bewegung am Tag. PetMD schreibt, regelmäßige Bewegung und geistige Anregung seien für diese Rasse ein Muss; die Hunde seien großartige Spielkameraden für Kinder, bei kleinen Kindern sei jedoch Aufsicht nötig. Die nackte Haut braucht Pflege: Der Rasseclub schreibt, Sonnencreme oder Schutzkleidung seien ein Muss, um Sonnenbrand zu verhindern; PetMD rät zu einem Pullover bei Kälte und zu regelmäßigen Bädern, möglichst wöchentlich. WebMD rät, täglich die Zähne zu putzen, und der Rasseclub empfiehlt, wöchentlich die Krallen zu kürzen. Außerdem weist der Rasseclub auf einen hohen Jagdtrieb hin.",
      ],
      sources: ["S967", "S971", "S972", "S973", "S977", "S10"],
    },
    tibetan_spaniel: {
      aka: "Tibetan Spaniel, Tibet-Spaniel, Tibetanischer Spaniel, Tibbie",
      text: [
        "Der Tibet Spaniel ist ein kleiner, aktiver und wachsamer Begleithund aus Tibet (China). In der FCI gehört er zur Gruppe der Gesellschafts- und Begleithunde, Sektion Tibetanische Rassen; Patronatsland der Rasse ist Großbritannien. Der FCI-Standard beschreibt ihn als fröhlich und selbstbewusst, hochintelligent und Fremden gegenüber distanziert, wachsam, treu, aber unabhängig, etwas länger als hoch, mit seidigem Fell von mittlerer Länge, befederten Ohren und einer reich behangenen, über dem Rücken eingerollt getragenen Rute; alle Farben außer Merle sind zugelassen. Der Standard nennt eine Größe von etwa 25,4 cm und ein Idealgewicht von 4,1–6,8 kg; ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD). In einer großen britischen Studie (McMillan et al., 2024) gehörte die Rasse mit einem Median von 15,2 Jahren zu den langlebigsten; die PDSA gibt eine Lebenserwartung von über 12 Jahren an.",
        "Die PDSA schreibt, Tibet Spaniels brauchten täglich etwa eine Stunde Bewegung, machten bei Familienspielen gern mit, kämen in der Regel mit allen gut aus und seien gute Familienhunde; ein paarmal pro Woche Fellpflege genüge meist. WebMD schreibt, sie neigten zu Trennungsangst, passten besser zu Familien mit älteren Kindern, brauchten einen sicher eingezäunten Garten und könnten bei heißem Wetter überhitzen. WebMD rät außerdem, täglich die Zähne zu putzen, die Ohren mindestens einmal pro Woche zu kontrollieren, die Krallen monatlich zu prüfen und etwa monatlich zu baden.",
      ],
      sources: ["S980", "S981", "S982", "S771", "S10"],
    },
    black_russian_terrier: {
      aka: "Schwarzer Russischer Terrier, Black Russian Terrier, Tschiorny Terrier, Tchiorny Terrier, BRT",
      text: [
        "Der Russische Schwarze Terrier ist ein großer, robuster und sehr athletischer Gebrauchshund aus Russland; die FCI führt ihn in der Gruppe der Pinscher und Schnauzer. Der FCI-Standard beschreibt ihn als würdevoll, selbstsicher und beherrscht, liebenswürdig, anspruchslos, klug und freundlich. Sein raues, dichtes Doppelfell bildet üppige Augenbrauen, einen Schnurrbart und einen Bart; die einzigen Farben sind Schwarz und Schwarz mit etwas eingemischtem grauem Haar. Der Standard nennt für Rüden 72–76 cm und 50–60 kg, für Hündinnen 68–72 cm und 45–50 kg; ein Hund dieser Größe erreicht sein Erwachsenengewicht in der Regel mit 18–24 Monaten. Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an.",
        "Der Royal Kennel Club nennt mehr als 2 Stunden Bewegung und tägliche Fellpflege, ein großes Haus mit Garten und ein Fell, das nicht haart. PetMD schreibt, die Rasse sei ihrer Familie ergeben und könne unter Aufsicht gut mit Kindern auskommen; frühe und konsequente Sozialisierung sei wichtig, und wegen der Gefahr einer Magenblähung (Bloat) solle man unmittelbar vor und nach den Mahlzeiten anstrengende Bewegung vermeiden. Als ideal gelten laut VCA ältere Kinder in der Familie; VCA empfiehlt außerdem, das Fell alle sechs bis acht Wochen von einem professionellen Hundefriseur trimmen zu lassen.",
      ],
      sources: ["S985", "S986", "S989", "S990", "S10"],
    },
    neapolitan_mastiff: {
      aka: "Neapolitanischer Mastiff, Neapolitan Mastiff, Neo",
      text: [
        "Der Mastino Napoletano ist ein großer, schwerer und massiger Wachhund aus Italien; die FCI führt ihn in Gruppe 2 unter den Molossern vom Mastiff-Typ. Der FCI-Standard beschreibt ihn als ausgeglichen und treu, nicht aggressiv, mit kurzem, hartem, dichtem Fell und dicker, lockerer Haut, die vor allem am Kopf zahlreiche Falten und Runzeln bildet. Bevorzugte Farben sind Grau, Bleigrau und Schwarz, aber auch Braun, Falb und Dunkelfalb. Der Standard nennt für Rüden 65–75 cm und 60–70 kg, für Hündinnen 60–68 cm und 50–60 kg; ein Hund dieser Größe erreicht sein Erwachsenengewicht in der Regel mit 18–24 Monaten. Der Royal Kennel Club und die PDSA geben eine Lebenserwartung von unter 10 Jahren an, PetMD nur 7–9 Jahre.",
        "Der Royal Kennel Club nennt bis zu 1 Stunde Bewegung am Tag, einmal pro Woche Fellpflege, ein Fell, das haart, und ein großes Haus mit Garten; er führt die Rasse in Breed-Watch-Kategorie 3. Die PDSA schreibt, wegen der überschüssigen Haut im Gesicht kämen Lidprobleme wie Entropium und Ektropium vor. Sie nennt Mastini Napoletani treue, ergebene Hunde, die das Familienleben lieben, und sagt, dass ihre Hautfalten täglich gereinigt werden müssen. PetMD schreibt, sie seien großartig mit Familien und Kindern, sollten aber nicht allein mit einem kleinen Kind gelassen werden; sie speicheln stark, und richtige Sozialisierung sowie Training mit positiver Verstärkung sollten früh beginnen.",
      ],
      sources: ["S993", "S994", "S995", "S996", "S10"],
    },
    norfolk_terrier: {
      aka: "Norfolk Terrier, Norfolk, Norfolk terrier",
      text: [
        "Der Norfolk Terrier gehört zu den kleinsten Terriern und stammt aus Großbritannien; die FCI führt ihn in Gruppe 3 unter den kleinen Terriern. Der FCI-Standard beschreibt einen niedrigen, wachen, kompakten und kräftigen kleinen Hund, der für seine Größe ein „Teufelskerl“ ist, mit liebenswertem Wesen, aufmerksam und furchtlos; sein Fell ist hart, drahtig und gerade, die mittelgroßen V-Ohren fallen nach vorn und liegen dicht an der Wange an. Die Farben sind alle Rottöne, Weizenfarben, Schwarz mit Brand oder Grizzle. Der Standard nennt eine ideale Widerristhöhe von 25 cm, aber kein Gewicht; der UKC-Standard gibt 11 bis 12 Pfund (etwa 5–5,4 kg) an, die PDSA 5–5,5 kg. Ein Hund dieser Größe erreicht sein Erwachsenengewicht in der Regel mit 9–12 Monaten. Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, Woodgreen 12–15 Jahre.",
        "Der Royal Kennel Club nennt bis zu 1 Stunde Bewegung am Tag, mehr als einmal pro Woche Fellpflege und ein Fell, das haart, und sagt, die Rasse könne in einer Wohnung leben; er führt sie in Breed-Watch-Kategorie 1 und nennt keine empfohlenen Gesundheitsuntersuchungen vor der Zucht. Die PDSA schreibt, das drahtige Fell müsse ein paarmal pro Woche gekämmt und drei- bis viermal im Jahr getrimmt werden, außerdem graben Norfolk Terrier gern. Woodgreen nennt sie sanft und geduldig im Umgang mit Kindern, allerdings immer unter Aufsicht. Sie seien nicht gern lange allein, könnten Ausbruchskünstler sein und bräuchten einen Zaun, aus dem sie nicht entwischen können; mit ihrem starken Jagdtrieb seien kleine Haustiere wie Kaninchen oder Meerschweinchen in ihrer Nähe womöglich nicht sicher.",
      ],
      sources: ["S1010", "S1011", "S1012", "S1013", "S1016", "S10"],
    },
    belgian_sheepdog: {
      aka: "Groenendael, Belgian Shepherd Groenendael, Belgian Shepherd Dog (Groenendael), Belgian Groenendael, Belgischer Schäferhund Groenendael",
      text: [
        "Der Groenendael (Belgian Sheepdog) ist die langhaarige schwarze Varietät des Belgischen Schäferhundes, eines Hütehundes aus Belgien. Die FCI erkennt nur eine Rasse Belgischer Schäferhund an, und zwar mit vier Varietäten, und führt sie in Gruppe 1 unter den Hütehunden. Der FCI-Standard beschreibt einen harmonisch proportionierten Hund, der Eleganz und Kraft verbindet, mit eher kleinen, hoch angesetzten Stehohren und langem, glattem Haar, das an Hals und Vorbrust noch länger ist; für den Groenendael lässt er nur einfarbiges Schwarz zu. Als Widerristhöhe nennt der Standard etwa 62 cm für Rüden und 58 cm für Hündinnen, als Gewicht etwa 25–30 kg für Rüden und 20–25 kg für Hündinnen. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD und WebMD 12–14 Jahre.",
        "Der Royal Kennel Club beschreibt einen wachsamen, vorsichtigen und sehr intelligenten Hund mit großer Arbeitsfreude. Er empfiehlt mehr als 2 Stunden Bewegung am Tag und mehr als einmal pro Woche Fellpflege, sagt, die Rasse haare und eigne sich für ein großes Haus mit großem Garten, und führt sie in Breed-Watch-Kategorie 1. PetMD schreibt, Belgische Schäferhunde bauten eine enge Bindung zu ihren Menschen auf, brauchten viel Bewegung und geistige Beschäftigung und könnten versuchen, Kinder und Katzen zu hüten. Empfohlen werden frühe Sozialisierung, wöchentliches Bürsten und das Reinigen der Ohren ein- bis zweimal im Monat. WebMD schreibt, sie brauchten fast zwei Stunden Bewegung am Tag und seien keine gute Wahl für Menschen, die stundenlang außer Haus sind; empfohlen werden tägliches Zähneputzen und einmal im Monat ein Bad.",
      ],
      sources: ["S312", "S313", "S1019", "S1020", "S1021", "S10"],
    },
    bracco_italiano: {
      aka: "Bracco Italiano, Italian Pointer, Italian Pointing Dog, Bracco, Italienischer Vorstehhund",
      text: [
        "Der Bracco Italiano (Italian Pointing Dog) ist ein italienischer Vorstehhund; die FCI führt ihn in Gruppe 7 unter den Kontinentalen Vorstehhunden vom Typ „Braque“. Der FCI-Standard beschreibt einen kräftigen, harmonisch gebauten Hund von mächtiger Erscheinung mit kurzem, dichtem, glänzendem Haar und langen Ohren, die bis zur Nasenspitze reichen; zugelassen sind Weiß, Weiß mit orangefarbenen oder bernsteinfarbenen Abzeichen, Weiß mit braunen Abzeichen, Orangeschimmel und Braunschimmel. Als Widerristhöhe nennt der Standard 58–67 cm für Rüden und 55–62 cm für Hündinnen, als Gewicht je nach Größe 25–40 kg. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von unter 10 Jahren an, PetMD 10–14 Jahre und der Bracco Italiano Club of America einen Median von 11 Jahren.",
        "Der Royal Kennel Club empfiehlt mehr als 2 Stunden Bewegung am Tag und einmal pro Woche Fellpflege, sagt, die Rasse haare und eigne sich für ein großes Haus mit großem Garten auf dem Land, und führt sie in Breed-Watch-Kategorie 1. PetMD beschreibt einen verspielten, intelligenten, sanften und anhänglichen Hund, der in der Regel gut mit anderen Hunden und mit Kindern auskommt, gern in der Nähe seiner Menschen ist und für Familien, die oft außer Haus sind, womöglich nicht passt; empfohlen werden frühe Sozialisierung, wöchentliches Bürsten und eine Einschränkung der Bewegung unmittelbar vor und nach den Mahlzeiten wegen des Risikos einer Magendrehung. Der Bracco Italiano Club of America bittet Züchter, bei den Elterntieren Hüft- und Ellbogengelenke, Augen und Nieren untersuchen zu lassen.",
      ],
      sources: ["S1023", "S1024", "S1027", "S1028", "S10"],
    },
    german_pinscher: {
      aka: "Deutscher Pinscher, German Pinscher, Standard Pinscher, Pinscher",
      text: [
        "Der Deutsche Pinscher ist ein Wach- und Begleithund aus Deutschland und der Vorfahre des Dobermanns und des Zwergpinschers; die FCI führt ihn in Gruppe 2 unter den Pinschern und Schnauzern. Der FCI-Standard beschreibt einen glatthaarigen, mittelgroßen, eleganten und quadratisch gebauten Hund mit stolzer Haltung und einem lebhaften, temperamentvollen, selbstsicheren und ausgeglichenen Wesen, mit natürlichen, V-förmigen Hängeohren und natürlicher Rute; zugelassen sind nur einfarbig Hirschrot bis Dunkelrotbraun sowie Lackschwarz mit roten oder braunen Abzeichen. Als Widerristhöhe nennt der Standard 45–50 cm und als Gewicht 14–20 kg für Rüden und Hündinnen. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an, PetMD und WebMD 12–14 Jahre.",
        "Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung am Tag und einmal pro Woche Fellpflege, sagt, die Rasse haare, passe gut zum Familienleben und eigne sich für ein kleines Haus mit kleinem oder mittelgroßem Garten, und führt sie in Breed-Watch-Kategorie 1. PetMD schreibt, Deutsche Pinscher könnten gut mit Kindern auskommen, wenn sie gut erzogen und sozialisiert seien, dies aber stets unter Aufsicht; sie hätten einen starken Jagdtrieb und brauchten einen eingezäunten Garten und täglich geistige Beschäftigung. Empfohlen werden konsequente Sozialisierung ab dem Welpenalter, wöchentliches Bürsten, wöchentliche Ohrenreinigung und etwa alle sechs bis acht Wochen ein Bad. WebMD schreibt, sie passten zu erfahrenen Haltern, und ihre Krallen müssten einmal im Monat gekürzt werden.",
      ],
      sources: ["S1030", "S1031", "S1032", "S1033", "S10"],
    },
    bedlington_terrier: {
      aka: "Bedlington Terrier, Bedlington",
      text: [
        "Der Bedlington Terrier ist ein Terrier aus Großbritannien, benannt nach der Bergbaustadt Bedlington in Northumberland; die FCI führt ihn in Gruppe 3 unter den großen und mittelgroßen Terriern. Der FCI-Standard beschreibt einen anmutigen, geschmeidigen, muskulösen Hund, der gutmütig, anhänglich und würdevoll sowie temperamentvoll und voller Selbstvertrauen ist, mit einem sehr charakteristischen dichten, flockigen Haarkleid, das gut von der Haut absteht, und einem üppigen, fast weißen Kopfschopf; zugelassen sind Blau, Leberbraun oder Sandfarben, mit oder ohne Brand. Als Widerristhöhe nennt der Standard etwa 41 cm und als Gewicht 8,2–10,4 kg. Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD-Größenklasse). Eine britische Studie aus dem Jahr 2024, die Dogs Trust vorgelegt wurde, ermittelte eine mediane Lebenserwartung von 13,7 Jahren, und PDSA gibt eine Lebenserwartung von über 10 Jahren an.",
        "PDSA empfiehlt mindestens eine Stunde Bewegung am Tag und schreibt, Bedlingtons haarten nicht stark, könnten unter Aufsicht geduldig und tolerant gegenüber Kindern sein, hätten einen sehr starken Jagdtrieb und sollten nicht länger als vier Stunden allein gelassen werden; als eine der Erkrankungen, über die man Bescheid wissen sollte, nennt PDSA die Kupfertoxikose, eine erbliche Kupferansammlung in der Leber, und empfiehlt für das klassische Aussehen etwa alle sechs Wochen einen professionellen Hundefriseur. Woodgreen empfiehlt, zwei- bis dreimal pro Woche zu bürsten und einen vollständig eingezäunten Garten zu haben, und schreibt, sie eigneten sich nicht gut für das Leben in einer Wohnung. PetMD schreibt, sie passten zu Familien mit älteren Kindern und brauchten schon als Welpen konsequente Sozialisierung; WebMD empfiehlt, ihnen täglich die Zähne zu putzen.",
      ],
      sources: ["S1035", "S1037", "S1038", "S1040", "S1041", "S123", "S10"],
    },
    finnish_lapphund: {
      aka: "Finnischer Lapphund, Finnish Lapphund, Finnish Lapponian Dog, Suomenlapinkoira, Lapinkoira, Lappie, Lapphund",
      text: [
        "Der Finnische Lapphund (Finnish Lapponian Dog, Suomenlapinkoira) ist ein Wach- und Hütehund aus Finnland, der ursprünglich zum Hüten von Rentieren eingesetzt wurde; die FCI führt ihn in Gruppe 5 unter den nordischen Wach- und Hütehunden. Der FCI-Standard beschreibt einen Hund von knapp unter mittlerer Größe, intelligent, mutig, ruhig und fügsam, freundlich und treu, mit reichlichem, langem, hartem Deckhaar über weicher, dichter Unterwolle; alle Farben sind zugelassen. Der Standard nennt eine ideale Widerristhöhe von 49 cm für Rüden und 44 cm für Hündinnen bei einer Toleranz von 3 cm, aber kein Gewicht; PetMD und WebMD geben 33–53 Pfund (etwa 15–24 kg) an, und ein Hund dieser Größe erreicht sein Erwachsenengewicht in der Regel mit 12–15 Monaten. Der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an, PetMD und WebMD 12–15 Jahre.",
        "Der Royal Kennel Club nennt bis zu 1 Stunde Bewegung am Tag, einmal pro Woche Fellpflege, ein Fell, das haart, und ein kleines Haus mit kleinem oder mittelgroßem Garten; er führt die Rasse in Breed-Watch-Kategorie 1. WebMD schreibt, Lappies kämen gut mit Kindern aus, weil sie Familienbegleithunde seien, und ihre Krallen sollten einmal im Monat gekürzt werden. PetMD schreibt, sie sehnten sich nach Gesellschaft, seien ausgesprochen bellfreudig, müssten nur einmal im Monat gebadet werden und kämen mit Menschen jeden Alters zurecht, wenn sie als Welpen sozialisiert würden. Als Erkrankungen, über die man Bescheid wissen sollte, nennt PetMD Hüft- und Ellbogendysplasie sowie progressive Retinaatrophie.",
      ],
      sources: ["S1003", "S1004", "S1006", "S1007", "S10"],
    },
    norwegian_elkhound: {
      aka: "Norwegischer Elchhund, Grauer Elchhund, Elchhund, Norwegian Elkhound, Norsk Elghund Grå",
      text: [
        "Der Norwegische Elchhund grau ist ein grauer nordischer Jagdspitz aus Norwegen, gezüchtet zur Elchjagd; die FCI führt ihn in Gruppe 5 unter den Nordischen Jagdhunden. Der FCI-Standard beschreibt einen typischen Spitz: kompakt, kurz und quadratisch gebaut, mit kleinen aufrechten Ohren, einer fest über dem Rücken eingerollten Rute und dichtem, grobem Fell von mittlerer Länge. Das Wesen ist furchtlos, energiegeladen und mutig. Grau in verschiedenen Schattierungen ist die einzige Farbe, die der Standard zulässt. Der FCI-Standard nennt eine ideale Widerristhöhe von 52 cm bei Rüden und 49 cm bei Hündinnen, der AKC-Standard ein Gewicht von etwa 55 Pfund (25 kg) bei Rüden und etwa 48 Pfund (22 kg) bei Hündinnen. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD), und PetMD und WebMD geben eine Lebenserwartung von 12–15 Jahren an.",
        "PetMD empfiehlt eine Stunde Bewegung am Tag und schreibt, die Rasse brauche geistige Anregung ebenso wie körperliche Bewegung. Mit Kindern jeden Alters sei sie großartig, wenn der Kontakt beaufsichtigt wird, und ein wunderbarer Familienhund, wenn sie als Welpe sozialisiert und früh erzogen wird. Draußen rät PetMD zu einem sicher eingezäunten Bereich oder zur Leine; die Rasse haart stark, und das dichte Fell macht sie anfällig für Überhitzung. WebMD rät, das Fell täglich mindestens zwei Minuten zu bürsten und täglich die Zähne zu putzen.",
      ],
      sources: ["S960", "S961", "S963", "S964", "S10"],
    },
    mudi: {
      aka: "Hungarian Mudi",
      text: [
        "Der Mudi ist ein ungarischer Hütehund; die FCI führt ihn in Gruppe 1 unter den Schäferhunden. Der FCI-Standard beschreibt einen mittelgroßen Hund mit keilförmigem Kopf, Stehohren und nach hinten abfallender Rückenlinie, mit dichtem, glänzendem, welligem oder leicht gelocktem Fell. Laut Standard ist er äußerst lernfähig, lebhaft, mutig, wachsam und arbeitsfreudig. Die Farben sind Schwarz, Weiß, Falb, Asch (Blau), Leberbraun, Aschbraun und Cifra (Merle). Die Widerristhöhe beträgt 41–47 cm bei Rüden und 38–44 cm bei Hündinnen; PetMD gibt ein Gewicht von 18–29 Pfund (etwa 8–13 kg) an. Ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD). Der Royal Kennel Club gibt eine Lebenserwartung von über 10 Jahren an; PetMD nennt 12–14 Jahre.",
        "Der Royal Kennel Club sagt, der Mudi brauche bis zu 1 Stunde Bewegung am Tag und einmal pro Woche Fellpflege. Er sei seiner Familie treu und zugetan und brauche ein Ventil für seine Energie und Intelligenz; am besten passe er zu einem erfahrenen Halter, der ihm Anregung, Struktur und Aufgaben bieten kann. PetMD beschreibt ihn als klugen, unabhängigen und lautstarken Hund und schreibt, dass Mudi-Welpen früh sozialisiert werden müssen, um sich in der Nähe von Kindern, anderen Haustieren und neuen Menschen wohlzufühlen.",
      ],
      sources: ["S949", "S950", "S952", "S10"],
    },
    lhasa_apso: {
      aka: "Lhasa, Apso, Lasa Apso",
      text: [
        "Der Lhasa Apso ist ein kleiner Begleithund aus Tibet; der Royal Kennel Club schreibt, er sei ursprünglich von tibetischen Mönchen als Begleiter und Wachhund gehalten worden. Er ist ein kleiner Hund mit langem Fell; VCA nennt eine Größe von 10–11 Zoll (etwa 25–28 cm) und ein Gewicht von 13–15 Pfund (etwa 6–7 kg). Ein Hund dieser Größe ist mit etwa 9–12 Monaten ausgewachsen (PetMD), und der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an.",
        "Der Royal Kennel Club empfiehlt bis zu 1 Stunde Bewegung am Tag und tägliche Fellpflege; die Rasse haart nicht, eignet sich für eine Wohnung und steht in Breed-Watch-Kategorie 1. Die PDSA schreibt, Lhasa Apsos kämen bei richtiger Sozialisierung als Welpen gut mit Kindern und anderen Haustieren im Haushalt aus und könnten Fremden gegenüber etwas misstrauischer sein. WebMD empfiehlt, mindestens alle zwei Wochen zu baden, alle 3 bis 4 Wochen die Krallen zu kürzen und die Zähne so regelmäßig wie möglich zu putzen.",
      ],
      sources: ["S740", "S741", "S742", "S743", "S10"],
    },
    coton_de_tulear: {
      aka: "Coton de Tulear, Coton, Royal Dog of Madagascar",
      text: [
        "Der Coton de Tuléar stammt aus Madagaskar; Patronatsland ist Frankreich. Die FCI führt ihn unter den Bichons und verwandten Rassen. Der FCI-Standard beschreibt einen kleinen, langhaarigen Begleithund mit weißem, baumwollartigem Fell, runden dunklen Augen und lebhaftem, intelligentem Ausdruck, von fröhlichem, gefestigtem Wesen und sehr gesellig gegenüber Menschen und anderen Hunden. Die Widerristhöhe beträgt 26–28 cm bei Rüden und 23–25 cm bei Hündinnen, das Gewicht 4–6 kg bei Rüden und 3,5–5 kg bei Hündinnen; die Grundfarbe ist Weiß. Ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD); der Royal Kennel Club gibt eine Lebenserwartung von über 12 Jahren an.",
        "Der Royal Kennel Club empfiehlt bis zu 30 Minuten Bewegung am Tag und sagt, dass die Rasse für eine Wohnung geeignet ist, wenig haart und tägliche Fellpflege braucht. Die PDSA nennt Cotons treue und liebevolle Hunde, die im Familienleben aufblühen und ausgezeichnete Familienhunde sind. PetMD schreibt, sie kämen bei richtigem Kennenlernen in der Regel gut mit Kindern und anderen Haustieren aus und könnten Trennungsangst entwickeln, wenn sie länger als ein paar Stunden allein bleiben. Außerdem empfiehlt PetMD, die Ohren mindestens einmal pro Woche zu kontrollieren und etwa einmal im Monat zu baden.",
      ],
      sources: ["S10", "S721", "S722", "S724", "S725", "S726"],
    },
    chow_chow: {
      aka: "Chow",
      text: [
        "Der Chow-Chow ist ein kompakter, löwenartiger Spitz aus China mit dichtem, abstehendem Fell in einer einzigen Farbe: Schwarz, Rot, Blau, Falb, Creme oder Weiß (FCI-Rassestandard). Der FCI-Standard nennt eine Widerristhöhe von 48–56 cm bei Rüden und 46–51 cm bei Hündinnen; die PDSA gibt ein Durchschnittsgewicht von 20–30 kg an. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Die PDSA nennt eine Lebenserwartung von unter 10 Jahren, PetMD 8–12 Jahre.",
        "Die PDSA schreibt, die Rasse brauche mindestens eine Stunde Bewegung am Tag, tägliches Bürsten und eine Pause zwischen Fressen und Bewegung. Sie beschreibt treue Hunde, die in einem passenden Haushalt, am besten bei erfahrenen Haltern, ideale Haustiere sein können. Für Familien mit kleinen Kindern empfiehlt sie die Rasse nicht und weist auf einen hohen Jagdtrieb hin; Chow-Chows vertrügen Alleinsein womöglich nicht und sollten von klein auf gut sozialisiert werden. PetMD ergänzt, dass das dichte Fell und die kurze Schnauze sie anfälliger für Überhitzung machen.",
      ],
      sources: ["S696", "S700", "S701", "S10"],
    },
    old_english_sheepdog: {
      aka: "Bobtail, Bob-tail, OES, Old English Sheepdog",
      text: [
        "Der Altenglische Schäferhund ist ein großer, kräftiger, quadratisch wirkender Hütehund aus Großbritannien mit üppigem, hartem, zottigem Fell: jede Schattierung von Grau, Grizzle oder Blau am Körper, mit weißem Kopf, Hals und weißer Vorderpartie (FCI-Rassestandard). Der FCI-Standard nennt eine Widerristhöhe ab 61 cm bei Rüden und ab 56 cm bei Hündinnen; die PDSA gibt eine durchschnittliche Größe von 56–61 cm und ein Durchschnittsgewicht von 27–30 kg an. Ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD). Die PDSA nennt eine Lebenserwartung von über 10 Jahren, PetMD 10–12 Jahre.",
        "Die PDSA schreibt, die Rasse brauche mindestens zwei Stunden Bewegung am Tag, aufgeteilt auf mehrere Spaziergänge, und das lange Fell tägliches Bürsten sowie etwa alle sechs Wochen einen Schnitt beim professionellen Hundefriseur. Sie beschreibt unkomplizierte Familienhunde, die besser zu Familien mit älteren Kindern passen, bei Alleinsein unter Trennungsangst leiden können und einen starken Hüte- und Jagdtrieb haben. Zwischen Fressen und Bewegung rät sie zu einer Pause.",
      ],
      sources: ["S704", "S705", "S706", "S10"],
    },
    pekingese: {
      aka: "Pekinese, Peke, Löwenhund, Lion Dog",
      text: [
        "Der Pekingese ist ein kleiner, löwenartiger Zwerghund aus China mit mäßig langem, glattem Fell und einer Mähne um den Hals. Der FCI-Rassestandard nennt ein Idealgewicht von höchstens 5 kg bei Rüden und 5,4 kg bei Hündinnen; die PDSA gibt ein Durchschnittsgewicht von 5 kg und eine Größe von 15–22 cm an. Ein Hund dieser Größe ist mit etwa 8–12 Monaten ausgewachsen (PetMD). Die PDSA nennt eine Lebenserwartung von über 12 Jahren, PetMD 12–14 Jahre.",
        "Die PDSA empfiehlt mindestens eine halbe Stunde Bewegung am Tag, aber ohne Übertreibung, weil das flache Gesicht das Atmen erschweren kann; an heißeren Tagen solle es gar keine Bewegung geben. Sie schreibt, das lange Fell müsse täglich gebürstet werden, die Rasse haare stark, besonders im Frühjahr und Herbst, und die Gesichtsfalten könnten zu Hautfalteninfektionen führen. Pekingesen kämen meist besser mit Erwachsenen oder älteren Kindern zurecht, könnten bei Alleinsein unter Trennungsangst leiden und sollten von klein auf sozialisiert werden. PetMD rät, täglich die Zähne zu putzen, die Ohren alle ein bis zwei Wochen zu reinigen und ein langes Fell alle sechs bis acht Wochen professionell pflegen zu lassen.",
      ],
      sources: ["S690", "S693", "S694", "S10"],
    },
    kerry_blue_terrier: {
      aka: "Kerry Blue, Kerry, Kerry-Blue-Terrier",
      text: [
        "Der Kerry Blue Terrier ist ein Terrier aus Irland; die FCI führt ihn in Gruppe 3 unter den großen und mittelgroßen Terriern. Der FCI-Standard beschreibt einen aufrechten, gut gebauten, muskulösen Hund mit durch und durch terriertypischem Wesen und einem weichen, üppigen, gewellten Fell, das in jeder Blauschattierung vorkommen darf, mit oder ohne schwarze Abzeichen. Als Gewicht nennt der Standard 15–18 kg für Rüden, bei Hündinnen entsprechend weniger, und als Widerristhöhe 45,5–49,5 cm bei Rüden und 44,5–48 cm bei Hündinnen; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD-Größenklasse). WebMD gibt eine Lebenserwartung von 12–15 Jahren an, VCA 10–12 Jahre.",
        "PetMD empfiehlt täglich etwa eine Stunde Bewegung und schreibt, die Rasse sei ein wunderbares Haustier für Familien, die mit Fellpflege und Auslauf Schritt halten können; sie sei gesellig, könne bei langem Alleinsein Trennungsangst entwickeln und neige möglicherweise dazu, kleineren Tieren nachzujagen. Empfohlen werden tägliches Zähneputzen, alle zwei bis vier Wochen eine Ohrenreinigung, etwa einmal im Monat ein Bad und etwa alle sechs Wochen ein Besuch beim professionellen Hundefriseur. WebMD schreibt, Kerrys seien anhänglich, gut mit Kindern und leicht zu erziehen, sie haarten sehr wenig, und die Halter müssten sich Zeit für die Sozialisierung nehmen; VCA empfiehlt, sie jeden zweiten Tag zu bürsten und zu kämmen.",
      ],
      sources: ["S1043", "S1046", "S1047", "S1048", "S10"],
    },
    irish_terrier: {
      aka: "Irish Terrier, Irischer Terrier",
      text: [
        "Der Irish Terrier ist ein Terrier aus Irland; die FCI führt ihn in Gruppe 3 unter den großen und mittelgroßen Terriern. Der FCI-Standard beschreibt einen aktiven, lebhaften, geschmeidigen und drahtigen Hund mit anmutiger, rassiger Linie und einem dichten, drahtigen Fell, das einfarbig rot, rot-weizenfarben oder gelbrot ist. Als Gewicht nennt der FCI-Standard 12,25 kg für Rüden und 11,4 kg für Hündinnen und als Widerristhöhe etwa 45,5 cm; ein Hund dieser Größe ist mit etwa 12–15 Monaten ausgewachsen (PetMD-Größenklasse). Der Royal Kennel Club und die PDSA geben eine Lebenserwartung von über 12 Jahren an, PetMD 13–15 Jahre.",
        "Der Royal Kennel Club empfiehlt bis zu einer Stunde Bewegung am Tag und mehr als einmal pro Woche Fellpflege; die PDSA schreibt, Irish Terrier hätten viel Energie, brauchten zwei- bis dreimal pro Woche Fellpflege, und Sozialisierung und Erziehung von klein auf seien sehr wichtig. Woodgreen schreibt, sie könnten ausgezeichnete Familienhunde sein, sanft und anhänglich gegenüber den Kindern im eigenen Haushalt, ihr starker Jagdtrieb werde durch kleine Tiere ausgelöst, Augen, Ohren und Maul sollten wöchentlich kontrolliert werden, und viele Halter ließen das Fell alle paar Monate scheren. WebMD empfiehlt, ihnen täglich die Zähne zu putzen.",
      ],
      sources: ["S1051", "S1053", "S1055", "S1056", "S1057", "S1058", "S10"],
    },
    bluetick_coonhound: {
      aka: "Bluetick, Blue Tick Coonhound, Coonhound",
      text: [
        "Der Bluetick Coonhound ist ein Coonhound und stammt aus den USA. Der von Dogs NSW wiedergegebene Rassestandard beschreibt einen schnellen, gut bemuskelten Laufhund mit gepflegtem, kompaktem Körper und glänzendem Fell: ein dunkelblauer, dicht gesprenkelter Körper mit schwarzen Flecken, Kopf und Ohren überwiegend schwarz, mit oder ohne lohfarbene Abzeichen. Rüden wiegen 25–36 kg und haben eine Widerristhöhe von 56–69 cm, Hündinnen wiegen 20–30 kg bei 53–64 cm Widerristhöhe; ein Hund dieser Größe ist mit etwa 15–18 Monaten ausgewachsen (PetMD-Größenklasse). PetMD gibt eine durchschnittliche Lebenserwartung von 11–12 Jahren an.",
        "Dogs NSW empfiehlt etwa 40 Minuten Bewegung am Tag und rät, die Rasse im Umgang mit Katzen und anderen Kleintieren zu beaufsichtigen. PetMD schreibt, Bluetick Coonhounds brauchten jeden Tag ausgiebige geistige Anregung und körperliche Bewegung; Leine und ein eingezäunter Garten seien unverzichtbar, weil sie einer Fährte unermüdlich folgten. Sie eigneten sich möglicherweise besser für ältere Kinder und erfahrene Halter, seien lauter als der Durchschnitt, und ihr kurzes Fell müsse nur einmal pro Woche gebürstet werden.",
      ],
      sources: ["S1061", "S1060", "S10"],
    },
  },
};

export default de;
