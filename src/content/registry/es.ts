import type { RegistryCopy } from "./types";

/** Spanish plural: 1 → singular, everything else (0, 1,5, 2 …) → plural (« 1,5 años », « 2 razas »). */
const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** First letter lower case for values that continue a phrase (« Perros » → « de perros »). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("es") + t.slice(1);
/** Spanish clock time, 24 h without a leading zero: "09:00" → « 9:00 », "16:30" → « 16:30 ». */
const hhmm = (t: unknown) => String(t).replace(/^0(\d)/, "$1");
/** Breed name inside a sentence (Fundéu): lower case, except proper-name parts (« el border collie », « el Jack Russell terrier », « el san bernardo »). */
const rn = (name: string) =>
  /^(Jack|Chesapeake|Boston|Yorkshire|Airedale|Staffordshire|American)\b/.test(name) ? name : lc(name).replace(/^san Bernardo/, "san bernardo");
type Fci = { number: number; group: number; origin: string };
/** Official Spanish FCI group names (FCI nomenclature), in running-text form. */
const fciGroups: Record<number, string> = { 1: "perros de pastor y perros boyeros (excepto boyeros suizos)", 2: "perros tipo pinscher y schnauzer – molosoides – perros tipo montaña y boyeros suizos", 3: "terriers", 4: "teckels", 5: "perros tipo spitz y tipo primitivo", 6: "perros tipo sabueso, de rastro y razas semejantes", 7: "perros de muestra", 8: "perros cobradores de caza – levantadores de caza – perros de agua", 9: "perros de compañía", 10: "lebreles" };
const origins: Record<string, string> = { GB: "Gran Bretaña", FR: "Francia", DE: "Alemania", US: "Estados Unidos", CU: "Cuba", CH: "Suiza", IT: "Italia", "CN-XZ": "Tíbet (China)", CN: "China", MX: "México", BE: "Bélgica", HU: "Hungría", JP: "Japón", ZA: "Sudáfrica", "BE-FR": "Bélgica / Francia", PT: "Portugal", CA: "Canadá", HR: "Croacia", AU: "Australia", RU: "Rusia", IE: "Irlanda", "AF-C": "África central" };

