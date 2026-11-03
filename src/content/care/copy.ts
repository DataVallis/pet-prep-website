import type { Locale } from "@/i18n/config";
import type { Level } from "./care";

/**
 * Every word the care pages show (M6-K). Grammar that depends on the species lives in
 * `speciesWords` (one entry per species id) — a species without words fails the build.
 */
export type SpeciesWords = {
  /** Page title of the species food list: "What can dogs eat?" */
  question: string;
  /** Plural in running text (EN "dogs"; SL accusative "pse"). */
  plural: string;
  /** The pet a child looks after in the app, in running text (EN "dog"; SL accusative "kužka"). */
  pet: string;
};

export type CareCopy = {
  speciesWords: Record<string, SpeciesWords>;
  levels: Record<Level, { label: string; heading: string }>;
  hub: { foodsLead: (w: SpeciesWords) => string; count: (n: number) => string; open: string };
  species: {
    metaTitle: (w: SpeciesWords) => string;
    metaDescription: (w: SpeciesWords, n: number) => string;
    eyebrow: string;
    lead: (w: SpeciesWords) => string;
    emergencyTitle: string;
    emergencyText: string;
  };
  food: {
    why: string;
    signs: string;
    whatToDo: string;
    serving: string;
    forKids: string;
    faq: string;
    related: string;
    sources: string;
    updated: string;
    notVetReviewed: string;
    otherSpecies: string;
    simulates: string;
    simulatesText: (w: SpeciesWords) => string;
    backTo: string;
  };
  breadcrumb: string;
};

const en: CareCopy = {
  speciesWords: {
    dog: { question: "What can dogs eat?", plural: "dogs", pet: "dog" },
    cat: { question: "What can cats eat?", plural: "cats", pet: "cat" },
  },
  levels: {
    toxic: { label: "Toxic — call your vet", heading: "Toxic: never give it" },
    dangerous: { label: "Dangerous", heading: "Dangerous" },
    not_recommended: { label: "Not recommended", heading: "Better not" },
    small_amounts: { label: "OK in small amounts", heading: "OK as an occasional treat" },
  },
  hub: {
    foodsLead: (w) => `Safe, risky and toxic foods for ${w.plural} — each with the reason, the signs to watch for and the sources.`,
    count: (n) => `${n} foods`,
    open: "Open the list",
  },
  species: {
    metaTitle: (w) => `${w.question} Safe and toxic foods, with sources — PetPrep`,
    metaDescription: (w, n) => `${n} foods checked for ${w.plural}: what is toxic, what is risky and what is fine as a treat — the reason, the signs and what to do, with every source linked.`,
    eyebrow: "Care · food",
    lead: (w) => `Which foods are toxic, risky or fine for ${w.plural} — sorted by risk, explained simply, with every source linked.`,
    emergencyTitle: "Ate something toxic?",
    emergencyText: "Call your vet or a pet poison helpline right away. Note what was eaten and how much — don't wait for signs.",
  },
  food: {
    why: "Why",
    signs: "Signs to watch for",
    whatToDo: "What to do",
    serving: "How to give it",
    forKids: "For kids",
    faq: "Questions and answers",
    related: "Related foods",
    sources: "Sources",
    updated: "Updated",
    notVetReviewed: "General information from the sources below, not reviewed by a vet and not a substitute for veterinary advice. When in doubt, call your vet.",
    otherSpecies: "Other animals",
    simulates: "How kids practise this in PetPrep",
    simulatesText: (w) => `In PetPrep a child looks after a realistic ${w.pet}: meals at the right times, water, walks and care. Knowing what is safe to share is part of being ready for a real pet.`,
    backTo: "All foods",
  },
  breadcrumb: "Care",
};

const sl: CareCopy = {
  speciesWords: {
    dog: { question: "Kaj lahko jedo psi?", plural: "pse", pet: "kužka" },
    cat: { question: "Kaj lahko jedo mačke?", plural: "mačke", pet: "mucka" },
  },
  levels: {
    toxic: { label: "Strupeno – pokličite veterinarja", heading: "Strupeno: nikoli" },
    dangerous: { label: "Nevarno", heading: "Nevarno" },
    not_recommended: { label: "Ni priporočljivo", heading: "Raje ne" },
    small_amounts: { label: "V majhnih količinah v redu", heading: "V redu kot občasen priboljšek" },
  },
  hub: {
    foodsLead: (w) => `Varna, tvegana in strupena hrana za ${w.plural} – z razlogi, znaki in viri.`,
    count: (n) => `Živil: ${n}`,
    open: "Odpri seznam",
  },
  species: {
    metaTitle: (w) => `${w.question} Varna in strupena hrana z viri – PetPrep`,
    metaDescription: (w, n) => `Preverjenih živil: ${n}. Kaj je za ${w.plural} strupeno, kaj tvegano in kaj v redu kot priboljšek – razlog, znaki in kaj storiti, z vsemi viri.`,
    eyebrow: "Skrb · hrana",
    lead: (w) => `Katera hrana je za ${w.plural} strupena, tvegana ali v redu – razvrščeno po nevarnosti, preprosto razloženo, z vsemi viri.`,
    emergencyTitle: "Je ljubljenček pojedel kaj strupenega?",
    emergencyText: "Takoj pokličite veterinarja ali telefonsko linijo za zastrupitve živali. Zapišite, kaj in koliko je pojedel – ne čakajte na znake.",
  },
  food: {
    why: "Zakaj",
    signs: "Znaki, na katere bodite pozorni",
    whatToDo: "Kaj storiti",
    serving: "Kako ponuditi",
    forKids: "Za otroke",
    faq: "Vprašanja in odgovori",
    related: "Sorodna živila",
    sources: "Viri",
    updated: "Posodobljeno",
    notVetReviewed: "Splošne informacije iz spodnjih virov; veterinar jih ni pregledal in ne nadomeščajo veterinarskega nasveta. Če ste v dvomih, pokličite veterinarja.",
    otherSpecies: "Druge živali",
    simulates: "Kako to otroci vadijo v PetPrepu",
    simulatesText: (w) => `V PetPrepu otrok skrbi za realističnega ${w.pet}: obroki ob pravem času, voda, sprehodi in nega. Vedeti, katero hrano je varno deliti z njim, je del priprave na pravega ljubljenčka.`,
    backTo: "Vsa živila",
  },
  breadcrumb: "Skrb",
};

