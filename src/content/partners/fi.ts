import type { PartnerLocalePack } from "../partners.ts";

/** Suomi (M6-S08). */
export const fi: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Yhteistyökysely",
      intro: "Kerro, keitä olet ja mitä sinulla on mielessä. Vastaamme henkilökohtaisesti, yleensä muutaman arkipäivän kuluessa. Emme lähetä automaattisia sähköposteja.",
      company: "Yritys tai organisaatio",
      contactName: "Yhteyshenkilö",
      email: "Sähköpostiosoite",
      type: "Yhteistyön muoto",
      typePlaceholder: "Valitse…",
      message: "Viesti",
      messageHint: "Lyhyt kuvaus ideastasi, maasta ja aikataulusta.",
      types: {
        series: "”12 Weeks”-sarjan sponsorointi",
        sponsored_content: "Sponsoroitu sisältö petprep.si-sivustolla",
        insurer: "Vakuutusyhtiö (yhteystietojen välitys valmisteilla)",
        directory: "Hakemiston perustajakumppani",
        shelter: "Eläinsuojelu- tai kodinvälitysyhdistys",
        other: "Muu",
      },
      consentBefore: "Hyväksyn, että PetPrep käsittelee tämän lomakkeen tiedot vastatakseen kyselyyni ",
      consentLink: "tietosuojaselosteen",
      consentAfter: " mukaisesti.",
      submit: "Lähetä kysely",
      sending: "Lähetetään…",
      successTitle: "Kiitos, kyselysi on vastaanotettu.",
      successText: "Vastaamme sähköpostitse.",
      errors: {
        company: "Kirjoita yrityksen tai organisaation nimi.",
        contact_name: "Kirjoita yhteyshenkilö.",
        email: "Kirjoita kelvollinen sähköpostiosoite.",
        type: "Valitse yhteistyön muoto.",
        message: "Kirjoita lyhyt viesti.",
        consent: "Lomakkeen lähettäminen edellyttää suostumustasi.",
      },
      rateLimited: "Olet jo lähettänyt useita kyselyjä. Yritä uudelleen muutaman minuutin kuluttua.",
      invalid: "Lomakkeessa on jotain korjattavaa. Tarkista merkityt kentät.",
      fallbackBefore: "Lomaketta ei voi juuri nyt lähettää. Kirjoita meille osoitteeseen ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Luvut",
      intro: "Kerromme vain sen, minkä voi tarkistaa tuotteesta. Tilanne {date}.",
      breeds: "rotua eläinhakemistossa",
      breedsNote: "{dogs} koirarotua ja {cats} kissarotua, kullakin oma sivunsa ja mainitut lähteet.",
      languages: "verkkosivuston kieltä",
      languagesNote: "Sovellus on tällä hetkellä sloveniaksi ja englanniksi.",
    },
  },
  kit: {
    htmlLang: "fi",
    company: "PetPrep (yritys perustamisvaiheessa)",
    title: "Lehdistöpaketti",
    tagline: "Valmiina lemmikkiä varten. Rinnalla koko sen elämän.",
    what: {
      heading: "Mikä PetPrep on",
      paragraphs: [
        "PetPrep on sovellus ja eläinhakemisto, jonka avulla perhe valmistautuu koiraan tai kissaan ennen sen kotiin tuloa. 12 viikon haasteessa lapsi hoitaa realistista tekoälylemmikkiä, ja vanhempi näkee ohjausnäkymästä, miten hoito oikeasti sujuu.",
        "Rotuhakemisto kertoo, mitä kukin eläin tarvitsee, lähteineen. Jokainen luku on jäljitettävissä lähteeseen, ja jokainen kumppanisisältö on merkitty.",
      ],
    },
    audience: {
      heading: "Yleisö",
      paragraphs: [
        "Perheet juuri ennen lemmikkipäätöstä ja aikuiset, jotka haluavat testata, sopiiko tietty rotu heille todella. Lukija tietää jo, mitä lajia ja rotua hän selvittää, joten huomio on konkreettista.",
      ],
    },
    coop: {
      heading: "Yhteistyön muodot",
      items: [
        ["”12 Weeks”-sarjan sponsorointi", "Sponsori mainitaan jaksossa ja sen kuvauksessa. Sponsori ei muokkaa sarjan sisältöä."],
        ["Sponsoroitu sisältö petprep.si-sivustolla", "Merkitty kirjoitus rotusivun vieressä tai tietopankissa, ilman vaikutusta sisältöön tai lähteisiin."],
        ["Vakuutusyhtiöt", "Kiinteä sponsorointi tai maksu välitetystä yhteydenotosta. Yhteystieto vain vanhemman nimenomaisella suostumuksella. Yhteystietojen välitys on valmisteilla."],
        ["Hakemiston perustajakumppani", "Eläinlääkärit, koirakoulut, koirien trimmaajat, kasvattajat: korostettu merkintä. 190 € vuodessa, hinta lukittu, paikkoja rajoitetusti maata kohti."],
        ["Eläinsuojelu- ja kodinvälitysyhdistykset", "Maksuton merkintä ja mahdollisuus suositella PetPrepiä lemmikin adoptoijille."],
      ],
    },
    examples: {
      heading: "Esimerkkejä sisällöstä",
      items: [
        ["Sovellus", "12 viikon haaste realistisella tekoälylemmikillä ja vanhempien ohjausnäkymä."],
        ["Rotuhakemisto", "{breeds} rotua ({dogs} koiraa, {cats} kissaa) lähteineen, tilanne {date}."],
        ["”12 Weeks”-sarja", "Videosarja, joka seuraa 12 viikon lemmikinhoitoa; paikka sponsorin maininnalle."],
      ],
    },
    never: {
      heading: "Mitä emme tee",
      text: "Emme näytä mainoksia lasten sovelluksessa, myy tietoja, anna terveyslupauksia emmekä mainosta rotuja, joiden mainontaa eläinlääkäriyhdistykset eivät suosittele.",
    },
    contact: { heading: "Yhteystiedot", text: "Kirjoita meille osoitteeseen {email} tai käytä lomaketta osoitteessa {url}." },
    page: "Sivu",
  },
  page: {
    meta: {
      title: "Kumppanit ja sponsorit – tee yhteistyötä PetPrepin kanssa",
      description:
        "”12 Weeks”-sarjan sponsorointi, sponsoroitu sisältö, vakuutusyhtiöt, hakemiston perustajakumppanit sekä eläinsuojelu- ja kodinvälitysyhdistykset. Kaikki merkitty, ilman vaikutusta sisältöön tai lähteisiin.",
    },
    eyebrow: "Kumppanit ja sponsorit",
    title: "Tavoita perheet juuri ennen kuin ne päättävät lemmikistä.",
    lead:
      "PetPrep on sovellus ja rotuhakemisto, jossa perhe valmistautuu ennen kuin tuo kotiin koiran tai kissan. Etsimme kumppaneita, joille vastuullinen lemmikinotto on tärkeää ja jotka haluavat sanoa sen avoimesti, yhteistyö selvästi merkittynä.",
    blocks: [
      {
        type: "prose",
        heading: "Kenelle PetPrep on tarkoitettu",
        paragraphs: [
          "PetPrep puhuttelee perheitä juuri ennen lemmikkipäätöstä sekä aikuisia, jotka haluavat testata, sopiiko tietty rotu heille todella. Lukijamme ei etsi umpimähkään: hän tietää jo, mitä lajia ja rotua hän selvittää, ja lukee [eläinhakemistosta](page:animals), mitä kyseinen eläin tarvitsee, lähteineen.",
          "Kumppanille tämä on harvinainen hetki. Päätöstä ei ole vielä tehty, mutta kiinnostus on konkreettista. Siksi meille on tärkeää, että jokainen yhteistyö on selvästi merkitty eikä koskaan muuta sitä, mitä perheet lukevat.",
        ],
      },
      {
        type: "cards",
        heading: "Näin voimme tehdä yhteistyötä",
        columns: 3,
        items: [
          { title: "”12 Weeks”-sarjan sponsorointi", text: "Sarja seuraa 12 viikon lemmikinhoitoa. Sponsori mainitaan jaksossa ja sen kuvauksessa; sponsori ei muokkaa sarjan sisältöä." },
          { title: "Sponsoroitu sisältö petprep.si-sivustolla", text: "Kirjoitus rotusivun vieressä tai tietopankissa. Se on aina merkitty sponsoroiduksi, eikä sponsorilla ole vaikutusta sivuun tai sen mainittuihin lähteisiin." },
          { title: "Vakuutusyhtiöt", text: "Maksu välitetystä yhteydenotosta tai kiinteä sponsorointi. Välitämme yhteystiedon vain vanhemman nimenomaisella suostumuksella emmekä koskaan lapsen tietoja. Yhteystietojen välitys on valmisteilla eikä vielä käytettävissä." },
          { title: "Hakemiston perustajakumppani", text: "Eläinlääkäreille, koirakouluille, koirien trimmaajille ja kasvattajille: korostettu merkintä logon, kuvauksen ja linkin kanssa. 190 € vuodessa; hinta on lukittu perustajakumppaneille. Paikkoja on rajoitetusti maata kohti." },
          { title: "Eläinsuojelu- ja kodinvälitysyhdistykset", text: "Merkintä on maksuton. Voit suositella PetPrepiä adoptoijille, jotta he ovat paremmin valmistautuneita eläimen tuloon." },
        ],
      },
      {
        type: "list",
        heading: "Mitä emme tee",
        items: [
          "Emme näytä mainoksia lasten sovelluksessa.",
          "Emme myy tietoja.",
          "Emme anna terveyslupauksia.",
          "Emme mainosta rotuja, joiden mainontaa eläinlääkäriyhdistykset eivät suosittele.",
          "Emme koskaan anna sponsorin vaikuttaa sisältöön tai lähteisiin.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Lehdistöpaketti",
        intro: "Lyhyt katsaus PetPrepiin kumppaneille ja medialle: mikä PetPrep on, kenelle se on tarkoitettu, yhteistyön muodot ja esimerkkejä sisällöstä.",
        items: [
          { href: "/media/petprep-media-kit-fi.pdf", label: "Lehdistöpaketti (suomi)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Lehdistöpaketti (englanti)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
