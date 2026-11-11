import type { RegistryCopy } from "./types";

/** Portuguese plural: 1 → singular, everything else (0, 1,5, 2 …) → plural («1,5 anos», «2 raças»). */
const s = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** First letter lower case for values that continue a phrase («Cães» → «os cães»). */
const lc = (t: string) => t.charAt(0).toLocaleLowerCase("pt") + t.slice(1);
/** pt-PT clock time, 24 h without a leading zero: "09:00" → «9h00», "16:30" → «16h30». */
const hhmm = (t: unknown) => String(t).replace(/^0(\d)/, "$1").replace(":", "h");
/** Breed name inside a sentence: lower case, except proper-name parts («o border collie», «o Jack Russell terrier», «o São Bernardo», «o Maine coon»). */
const rn = (name: string) =>
  /^(Jack|Chesapeake|Boston|Yorkshire|Airedale|Staffordshire|American|West|Welsh|Cavalier|Irish|Rhodesian|São|Maine|British)\b/.test(name) ? name : lc(name);
/** Definite article (breed names are masculine), optionally contracted with de / a / em: «o border collie», «do shih tzu», «ao akita», «no pug». */
const o = (name: string, prep: "" | "de" | "a" | "em" = "") => `${{ "": "o", de: "do", a: "ao", em: "no" }[prep]} ${rn(name)}`;
/** Indefinite article: «um border collie». */
const um = (name: string) => `um ${rn(name)}`;
type Fci = { number: number; group: number; origin: string };
/** Portuguese FCI group names (CPC nomenclature), in running-text form. */
const fciGroups: Record<number, string> = { 1: "cães de pastor e boieiros (exceto boieiros suíços)", 2: "cães do tipo pinscher e schnauzer – molossoides – cães de montanha e boieiros suíços", 3: "terriers", 4: "teckels", 5: "cães do tipo spitz e do tipo primitivo", 6: "sabujos, cães de pista de sangue e raças semelhantes", 7: "cães de parar", 8: "cães levantadores e cobradores de caça – cães de água", 9: "cães de companhia", 10: "lebréus" };
const origins: Record<string, string> = { GB: "Grã-Bretanha", FR: "França", DE: "Alemanha", US: "Estados Unidos", CU: "Cuba", CH: "Suíça", IT: "Itália", "CN-XZ": "Tibete (China)", CN: "China", MX: "México", BE: "Bélgica", HU: "Hungria", JP: "Japão", ZA: "África do Sul", "BE-FR": "Bélgica / França", PT: "Portugal", CA: "Canadá", HR: "Croácia", AU: "Austrália", RU: "Rússia", IE: "Irlanda", "AF-C": "África Central", TR: "Turquia", MG: "Madagáscar" };
/** Age-like value after a preposition: «até aos 12 meses», «até ao 1 ano», «a partir dos 10 anos». */
const art = (t: string, sing: string, pl: string) => (/^1[\s  ]/.test(t) ? sing : pl);

