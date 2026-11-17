import type { PartnerLocalePack } from "../partners.ts";

/** Čeština (M6-S08). Vykání. */
export const cs: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Poptávka spolupráce",
      intro: "Napište nám, kdo jste a co máte na mysli. Odpovídáme osobně, obvykle do několika pracovních dnů. Automatické e-maily neposíláme.",
      company: "Firma nebo organizace",
      contactName: "Kontaktní osoba",
      email: "E-mailová adresa",
      type: "Druh spolupráce",
      typePlaceholder: "Vyberte…",
      message: "Zpráva",
      messageHint: "Stručný popis vašeho nápadu, země a časového rámce.",
      types: {
        series: "Sponzorování seriálu „12 Weeks“",
        sponsored_content: "Sponzorovaný obsah na petprep.si",
        insurer: "Pojišťovna (předávání kontaktů se připravuje)",
        directory: "Zakládající partner adresáře",
        shelter: "Útulek nebo spolek",
        other: "Jiné",
      },
      consentBefore: "Souhlasím s tím, že PetPrep zpracuje údaje z tohoto formuláře, aby mohl odpovědět na mou poptávku, jak je popsáno v ",
      consentLink: "zásadách ochrany osobních údajů",
      consentAfter: ".",
      submit: "Odeslat poptávku",
      sending: "Odesílám…",
      successTitle: "Děkujeme, vaše poptávka dorazila.",
      successText: "Odpovíme vám e-mailem.",
      errors: {
        company: "Zadejte firmu nebo organizaci.",
        contact_name: "Zadejte kontaktní osobu.",
        email: "Zadejte platnou e-mailovou adresu.",
        type: "Vyberte druh spolupráce.",
        message: "Napište krátkou zprávu.",
        consent: "K odeslání formuláře je potřeba váš souhlas.",
      },
      rateLimited: "Už jste odeslali několik poptávek. Zkuste to znovu za několik minut.",
      invalid: "Něco ve formuláři není v pořádku. Zkontrolujte označená pole.",
      fallbackBefore: "Formulář se teď nepodařilo odeslat. Napište nám na ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Čísla",
      intro: "Uvádíme jen to, co lze ověřit v produktu. Stav k {date}.",
      breeds: "plemen v encyklopedii zvířat",
      breedsNote: "{dogs} plemen psů a {cats} plemen koček, každé s vlastní stránkou a uvedenými zdroji.",
      languages: "jazyků webu",
      languagesNote: "Aplikace je dnes ve slovinštině a angličtině.",
    },
  },
  kit: {
    htmlLang: "cs",
    company: "PetPrep (společnost ve vzniku)",
    title: "Tisková sada",
    tagline: "Připraveni na zvíře. Po jeho boku celý život.",
    what: {
      heading: "Co je PetPrep",
      paragraphs: [
        "PetPrep je aplikace s encyklopedií zvířat, která rodině pomáhá připravit se na psa nebo kočku dřív, než si ho přivede domů. Ve 12týdenní výzvě se dítě stará o realistického virtuálního mazlíčka s AI a rodič v přehledu vidí, jak péče skutečně probíhá.",
        "Encyklopedie plemen vysvětluje, co které zvíře potřebuje, s uvedenými zdroji. Každé číslo lze dohledat ke zdroji a každý partnerský obsah je označený.",
      ],
    },
    audience: {
      heading: "Publikum",
      paragraphs: [
        "Rodiny těsně před rozhodnutím o zvířeti a dospělí, kteří zkoušejí, jestli jim určité plemeno opravdu vyhovuje. Čtenář už ví, jaký druh a plemeno zkoumá, takže jeho pozornost je konkrétní.",
      ],
    },
    coop: {
      heading: "Formy spolupráce",
      items: [
        ["Sponzorování seriálu „12 Weeks“", "Zmínka o sponzorovi v epizodě a jejím popisu. Sponzor obsah seriálu neovlivňuje."],
        ["Sponzorovaný obsah na petprep.si", "Označený příspěvek vedle stránky plemene nebo ve znalostní bázi, bez vlivu na obsah a zdroje."],
        ["Pojišťovny", "Pevné sponzorství nebo platba za předaný kontakt. Kontakt jen s výslovným souhlasem rodiče. Předávání kontaktů se připravuje."],
        ["Zakládající partner adresáře", "Veterináři, psí školy, psí kadeřnictví, chovatelé: zvýrazněný záznam. 190 € ročně, cena zamčená, počet míst omezený podle země."],
        ["Útulky a spolky", "Bezplatný záznam a možnost doporučovat PetPrep osvojitelům."],
      ],
    },
    examples: {
      heading: "Ukázky obsahu",
      items: [
        ["Aplikace", "12týdenní výzva s realistickým virtuálním mazlíčkem s AI a přehledem pro rodiče."],
        ["Encyklopedie plemen", "{breeds} plemen ({dogs} psů, {cats} koček) se zdroji, stav k {date}."],
        ["Seriál „12 Weeks“", "Videoseriál, který sleduje 12 týdnů péče o mazlíčka; místo pro zmínku o sponzorovi."],
      ],
    },
    never: {
      heading: "Co neděláme",
      text: "Reklamy v dětské aplikaci, prodej dat, zdravotní sliby a propagaci plemen, jejichž reklamu veterinární asociace nedoporučují.",
    },
    contact: { heading: "Kontakt", text: "Napište nám na {email} nebo použijte formulář na {url}." },
    page: "Strana",
  },
  page: {
    meta: {
      title: "Partneři a sponzoři – spolupracujte s PetPrep",
      description:
        "Sponzorování seriálu „12 Weeks“, sponzorovaný obsah, pojišťovny, zakládající partneři adresáře, útulky a spolky. Vše označené, bez vlivu na obsah a zdroje.",
    },
    eyebrow: "Partneři a sponzoři",
    title: "Oslovte rodiny těsně před rozhodnutím o zvířeti.",
    lead:
      "PetPrep je aplikace a encyklopedie plemen, ve které se rodina připraví dřív, než si domů přivede psa nebo kočku. Hledáme partnery, kterým záleží na zodpovědném pořízení zvířete a kteří to umějí říct otevřeně, s jasně označenou spoluprací.",
    blocks: [
      {
        type: "prose",
        heading: "Pro koho je PetPrep určen",
        paragraphs: [
          "PetPrep oslovuje rodiny těsně před rozhodnutím o mazlíčkovi a dospělé, kteří zkoušejí, jestli jim určité plemeno opravdu vyhovuje. Náš čtenář nehledá naslepo: už ví, jaký druh a plemeno zkoumá, a v [encyklopedii zvířat](page:animals) čte, co toto zvíře potřebuje, s uvedenými zdroji.",
          "Pro partnera je to vzácná chvíle. Rozhodnutí ještě nepadlo, ale zájem je konkrétní. Proto je pro nás důležité, aby každá spolupráce byla jasně označená a nikdy neměnila to, co rodiny čtou.",
        ],
      },
      {
        type: "cards",
        heading: "Jak můžeme spolupracovat",
        columns: 3,
        items: [
          { title: "Sponzorování seriálu „12 Weeks“", text: "Seriál sleduje 12 týdnů péče o mazlíčka. Sponzor je zmíněn v epizodě a jejím popisu; obsah seriálu neovlivňuje." },
          { title: "Sponzorovaný obsah na petprep.si", text: "Příspěvek vedle stránky plemene nebo ve znalostní bázi. Je vždy označený jako sponzorovaný a sponzor nemá žádný vliv na stránku ani na její uvedené zdroje." },
          { title: "Pojišťovny", text: "Platba za předaný kontakt nebo pevné sponzorství. Kontakt předáváme jen s výslovným souhlasem rodiče a nikdy ne údaje o dítěti. Předávání kontaktů se připravuje a zatím není k dispozici." },
          { title: "Zakládající partner adresáře", text: "Pro veterináře, psí školy, psí kadeřnictví a chovatele: zvýrazněný záznam s logem, popisem a odkazem. 190 € ročně; cena je pro zakládající partnery zamčená. Počet míst je omezený podle země." },
          { title: "Útulky a spolky", text: "Záznam je bezplatný. PetPrep můžete doporučovat osvojitelům, aby byli na příchod zvířete lépe připraveni." },
        ],
      },
      {
        type: "list",
        heading: "Co neděláme",
        items: [
          "V dětské aplikaci nezobrazujeme reklamy.",
          "Neprodáváme data.",
          "Nedáváme zdravotní sliby.",
          "Nepropagujeme plemena, jejichž reklamu veterinární asociace nedoporučují.",
          "Nikdy nedovolíme sponzorovi ovlivnit obsah nebo zdroje.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Tisková sada",
        intro: "Stručný přehled PetPrep pro partnery a média: co je PetPrep, pro koho je určen, formy spolupráce a ukázky obsahu.",
        items: [
          { href: "/media/petprep-media-kit-cs.pdf", label: "Tisková sada (česky)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Tisková sada (anglicky)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
