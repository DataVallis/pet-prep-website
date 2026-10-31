import type { Dictionary } from "./types";

const de: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Bereit für ein Haustier. An seiner Seite – sein ganzes Leben lang.",
    siteDescription:
      "PetPrep ist ein 12-wöchiger Haustier-Simulator, der Eltern zeigt, ob ihr Kind wirklich bereit für ein echtes Haustier ist – und danach zum KI-Assistenten für das ganze Leben des echten Tieres wird.",
    slogan: "Bereit für ein Haustier. An seiner Seite – sein ganzes Leben lang.",
    keywords: [
      "ist mein Kind bereit für einen Hund",
      "Haustier Verantwortung App für Kinder",
      "virtuelles Haustier Simulator",
      "KI Haustier Simulator",
      "bevor man sich einen Hund anschafft",
      "Kinder und Haustiere",
      "Test bereit für ein Haustier",
      "Eltern-Dashboard",
      "Hunderasse vor dem Kauf ausprobieren",
      "passt diese Rasse zu mir",
    ],
  },
  nav: { home: "Startseite", menu: "Menü", close: "Menü schließen", skip: "Zum Inhalt springen" },
  lang: { label: "Sprache", switchTo: "Sprache wechseln" },
  cta: {
    primary: "Kostenlos starten – mit einem Mischling",
    secondary: "So funktioniert es",
    earlyAccess: "Frühen Zugang sichern",
    earlyAccessSubject: "PetPrep – früher Zugang",
    ios: "Für iPhone laden",
    android: "Für Android laden",
    comingSoon: "Bald für iPhone und Android",
    readMore: "Weiterlesen",
    contactUs: "Kontakt aufnehmen",
  },
  common: {
    planned: "Geplant",
    plannedNote:
      "Diese Seite beschreibt, was wir als Nächstes entwickeln. Es ist noch nicht in der App verfügbar, und Details können sich ändern.",
    legalDraft:
      "Dieser Text wird vor dem öffentlichen Start mit unseren Rechtsberatern abgestimmt. Wenn etwas unklar ist, schreiben Sie uns.",
    lastUpdated: "Zuletzt aktualisiert",
    breadcrumbHome: "Startseite",
    screensNote: "Die App-Bildschirme auf dieser Website sind Produktvorschauen; die fertige App kann leicht anders aussehen.",
    perPet: "pro Haustier",
    free: "Kostenlos",
    forever: "für immer",
    notFoundTitle: "Diese Seite hat sich von der Leine gerissen.",
    notFoundText: "Die gesuchte Seite gibt es nicht oder sie ist umgezogen.",
    notFoundCta: "Zurück zur Startseite",
  },
  footer: {
    tagline: "Bereit für ein Haustier. An seiner Seite – sein ganzes Leben lang.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Unternehmen", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Vertrauen", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Alle Rechte vorbehalten.",
    dataEu: "Daten werden in der EU gespeichert.",
    languages: "Weitere Sprachen folgen bald.",
    company: "PetPrep ist ein Produkt von",
    cookieSettings: "Cookie-Einstellungen",
    a11yBadge: { title: "Barrierearm spielen", text: "Einfachere Gesten · Screenreader · Weniger Bewegung" },
  },
  screens: {
    pin: "Kinder melden sich mit einem 6-stelligen Code der Eltern an – ohne E-Mail, ohne Passwort.",
    contract: "Der Verantwortungsvertrag, mit dem Finger unterschrieben. Mit der Unterschrift erwacht das Haustier zum Leben.",
    hud: "Der Startbildschirm des Kindes: der aktuelle Zustand des Haustiers, vier Bedürfnisse und die Pflege-Tasten.",
    picker: "Die Eltern wählen das Haustier: Rasse, Herkunft (adoptiert oder vom Züchter) und Alter beim Einzug.",
    parent: "Das Eltern-Dashboard: eine Ampel, der Care Score und die heutigen Routinen für jedes Kind.",
    report: "Der Bericht eines Kindes über 7, 30 oder 84 Tage: Routinen, Spaziergänge und verpasste Aufgaben, Tag für Tag.",
    assistant: "Wenn es einzieht: Der KI-Assistent macht aus Halsbanddaten einen klaren Vorschlag.",
    certificate: "Nach 12 Wochen: das Verantwortungszertifikat mit dem Care Score des Kindes.",
  },
  pricingPlans: {
    free: {
      name: "Mischling",
      text: "Die vollständige Simulation mit einem lebensechten Mischling.",
      features: [
        "12-wöchige Simulation mit echten Konsequenzen",
        "Echte Spaziergänge, gezählt in echten Schritten vom Handy",
        "Eltern-Dashboard, Ampel und Care Score",
        "Ruhezeiten und eine Pause-Taste",
        "Fotorealistisches Bild Ihres Haustiers und kurze Videos",
      ],
      cta: "Kostenlos starten",
    },
    challenge: {
      name: "Die 12-wöchige PetPrep Challenge",
      badge: "12 Wochen + Zertifikat",
      unit: "pro Haustier · 12 Wochen",
      text: "Für Familien, die das volle Erlebnis und am Ende ein Zertifikat möchten.",
      features: [
        "Alles aus dem Mischling-Tarif",
        "Anspruchsvolle Rassen wie der [Border Collie](breed:border_collie)",
        "Die Stimmungen Ihres Haustiers als KI-Videos",
        "Verantwortungszertifikat",
        "Ein Preis, wenn Geschwister sich ein Haustier teilen",
        "Zugang für beide Elternteile",
      ],
      cta: "Challenge wählen",
    },
    note:
      "Käufe erfolgen in der App über den App Store oder Google Play. Ein zweites Haustier in derselben Familie ist eine eigene Challenge. Preise inklusive Mehrwertsteuer, sofern anwendbar.",
  },
  earlyAccess: {
    title: "Frühen Zugang sichern",
    text: "Gehören Sie zu den ersten Familien, die PetPrep ausprobieren. Wir schreiben Ihnen, sobald es so weit ist – sonst nichts.",
    label: "Ihre E-Mail-Adresse",
    placeholder: "sie@beispiel.de",
    button: "Frühen Zugang sichern",
    sending: "Wird gesendet …",
    successTitle: "Sie stehen auf der Liste.",
    successText: "Vielen Dank! Sobald PetPrep bereit ist, erfahren Sie es als Erste per E-Mail.",
    invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.",
    consent: "Mit der Anmeldung stimmen Sie zu, E-Mails über PetPrep zu erhalten. Abmeldung jederzeit möglich.",
    privacyLink: "Datenschutzerklärung",
  },
  contactCards: [
    { title: "Familien", text: "Fragen zur App, zu Ihrem Konto oder zur Challenge.", email: "hello" },
    { title: "Datenschutz", text: "Auskunft, Export oder Löschung von Daten und alle Fragen zum Datenschutz.", email: "privacy" },
    { title: "Partner", text: "Zoofachhandel, Tierheime, Tierarztpraxen, Trainer, Versicherer und Schulen.", email: "partners" },
    { title: "Investoren", text: "Investoren-Brief, Pitch-Deck und Datenraum auf Anfrage.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Ist Ihr Kind bereit für ein Haustier? Finden Sie es in 12 Wochen heraus.",
      description:
        "Bevor ein echtes Haustier einzieht, kümmert sich Ihr Kind 12 Wochen lang um ein lebensechtes KI-Haustier: Mahlzeiten, Saubermachen, echte Spaziergänge. Sie sehen täglich, ob es wirklich bereit ist.",
    },
    hero: {
      eyebrow: "Die 12-wöchige PetPrep Challenge",
      title: "Bereit für ein Haustier. An seiner Seite – sein ganzes Leben lang.",
      lead:
        "Bevor ein echtes Haustier einzieht, kümmert sich Ihr Kind 12 Wochen lang um ein lebensechtes KI-Haustier – füttern, saubermachen und echte Spaziergänge. Sie sehen jeden Tag, ob es wirklich bereit ist.",
      trust: ["Mischling für immer kostenlos", "Keine Werbung, kein Chat mit Fremden", "Kinder brauchen keine E-Mail"],
    },
    phone: {
      petName: "Luna",
      petAge: "Welpe · 3 Monate",
      live: "LIVE",
      video: "Fotorealistisches KI-Video des Haustiers",
      actions: ["Füttern", "Wasser", "Gassi", "Putzen"],
    },
    parentCard: { child: "Mia", status: "Alles in Ordnung", scoreLabel: "Care Score", progress: "Woche 3 von 12 · 31 von 36 Routinen pünktlich" },
    notification: { app: "PetPrep", text: "Dein Haustier schaut auf seinen Futternapf. Die Frühstückszeit endet um 9:00 Uhr." },
    promoVideo: {
      eyebrow: "PetPrep in einer Minute",
      title: "Sehen Sie, wie es funktioniert.",
      text: "Von der Wahl des Haustiers und der Vertragsunterschrift über Schule, Spaziergänge und Fellpflege bis zum Zertifikat – alles, was Ihr Kind in 12 Wochen tut, und alles, was Sie im Dashboard sehen. Curio, unser Maskottchen, sagt nur Hallo; das Haustier in der App ist ein lebensechter KI-Hund.",
      alt: "PetPrep-Promovideo: App-Bildschirme, ein Kind, das sich um einen Hund kümmert, ein Elternteil, das den Care Score verfolgt.",
      note: "Das Video ist auf Englisch. Die App ist noch nicht öffentlich im App Store und bei Google Play erhältlich – melden Sie sich für den frühen Zugang an.",
    },
    promise: {
      quote: "Jede Familie hört „Ich verspreche, ich kümmere mich darum.“ PetPrep macht aus dem Versprechen einen",
      highlight: "Beweis",
      text:
        "Scheitern in der Simulation ist ein Erfolg für Ihre Familie: Sie erfahren es, bevor ein echtes Tier leidet – und bevor Sie sich auf Jahre voller Pflege und Kosten festlegen.",
    },
    how: {
      eyebrow: "So funktioniert es",
      title: "Drei Schritte von „bitte“ zu „bereit“.",
      steps: [
        {
          title: "Sie wählen das Haustier",
          text: "Legen Sie ein Familienkonto an, fügen Sie Ihr Kind nur mit einem Spitznamen hinzu und wählen Sie das Haustier – Rasse, aus dem Tierheim oder vom Züchter, Welpe oder Senior.",
        },
        {
          title: "Ihr Kind unterschreibt das Versprechen",
          text: "Ein 6-stelliger Code meldet Ihr Kind an – ohne E-Mail, ohne Passwort. Es unterschreibt den Verantwortungsvertrag mit dem Finger, und sein einzigartiges Haustier erwacht zum Leben.",
        },
        {
          title: "12 Wochen echte Pflege",
          text: "Eine echte Woche entspricht einem Monat im Leben des Haustiers. Am Ende steht ein Verantwortungszertifikat mit dem Care Score – ein objektiver Beweis oder ein ehrliches Nein.",
        },
      ],
      link: "So funktioniert es im Detail",
    },
    realism: {
      title: "So nah an einem echten Haustier, wie eine App nur sein kann.",
      text: "Fütterungszeiten, Spaziergänge und Wachstum beruhen auf Quellen wie tierärztlichen Fachverbänden und Zuchtverbänden – nicht für ein Spiel erfunden.",
      items: [
        { title: "Echte Spaziergänge, echte Schritte", text: "Der tägliche Spaziergang zählt die Schritte vom Handy Ihres Kindes. Heute gar kein Spaziergang? Das Haustier spürt es morgen." },
        { title: "Es wird erwachsen", text: "Ein Welpe frisst viermal am Tag, dann dreimal, dann zweimal – und bekommt beim Wachsen ein neues Foto." },
        { title: "Es verhält sich wie ein echtes Tier", text: "Welpen müssen raus. Gelangweilte Hunde zerkauen Hausschuhe. Erst wird saubergemacht, dann gibt es Abendessen." },
        { title: "Schule und Schlaf haben Vorrang", text: "In den Ruhezeiten pausieren die Erinnerungen. Eine Mahlzeit während der Schulzeit übernehmen Sie, nicht Ihr Kind." },
        { title: "Echte Konsequenzen, behutsam", text: "Vernachlässigung bedeutet einen Tierarztbesuch oder das Tierheim – nie beängstigend, immer mit einem Neuanfang." },
        { title: "Einzigartig", text: "Jedes Haustier bekommt sein eigenes Fell, eigene Abzeichen und Augen – fotorealistisch und nie zweimal gleich." },
      ],
    },
    parents: {
      eyebrow: "Für Eltern",
      title: "Sie sehen die Wahrheit, live.",
      text: "Eine klare Ampel für jedes Kind, ein Care Score aus pünktlich erledigten Routinen und eine Zeitleiste, wer was getan hat. Geschwister, die sich ein Haustier teilen, bekommen jeweils ihren eigenen fairen Score.",
      points: [
        { strong: "Ruhezeiten und eine Pause-Taste", text: "Sie behalten die Kontrolle." },
        { strong: "Kinder melden sich mit einem Code an", text: "keine E-Mail, kein Nachname, keine Werbung." },
        { strong: "Beide Elternteile, alle Kinder", text: "eine Familie, eine Übersicht." },
      ],
      link: "Alles, was Eltern sehen",
    },
    adults: {
      eyebrow: "Für Erwachsene",
      title: "Probieren Sie die Rasse aus, bevor sie einzieht.",
      text: "Sie haben Ihr Herz an eine bestimmte Rasse verloren? PetPrep ist nicht nur für Kinder. 12 Wochen lang kümmern Sie sich um ein KI-Haustier dieser Rasse mit seinen echten täglichen Bedürfnissen – und finden heraus, ob es wirklich zu Ihnen passt, bevor Sie kaufen oder adoptieren.",
      points: [
        {
          strong: "Die echten Bedürfnisse der Rasse",
          text: "Mahlzeiten in Zeitfenstern, Wasser, Saubermachen und ein tägliches Schrittziel auf Basis belegter Bewegungsbedürfnisse: Ein erwachsener Border Collie braucht 12.000 Schritte am Tag, ein Mischling 6.000.",
        },
        {
          strong: "Training und Missgeschicke von Welpen",
          text: "jeden Tag eine kurze Trainingseinheit und ein Welpe, der es pro Lebensmonat nur etwa eine Stunde aushält, bevor er raus muss – sonst gibt es eine Pfütze auf dem Boden.",
        },
        {
          strong: "12 Wochen zeigen, ob es zu Ihrem Leben passt",
          text: "zu Ihren Arbeitstagen, Ihrer Freizeit und dem Wetter. Weil es ein Familienhund wird, können Sie später Ihren Partner oder Ihre Kinder hinzufügen.",
        },
      ],
      how: "So starten Sie: Legen Sie ein Konto als Elternteil an, fügen Sie sich selbst als Betreuerprofil hinzu und melden Sie sich mit dem 6-stelligen Code an – auf demselben oder einem anderen Handy.",
      note: "Heute verfügbar: der kostenlose Mischling und die Hauskatze sowie in der 12-wöchigen Challenge jede Hunde- und Katzenrasse aus dem [Tierregister](page:animals).",
      link: "So nutzen Sie PetPrep allein",
    },
    after: {
      eyebrow: "Wenn es einzieht",
      title: "Wenn das echte Haustier kommt, bleibt PetPrep.",
      text: "Tippen Sie auf „Wir haben ein echtes Haustier“, und der Simulator wird zum KI-Assistenten für die kommenden Jahre – der den Rhythmus Ihrer Familie schon kennt.",
      features: [
        { title: "Smartes Halsband", text: "Aktivität und Hinweise, wenn etwas nicht stimmt." },
        { title: "KI als erste Anlaufstelle", text: "Antwortet schnell und übergibt dann an einen echten Tierarzt." },
        { title: "Wachstum und Futter", text: "Wöchentliches Gewicht, Wachstumskurve, wann das Futter gewechselt wird." },
        { title: "Vertrauenswürdige Partner", text: "Tierärzte, Trainer und Versicherer in Ihrer Nähe – klar gekennzeichnet." },
        { title: "DNA-Test", text: "Welche Rassen in Ihrem Mischling stecken – und worauf Sie achten sollten." },
        { title: "Karte für den Tierarzt", text: "Rassemix und DNA-Befunde an einem Ort, bereit für die Tierarztpraxis." },
      ],
      link: "Über den KI-Assistenten",
      planned: "In Entwicklung",
    },
    species: {
      title: "Heute Hunde und Katzen. Weitere Tierarten folgen.",
      text: "Für Familien weltweit entwickelt, in ihrer eigenen Sprache.",
      chips: [
        { label: "Hund · verfügbar", active: true, link: "species:dog" },
        { label: "Katze · verfügbar", active: true, link: "species:cat" },
        { label: "Hunde- und Katzenrassen · in der Challenge", link: "page:animals" },
        { label: "Weitere Tierarten · geplant", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Preise", title: "Einfache, faire Preise." },
    faq: { title: "Fragen, die Eltern stellen", link: "Alle Fragen" },
    final: { title: "Bereit für ein Haustier?", text: "Finden Sie es in 12 Wochen heraus. Kostenlos starten, auf iPhone oder Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "So funktioniert PetPrep – eine 12-wöchige Challenge zur Haustier-Bereitschaft",
        description:
          "So funktioniert die 12-wöchige PetPrep Challenge: Haustier wählen, Verantwortungsvertrag, tägliche Pflege, echte Spaziergänge, Ruhezeiten und das Zertifikat.",
      },
      eyebrow: "So funktioniert es",
      title: "Zwölf Wochen, die zeigen, was ein Versprechen wert ist.",
      lead:
        "Ihr Kind kümmert sich um ein fotorealistisches KI-Haustier, das sich so echt verhält, wie es in einer App nur möglich ist. Eine echte Woche entspricht einem Monat im Leben des Haustiers – in 12 Wochen wird es also erwachsen, und Sie sehen, ob die Pflege durchhält.",
      blocks: [
        {
          type: "steps",
          heading: "Vom ersten Tippen bis zum Zertifikat",
          items: [
            { title: "Die Eltern legen die Familie an", text: "Sie registrieren sich mit Ihrer E-Mail-Adresse (Anmeldung mit Apple und Google folgt). Fügen Sie jedes Kind mit einem Spitznamen und optional einem Geburtsjahr hinzu. Mehr fragen wir über Ihr Kind nicht." },
            { title: "Sie wählen das Haustier", text: "Wählen Sie die Rasse (der Mischling ist kostenlos), die Herkunft des Haustiers – aus dem Tierheim adoptiert oder vom Züchter gekauft – und sein Alter beim Einzug: Welpe, jung, erwachsen oder Senior." },
            { title: "Ihr Kind meldet sich mit einem Code an", text: "Sie erhalten einen 6-stelligen Code, der 15 Minuten gilt. Ihr Kind gibt ihn auf seinem Handy ein – ohne E-Mail und ohne Passwort. Handy verloren? Mit einem Tippen melden Sie es auf allen Geräten ab." },
            { title: "Der Verantwortungsvertrag", text: "Ihr Kind unterschreibt ein Versprechen mit dem Finger. Die Unterschrift ist die Geburt des Haustiers: Erst ab diesem Moment zählen die Bedürfnisse, es geht also nichts verloren, wenn es später unterschreibt." },
            { title: "Zwölf Wochen Pflege", text: "Füttern in den richtigen Zeitfenstern, frisches Wasser, Saubermachen und ein täglicher Spaziergang mit echten Schritten. Während das Haustier wächst, ändern sich seine Bedürfnisse." },
            { title: "Das Zertifikat", text: "Nach 12 Wochen wird das Haustier ein Jahr alt. Ihr Kind erhält ein Verantwortungszertifikat mit seinem Care Score – oder Sie beide erfahren gefahrlos, dass jetzt noch nicht der richtige Zeitpunkt ist." },
          ],
        },
        {
          type: "screens",
          heading: "Was Ihr Kind sieht",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Was ein erwachsener Mischling jeden Tag braucht",
          intro: "Die Zahlen stammen aus tierärztlichen Quellen und von Zuchtverbänden; wo Quellen nur eine Spanne nennen, legt PetPrep den Wert fest und sagt das auch.",
          head: ["Bedürfnis", "Wie oft", "Wenn es vergessen wird"],
          rows: [
            ["Futter", "Morgens (6–10 Uhr) und abends (17–21 Uhr), einmal pro Zeitfenster", "Hungrig nach etwa 12,5 Stunden"],
            ["Wasser", "3-mal am Tag, mindestens 3 Stunden Abstand", "Durstig nach etwa 10 Stunden"],
            ["Spaziergang", "6.000 echte Schritte (Welpen beginnen bei 2.000)", "Gar kein Spaziergang → am nächsten Morgen krank"],
            ["Saubermachen", "Wenn das Haustier ein Malheur macht – nie während der Ruhezeiten", "Kein Futter und kein Wasser, bis es sauber ist"],
          ],
          note: "Welpen fressen 4-, dann 3-, dann 2-mal am Tag und halten es pro Lebensmonat nur etwa eine Stunde aus. Ein [Border Collie](breed:border_collie) braucht 12.000 Schritte und wird schneller hungrig.",
        },
        {
          type: "cards",
          heading: "Für den echten Familienalltag gemacht",
          columns: 3,
          items: [
            { title: "Ruhezeiten", text: "Legen Sie Schul- und Schlafenszeiten fest. Das Haustier wird ruhiger, es gibt keine Erinnerungen, und in dieser Zeit passieren keine Malheurs." },
            { title: "Mahlzeiten während der Schule", text: "Ein Fütterungsfenster, das ganz in die Ruhezeiten fällt, ist Aufgabe der Eltern – es zählt nie gegen Ihr Kind." },
            { title: "Jederzeit pausieren", text: "Ein Tippen pausiert das Spiel, zum Beispiel für ein Familiengespräch. Während der Pause wird nichts schlechter." },
            { title: "Sanfte Erinnerungen", text: "Das Haustier erinnert Ihr Kind erst sanft, dann eindringlich. Erst wenn ein Bedürfnis eine Stunde lang bei null bleibt, bekommen Sie einen Alarm." },
            { title: "Echte Konsequenzen", text: "Vernachlässigung bedeutet 12 Stunden beim Tierarzt. Ein ganzer Tag Vernachlässigung bedeutet, dass das Tierheim das Haustier aufnimmt – und Sie können neu beginnen." },
            { title: "Geteilte Haustiere", text: "Geschwister können sich ein Haustier teilen. Jede Handlung wird dem Kind gutgeschrieben, das sie erledigt hat, damit der Score fair bleibt." },
          ],
        },
        {
          type: "callout",
          title: "Auch Scheitern ist ein Ergebnis.",
          text: "Landet das Haustier im virtuellen Tierheim, haben Sie etwas Wertvolles gelernt – bevor ein echtes Tier den Preis dafür gezahlt hat. Sie können neu beginnen, auch mit einer einfacheren Rasse.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Für Eltern – das PetPrep-Dashboard, der Care Score und Ihre Einstellungen",
        description:
          "Was Eltern in PetPrep sehen: eine tägliche Ampel pro Kind, den Care Score, Routinen, Berichte, Benachrichtigungen, Ruhezeiten, Pause und Datenschutz von Anfang an.",
      },
      eyebrow: "Für Eltern",
      title: "Objektiver Beweis statt noch eines Versprechens.",
      lead:
        "Sie müssen nicht raten, ob die Spaziergänge wirklich stattgefunden haben. PetPrep misst die Pflege an klaren täglichen Routinen und zeigt Ihnen Kind für Kind, wie es läuft.",
      blocks: [
        {
          type: "cards",
          heading: "Die Ampel",
          intro: "Jedes Kind und jedes Haustier bekommt eine Farbe für heute, in der Ortszeit Ihrer Familie – immer mit dem Grund in Worten.",
          columns: 3,
          items: [
            { title: "Grün – alles in Ordnung", text: "Die Routinen laufen nach Plan.", tag: "ok" },
            { title: "Gelb – braucht Aufmerksamkeit", text: "Heute wurden mehr als zwei Routinen verpasst.", tag: "warn" },
            { title: "Rot – dringend", text: "Das Haustier ist heute krank geworden, ein Bedürfnis steht seit über einer Stunde auf null oder das Haustier ist ins Tierheim gekommen.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Der Care Score",
          paragraphs: [
            "Care Score = pünktlich erledigte Routinen ÷ erwartete Routinen × 100, minus 10 Punkte pro Krankheit, zwischen 0 und 100.",
            "Eine Routine ist eine konkrete Aufgabe: jedes Fütterungsfenster, jede der drei Wassernachfüllungen, jedes Malheur innerhalb von zwei Stunden beseitigen (Schule und Schlaf zählen nicht) und das tägliche Spaziergangsziel erreichen.",
            "Zeit, in der Sie das Spiel pausiert haben, das Haustier beim Tierarzt war oder der Vertrag noch nicht unterschrieben war, zählt nie gegen Ihr Kind. Vergangene Tage sind eingefroren, ein Score kann also später nicht umgeschrieben werden.",
            "Geschwister, die sich ein Haustier teilen, teilen jede Routine fair auf. Es zählen nur die eigenen Handlungen eines Kindes – erledigt eines alles, bekommt es 100 und das andere 0.",
          ],
        },
        {
          type: "screens",
          heading: "Ihre Ansicht",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Sie behalten die Kontrolle",
          items: [
            "Ruhezeiten für Schule und Schlaf, in Ihrer Ortszeit – auch über die Zeitumstellung hinweg.",
            "Pausieren Sie das Spiel für jedes Haustier mit einem bestätigten Tippen; der Bildschirm Ihres Kindes wird sofort gesperrt.",
            "Laden Sie den anderen Elternteil mit einem Einmalcode ein; Sie beide sehen jedes Kind und jedes Haustier.",
            "Melden Sie ein Kind auf allen Geräten ab, wenn ein Handy verloren geht; Codes gelten nur einmal und laufen nach 15 Minuten ab.",
            "Exportieren Sie alle Daten Ihrer Familie als Datei oder löschen Sie das Profil eines Kindes oder Ihr ganzes Konto sofort in der App.",
          ],
        },
        {
          type: "list",
          heading: "Datenschutz von Anfang an",
          items: [
            "Kinder melden sich mit einem Code an – keine E-Mail, kein Passwort, kein Nachname.",
            "Wir speichern einen Spitznamen und, wenn Sie es angeben, ein Geburtsjahr. Sonst nichts über Ihr Kind.",
            "Benachrichtigungen enthalten nie den Namen Ihres Kindes oder des Haustiers, weil sie auf dem Sperrbildschirm erscheinen können.",
            "Schritte kommen aus Apple Health (iPhone) oder Health Connect (Android), wenn Sie es erlauben (nur Lesezugriff), und, wo verfügbar, vom Bewegungssensor des Handys. PetPrep nutzt kein GPS und verfolgt keinen Standort.",
            "Keine Werbung, kein Chat mit Fremden, Server in der EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Wenn es einzieht – der PetPrep-KI-Assistent für Ihr echtes Haustier",
        description:
          "Wenn Ihre Familie ein echtes Haustier bekommt, wird PetPrep zum KI-Assistenten: Aktivität vom smarten Halsband, Hinweise, KI als erste Anlaufstelle mit echtem Tierarzt, Wachstum und Futter.",
      },
      eyebrow: "Wenn es einzieht",
      title: "Die Simulation endet. Die Fürsorge nicht.",
      lead:
        "Wenn Ihre Familie ein echtes Haustier nach Hause holt, macht ein Tippen aus PetPrep einen Assistenten für das ganze Leben des Tieres – in Echtzeit, ohne Statusbalken und mit dem Alltag Ihrer Familie schon vertraut.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Was der Assistent können wird",
          columns: 2,
          items: [
            { title: "Anbindung smarter Halsbänder", text: "Verbinden Sie gängige GPS- und Aktivitätstracker – oder ein PetPrep-Halsband – und sehen Sie die Aktivität im Zusammenhang." },
            { title: "Hinweise, die erklären", text: "„Max ist heute 2 km gelaufen, halb so viel wie sonst, und hatte eine größere Mahlzeit. Ein zusätzlicher Abendspaziergang hilft ihm, zur Ruhe zu kommen.“ Eine Beobachtung, ein Grund, ein Vorschlag." },
            { title: "Zuerst die KI, dann der echte Tierarzt", text: "Stellen Sie eine Frage oder laden Sie ein Foto hoch. Der Assistent beantwortet allgemeine Fragen, schätzt die Dringlichkeit ein und übergibt bei Bedarf an einen echten Tierarzt – dringende Anzeichen gehen direkt an eine Tierarztpraxis." },
            { title: "DNA-Test für Ihren Hund oder Ihre Katze", text: "Bestellen Sie einen DNA-Test in der App oder laden Sie das Ergebnis eines vorhandenen Tests hoch. PetPrep zeigt, welche Rassen im Mix stecken, was für sie typisch ist und welche Gesundheitsprobleme bei diesen Rassen häufiger vorkommen – mit Quellen. Rassenanteile sind keine Diagnose, und ein DNA-Test zeigt keine Allergien." },
            { title: "Eine Karte für den Tierarzt", text: "Der Rassemix und direkte DNA-Befunde auf einer Seite oder als QR-Code, damit Ihr Tierarzt sofort weiß, was in einem Mischling steckt." },
            { title: "Wachstum und Ernährung", text: "Tragen Sie wöchentlich das Gewicht ein, sehen Sie die Wachstumskurve und erhalten Sie eine Erinnerung, wenn es Zeit für ein anderes Futter ist." },
          ],
        },
        {
          type: "screens",
          heading: "Eine Vorschau",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Grundsätze, bei denen wir keine Kompromisse machen",
          items: [
            "Der KI-Assistent ist kein Tierarzt und stellt nie eine Diagnose. Jede Gesundheitsantwort enthält einen Weg zu einem echten Tierarzt.",
            "Partnerangebote (Shops, Versicherer, Trainer, Tierärzte) sind immer gekennzeichnet, und wir legen offen, wenn wir eine Provision erhalten.",
            "Ohne Ihre Einwilligung wird nichts mit einem Partner geteilt.",
            "Die Daten Ihres Kindes aus der Challenge gehen nur dann in den Assistenten über, wenn Sie zustimmen.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Preise – PetPrep kostenlos starten, 49,99 € für die 12-wöchige Challenge",
        description:
          "Der Mischling ist für immer kostenlos. Die 12-wöchige PetPrep Challenge kostet 49,99 € pro Haustier als Einmalkauf. Ein Preis für Geschwister, die sich ein Haustier teilen.",
      },
      eyebrow: "Preise",
      title: "Einfache, faire Preise.",
      lead: "Starten Sie kostenlos mit einem Mischling. Kaufen Sie die vollständige 12-wöchige Challenge, wenn Sie bereit sind – die 12 Wochen beginnen mit dem Kauf.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Wünsche – Dinge für Ihr Haustier",
          intro:
            "In der App wünscht sich Ihr Kind Dinge für sein Haustier; Sie entscheiden und kaufen. Ihr Kind sieht nie einen Preis. Die Artikel sind rein optisch: Sie ändern nie die Bedürfnisse, den Care Score oder das Zertifikat. Auch für den kostenlosen Mischling und die Hauskatze erhältlich.",
          head: ["Artikel", "Preis"],
          rows: [
            ["Bett (Katze: Körbchen)", "5,99 €"],
            ["Futter- und Wassernapf", "5,99 €"],
            ["Spielzeug (Hund: Tauspielzeug oder Quietschspielzeug, Katze: Plüschmaus oder Federangel)", "5,99 € pro Spielzeug"],
            ["Leckerlis, 10er-Packung", "2,99 €"],
            ["Willkommenspaket: Bett + Näpfe + Spielzeug", "15,99 € (statt 17,97 €)"],
          ],
          note: "Wünsche kommen mit dem nächsten App-Update; sie können gekauft werden, sobald die Artikel im App Store und bei Google Play verfügbar sind. Die Preise gelten für Slowenien; der Store zeigt den Preis für Ihr Land.",
        },
        {
          type: "faq",
          heading: "Fragen zu den Preisen",
          items: [
            { q: "Ist die kostenlose Version wirklich kostenlos?", a: "Ja. Der Mischling ist für immer kostenlos, mit der vollständigen Simulation, echten Spaziergängen und dem Eltern-Dashboard." },
            { q: "Was ist in der Challenge enthalten?", a: "Anspruchsvolle Rassen wie der [Border Collie](breed:border_collie), die Stimmungen Ihres Haustiers als KI-Videos, das Verantwortungszertifikat am Ende und Zugang für beide Elternteile." },
            { q: "Zahlen Geschwister doppelt?", a: "Nein. Kinder, die sich ein Haustier teilen, zahlen einen Preis. Ein zweites Haustier in der Familie ist eine eigene Challenge." },
            { q: "Wie bezahle ich?", a: "In der App, über den App Store oder Google Play. Erstattungen laufen über Ihr Store-Konto." },
            { q: "Was sind Wünsche, und kann mein Kind allein etwas kaufen?", a: "Ihr Kind kann sich ein Bett, Näpfe, ein Spielzeug oder Leckerlis für sein Haustier wünschen – bis zu drei offene Wünsche gleichzeitig. Sie bekommen eine Benachrichtigung und kaufen den Artikel oder wählen „Jetzt nicht“. Ihr Kind sieht nie Preise und kann in der Kinder-App nichts kaufen." },
            { q: "Machen gekaufte Artikel das Spiel leichter?", a: "Nein. Die Artikel sind rein optisch. Sie ändern nie die Bedürfnisse, den Care Score oder das Zertifikat, und unter den Wünschen gibt es weder Tierarzt noch Medizin – niemals „Zahl, um dein Haustier zu retten“." },
            { q: "Gilt das auch für Erwachsene?", a: "Ja. Wenn Sie PetPrep allein nutzen, um eine Rasse auszuprobieren, gilt dasselbe: Der Mischling ist für immer kostenlos, und die 12-wöchige Challenge kostet 49,99 € pro Haustier." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Häufige Fragen – was Eltern über PetPrep wissen möchten",
        description:
          "Antworten zu PetPrep: Zeitaufwand pro Tag, Nutzung als Erwachsener, Datenschutz und Standort, Schritte, Geschwister, was passiert, wenn ein Kind scheitert, Sprachen, Tierarten, echte Haustiere.",
      },
      eyebrow: "Häufige Fragen",
      title: "Fragen, die Eltern stellen.",
      lead: "Kurze, ehrliche Antworten. Fehlt etwas? Schreiben Sie uns.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Für welches Alter ist PetPrep gedacht?", a: "Für Kinder ist es auf etwa 7 bis 12 Jahre ausgelegt und funktioniert gut bis 16. Auch Erwachsene nutzen es, um zu prüfen, ob eine bestimmte Rasse wirklich zu ihnen passt, bevor sie kaufen oder adoptieren." },
            { q: "Kann ich PetPrep allein nutzen, ohne Kinder?", a: "Ja. Legen Sie ein Konto als Elternteil an und fügen Sie sich selbst als Betreuerprofil hinzu – ein Spitzname genügt, lassen Sie das Geburtsjahr leer. Wählen Sie die Rasse, erstellen Sie einen 6-stelligen Code und wählen Sie dann auf demselben oder einem anderen Handy „I'm a kid“ („Ich bin ein Kind“) und geben Sie den Code ein – so werden Sie zur betreuenden Person. Weil es ein Familienhund wird, können Sie später Ihren Partner oder Ihre Kinder hinzufügen und sich gemeinsam kümmern. Der Preis ist derselbe wie für Familien." },
            { q: "Wie viel Zeit kostet es pro Tag?", a: "Ein paar Minuten für Futter, Wasser und Saubermachen – plus den Spaziergang, den ein echter Hund ohnehin bräuchte." },
            { q: "Verfolgt die App den Standort meines Kindes?", a: "Nein. Für Spaziergänge zählt sie nur Schritte. Wenn Sie es erlauben, liest sie diese aus Apple Health (iPhone) oder Health Connect (Android) – nur lesend und nur Schritte; wo verfügbar, nutzt sie auch den Bewegungssensor des Handys. Die Berechtigung wird auf dem Spaziergang-Bildschirm abgefragt. GPS wird nicht genutzt." },
            { q: "Braucht mein Kind eine E-Mail-Adresse?", a: "Nein. Sie legen das Konto an; Ihr Kind meldet sich mit einem 6-stelligen Code an, den Sie erzeugen. Wir speichern nur einen Spitznamen und optional ein Geburtsjahr." },
            { q: "Was passiert, wenn mein Kind etwas vergisst?", a: "Das Haustier schickt zuerst sanfte Erinnerungen. Bleibt ein Bedürfnis bei null, wird das Haustier krank und verbringt 12 Stunden beim Tierarzt. Nach einem ganzen Tag ohne Pflege nimmt es das virtuelle Tierheim auf – und Sie können neu beginnen." },
            { q: "Können Geschwister sich ein Haustier teilen?", a: "Ja. Jedes Kind unterschreibt seinen eigenen Vertrag, jede Handlung wird dem Kind gutgeschrieben, das sie erledigt hat, und jedes Kind bekommt seinen eigenen fairen Care Score." },
            { q: "Was ist mit Schule und Schlafenszeit?", a: "Legen Sie Ruhezeiten fest. Das Haustier wird ruhiger, es wird nichts gesendet, und Mahlzeiten, die ganz in die Ruhezeiten fallen, übernehmen Sie." },
            { q: "Macht es Kindern Angst?", a: "Nein. Die Konsequenzen sind echt, aber behutsam: Das Haustier kommt zum Tierarzt oder ins Tierheim, nie etwas Drastisches, und es gibt immer einen Neuanfang." },
            { q: "Welche Tiere gibt es?", a: "Heute [Hunde](species:dog) und [Katzen](species:cat): einen kostenlosen Mischling und eine Hauskatze sowie in der 12-wöchigen Challenge jede Rasse aus dem [Tierregister](page:animals), in dem auch ihre belegten Bedürfnisse stehen. Weitere Tierarten sind geplant." },
            { q: "In welchen Sprachen?", a: "Die App gibt es heute auf Englisch und Slowenisch. Weitere Sprachen kommen hinzu, wenn PetPrep in neuen Ländern startet." },
            { q: "Was passiert, wenn wir ein echtes Haustier bekommen?", a: "PetPrep kann zum KI-Assistenten für Ihr echtes Haustier werden. Dieser Teil ist in Entwicklung." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partner – mit PetPrep zusammenarbeiten",
        description:
          "PetPrep arbeitet mit Zoofachhandel, Tierheimen, Tierärzten, Trainern, Versicherern, Halsbandherstellern und Schulen zusammen, damit Familien Haustiere verantwortungsvoll anschaffen.",
      },
      eyebrow: "Partner",
      title: "Besser vorbereitete Familien – für alle, denen Tiere am Herzen liegen.",
      lead:
        "Familien, die PetPrep abschließen, wissen, was ein Haustier wirklich bedeutet. Wir bauen ein Partnernetzwerk auf, das sie im richtigen Moment erreicht – klar gekennzeichnet und immer mit Einwilligung der Familie.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Mit wem wir zusammenarbeiten",
          columns: 3,
          items: [
            { title: "Zoofachhandel", text: "Erreichen Sie Familien in dem Moment, in dem sie beweisen, dass sie bereit sind – zum Beispiel mit einem Starterset-Angebot beim Zertifikat." },
            { title: "Tierheime, Tierschutzvereine und Züchter", text: "Empfehlen Sie PetPrep vor der Adoption oder dem Kauf – für weniger impulsive Entscheidungen und weniger Rückgaben." },
            { title: "Tierärzte", text: "Sobald das echte Haustier einzieht, beantwortet der KI-Assistent erste Fragen und verweist Halter an Sie, mit einer Fallzusammenfassung, die nur mit Einwilligung geteilt wird." },
            { title: "Trainer und Hundeschulen", text: "Empfehlungen und Buchungen, wenn eine Familie zu einem echten Hund wechselt." },
            { title: "Tierversicherer", text: "Rassespezifische Angebote, wenn ein echtes Haustier registriert wird – klar gekennzeichnet." },
            { title: "Hersteller von Halsbändern und IoT-Geräten", text: "Einbindung von Aktivitätsdaten für intelligentere Hinweise mit Begründung." },
          ],
        },
        {
          type: "list",
          heading: "Warum Partner uns vertrauen",
          items: [
            "Kinder melden sich ohne E-Mail an, und wir halten ihre Daten auf einem Minimum, auf Servern in der EU.",
            "Nur geprüfte Inhalte erreichen den Bildschirm eines Kindes; es gibt keine Werbung.",
            "Jedes Partnerangebot ist gekennzeichnet, und jede Provision wird der Familie offengelegt.",
          ],
        },
        { type: "callout", title: "Lassen Sie uns sprechen.", text: "Die Partnerschaftsbedingungen werden gerade erarbeitet. Erzählen Sie uns, wer Sie sind und was Sie vorhaben.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "In PetPrep investieren – von der Haustier-Bereitschaft zur lebenslangen Tierbetreuung",
        description:
          "PetPrep macht aus dem Versprechen eines Kindes einen Beweis, bevor eine Familie ein Haustier bekommt, und wird dann zum KI-Assistenten für dessen ganzes Leben. Vor dem Start; Unterlagen auf Anfrage.",
      },
      eyebrow: "Investoren",
      title: "Von einer 12-wöchigen Challenge zu einer Beziehung über 10–15 Jahre.",
      lead:
        "PetPrep gibt Eltern einen objektiven Beweis, ob ihr Kind bereit für ein echtes Haustier ist – und begleitet die Familie danach das ganze Leben des Tieres lang.",
      blocks: [
        {
          type: "cards",
          heading: "Die Chance",
          columns: 3,
          items: [
            { title: "Problem", text: "Kinder versprechen, sich um ein Haustier zu kümmern; Eltern haben keine neutrale Möglichkeit, das zu prüfen, bevor sie Geld und Jahre der Pflege investieren." },
            { title: "Lösung", text: "Eine realistische 12-wöchige Simulation mit einem Live-Eltern-Dashboard und einem objektiven Care Score, die mit einem Verantwortungszertifikat endet." },
            { title: "Erweiterung", text: "Sobald das echte Haustier einzieht, ein KI-Assistent dafür: Halsbanddaten, KI als erste Anlaufstelle mit Tierärzten, Wachstum und Ernährung, DNA-Tests, Partnerleistungen." },
          ],
        },
        {
          type: "table",
          heading: "Geschäftsmodell",
          head: ["Einnahmequelle", "Modell", "Status"],
          rows: [
            ["Mischling", "Für immer kostenlos (Kundengewinnung)", "Beschlossen"],
            ["12-wöchige PetPrep Challenge", "49,99 € pro Haustier, Einmalkauf", "Beschlossen"],
            ["Wünsche – Dinge für das Haustier (rein optisch)", "In-App-Käufe: 5,99 € pro Artikel, Leckerlis 2,99 € für 10, Paket 15,99 €; auch in der kostenlosen Version", "Gebaut, Store-Kauf folgt in Kürze"],
            ["Partnerangebote", "Provisionen von Shops, Versicherern, Tierärzten und Trainern", "Geplant"],
            ["KI-Assistent für das echte Haustier", "Abonnement", "Geplant"],
            ["DNA-Tests für Hunde und Katzen", "Testverkauf und Partnerprovision", "Geplant"],
          ],
        },
        {
          type: "list",
          heading: "Was bereits gebaut ist",
          items: [
            "Serverseitige Spiel-Engine mit Echtzeit-Synchronisierung, getestet mit Simulationen ganzer Tage, Tagen der Zeitumstellung und Sonderfällen in Familien.",
            "Familien mit mehreren Elternteilen, mehreren Kindern und geteilten Haustieren, mit fairer Bewertung pro Kind.",
            "Einzigartige fotorealistische KI-Haustiere mit gemessenen und gedeckelten KI-Kosten, Medien auf unseren eigenen Servern in der EU.",
            "Bedürfnisse der Haustiere auf Basis zitierter tierärztlicher Quellen und Zuchtverbände, jede Zahl bis zu ihrer Quelle nachvollziehbar.",
            "Kindersicherheit von Anfang an: PIN-Anmeldung ohne E-Mail, minimale Daten, keine Werbung, nur geprüfte Medien.",
          ],
        },
        {
          type: "prose",
          heading: "Phase",
          paragraphs: [
            "PetPrep steht vor dem Start, eine geschlossene Beta ist geplant. Erster Markt sind Slowenien und die Region, danach folgen DACH und Großbritannien; das Produkt ist von Anfang an für eine weltweite Lokalisierung gebaut.",
            "Gründer: David Tacer, Softwareentwickler und Unternehmer (Data Vallis David Tacer s.p., Dravograd, Slowenien). Mehr [über uns](page:about).",
          ],
        },
        { type: "callout", title: "Fordern Sie die Investoren-Unterlagen an.", text: "Investoren-Brief, Pitch-Deck und Datenraum teilen wir auf Anfrage.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "PetPrep kontaktieren – Familien, Datenschutz, Partner, Investoren",
        description: "Kontakt zu PetPrep: Fragen von Familien, Datenschutzanfragen, Partnerschaften und Anfragen von Investoren. Wir antworten auf Englisch oder Slowenisch.",
      },
      eyebrow: "Kontakt",
      title: "Wir lesen jede Nachricht.",
      lead: "Schreiben Sie an das passende Postfach, und wir antworten so schnell wie möglich, auf Englisch oder Slowenisch.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Angaben zum Unternehmen" }],
    },
    privacy: {
      navLabel: "Datenschutz",
      meta: {
        title: "Datenschutzerklärung – PetPrep",
        description: "Wie PetPrep personenbezogene Daten von Eltern und Kindern erhebt, verwendet und schützt und wie Sie Ihre Rechte nach der DSGVO ausüben.",
      },
      eyebrow: "Rechtliches",
      title: "Datenschutzerklärung",
      lead: "Übersetzung – verbindlich ist die englische Fassung. PetPrep ist vor allem für Kinder gemacht, deshalb erheben wir so wenig wie möglich und erklären genau, was wir damit tun.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Wer verantwortlich ist",
              paragraphs: [
                "Verantwortlicher für die personenbezogenen Daten, die über die PetPrep-App und diese Website verarbeitet werden, ist {company}, {address}; {companyIds}. Kontakt für Datenschutzfragen: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Was wir erheben",
              items: [
                "Elternkonto: Name (wie Ihre Familie Sie nennt), E-Mail-Adresse, Passwort (nur als sicherer Hash gespeichert), die Zeitzone Ihres Geräts sowie der Zeitpunkt, zu dem Sie die Nutzungsbedingungen und diese Erklärung akzeptiert haben.",
                "Betreuerprofil (ein Kind oder ein Erwachsener, der sich um das Haustier kümmert): ein Spitzname mit bis zu 30 Zeichen und optional ein Geburtsjahr – bei Erwachsenen leer. Keine E-Mail, kein Passwort, kein Nachname, kein Geburtsdatum.",
                "Geräte: das Handymodell (zum Beispiel „iPhone“, nie ein Name, den der Nutzer dem Handy gegeben hat) sowie für Benachrichtigungen ein Push-Token, die Plattform und die App-Version.",
                "Pflegeaktivität: Handlungen in der Simulation (Füttern, Wasser, Saubermachen, Spaziergänge), tägliche Schrittsummen (bzw. Summen der Rollstuhlschübe im angepassten Modus – siehe Abschnitte 3 und 4), Scores und Berichte.",
                "Der Verantwortungsvertrag: die Fingerunterschrift des Kindes, gespeichert als Vektorlinie mit dem Zeitpunkt der Unterschrift.",
                "Codes: Anmelde- und Einladungscodes werden nur als Hashes gespeichert und laufen ab.",
                "Fehlerberichte der App: Wenn die App hängt oder abstürzt, kann sie einen kurzen technischen Bericht an unseren Server in der EU senden (Fehlertyp und -text, Stelle im Code, App- und Betriebssystemversion, Name des Bildschirms, Rolle Eltern/Kind). Er enthält keinen Namen, keine E-Mail-Adresse, keine Nutzer-ID und keine IP-Adresse, wird an keine Dritten weitergegeben und nach 30 Tagen gelöscht.",
                "Liste für den frühen Zugang (diese Website): Ihre E-Mail-Adresse, die Sprache der Seite und der Zeitpunkt Ihrer Anmeldung.",
              ],
            },
            {
              heading: "3. Gesundheits- und Fitnessdaten (Schritte, Apple Health und Health Connect)",
              paragraphs: [
                "PetPrep greift auf genau eine Art von Gesundheits- und Fitnessdaten zu und erhebt sie: wie viele Schritte die betreuende Person täglich geht (körperliche Aktivität). Wir nutzen sie nur für eine Funktion – den täglichen Spaziergang des Haustiers in der Simulation: Das Kind geht, und seine Schritte zählen als Spaziergang des Haustiers.",
                "Wie wir darauf zugreifen: Die App auf dem Handy des Kindes zählt Schritte. Wenn Sie es im Berechtigungsdialog des Systems erlauben, liest sie diese aus Apple Health (iPhone) oder Health Connect (Android) – nur lesend und nur Schritte. Wo verfügbar, nutzt sie auch den Bewegungssensor des Handys (Android: Berechtigung „Körperliche Aktivität“; iPhone: „Bewegung & Fitness“); ohne Berechtigung für Apple Health oder Health Connect zählt nur der Bewegungssensor.",
                "Was wir erheben: Die App sendet unserem Server nur die heutige Schrittsumme, ihre Quelle (Apple Health, Health Connect oder Bewegungssensor) und den Zeitpunkt der Übermittlung. Wir speichern eine Tagessumme pro Betreuerprofil – nie einzelne Bewegungen, Routen, Standort, Herzfrequenz, Schlaf, Gewicht oder andere Gesundheitsdaten. Wir schreiben nie etwas in Apple Health oder Health Connect.",
                "Wie wir sie nutzen und weitergeben: Schrittsummen werden nur verwendet, um den Spaziergang in der Simulation abzubilden und ihn den Eltern zu zeigen (Dashboard und Berichte). Wir nutzen sie nicht für Werbung, Profilbildung, Gesundheitsbewertungen oder das Training von KI-Modellen, wir verkaufen sie nicht und geben sie nicht an Dritte weiter; nur unser Hosting-Anbieter (Hetzner, Server in der EU) speichert sie in unserem Auftrag. Unsere Nutzung von Daten aus Health Connect entspricht der Health-Connect-Berechtigungsrichtlinie einschließlich ihrer Anforderungen zur eingeschränkten Nutzung (Limited Use).",
                "Rechtsgrundlage und Speicherdauer: Das Auslesen der Schritte ist freiwillig und erfolgt nur mit der Berechtigung, die Sie auf dem Gerät erteilen; wir verarbeiten die Tagessumme, um den von Ihnen gewählten Dienst zu erbringen (Vertragserfüllung). Schrittsummen sind im Datenexport Ihrer Familie enthalten und werden zusammen mit dem Betreuerprofil oder Ihrem Konto gelöscht; aus unseren verschlüsselten Backups verschwinden sie spätestens nach 35 Tagen.",
                "Sie können die Berechtigung jederzeit in den Geräteeinstellungen widerrufen: iPhone → Einstellungen → Health → Datenzugriff & Geräte → PetPrep; Android → Health Connect → App-Berechtigungen → PetPrep. Die Berechtigung für den Bewegungssensor können Sie in den Handyeinstellungen der PetPrep-App widerrufen. Der Spaziergang zählt dann keine neuen Schritte mehr.",
              ],
            },
            {
              heading: "4. Angepasster Modus (Rollstuhlschübe)",
              paragraphs: [
                "Der angepasste Modus ist für Kinder, die einen Rollstuhl nutzen: Der Spaziergang zählt dann Rollstuhlschübe statt Schritte. Er kommt mit dem nächsten App-Update in die App; im Folgenden beschreiben wir, welche Daten wir verarbeiten, wenn ein Elternteil ihn einschaltet.",
                "Schaltet ein Elternteil den angepassten Modus für ein Kind ein, speichern wir nur die Tatsache, dass er eingeschaltet ist. Wir fragen nicht nach einem Grund, einer Diagnose oder einem Gesundheitszustand und speichern nichts davon.",
                "Solange er eingeschaltet ist, liest die App auf dem Handy des Kindes statt Schritten nur Rollstuhlschübe – aus Apple Health (von einer Apple Watch erfasst) oder Health Connect, mit einer eigenen Berechtigung nur zum Lesen. Den Bewegungssensor nutzt sie dann nicht. Nur die heutige Zahl der Schübe geht an unseren Server; wir vermerken für diesen Tag, dass Schübe gezählt werden.",
                "Ein Elternteil kann für ein Kind im angepassten Modus Spaziergangsminuten eintragen (nur für heute). Wir speichern das Datum, die Zahl der Minuten und welcher Elternteil den Spaziergang eingetragen hat.",
                "Da die Tatsache, dass der angepasste Modus eingeschaltet ist, auf einen Gesundheitszustand des Kindes hindeuten kann, verarbeiten wir sie nur auf Grundlage Ihrer ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die Sie als Elternteil oder gesetzlicher Vertreter im Namen des Kindes (Art. 8 DSGVO) durch Einschalten des Schalters erteilen. Sie können den Modus jederzeit ausschalten; die App zählt dann wieder Schritte.",
                "Diese Daten (der Schalter, in Schüben gezählte Tage und eingetragene Spaziergänge) sind im Datenexport Ihrer Familie enthalten und werden zusammen mit dem Profil des Kindes oder Ihrem Konto gelöscht; aus unseren verschlüsselten Backups verschwinden sie wie alle anderen Daten spätestens nach 35 Tagen.",
              ],
            },
            {
              heading: "5. Was wir nicht erheben",
              items: [
                "Keinen Standort: PetPrep nutzt kein GPS.",
                "Keine weiteren Gesundheitsdaten aus Apple Health oder Health Connect außer der täglichen Schrittzahl oder Zahl der Rollstuhlschübe.",
                "Keine Werbung und keine Werbe- oder Tracking-SDKs Dritter in der App.",
                "Keinen Chat zwischen Nutzern.",
                "Keine Werbe-Cookies auf dieser Website. Analyse-Cookies werden nur gesetzt, wenn Sie sie erlauben (siehe Cookies unten).",
              ],
            },
            {
              heading: "6. Warum wir Daten verarbeiten (Zwecke und Rechtsgrundlagen)",
              items: [
                "Um den von Ihnen gewünschten Dienst zu erbringen: Konten, die Simulation, das Dashboard, Berichte und Benachrichtigungen (Vertragserfüllung).",
                "Um Käufe über den App Store oder Google Play abzuwickeln (Vertragserfüllung).",
                "Für den täglichen Spaziergang (tägliche Schrittsummen – Gesundheits- und Fitnessdaten, siehe Abschnitt 3): Vertragserfüllung; Auslesen aus Apple Health, Health Connect oder dem Bewegungssensor nur mit der Berechtigung, die Sie auf dem Gerät erteilen.",
                "Für den angepassten Modus (die Tatsache, dass er eingeschaltet ist, Rollstuhlschübe und eingetragene Spaziergänge): die ausdrückliche Einwilligung der Eltern durch Einschalten des Schalters (Art. 9 Abs. 2 lit. a und Art. 8 DSGVO – siehe Abschnitt 4).",
                "Um den Dienst sicher zu halten, zum Beispiel durch Begrenzung wiederholter Anmeldeversuche (berechtigtes Interesse).",
                "Um den Dienst mit Fehlerberichten der App zu betreiben und abzusichern, die uns helfen, Hänger und Abstürze zu beheben (berechtigtes Interesse).",
                "Um gesetzliche Pflichten zu erfüllen, etwa die Buchführung über Käufe (rechtliche Verpflichtung).",
                "Um Sie per E-Mail über den Start von PetPrep zu informieren, wenn Sie sich für den frühen Zugang eingetragen haben (Einwilligung – Sie können sich in jeder E-Mail abmelden).",
                "Um mit Google Analytics zu verstehen, wie Besucher diese Website nutzen, nur wenn Sie Analyse-Cookies erlauben (Einwilligung – Sie können sie jederzeit unter Cookie-Einstellungen ändern).",
              ],
            },
            {
              heading: "7. Kinder",
              paragraphs: [
                "Nur ein Elternteil oder gesetzlicher Vertreter kann ein Konto anlegen und ein Kind hinzufügen. Die Eltern entscheiden, was das Kind tun kann, und können das Profil des Kindes jederzeit löschen. Wir fragen ein Kind nie nach Kontaktdaten, zeigen nie Werbung und erlauben nie Kontakt mit Fremden.",
                "Der Kontoinhaber kann auch für sich selbst oder für einen anderen Erwachsenen in der Familie ein Betreuerprofil anlegen – zum Beispiel, um vor dem Kauf oder der Adoption zu prüfen, ob eine Rasse passt. Für ein solches Profil gelten dieselben Regeln und dieselben minimalen Daten; jeder Schutz, der für Kinder gedacht ist, gilt auch dafür.",
              ],
            },
            {
              heading: "8. KI-generierte Bilder und Videos",
              paragraphs: [
                "Foto und kurze Videos jedes Haustiers werden von einem KI-Dienst ausschließlich aus einer Beschreibung des Haustiers erstellt (Rasse, Fell, Abzeichen und Ähnliches). Die Beschreibung enthält nie Namen oder Informationen über Ihre Familie. Fertige Medien werden auf unseren eigenen Servern in der EU gespeichert und über kurzlebige Links angezeigt.",
              ],
            },
            {
              heading: "9. Dienstleister",
              items: [
                "Hosting: Hetzner Online (Server in der EU).",
                "Erstellung von KI-Bildern und -Videos: fal.ai (erhält nur die Beschreibung des Haustiers).",
                "Push-Benachrichtigungen: Apple Push Notification service und Firebase Cloud Messaging über Expo; Benachrichtigungen enthalten keine Namen.",
                "Käufe: Apple App Store und Google Play; Kaufverwaltung über RevenueCat, sobald Käufe freigeschaltet sind.",
                "E-Mails zum frühen Zugang: Klaviyo (erhält nur die E-Mail-Adresse und die Sprache, die Sie auf dieser Website angeben).",
                "Cookie-Einwilligung auf der Website: CookieYes (speichert Ihre Einwilligungsentscheidung).",
                "Website-Analyse: Google Analytics 4 von Google Ireland Ltd., nur mit Ihrer Einwilligung; IP-Adressen werden von Google Analytics 4 nicht gespeichert.",
              ],
            },
            {
              heading: "10. Wie lange wir Daten speichern",
              paragraphs: [
                "Wir speichern Ihre Daten, solange Ihr Konto besteht. Wenn Sie das Profil eines Kindes oder Ihr Konto in der App löschen, werden die Daten sofort gelöscht und können nicht wiederhergestellt werden; aus unseren verschlüsselten Backups verschwinden sie automatisch spätestens nach 35 Tagen. Aufzeichnungen, die wir gesetzlich aufbewahren müssen (zum Beispiel zu Käufen), werden für die gesetzlich vorgeschriebene Dauer aufbewahrt. Fehlerberichte der App werden nach 30 Tagen automatisch gelöscht.",
              ],
            },
            {
              heading: "11. Ihre Rechte",
              paragraphs: [
                "Sie haben das Recht auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung Ihrer Daten, auf Einschränkung der Verarbeitung und Widerspruch gegen sie sowie auf Beschwerde bei einer Aufsichtsbehörde – in Slowenien beim Informationsbeauftragten (Informacijski pooblaščenec). In der App können Sie alle Daten Ihrer Familie als Datei exportieren (Control → Account → Export my data) und das Profil eines Kindes oder Ihr ganzes Konto löschen. Für alles andere schreiben Sie an {privacyEmail}.",
              ],
            },
            {
              heading: "12. Sicherheit",
              paragraphs: [
                "Passwörter und Codes werden als Hashes gespeichert, Verbindungen sind verschlüsselt, Live-Updates gehen nur an Mitglieder Ihrer Familie, und KI-Medien werden geprüft, bevor sie den Bildschirm eines Kindes erreichen.",
              ],
            },
            {
              heading: "13. Änderungen",
              paragraphs: ["Über wichtige Änderungen informieren wir Sie in der App, bevor sie wirksam werden. Das Datum oben zeigt die aktuelle Fassung."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Notwendige Cookies halten die Website funktionsfähig und speichern Ihre Einwilligungsentscheidung. Analyse-Cookies (Google Analytics) werden nur gesetzt, wenn Sie sie im Banner erlauben, und Sie können Ihre Entscheidung jederzeit ändern.",
            "Die folgende Tabelle wird automatisch aus dem letzten Scan dieser Website erstellt und listet daher immer die Cookies, die wir tatsächlich verwenden.",
          ],
          settings: "Cookie-Einstellungen ändern",
          fallback: "Die Cookie-Liste wird mit dem Einwilligungsbanner geladen. Wenn Sie sie nicht sehen, erlauben Sie Skripte auf dieser Seite oder schreiben Sie an {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Nutzungsbedingungen",
      meta: {
        title: "Nutzungsbedingungen – PetPrep",
        description:
          "Die Bedingungen für die Nutzung der PetPrep-App und -Website: Konten und Kinderprofile, die 12-wöchige Challenge und das Zertifikat, Käufe und Erstattungen, KI-Inhalte, angepasster Modus, faire Nutzung, Löschung und anwendbares Recht.",
      },
      eyebrow: "Rechtliches",
      title: "Nutzungsbedingungen",
      lead: "Übersetzung – verbindlich ist die englische Fassung. Die Regeln für die Nutzung von PetPrep, so geschrieben, dass man sie auch liest.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Der Dienst",
              paragraphs: [
                "PetPrep wird bereitgestellt von {company}, {address}; {companyIds} – demselben Unternehmen, das nach der Datenschutzerklärung Verantwortlicher ist. Diese Bedingungen gelten für die PetPrep-App und die Website petprep.si.",
                "PetPrep ist eine Simulation der Haustierpflege. Sie hilft Familien und Einzelpersonen herauszufinden, ob sie bereit sind, sich um ein echtes Haustier zu kümmern – Kindern und Erwachsenen, die vor dem Kauf oder der Adoption prüfen möchten, ob eine Rasse zu ihnen passt. Sie ist ein Lernwerkzeug und keine tierärztliche oder sonstige fachliche Beratung.",
              ],
            },
            {
              heading: "2. Konten, Profile und Kinder",
              items: [
                "Konten werden von Erwachsenen angelegt: von Eltern, gesetzlichen Vertretern oder Erwachsenen, die PetPrep für sich selbst nutzen. Mit der Registrierung stimmen Sie diesen Bedingungen und der Datenschutzerklärung zu.",
                "Betreuende Personen (Kinder oder Erwachsene) kümmern sich über ein Betreuerprofil um das Haustier, das der Kontoinhaber anlegt – auch für sich selbst. Ein Profil braucht nur einen Spitznamen und optional ein Geburtsjahr – mehr brauchen wir über ein Kind nicht, also geben Sie bitte nirgends in der App mehr ein.",
                "Ein Kind meldet sich mit einem 6-stelligen Code (PIN) an, den Sie in Ihrer App erstellen. Der Code ist kurzlebig und funktioniert nur einmal; geben Sie ihn nur dem Kind, für das er bestimmt ist.",
                "Als Elternteil oder gesetzlicher Vertreter sind Sie dafür verantwortlich, wie Ihr Kind PetPrep nutzt: ob es zu ihm passt, wie viel Zeit es damit verbringt und ob es bei Spaziergängen sicher ist (zum Beispiel im Straßenverkehr). Sie können das Spiel für jedes Haustier jederzeit anhalten.",
                "Sie können einen anderen Elternteil mit einem Einladungscode in die Familie einladen; beide sehen alle Daten der Familie und beide können das Spiel anhalten.",
                "Machen Sie richtige Angaben und halten Sie Ihr Passwort, Ihre Codes und Geräte sicher.",
              ],
            },
            {
              heading: "3. Die 12-wöchige Challenge, der Care Score und das Zertifikat",
              items: [
                "Die Challenge dauert 12 Wochen (84 Programmtage) und beginnt mit dem Kauf; jede betreuende Person hat ihr eigenes Ende. Zeit, in der das Spiel auf die Zahlung wartet, zählt nicht zu den 12 Wochen.",
                "Der Care Score (0–100) zeigt, welchen Anteil der erwarteten Routinen (Füttern, Wasser, Saubermachen, Spaziergang, eine Trainingseinheit) die betreuende Person selbst erledigt hat; jede Krankheit des Haustiers senkt ihn. Zeiten, in denen das Spiel angehalten ist oder das Haustier beim Tierarzt ist, sowie Ruhezeiten zählen nie gegen die betreuende Person.",
                "Nach 12 Wochen wird ein Endergebnis festgehalten, das sich später nicht mehr ändert; Pflege nach der Challenge wirkt sich nicht darauf aus. Mit einem Score von 70 oder mehr können Sie in der App ein Verantwortungszertifikat (PDF) erstellen; unter 70 erhalten Sie einen Challenge-Bericht.",
                "Bleibt Futter, Wasser oder Sauberkeit 24 Stunden lang bei 0 %, wird das Haustier „ins Tierheim gebracht“ (Spielende). Das Spiel mit diesem Haustier endet, es gibt kein Zertifikat, und Sie erhalten einen Challenge-Bericht.",
                "Der Care Score und das Zertifikat zeigen nur, wie sich die betreuende Person in der App um ein simuliertes Haustier gekümmert hat. Sie sind keine Garantie dafür, dass ein Kind oder sonst jemand bereit für ein echtes Haustier ist, keine fachliche Beurteilung und kein Ersatz für Ihr eigenes Urteil oder den Rat eines Tierarztes, Züchters oder Tierheims. Die Entscheidung über ein echtes Haustier liegt immer bei Ihnen.",
                "Die Spielregeln (Mahlzeiten, Spaziergänge und Pflege nach Rasse und Alter) sind vereinfacht und beruhen auf öffentlichen Quellen. Sie sind keine tierärztliche Beratung; fragen Sie zu Gesundheit und Pflege eines echten Tieres einen Tierarzt.",
              ],
            },
            {
              heading: "4. Kostenlose und kostenpflichtige Funktionen, Käufe und Erstattungen",
              items: [
                "Der Mischling und die Hauskatze sind für immer kostenlos und der Weg, PetPrep auszuprobieren; eine kostenlose Testphase der Challenge gibt es nicht. Ein kostenloses Haustier hat kein 12-wöchiges Programm und kein Zertifikat, die Eltern sehen den Verlauf der letzten 7 Tage, und das Haustier hat einen Grundbestand an Bildern und Videos.",
                "Die 12-wöchige PetPrep Challenge mit einer kostenpflichtigen Rasse ist ein Einmalkauf (49,99 € in Slowenien; der Store zeigt den Preis für Ihr Land). Ein Kauf ist eine Challenge für ein Haustier; jede neue Challenge mit einem neuen Haustier ist ein neuer Kauf. Geschwister, die sich um dasselbe Haustier kümmern, zahlen einmal.",
                "Ein Elternteil kauft in der eigenen App über den App Store oder Google Play; in der App des Kindes gibt es keine Käufe. Der Store wickelt die Zahlung nach seinen eigenen Bedingungen ab.",
                "Sie können ein Challenge-Haustier vor dem Kauf anlegen. Bis die Challenge bezahlt ist, ist das Spiel pausiert: Das Haustier wartet sicher, seine Bedürfnisse sinken nicht und nichts wird schlechter. Nach dem Kauf geht das Spiel dort weiter, wo es angehalten hat.",
                "Erstattungen wickeln der App Store und Google Play nach ihren eigenen Regeln ab; beantragen Sie sie in dem Store, in dem Sie gekauft haben. Erstattet der Store einen Kauf, bevor die Challenge abgeschlossen ist, wird das Spiel dieses Haustiers wieder pausiert. Bilder und Videos, die nach dem Kauf erstellt wurden, bleiben erhalten.",
                "Nach einem Spielende (Tierheim) schaltet ein Kauf das Haustier nicht frei; eine neue Challenge ist ein neues Haustier und ein neuer Kauf.",
                "Wünsche (Dinge für das Haustier, sobald verfügbar): Ein Kind kann sich etwas wünschen, aber nur ein Elternteil kann es kaufen, in der eigenen App. Ein gekaufter Artikel gehört zu dem Haustier, für das er gekauft wurde, und ist rein optisch – er beeinflusst weder das Spiel noch den Score oder das Zertifikat. Nach einem Spielende oder wenn das Haustier gelöscht wird, bleibt der Kauf verbraucht und wird nicht erstattet. Erstattet der Store den Kauf, wird der Artikel entfernt (bei Leckerlis die nicht verbrauchten Leckerlis).",
                "Wenn Sie ein Haustier, ein Kind oder das Konto löschen, während eine gekaufte Challenge noch läuft, bleibt der Kauf verbraucht: Er geht nicht auf ein anderes Haustier über, und Löschen ist keine Erstattung. Die App warnt Sie vorher und bittet um Bestätigung.",
              ],
            },
            {
              heading: "5. KI-generierte Bilder und Videos",
              items: [
                "Bilder und Videos der Haustiere werden von künstlicher Intelligenz (KI) ausschließlich aus einer Beschreibung des Haustiers (Rasse, Farbe, Fell usw.) erzeugt, nie aus Daten über Ihre Familie. Sie sind Illustrationen eines simulierten Haustiers und entsprechen möglicherweise nicht genau einem echten Tier oder einem Rassestandard.",
                "Wo wir sie öffentlich zeigen, etwa die Rasseporträts auf dieser Website, sind sie als KI-generiert gekennzeichnet.",
                "Ein Erscheinungsbild ist nicht unbedingt einzigartig: Haustiere derselben kostenpflichtigen Rasse und Farbe können dieselben Bilder und Videos haben, und kostenlose Haustiere bekommen eines der gemeinsamen Erscheinungsbilder ihrer Rasse. Eine kostenpflichtige Challenge enthält mehr Videos als ein kostenloses Haustier.",
                "Nach der Vertragsunterschrift oder einem Kauf kann die Vorbereitung der Bilder und Videos einige Minuten dauern; in der Zwischenzeit zeigt die App, dass sich das Haustier bereit macht, und markiert, was noch vorbereitet wird.",
                "Rasseangaben in der App und im Tierregister auf dieser Website sind aus den von uns zitierten öffentlichen Quellen zusammengefasst und nicht von einem Tierarzt geprüft.",
              ],
            },
            {
              heading: "6. Schritte, Gesundheitsdaten und angepasster Modus",
              items: [
                "Der tägliche Spaziergang zählt die echten Schritte der betreuenden Person. Wenn Sie es erlauben, liest die App sie aus Apple Health oder Health Connect, nur lesend (sie schreibt dort nie etwas), oder vom Bewegungssensor des Handys. Welche Daten wir verarbeiten, beschreibt die Datenschutzerklärung (Abschnitt 3).",
                "Der angepasste Modus ist für Kinder, die einen Rollstuhl nutzen: Der Spaziergang zählt dann Rollstuhlschübe statt Schritte. Sie können ihn nutzen, wenn die Funktion in Ihrer Version der App verfügbar ist. Ein Elternteil schaltet ihn für ein einzelnes Kind ein; das Einschalten ist Ihre Einwilligung, das Ausschalten widerruft sie (Datenschutzerklärung, Abschnitt 4).",
                "Im angepassten Modus kann ein Elternteil für das Kind Spaziergangsminuten eintragen, nur für heute. Sie sind für diese Einträge verantwortlich: Tragen Sie nur Spaziergänge ein, die wirklich stattgefunden haben, denn sie zählen für den Care Score und das Zertifikat.",
                "PetPrep nutzt keinen Standort und warnt nicht vor Gefahren während eines Spaziergangs; für sichere Spaziergänge sind Sie verantwortlich.",
              ],
            },
            {
              heading: "7. Benachrichtigungen",
              paragraphs: [
                "Wenn Sie es auf dem Gerät erlauben, sendet die App Push-Benachrichtigungen: Erinnerungen an die betreuende Person, Hinweise an die Eltern, wenn ein Haustier kein Futter, kein Wasser oder keine Sauberkeit hat, sowie Nachrichten über Krankheit, Spielende und das Ende der Challenge. Benachrichtigungen enthalten nie den Namen des Kindes oder des Haustiers und werden während der Ruhezeiten nicht gesendet. Sie können die Berechtigung jederzeit in den Geräteeinstellungen widerrufen; ohne Benachrichtigungen verpasst eine betreuende Person möglicherweise Routinen, was sich auf das Spiel und den Score auswirkt.",
              ],
            },
            {
              heading: "8. Faire Nutzung",
              items: [
                "Versuchen Sie nicht, die Schritt- oder Schubzählung zu manipulieren, Spaziergänge einzutragen, die nicht stattgefunden haben, auf Daten anderer Familien zuzugreifen, den Dienst zurückzuentwickeln (Reverse Engineering) oder zu stören.",
                "Geben Sie Haustieren keine beleidigenden oder unangemessenen Namen, und geben Sie keine personenbezogenen Daten über ein Kind ein, nach denen die App nicht fragt.",
                "Wir können Konten einschränken oder sperren, die gegen diese Regeln verstoßen oder Kinder gefährden, und einen unangemessenen Haustiernamen entfernen.",
              ],
            },
            {
              heading: "9. Geistiges Eigentum",
              paragraphs: [
                "PetPrep, sein Logo, Design, seine Software und Inhalte gehören {company}. Sie dürfen die App sowie die Bilder, Videos und das Zertifikat Ihres Haustiers für den persönlichen, nicht kommerziellen Gebrauch Ihrer Familie nutzen – zum Beispiel, um sie mit Verwandten zu teilen.",
              ],
            },
            {
              heading: "10. Haftung",
              paragraphs: [
                "Wir arbeiten daran, dass PetPrep verfügbar und korrekt ist, der Dienst wird jedoch so bereitgestellt, wie er ist; er ist auch auf Dienste Dritter angewiesen (die App-Stores, Apple Health, Health Connect, Push-Benachrichtigungen, den KI-Dienst), die wir nicht kontrollieren. Soweit gesetzlich zulässig, haften wir nicht für mittelbare Schäden oder für Entscheidungen über den Kauf oder die Adoption eines echten Haustiers. Nichts in diesen Bedingungen schränkt Rechte ein, die Ihnen als Verbraucher nach zwingendem Recht zustehen.",
              ],
            },
            {
              heading: "11. Konto löschen und Nutzung beenden",
              paragraphs: [
                "Sie können das Profil eines Kindes oder Ihr Konto jederzeit in der App löschen. Die Löschung erfolgt sofort und dauerhaft; löscht der letzte Elternteil einer Familie sein Konto, wird die ganze Familie gelöscht. Sie können Ihre Daten vorher exportieren (Control → Account → Export my data). Was mit den Daten geschieht, beschreibt die Datenschutzerklärung; was mit einem Kauf geschieht, beschreibt Abschnitt 4.",
              ],
            },
            {
              heading: "12. Änderungen dieser Bedingungen",
              paragraphs: [
                "Wir aktualisieren diese Bedingungen, wenn sich die App oder das Recht ändert. Über wichtige Änderungen informieren wir Sie in der App, bevor sie wirksam werden. Das Datum oben zeigt die aktuelle Fassung. Wenn Sie mit einer Änderung nicht einverstanden sind, können Sie Ihr Konto jederzeit löschen.",
              ],
            },
            {
              heading: "13. Recht und Streitigkeiten",
              paragraphs: [
                "Für diese Bedingungen gilt das Recht der Republik Slowenien. Verbraucher können sich auch auf die zwingenden Schutzvorschriften des Landes berufen, in dem sie leben, und die EU-Plattform zur Online-Streitbeilegung nutzen.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Fragen zu diesen Bedingungen: {termsEmail}. Anbieter des Dienstes: {company}, {address}; {companyIds}. Fragen zum Datenschutz: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Kindersicherheit",
      meta: {
        title: "Kindersicherheit – wie PetPrep Kinder schützt",
        description:
          "Wie PetPrep Kinder schützt: Konten nur durch Eltern, Anmeldung per Code ohne E-Mail, minimale Daten, keine Werbung und kein Chat, keine Standortverfolgung, geprüfte Medien.",
      },
      eyebrow: "Vertrauen",
      title: "Für Kinder gebaut – ab der ersten Zeile Code.",
      lead: "Übersetzung – verbindlich ist die englische Fassung. Ein Kind ist der wichtigste Nutzer von PetPrep, deshalb sind Sicherheit und Datenschutz Produktregeln, keine Einstellungen.",
      blocks: [
        {
          type: "cards",
          heading: "Unsere Standards",
          columns: 2,
          items: [
            { title: "Eltern legen jedes Konto an", text: "Kinder können sich nicht selbst registrieren. Ein Elternteil fügt das Kind hinzu und erzeugt einen einmaligen Anmeldecode, der 15 Minuten gilt." },
            { title: "Keine E-Mail und kein Passwort für Kinder", text: "Ein Kind meldet sich mit dem Code der Eltern an. Falsche, abgelaufene und bereits benutzte Codes bekommen alle dieselbe Antwort, sodass niemand erraten kann, welche Kinder es gibt." },
            { title: "Minimale Daten", text: "Ein Spitzname und optional ein Geburtsjahr. Kein Nachname, kein Geburtsdatum, keine Fotos des Kindes." },
            { title: "Keine Werbung, kein Chat, keine Fremden", text: "Es gibt keine Werbung und keine Möglichkeit, andere Nutzer zu kontaktieren." },
            { title: "Keine Standortverfolgung", text: "Spaziergänge zählen nur Schritte – aus Apple Health oder Health Connect (mit Ihrer Erlaubnis, nur lesend) oder vom Bewegungssensor des Handys. GPS wird nicht genutzt." },
            { title: "Private Live-Updates", text: "Echtzeit-Updates erreichen nur die Kinder, die sich um dieses Haustier kümmern, und die Eltern derselben Familie." },
            { title: "Geprüfte Medien", text: "Gezeigt werden nur Bilder und Videos, die für PetPrep erstellt und von unserem Server geprüft wurden, aus unserem eigenen Speicher in der EU." },
            { title: "Benachrichtigungen ohne Namen", text: "Benachrichtigungen enthalten nie den Namen des Kindes oder des Haustiers, weil sie auf dem Sperrbildschirm erscheinen können." },
          ],
        },
        {
          type: "list",
          heading: "Eltern behalten die Kontrolle",
          items: [
            "Ruhezeiten für Schule und Schlaf, ohne Benachrichtigungen.",
            "Eine Pause-Taste, die den Bildschirm des Kindes sofort sperrt.",
            "Ein Kind auf allen Geräten gleichzeitig abmelden.",
            "Alle Daten sofort in der App exportieren oder löschen.",
          ],
        },
        { type: "callout", title: "Ein Anliegen melden", text: "Wenn Sie etwas in PetPrep beunruhigt, schreiben Sie uns – wir antworten vorrangig.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Barrierefreiheit",
      meta: {
        title: "Barrierefreiheit – PetPrep für jedes Kind",
        description:
          "Wie sich PetPrep an Kinder anpasst, denen Wischgesten schwerfallen, die VoiceOver oder TalkBack nutzen oder weniger Bewegung bevorzugen – mit denselben Regeln und Punkten für alle.",
      },
      eyebrow: "Vertrauen",
      title: "Jedes Kind kann sich um sein Haustier kümmern.",
      lead: "Manchen Kindern fallen Wischgesten schwer, manche nutzen einen Screenreader, andere mögen weniger Bewegung auf dem Bildschirm. PetPrep passt sich ihnen an – mit denselben Regeln, denselben Punkten und demselben Zertifikat wie für alle anderen.",
      blocks: [
        {
          type: "cards",
          heading: "In der App",
          columns: 3,
          items: [
            { title: "Einfachere Gesten", text: "Statt zu wischen, hält das Kind den Finger gedrückt oder tippt auf eine Taste – in jedem Wischspiel: Bürsten, Federangel, Katzenstreu wechseln und Ball werfen. Ein Elternteil schaltet diese Option im Elternbereich für jedes Kind einzeln ein." },
            { title: "Screenreader", text: "Wenn VoiceOver oder TalkBack aktiv ist, wechseln die Spiele von selbst zum Gedrückthalten. Der Kopfbereich mit dem Haustier liest alles über das Haustier vor, und jeder Schritt in den Pflegespielen ist eine eigene Taste." },
            { title: "Weniger Bewegung", text: "Ist das Handy auf „Bewegung reduzieren“ eingestellt, stehen pulsierende Tasten und das schaukelnde Curio still." },
          ],
        },
        {
          type: "cards",
          heading: "Mit dem nächsten App-Update",
          items: [
            { title: "Spaziergänge im Rollstuhl", text: "Im angepassten Modus zählen Rollstuhlschübe genau wie Schritte – ein Schub ist ein Schritt. Ein Elternteil kann auch die heutigen Spaziergangsminuten eintragen, damit das Kind nichts zusätzlich tun muss. Ein Elternteil schaltet ihn für jedes Kind einzeln ein, und das Ausschalten entfernt die Markierung aus dem Verlauf." },
          ],
        },
        { type: "callout", title: "Dieselbe Challenge für alle", text: "Anpassungen ändern, wie ein Kind spielt, nie, was zählt. Scores, Zeiten und das Verantwortungszertifikat funktionieren genau gleich. Wir fragen nie, warum ein Kind eine Anpassung braucht.", tone: "mint" },
        { type: "callout", title: "Etwas funktioniert für Ihr Kind nicht?", text: "Sagen Sie uns, was im Weg war, und wir sehen es uns an.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Konto löschen",
      meta: {
        title: "PetPrep-Konto und Daten löschen",
        description:
          "So löschen Sie Ihr PetPrep-Konto (Data Vallis) in der App oder per E-Mail: welche Daten gelöscht werden, was aufbewahrt wird und wie lange.",
      },
      eyebrow: "Vertrauen",
      title: "Ihr PetPrep-Konto löschen",
      lead: "Übersetzung – verbindlich ist die englische Fassung. PetPrep wird von Data Vallis entwickelt. Sie können Ihr Konto und die Daten Ihrer Familie jederzeit löschen – sofort in der App oder per E-Mail, wenn Sie die App nicht mehr haben.",
      blocks: [
        {
          type: "steps",
          heading: "Konto in der App löschen (sofort)",
          items: [
            { title: "Als Elternteil anmelden", text: "Öffnen Sie PetPrep, tippen Sie auf „I'm a parent“ („Ich bin ein Elternteil“) und melden Sie sich an." },
            { title: "Ihr Konto öffnen", text: "Gehen Sie zu Controls → Account. Optional: Tippen Sie zuerst auf „Export my data“, um eine Kopie zu behalten." },
            { title: "Löschen", text: "Tippen Sie auf „Delete account“, bestätigen Sie mit Ihrem Passwort (oder Ihrer Google- oder Apple-Anmeldung), geben Sie DELETE ein und tippen Sie dann auf „Delete for good“." },
            { title: "Fertig", text: "Die Löschung erfolgt sofort und kann nicht rückgängig gemacht werden. Alle Ihre Geräte und die Geräte Ihrer Kinder werden abgemeldet." },
          ],
        },
        {
          type: "prose",
          heading: "Keine App mehr? Löschung per E-Mail beantragen",
          paragraphs: [
            "Schreiben Sie von der E-Mail-Adresse Ihres PetPrep-Elternkontos an [privacy@petprep.si](mailto:privacy@petprep.si), Betreff „Delete my account“ (Konto löschen). Wir prüfen, ob die Anfrage vom Kontoinhaber stammt, löschen das Konto spätestens innerhalb eines Monats (meist innerhalb weniger Tage) und bestätigen es per E-Mail.",
            "Um nur das Profil eines Kindes zu löschen, melden Sie sich als Elternteil an und öffnen das Kind unter Controls → Children → Delete profile.",
          ],
        },
        {
          type: "table",
          heading: "Was gelöscht wird und was bleibt",
          head: ["Daten", "Was geschieht"],
          rows: [
            ["Ihr Elternkonto (Name, E-Mail, Passwort, Verknüpfung mit der Google- oder Apple-Anmeldung)", "Sofort gelöscht"],
            ["Wenn Sie der einzige Elternteil der Familie sind: Kinderprofile (Spitzname, Geburtsjahr), Haustiere, KI-Bilder und -Videos, Verträge und Unterschriften, Pflegeprotokoll, Care Scores, Zertifikate, Schrittzahlen, Ruhezeiten, Anmeldecodes", "Sofort gelöscht"],
            ["Wenn ein anderer Elternteil in der Familie bleibt", "Nur Ihr Konto wird gelöscht; die Familie bleibt beim anderen Elternteil"],
            ["Geräte und Benachrichtigungs-Tokens", "Sofort abgemeldet und gelöscht"],
            ["Kaufbelege (Produkt, Datum, Transaktions-ID des Stores, eine anonyme Kauf-ID – kein Name, keine E-Mail)", "So lange aufbewahrt, wie Buchhaltungs- und Steuerrecht es verlangen, nicht mehr mit Ihrer Familie verknüpft"],
            ["Aufzeichnungen zu KI-Kosten", "Für die Buchhaltung aufbewahrt, ohne Verbindung zu Ihnen, Ihren Kindern oder Ihren Haustieren"],
            ["Verschlüsselte Backups", "Automatisch innerhalb von 35 Tagen entfernt"],
          ],
          note: "Die Käufe selbst wickeln der App Store und Google Play ab; deren Aufzeichnungen bewahren Apple und Google nach ihren eigenen Richtlinien auf. Eine gekaufte, aber nicht abgeschlossene Challenge wird beim Löschen des Kontos nicht erstattet.",
        },
        { type: "callout", title: "Fragen?", text: "Schreiben Sie an privacy@petprep.si. Einzelheiten finden Sie in unserer Datenschutzerklärung.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "PetPrep-Tierregister – Tierarten und Rassen, mit Quellen",
        description:
          "Hunde, Katzen und ihre Rassen: was jede braucht, zu wem sie passt und wie PetPrep sie simuliert. Rassen suchen und vergleichen; jede Angabe verlinkt ihre Quelle.",
      },
      navLabel: "Tiere",
      eyebrow: "Tierregister",
      title: "Lernen Sie das Tier kennen, bevor es einzieht.",
      lead:
        "Was jede Tierart und Rasse in PetPrep wirklich braucht – von Zuchtverbänden, Katzenzuchtverbänden, tierärztlichen Hilfsorganisationen und Studien, jede Quelle verlinkt. Dazu die Regeln, nach denen PetPrep sie simuliert.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Über PetPrep – Unternehmen, Gründer und woher unsere Tierfakten stammen",
        description:
          "Wer PetPrep macht: Data Vallis David Tacer s.p. aus Dravograd, Slowenien, Gründer David Tacer, unsere Mission und wie das Tierregister seine Angaben belegt und prüft.",
      },
      navLabel: "Über uns",
      eyebrow: "Über uns",
      title: "Wer PetPrep macht.",
      lead: "PetPrep entsteht in Maribor, Slowenien, bei einem kleinen Softwareunternehmen. Auf dieser Seite erfahren Sie, wer wir sind, warum wir PetPrep bauen und wie wir entscheiden, was die App und das Tierregister über Tiere sagen.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Das Unternehmen",
          paragraphs: [
            "PetPrep ist ein Produkt von Data Vallis David Tacer s.p., einem Softwareentwicklungsunternehmen (Einzelunternehmen) mit Sitz in Dravograd, Slowenien. Dasselbe Unternehmen betreibt diese Website und die PetPrep-App und ist Verantwortlicher für die personenbezogenen Daten (siehe [Datenschutzerklärung](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Der Gründer",
          paragraphs: [
            "Gegründet wurde PetPrep von David Tacer, Softwareentwickler und Unternehmer aus Maribor, Slowenien.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Unsere Mission",
          paragraphs: [
            "Jede Familie hört „Ich verspreche, ich kümmere mich darum.“ PetPrep macht aus diesem Versprechen einen Beweis: 12 Wochen lang kümmert sich ein Kind – oder ein Erwachsener, der sich eine bestimmte Rasse wünscht – um ein lebensechtes KI-Haustier mit den täglichen Bedürfnissen eines echten Tieres, und die Eltern sehen jeden Tag, ob die Pflege durchhält.",
            "Auch Scheitern in der Simulation ist ein gutes Ergebnis: Die Familie erfährt es, bevor ein echtes Tier leidet und bevor sie sich auf Jahre voller Pflege und Kosten festlegt. Wenn dann ein echtes Haustier einzieht, soll PetPrep für das ganze Leben des Tieres nützlich bleiben.",
          ],
        },
        {
          type: "list",
          id: "methodik",
          heading: "Wie das Tierregister entsteht",
          intro: "Das [Tierregister](page:animals) und die App nutzen dieselben Daten. Diese Regeln bestimmen, was darin stehen darf:",
          items: [
            "Jede Angabe nennt ihre Quelle und verlinkt sie. Quellen werden danach eingestuft, wie viel Gewicht sie verdienen: A – Rassestandards, begutachtete Fachartikel und Leitlinien tierärztlicher Fachverbände; B – Ratgeberseiten von Tierkliniken, Universitäten und nationalen Tierschutzorganisationen; C – Sekundärzusammenfassungen (Enzyklopädien, Presseartikel), nur zusammen mit einer A- oder B-Quelle verwendet.",
            "Nur belegte Angaben werden als Fakten gezeigt. Ein Wert, den keine Quelle stützt, wird nicht veröffentlicht. Wo sich Quellen widersprechen, wird jede mit ihrem eigenen Wert gezeigt.",
            "Spielregeln sind keine tierärztliche Beratung. Wo das Spiel eine Zahl braucht, die Quellen nicht genau angeben (zum Beispiel ein tägliches Schrittziel), legt PetPrep sie anhand der Quellen fest und zeigt sie nur unter „So simuliert PetPrep es“, gekennzeichnet als Spielregel.",
            "Gesundheitshinweise dienen nur der Information. Sie fassen zusammen, was die Quellen über eine Rasse sagen, und wurden nicht von einem Tierarzt geprüft. Bei einem echten Tier fragen Sie einen Tierarzt.",
            "Rassestandards werden in eigenen Worten zusammengefasst, nie ausführlich kopiert, und keine Rasse wird als „hypoallergen“ bezeichnet.",
            "Das Register wird aus den Recherchedaten von PetPrep erzeugt – denselben Daten, die die App nutzt. Ändert sich eine Quelle oder ein Wert, wird das Register neu exportiert, und jede Rasseseite zeigt das Datum ihrer letzten Aktualisierung. Wenn Sie einen Fehler entdecken, schreiben Sie an hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Fragen zu PetPrep?", text: "Schreiben Sie an das passende Postfach auf der Kontaktseite – Familien, Datenschutz, Partner oder Investoren.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Curio kennenlernen – das PetPrep-Maskottchen",
        description:
          "Curio ist das Maskottchen von PetPrep: der neugierige kleine Würfel aus unserem Logo und der Star unserer kurzen Videos. Wer es ist, wie es sich vom lebensechten Haustier in der App unterscheidet, Bilder und ein Medienkit.",
      },
      navLabel: "Curio kennenlernen",
      eyebrow: "Unser Maskottchen",
      title: "Das ist Curio.",
      lead: "Curio ist der neugierige kleine Würfel aus dem PetPrep-Logo, zum Leben erweckt. In unseren kurzen Videos spielt es das Haustier, das an der Tür wartet, bis jemand sein Versprechen hält. Es ist unser Maskottchen – nicht das Haustier, um das Sie sich in der App kümmern.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, das PetPrep-Maskottchen: ein weicher grafitfarbener Würfel mit großen weißen Augen, einer kleinen himbeerroten Nase und einem mintgrünen Halsband, winkend.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Wer ist Curio?",
          paragraphs: [
            "Curio begann als Zeichen in unserem Logo: ein abgerundetes grafitfarbenes Quadrat mit zwei großen Augen, die nach rechts oben schauen, und einer kleinen himbeerroten Nase. Auf Slowenisch nennen wir es Radovednež – „der Neugierige“. Im Oktober 2026 bekam es kurze Arme, stämmige Beinchen und ein mintgrünes Halsband mit runder Marke und wurde zu einer Figur.",
            "Curio hat keinen Mund. Alles, was es fühlt, zeigt sich in seinen Augen: weit offen, wenn jemand „Gassi?“ flüstert, zwei müde Striche, wenn noch niemand nach Hause gekommen ist, fröhliche Bögen, wenn der Napf voll ist.",
            "Curio ist ein „Es“ – weder Junge noch Mädchen, weder Hund noch Katze. Es steht für jedes Haustier, das jeden Tag darauf wartet, dass jemand sein Versprechen hält.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio auf einen Blick",
          columns: 3,
          items: [
            { title: "Name", text: "Curio auf Englisch, Radovednež auf Slowenisch." },
            { title: "Gemacht aus", text: "Weichem Grafit, einem mintgrünen Halsband und einer himbeerroten Marke – den PetPrep-Farben." },
            { title: "Spricht", text: "Nie. Nur mit den Augen." },
            { title: "Liebt", text: "Spaziergänge, einen vollen Napf und Kinder, die auch am 15. Tag wiederkommen." },
            { title: "Lebt", text: "In unseren kurzen Videos auf [TikTok](https://www.tiktok.com/@petprep.si) und [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Aufgabe", text: "Familien mit einem Augenzwinkern daran erinnern, dass ein Haustier jeden einzelnen Tag Pflege braucht." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio ist nicht das Haustier in der App",
          intro: "In unseren Videos spielt Curio ein Haustier, das Pflege braucht – denn das braucht jedes Haustier. In PetPrep kümmern sich Kinder – und Erwachsene, die eine Rasse ausprobieren – um etwas, das dem Original viel näher kommt.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, das gezeichnete Maskottchen, winkt vor hellem Hintergrund.",
              label: "Maskottchen",
              title: "Curio – unser Maskottchen",
              text: "Eine Comicfigur für unsere Videos, Sticker und diese Seite. Sie zeigt, worum es bei PetPrep geht. Adoptieren kann man sie nicht.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Ein lebensechtes, KI-generiertes Porträt eines Labrador Retrievers, so wie Haustiere in der PetPrep-App aussehen.",
              label: "In der App · KI-Bild",
              tone: "mint",
              title: "Ihr Haustier in PetPrep",
              text: "Eine lebensechte KI-Simulation einer echten Rasse – wie dieser [Labrador Retriever](+breed:labrador_retriever) – mit den täglichen Bedürfnissen eines echten Tieres: Mahlzeiten, Wasser, Spaziergänge in echten Schritten, Saubermachen und Training. Sehen Sie, [wie es funktioniert](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio in Bildern",
          intro: "Curio ist eine stilisierte 3D-Figur, die mit KI-Werkzeugen nach unserem eigenen Design entsteht. Neue Szenen erscheinen zuerst in unseren Videos.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio winkt vor mintgrünem Hintergrund.", caption: "Hallo! Das klassische Winken.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio steht auf einem weißen Regal und winkt.", caption: "Auf dem Regal – und wartet auf jemanden." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio von vorn, von der Seite und von hinten, mit vier Augenausdrücken.", caption: "Von allen Seiten – und wie seine Augen Gefühle zeigen." },
            { src: "/curio/curio-waving.webp", alt: "Curio auf transparentem Hintergrund.", caption: "Freigestellt – bereit für Ihren Beitrag (siehe Medienkit).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Medienkit",
          intro: "Für Creator, Journalisten und Partner, die über PetPrep schreiben. Fragen oder Ideen für eine Zusammenarbeit: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Alles herunterladen", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, transparenter Hintergrund", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, quadratisch, hell", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, quadratisch, mintgrün", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Character Sheet", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "PetPrep-Logo", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "PetPrep-Bildmarke", meta: "SVG" },
          ],
          rulesHeading: "Curio verwenden",
          rules: [
            "Verwenden Sie Curio in Beiträgen, Artikeln und Videos über PetPrep. Für Werbung, Produkte oder Merchandise fragen Sie uns bitte vorher.",
            "Zeigen Sie Curio, wie es ist: grafitfarbener Würfel, weiße Augen, himbeerrote Nase, mintgrünes Halsband. Fügen Sie keinen Mund, keine Ohren, kein Fell und keine Augenbrauen hinzu, und ändern Sie weder seine Farben noch seine Proportionen.",
            "Curio ist das PetPrep-Maskottchen. Stellen Sie es nicht als das Haustier in der App oder als echten Hund oder echte Katze dar.",
            "Verwenden Sie Curio nicht so, dass der Eindruck entsteht, PetPrep unterstütze ein anderes Produkt, Anliegen oder eine andere Person.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Fragen zu Curio",
          items: [
            { q: "Ist Curio ein Hund oder eine Katze?", a: "Weder noch. Curio ist ein kleiner Würfel aus unserem Logo. In unseren Videos spielt es ein Haustier, gehört aber zu keiner Tierart." },
            { q: "Kann mein Kind sich in der App um Curio kümmern?", a: "Nein. In der App kümmert sich Ihre Familie um ein lebensechtes Haustier einer echten Rasse, mit denselben täglichen Bedürfnissen wie das echte Tier. Curio erscheint nur in unseren Videos und auf der Website." },
            { q: "Warum hat Curio keinen Mund?", a: "Weil unser Logo keinen hat. Curio sagt alles mit den Augen – und bettelt nie laut um Leckerlis." },
            { q: "Wo sehe ich neue Curio-Videos?", a: "Auf TikTok und Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Ratgeber – was Hunde und Katzen fressen dürfen, mit Quellen | PetPrep",
        description:
          "Welche Lebensmittel für Hunde und Katzen giftig, riskant oder unbedenklich sind – der Grund, die Anzeichen und was zu tun ist, jede Quelle verlinkt. Von PetPrep für Familien, die sich auf ein Haustier vorbereiten.",
      },
      navLabel: "Ratgeber",
      eyebrow: "Ratgeber",
      title: "Was ist sicher für Ihr Haustier?",
      lead:
        "Klare, belegte Antworten für Familien: welche Lebensmittel giftig sind, welche riskant und welche als Leckerli in Ordnung – für Hunde und Katzen, weitere Tierarten folgen. Jede Antwort verlinkt ihre Quellen.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Kostenlose Ausmalbilder mit Hunden und Katzen zum Ausdrucken | PetPrep",
        description:
          "Kostenlose Ausmalbilder für Kinder zum Ausdrucken: Golden Retriever, Labrador, Border Collie, Mischlingswelpe, Kätzchen und Curio. PDFs in A4 und US Letter, jedes mit einem echten Wissenstipp zur Tierpflege und seiner Quelle.",
      },
      navLabel: "Ausmalbilder",
      eyebrow: "Ausmalbilder",
      title: "Kostenlose Ausmalbilder zum Ausdrucken.",
      lead:
        "Hunde, Katzen und Curio zum Ausmalen oder Abmalen – drucken Sie ein einzelnes Blatt oder das ganze Malbuch. Auf jedem Blatt steht zum gemeinsamen Lesen ein echter Wissenstipp zur Tierpflege – aus einer tierärztlichen Quelle oder von einem Zuchtverband.",
      blocks: [{ type: "coloringHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – die Bewegung, die mit einem echten Kind begann",
        description:
          "„We could go walk your pet.“ Ein Kind hat es gesagt, und jetzt ist es eine Bewegung: Familien gehen nach draußen, weil ein Haustier seinen Spaziergang braucht. Wie es begann, was es in PetPrep bedeutet und wie Sie mitmachen.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Diesen Satz haben nicht wir erfunden. Ein Kind war es. Jetzt ist er eine Einladung an jede Familie: Gehen Sie nach draußen, weil ein Haustier seinen Spaziergang braucht – ein echtes oder das, mit dem Sie in PetPrep üben.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Story-Karte: „Overheard at the founder's house.“ Ein Kind sagt „Lahko bi šli walk your pet“ – „Wir könnten ‚walk your pet‘ gehen“ – und der Titel lautet „#walkyourpet is a thing now.“", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Wie es begann",
          paragraphs: [
            "Im Oktober 2026 hatten die Kinder unseres Gründers eine Freundin zu Besuch. Sie überlegten, ob sie rausgehen sollten, und sie sagte, halb auf Slowenisch und halb auf Englisch: „Lahko bi šli walk your pet“ – „Wir könnten ‚walk your pet‘ gehen.“",
            "Niemand hatte sie darum gebeten. Sie kannte PetPrep, wo der Spaziergang eines Hundes nur zählt, wenn man wirklich nach draußen geht, und „walk your pet“ war für sie einfach zu einem Grund geworden, rauszugehen. Uns gefiel das so sehr, dass wir es behalten haben – auf Englisch, für jede Sprache.",
            "Echtes Gespräch. Echte Kinder.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Was es in PetPrep bedeutet",
          intro: "In PetPrep besteht der tägliche Spaziergang des Hundes aus den echten Schritten Ihres Kindes, die aus Apple Health oder Health Connect gelesen werden, wenn Sie es erlauben. Auf dem Sofa sitzen zählt nicht, deshalb heißt „walk your pet“ immer: nach draußen gehen. Kein GPS und kein Standort – nur Schritte.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Machen Sie mit",
          intro: "Dafür brauchen Sie die App nicht. Jede Familie, die für ein Haustier nach draußen geht – ein echtes oder ein Übungshaustier –, ist dabei.",
          items: [
            { title: "Gehen Sie nach draußen", text: "Gehen Sie mit dem Hund Gassi. Oder, wenn Sie noch über ein Haustier nachdenken, machen Sie den Spaziergang, den Sie mit ihm machen würden." },
            { title: "Halten Sie den Moment fest", text: "Schuhe an der Tür, eine Leine, der Weg, Pfoten im Gras. Keine Gesichter, keine Namen." },
            { title: "Teilen Sie ihn", text: "Posten Sie ihn mit #walkyourpet und markieren Sie @petprep.si auf Instagram oder TikTok. Mit Ihrer Erlaubnis teilen wir die schönsten Momente vielleicht hier und auf unseren Profilen." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Sicher teilen",
          intro: "Bei #walkyourpet geht es um Kinder, deshalb gelten für alles, was wir teilen, diese Regeln:",
          items: [
            "Eltern posten, nicht Kinder. Nur Eltern entscheiden, was online geht.",
            "Keine Gesichter, Namen, Schulen oder Adressen von Kindern – und nie das Kind einer anderen Familie.",
            "Wir teilen nur mit Erlaubnis der Eltern erneut, und wir nehmen einen Beitrag jederzeit herunter, wenn Sie darum bitten.",
            "Zitate von Kindern sind immer echt. Wir erfinden oder „verbessern“ nie, was ein Kind gesagt hat.",
            "Es ist eine Einladung, keine Pflicht. Keine Serien, die man halten muss, kein Druck – nur ein guter Grund, rauszugehen.",
          ],
        },
        {
          type: "callout",
          title: "Der erste Moment gehört uns. Der nächste könnte Ihrer sein.",
          text: "Teilen Sie den Spaziergang Ihrer Familie mit #walkyourpet und markieren Sie @petprep.si. Fragen oder eine Geschichte, die Sie erzählen möchten: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Fragen",
          items: [
            { q: "Brauche ich PetPrep, um mitzumachen?", a: "Nein. Jeder, der für ein Haustier nach draußen geht, kann #walkyourpet verwenden. PetPrep ist der Ort, an dem der Satz entstanden ist und an dem der Spaziergang eines Übungshundes nur in echten Schritten zählt." },
            { q: "Funktioniert es in PetPrep auch für Katzen?", a: "Nicht als Spaziergang. Katzen gehen nicht spazieren, deshalb werden die Bedürfnisse einer Katze in PetPrep mit Spielen erfüllt, nicht mit Schritten. Spaziergänge sind für Hunde." },
            { q: "Warum ist der Satz auf Englisch?", a: "Weil das Kind ihn so gesagt hat – auf Englisch, mitten in einem slowenischen Satz. Kinder überall mischen Englisch in ihre Sätze, deshalb bleibt er in jeder Sprache gleich." },
            { q: "Zeigen Sie mein Kind in Ihren Beiträgen?", a: "Nur, was Sie selbst teilen und uns erneut zu teilen erlauben, und nie das Gesicht oder den Namen eines Kindes. Schreiben Sie uns an hello@petprep.si, und wir entfernen es." },
          ],
        },
      ],
    },
  },
};

export default de;