const de: CareCopy = {
  speciesWords: {
    // `pet` carries its article: the gender differs (einen Hund / eine Katze), accusative after "um".
    dog: { question: "Was dürfen Hunde fressen?", plural: "Hunde", pet: "einen Hund" },
    cat: { question: "Was dürfen Katzen fressen?", plural: "Katzen", pet: "eine Katze" },
  },
  levels: {
    toxic: { label: "Giftig – Tierarzt anrufen", heading: "Giftig: niemals geben" },
    dangerous: { label: "Gefährlich", heading: "Gefährlich" },
    not_recommended: { label: "Nicht empfohlen", heading: "Lieber nicht" },
    small_amounts: { label: "In kleinen Mengen in Ordnung", heading: "Als gelegentliches Leckerli in Ordnung" },
  },
  hub: {
    foodsLead: (w) => `Sichere, riskante und giftige Lebensmittel für ${w.plural} – jeweils mit Grund, Anzeichen und Quellen.`,
    count: (n) => `${n} Lebensmittel`,
    open: "Zur Liste",
  },
  species: {
    metaTitle: (w) => `${w.question} Sichere und giftige Lebensmittel mit Quellen – PetPrep`,
    metaDescription: (w, n) => `${n} Lebensmittel für ${w.plural} geprüft: was giftig ist, was riskant ist und was als Leckerli in Ordnung ist. Mit Begründung, Anzeichen und Hinweisen, was zu tun ist – jede Quelle verlinkt.`,
    eyebrow: "Ratgeber · Ernährung",
    lead: (w) => `Welche Lebensmittel für ${w.plural} giftig, riskant oder unbedenklich sind – nach Risiko sortiert, einfach erklärt, mit allen Quellen verlinkt.`,
    emergencyTitle: "Etwas Giftiges gefressen?",
    emergencyText: "Rufen Sie sofort Ihren Tierarzt oder einen Giftnotruf für Tiere an. Notieren Sie, was und wie viel gefressen wurde – warten Sie nicht auf Anzeichen.",
  },
  food: {
    why: "Warum",
    signs: "Auf diese Anzeichen sollten Sie achten",
    whatToDo: "Was tun?",
    serving: "Richtig füttern",
    forKids: "Für Kinder",
    faq: "Fragen und Antworten",
    related: "Ähnliche Lebensmittel",
    sources: "Quellen",
    updated: "Aktualisiert",
    notVetReviewed: "Allgemeine Informationen aus den unten genannten Quellen – nicht tierärztlich geprüft und kein Ersatz für tierärztlichen Rat. Rufen Sie im Zweifel Ihren Tierarzt an.",
    otherSpecies: "Andere Tiere",
    simulates: "So üben Kinder das in PetPrep",
    simulatesText: (w) => `In PetPrep kümmert sich ein Kind um ${w.pet} – realistisch simuliert: Mahlzeiten zur richtigen Zeit, Wasser, Spaziergänge und Pflege. Zu wissen, was man vom eigenen Essen gefahrlos abgeben darf, gehört dazu, wenn man bereit für ein echtes Haustier sein will.`,
    backTo: "Alle Lebensmittel",
  },
  breadcrumb: "Ratgeber",
};

const fr: CareCopy = {
  speciesWords: {
    // `plural` without article (« pour les chiens »); `pet` carries its article (« un chien »).
    dog: { question: "Que peuvent manger les chiens ?", plural: "chiens", pet: "un chien" },
    cat: { question: "Que peuvent manger les chats ?", plural: "chats", pet: "un chat" },
  },
  levels: {
    toxic: { label: "Toxique – appelez votre vétérinaire", heading: "Toxique : à ne jamais donner" },
    dangerous: { label: "Dangereux", heading: "Dangereux" },
    not_recommended: { label: "Déconseillé", heading: "Mieux vaut éviter" },
    small_amounts: { label: "Acceptable en petite quantité", heading: "Acceptable comme friandise occasionnelle" },
  },
  hub: {
    foodsLead: (w) => `Aliments sûrs, à risque et toxiques pour les ${w.plural} – avec, pour chacun, l’explication, les signes à surveiller et les sources.`,
    count: (n) => (n < 2 ? `${n} aliment` : `${n} aliments`),
    open: "Voir la liste",
  },
  species: {
    metaTitle: (w) => `${w.question} Aliments sûrs et toxiques, avec sources – PetPrep`,
    metaDescription: (w, n) => `${n < 2 ? `${n} aliment vérifié` : `${n} aliments vérifiés`} pour les ${w.plural} : ce qui est toxique, ce qui est risqué et ce qui convient comme friandise – l’explication, les signes et ce qu’il faut faire, avec un lien vers chaque source.`,
    eyebrow: "Conseils · alimentation",
    lead: (w) => `Quels aliments sont toxiques, risqués ou sans danger pour les ${w.plural} – classés par niveau de risque, expliqués simplement, avec un lien vers chaque source.`,
    emergencyTitle: "Votre animal a mangé quelque chose de toxique ?",
    emergencyText: "Appelez immédiatement votre vétérinaire ou un centre antipoison vétérinaire. Notez ce qui a été mangé et en quelle quantité – n’attendez pas l’apparition de signes.",
  },
  food: {
    why: "Pourquoi",
    signs: "Les signes à surveiller",
    whatToDo: "Que faire ?",
    serving: "Comment le donner",
    forKids: "Pour les enfants",
    faq: "Questions et réponses",
    related: "Aliments similaires",
    sources: "Sources",
    updated: "Mis à jour",
    notVetReviewed: "Informations générales tirées des sources ci-dessous : elles n’ont pas été vérifiées par un vétérinaire et ne remplacent pas un avis vétérinaire. En cas de doute, appelez votre vétérinaire.",
    otherSpecies: "Autres espèces",
    simulates: "Comment les enfants s’y entraînent dans PetPrep",
    simulatesText: (w) => `Dans PetPrep, un enfant s’occupe d’${w.pet} simulé de façon réaliste : repas aux bonnes heures, eau, promenades et soins. Savoir ce que l’on peut partager sans danger avec lui fait partie de la préparation à l’arrivée d’un vrai animal.`,
    backTo: "Tous les aliments",
  },
  breadcrumb: "Conseils",
};

