import type { Locale, PageKey } from "@/i18n/config";

/**
 * "For kids" section (David 2026-10-31, option A + hub from C): one menu item with a dropdown and a hub
 * page that gathers everything for children. Only things that exist are listed — no "coming soon" shop;
 * a shop gets its own entry here when the first product is really on sale.
 */
export type KidsItem = { page: PageKey; title: string; text: string; image: { src: string; width: number; height: number } | null };

export type KidsCopy = { menu: string; all: string; items: KidsItem[] };

const coloringThumb = { src: "/coloring/golden-retriever-ball.png", width: 1792, height: 2620 };
const curioThumb = { src: "/curio/curio-waving.webp", width: 720, height: 948 };

export const kidsCopy: Record<Locale, KidsCopy> = {
  en: {
    menu: "For kids",
    all: "Everything for kids",
    items: [
      { page: "coloring", title: "Colouring pages", text: "12 free pages to print, each with a pet-care fact.", image: coloringThumb },
      { page: "curio", title: "Meet Curio", text: "Our mascot and its short videos.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "The movement a child started: go outside for the walk.", image: null },
    ],
  },
  de: {
    menu: "Für Kinder",
    all: "Alles für Kinder",
    items: [
      { page: "coloring", title: "Ausmalbilder", text: "12 kostenlose Blätter zum Ausdrucken, jedes mit einem Wissenstipp zur Tierpflege.", image: coloringThumb },
      { page: "curio", title: "Curio kennenlernen", text: "Unser Maskottchen und seine kurzen Videos.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Die Bewegung, die ein Kind gestartet hat: raus zum Spaziergang.", image: null },
    ],
  },
  fr: {
    menu: "Pour les enfants",
    all: "Tout pour les enfants",
    items: [
      { page: "coloring", title: "Coloriages", text: "12 coloriages gratuits à imprimer, chacun avec une information sur les soins aux animaux.", image: coloringThumb },
      { page: "curio", title: "Découvrir Curio", text: "Notre mascotte et ses courtes vidéos.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Le mouvement lancé par une enfant : on sort pour la promenade.", image: null },
    ],
  },
  es: {
    menu: "Para niños",
    all: "Todo para niños",
    items: [
      { page: "coloring", title: "Dibujos para colorear", text: "12 dibujos gratis para imprimir, cada uno con un dato sobre el cuidado de mascotas.", image: coloringThumb },
      { page: "curio", title: "Conoce a Curio", text: "Nuestra mascota y sus vídeos cortos.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "El movimiento que empezó una niña: salir a la calle a pasear.", image: null },
    ],
  },
  it: {
    menu: "Per i bambini",
    all: "Tutto per i bambini",
    items: [
      { page: "coloring", title: "Disegni da colorare", text: "12 disegni gratuiti da stampare, ognuno con una curiosità sulla cura degli animali.", image: coloringThumb },
      { page: "curio", title: "Ti presento Curio", text: "La nostra mascotte e i suoi brevi video.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Il movimento nato da una bambina: uscire a fare una passeggiata.", image: null },
    ],
  },
  pt: {
    menu: "Para crianças",
    all: "Tudo para crianças",
    items: [
      { page: "coloring", title: "Desenhos para colorir", text: "12 desenhos gratuitos para imprimir, cada um com uma curiosidade sobre o cuidado dos animais.", image: coloringThumb },
      { page: "curio", title: "Conhece o Curio", text: "A nossa mascote e os seus vídeos curtos.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "O movimento iniciado por uma criança: sair à rua para passear.", image: null },
    ],
  },
  nl: {
    menu: "Voor kinderen",
    all: "Alles voor kinderen",
    items: [
      { page: "coloring", title: "Kleurplaten", text: "12 gratis kleurplaten om te printen, elk met een weetje over dierenverzorging.", image: coloringThumb },
      { page: "curio", title: "Maak kennis met Curio", text: "Onze mascotte en zijn korte video’s.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "De beweging die een kind is begonnen: naar buiten voor de wandeling.", image: null },
    ],
  },
  pl: {
    menu: "Dla dzieci",
    all: "Wszystko dla dzieci",
    items: [
      { page: "coloring", title: "Kolorowanki", text: "12 darmowych kolorowanek do wydrukowania – każda z ciekawostką o opiece nad zwierzętami.", image: coloringThumb },
      { page: "curio", title: "Poznaj Curio", text: "Nasza maskotka i jej krótkie filmy.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Ruch, który zapoczątkowało dziecko: wyjdź z domu na spacer.", image: null },
    ],
  },
  cs: {
    menu: "Pro děti",
    all: "Vše pro děti",
    items: [
      { page: "coloring", title: "Omalovánky", text: "12 omalovánek zdarma k vytištění – každá se zajímavostí o péči o zvířata.", image: coloringThumb },
      { page: "curio", title: "Seznam se s Curio", text: "Náš maskot a jeho krátká videa.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Hnutí, které založilo dítě: jdi ven na procházku.", image: null },
    ],
  },
  hr: {
    menu: "Za djecu",
    all: "Sve za djecu",
    items: [
      { page: "coloring", title: "Bojanke", text: "12\u00a0besplatnih bojanki za ispis – svaka sa zanimljivošću o brizi za životinje.", image: coloringThumb },
      { page: "curio", title: "Upoznaj Curija", text: "Curio, naša maskota, i njegovi kratki videozapisi.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Pokret koji je započelo jedno dijete: izađi u šetnju.", image: null },
    ],
  },
  sl: {
    menu: "Za otroke",
    all: "Vse za otroke",
    items: [
      { page: "coloring", title: "Pobarvanke", text: "12 brezplačnih pobarvank za tiskanje, vsaka z zanimivostjo o skrbi za živali.", image: coloringThumb },
      { page: "curio", title: "Spoznajte Curia", text: "Curio, naša maskota, in njegovi kratki videi.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Gibanje, ki ga je začel otrok: ven na sprehod.", image: null },
    ],
  },
  sv: {
    menu: "För barn",
    all: "Allt för barn",
    items: [
      { page: "coloring", title: "Målarbilder", text: "12 gratis målarbilder att skriva ut, var och en med en faktauppgift om djurskötsel.", image: coloringThumb },
      { page: "curio", title: "Möt Curio", text: "Vår maskot och dess korta videor.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Rörelsen som ett barn startade: gå ut på promenad.", image: null },
    ],
  },
  da: {
    menu: "For børn",
    all: "Alt for børn",
    items: [
      { page: "coloring", title: "Tegninger til farvelægning", text: "12 gratis tegninger til at printe ud, hver med en faktaoplysning om dyrepleje.", image: coloringThumb },
      { page: "curio", title: "Mød Curio", text: "Vores maskot og dens korte videoer.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Bevægelsen som et barn startede: kom ud og gå en tur.", image: null },
    ],
  },
  fi: {
    menu: "Lapsille",
    all: "Kaikki lapsille",
    items: [
      { page: "coloring", title: "Värityskuvat", text: "12 ilmaista tulostettavaa kuvaa – jokaisessa tositieto lemmikin hoidosta.", image: coloringThumb },
      { page: "curio", title: "Tutustu Curioon", text: "Maskottimme ja sen lyhyet videot.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Liike, jonka lapsi aloitti: lähde ulos lenkille.", image: null },
    ],
  },
  nb: {
    menu: "For barn",
    all: "Alt for barn",
    items: [
      { page: "coloring", title: "Fargeleggingsark", text: "12 gratis ark til utskrift, hvert med en faktaopplysning om stell av kjæledyr.", image: coloringThumb },
      { page: "curio", title: "Bli kjent med Curio", text: "Maskoten vår og de korte videoene dens.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Bevegelsen et barn startet: Gå ut på tur.", image: null },
    ],
  },
};
