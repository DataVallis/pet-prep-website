import type { InvestorsCopy } from "./types";

const sl: InvestorsCopy = {
  meta: {
    title: "PetPrep za vlagatelje: en ustanovitelj in vsebinski motor za izdelek za 15 let",
    description:
      "PetPrep otroku omogoča, da v 12-tedenski realistični simulaciji dokaže, da je pripravljen na hišnega ljubljenčka, družino pa spremlja vse življenje ljubljenčka. Številke v živo, zemljevid prihodkov in navodila, kako zaprositi za povzetek za vlagatelje.",
  },
  eyebrow: "Za vlagatelje",
  title: "En ustanovitelj in vsebinski motor za izdelek, ki ga družine uporabljajo 15 let.",
  seriesTitle: "„12 Weeks“",
  lead: "PetPrep otroku omogoča, da v 12-tedenski realistični simulaciji dokaže, da je pripravljen na hišnega ljubljenčka – in družino spremlja vse življenje ljubljenčka. Vse okoli tega, od naše serije do knjižnice o skrbi za hišne ljubljenčke, v kateri ima vsako dejstvo vir, obstaja zato, da družine pripeljemo k sebi skoraj brez stroškov.",
  watch: "Oglejte si „12 Weeks“ na YouTubu",
  brief: "Zahtevajte povzetek za vlagatelje",
  heroStats: {
    breeds: "pasem psov in mačk s pravili skrbi, podprtimi z viri",
    sources: "virov veterinarjev in kinoloških zvez",
    episodes: "epizod naše družinske komedije „12 Weeks“",
  },
  opportunity: {
    eyebrow: "Priložnost",
    title: "Od 12-tedenskega izziva do 10–15-letnega odnosa.",
    items: [
      { tag: "Težava", text: "Otroci obljubljajo, da bodo skrbeli za ljubljenčka, starši pa nimajo nevtralnega načina, da to preizkusijo, preden se zavežejo k stroškom in letom skrbi." },
      { tag: "Rešitev", text: "Realistična 12-tedenska simulacija z nadzorno ploščo za starše v živo in objektivnim Care Score, ki se konča s Certifikatom odgovornosti." },
      { tag: "Širitev", text: "Ko pravi ljubljenček pride domov, mu PetPrep postane AI pomočnik: podatki z ovratnice, prvi stik z veterinarjem prek AI, rast in prehrana, DNK-testi, partnerske storitve." },
    ],
  },
  flywheel: {
    eyebrow: "Zamašnjak",
    title: "Vsebina pripelje družine. Pravi ljubljenčki jih obdržijo za leta.",
    lead: "Vsaka vsebina je korak v istem krogu, ne stranski projekt.",
    steps: [
      { title: "Vsebinski motor", text: "Serija, Curio, pobarvanke in knjižnica o skrbi – vse to ustvarja en ustanovitelj z AI agenti." },
      { title: "Družine najdejo PetPrep", text: "Prek iskalnikov, družbenih omrežij in #walkyourpet – namesto plačanih oglasov." },
      { title: "12-tedenski izziv", text: "Prvi prihodek: 49,99 € na ljubljenčka, enkratno.", highlight: true },
      { title: "Pravi ljubljenček pride domov", text: "PetPrep postane družinski AI pomočnik za skrb za ljubljenčka za 10–15 let." },
      { title: "Dolgoročni partnerji", text: "Zavarovalnice, veterinarji, hrana in DNK-testi – ponudbe, prilagojene družinskemu ljubljenčku, ki si jih starši sami izberejo ogledati." },
      { title: "Prihodki financirajo več vsebine", text: "Sponzorji in prihodki druge faze plačajo naslednjo sezono – in krog se zavrti znova." },
    ],
  },
  engine: {
    eyebrow: "Vsebinski motor · številke v živo",
    title: "Kaj smo doslej zgradili",
    lead: "Vsaka spodnja številka se posodablja sama iz našega registra, baze znanja in kanalov.",
    updated: "Samodejno posodobljeno iz našega registra, baze znanja in kanalov.",
    cards: {
      breeds: { label: "Pasem v registru", note: (dogs, cats) => `${dogs} pasem psov in ${cats} pasem mačk, nove dodajamo vsako noč` },
      sources: { label: "Virov", note: "Veterinarji, kinološke zveze in študije, s citati" },
      episodes: { label: "Epizod „12 Weeks“", note: (views) => (views ? `${views} ogledov na YouTubu` : "Na YouTubu") },
      coloring: { label: "Brezplačnih pobarvank", note: "Za tiskanje, A4 in US Letter" },
      curio: { value: "Pilot", label: "Animirana serija Curio", note: "Pilotna epizoda je na YouTubu in TikToku" },
      foods: { label: "Razloženih živil", note: "Knjižnica o skrbi, vsako noč nova živila" },
      languages: { label: "Jezikov", note: "Spletna stran in knjižnica o skrbi" },
      vets: { label: "Držav z imenikom veterinarjev", note: "Nujna veterinarska pomoč po državah" },
    },
    status: { live: "V živo", building: "V izdelavi", planned: "Načrtovano" },
    media: {
      playlist: "„12 Weeks“ – serija",
      channel: "Kanal @petprep-si na YouTubu →",
      play: "Predvajaj",
      all: "Vse epizode (seznam predvajanja)",
      episode: (n) => `Epizoda ${n}`,
      consent: "Predvaja se z YouTuba (youtube-nocookie.com) – dokler ne kliknete, se nič ne naloži.",
      more: "Še več za ogled",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilot naše tihe družinske komedije" },
      curioAll: "Curio – vse epizode",
      promo: { title: "PetPrep v 60 sekundah", text: "Je vaš otrok pripravljen na pravega ljubljenčka?" },
      curio: { title: "Spoznajte Curia", text: "Naša maskota in njeni kratki videi" },
      coloring: { title: "Pobarvanke", text: "Brezplačne za tiskanje, vsaka z dejstvom o skrbi za ljubljenčka z virom" },
      walkthrough: { title: "Kako deluje aplikacija", text: "12-tedenski izziv, korak za korakom" },
    },
    closing: "Vse to ustvarja en ustanovitelj z AI agenti, brez produkcijske ekipe ali agencije. Vsaka vsebina vodi nazaj v aplikacijo.",
  },
  built: {
    eyebrow: "Kaj je že narejeno",
    title: "Pravi izdelek, ne prototip",
    items: [
      "Igralni pogon na strežniku s sinhronizacijo v realnem času, preizkušen na simulacijah celih dni, na dneh prehoda na poletni čas in na posebnih primerih družin.",
      "Družine z več starši, več otroki in skupnimi ljubljenčki, s pošteno oceno za vsakega otroka posebej.",
      "Fotorealistični AI ljubljenčki z izmerjenimi in omejenimi stroški AI, mediji pa na najetih strežnikih v Nemčiji (Hetzner, EU).",
      "Potrebe ljubljenčkov temeljijo na navedenih virih veterinarjev in kinoloških zvez, vsako številko pa je mogoče izslediti do vira.",
      "Varnost otrok že v zasnovi: prijava s kodo PIN brez e-pošte, najmanj podatkov, brez oglasov, samo preverjeni mediji.",
      "Dostopna igra: lažje kretnje, bralniki zaslona, potiskanje invalidskega vozička se šteje kot sprehod.",
    ],
  },
  revenue: {
    eyebrow: "Zemljevid prihodkov",
    title: "Prva faza plača pridobivanje družin. Druga faza je posel.",
    phases: [
      {
        tag: "Faza 1 · Pred ljubljenčkom",
        name: "Plača pridobivanje družin",
        items: [
          { name: "12-tedenski izziv", price: "49,99 € na ljubljenčka, enkratno", status: "live", label: "Zgrajeno" },
          { name: "Želje (stvari za ljubljenčka)", price: "2,99–15,99 €, samo videz", status: "live", label: "Zgrajeno" },
          { name: "Sponzorstvo serije", price: "Sezonski paketi", status: "building", label: "V delu" },
          { name: "Trgovina: pobarvanke, plišasti Curio, sestavljanke", price: "Fizični in digitalni izdelki", status: "planned", label: "Načrtovano" },
        ],
      },
      {
        tag: "Faza 2 · S pravim ljubljenčkom",
        name: "Posel",
        items: [
          { name: "AI pomočnik za skrb za ljubljenčka", price: "Naročnina od 3,99 € na mesec + dokupi", status: "planned", label: "Načrtovano" },
          { name: "Partnerji za zavarovanje ljubljenčkov", price: "Ponudbe, ki si jih starši sami izberejo ogledati, plačilo za vsako napotitev", status: "planned", label: "Načrtovano" },
          { name: "Mreža partnerskih veterinarjev", price: "Rezervacije in posvetovanja na daljavo", status: "planned", label: "Načrtovano" },
          { name: "DNK-testi in partnerske trgovine za male živali", price: "Partnerska provizija, pozneje lasten komplet", status: "planned", label: "Načrtovano" },
        ],
      },
      {
        tag: "Blagovna znamka",
        name: "Curio in serija",
        items: [
          { name: "Animirana serija Curio", price: "Sponzorji sezon", status: "live", label: "Pilot objavljen" },
          { name: "#walkyourpet", price: "Gibanje, ki hrani vse kanale", status: "live", label: "V živo" },
        ],
      },
    ],
    retention: "Družina, ki po izzivu posvoji ljubljenčka, ostane pri PetPrepu 10–15 let, kolikor živi ljubljenček, ne le 12 tednov.",
    stageTag: "Faza razvoja",
    stage: "Pred lansiranjem, zaprta beta na iOS in Androidu. Sledi lansiranje v App Store in Google Play.",
  },
  team: {
    eyebrow: "Ekipa",
    title: "Učinek studia. Strošek enega človeka.",
    founderName: "David Tacer, ustanovitelj in generalni direktor.",
    founder: "Že 12 let vodi lastno podjetje za razvoj programske opreme (več kot 400 projektov), je ustanovitelj CHERR.IO (zmagovalec FutureHack, Davos 2018). PetPrep razvija s polnim delovnim časom, z ekipo AI agentov za programiranje in vsebino.",
    points: [
      "Vsako dejstvo ima vir in citat, preveri pa ga neodvisen pregledovalec.",
      "Podatki družin ostajajo v EU, otroci se prijavljajo brez e-pošte, v aplikaciji ni oglasov.",
      "Nočni procesi raziščejo, preverijo in objavijo nove pasme in strani o skrbi.",
    ],
  },
  webSummit: {
    title: "Srečajmo se na Web Summitu v Lisboni",
    text: "9.–12. novembra 2026. Povzetek, predstavitev, podatkovno sobo in dostop do bete delimo na zahtevo.",
    watch: "Oglejte si serijo",
  },
  contactTitle: "Stopite v stik",
};

export default sl;