const es: CareCopy = {
  speciesWords: {
    // `plural` without article («para los perros»); `pet` carries its article («un perro»).
    dog: { question: "¿Qué pueden comer los perros?", plural: "perros", pet: "un perro" },
    cat: { question: "¿Qué pueden comer los gatos?", plural: "gatos", pet: "un gato" },
  },
  levels: {
    toxic: { label: "Tóxico: llama a tu veterinario", heading: "Tóxico: no se lo des nunca" },
    dangerous: { label: "Peligroso", heading: "Peligroso" },
    not_recommended: { label: "No recomendado", heading: "Mejor evitarlo" },
    small_amounts: { label: "Aceptable en pequeñas cantidades", heading: "Aceptable como premio ocasional" },
  },
  hub: {
    foodsLead: (w) => `Alimentos seguros, arriesgados y tóxicos para los ${w.plural}, cada uno con el motivo, los síntomas que hay que vigilar y las fuentes.`,
    count: (n) => (n === 1 ? `${n} alimento` : `${n} alimentos`),
    open: "Ver la lista",
  },
  species: {
    metaTitle: (w) => `${w.question} Alimentos seguros y tóxicos, con fuentes — PetPrep`,
    metaDescription: (w, n) => `${n === 1 ? `${n} alimento revisado` : `${n} alimentos revisados`} para los ${w.plural}: qué es tóxico, qué es arriesgado y qué se puede dar como premio. El motivo, los síntomas y qué hacer, con enlace a cada fuente.`,
    eyebrow: "Consejos · alimentación",
    lead: (w) => `Qué alimentos son tóxicos, arriesgados o aceptables para los ${w.plural}: ordenados por nivel de riesgo, explicados de forma sencilla y con enlace a cada fuente.`,
    emergencyTitle: "¿Ha comido algo tóxico?",
    emergencyText: "Llama enseguida a tu veterinario o a una línea de información toxicológica para animales. Apunta qué ha comido y cuánto, y no esperes a que aparezcan signos.",
  },
  food: {
    why: "Por qué",
    signs: "Signos que hay que vigilar",
    whatToDo: "Qué hacer",
    serving: "Cómo dárselo",
    forKids: "Para niños",
    faq: "Preguntas y respuestas",
    related: "Alimentos relacionados",
    sources: "Fuentes",
    updated: "Actualizado",
    notVetReviewed: "Información general extraída de las fuentes indicadas abajo: no la ha revisado un veterinario y no sustituye el consejo veterinario. Si tienes dudas, llama a tu veterinario.",
    otherSpecies: "Otras especies",
    simulates: "Cómo lo practican los niños en PetPrep",
    simulatesText: (w) => `En PetPrep, un niño cuida de ${w.pet} simulado y muy realista: comidas a la hora adecuada, agua, paseos y cuidados. Saber qué se puede compartir con él sin riesgo forma parte de estar preparado para una mascota real.`,
    backTo: "Todos los alimentos",
  },
  breadcrumb: "Consejos",
};

const it: CareCopy = {
  speciesWords: {
    // `plural` without article («per i cani»); `pet` carries its article («un cane»).
    dog: { question: "Cosa possono mangiare i cani?", plural: "cani", pet: "un cane" },
    cat: { question: "Cosa possono mangiare i gatti?", plural: "gatti", pet: "un gatto" },
  },
  levels: {
    toxic: { label: "Tossico: chiama il veterinario", heading: "Tossico: non darlo mai" },
    dangerous: { label: "Pericoloso", heading: "Pericoloso" },
    not_recommended: { label: "Sconsigliato", heading: "Meglio evitare" },
    small_amounts: { label: "Va bene in piccole quantità", heading: "Va bene come premio occasionale" },
  },
  hub: {
    foodsLead: (w) => `Alimenti sicuri, rischiosi e tossici per i ${w.plural}, ognuno con il motivo, i sintomi da tenere d’occhio e le fonti.`,
    count: (n) => (n === 1 ? `${n} alimento` : `${n} alimenti`),
    open: "Apri l’elenco",
  },
  species: {
    metaTitle: (w) => `${w.question} Alimenti sicuri e tossici, con le fonti — PetPrep`,
    metaDescription: (w, n) => `${n === 1 ? `${n} alimento verificato` : `${n} alimenti verificati`} per i ${w.plural}: cosa è tossico, cosa è rischioso e cosa va bene come premio. Il motivo, i sintomi e cosa fare, con il link a ogni fonte.`,
    eyebrow: "Consigli · alimentazione",
    lead: (w) => `Quali alimenti sono tossici, rischiosi o adatti ai ${w.plural}: ordinati per livello di rischio, spiegati in modo semplice e con il link a ogni fonte.`,
    emergencyTitle: "Ha mangiato qualcosa di tossico?",
    emergencyText: "Chiama subito il veterinario o un centro antiveleni veterinario. Annota cosa ha mangiato e quanto, e non aspettare che compaiano i sintomi.",
  },
  food: {
    why: "Perché",
    signs: "Sintomi da tenere d’occhio",
    whatToDo: "Cosa fare",
    serving: "Come darlo",
    forKids: "Per i bambini",
    faq: "Domande e risposte",
    related: "Alimenti correlati",
    sources: "Fonti",
    updated: "Aggiornato",
    notVetReviewed: "Informazioni generali tratte dalle fonti indicate sotto: non sono state verificate da un veterinario e non sostituiscono il parere veterinario. Nel dubbio, chiama il veterinario.",
    otherSpecies: "Altri animali",
    simulates: "Come lo mettono in pratica i bambini in PetPrep",
    simulatesText: (w) => `In PetPrep un bambino si prende cura di ${w.pet} simulato in modo realistico: pasti all’ora giusta, acqua, passeggiate e cure. Sapere cosa si può condividere senza rischi fa parte dell’essere pronti per un animale vero.`,
    backTo: "Tutti gli alimenti",
  },
  breadcrumb: "Consigli",
};

