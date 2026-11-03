import type { InvestorsCopy } from "./types";

const hr: InvestorsCopy = {
  meta: {
    title: "PetPrep za ulagače: jedan osnivač i sadržajni motor za proizvod na 15 godina",
    description:
      "PetPrep djetetu omogućuje da u 12-tjednoj realističnoj simulaciji dokaže da je spremno za kućnog ljubimca, a obitelj prati cijeli život ljubimca. Brojke uživo, karta prihoda i upute kako zatražiti sažetak za ulagače.",
  },
  eyebrow: "Za ulagače",
  title: "Jedan osnivač i sadržajni motor za proizvod koji obitelji koriste 15 godina.",
  seriesTitle: "„12 Weeks“",
  lead: "PetPrep djetetu omogućuje da u 12-tjednoj realističnoj simulaciji dokaže da je spremno za kućnog ljubimca – i prati obitelj cijeli život ljubimca. Sve oko toga, od naše serije do biblioteke o brizi za ljubimce u kojoj svaka činjenica ima izvor, postoji zato da obitelji privučemo gotovo bez troška.",
  watch: "Pogledaj „12 Weeks“ na YouTubeu",
  brief: "Zatraži sažetak za ulagače",
  heroStats: {
    breeds: "pasmina pasa i mačaka s pravilima brige potkrijepljenima izvorima",
    sources: "izvora veterinara i kinoloških saveza",
    episodes: "epizoda naše obiteljske komedije „12 Weeks“",
  },
  opportunity: {
    eyebrow: "Prilika",
    title: "Od 12-tjednog izazova do odnosa koji traje 10 do 15 godina.",
    items: [
      { tag: "Problem", text: "Djeca obećavaju da će se brinuti za ljubimca, a roditelji nemaju neutralan način da to provjere prije nego što se obvežu novcem i godinama brige." },
      { tag: "Rješenje", text: "Realistična 12-tjedna simulacija s roditeljskom nadzornom pločom uživo i objektivnim Care Scoreom, koja završava Certifikatom o odgovornosti." },
      { tag: "Proširenje", text: "Kad pravi ljubimac stigne kući, PetPrep mu postaje AI pomoćnik: podaci s ogrlice, prvi kontakt s veterinarom putem AI-ja, rast i prehrana, DNK testovi, partnerske usluge." },
    ],
  },
  flywheel: {
    eyebrow: "Zamašnjak",
    title: "Sadržaj dovodi obitelji. Pravi ljubimci ih zadržavaju godinama.",
    lead: "Svaki sadržaj korak je u istom krugu, a ne sporedni projekt.",
    steps: [
      { title: "Sadržajni motor", text: "Serija, Curio, bojanke i biblioteka o brizi – sve to stvara jedan osnivač uz AI agente." },
      { title: "Obitelji pronalaze PetPrep", text: "Putem tražilica, društvenih mreža i #walkyourpet – umjesto plaćenih oglasa." },
      { title: "12-tjedni izazov", text: "Prvi prihod: 49,99 € po ljubimcu, jednokratno.", highlight: true },
      { title: "Pravi ljubimac dolazi kući", text: "PetPrep postaje obiteljski AI pomoćnik za brigu o ljubimcu na 10 do 15 godina." },
      { title: "Dugoročni partneri", text: "Osiguranje, veterinari, hrana i DNK testovi – ponude prilagođene obiteljskom ljubimcu koje roditelji sami odluče pogledati." },
      { title: "Prihodi financiraju još sadržaja", text: "Sponzori i prihodi druge faze plaćaju sljedeću sezonu – i krug se ponovno zavrti." },
    ],
  },
  engine: {
    eyebrow: "Sadržajni motor · brojke uživo",
    title: "Što smo dosad izgradili",
    lead: "Svaka brojka u nastavku sama se ažurira iz našeg registra, baze znanja i kanala.",
    updated: "Automatski ažurirano iz našeg registra, baze znanja i kanala.",
    cards: {
      breeds: { label: "Pasmina u registru", note: (dogs, cats) => `${dogs} pasmina pasa i ${cats} pasmina mačaka, nove dodajemo svake noći` },
      sources: { label: "Izvora", note: "Veterinari, kinološki savezi i studije, s citatima" },
      episodes: { label: "Epizoda „12 Weeks“", note: (views) => (views ? `${views} pregleda na YouTubeu` : "Na YouTubeu") },
      coloring: { label: "Besplatnih bojanki", note: "Za ispis, A4 i US Letter" },
      curio: { value: "Pilot", label: "Animirana serija Curio", note: "Pilot epizoda objavljena je na YouTubeu i TikToku" },
      foods: { label: "Objašnjenih namirnica", note: "Biblioteka o brizi, svake noći nove namirnice" },
      languages: { label: "Jezika", note: "Web-stranica i biblioteka o brizi" },
      vets: { label: "Zemalja s popisom veterinara", note: "Hitna veterinarska pomoć po zemljama" },
    },
    status: { live: "Uživo", building: "U izradi", planned: "Planirano" },
    media: {
      playlist: "„12 Weeks“ – serija",
      channel: "YouTube kanal @petprep-si →",
      play: "Pokreni",
      all: "Sve epizode (popis za reprodukciju)",
      episode: (n) => `Epizoda ${n}`,
      consent: "Reproducira se s YouTubea (youtube-nocookie.com) – dok ne klikneš, ništa se ne učitava.",
      more: "Još za gledanje",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilot naše tihe obiteljske komedije" },
      curioAll: "Curio – sve epizode",
      promo: { title: "PetPrep u 60 sekundi", text: "Je li tvoje dijete spremno za pravog ljubimca?" },
      curio: { title: "Upoznaj Curija", text: "Naša maskota i njegovi kratki videozapisi" },
      coloring: { title: "Bojanke", text: "Besplatne za ispis, svaka s provjerenom činjenicom o brizi za ljubimca" },
      walkthrough: { title: "Kako aplikacija funkcionira", text: "12-tjedni izazov, korak po korak" },
    },
    closing: "Sve to stvara jedan osnivač uz AI agente, bez produkcijskog tima i agencije. Svaki sadržaj vodi natrag u aplikaciju.",
  },
  built: {
    eyebrow: "Što je već izgrađeno",
    title: "Pravi proizvod, a ne prototip",
    items: [
      "Igraći mehanizam na poslužitelju sa sinkronizacijom u stvarnom vremenu, testiran na simulacijama cijelih dana, na danima prelaska na ljetno računanje vremena i na rubnim slučajevima obitelji.",
      "Obitelji s više roditelja, više djece i zajedničkim ljubimcima, uz pošteno zasebno ocjenjivanje svakog djeteta.",
      "Fotorealistični AI ljubimci s izmjerenim i ograničenim troškovima AI-ja, a mediji su na unajmljenim poslužiteljima u Njemačkoj (Hetzner, EU).",
      "Potrebe ljubimaca temelje se na navedenim izvorima veterinara i kinoloških saveza, a svaki se podatak može pratiti do izvora.",
      "Sigurnost djece od samog početka: prijava PIN-om bez e-pošte, najmanje moguće podataka, bez oglasa, samo provjereni mediji.",
      "Pristupačna igra: lakši pokreti, čitači zaslona, guranje invalidskih kolica računa se kao šetnja.",
    ],
  },
  revenue: {
    eyebrow: "Karta prihoda",
    title: "Prva faza plaća privlačenje obitelji. Druga faza je posao.",
    phases: [
      {
        tag: "1. faza · Prije ljubimca",
        name: "Plaća privlačenje obitelji",
        items: [
          { name: "12-tjedni izazov", price: "49,99 € po ljubimcu, jednokratno", status: "live", label: "Izrađeno" },
          { name: "Želje (stvari za ljubimca)", price: "2,99–15,99 €, samo izgled", status: "live", label: "Izrađeno" },
          { name: "Sponzorstvo serije", price: "Sezonski paketi", status: "building", label: "U tijeku" },
          { name: "Trgovina: bojanke, plišani Curio, slagalice", price: "Fizički i digitalni proizvodi", status: "planned", label: "Planirano" },
        ],
      },
      {
        tag: "2. faza · S pravim ljubimcem",
        name: "Posao",
        items: [
          { name: "AI pomoćnik za brigu o ljubimcu", price: "Pretplata od 3,99 € mjesečno + dokupi", status: "planned", label: "Planirano" },
          { name: "Partneri za osiguranje ljubimaca", price: "Ponude koje roditelji sami odluče pogledati, naknada po preporuci", status: "planned", label: "Planirano" },
          { name: "Mreža partnerskih veterinara", price: "Rezervacije i konzultacije na daljinu", status: "planned", label: "Planirano" },
          { name: "DNK testovi i partnerske trgovine za kućne ljubimce", price: "Partnerska provizija, kasnije vlastiti set", status: "planned", label: "Planirano" },
        ],
      },
      {
        tag: "Brend",
        name: "Curio i serija",
        items: [
          { name: "Animirana serija Curio", price: "Sponzori sezona", status: "live", label: "Pilot objavljen" },
          { name: "#walkyourpet", price: "Pokret koji hrani sve kanale", status: "live", label: "Uživo" },
        ],
      },
    ],
    retention: "Obitelj koja nakon izazova udomi ljubimca ostaje uz PetPrep 10 do 15 godina, koliko ljubimac živi, a ne samo 12 tjedana.",
    stageTag: "Faza razvoja",
    stage: "Prije lansiranja, zatvorena beta na iOS-u i Androidu. Slijedi lansiranje u App Storeu i Google Playu.",
  },
  team: {
    eyebrow: "Tim",
    title: "Učinak studija. Trošak jedne osobe.",
    founderName: "David Tacer, osnivač i izvršni direktor.",
    founder: "12 godina vodi vlastitu softversku tvrtku (više od 400 projekata), osnivač je CHERR.IO-a (pobjednik FutureHacka, Davos 2018). PetPrep razvija s punim radnim vremenom, uz tim AI agenata za programiranje i sadržaj.",
    points: [
      "Svaka činjenica ima izvor i citat, a provjerava je neovisni recenzent.",
      "Podaci obitelji ostaju u EU-u, djeca se prijavljuju bez e-pošte, u aplikaciji nema oglasa.",
      "Noćni procesi istražuju, provjeravaju i objavljuju nove pasmine i stranice o brizi.",
    ],
  },
  webSummit: {
    title: "Nađimo se na Web Summitu u Lisabonu",
    text: "9. – 12. studenoga 2026. Sažetak, prezentaciju, podatkovnu sobu i pristup beti dijelimo na zahtjev.",
    watch: "Pogledaj seriju",
  },
  contactTitle: "Javi nam se",
};

export default hr;
