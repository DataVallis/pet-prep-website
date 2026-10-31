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
  { text: { en: "Stay calm and act straight away.", sl: "Ostanite mirni in ukrepajte takoj.", de: "Bleiben Sie ruhig und handeln Sie sofort.", fr: "Restez calme et agissez immédiatement.", es: "Mantén la calma y actúa de inmediato.", it: "Mantieni la calma e agisci subito." }, sources: [RSPCA, ASPCA] },
  { text: { en: "Move your pet away from the substance.", sl: "Žival odmaknite od snovi.", de: "Bringen Sie Ihr Tier von der Substanz weg.", fr: "Éloignez votre animal de la substance.", es: "Aleja a tu mascota de la sustancia.", it: "Allontana l’animale dalla sostanza." }, sources: [RSPCA, PPH] },
  { text: { en: "Check that your pet is breathing and acting normally.", sl: "Preverite, ali žival diha in se vede običajno.", de: "Prüfen Sie, ob Ihr Tier atmet und sich normal verhält.", fr: "Vérifiez que votre animal respire et se comporte normalement.", es: "Comprueba que tu mascota respira y se comporta con normalidad.", it: "Controlla che l’animale respiri e si comporti normalmente." }, sources: [PPH] },
  { text: { en: "Call your vet or an animal poison line right away. Tell them what happened, when and where.", sl: "Takoj pokličite veterinarja ali linijo za zastrupitve živali. Povejte, kaj se je zgodilo, kdaj in kje.", de: "Rufen Sie sofort Ihren Tierarzt oder einen Giftnotruf für Tiere an. Schildern Sie, was wann und wo passiert ist.", fr: "Appelez immédiatement votre vétérinaire ou un centre antipoison vétérinaire. Expliquez ce qui s’est passé, quand et où.", es: "Llama enseguida a tu veterinario o a una línea de información toxicológica para animales. Explica qué ha pasado, cuándo y dónde.", it: "Chiama subito il veterinario o un centro antiveleni veterinario. Spiega cosa è successo, quando e dove." }, sources: [RSPCA, PDSA, ICC] },
  { text: { en: "Do not wait for signs of illness — call even if your pet seems fine.", sl: "Ne čakajte na znake bolezni — pokličite, tudi če je žival videti v redu.", de: "Warten Sie nicht auf Krankheitsanzeichen – rufen Sie auch an, wenn Ihr Tier gesund wirkt.", fr: "N’attendez pas l’apparition de signes de maladie – appelez même si votre animal semble bien aller.", es: "No esperes a que aparezcan signos de enfermedad: llama aunque tu mascota parezca estar bien.", it: "Non aspettare che compaiano sintomi di malattia: chiama anche se l’animale sembra stare bene." }, sources: [PDSA, ASPCA] },
  { text: { en: "Do not make your pet vomit unless a vet tells you to. It can do more harm than good.", sl: "Živali ne silite k bruhanju, razen če vam tako naroči veterinar. Lahko naredi več škode kot koristi.", de: "Bringen Sie Ihr Tier nicht zum Erbrechen, es sei denn, ein Tierarzt fordert Sie dazu auf. Das kann mehr schaden als nützen.", fr: "Ne faites pas vomir votre animal, sauf si un vétérinaire vous le demande. Cela peut faire plus de mal que de bien.", es: "No provoques el vómito a tu mascota salvo que te lo indique un veterinario. Puede hacer más mal que bien.", it: "Non far vomitare l’animale, a meno che non te lo dica un veterinario. Può fare più male che bene." }, sources: [PPH, RSPCA, PDSA] },
  { text: { en: "Do not give home remedies such as salt water, and don't act on random tips from the internet.", sl: "Ne dajajte domačih pripravkov, kot je slana voda, in ne ravnajte po naključnih nasvetih s spleta.", de: "Geben Sie keine Hausmittel wie Salzwasser und verlassen Sie sich nicht auf irgendwelche Tipps aus dem Internet.", fr: "Ne donnez pas de remède maison comme de l’eau salée, et ne suivez pas de conseils trouvés au hasard sur Internet.", es: "No le des remedios caseros como agua con sal ni sigas cualquier consejo que encuentres en internet.", it: "Non dare rimedi casalinghi come l’acqua salata e non seguire consigli trovati a caso su internet." }, sources: [PPH, RSPCA, ASPCA] },
  { text: { en: "Note what your pet ate, roughly how much and when.", sl: "Zapišite si, kaj je žival pojedla, približno koliko in kdaj.", de: "Notieren Sie, was Ihr Tier gefressen hat, ungefähr wie viel und wann.", fr: "Notez ce que votre animal a mangé, en quelle quantité approximative et à quel moment.", es: "Apunta qué ha comido tu mascota, más o menos cuánto y cuándo.", it: "Annota cosa ha mangiato l’animale, più o meno quanto e quando." }, sources: [RSPCA, ASPCA] },
  { text: { en: "If you can do it safely, take the packaging, label, plant or substance with you to the vet.", sl: "Če lahko to storite varno, k veterinarju odnesite embalažo, etiketo, rastlino ali snov.", de: "Wenn es gefahrlos möglich ist, nehmen Sie Verpackung, Etikett, Pflanze oder Substanz mit zum Tierarzt.", fr: "Si vous pouvez le faire sans danger, apportez l’emballage, l’étiquette, la plante ou la substance chez le vétérinaire.", es: "Si puedes hacerlo sin riesgo, lleva al veterinario el envase, la etiqueta, la planta o la sustancia.", it: "Se puoi farlo senza rischi, porta dal veterinario la confezione, l’etichetta, la pianta o la sostanza." }, sources: [RSPCA, ICC] },
];