const pt: CareCopy = {
  speciesWords: {
    // `plural` without article («para os cães»); `pet` carries its article («de um cão»).
    dog: { question: "O que podem comer os cães?", plural: "cães", pet: "um cão" },
    cat: { question: "O que podem comer os gatos?", plural: "gatos", pet: "um gato" },
  },
  levels: {
    toxic: { label: "Tóxico: liga ao teu veterinário", heading: "Tóxico: nunca dar" },
    dangerous: { label: "Perigoso", heading: "Perigoso" },
    not_recommended: { label: "Não recomendado", heading: "Melhor evitar" },
    small_amounts: { label: "Aceitável em pequenas quantidades", heading: "Aceitável como guloseima ocasional" },
  },
  hub: {
    foodsLead: (w) => `Alimentos seguros, arriscados e tóxicos para os ${w.plural}, cada um com o motivo, os sinais a que deves estar atento e as fontes.`,
    count: (n) => (n === 1 ? `${n} alimento` : `${n} alimentos`),
    open: "Abrir a lista",
  },
  species: {
    metaTitle: (w) => `${w.question} Alimentos seguros e tóxicos, com fontes – PetPrep`,
    metaDescription: (w, n) => `${n === 1 ? `${n} alimento verificado` : `${n} alimentos verificados`} para os ${w.plural}: o que é tóxico, o que é arriscado e o que se pode dar como guloseima. O motivo, os sinais e o que fazer, com ligação para cada fonte.`,
    eyebrow: "Conselhos · alimentação",
    lead: (w) => `Que alimentos são tóxicos, arriscados ou aceitáveis para os ${w.plural}: ordenados por nível de risco, explicados de forma simples e com ligação para cada fonte.`,
    emergencyTitle: "Comeu alguma coisa tóxica?",
    emergencyText: "Liga imediatamente ao teu veterinário ou a uma linha de apoio toxicológico para animais. Anota o que comeu e quanto – não esperes pelos sinais.",
  },
  food: {
    why: "Porquê",
    signs: "Sinais a que deves estar atento",
    whatToDo: "O que fazer",
    serving: "Como dar",
    forKids: "Para crianças",
    faq: "Perguntas e respostas",
    related: "Alimentos relacionados",
    sources: "Fontes",
    updated: "Atualizado",
    notVetReviewed: "Informação geral retirada das fontes indicadas abaixo: não foi revista por um veterinário e não substitui o aconselhamento veterinário. Em caso de dúvida, liga ao teu veterinário.",
    otherSpecies: "Outras espécies",
    simulates: "Como as crianças praticam isto no PetPrep",
    simulatesText: (w) => `No PetPrep, uma criança cuida de ${w.pet} simulado de forma realista: refeições à hora certa, água, passeios e cuidados. Saber o que se pode partilhar com ele sem riscos faz parte de estar preparado para um animal de estimação a sério.`,
    backTo: "Todos os alimentos",
  },
  breadcrumb: "Conselhos",
};

const nl: CareCopy = {
  speciesWords: {
    // `plural` without article ("voor honden"); `pet` carries its article ("een hond").
    dog: { question: "Wat mogen honden eten?", plural: "honden", pet: "een hond" },
    cat: { question: "Wat mogen katten eten?", plural: "katten", pet: "een kat" },
  },
  levels: {
    toxic: { label: "Giftig – bel je dierenarts", heading: "Giftig: nooit geven" },
    dangerous: { label: "Gevaarlijk", heading: "Gevaarlijk" },
    not_recommended: { label: "Niet aanbevolen", heading: "Liever niet" },
    small_amounts: { label: "Oké in kleine hoeveelheden", heading: "Af en toe een snoepje is oké" },
  },
  hub: {
    foodsLead: (w) => `Veilig, riskant en giftig eten voor ${w.plural} – telkens met de reden, de verschijnselen om op te letten en de bronnen.`,
    count: (n) => `${n} voedingsmiddel${n === 1 ? "" : "en"}`,
    open: "Bekijk de lijst",
  },
  species: {
    metaTitle: (w) => `${w.question} Veilig en giftig eten, met bronnen – PetPrep`,
    metaDescription: (w, n) => `${n} voedingsmiddel${n === 1 ? "" : "en"} gecontroleerd voor ${w.plural}: wat giftig is, wat riskant is en wat oké is als snoepje – de reden, de verschijnselen en wat je moet doen, met een link naar elke bron.`,
    eyebrow: "Verzorging · voeding",
    lead: (w) => `Welk eten giftig, riskant of oké is voor ${w.plural} – gesorteerd op risico, eenvoudig uitgelegd, met een link naar elke bron.`,
    emergencyTitle: "Iets giftigs gegeten?",
    emergencyText: "Bel meteen je dierenarts of een vergiftigingenlijn voor dieren. Schrijf op wat er is gegeten en hoeveel – wacht niet op verschijnselen.",
  },
  food: {
    why: "Waarom",
    signs: "Verschijnselen om op te letten",
    whatToDo: "Wat moet je doen?",
    serving: "Hoe geef je het?",
    forKids: "Voor kinderen",
    faq: "Vragen en antwoorden",
    related: "Vergelijkbaar eten",
    sources: "Bronnen",
    updated: "Bijgewerkt",
    notVetReviewed: "Algemene informatie uit de bronnen hieronder, niet gecontroleerd door een dierenarts en geen vervanging van veterinair advies. Twijfel je? Bel je dierenarts.",
    otherSpecies: "Andere diersoorten",
    simulates: "Zo oefenen kinderen dit in PetPrep",
    simulatesText: (w) => `In PetPrep zorgt een kind voor ${w.pet} die levensecht is nagebootst: maaltijden op het juiste moment, water, wandelingen en verzorging. Weten wat je veilig kunt delen, hoort erbij als je klaar wilt zijn voor een echt huisdier.`,
    backTo: "Alle voedingsmiddelen",
  },
  breadcrumb: "Verzorging",
};

