import type { RegistryCopy } from "./types";

/** French plural: 0, 1 and 1,5 take the singular (« 1,5 an »), plural from 2 (« 2 races »). */
const s = (n: number, one: string, many: string) => (Math.abs(n) < 2 ? one : many);
/** First letter lower case for values that continue a phrase (« Chiens » → « des chiens »). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("fr") + t.slice(1);
/** « de » with elision before a vowel: « de chiens », « d’animaux » (no elision before h: « de hamsters »). */
const de = (t: string) => (/^[aeiouàâäéèêëîïôöùûüœæ]/i.test(t) ? `d’${t}` : `de ${t}`);
/** French ordinal for months: 1er, 2e, 3e … */
const ord = (n: number) => (n === 1 ? "1er" : `${n}e`);
/** French clock time: "11:00" → « 11 h », "16:30" → « 16 h 30 ». */
const hhmm = (t: unknown) => {
  const [h, m = "00"] = String(t).split(":");
  return `${Number(h)}\u00a0h${m === "00" ? "" : `\u00a0${m}`}`;
};
type Fci = { number: number; group: number; origin: string };
/** Official French FCI group names. */
const fciGroups: Record<number, string> = { 1: "Chiens de berger et de bouvier (sauf chiens de bouvier suisses)", 2: "Chiens de type pinscher et schnauzer – molossoïdes – chiens de montagne et de bouvier suisses", 3: "Terriers", 4: "Teckels", 5: "Chiens de type spitz et de type primitif", 6: "Chiens courants, chiens de recherche au sang et races apparentées", 7: "Chiens d’arrêt", 8: "Chiens rapporteurs de gibier – chiens leveurs de gibier – chiens d’eau", 9: "Chiens d’agrément et de compagnie", 10: "Lévriers" };
const origins: Record<string, string> = { GB: "Grande-Bretagne", FR: "France", DE: "Allemagne", US: "États-Unis", CU: "Cuba", CH: "Suisse", IT: "Italie", "CN-XZ": "Tibet (Chine)", CN: "Chine", MX: "Mexique", BE: "Belgique", HU: "Hongrie", JP: "Japon", ZA: "Afrique du Sud", "BE-FR": "Belgique / France", PT: "Portugal", CA: "Canada", HR: "Croatie", AU: "Australie", RU: "Russie", IE: "Irlande", "AF-C": "Afrique centrale" };

