import type { Dictionary } from "./types";

const hr: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Spremni za ljubimca. Uz njega cijeli život.",
    siteDescription:
      "PetPrep je 12-tjedni simulator kućnog ljubimca koji roditeljima pokazuje je li njihovo dijete doista spremno za pravog ljubimca – a zatim postaje AI asistent za cijeli život prave životinje.",
    slogan: "Spremni za ljubimca. Uz njega cijeli život.",
    keywords: [
      "je li moje dijete spremno za psa",
      "aplikacija koja djecu uči odgovornosti za ljubimca",
      "simulator virtualnog ljubimca",
      "AI simulator kućnog ljubimca",
      "prije nabave psa",
      "djeca i kućni ljubimci",
      "test spremnosti za ljubimca",
      "roditeljska nadzorna ploča",
      "isprobaj pasminu psa prije kupnje",
      "je li ova pasmina za mene",
    ],
  },
  nav: { home: "Početna", menu: "Izbornik", close: "Zatvori izbornik", skip: "Preskoči na sadržaj" },
  lang: { label: "Jezik", switchTo: "Promijeni jezik" },
  cta: {
    primary: "Počni besplatno s mješancem",
    secondary: "Pogledaj kako funkcionira",
    earlyAccess: "Prijavi se za rani pristup",
    earlyAccessSubject: "PetPrep – rani pristup",
    ios: "Preuzmi za iPhone",
    android: "Preuzmi za Android",
    comingSoon: "Uskoro za iPhone i Android",
    readMore: "Saznaj više",
    contactUs: "Javi nam se",
  },
  common: {
    planned: "U planu",
    plannedNote:
      "Ova stranica opisuje ono što gradimo sljedeće. U aplikaciji to još nije dostupno, a pojedinosti se mogu promijeniti.",
    legalDraft:
      "Ovaj tekst prije javnog lansiranja dovršavamo s pravnim savjetnicima. Ako ti nešto nije jasno, javi nam se.",
    lastUpdated: "Posljednje ažuriranje",
    breadcrumbHome: "Početna",
    screensNote: "Zasloni na ovoj stranici služe kao pregled proizvoda; konačna aplikacija može izgledati malo drukčije.",
    perPet: "po ljubimcu",
    free: "Besplatno",
    forever: "zauvijek",
    notFoundTitle: "Ova se stranica otrgnula s povodca.",
    notFoundText: "Stranica koju tražiš ne postoji ili je premještena.",
    notFoundCta: "Natrag na početnu stranicu",
  },
  footer: {
    tagline: "Spremni za ljubimca. Uz njega cijeli život.",
    groups: [
      { title: "Proizvod", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Tvrtka", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Povjerenje", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Sva prava pridržana.",
    dataEu: "Podaci se pohranjuju u EU-u.",
    languages: "Uskoro još jezika.",
    company: "Operator:",
    cookieSettings: "Postavke kolačića",
    a11yBadge: { title: "Pristupačna igra", text: "Lakše geste · Čitači zaslona · Manje pokreta" },
  },
  screens: {
    pin: "Dijete se prijavljuje šesteroznamenkastim kodom koji dobije od roditelja – bez e-pošte i lozinke.",
    contract: "Ugovor o odgovornosti, potpisan prstom. Potpisom ljubimac oživljava.",
    hud: "Djetetov početni zaslon: stanje ljubimca uživo, četiri potrebe i gumbi za brigu.",
    picker: "Roditelji biraju ljubimca: pasminu, podrijetlo (udomljen ili od uzgajivača) i dob pri dolasku.",
    parent: "Roditeljska nadzorna ploča: semafor, Care Score i današnje rutine za svako dijete.",
    report: "Izvješće o djetetu za 7, 30 ili 84 dana: rutine, šetnje i propušteni zadaci, dan po dan.",
    assistant: "Kad stigne kući: AI asistent pretvara podatke s ogrlice u jedan jasan prijedlog.",
    certificate: "Nakon 12 tjedana: Certifikat o odgovornosti s djetetovim Care Scoreom.",
  },
  pricingPlans: {
    free: {
      name: "Mješanac",
      text: "Cijela simulacija s mješancem koji izgleda kao pravi.",
      features: [
        "Svakodnevna briga sa stvarnim posljedicama",
        "Prave šetnje, izmjerene stvarnim koracima s mobitela",
        "Roditeljska nadzorna ploča, semafor i Care Score",
        "Tihi sati i gumb za pauzu",
        "Fotorealistična slika tvog ljubimca i kratki videozapisi",
        "12-tjedni izazov možeš dodati kasnije, s istim ljubimcem",
      ],
      cta: "Počni besplatno",
    },
    challenge: {
      name: "12-tjedni izazov PetPrep",
      badge: "12 tjedana + certifikat",
      unit: "po ljubimcu · 12 tjedana",
      text: "Za obitelji koje žele cjelovito iskustvo i certifikat na kraju.",
      features: [
        "Sve što nudi Mješanac",
        "Bilo koja pasmina, poput [border collieja](breed:border_collie), ili mješanac i domaća mačka",
        "Raspoloženja tvog ljubimca u AI videozapisima",
        "Certifikat o odgovornosti",
        "Jedna cijena kad braća i sestre dijele ljubimca",
        "Pristup za oba roditelja",
      ],
      cta: "Odaberi izazov",
    },
    note:
      "Kupuješ u aplikaciji, putem trgovine App Store ili Google Play. Drugi ljubimac u istoj obitelji zaseban je izazov. Cijene uključuju PDV gdje se primjenjuje.",
  },
  earlyAccess: {
    title: "Prijavi se za rani pristup",
    text: "Budi među prvim obiteljima koje će isprobati PetPrep. Javit ćemo ti se e-poštom kad bude spreman – i ništa više.",
    label: "Tvoja adresa e-pošte",
    placeholder: "ti@primjer.hr",
    button: "Prijavi se za rani pristup",
    sending: "Šaljem…",
    successTitle: "Na popisu si.",
    successText: "Hvala! Čim PetPrep bude spreman, javit ćemo ti se među prvima.",
    invalid: "Upiši valjanu adresu e-pošte.",
    error: "Nešto je pošlo po zlu. Pokušaj ponovno za trenutak.",
    consent: "Prijavom pristaješ primati e-poruke o PetPrepu. Odjaviti se možeš u svakom trenutku.",
    privacyLink: "Pravila privatnosti",
  },
  contactCards: [
    { title: "Obitelji", text: "Pitanja o aplikaciji, tvom računu ili izazovu.", email: "hello" },
    { title: "Privatnost", text: "Uvid u podatke, izvoz, brisanje ili bilo koje pitanje o privatnosti.", email: "privacy" },
    { title: "Partneri", text: "Trgovine za kućne ljubimce, skloništa, veterinari, treneri, osiguravatelji i škole.", email: "partners" },
    { title: "Investitori", text: "Sažetak za investitore, prezentacija i podatkovna soba na zahtjev.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Je li tvoje dijete spremno za ljubimca? Saznaj za 12 tjedana.",
      description:
        "Prije nego što pravi ljubimac stigne kući, tvoje se dijete 12 tjedana brine o AI ljubimcu kao iz stvarnog života: obroci, čišćenje, prave šetnje. Svaki dan vidiš je li doista spremno.",
    },
    hero: {
      eyebrow: "12-tjedni izazov PetPrep",
      title: "Spremni za ljubimca. Uz njega cijeli život.",
      lead:
        "Prije nego što pravi ljubimac stigne kući, tvoje se dijete 12 tjedana brine o AI ljubimcu koji izgleda kao pravi – hrani ga, čisti za njim i ide s njim u prave šetnje. Svaki dan vidiš je li doista spremno.",
      trust: ["Mješanac zauvijek besplatan", "Bez oglasa, bez dopisivanja s nepoznatima", "Djeci ne treba e-pošta"],
    },
    phone: {
      petName: "Luna",
      petAge: "Štene · 3 mjeseca",
      live: "UŽIVO",
      video: "Fotorealističan videozapis AI ljubimca",
      actions: ["Nahrani", "Napoji", "Prošetaj", "Očisti"],
    },
    parentCard: { child: "Maja", status: "Sve je u redu", scoreLabel: "Care Score", progress: "3. tjedan od 12 · 31 od 36 rutina na vrijeme" },
    notification: { app: "PetPrep", text: "Tvoj ljubimac gleda u svoju zdjelicu. Vrijeme za doručak završava u 9:00." },
    promoVideo: {
      eyebrow: "PetPrep u jednoj minuti",
      title: "Pogledaj kako funkcionira.",
      text: "Od odabira ljubimca i potpisivanja ugovora do škole, šetnji, njege i certifikata – sve što tvoje dijete radi 12 tjedana i sve što vidiš na nadzornoj ploči. Curio, naša maskota, samo te pozdravlja; ljubimac u aplikaciji je AI pas koji izgleda kao pravi.",
      alt: "Promotivni videozapis PetPrepa: zasloni aplikacije, dijete koje se brine o psu, roditelj koji prati Care Score.",
      note: "Aplikacija još nije javno dostupna u trgovinama App Store i Google Play – prijavi se za rani pristup.",
    },
    promise: {
      quote: "Svaka obitelj čuje „Obećavam da ću se brinuti o njemu.“ PetPrep pretvara obećanje u",
      highlight: "dokaz",
      text:
        "Neuspjeh u simulaciji uspjeh je za tvoju obitelj: saznaš na vrijeme, prije nego što prava životinja pati – i prije nego što se obvežeš na godine brige i troškova.",
    },
    how: {
      eyebrow: "Kako funkcionira",
      title: "Tri koraka od „molim te“ do „spreman sam“.",
      steps: [
        {
          title: "Ti biraš ljubimca",
          text: "Otvori obiteljski račun, dodaj dijete samo pod nadimkom i odaberi ljubimca – pasminu, udomljen ili od uzgajivača, štene ili senior.",
        },
        {
          title: "Dijete potpisuje obećanje",
          text: "Šesteroznamenkasti kod prijavljuje dijete – bez e-pošte, bez lozinke. Prstom potpisuje Ugovor o odgovornosti i rađa se njegov jedinstveni ljubimac.",
        },
        {
          title: "12 tjedana prave brige",
          text: "Jedan stvarni tjedan jedan je mjesec ljubimčeva života. Na kraju: Certifikat o odgovornosti s Care Scoreom – objektivan dokaz ili iskreno „ne“.",
        },
      ],
      link: "Detaljno o tome kako funkcionira",
    },
    realism: {
      title: "Toliko blizu pravog ljubimca koliko aplikacija može biti.",
      text: "Termini hranjenja, šetnje i rast temelje se na izvorima poput veterinarskih udruženja i kinoloških saveza – ništa nije izmišljeno samo za igru.",
      items: [
        { title: "Prave šetnje, pravi koraci", text: "Dnevna šetnja broji korake s djetetova mobitela. Danas nije bilo nikakve šetnje? Ljubimac će to sutra osjetiti." },
        { title: "Raste", text: "Štene jede četiri puta na dan, zatim tri, pa dva – i kako raste, dobiva novu fotografiju." },
        { title: "Ponaša se kao pravi", text: "Štenci moraju van. Psi kojima je dosadno grizu papuče. Nered stiže prije večere." },
        { title: "Poštuje školu i san", text: "Tihi sati pauziraju podsjetnike. Obrok koji pada u vrijeme škole tvoj je zadatak, a ne djetetov." },
        { title: "Stvarne posljedice, nježno", text: "Zanemarivanje znači odlazak veterinaru ili u sklonište – nikad zastrašujuće, uvijek s novim početkom." },
        { title: "Jedinstven", text: "Svaki ljubimac dobiva vlastitu dlaku, šare i oči – fotorealistično i nikad dvaput isto." },
      ],
    },
    parents: {
      eyebrow: "Za roditelje",
      title: "Istinu vidiš uživo.",
      text: "Jasan semafor za svako dijete, Care Score izračunat iz rutina obavljenih na vrijeme i vremenska crta na kojoj se vidi tko je što napravio. Kad braća i sestre dijele ljubimca, svako dijete dobiva svoju pravednu ocjenu.",
      points: [
        { strong: "Tihi sati i gumb za pauzu", text: "sve ostaje pod tvojim nadzorom." },
        { strong: "Djeca se prijavljuju kodom", text: "bez e-pošte, bez prezimena, bez oglasa." },
        { strong: "Oba roditelja, sva djeca", text: "jedna obitelj, jedan pregled." },
      ],
      link: "Sve što roditelji vide",
    },
    adults: {
      eyebrow: "Za odrasle",
      title: "Isprobaj pasminu prije nego što je dovedeš kući.",
      text: "Zapela ti je za oko određena pasmina? PetPrep nije samo za djecu. Dvanaest tjedana brineš se o AI ljubimcu te pasmine s njegovim stvarnim dnevnim potrebama – i saznaš je li doista za tebe, prije kupnje ili udomljavanja.",
      points: [
        {
          strong: "Stvarne potrebe pasmine",
          text: "obroci u vremenskim okvirima, voda, čišćenje i dnevni cilj koraka prema potrebi pasmine za kretanjem, uz navedene izvore: odraslom border collieju treba 12 000 koraka na dan, mješancu 6 000.",
        },
        {
          strong: "Dresura i nezgode šteneta",
          text: "svaki dan kratka vježba dresure i štene koje može izdržati otprilike samo sat vremena po mjesecu starosti prije nego što mora van – inače slijedi lokvica na podu.",
        },
        {
          strong: "12 tjedana pokažu uklapa li se u tvoj život",
          text: "tvoje radne dane, slobodno vrijeme i vremenske prilike. Budući da će to biti obiteljski pas, partnera ili djecu možeš dodati i kasnije.",
        },
      ],
      how: "Kako početi: otvori račun kao roditelj, dodaj sebe kao profil njegovatelja i prijavi se šesteroznamenkastim kodom – na istom ili na drugom mobitelu.",
      note: "Već danas dostupno: besplatni mješanac i domaća mačka te 12-tjedni izazov s jednim od njih ili sa svakom pasminom pasa i mačaka iz [enciklopedije životinja](page:animals).",
      link: "Kako PetPrep koristiti za sebe",
    },
    after: {
      eyebrow: "Kad stigne kući",
      title: "Kad stigne pravi ljubimac, PetPrep ostaje.",
      text: "Dodirni „Dobili smo pravog ljubimca“ i simulator postaje AI asistent za godine koje dolaze – a već poznaje ritam tvoje obitelji.",
      features: [
        { title: "Pametna ogrlica", text: "Aktivnost i upozorenja kad nešto nije u redu." },
        { title: "AI prvi kontakt", text: "Brzo odgovara, a zatim te upućuje pravom veterinaru." },
        { title: "Rast i hrana", text: "Tjedna težina, krivulja rasta, kada promijeniti hranu." },
        { title: "Pouzdani partneri", text: "Veterinari, treneri i osiguravatelji u tvojoj blizini – jasno označeni." },
        { title: "DNK test", text: "Koje su pasmine u tvom mješancu – i na što treba paziti." },
        { title: "Kartica za veterinara", text: "Pasminska mješavina i nalazi DNK testa na jednom mjestu, spremni za veterinara." },
      ],
      link: "O AI asistentu",
      planned: "U razvoju",
    },
    species: {
      title: "Danas psi i mačke. Uskoro i druge vrste.",
      text: "Napravljeno za obitelji diljem svijeta, na njihovu jeziku.",
      chips: [
        { label: "Pas · dostupno", active: true, link: "species:dog" },
        { label: "Mačka · dostupno", active: true, link: "species:cat" },
        { label: "Pasmine pasa i mačaka · u izazovu", link: "page:animals" },
        { label: "Druge vrste · u planu", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Cijene", title: "Jednostavne, poštene cijene." },
    faq: { title: "Pitanja koja roditelji postavljaju", link: "Sva pitanja" },
    final: { title: "Spremni za ljubimca?", text: "Saznaj za 12 tjedana. Počni besplatno, na iPhoneu ili Androidu." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Kako PetPrep funkcionira – 12-tjedni izazov spremnosti za ljubimca",
        description:
          "Kako funkcionira 12-tjedni izazov PetPrep: odabir ljubimca, Ugovor o odgovornosti, svakodnevna briga, prave šetnje, tihi sati i certifikat.",
      },
      eyebrow: "Kako funkcionira",
      title: "Dvanaest tjedana koji pokažu koliko vrijedi obećanje.",
      lead:
        "Tvoje se dijete brine o fotorealističnom AI ljubimcu koji se ponaša kao pravi, koliko god to aplikacija može. Jedan stvarni tjedan odgovara jednom mjesecu ljubimčeva života, pa za 12 tjedana ljubimac odraste – a ti vidiš izdrži li briga.",
      blocks: [
        {
          type: "steps",
          heading: "Od prvog dodira do certifikata",
          items: [
            { title: "Roditelj stvara obitelj", text: "Registriraš se adresom e-pošte (prijava putem Applea i Googlea stiže uskoro). Svako dijete dodaš pod nadimkom i, po želji, s godinom rođenja. To je sve što pitamo o tvom djetetu." },
            { title: "Ti biraš ljubimca", text: "Odaberi pasminu (mješanac je besplatan), podrijetlo ljubimca – udomljen iz skloništa ili kupljen od uzgajivača – i dob pri dolasku: štene, mlad, odrastao ili senior." },
            { title: "Dijete se prijavljuje kodom", text: "Dobiješ šesteroznamenkasti kod koji vrijedi 15 minuta. Dijete ga upiše na svom mobitelu – bez e-pošte i bez lozinke. Izgubljen mobitel? Jednim dodirom odjavi dijete sa svih uređaja." },
            { title: "Ugovor o odgovornosti", text: "Dijete prstom potpisuje obećanje. Potpis je ljubimčevo rođenje: potrebe se počinju računati od tog trenutka, pa se ništa ne gubi ako potpiše kasnije." },
            { title: "Dvanaest tjedana brige", text: "Hranjenje u pravim vremenskim okvirima, svježa voda, čišćenje i dnevna šetnja s pravim koracima. Kako ljubimac raste, mijenjaju se i njegove potrebe." },
            { title: "Certifikat", text: "Nakon 12 tjedana ljubimac navrši godinu dana. Dijete dobiva Certifikat o odgovornosti sa svojim Care Scoreom – ili oboje na siguran način saznate da sada nije pravo vrijeme." },
          ],
        },
        {
          type: "screens",
          heading: "Što tvoje dijete vidi",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Što odraslom psu mješancu treba svaki dan",
          intro: "Brojke dolaze iz veterinarskih i kinoloških izvora; gdje izvori navode samo raspon, PetPrep sam određuje vrijednost i to jasno navodi.",
          head: ["Potreba", "Koliko često", "Ako se zaboravi"],
          rows: [
            ["Hrana", "Ujutro (6–10 h) i navečer (17–21 h), jednom u svakom okviru", "Gladan nakon otprilike 12,5 sata"],
            ["Voda", "3 puta na dan, s razmakom od najmanje 3 sata", "Žedan nakon otprilike 10 sati"],
            ["Šetnja", "6 000 pravih koraka (štenci počinju s 2 000)", "Bez ikakve šetnje → sljedeće jutro bolestan"],
            ["Čišćenje", "Kad ljubimac napravi nered – nikad tijekom tihih sati", "Nema hrane ni vode dok se ne počisti"],
          ],
          note: "Štenci jedu 4, zatim 3, pa 2 puta na dan i mogu izdržati otprilike samo jedan sat po mjesecu starosti. [Border collieju](breed:border_collie) treba 12 000 koraka i brže ogladni.",
        },
        {
          type: "cards",
          heading: "Prilagođeno stvarnom obiteljskom životu",
          columns: 3,
          items: [
            { title: "Tihi sati", text: "Postavi vrijeme škole i spavanja. Ljubimac tada usporava, podsjetnici se ne šalju i nered se nikad ne događa." },
            { title: "Obroci tijekom škole", text: "Vremenski okvir hranjenja koji u cijelosti pada u tihe sate zadatak je roditelja – nikad ne ide na štetu djeteta." },
            { title: "Pauza u svakom trenutku", text: "Jedan gumb pauzira igru, primjerice za obiteljski razgovor. Dok traje pauza, ništa se ne pogoršava." },
            { title: "Nježni podsjetnici", text: "Ljubimac najprije blago podsjeti dijete, a zatim hitno. Tek ako neka potreba sat vremena ostane na nuli, ti dobivaš upozorenje." },
            { title: "Stvarne posljedice", text: "Zanemarivanje znači 12 sati kod veterinara. Cijeli dan zanemarivanja znači da ljubimca preuzima sklonište – a ti možeš početi ispočetka." },
            { title: "Zajednički ljubimci", text: "Braća i sestre mogu dijeliti jednog ljubimca. Svaka se radnja pripisuje djetetu koje ju je obavilo, pa ocjena ostaje pravedna." },
          ],
        },
        {
          type: "callout",
          title: "I neuspjeh je rezultat.",
          text: "Ako ljubimac završi u virtualnom skloništu, naučili ste nešto dragocjeno – prije nego što je cijenu platila prava životinja. Možete početi ispočetka, i s lakšom pasminom.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Za roditelje – nadzorna ploča PetPrepa, Care Score i roditeljska kontrola",
        description:
          "Što roditelji vide u PetPrepu: dnevni semafor za svako dijete, Care Score, rutine, izvješća, obavijesti, tihi sati, pauza i privatnost od samog početka.",
      },
      eyebrow: "Za roditelje",
      title: "Objektivan dokaz, a ne još jedno obećanje.",
      lead:
        "Nećeš morati nagađati jesu li šetnje stvarno obavljene. PetPrep mjeri brigu prema jasnim dnevnim rutinama i pokazuje ti, dijete po dijete, kako ide.",
      blocks: [
        {
          type: "cards",
          heading: "Semafor",
          intro: "Svako dijete i svaki ljubimac dobivaju boju za današnji dan, prema lokalnom vremenu tvoje obitelji – uvijek s razlogom objašnjenim riječima.",
          columns: 3,
          items: [
            { title: "Zeleno – sve je u redu", text: "Rutine se obavljaju kako treba.", tag: "ok" },
            { title: "Žuto – treba pozornost", text: "Danas je propušteno više od dvije rutine.", tag: "warn" },
            { title: "Crveno – hitno", text: "Ljubimac se danas razbolio, neka je potreba na nuli dulje od sat vremena ili je ljubimac završio u skloništu.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = rutine obavljene na vrijeme ÷ očekivane rutine × 100, minus 10 bodova za svaku bolest, u rasponu od 0 do 100.",
            "Rutina je jedan konkretan zadatak: svaki okvir hranjenja, svako od triju dolijevanja vode, čišćenje svakog nereda u roku od dva sata (škola i spavanje se ne računaju) i postizanje dnevnog cilja šetnje.",
            "Vrijeme dok je igra bila pauzirana, dok je ljubimac bio kod veterinara ili prije potpisivanja ugovora nikad ne ide na štetu djeteta. Prošli su dani zaključani, pa se ocjena kasnije ne može prepraviti.",
            "Braća i sestre koji dijele ljubimca pravedno dijele svaku rutinu. Računaju se samo djetetove vlastite radnje – ako jedno dijete radi sve, dobiva 100, a drugo 0.",
          ],
        },
        {
          type: "screens",
          heading: "Tvoj pregled",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Sve ostaje pod tvojim nadzorom",
          items: [
            "Tihi sati za školu i spavanje, po tvom lokalnom vremenu – i kod prelaska na ljetno ili zimsko vrijeme.",
            "Pauziraj igru za bilo kojeg ljubimca jednim potvrđenim dodirom; djetetov se zaslon odmah zaključava.",
            "Pozovi drugog roditelja jednokratnim kodom; oboje vidite svako dijete i svakog ljubimca.",
            "Odjavi dijete sa svih uređaja ako se mobitel izgubi; kodovi su jednokratni i istječu nakon 15 minuta.",
            "Izvezi sve podatke svoje obitelji u datoteku ili odmah izbriši djetetov profil ili cijeli račun izravno iz aplikacije.",
          ],
        },
        {
          type: "list",
          heading: "Privatnost od samog početka",
          items: [
            "Djeca se prijavljuju kodom – bez e-pošte, bez lozinke, bez prezimena.",
            "Pohranjujemo nadimak i, ako je dodaš, godinu rođenja. Ništa drugo o tvom djetetu.",
            "Obavijesti nikad ne sadrže ime tvog djeteta jer se mogu pojaviti na zaključanom zaslonu; u naslovu može biti ime ljubimca, ako ga ima.",
            "Koraci dolaze iz aplikacije Apple Health (iPhone) ili Health Connect (Android) ako to dopustiš (samo čitanje) te iz senzora pokreta na mobitelu, gdje je dostupan. PetPrep ne koristi GPS i ne prati lokaciju.",
            "Bez oglasa, bez dopisivanja s nepoznatima, poslužitelji u EU-u.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Kad stigne kući – AI asistent PetPrep za tvog pravog ljubimca",
        description:
          "Kad tvoja obitelj dobije pravog ljubimca, PetPrep postaje AI asistent: aktivnost s pametne ogrlice, upozorenja, AI prvi kontakt s pravim veterinarom, rast i hrana.",
      },
      eyebrow: "Kad stigne kući",
      title: "Simulacija završava. Briga ne.",
      lead:
        "Kad tvoja obitelj dovede pravog ljubimca kući, jedan dodir pretvara PetPrep u asistenta za cijeli život životinje – u stvarnom vremenu, bez traka zdravlja i već upoznat s ritmom tvoje obitelji.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Što će asistent raditi",
          columns: 2,
          items: [
            { title: "Povezivanje s pametnom ogrlicom", text: "Poveži popularne GPS uređaje i uređaje za praćenje aktivnosti – ili ogrlicu PetPrep – i vidi aktivnost u kontekstu." },
            { title: "Upozorenja koja objašnjavaju", text: "„Max je danas pretrčao 2 km, upola manje nego inače, i pojeo je veći obrok. Dodatna večernja šetnja pomoći će mu da se smiri.“ Jedno zapažanje, jedan razlog, jedan prijedlog." },
            { title: "Prvo AI, zatim pravi veterinar", text: "Postavi pitanje ili pošalji fotografiju. Asistent odgovara na opća pitanja, procjenjuje hitnost i po potrebi te upućuje pravom veterinaru – kod hitnih znakova odmah veterinaru." },
            { title: "DNK test za psa ili mačku", text: "Naruči DNK test u aplikaciji ili dodaj rezultat testa koji već imaš. PetPrep pokazuje koje su pasmine u mješavini, što je za njih tipično i koji su zdravstveni problemi u tim pasminama češći – s izvorima. Postoci pasmina nisu dijagnoza, a DNK test ne pokazuje alergije." },
            { title: "Kartica za veterinara", text: "Pasminska mješavina i svi izravni nalazi DNK testa na jednoj stranici ili u QR kodu, tako da tvoj veterinar odmah zna što je u mješancu." },
            { title: "Rast i prehrana", text: "Upisuj težinu svaki tjedan, prati krivulju rasta i dobij podsjetnik kad je vrijeme za promjenu hrane." },
          ],
        },
        {
          type: "screens",
          heading: "Pretpregled",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Načela od kojih ne odustajemo",
          items: [
            "AI asistent nije veterinar i nikad ne postavlja dijagnozu. Svaki odgovor o zdravlju uključuje put do pravog veterinara.",
            "Ponude partnera (trgovine, osiguravatelji, treneri, veterinari) uvijek su označene i navodimo kad zarađujemo proviziju.",
            "Ništa se ne dijeli s partnerom bez tvoje privole.",
            "Podaci tvog djeteta iz izazova prelaze u asistenta samo ako se složiš.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Cijene – s PetPrepom možeš početi besplatno, 12-tjedni izazov stoji 49,99 €",
        description:
          "Mješanac je zauvijek besplatan. 12-tjedni izazov PetPrep stoji 49,99 € po ljubimcu kao jednokratna kupnja. Jedna cijena za braću i sestre koji dijele ljubimca. Može i kao nadogradnja tvog besplatnog ljubimca.",
      },
      eyebrow: "Cijene",
      title: "Jednostavne, poštene cijene.",
      lead: "Počni besplatno s mješancem. Cijeli 12-tjedni izazov kupi kad budeš spreman – 12 tjedana počinje kupnjom. To vrijedi i za besplatnog ljubimca o kojem se tvoje dijete već brine.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Želje – stvari za tvog ljubimca",
          intro:
            "U aplikaciji dijete traži stvari za svog ljubimca; ti odlučuješ i kupuješ. Dijete nikad ne vidi cijenu. Predmeti služe samo za izgled: nikad ne mijenjaju potrebe, Care Score ni certifikat. Dostupno i za besplatnog mješanca i domaću mačku.",
          head: ["Predmet", "Cijena"],
          rows: [
            ["Ležaljka (mačka: košara)", "5,99 €"],
            ["Zdjelice za hranu i vodu", "5,99 €"],
            ["Igračka (pas: igračka od užeta ili igračka koja cvili, mačka: plišani miš ili štap s perjem)", "5,99 € po igrački"],
            ["Poslastice, pakiranje od 10", "2,99 €"],
            ["Paket dobrodošlice: ležaljka + zdjelice + igračka", "15,99 € (umjesto 17,97 €)"],
          ],
          note: "Želje stižu sa sljedećim ažuriranjem aplikacije; moći će se kupiti čim predmeti budu dostupni u trgovinama App Store i Google Play. Cijene vrijede za Sloveniju; trgovina prikazuje cijenu za tvoju zemlju.",
        },
        {
          type: "faq",
          heading: "Pitanja o cijenama",
          items: [
            { q: "Je li besplatna verzija stvarno besplatna?", a: "Da. Mješanac je zauvijek besplatan, s cijelom simulacijom, pravim šetnjama i roditeljskom nadzornom pločom." },
            { q: "Što uključuje izazov?", a: "Zahtjevne pasmine poput [border collieja](breed:border_collie), raspoloženja tvog ljubimca u AI videozapisima, Certifikat o odgovornosti na kraju i pristup za oba roditelja. Možeš ga odabrati i s mješancem ili domaćom mačkom." },
            { q: "Možemo li besplatnog ljubimca kojeg moje dijete već ima nadograditi u izazov?", a: "Da, ako je besplatni mješanac ili domaća mačka još u igri. U roditeljskoj aplikaciji pokreni izazov s kartice djeteta. Ljubimac ostaje isti: ime, izgled, dob i naučene naredbe. 12 tjedana, Care Score i certifikat broje se od kupnje; raniji dani ostaju u povijesti, označeni kao dani prije izazova, i ne broje se. Cijena je ista: 49,99 € jednokratno, bez pretplate. Mješance stvorene u ranoj verziji aplikacije nije moguće nadograditi; aplikacija će ti reći odnosi li se to na tvog." },
            { q: "Može li se ljubimac s izazova vratiti na besplatni plan?", a: "Ne na zahtjev. Mješanac ili domaća mačka vraća se na besplatni plan samo ako trgovina vrati novac za kupnju; izazov tada završava bez certifikata. Ako izazov kasnije ponovno kupiš, počinje novih 12 tjedana." },
            { q: "Hoće li me aplikacija nagovarati na kupnju?", a: "Neće. Ako se tvoje dijete brinulo o besplatnom ljubimcu barem 5 od njegovih prvih 7 dana, dobit ćeš jednu obavijest i karticu na nadzornoj ploči o izazovu – jednom po ljubimcu i nikad u tihim satima. Dijete ne vidi ni cijene ni ovaj podsjetnik." },
            { q: "Plaćaju li braća i sestre dvaput?", a: "Ne. Djeca koja dijele jednog ljubimca plaćaju jednu cijenu. Drugi ljubimac u obitelji zaseban je izazov." },
            { q: "Kako plaćam?", a: "U aplikaciji, putem trgovine App Store ili Google Play. Povrat novca rješava se preko tvog računa u trgovini." },
            { q: "Što su Želje i može li dijete samo nešto kupiti?", a: "Dijete može zatražiti ležaljku, zdjelice, igračku ili poslastice za svog ljubimca – najviše tri otvorena zahtjeva istodobno. Ti dobiješ obavijest i kupiš predmet ili odabereš „Ne sada“. Dijete nikad ne vidi cijene i u dječjoj aplikaciji ne može ništa kupiti." },
            { q: "Olakšavaju li kupljeni predmeti igru?", a: "Ne. Predmeti služe samo za izgled. Nikad ne mijenjaju potrebe, Care Score ni certifikat, a u Željama nema ni veterinara ni lijekova – nikad „plati da spasiš ljubimca“." },
            { q: "Vrijedi li isto i za odrasle?", a: "Da. Ako PetPrep koristiš sam, da isprobaš pasminu, vrijedi isto: mješanac je zauvijek besplatan, a 12-tjedni izazov stoji 49,99 € po ljubimcu." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Česta pitanja – što roditelje zanima o PetPrepu",
        description:
          "Odgovori o PetPrepu: koliko vremena treba svaki dan, korištenje za odrasle, privatnost i lokacija, koraci, braća i sestre, što ako dijete ne uspije, jezici, vrste, pravi ljubimci.",
      },
      eyebrow: "Česta pitanja",
      title: "Pitanja koja roditelji postavljaju.",
      lead: "Kratki, iskreni odgovori. Nešto nedostaje? Piši nam.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Za koju je dob PetPrep?", a: "Namijenjen je djeci od otprilike 7 do 12 godina, a dobro funkcionira i do 16. godine. Koriste ga i odrasli kako bi provjerili je li određena pasmina doista za njih prije kupnje ili udomljavanja." },
            { q: "Mogu li PetPrep koristiti sam, bez djece?", a: "Da. Otvori račun kao roditelj i dodaj sebe kao profil njegovatelja – dovoljan je nadimak, a godinu rođenja ostavi praznom. Odaberi pasminu, izradi šesteroznamenkasti kod, a zatim na istom ili drugom mobitelu odaberi „Ja sam dijete“ i upiši kod – tako postaješ njegovatelj. Budući da će to biti obiteljski pas, partnera ili djecu možeš dodati i kasnije pa se brinete zajedno. Cijena je ista kao za obitelji." },
            { q: "Koliko vremena treba svaki dan?", a: "Nekoliko minuta za hranu, vodu i čišćenje – plus šetnja koja je pravom psu ionako potrebna." },
            { q: "Prati li aplikacija lokaciju mog djeteta?", a: "Ne. Za šetnje broji samo korake. Ako to dopustiš, čita ih iz aplikacije Apple Health (iPhone) ili Health Connect (Android) – samo čitanje i samo koraci; gdje je dostupan, koristi i senzor pokreta na mobitelu. Dopuštenje traži na zaslonu šetnje. GPS se ne koristi." },
            { q: "Treba li mom djetetu adresa e-pošte?", a: "Ne. Račun otvaraš ti; dijete se prijavljuje šesteroznamenkastim kodom koji izradiš. Pohranjujemo samo nadimak i, po želji, godinu rođenja." },
            { q: "Što ako dijete zaboravi?", a: "Ljubimac najprije šalje nježne podsjetnike. Ako neka potreba ostane na nuli, ljubimac se razboli i provede 12 sati kod veterinara. Nakon cijelog dana bez brige preuzima ga virtualno sklonište – a vi možete početi ispočetka." },
            { q: "Mogu li braća i sestre dijeliti ljubimca?", a: "Da. Svako dijete potpisuje vlastiti ugovor, svaka se radnja pripisuje onome tko ju je obavio i svako dijete dobiva svoj pravedni Care Score." },
            { q: "A škola i vrijeme za spavanje?", a: "Postavi tihe sate. Ljubimac usporava, ništa se ne šalje, a obroke koji u cijelosti padaju u tihe sate preuzimaš ti." },
            { q: "Je li djeci strašno?", a: "Nije. Posljedice su stvarne, ali nježne: ljubimac ide veterinaru ili u sklonište, nikad ništa uznemirujuće, i uvijek postoji novi početak." },
            { q: "Koje su životinje dostupne?", a: "Danas [psi](species:dog) i [mačke](species:cat): besplatni mješanac i domaća mačka te 12-tjedni izazov s jednim od njih ili sa svakom pasminom iz [enciklopedije životinja](page:animals), u kojoj su navedene i njihove potrebe s izvorima. Druge vrste su u planu." },
            { q: "Na kojim jezicima?", a: "Danas na engleskom i slovenskom. Nove jezike dodajemo kako PetPrep stiže u nove zemlje." },
            { q: "Što se događa kad dobijemo pravog ljubimca?", a: "PetPrep može postati AI asistent za tvog pravog ljubimca. Taj je dio u razvoju." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partneri – surađuj s PetPrepom",
        description:
          "PetPrep surađuje s trgovinama za kućne ljubimce, skloništima, veterinarima, trenerima, osiguravateljima, proizvođačima ogrlica i školama kako bi obitelji ljubimce nabavljale odgovorno.",
      },
      eyebrow: "Partneri",
      title: "Bolje pripremljene obitelji za sve kojima je stalo do životinja.",
      lead:
        "Obitelji koje završe PetPrep znaju što ljubimac stvarno traži. Gradimo partnersku mrežu koja ih dočekuje u pravom trenutku – jasno označeno i uvijek uz privolu obitelji.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "S kim surađujemo",
          columns: 3,
          items: [
            { title: "Trgovine za kućne ljubimce", text: "Dođite do obitelji u trenutku kad dokažu da su spremne – primjerice s ponudom početnog paketa uz certifikat." },
            { title: "Skloništa, udruge za udomljavanje i uzgajivači", text: "Preporučite PetPrep prije udomljavanja ili kupnje – za manje impulzivnih odluka i vraćanja životinja." },
            { title: "Veterinari", text: "Kad pravi ljubimac stigne kući, AI asistent odgovara na prva pitanja i upućuje vlasnike vama, sa sažetkom slučaja koji se dijeli samo uz privolu." },
            { title: "Treneri i škole za pse", text: "Preporuke i rezervacije kad obitelj prijeđe na pravog psa." },
            { title: "Osiguravatelji kućnih ljubimaca", text: "Ponude prilagođene pasmini kad se registrira pravi ljubimac – jasno označene." },
            { title: "Proizvođači ogrlica i IoT uređaja", text: "Povezivanje podataka o aktivnosti za pametnija upozorenja s objašnjenjem." },
          ],
        },
        {
          type: "list",
          heading: "Zašto nam partneri vjeruju",
          items: [
            "Djeca se prijavljuju bez e-pošte, a njihove podatke svodimo na najmanju moguću mjeru, na poslužiteljima u EU-u.",
            "Na djetetov zaslon stiže samo provjereni sadržaj; oglasa nema.",
            "Svaka je ponuda partnera označena, a svaka provizija otkrivena obitelji.",
          ],
        },
        { type: "callout", title: "Razgovarajmo.", text: "Uvjete partnerstva upravo pripremamo. Reci nam tko si i što imaš na umu.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investiraj u PetPrep – od spremnosti za ljubimca do brige za cijeli život",
        description:
          "PetPrep pretvara djetetovo obećanje u dokaz prije nego što obitelj nabavi ljubimca, a zatim postaje AI asistent za cijeli njegov život. Prije lansiranja; sažetak na zahtjev.",
      },
      eyebrow: "Investitori",
      title: "Od 12-tjednog izazova do odnosa od 10 do 15 godina.",
      lead:
        "PetPrep roditeljima daje objektivan dokaz o tome je li njihovo dijete spremno za pravog ljubimca – a zatim ostaje s obitelji cijeli život životinje.",
      blocks: [
        {
          type: "cards",
          heading: "Prilika",
          columns: 3,
          items: [
            { title: "Problem", text: "Djeca obećavaju da će se brinuti o ljubimcu; roditelji nemaju neutralan način da to provjere prije nego što se obvežu na novac i godine brige." },
            { title: "Rješenje", text: "Realistična 12-tjedna simulacija s roditeljskom nadzornom pločom uživo i objektivnim Care Scoreom, koja završava Certifikatom o odgovornosti." },
            { title: "Proširenje", text: "Kad pravi ljubimac stigne kući, AI asistent za njega: podaci s ogrlice, AI prvi kontakt s veterinarima, rast i prehrana, DNK testovi, usluge partnera." },
          ],
        },
        {
          type: "table",
          heading: "Poslovni model",
          head: ["Izvor prihoda", "Model", "Status"],
          rows: [
            ["Mješanac", "Zauvijek besplatno (stjecanje korisnika)", "Odlučeno"],
            ["12-tjedni izazov PetPrep", "49,99 € po ljubimcu, jednokratna kupnja", "Odlučeno"],
            ["Želje – stvari za ljubimca (samo izgled)", "Kupnje u aplikaciji: 5,99 € po predmetu, poslastice 2,99 € za 10, paket 15,99 €; i u besplatnoj verziji", "Izrađeno, kupnja u trgovini uskoro"],
            ["Ponude partnera", "Provizije trgovina, osiguravatelja, veterinara i trenera", "U planu"],
            ["AI asistent za pravog ljubimca", "Pretplata", "U planu"],
            ["DNK testovi za pse i mačke", "Prodaja testova i provizija partnera", "U planu"],
          ],
        },
        {
          type: "list",
          heading: "Dosad izgrađeno",
          items: [
            "Pokretač igre na poslužitelju sa sinkronizacijom u stvarnom vremenu, testiran na simulacijama cijelih dana, danima promjene na ljetno ili zimsko vrijeme i rubnim slučajevima u obiteljima.",
            "Obitelji s više roditelja, više djece i zajedničkim ljubimcima, s pravednim bodovanjem za svako dijete.",
            "Jedinstveni fotorealistični AI ljubimci s izmjerenim i ograničenim troškovima AI-ja, a mediji se pohranjuju na unajmljenim poslužiteljima u Njemačkoj (Hetzner, EU).",
            "Potrebe ljubimaca temeljene na navedenim veterinarskim i kinološkim izvorima, pri čemu se svaka brojka može pratiti do svog izvora.",
            "Sigurnost djece od samog početka: prijava PIN-om bez e-pošte, minimalni podaci, bez oglasa, samo provjereni mediji.",
          ],
        },
        {
          type: "prose",
          heading: "Faza",
          paragraphs: [
            "PetPrep je u fazi prije lansiranja, a planirana je zatvorena beta. Prvo tržište je Slovenija s regijom, zatim slijede zemlje DACH-a i Ujedinjeno Kraljevstvo; proizvod je od prvog dana građen za lokalizaciju diljem svijeta.",
            "Osnivač: David Tacer, programer i poduzetnik. Više [o nama](page:about).",
          ],
        },
        { type: "callout", title: "Zatraži sažetak za investitore.", text: "Sažetak, prezentaciju i podatkovnu sobu dijelimo na zahtjev.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt PetPrep – obitelji, privatnost, partneri, investitori",
        description: "Javi se PetPrepu: pitanja obitelji, zahtjevi u vezi s privatnošću, partnerstva i upiti investitora. Odgovaramo na engleskom ili slovenskom.",
      },
      eyebrow: "Kontakt",
      title: "Čitamo svaku poruku.",
      lead: "Piši na pravu adresu i odgovorit ćemo što prije, na engleskom ili slovenskom.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Podaci o tvrtki" }],
    },
    privacy: {
      navLabel: "Privatnost",
      meta: {
        title: "Pravila privatnosti – PetPrep",
        description: "Kako PetPrep prikuplja, upotrebljava i štiti osobne podatke roditelja i djece te kako ostvariti svoja prava prema Općoj uredbi o zaštiti podataka (GDPR).",
      },
      eyebrow: "Pravno",
      title: "Pravila privatnosti",
      lead: "Prijevod – obvezujuća je samo engleska verzija. PetPrep je namijenjen prije svega djeci, zato prikupljamo što manje i točno objašnjavamo što s tim podacima radimo.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Tko je odgovoran",
              paragraphs: [
                "Voditelj obrade osobnih podataka koji se obrađuju putem aplikacije PetPrep i ove mrežne stranice je {company}, {address}; {companyIds}. Kontakt za pitanja o privatnosti: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Što prikupljamo",
              items: [
                "Roditeljski račun: ime (kako te zove tvoja obitelj), adresa e-pošte, lozinka (pohranjena samo kao siguran sažetak, tzv. hash), vremenska zona tvog uređaja i vrijeme prihvaćanja uvjeta i ovih pravila.",
                "Profil njegovatelja (dijete ili odrasla osoba koja se brine o ljubimcu): nadimak od najviše 30 znakova i, po želji, godina rođenja – za odraslu osobu ostaje prazna. Bez e-pošte, lozinke, prezimena i datuma rođenja.",
                "Uređaji: model mobitela (primjerice „iPhone“, nikad naziv koji je korisnik dao mobitelu), a za obavijesti push token, platforma i verzija aplikacije.",
                "Aktivnost brige: radnje u simulaciji (hranjenje, voda, čišćenje, šetnje), dnevni zbrojevi koraka (ili zbrojevi potisaka invalidskih kolica u prilagođenom načinu – vidi odjeljke 3 i 4), ocjene i izvješća.",
                "Ugovor o odgovornosti: djetetov potpis prstom, pohranjen kao vektorska linija s vremenom potpisivanja.",
                "Kodovi: kodovi za prijavu i pozivni kodovi pohranjuju se samo kao sažeci (hash) i istječu.",
                "Izvješća o pogreškama aplikacije: ako se aplikacija zamrzne ili sruši, može poslati kratko tehničko izvješće na naš poslužitelj u EU-u (vrsta i tekst pogreške, mjesto u kodu, verzija aplikacije i operacijskog sustava, naziv zaslona, uloga roditelj/dijete). Ne sadrži ime, adresu e-pošte, korisnički ID ni IP adresu, ne dijeli se ni s kojom trećom stranom i briše se nakon 30 dana.",
                "Popis za rani pristup (ova mrežna stranica): tvoja adresa e-pošte, jezik stranice i vrijeme prijave.",
                "Iskorištavanje poklon bona (ova web-stranica): roditelj se prijavljuje putem Googlea, Applea ili e-adresom i lozinkom. Primamo samo potvrdu o tome o kojem je postojećem roditeljskom računu PetPrep riječ; od Googlea ili Applea to je identifikator računa, a druge njihove podatke ne pohranjujemo. Kratkotrajni token za prijavu čuva se u memoriji preglednika najviše 15 minuta. Tijekom povratka s Googlea ili Applea u pohrani sesije preglednika (session storage) najviše 60 sekundi postoje dva zapisa (petprep.signin i petprep.webSession.handoff) koji se brišu čim se pročitaju. Nakon odjave ili zatvaranja kartice ništa ne ostaje pohranjeno.",
              ],
            },
            {
              heading: "3. Podaci o zdravlju i tjelesnoj aktivnosti (koraci, Apple Health i Health Connect)",
              paragraphs: [
                "PetPrep pristupa jednoj vrsti podataka o zdravlju i tjelesnoj aktivnosti i prikuplja je: koliko koraka njegovatelj prijeđe svaki dan (tjelesna aktivnost). Upotrebljavamo je samo za jednu funkciju – dnevnu šetnju ljubimca u simulaciji: dijete hoda, a njegovi se koraci računaju kao ljubimčeva šetnja.",
                "Kako pristupamo podacima: koraci se broje u aplikaciji na djetetovu mobitelu. Ako to dopustiš u dijaloškom okviru sustava za dopuštenja, aplikacija ih čita iz aplikacije Apple Health (iPhone) ili Health Connect (Android) – samo čitanje i samo korake. Gdje je dostupan, koristi i senzor pokreta na mobitelu (Android: dopuštenje „Tjelesna aktivnost“; iPhone: „Pokret i kondicija“); bez dopuštenja za Apple Health ili Health Connect korake broji samo senzor pokreta.",
                "Što prikupljamo: aplikacija na naš poslužitelj šalje samo današnji zbroj koraka, njegov izvor (Apple Health, Health Connect ili senzor pokreta) i vrijeme slanja. Pohranjujemo jedan dnevni zbroj po profilu njegovatelja – nikad pojedinačne pokrete, rute, lokaciju, otkucaje srca, san, težinu ni bilo koje druge podatke o zdravlju. U Apple Health ili Health Connect nikad ništa ne zapisujemo.",
                "Kako ih upotrebljavamo i dijelimo: zbrojevi koraka služe samo za odvijanje šetnje u simulaciji i za prikaz roditelju (nadzorna ploča i izvješća). Ne upotrebljavamo ih za oglašavanje, izradu profila, procjene zdravlja ni za treniranje AI modela, ne prodajemo ih i ne dijelimo ih s trećim stranama; u naše ime pohranjuje ih samo naš pružatelj usluge smještaja (Hetzner, poslužitelji u EU-u). Naša upotreba podataka primljenih iz Health Connecta u skladu je s pravilima dopuštenja Health Connecta, uključujući zahtjeve za ograničenu upotrebu (Limited Use).",
                "Pravna osnova i rok čuvanja: čitanje koraka nije obvezno i odvija se samo uz dopuštenje koje daš na uređaju; dnevni zbroj obrađujemo kako bismo pružili uslugu koju koristiš (izvršavanje ugovora). Zbrojevi koraka uključeni su u izvoz podataka tvoje obitelji i brišu se zajedno s profilom njegovatelja ili tvojim računom; iz naših šifriranih sigurnosnih kopija nestaju najkasnije u roku od 35 dana.",
                "Dopuštenje možeš u svakom trenutku opozvati u postavkama uređaja: iPhone → Postavke → Zdravlje → Pristup podacima i uređaji → PetPrep; Android → Health Connect → Dopuštenja aplikacija → PetPrep. Dopuštenje za senzor pokreta možeš opozvati u postavkama mobitela za aplikaciju PetPrep. Šetnja tada više ne broji nove korake.",
              ],
            },
            {
              heading: "4. Prilagođeni način (potisci invalidskih kolica)",
              paragraphs: [
                "Prilagođeni način namijenjen je djeci koja se koriste invalidskim kolicima: šetnja tada umjesto koraka broji potiske kolica. U aplikaciju stiže sa sljedećim ažuriranjem; u nastavku opisujemo koje podatke obrađujemo ako ga roditelj uključi.",
                "Ako roditelj za dijete uključi prilagođeni način, pohranjujemo samo činjenicu da je uključen. Ne pitamo za razlog, dijagnozu ni zdravstveno stanje i ne pohranjujemo ih.",
                "Dok je uključen, aplikacija na djetetovu mobitelu umjesto koraka čita samo potiske kolica – iz aplikacije Apple Health (bilježi ih Apple Watch), uz zasebno dopuštenje samo za čitanje. Na Androidu aplikacija ne čita potiske; umjesto toga roditelj upisuje minute šetnje. Senzor pokreta tada ne koristi. Na naš poslužitelj šalje se samo današnji broj potisaka; za taj dan bilježimo da se broje potisci.",
                "Roditelj može za dijete u prilagođenom načinu upisati minute šetnje (samo za današnji dan). Pohranjujemo datum, broj minuta i koji je roditelj upisao šetnju.",
                "Budući da činjenica da je prilagođeni način uključen može upućivati na djetetovo zdravstveno stanje, obrađujemo je samo na temelju tvoje izričite privole (čl. 9. st. 2. t. (a) GDPR-a), koju kao roditelj ili zakonski skrbnik daješ u ime djeteta (čl. 8. GDPR-a) uključivanjem prekidača. Način možeš isključiti u svakom trenutku; aplikacija tada ponovno broji korake.",
                "Ti podaci (prekidač, dani u kojima su se brojali potisci i upisane šetnje) uključeni su u izvoz podataka tvoje obitelji i brišu se zajedno s djetetovim profilom ili tvojim računom; iz naših šifriranih sigurnosnih kopija nestaju najkasnije u roku od 35 dana, kao i svi drugi podaci.",
              ],
            },
            {
              heading: "5. Što ne prikupljamo",
              items: [
                "Nema lokacije: PetPrep ne koristi GPS.",
                "Nema drugih podataka o zdravlju iz aplikacija Apple Health ili Health Connect osim dnevnog broja koraka ili potisaka invalidskih kolica.",
                "Nema oglašavanja ni oglašivačkih SDK-ova ili SDK-ova za praćenje trećih strana u aplikaciji.",
                "Nema dopisivanja među korisnicima.",
                "Nema oglašivačkih kolačića na ovoj mrežnoj stranici. Analitički kolačići postavljaju se samo ako ih dopustiš (vidi Kolačići u nastavku).",
              ],
            },
            {
              heading: "6. Zašto obrađujemo podatke (svrhe i pravne osnove)",
              items: [
                "Kako bismo pružili uslugu koju koristiš: računi, simulacija, nadzorna ploča, izvješća i obavijesti (izvršavanje ugovora).",
                "Za obradu kupnji putem trgovine App Store ili Google Play (izvršavanje ugovora).",
                "Za dnevnu šetnju (dnevni zbrojevi koraka – podaci o zdravlju i tjelesnoj aktivnosti, vidi odjeljak 3): izvršavanje ugovora; čitanje iz aplikacije Apple Health, Health Connect ili senzora pokreta samo uz dopuštenje koje daš na uređaju.",
                "Za prilagođeni način (činjenica da je uključen, potisci invalidskih kolica i upisane šetnje): izričita privola roditelja dana uključivanjem prekidača (čl. 9. st. 2. t. (a) i čl. 8. GDPR-a – vidi odjeljak 4).",
                "Za sigurnost usluge, primjerice ograničavanje ponovljenih pokušaja prijave (legitimni interes).",
                "Za rad i sigurnost usluge s pomoću izvješća o pogreškama aplikacije, koja nam pomažu ispraviti zamrzavanja i rušenja (legitimni interes).",
                "Za ispunjavanje zakonskih obveza, primjerice računovodstva kupnji (pravna obveza).",
                "Za slanje e-pošte o lansiranju PetPrepa ako si na popisu za rani pristup (privola – odjaviti se možeš u svakoj e-poruci).",
                "Kako bismo razumjeli kako posjetitelji koriste ovu mrežnu stranicu, s pomoću alata Google Analytics, samo ako dopustiš analitičke kolačiće (privola – izbor možeš u svakom trenutku promijeniti u Postavkama kolačića).",
              ],
            },
            {
              heading: "7. Djeca",
              paragraphs: [
                "Račun može otvoriti i dijete dodati samo roditelj ili zakonski skrbnik. Roditelj odlučuje što dijete smije raditi i može u svakom trenutku izbrisati djetetov profil. Od djeteta nikad ne tražimo kontaktne podatke, nikad ne prikazujemo oglase i nikad ne dopuštamo kontakt s nepoznatima.",
                "Vlasnik računa može izraditi profil njegovatelja i za sebe ili za drugu odraslu osobu u obitelji – primjerice kako bi prije kupnje ili udomljavanja provjerio odgovara li mu pasmina. Za takav profil vrijede ista pravila i isti minimalni podaci; na njega se primjenjuje i svaka zaštita osmišljena za djecu.",
              ],
            },
            {
              heading: "8. Slike i videozapisi koje generira umjetna inteligencija",
              paragraphs: [
                "Fotografiju i kratke videozapise svakog ljubimca izrađuje AI usluga isključivo na temelju opisa ljubimca (pasmina, dlaka, šare i slično). Opis nikad ne sadrži imena ni bilo kakve podatke o tvojoj obitelji. Gotovi mediji pohranjuju se na unajmljenim poslužiteljima u Njemačkoj (Hetzner, EU) i prikazuju putem kratkotrajnih poveznica.",
              ],
            },
            {
              heading: "9. Pružatelji usluga",
              items: [
                "Smještaj (hosting): Hetzner Online (poslužitelji u EU-u).",
                "Generiranje slika i videozapisa s pomoću AI-ja: fal.ai (prima samo opis ljubimca).",
                "Push obavijesti: Apple Push Notification service i Firebase Cloud Messaging putem servisa Expo; naslov obavijesti može biti ime ljubimca, ako ga ima, ali obavijesti nikad ne sadrže ime djeteta.",
                "Kupnje: Apple App Store i Google Play; upravljanje kupnjama putem servisa RevenueCat kad kupnje budu pokrenute.",
                "E-pošta za rani pristup: Klaviyo (prima samo adresu e-pošte i jezik koje uneseš na ovoj mrežnoj stranici).",
                "Privola za kolačiće na mrežnoj stranici: Kockica (pohranjuje tvoj izbor u vezi s privolom).",
                "Analitika mrežne stranice: Google Analytics 4 tvrtke Google Ireland Ltd., samo uz tvoju privolu; Google Analytics 4 ne pohranjuje IP adrese.",
                "Upravljanje oznakama na mrežnoj stranici: Google Tag Manager tvrtke Google Ireland Ltd.; sam ne postavlja kolačiće, a oznake koje učitava poštuju tvoju privolu.",
                "Ugrađeni videozapisi: YouTube tvrtke Google Ireland Ltd. (youtube-nocookie.com), učitavaju se tek kad pokreneš reprodukciju i dopustiš oglašivačke kolačiće.",
              ],
            },
            {
              heading: "10. Koliko dugo čuvamo podatke",
              paragraphs: [
                "Podatke čuvamo dok postoji tvoj račun. Kad u aplikaciji izbrišeš djetetov profil ili svoj račun, podaci se odmah brišu i ne mogu se vratiti; iz naših šifriranih sigurnosnih kopija automatski nestaju najkasnije u roku od 35 dana. Zapise koje moramo čuvati po zakonu (primjerice za kupnje) čuvamo onoliko dugo koliko zakon nalaže. Izvješća o pogreškama aplikacije automatski se brišu nakon 30 dana.",
              ],
            },
            {
              heading: "11. Tvoja prava",
              paragraphs: [
                "Imaš pravo na pristup, ispravak, izvoz i brisanje svojih podataka, pravo na prigovor i ograničenje obrade te pravo na pritužbu nadzornom tijelu – u Sloveniji je to Povjerenik za informacije (Informacijski pooblaščenec). U aplikaciji možeš izvesti sve podatke svoje obitelji u datoteku (Upravljanje → Račun → Izvezi moje podatke) te izbrisati djetetov profil ili cijeli račun. Za sve ostalo piši na {privacyEmail}.",
              ],
            },
            {
              heading: "12. Sigurnost",
              paragraphs: [
                "Lozinke i kodovi pohranjuju se kao sažeci (hash), veze su šifrirane, ažuriranja uživo dostavljaju se samo članovima tvoje obitelji, a AI mediji provjeravaju se prije nego što stignu na djetetov zaslon.",
              ],
            },
            {
              heading: "13. Promjene",
              paragraphs: ["O važnim promjenama obavijestit ćemo te u aplikaciji prije nego što stupe na snagu. Datum na vrhu pokazuje najnoviju verziju."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Kolačići",
          paragraphs: [
            "Nužni kolačići omogućuju rad mrežne stranice i pamte tvoj izbor u vezi s privolom. Sve ostale kolačiće postavljamo samo ako ih dopustiš u prozoru za privolu, prema kategorijama: funkcionalni (dodatne funkcije), analitički (Google Analytics: koje se stranice posjećuju) i oglašivački (videozapisi s YouTubea ugrađeni na nekim stranicama; na ovoj mrežnoj stranici ne prikazujemo oglase). Google Tag Manager sam ne postavlja kolačiće, a svaka oznaka koju učita poštuje tvoj izbor. Izbor možeš promijeniti ili povući u svakom trenutku.",
            "Tablicu u nastavku automatski izrađuje traka za privolu prema onome što pronađe na ovoj mrežnoj stranici, pa navodi kolačiće koje stvarno koristimo.",
          ],
          settings: "Promijeni postavke kolačića",
          fallback: "Popis kolačića učitava se zajedno s prozorom za privolu. Ako ga ne vidiš, dopusti skripte na ovoj stranici ili piši na {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Uvjeti korištenja",
      meta: {
        title: "Uvjeti korištenja – PetPrep",
        description:
          "Uvjeti korištenja aplikacije i mrežne stranice PetPrep: računi i dječji profili, 12-tjedni izazov i certifikat, kupnje i povrati novca, AI sadržaj, prilagođeni način, pošteno korištenje, brisanje i mjerodavno pravo.",
      },
      eyebrow: "Pravno",
      title: "Uvjeti korištenja",
      lead: "Prijevod – obvezujuća je samo engleska verzija. Pravila korištenja PetPrepa, napisana tako da se mogu pročitati.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Usluga",
              paragraphs: [
                "PetPrep pruža {company}, {address}; {companyIds} – ista tvrtka koja je voditelj obrade prema pravilima privatnosti. Ovi uvjeti vrijede za aplikaciju PetPrep i mrežnu stranicu petprep.si.",
                "PetPrep je simulacija brige o kućnom ljubimcu. Pomaže obiteljima i pojedincima saznati jesu li spremni brinuti se o pravom ljubimcu – djeci, ali i odraslima koji prije kupnje ili udomljavanja žele provjeriti odgovara li im pasmina. Riječ je o obrazovnom alatu, a ne o veterinarskom ili drugom stručnom savjetu.",
              ],
            },
            {
              heading: "2. Računi, profili i djeca",
              items: [
                "Račune otvaraju odrasle osobe: roditelji, zakonski skrbnici ili odrasli koji PetPrep koriste za sebe. Registracijom prihvaćaš ove uvjete i pravila privatnosti.",
                "Njegovatelji (djeca ili odrasli) brinu se o ljubimcu putem profila njegovatelja koji izrađuje vlasnik računa, a koji može izraditi profil i za sebe. Za profil su potrebni samo nadimak i, po želji, godina rođenja – ništa više o djetetu ne trebamo, zato to nigdje u aplikaciji ne upisuj.",
                "Dijete se prijavljuje šesteroznamenkastim kodom (PIN) koji izradiš u svojoj aplikaciji. Kod je kratkotrajan i vrijedi samo jednom; daj ga samo djetetu kojem je namijenjen.",
                "Kao roditelj ili zakonski skrbnik odgovoran si za to kako tvoje dijete koristi PetPrep: odgovara li mu, koliko vremena s njim provodi i je li sigurno u šetnjama (primjerice u prometu). Igru za bilo kojeg ljubimca možeš zaustaviti u svakom trenutku.",
                "Drugog roditelja možeš pozvati u obitelj pozivnim kodom; oboje vidite sve podatke obitelji i oboje možete zaustaviti igru.",
                "Upisuj točne podatke i čuvaj svoju lozinku, kodove i uređaje.",
              ],
            },
            {
              heading: "3. 12-tjedni izazov, Care Score i certifikat",
              items: [
                "Izazov traje 12 tjedana (84 dana programa) i počinje kupnjom; svaki njegovatelj ima vlastiti završetak. Vrijeme dok igra čeka na plaćanje ne ubraja se u 12 tjedana. Ako besplatnog ljubimca nadogradiš u izazov, 12 tjedana također počinje kupnjom; dob ljubimca se ne poništava, a dani prije kupnje ostaju vidljivi u povijesti, označeni kao dani prije izazova, ali se ne broje ni u 12 tjedana ni u Care Score ni za certifikat.",
                "Care Score (0–100) pokazuje koji je udio očekivanih rutina (hranjenje, voda, čišćenje, šetnja, vježba dresure) njegovatelj obavio sam; svaka bolest ljubimca snižava ga. Vrijeme dok je igra zaustavljena, dok je ljubimac kod veterinara te tihi sati nikad ne idu na štetu njegovatelja.",
                "Nakon 12 tjedana bilježi se konačna ocjena koja se kasnije ne mijenja; briga nakon izazova na nju ne utječe. S ocjenom 70 ili višom u aplikaciji možeš izraditi Certifikat o odgovornosti (PDF); ispod 70 dobivaš izvješće o izazovu.",
                "Ako hrana, voda ili čistoća 24 sata ostanu na 0 %, ljubimac se „odvodi u sklonište“ (kraj igre). Igra s tim ljubimcem završava, certifikata nema, a dobivaš izvješće o izazovu.",
                "Care Score i certifikat pokazuju samo kako se njegovatelj brinuo o simuliranom ljubimcu u aplikaciji. Oni nisu jamstvo da je dijete ili bilo tko drugi spreman za pravog ljubimca, nisu stručna procjena i ne zamjenjuju tvoju vlastitu prosudbu ni savjet veterinara, uzgajivača ili skloništa. Odluka o pravom ljubimcu uvijek je tvoja.",
                "Pravila igre (obroci, šetnje i briga prema pasmini i dobi) pojednostavljena su i temelje se na javnim izvorima. Nisu veterinarski savjet; o zdravlju i njezi prave životinje pitaj veterinara.",
              ],
            },
            {
              heading: "4. Besplatne i plaćene funkcije, kupnje i povrati novca",
              items: [
                "Mješanac i domaća mačka zauvijek su besplatni i način su da isprobaš PetPrep; besplatnog probnog razdoblja izazova nema. Besplatni ljubimac nema 12-tjedni program ni certifikat, roditelj vidi povijest posljednjih 7 dana, a ljubimac ima osnovni skup slika i videozapisa.",
                "12-tjedni izazov PetPrep jednokratna je kupnja, a ne pretplata (49,99 € u Sloveniji; trgovina prikazuje cijenu za tvoju zemlju). U trenutačnoj verziji aplikacije možeš ga odabrati s bilo kojom pasminom, i s mješancem i domaćom mačkom. Jedna kupnja je jedan izazov za jednog ljubimca; svaki novi izazov s novim ljubimcem nova je kupnja. Braća i sestre koji se brinu o istom ljubimcu plaćaju jednom.",
                "Roditelj može besplatnog mješanca ili domaću mačku o kojima se netko već brine nadograditi u izazov po istoj cijeni i s istim ljubimcem. Nadogradnja nije moguća nakon kraja igre ni za mješance stvorene u ranoj verziji aplikacije; aplikacija pokazuje kada to vrijedi. Ljubimac na izazovu (i nadograđeni ljubimac te mješanac ili domaća mačka odabrani za izazov) ne može se prebaciti natrag na besplatni plan; mješanca ili domaću mačku na njega vraća samo povrat novca (vidi niže).",
                "Roditelj kupuje u vlastitoj aplikaciji putem trgovine App Store ili Google Play; u djetetovoj aplikaciji nema kupnji. Trgovina obrađuje plaćanje prema vlastitim uvjetima.",
                "Ljubimca za izazov možeš izraditi i prije kupnje. Dok izazov nije plaćen, igra je pauzirana: ljubimac sigurno čeka, njegove potrebe ne padaju i ništa se ne pogoršava. Čim kupiš, igra se nastavlja ondje gdje je stala.",
                "Povrate novca rješavaju App Store i Google Play prema vlastitim pravilima; povrat zatraži u trgovini u kojoj je kupnja obavljena. Ako trgovina vrati novac za kupnju prije nego što je izazov završen, igra s tim ljubimcem ponovno se pauzira. Slike i videozapisi izrađeni nakon kupnje ostaju. Mješanac ili domaća mačka pritom se ne pauzira, nego se vraća na besplatni plan: izazov završava bez certifikata, ponovno vrijede pravila besplatnog plana, a ljubimac opet ima osnovni skup slika i videozapisa. Ako za tog ljubimca kasnije ponovno kupiš izazov, novih 12 tjedana počinje od nove kupnje.",
                "Nakon kraja igre (sklonište) kupnja ne otključava ljubimca; novi izazov znači novog ljubimca i novu kupnju.",
                "Želje (stvari za ljubimca, kad budu dostupne): dijete može tražiti, ali kupiti može samo roditelj, u vlastitoj aplikaciji. Kupljeni predmet pripada ljubimcu za kojeg je kupljen i služi samo za izgled – ne utječe na igru, ocjenu ni certifikat. Nakon kraja igre ili brisanja ljubimca kupnja ostaje iskorištena i novac se ne vraća. Ako trgovina vrati novac za kupnju, predmet se uklanja (kod poslastica – neiskorištene poslastice).",
                "Ako izbrišeš ljubimca, dijete ili račun dok kupljeni izazov još traje, kupnja ostaje iskorištena: ne prenosi se na drugog ljubimca, a brisanje nije povrat novca. Aplikacija te najprije upozori i zatraži potvrdu.",
              ],
            },
            {
              heading: "5. Slike i videozapisi koje generira umjetna inteligencija",
              items: [
                "Slike i videozapise ljubimaca generira umjetna inteligencija (AI) isključivo na temelju opisa ljubimca (pasmina, boja, dlaka i slično), nikad na temelju podataka o tvojoj obitelji. To su ilustracije simuliranog ljubimca i ne moraju savršeno odgovarati nijednoj stvarnoj životinji ni standardu pasmine.",
                "Gdje ih prikazujemo javno, primjerice portrete pasmina na ovoj mrežnoj stranici, označeni su kao sadržaj generiran umjetnom inteligencijom.",
                "Izgled nije nužno jedinstven: ljubimci iste plaćene pasmine i boje mogu dijeliti iste slike i videozapise, a besplatni ljubimci dobivaju jedan od zajedničkih izgleda svoje pasmine. Plaćeni izazov uključuje veći skup videozapisa nego besplatni ljubimac.",
                "Nakon potpisivanja ugovora ili kupnje priprema slika i videozapisa može potrajati nekoliko minuta; u međuvremenu aplikacija pokazuje da se ljubimac priprema i označava ono što se još priprema.",
                "Podaci o pasminama u aplikaciji i u enciklopediji životinja na ovoj mrežnoj stranici sažeti su iz javnih izvora koje navodimo i nije ih provjerio veterinar.",
              ],
            },
            {
              heading: "6. Koraci, podaci o zdravlju i prilagođeni način",
              items: [
                "Dnevna šetnja broji prave korake njegovatelja. Ako to dopustiš, aplikacija ih čita iz aplikacije Apple Health ili Health Connect, samo za čitanje (ondje nikad ništa ne zapisuje), ili iz senzora pokreta na mobitelu. Koje podatke obrađujemo, opisano je u pravilima privatnosti (odjeljak 3).",
                "Prilagođeni način namijenjen je djeci koja se koriste invalidskim kolicima: šetnja tada umjesto koraka broji potiske kolica. Možeš ga koristiti ako je funkcija dostupna u tvojoj verziji aplikacije. Roditelj ga uključuje za pojedino dijete; uključivanje je tvoja privola, a isključivanje njezino povlačenje (pravila privatnosti, odjeljak 4).",
                "U prilagođenom načinu roditelj može za dijete upisati minute šetnje, samo za današnji dan. Za te unose odgovoran si ti: upisuj samo šetnje koje su se stvarno dogodile jer se računaju u Care Score i certifikat.",
                "PetPrep ne koristi lokaciju i ne upozorava na opasnosti tijekom šetnje; za sigurnost šetnji odgovoran si ti.",
              ],
            },
            {
              heading: "7. Obavijesti",
              paragraphs: [
                "Ako ih dopustiš na uređaju, aplikacija šalje push obavijesti: podsjetnike njegovatelju, upozorenja roditeljima kad ljubimac nema hrane, vode ili čistoće te vijesti o bolesti, kraju igre i završetku izazova. Naslov obavijesti može biti ime ljubimca, ako ga ima; obavijesti nikad ne sadrže ime djeteta i ne šalju se tijekom tihih sati. Dopuštenje možeš u svakom trenutku povući u postavkama uređaja; bez obavijesti njegovatelj može propustiti rutine, što utječe na igru i ocjenu. Roditelji osim toga najviše jednom po besplatnom ljubimcu dobivaju podsjetnik o izazovu kada se netko o njemu brinuo barem 5 od njegovih prvih 7 dana.",
              ],
            },
            {
              heading: "8. Pošteno korištenje",
              items: [
                "Ne pokušavaj varati pri brojanju koraka ili potisaka, upisivati šetnje koje se nisu dogodile, pristupati podacima drugih obitelji, raditi obrnuti inženjering usluge ili je ometati.",
                "Ne daj ljubimcima uvredljiva ili neprimjerena imena i ne upisuj osobne podatke o djetetu koje aplikacija ne traži.",
                "Možemo ograničiti ili suspendirati račune koji krše ova pravila ili ugrožavaju djecu te ukloniti neprimjereno ime ljubimca.",
              ],
            },
            {
              heading: "9. Intelektualno vlasništvo",
              paragraphs: [
                "PetPrep, njegov logotip, dizajn, softver i sadržaj pripadaju tvrtki {company}. Aplikaciju te slike, videozapise i certifikat svog ljubimca smiješ koristiti za osobnu, nekomercijalnu upotrebu svoje obitelji – primjerice dijeliti ih s rodbinom.",
              ],
            },
            {
              heading: "10. Odgovornost",
              paragraphs: [
                "Trudimo se da PetPrep bude dostupan i točan, ali usluga se pruža takva kakva jest; oslanja se i na usluge drugih (trgovine aplikacija, Apple Health, Health Connect, push obavijesti, AI uslugu) na koje nemamo utjecaja. U mjeri u kojoj to zakon dopušta, ne odgovaramo za neizravnu štetu ni za odluke o kupnji ili udomljavanju pravog ljubimca. Ništa u ovim uvjetima ne ograničava prava koja kao potrošač imaš prema prisilnim propisima.",
              ],
            },
            {
              heading: "11. Brisanje računa i prestanak korištenja",
              paragraphs: [
                "Djetetov profil ili svoj račun možeš u svakom trenutku izbrisati u aplikaciji. Brisanje je trenutačno i trajno; kad posljednji roditelj u obitelji izbriše svoj račun, briše se cijela obitelj. Podatke možeš najprije izvesti (Upravljanje → Račun → Izvezi moje podatke). Što se događa s podacima, opisano je u pravilima privatnosti; što se događa s kupnjom, opisano je u odjeljku 4.",
              ],
            },
            {
              heading: "12. Izmjene ovih uvjeta",
              paragraphs: [
                "Ove uvjete ažuriramo kad se promijene aplikacija ili zakon. O važnim promjenama obavijestit ćemo te u aplikaciji prije nego što stupe na snagu. Datum na vrhu pokazuje najnoviju verziju. Ako se ne slažeš s nekom promjenom, svoj račun možeš izbrisati u svakom trenutku.",
              ],
            },
            {
              heading: "13. Mjerodavno pravo i sporovi",
              paragraphs: [
                "Na ove uvjete primjenjuje se pravo Republike Slovenije. Potrošači se mogu pozvati i na prisilne zaštitne odredbe zemlje u kojoj žive te koristiti platformu EU-a za online rješavanje sporova.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Pitanja o ovim uvjetima: {termsEmail}. Pružatelj usluge: {company}, {address}; {companyIds}. Pitanja o privatnosti: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Sigurnost djece",
      meta: {
        title: "Sigurnost djece – kako PetPrep štiti djecu",
        description:
          "Kako PetPrep štiti djecu: račune otvaraju roditelji, prijava kodom bez e-pošte, minimalni podaci, bez oglasa i dopisivanja, bez praćenja lokacije, provjereni mediji.",
      },
      eyebrow: "Povjerenje",
      title: "Napravljeno za djecu od prvog retka koda.",
      lead: "Prijevod – obvezujuća je samo engleska verzija. Dijete je glavni korisnik PetPrepa, zato su sigurnost i privatnost pravila proizvoda, a ne postavke.",
      blocks: [
        {
          type: "cards",
          heading: "Naši standardi",
          columns: 2,
          items: [
            { title: "Svaki račun otvara roditelj", text: "Djeca se ne mogu sama registrirati. Roditelj dodaje dijete i izrađuje jednokratni kod za prijavu koji vrijedi 15 minuta." },
            { title: "Djeci ne treba ni e-pošta ni lozinka", text: "Dijete se prijavljuje roditeljevim kodom. Pogrešni, istekli i već iskorišteni kodovi dobivaju isti odgovor, pa nitko ne može pogoditi koja djeca postoje." },
            { title: "Minimalni podaci", text: "Nadimak i, po želji, godina rođenja. Bez prezimena, bez datuma rođenja, bez fotografija djeteta." },
            { title: "Bez oglasa, bez dopisivanja, bez nepoznatih", text: "Nema oglašavanja i nema načina da se kontaktiraju drugi korisnici." },
            { title: "Bez praćenja lokacije", text: "Šetnje broje samo korake – iz aplikacije Apple Health ili Health Connect (uz tvoje dopuštenje, samo čitanje) ili iz senzora pokreta na mobitelu. GPS se ne koristi." },
            { title: "Privatna ažuriranja uživo", text: "Ažuriranja u stvarnom vremenu stižu samo djeci koja se brinu o tom ljubimcu i roditeljima iz iste obitelji." },
            { title: "Provjereni mediji", text: "Prikazuju se samo slike i videozapisi izrađeni za PetPrep i provjereni na našem poslužitelju, iz naše pohrane u EU-u." },
            { title: "Obavijesti bez imena djeteta", text: "Obavijesti nikad ne sadrže ime djeteta jer se mogu pojaviti na zaključanom zaslonu. Kao naslov može se prikazati samo ime ljubimca, ako ga ima." },
          ],
        },
        {
          type: "list",
          heading: "Roditelji zadržavaju nadzor",
          items: [
            "Tihi sati za školu i spavanje, bez obavijesti.",
            "Gumb za pauzu koji odmah zaključava djetetov zaslon.",
            "Odjava djeteta sa svih uređaja odjednom.",
            "Izvoz ili brisanje svih podataka odmah, izravno iz aplikacije.",
          ],
        },
        { type: "callout", title: "Prijavi zabrinutost", text: "Ako te nešto u PetPrepu brine, piši nam i odgovorit ćemo prioritetno.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Pristupačnost",
      meta: {
        title: "Pristupačnost – PetPrep za svako dijete",
        description:
          "Kako se PetPrep prilagođava djeci kojima je povlačenje prstom teško, koja koriste VoiceOver ili TalkBack ili im više odgovara manje pokreta – s istim pravilima i bodovima za sve.",
      },
      eyebrow: "Povjerenje",
      title: "Svako dijete može se brinuti o svom ljubimcu.",
      lead: "Nekoj je djeci povlačenje prstom teško, neka koriste čitač zaslona, a nekima više odgovara manje pokreta na zaslonu. PetPrep im se prilagođava – s istim pravilima, istim bodovima i istim certifikatom kao za sve ostale.",
      blocks: [
        {
          type: "cards",
          heading: "U aplikaciji",
          columns: 3,
          items: [
            { title: "Lakše geste", text: "Umjesto povlačenja prstom dijete drži prst na zaslonu ili pritišće gumb – u svim igrama s povlačenjem: četkanju, igri sa štapom s perjem, mijenjanju pijeska i bacanju loptice. Roditelj to uključuje za svako dijete u roditeljskom dijelu aplikacije." },
            { title: "Čitači zaslona", text: "Kad je uključen VoiceOver ili TalkBack, igre se same prebacuju na držanje. Zaglavlje ljubimca naglas čita sve o ljubimcu, a svaki korak u igrama brige zaseban je gumb." },
            { title: "Manje pokreta", text: "Kad je na mobitelu uključeno smanjenje pokreta, gumbi koji pulsiraju i Curio koji se njiše miruju." },
          ],
        },
        {
          type: "cards",
          heading: "Stiže sa sljedećim ažuriranjem aplikacije",
          items: [
            { title: "Šetnje u invalidskim kolicima", text: "U prilagođenom načinu potisci invalidskih kolica računaju se točno kao koraci – jedan potisak jednak je jednom koraku. Roditelj može upisati i današnje minute šetnje, pa dijete ne mora raditi ništa dodatno. Roditelj ga uključuje za svako dijete, a isključivanjem se oznaka uklanja iz povijesti." },
          ],
        },
        { type: "callout", title: "Isti izazov za sve", text: "Prilagodbe mijenjaju način na koji dijete igra, nikad ono što se računa. Bodovi, vremenski okviri i Certifikat o odgovornosti funkcioniraju potpuno jednako. Nikad ne pitamo zašto je djetetu potrebna prilagodba.", tone: "mint" },
        { type: "callout", title: "Ne radi li nešto kako treba za tvoje dijete?", text: "Reci nam što je smetalo, pa ćemo to pogledati.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Brisanje računa",
      meta: {
        title: "Izbriši svoj račun i podatke u PetPrepu",
        description:
          "Kako izbrisati račun u PetPrepu u aplikaciji ili e-poštom, koji se podaci brišu, što se čuva i koliko dugo.",
      },
      eyebrow: "Povjerenje",
      title: "Izbriši svoj račun u PetPrepu",
      lead: "Prijevod – obvezujuća je samo engleska verzija. Svoj račun i podatke svoje obitelji možeš izbrisati u svakom trenutku – odmah u aplikaciji ili e-poštom ako aplikaciju više nemaš.",
      blocks: [
        {
          type: "steps",
          heading: "Izbriši račun u aplikaciji (odmah)",
          items: [
            { title: "Prijavi se kao roditelj", text: "Otvori PetPrep, dodirni „Ja sam roditelj“ i prijavi se." },
            { title: "Otvori svoj račun", text: "Idi na Upravljanje → Račun. Po želji: najprije dodirni „Izvezi moje podatke“ ako želiš zadržati kopiju." },
            { title: "Izbriši", text: "Dodirni „Izbriši račun“, potvrdi lozinkom (ili prijavom putem Googlea / Applea) i upiši DELETE, a zatim dodirni „Izbriši zauvijek“." },
            { title: "Gotovo", text: "Brisanje je trenutačno i ne može se poništiti. Odjavljuju se svi tvoji uređaji i uređaji tvoje djece." },
          ],
        },
        {
          type: "prose",
          heading: "Više nemaš aplikaciju? Zatraži brisanje e-poštom",
          paragraphs: [
            "Piši na [privacy@petprep.si](mailto:privacy@petprep.si) s adrese e-pošte svog roditeljskog računa u PetPrepu, s predmetom „Izbriši moj račun“. Provjerit ćemo dolazi li zahtjev od vlasnika računa, izbrisati račun najkasnije u roku od mjesec dana (obično u nekoliko dana) i potvrditi ti to e-poštom.",
            "Ako želiš izbrisati samo profil jednog djeteta, prijavi se kao roditelj i otvori dijete u izborniku Upravljanje → Djeca → Izbriši profil.",
          ],
        },
        {
          type: "table",
          heading: "Što se briše, a što se čuva",
          head: ["Podaci", "Što se događa"],
          rows: [
            ["Tvoj roditeljski račun (ime, e-pošta, lozinka, poveznica za prijavu putem Googlea / Applea)", "Odmah se briše"],
            ["Ako si jedini roditelj u obitelji: profili djece (nadimak, godina rođenja), ljubimci, AI slike i videozapisi, ugovori i potpisi, dnevnik brige, Care Scoreovi, certifikati, broj koraka, tihi sati, kodovi za prijavu", "Odmah se briše"],
            ["Ako u obitelji ostaje drugi roditelj", "Briše se samo tvoj račun; obitelj ostaje s drugim roditeljem"],
            ["Uređaji i tokeni za obavijesti", "Odmah se odjavljuju i brišu"],
            ["Zapisi o kupnjama (proizvod, datum, ID transakcije u trgovini, anonimni ID kupnje – bez imena i e-pošte)", "Čuvaju se onoliko dugo koliko nalažu računovodstveni i porezni propisi, bez veze s tvojom obitelji"],
            ["Zapisi o troškovima AI-ja", "Čuvaju se za računovodstvo bez ikakve veze s tobom, tvojom djecom ili tvojim ljubimcima"],
            ["Šifrirane sigurnosne kopije", "Automatski se uklanjaju u roku od 35 dana"],
          ],
          note: "Same kupnje obrađuju App Store i Google Play; njihove zapise čuvaju Apple i Google prema vlastitim pravilima. Za izazov koji je kupljen, ali nije završen, novac se pri brisanju računa ne vraća.",
        },
        { type: "callout", title: "Pitanja?", text: "Piši na privacy@petprep.si. Pojedinosti su u našim pravilima privatnosti.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Enciklopedija životinja PetPrep – vrste i pasmine, s izvorima",
        description:
          "Psi, mačke i njihove pasmine: što im treba, kome odgovaraju i kako ih PetPrep simulira. Pretražuj i uspoređuj pasmine; svaki podatak vodi do svog izvora.",
      },
      navLabel: "Životinje",
      eyebrow: "Enciklopedija životinja",
      title: "Upoznaj ljubimca prije nego što stigne kući.",
      lead:
        "Što svakoj vrsti i pasmini u PetPrepu doista treba – iz kinoloških saveza, felinoloških registara, veterinarskih dobrotvornih organizacija i studija, s poveznicama na sve izvore. I pravila po kojima ih PetPrep simulira.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "O PetPrepu – tvrtka, osnivač i kako biramo izvore za podatke o životinjama",
        description:
          "Tko izrađuje PetPrep: osnivač David Tacer, naša misija i kako enciklopedija životinja bira i provjerava izvore svojih podataka.",
      },
      navLabel: "O nama",
      eyebrow: "O nama",
      title: "Tko izrađuje PetPrep.",
      lead: "PetPrep u Mariboru u Sloveniji izrađuje mala softverska tvrtka. Na ovoj stranici pišemo tko smo, zašto gradimo PetPrep i kako odlučujemo što aplikacija i enciklopedija životinja govore o životinjama.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Tvrtka",
          paragraphs: [
            "PetPrep pruža Data Vallis David Tacer s.p., obrt za razvoj softvera (samostalni poduzetnik) sa sjedištem u Dravogradu u Sloveniji. Isti obrt vodi ovu mrežnu stranicu i aplikaciju PetPrep te je voditelj obrade osobnih podataka (vidi [pravila privatnosti](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Osnivač",
          paragraphs: [
            "PetPrep je osnovao David Tacer, programer i poduzetnik iz Maribora u Sloveniji.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Naša misija",
          paragraphs: [
            "Svaka obitelj čuje „Obećavam da ću se brinuti o njemu.“ PetPrep to obećanje pretvara u dokaz: 12 tjedana dijete – ili odrasla osoba koja želi određenu pasminu – brine se o AI ljubimcu koji izgleda kao pravi i ima dnevne potrebe prave životinje, a roditelj svaki dan vidi izdrži li briga.",
            "I neuspjeh u simulaciji dobar je rezultat: obitelj sazna na vrijeme, prije nego što prava životinja pati i prije nego što se obveže na godine brige i troškova. Kad pravi ljubimac ipak stigne kući, želimo da PetPrep ostane koristan cijeli život životinje.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Kako nastaje enciklopedija životinja",
          intro: "[Enciklopedija životinja](page:animals) i aplikacija koriste iste podatke. Ova pravila određuju što u njoj smije pisati:",
          items: [
            "Svaki podatak navodi svoj izvor i povezuje na njega. Izvore razvrstavamo prema težini koju zaslužuju: A – standardi pasmina, recenzirani znanstveni radovi i smjernice veterinarskih udruženja; B – savjetodavne stranice veterinarskih bolnica, sveučilišta i nacionalnih organizacija za dobrobit životinja; C – sekundarni sažeci (enciklopedije, novinski članci), koji se koriste samo uz izvor razine A ili B.",
            "Kao činjenice prikazuju se samo podaci s izvorom. Vrijednost koju ne potkrepljuje nijedan izvor ne objavljuje se. Kad se izvori ne slažu, prikazuje se svaki s vlastitom vrijednošću.",
            "Pravila igre nisu veterinarski savjet. Kad igri treba brojka koju izvori ne navode točno (primjerice dnevni cilj koraka), PetPrep je određuje na temelju izvora i prikazuje je samo pod „Kako je PetPrep simulira“, označenu kao pravilo igre.",
            "Napomene o zdravlju služe samo za informaciju. Sažimaju što izvori govore o pasmini i nije ih pregledao veterinar. Za pravu životinju pitaj veterinara.",
            "Standarde pasmina sažimamo vlastitim riječima, nikad ih ne prepisujemo u većem opsegu i nijednu pasminu ne nazivamo „hipoalergenom“.",
            "Enciklopedija se generira iz PetPrepovih istraživačkih podataka, istih koje koristi aplikacija. Kad se izvor ili vrijednost promijeni, enciklopedija se ponovno izvozi, a stranica svake pasmine prikazuje datum posljednjeg ažuriranja. Ako uočiš pogrešku, piši na hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Pitanja o PetPrepu?", text: "Piši na pravu adresu na stranici za kontakt – obitelji, privatnost, partneri ili investitori.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Upoznaj Curija – maskotu PetPrepa",
        description:
          "Curio je maskota PetPrepa: znatiželjna mala kocka iz našeg logotipa i zvijezda naših kratkih videozapisa. Tko je, po čemu se razlikuje od ljubimca u aplikaciji koji izgleda kao pravi, slike i medijski paket.",
      },
      navLabel: "Upoznaj Curija",
      eyebrow: "Naša maskota",
      title: "Upoznaj Curija.",
      lead: "Curio je znatiželjna mala kocka iz logotipa PetPrepa koja je oživjela. U našim kratkim videozapisima glumi ljubimca koji kraj vrata čeka da netko održi obećanje. On je naša maskota – a ne ljubimac o kojem se brineš u aplikaciji.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskota PetPrepa: mekana grafitna kocka s velikim bijelim očima, malom njuškom boje maline i ogrlicom boje mente, maše.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Tko je Curio?",
          paragraphs: [
            "Curio je nastao kao znak u našem logotipu: zaobljeni grafitni kvadrat s dva velika oka koja gledaju gore udesno i malom njuškom boje maline. Na slovenskom ga zovemo Radovednež – „znatiželjko“. U listopadu 2026. dobio je kratke ručice, zdepaste nožice i ogrlicu boje mente s okruglom pločicom te postao lik.",
            "Curio nema usta. Sve što osjeća vidi se u njegovim očima: širom otvorene kad netko šapne „šetnja?“, dvije pospane crtice kad još nitko nije došao kući, veseli lukovi kad je zdjelica puna.",
            "Curio nije ni dječak ni djevojčica, ni pas ni mačka. On predstavlja svakog ljubimca koji svaki dan čeka da netko održi obećanje.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio ukratko",
          columns: 3,
          items: [
            { title: "Ime", text: "Curio na engleskom, Radovednež na slovenskom." },
            { title: "Od čega je", text: "Mekani grafit, ogrlica boje mente i pločica boje maline – boje PetPrepa." },
            { title: "Govori", text: "Nikad. Samo očima." },
            { title: "Voli", text: "Šetnje, punu zdjelicu i djecu koja se vrate i 15. dana." },
            { title: "Živi", text: "U našim kratkim videozapisima na [TikToku](https://www.tiktok.com/@petprep.si) i [Instagramu](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Posao", text: "Obiteljima uz osmijeh napominje da ljubimac treba brigu baš svaki dan." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio nije ljubimac iz aplikacije",
          intro: "U našim videozapisima Curio glumi ljubimca kojem treba briga, jer briga treba svakom ljubimcu. U PetPrepu se djeca – i odrasli koji isprobavaju pasminu – brinu o nečemu što je mnogo bliže pravoj životinji.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, crtana maskota, maše na svijetloj pozadini.",
              label: "Maskota",
              title: "Curio – naša maskota",
              text: "Crtani lik za naše videozapise, naljepnice i ovu stranicu. Pokazuje o čemu je PetPrep. Ne možeš ga udomiti.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Realističan portret labrador retrivera generiran umjetnom inteligencijom, onakav kako ljubimci izgledaju u aplikaciji PetPrep.",
              label: "U aplikaciji · AI slika",
              tone: "mint",
              title: "Tvoj ljubimac u PetPrepu",
              text: "Realistična AI simulacija prave pasmine – poput ovog [labrador retrivera](+breed:labrador_retriever) – s dnevnim potrebama prave životinje: obroci, voda, šetnje izmjerene stvarnim koracima, čišćenje i dresura. Pogledaj [kako funkcionira](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio na slikama",
          intro: "Curio je stilizirani 3D lik izrađen s pomoću AI alata prema našem vlastitom dizajnu. Nove scene najprije se pojavljuju u našim videozapisima.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio maše na pozadini boje mente.", caption: "Bok! Klasično mahanje.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio stoji na bijeloj polici i maše.", caption: "Na polici, čeka nekoga." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio sprijeda, sa strane i straga, s četiri izraza očiju.", caption: "Sa svih strana i kako mu oči pokazuju osjećaje." },
            { src: "/curio/curio-waving.webp", alt: "Curio na prozirnoj pozadini.", caption: "Izrezan – spreman za tvoju objavu (vidi medijski paket).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Medijski paket",
          intro: "Za kreatore sadržaja, novinare i partnere koji pišu o PetPrepu. Pitanja ili ideje za suradnju: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Preuzmi sve", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, prozirna pozadina", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, kvadrat, svijetla pozadina", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, kvadrat, boja mente", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "List s likom", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logotip PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Znak PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Korištenje Curija",
          rules: [
            "Curija smiješ koristiti u objavama, člancima i videozapisima o PetPrepu. Za oglase, proizvode ili promotivne predmete najprije nas pitaj.",
            "Prikaži Curija onakvog kakav jest: grafitna kocka, bijele oči, njuška boje maline, ogrlica boje mente. Ne dodavaj mu usta, uši, krzno ni obrve, ne mijenjaj mu boje i ne rasteži ga.",
            "Curio je maskota PetPrepa. Ne predstavljaj ga kao ljubimca iz aplikacije ni kao pravog psa ili mačku.",
            "Ne koristi Curija na način koji sugerira da PetPrep podupire neki drugi proizvod, cilj ili osobu.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Pitanja o Curiju",
          items: [
            { q: "Je li Curio pas ili mačka?", a: "Ni jedno ni drugo. Curio je mala kocka iz našeg logotipa. U našim videozapisima glumi ljubimca, ali ne pripada nijednoj vrsti." },
            { q: "Može li se moje dijete brinuti o Curiju u aplikaciji?", a: "Ne. U aplikaciji se tvoja obitelj brine o ljubimcu prave pasmine koji izgleda kao pravi, s istim dnevnim potrebama kao prava životinja. Curio se pojavljuje samo u našim videozapisima i na mrežnoj stranici." },
            { q: "Zašto Curio nema usta?", a: "Zato što ih nema ni naš logotip. Curio sve govori očima – i nikad naglas ne moljaka poslastice." },
            { q: "Gdje mogu vidjeti nove videozapise s Curijem?", a: "Na TikToku i Instagramu, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Znanje o njezi ljubimaca – što psi i mačke smiju jesti, s izvorima | PetPrep",
        description:
          "Koja je hrana otrovna, rizična ili u redu za pse i mačke – razlog, znakovi i što učiniti, s poveznicama na sve izvore. Izradio PetPrep za obitelji koje se pripremaju za ljubimca.",
      },
      navLabel: "Njega",
      eyebrow: "Znanje o njezi",
      title: "Što je sigurno za tvog ljubimca?",
      lead:
        "Jasni odgovori s izvorima za obitelji: koja je hrana otrovna, koja rizična, a koja u redu kao poslastica – za pse i mačke, a uskoro i za druge vrste. Svaki odgovor povezuje svoje izvore.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Besplatne bojanke s psima i mačkama za ispis za djecu | PetPrep",
        description:
          "Besplatne bojanke za ispis: zlatni retriver, labrador, border collie, štene mješanac, mačić i Curio. PDF-ovi u formatima A4 i US Letter, svaki sa stvarnim podatkom o brizi za ljubimca i njegovim izvorom.",
      },
      navLabel: "Bojanke",
      eyebrow: "Bojanke",
      title: "Besplatne bojanke za ispis.",
      lead:
        "Psi, mačke i Curio za bojanje ili precrtavanje – ispiši jednu stranicu ili cijelu knjižicu. Na svakoj je stranici stvaran podatak o brizi za ljubimca iz veterinarskog ili kinološkog izvora, koji možete zajedno pročitati.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Za djecu koja žele ljubimca – bojanke, Curio i #walkyourpet | PetPrep",
        description:
          "Sve što PetPrep ima za djecu: besplatne bojanke za ispis sa stvarnim podacima o brizi za ljubimce, maskota Curio i #walkyourpet – za djecu i roditelje koji se zajedno pripremaju za ljubimca.",
      },
      navLabel: "Za djecu",
      eyebrow: "Za djecu",
      title: "Za djecu koja žele ljubimca.",
      lead: "Bojanke za ispis, Curio i #walkyourpet – za djecu i roditelje koji se zajedno pripremaju za ljubimca.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskota PetPrepa: mekana grafitna kocka s velikim bijelim očima, malom njuškom boje maline i ogrlicom boje mente, maše.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – pokret koji je pokrenulo pravo dijete",
        description:
          "„We could go walk your pet.“ Reklo je to dijete, a sada je to pokret: obitelji izlaze van jer ljubimac treba šetnju. Kako je počelo, što znači u PetPrepu i kako se pridružiti.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Ovu frazu nismo izmislili mi. Izmislilo ju je dijete. Sada je to poziv svakoj obitelji: izađite van jer ljubimac treba svoju šetnju – pravi ljubimac ili onaj s kojim vježbate u PetPrepu.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Kartica s pričom: „Načuto u osnivačevu domu.“ Dijete kaže „Lahko bi šli walk your pet“ – „Mogli bismo ići walk your pet“ – a naslov glasi „#walkyourpet je sada stvar.“", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Kako je počelo",
          paragraphs: [
            "U listopadu 2026. djeci našeg osnivača u posjet je došla prijateljica. Dogovarali su se hoće li izaći van, a ona je rekla, napola na slovenskom, a napola na engleskom: „Lahko bi šli walk your pet“ – „Mogli bismo ići walk your pet.“",
            "Nitko je na to nije nagovorio. Poznavala je PetPrep, u kojem se pseća šetnja računa samo ako stvarno izađeš van, a „walk your pet“ jednostavno je postao razlog za izlazak. Toliko nam se svidjelo da smo to zadržali – na engleskom, za sve jezike.",
            "Pravi razgovor. Prava djeca.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Što to znači u PetPrepu",
          intro: "U PetPrepu je dnevna šetnja psa zapravo stvarni koraci tvog djeteta, očitani iz aplikacije Apple Health ili Health Connect ako to dopustiš. Sjedenje na kauču ne računa se, pa „walk your pet“ uvijek znači izaći van. Bez GPS-a i bez lokacije – samo koraci.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Pridruži se pokretu",
          intro: "Za to ti ne treba aplikacija. Svaka obitelj koja izađe van zbog ljubimca – pravog ili onog za vježbu – dio je pokreta.",
          items: [
            { title: "Izađi van", text: "Izvedi psa u šetnju. Ili, ako još razmišljaš o ljubimcu, prošetaj kao da ga već imaš." },
            { title: "Uhvati trenutak", text: "Cipele kraj vrata, povodac, staza, šape na travi. Bez lica, bez imena." },
            { title: "Podijeli ga", text: "Objavi ga uz #walkyourpet i označi @petprep.si na Instagramu ili TikToku. Uz tvoje dopuštenje najljepše trenutke možemo podijeliti ovdje i na svojim profilima." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Sigurno dijeljenje",
          intro: "U središtu #walkyourpet su djeca, zato za sve što dijelimo vrijede ova pravila:",
          items: [
            "Objavljuju roditelji, ne djeca. Samo roditelj odlučuje što ide na internet.",
            "Bez dječjih lica, imena, škola ili adresa – i nikad dijete iz druge obitelji.",
            "Ponovno objavljujemo samo uz dopuštenje roditelja i uklanjamo objavu kad god to zatražiš.",
            "Dječje izjave uvijek su stvarne. Nikad ne izmišljamo ni „uljepšavamo“ ono što je dijete reklo.",
            "To je poziv, a ne obveza. Nema niza dana koji moraš održati, nema pritiska – samo dobar razlog da izađeš van.",
          ],
        },
        {
          type: "callout",
          title: "Prvi je trenutak naš. Sljedeći bi mogao biti tvoj.",
          text: "Podijeli šetnju svoje obitelji uz #walkyourpet i označi @petprep.si. Pitanja ili priča koju bi htio ispričati: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Pitanja",
          items: [
            { q: "Treba li mi PetPrep za pridruživanje?", a: "Ne. #walkyourpet može koristiti svatko tko izađe van zbog ljubimca. PetPrep je mjesto gdje je fraza nastala i gdje se šetnja psa za vježbu mjeri samo stvarnim koracima." },
            { q: "Vrijedi li to za mačke u PetPrepu?", a: "Ne kao šetnja. Mačke ne idu u šetnje, pa se u PetPrepu mačje potrebe zadovoljavaju igrom, a ne koracima. Šetnja je za pse." },
            { q: "Zašto je fraza na engleskom?", a: "Zato što ju je dijete tako izgovorilo – na engleskom usred slovenske rečenice. Djeca posvuda ubacuju engleske riječi, pa fraza ostaje ista na svim jezicima." },
            { q: "Hoćete li objaviti moje dijete?", a: "Samo ono što sam podijeliš i dopustiš nam ponovno objaviti, i nikad djetetovo lice ni ime. Javi nam se na hello@petprep.si i uklonit ćemo to." },
          ],
        },
      ],
    },
  },
};

export default hr;
