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
/** Polish plural: 1 / 2–4 (not 12–14) / otherwise; non-integers take the 2–4 form. */
function plForm(n: number, one: string, few: string, many: string): string {
  if (!Number.isInteger(n)) return few;
  if (n === 1) return one;
  const m10 = n % 10, m100 = n % 100;
  return m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}

/** Czech plural: 1 / 2–4 / otherwise (0, 5+); non-integers take the genitive (many) form. */
function csForm(n: number, one: string, few: string, many: string): string {
  if (!Number.isInteger(n)) return many;
  if (n === 1) return one;
  return n >= 2 && n <= 4 ? few : many;
}

/** Croatian plural: 1, 21, 31… (not 11) / 2–4, 22–24… (not 12–14) / otherwise; non-integers take the 2–4 form ("2,5 godine"). */
function hrForm(n: number, one: string, few: string, many: string): string {
  if (!Number.isInteger(n)) return few;
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  return m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
}

export const coloringPages: ColoringPage[] = [
  {
    id: "curio-hello",
    animal: "curio",
    tip: { kind: "page", page: "curio" },
    title: { en: "Curio says hello", sl: "Curio pozdravlja", de: "Curio sagt Hallo", fr: "Curio dit bonjour", es: "Curio te saluda", it: "Curio ti saluta", pt: "O Curio diz olá", nl: "Curio zegt hallo", pl: "Curio mówi cześć", cs: "Curio tě zdraví", hr: "Curio te pozdravlja", sv: "Curio säger hej" },
    slug: { en: "curio-says-hello", sl: "curio-pozdravlja", de: "curio-sagt-hallo", fr: "curio-dit-bonjour", es: "curio-te-saluda", it: "curio-ti-saluta", pt: "o-curio-diz-ola", nl: "curio-zegt-hallo", pl: "curio-mowi-czesc", cs: "curio-te-zdravi", hr: "curio-te-pozdravlja", sv: "curio-sager-hej" },
    alt: { en: "Colouring page: Curio, the PetPrep mascot, waving on a hill with flowers, the sun and clouds.", sl: "Pobarvanka: Curio, maskota PetPrepa, maha na griču s cvetlicami, soncem in oblaki.", de: "Ausmalbild: Curio, das PetPrep-Maskottchen, winkt auf einem Hügel mit Blumen, Sonne und Wolken.", fr: "Coloriage : Curio, la mascotte de PetPrep, fait coucou sur une colline avec des fleurs, le soleil et des nuages.", es: "Dibujo para colorear: Curio, la mascota de PetPrep, saluda con la mano en una colina con flores, sol y nubes.", it: "Disegno da colorare: Curio, la mascotte di PetPrep, saluta con la mano su una collina con fiori, sole e nuvole.", pt: "Desenho para colorir: o Curio, a mascote do PetPrep, a acenar numa colina com flores, o sol e nuvens.", nl: "Kleurplaat: Curio, de mascotte van PetPrep, zwaait op een heuvel met bloemen, de zon en wolken.", pl: "Kolorowanka: Curio, maskotka PetPrep, macha na wzgórzu wśród kwiatów, a na niebie świeci słońce i płyną chmury.", cs: "Omalovánka: Curio, maskot PetPrepu, mává na kopci plném květin, nad ním svítí slunce a plují mraky.", hr: "Bojanka: Curio, maskota PetPrepa, maše na brežuljku punom cvijeća, a iznad njega sja sunce i plove oblaci.", sv: "Målarbild: Curio, PetPreps maskot, vinkar på en kulle med blommor, solen och moln." },
  },
  {
    id: "golden-retriever-ball",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "exercise" },
    title: { en: "Golden retriever with a ball", sl: "Zlati prinašalec z žogo", de: "Golden Retriever mit Ball", fr: "Golden retriever avec une balle", es: "Golden retriever con una pelota", it: "Golden retriever con la palla", pt: "Golden retriever com uma bola", nl: "Golden retriever met een bal", pl: "Golden retriever z piłką", cs: "Zlatý retrívr s míčkem", hr: "Zlatni retriver s lopticom", sv: "Golden retriever med en boll" },
    slug: { en: "golden-retriever-with-a-ball", sl: "zlati-prinasalec-z-zogo", de: "golden-retriever-mit-ball", fr: "golden-retriever-avec-une-balle", es: "golden-retriever-con-una-pelota", it: "golden-retriever-con-la-palla", pt: "golden-retriever-com-uma-bola", nl: "golden-retriever-met-een-bal", pl: "golden-retriever-z-pilka", cs: "zlaty-retrivr-s-mickem", hr: "zlatni-retriver-s-lopticom", sv: "golden-retriever-med-en-boll" },
    alt: { en: "Colouring page: a golden retriever running across a park with a ball in its mouth.", sl: "Pobarvanka: zlati prinašalec teče po parku z žogo v gobčku.", de: "Ausmalbild: ein Golden Retriever, der mit einem Ball im Maul durch einen Park läuft.", fr: "Coloriage : un golden retriever court dans un parc, une balle dans la gueule.", es: "Dibujo para colorear: un golden retriever corre por un parque con una pelota en la boca.", it: "Disegno da colorare: un golden retriever corre in un parco con una palla in bocca.", pt: "Desenho para colorir: um golden retriever a correr num parque com uma bola na boca.", nl: "Kleurplaat: een golden retriever rent met een bal in zijn bek door een park.", pl: "Kolorowanka: golden retriever biegnie przez park z piłką w pysku.", cs: "Omalovánka: zlatý retrívr běží parkem s míčkem v tlamě.", hr: "Bojanka: zlatni retriver trči kroz park s lopticom u zubima.", sv: "Målarbild: en golden retriever springer genom en park med en boll i munnen." },
  },
  {
    id: "golden-retriever-bed",
    animal: "dog",
    tip: { kind: "breed", breed: "golden_retriever", key: "coat" },
    title: { en: "Golden retriever on its bed", sl: "Zlati prinašalec na postelji", de: "Golden Retriever auf seinem Bett", fr: "Golden retriever sur son panier", es: "Golden retriever en su cama", it: "Golden retriever sul suo lettino", pt: "Golden retriever na sua cama", nl: "Golden retriever in zijn mand", pl: "Golden retriever na swoim legowisku", cs: "Zlatý retrívr na pelíšku", hr: "Zlatni retriver na svom ležaju", sv: "Golden retriever i sin bädd" },
    slug: { en: "golden-retriever-on-its-bed", sl: "zlati-prinasalec-na-postelji", de: "golden-retriever-auf-seinem-bett", fr: "golden-retriever-sur-son-panier", es: "golden-retriever-en-su-cama", it: "golden-retriever-sul-suo-lettino", pt: "golden-retriever-na-sua-cama", nl: "golden-retriever-in-zijn-mand", pl: "golden-retriever-na-swoim-legowisku", cs: "zlaty-retrivr-na-pelisku", hr: "zlatni-retriver-na-svom-lezaju", sv: "golden-retriever-i-sin-badd" },
    alt: { en: "Colouring page: a golden retriever lying on a round dog bed, with a brush on the floor.", sl: "Pobarvanka: zlati prinašalec leži na okrogli pasji postelji, na tleh je krtača.", de: "Ausmalbild: ein Golden Retriever liegt auf einem runden Hundebett, auf dem Boden eine Bürste.", fr: "Coloriage : un golden retriever couché sur un panier rond, une brosse posée par terre.", es: "Dibujo para colorear: un golden retriever tumbado en una cama redonda para perros, con un cepillo en el suelo.", it: "Disegno da colorare: un golden retriever sdraiato su un lettino rotondo per cani, con una spazzola sul pavimento.", pt: "Desenho para colorir: um golden retriever deitado numa cama redonda para cães, com uma escova no chão.", nl: "Kleurplaat: een golden retriever ligt in een ronde hondenmand, met een borstel op de grond.", pl: "Kolorowanka: golden retriever leży na okrągłym psim legowisku, a na podłodze widać szczotkę.", cs: "Omalovánka: zlatý retrívr leží na kulatém psím pelíšku, na zemi je kartáč.", hr: "Bojanka: zlatni retriver leži na okruglom ležaju za pse, a na podu je četka.", sv: "Målarbild: en golden retriever ligger i en rund hundbädd, med en borste på golvet." },
  },
  {
    id: "labrador-lake",
    animal: "dog",
    tip: { kind: "breed", breed: "labrador_retriever", key: "exercise" },
    title: { en: "Labrador retriever by the lake", sl: "Labradorec ob jezeru", de: "Labrador Retriever am See", fr: "Labrador au bord du lac", es: "Labrador junto al lago", it: "Labrador in riva al lago", pt: "Labrador junto ao lago", nl: "Labrador retriever bij het meer", pl: "Labrador retriever nad jeziorem", cs: "Labradorský retrívr u jezera", hr: "Labrador retriver uz jezero", sv: "Labrador retriever vid sjön" },
    slug: { en: "labrador-retriever-by-the-lake", sl: "labradorec-ob-jezeru", de: "labrador-retriever-am-see", fr: "labrador-au-bord-du-lac", es: "labrador-junto-al-lago", it: "labrador-in-riva-al-lago", pt: "labrador-junto-ao-lago", nl: "labrador-retriever-bij-het-meer", pl: "labrador-retriever-nad-jeziorem", cs: "labradorsky-retrivr-u-jezera", hr: "labrador-retriver-uz-jezero", sv: "labrador-retriever-vid-sjon" },
    alt: { en: "Colouring page: a labrador retriever with a stick in its mouth at the edge of a lake.", sl: "Pobarvanka: labradorec s palico v gobčku ob jezeru.", de: "Ausmalbild: ein Labrador Retriever mit einem Stock im Maul am Ufer eines Sees.", fr: "Coloriage : un labrador avec un bâton dans la gueule, au bord d’un lac.", es: "Dibujo para colorear: un labrador retriever con un palo en la boca a la orilla de un lago.", it: "Disegno da colorare: un labrador retriever con un bastone in bocca in riva a un lago.", pt: "Desenho para colorir: um labrador com um pau na boca à beira de um lago.", nl: "Kleurplaat: een labrador retriever met een stok in zijn bek aan de rand van een meer.", pl: "Kolorowanka: labrador retriever z patykiem w pysku na brzegu jeziora.", cs: "Omalovánka: labradorský retrívr s klackem v tlamě na břehu jezera.", hr: "Bojanka: labrador retriver sa štapom u zubima na obali jezera.", sv: "Målarbild: en labrador retriever med en pinne i munnen vid kanten av en sjö." },
  },
  {
    id: "labrador-puppy-bowls",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "grapes" },
    title: { en: "Labrador puppy and its bowls", sl: "Mladiček labradorca in skledi", de: "Labrador-Welpe mit seinen Näpfen", fr: "Chiot labrador et ses gamelles", es: "Cachorro de labrador y sus cuencos", it: "Cucciolo di labrador e le sue ciotole", pt: "Cachorro labrador e as suas taças", nl: "Labradorpup met zijn bakjes", pl: "Szczeniak labradora i jego miski", cs: "Štěně labradora a jeho misky", hr: "Štene labradora i njegove zdjelice", sv: "Labradorvalp med sina skålar" },
    slug: { en: "labrador-puppy-and-its-bowls", sl: "mladicek-labradorca-in-skledi", de: "labrador-welpe-mit-seinen-naepfen", fr: "chiot-labrador-et-ses-gamelles", es: "cachorro-de-labrador-y-sus-cuencos", it: "cucciolo-di-labrador-e-le-sue-ciotole", pt: "cachorro-labrador-e-as-suas-tacas", nl: "labradorpup-met-zijn-bakjes", pl: "szczeniak-labradora-i-jego-miski", cs: "stene-labradora-a-jeho-misky", hr: "stene-labradora-i-njegove-zdjelice", sv: "labradorvalp-med-sina-skalar" },
    alt: { en: "Colouring page: a labrador puppy sitting in a kitchen next to its food and water bowls.", sl: "Pobarvanka: mladiček labradorca sedi v kuhinji poleg sklede za hrano in sklede za vodo.", de: "Ausmalbild: ein Labrador-Welpe sitzt in einer Küche neben seinem Futter- und Wassernapf.", fr: "Coloriage : un chiot labrador assis dans une cuisine, à côté de sa gamelle de nourriture et de sa gamelle d’eau.", es: "Dibujo para colorear: un cachorro de labrador sentado en una cocina junto a su cuenco de comida y su cuenco de agua.", it: "Disegno da colorare: un cucciolo di labrador seduto in cucina accanto alla ciotola del cibo e a quella dell’acqua.", pt: "Desenho para colorir: um cachorro labrador sentado numa cozinha, ao lado da taça da comida e da taça da água.", nl: "Kleurplaat: een labradorpup zit in een keuken naast zijn voerbak en waterbak.", pl: "Kolorowanka: szczeniak labradora siedzi w kuchni obok swojej miski na jedzenie i miski na wodę.", cs: "Omalovánka: štěně labradora sedí v kuchyni vedle misky na krmení a misky na vodu.", hr: "Bojanka: štene labradora sjedi u kuhinji pokraj svoje zdjelice za hranu i zdjelice za vodu.", sv: "Målarbild: en labradorvalp sitter i ett kök bredvid sin matskål och sin vattenskål." },
  },
  {
    id: "border-collie-frisbee",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "exercise" },
    title: { en: "Border collie catching a frisbee", sl: "Border collie lovi frizbi", de: "Border Collie fängt ein Frisbee", fr: "Border collie qui attrape un frisbee", es: "Border collie atrapando un frisbee", it: "Border collie che afferra un frisbee", pt: "Border collie a apanhar um frisbee", nl: "Border collie vangt een frisbee", pl: "Border collie łapie frisbee", cs: "Border kolie chytá frisbee", hr: "Border collie hvata frizbi", sv: "Border collie fångar en frisbee" },
    slug: { en: "border-collie-catching-a-frisbee", sl: "border-collie-lovi-frizbi", de: "border-collie-faengt-ein-frisbee", fr: "border-collie-qui-attrape-un-frisbee", es: "border-collie-atrapando-un-frisbee", it: "border-collie-che-afferra-un-frisbee", pt: "border-collie-a-apanhar-um-frisbee", nl: "border-collie-vangt-een-frisbee", pl: "border-collie-lapie-frisbee", cs: "border-kolie-chyta-frisbee", hr: "border-collie-hvata-frizbi", sv: "border-collie-fangar-en-frisbee" },
    alt: { en: "Colouring page: a border collie leaping to catch a flying disc in a meadow.", sl: "Pobarvanka: border collie skoči, da ujame leteči disk na travniku.", de: "Ausmalbild: ein Border Collie springt auf einer Wiese hoch, um eine fliegende Scheibe zu fangen.", fr: "Coloriage : un border collie bondit dans une prairie pour attraper un disque volant.", es: "Dibujo para colorear: un border collie salta en un prado para atrapar un disco volador.", it: "Disegno da colorare: un border collie salta in un prato per afferrare al volo un frisbee.", pt: "Desenho para colorir: um border collie a saltar num prado para apanhar um disco voador.", nl: "Kleurplaat: een border collie springt in een weiland op om een frisbee te vangen.", pl: "Kolorowanka: border collie skacze na łące, żeby złapać latający dysk.", cs: "Omalovánka: border kolie vyskočí na louce, aby chytila létající disk.", hr: "Bojanka: border collie skače na livadi kako bi uhvatio leteći disk.", sv: "Målarbild: en border collie tar ett skutt för att fånga en frisbee på en äng." },
  },
  {
    id: "border-collie-puzzle",
    animal: "dog",
    tip: { kind: "breed", breed: "border_collie", key: "mind" },
    title: { en: "Border collie with a puzzle toy", sl: "Border collie z igračo-uganko", de: "Border Collie mit Intelligenzspielzeug", fr: "Border collie et son jouet d’occupation", es: "Border collie con un juguete de inteligencia", it: "Border collie con un gioco di intelligenza", pt: "Border collie com um brinquedo interativo", nl: "Border collie met een puzzelspeeltje", pl: "Border collie z zabawką logiczną", cs: "Border kolie s interaktivní hračkou", hr: "Border collie s interaktivnom igračkom", sv: "Border collie med en aktiveringsleksak" },
    slug: { en: "border-collie-with-a-puzzle-toy", sl: "border-collie-z-igraco-uganko", de: "border-collie-mit-intelligenzspielzeug", fr: "border-collie-et-son-jouet-d-occupation", es: "border-collie-con-un-juguete-de-inteligencia", it: "border-collie-con-un-gioco-di-intelligenza", pt: "border-collie-com-um-brinquedo-interativo", nl: "border-collie-met-een-puzzelspeeltje", pl: "border-collie-z-zabawka-logiczna", cs: "border-kolie-s-interaktivni-hrackou", hr: "border-collie-s-interaktivnom-igrackom", sv: "border-collie-med-en-aktiveringsleksak" },
    alt: { en: "Colouring page: a border collie lying on a rug and pawing at a puzzle toy.", sl: "Pobarvanka: border collie leži na preprogi in s tačko odpira igračo-uganko.", de: "Ausmalbild: ein Border Collie liegt auf einem Teppich und macht sich mit der Pfote an einem Intelligenzspielzeug zu schaffen.", fr: "Coloriage : un border collie couché sur un tapis gratte de la patte un jouet d’occupation.", es: "Dibujo para colorear: un border collie tumbado en una alfombra toca con la pata un juguete de inteligencia.", it: "Disegno da colorare: un border collie sdraiato su un tappeto tocca con la zampa un gioco di intelligenza.", pt: "Desenho para colorir: um border collie deitado num tapete a tocar com a pata num brinquedo interativo.", nl: "Kleurplaat: een border collie ligt op een kleed en duwt met zijn poot tegen een puzzelspeeltje.", pl: "Kolorowanka: border collie leży na dywanie i trąca łapą zabawkę logiczną.", cs: "Omalovánka: border kolie leží na koberci a tlapkou zkoumá interaktivní hračku.", hr: "Bojanka: border collie leži na tepihu i šapom gura interaktivnu igračku.", sv: "Målarbild: en border collie ligger på en matta och tassar på en aktiveringsleksak." },
  },
  {
    id: "mixed-puppy-sleeping",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "chocolate" },
    title: { en: "Sleeping mixed-breed puppy", sl: "Speči mladiček mešanček", de: "Schlafender Mischlingswelpe", fr: "Chiot croisé endormi", es: "Cachorro mestizo dormido", it: "Cucciolo meticcio che dorme", pt: "Cachorro sem raça definida a dormir", nl: "Slapende kruisingspup", pl: "Śpiący szczeniak mieszaniec", cs: "Spící štěně kříženec", hr: "Usnulo štene mješanac", sv: "Sovande blandrasvalp" },
    slug: { en: "sleeping-mixed-breed-puppy", sl: "speci-mladicek-mesancek", de: "schlafender-mischlingswelpe", fr: "chiot-croise-endormi", es: "cachorro-mestizo-dormido", it: "cucciolo-meticcio-che-dorme", pt: "cachorro-sem-raca-definida-a-dormir", nl: "slapende-kruisingspup", pl: "spiacy-szczeniak-mieszaniec", cs: "spici-stene-krizenec", hr: "usnulo-stene-mjesanac", sv: "sovande-blandrasvalp" },
    alt: { en: "Colouring page: a mixed-breed puppy asleep in its bed, a moon and stars in the window.", sl: "Pobarvanka: mladiček mešanček spi v postelji, v oknu sta luna in zvezde.", de: "Ausmalbild: ein Mischlingswelpe schläft in seinem Bett, im Fenster Mond und Sterne.", fr: "Coloriage : un chiot croisé dort dans son panier, la lune et des étoiles à la fenêtre.", es: "Dibujo para colorear: un cachorro mestizo duerme en su cama, con la luna y las estrellas en la ventana.", it: "Disegno da colorare: un cucciolo meticcio dorme nel suo lettino, con la luna e le stelle alla finestra.", pt: "Desenho para colorir: um cachorro sem raça definida a dormir na sua cama, com a lua e as estrelas na janela.", nl: "Kleurplaat: een kruisingspup slaapt in zijn mand, met de maan en sterren in het raam.", pl: "Kolorowanka: szczeniak mieszaniec śpi na swoim posłaniu, a w oknie widać księżyc i gwiazdy.", cs: "Omalovánka: štěně kříženec spí ve svém pelíšku, za oknem svítí měsíc a hvězdy.", hr: "Bojanka: štene mješanac spava u svom krevetiću, a kroz prozor se vide mjesec i zvijezde.", sv: "Målarbild: en blandrasvalp sover i sin bädd, med månen och stjärnor i fönstret." },
  },
  {
    id: "mixed-dog-water",
    animal: "dog",
    tip: { kind: "food", species: "dog", slug: "onion" },
    title: { en: "Mixed-breed dog drinking water", sl: "Mešanček pije vodo", de: "Mischling trinkt Wasser", fr: "Chien croisé qui boit de l’eau", es: "Perro mestizo bebiendo agua", it: "Cane meticcio che beve acqua", pt: "Cão sem raça definida a beber água", nl: "Kruising drinkt water", pl: "Mieszaniec pije wodę", cs: "Kříženec pije vodu", hr: "Mješanac pije vodu", sv: "Blandrashund som dricker vatten" },
    slug: { en: "mixed-breed-dog-drinking-water", sl: "mesancek-pije-vodo", de: "mischling-trinkt-wasser", fr: "chien-croise-qui-boit-de-l-eau", es: "perro-mestizo-bebiendo-agua", it: "cane-meticcio-che-beve-acqua", pt: "cao-sem-raca-definida-a-beber-agua", nl: "kruising-drinkt-water", pl: "mieszaniec-pije-wode", cs: "krizenec-pije-vodu", hr: "mjesanac-pije-vodu", sv: "blandrashund-som-dricker-vatten" },
    alt: { en: "Colouring page: a mixed-breed dog drinking from a water bowl in a garden with a doghouse.", sl: "Pobarvanka: mešanček pije iz sklede za vodo na vrtu s pasjo uto.", de: "Ausmalbild: ein Mischling trinkt in einem Garten mit Hundehütte aus seinem Wassernapf.", fr: "Coloriage : un chien croisé boit dans sa gamelle d’eau, dans un jardin avec une niche.", es: "Dibujo para colorear: un perro mestizo bebe de su cuenco de agua en un jardín con una caseta.", it: "Disegno da colorare: un cane meticcio beve dalla sua ciotola dell’acqua in un giardino con una cuccia.", pt: "Desenho para colorir: um cão sem raça definida a beber da sua taça de água num jardim com uma casota.", nl: "Kleurplaat: een kruisingshond drinkt uit zijn waterbak in een tuin met een hondenhok.", pl: "Kolorowanka: pies mieszaniec pije ze swojej miski z wodą w ogrodzie z budą.", cs: "Omalovánka: pes kříženec pije ze své misky s vodou na zahradě s boudou.", hr: "Bojanka: pas mješanac pije iz svoje zdjelice za vodu u vrtu s kućicom za psa.", sv: "Målarbild: en blandrashund dricker ur sin vattenskål i en trädgård med en hundkoja." },
  },
  {
    id: "kitten-yarn",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "chocolate" },
    title: { en: "Kitten with a ball of yarn", sl: "Mucek s klopčičem volne", de: "Kätzchen mit Wollknäuel", fr: "Chaton et sa pelote de laine", es: "Gatito con un ovillo de lana", it: "Gattino con un gomitolo di lana", pt: "Gatinho com um novelo de lã", nl: "Kitten met een bolletje wol", pl: "Kocię z kłębkiem włóczki", cs: "Koťátko s klubíčkem vlny", hr: "Mače s klupkom vune", sv: "Kattunge med ett garnnystan" },
    slug: { en: "kitten-with-a-ball-of-yarn", sl: "mucek-s-klopcicem-volne", de: "kaetzchen-mit-wollknaeuel", fr: "chaton-et-sa-pelote-de-laine", es: "gatito-con-un-ovillo-de-lana", it: "gattino-con-un-gomitolo-di-lana", pt: "gatinho-com-um-novelo-de-la", nl: "kitten-met-een-bolletje-wol", pl: "kocie-z-klebkiem-wloczki", cs: "kotatko-s-klubickem-vlny", hr: "mace-s-klupkom-vune", sv: "kattunge-med-ett-garnnystan" },
    alt: { en: "Colouring page: a kitten playing with a ball of yarn next to a scratching post.", sl: "Pobarvanka: mucek se igra s klopčičem volne poleg praskalnika.", de: "Ausmalbild: ein Kätzchen spielt neben einem Kratzbaum mit einem Wollknäuel.", fr: "Coloriage : un chaton joue avec une pelote de laine à côté d’un griffoir.", es: "Dibujo para colorear: un gatito juega con un ovillo de lana junto a un rascador.", it: "Disegno da colorare: un gattino gioca con un gomitolo di lana accanto a un tiragraffi.", pt: "Desenho para colorir: um gatinho a brincar com um novelo de lã ao lado de um arranhador.", nl: "Kleurplaat: een kitten speelt met een bolletje wol naast een krabpaal.", pl: "Kolorowanka: kocię bawi się kłębkiem włóczki obok drapaka.", cs: "Omalovánka: koťátko si hraje s klubíčkem vlny vedle škrabadla.", hr: "Bojanka: mače se igra s klupkom vune pokraj grebalice.", sv: "Målarbild: en kattunge leker med ett garnnystan bredvid en klösstolpe." },
  },
  {
    id: "cat-box",
    animal: "cat",
    tip: { kind: "food", species: "cat", slug: "grapes" },
    title: { en: "Cat in a box", sl: "Muca v škatli", de: "Katze im Karton", fr: "Chat dans un carton", es: "Gato en una caja", it: "Gatto nella scatola", pt: "Gato numa caixa", nl: "Kat in een doos", pl: "Kot w pudełku", cs: "Kočka v krabici", hr: "Mačka u kutiji", sv: "Katt i en låda" },
    slug: { en: "cat-in-a-box", sl: "muca-v-skatli", de: "katze-im-karton", fr: "chat-dans-un-carton", es: "gato-en-una-caja", it: "gatto-nella-scatola", pt: "gato-numa-caixa", nl: "kat-in-een-doos", pl: "kot-w-pudelku", cs: "kocka-v-krabici", hr: "macka-u-kutiji", sv: "katt-i-en-lada" },
    alt: { en: "Colouring page: a cat peeking out of a cardboard box, with a toy mouse and a feather toy.", sl: "Pobarvanka: muca kuka iz kartonske škatle, zraven sta igrača miška in palica s peresi.", de: "Ausmalbild: eine Katze lugt aus einem Pappkarton hervor, daneben eine Spielzeugmaus und eine Federangel.", fr: "Coloriage : un chat pointe le bout de son nez hors d’un carton, à côté d’une souris jouet et d’une canne à plumes.", es: "Dibujo para colorear: un gato asoma la cabeza por una caja de cartón, junto a un ratón de juguete y una caña con plumas.", it: "Disegno da colorare: un gatto fa capolino da una scatola di cartone, accanto a un topolino giocattolo e a una canna con le piume.", pt: "Desenho para colorir: um gato a espreitar de uma caixa de cartão, com um rato de brincar e uma cana com penas.", nl: "Kleurplaat: een kat gluurt uit een kartonnen doos, met een speelgoedmuis en een hengel met veren.", pl: "Kolorowanka: kot wygląda z kartonowego pudełka, a obok leżą zabawkowa myszka i wędka z piórkami.", cs: "Omalovánka: kočka vykukuje z kartonové krabice, vedle leží myška na hraní a udička s peříčky.", hr: "Bojanka: mačka viri iz kartonske kutije, a pokraj nje su miš igračka i štapić s perjem.", sv: "Målarbild: en katt kikar fram ur en kartong, med en leksaksmus och ett fjäderspö bredvid." },
  },
  {
    id: "curio-park",
    animal: "curio",
    tip: { kind: "page", page: "walkyourpet" },
    title: { en: "Curio in the park", sl: "Curio v parku", de: "Curio im Park", fr: "Curio au parc", es: "Curio en el parque", it: "Curio al parco", pt: "O Curio no parque", nl: "Curio in het park", pl: "Curio w parku", cs: "Curio v parku", hr: "Curio u parku", sv: "Curio i parken" },
    slug: { en: "curio-in-the-park", sl: "curio-v-parku", de: "curio-im-park", fr: "curio-au-parc", es: "curio-en-el-parque", it: "curio-al-parco", pt: "o-curio-no-parque", nl: "curio-in-het-park", pl: "curio-w-parku", cs: "curio-v-parku", hr: "curio-u-parku", sv: "curio-i-parken" },
    alt: { en: "Colouring page: Curio peeking from behind a tree while a golden retriever runs along a park path.", sl: "Pobarvanka: Curio kuka izza drevesa, po parkovni poti pa teče zlati prinašalec.", de: "Ausmalbild: Curio schaut hinter einem Baum hervor, während ein Golden Retriever einen Parkweg entlangläuft.", fr: "Coloriage : Curio jette un coup d’œil de derrière un arbre pendant qu’un golden retriever court dans une allée du parc.", es: "Dibujo para colorear: Curio se asoma por detrás de un árbol mientras un golden retriever corre por un camino del parque.", it: "Disegno da colorare: Curio fa capolino da dietro un albero mentre un golden retriever corre lungo un sentiero del parco.", pt: "Desenho para colorir: o Curio a espreitar de trás de uma árvore enquanto um golden retriever corre por um caminho do parque.", nl: "Kleurplaat: Curio gluurt achter een boom vandaan terwijl een golden retriever over een pad in het park rent.", pl: "Kolorowanka: Curio wygląda zza drzewa, a parkową alejką biegnie golden retriever.", cs: "Omalovánka: Curio vykukuje zpoza stromu a po cestě v parku běží zlatý retrívr.", hr: "Bojanka: Curio viri iza stabla, a stazom u parku trči zlatni retriver.", sv: "Målarbild: Curio kikar fram bakom ett träd medan en golden retriever springer längs en stig i parken." },
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
  it: {
    animals: { all: "Tutti", dog: "Cani", cat: "Gatti", curio: "Curio" },
    count: (n) => (n === 1 ? `${n} disegno da colorare gratis` : `${n} disegni da colorare gratis`),
    open: "Apri e stampa",
    all: {
      title: "Tutti i disegni in un unico PDF",
      text: "Tutti i disegni da colorare in un unico file: stampa l’album completo per un pomeriggio di pioggia.",
      a4: "Album in PDF (A4)",
      letter: "Album in PDF (US Letter)",
    },
    how: {
      title: "Come funziona",
      steps: [
        "Scegli un disegno e stampalo in A4 o US Letter: basta il bianco e nero.",
        "Coloralo, oppure ricopia il disegno su un foglio bianco.",
        "Leggete insieme la curiosità sulla pagina: ognuna proviene da una fonte veterinaria o da un ente cinofilo.",
      ],
    },
    share: {
      title: "Condividi il disegno",
      text: "Per i genitori: pubblica una foto del disegno finito e tagga @petprep.si con #walkyourpet. Non vediamo l’ora di vederlo! Mostra solo il disegno, mai il viso né il nome del bambino.",
    },
    licence: "Gratis per uso personale, familiare e in classe. Per favore, non vendere né ripubblicare i disegni.",
    page: {
      metaTitle: (t) => `${t} — disegno da colorare gratis da stampare | PetPrep`,
      metaDescription: (t) => `${t}: un disegno da colorare gratis per bambini, da stampare (PDF in A4 e US Letter), con una vera curiosità sulla cura degli animali e la sua fonte. Da PetPrep.`,
      lead: "Gratis da stampare e colorare. Sulla pagina, una vera curiosità sulla cura degli animali da leggere insieme.",
      print: "Stampa",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Immagine (PNG)",
      didYouKnow: "Lo sapevi?",
      readMore: "Scopri di più",
      more: "Altri disegni da colorare",
      back: "Tutti i disegni da colorare",
    },
    pageTip: {
      curio: { title: "Ti presento Curio", text: "Curio è il piccolo cubo curioso del logo di PetPrep che ha preso vita: occhi grandi, naso color lampone e collare color menta. Coloralo con i suoi veri colori… oppure inventa i tuoi." },
      walkyourpet: { title: "#walkyourpet", text: "Un cane ha bisogno della sua passeggiata ogni giorno. In PetPrep conta solo se esci davvero." },
    },
  },
  pt: {
    animals: { all: "Todos", dog: "Cães", cat: "Gatos", curio: "Curio" },
    count: (n) => (n === 1 ? `${n} desenho para colorir gratuito` : `${n} desenhos para colorir gratuitos`),
    open: "Abrir e imprimir",
    all: {
      title: "Todos os desenhos num só PDF",
      text: "Todos os desenhos para colorir num só ficheiro: imprime o caderno completo para uma tarde de chuva.",
      a4: "Caderno em PDF (A4)",
      letter: "Caderno em PDF (US Letter)",
    },
    how: {
      title: "Como funciona",
      steps: [
        "Escolhe um desenho e imprime-o em A4 ou US Letter – a preto e branco chega.",
        "Pinta-o ou copia o desenho para uma folha em branco.",
        "Leiam juntos a curiosidade da página: cada uma vem de uma fonte veterinária ou de um clube de canicultura.",
      ],
    },
    share: {
      title: "Partilha o desenho",
      text: "Para os pais: publica uma fotografia do desenho terminado e identifica @petprep.si com #walkyourpet – vamos adorar vê-lo! Mostra apenas o desenho, nunca a cara nem o nome do teu filho.",
    },
    licence: "Gratuito para uso pessoal, familiar e na sala de aula. Por favor, não vendas nem voltes a publicar os desenhos.",
    page: {
      metaTitle: (t) => `${t} – desenho para colorir gratuito para imprimir | PetPrep`,
      metaDescription: (t) => `${t}: um desenho para colorir gratuito para crianças, para imprimir (PDF em A4 e US Letter), com uma curiosidade verdadeira sobre o cuidado dos animais e a respetiva fonte. Do PetPrep.`,
      lead: "Gratuito para imprimir e colorir. Na página, uma curiosidade verdadeira sobre o cuidado dos animais para lerem juntos.",
      print: "Imprimir",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Imagem (PNG)",
      didYouKnow: "Sabias que…?",
      readMore: "Ler mais",
      more: "Mais desenhos para colorir",
      back: "Todos os desenhos para colorir",
    },
    pageTip: {
      curio: { title: "Conhece o Curio", text: "O Curio é o pequeno cubo curioso do logótipo do PetPrep, que ganhou vida: olhos grandes, nariz cor de framboesa e coleira cor de menta. Pinta-o com as suas cores verdadeiras… ou inventa as tuas." },
      walkyourpet: { title: "#walkyourpet", text: "Um cão precisa do seu passeio todos os dias. No PetPrep, só conta se saíres mesmo à rua." },
    },
  },
  nl: {
    animals: { all: "Alle", dog: "Honden", cat: "Katten", curio: "Curio" },
    count: (n) => (n === 1 ? "1 gratis kleurplaat" : `${n} gratis kleurplaten`),
    open: "Openen en printen",
    all: {
      title: "Alle kleurplaten in één pdf",
      text: "Alle kleurplaten in één bestand – print het hele kleurboek voor een regenachtige middag.",
      a4: "Kleurboek als pdf (A4)",
      letter: "Kleurboek als pdf (US Letter)",
    },
    how: {
      title: "Zo werkt het",
      steps: [
        "Kies een kleurplaat en print hem – A4 of US Letter, zwart-wit is genoeg.",
        "Kleur hem in, of teken de tekening na op een leeg vel.",
        "Lees samen het weetje op de kleurplaat: elk weetje komt van een dierenarts of een kennelclub.",
      ],
    },
    share: {
      title: "Deel de tekening",
      text: "Ouders: post een foto van de afgemaakte tekening en tag @petprep.si met #walkyourpet – we zien hem graag. Laat alleen de tekening zien, niet het gezicht of de naam van je kind.",
    },
    licence: "Gratis voor persoonlijk gebruik, in het gezin en in de klas. Verkoop de kleurplaten niet en publiceer ze nergens anders.",
    page: {
      metaTitle: (t) => `${t} – gratis kleurplaat om te printen | PetPrep`,
      metaDescription: (t) => `${t}: een gratis kleurplaat voor kinderen om te printen (pdf in A4 en US Letter), met een echt weetje over dierenverzorging en de bron. Van PetPrep.`,
      lead: "Gratis om te printen en in te kleuren. Op de kleurplaat: een echt weetje over dierenverzorging om samen te lezen.",
      print: "Printen",
      pdfA4: "Pdf (A4)",
      pdfLetter: "Pdf (US Letter)",
      png: "Afbeelding (PNG)",
      didYouKnow: "Wist je dat?",
      readMore: "Lees meer",
      more: "Meer kleurplaten",
      back: "Alle kleurplaten",
    },
    pageTip: {
      curio: { title: "Dit is Curio", text: "Curio is het nieuwsgierige blokje uit het logo van PetPrep, dat tot leven is gekomen: grote ogen, een frambozenrode neus en een mintgroene halsband. Geef Curio zijn echte kleuren – of verzin je eigen kleuren." },
      walkyourpet: { title: "#walkyourpet", text: "Een hond heeft elke dag zijn wandeling nodig – in PetPrep telt die alleen als je echt naar buiten gaat." },
    },
  },
  pl: {
    animals: { all: "Wszystkie", dog: "Psy", cat: "Koty", curio: "Curio" },
    count: (n) => `${n} ${plForm(n, "darmowa kolorowanka", "darmowe kolorowanki", "darmowych kolorowanek")}`,
    open: "Otwórz i wydrukuj",
    all: {
      title: "Wszystkie kolorowanki w jednym pliku PDF",
      text: "Wszystkie kolorowanki w jednym pliku – wydrukuj całą książeczkę na deszczowe popołudnie.",
      a4: "Książeczka w PDF (A4)",
      letter: "Książeczka w PDF (US Letter)",
    },
    how: {
      title: "Jak to działa",
      steps: [
        "Wybierz kolorowankę i wydrukuj ją – A4 lub US Letter, wystarczy wydruk czarno-biały.",
        "Pokoloruj ją albo przerysuj obrazek na czystą kartkę.",
        "Przeczytajcie razem ciekawostkę na kartce: każda pochodzi ze źródła weterynaryjnego lub od związku kynologicznego.",
      ],
    },
    share: {
      title: "Pochwal się rysunkiem",
      text: "Dla rodziców: opublikuj zdjęcie gotowego rysunku, oznacz @petprep.si i dodaj hasztag #walkyourpet – chętnie go zobaczymy. Pokaż tylko rysunek, bez twarzy i imienia swojego dziecka.",
    },
    licence: "Bezpłatnie do użytku osobistego, rodzinnego i szkolnego. Nie sprzedawaj kolorowanek i nie publikuj ich w innych miejscach.",
    page: {
      metaTitle: (t) => `${t} – darmowa kolorowanka do druku | PetPrep`,
      metaDescription: (t) => `${t}: darmowa kolorowanka do druku dla dzieci (PDF w formacie A4 i US Letter) z prawdziwą ciekawostką o opiece nad zwierzętami i jej źródłem. Od PetPrep.`,
      lead: "Do wydrukowania i pokolorowania za darmo. Na kartce: prawdziwa ciekawostka o opiece nad zwierzętami do wspólnego przeczytania.",
      print: "Drukuj",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Obrazek (PNG)",
      didYouKnow: "Czy wiesz?",
      readMore: "Czytaj więcej",
      more: "Więcej kolorowanek",
      back: "Wszystkie kolorowanki",
    },
    pageTip: {
      curio: { title: "Poznaj Curio", text: "Curio to mała, ciekawska kostka z logo PetPrep, która ożyła: duże oczy, malinowy nosek i miętowa obroża. Pokoloruj je w prawdziwych kolorach – albo wymyśl własne." },
      walkyourpet: { title: "#walkyourpet", text: "Pies potrzebuje spaceru każdego dnia – w aplikacji PetPrep spacer liczy się tylko wtedy, gdy naprawdę wyjdziesz na zewnątrz." },
    },
  },
  cs: {
    animals: { all: "Vše", dog: "Psi", cat: "Kočky", curio: "Curio" },
    count: (n) => `${n} ${csForm(n, "omalovánka zdarma", "omalovánky zdarma", "omalovánek zdarma")}`,
    open: "Otevřít a vytisknout",
    all: {
      title: "Všechny omalovánky v jednom PDF",
      text: "Všechny omalovánky v jednom souboru – vytiskněte si celou knížku na deštivé odpoledne.",
      a4: "Knížka v PDF (A4)",
      letter: "Knížka v PDF (US Letter)",
    },
    how: {
      title: "Jak to funguje",
      steps: [
        "Vyberte omalovánku a vytiskněte ji – na A4 nebo US Letter, stačí černobílý tisk.",
        "Vybarvěte ji nebo obrázek překreslete na čistý papír.",
        "Přečtěte si společně zajímavost na stránce – každá vychází z veterinárního nebo kynologického zdroje.",
      ],
    },
    share: {
      title: "Pochlubte se obrázkem",
      text: "Pro rodiče: zveřejněte fotku hotového obrázku, označte @petprep.si a přidejte #walkyourpet – rádi se na něj podíváme. Ukazujte prosím jen obrázek, ne obličej ani jméno svého dítěte.",
    },
    licence: "Zdarma pro osobní, rodinné a školní použití. Omalovánky prosím neprodávejte a nezveřejňujte jinde.",
    page: {
      metaTitle: (t) => `${t} – omalovánka zdarma k vytištění | PetPrep`,
      metaDescription: (t) => `${t}: omalovánka pro děti zdarma k vytištění (PDF ve formátu A4 a US Letter) se skutečnou zajímavostí o péči o zvířata a jejím zdrojem. Od PetPrepu.`,
      lead: "Zdarma k vytištění a vybarvení. Na stránce najdete skutečnou zajímavost o péči o zvířata, kterou si můžete přečíst společně.",
      print: "Vytisknout",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Obrázek (PNG)",
      didYouKnow: "Víš, že…?",
      readMore: "Číst dál",
      more: "Další omalovánky",
      back: "Všechny omalovánky",
    },
    pageTip: {
      curio: { title: "Seznam se s Curio", text: "Curio je malá zvědavá kostička z loga PetPrep, která ožila: velké oči, malinový nos a mátový obojek. Vybarvi ho ve skutečných barvách – nebo si vymysli vlastní." },
      walkyourpet: { title: "#walkyourpet", text: "Pes potřebuje procházku každý den – v PetPrepu se počítá jen ta, při které opravdu vyjdeš ven." },
    },
  },
  hr: {
    animals: { all: "Sve", dog: "Psi", cat: "Mačke", curio: "Curio" },
    count: (n) => `${n} ${hrForm(n, "besplatna bojanka", "besplatne bojanke", "besplatnih bojanki")}`,
    open: "Otvori i ispiši",
    all: {
      title: "Sve bojanke u jednom PDF-u",
      text: "Sve bojanke u jednoj datoteci – ispiši cijelu knjižicu za kišno poslijepodne.",
      a4: "Knjižica u PDF-u (A4)",
      letter: "Knjižica u PDF-u (US Letter)",
    },
    how: {
      title: "Kako funkcionira",
      steps: [
        "Odaberi bojanku i ispiši je u formatu A4 ili US Letter – dovoljan je crno-bijeli ispis.",
        "Oboji je ili precrtaj crtež na prazan list papira.",
        "Zajedno pročitajte zanimljivost na stranici: svaka dolazi iz veterinarskog ili kinološkog izvora.",
      ],
    },
    share: {
      title: "Pokaži svoj crtež",
      text: "Za roditelje: objavi fotografiju gotovog crteža, označi @petprep.si i dodaj #walkyourpet – jako bismo ga voljeli vidjeti. Molimo te, pokaži samo crtež, a ne lice ili ime svog djeteta.",
    },
    licence: "Besplatno za osobnu, obiteljsku i školsku upotrebu. Molimo te da bojanke ne prodaješ niti ih objavljuješ drugdje.",
    page: {
      metaTitle: (t) => `${t} – besplatna bojanka za ispis | PetPrep`,
      metaDescription: (t) => `${t}: besplatna dječja bojanka za ispis (PDF u formatima A4 i US Letter), uz pravu zanimljivost o brizi za životinje i njezin izvor. Pripremio PetPrep.`,
      lead: "Besplatno za ispis i bojanje. Na stranici je i prava zanimljivost o brizi za životinje – pročitajte je zajedno.",
      print: "Ispiši",
      pdfA4: "PDF (A4)",
      pdfLetter: "PDF (US Letter)",
      png: "Slika (PNG)",
      didYouKnow: "Znaš li?",
      readMore: "Pročitaj više",
      more: "Još bojanki",
      back: "Sve bojanke",
    },
    pageTip: {
      curio: { title: "Upoznaj Curija", text: "Curio je mala znatiželjna kocka iz logotipa PetPrepa koja je oživjela: velike oči, nos boje maline i ovratnik boje mente. Oboji ga u njegove prave boje – ili izmisli svoje." },
      walkyourpet: { title: "#walkyourpet", text: "Pas treba svoju šetnju svaki dan – u PetPrepu se računa samo ako stvarno izađeš van." },
    },
  },
  sv: {
    animals: { all: "Alla", dog: "Hundar", cat: "Katter", curio: "Curio" },
    count: (n) => (n === 1 ? "1 gratis målarbild" : `${n} gratis målarbilder`),
    open: "Öppna och skriv ut",
    all: {
      title: "Alla målarbilder i en pdf",
      text: "Alla målarbilder i en enda fil – skriv ut hela målarboken till en regnig eftermiddag.",
      a4: "Målarbok som pdf (A4)",
      letter: "Målarbok som pdf (US Letter)",
    },
    how: {
      title: "Så funkar det",
      steps: [
        "Välj en målarbild och skriv ut den – A4 eller US Letter, svartvitt räcker.",
        "Färglägg den, eller rita av teckningen på ett tomt papper.",
        "Läs faktarutan på sidan tillsammans: varje faktauppgift kommer från en veterinärkälla eller en kennelklubb.",
      ],
    },
    share: {
      title: "Dela teckningen",
      text: "Till föräldrar: lägg upp ett foto på den färdiga teckningen och tagga @petprep.si med #walkyourpet – vi blir glada att se den. Visa bara teckningen, inte ditt barns ansikte eller namn.",
    },
    licence: "Gratis för privat bruk, i familjen och i klassrummet. Sälj inte målarbilderna och publicera dem inte någon annanstans.",
    page: {
      metaTitle: (t) => `${t} – gratis målarbild att skriva ut | PetPrep`,
      metaDescription: (t) => `${t}: en gratis målarbild för barn att skriva ut (pdf i A4 och US Letter), med en riktig faktauppgift om djurskötsel och källan till den. Från PetPrep.`,
      lead: "Gratis att skriva ut och färglägga. På sidan finns en riktig faktauppgift om djurskötsel att läsa tillsammans.",
      print: "Skriv ut",
      pdfA4: "Pdf (A4)",
      pdfLetter: "Pdf (US Letter)",
      png: "Bild (PNG)",
      didYouKnow: "Visste du?",
      readMore: "Läs mer",
      more: "Fler målarbilder",
      back: "Alla målarbilder",
    },
    pageTip: {
      curio: { title: "Möt Curio", text: "Curio är den nyfikna lilla kuben från PetPreps logga som har fått liv: stora ögon, en hallonröd nos och ett mintgrönt halsband. Måla Curio i de riktiga färgerna – eller hitta på dina egna." },
      walkyourpet: { title: "#walkyourpet", text: "En hund behöver sin promenad varje dag – i PetPrep räknas den bara om du verkligen går ut." },
    },
  },
};

export const coloringBySlug = (locale: Locale, slug: string) => coloringPages.find((p) => p.slug[locale] === slug);
