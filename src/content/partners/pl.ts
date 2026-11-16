import type { PartnerLocalePack } from "../partners.ts";

/** Polski (M6-S08). Zwracamy się do partnera na „ty” (formularz i tekst strony), jak w pozostałych tekstach witryny. */
export const pl: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Zapytanie o współpracę",
      intro: "Napisz, kim jesteś i co masz na myśli. Odpowiadamy osobiście, zwykle w ciągu kilku dni roboczych. Nie wysyłamy automatycznych e-maili.",
      company: "Firma lub organizacja",
      contactName: "Osoba kontaktowa",
      email: "Adres e-mail",
      type: "Rodzaj współpracy",
      typePlaceholder: "Wybierz…",
      message: "Wiadomość",
      messageHint: "Krótki opis pomysłu, kraju i terminu.",
      types: {
        series: "Sponsoring serii „12 Weeks”",
        sponsored_content: "Treści sponsorowane na petprep.si",
        insurer: "Ubezpieczyciel (przekazywanie kontaktów w przygotowaniu)",
        directory: "Partner założyciel katalogu",
        shelter: "Schronisko lub stowarzyszenie",
        other: "Inne",
      },
      consentBefore: "Zgadzam się, aby PetPrep przetwarzał dane z tego formularza w celu odpowiedzi na moje zapytanie, zgodnie z ",
      consentLink: "polityką prywatności",
      consentAfter: ".",
      submit: "Wyślij zapytanie",
      sending: "Wysyłanie…",
      successTitle: "Dziękujemy, Twoje zapytanie dotarło do nas.",
      successText: "Odpowiemy e-mailem.",
      errors: {
        company: "Podaj nazwę firmy lub organizacji.",
        contact_name: "Podaj osobę kontaktową.",
        email: "Podaj prawidłowy adres e-mail.",
        type: "Wybierz rodzaj współpracy.",
        message: "Napisz krótką wiadomość.",
        consent: "Aby wysłać formularz, potrzebna jest Twoja zgoda.",
      },
      rateLimited: "Wysłano już kilka zapytań. Spróbuj ponownie za kilka minut.",
      invalid: "Coś w formularzu jest nie tak. Sprawdź zaznaczone pola.",
      fallbackBefore: "Formularza nie można teraz wysłać. Napisz do nas na adres ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Liczby",
      intro: "Podajemy tylko to, co można sprawdzić w produkcie. Stan na {date}.",
      breeds: "ras w encyklopedii zwierząt",
      breedsNote: "{dogs} ras psów i {cats} ras kotów, każda z własną stroną i podanymi źródłami.",
      languages: "języków strony",
      languagesNote: "Aplikacja jest obecnie dostępna po słoweńsku i angielsku.",
    },
  },
  kit: {
    htmlLang: "pl",
    company: "PetPrep (firma w trakcie zakładania)",
    title: "Materiały prasowe",
    tagline: "Gotowi na zwierzę. Przy nim przez całe życie.",
    what: {
      heading: "Czym jest PetPrep",
      paragraphs: [
        "PetPrep to aplikacja z encyklopedią zwierząt, która pomaga rodzinie przygotować się na psa lub kota, zanim trafi on do domu. W 12-tygodniowym wyzwaniu dziecko opiekuje się realistycznym zwierzakiem z AI, a rodzic widzi w panelu, jak opieka wygląda naprawdę.",
        "Encyklopedia ras wyjaśnia, czego potrzebuje każde zwierzę, z podanymi źródłami. Każdą liczbę można prześledzić do źródła, a każda treść partnerska jest oznaczona.",
      ],
    },
    audience: {
      heading: "Odbiorcy",
      paragraphs: [
        "Rodziny tuż przed decyzją o zwierzaku oraz dorośli, którzy sprawdzają, czy dana rasa naprawdę do nich pasuje. Czytelnik wie już, jaki gatunek i jaką rasę poznaje, więc jego uwaga jest konkretna.",
      ],
    },
    coop: {
      heading: "Formy współpracy",
      items: [
        ["Sponsoring serii „12 Weeks”", "Wzmianka o sponsorze w odcinku i jego opisie. Sponsor nie ma wpływu na treść serii."],
        ["Treści sponsorowane na petprep.si", "Oznaczony materiał obok strony rasy lub w bazie wiedzy, bez wpływu na treść i źródła."],
        ["Ubezpieczyciele", "Stały sponsoring lub opłata za przekazany kontakt. Kontakt tylko za wyraźną zgodą rodzica. Przekazywanie kontaktów jest w przygotowaniu."],
        ["Partner założyciel katalogu", "Weterynarze, szkoły szkolenia psów, groomerzy, hodowcy: wyróżniony wpis. 190 € rocznie, cena zablokowana, liczba miejsc w kraju ograniczona."],
        ["Schroniska i stowarzyszenia", "Bezpłatny wpis i możliwość polecania PetPrep osobom adoptującym."],
      ],
    },
    examples: {
      heading: "Przykłady treści",
      items: [
        ["Aplikacja", "12-tygodniowe wyzwanie z realistycznym zwierzakiem z AI i panelem dla rodziców."],
        ["Encyklopedia ras", "{breeds} ras ({dogs} psów, {cats} kotów) ze źródłami, stan na {date}."],
        ["Seria „12 Weeks”", "Serial wideo śledzący 12 tygodni opieki nad zwierzakiem; miejsce na wzmiankę o sponsorze."],
      ],
    },
    never: {
      heading: "Czego nie robimy",
      text: "Reklam w aplikacji dla dzieci, sprzedaży danych, obietnic dotyczących zdrowia ani promowania ras, których reklamowania odradzają organizacje weterynaryjne.",
    },
    contact: { heading: "Kontakt", text: "Napisz do nas na {email} lub skorzystaj z formularza na {url}." },
    page: "Strona",
  },
  page: {
    meta: {
      title: "Partnerzy i sponsorzy – współpracuj z PetPrep",
      description:
        "Sponsoring serii „12 Weeks”, treści sponsorowane, ubezpieczyciele, partnerzy założyciele katalogu, schroniska i stowarzyszenia. Wszystko oznaczone, bez wpływu na treść i źródła.",
    },
    eyebrow: "Partnerzy i sponsorzy",
    title: "Dotrzyj do rodzin tuż przed decyzją o zwierzęciu.",
    lead:
      "PetPrep to aplikacja i encyklopedia ras, w której rodzina przygotowuje się, zanim przyniesie do domu psa lub kota. Szukamy partnerów, którym zależy na odpowiedzialnym wzięciu zwierzęcia i którzy mówią o tym otwarcie, z wyraźnie oznaczoną współpracą.",
    blocks: [
      {
        type: "prose",
        heading: "Dla kogo jest PetPrep",
        paragraphs: [
          "PetPrep kierujemy do rodzin tuż przed decyzją o zwierzęciu i do dorosłych, którzy sprawdzają, czy dana rasa naprawdę do nich pasuje. Nasz czytelnik nie szuka na ślepo: wie już, jaki gatunek i jaką rasę poznaje, a w [encyklopedii zwierząt](page:animals) czyta, czego to zwierzę potrzebuje, z podanymi źródłami.",
          "Dla partnera to rzadka chwila. Decyzja jeszcze nie zapadła, ale zainteresowanie jest konkretne. Dlatego zależy nam, aby każda współpraca była wyraźnie oznaczona i nigdy nie zmieniała tego, co czytają rodziny.",
        ],
      },
      {
        type: "cards",
        heading: "Jak możemy współpracować",
        columns: 3,
        items: [
          { title: "Sponsoring serii „12 Weeks”", text: "Seria śledzi 12 tygodni opieki nad zwierzakiem. Sponsor jest wymieniony w odcinku i jego opisie; nie ma wpływu na treść serii." },
          { title: "Treści sponsorowane na petprep.si", text: "Materiał obok strony rasy lub w bazie wiedzy. Zawsze jest oznaczony jako sponsorowany, a sponsor nie ma wpływu na stronę ani na jej podane źródła." },
          { title: "Ubezpieczyciele", text: "Opłata za przekazany kontakt lub stały sponsoring. Przekazujemy kontakt tylko za wyraźną zgodą rodzica i nigdy nie przekazujemy danych dziecka. Przekazywanie kontaktów jest w przygotowaniu i jeszcze niedostępne." },
          { title: "Partner założyciel katalogu", text: "Dla weterynarzy, szkół szkolenia psów, groomerów i hodowców: wyróżniony wpis z logo, opisem i linkiem. 190 € rocznie; cena jest zablokowana dla partnerów założycieli. Liczba miejsc w kraju jest ograniczona." },
          { title: "Schroniska i stowarzyszenia", text: "Wpis jest bezpłatny. Możesz polecać PetPrep osobom adoptującym, aby były lepiej przygotowane na przybycie zwierzęcia." },
        ],
      },
      {
        type: "list",
        heading: "Czego nie robimy",
        items: [
          "Nie pokazujemy reklam w aplikacji dla dzieci.",
          "Nie sprzedajemy danych.",
          "Nie składamy obietnic dotyczących zdrowia.",
          "Nie promujemy ras, których reklamowania odradzają organizacje weterynaryjne.",
          "Nigdy nie pozwalamy, aby sponsor wpływał na treść lub źródła.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Materiały prasowe",
        intro: "Krótki przegląd PetPrep dla partnerów i mediów: czym jest PetPrep, dla kogo jest, formy współpracy i przykłady treści.",
        items: [
          { href: "/media/petprep-media-kit-pl.pdf", label: "Materiały prasowe (polski)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Materiały prasowe (angielski)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
