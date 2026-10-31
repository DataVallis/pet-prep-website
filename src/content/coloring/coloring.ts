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
    title: { en: "Curio says hello", sl: "Curio pozdravlja", de: "Curio sagt Hallo", fr: "Curio dit bonjour", es: "Curio te saluda" },
    slug: { en: "curio-says-hello", sl: "curio-pozdravlja", de: "curio-sagt-hallo", fr: "curio-dit-bonjour", es: "curio-te-saluda" },
    alt: { en: "Colouring page: Curio, the PetPrep mascot, waving on a hill with flowers, the sun and clouds.", sl: "Pobarvanka: Curio, maskota PetPrepa, maha na griču s cvetlicami, soncem in oblaki.", de: "Ausmalbild: Curio, das PetPrep-Maskottchen, winkt auf einem Hügel mit Blumen, Sonne und Wolken.", fr: "Coloriage : Curio, la mascotte de PetPrep, fait coucou sur une colline avec des fleurs, le soleil et des nuages.", es: "Dibujo para colorear: Curio, la mascota de PetPrep, saluda con la mano en una colina con flores, sol y nubes." },
  },
  {
    id: "golden-retriever-ball",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "exercise" },
    title: { en: "Golden retriever with a ball", sl: "Zlati prinašalec z žogo", de: "Golden Retriever mit Ball", fr: "Golden retriever avec une balle", es: "Golden retriever con una pelota" },
    slug: { en: "golden-retriever-with-a-ball", sl: "zlati-prinasalec-z-zogo", de: "golden-retriever-mit-ball", fr: "golden-retriever-avec-une-balle", es: "golden-retriever-con-una-pelota" },
    alt: { en: "Colouring page: a golden retriever running across a park with a ball in its mouth.", sl: "Pobarvanka: zlati prinašalec teče po parku z žogo v gobčku.", de: "Ausmalbild: ein Golden Retriever, der mit einem Ball im Maul durch einen Park läuft.", fr: "Coloriage : un golden retriever court dans un parc, une balle dans la gueule.", es: "Dibujo para colorear: un golden retriever corre por un parque con una pelota en la boca." },
  },
  {
    id: "golden-retriever-bed",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "coat" },
    title: { en: "Golden retriever on its bed", sl: "Zlati prinašalec na postelji", de: "Golden Retriever auf seinem Bett", fr: "Golden retriever sur son panier", es: "Golden retriever en su cama" },
    slug: { en: "golden-retriever-on-its-bed", sl: "zlati-prinasalec-na-postelji", de: "golden-retriever-auf-seinem-bett", fr: "golden-retriever-sur-son-panier", es: "golden-retriever-en-su-cama" },
    alt: { en: "Colouring page: a golden retriever lying on a round dog bed, with a brush on the floor.", sl: "Pobarvanka: zlati prinašalec leži na okrogli pasji postelji, na tleh je krtača.", de: "Ausmalbild: ein Golden Retriever liegt auf einem runden Hundebett, auf dem Boden eine Bürste.", fr: "Coloriage : un golden retriever couché sur un panier rond, une brosse posée par terre.", es: "Dibujo para colorear: un golden retriever tumbado en una cama redonda para perros, con un cepillo en el suelo." },
  },
  {
    id: "labrador-lake",
    animal: "dog",
    tip: { kind: "breed", breed: "labrador_retriever", key: "exercise" },
    title: { en: "Labrador retriever by the lake", sl: "Labradorec ob jezeru", de: "Labrador Retriever am See", fr: "Labrador au bord du lac", es: "Labrador junto al lago" },
    slug: { en: "labrador-retriever-by-the-lake", sl: "labradorec-ob-jezeru", de: "labrador-retriever-am-see", fr: "labrador-au-bord-du-lac", es: "labrador-junto-al-lago" },
    alt: { en: "Colouring page: a labrador retriever with a stick in its mouth at the edge of a lake.", sl: "Pobarvanka: labradorec s palico v gobčku ob jezeru.", de: "Ausmalbild: ein Labrador Retriever mit einem Stock im Maul am Ufer eines Sees.", fr: "Coloriage : un labrador avec un bâton dans la gueule, au bord d’un lac.", es: "Dibujo para colorear: un labrador retriever con un palo en la boca a la orilla de un lago." },
  },
  {
    id: "labrador-puppy-bowls",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "grapes" },
    title: { en: "Labrador puppy and its bowls", sl: "Mladiček labradorca in skledi", de: "Labrador-Welpe mit seinen Näpfen", fr: "Chiot labrador et ses gamelles", es: "Cachorro de labrador y sus cuencos" },
    slug: { en: "labrador-puppy-and-its-bowls", sl: "mladicek-labradorca-in-skledi", de: "labrador-welpe-mit-seinen-naepfen", fr: "chiot-labrador-et-ses-gamelles", es: "cachorro-de-labrador-y-sus-cuencos" },
    alt: { en: "Colouring page: a labrador puppy sitting in a kitchen next to its food and water bowls.", sl: "Pobarvanka: mladiček labradorca sedi v kuhinji poleg sklede za hrano in sklede za vodo.", de: "Ausmalbild: ein Labrador-Welpe sitzt in einer Küche neben seinem Futter- und Wassernapf.", fr: "Coloriage : un chiot labrador assis dans une cuisine, à côté de sa gamelle de nourriture et de sa gamelle d’eau.", es: "Dibujo para colorear: un cachorro de labrador sentado en una cocina junto a su cuenco de comida y su cuenco de agua." },
  },
  {
    id: "border-collie-frisbee",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "exercise" },
    title: { en: "Border collie catching a frisbee", sl: "Border collie lovi frizbi", de: "Border Collie fängt ein Frisbee", fr: "Border collie qui attrape un frisbee", es: "Border collie atrapando un frisbee" },
    slug: { en: "border-collie-catching-a-frisbee", sl: "border-collie-lovi-frizbi", de: "border-collie-faengt-ein-frisbee", fr: "border-collie-qui-attrape-un-frisbee", es: "border-collie-atrapando-un-frisbee" },
    alt: { en: "Colouring page: a border collie leaping to catch a flying disc in a meadow.", sl: "Pobarvanka: border collie skoči, da ujame leteči disk na travniku.", de: "Ausmalbild: ein Border Collie springt auf einer Wiese hoch, um eine fliegende Scheibe zu fangen.", fr: "Coloriage : un border collie bondit dans une prairie pour attraper un disque volant.", es: "Dibujo para colorear: un border collie salta en un prado para atrapar un disco volador." },
  },
  {
    id: "border-collie-puzzle",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "mind" },
    title: { en: "Border collie with a puzzle toy", sl: "Border collie z igračo-uganko", de: "Border Collie mit Intelligenzspielzeug", fr: "Border collie et son jouet d’occupation", es: "Border collie con un juguete de inteligencia" },
    slug: { en: "border-collie-with-a-puzzle-toy", sl: "border-collie-z-igraco-uganko", de: "border-collie-mit-intelligenzspielzeug", fr: "border-collie-et-son-jouet-d-occupation", es: "border-collie-con-un-juguete-de-inteligencia" },
    alt: { en: "Colouring page: a border collie lying on a rug and pawing at a puzzle toy.", sl: "Pobarvanka: border collie leži na preprogi in s tačko odpira igračo-uganko.", de: "Ausmalbild: ein Border Collie liegt auf einem Teppich und macht sich mit der Pfote an einem Intelligenzspielzeug zu schaffen.", fr: "Coloriage : un border collie couché sur un tapis gratte de la patte un jouet d’occupation.", es: "Dibujo para colorear: un border collie tumbado en una alfombra toca con la pata un juguete de inteligencia." },
  },
  {
    id: "mixed-puppy-sleeping",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "chocolate" },
    title: { en: "Sleeping mixed-breed puppy", sl: "Speči mladiček mešanček", de: "Schlafender Mischlingswelpe", fr: "Chiot croisé endormi", es: "Cachorro mestizo dormido" },
    slug: { en: "sleeping-mixed-breed-puppy", sl: "speci-mladicek-mesancek", de: "schlafender-mischlingswelpe", fr: "chiot-croise-endormi", es: "cachorro-mestizo-dormido" },
    alt: { en: "Colouring page: a mixed-breed puppy asleep in its bed, a moon and stars in the window.", sl: "Pobarvanka: mladiček mešanček spi v postelji, v oknu sta luna in zvezde.", de: "Ausmalbild: ein Mischlingswelpe schläft in seinem Bett, im Fenster Mond und Sterne.", fr: "Coloriage : un chiot croisé dort dans son panier, la lune et des étoiles à la fenêtre.", es: "Dibujo para colorear: un cachorro mestizo duerme en su cama, con la luna y las estrellas en la ventana." },
  },
  {
    id: "mixed-dog-water",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "onion" },
    title: { en: "Mixed-breed dog drinking water", sl: "Mešanček pije vodo", de: "Mischling trinkt Wasser", fr: "Chien croisé qui boit de l’eau", es: "Perro mestizo bebiendo agua" },
    slug: { en: "mixed-breed-dog-drinking-water", sl: "mesancek-pije-vodo", de: "mischling-trinkt-wasser", fr: "chien-croise-qui-boit-de-l-eau", es: "perro-mestizo-bebiendo-agua" },
    alt: { en: "Colouring page: a mixed-breed dog drinking from a water bowl in a garden with a doghouse.", sl: "Pobarvanka: mešanček pije iz sklede za vodo na vrtu s pasjo uto.", de: "Ausmalbild: ein Mischling trinkt in einem Garten mit Hundehütte aus seinem Wassernapf.", fr: "Coloriage : un chien croisé boit dans sa gamelle d’eau, dans un jardin avec une niche.", es: "Dibujo para colorear: un perro mestizo bebe de su cuenco de agua en un jardín con una caseta." },
  },
  {
    id: "kitten-yarn",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "chocolate" },
    title: { en: "Kitten with a ball of yarn", sl: "Mucek s klopčičem volne", de: "Kätzchen mit Wollknäuel", fr: "Chaton et sa pelote de laine", es: "Gatito con un ovillo de lana" },
    slug: { en: "kitten-with-a-ball-of-yarn", sl: "mucek-s-klopcicem-volne", de: "kaetzchen-mit-wollknaeuel", fr: "chaton-et-sa-pelote-de-laine", es: "gatito-con-un-ovillo-de-lana" },
    alt: { en: "Colouring page: a kitten playing with a ball of yarn next to a scratching post.", sl: "Pobarvanka: mucek se igra s klopčičem volne poleg praskalnika.", de: "Ausmalbild: ein Kätzchen spielt neben einem Kratzbaum mit einem Wollknäuel.", fr: "Coloriage : un chaton joue avec une pelote de laine à côté d’un griffoir.", es: "Dibujo para colorear: un gatito juega con un ovillo de lana junto a un rascador." },
  },
  {
    id: "cat-box",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "grapes" },
    title: { en: "Cat in a box", sl: "Muca v škatli", de: "Katze im Karton", fr: "Chat dans un carton", es: "Gato en una caja" },
    slug: { en: "cat-in-a-box", sl: "muca-v-skatli", de: "katze-im-karton", fr: "chat-dans-un-carton", es: "gato-en-una-caja" },
    alt: { en: "Colouring page: a cat peeking out of a cardboard box, with a toy mouse and a feather toy.", sl: "Pobarvanka: muca kuka iz kartonske škatle, zraven sta igrača miška in palica s peresi.", de: "Ausmalbild: eine Katze lugt aus einem Pappkarton hervor, daneben eine Spielzeugmaus und eine Federangel.", fr: "Coloriage : un chat pointe le bout de son nez hors d’un carton, à côté d’une souris jouet et d’une canne à plumes.", es: "Dibujo para colorear: un gato asoma la cabeza por una caja de cartón, junto a un ratón de juguete y una caña con plumas." },
  },
  {
    id: "curio-park",
    animal: "curio",
    tip: { kind: "page", page: "walkyourpet" },
    title: { en: "Curio in the park", sl: "Curio v parku", de: "Curio im Park", fr: "Curio au parc", es: "Curio en el parque" },
    slug: { en: "curio-in-the-park", sl: "curio-v-parku", de: "curio-im-park", fr: "curio-au-parc", es: "curio-en-el-parque" },
    alt: { en: "Colouring page: Curio peeking from behind a tree while a golden retriever runs along a park path.", sl: "Pobarvanka: Curio kuka izza drevesa, po parkovni poti pa teče zlati prinašalec.", de: "Ausmalbild: Curio schaut hinter einem Baum hervor, während ein Golden Retriever einen Parkweg entlangläuft.", fr: "Coloriage : Curio jette un coup d’œil de derrière un arbre pendant qu’un golden retriever court dans une allée du parc.", es: "Dibujo para colorear: Curio se asoma por detrás de un árbol mientras un golden retriever corre por un camino del parque." },
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
  de: {
    animals: { all: "Alle", dog: "Hunde", cat: "Katzen", curio: "Curio" },
    count: (n) => (n === 1 ? "1 kostenloses Ausmalbild" : `${n} kostenlose Ausmalbilder`),
    open: "Öffnen und drucken",
    all: {
      title: "Alle Ausmalbilder in einem PDF",
      text: "Alle Ausmalbilder in einer Datei – drucken Sie das ganze Malbuch für einen verregneten Nachmittag.",
      a4: "Malbuch als PDF (A4)",
      letter: "Malbuch als PDF (US Letter)",
    },
    how: {
      title: "So funktioniert es",
      steps: [
        "Wählen Sie ein Ausmalbild und drucken Sie es aus – A4 oder US Letter, Schwarz-Weiß genügt.",
        "Malen Sie es aus – oder zeichnen Sie das Motiv auf ein leeres Blatt ab.",
        "Lesen Sie gemeinsam den Wissenstipp auf dem Blatt: Jeder stammt aus einer tierärztlichen Quelle oder von einem Zuchtverband.",
      ],
    },
    share: {
      title: "Teilen Sie das Bild",
      text: "Liebe Eltern: Posten Sie ein Foto des fertigen Bildes und markieren Sie @petprep.si mit #walkyourpet – wir freuen uns darauf. Bitte zeigen Sie nur das Bild, nicht das Gesicht oder den Namen Ihres Kindes.",
    },
    licence: "Kostenlos für den privaten und familiären Gebrauch sowie für den Unterricht. Bitte verkaufen Sie die Ausmalbilder nicht und veröffentlichen Sie sie nicht an anderer Stelle.",
    page: {
      metaTitle: (t) => `${t} – kostenloses Ausmalbild zum Ausdrucken | PetPrep`,
      metaDescription: (t) => `${t}: ein kostenloses Ausmalbild für Kinder zum Ausdrucken (PDF in A4 und US Letter), mit einem echten Wissenstipp zur Tierpflege und seiner Quelle. Von PetPrep.`,
      lead: "Kostenlos zum Ausdrucken und Ausmalen. Auf dem Blatt: ein echter Wissenstipp zur Tierpflege zum gemeinsamen Lesen.",
      print: "Drucken",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Bild (PNG)",
      didYouKnow: "Wusstest du schon?",
      readMore: "Mehr lesen",
      more: "Weitere Ausmalbilder",
      back: "Alle Ausmalbilder",
    },
    pageTip: {
      curio: { title: "Das ist Curio", text: "Curio ist der neugierige kleine Würfel aus dem PetPrep-Logo, der lebendig geworden ist: große Augen, eine himbeerrote Nase und ein mintgrünes Halsband. Mal ihn in seinen echten Farben aus – oder erfinde deine eigenen." },
      walkyourpet: { title: "#walkyourpet", text: "Ein Hund braucht jeden Tag seinen Spaziergang – in PetPrep zählt er nur, wenn ihr wirklich nach draußen geht." },
    },
  },
  fr: {
    animals: { all: "Tous", dog: "Chiens", cat: "Chats", curio: "Curio" },
    count: (n) => (n < 2 ? `${n} coloriage gratuit` : `${n} coloriages gratuits`),
    open: "Ouvrir et imprimer",
    all: {
      title: "Tous les coloriages dans un seul PDF",
      text: "Tous les coloriages dans un seul fichier – imprimez le cahier complet pour un après-midi pluvieux.",
      a4: "Cahier en PDF (A4)",
      letter: "Cahier en PDF (US Letter)",
    },
    how: {
      title: "Comment ça marche",
      steps: [
        "Choisissez un coloriage et imprimez-le – en A4 ou US Letter, le noir et blanc suffit.",
        "Coloriez-le, ou recopiez le dessin sur une feuille blanche.",
        "Lisez ensemble l’info de la page : chacune provient d’une source vétérinaire ou d’un club de race.",
      ],
    },
    share: {
      title: "Partagez le dessin",
      text: "Parents : publiez une photo du dessin terminé et identifiez @petprep.si en ajoutant #walkyourpet – nous serons ravis de le voir. Merci de ne montrer que le dessin, sans le visage ni le prénom de votre enfant.",
    },
    licence: "Gratuit pour un usage personnel, familial et en classe. Merci de ne pas vendre ni republier les coloriages.",
    page: {
      metaTitle: (t) => `${t} – coloriage gratuit à imprimer | PetPrep`,
      metaDescription: (t) => `${t} : un coloriage gratuit à imprimer pour les enfants (PDF A4 et US Letter), avec une vraie info sur les soins aux animaux et sa source. Par PetPrep.`,
      lead: "Gratuit à imprimer et à colorier. Sur la page : une vraie info sur les soins aux animaux, à lire ensemble.",
      print: "Imprimer",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Image (PNG)",
      didYouKnow: "Le savais-tu ?",
      readMore: "En savoir plus",
      more: "Plus de coloriages",
      back: "Tous les coloriages",
    },
    pageTip: {
      curio: { title: "Voici Curio", text: "Curio, c’est le petit cube curieux du logo PetPrep, qui a pris vie : de grands yeux, un nez framboise et un collier menthe. Colorie-le avec ses vraies couleurs – ou invente les tiennes." },
      walkyourpet: { title: "#walkyourpet", text: "Un chien a besoin de sa promenade tous les jours – dans PetPrep, elle ne compte que si tu sors vraiment." },
    },
  },
  es: {
    animals: { all: "Todos", dog: "Perros", cat: "Gatos", curio: "Curio" },
    count: (n) => (n === 1 ? `${n} dibujo gratis para colorear` : `${n} dibujos gratis para colorear`),
    open: "Abrir e imprimir",
    all: {
      title: "Todos los dibujos en un solo PDF",
      text: "Todos los dibujos para colorear en un solo archivo: imprime el cuaderno completo para una tarde de lluvia.",
      a4: "Cuaderno en PDF (A4)",
      letter: "Cuaderno en PDF (US Letter)",
    },
    how: {
      title: "Cómo funciona",
      steps: [
        "Elige un dibujo e imprímelo en A4 o US Letter; en blanco y negro es suficiente.",
        "Coloréalo o copia el dibujo en una hoja en blanco.",
        "Lee con tu hijo el dato de la página: cada uno procede de una fuente veterinaria o de un club canino.",
      ],
    },
    share: {
      title: "Comparte el dibujo",
      text: "Para madres y padres: publica una foto del dibujo terminado y etiqueta a @petprep.si con #walkyourpet. ¡Nos encantará verlo! Muestra solo el dibujo, nunca la cara ni el nombre de tu hijo.",
    },
    licence: "Gratis para uso personal, familiar y en el aula. Por favor, no vendas ni vuelvas a publicar los dibujos.",
    page: {
      metaTitle: (t) => `${t} — dibujo gratis para colorear e imprimir | PetPrep`,
      metaDescription: (t) => `${t}: un dibujo infantil gratis para colorear e imprimir (PDF en A4 y US Letter), con un dato real sobre el cuidado de mascotas y su fuente. De PetPrep.`,
      lead: "Gratis para imprimir y colorear. En la página, un dato real sobre el cuidado de mascotas para leer juntos.",
      print: "Imprimir",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Imagen (PNG)",
      didYouKnow: "¿Sabías que…?",
      readMore: "Leer más",
      more: "Más dibujos para colorear",
      back: "Todos los dibujos para colorear",
    },
    pageTip: {
      curio: { title: "Te presentamos a Curio", text: "Curio es el cubito curioso del logotipo de PetPrep, que ha cobrado vida: ojos grandes, nariz de color frambuesa y collar de color menta. Coloréalo con sus colores de verdad… o inventa los tuyos." },
      walkyourpet: { title: "#walkyourpet", text: "Un perro necesita su paseo todos los días. En PetPrep solo cuenta si sales a la calle de verdad." },
    },
  },
};

export const coloringBySlug = (locale: Locale, slug: string) => coloringPages.find((p) => p.slug[locale] === slug);