/** Polish plural: 1 / 2–4 (not 12–14) / otherwise. Food counts are always whole numbers. */
function plForm(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const m10 = n % 10, m100 = n % 100;
  return m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}

const pl: CareCopy = {
  speciesWords: {
    // `plural` in the genitive ("dla psów"); `pet` in the instrumental ("opiekuje się realistycznym psem").
    dog: { question: "Co mogą jeść psy?", plural: "psów", pet: "psem" },
    cat: { question: "Co mogą jeść koty?", plural: "kotów", pet: "kotem" },
  },
  levels: {
    toxic: { label: "Toksyczne – zadzwoń do weterynarza", heading: "Toksyczne: nigdy nie podawaj" },
    dangerous: { label: "Niebezpieczne", heading: "Niebezpieczne" },
    not_recommended: { label: "Niezalecane", heading: "Lepiej nie" },
    small_amounts: { label: "W porządku w małych ilościach", heading: "W porządku jako okazjonalny smakołyk" },
  },
  hub: {
    foodsLead: (w) => `Bezpieczne, ryzykowne i toksyczne produkty dla ${w.plural} – przy każdym powód, objawy, na które trzeba uważać, i źródła.`,
    count: (n) => `${n} ${plForm(n, "produkt", "produkty", "produktów")}`,
    open: "Otwórz listę",
  },
  species: {
    metaTitle: (w) => `${w.question} Bezpieczne i toksyczne produkty ze źródłami – PetPrep`,
    metaDescription: (w, n) => `Sprawdziliśmy ${n} ${plForm(n, "produkt", "produkty", "produktów")} pod kątem bezpieczeństwa dla ${w.plural}: co jest toksyczne, co ryzykowne, a co w porządku jako smakołyk – powód, objawy i co robić, z linkiem do każdego źródła.`,
    eyebrow: "Opieka · żywienie",
    lead: (w) => `Które produkty są dla ${w.plural} toksyczne, które ryzykowne, a które w porządku – uporządkowane według ryzyka, prosto wyjaśnione, z linkiem do każdego źródła.`,
    emergencyTitle: "Zwierzę zjadło coś toksycznego?",
    emergencyText: "Natychmiast zadzwoń do weterynarza lub na telefon informacji toksykologicznej dla zwierząt. Zapisz, co zostało zjedzone i w jakiej ilości – nie czekaj na objawy.",
  },
  food: {
    why: "Dlaczego",
    signs: "Objawy, na które trzeba uważać",
    whatToDo: "Co robić",
    serving: "Jak podawać",
    forKids: "Dla dzieci",
    faq: "Pytania i odpowiedzi",
    related: "Podobne produkty",
    sources: "Źródła",
    updated: "Zaktualizowano",
    notVetReviewed: "Ogólne informacje z poniższych źródeł – niesprawdzone przez weterynarza i niezastępujące porady weterynaryjnej. W razie wątpliwości zadzwoń do weterynarza.",
    otherSpecies: "Inne zwierzęta",
    simulates: "Jak dzieci ćwiczą to w aplikacji PetPrep",
    simulatesText: (w) => `W aplikacji PetPrep dziecko opiekuje się realistycznym ${w.pet}: posiłki o właściwych porach, woda, spacery i pielęgnacja. Wiedza o tym, czym można się bezpiecznie podzielić, to część gotowości na prawdziwe zwierzę domowe.`,
    backTo: "Wszystkie produkty",
  },
  breadcrumb: "Opieka",
};

/** Czech plural: 1 / 2–4 / 0 and 5+. Food counts are always whole numbers. */
function csForm(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  return n >= 2 && n <= 4 ? few : many;
}

