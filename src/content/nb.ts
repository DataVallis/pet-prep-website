import type { Dictionary } from "./types";

const nb: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Klar for et kjæledyr. Der for hele livet.",
    siteDescription:
      "PetPrep er en kjæledyrsimulator på 12 uker som viser foreldre om barnet virkelig er klart for et ekte kjæledyr – og som siden blir en AI-assistent gjennom hele dyrets liv.",
    slogan: "Klar for et kjæledyr. Der for hele livet.",
    keywords: [
      "er barnet mitt klart for hund",
      "app som lærer barn ansvar for kjæledyr",
      "virtuell kjæledyrsimulator",
      "AI-kjæledyrsimulator",
      "før man skaffer hund",
      "barn og kjæledyr",
      "test om vi er klare for et kjæledyr",
      "foreldreoversikt",
      "prøv en hunderase før kjøp",
      "passer denne rasen for meg",
    ],
  },
  nav: { home: "Forside", menu: "Meny", close: "Lukk menyen", skip: "Gå til innholdet" },
  lang: { label: "Språk", switchTo: "Bytt språk" },
  cta: {
    primary: "Start gratis med en blandingshund",
    secondary: "Se hvordan det fungerer",
    earlyAccess: "Få tidlig tilgang",
    earlyAccessSubject: "Tidlig tilgang til PetPrep",
    ios: "Last ned for iPhone",
    android: "Last ned for Android",
    comingSoon: "Kommer til iPhone og Android",
    readMore: "Les mer",
    contactUs: "Kontakt oss",
  },
  common: {
    planned: "Planlagt",
    plannedNote:
      "Denne siden beskriver det vi skal bygge som neste steg. Det finnes ikke i appen ennå, og detaljene kan endre seg.",
    legalDraft:
      "Teksten ferdigstilles sammen med våre juridiske rådgivere før den offentlige lanseringen. Kontakt oss hvis noe er uklart.",
    lastUpdated: "Sist oppdatert",
    breadcrumbHome: "Forside",
    screensNote: "Skjermbildene fra appen på dette nettstedet er forhåndsvisninger; den ferdige appen kan se litt annerledes ut.",
    perPet: "per kjæledyr",
    free: "Gratis",
    forever: "for alltid",
    notFoundTitle: "Denne siden har stukket av fra båndet.",
    notFoundText: "Siden du leter etter, finnes ikke eller er flyttet.",
    notFoundCta: "Tilbake til forsiden",
  },
  footer: {
    tagline: "Klar for et kjæledyr. Der for hele livet.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Selskap", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Tillit", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Alle rettigheter forbeholdt.",
    dataEu: "Data lagres i EU.",
    languages: "Flere språk kommer snart.",
    company: "Drives av:",
    cookieSettings: "Innstillinger for informasjonskapsler",
    a11yBadge: { title: "Tilgjengelig lek", text: "Enklere bevegelser · Skjermlesere · Mindre bevegelse" },
  },
  screens: {
    pin: "Barnet logger inn med en sekssifret kode fra forelderen – ingen e-post, ikke noe passord.",
    contract: "Ansvarskontrakten, signert med en finger. Signaturen gir kjæledyret liv.",
    hud: "Barnets startskjerm: kjæledyrets tilstand i sanntid, fire behov og knappene for stell.",
    picker: "Foreldrene velger kjæledyret: rase, opprinnelse (adoptert eller fra oppdretter) og alder ved ankomst.",
    parent: "Foreldreoversikten: et trafikklys, Care Score og dagens rutiner for hvert barn.",
    report: "Barnets rapport for 7, 30 eller 84 dager: rutiner, turer og glemte oppgaver dag for dag.",
    assistant: "Når kjæledyret er kommet hjem: AI-assistenten gjør data fra halsbåndet om til ett tydelig forslag.",
    certificate: "Etter 12 uker: Ansvarsdiplomet med barnets Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Blandingshund",
      text: "Hele simuleringen med et naturtro kjæledyr av blandingsrase.",
      features: [
        "Daglig stell med ekte konsekvenser",
        "Ekte turer, målt i ekte skritt fra telefonen",
        "Foreldreoversikt, trafikklys og Care Score",
        "Stille timer og en pauseknapp",
        "Fotorealistisk bilde av kjæledyret og korte videoer",
        "Legg til 12-ukersutfordringen senere, med det samme kjæledyret",
      ],
      cta: "Start gratis",
    },
    challenge: {
      name: "12-ukersutfordringen fra PetPrep",
      badge: "12 uker + diplom",
      unit: "per kjæledyr · 12 uker",
      text: "For familier som vil ha hele opplevelsen og et diplom til slutt.",
      features: [
        "Alt i Blandingshund",
        "Alle raser, som [border collie](breed:border_collie), eller blandingshunden og huskatten",
        "Kjæledyrets humør i AI-videoer",
        "Ansvarsdiplom",
        "Én pris når søsken deler et kjæledyr",
        "Tilgang for begge foreldrene",
      ],
      cta: "Velg utfordringen",
    },
    note:
      "Kjøp gjøres i appen via App Store eller Google Play. Et ekstra kjæledyr i samme familie er en egen utfordring. Prisene inkluderer mva. der det gjelder.",
  },
  earlyAccess: {
    title: "Få tidlig tilgang",
    text: "Bli en av de første familiene som prøver PetPrep. Vi sender deg en e-post når appen er klar – ikke noe annet.",
    label: "E-postadressen din",
    placeholder: "du@eksempel.no",
    button: "Få tidlig tilgang",
    sending: "Sender …",
    successTitle: "Du står på listen.",
    successText: "Takk! Du hører fra oss blant de første når PetPrep er klar.",
    invalid: "Skriv inn en gyldig e-postadresse.",
    error: "Noe gikk galt. Prøv igjen om et øyeblikk.",
    consent: "Når du melder deg på, godtar du å få e-post om PetPrep. Du kan melde deg av når som helst.",
    privacyLink: "Personvernerklæring",
  },
  contactCards: [
    { title: "Familier", text: "Spørsmål om appen, kontoen din eller utfordringen.", email: "hello" },
    { title: "Personvern", text: "Innsyn, eksport, sletting eller andre spørsmål om personvern.", email: "privacy" },
    { title: "Partnere", text: "Dyrebutikker, dyrehjem, dyrleger, trenere, forsikringsselskaper og skoler.", email: "partners" },
    { title: "Investorer", text: "Investornotat, presentasjon og datarom på forespørsel.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Er barnet ditt klart for et kjæledyr? Finn det ut på 12 uker.",
      description:
        "Før et ekte kjæledyr flytter inn, steller barnet ditt et naturtro AI-kjæledyr i 12 uker – med måltider, rydding og ekte turer. Du ser hver dag om barnet virkelig er klart.",
    },
    hero: {
      eyebrow: "12-ukersutfordringen fra PetPrep",
      title: "Klar for et kjæledyr. Der for hele livet.",
      lead:
        "Før et ekte kjæledyr flytter inn, steller barnet ditt et naturtro AI-kjæledyr i 12 uker – gir mat, rydder opp og går ekte turer. Du ser hver dag om barnet virkelig er klart.",
      trust: ["Blandingshund gratis for alltid", "Ingen reklame, ingen chat med fremmede", "Barn trenger ingen e-post"],
    },
    phone: {
      petName: "Luna",
      petAge: "Valp · 3 måneder",
      live: "LIVE",
      video: "Fotorealistisk AI-video av kjæledyret",
      actions: ["Mat", "Vann", "Tur", "Rydd"],
    },
    parentCard: { child: "Maja", status: "Alt i orden", scoreLabel: "Care Score", progress: "Uke 3 av 12 · 31 av 36 rutiner i tide" },
    notification: { app: "PetPrep", text: "Kjæledyret ditt ser på matskålen. Frokosttiden slutter kl. 09.00." },
    promoVideo: {
      eyebrow: "PetPrep på ett minutt",
      title: "Se hvordan det fungerer.",
      text: "Fra valg av kjæledyr og signering av kontrakten til skole, turer, pelsstell og diplom – alt barnet ditt gjør i løpet av 12 uker, og alt du ser i foreldreoversikten. Curio, maskoten vår, sier bare hei; kjæledyret i appen er en naturtro AI-hund.",
      alt: "Reklamevideo for PetPrep: skjermbilder fra appen, et barn som steller en hund, og en forelder som følger med på Care Score.",
      note: "Appen er ennå ikke tilgjengelig i App Store og Google Play – meld deg på for tidlig tilgang.",
    },
    promise: {
      quote: "Alle familier får høre «Jeg lover å ta vare på den.» PetPrep gjør løftet om til",
      highlight: "bevis",
      text:
        "Å mislykkes i simuleringen er en suksess for familien: Dere finner det ut før et ekte dyr lider – og før dere binder dere til mange år med stell og utgifter.",
    },
    how: {
      eyebrow: "Slik fungerer det",
      title: "Tre steg fra «vær så snill» til «klar».",
      steps: [
        {
          title: "Du velger kjæledyret",
          text: "Opprett en familiekonto, legg til barnet ditt med bare et kallenavn og velg kjæledyret – rase, adoptert eller fra oppdretter, valp eller senior.",
        },
        {
          title: "Barnet ditt signerer løftet",
          text: "En sekssifret kode logger barnet inn – ingen e-post, ikke noe passord. Barnet signerer Ansvarskontrakten med en finger, og det helt unike kjæledyret blir født.",
        },
        {
          title: "12 uker med ekte stell",
          text: "Én ekte uke tilsvarer én måned av kjæledyrets liv. Til slutt: et Ansvarsdiplom med Care Score – et objektivt bevis eller et ærlig nei.",
        },
      ],
      link: "Slik fungerer det i detalj",
    },
    realism: {
      title: "Så nær et ekte kjæledyr som en app kan komme.",
      text: "Matetider, turer og vekst bygger på kilder som veterinærforeninger og kennelklubber – ikke på noe vi har funnet på for spillets skyld.",
      items: [
        { title: "Ekte turer, ekte skritt", text: "Den daglige turen teller skritt fra barnets telefon. Ingen tur i det hele tatt i dag? Det merker kjæledyret i morgen." },
        { title: "Det vokser opp", text: "En valp spiser fire ganger om dagen, så tre, så to – og får et nytt bilde etter hvert som den vokser." },
        { title: "Det oppfører seg som et ekte dyr", text: "Valper må ut. Hunder som kjeder seg, tygger på tøfler. Og uhellene kommer før middag." },
        { title: "Tar hensyn til skole og søvn", text: "Stille timer setter påminnelsene på pause. Et måltid som faller i skoletiden, er ditt ansvar, ikke barnets." },
        { title: "Ekte konsekvenser, på en skånsom måte", text: "Forsømmelse betyr et besøk hos dyrlegen eller på dyrehjemmet – aldri skummelt, alltid med en ny start." },
        { title: "Helt unikt", text: "Hvert kjæledyr får sin egen pels, sine egne tegninger og øyne – fotorealistisk og aldri det samme to ganger." },
      ],
    },
    parents: {
      eyebrow: "For foreldre",
      title: "Du ser hvordan det virkelig går, i sanntid.",
      text: "Et tydelig trafikklys for hvert barn, en Care Score som bygger på rutiner gjort i tide, og en tidslinje over hvem som gjorde hva. Søsken som deler et kjæledyr, får hver sin rettferdige score.",
      points: [
        { strong: "Stille timer og en pauseknapp", text: "du har kontrollen." },
        { strong: "Barn logger inn med en kode", text: "ingen e-post, ikke noe etternavn, ingen reklame." },
        { strong: "Begge foreldrene, alle barna", text: "én familie, én oversikt." },
      ],
      link: "Alt foreldre ser",
    },
    adults: {
      eyebrow: "For voksne",
      title: "Prøv rasen før du tar den med hjem.",
      text: "Har du allerede en bestemt rase i tankene? PetPrep er ikke bare for barn. I 12 uker steller du et AI-kjæledyr av den rasen, med rasens ekte daglige behov – og finner ut om den virkelig passer for deg, før du kjøper eller adopterer.",
      points: [
        {
          strong: "Rasens ekte behov",
          text: "måltider innenfor faste tidsvinduer, vann, rydding og et daglig skrittmål som bygger på dokumenterte aktivitetsbehov. En voksen border collie trenger 12 000 skritt om dagen, en blandingshund 6 000.",
        },
        {
          strong: "Trening og valpeuhell",
          text: "en kort treningsøkt hver dag, og en valp som bare kan holde seg i omtrent én time for hver måned den er gammel før den må ut – ellers blir det en dam på gulvet.",
        },
        {
          strong: "12 uker viser om det passer inn i livet ditt",
          text: "arbeidsdagene dine, fritiden din og været. Fordi det blir familiens hund, kan du legge til partneren din eller barna senere.",
        },
      ],
      how: "Slik kommer du i gang: Opprett en konto som forelder, legg til deg selv som passerprofil og logg inn med den sekssifrede koden – på samme telefon eller en annen.",
      note: "Tilgjengelig i dag: den gratis blandingshunden og huskatten, og 12-ukersutfordringen med en av dem eller med alle hunde- og katteraser i [dyreleksikonet](page:animals).",
      link: "Slik bruker du PetPrep på egen hånd",
    },
    after: {
      eyebrow: "Når det kommer hjem",
      title: "Når det ekte kjæledyret kommer, blir PetPrep værende.",
      text: "Trykk på «Vi har fått et ekte kjæledyr», så blir simulatoren en AI-assistent for årene som kommer – som allerede kjenner familiens rytme.",
      features: [
        { title: "Smart halsbånd", text: "Aktivitet og varsler når noe ikke stemmer." },
        { title: "AI som første kontakt", text: "Svarer raskt og sender deg videre til en ekte dyrlege." },
        { title: "Vekst og fôr", text: "Ukentlig veiing, vekstkurve og beskjed når det er på tide å bytte fôr." },
        { title: "Pålitelige partnere", text: "Dyrleger, trenere og forsikringsselskaper i nærheten – tydelig merket." },
        { title: "DNA-test", text: "Hvilke raser som finnes i blandingshunden din – og hva du bør følge med på." },
        { title: "Kort til dyrlegen", text: "Rasesammensetning og DNA-funn samlet på ett sted, klart for dyrlegen." },
      ],
      link: "Om AI-assistenten",
      planned: "Under utvikling",
    },
    species: {
      title: "Hunder og katter i dag. Flere arter kommer.",
      text: "Laget for familier over hele verden, på deres eget språk.",
      chips: [
        { label: "Hund · tilgjengelig", active: true, link: "species:dog" },
        { label: "Katt · tilgjengelig", active: true, link: "species:cat" },
        { label: "Hunde- og katteraser · i utfordringen", link: "page:animals" },
        { label: "Flere arter · planlagt", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Priser", title: "Enkle, rettferdige priser." },
    faq: { title: "Det foreldre lurer på", link: "Alle spørsmål" },
    final: { title: "Klar for et kjæledyr?", text: "Finn det ut på 12 uker. Start gratis, på iPhone eller Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Slik fungerer PetPrep – en 12-ukersutfordring som viser om dere er klare for et kjæledyr",
        description:
          "Slik fungerer 12-ukersutfordringen fra PetPrep: valg av kjæledyr, Ansvarskontrakten, daglig stell, ekte turer, stille timer og diplomet.",
      },
      eyebrow: "Slik fungerer det",
      title: "Tolv uker som viser hva et løfte er verdt.",
      lead:
        "Barnet ditt steller et fotorealistisk AI-kjæledyr som oppfører seg så likt et ekte dyr som det går an i en app. Én ekte uke tilsvarer én måned av kjæledyrets liv, så i løpet av 12 uker vokser kjæledyret opp – og du ser om stellet holder.",
      blocks: [
        {
          type: "steps",
          heading: "Fra første trykk til diplom",
          items: [
            { title: "Forelderen oppretter familien", text: "Du registrerer deg med e-postadressen din (innlogging med Apple og Google kommer). Legg til hvert barn med et kallenavn og eventuelt fødselsår. Det er alt vi spør om barnet ditt." },
            { title: "Du velger kjæledyret", text: "Velg rasen (blandingshunden er gratis), hvor kjæledyret kommer fra – adoptert fra et dyrehjem eller kjøpt fra en oppdretter – og alderen ved ankomst: valp, ung, voksen eller senior." },
            { title: "Barnet ditt logger inn med en kode", text: "Du får en sekssifret kode som gjelder i 15 minutter. Barnet skriver den inn på telefonen sin – verken e-post eller passord. Har barnet mistet telefonen? Logg barnet ut av alle enheter med ett trykk." },
            { title: "Ansvarskontrakten", text: "Barnet ditt signerer et løfte med en finger. Signaturen er kjæledyrets fødsel: Behovene begynner å telle fra det øyeblikket, så ingenting går tapt om barnet signerer senere." },
            { title: "Tolv uker med stell", text: "Mat innenfor de riktige tidsvinduene, friskt vann, rydding og en daglig tur med ekte skritt. Etter hvert som kjæledyret vokser, endrer behovene seg." },
            { title: "Diplomet", text: "Etter 12 uker fyller kjæledyret ett år. Barnet ditt får et Ansvarsdiplom med sin Care Score – eller dere lærer begge to, på en trygg måte, at tiden ikke er inne ennå." },
          ],
        },
        {
          type: "screens",
          heading: "Det barnet ditt ser",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Dette trenger en voksen blandingshund hver dag",
          intro: "Tallene kommer fra veterinærmedisinske kilder og kennelklubber; der kildene bare oppgir et intervall, setter PetPrep verdien selv og sier det åpent.",
          head: ["Behov", "Hvor ofte", "Hvis det blir glemt"],
          rows: [
            ["Mat", "Morgen (6–10) og kveld (17–21), én gang per tidsvindu", "Sulten etter ca. 12,5 timer"],
            ["Vann", "3 ganger om dagen, minst 3 timer imellom", "Tørst etter ca. 10 timer"],
            ["Tur", "6 000 ekte skritt (valper begynner på 2 000)", "Ingen tur i det hele tatt → syk neste morgen"],
            ["Rydding", "Når kjæledyret har hatt et uhell – aldri i stille timer", "Ingen mat eller vann før det er rent"],
          ],
          note: "Valper spiser 4, så 3, så 2 ganger om dagen og kan bare holde seg i omtrent én time per måned av alderen. En [border collie](breed:border_collie) trenger 12 000 skritt og blir fortere sulten.",
        },
        {
          type: "cards",
          heading: "Bygget rundt ekte familieliv",
          columns: 3,
          items: [
            { title: "Stille timer", text: "Angi skoletid og leggetid. Da blir kjæledyret rolig, det sendes ingen påminnelser, og det skjer aldri uhell." },
            { title: "Måltider i skoletiden", text: "Et tidsvindu for mat som faller helt innenfor stille timer, er forelderens oppgave – det teller aldri mot barnet ditt." },
            { title: "Pause når som helst", text: "Én knapp setter spillet på pause, for eksempel for en familiesamtale. Ingenting blir verre under pausen." },
            { title: "Skånsomme påminnelser", text: "Kjæledyret minner først barnet ditt forsiktig på det, så mer insisterende. Du får bare en alarm hvis et behov står på null i en time." },
            { title: "Ekte konsekvenser", text: "Forsømmelse betyr 12 timer hos dyrlegen. Et helt døgn med forsømmelse betyr at dyrehjemmet tar kjæledyret – og dere kan begynne på nytt." },
            { title: "Delte kjæledyr", text: "Søsken kan dele ett kjæledyr. Hver handling føres på kontoen til barnet som gjorde den, så scoren blir rettferdig." },
          ],
        },
        {
          type: "callout",
          title: "Å mislykkes er også et resultat.",
          text: "Hvis kjæledyret havner på det virtuelle dyrehjemmet, har dere lært noe verdifullt – før et ekte dyr måtte betale prisen. Dere kan begynne på nytt, også med en enklere rase.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "For foreldre – foreldreoversikten, Care Score og kontrollene i PetPrep",
        description:
          "Dette ser foreldre i PetPrep: et daglig trafikklys per barn, Care Score, rutiner, rapporter, varsler, stille timer, pause og innebygd personvern.",
      },
      eyebrow: "For foreldre",
      title: "Objektivt bevis, ikke enda et løfte.",
      lead:
        "Du slipper å gjette om turene virkelig ble gått. PetPrep måler stellet mot tydelige daglige rutiner og viser deg, barn for barn, hvordan det går.",
      blocks: [
        {
          type: "cards",
          heading: "Trafikklyset",
          intro: "Hvert barn og hvert kjæledyr får en farge for i dag, etter familiens lokale tid – alltid med en forklaring i ord.",
          columns: 3,
          items: [
            { title: "Grønt – alt i orden", text: "Rutinene går som de skal.", tag: "ok" },
            { title: "Gult – trenger oppmerksomhet", text: "Mer enn to rutiner er glemt i dag.", tag: "warn" },
            { title: "Rødt – haster", text: "Kjæledyret ble sykt i dag, et behov har stått på null i over en time, eller kjæledyret kom på dyrehjem.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = rutiner gjort i tide ÷ forventede rutiner × 100, minus 10 poeng for hver sykdom, mellom 0 og 100.",
            "En rutine er én konkret oppgave: hvert tidsvindu for mat, hver av de tre vannpåfyllingene, opprydding etter hvert uhell innen to timer (skole og søvn teller ikke) og at det daglige turmålet nås.",
            "Tid da du hadde satt spillet på pause, kjæledyret var hos dyrlegen, eller før kontrakten ble signert, teller aldri mot barnet ditt. Tidligere dager fryses, så en score kan ikke skrives om i ettertid.",
            "Søsken som deler et kjæledyr, deler hver rutine rettferdig. Bare barnets egne handlinger teller – hvis ett barn gjør alt, får det 100 og det andre 0.",
          ],
        },
        {
          type: "screens",
          heading: "Din oversikt",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Du har kontrollen",
          items: [
            "Stille timer for skole og søvn, etter din lokale tid – også når det skiftes mellom sommertid og vintertid.",
            "Sett spillet på pause for hvilket som helst kjæledyr med ett bekreftet trykk; barnets skjerm låses med en gang.",
            "Inviter den andre forelderen med en engangskode; dere ser begge alle barna og alle kjæledyrene.",
            "Logg et barn ut av alle enheter hvis en telefon blir borte; kodene kan bare brukes én gang og utløper etter 15 minutter.",
            "Eksporter alle familiens data som en fil, eller slett et barns profil eller hele kontoen din umiddelbart i appen.",
          ],
        },
        {
          type: "list",
          heading: "Innebygd personvern",
          items: [
            "Barn logger inn med en kode – ingen e-post, ikke noe passord, ikke noe etternavn.",
            "Vi lagrer et kallenavn og, hvis du legger det til, et fødselsår. Ikke noe annet om barnet ditt.",
            "Varsler inneholder aldri navnet på barnet, fordi de kan vises på låseskjermen; tittelen kan være kjæledyrets navn, hvis du har gitt det et.",
            "Skrittene kommer fra Apple Helse (iPhone) eller Health Connect (Android) hvis du tillater det (bare lesing), og fra telefonens bevegelsessensor der den finnes. PetPrep bruker ikke GPS og sporer ikke posisjon.",
            "Ingen reklame, ingen chat med fremmede, servere i EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Når det kommer hjem – AI-assistenten fra PetPrep for det ekte kjæledyret",
        description:
          "Når familien får et ekte kjæledyr, blir PetPrep en AI-assistent: aktivitet fra smarte halsbånd, varsler, AI som første kontakt med en ekte dyrlege, vekst og fôr.",
      },
      eyebrow: "Når det kommer hjem",
      title: "Simuleringen slutter. Stellet gjør det ikke.",
      lead:
        "Når familien tar med et ekte kjæledyr hjem, gjør ett trykk PetPrep om til en assistent for hele dyrets liv – i sanntid, uten helsestolper, og allerede kjent med familiens rutiner.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Dette skal assistenten gjøre",
          columns: 2,
          items: [
            { title: "Integrasjon med smarte halsbånd", text: "Koble til populære GPS- og aktivitetsmålere – eller et PetPrep-halsbånd – og se aktiviteten i sammenheng." },
            { title: "Varsler som forklarer", text: "«Max løp 2 km i dag, halvparten av det vanlige, og spiste et større måltid. En ekstra kveldstur vil hjelpe ham å falle til ro.» Én observasjon, én grunn, ett forslag." },
            { title: "AI først, ekte dyrlege etterpå", text: "Still et spørsmål eller last opp et bilde. Assistenten svarer på generelle spørsmål, anslår hvor mye det haster, og sender deg videre til en ekte dyrlege ved behov – symptomer som haster, går rett til en dyrlege." },
            { title: "DNA-test for hunden eller katten din", text: "Bestill en DNA-test i appen eller last opp resultatet av en du allerede har. PetPrep viser hvilke raser som inngår i blandingen, hva som er typisk for dem, og hvilke helseproblemer som er vanligere hos disse rasene – med kilder. Raseprosenter er ingen diagnose, og en DNA-test viser ikke allergier." },
            { title: "Et kort til dyrlegen", text: "Rasesammensetningen og eventuelle direkte DNA-funn på én side eller i en QR-kode, så dyrlegen med en gang vet hva som finnes i en blandingshund." },
            { title: "Vekst og ernæring", text: "Registrer vekten hver uke, se vekstkurven og få en påminnelse når det er tid for å bytte fôr." },
          ],
        },
        {
          type: "screens",
          heading: "En forsmak",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Prinsipper vi ikke går på akkord med",
          items: [
            "AI-assistenten er ikke en dyrlege og stiller aldri diagnoser. Hvert svar om helse inneholder en vei til en ekte dyrlege.",
            "Tilbud fra partnere (butikker, forsikringsselskaper, trenere, dyrleger) er alltid merket, og vi opplyser når vi får provisjon.",
            "Ingenting deles med en partner uten ditt samtykke.",
            "Barnets data fra utfordringen flyttes til assistenten bare hvis du samtykker.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Priser – PetPrep er gratis å starte med, 49,99 € for 12-ukersutfordringen",
        description:
          "Blandingshunden er gratis for alltid. 12-ukersutfordringen fra PetPrep koster 49,99 € per kjæledyr som et engangskjøp. Én pris for søsken som deler et kjæledyr. Også som oppgradering av det gratis kjæledyret ditt.",
      },
      eyebrow: "Priser",
      title: "Enkle, rettferdige priser.",
      lead: "Start gratis med en blandingshund. Kjøp hele 12-ukersutfordringen når dere er klare – de 12 ukene starter ved kjøpet. Det gjelder også det gratis kjæledyret barnet ditt allerede steller.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Ønsker – ting til kjæledyret",
          intro:
            "I appen ønsker barnet seg ting til kjæledyret sitt; du bestemmer og kjøper. Barnet ser aldri en pris. Tingene påvirker bare utseendet: De endrer aldri behov, Care Score eller diplomet. Også tilgjengelig for den gratis blandingshunden og huskatten.",
          head: ["Ting", "Pris"],
          rows: [
            ["Seng (katt: kurv)", "5,99 €"],
            ["Mat- og vannskåler", "5,99 €"],
            ["Leke (hund: taulek eller pipeleke, katt: plysjmus eller lekestang)", "5,99 € per leke"],
            ["Godbiter, pakke med 10", "2,99 €"],
            ["Velkomstpakke: seng + skåler + leke", "15,99 € (i stedet for 17,97 €)"],
          ],
          note: "Ønsker kommer med neste oppdatering av appen; de kan kjøpes så snart tingene er tilgjengelige i App Store og Google Play. Prisene gjelder for Slovenia; butikken viser prisen for ditt land.",
        },
        {
          type: "faq",
          heading: "Spørsmål om priser",
          items: [
            { q: "Er gratisversjonen virkelig gratis?", a: "Ja. Blandingshunden er gratis for alltid, med hele simuleringen, ekte turer og foreldreoversikten." },
            { q: "Hva inneholder utfordringen?", a: "Krevende raser som [border collie](breed:border_collie), kjæledyrets humør i AI-videoer, Ansvarsdiplomet til slutt og tilgang for begge foreldrene. Du kan også velge den med blandingshunden eller huskatten." },
            { q: "Kan vi oppgradere det gratis kjæledyret barnet mitt allerede har?", a: "Ja, så lenge den gratis blandingshunden eller huskatten fortsatt er med i spillet. Start utfordringen fra kortet til barnet ditt i foreldreappen. Kjæledyret forblir det samme: navn, utseende, alder og lærte kommandoer. De 12 ukene, Care Score og diplomet teller fra kjøpet; tidligere dager blir værende i historikken, merket som dager før utfordringen, og teller ikke. Prisen er den samme: 49,99 € som engangskjøp, uten abonnement. Blandingshunder som ble opprettet i en tidlig versjon av appen, kan ikke oppgraderes; appen sier fra om det gjelder din." },
            { q: "Kan et kjæledyr i utfordringen gå tilbake til gratisplanen?", a: "Ikke etter ønske. En blandingshund eller huskatt går bare tilbake til gratisplanen hvis butikken refunderer kjøpet; utfordringen avsluttes da uten diplom. Kjøper du utfordringen igjen senere, starter 12 nye uker." },
            { q: "Presser appen meg til å kjøpe?", a: "Nei. Har barnet ditt stelt et gratis kjæledyr minst 5 av de første 7 dagene, får du ett varsel og et kort i oversikten om utfordringen – én gang per kjæledyr og aldri i stille timer. Barnet ser verken priser eller denne påminnelsen." },
            { q: "Betaler søsken to ganger?", a: "Nei. Barn som deler ett kjæledyr, betaler én pris. Et ekstra kjæledyr i familien er en egen utfordring." },
            { q: "Hvordan betaler jeg?", a: "I appen, via App Store eller Google Play. Refusjoner håndteres via kontoen din i butikken." },
            { q: "Hva er Ønsker, og kan barnet mitt kjøpe ting alene?", a: "Barnet ditt kan ønske seg en seng, skåler, en leke eller godbiter til kjæledyret – opptil tre åpne ønsker om gangen. Du får et varsel og kjøper enten tingen eller velger «Ikke nå». Barnet ser aldri priser og kan ikke kjøpe noe i barneappen." },
            { q: "Gjør kjøpte ting spillet enklere?", a: "Nei. Tingene påvirker bare utseendet. De endrer aldri behov, Care Score eller diplomet, og det finnes ingen dyrlege eller medisin i Ønsker – aldri «betal for å redde kjæledyret ditt»." },
            { q: "Er det likt for voksne?", a: "Ja. Hvis du bruker PetPrep på egen hånd for å prøve en rase, gjelder det samme: Blandingshunden er gratis for alltid, og 12-ukersutfordringen koster 49,99 € per kjæledyr." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Ofte stilte spørsmål – det foreldre spør om PetPrep",
        description:
          "Svar om PetPrep: tid per dag, bruk som voksen, personvern og posisjon, skritt, søsken, hva om barnet ikke klarer det, språk, arter og ekte kjæledyr.",
      },
      eyebrow: "Ofte stilte spørsmål",
      title: "Det foreldre lurer på.",
      lead: "Korte, ærlige svar. Savner du noe? Skriv til oss.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Hvilken alder er PetPrep for?", a: "Appen er laget for barn på ca. 7 til 12 år, men fungerer godt helt opp til 16 år. Voksne bruker den også, for å teste om en bestemt rase virkelig passer for dem før de kjøper eller adopterer." },
            { q: "Kan jeg bruke PetPrep på egen hånd, uten barn?", a: "Ja. Opprett en konto som forelder og legg til deg selv som passerprofil – et kallenavn er nok, la fødselsåret stå tomt. Velg rasen, lag en sekssifret kode, og velg så «I'm a kid» («Jeg er et barn») på samme telefon eller en annen og skriv inn koden – slik blir du passeren. Fordi det blir familiens hund, kan du senere legge til partneren din eller barna, så dere steller den sammen. Prisen er den samme som for familier." },
            { q: "Hvor mye tid tar det hver dag?", a: "Noen minutter til mat, vann og rydding – pluss turen en ekte hund uansett ville trengt." },
            { q: "Sporer appen hvor barnet mitt er?", a: "Nei. Til turene teller den bare skritt. Hvis du tillater det, leser den dem fra Apple Helse (iPhone) eller Health Connect (Android) – bare lesing og bare skritt; der det er mulig, bruker den også telefonens bevegelsessensor. Den ber om tillatelse på turskjermen. GPS brukes ikke." },
            { q: "Trenger barnet mitt en e-postadresse?", a: "Nei. Du oppretter kontoen; barnet logger inn med en sekssifret kode som du lager. Vi lagrer bare et kallenavn og eventuelt et fødselsår." },
            { q: "Hva skjer hvis barnet mitt glemmer det?", a: "Kjæledyret sender først skånsomme påminnelser. Hvis et behov blir stående på null, blir kjæledyret sykt og tilbringer 12 timer hos dyrlegen. Etter et helt døgn uten stell tar det virtuelle dyrehjemmet det – og dere kan begynne på nytt." },
            { q: "Kan søsken dele et kjæledyr?", a: "Ja. Hvert barn signerer sin egen kontrakt, hver handling godskrives den som gjorde den, og hvert barn får sin egen rettferdige Care Score." },
            { q: "Hva med skole og leggetid?", a: "Angi stille timer. Da roer kjæledyret seg, ingenting sendes, og måltider som faller helt innenfor stille timer, tar du deg av." },
            { q: "Er det skummelt for barn?", a: "Nei. Konsekvensene er ekte, men skånsomme: Kjæledyret kommer til dyrlegen eller på dyrehjem, aldri noe grafisk, og det er alltid mulig å starte på nytt." },
            { q: "Hvilke dyr er tilgjengelige?", a: "[Hunder](species:dog) og [katter](species:cat) i dag: en gratis blandingshund og huskatt, og 12-ukersutfordringen med en av dem eller med alle rasene i [dyreleksikonet](page:animals), som også viser hva hver rase trenger, med kilder. Flere arter er planlagt." },
            { q: "Hvilke språk?", a: "Engelsk og slovensk i dag. Flere språk kommer etter hvert som PetPrep lanseres i nye land." },
            { q: "Hva skjer når vi får et ekte kjæledyr?", a: "PetPrep kan bli en AI-assistent for det ekte kjæledyret deres. Denne delen er under utvikling." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partnere – samarbeid med PetPrep",
        description:
          "PetPrep samarbeider med dyrebutikker, dyrehjem, dyrleger, trenere, forsikringsselskaper, produsenter av halsbånd og skoler for å hjelpe familier å skaffe kjæledyr på en ansvarlig måte.",
      },
      eyebrow: "Partnere",
      title: "Bedre forberedte familier for alle som bryr seg om dyr.",
      lead:
        "Familier som fullfører PetPrep, vet hva et kjæledyr egentlig krever. Vi bygger et partnernettverk som møter dem i riktig øyeblikk – tydelig merket og alltid med familiens samtykke.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Hvem vi samarbeider med",
          columns: 3,
          items: [
            { title: "Dyrebutikker", text: "Nå familier i det øyeblikket de viser at de er klare – for eksempel med et tilbud på en startpakke ved diplomet." },
            { title: "Dyrehjem, omplasseringsorganisasjoner og oppdrettere", text: "Anbefal PetPrep før adopsjon eller kjøp, så færre tar impulsive avgjørelser og færre dyr leveres tilbake." },
            { title: "Dyrleger", text: "Når det ekte kjæledyret kommer hjem, svarer AI-assistenten på de første spørsmålene og henviser eierne til deg, med et sammendrag av saken som bare deles med samtykke." },
            { title: "Trenere og hundeskoler", text: "Anbefalinger og bestilling når en familie går over til en ekte hund." },
            { title: "Dyreforsikringsselskaper", text: "Tilbud tilpasset rasen når et ekte kjæledyr registreres – tydelig merket." },
            { title: "Produsenter av halsbånd og IoT", text: "Integrasjon av aktivitetsdata for smartere varsler med forklaring." },
          ],
        },
        {
          type: "list",
          heading: "Hvorfor partnere stoler på oss",
          items: [
            "Barn logger inn uten e-post, og vi holder dataene deres på et minimum, på servere i EU.",
            "Bare kontrollert innhold når fram til barnets skjerm; det finnes ingen reklame.",
            "Hvert partnertilbud er merket, og hver provisjon opplyses til familien.",
          ],
        },
        { type: "callout", title: "La oss snakke sammen.", text: "Partnervilkårene er under utarbeidelse. Fortell oss hvem du er og hva du har i tankene.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Invester i PetPrep – fra forberedelse til livslangt stell av kjæledyr",
        description:
          "PetPrep gjør barnets løfte om til bevis før familien skaffer et kjæledyr, og blir deretter en AI-assistent gjennom hele dyrets liv. Før lansering; investornotat på forespørsel.",
      },
      eyebrow: "Investorer",
      title: "Fra en 12-ukersutfordring til et forhold på 10–15 år.",
      lead:
        "PetPrep gir foreldre et objektivt bevis på om barnet er klart for et ekte kjæledyr – og blir deretter værende hos familien gjennom hele dyrets liv.",
      blocks: [
        {
          type: "cards",
          heading: "Muligheten",
          columns: 3,
          items: [
            { title: "Problem", text: "Barn lover å ta vare på et kjæledyr; foreldre har ingen nøytral måte å teste det på før de binder seg til utgifter og mange år med stell." },
            { title: "Løsning", text: "En realistisk simulering over 12 uker med foreldreoversikt i sanntid og en objektiv Care Score, som avsluttes med et Ansvarsdiplom." },
            { title: "Utvidelse", text: "Når det ekte kjæledyret flytter inn: en AI-assistent med data fra halsbåndet, AI som første kontakt med dyrlege, vekst og ernæring, DNA-tester og partnertjenester." },
          ],
        },
        {
          type: "table",
          heading: "Forretningsmodell",
          head: ["Inntektskilde", "Modell", "Status"],
          rows: [
            ["Blandingshund", "Gratis for alltid (kundeanskaffelse)", "Besluttet"],
            ["12-ukersutfordringen fra PetPrep", "49,99 € per kjæledyr, engangskjøp", "Besluttet"],
            ["Ønsker – ting til kjæledyret (bare kosmetisk)", "Kjøp i appen: 5,99 € per ting, godbiter 2,99 € for 10, pakke 15,99 €; også i gratisversjonen", "Bygget, kjøp i butikken kommer snart"],
            ["Partnertilbud", "Provisjon fra butikker, forsikringsselskaper, dyrleger og trenere", "Planlagt"],
            ["AI-assistent for det ekte kjæledyret", "Abonnement", "Planlagt"],
            ["DNA-tester for hunder og katter", "Salg av tester og partnerprovisjon", "Planlagt"],
          ],
        },
        {
          type: "list",
          heading: "Bygget så langt",
          items: [
            "Spillmotor på serveren med synkronisering i sanntid, testet med simuleringer av hele døgn, overgangen til og fra sommertid og uvanlige familiesituasjoner.",
            "Familier med flere foreldre, flere barn og delte kjæledyr, med rettferdig score per barn.",
            "Unike fotorealistiske AI-kjæledyr med målte og begrensede AI-kostnader; mediene lagres på leide servere i Tyskland (Hetzner, EU).",
            "Kjæledyrenes behov bygger på siterte veterinærmedisinske kilder og kennelklubber, og hvert tall kan spores til kilden.",
            "Innebygd barnesikkerhet: innlogging med PIN uten e-post, minimalt med data, ingen reklame, bare kontrollerte medier.",
          ],
        },
        {
          type: "prose",
          heading: "Fase",
          paragraphs: [
            "PetPrep er i fasen før lansering, og en lukket beta er planlagt. Det første markedet er Slovenia og regionen, deretter DACH og Storbritannia; produktet er bygget for global lokalisering fra første dag.",
            "Grunnlegger: David Tacer, programvareutvikler og gründer. Mer [om oss](page:about).",
          ],
        },
        { type: "callout", title: "Be om investornotatet.", text: "Vi deler notat, presentasjon og datarom på forespørsel.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt PetPrep – familier, personvern, partnere, investorer",
        description: "Kontakt PetPrep: spørsmål fra familier, henvendelser om personvern, partnerskap og henvendelser fra investorer. Vi svarer på engelsk eller slovensk.",
      },
      eyebrow: "Kontakt",
      title: "Vi leser hver eneste melding.",
      lead: "Skriv til riktig innboks, så svarer vi så snart vi kan, på engelsk eller slovensk.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Opplysninger om selskapet" }],
    },
    privacy: {
      navLabel: "Personvern",
      meta: {
        title: "Personvernerklæring – PetPrep",
        description: "Hvordan PetPrep samler inn, bruker og beskytter personopplysninger om foreldre og barn, og hvordan du utøver rettighetene dine etter GDPR.",
      },
      eyebrow: "Juridisk",
      title: "Personvernerklæring",
      lead: "Oversettelse – kun den engelske versjonen er juridisk bindende. PetPrep er først og fremst laget for barn, så vi samler inn så lite som mulig og forklarer nøyaktig hva vi gjør med det.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Hvem som er ansvarlig",
              paragraphs: [
                "Behandlingsansvarlig for personopplysninger som behandles via PetPrep-appen og dette nettstedet, er {company}, {address}; {companyIds}. Kontakt for spørsmål om personvern: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Hva vi samler inn",
              items: [
                "Foreldrekonto: navn (det familien kaller deg), e-postadresse, passord (lagres bare som en sikker hash), enhetens tidssone og tidspunktet da du godtok vilkårene og denne erklæringen.",
                "Passerprofil (et barn eller en voksen som steller kjæledyret): et kallenavn på opptil 30 tegn og eventuelt et fødselsår – står tomt for en voksen. Ingen e-post, ikke noe passord, ikke noe etternavn og ingen fødselsdato.",
                "Enheter: telefonmodellen (for eksempel «iPhone», aldri et navn brukeren har gitt telefonen) og, for varsler, et push-token, plattform og appversjon.",
                "Stellaktivitet: handlinger i simuleringen (mat, vann, rydding, turer), daglig antall skritt (eller antall rulletak med rullestol i tilpasset modus – se punkt 3 og 4), score og rapporter.",
                "Ansvarskontrakten: barnets signatur med fingeren, lagret som en vektorlinje sammen med tidspunktet for signeringen.",
                "Koder: innloggings- og invitasjonskoder lagres bare som hasher og utløper.",
                "Feilrapporter fra appen: Hvis appen fryser eller krasjer, kan den sende en kort teknisk rapport til serveren vår i EU (feiltype og feiltekst, sted i koden, app- og OS-versjon, skjermnavn, rolle som forelder/barn). Den inneholder ikke navn, e-postadresse, bruker-ID eller IP-adresse, deles ikke med noen tredjepart og slettes etter 30 dager.",
                "Listen for tidlig tilgang (dette nettstedet): e-postadressen din, språket på siden og tidspunktet da du meldte deg på.",
                "Innløsning av gavekort (denne nettsiden): forelderen logger inn med Google, Apple eller med e-postadresse og passord. Ved e-postadresse og passord sjekker serveren vår dem mot den eksisterende foreldrekontoen og lagrer aldri passordet i klartekst; fra Google eller Apple får vi bare kontoens identifikator og lagrer ingen andre opplysninger fra dem. Et kortvarig innloggingstoken holdes i nettleserens minne i høyst 15 minutter. Under videresendingen til Google eller Apple og tilbakevendingen finnes to oppføringer (petprep.signin og petprep.webSession.handoff) bare i øktlagringen til denne nettleserfanen. De slettes så snart returneringssiden leser dem, ellers når fanen lukkes; overleveringen godtas bare innen 60 sekunder. Etter utlogging eller når fanen lukkes, er ingenting lagret i nettleseren. På serveren vår blir bare kortvarige tekniske poster igjen: en post om innloggingstokenet (konto-ID og tidspunkter, ikke navn eller e-postadresse) som slettes automatisk omtrent to døgn etter utløp, og tellere for begrensning (mislykkede forsøk per konto i hashet form i 15 minutter; forespørsler per nettverksadresse i høyst én time).",
              ],
            },
            {
              heading: "3. Helse- og treningsdata (skritt, Apple Helse og Health Connect)",
              paragraphs: [
                "PetPrep får tilgang til og samler inn én type helse- og treningsdata: hvor mange skritt passeren går hver dag (fysisk aktivitet). Vi bruker dem bare til én funksjon – kjæledyrets daglige tur i simuleringen: Barnet går, og skrittene teller som kjæledyrets tur.",
                "Slik får vi tilgang: Appen på barnets telefon teller skritt. Hvis du tillater det i systemets dialogboks for tillatelser, leser den dem fra Apple Helse (iPhone) eller Health Connect (Android) – bare lesing og bare skritt. Der det er mulig, bruker den også telefonens bevegelsessensor (Android: tillatelsen «Fysisk aktivitet»; iPhone: «Bevegelse og trening»); uten tillatelse til Apple Helse eller Health Connect er det bare bevegelsessensoren som teller.",
                "Hva vi samler inn: Appen sender bare dagens totale antall skritt til serveren vår, kilden (Apple Helse, Health Connect eller bevegelsessensoren) og tidspunktet da det ble sendt. Vi lagrer én daglig sum per passerprofil – aldri enkeltbevegelser, ruter, posisjon, puls, søvn, vekt eller andre helsedata. Vi skriver aldri noe til Apple Helse eller Health Connect.",
                "Slik bruker og deler vi dem: Antall skritt brukes bare til å gjennomføre turen i simuleringen og til å vise den for forelderen (foreldreoversikt og rapporter). Vi bruker dem ikke til reklame, profilering, helsevurderinger eller trening av AI-modeller, vi selger dem ikke, og vi deler dem ikke med tredjeparter; bare vår hostingleverandør (Hetzner, servere i EU) lagrer dem på våre vegne. Vår bruk av data mottatt fra Health Connect følger retningslinjene for tillatelser i Health Connect, inkludert kravene om begrenset bruk (Limited Use).",
                "Rettslig grunnlag og lagringstid: Lesing av skritt er valgfritt og skjer bare med tillatelsen du gir på enheten; vi behandler den daglige summen for å levere tjenesten du har valgt (oppfyllelse av en avtale). Antall skritt er med i familiens dataeksport og slettes sammen med passerprofilen eller kontoen din; det forsvinner fra de krypterte sikkerhetskopiene våre innen 35 dager.",
                "Du kan når som helst trekke tilbake tillatelsen i innstillingene på enheten: iPhone → Innstillinger → Helse → Datatilgang og enheter → PetPrep; Android → Health Connect → Apptillatelser → PetPrep. Tillatelsen til bevegelsessensoren kan trekkes tilbake i telefonens innstillinger for PetPrep-appen. Turen teller da ingen nye skritt.",
              ],
            },
            {
              heading: "4. Tilpasset modus (rulletak med rullestol)",
              paragraphs: [
                "Tilpasset modus er for barn som bruker rullestol: Turen teller da rulletak i stedet for skritt. Modusen kommer med neste oppdatering av appen; nedenfor beskriver vi hvilke data vi behandler hvis en forelder slår den på.",
                "Hvis en forelder slår på tilpasset modus for et barn, lagrer vi bare at den er slått på. Vi spør ikke om og lagrer ikke noen grunn, diagnose eller helsetilstand.",
                "Mens modusen er på, leser appen på barnets telefon bare rulletak i stedet for skritt – fra Apple Helse (registrert av en Apple Watch), med en egen tillatelse som bare gir lesetilgang. På Android leser ikke appen rulletak; i stedet registrerer en forelder turminuttene. Den bruker da ikke bevegelsessensoren. Bare dagens antall rulletak sendes til serveren vår; vi noterer for den dagen at det telles rulletak.",
                "En forelder kan registrere turminutter for et barn i tilpasset modus (bare for i dag). Vi lagrer datoen, antall minutter og hvilken forelder som registrerte turen.",
                "Fordi en påslått tilpasset modus kan tyde på en helsetilstand hos barnet, behandler vi det bare på grunnlag av ditt uttrykkelige samtykke (GDPR art. 9 nr. 2 bokstav a), som du gir som forelder eller verge på barnets vegne (GDPR art. 8) ved å slå på bryteren. Du kan når som helst slå av modusen; appen teller da skritt igjen.",
                "Disse dataene (bryteren, dager som telles i rulletak, og registrerte turer) er med i familiens dataeksport og slettes sammen med barnets profil eller kontoen din; de forsvinner fra de krypterte sikkerhetskopiene våre innen 35 dager, som alle andre data.",
              ],
            },
            {
              heading: "5. Hva vi ikke samler inn",
              items: [
                "Ingen posisjon: PetPrep bruker ikke GPS.",
                "Ingen andre helsedata fra Apple Helse eller Health Connect enn det daglige antallet skritt eller rulletak.",
                "Ingen reklame og ingen SDK-er for reklame eller sporing fra tredjeparter i appen.",
                "Ingen chat mellom brukere.",
                "Ingen informasjonskapsler for reklame på dette nettstedet. Informasjonskapsler for analyse settes bare hvis du tillater det (se Informasjonskapsler nedenfor).",
              ],
            },
            {
              heading: "6. Hvorfor vi behandler data (formål og rettslig grunnlag)",
              items: [
                "For å levere tjenesten du har bedt om: kontoer, simuleringen, foreldreoversikten, rapporter og varsler (oppfyllelse av en avtale).",
                "For å behandle kjøp via App Store eller Google Play (oppfyllelse av en avtale).",
                "For den daglige turen (daglig antall skritt – helse- og treningsdata, se punkt 3): oppfyllelse av en avtale; lesing fra Apple Helse, Health Connect eller bevegelsessensoren bare med tillatelsen du gir på enheten.",
                "For tilpasset modus (at den er slått på, rulletak og registrerte turer): forelderens uttrykkelige samtykke, gitt ved å slå på bryteren (GDPR art. 9 nr. 2 bokstav a og art. 8 – se punkt 4).",
                "For å holde tjenesten sikker, for eksempel ved å begrense gjentatte innloggingsforsøk (berettiget interesse).",
                "For å drifte og sikre tjenesten med feilrapporter fra appen som hjelper oss å rette opp frysing og krasj (berettiget interesse).",
                "For å oppfylle rettslige forpliktelser, for eksempel regnskap for kjøp (rettslig forpliktelse).",
                "For å sende deg e-post om lanseringen av PetPrep hvis du har meldt deg på listen for tidlig tilgang (samtykke – du kan melde deg av i hver e-post).",
                "For å forstå hvordan besøkende bruker dette nettstedet, med Google Analytics, bare hvis du tillater informasjonskapsler for analyse (samtykke – du kan når som helst endre det under Innstillinger for informasjonskapsler).",
              ],
            },
            {
              heading: "7. Barn",
              paragraphs: [
                "Bare en forelder eller verge kan opprette en konto og legge til et barn. Forelderen bestemmer hva barnet kan gjøre, og kan når som helst slette barnets profil. Vi ber aldri et barn om kontaktopplysninger, viser aldri reklame og tillater aldri kontakt med fremmede.",
                "Kontoinnehaveren kan også opprette en passerprofil for seg selv eller for en annen voksen i familien – for eksempel for å teste om en rase passer før kjøp eller adopsjon. De samme reglene og det samme minimum av data gjelder for en slik profil; alle beskyttelser som er laget for barn, gjelder også for den.",
              ],
            },
            {
              heading: "8. AI-genererte bilder og videoer",
              paragraphs: [
                "Bildet og de korte videoene av hvert kjæledyr lages av en AI-tjeneste bare ut fra en beskrivelse av kjæledyret (rase, pels, tegninger og lignende). Beskrivelsen inneholder aldri navn eller opplysninger om familien din. Ferdige medier lagres på leide servere i Tyskland (Hetzner, EU) og vises via kortvarige lenker.",
              ],
            },
            {
              heading: "9. Tjenesteleverandører",
              items: [
                "Hosting: Hetzner Online (servere i EU).",
                "Generering av AI-bilder og -videoer: fal.ai (mottar bare beskrivelsen av kjæledyret).",
                "Push-varsler: Apple Push Notification service og Firebase Cloud Messaging via Expo; tittelen på et varsel kan være kjæledyrets navn, hvis du har gitt det et, men varslene inneholder aldri navnet på barnet.",
                "Kjøp: Apple App Store og Google Play; administrasjon av kjøp via RevenueCat når kjøp blir tilgjengelige.",
                "E-post om tidlig tilgang: Klaviyo (mottar bare e-postadressen og språket du sender inn på dette nettstedet).",
                "Samtykke til informasjonskapsler på nettstedet: Kockica (lagrer samtykkevalget ditt).",
                "Analyse av nettstedet: Google Analytics 4 fra Google Ireland Ltd., bare med ditt samtykke; IP-adresser lagres ikke av Google Analytics 4.",
                "Taggstyring på nettstedet: Google Tag Manager fra Google Ireland Ltd.; setter ikke selv informasjonskapsler, og taggene den laster inn, følger samtykket ditt.",
                "Innebygde videoer: YouTube fra Google Ireland Ltd. (youtube-nocookie.com), lastes først når du trykker på spill av og tillater informasjonskapsler for markedsføring.",
              ],
            },
            {
              heading: "10. Hvor lenge vi lagrer data",
              paragraphs: [
                "Vi lagrer dataene dine så lenge kontoen din finnes. Når du sletter et barns profil eller kontoen din i appen, slettes dataene umiddelbart og kan ikke gjenopprettes; de forsvinner automatisk fra de krypterte sikkerhetskopiene våre innen 35 dager. Opplysninger vi er lovpålagt å oppbevare (for eksempel om kjøp), oppbevares så lenge loven krever. Feilrapporter fra appen slettes automatisk etter 30 dager.",
              ],
            },
            {
              heading: "11. Rettighetene dine",
              paragraphs: [
                "Du har rett til innsyn i, retting, eksport og sletting av dataene dine, til å protestere mot og begrense behandlingen og til å klage til en tilsynsmyndighet – i Slovenia informasjonskommissæren (Informacijski pooblaščenec). I appen kan du eksportere alle familiens data som en fil (Control → Account → Export my data) og slette et barns profil eller hele kontoen din. For alt annet kan du skrive til {privacyEmail}.",
              ],
            },
            {
              heading: "12. Sikkerhet",
              paragraphs: [
                "Passord og koder lagres som hasher, forbindelsene er kryptert, oppdateringer i sanntid leveres bare til medlemmer av familien din, og AI-medier kontrolleres før de når barnets skjerm.",
              ],
            },
            {
              heading: "13. Endringer",
              paragraphs: ["Vi gir deg beskjed i appen om viktige endringer før de trer i kraft. Datoen øverst viser den nyeste versjonen."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Informasjonskapsler",
          paragraphs: [
            "Nødvendige informasjonskapsler holder nettstedet i gang og husker samtykkevalget ditt. Alle andre informasjonskapsler settes bare hvis du tillater dem i banneret, etter kategori: funksjonelle (ekstra funksjoner), analyse (Google Analytics: hvilke sider som besøkes) og markedsføring (YouTube-videoer innebygd på noen sider; vi viser ikke annonser på dette nettstedet). Google Tag Manager setter ikke selv informasjonskapsler, og hver tagg den laster inn, følger valget ditt. Du kan når som helst endre eller trekke tilbake valget ditt.",
            "Tabellen nedenfor lages automatisk av samtykkebanneret ut fra det det finner på dette nettstedet, så den viser informasjonskapslene vi faktisk bruker.",
          ],
          settings: "Endre innstillinger for informasjonskapsler",
          fallback: "Listen over informasjonskapsler lastes sammen med samtykkebanneret. Hvis du ikke ser den, må du tillate skript på denne siden eller skrive til {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Brukervilkår",
      meta: {
        title: "Brukervilkår – PetPrep",
        description:
          "Vilkårene for bruk av PetPrep-appen og nettstedet: kontoer og barneprofiler, 12-ukersutfordringen og diplomet, kjøp og refusjon, AI-innhold, tilpasset modus, rimelig bruk, sletting og lovvalg.",
      },
      eyebrow: "Juridisk",
      title: "Brukervilkår",
      lead: "Oversettelse – kun den engelske versjonen er juridisk bindende. Reglene for bruk av PetPrep, skrevet for å bli lest.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Tjenesten",
              paragraphs: [
                "PetPrep leveres av {company}, {address}; {companyIds} – det samme selskapet som er behandlingsansvarlig etter personvernerklæringen. Disse vilkårene gjelder for PetPrep-appen og nettstedet petprep.si.",
                "PetPrep er en simulering av stell av kjæledyr. Den hjelper familier og enkeltpersoner med å finne ut om de er klare til å ta vare på et ekte kjæledyr – barn, og voksne som vil teste om en rase passer for dem før de kjøper eller adopterer. Det er et læringsverktøy, ikke veterinærmedisinske eller andre faglige råd.",
              ],
            },
            {
              heading: "2. Kontoer, profiler og barn",
              items: [
                "Kontoer opprettes av voksne: foreldre, verger eller voksne som bruker PetPrep selv. Når du registrerer deg, godtar du disse vilkårene og personvernerklæringen.",
                "Passere (barn eller voksne) steller kjæledyret via en passerprofil som kontoinnehaveren oppretter, og kontoinnehaveren kan også opprette en for seg selv. En profil trenger bare et kallenavn og eventuelt et fødselsår – vi trenger ikke noe mer om et barn, så ikke skriv det inn noe sted i appen.",
                "Et barn logger inn med en sekssifret kode (PIN) som du lager i appen din. Koden er kortvarig og virker bare én gang; gi den bare til barnet den er ment for.",
                "Som forelder eller verge er du ansvarlig for hvordan barnet ditt bruker PetPrep: om appen passer for barnet, hvor mye tid barnet bruker på den, og om barnet er trygt på turene (for eksempel i trafikken). Du kan når som helst stoppe spillet for hvilket som helst kjæledyr.",
                "Du kan invitere en annen forelder inn i familien med en invitasjonskode; begge ser alle familiens data, og begge kan stoppe spillet.",
                "Oppgi korrekte opplysninger, og hold passordet, kodene og enhetene dine sikre.",
              ],
            },
            {
              heading: "3. 12-ukersutfordringen, Care Score og diplomet",
              items: [
                "Utfordringen varer i 12 uker (84 programdager) og starter ved kjøpet; hver passer har sin egen sluttdato. Tid da spillet venter på betaling, teller ikke med i de 12 ukene. Oppgraderer du et gratis kjæledyr til utfordringen, starter de 12 ukene også ved kjøpet; kjæledyrets alder nullstilles ikke, og dagene før kjøpet forblir synlige i historikken, merket som dager før utfordringen, men teller verken med i de 12 ukene, i Care Score eller for diplomet.",
                "Care Score (0–100) viser hvor stor andel av de forventede rutinene (mat, vann, rydding, turen, en treningsøkt) passeren gjorde selv; hver sykdom hos kjæledyret trekker den ned. Tid da spillet er stoppet, da kjæledyret er hos dyrlegen, og stille timer teller aldri mot passeren.",
                "Etter 12 uker registreres en endelig score som ikke endres senere; stell etter utfordringen påvirker den ikke. Med en score på 70 eller mer kan du lage et Ansvarsdiplom (PDF) i appen; under 70 får du en rapport om utfordringen.",
                "Hvis mat, vann eller renslighet står på 0 % i 24 timer, blir kjæledyret «tatt med til dyrehjemmet» (game over). Spillet med det kjæledyret slutter, det blir ikke noe diplom, og du får en rapport om utfordringen.",
                "Care Score og diplomet viser bare hvordan passeren tok vare på et simulert kjæledyr i appen. De er ingen garanti for at et barn, eller noen andre, er klart for et ekte kjæledyr, ingen faglig vurdering og ingen erstatning for din egen vurdering eller råd fra en dyrlege, oppdretter eller et dyrehjem. Beslutningen om et ekte kjæledyr er alltid din.",
                "Spillereglene (måltider, turer og stell etter rase og alder) er forenklet og bygger på offentlige kilder. De er ikke veterinærmedisinske råd; spør en dyrlege om helse og stell av et ekte dyr.",
              ],
            },
            {
              heading: "4. Gratis og betalte funksjoner, kjøp og refusjon",
              items: [
                "Blandingshunden og huskatten er gratis for alltid og er måten å prøve PetPrep på; det finnes ingen gratis prøveperiode for utfordringen. Et gratis kjæledyr har ikke noe 12-ukersprogram og ikke noe diplom, forelderen ser historikken for de siste 7 dagene, og kjæledyret har et grunnleggende utvalg bilder og videoer.",
                "12-ukersutfordringen fra PetPrep er et engangskjøp, ikke et abonnement (49,99 € i Slovenia; butikken viser prisen for ditt land). I den nåværende versjonen av appen kan du velge den med alle raser, også blandingshunden og huskatten. Ett kjøp er én utfordring for ett kjæledyr; hver nye utfordring med et nytt kjæledyr er et nytt kjøp. Søsken som steller det samme kjæledyret, betaler én gang.",
                "En forelder kan oppgradere en gratis blandingshund eller huskatt som noen allerede steller, til utfordringen til samme pris og med det samme kjæledyret. Det er ikke mulig etter game over eller for blandingshunder som ble opprettet i en tidlig versjon av appen; appen viser når det gjelder. Et kjæledyr i utfordringen (også et oppgradert kjæledyr og en blandingshund eller huskatt valgt for utfordringen) kan ikke byttes tilbake til gratisplanen; bare en refusjon fører en blandingshund eller huskatt tilbake dit (se nedenfor).",
                "En forelder kjøper i sin egen app via App Store eller Google Play; det finnes ingen kjøp i barnets app. Butikken behandler betalingen etter sine egne vilkår.",
                "Du kan opprette et kjæledyr for utfordringen før du kjøper. Til utfordringen er betalt, står spillet på pause: Kjæledyret venter trygt, behovene synker ikke, og ingenting blir verre. Når du kjøper, fortsetter spillet der det stoppet.",
                "Refusjoner håndteres av App Store og Google Play etter deres egne regler; be om refusjon i butikken der du kjøpte. Hvis butikken refunderer et kjøp før utfordringen er fullført, settes spillet med det kjæledyret på pause igjen. Bilder og videoer som er laget etter kjøpet, blir værende. En blandingshund eller huskatt settes ikke på pause, men går tilbake til gratisplanen: utfordringen avsluttes uten diplom, reglene for gratisplanen gjelder igjen, og kjæledyret viser igjen grunnsettet med bilder og videoer. Kjøper du utfordringen igjen senere for det kjæledyret, starter 12 nye uker fra det nye kjøpet.",
                "Etter game over (dyrehjem) låser ikke et kjøp opp kjæledyret; en ny utfordring er et nytt kjæledyr og et nytt kjøp.",
                "Ønsker (ting til kjæledyret, når de er tilgjengelige): Et barn kan ønske seg noe, men bare en forelder kan kjøpe, i sin egen app. En kjøpt ting tilhører kjæledyret den ble kjøpt til, og er bare kosmetisk – den påvirker ikke spillet, scoren eller diplomet. Etter game over eller når kjæledyret slettes, regnes kjøpet som brukt og refunderes ikke. Hvis butikken refunderer kjøpet, fjernes tingen (for godbiter: de ubrukte godbitene).",
                "Hvis du sletter et kjæledyr, et barn eller kontoen mens en kjøpt utfordring fortsatt pågår, regnes kjøpet som brukt: Det flyttes ikke til et annet kjæledyr, og sletting er ingen refusjon. Appen advarer deg først og ber deg bekrefte.",
              ],
            },
            {
              heading: "5. AI-genererte bilder og videoer",
              items: [
                "Bilder og videoer av kjæledyr genereres av kunstig intelligens (AI) bare ut fra en beskrivelse av kjæledyret (rase, farge, pels og så videre), aldri ut fra data om familien din. De er illustrasjoner av et simulert kjæledyr og stemmer ikke nødvendigvis helt med noe ekte dyr eller noen rasestandard.",
                "Der vi viser dem offentlig, som raseportrettene på dette nettstedet, er de merket som AI-generert.",
                "Et utseende er ikke nødvendigvis unikt: Kjæledyr av samme betalte rase og pelsfarge kan dele de samme bildene og videoene, og gratis kjæledyr får ett av rasens delte utseender. En betalt utfordring inneholder et større utvalg videoer enn et gratis kjæledyr.",
                "Etter at kontrakten er signert eller et kjøp er gjort, kan det ta noen minutter å lage bildene og videoene; i mellomtiden viser appen at kjæledyret gjør seg klart, og markerer det som fortsatt lages.",
                "Rasefakta i appen og i dyreleksikonet på dette nettstedet er oppsummert fra de offentlige kildene vi siterer, og er ikke kontrollert av en dyrlege.",
              ],
            },
            {
              heading: "6. Skritt, helsedata og tilpasset modus",
              items: [
                "Den daglige turen teller passerens ekte skritt. Hvis du tillater det, leser appen dem fra Apple Helse eller Health Connect, bare lesing (den skriver aldri noe dit), eller fra telefonens bevegelsessensor. Hvilke data vi behandler, er beskrevet i personvernerklæringen (punkt 3).",
                "Tilpasset modus er for barn som bruker rullestol: Turen teller da rulletak i stedet for skritt. Du kan bruke den hvis funksjonen er tilgjengelig i din versjon av appen. En forelder slår den på for hvert enkelt barn; å slå den på er ditt samtykke, og å slå den av trekker samtykket tilbake (personvernerklæringen, punkt 4).",
                "I tilpasset modus kan en forelder registrere turminutter for barnet, bare for i dag. Du er ansvarlig for disse registreringene: Registrer bare turer som virkelig har funnet sted, fordi de teller med i Care Score og diplomet.",
                "PetPrep bruker ikke posisjon og varsler ikke om farer underveis på en tur; det er ditt ansvar at turene er trygge.",
              ],
            },
            {
              heading: "7. Varsler",
              paragraphs: [
                "Hvis du tillater det på enheten, sender appen push-varsler: påminnelser til passeren, varsler til foreldre når et kjæledyr mangler mat, vann eller renslighet, og beskjeder om sykdom, game over og slutten på utfordringen. Tittelen på et varsel kan være kjæledyrets navn, hvis du har gitt det et; varsler inneholder aldri navnet på barnet og sendes ikke i stille timer. Du kan når som helst trekke tilbake tillatelsen i innstillingene på enheten; uten varsler kan en passer gå glipp av rutiner, noe som påvirker spillet og scoren. Foreldre får dessuten høyst én gang per gratis kjæledyr en påminnelse om utfordringen når noen har stelt det minst 5 av de første 7 dagene.",
              ],
            },
            {
              heading: "8. Rimelig bruk",
              items: [
                "Ikke prøv å jukse med antall skritt eller rulletak, registrere turer som ikke har funnet sted, få tilgang til andre familiers data, utføre omvendt utvikling av tjenesten eller forstyrre den.",
                "Ikke gi kjæledyr støtende eller upassende navn, og ikke skriv inn personopplysninger om et barn som appen ikke ber om.",
                "Vi kan begrense eller suspendere kontoer som bryter disse reglene eller setter barn i fare, og vi kan fjerne et upassende navn på et kjæledyr.",
              ],
            },
            {
              heading: "9. Immaterielle rettigheter",
              paragraphs: [
                "PetPrep, logoen, designet, programvaren og innholdet tilhører {company}. Du kan bruke appen, og kjæledyrets bilder, videoer og diplom, til familiens personlige, ikke-kommersielle bruk – for eksempel ved å dele dem med slektninger.",
              ],
            },
            {
              heading: "10. Ansvar",
              paragraphs: [
                "Vi arbeider for at PetPrep skal være tilgjengelig og korrekt, men tjenesten leveres som den er; den er også avhengig av tjenester fra andre (appbutikkene, Apple Helse, Health Connect, push-varsler, AI-tjenesten) som vi ikke kontrollerer. I den grad loven tillater det, er vi ikke ansvarlige for indirekte tap eller for beslutninger om å kjøpe eller adoptere et ekte kjæledyr. Ingenting i disse vilkårene begrenser rettighetene du har som forbruker etter ufravikelig lov.",
              ],
            },
            {
              heading: "11. Sletting av kontoen og avslutning av bruken",
              paragraphs: [
                "Du kan når som helst slette et barns profil eller kontoen din i appen. Slettingen skjer umiddelbart og er endelig; når den siste forelderen i en familie sletter kontoen sin, slettes hele familien. Du kan eksportere dataene dine først (Control → Account → Export my data). Hva som skjer med dataene, er beskrevet i personvernerklæringen; hva som skjer med et kjøp, er beskrevet i punkt 4.",
              ],
            },
            {
              heading: "12. Endringer i disse vilkårene",
              paragraphs: [
                "Vi oppdaterer disse vilkårene når appen eller loven endres. Vi gir deg beskjed i appen om viktige endringer før de trer i kraft. Datoen øverst viser den nyeste versjonen. Hvis du ikke er enig i en endring, kan du når som helst slette kontoen din.",
              ],
            },
            {
              heading: "13. Lovvalg og tvister",
              paragraphs: [
                "Disse vilkårene er underlagt lovgivningen i Republikken Slovenia. Forbrukere kan også påberope seg den ufravikelige beskyttelsen i landet der de bor, og bruke EUs nettbaserte plattform for tvisteløsning.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Spørsmål om disse vilkårene: {termsEmail}. Tjenesteleverandør: {company}, {address}; {companyIds}. Spørsmål om personvern: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Barns sikkerhet",
      meta: {
        title: "Barns sikkerhet – slik beskytter PetPrep barn",
        description:
          "Slik beskytter PetPrep barn: kontoer som opprettes av foreldre, innlogging med kode uten e-post, minimalt med data, ingen reklame eller chat, ingen posisjonssporing og kontrollerte medier.",
      },
      eyebrow: "Tillit",
      title: "Bygget for barn fra første kodelinje.",
      lead: "Oversettelse – kun den engelske versjonen er juridisk bindende. Barnet er PetPreps viktigste bruker, så sikkerhet og personvern er produktregler, ikke innstillinger.",
      blocks: [
        {
          type: "cards",
          heading: "Våre standarder",
          columns: 2,
          items: [
            { title: "Foreldre oppretter alle kontoer", text: "Barn kan ikke registrere seg på egen hånd. En forelder legger til barnet og lager en innloggingskode til engangsbruk som gjelder i 15 minutter." },
            { title: "Ingen e-post eller passord for barn", text: "Et barn logger inn med koden fra forelderen. Feil, utløpte og brukte koder får alle det samme svaret, så ingen kan gjette hvilke barn som finnes." },
            { title: "Minimalt med data", text: "Et kallenavn og eventuelt et fødselsår. Ikke noe etternavn, ingen fødselsdato, ingen bilder av barnet." },
            { title: "Ingen reklame, ingen chat, ingen fremmede", text: "Det finnes ingen reklame og ingen mulighet til å kontakte andre brukere." },
            { title: "Ingen posisjonssporing", text: "Turer teller bare skritt – fra Apple Helse eller Health Connect (med din tillatelse, bare lesing) eller fra telefonens bevegelsessensor. GPS brukes ikke." },
            { title: "Private oppdateringer i sanntid", text: "Oppdateringer i sanntid når bare barna som steller det kjæledyret, og foreldrene i samme familie." },
            { title: "Kontrollerte medier", text: "Bare bilder og videoer som er laget for PetPrep og kontrollert av serveren vår, vises – fra vår lagring i EU." },
            { title: "Varsler uten barnets navn", text: "Varsler inneholder aldri navnet på barnet, fordi de kan vises på låseskjermen. Bare kjæledyrets navn kan vises som tittel, hvis du har gitt det et." },
          ],
        },
        {
          type: "list",
          heading: "Foreldrene har kontrollen",
          items: [
            "Stille timer for skole og søvn, uten varsler.",
            "En pauseknapp som låser barnets skjerm med en gang.",
            "Logg et barn ut av alle enheter på én gang.",
            "Eksporter eller slett alle data umiddelbart i appen.",
          ],
        },
        { type: "callout", title: "Meld fra om en bekymring", text: "Hvis noe i PetPrep bekymrer deg, skriv til oss, så svarer vi med høy prioritet.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Tilgjengelighet",
      meta: {
        title: "Tilgjengelighet – PetPrep for alle barn",
        description:
          "Slik tilpasser PetPrep seg barn som synes sveip er vanskelig, bruker VoiceOver eller TalkBack eller foretrekker mindre bevegelse – med de samme reglene og poengene for alle.",
      },
      eyebrow: "Tillit",
      title: "Alle barn kan ta vare på kjæledyret sitt.",
      lead: "Noen barn synes sveip er vanskelig, bruker skjermleser eller foretrekker mindre bevegelse på skjermen. PetPrep tilpasser seg dem – med de samme reglene, de samme poengene og det samme diplomet som alle andre.",
      blocks: [
        {
          type: "cards",
          heading: "I appen",
          columns: 3,
          items: [
            { title: "Enklere bevegelser", text: "I stedet for å sveipe holder barnet fingeren nede eller trykker på en knapp – i alle spill med sveip: børsting, lekestangen, skifte av kattesand og ballkasting. En forelder slår det på for hvert barn i foreldredelen." },
            { title: "Skjermlesere", text: "Når VoiceOver eller TalkBack er slått på, bytter spillene av seg selv til å holde inne. Toppfeltet med kjæledyret leser opp alt om kjæledyret, og hvert steg i stellespillene er en egen knapp." },
            { title: "Mindre bevegelse", text: "Når telefonen er innstilt på redusert bevegelse, står pulserende knapper og den vuggende Curio stille." },
          ],
        },
        {
          type: "cards",
          heading: "Kommer med neste oppdatering av appen",
          items: [
            { title: "Turer med rullestol", text: "I tilpasset modus teller rulletak med rullestolen akkurat som skritt – ett rulletak er ett skritt. En forelder kan også registrere dagens turminutter, så barnet ikke trenger å gjøre noe ekstra. En forelder slår det på for hvert barn, og når det slås av, fjernes markeringen fra historikken." },
          ],
        },
        { type: "callout", title: "Den samme utfordringen for alle", text: "Tilpasninger endrer hvordan et barn spiller, aldri hva som teller. Score, tidspunkter og Ansvarsdiplomet fungerer helt likt. Vi spør aldri hvorfor et barn trenger en tilpasning.", tone: "mint" },
        { type: "callout", title: "Er det noe som ikke fungerer for barnet ditt?", text: "Fortell oss hva som var i veien, så ser vi på det.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Slett konto",
      meta: {
        title: "Slett PetPrep-kontoen og dataene dine",
        description:
          "Slik sletter du PetPrep-kontoen din i appen eller via e-post, hvilke data som slettes, hva som oppbevares og hvor lenge.",
      },
      eyebrow: "Tillit",
      title: "Slett PetPrep-kontoen din",
      lead: "Oversettelse – kun den engelske versjonen er juridisk bindende. Du kan når som helst slette kontoen din og familiens data – i appen, umiddelbart, eller via e-post hvis du ikke lenger har appen.",
      blocks: [
        {
          type: "steps",
          heading: "Slett kontoen i appen (umiddelbart)",
          items: [
            { title: "Logg inn som forelder", text: "Åpne PetPrep, trykk på «I'm a parent» («Jeg er forelder») og logg inn." },
            { title: "Åpne kontoen din", text: "Gå til Controls → Account. Valgfritt: Trykk først på «Export my data» («Eksporter dataene mine») for å beholde en kopi." },
            { title: "Slett", text: "Trykk på «Delete account» («Slett konto»), bekreft med passordet ditt (eller innloggingen med Google/Apple) og skriv DELETE, og trykk deretter på «Delete for good» («Slett for godt»)." },
            { title: "Ferdig", text: "Slettingen skjer umiddelbart og kan ikke angres. Alle enhetene dine og barnas enheter logges ut." },
          ],
        },
        {
          type: "prose",
          heading: "Har du ikke appen lenger? Be om sletting via e-post",
          paragraphs: [
            "Skriv til [privacy@petprep.si](mailto:privacy@petprep.si) fra e-postadressen til foreldrekontoen din i PetPrep, med emnet «Slett kontoen min». Vi bekrefter at forespørselen kommer fra kontoinnehaveren, og sletter kontoen senest innen én måned (vanligvis innen noen dager), og deretter bekrefter vi det på e-post.",
            "Hvis du bare vil slette ett barns profil, logger du inn som forelder og åpner barnet under Controls → Children → Delete profile.",
          ],
        },
        {
          type: "table",
          heading: "Hva som slettes, og hva som oppbevares",
          head: ["Data", "Hva som skjer"],
          rows: [
            ["Foreldrekontoen din (navn, e-post, passord, kobling til innlogging med Google/Apple)", "Slettes umiddelbart"],
            ["Hvis du er familiens eneste forelder: barnas profiler (kallenavn, fødselsår), kjæledyr, AI-bilder og -videoer, kontrakter og signaturer, stellogg, Care Score, diplomer, antall skritt, stille timer, innloggingskoder", "Slettes umiddelbart"],
            ["Hvis det fortsatt er en annen forelder i familien", "Bare kontoen din slettes; familien blir værende hos den andre forelderen"],
            ["Enheter og varslingstokener", "Logges ut og slettes umiddelbart"],
            ["Kjøpsopplysninger (produkt, dato, butikkens transaksjons-ID, en anonym kjøps-ID – ikke navn eller e-post)", "Oppbevares så lenge regnskaps- og skattelovgivningen krever, uten kobling til familien din"],
            ["Opplysninger om AI-kostnader", "Oppbevares for regnskapet uten noen kobling til deg, barna dine eller kjæledyrene dine"],
            ["Krypterte sikkerhetskopier", "Fjernes automatisk innen 35 dager"],
          ],
          note: "Selve kjøpene håndteres av App Store og Google Play; opplysningene om dem oppbevares av Apple og Google etter deres egne retningslinjer. En utfordring som er kjøpt, men ikke fullført, refunderes ikke når du sletter kontoen.",
        },
        { type: "callout", title: "Spørsmål?", text: "Skriv til privacy@petprep.si. Detaljene står i personvernerklæringen vår.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Dyreleksikonet fra PetPrep – arter og raser, med kilder",
        description:
          "Hunder, katter og rasene deres: hva hver av dem trenger, hvem den passer for, og hvordan PetPrep simulerer den. Søk og sammenlign raser; hvert faktum lenker til kilden.",
      },
      navLabel: "Dyr",
      eyebrow: "Dyreleksikon",
      title: "Bli kjent med dyret før det kommer hjem.",
      lead:
        "Hva hver art og rase i PetPrep egentlig trenger – fra kennelklubber, katteregistre, veldedige veterinærorganisasjoner og studier, med lenke til hver kilde. I tillegg reglene PetPrep bruker for å simulere den.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Om PetPrep – selskapet, grunnleggeren og hvordan vi henter fakta om dyr",
        description:
          "Hvem som lager PetPrep: grunnlegger David Tacer, vårt oppdrag og hvordan dyreleksikonet henter og kontrollerer fakta.",
      },
      navLabel: "Om oss",
      eyebrow: "Om oss",
      title: "Hvem som lager PetPrep.",
      lead: "PetPrep lages i Maribor i Slovenia av et lite programvareselskap. Denne siden forteller hvem vi er, hvorfor vi lager PetPrep, og hvordan vi bestemmer hva appen og dyreleksikonet sier om dyr.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Selskapet",
          paragraphs: [
            "PetPrep tilbys av Data Vallis David Tacer s.p., et programvareselskap (enkeltpersonforetak) med forretningsadresse i Dravograd i Slovenia. Det samme foretaket driver dette nettstedet og PetPrep-appen og er behandlingsansvarlig for personopplysninger (se [personvernerklæringen](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Grunnleggeren",
          paragraphs: [
            "PetPrep ble grunnlagt av David Tacer, programvareutvikler og gründer fra Maribor i Slovenia.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Vårt oppdrag",
          paragraphs: [
            "Alle familier får høre «Jeg lover å ta vare på den.» PetPrep gjør det løftet om til bevis: I 12 uker steller et barn – eller en voksen som ønsker seg en bestemt rase – et naturtro AI-kjæledyr med et ekte dyrs daglige behov, og forelderen ser hver dag hvordan stellet holder.",
            "Å mislykkes i simuleringen er også et godt resultat: Familien finner det ut før et ekte dyr lider, og før de binder seg til mange år med stell og utgifter. Når et ekte kjæledyr faktisk kommer hjem, vil vi at PetPrep skal være nyttig gjennom hele dyrets liv.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Slik er dyreleksikonet bygget opp",
          intro: "[Dyreleksikonet](page:animals) og appen bruker de samme dataene. Disse reglene avgjør hva det kan si:",
          items: [
            "Hvert faktum oppgir kilden sin og lenker til den. Kildene graderes etter hvor mye vekt de fortjener: A – rasestandarder, fagfellevurderte artikler og retningslinjer fra veterinærforeninger; B – rådgivningssider fra dyresykehus, universiteter og nasjonale dyrevernorganisasjoner; C – sekundære sammendrag (leksikoner, presseartikler), som bare brukes sammen med en A- eller B-kilde.",
            "Bare kildebelagte fakta vises som fakta. En verdi som ingen kilde støtter, publiseres ikke. Der kildene er uenige, vises hver av dem med sin egen verdi.",
            "Spilleregler er ikke veterinærmedisinske råd. Der spillet trenger et tall som kildene ikke oppgir nøyaktig (for eksempel et daglig skrittmål), fastsetter PetPrep det ut fra kildene og viser det bare under «Slik simulerer PetPrep det», merket som spilleregel.",
            "Helseopplysninger er bare til informasjon. De oppsummerer hva kildene sier om en rase, og er ikke gjennomgått av en dyrlege. Spør en dyrlege når det gjelder et ekte dyr.",
            "Rasestandarder oppsummeres med våre egne ord, kopieres aldri i lange utdrag, og en rase kalles aldri «allergivennlig».",
            "Leksikonet genereres fra forskningsdataene til PetPrep, de samme dataene som appen bruker. Når en kilde eller en verdi endres, eksporteres leksikonet på nytt, og hver raseside viser datoen for siste oppdatering. Hvis du oppdager en feil, skriv til hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Spørsmål om PetPrep?", text: "Skriv til riktig innboks på kontaktsiden – familier, personvern, partnere eller investorer.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Møt Curio – maskoten til PetPrep",
        description:
          "Curio er maskoten til PetPrep: den nysgjerrige lille kuben fra logoen vår og stjernen i de korte videoene våre. Hvem den er, hvordan den skiller seg fra det naturtro kjæledyret i appen, bilder og et mediesett.",
      },
      navLabel: "Møt Curio",
      eyebrow: "Maskoten vår",
      title: "Møt Curio.",
      lead: "Curio er den nysgjerrige lille kuben fra PetPrep-logoen, vekket til live. Den har hovedrollen i de korte videoene våre som kjæledyret som venter ved døren på at noen skal holde et løfte. Den er maskoten vår – ikke kjæledyret du steller i appen.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskoten til PetPrep: en myk, grafittgrå kube med store hvite øyne, en liten bringebærrød nese og et mintgrønt halsbånd, som vinker.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Hvem er Curio?",
          paragraphs: [
            "Curio begynte som symbolet i logoen vår: en avrundet grafittgrå firkant med to store øyne som ser opp mot høyre, og en liten bringebærrød nese. På slovensk kaller vi den Radovednež – «den nysgjerrige». I oktober 2026 fikk den korte armer, små stumpe bein og et mintgrønt halsbånd med et rundt merke, og ble en figur.",
            "Curio har ingen munn. Alt den føler, synes i øynene: vidåpne når noen hvisker «tur?», to søvnige streker når ingen har kommet hjem ennå, glade buer når skålen er full.",
            "Curio er en «den» – ikke en gutt eller en jente, ikke en hund eller en katt. Den står for alle kjæledyr som hver dag venter på at noen skal holde et løfte.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio i korte trekk",
          columns: 3,
          items: [
            { title: "Navn", text: "Curio på engelsk, Radovednež på slovensk." },
            { title: "Laget av", text: "Myk grafitt, et mintgrønt halsbånd og et bringebærrødt merke – fargene til PetPrep." },
            { title: "Snakker", text: "Aldri. Bare med øynene." },
            { title: "Elsker", text: "Turer, en full skål og barn som kommer tilbake på dag 15." },
            { title: "Bor", text: "I de korte videoene våre på [TikTok](https://www.tiktok.com/@petprep.si) og [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Jobb", text: "Å minne familier på, med et glimt i øyet, at et kjæledyr trenger stell hver eneste dag." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio er ikke kjæledyret i appen",
          intro: "I videoene våre spiller Curio et kjæledyr som trenger stell, for det gjør alle kjæledyr. I PetPrep steller barn – og voksne som tester en rase – noe som ligger mye nærmere det ekte.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, den tegnede maskoten, vinker på lys bakgrunn.",
              label: "Maskot",
              title: "Curio – maskoten vår",
              text: "En tegnet figur til videoene våre, klistremerker og denne siden. Den viser hva PetPrep handler om. Du kan ikke adoptere den.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Et naturtro AI-generert portrett av en labrador retriever, slik kjæledyrene ser ut i PetPrep-appen.",
              label: "I appen · AI-bilde",
              tone: "mint",
              title: "Kjæledyret ditt i PetPrep",
              text: "En naturtro AI-simulering av en ekte rase – som denne [labrador retrieveren](+breed:labrador_retriever) – med et ekte dyrs daglige behov: måltider, vann, turer telt i ekte skritt, rydding og trening. Se [slik fungerer det](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio i bilder",
          intro: "Curio er en stilisert 3D-figur laget med AI-verktøy ut fra vårt eget design. Nye scener dukker først opp i videoene våre.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio vinker på mintgrønn bakgrunn.", caption: "Hei! Den klassiske vinken.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio står på en hvit hylle og vinker.", caption: "På hyllen, venter på noen." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio forfra, fra siden og bakfra, med fire uttrykk i øynene.", caption: "Fra alle sider, og hvordan øynene viser følelser." },
            { src: "/curio/curio-waving.webp", alt: "Curio på gjennomsiktig bakgrunn.", caption: "Frilagt – klar for innlegget ditt (se mediesettet).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediesett",
          intro: "For innholdsskapere, journalister og partnere som skriver om PetPrep. Spørsmål eller ideer til et samarbeid: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Last ned alt", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, gjennomsiktig bakgrunn", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, kvadratisk, lys", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, kvadratisk, mintgrønn", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Figurark", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "PetPrep-logo", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "PetPrep-symbol", meta: "SVG" },
          ],
          rulesHeading: "Slik bruker du Curio",
          rules: [
            "Bruk Curio i innlegg, artikler og videoer om PetPrep. Til reklame, produkter eller merchandise må du spørre oss først.",
            "Vis Curio slik den er: grafittgrå kube, hvite øyne, bringebærrød nese, mintgrønt halsbånd. Ikke legg til munn, ører, pels eller øyenbryn, ikke endre fargene og ikke strekk ut figuren.",
            "Curio er maskoten til PetPrep. Ikke fremstill den som kjæledyret i appen eller som en ekte hund eller katt.",
            "Ikke bruk Curio på en måte som antyder at PetPrep støtter et annet produkt, en annen sak eller en annen person.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Spørsmål om Curio",
          items: [
            { q: "Er Curio en hund eller en katt?", a: "Ingen av delene. Curio er en liten kube fra logoen vår. Den spiller et kjæledyr i videoene våre, men den tilhører ingen art." },
            { q: "Kan barnet mitt ta vare på Curio i appen?", a: "Nei. I appen steller familien et naturtro kjæledyr av en ekte rase, med de samme daglige behovene som det ekte dyret. Curio finnes bare i videoene våre og på nettstedet." },
            { q: "Hvorfor har ikke Curio munn?", a: "Fordi logoen vår ikke har noen. Curio sier alt med øynene – og den tigger aldri høylytt om godbiter." },
            { q: "Hvor kan jeg se nye videoer med Curio?", a: "På TikTok og Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Kunnskap om stell av kjæledyr – hva hunder og katter kan spise, med kilder | PetPrep",
        description:
          "Hvilke matvarer som er giftige, risikable eller i orden for hunder og katter – årsaken, symptomene og hva du skal gjøre, med lenke til hver kilde. Laget av PetPrep for familier som forbereder seg på et kjæledyr.",
      },
      navLabel: "Stell",
      eyebrow: "Kunnskap om stell",
      title: "Hva er trygt for kjæledyret ditt?",
      lead:
        "Tydelige, kildebelagte svar for familier: hvilke matvarer som er giftige, hvilke som er risikable, og hvilke som er i orden som godbit – for hunder og katter, og flere arter kommer. Hvert svar lenker til kildene.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Gratis fargeleggingsark med hunder og katter til utskrift for barn | PetPrep",
        description:
          "Gratis fargeleggingsark til utskrift: golden retriever, labrador, border collie, blandingsvalp, kattunge og Curio. PDF i A4 og US Letter, hver med et ekte faktum om stell av kjæledyr og kilden.",
      },
      navLabel: "Fargeleggingsark",
      eyebrow: "Fargeleggingsark",
      title: "Gratis fargeleggingsark til utskrift.",
      lead:
        "Hunder, katter og Curio til å fargelegge eller tegne av – skriv ut ett ark eller hele boken. Hvert ark har et ekte faktum om stell av kjæledyr fra en dyrlege eller en kennelklubb, som dere kan lese sammen.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "For barn som ønsker seg et kjæledyr – fargeleggingsark, Curio og #walkyourpet | PetPrep",
        description:
          "Alt PetPrep har for barn: gratis fargeleggingsark til utskrift med ekte fakta om stell av kjæledyr, maskoten Curio og #walkyourpet – for barn og foreldre som forbereder seg på et kjæledyr sammen.",
      },
      navLabel: "For barn",
      eyebrow: "For barn",
      title: "For barn som ønsker seg et kjæledyr.",
      lead: "Fargeleggingsark til utskrift, Curio og #walkyourpet – for barn og foreldre som forbereder seg på et kjæledyr sammen.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskoten til PetPrep: en myk, grafittgrå kube med store hvite øyne, en liten bringebærrød nese og et mintgrønt halsbånd, som vinker.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – bevegelsen som startet med et ekte barn",
        description:
          "«We could go walk your pet.» Et barn sa det, og nå er det en bevegelse: familier som går ut fordi et kjæledyr trenger en tur. Hvordan det startet, hva det betyr i PetPrep, og hvordan du blir med.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet – ta kjæledyret med på tur.",
      lead: "Vi fant ikke på dette uttrykket. Det gjorde et barn. Nå er det en invitasjon til alle familier: Gå ut, fordi et kjæledyr trenger turen sin – et ekte kjæledyr eller det du øver med i PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Story-kort: «Overheard at the founder's house.» Et barn sier «Lahko bi šli walk your pet» – «Vi kunne gått walk your pet» – og overskriften lyder «#walkyourpet is a thing now.»", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Slik startet det",
          paragraphs: [
            "I oktober 2026 hadde barna til grunnleggeren vår besøk av en venninne. De holdt på å bestemme seg for om de skulle gå ut, og hun sa, halvt på slovensk og halvt på engelsk: «Lahko bi šli walk your pet» – «Vi kunne gått walk your pet.»",
            "Ingen hadde bedt henne om det. Hun kjente PetPrep, der en hunds tur bare teller hvis du virkelig går ut, og «walk your pet» hadde rett og slett blitt en grunn til å gå ut. Vi likte det så godt at vi beholdt det – på engelsk, på alle språk.",
            "Ekte samtale. Ekte barn.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Hva det betyr i PetPrep",
          intro: "I PetPrep er hundens daglige tur barnets ekte skritt, lest fra Apple Helse eller Health Connect hvis du tillater det. Å bli liggende på sofaen teller ikke, så «walk your pet» betyr alltid å gå ut. Ingen GPS og ingen posisjon – bare skritt.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Bli med i bevegelsen",
          intro: "Du trenger ikke appen for dette. Alle familier som går ut for et kjæledyrs skyld – et ekte eller et øvingsdyr – er en del av det.",
          items: [
            { title: "Gå ut", text: "Ta hunden med på tur. Eller, hvis du fortsatt vurderer et kjæledyr, gå den turen du ville gått med et." },
            { title: "Fang øyeblikket", text: "Sko ved døren, et bånd, stien, poter i gresset. Ikke ansikter, ikke navn." },
            { title: "Del det", text: "Legg det ut med #walkyourpet og tagg @petprep.si på Instagram eller TikTok. Med din tillatelse kan vi dele de beste øyeblikkene her og på profilene våre." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Del trygt",
          intro: "#walkyourpet handler om barn, så disse reglene gjelder for alt vi deler:",
          items: [
            "Foreldre legger ut, ikke barn. Bare en forelder bestemmer hva som havner på nettet.",
            "Ingen ansikter, navn, skoler eller adresser til barn – og aldri en annen families barn.",
            "Vi deler bare videre med tillatelse fra en forelder, og vi fjerner et innlegg når du ber om det.",
            "Sitater fra barn er alltid ekte. Vi finner aldri på eller «forbedrer» det et barn har sagt.",
            "Det er en invitasjon, ikke en plikt. Ingen rekke av dager å holde ved like, ikke noe press – bare en god grunn til å gå ut.",
          ],
        },
        {
          type: "callout",
          title: "Det første øyeblikket er vårt. Det neste kan bli ditt.",
          text: "Del familiens tur med #walkyourpet og tagg @petprep.si. Spørsmål eller en historie du vil fortelle: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Spørsmål",
          items: [
            { q: "Trenger jeg PetPrep for å bli med?", a: "Nei. Alle som går ut for et kjæledyrs skyld, kan bruke #walkyourpet. PetPrep er der uttrykket ble født, og der en øvingshunds tur bare teller i ekte skritt." },
            { q: "Fungerer det for katter i PetPrep?", a: "Ikke som tur. Katter går ikke på tur, så i PetPrep dekkes kattens behov med lek, ikke skritt. Turer er for hunder." },
            { q: "Hvorfor er uttrykket på engelsk?", a: "Fordi det var slik barnet sa det – på engelsk midt i en slovensk setning. Barn over hele verden blander inn engelsk, så det er det samme på alle språk." },
            { q: "Kommer dere til å legge ut barnet mitt?", a: "Bare det du deler selv og gir oss lov til å dele videre, og aldri et barns ansikt eller navn. Spør oss på hello@petprep.si, så fjerner vi det." },
          ],
        },
      ],
    },
  },
};

export default nb;
