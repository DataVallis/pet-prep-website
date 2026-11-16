import type { PartnerLocalePack } from "../partners.ts";

/** Nederlands (M6-S08). Partners worden met u aangesproken. */
export const nl: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Aanvraag voor samenwerking",
      intro: "Vertel ons wie u bent en wat u in gedachten hebt. We antwoorden persoonlijk, meestal binnen enkele werkdagen. We sturen geen automatische e-mails.",
      company: "Bedrijf of organisatie",
      contactName: "Contactpersoon",
      email: "E-mailadres",
      type: "Soort samenwerking",
      typePlaceholder: "Maak een keuze…",
      message: "Bericht",
      messageHint: "Een korte beschrijving van uw idee, het land en de planning.",
      types: {
        series: "Sponsoring van de serie „12 Weeks”",
        sponsored_content: "Gesponsorde content op petprep.si",
        insurer: "Verzekeraar (doorverwijzing van contacten in voorbereiding)",
        directory: "Oprichtingspartner in de gids",
        shelter: "Asiel of vereniging",
        other: "Anders",
      },
      consentBefore: "Ik ga ermee akkoord dat PetPrep de gegevens uit dit formulier verwerkt om mijn aanvraag te beantwoorden, zoals beschreven in het ",
      consentLink: "privacybeleid",
      consentAfter: ".",
      submit: "Aanvraag versturen",
      sending: "Bezig met versturen…",
      successTitle: "Bedankt, uw aanvraag is binnen.",
      successText: "We antwoorden u per e-mail.",
      errors: {
        company: "Vul uw bedrijf of organisatie in.",
        contact_name: "Vul een contactpersoon in.",
        email: "Vul een geldig e-mailadres in.",
        type: "Kies een soort samenwerking.",
        message: "Schrijf een kort bericht.",
        consent: "Om het formulier te versturen is uw toestemming nodig.",
      },
      rateLimited: "U hebt al meerdere aanvragen verstuurd. Probeer het over een paar minuten opnieuw.",
      invalid: "Er klopt iets niet in het formulier. Controleer de gemarkeerde velden.",
      fallbackBefore: "Het formulier kan op dit moment niet worden verstuurd. Schrijf ons dan op ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Cijfers",
      intro: "We noemen alleen wat in het product te controleren is. Stand per {date}.",
      breeds: "rassen in het dierenregister",
      breedsNote: "{dogs} hondenrassen en {cats} kattenrassen, elk met een eigen pagina en genoemde bronnen.",
      languages: "talen van de website",
      languagesNote: "De app is op dit moment beschikbaar in het Sloveens en Engels.",
    },
  },
  kit: {
    htmlLang: "nl",
    company: "PetPrep (in oprichting)",
    title: "Perskit",
    tagline: "Klaar voor een huisdier. Er zijn, een heel leven lang.",
    what: {
      heading: "Wat PetPrep is",
      paragraphs: [
        "PetPrep is een app met een dierenregister waarmee een gezin zich voorbereidt op een hond of kat, nog voordat die in huis komt. In een uitdaging van 12 weken zorgt het kind voor een realistisch AI-huisdier, terwijl de ouder in een dashboard ziet hoe de verzorging echt verloopt.",
        "Het rassenregister legt uit wat elk dier nodig heeft, met bronvermelding. Elk getal is terug te voeren op een bron en elke partnerinhoud is als zodanig gemarkeerd.",
      ],
    },
    audience: {
      heading: "Doelgroep",
      paragraphs: [
        "Gezinnen vlak voor de beslissing over een huisdier en volwassenen die willen testen of een bepaald ras echt bij hen past. De lezer weet al welke soort en welk ras hij bekijkt, dus de aandacht is concreet.",
      ],
    },
    coop: {
      heading: "Vormen van samenwerking",
      items: [
        ["Sponsoring van de serie „12 Weeks”", "De sponsor wordt genoemd in de aflevering en de beschrijving. De sponsor bepaalt niets aan de inhoud van de serie."],
        ["Gesponsorde content op petprep.si", "Een als zodanig gemarkeerd artikel naast een rassenpagina of in de kennisbank, zonder invloed op inhoud of bronnen."],
        ["Verzekeraars", "Vaste sponsoring of betaling per doorgegeven contact. Alleen contact met uitdrukkelijke toestemming van een ouder. Het doorgeven van contacten is in voorbereiding."],
        ["Oprichtingspartner in de gids", "Dierenartsen, hondenscholen, trimsalons, fokkers: een uitgelichte vermelding. € 190 per jaar, vaste prijs, beperkt aantal plekken per land."],
        ["Asielen en verenigingen", "Een gratis vermelding en de mogelijkheid om PetPrep aan adoptanten aan te bevelen."],
      ],
    },
    examples: {
      heading: "Voorbeelden van inhoud",
      items: [
        ["De app", "Een uitdaging van 12 weken met een realistisch AI-huisdier en een dashboard voor ouders."],
        ["Rassenregister", "{breeds} rassen ({dogs} honden, {cats} katten) met bronnen, stand per {date}."],
        ["Serie „12 Weeks”", "Een videoserie die 12 weken huisdierverzorging volgt; een plek voor de vermelding van een sponsor."],
      ],
    },
    never: {
      heading: "Wat we niet doen",
      text: "Geen advertenties in de kinderapp, geen verkoop van gegevens, geen gezondheidsbeloften en geen promotie van rassen waarvoor dierenartsenorganisaties afraden te adverteren.",
    },
    contact: { heading: "Contact", text: "Schrijf ons op {email} of gebruik het formulier op {url}." },
    page: "Pagina",
  },
  page: {
    meta: {
      title: "Partners en sponsors – werk samen met PetPrep",
      description:
        "Sponsoring van de serie „12 Weeks”, gesponsorde content, verzekeraars, oprichtingspartners in de gids, asielen en verenigingen. Altijd gemarkeerd, zonder invloed op inhoud of bronnen.",
    },
    eyebrow: "Partners en sponsors",
    title: "Bereik gezinnen vlak voordat ze over een huisdier beslissen.",
    lead:
      "PetPrep is een app en rassenregister waarmee een gezin zich voorbereidt voordat er een hond of kat in huis komt. We zoeken partners die verantwoord huisdierbezit belangrijk vinden en dat openlijk willen zeggen, met een samenwerking die duidelijk gemarkeerd is.",
    blocks: [
      {
        type: "prose",
        heading: "Voor wie PetPrep is",
        paragraphs: [
          "PetPrep richt zich op gezinnen vlak voor de beslissing over een huisdier en op volwassenen die willen testen of een bepaald ras echt bij hen past. Onze lezer zoekt niet in het wilde weg: die weet al welke soort en welk ras hij bekijkt en leest in de [dierenencyclopedie](page:animals) wat dat dier nodig heeft, met bronvermelding.",
          "Voor een partner is dit een zeldzaam moment. De beslissing is nog niet genomen, maar de interesse is concreet. Daarom vinden we het belangrijk dat elke samenwerking duidelijk gemarkeerd is en nooit verandert wat gezinnen lezen.",
        ],
      },
      {
        type: "cards",
        heading: "Manieren om samen te werken",
        columns: 3,
        items: [
          { title: "Sponsoring van de serie „12 Weeks”", text: "De serie volgt 12 weken huisdierverzorging. De sponsor wordt genoemd in de aflevering en de beschrijving; de sponsor bepaalt niets aan de inhoud van de serie." },
          { title: "Gesponsorde content op petprep.si", text: "Een artikel naast een rassenpagina of in de kennisbank. Het is altijd als gesponsord gemarkeerd en de sponsor heeft geen invloed op de pagina of de genoemde bronnen." },
          { title: "Verzekeraars", text: "Betaling per doorgegeven contact, of een vaste sponsoring. We geven alleen een contact door met uitdrukkelijke toestemming van een ouder en nooit gegevens van een kind. Het doorgeven van contacten is in voorbereiding en nog niet beschikbaar." },
          { title: "Oprichtingspartner in de gids", text: "Voor dierenartsen, hondenscholen, trimsalons en fokkers: een uitgelichte vermelding met logo, beschrijving en link. € 190 per jaar; de prijs ligt vast voor oprichtingspartners. Het aantal plekken is beperkt per land." },
          { title: "Asielen en verenigingen", text: "Een vermelding is gratis. U kunt PetPrep aanbevelen aan adoptanten, zodat zij beter voorbereid zijn op de komst van het dier." },
        ],
      },
      {
        type: "list",
        heading: "Wat we niet doen",
        items: [
          "We tonen geen advertenties in de kinderapp.",
          "We verkopen geen gegevens.",
          "We doen geen gezondheidsbeloften.",
          "We promoten geen rassen waarvoor dierenartsenorganisaties afraden te adverteren.",
          "We laten een sponsor nooit invloed uitoefenen op inhoud of bronnen.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Perskit",
        intro: "Een kort overzicht van PetPrep voor partners en media: wat PetPrep is, voor wie het is, vormen van samenwerking en voorbeelden van inhoud.",
        items: [
          { href: "/media/petprep-media-kit-nl.pdf", label: "Perskit (Nederlands)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Perskit (Engels)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
