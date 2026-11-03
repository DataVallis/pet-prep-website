import type { InvestorsCopy } from "./types";

const it: InvestorsCopy = {
  meta: {
    title: "PetPrep per gli investitori: un fondatore e un motore di contenuti per un prodotto da 15 anni",
    description:
      "Con PetPrep un bambino dimostra, in 12 settimane di simulazione realistica, di essere pronto per un animale domestico, e l’app accompagna la famiglia per tutta la vita dell’animale. Numeri in tempo reale, mappa dei ricavi e come richiedere il documento per gli investitori.",
  },
  eyebrow: "Per gli investitori",
  title: "Un fondatore e un motore di contenuti per un prodotto che le famiglie usano per 15 anni.",
  seriesTitle: "«12 Weeks»",
  lead: "Con PetPrep un bambino dimostra, in 12 settimane di simulazione realistica, di essere pronto per un animale domestico, e l’app accompagna la famiglia per tutta la vita dell’animale. Tutto ciò che la circonda, dalla nostra serie a una biblioteca di consigli in cui ogni informazione ha una fonte, serve a portare le famiglie da noi a costo quasi zero.",
  watch: "Guarda «12 Weeks» su YouTube",
  brief: "Richiedi il documento per gli investitori",
  heroStats: {
    breeds: "razze di cani e gatti con regole di cura basate su fonti",
    sources: "fonti di veterinari e club cinofili e felini",
    episodes: "episodi della nostra commedia familiare «12 Weeks»",
  },
  opportunity: {
    eyebrow: "L’opportunità",
    title: "Da una sfida di 12 settimane a un rapporto di 10-15 anni.",
    items: [
      { tag: "Problema", text: "I bambini promettono di prendersi cura di un animale; i genitori non hanno un modo neutrale per verificarlo prima di impegnare denaro e anni di cure." },
      { tag: "Soluzione", text: "Una simulazione realistica di 12 settimane, con un pannello per i genitori in tempo reale e un Care Score oggettivo, che si chiude con un Certificato di responsabilità." },
      { tag: "Espansione", text: "Quando l’animale vero arriva a casa, PetPrep diventa il suo assistente IA: dati del collare, primo contatto con il veterinario tramite IA, crescita e alimentazione, test del DNA, servizi dei partner." },
    ],
  },
  flywheel: {
    eyebrow: "Il circolo virtuoso",
    title: "I contenuti portano le famiglie. Gli animali veri le fanno restare per anni.",
    lead: "Ogni contenuto è un passo dello stesso ciclo, non un progetto a parte.",
    steps: [
      { title: "Motore di contenuti", text: "Serie, Curio, disegni da colorare e biblioteca di consigli, realizzati da un solo fondatore con agenti IA." },
      { title: "Le famiglie trovano PetPrep", text: "Attraverso ricerca, social e #walkyourpet, invece della pubblicità a pagamento." },
      { title: "Sfida di 12 settimane", text: "Il primo ricavo: 49,99 € per animale, una tantum.", highlight: true },
      { title: "Arriva un animale vero", text: "PetPrep diventa l’assistente IA della famiglia per la cura dell’animale per 10-15 anni." },
      { title: "Partner per la vita", text: "Assicurazioni, veterinari, alimentazione e test del DNA: offerte pensate per l’animale della famiglia, che i genitori scelgono di vedere." },
      { title: "I ricavi finanziano altri contenuti", text: "Sponsor e ricavi della fase 2 pagano la stagione successiva, e il ciclo ricomincia." },
    ],
  },
  engine: {
    eyebrow: "Motore di contenuti · numeri in tempo reale",
    title: "Quello che abbiamo realizzato finora",
    lead: "Ogni numero qui sotto si aggiorna da solo dal nostro registro, dalla base di conoscenza e dai nostri canali.",
    updated: "Aggiornato automaticamente dal nostro registro, dalla base di conoscenza e dai nostri canali.",
    cards: {
      breeds: { label: "Razze nel registro", note: (dogs, cats) => `${dogs} razze di cani e ${cats} di gatti, ogni notte se ne aggiungono di nuove` },
      sources: { label: "Fonti", note: "Veterinari, club di razza e studi, con citazioni" },
      episodes: { label: "Episodi di «12 Weeks»", note: (views) => (views ? `${views} visualizzazioni su YouTube` : "Su YouTube") },
      coloring: { label: "Disegni da colorare gratuiti", note: "Da stampare, in A4 e US Letter" },
      curio: { value: "Pilota", label: "Serie animata Curio", note: "Episodio pilota online su YouTube e TikTok" },
      foods: { label: "Alimenti spiegati", note: "Biblioteca di consigli, nuovi alimenti ogni notte" },
      languages: { label: "Lingue", note: "Sito e biblioteca di consigli" },
      vets: { label: "Paesi con elenco di veterinari", note: "Veterinari d’emergenza per paese" },
    },
    status: { live: "Online", building: "In costruzione", planned: "Previsto" },
    media: {
      playlist: "«12 Weeks»: la serie",
      channel: "Canale YouTube @petprep-si →",
      play: "Riproduci",
      all: "Tutti gli episodi (playlist)",
      episode: (n) => `Episodio ${n}`,
      consent: "Si riproduce da YouTube (youtube-nocookie.com): finché non clicchi non viene caricato nulla.",
      more: "Altro da guardare",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Il pilota della nostra commedia familiare senza parole" },
      curioAll: "Curio – tutti gli episodi",
      promo: { title: "PetPrep in 60 secondi", text: "Tuo figlio è pronto per un animale vero?" },
      curio: { title: "Conosci Curio", text: "La nostra mascotte e i suoi video brevi" },
      coloring: { title: "Disegni da colorare", text: "Gratuiti da stampare, ciascuno con un’informazione con fonte sulla cura degli animali" },
      walkthrough: { title: "Come funziona l’app", text: "La sfida di 12 settimane, passo dopo passo" },
    },
    closing: "Tutto questo è prodotto da un solo fondatore con agenti IA, senza un team di produzione né un’agenzia. Ogni contenuto riporta all’app.",
  },
  built: {
    eyebrow: "Già realizzato",
    title: "Un prodotto vero, non un prototipo",
    items: [
      "Motore di gioco lato server con sincronizzazione in tempo reale, testato su simulazioni di giornate intere, sui giorni del cambio d’ora e su casi limite delle famiglie.",
      "Famiglie con più genitori, più figli e animali condivisi, con una valutazione equa per ogni bambino.",
      "Animali IA fotorealistici con costi di IA misurati e limitati, e contenuti multimediali su server in affitto in Germania (Hetzner, UE).",
      "Esigenze degli animali basate su fonti citate di veterinari e club cinofili e felini, con ogni numero riconducibile alla sua fonte.",
      "Sicurezza dei minori fin dalla progettazione: accesso con PIN senza e-mail, dati ridotti al minimo, nessuna pubblicità, solo contenuti verificati.",
      "Gioco accessibile: gesti più semplici, lettori di schermo, le spinte della sedia a rotelle contano come passeggiate.",
    ],
  },
  revenue: {
    eyebrow: "Mappa dei ricavi",
    title: "La fase 1 paga l’acquisizione. La fase 2 è il business.",
    phases: [
      {
        tag: "Fase 1 · Prima dell’animale",
        name: "Paga l’acquisizione",
        items: [
          { name: "Sfida di 12 settimane", price: "49,99 € per animale, una tantum", status: "live", label: "Realizzato" },
          { name: "Desideri (oggetti per l’animale)", price: "Da 2,99 a 15,99 €, solo estetici", status: "live", label: "Realizzato" },
          { name: "Sponsorizzazione della serie", price: "Pacchetti per stagione", status: "building", label: "In corso" },
          { name: "Negozio: album da colorare, peluche di Curio, puzzle", price: "Fisici e digitali", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Fase 2 · Con un animale vero",
        name: "Il business",
        items: [
          { name: "Assistente IA per la cura dell’animale", price: "Abbonamento da 3,99 € al mese + ricariche", status: "planned", label: "Previsto" },
          { name: "Partner per l’assicurazione dell’animale", price: "Offerte che i genitori scelgono di vedere, compenso per ogni segnalazione", status: "planned", label: "Previsto" },
          { name: "Rete di veterinari partner", price: "Prenotazioni e teleconsulti", status: "planned", label: "Previsto" },
          { name: "Test del DNA e negozi per animali partner", price: "Affiliazione, in futuro un kit proprio", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Marchio",
        name: "Curio e la serie",
        items: [
          { name: "Serie animata Curio", price: "Sponsor di stagione", status: "live", label: "Pilota online" },
          { name: "#walkyourpet", price: "Un movimento che alimenta tutti i canali", status: "live", label: "Online" },
        ],
      },
    ],
    retention: "Una famiglia che adotta dopo la sfida resta con PetPrep per i 10-15 anni di vita dell’animale, non solo per 12 settimane.",
    stageTag: "Fase attuale",
    stage: "Prima del lancio, in beta chiusa su iOS e Android. Seguirà il lancio su App Store e Google Play.",
  },
  team: {
    eyebrow: "Team",
    title: "Il risultato di uno studio. Il costo di una persona.",
    founderName: "David Tacer, fondatore e CEO.",
    founder: "Da 12 anni guida la sua azienda di software (oltre 400 progetti), fondatore di CHERR.IO (vincitore di FutureHack, Davos 2018). Sviluppa PetPrep a tempo pieno con un team di agenti IA per il codice e i contenuti.",
    points: [
      "Ogni informazione ha una fonte e una citazione, verificate da un revisore indipendente.",
      "I dati delle famiglie restano nell’UE, i bambini accedono senza e-mail e l’app non ha pubblicità.",
      "Processi notturni ricercano, verificano e pubblicano nuove razze e nuove pagine di consigli.",
    ],
  },
  webSummit: {
    title: "Incontriamoci al Web Summit di Lisbona",
    text: "Dal 9 al 12 novembre 2026. Su richiesta condividiamo il documento, la presentazione, la data room e l’accesso alla beta.",
    watch: "Guarda la serie",
  },
  contactTitle: "Contattaci",
};

export default it;
