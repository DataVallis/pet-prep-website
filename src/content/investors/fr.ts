import type { InvestorsCopy } from "./types";

const fr: InvestorsCopy = {
  meta: {
    title: "PetPrep pour les investisseurs : un fondateur et un moteur de contenu pour un produit sur 15 ans",
    description:
      "Avec PetPrep, un enfant prouve en 12 semaines de simulation réaliste qu’il est prêt pour un animal de compagnie, et l’application accompagne la famille toute la vie de l’animal. Chiffres en direct, carte des revenus et comment demander le dossier investisseurs.",
  },
  eyebrow: "Pour les investisseurs",
  title: "Un fondateur et un moteur de contenu pour un produit que les familles gardent 15 ans.",
  seriesTitle: "« 12 Weeks »",
  lead: "Avec PetPrep, un enfant prouve en 12 semaines de simulation réaliste qu’il est prêt pour un animal de compagnie, et l’application accompagne la famille toute la vie de l’animal. Tout ce qui l’entoure, de notre série à la bibliothèque de conseils où chaque fait a sa source, sert à attirer les familles pour un coût quasi nul.",
  watch: "Voir « 12 Weeks » sur YouTube",
  brief: "Demander le dossier investisseurs",
  heroStats: {
    breeds: "races de chiens et de chats avec des règles de soins sourcées",
    sources: "sources vétérinaires et de clubs canins et félins",
    episodes: "épisodes de notre comédie familiale « 12 Weeks »",
  },
  opportunity: {
    eyebrow: "L’opportunité",
    title: "D’un Challenge de 12 semaines à une relation de 10 à 15 ans.",
    items: [
      { tag: "Problème", text: "Les enfants promettent de s’occuper d’un animal ; les parents n’ont aucun moyen neutre de le vérifier avant de s’engager sur des dépenses et des années de soins." },
      { tag: "Solution", text: "Une simulation réaliste de 12 semaines, avec un tableau de bord parent en direct et un Care Score objectif, qui s’achève par un certificat de responsabilité." },
      { tag: "Extension", text: "Une fois l’animal à la maison, PetPrep devient son assistant IA : données du collier, premier contact avec le vétérinaire via l’IA, croissance et alimentation, tests ADN, services partenaires." },
    ],
  },
  flywheel: {
    eyebrow: "Le cercle vertueux",
    title: "Le contenu amène les familles. Un vrai animal les garde pendant des années.",
    lead: "Chaque contenu est une étape de la même boucle, pas un projet annexe.",
    steps: [
      { title: "Moteur de contenu", text: "Série, Curio, coloriages et bibliothèque de conseils, réalisés par un seul fondateur avec des agents IA." },
      { title: "Les familles découvrent PetPrep", text: "Par la recherche, les réseaux sociaux et #walkyourpet, plutôt que par la publicité payante." },
      { title: "Challenge de 12 semaines", text: "Premier revenu : 49,99 € par animal, en paiement unique.", highlight: true },
      { title: "Un vrai animal arrive à la maison", text: "PetPrep devient l’assistant IA de la famille pour les soins de l’animal pendant 10 à 15 ans." },
      { title: "Des partenaires pour la vie", text: "Assurance, vétérinaires, alimentation et tests ADN : des offres adaptées à l’animal de la famille, que les parents choisissent de consulter." },
      { title: "Les revenus financent plus de contenu", text: "Les sponsors et les revenus de la phase 2 paient la saison suivante, et la boucle repart." },
    ],
  },
  engine: {
    eyebrow: "Moteur de contenu · chiffres en direct",
    title: "Ce que nous avons déjà réalisé",
    lead: "Chaque chiffre ci-dessous se met à jour tout seul à partir de notre registre, de notre base de connaissances et de nos chaînes.",
    updated: "Mis à jour automatiquement à partir de notre registre, de notre base de connaissances et de nos chaînes.",
    cards: {
      breeds: { label: "Races dans le registre", note: (dogs, cats) => `${dogs} races de chiens et ${cats} de chats, de nouvelles s’ajoutent chaque nuit` },
      sources: { label: "Sources", note: "Vétérinaires, clubs de race et études, citations à l’appui" },
      episodes: { label: "Épisodes de « 12 Weeks »", note: (views) => (views ? `${views} vues sur YouTube` : "Sur YouTube") },
      coloring: { label: "Coloriages gratuits", note: "À imprimer, A4 et US Letter" },
      curio: { value: "Pilote", label: "Série animée Curio", note: "Épisode pilote disponible sur YouTube et TikTok" },
      foods: { label: "Aliments expliqués", note: "Bibliothèque de conseils, de nouveaux aliments chaque nuit" },
      languages: { label: "Langues", note: "Site et bibliothèque de conseils" },
      vets: { label: "Pays avec annuaire de vétérinaires", note: "Vétérinaires d’urgence par pays" },
    },
    status: { live: "En ligne", building: "En construction", planned: "Prévu" },
    media: {
      playlist: "« 12 Weeks » : la série",
      channel: "Chaîne YouTube @petprep-si →",
      play: "Lire",
      all: "Tous les épisodes (playlist)",
      episode: (n) => `Épisode ${n}`,
      consent: "Lecture depuis YouTube (youtube-nocookie.com) : rien ne se charge avant votre clic.",
      more: "À voir aussi",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Pilote de notre comédie familiale muette" },
      curioAll: "Curio – tous les épisodes",
      promo: { title: "PetPrep en 60 secondes", text: "Votre enfant est-il prêt pour un vrai animal ?" },
      curio: { title: "Découvrir Curio", text: "Notre mascotte et ses courtes vidéos" },
      coloring: { title: "Coloriages", text: "À imprimer gratuitement, chacun avec un fait sourcé sur les soins aux animaux" },
      walkthrough: { title: "Comment fonctionne l’application", text: "Le Challenge de 12 semaines, étape par étape" },
    },
    closing: "Tout cela est produit par un seul fondateur avec des agents IA, sans équipe de production ni agence. Chaque contenu ramène vers l’application.",
  },
  built: {
    eyebrow: "Déjà réalisé",
    title: "Un vrai produit, pas un prototype",
    items: [
      "Moteur de jeu côté serveur avec synchronisation en temps réel, testé sur des simulations de journées entières, sur les jours de changement d’heure et sur des cas limites de familles.",
      "Des familles avec plusieurs parents, plusieurs enfants et des animaux partagés, avec une notation équitable pour chaque enfant.",
      "Des animaux IA photoréalistes aux coûts d’IA mesurés et plafonnés, avec des médias hébergés sur des serveurs loués en Allemagne (Hetzner, UE).",
      "Des besoins des animaux fondés sur des sources vétérinaires et de clubs canins et félins citées, chaque chiffre pouvant être retracé jusqu’à sa source.",
      "La sécurité des enfants dès la conception : connexion par code PIN sans e-mail, données minimales, aucune publicité, uniquement des médias vérifiés.",
      "Un jeu accessible : gestes simplifiés, lecteurs d’écran, poussées de fauteuil roulant comptées comme des promenades.",
    ],
  },
  revenue: {
    eyebrow: "Carte des revenus",
    title: "La phase 1 finance l’acquisition. La phase 2 est le cœur de l’activité.",
    phases: [
      {
        tag: "Phase 1 · Avant l’animal",
        name: "Finance l’acquisition",
        items: [
          { name: "Challenge de 12 semaines", price: "49,99 € par animal, paiement unique", status: "live", label: "Réalisé" },
          { name: "Souhaits (objets pour l’animal)", price: "2,99 à 15,99 €, esthétique uniquement", status: "live", label: "Réalisé" },
          { name: "Sponsoring de la série", price: "Forfaits par saison", status: "building", label: "En cours" },
          { name: "Boutique : cahiers de coloriage, peluche Curio, puzzles", price: "Produits physiques et numériques", status: "planned", label: "Prévu" },
        ],
      },
      {
        tag: "Phase 2 · Avec un vrai animal",
        name: "Le cœur de l’activité",
        items: [
          { name: "Assistant IA pour les soins de l’animal", price: "Abonnement dès 3,99 € par mois + recharges", status: "planned", label: "Prévu" },
          { name: "Partenaires d’assurance animale", price: "Offres que les parents choisissent de consulter, rémunération par mise en relation", status: "planned", label: "Prévu" },
          { name: "Réseau de vétérinaires partenaires", price: "Réservations et téléconsultations", status: "planned", label: "Prévu" },
          { name: "Tests ADN et animaleries partenaires", price: "Affiliation, puis kit maison", status: "planned", label: "Prévu" },
        ],
      },
      {
        tag: "Marque",
        name: "Curio et la série",
        items: [
          { name: "Série animée Curio", price: "Sponsors de saison", status: "live", label: "Pilote sorti" },
          { name: "#walkyourpet", price: "Un mouvement qui alimente tous les canaux", status: "live", label: "En ligne" },
        ],
      },
    ],
    retention: "Une famille qui adopte après le Challenge reste avec PetPrep pendant les 10 à 15 ans de vie de l’animal, pas seulement 12 semaines.",
    stageTag: "Stade",
    stage: "Avant le lancement, en bêta fermée sur iOS et Android. Le lancement sur l’App Store et Google Play suivra.",
  },
  team: {
    eyebrow: "Équipe",
    title: "La production d’un studio. Le coût d’une seule personne.",
    founderName: "David Tacer, fondateur et PDG.",
    founder: "Dirige depuis 12 ans sa propre entreprise de logiciels (plus de 400 projets), fondateur de CHERR.IO (lauréat du FutureHack, Davos 2018). Il développe PetPrep à plein temps, avec une équipe d’agents IA pour le code et le contenu.",
    points: [
      "Chaque fait a une source et une citation, vérifiées par un relecteur indépendant.",
      "Les données des familles restent dans l’UE, les enfants se connectent sans e-mail, l’application ne contient aucune publicité.",
      "Des traitements nocturnes recherchent, vérifient et publient de nouvelles races et de nouvelles pages de conseils.",
    ],
  },
  webSummit: {
    title: "Rencontrons-nous au Web Summit, à Lisbonne",
    text: "Du 9 au 12 novembre 2026. Dossier, présentation, data room et accès à la bêta sur demande.",
    watch: "Voir la série",
  },
  contactTitle: "Nous contacter",
};

export default fr;
