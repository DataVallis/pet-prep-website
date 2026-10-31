import type { Locale, PageKey } from "@/i18n/config";

/**
 * Free printable colouring pages (David 2026-10-31): line art made from PetPrep's own AI breed
 * portraits and Curio (CGP exception: line art only for colouring pages). Files live in
 * public/coloring/<id>.png (1-bit, 1792×2620, logo outline in the bottom band) and <id>.a4.pdf / <id>.letter.pdf (scripts/coloring-pdf.mjs).
 * Every page carries one sourced tip that links to a care or breed page — never a new claim.
 */
export type ColoringTip =
  | { kind: "food"; species: "dog" | "cat"; slug: string }
  | { kind: "breed"; breed: string; key: "exercise" | "coat" | "mind" }
  | { kind: "page"; page: PageKey };

export type ColoringAnimal = "dog" | "cat" | "curio";

export type ColoringPage = {
  id: string;
  animal: ColoringAnimal;
  tip: ColoringTip;
  title: Record<Locale, string>;
  slug: Record<Locale, string>;
  alt: Record<Locale, string>;
};

export const coloringUpdated = "2026-10-31";
export const coloringSize = { width: 1792, height: 2620 };

/** Order = order on the hub and in the printable book (keep scripts/coloring-pdf.mjs in sync). */
export const coloringPages: ColoringPage[] = [
  {
    id: "curio-hello",
    animal: "curio",
    tip: { kind: "page", page: "curio" },
    title: { en: "Curio says hello", sl: "Curio pozdravlja" },
    slug: { en: "curio-says-hello", sl: "curio-pozdravlja" },
    alt: { en: "Colouring page: Curio, the PetPrep mascot, waving on a hill with flowers, the sun and clouds.", sl: "Pobarvanka: Curio, maskota PetPrepa, maha na griču s cvetlicami, soncem in oblaki." },
  },
  {
    id: "golden-retriever-ball",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "exercise" },
    title: { en: "Golden retriever with a ball", sl: "Zlati prinašalec z žogo" },
    slug: { en: "golden-retriever-with-a-ball", sl: "zlati-prinasalec-z-zogo" },
    alt: { en: "Colouring page: a golden retriever running across a park with a ball in its mouth.", sl: "Pobarvanka: zlati prinašalec teče po parku z žogo v gobčku." },
  },
  {
    id: "golden-retriever-bed",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "coat" },
    title: { en: "Golden retriever on its bed", sl: "Zlati prinašalec na postelji" },
    slug: { en: "golden-retriever-on-its-bed", sl: "zlati-prinasalec-na-postelji" },
    alt: { en: "Colouring page: a golden retriever lying on a round dog bed, with a brush on the floor.", sl: "Pobarvanka: zlati prinašalec leži na okrogli pasji postelji, na tleh je krtača." },
  },
  {
    id: "labrador-lake",
    animal: "dog",
    tip: { kind: "breed", breed: "labrador_retriever", key: "exercise" },
    title: { en: "Labrador retriever by the lake", sl: "Labradorec ob jezeru" },
    slug: { en: "labrador-retriever-by-the-lake", sl: "labradorec-ob-jezeru" },
    alt: { en: "Colouring page: a labrador retriever with a stick in its mouth at the edge of a lake.", sl: "Pobarvanka: labradorec s palico v gobčku ob jezeru." },
  },
  {
    id: "labrador-puppy-bowls",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "grapes" },
    title: { en: "Labrador puppy and its bowls", sl: "Mladiček labradorca in skledi" },
    slug: { en: "labrador-puppy-and-its-bowls", sl: "mladicek-labradorca-in-skledi" },
    alt: { en: "Colouring page: a labrador puppy sitting in a kitchen next to its food and water bowls.", sl: "Pobarvanka: mladiček labradorca sedi v kuhinji poleg sklede za hrano in sklede za vodo." },
  },
  {
    id: "border-collie-frisbee",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "exercise" },
    title: { en: "Border collie catching a frisbee", sl: "Border collie lovi frizbi" },
    slug: { en: "border-collie-catching-a-frisbee", sl: "border-collie-lovi-frizbi" },
    alt: { en: "Colouring page: a border collie leaping to catch a flying disc in a meadow.", sl: "Pobarvanka: border collie skoči, da ujame leteči disk na travniku." },
  },
  {
    id: "border-collie-puzzle",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "mind" },
    title: { en: "Border collie with a puzzle toy", sl: "Border collie z igračo-uganko" },
    slug: { en: "border-collie-with-a-puzzle-toy", sl: "border-collie-z-igraco-uganko" },
    alt: { en: "Colouring page: a border collie lying on a rug and pawing at a puzzle toy.", sl: "Pobarvanka: border collie leži na preprogi in s tačko odpira igračo-uganko." },
  },
  {
    id: "mixed-puppy-sleeping",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "chocolate" },
    title: { en: "Sleeping mixed-breed puppy", sl: "Speči mladiček mešanček" },
    slug: { en: "sleeping-mixed-breed-puppy", sl: "speci-mladicek-mesancek" },
    alt: { en: "Colouring page: a mixed-breed puppy asleep in its bed, a moon and stars in the window.", sl: "Pobarvanka: mladiček mešanček spi v postelji, v oknu sta luna in zvezde." },
  },
  {
    id: "mixed-dog-water",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "onion" },
    title: { en: "Mixed-breed dog drinking water", sl: "Mešanček pije vodo" },
    slug: { en: "mixed-breed-dog-drinking-water", sl: "mesancek-pije-vodo" },
    alt: { en: "Colouring page: a mixed-breed dog drinking from a water bowl in a garden with a doghouse.", sl: "Pobarvanka: mešanček pije iz sklede za vodo na vrtu s pasjo uto." },
  },
  {
    id: "kitten-yarn",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "chocolate" },
    title: { en: "Kitten with a ball of yarn", sl: "Mucek s klopčičem volne" },
    slug: { en: "kitten-with-a-ball-of-yarn", sl: "mucek-s-klopcicem-volne" },
    alt: { en: "Colouring page: a kitten playing with a ball of yarn next to a scratching post.", sl: "Pobarvanka: mucek se igra s klopčičem volne poleg praskalnika." },
  },
  {
    id: "cat-box",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "grapes" },
    title: { en: "Cat in a box", sl: "Muca v škatli" },
    slug: { en: "cat-in-a-box", sl: "muca-v-skatli" },
    alt: { en: "Colouring page: a cat peeking out of a cardboard box, with a toy mouse and a feather toy.", sl: "Pobarvanka: muca kuka iz kartonske škatle, zraven sta igrača miška in palica s peresi." },
  },
  {
    id: "curio-park",
    animal: "curio",
    tip: { kind: "page", page: "walkyourpet" },
    title: { en: "Curio in the park", sl: "Curio v parku" },
    slug: { en: "curio-in-the-park", sl: "curio-v-parku" },
    alt: { en: "Colouring page: Curio peeking from behind a tree while a golden retriever runs along a park path.", sl: "Pobarvanka: Curio kuka izza drevesa, po parkovni poti pa teče zlati prinašalec." },
  },
];