export const contacts: Contact[] = [
  {
    country: "SI", org: "Univerza v Ljubljani, Veterinarska fakulteta — Klinika za male živali", kind: "emergency_vet",
    phone: "+386 30 716 190",
    hours: { en: "Emergency number reachable 24 hours a day (dogs and cats)", sl: "Številka za nujne primere je dosegljiva 24 ur na dan (psi in mačke)", de: "Notrufnummer rund um die Uhr erreichbar (Hunde und Katzen)", fr: "Numéro d’urgence joignable 24 h/24 (chiens et chats)", es: "Número de urgencias disponible las 24 horas (perros y gatos)", it: "Numero per le emergenze attivo 24 ore su 24 (cani e gatti)" },
    fee: { en: "The call is free", sl: "Klic je brezplačen", de: "Der Anruf ist kostenlos", fr: "L’appel est gratuit", es: "La llamada es gratuita", it: "La chiamata è gratuita" }, note: null,
    url: "https://www.vf.uni-lj.si/klinike/klinika-za-male-zivali",
  },
  {
    country: "HR", org: "Sveučilište u Zagrebu, Veterinarski fakultet — Sveučilišna veterinarska bolnica", kind: "emergency_vet",
    phone: null,
    hours: { en: "Emergency intake 24 hours a day — come in without calling", sl: "Sprejem nujnih primerov 24 ur na dan — pridite brez klica", de: "Notaufnahme rund um die Uhr – kommen Sie ohne vorherigen Anruf direkt vorbei", fr: "Accueil des urgences 24 h/24 – venez directement, sans appeler", es: "Atención de urgencias las 24 horas: acude directamente, sin llamar", it: "Accettazione delle emergenze 24 ore su 24: vai direttamente, senza chiamare" },
    fee: null, note: { en: "The emergency desk does not answer phone calls.", sl: "Nujni sprejem ne odgovarja na telefonske klice.", de: "Die Notaufnahme nimmt keine Telefonanrufe entgegen.", fr: "Le service des urgences ne répond pas au téléphone.", es: "El servicio de urgencias no atiende llamadas telefónicas.", it: "Il pronto soccorso non risponde alle chiamate telefoniche." },
    url: "https://www.vef.unizg.hr/usluge/sveucilisna-veterinarska-bolnica/",
  },
  {
    country: "GB", org: "Animal PoisonLine (Veterinary Poisons Information Service)", kind: "poison_line",
    phone: "01202 509 000",
    hours: { en: "24 hours a day", sl: "24 ur na dan", de: "24\u00a0Stunden am Tag", fr: "24 h/24", es: "Las 24 horas", it: "24 ore su 24" },
    fee: { en: "£35 per call 8am–8pm Mon–Fri, £45 at other times", sl: "35 £ na klic pon–pet 8–20, sicer 45 £", de: "35\u00a0£ pro Anruf Mo.–Fr. 8–20\u00a0Uhr, sonst 45\u00a0£", fr: "35 £ par appel du lundi au vendredi de 8 h à 20 h, 45 £ le reste du temps", es: "35\u00a0£ por llamada de lunes a viernes, de 8:00 a 20:00, y 45\u00a0£ en otros horarios", it: "35 £ a chiamata dal lunedì al venerdì dalle 8 alle 20, 45 £ negli altri orari" }, note: null,
    url: "https://www.animalpoisonline.co.uk/",
  },
  {
    country: "US", org: "ASPCA Animal Poison Control Center", kind: "poison_line",
    phone: "(888) 426-4435",
    hours: { en: "24 hours a day, 365 days a year", sl: "24 ur na dan, vse dni v letu", de: "24\u00a0Stunden am Tag, 365\u00a0Tage im Jahr", fr: "24 h/24, 365 jours par an", es: "Las 24 horas, los 365 días del año", it: "24 ore su 24, 365 giorni all’anno" },
    fee: { en: "A consultation fee may apply", sl: "Posvet je lahko plačljiv", de: "Es kann eine Beratungsgebühr anfallen", fr: "La consultation peut être payante", es: "La consulta puede tener un coste", it: "La consulenza può essere a pagamento" }, note: null,
    url: "https://www.aspca.org/pet-care/animal-poison-control",
  },
  {
    country: "US", org: "Pet Poison Helpline", kind: "poison_line",
    phone: "(855) 764-7661",
    hours: { en: "24/7", sl: "24/7", de: "24/7", fr: "24 h/24, 7 j/7", es: "24/7", it: "24 ore su 24, 7 giorni su 7" },
    fee: { en: "$99 per incident", sl: "99 $ na primer", de: "99\u00a0$ pro Fall", fr: "99 $ par incident", es: "99\u00a0$ por incidente", it: "99 $ per ogni caso" }, note: null,
    url: "https://www.petpoisonhelpline.com/",
  },
  {
    country: "AU", org: "Animal Poisons Helpline", kind: "poison_line",
    phone: "1300 869 738",
    hours: { en: "24/7", sl: "24/7", de: "24/7", fr: "24 h/24, 7 j/7", es: "24/7", it: "24 ore su 24, 7 giorni su 7" },
    fee: { en: "From AUD 79 (private service)", sl: "Od 79 AUD (zasebna služba)", de: "Ab 79\u00a0AUD (privater Dienst)", fr: "À partir de 79 AUD (service privé)", es: "Desde 79\u00a0AUD (servicio privado)", it: "Da 79 AUD (servizio privato)" },
    note: { en: "New Zealand: 0800 869 738", sl: "Nova Zelandija: 0800 869 738", de: "Neuseeland: 0800 869 738", fr: "Nouvelle-Zélande : 0800 869 738", es: "Nueva Zelanda: 0800 869 738", it: "Nuova Zelanda: 0800 869 738" },
    url: "https://www.animalpoisons.com.au/",
  },
];

