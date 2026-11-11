import type { Dictionary } from "./types";

const nl: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Klaar voor een huisdier. Er voor zijn hele leven.",
    siteDescription:
      "PetPrep is een huisdiersimulator van 12 weken waarmee ouders zien of hun kind écht klaar is voor een huisdier – en die daarna een AI-assistent wordt voor het hele leven van het echte dier.",
    slogan: "Klaar voor een huisdier. Er voor zijn hele leven.",
    keywords: [
      "is mijn kind klaar voor een hond",
      "app waarmee kinderen verantwoordelijkheid voor een huisdier leren",
      "virtuele huisdiersimulator",
      "AI-huisdiersimulator",
      "voordat je een hond neemt",
      "kinderen en huisdieren",
      "test of je kind klaar is voor een huisdier",
      "ouderdashboard",
      "hondenras uitproberen voordat je er een neemt",
      "past dit hondenras bij ons gezin",
    ],
  },
  nav: { home: "Home", menu: "Menu", close: "Menu sluiten", skip: "Naar de inhoud" },
  lang: { label: "Taal", switchTo: "Andere taal kiezen" },
  cta: {
    primary: "Begin gratis met een kruising",
    secondary: "Bekijk hoe het werkt",
    earlyAccess: "Vroege toegang aanvragen",
    earlyAccessSubject: "PetPrep vroege toegang",
    ios: "Download voor iPhone",
    android: "Download voor Android",
    comingSoon: "Binnenkort op iPhone en Android",
    readMore: "Lees meer",
    contactUs: "Neem contact op",
  },
  common: {
    planned: "Gepland",
    plannedNote:
      "Op deze pagina lees je wat we hierna gaan bouwen. Het zit nog niet in de app en details kunnen nog veranderen.",
    legalDraft:
      "Deze tekst wordt voor de officiële lancering samen met onze juridische adviseurs afgerond. Neem contact met ons op als iets onduidelijk is.",
    lastUpdated: "Laatst bijgewerkt",
    breadcrumbHome: "Home",
    screensNote: "De schermen van de app op deze site zijn voorbeelden; de definitieve app kan er iets anders uitzien.",
    perPet: "per huisdier",
    free: "Gratis",
    forever: "voor altijd",
    notFoundTitle: "Deze pagina is er zonder riem vandoor.",
    notFoundText: "De pagina die je zoekt bestaat niet of is verhuisd.",
    notFoundCta: "Terug naar de homepage",
  },
  footer: {
    tagline: "Klaar voor een huisdier. Er voor zijn hele leven.",
    groups: [
      { title: "Product", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Bedrijf", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Vertrouwen", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Alle rechten voorbehouden.",
    dataEu: "Gegevens worden opgeslagen in de EU.",
    languages: "Binnenkort meer talen.",
    company: "Exploitant:",
    cookieSettings: "Cookie-instellingen",
    a11yBadge: { title: "Toegankelijk spelen", text: "Eenvoudigere gebaren · Schermlezers · Minder beweging" },
  },
  screens: {
    pin: "Kinderen loggen in met een 6-cijferige code van hun ouder – geen e-mailadres, geen wachtwoord.",
    contract: "Het Verantwoordelijkheidscontract, ondertekend met een vinger. Met de handtekening komt het huisdier tot leven.",
    hud: "Het startscherm van het kind: hoe het huisdier er nu voor staat, vier verzorgingsbehoeften en de verzorgingsknoppen.",
    picker: "Ouders kiezen het huisdier: ras, herkomst (geadopteerd of van een fokker) en leeftijd bij thuiskomst.",
    parent: "Het ouderdashboard: een stoplicht, de Care Score en de routines van vandaag voor elk kind.",
    report: "Het rapport van een kind over 7, 30 of 84 dagen: routines, wandelingen en gemiste taken, dag voor dag.",
    assistant: "Zodra het echte huisdier thuis is: de AI-assistent maakt van halsbandgegevens één duidelijke tip.",
    certificate: "Na 12 weken: het Verantwoordelijkheidscertificaat met de Care Score van het kind.",
  },
  pricingPlans: {
    free: {
      name: "Kruising",
      text: "De volledige simulatie met een levensechte kruising.",
      features: [
        "Dagelijkse zorg met echte gevolgen",
        "Echte wandelingen, geteld aan de hand van de stappen op de telefoon",
        "Ouderdashboard, stoplicht en Care Score",
        "Stille uren en een pauzeknop",
        "Fotorealistische beelden van je huisdier en korte video’s",
        "Voeg later de challenge van 12 weken toe, met hetzelfde huisdier",
      ],
      cta: "Begin gratis",
    },
    challenge: {
      name: "De PetPrep Challenge van 12 weken",
      badge: "12 weken + certificaat",
      unit: "per huisdier · 12 weken",
      text: "Voor gezinnen die de volledige ervaring willen, met een certificaat aan het eind.",
      features: [
        "Alles uit Kruising",
        "Elk ras, zoals de [border collie](breed:border_collie), of de kruisingshond en huiskat",
        "De stemmingen van je huisdier als AI-video’s",
        "Verantwoordelijkheidscertificaat",
        "Eén prijs als broers en zussen een huisdier delen",
        "Toegang voor beide ouders",
      ],
      cta: "Kies de challenge",
    },
    note:
      "Aankopen doe je in de app via de App Store of Google Play. Een tweede huisdier in hetzelfde gezin is een aparte challenge. Prijzen zijn inclusief btw, voor zover van toepassing.",
  },
  earlyAccess: {
    title: "Vroege toegang aanvragen",
    text: "Wees een van de eerste gezinnen die PetPrep uitproberen. We sturen je een mail zodra het zover is – en verder niets.",
    label: "Je e-mailadres",
    placeholder: "jij@voorbeeld.nl",
    button: "Vroege toegang aanvragen",
    sending: "Versturen…",
    successTitle: "Je staat op de lijst.",
    successText: "Bedankt! Zodra PetPrep klaar is, mailen we jou als eerste.",
    invalid: "Vul een geldig e-mailadres in.",
    error: "Er ging iets mis. Probeer het over een momentje opnieuw.",
    consent: "Door je aan te melden ga je ermee akkoord dat je e-mails over PetPrep ontvangt. Je kunt je altijd afmelden.",
    privacyLink: "Privacybeleid",
  },
  contactCards: [
    { title: "Gezinnen", text: "Vragen over de app, je account of de challenge.", email: "hello" },
    { title: "Privacy", text: "Inzage, export of verwijdering van gegevens, of een andere privacyvraag.", email: "privacy" },
    { title: "Partners", text: "Dierenwinkels, asielen, dierenartsen, trainers, verzekeraars en scholen.", email: "partners" },
    { title: "Investeerders", text: "Investeerdersbrief, pitchdeck en dataroom op aanvraag.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Is je kind klaar voor een huisdier? Ontdek het in 12 weken.",
      description:
        "Voordat er een echt huisdier in huis komt, zorgt je kind 12 weken voor een levensecht AI-huisdier: maaltijden, opruimen, echte wandelingen. Jij ziet elke dag of je kind er echt klaar voor is.",
    },
    hero: {
      eyebrow: "De PetPrep Challenge van 12 weken",
      title: "Klaar voor een huisdier. Er voor zijn hele leven.",
      lead:
        "Voordat er een echt huisdier in huis komt, zorgt je kind 12 weken voor een levensecht AI-huisdier – eten geven, opruimen en echte wandelingen maken. Jij ziet elke dag of je kind er echt klaar voor is.",
      trust: ["Kruising voor altijd gratis", "Geen advertenties, geen chat met vreemden", "Kinderen hebben geen e-mailadres nodig"],
    },
    phone: {
      petName: "Luna",
      petAge: "Pup · 3 maanden",
      live: "LIVE",
      video: "Fotorealistische AI-video van het huisdier",
      actions: ["Eten", "Water", "Wandelen", "Opruimen"],
    },
    parentCard: { child: "Maya", status: "Alles goed", scoreLabel: "Care Score", progress: "Week 3 van 12 · 31 van 36 routines op tijd" },
    notification: { app: "PetPrep", text: "Je huisdier kijkt naar zijn voerbak. Het ontbijt kan nog tot 9.00 uur." },
    promoVideo: {
      eyebrow: "PetPrep in één minuut",
      title: "Bekijk hoe het werkt.",
      text: "Van het kiezen van een huisdier en het tekenen van het contract tot school, wandelingen, vachtverzorging en het certificaat – alles wat je kind in 12 weken doet en alles wat jij op het dashboard ziet. Curio, onze mascotte, komt alleen even gedag zeggen; het huisdier in de app is een levensechte AI-hond.",
      alt: "Promovideo van PetPrep: schermen van de app, een kind dat voor een hond zorgt, een ouder die de Care Score volgt.",
      note: "De app is nog niet openbaar beschikbaar in de App Store en Google Play – meld je aan voor vroege toegang.",
    },
    promise: {
      quote: "Elk gezin kent het: “Ik beloof dat ik er goed voor zorg.” PetPrep maakt van die belofte",
      highlight: "bewijs",
      text:
        "Als het in de simulatie misgaat, is dat winst voor je gezin: je ontdekt het voordat een echt dier eronder lijdt – en voordat je jaren aan zorg en kosten op je neemt.",
    },
    how: {
      eyebrow: "Hoe het werkt",
      title: "Drie stappen van “alsjeblieft” naar “klaar”.",
      steps: [
        {
          title: "Jij kiest het huisdier",
          text: "Maak een gezinsaccount aan, voeg je kind toe met alleen een bijnaam en kies het huisdier – ras, geadopteerd of van een fokker, pup of senior.",
        },
        {
          title: "Je kind ondertekent de belofte",
          text: "Je kind logt in met een code van 6 cijfers – geen e-mailadres, geen wachtwoord – en tekent het Verantwoordelijkheidscontract met een vinger. Daarmee wordt een uniek huisdier geboren.",
        },
        {
          title: "12 weken echte zorg",
          text: "Eén echte week staat gelijk aan één maand uit het leven van het huisdier. Aan het eind: een Verantwoordelijkheidscertificaat met de Care Score – objectief bewijs, of een eerlijk nee.",
        },
      ],
      link: "Hoe het werkt, in detail",
    },
    realism: {
      title: "Zo dicht bij een echt huisdier als een app kan komen.",
      text: "Voedertijden, wandelingen en groei zijn gebaseerd op bronnen als dierenartsenverenigingen en kennelclubs – niet zomaar verzonnen voor een spelletje.",
      items: [
        { title: "Echte wandelingen, echte stappen", text: "Voor de dagelijkse wandeling tellen de stappen op de telefoon van je kind. Vandaag helemaal niet gewandeld? Dan merkt het huisdier dat morgen." },
        { title: "Het groeit op", text: "Een pup eet eerst vier keer per dag, dan drie keer, dan twee keer – en krijgt nieuwe foto’s terwijl hij groeit." },
        { title: "Het gedraagt zich ook echt zo", text: "Een pup moet vaak naar buiten. Een hond die zich verveelt, kauwt op pantoffels. En ongelukjes gebeuren net voor het avondeten." },
        { title: "Houdt rekening met school en slaap", text: "In de stille uren zijn de herinneringen uit. Een maaltijd die tijdens schooltijd valt, is aan jou, niet aan je kind." },
        { title: "Echte gevolgen, maar op een zachte manier", text: "Verwaarlozing leidt tot een bezoek aan de dierenarts of het asiel – nooit eng, en altijd met een nieuwe start." },
        { title: "Geen twee hetzelfde", text: "Elk huisdier krijgt een eigen vacht, aftekening en ogen – fotorealistisch en nooit twee keer dezelfde." },
      ],
    },
    parents: {
      eyebrow: "Voor ouders",
      title: "Jij ziet live hoe het echt gaat.",
      text: "Een duidelijk stoplicht voor elk kind, een Care Score op basis van routines die op tijd zijn afgerond en een tijdlijn van wie wat heeft gedaan. Delen broers en zussen een huisdier, dan krijgt ieder een eigen, eerlijke score.",
      points: [
        { strong: "Stille uren en een pauzeknop", text: "jij houdt de regie." },
        { strong: "Kinderen loggen in met een code", text: "geen e-mailadres, geen achternaam, geen advertenties." },
        { strong: "Beide ouders, alle kinderen", text: "één gezin, één overzicht." },
      ],
      link: "Alles wat ouders zien",
    },
    adults: {
      eyebrow: "Voor volwassenen",
      title: "Probeer het ras uit voordat je het in huis haalt.",
      text: "Heb je je zinnen gezet op een bepaald ras? PetPrep is niet alleen voor kinderen. Twaalf weken lang zorg je voor een AI-huisdier van dat ras, met zijn echte dagelijkse behoeften – en ontdek je of het echt bij je past, voordat je koopt of adopteert.",
      points: [
        {
          strong: "De echte behoeften van het ras",
          text: "maaltijden binnen vaste tijdvakken, water, opruimen en een dagelijks stappendoel op basis van onderbouwde bewegingsbehoefte: een volwassen border collie heeft 12.000 stappen per dag nodig, een kruising 6.000.",
        },
        {
          strong: "Training en ongelukjes van een pup",
          text: "elke dag een korte training, en een pup die het per levensmaand maar ongeveer een uur kan ophouden. Daarna moet hij naar buiten – anders ligt er een plasje op de vloer.",
        },
        {
          strong: "In 12 weken zie je of het in je leven past",
          text: "je werkdagen, je vrije tijd en het weer. Omdat het een gezinshond wordt, kun je later je partner of kinderen toevoegen.",
        },
      ],
      how: "Zo begin je: maak een account aan als ouder, voeg jezelf toe als verzorger en log in met de 6-cijferige code – op dezelfde telefoon of een andere.",
      note: "Nu beschikbaar: de gratis kruisingshond en huiskat, en de challenge van 12 weken met een van beide of met elk honden- en kattenras uit de [dierenencyclopedie](page:animals).",
      link: "Zo gebruik je PetPrep in je eentje",
    },
    after: {
      eyebrow: "Als het thuis is",
      title: "Als het echte huisdier komt, blijft PetPrep.",
      text: "Tik op “We hebben een echt huisdier” en de simulator wordt een AI-assistent voor de jaren die komen – die het ritme van je gezin al kent.",
      features: [
        { title: "Slimme halsband", text: "Activiteit en meldingen als er iets niet klopt." },
        { title: "AI als eerste aanspreekpunt", text: "Geeft snel antwoord en verwijst je daarna door naar een echte dierenarts." },
        { title: "Groei en voeding", text: "Wekelijkse weging, groeicurve en het moment om op ander voer over te stappen." },
        { title: "Vertrouwde partners", text: "Dierenartsen, trainers en verzekeraars bij jou in de buurt – duidelijk gemarkeerd." },
        { title: "DNA-test", text: "Welke rassen er in je kruising zitten – en waar je op moet letten." },
        { title: "Kaart voor de dierenarts", text: "De rassenmix en DNA-uitslagen op één plek, klaar voor de dierenarts." },
      ],
      link: "Over de AI-assistent",
      planned: "In ontwikkeling",
    },
    species: {
      title: "Nu honden en katten. Er komen meer diersoorten.",
      text: "Gemaakt voor gezinnen over de hele wereld, in hun eigen taal.",
      chips: [
        { label: "Hond · beschikbaar", active: true, link: "species:dog" },
        { label: "Kat · beschikbaar", active: true, link: "species:cat" },
        { label: "Honden- en kattenrassen · in de challenge", link: "page:animals" },
        { label: "Meer diersoorten · gepland", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Prijzen", title: "Eenvoudige, eerlijke prijzen." },
    faq: { title: "Vragen die ouders stellen", link: "Alle vragen" },
    final: { title: "Klaar voor een huisdier?", text: "Ontdek het in 12 weken. Begin gratis, op iPhone of Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Hoe PetPrep werkt – een challenge van 12 weken: klaar voor een huisdier?",
        description:
          "Zo werkt de PetPrep Challenge van 12 weken: een huisdier kiezen, het Verantwoordelijkheidscontract, dagelijkse verzorging, echte wandelingen, stille uren en het certificaat.",
      },
      eyebrow: "Hoe het werkt",
      title: "Twaalf weken die laten zien wat een belofte waard is.",
      lead:
        "Je kind zorgt voor een fotorealistisch AI-huisdier dat zich gedraagt als een echt dier, voor zover een app dat kan. Eén echte week staat gelijk aan één maand in het leven van het huisdier, dus in 12 weken groeit het op – en zie jij of de zorg blijft.",
      blocks: [
        {
          type: "steps",
          heading: "Van de eerste tik tot het certificaat",
          items: [
            { title: "De ouder maakt het gezin aan", text: "Je registreert je met je e-mailadres (inloggen met Apple en Google komt eraan). Voeg elk kind toe met een bijnaam en eventueel een geboortejaar. Meer vragen we niet over je kind." },
            { title: "Jij kiest het huisdier", text: "Kies het ras (de kruising is gratis), de herkomst van het huisdier – geadopteerd uit een asiel of gekocht bij een fokker – en de leeftijd bij thuiskomst: pup, jong, volwassen of senior." },
            { title: "Je kind logt in met een code", text: "Je krijgt een 6-cijferige code die 15 minuten geldig is. Je kind typt die in op de eigen telefoon – geen e-mailadres en geen wachtwoord. Telefoon kwijt? Met één tik log je je kind uit op alle apparaten." },
            { title: "Het Verantwoordelijkheidscontract", text: "Je kind tekent een belofte met een vinger. Met die handtekening wordt het huisdier geboren: de behoeften tellen vanaf dat moment, dus er gaat niets verloren als je kind later tekent." },
            { title: "Twaalf weken verzorging", text: "Eten geven binnen de juiste tijdvakken, vers water, opruimen en een dagelijkse wandeling met echte stappen. Naarmate het huisdier groeit, veranderen ook zijn behoeften." },
            { title: "Het certificaat", text: "Na 12 weken wordt het huisdier een jaar oud. Je kind krijgt een Verantwoordelijkheidscertificaat met de eigen Care Score – of jullie ontdekken samen, zonder risico, dat dit nog niet het juiste moment is." },
          ],
        },
        {
          type: "screens",
          heading: "Wat je kind ziet",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Wat een volwassen kruisingshond elke dag nodig heeft",
          intro: "De cijfers komen uit bronnen van dierenartsen en kennelclubs; geven bronnen alleen een bandbreedte, dan kiest PetPrep een waarde en zegt dat erbij.",
          head: ["Behoefte", "Hoe vaak", "Als het wordt vergeten"],
          rows: [
            ["Eten", "’s Ochtends (6–10 uur) en ’s avonds (17–21 uur), één keer per tijdvak", "Na ongeveer 12,5 uur hongerig"],
            ["Water", "3 keer per dag, minstens 3 uur ertussen", "Na ongeveer 10 uur dorstig"],
            ["Wandelen", "6.000 echte stappen (pups beginnen bij 2.000)", "Helemaal niet gewandeld → de volgende ochtend ziek"],
            ["Opruimen", "Als het huisdier een ongelukje heeft – nooit tijdens stille uren", "Geen eten of water tot het schoon is"],
          ],
          note: "Pups eten 4, dan 3, dan 2 keer per dag en kunnen het per levensmaand maar ongeveer een uur ophouden. Een [border collie](breed:border_collie) heeft 12.000 stappen nodig en krijgt sneller honger.",
        },
        {
          type: "cards",
          heading: "Gemaakt voor het echte gezinsleven",
          columns: 3,
          items: [
            { title: "Stille uren", text: "Stel school- en slaaptijden in. Het huisdier doet dan rustiger aan, er worden geen herinneringen gestuurd en er gebeuren geen ongelukjes." },
            { title: "Maaltijden tijdens schooltijd", text: "Een voedertijdvak dat helemaal binnen de stille uren valt, is een taak voor de ouder – het telt nooit tegen je kind." },
            { title: "Altijd pauzeren", text: "Met één knop pauzeer je het spel, bijvoorbeeld voor een gezinsgesprek. Tijdens de pauze gaat niets achteruit." },
            { title: "Vriendelijke herinneringen", text: "Het huisdier geeft je kind eerst een zacht seintje en daarna een dringender signaal. Pas als een behoefte een uur op nul staat, krijg jij een alarm." },
            { title: "Echte gevolgen", text: "Bij verwaarlozing gaat het huisdier 12 uur naar de dierenarts. Na een hele dag verwaarlozing neemt het asiel het huisdier mee – en kun je opnieuw beginnen." },
            { title: "Gedeelde huisdieren", text: "Broers en zussen kunnen één huisdier delen. Wat een kind doet, telt voor dat kind, zodat de score eerlijk blijft." },
          ],
        },
        {
          type: "callout",
          title: "Mislukken is ook een uitkomst.",
          text: "Belandt het huisdier in het virtuele asiel, dan heb je iets waardevols geleerd – voordat een echt dier de prijs betaalt. Je kunt opnieuw beginnen, ook met een makkelijker ras.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Voor ouders – het ouderdashboard van PetPrep, de Care Score en de instellingen",
        description:
          "Wat ouders zien in PetPrep: een dagelijks stoplicht per kind, de Care Score, routines, rapporten, meldingen, stille uren, pauze en privacy by design.",
      },
      eyebrow: "Voor ouders",
      title: "Objectief bewijs, geen nieuwe belofte.",
      lead:
        "Je hoeft niet te raden of de wandelingen echt zijn gelopen. PetPrep meet de zorg aan de hand van duidelijke dagelijkse routines en laat je per kind zien hoe het gaat.",
      blocks: [
        {
          type: "cards",
          heading: "Het stoplicht",
          intro: "Elk kind en elk huisdier krijgt een kleur voor vandaag, in de lokale tijd van je gezin – altijd met de reden erbij in woorden.",
          columns: 3,
          items: [
            { title: "Groen – alles goed", text: "De routines lopen op schema.", tag: "ok" },
            { title: "Geel – aandacht nodig", text: "Vandaag zijn er meer dan twee routines gemist.", tag: "warn" },
            { title: "Rood – dringend", text: "Het huisdier is vandaag ziek geworden, een behoefte staat al meer dan een uur op nul, of het huisdier is naar het asiel gegaan.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "De Care Score",
          paragraphs: [
            "Care Score = op tijd uitgevoerde routines ÷ verwachte routines × 100, min 10 punten per ziekte, met een score tussen 0 en 100.",
            "Een routine is één concrete taak: elk voedertijdvak, elk van de drie waterbeurten, elk ongelukje dat binnen twee uur wordt opgeruimd (schooltijd en slaap tellen niet mee) en het halen van het dagelijkse wandeldoel.",
            "Tijd waarin je het spel hebt gepauzeerd, het huisdier bij de dierenarts was of het contract nog niet was getekend, telt nooit tegen je kind. Afgelopen dagen liggen vast, dus een score kan achteraf niet meer worden aangepast.",
            "Delen broers en zussen een huisdier, dan verdelen ze elke routine eerlijk. Alleen wat een kind zelf doet, telt – doet één kind alles, dan scoort dat kind 100 en het andere 0.",
          ],
        },
        {
          type: "screens",
          heading: "Jouw overzicht",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Jij houdt de regie",
          items: [
            "Stille uren voor school en slaap, in je lokale tijd – ook bij de overgang naar zomer- of wintertijd.",
            "Pauzeer het spel voor elk huisdier met één bevestigde tik; het scherm van je kind gaat meteen op slot.",
            "Nodig de andere ouder uit met een eenmalige code; jullie zien allebei elk kind en elk huisdier.",
            "Log een kind uit op alle apparaten als een telefoon kwijt is; codes zijn eenmalig en verlopen na 15 minuten.",
            "Exporteer alle gegevens van je gezin als bestand, of verwijder het profiel van een kind of je hele account direct in de app.",
          ],
        },
        {
          type: "list",
          heading: "Privacy by design",
          items: [
            "Kinderen loggen in met een code – geen e-mailadres, geen wachtwoord, geen achternaam.",
            "We bewaren een bijnaam en, als je die invult, een geboortejaar. Verder niets over je kind.",
            "Meldingen bevatten nooit de naam van je kind, omdat ze op het vergrendelscherm kunnen verschijnen; als titel kan de naam van je huisdier staan, als je het een naam hebt gegeven.",
            "Stappen komen – met jouw toestemming en alleen-lezen – uit Apple Gezondheid (iPhone) of Health Connect (Android), en uit de bewegingssensor van de telefoon, waar die beschikbaar is. PetPrep gebruikt geen gps en volgt geen locatie.",
            "Geen advertenties, geen chat met vreemden, servers in de EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Als het thuis is – de AI-assistent van PetPrep voor je echte huisdier",
        description:
          "Als je gezin een echt huisdier krijgt, wordt PetPrep een AI-assistent: activiteit van een slimme halsband, meldingen, AI als eerste aanspreekpunt met een echte dierenarts erachter, groei en voeding.",
      },
      eyebrow: "Als het thuis is",
      title: "De simulatie stopt. De zorg niet.",
      lead:
        "Als je gezin een echt huisdier in huis haalt, verandert PetPrep met één tik in een assistent voor het hele leven van het dier – in realtime, zonder gezondheidsbalkjes en al vertrouwd met de routine van je gezin.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Wat de assistent gaat doen",
          columns: 2,
          items: [
            { title: "Koppeling met een slimme halsband", text: "Koppel populaire gps- en activiteitstrackers – of een PetPrep-halsband – en zie de activiteit in context." },
            { title: "Meldingen die uitleggen", text: "“Max is vandaag 2 km gerend, de helft van normaal, en heeft een grotere maaltijd gegeten. Een extra avondwandeling helpt hem tot rust te komen.” Eén observatie, één reden, één tip." },
            { title: "Eerst AI, daarna een echte dierenarts", text: "Stel een vraag of upload een foto. De assistent beantwoordt algemene vragen, schat in hoe dringend iets is en verwijst je door naar een echte dierenarts als dat nodig is. Bij dringende verschijnselen word je meteen naar een dierenarts verwezen." },
            { title: "DNA-test voor je hond of kat", text: "Bestel een DNA-test in de app of upload de uitslag van een test die je al hebt. PetPrep laat zien welke rassen in de mix zitten, wat kenmerkend is voor die rassen en welke gezondheidsproblemen daarbij vaker voorkomen – met bronnen. Rassenpercentages zijn geen diagnose en een DNA-test toont geen allergieën." },
            { title: "Een kaart voor de dierenarts", text: "De rassenmix en eventuele directe DNA-bevindingen op één pagina of in een QR-code, zodat je dierenarts meteen weet wat er in een kruising zit." },
            { title: "Groei en voeding", text: "Noteer elke week het gewicht, bekijk de groeicurve en krijg een herinnering als het tijd is om op ander voer over te stappen." },
          ],
        },
        {
          type: "screens",
          heading: "Een voorproefje",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principes waar we niet aan tornen",
          items: [
            "De AI-assistent is geen dierenarts en stelt nooit een diagnose. Bij elk antwoord over gezondheid staat hoe je een echte dierenarts bereikt.",
            "Aanbiedingen van partners (winkels, verzekeraars, trainers, dierenartsen) zijn altijd gemarkeerd, en we vermelden het als we commissie verdienen.",
            "Niets wordt zonder jouw toestemming met een partner gedeeld.",
            "De gegevens van je kind uit de challenge gaan alleen naar de assistent als jij daarmee instemt.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Prijzen – PetPrep is gratis om mee te beginnen, € 49,99 voor de challenge van 12 weken",
        description:
          "De kruising is voor altijd gratis. De PetPrep Challenge van 12 weken kost € 49,99 per huisdier, als eenmalige aankoop. Eén prijs voor broers en zussen die een huisdier delen. Ook als upgrade van je gratis huisdier.",
      },
      eyebrow: "Prijzen",
      title: "Eenvoudige, eerlijke prijzen.",
      lead: "Begin gratis met een kruising. Koop de volledige challenge van 12 weken wanneer je eraan toe bent – de 12 weken gaan in bij de aankoop. Dat kan ook met het gratis huisdier waar je kind al voor zorgt.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Wensen – spullen voor je huisdier",
          intro:
            "In de app vraagt je kind om spullen voor het eigen huisdier; jij beslist en koopt. Je kind ziet nooit een prijs. Spullen zijn alleen voor de sier: ze veranderen nooit de behoeften, de Care Score of het certificaat. Ook beschikbaar voor de gratis kruisingshond en huiskat.",
          head: ["Artikel", "Prijs"],
          rows: [
            ["Mand (kat: kattenmand)", "€ 5,99"],
            ["Voer- en waterbak", "€ 5,99"],
            ["Speeltje (hond: touwspeeltje of piepspeeltje, kat: pluchen muis of hengel met veren)", "€ 5,99 per speeltje"],
            ["Snoepjes, pak van 10", "€ 2,99"],
            ["Welkomstpakket: mand + bakken + speeltje", "€ 15,99 (in plaats van € 17,97)"],
          ],
          note: "Wensen komen met de volgende update van de app; je kunt ze kopen zodra de artikelen beschikbaar zijn in de App Store en Google Play. De prijzen gelden voor Slovenië; in de store zie je de prijs voor jouw land.",
        },
        {
          type: "faq",
          heading: "Vragen over prijzen",
          items: [
            { q: "Is de gratis versie echt gratis?", a: "Ja. De kruising is voor altijd gratis, met de volledige simulatie, echte wandelingen en het ouderdashboard." },
            { q: "Wat zit er in de challenge?", a: "Veeleisende rassen zoals de [border collie](breed:border_collie), de stemmingen van je huisdier als AI-video’s, aan het eind het Verantwoordelijkheidscertificaat en toegang voor beide ouders. Je kunt de challenge ook kiezen met de kruisingshond of huiskat." },
            { q: "Kunnen we het gratis huisdier dat mijn kind al heeft upgraden naar de challenge?", a: "Ja, zolang de gratis kruisingshond of huiskat nog in het spel is. Start de challenge in de ouder-app vanaf de kaart van je kind. Het huisdier blijft hetzelfde: naam, uiterlijk, leeftijd en geleerde commando’s. De 12 weken, de Care Score en het certificaat tellen vanaf de aankoop; eerdere dagen blijven in de geschiedenis staan, gemarkeerd als vóór de challenge, en tellen niet mee. De prijs is dezelfde: € 49,99 eenmalig, geen abonnement. Kruisingshonden die in een vroege versie van de app zijn aangemaakt, kunnen niet worden geüpgraded; de app laat je weten of dat voor jouw hond geldt." },
            { q: "Kan een challenge-huisdier terug naar het gratis plan?", a: "Niet op verzoek. Een kruisingshond of huiskat gaat alleen terug naar het gratis plan als de store de aankoop terugbetaalt; de challenge stopt dan, zonder certificaat. Koop je de challenge later opnieuw, dan beginnen er 12 nieuwe weken." },
            { q: "Zet de app me onder druk om te kopen?", a: "Nee. Als je kind in minstens 5 van de eerste 7 dagen voor een gratis huisdier heeft gezorgd, krijg je één melding en een kaart op je dashboard over de challenge – één keer per huisdier, nooit tijdens de stille uren. Je kind ziet geen prijzen en ook deze herinnering niet." },
            { q: "Betalen broers en zussen dubbel?", a: "Nee. Kinderen die één huisdier delen, betalen één prijs. Een tweede huisdier in het gezin is een aparte challenge." },
            { q: "Hoe betaal ik?", a: "In de app, via de App Store of Google Play. Terugbetalingen verlopen via je account bij de App Store of Google Play." },
            { q: "Wat zijn Wensen, en kan mijn kind zelf iets kopen?", a: "Je kind kan om een mand, bakken, een speeltje of snoepjes voor het eigen huisdier vragen – tot drie open verzoeken tegelijk. Jij krijgt een melding en koopt het, of kiest “Nu niet”. Je kind ziet nooit prijzen en kan in de kinderapp niets kopen." },
            { q: "Maken gekochte spullen het spel makkelijker?", a: "Nee. Spullen zijn alleen voor de sier. Ze veranderen nooit de behoeften, de Care Score of het certificaat, en in Wensen zit geen dierenarts of medicijn – dus nooit “betalen om je huisdier te redden”." },
            { q: "Is het voor volwassenen hetzelfde?", a: "Ja. Gebruik je PetPrep in je eentje om een ras uit te proberen, dan geldt hetzelfde: de kruising is voor altijd gratis en de challenge van 12 weken kost € 49,99 per huisdier." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Veelgestelde vragen – wat ouders vragen over PetPrep",
        description:
          "Antwoorden over PetPrep: tijd per dag, gebruik als volwassene, privacy en locatie, stappen, broers en zussen, als een kind het niet volhoudt, talen, diersoorten, echte huisdieren.",
      },
      eyebrow: "Veelgestelde vragen",
      title: "Vragen die ouders stellen.",
      lead: "Korte, eerlijke antwoorden. Mis je iets? Stuur ons een bericht.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Voor welke leeftijd is PetPrep?", a: "Voor kinderen is PetPrep bedoeld voor ongeveer 7 tot 12 jaar, en het werkt goed tot 16 jaar. Ook volwassenen gebruiken het, om te testen of een bepaald ras echt bij hen past voordat ze een dier kopen of adopteren." },
            { q: "Kan ik PetPrep in mijn eentje gebruiken, zonder kinderen?", a: "Ja. Maak een account aan als ouder en voeg jezelf toe als verzorger – een bijnaam is genoeg, het geboortejaar mag je leeg laten. Kies het ras en maak een code van 6 cijfers aan. Kies daarna, op dezelfde telefoon of een andere, “Ik ben een kind” en typ de code in – zo word jij de verzorger. Omdat het een gezinshond wordt, kun je later je partner of kinderen toevoegen, zodat jullie er samen voor zorgen. De prijs is dezelfde als voor gezinnen." },
            { q: "Hoeveel tijd kost het per dag?", a: "Een paar minuten voor eten, water en opruimen – plus de wandeling die een echte hond toch al nodig zou hebben." },
            { q: "Volgt de app de locatie van mijn kind?", a: "Nee. Voor wandelingen telt de app alleen stappen. Met jouw toestemming leest de app die uit Apple Gezondheid (iPhone) of Health Connect (Android) – alleen lezen en alleen stappen; waar mogelijk gebruikt de app ook de bewegingssensor van de telefoon. Om toestemming wordt gevraagd in het wandelscherm. Gps wordt niet gebruikt." },
            { q: "Heeft mijn kind een e-mailadres nodig?", a: "Nee. Jij maakt het account aan; je kind logt in met een 6-cijferige code die jij aanmaakt. We bewaren alleen een bijnaam en eventueel een geboortejaar." },
            { q: "Wat gebeurt er als mijn kind het vergeet?", a: "Het huisdier stuurt eerst vriendelijke herinneringen. Blijft een behoefte op nul staan, dan wordt het huisdier ziek en brengt het 12 uur door bij de dierenarts. Na een hele dag zonder zorg neemt het virtuele asiel het mee – en kun je opnieuw beginnen." },
            { q: "Kunnen broers en zussen een huisdier delen?", a: "Ja. Elk kind tekent een eigen contract, wat een kind doet telt voor dat kind en ieder kind krijgt een eigen, eerlijke Care Score." },
            { q: "En school en bedtijd?", a: "Stel stille uren in. Het huisdier doet dan rustiger aan, er wordt niets gestuurd en maaltijden die helemaal in de stille uren vallen, regel jij." },
            { q: "Is het eng voor kinderen?", a: "Nee. De gevolgen zijn echt, maar zacht: het huisdier gaat naar de dierenarts of het asiel, nooit iets naars om te zien, en er is altijd een nieuwe start." },
            { q: "Welke dieren zijn er?", a: "Nu [honden](species:dog) en [katten](species:cat): een gratis kruisingshond en huiskat, en de challenge van 12 weken met een van beide of met elk ras uit de [dierenencyclopedie](page:animals), waarin ook hun onderbouwde behoeften staan. Meer diersoorten zijn gepland." },
            { q: "Welke talen?", a: "Voorlopig is de app er in het Engels en het Sloveens. Er komen meer talen bij naarmate PetPrep in nieuwe landen van start gaat." },
            { q: "Wat gebeurt er als we een echt huisdier nemen?", a: "PetPrep kan een AI-assistent worden voor je echte huisdier. Dat deel is in ontwikkeling." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partners – samenwerken met PetPrep",
        description:
          "PetPrep werkt samen met dierenwinkels, asielen, dierenartsen, trainers, verzekeraars, halsbandmakers en scholen om gezinnen te helpen op een verantwoorde manier een huisdier te nemen.",
      },
      eyebrow: "Partners",
      title: "Beter voorbereide gezinnen voor iedereen die om dieren geeft.",
      lead:
        "Gezinnen die PetPrep afronden, weten wat een huisdier echt van je vraagt. We bouwen een partnernetwerk dat hen op het juiste moment bereikt – duidelijk gemarkeerd en altijd met toestemming van het gezin.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Met wie we samenwerken",
          columns: 3,
          items: [
            { title: "Dierenwinkels", text: "Bereik gezinnen op het moment dat ze laten zien dat ze er klaar voor zijn – bijvoorbeeld met een aanbieding voor een startpakket bij het certificaat." },
            { title: "Asielen, opvangorganisaties en fokkers", text: "Raad PetPrep aan vóór adoptie of aankoop: dat betekent minder impulsieve beslissingen en minder dieren die worden teruggebracht." },
            { title: "Dierenartsen", text: "Zodra het echte huisdier thuis is, beantwoordt de AI-assistent de eerste vragen en verwijst eigenaren naar jou door, met een samenvatting van het geval, die alleen met toestemming wordt gedeeld." },
            { title: "Trainers en hondenscholen", text: "Aanbevelingen en boekingen als een gezin een echte hond krijgt." },
            { title: "Dierenverzekeraars", text: "Aanbiedingen afgestemd op het ras als er een echt huisdier wordt geregistreerd – duidelijk gemarkeerd." },
            { title: "Makers van halsbanden en IoT", text: "Koppeling van activiteitsgegevens voor slimmere meldingen met uitleg." },
          ],
        },
        {
          type: "list",
          heading: "Waarom partners ons vertrouwen",
          items: [
            "Kinderen loggen in zonder e-mailadres en we houden hun gegevens tot een minimum beperkt, op servers in de EU.",
            "Alleen gecontroleerde inhoud komt op het scherm van een kind; er zijn geen advertenties.",
            "Elk aanbod van een partner is gemarkeerd en elke commissie wordt aan het gezin gemeld.",
          ],
        },
        { type: "callout", title: "Laten we praten.", text: "De voorwaarden voor partnerschappen worden voorbereid. Vertel ons wie je bent en wat je in gedachten hebt.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investeer in PetPrep – van klaar voor een huisdier tot levenslange zorg",
        description:
          "PetPrep maakt van de belofte van een kind bewijs voordat een gezin een huisdier neemt, en wordt daarna een AI-assistent voor het hele leven van het dier. Nog voor de lancering; brief op aanvraag.",
      },
      eyebrow: "Investeerders",
      title: "Van een challenge van 12 weken naar een relatie van 10–15 jaar.",
      lead:
        "PetPrep geeft ouders objectief bewijs of hun kind klaar is voor een echt huisdier – en blijft daarna bij het gezin, het hele leven van het dier.",
      blocks: [
        {
          type: "cards",
          heading: "De kans",
          columns: 3,
          items: [
            { title: "Probleem", text: "Kinderen beloven voor een huisdier te zorgen; ouders hebben geen neutrale manier om dat te testen voordat ze zich voor jaren aan geld en zorg verbinden." },
            { title: "Oplossing", text: "Een realistische simulatie van 12 weken met een live ouderdashboard en een objectieve Care Score, die eindigt met een Verantwoordelijkheidscertificaat." },
            { title: "Uitbreiding", text: "Zodra het echte huisdier thuis is, wordt PetPrep een AI-assistent voor het dier: halsbandgegevens, AI als eerste aanspreekpunt met dierenartsen erachter, groei en voeding, DNA-tests, diensten van partners." },
          ],
        },
        {
          type: "table",
          heading: "Verdienmodel",
          head: ["Inkomstenbron", "Model", "Status"],
          rows: [
            ["Kruising", "Voor altijd gratis (klantwerving)", "Vastgesteld"],
            ["PetPrep Challenge van 12 weken", "€ 49,99 per huisdier, eenmalige aankoop", "Vastgesteld"],
            ["Wensen – spullen voor het huisdier (alleen voor de sier)", "In-app-aankopen: € 5,99 per artikel, snoepjes € 2,99 voor 10, pakket € 15,99; ook in de gratis versie", "Gebouwd, aankoop in de store volgt binnenkort"],
            ["Aanbiedingen van partners", "Commissies van winkels, verzekeraars, dierenartsen en trainers", "Gepland"],
            ["AI-assistent voor het echte huisdier", "Abonnement", "Gepland"],
            ["DNA-tests voor honden en katten", "Verkoop van tests en commissie van partners", "Gepland"],
          ],
        },
        {
          type: "list",
          heading: "Wat er al gebouwd is",
          items: [
            "Spelengine op de server met realtime synchronisatie, getest met simulaties van hele dagen, dagen met de overgang naar zomer- of wintertijd en bijzondere gezinssituaties.",
            "Gezinnen met meerdere ouders, meerdere kinderen en gedeelde huisdieren, met een eerlijke score per kind.",
            "Unieke fotorealistische AI-huisdieren met gemeten en begrensde AI-kosten, media opgeslagen op gehuurde servers in Duitsland (Hetzner, EU).",
            "Behoeften van huisdieren gebaseerd op geciteerde bronnen van dierenartsen en kennelclubs, waarbij elk getal tot de bron te herleiden is.",
            "Kinderveiligheid by design: inloggen met een pincode, zonder e-mailadres, minimale gegevens, geen advertenties, alleen gecontroleerde media.",
          ],
        },
        {
          type: "prose",
          heading: "Fase",
          paragraphs: [
            "PetPrep bevindt zich nog vóór de lancering; een gesloten bèta staat gepland. De eerste markt is Slovenië en de regio, daarna volgen Duitsland, Oostenrijk en Zwitserland (DACH) en het Verenigd Koninkrijk; het product is vanaf dag één gebouwd voor lokalisatie wereldwijd.",
            "Oprichter: David Tacer, softwareontwikkelaar en ondernemer. Meer [over ons](page:about).",
          ],
        },
        { type: "callout", title: "Vraag de investeerdersbrief aan.", text: "We delen de brief, het pitchdeck en de dataroom op aanvraag.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contact met PetPrep – gezinnen, privacy, partners, investeerders",
        description: "Neem contact op met PetPrep: vragen van gezinnen, privacyverzoeken, samenwerkingen en vragen van investeerders. We antwoorden in het Engels of het Sloveens.",
      },
      eyebrow: "Contact",
      title: "We lezen elk bericht.",
      lead: "Mail naar het juiste adres en we antwoorden zo snel mogelijk, in het Engels of het Sloveens.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Bedrijfsgegevens" }],
    },
    privacy: {
      navLabel: "Privacy",
      meta: {
        title: "Privacybeleid – PetPrep",
        description: "Hoe PetPrep persoonsgegevens van ouders en kinderen verzamelt, gebruikt en beschermt, en hoe je je rechten op grond van de AVG uitoefent.",
      },
      eyebrow: "Juridisch",
      title: "Privacybeleid",
      lead: "Vertaling – alleen de Engelse versie is bindend. PetPrep is vooral voor kinderen gemaakt, dus we verzamelen zo weinig mogelijk en leggen precies uit wat we ermee doen.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Wie is verantwoordelijk",
              paragraphs: [
                "De verwerkingsverantwoordelijke voor persoonsgegevens die via de PetPrep-app en deze website worden verwerkt, is {company}, {address}; {companyIds}. Contact voor privacyvragen: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Wat we verzamelen",
              items: [
                "Ouderaccount: naam (hoe je gezin je noemt), e-mailadres, wachtwoord (alleen als beveiligde hash opgeslagen), de tijdzone van je apparaat en het moment waarop je de voorwaarden en dit beleid hebt geaccepteerd.",
                "Verzorgersprofiel (een kind of een volwassene die voor het huisdier zorgt): een bijnaam van maximaal 30 tekens en eventueel een geboortejaar – leeg voor een volwassene. Geen e-mailadres, wachtwoord, achternaam of geboortedatum.",
                "Apparaten: het telefoonmodel (bijvoorbeeld “iPhone”, nooit een naam die de gebruiker de telefoon heeft gegeven), en voor meldingen een pushtoken, platform en appversie.",
                "Verzorging: handelingen in de simulatie (eten geven, water geven, opruimen, wandelen), dagelijkse stappentotalen (of totalen van rolstoelduwen in de aangepaste modus – zie punt 3 en 4), scores en rapporten.",
                "Het Verantwoordelijkheidscontract: de handtekening van het kind, gezet met een vinger, opgeslagen als vectorlijn met het moment van ondertekenen.",
                "Codes: inlog- en uitnodigingscodes worden alleen als hash opgeslagen en verlopen.",
                "Foutrapporten van de app: als de app vastloopt of crasht, kan de app een kort technisch rapport naar onze server in de EU sturen (soort fout en foutmelding, locatie in de code, app- en besturingssysteemversie, schermnaam, rol ouder/kind). Het bevat geen naam, e-mailadres, gebruikers-ID of IP-adres, wordt niet met derden gedeeld en wordt na 30 dagen verwijderd.",
                "Lijst voor vroege toegang (deze website): je e-mailadres, de taal van de pagina en het moment waarop je je aanmeldde.",
                "Een cadeaubon inwisselen (deze website): de ouder logt in met Google, Apple of met e-mailadres en wachtwoord. Bij e-mailadres en wachtwoord controleert onze server die tegen het bestaande ouderaccount en slaat het wachtwoord nooit leesbaar op; van Google of Apple ontvangen we alleen de accountidentificatie en andere gegevens van hen bewaren we niet. Een kortlevend inlogtoken wordt maximaal 15 minuten in het geheugen van de browser bewaard. Tijdens de doorverwijzing naar Google of Apple en de terugkeer staan er twee items (petprep.signin en petprep.webSession.handoff) alleen in de sessieopslag van dit browsertabblad. Ze worden verwijderd zodra de terugkeerpagina ze leest, anders bij het sluiten van het tabblad; de overdracht wordt alleen binnen 60 seconden geaccepteerd. Na uitloggen of het sluiten van het tabblad blijft er niets bewaard in de browser. Op onze server blijven alleen kortlevende technische gegevens: een vermelding van het inlogtoken (account-ID en tijden, geen naam of e-mailadres) die ongeveer twee dagen na het verlopen automatisch wordt verwijderd, en tellers voor beperking (mislukte pogingen per account in gehashte vorm gedurende 15 minuten; verzoeken per netwerkadres hooguit een uur).",
              ],
            },
            {
              heading: "3. Gezondheids- en fitnessgegevens (stappen, Apple Gezondheid en Health Connect)",
              paragraphs: [
                "PetPrep heeft toegang tot en verzamelt één soort gezondheids- en fitnessgegevens: hoeveel stappen de verzorger per dag zet (lichamelijke activiteit). We gebruiken ze voor één functie: de dagelijkse wandeling met het huisdier in de simulatie. Het kind loopt en die stappen tellen als de wandeling van het huisdier.",
                "Hoe we er toegang toe krijgen: de app op de telefoon van het kind telt stappen. Als je dat toestaat in het toestemmingsvenster van het besturingssysteem, leest de app ze uit Apple Gezondheid (iPhone) of Health Connect (Android) – alleen lezen en alleen stappen. Waar beschikbaar gebruikt de app ook de bewegingssensor van de telefoon (Android: toestemming “Fysieke activiteit”; iPhone: “Beweging en fitness”); zonder toestemming voor Apple Gezondheid of Health Connect telt alleen de bewegingssensor.",
                "Wat we verzamelen: de app stuurt onze server alleen het stappentotaal van vandaag, de bron ervan (Apple Gezondheid, Health Connect of de bewegingssensor) en het moment van verzenden. We bewaren één dagtotaal per verzorgersprofiel – nooit afzonderlijke bewegingen, routes, locatie, hartslag, slaap, gewicht of andere gezondheidsgegevens. We schrijven nooit iets weg naar Apple Gezondheid of Health Connect.",
                "Hoe we ze gebruiken en delen: stappentotalen worden uitsluitend gebruikt om de wandeling in de simulatie te laten werken en aan de ouder te tonen (dashboard en rapporten). We gebruiken ze niet voor advertenties, profilering, gezondheidsbeoordelingen of het trainen van AI-modellen, we verkopen ze niet en we delen ze niet met derden; alleen onze hostingprovider (Hetzner, servers in de EU) slaat ze namens ons op. Ons gebruik van gegevens die we van Health Connect ontvangen, voldoet aan het beleid voor machtigingen van Health Connect (Health Connect Permissions Policy), inclusief de vereisten voor beperkt gebruik (Limited Use).",
                "Rechtsgrond en bewaartermijn: het uitlezen van stappen is optioneel en gebeurt alleen met de toestemming die je op het apparaat geeft; we verwerken het dagtotaal om de dienst te leveren die je hebt gekozen (uitvoering van een overeenkomst). Stappentotalen maken deel uit van de gegevensexport van je gezin en worden samen met het verzorgersprofiel of je account verwijderd; uiterlijk binnen 35 dagen verdwijnen ze ook uit onze versleutelde back-ups.",
                "Je kunt de toestemming op elk moment intrekken in de instellingen van je apparaat: iPhone → Instellingen → Gezondheid → Gegevenstoegang en apparaten → PetPrep; Android → Health Connect → App-rechten → PetPrep. De toestemming voor de bewegingssensor kun je intrekken in de instellingen van de telefoon voor de PetPrep-app. De wandeling telt dan geen nieuwe stappen meer.",
              ],
            },
            {
              heading: "4. Aangepaste modus (rolstoelduwen)",
              paragraphs: [
                "De aangepaste modus is voor kinderen die een rolstoel gebruiken: de wandeling telt dan rolstoelduwen in plaats van stappen. Hij komt met de volgende update van de app; hieronder beschrijven we welke gegevens we verwerken als een ouder hem aanzet.",
                "Als een ouder de aangepaste modus voor een kind aanzet, bewaren we alleen het feit dat hij aanstaat. We vragen of bewaren geen reden, diagnose of gezondheidstoestand.",
                "Zolang hij aanstaat, leest de app op de telefoon van het kind alleen rolstoelduwen in plaats van stappen – uit Apple Gezondheid (vastgelegd door een Apple Watch), met een aparte toestemming voor alleen lezen. Op Android leest de app geen duwen; in plaats daarvan voert een ouder de wandelminuten in. De bewegingssensor wordt dan niet gebruikt. Alleen het aantal duwen van vandaag gaat naar onze server; we noteren bij die dag dat er duwen worden geteld.",
                "Een ouder kan voor een kind in de aangepaste modus wandelminuten invoeren (alleen voor vandaag). We bewaren de datum, het aantal minuten en welke ouder de wandeling heeft ingevoerd.",
                "Omdat het feit dat de aangepaste modus aanstaat kan wijzen op een gezondheidstoestand van een kind, verwerken we dit alleen op basis van je uitdrukkelijke toestemming (art. 9, lid 2, onder a AVG), die je als ouder of wettelijk vertegenwoordiger namens het kind geeft (art. 8 AVG) door de schakelaar aan te zetten. Je kunt de modus op elk moment uitzetten; de app telt dan weer stappen.",
                "Deze gegevens (de schakelaar, dagen waarop duwen werden geteld en ingevoerde wandelingen) maken deel uit van de gegevensexport van je gezin en worden samen met het profiel van het kind of je account verwijderd; net als alle andere gegevens verdwijnen ze uiterlijk binnen 35 dagen uit onze versleutelde back-ups.",
              ],
            },
            {
              heading: "5. Wat we niet verzamelen",
              items: [
                "Geen locatie: PetPrep gebruikt geen gps.",
                "Geen andere gezondheidsgegevens uit Apple Gezondheid of Health Connect dan het dagelijkse aantal stappen of rolstoelduwen.",
                "Geen advertenties en geen SDK’s van derden voor advertenties of tracking in de app.",
                "Geen chat tussen gebruikers.",
                "Geen advertentiecookies op deze website. Analytische cookies worden alleen geplaatst als je dat toestaat (zie Cookies hieronder).",
              ],
            },
            {
              heading: "6. Waarom we gegevens verwerken (doelen en rechtsgronden)",
              items: [
                "Om de dienst te leveren waar je om hebt gevraagd: accounts, de simulatie, het dashboard, rapporten en meldingen (uitvoering van een overeenkomst).",
                "Om aankopen via de App Store of Google Play te verwerken (uitvoering van een overeenkomst).",
                "Voor de dagelijkse wandeling (dagelijkse stappentotalen – gezondheids- en fitnessgegevens, zie punt 3): uitvoering van een overeenkomst; uitlezen uit Apple Gezondheid, Health Connect of de bewegingssensor alleen met de toestemming die je op het apparaat geeft.",
                "Voor de aangepaste modus (het feit dat hij aanstaat, rolstoelduwen en ingevoerde wandelingen): de uitdrukkelijke toestemming van de ouder, gegeven door de schakelaar aan te zetten (art. 9, lid 2, onder a en art. 8 AVG – zie punt 4).",
                "Om de dienst veilig te houden, bijvoorbeeld door herhaalde inlogpogingen te beperken (gerechtvaardigd belang).",
                "Om de dienst te laten werken en te beveiligen met foutrapporten van de app, waarmee we vastlopers en crashes kunnen oplossen (gerechtvaardigd belang).",
                "Om aan wettelijke verplichtingen te voldoen, zoals de boekhouding van aankopen (wettelijke verplichting).",
                "Om je te mailen over de lancering van PetPrep als je je hebt aangemeld voor vroege toegang (toestemming – je kunt je in elke e-mail afmelden).",
                "Om te begrijpen hoe bezoekers deze website gebruiken, met Google Analytics, alleen als je analytische cookies toestaat (toestemming – je kunt dit op elk moment wijzigen onder Cookie-instellingen).",
              ],
            },
            {
              heading: "7. Kinderen",
              paragraphs: [
                "Alleen een ouder of wettelijk vertegenwoordiger kan een account aanmaken en een kind toevoegen. De ouder bepaalt wat het kind kan doen en kan het profiel van het kind op elk moment verwijderen. We vragen een kind nooit om contactgegevens, tonen nooit advertenties en laten nooit contact met vreemden toe.",
                "De accounthouder kan ook een verzorgersprofiel aanmaken voor zichzelf of voor een andere volwassene in het gezin – bijvoorbeeld om te testen of een ras bij die persoon past voordat die een dier koopt of adopteert. Voor zo’n profiel gelden dezelfde regels en dezelfde minimale gegevens; elke bescherming die voor kinderen is ontworpen, geldt ook voor dit profiel.",
              ],
            },
            {
              heading: "8. Door AI gegenereerde afbeeldingen en video’s",
              paragraphs: [
                "De foto en de korte video’s van elk huisdier worden door een AI-dienst gemaakt, uitsluitend op basis van een beschrijving van het huisdier (ras, vacht, aftekening en dergelijke). De beschrijving bevat nooit namen of andere informatie over je gezin. De voltooide media worden op gehuurde servers in Duitsland (Hetzner, EU) opgeslagen en via links met een korte geldigheid getoond.",
              ],
            },
            {
              heading: "9. Dienstverleners",
              items: [
                "Hosting: Hetzner Online (servers in de EU).",
                "Genereren van AI-afbeeldingen en -video’s: fal.ai (ontvangt alleen de beschrijving van het huisdier).",
                "Pushmeldingen: Apple Push Notification service en Firebase Cloud Messaging via Expo; de titel van een melding kan de naam van het huisdier zijn, als je het een naam hebt gegeven, maar meldingen bevatten nooit de naam van het kind.",
                "Aankopen: Apple App Store en Google Play; beheer van aankopen via RevenueCat zodra aankopen beschikbaar worden.",
                "E-mails over vroege toegang: Klaviyo (ontvangt alleen het e-mailadres en de taal die je op deze website invult).",
                "Cookietoestemming op de website: Kockica (slaat je toestemmingskeuze op).",
                "Websiteanalyse: Google Analytics 4 van Google Ireland Ltd., alleen met je toestemming; IP-adressen worden door Google Analytics 4 niet opgeslagen.",
                "Tagbeheer van de website: Google Tag Manager van Google Ireland Ltd.; plaatst zelf geen cookies, en de tags die hij laadt volgen je toestemming.",
                "Ingesloten video’s: YouTube van Google Ireland Ltd. (youtube-nocookie.com), pas geladen als je op afspelen drukt en advertentiecookies toestaat.",
              ],
            },
            {
              heading: "10. Hoe lang we gegevens bewaren",
              paragraphs: [
                "We bewaren je gegevens zolang je account bestaat. Als je het profiel van een kind of je account in de app verwijdert, worden de gegevens direct gewist en kunnen ze niet worden hersteld; uiterlijk binnen 35 dagen zijn ze ook automatisch uit onze versleutelde back-ups verdwenen. Gegevens die we wettelijk moeten bewaren (bijvoorbeeld bij aankopen), bewaren we zo lang als de wet vereist. Foutrapporten van de app worden na 30 dagen automatisch verwijderd.",
              ],
            },
            {
              heading: "11. Je rechten",
              paragraphs: [
                "Je hebt het recht op inzage, rectificatie, export en verwijdering van je gegevens, het recht om bezwaar te maken tegen de verwerking en om beperking ervan te vragen, en het recht om een klacht in te dienen bij een toezichthoudende autoriteit – in Slovenië de Informatiecommissaris (Informacijski pooblaščenec). In de app kun je alle gegevens van je gezin als bestand exporteren (Beheer → Account → Mijn gegevens exporteren) en het profiel van een kind of je hele account verwijderen. Voor alle andere vragen mail je naar {privacyEmail}.",
              ],
            },
            {
              heading: "12. Beveiliging",
              paragraphs: [
                "Wachtwoorden en codes worden als hash opgeslagen, verbindingen zijn versleuteld, live-updates worden alleen aan leden van je gezin geleverd en AI-media worden gecontroleerd voordat ze op het scherm van een kind komen.",
              ],
            },
            {
              heading: "13. Wijzigingen",
              paragraphs: ["Over belangrijke wijzigingen informeren we je in de app voordat ze ingaan. De datum bovenaan geeft de nieuwste versie aan."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Noodzakelijke cookies zorgen ervoor dat de website werkt en onthouden je toestemmingskeuze. Alle andere cookies worden alleen geplaatst als je ze in de banner toestaat, per categorie: functioneel (extra functies), analytisch (Google Analytics: welke pagina’s bezocht worden) en advertenties (YouTube-video’s die op sommige pagina’s zijn ingesloten; op deze website tonen we geen advertenties). Google Tag Manager plaatst zelf geen cookies, en elke tag die hij laadt volgt jouw keuze. Je kunt je keuze op elk moment wijzigen of intrekken.",
            "De toestemmingsbanner stelt de tabel hieronder automatisch op aan de hand van wat hij op deze website vindt; je ziet hier dus de cookies die we echt gebruiken.",
          ],
          settings: "Cookie-instellingen wijzigen",
          fallback: "De lijst met cookies wordt geladen met de toestemmingsbanner. Zie je de banner niet, sta dan scripts toe op deze pagina of mail naar {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Gebruiksvoorwaarden",
      meta: {
        title: "Gebruiksvoorwaarden – PetPrep",
        description:
          "De voorwaarden voor het gebruik van de PetPrep-app en -website: accounts en kinderprofielen, de challenge van 12 weken en het certificaat, aankopen en terugbetalingen, AI-inhoud, aangepaste modus, eerlijk gebruik, verwijdering en toepasselijk recht.",
      },
      eyebrow: "Juridisch",
      title: "Gebruiksvoorwaarden",
      lead: "Vertaling – alleen de Engelse versie is bindend. De regels voor het gebruik van PetPrep, geschreven om gelezen te worden.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. De dienst",
              paragraphs: [
                "PetPrep wordt aangeboden door {company}, {address}; {companyIds} – hetzelfde bedrijf dat volgens het privacybeleid de verwerkingsverantwoordelijke is. Deze voorwaarden gelden voor de PetPrep-app en de website petprep.si.",
                "PetPrep is een simulatie van de verzorging van een huisdier. Het helpt gezinnen en individuele gebruikers te ontdekken of ze klaar zijn om voor een echt huisdier te zorgen – kinderen, maar ook volwassenen die willen testen of een ras bij hen past voordat ze een dier kopen of adopteren. Het is een educatief hulpmiddel en geen veterinair of ander professioneel advies.",
              ],
            },
            {
              heading: "2. Accounts, profielen en kinderen",
              items: [
                "Accounts worden aangemaakt door volwassenen: ouders, wettelijke vertegenwoordigers of volwassenen die PetPrep voor zichzelf gebruiken. Als je je registreert, ga je akkoord met deze voorwaarden en het privacybeleid.",
                "Verzorgers (kinderen of volwassenen) zorgen voor het huisdier via een verzorgersprofiel dat de accounthouder aanmaakt; die kan er ook een voor zichzelf aanmaken. Een profiel heeft alleen een bijnaam nodig en eventueel een geboortejaar – meer hebben we over een kind niet nodig, dus vul dat nergens in de app in.",
                "Een kind logt in met een 6-cijferige code (pincode) die jij in je app aanmaakt. De code is kort geldig en werkt maar één keer; geef de code alleen aan het kind voor wie die bedoeld is.",
                "Als ouder of wettelijk vertegenwoordiger ben je verantwoordelijk voor hoe je kind PetPrep gebruikt: of het bij je kind past, hoeveel tijd je kind eraan besteedt en of je kind veilig is tijdens wandelingen (bijvoorbeeld in het verkeer). Je kunt het spel voor elk huisdier op elk moment stoppen.",
                "Je kunt een andere ouder met een uitnodigingscode aan het gezin toevoegen; jullie zien allebei alle gegevens van het gezin en kunnen allebei het spel stoppen.",
                "Geef juiste informatie en houd je wachtwoord, codes en apparaten veilig.",
              ],
            },
            {
              heading: "3. De challenge van 12 weken, de Care Score en het certificaat",
              items: [
                "De challenge duurt 12 weken (84 programmadagen) en begint bij de aankoop; elke verzorger heeft een eigen einddatum. Tijd waarin het spel op betaling wacht, telt niet mee voor de 12 weken. Upgrade je een gratis huisdier naar de challenge, dan beginnen de 12 weken ook bij de aankoop; de leeftijd van het huisdier wordt niet gereset, en de dagen vóór de aankoop blijven zichtbaar in de geschiedenis, gemarkeerd als vóór de challenge, maar tellen niet mee voor de 12 weken, de Care Score of het certificaat.",
                "De Care Score (0–100) laat zien welk deel van de verwachte routines (eten geven, water, opruimen, de wandeling, een trainingssessie) de verzorger zelf heeft gedaan; elke ziekte van het huisdier verlaagt de score. Tijd waarin het spel is gestopt of het huisdier bij de dierenarts is, en stille uren tellen nooit mee tegen de verzorger.",
                "Na 12 weken wordt een eindscore vastgelegd die later niet meer verandert; zorg na de challenge heeft hier geen invloed op. Met een score van 70 of hoger kun je in de app een Verantwoordelijkheidscertificaat (pdf) maken; onder de 70 krijg je een rapport van de challenge.",
                "Als eten, water of netheid 24 uur op 0% blijft, wordt het huisdier “naar het asiel gebracht” (game over). Het spel met dat huisdier eindigt, er is geen certificaat en je krijgt een rapport van de challenge.",
                "De Care Score en het certificaat laten alleen zien hoe de verzorger in de app voor een gesimuleerd huisdier heeft gezorgd. Ze zijn geen garantie dat een kind of iemand anders klaar is voor een echt huisdier, geen professionele beoordeling en geen vervanging van je eigen oordeel of van het advies van een dierenarts, fokker of asiel. De beslissing over een echt huisdier ligt altijd bij jou.",
                "De spelregels (maaltijden, wandelingen en verzorging per ras en leeftijd) zijn vereenvoudigd en gebaseerd op openbare bronnen. Ze zijn geen veterinair advies; vraag een dierenarts naar de gezondheid en verzorging van een echt dier.",
              ],
            },
            {
              heading: "4. Gratis en betaalde functies, aankopen en terugbetalingen",
              items: [
                "De kruisingshond en de huiskat zijn voor altijd gratis en daarmee probeer je PetPrep uit; er is geen gratis proefperiode van de challenge. Een gratis huisdier heeft geen programma van 12 weken en geen certificaat; de ouder ziet de geschiedenis van de afgelopen 7 dagen en het huisdier heeft een basisset aan afbeeldingen en video’s.",
                "De PetPrep Challenge van 12 weken is een eenmalige aankoop, geen abonnement (€ 49,99 in Slovenië; de store toont de prijs voor jouw land). In de huidige versie van de app kun je de challenge met elk ras kiezen, ook met de kruisingshond en de huiskat. Eén aankoop is één challenge voor één huisdier; elke nieuwe challenge met een nieuw huisdier is een nieuwe aankoop. Broers en zussen die voor hetzelfde huisdier zorgen, betalen één keer.",
                "Een ouder kan een gratis kruisingshond of huiskat waar al iemand voor zorgt, voor dezelfde prijs en met hetzelfde huisdier upgraden naar de challenge. Na een game over en voor kruisingshonden die in een vroege versie van de app zijn aangemaakt, is een upgrade niet mogelijk; de app laat zien wanneer dat geldt. Een huisdier in de challenge (ook een geüpgraded huisdier en een kruisingshond of huiskat die voor de challenge is gekozen) kan niet terug naar het gratis plan; alleen een terugbetaling brengt een kruisingshond of huiskat daar terug (zie hieronder).",
                "Een ouder koopt in de eigen app via de App Store of Google Play; in de app van het kind zijn geen aankopen mogelijk. De store verwerkt de betaling volgens de eigen voorwaarden.",
                "Je kunt een challenge-huisdier aanmaken voordat je koopt. Zolang de challenge niet is betaald, is het spel gepauzeerd: het huisdier wacht veilig, zijn behoeften dalen niet en er gaat niets achteruit. Zodra je koopt, gaat het spel verder waar het was gestopt.",
                "Terugbetalingen worden door de App Store en Google Play afgehandeld volgens hun eigen regels; vraag een terugbetaling aan bij de store waar je hebt gekocht. Als de store een aankoop terugbetaalt voordat de challenge klaar is, wordt het spel van dat huisdier weer gepauzeerd. Afbeeldingen en video’s die na de aankoop zijn gemaakt, blijven bestaan. Een kruisingshond of huiskat wordt dan niet gepauzeerd, maar gaat terug naar het gratis plan: de challenge stopt zonder certificaat, de regels van het gratis plan gelden weer en het huisdier toont weer de basisset beelden en video’s. Koop je de challenge later opnieuw voor dat huisdier, dan beginnen er 12 nieuwe weken vanaf de nieuwe aankoop.",
                "Na een game over (asiel) ontgrendelt een aankoop het huisdier niet meer; een nieuwe challenge is een nieuw huisdier en een nieuwe aankoop.",
                "Wensen (spullen voor het huisdier, zodra beschikbaar): een kind kan erom vragen, maar alleen een ouder kan ze kopen, in de eigen app. Een gekocht artikel hoort bij het huisdier waarvoor het is gekocht en is alleen voor de sier – het heeft geen invloed op het spel, de score of het certificaat. Na een game over of als het huisdier wordt verwijderd, geldt de aankoop als gebruikt en wordt die niet terugbetaald. Als de store de aankoop terugbetaalt, wordt het artikel verwijderd (bij snoepjes de ongebruikte snoepjes).",
                "Als je een huisdier, een kind of het account verwijdert terwijl een gekochte challenge nog loopt, geldt de aankoop als gebruikt: die gaat niet over naar een ander huisdier en verwijderen is geen terugbetaling. De app waarschuwt je vooraf en vraagt om bevestiging.",
              ],
            },
            {
              heading: "5. Door AI gegenereerde afbeeldingen en video’s",
              items: [
                "Afbeeldingen en video’s van huisdieren worden met kunstmatige intelligentie (AI) gemaakt, uitsluitend op basis van een beschrijving van het huisdier (ras, kleur, vacht enzovoort), nooit op basis van gegevens over je gezin. Het zijn illustraties van een gesimuleerd huisdier en ze komen niet noodzakelijk exact overeen met een echt dier of een rasstandaard.",
                "Waar we ze openbaar tonen, zoals de rasportretten op deze website, zijn ze gemarkeerd als door AI gegenereerd.",
                "Een uiterlijk is niet per se uniek: huisdieren van hetzelfde betaalde ras en dezelfde kleur kunnen dezelfde afbeeldingen en video’s delen, en gratis huisdieren krijgen een van de gedeelde uiterlijken van hun ras. Een betaalde challenge bevat een grotere set video’s dan een gratis huisdier.",
                "Nadat het contract is ondertekend of een aankoop is gedaan, kan het maken van de afbeeldingen en video’s een paar minuten duren; intussen laat de app zien dat het huisdier zich klaarmaakt en geeft aan wat nog wordt voorbereid.",
                "Rasinformatie in de app en in de dierenencyclopedie op deze website is een samenvatting van de openbare bronnen die we vermelden en is niet door een dierenarts gecontroleerd.",
              ],
            },
            {
              heading: "6. Stappen, gezondheidsgegevens en aangepaste modus",
              items: [
                "De dagelijkse wandeling telt de echte stappen van de verzorger. Als je dat toestaat, leest de app ze uit Apple Gezondheid of Health Connect, alleen lezen (de app schrijft daar nooit iets naartoe), of uit de bewegingssensor van de telefoon. Welke gegevens we verwerken, staat in het privacybeleid (punt 3).",
                "De aangepaste modus is voor kinderen die een rolstoel gebruiken: de wandeling telt dan rolstoelduwen in plaats van stappen. Je kunt de modus gebruiken zodra de functie beschikbaar is in jouw versie van de app. Een ouder zet de modus aan voor een afzonderlijk kind; aanzetten betekent dat je toestemming geeft, uitzetten dat je die intrekt (privacybeleid, punt 4).",
                "In de aangepaste modus kan een ouder wandelminuten voor het kind invoeren, alleen voor vandaag. Jij bent verantwoordelijk voor deze invoer: voer alleen wandelingen in die echt hebben plaatsgevonden, want ze tellen mee voor de Care Score en het certificaat.",
                "PetPrep gebruikt geen locatie en waarschuwt niet voor gevaren tijdens een wandeling; voor de veiligheid tijdens wandelingen zorg jij.",
              ],
            },
            {
              heading: "7. Meldingen",
              paragraphs: [
                "Als je dat op het apparaat toestaat, stuurt de app pushmeldingen: herinneringen aan de verzorger, waarschuwingen aan ouders als een huisdier geen eten of water heeft of niet schoon is, en berichten over ziekte, game over en het einde van de challenge. De titel van een melding kan de naam van het huisdier zijn, als je het een naam hebt gegeven; meldingen bevatten nooit de naam van het kind en worden niet tijdens stille uren verstuurd. Je kunt de toestemming op elk moment intrekken in de instellingen van het apparaat; zonder meldingen kan een verzorger routines missen, en dat heeft invloed op het spel en de score. Ouders krijgen daarnaast hoogstens één keer per gratis huisdier een herinnering over de challenge, wanneer iemand er in minstens 5 van de eerste 7 dagen voor heeft gezorgd.",
              ],
            },
            {
              heading: "8. Eerlijk gebruik",
              items: [
                "Speel niet vals met het aantal stappen of duwen, voer geen wandelingen in die niet hebben plaatsgevonden, probeer geen toegang te krijgen tot gegevens van andere gezinnen en probeer de dienst niet te reverse-engineeren of te verstoren.",
                "Geef huisdieren geen beledigende of ongepaste namen en vul geen persoonsgegevens over een kind in waar de app niet om vraagt.",
                "We kunnen accounts beperken of opschorten die deze regels overtreden of kinderen in gevaar brengen, en we kunnen een ongepaste naam van een huisdier verwijderen.",
              ],
            },
            {
              heading: "9. Intellectueel eigendom",
              paragraphs: [
                "PetPrep, het logo, het ontwerp, de software en de inhoud zijn eigendom van {company}. Je mag de app en de afbeeldingen, video’s en het certificaat van je huisdier persoonlijk en niet-commercieel binnen je gezin gebruiken – bijvoorbeeld door ze met familie te delen.",
              ],
            },
            {
              heading: "10. Aansprakelijkheid",
              paragraphs: [
                "We doen ons best om PetPrep beschikbaar en juist te houden, maar de dienst wordt geleverd “zoals hij is” en is ook afhankelijk van diensten van derden (de appstores, Apple Gezondheid, Health Connect, pushmeldingen, de AI-dienst) waar wij geen invloed op hebben. Voor zover de wet dat toestaat, zijn we niet aansprakelijk voor indirecte schade of voor beslissingen over het kopen of adopteren van een echt huisdier. Niets in deze voorwaarden beperkt de rechten die je als consument hebt op grond van dwingend recht.",
              ],
            },
            {
              heading: "11. Je account verwijderen en stoppen met gebruik",
              paragraphs: [
                "Je kunt het profiel van een kind of je account op elk moment in de app verwijderen. Verwijderen gebeurt meteen en is definitief; als de laatste ouder van een gezin het eigen account verwijdert, wordt het hele gezin verwijderd. Je kunt je gegevens eerst exporteren (Beheer → Account → Mijn gegevens exporteren). Wat er met de gegevens gebeurt, staat in het privacybeleid; wat er met een aankoop gebeurt, staat in punt 4.",
              ],
            },
            {
              heading: "12. Wijzigingen in deze voorwaarden",
              paragraphs: [
                "We werken deze voorwaarden bij als de app of de wet verandert. Over belangrijke wijzigingen informeren we je in de app voordat ze ingaan. De datum bovenaan geeft de nieuwste versie aan. Ben je het niet eens met een wijziging, dan kun je je account op elk moment verwijderen.",
              ],
            },
            {
              heading: "13. Recht en geschillen",
              paragraphs: [
                "Op deze voorwaarden is het recht van de Republiek Slovenië van toepassing. Consumenten kunnen zich ook beroepen op de dwingende bescherming van het land waar ze wonen en gebruikmaken van het EU-platform voor onlinegeschillenbeslechting.",
              ],
            },
            {
              heading: "14. Contact",
              paragraphs: [
                "Vragen over deze voorwaarden: {termsEmail}. Dienstverlener: {company}, {address}; {companyIds}. Privacyvragen: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Kinderveiligheid",
      meta: {
        title: "Kinderveiligheid – hoe PetPrep kinderen beschermt",
        description:
          "Hoe PetPrep kinderen beschermt: accounts aangemaakt door ouders, inloggen met een code zonder e-mailadres, minimale gegevens, geen advertenties of chat, geen locatievolging, gecontroleerde media.",
      },
      eyebrow: "Vertrouwen",
      title: "Vanaf de eerste regel code gebouwd voor kinderen.",
      lead: "Vertaling – alleen de Engelse versie is bindend. Een kind is de belangrijkste gebruiker van PetPrep, dus veiligheid en privacy zijn regels van het product, geen instellingen.",
      blocks: [
        {
          type: "cards",
          heading: "Onze normen",
          columns: 2,
          items: [
            { title: "Ouders maken elk account aan", text: "Kinderen kunnen zich niet zelf aanmelden. Een ouder voegt het kind toe en maakt een eenmalige inlogcode aan die 15 minuten geldig is." },
            { title: "Geen e-mailadres of wachtwoord voor kinderen", text: "Een kind logt in met de code van de ouder. Verkeerde, verlopen en gebruikte codes krijgen allemaal hetzelfde antwoord, zodat niemand kan raden welke kinderen er bestaan." },
            { title: "Minimale gegevens", text: "Een bijnaam en eventueel een geboortejaar. Geen achternaam, geen geboortedatum, geen foto’s van het kind." },
            { title: "Geen advertenties, geen chat, geen vreemden", text: "Er zijn geen advertenties en er is geen manier om contact op te nemen met andere gebruikers." },
            { title: "Geen locatievolging", text: "Wandelingen tellen alleen stappen – uit Apple Gezondheid of Health Connect (met je toestemming, alleen lezen) of uit de bewegingssensor van de telefoon. Gps wordt niet gebruikt." },
            { title: "Besloten live-updates", text: "Realtime updates bereiken alleen de kinderen die voor dat huisdier zorgen en de ouders van hetzelfde gezin." },
            { title: "Gecontroleerde media", text: "Alleen afbeeldingen en video’s die voor PetPrep zijn gemaakt en door onze server zijn gecontroleerd, worden getoond, vanuit onze opslag in de EU." },
            { title: "Geen kindernamen in meldingen", text: "Meldingen bevatten nooit de naam van het kind, omdat ze op het vergrendelscherm kunnen verschijnen. Alleen de naam van het huisdier kan als titel verschijnen, als je het een naam hebt gegeven." },
          ],
        },
        {
          type: "list",
          heading: "Ouders houden de regie",
          items: [
            "Stille uren voor school en slaap, zonder meldingen.",
            "Een pauzeknop die het scherm van het kind meteen op slot zet.",
            "Een kind in één keer uitloggen op alle apparaten.",
            "Alle gegevens direct exporteren of verwijderen in de app.",
          ],
        },
        { type: "callout", title: "Zorgen? Laat het ons weten", text: "Baart iets in PetPrep je zorgen? Schrijf ons en we reageren met voorrang.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Toegankelijkheid",
      meta: {
        title: "Toegankelijkheid – PetPrep voor elk kind",
        description:
          "Hoe PetPrep zich aanpast aan kinderen voor wie vegen lastig is, die VoiceOver of TalkBack gebruiken of liever minder beweging zien – met dezelfde regels en punten voor iedereen.",
      },
      eyebrow: "Vertrouwen",
      title: "Elk kind kan voor het eigen huisdier zorgen.",
      lead: "Sommige kinderen vinden vegen lastig, gebruiken een schermlezer of zien liever minder beweging op het scherm. PetPrep past zich aan hen aan – met dezelfde regels, dezelfde punten en hetzelfde certificaat als iedereen.",
      blocks: [
        {
          type: "cards",
          heading: "In de app",
          columns: 3,
          items: [
            { title: "Eenvoudigere gebaren", text: "Een kind houdt een vinger op het scherm of drukt op een knop in plaats van te vegen – in elk spel waarin je veegt: borstelen, spelen met de hengel met veren, de kattenbak verschonen en de bal gooien. Een ouder zet dit voor elk kind aan in het ouderdeel van de app." },
            { title: "Schermlezers", text: "Als VoiceOver of TalkBack aanstaat, schakelen de spellen vanzelf over op vasthouden. De balk met het huisdier leest alles over het huisdier voor, en elke stap in de verzorgingsspellen is een eigen knop." },
            { title: "Minder beweging", text: "Als de telefoon is ingesteld op minder beweging, staan pulserende knoppen en de wiebelende Curio stil." },
          ],
        },
        {
          type: "cards",
          heading: "Komt met de volgende update van de app",
          items: [
            { title: "Wandelen met een rolstoel", text: "In de aangepaste modus tellen rolstoelduwen precies zoals stappen – één duw is één stap. Een ouder kan ook de wandelminuten van vandaag invoeren, zodat het kind niets extra’s hoeft te doen. Een ouder zet de modus voor elk kind aan; uitzetten haalt de markering uit de geschiedenis." },
          ],
        },
        { type: "callout", title: "Dezelfde challenge voor iedereen", text: "Aanpassingen veranderen hoe een kind speelt, nooit wat er telt. Scores, tijden en het Verantwoordelijkheidscertificaat werken precies hetzelfde. We vragen nooit waarom een kind een aanpassing nodig heeft.", tone: "mint" },
        { type: "callout", title: "Werkt iets niet voor je kind?", text: "Vertel ons wat in de weg zat en we kijken ernaar.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Account verwijderen",
      meta: {
        title: "Je PetPrep-account en -gegevens verwijderen",
        description:
          "Hoe je je PetPrep-account verwijdert in de app of per e-mail, welke gegevens worden verwijderd, wat bewaard blijft en hoe lang.",
      },
      eyebrow: "Vertrouwen",
      title: "Je PetPrep-account verwijderen",
      lead: "Vertaling – alleen de Engelse versie is bindend. Je kunt je account en de gegevens van je gezin op elk moment verwijderen – meteen in de app, of per e-mail als je de app niet meer hebt.",
      blocks: [
        {
          type: "steps",
          heading: "Je account verwijderen in de app (meteen)",
          items: [
            { title: "Log in als ouder", text: "Open PetPrep, tik op “Ik ben een ouder” en log in." },
            { title: "Open je account", text: "Ga naar Beheer → Account. Optioneel: tik eerst op “Mijn gegevens exporteren” om een kopie te bewaren." },
            { title: "Verwijderen", text: "Tik op “Account verwijderen”, bevestig met je wachtwoord (of je Google- of Apple-login), typ DELETE en tik dan op “Definitief verwijderen”." },
            { title: "Klaar", text: "Verwijderen gebeurt meteen en kan niet ongedaan worden gemaakt. Al je apparaten en de apparaten van je kinderen worden uitgelogd." },
          ],
        },
        {
          type: "prose",
          heading: "Heb je de app niet meer? Vraag verwijdering aan per e-mail",
          paragraphs: [
            "Stuur een e-mail naar [privacy@petprep.si](mailto:privacy@petprep.si) vanaf het e-mailadres van je PetPrep-ouderaccount, met als onderwerp “Verwijder mijn account”. We controleren of het verzoek van de accounthouder komt, verwijderen het account uiterlijk binnen een maand (meestal binnen een paar dagen) en bevestigen dat daarna per e-mail.",
            "Wil je alleen het profiel van één kind verwijderen? Log in als ouder en open het kind via Beheer → Kinderen → Profiel verwijderen.",
          ],
        },
        {
          type: "table",
          heading: "Wat wordt verwijderd en wat blijft bewaard",
          head: ["Gegevens", "Wat er gebeurt"],
          rows: [
            ["Je ouderaccount (naam, e-mailadres, wachtwoord, koppeling met inloggen via Google / Apple)", "Meteen verwijderd"],
            ["Als je de enige ouder in het gezin bent: profielen van kinderen (bijnaam, geboortejaar), huisdieren, AI-afbeeldingen en -video’s, contracten en handtekeningen, verzorgingslogboek, Care Scores, certificaten, stappentellingen, stille uren, inlogcodes", "Meteen verwijderd"],
            ["Als er nog een andere ouder in het gezin is", "Alleen je eigen account wordt verwijderd; het gezin blijft bestaan bij de andere ouder"],
            ["Apparaten en meldingstokens", "Meteen uitgelogd en verwijderd"],
            ["Aankoopgegevens (product, datum, transactie-ID van de store, een anonieme aankoop-ID – geen naam of e-mailadres)", "Bewaard zolang de boekhoud- en belastingwetgeving dat vereist, niet meer gekoppeld aan je gezin"],
            ["Gegevens over AI-kosten", "Bewaard voor de boekhouding, zonder enige koppeling met jou, je kinderen of je huisdieren"],
            ["Versleutelde back-ups", "Automatisch verwijderd binnen 35 dagen"],
          ],
          note: "De aankopen zelf worden afgehandeld door de App Store en Google Play; de gegevens daarover worden door Apple en Google bewaard volgens hun eigen beleid. Een challenge die is gekocht maar niet is afgerond, wordt niet terugbetaald als je je account verwijdert.",
        },
        { type: "callout", title: "Vragen?", text: "Schrijf naar privacy@petprep.si. Alle details staan in ons privacybeleid.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Dierenencyclopedie van PetPrep – diersoorten en rassen, met bronnen",
        description:
          "Honden, katten en hun rassen: wat elk dier nodig heeft, bij wie het past en hoe PetPrep het simuleert. Zoek en vergelijk rassen; bij elk feit staat een link naar de bron.",
      },
      navLabel: "Dieren",
      eyebrow: "Dierenencyclopedie",
      title: "Leer het dier kennen voordat het bij jou thuiskomt.",
      lead:
        "Wat elke diersoort en elk ras in PetPrep echt nodig heeft – gebaseerd op kennelclubs, kattenstamboeken, dierenwelzijnsorganisaties en onderzoek, met bij elk feit een link naar de bron. En de regels waarmee PetPrep dat simuleert.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Over PetPrep – bedrijf, oprichter en hoe we informatie over huisdieren onderbouwen",
        description:
          "Wie PetPrep maakt: oprichter David Tacer, onze missie en hoe de dierenencyclopedie haar informatie onderbouwt en controleert.",
      },
      navLabel: "Over ons",
      eyebrow: "Over ons",
      title: "Wie PetPrep maakt.",
      lead: "PetPrep wordt gemaakt in Maribor, Slovenië, door een klein softwarebedrijf. Op deze pagina lees je wie we zijn, waarom we PetPrep bouwen en hoe we bepalen wat de app en de dierenencyclopedie over dieren zeggen.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Het bedrijf",
          paragraphs: [
            "PetPrep wordt aangeboden door Data Vallis David Tacer s.p., een softwareontwikkelingsbedrijf (eenmanszaak) met statutaire zetel in Dravograd, Slovenië. Hetzelfde bedrijf beheert deze website en de PetPrep-app en is de verwerkingsverantwoordelijke voor persoonsgegevens (zie het [privacybeleid](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "De oprichter",
          paragraphs: [
            "PetPrep is opgericht door David Tacer, softwareontwikkelaar en ondernemer uit Maribor, Slovenië.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Onze missie",
          paragraphs: [
            "Elk gezin kent het: “Ik beloof dat ik er goed voor zorg.” PetPrep maakt van die belofte bewijs: 12 weken lang zorgt een kind – of een volwassene met een bepaald ras op het oog – voor een levensecht AI-huisdier met de dagelijkse behoeften van een echt dier, en de ouder ziet elke dag of de zorg blijft.",
            "Als het in de simulatie misgaat, is dat ook een goede uitkomst: het gezin ontdekt het voordat een echt dier eronder lijdt en voordat het jaren aan zorg en kosten op zich neemt. Als er wel een echt huisdier in huis komt, willen we dat PetPrep nuttig blijft voor het hele leven van het dier.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Hoe de dierenencyclopedie tot stand komt",
          intro: "De [dierenencyclopedie](page:animals) en de app gebruiken dezelfde gegevens. Deze regels bepalen wat erin mag staan:",
          items: [
            "Bij elk feit staat de bron, met een link. Bronnen worden ingedeeld naar het gewicht dat ze verdienen: A – rasstandaarden, peer-reviewed artikelen en richtlijnen van dierenartsenverenigingen; B – adviespagina’s van dierenklinieken, universiteiten en nationale dierenwelzijnsorganisaties; C – secundaire samenvattingen (encyclopedieën, persartikelen), alleen gebruikt samen met een A- of B-bron.",
            "Alleen onderbouwde feiten worden als feit getoond. Een waarde die door geen enkele bron wordt ondersteund, publiceren we niet. Waar bronnen elkaar tegenspreken, tonen we de waarde van elke bron.",
            "Spelregels zijn geen veterinair advies. Waar het spel een getal nodig heeft dat bronnen niet precies geven (bijvoorbeeld een dagelijks stappendoel), bepaalt PetPrep die zelf op basis van de bronnen en toont die alleen onder “Hoe PetPrep het simuleert”, gemarkeerd als spelregel.",
            "Gezondheidsinformatie is uitsluitend informatief. Ze vat samen wat de bronnen over een ras zeggen en is niet door een dierenarts gecontroleerd. Raadpleeg voor een echt dier een dierenarts.",
            "Rasstandaarden worden in onze eigen woorden samengevat, nooit uitgebreid overgenomen, en een ras wordt nooit “hypoallergeen” genoemd.",
            "De encyclopedie wordt samengesteld uit de onderzoeksgegevens van PetPrep, dezelfde gegevens die de app gebruikt. Verandert een bron of een waarde, dan wordt de encyclopedie opnieuw gegenereerd en toont elke raspagina de datum van de laatste update. Zie je een fout? Mail naar hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Vragen over PetPrep?", text: "Mail naar het juiste adres via de contactpagina – voor gezinnen, privacy, partners of investeerders.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Maak kennis met Curio – de mascotte van PetPrep",
        description:
          "Curio is de mascotte van PetPrep: het nieuwsgierige blokje uit ons logo en de ster van onze korte video’s. Lees wie Curio is en hoe Curio verschilt van het levensechte huisdier in de app, en bekijk afbeeldingen en een mediakit.",
      },
      navLabel: "Maak kennis met Curio",
      eyebrow: "Onze mascotte",
      title: "Maak kennis met Curio.",
      lead: "Curio is het nieuwsgierige blokje uit het logo van PetPrep, tot leven gebracht. In onze korte video’s is het het huisdier dat bij de deur wacht tot iemand een belofte nakomt. Het is onze mascotte – niet het huisdier waar je in de app voor zorgt.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, de mascotte van PetPrep: een zacht grafietkleurig blokje met grote witte ogen, een kleine frambozenrode neus en een mintgroene halsband, dat zwaait.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Wie is Curio?",
          paragraphs: [
            "Curio begon als het beeldmerk in ons logo: een afgerond grafietkleurig vierkant met twee grote ogen die naar rechtsboven kijken, en een kleine frambozenrode neus. In het Sloveens noemen we het Radovednež – “de nieuwsgierige”. In oktober 2026 kreeg het korte armpjes, stompe beentjes en een mintgroene halsband met een ronde penning, en werd het een personage.",
            "Curio heeft geen mond. Alles wat Curio voelt, zie je aan de ogen: wijd open als iemand “wandelen?” fluistert, twee slaperige streepjes als er nog niemand thuis is, blije boogjes als de bak vol is.",
            "Curio is een “het” – geen jongen of meisje, geen hond of kat. Het staat voor elk huisdier dat elke dag wacht tot iemand een belofte nakomt.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio in het kort",
          columns: 3,
          items: [
            { title: "Naam", text: "Curio in het Engels, Radovednež in het Sloveens." },
            { title: "Gemaakt van", text: "Zacht grafiet, een mintgroene halsband en een frambozenrode penning – de kleuren van PetPrep." },
            { title: "Praat", text: "Nooit. Alleen met zijn ogen." },
            { title: "Houdt van", text: "Wandelingen, een volle bak en kinderen die op dag 15 nog steeds terugkomen." },
            { title: "Woont", text: "In onze korte video’s op [TikTok](https://www.tiktok.com/@petprep.si) en [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Taak", text: "Gezinnen er met een knipoog aan herinneren dat een huisdier elke dag zorg nodig heeft." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio is niet het huisdier in de app",
          intro: "In onze video’s speelt Curio een huisdier dat zorg nodig heeft, want dat heeft elk huisdier. In PetPrep zorgen kinderen – en volwassenen die een ras uitproberen – voor iets wat veel dichter bij het echte werk komt.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, de getekende mascotte, zwaait op een lichte achtergrond.",
              label: "Mascotte",
              title: "Curio – onze mascotte",
              text: "Een stripfiguurtje voor onze video’s, stickers en deze pagina. Het laat zien waar PetPrep om draait. Je kunt het niet adopteren.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Een levensecht, door AI gegenereerd portret van een labrador retriever, zoals huisdieren eruitzien in de PetPrep-app.",
              label: "In de app · AI-afbeelding",
              tone: "mint",
              title: "Jouw huisdier in PetPrep",
              text: "Een levensechte AI-simulatie van een echt ras – zoals deze [labrador retriever](+breed:labrador_retriever) – met de dagelijkse behoeften van een echt dier: maaltijden, water, wandelingen geteld in echte stappen, opruimen en training. Bekijk [hoe het werkt](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio in beeld",
          intro: "Curio is een gestileerd 3D-personage, gemaakt met AI-tools op basis van ons eigen ontwerp. Nieuwe scènes verschijnen eerst in onze video’s.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio zwaait op een mintgroene achtergrond.", caption: "Hallo! De klassieke zwaai.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio staat op een witte plank en zwaait.", caption: "Op de plank, wachtend op iemand." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio van voren, van opzij en van achteren, met vier verschillende oogexpressies.", caption: "Van alle kanten, en zo laten de ogen gevoelens zien." },
            { src: "/curio/curio-waving.webp", alt: "Curio op een transparante achtergrond.", caption: "Uitgeknipt – klaar voor je post (zie de mediakit).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediakit",
          intro: "Voor makers, journalisten en partners die over PetPrep schrijven. Vragen of ideeën voor een samenwerking: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Alles downloaden", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, transparante achtergrond", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, vierkant, licht", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, vierkant, mint", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Personageblad", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo van PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Beeldmerk van PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Curio gebruiken",
          rules: [
            "Gebruik Curio in posts, artikelen en video’s over PetPrep. Voor advertenties, producten of merchandise vraag je het ons eerst.",
            "Laat Curio zien zoals het is: grafietkleurig blokje, witte ogen, frambozenrode neus, mintgroene halsband. Voeg geen mond, oren, vacht of wenkbrauwen toe, verander de kleuren niet en rek het niet uit.",
            "Curio is de mascotte van PetPrep. Presenteer het niet als het huisdier in de app of als een echte hond of kat.",
            "Gebruik Curio niet op een manier die suggereert dat PetPrep een ander product, doel of persoon steunt.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Vragen over Curio",
          items: [
            { q: "Is Curio een hond of een kat?", a: "Geen van beide. Curio is een blokje uit ons logo. Het speelt een huisdier in onze video’s, maar het is zelf geen diersoort." },
            { q: "Kan mijn kind in de app voor Curio zorgen?", a: "Nee. In de app zorgt je gezin voor een levensecht huisdier van een echt ras, met dezelfde dagelijkse behoeften als het echte dier. Curio verschijnt alleen in onze video’s en op de website." },
            { q: "Waarom heeft Curio geen mond?", a: "Omdat ons logo er ook geen heeft. Curio zegt alles met de ogen – en bedelt nooit hardop om snoepjes." },
            { q: "Waar zie ik nieuwe video’s van Curio?", a: "Op TikTok en Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Kennis over verzorging – wat honden en katten mogen eten, met bronnen | PetPrep",
        description:
          "Welk eten giftig, riskant of prima is voor honden en katten – met de reden, de verschijnselen en wat je moet doen, en bij elk antwoord links naar de bronnen. Gemaakt door PetPrep voor gezinnen die zich voorbereiden op een huisdier.",
      },
      navLabel: "Verzorging",
      eyebrow: "Kennis over verzorging",
      title: "Wat is veilig voor je huisdier?",
      lead:
        "Duidelijke, onderbouwde antwoorden voor gezinnen: welk eten giftig is, welk riskant en welk prima als snoepje – voor honden en katten, en later voor meer diersoorten. Bij elk antwoord staan links naar de bronnen.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Gratis kleurplaten van honden en katten om te printen | PetPrep",
        description:
          "Gratis kleurplaten om te printen: golden retriever, labrador, border collie, kruisingspup, kitten en Curio. Pdf’s in A4 en US Letter, elk met een echt weetje over dierenverzorging en de bron.",
      },
      navLabel: "Kleurplaten",
      eyebrow: "Kleurplaten",
      title: "Gratis kleurplaten om te printen.",
      lead:
        "Honden, katten en Curio om in te kleuren of na te tekenen – print één kleurplaat of het hele kleurboek. Op elke kleurplaat staat een echt weetje over dierenverzorging, afkomstig van een dierenarts of kennelclub, om samen te lezen.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Voor kinderen die een huisdier willen – kleurplaten, Curio en #walkyourpet | PetPrep",
        description:
          "Alles wat PetPrep voor kinderen heeft: gratis kleurplaten om te printen met echte weetjes over dierenverzorging, mascotte Curio en #walkyourpet – voor kinderen en ouders die zich samen voorbereiden op een huisdier.",
      },
      navLabel: "Voor kinderen",
      eyebrow: "Voor kinderen",
      title: "Voor kinderen die een huisdier willen.",
      lead: "Kleurplaten om te printen, Curio en #walkyourpet – voor kinderen en ouders die zich samen voorbereiden op een huisdier.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, de mascotte van PetPrep: een zacht grafietkleurig blokje met grote witte ogen, een kleine frambozenrode neus en een mintgroene halsband, dat zwaait.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – de beweging die begon bij een echt kind",
        description:
          "“We could go walk your pet.” Een kind zei het, en nu is het een beweging: gezinnen die naar buiten gaan omdat een huisdier een wandeling nodig heeft. Hoe het begon, wat het betekent in PetPrep en hoe je meedoet.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Wij hebben deze zin niet bedacht. Een kind wel. Nu is het een uitnodiging voor elk gezin: ga naar buiten, want een huisdier heeft zijn wandeling nodig – een echt huisdier of het huisdier waarmee je in PetPrep oefent.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Storykaart: “Gehoord bij de oprichter thuis.” Een kind zegt “Lahko bi šli walk your pet” – “We kunnen gaan walk your pet” – en de titel luidt “#walkyourpet is nu een ding.”", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Hoe het begon",
          paragraphs: [
            "In oktober 2026 hadden de kinderen van onze oprichter een vriendinnetje over de vloer. Ze waren aan het overleggen of ze naar buiten zouden gaan, en zij zei, half in het Sloveens en half in het Engels: “Lahko bi šli walk your pet” – “We kunnen gaan walk your pet.”",
            "Niemand had het haar gevraagd. Ze kende PetPrep, waar de wandeling van een hond alleen telt als je echt naar buiten gaat, en “walk your pet” was voor haar gewoon een reden om erop uit te gaan. We vonden het zo leuk dat we het hebben gehouden – in het Engels, in elke taal.",
            "Een echt gesprek. Echte kinderen.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Wat het betekent in PetPrep",
          intro: "In PetPrep bestaat de dagelijkse wandeling van de hond uit de echte stappen van je kind, die met jouw toestemming worden uitgelezen uit Apple Gezondheid of Health Connect. Op de bank blijven zitten telt niet, dus “walk your pet” betekent altijd naar buiten gaan. Geen gps en geen locatie – alleen stappen.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Doe mee met de beweging",
          intro: "Je hebt de app hier niet voor nodig. Elk gezin dat voor een huisdier naar buiten gaat – een echt huisdier of een oefenhuisdier – hoort erbij.",
          items: [
            { title: "Ga naar buiten", text: "Laat de hond uit. Of maak, als je nog twijfelt over een huisdier, de wandeling die je met een huisdier zou maken." },
            { title: "Leg het moment vast", text: "Schoenen bij de deur, een riem, het pad, pootjes in het gras. Geen gezichten, geen namen." },
            { title: "Deel het", text: "Post het met #walkyourpet en tag @petprep.si op Instagram of TikTok. Met jouw toestemming delen we de mooiste momenten eventueel hier en op onze profielen." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Veilig delen",
          intro: "#walkyourpet gaat over kinderen, dus voor alles wat we delen gelden deze regels:",
          items: [
            "Ouders posten, kinderen niet. Alleen een ouder beslist wat er online komt.",
            "Geen gezichten, namen, scholen of adressen van kinderen – en nooit het kind van een ander gezin.",
            "We delen berichten alleen opnieuw met toestemming van een ouder en halen een bericht weg zodra je dat vraagt.",
            "Uitspraken van kinderen zijn altijd echt. We verzinnen of “verbeteren” nooit wat een kind zei.",
            "Het is een uitnodiging, geen verplichting. Geen streaks om in stand te houden, geen druk – gewoon een goede reden om naar buiten te gaan.",
          ],
        },
        {
          type: "callout",
          title: "Het eerste moment is van ons. Het volgende kan van jou zijn.",
          text: "Deel de wandeling van je gezin met #walkyourpet en tag @petprep.si. Vragen of een verhaal dat je wilt vertellen: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Vragen",
          items: [
            { q: "Heb ik PetPrep nodig om mee te doen?", a: "Nee. Iedereen die voor een huisdier naar buiten gaat, kan #walkyourpet gebruiken. PetPrep is waar de zin is ontstaan, en waar de wandeling van een oefenhond alleen telt in echte stappen." },
            { q: "Werkt het voor katten in PetPrep?", a: "Niet als wandeling. Katten gaan niet uit wandelen, dus in PetPrep voldoe je aan de behoeften van een kat door te spelen, niet met stappen. Wandelen is voor honden." },
            { q: "Waarom is de zin in het Engels?", a: "Omdat het kind het zo zei – in het Engels, midden in een Sloveense zin. Kinderen overal ter wereld mengen er Engels doorheen, dus de zin blijft in elke taal hetzelfde." },
            { q: "Posten jullie mijn kind?", a: "Alleen wat je zelf deelt en ons laat herposten, en nooit het gezicht of de naam van een kind. Vraag het ons via hello@petprep.si en we halen het weg." },
          ],
        },
      ],
    },
  },
};

export default nl;
