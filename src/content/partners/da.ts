import type { PartnerLocalePack } from "../partners.ts";

/** Dansk (M6-S08). */
export const da: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Forespørgsel om samarbejde",
      intro: "Fortæl os, hvem du er, og hvad du har i tankerne. Vi svarer personligt, som regel inden for få hverdage. Vi sender ingen automatiske e-mails.",
      company: "Virksomhed eller organisation",
      contactName: "Kontaktperson",
      email: "E-mailadresse",
      type: "Type samarbejde",
      typePlaceholder: "Vælg …",
      message: "Besked",
      messageHint: "En kort beskrivelse af din idé, land og tidsplan.",
      types: {
        series: "Sponsorering af serien »12 Weeks«",
        sponsored_content: "Sponsoreret indhold på petprep.si",
        insurer: "Forsikringsselskab (formidling af kontakter under forberedelse)",
        directory: "Stiftende partner i kataloget",
        shelter: "Dyreinternat eller forening",
        other: "Andet",
      },
      consentBefore: "Jeg accepterer, at PetPrep behandler oplysningerne i formularen for at besvare min forespørgsel, som beskrevet i ",
      consentLink: "privatlivspolitikken",
      consentAfter: ".",
      submit: "Send forespørgsel",
      sending: "Sender …",
      successTitle: "Tak, din forespørgsel er modtaget.",
      successText: "Vi svarer dig på e-mail.",
      errors: {
        company: "Angiv virksomhed eller organisation.",
        contact_name: "Angiv en kontaktperson.",
        email: "Angiv en gyldig e-mailadresse.",
        type: "Vælg en type samarbejde.",
        message: "Skriv en kort besked.",
        consent: "Vi skal bruge dit samtykke for at sende formularen.",
      },
      rateLimited: "Du har allerede sendt flere forespørgsler. Prøv igen om nogle minutter.",
      invalid: "Noget i formularen er ikke i orden. Tjek de markerede felter.",
      fallbackBefore: "Formularen kan ikke sendes lige nu. Skriv til os på ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Tal",
      intro: "Vi angiver kun det, der kan kontrolleres i produktet. Status pr. {date}.",
      breeds: "{n|one=race|other=racer} i dyreleksikonet",
      breedsNote: "{dogs} {dogs|one=hunderace|other=hunderacer} og {cats} {cats|one=katterace|other=katteracer}, hver med sin egen side og angivne kilder.",
      languages: "sprog på hjemmesiden",
      languagesNote: "Appen findes i dag på slovensk og engelsk.",
    },
  },
  kit: {
    htmlLang: "da",
    company: "PetPrep (selskab under stiftelse)",
    title: "Pressemappe",
    tagline: "Klar til et dyr. Der for det hele livet.",
    what: {
      heading: "Hvad PetPrep er",
      paragraphs: [
        "PetPrep er en app med et dyreleksikon, der hjælper en familie med at forberede sig på en hund eller kat, før den flytter ind. I en 12 uger lang udfordring passer barnet et realistisk AI-kæledyr, mens forælderen i et overblik kan se, hvordan plejen virkelig går.",
        "Dyreleksikonet forklarer, hvad hvert dyr har brug for, med angivne kilder. Hvert tal kan spores til en kilde, og alt partnerindhold er mærket.",
      ],
    },
    audience: {
      heading: "Målgruppe",
      paragraphs: [
        "Familier lige før de beslutter sig for et kæledyr og voksne, der vil prøve, om en bestemt race virkelig passer til dem. Læseren ved allerede, hvilken art og race vedkommende undersøger, så opmærksomheden er konkret.",
      ],
    },
    coop: {
      heading: "Samarbejdsformer",
      items: [
        ["Sponsorering af serien »12 Weeks«", "Sponsoren nævnes i afsnittet og i beskrivelsen. Sponsoren redigerer ikke serien."],
        ["Sponsoreret indhold på petprep.si", "Et mærket indlæg ved siden af en racceside eller i vidensbasen, uden indflydelse på indhold og kilder."],
        ["Forsikringsselskaber", "Fast sponsorat eller betaling pr. formidlet kontakt. Kontakt kun med forælderens udtrykkelige samtykke. Formidling af kontakter er under forberedelse."],
        ["Stiftende partner i kataloget", "Dyrlæger, hundeskoler, hundefrisører, opdrættere: en fremhævet omtale. 190 € om året, fast pris, antallet af pladser er begrænset pr. land."],
        ["Dyreinternater og foreninger", "En gratis omtale og mulighed for at anbefale PetPrep til dem, der adopterer."],
      ],
    },
    examples: {
      heading: "Eksempler på indhold",
      items: [
        ["Appen", "En 12 uger lang udfordring med et realistisk AI-kæledyr og et overblik for forældre."],
        ["Dyreleksikon", "{breeds} {breeds|one=race|other=racer} ({dogs} {dogs|one=hund|other=hunde}, {cats} {cats|one=kat|other=katte}) med kilder, status pr. {date}."],
        ["Serien »12 Weeks«", "En videoserie, der følger 12 ugers kæledyrspleje; et sted til omtale af en sponsor."],
      ],
    },
    never: {
      heading: "Hvad vi ikke gør",
      text: "Annoncer i børneappen, salg af data, sundhedsløfter og markedsføring af racer, som dyrlægeforeninger fraråder at reklamere for.",
    },
    contact: { heading: "Kontakt", text: "Skriv til os på {email} eller brug formularen på {url}." },
    page: "Side",
  },
  page: {
    meta: {
      title: "Partnere og sponsorer – samarbejd med PetPrep",
      description:
        "Sponsorering af serien »12 Weeks«, sponsoreret indhold, forsikringsselskaber, stiftende partnere i kataloget samt dyreinternater og foreninger. Alt er mærket, uden indflydelse på indhold og kilder.",
    },
    eyebrow: "Partnere og sponsorer",
    title: "Nå familier lige før de beslutter sig for et dyr.",
    lead:
      "PetPrep er en app og et dyreleksikon med racer, hvor en familie forbereder sig, før den tager en hund eller kat med hjem. Vi leder efter partnere, der går op i ansvarligt dyreejerskab, og som gerne vil sige det åbent, med et tydeligt mærket samarbejde.",
    blocks: [
      {
        type: "prose",
        heading: "Hvem PetPrep er til",
        paragraphs: [
          "PetPrep henvender sig til familier lige før de beslutter sig for et kæledyr og til voksne, der vil prøve, om en bestemt race virkelig passer til dem. Vores læser søger ikke i blinde: Vedkommende ved allerede, hvilken art og race det drejer sig om, og læser i [dyreleksikonet](page:animals), hvad dyret har brug for, med angivne kilder.",
          "For en partner er det et sjældent øjeblik. Beslutningen er ikke truffet endnu, men interessen er konkret. Derfor er det vigtigt for os, at hvert samarbejde er tydeligt mærket og aldrig ændrer det, familierne læser.",
        ],
      },
      {
        type: "cards",
        heading: "Sådan kan vi samarbejde",
        columns: 3,
        items: [
          { title: "Sponsorering af serien »12 Weeks«", text: "Serien følger 12 ugers kæledyrspleje. Sponsoren nævnes i afsnittet og i beskrivelsen; sponsoren redigerer ikke serien." },
          { title: "Sponsoreret indhold på petprep.si", text: "Et indlæg ved siden af en racceside eller i vidensbasen. Det er altid mærket som sponsoreret, og sponsoren har ingen indflydelse på siden eller dens angivne kilder." },
          { title: "Forsikringsselskaber", text: "Betaling pr. formidlet kontakt eller et fast sponsorat. Vi giver kun en kontakt videre med forælderens udtrykkelige samtykke og aldrig et barns oplysninger. Formidling af kontakter er under forberedelse og endnu ikke tilgængelig." },
          { title: "Stiftende partner i kataloget", text: "For dyrlæger, hundeskoler, hundefrisører og opdrættere: en fremhævet omtale med logo, beskrivelse og link. 190 € om året; prisen er fast for stiftende partnere. Antallet af pladser er begrænset pr. land." },
          { title: "Dyreinternater og foreninger", text: "Omtalen er gratis. Du kan anbefale PetPrep til dem, der adopterer, så de er bedre forberedt, når dyret kommer." },
        ],
      },
      {
        type: "list",
        heading: "Hvad vi ikke gør",
        items: [
          "Vi viser ikke annoncer i børneappen.",
          "Vi sælger ikke data.",
          "Vi giver ikke sundhedsløfter.",
          "Vi markedsfører ikke racer, som dyrlægeforeninger fraråder at reklamere for.",
          "Vi lader aldrig en sponsor påvirke indhold eller kilder.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Pressemappe",
        intro: "Et kort overblik over PetPrep til partnere og medier: hvad PetPrep er, hvem det er til, samarbejdsformer og eksempler på indhold.",
        items: [
          { href: "/media/petprep-media-kit-da.pdf", label: "Pressemappe (dansk)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Pressemappe (engelsk)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
