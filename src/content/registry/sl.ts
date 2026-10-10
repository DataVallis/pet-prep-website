import type { RegistryCopy } from "./types";

/** Slovenian plural: 1 / 2 / 3–4 / 5+ (by the last two digits); decimals take the 3–4 form ("13,1 leta"). */
function form(n: number, one: string, two: string, few: string, many: string): string {
  if (!Number.isInteger(n)) return few;
  const h = Math.abs(n) % 100;
  if (h === 1) return one;
  if (h === 2) return two;
  if (h === 3 || h === 4) return few;
  return many;
}
type Fci = { number: number; group: number; origin: string };
/** Breed names are common nouns in Slovenian: lower case inside a sentence ("labradorec", "zlati prinašalec"). */
const mid = (name: string) => name.charAt(0).toLocaleLowerCase("sl") + name.slice(1);
const fciGroups: Record<number, string> = { 1: "ovčarski in pastirski psi", 8: "prinašalci, šarivci in vodni psi", 9: "psi za družbo in pritlikavi psi" };
const origins: Record<string, string> = { GB: "Velika Britanija", FR: "Francija" };

const sl: RegistryCopy = {
  hub: {
    title: "Spoznajte žival, preden pride domov.",
    intro:
      "Kaj vsaka vrsta in pasma v PetPrep res potrebuje — iz kinoloških zvez, mačjih zvez, veterinarskih dobrodelnih organizacij in raziskav, z vsemi viri. In pravila, po katerih jo PetPrep simulira.",
    breedCount: (n) => `${n} ${form(n, "pasma", "pasmi", "pasme", "pasem")} v registru`,
    open: "Poglej pasme",
    openA11y: (many) => `Poglej pasme: ${many.toLowerCase()}`,
    freePlan: (name, activity) => `Brezplačni plan: ${name.toLowerCase()} (odrasla žival: ${activity}). Nima strani v registru.`,
    otherSpecies: "Druge živali so v načrtu.",
    methodTitle: "Kako nastaja ta register",
    method: [
      "Vsako dejstvo ima imenovan vir — kinološke in mačje zveze, veterinarske dobrodelne organizacije in združenja ter recenzirane raziskave — in povezavo nanj. Standarde pasem povzemamo s svojimi besedami.",
      "Vrednosti, ki jih noben vir ne podpira, nikoli ne prikažemo kot dejstvo. Kjer mora PetPrep za igro izbrati številko, je ta samo v razdelku »Kako to simulira PetPrep« in označena kot pravilo igre.",
      "Isti podatki poganjajo aplikacijo: oznake, število obrokov, cilji korakov in igre na teh straneh so isti, kot jih uporablja ljubljenček v aplikaciji.",
      "Register ni veterinarski nasvet. Podatki o zdravju so samo informativni in jih ni pregledal veterinar.",
    ],
  },
  speciesStatus: { available: "V aplikaciji", coming_soon: "Kmalu v aplikaciji", info_only: "Samo informativno" },
  availability: {
    in_app: { label: "V aplikaciji", text: "Na voljo v 12-tedenskem izzivu PetPrep (plačljiva pasma)." },
    coming_soon: { label: "Kmalu v aplikaciji", text: "Pasma je narejena in preizkušena; prišla bo z eno od naslednjih različic aplikacije." },
    info_only: { label: "Samo informativno", text: "Pasma je v registru za informacijo; v aplikaciji je še ne morete izbrati." },
  },
  catalogue: {
    eyebrow: "Register živali",
    title: (many) => `${many}: pasme v registru`,
    lead: (many, count) =>
      `${count} ${form(count, "pasma", "pasmi", "pasme", "pasem")} (${many.toLowerCase()}) s potrebami iz virov, oznakami, za koga so primerne, in pravili, po katerih jih simulira PetPrep. Iščite, filtrirajte in primerjajte do tri.`,
    metaTitle: (many) => `${many} — register pasem z viri | PetPrep`,
    metaDescription: (many) =>
      `${many}: poiščite in primerjajte pasme po potrebah, velikosti in tem, za koga so primerne. Vsako dejstvo ima vir, dodana so pravila igre PetPrep.`,
    searchLabel: "Iskanje pasme",
    searchPlaceholder: "Ime, npr. labradorec",
    filtersTitle: "Filtri",
    any: "Vse",
    availabilityLabel: "V PetPrep",
    sortLabel: "Razvrsti",
    sort: { recommended: "Najprej v aplikaciji", az: "A–Ž", size: "Velikost (od majhnih do velikih)" },
    clear: "Počisti vse",
    results: (total) => `{n} od ${total} ${form(total, "pasme", "pasem", "pasem", "pasem")}`,
    none: "Nobena pasma ne ustreza. Poskusite z manj filtri.",
    loading: "Nalagam iskanje …",
    page: "Stran {n} od {total}",
    prev: "Nazaj",
    next: "Naprej",
    compareAdd: "Primerjaj: {name}",
    compareBar: "Za primerjavo izbrano: {n} od {max}",
    compareGo: "Primerjaj",
    compareMax: "Primerjate lahko največ {max} pasme.",
    azTitle: "Vse pasme od A do Ž",
    azIntro: "Vse pasme v registru po abecedi.",
    freePlanTitle: "Brezplačni plan",
    guideTitle: "Kako izbrati pasmo",
    guide: () => [
      "Začnite pri tem, kar lahko vaše gospodinjstvo da vsak dan: čas za gibanje, nego in prostor. Na strani vsake pasme so te potrebe zbrane na kratko, pri vsaki vrednosti pa je naveden vir; kjer se viri razlikujejo, so navedene vse vrednosti.",
      "Kjer ima pasma velikostni razred (pri psih: zelo majhen, majhen, srednje velik, velik ali zelo velik), je to razred, ki ga navaja imenovani vir — običajno kinološka zveza — teže pa so razponi, ki jih navajajo viri, in ne naše ocene.",
      "Oznake, kot je »Primerno za: aktivno družino«, so iste kot v aplikaciji in vsako podpirajo viri. Številke v razdelku »Kako to simulira PetPrep« so pravila igre PetPrep, ne navodila za nego. [Kako nastaja register](page:about#metodologija)",
    ],
  },
  compare: {
    title: (many) => `Primerjava: ${many.toLowerCase()}`,
    metaTitle: (many) => `Primerjava pasem (${many.toLowerCase()}) | PetPrep register`,
    intro: "Ključne potrebe drugo ob drugi, iz istih virov kot strani pasem.",
    pick: "V katalogu izberite dve ali tri pasme in jih primerjajte.",
    back: "Nazaj na katalog",
    remove: "Odstrani: {name}",
    note: "Vrednosti so navedene tako, kot jih poda navedeni vir. Kjer se viri razlikujejo, so na strani pasme navedeni vsi.",
    availabilityRow: "V PetPrep",
    activityRow: "Dnevni cilj odrasle živali v PetPrep (pravilo igre)",
  },
  facets: {
    size: { label: "Velikost", values: { toy: "Zelo majhen", small: "Majhen", medium: "Srednje velik", large: "Velik", giant: "Zelo velik" } },
    exercise: { label: "Gibanje na dan", values: { under_1h: "Do 1 ure", h1_2: "1–2 uri", over_2h: "Več kot 2 uri" }, line: (v) => `${v.toLowerCase()} gibanja na dan` },
    grooming: { label: "Krtačenje", values: { weekly: "Enkrat na teden", several_weekly: "Večkrat na teden", daily: "Vsak dan", other: "Drugo" }, line: (v) => `krtačenje ${v.toLowerCase()}` },
  },
  groups: {
    exercise: "Gibanje",
    play: "Igra",
    litter: "Stranišče (pesek)",
    scratching: "Praskanje",
    grooming: "Dlaka in nega",
    feeding: "Obroki",
    water: "Voda",
    lifespan: "Življenjska doba",
    stages: "Življenjska obdobja",
    size: "Velikost in teža",
    training: "Šolanje",
  },
  fields: {
    size: "Velikost",
    height: "Višina v vihru",
    weight: "Teža odrasle živali",
    growth_end: "Odraslo velikost doseže pri",
    lifespan: "Življenjska doba",
    exercise: "Gibanje na dan",
    coat: "Dlaka",
    grooming_frequency: "Krtačenje",
    grooming_level: "Potrebe po negi",
    shedding: "Izpadanje dlake",
    litter_scoop: "Čiščenje peska",
    litter_full_change: "Menjava vsega peska",
    litter_pee: "Uriniranje (odrasla mačka)",
    litter_poo: "Iztrebljanje (odrasla mačka)",
    water_need: "Potreba po vodi",
    sleep: "Spanje (odrasla mačka)",
  },
  contexts: {
    puppy_8_12_weeks: "8–12 tednov",
    puppy_3_6_months: "3–6 mesecev",
    puppy_6_12_months: "6–12 mesecev",
    kitten_6_12_weeks: "6–12 tednov",
    kitten_3_6_months: "3–6 mesecev",
    kitten_6_12_months: "6–12 mesecev",
    puppy: "Mladiček",
    kitten: "Mucek",
    young_adult: "Mlada odrasla žival",
    mature_adult: "Zrela žival",
    adult: "Odrasla žival",
    senior: "Starejša žival",
  },
  categories: {
    size: { toy: "zelo majhen", small: "majhen", medium: "srednje velik", large: "velik", giant: "zelo velik" },
    coat: { moderately_long: "zmerno dolga", smooth: "gladka (kratka)", short: "kratka", medium: "srednje dolga" },
    grooming_frequency: { once_a_week: "enkrat na teden", more_than_once_a_week: "večkrat na teden", daily: "vsak dan" },
    grooming_level: { moderate: "zmerne", high: "velike", low: "majhne" },
    shedding: { yes: "dlaka izpada", high: "dlaka močno izpada", moderate: "dlaka zmerno izpada", low: "dlaka malo izpada", minimal: "dlaka zelo malo izpada" },
  },
  statements: {
    food_motivated: () => "Hrana ga močno motivira — to pomaga pri šolanju, a pazite na količino.",
    coren_rank: (v) => `${String(v)}. mesto na lestvici delovne in poslušnostne inteligence Stanleyja Corena.`,
    fci_standard: (v) => {
      const x = v as Fci;
      return `Standard FCI št. ${x.number}, skupina ${x.group} (${fciGroups[x.group] ?? "—"}); izvor: ${origins[x.origin] ?? x.origin}.`;
    },
    play_sessions: (v, f) => {
      const x = v as { sessions: [number, number]; minutes: [number, number] };
      return `Igra: ${f.num(x.sessions[0])}- do ${f.num(x.sessions[1])}-krat na dan po ${f.num(x.minutes[0])}–${f.num(x.minutes[1])} minut.`;
    },
    kittens_play_more: () => "Mucki se morajo igrati pogosteje.",
    scratching_natural: () => "Praskanje je naravno in nujno: priskrbite praskalnik in mačke zanj nikoli ne kaznujte.",
    water_fresh: () => "Sveža voda ves čas; skledo vsak dan operite in napolnite.",
    grooming_sources_differ: () => "Viri se o česanju razlikujejo: od vsak dan do enkrat na teden.",
  },
  qualifiers: {
    exact: (t) => t,
    median: (t) => `mediana ${t}`,
    more_than: (t) => `več kot ${t}`,
    at_least: (t) => `vsaj ${t}`,
    up_to: (t) => `največ ${t}`,
    ideal: (t) => `idealno (standard pasme): ${t}`,
    mean: (t) => `izmerjeno povprečje: ${t}`,
    about: (t) => `približno ${t}`,
    until: (t) => `do ${t}`,
    until_about: (t) => `do približno ${t}`,
    span: (t) => t,
    from: (t) => `od ${t}`,
    last: (t) => `zadnjih ${t}`,
    every: (t) => `vsakih ${t}`,
    expectancy: (t) => `pričakovana življenjska doba ob rojstvu ${t}`,
    smaller_meals: (t) => `${t}, manjši obroki`,
  },
  units: {
    cm: (t) => `${t} cm`,
    kg: (t) => `${t} kg`,
    years: (t, n) => `${t} ${form(n, "leto", "leti", "leta", "let")}`,
    months: (t, n) => `${t} ${form(n, "mesec", "meseca", "mesece", "mesecev")}`,
    days: (t, n) => `${t} ${form(n, "dan", "dneva", "dni", "dni")}`,
    min_per_day: (t, n, f) =>
      n % 60 === 0 ? `${f.num(n / 60)} ${form(n / 60, "uro", "uri", "ure", "ur")} na dan` : `${t} ${form(n, "minuto", "minuti", "minute", "minut")} na dan`,
    meals_per_day: (t, n) => `${t} ${form(n, "obrok", "obroka", "obroki", "obrokov")} na dan`,
    times_per_day: (t) => `${t}-krat na dan`,
    hours_per_day: (t, n) => `${t} ${form(n, "uro", "uri", "ure", "ur")} na dan`,
    ml_per_kg_day: (t) => `${t} ml na kg telesne teže na dan`,
    share_of_lifespan: (_t, n, f) => `${f.num(n * 100, 0)} % pričakovane življenjske dobe`,
  },
  males: "samci",
  females: "samice",
  or: " ali ",
  notes: { size_class_guidance: "priporočilo za njen velikostni razred" },
  stageLabels: {
    dog: { puppy: "Mladiček", young: "Mlad pes", adult: "Odrasel pes", senior: "Starejši pes" },
    cat: { puppy: "Mucek", young: "Mlada mačka", adult: "Zrela mačka", senior: "Starejša mačka" },
  },
  activity: {
    steps: (n, raw) => `${n} ${form(raw, "korak", "koraka", "koraki", "korakov")}`,
    steps_range: (from, to) => `${from} → ${to} korakov`,
    steps_growing: (perMonth, first, cap, capMonth) => `${perMonth} korakov na mesec starosti (ob prihodu ${first}), do ${cap} od ${capMonth}. meseca`,
    play_sessions: (n) => `${n} ${form(n, "igra", "igri", "igre", "iger")}`,
  },
  rules: {
    steps_rule: (p, f) =>
      `Cilj korakov = minute gibanja na dan × ${p.per_minute} korakov: odrasel pes ima ${p.minutes % 60 === 0 ? `${f.num(p.minutes / 60)} ${form(p.minutes / 60, "uro", "uri", "ure", "ur")}` : `${p.minutes} minut`}, torej ${f.num(p.steps)} korakov na dan.`,
    learning: (p, f) =>
      p.multiplier < 1
        ? `Ukaze se uči počasneje kot mešanček iz brezplačnega plana (${f.num(p.multiplier)}-kratnik njegove hitrosti).`
        : `Ukaze se uči ${f.num(p.multiplier)}-krat hitreje kot mešanček iz brezplačnega plana.`,
    senior_share: (p, f) => `Starejši pes postane v ${p.months}. mesecu (${f.num(p.months / 12, 1)} leta) — v zadnji četrtini mediane življenjske dobe pasme.`,
    walk_sensor: () => "Sprehodi štejejo prave korake s senzorja gibanja v telefonu — brez GPS.",
    play_instead_of_steps: (p, f) =>
      `Brez sprehodov: odrasla mačka potrebuje ${p.sessions} ${form(p.sessions, "igro", "igri", "igre", "iger")} na dan s palico z vabo, vsaj ${f.num(p.gap_minutes / 60)} ${form(p.gap_minutes / 60, "uro", "uri", "ure", "ur")} narazen.`,
    litter_rule: (p) =>
      `Stranišče: odrasla mačka ga uporabi ${p.uses}-krat na dan; vsako uporabo je treba počistiti v ${p.scoop_hours} urah (zunaj tihih ur), ves pesek pa zamenjati vsakih ${p.change_days} dni.`,
    scratching_after_missed_play: () => "Po dnevu brez dovolj igre mačka enkrat nekaj spraska; otrok jo odnese na praskalnik.",
    grooming_rule: (p) => `Česanje ${p.per_week}-krat na teden.`,
  },
  health: {
    weight_gain: "Hitro se zredi — pazite na velikost obrokov in priboljške.",
    hip_elbow_dysplasia_eye_conditions: "Lahko je nagnjen k displaziji kolkov in komolcev ter k več dednim boleznim oči.",
    cancer_risk: "Viri pri tej pasmi navajajo večje tveganje za raka.",
    flat_face_breathing: "Pasma s ploščatim obrazom (brahicefalna): kratek gobček, ozke nosnice in odvečno mehko tkivo v dihalih lahko otežijo dihanje (brahicefalni obstruktivni sindrom dihalnih poti, BOAS).",
    heat_stroke_risk: "Hitro se pregreje in je bolj dovzeten za toplotni udar kot večina psov, zlasti v toplem vremenu.",
    skin_fold_ear_problems: "Nagnjen je k vnetjem ušes in okužbam kožnih gub; kožne gube morajo biti čiste in suhe.",
    merle_colour_risk: "Barva merle ni v standardu pasme; pri tej pasmi pomeni večje tveganje za težave s sluhom in vidom.",
  },
  page: {
    eyebrow: "Register živali",
    metaTitle: (name, one, species) =>
      species === "dog"
        ? `${name}: gibanje, velikost, življenjska doba in nega | PetPrep`
        : species === "cat"
          ? `${name}: velikost, življenjska doba in nega | PetPrep`
          : `${name} (${one.toLowerCase()}): potrebe, življenjska doba in nega | PetPrep`,
    metaDescription: (name) =>
      `${name}: potrebe pasme iz virov — gibanje, nega, obroki, velikost, življenjska doba in za koga je primerna — ter kako jo simulira PetPrep.`,
    suitabilityTitle: "Za koga je primerna",
    suitabilityNote: "Iste oznake kot v aplikaciji. Vsako oznako podpirajo viri, navedeni na dnu strani.",
    suitabilityNone: "Za to pasmo še nimamo oznak, podprtih z viri.",
    needsTitle: "Kaj potrebuje",
    needsIntro: (species) =>
      species === "cat"
        ? "Iz podatkov mačjih zvez, veterinarskih organizacij in raziskav. Kjer se viri razlikujejo, navajamo vse."
        : "Iz standardov pasem, kinoloških zvez, veterinarskih dobrodelnih organizacij in raziskav. Kjer se viri razlikujejo, navajamo vse.",
    general: (many) => `Splošna priporočila (${many.toLowerCase()}, ne posebej za to pasmo):`,
    noData: "V naših virih tega še ni.",
    simTitle: "Kako to simulira PetPrep",
    simBadge: "Pravila igre, ne veterinarski nasvet",
    simIntro:
      "V PetPrep je en resnični teden en mesec življenja ljubljenčka. To so pravila, ki jih igra uporablja za to pasmo. PetPrep jih je izbral na podlagi virov s te strani; niso navodila za nego prave živali.",
    simInfoOnly: "Pasma je v registru samo za informacijo; aplikacija je še ne simulira.",
    simTable: { stage: "Obdobje", starts: "Začetek", meals: "Obrokov na dan", activity: { steps: "Cilj korakov na dan", play_sessions: "Igra na dan" } },
    arrives: (m) => `pride pri ${m} ${form(m, "mesecu", "mesecih", "mesecih", "mesecih")}`,
    fromMonth: (m, years) => (years ? `${m}. mesec (${years})` : `${m}. mesec`),
    meals: (steps) => steps.map((x) => (x.from === null ? String(x.meals) : `od ${x.from}. meseca: ${x.meals}`)).join("; "),
    simDecisions: "Vsaka številka igre je zapisana odločitev PetPrep z navedenimi viri.",
    healthTitle: "Zdravje",
    healthNote: "Informativno, ni veterinarsko preverjeno. O zdravju svoje živali se posvetujte z veterinarjem.",
    healthNone: "V naših virih za to pasmo še ni podatkov o zdravju, značilnih za pasmo.",
    sourcesTitle: "Viri",
    sourcesIntro: "Vsako dejstvo na tej strani navaja enega od teh virov.",
    sourceLabel: (id, publisher) => `Vir ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulacija za družine. Ta stran ni veterinarski nasvet — za pravo žival se posvetujte z veterinarjem ali klubom pasme.",
    backTo: (many) => `Vse pasme: ${many.toLowerCase()}`,
    compareWith: "Primerjaj z drugimi pasmami",
    updated: "Posodobljeno",
    glanceTitle: "Na kratko",
    glanceNote: "Ključna dejstva iz virov na dnu strani. Kjer se viri razlikujejo, je navedena vsaka vrednost.",
    portraitAlt: { ai_photo: (name) => `${name} — fotografija (AI)`, ai_illustration: (name) => `${name} — ilustracija (AI)` },
    portraitCaption: { ai_photo: "Fotografija, ustvarjena z AI", ai_illustration: "Ilustracija, ustvarjena z AI" },
    qa: {
      title: "Vprašanja in odgovori",
      intro: "Odgovori temeljijo samo na dejstvih z viri s te strani; vsak odgovor navaja svoje vire.",
      questions: {
        exercise: (n) => `Koliko gibanja potrebuje ${mid(n)}?`,
        lifespan: (n) => `Kako dolgo živi ${mid(n)}?`,
        size: (n) => `Kakšne velikosti je ${mid(n)}?`,
        grooming: (n) => `Koliko nege dlake potrebuje ${mid(n)}?`,
        suits: (n) => `Za koga je ${mid(n)} primerna izbira?`,
      },
      leads: {
        exercise: (n) => `Po naših virih potrebuje ${mid(n)} toliko gibanja:`,
        lifespan: (n) => `Po naših virih je življenjska doba pasme ${mid(n)}:`,
        size: (n) => `Velikost in teža pasme ${mid(n)} po naših virih:`,
        grooming: (n) => `Dlaka in nega pasme ${mid(n)} po naših virih:`,
        suits: (n) => `Po naših virih je ${mid(n)} primerna izbira za:`,
      },
      considerLead: "Upoštevajte:",
      differ: "Viri navajajo različne vrednosti, zato navajamo vsako.",
      join: "; ",
    },
  },
  intros: {
    border_collie: {
      text: [
        "Border collie je srednje velik ovčarski pes iz Velike Britanije, grajen za vzdržljivost in trdo delo. Standard pasme ga opisuje kot vnetega, pozornega, odzivnega in inteligentnega psa, ki ni niti plašen niti napadalen.",
        "Kinološke zveze in veterinarji se strinjajo predvsem v enem: to je pasma z zelo veliko energije. Vsak dan potrebuje več kot dve uri gibanja in veliko miselnih izzivov. Če se dolgočasi ali se premalo giblje, si delo poišče sam — grize, kar doseže, ali pri igri »pase« otroke.",
      ],
      sources: ["S1", "S2", "S4", "S5", "S7"],
    },
    labrador_retriever: {
      aka: "labradorski prinašalec, Labrador Retriever",
      text: [
        "Labradorec (labradorski prinašalec) je velik, močno grajen lovski pes iz Velike Britanije, vzrejen za prinašanje. Standard ga opisuje kot dobrovoljnega, prijaznega in prilagodljivega spremljevalca, ki rad ugodi in obožuje vodo. Dlaka je kratka in gosta, črna, rumena ali jetrno rjava (čokoladna).",
        "Britanske dobrodelne organizacije ga opisujejo kot družinskega psa, ki se ob dobri socializaciji naveže na vso družino. Je zelo aktiven in zelo rad je: priboljški pomagajo pri šolanju, a se labradorci tudi hitro zredijo.",
      ],
      sources: ["S48", "S49", "S50", "S53", "S59"],
    },
    golden_retriever: {
      aka: "Golden Retriever",
      text: [
        "Zlati prinašalec je velik lovski pes iz Velike Britanije z ravno ali valovito dlako v odtenkih zlate ali kremne barve. Standard ga opisuje kot ubogljivega in inteligentnega psa, ki je prijazen, družaben in samozavesten.",
        "Britanske dobrodelne organizacije ga opisujejo kot odličnega psa za aktivno družino, ki je lahko tudi dober prvi pes. Viri pa jasno povedo, kaj to pomeni: vsaj dve uri gibanja na dan, krtačenje večkrat na teden in dlako, ki močno izpada.",
      ],
      sources: ["S63", "S64", "S65", "S66", "S68", "S69"],
    },
    french_bulldog: {
      aka: "French Bulldog, frenchie",
      text: [
        "Francoski buldog je majhen, čvrst pes za družbo iz Francije s kratko, gladko dlako in pokončnimi »netopirskimi« ušesi. Standard ga opisuje kot družabnega, živahnega in igrivega psa, britanske dobrodelne organizacije pa kot sproščenega in prilagodljivega psa, ki se praviloma dobro razume z otroki — zato je priljubljen družinski pes.",
        "Potrebuje največ eno uro gibanja na dan in je primeren za stanovanje. Vsi viri pa opozarjajo na ploščat obraz: francoski buldog lahko težje diha in se hitro pregreje, zlasti v toplem vremenu, zato potrebuje senco, vodo in mirne sprehode. PDSA družinam svetuje, naj razmislijo tudi o posvojitvi odraslega francoskega buldoga.",
      ],
      sources: ["S76", "S78", "S79", "S81", "S82"],
    },
  },
};

export default sl;
