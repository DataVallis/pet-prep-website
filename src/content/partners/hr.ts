import type { PartnerLocalePack } from "../partners.ts";

/** Hrvatski (M6-S08). Poslovno „vi”. */
export const hr: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Upit za suradnju",
      intro: "Recite nam tko ste i što imate na umu. Odgovaramo osobno, obično u nekoliko radnih dana. Automatske e-poruke ne šaljemo.",
      company: "Tvrtka ili organizacija",
      contactName: "Kontakt osoba",
      email: "E-adresa",
      type: "Vrsta suradnje",
      typePlaceholder: "Odaberite…",
      message: "Poruka",
      messageHint: "Kratak opis ideje, države i vremenskog okvira.",
      types: {
        series: "Sponzorstvo serije „12 Weeks“",
        sponsored_content: "Sponzorirani sadržaj na petprep.si",
        insurer: "Osiguravatelj (posredovanje kontakata u pripremi)",
        directory: "Osnivački partner u imeniku",
        shelter: "Sklonište ili udruga",
        other: "Ostalo",
      },
      consentBefore: "Slažem se da PetPrep obrađuje podatke iz ovog obrasca kako bi odgovorio na moj upit, kako je opisano u ",
      consentLink: "pravilima privatnosti",
      consentAfter: ".",
      submit: "Pošalji upit",
      sending: "Šaljem…",
      successTitle: "Hvala, vaš je upit zaprimljen.",
      successText: "Odgovorit ćemo vam e-poštom.",
      errors: {
        company: "Upišite naziv tvrtke ili organizacije.",
        contact_name: "Upišite kontakt osobu.",
        email: "Upišite valjanu e-adresu.",
        type: "Odaberite vrstu suradnje.",
        message: "Napišite kratku poruku.",
        consent: "Za slanje obrasca potreban je vaš pristanak.",
      },
      rateLimited: "Već ste poslali nekoliko upita. Pokušajte ponovno za nekoliko minuta.",
      invalid: "Nešto u obrascu nije u redu. Provjerite označena polja.",
      fallbackBefore: "Obrazac se trenutačno ne može poslati. Pišite nam na ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Brojke",
      intro: "Navodimo samo ono što se može provjeriti u proizvodu. Stanje na dan {date}.",
      breeds: "{n|one=pasmina|few=pasmine|other=pasmina} u enciklopediji životinja",
      breedsNote: "{dogs} {dogs|one=pasmina|few=pasmine|other=pasmina} pasa i {cats} {cats|one=pasmina|few=pasmine|other=pasmina} mačaka, svaka s vlastitom stranicom i navedenim izvorima.",
      languages: "{n|one=jezik|few=jezika|other=jezika} mrežne stranice",
      languagesNote: "Aplikacija je danas na slovenskom i engleskom.",
    },
  },
  kit: {
    htmlLang: "hr",
    company: "PetPrep (tvrtka u osnivanju)",
    title: "Medijski paket",
    tagline: "Spremni za životinju. Uz nju cijeli život.",
    what: {
      heading: "Što je PetPrep",
      paragraphs: [
        "PetPrep je aplikacija s enciklopedijom životinja koja obitelji pomaže da se pripremi za psa ili mačku prije nego što je dovede kući. U 12-tjednom izazovu dijete skrbi o realističnom AI ljubimcu, a roditelj na nadzornoj ploči vidi kako skrb zaista izgleda.",
        "Enciklopedija pasmina objašnjava što pojedina životinja treba, uz navedene izvore. Svaka se brojka može pratiti do izvora, a svaki partnerski sadržaj je označen.",
      ],
    },
    audience: {
      heading: "Publika",
      paragraphs: [
        "Obitelji tik prije odluke o ljubimcu i odrasli koji provjeravaju odgovara li im određena pasmina doista. Čitatelj već zna koju vrstu i pasminu proučava, pa je pozornost konkretna.",
      ],
    },
    coop: {
      heading: "Oblici suradnje",
      items: [
        ["Sponzorstvo serije „12 Weeks“", "Spominjanje sponzora u epizodi i opisu. Sponzor ne uređuje sadržaj serije."],
        ["Sponzorirani sadržaj na petprep.si", "Označen članak uz stranicu pasmine ili u bazi znanja, bez utjecaja na sadržaj i izvore."],
        ["Osiguravatelji", "Fiksno sponzorstvo ili plaćanje po proslijeđenom kontaktu. Kontakt samo uz izričiti pristanak roditelja. Posredovanje kontakata je u pripremi."],
        ["Osnivački partner u imeniku", "Veterinari, škole za pse, frizeri za pse, uzgajivači: istaknut upis. 190 € godišnje, cijena zaključana, broj mjesta ograničen po državi."],
        ["Skloništa i udruge", "Besplatan upis i mogućnost preporuke PetPrepa udomiteljima."],
      ],
    },
    examples: {
      heading: "Primjeri sadržaja",
      items: [
        ["Aplikacija", "12-tjedni izazov s realističnim AI ljubimcem i nadzornom pločom za roditelje."],
        ["Enciklopedija pasmina", "{breeds} {breeds|one=pasmina|few=pasmine|other=pasmina} ({dogs} {dogs|one=pas|few=psa|other=pasa}, {cats} {cats|one=mačka|few=mačke|other=mačaka}) s izvorima, stanje na dan {date}."],
        ["Serija „12 Weeks“", "Videoserija koja prati 12 tjedana skrbi o ljubimcu; prilika za spominjanje sponzora."],
      ],
    },
    never: {
      heading: "Što ne radimo",
      text: "Oglase u dječjoj aplikaciji, prodaju podataka, zdravstvena obećanja i promociju pasmina čije oglašavanje veterinarske udruge ne preporučuju.",
    },
    contact: { heading: "Kontakt", text: "Pišite nam na {email} ili ispunite obrazac na {url}." },
    page: "Stranica",
  },
  page: {
    meta: {
      title: "Partneri i sponzori – surađujte s PetPrepom",
      description:
        "Sponzorstvo serije „12 Weeks“, sponzorirani sadržaj, osiguravatelji, osnivački partneri u imenicima te skloništa i udruge. Sve označeno, bez utjecaja na sadržaj i izvore.",
    },
    eyebrow: "Partneri i sponzori",
    title: "Do obitelji stignite tik prije odluke o životinji.",
    lead:
      "PetPrep je aplikacija i enciklopedija pasmina u kojoj se obitelj priprema prije nego što kući dovede psa ili mačku. Tražimo partnere kojima je stalo do odgovornog uzimanja životinja i koji to znaju reći otvoreno, uz jasno označenu suradnju.",
    blocks: [
      {
        type: "prose",
        heading: "Kome je PetPrep namijenjen",
        paragraphs: [
          "PetPrep dopire do obitelji tik prije odluke o ljubimcu i odrasle koji provjeravaju odgovara li im određena pasmina doista. Naš čitatelj ne traži naslijepo: već zna koju vrstu i pasminu proučava, a u [enciklopediji životinja](page:animals) čita što ta životinja treba, uz navedene izvore.",
          "Za partnera je to rijedak trenutak. Odluka još nije donesena, ali je zanimanje konkretno. Zato nam je važno da je svaka suradnja jasno označena i da nikad ne mijenja ono što obitelji čitaju.",
        ],
      },
      {
        type: "cards",
        heading: "Načini suradnje",
        columns: 3,
        items: [
          { title: "Sponzorstvo serije „12 Weeks“", text: "Serija prati 12 tjedana skrbi o ljubimcu. Sponzor se spominje u epizodi i njezinu opisu; ne uređuje sadržaj serije." },
          { title: "Sponzorirani sadržaj na petprep.si", text: "Članak uz stranicu pasmine ili u bazi znanja. Uvijek je označen kao sponzoriran, a sponzor nema utjecaj na stranicu ni na njezine navedene izvore." },
          { title: "Osiguravatelji", text: "Plaćanje po proslijeđenom kontaktu ili fiksno sponzorstvo. Kontakt prosljeđujemo samo uz izričiti pristanak roditelja i nikad podatke o djetetu. Posredovanje kontakata je u pripremi i još nije dostupno." },
          { title: "Osnivački partner u imeniku", text: "Za veterinare, škole za pse, frizere za pse i uzgajivače: istaknut upis s logotipom, opisom i poveznicom. 190 € godišnje; cijena je za osnivačke partnere zaključana. Broj mjesta ograničen je po državi." },
          { title: "Skloništa i udruge", text: "Upis je besplatan. PetPrep možete preporučivati udomiteljima kako bi bili bolje pripremljeni za dolazak životinje." },
        ],
      },
      {
        type: "list",
        heading: "Što ne radimo",
        items: [
          "U dječjoj aplikaciji ne prikazujemo oglase.",
          "Ne prodajemo podatke.",
          "Ne dajemo zdravstvena obećanja.",
          "Ne promoviramo pasmine čije oglašavanje veterinarske udruge ne preporučuju.",
          "Ne dopuštamo da sponzor utječe na sadržaj ili izvore.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Medijski paket",
        intro: "Kratak pregled PetPrepa za partnere i medije: što je PetPrep, kome je namijenjen, oblici suradnje i primjeri sadržaja.",
        items: [
          { href: "/media/petprep-media-kit-hr.pdf", label: "Medijski paket (hrvatski)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Medijski paket (engleski)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
