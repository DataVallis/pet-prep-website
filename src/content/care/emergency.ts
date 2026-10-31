import type { Locale } from "@/i18n/config";
import type { VetCopy } from "@/components/care/VetDirectory";

/**
 * "Pet ate something toxic?" page (M6-K1, David 2026-10-31). Every step and every number was
 * read on the linked page on 2026-10-31 (research: pet-prep docs/research/care/emergency.draft.json);
 * steps keep only what the quoted sources say. Numbers are listed only when an official page shows
 * them. Re-check the numbers when this file changes.
 */
export const emergencyUpdated = "2026-10-31";

type T = Record<Locale, string>;
export type Source = { publisher: string; url: string };
export type Step = { text: T; sources: Source[] };
export type Contact = {
  country: string; // ISO-2
  org: string;
  kind: "poison_line" | "emergency_vet";
  phone: string | null;
  hours: T;
  fee: T | null;
  note: T | null;
  url: string;
};

const RSPCA = { publisher: "RSPCA", url: "https://rspca.org.uk/adviceandwelfare/pets/dogs/health/poisoning" };
const PPH = { publisher: "Pet Poison Helpline", url: "https://www.petpoisonhelpline.com/" };
const ASPCA = { publisher: "ASPCA Animal Poison Control", url: "https://www.aspca.org/node/61910" };
const PDSA = { publisher: "PDSA", url: "https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/other-veterinary-advice/first-aid-for-poisons-and-toxins" };
const ICC = { publisher: "International Cat Care", url: "https://icatcare.org/articles/cats-and-poisons" };

export const steps: Step[] = [
  { text: { en: "Stay calm and act straight away.", sl: "Ostanite mirni in ukrepajte takoj." }, sources: [RSPCA, ASPCA] },
  { text: { en: "Move your pet away from the substance.", sl: "Žival odmaknite od snovi." }, sources: [RSPCA, PPH] },
  { text: { en: "Check that your pet is breathing and acting normally.", sl: "Preverite, ali žival diha in se vede običajno." }, sources: [PPH] },
  { text: { en: "Call your vet or an animal poison line right away. Tell them what happened, when and where.", sl: "Takoj pokličite veterinarja ali linijo za zastrupitve živali. Povejte, kaj se je zgodilo, kdaj in kje." }, sources: [RSPCA, PDSA, ICC] },
  { text: { en: "Do not wait for signs of illness — call even if your pet seems fine.", sl: "Ne čakajte na znake bolezni — pokličite, tudi če je žival videti v redu." }, sources: [PDSA, ASPCA] },
  { text: { en: "Do not make your pet vomit unless a vet tells you to. It can do more harm than good.", sl: "Živali ne silite k bruhanju, razen če vam tako naroči veterinar. Lahko naredi več škode kot koristi." }, sources: [PPH, RSPCA, PDSA] },
  { text: { en: "Do not give home remedies such as salt water, and don't act on random tips from the internet.", sl: "Ne dajajte domačih pripravkov, kot je slana voda, in ne ravnajte po naključnih nasvetih s spleta." }, sources: [PPH, RSPCA, ASPCA] },
  { text: { en: "Note what your pet ate, roughly how much and when.", sl: "Zapišite si, kaj je žival pojedla, približno koliko in kdaj." }, sources: [RSPCA, ASPCA] },
  { text: { en: "If you can do it safely, take the packaging, label, plant or substance with you to the vet.", sl: "Če lahko to storite varno, k veterinarju odnesite embalažo, etiketo, rastlino ali snov." }, sources: [RSPCA, ICC] },
];

export const contacts: Contact[] = [
  {
    country: "SI", org: "Univerza v Ljubljani, Veterinarska fakulteta — Klinika za male živali", kind: "emergency_vet",
    phone: "+386 30 716 190",
    hours: { en: "Emergency number reachable 24 hours a day (dogs and cats)", sl: "Številka za nujne primere je dosegljiva 24 ur na dan (psi in mačke)" },
    fee: { en: "The call is free", sl: "Klic je brezplačen" }, note: null,
    url: "https://www.vf.uni-lj.si/klinike/klinika-za-male-zivali",
  },
  {
    country: "HR", org: "Sveučilište u Zagrebu, Veterinarski fakultet — Sveučilišna veterinarska bolnica", kind: "emergency_vet",
    phone: null,
    hours: { en: "Emergency intake 24 hours a day — come in without calling", sl: "Sprejem nujnih primerov 24 ur na dan — pridite brez klica" },
    fee: null, note: { en: "The emergency desk does not answer phone calls.", sl: "Nujni sprejem ne odgovarja na telefonske klice." },
    url: "https://www.vef.unizg.hr/usluge/sveucilisna-veterinarska-bolnica/",
  },
  {
    country: "GB", org: "Animal PoisonLine (Veterinary Poisons Information Service)", kind: "poison_line",
    phone: "01202 509 000",
    hours: { en: "24 hours a day", sl: "24 ur na dan" },
    fee: { en: "£35 per call 8am–8pm Mon–Fri, £45 at other times", sl: "35 £ na klic pon–pet 8–20, sicer 45 £" }, note: null,
    url: "https://www.animalpoisonline.co.uk/",
  },
  {
    country: "US", org: "ASPCA Animal Poison Control Center", kind: "poison_line",
    phone: "(888) 426-4435",
    hours: { en: "24 hours a day, 365 days a year", sl: "24 ur na dan, vse dni v letu" },
    fee: { en: "A consultation fee may apply", sl: "Posvet je lahko plačljiv" }, note: null,
    url: "https://www.aspca.org/pet-care/animal-poison-control",
  },
  {
    country: "US", org: "Pet Poison Helpline", kind: "poison_line",
    phone: "(855) 764-7661",
    hours: { en: "24/7", sl: "24/7" },
    fee: { en: "$99 per incident", sl: "99 $ na primer" }, note: null,
    url: "https://www.petpoisonhelpline.com/",
  },
  {
    country: "AU", org: "Animal Poisons Helpline", kind: "poison_line",
    phone: "1300 869 738",
    hours: { en: "24/7", sl: "24/7" },
    fee: { en: "From AUD 79 (private service)", sl: "Od 79 AUD (zasebna služba)" },
    note: { en: "New Zealand: 0800 869 738", sl: "Nova Zelandija: 0800 869 738" },
    url: "https://www.animalpoisons.com.au/",
  },
];

