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
  sl: {
    menu: "Za otroke",
    all: "Vse za otroke",
    items: [
      { page: "coloring", title: "Pobarvanke", text: "12 brezplačnih strani za tiskanje, vsaka z zanimivostjo o skrbi.", image: coloringThumb },
      { page: "curio", title: "Spoznajte Curia", text: "Naša maskota in njeni kratki videi.", image: curioThumb },
      { page: "walkyourpet", title: "#walkyourpet", text: "Gibanje, ki ga je začel otrok: ven na sprehod.", image: null },
    ],
  },
};
