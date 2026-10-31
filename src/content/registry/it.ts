import type { RegistryCopy } from "./types";

/** Italian plural: 1 → singular, everything else (0, 1,5, 2 …) → plural («1,5 anni», «2 razze»). */
const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** First letter lower case for values that continue a phrase («Cani» → «i cani»). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("it") + t.slice(1);
/** Italian clock time, 24 h without a leading zero: "09:00" → «9:00», "16:30" → «16:30». */
const hhmm = (t: unknown) => String(t).replace(/^0(\d)/, "$1");
/** Breed name inside a sentence: lower case, except proper-name parts («il border collie», «il Jack Russell terrier», «lo Shetland sheepdog», «il San Bernardo»). */
const rn = (name: string) =>
  /^(Jack|Chesapeake|Boston|Yorkshire|Airedale|Staffordshire|American|West|Welsh|Cavalier|Australian|Siberian|Nova|San|English|Irish|Rhodesian|Shetland)\b/.test(name) ? name : lc(name);
/** Which form of the article a (masculine) breed name takes: l’ before a vowel, lo/uno before s + consonant, z, gn, ps, x, y. */
const form = (w: string) => (/^[aeiouhàèéìòù]/i.test(w) ? 2 : /^(s[^aeiouàèéìòù]|z|gn|ps|pn|x|y)/i.test(w) ? 1 : 0);
/** Definite article (optionally merged with di / a): «il border collie», «dello shih tzu», «all’akita». */
const il = (name: string, prep: "" | "di" | "a" = "") => {
  const n = rn(name);
  const arts = { "": ["il ", "lo ", "l’"], di: ["del ", "dello ", "dell’"], a: ["al ", "allo ", "all’"] }[prep];
  return `${arts[form(n)]}${n}`;
};
/** Indefinite article: «un border collie», «uno shih tzu», «un akita». */
const un = (name: string) => {
  const n = rn(name);
  return `${form(n) === 1 ? "uno" : "un"} ${n}`;
};
type Fci = { number: number; group: number; origin: string };
/** Italian FCI group names (ENCI nomenclature), in running-text form. */
const fciGroups: Record<number, string> = { 1: "cani da pastore e bovari (esclusi i bovari svizzeri)", 2: "cani di tipo pinscher e schnauzer – molossoidi – cani bovari svizzeri", 3: "terrier", 4: "bassotti", 5: "cani di tipo spitz e di tipo primitivo", 6: "segugi e cani per pista di sangue", 7: "cani da ferma", 8: "cani da riporto – cani da cerca – cani da acqua", 9: "cani da compagnia", 10: "levrieri" };
const origins: Record<string, string> = { GB: "Gran Bretagna", FR: "Francia", DE: "Germania", US: "Stati Uniti", CU: "Cuba", CH: "Svizzera", IT: "Italia", "CN-XZ": "Tibet (Cina)", CN: "Cina", MX: "Messico", BE: "Belgio", HU: "Ungheria", JP: "Giappone", ZA: "Sudafrica", "BE-FR": "Belgio / Francia", PT: "Portogallo", CA: "Canada", HR: "Croazia", AU: "Australia", RU: "Russia", IE: "Irlanda", "AF-C": "Africa centrale" };

