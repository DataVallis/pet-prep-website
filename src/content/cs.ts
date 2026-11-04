import type { Dictionary } from "./types";

const cs: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Připraveni na mazlíčka. Po jeho boku celý život.",
    siteDescription:
      "PetPrep je 12týdenní simulátor domácího mazlíčka, který rodičům ukáže, jestli je jejich dítě opravdu připravené na skutečného mazlíčka – a pak se stane AI asistentem na celý život skutečného zvířete.",
    slogan: "Připraveni na mazlíčka. Po jeho boku celý život.",
    keywords: [
      "je moje dítě připravené na psa",
      "aplikace, která učí děti odpovědnosti za mazlíčka",
      "simulátor virtuálního mazlíčka",
      "AI simulátor domácího mazlíčka",
      "než si pořídíte psa",
      "děti a domácí mazlíčci",
      "test připravenosti na mazlíčka",
      "rodičovský přehled",
      "vyzkoušejte plemeno psa před koupí",
      "je toto plemeno pro mě",
    ],
  },
  nav: { home: "Domů", menu: "Menu", close: "Zavřít menu", skip: "Přejít na obsah" },
  lang: { label: "Jazyk", switchTo: "Změnit jazyk" },
  cta: {
    primary: "Začít zdarma s křížencem",
    secondary: "Podívat se, jak to funguje",
    earlyAccess: "Získat předběžný přístup",
    earlyAccessSubject: "PetPrep – předběžný přístup",
    ios: "Stáhnout pro iPhone",
    android: "Stáhnout pro Android",
    comingSoon: "Již brzy pro iPhone a Android",
    readMore: "Číst dál",
    contactUs: "Kontaktujte nás",
  },
  common: {
    planned: "Plánováno",
    plannedNote:
      "Tato stránka popisuje, na čem právě pracujeme. V aplikaci zatím není a podrobnosti se ještě mohou změnit.",
    legalDraft:
      "Tento text ještě před veřejným spuštěním dolaďujeme s právními poradci. Kdyby vám cokoli nebylo jasné, napište nám.",
    lastUpdated: "Naposledy aktualizováno",
    breadcrumbHome: "Domů",
    screensNote: "Obrazovky aplikace na tomto webu jsou jen náhledy; hotová aplikace může vypadat trochu jinak.",
    perPet: "za mazlíčka",
    free: "Zdarma",
    forever: "navždy",
    notFoundTitle: "Tahle stránka se utrhla z vodítka.",
    notFoundText: "Stránka, kterou hledáte, neexistuje nebo byla přesunuta.",
    notFoundCta: "Zpět na úvodní stránku",
  },
  footer: {
    tagline: "Připraveni na mazlíčka. Po jeho boku celý život.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Společnost", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Důvěra", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Všechna práva vyhrazena.",
    dataEu: "Data uložená v EU.",
    languages: "Další jazyky již brzy.",
    company: "PetPrep je produktem společnosti",
    cookieSettings: "Nastavení cookies",
    a11yBadge: { title: "Přístupné hraní", text: "Jednodušší gesta · Čtečky obrazovky · Méně pohybu" },
  },
  screens: {
    pin: "Přihlášení dítěte šestimístným kódem od rodiče – bez e-mailu, bez hesla.",
    contract: "Smlouva o odpovědnosti podepsaná prstem. Podpisem mazlíček ožije.",
    hud: "Domovská obrazovka dítěte: aktuální stav mazlíčka, čtyři potřeby a tlačítka péče.",
    picker: "Rodiče vybírají mazlíčka: plemeno, původ (z útulku, nebo od chovatele) a věk při příchodu domů.",
    parent: "Rodičovský přehled: semafor, Care Score a dnešní povinnosti každého dítěte.",
    report: "Přehled dítěte za 7, 30 nebo 84 dní: povinnosti, procházky a zmeškané úkoly den po dni.",
    assistant: "Až přijde domů: AI asistent promění data z obojku v jeden jasný návrh.",
    certificate: "Po 12 týdnech: Certifikát odpovědnosti s Care Score dítěte.",
  },
  pricingPlans: {
    free: {
      name: "Kříženec",
      text: "Celá simulace s realistickým mazlíčkem – křížencem.",
      features: [
        "12týdenní simulace se skutečnými důsledky",
        "Skutečné procházky, které se měří skutečnými kroky z telefonu",
        "Rodičovský přehled, semafor a Care Score",
        "Klidové hodiny a tlačítko pauzy",
        "Fotorealistický obrázek vašeho mazlíčka a krátká videa",
      ],
      cta: "Začít zdarma",
    },
    challenge: {
      name: "12týdenní výzva PetPrep",
      badge: "12 týdnů + certifikát",
      unit: "za mazlíčka · 12 týdnů",
      text: "Pro rodiny, které chtějí celý zážitek a na konci certifikát.",
      features: [
        "Vše z plánu Kříženec",
        "Náročná plemena, jako je [border kolie](breed:border_collie)",
        "Nálady vašeho mazlíčka v podobě AI videí",
        "Certifikát odpovědnosti",
        "Jedna cena, když se o mazlíčka dělí sourozenci",
        "Přístup pro oba rodiče",
      ],
      cta: "Vybrat výzvu",
    },
    note:
      "Platí se v aplikaci přes App Store nebo Google Play. Druhý mazlíček ve stejné rodině je samostatná výzva. Ceny jsou včetně DPH, pokud se uplatňuje.",
  },
  earlyAccess: {
    title: "Získejte předběžný přístup",
    text: "Buďte mezi prvními rodinami, které PetPrep vyzkouší. Až bude připravený, pošleme vám e-mail – nic jiného.",
    label: "Vaše e-mailová adresa",
    placeholder: "vy@example.com",
    button: "Získat předběžný přístup",
    sending: "Odesílám…",
    successTitle: "Jste na seznamu.",
    successText: "Děkujeme! Až bude PetPrep připravený, napíšeme vám jako prvním.",
    invalid: "Zadejte prosím platnou e-mailovou adresu.",
    error: "Něco se pokazilo. Zkuste to prosím za chvíli znovu.",
    consent: "Přihlášením k odběru souhlasíte se zasíláním e-mailů o PetPrepu. Odhlásit se můžete kdykoli.",
    privacyLink: "Zásady ochrany osobních údajů",
  },
  contactCards: [
    { title: "Rodiny", text: "Otázky k aplikaci, vašemu účtu nebo výzvě.", email: "hello" },
    { title: "Soukromí", text: "Přístup k datům, export, smazání nebo jakákoli otázka k soukromí.", email: "privacy" },
    { title: "Partneři", text: "Prodejny chovatelských potřeb, útulky, veterináři, trenéři, pojišťovny a školy.", email: "partners" },
    { title: "Investoři", text: "Podklady pro investory, prezentace a data room na vyžádání.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Je vaše dítě připravené na mazlíčka? Zjistěte to za 12 týdnů.",
      description:
        "Než k vám domů přijde skutečný mazlíček, bude se vaše dítě 12 týdnů starat o realistického AI mazlíčka: krmit ho, uklízet po něm, chodit na skutečné procházky. Každý den uvidíte, jestli je opravdu připravené.",
    },
    hero: {
      eyebrow: "12týdenní výzva PetPrep",
      title: "Připraveni na mazlíčka. Po jeho boku celý život.",
      lead:
        "Než k vám domů přijde skutečný mazlíček, bude se o realistického AI mazlíčka 12 týdnů starat vaše dítě – krmit ho, uklízet po něm a chodit s ním na skutečné procházky. Každý den uvidíte, jestli je opravdu připravené.",
      trust: ["Kříženec zdarma navždy", "Žádné reklamy, žádný chat s cizími lidmi", "Děti nepotřebují e-mail"],
    },
    phone: {
      petName: "Luna",
      petAge: "Štěně · 3 měsíce",
      live: "ŽIVĚ",
      video: "Fotorealistické AI video mazlíčka",
      actions: ["Krmit", "Voda", "Procházka", "Uklidit"],
    },
    parentCard: { child: "Maya", status: "Vše v pořádku", scoreLabel: "Care Score", progress: "Týden 3 z 12 · 31 z 36 povinností včas" },
    notification: { app: "PetPrep", text: "Váš mazlíček se dívá na svou misku. Čas snídaně končí v 9:00." },
    promoVideo: {
      eyebrow: "PetPrep za minutu",
      title: "Podívejte se, jak to funguje.",
      text: "Od výběru mazlíčka a podpisu smlouvy přes školu, procházky a péči o srst až po certifikát – všechno, co vaše dítě za 12 týdnů zažije, i všechno, co uvidíte v přehledu. Curio, náš maskot, jen pozdraví; mazlíček v aplikaci je realistický AI pes.",
      alt: "Propagační video PetPrep: obrazovky aplikace, dítě starající se o psa, rodič sleduje Care Score.",
      note: "Aplikace zatím není veřejně dostupná v App Store a Google Play – přihlaste se k předběžnému přístupu.",
    },
    promise: {
      quote: "V každé rodině zazní „Slibuju, že se o něj budu starat.“ PetPrep promění slib v",
      highlight: "důkaz",
      text:
        "Když dítě v simulaci neuspěje, je to pro vaši rodinu úspěch: zjistíte to dřív, než by trpěl skutečný mazlíček, a dřív, než se zavážete k mnoha letům péče a výdajů.",
    },
    how: {
      eyebrow: "Jak to funguje",
      title: "Tři kroky od „prosím“ k „připraveni“.",
      steps: [
        {
          title: "Vyberete mazlíčka",
          text: "Založíte rodinný účet, přidáte dítě jen pod přezdívkou a vyberete mazlíčka – plemeno, útulek nebo chovatele, štěně nebo seniora.",
        },
        {
          title: "Dítě podepíše slib",
          text: "Dítě se přihlásí šestimístným kódem – bez e-mailu, bez hesla. Prstem podepíše Smlouvu o odpovědnosti a jeho jedinečný mazlíček se narodí.",
        },
        {
          title: "12 týdnů skutečné péče",
          text: "Jeden skutečný týden odpovídá jednomu měsíci života mazlíčka. Na konci čeká Certifikát odpovědnosti s Care Score – objektivní důkaz, nebo upřímné ne.",
        },
      ],
      link: "Jak to funguje podrobně",
    },
    realism: {
      title: "Co nejblíž skutečnému mazlíčkovi, jak jen aplikace dokáže.",
      text: "Časy krmení, procházky i růst vycházejí z odborných zdrojů, například od veterinárních asociací a kynologických svazů – nejsou vymyšlené jen pro hru.",
      items: [
        { title: "Skutečné procházky, skutečné kroky", text: "Denní procházka se počítá z kroků v telefonu dítěte. Dnes bez procházky? Mazlíček to pozná zítra." },
        { title: "Mazlíček roste", text: "Štěně jí čtyřikrát denně, pak třikrát, pak dvakrát – a jak roste, dostává novou fotku." },
        { title: "Chová se jako živý", text: "Štěňata potřebují ven. Znuděný pes rozkouše pantofle. Loužička se objeví dřív než večeře." },
        { title: "Respektuje školu a spánek", text: "Klidové hodiny utiší připomínky. Krmení, které vyjde na dobu školy, je starost rodiče, ne dítěte." },
        { title: "Skutečné důsledky, ale citlivě", text: "Zanedbání znamená návštěvu veterináře nebo útulek – nikdy nic děsivého a vždy s možností začít znovu." },
        { title: "Jedinečný", text: "Každý mazlíček má vlastní srst, kresbu i oči – fotorealistické a nikdy dvakrát stejné." },
      ],
    },
    parents: {
      eyebrow: "Pro rodiče",
      title: "Pravdu vidíte v reálném čase.",
      text: "Jasný semafor pro každé dítě, Care Score z povinností splněných včas a časová osa, kdo co udělal. Sourozenci, kteří se dělí o jednoho mazlíčka, mají každý své vlastní, spravedlivé skóre.",
      points: [
        { strong: "Klidové hodiny a tlačítko pauzy", text: "vše máte pod kontrolou." },
        { strong: "Děti se přihlašují kódem", text: "bez e-mailu, bez příjmení, bez reklam." },
        { strong: "Oba rodiče, všechny děti", text: "jedna rodina, jeden přehled." },
      ],
      link: "Všechno, co rodiče vidí",
    },
    adults: {
      eyebrow: "Pro dospělé",
      title: "Vyzkoušejte si plemeno dřív, než si ho přivedete domů.",
      text: "Už máte vyhlédnuté plemeno? PetPrep není jen pro děti. Po dobu 12 týdnů se staráte o AI mazlíčka tohoto plemene s jeho skutečnými denními potřebami – a ještě před koupí nebo adopcí zjistíte, jestli je opravdu pro vás.",
      points: [
        {
          strong: "Skutečné potřeby plemene",
          text: "krmení v časových oknech, voda, úklid a denní cíl kroků podle doložených nároků na pohyb: dospělá border kolie potřebuje 12 000 kroků denně, kříženec 6 000.",
        },
        {
          strong: "Výcvik a nehody štěňat",
          text: "každý den krátký výcvik a štěně, které vydrží jen asi hodinu na každý měsíc věku, než musí ven – jinak je na zemi loužička.",
        },
        {
          strong: "12 týdnů ukáže, zda zapadne do vašeho života",
          text: "do vašich pracovních dnů, volného času i počasí. A protože jde o rodinného psa, můžete později přidat partnera nebo děti.",
        },
      ],
      how: "Jak na to: založte si účet rodiče, přidejte sebe jako profil pečovatele a přihlaste se šestimístným kódem – na stejném nebo jiném telefonu.",
      note: "Už dnes si můžete vybrat křížence a domácí kočku zdarma a ve 12týdenní výzvě kterékoli plemeno psa nebo kočky z [encyklopedie zvířat](page:animals).",
      link: "Jak používat PetPrep sami",
    },
    after: {
      eyebrow: "Až přijde domů",
      title: "Když přijde skutečný mazlíček, PetPrep zůstává.",
      text: "Klepněte na „Máme skutečného mazlíčka“ a ze simulátoru se stane AI asistent na další roky – a rytmus vaší rodiny už zná.",
      features: [
        { title: "Chytrý obojek", text: "Aktivita a upozornění, když něco není v pořádku." },
        { title: "AI jako první kontakt", text: "Odpoví rychle a pak předá věc skutečnému veterináři." },
        { title: "Růst a krmivo", text: "Týdenní vážení, růstová křivka a připomenutí, kdy změnit krmivo." },
        { title: "Důvěryhodní partneři", text: "Veterináři, trenéři a pojišťovny ve vašem okolí, vždy jasně označení." },
        { title: "DNA test", text: "Jaká plemena se skrývají ve vašem křížencovi – a na co si dát pozor." },
        { title: "Karta pro veterináře", text: "Směs plemen a výsledky DNA na jednom místě, připravené pro veterináře." },
      ],
      link: "O AI asistentovi",
      planned: "Ve vývoji",
    },
    species: {
      title: "Dnes psi a kočky. Další druhy přijdou.",
      text: "Vytvořeno pro rodiny z celého světa, v jejich vlastním jazyce.",
      chips: [
        { label: "Pes · k dispozici", active: true, link: "species:dog" },
        { label: "Kočka · k dispozici", active: true, link: "species:cat" },
        { label: "Plemena psů a koček · ve výzvě", link: "page:animals" },
        { label: "Další druhy · plánováno", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Ceník", title: "Jednoduché, férové ceny." },
    faq: { title: "Na co se rodiče ptají", link: "Všechny otázky" },
    final: { title: "Připraveni na mazlíčka?", text: "Zjistěte to za 12 týdnů. Začněte zdarma na iPhonu nebo Androidu." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Jak PetPrep funguje – 12týdenní výzva, která ukáže, zda jste připraveni na mazlíčka",
        description:
          "Jak funguje 12týdenní výzva PetPrep: výběr mazlíčka, Smlouva o odpovědnosti, každodenní péče, skutečné procházky, klidové hodiny a certifikát.",
      },
      eyebrow: "Jak to funguje",
      title: "Dvanáct týdnů, které ukážou, kolik slib váží.",
      lead:
        "Vaše dítě pečuje o fotorealistického AI mazlíčka, který se chová co nejvíc jako skutečný. Jeden skutečný týden odpovídá jednomu měsíci jeho života, takže za 12 týdnů mazlíček vyroste – a vy uvidíte, jestli péče vydrží.",
      blocks: [
        {
          type: "steps",
          heading: "Od prvního klepnutí k certifikátu",
          items: [
            { title: "Rodič založí rodinu", text: "Zaregistrujete se e-mailem (přihlášení přes Apple a Google se připravuje). Každé dítě přidáte pod přezdívkou a volitelně i s rokem narození. Na nic dalšího se na vaše dítě neptáme." },
            { title: "Vyberete mazlíčka", text: "Zvolíte plemeno (kříženec je zdarma), původ – z útulku, nebo od chovatele – a věk při příchodu domů: štěně, mladý, dospělý nebo senior." },
            { title: "Dítě se přihlásí kódem", text: "Dostanete šestimístný kód platný 15 minut. Dítě ho zadá do svého telefonu – bez e-mailu a bez hesla. Ztracený telefon? Jedním klepnutím ho odhlásíte ze všech zařízení." },
            { title: "Smlouva o odpovědnosti", text: "Dítě slib podepíše prstem. Podpisem se mazlíček narodí: jeho potřeby se začnou počítat až od té chvíle, takže pozdější podpis nic neubere." },
            { title: "Dvanáct týdnů péče", text: "Krmení ve správných časových oknech, čerstvá voda, úklid a denní procházka se skutečnými kroky. S tím, jak mazlíček roste, se mění i jeho potřeby." },
            { title: "Certifikát", text: "Po 12 týdnech je mazlíčkovi jeden rok. Dítě dostane Certifikát odpovědnosti se svým Care Score – nebo oba bez rizika zjistíte, že teď není ta správná chvíle." },
          ],
        },
        {
          type: "screens",
          heading: "Co vidí vaše dítě",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Co dospělý pes kříženec potřebuje každý den",
          intro: "Čísla vycházejí z veterinárních a kynologických zdrojů; kde zdroje uvádějí jen rozpětí, určuje hodnotu PetPrep a výslovně to uvádí.",
          head: ["Potřeba", "Jak často", "Když se vynechá"],
          rows: [
            ["Krmení", "Ráno (6–10) a večer (17–21), vždy jednou v každém okně", "Hlad asi po 12,5 hodiny"],
            ["Voda", "3krát denně, vždy s odstupem alespoň 3 hodin", "Žízeň asi po 10 hodinách"],
            ["Procházka", "6 000 skutečných kroků (štěňata začínají na 2 000)", "Bez procházky → nemoc další ráno"],
            ["Úklid", "Když mazlíček udělá nepořádek – nikdy během klidových hodin", "Žádné jídlo ani voda, dokud není uklizeno"],
          ],
          note: "Štěňata jedí 4krát, pak 3krát a nakonec 2krát denně a vydrží jen asi hodinu na každý měsíc věku. [Border kolie](breed:border_collie) potřebuje 12 000 kroků a vyhládne rychleji.",
        },
        {
          type: "cards",
          heading: "Postavené na skutečném rodinném životě",
          columns: 3,
          items: [
            { title: "Klidové hodiny", text: "Nastavte si dobu školy a spánku. Mazlíček zvolní, nechodí žádné připomínky a nepořádek v tu dobu nikdy nevznikne." },
            { title: "Krmení během školy", text: "Krmení, jehož okno celé vyjde na klidové hodiny, je úkol rodiče – dítěti se nikdy nepočítá." },
            { title: "Pauza kdykoli", text: "Jedno tlačítko hru zastaví, třeba kvůli rodinnému rozhovoru. Během pauzy se nic nezhorší." },
            { title: "Jemné připomínky", text: "Mazlíček dítě nejdřív upozorní jemně, potom naléhavěji. Vy dostanete upozornění až tehdy, když některá potřeba zůstane hodinu na nule." },
            { title: "Skutečné důsledky", text: "Zanedbání znamená 12 hodin u veterináře. Celý den bez péče znamená, že mazlíčka převezme útulek – a můžete začít znovu." },
            { title: "Mazlíček pro sourozence", text: "Sourozenci se mohou o mazlíčka dělit. Každý úkon se připíše dítěti, které ho udělalo, takže skóre zůstává spravedlivé." },
          ],
        },
        {
          type: "callout",
          title: "I neúspěch je výsledek.",
          text: "Pokud mazlíček skončí ve virtuálním útulku, dozvěděli jste se něco cenného – dřív, než by to zaplatil skutečný mazlíček. Můžete začít znovu, třeba s nenáročnějším plemenem.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Pro rodiče – přehled, Care Score a ovládání v PetPrepu",
        description:
          "Co rodiče v PetPrepu vidí: denní semafor pro každé dítě, Care Score, povinnosti, přehledy, oznámení, klidové hodiny, pauzu a soukromí už od návrhu.",
      },
      eyebrow: "Pro rodiče",
      title: "Objektivní důkaz, ne další slib.",
      lead:
        "Nebudete muset hádat, jestli procházky opravdu proběhly. PetPrep měří péči podle jasných denních povinností a ukazuje vám, dítě po dítěti, jak to jde.",
      blocks: [
        {
          type: "cards",
          heading: "Semafor",
          intro: "Každé dítě i každý mazlíček dostanou barvu pro dnešní den podle místního času vaší rodiny – vždy se slovním vysvětlením.",
          columns: 3,
          items: [
            { title: "Zelená – vše v pořádku", text: "Povinnosti jdou podle plánu.", tag: "ok" },
            { title: "Žlutá – vyžaduje pozornost", text: "Dnes se nestihly víc než dvě povinnosti.", tag: "warn" },
            { title: "Červená – naléhavé", text: "Mazlíček dnes onemocněl, některá potřeba je déle než hodinu na nule, nebo mazlíček skončil v útulku.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = povinnosti splněné včas ÷ očekávané povinnosti × 100, minus 10 bodů za každé onemocnění, v rozmezí 0 až 100.",
            "Povinnost je jeden konkrétní úkol: každé okno krmení, každé ze tří doplnění vody, uklizení každého nepořádku do dvou hodin (škola a spánek se nepočítají) a splnění denního cíle procházky.",
            "Doba, kdy byla hra pozastavená, mazlíček byl u veterináře nebo ještě nebyla podepsaná smlouva, se dítěti nikdy nepočítá. Uplynulé dny jsou uzamčené, takže skóre nejde zpětně přepsat.",
            "Sourozenci, kteří se dělí o mazlíčka, mají každou povinnost spravedlivě rozdělenou. Počítají se jen úkony, které dítě udělalo samo – když jedno udělá všechno, má 100 a druhé 0.",
          ],
        },
        {
          type: "screens",
          heading: "Váš pohled",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Vše máte pod kontrolou",
          items: [
            "Klidové hodiny pro školu a spánek ve vašem místním čase – i při přechodu na letní a zimní čas.",
            "Hru můžete u kteréhokoli mazlíčka pozastavit jedním potvrzeným klepnutím; obrazovka dítěte se okamžitě zamkne.",
            "Druhého rodiče pozvete jednorázovým kódem; oba vidíte každé dítě i každého mazlíčka.",
            "Při ztrátě telefonu odhlásíte dítě ze všech zařízení; kódy jsou jednorázové a vyprší za 15 minut.",
            "Všechna data rodiny můžete exportovat jako soubor, nebo v aplikaci okamžitě smazat profil dítěte či celý účet.",
          ],
        },
        {
          type: "list",
          heading: "Soukromí už od návrhu",
          items: [
            "Děti se přihlašují kódem – bez e-mailu, bez hesla, bez příjmení.",
            "Ukládáme přezdívku a rok narození, pokud ho zadáte. Nic dalšího o vašem dítěti neukládáme.",
            "Oznámení nikdy neobsahují jméno dítěte ani mazlíčka, protože se mohou zobrazit na zamčené obrazovce.",
            "Kroky se berou z Apple Health (iPhone) nebo Health Connect (Android), pokud to povolíte (jen ke čtení), a kde to jde, z pohybového senzoru telefonu. PetPrep nepoužívá GPS a nesleduje polohu.",
            "Žádné reklamy, žádný chat s cizími lidmi, servery v EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Až přijde domů – AI asistent PetPrep pro vašeho skutečného mazlíčka",
        description:
          "Když si rodina pořídí skutečného mazlíčka, PetPrep se stane AI asistentem: aktivita z chytrého obojku, upozornění, první kontakt přes AI a poté skutečný veterinář, růst a krmivo.",
      },
      eyebrow: "Až přijde domů",
      title: "Simulace končí. Péče ne.",
      lead:
        "Když si vaše rodina přivede domů skutečného mazlíčka, jedno klepnutí promění PetPrep v asistenta na celý jeho život – v reálném čase, bez herních ukazatelů zdraví a s rytmem vaší rodiny, který už zná.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Co bude asistent umět",
          columns: 2,
          items: [
            { title: "Propojení s chytrým obojkem", text: "Připojte oblíbené GPS lokátory a monitory aktivity – nebo obojek PetPrep – a uvidíte aktivitu v souvislostech." },
            { title: "Upozornění, která vysvětlují", text: "„Max dnes uběhl 2 km, tedy polovinu obvyklé vzdálenosti, a snědl větší porci. Další procházka navečer mu pomůže se zklidnit.“ Jedno pozorování, jeden důvod, jeden návrh." },
            { title: "Nejdřív AI, potom skutečný veterinář", text: "Položte otázku nebo nahrajte fotku. Asistent odpoví na obecné otázky, odhadne naléhavost a v případě potřeby vás předá skutečnému veterináři – naléhavé příznaky vás hned odešlou k veterináři." },
            { title: "DNA test pro psa nebo kočku", text: "Objednejte DNA test v aplikaci nebo nahrajte výsledek testu, který už máte. PetPrep ukáže, která plemena jsou ve směsi, co je pro ně typické a které zdravotní problémy jsou u těchto plemen častější – s uvedením zdrojů. Procentuální zastoupení plemen není diagnóza a DNA test neukáže alergie." },
            { title: "Karta pro veterináře", text: "Směs plemen a případné přímé nálezy z DNA na jedné stránce nebo v QR kódu, takže veterinář hned ví, co se v křížencovi skrývá." },
            { title: "Růst a výživa", text: "Zapisujte váhu každý týden, sledujte růstovou křivku a nechte si připomenout, kdy je čas změnit krmivo." },
          ],
        },
        {
          type: "screens",
          heading: "Náhled",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Zásady, ze kterých neslevíme",
          items: [
            "AI asistent není veterinář a nikdy nestanoví diagnózu. Každá odpověď o zdraví ukazuje cestu ke skutečnému veterináři.",
            "Nabídky partnerů (obchody, pojišťovny, trenéři, veterináři) jsou vždy označené a uvádíme, když dostáváme provizi.",
            "Bez vašeho souhlasu se s partnerem nic nesdílí.",
            "Data vašeho dítěte z výzvy se do asistenta přenesou, jen pokud s tím souhlasíte.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Ceník – PetPrep začíná zdarma, 12týdenní výzva za 49,99 €",
        description:
          "Kříženec je zdarma navždy. 12týdenní výzva PetPrep stojí 49,99 € za mazlíčka jako jednorázový nákup. Sourozenci, kteří se o mazlíčka dělí, platí jednu cenu.",
      },
      eyebrow: "Ceník",
      title: "Jednoduché, férové ceny.",
      lead: "Začněte zdarma s křížencem. Celou 12týdenní výzvu si kupte, až budete chtít – 12 týdnů začne běžet až nákupem.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Přání – věci pro vašeho mazlíčka",
          intro:
            "Dítě si v aplikaci řekne o věci pro svého mazlíčka; vy rozhodnete a koupíte. Dítě cenu nikdy nevidí. Předměty mění jen vzhled: nikdy neovlivní potřeby, Care Score ani certifikát. Dostupné i u bezplatného křížence a domácí kočky.",
          head: ["Předmět", "Cena"],
          rows: [
            ["Pelíšek (kočka: košík)", "5,99 €"],
            ["Misky na jídlo a vodu", "5,99 €"],
            ["Hračka (pes: přetahovadlo nebo pískací hračka, kočka: plyšová myška nebo hůlka s peřím)", "5,99 € za hračku"],
            ["Pamlsky, balení po 10 kusech", "2,99 €"],
            ["Uvítací balíček: pelíšek + misky + hračka", "15,99 € (místo 17,97 €)"],
          ],
          note: "Přání přibudou s příští aktualizací aplikace; koupit je půjde, až budou předměty k dispozici v App Store a Google Play. Uvedené ceny platí pro Slovinsko; obchod ukáže cenu pro vaši zemi.",
        },
        {
          type: "faq",
          heading: "Otázky o cenách",
          items: [
            { q: "Je verze zdarma opravdu zdarma?", a: "Ano. Kříženec je zdarma navždy, a to s celou simulací, skutečnými procházkami i rodičovským přehledem." },
            { q: "Co výzva zahrnuje?", a: "Náročná plemena, jako je [border kolie](breed:border_collie), nálady vašeho mazlíčka v podobě AI videí, na konci Certifikát odpovědnosti a přístup pro oba rodiče." },
            { q: "Platí sourozenci dvakrát?", a: "Ne. Děti, které se dělí o jednoho mazlíčka, platí jednu cenu. Druhý mazlíček v rodině je samostatná výzva." },
            { q: "Jak zaplatím?", a: "Přímo v aplikaci přes App Store nebo Google Play. Vrácení peněz vyřizuje obchod, ve kterém jste nakupovali." },
            { q: "Co jsou Přání a může dítě něco koupit samo?", a: "Dítě může pro svého mazlíčka požádat o pelíšek, misky, hračku nebo pamlsky – najednou může mít otevřené až tři žádosti. Dostanete oznámení a věc buď koupíte, nebo zvolíte „Teď ne“. Dítě ceny nikdy nevidí a v dětské aplikaci nemůže nic koupit." },
            { q: "Usnadní koupené předměty hru?", a: "Ne. Předměty mění jen vzhled. Nikdy neovlivní potřeby, Care Score ani certifikát a v Přáních není žádný veterinář ani lék – nikdy tu nenajdete „zaplať a zachraň svého mazlíčka“." },
            { q: "Platí to stejně pro dospělé?", a: "Ano. Pokud PetPrep používáte sami k vyzkoušení plemene, platí totéž: kříženec je zdarma navždy a 12týdenní výzva stojí 49,99 € za mazlíčka." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Časté otázky – na co se rodiče PetPrepu ptají",
        description:
          "Odpovědi o PetPrepu: kolik času denně zabere, používání dospělými, soukromí a poloha, kroky, sourozenci, co když dítě neuspěje, jazyky, druhy zvířat, skutečný mazlíček.",
      },
      eyebrow: "Časté otázky",
      title: "Na co se rodiče ptají.",
      lead: "Krátké, upřímné odpovědi. Něco chybí? Napište nám.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Pro jaký věk je PetPrep?", a: "PetPrep je určený hlavně dětem zhruba od 7 do 12 let a dobře funguje až do 16 let. Používají ho i dospělí, kteří si chtějí před koupí nebo adopcí ověřit, jestli jim určité plemeno opravdu sedne." },
            { q: "Mohu PetPrep používat i bez dětí?", a: "Ano. Založte si účet rodiče a přidejte sebe jako profil pečovatele – stačí přezdívka, rok narození nechte prázdný. Vyberte plemeno, vytvořte šestimístný kód, na stejném nebo jiném telefonu zvolte „Jsem dítě“ a kód zadejte – tím se stanete pečovatelem. Protože půjde o rodinného psa, můžete později přidat partnera nebo děti a starat se o něj společně. Cena je stejná jako pro rodiny." },
            { q: "Kolik času to denně zabere?", a: "Pár minut na krmení, vodu a úklid – plus procházka, kterou by skutečný pes potřeboval tak jako tak." },
            { q: "Sleduje aplikace polohu mého dítěte?", a: "Ne. U procházek počítá jen kroky. Pokud to dovolíte, čte je z Apple Health (iPhone) nebo Health Connect (Android) – jen ke čtení a jen kroky; kde to jde, využívá i pohybový senzor telefonu. O povolení žádá na obrazovce procházky. GPS se nepoužívá." },
            { q: "Potřebuje moje dítě e-mailovou adresu?", a: "Ne. Účet založíte vy; dítě se přihlašuje šestimístným kódem, který pro něj vytvoříte. Ukládáme jen přezdívku a volitelně rok narození." },
            { q: "Co když dítě zapomene?", a: "Mazlíček nejdřív posílá jemné připomínky. Pokud některá potřeba zůstane na nule, onemocní a stráví 12 hodin u veterináře. Po celém dni bez péče ho převezme virtuální útulek – a můžete začít znovu." },
            { q: "Mohou se sourozenci o mazlíčka dělit?", a: "Ano. Každé dítě podepíše vlastní smlouvu, každý úkon se připíše tomu, kdo ho udělal, a každé dítě dostane vlastní spravedlivé Care Score." },
            { q: "A co škola a večerka?", a: "Nastavte si klidové hodiny. Mazlíček zvolní, nic se neposílá a krmení, které celé vyjde na klidové hodiny, zajistíte vy." },
            { q: "Není to pro děti strašidelné?", a: "Ne. Důsledky jsou skutečné, ale šetrné: mazlíček jde k veterináři nebo do útulku, nikdy se neděje nic drastického a vždy je možné začít znovu." },
            { q: "Která zvířata jsou k dispozici?", a: "Dnes [psi](species:dog) a [kočky](species:cat): kříženec a domácí kočka jsou zdarma a ve 12týdenní výzvě si můžete vybrat kterékoli plemeno z [encyklopedie zvířat](page:animals), kde najdete i jeho doložené potřeby. Další druhy plánujeme." },
            { q: "V jakých jazycích?", a: "Dnes v angličtině a slovinštině. Další jazyky přibudou postupně, jak PetPrep vstoupí do dalších zemí." },
            { q: "Co se stane, až si pořídíme skutečného mazlíčka?", a: "PetPrep se může stát AI asistentem pro vašeho skutečného mazlíčka. Tato část je ve vývoji." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partneři – spolupracujte s PetPrepem",
        description:
          "PetPrep spolupracuje s prodejnami chovatelských potřeb, útulky, veterináři, trenéry, pojišťovnami, výrobci obojků a školami, aby si rodiny mazlíčky pořizovaly zodpovědně.",
      },
      eyebrow: "Partneři",
      title: "Lépe připravené rodiny – pro každého, komu na zvířatech záleží.",
      lead:
        "Rodiny, které PetPrep dokončí, vědí, co péče o skutečného mazlíčka obnáší. Budujeme síť partnerů, která je osloví ve správnou chvíli – jasně označeně a vždy se souhlasem rodiny.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "S kým spolupracujeme",
          columns: 3,
          items: [
            { title: "Prodejny chovatelských potřeb", text: "Oslovte rodiny ve chvíli, kdy prokážou, že jsou připravené – třeba nabídkou startovní sady k certifikátu." },
            { title: "Útulky, záchranné spolky a chovatelé", text: "Doporučte PetPrep před adopcí nebo koupí – ubude unáhlených rozhodnutí a vrácených zvířat." },
            { title: "Veterináři", text: "Jakmile má rodina skutečného mazlíčka doma, AI asistent odpoví na první otázky a odkáže majitele na vás – se shrnutím případu, které sdílí jen se souhlasem." },
            { title: "Trenéři a kynologické školy", text: "Doporučení a rezervace ve chvíli, kdy rodina přechází ke skutečnému psovi." },
            { title: "Pojišťovny pro zvířata", text: "Nabídky podle plemene při registraci skutečného mazlíčka – jasně označené." },
            { title: "Výrobci obojků a IoT", text: "Propojení dat o aktivitě pro chytřejší upozornění, která vysvětlují." },
          ],
        },
        {
          type: "list",
          heading: "Proč nám partneři důvěřují",
          items: [
            "Děti se přihlašují bez e-mailu, jejich data držíme na minimu a na serverech v EU.",
            "Na obrazovku dítěte se dostane jen ověřený obsah; nejsou tu žádné reklamy.",
            "Každá nabídka partnera je označená a o každé provizi se rodina dozví.",
          ],
        },
        { type: "callout", title: "Pojďme si promluvit.", text: "Podmínky partnerství připravujeme. Napište nám, kdo jste a co máte v plánu.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investujte do PetPrepu – od připravenosti na mazlíčka k péči na celý život",
        description:
          "PetPrep promění slib dítěte v důkaz dřív, než si rodina pořídí mazlíčka, a poté se stane AI asistentem na celý jeho život. Před spuštěním; podklady na vyžádání.",
      },
      eyebrow: "Investoři",
      title: "Od 12týdenní výzvy ke vztahu na 10–15 let.",
      lead:
        "PetPrep dává rodičům objektivní důkaz, jestli je jejich dítě připravené na skutečného mazlíčka – a pak s rodinou zůstává po celý jeho život.",
      blocks: [
        {
          type: "cards",
          heading: "Příležitost",
          columns: 3,
          items: [
            { title: "Problém", text: "Děti slibují, že se o mazlíčka postarají; rodiče ale nemají nestranný způsob, jak to ověřit dřív, než se zavážou k výdajům a letům péče." },
            { title: "Řešení", text: "Realistická 12týdenní simulace s živým rodičovským přehledem a objektivním Care Score, zakončená Certifikátem odpovědnosti." },
            { title: "Rozšíření", text: "Jakmile přijde domů skutečný mazlíček, nastupuje AI asistent: data z obojku, první kontakt přes AI a poté veterinář, růst a výživa, DNA testy, služby partnerů." },
          ],
        },
        {
          type: "table",
          heading: "Obchodní model",
          head: ["Zdroj příjmů", "Model", "Stav"],
          rows: [
            ["Kříženec", "Zdarma navždy (získávání uživatelů)", "Rozhodnuto"],
            ["12týdenní výzva PetPrep", "49,99 € za mazlíčka, jednorázový nákup", "Rozhodnuto"],
            ["Přání – věci pro mazlíčka (jen vzhled)", "Nákupy v aplikaci: 5,99 € za předmět, pamlsky 2,99 € za 10 kusů, balíček 15,99 €; i ve verzi zdarma", "Hotovo, nákup v obchodě brzy"],
            ["Nabídky partnerů", "Provize od obchodů, pojišťoven, veterinářů a trenérů", "Plánováno"],
            ["AI asistent pro skutečného mazlíčka", "Předplatné", "Plánováno"],
            ["DNA testy pro psy a kočky", "Prodej testů a provize od partnerů", "Plánováno"],
          ],
        },
        {
          type: "list",
          heading: "Co už je hotové",
          items: [
            "Herní jádro na serveru se synchronizací v reálném čase, otestované na simulacích celých dnů, na dnech změny času a na hraničních situacích v rodinách.",
            "Rodiny s více rodiči, více dětmi a společnými mazlíčky, se spravedlivým skóre pro každé dítě.",
            "Jedineční fotorealističtí AI mazlíčci s měřenými a omezenými náklady na AI; média jsou uložená na pronajatých serverech v Německu (Hetzner, EU).",
            "Potřeby zvířat podle veterinárních a kynologických zdrojů, které citujeme – u každého čísla lze dohledat jeho zdroj.",
            "Bezpečnost dětí už od návrhu: přihlášení PINem bez e-mailu, minimum dat, žádné reklamy, jen ověřená média.",
          ],
        },
        {
          type: "prose",
          heading: "Fáze",
          paragraphs: [
            "PetPrep je před spuštěním, plánujeme uzavřenou betu. Prvním trhem je Slovinsko a okolní region, poté země DACH a Spojené království; produkt je od prvního dne připravený na lokalizaci do celého světa.",
            "Zakladatel: David Tacer, vývojář softwaru a podnikatel (Data Vallis David Tacer s.p., Dravograd, Slovinsko). Více [o nás](page:about).",
          ],
        },
        { type: "callout", title: "Vyžádejte si podklady pro investory.", text: "Podklady, prezentaci a data room sdílíme na vyžádání.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt PetPrep – rodiny, soukromí, partneři, investoři",
        description: "Kontaktujte PetPrep: otázky rodin, žádosti týkající se soukromí, partnerství a dotazy investorů. Odpovídáme anglicky nebo slovinsky.",
      },
      eyebrow: "Kontakt",
      title: "Čteme každou zprávu.",
      lead: "Napište na správnou adresu a odpovíme co nejdřív, anglicky nebo slovinsky.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Údaje o společnosti" }],
    },
    privacy: {
      navLabel: "Soukromí",
      meta: {
        title: "Zásady ochrany osobních údajů – PetPrep",
        description: "Jak PetPrep shromažďuje, používá a chrání osobní údaje rodičů a dětí a jak můžete uplatnit svá práva podle obecného nařízení o ochraně osobních údajů (GDPR).",
      },
      eyebrow: "Právní informace",
      title: "Zásady ochrany osobních údajů",
      lead: "Překlad – závazné je pouze anglické znění. PetPrep je určený hlavně pro děti, proto shromažďujeme co nejméně a přesně vysvětlujeme, co s údaji děláme.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Kdo odpovídá",
              paragraphs: [
                "Správcem osobních údajů zpracovávaných prostřednictvím aplikace PetPrep a tohoto webu je {company}, {address}; {companyIds}. Kontakt pro otázky ochrany soukromí: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Co shromažďujeme",
              items: [
                "Účet rodiče: jméno (jak vás rodina oslovuje), e-mailová adresa, heslo (uložené jen jako bezpečný hash), časové pásmo vašeho zařízení a čas, kdy jste přijali podmínky a tyto zásady.",
                "Profil pečovatele (dítě nebo dospělý, který se o zvíře stará): přezdívka do 30 znaků a volitelně rok narození – u dospělého zůstává prázdný. Žádný e-mail, heslo, příjmení ani datum narození.",
                "Zařízení: model telefonu (například „iPhone“, nikdy název, který telefonu dal uživatel) a pro push oznámení token, platforma a verze aplikace.",
                "Aktivita péče: úkony v simulaci (krmení, voda, úklid, procházky), denní součty kroků (nebo součty záběrů vozíku v upraveném režimu – viz oddíly 3 a 4), skóre a přehledy.",
                "Smlouva o odpovědnosti: podpis dítěte prstem, uložený jako vektorová čára s časem podpisu.",
                "Kódy: přihlašovací a zvací kódy jsou uložené jen jako hashe a po čase vyprší.",
                "Hlášení chyb aplikace: když aplikace zamrzne nebo spadne, může odeslat krátké technické hlášení na náš server v EU (typ a text chyby, místo v kódu, verze aplikace a operačního systému, název obrazovky, role rodič/dítě). Neobsahuje jméno, e-mailovou adresu, ID uživatele ani IP adresu, nesdílí se s žádnou třetí stranou a po 30 dnech se maže.",
                "Seznam pro předběžný přístup (tento web): vaše e-mailová adresa, jazyk stránky a čas přihlášení.",
              ],
            },
            {
              heading: "3. Údaje o zdraví a kondici (kroky, Apple Health a Health Connect)",
              paragraphs: [
                "PetPrep přistupuje k jednomu druhu údajů o zdraví a kondici a shromažďuje je: kolik kroků pečovatel za den ujde (fyzická aktivita). Používáme je jen pro jednu funkci – denní procházku zvířete v simulaci: dítě chodí a jeho kroky se počítají jako procházka zvířete.",
                "Jak k nim přistupujeme: kroky počítá aplikace v telefonu dítěte. Pokud to povolíte v systémovém dialogu oprávnění, čte je z Apple Health (iPhone) nebo Health Connect (Android) – jen pro čtení a jen kroky. Kde je to možné, používá i pohybový senzor telefonu (Android: oprávnění „Fyzická aktivita“; iPhone: „Pohyb a kondice“); bez oprávnění pro Apple Health nebo Health Connect počítá kroky jen pohybový senzor.",
                "Co shromažďujeme: aplikace posílá na náš server jen dnešní součet kroků, jeho zdroj (Apple Health, Health Connect nebo pohybový senzor) a čas odeslání. Ukládáme jeden denní součet na profil pečovatele – nikdy jednotlivé pohyby, trasy, polohu, tep, spánek, váhu ani žádné jiné údaje o zdraví. Do Apple Health ani Health Connect nikdy nic nezapisujeme.",
                "Jak je používáme a sdílíme: součty kroků slouží jen k průběhu procházky v simulaci a k jejímu zobrazení rodiči (přehled a hlášení). Nepoužíváme je k reklamě, profilování, posuzování zdraví ani k trénování AI modelů, neprodáváme je a nesdílíme je s třetími stranami; ukládá je za nás jen náš poskytovatel hostingu (Hetzner, servery v EU). Způsob, jakým používáme údaje získané z Health Connect, odpovídá zásadám oprávnění Health Connect včetně požadavků na omezené použití (Limited Use).",
                "Právní základ a doba uchování: čtení kroků je volitelné a probíhá jen s oprávněním, které udělíte v zařízení; denní součet zpracováváme, abychom poskytli službu, kterou jste si zvolili (plnění smlouvy). Součty kroků jsou součástí exportu dat vaší rodiny a mažou se společně s profilem pečovatele nebo vaším účtem; z našich šifrovaných záloh zmizí nejpozději do 35 dnů.",
                "Oprávnění můžete kdykoli odvolat v nastavení zařízení: iPhone → Nastavení → Zdraví → Přístup k datům a zařízení → PetPrep; Android → Health Connect → Oprávnění aplikací → PetPrep. Oprávnění k pohybovému senzoru můžete odvolat v nastavení telefonu pro aplikaci PetPrep. Procházka pak nepočítá žádné nové kroky.",
              ],
            },
            {
              heading: "4. Upravený režim (záběry vozíku)",
              paragraphs: [
                "Upravený režim je pro děti, které používají invalidní vozík: procházka pak místo kroků počítá záběry vozíku. Do aplikace přijde s další aktualizací; níže popisujeme, jaké údaje zpracováváme, pokud ho rodič zapne.",
                "Pokud rodič zapne dítěti upravený režim, ukládáme jen skutečnost, že je zapnutý. Neptáme se na důvod, diagnózu ani zdravotní stav a neukládáme je.",
                "Dokud je zapnutý, aplikace v telefonu dítěte čte místo kroků jen záběry vozíku – z Apple Health (zaznamenané hodinkami Apple Watch), se samostatným oprávněním jen pro čtení. Na Androidu aplikace záběry nečte; místo toho minuty procházky zapisuje rodič. Pohybový senzor pak nepoužívá. Na náš server jde jen dnešní počet záběrů; u daného dne si poznamenáme, že se počítaly záběry.",
                "Rodič může dítěti v upraveném režimu zapsat minuty procházky (jen pro dnešek). Ukládáme datum, počet minut a to, který rodič procházku zapsal.",
                "Protože skutečnost, že je upravený režim zapnutý, může naznačovat zdravotní stav dítěte, zpracováváme ji jen na základě vašeho výslovného souhlasu (čl. 9 odst. 2 písm. a) GDPR), který jako rodič nebo zákonný zástupce udělujete jménem dítěte (čl. 8 GDPR) zapnutím přepínače. Režim můžete kdykoli vypnout; aplikace pak znovu počítá kroky.",
                "Tyto údaje (přepínač, dny počítané v záběrech a zapsané procházky) jsou součástí exportu dat vaší rodiny a mažou se společně s profilem dítěte nebo vaším účtem; z našich šifrovaných záloh zmizí nejpozději do 35 dnů, stejně jako všechny ostatní údaje.",
              ],
            },
            {
              heading: "5. Co neshromažďujeme",
              items: [
                "Žádnou polohu: PetPrep nepoužívá GPS.",
                "Žádné jiné údaje o zdraví z Apple Health nebo Health Connect kromě denního počtu kroků nebo záběrů vozíku.",
                "Žádnou reklamu a v aplikaci žádné reklamní ani sledovací SDK třetích stran.",
                "Žádný chat mezi uživateli.",
                "Na tomto webu žádné reklamní cookies. Analytické cookies se nastavují jen tehdy, když je povolíte (viz Cookies níže).",
              ],
            },
            {
              heading: "6. Proč údaje zpracováváme (účely a právní základy)",
              items: [
                "Abychom poskytli službu, o kterou jste požádali: účty, simulace, přehled, hlášení a oznámení (plnění smlouvy).",
                "Ke zpracování nákupů přes App Store nebo Google Play (plnění smlouvy).",
                "Pro denní procházku (denní součty kroků – údaje o zdraví a kondici, viz oddíl 3): plnění smlouvy; čtení z Apple Health, Health Connect nebo pohybového senzoru jen s oprávněním, které udělíte v zařízení.",
                "Pro upravený režim (skutečnost, že je zapnutý, záběry vozíku a zapsané procházky): výslovný souhlas rodiče udělený zapnutím přepínače (čl. 9 odst. 2 písm. a) a čl. 8 GDPR – viz oddíl 4).",
                "K zajištění bezpečnosti služby, například omezením opakovaných pokusů o přihlášení (oprávněný zájem).",
                "K provozu a zabezpečení služby pomocí hlášení chyb aplikace, která nám pomáhají opravovat zamrzání a pády (oprávněný zájem).",
                "K plnění zákonných povinností, například účetnictví u nákupů (právní povinnost).",
                "Abychom vám poslali e-mail o spuštění PetPrepu, pokud jste se přihlásili k předběžnému přístupu (souhlas – odhlásit se můžete v každém e-mailu).",
                "Abychom pomocí Google Analytics pochopili, jak návštěvníci tento web používají, jen pokud povolíte analytické cookies (souhlas – můžete ho kdykoli změnit v Nastavení cookies).",
              ],
            },
            {
              heading: "7. Děti",
              paragraphs: [
                "Účet může založit a dítě přidat jen rodič nebo zákonný zástupce. Rodič rozhoduje, co dítě může dělat, a profil dítěte může kdykoli smazat. Od dítěte nikdy nežádáme kontaktní údaje, nikdy nezobrazujeme reklamy a nikdy neumožňujeme kontakt s cizími lidmi.",
                "Držitel účtu může vytvořit profil pečovatele i pro sebe nebo pro jiného dospělého v rodině – například aby si ověřil, zda mu plemeno vyhovuje, než si ho koupí nebo adoptuje. Pro takový profil platí stejná pravidla a stejné minimum údajů; vztahuje se na něj i každá ochrana navržená pro děti.",
              ],
            },
            {
              heading: "8. Obrázky a videa vytvořené AI",
              paragraphs: [
                "Fotku a krátká videa každého zvířete vytváří AI služba jen z popisu zvířete (plemeno, srst, kresba a podobně). Popis nikdy neobsahuje jména ani žádné informace o vaší rodině. Hotová média ukládáme na pronajatých serverech v Německu (Hetzner, EU) a zobrazujeme přes krátkodobě platné odkazy.",
              ],
            },
            {
              heading: "9. Poskytovatelé služeb",
              items: [
                "Hosting: Hetzner Online (servery v EU).",
                "Generování obrázků a videí AI: fal.ai (dostává jen popis zvířete).",
                "Push oznámení: Apple Push Notification service a Firebase Cloud Messaging přes Expo; oznámení neobsahují jména.",
                "Nákupy: Apple App Store a Google Play; správa nákupů přes RevenueCat, až budou nákupy spuštěny.",
                "E-maily k předběžnému přístupu: Klaviyo (dostává jen e-mailovou adresu a jazyk, které na tomto webu zadáte).",
                "Souhlas s cookies na webu: Kockica (ukládá vaši volbu souhlasu).",
                "Analytika webu: Google Analytics 4 od Google Ireland Ltd., jen s vaším souhlasem; Google Analytics 4 IP adresy neukládá.",
              ],
            },
            {
              heading: "10. Jak dlouho údaje uchováváme",
              paragraphs: [
                "Vaše údaje uchováváme, dokud existuje váš účet. Když v aplikaci smažete profil dítěte nebo svůj účet, údaje se okamžitě smažou a nelze je obnovit; z našich šifrovaných záloh automaticky zmizí nejpozději do 35 dnů. Záznamy, které musíme ze zákona uchovávat (například u nákupů), uchováváme po dobu, kterou zákon vyžaduje. Hlášení chyb aplikace se automaticky mažou po 30 dnech.",
              ],
            },
            {
              heading: "11. Vaše práva",
              paragraphs: [
                "Máte právo na přístup ke svým údajům, jejich opravu, export a výmaz, právo vznést námitku proti zpracování a požadovat jeho omezení a právo podat stížnost u dozorového úřadu – ve Slovinsku je to Informační komisař (Informacijski pooblaščenec). V aplikaci můžete exportovat všechna data rodiny jako soubor (Správa → Účet → Exportovat moje data) a smazat profil dítěte nebo celý účet. S čímkoli dalším se na nás obraťte na {privacyEmail}.",
              ],
            },
            {
              heading: "12. Zabezpečení",
              paragraphs: [
                "Hesla a kódy ukládáme jako hashe, spojení jsou šifrovaná, živé aktualizace se doručují jen členům vaší rodiny a AI média se ověřují dřív, než se dostanou na obrazovku dítěte.",
              ],
            },
            {
              heading: "13. Změny",
              paragraphs: ["O důležitých změnách vás v aplikaci budeme informovat ještě před tím, než začnou platit. Datum nahoře ukazuje nejnovější verzi."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Nezbytné cookies zajišťují fungování webu a pamatují si vaši volbu souhlasu. Analytické cookies (Google Analytics) se nastavují jen tehdy, když je povolíte v liště, a svou volbu můžete kdykoli změnit.",
            "Tabulku níže automaticky vytváří lišta souhlasu podle toho, co na tomto webu zjistí, takže uvádí cookies, které skutečně používáme.",
          ],
          settings: "Změnit nastavení cookies",
          fallback: "Seznam cookies se načte s lištou souhlasu. Pokud ho nevidíte, povolte na této stránce skripty nebo napište na {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Podmínky použití",
      meta: {
        title: "Podmínky použití – PetPrep",
        description:
          "Podmínky používání aplikace a webu PetPrep: účty a profily dětí, 12týdenní výzva a certifikát, nákupy a vrácení peněz, obsah AI, upravený režim, férové používání, smazání a rozhodné právo.",
      },
      eyebrow: "Právní informace",
      title: "Podmínky použití",
      lead: "Překlad – závazné je pouze anglické znění. Pravidla používání PetPrepu, napsaná tak, aby se dala číst.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Služba",
              paragraphs: [
                "PetPrep poskytuje {company}, {address}; {companyIds} – stejná společnost, která je správcem údajů podle zásad ochrany osobních údajů. Tyto podmínky platí pro aplikaci PetPrep a web petprep.si.",
                "PetPrep je simulace péče o zvíře. Pomáhá rodinám i jednotlivcům zjistit, jestli jsou připraveni postarat se o skutečné zvíře – dětem i dospělým, kteří si chtějí před koupí nebo adopcí ověřit, jestli jim plemeno vyhovuje. Je to vzdělávací nástroj, nikoli veterinární ani jiné odborné poradenství.",
              ],
            },
            {
              heading: "2. Účty, profily a děti",
              items: [
                "Účty zakládají dospělí: rodiče, zákonní zástupci nebo dospělí, kteří PetPrep používají pro sebe. Registrací souhlasíte s těmito podmínkami a se zásadami ochrany osobních údajů.",
                "Pečovatelé (děti nebo dospělí) se o zvíře starají přes profil pečovatele, který vytvoří držitel účtu – ten si ho může vytvořit i pro sebe. Profil potřebuje jen přezdívku a volitelně rok narození – víc o dítěti nepotřebujeme, a proto prosím nezadávejte nic dalšího.",
                "Dítě se přihlašuje šestimístným kódem (PIN), který vytvoříte ve své aplikaci. Kód platí krátce a funguje jen jednou; dejte ho jen dítěti, kterému je určen.",
                "Jako rodič nebo zákonný zástupce odpovídáte za to, jak vaše dítě PetPrep používá: zda je pro něj vhodný, kolik času mu věnuje a zda je na procházkách v bezpečí (například v dopravě). Hru můžete u kteréhokoli zvířete kdykoli zastavit.",
                "Do rodiny můžete pozvat druhého rodiče zvacím kódem; oba vidí všechna data rodiny a oba mohou hru zastavit.",
                "Uvádějte přesné údaje a chraňte své heslo, kódy a zařízení.",
              ],
            },
            {
              heading: "3. 12týdenní výzva, Care Score a certifikát",
              items: [
                "Výzva trvá 12 týdnů (84 dnů programu) a začíná nákupem; každý pečovatel má svůj vlastní konec. Doba, kdy hra čeká na platbu, se do 12 týdnů nezapočítává.",
                "Care Score (0–100) ukazuje, jaký podíl očekávaných povinností (krmení, voda, úklid, procházka, výcvik) pečovatel splnil sám; každé onemocnění zvířete ho snižuje. Doba, kdy je hra zastavená nebo je zvíře u veterináře, i klidové hodiny se pečovateli nikdy nepočítají.",
                "Po 12 týdnech se zapíše konečné skóre, které se už nemění; péče po skončení výzvy ho neovlivní. Při skóre 70 a více můžete v aplikaci vytvořit Certifikát odpovědnosti (PDF); při nižším skóre dostanete přehled výzvy.",
                "Pokud jídlo, voda nebo čistota zůstanou 24 hodin na 0 %, zvíře je „odvezeno do útulku“ (konec hry). Hra s tímto zvířetem končí, certifikát se nevydává a dostanete přehled výzvy.",
                "Care Score a certifikát ukazují jen to, jak se pečovatel staral o simulované zvíře v aplikaci. Nejsou zárukou, že dítě ani kdokoli jiný je připravený na skutečné zvíře, nejsou odborným posudkem a nenahrazují váš vlastní úsudek ani radu veterináře, chovatele nebo útulku. Rozhodnutí o skutečném zvířeti je vždy na vás.",
                "Pravidla hry (jídlo, procházky a péče podle plemene a věku) jsou zjednodušená a vycházejí z veřejných zdrojů. Nejsou veterinární radou; na zdraví a péči o skutečné zvíře se zeptejte veterináře.",
              ],
            },
            {
              heading: "4. Funkce zdarma a placené, nákupy a vrácení peněz",
              items: [
                "Pes kříženec a domácí kočka jsou zdarma navždy a slouží k vyzkoušení PetPrepu; bezplatná zkušební verze výzvy neexistuje. Bezplatné zvíře nemá 12týdenní program ani certifikát, rodič vidí historii posledních 7 dnů a zvíře má základní sadu obrázků a videí.",
                "12týdenní výzva PetPrep s placeným plemenem je jednorázový nákup (49,99 € ve Slovinsku; obchod ukazuje cenu pro vaši zemi). Jeden nákup je jedna výzva pro jedno zvíře; každá nová výzva s novým zvířetem je nový nákup. Sourozenci, kteří se starají o stejné zvíře, platí jednou.",
                "Rodič nakupuje ve své aplikaci přes App Store nebo Google Play; v aplikaci dítěte se nakupovat nedá. Platbu zpracuje obchod podle svých vlastních podmínek.",
                "Zvíře pro výzvu můžete vytvořit ještě před nákupem. Dokud výzva není zaplacená, je hra pozastavená: zvíře bezpečně čeká, jeho potřeby neklesají a nic se nezhoršuje. Po nákupu hra pokračuje tam, kde se zastavila.",
                "Vrácení peněz řeší App Store a Google Play podle svých vlastních pravidel; požádejte o ně v obchodě, kde jste nakoupili. Pokud obchod vrátí peníze za nákup dřív, než výzva skončí, hra s tímto zvířetem se znovu pozastaví. Obrázky a videa vytvořené po nákupu zůstávají.",
                "Po konci hry (útulek) nákup zvíře neodemkne; nová výzva znamená nové zvíře a nový nákup.",
                "Přání (věci pro zvíře, až budou k dispozici): dítě může požádat, ale koupit může jen rodič, ve své aplikaci. Koupený předmět patří zvířeti, pro které byl koupen, a mění jen vzhled – neovlivňuje hru, skóre ani certifikát. Po konci hry nebo smazání zvířete zůstává nákup využitý a peníze se nevracejí. Pokud obchod peníze za nákup vrátí, předmět (u pamlsků nevyužité pamlsky) se odebere.",
                "Pokud smažete zvíře, dítě nebo účet, zatímco koupená výzva ještě běží, nákup zůstává využitý: nepřesouvá se na jiné zvíře a smazání neznamená vrácení peněz. Aplikace vás nejprve upozorní a požádá o potvrzení.",
              ],
            },
            {
              heading: "5. Obrázky a videa vytvořené AI",
              items: [
                "Obrázky a videa zvířat generuje umělá inteligence (AI) jen z popisu zvířete (plemeno, barva, srst a podobně), nikdy z údajů o vaší rodině. Jsou to ilustrace simulovaného zvířete a nemusejí přesně odpovídat žádnému skutečnému zvířeti ani standardu plemene.",
                "Tam, kde je zobrazujeme veřejně, například portréty plemen na tomto webu, jsou označené jako vytvořené AI.",
                "Vzhled nemusí být jedinečný: zvířata stejného placeného plemene a zbarvení mohou sdílet stejné obrázky a videa a zvířata zdarma dostanou jeden ze sdílených vzhledů svého plemene. Placená výzva zahrnuje větší sadu videí než zvíře zdarma.",
                "Po podpisu smlouvy nebo nákupu může příprava obrázků a videí trvat několik minut; mezitím aplikace ukazuje, že se zvíře připravuje, a označuje vše, co se ještě připravuje.",
                "Informace o plemenech v aplikaci a v encyklopedii zvířat na tomto webu jsou shrnuté z veřejných zdrojů, které uvádíme, a veterinář je neověřoval.",
              ],
            },
            {
              heading: "6. Kroky, údaje o zdraví a upravený režim",
              items: [
                "Denní procházka počítá skutečné kroky pečovatele. Pokud to povolíte, aplikace je čte z Apple Health nebo Health Connect, jen pro čtení (nikdy tam nic nezapisuje), nebo z pohybového senzoru telefonu. Které údaje zpracováváme, popisují zásady ochrany osobních údajů (oddíl 3).",
                "Upravený režim je pro děti, které používají invalidní vozík: procházka pak místo kroků počítá záběry vozíku. Můžete ho používat, pokud je funkce ve vaší verzi aplikace k dispozici. Rodič ho zapíná pro jednotlivé dítě; zapnutí je vaším souhlasem a vypnutí ho odvolává (zásady ochrany osobních údajů, oddíl 4).",
                "V upraveném režimu může rodič dítěti zapsat minuty procházky, jen pro dnešek. Za tyto záznamy odpovídáte: zapisujte jen procházky, které skutečně proběhly, protože se započítávají do Care Score a certifikátu.",
                "PetPrep nepoužívá polohu a neupozorňuje na nebezpečí během procházky; o bezpečnost procházek se staráte vy.",
              ],
            },
            {
              heading: "7. Oznámení",
              paragraphs: [
                "Pokud je v zařízení povolíte, aplikace posílá push oznámení: připomínky pečovateli, upozornění rodičům, když zvíře nemá jídlo, vodu nebo čistotu, a zprávy o nemoci, konci hry a konci výzvy. Oznámení nikdy neobsahují jméno dítěte ani zvířete a během klidových hodin se neposílají. Povolení můžete kdykoli odvolat v nastavení zařízení; bez oznámení může pečovatel zmeškat povinnosti, což ovlivní hru i skóre.",
              ],
            },
            {
              heading: "8. Férové používání",
              items: [
                "Nepokoušejte se podvádět s počtem kroků nebo záběrů, zapisovat procházky, které neproběhly, přistupovat k datům jiných rodin, provádět reverzní inženýrství ani narušovat službu.",
                "Nedávejte zvířatům urážlivá ani nevhodná jména a nezadávejte o dítěti osobní údaje, které aplikace nežádá.",
                "Účty, které tato pravidla porušují nebo ohrožují děti, můžeme omezit nebo pozastavit a nevhodné jméno zvířete můžeme odstranit.",
              ],
            },
            {
              heading: "9. Duševní vlastnictví",
              paragraphs: [
                "PetPrep, jeho logo, design, software a obsah patří společnosti {company}. Aplikaci a obrázky, videa a certifikát svého zvířete můžete používat pro osobní, nekomerční potřebu své rodiny – například je sdílet s příbuznými.",
              ],
            },
            {
              heading: "10. Odpovědnost",
              paragraphs: [
                "Snažíme se, aby byl PetPrep dostupný a přesný, ale služba se poskytuje ve stavu, v jakém je; spoléhá také na služby jiných (obchody s aplikacemi, Apple Health, Health Connect, push oznámení, AI služba), které nemáme pod kontrolou. V rozsahu, který zákon dovoluje, neodpovídáme za nepřímé škody ani za rozhodnutí o koupi nebo adopci skutečného zvířete. Nic v těchto podmínkách neomezuje práva, která máte jako spotřebitel podle kogentních předpisů.",
              ],
            },
            {
              heading: "11. Smazání účtu a ukončení používání",
              paragraphs: [
                "Profil dítěte nebo svůj účet můžete v aplikaci kdykoli smazat. Smazání je okamžité a trvalé; když svůj účet smaže poslední rodič v rodině, smaže se celá rodina. Svá data si můžete předem exportovat (Správa → Účet → Exportovat moje data). Co se stane s údaji, popisují zásady ochrany osobních údajů; co se stane s nákupem, popisuje oddíl 4.",
              ],
            },
            {
              heading: "12. Změny těchto podmínek",
              paragraphs: [
                "Tyto podmínky aktualizujeme, když se změní aplikace nebo zákon. O důležitých změnách vás budeme v aplikaci informovat předtím, než začnou platit. Datum nahoře ukazuje nejnovější verzi. Pokud se změnou nesouhlasíte, můžete svůj účet kdykoli smazat.",
              ],
            },
            {
              heading: "13. Právo a spory",
              paragraphs: [
                "Tyto podmínky se řídí právem Republiky Slovinsko. Spotřebitelé se mohou dovolávat i kogentní ochrany země, ve které žijí, a využít platformu EU pro řešení sporů online.",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Otázky k těmto podmínkám: {termsEmail}. Poskytovatel služby: {company}, {address}; {companyIds}. Otázky ochrany soukromí: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Bezpečnost dětí",
      meta: {
        title: "Bezpečnost dětí – jak PetPrep chrání děti",
        description:
          "Jak PetPrep chrání děti: účty zakládají rodiče, přihlášení kódem bez e-mailu, minimum dat, žádné reklamy ani chat, žádné sledování polohy, ověřená média.",
      },
      eyebrow: "Důvěra",
      title: "Vytvořeno pro děti od prvního řádku kódu.",
      lead: "Překlad – závazné je pouze anglické znění. Hlavním uživatelem PetPrepu je dítě, proto jsou bezpečnost a soukromí pravidly produktu, ne nastavením.",
      blocks: [
        {
          type: "cards",
          heading: "Naše standardy",
          columns: 2,
          items: [
            { title: "Každý účet zakládá rodič", text: "Děti se nemohou zaregistrovat samy. Rodič dítě přidá a vygeneruje jednorázový přihlašovací kód platný 15 minut." },
            { title: "Pro děti žádný e-mail ani heslo", text: "Dítě se přihlašuje kódem od rodiče. Na chybný, prošlý i použitý kód přijde pokaždé stejná odpověď, takže nikdo nemůže zjistit, jaké děti v PetPrepu existují." },
            { title: "Minimum dat", text: "Přezdívka a volitelně rok narození. Žádné příjmení, žádné datum narození, žádné fotky dítěte." },
            { title: "Žádné reklamy, žádný chat, žádní cizí lidé", text: "Nejsou tu žádné reklamy ani způsob, jak kontaktovat jiné uživatele." },
            { title: "Žádné sledování polohy", text: "Procházky počítají jen kroky – z Apple Health nebo Health Connect (s vaším povolením, jen pro čtení) nebo z pohybového senzoru telefonu. GPS se nepoužívá." },
            { title: "Soukromé živé aktualizace", text: "Aktualizace v reálném čase se dostanou jen k dětem, které se o daného mazlíčka starají, a k rodičům ze stejné rodiny." },
            { title: "Ověřená média", text: "Zobrazují se jen obrázky a videa vytvořené pro PetPrep a zkontrolované naším serverem, z našeho úložiště v EU." },
            { title: "Oznámení bez jmen", text: "Oznámení nikdy neobsahují jméno dítěte ani mazlíčka, protože se mohou zobrazit na zamčené obrazovce." },
          ],
        },
        {
          type: "list",
          heading: "Rodiče mají vše pod kontrolou",
          items: [
            "Klidové hodiny pro školu a spánek, bez oznámení.",
            "Tlačítko pauzy, které okamžitě zamkne obrazovku dítěte.",
            "Odhlášení dítěte ze všech zařízení najednou.",
            "Okamžitý export nebo smazání všech dat přímo z aplikace.",
          ],
        },
        { type: "callout", title: "Nahlaste nám obavu", text: "Pokud vás v PetPrepu něco znepokojuje, napište nám a odpovíme přednostně.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Přístupnost",
      meta: {
        title: "Přístupnost – PetPrep pro každé dítě",
        description:
          "Jak se PetPrep přizpůsobuje dětem, kterým dělá potíže přejíždění prstem, které používají VoiceOver nebo TalkBack nebo dávají přednost menšímu pohybu – se stejnými pravidly a body pro všechny.",
      },
      eyebrow: "Důvěra",
      title: "Každé dítě se může postarat o svého mazlíčka.",
      lead: "Některým dětem dělá potíže přejíždění prstem, jiné používají čtečku obrazovky a dalším vyhovuje méně pohybu na obrazovce. PetPrep se jim přizpůsobí – se stejnými pravidly, stejnými body a stejným certifikátem jako pro všechny ostatní.",
      blocks: [
        {
          type: "cards",
          heading: "V aplikaci",
          columns: 3,
          items: [
            { title: "Snazší gesta", text: "Místo přejíždění prstem dítě prst podrží nebo stiskne tlačítko – ve všech hrách s přejížděním: kartáčování, hůlka s peřím, výměna steliva a házení míčku. Rodič to zapíná pro každé dítě zvlášť v rodičovské části." },
            { title: "Čtečky obrazovky", text: "Se zapnutým VoiceOverem nebo TalkBackem se hry samy přepnou na podržení. Čtečka v záhlaví přečte vše o mazlíčkovi a každý krok ve hrách péče je samostatné tlačítko." },
            { title: "Méně pohybu", text: "Když má telefon nastavené omezení pohybu, pulzující tlačítka a pohupující se Curio zůstanou v klidu." },
          ],
        },
        {
          type: "cards",
          heading: "Přijde s příští aktualizací aplikace",
          items: [
            { title: "Procházky na vozíku", text: "V upraveném režimu se záběry vozíku počítají přesně jako kroky – jeden záběr je jeden krok. Rodič může také zapsat dnešní minuty procházky, takže dítě nemusí dělat nic navíc. Rodič režim zapíná pro každé dítě zvlášť a po vypnutí se označení z historie odstraní." },
          ],
        },
        { type: "callout", title: "Stejná výzva pro všechny", text: "Úpravy mění, jak dítě hraje, nikdy ne to, co se počítá. Skóre, časování i Certifikát odpovědnosti fungují úplně stejně. Nikdy se neptáme, proč dítě úpravu potřebuje.", tone: "mint" },
        { type: "callout", title: "Něco vašemu dítěti nefunguje?", text: "Napište nám, co překáží, a podíváme se na to.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Smazání účtu",
      meta: {
        title: "Smazání účtu a dat PetPrep",
        description:
          "Jak smazat účet PetPrep (Data Vallis) v aplikaci nebo e-mailem, které údaje se smažou, co se uchovává a jak dlouho.",
      },
      eyebrow: "Důvěra",
      title: "Smazání účtu PetPrep",
      lead: "Překlad – závazné je pouze anglické znění. PetPrep vytváří společnost Data Vallis. Svůj účet a data rodiny můžete kdykoli smazat – okamžitě v aplikaci, nebo e-mailem, pokud už aplikaci nemáte.",
      blocks: [
        {
          type: "steps",
          heading: "Smazání účtu v aplikaci (okamžitě)",
          items: [
            { title: "Přihlaste se jako rodič", text: "Otevřete PetPrep, klepněte na „Jsem rodič“ a přihlaste se." },
            { title: "Otevřete svůj účet", text: "Přejděte do části Správa → Účet. Volitelně: nejprve klepněte na „Exportovat moje data“ a uložte si kopii." },
            { title: "Smazat", text: "Klepněte na „Smazat účet“, potvrďte heslem (nebo přihlášením přes Google / Apple), napište DELETE a pak klepněte na „Smazat natrvalo“." },
            { title: "Hotovo", text: "Smazání je okamžité a nelze ho vrátit. Všechna vaše zařízení i zařízení vašich dětí se odhlásí." },
          ],
        },
        {
          type: "prose",
          heading: "Už aplikaci nemáte? Požádejte o smazání e-mailem",
          paragraphs: [
            "Napište na [privacy@petprep.si](mailto:privacy@petprep.si) z e-mailové adresy svého rodičovského účtu PetPrep s předmětem „Smazat můj účet“. Ověříme, že žádost pochází od vlastníka účtu, smažeme účet nejpozději do jednoho měsíce (obvykle během několika dnů) a pak vám to potvrdíme e-mailem.",
            "Chcete-li smazat jen profil jednoho dítěte, přihlaste se jako rodič a v nabídce Správa → Děti otevřete profil dítěte a zvolte Smazat profil.",
          ],
        },
        {
          type: "table",
          heading: "Co se smaže a co se uchovává",
          head: ["Údaje", "Co se stane"],
          rows: [
            ["Váš rodičovský účet (jméno, e-mail, heslo, propojení s přihlášením přes Google / Apple)", "Smaže se okamžitě"],
            ["Pokud jste jediný rodič v rodině: profily dětí (přezdívka, rok narození), zvířata, AI obrázky a videa, smlouvy a podpisy, záznam péče, Care Score, certifikáty, počty kroků, klidové hodiny, přihlašovací kódy", "Smaže se okamžitě"],
            ["Pokud v rodině zůstává další rodič", "Smaže se jen váš účet; rodina zůstává druhému rodiči"],
            ["Zařízení a tokeny oznámení", "Okamžitě se odhlásí a smažou"],
            ["Záznamy o nákupech (produkt, datum, ID transakce v obchodě, anonymní ID nákupu – bez jména a e-mailu)", "Uchovávají se tak dlouho, jak vyžadují účetní a daňové předpisy, a už nejsou propojené s vaší rodinou"],
            ["Záznamy o nákladech na AI", "Uchovávají se pro účetnictví bez jakéhokoli propojení s vámi, vašimi dětmi ani zvířaty"],
            ["Šifrované zálohy", "Automaticky se odstraní do 35 dnů"],
          ],
          note: "Samotné nákupy zpracovávají App Store a Google Play; jejich záznamy uchovávají Apple a Google podle vlastních zásad. Za zakoupenou, ale nedokončenou výzvu se při smazání účtu peníze nevracejí.",
        },
        { type: "callout", title: "Máte otázky?", text: "Napište na privacy@petprep.si. Podrobnosti najdete v našich zásadách ochrany osobních údajů.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Encyklopedie zvířat PetPrep – druhy a plemena se zdroji",
        description:
          "Psi, kočky a jejich plemena: co které potřebuje, komu se hodí a jak ho PetPrep simuluje. Vyhledávejte a porovnávejte plemena; každý údaj odkazuje na svůj zdroj.",
      },
      navLabel: "Zvířata",
      eyebrow: "Encyklopedie zvířat",
      title: "Poznejte mazlíčka dřív, než přijde domů.",
      lead:
        "Co který druh a plemeno opravdu potřebuje – podle kynologických svazů, felinologických registrů, veterinárních charit a studií, s odkazem na každý zdroj. A k tomu pravidla, podle kterých to PetPrep simuluje.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "O PetPrepu – společnost, zakladatel a jak získáváme informace o zvířatech",
        description:
          "Kdo PetPrep vytváří: Data Vallis David Tacer s.p. z Dravogradu ve Slovinsku, zakladatel David Tacer, naše poslání a jak encyklopedie zvířat získává a ověřuje své údaje.",
      },
      navLabel: "O nás",
      eyebrow: "O nás",
      title: "Kdo PetPrep vytváří.",
      lead: "PetPrep vzniká v Mariboru ve Slovinsku v malé softwarové firmě. Na této stránce se dozvíte, kdo jsme, proč PetPrep stavíme a jak rozhodujeme, co aplikace a encyklopedie zvířat o zvířatech říkají.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Společnost",
          paragraphs: [
            "PetPrep je produktem společnosti Data Vallis David Tacer s.p., firmy zabývající se vývojem softwaru (samostatný podnikatel) se sídlem v Dravogradu ve Slovinsku. Stejná firma provozuje tento web a aplikaci PetPrep a je správcem osobních údajů (viz [zásady ochrany osobních údajů](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Zakladatel",
          paragraphs: [
            "PetPrep založil David Tacer, vývojář softwaru a podnikatel z Mariboru ve Slovinsku.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Naše poslání",
          paragraphs: [
            "V každé rodině zazní „Slibuju, že se o něj budu starat.“ PetPrep ten slib promění v důkaz: 12 týdnů se dítě – nebo dospělý, který zvažuje určité plemeno – stará o realistického AI mazlíčka s denními potřebami skutečného zvířete a rodič každý den vidí, jak péče obstojí.",
            "I neúspěch v simulaci je dobrý výsledek: rodina to zjistí dřív, než by trpěl skutečný mazlíček, a dřív, než se zaváže k letům péče a výdajů. A když skutečný mazlíček domů přijde, chceme, aby byl PetPrep užitečný po celý jeho život.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Jak vzniká encyklopedie zvířat",
          intro: "[Encyklopedie zvířat](page:animals) a aplikace používají stejná data. O tom, co v ní smí stát, rozhodují tato pravidla:",
          items: [
            "Každý údaj uvádí svůj zdroj a odkazuje na něj. Zdroje jsou rozdělené podle toho, jakou váhu si zaslouží: A – standardy plemen, recenzované odborné články a doporučení veterinárních asociací; B – poradenské stránky veterinárních nemocnic, univerzit a národních organizací na ochranu zvířat; C – sekundární shrnutí (encyklopedie, články v tisku), používaná jen společně se zdrojem A nebo B.",
            "Jako fakta se zobrazují jen doložené údaje. Hodnota, kterou žádný zdroj nepodporuje, se nezveřejní. Kde se zdroje rozcházejí, zobrazí se každý s vlastní hodnotou.",
            "Pravidla hry nejsou veterinární radou. Kde hra potřebuje číslo, které zdroje neuvádějí přesně (například denní cíl kroků), stanoví ho PetPrep na základě zdrojů a zobrazí ho jen v části „Jak to simuluje PetPrep“, označené jako pravidlo hry.",
            "Zdravotní poznámky jsou jen informativní. Shrnují, co zdroje o plemeni říkají, a veterinář je neposuzoval. U skutečného zvířete se zeptejte veterináře.",
            "Standardy plemen shrnujeme vlastními slovy, nikdy je nekopírujeme doslova ve větším rozsahu a žádné plemeno nikdy neoznačujeme jako „hypoalergenní“.",
            "Encyklopedie se generuje z výzkumných dat PetPrepu – týchž, která používá aplikace. Když se změní zdroj nebo hodnota, encyklopedie se znovu exportuje a stránka každého plemene ukazuje datum poslední aktualizace. Pokud najdete chybu, napište na hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Máte otázky k PetPrepu?", text: "Napište do správné schránky na stránce Kontakt – rodiny, soukromí, partneři nebo investoři.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Seznamte se s Curio – maskotem PetPrepu",
        description:
          "Curio je maskot PetPrepu: zvědavá kostička z našeho loga a hvězda našich krátkých videí. Kdo to je, čím se liší od realistického mazlíčka v aplikaci, obrázky a mediální balíček.",
      },
      navLabel: "Seznamte se s Curio",
      eyebrow: "Náš maskot",
      title: "Seznamte se s Curio.",
      lead: "Curio je zvědavá kostička z loga PetPrep, která ožila. V našich krátkých videích hraje zvířátko, které čeká u dveří, až někdo dodrží slib. Je to náš maskot – ne mazlíček, o kterého se staráte v aplikaci.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskot PetPrepu: měkká grafitová kostička s velkýma bílýma očima, malým malinovým čumáčkem a mátovým obojkem, mává.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Kdo je Curio?",
          paragraphs: [
            "Curio začalo jako znak v našem logu: zaoblený grafitový čtverec se dvěma velkýma očima, které se dívají nahoru doprava, a malým malinovým čumáčkem. Ve slovinštině mu říkáme Radovednež – „zvědavec“. V říjnu 2026 dostalo krátké ručičky, podsadité nožičky a mátový obojek s kulatou známkou a stala se z něj postavička.",
            "Curio nemá pusu. Všechno, co cítí, je vidět v jeho očích: dokořán, když někdo zašeptá „procházka?“, dvě ospalé čárky, když ještě nikdo nepřišel domů, šťastné obloučky, když je miska plná.",
            "Curio je „ono“ – ani kluk, ani holka, ani pes, ani kočka. Představuje každého mazlíčka, který každý den čeká, až někdo dodrží slib.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio v kostce",
          columns: 3,
          items: [
            { title: "Jméno", text: "Anglicky Curio, slovinsky Radovednež." },
            { title: "Z čeho je", text: "Měkký grafit, mátový obojek a malinová známka – barvy PetPrepu." },
            { title: "Mluví", text: "Nikdy. Jen očima." },
            { title: "Miluje", text: "Procházky, plnou misku a děti, které se vrátí i 15. den." },
            { title: "Žije", text: "V našich krátkých videích na [TikToku](https://www.tiktok.com/@petprep.si) a [Instagramu](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Práce", text: "Mrknutím oka připomínat rodinám, že mazlíček potřebuje péči každý den." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio není mazlíček z aplikace",
          intro: "V našich videích hraje Curio zvířátko, které potřebuje péči, protože tu potřebuje každý mazlíček. V PetPrepu se děti – i dospělí, kteří si zkoušejí plemeno – starají o něco mnohem bližšího skutečnosti.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, kreslený maskot, mává na světlém pozadí.",
              label: "Maskot",
              title: "Curio – náš maskot",
              text: "Kreslená postavička pro naše videa, nálepky a tuto stránku. Připomíná, o čem PetPrep je. Adoptovat si ho nemůžete.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Realistický portrét labradorského retrívra vytvořený AI – takhle vypadají mazlíčci v aplikaci PetPrep.",
              label: "V aplikaci · AI obrázek",
              tone: "mint",
              title: "Váš mazlíček v PetPrepu",
              text: "Realistická AI simulace skutečného plemene – jako tento [labradorský retrívr](+breed:labrador_retriever) – s denními potřebami skutečného zvířete: krmení, voda, procházky měřené skutečnými kroky, úklid a výcvik. Podívejte se, [jak to funguje](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio v obrázcích",
          intro: "Curio je stylizovaná 3D postavička vytvořená pomocí AI nástrojů podle našeho vlastního návrhu. Nové scény se objevují nejdřív v našich videích.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio mává na mátovém pozadí.", caption: "Ahoj! Klasické zamávání.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio stojí na bílé poličce a mává.", caption: "Na poličce na někoho čeká." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio zepředu, z boku a zezadu, se čtyřmi výrazy očí.", caption: "Ze všech stran – a jak jeho oči ukazují pocity." },
            { src: "/curio/curio-waving.webp", alt: "Curio na průhledném pozadí.", caption: "Vystřižené z pozadí – připravené pro váš příspěvek (viz mediální balíček).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediální balíček",
          intro: "Pro tvůrce, novináře a partnery, kteří o PetPrepu píšou. Otázky nebo nápady na spolupráci: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Stáhnout vše", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, průhledné pozadí", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, čtverec, světlé pozadí", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, čtverec, mátové pozadí", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "List postavy", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Znak PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Jak Curio používat",
          rules: [
            "Curio používejte v příspěvcích, článcích a videích o PetPrepu. Pro reklamy, produkty nebo merchandising se nás nejdřív zeptejte.",
            "Ukazujte Curio takové, jaké je: grafitová kostička, bílé oči, malinový čumáček, mátový obojek. Nepřidávejte mu pusu, uši, srst ani obočí, neměňte jeho barvy a nedeformujte ho.",
            "Curio je maskot PetPrepu. Nevydávejte ho za mazlíčka z aplikace ani za skutečného psa nebo kočku.",
            "Nepoužívejte Curio způsobem, který by naznačoval, že PetPrep podporuje jiný produkt, věc nebo osobu.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Otázky o Curio",
          items: [
            { q: "Je Curio pes, nebo kočka?", a: "Ani jedno. Curio je kostička z našeho loga. V našich videích hraje zvířátko, ale k žádnému druhu nepatří." },
            { q: "Může se moje dítě starat o Curio v aplikaci?", a: "Ne. V aplikaci se vaše rodina stará o realistického mazlíčka skutečného plemene, který má stejné denní potřeby jako skutečné zvíře. Curio se objevuje jen v našich videích a na webu." },
            { q: "Proč Curio nemá pusu?", a: "Protože ji nemá ani naše logo. Curio všechno řekne očima – a nikdy nahlas nežebrá o pamlsky." },
            { q: "Kde uvidím nová videa s Curio?", a: "Na TikToku a Instagramu, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Péče o zvířata – co smějí psi a kočky jíst, se zdroji | PetPrep",
        description:
          "Které potraviny jsou pro psy a kočky jedovaté, rizikové nebo v pořádku – důvod, příznaky a co dělat, s odkazem na každý zdroj. Vytvořil PetPrep pro rodiny, které se připravují na mazlíčka.",
      },
      navLabel: "Péče",
      eyebrow: "Péče o zvířata",
      title: "Co je pro vašeho mazlíčka bezpečné?",
      lead:
        "Jasné, doložené odpovědi pro rodiny: které potraviny jsou jedovaté, které rizikové a které jsou v pořádku jako pamlsek – pro psy a kočky, další druhy přibudou. Každá odpověď odkazuje na své zdroje.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Omalovánky psů a koček pro děti zdarma k vytisknutí | PetPrep",
        description:
          "Omalovánky zdarma k vytisknutí: zlatý retrívr, labrador, border kolie, štěně křížence, kotě a Curio. PDF ve formátu A4 a US Letter, na každé stránce skutečná informace o péči o zvíře včetně zdroje.",
      },
      navLabel: "Omalovánky",
      eyebrow: "Omalovánky",
      title: "Omalovánky zdarma k vytisknutí.",
      lead:
        "Psi, kočky a Curio k vybarvení nebo obkreslení – vytiskněte si jednu stránku, nebo rovnou celou knížku. Na každé stránce najdete skutečnou informaci o péči o zvíře z veterinárního nebo kynologického zdroje, kterou si můžete přečíst společně.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Pro děti, které chtějí mazlíčka – omalovánky, Curio a #walkyourpet | PetPrep",
        description:
          "Všechno, co PetPrep má pro děti: omalovánky zdarma k vytisknutí se skutečnými informacemi o péči o zvířata, maskot Curio a #walkyourpet – pro děti a rodiče, kteří se na mazlíčka připravují společně.",
      },
      navLabel: "Pro děti",
      eyebrow: "Pro děti",
      title: "Pro děti, které chtějí mazlíčka.",
      lead: "Omalovánky k vytisknutí, Curio a #walkyourpet – pro děti a rodiče, kteří se na mazlíčka připravují společně.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskot PetPrepu: měkká grafitová kostička s velkýma bílýma očima, malým malinovým čumáčkem a mátovým obojkem, mává.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – hnutí, které začalo u skutečného dítěte",
        description:
          "„Mohli bychom jít walk your pet.“ Řeklo to dítě a teď je z toho hnutí: rodiny, které jdou ven, protože jejich mazlíček potřebuje procházku. Jak to začalo, co to znamená v PetPrepu a jak se přidat.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Tuhle větu jsme nevymysleli my, ale jedno dítě. Dnes je to pozvánka pro každou rodinu: vyrazte ven, protože mazlíček potřebuje svou procházku – ať už skutečný, nebo ten, se kterým trénujete v PetPrepu.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Karta s příběhem: „Zaslechnuto u zakladatele doma.“ Dítě říká „Lahko bi šli walk your pet“ – „Mohli bychom jít walk your pet“ – a nadpis zní „#walkyourpet se ujalo.“", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Jak to začalo",
          paragraphs: [
            "V říjnu 2026 měly děti našeho zakladatele na návštěvě kamarádku. Rozhodovaly se, jestli jít ven, a ona řekla, napůl slovinsky a napůl anglicky: „Lahko bi šli walk your pet“ – „Mohli bychom jít walk your pet.“",
            "Nikdo ji k tomu nevyzval. Znala PetPrep, kde se procházka se psem počítá, jen když opravdu vyrazíte ven, a „walk your pet“ se pro ni prostě stalo důvodem jít ven. Tak moc se nám to zalíbilo, že jsme si to nechali – anglicky, pro všechny jazyky.",
            "Skutečný rozhovor. Skutečné děti.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Co to znamená v PetPrepu",
          intro: "V PetPrepu se denní procházka psa skládá ze skutečných kroků vašeho dítěte, které aplikace načte z Apple Health nebo Health Connect, pokud to povolíte. Pobyt na gauči se nepočítá, takže „walk your pet“ vždycky znamená jít ven. Žádná GPS ani poloha – jen kroky.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Přidejte se k hnutí",
          intro: "Aplikaci k tomu nepotřebujete. Zapojit se může každá rodina, která jde ven kvůli svému mazlíčkovi – skutečnému, nebo tréninkovému.",
          items: [
            { title: "Jděte ven", text: "Vezměte psa na procházku. Nebo pokud se na mazlíčka teprve chystáte, vyrazte na procházku, jakou byste s ním chtěli podnikat." },
            { title: "Zachyťte chvíli", text: "Boty u dveří, vodítko, cesta, tlapky v trávě. Žádné obličeje, žádná jména." },
            { title: "Sdílejte ji", text: "Zveřejněte ji s #walkyourpet a označte @petprep.si na Instagramu nebo TikToku. S vaším svolením můžeme ty nejhezčí chvíle sdílet tady i na našich profilech." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Bezpečné sdílení",
          intro: "#walkyourpet je o dětech, proto pro všechno, co sdílíme, platí tato pravidla:",
          items: [
            "Příspěvky zveřejňují rodiče, ne děti. Co se dostane na internet, rozhoduje jen rodič.",
            "Žádné obličeje dětí, jména, školy ani adresy – a nikdy dítě z jiné rodiny.",
            "Dál sdílíme jen se svolením rodiče a příspěvek na požádání kdykoli stáhneme.",
            "Citáty dětí jsou vždy skutečné. Nikdy nevymýšlíme ani „nevylepšujeme“, co dítě řeklo.",
            "Je to pozvánka, ne povinnost. Žádné série, které je třeba udržet, žádný tlak – jen dobrý důvod jít ven.",
          ],
        },
        {
          type: "callout",
          title: "První chvíle je naše. Ta další může být vaše.",
          text: "Sdílejte procházku své rodiny s #walkyourpet a označte @petprep.si. Otázky nebo příběh, který byste chtěli vyprávět: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Otázky",
          items: [
            { q: "Musíme mít PetPrep, abychom se mohli zapojit?", a: "Ne. #walkyourpet může použít každý, kdo jde ven kvůli svému mazlíčkovi. PetPrep je místo, kde fráze vznikla a kde se procházka cvičného psa počítá jen ze skutečných kroků." },
            { q: "Funguje to v PetPrepu i pro kočky?", a: "Ne jako procházka. Kočky na procházky nechodí, takže v PetPrepu se jejich potřeby naplňují hrou, ne kroky. Procházky jsou jen pro psy." },
            { q: "Proč je fráze anglicky?", a: "Protože ji dítě řeklo přesně takhle – anglicky uprostřed slovinské věty. Děti po celém světě do řeči přimíchávají anglická slova, a tak zůstává fráze ve všech jazycích stejná." },
            { q: "Objeví se moje dítě na vašich profilech?", a: "Jen to, co sami sdílíte a co nám dovolíte znovu zveřejnit, a nikdy obličej ani jméno dítěte. Napište nám na hello@petprep.si a odstraníme to." },
          ],
        },
      ],
    },
  },
};

export default cs;