const cs: CareCopy = {
  speciesWords: {
    // `plural` in the accusative ("pro psy"); `pet` in the accusative ("stará se o psa").
    dog: { question: "Co mohou jíst psi?", plural: "psy", pet: "psa" },
    cat: { question: "Co mohou jíst kočky?", plural: "kočky", pet: "kočku" },
  },
  levels: {
    toxic: { label: "Jedovaté – zavolejte veterináři", heading: "Jedovaté: nikdy nedávejte" },
    dangerous: { label: "Nebezpečné", heading: "Nebezpečné" },
    not_recommended: { label: "Nedoporučuje se", heading: "Raději ne" },
    small_amounts: { label: "V malém množství v pořádku", heading: "V pořádku jako občasný pamlsek" },
  },
  hub: {
    foodsLead: (w) => `Bezpečné, rizikové a jedovaté potraviny pro ${w.plural} – u každé důvod, příznaky, kterých si všímat, a zdroje.`,
    count: (n) => `${n} ${csForm(n, "potravina", "potraviny", "potravin")}`,
    open: "Otevřít seznam",
  },
  species: {
    metaTitle: (w) => `${w.question} Bezpečné a jedovaté potraviny se zdroji – PetPrep`,
    metaDescription: (w, n) => `Prověřili jsme ${n} ${csForm(n, "potravinu", "potraviny", "potravin")} z hlediska bezpečnosti pro ${w.plural}: co je jedovaté, co rizikové a co je v pořádku jako pamlsek – důvod, příznaky a co dělat, s odkazem na každý zdroj.`,
    eyebrow: "Péče · krmení",
    lead: (w) => `Které potraviny jsou pro ${w.plural} jedovaté, které rizikové a které v pořádku – seřazené podle rizika, jednoduše vysvětlené, s odkazem na každý zdroj.`,
    emergencyTitle: "Snědlo zvíře něco jedovatého?",
    emergencyText: "Ihned zavolejte veterináři nebo na toxikologickou linku pro zvířata. Poznamenejte si, co a kolik zvíře snědlo – nečekejte na příznaky.",
  },
  food: {
    why: "Proč",
    signs: "Příznaky, kterých si všímat",
    whatToDo: "Co dělat",
    serving: "Jak podávat",
    forKids: "Pro děti",
    faq: "Otázky a odpovědi",
    related: "Související potraviny",
    sources: "Zdroje",
    updated: "Aktualizováno",
    notVetReviewed: "Obecné informace z níže uvedených zdrojů – nezkontroloval je veterinář a nenahrazují veterinární radu. Máte-li pochybnosti, zavolejte veterináři.",
    otherSpecies: "Další zvířata",
    simulates: "Jak si to děti procvičují v PetPrepu",
    simulatesText: (w) => `V PetPrepu se dítě stará o ${w.pet} v realistické simulaci: jídlo ve správný čas, voda, procházky a péče. Vědět, které jídlo můžete se zvířetem bezpečně sdílet, patří k připravenosti na vlastního mazlíčka.`,
    backTo: "Všechny potraviny",
  },
  breadcrumb: "Péče",
};

/** Croatian plural: 1, 21, 31… (not 11) / 2–4, 22–24… (not 12–14) / otherwise. Food counts are always whole numbers. */
function hrForm(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  return m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}

const hr: CareCopy = {
  speciesWords: {
    // `plural` in the accusative ("za pse"); `pet` in the locative ("brine se o psu").
    dog: { question: "Što smiju jesti psi?", plural: "pse", pet: "psu" },
    cat: { question: "Što smiju jesti mačke?", plural: "mačke", pet: "mački" },
  },
  levels: {
    toxic: { label: "Otrovno – nazovi veterinara", heading: "Otrovno: nikad ne davati" },
    dangerous: { label: "Opasno", heading: "Opasno" },
    not_recommended: { label: "Ne preporučuje se", heading: "Bolje ne" },
    small_amounts: { label: "U malim količinama u redu", heading: "U redu kao povremena poslastica" },
  },
  hub: {
    foodsLead: (w) => `Sigurne, rizične i otrovne namirnice za ${w.plural} – za svaku su navedeni razlog, znakovi na koje treba paziti i izvori.`,
    count: (n) => `${n} ${hrForm(n, "namirnica", "namirnice", "namirnica")}`,
    open: "Otvori popis",
  },
  species: {
    metaTitle: (w) => `${w.question} Sigurne i otrovne namirnice s izvorima – PetPrep`,
    metaDescription: (w, n) => `Provjerili smo ${n} ${hrForm(n, "namirnicu", "namirnice", "namirnica")} za ${w.plural}: što je otrovno, što rizično, a što u redu kao poslastica – razlog, znakovi i što učiniti, s poveznicom na svaki izvor.`,
    eyebrow: "Njega · hrana",
    lead: (w) => `Koje su namirnice za ${w.plural} otrovne, koje rizične, a koje u redu – razvrstane prema riziku, jednostavno objašnjene, s poveznicom na svaki izvor.`,
    emergencyTitle: "Je li ljubimac pojeo nešto otrovno?",
    emergencyText: "Odmah se obrati veterinaru ili telefonskoj liniji za otrovanja životinja. Zapiši što je ljubimac pojeo i koliko – ne čekaj da se pojave znakovi.",
  },
  food: {
    why: "Zašto",
    signs: "Znakovi na koje treba paziti",
    whatToDo: "Što učiniti",
    serving: "Kako ponuditi",
    forKids: "Za djecu",
    faq: "Pitanja i odgovori",
    related: "Srodne namirnice",
    sources: "Izvori",
    updated: "Ažurirano",
    notVetReviewed: "Opće informacije iz izvora navedenih u nastavku. Veterinar ih nije pregledao i ne zamjenjuju veterinarski savjet. U nedoumici nazovi veterinara.",
    otherSpecies: "Druge životinje",
    simulates: "Kako djeca to vježbaju u PetPrepu",
    simulatesText: (w) => `U PetPrepu se dijete u realističnoj simulaciji brine o ${w.pet}: obroci u pravo vrijeme, voda, šetnje i njega. Znati koju je hranu sigurno podijeliti s ljubimcem dio je pripreme za pravog kućnog ljubimca.`,
    backTo: "Sve namirnice",
  },
  breadcrumb: "Njega",
};