const it: RegistryCopy = {
  mistakes: {
    title: (breed) => `Errori comuni di chi ha ${un(breed)}`,
    intro: "Piccole abitudini che causano problemi più grandi. Ogni punto viene dalle fonti di questa razza.",
    exercise: "Troppo poco movimento ogni giorno",
    exerciseText: (amount) => `Attività fisica necessaria: ${amount}. Prevedila tutti i giorni, non solo nel fine settimana.`,
    coat: "Trascurare la cura del mantello",
    coatText: (brushing, shedding) => `Spazzolatura: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Troppi premi e pasti troppo abbondanti",
    heat: "Passeggiate col caldo",
    growth: "Dimenticare che il cucciolo sta ancora crescendo",
    growthText: (growthEnd) => `Raggiunge la taglia adulta: ${growthEnd}. Fino ad allora, organizza movimento e alimentazione pensando a un animale giovane che sta ancora crescendo, e chiedi al tuo veterinario che cosa è adatto al tuo cucciolo.`,
    mind: "Troppo poco da fare per la mente",
    health: "Trascurare i problemi di salute noti della razza",
    practise: "In PetPrep un bambino si esercita proprio in queste abitudini – passi, pasti, cure – prima che l’animale vero arrivi a casa.",
  },
  hub: {
    title: "Conosci l’animale prima che arrivi a casa.",
    intro:
      "Di che cosa ha davvero bisogno ogni specie e ogni razza di PetPrep, secondo club cinofili, registri felini, organizzazioni veterinarie e studi, con il link a ogni fonte. In più, le regole che PetPrep usa per simularle.",
    breedCount: (n) => `${n} ${s(n, "razza", "razze")} nel registro`,
    open: "Vedi le razze",
    openA11y: (many) => `Vedi le razze: ${lc(many)}`,
    freePlan: (name, activity) => `Piano gratuito: ${lc(name)} (${activity} da adulto). Non ha una pagina di razza.`,
    otherSpecies: "Sono previsti altri animali.",
    methodTitle: "Come costruiamo questo registro",
    method: [
      "Ogni dato viene da una fonte indicata per nome – club cinofili, registri felini, organizzazioni e associazioni veterinarie e studi sottoposti a revisione paritaria – e rimanda a essa. Gli standard di razza li riassumiamo con parole nostre.",
      "I valori che nessuna fonte conferma non vengono mai mostrati come dati. Quando PetPrep deve scegliere un numero per il gioco, questo compare solo in «Come lo simula PetPrep», indicato come regola del gioco.",
      "Gli stessi dati fanno funzionare l’app: le etichette, il numero di pasti, gli obiettivi di passi e le sessioni di gioco di queste pagine sono quelli che usa l’animale nell’app.",
      "Questo registro non è un consiglio veterinario. Le informazioni sulla salute servono solo come orientamento e non sono state verificate da un veterinario.",
    ],
  },
  speciesStatus: { available: "Nell’app", coming_soon: "Presto nell’app", info_only: "Solo a scopo informativo" },
  availability: {
    in_app: { label: "Nell’app", text: "Disponibile nella Sfida PetPrep di 12 settimane (razza a pagamento)." },
    coming_soon: { label: "Presto nell’app", text: "Creata e testata; arriverà con una prossima versione dell’app." },
    info_only: { label: "Solo a scopo informativo", text: "È nel registro a scopo informativo; per ora non puoi adottarla nell’app." },
  },
  catalogue: {
    eyebrow: "Registro degli animali",
    title: (many) => `${many}: le razze del registro`,
    lead: (many, count) =>
      `${count} ${s(count, "razza", "razze")} di ${lc(many)} con esigenze documentate da fonti, per chi sono adatte e come le simula PetPrep. Cerca, filtra e confrontane fino a tre.`,
    metaTitle: (many) => `${many}: registro delle razze con fonti | PetPrep`,
    metaDescription: (many) =>
      `Cerca e confronta le razze di ${lc(many)} per esigenze, taglia e per chi sono adatte. Ogni dato rimanda alla sua fonte; in più, le regole che PetPrep usa per simulare ogni razza.`,
    searchLabel: "Cerca razze",
    searchPlaceholder: "Nome, ad es. labrador",
    filtersTitle: "Filtri",
    any: "Qualsiasi",
    availabilityLabel: "In PetPrep",
    sortLabel: "Ordina",
    sort: { recommended: "Prima quelle nell’app", az: "A–Z", size: "Taglia (dalla piccola alla grande)" },
    clear: "Cancella tutto",
    results: (total) => `{n} di ${total} ${s(total, "razza", "razze")}`,
    none: "Nessuna razza corrisponde. Prova con meno filtri.",
    loading: "Caricamento della ricerca…",
    page: "Pagina {n} di {total}",
    prev: "Precedente",
    next: "Successiva",
    compareAdd: "Confronta: {name}",
    compareBar: "{n} di {max} selezionate per il confronto",
    compareGo: "Confronta",
    compareMax: "Puoi confrontare fino a {max} razze.",
    azTitle: "Tutte le razze dalla A alla Z",
    azIntro: "Tutte le razze del registro, in ordine alfabetico.",
    freePlanTitle: "Piano gratuito",
    guideTitle: "Come scegliere una razza",
    guide: () => [
      "Parti da ciò che la tua famiglia può offrire ogni giorno: tempo per il movimento e la toelettatura, e spazio. La pagina di ogni razza mostra queste esigenze a colpo d’occhio, con la fonte di ogni valore; quando le fonti non concordano, vengono mostrati tutti i valori.",
      "Quando una razza ha una classe di taglia (per i cani: toy, piccola, media, da media a grande, grande o gigante), è quella indicata dalla fonte citata – di solito un club cinofilo – e i pesi sono gli intervalli riportati dalle fonti, non stime nostre.",
      "Etichette come «Adatto a: una famiglia attiva» sono le stesse dell’app e ognuna è confermata da fonti. I numeri in «Come lo simula PetPrep» sono regole del gioco di PetPrep, non istruzioni di cura. [Come costruiamo il registro](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Confronta le razze di ${lc(many)}`,
    metaTitle: (many) => `Confronta le razze di ${lc(many)} | Registro PetPrep`,
    intro: "Le esigenze principali una accanto all’altra, dalle stesse fonti delle pagine di razza.",
    pick: "Scegli due o tre razze nel catalogo per confrontarle.",
    back: "Torna al catalogo",
    remove: "Rimuovi: {name}",
    note: "I valori sono riportati come li indica la fonte citata. Quando le fonti non concordano, la pagina della razza li elenca tutti.",
    availabilityRow: "In PetPrep",
    activityRow: "Obiettivo giornaliero di un adulto in PetPrep (regola del gioco)",
  },
  facets: {
    size: { label: "Taglia", values: { toy: "Toy", small: "Piccola", small_medium: "Da piccola a media", medium: "Media", medium_large: "Da media a grande", large: "Grande", giant: "Gigante" } },
    exercise: { label: "Movimento quotidiano", values: { under_1h: "Fino a 1 ora", h1_2: "1–2 ore", over_2h: "Più di 2 ore" }, line: (v) => `${lc(v)} al giorno` },
    grooming: { label: "Spazzolatura", values: { weekly: "Una volta alla settimana", several_weekly: "Più volte alla settimana", daily: "Ogni giorno", other: "Altra frequenza" }, line: (v) => `spazzolatura: ${lc(v)}` },
  },
  groups: {
    exercise: "Movimento",
    play: "Gioco",
    litter: "Lettiera",
    scratching: "Graffiare",
    grooming: "Mantello e toelettatura",
    feeding: "Pasti",
    water: "Acqua",
    lifespan: "Aspettativa di vita",
    stages: "Fasi della vita",
    size: "Taglia e peso",
    training: "Addestramento",
  },
  fields: {
    size: "Taglia",
    height: "Altezza al garrese",
    weight: "Peso da adulto",
    growth_end: "Raggiunge la taglia adulta",
    lifespan: "Aspettativa di vita",
    exercise: "Movimento quotidiano",
    coat: "Pelo",
    grooming_frequency: "Spazzolatura",
    grooming_level: "Necessità di toelettatura",
    shedding: "Muta del pelo",
    litter_scoop: "Rimuovere gli escrementi dalla lettiera",
    litter_full_change: "Cambiare tutta la sabbia",
    litter_pee: "Urina (adulto)",
    litter_poo: "Defeca (adulto)",
    water_need: "Fabbisogno d’acqua",
    sleep: "Sonno (adulto)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 settimane",
    puppy_3_6_months: "3–6 mesi",
    puppy_6_12_months: "6–12 mesi",
    kitten_6_12_weeks: "6–12 settimane",
    kitten_3_6_months: "3–6 mesi",
    kitten_6_12_months: "6–12 mesi",
    puppy: "Cucciolo",
    kitten: "Gattino",
    young_adult: "Giovane adulto",
    mature_adult: "Adulto maturo",
    adult: "Adulto",
    senior: "Anziano",
  },
  categories: {
    size: { toy: "toy", small: "piccola", small_medium: "da piccola a media", medium: "media", medium_large: "da media a grande", large: "grande", giant: "gigante" },
    coat: { moderately_long: "moderatamente lungo", smooth: "raso (corto)", short: "corto", medium: "di media lunghezza", short_long: "corto o lungo (due varietà di pelo)", long: "lungo" },
    grooming_frequency: { at_least_once_a_week: "almeno una volta alla settimana", at_least_once_or_twice_a_week: "almeno una o due volte alla settimana", once_a_week: "una volta alla settimana", more_than_once_a_week: "più di una volta alla settimana", daily: "ogni giorno", every_day: "tutti i giorni" },
    grooming_level: { moderate: "moderata", high: "elevata", low: "bassa" },
    shedding: { yes: "perde pelo", no: "non perde pelo (il che non significa che sia ipoallergenico)", high: "perde molto pelo", moderate: "perde pelo in modo moderato", low: "perde poco pelo", minimal: "non perde quasi pelo" },
  },
  statements: {
    food_motivated: () => "Molto motivato dal cibo: aiuta nell’addestramento, ma tieni d’occhio le porzioni.",
    coren_rank: (v) => `${String(v)}° posto nella classifica di Stanley Coren sull’intelligenza di lavoro e di obbedienza.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Standard FCI n. ${x.number}, gruppo ${x.group}: ${fciGroups[x.group] ?? "—"}; origine: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Gioco: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} sessioni di ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} minuti al giorno.`;
    },
    kittens_play_more: () => "I gattini hanno bisogno di giocare più spesso.",
    scratching_natural: () => "Graffiare è naturale e necessario: mettigli a disposizione un tiragraffi e non punirlo mai per questo.",
    water_fresh: () => "Acqua fresca sempre a disposizione; lava e riempi la ciotola ogni giorno.",
    grooming_sources_differ: () => "Le fonti non concordano su quanto spesso pettinarlo: da ogni giorno a una volta alla settimana.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediana: ${t}`,
    more_than: (t) => `più di ${t}`,
    less_than: (t) => `meno di ${t}`,
    at_least: (t) => `almeno ${t}`,
    up_to: (t) => `fino a ${t}`,
    ideal: (t) => `ideale (standard di razza): ${t}`,
    mean: (t) => `media misurata: ${t}`,
    about: (t) => `circa ${t}`,
    until: (t) => `fino a ${t}`,
    until_about: (t) => `fino a circa ${t}`,
    span: (t) => t,
    from: (t) => `a partire da ${t}`,
    last: (t) => {
      // «l’ultimo 25% …», «gli ultimi 6 mesi», «le ultime 2 settimane», «l’ultimo mese».
      if (/%/.test(t)) return `l’ultimo ${t}`;
      const m = t.match(/^([\d,.–-]+)[\s ](.+)$/);
      if (!m) return `gli ultimi ${t}`;
      const fem = /^(or|settiman)/.test(m[2]);
      if (m[1] === "1") return `${fem ? "l’ultima" : "l’ultimo"} ${m[2]}`;
      return `${fem ? "le ultime" : "gli ultimi"} ${m[1]} ${m[2]}`;
    },
    every: (t) => (/^1[\s ]/.test(t) ? `ogni ${t.replace(/^1[\s ]/, "")}` : `ogni ${t}`),
    expectancy: (t) => `aspettativa di vita alla nascita: ${t}`,
    smaller_meals: (t) => `${t}, in porzioni più piccole`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "anno", "anni")}`,
    months: (t, n) => `${t} ${s(n, "mese", "mesi")}`,
    days: (t, n) => `${t} ${s(n, "giorno", "giorni")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "ora", "ore")} al giorno` : `${t} ${s(n, "minuto", "minuti")} al giorno`),
    meals_per_day: (t, n) => `${t} ${s(n, "pasto", "pasti")} al giorno`,
    times_per_day: (t, n) => `${t} ${s(n, "volta", "volte")} al giorno`,
    hours_per_day: (t, n) => `${t} ${s(n, "ora", "ore")} al giorno`,
    ml_per_kg_day: (t) => `${t} ml per kg di peso corporeo al giorno`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}% dell’aspettativa di vita prevista`,
  },
  males: "maschi",
  females: "femmine",
  or: " o ",
  notes: { size_class_guidance: "indicazione per la sua classe di taglia" },
  stageLabels: {
    dog: { puppy: "Cucciolo", young: "Cane giovane", adult: "Adulto", senior: "Anziano" },
    cat: { puppy: "Gattino", young: "Gatto giovane", adult: "Gatto maturo", senior: "Anziano" },
  },
  activity: {
    steps: (n, raw) => `${n} ${s(raw, "passo", "passi")}`,
    steps_range: (from, to) => `${from} → ${to} passi`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} passi per ogni mese di età (${first} all’arrivo), fino a ${cap} dal ${capMonth}° mese`,
    play_sessions: (n) => `${n} ${s(n, "sessione", "sessioni")} di gioco`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Obiettivo di passi = minuti di movimento quotidiano × ${p.per_minute} passi: a un adulto servono ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "ora", "ore")}` : `${p.minutes} ${s(p.minutes, "minuto", "minuti")}`}, quindi ${f.num(p.steps)} passi al giorno.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Impara i comandi più lentamente del cane meticcio del piano gratuito (a una velocità pari a ${f.num(p.multiplier)} volte la sua).`
        : p.multiplier === 1
          ? "Impara i comandi alla stessa velocità del cane meticcio del piano gratuito."
          : `Impara i comandi a una velocità pari a ${f.num(p.multiplier)} volte quella del cane meticcio del piano gratuito.`,
    senior_share: (p, f) => `Diventa anziano al ${p.months}° mese (${f.num(p.months / 12, 1)} ${s(p.months / 12, "anno", "anni")}): l’ultimo quarto dell’aspettativa di vita prevista della razza.`,
    walk_sensor: () => "Le passeggiate contano i passi reali da Apple Health o Health Connect (con autorizzazione, in sola lettura) e dal sensore di movimento del telefono, senza GPS.",
    play_instead_of_steps: (p, f) =>
      `Niente passeggiate: un gatto adulto ha bisogno di ${p.sessions} ${s(p.sessions, "sessione", "sessioni")} di gioco al giorno con una canna da gioco, ad almeno ${f.num(p.gap_minutes / 60)} ${s(p.gap_minutes / 60, "ora", "ore")} di distanza l’una dall’altra.`,
    litter_rule: (p) =>
      `Lettiera: un gatto adulto la usa ${p.uses} ${s(p.uses, "volta", "volte")} al giorno; ogni volta va pulita ${p.scoop_hours === 1 ? "entro un’ora" : `entro ${p.scoop_hours} ore`} (fuori dalle ore di quiete) e tutta la sabbia va cambiata ${p.change_days === 1 ? "ogni giorno" : `ogni ${p.change_days} giorni`}.`,
    scratching_after_missed_play: () => "Dopo una giornata con troppo poco gioco, il gatto graffia qualcosa una volta; il bambino lo porta al tiragraffi.",
    grooming_rule: (p) => (p.per_week === 1 ? "Pettinatura una volta alla settimana." : p.per_week === 2 ? "Pettinatura due volte alla settimana." : `Pettinatura ${p.per_week} volte alla settimana.`),
    no_walk_in_heat: (p) =>
      `In estate (da giugno ad agosto; da dicembre a febbraio nell’emisfero australe) le schermate del bambino e della passeggiata mostrano un promemoria discreto tra le ${hhmm(p.from)} e le ${hhmm(p.to)} (ora locale della famiglia): niente passeggiate col caldo. Nessun dato meteo, nessuna penalità: i passi contano comunque.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "pulire le pieghe della pelle",
        tooth_brushing: "lavare i denti",
        ear_cleaning: "controllare e pulire le orecchie",
        nail_trim: "tagliare le unghie",
        bath: "fare il bagno",
        groomer_visit: "andare dal toelettatore",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "ogni giorno"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "una volta alla settimana"
              : `ogni ${q.period_days / 7} settimane`
            : q.period_days === 7
              ? `${q.times} ${s(q.times, "volta", "volte")} alla settimana`
              : q.times === 1
                ? `ogni ${q.period_days} giorni`
                : `${q.times} ${s(q.times, "volta", "volte")} ogni ${q.period_days} giorni`;
      const who = q.actor === "parent" ? "un promemoria per il genitore" : "un compito per il bambino";
      return `Cura: ${what}, ${when} (${who}).`;
    },
  },
  checklist: {
    items: {
      see_mother: "Assicurati di vedere il cucciolo insieme alla madre, nel luogo in cui è nato.",
      min_age_puppy: "Il cucciolo non dovrebbe lasciare la madre prima delle 8 settimane di età.",
      pedigree_fci: "Chiedi il pedigree. Secondo le regole FCI, il pedigree può essere rilasciato solo se la genealogia è corretta.",
      parents_health_tests: "Chiedi di vedere i risultati dei test di salute di entrambi i genitori. Quali test contano dipende dalla razza.",
      breed_club_rules: "I club cinofili nazionali possono stabilire regole di allevamento che vanno oltre quelle della FCI: chiedi al club di razza quali test servono ai genitori.",
      written_contract: "Chiedi un contratto di vendita scritto che riporti l’origine e lo stato di salute del cucciolo.",
      kitten_see_mother: "Assicurati di vedere il gattino insieme alla madre, nel luogo in cui vivono i gattini.",
      kitten_min_age: "Secondo le regole FIFe sui pedigree, un gattino non va in una nuova casa prima delle 14 settimane di età.",
      kitten_vaccination: "Il gattino ha completato le vaccinazioni (panleucopenia, calicivirus, herpesvirus) e ha il libretto delle vaccinazioni.",
      kitten_pedigree: "Un gattino con pedigree ha un certificato genealogico che riporta almeno tre generazioni.",
      kitten_parents_tests: "Chiedi se uno dei genitori ha avuto problemi di salute che il gattino potrebbe ereditare.",
    },
    tests: {
      hip_scheme: "Screening radiografico delle anche per la displasia dell’anca (Regno Unito: programma BVA/KC)",
      elbow_scheme: "Screening radiografico dei gomiti per la displasia del gomito (Regno Unito: programma BVA/KC)",
      eye_scheme: "Visita oculistica da parte di un veterinario specialista in oftalmologia (Regno Unito: programma BVA/KC/ISDS; per alcune razze con gonioscopia)",
      heart_scheme: "Screening cardiaco per la malattia della valvola mitrale",
      boas_grading: "Test respiratorio per la sindrome brachicefalica ostruttiva delle vie aeree (valutazione BOAS)",
      ivdd_screening: "Screening della colonna per la malattia del disco intervertebrale (IVDD)",
      hearing_baer: "Test dell’udito per la sordità (BAER)",
      cm_sm_mri: "Screening con risonanza magnetica per la malformazione simil-Chiari e la siringomielia (Regno Unito: programma BVA/KC CM/SM)",
      inbreeding_coi: "Diversità genetica: controlla il coefficiente di consanguineità",
      dna_prcd_pra: "Test del DNA per l’atrofia progressiva della retina (prcd-PRA)",
      dna_rcd4_pra: "Test del DNA per l’atrofia progressiva della retina (rcd4)",
      dna_gr_pra2: "Test del DNA per l’atrofia progressiva della retina (GR_PRA2)",
      dna_cnm: "Test del DNA per la miopatia centronucleare (CNM)",
      dna_eic: "Test del DNA per il collasso indotto dall’esercizio (EIC)",
      dna_hnpk: "Test del DNA per la paracheratosi nasale ereditaria (HNPK)",
      dna_sd2: "Test del DNA per la displasia scheletrica 2 (SD2)",
      dna_mcd: "Test del DNA per la distrofia corneale maculare (MCD)",
      dna_stgd: "Test del DNA per la malattia di Stargardt (STGD)",
      dna_cc_de: "Test del DNA per la sindrome del pelo riccio e dell’occhio secco (CC/DE)",
      dna_ef: "Test del DNA per le cadute episodiche (EF)",
      dna_cea: "Test del DNA per l’anomalia dell’occhio del collie (CEA/CH)",
      dna_cl: "Test del DNA per la lipofuscinosi ceroide (CL)",
      dna_igs: "Test del DNA per la sindrome di Imerslund-Gräsbeck (IGS)",
      dna_mdr1: "Test del DNA per la sensibilità a più farmaci (MDR1)",
      dna_tns: "Test del DNA per la sindrome dei neutrofili intrappolati (TNS)",
      dna_sn: "Test del DNA per la neuropatia sensoriale (SN)",
      dna_ggd: "Test del DNA per la goniodisgenesia e il rischio di glaucoma (GGD)",
      dna_raines: "Test del DNA per la sindrome di Raine",
      dna_dm: "Test del DNA per la mielopatia degenerativa (DM)",
      dna_de: "Test del DNA per l’encefalopatia degenerativa (DE)",
      dna_jadd: "Test del DNA per il morbo di Addison giovanile (JADD)",
      dermoid_sinus_scheme: "Controllo dei cuccioli per il seno dermoide (programma del club di razza)",
      dna_jme: "Test del DNA per l’epilessia mioclonica giovanile (JME)",
      dna_je: "Test del DNA per l’epilessia giovanile (JE)",
      dna_lsd: "Test del DNA per la malattia da accumulo lisosomiale (LSD)",
      dna_ampn: "Test del DNA per la polineuropatia dell’alaskan malamute (AMPN)",
      dna_fanconi: "Test del DNA per la sindrome di Fanconi (una malattia renale)",
      dna_pra_bj1: "Test del DNA per l’atrofia progressiva della retina nel basenji (PRA-BJ1)",
      thyroid_scheme: "Esami della tiroide dei genitori",
      dna_pap_pra1: "Test del DNA per l’atrofia progressiva della retina nel papillon (Pap-PRA1)",
      dna_nad: "Test del DNA per la distrofia neuroassonale (NAD)",
      dna_eopra: "Test del DNA per l’atrofia progressiva della retina a esordio precoce (EOPRA)",
      dna_cu: "Test del DNA per la cistinuria (CU), una malattia ereditaria che causa calcoli renali e vescicali",
      heart_echo_scheme: "Screening cardiaco con ecografia Doppler a colori (programma del club di razza)",
      cardiac_exam: "Visita cardiologica dei genitori (raccomandazione del club di razza)",
      dna_rd_osd: "Test del DNA per la displasia retinica / displasia oculo-scheletrica (RD/OSD)",
      dna_xlpra1: "Test del DNA per l’atrofia progressiva della retina legata al cromosoma X (XLPRA1)",
      dna_cmo: "Test per l’osteopatia cranio-mandibolare (CMO), un disturbo osseo ereditario della mandibola",
      dna_hsf4: "Test del DNA per la cataratta ereditaria (HSF4)",
      dna_lafora: "Test del DNA per la malattia di Lafora",
      dna_nccd: "Test del DNA per la degenerazione corticale cerebellare neonatale (NCCD)",
      dna_fviid: "Test del DNA per la carenza di fattore VII (FVIID)",
      dna_mls: "Test del DNA per la sindrome di Musladin-Lueke (MLS)",
      dna_vwd1: "Test del DNA per la malattia di von Willebrand di tipo 1 (vWD1)",
      dna_mac: "Test del DNA per la predisposizione all’infezione da Mycobacterium avium complex (MAC)",
      dna_imgd: "Test del DNA per la miopatia ereditaria dell’alano (IMGD), una malattia che causa perdita di massa muscolare",
      dna_poag: "Test del DNA per il glaucoma primario ad angolo aperto (POAG), una malattia ereditaria degli occhi che può portare alla cecità",
      dna_aon: "Test del DNA per la neuropatia a esordio in età adulta (AON), una malattia ereditaria dei nervi",
      dna_fn: "Test del DNA per la nefropatia familiare (FN), una malattia renale ereditaria",
      patella_scheme: "Controllo delle rotule per la lussazione della rotula prima della riproduzione",
      kidney_scheme: "Ecografia dei reni per un rene mancante o malformato (raccomandazione del club di razza)",
      kidney_upc_scheme: "Esame delle urine (rapporto proteine/creatinina) per le malattie renali (raccomandazione del club di razza)",
      dna_gld: "Test del DNA per la leucodistrofia a cellule globoidi (GLD), una malattia ereditaria dei nervi",
      liver_shunt_scheme: "Controllo del fegato per uno shunt portosistemico o una displasia microvascolare (raccomandazione del club di razza)",
      breed_health_scheme: "Il programma di salute del club di razza per i genitori",
      hemivertebrae_scheme: "Radiografia della colonna dei genitori per le emivertebre (vertebre malformate), dopo i 12 mesi di età",
      dna_hcm_mc: "Test del DNA per la cardiomiopatia ipertrofica (MC HCM)",
      dna_sma: "Test del DNA per l’atrofia muscolare spinale (SMA)",
      dna_pk_def: "Test del DNA per il deficit di piruvato chinasi (PK def)",
      hcm_negative: "I gatti riproduttori devono risultare negativi all’HCM (malattia cardiaca: cardiomiopatia ipertrofica)",
      dna_gsd4: "Test del DNA per la glicogenosi di tipo IV (GSD IV)",
      dna_pra_b: "Test del DNA per l’atrofia progressiva della retina nel bengala (PRA-b)",
      dna_jlpp: "Test del DNA per la paralisi laringea giovanile e polineuropatia (JLPP)",
      dna_lemp2: "Test del DNA per la leucoencefalomielopatia (LEMP-2)",
      dna_huu: "Test del DNA per l’iperuricosuria (HUU)",
      dna_dcm: "Test del DNA per la cardiomiopatia dilatativa (DCM), una malattia del muscolo cardiaco",
      dna_pra5: "Test del DNA per l’atrofia progressiva della retina (PRA5)",
      dna_dings2: "Test del DNA per la malattia del dobermann danzante (dancing Dobermann disease, DINGS2), un disturbo dei nervi e dei muscoli",
      dna_ams: "Test del DNA per la sindrome da mutilazione acrale (AMS), un disturbo nervoso che toglie la sensibilità al dolore nelle zampe",
      dna_dams: "Test del DNA per la sindrome da anemia diseritropoietica e miopatia (DAMS), un disturbo del sangue e dei muscoli",
      dna_fuco: "Test del DNA per la fucosidosi, una malattia ereditaria del sistema nervoso",
      dna_pfk: "Test del DNA per il deficit di fosfofruttochinasi (PFK), un disturbo enzimatico ereditario del sangue e dei muscoli",
      dna_pra_cord1: "Test del DNA per l’atrofia progressiva della retina (PRA cord1)",
      dna_bbs2_pra: "Test del DNA per l’atrofia progressiva della retina (BBS2-PRA)",
      dna_cnga1_pra: "Test del DNA per l’atrofia progressiva della retina (CNGA1-PRA)",
      dna_pra_rcd2: "Test del DNA per l’atrofia progressiva della retina (PRA-rcd2)",
      dna_gm1: "Test del DNA per la gangliosidosi GM1 (una malattia ereditaria del sistema nervoso)",
      dna_gm2: "Test del DNA per la gangliosidosi GM2 (una malattia ereditaria del sistema nervoso)",
      dna_vwd3: "Test del DNA per la malattia di von Willebrand di tipo 3 (vWD3), un disturbo ereditario della coagulazione",
      dna_pra_rcd3: "Test del DNA per l’atrofia progressiva della retina (PRA-rcd3)",
      dna_vwd2: "Test del DNA per la malattia di von Willebrand di tipo 2 (vWD2), un disturbo ereditario della coagulazione",
      dna_l2hga: "Test del DNA per l’aciduria L-2-idrossiglutarica (L-2-HGA), una malattia metabolica ereditaria del sistema nervoso",
      dna_pll: "Test del DNA per la lussazione primaria del cristallino (PLL), una malattia ereditaria degli occhi in cui il cristallino si sposta dalla sua sede",
      dna_loa: "Test del DNA per l’atassia a esordio tardivo (LOA), una malattia ereditaria che compromette equilibrio e coordinazione",
      dna_sca: "Test del DNA per l’atassia spinocerebellare (SCA), una malattia ereditaria del sistema nervoso",
    },
  },
  health: {
    weight_gain: "Ingrassa facilmente: bisogna tenere d’occhio porzioni e premi.",
    hip_elbow_dysplasia_eye_conditions: "Può essere predisposto alla displasia dell’anca e del gomito e a diverse malattie ereditarie degli occhi.",
    cancer_risk: "Le fonti descrivono un rischio di tumori più alto in questa razza.",
    flat_face_breathing: "Razza dal muso schiacciato (brachicefala): il muso corto, le narici strette e il tessuto molle in eccesso nelle vie aeree possono rendere più difficile la respirazione (sindrome brachicefalica ostruttiva delle vie aeree, BOAS).",
    heat_stroke_risk: "Si surriscalda in fretta ed è più esposto al colpo di calore rispetto alla maggior parte dei cani, soprattutto quando fa caldo.",
    skin_fold_ear_problems: "Predisposto alle infiammazioni delle orecchie e alle infezioni delle pieghe cutanee; le pieghe della pelle vanno tenute pulite e asciutte.",
    ear_infections_long_ears: "Le orecchie lunghe possono favorire le infezioni auricolari: nel condotto uditivo possono accumularsi batteri.",
    collie_eye_pra: "Nella razza si presentano malattie ereditarie degli occhi: l’anomalia dell’occhio del collie, un’alterazione della parte posteriore dell’occhio, e l’atrofia progressiva della retina, che può portare lentamente alla cecità; sono disponibili visite oculistiche e test del DNA.",
    merle_colour_risk: "Il merle non è un colore previsto dallo standard di razza; in questa razza comporta un rischio più alto di problemi di udito e di vista.",
    hind_leg_conformation: "Il Royal Kennel Club indica la forma degli arti posteriori e il modo di muoversi del cane come un punto critico di questa razza; un cane sano ha il dorso orizzontale e arti posteriori moderati.",
    hip_elbow_dysplasia: "Può essere predisposto alla displasia dell’anca e del gomito; agli allevatori si consiglia di far controllare anche e gomiti dei genitori prima della riproduzione.",
    degenerative_myelopathy: "Nella razza si presenta la mielopatia degenerativa, una malattia del midollo spinale che indebolisce lentamente le zampe posteriori; è disponibile un test del DNA.",
    exercise_induced_collapse: "Nella razza si presenta il collasso indotto dall’esercizio, una malattia neuromuscolare ereditaria che può far crollare il cane dopo uno sforzo intenso.",
    heart_valve_disease: "La malattia cardiaca causata dall’indebolimento della valvola mitrale è un problema importante in questa razza; spesso la si nota per la prima volta come soffio al cuore, e i cani destinati alla riproduzione dovrebbero prima ricevere una valutazione cardiaca.",
    chiari_syringomyelia: "Nella razza si presentano la malformazione simil-Chiari e la siringomielia, una condizione dolorosa con cavità piene di liquido nel midollo spinale vicino al cervello, legata alla forma del cranio; si diagnostica con la risonanza magnetica.",
    eye_conditions: "Nella razza si presentano malattie ereditarie degli occhi come la cataratta, e gli occhi sporgenti o irritati sono un punto critico; sono disponibili visite oculistiche e test del DNA.",
    epilepsy: "Nella razza si presenta l’epilessia, un disturbo cerebrale che può causare convulsioni.",
    storage_disease: "Una malattia ereditaria da accumulo del sistema nervoso può colpire i cani giovani della razza; un test del DNA dei genitori permette agli allevatori di evitarla.",
    chondrodysplasia: "Nella razza si presenta la condrodisplasia, un disturbo della crescita della cartilagine e delle ossa; i cuccioli possono essere controllati con una radiografia.",
    polyneuropathy: "Nella razza si presenta una malattia ereditaria dei nervi (polineuropatia); un test del DNA dei genitori permette agli allevatori di evitarla.",
    fanconi_syndrome: "Nella razza si presenta la sindrome di Fanconi, una malattia renale ereditaria che fa passare lo zucchero nelle urine; un test del DNA dei genitori permette agli allevatori di evitarla.",
    pyruvate_kinase_deficiency: "Nella razza può presentarsi il deficit di piruvato chinasi, un difetto ereditario dei globuli rossi che causa anemia.",
    back_disc_disease: "Nella razza si presenta la malattia del disco intervertebrale, un problema dei dischi che fanno da cuscinetto tra le vertebre della schiena.",
    pra_eye_disease: "Nella razza si presenta l’atrofia progressiva della retina, una malattia ereditaria degli occhi che può portare lentamente alla cecità; sono disponibili test del DNA e visite oculistiche.",
    hip_dysplasia: "Nella razza si presenta la displasia dell’anca, un’articolazione dell’anca sviluppata male che può portare all’artrite; agli allevatori si consiglia di far valutare le anche dei genitori.",
    bloat_gdv: "Nella razza può verificarsi la dilatazione-torsione gastrica, in cui lo stomaco si torce: è un’emergenza che richiede subito il veterinario.",
    inherited_eye_disease: "Nella razza si presentano malattie ereditarie degli occhi, come l’anomalia dell’occhio del collie, la cataratta e l’atrofia progressiva della retina.",
    drug_sensitivity_mdr1: "Alcuni cani della razza hanno una sensibilità ereditaria a certi farmaci (sensibilità a più farmaci, MDR1): se riguarda il tuo cane, dillo al veterinario.",
    merle_to_merle_breeding: "In questa razza il merle è un colore previsto dallo standard; due cani merle non dovrebbero essere accoppiati tra loro, perché i loro cuccioli rischiano problemi di vista e di udito: il Royal Kennel Club non li registra.",
    kneecap_luxation: "Nella razza si presenta la lussazione della rotula, in cui la rotula esce temporaneamente dalla sua sede.",
    pra_and_eyelashes: "Nella razza si presentano problemi agli occhi: l’atrofia progressiva della retina, che può portare lentamente alla cecità, e ciglia in più che sfregano sull’occhio (distichiasi); agli allevatori si consiglia di far controllare gli occhi dei genitori.",
    liver_shunt: "Nella razza può presentarsi uno shunt portosistemico (epatico), in cui il sangue aggira il fegato.",
    skin_allergies: "Le allergie cutanee sono un problema noto nella razza; il Royal Kennel Club chiede ai giudici di cercare segni di infiammazione della pelle, e ai proprietari si consiglia di chiedere al veterinario prima di scegliere uno shampoo.",
    westie_lung: "Nella razza può presentarsi una malattia polmonare nota come «polmone del westie» (fibrosi polmonare idiopatica), che rende più difficile respirare, soprattutto nei cani anziani.",
    jaw_bone_disorder: "Nella razza può presentarsi un disturbo osseo ereditario della mandibola.",
    dry_eye: "Nella razza può presentarsi l’occhio secco: gli occhi non producono abbastanza lacrime e diventano secchi e doloranti.",
    heart_hcm: "Nella razza si presenta la cardiomiopatia ipertrofica (HCM), una malattia cardiaca ereditaria in cui il muscolo del cuore si ispessisce.",
    dental_weight_nail_care: "Un ampio studio britannico indica le malattie dentali, il sovrappeso e le unghie troppo lunghe tra i problemi più comuni della razza, quindi ai proprietari si consiglia di curare con costanza i denti, il peso e le unghie.",
    dental_weight_care: "PetMD indica le malattie dentali e il sovrappeso tra i problemi da tenere d’occhio, quindi ai proprietari si consiglia di lavare regolarmente i denti al gatto e di tenerne sotto controllo il peso.",
    gsd_iv: "Nella razza si presenta la glicogenosi di tipo IV (GSD IV), un disturbo ereditario che colpisce i gattini; un test del DNA dei genitori permette agli allevatori di evitarla.",
    hip_dysplasia_weight: "Nella razza può presentarsi la displasia dell’anca, un’articolazione dell’anca sviluppata male; PetMD consiglia di mantenere il gatto a un peso sano per proteggerne le articolazioni.",
    laryngeal_paralysis_polyneuropathy: "Nella razza si presenta la paralisi laringea giovanile e polineuropatia (JLPP), una malattia ereditaria dei nervi che colpisce la laringe e le zampe posteriori; un test del DNA dei genitori permette agli allevatori di evitarla.",
    heart_sas: "Nella razza si presenta la stenosi subaortica, un restringimento appena sotto una valvola cardiaca che può causare un soffio; i cani destinati alla riproduzione dovrebbero prima far controllare il cuore.",
    inherited_eye_defects: "Nella razza si presentano malattie ereditarie degli occhi, come la displasia retinica e la membrana pupillare persistente; sono disponibili visite oculistiche.",
    skin_fold_infections: "Le pieghe della pelle, soprattutto sul muso, possono trattenere umidità e infettarsi (piodermite delle pieghe cutanee); le rughe del muso vanno pulite ogni giorno.",
    eyelid_eye_problems: "Nella razza si presentano problemi alle palpebre (palpebre rivolte verso l’interno o verso l’esterno), occhio secco e «cherry eye»; sono disponibili visite oculistiche.",
    hip_elbow_joint_disease: "Nella razza si presentano la displasia dell’anca e del gomito, in cui le articolazioni non si sviluppano correttamente, che possono portare a malattie articolari.",
    hip_dysplasia_arthritis: "Nella razza si presenta la displasia dell’anca, un’articolazione dell’anca lassa e sviluppata male, che col tempo può portare all’artrite.",
    bleeding_disorder_vwd: "Nella razza si presenta la malattia di von Willebrand, un problema ereditario della coagulazione del sangue che può causare sanguinamenti eccessivi.",
    heart_muscle_disease: "Nella razza può presentarsi la cardiomiopatia, un ingrossamento del cuore causato dall’indebolimento del muscolo cardiaco.",
    itchy_skin_allergy: "Nella razza possono presentarsi allergie cutanee (atopia), che causano prurito e pelle irritata.",
    entropion_cherry_eye: "Nella razza possono presentarsi palpebre rivolte verso l’interno (entropion) e «cherry eye», in cui la terza palpebra fuoriesce; il cherry eye si può correggere chirurgicamente.",
    dental_disease_tooth_brushing: "Un ampio studio britannico indica le malattie dentali come il problema di gran lunga più comune della razza, e sono frequenti anche i denti da latte che non cadono, quindi ai proprietari si consiglia di curare ogni giorno i denti del cane, per esempio lavandoli.",
    windpipe_collapse: "Nella razza può presentarsi il collasso tracheale, in cui la trachea perde rigidità e può causare debolezza e collasso.",
    eye_problems_pra_lens_dry_eye: "Nella razza si presentano problemi agli occhi, come l’atrofia progressiva della retina, che può portare lentamente alla cecità, lo spostamento del cristallino (lussazione del cristallino) e l’occhio secco.",
    cataracts_lens_luxation: "Nella razza possono presentarsi problemi agli occhi, come la cataratta, che rende opaco il cristallino, e lo spostamento del cristallino (lussazione del cristallino).",
    wobbler_syndrome: "Nella razza può presentarsi la sindrome di Wobbler, in cui vertebre instabili del collo premono sul midollo spinale e indeboliscono le zampe posteriori.",
    eye_phpv: "Nella razza può presentarsi un difetto dell’occhio presente dalla nascita (vitreo primario iperplastico persistente, PHPV); agli allevatori si consiglia di far controllare gli occhi dei genitori.",
    certain_cancers: "Nella razza possono presentarsi alcuni tipi di tumore.",
    bare_skin_sun_cold: "La pelle nuda della varietà senza pelo va protetta dal sole e dal freddo.",
    l2hga_nervous_system: "Nella razza può presentarsi l’aciduria L-2-idrossiglutarica (L-2-HGA), un disturbo metabolico ereditario che colpisce il sistema nervoso; è disponibile un test del DNA dei genitori.",
    short_face_breathing: "Razza dal muso moderatamente corto: alcuni cani con il muso più corto possono avere gravi problemi respiratori (sindrome brachicefalica ostruttiva delle vie aeree, BOAS).",
    corneal_ulcers: "Problemi agli occhi come le ulcere corneali sono più probabili a causa della forma del cranio e degli occhi sporgenti; sono disponibili visite oculistiche.",
    skin_folds_allergies: "Possono presentarsi problemi della pelle come allergie, verruche, escrescenze cutanee e pieghe del muso irritate (dermatite delle pieghe cutanee); le pieghe del muso vanno tenute pulite e asciutte.",
    heart_cardiomyopathy_aortic_stenosis: "Nella razza possono presentarsi problemi cardiaci come la cardiomiopatia e la stenosi aortica.",
    dental_disease_care: "Un ampio studio britannico indica le malattie dentali come il problema più comune della razza, e ai proprietari si consiglia di dare priorità alla cura dei denti.",
    bladder_stones: "Nella razza possono presentarsi calcoli vescicali, aggregati di minerali che si formano nella vescica e nelle urine.",
    deafness: "Nella razza si presenta la sordità a uno o a entrambi gli orecchi; l’udito dei cuccioli si può controllare con un test BAER.",
    mitral_valve_disease: "Nella razza si presenta la malattia della valvola mitrale, una patologia cardiaca in cui una valvola indebolita lascia refluire il sangue nel cuore; un veterinario può auscultare il cuore dei cani prima che vengano usati per la riproduzione.",
    eye_problems_pra_cataracts_dry_eye: "Nella razza si presentano problemi agli occhi, come l’atrofia progressiva della retina, che può portare lentamente alla cecità, la cataratta e l’occhio secco; sono disponibili visite oculistiche.",
    skin_comedo_allergy: "Possono presentarsi problemi della pelle, come la sindrome comedonica dello schnauzer (un tipo di infiammazione dei follicoli piliferi) e allergie cutanee (atopia) che causano prurito.",
    shorter_face_boas: "Razza brachicefala (dal muso corto): il muso più corto può causare gravi problemi respiratori (sindrome brachicefalica ostruttiva delle vie aeree, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Nella razza si presentano problemi agli occhi, come l’occhio secco, la cataratta, l’atrofia progressiva della retina, che può portare lentamente alla cecità, e il distacco della retina.",
    hypothyroidism: "Nella razza può presentarsi una tiroide poco attiva (ipotiroidismo), che può influire su peso, pelle e livello di energia.",
    open_fontanelle: "Nella razza può presentarsi una fontanella aperta, un punto morbido del cranio che non si chiude del tutto.",
    collapsing_trachea: "Nella razza può presentarsi il collasso della trachea, una debolezza della trachea che può causare tosse e difficoltà respiratorie.",
    gm1_gangliosidosis: "Nella razza può presentarsi la gangliosidosi GM1, una malattia ereditaria del sistema nervoso; un test del DNA dei genitori può escluderla.",
    addisons_disease: "Nella razza può presentarsi il morbo di Addison, una carenza di ormoni prodotti dalle ghiandole surrenali.",
    protein_losing_disease: "Nella razza possono presentarsi malattie dei reni o dell’intestino con perdita di proteine, che possono causare diarrea e perdita di peso.",
    diabetes_mellitus: "Nella razza può presentarsi il diabete mellito, in cui l’organismo non riesce a regolare correttamente lo zucchero nel sangue.",
    dental_disease_home_brushing: "Come molti cani di piccola taglia, la razza è predisposta alle malattie dentali, quindi si consiglia di lavare i denti a casa con uno spazzolino e un dentifricio per cani.",
    dermoid_sinus: "Nella razza può presentarsi il seno dermoide, una condizione dolorosa in cui un canale nella pelle del dorso è collegato al midollo spinale; i club di razza hanno un programma di controllo del seno dermoide per i cuccioli.",
    cataracts: "Nella razza può presentarsi la cataratta, che rende opaco il cristallino dell’occhio e può portare alla perdita della vista.",
    pra_inherited_blindness: "Nella razza può presentarsi l’atrofia progressiva della retina, una malattia ereditaria degli occhi che può portare lentamente alla cecità.",
    eyelids_turned: "Nella razza possono presentarsi palpebre rivolte verso l’interno (entropion) o verso l’esterno (ectropion); chiedi se gli occhi dei genitori sono stati controllati.",
    glaucoma_poag: "Nella razza può presentarsi il glaucoma primario ad angolo aperto, in cui il liquido si accumula all’interno dell’occhio e causa dolore e, a volte, cecità; esiste un test del DNA per i genitori.",
    skin_fold_dermatitis: "La pelle abbondante forma pieghe che possono irritarsi e infettarsi; vanno controllate ogni giorno e tenute pulite e asciutte.",
    eyelid_problems: "Nella razza possono presentarsi problemi alle palpebre: palpebre rivolte verso l’interno (entropion) o verso l’esterno (ectropion) e «cherry eye», in cui la terza palpebra fuoriesce.",
    skin_allergy_face_folds: "Nella razza possono presentarsi allergie cutanee (atopia) che causano prurito, e le pieghe della pelle sul muso vanno pulite ogni giorno.",
    skin_ear_allergies: "Nella razza possono presentarsi allergie ambientali, che possono portare a infezioni ricorrenti della pelle o delle orecchie; PetMD suggerisce di pulire le orecchie una volta alla settimana nei cani con allergie.",
    gum_disease_daily_brushing: "La razza è predisposta alle malattie delle gengive (gengivite e malattia parodontale), quindi PetMD consiglia di lavare i denti al cane ogni giorno e di fare un controllo dentale annuale dal veterinario.",
    pra_pk_def: "Nella razza si presentano due malattie ereditarie: l’atrofia progressiva della retina, una malattia degli occhi che può portare alla cecità, e il deficit di piruvato chinasi, un disturbo del sangue; i test del DNA dei genitori permettono agli allevatori di evitarle.",
    windpipe_collapse_breathing: "Nella razza può presentarsi il collasso tracheale, in cui gli anelli della trachea si afflosciano e rendono difficile la respirazione.",
    eye_problems_pra_cataracts_entropion: "Nella razza si presentano problemi agli occhi, come l’atrofia progressiva della retina, che può portare lentamente alla cecità, la cataratta, che rende opaco il cristallino, e palpebre rivolte verso l’interno (entropion); sono disponibili visite oculistiche.",
    elbow_dysplasia_arthritis: "Nella razza può presentarsi la displasia del gomito, un’articolazione del gomito sviluppata male che col tempo può portare all’artrite.",
    entropion: "Nella razza può presentarsi l’entropion, in cui le palpebre si rivolgono verso l’interno e irritano l’occhio; chiedi se gli occhi dei genitori sono stati controllati.",
    autoimmune_conditions: "Nella razza possono presentarsi malattie autoimmuni, in cui l’organismo reagisce contro sé stesso.",
    ear_infections_prone: "La razza è predisposta alle infezioni delle orecchie; presta molta attenzione all’igiene delle orecchie.",
    familial_nephropathy: "Nella razza si presenta una malattia renale ereditaria (nefropatia familiare); è disponibile un test del DNA dei genitori.",
    hereditary_nephritis: "Nella razza si presenta una malattia renale ereditaria (nefrite ereditaria, chiamata anche glomerulopatia ereditaria del samoiedo).",
    panosteitis: "Nella razza può presentarsi la panosteite, un’infiammazione dolorosa delle ossa lunghe che di solito colpisce i cani giovani in crescita.",
    urinary_incontinence: "Nella razza può presentarsi l’incontinenza urinaria, una perdita involontaria di urina.",
    osteochondritis: "Nella razza può presentarsi l’osteocondrite dissecante (OCD), un disturbo della cartilagine articolare nei cani in crescita.",
    scottie_cramp: "Nella razza si presenta lo «scottie cramp»: brevi episodi di crampi muscolari, di solito scatenati dall’eccitazione; non è doloroso.",
    periodontal_disease: "La malattia parodontale, un’infezione e infiammazione delle gengive e dei tessuti che sostengono i denti, è un problema noto nella razza.",
    extra_eyelashes: "Nella razza può presentarsi la distichiasi, in cui piccole ciglia in più crescono sulla superficie interna o sul bordo della palpebra e possono sfregare sull’occhio; chiedi se i genitori sono stati controllati secondo il programma oculistico.",
    cm_sm_screening: "Nella razza possono presentarsi la malformazione simil-Chiari e la siringomielia, una condizione dolorosa con cavità piene di liquido nel midollo spinale vicino al cervello; agli allevatori si consiglia di sottoporre a screening i genitori (Regno Unito: programma BVA/KC).",
    prominent_eyes_injury_dry_eye: "Gli occhi sporgenti si feriscono più facilmente e possono sviluppare ulcere e secchezza; nella razza si presentano anche l’occhio secco e il «cherry eye».",
    legg_perthes: "Nella razza può presentarsi la malattia di Legg-Perthes, una condizione dolorosa in cui l’articolazione dell’anca va incontro a necrosi e si sgretola.",
    glaucoma: "Nella razza può presentarsi il glaucoma, un aumento della pressione all’interno dell’occhio che può essere doloroso e portare alla cecità.",
    lethal_acrodermatitis: "Nella razza si presenta l’acrodermatite letale, una malattia ereditaria che causa gravi problemi della pelle e della crescita nei cuccioli.",
    kidney_disease_urine_screening: "Nella razza si presentano problemi renali; gli esami delle urine permettono di controllare i genitori prima della riproduzione.",
    primary_lens_luxation: "Nella razza si presenta la lussazione primaria del cristallino, una malattia ereditaria degli occhi dolorosa in cui il cristallino si sposta dalla sua sede e che può causare cecità; per i cani riproduttori è disponibile un test del DNA.",
    inherited_ataxia: "Nella razza si presentano atassie ereditarie (atassia a esordio tardivo e atassia spinocerebellare), che causano perdita di equilibrio e di coordinazione; per i cani riproduttori sono disponibili test del DNA.",
    hydrocephalus: "Nella razza può presentarsi l’idrocefalo, un accumulo di liquido intorno al cervello.",
    heart_disease_pda: "Nella razza possono presentarsi malattie cardiache, tra cui la pervietà del dotto arterioso, un vaso sanguigno vicino al cuore che non si chiude dopo la nascita; il veterinario può rilevarla all’auscultazione durante la prima visita del cucciolo.",
    chiari_malformation: "Nella razza può presentarsi la malformazione simil-Chiari con siringomielia, una condizione dolorosa con cavità piene di liquido nel midollo spinale vicino al cervello.",
    cataracts_entropion: "Nella razza possono presentarsi la cataratta, che rende opaco il cristallino dell’occhio, e palpebre rivolte verso l’interno (entropion); chiedi se i genitori sono stati controllati secondo il programma oculistico.",
    periodontal_daily_brushing: "La razza è predisposta alle malattie delle gengive (parodontali), quindi si consiglia di lavare i denti ogni giorno con un dentifricio per cani.",
    eye_problems_shallow_sockets: "Nella razza si presentano problemi agli occhi, come l’occhio secco, le infezioni oculari e le ulcere sulla superficie dell’occhio; le orbite poco profonde rendono inoltre più probabili le lesioni agli occhi.",
    eye_problems_dry_eye_entropion_lens_luxation: "Nella razza si presentano problemi agli occhi, come l’occhio secco, palpebre che si arrotolano verso l’interno (entropion) e lo spostamento del cristallino (lussazione del cristallino); sono disponibili visite oculistiche.",
    heart_valve_screening: "Nella razza possono presentarsi malattie cardiache; le ecografie cardiache permettono di controllare i genitori per problemi alle valvole prima della riproduzione.",
    dental_weight_problems: "Un ampio studio britannico indica le malattie dentali e il sovrappeso come problemi particolarmente comuni nella razza, problemi che i proprietari possono aiutare a prevenire; si presentano anche denti affollati e denti da latte che non cadono.",
  },
  page: {
    eyebrow: "Registro degli animali",
    // Search terms people use («gatto ragdoll», «carattere»); «carattere» only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "carattere, " : ""}movimento, taglia e cura | PetPrep`
        : species === "cat"
          ? `${/\bgatto\b/i.test(name) ? name : `Gatto ${rn(name)}`}: ${hasIntro ? "carattere, " : ""}toelettatura, taglia e aspettativa di vita | PetPrep`
          : `${name} (${lc(one)}): esigenze, aspettativa di vita e cura | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Fonti, salute e consigli per l’acquisto.`,
    metaLabels: { weight: "peso", exercise: "movimento", lifespan: "aspettativa di vita" },
    metaDescription: (name, one) =>
      `${name}: le esigenze documentate di questa razza (${lc(one)}) – movimento, toelettatura, pasti, taglia, aspettativa di vita, per chi è adatta – e come la simula PetPrep.`,
    suitabilityTitle: "Per chi è adatta",
    suitabilityNote: "Le stesse etichette dell’app. Ogni etichetta è confermata dalle fonti elencate in fondo alla pagina.",
    suitabilityNone: "Per questa razza non ci sono ancora etichette di idoneità confermate da fonti.",
    needsTitle: "Di che cosa ha bisogno",
    needsIntro: (species) =>
      species === "cat"
        ? "Secondo registri delle razze feline, organizzazioni veterinarie e studi. Quando le fonti non concordano, vengono mostrate tutte."
        : "Secondo standard di razza, club cinofili, organizzazioni veterinarie e studi. Quando le fonti non concordano, vengono mostrate tutte.",
    general: (many) => `Indicazioni generali per i ${lc(many)} (non specifiche della razza):`,
    noData: "Non ancora presente nelle nostre fonti.",
    simTitle: "Come lo simula PetPrep",
    simBadge: "Regole del gioco, non consigli veterinari",
    simIntro:
      "In PetPrep una settimana reale corrisponde a un mese di vita dell’animale. Queste sono le regole che il gioco usa per questa razza. PetPrep le ha scelte in base alle fonti di questa pagina; non sono istruzioni di cura per un animale vero.",
    simInfoOnly: "Questa razza è nel registro solo a scopo informativo; l’app non la simula ancora.",
    simTable: { stage: "Fase della vita", starts: "Inizia", meals: "Pasti al giorno", activity: { steps: "Obiettivo giornaliero di passi", play_sessions: "Gioco al giorno" } },
    arrives: (m) => `arriva a ${m} mesi`,
    fromMonth: (m, years) => (years ? `${m}° mese (${years})` : `${m}° mese`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `dal ${x.from}° mese: ${x.meals}`)).join("; "),
    simDecisions: "Ogni numero del gioco è una decisione di PetPrep registrata con le sue fonti.",
    healthTitle: "Salute",
    healthNote: "Solo a scopo informativo, senza verifica veterinaria. Per il tuo animale chiedi al tuo veterinario.",
    healthNone: "Le nostre fonti non contengono ancora informazioni sulla salute specifiche per questa razza.",
    checklistTitle: "Prima di comprare: che cosa verificare con l’allevatore",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Domande da chiarire prima di portare a casa un gattino. I punti sono consigli di veterinari, associazioni per il benessere animale e federazioni feline; ognuno cita la sua fonte." : "Domande da chiarire prima di portare a casa un cucciolo. I punti sono consigli di veterinari, associazioni per il benessere animale e club cinofili; ognuno cita la sua fonte.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Le leggi su età minima, microchip e vaccinazioni variano da Paese a Paese: verifica le regole del luogo in cui vivi.",
    checklistGeneralTitle: "Per tutte le razze",
    checklistTestsTitle: "Test di salute dei genitori per questa razza",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Test che una federazione felina richiede prima di far riprodurre un gatto" : "Test che il Royal Kennel Club raccomanda come minimo",
      best_practice: "Altri test come buona pratica",
      other_scheme: "Altri programmi di screening per questa razza",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Questo elenco viene dalle regole di allevamento di una federazione felina straniera (vedi la fonte) ed è indicativo. Chiedi all’allevatore quali test hanno fatto i genitori."
        : "Questi elenchi vengono dal Royal Kennel Club del Regno Unito e sono indicativi; i club cinofili nazionali possono stabilire regole proprie, più severe. Chiedi al club di razza e all’allevatore quali test hanno fatto i genitori.",
    checklistStatus: {
      none_recommended: "Al momento il Royal Kennel Club non indica alcuno screening sanitario raccomandato prima della riproduzione per questa razza. Chiedi comunque all’allevatore informazioni sulla salute dei genitori.",
      not_found: "Non abbiamo ancora trovato una fonte affidabile che elenchi i test di salute per i genitori di questa razza. Chiedi al club di razza e all’allevatore quali test hanno fatto i genitori.",
      not_checked: "Non abbiamo ancora verificato i test di salute per i genitori di questa razza. Chiedi al club di razza e all’allevatore quali test hanno fatto i genitori.",
    },
    sourcesTitle: "Fonti",
    sourcesIntro: "Ogni dato di questa pagina cita una di queste fonti.",
    sourceLabel: (id, publisher) => `Fonte ${id}: ${publisher}`,
    disclaimer: "PetPrep è una simulazione per famiglie. Questa pagina non è un consiglio veterinario: per un animale vero, chiedi a un veterinario o al club di razza.",
    backTo: (many) => `Tutti i ${lc(many)}`,
    compareWith: "Confronta con altre razze",
    related: { title: "Razze simili", intro: (many) => `Altri ${lc(many)} del registro con esigenze simili, ognuno con dati confermati da fonti.` },
    updated: "Aggiornato",
    glanceTitle: "In breve",
    glanceNote: "Dati principali dalle fonti in fondo alla pagina. Quando le fonti non concordano, viene indicato ogni valore.",
    portraitAlt: { ai_photo: (name) => `${name}: foto (IA)`, ai_illustration: (name) => `${name}: illustrazione (IA)` },
    portraitCaption: { ai_photo: "Foto generata con l’IA", ai_illustration: "Illustrazione generata con l’IA" },
    portraitColours: {
      legend: "Colore del mantello",
      alt: { ai_photo: (name, colour) => `${name}, ${lc(colour)}: foto (IA)`, ai_illustration: (name, colour) => `${name}, ${lc(colour)}: illustrazione (IA)` },
    },
    share: {
      button: "Condividi",
      title: "Condividi questa razza",
      copy: "Copia",
      copied: "Copiato",
      linkLabel: "Link a questa pagina",
      more: "Altre opzioni",
      text: (name) => `${name}: esigenze, fonti e come lo simula PetPrep`,
      emailSubject: (name) => `${name} | Registro degli animali di PetPrep`,
      on: (network) => `Condividi su ${network}`,
    },
    og: { lead: "Esigenze, fonti e come lo simula PetPrep", photoLabel: "Foto IA" },
    qa: {
      title: "Domande e risposte",
      intro: "Risposte basate solo sui dati con fonte di questa pagina; ogni risposta cita le sue fonti.",
      // Breed names in Italian are masculine (il/un + cane/gatto implied) and lower case in running text: «un border collie», «lo shih tzu», «l’akita».
      questions: {
        exercise: (n) => `Quanto movimento serve a ${un(n)}?`,
        lifespan: (n) => `Quanto vive ${un(n)}?`,
        size: (n) => `Quanto diventa grande e quanto pesa ${un(n)}?`,
        grooming: (n) => `Di quanta toelettatura ha bisogno ${un(n)}?`,
        suits: (n) => `A chi è adatto ${il(n)}?`,
      },
      leads: {
        exercise: (n) => `Secondo le nostre fonti, ${il(n)} ha bisogno di questo movimento:`,
        lifespan: (n) => `Secondo le nostre fonti, l’aspettativa di vita ${il(n, "di")} è:`,
        size: (n) => `Taglia e peso da adulto ${il(n, "di")}, secondo le nostre fonti:`,
        grooming: (n) => `Mantello e toelettatura ${il(n, "di")}, secondo le nostre fonti:`,
        suits: (n) => `Secondo le nostre fonti, ${il(n)} è adatto a:`,
      },
      considerLead: "Tieni presente:",
      differ: "Le fonti riportano valori diversi, quindi vengono indicati tutti.",
      join: "; ",
    },
  },
  intros: {
    border_collie: {
      text: [
        "Il border collie è un cane da pastore di taglia media originario della Gran Bretagna, fatto per la resistenza e il lavoro duro. Il suo standard descrive un cane vivace, attento, ricettivo e intelligente, né nervoso né aggressivo.",
        "Club cinofili e veterinari concordano soprattutto su una cosa: è una razza con moltissima energia. Ha bisogno di più di due ore di movimento al giorno e di molti stimoli per la mente. Quando si annoia o si muove troppo poco, si inventa da solo i suoi compiti: rosicchia tutto ciò che trova a portata di bocca o cerca di radunare i bambini mentre giocano.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador, Labrador Retriever",
      text: [
        "Il labrador retriever è un cane da caccia di taglia grande e di costruzione robusta, originario della Gran Bretagna e selezionato per il riporto. Il suo standard descrive un compagno di buon carattere, gentile e adattabile, desideroso di compiacere e amante dell’acqua. Il pelo è corto e fitto, nero, giallo o fegato/cioccolato.",
        "Le associazioni britanniche descrivono il labrador come un cane da famiglia che, se ben socializzato, si lega a tutti i membri della casa. È molto attivo e fortemente motivato dal cibo: i premi aiutano nell’addestramento, ma i labrador tendono anche a ingrassare.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden, Golden Retriever",
      text: [
        "Il golden retriever è un cane da caccia di taglia grande originario della Gran Bretagna, con pelo liscio o ondulato in sfumature d’oro o crema. Il suo standard descrive un cane docile e intelligente, gentile, cordiale e sicuro di sé.",
        "Le associazioni britanniche lo definiscono un ottimo cane per una famiglia attiva, che può essere anche un buon primo cane. I compromessi sono chiari nelle fonti: almeno due ore di movimento al giorno, spazzolatura più volte alla settimana e un mantello che perde molto pelo.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Bouledogue francese, Frenchie, French Bulldog",
      text: [
        "Il bulldog francese è un piccolo e robusto cane da compagnia originario della Francia, con pelo corto e raso e le caratteristiche «orecchie a pipistrello» erette. Il suo standard descrive un cane socievole, vivace e giocherellone; le associazioni britanniche lo definiscono tranquillo e adattabile e dicono che tende ad andare d’accordo con i bambini, cosa che lo ha reso un animale da famiglia molto diffuso.",
        "Gli serve fino a un’ora di movimento al giorno ed è adatto alla vita in appartamento. Il compromesso che ogni fonte sottolinea è il muso schiacciato: può rendere più difficile la respirazione, e i bulldog francesi si surriscaldano in fretta, soprattutto quando fa caldo, quindi ombra, acqua e passeggiate tranquille sono importanti. Il PDSA suggerisce alle famiglie di valutare anche l’adozione di un bulldog francese adulto.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Pastore alsaziano, cane lupo, German Shepherd, GSD",
      text: [
        "Il pastore tedesco è un cane da pastore di taglia grande e potente, originario della Germania, con orecchie erette e un fitto doppio mantello, corto o lungo. Il suo standard descrive un cane equilibrato e sicuro di sé, dai nervi saldi, e il Royal Kennel Club lo definisce un cane da lavoro e di servizio versatile, noto per il coraggio e l’intelligenza.",
        "Ha bisogno di almeno due ore di movimento al giorno, è adatto a una casa grande con giardino e perde molto pelo. Le associazioni britanniche dicono che alcuni possono essere ottimi cani da famiglia, ma vanno sempre sorvegliati vicino ai bambini piccoli. Il Royal Kennel Club chiede agli allevatori di far controllare anche e gomiti dei genitori e indica la forma degli arti posteriori come un punto critico della razza.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS, Cavalier King Charles Spaniel",
      text: [
        "Il Cavalier King Charles spaniel è un piccolo spaniel da compagnia originario della Gran Bretagna, con orecchie lunghe e frangiate e un pelo lungo e setoso in quattro colori: Blenheim, rubino, nero focato e tricolore. Il suo standard descrive un cane attivo e aggraziato dall’espressione dolce: sportivo, affettuoso, cordiale e senza paura.",
        "Ha bisogno di circa un’ora di movimento al giorno, può vivere in appartamento ed è noto per stare bene con i bambini, anche se il gioco va sorvegliato e non ama restare da solo. Il pelo va spazzolato più di una volta alla settimana. Le fonti britanniche indicano come principali problemi di salute la malattia delle valvole cardiache e una dolorosa malattia della colonna legata alla forma del cranio, per questo agli allevatori si chiede di sottoporre i cani a controlli cardiaci e a risonanza magnetica.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "Il beagle è un piccolo segugio originario della Gran Bretagna, selezionato per cacciare la lepre seguendone la traccia olfattiva. Il suo standard descrive un segugio robusto, di costruzione compatta e allegro – audace, attivo e attento, amabile e privo di aggressività o timidezza – con pelo corto e fitto nei colori tipici dei segugi, come tricolore, bianco e fuoco o bianco e limone, e sempre con la punta della coda bianca.",
        "Gli serve fino a circa un’ora di movimento al giorno e si adatta bene alla vita in famiglia se è socializzato fin da piccolo, anche se con i bambini va sorvegliato e non va lasciato da solo, perché potrebbe abbaiare e rosicchiare oggetti. Il pelo corto va spazzolato una volta alla settimana, ma perde pelo. L’addestramento dovrebbe iniziare presto e basarsi sui premi. I veterinari britannici visitano i beagle soprattutto per aumento di peso e malattie dentali, quindi porzioni e denti vanno tenuti d’occhio.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Barbone, barboncino, Poodle, Standard Poodle",
      text: [
        "Il barbone grande è la più grande delle quattro taglie del barbone, una razza da compagnia originaria della Francia che discende da cani europei per la caccia alle anatre. Il suo standard descrive un cane elegante ed equilibrato, dal portamento fiero – fedele, allegro e di buon carattere, capace di imparare e di essere addestrato – con un pelo abbondante, crespo e riccio in un unico colore uniforme: nero, bianco, marrone, grigio o fulvo.",
        "Gli serve fino a circa un’ora di movimento al giorno ed è adatto a una casa grande con un grande giardino. Con la giusta socializzazione da cucciolo, di solito va d’accordo con i bambini e con gli altri animali. Il suo pelo non cade, ma questo non lo rende ipoallergenico: va curato ogni giorno e tosato regolarmente da un toelettatore professionista. È noto per essere molto obbediente e rispondere bene all’addestramento.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Teckel, Dachshund",
      text: [
        "Il bassotto è un cacciatore tedesco di tassi e conigli, chiamato in patria teckel, che esiste in diverse taglie e con tre tipi di pelo; questa pagina riguarda la taglia standard a pelo raso. Il suo standard descrive un cane moderatamente lungo in proporzione all’altezza, senza esagerazioni – fedele, versatile e di buon carattere; intelligente, vivace e coraggioso – con pelo fitto, corto e raso, rosso, oppure nero o cioccolato con focature.",
        "Gli serve fino a circa un’ora di movimento al giorno, suddivisa in un paio di passeggiate con il tempo per annusare, ed è adatto a una casa piccola. Ama le persone e di solito va d’accordo con i bambini di tutte le età, sempre sotto sorveglianza, ma per il suo forte istinto predatorio non è consigliato con animali più piccoli, e non sta bene da solo. Per la schiena lunga e le zampe corte è predisposto all’ernia del disco, quindi non dovrebbe saltare; agli allevatori si chiede di controllare la colonna prima della riproduzione.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie, Australian Shepherd",
      text: [
        "Il pastore australiano, nonostante il nome, è una razza americana: un cane da lavoro intelligente con un forte istinto di conduzione e di guardia. Il suo standard descrive un cane equilibrato di taglia media, un po’ più lungo che alto, di buon carattere e talvolta riservato al primo incontro, con pelo di media lunghezza, da liscio a ondulato, blu merle, nero, rosso merle o rosso, ciascuno con o senza macchie bianche e focature.",
        "Ha bisogno di più di due ore di movimento al giorno e di sfide mentali come giochi di attivazione e addestramento, ed è adatto a una casa grande con un grande giardino in campagna. Nella famiglia giusta può essere un ottimo cane da famiglia, ma il suo forte istinto di conduzione può spingerlo a radunare i bambini, quindi non è consigliato alle famiglie con bambini piccoli. Non ama restare da solo e il pelo va spazzolato qualche volta alla settimana.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Avanese, Bichon Havanais, Havanese",
      text: [
        "Il bichon avanese è un piccolo membro della famiglia dei bichon e il cane nazionale di Cuba. Il suo standard descrive un cagnolino robusto, basso sugli arti, con un pelo molto lungo, morbido, liscio o ondulato, che non viene mai tagliato, e la coda portata alta sul dorso. Può essere fulvo, nero, avana, tabacco, marrone rossiccio e, raramente, bianco, con o senza pezzature e focature.",
        "Il suo standard lo descrive come affettuoso, giocherellone e perfino un po’ clown, e dice che adora i bambini e gioca con loro senza sosta; le fonti britanniche lo definiscono un ottimo cane da famiglia, con la giusta socializzazione, e facile da addestrare. Ha bisogno di circa 30 minuti di movimento al giorno, può vivere in appartamento e non perde pelo, ma il pelo lungo va curato ogni giorno per evitare nodi e grovigli.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie, West Highland White Terrier",
      text: [
        "Il West Highland white terrier, o westie, è un piccolo terrier originario della Gran Bretagna. Il suo standard descrive un cagnolino di costruzione robusta, con torace profondo, dorso orizzontale e un doppio mantello duro lungo circa 5 cm, piccole orecchie erette e appuntite e occhi scuri sotto sopracciglia folte. Il bianco è l’unico colore ammesso dallo standard.",
        "Il suo standard lo descrive come attento, allegro, coraggioso e sicuro di sé, ma cordiale. Le fonti britanniche lo definiscono un cane da famiglia affettuoso e giocherellone per bambini di ogni età, con il gioco sempre sorvegliato; ha bisogno di circa un’ora di movimento al giorno, può vivere in appartamento, perde pelo e va spazzolato qualche volta alla settimana. Per il suo istinto predatorio non dovrebbe vivere con animali più piccoli, e non ama restare da solo. La pelle è un punto critico noto: il Royal Kennel Club chiede ai giudici di cercare segni di infiammazione cutanea nella razza.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Bovaro bernese, Berner, Berner Sennenhund, Bernese Mountain Dog",
      text: [
        "Il bovaro del Bernese è un grande cane da fattoria svizzero, usato in origine come cane da guardia, da traino e da bestiame nel Cantone di Berna. Il suo standard descrive un cane da lavoro a pelo lungo, forte e agile, con arti robusti e un pelo lungo, lucido, liscio o leggermente ondulato. L’unico colore ammesso dallo standard è il tricolore: nero intenso con focature fulvo carico sulle guance, sopra gli occhi, sulle zampe e sul petto, e macchie bianche sulla testa e sul petto.",
        "Il suo standard lo descrive come sicuro di sé, di buon carattere e cordiale, e come «un cane da famiglia gentile e devoto» che matura lentamente. Le fonti britanniche dicono che gli serve fino a un’ora di movimento al giorno, che il suo posto è una casa grande con un grande giardino, che perde molto pelo e va spazzolato più di una volta alla settimana; non dovrebbe restare a lungo da solo. Di solito vive meno di dieci anni, e le fonti britanniche indicano tra i suoi problemi di salute la displasia dell’anca e del gomito, la dilatazione-torsione gastrica e alcuni tipi di tumore.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky, Siberian Husky",
      text: [
        "Il Siberian husky è un cane da slitta da lavoro di taglia media, riconosciuto dalla FCI come razza americana e descritto dal Royal Kennel Club come il più leggero e veloce dei cani da slitta. Il suo standard chiede un cane agile e leggero nei movimenti, con un doppio mantello di media lunghezza, orecchie erette e spesse, occhi marroni o azzurri (è ammesso anche un occhio di ciascun colore) e una coda folta e ben fornita di pelo. I colori vanno dal nero al bianco puro; merle e tigrato non sono ammessi.",
        "Il suo standard lo descrive come cordiale e gentile, attento ed estroverso. Le fonti britanniche dicono che ha bisogno di più di due ore di movimento al giorno, di una casa grande con un grande giardino e di una recinzione alta e molto sicura, perché gli husky sono noti per scappare; perde molto pelo, va spazzolato qualche volta alla settimana e non sopporta bene la solitudine. Il PDSA lo consiglia per case con soli adulti o con adolescenti, più che per famiglie con bambini piccoli, e indica tra i suoi problemi di salute la displasia dell’anca, problemi agli occhi e l’epilessia.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "Il rottweiler è un cane da lavoro potente, di taglia da media a grande, originario della Germania. Il suo standard descrive un cane solido, né pesante né leggero, con pelo corto, ruvido e aderente, orecchie pendenti di media grandezza e occhi a mandorla marrone scuro. L’unico colore ammesso è il nero con focature fulvo carico ben definite su guance, muso, gola, petto e zampe; le macchie bianche sono un difetto.",
        "Il suo standard lo descrive come di buon carattere, placido, molto devoto, obbediente e desideroso di lavorare, e il Royal Kennel Club dice che un rottweiler ben addestrato è un meraviglioso compagno di famiglia. Le fonti britanniche dicono che ha bisogno di più di due ore di movimento al giorno, di una casa grande con un grande giardino e di un proprietario esperto, perché è molto potente; va socializzato fin da piccolo. Il PDSA non lo consiglia alle famiglie con bambini piccoli e neonati, e non va mai lasciato senza sorveglianza con altri animali. Basta una spazzolata alla settimana. Di solito vive meno di dieci anni, e il Royal Kennel Club tiene d’occhio la forma dei suoi arti posteriori.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog, English Bulldog, British Bulldog",
      text: [
        "Il bulldog inglese è un cane di taglia media a pelo raso originario della Gran Bretagna: piuttosto massiccio, basso, largo, potente e compatto, con il muso relativamente corto, piccole orecchie sottili «a rosa» e occhi rotondi molto scuri. Il suo standard ammette colori uniformi come rosso, fulvo, isabella e bianco, il tigrato e il pezzato; il nero e il nero focato sono considerati molto indesiderabili. Chiede narici grandi e ben aperte e dice che i cani con difficoltà respiratorie sono molto indesiderabili.",
        "Il suo standard lo descrive come attento, audace, leale, affidabile e coraggioso, dall’aspetto fiero ma affettuoso, e il Royal Kennel Club dice che resta molto popolare come compagno di famiglia per il suo carattere e la sua lealtà. Le fonti britanniche dicono che gli serve fino a un’ora di movimento al giorno, mai nelle ore calde, e che va d’accordo con gli altri animali di casa se socializzato da giovane; va spazzolato una volta alla settimana, ma le rughe del muso vanno pulite ogni giorno. Il PDSA lo descrive come una razza dal muso molto schiacciato, con una probabilità molto alta di gravi problemi di salute, come le difficoltà respiratorie, e raccomanda vivamente di considerare una razza più sana, un incrocio o un meticcio. Di solito vive meno di dieci anni.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Kurzhaar, Deutsch Kurzhaar, bracco tedesco, GSP, German Shorthaired Pointer",
      text: [
        "Il bracco tedesco a pelo corto è un cane da caccia versatile originario della Germania, fatto per lavorare sia in campo aperto sia in acqua, con un pelo corto e fitto, ruvido al tatto, orecchie larghe e piatte attaccate alte e occhi a mandorla marrone scuro. Il suo standard americano ammette fegato uniforme, fegato e bianco (per esempio picchiettato), nero uniforme e nero e bianco; zone rosse, arancioni, limone o fuoco e il cane completamente bianco sono motivo di squalifica. Il suo standard descrive una coda amputata: PetPrep mostra sempre il cane con la coda naturale.",
        "Il suo standard lo descrive come cordiale, intelligente e desideroso di compiacere. Il Royal Kennel Club e il PDSA dicono che ha bisogno di più di due ore di movimento al giorno; il PDSA aggiunge che durante una passeggiata può emergere il suo istinto di cacciare, puntare e riportare, quindi serve un buon addestramento al richiamo, e che è abbastanza facile da addestrare. Va spazzolato una o due volte alla settimana e perde pelo in modo moderato. Un ampio studio britannico indica un’aspettativa di vita mediana di 13,4 anni.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie, Yorkshire",
      text: [
        "Lo Yorkshire terrier è un terrier toy originario della Gran Bretagna che secondo lo standard pesa fino a 3,2 kg, con un pelo lungo, perfettamente liscio, lucido e setoso che ricade uniformemente sui due lati a partire da una scriminatura lungo il dorso. Lo standard ammette un solo colore: blu acciaio scuro dalla nuca alla coda, con un fuoco intenso e brillante su testa, petto e zampe; le piccole orecchie a V sono portate erette. Lo standard descrive sia la coda amputata sia quella intera: PetPrep mostra sempre il cane con la coda naturale.",
        "Il suo standard lo descrive come attento, intelligente e vivace, dal temperamento equilibrato. Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e la cura del pelo ogni giorno; il PDSA aggiunge che ama correre, riportare e giocare, che può essere piuttosto testardo da addestrare e che è più adatto a famiglie con bambini più grandi perché ha ossa molto fragili. Un ampio studio britannico ha rilevato che le malattie dentali sono il problema più comune della razza, incoraggia a curare i denti ogni giorno, per esempio lavandoli, e ha rilevato un’età mediana al decesso di 13,56 anni.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane corso italiano, Corso, Italian Corso Dog",
      text: [
        "Il cane corso è un molosso italiano di taglia da media a grande, un cane robusto e solido, non privo di eleganza, un po’ più lungo che alto. Il suo standard descrive un pelo corto, lucido e molto fitto, nero, nelle tonalità del grigio, fulvo o rosso con maschera scura, frumentato scuro o tigrato; non sono ammesse grandi macchie bianche. Secondo l’attuale standard FCI le orecchie non vengono tagliate e la coda resta naturale – e nel Regno Unito il taglio delle orecchie e della coda è illegale – quindi PetPrep mostra sempre il cane con orecchie e coda naturali.",
        "Il suo standard lo descrive come custode della proprietà, della famiglia e del bestiame, estremamente agile e reattivo. Il PDSA dice che è socievole e affettuoso con i suoi proprietari, che ha bisogno di circa due ore di movimento al giorno e di cose da fare, perché detesta annoiarsi, e che per la sua stazza è più adatto a proprietari esperti. Non consiglia la razza nelle case con bambini piccoli, che potrebbero essere urtati e fatti cadere; è adatto a case con soli adulti o a famiglie con bambini più grandi. Basta una spazzolata alla settimana, ma perde pelo ed è noto per sbavare. Il PDSA indica un’aspettativa di vita media inferiore ai dieci anni.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Corgi, Welsh Corgi (Pembroke), Pembroke Welsh Corgi",
      text: [
        "Il Welsh corgi Pembroke è un piccolo cane da bestiame originario del Galles, basso, forte e di costruzione robusta, che dà un’impressione di sostanza e resistenza in poco spazio. Il suo standard descrive un pelo liscio di media lunghezza con un fitto sottopelo, rosso, sable, fulvo o nero focato, con o senza macchie bianche su zampe, petto e collo, e orecchie erette. Un tempo la coda veniva abitualmente amputata; lo standard descrive anche la coda naturale, e PetPrep mostra sempre il cane con la coda naturale.",
        "Il suo standard lo descrive come audace, laborioso, estroverso e cordiale. Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo più di una volta alla settimana; il PDSA descrive cani cordiali, allegri e giocherelloni, desiderosi di compiacere e abbastanza facili da addestrare, ma dice che possono mordicchiare i talloni dei bambini che corrono, quindi sono utili la socializzazione con i bambini e l’addestramento fin da piccoli. Il Royal Kennel Club indica un’aspettativa di vita di oltre 12 anni e chiede agli allevatori di far valutare le anche dei genitori.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "Il dobermann è un cane tedesco da compagnia, da protezione e da lavoro di taglia media, forte e muscoloso, dalle linee eleganti e dal portamento fiero. Il suo standard FCI descrive un pelo corto, duro e fitto, aderente e liscio, nero o marrone con focature rosso ruggine ben definite; le macchie bianche non sono ammesse. Secondo lo standard FCI orecchie e coda restano naturali, e PetPrep mostra sempre il cane con orecchie e coda naturali.",
        "Il suo standard lo descrive come cordiale e calmo, molto devoto alla famiglia. Il Royal Kennel Club dice che la sua natura leale e obbediente ne fa un ottimo cane da famiglia, e raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana. Il PDSA aggiunge che è molto energico, ha bisogno di tanto esercizio fisico e mentale e di una socializzazione precoce e che, per la sua taglia grande e la corporatura forte, non è consigliato alle famiglie con bambini piccoli né a chi ha un cane per la prima volta. Il Royal Kennel Club indica un’aspettativa di vita di oltre 10 anni.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Boxer tedesco, German Boxer, Deutscher Boxer",
      text: [
        "Il boxer è un cane tedesco da lavoro e da compagnia di taglia media, di costruzione quadrata, con ossatura forte e muscoli ben sviluppati. I suoi standard descrivono un pelo corto, lucido e raso, fulvo o tigrato con maschera nera; le macchie bianche sono ammesse, ma non dovrebbero coprire più di un terzo del mantello. Il muso dovrebbe essere largo e profondo, mai corto, con narici ampie. Un tempo la coda veniva abitualmente amputata; lo standard descrive anche la coda intera, e PetPrep mostra sempre il cane con orecchie e coda naturali.",
        "Il suo standard lo descrive come equilibrato, docile, impavido e sicuro di sé. Il Royal Kennel Club dice che è molto amato come compagno di famiglia e raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana. Il PDSA descrive un cane giocherellone con moltissima energia, che ama la compagnia delle persone e può sviluppare ansia da separazione se lasciato solo, che ha un istinto predatorio molto forte e che – per la sua taglia e la sua irruenza – non è consigliato nelle case con bambini piccoli né a chi ha un cane per la prima volta; alcuni boxer con il muso più corto possono avere gravi problemi respiratori. Il Royal Kennel Club indica un’aspettativa di vita di oltre 10 anni.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, schnauzer mini, Miniature Schnauzer",
      text: [
        "Lo schnauzer nano è un piccolo cane da compagnia tedesco: forte, tarchiato e quasi quadrato, con un pelo duro, ispido e fitto, sopracciglia folte e barba. Il suo standard FCI ammette il sale e pepe, il nero e argento, il nero puro e il bianco puro; PetPrep mostra i primi tre. Un tempo la coda veniva abitualmente amputata e talvolta venivano tagliate le orecchie; lo standard FCI chiede coda naturale e orecchie cadenti, e PetPrep mostra sempre il cane con orecchie e coda naturali.",
        "La FCI lo classifica come cane da casa e da compagnia, e il Royal Kennel Club dice che è molto popolare come compagno. Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo più di una volta alla settimana, e dice che non perde pelo. Il PDSA descrive un cane giocherellone e curioso, che può andare d’accordo con i bambini se li conosce fin da piccolo, che può essere testardo nell’addestramento e che va spazzolato due o tre volte alla settimana, oltre a una tosatura o a uno stripping da un toelettatore professionista di tanto in tanto. Il Royal Kennel Club indica un’aspettativa di vita di oltre 10 anni.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "Lo shih tzu è un piccolo cane da compagnia originario del Tibet, oggi sotto il patrocinio della Gran Bretagna presso la FCI. Gli standard descrivono un cane robusto, dal pelo abbondante e dal portamento fiero, con un muso «a crisantemo»: pelo di copertura lungo e fitto, grandi occhi rotondi e scuri, grandi orecchie pendenti e una coda riccamente frangiata portata sul dorso. Gli standard ammettono molti colori; PetPrep mostra oro e bianco, nero e bianco e fegato e bianco, e mai il merle. Il muso è corto e piatto, e il PDSA cita i problemi respiratori causati dal muso più corto, quindi PetPrep disegna sempre un muso moderato con narici aperte.",
        "La FCI lo descrive come intelligente, attivo e attento, cordiale e indipendente. Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo ogni giorno, e indica l’appartamento come casa adatta. Il PDSA dice che gli shih tzu possono essere cani da famiglia di buon carattere se hanno ricevuto la giusta socializzazione e il giusto addestramento, li definisce animali ideali per chi ha un cane per la prima volta, consiglia di sorvegliarli sempre con i bambini e raccomanda per la maggior parte dei cani da compagnia una spazzolata quotidiana e una tosatura da un toelettatore professionista ogni sei-otto settimane. Il Royal Kennel Club indica un’aspettativa di vita di oltre 10 anni.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Deutsche Dogge, Great Dane",
      text: [
        "L’alano è un gigante tedesco: lo standard FCI dice che unisce a un corpo grande, potente e ben costruito fierezza, forza ed eleganza, con una testa lunga e stretta, orecchie che pendono naturalmente e un pelo molto corto, raso e lucido. Gli standard elencano il fulvo e il tigrato – idealmente con maschera nera – oltre all’arlecchino, al nero e al blu; PetPrep mostra solo i colori elencati sia dalla FCI sia dal Royal Kennel Club, mai il merle o il mantellato, e disegna sempre il cane con orecchie e coda naturali e palpebre aderenti, perché il Royal Kennel Club chiede ai giudici di fare attenzione alle palpebre rivolte verso l’interno o verso l’esterno e agli arti posteriori difettosi.",
        "La FCI lo descrive come cordiale, affettuoso e devoto ai suoi proprietari, anche se può essere riservato con gli estranei. Il Royal Kennel Club dice che, nonostante la stazza, è un meraviglioso cane da famiglia, e raccomanda più di due ore di movimento al giorno, una casa grande con giardino e una spazzolata alla settimana. Il PDSA dice che gli alani sono noti per sbavare, hanno un istinto predatorio piuttosto forte e non sono consigliati nelle case con bambini piccoli per la loro stazza e la loro forza; consiglia di lasciar passare del tempo tra il pasto e il movimento per aiutare a prevenire la dilatazione-torsione gastrica. Il Royal Kennel Club indica un’aspettativa di vita inferiore ai 10 anni.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Pom, spitz nano, Zwergspitz, German Toy Spitz, Pomeranian",
      text: [
        "Il volpino di Pomerania è lo spitz più piccolo: la FCI lo considera la varietà toy dello spitz tedesco, alta 21 cm ± 3 cm al garrese, e lo standard del Royal Kennel Club descrive un cagnolino compatto e raccolto, con una testa simile a quella di una volpe, piccole orecchie erette e la coda girata sul dorso. Il suo doppio mantello ha un sottopelo morbido e lanoso e un pelo di copertura lungo e liscio che forma un collare attorno al collo. Lo standard ammette molti colori uniformi, come arancio, crema, bianco, nero e marrone, ma mai il merle; PetPrep disegna un pelo naturale, non tosato.",
        "La FCI descrive il suo carattere come socievole e allegro, e lo standard del Royal Kennel Club lo definisce estroverso, vivace e intelligente. Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e lo ritiene adatto a un appartamento; il PDSA dice che il suo doppio mantello va spazzolato due o tre volte alla settimana. L’AKC dice che i volpini di Pomerania tendono a essere più adatti a famiglie con bambini più grandi, possono andare d’accordo con altri animali se socializzati presto, e raccomanda vivamente una socializzazione precoce e corsi per cuccioli. Il Royal Kennel Club indica un’aspettativa di vita di oltre 12 anni.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "Il Boston terrier è originario degli Stati Uniti. Lo standard FCI descrive un cane vivace, molto intelligente, a pelo raso, dalla testa corta, di costruzione compatta, con la coda corta e ben equilibrato, tigrato, «seal» o nero, con marcature bianche distribuite in modo uniforme: sono richiesti una fascia bianca sul muso, una lista bianca tra gli occhi e il petto bianco, e il tigrato è preferito. PetPrep lo disegna tigrato e bianco, con muso moderato, narici aperte e orecchie e coda naturali.",
        "È una razza dal muso schiacciato (brachicefala), e il PDSA avverte che non dovrebbe mai fare movimento nelle ore calde perché tende a surriscaldarsi. Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e una spazzolata alla settimana, lo ritiene adatto a un appartamento e indica un’aspettativa di vita di oltre 10 anni. Il PDSA definisce i Boston terrier cani da famiglia perfetti, particolarmente bravi con i bambini se ben socializzati da cuccioli; l’AKC dice che stanno bene con bambini che sanno essere delicati con gli animali, che non sopportano bene di restare a lungo da soli e raccomanda vivamente una socializzazione precoce e l’addestramento da cucciolo.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, pastore australiano miniatura, Miniature American Shepherd, Miniature Australian Shepherd",
      text: [
        "Il pastore americano miniatura è originario degli Stati Uniti. Lo standard FCI descrive un piccolo cane da pastore con un forte istinto di conduzione e di guardia, intelligente e prima di tutto un cane da lavoro, un po’ più lungo che alto, con pelo di media lunghezza, da liscio a ondulato, resistente alle intemperie. I suoi colori sono nero, blu merle, rosso e rosso merle, con o senza macchie bianche e focature, e gli occhi possono essere marroni, azzurri, nocciola o ambra. PetPrep lo disegna blu merle con la coda naturale.",
        "PetMD dice che ha molta energia e ha bisogno di almeno un’ora di movimento ogni giorno, idealmente due, oltre a compiti che gli tengano occupata la mente, e che va spazzolato un paio di volte alla settimana; l’AKC dice che per gran parte dell’anno basta una spazzolata alla settimana, ogni giorno nel periodo della muta. L’AKC dice che, con addestramento all’obbedienza e socializzazione precoce, può essere un ottimo cane da famiglia e che di solito sta bene con i bambini, ma potrebbe cercare di radunarli; PetMD aggiunge che la devozione per la sua famiglia può portare ad ansia da separazione quando resta da solo. PetMD indica un’aspettativa di vita di 12–13 anni.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, chihuahua a pelo corto, Smooth Coat Chihuahua",
      text: [
        "Il chihuahua è originario del Messico. Lo standard del Kennel Club descrive un cane piccolo, grazioso e compatto, dall’espressione sbarazzina e dal temperamento allegro, vivace e intelligente, con un cranio ben arrotondato «a mela», un muso moderatamente corto e leggermente appuntito, grandi occhi rotondi non sporgenti, grandi orecchie e coda a falce; è ammesso qualsiasi colore o combinazione di colori, ma mai il merle, e il peso preferito è 1,8–2,7 kg. Il Royal Kennel Club considera il chihuahua a pelo corto e quello a pelo lungo due razze distinte; PetPrep disegna il pelo corto, fulvo, con una testa moderata.",
        "Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e una spazzolata alla settimana, lo ritiene adatto a un appartamento e indica un’aspettativa di vita di oltre 12 anni. Il PDSA dice che i chihuahua sono così piccoli e leggeri che i bambini sono tentati di prenderli in braccio, cosa che difficilmente gradiscono, quindi sono più adatti a famiglie con bambini un po’ più grandi. Il PDSA aggiunge che, come cani da compagnia, amano la compagnia e hanno bisogno che in casa ci sia sempre qualcuno, e che vanno socializzati fin da piccoli con tante persone, esperienze e luoghi diversi.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer, ESS, English Springer Spaniel",
      text: [
        "L’English springer spaniel è originario della Gran Bretagna, dove è stato selezionato per trovare, stanare e riportare la selvaggina. Lo standard del Kennel Club descrive un cane di costruzione simmetrica, compatto, forte, allegro e attivo – il più alto sugli arti tra gli spaniel britannici da terra – dal temperamento cordiale, felice e docile, con lunghe orecchie frangiate, occhi nocciola scuro e un pelo aderente, liscio e resistente alle intemperie; i colori sono fegato e bianco o nero e bianco, entrambi con o senza focature, e l’altezza è di circa 51 cm. PetPrep lo disegna fegato e bianco, con la coda naturale.",
        "Il Royal Kennel Club raccomanda più di 2 ore di movimento al giorno e la cura del pelo più di una volta alla settimana, e indica un’aspettativa di vita di oltre 10 anni. Il PDSA dice che gli springer sono buoni cani da famiglia, vanno d’accordo con i bambini e con gli altri animali di casa, sono obbedienti e desiderosi di imparare, e vanno spazzolati una o due volte alla settimana, con una tosatura ogni 3 mesi. L’AKC aggiunge che non dovrebbero restare a lungo da soli e che la socializzazione precoce e i corsi di addestramento per cuccioli sono fondamentali.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Collie (nome antico), Shetland Sheepdog",
      text: [
        "Lo Shetland sheepdog, o pastore delle Shetland, è originario della Gran Bretagna ed è un piccolo cane da lavoro a pelo lungo. Lo standard FCI descrive un cane attento, gentile, intelligente, forte e attivo, affettuoso e leale con il suo proprietario e riservato con gli estranei, con una testa a forma di cuneo lungo e smussato, piccole orecchie portate semierette con le punte ripiegate in avanti e un doppio mantello con pelo di copertura lungo e duro; i colori sono sable, tricolore, blu merle, bianco e nero e nero focato, e l’altezza ideale è di 37 cm per i maschi e 35,5 cm per le femmine. PetPrep lo disegna sable e bianco.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo ogni giorno, e indica un’aspettativa di vita di oltre 10 anni. Il PDSA dice che gli sheltie sono cani molto gentili, giocherelloni e obbedienti, che spesso si inseriscono bene nella vita di famiglia e vanno d’accordo con i bambini, e che addestramento e socializzazione sono molto importanti fin da piccoli. L’AKC aggiunge che hanno bisogno di regolare esercizio mentale e fisico, che per il loro istinto di conduzione starebbero meglio con bambini più grandi e che sono noti per abbaiare molto.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Breton, Épagneul breton, Brittany, Brittany Spaniel",
      text: [
        "L’épagneul breton è un cane da ferma originario della Francia. Il Royal Kennel Club descrive un cane molto energico e intelligente che caccia, punta e riporta, gentile e affettuoso ma pieno di vita ed esuberanza, con un pelo fitto e piuttosto fine, orecchie triangolari attaccate alte e una coda spesso corta per natura; i colori dello standard sono arancio, fegato o nero con bianco, roano o tricolore, e l’altezza è di 48–51 cm per i maschi e 47–50 cm per le femmine. PetPrep lo disegna arancio e bianco.",
        "Il Royal Kennel Club raccomanda più di 2 ore di movimento al giorno e la cura del pelo più di una volta alla settimana, e indica un’aspettativa di vita di oltre 10 anni. L’AKC dice che gli épagneul breton sono cani con molta energia che hanno bisogno di tanto movimento e di stimoli mentali, che sono gentili e tendono a essere pazienti con i bambini, e che una spazzolata alla settimana basta per tenerli in ordine. PetMD aggiunge che la socializzazione precoce dei cuccioli è indispensabile, che non stanno bene se restano a lungo da soli e che, essendo selezionati per la caccia agli uccelli, hanno un forte istinto predatorio.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker americano, Cocker Spaniel (USA), American Cocker Spaniel",
      text: [
        "L’American cocker spaniel – negli Stati Uniti semplicemente Cocker Spaniel – è una razza diversa dal cocker spaniel inglese. Lo standard AKC lo definisce il membro più piccolo dello Sporting Group, con orecchie lunghe, lobulate e ben frangiate, cranio arrotondato e muso largo e profondo, e un pelo setoso, liscio o leggermente ondulato; può essere nero, di qualsiasi colore uniforme dal crema più chiaro al rosso più scuro, oppure pezzato con il bianco. Lo standard chiede un temperamento equilibrato, senza alcun segno di timidezza.",
        "Il Royal Kennel Club raccomanda la cura del pelo ogni giorno e più di 2 ore di movimento al giorno, e indica un’aspettativa di vita di oltre 10 anni; l’AKC e PetMD scrivono che non ha bisogno di molto movimento. PetMD definisce questi cani dal carattere dolce ottimi cani da famiglia, cordiali con le persone e con gli altri animali, e consiglia di iniziare presto socializzazione e addestramento; VCA scrive che di solito stanno molto bene con i bambini, tendono a ingrassare e hanno bisogno di un controllo delle orecchie ogni settimana.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, pastore belga (malinois), Belgian Malinois",
      text: [
        "Il pastore belga malinois è la varietà a pelo corto del pastore belga, una razza da pastore originaria del Belgio. Lo standard FCI descrive un cane dalle proporzioni armoniose, che unisce eleganza e potenza, e ammette un solo colore: fulvo carbonato con maschera nera. Gli standard FCI e AKC descrivono orecchie piuttosto piccole, erette e triangolari, un pelo corto e duro con un fitto sottopelo e un temperamento attento, intelligente, curioso e sicuro di sé.",
        "Il Royal Kennel Club raccomanda più di 2 ore di movimento al giorno e la cura del pelo più di una volta alla settimana, e indica un’aspettativa di vita di oltre 10 anni. L’AKC scrive che non è una buona scelta per chi ha un cane per la prima volta, che sta meglio con bambini più grandi e responsabili e che non dovrebbe restare a lungo da solo; PetMD segnala che ha un forte istinto predatorio, che potrebbe cercare di radunare i bambini e che ha bisogno di addestramento costante ogni giorno e di una socializzazione precoce.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "Il basset hound è un segugio dalle zampe corte originario della Gran Bretagna. Lo standard FCI descrive un segugio di notevole sostanza, ben equilibrato, placido, mai aggressivo né timido, e affettuoso, con orecchie lunghe e vellutate attaccate basse, pelo raso e corto e i colori nero, bianco e fuoco oppure limone e bianco. Il Breed Watch del Royal Kennel Club chiede ai giudici delle esposizioni di fare attenzione alle palpebre rivolte verso l’interno o verso l’esterno, alle orecchie molto lunghe, alle pieghe cutanee irritate e alla pelle in eccesso.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e una spazzolata alla settimana, e indica un’aspettativa di vita di oltre 10 anni. Il PDSA descrive un cane tollerante che va molto d’accordo con i bambini e ama la compagnia, con un buon appetito da tenere sotto controllo; consiglia di controllare le pieghe della pelle ogni giorno e di lasciar passare del tempo tra il pasto e il movimento. L’AKC aggiunge che il suo naso può portarlo fuori strada, quindi sono importanti guinzagli sicuri e aree recintate.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, bracco ungherese, Magyar Vizsla, Hungarian Vizsla",
      text: [
        "Il bracco ungherese a pelo corto (vizsla) è un elegante cane da caccia di taglia media originario dell’Ungheria, con un pelo corto color oro rossiccio. Lo standard FCI descrive un cane vivace, cordiale, dal temperamento equilibrato, facile da addestrare e che mantiene uno stretto contatto con il suo conduttore; i suoi colori sono le tonalità dell’oro rossiccio e dell’oro sabbia scuro. Il Breed Watch del Royal Kennel Club non indica punti critici specifici della razza.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana, e indica un’aspettativa di vita di oltre 12 anni. Il PDSA descrive un cane molto legato alle persone, che ama la compagnia e può soffrire di ansia da separazione quando resta da solo; va d’accordo con i bambini più grandi, ma il PDSA non lo consiglierebbe con bambini molto piccoli né a chi ha un cane per la prima volta, e per il suo forte istinto predatorio sconsiglia di tenerlo con animali più piccoli. Il PDSA consiglia anche di lasciar passare del tempo tra il pasto e il movimento.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker, Cocker Spaniel (Regno Unito), English Cocker, Merry Cocker",
      text: [
        "Il cocker spaniel inglese – in Gran Bretagna semplicemente Cocker Spaniel – è una razza diversa dal cocker spaniel americano. Lo standard FCI descrive un cane da caccia allegro e robusto, ben equilibrato e compatto, con orecchie lobulate attaccate basse e un pelo liscio e setoso; lo standard AKC lo definisce allegro e affettuoso, di indole equilibrata, ed elenca il nero, il fegato e le tonalità del rosso uniformi oltre ai pezzati con il bianco. Il Breed Watch del Royal Kennel Club non indica punti critici specifici della razza.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo ogni giorno, e indica un’aspettativa di vita di oltre 10 anni; uno studio VetCompass sui cocker spaniel inglesi nel Regno Unito ha rilevato un’età mediana al decesso di 11,44 anni. Il PDSA dice che, grazie alla sua personalità paziente, tende ad andare d’accordo con i bambini, sempre sotto sorveglianza, ma avverte che è noto per l’ansia da separazione e non dovrebbe mai restare da solo per più di quattro ore. Il PDSA consiglia anche una spazzolata quotidiana e di lasciar passare del tempo tra il pasto e il movimento.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Bichon maltese, Bichon Maltais, Maltese Terrier",
      text: [
        "Il maltese è un cane toy originario del Mediterraneo centrale, oggi sotto il patrocinio dell’Italia presso la FCI. Lo standard FCI descrive un cane piccolo dal corpo allungato, vivace, affettuoso, molto calmo e molto intelligente, del peso di 3–4 kg, con un pelo molto lungo, fitto e setoso che ricade pesante su tutto il corpo. Il pelo non ha sottopelo, e il bianco puro è l’unico colore (è ammessa una leggera sfumatura avorio pallido). Il Breed Watch del Royal Kennel Club non indica punti critici specifici della razza.",
        "Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e la cura del pelo ogni giorno, dice che la razza non perde pelo e indica un’aspettativa di vita di oltre 12 anni. Il PDSA descrive un cane sveglio, cordiale e affettuoso, che può essere riservato con gli estranei ma che, con la giusta socializzazione da giovane, può imparare a essere sicuro di sé e socievole. PetMD avverte che può sviluppare ansia da separazione se resta troppo a lungo da solo, dice che le interazioni con i bambini piccoli vanno sorvegliate e consiglia di lavargli i denti ogni giorno.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Mops, Pug dog",
      text: [
        "Il carlino è un piccolo cane da compagnia originario della Cina, oggi sotto il patrocinio della Gran Bretagna presso la FCI. Lo standard FCI descrive un cane decisamente quadrato e raccolto – «multum in parvo» – di grande fascino, dignità e intelligenza, dall’indole equilibrata, allegra e vivace, con un peso ideale di 6,3–8,1 kg, un pelo fine, raso, corto e lucido argento, albicocca, fulvo o nero, e una coda strettamente arricciata sull’anca. Chiede narici piuttosto grandi e ben aperte e considera inaccettabili le narici strette e una pesante piega sopra il naso. Il Royal Kennel Club colloca la razza nella categoria 3 del Breed Watch, con punti critici che includono difficoltà respiratorie, occhi sporgenti, dermatite delle pieghe cutanee e sovrappeso.",
        "Il PDSA definisce il carlino una razza gravemente brachicefala (dal muso schiacciato) che può restare facilmente senza fiato, consiglia di evitare il movimento col caldo e dice che i suoi veterinari raccomanderebbero vivamente piuttosto una razza con un muso normale o un incrocio di carlino. Il Royal Kennel Club raccomanda fino a 1 ora di movimento al giorno e una spazzolata alla settimana, dice che la razza perde pelo e indica un’aspettativa di vita di oltre 10 anni. Il PDSA descrive un cane che spesso va d’accordo con i bambini e con gli altri animali, ma adora la compagnia e non sta bene se lasciato solo; PetMD consiglia di pulire e asciugare ogni giorno le pieghe della pelle del muso e osserva che l’obesità è comune nella razza.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Rough Collie, Collie (Rough)",
      text: [
        "Il collie a pelo lungo è un grande cane da pastore originario della Gran Bretagna. Lo standard FCI descrive un cane di grande bellezza, dal portamento di impassibile dignità, di indole cordiale e senza traccia di nervosismo o aggressività, con un pelo molto fitto con pelo di copertura liscio e duro, e tre colori: sable, tricolore e blu merle. Lo standard del Royal Kennel Club lo definisce un ottimo cane da compagnia, cordiale, allegro e attivo, bravo con i bambini e con gli altri cani, e indica un’altezza di 56–61 cm per i maschi e 51–56 cm per le femmine. Il Royal Kennel Club colloca la razza nella categoria 2 del Breed Watch e non registra i cuccioli nati da accoppiamenti merle × merle.",
        "Il Royal Kennel Club raccomanda fino a 1 ora di movimento al giorno e la cura del pelo ogni giorno, dice che la razza perde pelo e indica un’aspettativa di vita di oltre 12 anni. PetMD dice che i collie sono affettuosi, soprattutto con i bambini, e bravi con gli altri animali, ma non stanno bene da soli per lunghi periodi e quando sono eccitati possono mordicchiare caviglie e talloni. Osserva inoltre che la socializzazione del cucciolo è fondamentale e che nei collie si presenta la mutazione MDR1, che influisce sul modo in cui il cane elabora certi farmaci.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "Mastiff inglese, English Mastiff, Old English Mastiff",
      text: [
        "Il mastiff è una razza da guardia molto grande originaria della Gran Bretagna. Lo standard FCI descrive un insieme di grandiosità e coraggio – calmo, affettuoso con i proprietari ma capace di fare la guardia – con una testa dall’aspetto quadrato, un corpo largo, profondo e potente e un pelo corto e aderente albicocca, fulvo o tigrato. Il PDSA indica un’altezza media di 71–78 cm e un peso medio di 80–85 kg e osserva che il Kennel Club colloca il mastiff nella categoria 3: razze con problemi di conformazione visibili che possono causare dolore, disagio o problemi di salute.",
        "Il PDSA raccomanda per i cani adulti circa un’ora di movimento al giorno – ma senza esagerare finché le ossa e le articolazioni del cucciolo sono ancora in sviluppo – una spazzolata alla settimana con la pulizia quotidiana delle rughe del muso, e indica un’aspettativa di vita media inferiore ai 10 anni. PetMD definisce i mastiff ottimi cani da famiglia nelle case con bambini che sanno come comportarsi con gli animali, anche se forse non con bambini piccolissimi o neonati, per via della loro stazza; tendono ad andare d’accordo con altri animali conosciuti da cuccioli, sbavano molto e non dovrebbero fare movimento nell’ora prima e dopo i pasti per il rischio di dilatazione-torsione gastrica.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba, Japanese Shiba Inu",
      text: [
        "Lo shiba inu è un piccolo spitz originario del Giappone; il suo nome significa «cane piccolo» e, secondo il Royal Kennel Club, è stato selezionato per cacciare piccoli uccelli selvatici. Lo standard FCI descrive un cane piccolo, ben equilibrato e di buona ossatura, dal temperamento fedele, dai sensi acuti e molto vigile, con un pelo di copertura duro su un sottopelo morbido e fitto, piccole orecchie erette triangolari e una coda folta e arricciata; i colori sono rosso, nero focato e sesamo, sempre con le marcature biancastre «urajiro» su guance, petto e parti inferiori. Lo standard AKC indica un peso medio di circa 23 libbre (10 kg) per i maschi e 17 libbre (8 kg) per le femmine.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e una spazzolata alla settimana, osserva che la razza perde pelo e indica un’aspettativa di vita di oltre 10 anni; un ampio studio britannico ha rilevato un’aspettativa di vita mediana di 14,6 anni. L’AKC descrive un cane sicuro di sé e indipendente, più adatto a un proprietario esperto, che sta meglio con bambini più grandi e che non andrebbe mai lasciato senza guinzaglio fuori da un’area recintata o chiusa. PetMD aggiunge che ha bisogno di tanti stimoli mentali, trae beneficio dalla socializzazione da cucciolo e che i denti andrebbero lavati ogni giorno.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, cane leone africano, African Lion Dog",
      text: [
        "Il Rhodesian ridgeback è originario dell’Africa australe. La sua caratteristica più nota è la cresta sul dorso, una striscia di pelo che cresce nella direzione opposta al resto del mantello. Lo standard FCI descrive un cane ben equilibrato, forte, muscoloso, agile e attivo, dignitoso, intelligente e distaccato con gli estranei, particolarmente apprezzato come cane da guardia e da famiglia. Il pelo corto e fitto va dal frumento chiaro al frumento rosso, e lo standard indica un peso di circa 36,5 kg per i maschi e 32 kg per le femmine.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana, osserva che la razza perde pelo ed è adatta a una casa grande con un grande giardino, e indica un’aspettativa di vita di oltre 10 anni. Il PDSA descrive cani giocherelloni, potenti e molto leali, con un istinto predatorio molto forte, non consigliati a chi ha un cane per la prima volta, che non dovrebbero mai restare da soli per più di quattro ore e vanno socializzati fin da piccoli; consiglia anche di lasciar passare del tempo tra il pasto e il movimento. Woodgreen aggiunge che stanno meglio con bambini più grandi.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Epagneul nano continentale, Phalène (varietà a orecchie cadenti), cane farfalla, Continental Toy Spaniel, Butterfly Dog",
      text: [
        "Il papillon è la varietà a orecchie erette dell’epagneul nano continentale, una razza originaria del Belgio e della Francia; la varietà a orecchie cadenti si chiama phalène. Lo standard FCI descrive un piccolo ed elegante spaniel nano a pelo lungo dalla personalità vivace, alto circa 28 cm e con un peso fino a 4,5 kg per i maschi e 5 kg per le femmine. Le sue grandi orecchie sono portate come le ali aperte di una farfalla, e il pelo è sempre bianco con macchie di colore.",
        "Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e la cura del pelo più di una volta alla settimana, osserva che la razza perde pelo e può vivere in appartamento, e indica un’aspettativa di vita di oltre 12 anni. Il PDSA descrive cani gentili, giocherelloni e molto obbedienti, che vanno d’accordo con tutti e hanno bisogno di addestramento e socializzazione fin da piccoli; suggerisce di spazzolarli due o tre volte alla settimana. PetMD aggiunge che i papillon hanno bisogno di stimoli mentali ogni giorno, possono sviluppare ansia da separazione e hanno bisogno che i denti vengano lavati ogni giorno, e che i bambini molto piccoli possono ferire per sbaglio un cane così piccolo.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Portuguese Water Dog, Algarvian Water Dog",
      text: [
        "Il cane da acqua portoghese è originario del Portogallo, dove lavorava con i pescatori. Lo standard del Royal Kennel Club descrive un cane robusto, quasi quadrato, molto muscoloso – molto intelligente e straordinariamente energico, ottimo nuotatore e tuffatore – alto 50–57 cm (maschi) e 43–52 cm (femmine), con un peso di 19–25 kg (maschi) e 16–22 kg (femmine). Il suo abbondante pelo, privo di sottopelo, può essere nero, bianco, marrone, oppure nero o marrone con il bianco; la tradizionale tosatura «a leone» lascia corti il muso e la parte posteriore.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo ogni giorno, osserva che la razza non perde pelo ed è adatta a una casa grande, e indica un’aspettativa di vita di oltre 10 anni. Il PDSA descrive cani molto cordiali e affettuosi, che vanno d’accordo con gli altri animali, sono ottimi cani da famiglia e hanno bisogno di addestramento e socializzazione fin da piccoli; aggiunge tosatura e modellatura da un toelettatore professionista nel corso dell’anno.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frisé, bichon di Tenerife",
      text: [
        "Il bichon frisé – per la FCI bichon à poil frisé – è un cane da compagnia franco-belga. Lo standard FCI descrive un cagnolino allegro dall’andatura vivace, con un pelo bianco molto vaporoso arricciato a cavaturacciolo – un vero compagno che si può portare ovunque, né nervoso né abbaiatore – alto 25–29 cm al garrese e del peso di circa 5 kg. Da adulto è sempre bianco puro, con occhi rotondi molto scuri, tartufo nero, orecchie pendenti e una coda a pennacchio portata sul dorso.",
        "Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e la cura del pelo ogni giorno, osserva che la razza non perde pelo ed è adatta a un appartamento, e indica un’aspettativa di vita di oltre 12 anni. Il PDSA descrive cani molto affettuosi e amorevoli, ottimi con i bambini e con gli altri animali, e aggiunge che il pelo va spuntato ogni paio di mesi, spesso da un toelettatore professionista.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfie, Newf, Newfoundland",
      text: [
        "Il terranova è originario del Canada; la FCI lo classifica tra i molossoidi di tipo montano e riconosce tre colori: nero, bianco e nero (Landseer) e marrone. Il PDSA definisce i terranova dei giganti buoni e indica un’altezza media di 66–71 cm e un peso medio di 50–69 kg; PetMD aggiunge che la storia della razza ne fa dei nuotatori naturali.",
        "Il PDSA raccomanda per gli adulti almeno un’ora di movimento al giorno, ma di non far fare troppo movimento ai cuccioli finché ossa e articolazioni sono ancora in sviluppo; definisce la toelettatura un compito quotidiano, osserva che i terranova tendono a sbavare e indica un’aspettativa di vita inferiore ai 10 anni. PetMD definisce la razza un eccellente cane da famiglia, che va d’accordo con i bambini, con i piccoli animali e con gli altri cani, consiglia di sorvegliare i bambini piccoli con qualsiasi cane e avverte che alcuni possono sviluppare ansia da separazione quando restano da soli.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Dalmatian, Carriage Dog, Spotted Coach Dog, Firehouse Dog",
      text: [
        "Il dalmata è originario della Croazia; la FCI lo classifica tra le razze affini ai segugi. Il suo pelo corto e lucido è bianco puro con macchie nere o fegato (marroni) ben definite, e lo standard chiede orecchie macchiate. La FCI indica un’altezza di 56–62 cm per i maschi e 54–60 cm per le femmine; il PDSA indica un peso medio di 18–27 kg.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana, e dice che la razza perde pelo ed è adatta a una casa grande con giardino. Il PDSA definisce i dalmata ottimi animali per famiglie attive, più adatti a bambini più grandi, che hanno bisogno di compagnia e non dovrebbero mai restare da soli per più di quattro ore; indica la sordità tra i problemi di salute della razza e osserva che esiste un test dell’udito BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Bovaro australiano, Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "L’Australian cattle dog è originario dell’Australia; la FCI lo classifica tra i cani bovari. Lo standard del Kennel Club descrive un cane da lavoro forte e compatto, con un doppio mantello liscio e resistente alle intemperie, blu (marmorizzato o picchiettato) o rosso uniformemente picchiettato, e indica un’altezza di 46–51 cm per i maschi e 43–48 cm per le femmine; il PDSA indica un peso medio di 16–20 kg.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana, e dice che la razza perde pelo. Il PDSA descrive un cane molto intelligente e con molta energia, che ha bisogno di tanta attività fisica e mentale; per il suo forte istinto di conduzione può mordicchiare i talloni dei bambini che corrono, e sono utili la socializzazione e l’addestramento fin da piccolo.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "Il whippet è originario della Gran Bretagna; la FCI lo classifica tra i levrieri a pelo corto. Lo standard del Kennel Club descrive un insieme equilibrato di potenza muscolare e forza con eleganza e grazia nella linea, un pelo fine, corto e aderente di qualsiasi colore o combinazione di colori tranne il merle, e un’indole gentile, affettuosa ed equilibrata; indica un’altezza di 47–51 cm per i maschi e 44–47 cm per le femmine, e il PDSA indica un peso medio di 11–18 kg.",
        "Il PDSA raccomanda almeno un’ora di movimento ogni giorno, con la possibilità di correre senza guinzaglio in un’area sicura, e una spazzolata alla settimana con una spazzola morbida. Definisce i whippet una scelta molto diffusa per le famiglie, perché sono calmi e gentili con i bambini, ma raccomanda una casa con bambini un po’ più grandi; i whippet non amano restare da soli e hanno un istinto predatorio davvero forte, quindi il PDSA non consiglia di tenerli con animali più piccoli. D’inverno può essere utile un cappottino, e una cuccia spessa e morbida protegge le loro ossa sporgenti.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Griffone Korthals, Korthals Griffon, Wire-haired Pointing Griffon Korthals, Griff",
      text: [
        "Il griffone a pelo duro Korthals, chiamato anche griffone Korthals, è originario della Francia; la FCI lo classifica tra i cani da ferma continentali e lo definisce essenzialmente un cane da ferma versatile. Lo standard FCI descrive un cane vigoroso e rustico, più lungo che alto, con un pelo duro e ruvido, mai riccio né lanoso, un tartufo sempre marrone e, preferibilmente, un mantello grigio acciaio con macchie marroni (fegato); indica un’altezza di circa 55–60 cm per i maschi e 50–55 cm per le femmine e descrive la razza come gentile, fiera e molto dolce con i bambini. PetMD indica un peso di 35–70 libbre (circa 16–32 kg).",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, una casa grande con un grande giardino e la cura del pelo più di una volta alla settimana. PetMD consiglia una spazzolata alla settimana (alcuni cani hanno bisogno anche dello stripping manuale), dice che i griffoni sono generalmente pazienti e gentili con i bambini se socializzati da cuccioli e osserva che il loro passato di cani da caccia può dare loro un forte istinto predatorio, per cui animali più piccoli come gatti e conigli possono sembrare qualcosa da inseguire.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie, Retriever (Chesapeake Bay)",
      text: [
        "Il Chesapeake Bay retriever, spesso chiamato chessie, è originario degli Stati Uniti; la FCI lo classifica tra i cani da riporto. Lo standard FCI descrive un retriever da lavoro ugualmente abile sulla terra e in acqua, la cui taglia e sostanza non dovrebbero essere eccessive, con un pelo spesso e corto su un sottopelo fitto e lanoso e occhi chiari giallastri o ambra; è accettata qualsiasi tonalità di marrone, color carice («sedge») o color erba secca («deadgrass»), mentre il pelo nero è motivo di squalifica. Indica un’altezza di 58–66 cm e un peso di 29,5–36,5 kg per i maschi, e di 53–61 cm e 25–32 kg per le femmine.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, una casa grande con un grande giardino e una spazzolata alla settimana. PetMD descrive un cane sveglio, allegro ed estremamente affettuoso, che può diventare distruttivo se non riceve stimoli o resta troppo a lungo da solo, dice che con le giuste presentazioni e la giusta socializzazione i chessie sono un’ottima aggiunta alla famiglia e consiglia di non far fare movimento al cane subito prima o subito dopo il pasto.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Sammy, Samoyede, Samoyed",
      text: [
        "Il samoiedo è originario della Russia settentrionale e della Siberia; la FCI lo classifica tra i cani nordici da slitta. Lo standard FCI descrive uno spitz artico bianco ed elegante di taglia media, con un pelo polare abbondante, spesso e fitto, occhi marrone scuro, orecchie piccole, spesse ed erette e labbra leggermente rivolte verso l’alto agli angoli nel caratteristico «sorriso del samoiedo»; il pelo è bianco puro, crema o bianco e biscotto, e gli occhi azzurri o di colore diverso sono motivo di squalifica. Indica un’altezza ideale di 57 cm per i maschi e 53 cm per le femmine, ciascuna con una tolleranza di 3 cm.",
        "Il PDSA raccomanda almeno due ore di movimento ogni giorno e la cura del pelo quotidiana, dice che i samoiedi perdono pelo molto spesso, di solito sono ottimi con i bambini e leali verso tutta la famiglia, non dovrebbero mai restare da soli per più di quattro ore, hanno bisogno di un giardino molto sicuro perché sono abili nel fuggire e hanno un forte istinto predatorio, e consiglia di lasciar passare del tempo tra il pasto e il movimento. PetMD aggiunge che i samoiedi non stanno bene con le temperature alte.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Aberdeen Terrier, Scottish Terrier",
      text: [
        "Lo scottish terrier, spesso chiamato scottie, è originario della Gran Bretagna; la FCI lo classifica tra i terrier di piccola taglia. Lo standard del Kennel Club descrive un cane tarchiato e dalle zampe corte, dal portamento vigile, che dà un’idea di grande potenza e attività in poco spazio, leale e fedele, dignitoso, indipendente e riservato, ma coraggioso e molto intelligente: audace, ma mai aggressivo. Il suo doppio mantello aderente ha un pelo di copertura duro e ispido; il colore è nero, frumento o tigrato di qualsiasi tonalità. Indica un’altezza di 25–28 cm e un peso di 8,5–10,5 kg.",
        "Il PDSA dice che gli scottie hanno bisogno di circa un’ora di movimento al giorno e della cura del pelo quotidiana, con stripping e tosatura da un toelettatore professionista ogni due o tre mesi, li descrive come leali e devoti alla famiglia e dice che possono essere testardi, quindi l’addestramento richiede pazienza e impegno. PetMD dice che, con il giusto addestramento e la giusta socializzazione, possono essere buoni cani da famiglia, che socializzare il cucciolo è importante e che non dovrebbero restare da soli per lunghi periodi.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner, Weimaraner Pointer, Weim",
      text: [
        "Il bracco di Weimar è originario della Germania; la FCI lo classifica tra i cani da ferma continentali e riconosce una varietà a pelo corto e una a pelo lungo. Lo standard FCI descrive un cane da caccia di taglia da media a grande, di tipo funzionale da lavoro, asciutto e molto muscoloso, con occhi color ambra e orecchie larghe e piuttosto lunghe; il mantello è grigio argento, grigio capriolo o grigio topo, sono ammesse solo piccole macchie bianche sul petto e sulle dita, e qualsiasi colore diverso dal grigio è motivo di squalifica. Indica un’altezza di 59–70 cm e un peso di circa 30–40 kg per i maschi, e di 57–65 cm e circa 25–35 kg per le femmine.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, una casa grande con un grande giardino e una spazzolata alla settimana. Il PDSA dice che i bracchi di Weimar sono meravigliosi cani da famiglia nelle mani giuste e stanno meglio con proprietari che conoscono la razza, ma non li consiglia nelle case con bambini piccoli o animali più piccoli per il loro istinto predatorio molto forte, dice che possono sviluppare ansia da separazione se lasciati soli e consiglia di socializzarli fin da piccoli e di lasciar passare del tempo tra il pasto e il movimento. PetMD aggiunge la pulizia mensile delle orecchie e un bagno al mese.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Levriero italiano, Italian Greyhound, Iggy",
      text: [
        "Il piccolo levriero italiano è originario dell’Italia; la FCI lo classifica come Piccolo Levriero Italiano tra i levrieri a pelo corto. Lo standard del Kennel Club descrive un levriero in miniatura, più snello in tutte le proporzioni, elegante, aggraziato e veloce nei movimenti, intelligente, affettuoso e vivace anche se può sembrare distaccato, con un pelo corto, fine e lucido su una pelle sottile. Indica un’altezza di 32–38 cm e un peso di 3,6–4,5 kg; sono accettati nero, blu, crema, fulvo, rosso e bianco, o uno qualsiasi di questi interrotto dal bianco, mai il merle, il tigrato o le focature.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno, dice che la razza è adatta a una casa piccola, in città o in campagna, va spazzolata una volta alla settimana e non perde pelo. Il PDSA dice che i piccoli levrieri italiani sono pieni di energia, dovrebbero fare movimento in un’area chiusa perché, una volta vista una preda, può essere difficile richiamarli, possono essere timidi, quindi la socializzazione precoce è essenziale, e – poiché le loro ossa sono fragili durante la crescita – potrebbero non essere la razza ideale per case con bambini piccoli o altri animali. PetMD aggiunge che il loro pelo sottile non li tiene al caldo, quindi soffrono facilmente il freddo.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer, schnauzer di Monaco, Giant Schnauzer",
      text: [
        "Lo schnauzer gigante è originario della Germania; la FCI lo classifica come Riesenschnauzer tra i cani di tipo pinscher e schnauzer. Lo standard del Royal Kennel Club descrive un cane di costruzione potente, robusto e asciutto, dall’aspetto quasi quadrato, audace, affidabile, di buon carattere e controllato, con un pelo di copertura duro e ispido e un buon sottopelo. Indica un’altezza di 65–70 cm per i maschi e 60–65 cm per le femmine; lo standard FCI indica un peso di 35–47 kg. Sono accettati il nero puro, il sale e pepe con maschera scura e il nero e argento; nessun altro colore.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, dice che la razza è adatta a una casa grande con un grande giardino, va curata ogni giorno e non perde pelo. Il PDSA dice che il pelo va curato ogni giorno e spuntato regolarmente, che gli schnauzer giganti possono essere animali adorabili per famiglie con bambini più grandi se ben socializzati da cuccioli, e che questi cani dalla forte personalità sono adatti a proprietari esperti. PetMD aggiunge che il pelo viene sottoposto a stripping manuale da un professionista ogni pochi mesi e che la razza non sta bene in case dove le persone sono poco presenti.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Bloodhound, Chien de Saint-Hubert, St. Hubert Hound, Sleuth Hound",
      text: [
        "Il cane di Sant’Uberto è originario del Belgio; la FCI lo classifica come Chien de Saint-Hubert, tra i segugi di grande taglia. Lo standard FCI descrive il più potente di tutti i segugi: gentile, placido, buono e socievole con le persone e particolarmente legato al proprietario, con un pelo corto, fitto e resistente alle intemperie e una pelle morbida e abbondante. I maschi pesano circa 46–54 kg e le femmine circa 40–48 kg; i tre colori sono nero e fuoco, fegato e fuoco, e rosso.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, dice che la razza è adatta a una casa grande con un grande giardino, va spazzolata una volta alla settimana e perde pelo. Il PDSA dice che i cani di Sant’Uberto sono più adatti a proprietari esperti, non sono consigliati nelle case con bambini piccoli o animali più piccoli per la loro taglia e il loro istinto predatorio molto forte, sbavano e hanno bisogno che le pieghe della pelle siano tenute pulite e asciutte. Consiglia anche di lasciar passare del tempo tra il pasto e il movimento.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita, American Akita, grande cane giapponese, Great Japanese Dog",
      text: [
        "L’akita di questo registro è il tipo americano: la FCI lo classifica come akita americano, una razza di origine giapponese distinta dall’akita inu giapponese. Lo standard FCI descrive un cane grande, di costruzione solida, ben equilibrato, con molta sostanza e un’ossatura pesante, piccole orecchie erette e una grande coda portata sul dorso; i maschi sono alti 66–71 cm al garrese. È ammesso qualsiasi colore, come rosso, fulvo, bianco, pezzato o tigrato. Il PDSA indica un peso medio di 31–59 kg.",
        "Il PDSA descrive cani da famiglia incredibilmente leali, indipendenti e molto grandi, che quindi stanno meglio con proprietari esperti; non consiglierebbe un akita in una casa con bambini piccoli e sconsiglia di lasciarli soli, perché molti non lo sopportano bene. Raccomanda almeno due ore di movimento ogni giorno, la socializzazione fin da piccoli, una pausa tra il pasto e il movimento e almeno una spazzolata alla settimana: gli akita perdono molto pelo. Segnala inoltre un forte istinto predatorio e che possono surriscaldarsi quando fa molto caldo.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Corgi Cardigan, Welsh Corgi (Cardigan), Cardigan Welsh Corgi, Cardi",
      text: [
        "Il Welsh corgi Cardigan è originario della Gran Bretagna; la FCI lo classifica tra i cani bovari. Lo standard dell’American Kennel Club indica un’altezza di 10,5–12,5 pollici (circa 27–32 cm) al garrese e un peso ideale di 30–38 libbre (circa 14–17 kg) per i maschi. A differenza del cugino Pembroke, ha una coda lunga e folta.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno, indica come sufficiente una casa piccola con un giardino piccolo o medio e dice che la razza va spazzolata più di una volta alla settimana e perde pelo; indica un’aspettativa di vita di oltre 12 anni ed elenca il Cardigan tra le razze autoctone a rischio. Il PDSA dice che i Welsh corgi sono desiderosi di compiacere, quindi l’addestramento dovrebbe essere abbastanza facile, che di solito bastano due o tre spazzolate alla settimana e che possono mordicchiare i talloni dei bambini che corrono: sono utili la socializzazione con i bambini e l’addestramento fin da piccoli.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Drahthaar, Deutsch Drahthaar, German Wirehaired Pointer, GWP",
      text: [
        "Il bracco tedesco a pelo duro è originario della Germania; la FCI lo classifica come Deutsch Drahthaar tra i cani da ferma continentali. Lo standard del Royal Kennel Club descrive un cane da caccia di taglia media con un pelo duro che copre completamente la pelle: gentile, affettuoso ed equilibrato, attento, docile e molto leale. I maschi sono alti 60–67 cm e pesano 25–34 kg; le femmine sono alte 56–62 cm e pesano 20,5–29 kg. I colori dello standard sono fegato e bianco, fegato uniforme e nero e bianco.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno, dice che è adatto a una casa grande con un grande giardino in campagna, va spazzolato più di una volta alla settimana e perde pelo. PetMD dice che i drahthaar hanno bisogno di tanto movimento e di stimoli mentali, si legano molto alla famiglia e possono essere ottimi cani da famiglia se addestrati e socializzati presto, stanno bene con bambini a cui è stato insegnato come comportarsi con gli animali, non dovrebbero mai restare da soli per lunghi periodi e hanno un forte istinto predatorio. Il pelo viene sottoposto a stripping manuale due volte all’anno.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "Cane di San Bernardo, sanbernardo, St. Bernard, Saint Bernard, St. Bernhardshund, Bernhardiner",
      text: [
        "Il San Bernardo è originario della Svizzera; la FCI lo classifica come St. Bernard tra i molossoidi di tipo montano. Lo standard FCI descrive un cane di natura cordiale, da calmo a vivace e vigile, e riconosce due varietà: a pelo corto, con un pelo fitto, liscio e aderente, e a pelo lungo. I maschi sono alti almeno 70 cm e le femmine almeno 65 cm, fino a 90 e 80 cm; il PDSA indica un peso di 54–81 kg.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno, dice che la razza è adatta a una casa grande con un grande giardino, va spazzolata più di una volta alla settimana, perde pelo e di solito vive meno di dieci anni. Il PDSA dice che i San Bernardo amano stare in famiglia e stanno benissimo con persone di tutte le età, bambini compresi, vanno ben socializzati da cuccioli, vanno spazzolati almeno tre volte alla settimana, sbavano, soffrono di più il caldo e hanno bisogno di una pausa tra il pasto e il movimento. PetMD aggiunge che questi cani molto legati alle persone possono sviluppare ansia da separazione se restano da soli per lunghi periodi.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "Lo Staffordshire bull terrier è originario della Gran Bretagna; la FCI lo classifica tra i terrier di tipo bull. Lo standard FCI descrive un cane a pelo raso, ben equilibrato, di grande forza in rapporto alla taglia: tradizionalmente di coraggio e tenacia indomabili, molto intelligente e affettuoso, soprattutto con i bambini. È alto 35,5–40,5 cm; i maschi pesano 12,7–17 kg e le femmine 11–15,4 kg. Può essere tigrato, rosso, fulvo, nero, blu o bianco, uniforme o con il bianco.",
        "Il Royal Kennel Club lo definisce un meraviglioso cane da famiglia e raccomanda fino a un’ora di movimento al giorno; va spazzolato una volta alla settimana, perde pelo e di solito vive più di 12 anni. Il PDSA dice che gli staffie sono tolleranti e dolci con i bambini, ma che, essendo molto legati alle persone, sono noti per soffrire di ansia da separazione quando restano da soli, sono noti per rosicchiare oggetti e, con il loro istinto predatorio molto forte, non è una buona idea tenerli vicino ad animali più piccoli.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Airedale, re dei terrier, King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "L’Airedale terrier è originario della Gran Bretagna; la FCI lo classifica tra i terrier di taglia grande e media. Lo standard FCI lo definisce il più grande dei terrier: un cane muscoloso, attivo, piuttosto raccolto, estroverso e sicuro di sé, cordiale, coraggioso e intelligente, sempre vigile, non aggressivo ma impavido. I maschi sono alti circa 58–61 cm e le femmine circa 56–59 cm. Il suo pelo duro, fitto e ispido è fuoco con una sella nera o grigio brizzolato.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno; il pelo va curato ogni giorno, non cade, e la razza di solito vive più di 10 anni. PetMD descrive ottimi cani da famiglia che, se ben addestrati, di solito vanno d’accordo con i bambini, ma che non andrebbero lasciati troppo a lungo a sé stessi; consiglia di spazzolarli qualche volta alla settimana, una rapida pulizia delle orecchie ogni settimana e un toelettatore professionista tre o quattro volte all’anno.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, Russell Terrier (AKC), JRT",
      text: [
        "Il Jack Russell terrier – l’American Kennel Club lo chiama Russell Terrier – è originario dell’Inghilterra ed è stato sviluppato in Australia; la FCI lo classifica tra i terrier di piccola taglia. Il suo standard descrive un terrier da lavoro forte, attivo e agile, di grande carattere: vivace, attento e attivo, audace e impavido, cordiale ma tranquillamente sicuro di sé. È alto 25–30 cm e pesa circa 5–6 kg. Il suo pelo, liscio, spezzato o ruvido, è prevalentemente bianco con macchie nere e/o fuoco.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e una spazzolata alla settimana; la razza perde pelo e di solito vive più di 10 anni. Il PDSA descrive cani intelligenti e vivaci, che possono essere buoni cani da famiglia se addestrati e socializzati fin da piccoli, ma sono più adatti a famiglie con bambini un po’ più grandi; hanno un istinto predatorio molto forte, quindi gli animali più piccoli non sono consigliati, e adorano scavare.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "Il bullmastiff è un’antica razza inglese da guardia del XIX secolo, che discende dal bulldog e dal vecchio mastiff inglese; la FCI lo classifica tra i molossoidi. Il suo standard descrive un cane potente e armonico, che mostra grande forza senza essere pesante: resistente, attivo, affidabile, pieno di vita, vigile e fedele. I maschi sono alti 64–69 cm e pesano 50–59 kg, le femmine 61–66 cm e 41–50 kg. Il pelo corto e duro è di qualsiasi tonalità di fulvo, rosso o tigrato, sempre con il muso nero.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e una spazzolata alla settimana, e la razza di solito vive meno di 10 anni. Il PDSA descrive cani molto leali la cui taglia e potenza li rendono più adatti a case con soli adulti o a famiglie con bambini più grandi; hanno bisogno di una socializzazione precoce, idealmente di qualcuno sempre in casa, hanno un istinto predatorio molto forte, sbavano molto e hanno bisogno di una pausa tra il pasto e il movimento.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Cane nudo cinese, Chinese Crested Dog, Powder Puff",
      text: [
        "Il cane crestato cinese è un piccolo cane da compagnia attivo e aggraziato originario della Cina; la FCI lo classifica tra i cani nudi. Esiste in due varietà: la Hairless, con il corpo liscio e nudo e il pelo solo sulla testa (la cresta), sui piedi e sulla coda, e la Powder Puff, interamente coperta da un velo di pelo lungo e morbido. I maschi sono alti 28–33 cm e le femmine 23–30 cm; PetMD indica un peso di 8–12 libbre (3,6–5,4 kg). È ammesso qualsiasi colore tranne il merle, e il suo temperamento è descritto come allegro, mai cattivo.",
        "Il Royal Kennel Club raccomanda fino a 30 minuti di movimento al giorno e una spazzolata alla settimana; è adatto a un appartamento e la razza di solito vive più di 12 anni. PetMD descrive un cane cordiale che si inserisce bene nella maggior parte delle famiglie, comprese quelle con bambini e altri animali: ogni interazione con i bambini va sorvegliata. La pelle nuda va protetta dal sole e dal freddo, le unghie vanno controllate ogni settimana e i cuccioli hanno bisogno di una socializzazione precoce e costante.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, retriever della Nuova Scozia, Nova Scotia Duck Tolling Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "Il retriever della Nuova Scozia (Nova Scotia duck tolling retriever) – il toller – è un cane da riporto originario del Canada; il suo standard FCI descrive come corre e gioca lungo la riva, ben visibile alle anatre, per attirarle, e viene poi mandato a riportare gli uccelli. Lo standard descrive un cane di taglia media, potente, compatto e ben muscoloso, molto intelligente, facile da addestrare e di grande resistenza. La FCI indica per i maschi 48–51 cm e 20–23 kg, per le femmine 45–48 cm e 17–20 kg. Il doppio mantello idrorepellente è in varie tonalità di rosso o arancio, di solito con il bianco sulla punta della coda, sui piedi, sul petto o con una lista sul muso.",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno e la cura del pelo più di una volta alla settimana, e la razza perde pelo; PetMD consiglia di spazzolarlo una o due volte alla settimana. Un ampio studio britannico (McMillan 2024, tramite Dogs Trust) indica un’aspettativa di vita mediana di 13,2 anni, PetMD 12–14 anni, e come altri cani di taglia media raggiunge la taglia adulta verso i 12–15 mesi (PetMD). L’AKC descrive cani molto affettuosi che tendono a stare bene con i bambini, hanno bisogno di tanto esercizio fisico e di stimoli mentali, possono avere un forte istinto predatorio verso gli animali più piccoli e traggono beneficio da una socializzazione precoce e da corsi per cuccioli.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "Il cairn terrier è originario della Gran Bretagna; la FCI lo classifica tra i terrier di piccola taglia. Lo standard del Kennel Club descrive un terrier agile e vigile, dall’aspetto naturale da cane da lavoro: attivo, combattivo e resistente, dall’indole impavida e allegra, deciso ma non aggressivo. Il suo doppio mantello resistente alle intemperie ha un pelo di copertura abbondante e duro; il colore è crema, frumento, rosso, grigio o quasi nero, la tigratura è accettata e orecchie e muso scuri sono tipici. Indica un’altezza di circa 28–31 cm e un peso ideale di 6–7,5 kg.",
        "Il PDSA raccomanda almeno un’ora di movimento al giorno, dice che i cairn hanno un’energia infinita e un forte istinto di caccia, quindi vanno socializzati presto con gatti e altri piccoli animali e richiedono attenzione senza guinzaglio, e che, una volta socializzati, vanno molto d’accordo con i bambini e sono ottimi cani da famiglia. Consiglia lo stripping manuale del pelo due volte all’anno e la cura del pelo una o due volte alla settimana; Dogs Trust dice che perdono pochissimo pelo. Un ampio studio britannico (McMillan 2024, tramite Dogs Trust) indica un’aspettativa di vita mediana di 14,0 anni, PetMD 13–15 anni, e come altri cani di piccola taglia raggiunge la taglia adulta verso i 9–12 mesi (PetMD). PetMD aggiunge che hanno bisogno di tanto movimento e di stimoli mentali.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bull terrier inglese, English Bull Terrier, Bully",
      text: [
        "Il bull terrier è originario della Gran Bretagna; la FCI lo classifica tra i terrier di tipo bull (gruppo 3). È un terrier di taglia media a pelo corto: il PDSA indica un’altezza media di 51–61 cm e un peso medio di 22–31 kg, e PetMD descrive una corporatura atletica di circa 21–22 pollici e 50–70 libbre. PetMD definisce indispensabile il movimento regolare e dice che i bull terrier sono affettuosi con la famiglia, bambini compresi, ma non sempre cordiali con altri cani o con i gatti, e che socializzazione e addestramento precoci e frequenti sono fondamentali.",
        "Il PDSA raccomanda almeno un’ora di movimento al giorno, suddivisa nell’arco della giornata, e una pausa dopo i pasti prima del movimento. Dice che un bull terrier ben socializzato va d’accordo con persone di tutte le età ma, essendo un po’ eccitabile, sta meglio con bambini più grandi; gli piace avere compagnia il più possibile e ha un forte istinto predatorio, quindi serve attenzione con gatti e altri piccoli animali. Per il pelo basta una spazzolata alla settimana. Il PDSA indica un’aspettativa di vita media di oltre 10 anni e PetMD 12–13 anni; come altri cani di taglia media raggiunge la taglia adulta verso i 12–15 mesi (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Zwergpinscher, Min Pin, Miniature Pinscher",
      text: [
        "Il pinscher nano è originario della Germania; la FCI lo classifica tra i pinscher e schnauzer (gruppo 2) e lo descrive come un’immagine ridotta del pinscher tedesco: vivace, pieno di temperamento, sicuro di sé ed equilibrato. Il suo pelo è corto, fitto, liscio e lucido, unicolore dal rosso cervo al rosso-marrone scuro oppure nero focato, e la coda è naturale. Lo standard FCI indica un’altezza di 25–30 cm e un peso di 4–6 kg per maschi e femmine; come altri cani toy raggiunge la taglia adulta verso gli 8–12 mesi (PetMD).",
        "Il PDSA raccomanda fino a mezz’ora di movimento al giorno per questi cagnolini energici e sempre in attività, dice che per il pelo di solito basta una spazzolata alla settimana e osserva che possono essere testardi e indipendenti, quindi l’addestramento richiede esercizio e pazienza. PetMD dice che, con la giusta socializzazione e il giusto addestramento, possono essere ottimi cani da famiglia. VCA descrive il pinscher nano come giocherellone e molto bravo con i bambini, anche se bambini molto piccoli o turbolenti potrebbero fargli male con giochi bruschi, e dice che il pelo sottile e la taglia piccola lo rendono sensibile al freddo. Il PDSA indica un’aspettativa di vita media di oltre 12 anni e PetMD 12–16 anni.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Patou, cane dei Pirenei, Great Pyrenees, Pyrenees, Chien de Montagne des Pyrénées",
      text: [
        "Il cane da montagna dei Pirenei – negli Stati Uniti chiamato Great Pyrenees – è originario della Francia; la FCI lo classifica tra i molossoidi di tipo montano (gruppo 2) e descrive un cane di grande taglia, imponente e di costruzione forte, ma non privo di una certa eleganza. Il suo mantello è bianco, oppure bianco con macchie grigio tasso, grigio lupo, giallo pallido o arancio su testa e orecchie. Lo standard FCI indica un’altezza di 70–80 cm per i maschi e 65–75 cm per le femmine; il PDSA indica un peso medio di 40–50 kg. Come altri cani giganti raggiunge la taglia adulta verso i 18–24 mesi (PetMD).",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno, dice che la razza è adatta a una casa grande con un grande giardino, va spazzolata più di una volta alla settimana e perde pelo, e indica un’aspettativa di vita inferiore ai 10 anni (PetMD e VCA indicano 10–12 anni). Il PDSA li definisce giganti buoni – cani calmi e di buon carattere che tendono ad andare d’accordo con tutti – e dice che l’addestramento richiede pazienza e metodi basati sui premi. VCA dice che il cane dei Pirenei è devoto alla famiglia, soprattutto ai bambini, e che la socializzazione precoce è molto importante; PetMD dice che convive bene con altri animali, ma che forse sta meglio in case senza bambini piccoli, e consiglia di evitare il movimento intenso intorno ai pasti per il rischio di dilatazione-torsione gastrica.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Wheaten terrier, Wheaten, Soft Coated Wheaten Terrier, Irish Soft Coated Wheaten Terrier, SCWT",
      text: [
        "L’Irish soft coated wheaten terrier è originario dell’Irlanda; la FCI lo classifica come Irish Soft Coated Wheaten Terrier tra i terrier di taglia grande e media. Lo standard del Royal Kennel Club descrive un terrier di taglia media, compatto e ben eretto, con un pelo morbido e setoso color frumento che ricade in morbidi riccioli o onde: di buon carattere, vivace e combattivo, pieno di fiducia e di senso dell’umorismo. L’unico colore è un bel frumento limpido. Il PDSA indica un’altezza media di 46–49 cm e un peso medio di 16–20,5 kg (lo standard del Kennel Club indica 16–20,5 kg per i maschi, un po’ meno per le femmine); come altri cani di taglia media raggiunge la taglia adulta verso i 12–15 mesi (PetMD).",
        "Il Royal Kennel Club raccomanda fino a un’ora di movimento al giorno, dice che la razza è adatta a una casa piccola, va curata ogni giorno e non perde pelo. Un ampio studio britannico (McMillan 2024, tramite Dogs Trust) indica un’aspettativa di vita mediana di 13,7 anni; PetMD e VCA indicano 12–14 anni. Il PDSA li definisce cani cordiali e affidabili, ottimi cani da famiglia, anche se possono essere un po’ testardi. VCA dice che la loro natura gentile e giocherellona li rende adatti ai bambini; PetMD dice che le interazioni con i bambini vanno sorvegliate, che non amano restare da soli per lunghi periodi e consiglia una toelettatura professionale ogni quattro-sei settimane, un bagno circa una volta al mese e la pulizia delle orecchie ogni una o due settimane.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Wolfhound, Irish Wolfhound, Cú Faoil, Irish Wolf Hound",
      text: [
        "Il levriero irlandese è originario dell’Irlanda; la FCI lo classifica tra i levrieri a pelo duro. Il PDSA indica un’altezza media di 71–79 cm e un peso medio di 40–55 kg; come altri cani giganti raggiunge la taglia adulta verso i 18–24 mesi (PetMD). Il Royal Kennel Club definisce la sua taglia extra large e dice che è adatto a una casa grande con un grande giardino in campagna.",
        "Il Royal Kennel Club raccomanda più di due ore di movimento al giorno e la cura del pelo più di una volta alla settimana, e dice che la razza perde pelo. Il Kennel Club e il PDSA indicano un’aspettativa di vita inferiore ai 10 anni; PetMD indica 6–8 anni. Il PDSA non consiglia la razza nelle case con bambini piccoli, per la sua taglia e la sua forza, né con animali più piccoli, per il suo forte istinto predatorio, e dice che non dovrebbe mai restare da sola per più di quattro ore. PetMD consiglia di socializzare il cucciolo dal giorno in cui arriva a casa, di evitare il movimento subito prima o dopo il pasto (dilatazione-torsione gastrica) e di pulire le orecchie ogni due-quattro settimane.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "AmStaff, Am Staff, Staffordshire Terrier",
      text: [
        "L’American Staffordshire terrier è originario degli Stati Uniti; la FCI lo classifica tra i terrier di tipo bull. Il suo standard chiede una grande forza in rapporto alla taglia e indica un’altezza di 46–48 cm per i maschi e 43–46 cm per le femmine, ma nessun peso. PetMD indica 40–70 libbre (circa 18–32 kg) per entrambi i sessi; un cane di questa taglia raggiunge la taglia adulta verso i 12–15 mesi (PetMD).",
        "PetMD raccomanda almeno 60 minuti di movimento al giorno, dice che la razza è paziente e affettuosa con i bambini, che può essere soggetta ad ansia da separazione e che il suo forte istinto predatorio può rendere più difficile la convivenza con cani più piccoli o gatti. Uno studio britannico (McMillan et al., 2024, nella tabella di Dogs Trust) indica un’aspettativa di vita mediana di 12,5 anni; PetMD indica 12–16 anni. VCA raccomanda una spazzolata alla settimana; PetMD consiglia di socializzare il cucciolo, di evitare il movimento subito dopo il pasto (dilatazione-torsione gastrica) e di fare il bagno e pulire le orecchie circa ogni 4–6 settimane.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, cane da tartufo, Romagna Water Dog, truffle dog",
      text: [
        "Il lagotto romagnolo è un cane da acqua dal pelo riccio, di taglia da piccola a media, originario dell’Italia e noto come cane da tartufo; la FCI lo classifica tra i cani da acqua. Il suo standard indica un’altezza di 43–48 cm e un peso di 13–16 kg per i maschi, e di 41–46 cm e 11–14 kg per le femmine; un cane di questa taglia raggiunge la taglia adulta verso i 12–15 mesi (PetMD).",
        "Il Royal Kennel Club lo definisce un compagno di famiglia eccellente e vigile, raccomanda più di due ore di movimento al giorno e la cura del pelo più di una volta alla settimana, dice che non perde pelo e indica un’aspettativa di vita di oltre 12 anni; PetMD dice che i lagotti possono vivere fino a 15–17 anni. PetMD osserva che ha bisogno di continui stimoli mentali e fisici e di un’ampia socializzazione, perché può essere timido; Woodgreen dice che può soffrire se viene lasciato solo troppo spesso e raccomanda una toelettatura professionale ogni sei-otto settimane.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Malamute, Mal, Alaskan Malamute, Alaskan Mal",
      text: [
        "L’alaskan malamute è uno dei più antichi cani da slitta artici: un cane nordico da slitta potente e di costruzione solida, originario degli Stati Uniti, con un pelo spesso e ruvido. Lo standard FCI indica come misure desiderabili 63,5 cm e 38 kg per i maschi e 58,5 cm e 34 kg per le femmine; il PDSA indica 58–64 cm e 34–39 kg. Un cane di questa taglia raggiunge la taglia adulta verso i 15–18 mesi (PetMD), e il PDSA indica un’aspettativa di vita di oltre 10 anni (PetMD: 10–14 anni).",
        "Il PDSA raccomanda ogni giorno almeno due ore di movimento intenso e una spazzolata quotidiana, e dice che i malamute perdono molto pelo, hanno un istinto predatorio molto forte, non dovrebbero restare da soli per più di quattro ore e sono adatti ad adulti attivi o a famiglie con bambini più grandi; li definisce impegnativi per chi ha un cane per la prima volta. PetMD consiglia di controllare le orecchie una volta alla settimana e un bagno ogni 6–8 settimane, e osserva che il pelo spesso rende difficile per loro il caldo.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Cane del Congo, cane che non abbaia, African Barkless Dog, Congo Dog, barkless dog",
      text: [
        "Il basenji è un cane da caccia di costruzione leggera e ossatura fine originario dell’Africa centrale, che non abbaia ma emette un suo caratteristico verso simile a uno jodel; la FCI lo classifica tra i cani di tipo primitivo. Il PDSA indica un’altezza di 40–43 cm e un peso di 9–11 kg. Un cane di questa taglia raggiunge la taglia adulta verso i 9–12 mesi (PetMD), e il PDSA indica un’aspettativa di vita di oltre 12 anni (WebMD: 13–14 anni).",
        "Il PDSA raccomanda almeno un’ora di movimento al giorno (circa 60–90 minuti), tanti stimoli mentali e una spazzolata alla settimana; definisce i basenji distaccati ma affidabili, testardi e con pochissimo senso del pericolo sulla strada. WebMD dice che inseguono qualsiasi cosa sembri una preda, hanno bisogno di recinzioni molto alte o di una sorveglianza costante e stanno solo discretamente bene con i bambini piccoli, e consiglia di pulire le orecchie ogni settimana e di lavare i denti almeno due volte alla settimana.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "Gatto britannico a pelo corto, British Shorthair, British Blue",
      text: [
        "Il british shorthair è un gatto robusto dal pelo fitto e dai grandi occhi rotondi: la CFA lo definisce un gatto «orsacchiotto». Quasi tutti lo immaginano grigio-blu, ma esiste in diversi colori e disegni. Matura lentamente: la CFA dice che raggiunge la taglia definitiva verso i tre anni, VCA dice che la maturità fisica può richiedere fino a cinque anni.",
        "La CFA lo descrive come molto affettuoso e legato alle sue persone; va d’accordo con tutti in famiglia, a prescindere dall’età, ma di solito non ama essere preso in braccio, e ha convissuto con cani, conigli e uccelli. VCA descrive un livello di attività moderato e consiglia di pettinare il pelo almeno una volta alla settimana. I gattini con pedigree di solito vanno nella nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Gatto ragdoll, Rag doll",
      text: [
        "La CFA descrive il ragdoll come un gatto grande e tranquillo, con un pelo semilungo, morbido e setoso e occhi azzurri. Le zone più scure del mantello («point») esistono in diversi disegni: colourpoint senza bianco, mitted con i piedi bianchi, bicolore con più bianco e van. Matura lentamente: raggiunge il colore definitivo del mantello a due anni e la taglia e il peso definitivi verso i quattro.",
        "La CFA descrive un gatto gentile che ti accoglie alla porta e ti segue di stanza in stanza, e che di solito gioca senza tirare fuori le unghie. PetMD lo definisce una buona scelta per le famiglie, anche con bambini, ma consiglia presentazioni lente e sorvegliate ai bambini e agli altri animali, e dice che alcuni ragdoll vanno pettinati solo una o due volte alla settimana, mentre la CFA consiglia di pettinarli regolarmente. I gattini con pedigree di solito vanno in una nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Gatto siberiano, gatto delle foreste siberiane, Siberian, Siberian Forest Cat",
      text: [
        "Il GCCF descrive il siberiano come un gatto a sviluppo lento con un pelo spesso e resistente alle intemperie: un sottopelo fitto e morbido sotto un pelo di copertura più ruvido, che cade abbondantemente in primavera e in autunno. I maschi pesano circa 7,7–11,8 kg e le femmine 5,9–7,7 kg, lo sviluppo completo può richiedere da quattro a cinque anni, e il GCCF indica un’aspettativa di vita di 12–15 anni o più.",
        "Il GCCF lo descrive come energico e giocherellone ma paziente, una buona scelta per famiglie con bambini piccoli, e dice che va d’accordo con gli altri animali, cani compresi. PetMD consiglia di pettinarlo almeno una volta alla settimana, con un impegno in più durante la muta di primavera e d’autunno, e osserva che i siberiani non sono considerati ipoallergenici. I gattini con pedigree di solito vanno nella nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Gatto maine coon, Maine Coon cat",
      text: [
        "Il maine coon è considerato da molti una delle razze di gatto domestico più grandi, con un corpo muscoloso e rettangolare, il petto ampio, zampe grandi e una coda lunga e fluente. TICA indica un peso medio di circa 5,9–8,2 kg per i maschi adulti e 4,1–5,9 kg per le femmine, e la CFA osserva che alcuni maschi pesano più di 9 kg. Cresce lentamente: secondo la CFA spesso non raggiunge lo sviluppo completo prima dei tre o quattro anni, e TICA dice che la piena maturità può richiedere da tre a cinque anni.",
        "TICA lo descrive come gentile, cordiale e giocherellone, la CFA come socievole, leale e intelligente; spesso «parla» con un trillo cinguettante invece che con un miagolio. Vetstreet scrive che i maine coon vanno d’accordo con tutti, bambini, cani e altri gatti compresi. Il suo pelo pesante e semilungo è più corto sulle spalle e più lungo sulla gorgiera, sul ventre e sulla parte posteriore. Le fonti non concordano sulla toelettatura: Vetstreet dice che basta pettinarlo una volta alla settimana, la CFA consiglia di spazzolarlo o pettinarlo almeno un paio di volte alla settimana, e TICA osserva che un pelo più folto può richiedere la pettinatura ogni giorno. I gattini con pedigree di solito vanno nella nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Gatto del Bengala, Bengala, Bengal cat",
      text: [
        "Il PDSA descrive il bengal come molto intelligente ed energico, un gatto che ha bisogno di tanti stimoli mentali e di occasioni per muoversi e che ama i punti di osservazione in alto, come un albero tiragraffi. È affettuoso, ma è più probabile che si accoccoli accanto a te che in grembo, e può essere piuttosto «chiacchierone». VCA osserva che i bengal crescono lentamente e possono impiegare fino a due anni per raggiungere la maturità fisica.",
        "Il suo pelo corto e morbido, maculato o marmorizzato, ha bisogno solo di una leggera spazzolata o pettinata una volta alla settimana (PDSA). PetMD osserva che il bengal potrebbe non essere la scelta migliore per famiglie con bambini piccoli, mentre con cani e altri gatti può andare bene se le presentazioni sono fatte nel modo giusto. La razza è stata sviluppata da incroci tra il gatto leopardo asiatico e gatti domestici; PetPrep mostra solo il bengal domestico registrato. I gattini con pedigree di solito vanno nella nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Gatto delle foreste norvegesi, Norwegian Forest Cat, Wegie, Skogkatt",
      text: [
        "Il GCCF descrive il norvegese delle foreste come un gatto gentile e cordiale, che ama far parte di una famiglia. Matura lentamente e non è considerato completamente adulto fino ai quattro-cinque anni circa; i maschi pesano circa 5,4–7,3 kg e le femmine 4,1–5,4 kg, e il GCCF indica un’aspettativa di vita di 14–16 anni.",
        "Ha molta energia, ama i giochi interattivi e si arrampica volentieri; il GCCF dice che è tollerante con i bambini rispettosi, con gli altri gatti e con i cani abituati ai gatti. PetMD consiglia di pettinarlo e spazzolarlo almeno una volta alla settimana, più spesso durante la muta di primavera e d’autunno, e osserva che l’ansia da separazione può essere un problema se resta spesso da solo per lunghi periodi. I gattini con pedigree di solito vanno nella nuova casa a 12–13 settimane (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default it;