const es: RegistryCopy = {
  mistakes: {
    title: (breed) => `Errores frecuentes de los dueños de un ${rn(breed)}`,
    intro: "Pequeños hábitos que causan problemas mayores. Cada punto procede de las fuentes de esta raza.",
    exercise: "Poco ejercicio diario",
    exerciseText: (amount) => `Ejercicio necesario: ${amount}. Planifícalo para todos los días, no solo para el fin de semana.`,
    coat: "Descuidar el cuidado del pelaje",
    coatText: (brushing, shedding) => `Cepillado: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Demasiados premios y comidas demasiado abundantes",
    heat: "Paseos con calor",
    growth: "Olvidar que el cachorro todavía está creciendo",
    growthText: (growthEnd) => `Alcanza el tamaño adulto: ${growthEnd}. Hasta entonces, planifica el ejercicio y la comida pensando en un animal joven que aún crece, y pregunta a tu veterinario qué le conviene al tuyo.`,
    mind: "Poca actividad para la mente",
    health: "Pasar por alto los problemas de salud conocidos de la raza",
    practise: "En PetPrep, un niño practica precisamente estos hábitos (pasos, comidas, cuidados) antes de que llegue a casa la mascota real.",
  },
  hub: {
    title: "Conoce al animal antes de que llegue a casa.",
    intro:
      "Lo que de verdad necesita cada especie y cada raza de PetPrep, según clubes caninos, registros felinos, organizaciones veterinarias y estudios, con enlace a cada fuente. Y además, las reglas que usa PetPrep para simularlo.",
    breedCount: (n) => `${n} ${s(n, "raza", "razas")} en el registro`,
    open: "Ver razas",
    openA11y: (many) => `Ver razas: ${lc(many)}`,
    freePlan: (name, activity) => `Plan gratuito: ${lc(name)} (${activity} en la edad adulta). No tiene página de raza.`,
    otherSpecies: "Hay más animales previstos.",
    methodTitle: "Cómo construimos este registro",
    method: [
      "Cada dato procede de una fuente con nombre (clubes caninos, registros felinos, organizaciones y asociaciones veterinarias y estudios revisados por pares) y enlaza a ella. Los estándares de raza los resumimos con nuestras propias palabras.",
      "Los valores que ninguna fuente respalda nunca se muestran como datos. Cuando PetPrep tiene que elegir una cifra para el juego, aparece solo en «Cómo lo simula PetPrep», marcada como regla del juego.",
      "Los mismos datos alimentan la app: las etiquetas, el número de comidas, los objetivos de pasos y las sesiones de juego de estas páginas son los que usa la mascota de la app.",
      "Este registro no es un consejo veterinario. La información de salud es solo orientativa y no la ha revisado un veterinario.",
    ],
  },
  speciesStatus: { available: "En la app", coming_soon: "Pronto en la app", info_only: "Solo información" },
  availability: {
    in_app: { label: "En la app", text: "Disponible en el Reto PetPrep de 12 semanas (raza de pago)." },
    coming_soon: { label: "Pronto en la app", text: "Creada y probada; llegará con una próxima versión de la app." },
    info_only: { label: "Solo información", text: "Está en el registro a título informativo; todavía no puedes adoptarla en la app." },
  },
  catalogue: {
    eyebrow: "Registro de animales",
    title: (many) => `${many}: razas del registro`,
    lead: (many, count) =>
      `${count} ${s(count, "raza", "razas")} de ${lc(many)} con necesidades respaldadas por fuentes, para quién son adecuadas y cómo las simula PetPrep. Busca, filtra y compara hasta tres.`,
    metaTitle: (many) => `${many}: registro de razas con fuentes | PetPrep`,
    metaDescription: (many) =>
      `Busca y compara razas de ${lc(many)} según sus necesidades, su tamaño y para quién son adecuadas. Cada dato enlaza a su fuente; y además, las reglas que usa PetPrep para simular cada raza.`,
    searchLabel: "Buscar razas",
    searchPlaceholder: "Nombre, p. ej., labrador",
    filtersTitle: "Filtros",
    any: "Cualquiera",
    availabilityLabel: "En PetPrep",
    sortLabel: "Ordenar",
    sort: { recommended: "Primero las de la app", az: "A-Z", size: "Tamaño (de pequeño a grande)" },
    clear: "Borrar todo",
    results: (total) => `{n} de ${total} ${s(total, "raza", "razas")}`,
    none: "Ninguna raza coincide. Prueba con menos filtros.",
    loading: "Cargando la búsqueda…",
    page: "Página {n} de {total}",
    prev: "Anterior",
    next: "Siguiente",
    compareAdd: "Comparar: {name}",
    compareBar: "{n} de {max} seleccionadas para comparar",
    compareGo: "Comparar",
    compareMax: "Puedes comparar hasta {max} razas.",
    azTitle: "Todas las razas de la A a la Z",
    azIntro: "Todas las razas del registro, por orden alfabético.",
    freePlanTitle: "Plan gratuito",
    guideTitle: "Cómo elegir una raza",
    guide: () => [
      "Empieza por lo que tu hogar puede ofrecer cada día: tiempo para el ejercicio y el cuidado del pelaje, y espacio. La página de cada raza muestra estas necesidades de un vistazo, con la fuente de cada valor; cuando las fuentes no coinciden, se muestran todos los valores.",
      "Cuando una raza tiene una categoría de tamaño (en perros: miniatura, pequeño, mediano, de mediano a grande, grande o gigante), es la que indica la fuente citada, normalmente un club canino, y los pesos son los intervalos que dan las fuentes, no estimaciones nuestras.",
      "Etiquetas como «Adecuado para: una familia activa» son las mismas que en la app y cada una está respaldada por fuentes. Las cifras de «Cómo lo simula PetPrep» son reglas del juego de PetPrep, no instrucciones de cuidado. [Cómo construimos el registro](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Comparar razas de ${lc(many)}`,
    metaTitle: (many) => `Comparar razas de ${lc(many)} | Registro PetPrep`,
    intro: "Las necesidades principales, una al lado de otra, de las mismas fuentes que las páginas de raza.",
    pick: "Elige dos o tres razas en el catálogo para compararlas.",
    back: "Volver al catálogo",
    remove: "Quitar: {name}",
    note: "Los valores se dan tal como los indica la fuente citada. Cuando las fuentes no coinciden, la página de la raza los recoge todos.",
    availabilityRow: "En PetPrep",
    activityRow: "Objetivo diario de un adulto en PetPrep (regla del juego)",
  },
  facets: {
    size: { label: "Tamaño", values: { toy: "Miniatura", small: "Pequeño", small_medium: "De pequeño a mediano", medium: "Mediano", medium_large: "De mediano a grande", large: "Grande", giant: "Gigante" } },
    exercise: { label: "Ejercicio diario", values: { under_1h: "Hasta 1 hora", h1_2: "De 1 a 2 horas", over_2h: "Más de 2 horas" }, line: (v) => `${lc(v)} al día` },
    grooming: { label: "Cepillado", values: { weekly: "Una vez por semana", several_weekly: "Varias veces por semana", daily: "A diario", other: "Otra frecuencia" }, line: (v) => `cepillado: ${lc(v)}` },
  },
  groups: {
    exercise: "Ejercicio",
    play: "Juego",
    litter: "Arenero",
    scratching: "Rascado",
    grooming: "Pelaje y cuidado del pelaje",
    feeding: "Comidas",
    water: "Agua",
    lifespan: "Esperanza de vida",
    stages: "Etapas de la vida",
    size: "Tamaño y peso",
    training: "Adiestramiento",
  },
  fields: {
    size: "Tamaño",
    height: "Altura a la cruz",
    weight: "Peso adulto",
    growth_end: "Alcanza el tamaño adulto",
    lifespan: "Esperanza de vida",
    exercise: "Ejercicio diario",
    coat: "Pelaje",
    grooming_frequency: "Cepillado",
    grooming_level: "Necesidad de cuidado del pelaje",
    shedding: "Muda del pelo",
    litter_scoop: "Retirar los excrementos del arenero",
    litter_full_change: "Cambiar toda la arena",
    litter_pee: "Orina (adulto)",
    litter_poo: "Defeca (adulto)",
    water_need: "Necesidad de agua",
    sleep: "Sueño (adulto)",
  },
  contexts: {
    puppy_8_12_weeks: "8-12 semanas",
    puppy_3_6_months: "3-6 meses",
    puppy_6_12_months: "6-12 meses",
    kitten_6_12_weeks: "6-12 semanas",
    kitten_3_6_months: "3-6 meses",
    kitten_6_12_months: "6-12 meses",
    puppy: "Cachorro",
    kitten: "Gatito",
    young_adult: "Adulto joven",
    mature_adult: "Adulto maduro",
    adult: "Adulto",
    senior: "Sénior",
  },
  categories: {
    size: { toy: "miniatura", small: "pequeño", small_medium: "de pequeño a mediano", medium: "mediano", medium_large: "de mediano a grande", large: "grande", giant: "gigante" },
    coat: { moderately_long: "moderadamente largo", smooth: "liso (corto)", short: "corto", medium: "de longitud media", short_long: "corto o largo (dos variedades de pelo)", long: "largo" },
    grooming_frequency: { at_least_once_a_week: "al menos una vez por semana", at_least_once_or_twice_a_week: "al menos una o dos veces por semana", once_a_week: "una vez por semana", more_than_once_a_week: "más de una vez por semana", daily: "a diario", every_day: "todos los días" },
    grooming_level: { moderate: "moderada", high: "alta", low: "baja" },
    shedding: { yes: "suelta pelo", no: "no suelta pelo (lo que no significa que sea hipoalergénico)", high: "suelta mucho pelo", moderate: "suelta pelo de forma moderada", low: "suelta poco pelo", minimal: "apenas suelta pelo" },
  },
  statements: {
    food_motivated: () => "Muy motivado por la comida: ayuda en el adiestramiento, pero vigila las raciones.",
    coren_rank: (v) => `Puesto n.º ${String(v)} en la clasificación de Stanley Coren de inteligencia de trabajo y obediencia.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Estándar FCI n.º ${x.number}, grupo ${x.group}: ${fciGroups[x.group] ?? "—"}; origen: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Juego: de ${f.num(x.sessions[0])} a ${f.num(x.sessions[1])} sesiones de ${f.num(x.minutes[0])} a ${f.num(x.minutes[1])} minutos al día.`;
    },
    kittens_play_more: () => "Los gatitos necesitan jugar más a menudo.",
    scratching_natural: () => "Arañar es natural y necesario: ofrécele un rascador y nunca lo castigues por ello.",
    water_fresh: () => "Agua fresca en todo momento; lava y rellena el cuenco a diario.",
    grooming_sources_differ: () => "Las fuentes no coinciden sobre la frecuencia del peinado: desde todos los días hasta una vez por semana.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediana: ${t}`,
    more_than: (t) => `más de ${t}`,
    less_than: (t) => `menos de ${t}`,
    at_least: (t) => `al menos ${t}`,
    up_to: (t) => `hasta ${t}`,
    ideal: (t) => `ideal (estándar de la raza): ${t}`,
    mean: (t) => `promedio medido: ${t}`,
    about: (t) => `aproximadamente ${t}`,
    until: (t) => `hasta ${t}`,
    until_about: (t) => `hasta aproximadamente ${t}`,
    span: (t) => t,
    from: (t) => `a partir de ${t}`,
    last: (t) => {
      // « el último 25 % de… », « los últimos 6 meses », « las últimas 2 semanas ».
      if (/%/.test(t)) return `el último ${t}`;
      const m = t.match(/^([\d,.–-]+)[\s ](.+)$/);
      if (!m) return `los últimos ${t}`;
      const fem = /^(hora|semana)/.test(m[2]);
      if (m[1] === "1") return `${fem ? "la última" : "el último"} ${m[2]}`;
      return `${fem ? "las últimas" : "los últimos"} ${m[1]} ${m[2]}`;
    },
    every: (t) => (/^1[\s ]/.test(t) ? `cada ${t.replace(/^1[\s ]/, "")}` : `cada ${t}`),
    expectancy: (t) => `esperanza de vida al nacer: ${t}`,
    smaller_meals: (t) => `${t}, en raciones más pequeñas`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "año", "años")}`,
    months: (t, n) => `${t} ${s(n, "mes", "meses")}`,
    days: (t, n) => `${t} ${s(n, "día", "días")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "hora", "horas")} al día` : `${t} ${s(n, "minuto", "minutos")} al día`),
    meals_per_day: (t, n) => `${t} ${s(n, "comida", "comidas")} al día`,
    times_per_day: (t, n) => `${t} ${s(n, "vez", "veces")} al día`,
    hours_per_day: (t, n) => `${t} ${s(n, "hora", "horas")} al día`,
    ml_per_kg_day: (t) => `${t} ml por kg de peso corporal al día`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)} % de la esperanza de vida prevista`,
  },
  males: "machos",
  females: "hembras",
  or: " o ",
  notes: { size_class_guidance: "pauta para su categoría de tamaño" },
  stageLabels: {
    dog: { puppy: "Cachorro", young: "Perro joven", adult: "Adulto", senior: "Sénior" },
    cat: { puppy: "Gatito", young: "Gato joven", adult: "Gato maduro", senior: "Sénior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${s(raw, "paso", "pasos")}`,
    steps_range: (from, to) => `${from} → ${to} pasos`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} pasos por mes de edad (${first} al llegar), hasta ${cap} a partir del mes ${capMonth}`,
    play_sessions: (n) => `${n} ${s(n, "sesión", "sesiones")} de juego`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Objetivo de pasos = minutos de ejercicio diario × ${p.per_minute} pasos: un adulto necesita ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "hora", "horas")}` : `${p.minutes} ${s(p.minutes, "minuto", "minutos")}`}, es decir, ${f.num(p.steps)} pasos al día.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Aprende las órdenes más despacio que el perro mestizo del plan gratuito (${f.num(p.multiplier)} veces su velocidad).`
        : p.multiplier === 1
          ? "Aprende las órdenes tan rápido como el perro mestizo del plan gratuito."
          : `Aprende las órdenes ${f.num(p.multiplier)} veces más rápido que el perro mestizo del plan gratuito.`,
    senior_share: (p, f) => `Pasa a ser sénior en el mes ${p.months} (${f.num(p.months / 12, 1)} ${s(p.months / 12, "año", "años")}): el último cuarto de la esperanza de vida prevista de la raza.`,
    walk_sensor: () => "Los paseos cuentan pasos reales de Apple Health o Health Connect (con permiso, solo lectura) y del sensor de movimiento del móvil, sin GPS.",
    play_instead_of_steps: (p, f) =>
      `Sin paseos: un gato adulto necesita ${p.sessions} ${s(p.sessions, "sesión", "sesiones")} de juego al día con una caña de juego, con al menos ${f.num(p.gap_minutes / 60)} ${s(p.gap_minutes / 60, "hora", "horas")} entre una y otra.`,
    litter_rule: (p) =>
      `Arenero: un gato adulto lo usa ${p.uses} ${s(p.uses, "vez", "veces")} al día; cada uso se limpia en ${p.scoop_hours === 1 ? "menos de una hora" : `un plazo de ${p.scoop_hours} horas`} (fuera de las horas de descanso) y toda la arena se cambia ${p.change_days === 1 ? "cada día" : `cada ${p.change_days} días`}.`,
    scratching_after_missed_play: () => "Tras un día sin suficiente juego, el gato araña algo una vez; el niño lo lleva al rascador.",
    grooming_rule: (p) => (p.per_week === 1 ? "Peinado una vez por semana." : p.per_week === 2 ? "Peinado dos veces por semana." : `Peinado ${p.per_week} veces por semana.`),
    no_walk_in_heat: (p) =>
      `En verano (de junio a agosto; de diciembre a febrero en el hemisferio sur), las pantallas del niño y del paseo muestran un aviso discreto entre las ${hhmm(p.from)} y las ${hhmm(p.to)} (hora de la familia): nada de paseos con calor. Sin datos meteorológicos y sin penalización: los pasos siguen contando.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "limpiar los pliegues de la piel",
        tooth_brushing: "cepillar los dientes",
        ear_cleaning: "revisar y limpiar las orejas",
        nail_trim: "cortar las uñas",
        bath: "un baño",
        groomer_visit: "una visita a la peluquería de mascotas",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "todos los días"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "una vez por semana"
              : `cada ${q.period_days / 7} semanas`
            : q.period_days === 7
              ? `${q.times} ${s(q.times, "vez", "veces")} por semana`
              : q.times === 1
                ? `cada ${q.period_days} días`
                : `${q.times} ${s(q.times, "vez", "veces")} cada ${q.period_days} días`;
      const who = q.actor === "parent" ? "un recordatorio para el padre o la madre" : "una tarea para el niño";
      return `Cuidados: ${what}, ${when} (${who}).`;
    },
  },
  checklist: {
    items: {
      see_mother: "Conoce al cachorro junto a su madre, en el lugar donde nació.",
      min_age_puppy: "El cachorro no debería separarse de su madre antes de las 8 semanas de edad.",
      pedigree_fci: "Pide el pedigrí. Según las normas de la FCI, solo puede expedirse un pedigrí cuando la ascendencia es correcta.",
      parents_health_tests: "Pide ver los resultados de las pruebas de salud de ambos progenitores. Qué pruebas importan depende de la raza.",
      breed_club_rules: "Los clubes caninos nacionales pueden fijar normas de cría más exigentes que las de la FCI: pregunta al club de la raza qué pruebas necesitan los progenitores.",
      written_contract: "Pide un contrato de compraventa por escrito que recoja el origen y la salud del cachorro.",
      kitten_see_mother: "Conoce al gatito junto a su madre, en el lugar donde viven los gatitos.",
      kitten_min_age: "Según las normas de pedigrí de la FIFe, un gatito no va a un nuevo hogar antes de las 14 semanas de edad.",
      kitten_vaccination: "El gatito tiene todas las vacunas (panleucopenia, calicivirus, herpesvirus) y viene con su cartilla de vacunación.",
      kitten_pedigree: "Un gatito con pedigrí viene con un certificado de pedigrí de al menos tres generaciones.",
      kitten_parents_tests: "Pregunta si alguno de los progenitores ha tenido problemas de salud que el gatito pudiera heredar.",
    },
    tests: {
      hip_scheme: "Radiografía de cadera para detectar la displasia de cadera (Reino Unido: programa BVA/KC)",
      elbow_scheme: "Radiografía de codo para detectar la displasia de codo (Reino Unido: programa BVA/KC)",
      eye_scheme: "Examen ocular realizado por un oftalmólogo veterinario (Reino Unido: programa BVA/KC/ISDS; en algunas razas, con gonioscopia)",
      heart_scheme: "Revisión cardiaca para detectar la enfermedad de la válvula mitral",
      boas_grading: "Prueba respiratoria para el síndrome obstructivo de las vías respiratorias de los braquicéfalos (clasificación BOAS)",
      ivdd_screening: "Revisión de la columna para detectar la enfermedad del disco intervertebral (IVDD)",
      hearing_baer: "Prueba de audición para detectar la sordera (BAER)",
      cm_sm_mri: "Resonancia magnética para detectar la malformación tipo Chiari y la siringomielia (Reino Unido: programa BVA/KC CM/SM)",
      inbreeding_coi: "Diversidad genética: comprueba el coeficiente de consanguinidad",
      dna_prcd_pra: "Prueba de ADN de atrofia progresiva de retina (prcd-PRA)",
      dna_rcd4_pra: "Prueba de ADN de atrofia progresiva de retina (rcd4)",
      dna_gr_pra2: "Prueba de ADN de atrofia progresiva de retina (GR_PRA2)",
      dna_cnm: "Prueba de ADN de miopatía centronuclear (CNM)",
      dna_eic: "Prueba de ADN de colapso inducido por el ejercicio (EIC)",
      dna_hnpk: "Prueba de ADN de paraqueratosis nasal hereditaria (HNPK)",
      dna_sd2: "Prueba de ADN de displasia esquelética 2 (SD2)",
      dna_mcd: "Prueba de ADN de distrofia corneal macular (MCD)",
      dna_stgd: "Prueba de ADN de enfermedad de Stargardt (STGD)",
      dna_cc_de: "Prueba de ADN de síndrome de pelo rizado y ojo seco (CC/DE)",
      dna_ef: "Prueba de ADN de caída episódica (EF)",
      dna_cea: "Prueba de ADN de anomalía del ojo del collie (CEA/CH)",
      dna_cl: "Prueba de ADN de lipofuscinosis ceroide (CL)",
      dna_igs: "Prueba de ADN de síndrome de Imerslund-Gräsbeck (IGS)",
      dna_mdr1: "Prueba de ADN de sensibilidad a múltiples fármacos (MDR1)",
      dna_tns: "Prueba de ADN de síndrome de neutrófilos atrapados (TNS)",
      dna_sn: "Prueba de ADN de neuropatía sensitiva (SN)",
      dna_ggd: "Prueba de ADN de goniodisgenesia y riesgo de glaucoma (GGD)",
      dna_raines: "Prueba de ADN de síndrome de Raine",
      dna_dm: "Prueba de ADN de mielopatía degenerativa (DM)",
      dna_de: "Prueba de ADN de encefalopatía degenerativa (DE)",
      dna_jadd: "Prueba de ADN de enfermedad de Addison juvenil (JADD)",
      dermoid_sinus_scheme: "Revisión de los cachorros para detectar el seno dermoide (programa del club de la raza)",
      dna_jme: "Prueba de ADN de epilepsia mioclónica juvenil (JME)",
      dna_je: "Prueba de ADN de epilepsia juvenil (JE)",
      dna_lsd: "Prueba de ADN de enfermedad de almacenamiento lisosomal (LSD)",
      dna_ampn: "Prueba de ADN de polineuropatía del malamute de Alaska (AMPN)",
      dna_fanconi: "Prueba de ADN de síndrome de Fanconi (una enfermedad renal)",
      dna_pra_bj1: "Prueba de ADN de atrofia progresiva de retina en el basenji (PRA-BJ1)",
      thyroid_scheme: "Análisis de tiroides de los progenitores",
      dna_pap_pra1: "Prueba de ADN de atrofia progresiva de retina en el papillon (Pap-PRA1)",
      dna_nad: "Prueba de ADN de distrofia neuroaxonal (NAD)",
      dna_eopra: "Prueba de ADN de atrofia progresiva de retina de aparición temprana (EOPRA)",
      dna_cu: "Prueba de ADN de cistinuria (CU), una enfermedad hereditaria que forma cálculos en los riñones y la vejiga",
      heart_echo_scheme: "Revisión cardiaca con ecografía Doppler color (programa del club de la raza)",
      cardiac_exam: "Examen cardiaco de los progenitores (recomendación del club de la raza)",
      dna_rd_osd: "Prueba de ADN de displasia retiniana / displasia oculoesquelética (RD/OSD)",
      dna_xlpra1: "Prueba de ADN de atrofia progresiva de retina ligada al cromosoma X (XLPRA1)",
      dna_cmo: "Prueba de osteopatía craneomandibular (CMO), un trastorno óseo hereditario de la mandíbula",
      dna_hsf4: "Prueba de ADN de catarata hereditaria (HSF4)",
      dna_lafora: "Prueba de ADN de enfermedad de Lafora",
      dna_nccd: "Prueba de ADN de degeneración cortical cerebelosa neonatal (NCCD)",
      dna_fviid: "Prueba de ADN de deficiencia del factor VII (FVIID)",
      dna_mls: "Prueba de ADN de síndrome de Musladin-Lueke (MLS)",
      dna_vwd1: "Prueba de ADN de enfermedad de von Willebrand tipo 1 (vWD1)",
      dna_mac: "Prueba de ADN de predisposición a la infección por el complejo Mycobacterium avium (MAC)",
      dna_imgd: "Prueba de ADN de miopatía hereditaria del gran danés (IMGD), una enfermedad que provoca pérdida de masa muscular",
      dna_poag: "Prueba de ADN de glaucoma primario de ángulo abierto (POAG), una enfermedad ocular hereditaria que puede causar ceguera",
      dna_aon: "Prueba de ADN de neuropatía de aparición adulta (AON), una enfermedad nerviosa hereditaria",
      dna_fn: "Prueba de ADN de nefropatía familiar (FN), una enfermedad renal hereditaria",
      patella_scheme: "Revisión de la rótula para detectar la luxación de rótula antes de la cría",
      kidney_scheme: "Ecografía renal para detectar la falta o la malformación de un riñón (recomendación del club de la raza)",
      kidney_upc_scheme: "Análisis de orina (cociente proteína/creatinina) para detectar enfermedad renal (recomendación del club de la raza)",
      dna_gld: "Prueba de ADN de leucodistrofia de células globoides (GLD), una enfermedad nerviosa hereditaria",
      liver_shunt_scheme: "Revisión hepática para detectar una derivación portosistémica o una displasia microvascular (recomendación del club de la raza)",
      breed_health_scheme: "Programa de salud del club de la raza para los progenitores",
      hemivertebrae_scheme: "Radiografía de la columna de los progenitores para detectar hemivértebras (vértebras malformadas), a partir de los 12 meses de edad",
      dna_hcm_mc: "Prueba de ADN de miocardiopatía hipertrófica (MC HCM)",
      dna_sma: "Prueba de ADN de atrofia muscular espinal (SMA)",
      dna_pk_def: "Prueba de ADN de deficiencia de piruvato quinasa (PK def)",
      hcm_negative: "Los gatos reproductores deben dar negativo en HCM (enfermedad cardiaca: miocardiopatía hipertrófica)",
      dna_gsd4: "Prueba de ADN de glucogenosis tipo IV (GSD IV)",
      dna_pra_b: "Prueba de ADN de atrofia progresiva de retina en el bengalí (PRA-b)",
      dna_jlpp: "Prueba de ADN de parálisis laríngea juvenil y polineuropatía (JLPP)",
      dna_lemp2: "Prueba de ADN de leucoencefalomielopatía (LEMP-2)",
      dna_huu: "Prueba de ADN de hiperuricosuria (HUU)",
      dna_dcm: "Prueba de ADN de miocardiopatía dilatada (DCM), una enfermedad del músculo cardiaco",
      dna_pra5: "Prueba de ADN de atrofia progresiva de retina (PRA5)",
      dna_dings2: "Prueba de ADN de la enfermedad del dóberman danzante (DINGS2), un trastorno nervioso y muscular",
      dna_ams: "Prueba de ADN de síndrome de mutilación acral (AMS), un trastorno nervioso que hace perder la sensibilidad al dolor en las patas",
      dna_dams: "Prueba de ADN de síndrome de anemia diseritropoyética y miopatía (DAMS), un trastorno de la sangre y los músculos",
      dna_fuco: "Prueba de ADN de fucosidosis, una enfermedad hereditaria del sistema nervioso",
      dna_pfk: "Prueba de ADN de deficiencia de fosfofructoquinasa (PFK), un trastorno enzimático hereditario de la sangre y los músculos",
      dna_pra_cord1: "Prueba de ADN de atrofia progresiva de retina (PRA cord1)",
      dna_bbs2_pra: "Prueba de ADN de atrofia progresiva de retina (BBS2-PRA)",
      dna_cnga1_pra: "Prueba de ADN de atrofia progresiva de retina (CNGA1-PRA)",
      dna_pra_rcd2: "Prueba de ADN de atrofia progresiva de retina (PRA-rcd2)",
      dna_gm1: "Prueba de ADN de gangliosidosis GM1 (una enfermedad hereditaria del sistema nervioso)",
      dna_gm2: "Prueba de ADN de gangliosidosis GM2 (una enfermedad hereditaria del sistema nervioso)",
      dna_vwd3: "Prueba de ADN de enfermedad de von Willebrand tipo 3 (vWD3), un trastorno hemorrágico hereditario",
      dna_pra_rcd3: "Prueba de ADN de atrofia progresiva de retina (PRA-rcd3)",
      dna_vwd2: "Prueba de ADN de enfermedad de von Willebrand tipo 2 (vWD2), un trastorno hemorrágico hereditario",
      dna_l2hga: "Prueba de ADN de aciduria L-2-hidroxiglutárica (L-2-HGA), una enfermedad metabólica hereditaria del sistema nervioso",
      dna_pll: "Prueba de ADN de luxación primaria del cristalino (PLL), una enfermedad ocular hereditaria en la que el cristalino se desplaza de su sitio",
      dna_loa: "Prueba de ADN de ataxia de aparición tardía (LOA), una enfermedad hereditaria que afecta al equilibrio y la coordinación",
      dna_sca: "Prueba de ADN de ataxia espinocerebelosa (SCA), una enfermedad hereditaria del sistema nervioso",
    },
  },
  health: {
    weight_gain: "Engorda con facilidad: hay que vigilar las raciones y los premios.",
    hip_elbow_dysplasia_eye_conditions: "Puede tener predisposición a la displasia de cadera y de codo y a varias enfermedades oculares hereditarias.",
    cancer_risk: "Las fuentes describen un mayor riesgo de cáncer en esta raza.",
    flat_face_breathing: "Raza de cara chata (braquicéfala): el hocico corto, los orificios nasales estrechos y el exceso de tejido blando en las vías respiratorias pueden dificultar la respiración (síndrome obstructivo de las vías respiratorias de los braquicéfalos, BOAS).",
    heat_stroke_risk: "Se acalora enseguida y es más vulnerable al golpe de calor que la mayoría de los perros, sobre todo cuando hace calor.",
    skin_fold_ear_problems: "Tiene tendencia a las inflamaciones de oído y a las infecciones de los pliegues de la piel; hay que mantener los pliegues limpios y secos.",
    ear_infections_long_ears: "Puede tener infecciones de oído por sus orejas largas; las bacterias pueden acumularse en el conducto auditivo.",
    collie_eye_pra: "En la raza se dan enfermedades oculares hereditarias: la anomalía del ojo del collie, una alteración del fondo del ojo, y la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera; existen exámenes oculares y pruebas de ADN.",
    merle_colour_risk: "El merle no es un color del estándar de la raza; en esta raza conlleva un mayor riesgo de problemas de audición y de vista.",
    hind_leg_conformation: "El Royal Kennel Club señala la forma de las patas traseras y la manera de moverse como un punto de preocupación en esta raza; un perro sano tiene la espalda recta y una angulación moderada de las patas traseras.",
    hip_elbow_dysplasia: "Puede tener predisposición a la displasia de cadera y de codo; se aconseja a los criadores evaluar las caderas y los codos de los progenitores antes de la cría.",
    degenerative_myelopathy: "En la raza se da la mielopatía degenerativa, una enfermedad de la médula espinal que debilita poco a poco las patas traseras; existe una prueba de ADN.",
    exercise_induced_collapse: "En la raza se da el colapso inducido por el ejercicio, una enfermedad neuromuscular hereditaria que puede hacer que el perro se desplome tras un ejercicio intenso.",
    heart_valve_disease: "La enfermedad cardiaca causada por el debilitamiento de la válvula mitral es un problema importante en esta raza; a menudo se detecta primero como un soplo, y los perros reproductores deberían pasar antes una evaluación cardiaca.",
    chiari_syringomyelia: "En la raza se dan la malformación tipo Chiari y la siringomielia, un trastorno doloroso con cavidades llenas de líquido en la médula espinal cerca del cerebro, relacionado con la forma del cráneo; se diagnostica con una resonancia magnética.",
    eye_conditions: "En la raza se dan enfermedades oculares hereditarias como las cataratas, y los ojos saltones o irritados son un punto de preocupación; existen exámenes oculares y pruebas de ADN.",
    epilepsy: "En la raza se da la epilepsia, un trastorno cerebral que puede provocar convulsiones.",
    storage_disease: "Una enfermedad de almacenamiento hereditaria del sistema nervioso puede afectar a perros jóvenes de la raza; una prueba de ADN de los progenitores permite a los criadores evitarla.",
    chondrodysplasia: "En la raza se da la condrodisplasia, un trastorno del crecimiento del cartílago y del hueso; a los cachorros se les puede hacer una radiografía.",
    polyneuropathy: "En la raza se da una enfermedad nerviosa hereditaria (polineuropatía); una prueba de ADN de los progenitores permite a los criadores evitarla.",
    fanconi_syndrome: "En la raza se da el síndrome de Fanconi, una enfermedad renal hereditaria que hace que el azúcar pase a la orina; una prueba de ADN de los progenitores permite a los criadores evitarlo.",
    pyruvate_kinase_deficiency: "En la raza puede darse la deficiencia de piruvato quinasa, un defecto hereditario de los glóbulos rojos que causa anemia.",
    back_disc_disease: "En la raza se da la enfermedad del disco intervertebral, un problema de los discos que amortiguan los huesos de la columna.",
    pra_eye_disease: "En la raza se da la atrofia progresiva de retina, una enfermedad ocular hereditaria que puede llevar poco a poco a la ceguera; existen pruebas de ADN y exámenes oculares.",
    hip_dysplasia: "En la raza se da la displasia de cadera, una articulación de la cadera mal desarrollada que puede causar artrosis; se aconseja a los criadores evaluar las caderas de los progenitores.",
    bloat_gdv: "En la raza puede darse la dilatación-torsión gástrica, en la que el estómago se retuerce: es una urgencia que necesita un veterinario de inmediato.",
    inherited_eye_disease: "En la raza se dan enfermedades oculares hereditarias, como la anomalía del ojo del collie, las cataratas y la atrofia progresiva de retina.",
    drug_sensitivity_mdr1: "Algunos perros de la raza tienen una sensibilidad hereditaria a ciertos medicamentos (sensibilidad a múltiples fármacos, MDR1); si tu perro está afectado, díselo a tu veterinario.",
    merle_to_merle_breeding: "El merle es un color del estándar en esta raza; no deben cruzarse dos perros merle, porque sus cachorros corren el riesgo de tener problemas de vista y de oído; el Royal Kennel Club no los registra.",
    kneecap_luxation: "En la raza se da la luxación de rótula, en la que la rótula se sale temporalmente de su sitio.",
    pra_and_eyelashes: "En la raza se dan problemas oculares: la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera, y pestañas de más que rozan el ojo (distiquiasis); se aconseja a los criadores hacer revisar los ojos de los progenitores.",
    liver_shunt: "En la raza puede darse una derivación portosistémica (shunt hepático), en la que la sangre no pasa por el hígado.",
    skin_allergies: "Las alergias de la piel son un problema conocido en la raza; el Royal Kennel Club pide a los jueces que busquen signos de inflamación de la piel, y se aconseja a los dueños consultar al veterinario antes de elegir un champú.",
    westie_lung: "En la raza puede darse una enfermedad pulmonar conocida como «pulmón de westie» (fibrosis pulmonar idiopática), que dificulta la respiración, sobre todo en perros mayores.",
    jaw_bone_disorder: "En la raza puede darse un trastorno óseo hereditario de la mandíbula.",
    dry_eye: "En la raza puede darse el ojo seco, en el que los ojos no producen suficientes lágrimas y se resecan y duelen.",
    heart_hcm: "En la raza se da la miocardiopatía hipertrófica (HCM), una enfermedad cardiaca hereditaria en la que el músculo del corazón se engrosa.",
    dental_weight_nail_care: "Un amplio estudio británico sitúa las enfermedades dentales, el sobrepeso y las uñas demasiado largas entre los problemas más frecuentes de la raza, por lo que se aconseja a los dueños cuidar los dientes, controlar el peso y cortar las uñas.",
    dental_weight_care: "PetMD señala las enfermedades dentales y el sobrepeso entre los problemas que hay que vigilar, por lo que se aconseja a los dueños cepillar los dientes del gato con regularidad y controlar su peso.",
    gsd_iv: "En la raza se da la glucogenosis tipo IV (GSD IV), un trastorno hereditario que afecta a los gatitos; una prueba de ADN de los progenitores permite a los criadores evitarla.",
    hip_dysplasia_weight: "En la raza puede darse la displasia de cadera, una articulación de la cadera mal desarrollada; PetMD aconseja mantener al gato en un peso saludable para proteger sus articulaciones.",
    laryngeal_paralysis_polyneuropathy: "En la raza se da la parálisis laríngea juvenil y polineuropatía (JLPP), una enfermedad nerviosa hereditaria que afecta a la laringe y a las patas traseras; una prueba de ADN de los progenitores permite a los criadores evitarla.",
    heart_sas: "En la raza se da la estenosis subaórtica, un estrechamiento justo debajo de una válvula del corazón que puede causar un soplo; los perros reproductores deberían pasar antes una revisión cardiaca.",
    inherited_eye_defects: "En la raza se dan enfermedades oculares hereditarias, como la displasia de retina y la membrana pupilar persistente; existen exámenes oculares.",
    skin_fold_infections: "Los pliegues de la piel, sobre todo los de la cara, pueden retener humedad e infectarse (pioderma de los pliegues); las arrugas de la cara necesitan limpieza diaria.",
    eyelid_eye_problems: "En la raza se dan problemas de párpados (párpados vueltos hacia dentro o hacia fuera), ojo seco y ojo de cereza; existen exámenes oculares.",
    hip_elbow_joint_disease: "En la raza se dan la displasia de cadera y la de codo, en las que las articulaciones no se desarrollan bien, y pueden provocar enfermedad articular.",
    hip_dysplasia_arthritis: "En la raza se da la displasia de cadera, una articulación de la cadera laxa y mal desarrollada que con el tiempo puede causar artrosis.",
    bleeding_disorder_vwd: "En la raza se da la enfermedad de von Willebrand, un problema hereditario de la coagulación de la sangre que puede causar hemorragias excesivas.",
    heart_muscle_disease: "En la raza puede darse la miocardiopatía, un agrandamiento del corazón causado por el debilitamiento del músculo cardiaco.",
    itchy_skin_allergy: "En la raza pueden darse alergias de la piel (atopia), que causan picor y piel irritada.",
    entropion_cherry_eye: "En la raza pueden darse párpados vueltos hacia dentro (entropión) y el ojo de cereza, en el que sobresale el tercer párpado; el ojo de cereza puede corregirse con cirugía.",
    dental_disease_tooth_brushing: "Un amplio estudio británico señala las enfermedades dentales como el problema más frecuente de la raza, con mucha diferencia, y también son habituales los dientes de leche que no se caen, por lo que se anima a los dueños a cuidar los dientes del perro cada día, por ejemplo cepillándoselos.",
    windpipe_collapse: "En la raza puede darse el colapso traqueal, en el que la tráquea pierde rigidez, lo que puede causar debilidad y desvanecimientos.",
    eye_problems_pra_lens_dry_eye: "En la raza se dan problemas oculares como la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera, la luxación del cristalino y el ojo seco.",
    cataracts_lens_luxation: "En la raza pueden darse problemas oculares como las cataratas, que enturbian el cristalino, y la luxación del cristalino.",
    wobbler_syndrome: "En la raza puede darse el síndrome de Wobbler, en el que unas vértebras inestables del cuello presionan la médula espinal y debilitan las patas traseras.",
    eye_phpv: "En la raza puede darse un defecto ocular presente desde el nacimiento (vítreo primario hiperplásico persistente, PHPV); se aconseja a los criadores hacer revisar los ojos de los progenitores.",
    certain_cancers: "En la raza pueden darse ciertos tipos de cáncer.",
    bare_skin_sun_cold: "La piel desnuda de la variedad sin pelo necesita protección frente al sol y el frío.",
    l2hga_nervous_system: "En la raza puede darse la aciduria L-2-hidroxiglutárica (L-2-HGA), un trastorno metabólico hereditario que afecta al sistema nervioso; existe una prueba de ADN para los progenitores.",
    short_face_breathing: "Raza de cara moderadamente corta: algunos perros con la cara más corta pueden tener problemas respiratorios graves (síndrome obstructivo de las vías respiratorias de los braquicéfalos, BOAS).",
    corneal_ulcers: "Los problemas oculares como las úlceras de córnea son más probables por la forma del cráneo y los ojos prominentes; existen exámenes oculares.",
    skin_folds_allergies: "Pueden darse problemas de piel como alergias, verrugas, acrocordones y pliegues de la cara irritados (dermatitis de los pliegues); los pliegues de la cara deben mantenerse limpios y secos.",
    heart_cardiomyopathy_aortic_stenosis: "En la raza pueden darse problemas cardiacos como la miocardiopatía y la estenosis aórtica.",
    dental_disease_care: "Un amplio estudio británico señala las enfermedades dentales como el problema más frecuente de la raza, y se aconseja a los dueños dar prioridad al cuidado dental.",
    bladder_stones: "En la raza pueden darse cálculos en la vejiga, acumulaciones de minerales que se forman en la vejiga y la orina.",
    deafness: "En la raza se da la sordera de uno o ambos oídos; la audición de los cachorros puede comprobarse con una prueba BAER.",
    mitral_valve_disease: "En la raza se da la enfermedad de la válvula mitral, una afección cardiaca en la que una válvula debilitada deja que la sangre retroceda dentro del corazón; un veterinario puede auscultar el corazón de los perros reproductores antes de la cría.",
    eye_problems_pra_cataracts_dry_eye: "En la raza se dan problemas oculares como la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera, las cataratas y el ojo seco; existen exámenes oculares.",
    skin_comedo_allergy: "Pueden darse problemas de piel como el síndrome comedoniano del schnauzer (un tipo de inflamación de los folículos pilosos) y alergias de la piel (atopia) que causan picor.",
    shorter_face_boas: "Raza braquicéfala (de cara corta): la cara más corta puede causar problemas respiratorios graves (síndrome obstructivo de las vías respiratorias de los braquicéfalos, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "En la raza se dan problemas oculares como el ojo seco, las cataratas, la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera, y el desprendimiento de retina.",
    hypothyroidism: "En la raza puede darse una tiroides poco activa (hipotiroidismo), que puede afectar al peso, la piel y el nivel de energía.",
    open_fontanelle: "En la raza puede darse una fontanela abierta, una zona blanda del cráneo que no llega a cerrarse del todo.",
    collapsing_trachea: "En la raza puede darse el colapso traqueal, una debilidad de la tráquea que puede causar tos y dificultad para respirar.",
    gm1_gangliosidosis: "En la raza puede darse la gangliosidosis GM1, una enfermedad hereditaria del sistema nervioso; una prueba de ADN de los progenitores permite descartarla.",
    addisons_disease: "En la raza puede darse la enfermedad de Addison, una falta de hormonas de las glándulas suprarrenales.",
    protein_losing_disease: "En la raza pueden darse enfermedades con pérdida de proteínas por los riñones o el intestino, que pueden causar diarrea y pérdida de peso.",
    diabetes_mellitus: "En la raza puede darse la diabetes mellitus, en la que el cuerpo no controla bien el azúcar en sangre.",
    dental_disease_home_brushing: "Como muchas razas de perro pequeño, esta tiene tendencia a las enfermedades dentales, por lo que se aconseja cepillarle los dientes en casa con un cepillo y una pasta de dientes para perros.",
    dermoid_sinus: "En la raza puede darse el seno dermoide, un trastorno doloroso en el que un conducto de la piel del lomo conecta con la médula espinal; los clubes de la raza tienen un programa de revisión del seno dermoide en cachorros.",
    cataracts: "En la raza pueden darse cataratas, que enturbian el cristalino y pueden causar pérdida de visión.",
    pra_inherited_blindness: "En la raza puede darse la atrofia progresiva de retina, una enfermedad ocular hereditaria que puede llevar poco a poco a la ceguera.",
    eyelids_turned: "En la raza pueden darse párpados vueltos hacia dentro (entropión) o hacia fuera (ectropión); pide progenitores con revisión ocular.",
    glaucoma_poag: "En la raza puede darse el glaucoma primario de ángulo abierto, en el que se acumula líquido dentro del ojo, lo que causa dolor y puede llevar a la ceguera; existe una prueba de ADN para los progenitores.",
    skin_fold_dermatitis: "La piel suelta forma pliegues que pueden irritarse e infectarse; hay que revisarlos cada día y mantenerlos limpios y secos.",
    eyelid_problems: "En la raza pueden darse problemas de párpados: párpados vueltos hacia dentro (entropión) o hacia fuera (ectropión) y el ojo de cereza, en el que sobresale el tercer párpado.",
    skin_allergy_face_folds: "En la raza pueden darse alergias de la piel (atopia) que causan picor, y los pliegues de la cara necesitan limpieza diaria.",
    skin_ear_allergies: "En la raza pueden darse alergias ambientales, que pueden provocar infecciones repetidas de piel o de oído; PetMD sugiere limpiar las orejas cada semana a un perro con alergias.",
    gum_disease_daily_brushing: "La raza tiene tendencia a las enfermedades de las encías (gingivitis y enfermedad periodontal), por lo que PetMD aconseja cepillar los dientes del perro cada día y hacer una revisión dental anual en el veterinario.",
    pra_pk_def: "En la raza se dan dos enfermedades hereditarias: la atrofia progresiva de retina, una enfermedad ocular que puede causar ceguera, y la deficiencia de piruvato quinasa, un trastorno de la sangre; las pruebas de ADN de los progenitores permiten a los criadores evitarlas.",
    windpipe_collapse_breathing: "En la raza puede darse el colapso traqueal, en el que los anillos de la tráquea se colapsan y dificultan la respiración.",
    eye_problems_pra_cataracts_entropion: "En la raza se dan problemas oculares como la atrofia progresiva de retina, que puede llevar poco a poco a la ceguera, las cataratas, que enturbian el cristalino, y los párpados vueltos hacia dentro (entropión); existen exámenes oculares.",
    elbow_dysplasia_arthritis: "En la raza puede darse la displasia de codo, una articulación del codo mal desarrollada que con el tiempo puede causar artrosis.",
    entropion: "En la raza puede darse el entropión, en el que los párpados se vuelven hacia dentro e irritan el ojo; pide progenitores con revisión ocular.",
    autoimmune_conditions: "En la raza pueden darse enfermedades autoinmunes, en las que el cuerpo reacciona contra sí mismo.",
    ear_infections_prone: "La raza tiene tendencia a las infecciones de oído; vigila de cerca la higiene de las orejas.",
    familial_nephropathy: "En la raza se da una enfermedad renal hereditaria (nefropatía familiar); existe una prueba de ADN para los progenitores.",
    hereditary_nephritis: "En la raza se da una enfermedad renal hereditaria (nefritis hereditaria, también llamada glomerulopatía hereditaria del samoyedo).",
    panosteitis: "En la raza puede darse la panosteítis, una inflamación dolorosa de los huesos largos que suele afectar a perros jóvenes en crecimiento.",
    urinary_incontinence: "En la raza puede darse la incontinencia urinaria, una pérdida de orina involuntaria.",
    osteochondritis: "En la raza puede darse la osteocondritis disecante (OCD), un trastorno del cartílago articular en perros en crecimiento.",
    scottie_cramp: "En la raza se da el calambre del scottie: episodios cortos de calambres musculares, normalmente provocados por la excitación; no es doloroso.",
    periodontal_disease: "La enfermedad periodontal, una infección e inflamación de las encías y de los tejidos que sujetan los dientes, es un problema conocido en la raza.",
    extra_eyelashes: "En la raza puede darse la distiquiasis, en la que crecen pequeñas pestañas de más en la cara interna o en el borde del párpado que pueden rozar el ojo; pide progenitores revisados dentro del programa ocular.",
    cm_sm_screening: "En la raza pueden darse la malformación tipo Chiari y la siringomielia, un trastorno doloroso con cavidades llenas de líquido en la médula espinal cerca del cerebro; se aconseja a los criadores revisar a los progenitores (Reino Unido: programa BVA/KC).",
    prominent_eyes_injury_dry_eye: "Los ojos prominentes se lesionan con más facilidad y pueden desarrollar úlceras y sequedad; en la raza también se dan el ojo seco y el ojo de cereza.",
    legg_perthes: "En la raza puede darse la enfermedad de Legg-Perthes, un trastorno doloroso en el que la articulación de la cadera se necrosa y se desmorona.",
    glaucoma: "En la raza puede darse el glaucoma, un aumento de la presión dentro del ojo que puede ser doloroso y causar ceguera.",
    lethal_acrodermatitis: "En la raza se da la acrodermatitis letal, una enfermedad hereditaria que causa graves problemas de piel y de crecimiento en los cachorros.",
    kidney_disease_urine_screening: "En la raza se dan problemas renales; los análisis de orina permiten revisar a los progenitores antes de la cría.",
    primary_lens_luxation: "En la raza se da la luxación primaria del cristalino, una enfermedad ocular hereditaria y dolorosa en la que el cristalino se desplaza de su sitio y que puede causar ceguera; existe una prueba de ADN para los perros reproductores.",
    inherited_ataxia: "En la raza se dan ataxias hereditarias (ataxia de aparición tardía y ataxia espinocerebelosa), que causan pérdida del equilibrio y de la coordinación; existen pruebas de ADN para los perros reproductores.",
    hydrocephalus: "En la raza puede darse la hidrocefalia, una acumulación de líquido alrededor del cerebro.",
    heart_disease_pda: "En la raza pueden darse enfermedades cardiacas, entre ellas el conducto arterioso persistente, un vaso sanguíneo cercano al corazón que no se cierra tras el nacimiento; un veterinario puede detectarlo al auscultar al cachorro en su primera revisión.",
    chiari_malformation: "En la raza puede darse la malformación tipo Chiari con siringomielia, un trastorno doloroso con cavidades llenas de líquido en la médula espinal cerca del cerebro.",
    cataracts_entropion: "En la raza pueden darse cataratas, que enturbian el cristalino, y párpados vueltos hacia dentro (entropión); pide progenitores revisados dentro del programa ocular.",
    periodontal_daily_brushing: "La raza tiene tendencia a las enfermedades de las encías (periodontales), por lo que se aconseja cepillarle los dientes cada día con una pasta de dientes para perros.",
    eye_problems_shallow_sockets: "En la raza se dan problemas oculares como el ojo seco, las infecciones de los ojos y las úlceras en la superficie del ojo; además, las órbitas poco profundas hacen más probables las lesiones oculares.",
    eye_problems_dry_eye_entropion_lens_luxation: "En la raza se dan problemas oculares como el ojo seco, los párpados vueltos hacia dentro (entropión) y la luxación del cristalino; existen exámenes oculares.",
    heart_valve_screening: "En la raza pueden darse enfermedades cardiacas; las ecografías cardiacas permiten revisar a los progenitores para detectar problemas de válvulas antes de la cría.",
    dental_weight_problems: "Un amplio estudio británico señala las enfermedades dentales y el sobrepeso como problemas especialmente frecuentes en la raza, problemas que los dueños pueden ayudar a prevenir; también se dan dientes apiñados y dientes de leche que no se caen.",
  },
  page: {
    eyebrow: "Registro de animales",
    // Search terms people use (« gato ragdoll », « carácter »); « carácter » only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "carácter, " : ""}ejercicio, tamaño y cuidados | PetPrep`
        : species === "cat"
          ? `${/\bgato\b/i.test(name) ? name : `Gato ${rn(name)}`}: ${hasIntro ? "carácter, " : ""}cuidado del pelaje, tamaño y esperanza de vida | PetPrep`
          : `${name} (${lc(one)}): necesidades, esperanza de vida y cuidados | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Fuentes, salud y consejos de compra.`,
    metaLabels: { weight: "peso", exercise: "ejercicio", lifespan: "esperanza de vida" },
    metaDescription: (name, one) =>
      `${name}: necesidades documentadas de esta raza de ${lc(one)} (ejercicio, cuidado del pelaje, comidas, tamaño, esperanza de vida, para quién es adecuada) y cómo la simula PetPrep.`,
    suitabilityTitle: "Para quién es adecuada",
    suitabilityNote: "Las mismas etiquetas que en la app. Cada etiqueta está respaldada por las fuentes que aparecen al final de la página.",
    suitabilityNone: "Todavía no hay etiquetas de idoneidad con fuentes para esta raza.",
    needsTitle: "Qué necesita",
    needsIntro: (species) =>
      species === "cat"
        ? "Según registros de razas felinas, organizaciones veterinarias y estudios. Cuando las fuentes no coinciden, se muestran todas."
        : "Según estándares de raza, clubes caninos, organizaciones veterinarias y estudios. Cuando las fuentes no coinciden, se muestran todas.",
    general: (many) => `Pautas generales para ${lc(many)} (no específicas de la raza):`,
    noData: "Todavía no figura en nuestras fuentes.",
    simTitle: "Cómo lo simula PetPrep",
    simBadge: "Reglas del juego, no consejo veterinario",
    simIntro:
      "En PetPrep, una semana real equivale a un mes de la vida de la mascota. Estas son las reglas que usa el juego para esta raza. PetPrep las eligió a partir de las fuentes de esta página; no son instrucciones de cuidado para un animal real.",
    simInfoOnly: "Esta raza está en el registro solo a título informativo; la app todavía no la simula.",
    simTable: { stage: "Etapa de la vida", starts: "Empieza", meals: "Comidas al día", activity: { steps: "Objetivo diario de pasos", play_sessions: "Juego al día" } },
    arrives: (m) => `llega con ${m} meses`,
    fromMonth: (m, years) => (years ? `mes ${m} (${years})` : `mes ${m}`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `a partir del mes ${x.from}: ${x.meals}`)).join("; "),
    simDecisions: "Cada cifra del juego es una decisión de PetPrep registrada con sus fuentes.",
    healthTitle: "Salud",
    healthNote: "Solo a título informativo, sin revisión veterinaria. Pregunta a tu veterinario por tu propio animal.",
    healthNone: "Nuestras fuentes todavía no incluyen información de salud específica de esta raza.",
    checklistTitle: "Antes de comprar: qué comprobar con el criador",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Preguntas que conviene aclarar antes de llevarte un gatito a casa. Los puntos son consejos de veterinarios, organizaciones de bienestar animal y federaciones felinas; cada uno cita su fuente." : "Preguntas que conviene aclarar antes de llevarte un cachorro a casa. Los puntos son consejos de veterinarios, organizaciones de bienestar animal y clubes caninos; cada uno cita su fuente.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "Las leyes sobre la edad mínima, el microchip y la vacunación varían según el país: consulta las normas del lugar donde vives.",
    checklistGeneralTitle: "Para todas las razas",
    checklistTestsTitle: "Pruebas de salud de los progenitores para esta raza",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Pruebas que una federación felina exige antes de criar con un gato" : "Pruebas que el Royal Kennel Club recomienda como mínimo",
      best_practice: "Otras pruebas como buena práctica",
      other_scheme: "Otros programas de detección para esta raza",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Esta lista procede de las normas de cría de una federación felina extranjera (consulta la fuente) y es orientativa. Pregunta al criador qué pruebas se les han hecho a los progenitores."
        : "Estas listas proceden del Royal Kennel Club del Reino Unido y son orientativas; los clubes caninos nacionales pueden fijar sus propias normas, más estrictas. Pregunta al club de la raza y al criador qué pruebas se les han hecho a los progenitores.",
    checklistStatus: {
      none_recommended: "Actualmente, el Royal Kennel Club no recomienda ninguna prueba de salud previa a la cría para esta raza. Aun así, pregunta al criador por la salud de los progenitores.",
      not_found: "Todavía no hemos encontrado una fuente fiable que indique las pruebas de salud de los progenitores de esta raza. Pregunta al club de la raza y al criador qué pruebas se les han hecho a los progenitores.",
      not_checked: "Todavía no hemos revisado las pruebas de salud de los progenitores de esta raza. Pregunta al club de la raza y al criador qué pruebas se les han hecho a los progenitores.",
    },
    sourcesTitle: "Fuentes",
    sourcesIntro: "Cada dato de esta página cita una de estas fuentes.",
    sourceLabel: (id, publisher) => `Fuente ${id}: ${publisher}`,
    disclaimer: "PetPrep es una simulación para familias. Esta página no es un consejo veterinario: para un animal real, consulta a un veterinario o al club de la raza.",
    backTo: (many) => `Todos los ${lc(many)}`,
    compareWith: "Comparar con otras razas",
    related: { title: "Razas parecidas", intro: (many) => `Otros ${lc(many)} del registro con necesidades parecidas, todos con datos respaldados por fuentes.` },
    updated: "Actualizado",
    glanceTitle: "De un vistazo",
    glanceNote: "Datos clave de las fuentes que aparecen al final de la página. Cuando las fuentes no coinciden, se indica cada valor.",
    portraitAlt: { ai_photo: (name) => `${name}: foto (IA)`, ai_illustration: (name) => `${name}: ilustración (IA)` },
    portraitCaption: { ai_photo: "Foto generada con IA", ai_illustration: "Ilustración generada con IA" },
    portraitColours: {
      legend: "Color del pelaje",
      alt: { ai_photo: (name, colour) => `${name}, ${lc(colour)}: foto (IA)`, ai_illustration: (name, colour) => `${name}, ${lc(colour)}: ilustración (IA)` },
    },
    share: {
      button: "Compartir",
      title: "Compartir esta raza",
      copy: "Copiar",
      copied: "Copiado",
      linkLabel: "Enlace a esta página",
      more: "Más opciones",
      text: (name) => `${name}: necesidades, fuentes y cómo lo simula PetPrep`,
      emailSubject: (name) => `${name} | Registro de animales de PetPrep`,
      on: (network) => `Compartir en ${network}`,
    },
    og: { lead: "Necesidades, fuentes y cómo lo simula PetPrep", photoLabel: "Foto IA" },
    qa: {
      title: "Preguntas y respuestas",
      intro: "Respuestas basadas solo en los datos con fuentes de esta página; cada respuesta cita sus fuentes.",
      // Breed names in Spanish are masculine (el/un + perro/gato implied) and lower case in running text: « un border collie », « el ragdoll ».
      questions: {
        exercise: (n) => `¿Cuánto ejercicio necesita un ${rn(n)}?`,
        lifespan: (n) => `¿Cuántos años vive un ${rn(n)}?`,
        size: (n) => `¿Cuánto crece y cuánto pesa un ${rn(n)}?`,
        grooming: (n) => `¿Cuánto cuidado del pelaje necesita un ${rn(n)}?`,
        suits: (n) => `¿Para quién es adecuado el ${rn(n)}?`,
      },
      leads: {
        exercise: (n) => `Según nuestras fuentes, el ${rn(n)} necesita este ejercicio:`,
        lifespan: (n) => `Según nuestras fuentes, la esperanza de vida del ${rn(n)} es:`,
        size: (n) => `Tamaño y peso adulto del ${rn(n)}, según nuestras fuentes:`,
        grooming: (n) => `Pelaje y cuidado del pelaje del ${rn(n)}, según nuestras fuentes:`,
        suits: (n) => `Nuestras fuentes describen al ${rn(n)} como adecuado para:`,
      },
      considerLead: "Ten en cuenta:",
      differ: "Las fuentes dan valores distintos, así que se indica cada uno.",
      join: "; ",
    },
  },
  intros: {
    border_collie: {
      text: [
        "El border collie es un perro de pastoreo de tamaño mediano originario de Gran Bretaña, hecho para la resistencia y el trabajo duro. Su estándar describe un perro despierto, alerta, receptivo e inteligente, ni nervioso ni agresivo.",
        "Los clubes caninos y los veterinarios coinciden sobre todo en una cosa: es una raza con muchísima energía. Necesita más de dos horas de ejercicio al día y mucho en lo que pensar. Cuando se aburre o le falta ejercicio, se busca sus propias tareas: mordisquear todo lo que tiene a su alcance o intentar reunir a los niños mientras juegan.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador",
      text: [
        "El labrador retriever es un perro de caza grande y de constitución fuerte originario de Gran Bretaña, criado para cobrar piezas. Su estándar describe un compañero de buen carácter, amable y adaptable, con ganas de agradar y amante del agua. El pelo es corto y denso, de color negro, amarillo o hígado/chocolate.",
        "Las organizaciones benéficas británicas describen al labrador como un perro de familia que se vincula con todo el hogar cuando está bien socializado. Es muy activo y le motiva muchísimo la comida: los premios ayudan en el adiestramiento, pero los labradores también tienden a engordar.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden",
      text: [
        "El golden retriever es un perro de caza grande originario de Gran Bretaña, con el pelo liso u ondulado en tonos dorados o crema. Su estándar describe un perro dócil e inteligente, amable, simpático y seguro de sí mismo.",
        "Las organizaciones benéficas británicas lo consideran un gran perro para una familia activa, y que puede ser una buena opción como primer perro. Las fuentes dejan claras las contrapartidas: al menos dos horas de ejercicio al día, cepillado varias veces por semana y un pelaje que suelta mucho pelo.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Frenchie, French Bulldog",
      text: [
        "El bulldog francés es un perro de compañía pequeño y robusto originario de Francia, de pelo corto y liso y con unas «orejas de murciélago» erguidas. Su estándar describe un perro sociable, vivaz y juguetón; las organizaciones benéficas británicas lo describen como tranquilo y adaptable y dicen que suele llevarse bien con los niños, lo que lo ha convertido en una mascota de familia muy popular.",
        "Necesita hasta una hora de ejercicio al día y se adapta bien a un piso. La contrapartida que señalan todas las fuentes es la cara chata: puede dificultarle la respiración, y los bulldogs franceses se sobrecalientan enseguida, sobre todo con calor, así que la sombra, el agua y los paseos tranquilos son importantes. La PDSA sugiere a las familias que se planteen también adoptar un bulldog francés adulto.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "German Shepherd, GSD",
      text: [
        "El pastor alemán es un perro de pastoreo grande y potente originario de Alemania, con las orejas erguidas y un pelaje doble y denso, corto o largo. Su estándar describe un perro equilibrado, seguro de sí mismo y de nervios firmes, y el Royal Kennel Club lo presenta como un perro de trabajo y de servicio versátil, conocido por su valentía y su inteligencia.",
        "Necesita al menos dos horas de ejercicio al día, se adapta a una casa grande con jardín y suelta mucho pelo. Las organizaciones benéficas británicas dicen que algunos pueden ser estupendas mascotas de familia, pero que siempre hay que vigilarlos cuando están con niños pequeños. El Royal Kennel Club pide a los criadores que hagan pruebas de cadera y codo a los progenitores y señala la forma de las patas traseras como un punto de preocupación en la raza.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS",
      text: [
        "El cavalier King Charles spaniel es un spaniel toy pequeño originario de Gran Bretaña, con orejas largas y con flecos y un pelaje largo y sedoso en cuatro colores: blenheim, rubí, negro y fuego, y tricolor. Su estándar describe un perro activo y elegante, de expresión dulce: deportivo, cariñoso, simpático y sin miedo.",
        "Necesita alrededor de una hora de ejercicio al día, puede vivir en un piso y se le conoce por llevarse bien con los niños, aunque el juego debe estar supervisado y no le gusta quedarse solo. Hay que cepillarle el pelo más de una vez por semana. Las fuentes británicas señalan como principales problemas de salud la enfermedad de las válvulas del corazón y una dolorosa afección de la médula espinal relacionada con la forma del cráneo, por lo que se pide a los criadores que hagan pruebas cardíacas y resonancias magnéticas a sus perros.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "El beagle es un sabueso pequeño originario de Gran Bretaña, criado para cazar liebres siguiendo su rastro. Su estándar describe un sabueso robusto, compacto y alegre (audaz, activo y alerta, afable y sin agresividad ni timidez), de pelo corto y denso en colores de sabueso como tricolor, fuego y blanco o limón y blanco, y siempre con la punta de la cola blanca.",
        "Necesita hasta una hora de ejercicio al día, más o menos, y se adapta bien a la vida en familia si se socializa desde pequeño, aunque hay que vigilarlo con los niños y no dejarlo solo, porque entonces puede ladrar y mordisquear cosas. Su pelo corto necesita un cepillado semanal, pero suelta pelo. El adiestramiento debe empezar pronto y basarse en recompensas. Los veterinarios británicos atienden a los beagles sobre todo por aumento de peso y enfermedad dental, así que conviene vigilar las raciones y los dientes.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Poodle, Standard Poodle",
      text: [
        "El caniche grande es el mayor de los cuatro tamaños de caniche, una raza de compañía francesa que desciende de los perros europeos de caza de patos. Su estándar describe un perro elegante y equilibrado, de porte orgulloso (leal, alegre y de buen carácter, capaz de aprender y de ser adiestrado), con un pelaje abundante, rizado y crespo de un solo color: negro, blanco, marrón, gris o leonado.",
        "Necesita hasta una hora de ejercicio al día, más o menos, y se adapta a una casa grande con un jardín grande. Si se socializa bien de cachorro, en general se lleva bien con los niños y con otras mascotas. No suelta pelo, pero eso no lo hace hipoalergénico: necesita cuidados diarios del pelaje y cortes regulares en una peluquería canina profesional. Se le conoce por ser muy obediente y responder bien al adiestramiento.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Perro salchicha, Dachshund",
      text: [
        "El teckel, o dachshund, es un cazador alemán de tejones y conejos (en Alemania también se le llama Teckel); existe en varios tamaños y con tres tipos de pelo, y esta página trata del tamaño estándar de pelo corto. Su estándar describe un perro moderadamente largo en proporción a su altura, sin exageraciones (fiel, versátil y de buen carácter; inteligente, vivaz y valiente), con un pelo denso, corto y liso de color rojo, o negro o chocolate con marcas fuego.",
        "Necesita hasta una hora de ejercicio al día, más o menos, repartida en un par de paseos con tiempo para olfatear, y se adapta a una casa pequeña. Le encanta la gente y en general se lleva bien con niños de todas las edades, siempre bajo supervisión, pero por su fuerte instinto de presa no se recomienda con mascotas más pequeñas, y lleva mal quedarse solo. Por su espalda larga y sus patas cortas es propenso a las hernias discales, así que no debe saltar; se pide a los criadores que revisen la columna antes de criar.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie, Australian Shepherd",
      text: [
        "El pastor australiano es, a pesar de su nombre, una raza estadounidense: un perro de trabajo inteligente con un fuerte instinto de pastoreo y de guarda. Su estándar describe un perro equilibrado de tamaño mediano, algo más largo que alto, de buen carácter y a veces reservado en los primeros encuentros, con un pelaje de longitud media, de liso a ondulado, en merle azul, negro, merle rojo o rojo, cada uno con o sin marcas blancas y fuego.",
        "Necesita más de dos horas de ejercicio al día y retos mentales como juegos de inteligencia y adiestramiento, y se adapta a una casa grande con un jardín grande en el campo. En el hogar adecuado puede ser una mascota de familia estupenda, pero su fuerte instinto de pastoreo puede llevarle a intentar reunir a los niños, por lo que no se recomienda para familias con niños más pequeños. No le gusta quedarse solo, y hay que cepillarle el pelo unas cuantas veces por semana.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Habanero, Bichon Havanais, Havanese",
      text: [
        "El bichón habanero es un pequeño miembro de la familia de los bichones y el perro nacional de Cuba. Su estándar describe un perrito robusto, bajo de patas, con un pelo muy largo, suave, liso u ondulado que nunca se recorta, y una cola que lleva alta sobre el lomo. Puede ser leonado, negro, marrón habano, tabaco, marrón rojizo y, rara vez, blanco, con o sin manchas y marcas fuego.",
        "Su estándar lo describe como cariñoso, juguetón e incluso un poco payaso, y dice que adora a los niños y juega con ellos sin parar; las fuentes británicas lo consideran una mascota de familia excelente si se socializa bien, y fácil de adiestrar. Necesita unos 30 minutos de ejercicio al día, puede vivir en un piso y no suelta pelo, pero su pelaje largo necesita cuidados todos los días para evitar nudos y enredos.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "El west highland white terrier, o westie, es un terrier pequeño originario de Gran Bretaña. Su estándar describe un perrito de constitución fuerte, con el pecho profundo, la espalda recta y un pelaje doble y áspero de unos 5 cm de largo, orejas pequeñas, erguidas y puntiagudas, y ojos oscuros bajo unas cejas pobladas. El blanco es el único color que admite el estándar.",
        "Su estándar lo describe como alerta, alegre, valiente y seguro de sí mismo, pero simpático. Las fuentes británicas lo consideran una mascota de familia cariñosa y juguetona para niños de cualquier edad, siempre con el juego supervisado; necesita alrededor de una hora de ejercicio al día, puede vivir en un piso, suelta pelo y hay que cepillarlo unas cuantas veces por semana. Por su instinto de presa no debe convivir con mascotas más pequeñas, y no le gusta quedarse solo. La piel es un problema conocido: el Royal Kennel Club pide a los jueces que busquen signos de inflamación de la piel en la raza.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Berner, Berner Sennenhund, Bernese",
      text: [
        "El boyero de Berna es un perro de granja suizo grande, que en su origen se usaba como perro guardián, de tiro y boyero en el cantón de Berna. Su estándar describe un perro de trabajo de pelo largo, fuerte y ágil, de extremidades robustas y con un pelaje largo, brillante, liso o ligeramente ondulado. El único color que admite el estándar es el tricolor: negro azabache con fuego intenso en las mejillas, sobre los ojos, en las patas y en el pecho, y marcas blancas en la cabeza y el pecho.",
        "Su estándar lo describe como seguro de sí mismo, bonachón y simpático, y como «un perro de familia amable y entregado» que tarda en madurar. Las fuentes británicas dicen que necesita hasta una hora de ejercicio al día, que lo suyo es una casa grande con un jardín grande, que suelta mucho pelo y que hay que cepillarlo más de una vez por semana; no se le debe dejar solo mucho tiempo. Suele vivir menos de 10 años, y las fuentes británicas incluyen la displasia de cadera y de codo, la torsión de estómago (dilatación-torsión gástrica) y ciertos cánceres entre sus problemas de salud.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky, Siberian Husky",
      text: [
        "El husky siberiano es un perro de trineo de trabajo de tamaño mediano, que la FCI reconoce como raza estadounidense y que el Royal Kennel Club describe como el más ligero y rápido de los perros de trineo. Su estándar pide un perro ágil y ligero de movimientos, con un pelaje doble de longitud media, orejas gruesas y erguidas, ojos marrones o azules (se admite uno de cada color) y una cola de zorro bien poblada. Los colores van del negro al blanco puro; no se admiten el merle ni el atigrado.",
        "Su estándar lo describe como simpático y amable, alerta y extrovertido. Las fuentes británicas dicen que necesita más de dos horas de ejercicio al día, una casa grande con un jardín grande y una valla alta y muy segura, porque los huskies son conocidos por escaparse; suelta mucho pelo, hay que cepillarlo unas cuantas veces por semana y lleva mal quedarse solo. La PDSA lo propone para hogares solo de adultos o con adolescentes más que para familias con niños pequeños, e incluye la displasia de cadera, los problemas oculares y la epilepsia entre sus problemas de salud.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "El rottweiler es un perro de trabajo potente, de tamaño mediano a grande, originario de Alemania. Su estándar describe un perro fornido, ni pesado ni ligero, de pelo corto, áspero y pegado al cuerpo, orejas colgantes medianas y ojos almendrados de color marrón oscuro. El único color que admite es el negro con marcas fuego intensas y bien definidas en las mejillas, el hocico, la garganta, el pecho y las patas; las marcas blancas son una falta.",
        "Su estándar lo describe como bonachón, plácido, muy fiel, obediente y con ganas de trabajar, y el Royal Kennel Club dice que un rottweiler bien adiestrado es un compañero de familia estupendo. Las fuentes británicas dicen que necesita más de dos horas de ejercicio al día, una casa grande con un jardín grande y un dueño con experiencia, porque es muy potente; hay que socializarlo desde pequeño. La PDSA no lo recomienda para familias con niños pequeños y bebés, y nunca se le debe dejar sin vigilancia con otras mascotas. Basta con un cepillado semanal. Suele vivir menos de 10 años, y el Royal Kennel Club vigila la forma de sus patas traseras.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog, English Bulldog, British Bulldog",
      text: [
        "El bulldog inglés es un perro de tamaño mediano y pelo liso originario de Gran Bretaña: bastante macizo, bajo, ancho, potente y compacto, con la cara relativamente corta, orejas en rosa pequeñas y finas y ojos redondos muy oscuros. Su estándar admite colores enteros como rojo, leonado, gamuza y blanco, atigrado y pío; el negro y el negro y fuego son muy poco deseables. Pide unas fosas nasales grandes y bien abiertas y dice que los perros con dificultades respiratorias son muy poco deseables.",
        "Su estándar lo describe como alerta, audaz, leal, fiable y valiente, de aspecto fiero pero cariñoso, y el Royal Kennel Club dice que sigue siendo muy popular como compañero de familia por su carácter y su lealtad. Las fuentes británicas dicen que necesita hasta una hora de ejercicio al día, nunca en las horas de más calor, y que se lleva bien con otras mascotas de la casa si se socializa de pequeño; necesita cuidados del pelaje una vez por semana, pero las arrugas de la cara hay que limpiarlas a diario. La PDSA lo describe como una raza de cara muy chata con muchas probabilidades de tener problemas de salud graves, como dificultades respiratorias, y recomienda encarecidamente plantearse una raza más sana, un cruce o un perro mestizo. Suele vivir menos de 10 años.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Braco alemán, Kurzhaar, Deutsch Kurzhaar, GSP, German Shorthaired Pointer",
      text: [
        "El braco alemán de pelo corto es un perro de caza versátil y polivalente originario de Alemania, hecho para trabajar en el campo y en el agua, con un pelo corto y espeso que resulta duro al tacto, orejas anchas y planas de inserción alta y ojos almendrados de color marrón oscuro. Su estándar estadounidense admite el hígado entero, el hígado y blanco (por ejemplo, moteado), el negro entero y el negro y blanco; las zonas rojas, naranjas, limón o fuego y el perro completamente blanco son descalificantes. Su estándar describe una cola amputada; PetPrep siempre muestra al perro con su cola natural.",
        "Su estándar lo describe como simpático, inteligente y con ganas de agradar. El Royal Kennel Club y la PDSA dicen que necesita más de dos horas de ejercicio al día; la PDSA añade que su instinto de cazar, marcar la muestra y cobrar puede despertarse durante un paseo, por lo que necesita un buen adiestramiento de la llamada, y que es bastante fácil de adiestrar. Necesita cuidados del pelaje una o dos veces por semana y suelta pelo de forma moderada. Un gran estudio británico sitúa su esperanza de vida mediana en 13,4 años.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie, Yorkshire",
      text: [
        "El yorkshire terrier es un terrier toy originario de Gran Bretaña que, según su estándar, pesa hasta 3,2 kg, con un pelo largo, perfectamente liso, brillante y sedoso que cae por igual a cada lado desde una raya a lo largo del lomo. El estándar admite un solo color: azul acero oscuro desde la nuca hasta la cola, con un fuego intenso y vivo en la cabeza, el pecho y las patas; las orejas pequeñas, en forma de V, se llevan erguidas. El estándar describe tanto la cola amputada como la natural; PetPrep siempre muestra al perro con su cola natural.",
        "Su estándar lo describe como alerta, inteligente y animoso, de temperamento equilibrado. El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje a diario; la PDSA añade que le encanta correr, traer cosas y jugar, que puede ser bastante testarudo en el adiestramiento y que es más adecuado para familias con niños mayores porque sus huesos son muy frágiles. Un gran estudio británico halló que la enfermedad dental es el problema más frecuente en la raza, recomienda cuidar los dientes a diario, por ejemplo cepillándolos, y halló una edad mediana de muerte de 13,56 años.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane corso italiano, Corso, Italian Corso Dog",
      text: [
        "El cane corso es un moloso italiano de tamaño mediano a grande, un perro robusto y fuerte con cierta elegancia, algo más largo que alto. Su estándar describe un pelo corto, brillante y muy denso de color negro, tonos de gris, leonado o rojo con máscara oscura, trigo oscuro o atigrado; no se admiten manchas blancas grandes. Según el estándar actual de la FCI, las orejas no se cortan y la cola es natural (y en el Reino Unido cortarlas o amputarlas es ilegal), así que PetPrep siempre muestra al perro con las orejas y la cola naturales.",
        "Su estándar lo describe como guardián de la propiedad, la familia y el ganado, extremadamente ágil y receptivo. La PDSA dice que es sociable y cariñoso con sus dueños, que necesita alrededor de dos horas de ejercicio al día y cosas que hacer, porque odia aburrirse, y que por su tamaño es más adecuado para dueños con experiencia. No recomienda la raza para hogares con niños pequeños, a los que podría derribar; se adapta a hogares solo de adultos o a familias con niños mayores. Basta con un cepillado semanal, pero suelta pelo y se le conoce por babear. La PDSA sitúa su esperanza de vida media por debajo de los 10 años.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Corgi, Welsh Corgi (Pembroke), Pembroke Welsh Corgi",
      text: [
        "El welsh corgi Pembroke es un perro boyero pequeño originario de Gales, bajo, fuerte y de constitución robusta, que da una impresión de solidez y resistencia en poco espacio. Su estándar describe un pelo liso de longitud media con un subpelo denso, de color rojo, sable, leonado o negro y fuego, con o sin marcas blancas en las patas, el pecho y el cuello, y orejas erguidas. Antes era costumbre amputarle la cola; el estándar describe también la cola natural, y PetPrep siempre muestra al perro con su cola natural.",
        "Su estándar lo describe como audaz, trabajador, extrovertido y simpático. El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje más de una vez por semana; la PDSA describe perros simpáticos, alegres y divertidos, con ganas de agradar y bastante fáciles de adiestrar, pero dice que pueden mordisquear los talones de los niños que corren, por lo que conviene socializarlos con niños y adiestrarlos desde pequeños. El Royal Kennel Club sitúa su esperanza de vida por encima de los 12 años y pide a los criadores que hagan la evaluación de cadera a los progenitores.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "El dobermann es un perro alemán de compañía, protección y trabajo de tamaño mediano, fuerte y musculoso, de líneas elegantes y porte orgulloso. Su estándar de la FCI describe un pelo corto, duro y denso, pegado al cuerpo y liso, de color negro o marrón con marcas fuego de un rojo óxido bien definidas; no se admiten manchas blancas. Según el estándar de la FCI, las orejas y la cola se dejan naturales, y PetPrep siempre muestra al perro con las orejas y la cola naturales.",
        "Su estándar lo describe como simpático y tranquilo y muy entregado a su familia. El Royal Kennel Club dice que su carácter leal y obediente lo convierte en un perro de familia excelente, y recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana. La PDSA añade que es muy enérgico, que necesita mucho ejercicio mental y físico y una socialización temprana y que, por su gran tamaño y su fuerte constitución, no se recomienda para familias con niños pequeños ni para quienes tienen perro por primera vez. El Royal Kennel Club sitúa su esperanza de vida por encima de los 10 años.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Boxer, Bóxer alemán, Deutscher Boxer",
      text: [
        "El bóxer es un perro alemán de trabajo y de compañía de tamaño mediano, de construcción cuadrada, huesos fuertes y músculos bien desarrollados. Sus estándares describen un pelo corto, brillante y liso, de color leonado o atigrado con máscara negra; se admiten marcas blancas, pero no deben cubrir más de un tercio del pelaje. El hocico debe ser ancho y profundo, nunca corto, con las fosas nasales anchas. Antes era costumbre amputarle la cola; el estándar describe también la cola sin amputar, y PetPrep siempre muestra al perro con las orejas y la cola naturales.",
        "Su estándar lo describe como equilibrado, dócil, intrépido y seguro de sí mismo. El Royal Kennel Club dice que es muy querido como compañero de familia y recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana. La PDSA describe un perro con muchísima energía y juguetón, que adora la compañía de las personas y puede desarrollar ansiedad por separación si se queda solo, con un instinto de presa muy fuerte y que, por su tamaño y su carácter impetuoso, no se recomienda para hogares con niños pequeños ni para quienes tienen perro por primera vez; algunos bóxeres de cara más corta pueden tener problemas respiratorios graves. El Royal Kennel Club sitúa su esperanza de vida por encima de los 10 años.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Schnauzer mini, Schnauzer enano, Zwergschnauzer, Miniature Schnauzer",
      text: [
        "El schnauzer miniatura es un perro de compañía alemán pequeño: fuerte, robusto y casi cuadrado, con un pelo áspero, duro y denso, cejas pobladas y barba. Su estándar de la FCI admite sal y pimienta, negro y plata, negro puro y blanco puro; PetPrep muestra los tres primeros. Antes era costumbre amputarle la cola y a veces cortarle las orejas; el estándar de la FCI pide una cola natural y orejas caídas, y PetPrep siempre muestra al perro con las orejas y la cola naturales.",
        "La FCI lo clasifica como perro de casa y de compañía, y el Royal Kennel Club dice que es muy popular como compañero. El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje más de una vez por semana, y dice que no suelta pelo. La PDSA describe un perro juguetón y curioso que puede llevarse bien con los niños si los conoce desde pequeño, que puede ser testarudo en el adiestramiento y que necesita cuidados del pelaje dos o tres veces por semana, además de un corte o un stripping en una peluquería canina profesional de vez en cuando. El Royal Kennel Club sitúa su esperanza de vida por encima de los 10 años.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-Tzu",
      text: [
        "El shih tzu es un perro de compañía pequeño originario del Tíbet; Gran Bretaña se encarga de su estándar en la FCI. Los estándares describen un perro robusto, de pelo abundante y porte orgulloso, con una cara «como un crisantemo»: un pelo de cobertura largo y denso, ojos grandes, oscuros y redondos, orejas grandes y caídas y una cola muy poblada que lleva sobre el lomo. Los estándares admiten muchos colores; PetPrep muestra dorado y blanco, negro y blanco, e hígado y blanco, y nunca merle. El hocico es corto y chato, y la PDSA menciona problemas respiratorios causados por la cara más corta, así que PetPrep siempre dibuja una cara moderada con las fosas nasales abiertas.",
        "La FCI lo describe como inteligente, activo y alerta, simpático e independiente. El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje a diario, e incluye el piso entre los hogares adecuados. La PDSA dice que los shih tzus pueden ser mascotas de familia de buen carácter si han tenido la socialización y el adiestramiento adecuados, los considera una mascota ideal para quienes tienen perro por primera vez, aconseja vigilarlos siempre con los niños y, para la mayoría de los perros de compañía, recomienda un cepillado diario y un corte en una peluquería canina profesional cada seis a ocho semanas. El Royal Kennel Club sitúa su esperanza de vida por encima de los 10 años.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Dogo alemán, Great Dane, Deutsche Dogge",
      text: [
        "El gran danés, o dogo alemán, es un gigante alemán: el estándar de la FCI dice que combina un cuerpo grande, potente y bien construido con orgullo, fuerza y elegancia, con una cabeza larga y estrecha, orejas que cuelgan de forma natural y un pelo muy corto, liso y brillante. Los estándares incluyen el leonado y el atigrado (idealmente con máscara negra), además del arlequín, el negro y el azul; PetPrep muestra solo colores que incluyen tanto la FCI como el Royal Kennel Club, nunca merle ni manto, y siempre dibuja al perro con las orejas y la cola naturales y los párpados bien ajustados, porque el Royal Kennel Club pide a los jueces que se fijen en los párpados que se vuelven hacia dentro o hacia fuera y en unas patas traseras deficientes.",
        "La FCI lo describe como simpático, cariñoso y entregado a sus dueños, aunque puede mostrarse reservado con los desconocidos. El Royal Kennel Club dice que, pese a su tamaño, es un perro de familia estupendo, y recomienda más de dos horas de ejercicio al día, una casa y un jardín grandes y cuidados del pelaje una vez por semana. La PDSA dice que los grandes daneses son conocidos por babear, que tienen un instinto de presa bastante fuerte y que no se recomiendan para hogares con niños pequeños por su tamaño y su fuerza; aconseja dejar un intervalo entre la comida y el ejercicio para ayudar a prevenir la torsión de estómago (dilatación-torsión gástrica). El Royal Kennel Club sitúa su esperanza de vida por debajo de los 10 años.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Pom, Spitz enano, Spitz alemán enano, Zwergspitz, Pomeranian",
      text: [
        "El pomerania es el spitz más pequeño: la FCI lo considera la variedad toy del spitz alemán, con 21 cm ± 3 cm a la cruz, y el estándar del Royal Kennel Club describe un perrito compacto y corto de lomo, con cabeza de zorro, orejas pequeñas y erguidas y una cola curvada sobre el lomo. Su pelaje doble tiene un subpelo suave y esponjoso y un pelo de cobertura largo y liso que forma una gorguera alrededor del cuello. El estándar admite muchos colores enteros, como naranja, crema, blanco, negro y marrón, pero nunca merle; PetPrep dibuja un pelaje natural, sin recortar.",
        "La FCI describe su carácter como sociable y alegre, y el estándar del Royal Kennel Club lo describe como extrovertido, vivaz e inteligente. El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y lo considera adecuado para un piso o apartamento; la PDSA dice que su pelaje doble necesita un cepillado dos o tres veces por semana. El AKC dice que los pomeranias suelen encajar mejor en familias con niños mayores, que pueden llevarse bien con otros animales si se socializan pronto, y recomienda encarecidamente la socialización temprana y las clases para cachorros. El Royal Kennel Club sitúa su esperanza de vida por encima de los 12 años.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "El boston terrier es originario de Estados Unidos. El estándar de la FCI describe un perro vivaz, muy inteligente, de pelo liso, cabeza corta, construcción compacta, cola corta y bien equilibrado, de color atigrado, foca o negro con marcas blancas repartidas de forma uniforme: son obligatorios una banda blanca en el hocico, una lista blanca entre los ojos y el antepecho blanco, y se prefiere el atigrado. PetPrep lo dibuja atigrado y blanco, con un hocico moderado, las fosas nasales abiertas y las orejas y la cola naturales.",
        "Es una raza de cara chata (braquicéfala), y la PDSA advierte que nunca debe hacer ejercicio en las horas de más calor porque tiende a sobrecalentarse. El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje una vez por semana, lo considera adecuado para un piso o apartamento y sitúa su esperanza de vida por encima de los 10 años. La PDSA considera que los boston terriers son mascotas de familia perfectas, especialmente buenas con los niños si se socializan bien de cachorros; el AKC dice que se llevan bien con niños que saben tratar con delicadeza a los animales, que llevan mal quedarse solos durante mucho tiempo, y recomienda encarecidamente la socialización temprana y el adiestramiento de cachorro.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini American, pastor australiano miniatura, Miniature American Shepherd",
      text: [
        "El pastor americano miniatura es originario de Estados Unidos. El estándar de la FCI describe un perro de pastoreo pequeño con un fuerte instinto de pastoreo y de guarda, inteligente y ante todo un perro de trabajo, algo más largo que alto, con un pelaje de longitud media, de liso a ondulado y resistente a la intemperie. Sus colores son negro, merle azul, rojo y merle rojo, con o sin marcas blancas y fuego, y sus ojos pueden ser marrones, azules, avellana o ámbar. PetPrep lo dibuja en merle azul y con la cola natural.",
        "PetMD dice que tiene mucha energía y necesita al menos una hora de ejercicio al día, idealmente dos, además de tareas que le mantengan la mente ocupada, y que hay que cepillarlo un par de veces por semana; el AKC dice que un cepillado semanal basta la mayor parte del año, con cepillado diario en la época de muda. El AKC dice que, con adiestramiento en obediencia y socialización temprana, puede ser un perro de familia estupendo, y que suele llevarse bien con los niños, aunque puede intentar reunirlos como a un rebaño; PetMD añade que su entrega a la familia puede provocarle ansiedad por separación cuando se queda solo. PetMD sitúa su esperanza de vida entre los 12 y los 13 años.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Chihuahua de pelo corto",
      text: [
        "El chihuahua es originario de México. El estándar del Kennel Club describe un perro pequeño, delicado y compacto, de expresión pícara y temperamento alegre, animoso e inteligente, con un cráneo bien redondeado en forma de «manzana», un hocico moderadamente corto y ligeramente puntiagudo, ojos grandes y redondos que no sobresalen, orejas grandes y una cola en forma de hoz; se admite cualquier color o mezcla de colores, pero nunca merle, y el peso preferido es de 1,8 a 2,7 kg. El Royal Kennel Club considera el chihuahua de pelo corto y el de pelo largo como dos razas; PetPrep dibuja el de pelo corto, de color leonado y con una cabeza moderada.",
        "El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje una vez por semana, lo considera adecuado para un piso o apartamento y sitúa su esperanza de vida por encima de los 12 años. La PDSA dice que los chihuahuas son tan pequeños y ligeros que los niños tienen la tentación de cogerlos en brazos, algo que probablemente no les guste, por lo que son más adecuados para familias con niños algo mayores. La PDSA añade que, como perros de compañía, les encanta estar acompañados y necesitan que haya alguien en casa todo el tiempo, y que hay que socializarlos desde pequeños con muchas personas, experiencias y lugares distintos.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer spaniel, Springer, ESS, English Springer Spaniel",
      text: [
        "El springer spaniel inglés es originario de Gran Bretaña, donde se crio para encontrar, levantar y cobrar la caza. El estándar del Kennel Club describe un perro de construcción simétrica, compacto, fuerte, alegre y activo (el más alto de patas de los spaniels de tierra británicos), de temperamento simpático, alegre y dócil, con orejas largas y con flecos, ojos de color avellana oscuro y un pelo pegado, liso y resistente a la intemperie; los colores son hígado y blanco o negro y blanco, ambos con o sin marcas fuego, y la altura aproximada es de 51 cm. PetPrep lo dibuja hígado y blanco, con la cola natural.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje más de una vez por semana, y sitúa su esperanza de vida por encima de los 10 años. La PDSA dice que los springers son buenos perros de familia que se llevan bien con los niños y con otras mascotas de la casa, obedientes y con ganas de aprender, y que necesitan cuidados del pelaje una o dos veces por semana, además de un corte cada tres meses. El AKC añade que no se les debe dejar solos durante mucho tiempo y que la socialización temprana y los cursos de adiestramiento para cachorros son fundamentales.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Collie (nombre antiguo), Shetland Sheepdog",
      text: [
        "El pastor de Shetland es originario de Gran Bretaña y es un perro de trabajo pequeño de pelo largo. El estándar de la FCI describe un perro alerta, dulce, inteligente, fuerte y activo, cariñoso y leal con su dueño y reservado con los desconocidos, con una cabeza en forma de cuña larga y roma, orejas pequeñas semierguidas con las puntas caídas hacia delante y un pelaje doble con un pelo de cobertura largo y áspero; los colores son sable, tricolor, merle azul, negro y blanco, y negro y fuego, y la altura ideal es de 37 cm en los machos y 35,5 cm en las hembras. PetPrep lo dibuja sable y blanco.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje a diario, y sitúa su esperanza de vida por encima de los 10 años. La PDSA dice que los shelties son perros muy dulces, juguetones y obedientes que a menudo encajan bien en la vida familiar y se llevan de maravilla con los niños, y que el adiestramiento y la socialización son muy importantes desde pequeños. El AKC añade que necesitan ejercicio mental y físico con regularidad, que estarían mejor con niños mayores por su instinto de pastoreo y que se les conoce por ser muy ladradores.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Bretón, Epagneul Breton, Brittany, Brittany Spaniel",
      text: [
        "El épagneul bretón es un perro de muestra originario de Francia, donde se le llama Épagneul Breton. El Royal Kennel Club describe un perro muy enérgico e inteligente que caza, marca la muestra y cobra, dulce y cariñoso pero lleno de vida y entusiasmo, con un pelo denso y bastante fino, orejas triangulares de inserción alta y una cola que a menudo es corta por naturaleza; los colores del estándar son naranja, hígado o negro con blanco, ruano o tricolor, y la altura es de 48 a 51 cm en los machos y de 47 a 50 cm en las hembras. PetPrep lo dibuja naranja y blanco.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje más de una vez por semana, y sitúa su esperanza de vida por encima de los 10 años. El AKC dice que los bretones son perros con mucha energía que necesitan mucho ejercicio y estimulación mental, que son dulces y suelen ser pacientes con los niños, y que un cepillado semanal los mantiene en plena forma. PetMD añade que la socialización temprana de los cachorros es imprescindible, que llevan mal quedarse solos durante mucho tiempo y que, al haber sido criados para cazar aves, tienen un fuerte instinto de presa.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker americano, Cocker Spaniel (EE. UU.), American Cocker Spaniel",
      text: [
        "El cocker spaniel americano (en Estados Unidos, simplemente cocker spaniel) es una raza distinta del cocker spaniel inglés. El estándar del AKC lo describe como el miembro más pequeño del Sporting Group, con orejas largas, lobuladas y con muchos flecos, un cráneo redondeado, un hocico ancho y profundo y un pelo sedoso, liso o ligeramente ondulado; puede ser negro, de cualquier color entero desde el crema más claro hasta el rojo más oscuro, o de varios colores con blanco. El estándar pide un temperamento equilibrado, sin ningún indicio de timidez.",
        "El Royal Kennel Club recomienda cuidados del pelaje a diario y más de dos horas de ejercicio al día, y sitúa su esperanza de vida por encima de los 10 años; el AKC y PetMD escriben que no necesita mucho ejercicio. PetMD describe a estos perros de carácter dulce como estupendos perros de familia, simpáticos con las personas y con otros animales, y aconseja empezar pronto la socialización y el adiestramiento; VCA escribe que suelen llevarse muy bien con los niños, que tienden a engordar y que hay que revisarles las orejas cada semana.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, Pastor belga (malinois), Belgian Malinois",
      text: [
        "El pastor belga malinois es la variedad de pelo corto del pastor belga, una raza de pastoreo originaria de Bélgica. El estándar de la FCI describe un perro de proporciones armoniosas que combina elegancia y potencia, y admite un solo color: leonado carbonado con máscara negra. Los estándares de la FCI y del AKC describen unas orejas más bien pequeñas, erguidas y triangulares, un pelo corto y duro con un subpelo denso y un temperamento alerta, inteligente, curioso y seguro de sí mismo.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje más de una vez por semana, y sitúa su esperanza de vida por encima de los 10 años. El AKC escribe que no es una buena opción para quienes tienen perro por primera vez, que está mejor con niños mayores y responsables y que no se le debe dejar solo mucho tiempo; PetMD señala un fuerte instinto de presa, que puede intentar reunir a los niños como a un rebaño y que necesita adiestramiento constante a diario y una socialización temprana.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "El basset hound es un sabueso de patas cortas originario de Gran Bretaña. El estándar de la FCI describe un sabueso de considerable sustancia, bien equilibrado, plácido, nunca agresivo ni tímido, y cariñoso, con orejas largas, aterciopeladas y de inserción baja, un pelo liso y corto y los colores negro, blanco y fuego o limón y blanco. El Breed Watch del Royal Kennel Club pide a los jueces de exposición que se fijen en los párpados que se vuelven hacia dentro o hacia fuera, las orejas muy largas, los pliegues de piel irritados y el exceso de piel.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje una vez por semana, y sitúa su esperanza de vida por encima de los 10 años. La PDSA describe un perro tolerante que se lleva muy bien con los niños y adora la compañía, con un buen apetito que hay que vigilar; aconseja revisar los pliegues de la piel todos los días y dejar un intervalo entre la comida y el ejercicio. El AKC añade que su olfato puede llevarle a desviarse, por lo que son importantes una correa segura y las zonas valladas.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Braco húngaro, Magyar Vizsla, Hungarian Vizsla",
      text: [
        "El braco húngaro de pelo corto (vizsla) es un perro de caza elegante de tamaño mediano originario de Hungría, con un pelo corto de color dorado rojizo. El estándar de la FCI describe un perro vivaz, simpático y de temperamento equilibrado, fácil de adiestrar y que mantiene un contacto estrecho con su guía; sus colores son tonos de dorado rojizo y de dorado arena oscuro. El Breed Watch del Royal Kennel Club no señala ningún punto de preocupación específico de la raza.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana, y sitúa su esperanza de vida por encima de los 12 años. La PDSA describe un perro muy apegado a las personas que adora la compañía y puede sufrir ansiedad por separación cuando se queda solo; se lleva bien con niños mayores, pero la PDSA no lo recomendaría con niños muy pequeños ni para quienes tienen perro por primera vez y, por su fuerte instinto de presa, desaconseja que conviva con mascotas más pequeñas. La PDSA aconseja también dejar un intervalo entre la comida y el ejercicio.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker, Cocker inglés, Cocker Spaniel (Reino Unido), English Cocker, Merry Cocker",
      text: [
        "El cocker spaniel inglés (en Gran Bretaña, simplemente cocker spaniel) es una raza distinta del cocker spaniel americano. El estándar de la FCI describe un perro de caza alegre y robusto, bien equilibrado y compacto, con orejas lobuladas de inserción baja y un pelo liso y sedoso; el estándar del AKC lo describe como alegre y cariñoso, de carácter equilibrado, e incluye el negro entero, el hígado y los tonos de rojo, así como los colores combinados con blanco. El Breed Watch del Royal Kennel Club no señala ningún punto de preocupación específico de la raza.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje a diario, y sitúa su esperanza de vida por encima de los 10 años; un estudio de VetCompass con cocker spaniels ingleses del Reino Unido halló una edad mediana de muerte de 11,44 años. La PDSA dice que, gracias a su carácter paciente, suele llevarse bien con los niños, siempre bajo supervisión, pero advierte que se le conoce por la ansiedad por separación y que nunca debe quedarse solo más de cuatro horas. La PDSA aconseja también un cepillado diario y dejar un intervalo entre la comida y el ejercicio.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Maltés, Bichon Maltais, Maltese",
      text: [
        "El bichón maltés es un perro toy originario del Mediterráneo central, hoy bajo patrocinio italiano en la FCI. El estándar de la FCI describe un perro pequeño de cuerpo alargado, vivaz, cariñoso, muy tranquilo y muy inteligente, de 3 a 4 kg de peso, con un pelo muy largo, denso y sedoso que cae pesadamente sobre todo el cuerpo. El pelaje no tiene subpelo y el blanco puro es el único color (se permite un ligero tono marfil pálido). El Breed Watch del Royal Kennel Club no señala ningún punto de preocupación específico de la raza.",
        "El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje a diario, dice que la raza no suelta pelo y sitúa su esperanza de vida por encima de los 12 años. La PDSA describe un perro despierto, simpático y cariñoso que puede ser reservado con los desconocidos pero que, con la socialización adecuada de pequeño, puede aprender a ser seguro y sociable. PetMD advierte que puede desarrollar ansiedad por separación si se queda solo demasiado tiempo, dice que el contacto con niños pequeños debe estar supervisado y aconseja cepillarle los dientes todos los días.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Pug, Pug dog",
      text: [
        "El carlino es un perro de compañía pequeño originario de China, hoy bajo patrocinio británico en la FCI. El estándar de la FCI describe un perro claramente cuadrado y rechoncho («multum in parvo»), con mucho encanto, dignidad e inteligencia y un carácter equilibrado, alegre y vivaz, un peso ideal de 6,3 a 8,1 kg, un pelo fino, liso, corto y brillante de color plata, albaricoque, leonado o negro, y una cola muy enroscada sobre la cadera. Pide unas fosas nasales bastante grandes y bien abiertas y considera inaceptables las fosas nasales estrechas y una arruga gruesa sobre la nariz. El Royal Kennel Club sitúa la raza en la categoría 3 del Breed Watch, con puntos de preocupación como la dificultad respiratoria, los ojos saltones, la dermatitis de los pliegues de la piel y el exceso de peso.",
        "La PDSA describe el carlino como una raza muy braquicéfala (de cara chata) que puede quedarse sin aliento con facilidad, aconseja evitar el ejercicio con calor y dice que sus veterinarios recomendarían encarecidamente optar en su lugar por una raza de hocico normal o por un cruce de carlino. El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje una vez por semana, dice que la raza suelta pelo y sitúa su esperanza de vida por encima de los 10 años. La PDSA describe un perro que a menudo se lleva bien con los niños y con otras mascotas, pero que adora la compañía y lleva mal quedarse solo; PetMD aconseja limpiar y secar los pliegues de la piel de la cara todos los días y señala que la obesidad es frecuente en la raza.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Rough Collie, Collie (Rough)",
      text: [
        "El collie de pelo largo es un perro pastor grande originario de Gran Bretaña. El estándar de la FCI describe un perro de gran belleza, que se mantiene con una dignidad impasible, de carácter simpático y sin rastro de nerviosismo ni agresividad, con un pelaje muy denso de pelo de cobertura liso y áspero, y tres colores: sable, tricolor y merle azul. El estándar del Royal Kennel Club lo describe como un gran perro de compañía, simpático, alegre y activo, bueno con los niños y con otros perros, y sitúa la altura de 56 a 61 cm en los machos y de 51 a 56 cm en las hembras. El Royal Kennel Club sitúa la raza en la categoría 2 del Breed Watch y no registra cachorros de cruces entre dos perros merle.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje a diario, dice que la raza suelta pelo y sitúa su esperanza de vida por encima de los 12 años. PetMD dice que los collies son cariñosos, sobre todo con los niños, y buenos con otros animales, pero que llevan mal quedarse solos durante mucho tiempo y pueden mordisquear tobillos y talones cuando se excitan. También señala que la socialización del cachorro es fundamental y que en los collies se da la mutación MDR1, que afecta a la forma en que un perro procesa ciertos medicamentos.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "Mastín inglés, English Mastiff, Old English Mastiff",
      text: [
        "El mastiff, o mastín inglés, es una raza de guarda muy grande originaria de Gran Bretaña. El estándar de la FCI describe una combinación de grandeza y valor (tranquilo, cariñoso con sus dueños pero capaz de guardar), con una cabeza de aspecto cuadrado, un cuerpo ancho, profundo y potente y un pelo corto y pegado de color albaricoque, leonado o atigrado. La PDSA indica una altura media de 71 a 78 cm y un peso medio de 80 a 85 kg, y señala que el Kennel Club clasifica al mastiff en la categoría 3: razas con problemas de conformación visibles que pueden causar dolor, molestias o problemas de salud.",
        "La PDSA recomienda alrededor de una hora de ejercicio al día para los perros adultos (pero sin excesos mientras los huesos y las articulaciones del cachorro siguen desarrollándose) y cuidados del pelaje una vez por semana con limpieza diaria de las arrugas de la cara, y sitúa su esperanza de vida media por debajo de los 10 años. PetMD considera que los mastiffs son estupendos perros de familia para hogares con niños que saben cómo tratar a las mascotas, aunque quizá no con niños muy pequeños o bebés por su tamaño; suelen llevarse bien con otras mascotas que conocen de cachorros, babean mucho y no deben hacer ejercicio durante la hora anterior y la posterior a las comidas por el riesgo de torsión de estómago (dilatación-torsión gástrica).",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba, Japanese Shiba Inu",
      text: [
        "El shiba inu es un spitz pequeño originario de Japón; su nombre significa «perro pequeño» y, según el Royal Kennel Club, se desarrolló para cazar pequeñas aves de caza. El estándar de la FCI describe un perro pequeño, bien equilibrado y de buena osamenta, de temperamento fiel, sentidos agudos y gran capacidad de alerta, con un pelo de cobertura áspero sobre un subpelo suave y denso, orejas pequeñas, triangulares y erguidas y una cola gruesa y enroscada; los colores son rojo, negro y fuego, y sésamo, siempre con las marcas blanquecinas «urajiro» en las mejillas, el pecho y la parte inferior del cuerpo. El estándar del AKC indica un peso medio de unas 23 libras (10 kg) en los machos y 17 libras (8 kg) en las hembras.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje una vez por semana, señala que la raza suelta pelo y sitúa su esperanza de vida por encima de los 10 años; un gran estudio británico halló una esperanza de vida mediana de 14,6 años. El AKC describe un perro seguro de sí mismo e independiente, más adecuado para un dueño con experiencia, que es más feliz con niños mayores y al que nunca se debe soltar de la correa fuera de una zona vallada o cerrada. PetMD añade que necesita mucha estimulación mental, que le beneficia la socialización de cachorro y que hay que cepillarle los dientes todos los días.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, crestado rodesiano, perro león africano, African Lion Dog",
      text: [
        "El rhodesian ridgeback procede del sur de África. Su rasgo más conocido es la cresta del lomo, una franja de pelo que crece en sentido contrario al resto del pelaje. El estándar de la FCI describe un perro equilibrado, fuerte, musculoso, ágil y activo, digno, inteligente y reservado con los extraños, especialmente apreciado como perro guardián y perro de familia. El pelo, corto y denso, va del trigo claro al trigo rojizo, y el estándar indica un peso de unos 36,5 kg para los machos y 32 kg para las hembras.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana, señala que la raza suelta pelo y que le conviene una casa grande con un jardín grande, y cifra su esperanza de vida en más de 10 años. La PDSA describe perros juguetones, potentes y muy leales, con un instinto de presa muy alto, que no se recomiendan para quien tiene perro por primera vez, que nunca deberían quedarse solos más de cuatro horas y que necesitan socialización desde pequeños; también aconseja dejar un intervalo entre la comida y el ejercicio. Woodgreen añade que se adaptan mejor a familias con niños mayores.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Spaniel continental enano, Epagneul nain continental, Phalène (variedad de orejas caídas), perro mariposa, Butterfly Dog",
      text: [
        "El papillon es la variedad de orejas erguidas del spaniel continental enano, una raza de Bélgica y Francia; la variedad de orejas caídas se llama phalène. El estándar de la FCI describe un pequeño spaniel de compañía elegante, de pelo largo y carácter vivaz, de unos 28 cm de altura y con un peso de hasta 4,5 kg en los machos y 5 kg en las hembras. Lleva sus grandes orejas como las alas abiertas de una mariposa, y el pelaje es siempre blanco con manchas de color.",
        "El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje más de una vez por semana, señala que la raza suelta pelo y puede vivir en un piso, y cifra su esperanza de vida en más de 12 años. La PDSA describe perros dulces, juguetones y muy obedientes que se llevan bien con todo el mundo y necesitan adiestramiento y socialización desde pequeños; sugiere cepillarlos dos o tres veces por semana. PetMD añade que estos perros necesitan estimulación mental a diario, pueden sufrir ansiedad por separación y conviene cepillarles los dientes todos los días, y que los niños muy pequeños pueden hacer daño sin querer a un perro tan pequeño.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Portuguese Water Dog, Algarvian Water Dog",
      text: [
        "El perro de agua portugués procede de Portugal, donde trabajaba con los pescadores. El estándar del Royal Kennel Club describe un perro robusto, casi cuadrado y de musculatura muy potente (muy inteligente, con una energía tremenda y grandes dotes para nadar y bucear) que mide de 50 a 57 cm (machos) y de 43 a 52 cm (hembras) y pesa de 19 a 25 kg (machos) y de 16 a 22 kg (hembras). Su abundante pelaje, de una sola capa y sin subpelo, es negro, blanco, marrón, o negro o marrón con blanco; el tradicional corte «león» deja cortos el hocico y los cuartos traseros.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje a diario, señala que la raza no suelta pelo y que le conviene una casa grande, y cifra su esperanza de vida en más de 10 años. La PDSA describe perros muy simpáticos y cariñosos que se llevan bien con otras mascotas, son excelentes perros de familia y necesitan adiestramiento y socialización desde pequeños; añade que a lo largo del año hay que llevarlos a una peluquería canina profesional para cortarles el pelo y darle forma.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon Frise, bichón de Tenerife, bichón tinerfeño",
      text: [
        "El bichón frisé es un perro de compañía franco-belga. El estándar de la FCI describe un perrito alegre, de andar vivaz y con un pelo blanco muy suelto, en tirabuzones: un auténtico compañero que puede ir a todas partes, ni nervioso ni ladrador, que mide de 25 a 29 cm a la cruz y pesa unos 5 kg. El adulto es siempre de un blanco puro, con ojos redondos muy oscuros, trufa negra, orejas caídas y una cola con penacho que lleva sobre el lomo.",
        "El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje a diario, señala que la raza no suelta pelo y que puede vivir en un piso, y cifra su esperanza de vida en más de 12 años. La PDSA describe perros muy afectuosos y cariñosos que se llevan de maravilla con los niños y con otras mascotas, y añade que el pelo necesita un arreglo cada par de meses, a menudo en una peluquería canina profesional.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfoundland, Newfie, Newf",
      text: [
        "El terranova procede de Canadá; la FCI lo clasifica entre los molosoides de tipo montaña y reconoce tres colores: negro, blanco y negro (landseer) y marrón. La PDSA los llama «gigantes bonachones» y da una altura media de 66 a 71 cm y un peso medio de 50 a 69 kg; PetMD añade que, por la historia de la raza, son nadadores natos.",
        "La PDSA recomienda al menos una hora de ejercicio al día para los adultos, pero no excederse con los cachorros mientras sus huesos y articulaciones aún se están desarrollando; considera el cuidado del pelaje una tarea diaria, señala que los terranovas suelen babear y cifra su esperanza de vida en menos de 10 años. PetMD lo califica de excelente perro de familia que se lleva bien con los niños, con mascotas pequeñas y con otros perros, aconseja vigilar siempre a los niños pequeños con cualquier perro y advierte de que algunos pueden sufrir ansiedad por separación cuando se quedan solos.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Dalmatian, perro de carruaje, Carriage Dog, Firehouse Dog",
      text: [
        "El dálmata procede de Croacia; la FCI lo clasifica entre las razas emparentadas con los sabuesos. Su pelo, corto y brillante, es de un blanco puro con manchas negras o hígado (marrones) bien definidas, y el estándar pide orejas manchadas. La FCI da una altura de 56 a 62 cm para los machos y de 54 a 60 cm para las hembras; la PDSA da un peso medio de 18 a 27 kg.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana, y señala que la raza suelta pelo y que le conviene una casa grande con jardín. La PDSA considera a los dálmatas estupendas mascotas para hogares activos, más adecuadas para niños algo mayores, que necesitan compañía y nunca deberían quedarse solos más de cuatro horas; incluye la sordera entre los problemas de salud de la raza y señala que existe una prueba de audición, la BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Pastor ganadero australiano, Australian Cattle Dog, Blue Heeler, Red Heeler, Queensland Heeler, Cattle Dog",
      text: [
        "El boyero australiano procede de Australia; la FCI lo clasifica entre los perros boyeros. El estándar del Kennel Club describe un perro de trabajo fuerte y compacto, con un doble pelaje liso y resistente a la intemperie, de color azul (moteado o salpicado) o rojo salpicado uniforme, y da una altura de 46 a 51 cm para los machos y de 43 a 48 cm para las hembras; la PDSA da un peso medio de 16 a 20 kg.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana, y señala que la raza suelta pelo. La PDSA describe un perro muy inteligente y con muchísima energía que necesita mucha actividad física y mental; por su fuerte instinto de pastoreo puede mordisquear los talones de los niños que corren, y la socialización y el adiestramiento desde pequeño ayudan.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "El whippet procede de Gran Bretaña; la FCI lo clasifica entre los lebreles de pelo corto. El estándar del Kennel Club describe una combinación equilibrada de potencia muscular y fuerza con elegancia y gracia de líneas, un pelo fino, corto y pegado de cualquier color o mezcla de colores salvo el merle, y un carácter dulce, cariñoso y equilibrado; da una altura de 47 a 51 cm para los machos y de 44 a 47 cm para las hembras, y la PDSA da un peso medio de 11 a 18 kg.",
        "La PDSA recomienda al menos una hora de ejercicio todos los días, con ocasiones de correr sin correa en una zona segura, y un cepillado semanal con un cepillo suave. Considera a los whippets una opción popular entre las familias porque son tranquilos y dulces con los niños, pero recomienda un hogar con niños algo mayores; a los whippets no les gusta quedarse solos y tienen un instinto de presa altísimo, por lo que la PDSA no recomienda tenerlos con mascotas más pequeñas. Un abrigo puede venirles bien en invierno, y una cama gruesa y blanda protege sus huesos prominentes.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Grifón Korthals, Korthals Griffon, Wire-haired Pointing Griffon Korthals, Griff",
      text: [
        "El grifón de muestra de pelo duro Korthals, también llamado simplemente grifón Korthals, procede de Francia; la FCI lo clasifica entre los perros de muestra continentales y lo define, ante todo, como un perro de muestra polivalente. El estándar de la FCI describe un perro vigoroso y rústico, más largo que alto, de pelo duro y áspero, nunca rizado ni lanoso, con la trufa siempre marrón y, preferiblemente, un pelaje gris acero con manchas marrones (hígado); da una altura de unos 55 a 60 cm para los machos y de 50 a 55 cm para las hembras y define la raza como afable, orgullosa y muy dulce con los niños. PetMD da un peso de 35 a 70 libras (unos 16 a 32 kg).",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día, una casa grande con un jardín grande y cuidados del pelaje más de una vez por semana. PetMD aconseja cepillarlo cada semana (algunos perros necesitan además un stripping manual), dice que los griffs suelen ser pacientes y dulces con los niños si se socializan de cachorros, y señala que su pasado de cazadores puede darles un fuerte instinto de presa, de modo que animales más pequeños, como gatos y conejos, pueden parecerles algo que perseguir.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Retriever de la bahía de Chesapeake, Chessie, Retriever (Chesapeake Bay)",
      text: [
        "El Chesapeake Bay retriever, a menudo llamado chessie, procede de Estados Unidos; la FCI lo clasifica entre los retrievers. El estándar de la FCI describe un retriever de trabajo igual de eficaz en tierra que en el agua, cuyo tamaño y sustancia no deben ser excesivos, con un pelo espeso y corto sobre un subpelo denso y lanoso y ojos claros, amarillentos o ámbar; se admite cualquier tono de marrón, juncia o hierba seca, y el pelaje negro descalifica. Da una altura de 58 a 66 cm y un peso de 29,5 a 36,5 kg para los machos, y de 53 a 61 cm y de 25 a 32 kg para las hembras.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día, una casa grande con un jardín grande y cuidados del pelaje una vez por semana. PetMD describe un perro despierto, alegre y extremadamente cariñoso que puede volverse destructivo si no recibe estímulos o se queda solo demasiado tiempo, dice que, con unas buenas presentaciones y socialización, los chessies son una gran incorporación a la familia, y aconseja no dejar que el perro haga ejercicio justo antes o justo después de comer.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Samoyed, Sammy, Samoyede",
      text: [
        "El samoyedo procede del norte de Rusia y de Siberia; la FCI lo clasifica entre los perros nórdicos de trineo. El estándar de la FCI describe un spitz ártico blanco y elegante, de tamaño mediano, con un pelaje polar abundante, espeso y denso, ojos marrón oscuro, orejas pequeñas, gruesas y erguidas, y labios ligeramente curvados hacia arriba en las comisuras, en la característica «sonrisa del samoyedo»; el pelaje es blanco puro, crema o blanco y bizcocho, y los ojos azules o de distinto color descalifican. Da una altura ideal de 57 cm para los machos y 53 cm para las hembras, con una tolerancia de 3 cm en cada caso.",
        "La PDSA recomienda un mínimo de dos horas de ejercicio todos los días y cuidados del pelaje a diario, y dice que los samoyedos sueltan pelo muy a menudo, suelen llevarse de maravilla con los niños y son leales a toda la familia, nunca deberían quedarse solos más de cuatro horas, necesitan un jardín muy bien cerrado porque son auténticos maestros de la fuga y tienen un fuerte instinto de presa; aconseja dejar un intervalo después de comer y antes de hacer ejercicio. PetMD añade que los samoyedos no llevan bien el calor.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottish Terrier, Scottie, terrier de Aberdeen, Aberdeen Terrier",
      text: [
        "El terrier escocés, a menudo llamado scottie, procede de Gran Bretaña; la FCI lo clasifica entre los terriers de talla pequeña. El estándar del Kennel Club describe un perro recio y de patas cortas, de porte atento, que sugiere gran potencia y actividad en poco espacio; leal y fiel, digno, independiente y reservado, pero valiente y muy inteligente: audaz, pero nunca agresivo. Su doble pelaje, pegado al cuerpo, tiene una capa exterior áspera y dura; el color es negro, trigo o atigrado de cualquier tono. Da una altura de 25 a 28 cm y un peso de 8,5 a 10,5 kg.",
        "La PDSA dice que los scotties necesitan alrededor de una hora de ejercicio al día y cuidado del pelaje a diario, con un stripping y un corte en una peluquería canina profesional cada dos o tres meses; los describe como leales y entregados a su familia y dice que pueden ser tozudos, por lo que el adiestramiento requiere paciencia y constancia. PetMD dice que, con el adiestramiento y la socialización adecuados, pueden ser buenos perros de familia, que socializar al cachorro es importante y que no deberían quedarse solos durante mucho tiempo.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner, Weimaraner Pointer, Weim",
      text: [
        "El braco de Weimar procede de Alemania; la FCI lo clasifica entre los perros de muestra continentales y reconoce una variedad de pelo corto y otra de pelo largo. El estándar de la FCI describe un perro de caza de tamaño mediano a grande, de tipo funcional de trabajo, enjuto y muy musculoso, con ojos ámbar y orejas anchas y bastante largas; el pelaje es gris plata, gris corzo o gris ratón, solo se permiten pequeñas marcas blancas en el pecho y los dedos, y cualquier color distinto del gris descalifica. Da una altura de 59 a 70 cm y un peso de unos 30 a 40 kg para los machos, y de 57 a 65 cm y unos 25 a 35 kg para las hembras.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día, una casa grande con un jardín grande y cuidados del pelaje una vez por semana. La PDSA dice que los bracos de Weimar son maravillosos perros de familia en buenas manos y que se adaptan mejor a dueños que conocen la raza, pero no los recomienda para hogares con niños pequeños o mascotas más pequeñas por su fortísimo instinto de presa; dice que pueden sufrir ansiedad por separación si se quedan solos y aconseja socializarlos desde pequeños y dejar un intervalo entre la comida y el ejercicio. PetMD añade una limpieza de oídos y un baño al mes.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Lebrel italiano, galgo italiano, Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "El pequeño lebrel italiano procede de Italia; la FCI lo clasifica, como Piccolo Levriero Italiano, entre los lebreles de pelo corto. El estándar del Kennel Club describe un galgo inglés en miniatura, más esbelto en todas sus proporciones, elegante, grácil y de movimientos rápidos, inteligente, cariñoso y vivaz aunque pueda parecer distante, con un pelo corto, fino y brillante sobre una piel fina. Da una altura de 32 a 38 cm y un peso de 3,6 a 4,5 kg; se aceptan el negro, el azul, el crema, el leonado, el rojo y el blanco, o cualquiera de ellos con blanco, pero nunca el merle, el atigrado ni las marcas fuego.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y dice que la raza se adapta a una casa pequeña, tanto en la ciudad como en el campo, que su pelaje necesita cuidados una vez por semana y que no suelta pelo. La PDSA dice que los pequeños lebreles italianos están llenos de energía, que deberían hacer ejercicio en un espacio cerrado porque, en cuanto ven una presa, puede costar que vuelvan a la llamada, que pueden ser tímidos, por lo que la socialización temprana es imprescindible, y que, como sus huesos son frágiles mientras crecen, quizá no sean la raza ideal para hogares con niños pequeños u otras mascotas. PetMD añade que su fino pelaje no les abriga, así que pasan frío con facilidad.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer, schnauzer de Múnich, Giant Schnauzer",
      text: [
        "El schnauzer gigante procede de Alemania; la FCI lo clasifica, como Riesenschnauzer, entre los perros de tipo pinscher y schnauzer. El estándar del Royal Kennel Club describe un perro de constitución potente, robusto y enjuto, de aspecto casi cuadrado, audaz, fiable, bonachón y sereno, con un pelo exterior áspero y duro y un buen subpelo. Da una altura de 65 a 70 cm para los machos y de 60 a 65 cm para las hembras; el estándar de la FCI da un peso de 35 a 47 kg. Se aceptan el negro puro, el sal y pimienta con máscara facial oscura y el negro y plata; ningún otro color.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y dice que la raza se adapta a una casa grande con un jardín grande, que su pelaje necesita cuidados a diario y que no suelta pelo. La PDSA dice que el pelaje necesita cuidados diarios y arreglos regulares, que los schnauzers gigantes pueden ser mascotas adorables para familias con niños algo mayores si se socializan bien de cachorros, y que estos perros de carácter firme son para dueños con experiencia. PetMD añade que cada pocos meses se les hace un stripping manual en una peluquería canina profesional y que la raza no se adapta bien a hogares donde la gente pasa poco tiempo en casa.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Sabueso de San Huberto, Bloodhound, Chien de Saint-Hubert, St. Hubert Hound, Sleuth Hound",
      text: [
        "El perro de San Huberto procede de Bélgica, donde se le llama Chien de Saint-Hubert; la FCI lo clasifica como sabueso de talla grande. El estándar de la FCI lo describe como el más potente de todos los sabuesos: dulce, plácido, bondadoso y sociable con las personas y especialmente apegado a su dueño, con un pelo corto, denso y resistente a la intemperie y una piel flexible y holgada. Los machos pesan de unos 46 a 54 kg y las hembras, de unos 40 a 48 kg; los tres colores son negro y fuego, hígado y fuego, y rojo.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y dice que la raza se adapta a una casa grande con un jardín grande, que su pelaje necesita cuidados una vez por semana y que suelta pelo. La PDSA dice que los perros de San Huberto son más adecuados para dueños con experiencia, que no se recomiendan para hogares con niños pequeños o mascotas más pequeñas por su tamaño y su altísimo instinto de presa, que babean y que hay que mantener sus pliegues de piel limpios y secos. También aconseja dejar un intervalo entre la comida y el ejercicio.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita, American Akita, gran perro japonés, Great Japanese Dog",
      text: [
        "El akita de este registro es el de tipo americano: la FCI lo clasifica como akita americano, una raza de origen japonés, distinta del akita inu japonés. El estándar de la FCI describe un perro grande, de constitución sólida, bien equilibrado, con mucha sustancia y huesos fuertes, orejas pequeñas y erguidas y una cola grande que lleva sobre el lomo; los machos miden de 66 a 71 cm a la cruz. Se admite cualquier color, como el rojo, el leonado, el blanco, el pinto o el atigrado. La PDSA da un peso medio de 31 a 59 kg.",
        "La PDSA describe perros de familia increíblemente leales, independientes y muy grandes, por lo que se adaptan mejor a dueños con experiencia; no recomendaría un akita para un hogar con niños pequeños y desaconseja dejarlos solos, porque muchos lo llevan mal. Recomienda al menos dos horas de ejercicio todos los días, socialización desde pequeños, un intervalo entre la comida y el ejercicio y un cepillado al menos semanal: los akitas sueltan mucho pelo. También señala un instinto de presa alto y que pueden sobrecalentarse cuando hace mucho calor.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Corgi Cardigan, Cardigan Welsh Corgi, Welsh Corgi (Cardigan), Cardi",
      text: [
        "El welsh corgi Cardigan procede de Gran Bretaña; la FCI lo clasifica entre los perros boyeros. El estándar del American Kennel Club da una altura de 10,5 a 12,5 pulgadas (unos 27 a 32 cm) a la cruz y un peso ideal de 30 a 38 libras (unos 14 a 17 kg) para los machos. A diferencia de su primo, el Pembroke, tiene una cola larga y poblada.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día, considera suficiente una casa pequeña con un jardín pequeño o mediano, y dice que su pelaje necesita cuidados más de una vez por semana y que la raza suelta pelo; cifra su esperanza de vida en más de 12 años e incluye al Cardigan entre las razas autóctonas vulnerables. La PDSA dice que los welsh corgis tienen muchas ganas de agradar, por lo que el adiestramiento debería ser bastante fácil, que dos o tres cepillados por semana suelen bastar y que pueden mordisquear los talones de los niños que corren, por lo que conviene socializarlos con niños y adiestrarlos desde pequeños.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Drahthaar, Deutsch Drahthaar, German Wirehaired Pointer, GWP",
      text: [
        "El braco alemán de pelo duro procede de Alemania; la FCI lo clasifica, como Deutsch Drahthaar, entre los perros de muestra continentales. El estándar del Royal Kennel Club describe un perro de caza de tamaño mediano con un pelo duro que cubre por completo la piel: dulce, cariñoso y equilibrado, atento, dócil y muy leal. Los machos miden de 60 a 67 cm y pesan de 25 a 34 kg; las hembras miden de 56 a 62 cm y pesan de 20,5 a 29 kg. Los colores del estándar son hígado y blanco, hígado uniforme y negro y blanco.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y dice que se adapta a una casa grande con un jardín grande en el campo, que su pelaje necesita cuidados más de una vez por semana y que suelta pelo. PetMD dice que estos bracos necesitan mucho ejercicio y estimulación mental, crean un fuerte vínculo con su familia y pueden ser estupendos perros de familia si se adiestran y socializan pronto, se llevan bien con niños a los que se ha enseñado a comportarse con los animales, nunca deberían quedarse solos durante mucho tiempo y tienen un instinto de presa alto. Al pelaje se le hace un stripping manual dos veces al año.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "Perro de San Bernardo, St. Bernard, Saint Bernard, St. Bernhardshund, Bernhardiner",
      text: [
        "El san bernardo procede de Suiza; la FCI lo clasifica, como St. Bernard, entre los molosoides de tipo montaña. El estándar de la FCI describe un perro amistoso por naturaleza, de temperamento tranquilo a vivaz y vigilante, y reconoce dos variedades: la de pelo corto, con un pelaje denso, liso y pegado, y la de pelo largo. Los machos miden al menos 70 cm y las hembras al menos 65 cm, hasta 90 y 80 cm respectivamente; la PDSA da un peso de 54 a 81 kg.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y dice que la raza se adapta a una casa grande con un jardín grande, que su pelaje necesita cuidados más de una vez por semana, que suelta pelo y que suele vivir menos de 10 años. La PDSA dice que a los san bernardos les encanta estar en familia y que se llevan de maravilla con personas de todas las edades, niños incluidos, que deberían socializarse bien de cachorros, que necesitan un cepillado al menos tres veces por semana, que babean, que no llevan tan bien el calor y que necesitan un intervalo entre la comida y el ejercicio. PetMD añade que estos perros tan apegados a las personas pueden sufrir ansiedad por separación si se quedan solos durante mucho tiempo.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "El staffordshire bull terrier procede de Gran Bretaña; la FCI lo clasifica entre los terriers de tipo bull. El estándar de la FCI describe un perro de pelo liso, bien equilibrado y de gran fuerza para su tamaño; tradicionalmente de un valor y una tenacidad indomables, muy inteligente y cariñoso, sobre todo con los niños. Mide de 35,5 a 40,5 cm; los machos pesan de 12,7 a 17 kg y las hembras de 11 a 15,4 kg. Puede ser atigrado, rojo, leonado, negro, azul o blanco, solo o con blanco.",
        "El Royal Kennel Club lo considera un perro de familia maravilloso y recomienda hasta una hora de ejercicio al día; su pelaje necesita cuidados una vez por semana, la raza suelta pelo y suele vivir más de 12 años. La PDSA dice que los staffies son tolerantes y de carácter dulce con los niños, pero que, como perros muy apegados a las personas, suelen sufrir ansiedad por separación cuando se quedan solos, que son conocidos por mordisquearlo todo y que, por su fortísimo instinto de presa, no es buena idea tener mascotas más pequeñas cerca de ellos.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Airedale, rey de los terriers, King of Terriers, Waterside Terrier, Bingley Terrier",
      text: [
        "El airedale terrier procede de Gran Bretaña; la FCI lo clasifica entre los terriers de talla grande y mediana. El estándar de la FCI lo define como el más grande de los terriers: un perro musculoso, activo y bastante compacto, extrovertido y seguro de sí mismo, amistoso, valiente e inteligente, siempre atento, no agresivo pero intrépido. Los machos miden de unos 58 a 61 cm y las hembras, de unos 56 a 59 cm. Su pelo, duro, denso y áspero, es de color fuego con una silla negra o gris entrecano.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día; hay que cuidar su pelaje a diario, no suelta pelo y la raza suele vivir más de 10 años. PetMD describe estupendos perros de familia que, bien adiestrados, suelen llevarse bien con los niños, pero que no deberían quedarse solos a su aire demasiado tiempo; aconseja cepillarlos unas cuantas veces por semana, una limpieza rápida de oídos cada semana y llevarlos a una peluquería canina profesional tres o cuatro veces al año.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, Russell Terrier (AKC), JRT",
      text: [
        "El Jack Russell terrier (el American Kennel Club lo llama Russell terrier) procede de Inglaterra y se desarrolló en Australia; la FCI lo clasifica entre los terriers de talla pequeña. Su estándar describe un terrier de trabajo fuerte, activo y ágil, de gran carácter: vivaz, atento y activo, audaz e intrépido, amistoso pero con una seguridad tranquila. Mide de 25 a 30 cm y pesa unos 5 a 6 kg. Su pelo, liso, partido o duro, es mayoritariamente blanco con marcas negras y/o fuego.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje una vez por semana; la raza suelta pelo y suele vivir más de 10 años. La PDSA describe perros listos y vivarachos que pueden ser buenos perros de familia si se adiestran y socializan desde pequeños, pero que se adaptan mejor a familias con niños algo mayores; tienen un instinto de presa altísimo, por lo que no se recomiendan mascotas más pequeñas, y les encanta escarbar.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "El bullmastiff es una antigua raza inglesa de guarda del siglo XIX, descendiente del bulldog y del antiguo mastiff inglés; la FCI lo clasifica entre los molosoides. Su estándar describe un perro potente y armonioso que muestra una gran fuerza sin resultar pesado: resistente, activo, fiable, animoso, atento y fiel. Los machos miden de 64 a 69 cm y pesan de 50 a 59 kg; las hembras, de 61 a 66 cm y de 41 a 50 kg. Su pelo, corto y duro, puede ser de cualquier tono de leonado, rojo o atigrado, siempre con el hocico negro.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje una vez por semana, y la raza suele vivir menos de 10 años. La PDSA describe perros muy leales cuyo tamaño y fuerza los hacen más adecuados para hogares solo de adultos o familias con niños algo mayores; necesitan socialización temprana, lo ideal es que siempre haya alguien en casa, tienen un fortísimo instinto de presa, babean mucho y necesitan un intervalo entre la comida y el ejercicio.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Crestado chino, Chinese Crested, Powder Puff",
      text: [
        "El perro crestado chino es un perro de compañía pequeño, activo y grácil, originario de China; la FCI lo clasifica entre los perros sin pelo. Tiene dos variedades: la sin pelo (hairless), con el cuerpo liso y desnudo y pelo solo en la cabeza (la cresta), las patas y la cola, y la powder puff, cubierta por completo de un velo de pelo largo y suave. Los machos miden de 28 a 33 cm y las hembras de 23 a 30 cm; PetMD da un peso de 8 a 12 libras (de 3,6 a 5,4 kg). Se admite cualquier color salvo el merle, y su carácter se describe como alegre, nunca agresivo.",
        "El Royal Kennel Club recomienda hasta 30 minutos de ejercicio al día y cuidados del pelaje una vez por semana; se adapta a un piso y la raza suele vivir más de 12 años. PetMD describe un perro simpático que se adapta a la mayoría de las familias, también a las que tienen niños y otras mascotas; cualquier interacción con niños debe estar supervisada. La piel desnuda necesita protección contra el sol y el frío, hay que revisar las uñas cada semana y los cachorros necesitan una socialización temprana y constante.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, Nova Scotia Duck Tolling Retriever, Nova Scotia Retriever, Duck Tolling Retriever, NSDTR",
      text: [
        "El retriever de Nueva Escocia (el toller) es un retriever de Canadá; su estándar de la FCI describe cómo corre y juega por la orilla a la vista de los patos para atraerlos, y después se le envía a cobrar las aves. El estándar describe un perro de tamaño mediano, potente, compacto y bien musculado, muy inteligente, fácil de adiestrar y de gran resistencia. La FCI da a los machos de 48 a 51 cm y de 20 a 23 kg, y a las hembras de 45 a 48 cm y de 17 a 20 kg. Su doble pelaje, que repele el agua, es de diversos tonos de rojo o naranja, normalmente con blanco en la punta de la cola, las patas, el pecho o una lista en la cara.",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y cuidados del pelaje más de una vez por semana, y la raza suelta pelo; PetMD aconseja cepillarlo una o dos veces por semana. Un amplio estudio británico (McMillan 2024, a través de Dogs Trust) da una esperanza de vida mediana de 13,2 años, y PetMD, de 12 a 14 años; como otros perros medianos, alcanza su tamaño adulto aproximadamente entre los 12 y los 15 meses (PetMD). El AKC describe perros muy cariñosos que suelen llevarse bien con los niños, necesitan mucho ejercicio físico y estimulación mental, pueden tener un instinto de presa alto con los animales más pequeños y se benefician de una socialización temprana y de clases para cachorros.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn, Cairnie",
      text: [
        "El cairn terrier procede de Gran Bretaña; la FCI lo clasifica entre los terriers de talla pequeña. El estándar del Kennel Club describe un terrier ágil y atento, de aspecto natural y trabajador: activo, decidido y resistente, de carácter intrépido y alegre, firme pero no agresivo. Su doble pelaje, resistente a la intemperie, tiene una capa exterior abundante y áspera; el color es crema, trigo, rojo, gris o casi negro, el atigrado es aceptable y las orejas y el hocico oscuros son típicos. Da una altura de unos 28 a 31 cm y un peso ideal de 6 a 7,5 kg.",
        "La PDSA recomienda al menos una hora de ejercicio al día y dice que los cairns tienen una energía inagotable y un fuerte instinto de caza, por lo que hay que socializarlos pronto con gatos y otras mascotas pequeñas y tener cuidado cuando van sin correa, y que, una vez socializados, se llevan muy bien con los niños y son excelentes perros de familia. Aconseja hacer un stripping manual del pelaje dos veces al año y cuidarlo una o dos veces por semana; Dogs Trust dice que sueltan muy poco pelo. Un amplio estudio británico (McMillan 2024, a través de Dogs Trust) da una esperanza de vida mediana de 14,0 años, y PetMD, de 13 a 15 años; como otros perros pequeños, alcanza su tamaño adulto aproximadamente entre los 9 y los 12 meses (PetMD). PetMD añade que necesitan mucho ejercicio y estimulación mental.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bull terrier inglés, English Bull Terrier, Bully",
      text: [
        "El bull terrier procede de Gran Bretaña; la FCI lo clasifica entre los terriers de tipo bull (grupo 3). Es un terrier mediano de pelo corto: la PDSA da una altura media de 51 a 61 cm y un peso medio de 22 a 31 kg, y PetMD describe una complexión atlética de unas 21 a 22 pulgadas y de 50 a 70 libras. PetMD considera imprescindible el ejercicio regular y dice que los bull terriers son cariñosos con la familia, niños incluidos, pero no siempre amistosos con otros perros o con gatos, y que la socialización y el adiestramiento tempranos y frecuentes son clave.",
        "La PDSA recomienda al menos una hora de ejercicio al día, repartida a lo largo del día, y un intervalo después de las comidas antes del ejercicio. Dice que un bull terrier bien socializado se lleva bien con personas de todas las edades pero, como es algo excitable, se adapta mejor a niños algo mayores; le gusta tener compañía el mayor tiempo posible y tiene un instinto de presa alto, por lo que hay que tener cuidado con los gatos y otros animales pequeños. Para el pelaje basta un cepillado semanal. La PDSA da una esperanza de vida media de más de 10 años, y PetMD, de 12 a 13 años; como otros perros medianos, alcanza su tamaño adulto aproximadamente entre los 12 y los 15 meses (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Pinscher enano, Miniature Pinscher, Min Pin, Zwergpinscher",
      text: [
        "El pinscher miniatura procede de Alemania; la FCI lo clasifica entre los pinschers y schnauzers (grupo 2) y lo describe como una imagen reducida del pinscher alemán: vivaz, enérgico, seguro de sí mismo y equilibrado. Su pelo es corto, denso, liso y brillante, de un solo color, del rojo ciervo al marrón rojizo oscuro, o negro y fuego, y su cola es natural. El estándar de la FCI da una altura de 25 a 30 cm y un peso de 4 a 6 kg para machos y hembras; como otros perros toy, alcanza su tamaño adulto aproximadamente entre los 8 y los 12 meses (PetMD).",
        "La PDSA recomienda hasta media hora de ejercicio al día para estos perritos enérgicos y siempre ocupados, dice que para el pelaje suele bastar un cepillado semanal y señala que pueden ser tozudos e independientes, por lo que el adiestramiento requiere práctica y paciencia. PetMD dice que pueden ser excelentes perros de familia con la socialización y el adiestramiento adecuados. VCA describe la raza como juguetona y muy buena con los niños, aunque los niños muy pequeños o revoltosos pueden hacerle daño con juegos bruscos, y dice que su pelo fino y su pequeño tamaño lo hacen propenso a enfriarse. La PDSA da una esperanza de vida media de más de 12 años, y PetMD, de 12 a 16 años.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Gran pirineo, Great Pyrenees, Pyrenees, Patou, Chien de Montagne des Pyrénées",
      text: [
        "El perro de montaña de los Pirineos (en Estados Unidos, Great Pyrenees) procede de Francia; la FCI lo clasifica entre los molosoides de tipo montaña (grupo 2) y describe un perro de gran tamaño, imponente y de constitución fuerte, pero no exento de cierta elegancia. Su pelaje es blanco, o blanco con manchas gris tejón, gris lobo, amarillo pálido o naranja en la cabeza y las orejas. El estándar de la FCI da una altura de 70 a 80 cm para los machos y de 65 a 75 cm para las hembras; la PDSA da un peso medio de 40 a 50 kg. Como otros perros gigantes, alcanza su tamaño adulto aproximadamente entre los 18 y los 24 meses (PetMD).",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y dice que la raza se adapta a una casa grande con un jardín grande, que su pelaje necesita cuidados más de una vez por semana y que suelta pelo, y cifra su esperanza de vida en menos de 10 años (PetMD y VCA dan de 10 a 12 años). La PDSA los llama «gigantes bonachones»: perros tranquilos y de buen carácter que suelen llevarse bien con todo el mundo, y dice que el adiestramiento requiere paciencia y métodos basados en recompensas. VCA dice que este perro es muy devoto de su familia, sobre todo de los niños, y que la socialización temprana es muy importante; PetMD dice que convive bien con otras mascotas, pero que quizá esté mejor en hogares sin niños pequeños, y aconseja evitar el ejercicio intenso en torno a las comidas por el riesgo de torsión de estómago (dilatación-torsión gástrica).",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Terrier irlandés de pelo suave color trigo, wheaten terrier, Wheaten, Soft Coated Wheaten Terrier, Irish Soft Coated Wheaten Terrier, SCWT",
      text: [
        "El terrier irlandés de pelo suave procede de Irlanda; la FCI lo clasifica, como Irish Soft Coated Wheaten Terrier, entre los terriers de talla grande y mediana. El estándar del Royal Kennel Club describe un terrier de tamaño mediano, compacto y erguido, con un pelaje suave y sedoso de color trigo que cae en rizos sueltos u ondas: de buen carácter, animoso y decidido, lleno de seguridad y de humor. El único color es un trigo bien limpio. La PDSA da una altura media de 46 a 49 cm y un peso medio de 16 a 20,5 kg (el estándar del Kennel Club da a los machos de 16 a 20,5 kg y a las hembras algo menos); como otros perros medianos, alcanza su tamaño adulto aproximadamente entre los 12 y los 15 meses (PetMD).",
        "El Royal Kennel Club recomienda hasta una hora de ejercicio al día y dice que la raza se adapta a una casa pequeña, que su pelaje necesita cuidados a diario y que no suelta pelo. Un amplio estudio británico (McMillan 2024, a través de Dogs Trust) da una esperanza de vida mediana de 13,7 años; PetMD y VCA dan de 12 a 14 años. La PDSA los considera perros simpáticos y de confianza, estupendos para la familia, aunque pueden ser un poco tozudos. VCA dice que su carácter dulce y juguetón los hace buenos compañeros para los niños; PetMD dice que las interacciones con niños deben supervisarse, que no les gusta quedarse solos durante mucho tiempo, y aconseja llevarlos a una peluquería canina profesional cada cuatro a seis semanas, bañarlos más o menos una vez al mes y limpiarles los oídos cada una o dos semanas.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Lebrel irlandés, Irish Wolfhound, Wolfhound, Cú Faoil, Irish Wolf Hound",
      text: [
        "El lobero irlandés procede de Irlanda; la FCI lo clasifica entre los lebreles de pelo duro. La PDSA da una altura media de 71 a 79 cm y un peso medio de 40 a 55 kg; como otros perros gigantes, alcanza su tamaño adulto aproximadamente entre los 18 y los 24 meses (PetMD). El Royal Kennel Club califica su tamaño de extragrande y dice que se adapta a una casa grande con un jardín grande en el campo.",
        "El Royal Kennel Club recomienda más de dos horas de ejercicio al día y cuidados del pelaje más de una vez por semana, y dice que la raza suelta pelo. El Kennel Club y la PDSA cifran su esperanza de vida en menos de 10 años; PetMD, de 6 a 8 años. La PDSA no recomienda la raza para hogares con niños pequeños, por su tamaño y su fuerza, ni con mascotas más pequeñas, por su alto instinto de presa, y dice que nunca debería quedarse solo más de cuatro horas. PetMD aconseja socializar al cachorro desde el día en que llega a casa, no hacer ejercicio justo antes ni justo después de comer (por el riesgo de torsión de estómago o dilatación-torsión gástrica) y limpiarle los oídos cada dos a cuatro semanas.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "AmStaff, Am Staff, Staffordshire Terrier",
      text: [
        "El american Staffordshire terrier procede de Estados Unidos; la FCI lo clasifica entre los terriers de tipo bull. Su estándar pide una gran fuerza para su tamaño y da una altura de 46 a 48 cm para los machos y de 43 a 46 cm para las hembras, pero ningún peso. PetMD da de 40 a 70 libras (unos 18 a 32 kg) para ambos sexos; un perro de esta talla alcanza su tamaño adulto aproximadamente entre los 12 y los 15 meses (PetMD).",
        "PetMD recomienda al menos 60 minutos de ejercicio al día y dice que la raza es paciente y cariñosa con los niños, que puede ser propensa a la ansiedad por separación y que su fuerte instinto de presa puede complicar la convivencia con perros más pequeños o con gatos. Un estudio británico (McMillan et al., 2024, según la tabla de Dogs Trust) da una esperanza de vida mediana de 12,5 años; PetMD da de 12 a 16 años. VCA recomienda un cepillado semanal; PetMD aconseja socializar al cachorro, no hacer ejercicio justo después de comer (por el riesgo de torsión de estómago o dilatación-torsión gástrica) y bañarlo y limpiarle los oídos cada cuatro a seis semanas, aproximadamente.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, perro de agua de la Romaña, Romagna Water Dog, perro trufero, truffle dog",
      text: [
        "El lagotto romagnolo es un perro de agua de pelo rizado, de tamaño pequeño a mediano, originario de Italia y conocido como el perro trufero; la FCI lo clasifica entre los perros de agua. Su estándar da una altura de 43 a 48 cm y un peso de 13 a 16 kg para los machos, y de 41 a 46 cm y de 11 a 14 kg para las hembras; un perro de esta talla alcanza su tamaño adulto aproximadamente entre los 12 y los 15 meses (PetMD).",
        "El Royal Kennel Club lo considera un compañero de familia excelente y atento, recomienda más de dos horas de ejercicio al día y cuidados del pelaje más de una vez por semana, dice que no suelta pelo y cifra su esperanza de vida en más de 12 años; PetMD dice que los lagotti pueden vivir de 15 a 17 años. PetMD señala que necesita estimulación mental y física constante y mucha socialización, porque puede ser tímido; Woodgreen dice que puede pasarlo mal si se queda solo con demasiada frecuencia y recomienda llevarlo a una peluquería canina profesional cada seis a ocho semanas.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Alaskan Malamute, Malamute, Mal, Alaskan Mal",
      text: [
        "El malamute de Alaska es uno de los perros de trineo árticos más antiguos: un perro nórdico de trineo de Estados Unidos, potente y de constitución sólida, con un pelaje espeso y áspero. El estándar de la FCI da como tallas deseables 63,5 cm y 38 kg para los machos y 58,5 cm y 34 kg para las hembras; la PDSA da de 58 a 64 cm y de 34 a 39 kg. Un perro de esta talla alcanza su tamaño adulto aproximadamente entre los 15 y los 18 meses (PetMD), y la PDSA cifra su esperanza de vida en más de 10 años (PetMD: de 10 a 14 años).",
        "La PDSA recomienda un mínimo de dos horas de ejercicio intenso y un cepillado diario, y dice que los malamutes sueltan mucho pelo, tienen un fortísimo instinto de presa, no deberían quedarse solos más de cuatro horas y se adaptan a adultos activos o a familias con niños algo mayores; los considera un reto para quien tiene perro por primera vez. PetMD aconseja revisarles los oídos una vez por semana y bañarlos cada seis a ocho semanas, y señala que su espeso pelaje les hace pasarlo mal cuando hace calor.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Perro del Congo, perro que no ladra, African Barkless Dog, Congo Dog, barkless dog",
      text: [
        "El basenji es un perro de caza de constitución ligera y huesos finos, originario de África central, que no ladra, sino que emite un sonido propio parecido a un canto tirolés; la FCI lo clasifica entre los perros de tipo primitivo. La PDSA da una altura de 40 a 43 cm y un peso de 9 a 11 kg. Un perro de esta talla alcanza su tamaño adulto aproximadamente entre los 9 y los 12 meses (PetMD), y la PDSA cifra su esperanza de vida en más de 12 años (WebMD: de 13 a 14 años).",
        "La PDSA recomienda al menos una hora de ejercicio al día (unos 60 a 90 minutos), mucha estimulación mental y un cepillado semanal; describe a los basenjis como distantes pero de confianza, de voluntad firme y con muy poca noción del peligro del tráfico. WebMD dice que persiguen todo lo que parezca una presa, necesitan vallas muy altas o vigilancia constante y solo se llevan moderadamente bien con los niños pequeños, y aconseja limpiarles los oídos cada semana y cepillarles los dientes al menos dos veces por semana.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    british_shorthair: {
      aka: "Gato británico de pelo corto, gato británico, British Shorthair, British Blue",
      text: [
        "El británico de pelo corto es un gato robusto, de pelaje denso y grandes ojos redondos; la CFA lo llama un gato «osito de peluche». La mayoría de la gente se lo imagina gris azulado, pero existe en bastantes colores y patrones. Madura despacio: la CFA dice que alcanza su tamaño adulto hacia los tres años, y VCA, que la madurez física puede tardar hasta cinco.",
        "La CFA lo describe como muy cariñoso y apegado a su gente; se lleva bien con todos los miembros de la casa, sea cual sea su edad, pero no suele gustarle que lo cojan en brazos, y ha convivido con perros, conejos y pájaros. VCA describe un nivel de actividad moderado y aconseja peinarle el pelaje al menos una vez por semana. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Gato ragdoll, Rag doll",
      text: [
        "La CFA describe al ragdoll como un gato grande y tranquilo, de pelaje semilargo, mullido y sedoso, y ojos azules. Sus «puntos» más oscuros se presentan en varios patrones: colorpoint, sin blanco; mitted, con las patas blancas; bicolor, con más blanco, y van. Madura despacio: alcanza el color definitivo del pelaje a los dos años, y su tamaño y peso adultos, hacia los cuatro.",
        "La CFA describe un gato dulce que te recibe en la puerta y te sigue de habitación en habitación, y que suele jugar sin sacar las uñas. PetMD lo considera una buena opción para las familias, también las que tienen niños, pero aconseja presentarlo poco a poco, y con supervisión, a los niños y a otras mascotas, y dice que en algunos ragdolls basta con peinarlos una o dos veces por semana, mientras que la CFA aconseja peinarlos con regularidad. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Gato siberiano, gato de los bosques de Siberia, Siberian, Siberian Forest Cat",
      text: [
        "El GCCF describe al siberiano como un gato de desarrollo lento con un pelaje espeso e impermeable: un subpelo denso y suave bajo una capa exterior más áspera, que muda abundantemente en primavera y en otoño. Los machos pesan de unos 7,7 a 11,8 kg y las hembras de 5,9 a 7,7 kg, el desarrollo completo puede tardar de cuatro a cinco años, y el GCCF cifra su esperanza de vida entre 12 y 15 años o más.",
        "El GCCF lo considera enérgico y juguetón, pero paciente (una buena opción para familias con niños pequeños), y dice que convive bien con otros animales, perros incluidos. PetMD aconseja peinarlo al menos una vez por semana, con un esfuerzo extra durante la muda de primavera y otoño, y señala que los siberianos no se consideran hipoalergénicos. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Gato maine coon, Maine Coon cat",
      text: [
        "El maine coon está considerado, de forma generalizada, una de las razas de gato doméstico más grandes, con un cuerpo musculoso y rectangular, un pecho ancho, patas grandes y una cola larga y poblada. La TICA da un peso medio de unos 5,9 a 8,2 kg para los machos adultos y de 4,1 a 5,9 kg para las hembras, y la CFA señala que algunos machos pesan más de 9 kg. Crece despacio: según la CFA, a menudo no alcanza su pleno desarrollo hasta los tres o cuatro años, y según la TICA, la madurez completa puede tardar de tres a cinco años.",
        "La TICA lo describe como dulce, amistoso y juguetón, y la CFA, como sociable, leal e inteligente; a menudo «habla» con un trino gorjeante en lugar de maullar. Vetstreet escribe que los gatos maine coon se llevan bien con todo el mundo, niños, perros y otros gatos incluidos. Su pelaje, abundante y semilargo, es más corto en los hombros y más largo en la gorguera, el vientre y los cuartos traseros. Las fuentes difieren sobre su cuidado: Vetstreet dice que basta con peinarlo una vez por semana, la CFA aconseja cepillarlo o peinarlo al menos un par de veces por semana y la TICA señala que un pelaje más espeso puede necesitar un peinado diario. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Gato bengalí, gato de Bengala, Bengal, Bengal cat",
      text: [
        "La PDSA describe al bengalí como un gato muy inteligente y enérgico, que necesita mucha estimulación mental y ocasiones de hacer ejercicio y al que le gustan los puntos altos desde donde observar, como un rascador con plataformas. Es cariñoso, pero es más probable que se acurruque a tu lado que en tu regazo, y puede ser bastante hablador. VCA señala que los bengalíes crecen despacio y pueden tardar hasta dos años en alcanzar la madurez física.",
        "Su pelaje, corto y suave, moteado o marmoleado, solo necesita un cepillado o peinado ligero una vez por semana (PDSA). PetMD señala que el bengalí quizá no sea la mejor opción para familias con niños pequeños, mientras que con perros y otros gatos puede ir bien si se presentan como es debido. La raza se desarrolló a partir de cruces entre el gato leopardo asiático y gatos domésticos; PetPrep solo muestra el bengalí doméstico registrado. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Gato del bosque de Noruega, Norwegian Forest Cat, Wegie, Skogkatt",
      text: [
        "El GCCF describe al bosque de Noruega como dulce y amistoso, un gato que disfruta formando parte de una familia. Madura despacio y no se considera completamente desarrollado hasta los cuatro o cinco años, más o menos; los machos pesan de unos 5,4 a 7,3 kg y las hembras de 4,1 a 5,4 kg, y el GCCF cifra su esperanza de vida entre 14 y 16 años.",
        "Tiene mucha energía, disfruta con los juegos interactivos y trepa con soltura; el GCCF dice que tolera bien a los niños respetuosos, a otros gatos y a los perros que se llevan bien con gatos. PetMD aconseja peinarlo y cepillarlo al menos una vez por semana, más a menudo durante la muda de primavera y otoño, y señala que la ansiedad por separación puede ser un problema si a menudo se queda solo durante mucho tiempo. Los gatitos de raza suelen irse a su nuevo hogar a las 12 o 13 semanas (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default es;