const pt: RegistryCopy = {
  mistakes: {
    title: (breed) => `Erros comuns de quem tem ${um(breed)}`,
    intro: "Pequenos hábitos que causam problemas maiores. Cada ponto vem das fontes desta raça.",
    exercise: "Pouco exercício diário",
    exerciseText: (amount) => `Exercício necessário: ${amount}. Planeia-o para todos os dias, não só para o fim de semana.`,
    coat: "Descuidar a pelagem",
    coatText: (brushing, shedding) => `Escovagem: ${brushing}.${shedding ? ` ${shedding.charAt(0).toUpperCase()}${shedding.slice(1)}.` : ""}`,
    weight: "Guloseimas a mais e refeições grandes demais",
    heat: "Passeios com calor",
    growth: "Esquecer que o cachorro ainda está a crescer",
    growthText: (growthEnd) => `Atinge o tamanho adulto: ${growthEnd}. Até lá, planeia o exercício e a alimentação a pensar num animal jovem que ainda está a crescer, e pergunta ao teu veterinário o que é adequado para o teu.`,
    mind: "Pouca estimulação mental",
    health: "Ignorar os problemas de saúde conhecidos da raça",
    practise: "No PetPrep, uma criança pratica exatamente estes hábitos – passos, refeições, cuidados – antes de o animal de estimação verdadeiro chegar a casa.",
  },
  hub: {
    title: "Conhece o animal de estimação antes de ele chegar a casa.",
    intro:
      "Do que cada espécie e cada raça do PetPrep precisa realmente – segundo clubes de canicultura, registos felinos, organizações veterinárias e estudos, com a ligação para cada fonte. E ainda as regras que o PetPrep usa para os simular.",
    breedCount: (n) => `${n} ${s(n, "raça", "raças")} no registo`,
    open: "Ver raças",
    openA11y: (many) => `Ver raças: ${lc(many)}`,
    freePlan: (name, activity) => `Plano gratuito: ${lc(name)} (${activity} em adulto). Não tem página de raça.`,
    otherSpecies: "Estão previstas mais espécies.",
    methodTitle: "Como construímos este registo",
    method: [
      "Cada dado vem de uma fonte identificada – clubes de canicultura, registos felinos, organizações e associações veterinárias e estudos revistos por pares – e tem ligação para ela. Os estalões das raças são resumidos com palavras nossas.",
      "Valores que nenhuma fonte confirma nunca são apresentados como factos. Quando o PetPrep tem de escolher um número para o jogo, ele aparece apenas em «Como o PetPrep o simula», identificado como regra do jogo.",
      "Os mesmos dados fazem funcionar a aplicação: as etiquetas, o número de refeições, os objetivos de passos e as sessões de brincadeira destas páginas são os que o animal de estimação do jogo usa na aplicação.",
      "Este registo não é aconselhamento veterinário. A informação de saúde serve apenas de orientação e não foi revista por um veterinário.",
    ],
  },
  speciesStatus: { available: "Na aplicação", coming_soon: "Em breve na aplicação", info_only: "Apenas informativo" },
  availability: {
    in_app: { label: "Na aplicação", text: "Disponível no Desafio PetPrep de 12 semanas (raça paga)." },
    coming_soon: { label: "Em breve na aplicação", text: "Criada e testada; chega com uma próxima versão da aplicação." },
    info_only: { label: "Apenas informativo", text: "Está no registo a título informativo; por agora não a podes adotar na aplicação." },
  },
  catalogue: {
    eyebrow: "Registo de animais",
    title: (many) => `${many}: raças no registo`,
    lead: (many, count) =>
      `${count} ${s(count, "raça", "raças")} de ${lc(many)} com necessidades documentadas por fontes, para quem são adequadas e como o PetPrep as simula. Pesquisa, filtra e compara até três.`,
    metaTitle: (many) => `${many}: registo de raças com fontes | PetPrep`,
    metaDescription: (many) =>
      `Pesquisa e compara raças de ${lc(many)} por necessidades, tamanho e para quem são adequadas. Cada dado tem ligação para a sua fonte; e ainda as regras que o PetPrep usa para simular cada raça.`,
    searchLabel: "Pesquisar raças",
    searchPlaceholder: "Nome, p. ex. labrador",
    filtersTitle: "Filtros",
    any: "Qualquer",
    availabilityLabel: "No PetPrep",
    sortLabel: "Ordenar",
    sort: { recommended: "Primeiro as da aplicação", az: "A–Z", size: "Tamanho (do pequeno ao grande)" },
    clear: "Limpar tudo",
    results: (total) => `{n} de ${total} ${s(total, "raça", "raças")}`,
    none: "Nenhuma raça corresponde. Experimenta com menos filtros.",
    loading: "A carregar a pesquisa…",
    page: "Página {n} de {total}",
    prev: "Anterior",
    next: "Seguinte",
    compareAdd: "Comparar: {name}",
    compareBar: "{n} de {max} selecionadas para comparar",
    compareGo: "Comparar",
    compareMax: "Podes comparar até {max} raças.",
    azTitle: "Todas as raças de A a Z",
    azIntro: "Todas as raças do registo, por ordem alfabética.",
    freePlanTitle: "Plano gratuito",
    guideTitle: "Como escolher uma raça",
    guide: () => [
      "Começa pelo que a tua família pode dar todos os dias: tempo para o exercício e a higiene, e espaço. A página de cada raça mostra estas necessidades num relance, com a fonte de cada valor; quando as fontes divergem, são mostrados todos os valores.",
      "Quando uma raça tem uma classe de tamanho (nos cães: toy, pequeno, médio, médio a grande, grande ou gigante), é a classe indicada pela fonte citada – normalmente um clube de canicultura – e os pesos são os intervalos que as fontes indicam, não estimativas nossas.",
      "Etiquetas como «Adequado para: uma família ativa» são as mesmas da aplicação e cada uma é confirmada por fontes. Os números em «Como o PetPrep o simula» são regras do jogo do PetPrep, não instruções de cuidados. [Como construímos o registo](page:about#methodology)",
    ],
  },
  compare: {
    title: (many) => `Comparar raças de ${lc(many)}`,
    metaTitle: (many) => `Comparar raças de ${lc(many)} | Registo PetPrep`,
    intro: "As principais necessidades lado a lado, das mesmas fontes das páginas de raça.",
    pick: "Escolhe duas ou três raças no catálogo para as comparar.",
    back: "Voltar ao catálogo",
    remove: "Remover: {name}",
    note: "Os valores são apresentados tal como a fonte citada os indica. Quando as fontes divergem, a página da raça mostra todos.",
    availabilityRow: "No PetPrep",
    activityRow: "Objetivo diário de um adulto no PetPrep (regra do jogo)",
  },
  facets: {
    size: { label: "Tamanho", values: { toy: "Toy", small: "Pequeno", small_medium: "Pequeno a médio", medium: "Médio", medium_large: "Médio a grande", large: "Grande", giant: "Gigante" } },
    exercise: { label: "Exercício diário", values: { under_1h: "Até 1 hora", h1_2: "1–2 horas", over_2h: "Mais de 2 horas" }, line: (v) => `${lc(v)} por dia` },
    grooming: { label: "Escovagem", values: { weekly: "Uma vez por semana", several_weekly: "Várias vezes por semana", daily: "Todos os dias", other: "Outra frequência" }, line: (v) => `escovagem: ${lc(v)}` },
  },
  groups: {
    exercise: "Exercício",
    play: "Brincadeira",
    litter: "Caixa de areia",
    scratching: "Arranhar",
    grooming: "Pelagem e higiene",
    feeding: "Refeições",
    water: "Água",
    lifespan: "Esperança de vida",
    stages: "Fases da vida",
    size: "Tamanho e peso",
    training: "Treino",
  },
  fields: {
    size: "Tamanho",
    height: "Altura ao garrote",
    weight: "Peso em adulto",
    growth_end: "Atinge o tamanho adulto",
    lifespan: "Esperança de vida",
    exercise: "Exercício diário",
    coat: "Pelagem",
    grooming_frequency: "Escovagem",
    grooming_level: "Necessidade de cuidados com a pelagem",
    shedding: "Queda de pelo",
    litter_scoop: "Retirar os dejetos da caixa de areia",
    litter_full_change: "Mudar toda a areia",
    litter_pee: "Urina (adulto)",
    litter_poo: "Defeca (adulto)",
    water_need: "Necessidade de água",
    sleep: "Sono (adulto)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 semanas",
    puppy_3_6_months: "3–6 meses",
    puppy_6_12_months: "6–12 meses",
    kitten_6_12_weeks: "6–12 semanas",
    kitten_3_6_months: "3–6 meses",
    kitten_6_12_months: "6–12 meses",
    puppy: "Cachorro",
    kitten: "Gatinho",
    young_adult: "Adulto jovem",
    mature_adult: "Adulto maduro",
    adult: "Adulto",
    senior: "Sénior",
  },
  categories: {
    size: { toy: "toy", small: "pequeno", small_medium: "pequeno a médio", medium: "médio", medium_large: "médio a grande", large: "grande", giant: "gigante" },
    coat: { moderately_long: "moderadamente comprido", smooth: "liso (curto)", short: "curto", medium: "de comprimento médio", short_long: "curto ou comprido (duas variedades de pelo)", long: "comprido" },
    grooming_frequency: { at_least_once_a_week: "pelo menos uma vez por semana", at_least_once_or_twice_a_week: "pelo menos uma ou duas vezes por semana", once_a_week: "uma vez por semana", more_than_once_a_week: "mais de uma vez por semana", daily: "diariamente", every_day: "todos os dias" },
    grooming_level: { moderate: "moderada", high: "elevada", low: "baixa" },
    shedding: { yes: "perde pelo", no: "não perde pelo (o que não significa que seja hipoalergénico)", high: "perde muito pelo", moderate: "perde pelo moderadamente", low: "perde pouco pelo", minimal: "quase não perde pelo" },
  },
  statements: {
    food_motivated: () => "Muito motivado pela comida: ajuda no treino, mas atenção às porções.",
    coren_rank: (v) => `${String(v)}.º lugar na classificação de Stanley Coren da inteligência de trabalho e obediência.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Estalão FCI n.º ${x.number}, grupo ${x.group} (${fciGroups[x.group] ?? "—"}); origem: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Brincadeira: ${f.num(x.sessions[0])}–${f.num(x.sessions[1])} sessões de ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} minutos por dia.`;
    },
    kittens_play_more: () => "Os gatinhos precisam de brincar mais vezes.",
    scratching_natural: () => "Arranhar é natural e necessário: dá-lhe um arranhador e nunca o castigues por isso.",
    water_fresh: () => "Água fresca sempre disponível; lava e enche a taça todos os dias.",
    grooming_sources_differ: () => "As fontes divergem quanto à frequência da escovagem: de todos os dias a uma vez por semana.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediana: ${t}`,
    more_than: (t) => `mais de ${t}`,
    less_than: (t) => `menos de ${t}`,
    at_least: (t) => `pelo menos ${t}`,
    up_to: (t) => `até ${t}`,
    ideal: (t) => `ideal (estalão da raça): ${t}`,
    mean: (t) => `média medida: ${t}`,
    about: (t) => `cerca de ${t}`,
    until: (t) => `${art(t, "até ao", "até aos")} ${t}`,
    until_about: (t) => `${art(t, "até cerca do", "até cerca dos")} ${t}`,
    span: (t) => t,
    from: (t) => `${art(t, "a partir do", "a partir dos")} ${t}`,
    last: (t) => {
      // «os últimos 25% …», «os últimos 6 meses», «as últimas 2 semanas», «o último mês».
      if (/%/.test(t)) return `os últimos ${t}`;
      const m = t.match(/^([\d,.–-]+)[\s  ](.+)$/);
      if (!m) return `os últimos ${t}`;
      const fem = /^(hora|semana)/.test(m[2]);
      if (m[1] === "1") return `${fem ? "a última" : "o último"} ${m[2]}`;
      return `${fem ? "as últimas" : "os últimos"} ${m[1]} ${m[2]}`;
    },
    every: (t) => (/^1[\s  ]dia$/.test(t) ? "todos os dias" : /^1[\s  ]/.test(t) ? `uma vez por ${t.replace(/^1[\s  ]/, "")}` : `a cada ${t}`),
    expectancy: (t) => `esperança de vida à nascença: ${t}`,
    smaller_meals: (t) => `${t}, em porções mais pequenas`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${s(n, "ano", "anos")}`,
    months: (t, n) => `${t} ${s(n, "mês", "meses")}`,
    days: (t, n) => `${t} ${s(n, "dia", "dias")}`,
    min_per_day: (t, n, f) => (n % 60 === 0 ? `${f.num(n / 60)} ${s(n / 60, "hora", "horas")} por dia` : `${t} ${s(n, "minuto", "minutos")} por dia`),
    meals_per_day: (t, n) => `${t} ${s(n, "refeição", "refeições")} por dia`,
    times_per_day: (t, n) => `${t} ${s(n, "vez", "vezes")} por dia`,
    hours_per_day: (t, n) => `${t} ${s(n, "hora", "horas")} por dia`,
    ml_per_kg_day: (t) => `${t} ml por kg de peso corporal por dia`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)}% da esperança de vida prevista`,
  },
  males: "machos",
  females: "fêmeas",
  or: " ou ",
  notes: { size_class_guidance: "orientação para a sua classe de tamanho" },
  stageLabels: {
    dog: { puppy: "Cachorro", young: "Cão jovem", adult: "Adulto", senior: "Sénior" },
    cat: { puppy: "Gatinho", young: "Gato jovem", adult: "Gato maduro", senior: "Sénior" },
  },
  activity: {
    steps: (n, raw) => `${n} ${s(raw, "passo", "passos")}`,
    steps_range: (from, to) => `${from} → ${to} passos`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} passos por cada mês de idade (${first} à chegada), até ${cap} a partir do ${capMonth}.º mês`,
    play_sessions: (n) => `${n} ${s(n, "sessão", "sessões")} de brincadeira`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Objetivo de passos = minutos de exercício diário × ${p.per_minute} passos: um adulto precisa de ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${s(p.minutes / 60, "hora", "horas")}` : `${p.minutes} ${s(p.minutes, "minuto", "minutos")}`}, ou seja, ${f.num(p.steps)} passos por dia.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Aprende os comandos mais devagar do que o cão sem raça definida do plano gratuito (a ${f.num(p.multiplier)} vezes a velocidade dele).`
        : p.multiplier === 1
          ? "Aprende os comandos à mesma velocidade do cão sem raça definida do plano gratuito."
          : `Aprende os comandos ${f.num(p.multiplier)} vezes mais depressa do que o cão sem raça definida do plano gratuito.`,
    senior_share: (p, f) => `Torna-se sénior no ${p.months}.º mês (${f.num(p.months / 12, 1)} ${s(p.months / 12, "ano", "anos")}): o último quarto da esperança de vida prevista da raça.`,
    walk_sensor: () => "Os passeios contam passos reais do Apple Health ou do Health Connect (com autorização, só leitura) e do sensor de movimento do telemóvel, sem GPS.",
    play_instead_of_steps: (p, f) =>
      `Sem passeios: um gato adulto precisa de ${p.sessions} ${s(p.sessions, "sessão", "sessões")} de brincadeira por dia com uma cana de brincar, com pelo menos ${f.num(p.gap_minutes / 60)} ${s(p.gap_minutes / 60, "hora", "horas")} de intervalo entre elas.`,
    litter_rule: (p) =>
      `Caixa de areia: um gato adulto usa-a ${p.uses} ${s(p.uses, "vez", "vezes")} por dia; de cada vez, é limpa ${p.scoop_hours === 1 ? "no espaço de uma hora" : `no espaço de ${p.scoop_hours} horas`} (fora das horas de silêncio) e toda a areia é mudada ${p.change_days === 1 ? "todos os dias" : `a cada ${p.change_days} dias`}.`,
    scratching_after_missed_play: () => "Depois de um dia com pouca brincadeira, o gato arranha alguma coisa uma vez; a criança leva-o ao arranhador.",
    grooming_rule: (p) => (p.per_week === 1 ? "Escovagem uma vez por semana." : p.per_week === 2 ? "Escovagem duas vezes por semana." : `Escovagem ${p.per_week} vezes por semana.`),
    no_walk_in_heat: (p) =>
      `No verão (de junho a agosto; de dezembro a fevereiro no hemisfério sul), os ecrãs da criança e do passeio mostram um lembrete discreto entre as ${hhmm(p.from)} e as ${hhmm(p.to)} (hora local da família): nada de passeios com calor. Sem dados meteorológicos e sem penalização: os passos contam na mesma.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "limpar as pregas da pele",
        tooth_brushing: "escovar os dentes",
        ear_cleaning: "verificar e limpar as orelhas",
        nail_trim: "cortar as unhas",
        bath: "dar banho",
        groomer_visit: "ir ao tosquiador",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const when =
        q.period_days === 7 && q.times === 7
          ? "todos os dias"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "uma vez por semana"
              : `a cada ${q.period_days / 7} semanas`
            : q.period_days === 7
              ? `${q.times} ${s(q.times, "vez", "vezes")} por semana`
              : q.times === 1
                ? `a cada ${q.period_days} dias`
                : `${q.times} ${s(q.times, "vez", "vezes")} a cada ${q.period_days} dias`;
      const who = q.actor === "parent" ? "um lembrete para o pai ou a mãe" : "uma tarefa para a criança";
      return `Cuidados: ${what}, ${when} (${who}).`;
    },
  },
  checklist: {
    items: {
      see_mother: "Vê o cachorro com a mãe, no sítio onde nasceu.",
      min_age_puppy: "O cachorro não deve deixar a mãe antes das 8 semanas de idade.",
      pedigree_fci: "Pede o pedigree. Segundo as regras da FCI, o pedigree só pode ser emitido quando a ascendência está correta.",
      parents_health_tests: "Pede para ver os resultados dos testes de saúde de ambos os progenitores. Os testes que importam dependem da raça.",
      breed_club_rules: "Os clubes de canicultura nacionais podem definir regras de criação que vão além das da FCI: pergunta ao clube da raça que testes os progenitores precisam de ter.",
      written_contract: "Pede um contrato de venda escrito que registe a origem e o estado de saúde do cachorro.",
      kitten_see_mother: "Vê o gatinho com a mãe, no sítio onde vivem os gatinhos.",
      kitten_min_age: "Segundo as regras de pedigree da FIFe, um gatinho não vai para uma nova casa antes das 14 semanas de idade.",
      kitten_vaccination: "O gatinho tem a vacinação completa (panleucopenia, calicivírus, herpesvírus) e vem com o boletim de vacinas.",
      kitten_pedigree: "Um gatinho com pedigree vem com um certificado de pedigree que mostra pelo menos três gerações.",
      kitten_parents_tests: "Pergunta se algum dos progenitores teve problemas de saúde que o gatinho possa herdar.",
    },
    tests: {
      dna_poag_pll: "Teste de ADN para glaucoma primário de ângulo aberto e luxação primária do cristalino (POAG/PLL), doenças oculares hereditárias que podem levar à cegueira",
      hip_scheme: "Rastreio radiográfico da displasia da anca (Reino Unido: programa BVA/KC)",
      elbow_scheme: "Rastreio radiográfico da displasia do cotovelo (Reino Unido: programa BVA/KC)",
      eye_scheme: "Exame dos olhos por um veterinário especialista em oftalmologia (Reino Unido: programa BVA/KC/ISDS; em algumas raças com gonioscopia)",
      heart_scheme: "Rastreio cardíaco da doença da válvula mitral",
      boas_grading: "Teste respiratório da síndrome obstrutiva das vias aéreas dos braquicéfalos (avaliação BOAS)",
      ivdd_screening: "Rastreio da coluna para a doença do disco intervertebral (IVDD)",
      hearing_baer: "Teste de audição para a surdez (BAER)",
      cm_sm_mri: "Rastreio por ressonância magnética da malformação tipo Chiari e da siringomielia (Reino Unido: programa BVA/KC CM/SM)",
      inbreeding_coi: "Diversidade genética: verifica o coeficiente de consanguinidade",
      dna_prcd_pra: "Teste de ADN da atrofia progressiva da retina (prcd-PRA)",
      dna_rcd4_pra: "Teste de ADN da atrofia progressiva da retina (rcd4)",
      dna_gr_pra2: "Teste de ADN da atrofia progressiva da retina (GR_PRA2)",
      dna_cnm: "Teste de ADN da miopatia centronuclear (CNM)",
      dna_eic: "Teste de ADN do colapso induzido pelo exercício (EIC)",
      dna_hnpk: "Teste de ADN da paraqueratose nasal hereditária (HNPK)",
      dna_sd2: "Teste de ADN da displasia esquelética 2 (SD2)",
      dna_mcd: "Teste de ADN da distrofia macular da córnea (MCD)",
      dna_stgd: "Teste de ADN da doença de Stargardt (STGD)",
      dna_cc_de: "Teste de ADN da síndrome do pelo encaracolado e do olho seco (CC/DE)",
      dna_ef: "Teste de ADN das quedas episódicas (EF)",
      dna_cea: "Teste de ADN da anomalia do olho do collie (CEA/CH)",
      dna_cl: "Teste de ADN da lipofuscinose ceroide (CL)",
      dna_igs: "Teste de ADN da síndrome de Imerslund-Gräsbeck (IGS)",
      dna_mdr1: "Teste de ADN da sensibilidade a múltiplos fármacos (MDR1)",
      dna_tns: "Teste de ADN da síndrome dos neutrófilos aprisionados (TNS)",
      dna_sn: "Teste de ADN da neuropatia sensorial (SN)",
      dna_ggd: "Teste de ADN da goniodisgenesia e do risco de glaucoma (GGD)",
      dna_raines: "Teste de ADN da síndrome de Raine",
      dna_dm: "Teste de ADN da mielopatia degenerativa (DM)",
      dna_de: "Teste de ADN da encefalopatia degenerativa (DE)",
      dna_jadd: "Teste de ADN da doença de Addison juvenil (JADD)",
      dermoid_sinus_scheme: "Controlo dos cachorros para o seio dermoide (programa do clube da raça)",
      dna_jme: "Teste de ADN da epilepsia mioclónica juvenil (JME)",
      dna_je: "Teste de ADN da epilepsia juvenil (JE)",
      dna_lsd: "Teste de ADN da doença de armazenamento lisossomal (LSD)",
      dna_ampn: "Teste de ADN da polineuropatia do malamute do Alasca (AMPN)",
      dna_fanconi: "Teste de ADN da síndrome de Fanconi (uma doença renal)",
      dna_pra_bj1: "Teste de ADN da atrofia progressiva da retina do basenji (PRA-BJ1)",
      thyroid_scheme: "Análises à tiroide dos progenitores",
      dna_pap_pra1: "Teste de ADN da atrofia progressiva da retina do papillon (Pap-PRA1)",
      dna_nad: "Teste de ADN da distrofia neuroaxonal (NAD)",
      dna_eopra: "Teste de ADN da atrofia progressiva da retina de início precoce (EOPRA)",
      dna_cu: "Teste de ADN da cistinúria (CU), uma doença hereditária que provoca cálculos nos rins e na bexiga",
      heart_echo_scheme: "Rastreio cardíaco com ecografia Doppler a cores (programa do clube da raça)",
      cardiac_exam: "Exame cardíaco dos progenitores (recomendação do clube da raça)",
      dna_rd_osd: "Teste de ADN da displasia da retina / displasia oculoesquelética (RD/OSD)",
      dna_xlpra1: "Teste de ADN da atrofia progressiva da retina ligada ao cromossoma X (XLPRA1)",
      dna_cmo: "Teste da osteopatia craniomandibular (CMO), uma doença óssea hereditária da mandíbula",
      dna_hsf4: "Teste de ADN das cataratas hereditárias (HSF4)",
      dna_lafora: "Teste de ADN da doença de Lafora",
      dna_nccd: "Teste de ADN da degenerescência cortical cerebelosa neonatal (NCCD)",
      dna_fviid: "Teste de ADN da deficiência do fator VII (FVIID)",
      dna_mls: "Teste de ADN da síndrome de Musladin-Lueke (MLS)",
      dna_vwd1: "Teste de ADN da doença de von Willebrand tipo 1 (vWD1)",
      dna_mac: "Teste de ADN da predisposição para a infeção pelo complexo Mycobacterium avium (MAC)",
      dna_imgd: "Teste de ADN da miopatia hereditária do dogue alemão (IMGD), uma doença que provoca perda de massa muscular",
      dna_poag: "Teste de ADN do glaucoma primário de ângulo aberto (POAG), uma doença hereditária dos olhos que pode levar à cegueira",
      dna_aon: "Teste de ADN da neuropatia de início na idade adulta (AON), uma doença hereditária dos nervos",
      dna_fn: "Teste de ADN da nefropatia familiar (FN), uma doença renal hereditária",
      patella_scheme: "Controlo das rótulas para a luxação da rótula antes da reprodução",
      kidney_scheme: "Ecografia dos rins para detetar um rim em falta ou malformado (recomendação do clube da raça)",
      kidney_upc_scheme: "Análise de urina (rácio proteína/creatinina) para doenças renais (recomendação do clube da raça)",
      dna_gld: "Teste de ADN da leucodistrofia de células globoides (GLD), uma doença hereditária dos nervos",
      liver_shunt_scheme: "Controlo do fígado para um shunt portossistémico ou displasia microvascular (recomendação do clube da raça)",
      breed_health_scheme: "O programa de saúde do clube da raça para os progenitores",
      hemivertebrae_scheme: "Radiografia da coluna dos progenitores para as hemivértebras (vértebras malformadas), depois dos 12 meses de idade",
      dna_hcm_mc: "Teste de ADN da cardiomiopatia hipertrófica (MC HCM)",
      dna_sma: "Teste de ADN da atrofia muscular espinal (SMA)",
      dna_pk_def: "Teste de ADN da deficiência de piruvato quinase (PK def)",
      hcm_negative: "Os gatos reprodutores devem ter resultado negativo para a HCM (doença cardíaca: cardiomiopatia hipertrófica)",
      dna_gsd4: "Teste de ADN da glicogenose tipo IV (GSD IV)",
      dna_pra_b: "Teste de ADN da atrofia progressiva da retina do bengal (PRA-b)",
      dna_jlpp: "Teste de ADN da paralisia laríngea juvenil e polineuropatia (JLPP)",
      dna_lemp2: "Teste de ADN da leucoencefalomielopatia (LEMP-2)",
      dna_lemp: "Teste de ADN da leucoencefalomielopatia (LEMP)",
      dna_lpn1: "Teste de ADN da polineuropatia do leonberger (LPN1)",
      dna_lpn2: "Teste de ADN da polineuropatia do leonberger (LPN2)",
      dna_lppn3: "Teste de ADN da paralisia laríngea e polineuropatia (LPPN3)",
      dna_huu: "Teste de ADN da hiperuricosúria (HUU)",
      dna_dcm: "Teste de ADN da cardiomiopatia dilatada (DCM), uma doença do músculo cardíaco",
      dna_pra5: "Teste de ADN da atrofia progressiva da retina (PRA5)",
      dna_dings2: "Teste de ADN da doença do dobermann dançante (dancing Dobermann disease, DINGS2), uma doença dos nervos e dos músculos",
      dna_slem: "Teste de ADN para a leucoencefalomielopatia espongiforme (SLEM, «síndrome do cachorro trémulo»), uma doença do cérebro e da medula espinal em cachorros jovens",
      dna_ams: "Teste de ADN da síndrome de mutilação acral (AMS), uma doença nervosa que retira a sensibilidade à dor nas patas",
      dna_dams: "Teste de ADN da síndrome de anemia diseritropoiética e miopatia (DAMS), uma doença do sangue e dos músculos",
      dna_fuco: "Teste de ADN da fucosidose, uma doença hereditária do sistema nervoso",
      dna_pfk: "Teste de ADN da deficiência de fosfofrutoquinase (PFK), uma doença enzimática hereditária do sangue e dos músculos",
      dna_pra_cord1: "Teste de ADN da atrofia progressiva da retina (PRA cord1)",
      dna_bbs2_pra: "Teste de ADN da atrofia progressiva da retina (BBS2-PRA)",
      dna_cnga1_pra: "Teste de ADN da atrofia progressiva da retina (CNGA1-PRA)",
      dna_pra_rcd2: "Teste de ADN da atrofia progressiva da retina (PRA-rcd2)",
      dna_gm1: "Teste de ADN da gangliosidose GM1 (uma doença hereditária do sistema nervoso)",
      dna_gm2: "Teste de ADN da gangliosidose GM2 (uma doença hereditária do sistema nervoso)",
      dna_vwd3: "Teste de ADN da doença de von Willebrand tipo 3 (vWD3), uma doença hereditária da coagulação",
      dna_pra_rcd3: "Teste de ADN da atrofia progressiva da retina (PRA-rcd3)",
      dna_clad: "Teste de ADN da deficiência de adesão leucocitária canina (CLAD), uma doença imunitária hereditária",
      dna_ncl8: "Teste de ADN para lipofuscinose ceroide neuronal (NCL8), uma doença hereditária do sistema nervoso",
      dna_pra_rcd1: "Teste de ADN da atrofia progressiva da retina (rcd1)",
      dna_pra4: "Teste de ADN da atrofia progressiva da retina (PRA4)",
      dna_vwd2: "Teste de ADN da doença de von Willebrand tipo 2 (vWD2), uma doença hereditária da coagulação",
      dna_l2hga: "Teste de ADN da acidúria L-2-hidroxiglutárica (L-2-HGA), uma doença metabólica hereditária do sistema nervoso",
      dna_pll: "Teste de ADN da luxação primária do cristalino (PLL), uma doença hereditária dos olhos em que o cristalino sai do lugar",
      dna_loa: "Teste de ADN da ataxia de início tardio (LOA), uma doença hereditária que afeta o equilíbrio e a coordenação",
      dna_sca: "Teste de ADN da ataxia espinocerebelosa (SCA), uma doença hereditária do sistema nervoso",
    },
  },
  health: {
    shar_pei_fever: "Na raça pode ocorrer a febre familiar do shar pei: crises de febre alta com articulações dolorosas e inchadas e a face inchada; procura logo um veterinário.",
    weight_gain: "Engorda com facilidade: é preciso vigiar as porções e as guloseimas.",
    hip_elbow_dysplasia_eye_conditions: "Pode ter predisposição para displasia da anca e do cotovelo e para várias doenças hereditárias dos olhos.",
    cancer_risk: "As fontes descrevem um risco de cancro mais elevado nesta raça.",
    flat_face_breathing: "Raça de focinho achatado (braquicéfala): o focinho curto, as narinas estreitas e o excesso de tecido mole nas vias aéreas podem dificultar a respiração (síndrome obstrutiva das vias aéreas dos braquicéfalos, BOAS).",
    heat_stroke_risk: "Aquece depressa e corre mais risco de golpe de calor do que a maioria dos cães, sobretudo quando está calor.",
    skin_fold_ear_problems: "Tem tendência para inflamações dos ouvidos e infeções nas pregas da pele; as pregas devem ser mantidas limpas e secas.",
    ear_infections_long_ears: "As orelhas compridas podem favorecer infeções dos ouvidos: no canal auditivo podem acumular-se bactérias.",
    collie_eye_pra: "Na raça ocorrem doenças hereditárias dos olhos: a anomalia do olho do collie, uma alteração da parte de trás do olho, e a atrofia progressiva da retina, que pode levar lentamente à cegueira; existem exames oftalmológicos e testes de ADN.",
    merle_colour_risk: "O merle não é uma cor prevista no estalão da raça; nesta raça implica um risco mais elevado de problemas de audição e de visão.",
    hind_leg_conformation: "O Royal Kennel Club aponta a forma dos membros posteriores e a maneira de o cão se mover como um ponto de preocupação nesta raça; um cão saudável tem o dorso nivelado e membros posteriores moderados.",
    hip_elbow_dysplasia: "Pode ter predisposição para displasia da anca e do cotovelo; recomenda-se aos criadores que avaliem as ancas e os cotovelos dos progenitores antes da reprodução.",
    degenerative_myelopathy: "Na raça ocorre a mielopatia degenerativa, uma doença da medula espinal que enfraquece lentamente as patas traseiras; existe um teste de ADN.",
    exercise_induced_collapse: "Na raça ocorre o colapso induzido pelo exercício, uma doença neuromuscular hereditária que pode fazer o cão colapsar depois de um esforço intenso.",
    heart_valve_disease: "A doença cardíaca causada pelo enfraquecimento da válvula mitral é um problema importante nesta raça; muitas vezes nota-se primeiro como um sopro no coração, e os cães destinados à reprodução devem fazer antes uma avaliação cardíaca.",
    chiari_syringomyelia: "Na raça ocorrem a malformação tipo Chiari e a siringomielia, uma condição dolorosa com cavidades cheias de líquido na medula espinal perto do cérebro, ligada à forma do crânio; diagnostica-se por ressonância magnética.",
    eye_conditions: "Na raça ocorrem doenças hereditárias dos olhos, como as cataratas, e os olhos salientes ou irritados são um ponto de preocupação; existem exames oftalmológicos e testes de ADN.",
    epilepsy: "Na raça ocorre a epilepsia, uma doença do cérebro que pode provocar convulsões.",
    storage_disease: "Uma doença hereditária de armazenamento do sistema nervoso pode afetar cães jovens da raça; um teste de ADN dos progenitores permite aos criadores evitá-la.",
    chondrodysplasia: "Na raça ocorre a condrodisplasia, uma perturbação do crescimento da cartilagem e dos ossos; os cachorros podem ser controlados com uma radiografia.",
    polyneuropathy: "Na raça ocorre uma doença hereditária dos nervos (polineuropatia); um teste de ADN dos progenitores permite aos criadores evitá-la.",
    fanconi_syndrome: "Na raça ocorre a síndrome de Fanconi, uma doença renal hereditária que faz passar açúcar para a urina; um teste de ADN dos progenitores permite aos criadores evitá-la.",
    pyruvate_kinase_deficiency: "Na raça pode ocorrer a deficiência de piruvato quinase, um defeito hereditário dos glóbulos vermelhos que provoca anemia.",
    back_disc_disease: "Na raça ocorre a doença do disco intervertebral, um problema dos discos que amortecem as vértebras da coluna.",
    pra_eye_disease: "Na raça ocorre a atrofia progressiva da retina, uma doença hereditária dos olhos que pode levar lentamente à cegueira; existem testes de ADN e exames oftalmológicos.",
    hip_dysplasia: "Na raça ocorre a displasia da anca, uma articulação da anca mal desenvolvida que pode levar a artrite; recomenda-se aos criadores que avaliem as ancas dos progenitores.",
    bloat_gdv: "Na raça pode ocorrer a dilatação-torção gástrica, em que o estômago se torce: é uma emergência que exige ir de imediato ao veterinário.",
    inherited_eye_disease: "Na raça ocorrem doenças hereditárias dos olhos, como a anomalia do olho do collie, as cataratas e a atrofia progressiva da retina.",
    drug_sensitivity_mdr1: "Alguns cães da raça têm uma sensibilidade hereditária a certos medicamentos (sensibilidade a múltiplos fármacos, MDR1): se isso se aplicar ao teu cão, diz ao veterinário.",
    merle_to_merle_breeding: "Nesta raça o merle é uma cor prevista no estalão; dois cães merle não devem ser cruzados entre si, porque os cachorros correm risco de problemas de visão e de audição: o Royal Kennel Club não os regista.",
    kneecap_luxation: "Na raça ocorre a luxação da rótula, em que a rótula sai temporariamente do lugar.",
    pra_and_eyelashes: "Na raça ocorrem problemas nos olhos: a atrofia progressiva da retina, que pode levar lentamente à cegueira, e pestanas a mais que roçam no olho (distiquíase); recomenda-se aos criadores que examinem os olhos dos progenitores.",
    liver_shunt: "Na raça pode ocorrer um shunt portossistémico (hepático), em que o sangue contorna o fígado.",
    skin_allergies: "As alergias de pele são um problema conhecido na raça; o Royal Kennel Club pede aos juízes que procurem sinais de inflamação da pele, e recomenda-se aos donos que perguntem ao veterinário antes de escolherem um champô.",
    westie_lung: "Na raça pode ocorrer uma doença pulmonar conhecida como «pulmão do westie» (fibrose pulmonar idiopática), que dificulta a respiração, sobretudo em cães mais velhos.",
    jaw_bone_disorder: "Na raça pode ocorrer uma doença óssea hereditária da mandíbula.",
    dry_eye: "Na raça pode ocorrer o olho seco: os olhos não produzem lágrimas suficientes e ficam secos e doridos.",
    heart_hcm: "Na raça ocorre a cardiomiopatia hipertrófica (HCM), uma doença cardíaca hereditária em que o músculo do coração fica mais espesso.",
    dental_weight_nail_care: "Um grande estudo britânico aponta as doenças dentárias, o excesso de peso e as unhas demasiado compridas entre os problemas mais comuns da raça, por isso recomenda-se aos donos que cuidem com regularidade dos dentes, do peso e das unhas.",
    dental_weight_care: "A PetMD aponta as doenças dentárias e o excesso de peso entre os problemas a vigiar, por isso recomenda-se aos donos que escovem regularmente os dentes do gato e lhe controlem o peso.",
    gsd_iv: "Na raça ocorre a glicogenose tipo IV (GSD IV), uma doença hereditária que afeta os gatinhos; um teste de ADN dos progenitores permite aos criadores evitá-la.",
    hip_dysplasia_weight: "Na raça pode ocorrer a displasia da anca, uma articulação da anca mal desenvolvida; a PetMD aconselha a manter o gato com um peso saudável para proteger as articulações.",
    laryngeal_paralysis_polyneuropathy: "Na raça ocorre a paralisia laríngea juvenil e polineuropatia (JLPP), uma doença hereditária dos nervos que afeta a laringe e as patas traseiras; um teste de ADN dos progenitores permite aos criadores evitá-la.",
    heart_sas: "Na raça ocorre a estenose subaórtica, um estreitamento logo abaixo de uma válvula cardíaca que pode provocar um sopro; os cães destinados à reprodução devem fazer antes um controlo do coração.",
    inherited_eye_defects: "Na raça ocorrem doenças hereditárias dos olhos, como a displasia da retina e a membrana pupilar persistente; existem exames oftalmológicos.",
    skin_fold_infections: "As pregas da pele, sobretudo no focinho, podem reter humidade e infetar (piodermite das pregas cutâneas); as rugas do focinho devem ser limpas todos os dias.",
    eyelid_eye_problems: "Na raça ocorrem problemas nas pálpebras (pálpebras viradas para dentro ou para fora), olho seco e «olho de cereja»; existem exames oftalmológicos.",
    hip_elbow_joint_disease: "Na raça ocorrem a displasia da anca e do cotovelo, em que as articulações não se desenvolvem corretamente, o que pode levar a doenças articulares.",
    hip_dysplasia_arthritis: "Na raça ocorre a displasia da anca, uma articulação da anca laxa e mal desenvolvida que, com o tempo, pode levar a artrite.",
    bleeding_disorder_vwd: "Na raça ocorre a doença de von Willebrand, um problema hereditário da coagulação do sangue que pode provocar hemorragias excessivas.",
    heart_muscle_disease: "Na raça pode ocorrer a cardiomiopatia, um aumento do coração causado pelo enfraquecimento do músculo cardíaco.",
    itchy_skin_allergy: "Na raça podem ocorrer alergias de pele (atopia), que provocam comichão e pele irritada.",
    entropion_cherry_eye: "Na raça podem ocorrer pálpebras viradas para dentro (entrópion) e «olho de cereja», em que a terceira pálpebra fica saliente; o olho de cereja pode ser corrigido com cirurgia.",
    dental_disease_tooth_brushing: "Um grande estudo britânico aponta as doenças dentárias como de longe o problema mais comum da raça, e os dentes de leite que não caem também são frequentes, por isso recomenda-se aos donos que cuidem todos os dias dos dentes do cão, por exemplo escovando-os.",
    windpipe_collapse: "Na raça pode ocorrer o colapso da traqueia, em que a traqueia perde rigidez, o que pode provocar fraqueza e colapso.",
    eye_problems_pra_lens_dry_eye: "Na raça ocorrem problemas nos olhos, como a atrofia progressiva da retina, que pode levar lentamente à cegueira, a deslocação do cristalino (luxação do cristalino) e o olho seco.",
    cataracts_lens_luxation: "Na raça podem ocorrer problemas nos olhos, como as cataratas, que tornam o cristalino opaco, e a deslocação do cristalino (luxação do cristalino).",
    wobbler_syndrome: "Na raça pode ocorrer a síndrome de Wobbler, em que vértebras instáveis do pescoço comprimem a medula espinal e enfraquecem as patas traseiras.",
    eye_phpv: "Na raça pode ocorrer um defeito do olho presente desde o nascimento (vítreo primário hiperplásico persistente, PHPV); recomenda-se aos criadores que examinem os olhos dos progenitores.",
    certain_cancers: "Na raça podem ocorrer alguns tipos de cancro.",
    bare_skin_sun_cold: "A pele nua da variedade sem pelo tem de ser protegida do sol e do frio.",
    l2hga_nervous_system: "Na raça pode ocorrer a acidúria L-2-hidroxiglutárica (L-2-HGA), uma doença metabólica hereditária que afeta o sistema nervoso; existe um teste de ADN dos progenitores.",
    short_face_breathing: "Raça de focinho moderadamente curto: alguns cães com o focinho mais curto podem ter problemas respiratórios graves (síndrome obstrutiva das vias aéreas dos braquicéfalos, BOAS).",
    corneal_ulcers: "Problemas nos olhos, como úlceras da córnea, são mais prováveis por causa da forma do crânio e dos olhos salientes; existem exames oftalmológicos.",
    skin_folds_allergies: "Podem ocorrer problemas de pele, como alergias, verrugas, excrescências cutâneas e pregas do focinho irritadas (dermatite das pregas cutâneas); as pregas do focinho devem ser mantidas limpas e secas.",
    heart_cardiomyopathy_aortic_stenosis: "Na raça podem ocorrer problemas cardíacos, como a cardiomiopatia e a estenose aórtica.",
    dental_disease_care: "Um grande estudo britânico aponta as doenças dentárias como o problema mais comum da raça, e recomenda-se aos donos que deem prioridade aos cuidados com os dentes.",
    bladder_stones: "Na raça podem ocorrer cálculos na bexiga, agregados de minerais que se formam na bexiga e na urina.",
    deafness: "Na raça ocorre surdez de um ou dos dois ouvidos; a audição dos cachorros pode ser verificada com um teste BAER.",
    mitral_valve_disease: "Na raça ocorre a doença da válvula mitral, uma doença cardíaca em que uma válvula enfraquecida deixa o sangue refluir dentro do coração; um veterinário pode auscultar o coração dos cães antes de serem usados para reprodução.",
    eye_problems_pra_cataracts_dry_eye: "Na raça ocorrem problemas nos olhos, como a atrofia progressiva da retina, que pode levar lentamente à cegueira, as cataratas e o olho seco; existem exames oftalmológicos.",
    skin_comedo_allergy: "Podem ocorrer problemas de pele, como a síndrome comedónica do schnauzer (um tipo de inflamação dos folículos pilosos) e alergias de pele (atopia) que provocam comichão.",
    shorter_face_boas: "Raça braquicéfala (de focinho curto): o focinho mais curto pode provocar problemas respiratórios graves (síndrome obstrutiva das vias aéreas dos braquicéfalos, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Na raça ocorrem problemas nos olhos, como o olho seco, as cataratas, a atrofia progressiva da retina, que pode levar lentamente à cegueira, e o descolamento da retina.",
    hypothyroidism: "Na raça pode ocorrer uma tiroide pouco ativa (hipotiroidismo), que pode afetar o peso, a pele e o nível de energia.",
    open_fontanelle: "Na raça pode ocorrer uma fontanela aberta, um ponto mole do crânio que não fecha completamente.",
    collapsing_trachea: "Na raça pode ocorrer o colapso da traqueia, uma fraqueza da traqueia que pode provocar tosse e dificuldade em respirar.",
    gm1_gangliosidosis: "Na raça pode ocorrer a gangliosidose GM1, uma doença hereditária do sistema nervoso; um teste de ADN dos progenitores pode excluí-la.",
    addisons_disease: "Na raça pode ocorrer a doença de Addison, uma falta de hormonas produzidas pelas glândulas suprarrenais.",
    protein_losing_disease: "Na raça podem ocorrer doenças dos rins ou do intestino com perda de proteínas, que podem provocar diarreia e perda de peso.",
    diabetes_mellitus: "Na raça pode ocorrer a diabetes mellitus, em que o organismo não consegue regular corretamente o açúcar no sangue.",
    dental_disease_home_brushing: "Como muitos cães pequenos, a raça tem tendência para doenças dentárias, por isso aconselha-se escovar os dentes em casa com uma escova e uma pasta de dentes para cães.",
    dermoid_sinus: "Na raça pode ocorrer o seio dermoide, uma condição dolorosa em que um canal na pele do dorso está ligado à medula espinal; os clubes da raça têm um programa de controlo do seio dermoide para os cachorros.",
    cataracts: "Na raça podem ocorrer cataratas, que tornam opaco o cristalino do olho e podem levar à perda de visão.",
    pra_inherited_blindness: "Na raça pode ocorrer a atrofia progressiva da retina, uma doença hereditária dos olhos que pode levar lentamente à cegueira.",
    eyelids_turned: "Na raça podem ocorrer pálpebras viradas para dentro (entrópion) ou para fora (ectrópion); pergunta se os olhos dos progenitores foram examinados.",
    glaucoma_poag: "Na raça pode ocorrer o glaucoma primário de ângulo aberto, em que o líquido se acumula dentro do olho e provoca dor e, possivelmente, cegueira; existe um teste de ADN para os progenitores.",
    skin_fold_dermatitis: "A pele abundante forma pregas que podem ficar irritadas e infetar; devem ser verificadas todos os dias e mantidas limpas e secas.",
    skin_fold_care: "As pregas da pele do focinho podem ficar irritadas e infetar (dermatite das pregas); devem ser limpas e secas regularmente.",
    eyelid_problems: "Na raça podem ocorrer problemas nas pálpebras: pálpebras viradas para dentro (entrópion) ou para fora (ectrópion) e «olho de cereja», em que a terceira pálpebra fica saliente.",
    skin_allergy_face_folds: "Na raça podem ocorrer alergias de pele (atopia) que provocam comichão, e as pregas da pele do focinho devem ser limpas todos os dias.",
    skin_ear_allergies: "Na raça podem ocorrer alergias ambientais, que podem levar a infeções repetidas da pele ou dos ouvidos; a PetMD sugere limpar as orelhas uma vez por semana nos cães com alergias.",
    gum_disease_daily_brushing: "A raça tem tendência para doenças das gengivas (gengivite e doença periodontal), por isso a PetMD aconselha a escovar os dentes do cão todos os dias e a fazer um controlo dentário anual no veterinário.",
    pra_pk_def: "Na raça ocorrem duas doenças hereditárias: a atrofia progressiva da retina, uma doença dos olhos que pode levar à cegueira, e a deficiência de piruvato quinase, uma doença do sangue; os testes de ADN dos progenitores permitem aos criadores evitá-las.",
    windpipe_collapse_breathing: "Na raça pode ocorrer o colapso da traqueia, em que os anéis da traqueia cedem e dificultam a respiração.",
    eye_problems_pra_cataracts_entropion: "Na raça ocorrem problemas nos olhos, como a atrofia progressiva da retina, que pode levar lentamente à cegueira, as cataratas, que tornam o cristalino opaco, e pálpebras viradas para dentro (entrópion); existem exames oftalmológicos.",
    elbow_dysplasia_arthritis: "Na raça pode ocorrer a displasia do cotovelo, uma articulação do cotovelo mal desenvolvida que, com o tempo, pode levar a artrite.",
    entropion: "Na raça pode ocorrer o entrópion, em que as pálpebras se viram para dentro e irritam o olho; pergunta se os olhos dos progenitores foram examinados.",
    autoimmune_conditions: "Na raça podem ocorrer doenças autoimunes, em que o organismo reage contra si próprio.",
    ear_infections_prone: "A raça tem tendência para infeções dos ouvidos; dá muita atenção à higiene das orelhas.",
    familial_nephropathy: "Na raça ocorre uma doença renal hereditária (nefropatia familiar); existe um teste de ADN dos progenitores.",
    hereditary_nephritis: "Na raça ocorre uma doença renal hereditária (nefrite hereditária, também chamada glomerulopatia hereditária do samoiedo).",
    panosteitis: "Na raça pode ocorrer a panosteíte, uma inflamação dolorosa dos ossos longos que costuma afetar cães jovens em crescimento.",
    splenic_torsion: "A torção do baço, que exige cuidados veterinários urgentes, é mais frequente nesta raça do que noutras raças grandes.",
    urinary_incontinence: "Na raça pode ocorrer incontinência urinária, uma perda involuntária de urina.",
    osteochondritis: "Na raça pode ocorrer a osteocondrite dissecante (OCD), uma perturbação da cartilagem das articulações em cães em crescimento.",
    scottie_cramp: "Na raça ocorre o «scottie cramp»: episódios curtos de cãibras musculares, normalmente desencadeados pela excitação; não é doloroso.",
    slem_shaking_puppy: "Na raça pode surgir a leucoencefalomielopatia espongiforme (SLEM), também chamada síndrome do cachorro trémulo; um teste de ADN permite aos criadores evitá-la.",
    cecs_cramping: "Na raça ocorre a síndrome de cãibras epileptoides canina (CECS) – episódios de tremores e espasmos musculares.",
    gallbladder_mucocele: "Na raça pode surgir o mucocelo da vesícula biliar, em que a vesícula se enche de muco espesso e não esvazia bem; por vezes é necessária cirurgia.",
    periodontal_disease: "A doença periodontal, uma infeção e inflamação das gengivas e dos tecidos que suportam os dentes, é um problema conhecido na raça.",
    extra_eyelashes: "Na raça pode ocorrer a distiquíase, em que pequenas pestanas a mais crescem na face interna ou no bordo da pálpebra e podem roçar no olho; pergunta se os progenitores foram examinados no programa oftalmológico.",
    cm_sm_screening: "Na raça podem ocorrer a malformação tipo Chiari e a siringomielia, uma condição dolorosa com cavidades cheias de líquido na medula espinal perto do cérebro; recomenda-se aos criadores que rastreiem os progenitores (Reino Unido: programa BVA/KC).",
    prominent_eyes_injury_dry_eye: "Os olhos salientes ferem-se com mais facilidade e podem desenvolver úlceras e secura; na raça ocorrem também o olho seco e o «olho de cereja».",
    legg_perthes: "Na raça pode ocorrer a doença de Legg-Perthes, uma condição dolorosa em que a articulação da anca sofre necrose e se desfaz.",
    glaucoma: "Na raça pode ocorrer o glaucoma, um aumento da pressão dentro do olho que pode ser doloroso e levar à cegueira.",
    lethal_acrodermatitis: "Na raça ocorre a acrodermatite letal, uma doença hereditária que provoca problemas graves de pele e de crescimento nos cachorros.",
    kidney_disease_urine_screening: "Na raça ocorrem problemas renais; as análises de urina permitem controlar os progenitores antes da reprodução.",
    primary_lens_luxation: "Na raça ocorre a luxação primária do cristalino, uma doença hereditária e dolorosa dos olhos em que o cristalino sai do lugar e que pode provocar cegueira; existe um teste de ADN para os cães reprodutores.",
    inherited_ataxia: "Na raça ocorrem ataxias hereditárias (ataxia de início tardio e ataxia espinocerebelosa), que provocam perda de equilíbrio e de coordenação; existem testes de ADN para os cães reprodutores.",
    hydrocephalus: "Na raça pode ocorrer a hidrocefalia, uma acumulação de líquido à volta do cérebro.",
    heart_disease_pda: "Na raça podem ocorrer doenças cardíacas, incluindo a persistência do canal arterial, um vaso sanguíneo junto ao coração que não fecha depois do nascimento; o veterinário pode detetá-la ao auscultar o coração na primeira consulta do cachorro.",
    chiari_malformation: "Na raça pode ocorrer a malformação tipo Chiari com siringomielia, uma condição dolorosa com cavidades cheias de líquido na medula espinal perto do cérebro.",
    cataracts_entropion: "Na raça podem ocorrer cataratas, que tornam opaco o cristalino do olho, e pálpebras viradas para dentro (entrópion); pergunta se os progenitores foram examinados no programa oftalmológico.",
    periodontal_daily_brushing: "A raça tem tendência para doenças das gengivas (periodontais), por isso aconselha-se escovar os dentes todos os dias com uma pasta de dentes para cães.",
    eye_problems_shallow_sockets: "Na raça ocorrem problemas nos olhos, como o olho seco, infeções oculares e úlceras na superfície do olho; as órbitas pouco profundas tornam também mais prováveis as lesões nos olhos.",
    eye_problems_dry_eye_entropion_lens_luxation: "Na raça ocorrem problemas nos olhos, como o olho seco, pálpebras que se enrolam para dentro (entrópion) e a deslocação do cristalino (luxação do cristalino); existem exames oftalmológicos.",
    heart_valve_screening: "Na raça podem ocorrer doenças cardíacas; as ecografias cardíacas permitem controlar os progenitores quanto a problemas nas válvulas antes da reprodução.",
    dental_weight_problems: "Um grande estudo britânico aponta as doenças dentárias e o excesso de peso como problemas particularmente comuns na raça, problemas que os donos podem ajudar a prevenir; ocorrem também dentes apinhados e dentes de leite que não caem.",
  },
  page: {
    eyebrow: "Registo de animais",
    // Search terms people use («gato ragdoll», «temperamento»); «temperamento» only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "temperamento, " : ""}exercício, tamanho e cuidados | PetPrep`
        : species === "cat"
          ? `${/\bgato\b/i.test(name) ? name : `Gato ${rn(name)}`}: ${hasIntro ? "temperamento, " : ""}escovagem, tamanho e esperança de vida | PetPrep`
          : `${name} (${lc(one)}): necessidades, esperança de vida e cuidados | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Fontes, saúde e conselhos de compra.`,
    metaLabels: { weight: "peso", exercise: "exercício", lifespan: "esperança de vida" },
    metaDescription: (name, one) =>
      `${name}: as necessidades documentadas desta raça (${lc(one)}) – exercício, higiene, refeições, tamanho, esperança de vida, para quem é adequada – e como o PetPrep a simula.`,
    suitabilityTitle: "Para quem é adequado",
    suitabilityNote: "As mesmas etiquetas da aplicação. Cada etiqueta é confirmada pelas fontes indicadas no fim da página.",
    suitabilityNone: "Ainda não há etiquetas de adequação confirmadas por fontes para esta raça.",
    needsTitle: "Do que precisa",
    needsIntro: (species) =>
      species === "cat"
        ? "Segundo registos de raças felinas, organizações veterinárias e estudos. Quando as fontes divergem, todas são mostradas."
        : "Segundo estalões de raça, clubes de canicultura, organizações veterinárias e estudos. Quando as fontes divergem, todas são mostradas.",
    general: (many) => `Orientações gerais para ${lc(many)} (não específicas da raça):`,
    noData: "Ainda não consta das nossas fontes.",
    simTitle: "Como o PetPrep o simula",
    simBadge: "Regras do jogo, não aconselhamento veterinário",
    simIntro:
      "No PetPrep, uma semana real corresponde a um mês de vida do animal de estimação. Estas são as regras que o jogo usa para esta raça. O PetPrep escolheu-as com base nas fontes desta página; não são instruções de cuidados para um animal de estimação verdadeiro.",
    simInfoOnly: "Esta raça está no registo apenas a título informativo; a aplicação ainda não a simula.",
    simTable: { stage: "Fase da vida", starts: "Começa", meals: "Refeições por dia", activity: { steps: "Objetivo diário de passos", play_sessions: "Brincadeira por dia" } },
    arrives: (m) => `chega aos ${m} meses`,
    fromMonth: (m, years) => (years ? `${m}.º mês (${years})` : `${m}.º mês`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `a partir do ${x.from}.º mês: ${x.meals}`)).join("; "),
    simDecisions: "Cada número do jogo é uma decisão do PetPrep registada com as suas fontes.",
    healthTitle: "Saúde",
    healthNote: "Apenas informativo, sem revisão veterinária. Sobre o teu animal de estimação, pergunta ao teu veterinário.",
    healthNone: "As nossas fontes ainda não incluem informação de saúde específica desta raça.",
    checklistTitle: "Antes de comprar: o que verificar com o criador",
    checklistIntro: (speciesId) =>
      speciesId === "cat" ? "Perguntas a esclarecer antes de levares um gatinho para casa. Os pontos são conselhos de veterinários, associações de proteção animal e federações felinas; cada um cita a sua fonte." : "Perguntas a esclarecer antes de levares um cachorro para casa. Os pontos são conselhos de veterinários, associações de proteção animal e clubes de canicultura; cada um cita a sua fonte.",
    checklistCountry: { code: null, title: "" },
    checklistLocalNote: "As leis sobre a idade mínima, o microchip e a vacinação variam de país para país: confirma as regras do sítio onde vives.",
    checklistGeneralTitle: "Para todas as raças",
    checklistTestsTitle: "Testes de saúde dos progenitores para esta raça",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Testes que uma federação felina exige antes de um gato ser usado para reprodução" : "Testes que o Royal Kennel Club recomenda como mínimo",
      best_practice: "Outros testes como boa prática",
      other_scheme: "Outros programas de rastreio para esta raça",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Esta lista vem das regras de criação de uma federação felina estrangeira (ver a fonte) e é indicativa. Pergunta ao criador que testes fizeram os progenitores."
        : "Estas listas vêm do Royal Kennel Club do Reino Unido e são indicativas; os clubes de canicultura nacionais podem definir regras próprias, mais exigentes. Pergunta ao clube da raça e ao criador que testes fizeram os progenitores.",
    checklistStatus: {
      none_recommended: "De momento, o Royal Kennel Club não indica nenhum rastreio de saúde recomendado antes da reprodução para esta raça. Mesmo assim, pergunta ao criador pela saúde dos progenitores.",
      not_found: "Ainda não encontrámos uma fonte fiável que indique os testes de saúde dos progenitores desta raça. Pergunta ao clube da raça e ao criador que testes fizeram os progenitores.",
      not_checked: "Ainda não verificámos os testes de saúde dos progenitores desta raça. Pergunta ao clube da raça e ao criador que testes fizeram os progenitores.",
    },
    sourcesTitle: "Fontes",
    sourcesIntro: "Cada dado desta página cita uma destas fontes.",
    sourcesAll: "Mostrar todas as fontes",
    sourcesFewer: "Mostrar menos",
    sourceLabel: (id, publisher) => `Fonte ${id}: ${publisher}`,
    disclaimer: "O PetPrep é uma simulação para famílias. Esta página não é aconselhamento veterinário: para um animal de estimação verdadeiro, pergunta a um veterinário ou ao clube da raça.",
    backTo: (many) => `Todos os ${lc(many)}`,
    compareWith: "Comparar com outras raças",
    related: { title: "Raças semelhantes", intro: (many) => `Outros ${lc(many)} do registo com necessidades semelhantes, cada um com dados confirmados por fontes.` },
    updated: "Atualizado",
    glanceTitle: "Em resumo",
    glanceNote: "Dados principais das fontes no fim da página. Quando as fontes divergem, é indicado cada valor.",
    portraitAlt: { ai_photo: (name) => `${name}: fotografia (IA)`, ai_illustration: (name) => `${name}: ilustração (IA)` },
    portraitCaption: { ai_photo: "Fotografia gerada com IA", ai_illustration: "Ilustração gerada com IA" },
    portraitColours: {
      legend: "Cor da pelagem",
      alt: { ai_photo: (name, colour) => `${name}, ${lc(colour)}: fotografia (IA)`, ai_illustration: (name, colour) => `${name}, ${lc(colour)}: ilustração (IA)` },
    },
    share: {
      button: "Partilhar",
      title: "Partilhar esta raça",
      copy: "Copiar",
      copied: "Copiado",
      linkLabel: "Ligação para esta página",
      more: "Mais opções",
      text: (name) => `${name}: necessidades, fontes e como o PetPrep o simula`,
      emailSubject: (name) => `${name} | Registo de animais do PetPrep`,
      on: (network) => `Partilhar no ${network}`,
    },
    og: { lead: "Necessidades, fontes e como o PetPrep o simula", photoLabel: "Fotografia IA" },
    qa: {
      title: "Perguntas e respostas",
      intro: "Respostas baseadas apenas nos dados com fonte desta página; cada resposta cita as suas fontes.",
      // Breed names in Portuguese are masculine (o/um + cão/gato implied) and lower case in running text: «um border collie», «o shih tzu», «do akita».
      questions: {
        exercise: (n) => `De quanto exercício precisa ${um(n)}?`,
        lifespan: (n) => `Quanto tempo vive ${um(n)}?`,
        size: (n) => `Que tamanho atinge e quanto pesa ${um(n)}?`,
        grooming: (n) => `De quantos cuidados com a pelagem precisa ${um(n)}?`,
        suits: (n) => `Para quem é adequado ${o(n)}?`,
      },
      leads: {
        exercise: (n) => `Segundo as nossas fontes, ${o(n)} precisa deste exercício:`,
        lifespan: (n) => `Segundo as nossas fontes, a esperança de vida ${o(n, "de")} é:`,
        size: (n) => `Tamanho e peso em adulto ${o(n, "de")}, segundo as nossas fontes:`,
        grooming: (n) => `Pelagem e cuidados ${o(n, "de")}, segundo as nossas fontes:`,
        suits: (n) => `Segundo as nossas fontes, ${o(n)} é adequado para:`,
      },
      considerLead: "Tem em conta:",
      differ: "As fontes indicam valores diferentes, por isso são apresentados todos.",
      join: "; ",
    },
  },
  intros: {
    anatolian_shepherd_dog: {
      aka: "Kangal, Anatolian Shepherd Dog, Karabash",
      text: [
        "O pastor-da-anatólia é um cão de guarda de rebanhos grande e robusto, originário da Turquia; a FCI descreve o cão pastor turco como kangal (Kangal Shepherd Dog) — de uma só cor, do fulvo ao cinzento-lobo, com máscara preta, e uma altura de 72–78 cm nos machos e 65–73 cm nas fêmeas. O padrão americano da raça indica 110–150 libras (cerca de 50–68 kg) para os machos e 80–120 libras (cerca de 36–54 kg) para as fêmeas. Um cão deste porte atinge o tamanho adulto por volta dos 18–24 meses (PetMD); o Royal Kennel Club indica uma esperança de vida de mais de 10 anos e a WebMD de 11 a 13 anos em média.",
        "O Royal Kennel Club recomenda mais de 2 horas de exercício por dia e cuidados com o pelo mais de uma vez por semana, indica que perde pelo e que precisa de uma casa grande com um jardim grande no campo, e inclui-o na categoria 1 do programa Breed Watch. A PetMD escreve que o pastor-da-anatólia talvez seja mais indicado para casas sem crianças pequenas, que os cachorros apresentados cedo a outros animais costumam dar-se bem com eles, que a socialização precoce é essencial, que fora das duas mudas anuais basta escová-lo uma vez por semana e que se deve evitar o exercício perto das refeições.",
      ],
      sources: ["S682", "S685", "S686", "S687", "S688", "S10"],
    },
    irish_setter: {
      aka: "Setter irlandês vermelho, Irish Setter",
      text: [
        "O setter irlandês (setter irlandês vermelho) é um cão de parar esguio e atlético da Irlanda, criado para procurar caça em terrenos amplos. O padrão da FCI descreve uma única cor — castanho intenso sem qualquer vestígio de preto — e uma altura de 58–67 cm nos machos e 55–62 cm nas fêmeas; o padrão americano da raça considera ideal cerca de 70 libras (cerca de 32 kg) para um macho e 60 libras (cerca de 27 kg) para uma fêmea. Um cão deste tamanho atinge o tamanho adulto por volta dos 15–18 meses (PetMD), e o Royal Kennel Club indica uma esperança de vida de mais de 10 anos.",
        "O Royal Kennel Club recomenda mais de 2 horas de exercício por dia e cuidados com o pelo mais de uma vez por semana, indica que a raça larga pelo e precisa de uma casa grande com um jardim grande, e coloca-a na categoria 1 do Breed Watch. A PDSA descreve cães muito simpáticos e afetuosos que se dão bem com crianças e outros animais e aconselha cuidar do pelo 2 a 3 vezes por semana; o PetMD recomenda verificar e limpar as orelhas todas as semanas e escreve que os setters irlandeses precisam de muita companhia humana.",
      ],
      sources: ["S675", "S676", "S678", "S680", "S10"],
    },
    brussels_griffon: {
      aka: "Griffon Bruxellois, Brussels Griffon",
      text: [
        "O grifo de Bruxelas (Griffon Bruxellois) é um pequeno cão de companhia da Bélgica, de face curta e achatada. O padrão da FCI descreve um pelo vermelho, naturalmente duro e ligeiramente ondulado, e um peso de 3,5 a 6 kg; o Royal Kennel Club britânico, que reconhece uma variedade de pelo duro e outra de pelo curto, descreve-o como um cão pequeno e esperto com temperamento de terrier. Um cão deste tamanho termina o crescimento por volta dos 8–12 meses (PetMD), e o Royal Kennel Club indica uma esperança de vida de mais de 12 anos (PetMD: 12–15 anos).",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com o pelo mais de uma vez por semana, indica que larga pelo e que é adequado para um apartamento, e coloca a raça na categoria 2 do programa Breed Watch. A PetMD descreve um cão de focinho achatado (braquicéfalo) que tolera mal o tempo quente e húmido, aconselha limpar as pregas da face cerca de uma vez por semana e escovar os dentes todos os dias, e escreve que os grifos de Bruxelas se dão bem com crianças e outros animais sob supervisão, mas não gostam de ficar sozinhos durante muito tempo.",
      ],
      sources: ["S669", "S670", "S672", "S10"],
    },
    rat_terrier: {
      aka: "Rattie, Rat Terrier americano",
      text: [
        "O rat terrier é um pequeno terrier americano criado em dois tamanhos – miniatura e padrão – com pelo curto, rente, liso e brilhante. O padrão da raça admite uma altura na cernelha até 18 polegadas (46 cm), e a PetMD indica um peso de 10–25 libras (cerca de 4,5–11 kg) para ambos os tamanhos; um cão deste porte termina de crescer por volta dos 9–12 meses (PetMD). A VCA indica uma esperança de vida de 12–16 anos, a PetMD de 12–18 anos.",
        "O Rat Terrier Club of America diz que os rat terriers se dão bem com crianças, sobretudo se crescerem com elas, e adaptam-se a um apartamento, mas precisam de pelo menos 30 minutos de exercício por dia. A PetMD refere que precisam de muita estimulação física e mental, não gostam de ficar sozinhos muito tempo e largam um pouco de pelo todo o ano; a VCA aconselha escovar uma vez por semana e avisa que podem não se dar bem com animais pequenos, sobretudo roedores.",
      ],
      sources: ["S650", "S648", "S10", "S647"],
    },
    shar_pei: {
      aka: "Shar-Pei chinês, Chinese Shar-Pei, Sharpei",
      text: [
        "O Shar Pei («Chinese Shar-Pei» nos EUA) é um cão ativo, compacto, de construção quadrada e porte médio, originário da China, com pelo curto, áspero e eriçado de uma só cor (qualquer uma exceto o branco), rugas na cabeça e na cernelha e um focinho largo. O padrão do Royal Kennel Club indica uma altura de 46–51 cm e a PDSA um peso de 20–27 kg; um cão deste porte termina de crescer por volta dos 12–15 meses (PetMD). O Royal Kennel Club e a PDSA indicam uma esperança de vida de mais de 10 anos, mas um estudo da VetCompass com cães do Reino Unido encontrou uma mediana de 7,3 anos.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e uma escovagem por semana, e coloca a raça na categoria 2 do Breed Watch devido a problemas nas pálpebras e nas pregas da pele. A PDSA descreve os shar pei como cães de família leais e dedicados, mais indicados para donos experientes e crianças mais velhas, alerta para um forte instinto de presa perante animais mais pequenos e aconselha manter as pregas da pele limpas e secas e deixar um intervalo entre a refeição e o exercício.",
      ],
      sources: ["S665", "S660", "S10", "S664", "S667", "S666"],
    },
    border_collie: {
      text: [
        "O border collie é um cão de pastor de tamanho médio originário da Grã-Bretanha, feito para a resistência e o trabalho duro. O seu estalão descreve um cão vivo, atento, recetivo e inteligente, que não é nervoso nem agressivo.",
        "Clubes de canicultura e veterinários concordam sobretudo numa coisa: é uma raça com muitíssima energia. Precisa de mais de duas horas de exercício por dia e de muito em que pensar. Quando se aborrece ou faz pouco exercício, inventa as suas próprias tarefas: roer tudo o que está ao seu alcance ou tentar arrebanhar as crianças enquanto brincam.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "Labrador, Labrador Retriever",
      text: [
        "O labrador retriever é um cão de caça grande e de constituição robusta, originário da Grã-Bretanha e criado para cobrar a caça. O seu estalão descreve um companheiro de bom temperamento, meigo e adaptável, sempre disposto a agradar e que adora água. O pelo é curto e denso, preto, amarelo ou fígado/chocolate.",
        "As associações britânicas descrevem o labrador como um cão de família que, quando bem socializado, cria laços com todos os membros da casa. É muito ativo e muito motivado pela comida: as guloseimas ajudam no treino, mas os labradores também têm tendência para engordar.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden, Golden Retriever",
      text: [
        "O golden retriever é um cão de caça grande originário da Grã-Bretanha, com pelo liso ou ondulado em tons de dourado ou creme. O seu estalão descreve um cão dócil e inteligente, meigo, simpático e confiante.",
        "As associações britânicas consideram-no um ótimo cão para uma família ativa e uma boa opção como primeiro cão. As contrapartidas são claras nas fontes: pelo menos duas horas de exercício por dia, escovagem várias vezes por semana e uma pelagem que perde muito pelo.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "Bouledogue français, Frenchie, French Bulldog",
      text: [
        "O bulldog francês é um cão de companhia pequeno e robusto originário de França, com pelo curto e liso e as características orelhas erguidas «de morcego». O seu estalão descreve um cão sociável, vivo e brincalhão; as associações britânicas dizem que é tranquilo e adaptável e que costuma dar-se bem com crianças, o que fez dele um cão de família muito popular.",
        "Precisa de até uma hora de exercício por dia e adapta-se a um apartamento. A contrapartida que todas as fontes referem é o focinho achatado: pode dificultar a respiração, e os bulldogs franceses aquecem depressa, sobretudo quando está calor, por isso sombra, água e passeios calmos são importantes. A PDSA sugere às famílias que considerem também adotar um bulldog francês adulto.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
    german_shepherd: {
      aka: "Pastor alsaciano, cão-lobo, German Shepherd, GSD",
      text: [
        "O pastor alemão é um cão de pastor grande e poderoso, originário da Alemanha, com orelhas erguidas e uma densa pelagem dupla, curta ou comprida. O seu estalão descreve um cão equilibrado e seguro de si, com nervos firmes, e o Royal Kennel Club descreve-o como um cão de trabalho e de serviço versátil, conhecido pela coragem e pela inteligência.",
        "Precisa de pelo menos duas horas de exercício por dia, adapta-se a uma casa grande com jardim e perde muito pelo. As associações britânicas dizem que alguns podem ser ótimos cães de família, mas devem estar sempre sob vigilância perto de crianças pequenas. O Royal Kennel Club pede aos criadores que avaliem as ancas e os cotovelos dos progenitores e aponta a forma dos membros posteriores como um ponto de preocupação na raça.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier, CKCS, Cavalier King Charles Spaniel",
      text: [
        "O Cavalier King Charles spaniel é um pequeno spaniel de companhia originário da Grã-Bretanha, com orelhas compridas e franjadas e um pelo comprido e sedoso em quatro cores: Blenheim, rubi, preto e fogo e tricolor. O seu estalão descreve um cão ativo e gracioso, de expressão meiga: desportivo, afetuoso, simpático e destemido.",
        "Precisa de cerca de uma hora de exercício por dia, pode viver num apartamento e é conhecido por se dar bem com crianças, embora as brincadeiras devam ser vigiadas e não goste de ficar sozinho. O pelo precisa de escovagem mais de uma vez por semana. As fontes britânicas apontam como principais problemas de saúde a doença das válvulas cardíacas e uma doença dolorosa da coluna ligada à forma do crânio, por isso pede-se aos criadores que façam aos cães testes cardíacos e ressonâncias magnéticas.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      text: [
        "O beagle é um pequeno sabujo originário da Grã-Bretanha, criado para caçar a lebre seguindo o seu rasto. O seu estalão descreve um sabujo robusto, compacto e alegre – ousado, ativo e atento, amável e sem agressividade nem timidez – com pelo curto e denso nas cores típicas dos sabujos, como tricolor, branco e fogo ou branco e limão, e sempre com a ponta da cauda branca.",
        "Precisa de até cerca de uma hora de exercício por dia e adapta-se bem à vida em família se for socializado desde cedo, embora deva ser vigiado com crianças e não deva ficar sozinho, pois pode ladrar e roer objetos. O pelo curto precisa de uma escovagem semanal, mas perde pelo. O treino deve começar cedo e basear-se em recompensas. Os veterinários britânicos veem beagles sobretudo por aumento de peso e doenças dentárias, por isso é preciso vigiar as porções e os dentes.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "Caniche, Caniche standard, Poodle, Standard Poodle",
      text: [
        "O caniche grande é o maior dos quatro tamanhos de caniche, uma raça de companhia originária de França que descende de cães europeus de caça aos patos. O seu estalão descreve um cão elegante e equilibrado, de porte orgulhoso – leal, alegre e de bom temperamento, capaz de aprender e de ser treinado – com um pelo abundante, frisado e encaracolado numa só cor uniforme: preto, branco, castanho, cinzento ou fulvo.",
        "Precisa de até cerca de uma hora de exercício por dia e adapta-se a uma casa grande com um jardim grande. Com a socialização certa em cachorro, costuma dar-se bem com crianças e com outros animais. O pelo não cai, mas isso não o torna hipoalergénico: precisa de cuidados diários e de tosquias regulares feitas por um tosquiador profissional. É conhecido por ser muito obediente e responder bem ao treino.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "Dachshund, cão salsicha",
      text: [
        "O teckel é um caçador alemão de texugos e coelhos, que existe em vários tamanhos e com três tipos de pelo; esta página é sobre o tamanho standard de pelo curto. O seu estalão descreve um cão moderadamente comprido em proporção à altura, sem exageros – fiel, versátil e de bom temperamento; inteligente, vivo e corajoso – com pelo denso, curto e liso, vermelho, ou preto ou chocolate com marcas fogo.",
        "Precisa de até cerca de uma hora de exercício por dia, dividida em dois passeios com tempo para farejar, e adapta-se a uma casa pequena. Adora pessoas e costuma dar-se bem com crianças de todas as idades, sempre sob vigilância, mas por causa do forte instinto de caça não é recomendado com animais mais pequenos, e não lida bem com a solidão. Por ter as costas compridas e as patas curtas, tem tendência para hérnias discais, por isso não deve saltar; pede-se aos criadores que verifiquem a coluna antes da reprodução.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "Aussie, Australian Shepherd",
      text: [
        "O pastor australiano é, apesar do nome, uma raça americana: um cão de trabalho inteligente com fortes instintos de pastoreio e de guarda. O seu estalão descreve um cão equilibrado de tamanho médio, um pouco mais comprido do que alto, de bom temperamento e por vezes reservado no primeiro encontro, com pelo de comprimento médio, liso a ondulado, azul merle, preto, vermelho merle ou vermelho, cada um com ou sem marcas brancas e fogo.",
        "Precisa de mais de duas horas de exercício por dia e de desafios mentais, como jogos de raciocínio e treino, e adapta-se a uma casa grande com um jardim grande no campo. Na família certa pode ser um ótimo cão de família, mas o forte instinto de pastoreio pode levá-lo a arrebanhar as crianças, por isso não é recomendado para famílias com crianças pequenas. Não gosta de ficar sozinho e o pelo precisa de escovagem algumas vezes por semana.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "Havanês, Bichon Havanais, Havanese",
      text: [
        "O bichon havanês é um membro pequeno da família dos bichons e o cão nacional de Cuba. O seu estalão descreve um cãozinho robusto, de patas curtas, com um pelo muito comprido, macio, liso ou ondulado, que nunca é aparado, e a cauda levantada sobre o dorso. Existe em fulvo, preto, castanho havana, tabaco, castanho-avermelhado e, raramente, branco, com ou sem manchas e marcas fogo.",
        "O seu estalão descreve-o como afetuoso, brincalhão e até um pouco palhaço, e diz que adora crianças e brinca com elas sem parar; as fontes britânicas consideram-no um excelente cão de família com a socialização certa, e fácil de treinar. Precisa de cerca de 30 minutos de exercício por dia, pode viver num apartamento e não perde pelo – mas o pelo comprido precisa de cuidados todos os dias para evitar nós e emaranhados.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "Westie",
      text: [
        "O West Highland white terrier, ou westie, é um pequeno terrier originário da Grã-Bretanha. O seu estalão descreve um cãozinho de constituição robusta, com peito profundo, dorso nivelado, uma pelagem dupla e áspera de cerca de 5 cm, orelhas pequenas, erguidas e pontiagudas e olhos escuros sob sobrancelhas espessas. O branco é a única cor que o estalão admite.",
        "O seu estalão descreve-o como atento, alegre, corajoso e independente, mas simpático. As fontes britânicas consideram-no um cão de família afetuoso e brincalhão para crianças de qualquer idade, sempre com as brincadeiras vigiadas; precisa de cerca de uma hora de exercício por dia, pode viver num apartamento, perde pelo e precisa de escovagem algumas vezes por semana. Por causa do instinto de caça não deve viver com animais mais pequenos, e não gosta de ficar sozinho. A pele é um ponto de preocupação conhecido: o Royal Kennel Club pede aos juízes que procurem sinais de inflamação da pele na raça.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "Bernês, Berner Sennenhund, Bernese Mountain Dog",
      text: [
        "O boieiro de Berna é um grande cão de quinta suíço, usado originalmente como cão de guarda, de tiro e de gado no cantão de Berna. O seu estalão descreve um cão de trabalho forte, ágil e de pelo comprido, com membros robustos e uma pelagem comprida, brilhante, lisa ou ligeiramente ondulada. A única cor que o estalão admite é tricolor: preto intenso com fogo vivo nas bochechas, por cima dos olhos, nas patas e no peito, e marcas brancas na cabeça e no peito.",
        "O seu estalão descreve-o como seguro de si, de bom temperamento e simpático, e como «um cão de família meigo e dedicado» que amadurece devagar. As fontes britânicas dizem que precisa de até uma hora de exercício por dia, que o seu lugar é uma casa grande com um jardim grande, que perde muito pelo e precisa de escovagem mais de uma vez por semana; não deve ficar sozinho durante muito tempo. Costuma viver menos de dez anos, e as fontes britânicas apontam a displasia da anca e do cotovelo, a dilatação-torção gástrica e alguns tipos de cancro entre os seus problemas de saúde.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "Husky, Siberian Husky",
      text: [
        "O husky siberiano é um cão de trenó de trabalho de tamanho médio, reconhecido pela FCI como raça americana e descrito pelo Royal Kennel Club como o mais leve e mais rápido dos cães de trenó. O seu estalão pede um cão rápido e ligeiro, com pelagem dupla de comprimento médio, orelhas grossas e erguidas, olhos castanhos ou azuis (é permitido um de cada cor) e uma cauda bem coberta de pelo. As cores vão do preto ao branco puro; o merle e o tigrado não são admitidos.",
        "O seu estalão descreve-o como simpático e meigo, atento e extrovertido. As fontes britânicas dizem que precisa de mais de duas horas de exercício por dia, de uma casa grande com um jardim grande e de uma vedação alta e muito segura, porque os huskies são conhecidos por fugir; perde muito pelo, precisa de escovagem algumas vezes por semana e não lida bem com a solidão. A PDSA sugere-o para casas só de adultos ou com adolescentes, mais do que para famílias com crianças pequenas, e aponta a displasia da anca, problemas nos olhos e a epilepsia entre os seus problemas de saúde.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "Rottie",
      text: [
        "O rottweiler é um cão de trabalho poderoso, de tamanho médio a grande, originário da Alemanha. O seu estalão descreve um cão robusto, nem pesado nem leve, com pelo curto, grosso e bem assente, orelhas pendentes de tamanho médio e olhos castanho-escuros em forma de amêndoa. A única cor que admite é preto com marcas fogo vivas e bem definidas nas bochechas, no focinho, na garganta, no peito e nas patas; as marcas brancas são um defeito.",
        "O seu estalão descreve-o como de bom temperamento, plácido, muito dedicado, obediente e com vontade de trabalhar, e o Royal Kennel Club diz que um rottweiler bem treinado é um maravilhoso companheiro de família. As fontes britânicas dizem que precisa de mais de duas horas de exercício por dia, de uma casa grande com um jardim grande e de um dono experiente, por ser tão poderoso; deve ser socializado desde cedo. A PDSA não o recomenda para famílias com crianças mais pequenas e bebés, e nunca deve ficar sem vigilância com outros animais. Uma escovagem semanal é suficiente. Costuma viver menos de dez anos, e o Royal Kennel Club vigia a forma dos seus membros posteriores.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "Bulldog, English Bulldog, British Bulldog",
      text: [
        "O bulldog inglês é um cão de tamanho médio e pelo liso originário da Grã-Bretanha: bastante atarracado, baixo, largo, poderoso e compacto, com o focinho relativamente curto, orelhas pequenas e finas em forma de rosa e olhos redondos e muito escuros. O seu estalão admite cores uniformes como vermelho, fulvo, fulvo-claro e branco, tigrado e malhado; o preto e o preto e fogo são muito indesejáveis. Pede narinas grandes e bem abertas e diz que os cães com dificuldade em respirar são muito indesejáveis.",
        "O seu estalão descreve-o como atento, ousado, leal, fiável e corajoso, de aspeto feroz mas afetuoso, e o Royal Kennel Club diz que continua a ser muito popular como companheiro de família pelo caráter e pela lealdade. As fontes britânicas dizem que precisa de até uma hora de exercício por dia, nunca nas horas de calor, e que se dá bem com os outros animais da casa se for socializado em jovem; precisa de cuidados com a pelagem uma vez por semana, mas as rugas do focinho precisam de limpeza diária. A PDSA descreve-o como uma raça de focinho muito achatado com grande probabilidade de ter problemas de saúde graves, como dificuldades respiratórias, e recomenda vivamente considerar uma raça mais saudável, um cruzamento ou um cão sem raça definida. Costuma viver menos de dez anos.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "Braco alemão, Kurzhaar, Deutsch Kurzhaar, German Shorthaired Pointer",
      text: [
        "O braco alemão de pelo curto é um cão de caça versátil e polivalente originário da Alemanha, feito para trabalhar no campo e na água, com pelo curto e espesso, áspero ao toque, orelhas largas e planas inseridas no alto e olhos castanho-escuros em forma de amêndoa. O seu estalão americano admite fígado uniforme, fígado e branco (por exemplo, salpicado), preto uniforme e preto e branco; zonas vermelhas, laranja, limão ou fogo e um cão totalmente branco são desqualificantes. O seu estalão descreve uma cauda cortada – o PetPrep mostra sempre o cão com a cauda natural.",
        "O seu estalão descreve-o como simpático, inteligente e disposto a agradar. O Royal Kennel Club e a PDSA dizem que precisa de mais de duas horas de exercício por dia; a PDSA acrescenta que o instinto de caçar, parar e cobrar pode despertar durante um passeio, por isso precisa de um bom treino de chamada, e que é bastante fácil de treinar. Precisa de cuidados com a pelagem uma ou duas vezes por semana e perde pelo moderadamente. Um grande estudo britânico indica uma esperança de vida mediana de 13,4 anos.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "Yorkie, Yorkshire",
      text: [
        "O Yorkshire terrier é um terrier toy originário da Grã-Bretanha que, segundo o estalão, pesa até 3,2 kg, com um pelo comprido, perfeitamente liso, brilhante e sedoso, que cai de forma uniforme de cada lado a partir de uma risca ao longo do dorso. O estalão admite uma só cor: azul-aço escuro da nuca até à cauda, com fogo intenso e vivo na cabeça, no peito e nas patas; as pequenas orelhas em forma de V são erguidas. O estalão descreve tanto a cauda cortada como a não cortada – o PetPrep mostra sempre o cão com a cauda natural.",
        "O seu estalão descreve-o como atento, inteligente e cheio de vida, de temperamento equilibrado. O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem todos os dias; a PDSA acrescenta que gosta de correr, ir buscar coisas e brincar, que pode ser bastante teimoso no treino e que é mais adequado a famílias com crianças mais velhas, porque tem os ossos muito frágeis. Um grande estudo britânico concluiu que as doenças dentárias são o problema mais comum da raça, recomenda cuidar dos dentes todos os dias, por exemplo escovando-os, e encontrou uma idade mediana à morte de 13,56 anos.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "Cane Corso Italiano, Corso",
      text: [
        "O cane corso é um molossoide italiano de tamanho médio a grande, um cão robusto e sólido com alguma elegância, um pouco mais comprido do que alto. O seu estalão descreve um pelo curto, brilhante e muito denso, preto, em tons de cinzento, fulvo ou vermelho com máscara escura, trigo escuro ou tigrado; não são admitidas grandes manchas brancas. Segundo o estalão FCI atual, as orelhas não são cortadas e a cauda é natural – e no Reino Unido o corte de orelhas e de cauda é ilegal – por isso o PetPrep mostra sempre o cão com orelhas e cauda naturais.",
        "O seu estalão descreve-o como guardião da propriedade, da família e do gado, extremamente ágil e reativo. A PDSA diz que é sociável e carinhoso com os donos, que precisa de cerca de duas horas de exercício por dia e de coisas para fazer, porque detesta aborrecer-se, e que, pelo seu tamanho, é mais adequado a donos experientes. Não recomenda a raça para casas com crianças pequenas, que podem ser derrubadas; adapta-se a casas só de adultos ou a famílias com crianças mais velhas. Uma escovagem semanal é suficiente, mas perde pelo e é conhecido por se babar. A PDSA indica uma esperança de vida média inferior a dez anos.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "Corgi, Pembroke Welsh Corgi",
      text: [
        "O Welsh corgi Pembroke é um pequeno cão boieiro originário do País de Gales, baixo, forte e de constituição sólida, que dá uma impressão de substância e resistência num espaço pequeno. O seu estalão descreve um pelo liso de comprimento médio, com um subpelo denso, vermelho, zibelina, fulvo ou preto e fogo, com ou sem marcas brancas nas patas, no peito e no pescoço, e orelhas erguidas. Antigamente a cauda era habitualmente cortada; o estalão também descreve a cauda natural, e o PetPrep mostra sempre o cão com a cauda natural.",
        "O seu estalão descreve-o como ousado, trabalhador, extrovertido e simpático. O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem mais de uma vez por semana; a PDSA descreve cães simpáticos, alegres e divertidos, dispostos a agradar e bastante fáceis de treinar, mas diz que podem mordiscar os calcanhares das crianças que correm, por isso a socialização com crianças e o treino desde cedo ajudam. O Royal Kennel Club indica uma esperança de vida de mais de 12 anos e pede aos criadores que avaliem as ancas dos progenitores.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "Doberman, Doberman Pinscher",
      text: [
        "O dobermann é um cão alemão de companhia, proteção e trabalho, de tamanho médio, forte e musculado, de linhas elegantes e porte orgulhoso. O seu estalão FCI descreve um pelo curto, duro e denso, bem assente e liso, preto ou castanho com marcas fogo cor de ferrugem bem definidas; não são admitidas manchas brancas. Segundo o estalão FCI, as orelhas e a cauda ficam naturais, e o PetPrep mostra sempre o cão com orelhas e cauda naturais.",
        "O seu estalão descreve-o como simpático e calmo e muito dedicado à família. O Royal Kennel Club diz que a sua natureza leal e obediente faz dele um excelente cão de família, e recomenda mais de duas horas de exercício por dia e cuidados com a pelagem uma vez por semana. A PDSA acrescenta que é muito enérgico, precisa de muito exercício mental e físico e de socialização precoce e – pelo seu grande tamanho e constituição forte – não é recomendado para famílias com crianças pequenas nem para quem tem cão pela primeira vez. O Royal Kennel Club indica uma esperança de vida de mais de 10 anos.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "Boxer alemão, Deutscher Boxer",
      text: [
        "O boxer é um cão alemão de trabalho e de companhia de tamanho médio, de constituição quadrada, ossatura forte e músculos bem desenvolvidos. Os seus estalões descrevem um pelo curto, brilhante e liso, fulvo ou tigrado, com máscara preta; as marcas brancas são admitidas, mas não devem cobrir mais de um terço da pelagem. O focinho deve ser largo e profundo, nunca curto, com narinas largas. Antigamente a cauda era habitualmente cortada; o estalão também descreve a cauda não cortada, e o PetPrep mostra sempre o cão com orelhas e cauda naturais.",
        "O seu estalão descreve-o como equilibrado, dócil, destemido e seguro de si. O Royal Kennel Club diz que é muito apreciado como companheiro de família e recomenda mais de duas horas de exercício por dia e cuidados com a pelagem uma vez por semana. A PDSA descreve um cão com muitíssima energia e brincalhão, que adora a companhia humana e pode desenvolver ansiedade de separação se ficar sozinho, que tem um instinto de caça muito forte e que – pelo tamanho e pela natureza turbulenta – não é recomendado para casas com crianças mais pequenas nem para quem tem cão pela primeira vez; alguns boxers com o focinho mais curto podem ter problemas respiratórios graves. O Royal Kennel Club indica uma esperança de vida de mais de 10 anos.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Schnauzer anão, Zwergschnauzer, Miniature Schnauzer",
      text: [
        "O schnauzer miniatura é um pequeno cão de companhia alemão: forte, atarracado e quase quadrado, com pelo áspero, duro e denso, sobrancelhas espessas e barba. O seu estalão FCI admite sal e pimenta, preto e prateado, preto puro e branco puro; o PetPrep mostra as três primeiras. Antigamente a cauda era habitualmente cortada e as orelhas por vezes também; o estalão FCI pede cauda natural e orelhas caídas, e o PetPrep mostra sempre o cão com orelhas e cauda naturais.",
        "A FCI classifica-o como cão de casa e de companhia, e o Royal Kennel Club diz que é muito popular como companheiro. O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem mais de uma vez por semana e diz que não perde pelo. A PDSA descreve um cão brincalhão e curioso, que se pode dar bem com crianças se as conhecer desde cedo, que pode ser teimoso no treino e que precisa de escovagem duas a três vezes por semana, além de tosquia ou trimming por um tosquiador profissional de vez em quando. O Royal Kennel Club indica uma esperança de vida de mais de 10 anos.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "Shih-tzu",
      text: [
        "O shih tzu é um pequeno cão de companhia originário do Tibete; a Grã-Bretanha é responsável pelo seu estalão FCI. Os estalões descrevem um cão robusto, de pelagem abundante e porte orgulhoso, com uma cara «semelhante a um crisântemo»: pelo de cobertura comprido e denso, olhos grandes, escuros e redondos, orelhas grandes e caídas e uma cauda com muita franja levantada sobre o dorso. Os estalões admitem muitas cores; o PetPrep mostra dourado e branco, preto e branco e fígado e branco, e nunca merle. O focinho é curto e achatado, e a PDSA refere problemas respiratórios causados pelo focinho mais curto, por isso o PetPrep desenha sempre um focinho moderado com narinas abertas.",
        "A FCI descreve-o como inteligente, ativo e atento, simpático e independente. O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem todos os dias, e indica um apartamento como casa adequada. A PDSA diz que os shih tzus podem ser cães de família de bom temperamento se tiverem a socialização e o treino certos, considera-os um cão ideal para quem tem cão pela primeira vez, aconselha a vigiá-los sempre com crianças e recomenda uma escovagem diária e uma tosquia por um tosquiador profissional a cada seis a oito semanas para a maioria dos cães de companhia. O Royal Kennel Club indica uma esperança de vida de mais de 10 anos.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "Grand danois, Deutsche Dogge, Great Dane",
      text: [
        "O dogue alemão é um gigante alemão: o estalão FCI diz que combina um corpo grande, poderoso e bem construído com orgulho, força e elegância, com uma cabeça comprida e estreita, orelhas que caem naturalmente e um pelo muito curto, liso e brilhante. Os estalões indicam fulvo e tigrado – de preferência com máscara preta – bem como arlequim, preto e azul; o PetPrep mostra apenas cores que tanto a FCI como o Royal Kennel Club indicam, nunca merle nem manto, e desenha sempre o cão com orelhas e cauda naturais e pálpebras bem fechadas, porque o Royal Kennel Club pede aos juízes que estejam atentos a pálpebras viradas para dentro ou para fora e a membros posteriores fracos.",
        "A FCI descreve-o como simpático, carinhoso e dedicado aos donos, embora possa ser reservado com estranhos. O Royal Kennel Club diz que, apesar do tamanho, é um maravilhoso cão de família, e recomenda mais de duas horas de exercício por dia, uma casa e um jardim grandes e cuidados com a pelagem uma vez por semana. A PDSA diz que os dogues alemães são conhecidos por se babarem, têm um instinto de caça bastante forte e não são recomendados para casas com crianças mais pequenas, pelo tamanho e pela força; aconselha a deixar um intervalo entre a refeição e o exercício para ajudar a prevenir a dilatação-torção gástrica. O Royal Kennel Club indica uma esperança de vida de menos de 10 anos.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "Spitz alemão anão, Lulu da Pomerânia, Pom, Pomeranian, Zwergspitz",
      text: [
        "O pomerânia é o mais pequeno dos spitz: a FCI considera-o a variedade anã do spitz alemão, com 21 cm ± 3 cm ao garrote, e o estalão do Royal Kennel Club descreve um cãozinho compacto e de dorso curto, com cabeça de raposa, orelhas pequenas e erguidas e a cauda virada sobre o dorso. A pelagem dupla tem um subpelo macio e fofo e um pelo de cobertura comprido e liso que forma uma gola à volta do pescoço. O estalão admite muitas cores uniformes, como laranja, creme, branco, preto e castanho, mas nunca merle; o PetPrep desenha uma pelagem natural, sem tosquia.",
        "A FCI descreve o seu caráter como sociável e alegre, e o estalão do Royal Kennel Club como extrovertido, vivo e inteligente. O Royal Kennel Club recomenda até 30 minutos de exercício por dia e considera-o adequado a um apartamento; a PDSA diz que a pelagem dupla precisa de escovagem duas a três vezes por semana. O AKC diz que os pomerânias costumam ser mais adequados a famílias com crianças mais velhas, que se podem dar bem com outros animais se forem socializados cedo, e recomenda vivamente a socialização precoce e aulas para cachorros. O Royal Kennel Club indica uma esperança de vida de mais de 12 anos.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "Boston, American Gentleman",
      text: [
        "O Boston terrier é originário dos Estados Unidos. O estalão FCI descreve um cão vivo, muito inteligente, de pelo liso, cabeça curta, constituição compacta, cauda curta e bem equilibrado, tigrado, foca ou preto e uniformemente marcado com branco: são obrigatórios uma faixa branca no focinho, uma lista branca entre os olhos e o antepeito branco, e o tigrado é preferido. O PetPrep desenha-o tigrado e branco, com focinho moderado, narinas abertas e orelhas e cauda naturais.",
        "É uma raça de focinho achatado (braquicéfala), e a PDSA avisa que nunca deve fazer exercício nas horas de calor, porque tem tendência para sobreaquecer. O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem uma vez por semana, considera-o adequado a um apartamento e indica uma esperança de vida de mais de 10 anos. A PDSA considera os Boston terriers cães de família perfeitos, especialmente bons com crianças quando bem socializados em cachorros; o AKC diz que se dão bem com crianças que sabem ser meigas com os animais, que não lidam bem com longos períodos sozinhos, e recomenda vivamente a socialização precoce e o treino de cachorros.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "Mini aussie, Pastor australiano miniatura, Miniature American Shepherd",
      text: [
        "O pastor americano miniatura é originário dos Estados Unidos. O estalão FCI descreve um pequeno cão de pastor com fortes instintos de pastoreio e de guarda, inteligente e sobretudo um cão de trabalho, um pouco mais comprido do que alto, com pelo de comprimento médio, liso a ondulado e resistente às intempéries. As cores são preto, azul merle, vermelho e vermelho merle, com ou sem marcas brancas e fogo, e os olhos podem ser castanhos, azuis, avelã ou âmbar. O PetPrep desenha-o azul merle com a cauda natural.",
        "A PetMD diz que tem muita energia e precisa de pelo menos uma hora de exercício todos os dias, idealmente duas, além de tarefas que lhe mantenham a cabeça ocupada, e que deve ser escovado duas vezes por semana; o AKC diz que uma escovagem semanal chega durante a maior parte do ano, com escovagem diária na época da muda. O AKC diz que pode ser um ótimo cão de família com treino de obediência e socialização precoce, e que costuma ser bom com crianças, mas pode tentar arrebanhá-las; a PetMD acrescenta que a dedicação à família pode levar a ansiedade de separação quando fica sozinho. A PetMD indica uma esperança de vida de 12 a 13 anos.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "Chi, Chihuahueño, Chihuahua de pelo curto",
      text: [
        "O chihuahua é originário do México. O estalão do Kennel Club descreve um cão pequeno, delicado e compacto, de expressão atrevida e temperamento alegre, cheio de vida e inteligente, com um crânio bem arredondado «em forma de maçã», um focinho moderadamente curto e ligeiramente pontiagudo, olhos grandes e redondos que não são salientes, orelhas grandes e cauda em forma de foice; é admitida qualquer cor ou mistura de cores, mas nunca merle, e o peso preferido é de 1,8–2,7 kg. O Royal Kennel Club considera o chihuahua de pelo curto e o de pelo comprido duas raças; o PetPrep desenha o de pelo curto, em fulvo, com uma cabeça moderada.",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem uma vez por semana, considera-o adequado a um apartamento e indica uma esperança de vida de mais de 12 anos. A PDSA diz que os chihuahuas são tão pequenos e leves que as crianças têm vontade de lhes pegar ao colo, o que provavelmente não lhes agrada, por isso são mais adequados a famílias com crianças um pouco mais velhas. A PDSA acrescenta que, como cães de companhia, adoram companhia e precisam de alguém em casa a toda a hora, e que devem ser socializados desde cedo com muitas pessoas, experiências e lugares diferentes.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "Springer, English Springer Spaniel, ESS",
      text: [
        "O springer spaniel inglês é originário da Grã-Bretanha, onde foi criado para encontrar, levantar e cobrar a caça. O estalão do Kennel Club descreve um cão de construção simétrica, compacto, forte, alegre e ativo – o mais alto dos spaniels de terra britânicos – de temperamento simpático, feliz e dócil, com orelhas compridas e franjadas, olhos cor de avelã escura e um pelo cerrado, liso e resistente às intempéries; as cores são fígado e branco ou preto e branco, ambas com ou sem marcas fogo, e a altura aproximada é de 51 cm. O PetPrep desenha-o fígado e branco, com a cauda natural.",
        "O Royal Kennel Club recomenda mais de 2 horas de exercício por dia e cuidados com a pelagem mais de uma vez por semana, e indica uma esperança de vida de mais de 10 anos. A PDSA diz que os springers são bons cães de família, que se dão bem com crianças e com os outros animais da casa, são obedientes e gostam de aprender, e precisam de escovagem uma ou duas vezes por semana e de tosquia a cada 3 meses. O AKC acrescenta que não devem ficar sozinhos durante longos períodos e que a socialização precoce e as aulas para cachorros são essenciais.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "Sheltie, Shetland Sheepdog, Collie das Shetland (antigo nome)",
      text: [
        "O pastor de Shetland é originário da Grã-Bretanha e é um pequeno cão de trabalho de pelo comprido. O estalão FCI descreve um cão atento, meigo, inteligente, forte e ativo, afetuoso e leal ao dono e reservado com estranhos, com a cabeça em forma de cunha comprida e romba, orelhas pequenas semieretas com as pontas caídas para a frente e uma pelagem dupla com pelo de cobertura comprido e áspero; as cores são zibelina, tricolor, azul merle, preto e branco e preto e fogo, e a altura ideal é de 37 cm nos machos e 35,5 cm nas fêmeas. O PetPrep desenha-o zibelina e branco.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem todos os dias, e indica uma esperança de vida de mais de 10 anos. A PDSA diz que os shelties são cães muito meigos, brincalhões e obedientes, que muitas vezes se adaptam bem à vida em família e se dão alegremente com crianças, e que o treino e a socialização são muito importantes em idade jovem. O AKC acrescenta que precisam de exercício mental e físico regular, que ficam melhor com crianças mais velhas por causa do instinto de pastoreio e que são conhecidos por serem muito vocais.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "Epagneul breton, Bretão, Brittany Spaniel",
      text: [
        "O épagneul bretão é um cão de parar originário de França, onde se chama Epagneul Breton. O Royal Kennel Club descreve um cão muito enérgico e inteligente que caça, para e cobra, meigo e afetuoso mas cheio de vida e entusiasmo, com pelo denso e bastante fino, orelhas triangulares inseridas no alto e uma cauda muitas vezes naturalmente curta; as cores do estalão são laranja, fígado ou preto com branco, ruão ou tricolor, e a altura é de 48–51 cm nos machos e 47–50 cm nas fêmeas. O PetPrep desenha-o laranja e branco.",
        "O Royal Kennel Club recomenda mais de 2 horas de exercício por dia e cuidados com a pelagem mais de uma vez por semana, e indica uma esperança de vida de mais de 10 anos. O AKC diz que os bretões são cães com muita energia, que precisam de muito exercício e estímulo mental, que são meigos e costumam ser pacientes com crianças, e que uma escovagem semanal os mantém com o melhor aspeto. A PetMD acrescenta que a socialização precoce dos cachorros é obrigatória, que não lidam bem com longos períodos sozinhos e que, criados para caçar aves, têm um forte instinto de caça.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker americano, American Cocker Spaniel",
      text: [
        "O cocker spaniel americano – nos Estados Unidos simplesmente Cocker Spaniel – é uma raça diferente do cocker spaniel inglês. O estalão do AKC diz que é o membro mais pequeno do grupo dos cães de caça (Sporting Group), com orelhas compridas, lobuladas e bem franjadas, crânio arredondado e focinho largo e profundo, e um pelo sedoso, liso ou ligeiramente ondulado; existe em preto, em qualquer cor uniforme do creme mais claro ao vermelho mais escuro, e em cores combinadas com branco. O estalão pede um temperamento equilibrado, sem qualquer sinal de timidez.",
        "O Royal Kennel Club recomenda cuidados com a pelagem todos os dias e mais de 2 horas de exercício por dia, e indica uma esperança de vida de mais de 10 anos; o AKC e a PetMD escrevem que não precisa de muito exercício. A PetMD considera estes cães de temperamento doce ótimos cães de família, simpáticos com pessoas e outros animais, e aconselha a começar cedo a socialização e o treino; a VCA escreve que costumam ser muito bons com crianças, têm tendência para engordar e precisam que lhes verifiquem as orelhas todas as semanas.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "Malinois, Pastor belga, Belgian Malinois",
      text: [
        "O pastor belga malinois é a variedade de pelo curto do pastor belga, uma raça de pastoreio originária da Bélgica. O estalão FCI descreve um cão de proporções harmoniosas que combina elegância e força, e admite uma só cor: fulvo carvoado com máscara preta. Os estalões da FCI e do AKC descrevem orelhas bastante pequenas, erguidas e triangulares, um pelo curto e duro com subpelo denso e um temperamento atento, inteligente, curioso e confiante.",
        "O Royal Kennel Club recomenda mais de 2 horas de exercício por dia e cuidados com a pelagem mais de uma vez por semana, e indica uma esperança de vida de mais de 10 anos. O AKC escreve que não é uma boa escolha para quem tem cão pela primeira vez, que fica melhor com crianças mais velhas e responsáveis e que não deve ficar sozinho durante muito tempo; a PetMD refere um forte instinto de caça e diz que pode tentar arrebanhar as crianças e que precisa de treino diário constante e de socialização precoce.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "Basset",
      text: [
        "O basset hound é um sabujo de patas curtas originário da Grã-Bretanha. O estalão FCI descreve um sabujo com muita substância, bem equilibrado, plácido, nunca agressivo nem tímido, e afetuoso, com orelhas compridas e aveludadas inseridas baixo, pelo liso e curto e as cores preto, branco e fogo ou limão e branco. O Breed Watch do Royal Kennel Club pede aos juízes de exposição que estejam atentos a pálpebras viradas para dentro ou para fora, orelhas muito compridas, pregas da pele irritadas e excesso de pele.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem uma vez por semana, e indica uma esperança de vida de mais de 10 anos. A PDSA descreve um cão tolerante, que se dá muito bem com crianças e adora companhia, com um apetite saudável que é preciso vigiar; aconselha a verificar as pregas da pele todos os dias e a deixar um intervalo entre a refeição e o exercício. O AKC acrescenta que o faro o pode desviar, por isso trelas seguras e zonas vedadas são importantes.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "Vizsla, Magyar Vizsla, Braco húngaro",
      text: [
        "O braco húngaro de pelo curto é um cão de caça elegante, de tamanho médio, originário da Hungria, com pelo curto dourado-ruivo. O estalão FCI descreve um cão vivo, simpático e de temperamento equilibrado, fácil de treinar e que mantém um contacto próximo com o condutor; as cores são tons de dourado-ruivo e de dourado-areia escuro. O Breed Watch do Royal Kennel Club não indica pontos de preocupação específicos da raça.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e cuidados com a pelagem uma vez por semana, e indica uma esperança de vida de mais de 12 anos. A PDSA descreve um cão muito ligado às pessoas, que adora companhia e pode sofrer de ansiedade de separação quando fica sozinho; dá-se bem com crianças mais velhas, mas a PDSA não o recomendaria para famílias com crianças muito pequenas nem para quem tem cão pela primeira vez, e por causa do forte instinto de caça desaconselha mantê-lo com animais mais pequenos. A PDSA aconselha também a deixar um intervalo entre a refeição e o exercício.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "Cocker, Cocker inglês, English Cocker Spaniel, Merry Cocker",
      text: [
        "O cocker spaniel inglês – na Grã-Bretanha simplesmente Cocker Spaniel – é uma raça diferente do cocker spaniel americano. O estalão FCI descreve um cão de caça alegre, robusto e desportivo, bem equilibrado e compacto, com orelhas lobuladas inseridas baixo e um pelo liso e sedoso; o estalão do AKC descreve-o como alegre e afetuoso, de temperamento equilibrado, e indica preto, fígado e tons de vermelho uniformes, bem como cores combinadas com branco. O Breed Watch do Royal Kennel Club não indica pontos de preocupação específicos da raça.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem todos os dias, e indica uma esperança de vida de mais de 10 anos; um estudo VetCompass de cocker spaniels ingleses no Reino Unido encontrou uma idade mediana à morte de 11,44 anos. A PDSA diz que, graças à sua personalidade paciente, costuma dar-se bem com crianças, sempre sob vigilância, mas avisa que é conhecido pela ansiedade de separação e nunca deve ficar sozinho mais de quatro horas. A PDSA aconselha também uma escovagem diária e um intervalo entre a refeição e o exercício.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "Maltês, Bichon Maltais, Maltese",
      text: [
        "O bichon maltês é um cão toy da região central do Mediterrâneo, hoje sob patrocínio italiano na FCI. O estalão FCI descreve um cão pequeno, de corpo alongado, vivo, afetuoso, muito calmo e muito inteligente, com 3–4 kg, e um pelo muito comprido, denso e sedoso que cai pesadamente sobre todo o corpo. A pelagem não tem subpelo, e o branco puro é a única cor (é permitido um ligeiro tom marfim pálido). O Breed Watch do Royal Kennel Club não indica pontos de preocupação específicos da raça.",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem todos os dias, diz que a raça não perde pelo e indica uma esperança de vida de mais de 12 anos. A PDSA descreve um cão esperto, simpático e afetuoso, que pode ser reservado com estranhos mas que, com a socialização certa em jovem, aprende a ser confiante e sociável. A PetMD avisa que pode desenvolver ansiedade de separação quando fica sozinho demasiado tempo, diz que a interação com crianças pequenas deve ser vigiada e aconselha a escovar-lhe os dentes todos os dias.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "Carlino, Mops, Carlin",
      text: [
        "O pug é um pequeno cão de companhia originário da China, hoje sob patrocínio britânico na FCI. O estalão FCI descreve um cão claramente quadrado e atarracado – «multum in parvo» – com muito encanto, dignidade e inteligência e um temperamento equilibrado, alegre e vivo, um peso ideal de 6,3–8,1 kg, um pelo fino, liso, curto e brilhante, prateado, damasco, fulvo ou preto, e uma cauda bem enrolada sobre a anca. Pede narinas bastante grandes e bem abertas e considera inaceitáveis narinas apertadas e uma prega pesada por cima do nariz. O Royal Kennel Club coloca a raça na categoria 3 do Breed Watch, com pontos de preocupação que incluem dificuldade respiratória, olhos salientes, dermatite das pregas cutâneas e excesso de peso.",
        "A PDSA considera o pug uma raça muito braquicéfala (de focinho achatado), que pode ficar facilmente sem fôlego, aconselha a evitar o exercício com calor e diz que os seus veterinários recomendariam vivamente, em vez dele, uma raça com focinho normal ou um cruzamento de pug. O Royal Kennel Club recomenda até 1 hora de exercício por dia e cuidados com a pelagem uma vez por semana, diz que a raça perde pelo e indica uma esperança de vida de mais de 10 anos. A PDSA descreve um cão que muitas vezes se dá bem com crianças e outros animais, mas que adora companhia e não lida bem com a solidão; a PetMD aconselha a limpar e secar as pregas da pele do focinho todos os dias e refere que a obesidade é comum na raça.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "Collie, Rough Collie",
      text: [
        "O collie de pelo comprido é um grande cão de pastor originário da Grã-Bretanha. O estalão FCI descreve um cão de grande beleza, de dignidade impassível, de temperamento simpático e sem qualquer traço de nervosismo ou agressividade, com uma pelagem muito densa de pelo de cobertura liso e áspero, e três cores: zibelina, tricolor e azul merle. O estalão do Royal Kennel Club considera-o um ótimo cão de companhia, simpático, alegre e ativo, bom com crianças e com outros cães, e indica uma altura de 56–61 cm nos machos e 51–56 cm nas fêmeas. O Royal Kennel Club coloca a raça na categoria 2 do Breed Watch e não regista cachorros de cruzamentos merle com merle.",
        "O Royal Kennel Club recomenda até 1 hora de exercício por dia e cuidados com a pelagem todos os dias, diz que a raça perde pelo e indica uma esperança de vida de mais de 12 anos. A PetMD diz que os collies são afetuosos, sobretudo com crianças, e bons com outros animais, mas que não lidam bem com longos períodos sozinhos e podem mordiscar tornozelos e calcanhares quando estão excitados. Refere também que a socialização do cachorro é crucial e que nos collies ocorre a mutação MDR1, que afeta a forma como um cão processa certos medicamentos.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "Mastim inglês, English Mastiff, Old English Mastiff",
      text: [
        "O mastiff é uma raça de guarda muito grande originária da Grã-Bretanha. O estalão FCI descreve uma combinação de grandeza e coragem – calmo, afetuoso com os donos mas capaz de guardar – com uma cabeça de aspeto quadrado, um corpo largo, profundo e poderoso e um pelo curto e bem assente, damasco, fulvo ou tigrado. A PDSA indica uma altura média de 71–78 cm e um peso médio de 80–85 kg e refere que o Kennel Club classifica o mastiff na categoria três: raças com problemas de conformação visíveis que podem causar dor, desconforto ou problemas de saúde.",
        "A PDSA recomenda cerca de uma hora de exercício por dia para cães adultos – mas sem exercício excessivo enquanto os ossos e as articulações do cachorro ainda se estão a desenvolver – cuidados com a pelagem uma vez por semana com limpeza diária das rugas do focinho, e indica uma esperança de vida média de menos de 10 anos. A PetMD considera os mastiffs ótimos cães de família para casas com crianças que sabem interagir com animais, embora talvez não com crianças muito pequenas ou bebés, por causa do tamanho; costumam dar-se bem com outros animais apresentados quando são cachorros, babam-se muito e não devem fazer exercício durante uma hora antes e depois das refeições, por causa do risco de dilatação-torção gástrica.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "Shiba, Shiba japonês",
      text: [
        "O shiba inu é um pequeno spitz originário do Japão; o nome significa «cão pequeno» e, segundo o Royal Kennel Club, foi desenvolvido para caçar pequenas aves de caça. O estalão FCI descreve um cão pequeno, bem equilibrado e de boa ossatura, de temperamento fiel, sentidos apurados e muito atento, com pelo de cobertura áspero sobre um subpelo macio e denso, orelhas pequenas, triangulares e erguidas e uma cauda grossa e enrolada; as cores são vermelho, preto e fogo e sésamo, sempre com marcas esbranquiçadas «urajiro» nas bochechas, no peito e na parte de baixo do corpo. O estalão do AKC indica um peso médio de cerca de 23 libras (10 kg) nos machos e 17 libras (8 kg) nas fêmeas.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem uma vez por semana, refere que a raça perde pelo e indica uma esperança de vida de mais de 10 anos; um grande estudo britânico encontrou uma esperança de vida mediana de 14,6 anos. O AKC descreve um cão confiante e independente, que é uma escolha melhor para um dono experiente, que fica mais feliz com crianças mais velhas e que nunca deve andar sem trela fora de uma zona vedada ou fechada. A PetMD acrescenta que precisa de muito estímulo mental, que beneficia da socialização em cachorro e que deve ter os dentes escovados todos os dias.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "Ridgeback, cão-leão africano",
      text: [
        "O Rhodesian ridgeback é originário da África Austral. A sua característica mais conhecida é a crista no dorso, uma faixa de pelo que cresce no sentido contrário ao resto da pelagem. O estalão FCI descreve um cão bem equilibrado, forte, musculado, ágil e ativo, digno, inteligente e distante com estranhos, especialmente apreciado como cão de guarda e de família. O pelo curto e denso vai do trigo claro ao trigo avermelhado, e o estalão indica um peso de cerca de 36,5 kg nos machos e 32 kg nas fêmeas.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e cuidados com a pelagem uma vez por semana, refere que a raça perde pelo e se adapta a uma casa grande com um jardim grande, e indica uma esperança de vida de mais de 10 anos. A PDSA descreve cães brincalhões, poderosos e muito leais, com um instinto de caça muito forte, que não são recomendados para quem tem cão pela primeira vez, que nunca devem ficar sozinhos mais de quatro horas e que precisam de socialização desde cedo; aconselha também um intervalo entre a refeição e o exercício. A Woodgreen acrescenta que ficam melhor com crianças mais velhas.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "Epagneul anão continental, Phalène (variedade de orelhas caídas), cão-borboleta",
      text: [
        "O papillon é a variedade de orelhas erguidas do epagneul anão continental, uma raça originária da Bélgica e de França; a variedade de orelhas caídas chama-se phalène. O estalão FCI descreve um pequeno spaniel toy elegante, de pelo comprido e personalidade viva, com cerca de 28 cm de altura e um peso de até 4,5 kg nos machos e 5 kg nas fêmeas. As orelhas grandes lembram as asas abertas de uma borboleta, e a pelagem é sempre branca com manchas de cor.",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem mais de uma vez por semana, refere que a raça perde pelo e pode viver num apartamento, e indica uma esperança de vida de mais de 12 anos. A PDSA descreve cães meigos, brincalhões e muito obedientes, que se dão bem com toda a gente e precisam de treino e socialização desde cedo; sugere cuidados com a pelagem duas a três vezes por semana. A PetMD acrescenta que os papillons precisam de estímulo mental diário, podem desenvolver ansiedade de separação e devem ter os dentes escovados todos os dias, e que crianças muito pequenas podem magoar sem querer um cão tão pequeno.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão d’água, Cão de água algarvio, Portuguese Water Dog, Portie",
      text: [
        "O cão de água português é originário de Portugal, onde trabalhava com os pescadores. O estalão do Royal Kennel Club descreve um cão robusto, quase quadrado e muito musculado – muito inteligente e com uma energia enorme, com grandes capacidades de natação e mergulho – com 50–57 cm (machos) e 43–52 cm (fêmeas) de altura e 19–25 kg (machos) e 16–22 kg (fêmeas) de peso. A pelagem abundante, sem subpelo, é preta, branca, castanha, ou preta ou castanha com branco; a tradicional tosquia «à leão» deixa curtos o focinho e os quartos traseiros.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem todos os dias, refere que a raça não perde pelo e se adapta a uma casa grande, e indica uma esperança de vida de mais de 10 anos. A PDSA descreve cães muito simpáticos e carinhosos, que se dão bem com outros animais, são excelentes cães de família e precisam de treino e socialização desde cedo; acrescenta tosquia e modelação por um tosquiador profissional ao longo do ano.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon à poil frisé, Bichon, Bichon Tenerife",
      text: [
        "O bichon frisé é um cão de companhia franco-belga. O estalão FCI descreve um cãozinho alegre, de andar vivo, com um pelo branco muito solto e encaracolado em saca-rolhas – um verdadeiro companheiro que pode ir a todo o lado, nem nervoso nem dado a ladrar muito – com 25–29 cm ao garrote e cerca de 5 kg. Um adulto é sempre branco puro, com olhos redondos muito escuros, nariz preto, orelhas caídas e uma cauda com franja levantada sobre o dorso.",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem todos os dias, refere que a raça não perde pelo e se adapta a um apartamento, e indica uma esperança de vida de mais de 12 anos. A PDSA descreve cães muito afetuosos e carinhosos, excelentes com crianças e com outros animais, e acrescenta que a pelagem precisa de ser aparada de dois em dois meses, muitas vezes por um tosquiador profissional.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfoundland, Newfie",
      text: [
        "O terra-nova é originário do Canadá; a FCI classifica-o entre os molossoides do tipo montanha e reconhece três cores: preto, branco e preto (Landseer) e castanho. A PDSA chama aos terra-novas gigantes meigos e indica uma altura média de 66–71 cm e um peso médio de 50–69 kg; a PetMD acrescenta que a história da raça faz deles nadadores naturais.",
        "A PDSA recomenda pelo menos uma hora de exercício por dia para adultos, mas sem exercício excessivo nos cachorros enquanto os ossos e as articulações ainda se estão a desenvolver; considera os cuidados com a pelagem uma tarefa diária, refere que os terra-novas costumam babar-se e indica uma esperança de vida de menos de 10 anos. A PetMD considera a raça um cão de família excelente, que se dá bem com crianças, animais pequenos e outros cães, aconselha a vigiar as crianças pequenas com qualquer cão e avisa que alguns podem desenvolver ansiedade de separação quando ficam sozinhos.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "Cão de carruagem, Dalmatian",
      text: [
        "O dálmata é originário da Croácia; a FCI classifica-o entre as raças aparentadas com os sabujos. O pelo curto e brilhante é branco puro com manchas pretas ou fígado (castanhas) bem definidas, e o estalão pede orelhas manchadas. A FCI indica uma altura de 56–62 cm nos machos e 54–60 cm nas fêmeas; a PDSA indica um peso médio de 18–27 kg.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e escovagem uma vez por semana, e diz que a raça perde pelo e se adapta a uma casa e um jardim grandes. A PDSA considera os dálmatas ótimos cães para famílias ativas, mais adequados a crianças mais velhas, que precisam de companhia e nunca devem ficar sozinhos mais de quatro horas; aponta a surdez entre os problemas de saúde da raça e refere que existe um teste de audição BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "Australian Cattle Dog, Blue Heeler, Red Heeler, Queensland Heeler",
      text: [
        "O boieiro australiano é originário da Austrália; a FCI classifica-o entre os boieiros. O estalão do Kennel Club descreve um cão de trabalho forte e compacto, com uma pelagem dupla lisa e resistente às intempéries, azul (mosqueado ou salpicado) ou vermelho salpicado uniforme, e indica uma altura de 46–51 cm nos machos e 43–48 cm nas fêmeas; a PDSA indica um peso médio de 16–20 kg.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e escovagem uma vez por semana, e diz que a raça perde pelo. A PDSA descreve um cão muito inteligente e com muita energia, que precisa de muita atividade física e mental; por causa do forte instinto de pastoreio pode mordiscar os calcanhares das crianças que correm, e a socialização e o treino desde cedo ajudam.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "Snap dog",
      text: [
        "O whippet é originário da Grã-Bretanha; a FCI classifica-o entre os lebréus de pelo curto. O estalão do Kennel Club descreve uma combinação equilibrada de força e potência muscular com elegância e graça de linhas, um pelo fino, curto e cerrado de qualquer cor ou mistura de cores exceto merle, e um temperamento meigo, afetuoso e equilibrado; indica uma altura de 47–51 cm nos machos e 44–47 cm nas fêmeas, e a PDSA indica um peso médio de 11–18 kg.",
        "A PDSA recomenda pelo menos uma hora de exercício todos os dias, com oportunidades para correr sem trela numa zona segura, e uma escovagem semanal com uma escova macia. Diz que os whippets são uma escolha popular para famílias, porque são calmos e meigos com crianças, mas recomenda uma casa com crianças um pouco mais velhas; os whippets não gostam de ficar sozinhos e têm um instinto de caça mesmo muito forte, por isso a PDSA não recomenda tê-los com animais mais pequenos. Um casaco pode ajudar no inverno, e uma cama grossa e macia protege os ossos salientes.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "Griffon Korthals, Korthals, Griff",
      text: [
        "O griffon de aponte de pelo duro Korthals, também chamado griffon Korthals, é originário de França; a FCI classifica-o entre os cães de parar continentais e descreve-o essencialmente como um cão de parar versátil. O estalão FCI descreve um cão vigoroso e rústico, mais comprido do que alto, com pelo duro e áspero, nunca encaracolado nem lanoso, nariz sempre castanho e, de preferência, uma pelagem cinzento-aço com manchas castanhas (fígado); indica uma altura de cerca de 55–60 cm nos machos e 50–55 cm nas fêmeas e descreve a raça como meiga, orgulhosa e muito meiga com crianças. A PetMD indica um peso de 35–70 libras (cerca de 16–32 kg).",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, uma casa grande e um jardim grande, e cuidados com a pelagem mais de uma vez por semana. A PetMD aconselha uma escovagem semanal (alguns cães precisam também de trimming à mão), diz que os griffons costumam ser pacientes e meigos com crianças quando socializados em cachorros, e refere que o seu passado de caça lhes pode dar um forte instinto de caça, por isso animais mais pequenos, como gatos e coelhos, podem parecer algo para perseguir.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "Chessie",
      text: [
        "O Chesapeake Bay retriever, muitas vezes chamado chessie, é originário dos Estados Unidos; a FCI classifica-o entre os retrievers. O estalão FCI descreve um retriever de trabalho igualmente competente em terra e na água, cujo tamanho e substância não devem ser excessivos, com um pelo grosso e curto sobre um subpelo denso e lanoso e olhos claros amarelados ou âmbar; é aceite qualquer tom de castanho, junça ou erva seca, e uma pelagem preta é desqualificante. Indica uma altura de 58–66 cm e um peso de 29,5–36,5 kg nos machos, e 53–61 cm e 25–32 kg nas fêmeas.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, uma casa grande e um jardim grande, e cuidados com a pelagem uma vez por semana. A PetMD descreve um cão esperto, alegre e extremamente afetuoso, que pode tornar-se destrutivo se não for estimulado ou ficar sozinho demasiado tempo, diz que, com as apresentações e a socialização certas, os chessies são um ótimo acréscimo a uma família, e aconselha a não deixar o cão fazer exercício imediatamente antes ou depois de comer.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "Samoyed, Sammy",
      text: [
        "O samoiedo é originário do norte da Rússia e da Sibéria; a FCI classifica-o entre os cães nórdicos de trenó. O estalão FCI descreve um spitz ártico branco e elegante de tamanho médio, com uma pelagem polar abundante, grossa e densa, olhos castanho-escuros, orelhas pequenas, grossas e erguidas e lábios ligeiramente virados para cima nos cantos, no característico «sorriso do samoiedo»; a pelagem é branco puro, creme ou branco e biscoito, e olhos azuis ou de cores diferentes são desqualificantes. Indica uma altura ideal de 57 cm nos machos e 53 cm nas fêmeas, cada uma com uma tolerância de 3 cm.",
        "A PDSA recomenda um mínimo de duas horas de exercício todos os dias e cuidados com a pelagem diários, diz que os samoiedos perdem pelo com muita frequência, costumam ser ótimos com crianças e leais a toda a família, nunca devem ficar sozinhos mais de quatro horas, precisam de um jardim muito seguro por serem exímios fugitivos e têm um forte instinto de caça, e aconselha a deixar um intervalo depois de comer e antes do exercício. A PetMD acrescenta que os samoiedos não lidam bem com temperaturas altas.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "Scottie, Terrier escocês, Aberdeen Terrier",
      text: [
        "O Scottish terrier, muitas vezes chamado scottie, é originário da Grã-Bretanha; a FCI classifica-o entre os terriers de pequeno porte. O estalão do Kennel Club descreve um cão atarracado e de patas curtas, de porte atento, que sugere grande força e atividade num tamanho pequeno, leal e fiel, digno, independente e reservado, mas corajoso e muito inteligente – ousado, mas nunca agressivo. A pelagem dupla, bem assente, tem um pelo de cobertura áspero e duro; a cor é preto, trigo ou tigrado de qualquer tom. Indica uma altura de 25–28 cm e um peso de 8,5–10,5 kg.",
        "A PDSA diz que os scotties precisam de cerca de uma hora de exercício diário e de cuidados com a pelagem diários, com trimming e tosquia por um tosquiador profissional a cada dois a três meses, descreve-os como leais e dedicados à família e diz que podem ser teimosos, por isso o treino exige paciência e empenho. A PetMD diz que, com o treino e a socialização certos, podem ser bons cães de família, que socializar o cachorro é importante e que não devem ficar sozinhos durante longos períodos.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "Weimaraner, Weim",
      text: [
        "O braco de Weimar é originário da Alemanha; a FCI classifica-o entre os cães de parar continentais e reconhece uma variedade de pelo curto e outra de pelo comprido. O estalão FCI descreve um cão de caça de tamanho médio a grande, de tipo funcional de trabalho, nervudo e muito musculado, com olhos cor de âmbar e orelhas largas e bastante compridas; a pelagem é cinzento-prateado, cinzento-corço ou cinzento-rato, só são admitidas pequenas marcas brancas no peito e nos dedos, e qualquer cor que não seja cinzento é desqualificante. Indica uma altura de 59–70 cm e um peso de cerca de 30–40 kg nos machos, e 57–65 cm e cerca de 25–35 kg nas fêmeas.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, uma casa grande e um jardim grande, e cuidados com a pelagem uma vez por semana. A PDSA diz que os bracos de Weimar são maravilhosos cães de família nas mãos certas e ficam melhor com donos que conhecem a raça, mas não os recomenda para casas com crianças mais pequenas ou animais mais pequenos, por causa do instinto de caça muito forte, diz que podem desenvolver ansiedade de separação se ficarem sozinhos e aconselha a socializá-los desde cedo e a deixar um intervalo entre a refeição e o exercício. A PetMD acrescenta limpeza mensal das orelhas e um banho mensal.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "Galgo italiano, Piccolo Levriero Italiano, Italian Greyhound, Iggy",
      text: [
        "O pequeno lebréu italiano é originário de Itália; a FCI classifica-o, como Piccolo Levriero Italiano, entre os lebréus de pelo curto. O estalão do Kennel Club descreve um greyhound em miniatura, mais esguio em todas as proporções, elegante, gracioso e de movimentos rápidos, inteligente, afetuoso e vivo, embora possa parecer distante, com um pelo curto, fino e brilhante sobre uma pele fina. Indica uma altura de 32–38 cm e um peso de 3,6–4,5 kg; são aceites preto, azul, creme, fulvo, vermelho e branco, ou qualquer destas cores com branco – nunca merle, tigrado ou marcas fogo.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia, diz que a raça se adapta a uma casa pequena e tanto à cidade como ao campo, precisa de cuidados com a pelagem uma vez por semana e não perde pelo. A PDSA diz que os pequenos lebréus italianos são cheios de energia, devem fazer exercício numa zona fechada, porque pode ser difícil chamá-los depois de verem uma presa, podem ser tímidos, por isso a socialização precoce é essencial, e – porque os ossos são frágeis enquanto crescem – podem não ser a raça ideal para casas com crianças pequenas ou outros animais. A PetMD acrescenta que o pelo fino não os aquece, por isso sentem facilmente o frio.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "Riesenschnauzer, Schnauzer de Munique",
      text: [
        "O schnauzer gigante é originário da Alemanha; a FCI classifica-o, como Riesenschnauzer, entre os cães do tipo pinscher e schnauzer. O estalão do Royal Kennel Club descreve um cão de constituição poderosa, robusto e nervudo, de aspeto quase quadrado, ousado, fiável, de bom temperamento e sereno, com um pelo de cobertura áspero e duro e um bom subpelo. Indica uma altura de 65–70 cm nos machos e 60–65 cm nas fêmeas; o estalão FCI indica um peso de 35–47 kg. São aceites preto puro, sal e pimenta com máscara escura e preto e prateado – nenhuma outra cor.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, diz que a raça se adapta a uma casa grande com um jardim grande, precisa de cuidados com a pelagem todos os dias e não perde pelo. A PDSA diz que a pelagem precisa de cuidados diários e de ser aparada regularmente, que os schnauzers gigantes podem ser cães adoráveis para famílias com crianças mais velhas se forem bem socializados em cachorros, e que estes cães de personalidade forte são adequados a donos experientes. A PetMD acrescenta que a pelagem é tratada com trimming à mão por um profissional de poucos em poucos meses e que a raça não se dá bem em casas onde as pessoas passam pouco tempo.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "Santo Humberto, Chien de Saint-Hubert, Bloodhound",
      text: [
        "O cão de Santo Humberto é originário da Bélgica, onde a FCI o regista como Chien de Saint-Hubert, um grande sabujo. O estalão FCI descreve o mais poderoso de todos os sabujos: meigo, plácido, bondoso e sociável com as pessoas e particularmente apegado ao dono, com um pelo curto, denso e resistente às intempéries e uma pele flexível e solta. Os machos pesam cerca de 46–54 kg e as fêmeas cerca de 40–48 kg; as três cores são preto e fogo, fígado e fogo, e vermelho.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, diz que a raça se adapta a uma casa grande com um jardim grande, precisa de cuidados com a pelagem uma vez por semana e perde pelo. A PDSA diz que os cães de Santo Humberto são mais adequados a donos experientes, não são recomendados para casas com crianças mais pequenas ou animais mais pequenos, por causa do tamanho e do instinto de caça muito forte, babam-se e precisam de ter as pregas da pele limpas e secas. Aconselha também a deixar um intervalo entre a refeição e o exercício.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "Akita, American Akita, Grande cão japonês",
      text: [
        "O akita deste registo é o tipo americano: a FCI regista-o como akita americano, uma raça de origem japonesa, distinta do akita inu japonês. O estalão FCI descreve um cão grande, de constituição sólida, bem equilibrado, com muita substância e ossatura pesada, orelhas pequenas e erguidas e uma cauda grande levantada sobre o dorso; os machos medem 66–71 cm ao garrote. É admitida qualquer cor, como vermelho, fulvo, branco, malhado ou tigrado. A PDSA indica um peso médio de 31–59 kg.",
        "A PDSA descreve animais de família incrivelmente leais, independentes e muito grandes, por isso ficam melhor com donos experientes; não recomendaria um akita para uma casa com crianças pequenas e desaconselha deixá-los sozinhos, porque muitos não lidam bem com isso. Recomenda pelo menos duas horas de exercício todos os dias, socialização desde cedo, um intervalo entre a refeição e o exercício e pelo menos uma escovagem semanal – os akitas perdem muito pelo. Refere ainda um forte instinto de caça e que podem sobreaquecer com muito calor.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Corgi, Cardigan Welsh Corgi, Cardi",
      text: [
        "O Welsh corgi Cardigan é originário da Grã-Bretanha; a FCI classifica-o entre os boieiros. O estalão do American Kennel Club indica uma altura de 10,5–12,5 polegadas (cerca de 27–32 cm) ao garrote e um peso ideal de 30–38 libras (cerca de 14–17 kg) nos machos. Ao contrário do seu primo Pembroke, tem uma cauda comprida e farta.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia, considera suficiente uma casa pequena com um jardim pequeno ou médio, e diz que a raça precisa de cuidados com a pelagem mais de uma vez por semana e perde pelo; indica uma esperança de vida de mais de 12 anos e classifica o Cardigan como raça autóctone vulnerável. A PDSA diz que os welsh corgis estão dispostos a agradar, por isso o treino deve ser bastante fácil, que duas a três escovagens por semana costumam chegar e que podem mordiscar os calcanhares das crianças que correm – a socialização com crianças e o treino desde cedo ajudam.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Drahthaar, Deutsch Drahthaar, GWP",
      text: [
        "O braco alemão de pelo duro é originário da Alemanha; a FCI classifica-o, como Deutsch Drahthaar, entre os cães de parar continentais. O estalão do Royal Kennel Club descreve um cão de caça de tamanho médio, com pelo duro que cobre completamente a pele – meigo, afetuoso e de temperamento equilibrado, atento, dócil e muito leal. Os machos medem 60–67 cm e pesam 25–34 kg; as fêmeas medem 56–62 cm e pesam 20,5–29 kg. Fígado e branco, fígado uniforme e preto e branco são as cores do estalão.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia, diz que se adapta a uma casa grande com um jardim grande no campo, precisa de cuidados com a pelagem mais de uma vez por semana e perde pelo. A PetMD diz que estes bracos precisam de muito exercício e estímulo mental, criam um laço forte com a família e podem ser ótimos cães de família quando treinados e socializados cedo, dão-se bem com crianças que aprenderam a comportar-se com animais, nunca devem ficar sozinhos durante longos períodos e têm um forte instinto de caça. A pelagem é tratada com trimming à mão duas vezes por ano.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "Cão de São Bernardo, St. Bernhardshund, Bernhardiner",
      text: [
        "O São Bernardo é originário da Suíça; a FCI classifica-o entre os molossoides do tipo montanha. O estalão FCI descreve um cão simpático por natureza, de calmo a vivo e vigilante, e reconhece duas variedades: de pelo curto, com pelo denso, liso e bem assente, e de pelo comprido. Os machos medem pelo menos 70 cm e as fêmeas pelo menos 65 cm, até 90 e 80 cm; a PDSA indica um peso de 54–81 kg.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia, diz que a raça se adapta a uma casa grande com um jardim grande, precisa de cuidados com a pelagem mais de uma vez por semana, perde pelo e costuma viver menos de dez anos. A PDSA diz que os São Bernardos adoram estar com a família e são ótimos com pessoas de todas as idades, incluindo crianças, que devem ser bem socializados em cachorros, precisam de escovagem pelo menos três vezes por semana, babam-se, não lidam tão bem com o calor e precisam de um intervalo entre a refeição e o exercício. A PetMD acrescenta que estes cães muito ligados às pessoas podem desenvolver ansiedade de separação se ficarem sozinhos durante longos períodos.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "Staffie, Staffy, Stafford",
      text: [
        "O Staffordshire bull terrier é originário da Grã-Bretanha; a FCI classifica-o entre os terriers de tipo bull. O estalão FCI descreve um cão de pelo liso, bem equilibrado e de grande força para o seu tamanho – tradicionalmente de coragem e tenacidade indomáveis, muito inteligente e afetuoso, sobretudo com crianças. Mede 35,5–40,5 cm; os machos pesam 12,7–17 kg e as fêmeas 11–15,4 kg. Existe em tigrado, vermelho, fulvo, preto, azul ou branco, uniformes ou com branco.",
        "O Royal Kennel Club considera-o um maravilhoso cão de família e recomenda até uma hora de exercício por dia; precisa de cuidados com a pelagem uma vez por semana, perde pelo e costuma viver mais de 12 anos. A PDSA diz que os staffies são tolerantes e meigos com crianças, mas, como cães muito ligados às pessoas, são conhecidos por sofrer de ansiedade de separação quando ficam sozinhos, são conhecidos por roer coisas e, com o seu instinto de caça muito forte, não é boa ideia terem animais mais pequenos por perto.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "Airedale, Rei dos terriers",
      text: [
        "O Airedale terrier é originário da Grã-Bretanha; a FCI classifica-o entre os terriers de grande e médio porte. O estalão FCI diz que é o maior dos terriers – um cão musculado, ativo e bastante compacto, extrovertido e confiante, simpático, corajoso e inteligente, sempre atento, não agressivo mas destemido. Os machos medem cerca de 58–61 cm e as fêmeas cerca de 56–59 cm. O pelo duro, denso e áspero é fogo com uma sela preta ou grisalha.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia; a pelagem precisa de cuidados todos os dias, a raça não perde pelo e costuma viver mais de 10 anos. A PetMD descreve ótimos cães de família que, se bem treinados, costumam dar-se bem com crianças, mas que não devem ficar entregues a si próprios durante muito tempo; aconselha escovagem algumas vezes por semana, uma limpeza rápida das orelhas todas as semanas e um tosquiador profissional três ou quatro vezes por ano.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "Jack Russell, Russell Terrier (AKC), JRT",
      text: [
        "O Jack Russell terrier – o American Kennel Club chama-lhe Russell Terrier – é originário de Inglaterra e foi desenvolvido na Austrália; a FCI classifica-o entre os terriers pequenos. O seu estalão descreve um terrier de trabalho forte, ativo e ágil, de grande caráter: vivo, atento e ativo, ousado e destemido, simpático mas tranquilamente confiante. Mede 25–30 cm e pesa cerca de 5–6 kg. O pelo liso, quebrado ou áspero é sobretudo branco, com marcas pretas e/ou fogo.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem uma vez por semana; a raça perde pelo e costuma viver mais de 10 anos. A PDSA descreve cães espertos e vivos, que podem ser bons cães de família se forem treinados e socializados desde cedo, mas que são mais adequados a famílias com crianças um pouco mais velhas; têm um instinto de caça muito forte, por isso não se recomendam animais mais pequenos, e adoram escavar.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "Bull Mastiff",
      text: [
        "O bullmastiff é uma antiga raça inglesa de guarda do século XIX, descendente do bulldog e do antigo mastiff inglês; a FCI classifica-o entre os molossoides. O seu estalão descreve um cão poderoso e simétrico, que mostra grande força sem ser pesadão – resistente, ativo, fiável, cheio de vida, atento e fiel. Os machos medem 64–69 cm e pesam 50–59 kg, as fêmeas 61–66 cm e 41–50 kg. O pelo curto e duro é de qualquer tom de fulvo, vermelho ou tigrado, sempre com o focinho preto.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e cuidados com a pelagem uma vez por semana, e a raça costuma viver menos de 10 anos. A PDSA descreve cães muito leais cujo tamanho e força os tornam mais adequados a casas só de adultos ou a famílias com crianças mais velhas; precisam de socialização precoce, idealmente de alguém em casa a toda a hora, têm um instinto de caça muito forte, babam-se muito e precisam de um intervalo entre a refeição e o exercício.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "Crista chinês, Chinese Crested, Powder Puff",
      text: [
        "O cão de crista chinês é um cão de companhia pequeno, ativo e gracioso originário da China; a FCI classifica-o entre os cães sem pelo. Existe em duas variedades: a sem pelo (Hairless), com o corpo liso e nu e pelo apenas na cabeça (a crista), nas patas e na cauda, e a Powder Puff, coberta inteiramente por um véu de pelo comprido e macio. Os machos medem 28–33 cm e as fêmeas 23–30 cm; a PetMD indica um peso de 8–12 libras (3,6–5,4 kg). É admitida qualquer cor exceto merle, e o temperamento é descrito como alegre, nunca agressivo.",
        "O Royal Kennel Club recomenda até 30 minutos de exercício por dia e cuidados com a pelagem uma vez por semana; adapta-se a um apartamento, e a raça costuma viver mais de 12 anos. A PetMD descreve um cão simpático que se adapta à maioria das famílias, incluindo as que têm crianças e outros animais – qualquer interação com crianças deve ser vigiada. A pele nua precisa de proteção contra o sol e o frio, as unhas devem ser verificadas todas as semanas e os cachorros precisam de uma socialização precoce e consistente.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "Toller, Nova Scotia Duck Tolling Retriever, NSDTR",
      text: [
        "O retriever da Nova Escócia – o toller – é um retriever originário do Canadá; o seu estalão FCI descreve como corre e brinca ao longo da margem, bem à vista dos patos, para os atrair, e depois é enviado para cobrar as aves. O estalão descreve um cão de tamanho médio, poderoso, compacto e bem musculado, muito inteligente, fácil de treinar e com grande resistência. A FCI indica para os machos 48–51 cm e 20–23 kg e para as fêmeas 45–48 cm e 17–20 kg. A pelagem dupla, repelente à água, tem vários tons de vermelho ou laranja, normalmente com branco na ponta da cauda, nas patas, no peito ou numa lista na cara.",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e cuidados com a pelagem mais de uma vez por semana, e a raça perde pelo; a PetMD aconselha escovagem uma ou duas vezes por semana. Um grande estudo britânico (McMillan 2024, via Dogs Trust) indica uma esperança de vida mediana de 13,2 anos, a PetMD 12–14 anos, e, como outros cães de tamanho médio, atinge o tamanho adulto por volta dos 12–15 meses (PetMD). O AKC descreve cães muito afetuosos que costumam ser bons com crianças, precisam de muito exercício físico e estímulo mental, podem ter um forte instinto de caça perto de animais mais pequenos e beneficiam da socialização precoce e de aulas para cachorros.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "Cairn",
      text: [
        "O cairn terrier é originário da Grã-Bretanha; a FCI classifica-o entre os terriers de pequeno porte. O estalão do Kennel Club descreve um terrier ágil e atento, de aspeto natural e trabalhador – ativo, aguerrido e resistente, de temperamento destemido e alegre, assertivo mas não agressivo. A pelagem dupla, resistente às intempéries, tem um pelo de cobertura abundante e áspero; a cor é creme, trigo, vermelho, cinzento ou quase preto, o tigrado é aceite e as orelhas e o focinho escuros são típicos. Indica uma altura de cerca de 28–31 cm e um peso ideal de 6–7,5 kg.",
        "A PDSA recomenda pelo menos uma hora de exercício por dia, diz que os cairns têm uma energia sem limites e um forte instinto de caça, por isso precisam de ser socializados cedo com gatos e outros animais pequenos e de cuidado quando andam sem trela, e que, uma vez socializados, se dão muito bem com crianças e são excelentes cães de família. Aconselha trimming à mão da pelagem duas vezes por ano e cuidados com a pelagem uma ou duas vezes por semana; o Dogs Trust diz que perdem muito pouco pelo. Um grande estudo britânico (McMillan 2024, via Dogs Trust) indica uma esperança de vida mediana de 14,0 anos, a PetMD 13–15 anos, e, como outros cães pequenos, atinge o tamanho adulto por volta dos 9–12 meses (PetMD). A PetMD acrescenta que precisam de muito exercício e estímulo mental.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "Bull terrier inglês, English Bull Terrier",
      text: [
        "O bull terrier é originário da Grã-Bretanha; a FCI classifica-o entre os terriers de tipo bull (grupo 3). É um terrier de tamanho médio e pelo curto: a PDSA indica uma altura média de 51–61 cm e um peso médio de 22–31 kg, e a PetMD descreve uma constituição atlética de cerca de 21–22 polegadas e 50–70 libras. A PetMD diz que o exercício regular é obrigatório e que os bull terriers são afetuosos com a família, incluindo as crianças, mas nem sempre simpáticos com outros cães ou gatos, e que a socialização e o treino precoces e frequentes são essenciais.",
        "A PDSA recomenda pelo menos uma hora de exercício por dia, dividida ao longo do dia, e um intervalo depois das refeições antes do exercício. Diz que um bull terrier bem socializado se dá bem com pessoas de todas as idades, mas, por ser um pouco excitável, fica melhor com crianças mais velhas; gosta de companhia tanto quanto possível e tem um forte instinto de caça, por isso é preciso cuidado perto de gatos e outros animais pequenos. Uma escovagem semanal chega para a pelagem. A PDSA indica uma esperança de vida média de mais de 10 anos e a PetMD 12–13 anos; como outros cães de tamanho médio, atinge o tamanho adulto por volta dos 12–15 meses (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    miniature_pinscher: {
      aka: "Pinscher anão, Zwergpinscher, Min Pin",
      text: [
        "O pinscher miniatura é originário da Alemanha; a FCI classifica-o entre os pinschers e schnauzers (grupo 2) e descreve-o como uma imagem reduzida do pinscher alemão – vivo, cheio de energia, seguro de si e equilibrado. O pelo é curto, denso, liso e brilhante, de uma só cor, do vermelho-veado ao castanho-avermelhado escuro, ou preto e fogo, e a cauda é natural. O estalão FCI indica uma altura de 25–30 cm e um peso de 4–6 kg para machos e fêmeas; como outros cães toy, atinge o tamanho adulto por volta dos 8–12 meses (PetMD).",
        "A PDSA recomenda até meia hora de exercício por dia para estes cãezinhos enérgicos e irrequietos, diz que uma escovagem por semana costuma chegar para a pelagem e refere que podem ser teimosos e independentes, por isso o treino exige prática e paciência. A PetMD diz que podem ser excelentes cães de família com a socialização e o treino certos. A VCA descreve a raça como brincalhona e muito boa com crianças, embora crianças muito pequenas ou irrequietas o possam magoar com brincadeiras bruscas, e diz que o pelo fino e o tamanho pequeno o tornam sensível ao frio. A PDSA indica uma esperança de vida média de mais de 12 anos e a PetMD 12–16 anos.",
      ],
      sources: ["S594", "S595", "S596", "S597", "S10"],
    },
    pyrenean_mountain_dog: {
      aka: "Montanha dos Pirenéus, Patou, Great Pyrenees, Chien de Montagne des Pyrénées",
      text: [
        "O cão de montanha dos Pirenéus – nos Estados Unidos chamado Great Pyrenees – é originário de França; a FCI classifica-o entre os molossoides do tipo montanha (grupo 2) e descreve um cão de grande tamanho, imponente e de constituição forte, mas não sem uma certa elegância. A pelagem é branca, ou branca com manchas cor de texugo, cinzento-lobo, amarelo-pálido ou laranja na cabeça e nas orelhas. O estalão FCI indica uma altura de 70–80 cm nos machos e 65–75 cm nas fêmeas; a PDSA indica um peso médio de 40–50 kg. Como outros cães gigantes, atinge o tamanho adulto por volta dos 18–24 meses (PetMD).",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia, diz que a raça se adapta a uma casa grande com um jardim grande, precisa de cuidados com a pelagem mais de uma vez por semana e perde pelo, e indica uma esperança de vida de menos de 10 anos (a PetMD e a VCA indicam 10–12 anos). A PDSA chama-lhes gigantes meigos – cães calmos e de bom temperamento que costumam dar-se bem com toda a gente – e diz que o treino exige paciência e métodos baseados em recompensas. A VCA diz que o cão dos Pirenéus é dedicado à família, sobretudo às crianças, e que a socialização precoce é muito importante; a PetMD diz que convive bem com outros animais, mas que pode ser melhor em casas sem crianças mais pequenas, e aconselha a evitar exercício intenso à volta das refeições, por causa do risco de dilatação-torção gástrica.",
      ],
      sources: ["S599", "S600", "S603", "S604", "S605", "S10"],
    },
    soft_coated_wheaten_terrier: {
      aka: "Wheaten, Wheaten terrier, Soft Coated Wheaten Terrier, SCWT",
      text: [
        "O Irish soft coated wheaten terrier é originário da Irlanda; a FCI classifica-o entre os terriers de grande e médio porte. O estalão do Royal Kennel Club descreve um terrier de tamanho médio, compacto e de porte erguido, com um pelo macio e sedoso, cor de trigo, que cai em caracóis soltos ou ondas – de bom temperamento, cheio de vida e aguerrido, cheio de confiança e de humor. A única cor é um trigo puro e bem definido. A PDSA indica uma altura média de 46–49 cm e um peso médio de 16–20,5 kg (o estalão do Kennel Club indica 16–20,5 kg nos machos e um pouco menos nas fêmeas); como outros cães de tamanho médio, atinge o tamanho adulto por volta dos 12–15 meses (PetMD).",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia, diz que a raça se adapta a uma casa pequena, precisa de cuidados com a pelagem todos os dias e não perde pelo. Um grande estudo britânico (McMillan 2024, via Dogs Trust) indica uma esperança de vida mediana de 13,7 anos; a PetMD e a VCA indicam 12–14 anos. A PDSA descreve cães simpáticos e de confiança, que são ótimos cães de família, embora possam ser um pouco teimosos. A VCA diz que a sua natureza meiga e brincalhona faz deles uma boa companhia para crianças; a PetMD diz que a interação com crianças deve ser vigiada, que não gostam de ficar sozinhos durante longos períodos, e aconselha cuidados profissionais com a pelagem a cada quatro a seis semanas, um banho mais ou menos mensal e limpeza das orelhas a cada uma ou duas semanas.",
      ],
      sources: ["S608", "S610", "S612", "S613", "S614", "S123", "S10"],
    },
    irish_wolfhound: {
      aka: "Irish Wolfhound, Wolfhound, Cú Faoil",
      text: [
        "O lebréu irlandês é originário da Irlanda; a FCI classifica-o entre os lebréus de pelo duro. A PDSA indica uma altura média de 71–79 cm e um peso médio de 40–55 kg; como outros cães gigantes, atinge o tamanho adulto por volta dos 18–24 meses (PetMD). O Royal Kennel Club classifica o seu tamanho como extragrande e diz que se adapta a uma casa grande com um jardim grande no campo.",
        "O Royal Kennel Club recomenda mais de duas horas de exercício por dia e cuidados com a pelagem mais de uma vez por semana, e diz que a raça perde pelo. O Kennel Club e a PDSA indicam uma esperança de vida de menos de 10 anos; a PetMD indica 6–8 anos. A PDSA não recomenda a raça para casas com crianças mais pequenas, por causa do tamanho e da força, nem com animais mais pequenos, por causa do forte instinto de caça, e diz que nunca deve ficar sozinho mais de quatro horas. A PetMD aconselha a socializar o cachorro desde o dia em que chega a casa, a evitar o exercício imediatamente antes ou depois de comer (dilatação-torção gástrica) e a limpar as orelhas a cada duas a quatro semanas.",
      ],
      sources: ["S615", "S617", "S619", "S620", "S10"],
    },
    american_staffordshire_terrier: {
      aka: "Amstaff, Am Staff, Staffordshire Terrier",
      text: [
        "O American Staffordshire terrier é originário dos Estados Unidos; a FCI classifica-o entre os terriers de tipo bull. O seu estalão pede grande força para o seu tamanho e indica uma altura de 46–48 cm nos machos e 43–46 cm nas fêmeas, mas nenhum peso. A PetMD indica 40–70 libras (cerca de 18–32 kg) para ambos os sexos; um cão deste tamanho atinge o tamanho adulto por volta dos 12–15 meses (PetMD).",
        "A PetMD recomenda pelo menos 60 minutos de exercício por dia, diz que a raça é paciente e carinhosa com crianças, que pode ter tendência para a ansiedade de separação e que o seu forte instinto de caça pode dificultar a vida com cães mais pequenos ou gatos. Um estudo britânico (McMillan et al., 2024, conforme tabela do Dogs Trust) indica uma esperança de vida mediana de 12,5 anos; a PetMD indica 12–16 anos. A VCA recomenda escovagem semanal; a PetMD aconselha a socializar o cachorro, a evitar o exercício logo a seguir a uma refeição (dilatação-torção gástrica) e a dar banho e limpar as orelhas a cada 4–6 semanas, mais ou menos.",
      ],
      sources: ["S625", "S626", "S628", "S629", "S123", "S10"],
    },
    lagotto_romagnolo: {
      aka: "Lagotto, Lagotti, Cão de água da Romanha, cão trufeiro",
      text: [
        "O lagotto romagnolo é um cão de água de pelo encaracolado, de tamanho pequeno a médio, originário de Itália, conhecido como cão trufeiro; a FCI classifica-o entre os cães de água. O seu estalão indica uma altura de 43–48 cm e um peso de 13–16 kg nos machos, e 41–46 cm e 11–14 kg nas fêmeas; um cão deste tamanho atinge o tamanho adulto por volta dos 12–15 meses (PetMD).",
        "O Royal Kennel Club considera-o um companheiro de família excelente e atento, recomenda mais de duas horas de exercício por dia e cuidados com a pelagem mais de uma vez por semana, diz que não perde pelo e indica uma esperança de vida de mais de 12 anos; a PetMD diz que os lagotti podem viver até aos 15–17 anos. A PetMD refere que precisa de estímulo mental e físico constante e de muita socialização, porque pode ser tímido; a Woodgreen diz que pode ter dificuldades quando fica sozinho com demasiada frequência e recomenda cuidados profissionais com a pelagem a cada seis a oito semanas.",
      ],
      sources: ["S630", "S631", "S632", "S633", "S635", "S636", "S10"],
    },
    alaskan_malamute: {
      aka: "Malamute, Alaskan Malamute, Mal",
      text: [
        "O malamute do Alasca é um dos mais antigos cães de trenó árticos: um cão nórdico de trenó poderoso e de constituição sólida, originário dos Estados Unidos, com uma pelagem grossa e áspera. O estalão FCI indica como tamanhos desejáveis 63,5 cm e 38 kg nos machos e 58,5 cm e 34 kg nas fêmeas; a PDSA indica 58–64 cm e 34–39 kg. Um cão deste tamanho atinge o tamanho adulto por volta dos 15–18 meses (PetMD), e a PDSA indica uma esperança de vida de mais de 10 anos (PetMD: 10–14 anos).",
        "A PDSA recomenda um mínimo de duas horas de exercício intenso e escovagem todos os dias, e diz que os malamutes perdem muito pelo, têm um instinto de caça muito forte, não devem ficar sozinhos mais de quatro horas e são adequados a adultos ativos ou a famílias com crianças mais velhas; considera-os exigentes para quem tem cão pela primeira vez. A PetMD aconselha a verificar as orelhas uma vez por semana e a dar banho a cada 6–8 semanas, e refere que a pelagem grossa torna o tempo quente difícil para eles.",
      ],
      sources: ["S637", "S639", "S640", "S10"],
    },
    basenji: {
      aka: "Cão do Congo, cão que não ladra",
      text: [
        "O basenji é um cão de caça de constituição leve e ossatura fina originário da África Central que não ladra, mas faz um som próprio, parecido com um iodel; a FCI classifica-o entre os cães do tipo primitivo. A PDSA indica uma altura de 40–43 cm e um peso de 9–11 kg. Um cão deste tamanho atinge o tamanho adulto por volta dos 9–12 meses (PetMD), e a PDSA indica uma esperança de vida de mais de 12 anos (WebMD: 13–14 anos).",
        "A PDSA recomenda pelo menos uma hora de exercício por dia (cerca de 60–90 minutos), muito estímulo mental e escovagem uma vez por semana; descreve os basenjis como distantes mas de confiança, teimosos e com muito pouca noção do perigo na estrada. A WebMD diz que perseguem tudo o que pareça uma presa, precisam de vedações muito altas ou de vigilância constante e são apenas moderadamente bons com crianças pequenas, e aconselha a limpar as orelhas todas as semanas e a escovar os dentes pelo menos duas vezes por semana.",
      ],
      sources: ["S642", "S644", "S646", "S10"],
    },
    greater_swiss_mountain_dog: {
      aka: "Grande Boieiro Suíço, Greater Swiss Mountain Dog, Swissy",
      text: [
        "O grande boieiro suíço é um cão de tração tricolor da Suíça, robusto, de ossatura forte e bem musculado: preto com marcas fogo e brancas simétricas. O padrão da FCI indica uma altura de 65–72 cm para os machos e de 60–68 cm para as fêmeas, mas nenhum peso; a WebMD indica 52–64 kg para os machos e 39–50 kg para as fêmeas. Um cão deste tamanho atinge o tamanho adulto por volta dos 18–24 meses (PetMD), e o Royal Kennel Club indica uma esperança de vida de mais de 10 anos (PetMD: 8–11 anos).",
        "O Royal Kennel Club recomenda até uma hora de exercício por dia e escovagem uma vez por semana, e diz que a raça larga pelo e precisa de uma casa grande com um jardim grande. A PetMD descreve-os como ótimos cães de família, meigos com as crianças (todas as interações devem ser supervisionadas), e aconselha a limpar as orelhas todas as semanas e a não os exercitar logo antes ou depois das refeições, pelo risco de torção gástrica (GDV); a WebMD aconselha a escovar os dentes todos os dias e a limitar os biscoitos, porque a raça tende a engordar.",
      ],
      sources: ["S653", "S654", "S656", "S658", "S10"],
    },
    british_shorthair: {
      aka: "Gato britânico, British Blue",
      text: [
        "O British shorthair é um gato robusto, de pelagem densa e olhos grandes e redondos – a CFA chama-lhe um gato «ursinho de peluche». A maioria das pessoas imagina-o cinzento-azulado, mas existe em várias cores e padrões. Amadurece devagar: a CFA diz que atinge o tamanho adulto por volta dos três anos, e a VCA diz que a maturidade física pode demorar até cinco.",
        "A CFA descreve-o como muito afetuoso e apegado às suas pessoas; dá-se bem com todos em casa, independentemente da idade, mas normalmente não gosta de andar ao colo, e já viveu com cães, coelhos e pássaros. A VCA descreve um nível de atividade moderado e aconselha a pentear a pelagem pelo menos uma vez por semana. Os gatinhos de raça costumam ir para a nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "Rag doll",
      text: [
        "A CFA descreve o ragdoll como um gato grande e descontraído, com pelagem semilonga, macia e sedosa, e olhos azuis. As suas «pontas» mais escuras existem em vários padrões – colourpoint sem branco, mitted com patas brancas, bicolor com mais branco, e van. Amadurece devagar: atinge a cor definitiva da pelagem aos dois anos e o tamanho e peso adultos por volta dos quatro.",
        "A CFA descreve um gato meigo que te recebe à porta e te segue de divisão em divisão, e que normalmente brinca sem pôr as unhas de fora. A PetMD considera-o uma boa escolha para famílias, incluindo as que têm crianças, mas aconselha apresentações lentas e vigiadas às crianças e a outros animais, e diz que alguns ragdolls precisam de ser penteados só uma ou duas vezes por semana, enquanto a CFA aconselha pentear com regularidade. Os gatinhos de raça costumam ir para uma nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "Gato siberiano, Gato da floresta siberiana",
      text: [
        "O GCCF descreve o siberiano como um gato de desenvolvimento lento, com uma pelagem espessa e resistente às intempéries: um subpelo denso e macio sob um pelo de cobertura mais grosso, que muda abundantemente na primavera e no outono. Os machos pesam cerca de 7,7–11,8 kg e as fêmeas 5,9–7,7 kg, o desenvolvimento completo pode demorar quatro a cinco anos, e o GCCF indica uma esperança de vida de 12 a 15 anos ou mais.",
        "O GCCF descreve-o como enérgico e brincalhão, mas paciente – uma boa escolha para famílias com crianças pequenas – e diz que se dá bem com outros animais, incluindo cães. A PetMD aconselha a penteá-lo pelo menos uma vez por semana, com mais cuidado durante a muda da primavera e do outono, e refere que os siberianos não são considerados hipoalergénicos. Os gatinhos de raça costumam ir para a nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "Gato Maine coon",
      text: [
        "O Maine coon é amplamente considerado uma das maiores raças de gato doméstico, com um corpo musculado e retangular, peito largo, patas grandes e uma cauda comprida e farta. A TICA indica um peso médio de cerca de 5,9–8,2 kg nos machos adultos e 4,1–5,9 kg nas fêmeas, e a CFA refere que alguns machos pesam mais de 9 kg. Cresce devagar: segundo a CFA, muitas vezes só atinge o desenvolvimento completo aos três ou quatro anos, e a TICA diz que a maturidade completa pode demorar três a cinco anos.",
        "A TICA descreve-o como meigo, simpático e brincalhão, a CFA como sociável, leal e inteligente; muitas vezes «fala» com um trinado em vez de um miado. A Vetstreet escreve que os Maine coons se dão bem com toda a gente, incluindo crianças, cães e outros gatos. A sua pelagem pesada e semilonga é mais curta nos ombros e mais comprida na gola, na barriga e nos quartos traseiros. As fontes divergem quanto à escovagem: a Vetstreet diz que pentear uma vez por semana chega, a CFA aconselha escovar ou pentear pelo menos duas vezes por semana e a TICA refere que uma pelagem mais espessa pode precisar de ser penteada todos os dias. Os gatinhos de raça costumam ir para a nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "Gato de Bengala, Bengala",
      text: [
        "A PDSA descreve o bengal como muito inteligente e enérgico, um gato que precisa de muito estímulo mental e de oportunidades para fazer exercício e que gosta de um ponto alto de observação, como uma árvore para gatos. É afetuoso, mas é mais provável que se enrosque ao teu lado do que no teu colo, e pode ser bastante vocal. A VCA refere que os bengals crescem devagar e podem demorar até dois anos a atingir a maturidade física.",
        "A pelagem curta, macia, mosqueada ou marmoreada, precisa apenas de uma escovagem ou penteadela leve uma vez por semana (PDSA). A PetMD refere que o bengal pode não ser a melhor escolha para famílias com crianças pequenas, enquanto cães e outros gatos podem não ser problema com as apresentações certas. A raça foi desenvolvida a partir de cruzamentos entre o gato-leopardo-asiático e gatos domésticos; o PetPrep mostra apenas o bengal doméstico registado. Os gatinhos de raça costumam ir para a nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "Gato da floresta norueguesa, Skogkatt, Wegie",
      text: [
        "O GCCF descreve o norueguês da floresta como meigo e simpático, um gato que gosta de fazer parte de uma família. Amadurece devagar e só é considerado completamente adulto por volta dos quatro a cinco anos; os machos pesam cerca de 5,4–7,3 kg e as fêmeas 4,1–5,4 kg, e o GCCF indica uma esperança de vida de 14 a 16 anos.",
        "Tem muita energia, gosta de jogos interativos e trepa com facilidade; o GCCF diz que tolera crianças respeitadoras, outros gatos e cães que se dão bem com gatos. A PetMD aconselha a pentear e escovar pelo menos uma vez por semana, mais vezes durante a muda da primavera e do outono, e refere que a ansiedade de separação pode ser um problema se ficar muitas vezes sozinho durante longos períodos. Os gatinhos de raça costumam ir para a nova casa às 12–13 semanas (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default pt;
