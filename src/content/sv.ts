import type { Dictionary } from "./types";

const sv: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Redo för ett husdjur. Med dig under hela djurets liv.",
    siteDescription:
      "PetPrep är en 12 veckor lång husdjurssimulator som visar föräldrar om barnet verkligen är redo för ett riktigt husdjur – och som sedan blir en AI-assistent under hela det riktiga djurets liv.",
    slogan: "Redo för ett husdjur. Med dig under hela djurets liv.",
    keywords: [
      "är mitt barn redo för en hund",
      "app som lär barn ansvar för husdjur",
      "virtuell husdjurssimulator",
      "AI-husdjurssimulator",
      "innan man skaffar hund",
      "barn och husdjur",
      "test om man är redo för husdjur",
      "föräldravy",
      "testa en hundras innan köp",
      "passar den här rasen mig",
    ],
  },
  nav: { home: "Start", menu: "Meny", close: "Stäng meny", skip: "Hoppa till innehållet" },
  lang: { label: "Språk", switchTo: "Byt språk" },
  cta: {
    primary: "Börja gratis med en blandras",
    secondary: "Se hur det fungerar",
    earlyAccess: "Få tidig tillgång",
    earlyAccessSubject: "PetPrep – tidig tillgång",
    ios: "Hämta för iPhone",
    android: "Hämta för Android",
    comingSoon: "Kommer till iPhone och Android",
    readMore: "Läs mer",
    contactUs: "Kontakta oss",
  },
  common: {
    planned: "Planerat",
    plannedNote:
      "Den här sidan beskriver det vi bygger härnäst. Det finns inte i appen ännu, och detaljer kan ändras.",
    legalDraft:
      "Den här texten färdigställs tillsammans med våra juridiska rådgivare före den offentliga lanseringen. Kontakta oss om något är oklart.",
    lastUpdated: "Senast uppdaterad",
    breadcrumbHome: "Start",
    screensNote: "Appskärmarna på webbplatsen är förhandsvisningar. Den färdiga appen kan se lite annorlunda ut.",
    perPet: "per djur",
    free: "Gratis",
    forever: "för alltid",
    notFoundTitle: "Den här sidan har slitit sig från kopplet.",
    notFoundText: "Sidan du letar efter finns inte eller har flyttats.",
    notFoundCta: "Tillbaka till startsidan",
  },
  footer: {
    tagline: "Redo för ett husdjur. Med dig under hela djurets liv.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Företag", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Trygghet", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Alla rättigheter förbehållna.",
    dataEu: "Data lagras inom EU.",
    languages: "Fler språk kommer snart.",
    company: "PetPrep är en produkt från",
    cookieSettings: "Cookieinställningar",
    a11yBadge: { title: "Tillgängligt spel", text: "Enklare gester · Skärmläsare · Mindre rörelse" },
  },
  screens: {
    pin: "Barnet loggar in med en sexsiffrig kod från föräldern – ingen e-post, inget lösenord.",
    contract: "Ansvarskontraktet, signerat med fingret. Signaturen väcker djuret till liv.",
    hud: "Barnets startskärm: djurets aktuella tillstånd, fyra behov och skötselknapparna.",
    picker: "Föräldrarna väljer djuret: ras, ursprung (adopterat eller från uppfödare) och ålder vid ankomst.",
    parent: "Föräldravyn: ett trafikljus, Care Score och dagens rutiner för varje barn.",
    report: "Ett barns rapport för 7, 30 eller 84 dagar: rutiner, promenader och missade uppgifter dag för dag.",
    assistant: "När djuret kommer hem: AI-assistenten gör halsbandsdata till ett tydligt förslag.",
    certificate: "Efter 12 veckor: Ansvarsdiplomet med barnets Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Blandras",
      text: "Hela simuleringen med en verklighetstrogen blandras.",
      features: [
        "12 veckors simulering med verkliga konsekvenser",
        "Riktiga promenader, mätta i riktiga steg från mobilen",
        "Föräldravy, trafikljus och Care Score",
        "Tysta timmar och en pausknapp",
        "Fotorealistisk bild av ditt djur och korta videor",
      ],
      cta: "Börja gratis",
    },
    challenge: {
      name: "12-veckorsutmaningen PetPrep",
      badge: "12 veckor + diplom",
      unit: "per djur · 12 veckor",
      text: "För familjer som vill ha hela upplevelsen och ett diplom på slutet.",
      features: [
        "Allt som ingår i Blandras",
        "Krävande raser, till exempel [border collie](breed:border_collie)",
        "Ditt djurs humör som AI-videor",
        "Ansvarsdiplom",
        "Ett pris för syskon som delar på ett djur",
        "Tillgång för båda föräldrarna",
      ],
      cta: "Välj utmaningen",
    },
    note:
      "Köp sker i appen via App Store eller Google Play. Ett andra djur i samma familj är en separat utmaning. Priserna inkluderar moms där det är tillämpligt.",
  },
  earlyAccess: {
    title: "Få tidig tillgång",
    text: "Bli en av de första familjerna som provar PetPrep. Vi mejlar dig när det är klart – inget annat.",
    label: "Din e-postadress",
    placeholder: "du@exempel.se",
    button: "Få tidig tillgång",
    sending: "Skickar …",
    successTitle: "Du står på listan.",
    successText: "Tack! Vi mejlar dig först när PetPrep är klart.",
    invalid: "Ange en giltig e-postadress.",
    error: "Något gick fel. Försök igen om en stund.",
    consent: "Genom att anmäla dig samtycker du till att få mejl om PetPrep. Du kan avregistrera dig när som helst.",
    privacyLink: "Integritetspolicy",
  },
  contactCards: [
    { title: "Familjer", text: "Frågor om appen, ditt konto eller utmaningen.", email: "hello" },
    { title: "Integritet", text: "Tillgång till data, export, radering eller andra integritetsfrågor.", email: "privacy" },
    { title: "Partner", text: "Djuraffärer, djurhem, veterinärer, hundtränare, försäkringsbolag och skolor.", email: "partners" },
    { title: "Investerare", text: "Investerarbrief, pitchdeck och datarum på begäran.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Är ditt barn redo för ett husdjur? Ta reda på det på 12 veckor.",
      description:
        "Innan ett riktigt husdjur flyttar hem tar ditt barn hand om ett verklighetstroget AI-djur i 12 veckor: mat, städning, riktiga promenader. Du ser varje dag om barnet verkligen är redo.",
    },
    hero: {
      eyebrow: "12-veckorsutmaningen PetPrep",
      title: "Redo för ett husdjur. Med dig under hela djurets liv.",
      lead:
        "Innan ett riktigt husdjur flyttar hem tar ditt barn hand om ett verklighetstroget AI-djur i 12 veckor – ger mat, städar upp och går på riktiga promenader. Du ser varje dag om barnet verkligen är redo.",
      trust: ["Blandrasen gratis för alltid", "Ingen reklam, ingen chatt med främlingar", "Barn behöver ingen e-post"],
    },
    phone: {
      petName: "Luna",
      petAge: "Valp · 3 månader",
      live: "LIVE",
      video: "Fotorealistisk AI-video av djuret",
      actions: ["Mata", "Vatten", "Promenad", "Städa"],
    },
    parentCard: { child: "Maja", status: "Allt bra", scoreLabel: "Care Score", progress: "Vecka 3 av 12 · 31 av 36 rutiner i tid" },
    notification: { app: "PetPrep", text: "Ditt djur tittar på matskålen. Frukosttiden slutar kl. 09.00." },
    promoVideo: {
      eyebrow: "PetPrep på en minut",
      title: "Se hur det fungerar.",
      text: "Från att välja djur och signera kontraktet till skola, promenader, pälsvård och diplomet – allt ditt barn gör under 12 veckor och allt du ser i föräldravyn. Curio, vår maskot, säger bara hej; djuret i appen är en verklighetstrogen AI-hund.",
      alt: "Reklamvideo för PetPrep: appskärmar, ett barn som tar hand om en hund, en förälder som följer Care Score.",
      note: "Appen är ännu inte offentligt tillgänglig i App Store och Google Play – anmäl dig för tidig tillgång.",
    },
    promise: {
      quote: "Alla föräldrar har hört ”Jag lovar att ta hand om den.” PetPrep gör löftet till",
      highlight: "bevis",
      text:
        "Att misslyckas i simuleringen är en vinst för familjen: du får veta det innan ett riktigt djur far illa – och innan du binder dig till flera års skötsel och kostnader.",
    },
    how: {
      eyebrow: "Så fungerar det",
      title: "Tre steg från ”snälla” till ”redo”.",
      steps: [
        {
          title: "Du väljer djuret",
          text: "Skapa ett familjekonto, lägg till ditt barn med bara ett smeknamn och välj djuret – ras, adopterat eller från uppfödare, valp eller senior.",
        },
        {
          title: "Barnet skriver under löftet",
          text: "En sexsiffrig kod loggar in ditt barn – ingen e-post, inget lösenord. Barnet signerar Ansvarskontraktet med fingret, och ett helt unikt djur föds.",
        },
        {
          title: "12 veckor av riktig skötsel",
          text: "En riktig vecka motsvarar en månad i djurets liv. På slutet: ett Ansvarsdiplom med Care Score – ett objektivt bevis eller ett ärligt nej.",
        },
      ],
      link: "Så fungerar det i detalj",
    },
    realism: {
      title: "Så nära ett riktigt husdjur som en app kan komma.",
      text: "Mattider, promenader och tillväxt bygger på uppgifter från veterinärorganisationer och kennelklubbar – inte på något som hittats på för ett spel.",
      items: [
        { title: "Riktiga promenader, riktiga steg", text: "Den dagliga promenaden räknar steg från barnets mobil. Ingen promenad alls i dag? Det märks på djuret i morgon." },
        { title: "Djuret växer upp", text: "En valp äter fyra gånger om dagen, sedan tre, sedan två – och får ett nytt foto när den växer." },
        { title: "Djuret beter sig som ett riktigt djur", text: "Valpar måste ut. Uttråkade hundar tuggar på tofflor. Olyckor händer före middagen." },
        { title: "Respekterar skola och sömn", text: "Tysta timmar pausar påminnelserna. En måltid som infaller under skoltid är din uppgift, inte barnets." },
        { title: "Verkliga konsekvenser, varsamt", text: "Försummelse leder till ett veterinärbesök eller till djurhemmet – aldrig skrämmande och alltid med en ny start." },
        { title: "Helt unikt", text: "Varje djur får sin egen päls, sin egen teckning och egna ögon – fotorealistiskt och aldrig likadant två gånger." },
      ],
    },
    parents: {
      eyebrow: "För föräldrar",
      title: "Du ser sanningen, live.",
      text: "Ett tydligt trafikljus för varje barn, en Care Score som bygger på rutiner gjorda i tid och en tidslinje över vem som gjorde vad. Syskon som delar på ett djur får var sin rättvisa poäng.",
      points: [
        { strong: "Tysta timmar och en pausknapp", text: "du har kontrollen." },
        { strong: "Barn loggar in med en kod", text: "ingen e-post, inget efternamn, ingen reklam." },
        { strong: "Båda föräldrarna, alla barn", text: "en familj, en vy." },
      ],
      link: "Allt föräldrar ser",
    },
    adults: {
      eyebrow: "För vuxna",
      title: "Testa rasen innan du tar hem den.",
      text: "Har du bestämt dig för en viss ras? PetPrep är inte bara för barn. Under 12 veckor tar du hand om ett AI-djur av den rasen med dess verkliga dagliga behov – och får veta om den verkligen passar dig innan du köper eller adopterar.",
      points: [
        {
          strong: "Rasens verkliga behov",
          text: "måltider inom tidsfönster, vatten, städning och ett dagligt stegmål som bygger på källbelagda motionsbehov: en vuxen border collie behöver 12 000 steg om dagen, en blandras 6 000.",
        },
        {
          strong: "Träning och valpolyckor",
          text: "ett kort träningspass varje dag och en valp som bara kan hålla sig ungefär en timme per levnadsmånad innan den måste ut – annars blir det en pöl på golvet.",
        },
        {
          strong: "12 veckor visar om det passar ditt liv",
          text: "dina arbetsdagar, din fritid och vädret. Är tanken att det ska bli en familjehund kan du lägga till din partner eller dina barn senare.",
        },
      ],
      how: "Så börjar du: skapa ett konto som förälder, lägg till dig själv som skötarprofil och logga in med den sexsiffriga koden – på samma mobil eller en annan.",
      note: "Tillgängligt i dag: den kostnadsfria blandrashunden och huskatten, samt alla hund- och kattraser i [djurregistret](page:animals) med 12-veckorsutmaningen.",
      link: "Så använder du PetPrep på egen hand",
    },
    after: {
      eyebrow: "När djuret kommer hem",
      title: "När det riktiga djuret flyttar in stannar PetPrep kvar.",
      text: "Tryck på ”Vi har skaffat ett riktigt husdjur” så blir simulatorn en AI-assistent för åren som kommer – som redan känner familjens rytm.",
      features: [
        { title: "Smart halsband", text: "Aktivitet och larm när något inte stämmer." },
        { title: "AI som första kontakt", text: "Svarar snabbt och lämnar sedan över till en riktig veterinär." },
        { title: "Tillväxt och mat", text: "Vikt varje vecka, tillväxtkurva, när det är dags att byta foder." },
        { title: "Pålitliga partner", text: "Veterinärer, hundtränare och försäkringsbolag nära dig – tydligt märkta." },
        { title: "DNA-test", text: "Vilka raser som finns i din blandras – och vad du ska hålla koll på." },
        { title: "Kort till veterinären", text: "Rasblandning och DNA-resultat på ett ställe, redo för veterinären." },
      ],
      link: "Om AI-assistenten",
      planned: "Under utveckling",
    },
    species: {
      title: "Hundar och katter i dag. Fler arter kommer.",
      text: "Byggt för familjer över hela världen, på deras eget språk.",
      chips: [
        { label: "Hund · tillgänglig", active: true, link: "species:dog" },
        { label: "Katt · tillgänglig", active: true, link: "species:cat" },
        { label: "Hund- och kattraser · i utmaningen", link: "page:animals" },
        { label: "Fler arter · planerat", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Priser", title: "Enkla, rättvisa priser." },
    faq: { title: "Frågor som föräldrar ställer", link: "Alla frågor" },
    final: { title: "Redo för ett husdjur?", text: "Ta reda på det på 12 veckor. Börja gratis, på iPhone eller Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Så fungerar PetPrep – en utmaning på 12 veckor som visar om du är redo för ett husdjur",
        description:
          "Så fungerar 12-veckorsutmaningen PetPrep: välja djur, Ansvarskontraktet, daglig skötsel, riktiga promenader, tysta timmar och diplomet.",
      },
      eyebrow: "Så fungerar det",
      title: "Tolv veckor som visar vad ett löfte är värt.",
      lead:
        "Ditt barn tar hand om ett fotorealistiskt AI-djur som beter sig så likt ett riktigt som en app kan. En riktig vecka motsvarar en månad i djurets liv, så på 12 veckor växer djuret upp – och du ser om skötseln håller.",
      blocks: [
        {
          type: "steps",
          heading: "Från första trycket till diplomet",
          items: [
            { title: "Föräldern skapar familjen", text: "Du registrerar dig med din e-postadress (inloggning med Apple och Google kommer). Lägg till varje barn med ett smeknamn och, om du vill, ett födelseår. Mer än så frågar vi inte om ditt barn." },
            { title: "Du väljer djuret", text: "Välj ras (blandrasen är gratis), varifrån djuret kommer – adopterat från ett djurhem eller köpt från en uppfödare – och dess ålder vid ankomst: valp, ung, vuxen eller senior." },
            { title: "Barnet loggar in med en kod", text: "Du får en sexsiffrig kod som gäller i 15 minuter. Barnet skriver in den på sin mobil – ingen e-post och inget lösenord. Borttappad mobil? Logga ut barnet från alla enheter med ett tryck." },
            { title: "Ansvarskontraktet", text: "Barnet signerar ett löfte med fingret. Signaturen är djurets födelse: behoven börjar räknas från det ögonblicket, så inget går förlorat om barnet signerar senare." },
            { title: "Tolv veckors skötsel", text: "Mat inom rätt tidsfönster, färskt vatten, städning och en daglig promenad med riktiga steg. När djuret växer ändras dess behov." },
            { title: "Diplomet", text: "Efter 12 veckor fyller djuret ett år. Barnet får ett Ansvarsdiplom med sin Care Score – eller så lär ni er båda, på ett tryggt sätt, att tiden ännu inte är rätt." },
          ],
        },
        {
          type: "screens",
          heading: "Det här ser ditt barn",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Det här behöver en vuxen blandrashund varje dag",
          intro: "Siffrorna bygger på källor från veterinärer och kennelklubbar. Där källorna bara anger ett intervall väljer PetPrep ett värde och redovisar det öppet.",
          head: ["Behov", "Hur ofta", "Om det glöms bort"],
          rows: [
            ["Mat", "Morgon (6–10) och kväll (17–21), en gång per tidsfönster", "Hungrig efter ungefär 12,5 timmar"],
            ["Vatten", "3 gånger om dagen, minst 3 timmar emellan", "Törstig efter ungefär 10 timmar"],
            ["Promenad", "6 000 riktiga steg (valpar börjar på 2 000)", "Ingen promenad alls → sjuk nästa morgon"],
            ["Städning", "När djuret har gjort en olycka – aldrig under tysta timmar", "Varken mat eller vatten förrän det är städat"],
          ],
          note: "Valpar äter 4, sedan 3, sedan 2 gånger om dagen och kan bara hålla sig ungefär en timme per levnadsmånad. En [border collie](breed:border_collie) behöver 12 000 steg och blir hungrig fortare.",
        },
        {
          type: "cards",
          heading: "Byggt för det verkliga familjelivet",
          columns: 3,
          items: [
            { title: "Tysta timmar", text: "Ställ in skol- och sovtider. Djuret saktar ner, inga påminnelser skickas och inga olyckor händer då." },
            { title: "Måltider under skoltid", text: "Ett mattidsfönster som helt infaller under tysta timmar är förälderns uppgift – det räknas aldrig mot ditt barn." },
            { title: "Pausa när som helst", text: "En knapp pausar spelet, till exempel för ett familjesamtal. Inget blir sämre under pausen." },
            { title: "Varsamma påminnelser", text: "Djuret påminner först barnet lite försiktigt, sedan brådskande. Först om ett behov står på noll i en timme får du ett larm." },
            { title: "Verkliga konsekvenser", text: "Försummelse betyder 12 timmar hos veterinären. Ett helt dygns försummelse betyder att djurhemmet tar djuret – och du kan börja om." },
            { title: "Delade djur", text: "Syskon kan dela på ett djur. Varje handling räknas till barnet som gjorde den, så poängen blir rättvis." },
          ],
        },
        {
          type: "callout",
          title: "Att misslyckas är också ett resultat.",
          text: "Om djuret hamnar på det virtuella djurhemmet har du lärt dig något värdefullt – innan ett riktigt djur fick betala priset. Du kan börja om, även med en lättare ras.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "För föräldrar – PetPreps föräldravy, Care Score och inställningar",
        description:
          "Det här ser föräldrar i PetPrep: ett dagligt trafikljus per barn, Care Score, rutiner, rapporter, aviseringar, tysta timmar, paus och inbyggd integritet.",
      },
      eyebrow: "För föräldrar",
      title: "Objektiva bevis, inte ännu ett löfte.",
      lead:
        "Du behöver inte gissa om promenaderna verkligen blev av. PetPrep mäter skötseln mot tydliga dagliga rutiner och visar dig, barn för barn, hur det går.",
      blocks: [
        {
          type: "cards",
          heading: "Trafikljuset",
          intro: "Varje barn och varje djur får en färg för dagen, enligt familjens lokala tid – alltid med orsaken i ord.",
          columns: 3,
          items: [
            { title: "Grönt – allt bra", text: "Rutinerna sköts som de ska.", tag: "ok" },
            { title: "Gult – behöver uppmärksamhet", text: "Fler än två rutiner har missats i dag.", tag: "warn" },
            { title: "Rött – brådskande", text: "Djuret blev sjukt i dag, ett behov har stått på noll i över en timme eller djuret har hamnat på djurhemmet.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = rutiner gjorda i tid ÷ förväntade rutiner × 100, minus 10 poäng för varje sjukdom. Resultatet ligger alltid mellan 0 och 100.",
            "En rutin är en konkret uppgift: varje mattidsfönster, var och en av de tre vattenpåfyllningarna, att städa upp varje olycka inom två timmar (skola och sömn räknas inte) och att nå dagens promenadmål.",
            "Tid då du har pausat spelet, då djuret var hos veterinären eller före signeringen av kontraktet räknas aldrig mot ditt barn. Tidigare dagar låses, så en poäng kan inte skrivas om i efterhand.",
            "Syskon som delar på ett djur delar rättvist på varje rutin. Bara barnets egna handlingar räknas – om ett barn gör allt får det 100 och det andra 0.",
          ],
        },
        {
          type: "screens",
          heading: "Din vy",
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
            "Tysta timmar för skola och sömn, enligt din lokala tid – även när det blir sommartid eller vintertid.",
            "Pausa spelet för vilket djur som helst med ett bekräftat tryck; barnets skärm låses direkt.",
            "Bjud in den andra föräldern med en engångskod. Ni ser båda varje barn och varje djur.",
            "Logga ut ett barn från alla enheter om en mobil tappas bort; koderna kan bara användas en gång och slutar gälla efter 15 minuter.",
            "Exportera hela familjens data som en fil, eller radera ett barns profil eller hela ditt konto direkt i appen.",
          ],
        },
        {
          type: "list",
          heading: "Inbyggd integritet",
          items: [
            "Barn loggar in med en kod – ingen e-post, inget lösenord, inget efternamn.",
            "Vi sparar ett smeknamn och, om du anger det, ett födelseår. Inget annat om ditt barn.",
            "Aviseringar innehåller aldrig barnets eller djurets namn, eftersom de kan synas på låsskärmen.",
            "Stegen hämtas från Apple Hälsa (iPhone) eller Health Connect (Android) om du tillåter det (bara läsning), och från mobilens rörelsesensor där den finns. PetPrep använder inte GPS och spårar inte platsen.",
            "Ingen reklam, ingen chatt med främlingar, servrar inom EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "När djuret kommer hem – PetPreps AI-assistent för ditt riktiga husdjur",
        description:
          "När familjen skaffar ett riktigt husdjur blir PetPrep en AI-assistent: aktivitet från smart halsband, larm, AI som första kontakt med en riktig veterinär, tillväxt och mat.",
      },
      eyebrow: "När djuret kommer hem",
      title: "Simuleringen tar slut. Omsorgen gör det inte.",
      lead:
        "När familjen tar hem ett riktigt husdjur gör ett tryck PetPrep till en assistent för djurets hela liv – i realtid, utan hälsomätare och redan bekant med familjens rutiner.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Det här kommer assistenten att göra",
          columns: 2,
          items: [
            { title: "Koppling till smart halsband", text: "Anslut populära GPS- och aktivitetsspårare – eller ett PetPrep-halsband – och se aktiviteten i sitt sammanhang." },
            { title: "Larm som förklarar", text: "”Max sprang 2 km i dag, hälften av det vanliga, och åt en större måltid. En extra kvällspromenad hjälper honom att varva ner.” En iakttagelse, en orsak, ett förslag." },
            { title: "AI först, riktig veterinär sedan", text: "Ställ en fråga eller ladda upp ett foto. Assistenten svarar på allmänna frågor, bedömer hur brådskande det är och lämnar över till en riktig veterinär när det behövs – akuta tecken går direkt till en veterinär." },
            { title: "DNA-test för din hund eller katt", text: "Beställ ett DNA-test i appen eller ladda upp resultatet från ett som du redan har gjort. PetPrep visar vilka raser som ingår i blandningen, vad som är typiskt för dem och vilka hälsoproblem som är vanligare hos de raserna – med källor. Rasprocent är ingen diagnos, och ett DNA-test visar inte allergier." },
            { title: "Ett kort till veterinären", text: "Rasblandningen och eventuella direkta DNA-fynd på en sida eller en QR-kod, så att veterinären genast vet vad som finns i en blandras." },
            { title: "Tillväxt och näring", text: "Registrera vikten varje vecka, se tillväxtkurvan och få en påminnelse när det är dags att byta foder." },
          ],
        },
        {
          type: "screens",
          heading: "En förhandsvisning",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principer vi inte kompromissar med",
          items: [
            "AI-assistenten är ingen veterinär och ställer aldrig diagnoser. Varje hälsosvar innehåller ett sätt att nå en riktig veterinär.",
            "Partnererbjudanden (butiker, försäkringsbolag, hundtränare, veterinärer) är alltid märkta, och vi talar om när vi får provision.",
            "Inget delas med en partner utan ditt samtycke.",
            "Barnets data från utmaningen flyttas till assistenten bara om du godkänner det.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Priser – PetPrep är gratis att börja med, 49,99 € för 12-veckorsutmaningen",
        description:
          "Blandrasen är gratis för alltid. 12-veckorsutmaningen PetPrep kostar 49,99 € per djur som engångsköp. Syskon som delar på ett djur betalar ett pris.",
      },
      eyebrow: "Priser",
      title: "Enkla, rättvisa priser.",
      lead: "Börja gratis med en blandras. Köp hela 12-veckorsutmaningen när du är redo – de 12 veckorna börjar räknas när du köper.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Önskningar – saker till ditt djur",
          intro:
            "I appen önskar sig barnet saker till sitt djur; du bestämmer och köper. Barnet ser aldrig något pris. Sakerna påverkar bara utseendet: de ändrar aldrig behoven, Care Score eller diplomet. Finns även för den kostnadsfria blandrashunden och huskatten.",
          head: ["Sak", "Pris"],
          rows: [
            ["Bädd (katt: korg)", "5,99 €"],
            ["Mat- och vattenskålar", "5,99 €"],
            ["Leksak (hund: repleksak eller pipleksak, katt: tygmus eller fjäderspö)", "5,99 € per leksak"],
            ["Godbitar, förpackning med 10", "2,99 €"],
            ["Välkomstpaket: bädd + skålar + leksak", "15,99 € (i stället för 17,97 €)"],
          ],
          note: "Önskningar kommer med nästa appuppdatering och kan köpas så snart sakerna finns i App Store och Google Play. Priserna gäller i Slovenien; butiken visar priset för ditt land.",
        },
        {
          type: "faq",
          heading: "Frågor om priser",
          items: [
            { q: "Är gratisversionen verkligen gratis?", a: "Ja. Blandrasen är gratis för alltid, med hela simuleringen, riktiga promenader och föräldravyn." },
            { q: "Vad ingår i utmaningen?", a: "Krävande raser som [border collie](breed:border_collie), ditt djurs humör som AI-videor, Ansvarsdiplomet på slutet och tillgång för båda föräldrarna." },
            { q: "Betalar syskon två gånger?", a: "Nej. Barn som delar på ett djur betalar ett pris. Ett andra djur i familjen är en separat utmaning." },
            { q: "Hur betalar jag?", a: "I appen, via App Store eller Google Play. Återbetalning sker via App Store eller Google Play." },
            { q: "Vad är Önskningar, och kan mitt barn köpa saker själv?", a: "Ditt barn kan önska sig en bädd, skålar, en leksak eller godbitar till sitt djur – upp till tre öppna önskningar åt gången. Du får en avisering och köper antingen saken eller väljer ”Inte nu”. Barnet ser aldrig priser och kan inte köpa något i barnappen." },
            { q: "Gör köpta saker spelet lättare?", a: "Nej. Sakerna påverkar bara utseendet. De ändrar aldrig behoven, Care Score eller diplomet, och det finns ingen veterinär eller medicin bland Önskningar – aldrig ”betala för att rädda ditt djur”." },
            { q: "Gäller samma sak för vuxna?", a: "Ja. Om du använder PetPrep på egen hand för att testa en ras gäller samma villkor: blandrasen är gratis för alltid och 12-veckorsutmaningen kostar 49,99 € per djur." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Vanliga frågor – det här frågar föräldrar om PetPrep",
        description:
          "Svar om PetPrep: tid per dag, användning som vuxen, integritet och plats, steg, syskon, om barnet misslyckas, språk, arter och riktiga husdjur.",
      },
      eyebrow: "Vanliga frågor",
      title: "Frågor som föräldrar ställer.",
      lead: "Korta, ärliga svar. Saknar du något? Skriv till oss.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Vilken ålder passar PetPrep för?", a: "Appen är gjord för barn i åldern ungefär 7–12 år och fungerar bra upp till 16 år. Vuxna använder den också, för att testa om en viss ras verkligen passar dem innan de köper eller adopterar." },
            { q: "Kan jag använda PetPrep på egen hand, utan barn?", a: "Ja. Skapa ett konto som förälder och lägg till dig själv som skötarprofil – ett smeknamn räcker, lämna födelseåret tomt. Välj ras, skapa en sexsiffrig kod och välj sedan ”I'm a kid” (”Jag är ett barn”) på samma mobil eller en annan och skriv in koden – så blir du skötaren. Är tanken att det ska bli en familjehund kan du senare lägga till din partner eller dina barn så att ni sköter den tillsammans. Priset är detsamma som för familjer." },
            { q: "Hur mycket tid tar det varje dag?", a: "Några minuter för mat, vatten och städning – plus promenaden som en riktig hund ändå skulle behöva." },
            { q: "Spårar appen var mitt barn befinner sig?", a: "Nej. För promenader räknar den bara steg. Om du tillåter det läser den dem från Apple Hälsa (iPhone) eller Health Connect (Android) – bara läsning och bara steg; där det finns använder den också mobilens rörelsesensor. Appen ber om tillstånd på promenadskärmen. GPS används inte." },
            { q: "Behöver mitt barn en e-postadress?", a: "Nej. Du skapar kontot; barnet loggar in med en sexsiffrig kod som du skapar. Vi sparar bara ett smeknamn och, om du vill, ett födelseår." },
            { q: "Vad händer om mitt barn glömmer?", a: "Djuret skickar först försiktiga påminnelser. Om ett behov står kvar på noll blir djuret sjukt och tillbringar 12 timmar hos veterinären. Efter ett helt dygn utan skötsel tar det virtuella djurhemmet hand om det – och du kan börja om." },
            { q: "Kan syskon dela på ett djur?", a: "Ja. Varje barn signerar sitt eget kontrakt, varje handling räknas till den som gjorde den och varje barn får sin egen rättvisa Care Score." },
            { q: "Hur blir det med skola och läggdags?", a: "Ställ in tysta timmar. Djuret saktar ner, inga påminnelser skickas och måltider som helt infaller under tysta timmar sköter du." },
            { q: "Är det läskigt för barn?", a: "Nej. Konsekvenserna är verkliga men varsamma: djuret hamnar hos veterinären eller på djurhemmet, aldrig något otäckt, och det finns alltid en ny start." },
            { q: "Vilka djur finns?", a: "[Hundar](species:dog) och [katter](species:cat) i dag: en kostnadsfri blandrashund och huskatt, och i 12-veckorsutmaningen alla raser i [djurregistret](page:animals), där även rasernas källbelagda behov redovisas. Fler arter är planerade." },
            { q: "Vilka språk finns?", a: "Engelska och slovenska i dag. Fler språk kommer när PetPrep lanseras i nya länder." },
            { q: "Vad händer när vi har skaffat ett riktigt husdjur?", a: "PetPrep kan bli en AI-assistent för ditt riktiga husdjur. Den delen är under utveckling." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partner – samarbeta med PetPrep",
        description:
          "PetPrep samarbetar med djuraffärer, djurhem, veterinärer, hundtränare, försäkringsbolag, halsbandstillverkare och skolor för att hjälpa familjer att skaffa husdjur på ett ansvarsfullt sätt.",
      },
      eyebrow: "Partner",
      title: "Bättre förberedda familjer för alla som bryr sig om djur.",
      lead:
        "Familjer som har gått igenom PetPrep vet vad ett husdjur verkligen kräver. Vi bygger ett partnernätverk som möter dem i rätt ögonblick – tydligt märkt och alltid med familjens samtycke.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Vilka vi samarbetar med",
          columns: 3,
          items: [
            { title: "Djuraffärer", text: "Nå familjer i ögonblicket då de visar att de är redo – till exempel med ett erbjudande på ett startpaket i samband med diplomet." },
            { title: "Djurhem, omplaceringsföreningar och uppfödare", text: "Rekommendera PetPrep före adoption eller köp, så att färre beslut fattas på impuls och färre djur lämnas tillbaka." },
            { title: "Veterinärer", text: "När det riktiga djuret har kommit hem svarar AI-assistenten på de första frågorna och hänvisar ägarna till er, med en sammanfattning av ärendet som bara delas med samtycke." },
            { title: "Hundtränare och hundskolor", text: "Rekommendationer och bokning när en familj går vidare till en riktig hund." },
            { title: "Djurförsäkringsbolag", text: "Erbjudanden anpassade efter rasen när ett riktigt djur registreras – tydligt märkta." },
            { title: "Halsbandstillverkare och IoT-företag", text: "Integration av aktivitetsdata för smartare larm som förklarar." },
          ],
        },
        {
          type: "list",
          heading: "Därför kan partner lita på oss",
          items: [
            "Barn loggar in utan e-post och vi håller deras data till ett minimum, på servrar inom EU.",
            "Bara granskat innehåll når barnets skärm, och det finns ingen reklam.",
            "Varje partnererbjudande är märkt och varje provision redovisas för familjen.",
          ],
        },
        { type: "callout", title: "Låt oss prata.", text: "Villkoren för partnerskap håller på att tas fram. Berätta vilka ni är och vad ni har i tankarna.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investera i PetPrep – från förberedelse inför husdjur till omsorg under djurets hela liv",
        description:
          "PetPrep gör ett barns löfte till bevis innan familjen skaffar husdjur och blir sedan en AI-assistent under djurets hela liv. Före lansering. Investerarbrief på begäran.",
      },
      eyebrow: "Investerare",
      title: "Från en utmaning på 12 veckor till en relation på 10–15 år.",
      lead:
        "PetPrep ger föräldrar ett objektivt bevis på om barnet är redo för ett riktigt husdjur – och stannar sedan kvar hos familjen under djurets hela liv.",
      blocks: [
        {
          type: "cards",
          heading: "Möjligheten",
          columns: 3,
          items: [
            { title: "Problem", text: "Barn lovar att ta hand om ett husdjur; föräldrar har inget neutralt sätt att testa det innan de satsar pengar och flera års skötsel." },
            { title: "Lösning", text: "En realistisk simulering på 12 veckor med en föräldravy i realtid och en objektiv Care Score, som avslutas med ett Ansvarsdiplom." },
            { title: "Expansion", text: "När det riktiga djuret har kommit hem: en AI-assistent för det – halsbandsdata, AI som första kontakt före veterinären, tillväxt och näring, DNA-test, partnertjänster." },
          ],
        },
        {
          type: "table",
          heading: "Affärsmodell",
          head: ["Intäktsström", "Modell", "Status"],
          rows: [
            ["Blandras", "Gratis för alltid (kundanskaffning)", "Beslutat"],
            ["12-veckorsutmaningen PetPrep", "49,99 € per djur, engångsköp", "Beslutat"],
            ["Önskningar – saker till djuret (bara utseende)", "Köp i appen: 5,99 € per sak, godbitar 2,99 € för 10, paket 15,99 €; även i gratisversionen", "Byggt, köp via butikerna kommer snart"],
            ["Partnererbjudanden", "Provision från butiker, försäkringsbolag, veterinärer och hundtränare", "Planerat"],
            ["AI-assistent för det riktiga djuret", "Prenumeration", "Planerat"],
            ["DNA-test för hundar och katter", "Försäljning av test och partnerprovision", "Planerat"],
          ],
        },
        {
          type: "list",
          heading: "Byggt hittills",
          items: [
            "Serverbaserad spelmotor med synkronisering i realtid, testad med simuleringar av hela dygn, dagar då klockan ställs om till sommar- eller vintertid och specialfall i familjekonstellationer.",
            "Familjer med flera föräldrar, flera barn och delade djur, med rättvis poängsättning per barn.",
            "Unika fotorealistiska AI-djur med uppmätta och begränsade AI-kostnader, media lagrade på hyrda servrar i Tyskland (Hetzner, EU).",
            "Djurens behov bygger på uppgivna källor från veterinärer och kennelklubbar, och varje siffra går att spåra till sin källa.",
            "Inbyggd barnsäkerhet: inloggning med PIN utan e-post, minimalt med data, ingen reklam, bara granskade media.",
          ],
        },
        {
          type: "prose",
          heading: "Utvecklingsfas",
          paragraphs: [
            "PetPrep befinner sig före lansering, och en sluten beta är planerad. Den första marknaden är Slovenien och regionen, följd av DACH och Storbritannien; produkten är byggd för att lokaliseras globalt från första dagen.",
            "Grundare: David Tacer, mjukvaruutvecklare och entreprenör (Data Vallis David Tacer s.p., Dravograd, Slovenien). Mer [om oss](page:about).",
          ],
        },
        { type: "callout", title: "Begär investerarbriefen.", text: "Vi delar brief, pitchdeck och datarum på begäran.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakta PetPrep – familjer, integritet, partner, investerare",
        description: "Kontakta PetPrep: frågor från familjer, integritetsärenden, partnerskap och frågor från investerare. Vi svarar på engelska eller slovenska.",
      },
      eyebrow: "Kontakt",
      title: "Vi läser varje meddelande.",
      lead: "Skriv till rätt adress så svarar vi så snart vi kan, på engelska eller slovenska.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Företagsuppgifter" }],
    },
    privacy: {
      navLabel: "Integritet",
      meta: {
        title: "Integritetspolicy – PetPrep",
        description: "Hur PetPrep samlar in, använder och skyddar personuppgifter om föräldrar och barn, och hur du utövar dina rättigheter enligt GDPR.",
      },
      eyebrow: "Juridik",
      title: "Integritetspolicy",
      lead: "Översättning – endast den engelska versionen är bindande. PetPrep är framför allt byggt för barn, så vi samlar in så lite som möjligt och förklarar exakt vad vi gör med det.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Personuppgiftsansvarig",
              paragraphs: [
                "Personuppgiftsansvarig för de personuppgifter som behandlas via appen PetPrep och den här webbplatsen är {company}, {address}; {companyIds}. Kontakt för integritetsfrågor: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Vad vi samlar in",
              items: [
                "Föräldrakonto: namn (det du vill bli kallad i familjen), e-postadress, lösenord (sparas bara som en säker hash), enhetens tidszon och tidpunkten då du godkände villkoren och den här policyn.",
                "Skötarprofil (ett barn eller en vuxen som tar hand om djuret): ett smeknamn på högst 30 tecken och, om du vill, ett födelseår – tomt för en vuxen. Ingen e-post, inget lösenord, inget efternamn och inget födelsedatum.",
                "Enheter: mobilmodellen (till exempel ”iPhone”, aldrig ett namn som användaren har gett mobilen) samt, för aviseringar, en push-token, plattform och appversion.",
                "Skötselaktivitet: handlingar i simuleringen (mat, vatten, städning, promenader), antal steg per dag (eller antal armtag med rullstol i anpassat läge – se avsnitt 3 och 4), poäng och rapporter.",
                "Ansvarskontraktet: barnets signatur med fingret, sparad som en vektorlinje med tidpunkten för signeringen.",
                "Koder: inloggnings- och inbjudningskoder sparas bara som hashvärden och upphör att gälla.",
                "Felrapporter från appen: om appen fryser eller kraschar kan den skicka en kort teknisk rapport till vår server inom EU (feltyp och feltext, plats i koden, app- och OS-version, skärmens namn, roll (förälder eller barn)). Den innehåller inget namn, ingen e-postadress, inget användar-ID och ingen IP-adress, delas inte med någon tredje part och raderas efter 30 dagar.",
                "Listan för tidig tillgång (den här webbplatsen): din e-postadress, sidans språk och tidpunkten då du anmälde dig.",
              ],
            },
            {
              heading: "3. Hälso- och träningsdata (steg, Apple Hälsa och Health Connect)",
              paragraphs: [
                "PetPrep har åtkomst till och samlar in en typ av hälso- och träningsdata: hur många steg skötaren går varje dag (fysisk aktivitet). Vi använder dem bara för en enda funktion – djurets dagliga promenad i simuleringen: barnet går, och stegen räknas som djurets promenad.",
                "Hur vi får tillgång till dem: appen på barnets mobil räknar steg. Om du tillåter det i systemets behörighetsdialog läser den stegen från Apple Hälsa (iPhone) eller Health Connect (Android) – bara läsning och bara steg. Där det finns använder den också mobilens rörelsesensor (Android: behörigheten ”Fysisk aktivitet”; iPhone: ”Rörelse och träning”); utan behörighet för Apple Hälsa eller Health Connect räknar bara rörelsesensorn.",
                "Vad vi samlar in: appen skickar bara dagens totala antal steg till vår server, var de kommer ifrån (Apple Hälsa, Health Connect eller rörelsesensorn) och när de skickades. Vi sparar en dagssumma per skötarprofil – aldrig enskilda rörelser, rutter, plats, puls, sömn, vikt eller andra hälsodata. Vi skriver aldrig något till Apple Hälsa eller Health Connect.",
                "Hur vi använder och delar dem: stegsummorna används bara för att driva promenaden i simuleringen och för att visa den för föräldern (föräldravy och rapporter). Vi använder dem inte för reklam, profilering, hälsobedömningar eller träning av AI-modeller, vi säljer dem inte och vi delar dem inte med tredje part; bara vår driftleverantör (Hetzner, servrar inom EU) lagrar dem för vår räkning. Vår användning av data från Health Connect följer Health Connects behörighetspolicy, inklusive kraven på begränsad användning (Limited Use).",
                "Rättslig grund och lagringstid: att läsa steg är frivilligt och sker bara med den behörighet du ger på enheten; vi behandlar dagssumman för att tillhandahålla tjänsten du har valt (fullgörande av avtal). Stegsummorna ingår i familjens dataexport och raderas tillsammans med skötarprofilen eller ditt konto; de försvinner ur våra krypterade säkerhetskopior inom högst 35 dagar.",
                "Du kan när som helst återkalla behörigheten i enhetens inställningar: iPhone → Inställningar → Hälsa → Dataåtkomst och enheter → PetPrep; Android → Health Connect → Appbehörigheter → PetPrep. Behörigheten för rörelsesensorn kan återkallas i mobilens inställningar för appen PetPrep. Promenaden räknar då inga nya steg.",
              ],
            },
            {
              heading: "4. Anpassat läge (armtag med rullstol)",
              paragraphs: [
                "Anpassat läge är till för barn som använder rullstol: promenaden räknar då armtag med rullstolen i stället för steg. Det kommer till appen med nästa uppdatering; nedan beskriver vi vilka data vi behandlar om en förälder slår på det.",
                "Om en förälder slår på anpassat läge för ett barn sparar vi bara att det är påslaget. Vi frågar inte efter och sparar inte någon orsak, diagnos eller något hälsotillstånd.",
                "Medan det är påslaget läser appen på barnets mobil bara armtag med rullstolen i stället för steg – från Apple Hälsa (registrerade av en Apple Watch), med en separat behörighet för bara läsning. På Android läser appen inte armtag; i stället registrerar en förälder promenadminuterna. Rörelsesensorn används då inte. Bara dagens antal armtag skickas till vår server; vi noterar för den dagen att armtag räknas.",
                "En förälder kan registrera promenadminuter för ett barn i anpassat läge (bara för i dag). Vi sparar datum, antal minuter och vilken förälder som registrerade promenaden.",
                "Eftersom uppgiften om att anpassat läge är påslaget kan avslöja något om ett barns hälsotillstånd behandlar vi den bara med stöd av ditt uttryckliga samtycke (artikel 9.2 a i GDPR), som du som förälder eller vårdnadshavare lämnar för barnets räkning (artikel 8 i GDPR) genom att slå på reglaget. Du kan när som helst stänga av läget; appen räknar då steg igen.",
                "Dessa data (reglaget, dagar som räknats i armtag och registrerade promenader) ingår i familjens dataexport och raderas tillsammans med barnets profil eller ditt konto; de försvinner ur våra krypterade säkerhetskopior inom högst 35 dagar, precis som alla andra data.",
              ],
            },
            {
              heading: "5. Vad vi inte samlar in",
              items: [
                "Ingen plats: PetPrep använder inte GPS.",
                "Inga andra hälsodata från Apple Hälsa eller Health Connect än antalet steg eller armtag med rullstol per dag.",
                "Ingen reklam och inga tredjeparts-SDK:er för reklam eller spårning i appen.",
                "Ingen chatt mellan användare.",
                "Inga reklamcookies på den här webbplatsen. Analyscookies sätts bara om du tillåter dem (se Cookies nedan).",
              ],
            },
            {
              heading: "6. Varför vi behandlar data (ändamål och rättslig grund)",
              items: [
                "För att tillhandahålla tjänsten du har bett om: konton, simuleringen, föräldravyn, rapporter och aviseringar (fullgörande av avtal).",
                "För att hantera köp via App Store eller Google Play (fullgörande av avtal).",
                "För den dagliga promenaden (stegsummor per dag – hälso- och träningsdata, se avsnitt 3): fullgörande av avtal; läsning från Apple Hälsa, Health Connect eller rörelsesensorn bara med den behörighet du ger på enheten.",
                "För anpassat läge (att det är påslaget, armtag med rullstol och registrerade promenader): förälderns uttryckliga samtycke, som lämnas genom att slå på reglaget (artikel 9.2 a och artikel 8 i GDPR – se avsnitt 4).",
                "För att hålla tjänsten säker, till exempel genom att begränsa upprepade inloggningsförsök (berättigat intresse).",
                "För att driva och säkra tjänsten: felrapporter från appen hjälper oss att rätta fel som får appen att frysa eller krascha (berättigat intresse).",
                "För att uppfylla rättsliga skyldigheter, till exempel bokföring av köp (rättslig förpliktelse).",
                "För att mejla dig om lanseringen av PetPrep om du har anmält dig till listan för tidig tillgång (samtycke – du kan avregistrera dig i varje mejl).",
                "För att förstå hur besökare använder den här webbplatsen, med Google Analytics, bara om du tillåter analyscookies (samtycke – du kan när som helst ändra det under Cookieinställningar).",
              ],
            },
            {
              heading: "7. Barn",
              paragraphs: [
                "Bara en förälder eller vårdnadshavare kan skapa ett konto och lägga till ett barn. Föräldern bestämmer vad barnet kan göra och kan när som helst radera barnets profil. Vi ber aldrig ett barn om kontaktuppgifter, visar aldrig reklam och tillåter aldrig kontakt med främlingar.",
                "Kontoinnehavaren kan också skapa en skötarprofil för sig själv eller för en annan vuxen i familjen – till exempel för att testa om en ras passar innan man köper eller adopterar. Samma regler och samma minimala data gäller för en sådan profil; alla skydd som är utformade för barn gäller även den.",
              ],
            },
            {
              heading: "8. AI-genererade bilder och videor",
              paragraphs: [
                "Varje djurs foto och korta videor skapas av en AI-tjänst enbart utifrån en beskrivning av djuret (ras, päls, teckningar och liknande). Beskrivningen innehåller aldrig namn eller någon information om din familj. Färdiga media lagras på hyrda servrar i Tyskland (Hetzner, EU) och visas via kortlivade länkar.",
              ],
            },
            {
              heading: "9. Tjänsteleverantörer",
              items: [
                "Drift: Hetzner Online (servrar inom EU).",
                "AI-generering av bilder och videor: fal.ai (får bara beskrivningen av djuret).",
                "Push-aviseringar: Apple Push Notification service och Firebase Cloud Messaging via Expo; aviseringarna innehåller inga namn.",
                "Köp: Apple App Store och Google Play; hantering av köp via RevenueCat när köpen blir tillgängliga.",
                "Mejl om tidig tillgång: Klaviyo (får bara e-postadressen och språket som du anger på den här webbplatsen).",
                "Cookiesamtycke på webbplatsen: Kockica (sparar ditt val om samtycke).",
                "Webbanalys: Google Analytics 4 från Google Ireland Ltd., bara med ditt samtycke; IP-adresser sparas inte av Google Analytics 4.",
                "Tagghantering på webbplatsen: Google Tag Manager från Google Ireland Ltd.; sätter själv inga cookies, och taggarna den laddar följer ditt samtycke.",
                "Inbäddade videor: YouTube från Google Ireland Ltd. (youtube-nocookie.com), laddas först när du trycker på spela upp och tillåter marknadsföringscookies.",
              ],
            },
            {
              heading: "10. Hur länge vi sparar data",
              paragraphs: [
                "Vi sparar dina data så länge ditt konto finns. När du raderar ett barns profil eller ditt konto i appen raderas data direkt och kan inte återställas; de försvinner automatiskt ur våra krypterade säkerhetskopior inom högst 35 dagar. Uppgifter som vi enligt lag måste spara (till exempel för köp) sparas så länge lagen kräver. Felrapporter från appen raderas automatiskt efter 30 dagar.",
              ],
            },
            {
              heading: "11. Dina rättigheter",
              paragraphs: [
                "Du har rätt att få tillgång till, rätta, exportera och radera dina data, att invända mot och begränsa behandlingen samt att klaga hos en tillsynsmyndighet – i Slovenien informationskommissionären (Informacijski pooblaščenec). I appen kan du exportera all familjens data som en fil (Control → Account → Export my data) och radera ett barns profil eller hela ditt konto. För allt annat, skriv till {privacyEmail}.",
              ],
            },
            {
              heading: "12. Säkerhet",
              paragraphs: [
                "Lösenord och koder sparas som hashar, anslutningar är krypterade, uppdateringar i realtid levereras bara till medlemmar i din familj och AI-media granskas innan de når barnets skärm.",
              ],
            },
            {
              heading: "13. Ändringar",
              paragraphs: ["Vi berättar om viktiga ändringar i appen innan de börjar gälla. Datumet överst visar den senaste versionen."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Nödvändiga cookies håller webbplatsen igång och kommer ihåg ditt val om samtycke. Alla andra cookies sätts bara om du tillåter dem i bannern, per kategori: funktionella (extra funktioner), analys (Google Analytics: vilka sidor som besöks) och marknadsföring (YouTube-videor inbäddade på vissa sidor; vi visar inga annonser på den här webbplatsen). Google Tag Manager sätter själv inga cookies, och varje tagg som den laddar följer ditt val. Du kan när som helst ändra eller återkalla ditt val.",
            "Tabellen nedan skapas automatiskt av samtyckesbannern utifrån vad den hittar på den här webbplatsen, så den visar de cookies vi faktiskt använder.",
          ],
          settings: "Ändra cookieinställningar",
          fallback: "Listan över cookies laddas tillsammans med samtyckesbannern. Om du inte ser den, tillåt skript på den här sidan eller skriv till {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Användarvillkor",
      meta: {
        title: "Användarvillkor – PetPrep",
        description:
          "Villkoren för att använda appen och webbplatsen PetPrep: konton och barnprofiler, 12-veckorsutmaningen och diplomet, köp och återbetalningar, AI-innehåll, anpassat läge, skälig användning, radering och tillämplig lag.",
      },
      eyebrow: "Juridik",
      title: "Användarvillkor",
      lead: "Översättning – endast den engelska versionen är bindande. Reglerna för att använda PetPrep, skrivna för att läsas.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Tjänsten",
              paragraphs: [
                "PetPrep tillhandahålls av {company}, {address}; {companyIds} – samma företag som är personuppgiftsansvarig enligt integritetspolicyn. Dessa villkor gäller för appen PetPrep och webbplatsen petprep.si.",
                "PetPrep är en simulering av djurskötsel. Den hjälper familjer och enskilda personer att ta reda på om de är redo att ta hand om ett riktigt husdjur – barn, och vuxna som vill testa om en ras passar dem innan de köper eller adopterar. Det är ett pedagogiskt verktyg, inte veterinärrådgivning eller annan professionell rådgivning.",
              ],
            },
            {
              heading: "2. Konton, profiler och barn",
              items: [
                "Konton skapas av vuxna: föräldrar, vårdnadshavare eller vuxna som använder PetPrep för egen del. När du registrerar dig godkänner du dessa villkor och integritetspolicyn.",
                "Skötare (barn eller vuxna) tar hand om djuret via en skötarprofil som kontoinnehavaren skapar och som kontoinnehavaren också kan skapa för sig själv. En profil behöver bara ett smeknamn och, om du vill, ett födelseår – mer behöver vi inte veta om ett barn, så ange det inte någonstans i appen.",
                "Ett barn loggar in med en sexsiffrig kod (PIN) som du skapar i din app. Koden är kortlivad och fungerar bara en gång; ge den bara till barnet den är avsedd för.",
                "Som förälder eller vårdnadshavare ansvarar du för hur ditt barn använder PetPrep: om det passar barnet, hur mycket tid barnet lägger på det och om barnet är säkert på promenaderna (till exempel i trafiken). Du kan när som helst stoppa spelet för vilket djur som helst.",
                "Du kan bjuda in ytterligare en förälder till familjen med en inbjudningskod; båda ser all familjens data och båda kan stoppa spelet.",
                "Lämna korrekta uppgifter och skydda ditt lösenord, dina koder och dina enheter.",
              ],
            },
            {
              heading: "3. 12-veckorsutmaningen, Care Score och diplomet",
              items: [
                "Utmaningen pågår i 12 veckor (84 programdagar) och börjar med köpet; varje skötare har sitt eget slutdatum. Tid då spelet väntar på betalning räknas inte in i de 12 veckorna.",
                "Care Score (0–100) visar hur stor andel av de förväntade rutinerna (mat, vatten, städning, promenaden, ett träningspass) som skötaren har gjort själv; varje sjukdom hos djuret sänker den. Tid då spelet är stoppat, då djuret är hos veterinären och tysta timmar räknas aldrig mot skötaren.",
                "Efter 12 veckor registreras en slutpoäng som inte ändras senare; skötsel efter utmaningen påverkar den inte. Med 70 poäng eller mer kan du skapa ett Ansvarsdiplom (PDF) i appen; under 70 får du en rapport om utmaningen.",
                "Om mat, vatten eller renlighet står på 0 % i 24 timmar ”tas djuret till djurhemmet” (spelet är slut). Spelet med det djuret avslutas, det blir inget diplom och du får en rapport om utmaningen.",
                "Care Score och diplomet visar bara hur skötaren tog hand om ett simulerat djur i appen. De är ingen garanti för att ett barn, eller någon annan, är redo för ett riktigt husdjur, ingen professionell bedömning och ingen ersättning för ditt eget omdöme eller råd från en veterinär, uppfödare eller ett djurhem. Beslutet om ett riktigt husdjur är alltid ditt.",
                "Spelreglerna (måltider, promenader och skötsel efter ras och ålder) är förenklade och bygger på offentliga källor. De är inte veterinärråd; fråga en veterinär om ett riktigt djurs hälsa och skötsel.",
              ],
            },
            {
              heading: "4. Kostnadsfria och betalda funktioner, köp och återbetalningar",
              items: [
                "Blandrashunden och huskatten är gratis för alltid och är det sätt på vilket du provar PetPrep; det finns ingen kostnadsfri provperiod för utmaningen. Ett kostnadsfritt djur har inget 12-veckorsprogram och inget diplom, föräldern ser historiken för de senaste 7 dagarna och djuret har en grunduppsättning bilder och videor.",
                "12-veckorsutmaningen PetPrep med en betald ras är ett engångsköp (49,99 € i Slovenien; butiken visar priset för ditt land). Ett köp är en utmaning för ett djur; varje ny utmaning med ett nytt djur är ett nytt köp. Syskon som tar hand om samma djur betalar en gång.",
                "En förälder köper i sin egen app via App Store eller Google Play; det finns inga köp i barnets app. Butiken hanterar betalningen enligt sina egna villkor.",
                "Du kan skapa ett utmaningsdjur innan du köper. Tills utmaningen är betald är spelet pausat: djuret väntar tryggt, dess behov sjunker inte och inget blir sämre. När du köper fortsätter spelet där det stannade.",
                "Återbetalningar hanteras av App Store och Google Play enligt deras egna regler; begär återbetalning i butiken där du köpte. Om butiken återbetalar ett köp innan utmaningen är klar pausas spelet med det djuret igen. Bilder och videor som skapats efter köpet finns kvar.",
                "När spelet är slut (djurhemmet) låser ett köp inte upp djuret; en ny utmaning är ett nytt djur och ett nytt köp.",
                "Önskningar (saker till djuret, när de finns tillgängliga): ett barn kan önska, men bara en förälder kan köpa, i sin egen app. En köpt sak hör till djuret den köptes till och påverkar bara utseendet – den påverkar inte spelet, poängen eller diplomet. När spelet är slut eller djuret raderas förblir köpet förbrukat och återbetalas inte. Om butiken återbetalar köpet tas saken bort (för godbitar: de oanvända godbitarna).",
                "Om du raderar ett djur, ett barn eller kontot medan en köpt utmaning fortfarande pågår förblir köpet förbrukat: det flyttas inte till ett annat djur och radering är ingen återbetalning. Appen varnar dig först och ber dig bekräfta.",
              ],
            },
            {
              heading: "5. AI-genererade bilder och videor",
              items: [
                "Bilder och videor av djuren genereras av artificiell intelligens (AI) enbart utifrån en beskrivning av djuret (ras, färg, päls och så vidare), aldrig utifrån uppgifter om din familj. De är illustrationer av ett simulerat djur och stämmer inte nödvändigtvis helt med något verkligt djur eller någon rasstandard.",
                "Där vi visar dem offentligt, till exempel rasporträtten på den här webbplatsen, är de märkta som AI-genererade.",
                "Ett utseende är inte nödvändigtvis unikt: djur av samma betalda ras och färg kan dela samma bilder och videor, och kostnadsfria djur får ett av rasens gemensamma utseenden. En betald utmaning innehåller fler videor än ett kostnadsfritt djur.",
                "Efter att kontraktet har signerats eller ett köp har gjorts kan det ta några minuter att förbereda bilderna och videorna; under tiden visar appen att djuret håller på att göra sig redo och markerar det som fortfarande förbereds.",
                "Rasfakta i appen och i djurregistret på den här webbplatsen är sammanfattade från de offentliga källor vi anger och är inte granskade av en veterinär.",
              ],
            },
            {
              heading: "6. Steg, hälsodata och anpassat läge",
              items: [
                "Den dagliga promenaden räknar skötarens riktiga steg. Om du tillåter det läser appen dem från Apple Hälsa eller Health Connect, bara läsning (den skriver aldrig något dit), eller från mobilens rörelsesensor. Vilka data vi behandlar beskrivs i integritetspolicyn (avsnitt 3).",
                "Anpassat läge är till för barn som använder rullstol: promenaden räknar då armtag med rullstolen i stället för steg. Du kan använda det om funktionen finns i din version av appen. En förälder slår på det för ett enskilt barn; att slå på det är ditt samtycke och att stänga av det återkallar samtycket (integritetspolicyn, avsnitt 4).",
                "I anpassat läge kan en förälder registrera promenadminuter för barnet, bara för i dag. Du ansvarar för dessa registreringar: registrera bara promenader som verkligen har ägt rum, eftersom de räknas in i Care Score och diplomet.",
                "PetPrep använder inte plats och varnar inte för faror under en promenad; att promenaderna är säkra är ditt ansvar.",
              ],
            },
            {
              heading: "7. Aviseringar",
              paragraphs: [
                "Om du tillåter dem på enheten skickar appen push-aviseringar: påminnelser till skötaren, larm till föräldrar när ett djur saknar mat, vatten eller renlighet, samt besked om sjukdom, att spelet är slut och att utmaningen är avslutad. Aviseringar innehåller aldrig barnets eller djurets namn och skickas inte under tysta timmar. Du kan när som helst återkalla behörigheten i enhetens inställningar; utan aviseringar kan en skötare missa rutiner, vilket påverkar spelet och poängen.",
              ],
            },
            {
              heading: "8. Skälig användning",
              items: [
                "Försök inte fuska med antalet steg eller armtag, registrera promenader som inte har ägt rum, komma åt andra familjers data, dekompilera tjänsten eller störa den.",
                "Ge inte djur stötande eller olämpliga namn, och ange inte personuppgifter om ett barn som appen inte frågar efter.",
                "Vi kan begränsa eller stänga av konton som bryter mot dessa regler eller utsätter barn för risk, och vi kan ta bort ett olämpligt djurnamn.",
              ],
            },
            {
              heading: "9. Immateriella rättigheter",
              paragraphs: [
                "PetPrep, dess logotyp, design, programvara och innehåll tillhör {company}. Du får använda appen, liksom ditt djurs bilder, videor och diplom, för familjens personliga, icke-kommersiella bruk – till exempel för att dela dem med släktingar.",
              ],
            },
            {
              heading: "10. Ansvar",
              paragraphs: [
                "Vi arbetar för att PetPrep ska vara tillgängligt och korrekt, men tjänsten tillhandahålls i befintligt skick; den är också beroende av andras tjänster (appbutikerna, Apple Hälsa, Health Connect, push-aviseringar, AI-tjänsten) som vi inte kontrollerar. I den utsträckning lagen tillåter ansvarar vi inte för indirekt skada eller för beslut om att köpa eller adoptera ett riktigt husdjur. Ingenting i dessa villkor begränsar de rättigheter du har som konsument enligt tvingande lag.",
              ],
            },
            {
              heading: "11. Radera kontot och sluta använda tjänsten",
              paragraphs: [
                "Du kan när som helst radera ett barns profil eller ditt konto i appen. Raderingen sker direkt och är permanent; när den sista föräldern i en familj raderar sitt konto raderas hela familjen. Du kan exportera dina data först (Control → Account → Export my data). Vad som händer med data beskrivs i integritetspolicyn; vad som händer med ett köp beskrivs i avsnitt 4.",
              ],
            },
            {
              heading: "12. Ändringar av dessa villkor",
              paragraphs: [
                "Vi uppdaterar dessa villkor när appen eller lagen ändras. Vi berättar om viktiga ändringar i appen innan de börjar gälla. Datumet överst visar den senaste versionen. Om du inte godtar en ändring kan du när som helst radera ditt konto.",
              ],
            },
            {
              heading: "13. Lag och tvister",
              paragraphs: [
                "Dessa villkor regleras av slovensk lag. Konsumenter kan också åberopa det tvingande skyddet i det land där de bor och använda EU:s plattform för tvistlösning online.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Frågor om dessa villkor: {termsEmail}. Tjänsteleverantör: {company}, {address}; {companyIds}. Integritetsfrågor: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Barnsäkerhet",
      meta: {
        title: "Barnsäkerhet – så skyddar PetPrep barn",
        description:
          "Så skyddar PetPrep barn: konton som föräldrar skapar, inloggning med kod utan e-post, minimalt med data, ingen reklam eller chatt, ingen platsspårning, granskade media.",
      },
      eyebrow: "Trygghet",
      title: "Byggt för barn från första kodraden.",
      lead: "Översättning – endast den engelska versionen är bindande. Barnet är PetPreps huvudanvändare, så säkerhet och integritet är produktregler, inte inställningar.",
      blocks: [
        {
          type: "cards",
          heading: "Våra principer",
          columns: 2,
          items: [
            { title: "Föräldrar skapar varje konto", text: "Barn kan inte registrera sig på egen hand. En förälder lägger till barnet och skapar en inloggningskod för engångsbruk som gäller i 15 minuter." },
            { title: "Ingen e-post eller lösenord för barn", text: "Ett barn loggar in med förälderns kod. Felaktiga, utgångna och redan använda koder får alla samma svar, så ingen kan gissa vilka barn som finns." },
            { title: "Minimalt med data", text: "Ett smeknamn och, om du vill, ett födelseår. Inget efternamn, inget födelsedatum, inga foton av barnet." },
            { title: "Ingen reklam, ingen chatt, inga främlingar", text: "Det finns ingen reklam och inget sätt att kontakta andra användare." },
            { title: "Ingen platsspårning", text: "Promenader räknar bara steg – från Apple Hälsa eller Health Connect (med ditt tillstånd, bara läsning) eller från mobilens rörelsesensor. GPS används inte." },
            { title: "Privata uppdateringar i realtid", text: "Uppdateringar i realtid når bara barnen som tar hand om djuret och föräldrarna i samma familj." },
            { title: "Granskade media", text: "Bara bilder och videor som har tagits fram för PetPrep och kontrollerats av vår server visas, från vår lagring inom EU." },
            { title: "Aviseringar utan namn", text: "Aviseringar innehåller aldrig barnets eller djurets namn, eftersom de kan synas på låsskärmen." },
          ],
        },
        {
          type: "list",
          heading: "Föräldrarna har kontrollen",
          items: [
            "Tysta timmar för skola och sömn, utan aviseringar.",
            "En pausknapp som låser barnets skärm direkt.",
            "Logga ut ett barn från alla enheter på en gång.",
            "Exportera eller radera all data direkt i appen.",
          ],
        },
        { type: "callout", title: "Berätta vad som oroar dig", text: "Om något i PetPrep oroar dig, skriv till oss så svarar vi med förtur.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Tillgänglighet",
      meta: {
        title: "Tillgänglighet – PetPrep för alla barn",
        description:
          "Så anpassar sig PetPrep till barn som har svårt att svepa, använder VoiceOver eller TalkBack eller föredrar mindre rörelse – med samma regler och poäng för alla.",
      },
      eyebrow: "Trygghet",
      title: "Alla barn kan ta hand om sitt djur.",
      lead: "Vissa barn har svårt att svepa, använder skärmläsare eller föredrar mindre rörelse på skärmen. PetPrep anpassar sig efter dem – med samma regler, samma poäng och samma diplom som för alla andra.",
      blocks: [
        {
          type: "cards",
          heading: "I appen",
          columns: 3,
          items: [
            { title: "Enklare gester", text: "I stället för att svepa håller barnet fingret nedtryckt eller trycker på en knapp – i alla svepspel: borstning, fjäderspöet, byte av kattsand och att kasta bollen. En förälder slår på det för varje barn i föräldradelen." },
            { title: "Skärmläsare", text: "När VoiceOver eller TalkBack är på går spelen automatiskt över till att hålla in. Djurets sidhuvud läser upp allt om djuret, och varje steg i skötselspelen är en egen knapp." },
            { title: "Mindre rörelse", text: "När mobilen är inställd på att minska rörelse står pulserande knappar och den gungande Curio stilla." },
          ],
        },
        {
          type: "cards",
          heading: "Kommer med nästa uppdatering av appen",
          items: [
            { title: "Promenader med rullstol", text: "I anpassat läge räknas armtag med rullstolen precis som steg – ett armtag är ett steg. En förälder kan också registrera dagens promenadminuter, så att barnet inte behöver göra något extra. En förälder slår på det för varje barn, och när det stängs av tas markeringen bort ur historiken." },
          ],
        },
        { type: "callout", title: "Samma utmaning för alla", text: "Anpassningar ändrar hur ett barn spelar, aldrig vad som räknas. Poäng, tider och Ansvarsdiplomet fungerar exakt likadant. Vi frågar aldrig varför ett barn behöver en anpassning.", tone: "mint" },
        { type: "callout", title: "Fungerar något inte för ditt barn?", text: "Berätta vad som krånglade så tittar vi på det.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Radera konto",
      meta: {
        title: "Radera ditt PetPrep-konto och dina data",
        description:
          "Så raderar du ditt PetPrep-konto (Data Vallis) i appen eller via e-post, vilka data som raderas, vad som sparas och hur länge.",
      },
      eyebrow: "Trygghet",
      title: "Radera ditt PetPrep-konto",
      lead: "Översättning – endast den engelska versionen är bindande. PetPrep görs av Data Vallis. Du kan när som helst radera ditt konto och familjens data – direkt i appen eller via e-post om du inte längre har appen.",
      blocks: [
        {
          type: "steps",
          heading: "Radera kontot i appen (direkt)",
          items: [
            { title: "Logga in som förälder", text: "Öppna PetPrep, tryck på ”I'm a parent” (”Jag är förälder”) och logga in." },
            { title: "Öppna ditt konto", text: "Gå till Controls → Account. Valfritt: tryck först på ”Export my data” för att behålla en kopia." },
            { title: "Radera", text: "Tryck på ”Delete account”, bekräfta med ditt lösenord (eller din inloggning med Google/Apple) och skriv DELETE, tryck sedan på ”Delete for good”." },
            { title: "Klart", text: "Raderingen sker direkt och kan inte ångras. Alla dina enheter och barnens enheter loggas ut." },
          ],
        },
        {
          type: "prose",
          heading: "Har du inte appen längre? Begär radering via e-post",
          paragraphs: [
            "Skriv till [privacy@petprep.si](mailto:privacy@petprep.si) från e-postadressen till ditt föräldrakonto i PetPrep, med ämnesraden ”Delete my account” (Radera mitt konto). Vi kontrollerar att begäran kommer från kontoinnehavaren, raderar kontot inom högst en månad (oftast inom några dagar) och bekräftar det sedan via e-post.",
            "Om du bara vill radera ett barns profil, logga in som förälder och öppna barnet under Controls → Children → Delete profile.",
          ],
        },
        {
          type: "table",
          heading: "Vad som raderas och vad som sparas",
          head: ["Data", "Vad som händer"],
          rows: [
            ["Ditt föräldrakonto (namn, e-post, lösenord, koppling till inloggning med Google/Apple)", "Raderas direkt"],
            ["Om du är familjens enda förälder: barnens profiler (smeknamn, födelseår), djur, AI-bilder och videor, kontrakt och signaturer, skötsellogg, Care Score, diplom, antal steg, tysta timmar, inloggningskoder", "Raderas direkt"],
            ["Om en annan förälder finns kvar i familjen", "Bara ditt konto raderas; familjen finns kvar hos den andra föräldern"],
            ["Enheter och aviseringstokens", "Loggas ut och raderas direkt"],
            ["Köpuppgifter (produkt, datum, butikens transaktions-ID, ett anonymt köp-ID – inget namn eller e-post)", "Sparas så länge bokförings- och skattelagstiftningen kräver, utan koppling till din familj"],
            ["Uppgifter om AI-kostnader", "Sparas för bokföringen utan någon koppling till dig, dina barn eller dina djur"],
            ["Krypterade säkerhetskopior", "Tas bort automatiskt inom 35 dagar"],
          ],
          note: "Själva köpen hanteras av App Store och Google Play; deras uppgifter sparas av Apple och Google enligt deras egna policyer. En utmaning som har köpts men inte slutförts återbetalas inte när du raderar kontot.",
        },
        { type: "callout", title: "Frågor?", text: "Skriv till privacy@petprep.si. Mer information finns i vår integritetspolicy.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "PetPreps djurregister – arter och raser, med källor",
        description:
          "Hundar, katter och deras raser: vad var och en behöver, vem den passar och hur PetPrep simulerar den. Sök och jämför raser; varje faktauppgift länkar till sin källa.",
      },
      navLabel: "Djur",
      eyebrow: "Djurregister",
      title: "Lär känna djuret innan det flyttar hem.",
      lead:
        "Vad varje art och ras i PetPrep verkligen behöver – från kennelklubbar, kattregister, djurvälfärdsorganisationer och studier, med länk till varje källa. Dessutom reglerna som PetPrep använder för att simulera djuret.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Om PetPrep – företaget, grundaren och hur vi tar fram fakta om djur",
        description:
          "Vem som gör PetPrep: Data Vallis David Tacer s.p. från Dravograd i Slovenien, grundaren David Tacer, vårt uppdrag och hur djurregistret hämtar och kontrollerar sina fakta.",
      },
      navLabel: "Om oss",
      eyebrow: "Om oss",
      title: "Vem som gör PetPrep.",
      lead: "PetPrep görs i Maribor i Slovenien av ett litet mjukvaruföretag. Här berättar vi vilka vi är, varför vi bygger PetPrep och hur vi bestämmer vad appen och djurregistret säger om djur.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Företaget",
          paragraphs: [
            "PetPrep är en produkt från Data Vallis David Tacer s.p., ett företag inom mjukvaruutveckling (enskild firma) med säte i Dravograd i Slovenien. Samma företag driver den här webbplatsen och appen PetPrep och är personuppgiftsansvarigt (se [integritetspolicyn](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Grundaren",
          paragraphs: [
            "PetPrep grundades av David Tacer, mjukvaruutvecklare och entreprenör från Maribor i Slovenien.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Vårt uppdrag",
          paragraphs: [
            "Alla föräldrar har hört ”Jag lovar att ta hand om den.” PetPrep gör det löftet till bevis: i 12 veckor tar ett barn – eller en vuxen som vill ha en viss ras – hand om ett verklighetstroget AI-djur med ett riktigt djurs dagliga behov, och föräldern ser varje dag hur skötseln håller.",
            "Att misslyckas i simuleringen är också ett bra resultat: familjen får veta det innan ett riktigt djur far illa och innan man binder sig till flera års skötsel och kostnader. När ett riktigt husdjur väl flyttar hem vill vi att PetPrep ska vara till nytta under djurets hela liv.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Så byggs djurregistret",
          intro: "[Djurregistret](page:animals) och appen använder samma data. De här reglerna avgör vad registret får säga:",
          items: [
            "Varje faktauppgift anger sin källa och länkar till den. Källorna graderas efter hur stor tyngd de bör ha: A – rasstandarder, referentgranskade artiklar och riktlinjer från veterinärorganisationer; B – rådgivningssidor från djursjukhus, universitet och nationella djurskyddsorganisationer; C – sekundära sammanfattningar (uppslagsverk, pressartiklar), som bara används tillsammans med en A- eller B-källa.",
            "Bara källbelagda fakta visas som fakta. Ett värde som ingen källa stöder publiceras inte. Där källorna inte är överens visas var och en med sitt eget värde.",
            "Spelregler är inte veterinärråd. Där spelet behöver en siffra som källorna inte anger exakt (till exempel ett dagligt stegmål), bestämmer PetPrep den utifrån källorna och visar den bara under ”Så simulerar PetPrep det”, märkt som en spelregel.",
            "Hälsoanteckningar är bara information. De sammanfattar vad källorna säger om en ras och har inte granskats av en veterinär. Fråga en veterinär om ett riktigt djur.",
            "Rasstandarder sammanfattas med egna ord, kopieras aldrig i längre stycken, och en ras kallas aldrig ”hypoallergen”.",
            "Registret skapas från PetPreps forskningsdata, samma data som appen använder. När en källa eller ett värde ändras exporteras registret på nytt, och varje rassida visar datumet för den senaste uppdateringen. Om du hittar ett fel, skriv till hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Frågor om PetPrep?", text: "Skriv till rätt adress på kontaktsidan – familjer, integritet, partner eller investerare.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Möt Curio – PetPreps maskot",
        description:
          "Curio är PetPreps maskot: den nyfikna lilla kuben från vår logotyp och stjärnan i våra korta videor. Vem Curio är, hur den skiljer sig från det verklighetstrogna djuret i appen, bilder och ett mediekit.",
      },
      navLabel: "Möt Curio",
      eyebrow: "Vår maskot",
      title: "Möt Curio.",
      lead: "Curio är den nyfikna lilla kuben från PetPreps logotyp som har fått liv. Den spelar huvudrollen i våra korta videor som djuret som väntar vid dörren på att någon ska hålla sitt löfte. Den är vår maskot – inte djuret du tar hand om i appen.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPreps maskot: en mjuk grafitgrå kub med stora vita ögon, en liten hallonröd nos och ett mintgrönt halsband, som vinkar.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Vem är Curio?",
          paragraphs: [
            "Curio började som symbolen i vår logotyp: en rundad grafitgrå fyrkant med två stora ögon som tittar uppåt till höger och en liten hallonröd nos. På slovenska kallar vi den Radovednež – ”den nyfikna”. I oktober 2026 fick den korta armar, knubbiga ben och ett mintgrönt halsband med en rund bricka och blev en karaktär.",
            "Curio har ingen mun. Allt den känner syns i ögonen: vidöppna när någon viskar ”promenad?”, två sömniga streck när ingen har kommit hem än, glada bågar när skålen är full.",
            "Curio är en ”den” – varken pojke eller flicka, varken hund eller katt. Den står för alla djur som varje dag väntar på att någon ska hålla sitt löfte.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio i korthet",
          columns: 3,
          items: [
            { title: "Namn", text: "Curio på engelska, Radovednež på slovenska." },
            { title: "Gjord av", text: "Mjuk grafit, ett mintgrönt halsband och en hallonröd bricka – PetPreps färger." },
            { title: "Pratar", text: "Aldrig. Bara med ögonen." },
            { title: "Älskar", text: "Promenader, en full skål och barn som kommer tillbaka på dag 15." },
            { title: "Bor", text: "I våra korta videor på [TikTok](https://www.tiktok.com/@petprep.si) och [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Jobb", text: "Att med glimten i ögat påminna familjer om att ett djur behöver omsorg varenda dag." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio är inte djuret i appen",
          intro: "I våra videor spelar Curio ett djur som behöver omsorg, för det gör alla djur. I PetPrep tar barn – och vuxna som testar en ras – hand om något som ligger mycket närmare verkligheten.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, den tecknade maskoten, vinkar mot en ljus bakgrund.",
              label: "Maskot",
              title: "Curio – vår maskot",
              text: "En tecknad figur för våra videor, klistermärken och den här sidan. Den visar vad PetPrep handlar om. Den går inte att adoptera.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Ett verklighetstroget AI-genererat porträtt av en labrador retriever, så som djuren ser ut i appen PetPrep.",
              label: "I appen · AI-bild",
              tone: "mint",
              title: "Ditt djur i PetPrep",
              text: "En verklighetstrogen AI-simulering av en riktig ras – som den här [labrador retrievern](+breed:labrador_retriever) – med ett riktigt djurs dagliga behov: måltider, vatten, promenader räknade i riktiga steg, städning och träning. Se [hur det fungerar](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio i bilder",
          intro: "Curio är en stiliserad 3D-karaktär som har skapats med AI-verktyg utifrån vår egen design. Nya scener dyker upp i våra videor först.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio vinkar mot en mintgrön bakgrund.", caption: "Hej! Den klassiska vinkningen.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio står på en vit hylla och vinkar.", caption: "På hyllan och väntar på någon." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio framifrån, från sidan och bakifrån, med fyra olika ögonuttryck.", caption: "Från alla håll, och hur ögonen visar känslor." },
            { src: "/curio/curio-waving.webp", alt: "Curio mot en transparent bakgrund.", caption: "Frilagd – redo för ditt inlägg (se mediekitet).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediekit",
          intro: "För kreatörer, journalister och partner som skriver om PetPrep. Frågor eller idéer om samarbete: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Ladda ner allt", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, transparent bakgrund", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, kvadratisk, ljus", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, kvadratisk, mintgrön", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Karaktärsblad", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "PetPreps logotyp", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "PetPreps symbol", meta: "SVG" },
          ],
          rulesHeading: "Så använder du Curio",
          rules: [
            "Använd Curio i inlägg, artiklar och videor om PetPrep. För reklam, produkter eller merchandise, fråga oss först.",
            "Visa Curio som den är: grafitgrå kub, vita ögon, hallonröd nos, mintgrönt halsband. Lägg inte till mun, öron, päls eller ögonbryn, och ändra inte färgerna och töj inte ut den.",
            "Curio är PetPreps maskot. Framställ den inte som djuret i appen eller som en riktig hund eller katt.",
            "Använd inte Curio på ett sätt som antyder att PetPrep står bakom en annan produkt, sak eller person.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Frågor om Curio",
          items: [
            { q: "Är Curio en hund eller en katt?", a: "Ingetdera. Curio är en liten kub från vår logotyp. Den spelar ett djur i våra videor, men den tillhör ingen art." },
            { q: "Kan mitt barn ta hand om Curio i appen?", a: "Nej. I appen tar familjen hand om ett verklighetstroget djur av en riktig ras, med samma dagliga behov som det riktiga djuret. Curio finns bara i våra videor och på webbplatsen." },
            { q: "Varför har Curio ingen mun?", a: "För att vår logotyp inte har någon. Curio säger allt med ögonen – och tigger aldrig högt om godbitar." },
            { q: "Var kan jag se nya videor med Curio?", a: "På TikTok och Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Kunskap om djurskötsel – vad hundar och katter får äta, med källor | PetPrep",
        description:
          "Vilka livsmedel som är giftiga, riskabla eller okej för hundar och katter – orsaken, symtomen och vad du ska göra, med länk till varje källa. Från PetPrep för familjer som förbereder sig för ett husdjur.",
      },
      navLabel: "Skötsel",
      eyebrow: "Kunskap om skötsel",
      title: "Vad är säkert för ditt djur?",
      lead:
        "Tydliga, källbelagda svar för familjer: vilka livsmedel som är giftiga, vilka som är riskabla och vilka som går bra som godbit – för hundar och katter, och fler arter kommer. Varje svar länkar till sina källor.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Gratis målarbilder med hundar och katter att skriva ut för barn | PetPrep",
        description:
          "Gratis målarbilder att skriva ut: golden retriever, labrador, border collie, blandrasvalp, kattunge och Curio. PDF i A4 och US Letter, var och en med en riktig faktauppgift om djurskötsel och dess källa.",
      },
      navLabel: "Målarbilder",
      eyebrow: "Målarbilder",
      title: "Gratis målarbilder att skriva ut.",
      lead:
        "Hundar, katter och Curio att färglägga eller rita av – skriv ut en sida eller hela boken. Varje sida har en riktig faktauppgift om djurskötsel från en källa hos veterinärer eller kennelklubbar, att läsa tillsammans.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "För barn som vill ha ett husdjur – målarbilder, Curio och #walkyourpet | PetPrep",
        description:
          "Allt PetPrep har för barn: gratis målarbilder att skriva ut med riktiga fakta om djurskötsel, maskoten Curio och #walkyourpet – för barn och föräldrar som tillsammans förbereder sig för ett husdjur.",
      },
      navLabel: "För barn",
      eyebrow: "För barn",
      title: "För barn som vill ha ett husdjur.",
      lead: "Målarbilder att skriva ut, Curio och #walkyourpet – för barn och föräldrar som tillsammans förbereder sig för ett husdjur.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPreps maskot: en mjuk grafitgrå kub med stora vita ögon, en liten hallonröd nos och ett mintgrönt halsband, som vinkar.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – rörelsen som startade med ett riktigt barn",
        description:
          "”We could go walk your pet.” Ett barn sa det, och nu är det en rörelse: familjer som går ut för att ett djur behöver en promenad. Hur det började, vad det betyder i PetPrep och hur du kan vara med.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Vi hittade inte på den här frasen. Det gjorde ett barn. Nu är den en inbjudan till alla familjer: gå ut, för ett djur behöver sin promenad – ett riktigt djur eller det du övar med i PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Story-kort: ”Overheard at the founder's house.” Ett barn säger ”Lahko bi šli walk your pet” – ”Vi kunde gå och ’walk your pet’” – och rubriken lyder ”#walkyourpet is a thing now.”", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Hur det började",
          paragraphs: [
            "I oktober 2026 hade vår grundares barn en kompis på besök. De funderade på om de skulle gå ut, och kompisen sa, halvt på slovenska och halvt på engelska: ”Lahko bi šli walk your pet” – ”Vi kunde gå och ’walk your pet’.”",
            "Ingen hade bett henne om det. Hon kände till PetPrep, där en hunds promenad bara räknas om man verkligen går ut, och ”walk your pet” hade helt enkelt blivit ett skäl att gå ut. Vi gillade det så mycket att vi behöll det – på engelska, för alla språk.",
            "Ett riktigt samtal. Riktiga barn.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Vad det betyder i PetPrep",
          intro: "I PetPrep är hundens dagliga promenad barnets riktiga steg, som läses från Apple Hälsa eller Health Connect om du tillåter det. Att stanna i soffan räknas inte, så ”walk your pet” betyder alltid att gå ut. Ingen GPS och ingen plats – bara steg.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Var med i rörelsen",
          intro: "Du behöver inte appen för det här. Alla familjer som går ut för ett djurs skull – ett riktigt eller ett att öva med – är en del av det.",
          items: [
            { title: "Gå ut", text: "Ta med hunden på promenad. Eller, om du fortfarande funderar på ett husdjur, gå den promenad du skulle ha gått med ett." },
            { title: "Fånga ögonblicket", text: "Skor vid dörren, ett koppel, stigen, tassar i gräset. Inga ansikten, inga namn." },
            { title: "Dela det", text: "Lägg upp det med #walkyourpet och tagga @petprep.si på Instagram eller TikTok. Med ditt tillstånd kan vi dela de bästa ögonblicken här och på våra profiler." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Dela tryggt",
          intro: "#walkyourpet handlar om barn, så de här reglerna gäller allt vi delar:",
          items: [
            "Föräldrar lägger upp, inte barn. Bara en förälder bestämmer vad som hamnar på nätet.",
            "Inga barnansikten, namn, skolor eller adresser – och aldrig en annan familjs barn.",
            "Vi delar bara vidare med en förälders tillstånd, och vi tar bort ett inlägg när du ber om det.",
            "Citat från barn är alltid äkta. Vi hittar aldrig på eller ”förbättrar” det ett barn har sagt.",
            "Det är en inbjudan, inte en skyldighet. Inga sviter att hålla, ingen press – bara ett bra skäl att gå ut.",
          ],
        },
        {
          type: "callout",
          title: "Det första ögonblicket är vårt. Nästa kan bli ditt.",
          text: "Dela familjens promenad med #walkyourpet och tagga @petprep.si. Frågor eller en berättelse du vill dela: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Frågor",
          items: [
            { q: "Behöver jag PetPrep för att vara med?", a: "Nej. Alla som går ut för ett djurs skull kan använda #walkyourpet. PetPrep är där frasen föddes, och där en övningshunds promenad bara räknas i riktiga steg." },
            { q: "Fungerar det för katter i PetPrep?", a: "Inte som promenad. Katter går inte på promenader, så i PetPrep tillgodoses en katts behov genom lek i stället för steg. Promenader är för hundar." },
            { q: "Varför är frasen på engelska?", a: "För att barnet sa den så – på engelska mitt i en slovensk mening. Barn överallt blandar in engelska, så den är densamma på alla språk." },
            { q: "Kommer ni att lägga upp bilder på mitt barn?", a: "Bara det du själv delar och låter oss dela vidare, och aldrig ett barns ansikte eller namn. Hör av dig till hello@petprep.si så tar vi bort det." },
          ],
        },
      ],
    },
  },
};

export default sv;
