import type { InvestorsCopy } from "./types";

const de: InvestorsCopy = {
  meta: {
    title: "PetPrep für Investoren: ein Gründer und eine Content-Engine für ein Produkt auf 15 Jahre",
    description:
      "Bei PetPrep beweist ein Kind in einer 12-wöchigen, realistischen Simulation, dass es für ein Haustier bereit ist – und die App begleitet die Familie ein Tierleben lang. Live-Zahlen, Erlösmodell und wie Sie das Investoren-Briefing anfordern.",
  },
  eyebrow: "Für Investoren",
  title: "Ein Gründer und eine Content-Engine für ein Produkt, das Familien 15 Jahre lang nutzen.",
  seriesTitle: "„12 Weeks“",
  lead: "Bei PetPrep beweist ein Kind in einer 12-wöchigen, realistischen Simulation, dass es für ein Haustier bereit ist – und die App begleitet die Familie ein Tierleben lang. Alles drumherum, von unserer Serie bis zum Ratgeber, in dem jede Aussage eine Quelle hat, dient dazu, Familien fast ohne Kosten zu gewinnen.",
  watch: "„12 Weeks“ auf YouTube ansehen",
  brief: "Investoren-Briefing anfordern",
  heroStats: {
    breeds: "Hunde- und Katzenrassen mit belegten Pflegeregeln",
    sources: "Quellen von Tierärzten und Zuchtverbänden",
    episodes: "Folgen unserer Familienkomödie „12 Weeks“",
  },
  opportunity: {
    eyebrow: "Die Chance",
    title: "Von der 12-Wochen-Challenge zur Beziehung auf 10 bis 15 Jahre.",
    items: [
      { tag: "Problem", text: "Kinder versprechen, sich um ein Haustier zu kümmern. Eltern haben keine neutrale Möglichkeit, das zu prüfen, bevor sie Geld und Jahre der Fürsorge zusagen." },
      { tag: "Lösung", text: "Eine realistische 12-Wochen-Simulation mit Live-Dashboard für Eltern und objektivem Care Score, die mit einem Verantwortungszertifikat endet." },
      { tag: "Ausbau", text: "Sobald das echte Haustier einzieht, wird PetPrep sein KI-Assistent: Halsbanddaten, KI-Erstkontakt zum Tierarzt, Wachstum und Ernährung, DNA-Tests, Partnerdienste." },
    ],
  },
  flywheel: {
    eyebrow: "Das Schwungrad",
    title: "Inhalte bringen Familien zu uns. Echte Haustiere halten sie über Jahre.",
    lead: "Jeder Inhalt ist ein Schritt im selben Kreislauf – kein Nebenprojekt.",
    steps: [
      { title: "Content-Engine", text: "Serie, Curio, Ausmalbilder und Ratgeber – von einem einzigen Gründer mit KI-Agenten gemacht." },
      { title: "Familien finden PetPrep", text: "Über Suche, Social Media und #walkyourpet – statt über bezahlte Werbung." },
      { title: "12-Wochen-Challenge", text: "Der erste Umsatz: 49,99 € pro Haustier, einmalig.", highlight: true },
      { title: "Ein echtes Haustier zieht ein", text: "PetPrep wird für 10 bis 15 Jahre zum KI-Assistenten der Familie für die Haustierpflege." },
      { title: "Partner fürs Leben", text: "Versicherung, Tierärzte, Futter und DNA-Tests – Angebote passend zum Haustier der Familie, die Eltern sich freiwillig ansehen." },
      { title: "Umsatz finanziert mehr Inhalte", text: "Sponsoren und Erlöse aus Phase 2 zahlen die nächste Staffel – und der Kreislauf dreht sich weiter." },
    ],
  },
  engine: {
    eyebrow: "Content-Engine · Live-Zahlen",
    title: "Was wir bisher geschafft haben",
    lead: "Jede Zahl unten aktualisiert sich selbstständig aus unserem Register, unserer Wissensbasis und unseren Kanälen.",
    updated: "Automatisch aktualisiert aus unserem Register, unserer Wissensbasis und unseren Kanälen.",
    cards: {
      breeds: { label: "Rassen im Register", note: (dogs, cats) => `${dogs} Hunde- und ${cats} Katzenrassen, jede Nacht kommen neue dazu` },
      sources: { label: "Quellen", note: "Tierärzte, Zuchtverbände und Studien, mit Zitaten" },
      episodes: { label: "Folgen von „12 Weeks“", note: (views) => (views ? `${views} Aufrufe auf YouTube` : "Auf YouTube") },
      coloring: { label: "Kostenlose Ausmalbilder", note: "Zum Ausdrucken, A4 und US Letter" },
      curio: { value: "Pilot", label: "Animationsserie Curio", note: "Pilotfolge auf YouTube und TikTok erschienen" },
      foods: { label: "Erklärte Lebensmittel", note: "Ratgeber, jede Nacht neue Lebensmittel" },
      languages: { label: "Sprachen", note: "Website und Ratgeber" },
      vets: { label: "Länder mit Tierarztverzeichnis", note: "Notdienst-Tierärzte nach Land" },
    },
    status: { live: "Live", building: "Im Aufbau", planned: "Geplant" },
    media: {
      playlist: "„12 Weeks“ – die Serie",
      channel: "YouTube-Kanal @petprep-si →",
      play: "Abspielen",
      all: "Alle Folgen (Playlist)",
      episode: (n) => `Folge ${n}`,
      consent: "Wird von YouTube abgespielt (youtube-nocookie.com) – bis zum Klick wird nichts geladen.",
      more: "Mehr zum Ansehen",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilotfolge unserer stummen Familienkomödie" },
      curioAll: "Curio – alle Folgen",
      promo: { title: "PetPrep in 60 Sekunden", text: "Ist Ihr Kind bereit für ein echtes Haustier?" },
      curio: { title: "Curio kennenlernen", text: "Unser Maskottchen und seine Kurzvideos" },
      coloring: { title: "Ausmalbilder", text: "Kostenlos zum Ausdrucken, jedes mit einem belegten Fakt zur Haustierpflege" },
      walkthrough: { title: "So funktioniert die App", text: "Die 12-Wochen-Challenge, Schritt für Schritt" },
    },
    closing: "All das entsteht bei einem Gründer mit KI-Agenten, ohne Produktionsteam und ohne Agentur. Jeder Inhalt führt zurück in die App.",
  },
  built: {
    eyebrow: "Bisher gebaut",
    title: "Ein echtes Produkt, kein Prototyp",
    items: [
      "Serverseitige Spiel-Engine mit Echtzeit-Synchronisierung, getestet mit Simulationen ganzer Tage, Tagen der Zeitumstellung und Sonderfällen in Familien.",
      "Familien mit mehreren Eltern, mehreren Kindern und gemeinsamen Haustieren, mit fairer Bewertung für jedes Kind.",
      "Fotorealistische KI-Haustiere mit gemessenen und gedeckelten KI-Kosten; die Medien liegen auf gemieteten Servern in Deutschland (Hetzner, EU).",
      "Die Bedürfnisse der Haustiere stützen sich auf zitierte Quellen von Tierärzten und Zuchtverbänden; jede Zahl lässt sich bis zur Quelle zurückverfolgen.",
      "Kindersicherheit von Anfang an: Anmeldung per PIN ohne E-Mail, minimale Daten, keine Werbung, nur geprüfte Medien.",
      "Barrierefreies Spielen: einfachere Gesten, Screenreader, Rollstuhlfahrten zählen als Spaziergänge.",
    ],
  },
  revenue: {
    eyebrow: "Erlösmodell",
    title: "Phase 1 finanziert die Gewinnung neuer Familien. Phase 2 ist das Geschäft.",
    phases: [
      {
        tag: "Phase 1 · Vor dem Haustier",
        name: "Finanziert die Gewinnung neuer Familien",
        items: [
          { name: "12-Wochen-Challenge", price: "49,99 € pro Haustier, einmalig", status: "live", label: "Gebaut" },
          { name: "Wünsche (Dinge für das Haustier)", price: "2,99–15,99 €, nur Optik", status: "live", label: "Gebaut" },
          { name: "Serien-Sponsoring", price: "Staffelpakete", status: "building", label: "In Arbeit" },
          { name: "Shop: Ausmalbücher, Curio-Plüschtier, Puzzles", price: "Physisch und digital", status: "planned", label: "Geplant" },
        ],
      },
      {
        tag: "Phase 2 · Mit echtem Haustier",
        name: "Das Geschäft",
        items: [
          { name: "KI-Assistent für die Haustierpflege", price: "Abo ab 3,99 € pro Monat + Aufladungen", status: "planned", label: "Geplant" },
          { name: "Partner für Tierversicherungen", price: "Angebote, die Eltern sich freiwillig ansehen, Vergütung pro Vermittlung", status: "planned", label: "Geplant" },
          { name: "Partnernetzwerk von Tierärzten", price: "Buchungen und Videosprechstunden", status: "planned", label: "Geplant" },
          { name: "DNA-Tests und Partner aus dem Zoofachhandel", price: "Affiliate, später eigenes Testkit", status: "planned", label: "Geplant" },
        ],
      },
      {
        tag: "Marke",
        name: "Curio und die Serie",
        items: [
          { name: "Animationsserie Curio", price: "Staffelsponsoren", status: "live", label: "Pilot erschienen" },
          { name: "#walkyourpet", price: "Eine Bewegung, die alle Kanäle speist", status: "live", label: "Live" },
        ],
      },
    ],
    retention: "Eine Familie, die nach der Challenge ein Tier aufnimmt, bleibt bei PetPrep, solange das Tier lebt: 10 bis 15 Jahre, nicht nur 12 Wochen.",
    stageTag: "Stand",
    stage: "Vor dem Marktstart, in der geschlossenen Beta auf iOS und Android. Als Nächstes folgt der Start im App Store und bei Google Play.",
  },
  team: {
    eyebrow: "Team",
    title: "Die Leistung eines Studios. Die Kosten einer einzigen Person.",
    founderName: "David Tacer, Gründer und CEO.",
    founder: "Führt seit 12 Jahren sein eigenes Softwareunternehmen (mehr als 400 Projekte), Gründer von CHERR.IO (FutureHack-Sieger, Davos 2018). Er baut PetPrep in Vollzeit, zusammen mit einem Team aus KI-Agenten für Programmierung und Inhalte.",
    points: [
      "Jede Aussage hat eine Quelle und ein Zitat und wird von einem unabhängigen Prüfer kontrolliert.",
      "Die Daten der Familien bleiben in der EU, Kinder melden sich ohne E-Mail an, in der App gibt es keine Werbung.",
      "Nächtliche Abläufe recherchieren, prüfen und veröffentlichen neue Rassen und Ratgeberseiten.",
    ],
  },
  webSummit: {
    title: "Treffen Sie uns auf dem Web Summit in Lissabon",
    text: "9.–12. November 2026. Briefing, Pitch-Deck, Datenraum und Beta-Zugang teilen wir auf Anfrage.",
    watch: "Serie ansehen",
  },
  contactTitle: "Kontakt aufnehmen",
};

export default de;