const fr: RegistryCopy = {
  mistakes: {
    title: (breed) => `Erreurs fréquentes des propriétaires : ${breed}`,
    intro: "De petites habitudes qui causent de plus gros problèmes – chaque point provient des sources consacrées à cette race.",
    exercise: "Trop peu d’exercice au quotidien",
    exerciseText: (amount) => `Besoin d’exercice : ${amount}. Prévoyez-le chaque jour, pas seulement le week-end.`,
    coat: "Négliger l’entretien du pelage",
    coatText: (brushing, shedding) => `Brossage : ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Trop de friandises et des repas trop copieux",
    heat: "Des promenades par forte chaleur",
    growth: "Oublier que le chiot grandit encore",
    growthText: (growthEnd) => `Taille adulte atteinte : ${growthEnd}. D’ici là, adaptez l’exercice et l’alimentation à un jeune animal encore en croissance, et demandez à votre vétérinaire ce qui convient au vôtre.`,
    mind: "Trop peu d’occupation pour l’esprit",
    health: "Ignorer les problèmes de santé connus de la race",
    practise: "Dans PetPrep, un enfant s’exerce précisément à ces habitudes – pas, repas, soins – avant l’arrivée du vrai animal.",
  },
  hub: {
    title: "Connaître l’animal avant qu’il n’arrive.",
    intro:
      "Ce dont chaque espèce et chaque race de PetPrep a réellement besoin – d’après les sociétés canines, les registres félins, les associations vétérinaires et les études scientifiques, avec un lien vers chaque source. Et les règles qu’utilise PetPrep pour les simuler.",
    breedCount: (n) => `${n} ${s(n, "race", "races")} dans le registre`,
    open: "Voir les races",
    openA11y: (many) => `Voir les races : ${lc(many)}`,
    freePlan: (name, activity) => `Formule gratuite : ${lc(name)} (${activity} à l’âge adulte). Il n’a pas de page de race.`,
    otherSpecies: "D’autres animaux sont prévus.",
    methodTitle: "Comment nous construisons ce registre",
    method: [
      "Chaque information provient d’une source nommée – sociétés canines, registres félins, associations et organisations vétérinaires, études évaluées par des pairs – et renvoie vers elle. Nous résumons les standards de race avec nos propres mots.",
      "Une valeur qu’aucune source n’étaye n’est jamais présentée comme un fait. Lorsque PetPrep doit choisir un chiffre pour le jeu, il apparaît uniquement sous « Comment PetPrep simule la race », signalé comme règle du jeu.",
      "Les mêmes données alimentent l’application : les étiquettes, le nombre de repas, les objectifs de pas et les séances de jeu affichés sur ces pages sont ceux qu’utilise l’animal dans l’application.",
      "Ce registre ne remplace pas l’avis d’un vétérinaire. Les informations de santé sont données à titre indicatif et n’ont pas été vérifiées par un vétérinaire.",
    ],
  },
  speciesStatus: { available: "Dans l’application", coming_soon: "Bientôt dans l’application", info_only: "À titre d’information" },
  availability: {
    in_app: { label: "Dans l’application", text: "Disponible dans le PetPrep Challenge de 12 semaines (race payante)." },
    coming_soon: { label: "Bientôt dans l’application", text: "Prête et testée ; elle arrivera avec une prochaine version de l’application." },
    info_only: { label: "À titre d’information", text: "Présente dans le registre à titre d’information ; vous ne pouvez pas encore l’adopter dans l’application." },
  },
  catalogue: {
    eyebrow: "Registre des animaux",
    title: (many) => `${many} : les races du registre`,
    lead: (many, count) =>
      `${count} ${s(count, "race", "races")} ${de(lc(many))} avec des besoins sourcés, le profil des foyers qui leur conviennent et la façon dont PetPrep les simule. Recherchez, filtrez et comparez-en jusqu’à trois.`,
    metaTitle: (many) => `${many} – registre des races avec sources | PetPrep`,
    metaDescription: (many) =>
      `Recherchez et comparez les races ${de(lc(many))} selon leurs besoins, leur taille et les foyers qui leur conviennent. Chaque information renvoie à sa source, avec en prime les règles qu’utilise PetPrep pour simuler chaque race.`,
    searchLabel: "Rechercher une race",
    searchPlaceholder: "Nom, par ex. Labrador",
    filtersTitle: "Filtres",
    any: "Toutes",
    availabilityLabel: "Dans PetPrep",
    sortLabel: "Trier",
    sort: { recommended: "D’abord celles de l’application", az: "A–Z", size: "Taille (de la plus petite à la plus grande)" },
    clear: "Tout effacer",
    results: (total) => `{n} sur ${total} ${s(total, "race", "races")}`,
    none: "Aucune race ne correspond. Essayez avec moins de filtres.",
    loading: "Chargement de la recherche…",
    page: "Page {n} sur {total}",
    prev: "Précédente",
    next: "Suivante",
    compareAdd: "Comparer : {name}",
    compareBar: "{n} sur {max} sélectionnées pour la comparaison",
    compareGo: "Comparer",
    compareMax: "Vous pouvez comparer jusqu’à {max} races.",
    azTitle: "Toutes les races de A à Z",
    azIntro: "Toutes les races du registre, par ordre alphabétique.",
    freePlanTitle: "Formule gratuite",
    guideTitle: "Comment choisir une race",
    guide: () => [
      "Partez de ce que votre foyer peut offrir chaque jour : du temps pour l’exercice et le toilettage, et de l’espace. Chaque page de race présente ces besoins en un coup d’œil, avec la source nommée de chaque valeur ; lorsque les sources divergent, toutes les valeurs sont indiquées.",
      "Lorsqu’une race a une catégorie de taille (pour les chiens : très petite, petite, moyenne, moyenne à grande, grande ou géante), c’est celle qu’indique la source nommée – généralement une société canine –, et les poids sont les fourchettes données par les sources, pas nos estimations.",
      "Les étiquettes comme « Convient bien à : une famille active » sont les mêmes que dans l’application, et chacune s’appuie sur des sources. Les chiffres sous « Comment PetPrep simule la race » sont des règles du jeu de PetPrep, pas des consignes de soins. [Comment nous construisons le registre](page:about#methodologie)",
    ],
  },
  compare: {
    title: (many) => `Comparer les races ${de(lc(many))}`,
    metaTitle: (many) => `Comparer les races ${de(lc(many))} | Registre PetPrep`,
    intro: "Les principaux besoins côte à côte, issus des mêmes sources que les pages de race.",
    pick: "Choisissez deux ou trois races dans le catalogue pour les comparer.",
    back: "Retour au catalogue",
    remove: "Retirer : {name}",
    note: "Les valeurs sont données telles que la source nommée les indique. Lorsque les sources divergent, la page de la race les présente toutes.",
    availabilityRow: "Dans PetPrep",
    activityRow: "Objectif quotidien d’un adulte dans PetPrep (règle du jeu)",
  },
  facets: {
    size: { label: "Taille", values: { toy: "Très petite", small: "Petite", small_medium: "Petite à moyenne", medium: "Moyenne", medium_large: "Moyenne à grande", large: "Grande", giant: "Géante" } },
    exercise: { label: "Exercice quotidien", values: { under_1h: "Jusqu’à 1 heure", h1_2: "1 à 2 heures", over_2h: "Plus de 2 heures" }, line: (v) => `${lc(v)} par jour` },
    grooming: { label: "Brossage", values: { weekly: "Une fois par semaine", several_weekly: "Plusieurs fois par semaine", daily: "Tous les jours", other: "Autre" }, line: (v) => `brossage : ${lc(v)}` },
  },
  groups: {
    exercise: "Exercice",
    play: "Jeu",
    litter: "Litière",
    scratching: "Griffades",
    grooming: "Pelage et toilettage",
    feeding: "Repas",
    water: "Eau",
    lifespan: "Espérance de vie",
    stages: "Étapes de la vie",
    size: "Taille et poids",
    training: "Éducation",
  },
  fields: {
    size: "Taille",
    height: "Hauteur au garrot",
    weight: "Poids adulte",
    growth_end: "Taille adulte atteinte",
    lifespan: "Espérance de vie",
    exercise: "Exercice quotidien",
    coat: "Pelage",
    grooming_frequency: "Brossage",
    grooming_level: "Besoins de toilettage",
    shedding: "Mue",
    litter_scoop: "Retirer les selles de la litière",
    litter_full_change: "Changer toute la litière",
    litter_pee: "Urine (adulte)",
    litter_poo: "Selles (adulte)",
    water_need: "Besoin en eau",
    sleep: "Sommeil (adulte)",
  },
  contexts: {
    puppy_8_12_weeks: "8 à 12 semaines",
    puppy_3_6_months: "3 à 6 mois",
    puppy_6_12_months: "6 à 12 mois",
    kitten_6_12_weeks: "6 à 12 semaines",
    kitten_3_6_months: "3 à 6 mois",
    kitten_6_12_months: "6 à 12 mois",
    puppy: "Chiot",
    kitten: "Chaton",
    young_adult: "Jeune adulte",
    mature_adult: "Adulte d’âge mûr",
    adult: "Adulte",
    senior: "Senior",
  },
  categories: {
    size: { toy: "très petite", small: "petite", small_medium: "petite à moyenne", medium: "moyenne", medium_large: "moyenne à grande", large: "grande", giant: "géante" },
    coat: { moderately_long: "assez long", smooth: "lisse (court)", short: "court", medium: "mi-long", short_long: "court ou long (deux variétés de poil)", long: "long" },
    grooming_frequency: { at_least_once_a_week: "au moins une fois par semaine", at_least_once_or_twice_a_week: "au moins une à deux fois par semaine", once_a_week: "une fois par semaine", more_than_once_a_week: "plus d’une fois par semaine", daily: "quotidien", every_day: "tous les jours" },
    grooming_level: { moderate: "modérés", high: "élevés", low: "faibles" },
    shedding: { yes: "perd ses poils", no: "ne perd pas ses poils (ce qui ne veut pas dire hypoallergénique)", high: "perd beaucoup de poils", moderate: "perd modérément ses poils", low: "perd peu de poils", minimal: "ne perd presque pas de poils" },
  },
  statements: {
    food_motivated: () => "Très motivé par la nourriture – un atout pour l’éducation, mais surveillez les portions.",
    coren_rank: (v) => `${String(v) === "1" ? "1re" : `${String(v)}e`} place du classement de Stanley Coren sur l’intelligence de travail et d’obéissance.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Standard FCI n° ${x.number}, groupe ${x.group} (« ${fciGroups[x.group] ?? "–"} ») ; origine : ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Jeu : ${f.num(x.sessions[0])} à ${f.num(x.sessions[1])} séances de ${f.num(x.minutes[0])} à ${f.num(x.minutes[1])} minutes par jour.`;
    },
    kittens_play_more: () => "Les chatons ont besoin de jouer plus souvent.",
    scratching_natural: () => "Faire ses griffes est naturel et nécessaire : prévoyez un griffoir et ne punissez jamais ce comportement.",
    water_fresh: () => "De l’eau fraîche en permanence ; lavez et remplissez la gamelle chaque jour.",
    grooming_sources_differ: () => "Les sources divergent sur le peignage : de tous les jours à une fois par semaine.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `médiane : ${t}`,
    more_than: (t) => `plus ${de(t)}`,
    less_than: (t) => `moins ${de(t)}`,
    at_least: (t) => `au moins ${t}`,
    up_to: (t) => `jusqu’à ${t}`,
    ideal: (t) => `idéal (standard de la race) : ${t}`,
    mean: (t) => `moyenne mesurée : ${t}`,
    about: (t) => `environ ${t}`,
    until: (t) => `jusqu’à ${t}`,
    until_about: (t) => `jusqu’à environ ${t}`,
    span: (t) => t,
    from: (t) => `à partir ${de(t)}`,
    last: (t) => {
      // « les 25 derniers pour cent de… », « les 6 derniers mois » (word order: number before « derniers »).
      const pct = t.match(/^([\d,.–]+)\u00a0% (.*)$/);
      if (pct) return `les ${pct[1]} derniers pour cent ${pct[2]}`;
      const m = t.match(/^([\d,.–]+)[\s\u00a0](.+)$/);
      if (!m) return `les derniers ${t}`;
      const fem = /^(heure|semaine|minute)/.test(m[2]);
      if (m[1] === "1") return `${fem ? "la dernière" : "le dernier"} ${m[2]}`;
      return `les ${m[1]} ${fem ? "dernières" : "derniers"} ${m[2]}`;
    },
    every: (t) => (/^1\san$/.test(t) ? "chaque année" : /^1\s/.test(t) ? `chaque ${t.replace(/^1\s/, "")}` : `${/heure|semaine|minute/.test(t) ? "toutes" : "tous"} les ${t}`),
    expectancy: (t) => `espérance de vie à la naissance : ${t}`,
    smaller_meals: (t) => `${t}, en plus petites portions`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "an", "ans")}`,
    months: (t) => `${t} mois`,
    days: (t, n) => `${t} ${s(n, "jour", "jours")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "heure", "heures")} par jour` : `${t} ${s(n, "minute", "minutes")} par jour`),
    meals_per_day: (t) => `${t} repas par jour`,
    times_per_day: (t) => `${t} fois par jour`,
    hours_per_day: (t, n) => `${t} ${s(n, "heure", "heures")} par jour`,
    ml_per_kg_day: (t) => `${t} ml par kg de poids corporel et par jour`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)} % de l’espérance de vie attendue`,
  },
  males: "mâles",
  females: "femelles",
  or: " ou ",
  notes: { size_class_guidance: "recommandation pour sa catégorie de taille" },
  stageLabels: {
    dog: { puppy: "Chiot", young: "Jeune chien", adult: "Adulte", senior: "Senior" },
    cat: { puppy: "Chaton", young: "Jeune chat", adult: "Chat d’âge mûr", senior: "Senior" },
  },
  activity: {
    steps: (n) => `${n} pas`,
    steps_range: (from, to) => `${from} → ${to} pas`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} pas par mois d’âge (${first} à l’arrivée), jusqu’à ${cap} à partir du ${ord(capMonth)} mois`,
    play_sessions: (n) => `${n} ${s(n, "séance", "séances")} de jeu`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Objectif de pas = minutes d’exercice quotidien × ${p.per_minute} pas : ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "heure", "heures")}` : `${p.minutes} ${s(p.minutes, "minute", "minutes")}`} pour un adulte, soit ${f.num(p.steps)} pas par jour.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Apprend les ordres plus lentement que le chien croisé de la formule gratuite (${f.num(p.multiplier)} fois sa vitesse).`
        : p.multiplier === 1
          ? "Apprend les ordres aussi vite que le chien croisé de la formule gratuite."
          : `Apprend les ordres ${f.num(p.multiplier)} fois plus vite que le chien croisé de la formule gratuite.`,
    senior_share: (p, f) => `Devient senior au ${ord(p.months)} mois (${f.num(p.months / 12, 1)} ${s(p.months / 12, "an", "ans")}) – le dernier quart de l’espérance de vie attendue de la race.`,
    walk_sensor: () => "Les promenades comptent de vrais pas, issus d’Apple Health ou de Health Connect (avec autorisation, en lecture seule) et du capteur de mouvement du téléphone – sans GPS.",
    play_instead_of_steps: (p, f) =>
      `Pas de promenades : un chat adulte a besoin de ${p.sessions} ${s(p.sessions, "séance", "séances")} de jeu par jour avec une canne à pêche pour chat, ${s(p.sessions, "espacée", "espacées")} d’au moins ${f.num(p.gap_minutes / 60)} ${s(p.gap_minutes / 60, "heure", "heures")}.`,
    litter_rule: (p) =>
      `Litière : un chat adulte l’utilise ${p.uses} fois par jour ; chaque passage est ramassé ${p.scoop_hours === 1 ? "dans l’heure" : `dans les ${p.scoop_hours} heures`} (en dehors des heures calmes), et toute la litière est changée ${p.change_days === 1 ? "chaque jour" : `tous les ${p.change_days} jours`}.`,
    scratching_after_missed_play: () => "Après une journée sans assez de jeu, le chat fait une fois ses griffes sur quelque chose ; l’enfant porte le chat jusqu’au griffoir.",
    grooming_rule: (p) => (p.per_week === 1 ? "Peignage une fois par semaine." : p.per_week === 2 ? "Peignage deux fois par semaine." : `Peignage ${p.per_week} fois par semaine.`),
    no_walk_in_heat: (p) =>
      `En été (juin à août ; décembre à février dans l’hémisphère Sud), les écrans enfant et promenade affichent un rappel bienveillant entre ${hhmm(p.from)} et ${hhmm(p.to)} (heure de la famille) : pas de promenade par forte chaleur. Aucune donnée météo, aucune pénalité – les pas comptent quand même.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "nettoyage des plis de la peau",
        tooth_brushing: "brossage des dents",
        ear_cleaning: "contrôle et nettoyage des oreilles",
        nail_trim: "coupe des griffes",
        bath: "bain",
        groomer_visit: "visite chez le toiletteur",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "tous les jours"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "une fois par semaine"
              : `toutes les ${q.period_days / 7} semaines`
            : q.period_days === 7
              ? `${q.times} fois par semaine`
              : q.times === 1
                ? `tous les ${q.period_days} jours`
                : `${q.times} fois tous les ${q.period_days} jours`;
      const who = q.actor === "parent" ? "un rappel pour le parent" : "une tâche pour l’enfant";
      return `Soins : ${what}, ${when} – ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Voyez le chiot avec sa mère, là où il est né.",
      min_age_puppy: "Le chiot ne doit pas quitter sa mère avant l’âge de 8 semaines.",
      pedigree_fci: "Demandez le pedigree. Selon les règles de la FCI, un pedigree ne peut être délivré que si la filiation est correcte.",
      parents_health_tests: "Demandez à voir les résultats des tests de santé des deux parents. Les tests importants dépendent de la race.",
      breed_club_rules: "Les sociétés canines nationales peuvent fixer des règles d’élevage qui vont au-delà de celles de la FCI – demandez au club de race quels tests les parents doivent passer.",
      written_contract: "Demandez un contrat de vente écrit qui précise l’origine et l’état de santé du chiot.",
      kitten_see_mother: "Voyez le chaton avec sa mère, là où vivent les chatons.",
      kitten_min_age: "Selon les règles de pedigree de la FIFe, un chaton ne rejoint pas un nouveau foyer avant l’âge de 14 semaines.",
      kitten_vaccination: "Le chaton est entièrement vacciné (panleucopénie, calicivirus, herpèsvirus) et arrive avec son carnet de vaccination.",
      kitten_pedigree: "Un chaton de race arrive avec un certificat de pedigree couvrant au moins trois générations.",
      kitten_parents_tests: "Demandez si l’un des parents a eu des problèmes de santé dont le chaton pourrait hériter.",
    },
    tests: {
      hip_scheme: "Dépistage radiographique de la dysplasie de la hanche (Royaume-Uni : programme BVA/KC)",
      elbow_scheme: "Dépistage radiographique de la dysplasie du coude (Royaume-Uni : programme BVA/KC)",
      eye_scheme: "Examen des yeux par un vétérinaire ophtalmologiste (Royaume-Uni : programme BVA/KC/ISDS ; avec gonioscopie pour certaines races)",
      heart_scheme: "Dépistage cardiaque de la maladie de la valve mitrale",
      boas_grading: "Test respiratoire du syndrome obstructif des voies respiratoires des races brachycéphales (grade BOAS)",
      ivdd_screening: "Dépistage rachidien de la maladie des disques intervertébraux (IVDD)",
      hearing_baer: "Test auditif de dépistage de la surdité (BAER)",
      cm_sm_mri: "Dépistage par IRM de la malformation de type Chiari et de la syringomyélie (Royaume-Uni : programme CM/SM BVA/KC)",
      inbreeding_coi: "Diversité génétique – vérifier le coefficient de consanguinité",
      dna_prcd_pra: "Test ADN de l’atrophie progressive de la rétine (prcd-PRA)",
      dna_rcd4_pra: "Test ADN de l’atrophie progressive de la rétine (rcd4)",
      dna_gr_pra2: "Test ADN de l’atrophie progressive de la rétine (GR_PRA2)",
      dna_cnm: "Test ADN de la myopathie centronucléaire (CNM)",
      dna_eic: "Test ADN du collapsus induit par l’exercice (EIC)",
      dna_hnpk: "Test ADN de la parakératose nasale héréditaire (HNPK)",
      dna_sd2: "Test ADN de la dysplasie squelettique de type 2 (SD2)",
      dna_mcd: "Test ADN de la dystrophie cornéenne maculaire (MCD)",
      dna_stgd: "Test ADN de la maladie de Stargardt (STGD)",
      dna_cc_de: "Test ADN du syndrome du poil bouclé et de l’œil sec (CC/DE)",
      dna_ef: "Test ADN des chutes épisodiques (EF)",
      dna_cea: "Test ADN de l’anomalie de l’œil du colley (CEA/CH)",
      dna_cl: "Test ADN de la céroïde-lipofuscinose (CL)",
      dna_igs: "Test ADN du syndrome d’Imerslund-Gräsbeck (IGS)",
      dna_mdr1: "Test ADN de la sensibilité multiple aux médicaments (MDR1)",
      dna_tns: "Test ADN du syndrome des neutrophiles piégés (TNS)",
      dna_sn: "Test ADN de la neuropathie sensitive (SN)",
      dna_ggd: "Test ADN de la goniodysgénésie et du risque de glaucome (GGD)",
      dna_raines: "Test ADN du syndrome de Raine",
      dna_dm: "Test ADN de la myélopathie dégénérative (DM)",
      dna_de: "Test ADN de l’encéphalopathie dégénérative (DE)",
      dna_jadd: "Test ADN de la maladie d’Addison juvénile (JADD)",
      dermoid_sinus_scheme: "Contrôle des chiots pour le sinus dermoïde (programme du club de race)",
      dna_jme: "Test ADN de l’épilepsie myoclonique juvénile (JME)",
      dna_je: "Test ADN de l’épilepsie juvénile (JE)",
      dna_lsd: "Test ADN de la maladie de surcharge lysosomale (LSD)",
      dna_ampn: "Test ADN de la polyneuropathie du malamute de l’Alaska (AMPN)",
      dna_fanconi: "Test ADN du syndrome de Fanconi (une maladie rénale)",
      dna_pra_bj1: "Test ADN de l’atrophie progressive de la rétine du basenji (PRA-BJ1)",
      thyroid_scheme: "Contrôle de la thyroïde des parents",
      dna_pap_pra1: "Test ADN de l’atrophie progressive de la rétine du papillon (Pap-PRA1)",
      dna_nad: "Test ADN de la dystrophie neuroaxonale (NAD)",
      dna_eopra: "Test ADN de l’atrophie progressive de la rétine précoce (EOPRA)",
      dna_cu: "Test ADN de la cystinurie (CU), une maladie héréditaire qui forme des calculs dans les reins et la vessie",
      heart_echo_scheme: "Dépistage cardiaque par échographie Doppler couleur (programme du club de race)",
      cardiac_exam: "Examen cardiaque des parents (recommandation du club de race)",
      dna_rd_osd: "Test ADN de la dysplasie rétinienne / dysplasie oculo-squelettique (RD/OSD)",
      dna_xlpra1: "Test ADN de l’atrophie progressive de la rétine liée à l’X (XLPRA1)",
      dna_cmo: "Test de l’ostéopathie cranio-mandibulaire (CMO), une maladie osseuse héréditaire de la mâchoire",
      dna_hsf4: "Test ADN de la cataracte héréditaire (HSF4)",
      dna_lafora: "Test ADN de la maladie de Lafora",
      dna_nccd: "Test ADN de la dégénérescence corticale cérébelleuse néonatale (NCCD)",
      dna_fviid: "Test ADN du déficit en facteur VII (FVIID)",
      dna_mls: "Test ADN du syndrome de Musladin-Lueke (MLS)",
      dna_vwd1: "Test ADN de la maladie de von Willebrand de type 1 (vWD1)",
      dna_mac: "Test ADN de la sensibilité aux infections à Mycobacterium avium complex (MAC)",
      dna_imgd: "Test ADN de la myopathie héréditaire du dogue allemand (IMGD), une maladie qui entraîne une fonte musculaire",
      dna_poag: "Test ADN du glaucome primaire à angle ouvert (POAG), une maladie oculaire héréditaire qui peut rendre aveugle",
      dna_aon: "Test ADN de la neuropathie de l’adulte (AON), une maladie nerveuse héréditaire",
      dna_fn: "Test ADN de la néphropathie familiale (FN), une maladie rénale héréditaire",
      patella_scheme: "Dépistage de la luxation de la rotule avant la reproduction",
      kidney_scheme: "Échographie des reins pour détecter un rein absent ou malformé (recommandation du club de race)",
      kidney_upc_scheme: "Analyse d’urine (rapport protéines/créatinine) pour dépister une maladie rénale (recommandation du club de race)",
      dna_gld: "Test ADN de la leucodystrophie à cellules globoïdes (GLD), une maladie nerveuse héréditaire",
      liver_shunt_scheme: "Contrôle du foie pour un shunt porto-systémique ou une dysplasie microvasculaire (recommandation du club de race)",
      breed_health_scheme: "Le programme de santé du club de race pour les parents",
      hemivertebrae_scheme: "Radiographie de la colonne vertébrale des parents pour dépister les hémivertèbres (vertèbres malformées), après l’âge de 12 mois",
      dna_hcm_mc: "Test ADN de la cardiomyopathie hypertrophique (MC HCM)",
      dna_sma: "Test ADN de l’amyotrophie spinale (SMA)",
      dna_pk_def: "Test ADN du déficit en pyruvate kinase (PK def)",
      hcm_negative: "Les chats reproducteurs doivent être négatifs pour la HCM (maladie cardiaque : cardiomyopathie hypertrophique)",
      dna_gsd4: "Test ADN de la glycogénose de type IV (GSD IV)",
      dna_pra_b: "Test ADN de l’atrophie progressive de la rétine du bengal (PRA-b)",
      dna_jlpp: "Test ADN de la paralysie laryngée juvénile et polyneuropathie (JLPP)",
      dna_lemp2: "Test ADN de la leucoencéphalomyélopathie (LEMP-2)",
      dna_huu: "Test ADN de l’hyperuricosurie (HUU)",
      dna_dcm: "Test ADN de la cardiomyopathie dilatée (DCM), une maladie du muscle cardiaque",
      dna_pra5: "Test ADN de l’atrophie progressive de la rétine (PRA5)",
      dna_dings2: "Test ADN de la maladie du dobermann dansant (DINGS2), un trouble nerveux et musculaire",
      dna_ams: "Test ADN du syndrome de mutilation acrale (AMS), un trouble nerveux qui supprime la sensation de douleur dans les pattes",
      dna_dams: "Test ADN du syndrome d’anémie dysérythropoïétique et de myopathie (DAMS), un trouble du sang et des muscles",
      dna_fuco: "Test ADN de la fucosidose, une maladie héréditaire du système nerveux",
      dna_pfk: "Test ADN du déficit en phosphofructokinase (PFK), un trouble enzymatique héréditaire du sang et des muscles",
      dna_pra_cord1: "Test ADN de l’atrophie progressive de la rétine (PRA cord1)",
      dna_bbs2_pra: "Test ADN de l’atrophie progressive de la rétine (BBS2-PRA)",
      dna_cnga1_pra: "Test ADN de l’atrophie progressive de la rétine (CNGA1-PRA)",
      dna_pra_rcd2: "Test ADN de l’atrophie progressive de la rétine (PRA-rcd2)",
      dna_gm1: "Test ADN de la gangliosidose GM1 (une maladie héréditaire du système nerveux)",
      dna_gm2: "Test ADN de la gangliosidose GM2 (une maladie héréditaire du système nerveux)",
      dna_vwd3: "Test ADN de la maladie de von Willebrand de type 3 (vWD3), un trouble héréditaire de la coagulation",
      dna_pra_rcd3: "Test ADN de l’atrophie progressive de la rétine (PRA-rcd3)",
      dna_vwd2: "Test ADN de la maladie de von Willebrand de type 2 (vWD2), un trouble héréditaire de la coagulation",
      dna_l2hga: "Test ADN de l’acidurie L-2-hydroxyglutarique (L-2-HGA), une maladie métabolique héréditaire du système nerveux",
      dna_pll: "Test ADN de la luxation primaire du cristallin (PLL), une maladie oculaire héréditaire dans laquelle le cristallin se déplace",
      dna_loa: "Test ADN de l’ataxie d’apparition tardive (LOA), une maladie héréditaire qui affecte l’équilibre et la coordination",
      dna_sca: "Test ADN de l’ataxie spinocérébelleuse (SCA), une maladie héréditaire du système nerveux",
    },
  },
  health: {
    weight_gain: "Prend facilement du poids – il faut surveiller les portions et les friandises.",
    hip_elbow_dysplasia_eye_conditions: "Peut être sujet à la dysplasie de la hanche et du coude ainsi qu’à plusieurs maladies oculaires héréditaires.",
    cancer_risk: "Les sources décrivent un risque de cancer plus élevé dans cette race.",
    flat_face_breathing: "Race à face plate (brachycéphale) : le museau court, les narines étroites et l’excès de tissus mous dans les voies respiratoires peuvent gêner la respiration (syndrome obstructif des voies respiratoires des races brachycéphales, BOAS).",
    heat_stroke_risk: "Surchauffe vite et est plus exposé au coup de chaleur que la plupart des chiens, surtout par temps chaud.",
    skin_fold_ear_problems: "Sujet aux otites et aux infections des plis de la peau ; les plis doivent rester propres et secs.",
    ear_infections_long_ears: "Des otites peuvent survenir à cause des longues oreilles ; des bactéries peuvent s’accumuler dans le conduit auditif.",
    collie_eye_pra: "Des maladies oculaires héréditaires s’observent dans la race : l’anomalie de l’œil du colley, une malformation du fond de l’œil, et l’atrophie progressive de la rétine, qui peut lentement rendre aveugle ; des examens des yeux et des tests ADN existent.",
    merle_colour_risk: "Le merle n’est pas une couleur admise par le standard ; dans cette race, il s’accompagne d’un risque accru de troubles de l’audition et de la vue.",
    hind_leg_conformation: "Le Royal Kennel Club signale la forme des membres postérieurs et la façon de se déplacer comme un point de vigilance dans cette race ; un chien sain a le dos droit et des membres postérieurs modérés.",
    hip_elbow_dysplasia: "Peut être sujet à la dysplasie de la hanche et du coude ; il est conseillé aux éleveurs de faire contrôler les hanches et les coudes des parents avant la reproduction.",
    degenerative_myelopathy: "La myélopathie dégénérative, une maladie de la moelle épinière qui affaiblit lentement les membres postérieurs, s’observe dans la race ; un test ADN existe.",
    exercise_induced_collapse: "Le collapsus induit par l’exercice, une affection neuromusculaire héréditaire qui peut faire s’effondrer le chien après un effort intense, s’observe dans la race.",
    heart_valve_disease: "La maladie cardiaque due à l’affaiblissement de la valve mitrale est un problème majeur dans cette race ; elle se remarque souvent d’abord par un souffle au cœur, et les chiens reproducteurs devraient d’abord passer un contrôle cardiaque.",
    chiari_syringomyelia: "La malformation de type Chiari et la syringomyélie, une affection douloureuse avec des cavités remplies de liquide dans la moelle épinière près du cerveau, s’observent dans la race et sont liées à la forme du crâne ; le diagnostic se fait par IRM.",
    eye_conditions: "Des maladies oculaires héréditaires comme la cataracte s’observent dans la race, et des yeux saillants ou irrités sont un point de vigilance ; des examens des yeux et des tests ADN existent.",
    epilepsy: "L’épilepsie, un trouble cérébral qui peut provoquer des crises, s’observe dans la race.",
    storage_disease: "Une maladie de surcharge héréditaire du système nerveux peut toucher les jeunes chiens de la race ; un test ADN des parents permet aux éleveurs de l’éviter.",
    chondrodysplasia: "La chondrodysplasie, un trouble de la croissance du cartilage et des os, s’observe dans la race ; les chiots peuvent être contrôlés par radiographie.",
    polyneuropathy: "Une maladie nerveuse héréditaire (polyneuropathie) s’observe dans la race ; un test ADN des parents permet aux éleveurs de l’éviter.",
    fanconi_syndrome: "Le syndrome de Fanconi, une maladie rénale héréditaire qui laisse passer du sucre dans l’urine, s’observe dans la race ; un test ADN des parents permet aux éleveurs de l’éviter.",
    pyruvate_kinase_deficiency: "Le déficit en pyruvate kinase, un défaut héréditaire des globules rouges qui provoque une anémie, peut survenir dans la race.",
    back_disc_disease: "La maladie des disques intervertébraux, un problème des disques qui amortissent les vertèbres du dos, s’observe dans la race.",
    pra_eye_disease: "L’atrophie progressive de la rétine, une maladie oculaire héréditaire qui peut lentement rendre aveugle, s’observe dans la race ; des tests ADN et des examens des yeux existent.",
    hip_dysplasia: "La dysplasie de la hanche, une articulation de la hanche mal développée qui peut entraîner de l’arthrose, s’observe dans la race ; il est conseillé aux éleveurs de faire évaluer les hanches des parents.",
    bloat_gdv: "Le syndrome de dilatation-torsion de l’estomac, où l’estomac se retourne, peut survenir dans la race – c’est une urgence qui exige un vétérinaire immédiatement.",
    inherited_eye_disease: "Des maladies oculaires héréditaires s’observent dans la race, comme l’anomalie de l’œil du colley, la cataracte et l’atrophie progressive de la rétine.",
    drug_sensitivity_mdr1: "Certains chiens de la race présentent une sensibilité héréditaire à certains médicaments (sensibilité multiple aux médicaments, MDR1) – si votre chien est concerné, informez votre vétérinaire.",
    merle_to_merle_breeding: "Le merle est une couleur admise dans cette race ; il ne faut pas accoupler deux chiens merle, car leurs chiots risquent des troubles de la vue et de l’audition – le Royal Kennel Club ne les enregistre pas.",
    kneecap_luxation: "La luxation de la rotule, où la rotule sort temporairement de sa place, s’observe dans la race.",
    pra_and_eyelashes: "Des problèmes oculaires s’observent dans la race : l’atrophie progressive de la rétine, qui peut lentement rendre aveugle, et des cils surnuméraires qui frottent sur l’œil (distichiasis) ; il est conseillé aux éleveurs de faire examiner les yeux des parents.",
    liver_shunt: "Un shunt porto-systémique (hépatique), où le sang contourne le foie, peut survenir dans la race.",
    skin_allergies: "Les allergies cutanées sont un problème connu dans la race ; le Royal Kennel Club demande aux juges de rechercher des signes d’inflammation de la peau, et il est conseillé aux propriétaires de demander l’avis de leur vétérinaire avant de choisir un shampooing.",
    westie_lung: "Une maladie pulmonaire appelée « poumon du westie » (fibrose pulmonaire idiopathique), qui gêne la respiration, peut survenir dans la race, surtout chez les chiens âgés.",
    jaw_bone_disorder: "Une maladie osseuse héréditaire de la mâchoire peut survenir dans la race.",
    dry_eye: "La sécheresse oculaire, où les yeux ne produisent pas assez de larmes et deviennent secs et douloureux, peut survenir dans la race.",
    heart_hcm: "La cardiomyopathie hypertrophique (HCM), une maladie cardiaque héréditaire dans laquelle le muscle cardiaque s’épaissit, s’observe dans la race.",
    dental_weight_nail_care: "Une vaste étude britannique cite les maladies dentaires, le surpoids et les griffes trop longues parmi les problèmes les plus fréquents de la race ; il est donc conseillé aux propriétaires de veiller à l’hygiène dentaire, au poids et à l’entretien des griffes.",
    dental_weight_care: "PetMD cite les maladies dentaires et le surpoids parmi les problèmes à surveiller ; il est donc conseillé aux propriétaires de brosser régulièrement les dents du chat et de surveiller son poids.",
    gsd_iv: "La glycogénose de type IV (GSD IV), une maladie héréditaire qui touche les chatons, s’observe dans la race ; un test ADN des parents permet aux éleveurs de l’éviter.",
    hip_dysplasia_weight: "La dysplasie de la hanche, une articulation de la hanche mal développée, peut survenir dans la race ; PetMD conseille de maintenir le chat à un poids sain pour protéger ses articulations.",
    laryngeal_paralysis_polyneuropathy: "La paralysie laryngée juvénile et polyneuropathie (JLPP), une maladie nerveuse héréditaire qui touche le larynx et les membres postérieurs, s’observe dans la race ; un test ADN des parents permet aux éleveurs de l’éviter.",
    heart_sas: "La sténose sous-aortique, un rétrécissement juste sous une valve cardiaque qui peut provoquer un souffle, s’observe dans la race ; les chiens reproducteurs devraient d’abord passer un contrôle cardiaque.",
    inherited_eye_defects: "Des maladies oculaires héréditaires s’observent dans la race, comme la dysplasie rétinienne et la persistance de la membrane pupillaire ; des examens des yeux existent.",
    skin_fold_infections: "Les plis de la peau, surtout ceux de la face, peuvent retenir l’humidité et s’infecter (pyodermite des plis) ; les rides de la face doivent être nettoyées chaque jour.",
    eyelid_eye_problems: "Des problèmes de paupières (paupières enroulées vers l’intérieur ou vers l’extérieur), la sécheresse oculaire et la « cherry eye » (prolapsus de la glande nictitante) s’observent dans la race ; des examens des yeux existent.",
    hip_elbow_joint_disease: "La dysplasie de la hanche et du coude, où les articulations se développent mal, s’observe dans la race et peut entraîner une maladie articulaire.",
    hip_dysplasia_arthritis: "La dysplasie de la hanche, une articulation de la hanche lâche et mal développée, s’observe dans la race et peut à terme entraîner de l’arthrose.",
    bleeding_disorder_vwd: "La maladie de von Willebrand, un trouble héréditaire de la coagulation qui peut provoquer des saignements excessifs, s’observe dans la race.",
    heart_muscle_disease: "La cardiomyopathie, une dilatation du cœur causée par l’affaiblissement du muscle cardiaque, peut survenir dans la race.",
    itchy_skin_allergy: "Des allergies cutanées (atopie), qui provoquent démangeaisons et irritations de la peau, peuvent survenir dans la race.",
    entropion_cherry_eye: "Des paupières enroulées vers l’intérieur (entropion) et la « cherry eye », où la troisième paupière ressort, peuvent survenir dans la race ; la « cherry eye » peut être corrigée chirurgicalement.",
    dental_disease_tooth_brushing: "Une vaste étude britannique cite les maladies dentaires comme le problème de loin le plus fréquent de la race, et les dents de lait qui ne tombent pas sont aussi courantes ; les propriétaires sont donc encouragés à prendre soin des dents du chien chaque jour, par exemple en les brossant.",
    windpipe_collapse: "Le collapsus trachéal, où la trachée perd sa rigidité et peut provoquer faiblesse et effondrement, peut survenir dans la race.",
    eye_problems_pra_lens_dry_eye: "Des problèmes oculaires s’observent dans la race, comme l’atrophie progressive de la rétine, qui peut lentement rendre aveugle, le déplacement du cristallin (luxation du cristallin) et la sécheresse oculaire.",
    cataracts_lens_luxation: "Des problèmes oculaires peuvent survenir dans la race, comme la cataracte, qui opacifie le cristallin, et le déplacement du cristallin (luxation du cristallin).",
    wobbler_syndrome: "Le syndrome de Wobbler, où des vertèbres instables du cou compriment la moelle épinière et affaiblissent les membres postérieurs, peut survenir dans la race.",
    eye_phpv: "Une malformation de l’œil présente dès la naissance (persistance hyperplasique du vitré primitif, PHPV) peut survenir dans la race ; il est conseillé aux éleveurs de faire examiner les yeux des parents.",
    certain_cancers: "Certains cancers peuvent survenir dans la race.",
    bare_skin_sun_cold: "La peau nue de la variété sans poil doit être protégée du soleil et du froid.",
    l2hga_nervous_system: "L’acidurie L-2-hydroxyglutarique (L-2-HGA), un trouble métabolique héréditaire qui touche le système nerveux, peut survenir dans la race ; un test ADN des parents existe.",
    short_face_breathing: "Race à face modérément courte : certains chiens à la face plus courte peuvent avoir de graves problèmes respiratoires (syndrome obstructif des voies respiratoires des races brachycéphales, BOAS).",
    corneal_ulcers: "Les problèmes oculaires comme les ulcères de la cornée sont plus probables en raison de la forme du crâne et des yeux saillants ; des examens des yeux existent.",
    skin_folds_allergies: "Des problèmes de peau comme les allergies, les verrues, les petites excroissances cutanées et les plis irrités de la face (dermatite des plis) peuvent survenir ; les plis de la face doivent rester propres et secs.",
    heart_cardiomyopathy_aortic_stenosis: "Des problèmes cardiaques comme la cardiomyopathie et la sténose aortique peuvent survenir dans la race.",
    dental_disease_care: "Une vaste étude britannique cite les maladies dentaires comme le problème le plus fréquent de la race, et il est conseillé aux propriétaires de faire de l’hygiène dentaire une priorité.",
    bladder_stones: "Les calculs vésicaux, des amas de minéraux qui se forment dans la vessie et l’urine, peuvent survenir dans la race.",
    deafness: "La surdité d’une ou des deux oreilles s’observe dans la race ; l’audition des chiots peut être contrôlée par un test BAER.",
    mitral_valve_disease: "La maladie de la valve mitrale, une affection cardiaque où une valve affaiblie laisse le sang refluer dans le cœur, s’observe dans la race ; un vétérinaire peut ausculter le cœur des chiens reproducteurs avant la reproduction.",
    eye_problems_pra_cataracts_dry_eye: "Des problèmes oculaires s’observent dans la race, comme l’atrophie progressive de la rétine, qui peut lentement rendre aveugle, la cataracte et la sécheresse oculaire ; des examens des yeux existent.",
    skin_comedo_allergy: "Des problèmes de peau peuvent survenir, comme le syndrome des comédons du schnauzer (une inflammation des follicules pileux) et des allergies cutanées (atopie) qui provoquent des démangeaisons.",
    shorter_face_boas: "Race brachycéphale (à face courte) : la face plus courte peut provoquer de graves problèmes respiratoires (syndrome obstructif des voies respiratoires des races brachycéphales, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Des problèmes oculaires s’observent dans la race, comme la sécheresse oculaire, la cataracte, l’atrophie progressive de la rétine, qui peut lentement rendre aveugle, et le décollement de la rétine.",
    hypothyroidism: "Une thyroïde paresseuse (hypothyroïdie), qui peut affecter le poids, la peau et le niveau d’énergie, peut survenir dans la race.",
    open_fontanelle: "Une fontanelle ouverte, une zone molle du crâne qui ne se ferme pas complètement, peut survenir dans la race.",
    collapsing_trachea: "Le collapsus trachéal, une faiblesse de la trachée qui peut provoquer toux et difficultés respiratoires, peut survenir dans la race.",
    gm1_gangliosidosis: "La gangliosidose GM1, une maladie héréditaire du système nerveux, peut survenir dans la race ; un test ADN des parents permet de l’exclure.",
    addisons_disease: "La maladie d’Addison, un manque d’hormones produites par les glandes surrénales, peut survenir dans la race.",
    protein_losing_disease: "Des maladies des reins ou de l’intestin avec perte de protéines, qui peuvent provoquer diarrhée et perte de poids, peuvent survenir dans la race.",
    diabetes_mellitus: "Le diabète sucré, où l’organisme ne parvient pas à bien réguler sa glycémie, peut survenir dans la race.",
    dental_disease_home_brushing: "Comme beaucoup de petits chiens, la race est sujette aux maladies dentaires ; il est donc conseillé de lui brosser les dents à la maison avec une brosse et un dentifrice pour chiens.",
    dermoid_sinus: "Le sinus dermoïde, une affection douloureuse où un conduit dans la peau du dos rejoint la moelle épinière, peut survenir dans la race ; les clubs de race proposent un programme de contrôle des chiots.",
    cataracts: "La cataracte, qui opacifie le cristallin et peut entraîner une perte de vision, peut survenir dans la race.",
    pra_inherited_blindness: "L’atrophie progressive de la rétine, une maladie oculaire héréditaire qui peut lentement rendre aveugle, peut survenir dans la race.",
    eyelids_turned: "Des paupières enroulées vers l’intérieur (entropion) ou vers l’extérieur (ectropion) peuvent survenir dans la race ; demandez des parents dont les yeux ont été examinés.",
    glaucoma_poag: "Le glaucome primaire à angle ouvert, où du liquide s’accumule dans l’œil et provoque douleur et parfois cécité, peut survenir dans la race ; un test ADN des parents existe.",
    skin_fold_dermatitis: "La peau lâche forme des plis qui peuvent s’irriter et s’infecter ; il faut les vérifier chaque jour et les garder propres et secs.",
    eyelid_problems: "Des problèmes de paupières peuvent survenir dans la race : paupières enroulées vers l’intérieur (entropion) ou vers l’extérieur (ectropion), et « cherry eye », où la troisième paupière ressort.",
    skin_allergy_face_folds: "Des allergies cutanées (atopie) qui provoquent des démangeaisons peuvent survenir dans la race, et les plis de la face doivent être nettoyés chaque jour.",
    skin_ear_allergies: "Des allergies environnementales peuvent survenir dans la race et entraîner des infections répétées de la peau ou des oreilles ; PetMD suggère de nettoyer les oreilles chaque semaine chez un chien allergique.",
    gum_disease_daily_brushing: "La race est sujette aux maladies des gencives (gingivite et maladie parodontale) ; PetMD conseille donc de brosser les dents du chien chaque jour et de faire un contrôle dentaire annuel chez le vétérinaire.",
    pra_pk_def: "Deux maladies héréditaires s’observent dans la race : l’atrophie progressive de la rétine, une maladie oculaire qui peut rendre aveugle, et le déficit en pyruvate kinase, un trouble sanguin ; des tests ADN des parents permettent aux éleveurs de les éviter.",
    windpipe_collapse_breathing: "Le collapsus trachéal, où les anneaux de la trachée s’affaissent et gênent la respiration, peut survenir dans la race.",
    eye_problems_pra_cataracts_entropion: "Des problèmes oculaires s’observent dans la race, comme l’atrophie progressive de la rétine, qui peut lentement rendre aveugle, la cataracte, qui opacifie le cristallin, et des paupières enroulées vers l’intérieur (entropion) ; des examens des yeux existent.",
    elbow_dysplasia_arthritis: "La dysplasie du coude, une articulation du coude mal développée qui peut à terme entraîner de l’arthrose, peut survenir dans la race.",
    entropion: "L’entropion, où les paupières s’enroulent vers l’intérieur et irritent l’œil, peut survenir dans la race ; demandez des parents dont les yeux ont été examinés.",
    autoimmune_conditions: "Des maladies auto-immunes, où l’organisme réagit contre lui-même, peuvent survenir dans la race.",
    ear_infections_prone: "La race est sujette aux otites ; surveillez de près l’hygiène des oreilles.",
    familial_nephropathy: "Une maladie rénale héréditaire (néphropathie familiale) s’observe dans la race ; un test ADN des parents existe.",
    hereditary_nephritis: "Une maladie rénale héréditaire (néphrite héréditaire, aussi appelée glomérulopathie héréditaire du samoyède) s’observe dans la race.",
    panosteitis: "La panostéite, une inflammation douloureuse des os longs qui touche généralement les jeunes chiens en croissance, peut survenir dans la race.",
    urinary_incontinence: "L’incontinence urinaire, une fuite d’urine incontrôlée, peut survenir dans la race.",
    osteochondritis: "L’ostéochondrite disséquante (OCD), un trouble du cartilage articulaire chez les chiens en croissance, peut survenir dans la race.",
    scottie_cramp: "La « crampe du scottie » – de courts épisodes de crampes musculaires, généralement déclenchés par l’excitation – s’observe dans la race ; elle n’est pas douloureuse.",
    periodontal_disease: "La maladie parodontale, une infection et une inflammation des gencives et des tissus qui maintiennent les dents, est un problème connu dans la race.",
    extra_eyelashes: "Le distichiasis, où de petits cils surnuméraires poussent sur la face interne ou le bord de la paupière et peuvent frotter l’œil, peut survenir dans la race ; demandez des parents examinés dans le cadre du programme de dépistage oculaire.",
    cm_sm_screening: "La malformation de type Chiari et la syringomyélie, une affection douloureuse avec des cavités remplies de liquide dans la moelle épinière près du cerveau, peuvent survenir dans la race ; il est conseillé aux éleveurs de faire dépister les parents (Royaume-Uni : programme BVA/KC).",
    prominent_eyes_injury_dry_eye: "Les yeux saillants se blessent plus facilement et peuvent développer des ulcères et une sécheresse ; la sécheresse oculaire et la « cherry eye » s’observent aussi dans la race.",
    legg_perthes: "La maladie de Legg-Perthes-Calvé, une affection douloureuse où la tête du fémur se nécrose et se désagrège, peut survenir dans la race.",
    glaucoma: "Le glaucome, une pression accrue à l’intérieur de l’œil qui peut être douloureuse et rendre aveugle, peut survenir dans la race.",
    lethal_acrodermatitis: "L’acrodermatite létale, une maladie héréditaire qui provoque de graves problèmes de peau et de croissance chez les chiots, s’observe dans la race.",
    kidney_disease_urine_screening: "Des problèmes rénaux s’observent dans la race ; des analyses d’urine permettent de dépister les parents avant la reproduction.",
    primary_lens_luxation: "La luxation primaire du cristallin, une maladie oculaire héréditaire douloureuse dans laquelle le cristallin se déplace et qui peut rendre aveugle, s’observe dans la race ; un test ADN existe pour les chiens reproducteurs.",
    inherited_ataxia: "Des ataxies héréditaires (ataxie d’apparition tardive et ataxie spinocérébelleuse), qui entraînent une perte d’équilibre et de coordination, s’observent dans la race ; des tests ADN existent pour les chiens reproducteurs.",
    hydrocephalus: "L’hydrocéphalie, une accumulation de liquide autour du cerveau, peut survenir dans la race.",
    heart_disease_pda: "Des maladies cardiaques peuvent survenir dans la race, dont la persistance du canal artériel, un vaisseau sanguin proche du cœur qui ne se ferme pas après la naissance ; un vétérinaire peut la rechercher à l’auscultation lors de la première visite du chiot.",
    chiari_malformation: "La malformation de type Chiari avec syringomyélie, une affection douloureuse avec des cavités remplies de liquide dans la moelle épinière près du cerveau, peut survenir dans la race.",
    cataracts_entropion: "La cataracte, qui opacifie le cristallin, et des paupières enroulées vers l’intérieur (entropion) peuvent survenir dans la race ; demandez des parents examinés dans le cadre du programme de dépistage oculaire.",
    periodontal_daily_brushing: "La race est sujette aux maladies des gencives (parodontales) ; il est donc conseillé de brosser les dents chaque jour avec un dentifrice pour chiens.",
    eye_problems_shallow_sockets: "Des problèmes oculaires s’observent dans la race, comme la sécheresse oculaire, les infections des yeux et les ulcères à la surface de l’œil ; les orbites peu profondes rendent aussi les blessures aux yeux plus probables.",
    eye_problems_dry_eye_entropion_lens_luxation: "Des problèmes oculaires s’observent dans la race, comme la sécheresse oculaire, des paupières enroulées vers l’intérieur (entropion) et le déplacement du cristallin (luxation du cristallin) ; des examens des yeux existent.",
    heart_valve_screening: "Des maladies cardiaques peuvent survenir dans la race ; des échographies cardiaques permettent de dépister des problèmes de valves chez les parents avant la reproduction.",
    dental_weight_problems: "Une vaste étude britannique cite les maladies dentaires et le surpoids comme des problèmes particulièrement fréquents dans la race – des problèmes que les propriétaires peuvent aider à prévenir ; des dents trop serrées et des dents de lait qui ne tombent pas s’observent aussi.",
  },
  page: {
    eyebrow: "Registre des animaux",
    // Search terms people use (« chat ragdoll », « caractère »); « caractère » only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name} : ${hasIntro ? "caractère, " : ""}exercice, taille et soins | PetPrep`
        : species === "cat"
          ? `${/\bchat\b/i.test(name) ? name : `${name} (chat)`} : ${hasIntro ? "caractère, " : ""}toilettage, taille et espérance de vie | PetPrep`
          : `${name} (${lc(one)}) : besoins, espérance de vie et soins | PetPrep`,
    metaFacts: (name, facts) => `${name} : ${facts.join(" ; ")}. Sources, santé et conseils d’achat.`,
    metaLabels: { weight: "poids", exercise: "exercice", lifespan: "espérance de vie" },
    metaDescription: (name, one) =>
      `${name} : les besoins sourcés de cette race ${de(lc(one))} – exercice, toilettage, repas, taille, espérance de vie, foyers qui lui conviennent – et la façon dont PetPrep la simule.`,
    suitabilityTitle: "À qui elle convient",
    suitabilityNote: "Les mêmes étiquettes que dans l’application. Chaque étiquette s’appuie sur les sources listées en bas de page.",
    suitabilityNone: "Pas encore d’étiquette d’adéquation sourcée pour cette race.",
    needsTitle: "Ce dont elle a besoin",
    needsIntro: (species) =>
      species === "cat"
        ? "D’après les registres félins, les organisations vétérinaires et les études scientifiques. Lorsque les sources divergent, chacune est indiquée."
        : "D’après les standards de race, les sociétés canines, les associations vétérinaires et les études scientifiques. Lorsque les sources divergent, chacune est indiquée.",
    general: (many) => `Recommandations générales pour les ${lc(many)} (non spécifiques à la race) :`,
    noData: "Pas encore dans nos sources.",
    simTitle: "Comment PetPrep simule la race",
    simBadge: "Règles du jeu, pas un avis vétérinaire",
    simIntro:
      "Dans PetPrep, une vraie semaine correspond à un mois de la vie de l’animal. Voici les règles que le jeu applique à cette race. PetPrep les a choisies à partir des sources de cette page ; ce ne sont pas des consignes de soins pour un vrai animal.",
    simInfoOnly: "Cette race figure dans le registre à titre d’information uniquement ; l’application ne la simule pas encore.",
    simTable: { stage: "Étape de la vie", starts: "Début", meals: "Repas par jour", activity: { steps: "Objectif de pas quotidien", play_sessions: "Jeu par jour" } },
    arrives: (m) => `arrive à ${m} mois`,
    fromMonth: (m, years) => (years ? `${ord(m)} mois (${years})` : `${ord(m)} mois`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `à partir du ${ord(x.from)} mois : ${x.meals}`)).join(" ; "),
    simDecisions: "Chaque chiffre du jeu est une décision de PetPrep, consignée avec ses sources.",
    healthTitle: "Santé",
    healthNote: "À titre d’information uniquement, non vérifié par un vétérinaire. Pour votre propre animal, demandez l’avis de votre vétérinaire.",
    healthNone: "Nos sources ne contiennent pas encore d’informations de santé propres à cette race.",
    checklistTitle: "Avant d’acheter : ce qu’il faut vérifier avec l’éleveur",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Les questions à régler avant de ramener un chaton à la maison. Ces points sont des conseils de vétérinaires, d’associations de protection animale et de fédérations félines ; chacun cite sa source." : "Les questions à régler avant de ramener un chiot à la maison. Ces points sont des conseils de vétérinaires, d’associations de protection animale et de sociétés canines ; chacun cite sa source.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Les lois sur l’âge minimum, l’identification par puce électronique et la vaccination varient selon les pays – vérifiez les règles en vigueur là où vous vivez.",
    checklistGeneralTitle: "Pour toutes les races",
    checklistTestsTitle: "Tests de santé des parents pour cette race",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Tests qu’une fédération féline exige avant la reproduction d’un chat" : "Tests que le Royal Kennel Club recommande au minimum",
      best_practice: "Tests supplémentaires selon les bonnes pratiques",
      other_scheme: "Autres programmes de dépistage pour cette race",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Cette liste provient des règles d’élevage d’une fédération féline étrangère (voir la source) et sert de repère. Demandez à l’éleveur quels tests les parents ont passés."
        : "Ces listes proviennent du Royal Kennel Club britannique et servent de repère ; les sociétés canines nationales peuvent fixer leurs propres règles, plus strictes. Demandez au club de race et à l’éleveur quels tests les parents ont passés.",
    checklistStatus: {
      none_recommended: "Le Royal Kennel Club ne recommande actuellement aucun dépistage de santé avant la reproduction pour cette race. Interrogez tout de même l’éleveur sur la santé des parents.",
      not_found: "Nous n’avons pas encore trouvé de source fiable listant les tests de santé des parents pour cette race. Demandez au club de race et à l’éleveur quels tests les parents ont passés.",
      not_checked: "Nous n’avons pas encore vérifié les tests de santé des parents pour cette race. Demandez au club de race et à l’éleveur quels tests les parents ont passés.",
    },
    sourcesTitle: "Sources",
    sourcesIntro: "Chaque information de cette page cite l’une de ces sources.",
    sourceLabel: (id, publisher) => `Source ${id} : ${publisher}`,
    disclaimer: "PetPrep est une simulation pour les familles. Cette page ne remplace pas l’avis d’un vétérinaire – pour un vrai animal, demandez à un vétérinaire ou au club de race.",
    backTo: (many) => `Tous les ${lc(many)}`,
    compareWith: "Comparer avec d’autres races",
    related: { title: "Races similaires", intro: (many) => `D’autres ${lc(many)} du registre aux besoins similaires – chacun avec des informations sourcées.` },
    updated: "Mis à jour le",
    glanceTitle: "En un coup d’œil",
    glanceNote: "Les informations clés issues des sources en bas de page. Lorsque les sources divergent, chaque valeur est indiquée.",
    portraitAlt: { ai_photo: (name) => `${name} – photo (IA)`, ai_illustration: (name) => `${name} – illustration (IA)` },
    portraitCaption: { ai_photo: "Photo générée par IA", ai_illustration: "Illustration générée par IA" },
    portraitColours: {
      legend: "Couleur de robe",
      alt: { ai_photo: (name, colour) => `${name}, ${colour} – photo (IA)`, ai_illustration: (name, colour) => `${name}, ${colour} – illustration (IA)` },
    },
    share: {
      button: "Partager",
      title: "Partager cette race",
      copy: "Copier",
      copied: "Copié",
      linkLabel: "Lien vers cette page",
      more: "Plus d’options",
      text: (name) => `${name} : besoins, sources et simulation dans PetPrep`,
      emailSubject: (name) => `${name} – registre des animaux PetPrep`,
      on: (network) => `Partager sur ${network}`,
    },
    og: { lead: "Besoins, sources et simulation dans PetPrep", photoLabel: "Photo IA" },
    qa: {
      title: "Questions et réponses",
      intro: "Réponses fondées uniquement sur les informations sourcées de cette page ; chaque réponse cite ses sources.",
      // « cette race » constructions keep breed names free of article and gender (le/la differs per name).
      questions: {
        exercise: (n) => `${n} : de combien d’exercice cette race a-t-elle besoin ?`,
        lifespan: (n) => `${n} : quelle est l’espérance de vie de cette race ?`,
        size: (n) => `${n} : quelle taille et quel poids cette race atteint-elle ?`,
        grooming: (n) => `${n} : quel toilettage cette race demande-t-elle ?`,
        suits: (n) => `${n} : à qui cette race convient-elle ?`,
      },
      leads: {
        exercise: (n) => `Besoin d’exercice de la race ${n}, selon nos sources :`,
        lifespan: (n) => `Espérance de vie de la race ${n}, selon nos sources :`,
        size: (n) => `Taille et poids adulte de la race ${n}, selon nos sources :`,
        grooming: (n) => `Pelage et toilettage de la race ${n}, selon nos sources :`,
        suits: (n) => `Selon nos sources, la race ${n} convient bien à :`,
      },
      considerLead: "À prendre en compte :",
      differ: "Les sources donnent des valeurs différentes ; chacune est donc indiquée.",
      join: " ; ",
    },
  },
  intros: {
    border_collie: {
      text: [
        "Le Border Collie est un chien de troupeau de taille moyenne originaire de Grande-Bretagne, bâti pour l’endurance et le travail intense. Son standard décrit un chien vif, alerte, réceptif et intelligent, ni craintif ni agressif.",
        "Sociétés canines et vétérinaires s’accordent avant tout sur un point : c’est une race extrêmement énergique. Il lui faut plus de deux heures d’exercice chaque jour et beaucoup de stimulation mentale. S’il s’ennuie ou manque d’exercice, il s’invente ses propres tâches – mâchonner tout ce qui est à sa portée ou tenter de rassembler les enfants qui jouent.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador",
      text: [
        "Le Labrador Retriever est un grand chien rapporteur robuste, originaire de Grande-Bretagne et sélectionné pour rapporter le gibier. Son standard décrit un compagnon d’un bon tempérament, gentil et adaptable, désireux de faire plaisir et passionné d’eau. Son poil est court et dense, noir, jaune ou foie/chocolat.",
        "Les associations britanniques présentent le Labrador comme un chien de famille qui s’attache à tout le foyer lorsqu’il est bien socialisé. Il est très actif et très motivé par la nourriture : les friandises aident à l’éducation, mais les Labradors ont aussi tendance à prendre du poids.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden",
      text: [
        "Le Golden Retriever est un grand chien de rapport originaire de Grande-Bretagne, au poil plat ou ondulé dans des nuances d’or ou de crème. Son standard décrit un chien docile et intelligent, gentil, amical et sûr de lui.",
        "Les associations britanniques le qualifient d’excellent chien de famille pour un foyer actif, et estiment qu’il peut être un bon premier chien. Les sources sont claires sur les contreparties : au moins deux heures d’exercice par jour, un brossage plusieurs fois par semaine et un pelage qui perd beaucoup de poils.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Bouledogue, Frenchie",
      text: [
        "Le bouledogue français est un petit chien de compagnie robuste originaire de France, au poil court et lisse et aux « oreilles de chauve-souris » dressées. Son standard décrit un chien sociable, vif et joueur ; les associations britanniques le disent décontracté et adaptable, et indiquent qu’il s’entend généralement bien avec les enfants, ce qui en a fait un animal de famille très apprécié.",
        "Il demande jusqu’à une heure d’exercice par jour et convient à un appartement. Le point que soulèvent toutes les sources est la face plate : elle peut gêner la respiration, et les bouledogues français surchauffent vite, surtout par temps chaud – l’ombre, l’eau et des promenades calmes sont donc essentielles. La PDSA suggère aussi aux familles d’envisager l’adoption d’un bouledogue français adulte.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Berger d’Alsace, GSD",
      text: [
        "Le berger allemand est un grand chien de troupeau puissant originaire d’Allemagne, aux oreilles dressées et au double pelage dense, court ou long. Son standard décrit un chien bien équilibré, sûr de lui, aux nerfs solides, et le Royal Kennel Club le présente comme un chien de travail et d’assistance polyvalent, réputé pour son courage et son intelligence.",
        "Il a besoin d’au moins deux heures d’exercice par jour, convient à une grande maison avec jardin et perd beaucoup de poils. Selon les associations britanniques, certains peuvent être d’excellents chiens de famille, mais doivent toujours être surveillés en présence de jeunes enfants. Le Royal Kennel Club demande aux éleveurs de faire contrôler les hanches et les coudes des parents et signale la forme des membres postérieurs comme un point de vigilance dans la race.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "Le Cavalier King Charles Spaniel est un petit épagneul d’agrément originaire de Grande-Bretagne, aux longues oreilles frangées et au long poil soyeux de quatre couleurs : blenheim, rubis, noir et feu, et tricolore. Son standard décrit un chien actif et gracieux à l’expression douce – sportif, affectueux, amical et intrépide.",
        "Il a besoin d’environ une heure d’exercice par jour, peut vivre en appartement et est réputé pour sa gentillesse avec les enfants, même si le jeu doit être surveillé, et il n’aime pas rester seul. Son pelage doit être brossé plus d’une fois par semaine. Les sources britanniques citent comme principaux problèmes de santé la maladie des valves cardiaques et une affection douloureuse de la moelle épinière liée à la forme du crâne ; il est donc demandé aux éleveurs de faire passer à leurs chiens un contrôle cardiaque et une IRM.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Le Beagle est un petit chien courant originaire de Grande-Bretagne, sélectionné pour chasser le lièvre en suivant sa piste. Son standard décrit un chien robuste, compact et joyeux – hardi, actif et alerte, aimable, sans agressivité ni timidité – au poil court et dense dans les couleurs des chiens courants, comme tricolore, feu et blanc ou citron et blanc, avec toujours le bout de la queue blanc.",
        "Il demande jusqu’à environ une heure d’exercice par jour et s’adapte bien à la vie de famille s’il est socialisé dès son plus jeune âge, mais il doit être surveillé avec les enfants et ne pas rester seul, sinon il risque d’aboyer et de mâchonner. Son poil court se brosse une fois par semaine, mais il perd ses poils. L’éducation doit commencer tôt et reposer sur la récompense. Les vétérinaires britanniques voient le plus souvent des Beagles pour une prise de poids et des maladies dentaires : il faut donc surveiller les portions et les dents.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Grand caniche, Standard Poodle",
      text: [
        "Le caniche royal (grand caniche) est la plus grande des quatre tailles de caniche, une race de compagnie originaire de France qui descend des chiens de chasse au canard européens. Son standard décrit un chien élégant et bien équilibré au port fier – fidèle, enjoué et d’un bon caractère, capable d’apprendre et d’être éduqué – au poil abondant, frisé et laineux d’une seule couleur unie : noir, blanc, marron, gris ou fauve.",
        "Il demande jusqu’à environ une heure d’exercice par jour et convient à une grande maison avec un grand jardin. Bien socialisé dès son plus jeune âge, il s’entend généralement bien avec les enfants et les autres animaux. Il ne perd pas ses poils, ce qui ne le rend pas pour autant hypoallergénique : son pelage demande un toilettage quotidien et une tonte régulière par un toiletteur professionnel. Il est réputé très obéissant et réceptif à l’éducation.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Dachshund, chien saucisse",
      text: [
        "Le teckel est un chasseur de blaireau et de lapin originaire d’Allemagne, où il porte aussi le nom de Dackel ; il existe en plusieurs tailles et avec trois types de poil, et cette page porte sur la taille standard à poil ras. Son standard décrit un chien modérément long par rapport à sa hauteur, sans exagération – fidèle, polyvalent et d’un bon caractère, intelligent, vif et courageux – au poil dense, court et lisse, rouge, ou noir ou chocolat avec des marques feu.",
        "Il demande jusqu’à environ une heure d’exercice par jour, répartie en deux promenades avec le temps de flairer, et convient à une petite maison. Il aime les gens et s’entend généralement bien avec les enfants de tout âge, toujours sous surveillance, mais, en raison de son fort instinct de prédation, il est déconseillé avec de plus petits animaux, et il supporte mal la solitude. En raison de son long dos et de ses pattes courtes, il est sujet aux hernies discales et ne devrait pas sauter ; il est demandé aux éleveurs de faire dépister la colonne vertébrale avant la reproduction.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie",
      text: [
        "Le berger australien est, malgré son nom, une race américaine – un chien de travail intelligent doté de forts instincts de troupeau et de garde. Son standard décrit un chien bien équilibré de taille moyenne, un peu plus long que haut, d’un bon naturel et parfois réservé lors des premières rencontres, au poil mi-long, droit à ondulé, bleu merle, noir, rouge merle ou rouge, avec ou sans marques blanches et feu.",
        "Il a besoin de plus de deux heures d’exercice par jour et de défis mentaux comme des jeux de réflexion et l’éducation, et convient à une grande maison avec un grand jardin à la campagne. Dans le bon foyer, il peut être un excellent chien de famille, mais son fort instinct de troupeau peut le pousser à rassembler les enfants ; il est donc déconseillé aux familles avec de jeunes enfants. Il n’aime pas rester seul, et son pelage doit être brossé quelques fois par semaine.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Bichon havanais, Havanese",
      text: [
        "Le bichon havanais est un petit membre de la famille des bichons et le chien national de Cuba. Son standard décrit un petit chien robuste, bas sur pattes, au poil très long, doux, plat ou ondulé, jamais coupé, et à la queue portée haut sur le dos. Il existe en fauve, noir, havane, tabac, brun rougeâtre et, plus rarement, blanc, avec ou sans taches et marques feu.",
        "Son standard le dit affectueux, joueur, voire un peu clown, et indique qu’il adore les enfants et joue sans fin avec eux ; les sources britanniques le décrivent comme un excellent animal de famille s’il est bien socialisé, et facile à éduquer. Il a besoin d’environ 30 minutes d’exercice par jour, peut vivre en appartement et ne perd pas ses poils – mais son long pelage doit être entretenu chaque jour pour éviter les nœuds.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "Le West Highland White Terrier, ou Westie, est un petit terrier originaire de Grande-Bretagne. Son standard décrit un petit chien solidement bâti, à la poitrine profonde et au dos droit, avec un double pelage dur d’environ 5 cm, de petites oreilles pointues dressées et des yeux foncés sous d’épais sourcils. Le blanc est la seule couleur admise par le standard.",
        "Son standard le dit alerte, gai, courageux et sûr de lui, mais amical. Les sources britanniques le présentent comme un animal de famille affectueux et joueur, adapté aux enfants de tout âge, avec un jeu toujours surveillé ; il a besoin d’environ une heure d’exercice par jour, peut vivre en appartement, perd ses poils et doit être brossé quelques fois par semaine. En raison de son instinct de prédation, il ne devrait pas vivre avec de plus petits animaux, et il n’aime pas rester seul. La peau est un point de vigilance connu : le Royal Kennel Club demande aux juges de rechercher des signes d’inflammation cutanée dans la race.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Bernois, Berner Sennenhund",
      text: [
        "Le bouvier bernois est un grand chien de ferme suisse, utilisé à l’origine comme chien de garde, de trait et de bouvier dans le canton de Berne. Son standard décrit un chien de travail à poil long, fort et agile, aux membres robustes, au poil long, brillant, droit ou légèrement ondulé. La seule couleur admise par le standard est le tricolore : noir de jais avec un feu intense sur les joues, au-dessus des yeux, sur les pattes et la poitrine, et des marques blanches sur la tête et la poitrine.",
        "Son standard le dit sûr de lui, d’un bon naturel et amical, « un chien de famille gentil et dévoué », lent à atteindre la maturité. Selon les sources britanniques, il demande jusqu’à une heure d’exercice par jour, a sa place dans une grande maison avec un grand jardin, perd beaucoup de poils et doit être brossé plus d’une fois par semaine ; il ne devrait pas rester seul longtemps. Il vit généralement moins de dix ans, et les sources britanniques citent la dysplasie de la hanche et du coude, la dilatation-torsion de l’estomac et certains cancers parmi ses problèmes de santé.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky",
      text: [
        "Le husky sibérien est un chien de traîneau de taille moyenne, reconnu par la FCI comme une race américaine et décrit par le Royal Kennel Club comme le plus léger et le plus rapide des chiens de traîneau. Son standard demande un chien rapide et léger dans ses mouvements, au double pelage mi-long, aux oreilles épaisses et dressées, aux yeux marron ou bleus (un œil de chaque couleur est admis) et à la queue en panache bien fournie. Les couleurs vont du noir au blanc pur ; le merle et le bringé ne sont pas admis.",
        "Son standard le dit amical et doux, alerte et sociable. Selon les sources britanniques, il a besoin de plus de deux heures d’exercice par jour, d’une grande maison avec un grand jardin et d’une clôture haute et très sûre, car les huskies sont réputés fugueurs ; il perd beaucoup de poils, doit être brossé quelques fois par semaine et supporte mal la solitude. La PDSA le recommande pour des foyers d’adultes ou avec des adolescents plutôt que pour des familles avec de jeunes enfants, et cite la dysplasie de la hanche, des problèmes oculaires et l’épilepsie parmi ses problèmes de santé.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Le Rottweiler est un chien de travail puissant, de taille moyenne à grande, originaire d’Allemagne. Son standard décrit un chien vigoureux, ni lourd ni léger, au poil court, rude et couché, aux oreilles tombantes de taille moyenne et aux yeux en amande brun foncé. La seule couleur admise est le noir avec des marques feu intenses et bien délimitées sur les joues, le museau, la gorge, la poitrine et les pattes ; les marques blanches sont un défaut.",
        "Son standard le dit d’un bon naturel, placide, très dévoué, obéissant et travailleur, et le Royal Kennel Club affirme qu’un Rottweiler bien éduqué est un merveilleux compagnon de famille. Selon les sources britanniques, il a besoin de plus de deux heures d’exercice par jour, d’une grande maison avec un grand jardin et d’un propriétaire expérimenté, en raison de sa grande puissance ; il doit être socialisé dès son plus jeune âge. La PDSA le déconseille aux familles avec de jeunes enfants et des bébés, et il ne doit jamais rester sans surveillance avec d’autres animaux. Un brossage hebdomadaire suffit. Il vit généralement moins de dix ans, et le Royal Kennel Club surveille la forme de ses membres postérieurs.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog anglais, English Bulldog",
      text: [
        "Le bulldog anglais est un chien de taille moyenne à poil ras originaire de Grande-Bretagne : assez trapu, bas, large, puissant et compact, avec une face relativement courte, de petites oreilles fines « en rose » et des yeux ronds très foncés. Son standard admet les couleurs unies comme le rouge, le fauve, le sable et le blanc, ainsi que le bringé et le pie ; le noir et le noir et feu sont très indésirables. Il demande des narines larges et bien ouvertes et précise que les chiens présentant une détresse respiratoire sont très indésirables.",
        "Son standard le dit alerte, hardi, loyal, fiable et courageux, d’apparence féroce mais affectueux, et le Royal Kennel Club indique qu’il reste très apprécié comme compagnon de famille pour son caractère et sa loyauté. Selon les sources britanniques, il demande jusqu’à une heure d’exercice par jour, jamais aux heures chaudes, et s’entend bien avec les autres animaux du foyer s’il est socialisé jeune ; un toilettage hebdomadaire suffit, mais les rides de la face doivent être nettoyées chaque jour. La PDSA le décrit comme une race à face très plate, très susceptible d’avoir de graves problèmes de santé, comme des difficultés respiratoires, et recommande vivement d’envisager une race en meilleure santé, un croisement ou un chien croisé. Il vit généralement moins de dix ans.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Braque allemand, GSP, Deutsch Kurzhaar",
      text: [
        "Le braque allemand à poil court est un chien d’arrêt polyvalent originaire d’Allemagne, bâti pour le travail en plaine et dans l’eau, au poil court et épais, rude au toucher, aux larges oreilles plates attachées haut et aux yeux en amande brun foncé. Son standard américain admet le marron uni, le marron et blanc (moucheté par exemple), le noir uni et le noir et blanc ; les zones rouges, orange, citron ou feu ainsi qu’un chien entièrement blanc sont éliminatoires. Son standard décrit une queue écourtée – PetPrep montre toujours le chien avec sa queue naturelle.",
        "Son standard le dit amical, intelligent et désireux de bien faire. Le Royal Kennel Club et la PDSA indiquent qu’il a besoin de plus de deux heures d’exercice par jour ; la PDSA ajoute que son instinct de chasse, d’arrêt et de rapport peut se réveiller en promenade, qu’il lui faut donc un bon rappel, et qu’il est assez facile à éduquer. Il doit être brossé une à deux fois par semaine et perd modérément ses poils. Une vaste étude britannique situe son espérance de vie médiane à 13,4 ans.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie",
      text: [
        "Le Yorkshire Terrier est un terrier d’agrément originaire de Grande-Bretagne qui pèse au maximum 3,2 kg selon son standard, au poil long, parfaitement raide, brillant et soyeux, qui tombe de façon égale de chaque côté à partir d’une raie le long du dos. Le standard admet une seule couleur : bleu acier foncé de l’arrière de la tête à la queue, avec un feu vif et intense sur la tête, la poitrine et les pattes ; les petites oreilles en V sont portées dressées. Le standard décrit une queue écourtée ou non – PetPrep montre toujours le chien avec sa queue naturelle.",
        "Son standard le dit alerte, intelligent et plein d’entrain, d’un tempérament égal. Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage quotidien ; la PDSA ajoute qu’il aime courir, rapporter et jouer, qu’il peut être assez têtu à éduquer et qu’il convient mieux aux familles avec des enfants plus âgés, car ses os sont très fragiles. Une vaste étude britannique a montré que les maladies dentaires sont le problème le plus fréquent de la race, encourage des soins dentaires quotidiens comme le brossage des dents, et a relevé un âge médian au décès de 13,56 ans.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, chien de cour italien",
      text: [
        "Le Cane Corso est un molosse italien de taille moyenne à grande, un chien robuste et solide non dénué d’élégance, un peu plus long que haut. Son standard décrit un poil court, brillant et très dense, noir, dans des nuances de gris, fauve ou rouge avec un masque foncé, froment foncé ou bringé ; les grandes taches blanches ne sont pas admises. Selon le standard FCI actuel, les oreilles ne sont pas coupées et la queue reste naturelle – et au Royaume-Uni, la coupe des oreilles et de la queue est illégale ; PetPrep montre donc toujours le chien avec ses oreilles et sa queue naturelles.",
        "Son standard en fait un gardien de la propriété, de la famille et du bétail, extrêmement agile et réactif. Selon la PDSA, il est sociable et affectueux avec ses propriétaires, a besoin d’environ deux heures d’exercice par jour et d’occupations, car il déteste s’ennuyer, et convient mieux à des propriétaires expérimentés en raison de sa taille. Elle déconseille la race dans les foyers avec de jeunes enfants, qui pourraient être renversés ; elle convient aux foyers d’adultes ou aux familles avec des enfants plus âgés. Un brossage hebdomadaire suffit, mais il perd ses poils et est réputé baver. La PDSA indique une espérance de vie moyenne inférieure à dix ans.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Welsh Corgi (Pembroke), Corgi",
      text: [
        "Le Welsh Corgi Pembroke est un petit chien de bouvier originaire du pays de Galles, bas, fort et solidement bâti, qui donne une impression de substance et d’endurance dans un petit gabarit. Son standard décrit un poil mi-long et droit avec un sous-poil dense, rouge, zibeline, fauve, ou noir et feu, avec ou sans marques blanches sur les pattes, la poitrine et le cou, et des oreilles dressées. La queue était autrefois habituellement écourtée ; le standard décrit aussi la queue naturelle, et PetPrep montre toujours le chien avec sa queue naturelle.",
        "Son standard le dit hardi, travailleur, sociable et amical. Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage plus d’une fois par semaine ; la PDSA décrit des chiens amicaux, joyeux et joueurs, désireux de faire plaisir et assez faciles à éduquer, mais précise qu’ils peuvent pincer les talons des enfants qui courent ; la socialisation avec les enfants et l’éducation dès le plus jeune âge sont donc utiles. Le Royal Kennel Club indique une espérance de vie de plus de 12 ans et demande aux éleveurs de faire évaluer les hanches des parents.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "Le Dobermann est un chien allemand de compagnie, de protection et de travail de taille moyenne, fort et musclé, aux lignes élégantes et au port fier. Son standard FCI décrit un poil court, dur et dense, bien couché et lisse, noir ou marron avec des marques feu rouille bien délimitées ; les taches blanches ne sont pas admises. Selon le standard FCI, les oreilles et la queue restent naturelles, et PetPrep montre toujours le chien avec ses oreilles et sa queue naturelles.",
        "Son standard le dit amical et calme, et très attaché à sa famille. Le Royal Kennel Club affirme que sa nature loyale et obéissante en fait un excellent chien de famille, et recommande plus de deux heures d’exercice par jour et un toilettage hebdomadaire. La PDSA ajoute qu’il est très énergique, qu’il a besoin de beaucoup d’exercice mental et physique et d’une socialisation précoce, et que – en raison de sa grande taille et de sa forte carrure – il est déconseillé aux familles avec de jeunes enfants et aux propriétaires débutants. Le Royal Kennel Club indique une espérance de vie de plus de 10 ans.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Boxer allemand, Deutscher Boxer",
      text: [
        "Le Boxer est un chien allemand de travail et de compagnie de taille moyenne, de construction carrée, à l’ossature forte et à la musculature bien développée. Ses standards décrivent un poil court, brillant et lisse, fauve ou bringé avec un masque noir ; les marques blanches sont admises mais ne devraient pas couvrir plus d’un tiers de la robe. Le museau doit être large et profond, jamais trop court, avec des narines bien ouvertes. La queue était autrefois habituellement écourtée ; le standard décrit aussi la queue non écourtée, et PetPrep montre toujours le chien avec ses oreilles et sa queue naturelles.",
        "Son standard le dit équilibré, docile, intrépide et sûr de lui. Le Royal Kennel Club le dit très apprécié comme compagnon de famille et recommande plus de deux heures d’exercice par jour et un toilettage hebdomadaire. La PDSA décrit un chien très énergique et joueur qui adore la compagnie humaine et peut développer une anxiété de séparation s’il reste seul, avec un très fort instinct de prédation ; en raison de sa taille et de sa nature exubérante, il est déconseillé aux foyers avec de jeunes enfants et aux propriétaires débutants ; certains Boxers à la face plus courte peuvent avoir de graves problèmes respiratoires. Le Royal Kennel Club indique une espérance de vie de plus de 10 ans.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Schnauzer nain, Zwergschnauzer",
      text: [
        "Le schnauzer nain est un petit chien de compagnie allemand : fort, trapu et presque carré, au poil dur, rêche et dense, avec des sourcils broussailleux et une barbe. Son standard FCI admet le poivre et sel, le noir et argent, le noir pur et le blanc pur ; PetPrep montre les trois premiers. La queue était autrefois habituellement écourtée et les oreilles parfois coupées ; le standard FCI demande une queue naturelle et des oreilles tombantes, et PetPrep montre toujours le chien avec ses oreilles et sa queue naturelles.",
        "La FCI le classe parmi les chiens de garde et de compagnie, et le Royal Kennel Club le dit très apprécié comme compagnon. Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage plus d’une fois par semaine, et indique qu’il ne perd pas ses poils. La PDSA décrit un chien joueur et curieux qui peut bien s’entendre avec les enfants s’il les côtoie tôt, peut se montrer têtu à l’éducation et doit être toiletté deux à trois fois par semaine, avec de temps en temps une tonte ou un épilage par un toiletteur professionnel. Le Royal Kennel Club indique une espérance de vie de plus de 10 ans.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Le Shih Tzu est un petit chien de compagnie originaire du Tibet ; la Grande-Bretagne a la charge de son standard FCI. Les standards décrivent un chien robuste au poil abondant, au port fier et à la face « en chrysanthème » : un long poil de couverture dense, de grands yeux ronds et foncés, de grandes oreilles tombantes et une queue en panache bien fournie portée sur le dos. Les standards admettent de nombreuses couleurs ; PetPrep montre l’or et blanc, le noir et blanc et le foie et blanc, et jamais le merle. Le museau est court et plat, et la PDSA cite des problèmes respiratoires liés à la face plus courte ; PetPrep dessine donc toujours une face modérée aux narines ouvertes.",
        "La FCI le décrit comme intelligent, actif et alerte, amical et indépendant. Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage quotidien, et cite l’appartement comme logement adapté. Selon la PDSA, les Shih Tzus peuvent être des animaux de famille d’un bon naturel s’ils ont été bien socialisés et éduqués ; elle les juge idéaux pour des propriétaires débutants, conseille de toujours les surveiller avec les enfants et recommande un brossage quotidien ainsi qu’une tonte par un toiletteur professionnel toutes les six à huit semaines pour la plupart des chiens de compagnie. Le Royal Kennel Club indique une espérance de vie de plus de 10 ans.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Dogue allemand, Deutsche Dogge",
      text: [
        "Le dogue allemand est un géant originaire d’Allemagne : le standard FCI indique qu’il allie un corps grand, puissant et bien construit à la fierté, la force et l’élégance, avec une tête longue et étroite, des oreilles naturellement tombantes et un poil très court, lisse et brillant. Les standards citent le fauve et le bringé – idéalement avec un masque noir –, ainsi que l’arlequin, le noir et le bleu ; PetPrep ne montre que des couleurs reconnues à la fois par la FCI et par le Royal Kennel Club, jamais le merle ni le manteau, et dessine toujours le chien avec ses oreilles et sa queue naturelles et des paupières bien ajustées, car le Royal Kennel Club demande aux juges de surveiller les paupières enroulées vers l’intérieur ou l’extérieur et les membres postérieurs déficients.",
        "La FCI le dit amical, affectueux et dévoué à ses propriétaires, même s’il peut se montrer réservé envers les inconnus. Le Royal Kennel Club affirme que, malgré sa taille, c’est un merveilleux chien de famille, et recommande plus de deux heures d’exercice par jour, une grande maison avec jardin et un toilettage hebdomadaire. Selon la PDSA, les dogues allemands sont réputés baver, ont un instinct de prédation assez fort et sont déconseillés dans les foyers avec de jeunes enfants en raison de leur taille et de leur force ; elle conseille de laisser un intervalle entre le repas et l’exercice pour aider à prévenir la dilatation-torsion de l’estomac. Le Royal Kennel Club indique une espérance de vie de moins de 10 ans.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Poméranien, Loulou de Poméranie, Zwergspitz",
      text: [
        "Le loulou de Poméranie (spitz nain) est le plus petit des spitz : la FCI le classe comme la variété naine du spitz allemand, avec 21 cm ± 3 cm au garrot, et le standard du Royal Kennel Club décrit un petit chien compact et court, à la tête de renard, aux petites oreilles dressées et à la queue enroulée sur le dos. Son double pelage associe un sous-poil doux et duveteux à un long poil de couverture droit qui forme une collerette autour du cou. Le standard admet de nombreuses couleurs unies, comme l’orange, le crème, le blanc, le noir et le marron, mais jamais le merle ; PetPrep dessine un pelage naturel, non taillé.",
        "La FCI le dit sociable et joyeux, et le standard du Royal Kennel Club le dit extraverti, vif et intelligent. Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et le juge adapté à un appartement ; selon la PDSA, son double pelage doit être brossé deux à trois fois par semaine. L’AKC indique que les Poméraniens conviennent plutôt aux familles avec des enfants plus âgés, qu’ils peuvent bien s’entendre avec les autres animaux s’ils sont socialisés tôt, et recommande vivement une socialisation précoce et des cours pour chiots. Le Royal Kennel Club indique une espérance de vie de plus de 12 ans.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "Le Boston Terrier est originaire des États-Unis. Le standard FCI décrit un chien vif, très intelligent, à poil ras, à tête courte, compact, à queue courte et bien équilibré, bringé, « seal » ou noir, avec des marques blanches régulières : une bande blanche sur le museau, une liste blanche entre les yeux et un avant-poitrail blanc sont exigés, et le bringé est préféré. PetPrep le dessine bringé et blanc, avec un museau modéré, des narines ouvertes et des oreilles et une queue naturelles.",
        "C’est une race à face plate (brachycéphale), et la PDSA avertit qu’il ne doit jamais faire d’exercice aux heures chaudes, car il a tendance à surchauffer. Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage hebdomadaire, le juge adapté à un appartement et indique une espérance de vie de plus de 10 ans. La PDSA présente les Boston Terriers comme des animaux de famille parfaits, particulièrement gentils avec les enfants lorsqu’ils ont été bien socialisés chiots ; selon l’AKC, ils s’entendent bien avec les enfants qui savent être doux avec les animaux, supportent mal de rester seuls longtemps, et l’AKC recommande vivement une socialisation et une éducation précoces.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, berger australien miniature",
      text: [
        "Le berger américain miniature est originaire des États-Unis. Le standard FCI décrit un petit chien de troupeau doté de forts instincts de troupeau et de garde, intelligent et avant tout chien de travail, un peu plus long que haut, au poil mi-long, droit à ondulé, résistant aux intempéries. Ses couleurs sont le noir, le bleu merle, le rouge et le rouge merle, avec ou sans marques blanches et feu, et ses yeux peuvent être marron, bleus, noisette ou ambre. PetPrep le dessine bleu merle avec sa queue naturelle.",
        "Selon PetMD, il a beaucoup d’énergie et a besoin d’au moins une heure d’exercice chaque jour, idéalement deux, ainsi que d’activités qui occupent son esprit, et doit être brossé deux ou trois fois par semaine ; selon l’AKC, un brossage hebdomadaire suffit la plus grande partie de l’année, avec un brossage quotidien pendant la mue. L’AKC indique qu’il peut être un excellent chien de famille avec une éducation à l’obéissance et une socialisation précoce, et qu’il est généralement gentil avec les enfants mais peut tenter de les rassembler ; PetMD ajoute que son attachement à sa famille peut entraîner une anxiété de séparation lorsqu’il reste seul. PetMD indique une espérance de vie de 12 à 13 ans.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Chihuahua à poil court",
      text: [
        "Le Chihuahua est originaire du Mexique. Le standard du Kennel Club décrit un petit chien délicat et compact à l’expression espiègle, d’un tempérament gai, plein d’entrain et intelligent, au crâne bien arrondi « en pomme », au museau assez court et légèrement pointu, aux grands yeux ronds non saillants, aux grandes oreilles et à la queue en faucille ; toutes les couleurs et tous les mélanges de couleurs sont admis, mais jamais le merle, et le poids préféré est de 1,8 à 2,7 kg. Le Royal Kennel Club considère le Chihuahua à poil court et le Chihuahua à poil long comme deux races ; PetPrep dessine la variété à poil court en fauve, avec une tête modérée.",
        "Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage hebdomadaire, le juge adapté à un appartement et indique une espérance de vie de plus de 12 ans. Selon la PDSA, les Chihuahuas sont si petits et légers que les enfants sont tentés de les prendre dans les bras, ce qu’ils n’apprécient guère ; ils conviennent donc mieux aux familles avec des enfants un peu plus âgés. La PDSA ajoute qu’en tant que chiens de compagnie, ils aiment la compagnie et ont besoin d’une présence permanente à la maison, et qu’ils doivent être socialisés dès leur plus jeune âge en découvrant de nombreuses personnes, expériences et lieux différents.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer Spaniel, Springer, ESS",
      text: [
        "L’English Springer Spaniel est originaire de Grande-Bretagne, où il a été sélectionné pour trouver, lever et rapporter le gibier. Le standard du Kennel Club décrit un chien symétrique, compact, fort, joyeux et actif – le plus haut sur pattes des épagneuls terrestres britanniques – au tempérament amical, gai et docile, aux longues oreilles frangées, aux yeux noisette foncé et au poil serré, droit et résistant aux intempéries ; les couleurs sont foie et blanc ou noir et blanc, avec ou sans marques feu, et la hauteur approximative est de 51 cm. PetPrep le dessine foie et blanc, avec sa queue naturelle.",
        "Le Royal Kennel Club recommande plus de 2 heures d’exercice par jour et un toilettage plus d’une fois par semaine, et indique une espérance de vie de plus de 10 ans. Selon la PDSA, les Springers sont de bons chiens de famille qui s’entendent bien avec les enfants et les autres animaux du foyer, obéissants et désireux d’apprendre, et doivent être toilettés une à deux fois par semaine, avec une tonte tous les 3 mois. L’AKC ajoute qu’ils ne devraient pas rester seuls longtemps et que la socialisation précoce et les cours d’éducation pour chiots sont essentiels.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Collie (ancien nom)",
      text: [
        "Le berger des Shetland est originaire de Grande-Bretagne ; c’est un petit chien de travail à poil long. Le standard FCI décrit un chien alerte, doux, intelligent, fort et actif, affectueux et fidèle envers son maître et réservé avec les inconnus, à la tête en forme de long coin émoussé, aux petites oreilles semi-dressées dont la pointe retombe vers l’avant et au double pelage avec un long poil de couverture rude ; les couleurs sont le zibeline, le tricolore, le bleu merle, le noir et blanc et le noir et feu, et la hauteur idéale est de 37 cm pour les mâles et de 35,5 cm pour les femelles. PetPrep le dessine zibeline et blanc.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage quotidien, et indique une espérance de vie de plus de 10 ans. Selon la PDSA, les Shelties sont des chiens très doux, joueurs et obéissants qui s’intègrent souvent bien à la vie de famille et s’entendent volontiers avec les enfants, et l’éducation et la socialisation sont très importantes dès le plus jeune âge. L’AKC ajoute qu’ils ont besoin d’un exercice mental et physique régulier, qu’ils conviendraient mieux à des enfants plus âgés en raison de leur instinct de troupeau, et qu’ils sont réputés très bavards.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Épagneul breton, Brittany",
      text: [
        "L’épagneul breton est un chien d’arrêt originaire de France. Le Royal Kennel Club décrit un chien très énergique et intelligent qui chasse, arrête et rapporte, doux et affectueux mais plein de vie et d’exubérance, au poil dense et assez fin, aux oreilles triangulaires attachées haut et à la queue souvent naturellement courte ; les couleurs du standard sont l’orange, le foie ou le noir avec du blanc, le rouanné ou le tricolore, et la hauteur est de 48 à 51 cm pour les mâles et de 47 à 50 cm pour les femelles. PetPrep le dessine orange et blanc.",
        "Le Royal Kennel Club recommande plus de 2 heures d’exercice par jour et un toilettage plus d’une fois par semaine, et indique une espérance de vie de plus de 10 ans. Selon l’AKC, les épagneuls bretons sont des chiens très énergiques qui ont besoin de beaucoup d’exercice et de stimulation mentale, doux et généralement patients avec les enfants, et un brossage hebdomadaire suffit à garder leur pelage en bon état. PetMD ajoute que la socialisation précoce des chiots est indispensable, qu’ils supportent mal de rester seuls longtemps et que, sélectionnés pour chasser les oiseaux, ils ont un fort instinct de prédation.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker américain, American Cocker",
      text: [
        "L’American Cocker Spaniel – appelé simplement Cocker Spaniel aux États-Unis – est une race distincte du cocker anglais. Le standard de l’AKC en fait le plus petit membre du Sporting Group (chiens de chasse), aux longues oreilles en lobe bien frangées, au crâne arrondi, au museau large et profond et au poil soyeux, plat ou légèrement ondulé ; il existe en noir, dans toutes les couleurs unies du crème le plus clair au rouge le plus foncé, et en panaché avec du blanc. Le standard demande un tempérament équilibré, sans la moindre trace de timidité.",
        "Le Royal Kennel Club recommande un toilettage quotidien et plus de 2 heures d’exercice par jour, et indique une espérance de vie de plus de 10 ans ; l’AKC et PetMD écrivent qu’il n’a pas besoin de beaucoup d’exercice. PetMD présente ces chiens au caractère doux comme d’excellents chiens de famille, amicaux avec les gens et les autres animaux, et conseille de commencer tôt la socialisation et l’éducation ; selon VCA, ils sont généralement très gentils avec les enfants, ont tendance à prendre du poids et doivent avoir les oreilles contrôlées chaque semaine.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, Berger belge Malinois",
      text: [
        "Le Malinois est la variété à poil court du berger belge, une race de troupeau originaire de Belgique. Le standard FCI décrit un chien aux proportions harmonieuses alliant élégance et puissance, et n’admet qu’une couleur : le fauve charbonné avec un masque noir. Les standards de la FCI et de l’AKC décrivent des oreilles plutôt petites, dressées et triangulaires, un poil court et dur avec un sous-poil dense, et un tempérament alerte, intelligent, curieux et sûr de lui.",
        "Le Royal Kennel Club recommande plus de 2 heures d’exercice par jour et un toilettage plus d’une fois par semaine, et indique une espérance de vie de plus de 10 ans. Selon l’AKC, ce n’est pas un bon choix pour un premier chien ; il convient mieux à des enfants plus âgés et responsables et ne devrait pas rester seul longtemps ; PetMD relève un fort instinct de prédation, une tendance à vouloir rassembler les enfants et un besoin d’éducation quotidienne constante et de socialisation précoce.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "Le Basset Hound est un chien courant bas sur pattes originaire de Grande-Bretagne. Le standard FCI décrit un chien d’une ossature considérable, bien équilibré, placide, jamais agressif ni timide, et affectueux, aux longues oreilles veloutées attachées bas, au poil lisse et court, dans les couleurs noir, blanc et feu ou citron et blanc. Le Breed Watch du Royal Kennel Club demande aux juges d’exposition de surveiller les paupières enroulées vers l’intérieur ou l’extérieur, les oreilles très longues, les plis de peau irrités et l’excès de peau.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage hebdomadaire, et indique une espérance de vie de plus de 10 ans. La PDSA décrit un chien tolérant qui s’entend très bien avec les enfants et adore la compagnie, avec un solide appétit qu’il faut surveiller ; elle conseille de vérifier les plis de la peau chaque jour et de laisser un intervalle entre le repas et l’exercice. L’AKC ajoute que son flair peut l’entraîner au loin : une laisse solide et des espaces clôturés sont donc importants.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Magyar Vizsla, braque hongrois",
      text: [
        "Le braque hongrois à poil court (Vizsla) est un chien d’arrêt élégant de taille moyenne originaire de Hongrie, au poil court couleur or roux. Le standard FCI décrit un chien vif, amical, d’un tempérament égal, facile à éduquer et qui garde un contact étroit avec son conducteur ; ses couleurs sont les nuances d’or roux et d’or sable foncé. Le Breed Watch du Royal Kennel Club ne signale aucun point de vigilance propre à la race.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un toilettage hebdomadaire, et indique une espérance de vie de plus de 12 ans. La PDSA décrit un chien très tourné vers les humains, qui adore la compagnie et peut souffrir d’anxiété de séparation s’il reste seul ; il s’entend bien avec les enfants plus âgés, mais la PDSA ne le recommanderait pas avec de très jeunes enfants ni pour des propriétaires débutants, et, en raison de son fort instinct de prédation, elle déconseille de le faire vivre avec de plus petits animaux. La PDSA conseille aussi de laisser un intervalle entre le repas et l’exercice.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker anglais, English Cocker, Merry Cocker",
      text: [
        "Le cocker anglais – appelé simplement Cocker Spaniel en Grande-Bretagne – est une race distincte de l’American Cocker Spaniel. Le standard FCI décrit un chien de chasse joyeux, robuste et sportif, bien équilibré et compact, aux oreilles en lobe attachées bas et au poil plat et soyeux ; le standard de l’AKC le dit joyeux et affectueux, d’un tempérament égal, et cite le noir uni, le foie et les nuances de rouge ainsi que les robes panachées avec du blanc. Le Breed Watch du Royal Kennel Club ne signale aucun point de vigilance propre à la race.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage quotidien, et indique une espérance de vie de plus de 10 ans ; une étude VetCompass portant sur des cockers anglais au Royaume-Uni a relevé un âge médian au décès de 11,44 ans. Selon la PDSA, grâce à sa patience, il s’entend généralement bien avec les enfants, toujours sous surveillance, mais il est réputé sujet à l’anxiété de séparation et ne devrait jamais rester seul plus de quatre heures. La PDSA conseille aussi un brossage quotidien et un intervalle entre le repas et l’exercice.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon maltais, Maltese",
      text: [
        "Le bichon maltais est un chien d’agrément originaire de la Méditerranée centrale, aujourd’hui sous patronage italien à la FCI. Le standard FCI décrit un petit chien au corps allongé, vif, affectueux, très calme et très intelligent, pesant de 3 à 4 kg, au poil très long, dense et soyeux qui retombe lourdement sur tout le corps. Le pelage n’a pas de sous-poil, et le blanc pur est la seule couleur admise (une légère nuance ivoire pâle est tolérée). Le Breed Watch du Royal Kennel Club ne signale aucun point de vigilance propre à la race.",
        "Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage quotidien, indique que la race ne perd pas ses poils et donne une espérance de vie de plus de 12 ans. La PDSA décrit un chien éveillé, amical et affectueux, qui peut être réservé avec les inconnus mais, bien socialisé jeune, peut apprendre à être confiant et sociable. PetMD avertit qu’il peut développer une anxiété de séparation s’il reste seul trop longtemps, indique que les interactions avec de jeunes enfants doivent être surveillées et conseille de lui brosser les dents chaque jour.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Carlin, Pug",
      text: [
        "Le carlin est un petit chien de compagnie originaire de Chine, aujourd’hui sous patronage britannique à la FCI. Le standard FCI décrit un chien résolument carré et ramassé – « multum in parvo » – plein de charme, de dignité et d’intelligence, d’un tempérament égal, gai et vif, d’un poids idéal de 6,3 à 8,1 kg, au poil fin, lisse, court et brillant, argent, abricot, fauve ou noir, et à la queue étroitement enroulée sur la hanche. Il demande des narines assez grandes et bien ouvertes et juge inacceptables les narines pincées et un gros pli au-dessus du nez. Le Royal Kennel Club classe la race en catégorie 3 du Breed Watch, avec des points de vigilance qui incluent les difficultés respiratoires, les yeux saillants, la dermatite des plis et l’excès de poids.",
        "La PDSA décrit le carlin comme une race très brachycéphale (à face plate) qui peut facilement s’essouffler, conseille d’éviter l’exercice par forte chaleur et indique que ses vétérinaires recommanderaient vivement plutôt une race au museau normal ou un croisement de carlin. Le Royal Kennel Club recommande jusqu’à 1 heure d’exercice par jour et un toilettage hebdomadaire, indique que la race perd ses poils et donne une espérance de vie de plus de 10 ans. La PDSA décrit un chien qui s’entend souvent bien avec les enfants et les autres animaux, mais qui adore la compagnie et supporte mal la solitude ; PetMD conseille de nettoyer et de sécher chaque jour les plis de la face et note que l’obésité est fréquente dans la race.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Colley, Colley à poil long, Rough Collie",
      text: [
        "Le colley à poil long est un grand chien de berger originaire de Grande-Bretagne. Le standard FCI décrit un chien d’une grande beauté, qui se tient avec une dignité impassible, d’un caractère amical sans aucune trace de nervosité ni d’agressivité, au pelage très dense avec un poil de couverture droit et rude, et de trois couleurs : zibeline, tricolore et bleu merle. Le standard du Royal Kennel Club le présente comme un excellent chien de compagnie, amical, joyeux et actif, gentil avec les enfants et les autres chiens, et fixe sa hauteur à 56 à 61 cm pour les mâles et 51 à 56 cm pour les femelles. Le Royal Kennel Club classe la race en catégorie 2 du Breed Watch et n’enregistre pas les chiots issus d’accouplements merle × merle.",
        "Le Royal Kennel Club recommande jusqu’à 1 heure d’exercice par jour et un toilettage quotidien, indique que la race perd ses poils et donne une espérance de vie de plus de 12 ans. Selon PetMD, les colleys sont affectueux, surtout avec les enfants, et gentils avec les autres animaux, mais supportent mal de rester seuls longtemps et peuvent mordiller les chevilles et les talons lorsqu’ils sont excités. PetMD note aussi que la socialisation du chiot est cruciale et que la mutation MDR1, qui modifie la façon dont l’organisme du chien gère certains médicaments, s’observe chez les colleys.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "Mastiff anglais, Old English Mastiff",
      text: [
        "Le Mastiff est une très grande race de garde originaire de Grande-Bretagne. Le standard FCI décrit un mélange de grandeur et de courage – calme, affectueux envers ses maîtres mais capable de garder – avec une tête d’aspect carré, un corps large, profond et puissant et un poil court et couché, abricot, fauve ou bringé. La PDSA indique une hauteur moyenne de 71 à 78 cm et un poids moyen de 80 à 85 kg, et note que le Kennel Club classe le Mastiff en catégorie 3 : les races présentant des problèmes de conformation visibles qui peuvent causer douleur, inconfort ou problèmes de santé.",
        "La PDSA recommande environ une heure d’exercice par jour pour les adultes – mais pas d’excès tant que les os et les articulations du chiot se développent –, un toilettage hebdomadaire avec un nettoyage quotidien des rides de la face, et indique une espérance de vie moyenne de moins de 10 ans. Selon PetMD, les Mastiffs sont d’excellents chiens de famille pour les foyers avec des enfants qui savent se comporter avec les animaux, mais peut-être pas avec des tout-petits ou des bébés en raison de leur taille ; ils s’entendent généralement bien avec les autres animaux présentés dès leur jeune âge, bavent beaucoup et ne devraient pas faire d’exercice pendant l’heure qui précède et qui suit les repas, en raison du risque de dilatation-torsion de l’estomac.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba, Shiba japonais",
      text: [
        "Le Shiba est un petit spitz originaire du Japon ; son nom signifie « petit chien », et selon le Royal Kennel Club, il a été développé pour chasser le petit gibier à plumes. Le standard FCI décrit un petit chien bien équilibré, à l’ossature solide, d’un tempérament fidèle, aux sens aiguisés et très vigilant, avec un poil de couverture rude sur un sous-poil doux et dense, de petites oreilles triangulaires dressées et une épaisse queue enroulée ; les couleurs sont le rouge, le noir et feu et le sésame, toujours avec des marques blanchâtres « urajiro » sur les joues, la poitrine et le dessous du corps. Le standard de l’AKC indique un poids moyen d’environ 23 livres (10 kg) pour les mâles et 17 livres (8 kg) pour les femelles.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage hebdomadaire, note que la race perd ses poils et indique une espérance de vie de plus de 10 ans ; une vaste étude britannique a relevé une durée de vie médiane de 14,6 ans. L’AKC décrit un chien sûr de lui et indépendant, plus adapté à un propriétaire expérimenté, plus heureux avec des enfants plus âgés et qui ne devrait jamais être lâché hors d’un espace clôturé ou fermé. PetMD ajoute qu’il a besoin de beaucoup de stimulation mentale, qu’une socialisation précoce lui est bénéfique et que ses dents doivent être brossées chaque jour.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, chien de lion africain",
      text: [
        "Le Rhodesian Ridgeback est originaire d’Afrique australe. Son trait le plus connu est la crête sur son dos, une bande de poils qui poussent dans le sens inverse du reste du pelage. Le standard FCI décrit un chien bien équilibré, fort, musclé, agile et actif, digne, intelligent et distant avec les inconnus, particulièrement apprécié comme chien de garde et chien de famille. Le poil court et dense va du froment clair au froment rouge, et le standard indique un poids d’environ 36,5 kg pour les mâles et 32 kg pour les femelles.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un toilettage hebdomadaire, note que la race perd ses poils et convient à une grande maison avec un grand jardin, et indique une espérance de vie de plus de 10 ans. La PDSA décrit des chiens joueurs, puissants et très loyaux, au très fort instinct de prédation, déconseillés aux propriétaires débutants, qui ne devraient jamais rester seuls plus de quatre heures et doivent être socialisés dès leur plus jeune âge ; elle conseille aussi un intervalle entre le repas et l’exercice. Woodgreen ajoute qu’ils s’épanouissent mieux avec des enfants plus âgés.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Épagneul nain continental, Phalène (variété à oreilles tombantes), chien papillon",
      text: [
        "Le Papillon est la variété à oreilles dressées de l’épagneul nain continental, une race originaire de Belgique et de France ; la variété à oreilles tombantes s’appelle le Phalène. Le standard FCI décrit un petit épagneul d’agrément élégant, à poil long et à la personnalité vive, d’environ 28 cm de haut et pesant jusqu’à 4,5 kg pour les mâles et 5 kg pour les femelles. Ses grandes oreilles sont portées comme les ailes déployées d’un papillon, et son pelage est toujours blanc avec des taches de couleur.",
        "Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage plus d’une fois par semaine, note que la race perd ses poils et peut vivre en appartement, et indique une espérance de vie de plus de 12 ans. La PDSA décrit des chiens doux, joueurs et très obéissants qui s’entendent bien avec tout le monde et ont besoin d’éducation et de socialisation dès leur plus jeune âge ; elle suggère un toilettage deux à trois fois par semaine. PetMD ajoute que les Papillons ont besoin d’une stimulation mentale quotidienne, peuvent développer une anxiété de séparation et doivent avoir les dents brossées chaque jour, et que de très jeunes enfants peuvent blesser accidentellement un chien aussi petit.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, chien d’eau de l’Algarve",
      text: [
        "Le chien d’eau portugais est originaire du Portugal, où il travaillait avec les pêcheurs. Le standard du Royal Kennel Club décrit un chien robuste, presque carré, très musclé – très intelligent et d’une énergie formidable, excellent nageur et plongeur – mesurant 50 à 57 cm (mâles) et 43 à 52 cm (femelles) pour un poids de 19 à 25 kg (mâles) et 16 à 22 kg (femelles). Son poil abondant, sans sous-poil, est noir, blanc, marron, ou noir ou marron avec du blanc ; la tonte traditionnelle « en lion » laisse le museau et l’arrière-train courts.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage quotidien, note que la race ne perd pas ses poils et convient à une grande maison, et indique une espérance de vie de plus de 10 ans. La PDSA décrit des chiens très amicaux et affectueux qui s’entendent bien avec les autres animaux, sont d’excellents animaux de famille et ont besoin d’éducation et de socialisation dès leur plus jeune âge ; elle ajoute une tonte et une mise en forme par un toiletteur professionnel au cours de l’année.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frisé, Bichon de Ténériffe",
      text: [
        "Le bichon à poil frisé est un chien de compagnie franco-belge. Le standard FCI décrit un petit chien gai à l’allure vive, au poil blanc très lâche en tire-bouchons – un vrai compagnon que l’on peut emmener partout, ni craintif ni aboyeur – mesurant 25 à 29 cm au garrot et pesant environ 5 kg. L’adulte est toujours d’un blanc pur, avec des yeux ronds très foncés, une truffe noire, des oreilles tombantes et une queue en panache portée sur le dos.",
        "Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage quotidien, note que la race ne perd pas ses poils et convient à un appartement, et indique une espérance de vie de plus de 12 ans. La PDSA décrit des chiens très affectueux et tendres, excellents avec les enfants et les autres animaux, et ajoute que le pelage doit être taillé tous les deux mois environ, souvent par un toiletteur professionnel.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Terre-neuve, Newfie",
      text: [
        "Le terre-neuve est originaire du Canada ; la FCI le classe parmi les molossoïdes de type montagne et reconnaît trois couleurs : noir, blanc et noir (Landseer) et marron. La PDSA qualifie les terre-neuve de gentils géants et indique une hauteur moyenne de 66 à 71 cm et un poids moyen de 50 à 69 kg ; PetMD ajoute que l’histoire de la race en fait des nageurs nés.",
        "La PDSA recommande au moins une heure d’exercice par jour pour les adultes, mais pas d’excès pour les chiots tant que leurs os et leurs articulations se développent ; elle décrit le toilettage comme une tâche quotidienne, note que les terre-neuve ont tendance à baver et indique une espérance de vie de moins de 10 ans. PetMD présente la race comme un animal de famille exceptionnel qui s’entend bien avec les enfants, les petits animaux et les autres chiens, conseille de surveiller les jeunes enfants avec tout chien et avertit que certains peuvent développer une anxiété de séparation lorsqu’ils restent seuls.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Dalmatien, chien de carrosse, chien des pompiers",
      text: [
        "Le dalmatien est originaire de Croatie ; la FCI le classe parmi les races apparentées aux chiens courants. Son poil court et brillant est d’un blanc pur avec des taches noires ou foie (marron) bien délimitées, et le standard demande des oreilles tachetées. La FCI indique une hauteur de 56 à 62 cm pour les mâles et de 54 à 60 cm pour les femelles ; la PDSA indique un poids moyen de 18 à 27 kg.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un brossage hebdomadaire, et indique que la race perd ses poils et convient à une grande maison avec jardin. Selon la PDSA, les dalmatiens sont d’excellents animaux pour les foyers actifs, conviennent mieux aux enfants plus âgés, ont besoin de compagnie et ne devraient jamais rester seuls plus de quatre heures ; elle cite la surdité parmi les problèmes de santé de la race et note qu’un test auditif BAER existe.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Bouvier australien, Blue Heeler, Red Heeler, Queensland Heeler",
      text: [
        "Le bouvier australien est originaire d’Australie ; la FCI le classe parmi les chiens de bouvier. Le standard du Kennel Club décrit un chien de travail fort et compact, au double pelage lisse et résistant aux intempéries, bleu (marbré ou moucheté) ou moucheté rouge uniforme, et indique une hauteur de 46 à 51 cm pour les mâles et de 43 à 48 cm pour les femelles ; la PDSA indique un poids moyen de 16 à 20 kg.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un brossage hebdomadaire, et indique que la race perd ses poils. La PDSA décrit un chien très intelligent et très énergique qui a besoin de beaucoup d’activité physique et mentale ; en raison de son fort instinct de troupeau, il peut pincer les talons des enfants qui courent, et la socialisation et l’éducation dès le plus jeune âge sont utiles.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Le Whippet est originaire de Grande-Bretagne ; la FCI le classe parmi les lévriers à poil court. Le standard du Kennel Club décrit une combinaison équilibrée de puissance musculaire et de force, alliée à l’élégance et à la grâce de la silhouette, un poil fin, court et serré de toutes les couleurs ou mélanges de couleurs sauf le merle, et un tempérament doux, affectueux et égal ; il indique une hauteur de 47 à 51 cm pour les mâles et de 44 à 47 cm pour les femelles, et la PDSA indique un poids moyen de 11 à 18 kg.",
        "La PDSA recommande au moins une heure d’exercice chaque jour, avec la possibilité de courir sans laisse dans un espace sûr, et un brossage hebdomadaire avec une brosse douce. Elle présente les Whippets comme un choix apprécié des familles, car ils sont calmes et doux avec les enfants, mais recommande un foyer avec des enfants un peu plus âgés ; les Whippets n’aiment pas rester seuls et ont un très fort instinct de prédation : la PDSA déconseille donc de les faire vivre avec de plus petits animaux. Un manteau peut être utile en hiver, et une literie épaisse et douce protège leurs os saillants.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Griffon Korthals, griffon d’arrêt à poil dur Korthals, Griff",
      text: [
        "Le griffon d’arrêt à poil dur Korthals est originaire de France ; la FCI le classe parmi les chiens d’arrêt continentaux et le décrit comme un chien d’arrêt avant tout polyvalent. Le standard FCI décrit un chien vigoureux et rustique, plus long que haut, au poil dur et rêche, jamais frisé ni laineux, à la truffe toujours marron, et de préférence gris acier avec des taches marron (foie) ; il indique une hauteur d’environ 55 à 60 cm pour les mâles et 50 à 55 cm pour les femelles et décrit la race comme douce, fière et très douce avec les enfants. PetMD indique un poids de 35 à 70 livres (environ 16 à 32 kg).",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, une grande maison avec un grand jardin et un toilettage plus d’une fois par semaine. PetMD conseille un brossage hebdomadaire (certains chiens doivent aussi être épilés à la main), indique que les Korthals sont généralement patients et doux avec les enfants lorsqu’ils ont été socialisés chiots, et note que leur passé de chasseurs peut leur donner un fort instinct de prédation : de plus petits animaux comme les chats et les lapins peuvent leur sembler bons à poursuivre.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Retriever de la baie de Chesapeake",
      text: [
        "Le Chesapeake Bay Retriever, souvent appelé Chessie, est originaire des États-Unis ; la FCI le classe parmi les chiens rapporteurs. Le standard FCI décrit un retriever de travail aussi efficace sur terre que dans l’eau, dont la taille et la masse ne doivent pas être excessives, au poil épais et court sur un sous-poil dense et laineux, aux yeux clairs jaunâtres ou ambrés ; toutes les nuances de marron, de « sedge » (roux) ou de « deadgrass » (herbe sèche) sont admises, et une robe noire est éliminatoire. Il indique une hauteur de 58 à 66 cm et un poids de 29,5 à 36,5 kg pour les mâles, et de 53 à 61 cm et 25 à 32 kg pour les femelles.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, une grande maison avec un grand jardin et un toilettage hebdomadaire. PetMD décrit un chien éveillé, joyeux et extrêmement affectueux, qui peut devenir destructeur s’il manque de stimulation ou reste seul trop longtemps, indique que, bien présentés et socialisés, les Chessies sont un excellent ajout à une famille, et conseille de ne pas faire faire d’exercice au chien juste avant ou juste après le repas.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Samoyède, Sammy",
      text: [
        "Le samoyède est originaire du nord de la Russie et de la Sibérie ; la FCI le classe parmi les chiens nordiques de traîneau. Le standard FCI décrit un spitz arctique blanc et élégant de taille moyenne, à l’épais pelage polaire abondant et dense, aux yeux brun foncé, aux petites oreilles épaisses et dressées et aux lèvres légèrement relevées aux commissures dans le caractéristique « sourire du samoyède » ; le pelage est blanc pur, crème ou blanc et biscuit, et des yeux bleus ou vairons sont éliminatoires. Il indique une hauteur idéale de 57 cm pour les mâles et de 53 cm pour les femelles, avec une tolérance de 3 cm.",
        "La PDSA recommande au minimum deux heures d’exercice chaque jour et un toilettage quotidien ; elle indique que les samoyèdes perdent très souvent leurs poils, sont généralement excellents avec les enfants et fidèles à toute la famille, ne devraient jamais rester seuls plus de quatre heures, ont besoin d’un jardin très sûr car ce sont des as de l’évasion, et ont un fort instinct de prédation ; elle conseille de laisser un intervalle entre le repas et l’exercice. PetMD ajoute que les samoyèdes supportent mal les fortes chaleurs.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, terrier d’Aberdeen",
      text: [
        "Le Scottish Terrier, souvent appelé Scottie, est originaire de Grande-Bretagne ; la FCI le classe parmi les terriers de petite taille. Le standard du Kennel Club décrit un chien trapu, bas sur pattes, au port alerte, qui évoque une grande puissance et une grande activité dans un petit gabarit, loyal et fidèle, digne, indépendant et réservé, mais courageux et très intelligent – hardi, mais jamais agressif. Son double pelage serré a un poil de couverture dur et rêche ; la couleur est noire, froment ou bringée de toute nuance. Il indique une hauteur de 25 à 28 cm et un poids de 8,5 à 10,5 kg.",
        "Selon la PDSA, les Scotties ont besoin d’environ une heure d’exercice par jour et d’un toilettage quotidien, avec un épilage et une tonte par un toiletteur professionnel tous les deux à trois mois ; elle les décrit comme loyaux et dévoués à leur famille, mais parfois têtus, si bien que l’éducation demande patience et engagement. Selon PetMD, avec une bonne éducation et une bonne socialisation, ils peuvent être de bons chiens de famille ; la socialisation du chiot est importante, et ils ne devraient pas rester seuls de longues périodes.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Braque de Weimar, Weim",
      text: [
        "Le braque de Weimar est originaire d’Allemagne ; la FCI le classe parmi les chiens d’arrêt continentaux et reconnaît une variété à poil court et une variété à poil long. Le standard FCI décrit un chien de chasse de taille moyenne à grande, de type fonctionnel, sec et très musclé, aux yeux ambre et aux oreilles larges et assez longues ; la robe est gris argent, gris chevreuil ou gris souris, seules de petites marques blanches sur la poitrine et les doigts sont admises, et toute couleur autre que le gris est éliminatoire. Il indique une hauteur de 59 à 70 cm et un poids d’environ 30 à 40 kg pour les mâles, et de 57 à 65 cm et environ 25 à 35 kg pour les femelles.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, une grande maison avec un grand jardin et un toilettage hebdomadaire. Selon la PDSA, les braques de Weimar sont de merveilleux animaux de famille entre de bonnes mains et s’épanouissent mieux avec des propriétaires qui connaissent la race ; elle les déconseille dans les foyers avec de jeunes enfants ou de plus petits animaux en raison de leur très fort instinct de prédation, indique qu’ils peuvent développer une anxiété de séparation s’ils restent seuls, et conseille de les socialiser dès leur plus jeune âge et de laisser un intervalle entre le repas et l’exercice. PetMD ajoute un nettoyage des oreilles et un bain mensuels.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Petit lévrier italien, Piccolo Levriero Italiano, Iggy",
      text: [
        "Le petit lévrier italien est originaire d’Italie ; la FCI le classe, sous le nom de Piccolo Levriero Italiano, parmi les lévriers à poil court. Le standard du Kennel Club décrit un greyhound en miniature, plus fin dans toutes ses proportions, élégant, gracieux et rapide, intelligent, affectueux et vif même s’il peut paraître distant, au poil court, fin et brillant sur une peau fine. Il indique une hauteur de 32 à 38 cm et un poids de 3,6 à 4,5 kg ; le noir, le bleu, le crème, le fauve, le rouge et le blanc, ou l’une de ces couleurs panachée de blanc, sont admis – jamais le merle, le bringé ni les marques feu.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour, indique que la race convient à une petite maison, en ville comme à la campagne, demande un toilettage hebdomadaire et ne perd pas ses poils. Selon la PDSA, les petits lévriers italiens débordent d’énergie, doivent faire de l’exercice dans un espace clos car ils peuvent être difficiles à rappeler une fois qu’ils ont repéré une proie, peuvent être timides – la socialisation précoce est donc essentielle – et, comme leurs os sont fragiles pendant la croissance, ne sont peut-être pas la race idéale pour les foyers avec de jeunes enfants ou d’autres animaux. PetMD ajoute que leur poil fin ne les tient pas au chaud : ils sont donc frileux.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Schnauzer géant, Riesenschnauzer",
      text: [
        "Le schnauzer géant est originaire d’Allemagne ; la FCI le classe, sous le nom de Riesenschnauzer, parmi les chiens de type pinscher et schnauzer. Le standard du Royal Kennel Club décrit un chien puissamment bâti, robuste et sec, d’aspect presque carré, hardi, fiable, d’un bon naturel et posé, avec un poil de couverture dur et rêche et un bon sous-poil. Il indique une hauteur de 65 à 70 cm pour les mâles et de 60 à 65 cm pour les femelles ; le standard FCI indique un poids de 35 à 47 kg. Le noir pur, le poivre et sel avec un masque foncé et le noir et argent sont admis – aucune autre couleur ne l’est.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, indique que la race convient à une grande maison avec un grand jardin, demande un toilettage quotidien et ne perd pas ses poils. Selon la PDSA, le pelage demande un toilettage quotidien et une taille régulière, les schnauzers géants peuvent être des animaux attachants pour les familles avec des enfants plus âgés s’ils ont été bien socialisés chiots, et ces chiens au caractère affirmé conviennent à des propriétaires expérimentés. PetMD ajoute que le pelage est épilé à la main par un professionnel à quelques mois d’intervalle et que la race supporte mal les foyers où l’on est rarement à la maison.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Chien de Saint-Hubert, Bloodhound, Sleuth Hound",
      text: [
        "Le chien de Saint-Hubert est originaire de Belgique, où la FCI le classe comme un grand chien courant. Le standard FCI décrit le plus puissant de tous les chiens courants : doux, placide, gentil et sociable avec les gens et particulièrement attaché à son maître, au poil court, dense et résistant aux intempéries et à la peau souple et lâche. Les mâles pèsent environ 46 à 54 kg et les femelles environ 40 à 48 kg ; les trois couleurs sont le noir et feu, le foie et feu et le rouge.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, indique que la race convient à une grande maison avec un grand jardin, demande un toilettage hebdomadaire et perd ses poils. Selon la PDSA, les chiens de Saint-Hubert conviennent mieux à des propriétaires expérimentés, sont déconseillés dans les foyers avec de jeunes enfants ou de plus petits animaux en raison de leur taille et de leur très fort instinct de prédation, bavent et ont besoin que leurs plis de peau restent propres et secs. Elle conseille aussi de laisser un intervalle entre le repas et l’exercice.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita américain, grand chien japonais",
      text: [
        "L’Akita de ce registre est le type américain : la FCI le classe comme Akita américain, une race d’origine japonaise distincte de l’Akita Inu japonais. Le standard FCI décrit un grand chien solidement bâti, bien équilibré, d’une grande substance et d’une forte ossature, aux petites oreilles dressées et à la grosse queue portée sur le dos ; les mâles mesurent 66 à 71 cm au garrot. Toutes les couleurs sont admises, comme le rouge, le fauve, le blanc, le pinto ou le bringé. La PDSA indique un poids moyen de 31 à 59 kg.",
        "La PDSA décrit des animaux de famille incroyablement loyaux, indépendants et très grands, qui s’épanouissent donc mieux avec des propriétaires expérimentés ; elle ne recommanderait pas un Akita dans un foyer avec de jeunes enfants et déconseille de le laisser seul, car beaucoup le supportent mal. Elle recommande au moins deux heures d’exercice chaque jour, une socialisation dès le plus jeune âge, un intervalle entre le repas et l’exercice et au moins un brossage hebdomadaire – les Akitas perdent beaucoup de poils. Elle note aussi un fort instinct de prédation et un risque de surchauffe par très forte chaleur.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Welsh Corgi (Cardigan), Cardi",
      text: [
        "Le Welsh Corgi Cardigan est originaire de Grande-Bretagne ; la FCI le classe parmi les chiens de bouvier. Le standard de l’American Kennel Club indique une hauteur de 10,5 à 12,5 pouces (environ 27 à 32 cm) au garrot et un poids idéal de 30 à 38 livres (environ 14 à 17 kg) pour les mâles. Contrairement à son cousin le Pembroke, il a une queue longue et bien fournie.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour, juge suffisante une petite maison avec un jardin petit ou moyen, et indique que la race demande un toilettage plus d’une fois par semaine et perd ses poils ; il indique une espérance de vie de plus de 12 ans et classe le Cardigan parmi les races britanniques vulnérables. Selon la PDSA, les Welsh Corgis sont désireux de faire plaisir, si bien que l’éducation devrait être assez facile ; deux à trois brossages par semaine suffisent généralement, et ils peuvent pincer les talons des enfants qui courent – la socialisation avec les enfants et l’éducation dès le plus jeune âge sont utiles.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Braque allemand à poil dur, Deutsch Drahthaar, GWP",
      text: [
        "Le braque allemand à poil dur est originaire d’Allemagne ; la FCI le classe, sous le nom de Deutsch Drahthaar, parmi les chiens d’arrêt continentaux. Le standard du Royal Kennel Club décrit un chien de chasse de taille moyenne au poil dur couvrant entièrement la peau – doux, affectueux et d’un tempérament égal, alerte, docile et très loyal. Les mâles mesurent 60 à 67 cm et pèsent 25 à 34 kg ; les femelles mesurent 56 à 62 cm et pèsent 20,5 à 29 kg. Le foie et blanc, le foie uni et le noir et blanc sont les couleurs du standard.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour, indique qu’il convient à une grande maison avec un grand jardin à la campagne, demande un toilettage plus d’une fois par semaine et perd ses poils. Selon PetMD, les Drahthaars ont besoin de beaucoup d’exercice et de stimulation mentale, nouent un lien étroit avec leur famille et peuvent être d’excellents chiens de famille lorsqu’ils sont éduqués et socialisés tôt, s’entendent bien avec les enfants à qui l’on a appris à se comporter avec les animaux, ne devraient jamais rester seuls longtemps et ont un fort instinct de prédation. Le pelage est épilé à la main deux fois par an.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "Saint-bernard, Bernhardiner, St. Bernhardshund",
      text: [
        "Le saint-bernard est originaire de Suisse ; la FCI le classe parmi les molossoïdes de type montagne. Le standard FCI décrit un chien d’un naturel amical, calme à vif et vigilant, et reconnaît deux variétés : à poil court, avec un poil dense, lisse et couché, et à poil long. Les mâles mesurent au moins 70 cm et les femelles au moins 65 cm, jusqu’à 90 et 80 cm ; la PDSA indique un poids de 54 à 81 kg.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour, indique que la race convient à une grande maison avec un grand jardin, demande un toilettage plus d’une fois par semaine, perd ses poils et vit généralement moins de dix ans. Selon la PDSA, les saint-bernard adorent vivre en famille et sont excellents avec les gens de tout âge, y compris les enfants ; ils doivent être bien socialisés chiots, brossés au moins trois fois par semaine, bavent, supportent moins bien la chaleur et ont besoin d’un intervalle entre le repas et l’exercice. PetMD ajoute que ces chiens très tournés vers les humains peuvent développer une anxiété de séparation s’ils restent seuls longtemps.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "Le Staffordshire Bull Terrier est originaire de Grande-Bretagne ; la FCI le classe parmi les terriers de type bull. Le standard FCI décrit un chien à poil ras, bien équilibré, d’une grande force pour sa taille – traditionnellement d’un courage et d’une ténacité indomptables, très intelligent et affectueux, surtout avec les enfants. Il mesure 35,5 à 40,5 cm ; les mâles pèsent 12,7 à 17 kg et les femelles 11 à 15,4 kg. Il existe en bringé, rouge, fauve, noir, bleu ou blanc, seul ou avec du blanc.",
        "Le Royal Kennel Club le décrit comme un merveilleux animal de famille et recommande jusqu’à une heure d’exercice par jour ; il demande un toilettage hebdomadaire, perd ses poils et vit généralement plus de 12 ans. Selon la PDSA, les Staffies sont tolérants et doux avec les enfants, mais, très tournés vers les humains, ils sont réputés souffrir d’anxiété de séparation lorsqu’ils restent seuls, ils sont connus pour mâchonner, et leur très fort instinct de prédation rend déconseillée la présence de plus petits animaux.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Roi des terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "L’Airedale Terrier est originaire de Grande-Bretagne ; la FCI le classe parmi les terriers de grande et moyenne taille. Le standard FCI en fait le plus grand des terriers – un chien musclé, actif, assez ramassé, sociable et sûr de lui, amical, courageux et intelligent, toujours en alerte, pas agressif mais intrépide. Les mâles mesurent environ 58 à 61 cm et les femelles environ 56 à 59 cm. Son poil dur, dense et rêche est feu avec une selle noire ou grisonnante.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour ; le pelage demande un toilettage quotidien et ne perd pas ses poils, et la race vit généralement plus de 10 ans. PetMD décrit d’excellents chiens de famille qui, bien éduqués, s’entendent généralement avec les enfants, mais ne devraient pas être livrés à eux-mêmes trop longtemps ; il conseille un brossage quelques fois par semaine, un rapide nettoyage des oreilles chaque semaine et un toiletteur professionnel trois ou quatre fois par an.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Russell Terrier (AKC), Jack Russell, JRT",
      text: [
        "Le Jack Russell Terrier – l’American Kennel Club l’appelle Russell Terrier – est originaire d’Angleterre et a été développé en Australie ; la FCI le classe parmi les terriers de petite taille. Son standard décrit un terrier de travail fort, actif et souple, de grand caractère : vif, alerte et actif, hardi et intrépide, amical mais calmement sûr de lui. Il mesure 25 à 30 cm et pèse environ 5 à 6 kg. Son poil lisse, brisé ou rude est principalement blanc avec des marques noires et/ou feu.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage hebdomadaire ; la race perd ses poils et vit généralement plus de 10 ans. La PDSA décrit des chiens malins et vifs qui peuvent être de bons animaux de famille s’ils sont éduqués et socialisés dès leur plus jeune âge, mais qui conviennent mieux aux familles avec des enfants un peu plus âgés ; leur instinct de prédation est très fort, si bien que de plus petits animaux sont déconseillés, et ils adorent creuser.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Le Bullmastiff est une ancienne race de garde anglaise du XIXe siècle, issue du bulldog et de l’Old English Mastiff ; la FCI le classe parmi les molossoïdes. Son standard décrit un chien puissant et symétrique, d’une grande force sans être lourd – endurant, actif, fiable, plein d’allant, alerte et fidèle. Les mâles mesurent 64 à 69 cm et pèsent 50 à 59 kg, les femelles 61 à 66 cm et 41 à 50 kg. Le poil court et dur est de toutes les nuances de fauve, de rouge ou de bringé, toujours avec un museau noir.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un toilettage hebdomadaire, et la race vit généralement moins de 10 ans. La PDSA décrit des chiens très loyaux que leur taille et leur puissance destinent plutôt à des foyers d’adultes ou à des familles avec des enfants plus âgés ; ils ont besoin d’une socialisation précoce, idéalement d’une présence permanente à la maison, ont un très fort instinct de prédation, bavent beaucoup et ont besoin d’un intervalle entre le repas et l’exercice.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Chien chinois à crête, Powder Puff",
      text: [
        "Le chien chinois à crête est un petit chien de compagnie actif et gracieux originaire de Chine ; la FCI le classe parmi les chiens nus. Il existe en deux variétés : la variété nue (Hairless), au corps lisse et dénudé, avec du poil seulement sur la tête (la crête), les pieds et la queue, et la variété Powder Puff, entièrement couverte d’un voile de longs poils doux. Les mâles mesurent 28 à 33 cm et les femelles 23 à 30 cm ; PetMD indique un poids de 8 à 12 livres (3,6 à 5,4 kg). Toutes les couleurs sont admises sauf le merle, et son tempérament est décrit comme joyeux, jamais méchant.",
        "Le Royal Kennel Club recommande jusqu’à 30 minutes d’exercice par jour et un toilettage hebdomadaire ; il convient à un appartement, et la race vit généralement plus de 12 ans. PetMD décrit un chien amical qui s’intègre dans la plupart des familles, y compris avec des enfants et d’autres animaux – toute interaction avec des enfants doit être surveillée. La peau nue doit être protégée du soleil et du froid, les griffes contrôlées chaque semaine, et les chiots ont besoin d’une socialisation précoce et régulière.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, retriever de la Nouvelle-Écosse, NSDTR",
      text: [
        "Le retriever de la Nouvelle-Écosse – le Toller – est un chien rapporteur originaire du Canada ; son standard FCI décrit comment il court et joue le long du rivage, bien en vue des canards, pour les attirer, puis est envoyé rapporter les oiseaux. Le standard décrit un chien de taille moyenne, puissant, compact et bien musclé, très intelligent, facile à éduquer et d’une grande endurance. La FCI indique 48 à 51 cm et 20 à 23 kg pour les mâles, 45 à 48 cm et 17 à 20 kg pour les femelles. Le double pelage hydrofuge est de diverses nuances de rouge ou d’orange, généralement avec du blanc au bout de la queue, aux pieds, sur la poitrine ou en liste.",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour et un toilettage plus d’une fois par semaine, et la race perd ses poils ; PetMD conseille un brossage une à deux fois par semaine. Une vaste étude britannique (McMillan 2024, via Dogs Trust) indique une espérance de vie médiane de 13,2 ans, PetMD de 12 à 14 ans, et, comme les autres chiens de taille moyenne, il atteint sa taille adulte vers 12 à 15 mois (PetMD). L’AKC décrit des chiens très affectueux, généralement gentils avec les enfants, qui ont besoin de beaucoup d’exercice physique et de stimulation mentale, peuvent avoir un fort instinct de prédation envers les petits animaux et profitent d’une socialisation précoce et de cours pour chiots.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "Le Cairn Terrier est originaire de Grande-Bretagne ; la FCI le classe parmi les terriers de petite taille. Le standard du Kennel Club décrit un terrier agile et alerte, d’allure naturelle et travailleuse – actif, vaillant et rustique, d’un tempérament intrépide et gai, affirmé mais pas agressif. Son double pelage résistant aux intempéries a un poil de couverture abondant et dur ; la couleur est crème, froment, rouge, gris ou presque noir, le bringé est admis et des oreilles et un museau foncés sont typiques. Il indique une hauteur d’environ 28 à 31 cm et un poids idéal de 6 à 7,5 kg.",
        "La PDSA recommande au moins une heure d’exercice par jour ; elle indique que les Cairns ont une énergie débordante et un fort instinct de chasse, qu’ils doivent donc être socialisés tôt avec les chats et les autres petits animaux et surveillés sans laisse, et qu’une fois socialisés, ils s’entendent très bien avec les enfants et sont d’excellents animaux de famille. Elle conseille d’épiler le pelage à la main deux fois par an et de le toiletter une à deux fois par semaine ; selon Dogs Trust, ils perdent très peu de poils. Une vaste étude britannique (McMillan 2024, via Dogs Trust) indique une espérance de vie médiane de 14,0 ans, PetMD de 13 à 15 ans, et, comme les autres petits chiens, il atteint sa taille adulte vers 9 à 12 mois (PetMD). PetMD ajoute qu’ils ont besoin de beaucoup d’exercice et de stimulation mentale.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bull Terrier anglais, Bully",
      text: [
        "Le Bull Terrier est originaire de Grande-Bretagne ; la FCI le classe parmi les terriers de type bull (groupe 3). C’est un terrier de taille moyenne à poil court : la PDSA indique une hauteur moyenne de 51 à 61 cm et un poids moyen de 22 à 31 kg, et PetMD décrit une silhouette athlétique d’environ 21 à 22 pouces et 50 à 70 livres. Selon PetMD, l’exercice régulier est indispensable ; les Bull Terriers sont affectueux avec leur famille, y compris les enfants, mais pas toujours amicaux avec les autres chiens ou les chats, et une socialisation et une éducation précoces et fréquentes sont essentielles.",
        "La PDSA recommande au moins une heure d’exercice par jour, répartie sur la journée, et un intervalle après les repas avant l’exercice. Elle indique qu’un Bull Terrier bien socialisé s’entend avec les gens de tout âge mais, un peu excitable, convient mieux à des enfants plus âgés ; il aime avoir de la compagnie le plus possible et a un fort instinct de prédation : la prudence s’impose avec les chats et les autres petits animaux. Un brossage hebdomadaire suffit pour le pelage. La PDSA indique une espérance de vie moyenne de plus de 10 ans et PetMD de 12 à 13 ans ; comme les autres chiens de taille moyenne, il atteint sa taille adulte vers 12 à 15 mois (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Pinscher nain, Min Pin, Zwergpinscher",
      text: [
        "Le pinscher nain est originaire d’Allemagne ; la FCI le classe parmi les pinschers et schnauzers (groupe 2) et le décrit comme une réduction du pinscher allemand – vif, plein d’entrain, sûr de lui et d’un tempérament égal. Son poil est court, dense, lisse et brillant, soit unicolore rouge cerf à brun-rouge foncé, soit noir et feu, et sa queue est naturelle. Le standard FCI indique une hauteur de 25 à 30 cm et un poids de 4 à 6 kg pour les mâles comme pour les femelles ; comme les autres chiens d’agrément, il atteint sa taille adulte vers 8 à 12 mois (PetMD).",
        "La PDSA recommande jusqu’à une demi-heure d’exercice par jour pour ces petits chiens énergiques et affairés, indique qu’un brossage hebdomadaire suffit généralement pour le pelage, et note qu’ils peuvent être têtus et indépendants : l’éducation demande donc de la pratique et de la patience. Selon PetMD, ils peuvent être d’excellents animaux de famille avec une bonne socialisation et une bonne éducation. VCA décrit la race comme joueuse et très gentille avec les enfants, même si des enfants très jeunes ou turbulents peuvent la blesser par des jeux brusques, et indique que son poil fin et sa petite taille la rendent sensible au froid. La PDSA indique une espérance de vie moyenne de plus de 12 ans et PetMD de 12 à 16 ans.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Chien de montagne des Pyrénées, Patou, Great Pyrenees",
      text: [
        "Le chien de montagne des Pyrénées – appelé Great Pyrenees aux États-Unis – est originaire de France ; la FCI le classe parmi les molossoïdes de type montagne (groupe 2) et décrit un chien de grande taille, imposant et fortement charpenté, non dénué d’une certaine élégance. Son pelage est blanc, ou blanc avec des taches blaireau, gris loup, jaune pâle ou orange sur la tête et les oreilles. Le standard FCI indique une hauteur de 70 à 80 cm pour les mâles et de 65 à 75 cm pour les femelles ; la PDSA indique un poids moyen de 40 à 50 kg. Comme les autres chiens géants, il atteint sa taille adulte vers 18 à 24 mois (PetMD).",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour, indique que la race convient à une grande maison avec un grand jardin, demande un toilettage plus d’une fois par semaine et perd ses poils, et donne une espérance de vie de moins de 10 ans (PetMD et VCA indiquent 10 à 12 ans). La PDSA les qualifie de gentils géants – des chiens calmes et d’un bon naturel qui s’entendent généralement bien avec tout le monde – et indique que l’éducation demande de la patience et des méthodes fondées sur la récompense. Selon VCA, le Patou est dévoué à sa famille, surtout aux enfants, et la socialisation précoce est très importante ; selon PetMD, il vit bien avec les autres animaux mais conviendrait peut-être mieux à des foyers sans jeunes enfants, et il faut éviter l’exercice intense autour des repas en raison du risque de dilatation-torsion de l’estomac.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Terrier irlandais à poil doux, Wheaten Terrier, Wheaten, SCWT",
      text: [
        "Le terrier irlandais à poil doux (Soft Coated Wheaten Terrier) est originaire d’Irlande ; la FCI le classe, sous le nom d’Irish Soft Coated Wheaten Terrier, parmi les terriers de grande et moyenne taille. Le standard du Royal Kennel Club décrit un terrier de taille moyenne, compact et bien campé, au poil doux et soyeux couleur froment qui tombe en boucles ou en ondulations lâches – d’un bon caractère, plein d’entrain et vaillant, plein d’assurance et d’humour. La seule couleur admise est un froment clair et franc. La PDSA indique une hauteur moyenne de 46 à 49 cm et un poids moyen de 16 à 20,5 kg (le standard du Kennel Club indique 16 à 20,5 kg pour les mâles, un peu moins pour les femelles) ; comme les autres chiens de taille moyenne, il atteint sa taille adulte vers 12 à 15 mois (PetMD).",
        "Le Royal Kennel Club recommande jusqu’à une heure d’exercice par jour, indique que la race convient à une petite maison, demande un toilettage quotidien et ne perd pas ses poils. Une vaste étude britannique (McMillan 2024, via Dogs Trust) indique une espérance de vie médiane de 13,7 ans ; PetMD et VCA indiquent 12 à 14 ans. La PDSA les décrit comme des chiens amicaux et fiables, d’excellents animaux de famille, même s’ils peuvent être un peu têtus. Selon VCA, leur nature douce et joueuse en fait de bons compagnons pour les enfants ; selon PetMD, les interactions avec les enfants doivent être surveillées, ils n’aiment pas rester seuls longtemps, et il conseille un toilettage professionnel toutes les quatre à six semaines, un bain environ une fois par mois et un nettoyage des oreilles toutes les semaines ou toutes les deux semaines.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Lévrier irlandais, Wolfhound, Cú Faoil",
      text: [
        "Le lévrier irlandais (Irish Wolfhound) est originaire d’Irlande ; la FCI le classe parmi les lévriers à poil dur. La PDSA indique une hauteur moyenne de 71 à 79 cm et un poids moyen de 40 à 55 kg ; comme les autres chiens géants, il atteint sa taille adulte vers 18 à 24 mois (PetMD). Le Royal Kennel Club classe sa taille comme très grande et indique qu’il convient à une grande maison avec un grand jardin à la campagne.",
        "Le Royal Kennel Club recommande plus de deux heures d’exercice par jour et un toilettage plus d’une fois par semaine, et indique que la race perd ses poils. Le Kennel Club et la PDSA indiquent une espérance de vie de moins de 10 ans ; PetMD de 6 à 8 ans. La PDSA déconseille la race dans les foyers avec de jeunes enfants en raison de sa taille et de sa force, ainsi qu’avec de plus petits animaux en raison de son fort instinct de prédation, et indique qu’il ne devrait jamais rester seul plus de quatre heures. PetMD conseille de socialiser le chiot dès son arrivée, de ne pas lui faire faire d’exercice juste avant ou juste après le repas (dilatation-torsion de l’estomac) et de nettoyer ses oreilles toutes les deux à quatre semaines.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "AmStaff, Am Staff, Staffordshire Terrier",
      text: [
        "L’American Staffordshire Terrier est originaire des États-Unis ; la FCI le classe parmi les terriers de type bull. Son standard demande une grande force pour sa taille et indique une hauteur de 46 à 48 cm pour les mâles et de 43 à 46 cm pour les femelles, mais aucun poids. PetMD indique 40 à 70 livres (environ 18 à 32 kg) pour les deux sexes ; un chien de cette taille atteint sa taille adulte vers 12 à 15 mois (PetMD).",
        "PetMD recommande au moins 60 minutes d’exercice par jour et indique que la race est patiente et affectueuse avec les enfants, qu’elle peut être sujette à l’anxiété de séparation et que son fort instinct de prédation peut compliquer la vie avec de plus petits chiens ou des chats. Une étude britannique (McMillan et al., 2024, telle que présentée par Dogs Trust) indique une espérance de vie médiane de 12,5 ans ; PetMD de 12 à 16 ans. VCA recommande un brossage hebdomadaire ; PetMD conseille de socialiser le chiot, de ne pas faire d’exercice juste après un repas (dilatation-torsion de l’estomac), ainsi qu’un bain et un nettoyage des oreilles toutes les 4 à 6 semaines environ.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, chien d’eau romagnol, chien truffier",
      text: [
        "Le Lagotto Romagnolo est un chien d’eau à poil bouclé de petite à moyenne taille originaire d’Italie, connu comme chien truffier ; la FCI le classe parmi les chiens d’eau. Son standard indique une hauteur de 43 à 48 cm et un poids de 13 à 16 kg pour les mâles, et de 41 à 46 cm et 11 à 14 kg pour les femelles ; un chien de cette taille atteint sa taille adulte vers 12 à 15 mois (PetMD).",
        "Le Royal Kennel Club le décrit comme un excellent compagnon de famille, toujours en alerte, recommande plus de deux heures d’exercice par jour et un toilettage plus d’une fois par semaine, indique qu’il ne perd pas ses poils et donne une espérance de vie de plus de 12 ans ; selon PetMD, les Lagotti peuvent vivre jusqu’à 15 à 17 ans. PetMD note qu’il a besoin d’une stimulation mentale et physique constante et d’une socialisation approfondie, car il peut être timide ; selon Woodgreen, il peut mal supporter d’être trop souvent laissé seul, et un toilettage professionnel toutes les six à huit semaines est recommandé.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Malamute de l’Alaska, Malamute, Mal",
      text: [
        "Le malamute de l’Alaska est l’un des plus anciens chiens de traîneau arctiques : un chien nordique de traîneau puissant et solidement bâti, originaire des États-Unis, au pelage épais et grossier. Le standard FCI indique des tailles souhaitables de 63,5 cm et 38 kg pour les mâles et de 58,5 cm et 34 kg pour les femelles ; la PDSA indique 58 à 64 cm et 34 à 39 kg. Un chien de cette taille atteint sa taille adulte vers 15 à 18 mois (PetMD), et la PDSA indique une espérance de vie de plus de 10 ans (PetMD : 10 à 14 ans).",
        "La PDSA recommande au minimum deux heures d’exercice intense et un brossage chaque jour, et indique que les malamutes perdent beaucoup de poils, ont un très fort instinct de prédation, ne devraient pas rester seuls plus de quatre heures et conviennent à des adultes actifs ou à des familles avec des enfants plus âgés ; elle les juge difficiles pour des propriétaires débutants. PetMD conseille de contrôler les oreilles une fois par semaine et de donner un bain toutes les 6 à 8 semaines, et note que leur pelage épais leur rend la chaleur pénible.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Chien du Congo, chien qui n’aboie pas",
      text: [
        "Le Basenji est un chien de chasse léger, à l’ossature fine, originaire d’Afrique centrale, qui n’aboie pas mais émet un son proche de la tyrolienne ; la FCI le classe parmi les chiens de type primitif. La PDSA indique une hauteur de 40 à 43 cm et un poids de 9 à 11 kg. Un chien de cette taille atteint sa taille adulte vers 9 à 12 mois (PetMD), et la PDSA indique une espérance de vie de plus de 12 ans (WebMD : 13 à 14 ans).",
        "La PDSA recommande au moins une heure d’exercice par jour (environ 60 à 90 minutes), beaucoup de stimulation mentale et un brossage hebdomadaire ; elle décrit les Basenjis comme distants mais fiables, volontaires et très peu conscients des dangers de la route. Selon WebMD, ils poursuivent tout ce qui ressemble à une proie, ont besoin de clôtures très hautes ou d’une surveillance constante et ne sont que moyennement adaptés aux jeunes enfants ; il conseille de nettoyer les oreilles chaque semaine et de brosser les dents au moins deux fois par semaine.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "British Blue, British à poil court",
      text: [
        "Le British Shorthair est un chat robuste au pelage dense et aux grands yeux ronds – la CFA parle d’un chat « ours en peluche ». On l’imagine le plus souvent gris-bleu, mais il existe dans de nombreuses couleurs et de nombreux motifs. Il se développe lentement : selon la CFA, il atteint sa taille adulte vers trois ans, et selon VCA, la maturité physique peut prendre jusqu’à cinq ans.",
        "La CFA le décrit comme très affectueux et attaché à ses humains ; il s’entend avec tous les membres du foyer, quel que soit leur âge, mais n’aime généralement pas être porté, et il a déjà cohabité avec des chiens, des lapins et des oiseaux. VCA décrit un niveau d’activité modéré et conseille de peigner le pelage au moins une fois par semaine. Les chatons de race rejoignent généralement leur nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "La CFA décrit le Ragdoll comme un grand chat décontracté au pelage mi-long, épais et soyeux, et aux yeux bleus. Ses extrémités plus foncées (« points ») existent en plusieurs motifs – colourpoint sans blanc, mitted avec les pieds blancs, bicolore avec davantage de blanc, et van. Il se développe lentement : il atteint la couleur définitive de sa robe à deux ans, et sa taille et son poids adultes vers quatre ans.",
        "La CFA décrit un chat doux qui vous accueille à la porte et vous suit de pièce en pièce, et qui joue généralement sans sortir les griffes. PetMD le juge adapté aux familles, y compris avec des enfants, mais conseille des présentations lentes et surveillées aux enfants et aux autres animaux, et indique que certains Ragdolls n’ont besoin d’être peignés qu’une ou deux fois par semaine, tandis que la CFA conseille un peignage régulier. Les chatons de race rejoignent généralement un nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Sibérien, chat des forêts sibériennes",
      text: [
        "Le GCCF décrit le Sibérien comme un chat à développement lent au pelage épais et résistant aux intempéries : un sous-poil dense et doux sous un poil de couverture plus grossier ; il mue abondamment au printemps et à l’automne. Les mâles pèsent environ 7,7 à 11,8 kg et les femelles 5,9 à 7,7 kg ; le développement complet peut prendre quatre à cinq ans, et le GCCF indique une espérance de vie de 12 à 15 ans ou plus.",
        "Le GCCF le dit énergique et joueur, mais patient – un bon choix pour les familles avec de jeunes enfants – et indique qu’il s’entend bien avec les autres animaux, y compris les chiens. PetMD conseille de le peigner au moins une fois par semaine, en redoublant d’efforts pendant la mue du printemps et de l’automne, et note que les Sibériens ne sont pas considérés comme hypoallergéniques. Les chatons de race rejoignent généralement leur nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Chat Maine Coon",
      text: [
        "Le Maine Coon est largement considéré comme l’une des plus grandes races de chats domestiques, avec un corps musclé et rectangulaire, une large poitrine, de grandes pattes et une longue queue fournie. La TICA indique un poids moyen d’environ 5,9 à 8,2 kg pour les mâles adultes et 4,1 à 5,9 kg pour les femelles, et la CFA note que certains mâles pèsent plus de 9 kg. Il grandit lentement : selon la CFA, il n’atteint souvent son plein développement qu’à trois ou quatre ans, et selon la TICA, la pleine maturité peut prendre trois à cinq ans.",
        "La TICA le décrit comme doux, amical et joueur, la CFA comme sociable, fidèle et intelligent ; il s’exprime souvent par un trille gazouillant plutôt que par un miaulement. Selon Vetstreet, les Maine Coons s’entendent avec tout le monde, y compris les enfants, les chiens et les autres chats. Son pelage mi-long et fourni est plus court sur les épaules et plus long sur la collerette, le ventre et l’arrière-train. Les sources divergent sur le toilettage : selon Vetstreet, un peignage hebdomadaire suffit, la CFA conseille de le brosser ou de le peigner au moins deux ou trois fois par semaine, et la TICA note qu’un pelage plus épais peut demander un peignage quotidien. Les chatons de race rejoignent généralement leur nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Chat Bengal",
      text: [
        "La PDSA décrit le Bengal comme très intelligent et énergique, un chat qui a besoin de beaucoup de stimulation mentale et d’occasions de se dépenser, et qui aime les postes d’observation en hauteur comme un arbre à chat. Il est affectueux, mais plutôt enclin à se pelotonner à côté de vous que sur vos genoux, et peut être assez bavard. VCA note que les Bengals grandissent lentement et peuvent mettre jusqu’à deux ans à atteindre leur maturité physique.",
        "Son pelage court et doux, tacheté ou marbré, n’a besoin que d’un léger brossage ou peignage une fois par semaine (PDSA). PetMD note que le Bengal n’est peut-être pas le meilleur choix pour les familles avec de jeunes enfants, tandis que la cohabitation avec des chiens et d’autres chats peut bien se passer avec des présentations adaptées. La race a été développée à partir de croisements entre le chat-léopard du Bengale et des chats domestiques ; PetPrep ne montre que le Bengal domestique enregistré. Les chatons de race rejoignent généralement leur nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Chat des forêts norvégiennes, Wegie, Skogkatt",
      text: [
        "Le GCCF décrit le chat des forêts norvégiennes comme doux et amical, un chat qui aime faire partie d’une famille. Il se développe lentement et n’est considéré comme adulte qu’à quatre ou cinq ans environ ; les mâles pèsent environ 5,4 à 7,3 kg et les femelles 4,1 à 5,4 kg, et le GCCF indique une espérance de vie de 14 à 16 ans.",
        "Il a beaucoup d’énergie, aime les jeux interactifs et grimpe volontiers ; selon le GCCF, il tolère bien les enfants respectueux, les autres chats et les chiens habitués aux chats. PetMD conseille de le peigner et de le brosser au moins une fois par semaine, plus souvent pendant la mue du printemps et de l’automne, et note que l’anxiété de séparation peut poser problème s’il reste souvent seul longtemps. Les chatons de race rejoignent généralement leur nouveau foyer à 12 ou 13 semaines (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default fr;
