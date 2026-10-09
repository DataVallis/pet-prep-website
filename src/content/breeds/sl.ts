import type { BreedCopy } from "./types";

/** Slovenian plural: 1 / 2 / 3–4 / 5+ (by the last two digits); decimals take the 3–4 form ("13,1 leta"). */
function form(n: number, one: string, two: string, few: string, many: string): string {
  if (!Number.isInteger(n)) return few;
  const h = Math.abs(n) % 100;
  if (h === 1) return one;
  if (h === 2) return two;
  if (h === 3 || h === 4) return few;
  return many;
}

/** "12.000" → 12000, "13,1" → 13.1, "12–15" → 15 (the number a Slovenian noun agrees with). */
const lastNumber = (s: string) => Number((s.split("–").pop() ?? s).replace(/\./g, "").replace(",", "."));

const sl: BreedCopy = {
  breeds: {
    border_collie: {
      name: "Border collie",
      metaDescription:
        "Border collie: potrebe po gibanju, negi in obrokih, velikost, življenjska doba in za koga je primeren — iz virov, in kako pasmo simulira PetPrep.",
      intro: [
        "Border collie je srednje velik ovčarski pes iz Velike Britanije, grajen za vzdržljivost in trdo delo. Standard pasme ga opisuje kot vnetega, pozornega, odzivnega in inteligentnega psa, ki ni niti plašen niti napadalen.",
        "Kinološke zveze in veterinarji se strinjajo predvsem v enem: to je pasma z zelo veliko energije. Vsak dan potrebuje več kot dve uri gibanja in veliko miselnih izzivov. Če se dolgočasi ali se premalo giblje, si delo poišče sam — grize, kar doseže, ali pri igri »pase« otroke.",
      ],
      introSources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      name: "Labradorec",
      alsoKnownAs: "labradorski prinašalec, Labrador Retriever",
      metaDescription:
        "Labradorec: potrebe po gibanju, negi in obrokih, velikost, življenjska doba, zdravje in za koga je primeren — iz virov, in kako pasmo simulira PetPrep.",
      intro: [
        "Labradorec (labradorski prinašalec) je velik, močno grajen lovski pes iz Velike Britanije, vzrejen za prinašanje. Standard ga opisuje kot dobrovoljnega, prijaznega in prilagodljivega spremljevalca, ki rad ugodi in obožuje vodo. Dlaka je kratka in gosta, črna, rumena ali jetrno rjava (čokoladna).",
        "Britanske dobrodelne organizacije ga opisujejo kot družinskega psa, ki se ob dobri socializaciji naveže na vso družino. Je zelo aktiven in zelo rad je: priboljški pomagajo pri šolanju, a se labradorci tudi hitro zredijo.",
      ],
      introSources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      name: "Zlati prinašalec",
      alsoKnownAs: "Golden Retriever",
      metaDescription:
        "Zlati prinašalec: potrebe po gibanju, negi in obrokih, velikost, življenjska doba, zdravje in za koga je primeren — iz virov, in kako pasmo simulira PetPrep.",
      intro: [
        "Zlati prinašalec je velik lovski pes iz Velike Britanije z ravno ali valovito dlako v odtenkih zlate ali kremne barve. Standard ga opisuje kot ubogljivega in inteligentnega psa, ki je prijazen, družaben in samozavesten.",
        "Britanske dobrodelne organizacije ga opisujejo kot odličnega psa za aktivno družino, ki je lahko tudi dober prvi pes. Viri pa jasno povedo, kaj to pomeni: vsaj dve uri gibanja na dan, krtačenje večkrat na teden in dlako, ki močno izpada.",
      ],
      introSources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
  },
  availability: {
    in_app: { label: "V aplikaciji", text: "Na voljo v 12-tedenskem izzivu PetPrep (plačljiva pasma)." },
    coming_soon: { label: "Kmalu v aplikaciji", text: "Pasma je narejena in preizkušena; prišla bo z naslednjo različico aplikacije." },
  },
  overview: {
    filterTitle: "Poiščite pasmo za svojo družino",
    filterIntro: "Izberite, kar vam je pomembno. Oznake so enake kot v aplikaciji in vsako podpira vir.",
    filterClear: "Pokaži vse",
    filterResult: (shown, total) => `Prikazanih ${shown} od ${total} pasem`,
    filterNone: "Nobena pasma v registru še ne ustreza vsem izbranim oznakam.",
    notYet: (tags) => `Nobena pasma v registru še nima oznake za ${tags}.`,
    compareTitle: "Primerjava pasem",
    compareIntro: "Potrebe drugo ob drugi, iz istih virov kot strani pasem.",
    compareNote: "Vrednosti so navedene tako, kot jih poda navedeni vir. Kjer se viri razlikujejo, so na strani pasme navedeni vsi.",
    open: (name) => `${name}: potrebe, pravila igre in viri`,
    mixedTitle: "Brezplačni plan: mešanček",
    mixedText: (steps) =>
      `Brezplačni plan uporablja srednje velikega mešančka. Ta nima strani v registru: mešanček nima standarda pasme, zato igra uporablja splošna priporočila za pse (cilj odraslega psa: ${steps} na dan).`,
    catsLine: "Mačke prihajajo kmalu.",
    methodTitle: "Kako nastaja ta register",
    method: [
      "Vsako dejstvo ima imenovan vir — kinološke zveze, veterinarske dobrodelne organizacije, veterinarska združenja in recenzirane raziskave — in povezavo nanj. Standarde pasem povzemamo s svojimi besedami.",
      "Vrednosti, ki jih noben vir ne podpira, nikoli ne prikažemo kot dejstvo. Kjer mora PetPrep za igro izbrati številko, je ta samo v razdelku »Kako to simulira PetPrep« in označena kot pravilo igre.",
      "Isti podatki poganjajo aplikacijo: oznake, število obrokov in cilji korakov na teh straneh so isti, kot jih uporablja ljubljenček v aplikaciji.",
      "Register ni veterinarski nasvet. Podatki o zdravju so samo informativni in jih ni pregledal veterinar.",
    ],
  },
  rows: {
    availability: "V PetPrep",
    size: "Velikost",
    weight: "Teža odraslega psa",
    height: "Višina v vihru",
    exercise: "Gibanje na dan",
    grooming: "Nega",
    coat: "Dlaka",
    shedding: "Izpadanje dlake",
    lifespan: "Življenjska doba",
    growth: "Odraslo težo doseže",
    stepGoal: "Cilj korakov odraslega psa v PetPrep (pravilo igre)",
  },
  page: {
    eyebrow: "Register pasem",
    backToRegister: "Vse pasme",
    suitabilityTitle: "Za koga je primeren",
    suitabilityNote: "Iste oznake kot v aplikaciji. Vsako oznako podpirajo viri, navedeni na dnu strani.",
    needsTitle: "Kaj potrebuje",
    needsIntro: "Iz standardov pasem, kinoloških zvez in veterinarskih dobrodelnih organizacij. Kjer se viri razlikujejo, navajamo vse.",
    cards: {
      exercise: "Gibanje",
      grooming: "Dlaka in nega",
      feeding: "Obroki",
      lifespan: "Življenjska doba",
      stages: "Življenjska obdobja",
      size: "Velikost in teža",
      training: "Šolanje",
    },
    noData: "V naših virih tega še ni.",
    feedingGeneral: "Splošna priporočila za pse (ne posebej za to pasmo):",
    foodMotivated: "Hrana ga močno motivira — to pomaga pri šolanju, a pazite na količino.",
    stagesText: (puppy, young, seniorShare) =>
      `Življenjska obdobja po veterinarskih smernicah: mladiček do približno ${puppy} mesecev, mlad odrasel pes do ${young} let, starejši pes v zadnjih ${seniorShare} pričakovane življenjske dobe.`,
    growth: (months) => `Odraslo težo doseže v starosti približno ${months} (priporočilo za njegov velikostni razred).`,
    coren: (rank) => `${rank}. mesto na lestvici delovne in poslušnostne inteligence Stanleyja Corena.`,
    fci: (number, group, origin) => `Standard FCI št. ${number}, skupina ${group}; izvor: ${origin}.`,
    simTitle: "Kako to simulira PetPrep",
    simBadge: "Pravila igre, ne veterinarski nasvet",
    simIntro:
      "V PetPrep je en resnični teden en mesec pasjega življenja. To so pravila, ki jih igra uporablja za to pasmo. PetPrep jih je izbral na podlagi virov s te strani; niso navodila za nego pravega psa.",
    simTable: { stage: "Obdobje", starts: "Začetek", meals: "Obrokov na dan", steps: "Cilj korakov na dan" },
    stage: { puppy: "Mladiček", young: "Mlad pes", adult: "Odrasel pes", senior: "Starejši pes" },
    simArrives: (m) => `pride pri ${m} ${form(m, "mesecu", "mesecih", "mesecih", "mesecih")}`,
    simFromMonth: (m, years) => (years ? `${m}. mesec (${years})` : `${m}. mesec`),
    simPuppyMeals: (m4, m3, from3, m2, from6) => `${m4}; od ${from3}. meseca: ${m3}; od ${from6}. meseca: ${m2}`,
    simGrowingSteps: (perMonth, first, cap, capMonth) =>
      `${perMonth} na mesec starosti (ob prihodu ${first}), do ${cap} od ${capMonth}. meseca`,
    simStepsRule: (minutes, steps, perMinute) =>
      `Cilj korakov = minute gibanja na dan × ${perMinute} korakov: odrasel pes ima ${minutes}, torej ${steps} na dan.`,
    simLearning: (m) => `Ukaze se uči ${m}-krat hitreje kot mešanček iz brezplačnega plana.`,
    simSenior: (months, years) => `Starejši pes postane v ${months}. mesecu (${years}) — v zadnji četrtini mediane življenjske dobe pasme.`,
    simNote: "Sprehodi štejejo prave korake s senzorja gibanja v telefonu — brez GPS.",
    simDecisions: "Vsaka številka igre je zapisana odločitev PetPrep z navedenimi viri.",
    healthTitle: "Zdravje",
    healthNote: "Informativno, ni veterinarsko preverjeno. O zdravju svojega psa se posvetujte z veterinarjem.",
    healthNone: "V naših virih za to pasmo še ni podatkov o zdravju, značilnih za pasmo.",
    health: {
      weight_gain: "Hitro se zredi — pazite na velikost obrokov in priboljške.",
      hip_elbow_dysplasia_eye_conditions: "Lahko je nagnjen k displaziji kolkov in komolcev ter k več dednim boleznim oči.",
      cancer_risk: "Viri pri tej pasmi navajajo večje tveganje za raka.",
    },
    sourcesTitle: "Viri",
    sourcesIntro: (date) => `Vsako dejstvo na tej strani navaja enega od teh virov. Raziskava, na kateri temeljijo, se je začela ${date}.`,
    sourceLabel: (id, publisher) => `Vir ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulacija za družine. Ta stran ni veterinarski nasvet — za pravega psa se posvetujte z veterinarjem ali klubom pasme.",
  },
  values: {
    size: { medium: "Srednje velik", large: "Velik" },
    coat: { "moderately long": "zmerno dolga", smooth: "gladka (kratka)", short: "kratka", medium: "srednje dolga" },
    grooming: {
      "once a week": "krtačenje enkrat na teden",
      "more than once a week": "krtačenje večkrat na teden",
      moderate: "zmerne potrebe po negi",
      high: "velike potrebe po negi",
    },
    shedding: { yes: "dlaka izpada", high: "dlaka močno izpada" },
    fciGroup: { 1: "1 (ovčarski in pastirski psi)", 8: "8 (prinašalci, šarivci in vodni psi)" },
    origin: { GB: "Velika Britanija" },
    or: " ali ",
    males: "samci",
    females: "samice",
    femalesNote: { "slightly less": "samice nekoliko manjše" },
    mean: "izmerjeno povprečje",
    median: (y) => `mediana ${y}`,
    moreThanYears: (y) => `več kot ${y}`,
    moreThan: (d) => `več kot ${d}`,
    atLeast: (d) => `vsaj ${d}`,
    hours: (n) => `${n} ${form(n, "ura", "uri", "ure", "ur")}`,
    minutes: (n) => `${n} ${form(n, "minuta", "minuti", "minute", "minut")}`,
    years: (n) => `${n} ${form(lastNumber(n), "leto", "leti", "leta", "let")}`,
    months: (n) => `${n} ${form(lastNumber(n), "mesec", "meseca", "mesece", "mesecev")}`,
    steps: (n) => `${n} ${form(lastNumber(n), "korak", "koraka", "koraki", "korakov")}`,
    perDay: " na dan",
    mealsExact: (n) => `${n} ${form(n, "obrok", "obroka", "obroki", "obrokov")} na dan`,
    mealsAtLeast: (n) => `vsaj ${n} ${form(n, "obrok", "obroka", "obroki", "obrokov")} na dan`,
    mealsSmaller: (a, b) => `manjši obroki, ${a}- do ${b}-krat na dan`,
    mealsStage: {
      puppy_8_12_weeks: "8–12 tednov",
      puppy_3_6_months: "3–6 mesecev",
      puppy_6_12_months: "6–12 mesecev",
      adult: "Odrasel pes",
      senior: "Starejši pes",
    },
  },
};

export default sl;
