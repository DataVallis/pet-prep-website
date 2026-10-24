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
      { title: "Zaupanje", links: ["privacy", "terms", "childSafety", "deleteAccount"] },
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
        "Pravi sprehodi s pravimi koraki iz telefona",
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
      note: "Danes so na voljo brezplačna mešanček in domača mačka ter vse pasme psov in mačk iz [registra živali](page:animals) v 12-tedenskem izzivu.",
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
        { title: "Genski test", text: "Katere pasme so v vašem mešančku — in na kaj biti pozorni." },
        { title: "Kartica za veterinarja", text: "Sestava pasem in genske najdbe na enem mestu, pripravljene za veterinarja." },
      ],
      link: "O AI asistentu",
      planned: "V razvoju",
    },
    species: {
      title: "Danes psi in mačke. Kmalu še druge živali.",
      text: "Narejen za družine po vsem svetu, v njihovem jeziku.",
      chips: [
        { label: "Pes · na voljo", active: true, link: "species:dog" },
        { label: "Mačka · na voljo", active: true, link: "species:cat" },
        { label: "Pasme psov in mačk · v izzivu", link: "page:animals" },
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
            "Koraki prihajajo iz aplikacije Apple Zdravje (iPhone) ali Health Connect (Android), če to dovolite (samo za branje), in s senzorja gibanja v telefonu, kjer je na voljo. PetPrep ne uporablja GPS in ne sledi lokaciji.",
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
            { title: "Genski test za psa ali mačko", text: "Genski test naročite v aplikaciji ali naložite izvid testa, ki ga že imate. PetPrep pokaže, katere pasme so v mešančku, kaj je zanje značilno in katere zdravstvene težave so pri njih pogostejše — z viri. Odstotek pasme ni diagnoza in genski test ne pokaže alergij." },
            { title: "Kartica za veterinarja", text: "Sestava pasem in neposredne genske najdbe na eni strani ali v kodi QR, da veterinar takoj ve, kaj je v mešančku." },
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
            { q: "Ali aplikacija sledi lokaciji otroka?", a: "Ne. Za sprehod šteje samo korake. Če to dovolite, jih bere iz aplikacije Apple Zdravje (iPhone) ali Health Connect (Android) — samo za branje in samo korake; kjer je na voljo, uporabi tudi senzor gibanja v telefonu. Za dovoljenje vpraša v oknu sprehoda. GPS se ne uporablja." },
            { q: "Ali otrok potrebuje e-poštni naslov?", a: "Ne. Račun ustvarite vi; otrok se prijavi s 6-mestno kodo, ki jo ustvarite. Shranimo le vzdevek in po želji letnico rojstva." },
            { q: "Kaj se zgodi, če otrok pozabi?", a: "Ljubljenček najprej pošlje nežne opomnike. Če potreba ostane na ničli, zboli in 12 ur preživi pri veterinarju. Po celem dnevu brez skrbi ga odpelje virtualno zavetišče — in lahko začnete znova." },
            { q: "Ali si lahko sorojenci delijo ljubljenčka?", a: "Da. Vsak otrok podpiše svojo pogodbo, vsako dejanje se šteje tistemu, ki ga je naredil, in vsak dobi svoj pošten Care Score." },
            { q: "Kaj pa šola in spanje?", a: "Nastavite tihe ure. Ljubljenček se upočasni, obvestil ni, obroke, ki v celoti padejo v tihe ure, pa opravite vi." },
            { q: "Je za otroke strašljivo?", a: "Ne. Posledice so resnične, a nežne: ljubljenček gre k veterinarju ali v zavetišče, nikoli nič grafičnega, in vedno obstaja nov začetek." },
            { q: "Katere živali so na voljo?", a: "Danes [psi](species:dog) in [mačke](species:cat): brezplačna mešanček in domača mačka ter v 12-tedenskem izzivu vse pasme iz [registra živali](page:animals), kjer so tudi njihove potrebe iz virov. Druge vrste so v načrtu." },
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
            { title: "Širitev", text: "Ko pride prava žival domov, AI asistent zanjo: podatki z ovratnice, AI prvi stik z veterinarji, rast in prehrana, genski testi, partnerske storitve." },
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
            ["Genski testi za pse in mačke", "Prodaja testov in partnerska provizija", "V načrtu"],
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
            "Ustanovitelj: David Tacer, razvijalec programske opreme in podjetnik (Data Vallis David Tacer s.p., Dravograd). Več [o nas](page:about).",
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
                "Dejavnost skrbi: dejanja v simulaciji (hranjenje, voda, čiščenje, sprehodi), dnevno število korakov (ali potiskov invalidskega vozička v prilagojenem načinu — glejte točki 3 in 4), ocene in poročila.",
                "Pogodba o odgovornosti: otrokov podpis s prstom, shranjen kot vektorska črta s časom podpisa.",
                "Kode: kode za prijavo in povabila so shranjene samo kot zgoščene vrednosti in potečejo.",
                "Poročila o napakah v aplikaciji: če se aplikacija zatakne ali sesuje, lahko na naš strežnik v EU pošlje kratko tehnično poročilo (vrsta in besedilo napake, mesto v kodi, različica aplikacije in sistema, ime zaslona, vloga starš/otrok). Poročilo ne vsebuje imena, e-naslova, ID-ja uporabnika ali IP-naslova, ne gre nobeni tretji osebi in se izbriše po 30 dneh.",
                "Seznam za zgodnji dostop (ta spletna stran): vaš e-poštni naslov, jezik strani in čas prijave.",
              ],
            },
            {
              heading: "3. Podatki o zdravju in telesni dejavnosti (koraki, Apple Zdravje in Health Connect)",
              paragraphs: [
                "PetPrep dostopa do ene vrste podatkov o zdravju in telesni dejavnosti in jih zbira: koliko korakov skrbnik prehodi vsak dan (telesna dejavnost). Uporabljamo jih samo za eno funkcijo — dnevni sprehod ljubljenčka v simulaciji: otrok hodi, njegovi koraki pa štejejo kot sprehod ljubljenčka.",
                "Kako dostopamo: aplikacija na otrokovem telefonu šteje korake. Če to dovolite v sistemskem oknu za dovoljenja, jih bere iz aplikacije Apple Zdravje (iPhone) ali Health Connect (Android) — samo za branje in samo korake. Kjer je na voljo, uporabi tudi senzor gibanja v telefonu (Android: dovoljenje »Telesna dejavnost«; iPhone: »Gibanje in telesna pripravljenost«); brez dovoljenja za Apple Zdravje ali Health Connect šteje samo senzor gibanja.",
                "Kaj zbiramo: aplikacija na naš strežnik pošlje samo današnje število korakov, vir (Apple Zdravje, Health Connect ali senzor gibanja) in čas pošiljanja. Hranimo en dnevni seštevek na profil skrbnika — nikoli posameznih gibov, poti, lokacije, srčnega utripa, spanja, teže ali drugih zdravstvenih podatkov. V Apple Zdravje ali Health Connect nikoli ničesar ne zapišemo.",
                "Kako jih uporabljamo in delimo: število korakov uporabljamo samo za sprehod v simulaciji in za prikaz staršu (nadzorna plošča in poročila). Ne uporabljamo ga za oglaševanje, profiliranje, zdravstvene ocene ali učenje modelov umetne inteligence, ga ne prodajamo in ga ne delimo s tretjimi osebami; v našem imenu ga hrani le ponudnik gostovanja (Hetzner, strežniki v EU). Podatke, ki jih prejmemo iz Health Connect, uporabljamo v skladu s pravili o dovoljenjih Health Connect, vključno z zahtevami glede omejene uporabe (Limited Use).",
                "Pravna podlaga in hramba: branje korakov je neobvezno in poteka samo z dovoljenjem, ki ga date na napravi; dnevni seštevek obdelujemo za storitev, ki ste jo izbrali (izvajanje pogodbe). Število korakov je vključeno v izvoz podatkov družine in se izbriše skupaj s profilom skrbnika ali računom; iz šifriranih varnostnih kopij izgine najpozneje v 35 dneh.",
                "Dovoljenje lahko kadar koli prekličete v nastavitvah naprave: iPhone → Nastavitve → Zdravje → Dostop do podatkov in naprave → PetPrep; Android → Health Connect → Dovoljenja aplikacij → PetPrep. Dovoljenje za senzor gibanja prekličete v nastavitvah telefona pri aplikaciji PetPrep. Sprehod potem ne šteje novih korakov.",
              ],
            },
            {
              heading: "4. Prilagojen način (potiski invalidskega vozička)",
              paragraphs: [
                "Prilagojen način je namenjen otrokom, ki uporabljajo invalidski voziček: sprehod takrat šteje potiske vozička namesto korakov. V aplikacijo pride z naslednjo posodobitvijo; spodaj opisujemo, katere podatke obdelamo, če ga starš vklopi.",
                "Če starš prilagojen način pri otroku vklopi, shranimo samo podatek, da je vklopljen. Razloga, diagnoze ali zdravstvenega stanja ne sprašujemo in ne shranjujemo.",
                "Ko je način vklopljen, aplikacija na otrokovem telefonu namesto korakov bere samo potiske invalidskega vozička — iz Apple Zdravje (zapiše jih Apple Watch) ali Health Connect, z ločenim dovoljenjem samo za branje. Senzorja gibanja takrat ne uporablja. Na strežnik gre samo današnje število potiskov; pri dnevu zapišemo, da gre za potiske.",
                "Starš lahko za otroka v prilagojenem načinu vpiše minute sprehoda (samo za danes). Shranimo datum, število minut in kateri starš je sprehod vpisal.",
                "Ker podatek, da je prilagojen način vklopljen, lahko kaže na zdravstveno stanje otroka, ga obdelujemo samo na podlagi vaše izrecne privolitve (člen 9(2)(a) GDPR), ki jo kot starš ali zakoniti zastopnik daste v imenu otroka (člen 8 GDPR) z vklopom stikala. Način lahko kadar koli izklopite; aplikacija potem spet šteje korake.",
                "Ti podatki (vklop, dnevi s potiski in vpisani sprehodi) so vključeni v izvoz podatkov družine in se izbrišejo skupaj s profilom otroka ali računom; iz šifriranih varnostnih kopij izginejo najpozneje v 35 dneh, kot vsi drugi podatki.",
              ],
            },
            {
              heading: "5. Česa ne zbiramo",
              items: [
                "Lokacije: PetPrep ne uporablja GPS.",
                "Drugih zdravstvenih podatkov iz Apple Zdravje ali Health Connect razen dnevnega števila korakov oziroma potiskov vozička.",
                "Oglasov ter oglaševalskih ali sledilnih orodij tretjih oseb v aplikaciji.",
                "Klepeta med uporabniki.",
                "Oglaševalskih piškotkov na tej spletni strani. Analitične piškotke nastavimo samo, če jih dovolite (glejte Piškotki spodaj).",
              ],
            },
            {
              heading: "6. Zakaj obdelujemo podatke (nameni in pravne podlage)",
              items: [
                "Za storitev, ki ste jo izbrali: računi, simulacija, nadzorna plošča, poročila in obvestila (izvajanje pogodbe).",
                "Za obdelavo nakupov prek App Store ali Google Play (izvajanje pogodbe).",
                "Za dnevni sprehod (dnevno število korakov — podatki o telesni dejavnosti, glejte točko 3): izvajanje pogodbe; branje iz Apple Zdravje, Health Connect ali senzorja gibanja samo z dovoljenjem, ki ga date na napravi.",
                "Za prilagojen način (podatek, da je vklopljen, potiski vozička in vpisani sprehodi): izrecna privolitev starša z vklopom stikala (člen 9(2)(a) in člen 8 GDPR — glejte točko 4).",
                "Za varnost storitve, na primer omejevanje ponavljajočih se poskusov prijave (zakoniti interes).",
                "Za delovanje in varnost storitve s poročili o napakah v aplikaciji, ki nam pomagajo odpraviti zatikanja in sesutja (zakoniti interes).",
                "Za izpolnjevanje zakonskih obveznosti, na primer računovodstvo nakupov (zakonska obveznost).",
                "Za obveščanje o začetku PetPrep po e-pošti, če ste se prijavili na zgodnji dostop (privolitev — odjava je mogoča v vsakem sporočilu).",
                "Da razumemo, kako obiskovalci uporabljajo to spletno stran, z Google Analytics, samo če dovolite analitične piškotke (privolitev — spremenite jo lahko kadarkoli v Nastavitvah piškotkov).",
              ],
            },
            {
              heading: "7. Otroci",
              paragraphs: [
                "Račun lahko ustvari in otroka doda samo starš ali zakoniti zastopnik. Starš odloča, kaj otrok lahko počne, in lahko otrokov profil kadarkoli izbriše. Otroka nikoli ne vprašamo za kontaktne podatke, mu ne prikazujemo oglasov in ne omogočamo stika s tujci.",
                "Imetnik računa lahko profil skrbnika ustvari tudi zase ali za drugega odraslega člana družine — na primer, da pred nakupom ali posvojitvijo preizkusi, ali mu pasma ustreza. Za tak profil veljajo enaka pravila in enak najmanjši obseg podatkov; vsa zaščita, ki je namenjena otrokom, velja tudi zanj.",
              ],
            },
            {
              heading: "8. Slike in videi, ustvarjeni z umetno inteligenco",
              paragraphs: [
                "Fotografijo in kratke videje vsakega ljubljenčka ustvari AI storitev samo na podlagi opisa ljubljenčka (pasma, dlaka, lise ipd.). Opis nikoli ne vsebuje imen ali kakršnih koli podatkov o vaši družini. Končni mediji so shranjeni na naših strežnikih v EU in prikazani prek kratkotrajnih povezav.",
              ],
            },
            {
              heading: "9. Ponudniki storitev",
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
              heading: "10. Kako dolgo hranimo podatke",
              paragraphs: [
                "Podatke hranimo, dokler obstaja vaš račun. Ko v aplikaciji izbrišete profil otroka ali svoj račun, se podatki takoj izbrišejo in jih ni mogoče obnoviti; iz šifriranih varnostnih kopij samodejno izginejo najpozneje v 35 dneh. Zapise, ki jih moramo hraniti po zakonu (na primer za nakupe), hranimo toliko časa, kot to zahteva zakon. Tehnična poročila o napakah v aplikaciji samodejno izbrišemo po 30 dneh.",
              ],
            },
            {
              heading: "11. Vaše pravice",
              paragraphs: [
                "Imate pravico do dostopa, popravka, izvoza in izbrisa podatkov, do ugovora in omejitve obdelave ter do pritožbe pri nadzornem organu — v Sloveniji je to Informacijski pooblaščenec. V aplikaciji lahko vse podatke družine izvozite v datoteko (Nadzor → Račun → Izvozi moje podatke) ter izbrišete profil otroka ali celoten račun. Za vse drugo pišite na {privacyEmail}.",
              ],
            },
            {
              heading: "12. Varnost",
              paragraphs: [
                "Gesla in kode so shranjeni kot zgoščene vrednosti, povezave so šifrirane, posodobitve v živo prejmejo samo člani vaše družine, AI mediji pa so preverjeni, preden pridejo na otrokov zaslon.",
              ],
            },
            {
              heading: "13. Spremembe",
              paragraphs: ["O pomembnih spremembah vas obvestimo v aplikaciji, preden začnejo veljati. Datum na vrhu kaže zadnjo različico."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Piškotki",
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
        description:
          "Pogoji uporabe aplikacije in spletne strani PetPrep: računi in profili otrok, 12-tedenski izziv in certifikat, nakupi in vračila, vsebine AI, prilagojen način, poštena raba, izbris in pravo.",
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
                "PetPrep zagotavlja podjetje {company}, {address}; {companyIds} — isto podjetje, ki je upravljavec podatkov po politiki zasebnosti. Ti pogoji veljajo za aplikacijo PetPrep in spletno stran petprep.si.",
                "PetPrep je simulacija skrbi za ljubljenčka. Družinam in posameznikom pomaga preveriti, ali so pripravljeni skrbeti za pravo žival — otrokom in odraslim, ki pred nakupom ali posvojitvijo preizkušajo, ali jim pasma ustreza. Je izobraževalno orodje, ne veterinarski ali drug strokovni nasvet.",
              ],
            },
            {
              heading: "2. Računi, profili in otroci",
              items: [
                "Račun ustvari odrasla oseba: starš, zakoniti zastopnik ali odrasel, ki PetPrep uporablja zase. Ob registraciji se strinjate s temi pogoji in s politiko zasebnosti.",
                "Za ljubljenčka skrbijo skrbniki (otroci ali odrasli) prek profila skrbnika, ki ga ustvari imetnik računa; profil lahko ustvari tudi zase. Za profil vpišete samo vzdevek in po želji letnico rojstva — več podatkov o otroku ne potrebujemo, zato jih ne vpisujte nikjer v aplikaciji.",
                "Otrok se prijavi s 6-mestno kodo (PIN), ki jo ustvarite v svoji aplikaciji. Koda velja kratek čas in samo enkrat; dajte jo samo otroku, ki mu je namenjena.",
                "Kot starš ali zakoniti zastopnik ste odgovorni za to, kako otrok uporablja PetPrep: ali je primeren zanj, koliko časa ga uporablja in ali je pri sprehodih varen (na primer v prometu). Igro lahko za vsakega ljubljenčka kadar koli ustavite.",
                "Drugega starša lahko v družino povabite s kodo povabila; oba vidita vse podatke družine in oba lahko ustavita igro.",
                "Navajajte točne podatke ter skrbite za varnost svojega gesla, kod in naprav.",
              ],
            },
            {
              heading: "3. 12-tedenski izziv, Care Score in certifikat",
              items: [
                "Izziv traja 12 tednov (84 dni programa) in se začne z nakupom; vsak skrbnik ima svoj zaključek. Čas, ko igra čaka na plačilo, se v 12 tednov ne šteje.",
                "Care Score (od 0 do 100) pokaže, kolikšen del pričakovanih rutin (hranjenje, voda, čiščenje, sprehod, vaja v šoli) je skrbnik opravil sam; vsaka bolezen ljubljenčka ga zniža. Čas, ko je igra ustavljena, ko je ljubljenček pri veterinarju, in tihe ure se skrbniku ne štejejo v slabo.",
                "Po 12 tednih se zapiše končna ocena, ki se pozneje ne spremeni; skrb po koncu izziva nanjo ne vpliva. Pri oceni 70 ali več lahko v aplikaciji ustvarite Certifikat odgovornosti (PDF), pri nižji oceni pa dobite poročilo o izzivu.",
                "Če je hrana, voda ali čistoča 24 ur na 0 %, ljubljenčka »odpelje zavetišče« (konec igre). Igra s tem ljubljenčkom se konča, certifikata ni, dobite poročilo o izzivu.",
                "Care Score in certifikat kažeta samo, kako je skrbnik skrbel za simuliranega ljubljenčka v aplikaciji. Nista zagotovilo, da je otrok ali kdor koli drug pripravljen na pravo žival, nista strokovna ocena in ne nadomeščata vaše presoje ali nasveta veterinarja, vzreditelja ali zavetišča. Odločitev o pravi živali je vedno vaša.",
                "Pravila igre (obroki, sprehodi in nega po pasmi in starosti) so poenostavljena in povzeta po javnih virih. Niso veterinarski nasvet; o zdravju in negi prave živali se posvetujte z veterinarjem.",
              ],
            },
            {
              heading: "4. Brezplačne in plačljive funkcije, nakupi in vračila",
              items: [
                "Mešanček in domača mačka sta brezplačna za vedno in sta način, da PetPrep preizkusite; brezplačnega preizkusa izziva ni. Brezplačna žival nima 12-tedenskega programa in certifikata, starš vidi zgodovino zadnjih 7 dni, ljubljenček pa ima osnovni nabor slik in videov.",
                "12-tedenski PetPrep izziv s plačljivo pasmo je enkratni nakup (49,99 € v Sloveniji; trgovina pokaže ceno za vašo državo). En nakup je en izziv za enega ljubljenčka; vsak nov izziv z novim ljubljenčkom je nov nakup. Sorojenci, ki skrbijo za istega ljubljenčka, plačajo enkrat.",
                "Nakup opravi starš v svoji aplikaciji prek App Store ali Google Play; v otroški aplikaciji nakupov ni. Plačilo obdela trgovina po svojih pogojih.",
                "Ljubljenčka za izziv lahko ustvarite pred nakupom. Dokler izziv ni plačan, igra stoji: ljubljenček varno čaka, njegove potrebe ne padajo in nič se ne poslabša. Ko kupite, se igra nadaljuje, kjer je obstala.",
                "Vračila kupnine urejata App Store in Google Play po svojih pravilih; zahtevo oddate pri trgovini, kjer ste kupili. Če trgovina kupnino vrne, preden je izziv končan, se igra tega ljubljenčka spet ustavi. Slike in videi, ustvarjeni po nakupu, ostanejo.",
                "Po koncu igre (zavetišče) nakup ljubljenčka ne odklene; nov izziv je nov ljubljenček in nov nakup.",
                "Če izbrišete ljubljenčka, otroka ali račun, pri katerem je kupljen izziv še v teku, ostane nakup porabljen: ne prenese se na drugega ljubljenčka in izbris ne pomeni vračila kupnine. Aplikacija vas na to prej opozori in zahteva potrditev.",
              ],
            },
            {
              heading: "5. Slike in videi, ustvarjeni z umetno inteligenco",
              items: [
                "Slike in videe ljubljenčkov ustvari umetna inteligenca (AI) samo na podlagi opisa ljubljenčka (pasma, barva, dlaka ipd.), nikoli na podlagi podatkov o vaši družini. So ponazoritve simuliranega ljubljenčka in se morda ne ujemajo povsem z nobeno pravo živaljo ali standardom pasme.",
                "Kjer jih pokažemo javno, na primer portrete pasem na tej spletni strani, so označeni kot ustvarjeni z AI.",
                "Videz ni nujno edinstven: ljubljenčki iste plačljive pasme in barve si lahko delijo iste slike in videe, brezplačne živali pa dobijo enega od skupnih videzov svoje pasme. Plačan izziv vključuje večji nabor videov kot brezplačna žival.",
                "Po podpisu pogodbe ali nakupu lahko priprava slik in videov traja nekaj minut; medtem aplikacija pokaže, da se ljubljenček pripravlja, in označi, kar se še pripravlja.",
                "Podatki o pasmah v aplikaciji in v registru živali na tej strani so povzeti po javnih virih, ki jih navajamo, in niso veterinarsko preverjeni.",
              ],
            },
            {
              heading: "6. Koraki, podatki o zdravju in prilagojen način",
              items: [
                "Dnevni sprehod šteje skrbnikove prave korake. Če to dovolite, jih aplikacija bere iz Apple Zdravje ali Health Connect samo za branje (vanje nikoli ničesar ne zapiše) ali iz senzorja gibanja v telefonu. Katere podatke obdelujemo, piše v politiki zasebnosti (točka 3).",
                "Prilagojen način je namenjen otrokom, ki uporabljajo invalidski voziček: sprehod takrat šteje potiske vozička namesto korakov. Uporabite ga lahko, če je funkcija na voljo v vaši različici aplikacije. Vklopi ga starš za posameznega otroka; vklop je vaša privolitev, izklop jo prekliče (politika zasebnosti, točka 4).",
                "V prilagojenem načinu lahko starš za otroka vpiše minute sprehoda, samo za današnji dan. Za vpise ste odgovorni vi: vpišite samo sprehode, ki so se res zgodili, saj štejejo v Care Score in certifikat.",
                "PetPrep ne uporablja lokacije in med sprehodom ne opozarja na nevarnosti; za varnost na sprehodu poskrbite sami.",
              ],
            },
            {
              heading: "7. Obvestila",
              paragraphs: [
                "Če jih dovolite na napravi, aplikacija pošilja potisna obvestila: opomnike skrbniku, opozorila staršem, ko ljubljenček nima hrane, vode ali čistoče, ter novice o bolezni, koncu igre in koncu izziva. Obvestila ne vsebujejo imena otroka ali ljubljenčka in jih v tihih urah ni. Dovoljenje lahko kadar koli prekličete v nastavitvah naprave; brez obvestil lahko skrbnik zamudi rutine, kar vpliva na igro in oceno.",
              ],
            },
            {
              heading: "8. Poštena uporaba",
              items: [
                "Ne poskušajte goljufati pri štetju korakov ali potiskov, ne vpisujte sprehodov, ki se niso zgodili, ne dostopajte do podatkov drugih družin, ne razstavljajte programske opreme in ne motite storitve.",
                "Ljubljenčkom ne dajajte žaljivih ali neprimernih imen in v aplikacijo ne vpisujte osebnih podatkov o otroku, ki jih aplikacija ne zahteva.",
                "Račune, ki kršijo ta pravila ali ogrožajo otroke, lahko omejimo ali začasno ukinemo; neprimerno ime ljubljenčka lahko izbrišemo.",
              ],
            },
            {
              heading: "9. Intelektualna lastnina",
              paragraphs: [
                "PetPrep, njegov logotip, oblikovanje, programska oprema in vsebina pripadajo podjetju {company}. Aplikacijo ter slike, videe in certifikat svojega ljubljenčka lahko uporabljate za osebno, nekomercialno rabo svoje družine, na primer jih delite s sorodniki.",
              ],
            },
            {
              heading: "10. Odgovornost",
              paragraphs: [
                "Trudimo se, da je PetPrep dosegljiv in točen, vendar je storitev na voljo takšna, kot je; deluje tudi s storitvami drugih (trgovine, Apple Zdravje, Health Connect, potisna obvestila, AI storitev), na katere nimamo vpliva. V obsegu, ki ga dovoljuje zakon, ne odgovarjamo za posredno škodo ali za odločitve o nakupu ali posvojitvi prave živali. Nič v teh pogojih ne omejuje pravic, ki jih imate kot potrošnik po prisilnih predpisih.",
              ],
            },
            {
              heading: "11. Izbris računa in prenehanje uporabe",
              paragraphs: [
                "Profil otroka ali svoj račun lahko kadar koli izbrišete v aplikaciji. Izbris je takojšen in trajen; ko račun izbriše zadnji starš družine, se izbriše vsa družina. Podatke lahko prej izvozite (Nadzor → Račun → Izvozi moje podatke). Kaj se zgodi s podatki, piše v politiki zasebnosti; kaj se zgodi z nakupom, piše v točki 4.",
              ],
            },
            {
              heading: "12. Spremembe pogojev",
              paragraphs: [
                "Pogoje posodobimo, ko se spremeni aplikacija ali zakonodaja. O pomembnih spremembah vas obvestimo v aplikaciji, preden začnejo veljati. Datum na vrhu kaže zadnjo različico. Če se s spremembami ne strinjate, lahko račun kadar koli izbrišete.",
              ],
            },
            {
              heading: "13. Pravo in spori",
              paragraphs: [
                "Za te pogoje velja pravo Republike Slovenije. Potrošniki se lahko sklicujejo tudi na prisilne predpise države, v kateri živijo, in uporabijo evropsko platformo za spletno reševanje sporov.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Vprašanja o teh pogojih: {termsEmail}. Ponudnik storitve: {company}, {address}; {companyIds}. Vprašanja o zasebnosti: {privacyEmail}.",
              ],
            },
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
            { title: "Brez sledenja lokaciji", text: "Sprehod šteje samo korake — iz Apple Zdravje ali Health Connect (z vašim dovoljenjem, samo za branje) ali s senzorja gibanja v telefonu. GPS se ne uporablja." },
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
    deleteAccount: {
      navLabel: "Izbris računa",
      meta: {
        title: "Izbris računa in podatkov PetPrep",
        description:
          "Kako izbrišete račun PetPrep (Data Vallis) v aplikaciji ali po e-pošti, kateri podatki se izbrišejo, kaj ostane in kako dolgo.",
      },
      eyebrow: "Zaupanje",
      title: "Izbris računa PetPrep",
      lead: "PetPrep izdeluje Data Vallis. Račun in podatke družine lahko izbrišete kadar koli — takoj v aplikaciji ali po e-pošti, če aplikacije nimate več.",
      blocks: [
        {
          type: "steps",
          heading: "Izbris v aplikaciji (takoj)",
          items: [
            { title: "Prijavite se kot starš", text: "Odprite PetPrep, tapnite »Sem starš« in se prijavite." },
            { title: "Odprite račun", text: "Pojdite v Nadzor → Račun. Če želite kopijo, najprej tapnite »Izvozi moje podatke«." },
            { title: "Izbrišite", text: "Tapnite »Izbriši račun«, potrdite z geslom (ali s prijavo z Googlom / Apple), vpišite IZBRIŠI in tapnite »Izbriši za vedno«." },
            { title: "Končano", text: "Izbris je takojšen in ga ni mogoče razveljaviti. Vse vaše naprave in naprave otrok se odjavijo." },
          ],
        },
        {
          type: "prose",
          heading: "Aplikacije nimate več? Zahtevajte izbris po e-pošti",
          paragraphs: [
            "Pišite na [privacy@petprep.si](mailto:privacy@petprep.si) z e-naslova svojega starševskega računa PetPrep, z zadevo »Izbris računa«. Preverimo, da zahteva prihaja od lastnika računa, račun izbrišemo najpozneje v enem mesecu (običajno v nekaj dneh) in izbris potrdimo po e-pošti.",
            "Če želite izbrisati samo profil enega otroka, se prijavite kot starš in v Nadzor → Otroci odprite otroka → Izbriši profil.",
          ],
        },
        {
          type: "table",
          heading: "Kaj se izbriše in kaj ostane",
          head: ["Podatki", "Kaj se zgodi"],
          rows: [
            ["Vaš starševski račun (ime, e-pošta, geslo, povezava prijave z Googlom / Apple)", "Takoj izbrisan"],
            ["Če ste edini starš v družini: profili otrok (vzdevek, letnica rojstva), ljubljenčki, AI slike in videi, pogodbe in podpisi, dnevnik skrbi, Care Score, certifikati, koraki, tihe ure, kode za prijavo", "Takoj izbrisano"],
            ["Če v družini ostane drug starš", "Izbriše se samo vaš račun; družina ostane drugemu staršu"],
            ["Naprave in žetoni za obvestila", "Takoj odjavljeno in izbrisano"],
            ["Evidenca nakupov (izdelek, datum, številka transakcije trgovine, anonimna oznaka nakupa — brez imena in e-pošte)", "Hranimo, dokler to zahtevajo računovodski in davčni predpisi, brez povezave z vašo družino"],
            ["Evidenca stroškov AI", "Hranimo za računovodstvo, brez povezave z vami, otroki ali ljubljenčki"],
            ["Šifrirane varnostne kopije", "Samodejno odstranjene v 35 dneh"],
          ],
          note: "Plačila obdelata App Store in Google Play, ki svoje evidence hranita po svojih pravilih. Kupljen, a nedokončan izziv se ob izbrisu računa ne povrne.",
        },
        { type: "callout", title: "Vprašanja?", text: "Pišite na privacy@petprep.si. Podrobnosti so v politiki zasebnosti.", tone: "dark" },
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
          "Kdo stoji za PetPrep: Data Vallis David Tacer s.p. iz Dravograda, ustanovitelj David Tacer, naše poslanstvo in kako register živali zbira in preverja dejstva.",
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
            "PetPrep je izdelek podjetja Data Vallis David Tacer s.p., samostojnega podjetnika za razvoj programske opreme s sedežem v Dravogradu. Isto podjetje upravlja to spletno stran in aplikacijo PetPrep ter je upravljavec osebnih podatkov (glejte [politiko zasebnosti](page:privacy)).",
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
