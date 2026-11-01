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
  { text: { en: "Stay calm and act straight away.", sl: "Ostanite mirni in ukrepajte takoj.", de: "Bleiben Sie ruhig und handeln Sie sofort.", fr: "Restez calme et agissez immédiatement.", es: "Mantén la calma y actúa de inmediato.", it: "Mantieni la calma e agisci subito.", pt: "Mantém a calma e age de imediato.", nl: "Blijf rustig en kom meteen in actie.", pl: "Zachowaj spokój i działaj od razu.", cs: "Zachovejte klid a jednejte okamžitě." }, sources: [RSPCA, ASPCA] },
  { text: { en: "Move your pet away from the substance.", sl: "Žival odmaknite od snovi.", de: "Bringen Sie Ihr Tier von der Substanz weg.", fr: "Éloignez votre animal de la substance.", es: "Aleja a tu mascota de la sustancia.", it: "Allontana l’animale dalla sostanza.", pt: "Afasta o teu animal da substância.", nl: "Haal je huisdier weg bij de stof.", pl: "Odsuń zwierzę od substancji.", cs: "Odveďte zvíře z dosahu látky." }, sources: [RSPCA, PPH] },
  { text: { en: "Check that your pet is breathing and acting normally.", sl: "Preverite, ali žival diha in se vede običajno.", de: "Prüfen Sie, ob Ihr Tier atmet und sich normal verhält.", fr: "Vérifiez que votre animal respire et se comporte normalement.", es: "Comprueba que tu mascota respira y se comporta con normalidad.", it: "Controlla che l’animale respiri e si comporti normalmente.", pt: "Verifica se o teu animal está a respirar e a comportar-se normalmente.", nl: "Controleer of je huisdier ademt en zich normaal gedraagt.", pl: "Sprawdź, czy zwierzę oddycha i zachowuje się normalnie.", cs: "Zkontrolujte, zda zvíře dýchá a chová se normálně." }, sources: [PPH] },
  { text: { en: "Call your vet or an animal poison line right away. Tell them what happened, when and where.", sl: "Takoj pokličite veterinarja ali linijo za zastrupitve živali. Povejte, kaj se je zgodilo, kdaj in kje.", de: "Rufen Sie sofort Ihren Tierarzt oder einen Giftnotruf für Tiere an. Schildern Sie, was wann und wo passiert ist.", fr: "Appelez immédiatement votre vétérinaire ou un centre antipoison vétérinaire. Expliquez ce qui s’est passé, quand et où.", es: "Llama enseguida a tu veterinario o a una línea de información toxicológica para animales. Explica qué ha pasado, cuándo y dónde.", it: "Chiama subito il veterinario o un centro antiveleni veterinario. Spiega cosa è successo, quando e dove.", pt: "Liga imediatamente ao teu veterinário ou a uma linha de apoio toxicológico para animais. Explica o que aconteceu, quando e onde.", nl: "Bel meteen je dierenarts of een vergiftigingenlijn voor dieren. Vertel wat er is gebeurd, wanneer en waar.", pl: "Natychmiast zadzwoń do weterynarza lub na telefon informacji toksykologicznej dla zwierząt. Powiedz, co się stało, kiedy i gdzie.", cs: "Ihned zavolejte veterináři nebo na toxikologickou linku pro zvířata. Řekněte, co se stalo, kdy a kde." }, sources: [RSPCA, PDSA, ICC] },
  { text: { en: "Do not wait for signs of illness — call even if your pet seems fine.", sl: "Ne čakajte na znake bolezni — pokličite, tudi če je žival videti v redu.", de: "Warten Sie nicht auf Krankheitsanzeichen – rufen Sie auch an, wenn Ihr Tier gesund wirkt.", fr: "N’attendez pas l’apparition de signes de maladie – appelez même si votre animal semble bien aller.", es: "No esperes a que aparezcan signos de enfermedad: llama aunque tu mascota parezca estar bien.", it: "Non aspettare che compaiano sintomi di malattia: chiama anche se l’animale sembra stare bene.", pt: "Não esperes por sinais de doença – liga mesmo que o teu animal pareça estar bem.", nl: "Wacht niet op verschijnselen van ziekte – bel ook als je huisdier er goed uitziet.", pl: "Nie czekaj na objawy choroby – zadzwoń, nawet jeśli zwierzę wydaje się zdrowe.", cs: "Nečekejte na příznaky onemocnění – zavolejte, i když se zvíře zdá v pořádku." }, sources: [PDSA, ASPCA] },
  { text: { en: "Do not make your pet vomit unless a vet tells you to. It can do more harm than good.", sl: "Živali ne silite k bruhanju, razen če vam tako naroči veterinar. Lahko naredi več škode kot koristi.", de: "Bringen Sie Ihr Tier nicht zum Erbrechen, es sei denn, ein Tierarzt fordert Sie dazu auf. Das kann mehr schaden als nützen.", fr: "Ne faites pas vomir votre animal, sauf si un vétérinaire vous le demande. Cela peut faire plus de mal que de bien.", es: "No provoques el vómito a tu mascota salvo que te lo indique un veterinario. Puede hacer más mal que bien.", it: "Non far vomitare l’animale, a meno che non te lo dica un veterinario. Può fare più male che bene.", pt: "Não faças o teu animal vomitar, a não ser que um veterinário te diga para o fazeres. Pode fazer mais mal do que bem.", nl: "Laat je huisdier niet overgeven, tenzij een dierenarts dat zegt. Dat kan meer kwaad dan goed doen.", pl: "Nie wywołuj u zwierzęcia wymiotów, chyba że zaleci to weterynarz. Może to bardziej zaszkodzić, niż pomóc.", cs: "Nevyvolávejte u zvířete zvracení, pokud vám to neřekne veterinář. Může to víc uškodit než pomoci." }, sources: [PPH, RSPCA, PDSA] },
  { text: { en: "Do not give home remedies such as salt water, and don't act on random tips from the internet.", sl: "Ne dajajte domačih pripravkov, kot je slana voda, in ne ravnajte po naključnih nasvetih s spleta.", de: "Geben Sie keine Hausmittel wie Salzwasser und verlassen Sie sich nicht auf irgendwelche Tipps aus dem Internet.", fr: "Ne donnez pas de remède maison comme de l’eau salée, et ne suivez pas de conseils trouvés au hasard sur Internet.", es: "No le des remedios caseros como agua con sal ni sigas cualquier consejo que encuentres en internet.", it: "Non dare rimedi casalinghi come l’acqua salata e non seguire consigli trovati a caso su internet.", pt: "Não dês remédios caseiros, como água com sal, e não sigas dicas aleatórias da internet.", nl: "Geef geen huismiddeltjes zoals zout water en ga niet af op willekeurige tips van internet.", pl: "Nie podawaj domowych środków, takich jak słona woda, i nie kieruj się przypadkowymi radami z internetu.", cs: "Nepodávejte domácí prostředky, jako je slaná voda, a neřiďte se náhodnými radami z internetu." }, sources: [PPH, RSPCA, ASPCA] },
  { text: { en: "Note what your pet ate, roughly how much and when.", sl: "Zapišite si, kaj je žival pojedla, približno koliko in kdaj.", de: "Notieren Sie, was Ihr Tier gefressen hat, ungefähr wie viel und wann.", fr: "Notez ce que votre animal a mangé, en quelle quantité approximative et à quel moment.", es: "Apunta qué ha comido tu mascota, más o menos cuánto y cuándo.", it: "Annota cosa ha mangiato l’animale, più o meno quanto e quando.", pt: "Anota o que o teu animal comeu, mais ou menos quanto e quando.", nl: "Schrijf op wat je huisdier heeft gegeten, ongeveer hoeveel en wanneer.", pl: "Zapisz, co zwierzę zjadło, mniej więcej ile i kiedy.", cs: "Poznamenejte si, co zvíře snědlo, zhruba kolik a kdy." }, sources: [RSPCA, ASPCA] },
  { text: { en: "If you can do it safely, take the packaging, label, plant or substance with you to the vet.", sl: "Če lahko to storite varno, k veterinarju odnesite embalažo, etiketo, rastlino ali snov.", de: "Wenn es gefahrlos möglich ist, nehmen Sie Verpackung, Etikett, Pflanze oder Substanz mit zum Tierarzt.", fr: "Si vous pouvez le faire sans danger, apportez l’emballage, l’étiquette, la plante ou la substance chez le vétérinaire.", es: "Si puedes hacerlo sin riesgo, lleva al veterinario el envase, la etiqueta, la planta o la sustancia.", it: "Se puoi farlo senza rischi, porta dal veterinario la confezione, l’etichetta, la pianta o la sostanza.", pt: "Se o puderes fazer em segurança, leva contigo ao veterinário a embalagem, o rótulo, a planta ou a substância.", nl: "Als het veilig kan, neem dan de verpakking, het etiket, de plant of de stof mee naar de dierenarts.", pl: "Jeśli możesz to zrobić bezpiecznie, zabierz do weterynarza opakowanie, etykietę, roślinę lub substancję.", cs: "Pokud to jde bezpečně, vezměte s\u00a0sebou k\u00a0veterináři obal, etiketu, rostlinu nebo látku." }, sources: [RSPCA, ICC] },
];

