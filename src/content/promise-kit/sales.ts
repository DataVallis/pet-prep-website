import type { KitLang } from "./types.ts";

/** Sales-page copy of the Pet Promise Kit (original text; the kit's own text is in en.ts / sl.ts). */
export type KitSales = {
  eyebrow: string;
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  price: string;
  priceNote: string;
  buy: string;
  sample: string;
  sampleHeading: string;
  sampleText: string;
  sampleNote: string;
  insideHeading: string;
  insideIntro: string;
  previewHeading: string;
  previewAlt: { cover: string; promise: string; cost: string };
  forHeading: string;
  forItems: string[];
  notHeading: string;
  notItems: string[];
  giftText: string;
  giftLink: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
};

export const sales: Record<KitLang, KitSales> = {
  en: {
    eyebrow: "Printable kit",
    title: "The Pet Promise Kit",
    lead: "Before a pet comes home, put the promise on paper. Eleven A4 pages for your family: a conversation to have, an agreement to sign, a four-week trial to tick off and a cost sheet to fill in.",
    metaTitle: "Pet Promise Kit: a printable family agreement before you get a pet | PetPrep",
    metaDescription: "A printable A4 kit for families who are thinking about a pet: ten questions to talk through, a Pet Promise to sign, a four-week task chart, a cost sheet and a checklist for parents.",
    breadcrumb: "Pet Promise Kit",
    price: "€6.90",
    priceNote: "One-off purchase, PDF download in English and Slovenian. Payment and invoice are handled by Lemon Squeezy.",
    buy: "Buy the kit",
    sample: "Get the free sample page",
    sampleHeading: "Try the Promise page first",
    sampleText: "The Pet Promise itself, as a free A4 page: the agreement between a child and the grown-ups, with daily tasks, your own rules and room for everyone's signature. You enter your e-mail address and agree to hear from us; the PDF arrives from the checkout.",
    sampleNote: "Your e-mail address is used only for what you agree to at checkout.",
    insideHeading: "What is inside",
    insideIntro: "Print as many copies as you need. Everything is filled in by hand, so nothing about your child is typed into a form or sent anywhere.",
    previewHeading: "A look at three pages",
    previewAlt: { cover: "Cover page of the Pet Promise Kit with the Curio mascot", promise: "The Pet Promise page with task boxes, rules and signature lines", cost: "The cost worksheet with empty fields" },
    forHeading: "Who it is for",
    forItems: [
      "Parents whose child keeps asking for a pet and who want the conversation to be about facts and daily routine, not only about wishes.",
      "Families that have not decided yet and would like a calm, structured way to find out whether a pet fits their life.",
      "Grandparents, aunts and uncles who want to give a child something real to work toward, without handing over an animal.",
    ],
    notHeading: "What it is not",
    notItems: [
      "It is not a test and it gives no score. It cannot tell you whether your child is ready.",
      "It contains no health advice and no breed rules. For those, ask a vet or a shelter.",
      "It does not promise that a pet is the right decision. “Not yet” is a good answer too.",
    ],
    giftText: "Looking for a gift instead? The 12-week PetPrep challenge can be given as a voucher.",
    giftLink: "See the gift voucher",
    faqHeading: "Questions",
    faq: [
      { q: "Is it for dogs or for cats?", a: "For any pet. The kit is general: it asks about time, money, space and the long term, not about one species or breed." },
      { q: "Do I need the PetPrep app?", a: "No. The kit is paper only and works on its own. The last page mentions the app as one possible next step." },
      { q: "How do I print it?", a: "It is a standard A4 PDF. Print the whole kit, or only the pages you need. Weekly chart pages can be printed again if you want another month." },
      { q: "What do I get when I buy?", a: "A download with the Slovenian and the English PDF, eleven pages each." },
      { q: "Is any data collected from my family?", a: "The kit itself collects nothing: it is a PDF you fill in with a pen. At checkout the shop handles your payment details and e-mail address." },
      { q: "Can I share the file?", a: "Please print as many copies as your own family needs, but do not share or resell the file." },
    ],
  },
  sl: {
    eyebrow: "Natisljivi komplet",
    title: "Obljuba o ljubljenčku",
    lead: "Preden ljubljenček pride domov, obljubo zapišite na papir. Enajst strani A4 za vašo družino: pogovor, dogovor s podpisi, štiritedenski preizkus za obkljukavanje in list s stroški za izpolnitev.",
    metaTitle: "Obljuba o ljubljenčku: natisljivi družinski dogovor, preden dobite žival | PetPrep",
    metaDescription: "Natisljivi komplet A4 za družine, ki razmišljajo o ljubljenčku: deset vprašanj za pogovor, obljuba za podpis, tabela nalog za štiri tedne, list s stroški in kontrolni seznam za starše.",
    breadcrumb: "Obljuba o ljubljenčku",
    price: "6,90 €",
    priceNote: "Enkratni nakup, prenos PDF v slovenščini in angleščini. Plačilo in račun uredi Lemon Squeezy.",
    buy: "Kupite komplet",
    sample: "Prejmite brezplačno vzorčno stran",
    sampleHeading: "Najprej preizkusite stran z obljubo",
    sampleText: "Sama Obljuba o ljubljenčku kot brezplačna stran A4: dogovor med otrokom in odraslimi z vsakodnevnimi nalogami, vašimi pravili in prostorom za podpise vseh. Vpišete svoj e-naslov in privolite, da vas obveščamo; PDF prejmete ob zaključku.",
    sampleNote: "Vaš e-naslov uporabimo samo za to, s čimer privolite ob zaključku nakupa.",
    insideHeading: "Kaj je v kompletu",
    insideIntro: "Natisnite toliko izvodov, kot jih potrebujete. Vse se izpolni na roke, zato se podatki o vašem otroku nikamor ne vpisujejo in nikamor ne pošiljajo.",
    previewHeading: "Pogled na tri strani",
    previewAlt: { cover: "Naslovnica kompleta Obljuba o ljubljenčku z maskoto Curio", promise: "Stran Obljuba o ljubljenčku s poljami za naloge, pravili in črtami za podpise", cost: "Delovni list s stroški s praznimi polji" },
    forHeading: "Za koga je",
    forItems: [
      "Za starše, katerih otrok vztrajno prosi za ljubljenčka in ki želite, da se pogovor vrti okoli dejstev in vsakdana, ne samo okoli želja.",
      "Za družine, ki se še niste odločile in bi radi mirno in urejeno ugotovile, ali ljubljenček ustreza vašemu življenju.",
      "Za stare starše, tete in strice, ki želijo otroku dati nekaj resničnega, k čemur lahko stremi, ne da bi mu izročili žival.",
    ],
    notHeading: "Česa ni",
    notItems: [
      "Ni preizkus in ne daje ocene. Ne more povedati, ali je vaš otrok pripravljen.",
      "Ne vsebuje zdravstvenih nasvetov ne pravil posameznih pasem. Za to vprašajte veterinarja ali zavetišče.",
      "Ne obljublja, da je ljubljenček prava odločitev. Tudi »še ne« je dober odgovor.",
    ],
    giftText: "Iščete darilo? 12-tedenski izziv PetPrep lahko podarite z bonom.",
    giftLink: "Poglejte darilni bon",
    faqHeading: "Vprašanja",
    faq: [
      { q: "Je za pse ali za mačke?", a: "Za vsakega ljubljenčka. Komplet je splošen: sprašuje o času, denarju, prostoru in dolgoročni obvezi, ne o eni vrsti ali pasmi." },
      { q: "Ali potrebujem aplikacijo PetPrep?", a: "Ne. Komplet je samo na papirju in deluje sam zase. Zadnja stran aplikacijo omeni kot en možen naslednji korak." },
      { q: "Kako ga natisnem?", a: "Je običajen PDF v formatu A4. Natisnete lahko celoten komplet ali samo strani, ki jih potrebujete. Tedenske tabele lahko natisnete znova, če želite še en mesec." },
      { q: "Kaj dobim ob nakupu?", a: "Prenos s slovenskim in angleškim PDF, vsak z enajstimi stranmi." },
      { q: "Ali se o moji družini zbirajo podatki?", a: "Komplet sam ne zbira ničesar: je PDF, ki ga izpolnite s pisalom. Ob nakupu podatke o plačilu in e-naslov obdela spletna trgovina." },
      { q: "Ali lahko datoteko delim?", a: "Natisnite toliko izvodov, kolikor jih potrebuje vaša družina, datoteke pa, prosimo, ne delite naprej in ne prodajajte." },
    ],
  },
};