export const emergencySlug: Record<Locale, string> = { en: "emergency", sl: "nujni-primeri" };

export const emergencyCopy: Record<Locale, {
  crumb: string; title: string; metaTitle: string; description: string; eyebrow: string; lead: string; stepsTitle: string;
  contactsTitle: string; contactsIntro: string; poisonLine: string; emergencyVet: string; noPhone: string;
  elsewhere: string; sources: string; open: string; countries: Record<string, string>;
  vetsTitle: string; vetsIntro: string;
  vets: Omit<VetCopy, "countries">;
}> = {
  en: {
    crumb: "Emergency",
    title: "Pet ate something toxic? What to do now",
    metaTitle: "Pet ate something toxic? What to do now — PetPrep",
    description: "What to do right away if your dog or cat ate something toxic, and 24-hour animal poison lines and emergency vets by country — every step and number from official sources.",
    eyebrow: "Care · emergency",
    lead: "Call your vet or an animal poison line right away — don't wait for signs. These steps come from veterinary and welfare organisations; the numbers are from their official pages.",
    stepsTitle: "What to do, step by step",
    contactsTitle: "24-hour help by country",
    contactsIntro: "Only numbers we found on an official page. Your own vet is always a good first call.",
    poisonLine: "Animal poison line",
    emergencyVet: "Emergency vet",
    noPhone: "No phone line",
    elsewhere: "Your country isn't listed? Call your own vet or the nearest emergency vet clinic.",
    sources: "Sources",
    open: "Official page",
    countries: { SI: "Slovenia", HR: "Croatia", GB: "United Kingdom", US: "United States", AU: "Australia" },
    vetsTitle: "Vets and emergency clinics by country",
    vetsIntro: "On holiday or at home: pick the country, filter by region or town, or show only clinics open 24 hours. Every entry links the page we took it from — call ahead, hours can change.",
    vets: {
      country: "Country", all: "All countries", region: "Region", allRegions: "All regions", search: "Town or name",
      searchPlaceholder: "e.g. Split, Málaga, Maribor", only24h: "Only 24 h", results: (n) => `${n} results`,
      none: "Nothing found — try another town or region.", h24: "24 h", dutyRota: "Duty rota", poisonLine: "Poison line",
      website: "Website", source: "Source", checked: "checked",
    },
  },
  sl: {
    crumb: "Nujni primeri",
    title: "Je žival pojedla kaj strupenega? Kaj storiti zdaj",
    metaTitle: "Je žival pojedla kaj strupenega? Kaj storiti — PetPrep",
    description: "Kaj storiti takoj, če je pes ali mačka pojedla kaj strupenega, in nujna pomoč 24 ur na dan po državah — vsak korak in vsaka številka iz uradnih virov.",
    eyebrow: "Skrb · nujni primeri",
    lead: "Takoj pokličite veterinarja — ne čakajte na znake. Koraki so povzeti po veterinarskih in zaščitniških organizacijah, številke so z njihovih uradnih strani.",
    stepsTitle: "Kaj storiti, korak za korakom",
    contactsTitle: "Pomoč 24 ur na dan po državah",
    contactsIntro: "Samo številke, ki smo jih našli na uradni strani. Vaš veterinar je vedno dober prvi klic.",
    poisonLine: "Linija za zastrupitve živali",
    emergencyVet: "Nujna veterinarska pomoč",
    noPhone: "Brez telefona",
    elsewhere: "Vaše države ni na seznamu? Pokličite svojega veterinarja ali najbližjo veterinarsko kliniko z nujno pomočjo.",
    sources: "Viri",
    open: "Uradna stran",
    countries: { SI: "Slovenija", HR: "Hrvaška", GB: "Združeno kraljestvo", US: "ZDA", AU: "Avstralija" },
    vetsTitle: "Veterinarji in nujna pomoč po državah",
    vetsIntro: "Doma ali na dopustu: izberite državo, filtrirajte po regiji ali kraju ali pokažite samo klinike, odprte 24 ur. Vsak vnos ima povezavo do strani, s katere smo ga vzeli — pred obiskom pokličite, ure se lahko spremenijo.",
    vets: {
      country: "Država", all: "Vse države", region: "Regija", allRegions: "Vse regije", search: "Kraj ali ime",
      searchPlaceholder: "npr. Split, Málaga, Maribor", only24h: "Samo 24 ur", results: (n) => `Zadetkov: ${n}`,
      none: "Ni zadetkov — poskusite drug kraj ali regijo.", h24: "24 ur", dutyRota: "Dežurstva", poisonLine: "Linija za zastrupitve",
      website: "Spletna stran", source: "Vir", checked: "preverjeno",
    },
  },
};