export const contacts: Contact[] = [
  {
    country: "SI", org: "Univerza v Ljubljani, Veterinarska fakulteta — Klinika za male živali", kind: "emergency_vet",
    phone: "+386 30 716 190",
    hours: { en: "Emergency number reachable 24 hours a day (dogs and cats)", sl: "Številka za nujne primere je dosegljiva 24 ur na dan (psi in mačke)", de: "Notrufnummer rund um die Uhr erreichbar (Hunde und Katzen)", fr: "Numéro d’urgence joignable 24 h/24 (chiens et chats)", es: "Número de urgencias disponible las 24 horas (perros y gatos)", it: "Numero per le emergenze attivo 24 ore su 24 (cani e gatti)", pt: "Número de emergência disponível 24 horas por dia (cães e gatos)", nl: "Noodnummer 24 uur per dag bereikbaar (honden en katten)", pl: "Numer alarmowy czynny całą dobę (psy i koty)", cs: "Číslo pro naléhavé případy je dostupné 24\u00a0hodin denně (psi a kočky)" },
    fee: { en: "The call is free", sl: "Klic je brezplačen", de: "Der Anruf ist kostenlos", fr: "L’appel est gratuit", es: "La llamada es gratuita", it: "La chiamata è gratuita", pt: "A chamada é gratuita", nl: "Bellen is gratis", pl: "Połączenie jest bezpłatne", cs: "Hovor je zdarma" }, note: null,
    url: "https://www.vf.uni-lj.si/klinike/klinika-za-male-zivali",
  },
  {
    country: "HR", org: "Sveučilište u Zagrebu, Veterinarski fakultet — Sveučilišna veterinarska bolnica", kind: "emergency_vet",
    phone: null,
    hours: { en: "Emergency intake 24 hours a day — come in without calling", sl: "Sprejem nujnih primerov 24 ur na dan — pridite brez klica", de: "Notaufnahme rund um die Uhr – kommen Sie ohne vorherigen Anruf direkt vorbei", fr: "Accueil des urgences 24 h/24 – venez directement, sans appeler", es: "Atención de urgencias las 24 horas: acude directamente, sin llamar", it: "Accettazione delle emergenze 24 ore su 24: vai direttamente, senza chiamare", pt: "Atendimento de urgências 24 horas por dia – vai diretamente, sem ligar", nl: "Spoedopvang 24 uur per dag – kom langs zonder te bellen", pl: "Przyjęcia nagłych przypadków całą dobę – przyjdź bez wcześniejszego telefonu", cs: "Příjem naléhavých případů 24\u00a0hodin denně – přijďte bez předchozího volání" },
    fee: null, note: { en: "The emergency desk does not answer phone calls.", sl: "Nujni sprejem ne odgovarja na telefonske klice.", de: "Die Notaufnahme nimmt keine Telefonanrufe entgegen.", fr: "Le service des urgences ne répond pas au téléphone.", es: "El servicio de urgencias no atiende llamadas telefónicas.", it: "Il pronto soccorso non risponde alle chiamate telefoniche.", pt: "O serviço de urgências não atende chamadas telefónicas.", nl: "De spoedbalie neemt geen telefoon op.", pl: "Punkt przyjęć nagłych przypadków nie odbiera telefonów.", cs: "Pohotovostní příjem nevyřizuje telefonické hovory." },
    url: "https://www.vef.unizg.hr/usluge/sveucilisna-veterinarska-bolnica/",
  },
  {
    country: "GB", org: "Animal PoisonLine (Veterinary Poisons Information Service)", kind: "poison_line",
    phone: "01202 509 000",
    hours: { en: "24 hours a day", sl: "24 ur na dan", de: "24\u00a0Stunden am Tag", fr: "24 h/24", es: "Las 24 horas", it: "24 ore su 24", pt: "24 horas por dia", nl: "24 uur per dag", pl: "Całą dobę", cs: "24\u00a0hodin denně" },
    fee: { en: "£35 per call 8am–8pm Mon–Fri, £45 at other times", sl: "35 £ na klic pon–pet 8–20, sicer 45 £", de: "35\u00a0£ pro Anruf Mo.–Fr. 8–20\u00a0Uhr, sonst 45\u00a0£", fr: "35 £ par appel du lundi au vendredi de 8 h à 20 h, 45 £ le reste du temps", es: "35\u00a0£ por llamada de lunes a viernes, de 8:00 a 20:00, y 45\u00a0£ en otros horarios", it: "35 £ a chiamata dal lunedì al venerdì dalle 8 alle 20, 45 £ negli altri orari", pt: "35 £ por chamada de segunda a sexta, das 8h às 20h; 45 £ nos restantes horários", nl: "£\u00a035 per gesprek ma–vr 8.00–20.00 uur, £\u00a045 op andere tijden", pl: "35\u00a0£ za połączenie pon.–pt. 8:00–20:00, w pozostałych godzinach 45\u00a0£", cs: "35\u00a0£ za hovor po–pá 8:00–20:00, jindy 45\u00a0£" }, note: null,
    url: "https://www.animalpoisonline.co.uk/",
  },
  {
    country: "US", org: "ASPCA Animal Poison Control Center", kind: "poison_line",
    phone: "(888) 426-4435",
    hours: { en: "24 hours a day, 365 days a year", sl: "24 ur na dan, vse dni v letu", de: "24\u00a0Stunden am Tag, 365\u00a0Tage im Jahr", fr: "24 h/24, 365 jours par an", es: "Las 24 horas, los 365 días del año", it: "24 ore su 24, 365 giorni all’anno", pt: "24 horas por dia, 365 dias por ano", nl: "24 uur per dag, 365 dagen per jaar", pl: "Całą dobę, 365 dni w roku", cs: "24\u00a0hodin denně, 365\u00a0dní v\u00a0roce" },
    fee: { en: "A consultation fee may apply", sl: "Posvet je lahko plačljiv", de: "Es kann eine Beratungsgebühr anfallen", fr: "La consultation peut être payante", es: "La consulta puede tener un coste", it: "La consulenza può essere a pagamento", pt: "A consulta pode ter um custo", nl: "Aan het consult kunnen kosten verbonden zijn", pl: "Konsultacja może być płatna", cs: "Konzultace může být zpoplatněna" }, note: null,
    url: "https://www.aspca.org/pet-care/animal-poison-control",
  },
  {
    country: "US", org: "Pet Poison Helpline", kind: "poison_line",
    phone: "(855) 764-7661",
    hours: { en: "24/7", sl: "24/7", de: "24/7", fr: "24 h/24, 7 j/7", es: "24/7", it: "24 ore su 24, 7 giorni su 7", pt: "24 horas por dia, 7 dias por semana", nl: "24/7", pl: "Całą dobę, 7 dni w tygodniu", cs: "24\u00a0hodin denně, 7\u00a0dní v\u00a0týdnu" },
    fee: { en: "$99 per incident", sl: "99 $ na primer", de: "99\u00a0$ pro Fall", fr: "99 $ par incident", es: "99\u00a0$ por incidente", it: "99 $ per ogni caso", pt: "99 $ por ocorrência", nl: "$\u00a099 per incident", pl: "99\u00a0$ za przypadek", cs: "99\u00a0$ za případ" }, note: null,
    url: "https://www.petpoisonhelpline.com/",
  },
  {
    country: "AU", org: "Animal Poisons Helpline", kind: "poison_line",
    phone: "1300 869 738",
    hours: { en: "24/7", sl: "24/7", de: "24/7", fr: "24 h/24, 7 j/7", es: "24/7", it: "24 ore su 24, 7 giorni su 7", pt: "24 horas por dia, 7 dias por semana", nl: "24/7", pl: "Całą dobę, 7 dni w tygodniu", cs: "24\u00a0hodin denně, 7\u00a0dní v\u00a0týdnu" },
    fee: { en: "From AUD 79 (private service)", sl: "Od 79 AUD (zasebna služba)", de: "Ab 79\u00a0AUD (privater Dienst)", fr: "À partir de 79 AUD (service privé)", es: "Desde 79\u00a0AUD (servicio privado)", it: "Da 79 AUD (servizio privato)", pt: "A partir de 79 AUD (serviço privado)", nl: "Vanaf AUD\u00a079 (particuliere dienst)", pl: "Od 79\u00a0AUD (usługa prywatna)", cs: "Od 79\u00a0AUD (soukromá služba)" },
    note: { en: "New Zealand: 0800 869 738", sl: "Nova Zelandija: 0800 869 738", de: "Neuseeland: 0800 869 738", fr: "Nouvelle-Zélande : 0800 869 738", es: "Nueva Zelanda: 0800 869 738", it: "Nuova Zelanda: 0800 869 738", pt: "Nova Zelândia: 0800 869 738", nl: "Nieuw-Zeeland: 0800 869 738", pl: "Nowa Zelandia: 0800 869 738", cs: "Nový Zéland: 0800 869 738" },
    url: "https://www.animalpoisons.com.au/",
  },
];

