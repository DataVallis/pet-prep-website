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
    toxic: { label: "Strupeno — pokličite veterinarja", heading: "Strupeno: nikoli" },
    dangerous: { label: "Nevarno", heading: "Nevarno" },
    not_recommended: { label: "Ni priporočljivo", heading: "Raje ne" },
    small_amounts: { label: "V majhnih količinah v redu", heading: "V redu kot občasna poslastica" },
  },
  hub: {
    foodsLead: (w) => `Varna, tvegana in strupena hrana za ${w.plural} — z razlogom, znaki in viri.`,
    count: (n) => `Živil: ${n}`,
    open: "Odpri seznam",
  },
  species: {
    metaTitle: (w) => `${w.question} Varna in strupena hrana z viri — PetPrep`,
    metaDescription: (w, n) => `Preverjenih živil: ${n}. Kaj je za ${w.plural} strupeno, kaj tvegano in kaj v redu kot poslastica — razlog, znaki in kaj storiti, z vsemi viri.`,
    eyebrow: "Skrb · hrana",
    lead: (w) => `Katera hrana je za ${w.plural} strupena, tvegana ali v redu — razvrščeno po nevarnosti, preprosto razloženo, z vsemi viri.`,
    emergencyTitle: "Je pojedel kaj strupenega?",
    emergencyText: "Takoj pokličite veterinarja. Zapišite, kaj in koliko je pojedel — ne čakajte na znake.",
  },
  food: {
    why: "Zakaj",
    signs: "Znaki, na katere bodite pozorni",
    whatToDo: "Kaj storiti",
    serving: "Kako ga ponuditi",
    forKids: "Za otroke",
    faq: "Vprašanja in odgovori",
    related: "Sorodna živila",
    sources: "Viri",
    updated: "Posodobljeno",
    notVetReviewed: "Splošne informacije iz spodnjih virov, ki jih ni pregledal veterinar in ne nadomeščajo veterinarskega nasveta. Ko ste v dvomih, pokličite veterinarja.",
    otherSpecies: "Druge živali",
    simulates: "Kako to otroci vadijo v PetPrepu",
    simulatesText: (w) => `V PetPrepu otrok skrbi za realističnega ${w.pet}: obroki ob pravem času, voda, sprehodi in nega. Vedeti, kaj je varno deliti, je del pripravljenosti na pravo žival.`,
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
    emergencyTitle: "Il a mangé quelque chose de toxique ?",
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
    otherSpecies: "Autres animaux",
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
    foodsLead: (w) => `Alimentos seguros, arriesgados y tóxicos para los ${w.plural}, cada uno con el motivo, los signos que hay que vigilar y las fuentes.`,
    count: (n) => (n === 1 ? `${n} alimento` : `${n} alimentos`),
    open: "Ver la lista",
  },
  species: {
    metaTitle: (w) => `${w.question} Alimentos seguros y tóxicos, con fuentes — PetPrep`,
    metaDescription: (w, n) => `${n === 1 ? `${n} alimento revisado` : `${n} alimentos revisados`} para los ${w.plural}: qué es tóxico, qué es arriesgado y qué se puede dar como premio. El motivo, los signos y qué hacer, con enlace a cada fuente.`,
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
    otherSpecies: "Otros animales",
    simulates: "Cómo lo practican los niños en PetPrep",
    simulatesText: (w) => `En PetPrep, un niño cuida de ${w.pet} simulado de forma realista: comidas a la hora adecuada, agua, paseos y cuidados. Saber qué se puede compartir con él sin riesgo forma parte de estar preparado para una mascota real.`,
    backTo: "Todos los alimentos",
  },
  breadcrumb: "Consejos",
};

const copies: Record<Locale, CareCopy> = { en, sl, de, fr, es };
export const getCareCopy = (l: Locale) => copies[l];

export function speciesWords(l: Locale, speciesId: string): SpeciesWords {
  const w = copies[l].speciesWords[speciesId];
  if (!w) throw new Error(`care copy: no speciesWords.${speciesId} for "${l}" — add them in src/content/care/copy.ts`);
  return w;
}
