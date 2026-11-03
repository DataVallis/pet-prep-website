import type { InvestorsCopy } from "./types";

const pl: InvestorsCopy = {
  meta: {
    title: "PetPrep dla inwestorów: jeden założyciel i silnik treści dla produktu na 15 lat",
    description:
      "W PetPrep dziecko w 12-tygodniowej, realistycznej symulacji dowodzi, że jest gotowe na zwierzę domowe, a aplikacja towarzyszy rodzinie przez całe życie zwierzęcia. Liczby na żywo, mapa przychodów i informacja, jak poprosić o zestawienie dla inwestorów.",
  },
  eyebrow: "Dla inwestorów",
  title: "Jeden założyciel i silnik treści dla produktu, z którego rodziny korzystają przez 15 lat.",
  seriesTitle: "„12 Weeks”",
  lead: "W PetPrep dziecko w 12-tygodniowej, realistycznej symulacji dowodzi, że jest gotowe na zwierzę domowe, a aplikacja towarzyszy rodzinie przez całe życie zwierzaka. Wszystko wokół niej, od naszego serialu po bibliotekę opieki, w której każdy fakt ma swoje źródło, służy temu, by pozyskiwać rodziny niemal bez kosztów.",
  watch: "Obejrzyj „12 Weeks” na YouTube",
  brief: "Poproś o zestawienie dla inwestorów",
  heroStats: {
    breeds: "ras psów i kotów z zasadami opieki popartymi źródłami",
    sources: "źródeł weterynaryjnych i związków kynologicznych",
    episodes: "odcinków naszej komedii rodzinnej „12 Weeks”",
  },
  opportunity: {
    eyebrow: "Szansa",
    title: "Od 12-tygodniowego wyzwania do relacji na 10–15 lat.",
    items: [
      { tag: "Problem", text: "Dzieci obiecują, że zajmą się zwierzakiem, a rodzice nie mają neutralnego sposobu, by to sprawdzić, zanim zobowiążą się do wydatków i lat opieki." },
      { tag: "Rozwiązanie", text: "Realistyczna 12-tygodniowa symulacja z panelem dla rodziców na żywo i obiektywnym Care Score, zwieńczona Certyfikatem odpowiedzialności." },
      { tag: "Dalszy rozwój", text: "Gdy prawdziwy zwierzak trafi do domu, PetPrep zostaje jego asystentem AI: dane z obroży, pierwszy kontakt z weterynarzem przez AI, wzrost i żywienie, testy DNA, usługi partnerów." },
    ],
  },
  flywheel: {
    eyebrow: "Koło zamachowe",
    title: "Treści przyciągają rodziny. Prawdziwe zwierzęta zatrzymują je na lata.",
    lead: "Każda treść to krok w tej samej pętli, a nie projekt poboczny.",
    steps: [
      { title: "Silnik treści", text: "Serial, Curio, kolorowanki i biblioteka opieki, tworzone przez jednego założyciela z agentami AI." },
      { title: "Rodziny znajdują PetPrep", text: "Przez wyszukiwarki, media społecznościowe i #walkyourpet, zamiast płatnych reklam." },
      { title: "12-tygodniowe wyzwanie", text: "Pierwszy przychód: 49,99 € za zwierzę, jednorazowo.", highlight: true },
      { title: "Do domu trafia prawdziwy zwierzak", text: "PetPrep zostaje asystentem AI rodziny w opiece nad zwierzęciem na 10–15 lat." },
      { title: "Partnerzy na lata", text: "Ubezpieczenia, weterynarze, karma i testy DNA: oferty dopasowane do zwierzaka z rodziny, które rodzice sami wybierają do obejrzenia." },
      { title: "Przychody finansują kolejne treści", text: "Sponsorzy i przychody z fazy 2 opłacają następny sezon, a pętla zaczyna się od nowa." },
    ],
  },
  engine: {
    eyebrow: "Silnik treści · liczby na żywo",
    title: "Co do tej pory zrobiliśmy",
    lead: "Każda liczba poniżej aktualizuje się sama z naszego rejestru, bazy wiedzy i kanałów.",
    updated: "Aktualizowane automatycznie z naszego rejestru, bazy wiedzy i kanałów.",
    cards: {
      breeds: { label: "Ras w rejestrze", note: (dogs, cats) => `${dogs} ras psów i ${cats} ras kotów, co noc dodajemy kolejne` },
      sources: { label: "Źródeł", note: "Weterynarze, związki kynologiczne i badania, z cytatami" },
      episodes: { label: "Odcinków „12 Weeks”", note: (views) => (views ? `${views} wyświetleń na YouTube` : "Na YouTube") },
      coloring: { label: "Darmowych kolorowanek", note: "Do wydruku, A4 i US Letter" },
      curio: { value: "Pilot", label: "Serial animowany Curio", note: "Odcinek pilotażowy jest już na YouTube i TikToku" },
      foods: { label: "Omówionych produktów spożywczych", note: "Biblioteka opieki, co noc nowe produkty" },
      languages: { label: "Języków", note: "Strona i biblioteka opieki" },
      vets: { label: "Krajów z wykazem weterynarzy", note: "Weterynarze dyżurni według krajów" },
    },
    status: { live: "Działa", building: "W budowie", planned: "Planowane" },
    media: {
      playlist: "„12 Weeks” – serial",
      channel: "Kanał na YouTube @petprep-si →",
      play: "Odtwórz",
      all: "Wszystkie odcinki (playlista)",
      episode: (n) => `Odcinek ${n}`,
      consent: "Odtwarzane z YouTube (youtube-nocookie.com) – dopóki nie klikniesz, nic się nie ładuje.",
      more: "Więcej do obejrzenia",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilot naszej niemej komedii rodzinnej" },
      curioAll: "Curio – wszystkie odcinki",
      promo: { title: "PetPrep w 60 sekund", text: "Czy twoje dziecko jest gotowe na prawdziwego zwierzaka?" },
      curio: { title: "Poznaj Curio", text: "Nasza maskotka i jej krótkie filmy" },
      coloring: { title: "Kolorowanki", text: "Darmowe do wydruku, każda z faktem o opiece nad zwierzętami i jego źródłem" },
      walkthrough: { title: "Jak działa aplikacja", text: "12-tygodniowe wyzwanie krok po kroku" },
    },
    closing: "Wszystko to tworzy jeden założyciel z agentami AI, bez zespołu produkcyjnego i bez agencji. Każda treść prowadzi z powrotem do aplikacji.",
  },
  built: {
    eyebrow: "Co już zbudowaliśmy",
    title: "Prawdziwy produkt, nie prototyp",
    items: [
      "Silnik gry po stronie serwera z synchronizacją w czasie rzeczywistym, przetestowany na symulacjach całych dni, dniach zmiany czasu i nietypowych sytuacjach rodzinnych.",
      "Rodziny z kilkorgiem rodziców, kilkorgiem dzieci i wspólnymi zwierzętami, z uczciwą oceną każdego dziecka z osobna.",
      "Fotorealistyczne zwierzaki AI ze zmierzonymi i ograniczonymi kosztami AI oraz mediami na wynajmowanych serwerach w Niemczech (Hetzner, UE).",
      "Potrzeby zwierząt oparte na cytowanych źródłach weterynarzy i związków kynologicznych, a każdą liczbę można prześledzić do źródła.",
      "Bezpieczeństwo dzieci od podstaw: logowanie kodem PIN bez e-maila, minimum danych, brak reklam, tylko zweryfikowane media.",
      "Dostępna rozgrywka: prostsze gesty, czytniki ekranu, a pchanie wózka inwalidzkiego liczy się jako spacer.",
    ],
  },
  revenue: {
    eyebrow: "Mapa przychodów",
    title: "Faza 1 płaci za pozyskiwanie rodzin. Faza 2 to biznes.",
    phases: [
      {
        tag: "Faza 1 · Przed zwierzakiem",
        name: "Płaci za pozyskiwanie rodzin",
        items: [
          { name: "12-tygodniowe wyzwanie", price: "49,99 € za zwierzę, jednorazowo", status: "live", label: "Gotowe" },
          { name: "Życzenia (rzeczy dla zwierzaka)", price: "2,99–15,99 €, tylko wygląd", status: "live", label: "Gotowe" },
          { name: "Sponsoring serialu", price: "Pakiety sezonowe", status: "building", label: "W toku" },
          { name: "Sklep: kolorowanki, pluszowy Curio, puzzle", price: "Fizyczne i cyfrowe", status: "planned", label: "Planowane" },
        ],
      },
      {
        tag: "Faza 2 · Z prawdziwym zwierzakiem",
        name: "Biznes",
        items: [
          { name: "Asystent AI do opieki nad zwierzakiem", price: "Subskrypcja od 3,99 € miesięcznie + doładowania", status: "planned", label: "Planowane" },
          { name: "Partnerzy ubezpieczeniowi", price: "Oferty, które rodzice sami wybierają do obejrzenia, opłata za każde polecenie", status: "planned", label: "Planowane" },
          { name: "Sieć partnerskich weterynarzy", price: "Rezerwacje i teleporady", status: "planned", label: "Planowane" },
          { name: "Testy DNA i partnerzy ze sklepów zoologicznych", price: "Afiliacja, później własny zestaw", status: "planned", label: "Planowane" },
        ],
      },
      {
        tag: "Marka",
        name: "Curio i serial",
        items: [
          { name: "Serial animowany Curio", price: "Sponsorzy sezonów", status: "live", label: "Pilot wyszedł" },
          { name: "#walkyourpet", price: "Ruch, który zasila wszystkie kanały", status: "live", label: "Działa" },
        ],
      },
    ],
    retention: "Rodzina, która po wyzwaniu adoptuje zwierzaka, zostaje z PetPrep na 10–15 lat jego życia, a nie tylko na 12 tygodni.",
    stageTag: "Etap",
    stage: "Przed premierą, w zamkniętej becie na iOS i Androidzie. Premiera w App Store i Google Play będzie następna.",
  },
  team: {
    eyebrow: "Zespół",
    title: "Efekty studia. Koszt jednej osoby.",
    founderName: "David Tacer, założyciel i dyrektor generalny.",
    founder: "Od 12 lat prowadzi własną firmę programistyczną (ponad 400 projektów), założyciel CHERR.IO (zwycięzca FutureHack, Davos 2018). PetPrep tworzy w pełnym wymiarze czasu, z zespołem agentów AI do programowania i treści.",
    points: [
      "Każdy fakt ma źródło i cytat, sprawdzone przez niezależnego recenzenta.",
      "Dane rodzin zostają w UE, dzieci logują się bez e-maila, a w aplikacji nie ma reklam.",
      "Nocne procesy badają, sprawdzają i publikują nowe rasy oraz strony o opiece.",
    ],
  },
  webSummit: {
    title: "Spotkajmy się na Web Summit w Lizbonie",
    text: "9–12 listopada 2026. Zestawienie, prezentację, data room i dostęp do bety udostępniamy na życzenie.",
    watch: "Obejrzyj serial",
  },
  contactTitle: "Skontaktuj się z nami",
};

export default pl;
