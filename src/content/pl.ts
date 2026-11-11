import type { Dictionary } from "./types";

const pl: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Gotowi na zwierzaka. Przy nim przez całe jego życie.",
    siteDescription:
      "PetPrep to 12-tygodniowy symulator zwierzęcia domowego, który pokazuje rodzicom, czy ich dziecko naprawdę jest gotowe na zwierzaka – a potem staje się asystentem AI na całe życie prawdziwego pupila.",
    slogan: "Gotowi na zwierzaka. Przy nim przez całe jego życie.",
    keywords: [
      "czy moje dziecko jest gotowe na psa",
      "aplikacja ucząca dzieci odpowiedzialności za zwierzę",
      "symulator wirtualnego zwierzaka",
      "symulator zwierzęcia AI",
      "zanim kupisz psa",
      "dzieci i zwierzęta domowe",
      "test gotowości na zwierzę",
      "panel rodzica",
      "wypróbuj rasę psa przed zakupem",
      "czy ta rasa jest dla mnie",
    ],
  },
  nav: { home: "Strona główna", menu: "Menu", close: "Zamknij menu", skip: "Przejdź do treści" },
  lang: { label: "Język", switchTo: "Zmień język" },
  cta: {
    primary: "Zacznij za darmo z mieszańcem",
    secondary: "Zobacz, jak to działa",
    earlyAccess: "Zapisz się na wczesny dostęp",
    earlyAccessSubject: "PetPrep – wczesny dostęp",
    ios: "Pobierz na iPhone’a",
    android: "Pobierz na Androida",
    comingSoon: "Wkrótce na iPhone’a i Androida",
    readMore: "Czytaj dalej",
    contactUs: "Napisz do nas",
  },
  common: {
    planned: "Planowane",
    plannedNote:
      "Ta strona opisuje to, nad czym pracujemy w następnej kolejności. Nie ma tego jeszcze w aplikacji, a szczegóły mogą się zmienić.",
    legalDraft:
      "Ten tekst dopracowujemy z naszymi doradcami prawnymi przed publiczną premierą. Jeśli coś jest niejasne, napisz do nas.",
    lastUpdated: "Ostatnia aktualizacja",
    breadcrumbHome: "Strona główna",
    screensNote: "Ekrany aplikacji pokazane na tej stronie to podgląd produktu; ostateczna wersja aplikacji może wyglądać nieco inaczej.",
    perPet: "za zwierzę",
    free: "Za darmo",
    forever: "na zawsze",
    notFoundTitle: "Ta strona zerwała się ze smyczy.",
    notFoundText: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
    notFoundCta: "Wróć na stronę główną",
  },
  footer: {
    tagline: "Gotowi na zwierzaka. Przy nim przez całe jego życie.",
    groups: [
      { title: "Produkt", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Firma", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Zaufanie", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Wszelkie prawa zastrzeżone.",
    dataEu: "Dane przechowywane w UE.",
    languages: "Wkrótce kolejne języki.",
    company: "PetPrep jest produktem firmy",
    cookieSettings: "Ustawienia plików cookie",
    a11yBadge: { title: "Dostępna zabawa", text: "Łatwiejsze gesty · Czytniki ekranu · Mniej ruchu" },
  },
  screens: {
    pin: "Logowanie dziecka 6-cyfrowym kodem od rodzica – bez e-maila i bez hasła.",
    contract: "Umowa odpowiedzialności podpisana palcem. Podpis ożywia zwierzę.",
    hud: "Ekran główny dziecka: aktualny stan zwierzęcia, cztery potrzeby i przyciski opieki.",
    picker: "Rodzice wybierają zwierzę: rasę, pochodzenie (adoptowane lub z hodowli) i wiek w chwili przybycia.",
    parent: "Panel rodzica: sygnalizator, Care Score i dzisiejsze obowiązki każdego dziecka.",
    report: "Raport dziecka za 7, 30 lub 84 dni: obowiązki, spacery i pominięte zadania dzień po dniu.",
    assistant: "Gdy zwierzę zamieszka z wami: asystent AI zamienia dane z obroży w jedną jasną wskazówkę.",
    certificate: "Po 12 tygodniach: Certyfikat odpowiedzialności z Care Score dziecka.",
  },
  pricingPlans: {
    free: {
      name: "Mieszaniec",
      text: "Pełna symulacja z realistycznym mieszańcem.",
      features: [
        "Codzienna opieka z prawdziwymi konsekwencjami",
        "Prawdziwe spacery liczone w prawdziwych krokach z telefonu",
        "Panel rodzica, sygnalizator i Care Score",
        "Godziny ciszy i przycisk pauzy",
        "Fotorealistyczne zdjęcie twojego zwierzaka i krótkie filmy",
        "12-tygodniowe wyzwanie możesz dodać później, z tym samym zwierzęciem",
      ],
      cta: "Zacznij za darmo",
    },
    challenge: {
      name: "12-tygodniowe wyzwanie PetPrep",
      badge: "12 tygodni + certyfikat",
      unit: "za zwierzę · 12 tygodni",
      text: "Dla rodzin, które chcą pełnego doświadczenia i certyfikatu na końcu.",
      features: [
        "Wszystko, co w planie Mieszaniec",
        "Każda rasa, np. [border collie](breed:border_collie), albo pies mieszaniec i kot domowy",
        "Nastroje twojego zwierzęcia jako filmy AI",
        "Certyfikat odpowiedzialności",
        "Jedna cena, gdy rodzeństwo dzieli jedno zwierzę",
        "Dostęp dla obojga rodziców",
      ],
      cta: "Wybierz wyzwanie",
    },
    note:
      "Zakupów dokonuje się w aplikacji przez App Store lub Google Play. Drugie zwierzę w tej samej rodzinie to osobne wyzwanie. Ceny zawierają VAT tam, gdzie obowiązuje.",
  },
  earlyAccess: {
    title: "Zapisz się na wczesny dostęp",
    text: "Bądź wśród pierwszych rodzin, które wypróbują PetPrep. Napiszemy do ciebie, gdy aplikacja będzie gotowa – i nic poza tym.",
    label: "Twój adres e-mail",
    placeholder: "ty@przyklad.pl",
    button: "Zapisz się na wczesny dostęp",
    sending: "Wysyłanie…",
    successTitle: "Jesteś na liście.",
    successText: "Dziękujemy! Gdy PetPrep będzie gotowy, napiszemy najpierw do ciebie.",
    invalid: "Wpisz poprawny adres e-mail.",
    error: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
    consent: "Zapisując się, zgadzasz się na otrzymywanie e-maili o PetPrep. Możesz zrezygnować w każdej chwili.",
    privacyLink: "Polityka prywatności",
  },
  contactCards: [
    { title: "Rodziny", text: "Pytania o aplikację, twoje konto lub wyzwanie.", email: "hello" },
    { title: "Prywatność", text: "Dostęp do danych, eksport, usunięcie lub inne pytania o prywatność.", email: "privacy" },
    { title: "Partnerzy", text: "Sklepy zoologiczne, schroniska, weterynarze, trenerzy, ubezpieczyciele i szkoły.", email: "partners" },
    { title: "Inwestorzy", text: "Materiały dla inwestorów, prezentacja i data room na życzenie.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – czy twoje dziecko jest gotowe na zwierzaka? Sprawdź to w 12 tygodni.",
      description:
        "Zanim w domu pojawi się prawdziwe zwierzę, twoje dziecko przez 12 tygodni opiekuje się realistycznym zwierzęciem AI: posiłki, sprzątanie, prawdziwe spacery. Codziennie widzisz, czy naprawdę jest gotowe.",
    },
    hero: {
      eyebrow: "12-tygodniowe wyzwanie PetPrep",
      title: "Gotowi na zwierzaka. Przy nim przez całe jego życie.",
      lead:
        "Zanim w domu pojawi się prawdziwe zwierzę, twoje dziecko przez 12 tygodni opiekuje się realistycznym zwierzęciem AI – karmi je, sprząta po nim i chodzi z nim na prawdziwe spacery. Codziennie widzisz, czy naprawdę jest gotowe.",
      trust: ["Mieszaniec za darmo na zawsze", "Bez reklam, bez czatu z obcymi", "Dzieci nie potrzebują e-maila"],
    },
    phone: {
      petName: "Luna",
      petAge: "Szczeniak · 3 miesiące",
      live: "NA ŻYWO",
      video: "Fotorealistyczny film AI ze zwierzęciem",
      actions: ["Jedzenie", "Woda", "Spacer", "Sprzątanie"],
    },
    parentCard: { child: "Maya", status: "Wszystko dobrze", scoreLabel: "Care Score", progress: "Tydzień 3 z 12 · 31 z 36 obowiązków na czas" },
    notification: { app: "PetPrep", text: "Twój pupil patrzy na swoją miskę. Pora śniadania kończy się o 9:00." },
    promoVideo: {
      eyebrow: "PetPrep w minutę",
      title: "Zobacz, jak to działa.",
      text: "Od wyboru zwierzęcia i podpisania umowy, przez szkołę, spacery i pielęgnację, aż po certyfikat – wszystko, co twoje dziecko robi przez 12 tygodni, i wszystko, co widzisz w panelu. Curio, nasza maskotka, jedynie wita widzów, a zwierzę w aplikacji to realistyczny pies AI.",
      alt: "Film promocyjny PetPrep: ekrany aplikacji, dziecko opiekujące się psem, rodzic śledzący Care Score.",
      note: "Aplikacja nie jest jeszcze publicznie dostępna w App Store i Google Play – zapisz się na wczesny dostęp.",
    },
    promise: {
      quote: "Każda rodzina słyszy: „Obiecuję, że będę się nim opiekować”. PetPrep zamienia tę obietnicę w",
      highlight: "dowód",
      text:
        "Porażka w symulacji to sukces twojej rodziny: dowiadujecie się prawdy, zanim ucierpi prawdziwe zwierzę – i zanim zobowiążecie się do lat opieki i wydatków.",
    },
    how: {
      eyebrow: "Jak to działa",
      title: "Trzy kroki od „proszę” do „gotowe”.",
      steps: [
        {
          title: "Wybierasz zwierzę",
          text: "Zakładasz konto rodzinne, dodajesz dziecko (wystarczy pseudonim) i wybierasz zwierzę: rasę, pochodzenie – ze schroniska albo z hodowli – oraz wiek, od szczeniaka po seniora.",
        },
        {
          title: "Dziecko podpisuje obietnicę",
          text: "Twoje dziecko loguje się 6-cyfrowym kodem – bez e-maila i bez hasła. Podpisuje palcem Umowę odpowiedzialności i właśnie wtedy przychodzi na świat jego jedyne w swoim rodzaju zwierzę.",
        },
        {
          title: "12 tygodni prawdziwej opieki",
          text: "Jeden prawdziwy tydzień to jeden miesiąc życia zwierzęcia. Na końcu: Certyfikat odpowiedzialności z Care Score – obiektywny dowód albo szczere „nie”.",
        },
      ],
      link: "Jak to działa – szczegóły",
    },
    realism: {
      title: "Tak blisko prawdziwego zwierzęcia, jak tylko potrafi aplikacja.",
      text: "Pory karmienia, spacery i dorastanie opierają się na źródłach takich jak stowarzyszenia weterynaryjne i związki kynologiczne – nie są wymyślone na potrzeby gry.",
      items: [
        { title: "Prawdziwe spacery, prawdziwe kroki", text: "Codzienny spacer liczy kroki z telefonu twojego dziecka. Dziś ani jednego spaceru? Jutro zwierzę to odczuje." },
        { title: "Dorasta", text: "Szczeniak je cztery razy dziennie, potem trzy, potem dwa – a gdy rośnie, dostaje nowe zdjęcie." },
        { title: "Zachowuje się jak prawdziwe", text: "Szczeniaki muszą wychodzić na dwór. Znudzone psy gryzą kapcie. Bałagan zdarza się jeszcze przed kolacją." },
        { title: "Szanuje szkołę i sen", text: "Godziny ciszy wstrzymują przypomnienia. Posiłek, który wypada w czasie lekcji, należy do ciebie, a nie do dziecka." },
        { title: "Prawdziwe konsekwencje, łagodnie", text: "Zaniedbanie oznacza wizytę u weterynarza albo schronisko – nigdy nic strasznego, zawsze z możliwością nowego początku." },
        { title: "Jedyne w swoim rodzaju", text: "Każde zwierzę ma własne umaszczenie, znaczenia i oczy – fotorealistyczne i niepowtarzalne." },
      ],
    },
    parents: {
      eyebrow: "Dla rodziców",
      title: "Widzisz prawdę na bieżąco.",
      text: "Czytelny sygnalizator dla każdego dziecka, Care Score oparty na obowiązkach wykonanych na czas i oś czasu pokazująca, kto co zrobił. Rodzeństwo, które dzieli jedno zwierzę, dostaje osobne, sprawiedliwe wyniki.",
      points: [
        { strong: "Godziny ciszy i przycisk pauzy", text: "to ty masz kontrolę." },
        { strong: "Dzieci logują się kodem", text: "bez e-maila, bez nazwiska, bez reklam." },
        { strong: "Oboje rodzice, wszystkie dzieci", text: "jedna rodzina, jeden widok." },
      ],
      link: "Wszystko, co widzą rodzice",
    },
    adults: {
      eyebrow: "Dla dorosłych",
      title: "Wypróbuj rasę, zanim zabierzesz psa do domu.",
      text: "Marzysz o konkretnej rasie? PetPrep nie jest tylko dla dzieci. Przez 12 tygodni opiekujesz się zwierzęciem AI tej rasy, które ma prawdziwe, codzienne potrzeby – i sprawdzasz, czy to naprawdę coś dla ciebie, zanim kupisz lub adoptujesz prawdziwe zwierzę.",
      points: [
        {
          strong: "Prawdziwe potrzeby rasy",
          text: "posiłki w wyznaczonych porach, woda, sprzątanie i dzienny cel kroków oparty na udokumentowanym zapotrzebowaniu na ruch: dorosły border collie potrzebuje 12 000 kroków dziennie, mieszaniec 6000.",
        },
        {
          strong: "Trening i wpadki szczeniaka",
          text: "krótka sesja treningowa każdego dnia i szczeniak, który wytrzymuje tylko około godziny na każdy miesiąc życia, zanim musi wyjść na dwór – inaczej na podłodze pojawi się kałuża.",
        },
        {
          strong: "12 tygodni pokaże, czy pasuje do twojego życia",
          text: "Sprawdzisz to w dni robocze, w czasie wolnym i przy każdej pogodzie. Ponieważ to pies rodzinny, partnera lub dzieci możesz dodać później.",
        },
      ],
      how: "Jak zacząć: załóż konto jako rodzic, dodaj siebie jako profil opiekuna i zaloguj się 6-cyfrowym kodem – na tym samym telefonie albo na innym.",
      note: "Dostępne już dziś: darmowy pies mieszaniec i kot domowy, a także 12-tygodniowe wyzwanie z jednym z nich lub z każdą rasą psa i kota z [encyklopedii zwierząt](page:animals).",
      link: "Jak korzystać z PetPrep samodzielnie",
    },
    after: {
      eyebrow: "Gdy zwierzę zamieszka z wami",
      title: "Gdy pojawi się prawdziwe zwierzę, PetPrep zostaje.",
      text: "Stuknij „Mamy prawdziwe zwierzę”, a symulator stanie się asystentem AI na kolejne lata – od początku znającym rytm twojej rodziny.",
      features: [
        { title: "Inteligentna obroża", text: "Aktywność i alerty, gdy coś jest nie tak." },
        { title: "Pierwszy kontakt z AI", text: "Odpowiada szybko, a potem przekazuje sprawę prawdziwemu weterynarzowi." },
        { title: "Wzrost i karma", text: "Cotygodniowe ważenie, krzywa wzrostu, informacja, kiedy zmienić karmę." },
        { title: "Zaufani partnerzy", text: "Weterynarze, trenerzy i ubezpieczyciele w pobliżu – wyraźnie oznaczeni." },
        { title: "Test DNA", text: "Jakie rasy kryją się w twoim mieszańcu – i na co zwracać uwagę." },
        { title: "Karta dla weterynarza", text: "Mieszanka ras i wyniki DNA w jednym miejscu, gotowe dla weterynarza." },
      ],
      link: "O asystencie AI",
      planned: "W przygotowaniu",
    },
    species: {
      title: "Dziś psy i koty. Kolejne gatunki w drodze.",
      text: "Tworzymy PetPrep dla rodzin na całym świecie, w ich własnych językach.",
      chips: [
        { label: "Pies · dostępny", active: true, link: "species:dog" },
        { label: "Kot · dostępny", active: true, link: "species:cat" },
        { label: "Rasy psów i kotów · w wyzwaniu", link: "page:animals" },
        { label: "Kolejne gatunki · planowane", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Cennik", title: "Proste, uczciwe ceny." },
    faq: { title: "Pytania, które zadają rodzice", link: "Wszystkie pytania" },
    final: { title: "Gotowi na zwierzaka?", text: "Sprawdź to w 12 tygodni. Zacznij za darmo, na iPhonie lub Androidzie." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Jak działa PetPrep – 12-tygodniowe wyzwanie gotowości na zwierzę",
        description:
          "Jak działa 12-tygodniowe wyzwanie PetPrep: wybór zwierzęcia, Umowa odpowiedzialności, codzienna opieka, prawdziwe spacery, godziny ciszy i certyfikat.",
      },
      eyebrow: "Jak to działa",
      title: "Dwanaście tygodni, które pokazują, ile jest warta obietnica.",
      lead:
        "Twoje dziecko opiekuje się fotorealistycznym zwierzęciem AI, które zachowuje się tak jak prawdziwe – na tyle, na ile pozwala aplikacja. Jeden prawdziwy tydzień to jeden miesiąc życia zwierzęcia, więc w 12 tygodni zwierzę dorasta – a ty widzisz, czy opieka wytrzymuje próbę czasu.",
      blocks: [
        {
          type: "steps",
          heading: "Od pierwszego stuknięcia do certyfikatu",
          items: [
            { title: "Rodzic zakłada rodzinę", text: "Rejestrujesz się, podając adres e-mail (logowanie przez Apple i Google pojawi się wkrótce). Każde dziecko dodajesz, podając pseudonim i opcjonalnie rok urodzenia. To wszystko, o co pytamy na temat twojego dziecka." },
            { title: "Wybierasz zwierzę", text: "Wybierz rasę (mieszaniec jest za darmo), pochodzenie zwierzęcia – adoptowane ze schroniska albo z hodowli – i jego wiek w chwili przybycia: szczeniak, młody, dorosły lub senior." },
            { title: "Dziecko loguje się kodem", text: "Dostajesz 6-cyfrowy kod ważny 15 minut. Dziecko wpisuje go na swoim telefonie – bez e-maila i bez hasła. Telefon zginął? Jednym stuknięciem wylogujesz dziecko ze wszystkich urządzeń." },
            { title: "Umowa odpowiedzialności", text: "Dziecko podpisuje obietnicę palcem. Podpis to narodziny zwierzęcia: potrzeby zaczynają się liczyć od tej chwili, więc nic nie przepada, jeśli dziecko podpisze później." },
            { title: "Dwanaście tygodni opieki", text: "Karmienie we właściwych porach, świeża woda, sprzątanie i codzienny spacer z prawdziwymi krokami. Gdy zwierzę rośnie, zmieniają się jego potrzeby." },
            { title: "Certyfikat", text: "Po 12 tygodniach zwierzę kończy rok. Twoje dziecko otrzymuje Certyfikat odpowiedzialności ze swoim Care Score – albo oboje bezpiecznie przekonujecie się, że to jeszcze nie ten moment." },
          ],
        },
        {
          type: "screens",
          heading: "Co widzi twoje dziecko",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Czego dorosły pies mieszaniec potrzebuje każdego dnia",
          intro: "Liczby pochodzą ze źródeł weterynaryjnych i kynologicznych; tam, gdzie źródła podają tylko zakres, wartość ustala PetPrep i otwarcie to zaznacza.",
          head: ["Potrzeba", "Jak często", "Jeśli się o niej zapomni"],
          rows: [
            ["Jedzenie", "Rano (6–10) i wieczorem (17–21), raz w każdym przedziale", "Głód po około 12,5 godziny"],
            ["Woda", "3 razy dziennie, w odstępach co najmniej 3 godzin", "Pragnienie po około 10 godzinach"],
            ["Spacer", "6000 prawdziwych kroków (szczeniaki zaczynają od 2000)", "Ani jednego spaceru → choroba następnego ranka"],
            ["Sprzątanie", "Gdy zwierzę nabałagani – nigdy w godzinach ciszy", "Ani jedzenia, ani wody, dopóki nie będzie posprzątane"],
          ],
          note: "Szczeniaki jedzą 4, potem 3, potem 2 razy dziennie i wytrzymują tylko około godziny na każdy miesiąc życia. [Border collie](breed:border_collie) potrzebuje 12 000 kroków i szybciej głodnieje.",
        },
        {
          type: "cards",
          heading: "Dopasowane do prawdziwego życia rodziny",
          columns: 3,
          items: [
            { title: "Godziny ciszy", text: "Ustaw czas szkoły i snu. Zwierzę zwalnia, przypomnienia nie są wysyłane, a bałagan wtedy nigdy się nie zdarza." },
            { title: "Posiłki w czasie szkoły", text: "Pora karmienia, która w całości wypada w godzinach ciszy, należy do rodzica – nigdy nie liczy się na niekorzyść dziecka." },
            { title: "Pauza w każdej chwili", text: "Jeden przycisk wstrzymuje grę, na przykład na rodzinną rozmowę. W czasie pauzy nic się nie pogarsza." },
            { title: "Łagodne przypomnienia", text: "Zwierzę najpierw delikatnie przypomina dziecku o sobie, potem pilnie. Alarm dostajesz dopiero wtedy, gdy jakaś potrzeba przez godzinę pozostaje na zerze." },
            { title: "Prawdziwe konsekwencje", text: "Zaniedbanie oznacza 12 godzin u weterynarza. Cały dzień zaniedbania oznacza, że zwierzę trafia do schroniska – a ty możesz zacząć od nowa." },
            { title: "Wspólne zwierzęta", text: "Rodzeństwo może dzielić jedno zwierzę. Każda czynność jest przypisywana dziecku, które ją wykonało, więc wynik pozostaje sprawiedliwy." },
          ],
        },
        {
          type: "callout",
          title: "Porażka to też wynik.",
          text: "Jeśli zwierzę trafi do wirtualnego schroniska, czegoś cennego się nauczyliście – zanim zapłaciło za to prawdziwe zwierzę. Możesz zacząć od nowa, także z łatwiejszą rasą.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Dla rodziców – panel PetPrep, Care Score i kontrola",
        description:
          "Co widzą rodzice w PetPrep: codzienny sygnalizator dla każdego dziecka, Care Score, obowiązki, raporty, powiadomienia, godziny ciszy, pauza i prywatność wbudowana od podstaw.",
      },
      eyebrow: "Dla rodziców",
      title: "Obiektywny dowód, a nie kolejna obietnica.",
      lead:
        "Nie musisz zgadywać, czy spacery naprawdę się odbyły. PetPrep mierzy opiekę według jasnych codziennych obowiązków i pokazuje ci, dziecko po dziecku, jak idzie.",
      blocks: [
        {
          type: "cards",
          heading: "Sygnalizator",
          intro: "Każde dziecko i każde zwierzę dostaje kolor na dziś, według czasu lokalnego twojej rodziny – zawsze z wyjaśnieniem w słowach.",
          columns: 3,
          items: [
            { title: "Zielony – wszystko dobrze", text: "Obowiązki są wykonywane zgodnie z planem.", tag: "ok" },
            { title: "Żółty – wymaga uwagi", text: "Dziś pominięto więcej niż dwa obowiązki.", tag: "warn" },
            { title: "Czerwony – pilne", text: "Zwierzę dziś zachorowało, jakaś potrzeba od ponad godziny jest na zerze albo zwierzę trafiło do schroniska.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = obowiązki wykonane na czas ÷ obowiązki oczekiwane × 100, minus 10 punktów za każdą chorobę, w zakresie od 0 do 100.",
            "Obowiązek to jedno konkretne zadanie: każda pora karmienia, każde z trzech uzupełnień wody, sprzątnięcie każdego bałaganu w ciągu dwóch godzin (szkoła i sen się nie liczą) oraz osiągnięcie dziennego celu spaceru.",
            "Czas, gdy gra była wstrzymana, zwierzę było u weterynarza albo umowa nie była jeszcze podpisana, nigdy nie liczy się na niekorzyść dziecka. Zakończony dzień zostaje zamknięty, więc wyniku nie da się później zmienić.",
            "Rodzeństwo, które dzieli jedno zwierzę, sprawiedliwie dzieli każdy obowiązek. Liczą się tylko własne czynności dziecka – jeśli jedno robi wszystko, ma wynik 100, a drugie 0.",
          ],
        },
        {
          type: "screens",
          heading: "Twój widok",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "To ty masz kontrolę",
          items: [
            "Godziny ciszy na szkołę i sen, według twojego czasu lokalnego – także przy zmianie czasu na letni i zimowy.",
            "Wstrzymaj grę dla dowolnego zwierzęcia jednym potwierdzonym stuknięciem; ekran dziecka blokuje się natychmiast.",
            "Zaproś drugiego rodzica jednorazowym kodem; oboje widzicie każde dziecko i każde zwierzę.",
            "Wyloguj dziecko ze wszystkich urządzeń, jeśli zgubi telefon; kody są jednorazowe i wygasają po 15 minutach.",
            "Wyeksportuj wszystkie dane swojej rodziny do pliku albo od razu usuń w aplikacji profil dziecka lub całe konto.",
          ],
        },
        {
          type: "list",
          heading: "Prywatność wbudowana od podstaw",
          items: [
            "Dzieci logują się kodem – bez e-maila, bez hasła, bez nazwiska.",
            "Przechowujemy pseudonim i – jeśli go dodasz – rok urodzenia. Nic więcej o twoim dziecku.",
            "Powiadomienia nigdy nie zawierają imienia dziecka, bo mogą się pojawić na ekranie blokady; ich tytułem może być imię zwierzęcia, jeśli zostało mu nadane.",
            "Kroki pochodzą z Apple Health (iPhone) lub Health Connect (Android), jeśli na to pozwolisz (tylko odczyt), oraz z czujnika ruchu telefonu, jeśli jest dostępny. PetPrep nie korzysta z GPS i nie śledzi lokalizacji.",
            "Bez reklam, bez czatu z obcymi, serwery w UE.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Gdy zwierzę zamieszka z wami – asystent AI PetPrep dla prawdziwego zwierzęcia",
        description:
          "Gdy twoja rodzina przygarnie prawdziwe zwierzę, PetPrep staje się asystentem AI: aktywność z inteligentnej obroży, alerty, pierwszy kontakt z AI i prawdziwy weterynarz, wzrost i karma.",
      },
      eyebrow: "Gdy zwierzę zamieszka z wami",
      title: "Symulacja się kończy. Opieka – nie.",
      lead:
        "Gdy twoja rodzina przyprowadzi do domu prawdziwe zwierzę, jedno stuknięcie zamienia PetPrep w asystenta na całe jego życie – w czasie rzeczywistym, bez pasków zdrowia i od początku znającego rytm dnia twojej rodziny.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Co będzie robić asystent",
          columns: 2,
          items: [
            { title: "Integracja z inteligentną obrożą", text: "Połącz popularne lokalizatory GPS i trackery aktywności – albo obrożę PetPrep – i zobacz aktywność w kontekście." },
            { title: "Alerty, które wyjaśniają", text: "„Max przebiegł dziś 2 km, o połowę mniej niż zwykle, i zjadł większy posiłek. Dodatkowy wieczorny spacer pomoże mu się wyciszyć”. Jedna obserwacja, jeden powód, jedna sugestia." },
            { title: "Najpierw AI, potem prawdziwy weterynarz", text: "Zadaj pytanie albo prześlij zdjęcie. Asystent odpowiada na ogólne pytania, ocenia, jak pilna jest sprawa, i w razie potrzeby kieruje cię do prawdziwego weterynarza – przy pilnych objawach od razu." },
            { title: "Test DNA dla twojego psa lub kota", text: "Zamów test DNA w aplikacji albo prześlij wynik testu, który już masz. PetPrep pokazuje, jakie rasy są w mieszance, co jest dla nich typowe i jakie problemy zdrowotne występują u tych ras częściej – ze źródłami. Udział procentowy ras to nie diagnoza, a test DNA nie wykrywa alergii." },
            { title: "Karta dla weterynarza", text: "Mieszanka ras i wszystkie wyniki DNA na jednej stronie albo w kodzie QR, żeby twój weterynarz od razu wiedział, co kryje się w mieszańcu." },
            { title: "Wzrost i żywienie", text: "Zapisuj wagę co tydzień, oglądaj krzywą wzrostu i dostawaj przypomnienie, gdy czas zmienić karmę." },
          ],
        },
        {
          type: "screens",
          heading: "Podgląd",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Zasady, z których nie zrezygnujemy",
          items: [
            "Asystent AI nie jest lekarzem weterynarii i nigdy nie stawia diagnozy. Każda odpowiedź dotycząca zdrowia zawiera sposób kontaktu z prawdziwym weterynarzem.",
            "Oferty partnerów (sklepów, ubezpieczycieli, trenerów, weterynarzy) są zawsze oznaczone, a jeśli dostajemy prowizję, informujemy o tym.",
            "Bez twojej zgody nic nie trafia do partnera.",
            "Dane twojego dziecka z wyzwania przechodzą do asystenta tylko wtedy, gdy się na to zgodzisz.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Cennik – PetPrep na start za darmo, 49,99 € za 12-tygodniowe wyzwanie",
        description:
          "Mieszaniec jest za darmo na zawsze. 12-tygodniowe wyzwanie PetPrep kosztuje 49,99 € za zwierzę, w jednorazowym zakupie. Jedna cena dla rodzeństwa, które dzieli zwierzę. Także jako ulepszenie twojego darmowego zwierzęcia.",
      },
      eyebrow: "Cennik",
      title: "Proste, uczciwe ceny.",
      lead: "Zacznij za darmo z mieszańcem. Pełne 12-tygodniowe wyzwanie kupisz, kiedy zechcesz – 12 tygodni liczy się od chwili zakupu. Możesz je też dodać do darmowego zwierzęcia, którym twoje dziecko już się opiekuje.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Życzenia – rzeczy dla twojego zwierzęcia",
          intro:
            "W aplikacji dziecko prosi o rzeczy dla swojego zwierzęcia; ty decydujesz i kupujesz. Dziecko nigdy nie widzi ceny. Przedmioty są wyłącznie ozdobne: nigdy nie zmieniają potrzeb, Care Score ani certyfikatu. Dostępne także dla darmowego psa mieszańca i kota domowego.",
          head: ["Przedmiot", "Cena"],
          rows: [
            ["Legowisko (kot: koszyk)", "5,99 €"],
            ["Miski na jedzenie i wodę", "5,99 €"],
            ["Zabawka (pies: sznur lub piszcząca zabawka, kot: pluszowa myszka lub wędka z piórkami)", "5,99 € za zabawkę"],
            ["Smakołyki, paczka 10 sztuk", "2,99 €"],
            ["Zestaw powitalny: legowisko + miski + zabawka", "15,99 € (zamiast 17,97 €)"],
          ],
          note: "Życzenia pojawią się z następną aktualizacją aplikacji; będzie można je kupić, gdy przedmioty będą dostępne w App Store i Google Play. Ceny dotyczą Słowenii; sklep pokazuje cenę dla twojego kraju.",
        },
        {
          type: "faq",
          heading: "Pytania o ceny",
          items: [
            { q: "Czy wersja darmowa jest naprawdę darmowa?", a: "Tak. Zwierzę mieszaniec jest za darmo na zawsze – z pełną symulacją, prawdziwymi spacerami i panelem rodzica." },
            { q: "Co obejmuje wyzwanie?", a: "Wymagające rasy, takie jak [border collie](breed:border_collie), nastroje twojego zwierzęcia jako filmy AI, Certyfikat odpowiedzialności na końcu i dostęp dla obojga rodziców. Możesz je wybrać także z psem mieszańcem lub kotem domowym." },
            { q: "Czy możemy przejść na wyzwanie z darmowym zwierzęciem, które moje dziecko już ma?", a: "Tak, jeśli darmowy pies mieszaniec lub kot domowy jest nadal w grze. W aplikacji rodzica rozpocznij wyzwanie z karty dziecka. Zwierzę pozostaje to samo: imię, wygląd, wiek i nauczone komendy. 12 tygodni, Care Score i certyfikat liczą się od zakupu; wcześniejsze dni zostają w historii, oznaczone jako dni przed wyzwaniem, i się nie liczą. Cena jest taka sama: 49,99 € jednorazowo, bez subskrypcji. Psów mieszańców utworzonych we wczesnej wersji aplikacji nie można przenieść do wyzwania; aplikacja powie ci, czy dotyczy to twojego psa." },
            { q: "Czy zwierzę z wyzwania może wrócić do planu bezpłatnego?", a: "Nie na życzenie. Pies mieszaniec lub kot domowy wraca do planu bezpłatnego tylko wtedy, gdy sklep zwróci pieniądze za zakup; wyzwanie kończy się wtedy bez certyfikatu. Jeśli później kupisz wyzwanie ponownie, zacznie się nowe 12 tygodni." },
            { q: "Czy aplikacja będzie mnie namawiać do zakupu?", a: "Nie. Jeśli twoje dziecko opiekowało się darmowym zwierzęciem w co najmniej 5 z jego pierwszych 7 dni, dostaniesz jedno powiadomienie i kartę w panelu z informacją o wyzwaniu – raz na zwierzę i nigdy w godzinach ciszy. Dziecko nie widzi cen ani tego przypomnienia." },
            { q: "Czy rodzeństwo płaci podwójnie?", a: "Nie. Dzieci, które dzielą jedno zwierzę, płacą jedną cenę. Drugie zwierzę w rodzinie to osobne wyzwanie." },
            { q: "Jak zapłacić?", a: "W aplikacji, przez App Store lub Google Play. Zwrotami zajmuje się sklep, w którym masz konto." },
            { q: "Czym są Życzenia i czy moje dziecko może samo coś kupić?", a: "Twoje dziecko może poprosić o legowisko, miski, zabawkę lub smakołyki dla swojego zwierzęcia – maksymalnie trzy otwarte prośby naraz. Dostajesz powiadomienie i albo kupujesz, albo wybierasz „Nie teraz”. Dziecko nigdy nie widzi cen i w aplikacji dla dzieci nie może niczego kupić." },
            { q: "Czy kupione przedmioty ułatwiają grę?", a: "Nie. Przedmioty są wyłącznie ozdobne. Nigdy nie zmieniają potrzeb, Care Score ani certyfikatu, a w Życzeniach nie ma weterynarza ani leków – nigdy „zapłać, żeby uratować zwierzę”." },
            { q: "Czy dla dorosłych jest tak samo?", a: "Tak. Jeśli używasz PetPrep samodzielnie, żeby wypróbować rasę, obowiązuje to samo: mieszaniec jest za darmo na zawsze, a 12-tygodniowe wyzwanie kosztuje 49,99 € za zwierzę." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "FAQ – pytania, które rodzice zadają o PetPrep",
        description:
          "Odpowiedzi o PetPrep: ile czasu dziennie, korzystanie przez dorosłych, prywatność i lokalizacja, kroki, rodzeństwo, co jeśli dziecku się nie uda, języki, gatunki, prawdziwe zwierzęta.",
      },
      eyebrow: "FAQ",
      title: "Pytania, które zadają rodzice.",
      lead: "Krótkie, szczere odpowiedzi. Czegoś brakuje? Napisz do nas.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Dla dzieci w jakim wieku jest PetPrep?", a: "Stworzyliśmy go z myślą o dzieciach mniej więcej od 7 do 12 lat, ale dobrze sprawdza się też do 16. roku życia. Korzystają z niego też dorośli, żeby sprawdzić, czy konkretna rasa jest naprawdę dla nich, zanim ją kupią lub adoptują." },
            { q: "Czy mogę korzystać z PetPrep samodzielnie, bez dzieci?", a: "Tak. Załóż konto jako rodzic i dodaj siebie jako profil opiekuna – wystarczy pseudonim, rok urodzenia zostaw pusty. Wybierz rasę, utwórz 6-cyfrowy kod, a potem na tym samym telefonie albo na innym wybierz „Jestem dzieckiem” i wpisz kod – tak stajesz się opiekunem. Ponieważ będzie to pies rodzinny, później możesz dodać partnera lub dzieci, żeby opiekować się nim razem. Cena jest taka sama jak dla rodzin." },
            { q: "Ile czasu dziennie to zajmuje?", a: "Kilka minut na jedzenie, wodę i sprzątanie – plus spacer, którego i tak potrzebowałby prawdziwy pies." },
            { q: "Czy aplikacja śledzi lokalizację mojego dziecka?", a: "Nie. Na spacerach liczy wyłącznie kroki. Jeśli na to pozwolisz, odczytuje je z Apple Health (iPhone) lub Health Connect (Android) – tylko odczyt i tylko kroki; tam, gdzie to możliwe, korzysta też z czujnika ruchu telefonu. O zgodę prosi na ekranie spaceru. GPS nie jest używany." },
            { q: "Czy moje dziecko potrzebuje adresu e-mail?", a: "Nie. To ty zakładasz konto; dziecko loguje się 6-cyfrowym kodem, który wygenerujesz. Przechowujemy tylko pseudonim i opcjonalnie rok urodzenia." },
            { q: "Co się stanie, jeśli moje dziecko zapomni?", a: "Zwierzę najpierw wysyła łagodne przypomnienia. Jeśli jakaś potrzeba pozostaje na zerze, zwierzę choruje i spędza 12 godzin u weterynarza. Po całym dniu bez opieki zabiera je wirtualne schronisko – a ty możesz zacząć od nowa." },
            { q: "Czy rodzeństwo może dzielić jedno zwierzę?", a: "Tak. Każde dziecko podpisuje własną umowę, każda czynność jest przypisywana temu, kto ją wykonał, a każde dziecko dostaje własny, sprawiedliwy Care Score." },
            { q: "A co ze szkołą i porą snu?", a: "Ustaw godziny ciszy. Zwierzę zwalnia, nic nie jest wysyłane, a posiłkami, które w całości wypadają w godzinach ciszy, zajmujesz się ty." },
            { q: "Czy to nie jest straszne dla dzieci?", a: "Nie. Konsekwencje są prawdziwe, ale łagodne: zwierzę trafia do weterynarza albo do schroniska, nigdy nie ma drastycznych scen i zawsze można zacząć od nowa." },
            { q: "Jakie zwierzęta są dostępne?", a: "Dziś [psy](species:dog) i [koty](species:cat): darmowy pies mieszaniec i kot domowy, a także 12-tygodniowe wyzwanie z jednym z nich lub z każdą rasą z [encyklopedii zwierząt](page:animals), która podaje też ich potrzeby ze źródłami. Kolejne gatunki są planowane." },
            { q: "W jakich językach?", a: "Dziś po angielsku i słoweńsku. Kolejne języki pojawią się, gdy PetPrep będzie startować w nowych krajach." },
            { q: "Co się dzieje, gdy już mamy prawdziwe zwierzę?", a: "PetPrep może stać się asystentem AI dla twojego prawdziwego zwierzęcia. Ta część jest w przygotowaniu." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partnerzy – współpracuj z PetPrep",
        description:
          "PetPrep współpracuje ze sklepami zoologicznymi, schroniskami, weterynarzami, trenerami, ubezpieczycielami, producentami obroży i szkołami, aby pomagać rodzinom odpowiedzialnie przyjmować zwierzęta.",
      },
      eyebrow: "Partnerzy",
      title: "Lepiej przygotowane rodziny dla wszystkich, którym zależy na zwierzętach.",
      lead:
        "Rodziny, które ukończą PetPrep, wiedzą, czego naprawdę wymaga zwierzę. Budujemy sieć partnerów, którzy docierają do nich we właściwym momencie – z wyraźnym oznaczeniem i zawsze za zgodą rodziny.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Z kim współpracujemy",
          columns: 3,
          items: [
            { title: "Sklepy zoologiczne", text: "Docieraj do rodzin w chwili, gdy udowadniają, że są gotowe – na przykład z ofertą wyprawki przy certyfikacie." },
            { title: "Schroniska, fundacje i hodowcy", text: "Polecaj PetPrep przed adopcją lub zakupem – mniej pochopnych decyzji i zwrotów." },
            { title: "Weterynarze", text: "Gdy prawdziwe zwierzę zamieszka w domu, asystent AI odpowiada na pierwsze pytania i kieruje właścicieli do ciebie, a podsumowanie przypadku udostępnia tylko za zgodą." },
            { title: "Trenerzy i szkoły dla psów", text: "Rekomendacje i rezerwacje, gdy rodzina przechodzi do prawdziwego psa." },
            { title: "Ubezpieczyciele zwierząt domowych", text: "Oferty uwzględniające rasę, gdy zostanie zarejestrowane prawdziwe zwierzę – wyraźnie oznaczone." },
            { title: "Producenci obroży i urządzeń IoT", text: "Dane o aktywności dla inteligentniejszych alertów, które tłumaczą, co się dzieje." },
          ],
        },
        {
          type: "list",
          heading: "Dlaczego partnerzy nam ufają",
          items: [
            "Dzieci logują się bez e-maila, a ich dane ograniczamy do minimum, na serwerach w UE.",
            "Na ekran dziecka trafiają tylko zweryfikowane treści; nie ma reklam.",
            "Każda oferta partnera jest oznaczona, a każda prowizja ujawniona rodzinie.",
          ],
        },
        { type: "callout", title: "Porozmawiajmy.", text: "Warunki współpracy są w przygotowaniu. Napisz, kim jesteś i co masz na myśli.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Zainwestuj w PetPrep – od gotowości na zwierzę do opieki przez całe jego życie",
        description:
          "PetPrep zamienia obietnicę dziecka w dowód, zanim rodzina przyjmie zwierzę, a potem staje się asystentem AI na całe jego życie. Przed premierą; materiały na życzenie.",
      },
      eyebrow: "Inwestorzy",
      title: "Od 12-tygodniowego wyzwania do relacji na 10–15 lat.",
      lead:
        "PetPrep daje rodzicom obiektywny dowód, czy ich dziecko jest gotowe na prawdziwe zwierzę – a potem zostaje z rodziną przez całe życie zwierzęcia.",
      blocks: [
        {
          type: "cards",
          heading: "Szansa",
          columns: 3,
          items: [
            { title: "Problem", text: "Dzieci obiecują, że będą opiekować się zwierzęciem; rodzice nie mają neutralnego sposobu, by to sprawdzić, zanim zainwestują pieniądze i lata opieki." },
            { title: "Rozwiązanie", text: "Realistyczna 12-tygodniowa symulacja z panelem rodzica na żywo i obiektywnym Care Score, zakończona Certyfikatem odpowiedzialności." },
            { title: "Rozwój", text: "Gdy prawdziwe zwierzę zamieszka w domu – asystent AI: dane z obroży, pierwszy kontakt z AI i weterynarzem, wzrost i żywienie, testy DNA, usługi partnerów." },
          ],
        },
        {
          type: "table",
          heading: "Model biznesowy",
          head: ["Źródło przychodu", "Model", "Status"],
          rows: [
            ["Zwierzę mieszaniec", "Za darmo na zawsze (pozyskiwanie użytkowników)", "Ustalone"],
            ["12-tygodniowe wyzwanie PetPrep", "49,99 € za zwierzę, jednorazowy zakup", "Ustalone"],
            ["Życzenia – rzeczy dla zwierzęcia (wyłącznie ozdobne)", "Zakupy w aplikacji: 5,99 € za przedmiot, smakołyki 2,99 € za 10, zestaw 15,99 €; także w wersji darmowej", "Zbudowane, zakup w sklepie wkrótce"],
            ["Oferty partnerów", "Prowizje od sklepów, ubezpieczycieli, weterynarzy i trenerów", "Planowane"],
            ["Asystent AI dla prawdziwego zwierzęcia", "Subskrypcja", "Planowane"],
            ["Testy DNA dla psów i kotów", "Sprzedaż testów i prowizja partnerska", "Planowane"],
          ],
        },
        {
          type: "list",
          heading: "Co już zbudowaliśmy",
          items: [
            "Silnik gry po stronie serwera z synchronizacją w czasie rzeczywistym, przetestowany na symulacjach całych dni, w dni zmiany czasu oraz przy nietypowych układach rodzinnych.",
            "Rodziny z więcej niż jednym rodzicem, kilkorgiem dzieci i wspólnymi zwierzętami, ze sprawiedliwym wynikiem dla każdego dziecka.",
            "Niepowtarzalne, fotorealistyczne zwierzęta AI przy zmierzonych i ograniczonych kosztach AI; media przechowujemy na wynajętych serwerach w Niemczech (Hetzner, UE).",
            "Potrzeby zwierząt oparte na cytowanych źródłach weterynaryjnych i kynologicznych – każdą liczbę da się prześledzić do jej źródła.",
            "Bezpieczeństwo dzieci wbudowane od podstaw: logowanie PIN-em bez e-maila, minimum danych, bez reklam, wyłącznie zweryfikowane media.",
          ],
        },
        {
          type: "prose",
          heading: "Etap",
          paragraphs: [
            "PetPrep jest przed premierą, planowana jest zamknięta beta. Pierwszy rynek to Słowenia i region, następnie DACH i Wielka Brytania; produkt od pierwszego dnia jest budowany z myślą o lokalizacji na cały świat.",
            "Założyciel: David Tacer, programista i przedsiębiorca (Data Vallis David Tacer s.p., Dravograd, Słowenia). Więcej [o nas](page:about).",
          ],
        },
        { type: "callout", title: "Poproś o materiały dla inwestorów.", text: "Materiały, prezentację i data room udostępniamy na życzenie.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Kontakt z PetPrep – rodziny, prywatność, partnerzy, inwestorzy",
        description: "Kontakt z PetPrep: pytania rodzin, wnioski dotyczące prywatności, współpraca i zapytania inwestorów. Odpowiadamy po angielsku lub słoweńsku.",
      },
      eyebrow: "Kontakt",
      title: "Czytamy każdą wiadomość.",
      lead: "Napisz na właściwą skrzynkę, a odpowiemy najszybciej, jak to możliwe, po angielsku lub słoweńsku.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Dane firmy" }],
    },
    privacy: {
      navLabel: "Prywatność",
      meta: {
        title: "Polityka prywatności – PetPrep",
        description: "Jak PetPrep zbiera, wykorzystuje i chroni dane osobowe rodziców i dzieci oraz jak możesz korzystać ze swoich praw wynikających z RODO.",
      },
      eyebrow: "Informacje prawne",
      title: "Polityka prywatności",
      lead: "Tłumaczenie – wiążąca jest wyłącznie wersja angielska. PetPrep jest tworzony głównie dla dzieci, dlatego zbieramy jak najmniej danych i dokładnie wyjaśniamy, co z nimi robimy.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Kto odpowiada za dane",
              paragraphs: [
                "Administratorem danych osobowych przetwarzanych za pośrednictwem aplikacji PetPrep i tej strony internetowej jest {company}, {address}; {companyIds}. Kontakt w sprawach prywatności: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Jakie dane zbieramy",
              items: [
                "Konto rodzica: imię (tak, jak nazywa cię rodzina), adres e-mail, hasło (przechowywane wyłącznie jako bezpieczny skrót), strefa czasowa twojego urządzenia oraz czas zaakceptowania regulaminu i niniejszej polityki.",
                "Profil opiekuna (dziecka lub osoby dorosłej, która opiekuje się zwierzęciem): pseudonim o długości do 30 znaków i opcjonalnie rok urodzenia – w przypadku osoby dorosłej pozostawiony pusty. Bez e-maila, hasła, nazwiska i daty urodzenia.",
                "Urządzenia: model telefonu (na przykład „iPhone”, nigdy nazwa nadana telefonowi przez użytkownika), a na potrzeby powiadomień token push, platforma i wersja aplikacji.",
                "Aktywność opiekuńcza: czynności w symulacji (karmienie, woda, sprzątanie, spacery), dzienne sumy kroków (lub w trybie dostosowanym sumy pchnięć wózka – zob. sekcje 3 i 4), wyniki i raporty.",
                "Umowa odpowiedzialności: podpis dziecka złożony palcem, przechowywany jako linia wektorowa wraz z czasem podpisania.",
                "Kody: kody logowania i zaproszeń są przechowywane wyłącznie jako skróty i wygasają.",
                "Raporty błędów aplikacji: jeśli aplikacja się zawiesi lub ulegnie awarii, może wysłać krótki raport techniczny na nasz serwer w UE (typ i treść błędu, miejsce w kodzie, wersja aplikacji i systemu, nazwa ekranu, rola rodzica/dziecka). Nie zawiera imienia, adresu e-mail, identyfikatora użytkownika ani adresu IP, nie jest udostępniany żadnej stronie trzeciej i jest usuwany po 30 dniach.",
                "Lista wczesnego dostępu (ta strona internetowa): twój adres e-mail, język strony i czas zapisu.",
              ],
            },
            {
              heading: "3. Dane o zdrowiu i aktywności fizycznej (kroki, Apple Health i Health Connect)",
              paragraphs: [
                "PetPrep uzyskuje dostęp do jednego rodzaju danych o zdrowiu i aktywności fizycznej i tylko ten jeden rodzaj zbiera: liczbę kroków, które opiekun robi każdego dnia (aktywność fizyczna). Wykorzystujemy je do jednej funkcji – codziennego spaceru ze zwierzęciem w symulacji: dziecko chodzi, a jego kroki liczą się jako spacer zwierzęcia.",
                "Jak uzyskujemy dostęp: aplikacja na telefonie dziecka liczy kroki. Jeśli pozwolisz na to w systemowym oknie uprawnień, odczytuje je z Apple Health (iPhone) lub Health Connect (Android) – tylko odczyt i tylko kroki. Tam, gdzie to możliwe, korzysta też z czujnika ruchu telefonu (Android: uprawnienie „Aktywność fizyczna”; iPhone: „Ruch i fitness”); bez uprawnienia dla Apple Health lub Health Connect kroki liczy tylko czujnik ruchu.",
                "Co zbieramy: aplikacja wysyła na nasz serwer wyłącznie dzisiejszą sumę kroków, jej źródło (Apple Health, Health Connect lub czujnik ruchu) i czas wysłania. Przechowujemy jedną sumę dzienną na profil opiekuna – nigdy pojedynczych ruchów, tras, lokalizacji, tętna, snu, wagi ani żadnych innych danych o zdrowiu. Nigdy niczego nie zapisujemy w Apple Health ani w Health Connect.",
                "Jak je wykorzystujemy i udostępniamy: sumy kroków służą wyłącznie do prowadzenia spaceru w symulacji i pokazywania go rodzicowi (panel i raporty). Nie wykorzystujemy ich do reklamy, profilowania, oceny stanu zdrowia ani trenowania modeli AI, nie sprzedajemy ich i nie udostępniamy stronom trzecim; jedynie nasz dostawca hostingu (Hetzner, serwery w UE) przechowuje je w naszym imieniu. Sposób, w jaki wykorzystujemy dane otrzymane z Health Connect, jest zgodny z zasadami uprawnień Health Connect, w tym z wymogami ograniczonego użycia (Limited Use).",
                "Podstawa prawna i okres przechowywania: odczyt kroków jest opcjonalny i odbywa się wyłącznie na podstawie uprawnienia udzielonego przez ciebie na urządzeniu; sumę dzienną przetwarzamy, aby świadczyć wybraną przez ciebie usługę (wykonanie umowy). Sumy kroków są częścią eksportu danych twojej rodziny i są usuwane razem z profilem opiekuna lub twoim kontem; z naszych zaszyfrowanych kopii zapasowych znikają najpóźniej w ciągu 35 dni.",
                "Uprawnienie możesz w każdej chwili cofnąć w ustawieniach urządzenia: iPhone → Ustawienia → Zdrowie → Dostęp do danych i urządzenia → PetPrep; Android → Health Connect → Uprawnienia aplikacji → PetPrep. Uprawnienie do czujnika ruchu możesz cofnąć w ustawieniach telefonu dla aplikacji PetPrep. Spacer nie liczy wtedy nowych kroków.",
              ],
            },
            {
              heading: "4. Tryb dostosowany (pchnięcia wózka)",
              paragraphs: [
                "Tryb dostosowany jest przeznaczony dla dzieci poruszających się na wózku: spacer liczy wtedy pchnięcia wózka zamiast kroków. Pojawi się w aplikacji z następną aktualizacją; poniżej opisujemy, jakie dane przetwarzamy, jeśli rodzic go włączy.",
                "Jeśli rodzic włączy tryb dostosowany dla dziecka, przechowujemy wyłącznie informację, że jest włączony. Nie pytamy o powód, diagnozę ani stan zdrowia i ich nie przechowujemy.",
                "Gdy tryb jest włączony, aplikacja na telefonie dziecka odczytuje zamiast kroków wyłącznie pchnięcia wózka – z Apple Health (rejestrowane przez Apple Watch), na podstawie osobnego uprawnienia tylko do odczytu. Na Androidzie aplikacja nie odczytuje pchnięć; zamiast tego rodzic wpisuje minuty spaceru. Nie korzysta wtedy z czujnika ruchu. Na nasz serwer trafia wyłącznie dzisiejsza liczba pchnięć; przy danym dniu zaznaczamy, że liczone są pchnięcia.",
                "Rodzic może wpisać minuty spaceru dziecka w trybie dostosowanym (tylko za dzisiejszy dzień). Przechowujemy datę, liczbę minut i informację, który rodzic wpisał spacer.",
                "Ponieważ to, że tryb dostosowany jest włączony, może wskazywać na stan zdrowia dziecka, przetwarzamy tę informację wyłącznie na podstawie twojej wyraźnej zgody (art. 9 ust. 2 lit. a RODO), której jako rodzic lub opiekun prawny udzielasz w imieniu dziecka (art. 8 RODO), włączając przełącznik. Tryb możesz w każdej chwili wyłączyć; aplikacja znów liczy wtedy kroki.",
                "Te dane (przełącznik, dni liczone w pchnięciach i wpisane spacery) są częścią eksportu danych twojej rodziny i są usuwane razem z profilem dziecka lub twoim kontem; z naszych zaszyfrowanych kopii zapasowych znikają najpóźniej w ciągu 35 dni, tak jak wszystkie inne dane.",
              ],
            },
            {
              heading: "5. Czego nie zbieramy",
              items: [
                "Lokalizacji: PetPrep nie korzysta z GPS.",
                "Innych danych o zdrowiu z Apple Health lub Health Connect poza dzienną liczbą kroków lub pchnięć wózka.",
                "Nie ma reklam ani zewnętrznych pakietów SDK do reklamy lub śledzenia w aplikacji.",
                "Nie ma czatu między użytkownikami.",
                "Na tej stronie nie ma reklamowych plików cookie. Analityczne pliki cookie są ustawiane tylko wtedy, gdy na to pozwolisz (zob. Pliki cookie poniżej).",
              ],
            },
            {
              heading: "6. Dlaczego przetwarzamy dane (cele i podstawy prawne)",
              items: [
                "Aby świadczyć usługę, o którą prosisz: konta, symulację, panel, raporty i powiadomienia (wykonanie umowy).",
                "Aby realizować zakupy przez App Store lub Google Play (wykonanie umowy).",
                "Na potrzeby codziennego spaceru (dzienne sumy kroków – dane o zdrowiu i aktywności fizycznej, zob. sekcja 3): wykonanie umowy; odczyt z Apple Health, Health Connect lub czujnika ruchu wyłącznie na podstawie uprawnienia udzielonego przez ciebie na urządzeniu.",
                "Na potrzeby trybu dostosowanego (informacja, że jest włączony, pchnięcia wózka i wpisane spacery): wyraźna zgoda rodzica wyrażona przez włączenie przełącznika (art. 9 ust. 2 lit. a i art. 8 RODO – zob. sekcja 4).",
                "Aby zapewnić bezpieczeństwo usługi, na przykład ograniczając powtarzane próby logowania (prawnie uzasadniony interes).",
                "Aby utrzymywać i zabezpieczać usługę dzięki raportom błędów aplikacji, które pomagają nam usuwać zawieszenia i awarie (prawnie uzasadniony interes).",
                "Aby wypełniać obowiązki prawne, na przykład księgowe w związku z zakupami (obowiązek prawny).",
                "Aby wysyłać ci e-maile o premierze PetPrep, jeśli jesteś na liście wczesnego dostępu (zgoda – możesz zrezygnować w każdym e-mailu).",
                "Aby zrozumieć, jak odwiedzający korzystają z tej strony, za pomocą Google Analytics, wyłącznie jeśli pozwolisz na analityczne pliki cookie (zgoda – możesz ją zmienić w każdej chwili w Ustawieniach plików cookie).",
              ],
            },
            {
              heading: "7. Dzieci",
              paragraphs: [
                "Tylko rodzic lub opiekun prawny może założyć konto i dodać dziecko. Rodzic decyduje, co dziecko może robić, i w każdej chwili może usunąć profil dziecka. Nigdy nie prosimy dziecka o dane kontaktowe, nigdy nie wyświetlamy reklam i nigdy nie umożliwiamy kontaktu z obcymi.",
                "Właściciel konta może też utworzyć profil opiekuna dla siebie lub innej dorosłej osoby w rodzinie – na przykład aby sprawdzić, czy dana rasa mu odpowiada, zanim ją kupi lub adoptuje. Do takiego profilu stosują się te same zasady i ten sam minimalny zakres danych; obejmuje go też każde zabezpieczenie zaprojektowane dla dzieci.",
              ],
            },
            {
              heading: "8. Obrazy i filmy generowane przez AI",
              paragraphs: [
                "Zdjęcie i krótkie filmy każdego zwierzęcia tworzy usługa AI wyłącznie na podstawie opisu zwierzęcia (rasa, sierść, znaczenia i podobne cechy). Opis nigdy nie zawiera imion ani żadnych informacji o twojej rodzinie. Gotowe media są przechowywane na wynajętych serwerach w Niemczech (Hetzner, UE) i wyświetlane za pomocą krótkotrwałych linków.",
              ],
            },
            {
              heading: "9. Dostawcy usług",
              items: [
                "Hosting: Hetzner Online (serwery w UE).",
                "Generowanie obrazów i filmów AI: fal.ai (otrzymuje wyłącznie opis zwierzęcia).",
                "Powiadomienia push: Apple Push Notification service i Firebase Cloud Messaging za pośrednictwem Expo; tytułem powiadomienia może być imię zwierzęcia, jeśli zostało mu nadane, ale powiadomienia nigdy nie zawierają imienia dziecka.",
                "Zakupy: Apple App Store i Google Play; zarządzanie zakupami przez RevenueCat, gdy zakupy zostaną uruchomione.",
                "E-maile o wczesnym dostępie: Klaviyo (otrzymuje wyłącznie adres e-mail i język, które podajesz na tej stronie).",
                "Zgoda na pliki cookie na stronie: Kockica (przechowuje twój wybór dotyczący zgody).",
                "Analityka strony: Google Analytics 4 od Google Ireland Ltd., wyłącznie za twoją zgodą; Google Analytics 4 nie przechowuje adresów IP.",
                "Zarządzanie tagami na stronie: Google Tag Manager od Google Ireland Ltd.; sam nie ustawia plików cookie, a ładowane przez niego tagi respektują twoją zgodę.",
                "Osadzone filmy: YouTube od Google Ireland Ltd. (youtube-nocookie.com), ładowane dopiero po naciśnięciu odtwarzania i zgodzie na reklamowe pliki cookie.",
              ],
            },
            {
              heading: "10. Jak długo przechowujemy dane",
              paragraphs: [
                "Przechowujemy twoje dane, dopóki istnieje twoje konto. Gdy usuniesz w aplikacji profil dziecka lub swoje konto, dane są usuwane natychmiast i nie można ich przywrócić; z naszych zaszyfrowanych kopii zapasowych znikają automatycznie najpóźniej w ciągu 35 dni. Dokumentację, którą musimy przechowywać z mocy prawa (na przykład dotyczącą zakupów), przechowujemy przez okres wymagany przepisami. Raporty błędów aplikacji są usuwane automatycznie po 30 dniach.",
              ],
            },
            {
              heading: "11. Twoje prawa",
              paragraphs: [
                "Masz prawo dostępu do swoich danych, ich sprostowania, eksportu i usunięcia, prawo do sprzeciwu wobec przetwarzania i do jego ograniczenia oraz prawo do wniesienia skargi do organu nadzorczego – w Słowenii jest to Komisarz ds. Informacji (Informacijski pooblaščenec). W aplikacji możesz wyeksportować wszystkie dane swojej rodziny do pliku (Zarządzanie → Konto → Eksportuj moje dane) oraz usunąć profil dziecka lub całe konto. W pozostałych sprawach napisz na {privacyEmail}.",
              ],
            },
            {
              heading: "12. Bezpieczeństwo",
              paragraphs: [
                "Hasła i kody są przechowywane jako skróty, połączenia są szyfrowane, aktualizacje na żywo trafiają wyłącznie do członków twojej rodziny, a media AI są weryfikowane, zanim pojawią się na ekranie dziecka.",
              ],
            },
            {
              heading: "13. Zmiany",
              paragraphs: ["O ważnych zmianach poinformujemy cię w aplikacji, zanim wejdą w życie. Data na górze strony wskazuje najnowszą wersję."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Pliki cookie",
          paragraphs: [
            "Niezbędne pliki cookie zapewniają działanie strony i zapamiętują twój wybór dotyczący zgody. Wszystkie inne pliki cookie są ustawiane tylko wtedy, gdy pozwolisz na to w banerze, według kategorii: funkcjonalne (dodatkowe funkcje), analityczne (Google Analytics: które strony są odwiedzane) i reklamowe (filmy z YouTube osadzone na niektórych stronach; na tej stronie nie wyświetlamy reklam). Sam Google Tag Manager nie ustawia plików cookie, a każdy tag, który ładuje, respektuje twój wybór. Swój wybór możesz w każdej chwili zmienić lub wycofać.",
            "Poniższą tabelę automatycznie tworzy baner zgody na podstawie tego, co wykrywa na tej stronie, więc pokazuje pliki cookie, których faktycznie używamy.",
          ],
          settings: "Zmień ustawienia plików cookie",
          fallback: "Lista plików cookie wczytuje się razem z banerem zgody. Jeśli jej nie widzisz, zezwól na skrypty na tej stronie albo napisz na {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Regulamin",
      meta: {
        title: "Regulamin – PetPrep",
        description:
          "Zasady korzystania z aplikacji i strony PetPrep: konta i profile dzieci, 12-tygodniowe wyzwanie i certyfikat, zakupy i zwroty, treści AI, tryb dostosowany, uczciwe korzystanie, usuwanie konta i prawo właściwe.",
      },
      eyebrow: "Informacje prawne",
      title: "Regulamin",
      lead: "Tłumaczenie – wiążąca jest wyłącznie wersja angielska. Zasady korzystania z PetPrep, napisane tak, żeby dało się je przeczytać.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Usługa",
              paragraphs: [
                "Usługodawcą PetPrep jest {company}, {address}; {companyIds} – ta sama firma, która jest administratorem danych zgodnie z polityką prywatności. Niniejszy regulamin dotyczy aplikacji PetPrep i strony internetowej petprep.si.",
                "PetPrep to symulacja opieki nad zwierzęciem. Pomaga rodzinom i osobom indywidualnym sprawdzić, czy są gotowe opiekować się prawdziwym zwierzęciem – dzieciom oraz dorosłym, którzy chcą sprawdzić, czy dana rasa im odpowiada, zanim ją kupią lub adoptują. To narzędzie edukacyjne, a nie porada weterynaryjna ani żadna inna porada profesjonalna.",
              ],
            },
            {
              heading: "2. Konta, profile i dzieci",
              items: [
                "Konta zakładają osoby dorosłe: rodzice, opiekunowie prawni lub dorośli korzystający z PetPrep dla siebie. Rejestrując się, akceptujesz niniejszy regulamin i politykę prywatności.",
                "Opiekunowie (dzieci lub dorośli) zajmują się zwierzęciem za pośrednictwem profilu opiekuna, który tworzy właściciel konta – może utworzyć go także dla siebie. Profil wymaga tylko pseudonimu i opcjonalnie roku urodzenia – więcej informacji o dziecku nie potrzebujemy, więc nie wpisuj ich nigdzie w aplikacji.",
                "Dziecko loguje się 6-cyfrowym kodem (PIN), który tworzysz w swojej aplikacji. Kod jest krótkotrwały i działa tylko raz; przekaż go wyłącznie dziecku, dla którego jest przeznaczony.",
                "Jako rodzic lub opiekun prawny odpowiadasz za to, jak twoje dziecko korzysta z PetPrep: czy aplikacja mu odpowiada, ile czasu na nią poświęca i czy jest bezpieczne na spacerach (na przykład w ruchu ulicznym). Grę z każdym zwierzęciem możesz zatrzymać w każdej chwili.",
                "Możesz zaprosić do rodziny drugiego rodzica za pomocą kodu zaproszenia; oboje widzicie wszystkie dane rodziny i oboje możecie zatrzymać grę.",
                "Podawaj prawdziwe informacje i dbaj o bezpieczeństwo swojego hasła, kodów i urządzeń.",
              ],
            },
            {
              heading: "3. 12-tygodniowe wyzwanie, Care Score i certyfikat",
              items: [
                "Wyzwanie trwa 12 tygodni (84 dni programu) i zaczyna się z chwilą zakupu; każdy opiekun ma własny termin zakończenia. Czas, w którym gra czeka na płatność, nie wlicza się do 12 tygodni. Jeśli przeniesiesz darmowe zwierzę do wyzwania, 12 tygodni również liczy się od zakupu; wiek zwierzęcia się nie zeruje, a dni przed zakupem pozostają widoczne w historii, oznaczone jako dni przed wyzwaniem, ale nie liczą się ani do 12 tygodni, ani do Care Score, ani do certyfikatu.",
                "Care Score (0–100) pokazuje, jaką część oczekiwanych obowiązków (karmienie, woda, sprzątanie, spacer, sesja treningowa) opiekun wykonał sam; każda choroba zwierzęcia go obniża. Czas, w którym gra jest zatrzymana, zwierzę jest u weterynarza, oraz godziny ciszy nigdy nie liczą się na niekorzyść opiekuna.",
                "Po 12 tygodniach zapisywany jest wynik końcowy, który później się nie zmienia; opieka po zakończeniu wyzwania na niego nie wpływa. Przy wyniku 70 lub wyższym możesz utworzyć w aplikacji Certyfikat odpowiedzialności (PDF); poniżej 70 otrzymujesz raport z wyzwania.",
                "Jeśli jedzenie, woda lub czystość pozostają na poziomie 0% przez 24 godziny, zwierzę zostaje „oddane do schroniska” (koniec gry). Gra z tym zwierzęciem się kończy, nie ma certyfikatu, a ty otrzymujesz raport z wyzwania.",
                "Care Score i certyfikat pokazują wyłącznie, jak opiekun zajmował się symulowanym zwierzęciem w aplikacji. Nie są gwarancją, że dziecko ani ktokolwiek inny jest gotowy na prawdziwe zwierzę, nie są profesjonalną oceną i nie zastępują twojego własnego osądu ani porady weterynarza, hodowcy czy schroniska. Decyzja o prawdziwym zwierzęciu zawsze należy do ciebie.",
                "Zasady gry (posiłki, spacery i opieka w zależności od rasy i wieku) są uproszczone i oparte na publicznych źródłach. Nie są poradą weterynaryjną; o zdrowie i opiekę nad prawdziwym zwierzęciem zapytaj weterynarza.",
              ],
            },
            {
              heading: "4. Funkcje darmowe i płatne, zakupy i zwroty",
              items: [
                "Pies mieszaniec i kot domowy są za darmo na zawsze i są sposobem na wypróbowanie PetPrep; nie ma darmowego okresu próbnego wyzwania. Darmowe zwierzę nie ma 12-tygodniowego programu ani certyfikatu, rodzic widzi historię z ostatnich 7 dni, a zwierzę ma podstawowy zestaw obrazów i filmów.",
                "12-tygodniowe wyzwanie PetPrep to jednorazowy zakup, a nie subskrypcja (49,99 € w Słowenii; sklep pokazuje cenę dla twojego kraju). W aktualnej wersji aplikacji możesz je wybrać z każdą rasą, także z psem mieszańcem i kotem domowym. Jeden zakup to jedno wyzwanie dla jednego zwierzęcia; każde nowe wyzwanie z nowym zwierzęciem to nowy zakup. Rodzeństwo opiekujące się tym samym zwierzęciem płaci raz.",
                "Rodzic może przenieść do wyzwania darmowego psa mieszańca lub kota domowego, którym ktoś już się opiekuje – za tę samą cenę i z tym samym zwierzęciem. Nie jest to możliwe po zakończeniu gry ani w przypadku psów mieszańców utworzonych we wczesnej wersji aplikacji; aplikacja pokazuje, kiedy tak jest. Zwierzęcia w wyzwaniu (także przeniesionego do wyzwania oraz psa mieszańca lub kota domowego wybranego do wyzwania) nie można przełączyć z powrotem na plan bezpłatny; psa mieszańca lub kota domowego przywraca do niego tylko zwrot pieniędzy (poniżej).",
                "Rodzic kupuje we własnej aplikacji przez App Store lub Google Play; w aplikacji dziecka nie ma zakupów. Płatność obsługuje sklep na własnych warunkach.",
                "Zwierzę do wyzwania możesz utworzyć przed zakupem. Dopóki wyzwanie nie zostanie opłacone, gra jest wstrzymana: zwierzę bezpiecznie czeka, jego potrzeby nie spadają i nic się nie pogarsza. Po zakupie gra toczy się dalej tam, gdzie się zatrzymała.",
                "Zwrotami zajmują się App Store i Google Play według własnych zasad; o zwrot poproś w sklepie, w którym dokonano zakupu. Jeśli sklep zwróci pieniądze za zakup przed zakończeniem wyzwania, gra z tym zwierzęciem zostaje ponownie wstrzymana. Obrazy i filmy utworzone po zakupie pozostają. Pies mieszaniec lub kot domowy nie zostaje wstrzymany, tylko wraca do planu bezpłatnego: wyzwanie kończy się bez certyfikatu, znów obowiązują zasady planu bezpłatnego, a zwierzę znów ma podstawowy zestaw zdjęć i filmów. Jeśli później ponownie kupisz wyzwanie dla tego zwierzęcia, nowe 12 tygodni zacznie się od nowego zakupu.",
                "Po zakończeniu gry (schronisko) zakup nie odblokowuje zwierzęcia; nowe wyzwanie to nowe zwierzę i nowy zakup.",
                "Życzenia (rzeczy dla zwierzęcia, gdy będą dostępne): dziecko może poprosić, ale kupić może tylko rodzic, we własnej aplikacji. Kupiony przedmiot należy do zwierzęcia, dla którego go kupiono, i jest wyłącznie ozdobny – nie wpływa na grę, wynik ani certyfikat. Po zakończeniu gry lub usunięciu zwierzęcia zakup pozostaje wykorzystany i nie podlega zwrotowi. Jeśli sklep zwróci pieniądze za zakup, przedmiot (w przypadku smakołyków – niewykorzystane smakołyki) zostaje usunięty.",
                "Jeśli usuniesz zwierzę, dziecko lub konto, gdy kupione wyzwanie wciąż trwa, zakup pozostaje wykorzystany: nie przechodzi na inne zwierzę, a usunięcie nie jest zwrotem. Aplikacja najpierw cię ostrzega i prosi o potwierdzenie.",
              ],
            },
            {
              heading: "5. Obrazy i filmy generowane przez AI",
              items: [
                "Obrazy i filmy zwierząt generuje sztuczna inteligencja (AI) wyłącznie na podstawie opisu zwierzęcia (rasa, kolor, sierść itp.), nigdy na podstawie danych o twojej rodzinie. Są ilustracjami symulowanego zwierzęcia i mogą nie odpowiadać dokładnie żadnemu prawdziwemu zwierzęciu ani wzorcowi rasy.",
                "Tam, gdzie pokazujemy je publicznie, na przykład jako portrety ras na tej stronie, oznaczamy je jako wygenerowane przez AI.",
                "Wygląd nie musi być niepowtarzalny: zwierzęta tej samej płatnej rasy i tego samego koloru mogą mieć te same obrazy i filmy, a darmowe zwierzęta otrzymują jeden ze wspólnych wyglądów swojej rasy. Płatne wyzwanie obejmuje większy zestaw filmów niż darmowe zwierzę.",
                "Po podpisaniu umowy lub dokonaniu zakupu przygotowanie obrazów i filmów może potrwać kilka minut; w tym czasie aplikacja pokazuje, że zwierzę się szykuje, i oznacza to, co jest jeszcze przygotowywane.",
                "Informacje o rasach w aplikacji i w encyklopedii zwierząt na tej stronie są streszczeniem cytowanych przez nas publicznych źródeł i nie zostały zweryfikowane przez weterynarza.",
              ],
            },
            {
              heading: "6. Kroki, dane o zdrowiu i tryb dostosowany",
              items: [
                "Codzienny spacer liczy prawdziwe kroki opiekuna. Jeśli na to pozwolisz, aplikacja odczytuje je z Apple Health lub Health Connect, tylko do odczytu (nigdy niczego tam nie zapisuje), albo z czujnika ruchu telefonu. Jakie dane przetwarzamy, opisuje polityka prywatności (sekcja 3).",
                "Tryb dostosowany jest przeznaczony dla dzieci poruszających się na wózku: spacer liczy wtedy pchnięcia wózka zamiast kroków. Możesz z niego korzystać, jeśli funkcja jest dostępna w twojej wersji aplikacji. Rodzic włącza go dla konkretnego dziecka; włączenie oznacza twoją zgodę, a wyłączenie ją wycofuje (polityka prywatności, sekcja 4).",
                "W trybie dostosowanym rodzic może wpisać minuty spaceru dziecka, tylko za dzisiejszy dzień. Odpowiadasz za te wpisy: wpisuj tylko spacery, które naprawdę się odbyły, ponieważ liczą się do Care Score i certyfikatu.",
                "PetPrep nie korzysta z lokalizacji i nie ostrzega przed niebezpieczeństwami podczas spaceru; o bezpieczeństwo spacerów dbasz ty.",
              ],
            },
            {
              heading: "7. Powiadomienia",
              paragraphs: [
                "Jeśli pozwolisz na to na urządzeniu, aplikacja wysyła powiadomienia push: przypomnienia dla opiekuna, alerty dla rodziców, gdy zwierzę nie ma jedzenia, wody lub czystości, oraz informacje o chorobie, końcu gry i zakończeniu wyzwania. Tytułem powiadomienia może być imię zwierzęcia, jeśli zostało mu nadane; powiadomienia nigdy nie zawierają imienia dziecka i nie są wysyłane w godzinach ciszy. Zgodę możesz w każdej chwili cofnąć w ustawieniach urządzenia; bez powiadomień opiekun może przegapić obowiązki, co wpływa na grę i wynik. Rodzice dostają też, najwyżej raz na darmowe zwierzę, przypomnienie o wyzwaniu, gdy ktoś opiekował się nim w co najmniej 5 z jego pierwszych 7 dni.",
              ],
            },
            {
              heading: "8. Uczciwe korzystanie",
              items: [
                "Nie próbuj oszukiwać licznika kroków ani pchnięć, wpisywać spacerów, które się nie odbyły, uzyskiwać dostępu do danych innych rodzin, analizować wstecznie (reverse engineering) ani zakłócać działania usługi.",
                "Nie nadawaj zwierzętom obraźliwych ani niestosownych imion i nie wpisuj danych osobowych dziecka, o które aplikacja nie prosi.",
                "Możemy ograniczyć lub zawiesić konta, które łamią te zasady lub narażają dzieci na ryzyko, i możemy usunąć niestosowne imię zwierzęcia.",
              ],
            },
            {
              heading: "9. Własność intelektualna",
              paragraphs: [
                "PetPrep, jego logo, projekt, oprogramowanie i treści należą do {company}. Aplikacji oraz obrazów, filmów i certyfikatu swojego zwierzęcia możesz używać do osobistego, niekomercyjnego użytku twojej rodziny – na przykład udostępniając je krewnym.",
              ],
            },
            {
              heading: "10. Odpowiedzialność",
              paragraphs: [
                "Dokładamy starań, aby PetPrep był dostępny i rzetelny, ale usługa jest świadczona w takim stanie, w jakim jest; opiera się też na usługach innych podmiotów (sklepy z aplikacjami, Apple Health, Health Connect, powiadomienia push, usługa AI), na które nie mamy wpływu. W zakresie dozwolonym przez prawo nie odpowiadamy za szkody pośrednie ani za decyzje o kupnie lub adopcji prawdziwego zwierzęcia. Żadne postanowienie niniejszego regulaminu nie ogranicza praw przysługujących ci jako konsumentowi na mocy bezwzględnie obowiązujących przepisów.",
              ],
            },
            {
              heading: "11. Usunięcie konta i zakończenie korzystania",
              paragraphs: [
                "Profil dziecka lub swoje konto możesz w każdej chwili usunąć w aplikacji. Usunięcie jest natychmiastowe i trwałe; gdy ostatni rodzic w rodzinie usunie swoje konto, usuwana jest cała rodzina. Wcześniej możesz wyeksportować swoje dane (Zarządzanie → Konto → Eksportuj moje dane). Co dzieje się z danymi, opisuje polityka prywatności; co dzieje się z zakupem, opisuje sekcja 4.",
              ],
            },
            {
              heading: "12. Zmiany regulaminu",
              paragraphs: [
                "Aktualizujemy regulamin, gdy zmienia się aplikacja lub prawo. O ważnych zmianach poinformujemy cię w aplikacji, zanim wejdą w życie. Data na górze strony wskazuje najnowszą wersję. Jeśli nie zgadzasz się ze zmianą, możesz w każdej chwili usunąć konto.",
              ],
            },
            {
              heading: "13. Prawo właściwe i spory",
              paragraphs: [
                "Niniejszy regulamin podlega prawu Republiki Słowenii. Konsumenci mogą również korzystać z bezwzględnie obowiązującej ochrony kraju, w którym mieszkają, oraz z unijnej platformy internetowego rozstrzygania sporów (ODR).",
              ],
            },
            {
              heading: "14. Kontakt",
              paragraphs: [
                "Pytania dotyczące regulaminu: {termsEmail}. Usługodawca: {company}, {address}; {companyIds}. Pytania dotyczące prywatności: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Bezpieczeństwo dzieci",
      meta: {
        title: "Bezpieczeństwo dzieci – jak PetPrep chroni dzieci",
        description:
          "Jak PetPrep chroni dzieci: konta zakładane przez rodziców, logowanie kodem bez e-maila, minimum danych, bez reklam i czatu, bez śledzenia lokalizacji, zweryfikowane media.",
      },
      eyebrow: "Zaufanie",
      title: "Tworzony dla dzieci od pierwszej linijki kodu.",
      lead: "Tłumaczenie – wiążąca jest wyłącznie wersja angielska. Głównym użytkownikiem PetPrep jest dziecko, dlatego bezpieczeństwo i prywatność są zasadami produktu, a nie ustawieniami.",
      blocks: [
        {
          type: "cards",
          heading: "Nasze standardy",
          columns: 2,
          items: [
            { title: "Każde konto zakłada rodzic", text: "Dzieci nie mogą zarejestrować się same. Rodzic dodaje dziecko i generuje jednorazowy kod logowania ważny 15 minut." },
            { title: "Dzieci bez e-maila i hasła", text: "Dziecko loguje się kodem od rodzica. Błędne, wygasłe i wykorzystane kody dostają tę samą odpowiedź, więc nikt nie zgadnie, jakie dzieci istnieją w systemie." },
            { title: "Minimum danych", text: "Pseudonim i opcjonalnie rok urodzenia. Bez nazwiska, bez daty urodzenia, bez zdjęć dziecka." },
            { title: "Bez reklam, bez czatu, bez obcych", text: "Nie ma reklam ani możliwości kontaktu z innymi użytkownikami." },
            { title: "Bez śledzenia lokalizacji", text: "Spacery liczą wyłącznie kroki – z Apple Health lub Health Connect (za twoją zgodą, tylko odczyt) albo z czujnika ruchu telefonu. GPS nie jest używany." },
            { title: "Prywatne aktualizacje na żywo", text: "Aktualizacje w czasie rzeczywistym trafiają wyłącznie do dzieci, które opiekują się danym zwierzęciem, i do rodziców z tej samej rodziny." },
            { title: "Zweryfikowane media", text: "Wyświetlamy tylko obrazy i filmy stworzone dla PetPrep i sprawdzone przez nasz serwer, z naszego magazynu w UE." },
            { title: "Powiadomienia bez imienia dziecka", text: "Powiadomienia nigdy nie zawierają imienia dziecka, bo mogą się pojawić na ekranie blokady. Jako tytuł może się pojawić tylko imię zwierzęcia, jeśli zostało mu nadane." },
          ],
        },
        {
          type: "list",
          heading: "Rodzice zachowują kontrolę",
          items: [
            "Godziny ciszy na szkołę i sen, bez powiadomień.",
            "Przycisk pauzy, który natychmiast blokuje ekran dziecka.",
            "Wylogowanie dziecka ze wszystkich urządzeń naraz.",
            "Natychmiastowy eksport lub usunięcie wszystkich danych w aplikacji.",
          ],
        },
        { type: "callout", title: "Zgłoś problem", text: "Jeśli coś w PetPrep cię niepokoi, napisz do nas – odpowiemy priorytetowo.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Dostępność",
      meta: {
        title: "Dostępność – PetPrep dla każdego dziecka",
        description:
          "Jak PetPrep dostosowuje się do dzieci, którym trudno wykonywać przesunięcia, które korzystają z VoiceOver lub TalkBack albo wolą mniej ruchu – z tymi samymi zasadami i punktami dla wszystkich.",
      },
      eyebrow: "Zaufanie",
      title: "Każde dziecko może zaopiekować się swoim zwierzęciem.",
      lead: "Niektórym dzieciom trudno wykonywać przesunięcia palcem, inne korzystają z czytnika ekranu albo wolą mniej ruchu na ekranie. PetPrep dostosowuje się do nich – z tymi samymi zasadami, tymi samymi punktami i tym samym certyfikatem co u wszystkich.",
      blocks: [
        {
          type: "cards",
          heading: "W aplikacji",
          columns: 3,
          items: [
            { title: "Łatwiejsze gesty", text: "Zamiast przesuwać, dziecko przytrzymuje palec albo naciska przycisk – w każdej grze z przesuwaniem: szczotkowaniu, wędce z piórkami, wymianie żwirku i rzucaniu piłki. Rodzic włącza to dla każdego dziecka w strefie rodzica." },
            { title: "Czytniki ekranu", text: "Gdy włączony jest VoiceOver lub TalkBack, gry same przełączają się na przytrzymywanie. Nagłówek zwierzęcia odczytuje wszystko o zwierzęciu, a każdy krok w grach opiekuńczych jest osobnym przyciskiem." },
            { title: "Mniej ruchu", text: "Gdy telefon ma ustawione ograniczenie ruchu, pulsujące przyciski i kołyszące się Curio stoją w miejscu." },
          ],
        },
        {
          type: "cards",
          heading: "Z następną aktualizacją aplikacji",
          items: [
            { title: "Spacery na wózku", text: "W trybie dostosowanym pchnięcia wózka liczą się dokładnie tak jak kroki – jedno pchnięcie to jeden krok. Rodzic może też wpisać dzisiejsze minuty spaceru, więc dziecko nie musi robić nic dodatkowego. Rodzic włącza tryb dla każdego dziecka osobno, a wyłączenie usuwa oznaczenie z historii." },
          ],
        },
        { type: "callout", title: "To samo wyzwanie dla wszystkich", text: "Dostosowania zmieniają to, jak dziecko gra, nigdy to, co się liczy. Wyniki, terminy i Certyfikat odpowiedzialności działają dokładnie tak samo. Nigdy nie pytamy, dlaczego dziecko potrzebuje dostosowania.", tone: "mint" },
        { type: "callout", title: "Coś nie sprawdza się u twojego dziecka?", text: "Powiedz nam, co przeszkadza, a przyjrzymy się temu.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Usuwanie konta",
      meta: {
        title: "Usuń swoje konto i dane PetPrep",
        description:
          "Jak usunąć konto PetPrep (Data Vallis) w aplikacji lub e-mailem, jakie dane są usuwane, co jest przechowywane i jak długo.",
      },
      eyebrow: "Zaufanie",
      title: "Usuń swoje konto PetPrep",
      lead: "Tłumaczenie – wiążąca jest wyłącznie wersja angielska. PetPrep tworzy firma Data Vallis. Swoje konto i dane rodziny możesz usunąć w każdej chwili – natychmiast w aplikacji albo e-mailem, jeśli nie masz już aplikacji.",
      blocks: [
        {
          type: "steps",
          heading: "Usuń konto w aplikacji (natychmiast)",
          items: [
            { title: "Zaloguj się jako rodzic", text: "Otwórz PetPrep, stuknij „Jestem rodzicem” i zaloguj się." },
            { title: "Otwórz swoje konto", text: "Przejdź do Zarządzanie → Konto. Opcjonalnie: najpierw stuknij „Eksportuj moje dane”, aby zachować kopię." },
            { title: "Usuń", text: "Stuknij „Usuń konto”, potwierdź hasłem (albo logowaniem przez Google / Apple) i wpisz DELETE, a potem stuknij „Usuń na zawsze”." },
            { title: "Gotowe", text: "Usunięcie jest natychmiastowe i nie można go cofnąć. Wszystkie twoje urządzenia i urządzenia twoich dzieci zostają wylogowane." },
          ],
        },
        {
          type: "prose",
          heading: "Nie masz już aplikacji? Poproś o usunięcie e-mailem",
          paragraphs: [
            "Napisz na [privacy@petprep.si](mailto:privacy@petprep.si) z adresu e-mail swojego konta rodzica PetPrep, a w temacie wpisz „Usuń moje konto”. Potwierdzamy, że prośba pochodzi od właściciela konta, i usuwamy konto najpóźniej w ciągu miesiąca (zwykle w ciągu kilku dni), a potem potwierdzamy to e-mailem.",
            "Aby usunąć tylko profil jednego dziecka, zaloguj się jako rodzic i otwórz dziecko w Zarządzanie → Dzieci → Usuń profil.",
          ],
        },
        {
          type: "table",
          heading: "Co jest usuwane, a co przechowywane",
          head: ["Dane", "Co się z nimi dzieje"],
          rows: [
            ["Twoje konto rodzica (imię, e-mail, hasło, powiązanie z logowaniem przez Google / Apple)", "Usuwane natychmiast"],
            ["Jeśli jesteś jedynym rodzicem w rodzinie: profile dzieci (pseudonim, rok urodzenia), zwierzęta, obrazy i filmy AI, umowy i podpisy, dziennik opieki, Care Score, certyfikaty, liczby kroków, godziny ciszy, kody logowania", "Usuwane natychmiast"],
            ["Jeśli w rodzinie zostaje inny rodzic", "Usuwane jest tylko twoje konto; rodzina zostaje z drugim rodzicem"],
            ["Urządzenia i tokeny powiadomień", "Wylogowywane i usuwane natychmiast"],
            ["Dokumentacja zakupów (produkt, data, identyfikator transakcji w sklepie, anonimowy identyfikator zakupu – bez imienia i e-maila)", "Przechowywana tak długo, jak wymagają tego przepisy rachunkowe i podatkowe, bez powiązania z twoją rodziną"],
            ["Zapisy kosztów AI", "Przechowywane na potrzeby księgowości, bez żadnego powiązania z tobą, twoimi dziećmi ani zwierzętami"],
            ["Zaszyfrowane kopie zapasowe", "Usuwane automatycznie w ciągu 35 dni"],
          ],
          note: "Same zakupy obsługują App Store i Google Play; ich dokumentację przechowują Apple i Google zgodnie z własnymi zasadami. Kupione, ale niezakończone wyzwanie nie podlega zwrotowi przy usunięciu konta.",
        },
        { type: "callout", title: "Pytania?", text: "Napisz na privacy@petprep.si. Szczegóły znajdziesz w naszej polityce prywatności.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Encyklopedia zwierząt PetPrep – gatunki i rasy ze źródłami",
        description:
          "Psy, koty i ich rasy: czego potrzebują, komu pasują i jak PetPrep je symuluje. Wyszukuj i porównuj rasy; każda informacja prowadzi do swojego źródła.",
      },
      navLabel: "Zwierzęta",
      eyebrow: "Encyklopedia zwierząt",
      title: "Poznaj zwierzę, zanim zamieszka w domu.",
      lead:
        "Czego naprawdę potrzebuje każdy gatunek i każda rasa w PetPrep – według związków kynologicznych, felinologicznych, organizacji weterynaryjnych i badań naukowych, z odnośnikiem do każdego źródła. Do tego zasady, według których PetPrep je symuluje.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "O PetPrep – firma, założyciel i skąd bierzemy informacje o zwierzętach",
        description:
          "Kto tworzy PetPrep: Data Vallis David Tacer s.p. z Dravogradu w Słowenii, założyciel David Tacer, nasza misja oraz to, jak encyklopedia zwierząt pozyskuje i sprawdza informacje.",
      },
      navLabel: "O nas",
      eyebrow: "O nas",
      title: "Kto tworzy PetPrep.",
      lead: "PetPrep powstaje w Mariborze w Słowenii, w małej firmie programistycznej. Na tej stronie piszemy, kim jesteśmy, dlaczego tworzymy PetPrep i jak decydujemy, co aplikacja i encyklopedia zwierząt mówią o zwierzętach.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Firma",
          paragraphs: [
            "PetPrep jest produktem firmy Data Vallis David Tacer s.p., jednoosobowej działalności gospodarczej zajmującej się tworzeniem oprogramowania, z siedzibą w Dravogradzie w Słowenii. Ta sama firma prowadzi tę stronę internetową i aplikację PetPrep oraz jest administratorem danych osobowych (zob. [politykę prywatności](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Założyciel",
          paragraphs: [
            "PetPrep założył David Tacer, programista i przedsiębiorca z Mariboru w Słowenii.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Nasza misja",
          paragraphs: [
            "Każda rodzina słyszy: „Obiecuję, że będę się nim opiekować”. PetPrep zamienia tę obietnicę w dowód: przez 12 tygodni dziecko – albo dorosły, który marzy o konkretnej rasie – opiekuje się realistycznym zwierzęciem AI z codziennymi potrzebami prawdziwego zwierzęcia, a rodzic każdego dnia widzi, jak opieka się sprawdza.",
            "Porażka w symulacji to też dobry wynik: rodzina dowiaduje się prawdy, zanim ucierpi prawdziwe zwierzę i zanim zobowiąże się do lat opieki i wydatków. Gdy w domu rzeczywiście pojawi się prawdziwe zwierzę, chcemy, żeby PetPrep pozostał przydatny przez całe jego życie.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Jak powstaje encyklopedia zwierząt",
          intro: "[Encyklopedia zwierząt](page:animals) i aplikacja korzystają z tych samych danych. O tym, co mogą mówić, decydują te zasady:",
          items: [
            "Każda informacja podaje swoje źródło i odsyła do niego. Źródła oceniamy według tego, na ile można na nich polegać: A – wzorce ras, recenzowane publikacje naukowe i wytyczne stowarzyszeń weterynaryjnych; B – strony z poradami szpitali weterynaryjnych, uniwersytetów i krajowych organizacji ochrony zwierząt; C – opracowania wtórne (encyklopedie, artykuły prasowe), wykorzystywane tylko razem ze źródłem A lub B.",
            "Jako fakty pokazujemy tylko informacje ze źródłami. Wartość, której nie potwierdza żadne źródło, nie jest publikowana. Gdy źródła się różnią, pokazujemy każde z nich z jego własną wartością.",
            "Zasady gry to nie porada weterynaryjna. Gdy gra potrzebuje liczby, której źródła nie podają dokładnie (na przykład dziennego celu kroków), PetPrep ustala ją na podstawie źródeł i pokazuje tylko w części „Jak symuluje to PetPrep”, oznaczoną jako zasada gry.",
            "Informacje o zdrowiu mają wyłącznie charakter informacyjny. Streszczają to, co źródła mówią o danej rasie, i nie zostały sprawdzone przez lekarza weterynarii. W sprawie prawdziwego zwierzęcia zapytaj weterynarza.",
            "Wzorce ras streszczamy własnymi słowami, nigdy nie kopiujemy ich obszernie i nigdy nie nazywamy żadnej rasy „hipoalergiczną”.",
            "Encyklopedia jest generowana z danych badawczych PetPrep – tych samych, z których korzysta aplikacja. Gdy zmienia się źródło lub wartość, encyklopedia jest eksportowana ponownie, a strona każdej rasy pokazuje datę ostatniej aktualizacji. Jeśli zauważysz błąd, napisz na hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Pytania o PetPrep?", text: "Napisz na właściwą skrzynkę ze strony kontaktowej – rodziny, prywatność, partnerzy lub inwestorzy.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Poznaj Curio – maskotkę PetPrep",
        description:
          "Curio to maskotka PetPrep: ciekawska kosteczka z naszego logo i gwiazda naszych krótkich filmów. Kim jest, czym różni się od realistycznego zwierzęcia w aplikacji, obrazki i materiały dla mediów.",
      },
      navLabel: "Poznaj Curio",
      eyebrow: "Nasza maskotka",
      title: "Poznaj Curio.",
      lead: "Curio to ożywiona ciekawska kosteczka z logo PetPrep. W naszych krótkich filmach gra zwierzę, które czeka przy drzwiach, aż ktoś dotrzyma obietnicy. To nasza maskotka – a nie zwierzę, którym opiekujesz się w aplikacji.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskotka PetPrep: miękka grafitowa kostka z dużymi białymi oczami, małym malinowym noskiem i miętową obrożą, macha na powitanie.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Kim jest Curio?",
          paragraphs: [
            "Curio narodziło się jako znak w naszym logo: zaokrąglony grafitowy kwadrat z dwojgiem dużych oczu patrzących w górę i w prawo oraz małym malinowym noskiem. Po słoweńsku nazywamy je Radovednež – „ciekawski”. W październiku 2026 r. dostało krótkie rączki, krótkie nóżki i miętową obrożę z okrągłym identyfikatorem i stało się postacią.",
            "Curio nie ma buzi. Wszystko, co czuje, widać w jego oczach: są szeroko otwarte, gdy ktoś szepnie „spacer?”, zmieniają się w dwie senne kreski, gdy nikt jeszcze nie wrócił do domu, i w radosne łuki, gdy miska jest pełna.",
            "Curio to „ono” – ani chłopiec, ani dziewczynka, ani pies, ani kot. Symbolizuje każde zwierzę, które każdego dnia czeka, aż ktoś dotrzyma obietnicy.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio w skrócie",
          columns: 3,
          items: [
            { title: "Imię", text: "Curio po angielsku, Radovednež po słoweńsku." },
            { title: "Z czego jest", text: "Miękki grafit, miętowa obroża i malinowy identyfikator – kolory PetPrep." },
            { title: "Mówi", text: "Nigdy. Tylko oczami." },
            { title: "Uwielbia", text: "Spacery, pełną miskę i dzieci, które wracają także 15. dnia." },
            { title: "Mieszka", text: "W naszych krótkich filmach na [TikToku](https://www.tiktok.com/@petprep.si) i [Instagramie](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Zadanie", text: "Przypominać rodzinom, z przymrużeniem oka, że zwierzę potrzebuje opieki każdego dnia." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio to nie zwierzę z aplikacji",
          intro: "W naszych filmach Curio gra zwierzę, które potrzebuje opieki, bo każde zwierzę jej potrzebuje. W PetPrep dzieci – i dorośli, którzy sprawdzają rasę – opiekują się czymś znacznie bliższym rzeczywistości.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, rysunkowa maskotka, macha na jasnym tle.",
              label: "Maskotka",
              title: "Curio – nasza maskotka",
              text: "Rysunkowa postać z naszych filmów, naklejek i tej strony. Pokazuje, o co chodzi w PetPrep. Nie można jej adoptować.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Realistyczny portret labradora retrievera wygenerowany przez AI – tak wyglądają zwierzęta w aplikacji PetPrep.",
              label: "W aplikacji · obraz AI",
              tone: "mint",
              title: "Twoje zwierzę w PetPrep",
              text: "Realistyczna symulacja AI prawdziwej rasy – jak ten [labrador retriever](+breed:labrador_retriever) – z codziennymi potrzebami prawdziwego zwierzęcia: posiłki, woda, spacery liczone w prawdziwych krokach, sprzątanie i trening. Zobacz, [jak to działa](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio na obrazkach",
          intro: "Curio to stylizowana postać 3D, stworzona narzędziami AI na podstawie naszego własnego projektu. Nowe sceny pojawiają się najpierw w naszych filmach.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio macha na miętowym tle.", caption: "Cześć! Klasyczne machanie.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio stoi na białej półce i macha.", caption: "Na półce, czeka na kogoś." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio z przodu, z boku i z tyłu, z czterema wyrazami oczu.", caption: "Z każdej strony – i jak jego oczy pokazują uczucia." },
            { src: "/curio/curio-waving.webp", alt: "Curio na przezroczystym tle.", caption: "Wycięte – gotowe do twojego posta (zob. materiały dla mediów).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Materiały dla mediów",
          intro: "Dla twórców, dziennikarzy i partnerów, którzy piszą o PetPrep. Pytania lub pomysły na współpracę: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Pobierz wszystko", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, przezroczyste tło", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, kwadrat, jasne tło", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, kwadrat, miętowe tło", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Karta postaci", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Znak PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Jak korzystać z Curio",
          rules: [
            "Używaj Curio w postach, artykułach i filmach o PetPrep. W przypadku reklam, produktów lub gadżetów najpierw zapytaj nas o zgodę.",
            "Pokazuj Curio takim, jakie jest: grafitowa kostka, białe oczy, malinowy nosek, miętowa obroża. Nie dodawaj buzi, uszu, futra ani brwi, nie zmieniaj kolorów i nie rozciągaj postaci.",
            "Curio jest maskotką PetPrep. Nie przedstawiaj Curio jako zwierzęcia z aplikacji ani jako prawdziwego psa czy kota.",
            "Nie używaj Curio w sposób sugerujący, że PetPrep popiera inny produkt, sprawę lub osobę.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Pytania o Curio",
          items: [
            { q: "Czy Curio to pies, czy kot?", a: "Ani jedno, ani drugie. Curio to mała kosteczka z naszego logo. W naszych filmach gra zwierzę, ale nie należy do żadnego gatunku." },
            { q: "Czy moje dziecko może opiekować się Curio w aplikacji?", a: "Nie. W aplikacji twoja rodzina opiekuje się realistycznym zwierzęciem prawdziwej rasy, z takimi samymi codziennymi potrzebami jak prawdziwe zwierzę. Curio pojawia się tylko w naszych filmach i na stronie internetowej." },
            { q: "Dlaczego Curio nie ma buzi?", a: "Bo nasze logo też jej nie ma. Curio mówi wszystko oczami – i nigdy nie żebrze na głos o smakołyki." },
            { q: "Gdzie mogę zobaczyć nowe filmy z Curio?", a: "Na TikToku i Instagramie, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Wiedza o opiece – co mogą jeść psy i koty, ze źródłami | PetPrep",
        description:
          "Które produkty są dla psów i kotów toksyczne, które ryzykowne, a które bezpieczne – dlaczego, jakie są objawy i co robić, z odnośnikiem do każdego źródła. Od PetPrep dla rodzin, które przygotowują się na zwierzę.",
      },
      navLabel: "Opieka",
      eyebrow: "Wiedza o opiece",
      title: "Co jest bezpieczne dla twojego zwierzęcia?",
      lead:
        "Jasne odpowiedzi ze źródłami dla rodzin: które produkty są toksyczne, które ryzykowne, a które w porządku jako smakołyk – dla psów i kotów, a wkrótce także dla innych gatunków. Przy każdej odpowiedzi znajdziesz odnośniki do źródeł.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Darmowe kolorowanki z psami i kotami do druku dla dzieci | PetPrep",
        description:
          "Darmowe kolorowanki do wydruku: golden retriever, labrador, border collie, szczeniak mieszaniec, kocię i Curio. Pliki PDF w formatach A4 i US Letter, na każdej prawdziwa ciekawostka o opiece nad zwierzęciem ze źródłem.",
      },
      navLabel: "Kolorowanki",
      eyebrow: "Kolorowanki",
      title: "Darmowe kolorowanki do druku.",
      lead:
        "Psy, koty i Curio do kolorowania lub odrysowywania – wydrukuj jedną stronę albo całą książeczkę. Na każdej stronie jest prawdziwa ciekawostka o opiece nad zwierzęciem ze źródła weterynaryjnego lub kynologicznego, do wspólnego przeczytania.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Dla dzieci, które marzą o zwierzęciu – kolorowanki, Curio i #walkyourpet | PetPrep",
        description:
          "Wszystko, co PetPrep ma dla dzieci: darmowe kolorowanki do druku z prawdziwymi ciekawostkami o opiece nad zwierzętami, maskotka Curio i #walkyourpet – dla dzieci i rodziców, którzy razem przygotowują się na zwierzę.",
      },
      navLabel: "Dla dzieci",
      eyebrow: "Dla dzieci",
      title: "Dla dzieci, które marzą o zwierzęciu.",
      lead: "Kolorowanki do druku, Curio i #walkyourpet – dla dzieci i rodziców, którzy razem przygotowują się na zwierzę.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, maskotka PetPrep: miękka grafitowa kostka z dużymi białymi oczami, małym malinowym noskiem i miętową obrożą, macha na powitanie.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – ruch, który zaczął się od prawdziwego dziecka",
        description:
          "„Moglibyśmy pójść walk your pet”. Powiedziało to dziecko, a dziś to ruch: rodziny wychodzą na dwór, bo zwierzę potrzebuje spaceru. Jak to się zaczęło, co to znaczy w PetPrep i jak dołączyć.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Nie my wymyśliliśmy to hasło. Wymyśliło je dziecko. Dziś to zaproszenie dla każdej rodziny: wyjdźcie na dwór, bo zwierzę potrzebuje spaceru – prawdziwe albo to, z którym ćwiczycie w PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Karta relacji: „Podsłuchane w domu założyciela”. Dziecko mówi „Lahko bi šli walk your pet” – „Moglibyśmy pójść walk your pet” – a tytuł brzmi „#walkyourpet już się przyjęło”.", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Jak to się zaczęło",
          paragraphs: [
            "W październiku 2026 r. dzieci naszego założyciela miały w odwiedzinach koleżankę. Zastanawiały się, czy wyjść na dwór, a ona powiedziała, pół po słoweńsku, pół po angielsku: „Lahko bi šli walk your pet” – „Moglibyśmy pójść walk your pet”.",
            "Nikt jej o to nie prosił. Znała PetPrep, gdzie spacer z psem liczy się tylko wtedy, gdy naprawdę wyjdziesz na dwór, i „walk your pet” po prostu stało się powodem, żeby wyjść. Tak nam się to spodobało, że je zostawiliśmy – po angielsku, w każdym języku.",
            "Prawdziwa rozmowa. Prawdziwe dzieci.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Co to znaczy w PetPrep",
          intro: "W PetPrep codzienny spacer z psem to prawdziwe kroki twojego dziecka, odczytywane z Apple Health lub Health Connect, jeśli na to pozwolisz. Siedzenie na kanapie się nie liczy, więc „walk your pet” zawsze oznacza wyjście na dwór. Bez GPS i bez lokalizacji – tylko kroki.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Dołącz do ruchu",
          intro: "Nie potrzebujesz do tego aplikacji. Każda rodzina, która wychodzi na dwór dla zwierzęcia – prawdziwego albo ćwiczebnego – jest jego częścią.",
          items: [
            { title: "Wyjdź na dwór", text: "Idź z psem na spacer. A jeśli dopiero myślisz o zwierzaku, wyjdź na taki spacer, na jaki poszlibyście razem z nim." },
            { title: "Uwiecznij chwilę", text: "Buty przy drzwiach, smycz, ścieżka, łapy na trawie. Bez twarzy, bez imion." },
            { title: "Podziel się", text: "Opublikuj zdjęcie z #walkyourpet i oznacz @petprep.si na Instagramie lub TikToku. Za twoją zgodą możemy pokazać najlepsze chwile tutaj i na naszych profilach." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Bezpieczne udostępnianie",
          intro: "#walkyourpet dotyczy dzieci, dlatego te zasady obowiązują przy wszystkim, co udostępniamy:",
          items: [
            "Publikują rodzice, nie dzieci. Tylko rodzic decyduje, co trafia do sieci.",
            "Żadnych twarzy dzieci, imion, szkół ani adresów – i nigdy dziecka z innej rodziny.",
            "Udostępniamy dalej tylko za zgodą rodzica i usuwamy post, kiedy tylko o to poprosisz.",
            "Cytaty dzieci są zawsze prawdziwe. Nigdy nie wymyślamy ani nie „poprawiamy” tego, co powiedziało dziecko.",
            "To zaproszenie, nie obowiązek. Żadnych serii do podtrzymywania, żadnej presji – po prostu dobry powód, żeby wyjść.",
          ],
        },
        {
          type: "callout",
          title: "Pierwsza chwila jest nasza. Następna może być twoja.",
          text: "Podziel się spacerem swojej rodziny z #walkyourpet i oznacz @petprep.si. Pytania lub historia, którą chcesz opowiedzieć: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Pytania",
          items: [
            { q: "Czy potrzebuję PetPrep, żeby dołączyć?", a: "Nie. Każdy, kto wychodzi na dwór dla zwierzęcia, może używać #walkyourpet. W PetPrep to hasło się narodziło i tam spacer z psem do ćwiczeń liczy się wyłącznie w prawdziwych krokach." },
            { q: "Czy w PetPrep działa to też z kotami?", a: "Nie jako spacer. Koty nie chodzą na spacery, więc w PetPrep potrzeby kota zaspokaja się zabawą, a nie krokami. Spacery są dla psów." },
            { q: "Dlaczego hasło jest po angielsku?", a: "Bo tak powiedziało je dziecko – po angielsku, w środku słoweńskiego zdania. Dzieci na całym świecie wtrącają angielskie słowa, więc hasło zostaje takie samo w każdym języku." },
            { q: "Czy pokażecie moje dziecko w internecie?", a: "Tylko to, co udostępnisz samodzielnie i pozwolisz nam udostępnić dalej, i nigdy twarzy ani imienia dziecka. Napisz do nas na hello@petprep.si, a usuniemy post." },
          ],
        },
      ],
    },
  },
};

export default pl;
