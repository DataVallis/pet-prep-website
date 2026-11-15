import type { Dictionary } from "./types";

const da: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Klar til et kæledyr. Til stede hele dets liv.",
    siteDescription:
      "PetPrep er en kæledyrssimulator over 12 uger der viser forældre om barnet virkelig er klar til et rigtigt kæledyr – og som derefter bliver en AI-assistent gennem hele det rigtige dyrs liv.",
    slogan: "Klar til et kæledyr. Til stede hele dets liv.",
    keywords: [
      "er mit barn klar til en hund",
      "app der lærer børn ansvar for kæledyr",
      "virtuel kæledyrssimulator",
      "AI-kæledyrssimulator",
      "før man får hund",
      "børn og kæledyr",
      "er vi klar til et kæledyr",
      "forældreoversigt",
      "prøv en hunderace før køb",
      "passer racen til mig",
    ],
  },
  nav: { home: "Forside", menu: "Menu", close: "Luk menu", skip: "Gå til indhold" },
  lang: { label: "Sprog", switchTo: "Skift sprog" },
  cta: {
    primary: "Start gratis med en blandingshund",
    secondary: "Se hvordan det virker",
    earlyAccess: "Få tidlig adgang",
    earlyAccessSubject: "PetPrep – tidlig adgang",
    ios: "Hent til iPhone",
    android: "Hent til Android",
    comingSoon: "Kommer snart til iPhone og Android",
    readMore: "Læs mere",
    contactUs: "Kontakt os",
  },
  common: {
    planned: "Planlagt",
    plannedNote:
      "Denne side beskriver det vi bygger som det næste. Det findes endnu ikke i appen, og detaljerne kan ændre sig.",
    legalDraft:
      "Teksten bliver gjort færdig sammen med vores juridiske rådgivere før den offentlige lancering. Kontakt os hvis noget er uklart.",
    lastUpdated: "Senest opdateret",
    breadcrumbHome: "Forside",
    screensNote: "Skærmbillederne på denne side er forhåndsvisninger – den færdige app kan se lidt anderledes ud.",
    perPet: "pr. kæledyr",
    free: "Gratis",
    forever: "for altid",
    notFoundTitle: "Siden her er stukket af fra snoren.",
    notFoundText: "Siden du leder efter, findes ikke eller er flyttet.",
    notFoundCta: "Tilbage til forsiden",
  },
  footer: {
    tagline: "Klar til et kæledyr. Til stede hele dets liv.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Virksomhed", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Tryghed", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Alle rettigheder forbeholdes.",
    dataEu: "Data opbevares i EU.",
    languages: "Flere sprog kommer snart.",
    company: "Drives af:",
    cookieSettings: "Cookieindstillinger",
    a11yBadge: { title: "Tilgængelig leg", text: "Lettere bevægelser · Skærmlæsere · Mindre animation" },
  },
  screens: {
    pin: "Barnet logger ind med en sekscifret kode fra forælderen – ingen e-mail, ingen adgangskode.",
    contract: "Ansvarskontrakten, underskrevet med fingeren. Underskriften vækker dyret til live.",
    hud: "Barnets startskærm: dyrets tilstand lige nu, fire behov og plejeknapperne.",
    picker: "Forældrene vælger dyret: race, oprindelse (adopteret eller fra en opdrætter) og alder ved ankomst.",
    parent: "Forældreoversigten: et trafiklys, Care Score og dagens rutiner for hvert barn.",
    report: "Et barns rapport for 7, 30 eller 84 dage: rutiner, gåture og glemte opgaver dag for dag.",
    assistant: "Når det kommer hjem: AI-assistenten gør data fra halsbåndet til ét klart forslag.",
    certificate: "Efter 12 uger: Ansvarsdiplomet med barnets Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Blandingshund",
      text: "Hele simulationen med en naturtro blandingshund.",
      features: [
        "Daglig pasning med rigtige konsekvenser",
        "Rigtige gåture talt i rigtige skridt fra telefonen",
        "Forældreoversigt, trafiklys og Care Score",
        "Stille timer og en pauseknap",
        "Fotorealistisk billede af dit kæledyr og korte videoer",
        "Tilføj 12-ugers-udfordringen senere, med det samme kæledyr",
      ],
      cta: "Start gratis",
    },
    challenge: {
      name: "12-ugers-udfordringen",
      badge: "12 uger + diplom",
      unit: "pr. kæledyr · 12 uger",
      text: "Til familier der vil have hele oplevelsen og et diplom til sidst.",
      features: [
        "Alt i Blandingshund",
        "Alle racer, som [border collie](breed:border_collie), eller blandingshunden og huskatten",
        "Dit kæledyrs humør som AI-videoer",
        "Ansvarsdiplom",
        "Én pris når søskende deler et kæledyr",
        "Adgang for begge forældre",
      ],
      cta: "Vælg udfordringen",
    },
    note:
      "Køb foregår i appen via App Store eller Google Play. Et kæledyr nummer to i samme familie er en særskilt udfordring. Priserne er inklusive moms hvor det gælder.",
  },
  earlyAccess: {
    title: "Få tidlig adgang",
    text: "Vær blandt de første familier der prøver PetPrep. Vi sender dig en e-mail når PetPrep er klar – og ikke andet.",
    label: "Din e-mailadresse",
    placeholder: "dig@eksempel.dk",
    button: "Få tidlig adgang",
    sending: "Sender …",
    successTitle: "Du er på listen.",
    successText: "Tak! Du er blandt de første der får besked når PetPrep er klar.",
    invalid: "Indtast en gyldig e-mailadresse.",
    error: "Noget gik galt. Prøv igen om lidt.",
    consent: "Når du tilmelder dig, accepterer du at modtage e-mails om PetPrep. Du kan til enhver tid afmelde dig.",
    privacyLink: "Privatlivspolitik",
  },
  contactCards: [
    { title: "Familier", text: "Spørgsmål om appen, din konto eller udfordringen.", email: "hello" },
    { title: "Privatliv", text: "Indsigt i data, eksport, sletning eller andre spørgsmål om privatliv.", email: "privacy" },
    { title: "Partnere", text: "Dyrehandler, internater, dyrlæger, trænere, forsikringsselskaber og skoler.", email: "partners" },
    { title: "Investorer", text: "Investorbrief, pitch deck og datarum efter aftale.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Er dit barn klar til et kæledyr? Find ud af det på 12 uger.",
      description:
        "Før et rigtigt kæledyr flytter ind, passer dit barn et naturtro AI-kæledyr i 12 uger: måltider, oprydning og rigtige gåture. Du ser hver dag om barnet virkelig er klar.",
    },
    hero: {
      eyebrow: "12-ugers-udfordringen",
      title: "Klar til et kæledyr. Til stede hele dets liv.",
      lead:
        "Før et rigtigt kæledyr flytter ind, passer dit barn et naturtro AI-kæledyr i 12 uger – giver mad, rydder op og går rigtige ture. Du ser hver dag om barnet virkelig er klar.",
      trust: ["Blandingshund gratis for altid", "Ingen reklamer, ingen chat med fremmede", "Børn skal ikke bruge e-mail"],
    },
    phone: {
      petName: "Luna",
      petAge: "Hvalp · 3 måneder",
      live: "LIVE",
      video: "Fotorealistisk AI-video af kæledyret",
      actions: ["Mad", "Vand", "Gåtur", "Ryd op"],
    },
    parentCard: { child: "Maja", status: "Alt i orden", scoreLabel: "Care Score", progress: "Uge 3 af 12 · 31 af 36 rutiner til tiden" },
    notification: { app: "PetPrep", text: "Dit kæledyr kigger på sin madskål. Morgenmadstiden slutter kl. 9.00." },
    promoVideo: {
      eyebrow: "PetPrep på ét minut",
      title: "Se hvordan det virker.",
      text: "Fra valget af kæledyr og underskriften på kontrakten til skole, gåture, pelspleje og diplomet – alt hvad dit barn gør på 12 uger, og alt hvad du ser i oversigten. Curio, vores maskot, siger bare hej; kæledyret i appen er en naturtro AI-hund.",
      alt: "PetPreps promovideo: skærmbilleder fra appen, et barn der passer en hund, og en forælder der følger med i Care Score.",
      note: "Appen er endnu ikke offentligt tilgængelig i App Store og Google Play – tilmeld dig tidlig adgang.",
    },
    promise: {
      quote: "Alle familier har hørt »Jeg lover at passe den«. PetPrep gør løftet til",
      highlight: "bevis",
      text:
        "Hvis det går galt i simulationen, er det en gevinst for jeres familie: I finder ud af det før et rigtigt dyr kommer til at lide – og før I binder jer til mange års pasning og udgifter.",
    },
    how: {
      eyebrow: "Sådan virker det",
      title: "Tre trin fra »Må vi ikke nok?« til »Vi er klar«.",
      steps: [
        {
          title: "Du vælger kæledyret",
          text: "Opret en familiekonto, tilføj dit barn med kun et kaldenavn, og vælg kæledyret – race, adopteret eller fra en opdrætter, hvalp eller senior.",
        },
        {
          title: "Dit barn skriver under på løftet",
          text: "En sekscifret kode logger dit barn ind – ingen e-mail, ingen adgangskode. Barnet underskriver Ansvarskontrakten med fingeren, og dets helt eget kæledyr bliver født.",
        },
        {
          title: "12 ugers rigtig pasning",
          text: "Én rigtig uge svarer til én måned af dyrets liv. Til sidst venter Ansvarsdiplomet med Care Score – et objektivt bevis eller et ærligt nej.",
        },
      ],
      link: "Sådan virker det i detaljer",
    },
    realism: {
      title: "Så tæt på et rigtigt kæledyr som en app kan komme.",
      text: "Fodringstider, gåture og vækst bygger på kilder som dyrlægeforeninger og kennelklubber – ikke på noget der er fundet på til et spil.",
      items: [
        { title: "Rigtige gåture, rigtige skridt", text: "Den daglige gåtur tæller skridt fra dit barns telefon. Ingen gåtur i dag? Det mærker dyret i morgen." },
        { title: "Det vokser op", text: "En hvalp spiser fire gange om dagen, siden tre og så to – og får et nyt billede efterhånden som den vokser." },
        { title: "Det opfører sig som et rigtigt dyr", text: "Hvalpe skal ud. Hunde der keder sig, tygger i hjemmesko. Uheld sker før aftensmaden." },
        { title: "Respekterer skole og søvn", text: "I de stille timer holder påmindelserne pause. Et måltid der falder i skoletiden, er dit ansvar, ikke dit barns." },
        { title: "Rigtige konsekvenser – men på en blid måde", text: "Forsømmelse betyder et besøg hos dyrlægen eller på internatet – aldrig uhyggeligt og altid med en ny start." },
        { title: "Helt unikt", text: "Hvert kæledyr får sin egen pels, sine egne aftegninger og øjne – fotorealistisk og aldrig ens to gange." },
      ],
    },
    parents: {
      eyebrow: "For forældre",
      title: "Du ser sandheden – live.",
      text: "Et tydeligt trafiklys for hvert barn, en Care Score ud fra rutiner udført til tiden og en tidslinje over hvem der gjorde hvad. Søskende der deler et kæledyr, får hver deres retfærdige score.",
      points: [
        { strong: "Stille timer og en pauseknap", text: "du bevarer kontrollen." },
        { strong: "Børn logger ind med en kode", text: "ingen e-mail, intet efternavn, ingen reklamer." },
        { strong: "Begge forældre, alle børn", text: "én familie, ét overblik." },
      ],
      link: "Alt hvad forældre ser",
    },
    adults: {
      eyebrow: "For voksne",
      title: "Prøv racen før du tager den med hjem.",
      text: "Har du kig på en bestemt race? PetPrep er ikke kun for børn. I 12 uger passer du et AI-kæledyr af den race med dens rigtige daglige behov – og finder ud af om den virkelig er noget for dig før du køber eller adopterer.",
      points: [
        {
          strong: "Racens rigtige behov",
          text: "måltider inden for faste tidsrum, vand, oprydning og et dagligt skridtmål ud fra kildebelagte motionsbehov: En voksen border collie skal have 12.000 skridt om dagen, en blandingshund 6.000.",
        },
        {
          strong: "Træning og hvalpeuheld",
          text: "en kort træning hver dag og en hvalp der kun kan holde sig cirka én time for hver måned den er gammel, før den skal ud – ellers er der en pyt på gulvet.",
        },
        {
          strong: "12 uger viser om den passer ind i dit liv",
          text: "dine arbejdsdage, din fritid og vejret. Når det bliver familiens hund, kan du senere tilføje din partner eller dine børn.",
        },
      ],
      how: "Sådan kommer du i gang: Opret en konto som forælder, tilføj dig selv som den profil der passer dyret, og log ind med den sekscifrede kode – på samme telefon eller en anden.",
      note: "Tilgængeligt i dag: den gratis blandingshund og huskat – og 12-ugers-udfordringen med en af dem eller med alle hunde- og katteracer i [dyreleksikonet](page:animals).",
      link: "Sådan bruger du PetPrep på egen hånd",
    },
    after: {
      eyebrow: "Når det kommer hjem",
      title: "Når det rigtige kæledyr flytter ind, bliver PetPrep hos jer.",
      text: "Tryk på »Vi har fået et rigtigt kæledyr«, og simulatoren bliver en AI-assistent i årene fremover – som allerede kender jeres families rytme.",
      features: [
        { title: "Smart halsbånd", text: "Aktivitet og advarsler når noget er galt." },
        { title: "AI som første kontakt", text: "Svarer hurtigt og sender dig videre til en rigtig dyrlæge." },
        { title: "Vækst og foder", text: "Ugentlig vægt, vækstkurve og besked når det er tid til at skifte foder." },
        { title: "Betroede partnere", text: "Dyrlæger, trænere og forsikringsselskaber i nærheden – tydeligt markeret." },
        { title: "DNA-test", text: "Hvilke racer din blandingshund består af – og hvad du skal holde øje med." },
        { title: "Kort til dyrlægen", text: "Raceblanding og DNA-fund samlet ét sted, klar til dyrlægen." },
      ],
      link: "Om AI-assistenten",
      planned: "Under udvikling",
    },
    species: {
      title: "Hunde og katte i dag. Flere dyrearter på vej.",
      text: "Bygget til familier i hele verden – på deres eget sprog.",
      chips: [
        { label: "Hund · tilgængelig", active: true, link: "species:dog" },
        { label: "Kat · tilgængelig", active: true, link: "species:cat" },
        { label: "Hunde- og katteracer · i udfordringen", link: "page:animals" },
        { label: "Flere dyrearter · planlagt", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Priser", title: "Enkle, fair priser." },
    faq: { title: "Det spørger forældre om", link: "Alle spørgsmål" },
    final: { title: "Klar til et kæledyr?", text: "Find ud af det på 12 uger. Start gratis på iPhone eller Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Sådan virker PetPrep – en 12-ugers-udfordring der viser om I er klar til et kæledyr",
        description:
          "Sådan virker PetPreps 12-ugers-udfordring: valg af kæledyr, Ansvarskontrakten, daglig pasning, rigtige gåture, stille timer og diplomet.",
      },
      eyebrow: "Sådan virker det",
      title: "Tolv uger der viser hvad et løfte er værd.",
      lead:
        "Dit barn passer et fotorealistisk AI-kæledyr der opfører sig så tæt på et rigtigt dyr, som en app overhovedet kan. Én rigtig uge svarer til én måned af dyrets liv, så på 12 uger vokser dyret op – og du ser om pasningen holder.",
      blocks: [
        {
          type: "steps",
          heading: "Fra første tryk til diplom",
          items: [
            { title: "Forælderen opretter familien", text: "Du registrerer dig med din e-mail (login med Apple og Google kommer snart). Tilføj hvert barn med et kaldenavn og eventuelt et fødselsår. Mere vil vi ikke vide om dit barn." },
            { title: "Du vælger kæledyret", text: "Vælg racen (blandingshunden er gratis), hvor dyret kommer fra – adopteret fra et internat eller købt hos en opdrætter – og dets alder ved ankomst: hvalp, ung, voksen eller senior." },
            { title: "Dit barn logger ind med en kode", text: "Du får en sekscifret kode der gælder i 15 minutter. Dit barn skriver den på sin telefon – ingen e-mail og ingen adgangskode. Er telefonen blevet væk? Log barnet ud af alle enheder med ét tryk." },
            { title: "Ansvarskontrakten", text: "Dit barn underskriver et løfte med fingeren. Underskriften er dyrets fødsel: Behovene begynder først at tælle fra det øjeblik, så intet går tabt hvis barnet skriver under senere." },
            { title: "Tolv ugers pasning", text: "Mad inden for de rigtige tidsrum, frisk vand, oprydning og en daglig gåtur med rigtige skridt. Efterhånden som dyret vokser, ændrer dets behov sig." },
            { title: "Diplomet", text: "Efter 12 uger fylder dyret et år. Dit barn får Ansvarsdiplomet med sin Care Score – eller I opdager begge to, helt uden skade, at tiden ikke er inde endnu." },
          ],
        },
        {
          type: "screens",
          heading: "Det ser dit barn",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Det har en voksen blandingshund brug for hver dag",
          intro: "Tallene kommer fra kilder hos dyrlæger og kennelklubber; hvor kilderne kun angiver et interval, fastsætter PetPrep værdien og siger det.",
          head: ["Behov", "Hvor ofte", "Hvis det bliver glemt"],
          rows: [
            ["Mad", "Morgen (kl. 6–10) og aften (kl. 17–21), én gang i hvert tidsrum", "Sulten efter cirka 12,5 timer"],
            ["Vand", "3 gange om dagen, mindst 3 timer imellem", "Tørstig efter cirka 10 timer"],
            ["Gåtur", "6.000 rigtige skridt (hvalpe starter på 2.000)", "Ingen gåtur overhovedet → syg næste morgen"],
            ["Oprydning", "Når dyret har lavet et uheld – aldrig i de stille timer", "Ingen mad eller vand før der er gjort rent"],
          ],
          note: "Hvalpe spiser 4, siden 3 og så 2 gange om dagen og kan kun holde sig cirka én time for hver måned de er gamle. En [border collie](breed:border_collie) skal have 12.000 skridt og bliver hurtigere sulten.",
        },
        {
          type: "cards",
          heading: "Bygget til det rigtige familieliv",
          columns: 3,
          items: [
            { title: "Stille timer", text: "Indstil skole- og sovetider. Dyret sætter tempoet ned, der sendes ingen påmindelser, og der sker aldrig uheld i det tidsrum." },
            { title: "Måltider i skoletiden", text: "Et fodringstidsrum der ligger helt inden for de stille timer, er forælderens opgave – det tæller aldrig imod dit barn." },
            { title: "Pause når som helst", text: "Én knap sætter spillet på pause, for eksempel til en snak i familien. Intet bliver værre under pausen." },
            { title: "Blide påmindelser", text: "Dyret giver først dit barn et lille puf, siden et mere indtrængende. Først hvis et behov står på nul i en time, får du en alarm." },
            { title: "Rigtige konsekvenser", text: "Forsømmelse betyder 12 timer hos dyrlægen. Et helt døgns forsømmelse betyder at internatet overtager dyret – og I kan starte forfra." },
            { title: "Fælles kæledyr", text: "Søskende kan dele ét kæledyr. Hver handling tilskrives det barn der udførte den, så scoren forbliver retfærdig." },
          ],
        },
        {
          type: "callout",
          title: "At fejle er også et resultat.",
          text: "Hvis dyret ender på det virtuelle internat, har I lært noget værdifuldt – før et rigtigt dyr kom til at betale prisen. I kan starte forfra, også med en lettere race.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "For forældre – PetPreps forældreoversigt, Care Score og kontrol",
        description:
          "Det ser forældre i PetPrep: et dagligt trafiklys for hvert barn, Care Score, rutiner, rapporter, notifikationer, stille timer, pause og privatliv indbygget fra starten.",
      },
      eyebrow: "For forældre",
      title: "Et objektivt bevis, ikke endnu et løfte.",
      lead:
        "Du behøver ikke at gætte på, om gåturene nu også blev til noget. PetPrep måler pasningen ud fra klare daglige rutiner og viser dig barn for barn hvordan det går.",
      blocks: [
        {
          type: "cards",
          heading: "Trafiklyset",
          intro: "Hvert barn og hvert kæledyr får en farve for i dag, i jeres families lokale tid – altid med begrundelsen skrevet ud.",
          columns: 3,
          items: [
            { title: "Grøn – alt i orden", text: "Rutinerne følger planen.", tag: "ok" },
            { title: "Gul – kræver opmærksomhed", text: "Mere end to rutiner er blevet glemt i dag.", tag: "warn" },
            { title: "Rød – haster", text: "Dyret er blevet sygt i dag, et behov har stået på nul i over en time, eller dyret er kommet på internat.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = rutiner udført til tiden ÷ forventede rutiner × 100, minus 10 point for hver sygdom, mellem 0 og 100.",
            "En rutine er én konkret opgave: hvert fodringstidsrum, hver af de tre gange med frisk vand, oprydning efter hvert uheld inden for to timer (skole og søvn tæller ikke med) og at nå det daglige mål for gåturen.",
            "Tid hvor du har sat spillet på pause, hvor dyret var hos dyrlægen eller før kontrakten blev underskrevet, tæller aldrig imod dit barn. Tidligere dage bliver låst, så en score ikke kan skrives om bagefter.",
            "Søskende der deler et kæledyr, deler hver rutine retfærdigt. Kun barnets egne handlinger tæller – hvis det ene barn gør det hele, får det 100 og det andet 0.",
          ],
        },
        {
          type: "screens",
          heading: "Det ser du",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Du bevarer kontrollen",
          items: [
            "Stille timer til skole og søvn i jeres lokale tid – også når der skiftes mellem sommer- og vintertid.",
            "Sæt spillet på pause for ethvert kæledyr med ét bekræftet tryk; dit barns skærm låses med det samme.",
            "Invitér den anden forælder med en engangskode; I ser begge alle børn og alle kæledyr.",
            "Log et barn ud af alle enheder hvis en telefon bliver væk; koderne kan kun bruges én gang og udløber efter 15 minutter.",
            "Eksportér hele jeres families data som én fil, eller slet et barns profil eller hele din konto med det samme direkte fra appen.",
          ],
        },
        {
          type: "list",
          heading: "Privatliv indbygget fra starten",
          items: [
            "Børn logger ind med en kode – ingen e-mail, ingen adgangskode, intet efternavn.",
            "Vi gemmer et kaldenavn og, hvis du tilføjer det, et fødselsår. Intet andet om dit barn.",
            "Notifikationer indeholder aldrig dit barns navn fordi de kan blive vist på låseskærmen; titlen kan være kæledyrets navn, hvis du har givet det et.",
            "Skridtene kommer fra Apple Sundhed (iPhone) eller Health Connect (Android) hvis du giver lov (kun læseadgang), og fra telefonens bevægelsessensor hvor den findes. PetPrep bruger ikke GPS og sporer ikke placering.",
            "Ingen reklamer, ingen chat med fremmede, servere i EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Når det kommer hjem – PetPreps AI-assistent til dit rigtige kæledyr",
        description:
          "Når familien får et rigtigt kæledyr, bliver PetPrep en AI-assistent: aktivitet fra smarte halsbånd, advarsler, AI som første kontakt med en rigtig dyrlæge, vækst og foder.",
      },
      eyebrow: "Når det kommer hjem",
      title: "Simulationen slutter. Omsorgen fortsætter.",
      lead:
        "Når jeres familie tager et rigtigt kæledyr med hjem, gør ét tryk PetPrep til en assistent gennem hele dyrets liv – i realtid, uden energibjælker og allerede fortrolig med jeres families hverdag.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Det kommer assistenten til at kunne",
          columns: 2,
          items: [
            { title: "Integration med smarte halsbånd", text: "Forbind populære GPS- og aktivitetstrackere – eller et PetPrep-halsbånd – og se aktiviteten i sammenhæng." },
            { title: "Advarsler der forklarer", text: "»Max løb 2 km i dag, halvdelen af det han plejer, og fik et større måltid. En ekstra aftentur vil hjælpe ham med at falde til ro.« Én iagttagelse, én begrundelse, ét forslag." },
            { title: "AI som første kontakt, rigtig dyrlæge bagefter", text: "Stil et spørgsmål, eller upload et billede. Assistenten svarer på generelle spørgsmål, vurderer hvor meget det haster, og sender dig videre til en rigtig dyrlæge når der er brug for det – akutte symptomer går direkte til en dyrlæge." },
            { title: "DNA-test til din hund eller kat", text: "Bestil en DNA-test i appen, eller upload resultatet af en du allerede har. PetPrep viser hvilke racer dyret består af, hvad der er typisk for dem og hvilke helbredsproblemer der er mere almindelige hos de racer – med kilder. Raceprocenter er ikke en diagnose, og en DNA-test viser ikke allergier." },
            { title: "Et kort til dyrlægen", text: "Raceblandingen og eventuelle direkte DNA-fund på én side eller i en QR-kode, så din dyrlæge med det samme ved hvad en blanding består af." },
            { title: "Vækst og ernæring", text: "Notér vægten hver uge, se vækstkurven, og få en påmindelse når det er tid til at skifte foder." },
          ],
        },
        {
          type: "screens",
          heading: "En forsmag",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principper vi ikke går på kompromis med",
          items: [
            "AI-assistenten er ikke en dyrlæge og stiller aldrig en diagnose. Hvert svar om helbred indeholder en vej videre til en rigtig dyrlæge.",
            "Tilbud fra partnere (butikker, forsikringsselskaber, trænere, dyrlæger) er altid markeret, og vi oplyser det når vi tjener provision.",
            "Intet deles med en partner uden dit samtykke.",
            "Dit barns data fra udfordringen overføres kun til assistenten hvis du siger ja.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Priser – PetPrep er gratis at starte med, 49,99 € for 12-ugers-udfordringen",
        description:
          "Blandingshunden er gratis for altid. 12-ugers-udfordringen koster 49,99 € pr. kæledyr som et engangskøb. Én pris for søskende der deler et kæledyr. Også som opgradering af dit gratis kæledyr.",
      },
      eyebrow: "Priser",
      title: "Enkle, fair priser.",
      lead: "Start gratis med en blandingshund. Køb hele 12-ugers-udfordringen når du er klar – de 12 uger begynder ved købet. Det gælder også det gratis kæledyr, dit barn allerede passer.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Ønsker – ting til dit kæledyr",
          intro:
            "I appen ønsker dit barn sig ting til sit kæledyr; du bestemmer og køber. Dit barn ser aldrig en pris. Tingene er kun til pynt: De ændrer aldrig behovene, Care Score eller diplomet. Fås også til den gratis blandingshund og huskat.",
          head: ["Ting", "Pris"],
          rows: [
            ["Seng (kat: kurv)", "5,99 €"],
            ["Mad- og vandskåle", "5,99 €"],
            ["Legetøj (hund: reblegetøj eller pibelegetøj, kat: stofmus eller fjerstang)", "5,99 € pr. stk."],
            ["Godbidder, pakke med 10", "2,99 €"],
            ["Velkomstpakke: seng + skåle + legetøj", "15,99 € (i stedet for 17,97 €)"],
          ],
          note: "Ønsker kommer med den næste opdatering af appen; de kan købes så snart tingene er tilgængelige i App Store og Google Play. Priserne gælder i Slovenien; butikken viser prisen for dit land.",
        },
        {
          type: "faq",
          heading: "Spørgsmål om priser",
          items: [
            { q: "Er gratisversionen virkelig gratis?", a: "Ja. Blandingshunden er gratis for altid, med hele simulationen, rigtige gåture og forældreoversigten." },
            { q: "Hvad indeholder udfordringen?", a: "Krævende racer som [border collie](breed:border_collie), dit kæledyrs humør som AI-videoer, Ansvarsdiplomet til sidst og adgang for begge forældre. Du kan også vælge den med blandingshunden eller huskatten." },
            { q: "Kan vi opgradere det gratis kæledyr, mit barn allerede har?", a: "Ja, så længe den gratis blandingshund eller huskat stadig er med i spillet. Start udfordringen fra dit barns kort i forældreappen. Kæledyret forbliver det samme: navn, udseende, alder og lærte kommandoer. De 12 uger, Care Score og diplomet tæller fra købet; tidligere dage bliver i historikken, markeret som dage før udfordringen, og tæller ikke med. Prisen er den samme: 49,99 € som engangskøb, uden abonnement. Blandingshunde, der blev oprettet i en tidlig version af appen, kan ikke opgraderes; appen fortæller dig, om det gælder din." },
            { q: "Kan et kæledyr i udfordringen komme tilbage til gratisplanen?", a: "Ikke efter ønske. En blandingshund eller huskat kommer kun tilbage til gratisplanen, hvis butikken refunderer købet; udfordringen slutter så uden diplom. Køber du udfordringen igen senere, starter 12 nye uger." },
            { q: "Presser appen mig til at købe?", a: "Nej. Har dit barn passet et gratis kæledyr på mindst 5 af dets første 7 dage, får du én notifikation og et kort i din oversigt om udfordringen – én gang pr. kæledyr og aldrig i de stille timer. Dit barn ser hverken priser eller denne påmindelse." },
            { q: "Betaler søskende to gange?", a: "Nej. Børn der deler ét kæledyr, betaler én pris. Et kæledyr nummer to i familien er en særskilt udfordring." },
            { q: "Hvordan betaler jeg?", a: "I appen via App Store eller Google Play. Refusion sker via din konto i butikken." },
            { q: "Hvad er Ønsker, og kan mit barn selv købe ting?", a: "Dit barn kan ønske sig en seng, skåle, legetøj eller godbidder til sit kæledyr – op til tre åbne ønsker ad gangen. Du får en notifikation og køber enten tingen eller vælger »Ikke nu«. Dit barn ser aldrig priser og kan ikke købe noget i børneappen." },
            { q: "Gør købte ting spillet lettere?", a: "Nej. Tingene er kun til pynt. De ændrer aldrig behovene, Care Score eller diplomet, og der findes ingen dyrlæge eller medicin blandt Ønsker – aldrig »betal for at redde dit kæledyr«." },
            { q: "Gælder det samme for voksne?", a: "Ja. Bruger du PetPrep på egen hånd til at prøve en race, gælder det samme: Blandingshunden er gratis for altid, og 12-ugers-udfordringen koster 49,99 € pr. kæledyr." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Ofte stillede spørgsmål – det spørger forældre om PetPrep",
        description:
          "Svar om PetPrep: tid hver dag, brug som voksen, privatliv og placering, skridt, søskende, hvis et barn ikke klarer det, sprog, dyrearter og rigtige kæledyr.",
      },
      eyebrow: "Ofte stillede spørgsmål",
      title: "Det spørger forældre om.",
      lead: "Korte, ærlige svar. Mangler du noget? Skriv til os.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Hvilken alder er PetPrep beregnet til?", a: "Til børn er den lavet til cirka 7–12 år og fungerer fint op til 16. Voksne bruger den også til at afprøve om en bestemt race virkelig er noget for dem før de køber eller adopterer." },
            { q: "Kan jeg bruge PetPrep alene, uden børn?", a: "Ja. Opret en konto som forælder, og tilføj dig selv som den profil der passer dyret – et kaldenavn er nok, lad fødselsåret stå tomt. Vælg racen, opret en sekscifret kode, og vælg derefter »Jeg er et barn« på samme telefon eller en anden og skriv koden – så er du den, der passer dyret. Når det bliver familiens hund, kan du senere tilføje din partner eller dine børn, så I passer den sammen. Prisen er den samme som for familier." },
            { q: "Hvor lang tid tager det hver dag?", a: "Et par minutter til mad, vand og oprydning – plus den gåtur en rigtig hund alligevel ville have brug for." },
            { q: "Sporer appen mit barns placering?", a: "Nej. Til gåture tæller den kun skridt. Hvis du giver lov, læser den dem fra Apple Sundhed (iPhone) eller Health Connect (Android) – kun læseadgang og kun skridt; hvor det er muligt, bruger den også telefonens bevægelsessensor. Den beder om tilladelse på gåturskærmen. GPS bruges ikke." },
            { q: "Skal mit barn have en e-mailadresse?", a: "Nej. Du opretter kontoen; dit barn logger ind med en sekscifret kode som du laver. Vi gemmer kun et kaldenavn og eventuelt et fødselsår." },
            { q: "Hvad sker der hvis mit barn glemmer det?", a: "Dyret sender først blide påmindelser. Hvis et behov bliver ved med at stå på nul, bliver dyret sygt og tilbringer 12 timer hos dyrlægen. Efter et helt døgn uden pasning overtager det virtuelle internat dyret – og I kan starte forfra." },
            { q: "Kan søskende dele et kæledyr?", a: "Ja. Hvert barn underskriver sin egen kontrakt, hver handling tilskrives den der udførte den, og hvert barn får sin egen retfærdige Care Score." },
            { q: "Hvad med skole og sengetid?", a: "Indstil stille timer. Dyret sætter tempoet ned, der sendes intet, og måltider der falder helt inden for de stille timer, klarer du." },
            { q: "Er det uhyggeligt for børn?", a: "Nej. Konsekvenserne er rigtige, men blide: Dyret kommer til dyrlægen eller på internat, aldrig noget voldsomt, og der er altid en ny start." },
            { q: "Hvilke dyr kan man vælge?", a: "[Hunde](species:dog) og [katte](species:cat) i dag: en gratis blandingshund og huskat og 12-ugers-udfordringen med en af dem eller med alle racer i [dyreleksikonet](page:animals), hvor deres kildebelagte behov også står. Flere dyrearter er planlagt." },
            { q: "Hvilke sprog?", a: "Engelsk og slovensk i dag. Flere sprog kommer efterhånden som PetPrep lanceres i nye lande." },
            { q: "Hvad sker der når vi har fået et rigtigt kæledyr?", a: "PetPrep kan blive en AI-assistent til dit rigtige kæledyr. Den del er under udvikling." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partnere – samarbejd med PetPrep",
        description:
          "PetPrep samarbejder med dyrehandler, internater, dyrlæger, trænere, forsikringsselskaber, producenter af halsbånd og skoler om at hjælpe familier med at få kæledyr på en ansvarlig måde.",
      },
      eyebrow: "Partnere",
      title: "Bedre forberedte familier – til gavn for alle der holder af dyr.",
      lead:
        "Familier der gennemfører PetPrep, ved hvad et kæledyr virkelig kræver. Vi bygger et partnernetværk der møder dem på det rigtige tidspunkt – tydeligt markeret og altid med familiens samtykke.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Hvem vi samarbejder med",
          columns: 3,
          items: [
            { title: "Dyrehandler", text: "Nå familier i det øjeblik de beviser at de er klar – for eksempel med et tilbud på en startpakke ved diplomet." },
            { title: "Internater, dyreværn og opdrættere", text: "Anbefal PetPrep før adoption eller køb – det giver færre forhastede beslutninger og færre dyr der bliver leveret tilbage." },
            { title: "Dyrlæger", text: "Når det rigtige kæledyr er kommet hjem, svarer AI-assistenten på de første spørgsmål og henviser ejerne til jer med et resumé af sagen som kun deles med samtykke." },
            { title: "Trænere og hundeskoler", text: "Anbefalinger og booking når en familie går videre til en rigtig hund." },
            { title: "Dyreforsikring", text: "Tilbud der tager højde for racen når et rigtigt kæledyr bliver registreret – tydeligt markeret." },
            { title: "Producenter af halsbånd og IoT", text: "Integration af aktivitetsdata til klogere advarsler der forklarer sig selv." },
          ],
        },
        {
          type: "list",
          heading: "Derfor stoler partnere på os",
          items: [
            "Børn logger ind uden e-mail, og vi holder deres data på et minimum på servere i EU.",
            "Kun verificeret indhold når frem til et barns skærm; der er ingen reklamer.",
            "Hvert tilbud fra en partner er markeret, og familien får altid oplyst enhver provision.",
          ],
        },
        { type: "callout", title: "Lad os tale sammen.", text: "Vilkårene for partnerskaber er ved at blive udarbejdet. Fortæl os hvem du er og hvad du har i tankerne.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investér i PetPrep – fra parathed til et kæledyr til omsorg hele livet",
        description:
          "PetPrep gør et barns løfte til bevis før familien får et kæledyr, og bliver derefter en AI-assistent gennem hele dyrets liv. Før lancering; brief efter aftale.",
      },
      eyebrow: "Investorer",
      title: "Fra en 12-ugers-udfordring til en relation over 10–15 år.",
      lead:
        "PetPrep giver forældre et objektivt bevis på om barnet er klar til et rigtigt kæledyr – og bliver derefter hos familien gennem hele dyrets liv.",
      blocks: [
        {
          type: "cards",
          heading: "Muligheden",
          columns: 3,
          items: [
            { title: "Problem", text: "Børn lover at passe et kæledyr; forældre har ingen neutral måde at afprøve det på før de binder sig til udgifter og mange års pasning." },
            { title: "Løsning", text: "En realistisk simulation over 12 uger med en live forældreoversigt og en objektiv Care Score – med et Ansvarsdiplom til sidst." },
            { title: "Udvidelse", text: "Når det rigtige kæledyr er kommet hjem, en AI-assistent til det: data fra halsbåndet, AI som første kontakt med dyrlæger, vækst og ernæring, DNA-test og partnertjenester." },
          ],
        },
        {
          type: "table",
          heading: "Forretningsmodel",
          head: ["Indtægtskilde", "Model", "Status"],
          rows: [
            ["Blandingshund", "Gratis for altid (kundeerhvervelse)", "Besluttet"],
            ["12-ugers-udfordringen", "49,99 € pr. kæledyr, engangskøb", "Besluttet"],
            ["Ønsker – ting til kæledyret (kun til pynt)", "Køb i appen: 5,99 € pr. ting, godbidder 2,99 € for 10, pakke 15,99 €; også i gratisversionen", "Bygget, køb i butikkerne kommer snart"],
            ["Tilbud fra partnere", "Provision fra butikker, forsikringsselskaber, dyrlæger og trænere", "Planlagt"],
            ["AI-assistent til det rigtige kæledyr", "Abonnement", "Planlagt"],
            ["DNA-test til hunde og katte", "Salg af test og provision fra partnere", "Planlagt"],
          ],
        },
        {
          type: "list",
          heading: "Bygget indtil nu",
          items: [
            "Spilmotor på serveren med synkronisering i realtid, testet på simuleringer af hele døgn, dage med skift til og fra sommertid og særtilfælde i familier.",
            "Familier med flere forældre, flere børn og fælles kæledyr, med retfærdig score for hvert barn.",
            "Unikke fotorealistiske AI-kæledyr med målte og loftbegrænsede AI-omkostninger; medier gemmes på lejede servere i Tyskland (Hetzner, EU).",
            "Dyrenes behov bygger på angivne kilder fra dyrlæger og kennelklubber, og hvert tal kan spores tilbage til sin kilde.",
            "Børnesikkerhed indbygget fra starten: login med pinkode uden e-mail, minimale data, ingen reklamer, kun verificerede medier.",
          ],
        },
        {
          type: "prose",
          heading: "Hvor vi står",
          paragraphs: [
            "PetPrep er endnu ikke lanceret, og en lukket beta er planlagt. Det første marked er Slovenien og regionen, derefter DACH og Storbritannien; produktet er bygget til global lokalisering fra første dag.",
            "Stifter: David Tacer, softwareudvikler og iværksætter. Mere [om os](page:about).",
          ],
        },
        { type: "callout", title: "Bed om investorbriefen.", text: "Vi deler brief, pitch deck og datarum efter aftale.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt PetPrep – familier, privatliv, partnere, investorer",
        description: "Kontakt PetPrep: spørgsmål fra familier, henvendelser om privatliv, partnerskaber og henvendelser fra investorer. Vi svarer på engelsk eller slovensk.",
      },
      eyebrow: "Kontakt",
      title: "Vi læser hver eneste besked.",
      lead: "Skriv til den rigtige indbakke, så svarer vi så hurtigt vi kan – på engelsk eller slovensk.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Virksomhedsoplysninger" }],
    },
    privacy: {
      navLabel: "Privatliv",
      meta: {
        title: "Privatlivspolitik – PetPrep",
        description: "Sådan indsamler, bruger og beskytter PetPrep personoplysninger om forældre og børn, og sådan udøver du dine rettigheder efter GDPR.",
      },
      eyebrow: "Juridisk",
      title: "Privatlivspolitik",
      lead: "Oversættelse – kun den engelske version er juridisk bindende. PetPrep er først og fremmest lavet til børn, så vi indsamler så lidt som muligt og forklarer præcis hvad vi gør med det.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Hvem er ansvarlig",
              paragraphs: [
                "Dataansvarlig for de personoplysninger der behandles via PetPrep-appen og dette websted, er {company}, {address}; {companyIds}. Kontakt ved spørgsmål om privatliv: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Hvad vi indsamler",
              items: [
                "Forældrekonto: navn (det din familie kalder dig), e-mailadresse, adgangskode (gemmes kun som en sikker hashværdi), din enheds tidszone og tidspunktet hvor du accepterede vilkårene og denne politik.",
                "Passerprofil (et barn eller en voksen der passer kæledyret): et kaldenavn på op til 30 tegn og eventuelt et fødselsår – feltet står tomt for en voksen. Ingen e-mail, adgangskode, efternavn eller fødselsdato.",
                "Enheder: telefonens model (f.eks. »iPhone«, aldrig et navn som brugeren har givet telefonen) og til notifikationer et push-token, platform og appversion.",
                "Plejeaktivitet: handlinger i simulationen (fodring, vand, oprydning, gåture), daglige skridttal (eller antal kørestolsskub i tilpasset tilstand – se afsnit 3 og 4), scorer og rapporter.",
                "Ansvarskontrakten: barnets underskrift med fingeren, gemt som en vektorstreg sammen med tidspunktet for underskriften.",
                "Koder: login- og invitationskoder gemmes kun som hashværdier og udløber.",
                "Fejlrapporter fra appen: hvis appen fryser eller går ned, kan den sende en kort teknisk rapport til vores server i EU (fejltype og fejltekst, sted i koden, app- og styresystemversion, skærmens navn, rolle som forælder eller barn). Den indeholder hverken navn, e-mailadresse, bruger-id eller IP-adresse, deles ikke med tredjeparter og slettes efter 30 dage.",
                "Listen til tidlig adgang (dette websted): din e-mailadresse, sidens sprog og tidspunktet for din tilmelding.",
                "Indløsning af gavekort (denne hjemmeside): forælderen logger ind med Google, Apple eller med e-mailadresse og adgangskode. Ved e-mailadresse og adgangskode tjekker vores server dem mod den eksisterende forældrekonto og gemmer aldrig adgangskoden i klartekst; fra Google eller Apple modtager vi kun kontoens identifikator og gemmer ingen andre oplysninger fra dem. Et kortvarigt login-token opbevares i browserens hukommelse i højst 15 minutter. Under omstillingen til Google eller Apple og tilbagevenden findes to poster (petprep.signin og petprep.webSession.handoff) kun i sessionslageret i denne browserfane. De slettes, så snart returneringssiden læser dem, ellers når fanen lukkes; overdragelsen accepteres kun inden for 60 sekunder. Efter log ud eller når fanen lukkes, er der intet gemt i browseren. På vores server er der kun kortvarige tekniske poster tilbage: en post om login-tokenet (konto-id og tidspunkter, intet navn eller e-mailadresse), som slettes automatisk cirka to døgn efter udløb, og tællere til begrænsning (mislykkede forsøg pr. konto i hashet form i 15 minutter; forespørgsler pr. netværksadresse i højst en time).",
              ],
            },
            {
              heading: "3. Sundheds- og fitnessdata (skridt, Apple Sundhed og Health Connect)",
              paragraphs: [
                "PetPrep tilgår og indsamler én slags sundheds- og fitnessdata: hvor mange skridt passeren går hver dag (fysisk aktivitet). Vi bruger dem kun til én funktion – kæledyrets daglige gåtur i simulationen: barnet går, og skridtene tæller som kæledyrets gåtur.",
                "Sådan får vi adgang: appen på barnets telefon tæller skridt. Hvis du giver tilladelse i systemets dialogboks, læser den skridtene fra Apple Sundhed (iPhone) eller Health Connect (Android) – kun læseadgang og kun skridt. Hvor det er muligt, bruger den også telefonens bevægelsessensor (Android: tilladelsen »Fysisk aktivitet«; iPhone: »Bevægelse og fitness«); uden tilladelse til Apple Sundhed eller Health Connect er det kun bevægelsessensoren der tæller.",
                "Hvad vi indsamler: appen sender kun dagens samlede antal skridt til vores server sammen med kilden (Apple Sundhed, Health Connect eller bevægelsessensoren) og tidspunktet for afsendelsen. Vi gemmer én dagstotal pr. passerprofil – aldrig enkelte bevægelser, ruter, placering, puls, søvn, vægt eller andre sundhedsdata. Vi skriver aldrig noget til Apple Sundhed eller Health Connect.",
                "Sådan bruger og deler vi dem: skridttallene bruges kun til at drive gåturen i simulationen og til at vise den for forælderen (forældreoversigt og rapporter). Vi bruger dem ikke til annoncering, profilering, sundhedsvurderinger eller træning af AI-modeller, vi sælger dem ikke, og vi deler dem ikke med tredjeparter; kun vores hostingudbyder (Hetzner, servere i EU) opbevarer dem på vores vegne. Vores brug af data modtaget fra Health Connect overholder Health Connects politik for tilladelser, herunder kravene om begrænset brug (Limited Use).",
                "Retsgrundlag og opbevaring: læsning af skridt er frivillig og sker kun med den tilladelse du giver på enheden; vi behandler dagstotalen for at levere den tjeneste du har valgt (opfyldelse af en kontrakt). Skridttal indgår i din families dataeksport og slettes sammen med passerprofilen eller din konto; de forsvinder fra vores krypterede sikkerhedskopier senest efter 35 dage.",
                "Du kan til enhver tid trække tilladelsen tilbage i enhedens indstillinger: iPhone → Indstillinger → Sundhed → Dataadgang og enheder → PetPrep; Android → Health Connect → Apptilladelser → PetPrep. Tilladelsen til bevægelsessensoren kan trækkes tilbage i telefonens indstillinger for PetPrep-appen. Gåturen tæller derefter ingen nye skridt.",
              ],
            },
            {
              heading: "4. Tilpasset tilstand (kørestolsskub)",
              paragraphs: [
                "Tilpasset tilstand er til børn der bruger kørestol: gåturen tæller så kørestolsskub i stedet for skridt. Den kommer til appen med den næste appopdatering; nedenfor beskriver vi hvilke data vi behandler hvis en forælder slår den til.",
                "Hvis en forælder slår tilpasset tilstand til for et barn, gemmer vi kun at den er slået til. Vi spørger ikke om og gemmer ikke en begrundelse, diagnose eller helbredstilstand.",
                "Mens den er slået til, læser appen på barnets telefon kun kørestolsskub i stedet for skridt – fra Apple Sundhed (registreret af et Apple Watch) med en separat tilladelse med kun læseadgang. På Android læser appen ikke skub; i stedet registrerer en forælder gåminutterne. Den bruger ikke bevægelsessensoren i det tilfælde. Kun dagens antal skub sendes til vores server; vi noterer for den pågældende dag at den tæller skub.",
                "En forælder kan registrere gåminutter for et barn i tilpasset tilstand (kun for i dag). Vi gemmer datoen, antallet af minutter og hvilken forælder der registrerede gåturen.",
                "Da oplysningen om at tilpasset tilstand er slået til, kan pege på et barns helbredstilstand, behandler vi den kun på grundlag af dit udtrykkelige samtykke (GDPR art. 9, stk. 2, litra a), som du giver som forælder eller værge på barnets vegne (GDPR art. 8) ved at slå kontakten til. Du kan til enhver tid slå tilstanden fra; appen tæller så skridt igen.",
                "Disse data (kontakten, dage talt i skub og registrerede gåture) indgår i din families dataeksport og slettes sammen med barnets profil eller din konto; de forsvinder fra vores krypterede sikkerhedskopier senest efter 35 dage, ligesom alle andre data.",
              ],
            },
            {
              heading: "5. Hvad vi ikke indsamler",
              items: [
                "Ingen placering: PetPrep bruger ikke GPS.",
                "Ingen andre sundhedsdata fra Apple Sundhed eller Health Connect end det daglige antal skridt eller kørestolsskub.",
                "Ingen reklamer og ingen SDK’er fra tredjeparter til annoncering eller sporing i appen.",
                "Ingen chat mellem brugere.",
                "Ingen annoncecookies på dette websted. Analysecookies sættes kun hvis du tillader dem (se Cookies nedenfor).",
              ],
            },
            {
              heading: "6. Hvorfor vi behandler data (formål og retsgrundlag)",
              items: [
                "For at levere den tjeneste du har bedt om: konti, simulationen, forældreoversigten, rapporter og notifikationer (opfyldelse af en kontrakt).",
                "For at behandle køb via App Store eller Google Play (opfyldelse af en kontrakt).",
                "Til den daglige gåtur (daglige skridttal – sundheds- og fitnessdata, se afsnit 3): opfyldelse af en kontrakt; læsning fra Apple Sundhed, Health Connect eller bevægelsessensoren kun med den tilladelse du giver på enheden.",
                "Til tilpasset tilstand (oplysningen om at den er slået til, kørestolsskub og registrerede gåture): forælderens udtrykkelige samtykke, givet ved at slå kontakten til (GDPR art. 9, stk. 2, litra a, og art. 8 – se afsnit 4).",
                "For at holde tjenesten sikker, f.eks. ved at begrænse gentagne loginforsøg (berettiget interesse).",
                "For at drive og sikre tjenesten med fejlrapporter fra appen der hjælper os med at rette frysninger og nedbrud (berettiget interesse).",
                "For at opfylde retlige forpligtelser, f.eks. bogføring af køb (retlig forpligtelse).",
                "For at sende dig e-mails om lanceringen af PetPrep hvis du har tilmeldt dig listen til tidlig adgang (samtykke – du kan afmelde dig i hver e-mail).",
                "For at forstå hvordan besøgende bruger dette websted, med Google Analytics – kun hvis du tillader analysecookies (samtykke – du kan til enhver tid ændre det under Cookieindstillinger).",
              ],
            },
            {
              heading: "7. Børn",
              paragraphs: [
                "Kun en forælder eller værge kan oprette en konto og tilføje et barn. Forælderen bestemmer hvad barnet kan gøre, og kan til enhver tid slette barnets profil. Vi beder aldrig et barn om kontaktoplysninger, viser aldrig reklamer og tillader aldrig kontakt med fremmede.",
                "Kontoindehaveren kan også oprette en passerprofil til sig selv eller til en anden voksen i familien – f.eks. for at afprøve om en race passer til vedkommende før der købes eller adopteres. De samme regler og de samme minimale data gælder for en sådan profil, og al beskyttelse der er udformet til børn, gælder også for den.",
              ],
            },
            {
              heading: "8. AI-genererede billeder og videoer",
              paragraphs: [
                "Hvert kæledyrs foto og korte videoer skabes af en AI-tjeneste udelukkende ud fra en beskrivelse af kæledyret (race, pels, aftegninger og lignende). Beskrivelsen indeholder aldrig navne eller oplysninger om din familie. Færdige medier opbevares på lejede servere i Tyskland (Hetzner, EU) og vises via kortlivede links.",
              ],
            },
            {
              heading: "9. Tjenesteudbydere",
              items: [
                "Hosting: Hetzner Online (servere i EU).",
                "AI-generering af billeder og video: fal.ai (modtager kun beskrivelsen af kæledyret).",
                "Push-notifikationer: Apple Push Notification service og Firebase Cloud Messaging via Expo; en notifikations titel kan være kæledyrets navn, hvis du har givet det et, men notifikationerne indeholder aldrig barnets navn.",
                "Køb: Apple App Store og Google Play; administration af køb via RevenueCat når købsfunktionen bliver aktiveret.",
                "E-mails om tidlig adgang: Klaviyo (modtager kun den e-mailadresse og det sprog du indsender på dette websted).",
                "Cookiesamtykke på webstedet: Kockica (gemmer dit samtykkevalg).",
                "Analyse af webstedet: Google Analytics 4 fra Google Ireland Ltd., kun med dit samtykke; Google Analytics 4 gemmer ikke IP-adresser.",
                "Tagstyring på webstedet: Google Tag Manager fra Google Ireland Ltd.; sætter ikke selv cookies, og de tags, den indlæser, følger dit samtykke.",
                "Indlejrede videoer: YouTube fra Google Ireland Ltd. (youtube-nocookie.com), indlæses først, når du trykker afspil og tillader markedsføringscookies.",
              ],
            },
            {
              heading: "10. Hvor længe vi opbevarer data",
              paragraphs: [
                "Vi opbevarer dine data så længe din konto findes. Når du sletter et barns profil eller din konto i appen, slettes dataene straks og kan ikke gendannes; de forsvinder automatisk fra vores krypterede sikkerhedskopier senest efter 35 dage. Oplysninger som vi efter loven skal opbevare (f.eks. om køb), opbevares i den periode loven kræver. Fejlrapporter fra appen slettes automatisk efter 30 dage.",
              ],
            },
            {
              heading: "11. Dine rettigheder",
              paragraphs: [
                "Du har ret til indsigt i dine data og til at få dem berigtiget, eksporteret og slettet, til at gøre indsigelse mod og begrænse behandlingen og til at klage til en tilsynsmyndighed – i Slovenien informationskommissæren (Informacijski pooblaščenec). I appen kan du eksportere hele din families data som én fil (Control → Account → Export my data) og slette et barns profil eller hele din konto. Skriv til {privacyEmail} om alt andet.",
              ],
            },
            {
              heading: "12. Sikkerhed",
              paragraphs: [
                "Adgangskoder og koder gemmes som hashværdier, forbindelser er krypterede, liveopdateringer leveres kun til medlemmer af din familie, og AI-medier kontrolleres før de når frem til et barns skærm.",
              ],
            },
            {
              heading: "13. Ændringer",
              paragraphs: ["Vi giver dig besked om væsentlige ændringer i appen før de træder i kraft. Datoen øverst viser den seneste version."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Nødvendige cookies får webstedet til at fungere og husker dit samtykkevalg. Alle andre cookies sættes kun, hvis du tillader dem i banneret, efter kategori: funktionelle (ekstra funktioner), analyse (Google Analytics: hvilke sider der besøges) og markedsføring (YouTube-videoer indlejret på nogle sider; vi viser ikke annoncer på dette websted). Google Tag Manager sætter ikke selv cookies, og hvert tag, den indlæser, følger dit valg. Du kan til enhver tid ændre eller trække dit valg tilbage.",
            "Tabellen nedenfor genereres automatisk af samtykkebanneret ud fra det, det finder på dette websted, så den viser de cookies, vi faktisk bruger.",
          ],
          settings: "Skift cookieindstillinger",
          fallback: "Cookielisten indlæses sammen med samtykkebanneret. Hvis du ikke kan se den, så tillad scripts på denne side eller skriv til {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Brugsvilkår",
      meta: {
        title: "Brugsvilkår – PetPrep",
        description:
          "Vilkårene for brug af PetPrep-appen og webstedet: konti og børneprofiler, 12-ugers-udfordringen og diplomet, køb og refusion, AI-indhold, tilpasset tilstand, rimelig brug, sletning og lovvalg.",
      },
      eyebrow: "Juridisk",
      title: "Brugsvilkår",
      lead: "Oversættelse – kun den engelske version er juridisk bindende. Reglerne for brug af PetPrep – skrevet til at blive læst.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Tjenesten",
              paragraphs: [
                "PetPrep leveres af {company}, {address}; {companyIds} – den samme virksomhed som er dataansvarlig efter privatlivspolitikken. Disse vilkår gælder for PetPrep-appen og webstedet petprep.si.",
                "PetPrep er en simulation af kæledyrspasning. Den hjælper familier og enkeltpersoner med at finde ud af om de er klar til at passe et rigtigt kæledyr – børn og voksne der vil afprøve om en race passer til dem før de køber eller adopterer. Det er et læringsværktøj, ikke veterinær eller anden faglig rådgivning.",
              ],
            },
            {
              heading: "2. Konti, profiler og børn",
              items: [
                "Konti oprettes af voksne: forældre, værger eller voksne der bruger PetPrep til sig selv. Når du registrerer dig, accepterer du disse vilkår og privatlivspolitikken.",
                "Passere (børn eller voksne) tager sig af kæledyret via en passerprofil som kontoindehaveren opretter; kontoindehaveren kan også oprette en til sig selv. En profil kræver kun et kaldenavn og eventuelt et fødselsår – vi har ikke brug for mere om et barn, så indtast det ikke nogen steder i appen.",
                "Et barn logger ind med en sekscifret kode (pinkode) som du opretter i din app. Koden er kortlivet og virker kun én gang; giv den kun til det barn den er beregnet til.",
                "Som forælder eller værge er du ansvarlig for dit barns brug af PetPrep: om appen passer til barnet, hvor meget tid barnet bruger på den, og om barnet er i sikkerhed på gåture (f.eks. i trafikken). Du kan til enhver tid stoppe spillet for ethvert kæledyr.",
                "Du kan invitere en anden forælder ind i familien med en invitationskode; begge ser alle familiens data, og begge kan stoppe spillet.",
                "Giv korrekte oplysninger, og pas godt på din adgangskode, dine koder og dine enheder.",
              ],
            },
            {
              heading: "3. 12-ugers-udfordringen, Care Score og diplomet",
              items: [
                "Udfordringen varer 12 uger (84 programdage) og starter med købet; hver passer har sin egen afslutning. Tid hvor spillet venter på betaling, tæller ikke med i de 12 uger. Opgraderer du et gratis kæledyr til udfordringen, starter de 12 uger også med købet; kæledyrets alder nulstilles ikke, og dagene før købet forbliver synlige i historikken, markeret som dage før udfordringen, men tæller hverken med i de 12 uger, i Care Score eller til diplomet.",
                "Care Score (0–100) viser hvor stor en del af de forventede rutiner (fodring, vand, oprydning, gåturen, et træningspas) passeren selv har udført; hver sygdom hos kæledyret trækker den ned. Tid hvor spillet er stoppet, tid hvor kæledyret er hos dyrlægen, og stille timer tæller aldrig imod passeren.",
                "Efter 12 uger registreres en endelig score som ikke ændres senere; pasning efter udfordringen påvirker den ikke. Med en score på 70 eller mere kan du oprette et Ansvarsdiplom (PDF) i appen; under 70 får du en rapport om udfordringen.",
                "Hvis mad, vand eller renlighed står på 0 % i 24 timer, bliver kæledyret »bragt på internat« (game over). Spillet med det kæledyr slutter, der er intet diplom, og du får en rapport om udfordringen.",
                "Care Score og diplomet viser kun hvordan passeren har passet et simuleret kæledyr i appen. De er ingen garanti for at et barn eller nogen anden er klar til et rigtigt kæledyr, ikke en faglig vurdering og ingen erstatning for din egen dømmekraft eller for råd fra en dyrlæge, en opdrætter eller et internat. Beslutningen om et rigtigt kæledyr er altid din.",
                "Spillereglerne (måltider, gåture og pasning efter race og alder) er forenklede og bygger på offentlige kilder. De er ikke veterinær rådgivning; spørg en dyrlæge om sundhed og pasning af et rigtigt dyr.",
              ],
            },
            {
              heading: "4. Gratis og betalte funktioner, køb og refusion",
              items: [
                "Blandingshunden og huskatten er gratis for altid og er måden at prøve PetPrep på; der er ingen gratis prøveperiode for udfordringen. Et gratis kæledyr har intet 12-ugers-program og intet diplom, forælderen ser historikken for de seneste 7 dage, og kæledyret har et grundlæggende sæt billeder og videoer.",
                "12-ugers-udfordringen er et engangskøb, ikke et abonnement (49,99 € i Slovenien; butikken viser prisen for dit land). I den nuværende version af appen kan du vælge den med alle racer, også blandingshunden og huskatten. Ét køb er én udfordring for ét kæledyr; hver ny udfordring med et nyt kæledyr er et nyt køb. Søskende der passer det samme kæledyr, betaler én gang.",
                "En forælder kan opgradere en gratis blandingshund eller huskat, som nogen allerede passer, til udfordringen til samme pris og med det samme kæledyr. Det er ikke muligt efter game over eller for blandingshunde, der blev oprettet i en tidlig version af appen; appen viser, når det gælder. Et kæledyr i udfordringen (også et opgraderet kæledyr og en blandingshund eller huskat valgt til udfordringen) kan ikke skiftes tilbage til gratisplanen; kun en refusion bringer en blandingshund eller huskat tilbage dertil (se nedenfor).",
                "En forælder køber i sin egen app via App Store eller Google Play; der er ingen køb i barnets app. Butikken behandler betalingen efter sine egne vilkår.",
                "Du kan oprette et udfordringskæledyr før du køber. Indtil udfordringen er betalt, er spillet sat på pause: kæledyret venter trygt, dets behov falder ikke, og intet bliver værre. Når du køber, fortsætter spillet hvor det slap.",
                "Refusion håndteres af App Store og Google Play efter deres egne regler; anmod om den i den butik hvor du købte. Hvis butikken refunderer et køb før udfordringen er afsluttet, sættes spillet med det kæledyr på pause igen. Billeder og videoer der er skabt efter købet, bevares. En blandingshund eller huskat bliver ikke sat på pause, men vender tilbage til gratisplanen: udfordringen slutter uden diplom, gratisplanens regler gælder igen, og kæledyret viser igen det grundlæggende sæt billeder og videoer. Køber du senere udfordringen igen til det kæledyr, starter 12 nye uger fra det nye køb.",
                "Efter game over (internat) låser et køb ikke kæledyret op; en ny udfordring er et nyt kæledyr og et nyt køb.",
                "Ønsker (ting til kæledyret når funktionen bliver tilgængelig): et barn kan ønske sig noget, men kun en forælder kan købe – i sin egen app. En købt ting hører til det kæledyr den blev købt til, og er kun til pynt – den påvirker ikke spillet, scoren eller diplomet. Efter game over, eller når kæledyret slettes, forbliver købet brugt og refunderes ikke. Hvis butikken refunderer købet, fjernes tingen (for godbidder: de ubrugte godbidder).",
                "Hvis du sletter et kæledyr, et barn eller kontoen mens en købt udfordring stadig er i gang, forbliver købet brugt: det overføres ikke til et andet kæledyr, og sletning er ikke en refusion. Appen advarer dig først og beder dig bekræfte.",
              ],
            },
            {
              heading: "5. AI-genererede billeder og videoer",
              items: [
                "Billeder og videoer af kæledyr genereres af kunstig intelligens (AI) udelukkende ud fra en beskrivelse af kæledyret (race, farve, pels osv.) – aldrig ud fra data om din familie. De er illustrationer af et simuleret kæledyr og svarer ikke nødvendigvis fuldstændig til et virkeligt dyr eller en racestandard.",
                "Hvor vi viser dem offentligt, f.eks. raceportrætterne på dette websted, er de mærket som AI-genererede.",
                "Et udseende er ikke nødvendigvis unikt: kæledyr af samme betalte race og farve kan dele de samme billeder og videoer, og gratis kæledyr får et af racens fælles udseender. En betalt udfordring omfatter et større sæt videoer end et gratis kæledyr.",
                "Når kontrakten er underskrevet eller et køb er gennemført, kan det tage et par minutter at forberede billederne og videoerne; imens viser appen at kæledyret er ved at blive klar, og markerer det der stadig er under forberedelse.",
                "Racefakta i appen og i dyreleksikonet på dette websted er sammenfattet fra de offentlige kilder vi henviser til, og er ikke kontrolleret af en dyrlæge.",
              ],
            },
            {
              heading: "6. Skridt, sundhedsdata og tilpasset tilstand",
              items: [
                "Den daglige gåtur tæller passerens rigtige skridt. Hvis du tillader det, læser appen dem fra Apple Sundhed eller Health Connect med kun læseadgang (den skriver aldrig noget dér) eller fra telefonens bevægelsessensor. Hvilke data vi behandler, er beskrevet i privatlivspolitikken (afsnit 3).",
                "Tilpasset tilstand er til børn der bruger kørestol: gåturen tæller så kørestolsskub i stedet for skridt. Du kan bruge den hvis funktionen findes i din version af appen. En forælder slår den til for det enkelte barn; når du slår den til, giver du dit samtykke, og når du slår den fra, trækker du det tilbage (privatlivspolitikken, afsnit 4).",
                "I tilpasset tilstand kan en forælder registrere gåminutter for barnet, kun for i dag. Du er ansvarlig for disse registreringer: registrer kun gåture der faktisk har fundet sted, da de tæller med i Care Score og diplomet.",
                "PetPrep bruger ikke placering og advarer ikke om farer under en gåtur; det er dit ansvar at gåturene foregår sikkert.",
              ],
            },
            {
              heading: "7. Notifikationer",
              paragraphs: [
                "Hvis du tillader det på enheden, sender appen push-notifikationer: påmindelser til passeren, advarsler til forældre når et kæledyr mangler mad, vand eller renlighed, og besked om sygdom, game over og udfordringens afslutning. En notifikations titel kan være kæledyrets navn, hvis du har givet det et; notifikationer indeholder aldrig barnets navn og sendes ikke i de stille timer. Du kan til enhver tid trække tilladelsen tilbage i enhedens indstillinger; uden notifikationer kan en passer gå glip af rutiner, hvilket påvirker spillet og scoren. Forældre får desuden højst én gang pr. gratis kæledyr en påmindelse om udfordringen, når nogen har passet det på mindst 5 af dets første 7 dage.",
              ],
            },
            {
              heading: "8. Rimelig brug",
              items: [
                "Forsøg ikke at snyde med antallet af skridt eller skub, at registrere gåture der ikke har fundet sted, at skaffe dig adgang til andre familiers data, at foretage reverse engineering af tjenesten eller at forstyrre den.",
                "Giv ikke kæledyr stødende eller upassende navne, og indtast ikke personoplysninger om et barn som appen ikke beder om.",
                "Vi kan begrænse eller suspendere konti der bryder disse regler eller udsætter børn for risiko, og vi kan fjerne et upassende kæledyrsnavn.",
              ],
            },
            {
              heading: "9. Immaterielle rettigheder",
              paragraphs: [
                "PetPrep og PetPreps logo, design, software og indhold tilhører {company}. Du må bruge appen samt dit kæledyrs billeder, videoer og diplom til din families personlige, ikke-kommercielle brug – f.eks. ved at dele dem med slægtninge.",
              ],
            },
            {
              heading: "10. Ansvar",
              paragraphs: [
                "Vi arbejder på at holde PetPrep tilgængelig og korrekt, men tjenesten leveres som den er; den er også afhængig af andres tjenester (appbutikkerne, Apple Sundhed, Health Connect, push-notifikationer, AI-tjenesten) som vi ikke har kontrol over. I det omfang loven tillader det, er vi ikke ansvarlige for indirekte tab eller for beslutninger om at købe eller adoptere et rigtigt kæledyr. Intet i disse vilkår begrænser de rettigheder du har som forbruger efter ufravigelig lovgivning.",
              ],
            },
            {
              heading: "11. Sletning af konto og ophør af brug",
              paragraphs: [
                "Du kan til enhver tid slette et barns profil eller din konto i appen. Sletningen sker straks og er endelig; når den sidste forælder i en familie sletter sin konto, slettes hele familien. Du kan eksportere dine data først (Control → Account → Export my data). Hvad der sker med dataene, er beskrevet i privatlivspolitikken; hvad der sker med et køb, er beskrevet i afsnit 4.",
              ],
            },
            {
              heading: "12. Ændringer af disse vilkår",
              paragraphs: [
                "Vi opdaterer disse vilkår når appen eller lovgivningen ændres. Vi giver dig besked om væsentlige ændringer i appen før de træder i kraft. Datoen øverst viser den seneste version. Hvis du ikke er enig i en ændring, kan du til enhver tid slette din konto.",
              ],
            },
            {
              heading: "13. Lovvalg og tvister",
              paragraphs: [
                "Disse vilkår er underlagt lovgivningen i Republikken Slovenien. Forbrugere kan også påberåbe sig den ufravigelige beskyttelse i det land hvor de bor, og bruge EU’s platform for onlinetvistbilæggelse.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Spørgsmål om disse vilkår: {termsEmail}. Tjenesteudbyder: {company}, {address}; {companyIds}. Spørgsmål om privatliv: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Børns sikkerhed",
      meta: {
        title: "Børns sikkerhed – sådan beskytter PetPrep børn",
        description:
          "Sådan beskytter PetPrep børn: konti oprettet af forældre, login med kode uden e-mail, minimale data, ingen reklamer eller chat, ingen sporing af placering, kontrollerede medier.",
      },
      eyebrow: "Tryghed",
      title: "Bygget til børn fra første kodelinje.",
      lead: "Oversættelse – kun den engelske version er juridisk bindende. Barnet er PetPreps vigtigste bruger, så sikkerhed og privatliv er produktregler – ikke indstillinger.",
      blocks: [
        {
          type: "cards",
          heading: "Vores standarder",
          columns: 2,
          items: [
            { title: "Forældre opretter alle konti", text: "Børn kan ikke tilmelde sig på egen hånd. En forælder tilføjer barnet og genererer en loginkode til engangsbrug som gælder i 15 minutter." },
            { title: "Ingen e-mail eller adgangskode til børn", text: "Et barn logger ind med forælderens kode. Forkerte, udløbne og brugte koder får alle det samme svar, så ingen kan gætte hvilke børn der findes." },
            { title: "Minimale data", text: "Et kaldenavn og eventuelt et fødselsår. Intet efternavn, ingen fødselsdato, ingen billeder af barnet." },
            { title: "Ingen reklamer, ingen chat, ingen fremmede", text: "Der er ingen annoncering og ingen mulighed for at kontakte andre brugere." },
            { title: "Ingen sporing af placering", text: "Gåture tæller kun skridt – fra Apple Sundhed eller Health Connect (med din tilladelse, kun læseadgang) eller fra telefonens bevægelsessensor. GPS bruges ikke." },
            { title: "Private liveopdateringer", text: "Opdateringer i realtid når kun frem til de børn der passer det pågældende kæledyr, og til forældrene i samme familie." },
            { title: "Kontrollerede medier", text: "Kun billeder og videoer der er lavet til PetPrep og kontrolleret af vores server, bliver vist – fra vores lagring i EU." },
            { title: "Notifikationer uden barnets navn", text: "Notifikationer indeholder aldrig barnets navn fordi de kan blive vist på en låseskærm. Kun kæledyrets navn kan blive vist som titel, hvis du har givet det et." },
          ],
        },
        {
          type: "list",
          heading: "Forældrene bestemmer",
          items: [
            "Stille timer til skole og søvn – uden notifikationer.",
            "En pauseknap der låser barnets skærm med det samme.",
            "Log et barn ud af alle enheder på én gang.",
            "Eksportér eller slet alle data med det samme fra appen.",
          ],
        },
        { type: "callout", title: "Meld en bekymring", text: "Hvis noget i PetPrep bekymrer dig, så skriv til os, og vi svarer med prioritet.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Tilgængelighed",
      meta: {
        title: "Tilgængelighed – PetPrep for alle børn",
        description:
          "Sådan tilpasser PetPrep sig til børn der har svært ved at swipe, bruger VoiceOver eller TalkBack eller foretrækker mindre bevægelse – med de samme regler og point for alle.",
      },
      eyebrow: "Tryghed",
      title: "Alle børn kan passe deres kæledyr.",
      lead: "Nogle børn har svært ved at swipe, bruger en skærmlæser eller foretrækker mindre bevægelse på skærmen. PetPrep tilpasser sig dem – med de samme regler, de samme point og det samme diplom som alle andre.",
      blocks: [
        {
          type: "cards",
          heading: "I appen",
          columns: 3,
          items: [
            { title: "Nemmere fingerbevægelser", text: "I stedet for at swipe holder barnet en finger nede eller trykker på en knap – i alle swipespil: børstning, fjerstangen, skift af kattegrus og kast med bolden. En forælder slår det til for hvert barn i forældreområdet." },
            { title: "Skærmlæsere", text: "Når VoiceOver eller TalkBack er slået til, skifter spillene selv til at holde nede. Bjælken med kæledyret øverst læser alt om kæledyret op, og hvert trin i plejespillene er sin egen knap." },
            { title: "Mindre bevægelse", text: "Når telefonen er indstillet til at reducere bevægelse, står pulserende knapper og den vuggende Curio stille." },
          ],
        },
        {
          type: "cards",
          heading: "Kommer med næste appopdatering",
          items: [
            { title: "Gåture i kørestol", text: "I tilpasset tilstand tæller kørestolsskub præcis som skridt – ét skub er ét skridt. En forælder kan også registrere dagens gåminutter, så barnet ikke behøver at gøre noget ekstra. En forælder slår det til for hvert barn, og når det slås fra, fjernes markeringen fra historikken." },
          ],
        },
        { type: "callout", title: "Den samme udfordring for alle", text: "Tilpasningerne ændrer hvordan et barn spiller – aldrig hvad der tæller. Scorer, tidsrammer og Ansvarsdiplomet fungerer præcis ens. Vi spørger aldrig hvorfor et barn har brug for en tilpasning.", tone: "mint" },
        { type: "callout", title: "Er der noget der ikke virker for dit barn?", text: "Fortæl os hvad der var i vejen, så ser vi på det.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Slet konto",
      meta: {
        title: "Slet din PetPrep-konto og dine data",
        description:
          "Sådan sletter du din PetPrep-konto i appen eller via e-mail – hvilke data der slettes, hvad der gemmes og hvor længe.",
      },
      eyebrow: "Tryghed",
      title: "Slet din PetPrep-konto",
      lead: "Oversættelse – kun den engelske version er juridisk bindende. Du kan til enhver tid slette din konto og din families data – i appen med det samme eller via e-mail hvis du ikke længere har appen.",
      blocks: [
        {
          type: "steps",
          heading: "Slet din konto i appen (med det samme)",
          items: [
            { title: "Log ind som forælder", text: "Åbn PetPrep, tryk på »I'm a parent« (»Jeg er forælder«), og log ind." },
            { title: "Åbn din konto", text: "Gå til Controls → Account. Valgfrit: tryk først på »Export my data« for at gemme en kopi." },
            { title: "Slet", text: "Tryk på »Delete account«, bekræft med din adgangskode (eller dit login med Google/Apple), og skriv DELETE. Tryk derefter på »Delete for good«." },
            { title: "Færdig", text: "Sletningen sker med det samme og kan ikke fortrydes. Alle dine enheder og dine børns enheder bliver logget ud." },
          ],
        },
        {
          type: "prose",
          heading: "Har du ikke appen længere? Bed om sletning via e-mail",
          paragraphs: [
            "Skriv til [privacy@petprep.si](mailto:privacy@petprep.si) fra e-mailadressen på din forældrekonto i PetPrep med emnet »Delete my account« (Slet min konto). Vi kontrollerer at anmodningen kommer fra kontoens ejer, sletter kontoen inden for en måned (som regel inden for få dage) og bekræfter derefter via e-mail.",
            "Hvis du kun vil slette ét barns profil, så log ind som forælder og åbn barnet under Controls → Children → Delete profile.",
          ],
        },
        {
          type: "table",
          heading: "Hvad der slettes og hvad der gemmes",
          head: ["Data", "Hvad der sker"],
          rows: [
            ["Din forældrekonto (navn, e-mail, adgangskode, kobling til login med Google/Apple)", "Slettes med det samme"],
            ["Hvis du er familiens eneste forælder: børnenes profiler (kaldenavn, fødselsår), kæledyr, AI-billeder og -videoer, kontrakter og underskrifter, plejelog, Care Scores, diplomer, skridttal, stille timer, loginkoder", "Slettes med det samme"],
            ["Hvis der stadig er en anden forælder i familien", "Kun din konto slettes; familien fortsætter med den anden forælder"],
            ["Enheder og notifikationstokens", "Logges ud og slettes med det samme"],
            ["Købsregistreringer (produkt, dato, butikkens transaktions-id, et anonymt købs-id – hverken navn eller e-mail)", "Opbevares så længe bogførings- og skattelovgivningen kræver det, og er ikke længere knyttet til din familie"],
            ["Registreringer af AI-omkostninger", "Opbevares til bogføringen uden nogen kobling til dig, dine børn eller dine kæledyr"],
            ["Krypterede sikkerhedskopier", "Fjernes automatisk inden for 35 dage"],
          ],
          note: "Selve købene håndteres af App Store og Google Play; Apple og Google opbevarer deres registreringer efter deres egne politikker. En udfordring der er købt, men ikke gennemført, refunderes ikke når du sletter kontoen.",
        },
        { type: "callout", title: "Spørgsmål?", text: "Skriv til privacy@petprep.si. Du finder detaljerne i vores privatlivspolitik.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "PetPreps dyreleksikon – arter og racer med kilder",
        description:
          "Hunde, katte og deres racer: hvad hver enkelt har brug for, hvem den passer til og hvordan PetPrep simulerer den. Søg i racerne og sammenlign dem; alle fakta linker til deres kilde.",
      },
      navLabel: "Dyr",
      eyebrow: "Dyreleksikon",
      title: "Kend dyret før det kommer hjem.",
      lead:
        "Hvad hver art og race i PetPrep virkelig har brug for – fra kennelklubber, katteforbund, velgørende veterinærorganisationer og undersøgelser, med link til hver kilde. Plus de regler PetPrep bruger til at simulere det.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Om PetPrep – virksomheden, stifteren og vores kilder til fakta om dyr",
        description:
          "Hvem der står bag PetPrep: stifteren David Tacer, vores mission og hvordan dyreleksikonet finder og kontrollerer sine fakta.",
      },
      navLabel: "Om os",
      eyebrow: "Om os",
      title: "Hvem der står bag PetPrep.",
      lead: "PetPrep bliver lavet i Maribor i Slovenien af en lille softwarevirksomhed. Her fortæller vi hvem vi er, hvorfor vi bygger PetPrep og hvordan vi beslutter hvad appen og dyreleksikonet siger om dyr.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Virksomheden",
          paragraphs: [
            "PetPrep udbydes af Data Vallis David Tacer s.p., en virksomhed inden for softwareudvikling (enkeltmandsvirksomhed) med hjemsted i Dravograd i Slovenien. Den samme virksomhed driver dette websted og PetPrep-appen og er dataansvarlig for personoplysninger (se [privatlivspolitikken](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Stifteren",
          paragraphs: [
            "PetPrep er grundlagt af David Tacer, softwareudvikler og iværksætter fra Maribor i Slovenien.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Vores mission",
          paragraphs: [
            "Alle familier har hørt »Jeg lover at passe den.« PetPrep gør det løfte til et bevis: i 12 uger passer et barn – eller en voksen der gerne vil have en bestemt race – et naturtro AI-kæledyr med et rigtigt dyrs daglige behov, og forælderen ser hver dag hvordan pasningen holder.",
            "At fejle i simulationen er også et godt resultat: familien finder ud af det før et rigtigt dyr kommer til at lide, og før den binder sig til mange års pasning og udgifter. Når et rigtigt kæledyr så kommer hjem, vil vi gerne have at PetPrep fortsat er nyttig i hele dyrets liv.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Sådan er dyreleksikonet bygget op",
          intro: "[Dyreleksikonet](page:animals) og appen bruger de samme data. Disse regler afgør hvad det må sige:",
          items: [
            "Hvert faktum angiver sin kilde og linker til den. Kilderne er inddelt efter hvor stor vægt de fortjener: A – racestandarder, fagfællebedømte artikler og retningslinjer fra dyrlægeforeninger; B – rådgivningssider fra dyrehospitaler, universiteter og nationale dyreværnsorganisationer; C – sekundære sammenfatninger (leksika, presseartikler) som kun bruges sammen med en A- eller B-kilde.",
            "Kun fakta med kilde vises som fakta. En værdi som ingen kilde understøtter, offentliggøres ikke. Hvor kilderne er uenige, vises hver kilde med sin egen værdi.",
            "Spilleregler er ikke veterinær rådgivning. Hvor spillet har brug for et tal som kilderne ikke angiver præcist (f.eks. et dagligt mål for antal skridt), fastsætter PetPrep det ud fra kilderne og viser det kun under »Sådan simulerer PetPrep det«, mærket som spilleregel.",
            "Sundhedsnoter er kun til orientering. De sammenfatter hvad kilderne siger om en race, og er ikke gennemgået af en dyrlæge. Spørg en dyrlæge når det gælder et rigtigt dyr.",
            "Racestandarder gengives med vores egne ord og kopieres aldrig i længere uddrag, og en race kaldes aldrig »hypoallergen«.",
            "Leksikonet genereres ud fra PetPreps forskningsdata – de samme data som appen bruger. Når en kilde eller en værdi ændres, eksporteres leksikonet igen, og hver raceside viser datoen for den seneste opdatering. Hvis du finder en fejl, så skriv til hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Spørgsmål om PetPrep?", text: "Skriv til den rette indbakke på kontaktsiden – familier, privatliv, partnere eller investorer.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Mød Curio – PetPreps maskot",
        description:
          "Curio er PetPreps maskot: den nysgerrige lille terning fra vores logo og stjernen i vores korte videoer. Hvem den er, hvordan den adskiller sig fra det naturtro kæledyr i appen, billeder og et mediekit.",
      },
      navLabel: "Mød Curio",
      eyebrow: "Vores maskot",
      title: "Mød Curio.",
      lead: "Curio er den nysgerrige lille terning fra PetPreps logo, som er blevet levende. Den spiller hovedrollen i vores korte videoer som kæledyret der venter ved døren på at nogen holder et løfte. Den er vores maskot – ikke det kæledyr du passer i appen.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPreps maskot, vinker: en blød grafitgrå terning med store hvide øjne, en lille hindbærrød næse og et mintgrønt halsbånd.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Hvem er Curio?",
          paragraphs: [
            "Curio startede som symbolet i vores logo: en afrundet grafitgrå firkant med to store øjne der kigger op mod højre, og en lille hindbærrød næse. På slovensk kalder vi den Radovednež – »den nysgerrige«. I oktober 2026 fik den korte arme, buttede ben og et mintgrønt halsbånd med et rundt mærke og blev en figur.",
            "Curio har ingen mund. Alt hvad den føler, kan ses i øjnene: helt åbne når nogen hvisker »gåtur?«, to søvnige streger når ingen er kommet hjem endnu, glade buer når skålen er fuld.",
            "Curio er en »den« – hverken dreng eller pige, hverken hund eller kat. Den står for alle kæledyr der hver dag venter på at nogen holder et løfte.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio i korte træk",
          columns: 3,
          items: [
            { title: "Navn", text: "Curio på engelsk, Radovednež på slovensk." },
            { title: "Lavet af", text: "Blød grafit, et mintgrønt halsbånd og et hindbærrødt mærke – PetPreps farver." },
            { title: "Taler", text: "Aldrig. Kun med øjnene." },
            { title: "Elsker", text: "Gåture, en fuld skål og børn der kommer tilbage på dag 15." },
            { title: "Bor", text: "I vores korte videoer på [TikTok](https://www.tiktok.com/@petprep.si) og [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Opgave", text: "At minde familier om – med et glimt i øjet – at et kæledyr har brug for pasning hver eneste dag." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio er ikke kæledyret i appen",
          intro: "I vores videoer spiller Curio et kæledyr der har brug for pasning, for det har alle kæledyr. I PetPrep passer børn – og voksne der afprøver en race – noget der ligger meget tættere på virkeligheden.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, den tegnede maskot, vinker på en lys baggrund.",
              label: "Maskot",
              title: "Curio – vores maskot",
              text: "En tegnet figur til vores videoer, klistermærker og denne side. Den viser hvad PetPrep handler om. Du kan ikke adoptere den.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Et naturtro AI-genereret portræt af en labrador retriever, sådan som kæledyrene ser ud i PetPrep-appen.",
              label: "I appen · AI-billede",
              tone: "mint",
              title: "Dit kæledyr i PetPrep",
              text: "En naturtro AI-simulation af en rigtig race – som denne [labrador retriever](+breed:labrador_retriever) – med et rigtigt dyrs daglige behov: måltider, vand, gåture talt i rigtige skridt, oprydning og træning. Se [sådan virker det](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio i billeder",
          intro: "Curio er en stiliseret 3D-figur, lavet med AI-værktøjer ud fra vores eget design. Nye scener dukker først op i vores videoer.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio vinker på en mintgrøn baggrund.", caption: "Hej! Det klassiske vink.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio står på en hvid hylde og vinker.", caption: "På hylden – og venter på nogen." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio forfra, fra siden og bagfra med fire forskellige udtryk i øjnene.", caption: "Fra alle sider – og sådan viser øjnene følelser." },
            { src: "/curio/curio-waving.webp", alt: "Curio på en gennemsigtig baggrund.", caption: "Fritlagt – klar til dit opslag (se mediekittet).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediekit",
          intro: "Til indholdsskabere, journalister og partnere der skriver om PetPrep. Spørgsmål eller idéer til et samarbejde: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Download det hele", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, gennemsigtig baggrund", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, kvadratisk, lys", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, kvadratisk, mintgrøn", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Figurark", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "PetPrep-logo", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "PetPrep-symbol", meta: "SVG" },
          ],
          rulesHeading: "Sådan bruger du Curio",
          rules: [
            "Brug Curio i opslag, artikler og videoer om PetPrep. Spørg os først hvis det gælder annoncer, produkter eller merchandise.",
            "Vis Curio som den er: grafitgrå terning, hvide øjne, hindbærrød næse, mintgrønt halsbånd. Tilføj ikke mund, ører, pels eller øjenbryn, og lad være med at ændre farverne eller strække figuren.",
            "Curio er PetPreps maskot. Fremstil den ikke som kæledyret i appen eller som en rigtig hund eller kat.",
            "Brug ikke Curio på en måde der antyder at PetPrep støtter et andet produkt, en anden sag eller en anden person.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Spørgsmål om Curio",
          items: [
            { q: "Er Curio en hund eller en kat?", a: "Ingen af delene. Curio er en lille terning fra vores logo. Den spiller et kæledyr i vores videoer, men den tilhører ikke nogen art." },
            { q: "Kan mit barn passe Curio i appen?", a: "Nej. I appen passer familien et naturtro kæledyr af en rigtig race med de samme daglige behov som det rigtige dyr. Curio optræder kun i vores videoer og på webstedet." },
            { q: "Hvorfor har Curio ingen mund?", a: "Fordi vores logo ikke har nogen. Curio siger alt med øjnene – og tigger aldrig højlydt om godbidder." },
            { q: "Hvor kan jeg se nye videoer med Curio?", a: "På TikTok og Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Viden om pleje af kæledyr – hvad hunde og katte må spise, med kilder | PetPrep",
        description:
          "Hvilke fødevarer der er giftige, risikable eller i orden for hunde og katte – årsagen, symptomerne og hvad du skal gøre, med link til hver kilde. Lavet af PetPrep til familier der gør sig klar til et kæledyr.",
      },
      navLabel: "Pleje",
      eyebrow: "Viden om pleje",
      title: "Hvad er sikkert for dit kæledyr?",
      lead:
        "Klare svar med kilder til familier: hvilke fødevarer der er giftige, hvilke der er risikable og hvilke der er fine som godbid – for hunde og katte, og flere arter er på vej. Alle svar linker til deres kilder.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Gratis tegninger til farvelægning med hunde og katte til børn | PetPrep",
        description:
          "Gratis tegninger til farvelægning som du kan printe: golden retriever, labrador, border collie, blandingshundehvalp, killing og Curio. PDF i A4 og US Letter, hver med et faktum om pasning af kæledyr og kilden til det.",
      },
      navLabel: "Tegninger til farvelægning",
      eyebrow: "Tegninger til farvelægning",
      title: "Gratis tegninger til farvelægning – klar til print.",
      lead:
        "Hunde, katte og Curio, som du kan farvelægge eller tegne efter – print én side eller hele hæftet. Hver side har et faktum om pasning af kæledyr fra dyrlæger eller kennelklubber, som I kan læse sammen.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "For børn der gerne vil have et kæledyr – tegninger, Curio og #walkyourpet | PetPrep",
        description:
          "Alt hvad PetPrep har til børn: gratis tegninger til farvelægning som du kan printe, med fakta om pasning af kæledyr, maskotten Curio og #walkyourpet – til børn og forældre der gør sig klar til et kæledyr sammen.",
      },
      navLabel: "For børn",
      eyebrow: "For børn",
      title: "Til børn der gerne vil have et kæledyr.",
      lead: "Tegninger til farvelægning som du kan printe, Curio og #walkyourpet – til børn og forældre der gør sig klar til et kæledyr sammen.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPreps maskot, vinker: en blød grafitgrå terning med store hvide øjne, en lille hindbærrød næse og et mintgrønt halsbånd.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – bevægelsen der startede med et rigtigt barn",
        description:
          "»Vi kunne gå walk your pet.« Et barn sagde det, og nu er det en bevægelse: familier der går ud fordi et kæledyr skal have sin gåtur. Hvordan det startede, hvad det betyder i PetPrep og hvordan du kan være med.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Vi har ikke selv fundet på udtrykket. Det gjorde et barn. Nu er det en invitation til alle familier: gå ud, for et kæledyr skal have sin gåtur – et rigtigt kæledyr eller det du øver dig med i PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Story-kort: »Overheard at the founder's house.« Et barn siger »Lahko bi šli walk your pet« – »Vi kunne gå walk your pet« – og overskriften lyder »#walkyourpet is a thing now.«", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Sådan startede det",
          paragraphs: [
            "I oktober 2026 havde vores stifters børn besøg af en veninde. De var ved at beslutte om de skulle gå ud, og hun sagde, halvt på slovensk og halvt på engelsk: »Lahko bi šli walk your pet« – »Vi kunne gå walk your pet.«",
            "Ingen havde bedt hende om det. Hun kendte PetPrep, hvor en hunds gåtur kun tæller hvis man virkelig går udenfor, og »walk your pet« var simpelthen blevet en grund til at gå ud. Vi var så glade for det at vi beholdt det – på engelsk, på alle sprog.",
            "En rigtig samtale. Rigtige børn.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Hvad det betyder i PetPrep",
          intro: "I PetPrep er hundens daglige gåtur dit barns rigtige skridt, læst fra Apple Sundhed eller Health Connect hvis du tillader det. Det tæller ikke at blive på sofaen, så »walk your pet« betyder altid at gå udenfor. Ingen GPS og ingen placering – kun skridt.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Vær med i bevægelsen",
          intro: "Du behøver ikke appen for at være med. Alle familier der går ud for et kæledyrs skyld – et rigtigt eller et øvekæledyr – er en del af den.",
          items: [
            { title: "Gå ud", text: "Tag hunden med på gåtur. Eller hvis du stadig overvejer et kæledyr, så gå den tur du ville gå med det." },
            { title: "Fang øjeblikket", text: "Sko ved døren, en snor, stien, poter i græsset. Ikke ansigter, ikke navne." },
            { title: "Del det", text: "Læg det op med #walkyourpet, og tag @petprep.si på Instagram eller TikTok. Med din tilladelse deler vi måske de bedste øjeblikke her og på vores profiler." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Del trygt",
          intro: "#walkyourpet handler om børn, så disse regler gælder for alt hvad vi deler:",
          items: [
            "Forældre lægger op, ikke børn. Kun en forælder bestemmer hvad der kommer på nettet.",
            "Ingen børneansigter, navne, skoler eller adresser – og aldrig en anden families barn.",
            "Vi deler kun igen med en forælders tilladelse, og vi fjerner et opslag når du beder om det.",
            "Citater fra børn er altid ægte. Vi finder aldrig på eller »forbedrer« hvad et barn har sagt.",
            "Det er en invitation, ikke en pligt. Ingen dage i træk du skal holde fast i, intet pres – bare en god grund til at gå ud.",
          ],
        },
        {
          type: "callout",
          title: "Det første øjeblik er vores. Det næste kan være dit.",
          text: "Del din families gåtur med #walkyourpet, og tag @petprep.si. Spørgsmål eller en historie du gerne vil fortælle: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Spørgsmål",
          items: [
            { q: "Skal jeg have PetPrep for at være med?", a: "Nej. Alle der går ud for et kæledyrs skyld, kan bruge #walkyourpet. PetPrep er stedet hvor udtrykket blev født, og hvor en øvehunds gåtur kun tæller i rigtige skridt." },
            { q: "Virker det også for katte i PetPrep?", a: "Ikke som gåtur. Katte går ikke tur, så i PetPrep bliver en kats behov dækket med leg – ikke med skridt. Gåture er for hunde." },
            { q: "Hvorfor er udtrykket på engelsk?", a: "Fordi det var sådan barnet sagde det – på engelsk midt i en slovensk sætning. Børn over hele verden blander engelsk ind, så udtrykket er det samme på alle sprog." },
            { q: "Kommer I til at lægge mit barn op?", a: "Kun det du selv deler og giver os lov til at dele igen – og aldrig et barns ansigt eller navn. Skriv til os på hello@petprep.si, så fjerner vi det." },
          ],
        },
      ],
    },
  },
};

export default da;
