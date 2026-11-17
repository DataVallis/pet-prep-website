import type { PartnerLocalePack } from "../partners.ts";

/** Svenska (M6-S08). */
export const sv: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Förfrågan om samarbete",
      intro: "Berätta vem du är och vad du har i åtanke. Vi svarar personligen, vanligtvis inom några arbetsdagar. Vi skickar inga automatiska mejl.",
      company: "Företag eller organisation",
      contactName: "Kontaktperson",
      email: "E-postadress",
      type: "Typ av samarbete",
      typePlaceholder: "Välj …",
      message: "Meddelande",
      messageHint: "En kort beskrivning av din idé, land och tidplan.",
      types: {
        series: "Sponsring av serien ”12 Weeks”",
        sponsored_content: "Sponsrat innehåll på petprep.si",
        insurer: "Försäkringsbolag (förmedling av kontakter under förberedelse)",
        directory: "Grundande partner i katalogen",
        shelter: "Djurhem eller förening",
        other: "Annat",
      },
      consentBefore: "Jag godkänner att PetPrep behandlar uppgifterna i formuläret för att besvara min förfrågan, som det beskrivs i ",
      consentLink: "integritetspolicyn",
      consentAfter: ".",
      submit: "Skicka förfrågan",
      sending: "Skickar …",
      successTitle: "Tack, din förfrågan har kommit fram.",
      successText: "Vi svarar dig via e-post.",
      errors: {
        company: "Ange företag eller organisation.",
        contact_name: "Ange en kontaktperson.",
        email: "Ange en giltig e-postadress.",
        type: "Välj typ av samarbete.",
        message: "Skriv ett kort meddelande.",
        consent: "Vi behöver ditt samtycke för att kunna skicka formuläret.",
      },
      rateLimited: "Du har redan skickat flera förfrågningar. Försök igen om några minuter.",
      invalid: "Något i formuläret stämmer inte. Kontrollera de markerade fälten.",
      fallbackBefore: "Formuläret går inte att skicka just nu. Skriv till oss på ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Siffror",
      intro: "Vi anger bara det som går att kontrollera i produkten. Läget den {date}.",
      breeds: "{n|one=ras|other=raser} i djurregistret",
      breedsNote: "{dogs} {dogs|one=hundras|other=hundraser} och {cats} {cats|one=kattras|other=kattraser}, var och en med en egen sida och angivna källor.",
      languages: "språk på webbplatsen",
      languagesNote: "Appen finns i dag på slovenska och engelska.",
    },
  },
  kit: {
    htmlLang: "sv",
    company: "PetPrep (bolag under bildande)",
    title: "Pressmaterial",
    tagline: "Redo för ett djur. Där för det hela livet.",
    what: {
      heading: "Vad PetPrep är",
      paragraphs: [
        "PetPrep är en app med ett djurregister som hjälper en familj att förbereda sig på en hund eller katt innan den flyttar in. I en 12 veckor lång utmaning tar barnet hand om ett realistiskt AI-husdjur, medan föräldern ser i en översikt hur omsorgen verkligen går.",
        "Rasregistret förklarar vad varje djur behöver, med angivna källor. Varje siffra går att spåra till en källa, och allt partnerinnehåll är märkt.",
      ],
    },
    audience: {
      heading: "Målgrupp",
      paragraphs: [
        "Familjer strax innan de bestämmer sig för ett husdjur och vuxna som vill testa om en viss ras verkligen passar dem. Läsaren vet redan vilken art och ras hen undersöker, så uppmärksamheten är konkret.",
      ],
    },
    coop: {
      heading: "Samarbetsformer",
      items: [
        ["Sponsring av serien ”12 Weeks”", "Sponsorn nämns i avsnittet och i beskrivningen. Sponsorn styr inte seriens innehåll."],
        ["Sponsrat innehåll på petprep.si", "Ett märkt inlägg bredvid en rassida eller i kunskapsbasen, utan inverkan på innehåll och källor."],
        ["Försäkringsbolag", "Fast sponsring eller betalning per förmedlad kontakt. Kontakt endast med förälderns uttryckliga samtycke. Kontaktförmedlingen är under förberedelse."],
        ["Grundande partner i katalogen", "Veterinärer, hundskolor, hundfrisörer, uppfödare: en framhävd notering. 190 € per år, fast pris, antalet platser begränsat per land."],
        ["Djurhem och föreningar", "En kostnadsfri notering och möjlighet att rekommendera PetPrep till adoptanter."],
      ],
    },
    examples: {
      heading: "Exempel på innehåll",
      items: [
        ["Appen", "En 12 veckor lång utmaning med ett realistiskt AI-husdjur och en översikt för föräldrar."],
        ["Rasregister", "{breeds} {breeds|one=ras|other=raser} ({dogs} {dogs|one=hund|other=hundar}, {cats} {cats|one=katt|other=katter}) med källor, läget den {date}."],
        ["Serien ”12 Weeks”", "En videoserie som följer 12 veckors husdjursomsorg; ett tillfälle att nämna en sponsor."],
      ],
    },
    never: {
      heading: "Vad vi inte gör",
      text: "Annonser i barnappen, försäljning av data, hälsolöften och marknadsföring av raser som veterinärorganisationer avråder från att annonsera för.",
    },
    contact: { heading: "Kontakt", text: "Skriv till oss på {email} eller använd formuläret på {url}." },
    page: "Sida",
  },
  page: {
    meta: {
      title: "Partner och sponsorer – samarbeta med PetPrep",
      description:
        "Sponsring av serien ”12 Weeks”, sponsrat innehåll, försäkringsbolag, grundande partner i katalogen samt djurhem och föreningar. Allt är märkt, utan inverkan på innehåll och källor.",
    },
    eyebrow: "Partner och sponsorer",
    title: "Nå familjer precis innan de bestämmer sig för ett djur.",
    lead:
      "PetPrep är en app och ett rasregister där en familj förbereder sig innan den tar hem en hund eller katt. Vi söker partner som bryr sig om ansvarsfullt djurägande och som vill säga det öppet, med ett tydligt märkt samarbete.",
    blocks: [
      {
        type: "prose",
        heading: "Vem PetPrep är till för",
        paragraphs: [
          "PetPrep vänder sig till familjer strax innan de bestämmer sig för ett husdjur och till vuxna som vill testa om en viss ras verkligen passar dem. Vår läsare söker inte i blindo: hen vet redan vilken art och ras hen undersöker och läser i [djurregistret](page:animals) vad djuret behöver, med angivna källor.",
          "För en partner är det ett sällsynt ögonblick. Beslutet är inte fattat än, men intresset är konkret. Därför är det viktigt för oss att varje samarbete är tydligt märkt och aldrig ändrar vad familjerna läser.",
        ],
      },
      {
        type: "cards",
        heading: "Så kan vi samarbeta",
        columns: 3,
        items: [
          { title: "Sponsring av serien ”12 Weeks”", text: "Serien följer 12 veckors husdjursomsorg. Sponsorn nämns i avsnittet och i beskrivningen; sponsorn styr inte seriens innehåll." },
          { title: "Sponsrat innehåll på petprep.si", text: "Ett inlägg bredvid en rassida eller i kunskapsbasen. Det är alltid märkt som sponsrat, och sponsorn har ingen inverkan på sidan eller dess angivna källor." },
          { title: "Försäkringsbolag", text: "Betalning per förmedlad kontakt eller en fast sponsring. Vi lämnar bara vidare en kontakt med förälderns uttryckliga samtycke och aldrig ett barns uppgifter. Kontaktförmedlingen är under förberedelse och ännu inte tillgänglig." },
          { title: "Grundande partner i katalogen", text: "För veterinärer, hundskolor, hundfrisörer och uppfödare: en framhävd notering med logotyp, beskrivning och länk. 190 € per år; priset är fast för grundande partner. Antalet platser är begränsat per land." },
          { title: "Djurhem och föreningar", text: "Noteringen är kostnadsfri. Du kan rekommendera PetPrep till adoptanter så att de är bättre förberedda när djuret kommer." },
        ],
      },
      {
        type: "list",
        heading: "Vad vi inte gör",
        items: [
          "Vi visar inga annonser i barnappen.",
          "Vi säljer inte data.",
          "Vi ger inga hälsolöften.",
          "Vi marknadsför inte raser som veterinärorganisationer avråder från att annonsera för.",
          "Vi låter aldrig en sponsor påverka innehåll eller källor.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Pressmaterial",
        intro: "En kort översikt av PetPrep för partner och medier: vad PetPrep är, vem det är till för, samarbetsformer och exempel på innehåll.",
        items: [
          { href: "/media/petprep-media-kit-sv.pdf", label: "Pressmaterial (svenska)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Pressmaterial (engelska)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