export const emergencySlug: Record<Locale, string> = { en: "emergency", sl: "nujni-primeri", de: "notfall", fr: "urgence", es: "urgencias", it: "emergenza" };

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
      searchPlaceholder: "e.g. Split, Málaga, Maribor", only24h: "Only 24 h", results: "{n} results",
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
      searchPlaceholder: "npr. Split, Málaga, Maribor", only24h: "Samo 24 ur", results: "Zadetkov: {n}",
      none: "Ni zadetkov — poskusite drug kraj ali regijo.", h24: "24 ur", dutyRota: "Dežurstva", poisonLine: "Linija za zastrupitve",
      website: "Spletna stran", source: "Vir", checked: "preverjeno",
    },
  },
  de: {
    crumb: "Notfall",
    title: "Etwas Giftiges gefressen? Was Sie jetzt tun sollten",
    metaTitle: "Etwas Giftiges gefressen? Was Sie jetzt tun sollten – PetPrep",
    description: "Was Sie sofort tun sollten, wenn Ihr Hund oder Ihre Katze etwas Giftiges gefressen hat, sowie Giftnotrufe für Tiere und tierärztliche Notdienste rund um die Uhr nach Ländern – jeder Schritt und jede Nummer aus offiziellen Quellen.",
    eyebrow: "Ratgeber · Notfall",
    lead: "Rufen Sie sofort Ihren Tierarzt oder einen Giftnotruf für Tiere an – warten Sie nicht auf Anzeichen. Die Schritte stammen von tiermedizinischen Organisationen und Tierschutzorganisationen, die Nummern von deren offiziellen Seiten.",
    stepsTitle: "Was tun? Schritt für Schritt",
    contactsTitle: "Hilfe rund um die Uhr nach Ländern",
    contactsIntro: "Nur Nummern, die wir auf einer offiziellen Seite gefunden haben. Ihr eigener Tierarzt ist immer eine gute erste Anlaufstelle.",
    poisonLine: "Giftnotruf für Tiere",
    emergencyVet: "Tierärztlicher Notdienst",
    noPhone: "Keine Telefonnummer",
    elsewhere: "Ihr Land ist nicht aufgeführt? Rufen Sie Ihren eigenen Tierarzt oder die nächste Tierklinik mit Notdienst an.",
    sources: "Quellen",
    open: "Offizielle Seite",
    countries: { SI: "Slowenien", HR: "Kroatien", GB: "Vereinigtes Königreich", US: "Vereinigte Staaten", AU: "Australien" },
    vetsTitle: "Tierärzte und Notfallkliniken nach Ländern",
    vetsIntro: "Im Urlaub oder zu Hause: Wählen Sie das Land, filtern Sie nach Region oder Ort, oder lassen Sie sich nur Kliniken anzeigen, die rund um die Uhr geöffnet sind. Jeder Eintrag verweist auf die Seite, von der wir ihn übernommen haben – rufen Sie vorher an, Öffnungszeiten können sich ändern.",
    vets: {
      country: "Land", all: "Alle Länder", region: "Region", allRegions: "Alle Regionen", search: "Ort oder Name",
      searchPlaceholder: "z.\u00a0B. Split, Málaga, Maribor", only24h: "Nur rund um die Uhr", results: "{n} Treffer",
      none: "Nichts gefunden – versuchen Sie einen anderen Ort oder eine andere Region.", h24: "24\u00a0h", dutyRota: "Notdienstplan", poisonLine: "Giftnotruf",
      website: "Website", source: "Quelle", checked: "geprüft",
    },
  },
  fr: {
    crumb: "Urgence",
    title: "Votre animal a mangé quelque chose de toxique ? Que faire maintenant",
    metaTitle: "Votre animal a mangé quelque chose de toxique ? Que faire – PetPrep",
    description: "Que faire immédiatement si votre chien ou votre chat a mangé quelque chose de toxique, et les centres antipoison vétérinaires et urgences vétérinaires 24 h/24 par pays – chaque étape et chaque numéro issus de sources officielles.",
    eyebrow: "Conseils · urgence",
    lead: "Appelez immédiatement votre vétérinaire ou un centre antipoison vétérinaire – n’attendez pas l’apparition de signes. Ces étapes proviennent d’organisations vétérinaires et de protection animale ; les numéros sont tirés de leurs pages officielles.",
    stepsTitle: "Que faire, étape par étape",
    contactsTitle: "Aide 24 h/24 par pays",
    contactsIntro: "Uniquement des numéros trouvés sur une page officielle. Appeler votre propre vétérinaire est toujours un bon premier réflexe.",
    poisonLine: "Centre antipoison vétérinaire",
    emergencyVet: "Urgences vétérinaires",
    noPhone: "Pas de ligne téléphonique",
    elsewhere: "Votre pays n’est pas dans la liste ? Appelez votre vétérinaire ou la clinique vétérinaire d’urgence la plus proche.",
    sources: "Sources",
    open: "Page officielle",
    countries: { SI: "Slovénie", HR: "Croatie", GB: "Royaume-Uni", US: "États-Unis", AU: "Australie" },
    vetsTitle: "Vétérinaires et cliniques d’urgence par pays",
    vetsIntro: "En vacances ou chez vous : choisissez le pays, filtrez par région ou par ville, ou n’affichez que les cliniques ouvertes 24 h/24. Chaque fiche renvoie à la page d’où nous l’avons tirée – appelez avant de vous déplacer, les horaires peuvent changer.",
    vets: {
      country: "Pays", all: "Tous les pays", region: "Région", allRegions: "Toutes les régions", search: "Ville ou nom",
      searchPlaceholder: "p. ex. Split, Málaga, Maribor", only24h: "Uniquement 24 h/24", results: "Résultats : {n}",
      none: "Aucun résultat – essayez une autre ville ou une autre région.", h24: "24 h/24", dutyRota: "Service de garde", poisonLine: "Centre antipoison",
      website: "Site web", source: "Source", checked: "vérifié le",
    },
  },
  es: {
    crumb: "Urgencias",
    title: "¿Tu mascota ha comido algo tóxico? Qué hacer ahora",
    metaTitle: "¿Tu mascota ha comido algo tóxico? Qué hacer ahora — PetPrep",
    description: "Qué hacer enseguida si tu perro o tu gato ha comido algo tóxico, y líneas de información toxicológica para animales y urgencias veterinarias 24 horas por países. Cada paso y cada número, de fuentes oficiales.",
    eyebrow: "Consejos · urgencias",
    lead: "Llama enseguida a tu veterinario o a una línea de información toxicológica para animales y no esperes a que aparezcan signos. Estos pasos proceden de organizaciones veterinarias y de protección animal; los números, de sus páginas oficiales.",
    stepsTitle: "Qué hacer, paso a paso",
    contactsTitle: "Ayuda las 24 horas por países",
    contactsIntro: "Solo números que hemos encontrado en una página oficial. Llamar a tu propio veterinario siempre es una buena primera opción.",
    poisonLine: "Línea de información toxicológica para animales",
    emergencyVet: "Urgencias veterinarias",
    noPhone: "Sin línea telefónica",
    elsewhere: "¿Tu país no aparece en la lista? Llama a tu veterinario o a la clínica veterinaria de urgencias más cercana.",
    sources: "Fuentes",
    open: "Página oficial",
    countries: { SI: "Eslovenia", HR: "Croacia", GB: "Reino Unido", US: "Estados Unidos", AU: "Australia" },
    vetsTitle: "Veterinarios y clínicas de urgencias por países",
    vetsIntro: "En casa o de vacaciones: elige el país, filtra por región o localidad, o muestra solo las clínicas abiertas las 24 horas. Cada ficha enlaza a la página de la que la hemos sacado. Llama antes de ir, porque los horarios pueden cambiar.",
    vets: {
      country: "País", all: "Todos los países", region: "Región", allRegions: "Todas las regiones", search: "Localidad o nombre",
      searchPlaceholder: "p. ej., Split, Málaga, Maribor", only24h: "Solo 24\u00a0h", results: "Resultados: {n}",
      none: "No hay resultados: prueba con otra localidad u otra región.", h24: "24\u00a0h", dutyRota: "Guardias", poisonLine: "Línea toxicológica",
      website: "Sitio web", source: "Fuente", checked: "comprobado el",
    },
  },
  it: {
    crumb: "Emergenza",
    title: "Il tuo animale ha mangiato qualcosa di tossico? Cosa fare subito",
    metaTitle: "Il tuo animale ha mangiato qualcosa di tossico? Cosa fare subito — PetPrep",
    description: "Cosa fare subito se il tuo cane o il tuo gatto ha mangiato qualcosa di tossico, con i centri antiveleni veterinari e i pronto soccorso veterinari attivi 24 ore su 24, Paese per Paese. Ogni passaggio e ogni numero da fonti ufficiali.",
    eyebrow: "Consigli · emergenza",
    lead: "Chiama subito il veterinario o un centro antiveleni veterinario e non aspettare che compaiano i sintomi. Questi passaggi provengono da organizzazioni veterinarie e per la tutela degli animali; i numeri, dalle loro pagine ufficiali.",
    stepsTitle: "Cosa fare, passo dopo passo",
    contactsTitle: "Aiuto 24 ore su 24, Paese per Paese",
    contactsIntro: "Solo numeri che abbiamo trovato su una pagina ufficiale. Chiamare il tuo veterinario è sempre un buon primo passo.",
    poisonLine: "Centro antiveleni veterinario",
    emergencyVet: "Pronto soccorso veterinario",
    noPhone: "Nessuna linea telefonica",
    elsewhere: "Il tuo Paese non è nell’elenco? Chiama il tuo veterinario o la clinica veterinaria di pronto soccorso più vicina.",
    sources: "Fonti",
    open: "Pagina ufficiale",
    countries: { SI: "Slovenia", HR: "Croazia", GB: "Regno Unito", US: "Stati Uniti", AU: "Australia" },
    vetsTitle: "Veterinari e cliniche di pronto soccorso, Paese per Paese",
    vetsIntro: "A casa o in vacanza: scegli il Paese, filtra per regione o località, oppure mostra solo le cliniche aperte 24 ore su 24. Ogni scheda rimanda alla pagina da cui l’abbiamo presa. Chiama prima di andare, perché gli orari possono cambiare.",
    vets: {
      country: "Paese", all: "Tutti i Paesi", region: "Regione", allRegions: "Tutte le regioni", search: "Località o nome",
      searchPlaceholder: "ad es. Split, Málaga, Maribor", only24h: "Solo 24 h", results: "Risultati: {n}",
      none: "Nessun risultato: prova con un’altra località o un’altra regione.", h24: "24 h", dutyRota: "Turni di guardia", poisonLine: "Centro antiveleni",
      website: "Sito web", source: "Fonte", checked: "verificato il",
    },
  },
};
