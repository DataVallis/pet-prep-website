import type { PartnerLocalePack } from "../partners.ts";

/** Norsk bokmål (M6-S08). */
export const nb: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Forespørsel om samarbeid",
      intro: "Fortell oss hvem du er og hva du har i tankene. Vi svarer personlig, vanligvis i løpet av noen få virkedager. Vi sender ingen automatiske e-poster.",
      company: "Virksomhet eller organisasjon",
      contactName: "Kontaktperson",
      email: "E-postadresse",
      type: "Type samarbeid",
      typePlaceholder: "Velg …",
      message: "Melding",
      messageHint: "En kort beskrivelse av ideen din, landet og tidsrammen.",
      types: {
        series: "Sponsing av serien «12 Weeks»",
        sponsored_content: "Sponset innhold på petprep.si",
        insurer: "Forsikringsselskap (formidling av kontakter er under forberedelse)",
        directory: "Grunnleggende partner i katalogen",
        shelter: "Dyrehjem eller forening",
        other: "Annet",
      },
      consentBefore: "Jeg samtykker til at PetPrep behandler opplysningene i dette skjemaet for å svare på forespørselen min, slik det er beskrevet i ",
      consentLink: "personvernerklæringen",
      consentAfter: ".",
      submit: "Send forespørsel",
      sending: "Sender …",
      successTitle: "Takk, forespørselen din er mottatt.",
      successText: "Vi svarer deg på e-post.",
      errors: {
        company: "Oppgi virksomhet eller organisasjon.",
        contact_name: "Oppgi en kontaktperson.",
        email: "Skriv inn en gyldig e-postadresse.",
        type: "Velg en type samarbeid.",
        message: "Skriv en kort melding.",
        consent: "Vi trenger samtykket ditt for å sende skjemaet.",
      },
      rateLimited: "Du har allerede sendt flere forespørsler. Prøv igjen om noen minutter.",
      invalid: "Noe i skjemaet er ikke riktig. Sjekk de markerte feltene.",
      fallbackBefore: "Skjemaet kan ikke sendes akkurat nå. Skriv til oss på ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Tall",
      intro: "Vi oppgir bare det som kan kontrolleres i produktet. Status per {date}.",
      breeds: "raser i dyreleksikonet",
      breedsNote: "{dogs} hunderaser og {cats} kattraser, hver med sin egen side og oppgitte kilder.",
      languages: "språk på nettstedet",
      languagesNote: "Appen finnes i dag på slovensk og engelsk.",
    },
  },
  kit: {
    htmlLang: "nb",
    company: "PetPrep (selskap under stiftelse)",
    title: "Pressemappe",
    tagline: "Klar for et dyr. Der for det hele livet.",
    what: {
      heading: "Hva PetPrep er",
      paragraphs: [
        "PetPrep er en app med et dyreleksikon som hjelper en familie med å forberede seg på en hund eller katt før den flytter inn. I en utfordring på 12 uker tar barnet seg av et realistisk KI-kjæledyr, mens forelderen ser i en oversikt hvordan stellet faktisk går.",
        "Raseleksikonet forklarer hva hvert dyr trenger, med oppgitte kilder. Hvert tall kan spores til en kilde, og alt partnerinnhold er merket.",
      ],
    },
    audience: {
      heading: "Målgruppe",
      paragraphs: [
        "Familier rett før de bestemmer seg for et kjæledyr, og voksne som vil teste om en bestemt rase virkelig passer for dem. Leseren vet allerede hvilken art og rase vedkommende undersøker, så oppmerksomheten er konkret.",
      ],
    },
    coop: {
      heading: "Samarbeidsformer",
      items: [
        ["Sponsing av serien «12 Weeks»", "Sponsoren nevnes i episoden og beskrivelsen. Sponsoren redigerer ikke serien."],
        ["Sponset innhold på petprep.si", "Et merket innlegg ved siden av en raseside eller i kunnskapsbasen, uten innflytelse på innhold og kilder."],
        ["Forsikringsselskaper", "Fast sponsing eller betaling per formidlet kontakt. Kontakt bare med forelderens uttrykkelige samtykke. Formidling av kontakter er under forberedelse."],
        ["Grunnleggende partner i katalogen", "Veterinærer, hundeskoler, hundefrisører, oppdrettere: en fremhevet oppføring. 190 € i året, fast pris, antall plasser begrenset per land."],
        ["Dyrehjem og foreninger", "En gratis oppføring og mulighet til å anbefale PetPrep til dem som adopterer."],
      ],
    },
    examples: {
      heading: "Eksempler på innhold",
      items: [
        ["Appen", "En utfordring på 12 uker med et realistisk KI-kjæledyr og en oversikt for foreldre."],
        ["Raseleksikon", "{breeds} raser ({dogs} hunder, {cats} katter) med kilder, status per {date}."],
        ["Serien «12 Weeks»", "En videoserie som følger 12 uker med kjæledyrstell; et sted for omtale av en sponsor."],
      ],
    },
    never: {
      heading: "Hva vi ikke gjør",
      text: "Annonser i barneappen, salg av data, helseløfter og markedsføring av raser som veterinærforeninger fraråder å reklamere for.",
    },
    contact: { heading: "Kontakt", text: "Skriv til oss på {email} eller bruk skjemaet på {url}." },
    page: "Side",
  },
  page: {
    meta: {
      title: "Partnere og sponsorer – samarbeid med PetPrep",
      description:
        "Sponsing av serien «12 Weeks», sponset innhold, forsikringsselskaper, grunnleggende partnere i katalogen samt dyrehjem og foreninger. Alt er merket, uten innflytelse på innhold og kilder.",
    },
    eyebrow: "Partnere og sponsorer",
    title: "Nå familier rett før de bestemmer seg for et dyr.",
    lead:
      "PetPrep er en app og et raseleksikon der en familie forbereder seg før den tar med seg en hund eller katt hjem. Vi leter etter partnere som bryr seg om ansvarlig dyrehold og som gjerne vil si det åpent, med et tydelig merket samarbeid.",
    blocks: [
      {
        type: "prose",
        heading: "Hvem PetPrep er for",
        paragraphs: [
          "PetPrep henvender seg til familier rett før de bestemmer seg for et kjæledyr, og til voksne som vil teste om en bestemt rase virkelig passer for dem. Leseren vår søker ikke i blinde: Vedkommende vet allerede hvilken art og rase det gjelder, og leser i [dyreleksikonet](page:animals) hva dyret trenger, med oppgitte kilder.",
          "For en partner er dette et sjeldent øyeblikk. Beslutningen er ikke tatt ennå, men interessen er konkret. Derfor er det viktig for oss at hvert samarbeid er tydelig merket og aldri endrer det familiene leser.",
        ],
      },
      {
        type: "cards",
        heading: "Slik kan vi samarbeide",
        columns: 3,
        items: [
          { title: "Sponsing av serien «12 Weeks»", text: "Serien følger 12 uker med kjæledyrstell. Sponsoren nevnes i episoden og beskrivelsen; sponsoren redigerer ikke serien." },
          { title: "Sponset innhold på petprep.si", text: "Et innlegg ved siden av en raseside eller i kunnskapsbasen. Det er alltid merket som sponset, og sponsoren har ingen innflytelse på siden eller kildene som oppgis." },
          { title: "Forsikringsselskaper", text: "Betaling per formidlet kontakt eller en fast sponsing. Vi gir bare en kontakt videre med forelderens uttrykkelige samtykke, og aldri opplysninger om et barn. Formidling av kontakter er under forberedelse og ikke tilgjengelig ennå." },
          { title: "Grunnleggende partner i katalogen", text: "For veterinærer, hundeskoler, hundefrisører og oppdrettere: en fremhevet oppføring med logo, beskrivelse og lenke. 190 € i året; prisen er låst for grunnleggende partnere. Antall plasser er begrenset per land." },
          { title: "Dyrehjem og foreninger", text: "Oppføringen er gratis. Du kan anbefale PetPrep til dem som adopterer, slik at de er bedre forberedt når dyret kommer." },
        ],
      },
      {
        type: "list",
        heading: "Hva vi ikke gjør",
        items: [
          "Vi viser ikke annonser i barneappen.",
          "Vi selger ikke data.",
          "Vi gir ikke helseløfter.",
          "Vi markedsfører ikke raser som veterinærforeninger fraråder å reklamere for.",
          "Vi lar aldri en sponsor påvirke innhold eller kilder.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Pressemappe",
        intro: "En kort oversikt over PetPrep for partnere og medier: hva PetPrep er, hvem det er for, samarbeidsformer og eksempler på innhold.",
        items: [
          { href: "/media/petprep-media-kit-nb.pdf", label: "Pressemappe (norsk)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Pressemappe (engelsk)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
