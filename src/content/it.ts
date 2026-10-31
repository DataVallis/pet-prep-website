import type { Dictionary } from "./types";

const it: Dictionary = {
  meta: {
    siteTitle: "PetPrep — Pronti per un animale. Al suo fianco per tutta la vita.",
    siteDescription:
      "PetPrep è un simulatore di animale domestico di 12 settimane che mostra ai genitori se il loro figlio è davvero pronto per un animale vero, e poi diventa un assistente IA per tutta la vita dell’animale reale.",
    slogan: "Pronti per un animale. Al suo fianco per tutta la vita.",
    keywords: [
      "mio figlio è pronto per un cane",
      "app per bambini sulla responsabilità verso gli animali",
      "simulatore di animale virtuale",
      "simulatore di animale domestico con IA",
      "prima di prendere un cane",
      "bambini e animali domestici",
      "test per capire se si è pronti per un animale",
      "pannello per i genitori",
      "provare una razza di cane prima dell’acquisto",
      "quale razza di cane fa per me",
    ],
  },
  nav: { home: "Home", menu: "Menu", close: "Chiudi menu", skip: "Vai al contenuto" },
  lang: { label: "Lingua", switchTo: "Cambia lingua" },
  cta: {
    primary: "Inizia gratis con un cane meticcio",
    secondary: "Scopri come funziona",
    earlyAccess: "Richiedi l’accesso anticipato",
    earlyAccessSubject: "Accesso anticipato a PetPrep",
    ios: "Scaricala per iPhone",
    android: "Scaricala per Android",
    comingSoon: "In arrivo su iPhone e Android",
    readMore: "Leggi di più",
    contactUs: "Contattaci",
  },
  common: {
    planned: "In programma",
    plannedNote:
      "Questa pagina descrive ciò che stiamo sviluppando. Non è ancora disponibile nell’app e i dettagli potrebbero cambiare.",
    legalDraft:
      "Stiamo definendo questo testo con i nostri consulenti legali prima del lancio pubblico. Contattaci se qualcosa non è chiaro.",
    lastUpdated: "Ultimo aggiornamento",
    breadcrumbHome: "Home",
    screensNote: "Le schermate dell’app mostrate su questo sito sono anteprime del prodotto; l’app definitiva potrebbe essere leggermente diversa.",
    perPet: "per animale",
    free: "Gratis",
    forever: "per sempre",
    notFoundTitle: "Questa pagina è scappata dal guinzaglio.",
    notFoundText: "La pagina che cerchi non esiste o è stata spostata.",
    notFoundCta: "Torna alla home page",
  },
  footer: {
    tagline: "Pronti per un animale. Al suo fianco per tutta la vita.",
    groups: [
      { title: "Prodotto", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Azienda", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Fiducia", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Tutti i diritti riservati.",
    dataEu: "Dati conservati nell’UE.",
    languages: "Presto altre lingue.",
    company: "PetPrep è un prodotto di",
    cookieSettings: "Impostazioni dei cookie",
    a11yBadge: { title: "Gioco accessibile", text: "Gesti più semplici · Lettori di schermo · Meno movimento" },
  },
  screens: {
    pin: "Accesso del bambino con un codice di 6 cifre fornito dal genitore: niente email, niente password.",
    contract: "Il Contratto di responsabilità, firmato con un dito. La firma dà vita all’animale.",
    hud: "La schermata principale del bambino: lo stato dell’animale in tempo reale, quattro bisogni e i pulsanti per prendersene cura.",
    picker: "I genitori scelgono l’animale: razza, provenienza (adottato o da un allevatore) ed età all’arrivo.",
    parent: "Il pannello per i genitori: un semaforo, il Care Score e le routine di oggi per ogni bambino.",
    report: "Il resoconto di un bambino per 7, 30 o 84 giorni: routine, passeggiate e compiti saltati, giorno per giorno.",
    assistant: "Quando arriva a casa: l’assistente IA trasforma i dati del collare in un unico suggerimento chiaro.",
    certificate: "Dopo 12 settimane: il Certificato di responsabilità con il Care Score del bambino.",
  },
  pricingPlans: {
    free: {
      name: "Cane meticcio",
      text: "La simulazione completa con un cane meticcio realistico.",
      features: [
        "Simulazione di 12 settimane con conseguenze reali",
        "Passeggiate vere, contate in passi veri dal telefono",
        "Pannello per i genitori, semaforo e Care Score",
        "Ore di silenzio e pulsante di pausa",
        "Immagine fotorealistica del tuo animale e brevi video",
      ],
      cta: "Inizia gratis",
    },
    challenge: {
      name: "La sfida PetPrep di 12 settimane",
      badge: "12 settimane + certificato",
      unit: "per animale · 12 settimane",
      text: "Per le famiglie che vogliono l’esperienza completa e un certificato alla fine.",
      features: [
        "Tutto ciò che include Cane meticcio",
        "Razze impegnative, come il [border collie](breed:border_collie)",
        "Gli stati d’animo del tuo animale in video creati con l’IA",
        "Certificato di responsabilità",
        "Un solo prezzo quando i fratelli condividono un animale",
        "Accesso per entrambi i genitori",
      ],
      cta: "Scegli la sfida",
    },
    note:
      "Gli acquisti si effettuano nell’app tramite App Store o Google Play. Un secondo animale nella stessa famiglia è una sfida a parte. I prezzi includono l’IVA, ove applicabile.",
  },
  earlyAccess: {
    title: "Richiedi l’accesso anticipato",
    text: "Sii tra le prime famiglie a provare PetPrep. Ti scriveremo quando sarà pronta, e nient’altro.",
    label: "Il tuo indirizzo email",
    placeholder: "tu@esempio.it",
    button: "Richiedi l’accesso anticipato",
    sending: "Invio in corso…",
    successTitle: "Sei nella lista.",
    successText: "Grazie! Sarai tra i primi a ricevere una nostra email quando PetPrep sarà pronta.",
    invalid: "Inserisci un indirizzo email valido.",
    error: "Qualcosa è andato storto. Riprova tra un momento.",
    consent: "Iscrivendoti accetti di ricevere email su PetPrep. Puoi annullare l’iscrizione in qualsiasi momento.",
    privacyLink: "Informativa sulla privacy",
  },
  contactCards: [
    { title: "Famiglie", text: "Domande sull’app, sul tuo account o sulla sfida.", email: "hello" },
    { title: "Privacy", text: "Accesso ai dati, esportazione, cancellazione o qualsiasi domanda sulla privacy.", email: "privacy" },
    { title: "Partner", text: "Negozi di animali, rifugi, veterinari, educatori cinofili, assicurazioni e scuole.", email: "partners" },
    { title: "Investitori", text: "Sintesi per gli investitori, deck e data room su richiesta.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep — Tuo figlio è pronto per un animale? Scoprilo in 12 settimane.",
      description:
        "Prima che a casa arrivi un animale vero, tuo figlio si prende cura per 12 settimane di un animale IA realistico: pasti, pulizia, passeggiate vere. Ogni giorno vedi se è davvero pronto.",
    },
    hero: {
      eyebrow: "La sfida PetPrep di 12 settimane",
      title: "Pronti per un animale. Al suo fianco per tutta la vita.",
      lead:
        "Prima che a casa arrivi un animale vero, tuo figlio si prende cura per 12 settimane di un animale IA realistico: gli dà da mangiare, pulisce e fa passeggiate vere. Ogni giorno vedi se è davvero pronto.",
      trust: ["Cane meticcio gratis per sempre", "Niente pubblicità, niente chat con sconosciuti", "Nessuna email per i bambini"],
    },
    phone: {
      petName: "Luna",
      petAge: "Cucciola · 3 mesi",
      live: "LIVE",
      video: "Video fotorealistico dell’animale creato con l’IA",
      actions: ["Cibo", "Acqua", "Passeggiata", "Pulisci"],
    },
    parentCard: { child: "Giulia", status: "Tutto bene", scoreLabel: "Care Score", progress: "Settimana 3 di 12 · 31 routine su 36 in orario" },
    notification: { app: "PetPrep", text: "Il tuo animale sta guardando la ciotola. La colazione finisce alle 9:00." },
    promoVideo: {
      eyebrow: "PetPrep in un minuto",
      title: "Guarda come funziona.",
      text: "Dalla scelta dell’animale e dalla firma del contratto fino alla scuola, alle passeggiate, alla toelettatura e al certificato: tutto ciò che tuo figlio fa in 12 settimane e tutto ciò che vedi nel pannello. Curio, la nostra mascotte, passa solo a salutare; l’animale nell’app è un cane IA realistico.",
      alt: "Video promozionale di PetPrep: schermate dell’app, un bambino che si prende cura di un cane, un genitore che segue il Care Score.",
      note: "Il video è in inglese. L’app non è ancora disponibile al pubblico su App Store e Google Play: iscriviti per l’accesso anticipato.",
    },
    promise: {
      quote: "Ogni famiglia si sente dire: «Prometto che me ne occuperò io». PetPrep trasforma la promessa in una",
      highlight: "prova",
      text:
        "Fallire nella simulazione è un successo per la tua famiglia: lo scopri prima che un animale vero ne soffra, e prima di impegnarti in anni di cure e spese.",
    },
    how: {
      eyebrow: "Come funziona",
      title: "Da «ti prego» a «sono pronto» in tre passi.",
      steps: [
        {
          title: "Tu scegli l’animale",
          text: "Crea un account per la famiglia, aggiungi tuo figlio solo con un soprannome e scegli l’animale: razza, adottato o da un allevatore, cucciolo o anziano.",
        },
        {
          title: "Tuo figlio firma la promessa",
          text: "Tuo figlio accede con un codice di 6 cifre: niente email, niente password. Firma il Contratto di responsabilità con un dito e nasce il suo animale, unico al mondo.",
        },
        {
          title: "12 settimane di cure vere",
          text: "Una settimana reale equivale a un mese di vita dell’animale. Alla fine: un Certificato di responsabilità con il Care Score, una prova oggettiva, oppure un no sincero.",
        },
      ],
      link: "Come funziona nel dettaglio",
    },
    realism: {
      title: "Il più vicino possibile a un animale vero, per un’app.",
      text: "Orari dei pasti, passeggiate e crescita si basano su fonti come le associazioni veterinarie e gli enti cinofili, non inventati per un gioco.",
      items: [
        { title: "Passeggiate vere, passi veri", text: "La passeggiata quotidiana conta i passi dal telefono di tuo figlio. Oggi nessuna passeggiata? L’animale ne risente domani." },
        { title: "Cresce", text: "Un cucciolo mangia quattro volte al giorno, poi tre, poi due, e crescendo riceve una nuova foto." },
        { title: "Si comporta come un animale vero", text: "I cuccioli devono uscire. I cani annoiati masticano le pantofole. I bisogni arrivano prima della cena." },
        { title: "Rispetta scuola e sonno", text: "Le ore di silenzio sospendono i promemoria. Un pasto che cade durante la scuola spetta a te, non a tuo figlio." },
        { title: "Conseguenze vere, con delicatezza", text: "La trascuratezza porta a una visita dal veterinario o al rifugio: mai niente che faccia paura, sempre con un nuovo inizio." },
        { title: "Unico al mondo", text: "Ogni animale ha il suo mantello, le sue macchie e i suoi occhi: fotorealistico e mai uguale a un altro." },
      ],
    },
    parents: {
      eyebrow: "Per i genitori",
      title: "Vedi la verità, in tempo reale.",
      text: "Un semaforo chiaro per ogni bambino, un Care Score basato sulle routine svolte in orario e una cronologia di chi ha fatto cosa. I fratelli che condividono un animale hanno ciascuno il proprio punteggio equo.",
      points: [
        { strong: "Ore di silenzio e pulsante di pausa", text: "il controllo resta a te." },
        { strong: "I bambini accedono con un codice", text: "niente email, niente cognome, niente pubblicità." },
        { strong: "Entrambi i genitori, tutti i figli", text: "una famiglia, un’unica vista." },
      ],
      link: "Tutto ciò che vedono i genitori",
    },
    adults: {
      eyebrow: "Per gli adulti",
      title: "Prova la razza prima di portarla a casa.",
      text: "Ti sei innamorato di una razza in particolare? PetPrep non è solo per i bambini. Per 12 settimane ti prendi cura di un animale IA di quella razza, con i suoi veri bisogni quotidiani, e scopri se fa davvero per te, prima di comprarlo o adottarlo.",
      points: [
        {
          strong: "I veri bisogni della razza",
          text: "pasti in fasce orarie, acqua, pulizia e un obiettivo quotidiano di passi basato sul fabbisogno di movimento documentato dalle fonti: un border collie adulto ha bisogno di 12.000 passi al giorno, un meticcio di 6.000.",
        },
        {
          strong: "Addestramento e incidenti da cucciolo",
          text: "una breve sessione di addestramento ogni giorno e un cucciolo che riesce a trattenersi solo per circa un’ora per ogni mese di età prima di dover uscire, altrimenti c’è una pozza sul pavimento.",
        },
        {
          strong: "12 settimane mostrano se si adatta alla tua vita",
          text: "ai tuoi giorni di lavoro, al tuo tempo libero e al meteo. Visto che sarà il cane di famiglia, puoi aggiungere in seguito il partner o i figli.",
        },
      ],
      how: "Come iniziare: crea un account come genitore, aggiungi te stesso come profilo di chi si prende cura dell’animale e accedi con il codice di 6 cifre, sullo stesso telefono o su un altro.",
      note: "Già disponibili: il cane meticcio e il gatto domestico gratuiti, e tutte le razze di cani e gatti del [registro degli animali](page:animals) nella sfida di 12 settimane.",
      link: "Come usare PetPrep da solo",
    },
    after: {
      eyebrow: "Quando arriva a casa",
      title: "Quando arriva l’animale vero, PetPrep resta.",
      text: "Tocca «Abbiamo un animale vero» e il simulatore diventa un assistente IA per gli anni a venire, che conosce già il ritmo della tua famiglia.",
      features: [
        { title: "Collare smart", text: "Attività e avvisi quando qualcosa non va." },
        { title: "Primo contatto con l’IA", text: "Risponde subito, poi ti indirizza a un veterinario vero." },
        { title: "Crescita e alimentazione", text: "Peso settimanale, curva di crescita, quando cambiare cibo." },
        { title: "Partner affidabili", text: "Veterinari, educatori cinofili e assicurazioni vicino a te, sempre chiaramente indicati." },
        { title: "Test del DNA", text: "Quali razze ci sono nel tuo meticcio e a cosa fare attenzione." },
        { title: "Scheda per il veterinario", text: "Mix di razze e risultati del DNA in un unico posto, pronti per il veterinario." },
      ],
      link: "Informazioni sull’assistente IA",
      planned: "In sviluppo",
    },
    species: {
      title: "Oggi cani e gatti. Presto altre specie.",
      text: "Pensato per le famiglie di tutto il mondo, nella loro lingua.",
      chips: [
        { label: "Cane · disponibile", active: true, link: "species:dog" },
        { label: "Gatto · disponibile", active: true, link: "species:cat" },
        { label: "Razze di cani e gatti · nella sfida", link: "page:animals" },
        { label: "Altre specie · in programma", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Prezzi", title: "Prezzi semplici ed equi." },
    faq: { title: "Le domande dei genitori", link: "Tutte le domande" },
    final: { title: "Pronti per un animale?", text: "Scoprilo in 12 settimane. Inizia gratis, su iPhone o Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Come funziona PetPrep — una sfida di 12 settimane per capire se si è pronti per un animale",
        description:
          "Come funziona la sfida PetPrep di 12 settimane: la scelta dell’animale, il Contratto di responsabilità, le cure quotidiane, le passeggiate vere, le ore di silenzio e il certificato.",
      },
      eyebrow: "Come funziona",
      title: "Dodici settimane che mostrano quanto vale una promessa.",
      lead:
        "Tuo figlio si prende cura di un animale IA fotorealistico che si comporta come uno vero, per quanto possa farlo un’app. Una settimana reale equivale a un mese di vita dell’animale, così in 12 settimane l’animale cresce e tu vedi se le cure reggono.",
      blocks: [
        {
          type: "steps",
          heading: "Dal primo tocco al certificato",
          items: [
            { title: "Il genitore crea la famiglia", text: "Ti registri con la tua email (l’accesso con Apple e Google è in arrivo). Aggiungi ogni figlio con un soprannome e, se vuoi, l’anno di nascita. È tutto ciò che chiediamo su tuo figlio." },
            { title: "Tu scegli l’animale", text: "Scegli la razza (il meticcio è gratis), la provenienza dell’animale – adottato da un rifugio o comprato da un allevatore – e la sua età all’arrivo: cucciolo, giovane, adulto o anziano." },
            { title: "Tuo figlio accede con un codice", text: "Ricevi un codice di 6 cifre valido per 15 minuti. Tuo figlio lo digita sul suo telefono: niente email e niente password. Telefono perso? Lo disconnetti da tutti i dispositivi con un tocco." },
            { title: "Il Contratto di responsabilità", text: "Tuo figlio firma una promessa con un dito. La firma è la nascita dell’animale: i bisogni iniziano a contare da quel momento, quindi non si perde nulla se firma più tardi." },
            { title: "Dodici settimane di cure", text: "Pasti nelle giuste fasce orarie, acqua fresca, pulizia e una passeggiata quotidiana con passi veri. Man mano che l’animale cresce, i suoi bisogni cambiano." },
            { title: "Il certificato", text: "Dopo 12 settimane l’animale compie un anno. Tuo figlio riceve un Certificato di responsabilità con il suo Care Score, oppure scoprite insieme, senza rischi, che non è ancora il momento." },
          ],
        },
        {
          type: "screens",
          heading: "Cosa vede tuo figlio",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Di cosa ha bisogno ogni giorno un cane meticcio adulto",
          intro: "I numeri provengono da fonti veterinarie e cinofile; dove le fonti indicano solo un intervallo, PetPrep fissa il valore e lo dichiara.",
          head: ["Bisogno", "Quanto spesso", "Se viene dimenticato"],
          rows: [
            ["Cibo", "Mattina (6–10) e sera (17–21), una volta per fascia", "Ha fame dopo circa 12,5 ore"],
            ["Acqua", "3 volte al giorno, ad almeno 3 ore di distanza", "Ha sete dopo circa 10 ore"],
            ["Passeggiata", "6.000 passi veri (i cuccioli partono da 2.000)", "Nessuna passeggiata → malato la mattina dopo"],
            ["Pulizia", "Quando l’animale fa i bisogni, mai durante le ore di silenzio", "Niente cibo né acqua finché non è pulito"],
          ],
          note: "I cuccioli mangiano 4, poi 3, poi 2 volte al giorno e riescono a trattenersi solo per circa un’ora per ogni mese di età. Un [border collie](breed:border_collie) ha bisogno di 12.000 passi e ha fame prima.",
        },
        {
          type: "cards",
          heading: "Pensato per la vita vera di una famiglia",
          columns: 3,
          items: [
            { title: "Ore di silenzio", text: "Imposta gli orari di scuola e sonno. L’animale rallenta, non vengono inviati promemoria e in quelle ore non fa mai i bisogni." },
            { title: "Pasti durante la scuola", text: "Una fascia dei pasti che cade interamente nelle ore di silenzio spetta al genitore: non conta mai contro tuo figlio." },
            { title: "Pausa in qualsiasi momento", text: "Un pulsante mette in pausa il gioco, per esempio per una chiacchierata in famiglia. Durante la pausa non peggiora nulla." },
            { title: "Promemoria gentili", text: "L’animale prima richiama tuo figlio con dolcezza, poi con urgenza. Solo se un bisogno resta a zero per un’ora ricevi un allarme." },
            { title: "Conseguenze vere", text: "La trascuratezza significa 12 ore dal veterinario. Un giorno intero di trascuratezza significa che il rifugio si prende l’animale, e puoi ricominciare." },
            { title: "Animali condivisi", text: "I fratelli possono condividere un animale. Ogni azione viene attribuita al bambino che l’ha fatta, così il punteggio resta equo." },
          ],
        },
        {
          type: "callout",
          title: "Anche fallire è un risultato.",
          text: "Se l’animale finisce nel rifugio virtuale, avete imparato qualcosa di prezioso, prima che a pagarne il prezzo fosse un animale vero. Puoi ricominciare, anche con una razza più facile.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Per i genitori — il pannello di PetPrep, il Care Score e i controlli",
        description:
          "Cosa vedono i genitori in PetPrep: un semaforo quotidiano per ogni bambino, il Care Score, le routine, i resoconti, le notifiche, le ore di silenzio, la pausa e la privacy fin dalla progettazione.",
      },
      eyebrow: "Per i genitori",
      title: "Una prova oggettiva, non un’altra promessa.",
      lead:
        "Non dovrai indovinare se le passeggiate ci sono state davvero. PetPrep misura le cure rispetto a routine quotidiane chiare e ti mostra, bambino per bambino, come sta andando.",
      blocks: [
        {
          type: "cards",
          heading: "Il semaforo",
          intro: "Ogni bambino e ogni animale ricevono un colore per la giornata di oggi, nell’ora locale della tua famiglia, sempre con il motivo spiegato a parole.",
          columns: 3,
          items: [
            { title: "Verde — tutto bene", text: "Le routine procedono regolarmente.", tag: "ok" },
            { title: "Giallo — serve attenzione", text: "Oggi sono state saltate più di due routine.", tag: "warn" },
            { title: "Rosso — urgente", text: "Oggi l’animale si è ammalato, un bisogno è a zero da più di un’ora oppure l’animale è finito al rifugio.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Il Care Score",
          paragraphs: [
            "Care Score = routine svolte in orario ÷ routine previste × 100, meno 10 punti per ogni malattia, tra 0 e 100.",
            "Una routine è un compito concreto: ogni fascia dei pasti, ciascuno dei tre rabbocchi d’acqua, la pulizia di ogni bisogno entro due ore (scuola e sonno non contano) e il raggiungimento dell’obiettivo quotidiano della passeggiata.",
            "Il tempo in cui hai messo in pausa il gioco, l’animale era dal veterinario o il contratto non era ancora firmato non conta mai contro tuo figlio. I giorni passati vengono congelati, quindi un punteggio non può essere riscritto in seguito.",
            "I fratelli che condividono un animale si dividono equamente ogni routine. Contano solo le azioni del singolo bambino: se uno fa tutto, ottiene 100 e l’altro 0.",
          ],
        },
        {
          type: "screens",
          heading: "La tua vista",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Il controllo resta a te",
          items: [
            "Ore di silenzio per scuola e sonno, nella tua ora locale, anche con il passaggio all’ora legale e all’ora solare.",
            "Metti in pausa il gioco di qualsiasi animale con un solo tocco confermato; lo schermo di tuo figlio si blocca in tempo reale.",
            "Invita l’altro genitore con un codice monouso: vedrete entrambi ogni figlio e ogni animale.",
            "Disconnetti un bambino da tutti i dispositivi se perde il telefono; i codici sono monouso e scadono dopo 15 minuti.",
            "Esporta tutti i dati della tua famiglia in un file, oppure elimina all’istante dall’app il profilo di un bambino o l’intero account.",
          ],
        },
        {
          type: "list",
          heading: "Privacy fin dalla progettazione",
          items: [
            "I bambini accedono con un codice: niente email, niente password, niente cognome.",
            "Conserviamo un soprannome e, se lo aggiungi, l’anno di nascita. Nient’altro su tuo figlio.",
            "Le notifiche non contengono mai il nome di tuo figlio o dell’animale, perché possono comparire sulla schermata di blocco.",
            "I passi provengono da Apple Salute (iPhone) o Health Connect (Android), se lo consenti (in sola lettura), e dal sensore di movimento del telefono, dove disponibile. PetPrep non usa il GPS e non traccia la posizione.",
            "Niente pubblicità, niente chat con sconosciuti, server nell’UE.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Quando arriva a casa — l’assistente IA di PetPrep per il tuo animale vero",
        description:
          "Quando la tua famiglia prende un animale vero, PetPrep diventa un assistente IA: attività dal collare smart, avvisi, primo contatto con l’IA e poi con un veterinario vero, crescita e alimentazione.",
      },
      eyebrow: "Quando arriva a casa",
      title: "La simulazione finisce. Le cure no.",
      lead:
        "Quando la tua famiglia porta a casa un animale vero, con un tocco PetPrep diventa un assistente per tutta la vita dell’animale: in tempo reale, senza barre della salute e già abituato alla routine della tua famiglia.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Cosa farà l’assistente",
          columns: 2,
          items: [
            { title: "Integrazione con i collari smart", text: "Collega i più diffusi localizzatori GPS e di attività, oppure un collare PetPrep, e vedi l’attività nel suo contesto." },
            { title: "Avvisi che spiegano", text: "«Oggi Max ha corso 2 km, la metà del solito, e ha mangiato un pasto più abbondante. Una passeggiata in più stasera lo aiuterà a calmarsi». Un’osservazione, un motivo, un suggerimento." },
            { title: "Prima l’IA, poi un veterinario vero", text: "Fai una domanda o carica una foto. L’assistente risponde alle domande generali, valuta l’urgenza e, quando serve, ti indirizza a un veterinario vero; con sintomi urgenti si va direttamente dal veterinario." },
            { title: "Test del DNA per il tuo cane o gatto", text: "Ordina un test del DNA nell’app o carica il risultato di uno che hai già. PetPrep mostra quali razze ci sono nel mix, cosa è tipico per loro e quali problemi di salute sono più comuni in quelle razze, con le fonti. Le percentuali di razza non sono una diagnosi e un test del DNA non rivela le allergie." },
            { title: "Una scheda per il veterinario", text: "Il mix di razze ed eventuali risultati diretti del DNA su un’unica pagina o in un codice QR, così il tuo veterinario sa subito cosa c’è in un meticcio." },
            { title: "Crescita e alimentazione", text: "Registra il peso ogni settimana, guarda la curva di crescita e ricevi un promemoria quando è il momento di cambiare cibo." },
          ],
        },
        {
          type: "screens",
          heading: "Un’anteprima",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principi su cui non scenderemo a compromessi",
          items: [
            "L’assistente IA non è un veterinario e non fa mai diagnosi. Ogni risposta sulla salute include un modo per contattare un veterinario vero.",
            "Le offerte dei partner (negozi, assicurazioni, educatori cinofili, veterinari) sono sempre indicate come tali, e dichiariamo quando riceviamo una commissione.",
            "Nulla viene condiviso con un partner senza il tuo consenso.",
            "I dati di tuo figlio raccolti durante la sfida passano all’assistente solo se sei d’accordo.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Prezzi — PetPrep è gratis per iniziare, 49,99 € per la sfida di 12 settimane",
        description:
          "Il cane meticcio è gratis per sempre. La sfida PetPrep di 12 settimane costa 49,99 € per animale, con un acquisto una tantum. Un solo prezzo per i fratelli che condividono un animale.",
      },
      eyebrow: "Prezzi",
      title: "Prezzi semplici ed equi.",
      lead: "Inizia gratis con un cane meticcio. Acquista la sfida completa di 12 settimane quando sei pronto: le 12 settimane iniziano con l’acquisto.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Desideri — oggetti per il tuo animale",
          intro:
            "Nell’app tuo figlio chiede oggetti per il suo animale; tu decidi e li compri. Tuo figlio non vede mai un prezzo. Gli oggetti sono solo estetici: non cambiano mai i bisogni, il Care Score o il certificato. Disponibili anche per il cane meticcio e il gatto domestico gratuiti.",
          head: ["Oggetto", "Prezzo"],
          rows: [
            ["Cuccia (gatto: cestino)", "5,99 €"],
            ["Ciotole per cibo e acqua", "5,99 €"],
            ["Gioco (cane: corda o gioco che squittisce; gatto: topolino di peluche o canna con piume)", "5,99 € per gioco"],
            ["Premi, confezione da 10", "2,99 €"],
            ["Kit di benvenuto: cuccia + ciotole + gioco", "15,99 € (invece di 17,97 €)"],
          ],
          note: "I Desideri arrivano con il prossimo aggiornamento dell’app; si potranno acquistare non appena gli oggetti saranno disponibili su App Store e Google Play. I prezzi si riferiscono alla Slovenia; lo store mostra il prezzo per il tuo Paese.",
        },
        {
          type: "faq",
          heading: "Domande sui prezzi",
          items: [
            { q: "La versione gratuita è davvero gratuita?", a: "Sì. Il cane meticcio è gratis per sempre, con la simulazione completa, le passeggiate vere e il pannello per i genitori." },
            { q: "Cosa include la sfida?", a: "Razze impegnative come il [border collie](breed:border_collie), gli stati d’animo del tuo animale in video creati con l’IA, il Certificato di responsabilità alla fine e l’accesso per entrambi i genitori." },
            { q: "I fratelli pagano due volte?", a: "No. I bambini che condividono un animale pagano un solo prezzo. Un secondo animale in famiglia è una sfida a parte." },
            { q: "Come si paga?", a: "Nell’app, tramite App Store o Google Play. I rimborsi sono gestiti dal tuo account dello store." },
            { q: "Cosa sono i Desideri? Mio figlio può comprare qualcosa da solo?", a: "Tuo figlio può chiedere una cuccia, le ciotole, un gioco o dei premi per il suo animale, con al massimo tre richieste aperte alla volta. Ricevi una notifica e decidi se comprarlo o scegliere «Non ora». Tuo figlio non vede mai i prezzi e non può comprare nulla nell’app per bambini." },
            { q: "Gli oggetti acquistati rendono il gioco più facile?", a: "No. Gli oggetti sono solo estetici. Non cambiano mai i bisogni, il Care Score o il certificato, e nei Desideri non ci sono veterinari né medicine: mai «paga per salvare il tuo animale»." },
            { q: "Vale lo stesso per gli adulti?", a: "Sì. Se usi PetPrep da solo per provare una razza, vale lo stesso: il meticcio è gratis per sempre e la sfida di 12 settimane costa 49,99 € per animale." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Domande frequenti — le domande dei genitori su PetPrep",
        description:
          "Risposte su PetPrep: tempo quotidiano, uso da parte degli adulti, privacy e posizione, passi, fratelli, cosa succede se un bambino fallisce, lingue, specie, animali veri.",
      },
      eyebrow: "Domande frequenti",
      title: "Le domande dei genitori.",
      lead: "Risposte brevi e sincere. Manca qualcosa? Scrivici.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Per che età è PetPrep?", a: "È pensato per bambini di circa 7–12 anni e funziona bene fino ai 16. Lo usano anche gli adulti, per capire se una certa razza fa davvero per loro prima di comprarla o adottarla." },
            { q: "Posso usare PetPrep da solo, senza bambini?", a: "Sì. Crea un account come genitore e aggiungi te stesso come profilo di chi si prende cura dell’animale: basta un soprannome, lascia vuoto l’anno di nascita. Scegli la razza, crea un codice di 6 cifre, poi sullo stesso telefono o su un altro scegli «Sono un bambino» e digita il codice: così diventi tu chi se ne prende cura. Visto che sarà il cane di famiglia, puoi aggiungere in seguito il partner o i figli, così ve ne occupate insieme. Il prezzo è lo stesso delle famiglie." },
            { q: "Quanto tempo richiede ogni giorno?", a: "Pochi minuti per cibo, acqua e pulizia, più la passeggiata di cui avrebbe comunque bisogno un cane vero." },
            { q: "L’app traccia la posizione di mio figlio?", a: "No. Per le passeggiate conta solo i passi. Se lo consenti, li legge da Apple Salute (iPhone) o Health Connect (Android), in sola lettura e solo i passi; dove disponibile usa anche il sensore di movimento del telefono. Chiede il permesso nella schermata della passeggiata. Il GPS non viene usato." },
            { q: "Mio figlio ha bisogno di un indirizzo email?", a: "No. Sei tu a creare l’account; tuo figlio accede con un codice di 6 cifre che generi tu. Conserviamo solo un soprannome e, se vuoi, l’anno di nascita." },
            { q: "Cosa succede se mio figlio si dimentica?", a: "L’animale prima invia promemoria gentili. Se un bisogno resta a zero, l’animale si ammala e passa 12 ore dal veterinario. Dopo un giorno intero senza cure, il rifugio virtuale se lo prende, e potete ricominciare." },
            { q: "I fratelli possono condividere un animale?", a: "Sì. Ogni bambino firma il proprio contratto, ogni azione viene attribuita a chi l’ha fatta e ciascuno ottiene il proprio Care Score equo." },
            { q: "E la scuola e l’ora di andare a letto?", a: "Imposta le ore di silenzio. L’animale rallenta, non viene inviato nulla e i pasti che cadono interamente nelle ore di silenzio spettano a te." },
            { q: "Fa paura ai bambini?", a: "No. Le conseguenze sono vere ma delicate: l’animale va dal veterinario o al rifugio, mai niente di cruento, e c’è sempre un nuovo inizio." },
            { q: "Quali animali sono disponibili?", a: "Oggi [cani](species:dog) e [gatti](species:cat): un cane meticcio e un gatto domestico gratuiti e, nella sfida di 12 settimane, tutte le razze del [registro degli animali](page:animals), che riporta anche i loro bisogni con le fonti. Sono in programma altre specie." },
            { q: "In quali lingue?", a: "Oggi l’app è in inglese e sloveno. Arriveranno altre lingue man mano che PetPrep verrà lanciata in nuovi Paesi." },
            { q: "Cosa succede quando prendiamo un animale vero?", a: "PetPrep può diventare un assistente IA per il tuo animale vero. Questa parte è in sviluppo." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partner — collabora con PetPrep",
        description:
          "PetPrep collabora con negozi di animali, rifugi, veterinari, educatori cinofili, assicurazioni, produttori di collari e scuole per aiutare le famiglie a prendere un animale in modo responsabile.",
      },
      eyebrow: "Partner",
      title: "Famiglie più preparate, per chiunque abbia a cuore gli animali.",
      lead:
        "Le famiglie che completano PetPrep sanno cosa richiede davvero un animale. Stiamo costruendo una rete di partner che le incontri al momento giusto, sempre chiaramente indicata e sempre con il consenso della famiglia.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Con chi collaboriamo",
          columns: 3,
          items: [
            { title: "Negozi di animali", text: "Raggiungi le famiglie nel momento in cui dimostrano di essere pronte, per esempio con un’offerta per il kit iniziale insieme al certificato." },
            { title: "Rifugi, associazioni e allevatori", text: "Consiglia PetPrep prima dell’adozione o dell’acquisto, per avere meno decisioni impulsive e meno restituzioni." },
            { title: "Veterinari", text: "Quando l’animale vero arriva a casa, l’assistente IA risponde alle prime domande e indirizza i proprietari a te, con un riepilogo del caso condiviso solo con il consenso." },
            { title: "Educatori cinofili e scuole per cani", text: "Consigli e prenotazioni quando una famiglia passa a un cane vero." },
            { title: "Assicurazioni per animali", text: "Offerte che tengono conto della razza quando viene registrato un animale vero, chiaramente indicate." },
            { title: "Produttori di collari e IoT", text: "Integrazione dei dati di attività per avvisi più intelligenti e spiegati." },
          ],
        },
        {
          type: "list",
          heading: "Perché i partner si fidano di noi",
          items: [
            "I bambini accedono senza email e riduciamo al minimo i loro dati, su server nell’UE.",
            "Sullo schermo di un bambino arrivano solo contenuti verificati; non c’è pubblicità.",
            "Ogni offerta dei partner è indicata come tale e ogni commissione viene dichiarata alla famiglia.",
          ],
        },
        { type: "callout", title: "Parliamone.", text: "Stiamo preparando le condizioni di collaborazione. Dicci chi sei e cosa hai in mente.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investi in PetPrep — dalla preparazione all’animale alle cure per tutta la vita",
        description:
          "PetPrep trasforma la promessa di un bambino in una prova prima che la famiglia prenda un animale, poi diventa un assistente IA per tutta la sua vita. Pre-lancio; presentazione su richiesta.",
      },
      eyebrow: "Investitori",
      title: "Da una sfida di 12 settimane a un rapporto di 10–15 anni.",
      lead:
        "PetPrep offre ai genitori una prova oggettiva del fatto che il loro figlio sia pronto o meno per un animale vero, e poi resta accanto alla famiglia per tutta la vita dell’animale.",
      blocks: [
        {
          type: "cards",
          heading: "L’opportunità",
          columns: 3,
          items: [
            { title: "Problema", text: "I bambini promettono di prendersi cura di un animale; i genitori non hanno un modo neutrale per metterli alla prova prima di impegnare soldi e anni di cure." },
            { title: "Soluzione", text: "Una simulazione realistica di 12 settimane con un pannello per i genitori in tempo reale e un Care Score oggettivo, che si conclude con un Certificato di responsabilità." },
            { title: "Espansione", text: "Quando l’animale vero arriva a casa, un assistente IA dedicato: dati del collare, primo contatto con l’IA e poi con il veterinario, crescita e alimentazione, test del DNA, servizi dei partner." },
          ],
        },
        {
          type: "table",
          heading: "Modello di business",
          head: ["Fonte di ricavo", "Modello", "Stato"],
          rows: [
            ["Cane meticcio", "Gratis per sempre (acquisizione)", "Deciso"],
            ["Sfida PetPrep di 12 settimane", "49,99 € per animale, acquisto una tantum", "Deciso"],
            ["Desideri — oggetti per l’animale (solo estetici)", "Acquisti in-app: 5,99 € per oggetto, premi a 2,99 € per 10, kit a 15,99 €; anche nella versione gratuita", "Sviluppato, acquisto nello store a breve"],
            ["Offerte dei partner", "Commissioni da negozi, assicurazioni, veterinari ed educatori cinofili", "In programma"],
            ["Assistente IA per l’animale vero", "Abbonamento", "In programma"],
            ["Test del DNA per cani e gatti", "Vendita dei test e commissioni dei partner", "In programma"],
          ],
        },
        {
          type: "list",
          heading: "Cosa abbiamo costruito finora",
          items: [
            "Motore di gioco lato server con sincronizzazione in tempo reale, testato su simulazioni di giornate intere, giorni di cambio dell’ora legale e casi limite delle famiglie.",
            "Famiglie con più genitori, più figli e animali condivisi, con un punteggio equo per ogni bambino.",
            "Animali IA fotorealistici e unici, con costi dell’IA misurati e limitati e contenuti multimediali conservati sui nostri server nell’UE.",
            "Bisogni degli animali basati su fonti veterinarie e cinofile citate, con ogni numero riconducibile alla sua fonte.",
            "Sicurezza dei bambini fin dalla progettazione: accesso con PIN senza email, dati minimi, niente pubblicità, solo contenuti multimediali verificati.",
          ],
        },
        {
          type: "prose",
          heading: "Fase",
          paragraphs: [
            "PetPrep è in fase di pre-lancio, con una beta chiusa in programma. Il primo mercato è la Slovenia con i Paesi vicini, seguita da DACH e Regno Unito; il prodotto è pensato fin dal primo giorno per la localizzazione globale.",
            "Fondatore: David Tacer, sviluppatore software e imprenditore (Data Vallis David Tacer s.p., Dravograd, Slovenia). Scopri di più [su di noi](page:about).",
          ],
        },
        { type: "callout", title: "Richiedi la presentazione per investitori.", text: "Condividiamo presentazione, deck e data room su richiesta.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contatta PetPrep — famiglie, privacy, partner, investitori",
        description: "Contatta PetPrep: domande delle famiglie, richieste sulla privacy, collaborazioni e richieste degli investitori. Rispondiamo in inglese o in sloveno.",
      },
      eyebrow: "Contatti",
      title: "Leggiamo ogni messaggio.",
      lead: "Scrivi all’indirizzo giusto e ti risponderemo il prima possibile, in inglese o in sloveno.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Dati aziendali" }],
    },
    privacy: {
      navLabel: "Privacy",
      meta: {
        title: "Informativa sulla privacy — PetPrep",
        description: "Come PetPrep raccoglie, usa e protegge i dati personali di genitori e bambini, e come esercitare i tuoi diritti ai sensi del GDPR.",
      },
      eyebrow: "Note legali",
      title: "Informativa sulla privacy",
      lead: "Traduzione: fa fede esclusivamente la versione inglese. PetPrep è pensato soprattutto per i bambini, per questo raccogliamo il meno possibile e spieghiamo esattamente cosa ne facciamo.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Titolare del trattamento",
              paragraphs: [
                "Il titolare del trattamento dei dati personali trattati tramite l’app PetPrep e questo sito web è {company}, {address}; {companyIds}. Contatto per domande sulla privacy: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Cosa raccogliamo",
              items: [
                "Account del genitore: nome (come ti chiama la tua famiglia), indirizzo email, password (conservata solo come hash sicuro), il fuso orario del tuo dispositivo e il momento in cui hai accettato i termini e questa informativa.",
                "Profilo di chi si prende cura dell’animale (un bambino o un adulto): un soprannome di massimo 30 caratteri e, facoltativamente, l’anno di nascita, lasciato vuoto per un adulto. Niente email, password, cognome o data di nascita.",
                "Dispositivi: il modello del telefono (per esempio «iPhone», mai un nome che l’utente ha dato al telefono) e, per le notifiche, un token push, la piattaforma e la versione dell’app.",
                "Attività di cura: le azioni nella simulazione (cibo, acqua, pulizia, passeggiate), i totali giornalieri dei passi (o delle spinte della sedia a rotelle in modalità adattata, vedi le sezioni 3 e 4), i punteggi e i resoconti.",
                "Il Contratto di responsabilità: la firma del bambino fatta con il dito, conservata come linea vettoriale con il momento della firma.",
                "Codici: i codici di accesso e di invito sono conservati solo come hash e scadono.",
                "Segnalazioni di errore dell’app: se l’app si blocca o si chiude in modo anomalo, può inviare un breve resoconto tecnico al nostro server nell’UE (tipo e testo dell’errore, posizione nel codice, versione dell’app e del sistema operativo, nome della schermata, ruolo genitore/bambino). Non contiene nomi, indirizzi email, ID utente né indirizzi IP, non viene condiviso con terzi e viene eliminato dopo 30 giorni.",
                "Lista per l’accesso anticipato (questo sito web): il tuo indirizzo email, la lingua della pagina e il momento dell’iscrizione.",
              ],
            },
            {
              heading: "3. Dati sulla salute e sull’attività fisica (passi, Apple Salute e Health Connect)",
              paragraphs: [
                "PetPrep accede a un solo tipo di dati sulla salute e sull’attività fisica e lo raccoglie: quanti passi fa ogni giorno chi si prende cura dell’animale (attività fisica). Lo usiamo per un’unica funzione, la passeggiata quotidiana dell’animale nella simulazione: il bambino cammina e i suoi passi contano come la passeggiata dell’animale.",
                "Come vi accediamo: l’app sul telefono del bambino conta i passi. Se lo consenti nella finestra di autorizzazione del sistema, li legge da Apple Salute (iPhone) o Health Connect (Android), in sola lettura e solo i passi. Dove disponibile usa anche il sensore di movimento del telefono (Android: autorizzazione «Attività fisica»; iPhone: «Movimento e fitness»); senza l’autorizzazione per Apple Salute o Health Connect, conta solo il sensore di movimento.",
                "Cosa raccogliamo: l’app invia al nostro server solo il totale dei passi di oggi, la sua fonte (Apple Salute, Health Connect o il sensore di movimento) e il momento dell’invio. Conserviamo un totale giornaliero per ogni profilo di chi si prende cura dell’animale, mai singoli movimenti, percorsi, posizione, frequenza cardiaca, sonno, peso o altri dati sulla salute. Non scriviamo mai nulla in Apple Salute o Health Connect.",
                "Come li usiamo e li condividiamo: i totali dei passi servono solo a far funzionare la passeggiata nella simulazione e a mostrarla al genitore (pannello e resoconti). Non li usiamo per pubblicità, profilazione, valutazioni sanitarie o per addestrare modelli di IA, non li vendiamo e non li condividiamo con terzi; solo il nostro fornitore di hosting (Hetzner, server nell’UE) li conserva per nostro conto. L’uso che facciamo dei dati ricevuti da Health Connect rispetta le norme sulle autorizzazioni di Health Connect, compresi i requisiti di uso limitato (Limited Use).",
                "Base giuridica e conservazione: la lettura dei passi è facoltativa e avviene solo con l’autorizzazione che concedi sul dispositivo; trattiamo il totale giornaliero per fornire il servizio che hai scelto (esecuzione di un contratto). I totali dei passi sono inclusi nell’esportazione dei dati della tua famiglia e vengono eliminati insieme al profilo di chi si prende cura dell’animale o al tuo account; escono dai nostri backup crittografati entro 35 giorni al massimo.",
                "Puoi revocare l’autorizzazione in qualsiasi momento nelle impostazioni del dispositivo: iPhone → Impostazioni → Salute → Accesso ai dati e dispositivi → PetPrep; Android → Health Connect → Autorizzazioni app → PetPrep. L’autorizzazione per il sensore di movimento si può revocare nelle impostazioni del telefono per l’app PetPrep. Da quel momento la passeggiata non conta più nuovi passi.",
              ],
            },
            {
              heading: "4. Modalità adattata (spinte della sedia a rotelle)",
              paragraphs: [
                "La modalità adattata è pensata per i bambini che usano una sedia a rotelle: la passeggiata conta allora le spinte della sedia a rotelle invece dei passi. Arriverà con il prossimo aggiornamento dell’app; di seguito descriviamo quali dati trattiamo se un genitore la attiva.",
                "Se un genitore attiva la modalità adattata per un bambino, conserviamo solo il fatto che è attiva. Non chiediamo né conserviamo un motivo, una diagnosi o una condizione di salute.",
                "Finché è attiva, l’app sul telefono del bambino legge solo le spinte della sedia a rotelle invece dei passi, da Apple Salute (registrate da un Apple Watch) o da Health Connect, con un’autorizzazione separata in sola lettura. In quel caso non usa il sensore di movimento. Al nostro server arriva solo il numero di spinte di oggi; per quel giorno annotiamo che conta le spinte.",
                "Un genitore può registrare i minuti di passeggiata per un bambino in modalità adattata (solo per oggi). Conserviamo la data, il numero di minuti e quale genitore ha registrato la passeggiata.",
                "Poiché il fatto che la modalità adattata sia attiva può indicare una condizione di salute del bambino, lo trattiamo solo sulla base del tuo consenso esplicito (art. 9, par. 2, lett. a) del GDPR), che dai come genitore o tutore legale per conto del bambino (art. 8 del GDPR) attivando l’interruttore. Puoi disattivare la modalità in qualsiasi momento; l’app torna allora a contare i passi.",
                "Questi dati (l’interruttore, i giorni contati in spinte e le passeggiate registrate) sono inclusi nell’esportazione dei dati della tua famiglia e vengono eliminati insieme al profilo del bambino o al tuo account; escono dai nostri backup crittografati entro 35 giorni al massimo, come tutti gli altri dati.",
              ],
            },
            {
              heading: "5. Cosa non raccogliamo",
              items: [
                "Nessuna posizione: PetPrep non usa il GPS.",
                "Nessun altro dato sulla salute da Apple Salute o Health Connect oltre al conteggio giornaliero dei passi o delle spinte della sedia a rotelle.",
                "Nessuna pubblicità e nessun SDK pubblicitario o di tracciamento di terze parti nell’app.",
                "Nessuna chat tra utenti.",
                "Nessun cookie pubblicitario su questo sito web. I cookie analitici vengono impostati solo se li consenti (vedi Cookie più avanti).",
              ],
            },
            {
              heading: "6. Perché trattiamo i dati (finalità e basi giuridiche)",
              items: [
                "Per fornire il servizio che hai richiesto: account, simulazione, pannello, resoconti e notifiche (esecuzione di un contratto).",
                "Per elaborare gli acquisti tramite App Store o Google Play (esecuzione di un contratto).",
                "Per la passeggiata quotidiana (totali giornalieri dei passi, dati sulla salute e sull’attività fisica, vedi la sezione 3): esecuzione di un contratto; lettura da Apple Salute, Health Connect o dal sensore di movimento solo con l’autorizzazione che concedi sul dispositivo.",
                "Per la modalità adattata (il fatto che sia attiva, le spinte della sedia a rotelle e le passeggiate registrate): il consenso esplicito del genitore, dato attivando l’interruttore (art. 9, par. 2, lett. a) e art. 8 del GDPR, vedi la sezione 4).",
                "Per mantenere sicuro il servizio, per esempio limitando i tentativi di accesso ripetuti (legittimo interesse).",
                "Per gestire e proteggere il servizio con le segnalazioni di errore dell’app, che ci aiutano a risolvere blocchi e chiusure anomale (legittimo interesse).",
                "Per adempiere agli obblighi di legge, come la contabilizzazione degli acquisti (obbligo legale).",
                "Per inviarti email sul lancio di PetPrep se ti sei iscritto alla lista per l’accesso anticipato (consenso: puoi annullare l’iscrizione in ogni email).",
                "Per capire come i visitatori usano questo sito web, con Google Analytics, solo se consenti i cookie analitici (consenso: puoi modificarlo in qualsiasi momento in Impostazioni dei cookie).",
              ],
            },
            {
              heading: "7. Bambini",
              paragraphs: [
                "Solo un genitore o un tutore legale può creare un account e aggiungere un bambino. Il genitore decide cosa può fare il bambino e può eliminare il suo profilo in qualsiasi momento. Non chiediamo mai a un bambino i suoi recapiti, non mostriamo mai pubblicità e non permettiamo mai il contatto con sconosciuti.",
                "Il titolare dell’account può anche creare un profilo di chi si prende cura dell’animale per sé o per un altro adulto della famiglia, per esempio per capire se una razza fa per lui prima di comprarla o adottarla. A questo profilo si applicano le stesse regole e gli stessi dati minimi; vale anche per lui ogni tutela pensata per i bambini.",
              ],
            },
            {
              heading: "8. Immagini e video generati dall’IA",
              paragraphs: [
                "La foto e i brevi video di ogni animale vengono creati da un servizio di IA soltanto a partire da una descrizione dell’animale (razza, mantello, macchie e simili). La descrizione non contiene mai nomi né informazioni sulla tua famiglia. I contenuti multimediali finiti vengono conservati sui nostri server nell’UE e mostrati tramite link di breve durata.",
              ],
            },
            {
              heading: "9. Fornitori di servizi",
              items: [
                "Hosting: Hetzner Online (server nell’UE).",
                "Generazione di immagini e video con l’IA: fal.ai (riceve solo la descrizione dell’animale).",
                "Notifiche push: Apple Push Notification service e Firebase Cloud Messaging tramite Expo; le notifiche non contengono nomi.",
                "Acquisti: Apple App Store e Google Play; gestione degli acquisti tramite RevenueCat quando gli acquisti saranno attivi.",
                "Email per l’accesso anticipato: Klaviyo (riceve solo l’indirizzo email e la lingua che invii su questo sito web).",
                "Consenso ai cookie del sito web: CookieYes (conserva la tua scelta di consenso).",
                "Analisi del sito web: Google Analytics 4 di Google Ireland Ltd., solo con il tuo consenso; Google Analytics 4 non conserva gli indirizzi IP.",
              ],
            },
            {
              heading: "10. Per quanto tempo conserviamo i dati",
              paragraphs: [
                "Conserviamo i tuoi dati finché il tuo account esiste. Quando elimini il profilo di un bambino o il tuo account nell’app, i dati vengono eliminati immediatamente e non possono essere recuperati; escono automaticamente dai nostri backup crittografati entro 35 giorni al massimo. I dati che dobbiamo conservare per legge (per esempio per gli acquisti) vengono conservati per il periodo previsto dalla legge. Le segnalazioni di errore dell’app vengono eliminate automaticamente dopo 30 giorni.",
              ],
            },
            {
              heading: "11. I tuoi diritti",
              paragraphs: [
                "Hai il diritto di accedere ai tuoi dati, di rettificarli, esportarli e cancellarli, di opporti al trattamento e di limitarlo, e di presentare reclamo a un’autorità di controllo: in Slovenia è il Commissario per l’informazione (Informacijski pooblaščenec). Nell’app puoi esportare tutti i dati della tua famiglia in un file (Controlli → Account → Esporta i miei dati) ed eliminare il profilo di un bambino o l’intero account. Per qualsiasi altra richiesta, scrivi a {privacyEmail}.",
              ],
            },
            {
              heading: "12. Sicurezza",
              paragraphs: [
                "Password e codici sono conservati come hash, le connessioni sono crittografate, gli aggiornamenti in tempo reale arrivano solo ai membri della tua famiglia e i contenuti multimediali creati con l’IA vengono verificati prima di arrivare sullo schermo di un bambino.",
              ],
            },
            {
              heading: "13. Modifiche",
              paragraphs: ["Ti informeremo nell’app delle modifiche importanti prima che entrino in vigore. La data in alto indica la versione più recente."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookie",
          paragraphs: [
            "I cookie necessari fanno funzionare il sito web e ricordano la tua scelta di consenso. I cookie analitici (Google Analytics) vengono impostati solo se li consenti nel banner, e puoi modificare la tua scelta in qualsiasi momento.",
            "La tabella qui sotto viene generata automaticamente dall’ultima scansione di questo sito web, quindi elenca sempre i cookie che usiamo davvero.",
          ],
          settings: "Modifica le impostazioni dei cookie",
          fallback: "L’elenco dei cookie si carica insieme al banner del consenso. Se non lo vedi, consenti gli script su questa pagina o scrivi a {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Termini di utilizzo",
      meta: {
        title: "Termini di utilizzo — PetPrep",
        description:
          "Le condizioni per usare l’app e il sito web di PetPrep: account e profili dei bambini, la sfida di 12 settimane e il certificato, acquisti e rimborsi, contenuti creati con l’IA, modalità adattata, uso corretto, eliminazione e legge applicabile.",
      },
      eyebrow: "Note legali",
      title: "Termini di utilizzo",
      lead: "Traduzione: fa fede esclusivamente la versione inglese. Le regole per usare PetPrep, scritte per essere lette.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Il servizio",
              paragraphs: [
                "PetPrep è fornito da {company}, {address}; {companyIds}, la stessa azienda che è titolare del trattamento ai sensi dell’informativa sulla privacy. Questi termini si applicano all’app PetPrep e al sito web petprep.si.",
                "PetPrep è una simulazione della cura di un animale domestico. Aiuta famiglie e singole persone a capire se sono pronte a prendersi cura di un animale vero: bambini, e adulti che vogliono verificare se una razza fa per loro prima di comprarla o adottarla. È uno strumento educativo, non una consulenza veterinaria o professionale di altro tipo.",
              ],
            },
            {
              heading: "2. Account, profili e bambini",
              items: [
                "Gli account vengono creati da adulti: genitori, tutori legali o adulti che usano PetPrep per sé. Registrandoti accetti questi termini e l’informativa sulla privacy.",
                "Chi si prende cura dell’animale (bambini o adulti) lo fa tramite un profilo creato dal titolare dell’account, che può crearne uno anche per sé. Un profilo richiede solo un soprannome e, facoltativamente, l’anno di nascita: di un bambino non ci serve altro, quindi ti chiediamo di non inserire altro da nessuna parte nell’app.",
                "Un bambino accede con un codice di 6 cifre (PIN) che crei nella tua app. Il codice ha una breve durata e funziona una sola volta; dallo solo al bambino a cui è destinato.",
                "Come genitore o tutore legale sei responsabile di come tuo figlio usa PetPrep: se è adatto a lui, quanto tempo ci dedica e se è al sicuro durante le passeggiate (per esempio nel traffico). Puoi fermare il gioco di qualsiasi animale in qualsiasi momento.",
                "Puoi invitare un altro genitore nella famiglia con un codice di invito: vedrete entrambi tutti i dati della famiglia e potrete entrambi fermare il gioco.",
                "Fornisci informazioni corrette e tieni al sicuro password, codici e dispositivi.",
              ],
            },
            {
              heading: "3. La sfida di 12 settimane, il Care Score e il certificato",
              items: [
                "La sfida dura 12 settimane (84 giorni di programma) e inizia con l’acquisto; ogni persona che si prende cura dell’animale ha il proprio traguardo. Il tempo in cui il gioco è in attesa del pagamento non conta ai fini delle 12 settimane.",
                "Il Care Score (0–100) indica quale quota delle routine previste (cibo, acqua, pulizia, passeggiata, una sessione di addestramento) è stata svolta personalmente da chi si prende cura dell’animale; ogni malattia dell’animale lo abbassa. Il tempo in cui il gioco è fermo, l’animale è dal veterinario e le ore di silenzio non contano mai contro chi se ne prende cura.",
                "Dopo 12 settimane viene registrato un punteggio finale, che in seguito non cambia; le cure dopo la sfida non lo influenzano. Con un punteggio di 70 o più puoi creare nell’app un Certificato di responsabilità (PDF); sotto 70 ricevi un resoconto della sfida.",
                "Se cibo, acqua o pulizia restano allo 0% per 24 ore, l’animale viene «portato al rifugio» (fine del gioco). Il gioco con quell’animale termina, non c’è nessun certificato e ricevi un resoconto della sfida.",
                "Il Care Score e il certificato mostrano solo come chi si prende cura dell’animale ha accudito un animale simulato nell’app. Non sono una garanzia che un bambino, o chiunque altro, sia pronto per un animale vero, non sono una valutazione professionale e non sostituiscono il tuo giudizio o il consiglio di un veterinario, di un allevatore o di un rifugio. La decisione su un animale vero spetta sempre a te.",
                "Le regole del gioco (pasti, passeggiate e cure in base a razza ed età) sono semplificate e basate su fonti pubbliche. Non sono consigli veterinari; per la salute e la cura di un animale vero chiedi a un veterinario.",
              ],
            },
            {
              heading: "4. Funzioni gratuite e a pagamento, acquisti e rimborsi",
              items: [
                "Il cane meticcio e il gatto domestico sono gratis per sempre e sono il modo per provare PetPrep; non esiste una prova gratuita della sfida. Un animale gratuito non ha il programma di 12 settimane né il certificato, il genitore vede la cronologia degli ultimi 7 giorni e l’animale ha un set di base di immagini e video.",
                "La sfida PetPrep di 12 settimane con una razza a pagamento è un acquisto una tantum (49,99 € in Slovenia; lo store mostra il prezzo per il tuo Paese). Un acquisto corrisponde a una sfida per un animale; ogni nuova sfida con un nuovo animale è un nuovo acquisto. I fratelli che si prendono cura dello stesso animale pagano una sola volta.",
                "Il genitore acquista nella propria app tramite App Store o Google Play; nell’app del bambino non ci sono acquisti. Lo store elabora il pagamento secondo le proprie condizioni.",
                "Puoi creare un animale per la sfida prima di acquistarla. Finché la sfida non è pagata, il gioco è in pausa: l’animale aspetta al sicuro, i suoi bisogni non calano e non peggiora nulla. Una volta effettuato l’acquisto, il gioco riprende da dove si era fermato.",
                "I rimborsi sono gestiti da App Store e Google Play secondo le loro regole; chiedi il rimborso allo store in cui hai acquistato. Se lo store rimborsa un acquisto prima che la sfida sia terminata, il gioco di quell’animale torna in pausa. Le immagini e i video creati dopo l’acquisto restano.",
                "Dopo la fine del gioco (rifugio), un acquisto non sblocca l’animale; una nuova sfida è un nuovo animale e un nuovo acquisto.",
                "Desideri (oggetti per l’animale, quando disponibili): un bambino può chiederli, ma solo un genitore può acquistarli, nella propria app. Un oggetto acquistato appartiene all’animale per cui è stato comprato ed è solo estetico: non influisce sul gioco, sul punteggio o sul certificato. Dopo la fine del gioco o quando l’animale viene eliminato, l’acquisto resta utilizzato e non viene rimborsato. Se lo store rimborsa l’acquisto, l’oggetto (per i premi, quelli non utilizzati) viene rimosso.",
                "Se elimini un animale, un bambino o l’account mentre una sfida acquistata è ancora in corso, l’acquisto resta utilizzato: non passa a un altro animale e l’eliminazione non è un rimborso. L’app ti avvisa prima e ti chiede di confermare.",
              ],
            },
            {
              heading: "5. Immagini e video generati dall’IA",
              items: [
                "Le immagini e i video degli animali sono generati dall’intelligenza artificiale (IA) soltanto a partire da una descrizione dell’animale (razza, colore, mantello e così via), mai da dati sulla tua famiglia. Sono illustrazioni di un animale simulato e potrebbero non corrispondere perfettamente a un animale reale o allo standard di una razza.",
                "Dove li mostriamo pubblicamente, come i ritratti delle razze su questo sito web, sono indicati come generati dall’IA.",
                "Un aspetto non è necessariamente unico: animali della stessa razza a pagamento e dello stesso colore possono condividere le stesse immagini e gli stessi video, e gli animali gratuiti ricevono uno degli aspetti condivisi della loro razza. Una sfida a pagamento include un set di video più ampio rispetto a un animale gratuito.",
                "Dopo la firma del contratto o un acquisto, la preparazione di immagini e video può richiedere qualche minuto; nel frattempo l’app mostra che l’animale si sta preparando e segnala ciò che è ancora in preparazione.",
                "Le informazioni sulle razze nell’app e nel registro degli animali su questo sito web sono riassunte dalle fonti pubbliche che citiamo e non sono verificate da un veterinario.",
              ],
            },
            {
              heading: "6. Passi, dati sulla salute e modalità adattata",
              items: [
                "La passeggiata quotidiana conta i passi reali di chi si prende cura dell’animale. Se lo consenti, l’app li legge da Apple Salute o Health Connect, in sola lettura (non scrive mai nulla lì), oppure dal sensore di movimento del telefono. Quali dati trattiamo è descritto nell’informativa sulla privacy (sezione 3).",
                "La modalità adattata è pensata per i bambini che usano una sedia a rotelle: la passeggiata conta allora le spinte della sedia a rotelle invece dei passi. Puoi usarla se la funzione è disponibile nella tua versione dell’app. Un genitore la attiva per un singolo bambino; attivarla costituisce il tuo consenso e disattivarla lo revoca (informativa sulla privacy, sezione 4).",
                "In modalità adattata un genitore può registrare i minuti di passeggiata del bambino, solo per oggi. Sei responsabile di queste registrazioni: registra solo passeggiate avvenute davvero, perché contano per il Care Score e il certificato.",
                "PetPrep non usa la posizione e non avvisa dei pericoli durante una passeggiata; la sicurezza delle passeggiate spetta a te.",
              ],
            },
            {
              heading: "7. Notifiche",
              paragraphs: [
                "Se le consenti sul dispositivo, l’app invia notifiche push: promemoria a chi si prende cura dell’animale, avvisi ai genitori quando un animale è senza cibo, acqua o pulizia, e aggiornamenti su malattie, fine del gioco e fine della sfida. Le notifiche non contengono mai il nome del bambino o dell’animale e non vengono inviate durante le ore di silenzio. Puoi revocare l’autorizzazione in qualsiasi momento nelle impostazioni del dispositivo; senza notifiche chi si prende cura dell’animale potrebbe perdere delle routine, e questo influisce sul gioco e sul punteggio.",
              ],
            },
            {
              heading: "8. Uso corretto",
              items: [
                "Non cercare di falsare il conteggio dei passi o delle spinte, di registrare passeggiate mai avvenute, di accedere ai dati di altre famiglie, di decompilare o di disturbare il servizio.",
                "Non dare agli animali nomi offensivi o inappropriati e non inserire dati personali di un bambino che l’app non richiede.",
                "Possiamo limitare o sospendere gli account che violano queste regole o mettono a rischio i bambini, e possiamo rimuovere il nome inappropriato di un animale.",
              ],
            },
            {
              heading: "9. Proprietà intellettuale",
              paragraphs: [
                "PetPrep, il suo logo, il design, il software e i contenuti appartengono a {company}. Puoi usare l’app, nonché le immagini, i video e il certificato del tuo animale, per l’uso personale e non commerciale della tua famiglia, per esempio per condividerli con i parenti.",
              ],
            },
            {
              heading: "10. Responsabilità",
              paragraphs: [
                "Ci impegniamo a mantenere PetPrep disponibile e accurato, ma il servizio è fornito così com’è; si basa inoltre su servizi di terzi (gli store di app, Apple Salute, Health Connect, le notifiche push, il servizio di IA) che non controlliamo. Nei limiti consentiti dalla legge, non siamo responsabili per danni indiretti o per decisioni sull’acquisto o l’adozione di un animale vero. Nulla in questi termini limita i diritti che hai come consumatore in base a norme imperative.",
              ],
            },
            {
              heading: "11. Eliminazione dell’account e fine dell’uso",
              paragraphs: [
                "Puoi eliminare il profilo di un bambino o il tuo account in qualsiasi momento nell’app. L’eliminazione è immediata e definitiva; quando l’ultimo genitore di una famiglia elimina il proprio account, viene eliminata l’intera famiglia. Prima puoi esportare i tuoi dati (Controlli → Account → Esporta i miei dati). Cosa succede ai dati è descritto nell’informativa sulla privacy; cosa succede a un acquisto è descritto nella sezione 4.",
              ],
            },
            {
              heading: "12. Modifiche a questi termini",
              paragraphs: [
                "Aggiorniamo questi termini quando cambiano l’app o la legge. Ti informeremo nell’app delle modifiche importanti prima che entrino in vigore. La data in alto indica la versione più recente. Se non sei d’accordo con una modifica, puoi eliminare il tuo account in qualsiasi momento.",
              ],
            },
            {
              heading: "13. Legge applicabile e controversie",
              paragraphs: [
                "Questi termini sono regolati dalla legge della Repubblica di Slovenia. I consumatori possono inoltre avvalersi delle tutele imperative del Paese in cui vivono e utilizzare la piattaforma europea per la risoluzione delle controversie online.",
              ],
            },
            {
              heading: "14. Contatti",
              paragraphs: [
                "Domande su questi termini: {termsEmail}. Fornitore del servizio: {company}, {address}; {companyIds}. Domande sulla privacy: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Sicurezza dei bambini",
      meta: {
        title: "Sicurezza dei bambini — come PetPrep protegge i bambini",
        description:
          "Come PetPrep protegge i bambini: account creati dai genitori, accesso con codice senza email, dati minimi, niente pubblicità né chat, nessun tracciamento della posizione, contenuti multimediali verificati.",
      },
      eyebrow: "Fiducia",
      title: "Pensato per i bambini dalla prima riga di codice.",
      lead: "Traduzione: fa fede esclusivamente la versione inglese. Il bambino è l’utente principale di PetPrep, per questo sicurezza e privacy sono regole del prodotto, non impostazioni.",
      blocks: [
        {
          type: "cards",
          heading: "I nostri standard",
          columns: 2,
          items: [
            { title: "Ogni account lo creano i genitori", text: "I bambini non possono registrarsi da soli. Un genitore aggiunge il bambino e genera un codice di accesso monouso valido per 15 minuti." },
            { title: "Niente email né password per i bambini", text: "Un bambino accede con il codice del genitore. I codici sbagliati, scaduti o già usati ricevono tutti la stessa risposta, così nessuno può indovinare quali bambini esistono." },
            { title: "Dati minimi", text: "Un soprannome e, facoltativamente, l’anno di nascita. Niente cognome, niente data di nascita, niente foto del bambino." },
            { title: "Niente pubblicità, niente chat, niente sconosciuti", text: "Non c’è pubblicità e non c’è modo di contattare altri utenti." },
            { title: "Nessun tracciamento della posizione", text: "Le passeggiate contano solo i passi, da Apple Salute o Health Connect (con la tua autorizzazione, in sola lettura) oppure dal sensore di movimento del telefono. Il GPS non viene usato." },
            { title: "Aggiornamenti in tempo reale privati", text: "Gli aggiornamenti in tempo reale arrivano solo ai bambini che si prendono cura di quell’animale e ai genitori della stessa famiglia." },
            { title: "Contenuti multimediali verificati", text: "Vengono mostrati solo immagini e video prodotti per PetPrep e controllati dal nostro server, provenienti dal nostro spazio di archiviazione nell’UE." },
            { title: "Notifiche senza nomi", text: "Le notifiche non includono mai il nome del bambino o dell’animale, perché possono comparire sulla schermata di blocco." },
          ],
        },
        {
          type: "list",
          heading: "Il controllo resta ai genitori",
          items: [
            "Ore di silenzio per scuola e sonno, senza notifiche.",
            "Un pulsante di pausa che blocca in tempo reale lo schermo del bambino.",
            "Disconnetti un bambino da tutti i dispositivi in un colpo solo.",
            "Esporta o elimina tutti i dati all’istante dall’app.",
          ],
        },
        { type: "callout", title: "Segnala un problema", text: "Se qualcosa in PetPrep ti preoccupa, scrivici e ti risponderemo con priorità.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Accessibilità",
      meta: {
        title: "Accessibilità — PetPrep per ogni bambino",
        description:
          "Come PetPrep si adatta ai bambini che fanno fatica con gli scorrimenti, usano VoiceOver o TalkBack o preferiscono meno movimento, con le stesse regole e gli stessi punti per tutti.",
      },
      eyebrow: "Fiducia",
      title: "Ogni bambino può prendersi cura del suo animale.",
      lead: "Alcuni bambini fanno fatica a scorrere con il dito, usano un lettore di schermo o preferiscono meno movimento sullo schermo. PetPrep si adatta a loro, con le stesse regole, gli stessi punti e lo stesso certificato di tutti gli altri.",
      blocks: [
        {
          type: "cards",
          heading: "Nell’app",
          columns: 3,
          items: [
            { title: "Gesti più semplici", text: "Invece di scorrere, il bambino tiene premuto il dito o preme un pulsante, in tutti i giochi con lo scorrimento: spazzolare, la canna con le piume, cambiare la lettiera e lanciare la palla. Un genitore lo attiva per ogni bambino nell’area per i genitori." },
            { title: "Lettori di schermo", text: "Con VoiceOver o TalkBack attivi, i giochi passano da soli alla pressione prolungata. L’intestazione dell’animale legge ad alta voce tutto ciò che lo riguarda, e ogni passaggio dei giochi di cura è un pulsante a sé." },
            { title: "Meno movimento", text: "Quando il telefono è impostato per ridurre il movimento, i pulsanti che pulsano e Curio che ondeggia restano fermi." },
          ],
        },
        {
          type: "cards",
          heading: "In arrivo con il prossimo aggiornamento dell’app",
          items: [
            { title: "Passeggiate in sedia a rotelle", text: "In modalità adattata, le spinte della sedia a rotelle contano esattamente come i passi: una spinta vale un passo. Un genitore può anche registrare i minuti di passeggiata di oggi, così il bambino non deve fare nulla in più. Un genitore la attiva per ogni bambino e, se la disattiva, il contrassegno viene rimosso dalla cronologia." },
          ],
        },
        { type: "callout", title: "La stessa sfida per tutti", text: "Gli adattamenti cambiano il modo in cui un bambino gioca, mai ciò che conta. Punteggi, tempi e Certificato di responsabilità funzionano esattamente allo stesso modo. Non chiediamo mai perché un bambino abbia bisogno di un adattamento.", tone: "mint" },
        { type: "callout", title: "Qualcosa non funziona per tuo figlio?", text: "Raccontaci cosa lo ha ostacolato e lo esamineremo.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Elimina account",
      meta: {
        title: "Elimina il tuo account PetPrep e i tuoi dati",
        description:
          "Come eliminare il tuo account PetPrep (Data Vallis) nell’app o via email, quali dati vengono eliminati, cosa viene conservato e per quanto tempo.",
      },
      eyebrow: "Fiducia",
      title: "Elimina il tuo account PetPrep",
      lead: "Traduzione: fa fede esclusivamente la versione inglese. PetPrep è realizzato da Data Vallis. Puoi eliminare il tuo account e i dati della tua famiglia in qualsiasi momento: all’istante nell’app, oppure via email se non hai più l’app.",
      blocks: [
        {
          type: "steps",
          heading: "Elimina l’account nell’app (all’istante)",
          items: [
            { title: "Accedi come genitore", text: "Apri PetPrep, tocca «Sono un genitore» e accedi." },
            { title: "Apri il tuo account", text: "Vai su Controlli → Account. Facoltativo: tocca prima «Esporta i miei dati» per conservarne una copia." },
            { title: "Elimina", text: "Tocca «Elimina account», conferma con la tua password (o con l’accesso tramite Google / Apple) e digita DELETE, poi tocca «Elimina definitivamente»." },
            { title: "Fatto", text: "L’eliminazione è immediata e non può essere annullata. Tutti i tuoi dispositivi e quelli dei tuoi figli vengono disconnessi." },
          ],
        },
        {
          type: "prose",
          heading: "Non hai più l’app? Richiedi l’eliminazione via email",
          paragraphs: [
            "Scrivi a [privacy@petprep.si](mailto:privacy@petprep.si) dall’indirizzo email del tuo account genitore PetPrep, con oggetto «Delete my account». Verifichiamo che la richiesta provenga dal titolare dell’account ed eliminiamo l’account entro un mese al massimo (di solito entro pochi giorni), poi te lo confermiamo via email.",
            "Per eliminare solo il profilo di un figlio, accedi come genitore e apri il bambino in Controlli → Figli → Elimina profilo.",
          ],
        },
        {
          type: "table",
          heading: "Cosa viene eliminato e cosa viene conservato",
          head: ["Dati", "Cosa succede"],
          rows: [
            ["Il tuo account genitore (nome, email, password, collegamento all’accesso con Google / Apple)", "Eliminato immediatamente"],
            ["Se sei l’unico genitore della famiglia: profili dei figli (soprannome, anno di nascita), animali, immagini e video creati con l’IA, contratti e firme, registro delle cure, Care Score, certificati, conteggi dei passi, ore di silenzio, codici di accesso", "Eliminati immediatamente"],
            ["Se nella famiglia resta un altro genitore", "Viene eliminato solo il tuo account; la famiglia resta con l’altro genitore"],
            ["Dispositivi e token per le notifiche", "Disconnessi ed eliminati immediatamente"],
            ["Dati degli acquisti (prodotto, data, ID della transazione nello store, un ID di acquisto anonimo, senza nome né email)", "Conservati per il tempo richiesto dalla normativa contabile e fiscale, non più collegati alla tua famiglia"],
            ["Dati sui costi dell’IA", "Conservati a fini contabili senza alcun collegamento a te, ai tuoi figli o ai tuoi animali"],
            ["Backup crittografati", "Rimossi automaticamente entro 35 giorni"],
          ],
          note: "Gli acquisti in sé sono gestiti da App Store e Google Play; i relativi dati sono conservati da Apple e Google secondo le loro politiche. Una sfida acquistata ma non terminata non viene rimborsata quando elimini l’account.",
        },
        { type: "callout", title: "Domande?", text: "Scrivi a privacy@petprep.si. Trovi i dettagli nella nostra informativa sulla privacy.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Registro degli animali di PetPrep — specie e razze, con le fonti",
        description:
          "Cani, gatti e le loro razze: di cosa ha bisogno ciascuno, a chi si adatta e come lo simula PetPrep. Cerca e confronta le razze; ogni informazione rimanda alla sua fonte.",
      },
      navLabel: "Animali",
      eyebrow: "Registro degli animali",
      title: "Conosci l’animale prima che arrivi a casa.",
      lead:
        "Di cosa ha davvero bisogno ogni specie e razza di PetPrep, secondo enti cinofili, registri felini, associazioni benefiche veterinarie e studi, con il link a ogni fonte. In più, le regole che PetPrep usa per simularlo.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Chi siamo — l’azienda, il fondatore e da dove prendiamo le informazioni sugli animali",
        description:
          "Chi realizza PetPrep: Data Vallis David Tacer s.p. di Dravograd, Slovenia, il fondatore David Tacer, la nostra missione e come il registro degli animali trova e verifica le sue informazioni.",
      },
      navLabel: "Chi siamo",
      eyebrow: "Chi siamo",
      title: "Chi realizza PetPrep.",
      lead: "PetPrep è realizzato a Maribor, in Slovenia, da una piccola azienda di software. Questa pagina spiega chi siamo, perché sviluppiamo PetPrep e come decidiamo cosa dicono degli animali l’app e il registro degli animali.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "L’azienda",
          paragraphs: [
            "PetPrep è un prodotto di Data Vallis David Tacer s.p., un’attività di sviluppo software (ditta individuale) con sede legale a Dravograd, in Slovenia. La stessa attività gestisce questo sito web e l’app PetPrep ed è titolare del trattamento dei dati personali (vedi l’[informativa sulla privacy](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Il fondatore",
          paragraphs: [
            "PetPrep è stato fondato da David Tacer, sviluppatore software e imprenditore di Maribor, in Slovenia.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "La nostra missione",
          paragraphs: [
            "Ogni famiglia si sente dire: «Prometto che me ne occuperò io». PetPrep trasforma quella promessa in una prova: per 12 settimane un bambino, o un adulto che desidera una razza in particolare, si prende cura di un animale IA realistico con i bisogni quotidiani di un animale vero, e il genitore vede ogni giorno se le cure reggono.",
            "Anche fallire nella simulazione è un buon risultato: la famiglia lo scopre prima che un animale vero ne soffra e prima di impegnarsi in anni di cure e spese. Quando un animale vero arriva davvero a casa, vogliamo che PetPrep resti utile per tutta la sua vita.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Come è costruito il registro degli animali",
          intro: "Il [registro degli animali](page:animals) e l’app usano gli stessi dati. Queste regole stabiliscono cosa può dire:",
          items: [
            "Ogni informazione indica la sua fonte e rimanda a essa. Le fonti sono classificate in base al peso che meritano: A — standard di razza, articoli scientifici sottoposti a revisione paritaria e linee guida delle associazioni veterinarie; B — pagine informative di cliniche veterinarie, università e associazioni nazionali per il benessere animale; C — sintesi secondarie (enciclopedie, articoli di stampa), usate solo insieme a una fonte A o B.",
            "Come fatti vengono mostrate solo informazioni con una fonte. Un valore che nessuna fonte sostiene non viene pubblicato. Dove le fonti non concordano, ognuna viene mostrata con il proprio valore.",
            "Le regole del gioco non sono consigli veterinari. Dove il gioco ha bisogno di un numero che le fonti non indicano con precisione (per esempio un obiettivo quotidiano di passi), PetPrep lo stabilisce a partire dalle fonti e lo mostra solo sotto «Come lo simula PetPrep», indicato come regola del gioco.",
            "Le note sulla salute hanno solo scopo informativo. Riassumono ciò che dicono le fonti su una razza e non sono state verificate da un veterinario. Per un animale vero, chiedi a un veterinario.",
            "Gli standard di razza sono riassunti con parole nostre, mai copiati per esteso, e una razza non viene mai definita «ipoallergenica».",
            "Il registro viene generato dai dati di ricerca di PetPrep, gli stessi che usa l’app. Quando una fonte o un valore cambia, il registro viene esportato di nuovo e ogni pagina di razza mostra la data dell’ultimo aggiornamento. Se trovi un errore, scrivi a hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Domande su PetPrep?", text: "Scrivi all’indirizzo giusto nella pagina dei contatti: famiglie, privacy, partner o investitori.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Ti presento Curio — la mascotte di PetPrep",
        description:
          "Curio è la mascotte di PetPrep: il piccolo cubo curioso del nostro logo e il protagonista dei nostri brevi video. Chi è, in cosa si distingue dall’animale realistico dell’app, immagini e media kit.",
      },
      navLabel: "Ti presento Curio",
      eyebrow: "La nostra mascotte",
      title: "Ti presento Curio.",
      lead: "Curio è il piccolo cubo curioso del logo di PetPrep, che ha preso vita. È il protagonista dei nostri brevi video, nel ruolo dell’animale che aspetta vicino alla porta che qualcuno mantenga una promessa. È la nostra mascotte, non l’animale di cui ti prendi cura nell’app.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascotte di PetPrep: un morbido cubo color grafite con grandi occhi bianchi, un nasino color lampone e un collare color menta, che saluta con la mano.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Chi è Curio?",
          paragraphs: [
            "Curio è nato come il simbolo del nostro logo: un quadrato color grafite dagli angoli arrotondati, con due grandi occhi che guardano in alto a destra e un nasino color lampone. In sloveno lo chiamiamo Radovednež, «il curioso». Nell’ottobre 2026 gli sono spuntati due braccini, due gambette corte e un collare color menta con una medaglietta rotonda, ed è diventato un personaggio.",
            "Curio non ha la bocca. Tutto ciò che prova si vede nei suoi occhi: spalancati quando qualcuno sussurra «passeggiata?», due linee assonnate quando non è ancora tornato a casa nessuno, archetti felici quando la ciotola è piena.",
            "Curio non è né maschio né femmina, né cane né gatto. Rappresenta ogni animale che aspetta, ogni giorno, che qualcuno mantenga una promessa.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio in breve",
          columns: 3,
          items: [
            { title: "Nome", text: "Curio in inglese, Radovednež in sloveno." },
            { title: "Fatto di", text: "Morbida grafite, un collare color menta e una medaglietta color lampone: i colori di PetPrep." },
            { title: "Parla", text: "Mai. Solo con gli occhi." },
            { title: "Ama", text: "Le passeggiate, la ciotola piena e i bambini che tornano anche il 15° giorno." },
            { title: "Vive", text: "Nei nostri brevi video su [TikTok](https://www.tiktok.com/@petprep.si) e [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Lavoro", text: "Ricordare alle famiglie, con un occhiolino, che un animale ha bisogno di cure ogni singolo giorno." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio non è l’animale dell’app",
          intro: "Nei nostri video Curio interpreta un animale che ha bisogno di cure, perché ogni animale ne ha bisogno. In PetPrep i bambini – e gli adulti che provano una razza – si prendono cura di qualcosa di molto più vicino alla realtà.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, la mascotte animata, che saluta su uno sfondo chiaro.",
              label: "Mascotte",
              title: "Curio — la nostra mascotte",
              text: "Un personaggio animato per i nostri video, gli adesivi e questa pagina. Mostra di cosa parla PetPrep. Non si può adottare.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Ritratto realistico di un labrador retriever generato dall’IA: così appaiono gli animali nell’app PetPrep.",
              label: "Nell’app · immagine IA",
              tone: "mint",
              title: "Il tuo animale in PetPrep",
              text: "Una simulazione IA realistica di una razza vera, come questo [labrador retriever](+breed:labrador_retriever), con i bisogni quotidiani di un animale vero: pasti, acqua, passeggiate contate in passi veri, pulizia e addestramento. Scopri [come funziona](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio in immagini",
          intro: "Curio è un personaggio 3D stilizzato, realizzato con strumenti di IA a partire da un nostro design. Le nuove scene compaiono prima nei nostri video.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio che saluta su uno sfondo color menta.", caption: "Ciao! Il classico saluto.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio in piedi su una mensola bianca, che saluta.", caption: "Sulla mensola, in attesa di qualcuno." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio di fronte, di lato e di spalle, con quattro espressioni degli occhi.", caption: "Da ogni lato, e come i suoi occhi mostrano le emozioni." },
            { src: "/curio/curio-waving.webp", alt: "Curio su sfondo trasparente.", caption: "Scontornato, pronto per il tuo post (vedi il media kit).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Media kit",
          intro: "Per creator, giornalisti e partner che scrivono di PetPrep. Domande o idee per una collaborazione: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Scarica tutto", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, sfondo trasparente", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, quadrato, chiaro", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, quadrato, menta", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Scheda del personaggio", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo di PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Simbolo di PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Come usare Curio",
          rules: [
            "Usa Curio in post, articoli e video su PetPrep. Per pubblicità, prodotti o merchandising, chiedici prima.",
            "Mostra Curio così com’è: cubo color grafite, occhi bianchi, naso color lampone, collare color menta. Non aggiungere bocca, orecchie, pelo o sopracciglia, e non cambiarne i colori né deformarlo.",
            "Curio è la mascotte di PetPrep. Non presentarlo come l’animale dell’app né come un cane o un gatto veri.",
            "Non usare Curio in modo da far pensare che PetPrep sostenga un altro prodotto, una causa o una persona.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Domande su Curio",
          items: [
            { q: "Curio è un cane o un gatto?", a: "Né l’uno né l’altro. Curio è un piccolo cubo del nostro logo. Nei nostri video interpreta un animale, ma non appartiene a nessuna specie." },
            { q: "Mio figlio può prendersi cura di Curio nell’app?", a: "No. Nell’app la tua famiglia si prende cura di un animale realistico di una razza vera, con gli stessi bisogni quotidiani dell’animale reale. Curio compare solo nei nostri video e sul sito web." },
            { q: "Perché Curio non ha la bocca?", a: "Perché non ce l’ha nemmeno il nostro logo. Curio dice tutto con gli occhi, e non chiede mai premi ad alta voce." },
            { q: "Dove posso vedere i nuovi video di Curio?", a: "Su TikTok e Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Consigli per la cura degli animali — cosa possono mangiare cani e gatti, con le fonti | PetPrep",
        description:
          "Quali alimenti sono tossici, rischiosi o adatti per cani e gatti: il motivo, i sintomi e cosa fare, con il link a ogni fonte. Realizzato da PetPrep per le famiglie che si preparano ad accogliere un animale.",
      },
      navLabel: "Consigli",
      eyebrow: "Consigli per la cura",
      title: "Cosa è sicuro per il tuo animale?",
      lead:
        "Risposte chiare e con le fonti per le famiglie: quali alimenti sono tossici, quali rischiosi e quali vanno bene come premio, per cani e gatti, con altre specie in arrivo. Ogni risposta riporta il link alle sue fonti.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Disegni da colorare gratis di cani e gatti da stampare per bambini | PetPrep",
        description:
          "Disegni da colorare gratis da stampare: golden retriever, labrador, border collie, cucciolo meticcio, gattino e Curio. PDF in formato A4 e US Letter, ognuno con una vera informazione sulla cura degli animali e la sua fonte.",
      },
      navLabel: "Disegni da colorare",
      eyebrow: "Disegni da colorare",
      title: "Disegni da colorare gratis da stampare.",
      lead:
        "Cani, gatti e Curio da colorare o ricopiare: stampa una pagina o l’intero album. Ogni pagina ha una vera informazione sulla cura degli animali, tratta da una fonte veterinaria o cinofila, da leggere insieme.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Per i bambini che vogliono un animale — disegni da colorare, Curio e #walkyourpet | PetPrep",
        description:
          "Tutto ciò che PetPrep ha per i bambini: disegni da colorare gratis da stampare con vere informazioni sulla cura degli animali, la mascotte Curio e #walkyourpet, per bambini e genitori che si preparano insieme ad accogliere un animale.",
      },
      navLabel: "Per i bambini",
      eyebrow: "Per i bambini",
      title: "Per i bambini che vogliono un animale.",
      lead: "Disegni da colorare da stampare, Curio e #walkyourpet: per bambini e genitori che si preparano insieme ad accogliere un animale.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascotte di PetPrep: un morbido cubo color grafite con grandi occhi bianchi, un nasino color lampone e un collare color menta, che saluta con la mano.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet — il movimento nato da una bambina vera",
        description:
          "«We could go walk your pet.» L’ha detto una bambina, e ora è un movimento: famiglie che escono perché un animale ha bisogno della sua passeggiata. Com’è nato, cosa significa in PetPrep e come partecipare.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Questa frase non l’abbiamo inventata noi. L’ha inventata una bambina. Ora è un invito per ogni famiglia: uscite, perché un animale ha bisogno della sua passeggiata, che sia vero o quello con cui vi state allenando in PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Storia social: «Overheard at the founder's house» («Sentito a casa del fondatore»). Una bambina dice «Lahko bi šli walk your pet» («Potremmo andare a walk your pet») e il titolo dice «#walkyourpet is a thing now» («#walkyourpet ora è una realtà»).", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Com’è nato",
          paragraphs: [
            "Nell’ottobre 2026 un’amica dei figli del nostro fondatore era a casa loro. Stavano decidendo se uscire, e lei ha detto, metà in sloveno e metà in inglese: «Lahko bi šli walk your pet», cioè «Potremmo andare a walk your pet».",
            "Nessuno gliel’aveva chiesto. Conosceva PetPrep, dove la passeggiata di un cane conta solo se esci davvero, e «walk your pet» era semplicemente diventato un motivo per uscire. Ci è piaciuto così tanto che l’abbiamo tenuto: in inglese, per tutte le lingue.",
            "Una conversazione vera. Bambini veri.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Cosa significa in PetPrep",
          intro: "In PetPrep la passeggiata quotidiana del cane è fatta dei passi reali di tuo figlio, letti da Apple Salute o Health Connect se lo consenti. Restare sul divano non conta, quindi «walk your pet» significa sempre uscire. Niente GPS e niente posizione: solo passi.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Unisciti al movimento",
          intro: "Per questo non ti serve l’app. Ogni famiglia che esce per un animale – vero o quello con cui si allena – ne fa parte.",
          items: [
            { title: "Esci", text: "Porta il cane a fare la sua passeggiata. Oppure, se state ancora decidendo se prendere un animale, fate la passeggiata che fareste con lui." },
            { title: "Cattura il momento", text: "Le scarpe vicino alla porta, un guinzaglio, il sentiero, le zampe sull’erba. Niente volti, niente nomi." },
            { title: "Condividilo", text: "Pubblicalo con #walkyourpet e tagga @petprep.si su Instagram o TikTok. Con il tuo permesso, potremmo condividere i momenti più belli qui e sui nostri profili." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Condividere in sicurezza",
          intro: "#walkyourpet riguarda i bambini, quindi queste regole valgono per tutto ciò che condividiamo:",
          items: [
            "Pubblicano i genitori, non i bambini. Solo un genitore decide cosa va online.",
            "Niente volti, nomi, scuole o indirizzi dei bambini, e mai il figlio di un’altra famiglia.",
            "Ripubblichiamo solo con il permesso di un genitore e rimuoviamo un post ogni volta che ce lo chiedi.",
            "Le citazioni dei bambini sono sempre vere. Non inventiamo né «miglioriamo» mai ciò che ha detto un bambino.",
            "È un invito, non un dovere. Nessuna serie da mantenere, nessuna pressione: solo un buon motivo per uscire.",
          ],
        },
        {
          type: "callout",
          title: "Il primo momento è nostro. Il prossimo potrebbe essere il tuo.",
          text: "Condividi la passeggiata della tua famiglia con #walkyourpet e tagga @petprep.si. Domande o una storia che vorresti raccontare: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Domande",
          items: [
            { q: "Mi serve PetPrep per partecipare?", a: "No. Chiunque esca per un animale può usare #walkyourpet. PetPrep è il luogo in cui è nata la frase, e dove la passeggiata del cane con cui ti alleni conta solo in passi veri." },
            { q: "Funziona anche per i gatti in PetPrep?", a: "Non come passeggiata. I gatti non vanno a passeggio, quindi in PetPrep i bisogni di un gatto si soddisfano con il gioco, non con i passi. Le passeggiate sono per i cani." },
            { q: "Perché la frase è in inglese?", a: "Perché è così che l’ha detta la bambina: in inglese, nel mezzo di una frase in sloveno. I bambini di tutto il mondo mescolano le lingue, quindi resta uguale in ogni lingua." },
            { q: "Pubblicherete mio figlio?", a: "Solo ciò che condividi tu stesso e ci permetti di ripubblicare, e mai il volto o il nome di un bambino. Scrivici a hello@petprep.si e lo rimuoveremo." },
          ],
        },
      ],
    },
  },
};

export default it;