const sv: CareCopy = {
  speciesWords: {
    // `plural` without article ("för hundar"); `pet` without article ("en realistisk hund" — both common gender).
    dog: { question: "Vad får hundar äta?", plural: "hundar", pet: "hund" },
    cat: { question: "Vad får katter äta?", plural: "katter", pet: "katt" },
  },
  levels: {
    toxic: { label: "Giftigt – ring din veterinär", heading: "Giftigt: ge aldrig" },
    dangerous: { label: "Farligt", heading: "Farligt" },
    not_recommended: { label: "Rekommenderas inte", heading: "Helst inte" },
    small_amounts: { label: "Okej i små mängder", heading: "Okej som godbit ibland" },
  },
  hub: {
    foodsLead: (w) => `Säkra, riskabla och giftiga livsmedel för ${w.plural} – vart och ett med orsaken, symtomen att hålla utkik efter och källorna.`,
    count: (n) => `${n} livsmedel`,
    open: "Öppna listan",
  },
  species: {
    metaTitle: (w) => `${w.question} Säkra och giftiga livsmedel, med källor – PetPrep`,
    metaDescription: (w, n) => `${n} livsmedel granskade för ${w.plural}: vad som är giftigt, vad som är riskabelt och vad som är okej som godbit – orsaken, symtomen och vad du ska göra, med länk till varje källa.`,
    eyebrow: "Skötsel · mat",
    lead: (w) => `Vilka livsmedel som är giftiga, riskabla eller okej för ${w.plural} – sorterade efter risk, enkelt förklarade, med länk till varje källa.`,
    emergencyTitle: "Har djuret ätit något giftigt?",
    emergencyText: "Ring din veterinär eller en giftrådgivning för djur direkt. Skriv upp vad djuret har ätit och hur mycket – vänta inte på symtom.",
  },
  food: {
    why: "Varför",
    signs: "Symtom att hålla utkik efter",
    whatToDo: "Vad du ska göra",
    serving: "Så ger du det",
    forKids: "För barn",
    faq: "Frågor och svar",
    related: "Liknande livsmedel",
    sources: "Källor",
    updated: "Uppdaterad",
    notVetReviewed: "Allmän information från källorna nedan, inte granskad av en veterinär och ingen ersättning för veterinärens råd. Ring din veterinär om du är osäker.",
    otherSpecies: "Andra djur",
    simulates: "Så övar barn på det här i PetPrep",
    simulatesText: (w) => `I PetPrep tar ett barn hand om en realistisk ${w.pet}: måltider vid rätt tid, vatten, promenader och skötsel. Att veta vad som är säkert att dela med sig av är en del av att vara redo för ett riktigt husdjur.`,
    backTo: "Alla livsmedel",
  },
  breadcrumb: "Skötsel",
};

const da: CareCopy = {
  speciesWords: {
    // `plural` without article ("for hunde"); `pet` without article ("en realistisk hund" — both common gender).
    dog: { question: "Hvad må hunde spise?", plural: "hunde", pet: "hund" },
    cat: { question: "Hvad må katte spise?", plural: "katte", pet: "kat" },
  },
  levels: {
    toxic: { label: "Giftigt – ring til din dyrlæge", heading: "Giftigt: giv det aldrig" },
    dangerous: { label: "Farligt", heading: "Farligt" },
    not_recommended: { label: "Frarådes", heading: "Helst ikke" },
    small_amounts: { label: "Okay i små mængder", heading: "Okay som godbid en gang imellem" },
  },
  hub: {
    foodsLead: (w) => `Sikre, risikable og giftige fødevarer for ${w.plural} – hver med begrundelsen, symptomerne, du skal holde øje med, og kilderne.`,
    count: (n) => (n === 1 ? "1 fødevare" : `${n} fødevarer`),
    open: "Åbn listen",
  },
  species: {
    metaTitle: (w) => `${w.question} Sikre og giftige fødevarer med kilder – PetPrep`,
    metaDescription: (w, n) => `${n === 1 ? "1 fødevare" : `${n} fødevarer`} gennemgået for ${w.plural}: hvad der er giftigt, hvad der er risikabelt og hvad der er okay som godbid – begrundelsen, symptomerne og hvad du skal gøre, med link til hver kilde.`,
    eyebrow: "Pleje · mad",
    lead: (w) => `Hvilke fødevarer der er giftige, risikable eller okay for ${w.plural} – sorteret efter risiko, enkelt forklaret og med link til hver kilde.`,
    emergencyTitle: "Har dyret spist noget giftigt?",
    emergencyText: "Ring straks til din dyrlæge eller en giftrådgivning for dyr. Skriv ned hvad dyret har spist og hvor meget – vent ikke på symptomer.",
  },
  food: {
    why: "Hvorfor",
    signs: "Symptomer, du skal holde øje med",
    whatToDo: "Hvad du skal gøre",
    serving: "Sådan giver du det",
    forKids: "For børn",
    faq: "Spørgsmål og svar",
    related: "Lignende fødevarer",
    sources: "Kilder",
    updated: "Opdateret",
    notVetReviewed: "Generel information fra kilderne nedenfor – ikke gennemgået af en dyrlæge og ingen erstatning for en dyrlæges råd. Er du i tvivl, så ring til din dyrlæge.",
    otherSpecies: "Andre dyr",
    simulates: "Sådan øver børn det i PetPrep",
    simulatesText: (w) => `I PetPrep passer et barn en realistisk ${w.pet}: måltider til de rigtige tider, vand, gåture og pleje. At vide hvad det er sikkert at dele med dyret, er en del af at være klar til et rigtigt kæledyr.`,
    backTo: "Alle fødevarer",
  },
  breadcrumb: "Pleje",
};

/** Finnish: 1 + nominative singular, otherwise numeral + partitive singular ("1 ruoka-aine", "12 ruoka-ainetta"). */
const fiFoods = (n: number) => (n === 1 ? "1 ruoka-aine" : `${n} ruoka-ainetta`);

