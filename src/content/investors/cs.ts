import type { InvestorsCopy } from "./types";

const cs: InvestorsCopy = {
  meta: {
    title: "PetPrep pro investory: jeden zakladatel a obsahový motor pro produkt na 15 let",
    description:
      "V PetPrepu dítě ve 12týdenní realistické simulaci dokazuje, že je připravené na domácí zvíře, a aplikace rodinu provází po celý život zvířete. Čísla v reálném čase, mapa příjmů a jak požádat o investorský přehled.",
  },
  eyebrow: "Pro investory",
  title: "Jeden zakladatel a obsahový motor pro produkt, který rodiny používají 15 let.",
  seriesTitle: "„12 Weeks“",
  lead: "V PetPrepu dítě ve 12týdenní realistické simulaci dokazuje, že je připravené na domácí zvíře – a aplikace rodinu provází po celý život zvířete. Všechno kolem ní, od našeho seriálu po knihovnu péče, ve které má každý fakt svůj zdroj, slouží k tomu, aby k nám rodiny přicházely téměř zadarmo.",
  watch: "Podívejte se na „12 Weeks“ na YouTube",
  brief: "Požádat o investorský přehled",
  heroStats: {
    breeds: "plemen psů a koček s pravidly péče podloženými zdroji",
    sources: "veterinárních zdrojů a zdrojů kynologických a felinologických svazů",
    episodes: "dílů naší rodinné komedie „12 Weeks“",
  },
  opportunity: {
    eyebrow: "Příležitost",
    title: "Od 12týdenní výzvy ke vztahu na 10 až 15 let.",
    items: [
      { tag: "Problém", text: "Děti slibují, že se o zvíře postarají, ale rodiče nemají žádný neutrální způsob, jak to ověřit dřív, než se zavážou penězi a lety péče." },
      { tag: "Řešení", text: "Realistická 12týdenní simulace s přehledem pro rodiče v reálném čase a objektivním Care Score, která končí Certifikátem odpovědnosti." },
      { tag: "Rozšíření", text: "Když si rodina přivede skutečné zvíře domů, stane se PetPrep jeho AI asistentem: data z obojku, první kontakt s veterinářem přes AI, růst a výživa, DNA testy a služby partnerů." },
    ],
  },
  flywheel: {
    eyebrow: "Setrvačník",
    title: "Obsah přivádí rodiny. Skutečná zvířata je u nás udrží na roky.",
    lead: "Každý obsah je krokem ve stejném kruhu, ne vedlejším projektem.",
    steps: [
      { title: "Obsahový motor", text: "Seriál, Curio, omalovánky a knihovna péče – vytváří je jeden zakladatel s AI agenty." },
      { title: "Rodiny objeví PetPrep", text: "Přes vyhledávání, sociální sítě a #walkyourpet – místo placené reklamy." },
      { title: "12týdenní výzva", text: "První příjem: 49,99 € za zvíře, jednorázově.", highlight: true },
      { title: "Domů přijde skutečné zvíře", text: "PetPrep se na 10 až 15 let stane AI asistentem rodiny pro péči o zvíře." },
      { title: "Partneři na dlouhá léta", text: "Pojištění, veterináři, krmivo a DNA testy – nabídky šité na míru zvířeti z rodiny, které se rodiče sami rozhodnou zobrazit." },
      { title: "Příjmy financují další obsah", text: "Sponzoři a příjmy z druhé fáze zaplatí další sezonu – a kruh se roztočí znovu." },
    ],
  },
  engine: {
    eyebrow: "Obsahový motor · čísla v reálném čase",
    title: "Co jsme dosud vytvořili",
    lead: "Každé číslo níže se samo aktualizuje z našeho registru, znalostní báze a kanálů.",
    updated: "Automaticky aktualizováno z našeho registru, znalostní báze a kanálů.",
    cards: {
      breeds: { label: "Plemen v registru", note: (dogs, cats) => `${dogs} plemen psů a ${cats} plemen koček, každou noc přibývají další` },
      sources: { label: "Zdrojů", note: "Veterináři, svazy chovatelů a studie, s citacemi" },
      episodes: { label: "Dílů „12 Weeks“", note: (views) => (views ? `${views} zhlédnutí na YouTube` : "Na YouTube") },
      coloring: { label: "Omalovánek zdarma", note: "K vytisknutí, A4 a US Letter" },
      curio: { value: "Pilot", label: "Animovaný seriál Curio", note: "Pilotní díl je na YouTube a TikToku" },
      foods: { label: "Vysvětlených potravin", note: "Knihovna péče, každou noc nové potraviny" },
      languages: { label: "Jazyků", note: "Web a knihovna péče" },
      vets: { label: "Zemí s adresářem veterinářů", note: "Pohotovostní veterináři podle zemí" },
    },
    status: { live: "V provozu", building: "Ve výstavbě", planned: "Plánováno" },
    media: {
      playlist: "„12 Weeks“ – seriál",
      channel: "Kanál @petprep-si na YouTube →",
      play: "Přehrát",
      all: "Všechny díly (seznam videí)",
      episode: (n) => `Díl ${n}`,
      consent: "Přehrává se z YouTube (youtube-nocookie.com) – dokud nekliknete, nic se nenačte.",
      more: "Další videa",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilot naší němé rodinné komedie" },
      curioAll: "Curio – všechny díly",
      promo: { title: "PetPrep za 60 sekund", text: "Je vaše dítě připravené na skutečné zvíře?" },
      curio: { title: "Seznamte se s Curiem", text: "Náš maskot a jeho krátká videa" },
      coloring: { title: "Omalovánky", text: "Zdarma k vytisknutí, každá s faktem o péči o zvířata a jeho zdrojem" },
      walkthrough: { title: "Jak aplikace funguje", text: "12týdenní výzva krok za krokem" },
    },
    closing: "To všechno vytváří jeden zakladatel s AI agenty, bez produkčního týmu a bez agentury. Každý obsah vede zpět do aplikace.",
  },
  built: {
    eyebrow: "Co už stojí",
    title: "Skutečný produkt, žádný prototyp",
    items: [
      "Herní jádro na serveru se synchronizací v reálném čase, otestované na simulacích celých dnů, na dnech změny času a na výjimečných rodinných situacích.",
      "Rodiny s více rodiči, více dětmi a společnými zvířaty a s férovým hodnocením každého dítěte zvlášť.",
      "Fotorealistická AI zvířata s naměřenými a omezenými náklady na AI a média na pronajatých serverech v Německu (Hetzner, EU).",
      "Potřeby zvířat vycházejí z citovaných zdrojů veterinářů a kynologických a felinologických svazů a každé číslo lze dohledat až k jeho zdroji.",
      "Bezpečnost dětí od základu: přihlášení kódem PIN bez e-mailu, minimum údajů, žádné reklamy, jen ověřená média.",
      "Přístupná hra: jednodušší gesta, čtečky obrazovky a tlačení invalidního vozíku se počítá jako procházka.",
    ],
  },
  revenue: {
    eyebrow: "Mapa příjmů",
    title: "První fáze platí získávání rodin. Druhá fáze je byznys.",
    phases: [
      {
        tag: "Fáze 1 · Před zvířetem",
        name: "Platí získávání rodin",
        items: [
          { name: "12týdenní výzva", price: "49,99 € za zvíře, jednorázově", status: "live", label: "Hotovo" },
          { name: "Přání (věci pro zvíře)", price: "2,99–15,99 €, jen vzhled", status: "live", label: "Hotovo" },
          { name: "Sponzoring seriálu", price: "Balíčky na sezonu", status: "building", label: "Rozpracováno" },
          { name: "Obchod: omalovánky, plyšový Curio, puzzle", price: "Fyzické i digitální", status: "planned", label: "Plánováno" },
        ],
      },
      {
        tag: "Fáze 2 · Se skutečným zvířetem",
        name: "Byznys",
        items: [
          { name: "AI asistent pro péči o zvíře", price: "Předplatné od 3,99 € měsíčně + dobití", status: "planned", label: "Plánováno" },
          { name: "Partneři pro pojištění zvířat", price: "Nabídky, které se rodiče sami rozhodnou zobrazit, odměna za každé doporučení", status: "planned", label: "Plánováno" },
          { name: "Síť partnerských veterinářů", price: "Rezervace a telekonzultace", status: "planned", label: "Plánováno" },
          { name: "DNA testy a partneři z chovatelských potřeb", price: "Affiliate, později vlastní sada", status: "planned", label: "Plánováno" },
        ],
      },
      {
        tag: "Značka",
        name: "Curio a seriál",
        items: [
          { name: "Animovaný seriál Curio", price: "Sponzoři sezon", status: "live", label: "Pilot venku" },
          { name: "#walkyourpet", price: "Hnutí, které živí všechny kanály", status: "live", label: "V provozu" },
        ],
      },
    ],
    retention: "Rodina, která si po výzvě zvíře osvojí, zůstává u PetPrepu 10 až 15 let života zvířete, ne jen 12 týdnů.",
    stageTag: "Fáze",
    stage: "Před spuštěním, v uzavřené betě na iOS a Androidu. Následuje spuštění v App Storu a Google Play.",
  },
  team: {
    eyebrow: "Tým",
    title: "Výkon studia. Náklady jednoho člověka.",
    founderName: "David Tacer, zakladatel a generální ředitel.",
    founder: "Už 12 let vede vlastní softwarovou firmu (přes 400 projektů), je zakladatelem CHERR.IO (vítěz FutureHack, Davos 2018). PetPrep vyvíjí na plný úvazek s týmem AI agentů pro programování a obsah.",
    points: [
      "Každý fakt má zdroj a citaci, které kontroluje nezávislý recenzent.",
      "Údaje rodin zůstávají v EU, děti se přihlašují bez e-mailu a v aplikaci nejsou žádné reklamy.",
      "Noční procesy vyhledávají, ověřují a zveřejňují nová plemena a stránky o péči.",
    ],
  },
  webSummit: {
    title: "Potkejme se na Web Summitu v Lisabonu",
    text: "9.–12. listopadu 2026. Přehled, prezentaci, datovou místnost i přístup do bety sdílíme na požádání.",
    watch: "Podívejte se na seriál",
  },
  contactTitle: "Kontaktujte nás",
};

export default cs;
