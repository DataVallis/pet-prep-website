import type { InvestorsCopy } from "./types";

const sv: InvestorsCopy = {
  meta: {
    title: "PetPrep för investerare: en grundare och en innehållsmotor för en produkt på 15 år",
    description:
      "I PetPrep bevisar ett barn i en realistisk simulering på 12 veckor att det är redo för ett husdjur, och appen följer familjen under hela djurets liv. Siffror i realtid, intäktskarta och hur du begär investerarunderlaget.",
  },
  eyebrow: "För investerare",
  title: "En grundare och en innehållsmotor för en produkt som familjer använder i 15 år.",
  seriesTitle: "”12 Weeks”",
  lead: "I PetPrep bevisar ett barn i en realistisk simulering på 12 veckor att det är redo för ett husdjur, och appen följer familjen under hela djurets liv. Allt runt omkring, från vår serie till ett skötselbibliotek där varje uppgift har en källa, finns för att nå familjer till nästan noll kostnad.",
  watch: "Se ”12 Weeks” på YouTube",
  brief: "Begär investerarunderlaget",
  heroStats: {
    breeds: "hund- och kattraser med källbelagda skötselregler",
    sources: "källor från veterinärer och kennelklubbar",
    episodes: "avsnitt av vår familjekomedi ”12 Weeks”",
  },
  opportunity: {
    eyebrow: "Möjligheten",
    title: "Från en 12-veckorsutmaning till en relation på 10–15 år.",
    items: [
      { tag: "Problem", text: "Barn lovar att ta hand om ett husdjur, men föräldrar har inget neutralt sätt att pröva det innan de binder sig för pengar och många års omsorg." },
      { tag: "Lösning", text: "En realistisk simulering på 12 veckor med en föräldravy i realtid och ett objektivt Care Score, som avslutas med ett Ansvarsdiplom." },
      { tag: "Expansion", text: "När det riktiga husdjuret kommer hem blir PetPrep dess AI-assistent: halsbandsdata, AI-förstakontakt med veterinären, tillväxt och kost, DNA-tester och partnertjänster." },
    ],
  },
  flywheel: {
    eyebrow: "Svänghjulet",
    title: "Innehåll lockar familjer. Riktiga husdjur får dem att stanna i åratal.",
    lead: "Varje innehåll är ett steg i samma kretslopp, inte ett sidoprojekt.",
    steps: [
      { title: "Innehållsmotor", text: "Serie, Curio, målarbilder och skötselbibliotek, skapade av en grundare med AI-agenter." },
      { title: "Familjer hittar PetPrep", text: "Via sök, sociala medier och #walkyourpet i stället för betalda annonser." },
      { title: "12-veckorsutmaningen", text: "Första intäkten: 49,99 € per husdjur, engångsbetalning.", highlight: true },
      { title: "Ett riktigt husdjur kommer hem", text: "PetPrep blir familjens AI-assistent för skötseln av djuret i 10–15 år." },
      { title: "Partner för livet", text: "Försäkring, veterinärer, foder och DNA-tester: erbjudanden som passar familjens husdjur och som föräldrar själva väljer att se." },
      { title: "Intäkterna finansierar mer innehåll", text: "Sponsorer och intäkter från fas 2 betalar nästa säsong, och kretsloppet snurrar vidare." },
    ],
  },
  engine: {
    eyebrow: "Innehållsmotor · siffror i realtid",
    title: "Det här har vi byggt hittills",
    lead: "Varje siffra nedan uppdaterar sig själv från vårt register, vår kunskapsbas och våra kanaler.",
    updated: "Uppdateras automatiskt från vårt register, vår kunskapsbas och våra kanaler.",
    cards: {
      breeds: { label: "Raser i registret", note: (dogs, cats) => `${dogs} hundraser och ${cats} kattraser, nya tillkommer varje natt` },
      sources: { label: "Källor", note: "Veterinärer, kennelklubbar och studier, med citat" },
      episodes: { label: "Avsnitt av ”12 Weeks”", note: (views) => (views ? `${views} visningar på YouTube` : "På YouTube") },
      coloring: { label: "Gratis målarbilder", note: "Att skriva ut, A4 och US Letter" },
      curio: { value: "Pilot", label: "Animerade serien Curio", note: "Pilotavsnittet finns på YouTube och TikTok" },
      foods: { label: "Förklarade livsmedel", note: "Skötselbibliotek, nya livsmedel varje natt" },
      languages: { label: "Språk", note: "Webbplatsen och skötselbiblioteket" },
      vets: { label: "Länder med veterinärkatalog", note: "Akutveterinärer per land" },
    },
    status: { live: "Live", building: "Under uppbyggnad", planned: "Planerat" },
    media: {
      playlist: "”12 Weeks” – serien",
      channel: "YouTube-kanalen @petprep-si →",
      play: "Spela upp",
      all: "Alla avsnitt (spellista)",
      episode: (n) => `Avsnitt ${n}`,
      consent: "Spelas upp från YouTube (youtube-nocookie.com) – inget laddas förrän du klickar.",
      more: "Mer att titta på",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilotavsnittet av vår tysta familjekomedi" },
      curioAll: "Curio – alla avsnitt",
      promo: { title: "PetPrep på 60 sekunder", text: "Är ditt barn redo för ett riktigt husdjur?" },
      curio: { title: "Möt Curio", text: "Vår maskot och dess korta filmer" },
      coloring: { title: "Målarbilder", text: "Gratis att skriva ut, alla med ett källbelagt faktum om djurskötsel" },
      walkthrough: { title: "Så fungerar appen", text: "12-veckorsutmaningen, steg för steg" },
    },
    closing: "Allt det här görs av en grundare med AI-agenter, utan produktionsteam eller byrå. Varje innehåll leder tillbaka till appen.",
  },
  built: {
    eyebrow: "Byggt hittills",
    title: "En riktig produkt, inte en prototyp",
    items: [
      "Spelmotor på servern med synkronisering i realtid, testad på simuleringar av hela dygn, dagar med tidsomställning och särskilda familjesituationer.",
      "Familjer med flera föräldrar, flera barn och delade husdjur, med rättvis bedömning av varje barn.",
      "Fotorealistiska AI-husdjur med uppmätta och begränsade AI-kostnader, och media på hyrda servrar i Tyskland (Hetzner, EU).",
      "Husdjurens behov bygger på citerade källor från veterinärer och kennelklubbar, och varje siffra kan spåras till sin källa.",
      "Barnsäkerhet från grunden: inloggning med PIN-kod utan e-post, minimalt med uppgifter, inga annonser och bara kontrollerad media.",
      "Tillgängligt spel: enklare gester, skärmläsare och att skjuta en rullstol räknas som promenad.",
    ],
  },
  revenue: {
    eyebrow: "Intäktskarta",
    title: "Fas 1 betalar för att nå familjer. Fas 2 är affären.",
    phases: [
      {
        tag: "Fas 1 · Före husdjuret",
        name: "Betalar för att nå familjer",
        items: [
          { name: "12-veckorsutmaningen", price: "49,99 € per husdjur, engångsbetalning", status: "live", label: "Byggt" },
          { name: "Önskningar (saker till husdjuret)", price: "2,99–15,99 €, bara utseende", status: "live", label: "Byggt" },
          { name: "Seriesponsring", price: "Säsongspaket", status: "building", label: "Pågår" },
          { name: "Butik: målarböcker, Curio-gosedjur, pussel", price: "Fysiska och digitala", status: "planned", label: "Planerat" },
        ],
      },
      {
        tag: "Fas 2 · Med ett riktigt husdjur",
        name: "Affären",
        items: [
          { name: "AI-assistent för djurskötsel", price: "Prenumeration från 3,99 € per månad + påfyllning", status: "planned", label: "Planerat" },
          { name: "Försäkringspartner för husdjur", price: "Erbjudanden som föräldrar själva väljer att se, ersättning per förmedling", status: "planned", label: "Planerat" },
          { name: "Nätverk av veterinärpartner", price: "Bokningar och digitala konsultationer", status: "planned", label: "Planerat" },
          { name: "DNA-tester och zoobutiker som partner", price: "Affiliate, senare ett eget testkit", status: "planned", label: "Planerat" },
        ],
      },
      {
        tag: "Varumärke",
        name: "Curio och serien",
        items: [
          { name: "Animerade serien Curio", price: "Säsongssponsorer", status: "live", label: "Pilot ute" },
          { name: "#walkyourpet", price: "En rörelse som matar alla kanaler", status: "live", label: "Live" },
        ],
      },
    ],
    retention: "En familj som skaffar djur efter utmaningen stannar hos PetPrep under djurets 10–15 år, inte bara i 12 veckor.",
    stageTag: "Nuläge",
    stage: "Före lansering, i sluten beta på iOS och Android. Lansering i App Store och Google Play följer.",
  },
  team: {
    eyebrow: "Team",
    title: "En studios resultat. En persons kostnad.",
    founderName: "David Tacer, grundare och vd.",
    founder: "Har i 12 år drivit sitt eget mjukvaruföretag (över 400 projekt) och grundade CHERR.IO (vinnare av FutureHack, Davos 2018). Bygger PetPrep på heltid, tillsammans med ett team av AI-agenter för kod och innehåll.",
    points: [
      "Varje uppgift har en källa och ett citat, granskade av en oberoende granskare.",
      "Familjernas uppgifter stannar i EU, barn loggar in utan e-post och det finns inga annonser i appen.",
      "Nattliga processer undersöker, kontrollerar och publicerar nya raser och skötselsidor.",
    ],
  },
  webSummit: {
    title: "Träffa oss på Web Summit i Lissabon",
    text: "9–12 november 2026. Vi delar underlag, presentation, datarum och tillgång till betan på begäran.",
    watch: "Se serien",
  },
  contactTitle: "Kontakta oss",
};

export default sv;