export type ColoringCopy = {
  animals: Record<ColoringAnimal | "all", string>;
  count: (n: number) => string;
  open: string;
  all: { title: string; text: string; a4: string; letter: string };
  how: { title: string; steps: string[] };
  share: { title: string; text: string };
  licence: string;
  page: {
    metaTitle: (title: string) => string;
    metaDescription: (title: string) => string;
    lead: string;
    print: string;
    pdfA4: string;
    pdfLetter: string;
    png: string;
    didYouKnow: string;
    readMore: string;
    more: string;
    back: string;
  };
  pageTip: Partial<Record<PageKey, { title: string; text: string }>>;
};

export const coloringCopy: Record<Locale, ColoringCopy> = {
  en: {
    animals: { all: "All", dog: "Dogs", cat: "Cats", curio: "Curio" },
    count: (n) => `${n} free colouring pages`,
    open: "Open and print",
    all: {
      title: "All pages in one PDF",
      text: "Every colouring page in one file — print the whole book for a rainy afternoon.",
      a4: "Book PDF (A4)",
      letter: "Book PDF (US Letter)",
    },
    how: {
      title: "How it works",
      steps: [
        "Pick a page and print it — A4 or US Letter, black and white is enough.",
        "Colour it, or copy the drawing on a blank sheet.",
        "Read the fact on the page together: every one comes from a vet or kennel-club source.",
      ],
    },
    share: {
      title: "Share the drawing",
      text: "Parents: post a photo of the finished drawing and tag @petprep.si with #walkyourpet — we'd love to see it. Please show only the drawing, not your child's face or name.",
    },
    licence: "Free for personal, family and classroom use. Please don't sell or republish the pages.",
    page: {
      metaTitle: (t) => `${t} — free printable coloring page | PetPrep`,
      metaDescription: (t) => `${t}: a free printable coloring page for kids (A4 and US Letter PDF), with a real pet-care fact and its source. From PetPrep.`,
      lead: "Free to print and colour. On the page: a real pet-care fact to read together.",
      print: "Print",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Image (PNG)",
      didYouKnow: "Did you know?",
      readMore: "Read more",
      more: "More colouring pages",
      back: "All colouring pages",
    },
    pageTip: {
      curio: { title: "Meet Curio", text: "Curio is the curious little cube from the PetPrep logo, brought to life: big eyes, a raspberry nose and a mint collar. Colour it in the real colours — or invent your own." },
      walkyourpet: { title: "#walkyourpet", text: "A dog needs its walk every day — in PetPrep it only counts if you really go outside." },
    },
  },
  sl: {
    animals: { all: "Vse", dog: "Psi", cat: "Mačke", curio: "Curio" },
    count: (n) => `${n} brezplačnih pobarvank`,
    open: "Odpri in natisni",
    all: {
      title: "Vse pobarvanke v enem PDF",
      text: "Vse pobarvanke v eni datoteki — natisnite celo knjižico za deževno popoldne.",
      a4: "Knjižica PDF (A4)",
      letter: "Knjižica PDF (US Letter)",
    },
    how: {
      title: "Kako",
      steps: [
        "Izberite pobarvanko in jo natisnite — A4 ali US Letter, dovolj je črno-belo.",
        "Pobarvajte jo ali risbo prerišite na prazen list.",
        "Skupaj preberite zanimivost na strani: vsaka je iz vira veterinarjev ali kinoloških zvez.",
      ],
    },
    share: {
      title: "Delite risbo",
      text: "Starši: objavite fotografijo dokončane risbe in označite @petprep.si s #walkyourpet — z veseljem jo pogledamo. Prosimo, pokažite samo risbo, ne obraza ali imena otroka.",
    },
    licence: "Brezplačno za osebno, družinsko in šolsko uporabo. Prosimo, pobarvank ne prodajajte in ne objavljajte drugje.",
    page: {
      metaTitle: (t) => `${t} — brezplačna pobarvanka za tiskanje | PetPrep`,
      metaDescription: (t) => `${t}: brezplačna pobarvanka za otroke za tiskanje (PDF A4 in US Letter), z resnično zanimivostjo o skrbi za žival in njenim virom. Od PetPrepa.`,
      lead: "Brezplačno za tiskanje in barvanje. Na strani je resnična zanimivost o skrbi za žival, ki jo preberete skupaj.",
      print: "Natisni",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Slika (PNG)",
      didYouKnow: "Ali veš?",
      readMore: "Preberi več",
      more: "Še več pobarvank",
      back: "Vse pobarvanke",
    },
    pageTip: {
      curio: { title: "To je Curio", text: "Curio je radovedna kockica iz logotipa PetPrep, ki je oživela: velike oči, malinast nos in metina ovratnica. Pobarvaj ga v pravih barvah — ali si izmisli svoje." },
      walkyourpet: { title: "#walkyourpet", text: "Pes potrebuje sprehod vsak dan — v PetPrepu šteje samo, če res greste ven." },
    },
  },
};

export const coloringBySlug = (locale: Locale, slug: string) => coloringPages.find((p) => p.slug[locale] === slug);
