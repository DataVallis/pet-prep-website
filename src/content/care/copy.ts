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

const copies: Record<Locale, CareCopy> = { en, sl };
export const getCareCopy = (l: Locale) => copies[l];

export function speciesWords(l: Locale, speciesId: string): SpeciesWords {
  const w = copies[l].speciesWords[speciesId];
  if (!w) throw new Error(`care copy: no speciesWords.${speciesId} for "${l}" — add them in src/content/care/copy.ts`);
  return w;
}