export const emergencySlug: Record<Locale, string> = { en: "emergency", sl: "nujni-primeri", de: "notfall", fr: "urgence", es: "urgencias", it: "emergenza", pt: "emergencia", nl: "noodgevallen", pl: "nagle-przypadki", cs: "pohotovost" };

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
  pt: {
    crumb: "Emergência",
    title: "O teu animal comeu alguma coisa tóxica? O que fazer agora",
    metaTitle: "O teu animal comeu alguma coisa tóxica? O que fazer agora – PetPrep",
    description: "O que fazer de imediato se o teu cão ou o teu gato tiver comido alguma coisa tóxica, e linhas de apoio toxicológico para animais e urgências veterinárias 24 horas por dia, por país. Cada passo e cada número vêm de fontes oficiais.",
    eyebrow: "Conselhos · emergência",
    lead: "Liga imediatamente ao teu veterinário ou a uma linha de apoio toxicológico para animais – não esperes pelos sinais. Estes passos vêm de organizações veterinárias e de proteção animal; os números, das suas páginas oficiais.",
    stepsTitle: "O que fazer, passo a passo",
    contactsTitle: "Ajuda 24 horas por dia, por país",
    contactsIntro: "Apenas números que encontrámos numa página oficial. Ligar ao teu veterinário é sempre uma boa primeira opção.",
    poisonLine: "Linha de apoio toxicológico para animais",
    emergencyVet: "Urgência veterinária",
    noPhone: "Sem linha telefónica",
    elsewhere: "O teu país não está na lista? Liga ao teu veterinário ou à clínica veterinária de urgência mais próxima.",
    sources: "Fontes",
    open: "Página oficial",
    countries: { SI: "Eslovénia", HR: "Croácia", GB: "Reino Unido", US: "Estados Unidos", AU: "Austrália" },
    vetsTitle: "Veterinários e clínicas de urgência por país",
    vetsIntro: "Em casa ou de férias: escolhe o país, filtra por região ou localidade, ou mostra apenas as clínicas abertas 24 horas por dia. Cada entrada tem uma ligação para a página de onde a tirámos. Liga antes de ir, porque os horários podem mudar.",
    vets: {
      country: "País", all: "Todos os países", region: "Região", allRegions: "Todas as regiões", search: "Localidade ou nome",
      searchPlaceholder: "p. ex. Split, Málaga, Maribor", only24h: "Só 24 h", results: "Resultados: {n}",
      none: "Sem resultados – experimenta outra localidade ou outra região.", h24: "24 h", dutyRota: "Escalas de serviço", poisonLine: "Linha toxicológica",
      website: "Sítio web", source: "Fonte", checked: "verificado a",
    },
  },
  nl: {
    crumb: "Noodgevallen",
    title: "Huisdier iets giftigs gegeten? Dit doe je nu",
    metaTitle: "Huisdier iets giftigs gegeten? Dit doe je nu – PetPrep",
    description: "Wat je meteen doet als je hond of kat iets giftigs heeft gegeten, plus vergiftigingenlijnen voor dieren en dierenartsen voor spoedgevallen die 24 uur per dag bereikbaar zijn, per land – elke stap en elk nummer uit officiële bronnen.",
    eyebrow: "Verzorging · noodgevallen",
    lead: "Bel meteen je dierenarts of een vergiftigingenlijn voor dieren – wacht niet op verschijnselen. Deze stappen komen van veterinaire en dierenwelzijnsorganisaties; de nummers staan op hun officiële pagina’s.",
    stepsTitle: "Wat je moet doen, stap voor stap",
    contactsTitle: "Hulp 24 uur per dag, per land",
    contactsIntro: "Alleen nummers die we op een officiële pagina hebben gevonden. Je eigen dierenarts bellen is altijd een goede eerste stap.",
    poisonLine: "Vergiftigingenlijn voor dieren",
    emergencyVet: "Spoeddierenarts",
    noPhone: "Geen telefoonnummer",
    elsewhere: "Staat je land er niet bij? Bel je eigen dierenarts of de dichtstbijzijnde dierenkliniek met spoedhulp.",
    sources: "Bronnen",
    open: "Officiële pagina",
    countries: { SI: "Slovenië", HR: "Kroatië", GB: "Verenigd Koninkrijk", US: "Verenigde Staten", AU: "Australië" },
    vetsTitle: "Dierenartsen en spoedklinieken per land",
    vetsIntro: "Thuis of op vakantie: kies het land, filter op regio of plaats, of toon alleen klinieken die 24 uur per dag open zijn. Bij elke vermelding staat een link naar de pagina waar we die vandaan hebben – bel even van tevoren, openingstijden kunnen veranderen.",
    vets: {
      country: "Land", all: "Alle landen", region: "Regio", allRegions: "Alle regio’s", search: "Plaats of naam",
      searchPlaceholder: "bijv. Split, Málaga, Maribor", only24h: "Alleen 24 uur", results: "Resultaten: {n}",
      none: "Niets gevonden – probeer een andere plaats of regio.", h24: "24 uur", dutyRota: "Dienstrooster", poisonLine: "Vergiftigingenlijn",
      website: "Website", source: "Bron", checked: "gecontroleerd",
    },
  },
  pl: {
    crumb: "Nagłe przypadki",
    title: "Zwierzę zjadło coś toksycznego? Co zrobić teraz",
    metaTitle: "Zwierzę zjadło coś toksycznego? Co zrobić teraz – PetPrep",
    description: "Co zrobić od razu, jeśli twój pies lub kot zjadł coś toksycznego, oraz całodobowe telefony informacji toksykologicznej dla zwierząt i dyżury weterynaryjne w poszczególnych krajach – każdy krok i każdy numer z oficjalnych źródeł.",
    eyebrow: "Opieka · nagłe przypadki",
    lead: "Natychmiast zadzwoń do weterynarza lub na telefon informacji toksykologicznej dla zwierząt – nie czekaj na objawy. Te kroki pochodzą od organizacji weterynaryjnych i prozwierzęcych, a numery – z ich oficjalnych stron.",
    stepsTitle: "Co robić krok po kroku",
    contactsTitle: "Całodobowa pomoc w poszczególnych krajach",
    contactsIntro: "Tylko numery, które znaleźliśmy na oficjalnej stronie. Telefon do własnego weterynarza to zawsze dobry pierwszy krok.",
    poisonLine: "Telefon informacji toksykologicznej dla zwierząt",
    emergencyVet: "Dyżur weterynaryjny",
    noPhone: "Brak linii telefonicznej",
    elsewhere: "Twojego kraju nie ma na liście? Zadzwoń do swojego weterynarza lub do najbliższej całodobowej przychodni weterynaryjnej.",
    sources: "Źródła",
    open: "Oficjalna strona",
    countries: { SI: "Słowenia", HR: "Chorwacja", GB: "Wielka Brytania", US: "Stany Zjednoczone", AU: "Australia" },
    vetsTitle: "Weterynarze i przychodnie z dyżurem w poszczególnych krajach",
    vetsIntro: "W domu czy na wakacjach: wybierz kraj, filtruj według regionu lub miejscowości albo pokaż tylko przychodnie czynne całą dobę. Każdy wpis prowadzi do strony, z której go wzięliśmy – zadzwoń przed wizytą, godziny otwarcia mogą się zmienić.",
    vets: {
      country: "Kraj", all: "Wszystkie kraje", region: "Region", allRegions: "Wszystkie regiony", search: "Miejscowość lub nazwa",
      searchPlaceholder: "np. Split, Málaga, Maribor", only24h: "Tylko całodobowe", results: "Wyniki: {n}",
      none: "Nic nie znaleziono – spróbuj innej miejscowości lub regionu.", h24: "24 h", dutyRota: "Grafik dyżurów", poisonLine: "Telefon toksykologiczny",
      website: "Strona internetowa", source: "Źródło", checked: "sprawdzono",
    },
  },
  cs: {
    crumb: "Pohotovost",
    title: "Snědlo zvíře něco jedovatého? Co dělat hned",
    metaTitle: "Snědlo zvíře něco jedovatého? Co dělat hned – PetPrep",
    description: "Co dělat hned, když váš pes nebo kočka sní něco jedovatého, a nonstop toxikologické linky pro zvířata a veterinární pohotovosti podle zemí – každý krok a každé číslo z oficiálních zdrojů.",
    eyebrow: "Péče · pohotovost",
    lead: "Ihned zavolejte veterináři nebo na toxikologickou linku pro zvířata – nečekejte na příznaky. Tyto kroky pocházejí od veterinárních organizací a organizací na ochranu zvířat a čísla z jejich oficiálních stránek.",
    stepsTitle: "Co dělat krok za krokem",
    contactsTitle: "Nonstop pomoc podle zemí",
    contactsIntro: "Jen čísla, která jsme našli na oficiální stránce. Zavolat vlastnímu veterináři je vždy dobrý první krok.",
    poisonLine: "Toxikologická linka pro zvířata",
    emergencyVet: "Veterinární pohotovost",
    noPhone: "Bez telefonní linky",
    elsewhere: "Vaše země v seznamu není? Zavolejte svému veterináři nebo na nejbližší nonstop veterinární pohotovost.",
    sources: "Zdroje",
    open: "Oficiální stránka",
    countries: { SI: "Slovinsko", HR: "Chorvatsko", GB: "Spojené království", US: "Spojené státy", AU: "Austrálie" },
    vetsTitle: "Veterináři a pohotovostní kliniky podle zemí",
    vetsIntro: "Doma i na dovolené: vyberte zemi, filtrujte podle regionu nebo města, nebo zobrazte jen kliniky otevřené 24 hodin denně. U každé položky je odkaz na stránku, ze které jsme ji převzali – před návštěvou zavolejte, otevírací doba se může změnit.",
    vets: {
      country: "Země", all: "Všechny země", region: "Region", allRegions: "Všechny regiony", search: "Město nebo název",
      searchPlaceholder: "např. Split, Málaga, Maribor", only24h: "Jen nonstop", results: "Výsledky: {n}",
      none: "Nic nenalezeno – zkuste jiné město nebo region.", h24: "24 h", dutyRota: "Rozpis pohotovostí", poisonLine: "Toxikologická linka",
      website: "Webové stránky", source: "Zdroj", checked: "ověřeno",
    },
  },
};