const fi: CareCopy = {
  speciesWords: {
    // `plural` in the allative ("koirille": for dogs); `pet` in the partitive ("hoitaa realistista koiraa").
    dog: { question: "Mitä koira saa syödä?", plural: "koirille", pet: "koiraa" },
    cat: { question: "Mitä kissa saa syödä?", plural: "kissoille", pet: "kissaa" },
  },
  levels: {
    toxic: { label: "Myrkyllinen – soita eläinlääkärille", heading: "Myrkyllinen: älä anna koskaan" },
    dangerous: { label: "Vaarallinen", heading: "Vaarallinen" },
    not_recommended: { label: "Ei suositella", heading: "Mieluummin ei" },
    small_amounts: { label: "Sopii pieninä määrinä", heading: "Sopii satunnaiseksi herkuksi" },
  },
  hub: {
    foodsLead: (w) => `Turvalliset, riskialttiit ja myrkylliset ruoat ${w.plural} – jokaisen kohdalla syy, seurattavat oireet ja lähteet.`,
    count: (n) => fiFoods(n),
    open: "Avaa luettelo",
  },
  species: {
    metaTitle: (w) => `${w.question} Turvalliset ja myrkylliset ruoat lähteineen – PetPrep`,
    metaDescription: (w, n) => `${fiFoods(n)} käyty läpi: mikä on ${w.plural} myrkyllistä, mikä riskialtista ja mikä sopii herkuksi – syy, oireet ja mitä tehdä, jokainen lähde linkitettynä.`,
    eyebrow: "Hoito · ruoka",
    lead: (w) => `Mitkä ruoat ovat ${w.plural} myrkyllisiä, riskialttiita tai sopivia – riskin mukaan järjestettyinä ja selkeästi selitettyinä, jokainen lähde linkitettynä.`,
    emergencyTitle: "Söikö lemmikkisi jotain myrkyllistä?",
    emergencyText: "Soita heti eläinlääkärille tai eläinten myrkytysneuvontaan. Kirjaa ylös, mitä lemmikki söi ja kuinka paljon – älä odota oireita.",
  },
  food: {
    why: "Miksi",
    signs: "Seurattavat oireet",
    whatToDo: "Mitä tehdä",
    serving: "Näin annat sitä",
    forKids: "Lapsille",
    faq: "Kysymyksiä ja vastauksia",
    related: "Samankaltaiset ruoat",
    sources: "Lähteet",
    updated: "Päivitetty",
    notVetReviewed: "Yleistä tietoa alla olevista lähteistä. Eläinlääkäri ei ole tarkistanut tietoja, eivätkä ne korvaa eläinlääkärin neuvoja. Jos olet epävarma, soita eläinlääkärille.",
    otherSpecies: "Muut eläimet",
    simulates: "Näin lapset harjoittelevat tätä PetPrepissä",
    simulatesText: (w) => `PetPrepissä lapsi hoitaa realistista ${w.pet}: ateriat oikeaan aikaan, vesi, lenkit ja huolenpito. Tieto siitä, mitä lemmikin kanssa voi turvallisesti jakaa, on osa valmiutta oikeaan lemmikkiin.`,
    backTo: "Kaikki ruoat",
  },
  breadcrumb: "Hoito",
};

/** Norwegian Bokmål: 1 matvare / N matvarer. */
const nbFoods = (n: number) => (n === 1 ? "1 matvare" : `${n} matvarer`);

const nb: CareCopy = {
  speciesWords: {
    // `plural` without article ("for hunder"); `pet` without article ("en realistisk hund" — both masculine).
    dog: { question: "Hva kan hunder spise?", plural: "hunder", pet: "hund" },
    cat: { question: "Hva kan katter spise?", plural: "katter", pet: "katt" },
  },
  levels: {
    toxic: { label: "Giftig – ring dyrlegen", heading: "Giftig: gi det aldri" },
    dangerous: { label: "Farlig", heading: "Farlig" },
    not_recommended: { label: "Frarådes", heading: "Helst ikke" },
    small_amounts: { label: "Greit i små mengder", heading: "Greit som en godbit av og til" },
  },
  hub: {
    foodsLead: (w) => `Trygge, risikable og giftige matvarer for ${w.plural} – hver med begrunnelsen, symptomene du bør se etter og kildene.`,
    count: (n) => nbFoods(n),
    open: "Åpne listen",
  },
  species: {
    metaTitle: (w) => `${w.question} Trygge og giftige matvarer med kilder – PetPrep`,
    metaDescription: (w, n) => `${nbFoods(n)} gjennomgått for ${w.plural}: hva som er giftig, hva som er risikabelt, og hva som er greit som godbit – begrunnelsen, symptomene og hva du bør gjøre, med lenke til hver kilde.`,
    eyebrow: "Stell · mat",
    lead: (w) => `Hvilke matvarer som er giftige, risikable eller greie for ${w.plural} – sortert etter risiko, enkelt forklart og med lenke til hver kilde.`,
    emergencyTitle: "Har dyret spist noe giftig?",
    emergencyText: "Kontakt dyrlegen eller giftinformasjon for dyr med en gang. Skriv ned hva dyret har spist og hvor mye – ikke vent på symptomer.",
  },
  food: {
    why: "Hvorfor",
    signs: "Symptomer du bør se etter",
    whatToDo: "Hva du bør gjøre",
    serving: "Slik gir du det",
    forKids: "For barn",
    faq: "Spørsmål og svar",
    related: "Lignende matvarer",
    sources: "Kilder",
    updated: "Oppdatert",
    notVetReviewed: "Generell informasjon fra kildene nedenfor – ikke gjennomgått av en dyrlege og ingen erstatning for råd fra dyrlegen. Er du i tvil, ring dyrlegen.",
    otherSpecies: "Andre dyr",
    simulates: "Slik øver barn på dette i PetPrep",
    simulatesText: (w) => `I PetPrep passer et barn på en realistisk ${w.pet}: måltider til riktig tid, vann, turer og stell. Å vite hva som er trygt å dele med dyret, er en del av å være klar for et ekte kjæledyr.`,
    backTo: "Alle matvarer",
  },
  breadcrumb: "Stell",
};

const copies: Record<Locale, CareCopy> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };
export const getCareCopy = (l: Locale) => copies[l];

export function speciesWords(l: Locale, speciesId: string): SpeciesWords {
  const w = copies[l].speciesWords[speciesId];
  if (!w) throw new Error(`care copy: no speciesWords.${speciesId} for "${l}" — add them in src/content/care/copy.ts`);
  return w;
}
