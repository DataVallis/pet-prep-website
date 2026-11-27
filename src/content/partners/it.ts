import type { PartnerLocalePack } from "../partners.ts";

/** Italiano (M6-S08). Forma di cortesia con i partner. */
export const it: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Richiesta di collaborazione",
      intro: "Ci racconti chi è e che cosa ha in mente. Rispondiamo di persona, di solito entro pochi giorni lavorativi. Non inviamo e-mail automatiche.",
      company: "Azienda o organizzazione",
      contactName: "Persona di contatto",
      email: "Indirizzo e-mail",
      type: "Tipo di collaborazione",
      typePlaceholder: "Scelga…",
      message: "Messaggio",
      messageHint: "Una breve descrizione della sua idea, del paese e delle tempistiche.",
      types: {
        series: "Sponsorizzazione della serie «12 Weeks»",
        sponsored_content: "Contenuto sponsorizzato su petprep.si",
        insurer: "Assicurazione (segnalazione di contatti in preparazione)",
        directory: "Partner fondatore dell’elenco",
        shelter: "Rifugio o associazione",
        other: "Altro",
      },
      consentBefore: "Acconsento al trattamento dei dati di questo modulo da parte di PetPrep per rispondere alla mia richiesta, come descritto nell’",
      consentLink: "informativa sulla privacy",
      consentAfter: ".",
      submit: "Invia la richiesta",
      sending: "Invio in corso…",
      successTitle: "Grazie, abbiamo ricevuto la sua richiesta.",
      successText: "Le risponderemo via e-mail.",
      errors: {
        company: "Inserisca il nome dell’azienda o dell’organizzazione.",
        contact_name: "Inserisca una persona di contatto.",
        email: "Inserisca un indirizzo e-mail valido.",
        type: "Scelga un tipo di collaborazione.",
        message: "Scriva un breve messaggio.",
        consent: "Per inviare il modulo serve il suo consenso.",
      },
      rateLimited: "Ha già inviato diverse richieste. Riprovi tra qualche minuto.",
      invalid: "Qualcosa nel modulo non va. Controlli i campi evidenziati.",
      fallbackBefore: "Al momento non è possibile inviare il modulo. Ci scriva a ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "I numeri",
      intro: "Indichiamo solo ciò che si può verificare nel prodotto. Dati al {date}.",
      breeds: "{n|one=razza|other=razze} nel registro degli animali",
      breedsNote: "{dogs} {dogs|one=razza|other=razze} di cani e {cats} {cats|one=razza|other=razze} di gatti, ognuna con la propria pagina e le fonti citate.",
      languages: "{n|one=lingua|other=lingue} del sito",
      languagesNote: "L’app oggi è disponibile in sloveno e inglese.",
    },
  },
  kit: {
    htmlLang: "it",
    company: "PetPrep (società in fase di costituzione)",
    title: "Cartella stampa",
    tagline: "Pronti per un animale. Al suo fianco per tutta la vita.",
    what: {
      heading: "Che cos’è PetPrep",
      paragraphs: [
        "PetPrep è un’app con un registro degli animali che aiuta una famiglia a prepararsi all’arrivo di un cane o di un gatto prima di portarlo a casa. In una sfida di 12 settimane il bambino si prende cura di un animale virtuale realistico, mentre il genitore vede nel pannello per i genitori come procedono davvero le cure.",
        "Il registro delle razze spiega di che cosa ha bisogno ogni animale, con le fonti citate. Ogni numero è riconducibile a una fonte e ogni contenuto dei partner è segnalato come tale.",
      ],
    },
    audience: {
      heading: "Pubblico",
      paragraphs: [
        "Famiglie a un passo dalla decisione di prendere un animale e adulti che vogliono verificare se una razza fa davvero per loro. Chi legge sa già quale specie e quale razza sta valutando, quindi l’attenzione è concreta.",
      ],
    },
    coop: {
      heading: "Forme di collaborazione",
      items: [
        ["Sponsorizzazione della serie «12 Weeks»", "Lo sponsor viene citato nell’episodio e nella sua descrizione. Non interviene sui contenuti della serie."],
        ["Contenuti sponsorizzati su petprep.si", "Un articolo segnalato come tale accanto alla pagina di una razza o nella base di conoscenza, senza alcuna influenza su contenuti e fonti."],
        ["Assicurazioni", "Sponsorizzazione fissa o compenso per ogni contatto segnalato. Solo con il consenso esplicito di un genitore. La segnalazione di contatti è in preparazione."],
        ["Partner fondatore dell’elenco", "Veterinari, scuole cinofile, toelettatori, allevatori: una scheda in evidenza. 190 € l’anno, prezzo bloccato, posti limitati per paese."],
        ["Rifugi e associazioni", "Una scheda gratuita e la possibilità di consigliare PetPrep a chi adotta."],
      ],
    },
    examples: {
      heading: "Esempi di contenuti",
      items: [
        ["L’app", "Una sfida di 12 settimane con un animale virtuale realistico e un pannello per i genitori."],
        ["Registro delle razze", "{breeds} {breeds|one=razza|other=razze} ({dogs} {dogs|one=cane|other=cani}, {cats} {cats|one=gatto|other=gatti}) con le fonti, dati al {date}."],
        ["Serie «12 Weeks»", "Una serie video che segue 12 settimane di cure per un animale; uno spazio per la menzione di uno sponsor."],
      ],
    },
    never: {
      heading: "Che cosa non facciamo",
      text: "Pubblicità nell’app per bambini, vendita di dati, promesse sulla salute e promozione di razze per le quali le associazioni veterinarie sconsigliano la pubblicità.",
    },
    contact: { heading: "Contatti", text: "Ci scriva a {email} o compili il modulo su {url}." },
    page: "Pagina",
  },
  page: {
    meta: {
      title: "Partner e sponsor – la collaborazione con PetPrep",
      description:
        "Sponsorizzazione della serie «12 Weeks», contenuti sponsorizzati, assicurazioni, partner fondatori dell’elenco, rifugi e associazioni. Tutto segnalato, senza influenza su contenuti e fonti.",
    },
    eyebrow: "Partner e sponsor",
    title: "Raggiunga le famiglie un attimo prima che scelgano un animale.",
    lead:
      "PetPrep è un’app e un registro delle razze in cui una famiglia si prepara prima di portare a casa un cane o un gatto. Cerchiamo partner a cui sta a cuore l’adozione responsabile e che lo dicono apertamente, con la collaborazione segnalata in modo chiaro.",
    blocks: [
      {
        type: "prose",
        heading: "A chi si rivolge PetPrep",
        paragraphs: [
          "PetPrep parla alle famiglie a un passo dalla decisione di prendere un animale e agli adulti che vogliono verificare se una razza fa davvero per loro. Chi ci legge non cerca a caso: sa già quale specie e quale razza sta valutando e nel [registro degli animali](page:animals) legge di che cosa ha bisogno quell’animale, con le fonti citate.",
          "Per un partner è un momento raro. La decisione non è ancora presa, ma l’interesse è concreto. Per questo ci teniamo che ogni collaborazione sia segnalata con chiarezza e non cambi mai ciò che le famiglie leggono.",
        ],
      },
      {
        type: "cards",
        heading: "Modi di collaborare",
        columns: 3,
        items: [
          { title: "Sponsorizzazione della serie «12 Weeks»", text: "La serie segue 12 settimane di cure per un animale. Lo sponsor viene citato nell’episodio e nella sua descrizione; non interviene sui contenuti della serie." },
          { title: "Contenuti sponsorizzati su petprep.si", text: "Un articolo accanto alla pagina di una razza o nella base di conoscenza. È sempre segnalato come sponsorizzato e lo sponsor non ha alcuna influenza sulla pagina né sulle fonti citate." },
          { title: "Assicurazioni", text: "Compenso per ogni contatto segnalato oppure una sponsorizzazione fissa. Trasmettiamo un contatto solo con il consenso esplicito di un genitore e mai dati di un minore. La segnalazione di contatti è in preparazione e non ancora disponibile." },
          { title: "Partner fondatore dell’elenco", text: "Per veterinari, scuole cinofile, toelettatori e allevatori: una scheda in evidenza con logo, descrizione e link. 190 € l’anno; il prezzo è bloccato per i partner fondatori. I posti sono limitati per paese." },
          { title: "Rifugi e associazioni", text: "La scheda è gratuita. Può consigliare PetPrep a chi adotta, così arriva più preparato all’arrivo dell’animale." },
        ],
      },
      {
        type: "list",
        heading: "Che cosa non facciamo",
        items: [
          "Non mostriamo pubblicità nell’app per bambini.",
          "Non vendiamo dati.",
          "Non facciamo promesse sulla salute.",
          "Non promuoviamo razze per le quali le associazioni veterinarie sconsigliano la pubblicità.",
          "Non lasciamo che uno sponsor influenzi contenuti o fonti.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Cartella stampa",
        intro: "Una breve panoramica di PetPrep per partner e media: che cos’è PetPrep, a chi si rivolge, forme di collaborazione ed esempi di contenuti.",
        items: [
          { href: "/media/petprep-media-kit-it.pdf", label: "Cartella stampa (italiano)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Cartella stampa (inglese)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
