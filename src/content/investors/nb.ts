import type { InvestorsCopy } from "./types";

const nb: InvestorsCopy = {
  meta: {
    title: "PetPrep for investorer: én gründer og en innholdsmotor for et produkt på 15 år",
    description:
      "I PetPrep viser et barn i en realistisk simulering over 12 uker at det er klart for et kjæledyr, og appen følger familien gjennom hele dyrets liv. Tall i sanntid, inntektskart og hvordan du ber om investoroversikten.",
  },
  eyebrow: "For investorer",
  title: "Én gründer og en innholdsmotor for et produkt som familier bruker i 15 år.",
  seriesTitle: "«12 Weeks»",
  lead: "I PetPrep viser et barn i en realistisk simulering over 12 uker at det er klart for et kjæledyr – og appen følger familien gjennom hele dyrets liv. Alt rundt den, fra serien vår til et stellbibliotek der hver opplysning har en kilde, finnes for å få familier inn til nesten ingen kostnad.",
  watch: "Se «12 Weeks» på YouTube",
  brief: "Be om investoroversikten",
  heroStats: {
    breeds: "hunde- og kattraser med kildebaserte stellregler",
    sources: "kilder fra dyrleger og kennelklubber",
    episodes: "episoder av familiekomedien vår «12 Weeks»",
  },
  opportunity: {
    eyebrow: "Muligheten",
    title: "Fra en 12-ukersutfordring til et forhold på 10–15 år.",
    items: [
      { tag: "Problem", text: "Barn lover å ta seg av et kjæledyr, men foreldre har ingen nøytral måte å prøve det ut på før de binder seg til penger og mange års stell." },
      { tag: "Løsning", text: "En realistisk simulering over 12 uker med foreldreoversikt i sanntid og en objektiv Care Score, som avsluttes med et Ansvarsdiplom." },
      { tag: "Utvidelse", text: "Når det virkelige kjæledyret kommer hjem, blir PetPrep dets AI-assistent: data fra halsbåndet, AI som første kontakt med dyrlegen, vekst og kosthold, DNA-tester og partnertjenester." },
    ],
  },
  flywheel: {
    eyebrow: "Svinghjulet",
    title: "Innhold henter inn familiene. Virkelige kjæledyr får dem til å bli i årevis.",
    lead: "Hvert stykke innhold er et steg i den samme sirkelen, ikke et sideprosjekt.",
    steps: [
      { title: "Innholdsmotor", text: "Serie, Curio, fargeleggingsark og stellbibliotek, laget av én gründer med AI-agenter." },
      { title: "Familier finner PetPrep", text: "Gjennom søk, sosiale medier og #walkyourpet i stedet for betalte annonser." },
      { title: "12-ukersutfordringen", text: "Første inntekt: 49,99 € per kjæledyr, engangsbetaling.", highlight: true },
      { title: "Et virkelig kjæledyr kommer hjem", text: "PetPrep blir familiens AI-assistent for stell av dyret i 10–15 år." },
      { title: "Partnere for livet", text: "Forsikring, dyrleger, fôr og DNA-tester: tilbud tilpasset familiens kjæledyr som foreldre selv velger å se." },
      { title: "Inntektene finansierer mer innhold", text: "Sponsorer og inntekter fra fase 2 betaler for neste sesong, og sirkelen snurrer videre." },
    ],
  },
  engine: {
    eyebrow: "Innholdsmotor · tall i sanntid",
    title: "Dette har vi bygget så langt",
    lead: "Hvert tall nedenfor oppdaterer seg selv fra registeret vårt, kunnskapsbasen vår og kanalene våre.",
    updated: "Oppdateres automatisk fra registeret vårt, kunnskapsbasen vår og kanalene våre.",
    cards: {
      breeds: { label: "Raser i registeret", note: (dogs, cats) => `${dogs} hunderaser og ${cats} kattraser, nye kommer til hver natt` },
      sources: { label: "Kilder", note: "Dyrleger, kennelklubber og studier, med sitater" },
      episodes: { label: "Episoder av «12 Weeks»", note: (views) => (views ? `${views} visninger på YouTube` : "På YouTube") },
      coloring: { label: "Gratis fargeleggingsark", note: "Til utskrift, A4 og US Letter" },
      curio: { value: "Pilot", label: "Animasjonsserien Curio", note: "Pilotepisoden ligger på YouTube og TikTok" },
      foods: { label: "Forklarte matvarer", note: "Stellbibliotek, nye matvarer hver natt" },
      languages: { label: "Språk", note: "Nettstedet og stellbiblioteket" },
      vets: { label: "Land med dyrlegeoversikt", note: "Dyrleger med akuttvakt etter land" },
    },
    status: { live: "Live", building: "Under bygging", planned: "Planlagt" },
    media: {
      playlist: "«12 Weeks» – serien",
      channel: "YouTube-kanalen @petprep-si →",
      play: "Spill av",
      all: "Alle episoder (spilleliste)",
      episode: (n) => `Episode ${n}`,
      consent: "Spilles av fra YouTube (youtube-nocookie.com) – ingenting lastes før du klikker.",
      more: "Mer å se",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilotepisoden av vår stille familiekomedie" },
      curioAll: "Curio – alle episoder",
      promo: { title: "PetPrep på 60 sekunder", text: "Er barnet ditt klart for et virkelig kjæledyr?" },
      curio: { title: "Møt Curio", text: "Maskoten vår og de korte videoene" },
      coloring: { title: "Fargeleggingsark", text: "Gratis å skrive ut, hvert med et kildebelagt faktum om stell av kjæledyr" },
      walkthrough: { title: "Slik fungerer appen", text: "12-ukersutfordringen, steg for steg" },
    },
    closing: "Alt dette lages av én gründer med AI-agenter, uten produksjonsteam og uten byrå. Hvert stykke innhold leder tilbake til appen.",
  },
  built: {
    eyebrow: "Bygget så langt",
    title: "Et virkelig produkt, ikke en prototype",
    items: [
      "Spillmotor på serveren med synkronisering i sanntid, testet på simuleringer av hele døgn, dager med tidsomstilling og spesielle familiesituasjoner.",
      "Familier med flere foreldre, flere barn og felles kjæledyr, med rettferdig vurdering av hvert barn.",
      "Fotorealistiske AI-kjæledyr med målte og begrensede AI-kostnader, og medier på leide servere i Tyskland (Hetzner, EU).",
      "Kjæledyrenes behov bygger på siterte kilder fra dyrleger og kennelklubber, og hvert tall kan spores til kilden.",
      "Barnesikkerhet fra grunnen av: innlogging med PIN-kode uten e-post, minst mulig data, ingen reklame og bare kontrollerte medier.",
      "Tilgjengelig spill: enklere bevegelser, skjermlesere, og det å skyve en rullestol teller som tur.",
    ],
  },
  revenue: {
    eyebrow: "Inntektskart",
    title: "Fase 1 betaler for å nå familier. Fase 2 er forretningen.",
    phases: [
      {
        tag: "Fase 1 · Før kjæledyret",
        name: "Betaler for å nå familier",
        items: [
          { name: "12-ukersutfordringen", price: "49,99 € per kjæledyr, engangsbetaling", status: "live", label: "Bygget" },
          { name: "Ønsker (ting til kjæledyret)", price: "2,99–15,99 €, bare utseende", status: "live", label: "Bygget" },
          { name: "Seriesponsing", price: "Sesongpakker", status: "building", label: "Pågår" },
          { name: "Butikk: fargeleggingsbøker, Curio-bamse, puslespill", price: "Fysiske og digitale", status: "planned", label: "Planlagt" },
        ],
      },
      {
        tag: "Fase 2 · Med et virkelig kjæledyr",
        name: "Forretningen",
        items: [
          { name: "AI-assistent for stell av kjæledyret", price: "Abonnement fra 3,99 € i måneden + påfyll", status: "planned", label: "Planlagt" },
          { name: "Forsikringspartnere for kjæledyr", price: "Tilbud som foreldre selv velger å se, betaling per henvisning", status: "planned", label: "Planlagt" },
          { name: "Nettverk av dyrlegepartnere", price: "Bestilling av time og videokonsultasjoner", status: "planned", label: "Planlagt" },
          { name: "DNA-tester og dyrebutikker som partnere", price: "Affiliate, senere et eget testsett", status: "planned", label: "Planlagt" },
        ],
      },
      {
        tag: "Merkevare",
        name: "Curio og serien",
        items: [
          { name: "Animasjonsserien Curio", price: "Sesongsponsorer", status: "live", label: "Pilot ute" },
          { name: "#walkyourpet", price: "En bevegelse som mater alle kanalene", status: "live", label: "Live" },
        ],
      },
    ],
    retention: "En familie som skaffer dyr etter utfordringen, blir hos PetPrep i dyrets 10–15 år, ikke bare i 12 uker.",
    stageTag: "Status",
    stage: "Før lansering, i lukket beta på iOS og Android. Lansering i App Store og Google Play følger.",
  },
  team: {
    eyebrow: "Team",
    title: "Resultatet av et studio. Kostnaden til én person.",
    founderName: "David Tacer, gründer og daglig leder.",
    founder: "Har i 12 år drevet sitt eget programvareselskap (over 400 prosjekter) og grunnla CHERR.IO (vinner av FutureHack, Davos 2018). Bygger PetPrep på heltid sammen med et team av AI-agenter for kode og innhold.",
    points: [
      "Hver opplysning har en kilde og et sitat, kontrollert av en uavhengig gransker.",
      "Familienes data blir i EU, barn logger inn uten e-post, og det er ingen reklame i appen.",
      "Nattlige prosesser undersøker, kontrollerer og publiserer nye raser og stellsider.",
    ],
  },
  webSummit: {
    title: "Møt oss på Web Summit i Lisboa",
    text: "9.–12. november 2026. Vi deler oversikt, presentasjon, datarom og betatilgang på forespørsel.",
    watch: "Se serien",
  },
  contactTitle: "Ta kontakt",
};

export default nb;
