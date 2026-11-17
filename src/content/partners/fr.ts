import type { PartnerLocalePack } from "../partners.ts";

/** Français (M6-S08). Vouvoiement pour les partenaires. */
export const fr: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Demande de collaboration",
      intro: "Dites-nous qui vous êtes et ce que vous avez en tête. Nous répondons personnellement, en général sous quelques jours ouvrés. Nous n’envoyons pas d’e-mails automatiques.",
      company: "Entreprise ou organisation",
      contactName: "Personne de contact",
      email: "Adresse e-mail",
      type: "Type de collaboration",
      typePlaceholder: "Choisissez…",
      message: "Message",
      messageHint: "Quelques lignes sur votre idée, le pays concerné et le calendrier.",
      types: {
        series: "Parrainage de la série « 12 Weeks »",
        sponsored_content: "Contenu sponsorisé sur petprep.si",
        insurer: "Assureur (mise en relation en préparation)",
        directory: "Partenaire fondateur de l’annuaire",
        shelter: "Refuge ou association",
        other: "Autre",
      },
      consentBefore: "J’accepte que PetPrep traite les données saisies dans ce formulaire afin de répondre à ma demande, comme décrit dans la ",
      consentLink: "politique de confidentialité",
      consentAfter: ".",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      successTitle: "Merci, votre demande nous est bien parvenue.",
      successText: "Nous vous répondrons par e-mail.",
      errors: {
        company: "Indiquez votre entreprise ou organisation.",
        contact_name: "Indiquez une personne de contact.",
        email: "Saisissez une adresse e-mail valide.",
        type: "Choisissez un type de collaboration.",
        message: "Écrivez un court message.",
        consent: "Votre consentement est nécessaire pour envoyer le formulaire.",
      },
      rateLimited: "Vous avez déjà envoyé plusieurs demandes. Réessayez dans quelques minutes.",
      invalid: "Une information du formulaire pose problème. Vérifiez les champs signalés.",
      fallbackBefore: "Le formulaire ne peut pas être envoyé pour le moment. Écrivez-nous à ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Chiffres",
      intro: "Nous ne citons que ce que l’on peut vérifier dans le produit. Situation au {date}.",
      breeds: "{n|one=race|other=races} dans le registre des animaux",
      breedsNote: "{dogs} {dogs|one=race|other=races} de chiens et {cats} {cats|one=race|other=races} de chats, chacune avec sa propre page et ses sources citées.",
      languages: "{n|one=langue|other=langues} du site",
      languagesNote: "L’application existe aujourd’hui en slovène et en anglais.",
    },
  },
  kit: {
    htmlLang: "fr",
    company: "PetPrep (société en cours de création)",
    title: "Dossier de presse",
    tagline: "Prêt pour un animal. Présent pour toute sa vie.",
    what: {
      heading: "Qu’est-ce que PetPrep",
      paragraphs: [
        "PetPrep est une application associée à un registre des animaux, qui aide une famille à se préparer à accueillir un chien ou un chat avant son arrivée. Pendant un défi de 12 semaines, l’enfant s’occupe d’un animal virtuel réaliste, tandis que le parent voit dans un tableau de bord comment les soins se passent vraiment.",
        "Le registre des races explique ce dont chaque animal a besoin, sources à l’appui. Chaque chiffre peut être retracé jusqu’à sa source, et chaque contenu partenaire est signalé comme tel.",
      ],
    },
    audience: {
      heading: "Public",
      paragraphs: [
        "Des familles sur le point de choisir un animal de compagnie et des adultes qui veulent vérifier qu’une race leur convient vraiment. Le lecteur sait déjà quelle espèce et quelle race il étudie : l’attention est donc concrète.",
      ],
    },
    coop: {
      heading: "Formes de collaboration",
      items: [
        ["Parrainage de la série « 12 Weeks »", "Le parrain est mentionné dans l’épisode et sa description. Il n’intervient pas dans le contenu de la série."],
        ["Contenus sponsorisés sur petprep.si", "Un article signalé comme tel, à côté d’une fiche de race ou dans la base de connaissances, sans influence sur le contenu ni sur les sources."],
        ["Assureurs", "Parrainage fixe ou rémunération par contact transmis. Contact uniquement avec le consentement explicite d’un parent. La mise en relation est en préparation."],
        ["Partenaire fondateur de l’annuaire", "Vétérinaires, écoles canines, toiletteurs, éleveurs : une fiche mise en avant. 190 € par an, tarif garanti, nombre de places limité par pays."],
        ["Refuges et associations", "Une fiche gratuite et la possibilité de recommander PetPrep aux adoptants."],
      ],
    },
    examples: {
      heading: "Exemples de contenus",
      items: [
        ["L’application", "Un défi de 12 semaines avec un animal virtuel réaliste et un tableau de bord pour les parents."],
        ["Registre des races", "{breeds} {breeds|one=race|other=races} ({dogs} {dogs|one=chien|other=chiens}, {cats} {cats|one=chat|other=chats}) avec leurs sources, situation au {date}."],
        ["Série « 12 Weeks »", "Une série vidéo qui suit 12 semaines de soins à un animal ; une occasion de mentionner un parrain."],
      ],
    },
    never: {
      heading: "Ce que nous ne faisons pas",
      text: "Pas de publicité dans l’application pour enfants, pas de vente de données, pas de promesses de santé, et pas de promotion de races dont les associations vétérinaires déconseillent la publicité.",
    },
    contact: { heading: "Contact", text: "Écrivez-nous à {email} ou utilisez le formulaire sur {url}." },
    page: "Page",
  },
  page: {
    meta: {
      title: "Partenaires et sponsors – collaborez avec PetPrep",
      description:
        "Parrainage de la série « 12 Weeks », contenus sponsorisés, assureurs, partenaires fondateurs de l’annuaire, refuges et associations. Collaboration signalée, sans influence sur le contenu ni sur les sources.",
    },
    eyebrow: "Partenaires et sponsors",
    title: "Touchez les familles juste avant qu’elles choisissent un animal.",
    lead:
      "PetPrep est une application et un registre des races où une famille se prépare avant d’accueillir un chien ou un chat. Nous cherchons des partenaires qui tiennent à une adoption responsable et qui l’assument ouvertement, avec une collaboration clairement signalée.",
    blocks: [
      {
        type: "prose",
        heading: "À qui s’adresse PetPrep",
        paragraphs: [
          "PetPrep s’adresse aux familles sur le point de choisir un animal et aux adultes qui veulent vérifier qu’une race leur convient vraiment. Notre lecteur ne cherche pas au hasard : il sait déjà quelle espèce et quelle race il étudie, et il lit dans le [registre des animaux](page:animals) ce dont cet animal a besoin, sources à l’appui.",
          "Pour un partenaire, c’est un moment rare. La décision n’est pas encore prise, mais l’intérêt est concret. C’est pourquoi nous tenons à ce que chaque collaboration soit clairement signalée et ne change jamais ce que lisent les familles.",
        ],
      },
      {
        type: "cards",
        heading: "Façons de collaborer",
        columns: 3,
        items: [
          { title: "Parrainage de la série « 12 Weeks »", text: "La série suit 12 semaines de soins à un animal. Le parrain est mentionné dans l’épisode et dans sa description ; il n’intervient pas dans le contenu de la série." },
          { title: "Contenus sponsorisés sur petprep.si", text: "Un article à côté d’une fiche de race ou dans la base de connaissances. Il est toujours signalé comme sponsorisé, et le sponsor n’a aucune influence sur la page ni sur ses sources citées." },
          { title: "Assureurs", text: "Rémunération par contact transmis, ou parrainage fixe. Nous ne transmettons un contact qu’avec le consentement explicite d’un parent, et jamais de données concernant un enfant. La mise en relation est en préparation et pas encore disponible." },
          { title: "Partenaire fondateur de l’annuaire", text: "Pour les vétérinaires, écoles canines, toiletteurs et éleveurs : une fiche mise en avant avec logo, description et lien. 190 € par an ; le tarif est garanti aux partenaires fondateurs. Le nombre de places est limité par pays." },
          { title: "Refuges et associations", text: "La fiche est gratuite. Vous pouvez recommander PetPrep aux adoptants pour qu’ils soient mieux préparés à l’arrivée de l’animal." },
        ],
      },
      {
        type: "list",
        heading: "Ce que nous ne faisons pas",
        items: [
          "Nous n’affichons pas de publicité dans l’application pour enfants.",
          "Nous ne vendons pas de données.",
          "Nous ne faisons pas de promesses de santé.",
          "Nous ne promouvons pas de races dont les associations vétérinaires déconseillent la publicité.",
          "Nous ne laissons jamais un sponsor influencer le contenu ou les sources.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Dossier de presse",
        intro: "Un court aperçu de PetPrep pour les partenaires et les médias : ce qu’est PetPrep, à qui il s’adresse, les formes de collaboration et des exemples de contenus.",
        items: [
          { href: "/media/petprep-media-kit-fr.pdf", label: "Dossier de presse (français)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Dossier de presse (anglais)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
