import type { Dictionary } from "./types";

const sl: Dictionary = {
  meta: {
    siteTitle: "PetPrep — Pripravljeni na žival. Ob njej vse življenje.",
    siteDescription:
      "PetPrep je 12-tedenski simulator hišnega ljubljenčka, ki staršem pokaže, ali je otrok res pripravljen na pravo žival — nato pa postane AI asistent za vse življenje prave živali.",
    slogan: "Pripravljeni na žival. Ob njej vse življenje.",
    keywords: [
      "ali je otrok pripravljen na psa",
      "aplikacija za odgovornost otrok",
      "virtualni ljubljenček",
      "simulator psa",
      "pred nakupom psa",
      "otroci in hišni ljubljenčki",
      "test pripravljenosti",
      "nadzorna plošča za starše",
      "preizkus pasme pred nakupom",
      "je ta pasma res zame",
    ],
  },
  nav: { home: "Domov", menu: "Meni", close: "Zapri meni", skip: "Preskoči na vsebino" },
  lang: { label: "Jezik", switchTo: "Zamenjaj jezik" },
  cta: {
    primary: "Začni brezplačno z mešančkom",
    secondary: "Poglej, kako deluje",
    earlyAccess: "Prijava na zgodnji dostop",
    earlyAccessSubject: "PetPrep zgodnji dostop",
    ios: "Prenesi za iPhone",
    android: "Prenesi za Android",
    comingSoon: "Kmalu za iPhone in Android",
    readMore: "Več",
    contactUs: "Pišite nam",
  },
  common: {
    planned: "V razvoju",
    plannedNote:
      "Ta stran opisuje, kar gradimo naslednje. V aplikaciji še ni na voljo, podrobnosti se lahko še spremenijo.",
    legalDraft:
      "Besedilo pred javnim začetkom dokončujemo s pravnimi svetovalci. Če vam karkoli ni jasno, nam pišite.",
    lastUpdated: "Zadnja posodobitev",
    breadcrumbHome: "Domov",
    screensNote: "Zasloni aplikacije na tej strani so predogled izdelka; končna aplikacija je lahko videti nekoliko drugače.",
    perPet: "na žival",
    free: "Brezplačno",
    forever: "za vedno",
    notFoundTitle: "Ta stran je ušla s povodca.",
    notFoundText: "Stran, ki jo iščete, ne obstaja ali je bila premaknjena.",
    notFoundCta: "Nazaj na domačo stran",
  },
  footer: {
    tagline: "Pripravljeni na žival. Ob njej vse življenje.",
    groups: [
      { title: "Izdelek", links: ["howItWorks", "parents", "animals", "afterAdoption", "pricing", "faq"] },
      { title: "Podjetje", links: ["about", "partners", "investors", "contact"] },
      { title: "Zaupanje", links: ["privacy", "terms", "childSafety"] },
    ],
    rights: "Vse pravice pridržane.",
    dataEu: "Podatki so shranjeni v EU.",
    languages: "Več jezikov kmalu.",
    company: "PetPrep je izdelek podjetja",
    cookieSettings: "Nastavitve piškotkov",
  },
  screens: {
    pin: "Otrok se prijavi s 6-mestno kodo staršev — brez e-pošte in gesla.",
    contract: "Pogodba o odgovornosti, podpisana s prstom. Ob podpisu se ljubljenček rodi.",
    hud: "Otrokov glavni zaslon: stanje ljubljenčka v živo, štiri potrebe in gumbi za skrb.",
    picker: "Starši izberejo ljubljenčka: pasmo, izvor (posvojen ali od vzreditelja) in starost ob prihodu.",
    parent: "Nadzorna plošča za starše: semafor, Care Score in današnje rutine za vsakega otroka.",
    report: "Poročilo otroka za 7, 30 ali 84 dni: rutine, sprehodi in zamujene naloge po dnevih.",
    assistant: "Ko pride domov: AI asistent podatke z ovratnice prevede v en jasen predlog.",
    certificate: "Po 12 tednih: Certifikat odgovornosti z otrokovim Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Mešanček",
      text: "Celotna simulacija z življenjskim mešančkom.",
      features: [
        "12-tedenska simulacija z resničnimi posledicami",
        "Pravi sprehodi s koraki s senzorja telefona",
        "Nadzorna plošča za starše, semafor in Care Score",
        "Tihe ure in gumb za premor",
        "Fotorealistična slika ljubljenčka in kratki videi",
      ],
      cta: "Začni brezplačno",
    },
    challenge: {
      name: "12-tedenski PetPrep izziv",
      badge: "12 tednov + certifikat",
      unit: "na žival · 12 tednov",
      text: "Za družine, ki želijo celotno izkušnjo in certifikat na koncu.",
      features: [
        "Vse iz paketa Mešanček",
        "Zahtevne pasme, na primer [border collie](breed:border_collie)",
        "Razpoloženja ljubljenčka kot AI videi",
        "Certifikat odgovornosti",
        "Ena cena, ko si sorojenci delijo ljubljenčka",
        "Dostop za oba starša",
      ],
      cta: "Izberi izziv",
    },
    note:
      "Nakup poteka v aplikaciji prek App Store ali Google Play. Drugi ljubljenček v isti družini je ločen izziv. Cene vključujejo DDV, kjer se obračuna.",
  },
  earlyAccess: {
    title: "Prijava na zgodnji dostop",
    text: "Bodite med prvimi družinami, ki preizkusijo PetPrep. Pisali vam bomo, ko bo pripravljen — nič drugega.",
    label: "Vaš e-poštni naslov",
    placeholder: "vi@primer.si",
    button: "Prijava na zgodnji dostop",
    sending: "Pošiljam …",
    successTitle: "Ste na seznamu.",
    successText: "Hvala! Ko bo PetPrep pripravljen, vam pišemo med prvimi.",
    invalid: "Vpišite veljaven e-poštni naslov.",
    error: "Nekaj je šlo narobe. Poskusite znova čez trenutek.",
    consent: "S prijavo se strinjate, da vam pošiljamo e-pošto o PetPrep. Odjava je mogoča kadarkoli.",
    privacyLink: "Politika zasebnosti",
  },
  contactCards: [
    { title: "Družine", text: "Vprašanja o aplikaciji, računu ali izzivu.", email: "hello" },
    { title: "Zasebnost", text: "Dostop do podatkov, izvoz, izbris ali drugo vprašanje o zasebnosti.", email: "privacy" },
    { title: "Partnerji", text: "Trgovine, zavetišča, veterinarji, šole za pse, zavarovalnice in šole.", email: "partners" },
    { title: "Vlagatelji", text: "Predstavitev za vlagatelje, prezentacija in podatkovna soba na zahtevo.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep — Je vaš otrok pripravljen na žival? Ugotovite v 12 tednih.",
      description:
        "Preden pride prava žival domov, otrok 12 tednov skrbi za AI ljubljenčka: hrana, čiščenje, pravi sprehodi. Vsak dan vidite, ali je res pripravljen.",
    },
    hero: {
      eyebrow: "12-tedenski PetPrep izziv",
      title: "Pripravljeni na žival. Ob njej vse življenje.",
      lead:
        "Preden pride domov prava žival, otrok 12 tednov skrbi za življenjskega AI ljubljenčka — ga hrani, čisti za njim in z njim zares hodi na sprehode. Vi vsak dan vidite, ali je res pripravljen.",
      trust: ["Mešanček brezplačno za vedno", "Brez oglasov in klepeta s tujci", "Otrok ne potrebuje e-pošte"],
    },
    phone: {
      petName: "Luna",
      petAge: "Mladiček · 3 mesece",
      live: "V ŽIVO",
      video: "Fotorealističen AI video ljubljenčka",
      actions: ["Hrani", "Voda", "Sprehod", "Počisti"],
    },
    parentCard: { child: "Maja", status: "Vse v redu", scoreLabel: "Care Score", progress: "Teden 3 od 12 · 31 od 36 rutin pravočasno" },
    notification: { app: "PetPrep", text: "Kuža te milo gleda in kaže na posodo s hrano. Zajtrk je do 9:00." },
    promise: {
      quote: "Vsaka družina sliši »Obljubim, da bom skrbel zanj.« PetPrep obljubo spremeni v",
      highlight: "dokaz",
      text:
        "Neuspeh v simulaciji je uspeh za vašo družino: izveste, preden bi trpela prava žival — in preden se zavežete letom skrbi in stroškov.",
    },
    how: {
      eyebrow: "Kako deluje",
      title: "Trije koraki od »prosim« do »pripravljen«.",
      steps: [
        {
          title: "Vi izberete ljubljenčka",
          text: "Ustvarite družinski račun, dodate otroka samo z vzdevkom in izberete ljubljenčka — pasmo, posvojen ali od vzreditelja, mladiček ali starejši.",
        },
        {
          title: "Otrok podpiše obljubo",
          text: "Otrok se prijavi s 6-mestno kodo — brez e-pošte in gesla. S prstom podpiše Pogodbo o odgovornosti in njegov edinstveni ljubljenček se rodi.",
        },
        {
          title: "12 tednov prave skrbi",
          text: "En pravi teden je en mesec ljubljenčkovega življenja. Na koncu: Certifikat odgovornosti s Care Score — objektiven dokaz ali pošten ne.",
        },
      ],
      link: "Kako deluje podrobno",
    },
    realism: {
      title: "Tako blizu pravemu ljubljenčku, kot zmore aplikacija.",
      text: "Časi hranjenja, sprehodi in odraščanje temeljijo na virih, kot so veterinarska združenja in kinološke zveze — niso izmišljeni za igro.",
      items: [
        { title: "Pravi sprehodi, pravi koraki", text: "Dnevni sprehod šteje korake z otrokovega telefona. Danes nobenega sprehoda? Ljubljenček bo to čutil jutri." },
        { title: "Odrašča", text: "Mladiček je štirikrat na dan, nato trikrat, nato dvakrat — in ko zraste, dobi novo fotografijo." },
        { title: "Obnaša se kot pravi", text: "Mladiček mora ven. Pes, ki se dolgočasi, pregrize copat. Nered je treba počistiti pred večerjo." },
        { title: "Spoštuje šolo in spanje", text: "Tihe ure ustavijo opomnike. Obrok med poukom je vaš, ne otrokov." },
        { title: "Resnične, a nežne posledice", text: "Zanemarjanje pomeni obisk pri veterinarju ali zavetišče — nikoli strašljivo, vedno z novim začetkom." },
        { title: "Edinstven", text: "Vsak ljubljenček ima svojo dlako, lise in oči — fotorealističen in nikoli dvakrat enak." },
      ],
    },
    parents: {
      eyebrow: "Za starše",
      title: "Resnico vidite v živo.",
      text: "Jasen semafor za vsakega otroka, Care Score iz pravočasno opravljenih rutin in časovnica, kdo je kaj naredil. Sorojenci s skupnim ljubljenčkom imajo vsak svojo pošteno oceno.",
      points: [
        { strong: "Tihe ure in gumb za premor", text: "nadzor ostane pri vas." },
        { strong: "Otroci se prijavijo s kodo", text: "brez e-pošte, priimka in oglasov." },
        { strong: "Oba starša, vsi otroci", text: "ena družina, en pregled." },
      ],
      link: "Vse, kar vidijo starši",
    },
    adults: {
      eyebrow: "Za odrasle",
      title: "Preizkusite pasmo, preden jo pripeljete domov.",
      text: "Si želite točno določeno pasmo? PetPrep ni samo za otroke. 12 tednov skrbite za AI ljubljenčka te pasme z njenimi resničnimi dnevnimi potrebami in vidite, ali je res za vas — preden jo kupite ali posvojite.",
      points: [
        {
          strong: "Resnične potrebe pasme",
          text: "obroki v časovnih oknih, voda, čiščenje in dnevni cilj korakov iz virov o potrebnem gibanju: odrasel border collie 12.000 korakov na dan, mešanček 6.000.",
        },
        {
          strong: "Šolanje in nezgode mladička",
          text: "vsak dan kratka vaja ukazov, mladiček pa zdrži le približno eno uro na mesec starosti, nato mora ven — sicer je na tleh luža.",
        },
        {
          strong: "12 tednov pokaže, ali gre skupaj z vašim življenjem",
          text: "z delovnikom, prostim časom in vremenom. Ker bo pes družinski, lahko kasneje dodate partnerja ali otroke.",
        },
      ],
      how: "Kako začnete: ustvarite račun kot starš, dodajte sebe kot profil skrbnika in se prijavite s 6-mestno kodo — na istem ali drugem telefonu.",
      note: "Danes sta na voljo mešanček (brezplačno) in [border collie](breed:border_collie) (v 12-tedenskem izzivu).",
      link: "Kako PetPrep uporabljate sami",
    },
    after: {
      eyebrow: "Ko pride domov",
      title: "Ko pride prava žival, PetPrep ostane.",
      text: "Tapnite »Dobili smo pravo žival« in simulator postane AI asistent za leta, ki prihajajo — in že pozna ritem vaše družine.",
      features: [
        { title: "Pametna ovratnica", text: "Aktivnost in opozorila, ko nekaj ni v redu." },
        { title: "AI prvi stik", text: "Hiter odgovor, nato predaja pravemu veterinarju." },
        { title: "Rast in prehrana", text: "Tedenska teža, krivulja rasti, čas za menjavo hrane." },
        { title: "Zaupanja vredni partnerji", text: "Veterinarji, šole za pse in zavarovalnice v bližini — jasno označeni." },
      ],
      link: "O AI asistentu",
      planned: "V razvoju",
    },
    species: {
      title: "Danes psi. Kmalu še druge živali.",
      text: "Narejen za družine po vsem svetu, v njihovem jeziku.",
      chips: [
        { label: "Pes · na voljo", active: true, link: "species:dog" },
        { label: "Border collie · v izzivu", link: "breed:border_collie" },
        { label: "Mačka · naslednja", link: "species:cat" },
        { label: "Druge vrste · v načrtu", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Cenik", title: "Preprosto in pošteno." },
    faq: { title: "Vprašanja staršev", link: "Vsa vprašanja" },
    final: { title: "Pripravljeni na žival?", text: "Ugotovite v 12 tednih. Začnite brezplačno, na iPhonu ali Androidu." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Kako deluje PetPrep — 12-tedenski izziv pripravljenosti na žival",
        description:
          "Kako poteka PetPrep izziv: izbira ljubljenčka, Pogodba o odgovornosti, vsakodnevna skrb, pravi sprehodi, tihe ure, posledice in Certifikat odgovornosti.",
      },
      eyebrow: "Kako deluje",
      title: "Dvanajst tednov, ki pokažejo, koliko je vredna obljuba.",
      lead:
        "Otrok skrbi za fotorealističnega AI ljubljenčka, ki se obnaša čim bolj kot pravi. En pravi teden je en mesec ljubljenčkovega življenja, zato v 12 tednih odraste — vi pa vidite, ali skrb zdrži.",
      blocks: [
        {
          type: "steps",
          heading: "Od prvega dotika do certifikata",
          items: [
            { title: "Starš ustvari družino", text: "Registrirate se z e-pošto (prijava z Apple in Google prihaja). Vsakega otroka dodate z vzdevkom in po želji z letnico rojstva. To je vse, kar vprašamo o otroku." },
            { title: "Izberete ljubljenčka", text: "Izberete pasmo (mešanček je brezplačen), od kod pride — posvojen iz zavetišča ali kupljen pri vzreditelju — in starost ob prihodu: mladiček, mlad, odrasel ali starejši." },
            { title: "Otrok se prijavi s kodo", text: "Dobite 6-mestno kodo, ki velja 15 minut. Otrok jo vtipka na svojem telefonu — brez e-pošte in gesla. Izgubljen telefon? Z enim dotikom ga odjavite z vseh naprav." },
            { title: "Pogodba o odgovornosti", text: "Otrok s prstom podpiše obljubo. Podpis je rojstvo ljubljenčka: potrebe začnejo teči šele takrat, zato otrok ne izgubi ničesar, če podpiše kasneje." },
            { title: "Dvanajst tednov skrbi", text: "Hranjenje v pravih časovnih oknih, sveža voda, čiščenje in vsakodnevni sprehod s pravimi koraki. Ko ljubljenček raste, se njegove potrebe spreminjajo." },
            { title: "Certifikat", text: "Po 12 tednih ljubljenček dopolni eno leto. Otrok prejme Certifikat odgovornosti s svojim Care Score — ali pa oba varno ugotovita, da zdaj še ni pravi čas." },
          ],
        },
        {
          type: "screens",
          heading: "Kaj vidi otrok",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Kaj odrasel mešanček potrebuje vsak dan",
          intro: "Številke izhajajo iz veterinarskih in kinoloških virov; kjer viri podajo le razpon, vrednost postavi PetPrep in to tudi pove.",
          head: ["Potreba", "Kako pogosto", "Če otrok pozabi"],
          rows: [
            ["Hrana", "Zjutraj (6–10) in zvečer (17–21), enkrat v vsakem oknu", "Lačen po približno 12,5 ure"],
            ["Voda", "3-krat na dan, vsaj 3 ure narazen", "Žejen po približno 10 urah"],
            ["Sprehod", "6.000 pravih korakov (mladiček začne pri 2.000)", "Brez sprehoda → naslednje jutro zboli"],
            ["Čiščenje", "Ko naredi nered — nikoli med tihimi urami", "Hrane in vode ni, dokler ni čisto"],
          ],
          note: "Mladiček je 4-, nato 3- in 2-krat na dan in zdrži le približno eno uro na mesec starosti, nato mora ven. [Border collie](breed:border_collie) potrebuje 12.000 korakov in hitreje postane lačen.",
        },
        {
          type: "cards",
          heading: "Prilagojeno resničnemu družinskemu življenju",
          columns: 3,
          items: [
            { title: "Tihe ure", text: "Nastavite čas šole in spanja. Ljubljenček se upočasni, opomnikov ni in nered se takrat nikoli ne zgodi." },
            { title: "Obroki med poukom", text: "Okno hranjenja, ki v celoti pade v tihe ure, je naloga starša — otroku se nikoli ne šteje v slabo." },
            { title: "Premor kadarkoli", text: "En gumb ustavi igro, na primer za družinski pogovor. Med premorom se nič ne poslabša." },
            { title: "Nežni opomniki", text: "Ljubljenček otroka najprej opomni, nato nujno. Šele če potreba ostane na ničli eno uro, dobite alarm vi." },
            { title: "Resnične posledice", text: "Zanemarjanje pomeni 12 ur pri veterinarju. Cel dan brez skrbi pomeni, da ljubljenčka odpelje zavetišče — in lahko začnete znova." },
            { title: "Skupni ljubljenček", text: "Sorojenci si lahko delijo ljubljenčka. Vsako dejanje se šteje otroku, ki ga je naredil, zato je ocena poštena." },
          ],
        },
        {
          type: "callout",
          title: "Tudi neuspeh je rezultat.",
          text: "Če ljubljenček konča v virtualnem zavetišču, ste se naučili nekaj dragocenega — preden je ceno plačala prava žival. Lahko začnete znova, tudi z lažjo pasmo.",
          tone: "mint",
        },
      ],
    },
    parents: {
      meta: {
        title: "Za starše — PetPrep nadzorna plošča, Care Score in nadzor",
        description:
          "Kaj vidijo starši v PetPrep: dnevni semafor za vsakega otroka, Care Score, rutine, poročila, obvestila, tihe ure, premor in zasebnost po zasnovi.",
      },
      eyebrow: "Za starše",
      title: "Objektiven dokaz, ne še ena obljuba.",
      lead:
        "Ne bo vam treba ugibati, ali so bili sprehodi res opravljeni. PetPrep skrb meri z jasnimi dnevnimi rutinami in vam za vsakega otroka posebej pokaže, kako mu gre.",
      blocks: [
        {
          type: "cards",
          heading: "Semafor",
          intro: "Vsak otrok in vsak ljubljenček dobi barvo za današnji dan po lokalnem času vaše družine — vedno z razlogom v besedah.",
          columns: 3,
          items: [
            { title: "Zelena — vse v redu", text: "Rutine potekajo po načrtu.", tag: "ok" },
            { title: "Rumena — potrebna pozornost", text: "Danes sta bili zamujeni več kot dve rutini.", tag: "warn" },
            { title: "Rdeča — nujno", text: "Ljubljenček je danes zbolel, potreba je več kot uro na ničli ali pa ga je odpeljalo zavetišče.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = pravočasno opravljene rutine ÷ pričakovane rutine × 100, minus 10 točk za vsako bolezen, med 0 in 100.",
            "Rutina je ena konkretna naloga: vsako okno hranjenja, vsako od treh dolivanj vode, čiščenje vsakega nereda v dveh urah (šola in spanje se ne štejeta) in dosežen dnevni cilj sprehoda.",
            "Čas, ko ste igro ustavili, ko je bil ljubljenček pri veterinarju, ali pred podpisom pogodbe, se otroku nikoli ne šteje v slabo. Pretekli dnevi so zaklenjeni, zato ocene ni mogoče kasneje spremeniti.",
            "Sorojenci s skupnim ljubljenčkom si vsako rutino pošteno razdelijo. Šteje le, kar je otrok naredil sam — če eden naredi vse, ima 100, drugi 0.",
          ],
        },
        {
          type: "screens",
          heading: "Vaš pogled",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Nadzor ostane pri vas",
          items: [
            "Tihe ure za šolo in spanje po vašem lokalnem času — tudi ob prestopu na poletni ali zimski čas.",
            "Premor za kateregakoli ljubljenčka z enim potrjenim dotikom; otrokov zaslon se zaklene v živo.",
            "Drugega starša povabite z enkratno kodo; oba vidita vse otroke in vse ljubljenčke.",
            "Otroka ob izgubi telefona odjavite z vseh naprav; kode so enkratne in potečejo v 15 minutah.",
            "Vse podatke družine izvozite v datoteko ali takoj izbrišite profil otroka ali celoten račun kar v aplikaciji.",
          ],
        },
        {
          type: "list",
          heading: "Zasebnost po zasnovi",
          items: [
            "Otroci se prijavijo s kodo — brez e-pošte, gesla in priimka.",
            "Shranimo vzdevek in, če ga vpišete, letnico rojstva. O otroku nič drugega.",
            "Obvestila nikoli ne vsebujejo imena otroka ali ljubljenčka, saj se lahko pokažejo na zaklenjenem zaslonu.",
            "Koraki prihajajo s senzorja gibanja v telefonu. PetPrep ne uporablja GPS in ne sledi lokaciji.",
            "Brez oglasov, brez klepeta s tujci, strežniki v EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Ko pride domov — PetPrep AI asistent za vašo pravo žival",
        description:
          "Ko družina dobi pravo žival, PetPrep postane AI asistent: aktivnost z ovratnice, opozorila, AI prvi stik s pravim veterinarjem, rast in prehrana.",
      },
      eyebrow: "Ko pride domov",
      title: "Simulacija se konča. Skrb ne.",
      lead:
        "Ko družina domov pripelje pravo žival, en dotik PetPrep spremeni v asistenta za vse njeno življenje — v realnem času, brez virtualnih metrik in z že znanim ritmom vaše družine.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Kaj bo asistent znal",
          columns: 2,
          items: [
            { title: "Povezava s pametno ovratnico", text: "Povežite priljubljene GPS in sledilnike aktivnosti — ali PetPrep ovratnico — in aktivnost vidite v kontekstu." },
            { title: "Opozorila, ki pojasnijo", text: "»Max je danes pretekel 2 km, polovico manj kot običajno, in dobil večji obrok. Dodaten večerni sprehod mu bo pomagal, da se umiri.« Eno opažanje, en razlog, en predlog." },
            { title: "Najprej AI, nato pravi veterinar", text: "Postavite vprašanje ali naložite fotografijo. Asistent odgovori na splošna vprašanja, oceni nujnost in vas po potrebi preda pravemu veterinarju — nujni znaki gredo naravnost k veterinarju." },
            { title: "Rast in prehrana", text: "Tedensko vpišete težo, vidite krivuljo rasti in dobite opomnik, ko je čas za drugo hrano." },
          ],
        },
        {
          type: "screens",
          heading: "Predogled",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Načela, pri katerih ne popuščamo",
          items: [
            "AI asistent ni veterinar in nikoli ne postavi diagnoze. Vsak zdravstveni odgovor vsebuje pot do pravega veterinarja.",
            "Ponudbe partnerjev (trgovine, zavarovalnice, šole za pse, veterinarji) so vedno označene, provizijo pa razkrijemo.",
            "Brez vašega soglasja partnerju ne posredujemo ničesar.",
            "Otrokovi podatki iz izziva se prenesejo k asistentu le, če se strinjate.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Cenik — PetPrep je brezplačen za začetek, 12-tedenski izziv 49,99 €",
        description:
          "Mešanček je brezplačen za vedno. 12-tedenski PetPrep izziv stane 49,99 € na žival kot enkratni nakup. Ena cena za sorojence s skupnim ljubljenčkom.",
      },
      eyebrow: "Cenik",
      title: "Preprosto in pošteno.",
      lead: "Začnite brezplačno z mešančkom. Celoten 12-tedenski izziv kupite, ko ste pripravljeni — 12 tednov začne teči z nakupom.",
      blocks: [
        { type: "pricing" },
        {
          type: "faq",
          heading: "Vprašanja o ceni",
          items: [
            { q: "Je brezplačna različica res brezplačna?", a: "Da. Mešanček je brezplačen za vedno, s celotno simulacijo, pravimi sprehodi in nadzorno ploščo za starše." },
            { q: "Kaj vključuje izziv?", a: "Zahtevne pasme, kot je [border collie](breed:border_collie), razpoloženja ljubljenčka kot AI videje, Certifikat odgovornosti na koncu in dostop za oba starša." },
            { q: "Ali sorojenci plačajo dvakrat?", a: "Ne. Otroci, ki si delijo enega ljubljenčka, plačajo eno ceno. Drugi ljubljenček v družini je ločen izziv." },
            { q: "Kako plačam?", a: "V aplikaciji, prek App Store ali Google Play. Morebitna vračila urejate v svojem računu trgovine." },
            { q: "Velja enako tudi za odrasle?", a: "Da. Če PetPrep uporabljate sami, da preizkusite pasmo, velja isto: mešanček je brezplačen za vedno, 12-tedenski izziv stane 49,99 € na žival." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Pogosta vprašanja — kaj starši sprašujejo o PetPrep",
        description:
          "Odgovori o PetPrep: koliko časa vzame, uporaba za odrasle, zasebnost, lokacija, koraki, sorojenci, kaj če otrok ne uspe, jeziki in vrste živali.",
      },
      eyebrow: "Pogosta vprašanja",
      title: "Vprašanja staršev.",
      lead: "Kratki, pošteni odgovori. Kaj manjka? Pišite nam.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Za katero starost je PetPrep?", a: "Za otroke je namenjen od približno 7 do 12 let in dobro deluje do 16. Uporabljajo ga tudi odrasli, ki želijo pred nakupom ali posvojitvijo preizkusiti, ali je določena pasma res zanje." },
            { q: "Lahko PetPrep uporabljam sam, brez otrok?", a: "Da. Ustvarite račun kot starš in dodajte sebe kot profil skrbnika — dovolj je vzdevek, letnice rojstva ne vpišete. Izberete pasmo, ustvarite 6-mestno kodo, nato na istem ali drugem telefonu izberete »Sem otrok« in vtipkate kodo — tako skrbite vi. Ker bo pes družinski, lahko kasneje dodate partnerja ali otroke, da skrbite skupaj. Cena je enaka kot za družine." },
            { q: "Koliko časa vzame na dan?", a: "Nekaj minut za hrano, vodo in čiščenje — in sprehod, ki bi ga pravi pes tako ali tako potreboval." },
            { q: "Ali aplikacija sledi lokaciji otroka?", a: "Ne. Šteje le korake s senzorja gibanja v telefonu in za to dovoljenje vpraša, ko otrok odpre sprehod. GPS se ne uporablja." },
            { q: "Ali otrok potrebuje e-poštni naslov?", a: "Ne. Račun ustvarite vi; otrok se prijavi s 6-mestno kodo, ki jo ustvarite. Shranimo le vzdevek in po želji letnico rojstva." },
            { q: "Kaj se zgodi, če otrok pozabi?", a: "Ljubljenček najprej pošlje nežne opomnike. Če potreba ostane na ničli, zboli in 12 ur preživi pri veterinarju. Po celem dnevu brez skrbi ga odpelje virtualno zavetišče — in lahko začnete znova." },
            { q: "Ali si lahko sorojenci delijo ljubljenčka?", a: "Da. Vsak otrok podpiše svojo pogodbo, vsako dejanje se šteje tistemu, ki ga je naredil, in vsak dobi svoj pošten Care Score." },
            { q: "Kaj pa šola in spanje?", a: "Nastavite tihe ure. Ljubljenček se upočasni, obvestil ni, obroke, ki v celoti padejo v tihe ure, pa opravite vi." },
            { q: "Je za otroke strašljivo?", a: "Ne. Posledice so resnične, a nežne: ljubljenček gre k veterinarju ali v zavetišče, nikoli nič grafičnega, in vedno obstaja nov začetek." },
            { q: "Katere živali so na voljo?", a: "Danes [psi](species:dog): brezplačni mešanček in [border collie](breed:border_collie). Naslednja je [mačka](species:cat), druge vrste so v načrtu. V [registru živali](page:animals) so vse vrste in pasme s potrebami iz virov." },
            { q: "V katerih jezikih?", a: "Danes v angleščini in slovenščini. Več jezikov dodajamo, ko PetPrep prihaja v nove države." },
            { q: "Kaj se zgodi, ko dobimo pravo žival?", a: "PetPrep lahko postane AI asistent za vašo pravo žival. Ta del je v razvoju." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partnerji — sodelujte s PetPrep",
        description:
          "PetPrep sodeluje s trgovinami za male živali, zavetišči, veterinarji, šolami za pse, zavarovalnicami in šolami za odgovorno pridobivanje živali.",
      },
      eyebrow: "Partnerji",
      title: "Bolje pripravljene družine za vse, ki jim je mar za živali.",
      lead:
        "Družine, ki končajo PetPrep, vedo, kaj žival zares zahteva. Gradimo partnersko mrežo, ki jih doseže v pravem trenutku — jasno označeno in vedno s soglasjem družine.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "S kom sodelujemo",
          columns: 3,
          items: [
            { title: "Trgovine za male živali", text: "Dosezite družine v trenutku, ko dokažejo, da so pripravljene — na primer s ponudbo začetnega paketa ob certifikatu." },
            { title: "Zavetišča, društva in vzreditelji", text: "Priporočite PetPrep pred posvojitvijo ali nakupom za manj impulzivnih odločitev in vračil." },
            { title: "Veterinarji", text: "Ko pride prava žival domov, AI asistent odgovori na prva vprašanja in lastnike napoti k vam, s povzetkom primera le ob soglasju." },
            { title: "Šole za pse", text: "Priporočila in rezervacije, ko družina dobi pravega psa." },
            { title: "Zavarovalnice za male živali", text: "Ponudbe glede na pasmo ob registraciji prave živali — jasno označene." },
            { title: "Proizvajalci ovratnic in IoT", text: "Povezava podatkov o aktivnosti za pametnejša, pojasnjena opozorila." },
          ],
        },
        {
          type: "list",
          heading: "Zakaj nam partnerji zaupajo",
          items: [
            "Otroci se prijavijo brez e-pošte, podatke hranimo minimalno in na strežnikih v EU.",
            "Na otrokov zaslon pride samo preverjena vsebina; oglasov ni.",
            "Vsaka partnerska ponudba je označena, vsaka provizija razkrita družini.",
          ],
        },
        { type: "callout", title: "Pogovorimo se.", text: "Pogoje sodelovanja pripravljamo. Povejte nam, kdo ste in kaj imate v mislih.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Vlagatelji — PetPrep, od preizkusa pripravljenosti do skrbi za žival",
        description:
          "PetPrep otrokovo obljubo spremeni v dokaz, preden družina dobi žival, nato pa postane AI asistent za vse njeno življenje. Predstavitev na zahtevo.",
      },
      eyebrow: "Vlagatelji",
      title: "Od 12-tedenskega izziva do 10–15-letnega odnosa.",
      lead:
        "PetPrep staršem da objektiven dokaz, ali je otrok pripravljen na pravo žival — nato pa ostane z družino vse življenje živali.",
      blocks: [
        {
          type: "cards",
          heading: "Priložnost",
          columns: 3,
          items: [
            { title: "Problem", text: "Otroci obljubijo skrb za žival; starši je nimajo s čim nevtralno preveriti, preden vložijo denar in leta skrbi." },
            { title: "Rešitev", text: "Realistična 12-tedenska simulacija z nadzorno ploščo za starše v živo in objektivnim Care Score, ki se konča s Certifikatom odgovornosti." },
            { title: "Širitev", text: "Ko pride prava žival domov, AI asistent zanjo: podatki z ovratnice, AI prvi stik z veterinarji, rast in prehrana, partnerske storitve." },
          ],
        },
        {
          type: "table",
          heading: "Poslovni model",
          head: ["Vir", "Model", "Stanje"],
          rows: [
            ["Mešanček", "Brezplačno za vedno (pridobivanje uporabnikov)", "Odločeno"],
            ["12-tedenski PetPrep izziv", "49,99 € na žival, enkratni nakup", "Odločeno"],
            ["Partnerske ponudbe", "Provizije trgovin, zavarovalnic, veterinarjev in šol", "V načrtu"],
            ["AI asistent za pravega ljubljenčka", "Naročnina", "V načrtu"],
          ],
        },
        {
          type: "list",
          heading: "Kaj je že zgrajeno",
          items: [
            "Strežniški igralni pogon s sinhronizacijo v živo, preizkušen na simulacijah celih dni, dnevih prestopa ure in robnih primerih družin.",
            "Družine z več starši, več otroki in skupnimi ljubljenčki ter pošteno oceno za vsakega otroka.",
            "Edinstveni fotorealistični AI ljubljenčki z merjenimi in omejenimi stroški AI, mediji na lastnih strežnikih v EU.",
            "Potrebe živali na podlagi navedenih veterinarskih in kinoloških virov, vsaka številka sledljiva do vira.",
            "Varnost otrok po zasnovi: prijava s kodo brez e-pošte, minimalni podatki, brez oglasov, samo preverjeni mediji.",
          ],
        },
        {
          type: "prose",
          heading: "Faza",
          paragraphs: [
            "PetPrep je pred javnim začetkom, načrtovana je zaprta beta. Prvi trg sta Slovenija in regija, sledita DACH in Združeno kraljestvo; izdelek je od prvega dne zgrajen za lokalizacijo po svetu.",
            "Ustanovitelj: David Tacer, razvijalec programske opreme in podjetnik (DATA VALLIS d.o.o., Maribor). Več [o nas](page:about).",
          ],
        },
        { type: "callout", title: "Zahtevajte predstavitev za vlagatelje.", text: "Predstavitev, prezentacijo in podatkovno sobo pošljemo na zahtevo.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt PetPrep — družine, zasebnost, partnerji, vlagatelji",
        description: "Kontakt PetPrep: vprašanja družin, zahteve glede zasebnosti, partnerstva in vprašanja vlagateljev. Odgovorimo v slovenščini ali angleščini.",
      },
      eyebrow: "Kontakt",
      title: "Preberemo vsako sporočilo.",
      lead: "Pišite na pravi naslov in odgovorili vam bomo čim prej, v slovenščini ali angleščini.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Podatki o podjetju" }],
    },
    privacy: {
      navLabel: "Zasebnost",
      meta: {
        title: "Politika zasebnosti — PetPrep",
        description: "Kako PetPrep zbira, uporablja in varuje osebne podatke staršev in otrok ter kako uveljavljate pravice po GDPR.",
      },
      eyebrow: "Pravno",
      title: "Politika zasebnosti",
      lead: "PetPrep je narejen predvsem za otroke, zato zbiramo čim manj in natančno pojasnimo, kaj s tem počnemo.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Kdo je odgovoren",
              paragraphs: [
                "Upravljavec osebnih podatkov, ki se obdelujejo v aplikaciji PetPrep in na tej spletni strani, je podjetje {company}, {address}; {companyIds}. Kontakt za vprašanja o zasebnosti: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Kaj zbiramo",
              items: [
                "Račun starša: ime (kako vas kliče družina), e-poštni naslov, geslo (shranjeno samo kot varna zgoščena vrednost), časovni pas vaše naprave in čas, ko ste sprejeli pogoje in to politiko.",
                "Profil skrbnika (otrok ali odrasel, ki skrbi za ljubljenčka): vzdevek do 30 znakov in po želji letnica rojstva — pri odraslem je ne vpišete. Brez e-pošte, gesla, priimka ali datuma rojstva.",
                "Naprave: model telefona (na primer »iPhone«, nikoli ime, ki ga je telefonu dal uporabnik), za obvestila pa žeton naprave, vrsta sistema in različica aplikacije.",
                "Dejavnost skrbi: dejanja v simulaciji (hranjenje, voda, čiščenje, sprehodi), dnevno število korakov s senzorja gibanja, ocene in poročila.",
                "Pogodba o odgovornosti: otrokov podpis s prstom, shranjen kot vektorska črta s časom podpisa.",
                "Kode: kode za prijavo in povabila so shranjene samo kot zgoščene vrednosti in potečejo.",
                "Seznam za zgodnji dostop (ta spletna stran): vaš e-poštni naslov, jezik strani in čas prijave.",
              ],
            },
            {
              heading: "3. Česa ne zbiramo",
              items: [
                "Lokacije: PetPrep ne uporablja GPS.",
                "Oglasov ter oglaševalskih ali sledilnih orodij tretjih oseb v aplikaciji.",
                "Klepeta med uporabniki.",
                "Oglaševalskih piškotkov na tej spletni strani. Analitične piškotke nastavimo samo, če jih dovolite (glejte Piškotki spodaj).",
              ],
            },
            {
              heading: "4. Zakaj obdelujemo podatke (nameni in pravne podlage)",
              items: [
                "Za storitev, ki ste jo izbrali: računi, simulacija, nadzorna plošča, poročila in obvestila (izvajanje pogodbe).",
                "Za obdelavo nakupov prek App Store ali Google Play (izvajanje pogodbe).",
                "Za varnost storitve, na primer omejevanje ponavljajočih se poskusov prijave (zakoniti interes).",
                "Za izpolnjevanje zakonskih obveznosti, na primer računovodstvo nakupov (zakonska obveznost).",
                "Za obveščanje o začetku PetPrep po e-pošti, če ste se prijavili na zgodnji dostop (privolitev — odjava je mogoča v vsakem sporočilu).",
                "Da razumemo, kako obiskovalci uporabljajo to spletno stran, z Google Analytics, samo če dovolite analitične piškotke (privolitev — spremenite jo lahko kadarkoli v Nastavitvah piškotkov).",
              ],
            },
            {
              heading: "5. Otroci",
              paragraphs: [
                "Račun lahko ustvari in otroka doda samo starš ali zakoniti zastopnik. Starš odloča, kaj otrok lahko počne, in lahko otrokov profil kadarkoli izbriše. Otroka nikoli ne vprašamo za kontaktne podatke, mu ne prikazujemo oglasov in ne omogočamo stika s tujci.",
                "Imetnik računa lahko profil skrbnika ustvari tudi zase ali za drugega odraslega člana družine — na primer, da pred nakupom ali posvojitvijo preizkusi, ali mu pasma ustreza. Za tak profil veljajo enaka pravila in enak najmanjši obseg podatkov; vsa zaščita, ki je namenjena otrokom, velja tudi zanj.",
              ],
            },
            {
              heading: "6. Slike in videi, ustvarjeni z umetno inteligenco",
              paragraphs: [
                "Fotografijo in kratke videje vsakega ljubljenčka ustvari AI storitev samo na podlagi opisa ljubljenčka (pasma, dlaka, lise ipd.). Opis nikoli ne vsebuje imen ali kakršnih koli podatkov o vaši družini. Končni mediji so shranjeni na naših strežnikih v EU in prikazani prek kratkotrajnih povezav.",
              ],
            },
            {
              heading: "7. Ponudniki storitev",
              items: [
                "Gostovanje: Hetzner Online (strežniki v EU).",
                "Ustvarjanje AI slik in videov: fal.ai (prejme samo opis ljubljenčka).",
                "Potisna obvestila: Apple Push Notification service in Firebase Cloud Messaging prek Expo; obvestila ne vsebujejo imen.",
                "Nakupi: Apple App Store in Google Play; upravljanje nakupov prek RevenueCat, ko bodo nakupi na voljo.",
                "E-pošta za zgodnji dostop: Klaviyo (prejme samo e-poštni naslov in jezik, ki ju oddate na tej spletni strani).",
                "Privolitev za piškotke na spletni strani: CookieYes (shrani vašo izbiro).",
                "Analitika spletne strani: Google Analytics 4 podjetja Google Ireland Ltd., samo z vašo privolitvijo; Google Analytics 4 ne shranjuje naslovov IP.",
              ],
            },
            {
              heading: "8. Kako dolgo hranimo podatke",
              paragraphs: [
                "Podatke hranimo, dokler obstaja vaš račun. Ko v aplikaciji izbrišete profil otroka ali svoj račun, se podatki takoj izbrišejo in jih ni mogoče obnoviti. Zapise, ki jih moramo hraniti po zakonu (na primer za nakupe), hranimo toliko časa, kot to zahteva zakon.",
              ],
            },
            {
              heading: "9. Vaše pravice",
              paragraphs: [
                "Imate pravico do dostopa, popravka, izvoza in izbrisa podatkov, do ugovora in omejitve obdelave ter do pritožbe pri nadzornem organu — v Sloveniji je to Informacijski pooblaščenec. V aplikaciji lahko vse podatke družine izvozite v datoteko (Nadzor → Račun → Izvozi moje podatke) ter izbrišete profil otroka ali celoten račun. Za vse drugo pišite na {privacyEmail}.",
              ],
            },
            {
              heading: "10. Varnost",
              paragraphs: [
                "Gesla in kode so shranjeni kot zgoščene vrednosti, povezave so šifrirane, posodobitve v živo prejmejo samo člani vaše družine, AI mediji pa so preverjeni, preden pridejo na otrokov zaslon.",
              ],
            },
            {
              heading: "11. Spremembe",
              paragraphs: ["O pomembnih spremembah vas obvestimo v aplikaciji, preden začnejo veljati. Datum na vrhu kaže zadnjo različico."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "12. Piškotki",
          paragraphs: [
            "Nujni piškotki skrbijo za delovanje strani in si zapomnijo vašo izbiro glede piškotkov. Analitične piškotke (Google Analytics) nastavimo samo, če jih dovolite v pasici, izbiro pa lahko kadarkoli spremenite.",
            "Spodnja tabela se samodejno ustvari iz zadnjega pregleda te spletne strani, zato vedno prikazuje piškotke, ki jih dejansko uporabljamo.",
          ],
          settings: "Spremeni nastavitve piškotkov",
          fallback: "Seznam piškotkov se naloži skupaj s pasico za piškotke. Če ga ne vidite, dovolite skripte na tej strani ali pišite na {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Pogoji uporabe",
      meta: {
        title: "Pogoji uporabe — PetPrep",
        description: "Pogoji uporabe aplikacije in spletne strani PetPrep: računi, brezplačne in plačljive funkcije, poštena raba, vsebine AI, odgovornost in pravo.",
      },
      eyebrow: "Pravno",
      title: "Pogoji uporabe",
      lead: "Pravila za uporabo PetPrep, napisana tako, da se jih da prebrati.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Storitev",
              paragraphs: [
                "PetPrep zagotavlja podjetje {company}, {address}; {companyIds}. PetPrep je simulacija, ki družinam in posameznikom pomaga ugotoviti, ali so pripravljeni skrbeti za pravo žival — otrokom in odraslim, ki pred nakupom ali posvojitvijo preizkušajo, ali jim pasma ustreza. Je izobraževalno orodje, ne veterinarski nasvet, in ne jamči, kako bo kdo skrbel za pravo žival.",
              ],
            },
            {
              heading: "2. Računi",
              items: [
                "Račune ustvarijo odrasli (starši, zakoniti zastopniki ali odrasli, ki PetPrep uporabljajo zase). Odgovorni ste za profile, ki jih dodate, in za varnost svojega gesla.",
                "Za ljubljenčka skrbijo otroci ali odrasli prek profila skrbnika, ki ga ustvari imetnik računa, in se prijavijo s kodo iz tega računa. Imetnik računa lahko profil skrbnika ustvari tudi zase.",
                "Navajajte točne podatke in kode za prijavo hranite zase.",
              ],
            },
            {
              heading: "3. Brezplačne in plačljive funkcije",
              items: [
                "Mešanček je brezplačen.",
                "12-tedenski PetPrep izziv stane 49,99 € na žival kot enkratni nakup; 12 tednov začne teči z nakupom. PetPrep najprej preizkusite z brezplačnim mešančkom. Sorojenci s skupnim ljubljenčkom plačajo eno ceno.",
                "Nakupe in vračila urejata App Store ali Google Play po svojih pogojih.",
              ],
            },
            {
              heading: "4. Poštena uporaba",
              items: [
                "Ne poskušajte goljufati pri štetju korakov, dostopati do podatkov drugih družin, razstavljati programske opreme ali motiti storitve.",
                "Račune, ki kršijo ta pravila ali ogrožajo otroke, lahko omejimo ali začasno ukinemo.",
              ],
            },
            {
              heading: "5. Vsebina, ustvarjena z umetno inteligenco",
              paragraphs: [
                "Slike in videje ljubljenčkov ustvari umetna inteligenca. So ponazoritve simuliranega ljubljenčka in se morda ne ujemajo povsem z nobeno pravo živaljo ali standardom pasme. Prihodnje funkcije AI asistenta bodo dajale le splošne informacije, nikoli diagnoze, in vedno kazale pot do pravega veterinarja.",
              ],
            },
            {
              heading: "6. Intelektualna lastnina",
              paragraphs: ["PetPrep, njegov logotip, oblikovanje, programska oprema in vsebina pripadajo podjetju {company}. Aplikacijo lahko uporabljate za osebno, nekomercialno rabo svoje družine."],
            },
            {
              heading: "7. Odgovornost",
              paragraphs: [
                "Trudimo se, da je PetPrep dosegljiv in točen, vendar je storitev na voljo takšna, kot je. V obsegu, ki ga dovoljuje zakon, ne odgovarjamo za posredno škodo ali za odločitve o nakupu prave živali. Nič v teh pogojih ne omejuje pravic, ki jih imate kot potrošnik po prisilnih predpisih.",
              ],
            },
            {
              heading: "8. Prenehanje uporabe",
              paragraphs: ["Račun lahko kadarkoli izbrišete v aplikaciji. Izbris je takojšen in trajen."],
            },
            {
              heading: "9. Pravo in spori",
              paragraphs: [
                "Za te pogoje velja pravo Republike Slovenije. Potrošniki se lahko sklicujejo tudi na prisilne predpise države, v kateri živijo, in uporabijo evropsko platformo za spletno reševanje sporov.",
              ],
            },
            { heading: "10. Kontakt", paragraphs: ["Vprašanja o teh pogojih: {helloEmail}."] },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Varnost otrok",
      meta: {
        title: "Varnost otrok — kako PetPrep varuje otroke",
        description:
          "Kako PetPrep varuje otroke: račune ustvarijo starši, prijava s kodo brez e-pošte, malo podatkov, brez oglasov, klepeta in lokacije, preverjeni mediji.",
      },
      eyebrow: "Zaupanje",
      title: "Narejen za otroke od prve vrstice kode.",
      lead: "Glavni uporabnik PetPrep je otrok, zato sta varnost in zasebnost pravili izdelka, ne nastavitvi.",
      blocks: [
        {
          type: "cards",
          heading: "Naši standardi",
          columns: 2,
          items: [
            { title: "Vsak račun ustvari starš", text: "Otroci se ne morejo registrirati sami. Starš doda otroka in ustvari enkratno kodo za prijavo, ki velja 15 minut." },
            { title: "Otroci brez e-pošte in gesla", text: "Otrok se prijavi s kodo starša. Napačna, potekla in porabljena koda dobijo enak odgovor, zato nihče ne more ugotoviti, kateri otroci obstajajo." },
            { title: "Minimalni podatki", text: "Vzdevek in po želji letnica rojstva. Brez priimka, datuma rojstva in fotografij otroka." },
            { title: "Brez oglasov, klepeta in tujcev", text: "Oglasov ni in z drugimi uporabniki ni mogoče stopiti v stik." },
            { title: "Brez sledenja lokaciji", text: "Sprehodi se štejejo samo s senzorja korakov v telefonu. GPS se ne uporablja." },
            { title: "Zasebne posodobitve v živo", text: "Posodobitve v realnem času prejmejo samo otroci, ki skrbijo za tega ljubljenčka, in starši iste družine." },
            { title: "Preverjeni mediji", text: "Prikazane so samo slike in videi, ustvarjeni za PetPrep in preverjeni na našem strežniku, iz naše hrambe v EU." },
            { title: "Obvestila brez imen", text: "Obvestila nikoli ne vsebujejo imena otroka ali ljubljenčka, saj se lahko pokažejo na zaklenjenem zaslonu." },
          ],
        },
        {
          type: "list",
          heading: "Nadzor ostane pri starših",
          items: [
            "Tihe ure za šolo in spanje, brez obvestil.",
            "Gumb za premor, ki otrokov zaslon zaklene v živo.",
            "Odjava otroka z vseh naprav hkrati.",
            "Takojšen izvoz ali izbris vseh podatkov kar v aplikaciji.",
          ],
        },
        { type: "callout", title: "Prijavite skrb", text: "Če vas karkoli v PetPrep skrbi, nam pišite — odgovorili bomo prednostno.", tone: "dark" },
        { type: "contact" },
      ],
    },
    animals: {
      meta: {
        title: "PetPrep register živali — vrste in pasme z viri",
        description:
          "Psi, mačke in pasme: kaj potrebujejo, za koga so primerne in kako jih simulira PetPrep. Iščite in primerjajte pasme; vsako dejstvo ima vir.",
      },
      navLabel: "Živali",
      eyebrow: "Register živali",
      title: "Spoznajte žival, preden pride domov.",
      lead:
        "Kaj vsaka vrsta in pasma v PetPrep res potrebuje — iz kinoloških zvez, mačjih zvez, veterinarskih dobrodelnih organizacij in raziskav, z vsemi viri. In pravila, po katerih jo PetPrep simulira.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "O nas — podjetje, ustanovitelj in kako PetPrep preverja dejstva",
        description:
          "Kdo stoji za PetPrep: DATA VALLIS d.o.o. iz Maribora, ustanovitelj David Tacer, naše poslanstvo in kako register živali zbira in preverja dejstva.",
      },
      navLabel: "O nas",
      eyebrow: "O nas",
      title: "Kdo stoji za PetPrep.",
      lead: "PetPrep nastaja v Mariboru, v majhnem podjetju za razvoj programske opreme. Na tej strani piše, kdo smo, zakaj razvijamo PetPrep in kako odločamo, kaj aplikacija in register živali povesta o živalih.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Podjetje",
          paragraphs: [
            "PetPrep je izdelek podjetja DATA VALLIS d.o.o., podjetja za razvoj programske opreme s sedežem v Mariboru. Isto podjetje upravlja to spletno stran in aplikacijo PetPrep ter je upravljavec osebnih podatkov (glejte [politiko zasebnosti](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Ustanovitelj",
          paragraphs: ["PetPrep je ustanovil David Tacer, razvijalec programske opreme in podjetnik iz Maribora."],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Naše poslanstvo",
          paragraphs: [
            "Vsaka družina sliši »Obljubim, da bom skrbel zanj.« PetPrep obljubo spremeni v dokaz: 12 tednov otrok — ali odrasel, ki si želi točno določeno pasmo — skrbi za realističnega AI ljubljenčka z vsakodnevnimi potrebami prave živali, starš pa vsak dan vidi, ali skrb zdrži.",
            "Tudi neuspeh v simulaciji je dober rezultat: družina izve, preden bi trpela prava žival, in preden se zaveže letom skrbi in stroškov. Ko pa prava žival pride domov, želimo, da je PetPrep v pomoč vse njeno življenje.",
          ],
        },
        {
          type: "list",
          id: "metodologija",
          heading: "Kako nastaja register živali",
          intro: "[Register živali](page:animals) in aplikacija uporabljata iste podatke. O tem, kaj sme register povedati, odločajo ta pravila:",
          items: [
            "Vsako dejstvo navaja svoj vir in povezavo nanj. Vire razvrščamo po teži: A — standardi pasem, recenzirani znanstveni članki in smernice veterinarskih združenj; B — svetovalne strani veterinarskih bolnišnic, univerz in nacionalnih organizacij za zaščito živali; C — sekundarni povzetki (enciklopedije, časopisni članki), ki jih uporabimo samo skupaj z virom A ali B.",
            "Kot dejstvo objavimo samo podatek z virom. Vrednosti, ki je noben vir ne podpira, ne objavimo. Kjer se viri razlikujejo, navedemo vsakega z njegovo vrednostjo.",
            "Pravila igre niso veterinarski nasvet. Kjer igra potrebuje število, ki ga viri ne podajo natančno (na primer dnevni cilj korakov), ga PetPrep določi na podlagi virov in ga prikaže samo v razdelku »Kako to simulira PetPrep«, označenega kot pravilo igre.",
            "Podatki o zdravju so samo informativni. Povzemajo, kaj o pasmi pravijo viri, in jih ni pregledal veterinar. Za pravo žival se posvetujte z veterinarjem.",
            "Standarde pasem povzemamo s svojimi besedami in jih ne prepisujemo, nobene pasme pa ne označimo kot »hipoalergene«.",
            "Register nastane iz raziskovalnih podatkov PetPrep, istih, ki jih uporablja aplikacija. Ko se vir ali vrednost spremeni, register znova izvozimo, na strani vsake pasme pa je datum zadnje posodobitve. Če opazite napako, nam pišite na hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Vprašanja o PetPrep?", text: "Na strani s kontakti izberite pravi naslov — za družine, zasebnost, partnerje ali vlagatelje.", tone: "mint" },
        { type: "contact" },
      ],
    },
  },
};

export default sl;
