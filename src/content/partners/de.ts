import type { PartnerLocalePack } from "../partners.ts";

/** Deutsch (M6-S08). Partner werden gesiezt. */
export const de: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Anfrage zur Zusammenarbeit",
      intro: "Erzählen Sie uns, wer Sie sind und was Sie vorhaben. Wir antworten persönlich, meist innerhalb weniger Werktage. Automatische E-Mails verschicken wir nicht.",
      company: "Unternehmen oder Organisation",
      contactName: "Ansprechperson",
      email: "E-Mail-Adresse",
      type: "Art der Zusammenarbeit",
      typePlaceholder: "Bitte auswählen …",
      message: "Nachricht",
      messageHint: "Kurz beschrieben: Ihre Idee, das Land und der Zeitrahmen.",
      types: {
        series: "Sponsoring der Serie „12 Weeks“",
        sponsored_content: "Gesponserter Inhalt auf petprep.si",
        insurer: "Versicherer (Kontaktvermittlung in Vorbereitung)",
        directory: "Gründungspartner im Verzeichnis",
        shelter: "Tierheim oder Verein",
        other: "Sonstiges",
      },
      consentBefore: "Ich bin damit einverstanden, dass PetPrep die Daten aus diesem Formular verarbeitet, um meine Anfrage zu beantworten, wie in der ",
      consentLink: "Datenschutzerklärung",
      consentAfter: " beschrieben.",
      submit: "Anfrage senden",
      sending: "Wird gesendet …",
      successTitle: "Danke, Ihre Anfrage ist bei uns angekommen.",
      successText: "Wir antworten Ihnen per E-Mail.",
      errors: {
        company: "Bitte geben Sie Ihr Unternehmen oder Ihre Organisation an.",
        contact_name: "Bitte geben Sie eine Ansprechperson an.",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        type: "Bitte wählen Sie eine Art der Zusammenarbeit.",
        message: "Bitte schreiben Sie eine kurze Nachricht.",
        consent: "Zum Absenden brauchen wir Ihre Einwilligung.",
      },
      rateLimited: "Sie haben bereits mehrere Anfragen gesendet. Bitte versuchen Sie es in ein paar Minuten erneut.",
      invalid: "Im Formular stimmt etwas nicht. Bitte prüfen Sie die markierten Felder.",
      fallbackBefore: "Das Formular lässt sich gerade nicht absenden. Schreiben Sie uns bitte an ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Zahlen",
      intro: "Wir nennen nur, was sich im Produkt überprüfen lässt. Stand: {date}.",
      breeds: "Rassen im Tierregister",
      breedsNote: "{dogs} Hunderassen und {cats} Katzenrassen, jede mit eigener Seite und angegebenen Quellen.",
      languages: "Sprachen der Website",
      languagesNote: "Die App gibt es derzeit auf Slowenisch und Englisch.",
    },
  },
  kit: {
    htmlLang: "de",
    company: "PetPrep (in Gründung)",
    title: "Pressemappe",
    tagline: "Bereit für ein Tier. Und danach ein Leben lang an seiner Seite.",
    what: {
      heading: "Was PetPrep ist",
      paragraphs: [
        "PetPrep ist eine App mit Tierregister, die Familien hilft, sich auf einen Hund oder eine Katze vorzubereiten, bevor das Tier einzieht. In einer 12-wöchigen Challenge kümmert sich das Kind um ein realistisches KI-Haustier, und die Eltern sehen im Dashboard, wie die Pflege tatsächlich läuft.",
        "Das Rasseregister erklärt, was jedes Tier braucht, mit angegebenen Quellen. Jede Zahl lässt sich bis zur Quelle zurückverfolgen, und jeder Partnerinhalt ist gekennzeichnet.",
      ],
    },
    audience: {
      heading: "Zielgruppe",
      paragraphs: [
        "Familien kurz vor der Entscheidung für ein Haustier und Erwachsene, die prüfen, ob eine bestimmte Rasse wirklich zu ihnen passt. Die Leserinnen und Leser wissen bereits, welche Tierart und Rasse sie sich ansehen, die Aufmerksamkeit ist also konkret.",
      ],
    },
    coop: {
      heading: "Formen der Zusammenarbeit",
      items: [
        ["Sponsoring der Serie „12 Weeks“", "Das Sponsoring wird in der Folge und in der Beschreibung genannt. Der Sponsor redigiert die Serie nicht."],
        ["Gesponserte Inhalte auf petprep.si", "Ein gekennzeichneter Beitrag neben einer Rasseseite oder in der Wissensbasis, ohne Einfluss auf Inhalt und Quellen."],
        ["Versicherer", "Festes Sponsoring oder Vergütung pro vermitteltem Kontakt. Kontakte nur mit ausdrücklicher Einwilligung der Eltern. Die Kontaktvermittlung ist in Vorbereitung."],
        ["Gründungspartner im Verzeichnis", "Tierärzte, Hundeschulen, Hundefriseure, Züchter: ein hervorgehobener Eintrag. 190 € pro Jahr, Preis garantiert, Plätze pro Land begrenzt."],
        ["Tierheime und Vereine", "Ein kostenloser Eintrag und die Möglichkeit, PetPrep Adoptierenden zu empfehlen."],
      ],
    },
    examples: {
      heading: "Inhaltsbeispiele",
      items: [
        ["Die App", "Eine 12-wöchige Challenge mit einem realistischen KI-Haustier und einem Dashboard für Eltern."],
        ["Rasseregister", "{breeds} Rassen ({dogs} Hunde, {cats} Katzen) mit Quellen, Stand: {date}."],
        ["Serie „12 Weeks“", "Eine Videoserie, die 12 Wochen Haustierpflege begleitet; Raum für die Nennung eines Sponsors."],
      ],
    },
    never: {
      heading: "Was wir nicht tun",
      text: "Keine Werbung in der Kinder-App, kein Verkauf von Daten, keine Gesundheitsversprechen und keine Werbung für Rassen, von deren Bewerbung tierärztliche Verbände abraten.",
    },
    contact: { heading: "Kontakt", text: "Schreiben Sie uns an {email} oder nutzen Sie das Formular unter {url}." },
    page: "Seite",
  },
  page: {
    meta: {
      title: "Partner und Sponsoren – mit PetPrep zusammenarbeiten",
      description:
        "Sponsoring der Serie „12 Weeks“, gesponserte Inhalte, Versicherer, Gründungspartner im Verzeichnis sowie Tierheime und Vereine. Gekennzeichnet und ohne Einfluss auf Inhalt und Quellen.",
    },
    eyebrow: "Partner und Sponsoren",
    title: "Erreichen Sie Familien kurz vor der Entscheidung für ein Tier.",
    lead:
      "PetPrep ist eine App mit Rasseregister, in der sich eine Familie vorbereitet, bevor sie einen Hund oder eine Katze nach Hause holt. Wir suchen Partner, denen verantwortungsvolle Tierhaltung am Herzen liegt und die dazu offen stehen – mit klar gekennzeichneter Zusammenarbeit.",
    blocks: [
      {
        type: "prose",
        heading: "Für wen PetPrep gedacht ist",
        paragraphs: [
          "PetPrep spricht Familien kurz vor der Entscheidung für ein Haustier an und Erwachsene, die prüfen, ob eine bestimmte Rasse wirklich zu ihnen passt. Unsere Leserinnen und Leser suchen nicht ins Blaue hinein: Sie wissen schon, welche Tierart und Rasse sie sich ansehen, und lesen im [Tierregister](page:animals), was dieses Tier braucht – mit angegebenen Quellen.",
          "Für Partner ist das ein seltener Moment. Die Entscheidung ist noch nicht gefallen, das Interesse aber konkret. Deshalb ist uns wichtig, dass jede Zusammenarbeit klar gekennzeichnet ist und nie verändert, was Familien bei uns lesen.",
        ],
      },
      {
        type: "cards",
        heading: "So können wir zusammenarbeiten",
        columns: 3,
        items: [
          { title: "Sponsoring der Serie „12 Weeks“", text: "Die Serie begleitet 12 Wochen Haustierpflege. Der Sponsor wird in der Folge und in ihrer Beschreibung genannt; er redigiert die Serie nicht." },
          { title: "Gesponserte Inhalte auf petprep.si", text: "Ein Beitrag neben einer Rasseseite oder in der Wissensbasis. Er ist immer als gesponsert gekennzeichnet, und der Sponsor hat keinen Einfluss auf die Seite oder ihre angegebenen Quellen." },
          { title: "Versicherer", text: "Vergütung pro vermitteltem Kontakt oder ein festes Sponsoring. Wir geben einen Kontakt nur mit ausdrücklicher Einwilligung der Eltern weiter und nie Daten eines Kindes. Die Kontaktvermittlung ist in Vorbereitung und noch nicht verfügbar." },
          { title: "Gründungspartner im Verzeichnis", text: "Für Tierärzte, Hundeschulen, Hundefriseure und Züchter: ein hervorgehobener Eintrag mit Logo, Beschreibung und Link. 190 € pro Jahr; der Preis ist für Gründungspartner garantiert. Die Plätze sind pro Land begrenzt." },
          { title: "Tierheime und Vereine", text: "Der Eintrag ist kostenlos. Sie können PetPrep Adoptierenden empfehlen, damit sie besser auf die Ankunft des Tieres vorbereitet sind." },
        ],
      },
      {
        type: "list",
        heading: "Was wir nicht tun",
        items: [
          "Wir zeigen keine Werbung in der Kinder-App.",
          "Wir verkaufen keine Daten.",
          "Wir machen keine Gesundheitsversprechen.",
          "Wir bewerben keine Rassen, von deren Bewerbung tierärztliche Verbände abraten.",
          "Wir lassen nie zu, dass ein Sponsor Inhalte oder Quellen beeinflusst.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Pressemappe",
        intro: "Ein kurzer Überblick über PetPrep für Partner und Medien: was PetPrep ist, für wen es gedacht ist, Formen der Zusammenarbeit und Inhaltsbeispiele.",
        items: [
          { href: "/media/petprep-media-kit-de.pdf", label: "Pressemappe (Deutsch)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Pressemappe (Englisch)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
