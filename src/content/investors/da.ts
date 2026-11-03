import type { InvestorsCopy } from "./types";

const da: InvestorsCopy = {
  meta: {
    title: "PetPrep for investorer: én grundlægger og en indholdsmotor til et produkt på 15 år",
    description:
      "I PetPrep beviser et barn i en realistisk simulering over 12 uger, at det er klar til et kæledyr, og appen følger familien i hele dyrets liv. Tal i realtid, indtægtskort og hvordan du anmoder om investoroversigten.",
  },
  eyebrow: "For investorer",
  title: "Én grundlægger og en indholdsmotor til et produkt, som familier bruger i 15 år.",
  seriesTitle: "„12 Weeks“",
  lead: "I PetPrep beviser et barn i en realistisk simulering over 12 uger, at det er klar til et kæledyr – og appen følger familien i hele dyrets liv. Alt omkring den, fra vores serie til et plejebibliotek, hvor hver oplysning har en kilde, er til for at få familier ind ad døren til næsten ingen penge.",
  watch: "Se „12 Weeks“ på YouTube",
  brief: "Anmod om investoroversigten",
  heroStats: {
    breeds: "hunde- og katteracer med kildebaserede plejeregler",
    sources: "kilder fra dyrlæger og racehundeklubber",
    episodes: "afsnit af vores familiekomedie „12 Weeks“",
  },
  opportunity: {
    eyebrow: "Muligheden",
    title: "Fra en 12-ugers-udfordring til et forhold på 10–15 år.",
    items: [
      { tag: "Problem", text: "Børn lover at passe et kæledyr, men forældre har ingen neutral måde at prøve det af på, før de binder sig til penge og mange års pleje." },
      { tag: "Løsning", text: "En realistisk simulering over 12 uger med et forældreoverblik i realtid og en objektiv Care Score, der ender med et Ansvarsdiplom." },
      { tag: "Udvidelse", text: "Når det rigtige kæledyr kommer hjem, bliver PetPrep dets AI-assistent: data fra halsbåndet, AI som første kontakt til dyrlægen, vækst og kost, DNA-tests og partnertjenester." },
    ],
  },
  flywheel: {
    eyebrow: "Svinghjulet",
    title: "Indhold henter familierne ind. Rigtige kæledyr får dem til at blive i årevis.",
    lead: "Hvert stykke indhold er et trin i det samme kredsløb – ikke et sideprojekt.",
    steps: [
      { title: "Indholdsmotor", text: "Serie, Curio, malebilleder og plejebibliotek – lavet af én grundlægger med AI-agenter." },
      { title: "Familier finder PetPrep", text: "Via søgning, sociale medier og #walkyourpet i stedet for betalte annoncer." },
      { title: "12-ugers-udfordringen", text: "Første indtægt: 49,99 € pr. kæledyr, engangsbetaling.", highlight: true },
      { title: "Et rigtigt kæledyr kommer hjem", text: "PetPrep bliver familiens AI-assistent til pleje af dyret i 10–15 år." },
      { title: "Partnere for livet", text: "Forsikring, dyrlæger, foder og DNA-tests – tilbud, der passer til familiens kæledyr, og som forældre selv vælger at se." },
      { title: "Indtægterne betaler for mere indhold", text: "Sponsorer og indtægter fra fase 2 betaler næste sæson – og kredsløbet drejer videre." },
    ],
  },
  engine: {
    eyebrow: "Indholdsmotor · tal i realtid",
    title: "Det har vi bygget indtil nu",
    lead: "Hvert tal nedenfor opdaterer sig selv fra vores register, vores vidensbase og vores kanaler.",
    updated: "Opdateres automatisk fra vores register, vores vidensbase og vores kanaler.",
    cards: {
      breeds: { label: "Racer i registeret", note: (dogs, cats) => `${dogs} hunderacer og ${cats} katteracer, nye kommer til hver nat` },
      sources: { label: "Kilder", note: "Dyrlæger, racehundeklubber og undersøgelser, med citater" },
      episodes: { label: "Afsnit af „12 Weeks“", note: (views) => (views ? `${views} visninger på YouTube` : "På YouTube") },
      coloring: { label: "Gratis malebilleder", note: "Til udskrivning, A4 og US Letter" },
      curio: { value: "Pilot", label: "Animationsserien Curio", note: "Pilotafsnittet ligger på YouTube og TikTok" },
      foods: { label: "Forklarede fødevarer", note: "Plejebibliotek, nye fødevarer hver nat" },
      languages: { label: "Sprog", note: "Hjemmesiden og plejebiblioteket" },
      vets: { label: "Lande med dyrlægeoversigt", note: "Akutte dyrlæger efter land" },
    },
    status: { live: "Live", building: "Under opbygning", planned: "Planlagt" },
    media: {
      playlist: "„12 Weeks“ – serien",
      channel: "YouTube-kanalen @petprep-si →",
      play: "Afspil",
      all: "Alle afsnit (afspilningsliste)",
      episode: (n) => `Afsnit ${n}`,
      consent: "Afspilles fra YouTube (youtube-nocookie.com) – der indlæses intet, før du klikker.",
      more: "Mere at se",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilotafsnittet af vores tavse familiekomedie" },
      curioAll: "Curio – alle afsnit",
      promo: { title: "PetPrep på 60 sekunder", text: "Er dit barn klar til et rigtigt kæledyr?" },
      curio: { title: "Mød Curio", text: "Vores maskot og dens korte videoer" },
      coloring: { title: "Malebilleder", text: "Gratis at printe, hvert med et kildebelagt faktum om pleje af kæledyr" },
      walkthrough: { title: "Sådan virker appen", text: "12-ugers-udfordringen, trin for trin" },
    },
    closing: "Alt dette laves af én grundlægger med AI-agenter, uden produktionshold og uden bureau. Hvert stykke indhold fører tilbage til appen.",
  },
  built: {
    eyebrow: "Bygget indtil nu",
    title: "Et rigtigt produkt, ikke en prototype",
    items: [
      "Spilmotor på serveren med synkronisering i realtid, testet på simuleringer af hele døgn, dage med tidsomstilling og særlige familiesituationer.",
      "Familier med flere forældre, flere børn og fælles kæledyr, med retfærdig vurdering af hvert barn.",
      "Fotorealistiske AI-kæledyr med målte og begrænsede AI-omkostninger og medier på lejede servere i Tyskland (Hetzner, EU).",
      "Kæledyrenes behov bygger på citerede kilder fra dyrlæger og racehundeklubber, og hvert tal kan spores til sin kilde.",
      "Børnesikkerhed fra bunden: login med pinkode uden e-mail, mindst mulig data, ingen reklamer og kun kontrollerede medier.",
      "Tilgængeligt spil: nemmere bevægelser, skærmlæsere, og når man skubber en kørestol, tæller det som en gåtur.",
    ],
  },
  revenue: {
    eyebrow: "Indtægtskort",
    title: "Fase 1 betaler for at nå familier. Fase 2 er forretningen.",
    phases: [
      {
        tag: "Fase 1 · Før kæledyret",
        name: "Betaler for at nå familier",
        items: [
          { name: "12-ugers-udfordringen", price: "49,99 € pr. kæledyr, engangsbetaling", status: "live", label: "Bygget" },
          { name: "Ønsker (ting til kæledyret)", price: "2,99–15,99 €, kun udseende", status: "live", label: "Bygget" },
          { name: "Seriesponsorat", price: "Sæsonpakker", status: "building", label: "I gang" },
          { name: "Butik: malebøger, Curio-bamse, puslespil", price: "Fysiske og digitale", status: "planned", label: "Planlagt" },
        ],
      },
      {
        tag: "Fase 2 · Med et rigtigt kæledyr",
        name: "Forretningen",
        items: [
          { name: "AI-assistent til pleje af kæledyret", price: "Abonnement fra 3,99 € om måneden + tilkøb", status: "planned", label: "Planlagt" },
          { name: "Forsikringspartnere for kæledyr", price: "Tilbud, som forældre selv vælger at se, betaling pr. henvisning", status: "planned", label: "Planlagt" },
          { name: "Netværk af dyrlægepartnere", price: "Bookinger og videokonsultationer", status: "planned", label: "Planlagt" },
          { name: "DNA-tests og dyrebutikker som partnere", price: "Affiliate, senere et eget testkit", status: "planned", label: "Planlagt" },
        ],
      },
      {
        tag: "Brand",
        name: "Curio og serien",
        items: [
          { name: "Animationsserien Curio", price: "Sæsonsponsorer", status: "live", label: "Pilot ude" },
          { name: "#walkyourpet", price: "En bevægelse, der fodrer alle kanaler", status: "live", label: "Live" },
        ],
      },
    ],
    retention: "En familie, der får et dyr efter udfordringen, bliver hos PetPrep i dyrets 10–15 år, ikke kun i 12 uger.",
    stageTag: "Status",
    stage: "Før lancering, i lukket beta på iOS og Android. Lanceringen i App Store og Google Play følger.",
  },
  team: {
    eyebrow: "Team",
    title: "Et studies resultat. Én persons omkostninger.",
    founderName: "David Tacer, grundlægger og direktør.",
    founder: "Har i 12 år drevet sin egen softwarevirksomhed (over 400 projekter) og grundlagde CHERR.IO (vinder af FutureHack, Davos 2018). Bygger PetPrep på fuld tid sammen med et team af AI-agenter til kode og indhold.",
    points: [
      "Hver oplysning har en kilde og et citat, som en uafhængig reviewer kontrollerer.",
      "Familiernes data bliver i EU, børn logger ind uden e-mail, og der er ingen reklamer i appen.",
      "Natlige processer undersøger, kontrollerer og udgiver nye racer og plejesider.",
    ],
  },
  webSummit: {
    title: "Mød os til Web Summit i Lissabon",
    text: "9.–12. november 2026. Vi deler oversigt, præsentation, datarum og adgang til betaen efter aftale.",
    watch: "Se serien",
  },
  contactTitle: "Kontakt os",
};

export default da;
