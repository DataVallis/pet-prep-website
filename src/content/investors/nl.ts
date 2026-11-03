import type { InvestorsCopy } from "./types";

const nl: InvestorsCopy = {
  meta: {
    title: "PetPrep voor investeerders: één oprichter en een contentmotor voor een product van 15 jaar",
    description:
      "Met PetPrep bewijst een kind in een realistische simulatie van 12 weken dat het klaar is voor een huisdier, en de app blijft bij het gezin gedurende het hele leven van het dier. Cijfers live, verdienmodel en hoe je het investeerdersdocument aanvraagt.",
  },
  eyebrow: "Voor investeerders",
  title: "Eén oprichter en een contentmotor voor een product dat gezinnen 15 jaar gebruiken.",
  seriesTitle: "“12 Weeks”",
  lead: "Met PetPrep bewijst een kind in een realistische simulatie van 12 weken dat het klaar is voor een huisdier, en de app blijft bij het gezin gedurende het hele leven van het dier. Alles eromheen, van onze serie tot een verzorgingsbibliotheek waarin elk feit een bron heeft, is er om gezinnen tegen vrijwel nul kosten te bereiken.",
  watch: "Bekijk “12 Weeks” op YouTube",
  brief: "Investeerdersdocument aanvragen",
  heroStats: {
    breeds: "honden- en kattenrassen met verzorgingsregels uit bronnen",
    sources: "bronnen van dierenartsen en rasverenigingen",
    episodes: "afleveringen van onze familiekomedie “12 Weeks”",
  },
  opportunity: {
    eyebrow: "De kans",
    title: "Van een challenge van 12 weken naar een relatie van 10 tot 15 jaar.",
    items: [
      { tag: "Probleem", text: "Kinderen beloven dat ze voor een huisdier zorgen; ouders hebben geen neutrale manier om dat te toetsen voordat ze zich vastleggen op geld en jaren van zorg." },
      { tag: "Oplossing", text: "Een realistische simulatie van 12 weken met een live dashboard voor ouders en een objectieve Care Score, die eindigt met een Verantwoordelijkheidscertificaat." },
      { tag: "Uitbreiding", text: "Zodra het echte huisdier thuiskomt, wordt PetPrep de AI-assistent van het dier: gegevens van de halsband, eerste contact met de dierenarts via AI, groei en voeding, DNA-tests en diensten van partners." },
    ],
  },
  flywheel: {
    eyebrow: "Het vliegwiel",
    title: "Content brengt gezinnen binnen. Echte huisdieren houden ze jarenlang vast.",
    lead: "Elk stuk content is een stap in dezelfde cirkel, geen zijproject.",
    steps: [
      { title: "Contentmotor", text: "Serie, Curio, kleurplaten en verzorgingsbibliotheek, gemaakt door één oprichter met AI-agenten." },
      { title: "Gezinnen vinden PetPrep", text: "Via zoekmachines, social media en #walkyourpet in plaats van betaalde advertenties." },
      { title: "Challenge van 12 weken", text: "De eerste omzet: € 49,99 per huisdier, eenmalig.", highlight: true },
      { title: "Een echt huisdier komt thuis", text: "PetPrep wordt 10 tot 15 jaar lang de AI-assistent van het gezin voor de verzorging van het dier." },
      { title: "Partners voor het leven", text: "Verzekering, dierenartsen, voeding en DNA-tests: aanbiedingen die passen bij het huisdier van het gezin en die ouders zelf kiezen te bekijken." },
      { title: "Omzet financiert meer content", text: "Sponsors en inkomsten uit fase 2 betalen het volgende seizoen, en de cirkel draait weer." },
    ],
  },
  engine: {
    eyebrow: "Contentmotor · cijfers live",
    title: "Wat we tot nu toe hebben gebouwd",
    lead: "Elk cijfer hieronder werkt zichzelf bij vanuit ons register, onze kennisbank en onze kanalen.",
    updated: "Automatisch bijgewerkt vanuit ons register, onze kennisbank en onze kanalen.",
    cards: {
      breeds: { label: "Rassen in het register", note: (dogs, cats) => `${dogs} hondenrassen en ${cats} kattenrassen, elke nacht komen er nieuwe bij` },
      sources: { label: "Bronnen", note: "Dierenartsen, rasverenigingen en onderzoeken, met citaten" },
      episodes: { label: "Afleveringen van “12 Weeks”", note: (views) => (views ? `${views} weergaven op YouTube` : "Op YouTube") },
      coloring: { label: "Gratis kleurplaten", note: "Om af te drukken, A4 en US Letter" },
      curio: { value: "Pilot", label: "Animatieserie Curio", note: "Pilotaflevering staat op YouTube en TikTok" },
      foods: { label: "Uitgelegde voedingsmiddelen", note: "Verzorgingsbibliotheek, elke nacht nieuwe voedingsmiddelen" },
      languages: { label: "Talen", note: "Website en verzorgingsbibliotheek" },
      vets: { label: "Landen met dierenartsenoverzicht", note: "Spoeddierenartsen per land" },
    },
    status: { live: "Live", building: "In opbouw", planned: "Gepland" },
    media: {
      playlist: "“12 Weeks” – de serie",
      channel: "YouTube-kanaal @petprep-si →",
      play: "Afspelen",
      all: "Alle afleveringen (afspeellijst)",
      episode: (n) => `Aflevering ${n}`,
      consent: "Wordt afgespeeld vanaf YouTube (youtube-nocookie.com): er wordt niets geladen voordat je klikt.",
      more: "Meer om te bekijken",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilot van onze stomme familiekomedie" },
      curioAll: "Curio – alle afleveringen",
      promo: { title: "PetPrep in 60 seconden", text: "Is jouw kind klaar voor een echt huisdier?" },
      curio: { title: "Maak kennis met Curio", text: "Onze mascotte en zijn korte video’s" },
      coloring: { title: "Kleurplaten", text: "Gratis af te drukken, elk met een feit uit een bron over de verzorging van huisdieren" },
      walkthrough: { title: "Zo werkt de app", text: "De challenge van 12 weken, stap voor stap" },
    },
    closing: "Dit alles wordt gemaakt door één oprichter met AI-agenten, zonder productieteam of bureau. Elk stuk content leidt terug naar de app.",
  },
  built: {
    eyebrow: "Wat er al staat",
    title: "Een echt product, geen prototype",
    items: [
      "Spelmotor op de server met realtime synchronisatie, getest met simulaties van hele dagen, dagen waarop de klok verzet wordt en uitzonderlijke gezinssituaties.",
      "Gezinnen met meerdere ouders, meerdere kinderen en gedeelde huisdieren, met een eerlijke beoordeling per kind.",
      "Fotorealistische AI-huisdieren met gemeten en begrensde AI-kosten, en media op gehuurde servers in Duitsland (Hetzner, EU).",
      "Behoeften van huisdieren gebaseerd op geciteerde bronnen van dierenartsen en rasverenigingen, waarbij elk getal naar zijn bron te herleiden is.",
      "Kinderveiligheid vanaf het ontwerp: inloggen met een pincode zonder e-mail, minimale gegevens, geen advertenties en alleen gecontroleerde media.",
      "Toegankelijk spelen: eenvoudigere gebaren, schermlezers, en het duwen van een rolstoel telt als wandeling.",
    ],
  },
  revenue: {
    eyebrow: "Verdienmodel",
    title: "Fase 1 betaalt de werving. Fase 2 is het bedrijf.",
    phases: [
      {
        tag: "Fase 1 · Vóór het huisdier",
        name: "Betaalt de werving",
        items: [
          { name: "Challenge van 12 weken", price: "€ 49,99 per huisdier, eenmalig", status: "live", label: "Gebouwd" },
          { name: "Wensen (spullen voor het huisdier)", price: "€ 2,99 tot € 15,99, alleen uiterlijk", status: "live", label: "Gebouwd" },
          { name: "Sponsoring van de serie", price: "Seizoenspakketten", status: "building", label: "In uitvoering" },
          { name: "Winkel: kleurboeken, Curio-knuffel, puzzels", price: "Fysiek en digitaal", status: "planned", label: "Gepland" },
        ],
      },
      {
        tag: "Fase 2 · Met een echt huisdier",
        name: "Het bedrijf",
        items: [
          { name: "AI-assistent voor de verzorging van het huisdier", price: "Abonnement vanaf € 3,99 per maand + tegoed bijkopen", status: "planned", label: "Gepland" },
          { name: "Partners voor huisdierverzekeringen", price: "Aanbiedingen die ouders zelf kiezen te bekijken, vergoeding per doorverwijzing", status: "planned", label: "Gepland" },
          { name: "Netwerk van partnerdierenartsen", price: "Afspraken en videoconsulten", status: "planned", label: "Gepland" },
          { name: "DNA-tests en partners uit de dierenspeciaalzaak", price: "Affiliate, later een eigen testkit", status: "planned", label: "Gepland" },
        ],
      },
      {
        tag: "Merk",
        name: "Curio en de serie",
        items: [
          { name: "Animatieserie Curio", price: "Seizoenssponsors", status: "live", label: "Pilot uit" },
          { name: "#walkyourpet", price: "Een beweging die alle kanalen voedt", status: "live", label: "Live" },
        ],
      },
    ],
    retention: "Een gezin dat na de challenge een dier in huis neemt, blijft 10 tot 15 jaar bij PetPrep, zolang het dier leeft, en niet maar 12 weken.",
    stageTag: "Stand van zaken",
    stage: "Vóór de lancering, in gesloten bèta op iOS en Android. De lancering in de App Store en Google Play volgt.",
  },
  team: {
    eyebrow: "Team",
    title: "De output van een studio. De kosten van één persoon.",
    founderName: "David Tacer, oprichter en CEO.",
    founder: "Leidt al 12 jaar zijn eigen softwarebedrijf (meer dan 400 projecten) en is oprichter van CHERR.IO (winnaar van FutureHack, Davos 2018). Hij bouwt PetPrep fulltime, samen met een team van AI-agenten voor code en content.",
    points: [
      "Elk feit heeft een bron en een citaat, gecontroleerd door een onafhankelijke beoordelaar.",
      "De gegevens van gezinnen blijven in de EU, kinderen loggen in zonder e-mail en de app bevat geen advertenties.",
      "Nachtelijke processen onderzoeken, controleren en publiceren nieuwe rassen en verzorgingspagina’s.",
    ],
  },
  webSummit: {
    title: "Ontmoet ons op Web Summit in Lissabon",
    text: "9 tot en met 12 november 2026. Het document, de presentatie, de dataroom en toegang tot de bèta delen we op verzoek.",
    watch: "Bekijk de serie",
  },
  contactTitle: "Neem contact op",
};

export default nl;
