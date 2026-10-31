import type { Dictionary } from "./types";

const fr: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Prêt pour un animal. À ses côtés toute sa vie.",
    siteDescription:
      "PetPrep est un simulateur d’animal de compagnie de 12 semaines qui montre aux parents si leur enfant est vraiment prêt pour un vrai animal – puis devient un assistant IA pour toute la vie de l’animal.",
    slogan: "Prêt pour un animal. À ses côtés toute sa vie.",
    keywords: [
      "mon enfant est-il prêt pour un chien",
      "application responsabilité animal pour enfants",
      "simulateur d’animal virtuel",
      "simulateur d’animal IA",
      "avant d’adopter un chien",
      "enfants et animaux de compagnie",
      "test prêt pour un animal",
      "tableau de bord parent",
      "essayer une race de chien avant l’achat",
      "cette race est-elle faite pour moi",
    ],
  },
  nav: { home: "Accueil", menu: "Menu", close: "Fermer le menu", skip: "Aller au contenu" },
  lang: { label: "Langue", switchTo: "Changer de langue" },
  cta: {
    primary: "Commencer gratuitement avec un chien croisé",
    secondary: "Découvrir le fonctionnement",
    earlyAccess: "Obtenir l’accès anticipé",
    earlyAccessSubject: "PetPrep – accès anticipé",
    ios: "Télécharger pour iPhone",
    android: "Télécharger pour Android",
    comingSoon: "Bientôt sur iPhone et Android",
    readMore: "En savoir plus",
    contactUs: "Nous contacter",
  },
  common: {
    planned: "Prévu",
    plannedNote:
      "Cette page décrit ce que nous développons ensuite. Ce n’est pas encore disponible dans l’application, et certains détails peuvent changer.",
    legalDraft:
      "Ce texte est en cours de finalisation avec nos conseillers juridiques avant le lancement public. Contactez-nous si quelque chose n’est pas clair.",
    lastUpdated: "Dernière mise à jour",
    breadcrumbHome: "Accueil",
    screensNote: "Les écrans de l’application présentés sur ce site sont des aperçus ; l’application finale peut légèrement différer.",
    perPet: "par animal",
    free: "Gratuit",
    forever: "pour toujours",
    notFoundTitle: "Cette page a filé sans sa laisse.",
    notFoundText: "La page que vous cherchez n’existe pas ou a été déplacée.",
    notFoundCta: "Retour à l’accueil",
  },
  footer: {
    tagline: "Prêt pour un animal. À ses côtés toute sa vie.",
    groups: [
      { title: "Produit", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Entreprise", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Confiance", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Tous droits réservés.",
    dataEu: "Données hébergées dans l’UE.",
    languages: "D’autres langues arrivent bientôt.",
    company: "PetPrep est un produit de",
    cookieSettings: "Paramètres des cookies",
    a11yBadge: { title: "Jeu accessible", text: "Gestes simplifiés · Lecteurs d’écran · Moins d’animations" },
  },
  screens: {
    pin: "Connexion de l’enfant avec un code à 6 chiffres fourni par le parent – sans e-mail ni mot de passe.",
    contract: "Le contrat de responsabilité, signé du bout du doigt. La signature donne vie à l’animal.",
    hud: "L’écran d’accueil de l’enfant : l’état de l’animal en direct, quatre besoins et les boutons de soins.",
    picker: "Les parents choisissent l’animal : race, origine (adopté ou acheté chez un éleveur) et âge à l’arrivée.",
    parent: "Le tableau de bord parent : un feu tricolore, le Care Score et les routines du jour pour chaque enfant.",
    report: "Le bilan d’un enfant sur 7, 30 ou 84 jours : routines, promenades et tâches oubliées, jour après jour.",
    assistant: "Quand il arrive à la maison : l’assistant IA transforme les données du collier en une suggestion claire.",
    certificate: "Après 12 semaines : le certificat de responsabilité avec le Care Score de l’enfant.",
  },
  pricingPlans: {
    free: {
      name: "Chien croisé",
      text: "La simulation complète avec un chien croisé plus vrai que nature.",
      features: [
        "Simulation de 12 semaines avec de vraies conséquences",
        "De vraies promenades, comptées en vrais pas par le téléphone",
        "Tableau de bord parent, feu tricolore et Care Score",
        "Heures calmes et bouton pause",
        "Image photoréaliste de votre animal et courtes vidéos",
      ],
      cta: "Commencer gratuitement",
    },
    challenge: {
      name: "Le PetPrep Challenge de 12 semaines",
      badge: "12 semaines + certificat",
      unit: "par animal · 12 semaines",
      text: "Pour les familles qui veulent l’expérience complète et un certificat à la fin.",
      features: [
        "Tout ce qu’offre la formule Chien croisé",
        "Des races exigeantes, comme le [Border Collie](breed:border_collie)",
        "Les humeurs de votre animal en vidéos IA",
        "Certificat de responsabilité",
        "Un seul prix quand des frères et sœurs partagent un animal",
        "Accès pour les deux parents",
      ],
      cta: "Choisir le Challenge",
    },
    note:
      "Les achats se font dans l’application, via l’App Store ou Google Play. Un deuxième animal dans la même famille constitue un Challenge distinct. Les prix incluent la TVA, le cas échéant.",
  },
  earlyAccess: {
    title: "Obtenir l’accès anticipé",
    text: "Faites partie des premières familles à essayer PetPrep. Nous vous écrirons quand ce sera prêt – rien d’autre.",
    label: "Votre adresse e-mail",
    placeholder: "vous@exemple.fr",
    button: "Obtenir l’accès anticipé",
    sending: "Envoi en cours…",
    successTitle: "Vous êtes sur la liste.",
    successText: "Merci ! Vous serez parmi les premiers prévenus par e-mail quand PetPrep sera prêt.",
    invalid: "Veuillez saisir une adresse e-mail valide.",
    error: "Une erreur s’est produite. Veuillez réessayer dans un instant.",
    consent: "En vous inscrivant, vous acceptez de recevoir des e-mails au sujet de PetPrep. Désinscription possible à tout moment.",
    privacyLink: "Politique de confidentialité",
  },
  contactCards: [
    { title: "Familles", text: "Questions sur l’application, votre compte ou le Challenge.", email: "hello" },
    { title: "Confidentialité", text: "Accès, export ou suppression de données, et toute question de confidentialité.", email: "privacy" },
    { title: "Partenaires", text: "Animaleries, refuges, vétérinaires, éducateurs, assureurs et écoles.", email: "partners" },
    { title: "Investisseurs", text: "Note investisseurs, présentation et data room sur demande.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Votre enfant est-il prêt pour un animal ? Réponse en 12 semaines.",
      description:
        "Avant qu’un vrai animal n’arrive à la maison, votre enfant s’occupe pendant 12 semaines d’un animal IA plus vrai que nature : repas, nettoyage, vraies promenades. Chaque jour, vous voyez s’il est vraiment prêt.",
    },
    hero: {
      eyebrow: "Le PetPrep Challenge de 12 semaines",
      title: "Prêt pour un animal. À ses côtés toute sa vie.",
      lead:
        "Avant qu’un vrai animal n’arrive à la maison, votre enfant s’occupe pendant 12 semaines d’un animal IA plus vrai que nature – il le nourrit, nettoie derrière lui et l’emmène faire de vraies promenades. Chaque jour, vous voyez s’il est vraiment prêt.",
      trust: ["Chien croisé gratuit pour toujours", "Pas de pub, pas de discussion avec des inconnus", "Aucun e-mail requis pour les enfants"],
    },
    phone: {
      petName: "Luna",
      petAge: "Chiot · 3 mois",
      live: "EN DIRECT",
      video: "Vidéo photoréaliste de l’animal IA",
      actions: ["Nourrir", "Eau", "Promener", "Nettoyer"],
    },
    parentCard: { child: "Léa", status: "Tout va bien", scoreLabel: "Care Score", progress: "Semaine 3 sur 12 · 31 routines sur 36 à l’heure" },
    notification: { app: "PetPrep", text: "Ton animal regarde sa gamelle. L’heure du petit-déjeuner se termine à 9 h." },
    promoVideo: {
      eyebrow: "PetPrep en une minute",
      title: "Découvrez comment ça marche.",
      text: "Du choix de l’animal et de la signature du contrat jusqu’à l’école, aux promenades, au toilettage et au certificat – tout ce que fait votre enfant en 12 semaines, et tout ce que vous voyez sur le tableau de bord. Curio, notre mascotte, ne fait que dire bonjour ; l’animal de l’application est un chien IA plus vrai que nature.",
      alt: "Vidéo de présentation de PetPrep : écrans de l’application, un enfant qui s’occupe d’un chien, un parent qui suit le Care Score.",
      note: "La vidéo est en anglais. L’application n’est pas encore disponible publiquement sur l’App Store et Google Play – inscrivez-vous pour l’accès anticipé.",
    },
    promise: {
      quote: "Toutes les familles ont déjà entendu « Promis, je m’en occuperai. » PetPrep transforme cette promesse en",
      highlight: "preuve",
      text:
        "Échouer dans la simulation est une réussite pour votre famille : vous le découvrez avant qu’un vrai animal n’en souffre – et avant de vous engager pour des années de soins et de dépenses.",
    },
    how: {
      eyebrow: "Comment ça marche",
      title: "Trois étapes entre « s’il te plaît » et « prêt ».",
      steps: [
        {
          title: "Vous choisissez l’animal",
          text: "Créez un compte famille, ajoutez votre enfant avec un simple surnom et choisissez l’animal – race, adopté ou acheté chez un éleveur, chiot ou senior.",
        },
        {
          title: "Votre enfant signe la promesse",
          text: "Un code à 6 chiffres connecte votre enfant – sans e-mail ni mot de passe. Il signe le contrat de responsabilité du bout du doigt, et son animal, unique au monde, voit le jour.",
        },
        {
          title: "12 semaines de vrais soins",
          text: "Une vraie semaine correspond à un mois de la vie de l’animal. À la fin : un certificat de responsabilité avec le Care Score – une preuve objective, ou un non honnête.",
        },
      ],
      link: "Le fonctionnement en détail",
    },
    realism: {
      title: "Aussi proche d’un vrai animal qu’une application peut l’être.",
      text: "Les heures de repas, les promenades et la croissance s’appuient sur des sources telles que les associations vétérinaires et les clubs de race – pas sur des règles inventées pour un jeu.",
      items: [
        { title: "Vraies promenades, vrais pas", text: "La promenade quotidienne compte les pas du téléphone de votre enfant. Aucune promenade aujourd’hui ? L’animal le ressent dès demain." },
        { title: "Il grandit", text: "Un chiot mange quatre fois par jour, puis trois, puis deux – et reçoit une nouvelle photo en grandissant." },
        { title: "Il se comporte comme un vrai", text: "Les chiots doivent sortir. Les chiens qui s’ennuient mâchouillent les chaussons. Le nettoyage passe avant le dîner." },
        { title: "L’école et le sommeil sont respectés", text: "Pendant les heures calmes, les rappels sont en pause. Un repas qui tombe pendant l’école, c’est à vous de le donner, pas à votre enfant." },
        { title: "De vraies conséquences, en douceur", text: "La négligence mène chez le vétérinaire ou au refuge – jamais rien d’effrayant, toujours avec un nouveau départ." },
        { title: "Unique au monde", text: "Chaque animal a son propre pelage, ses marques et ses yeux – photoréaliste, et jamais deux fois le même." },
      ],
    },
    parents: {
      eyebrow: "Pour les parents",
      title: "Vous voyez la vérité, en direct.",
      text: "Un feu tricolore clair pour chaque enfant, un Care Score fondé sur les routines faites à l’heure et un historique de qui a fait quoi. Les frères et sœurs qui partagent un animal ont chacun leur propre score, équitable.",
      points: [
        { strong: "Heures calmes et bouton pause", text: "vous gardez la main." },
        { strong: "Les enfants se connectent avec un code", text: "pas d’e-mail, pas de nom de famille, pas de pub." },
        { strong: "Les deux parents, tous les enfants", text: "une famille, une seule vue." },
      ],
      link: "Tout ce que voient les parents",
    },
    adults: {
      eyebrow: "Pour les adultes",
      title: "Essayez la race avant de l’accueillir.",
      text: "Vous avez craqué pour une race en particulier ? PetPrep n’est pas réservé aux enfants. Pendant 12 semaines, vous vous occupez d’un animal IA de cette race, avec ses vrais besoins quotidiens – et vous découvrez s’il est vraiment fait pour vous, avant de l’acheter ou de l’adopter.",
      points: [
        {
          strong: "Les vrais besoins de la race",
          text: "repas à heures fixes, eau, nettoyage et un objectif de pas quotidien fondé sur des besoins d’exercice sourcés : un Border Collie adulte a besoin de 12 000 pas par jour, un chien croisé de 6 000.",
        },
        {
          strong: "Éducation et petits accidents de chiot",
          text: "une courte séance d’éducation chaque jour, et un chiot qui ne peut se retenir qu’environ une heure par mois d’âge avant de devoir sortir – sinon, c’est la flaque par terre.",
        },
        {
          strong: "12 semaines pour voir si cela colle à votre vie",
          text: "à vos journées de travail, à votre temps libre et à la météo. Comme ce sera un chien de famille, vous pourrez ajouter votre conjoint ou vos enfants plus tard.",
        },
      ],
      how: "Pour commencer : créez un compte en tant que parent, ajoutez-vous comme profil de soigneur et connectez-vous avec le code à 6 chiffres – sur le même téléphone ou sur un autre.",
      note: "Disponible dès aujourd’hui : le chien croisé et le chat domestique gratuits, ainsi que toutes les races de chiens et de chats du [registre des animaux](page:animals) dans le Challenge de 12 semaines.",
      link: "Utiliser PetPrep seul",
    },
    after: {
      eyebrow: "Quand il arrive à la maison",
      title: "Quand le vrai animal arrive, PetPrep reste.",
      text: "Touchez « Nous avons un vrai animal » et le simulateur devient un assistant IA pour les années à venir – qui connaît déjà le rythme de votre famille.",
      features: [
        { title: "Collier connecté", text: "L’activité, et des alertes quand quelque chose ne va pas." },
        { title: "Premier contact par l’IA", text: "Répond vite, puis passe le relais à un vrai vétérinaire." },
        { title: "Croissance et alimentation", text: "Poids hebdomadaire, courbe de croissance, moment de changer d’alimentation." },
        { title: "Partenaires de confiance", text: "Vétérinaires, éducateurs et assureurs près de chez vous – clairement signalés." },
        { title: "Test ADN", text: "Quelles races composent votre chien croisé – et à quoi faire attention." },
        { title: "Fiche pour le vétérinaire", text: "Mélange de races et résultats ADN réunis au même endroit, prêts pour le vétérinaire." },
      ],
      link: "À propos de l’assistant IA",
      planned: "En développement",
    },
    species: {
      title: "Des chiens et des chats aujourd’hui. D’autres espèces à venir.",
      text: "Conçu pour les familles du monde entier, dans leur propre langue.",
      chips: [
        { label: "Chien · disponible", active: true, link: "species:dog" },
        { label: "Chat · disponible", active: true, link: "species:cat" },
        { label: "Races de chiens et de chats · dans le Challenge", link: "page:animals" },
        { label: "Autres espèces · prévues", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Tarifs", title: "Des tarifs simples et justes." },
    faq: { title: "Les questions des parents", link: "Toutes les questions" },
    final: { title: "Prêt pour un animal ?", text: "Réponse en 12 semaines. Commencez gratuitement, sur iPhone ou Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Comment fonctionne PetPrep – un Challenge de 12 semaines pour savoir si l’on est prêt pour un animal",
        description:
          "Le fonctionnement du PetPrep Challenge de 12 semaines : choix de l’animal, contrat de responsabilité, soins quotidiens, vraies promenades, heures calmes et certificat.",
      },
      eyebrow: "Comment ça marche",
      title: "Douze semaines pour voir ce que vaut une promesse.",
      lead:
        "Votre enfant s’occupe d’un animal IA photoréaliste qui se comporte autant que possible comme un vrai. Une vraie semaine équivaut à un mois de la vie de l’animal : en 12 semaines, il devient adulte – et vous voyez si les soins tiennent la distance.",
      blocks: [
        {
          type: "steps",
          heading: "Du premier geste au certificat",
          items: [
            { title: "Le parent crée la famille", text: "Vous vous inscrivez avec votre e-mail (la connexion avec Apple et Google arrive bientôt). Ajoutez chaque enfant avec un surnom et, si vous le souhaitez, une année de naissance. C’est tout ce que nous demandons sur votre enfant." },
            { title: "Vous choisissez l’animal", text: "Choisissez la race (le chien croisé est gratuit), la provenance de l’animal – adopté dans un refuge ou acheté chez un éleveur – et son âge à l’arrivée : chiot, jeune, adulte ou senior." },
            { title: "Votre enfant se connecte avec un code", text: "Vous recevez un code à 6 chiffres valable 15 minutes. Votre enfant le saisit sur son téléphone – sans e-mail ni mot de passe. Téléphone perdu ? Déconnectez-le de tous ses appareils d’un seul geste." },
            { title: "Le contrat de responsabilité", text: "Votre enfant signe une promesse du bout du doigt. La signature marque la naissance de l’animal : les besoins commencent à compter à partir de ce moment, donc rien n’est perdu s’il signe plus tard." },
            { title: "Douze semaines de soins", text: "Nourrir dans les bonnes plages horaires, donner de l’eau fraîche, nettoyer et faire une promenade quotidienne en vrais pas. À mesure que l’animal grandit, ses besoins évoluent." },
            { title: "Le certificat", text: "Après 12 semaines, l’animal fête son premier anniversaire. Votre enfant reçoit un certificat de responsabilité avec son Care Score – ou vous découvrez ensemble, sans risque, que ce n’est pas encore le moment." },
          ],
        },
        {
          type: "screens",
          heading: "Ce que voit votre enfant",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Les besoins quotidiens d’un chien croisé adulte",
          intro: "Les chiffres proviennent de sources vétérinaires et de clubs de race ; quand les sources ne donnent qu’une fourchette, PetPrep fixe la valeur et l’indique.",
          head: ["Besoin", "Fréquence", "En cas d’oubli"],
          rows: [
            ["Nourriture", "Le matin (6 h–10 h) et le soir (17 h–21 h), une fois par plage", "Faim au bout d’environ 12,5 heures"],
            ["Eau", "3 fois par jour, à au moins 3 heures d’intervalle", "Soif au bout d’environ 10 heures"],
            ["Promenade", "6 000 vrais pas (les chiots commencent à 2 000)", "Aucune promenade → malade le lendemain matin"],
            ["Nettoyage", "Quand l’animal fait des saletés – jamais pendant les heures calmes", "Ni nourriture ni eau tant que ce n’est pas propre"],
          ],
          note: "Les chiots mangent 4, puis 3, puis 2 fois par jour et ne peuvent se retenir qu’environ une heure par mois d’âge. Un [Border Collie](breed:border_collie) a besoin de 12 000 pas et a faim plus vite.",
        },
        {
          type: "cards",
          heading: "Pensé pour la vraie vie de famille",
          columns: 3,
          items: [
            { title: "Heures calmes", text: "Définissez les horaires d’école et de sommeil. L’animal ralentit, aucun rappel n’est envoyé et aucune saleté n’apparaît pendant ces heures." },
            { title: "Les repas pendant l’école", text: "Une plage de repas qui tombe entièrement pendant les heures calmes revient au parent – elle ne compte jamais contre votre enfant." },
            { title: "Pause à tout moment", text: "Un bouton met le jeu en pause, par exemple pour une discussion en famille. Rien ne se dégrade pendant la pause." },
            { title: "Des rappels en douceur", text: "L’animal fait d’abord signe à votre enfant, puis insiste. Ce n’est que si un besoin reste à zéro pendant une heure que vous recevez une alerte." },
            { title: "De vraies conséquences", text: "La négligence, c’est 12 heures chez le vétérinaire. Une journée entière de négligence, et le refuge recueille l’animal – vous pouvez alors recommencer." },
            { title: "Animaux partagés", text: "Des frères et sœurs peuvent partager un animal. Chaque action est attribuée à l’enfant qui l’a faite : le score reste équitable." },
          ],
        },
        {
          type: "callout",
          title: "Échouer, c’est aussi un résultat.",
          text: "Si l’animal finit au refuge virtuel, vous avez appris quelque chose de précieux – avant qu’un vrai animal n’en paie le prix. Vous pouvez recommencer, y compris avec une race plus facile.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Pour les parents – le tableau de bord PetPrep, le Care Score et les outils de contrôle",
        description:
          "Ce que les parents voient dans PetPrep : un feu tricolore quotidien par enfant, le Care Score, les routines, les bilans, les notifications, les heures calmes, la pause et une confidentialité dès la conception.",
      },
      eyebrow: "Pour les parents",
      title: "Une preuve objective, pas une promesse de plus.",
      lead:
        "Plus besoin de deviner si les promenades ont vraiment eu lieu. PetPrep mesure les soins par rapport à des routines quotidiennes claires et vous montre, enfant par enfant, comment ça se passe.",
      blocks: [
        {
          type: "cards",
          heading: "Le feu tricolore",
          intro: "Chaque enfant et chaque animal reçoit une couleur pour la journée, à l’heure locale de votre famille – toujours accompagnée de la raison, en toutes lettres.",
          columns: 3,
          items: [
            { title: "Vert – tout va bien", text: "Les routines sont sur les rails.", tag: "ok" },
            { title: "Jaune – à surveiller", text: "Plus de deux routines ont été manquées aujourd’hui.", tag: "warn" },
            { title: "Rouge – urgent", text: "L’animal est tombé malade aujourd’hui, un besoin est à zéro depuis plus d’une heure, ou l’animal est parti au refuge.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Le Care Score",
          paragraphs: [
            "Care Score = routines faites à l’heure ÷ routines attendues × 100, moins 10 points par maladie, entre 0 et 100.",
            "Une routine est une tâche concrète : chaque plage de repas, chacun des trois remplissages d’eau, le nettoyage de chaque saleté dans les deux heures (l’école et le sommeil ne comptent pas) et l’objectif de promenade du jour atteint.",
            "Le temps de pause, le temps passé par l’animal chez le vétérinaire et la période qui précède la signature du contrat ne comptent jamais contre votre enfant. Les jours passés sont figés : un score ne peut pas être réécrit après coup.",
            "Les frères et sœurs qui partagent un animal se répartissent chaque routine équitablement. Seules les actions de l’enfant lui-même comptent – si l’un fait tout, il obtient 100 et l’autre 0.",
          ],
        },
        {
          type: "screens",
          heading: "Votre vue",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Vous gardez la main",
          items: [
            "Des heures calmes pour l’école et le sommeil, à votre heure locale – y compris lors des changements d’heure.",
            "Mettez le jeu en pause pour n’importe quel animal d’un geste confirmé ; l’écran de votre enfant se verrouille en direct.",
            "Invitez l’autre parent avec un code à usage unique ; vous voyez tous les deux chaque enfant et chaque animal.",
            "Déconnectez un enfant de tous ses appareils en cas de perte de téléphone ; les codes sont à usage unique et expirent au bout de 15 minutes.",
            "Exportez toutes les données de votre famille dans un fichier, ou supprimez instantanément le profil d’un enfant ou tout votre compte depuis l’application.",
          ],
        },
        {
          type: "list",
          heading: "Confidentialité dès la conception",
          items: [
            "Les enfants se connectent avec un code – sans e-mail, sans mot de passe, sans nom de famille.",
            "Nous enregistrons un surnom et, si vous l’ajoutez, une année de naissance. Rien d’autre sur votre enfant.",
            "Les notifications ne contiennent jamais le nom de votre enfant ni celui de l’animal, car elles peuvent s’afficher sur l’écran verrouillé.",
            "Les pas proviennent d’Apple Santé (iPhone) ou de Health Connect (Android) si vous l’autorisez (en lecture seule), et du capteur de mouvement du téléphone lorsqu’il est disponible. PetPrep n’utilise pas le GPS et ne suit pas la localisation.",
            "Pas de pub, pas de discussion avec des inconnus, des serveurs dans l’UE.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Quand il arrive à la maison – l’assistant IA de PetPrep pour votre vrai animal",
        description:
          "Quand votre famille accueille un vrai animal, PetPrep devient un assistant IA : activité du collier connecté, alertes, premier contact par l’IA puis un vrai vétérinaire, croissance et alimentation.",
      },
      eyebrow: "Quand il arrive à la maison",
      title: "La simulation se termine. Les soins, non.",
      lead:
        "Quand votre famille ramène un vrai animal à la maison, un simple geste transforme PetPrep en assistant pour toute la vie de l’animal – en temps réel, sans jauges de santé, et en connaissant déjà les habitudes de votre famille.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Ce que fera l’assistant",
          columns: 2,
          items: [
            { title: "Intégration du collier connecté", text: "Connectez les traceurs GPS et d’activité les plus répandus – ou un collier PetPrep – et voyez l’activité dans son contexte." },
            { title: "Des alertes qui expliquent", text: "« Max a couru 2 km aujourd’hui, moitié moins que d’habitude, et a mangé un plus gros repas. Une promenade de plus ce soir l’aidera à se calmer. » Une observation, une raison, une suggestion." },
            { title: "D’abord l’IA, ensuite un vrai vétérinaire", text: "Posez une question ou envoyez une photo. L’assistant répond aux questions générales, évalue l’urgence et vous oriente vers un vrai vétérinaire si nécessaire – les signes urgents vont directement chez un vétérinaire." },
            { title: "Test ADN pour votre chien ou votre chat", text: "Commandez un test ADN dans l’application ou importez le résultat d’un test déjà fait. PetPrep montre quelles races composent le mélange, ce qui est typique chez elles et quels problèmes de santé y sont plus fréquents – avec les sources. Les pourcentages de races ne sont pas un diagnostic, et un test ADN ne révèle pas les allergies." },
            { title: "Une fiche pour le vétérinaire", text: "Le mélange de races et les éventuels résultats ADN directs sur une seule page ou un QR code, pour que votre vétérinaire sache tout de suite ce que contient un croisé." },
            { title: "Croissance et nutrition", text: "Notez le poids chaque semaine, suivez la courbe de croissance et recevez un rappel quand il est temps de changer d’alimentation." },
          ],
        },
        {
          type: "screens",
          heading: "Un aperçu",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Des principes sur lesquels nous ne transigerons pas",
          items: [
            "L’assistant IA n’est pas un vétérinaire et ne pose jamais de diagnostic. Chaque réponse liée à la santé indique un moyen de joindre un vrai vétérinaire.",
            "Les offres de partenaires (boutiques, assureurs, éducateurs, vétérinaires) sont toujours signalées, et nous indiquons quand nous touchons une commission.",
            "Rien n’est partagé avec un partenaire sans votre consentement.",
            "Les données de votre enfant issues du Challenge ne sont transférées à l’assistant qu’avec votre accord.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Tarifs – PetPrep est gratuit pour commencer, 49,99 € pour le Challenge de 12 semaines",
        description:
          "Le chien croisé est gratuit pour toujours. Le PetPrep Challenge de 12 semaines coûte 49,99 € par animal, en achat unique. Un seul prix pour les frères et sœurs qui partagent un animal.",
      },
      eyebrow: "Tarifs",
      title: "Des tarifs simples et justes.",
      lead: "Commencez gratuitement avec un chien croisé. Achetez le Challenge complet de 12 semaines quand vous êtes prêt – les 12 semaines commencent à l’achat.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Souhaits – des objets pour votre animal",
          intro:
            "Dans l’application, votre enfant demande des objets pour son animal ; c’est vous qui décidez et qui achetez. Votre enfant ne voit jamais aucun prix. Les objets sont purement esthétiques : ils ne modifient jamais les besoins, le Care Score ni le certificat. Également disponibles pour le chien croisé et le chat domestique gratuits.",
          head: ["Objet", "Prix"],
          rows: [
            ["Panier (chat : corbeille)", "5,99 €"],
            ["Gamelles pour la nourriture et l’eau", "5,99 €"],
            ["Jouet (chien : corde ou jouet qui couine ; chat : souris en peluche ou canne à plumes)", "5,99 € par jouet"],
            ["Friandises, paquet de 10", "2,99 €"],
            ["Pack de bienvenue : panier + gamelles + jouet", "15,99 € (au lieu de 17,97 €)"],
          ],
          note: "Les Souhaits arrivent avec la prochaine mise à jour de l’application ; ils pourront être achetés dès que les objets seront disponibles sur l’App Store et Google Play. Les prix indiqués sont ceux de la Slovénie ; la boutique affiche le prix de votre pays.",
        },
        {
          type: "faq",
          heading: "Questions sur les tarifs",
          items: [
            { q: "La formule gratuite est-elle vraiment gratuite ?", a: "Oui. Le chien croisé est gratuit pour toujours, avec la simulation complète, les vraies promenades et le tableau de bord parent." },
            { q: "Que comprend le Challenge ?", a: "Des races exigeantes comme le [Border Collie](breed:border_collie), les humeurs de votre animal en vidéos IA, le certificat de responsabilité à la fin et l’accès pour les deux parents." },
            { q: "Les frères et sœurs paient-ils deux fois ?", a: "Non. Les enfants qui partagent un même animal paient un seul prix. Un deuxième animal dans la famille constitue un Challenge distinct." },
            { q: "Comment payer ?", a: "Dans l’application, via l’App Store ou Google Play. Les remboursements passent par votre compte de la boutique." },
            { q: "Que sont les Souhaits, et mon enfant peut-il acheter seul ?", a: "Votre enfant peut demander un panier, des gamelles, un jouet ou des friandises pour son animal – jusqu’à trois demandes en cours à la fois. Vous recevez une notification et vous l’achetez ou choisissez « Not now » (« Pas maintenant »). Votre enfant ne voit jamais les prix et ne peut rien acheter dans l’application enfant." },
            { q: "Les objets achetés rendent-ils le jeu plus facile ?", a: "Non. Les objets sont purement esthétiques. Ils ne modifient jamais les besoins, le Care Score ni le certificat, et il n’y a ni vétérinaire ni médicament dans les Souhaits – jamais de « payez pour sauver votre animal »." },
            { q: "Est-ce la même chose pour les adultes ?", a: "Oui. Si vous utilisez PetPrep seul pour essayer une race, les mêmes règles s’appliquent : le chien croisé est gratuit pour toujours et le Challenge de 12 semaines coûte 49,99 € par animal." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "FAQ – les questions des parents sur PetPrep",
        description:
          "Réponses sur PetPrep : temps quotidien, utilisation par un adulte, confidentialité et localisation, pas, frères et sœurs, ce qui se passe en cas d’échec, langues, espèces, vrais animaux.",
      },
      eyebrow: "FAQ",
      title: "Les questions des parents.",
      lead: "Des réponses courtes et honnêtes. Il vous manque quelque chose ? Écrivez-nous.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "À partir de quel âge ?", a: "Pour les enfants, PetPrep est conçu pour les 7 à 12 ans environ et convient bien jusqu’à 16 ans. Des adultes l’utilisent aussi, pour vérifier si une race en particulier est vraiment faite pour eux avant de l’acheter ou de l’adopter." },
            { q: "Puis-je utiliser PetPrep seul, sans enfants ?", a: "Oui. Créez un compte en tant que parent et ajoutez-vous comme profil de soigneur – un surnom suffit, laissez l’année de naissance vide. Choisissez la race, créez un code à 6 chiffres, puis, sur le même téléphone ou sur un autre, choisissez « I’m a kid » (« Je suis un enfant ») et saisissez le code – c’est ainsi que vous devenez le soigneur. Comme ce sera un chien de famille, vous pourrez ajouter votre conjoint ou vos enfants plus tard pour vous en occuper ensemble. Le prix est le même que pour les familles." },
            { q: "Combien de temps cela prend-il chaque jour ?", a: "Quelques minutes pour la nourriture, l’eau et le nettoyage – plus la promenade dont un vrai chien aurait de toute façon besoin." },
            { q: "L’application suit-elle la localisation de mon enfant ?", a: "Non. Pour les promenades, elle compte uniquement les pas. Si vous l’autorisez, elle les lit dans Apple Santé (iPhone) ou Health Connect (Android) – en lecture seule et uniquement les pas ; lorsqu’il est disponible, elle utilise aussi le capteur de mouvement du téléphone. Elle demande l’autorisation sur l’écran de promenade. Le GPS n’est pas utilisé." },
            { q: "Mon enfant a-t-il besoin d’une adresse e-mail ?", a: "Non. C’est vous qui créez le compte ; votre enfant se connecte avec un code à 6 chiffres que vous générez. Nous enregistrons seulement un surnom et, si vous le souhaitez, une année de naissance." },
            { q: "Que se passe-t-il si mon enfant oublie ?", a: "L’animal envoie d’abord de gentils rappels. Si un besoin reste à zéro, l’animal tombe malade et passe 12 heures chez le vétérinaire. Après une journée entière sans soins, le refuge virtuel le recueille – et vous pouvez recommencer." },
            { q: "Des frères et sœurs peuvent-ils partager un animal ?", a: "Oui. Chaque enfant signe son propre contrat, chaque action est attribuée à celui qui l’a faite et chaque enfant obtient son propre Care Score, équitable." },
            { q: "Et l’école, et l’heure du coucher ?", a: "Définissez des heures calmes. L’animal ralentit, rien n’est envoyé, et c’est vous qui vous chargez des repas qui tombent entièrement pendant les heures calmes." },
            { q: "Est-ce effrayant pour les enfants ?", a: "Non. Les conséquences sont réelles mais douces : l’animal va chez le vétérinaire ou au refuge, jamais rien de choquant, et il y a toujours un nouveau départ." },
            { q: "Quels animaux sont disponibles ?", a: "Les [chiens](species:dog) et les [chats](species:cat) aujourd’hui : un chien croisé et un chat domestique gratuits et, dans le Challenge de 12 semaines, toutes les races du [registre des animaux](page:animals), qui présente aussi leurs besoins sourcés. D’autres espèces sont prévues." },
            { q: "Dans quelles langues ?", a: "L’application existe aujourd’hui en anglais et en slovène. D’autres langues arriveront à mesure que PetPrep sera lancé dans de nouveaux pays." },
            { q: "Que se passe-t-il quand nous avons un vrai animal ?", a: "PetPrep peut devenir un assistant IA pour votre vrai animal. Cette partie est en cours de développement." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partenaires – travailler avec PetPrep",
        description:
          "PetPrep s’associe à des animaleries, refuges, vétérinaires, éducateurs, assureurs, fabricants de colliers et écoles pour aider les familles à accueillir un animal de manière responsable.",
      },
      eyebrow: "Partenaires",
      title: "Des familles mieux préparées, pour tous ceux qui aiment les animaux.",
      lead:
        "Les familles qui terminent PetPrep savent ce qu’un animal demande vraiment. Nous construisons un réseau de partenaires qui les accompagne au bon moment – clairement signalé et toujours avec le consentement de la famille.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Avec qui nous travaillons",
          columns: 3,
          items: [
            { title: "Animaleries", text: "Touchez les familles au moment où elles prouvent qu’elles sont prêtes – par exemple avec une offre de kit de démarrage au moment du certificat." },
            { title: "Refuges, associations et éleveurs", text: "Recommandez PetPrep avant une adoption ou un achat, pour moins de décisions impulsives et moins de retours d’animaux." },
            { title: "Vétérinaires", text: "Quand le vrai animal arrive à la maison, l’assistant IA répond aux premières questions et oriente les propriétaires vers vous, avec un résumé du cas partagé uniquement avec leur consentement." },
            { title: "Éducateurs et écoles du chiot", text: "Recommandations et réservation quand une famille passe à un vrai chien." },
            { title: "Assureurs pour animaux", text: "Des offres adaptées à la race quand un vrai animal est enregistré – clairement signalées." },
            { title: "Fabricants de colliers et d’objets connectés", text: "Intégration des données d’activité pour des alertes plus intelligentes et expliquées." },
          ],
        },
        {
          type: "list",
          heading: "Pourquoi les partenaires nous font confiance",
          items: [
            "Les enfants se connectent sans e-mail et nous réduisons leurs données au strict minimum, sur des serveurs situés dans l’UE.",
            "Seuls des contenus vérifiés s’affichent sur l’écran d’un enfant ; il n’y a aucune publicité.",
            "Chaque offre de partenaire est signalée et chaque commission est indiquée à la famille.",
          ],
        },
        { type: "callout", title: "Parlons-en.", text: "Les conditions de partenariat sont en préparation. Dites-nous qui vous êtes et ce que vous avez en tête.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investir dans PetPrep – de la préparation à l’accueil d’un animal aux soins de toute une vie",
        description:
          "PetPrep transforme la promesse d’un enfant en preuve avant que la famille n’accueille un animal, puis devient un assistant IA pour toute sa vie. Avant lancement ; note sur demande.",
      },
      eyebrow: "Investisseurs",
      title: "D’un Challenge de 12 semaines à une relation de 10 à 15 ans.",
      lead:
        "PetPrep apporte aux parents une preuve objective que leur enfant est prêt – ou non – pour un vrai animal, puis accompagne la famille pendant toute la vie de l’animal.",
      blocks: [
        {
          type: "cards",
          heading: "L’opportunité",
          columns: 3,
          items: [
            { title: "Problème", text: "Les enfants promettent de s’occuper d’un animal ; les parents n’ont aucun moyen neutre de le vérifier avant d’engager de l’argent et des années de soins." },
            { title: "Solution", text: "Une simulation réaliste de 12 semaines avec un tableau de bord parent en direct et un Care Score objectif, qui se conclut par un certificat de responsabilité." },
            { title: "Expansion", text: "Quand le vrai animal arrive à la maison, un assistant IA dédié : données du collier, premier contact par l’IA avec des vétérinaires, croissance et nutrition, tests ADN, services partenaires." },
          ],
        },
        {
          type: "table",
          heading: "Modèle économique",
          head: ["Source de revenus", "Modèle", "Statut"],
          rows: [
            ["Chien croisé", "Gratuit pour toujours (acquisition)", "Décidé"],
            ["PetPrep Challenge de 12 semaines", "49,99 € par animal, achat unique", "Décidé"],
            ["Souhaits – objets pour l’animal (purement esthétiques)", "Achats intégrés : 5,99 € par objet, friandises 2,99 € les 10, pack 15,99 € ; aussi dans la formule gratuite", "Développé, achat en boutique bientôt disponible"],
            ["Offres partenaires", "Commissions des boutiques, assureurs, vétérinaires et éducateurs", "Prévu"],
            ["Assistant IA pour le vrai animal", "Abonnement", "Prévu"],
            ["Tests ADN pour chiens et chats", "Vente de tests et commission partenaire", "Prévu"],
          ],
        },
        {
          type: "list",
          heading: "Ce qui est déjà construit",
          items: [
            "Moteur de jeu côté serveur avec synchronisation en temps réel, testé sur des simulations de journées entières, des jours de changement d’heure et des cas particuliers de familles.",
            "Familles avec plusieurs parents, plusieurs enfants et des animaux partagés, avec un score équitable pour chaque enfant.",
            "Des animaux IA photoréalistes et uniques, avec des coûts d’IA mesurés et plafonnés, et des médias stockés sur nos propres serveurs dans l’UE.",
            "Des besoins des animaux fondés sur des sources citées (vétérinaires et clubs de race), chaque chiffre pouvant être rattaché à sa source.",
            "Sécurité des enfants dès la conception : connexion par code PIN sans e-mail, données minimales, aucune publicité, uniquement des médias vérifiés.",
          ],
        },
        {
          type: "prose",
          heading: "Stade",
          paragraphs: [
            "PetPrep est en phase de prélancement, avec une bêta fermée prévue. Le premier marché est la Slovénie et la région, suivi de la zone DACH et du Royaume-Uni ; le produit est conçu dès le premier jour pour être localisé dans le monde entier.",
            "Fondateur : David Tacer, développeur de logiciels et entrepreneur (Data Vallis David Tacer s.p., Dravograd, Slovénie). Pour en savoir plus : [à propos de nous](page:about).",
          ],
        },
        { type: "callout", title: "Demandez la note investisseurs.", text: "Nous communiquons la note, la présentation et la data room sur demande.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contacter PetPrep – familles, confidentialité, partenaires, investisseurs",
        description: "Contactez PetPrep : questions des familles, demandes liées à la confidentialité, partenariats et demandes d’investisseurs. Nous répondons en anglais ou en slovène.",
      },
      eyebrow: "Contact",
      title: "Nous lisons chaque message.",
      lead: "Écrivez à la bonne adresse et nous vous répondrons dès que possible, en anglais ou en slovène.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Informations sur l’entreprise" }],
    },
    privacy: {
      navLabel: "Confidentialité",
      meta: {
        title: "Politique de confidentialité – PetPrep",
        description: "Comment PetPrep collecte, utilise et protège les données personnelles des parents et des enfants, et comment exercer vos droits au titre du RGPD.",
      },
      eyebrow: "Mentions légales",
      title: "Politique de confidentialité",
      lead: "Traduction – seule la version anglaise fait foi. PetPrep est conçu avant tout pour les enfants : nous collectons donc le moins de données possible et expliquons précisément ce que nous en faisons.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Qui est responsable",
              paragraphs: [
                "Le responsable du traitement des données personnelles traitées via l’application PetPrep et ce site web est {company}, {address} ; {companyIds}. Contact pour les questions de confidentialité : {privacyEmail}.",
              ],
            },
            {
              heading: "2. Ce que nous collectons",
              items: [
                "Compte parent : nom (la façon dont votre famille vous appelle), adresse e-mail, mot de passe (stocké uniquement sous forme de hachage sécurisé), fuseau horaire de votre appareil, et date et heure auxquelles vous avez accepté les conditions et la présente politique.",
                "Profil de soigneur (un enfant ou un adulte qui s’occupe de l’animal) : un surnom de 30 caractères au maximum et, facultativement, une année de naissance – laissée vide pour un adulte. Ni e-mail, ni mot de passe, ni nom de famille, ni date de naissance.",
                "Appareils : le modèle du téléphone (par exemple « iPhone », jamais le nom que l’utilisateur a donné à son téléphone) et, pour les notifications, un jeton push, la plateforme et la version de l’application.",
                "Activité de soins : actions dans la simulation (nourriture, eau, nettoyage, promenades), totaux quotidiens de pas (ou de poussées de fauteuil roulant en mode adapté – voir les sections 3 et 4), scores et bilans.",
                "Le contrat de responsabilité : la signature que l’enfant trace du doigt, enregistrée sous forme de tracé vectoriel avec la date et l’heure de signature.",
                "Codes : les codes de connexion et d’invitation sont stockés uniquement sous forme de hachage et expirent.",
                "Rapports d’erreur de l’application : si l’application se fige ou plante, elle peut envoyer un court rapport technique à notre serveur dans l’UE (type et texte de l’erreur, emplacement dans le code, version de l’application et du système, nom de l’écran, rôle parent/enfant). Il ne contient ni nom, ni adresse e-mail, ni identifiant d’utilisateur, ni adresse IP, n’est partagé avec aucun tiers et est supprimé au bout de 30 jours.",
                "Liste d’accès anticipé (ce site web) : votre adresse e-mail, la langue de la page et la date et l’heure de votre inscription.",
              ],
            },
            {
              heading: "3. Données de santé et de forme (pas, Apple Santé et Health Connect)",
              paragraphs: [
                "PetPrep accède à un seul type de données de santé et de forme et le collecte : le nombre de pas que le soigneur fait chaque jour (activité physique). Nous l’utilisons pour une seule fonctionnalité – la promenade quotidienne de l’animal dans la simulation : l’enfant marche, et ses pas comptent comme la promenade de l’animal.",
                "Comment nous y accédons : l’application sur le téléphone de l’enfant compte les pas. Si vous l’autorisez dans la boîte de dialogue d’autorisation du système, elle les lit dans Apple Santé (iPhone) ou Health Connect (Android) – en lecture seule et uniquement les pas. Lorsqu’il est disponible, elle utilise aussi le capteur de mouvement du téléphone (Android : autorisation « Activité physique » ; iPhone : « Mouvements et forme ») ; sans autorisation pour Apple Santé ou Health Connect, seul le capteur de mouvement compte les pas.",
                "Ce que nous collectons : l’application n’envoie à notre serveur que le total de pas du jour, sa source (Apple Santé, Health Connect ou le capteur de mouvement) et l’heure de l’envoi. Nous enregistrons un total quotidien par profil de soigneur – jamais de mouvements individuels, d’itinéraires, de localisation, de fréquence cardiaque, de sommeil, de poids ni aucune autre donnée de santé. Nous n’écrivons jamais rien dans Apple Santé ni dans Health Connect.",
                "Comment nous les utilisons et les partageons : les totaux de pas servent uniquement à faire fonctionner la promenade dans la simulation et à l’afficher au parent (tableau de bord et bilans). Nous ne les utilisons pas pour la publicité, le profilage, des évaluations de santé ni pour entraîner des modèles d’IA, nous ne les vendons pas et nous ne les partageons pas avec des tiers ; seul notre hébergeur (Hetzner, serveurs dans l’UE) les stocke pour notre compte. Notre utilisation des données reçues de Health Connect respecte la politique d’autorisations de Health Connect, y compris ses exigences d’utilisation limitée (Limited Use).",
                "Base juridique et conservation : la lecture des pas est facultative et n’a lieu qu’avec l’autorisation que vous donnez sur l’appareil ; nous traitons le total quotidien pour fournir le service que vous avez choisi (exécution d’un contrat). Les totaux de pas sont inclus dans l’export des données de votre famille et sont supprimés avec le profil de soigneur ou votre compte ; ils disparaissent de nos sauvegardes chiffrées dans un délai de 35 jours au plus tard.",
                "Vous pouvez retirer l’autorisation à tout moment dans les réglages de votre appareil : iPhone → Réglages → Santé → Accès aux données et appareils → PetPrep ; Android → Health Connect → Autorisations des applications → PetPrep. L’autorisation du capteur de mouvement peut être retirée dans les paramètres du téléphone pour l’application PetPrep. La promenade ne compte alors plus de nouveaux pas.",
              ],
            },
            {
              heading: "4. Mode adapté (poussées de fauteuil roulant)",
              paragraphs: [
                "Le mode adapté s’adresse aux enfants qui utilisent un fauteuil roulant : la promenade compte alors les poussées de fauteuil roulant au lieu des pas. Il arrive dans l’application avec la prochaine mise à jour ; nous décrivons ci-dessous les données que nous traitons si un parent l’active.",
                "Si un parent active le mode adapté pour un enfant, nous enregistrons uniquement le fait qu’il est activé. Nous ne demandons ni n’enregistrons aucune raison, aucun diagnostic ni aucun état de santé.",
                "Tant qu’il est activé, l’application sur le téléphone de l’enfant lit uniquement les poussées de fauteuil roulant au lieu des pas – dans Apple Santé (enregistrées par une Apple Watch) ou Health Connect, avec une autorisation distincte en lecture seule. Elle n’utilise alors pas le capteur de mouvement. Seul le nombre de poussées du jour est envoyé à notre serveur ; nous notons pour ce jour-là qu’il compte des poussées.",
                "Un parent peut saisir des minutes de promenade pour un enfant en mode adapté (pour le jour même uniquement). Nous enregistrons la date, le nombre de minutes et le parent qui a saisi la promenade.",
                "Comme le fait que le mode adapté soit activé peut révéler un état de santé de l’enfant, nous ne le traitons que sur la base de votre consentement explicite (art. 9, paragraphe 2, point a), du RGPD), que vous donnez en tant que parent ou représentant légal au nom de l’enfant (art. 8 du RGPD) en activant l’interrupteur. Vous pouvez désactiver le mode à tout moment ; l’application compte alors de nouveau les pas.",
                "Ces données (l’interrupteur, les jours comptés en poussées et les promenades saisies) sont incluses dans l’export des données de votre famille et sont supprimées avec le profil de l’enfant ou votre compte ; elles disparaissent de nos sauvegardes chiffrées dans un délai de 35 jours au plus tard, comme toutes les autres données.",
              ],
            },
            {
              heading: "5. Ce que nous ne collectons pas",
              items: [
                "Aucune localisation : PetPrep n’utilise pas le GPS.",
                "Aucune autre donnée de santé provenant d’Apple Santé ou de Health Connect au-delà du nombre quotidien de pas ou de poussées de fauteuil roulant.",
                "Aucune publicité et aucun SDK publicitaire ou de suivi tiers dans l’application.",
                "Aucune messagerie entre utilisateurs.",
                "Aucun cookie publicitaire sur ce site web. Les cookies analytiques ne sont déposés que si vous les autorisez (voir Cookies ci-dessous).",
              ],
            },
            {
              heading: "6. Pourquoi nous traitons des données (finalités et bases juridiques)",
              items: [
                "Pour fournir le service que vous avez demandé : comptes, simulation, tableau de bord, bilans et notifications (exécution d’un contrat).",
                "Pour traiter les achats via l’App Store ou Google Play (exécution d’un contrat).",
                "Pour la promenade quotidienne (totaux quotidiens de pas – données de santé et de forme, voir la section 3) : exécution d’un contrat ; lecture depuis Apple Santé, Health Connect ou le capteur de mouvement uniquement avec l’autorisation que vous donnez sur l’appareil.",
                "Pour le mode adapté (le fait qu’il soit activé, les poussées de fauteuil roulant et les promenades saisies) : le consentement explicite du parent, donné en activant l’interrupteur (art. 9, paragraphe 2, point a), et art. 8 du RGPD – voir la section 4).",
                "Pour assurer la sécurité du service, par exemple en limitant les tentatives de connexion répétées (intérêt légitime).",
                "Pour faire fonctionner et sécuriser le service grâce aux rapports d’erreur de l’application, qui nous aident à corriger les blocages et les plantages (intérêt légitime).",
                "Pour respecter nos obligations légales, comme la comptabilisation des achats (obligation légale).",
                "Pour vous écrire au sujet du lancement de PetPrep si vous vous êtes inscrit à la liste d’accès anticipé (consentement – vous pouvez vous désinscrire dans chaque e-mail).",
                "Pour comprendre comment les visiteurs utilisent ce site web, avec Google Analytics, uniquement si vous autorisez les cookies analytiques (consentement – vous pouvez modifier votre choix à tout moment dans les paramètres des cookies).",
              ],
            },
            {
              heading: "7. Enfants",
              paragraphs: [
                "Seul un parent ou un représentant légal peut créer un compte et ajouter un enfant. Le parent décide de ce que l’enfant peut faire et peut supprimer le profil de l’enfant à tout moment. Nous ne demandons jamais de coordonnées à un enfant, ne montrons jamais de publicité et ne permettons jamais de contact avec des inconnus.",
                "Le titulaire du compte peut aussi créer un profil de soigneur pour lui-même ou pour un autre adulte de la famille – par exemple pour vérifier si une race lui convient avant de l’acheter ou de l’adopter. Les mêmes règles et les mêmes données minimales s’appliquent à ce profil ; toutes les protections conçues pour les enfants s’y appliquent également.",
              ],
            },
            {
              heading: "8. Images et vidéos générées par IA",
              paragraphs: [
                "La photo et les courtes vidéos de chaque animal sont créées par un service d’IA uniquement à partir d’une description de l’animal (race, pelage, marques, etc.). Cette description ne contient jamais de noms ni aucune information sur votre famille. Les médias finalisés sont stockés sur nos propres serveurs dans l’UE et affichés via des liens à durée de vie limitée.",
              ],
            },
            {
              heading: "9. Prestataires de services",
              items: [
                "Hébergement : Hetzner Online (serveurs dans l’UE).",
                "Génération d’images et de vidéos par IA : fal.ai (ne reçoit que la description de l’animal).",
                "Notifications push : Apple Push Notification service et Firebase Cloud Messaging via Expo ; les notifications ne contiennent aucun nom.",
                "Achats : Apple App Store et Google Play ; gestion des achats via RevenueCat lorsque les achats seront activés.",
                "E-mails d’accès anticipé : Klaviyo (ne reçoit que l’adresse e-mail et la langue que vous indiquez sur ce site web).",
                "Consentement aux cookies du site web : CookieYes (enregistre votre choix de consentement).",
                "Mesure d’audience du site web : Google Analytics 4 de Google Ireland Ltd., uniquement avec votre consentement ; Google Analytics 4 n’enregistre pas les adresses IP.",
              ],
            },
            {
              heading: "10. Durée de conservation des données",
              paragraphs: [
                "Nous conservons vos données tant que votre compte existe. Lorsque vous supprimez le profil d’un enfant ou votre compte dans l’application, les données sont supprimées immédiatement et ne peuvent pas être restaurées ; elles disparaissent automatiquement de nos sauvegardes chiffrées dans un délai de 35 jours au plus tard. Les enregistrements que la loi nous oblige à conserver (par exemple pour les achats) sont conservés pendant la durée légale requise. Les rapports d’erreur de l’application sont supprimés automatiquement au bout de 30 jours.",
              ],
            },
            {
              heading: "11. Vos droits",
              paragraphs: [
                "Vous avez le droit d’accéder à vos données, de les rectifier, de les exporter et de les supprimer, de vous opposer à leur traitement et d’en demander la limitation, ainsi que d’introduire une réclamation auprès d’une autorité de contrôle – en Slovénie, le Commissaire à l’information (Informacijski pooblaščenec). Dans l’application, vous pouvez exporter toutes les données de votre famille dans un fichier (Control → Account → Export my data – « Exporter mes données ») et supprimer le profil d’un enfant ou tout votre compte. Pour toute autre demande, écrivez à {privacyEmail}.",
              ],
            },
            {
              heading: "12. Sécurité",
              paragraphs: [
                "Les mots de passe et les codes sont stockés sous forme de hachage, les connexions sont chiffrées, les mises à jour en direct ne sont transmises qu’aux membres de votre famille et les médias générés par IA sont vérifiés avant d’apparaître sur l’écran d’un enfant.",
              ],
            },
            {
              heading: "13. Modifications",
              paragraphs: ["Nous vous informerons dans l’application des modifications importantes avant leur entrée en vigueur. La date indiquée en haut de la page correspond à la dernière version."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Les cookies nécessaires assurent le fonctionnement du site web et mémorisent votre choix de consentement. Les cookies analytiques (Google Analytics) ne sont déposés que si vous les autorisez dans le bandeau, et vous pouvez modifier votre choix à tout moment.",
            "Le tableau ci-dessous est généré automatiquement à partir de la dernière analyse de ce site web : il indique donc toujours les cookies que nous utilisons réellement.",
          ],
          settings: "Modifier les paramètres des cookies",
          fallback: "La liste des cookies se charge avec le bandeau de consentement. Si vous ne la voyez pas, autorisez les scripts sur cette page ou écrivez à {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Conditions d’utilisation",
      meta: {
        title: "Conditions d’utilisation – PetPrep",
        description:
          "Les conditions d’utilisation de l’application et du site web PetPrep : comptes et profils d’enfants, Challenge de 12 semaines et certificat, achats et remboursements, contenus générés par IA, mode adapté, usage loyal, suppression et droit applicable.",
      },
      eyebrow: "Mentions légales",
      title: "Conditions d’utilisation",
      lead: "Traduction – seule la version anglaise fait foi. Les règles d’utilisation de PetPrep, écrites pour être lues.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Le service",
              paragraphs: [
                "PetPrep est fourni par {company}, {address} ; {companyIds} – la même entreprise que le responsable du traitement désigné dans la politique de confidentialité. Les présentes conditions s’appliquent à l’application PetPrep et au site web petprep.si.",
                "PetPrep est une simulation de soins à un animal de compagnie. Elle aide les familles et les particuliers à savoir s’ils sont prêts à s’occuper d’un vrai animal – les enfants, ainsi que les adultes qui veulent vérifier si une race leur convient avant de l’acheter ou de l’adopter. C’est un outil éducatif, pas un conseil vétérinaire ni aucun autre conseil professionnel.",
              ],
            },
            {
              heading: "2. Comptes, profils et enfants",
              items: [
                "Les comptes sont créés par des adultes : parents, représentants légaux ou adultes qui utilisent PetPrep pour eux-mêmes. En vous inscrivant, vous acceptez les présentes conditions et la politique de confidentialité.",
                "Les soigneurs (enfants ou adultes) s’occupent de l’animal via un profil de soigneur créé par le titulaire du compte, qui peut aussi en créer un pour lui-même. Un profil ne nécessite qu’un surnom et, facultativement, une année de naissance – nous n’avons besoin de rien d’autre concernant un enfant : merci de ne saisir aucune autre information à son sujet dans l’application.",
                "Un enfant se connecte avec un code à 6 chiffres (PIN) que vous créez dans votre application. Le code a une courte durée de validité et ne fonctionne qu’une fois ; ne le donnez qu’à l’enfant auquel il est destiné.",
                "En tant que parent ou représentant légal, vous êtes responsable de l’utilisation de PetPrep par votre enfant : de savoir si elle lui convient, du temps qu’il y consacre et de sa sécurité pendant les promenades (par exemple dans la circulation). Vous pouvez arrêter le jeu pour n’importe quel animal à tout moment.",
                "Vous pouvez inviter un autre parent dans la famille avec un code d’invitation ; tous deux voient l’ensemble des données de la famille et tous deux peuvent arrêter le jeu.",
                "Fournissez des informations exactes et protégez votre mot de passe, vos codes et vos appareils.",
              ],
            },
            {
              heading: "3. Le Challenge de 12 semaines, le Care Score et le certificat",
              items: [
                "Le Challenge dure 12 semaines (84 jours de programme) et commence à l’achat ; chaque soigneur a sa propre date de fin. Le temps pendant lequel le jeu attend le paiement ne compte pas dans les 12 semaines.",
                "Le Care Score (0–100) indique la part des routines attendues (nourriture, eau, nettoyage, promenade, séance d’éducation) que le soigneur a effectuées lui-même ; chaque maladie de l’animal le fait baisser. Le temps pendant lequel le jeu est arrêté ou l’animal est chez le vétérinaire, ainsi que les heures calmes, ne comptent jamais contre le soigneur.",
                "Après 12 semaines, un score final est enregistré et ne change plus ; les soins prodigués après le Challenge ne l’affectent pas. Avec un score de 70 ou plus, vous pouvez créer un certificat de responsabilité (PDF) dans l’application ; en dessous de 70, vous recevez un bilan du Challenge.",
                "Si la nourriture, l’eau ou la propreté reste à 0 % pendant 24 heures, l’animal est « confié au refuge » (fin de partie). La partie avec cet animal se termine, il n’y a pas de certificat et vous recevez un bilan du Challenge.",
                "Le Care Score et le certificat montrent uniquement comment le soigneur s’est occupé d’un animal simulé dans l’application. Ils ne garantissent pas qu’un enfant, ou qui que ce soit, est prêt pour un vrai animal, ne constituent pas une évaluation professionnelle et ne remplacent ni votre propre jugement ni les conseils d’un vétérinaire, d’un éleveur ou d’un refuge. La décision concernant un vrai animal vous appartient toujours.",
                "Les règles du jeu (repas, promenades et soins selon la race et l’âge) sont simplifiées et fondées sur des sources publiques. Elles ne constituent pas un conseil vétérinaire ; pour la santé et les soins d’un vrai animal, adressez-vous à un vétérinaire.",
              ],
            },
            {
              heading: "4. Fonctionnalités gratuites et payantes, achats et remboursements",
              items: [
                "Le chien croisé et le chat domestique sont gratuits pour toujours et permettent d’essayer PetPrep ; il n’existe pas d’essai gratuit du Challenge. Un animal gratuit n’a ni programme de 12 semaines ni certificat, le parent voit l’historique des 7 derniers jours et l’animal dispose d’un ensemble de base d’images et de vidéos.",
                "Le PetPrep Challenge de 12 semaines avec une race payante est un achat unique (49,99 € en Slovénie ; la boutique affiche le prix de votre pays). Un achat correspond à un Challenge pour un animal ; chaque nouveau Challenge avec un nouvel animal est un nouvel achat. Les frères et sœurs qui s’occupent du même animal paient une seule fois.",
                "Un parent achète dans sa propre application via l’App Store ou Google Play ; il n’y a aucun achat dans l’application de l’enfant. La boutique traite le paiement selon ses propres conditions.",
                "Vous pouvez créer un animal de Challenge avant de l’acheter. Tant que le Challenge n’est pas payé, le jeu est en pause : l’animal attend en sécurité, ses besoins ne baissent pas et rien ne se dégrade. Une fois l’achat effectué, le jeu reprend là où il s’était arrêté.",
                "Les remboursements sont gérés par l’App Store et Google Play selon leurs propres règles ; adressez votre demande à la boutique où vous avez effectué l’achat. Si la boutique rembourse un achat avant la fin du Challenge, la partie avec cet animal est de nouveau mise en pause. Les images et vidéos créées après l’achat sont conservées.",
                "Après une fin de partie (refuge), un achat ne débloque pas l’animal ; un nouveau Challenge signifie un nouvel animal et un nouvel achat.",
                "Souhaits (objets pour l’animal, lorsqu’ils seront disponibles) : un enfant peut en demander, mais seul un parent peut les acheter, dans sa propre application. Un objet acheté appartient à l’animal pour lequel il a été acheté et est purement esthétique – il n’a aucun effet sur le jeu, le score ou le certificat. Après une fin de partie ou la suppression de l’animal, l’achat reste consommé et n’est pas remboursé. Si la boutique rembourse l’achat, l’objet (pour les friandises, les friandises non utilisées) est retiré.",
                "Si vous supprimez un animal, un enfant ou le compte alors qu’un Challenge acheté est encore en cours, l’achat reste consommé : il n’est pas transféré à un autre animal et la suppression ne vaut pas remboursement. L’application vous prévient d’abord et vous demande de confirmer.",
              ],
            },
            {
              heading: "5. Images et vidéos générées par IA",
              items: [
                "Les images et vidéos des animaux sont générées par intelligence artificielle (IA) uniquement à partir d’une description de l’animal (race, couleur, pelage, etc.), jamais à partir de données sur votre famille. Ce sont des illustrations d’un animal simulé, qui peuvent ne pas correspondre parfaitement à un animal réel ou à un standard de race.",
                "Lorsque nous les montrons publiquement, comme les portraits de races sur ce site web, elles sont signalées comme générées par IA.",
                "Une apparence n’est pas forcément unique : des animaux de la même race payante et de la même couleur peuvent partager les mêmes images et vidéos, et les animaux gratuits reçoivent l’une des apparences partagées de leur race. Un Challenge payant comprend un ensemble de vidéos plus large qu’un animal gratuit.",
                "Après la signature du contrat ou un achat, la préparation des images et des vidéos peut prendre quelques minutes ; pendant ce temps, l’application indique que l’animal se prépare et signale ce qui est encore en cours de préparation.",
                "Les informations sur les races présentées dans l’application et dans le registre des animaux de ce site web sont résumées à partir des sources publiques que nous citons et ne sont pas vérifiées par un vétérinaire.",
              ],
            },
            {
              heading: "6. Pas, données de santé et mode adapté",
              items: [
                "La promenade quotidienne compte les vrais pas du soigneur. Si vous l’autorisez, l’application les lit dans Apple Santé ou Health Connect, en lecture seule (elle n’y écrit jamais rien), ou à partir du capteur de mouvement du téléphone. Les données que nous traitons sont décrites dans la politique de confidentialité (section 3).",
                "Le mode adapté s’adresse aux enfants qui utilisent un fauteuil roulant : la promenade compte alors les poussées de fauteuil roulant au lieu des pas. Vous pouvez l’utiliser si la fonctionnalité est disponible dans votre version de l’application. Un parent l’active pour un enfant donné ; l’activer vaut consentement et le désactiver retire ce consentement (politique de confidentialité, section 4).",
                "En mode adapté, un parent peut saisir des minutes de promenade pour l’enfant, pour le jour même uniquement. Vous êtes responsable de ces saisies : n’enregistrez que des promenades qui ont réellement eu lieu, car elles comptent pour le Care Score et le certificat.",
                "PetPrep n’utilise pas la localisation et ne signale aucun danger pendant une promenade ; la sécurité des promenades relève de votre responsabilité.",
              ],
            },
            {
              heading: "7. Notifications",
              paragraphs: [
                "Si vous les autorisez sur l’appareil, l’application envoie des notifications push : des rappels au soigneur, des alertes aux parents quand la nourriture, l’eau ou la propreté d’un animal tombe à zéro, et des informations sur une maladie, une fin de partie et la fin du Challenge. Les notifications ne contiennent jamais le nom de l’enfant ni celui de l’animal et ne sont pas envoyées pendant les heures calmes. Vous pouvez retirer l’autorisation à tout moment dans les réglages de l’appareil ; sans notifications, un soigneur risque de manquer des routines, ce qui affecte le jeu et le score.",
              ],
            },
            {
              heading: "8. Usage loyal",
              items: [
                "N’essayez pas de tricher sur le nombre de pas ou de poussées, de saisir des promenades qui n’ont pas eu lieu, d’accéder aux données d’autres familles, de faire de l’ingénierie inverse ou de perturber le service.",
                "Ne donnez pas aux animaux de noms offensants ou inappropriés, et ne saisissez pas de données personnelles sur un enfant que l’application ne demande pas.",
                "Nous pouvons limiter ou suspendre les comptes qui enfreignent ces règles ou mettent des enfants en danger, et nous pouvons supprimer un nom d’animal inapproprié.",
              ],
            },
            {
              heading: "9. Propriété intellectuelle",
              paragraphs: [
                "PetPrep, son logo, son design, son logiciel et ses contenus appartiennent à {company}. Vous pouvez utiliser l’application, ainsi que les images, les vidéos et le certificat de votre animal, pour un usage personnel et non commercial au sein de votre famille – par exemple pour les partager avec vos proches.",
              ],
            },
            {
              heading: "10. Responsabilité",
              paragraphs: [
                "Nous nous efforçons de maintenir PetPrep disponible et exact, mais le service est fourni en l’état ; il dépend aussi de services de tiers (les boutiques d’applications, Apple Santé, Health Connect, les notifications push, le service d’IA) que nous ne contrôlons pas. Dans la mesure permise par la loi, nous ne sommes pas responsables des dommages indirects ni des décisions d’acheter ou d’adopter un vrai animal. Rien dans les présentes conditions ne limite les droits dont vous bénéficiez en tant que consommateur en vertu de dispositions légales impératives.",
              ],
            },
            {
              heading: "11. Suppression de votre compte et fin de l’utilisation",
              paragraphs: [
                "Vous pouvez supprimer le profil d’un enfant ou votre compte à tout moment dans l’application. La suppression est immédiate et définitive ; lorsque le dernier parent d’une famille supprime son compte, toute la famille est supprimée. Vous pouvez d’abord exporter vos données (Control → Account → Export my data – « Exporter mes données »). Ce qu’il advient des données est décrit dans la politique de confidentialité ; ce qu’il advient d’un achat est décrit à la section 4.",
              ],
            },
            {
              heading: "12. Modifications des présentes conditions",
              paragraphs: [
                "Nous mettons à jour ces conditions lorsque l’application ou la loi évolue. Nous vous informerons dans l’application des modifications importantes avant leur entrée en vigueur. La date indiquée en haut de la page correspond à la dernière version. Si vous n’acceptez pas une modification, vous pouvez supprimer votre compte à tout moment.",
              ],
            },
            {
              heading: "13. Droit applicable et litiges",
              paragraphs: [
                "Les présentes conditions sont régies par le droit de la République de Slovénie. Les consommateurs peuvent également se prévaloir des protections impératives du pays où ils résident et recourir à la plateforme européenne de règlement en ligne des litiges.",
              ],
            },
            {
              heading: "14. Contact",
              paragraphs: [
                "Questions sur les présentes conditions : {termsEmail}. Prestataire du service : {company}, {address} ; {companyIds}. Questions de confidentialité : {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Sécurité des enfants",
      meta: {
        title: "Sécurité des enfants – comment PetPrep protège les enfants",
        description:
          "Comment PetPrep protège les enfants : comptes créés par les parents, connexion par code sans e-mail, données minimales, ni publicité ni messagerie, aucun suivi de localisation, médias vérifiés.",
      },
      eyebrow: "Confiance",
      title: "Pensé pour les enfants dès la première ligne de code.",
      lead: "Traduction – seule la version anglaise fait foi. L’enfant est le principal utilisateur de PetPrep : la sécurité et la confidentialité sont donc des règles du produit, pas des réglages.",
      blocks: [
        {
          type: "cards",
          heading: "Nos standards",
          columns: 2,
          items: [
            { title: "Les parents créent chaque compte", text: "Les enfants ne peuvent pas s’inscrire seuls. Un parent ajoute l’enfant et génère un code de connexion à usage unique valable 15 minutes." },
            { title: "Ni e-mail ni mot de passe pour les enfants", text: "L’enfant se connecte avec le code du parent. Un code erroné, expiré ou déjà utilisé reçoit toujours la même réponse : personne ne peut ainsi deviner quels enfants existent." },
            { title: "Données minimales", text: "Un surnom et, facultativement, une année de naissance. Ni nom de famille, ni date de naissance, ni photo de l’enfant." },
            { title: "Ni publicité, ni messagerie, ni inconnus", text: "Il n’y a aucune publicité et aucun moyen de contacter d’autres utilisateurs." },
            { title: "Aucun suivi de localisation", text: "Les promenades comptent uniquement les pas – depuis Apple Santé ou Health Connect (avec votre autorisation, en lecture seule) ou depuis le capteur de mouvement du téléphone. Le GPS n’est pas utilisé." },
            { title: "Mises à jour en direct privées", text: "Les mises à jour en temps réel n’atteignent que les enfants qui s’occupent de cet animal et les parents de la même famille." },
            { title: "Médias vérifiés", text: "Seules les images et vidéos produites pour PetPrep et vérifiées par notre serveur sont affichées, depuis notre propre stockage dans l’UE." },
            { title: "Notifications sans nom", text: "Les notifications n’incluent jamais le nom de l’enfant ni celui de l’animal, car elles peuvent s’afficher sur l’écran verrouillé." },
          ],
        },
        {
          type: "list",
          heading: "Les parents gardent la main",
          items: [
            "Des heures calmes pour l’école et le sommeil, sans notifications.",
            "Un bouton pause qui verrouille l’écran de l’enfant en direct.",
            "Déconnexion d’un enfant de tous ses appareils en une seule fois.",
            "Export ou suppression instantanée de toutes les données depuis l’application.",
          ],
        },
        { type: "callout", title: "Signaler un problème", text: "Si quelque chose dans PetPrep vous inquiète, écrivez-nous : nous vous répondrons en priorité.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Accessibilité",
      meta: {
        title: "Accessibilité – PetPrep pour chaque enfant",
        description:
          "Comment PetPrep s’adapte aux enfants pour qui les balayages sont difficiles, qui utilisent VoiceOver ou TalkBack ou qui préfèrent moins d’animations – avec les mêmes règles et les mêmes points pour tous.",
      },
      eyebrow: "Confiance",
      title: "Chaque enfant peut s’occuper de son animal.",
      lead: "Certains enfants ont du mal avec les balayages, utilisent un lecteur d’écran ou préfèrent moins d’animations à l’écran. PetPrep s’adapte à eux – avec les mêmes règles, les mêmes points et le même certificat que pour tous les autres.",
      blocks: [
        {
          type: "cards",
          heading: "Dans l’application",
          columns: 3,
          items: [
            { title: "Gestes simplifiés", text: "Au lieu de balayer, l’enfant garde le doigt appuyé ou appuie sur un bouton – dans tous les jeux à balayage : le brossage, la canne à plumes, le changement de litière et le lancer de balle. Un parent l’active pour chaque enfant dans l’espace parent." },
            { title: "Lecteurs d’écran", text: "Quand VoiceOver ou TalkBack est activé, les jeux passent d’eux-mêmes à l’appui prolongé. L’en-tête de l’animal lit à voix haute tout ce qui le concerne, et chaque étape des jeux de soins est un bouton à part entière." },
            { title: "Moins d’animations", text: "Quand le téléphone est réglé pour réduire les animations, les boutons qui pulsent et Curio qui se balance restent immobiles." },
          ],
        },
        {
          type: "cards",
          heading: "Avec la prochaine mise à jour de l’application",
          items: [
            { title: "Promenades en fauteuil roulant", text: "En mode adapté, les poussées de fauteuil roulant comptent exactement comme des pas – une poussée vaut un pas. Un parent peut aussi saisir les minutes de promenade du jour, pour que l’enfant n’ait rien à faire de plus. Un parent l’active pour chaque enfant, et le désactiver retire la mention de l’historique." },
          ],
        },
        { type: "callout", title: "Le même Challenge pour tous", text: "Les adaptations changent la façon dont un enfant joue, jamais ce qui compte. Les scores, les horaires et le certificat de responsabilité fonctionnent exactement de la même manière. Nous ne demandons jamais pourquoi un enfant a besoin d’une adaptation.", tone: "mint" },
        { type: "callout", title: "Quelque chose ne fonctionne pas pour votre enfant ?", text: "Dites-nous ce qui l’a gêné et nous examinerons la question.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Supprimer le compte",
      meta: {
        title: "Supprimer votre compte PetPrep et vos données",
        description:
          "Comment supprimer votre compte PetPrep (Data Vallis) dans l’application ou par e-mail, quelles données sont supprimées, ce qui est conservé et pendant combien de temps.",
      },
      eyebrow: "Confiance",
      title: "Supprimer votre compte PetPrep",
      lead: "Traduction – seule la version anglaise fait foi. PetPrep est développé par Data Vallis. Vous pouvez supprimer votre compte et les données de votre famille à tout moment – instantanément dans l’application, ou par e-mail si vous n’avez plus l’application.",
      blocks: [
        {
          type: "steps",
          heading: "Supprimer votre compte dans l’application (instantané)",
          items: [
            { title: "Connectez-vous en tant que parent", text: "Ouvrez PetPrep, touchez « I’m a parent » (« Je suis un parent ») et connectez-vous." },
            { title: "Ouvrez votre compte", text: "Allez dans Controls → Account. Facultatif : touchez d’abord « Export my data » (« Exporter mes données ») pour en garder une copie." },
            { title: "Supprimez", text: "Touchez « Delete account » (« Supprimer le compte »), confirmez avec votre mot de passe (ou votre connexion Google / Apple) et saisissez DELETE, puis touchez « Delete for good » (« Supprimer définitivement »)." },
            { title: "C’est fait", text: "La suppression est immédiate et irréversible. Tous vos appareils et ceux de vos enfants sont déconnectés." },
          ],
        },
        {
          type: "prose",
          heading: "Vous n’avez plus l’application ? Demandez la suppression par e-mail",
          paragraphs: [
            "Écrivez à [privacy@petprep.si](mailto:privacy@petprep.si) depuis l’adresse e-mail de votre compte parent PetPrep, avec pour objet « Delete my account » (« Supprimer mon compte »). Nous vérifions que la demande provient bien du titulaire du compte, supprimons le compte dans un délai d’un mois au plus tard (généralement en quelques jours), puis vous le confirmons par e-mail.",
            "Pour supprimer uniquement le profil d’un enfant, connectez-vous en tant que parent et ouvrez l’enfant dans Controls → Children → Delete profile.",
          ],
        },
        {
          type: "table",
          heading: "Ce qui est supprimé et ce qui est conservé",
          head: ["Données", "Ce qui se passe"],
          rows: [
            ["Votre compte parent (nom, e-mail, mot de passe, lien de connexion Google / Apple)", "Supprimé immédiatement"],
            ["Si vous êtes le seul parent de la famille : profils des enfants (surnom, année de naissance), animaux, images et vidéos IA, contrats et signatures, journal des soins, Care Scores, certificats, nombres de pas, heures calmes, codes de connexion", "Supprimés immédiatement"],
            ["Si un autre parent reste dans la famille", "Seul votre compte est supprimé ; la famille reste avec l’autre parent"],
            ["Appareils et jetons de notification", "Déconnectés et supprimés immédiatement"],
            ["Enregistrements d’achat (produit, date, identifiant de transaction de la boutique, identifiant d’achat anonyme – ni nom ni e-mail)", "Conservés aussi longtemps que l’exige la législation comptable et fiscale, sans plus aucun lien avec votre famille"],
            ["Enregistrements des coûts d’IA", "Conservés à des fins comptables, sans aucun lien avec vous, vos enfants ou vos animaux"],
            ["Sauvegardes chiffrées", "Effacées automatiquement dans un délai de 35 jours"],
          ],
          note: "Les achats eux-mêmes sont gérés par l’App Store et Google Play ; leurs enregistrements sont conservés par Apple et Google selon leurs propres règles. Un Challenge acheté mais non terminé n’est pas remboursé lorsque vous supprimez le compte.",
        },
        { type: "callout", title: "Des questions ?", text: "Écrivez à privacy@petprep.si. Vous trouverez tous les détails dans notre politique de confidentialité.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Registre des animaux PetPrep – espèces et races, avec leurs sources",
        description:
          "Les chiens, les chats et leurs races : ce dont chacun a besoin, à qui il convient et comment PetPrep le simule. Recherchez et comparez les races ; chaque information renvoie à sa source.",
      },
      navLabel: "Animaux",
      eyebrow: "Registre des animaux",
      title: "Connaître l’animal avant qu’il n’arrive à la maison.",
      lead:
        "Ce dont chaque espèce et chaque race de PetPrep a vraiment besoin – d’après les clubs de race, les registres félins, les associations vétérinaires caritatives et les études, chaque source étant indiquée par un lien. Avec, en plus, les règles que PetPrep utilise pour le simuler.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "À propos de PetPrep – l’entreprise, le fondateur et l’origine de nos informations sur les animaux",
        description:
          "Qui fait PetPrep : Data Vallis David Tacer s.p., à Dravograd (Slovénie), son fondateur David Tacer, notre mission, et la façon dont le registre des animaux source et vérifie ses informations.",
      },
      navLabel: "À propos",
      eyebrow: "À propos",
      title: "Qui fait PetPrep.",
      lead: "PetPrep est conçu à Maribor, en Slovénie, par une petite entreprise de logiciels. Cette page explique qui nous sommes, pourquoi nous construisons PetPrep et comment nous décidons de ce que l’application et le registre des animaux disent des animaux.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "L’entreprise",
          paragraphs: [
            "PetPrep est un produit de Data Vallis David Tacer s.p., une entreprise de développement de logiciels (entreprise individuelle) dont le siège est à Dravograd, en Slovénie. Cette même entreprise exploite ce site web et l’application PetPrep, et elle est responsable du traitement des données personnelles (voir la [politique de confidentialité](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Le fondateur",
          paragraphs: [
            "PetPrep a été fondé par David Tacer, développeur de logiciels et entrepreneur originaire de Maribor, en Slovénie.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Notre mission",
          paragraphs: [
            "Toutes les familles ont déjà entendu « Promis, je m’en occuperai. » PetPrep transforme cette promesse en preuve : pendant 12 semaines, un enfant – ou un adulte qui rêve d’une race en particulier – s’occupe d’un animal IA plus vrai que nature, avec les besoins quotidiens d’un vrai animal, et le parent voit chaque jour si les soins tiennent la distance.",
            "Échouer dans la simulation est aussi un bon résultat : la famille le découvre avant qu’un vrai animal n’en souffre, et avant de s’engager pour des années de soins et de dépenses. Et quand un vrai animal arrive à la maison, nous voulons que PetPrep reste utile pendant toute sa vie.",
          ],
        },
        {
          type: "list",
          id: "methodologie",
          heading: "Comment le registre des animaux est construit",
          intro: "Le [registre des animaux](page:animals) et l’application utilisent les mêmes données. Ces règles déterminent ce qu’il peut affirmer :",
          items: [
            "Chaque information cite sa source et renvoie vers elle. Les sources sont classées selon le poids qu’elles méritent : A – standards de race, articles évalués par des pairs et recommandations d’associations vétérinaires ; B – pages de conseils d’hôpitaux vétérinaires, d’universités et d’associations nationales de protection animale ; C – synthèses secondaires (encyclopédies, articles de presse), utilisées uniquement en complément d’une source A ou B.",
            "Seules les informations sourcées sont présentées comme des faits. Une valeur qu’aucune source n’étaye n’est pas publiée. Lorsque les sources divergent, chacune est présentée avec sa propre valeur.",
            "Les règles du jeu ne sont pas des conseils vétérinaires. Lorsque le jeu a besoin d’un chiffre que les sources ne donnent pas précisément (par exemple un objectif de pas quotidien), PetPrep le fixe à partir des sources et ne l’affiche que sous « Comment PetPrep le simule », en le signalant comme règle du jeu.",
            "Les remarques sur la santé sont fournies à titre informatif uniquement. Elles résument ce que disent les sources sur une race et n’ont pas été relues par un vétérinaire. Pour un vrai animal, adressez-vous à un vétérinaire.",
            "Les standards de race sont résumés avec nos propres mots, jamais recopiés longuement, et aucune race n’est jamais qualifiée d’« hypoallergénique ».",
            "Le registre est généré à partir des données de recherche de PetPrep, les mêmes que celles de l’application. Lorsqu’une source ou une valeur change, le registre est de nouveau exporté et chaque page de race indique la date de sa dernière mise à jour. Si vous repérez une erreur, écrivez à hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Des questions sur PetPrep ?", text: "Écrivez à la bonne adresse depuis la page de contact – familles, confidentialité, partenaires ou investisseurs.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Découvrez Curio – la mascotte de PetPrep",
        description:
          "Curio est la mascotte de PetPrep : le petit cube curieux de notre logo et la vedette de nos courtes vidéos. Qui il est, en quoi il diffère de l’animal plus vrai que nature de l’application, des images et un kit média.",
      },
      navLabel: "Découvrir Curio",
      eyebrow: "Notre mascotte",
      title: "Voici Curio.",
      lead: "Curio, c’est le petit cube curieux du logo PetPrep, qui a pris vie. Dans nos courtes vidéos, il joue l’animal qui attend près de la porte que quelqu’un tienne sa promesse. C’est notre mascotte – pas l’animal dont vous vous occupez dans l’application.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascotte de PetPrep : un cube graphite tout doux, avec de grands yeux blancs, un petit nez framboise et un collier menthe, qui fait coucou de la main.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Qui est Curio ?",
          paragraphs: [
            "Au départ, Curio était le symbole de notre logo : un carré graphite aux coins arrondis, avec deux grands yeux qui regardent en haut à droite et un petit nez framboise. En slovène, nous l’appelons Radovednež – « le curieux ». En octobre 2026, il a reçu de petits bras, de courtes pattes et un collier menthe avec une médaille ronde, et il est devenu un personnage.",
            "Curio n’a pas de bouche. Tout ce qu’il ressent se lit dans ses yeux : grands ouverts quand quelqu’un chuchote « promenade ? », deux traits ensommeillés quand personne n’est encore rentré, des arcs joyeux quand la gamelle est pleine.",
            "Curio n’est ni un garçon ni une fille, ni un chien ni un chat. Il représente chaque animal qui attend, jour après jour, que quelqu’un tienne sa promesse.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio en bref",
          columns: 3,
          items: [
            { title: "Nom", text: "Curio en anglais, Radovednež en slovène." },
            { title: "Fait de", text: "Graphite tout doux, un collier menthe et une médaille framboise – les couleurs de PetPrep." },
            { title: "Parle", text: "Jamais. Seulement avec ses yeux." },
            { title: "Adore", text: "Les promenades, une gamelle pleine et les enfants qui reviennent le 15e jour." },
            { title: "Habite", text: "Dans nos courtes vidéos sur [TikTok](https://www.tiktok.com/@petprep.si) et [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Mission", text: "Rappeler aux familles, avec un clin d’œil, qu’un animal a besoin de soins chaque jour, sans exception." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio n’est pas l’animal de l’application",
          intro: "Dans nos vidéos, Curio joue un animal qui a besoin de soins, car c’est le cas de tous les animaux. Dans PetPrep, les enfants – et les adultes qui testent une race – s’occupent de quelque chose de bien plus proche de la réalité.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, la mascotte dessinée, fait coucou sur un fond clair.",
              label: "Mascotte",
              title: "Curio – notre mascotte",
              text: "Un personnage de dessin animé pour nos vidéos, nos autocollants et cette page. Il incarne l’esprit de PetPrep. On ne peut pas l’adopter.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Portrait réaliste d’un Labrador Retriever, généré par IA, tel que les animaux apparaissent dans l’application PetPrep.",
              label: "Dans l’application · image IA",
              tone: "mint",
              title: "Votre animal dans PetPrep",
              text: "Une simulation IA plus vraie que nature d’une vraie race – comme ce [Labrador Retriever](+breed:labrador_retriever) – avec les besoins quotidiens d’un vrai animal : repas, eau, promenades comptées en vrais pas, nettoyage et éducation. Découvrez [comment ça marche](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio en images",
          intro: "Curio est un personnage 3D stylisé, créé avec des outils d’IA à partir de notre propre design. Les nouvelles scènes apparaissent d’abord dans nos vidéos.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio fait coucou sur un fond menthe.", caption: "Coucou ! Le salut classique.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio debout sur une étagère blanche, qui fait coucou.", caption: "Sur l’étagère, à attendre quelqu’un." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio de face, de profil et de dos, avec quatre expressions des yeux.", caption: "Sous tous les angles, et comment ses yeux expriment ses émotions." },
            { src: "/curio/curio-waving.webp", alt: "Curio sur fond transparent.", caption: "Détouré – prêt pour votre publication (voir le kit média).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Kit média",
          intro: "Pour les créateurs, les journalistes et les partenaires qui parlent de PetPrep. Questions ou idées de collaboration : hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Tout télécharger", meta: "ZIP, 1,1 Mo" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, fond transparent", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, carré, clair", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, carré, menthe", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Fiche personnage", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Symbole PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Utiliser Curio",
          rules: [
            "Utilisez Curio dans des publications, articles et vidéos consacrés à PetPrep. Pour des publicités, des produits ou du merchandising, demandez-nous d’abord.",
            "Montrez Curio tel qu’il est : cube graphite, yeux blancs, nez framboise, collier menthe. N’ajoutez ni bouche, ni oreilles, ni poils, ni sourcils ; ne modifiez pas ses couleurs et ne le déformez pas.",
            "Curio est la mascotte de PetPrep. Ne le présentez pas comme l’animal de l’application ni comme un vrai chien ou un vrai chat.",
            "N’utilisez pas Curio d’une manière qui laisserait entendre que PetPrep soutient un autre produit, une autre cause ou une autre personne.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Questions sur Curio",
          items: [
            { q: "Curio est-il un chien ou un chat ?", a: "Ni l’un ni l’autre. Curio est un petit cube issu de notre logo. Il joue un animal dans nos vidéos, mais il n’appartient à aucune espèce." },
            { q: "Mon enfant peut-il s’occuper de Curio dans l’application ?", a: "Non. Dans l’application, votre famille s’occupe d’un animal plus vrai que nature d’une vraie race, avec les mêmes besoins quotidiens que l’animal réel. Curio n’apparaît que dans nos vidéos et sur le site web." },
            { q: "Pourquoi Curio n’a-t-il pas de bouche ?", a: "Parce que notre logo n’en a pas. Curio dit tout avec ses yeux – et il ne réclame jamais de friandises à voix haute." },
            { q: "Où voir les nouvelles vidéos de Curio ?", a: "Sur TikTok et Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Conseils de soins – ce que les chiens et les chats peuvent manger, avec les sources | PetPrep",
        description:
          "Quels aliments sont toxiques, risqués ou sans danger pour les chiens et les chats – pourquoi, les signes à surveiller et que faire, chaque source étant indiquée par un lien. Par PetPrep, pour les familles qui se préparent à accueillir un animal.",
      },
      navLabel: "Conseils",
      eyebrow: "Conseils de soins",
      title: "Qu’est-ce qui est sans danger pour votre animal ?",
      lead:
        "Des réponses claires et sourcées pour les familles : quels aliments sont toxiques, lesquels sont risqués et lesquels conviennent en friandise – pour les chiens et les chats, et bientôt d’autres espèces. Chaque réponse indique ses sources.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Coloriages gratuits de chiens et de chats à imprimer pour les enfants | PetPrep",
        description:
          "Des coloriages gratuits à imprimer : Golden Retriever, Labrador, Border Collie, chiot croisé, chaton et Curio. PDF en A4 et en format US Letter, chacun avec une vraie information sur les soins aux animaux et sa source.",
      },
      navLabel: "Coloriages",
      eyebrow: "Coloriages",
      title: "Des coloriages gratuits à imprimer.",
      lead:
        "Des chiens, des chats et Curio à colorier ou à recopier – imprimez une seule page ou le cahier entier. Chaque page comporte une vraie information sur les soins aux animaux, tirée d’une source vétérinaire ou d’un club de race, à lire ensemble.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Pour les enfants qui rêvent d’un animal – coloriages, Curio et #walkyourpet | PetPrep",
        description:
          "Tout ce que PetPrep propose aux enfants : des coloriages gratuits à imprimer avec de vraies informations sur les soins aux animaux, Curio, la mascotte de PetPrep, et #walkyourpet – pour les enfants et les parents qui se préparent ensemble à accueillir un animal.",
      },
      navLabel: "Pour les enfants",
      eyebrow: "Pour les enfants",
      title: "Pour les enfants qui rêvent d’un animal.",
      lead: "Des coloriages à imprimer, Curio et #walkyourpet – pour les enfants et les parents qui se préparent ensemble à accueillir un animal.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascotte de PetPrep : un cube graphite tout doux, avec de grands yeux blancs, un petit nez framboise et un collier menthe, qui fait coucou de la main.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – le mouvement né d’une phrase d’enfant",
        description:
          "« We could go walk your pet. » Une enfant l’a dit, et c’est devenu un mouvement : des familles qui sortent parce qu’un animal a besoin de sa promenade. Comment tout a commencé, ce que cela signifie dans PetPrep et comment participer.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Ce n’est pas nous qui avons inventé cette phrase, c’est une enfant. Aujourd’hui, c’est une invitation pour toutes les familles : sortez, parce qu’un animal a besoin de sa promenade – un vrai, ou celui avec lequel vous vous entraînez dans PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Carte story : « Overheard at the founder’s house. » (« Entendu chez le fondateur. ») Une enfant dit « Lahko bi šli walk your pet » – « On pourrait aller walk your pet » – et le titre annonce « #walkyourpet is a thing now. » (« #walkyourpet, c’est devenu un truc. »)", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Comment tout a commencé",
          paragraphs: [
            "En octobre 2026, les enfants de notre fondateur recevaient une amie. Ils se demandaient s’ils allaient sortir, et elle a dit, moitié en slovène, moitié en anglais : « Lahko bi šli walk your pet » – « On pourrait aller walk your pet. »",
            "Personne ne le lui avait demandé. Elle connaissait PetPrep, où la promenade d’un chien ne compte que si l’on sort vraiment, et « walk your pet » était tout simplement devenu une raison de sortir. Nous avons tellement aimé l’expression que nous l’avons gardée – en anglais, pour toutes les langues.",
            "Une vraie conversation. De vrais enfants.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Ce que cela signifie dans PetPrep",
          intro: "Dans PetPrep, la promenade quotidienne du chien, ce sont les vrais pas de votre enfant, lus dans Apple Santé ou Health Connect si vous l’autorisez. Rester sur le canapé ne compte pas : « walk your pet » veut donc toujours dire sortir. Ni GPS ni localisation – seulement des pas.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Rejoignez le mouvement",
          intro: "Pas besoin de l’application pour cela. Toute famille qui sort pour un animal – un vrai ou un animal d’entraînement – en fait partie.",
          items: [
            { title: "Sortez", text: "Emmenez le chien en promenade. Ou, si vous hésitez encore à accueillir un animal, faites la promenade que vous feriez avec lui." },
            { title: "Immortalisez le moment", text: "Les chaussures près de la porte, une laisse, le chemin, des pattes dans l’herbe. Pas de visages, pas de noms." },
            { title: "Partagez-le", text: "Publiez-le avec #walkyourpet et identifiez @petprep.si sur Instagram ou TikTok. Avec votre autorisation, nous pourrons partager les plus beaux moments ici et sur nos profils." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Partager en toute sécurité",
          intro: "#walkyourpet concerne des enfants ; ces règles s’appliquent donc à tout ce que nous partageons :",
          items: [
            "Ce sont les parents qui publient, pas les enfants. Seul un parent décide de ce qui est mis en ligne.",
            "Pas de visages, de noms, d’écoles ni d’adresses d’enfants – et jamais l’enfant d’une autre famille.",
            "Nous ne republions qu’avec l’autorisation d’un parent, et nous retirons une publication dès que vous le demandez.",
            "Les paroles d’enfants sont toujours authentiques. Nous n’inventons ni n’« améliorons » jamais ce qu’un enfant a dit.",
            "C’est une invitation, pas une obligation. Pas de série à maintenir, pas de pression – juste une bonne raison de sortir.",
          ],
        },
        {
          type: "callout",
          title: "Le premier moment est le nôtre. Le prochain pourrait être le vôtre.",
          text: "Partagez la promenade de votre famille avec #walkyourpet et identifiez @petprep.si. Des questions, ou une histoire à raconter : hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Questions",
          items: [
            { q: "Faut-il PetPrep pour participer ?", a: "Non. Toute personne qui sort pour un animal peut utiliser #walkyourpet. PetPrep est l’endroit où la phrase est née, et où la promenade d’un chien d’entraînement ne compte qu’en vrais pas." },
            { q: "Est-ce que ça marche aussi pour les chats dans PetPrep ?", a: "Pas sous forme de promenade. Les chats ne se promènent pas : dans PetPrep, on répond aux besoins d’un chat par le jeu, pas par les pas. La promenade, c’est pour les chiens." },
            { q: "Pourquoi la phrase est-elle en anglais ?", a: "Parce que c’est ainsi que l’enfant l’a dite – en anglais, au milieu d’une phrase en slovène. Partout, les enfants glissent de l’anglais dans leurs phrases : elle reste donc la même dans toutes les langues." },
            { q: "Allez-vous publier des images de mon enfant ?", a: "Seulement ce que vous partagez vous-même et nous autorisez à republier, et jamais le visage ni le nom d’un enfant. Écrivez-nous à hello@petprep.si et nous le retirerons." },
          ],
        },
      ],
    },
  },
};

export default fr;
