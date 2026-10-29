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
/** Name inside a sentence: "Labradorec" → "labradorec". Names that start with a proper name keep the capital
 * ("Maine Coon", "Chesapeake Bay retriver", "Jack Russell terier"); "Kavalir King Charles španjel" → "kavalir …". */
const PROPER_START = /^(Maine Coon|Chesapeake|Jack Russell)\b/;
const mid = (name: string) => (PROPER_START.test(name) ? name : name.charAt(0).toLocaleLowerCase("sl") + name.slice(1));
const fciGroups: Record<number, string> = { 1: "ovčarski in pastirski psi", 2: "pinči in šnavcerji, molosi ter švicarski planšarski in pastirski psi", 3: "terierji", 4: "jazbečarji", 5: "špici in pasme pramaternega tipa", 6: "goniči, krvosledniki in sorodne pasme", 7: "ptičarji", 8: "prinašalci, šarivci in vodni psi", 9: "psi za družbo in pritlikavi psi", 10: "hrti" };
const origins: Record<string, string> = { GB: "Velika Britanija", FR: "Francija", DE: "Nemčija", US: "ZDA", CU: "Kuba", CH: "Švica", IT: "Italija", "CN-XZ": "Tibet (Kitajska)", CN: "Kitajska", MX: "Mehika", BE: "Belgija", HU: "Madžarska", JP: "Japonska", ZA: "Južna Afrika", "BE-FR": "Belgija / Francija", PT: "Portugalska", CA: "Kanada", HR: "Hrvaška", AU: "Avstralija", RU: "Rusija" };

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
      "Kjer ima pasma velikostni razred (pri psih: zelo majhen, majhen, srednje velik, srednje velik do velik, velik ali zelo velik), je to razred, ki ga navaja imenovani vir — običajno kinološka zveza — teže pa so razponi, ki jih navajajo viri, in ne naše ocene.",
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
    size: { label: "Velikost", values: { toy: "Zelo majhen", small: "Majhen", small_medium: "Majhen do srednje velik", medium: "Srednje velik", medium_large: "Srednje velik do velik", large: "Velik", giant: "Zelo velik" } },
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
    size: { toy: "zelo majhen", small: "majhen", small_medium: "majhen do srednje velik", medium: "srednje velik", medium_large: "srednje velik do velik", large: "velik", giant: "zelo velik" },
    coat: { moderately_long: "zmerno dolga", smooth: "gladka (kratka)", short: "kratka", medium: "srednje dolga", short_long: "kratka ali dolga (dve različici dlake)", long: "dolga" },
    grooming_frequency: { at_least_once_a_week: "vsaj enkrat na teden", at_least_once_or_twice_a_week: "vsaj enkrat do dvakrat na teden", once_a_week: "enkrat na teden", more_than_once_a_week: "večkrat na teden", daily: "vsak dan", every_day: "vsak dan" },
    grooming_level: { moderate: "zmerne", high: "velike", low: "majhne" },
    shedding: { yes: "dlaka izpada", no: "dlaka ne izpada (to ne pomeni, da je hipoalergen)", high: "dlaka močno izpada", moderate: "dlaka zmerno izpada", low: "dlaka malo izpada", minimal: "dlaka zelo malo izpada" },
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
    less_than: (t) => `manj kot ${t}`,
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
        : p.multiplier === 1
          ? "Ukaze se uči enako hitro kot mešanček iz brezplačnega plana."
          : `Ukaze se uči ${f.num(p.multiplier)}-krat hitreje kot mešanček iz brezplačnega plana.`,
    senior_share: (p, f) => `Starejši pes postane v ${p.months}. mesecu (${f.num(p.months / 12, 1)} ${form(p.months / 12, "leto", "leti", "leta", "let")}) — v zadnji četrtini pričakovane življenjske dobe pasme.`,
    walk_sensor: () => "Sprehodi štejejo prave korake iz Apple Zdravje ali Health Connect (z dovoljenjem, samo za branje) in s senzorja gibanja v telefonu — brez GPS.",
    play_instead_of_steps: (p, f) =>
      `Brez sprehodov: odrasla mačka potrebuje ${p.sessions} ${form(p.sessions, "igro", "igri", "igre", "iger")} na dan s palico z vabo, vsaj ${f.num(p.gap_minutes / 60)} ${form(p.gap_minutes / 60, "uro", "uri", "ure", "ur")} narazen.`,
    litter_rule: (p) =>
      `Stranišče: odrasla mačka ga uporabi ${p.uses}-krat na dan; vsako uporabo je treba počistiti v ${p.scoop_hours} urah (zunaj tihih ur), ves pesek pa zamenjati vsakih ${p.change_days} dni.`,
    scratching_after_missed_play: () => "Po dnevu brez dovolj igre mačka enkrat nekaj spraska; otrok jo odnese na praskalnik.",
    grooming_rule: (p) => (p.per_week === 1 ? "Česanje enkrat na teden." : p.per_week === 2 ? "Česanje dvakrat na teden." : `Česanje ${p.per_week}-krat na teden.`),
    no_walk_in_heat: (p) =>
      `Poleti (junij–avgust; na južni polobli december–februar) otrokov zaslon in zaslon sprehoda med ${p.from} in ${p.to} po času družine mirno opozorita: v vročini brez sprehodov. Brez vremenskih podatkov, brez kazni — koraki se štejejo.`,
    care_task: (p) => {
      const q = p as unknown as { task: string; actor: string; times: number; period_days: number };
      const task: Record<string, string> = {
        fold_cleaning: "čiščenje kožnih gub",
        tooth_brushing: "ščetkanje zob",
        ear_cleaning: "pregled in čiščenje ušes",
        nail_trim: "striženje krempljev",
        bath: "kopanje",
        groomer_visit: "obisk pri pasjem frizerju",
      };
      const what = task[q.task] ?? q.task.replace(/_/g, " ");
      const weeks = q.period_days / 7;
      const when =
        q.period_days === 7 && q.times === 7
          ? "vsak dan"
          : q.times === 1 && q.period_days % 7 === 0
            ? q.period_days === 7
              ? "enkrat na teden"
              : `${weeks === 2 ? "vsaka" : weeks <= 4 ? "vsake" : "vsakih"} ${weeks} ${form(weeks, "teden", "tedna", "tedne", "tednov")}`
            : `${q.times}-krat vsakih ${q.period_days} dni`;
      const who = q.actor === "parent" ? "opomnik za starša" : "naloga za otroka";
      return `Nega: ${what} ${when} — ${who}.`;
    },
  },
  checklist: {
    items: {
      see_mother: "Mladička si oglejte skupaj z mamo, tam, kjer se je skotil.",
      min_age_puppy: "Mladiček naj ne zapusti mame pred 8. tednom starosti.",
      pedigree_fci: "Prosite za rodovnik. Po pravilih FCI se rodovnik sme izdati le za pravilno poreklo.",
      parents_health_tests: "Prosite za izvide zdravstvenih testov obeh staršev. Kateri testi so pomembni, je odvisno od pasme.",
      breed_club_rules: "Nacionalne kinološke zveze lahko postavijo vzrejna pravila, ki presegajo pravila FCI — vprašajte pasemski klub, katere teste morajo opraviti starši.",
      written_contract: "Prosite za pisno kupoprodajno pogodbo, ki zapiše poreklo in zdravje mladička.",
      kitten_see_mother: "Mladička si oglejte skupaj z mamo, tam, kjer mladiči živijo.",
      kitten_min_age: "Po pravilih FIFe za rodovniške mačke mladič ne gre v nov dom pred 14. tednom starosti.",
      kitten_vaccination: "Mladiček je v celoti cepljen (panlevkopenija, kalicivirus, herpesvirus) in ima potrdilo o cepljenju.",
      kitten_pedigree: "Rodovniški mladiček ima rodovnik z vsaj tremi generacijami.",
      kitten_parents_tests: "Vprašajte, ali je imel kateri od staršev zdravstvene težave, ki bi jih mladiček lahko podedoval.",
      min_age_puppy_si: "Po pravilniku o zaščiti hišnih živali (2009) mladička ni dovoljeno odvzeti od psice pred dopolnjenim 8. tednom starosti.",
      microchip_registration: "Pes mora biti do dopolnjenega 8. tedna starosti označen z mikročipom, novi lastnik pa lastništvo prijavi v 7 dneh.",
      vaccination_records: "Po pravilniku o zaščiti hišnih živali (2009) vam mora prodajalec izročiti predpisane veterinarske dokumente.",
      rabies_vaccination: "Cepljenje psov proti steklini je obvezno; po pravilniku iz leta 2006 ga lastnik zagotovi, ko pes dopolni 3 mesece.",
      kzs_member_si: "Slovenska članica FCI je Kinološka zveza Slovenije.",
      parents_dna_profile: "Veterinarska fakulteta v Ljubljani, uradni izvajalec za Kinološko zvezo Slovenije, navaja, da je profil DNK za lastnike vzrejnih psov obvezen — vprašajte, ali ga imata oba starša.",
      kitten_min_age_si: "Po pravilniku o zaščiti hišnih živali (2009) mladiča ni dovoljeno odvzeti od mačke pred dopolnjenim 12. tednom starosti.",
      zfds_member_si: "Slovenska članica FIFe je Zveza felinoloških društev Slovenije (ZFDS).",
    },
    tests: {
      hip_scheme: "Rentgensko slikanje kolkov za displazijo kolkov (VB: shema BVA/KC)",
      elbow_scheme: "Rentgensko slikanje komolcev za displazijo komolcev (VB: shema BVA/KC)",
      eye_scheme: "Pregled oči pri veterinarskem specialistu za oči (VB: shema BVA/KC/ISDS; pri nekaterih pasmah z gonioskopijo)",
      heart_scheme: "Pregled srca za bolezen mitralne zaklopke",
      boas_grading: "Test dihanja za brahicefalični obstruktivni sindrom dihalnih poti (ocena BOAS)",
      ivdd_screening: "Pregled hrbtenice za bolezen medvretenčnih ploščic (IVDD)",
      hearing_baer: "Test sluha za gluhost (BAER)",
      cm_sm_mri: "Slikanje z magnetno resonanco za Chiarijevi podobno malformacijo in siringomielijo (VB: shema BVA/KC CM/SM)",
      inbreeding_coi: "Genska pestrost — preverite koeficient inbridinga",
      dna_prcd_pra: "Test DNK za progresivno atrofijo mrežnice (prcd-PRA)",
      dna_rcd4_pra: "Test DNK za progresivno atrofijo mrežnice (rcd4)",
      dna_gr_pra2: "Test DNK za progresivno atrofijo mrežnice (GR_PRA2)",
      dna_cnm: "Test DNK za centronuklearno miopatijo (CNM)",
      dna_eic: "Test DNK za kolaps ob naporu (EIC)",
      dna_hnpk: "Test DNK za dedno nosno parakeratozo (HNPK)",
      dna_sd2: "Test DNK za skeletno displazijo 2 (SD2)",
      dna_mcd: "Test DNK za makularno distrofijo roženice (MCD)",
      dna_stgd: "Test DNK za Stargardtovo bolezen (STGD)",
      dna_cc_de: "Test DNK za sindrom kodraste dlake in suhega očesa (CC/DE)",
      dna_ef: "Test DNK za epizodično padanje (EF)",
      dna_cea: "Test DNK za anomalijo očesa ovčarjev (CEA/CH)",
      dna_cl: "Test DNK za ceroidno lipofuscinozo (CL)",
      dna_igs: "Test DNK za Imerslund-Gräsbeckov sindrom (IGS)",
      dna_mdr1: "Test DNK za občutljivost na zdravila (MDR1)",
      dna_tns: "Test DNK za sindrom ujetih nevtrofilcev (TNS)",
      dna_sn: "Test DNK za senzorično nevropatijo (SN)",
      dna_ggd: "Test DNK za goniodisgenezo in tveganje za glavkom (GGD)",
      dna_raines: "Test DNK za Rainov sindrom",
      dna_dm: "Test DNK za degenerativno mielopatijo (DM)",
      dna_de: "Test DNK za degenerativno encefalopatijo (DE)",
      dna_jadd: "Test DNK za juvenilno Addisonovo bolezen (JADD)",
      dermoid_sinus_scheme: "Pregled mladičkov na dermoidni sinus (shema klubov pasme)",
      dna_jme: "Test DNK za juvenilno mioklonično epilepsijo (JME)",
      dna_pap_pra1: "Test DNK za progresivno atrofijo mrežnice pri papijonih (Pap-PRA1)",
      dna_nad: "Test DNK za nevroaksonsko distrofijo (NAD)",
      dna_eopra: "Test DNK za zgodaj nastopajočo progresivno atrofijo mrežnice (EOPRA)",
      dna_cu: "Test DNK za cistinurijo (CU), dedno bolezen s kamni v ledvicah in mehurju",
      heart_echo_scheme: "Pregled srca z barvnim dopplerskim ultrazvokom (shema pasemskega kluba)",
      cardiac_exam: "Pregled srca staršev (priporočilo pasemskega kluba)",
      dna_rd_osd: "Test DNK za displazijo mrežnice / okulo-skeletno displazijo (RD/OSD)",
      dna_xlpra1: "Test DNK za na X vezano progresivno atrofijo mrežnice (XLPRA1)",
      dna_cmo: "Test za kraniomandibularno osteopatijo (CMO), dedno bolezen kosti čeljusti",
      dna_hsf4: "Test DNK za dedno sivo mreno (HSF4)",
      dna_lafora: "Test DNK za Laforino bolezen",
      dna_nccd: "Test DNK za neonatalno degeneracijo skorje malih možganov (NCCD)",
      dna_fviid: "Test DNK za pomanjkanje faktorja VII (FVIID)",
      dna_mls: "Test DNK za Musladin-Luekejev sindrom (MLS)",
      dna_vwd1: "Test DNK za von Willebrandovo bolezen tipa 1 (vWD1)",
      dna_mac: "Test DNK za dovzetnost za okužbo z bakterijami Mycobacterium avium (MAC)",
      dna_imgd: "Test DNK za dedno miopatijo nemških dog (IMGD), bolezen, pri kateri mišice slabijo",
      dna_poag: "Test DNK za primarni glavkom odprtega zakota (POAG), dedno očesno bolezen, ki lahko vodi v slepoto",
      dna_aon: "Test DNK za nevropatijo z začetkom v odrasli dobi (AON), dedno bolezen živcev",
      dna_fn: "Test DNK za družinsko nefropatijo (FN), dedno bolezen ledvic",
      patella_scheme: "Pregled pogačic za zdrsavanje pogačice (luksacijo patele) pred parjenjem",
      kidney_scheme: "Ultrazvok ledvic zaradi manjkajoče ali nepravilno razvite ledvice (priporočilo pasemskega kluba)",
      kidney_upc_scheme: "Test urina (razmerje beljakovine : kreatinin) za bolezen ledvic (priporočilo pasemskega kluba)",
      dna_gld: "Test DNK za globoidnocelično levkodistrofijo (GLD), dedno bolezen živčevja",
      liver_shunt_scheme: "Pregled jeter za portosistemski šant ali mikrovaskularno displazijo (priporočilo pasemskega kluba)",
      breed_health_scheme: "Zdravstveni program pasemskega kluba za starša",
      hemivertebrae_scheme: "Rentgen hrbtenice staršev za hemivertebre (nepravilno oblikovana vretenca), po 12. mesecu starosti",
      dna_dings2: "Test DNK za »plesočo bolezen dobermanov« (DINGS2), bolezen živcev in mišic",
      dna_ams: "Test DNK za akralni mutilacijski sindrom (AMS), motnjo živcev, zaradi katere pes v tačkah ne čuti bolečine",
      dna_dams: "Test DNK za diseritropoetsko anemijo in miopatijo (DAMS), motnjo krvi in mišic",
      dna_fuco: "Test DNK za fukozidozo, dedno bolezen živčevja",
      dna_pfk: "Test DNK za pomanjkanje fosfofruktokinaze (PFK), dedno encimsko motnjo krvi in mišic",
      dna_pra_cord1: "Test DNK za progresivno atrofijo mrežnice (PRA cord1)",
      dna_bbs2_pra: "Test DNK za progresivno atrofijo mrežnice (BBS2-PRA)",
      dna_cnga1_pra: "Test DNK za progresivno atrofijo mrežnice (CNGA1-PRA)",
      dna_pra_rcd2: "Test DNK za progresivno atrofijo mrežnice (PRA-rcd2)",
      dna_gm1: "Test DNK za gangliozidozo GM1 (dedna bolezen živčevja)",
      dna_gm2: "Test DNK za gangliozidozo GM2 (dedna bolezen živčevja)",
      dna_vwd3: "Test DNK za von Willebrandovo bolezen tipa 3 (vWD3), dedno motnjo strjevanja krvi",
      dna_pra_rcd3: "Test DNK za progresivno atrofijo mrežnice (PRA-rcd3)",
      dna_vwd2: "Test DNK za von Willebrandovo bolezen tipa 2 (vWD2), dedno motnjo strjevanja krvi",
      dna_l2hga: "Test DNK za L-2-hidroksiglutarno acidurijo (L-2-HGA), dedno presnovno bolezen živčevja",
      dna_pll: "Test DNK za primarno luksacijo leče (PLL), dedno bolezen oči, pri kateri leča zdrsne s svojega mesta",
      dna_loa: "Test DNK za pozno nastalo ataksijo (LOA), dedno bolezen, ki prizadene ravnotežje in usklajenost gibov",
      dna_sca: "Test DNK za spinocerebelarno ataksijo (SCA), dedno bolezen živčevja",
      dna_hcm_mc: "Test DNK za hipertrofično kardiomiopatijo (MC HCM)",
      dna_sma: "Test DNK za spinalno mišično atrofijo (SMA)",
      dna_pk_def: "Test DNK za pomanjkanje piruvat-kinaze (PK def)",
      hcm_negative: "Vzrejne mačke morajo biti HCM negativne (bolezen srca: hipertrofična kardiomiopatija)",
      dna_gsd4: "Test DNK za bolezen kopičenja glikogena tipa IV (GSD IV)",
      dna_pra_b: "Test DNK za progresivno atrofijo mrežnice pri bengalski mački (PRA-b)",
      dna_jlpp: "Test DNK za juvenilno paralizo grla in polinevropatijo (JLPP)",
      dna_lemp2: "Test DNK za levkoencefalomielopatijo (LEMP-2)",
      dna_huu: "Test DNK za hiperurikozurijo (HUU)",
      dna_dcm: "Test DNK za dilatacijsko kardiomiopatijo (DCM), bolezen srčne mišice",
      dna_pra5: "Test DNK za progresivno atrofijo mrežnice (PRA5)",
    },
  },
  health: {
    weight_gain: "Hitro se zredi — pazite na velikost obrokov in priboljške.",
    hip_elbow_dysplasia_eye_conditions: "Lahko je nagnjen k displaziji kolkov in komolcev ter k več dednim boleznim oči.",
    cancer_risk: "Viri pri tej pasmi navajajo večje tveganje za raka.",
    flat_face_breathing: "Pasma s ploščatim obrazom (brahicefalna): kratek gobček, ozke nosnice in odvečno mehko tkivo v dihalih lahko otežijo dihanje (brahicefalni obstruktivni sindrom dihalnih poti, BOAS).",
    heat_stroke_risk: "Hitro se pregreje in je bolj dovzeten za toplotni udar kot večina psov, zlasti v toplem vremenu.",
    skin_fold_ear_problems: "Nagnjen je k vnetjem ušes in okužbam kožnih gub; kožne gube morajo biti čiste in suhe.",
    ear_infections_long_ears: "Zaradi dolgih ušes se lahko pojavijo vnetja ušes; v sluhovodu se lahko namnožijo bakterije.",
    collie_eye_pra: "Pri pasmi se pojavljata dedni bolezni oči: anomalija očesa škotskih ovčarjev (collie eye anomaly), nepravilnost v zadnjem delu očesa, in progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto; na voljo so pregledi oči in testi DNK.",
    merle_colour_risk: "Barva merle ni v standardu pasme; pri tej pasmi pomeni večje tveganje za težave s sluhom in vidom.",
    hind_leg_conformation: "The Royal Kennel Club pri tej pasmi opozarja na obliko zadnjih nog in način gibanja; zdrav pes ima raven hrbet in zmerno zakotene zadnje noge.",
    hip_elbow_dysplasia: "Lahko je nagnjen k displaziji kolkov in komolcev; vzrediteljem svetujejo, naj psom pred paritvijo pregledajo kolke in komolce.",
    degenerative_myelopathy: "Pri pasmi se pojavlja degenerativna mielopatija, bolezen hrbtenjače, ki počasi slabi zadnje noge; na voljo je test DNK.",
    exercise_induced_collapse: "Pri pasmi se pojavlja kolaps ob naporu (EIC), dedna živčno-mišična bolezen, zaradi katere se pes po močnem naporu lahko zgrudi.",
    heart_valve_disease: "Bolezen srca zaradi oslabljene mitralne zaklopke je pri tej pasmi velika težava; pogosto jo najprej opazijo kot srčni šum, zato naj imajo psi za vzrejo najprej pregledano srce.",
    chiari_syringomyelia: "Pri pasmi se pojavljata Chiarijeva malformacija in siringomielija, boleča bolezen z votlinicami, polnimi tekočine, v hrbtenjači ob možganih; povezana je z obliko lobanje, ugotovijo jo z MRI.",
    eye_conditions: "Pri pasmi se pojavljajo dedne bolezni oči, na primer siva mrena, izbuljene ali razdražene oči pa so opozorilo pri presoji; na voljo so pregledi oči in testi DNK.",
    epilepsy: "Pri pasmi se pojavlja epilepsija, bolezen možganov, ki lahko povzroči napade.",
    back_disc_disease: "Pri pasmi se pojavlja bolezen medvretenčnih ploščic, ki blažijo stik med vretenci hrbtenice.",
    pra_eye_disease: "Pri pasmi se pojavlja progresivna atrofija mrežnice, dedna bolezen oči, ki lahko počasi vodi v slepoto; na voljo so DNK testi in pregledi oči.",
    hip_dysplasia: "Pri pasmi se pojavlja displazija kolkov, slabo razvit kolčni sklep, ki lahko vodi v artrozo; vzrediteljem svetujejo pregled kolkov staršev.",
    bloat_gdv: "Pri pasmi se lahko pojavi zasuk želodca (napihnjenost, GDV) — to je nujno stanje, ki takoj potrebuje veterinarja.",
    inherited_eye_disease: "Pri pasmi se pojavljajo dedne bolezni oči, na primer anomalija očesa škotskih ovčarjev (CEA), siva mrena in progresivna atrofija mrežnice.",
    drug_sensitivity_mdr1: "Nekateri psi te pasme so dedno občutljivi na nekatera zdravila (MDR1) — če je vaš pes občutljiv, to povejte veterinarju.",
    merle_to_merle_breeding: "Merle je pri tej pasmi barva iz standarda; dveh psov merle pa ne smemo pariti med seboj, ker imajo takšni mladiči večje tveganje za okvare vida in sluha — The Royal Kennel Club jih ne registrira.",
    kneecap_luxation: "Pri pasmi se pojavlja zdrsavanje pogačice (luksacija patele), ko pogačica začasno skoči iz ležišča.",
    pra_and_eyelashes: "Pri pasmi se pojavljajo težave z očmi: progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto, in dodatne trepalnice, ki drgnejo oko (distihiaza); vzrediteljem svetujejo pregled oči staršev.",
    liver_shunt: "Pri pasmi se lahko pojavi portosistemski (jetrni) šant, pri katerem kri obide jetra.",
    skin_allergies: "Kožne alergije so pri pasmi znana skrb; The Royal Kennel Club sodnikom naroča, naj bodo pozorni na znake vnetja kože, lastnikom pa svetujejo, naj se pred izbiro šampona posvetujejo z veterinarjem.",
    westie_lung: "Pri pasmi se lahko pojavi bolezen pljuč, imenovana »westie lung« (idiopatska pljučna fibroza), ki otežuje dihanje — največkrat pri starejših psih.",
    jaw_bone_disorder: "Pri pasmi se lahko pojavi dedna bolezen čeljustne kosti.",
    dry_eye: "Pri pasmi se lahko pojavi suho oko, ko oči ne tvorijo dovolj solz ter postanejo suhe in boleče.",
    heart_hcm: "Pri pasmi se pojavlja hipertrofična kardiomiopatija (HCM), dedna bolezen srca, pri kateri se srčna mišica zadebeli.",
    dental_weight_nail_care: "Velika britanska raziskava med najpogostejšimi težavami pasme navaja bolezni zob, prekomerno težo in predolge kremplje, zato lastnikom svetujejo redno nego zob, nadzor teže in skrajševanje krempljev.",
    dental_weight_care: "PetMD med težavami, na katere je treba paziti, navaja bolezni zob in prekomerno težo, zato lastnikom svetuje redno ščetkanje zob in nadzor teže.",
    gsd_iv: "Pri pasmi se pojavlja dedna bolezen kopičenja glikogena tipa IV (GSD IV), ki prizadene mucke; z DNK-testom staršev se ji vzreditelji lahko izognejo.",
    hip_dysplasia_weight: "Pri pasmi se lahko pojavi displazija kolkov (slabo razvit kolčni sklep); PetMD svetuje, da mačka ohranja zdravo težo, ki varuje sklepe.",
    laryngeal_paralysis_polyneuropathy: "Pri pasmi se pojavlja juvenilna paraliza grla in polinevropatija (JLPP), dedna bolezen živcev, ki prizadene grlo in zadnje noge; z DNK-testom staršev se ji vzreditelji lahko izognejo.",
    heart_sas: "Pri pasmi se pojavlja subaortna stenoza, zožitev tik pod srčno zaklopko, ki lahko povzroči srčni šum; psi za vzrejo naj imajo najprej pregledano srce.",
    inherited_eye_defects: "Pri pasmi se pojavljajo dedne bolezni oči, na primer displazija mrežnice in obstojna zenična membrana; na voljo je pregled oči.",
    skin_fold_infections: "Kožne gube, zlasti na obrazu, lahko zadržujejo vlago in se okužijo (piodermija kožnih gub); gube na obrazu je treba čistiti vsak dan.",
    eyelid_eye_problems: "Pri pasmi se pojavljajo težave z vekami (navznoter ali navzven obrnjene veke), suho oko in »češnjevo oko«; na voljo je pregled oči.",
    hip_elbow_joint_disease: "Pri pasmi se pojavljata displazija kolkov in komolcev, ko se sklepi ne razvijejo pravilno, kar lahko vodi v bolezen sklepov.",
    hip_dysplasia_arthritis: "Pri pasmi se pojavlja displazija kolkov — ohlapen, slabo razvit kolčni sklep, ki sčasoma lahko vodi v artritis.",
    bleeding_disorder_vwd: "Pri pasmi se pojavlja von Willebrandova bolezen, podedovana motnja strjevanja krvi, ki lahko povzroči čezmerno krvavitev.",
    heart_muscle_disease: "Pri pasmi se lahko pojavi kardiomiopatija — povečano srce zaradi oslabljene srčne mišice.",
    itchy_skin_allergy: "Pri pasmi se lahko pojavijo kožne alergije (atopija), ki povzročajo srbenje in razdraženo kožo.",
    entropion_cherry_eye: "Pri pasmi se lahko pojavijo navznoter zavihane veke (entropij) in »češnjevo oko«, ko izstopi tretja veka; češnjevo oko je mogoče kirurško popraviti.",
    dental_disease_tooth_brushing: "Velika britanska raziskava navaja bolezen zob kot daleč najpogostejšo težavo pasme, pogosti so tudi mlečni zobje, ki ne izpadejo, zato lastnikom svetuje vsakodnevno nego zob, na primer ščetkanje.",
    windpipe_collapse: "Pri pasmi se lahko pojavi kolaps sapnika — sapnik izgubi trdnost, kar lahko povzroči šibkost in kolaps.",
    eye_problems_pra_lens_dry_eye: "Pri pasmi se pojavljajo težave z očmi, na primer progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto, izpah očesne leče in suho oko.",
    cataracts_lens_luxation: "Pri pasmi se lahko pojavijo težave z očmi, na primer siva mrena, ki zamegli lečo, in izpah leče.",
    wobbler_syndrome: "Pri pasmi se lahko pojavi sindrom wobbler: nestabilna vratna vretenca pritiskajo na hrbtenjačo in oslabijo zadnje noge.",
    eye_phpv: "Pri pasmi se lahko pojavi prirojena okvara očesa (persistentni hiperplastični primarni steklovinec, PHPV); vzrediteljem priporočajo pregled oči staršev.",
    certain_cancers: "Pri pasmi se lahko pojavijo nekatere vrste raka.",
    bare_skin_sun_cold: "Golo kožo gole različice je treba zaščititi pred soncem in mrazom.",
    l2hga_nervous_system: "Pri pasmi se lahko pojavi L-2-hidroksiglutarna acidurija (L-2-HGA), dedna presnovna motnja, ki prizadene živčevje; za starše je na voljo test DNK.",
    short_face_breathing: "Zmerno kratkoglava pasma: nekateri psi s krajšim gobčkom imajo lahko resne težave z dihanjem (brahicefalni obstruktivni sindrom dihalnih poti, BOAS).",
    corneal_ulcers: "Zaradi oblike lobanje in izbočenih oči so pogostejše težave z očmi, kot je razjeda roženice; očesni pregled je na voljo.",
    skin_folds_allergies: "Pojavijo se lahko kožne težave, kot so alergije, bradavice, kožni izrastki in vnete kožne gube na obrazu (dermatitis kožnih gub); gube na obrazu naj bodo čiste in suhe.",
    heart_cardiomyopathy_aortic_stenosis: "Pri pasmi se lahko pojavijo bolezni srca, kot sta kardiomiopatija in zožitev aorte (aortna stenoza).",
    dental_disease_care: "Velika britanska raziskava navaja bolezen zob kot najpogostejšo težavo pasme, zato lastnikom svetuje, naj negi zob namenijo posebno pozornost.",
    bladder_stones: "Pri pasmi se lahko pojavijo kamni v mehurju, skupki mineralov, ki nastanejo v mehurju in urinu.",
    deafness: "Pri pasmi se pojavlja gluhost na eno ali obe ušesi; sluh mladičev je mogoče preveriti s testom BAER.",
    mitral_valve_disease: "Pri pasmi se pojavlja bolezen mitralne zaklopke — oslabljena srčna zaklopka pušča kri nazaj v srce; veterinar lahko psom pred vzrejo posluša srce.",
    eye_problems_pra_cataracts_dry_eye: "Pri pasmi se pojavljajo težave z očmi, na primer progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto, siva mrena in suho oko; očesni pregled je na voljo.",
    skin_comedo_allergy: "Pojavijo se lahko kožne težave, kot sta komedonski sindrom šnavcerjev (vrsta vnetja dlačnih mešičkov) in kožne alergije (atopija), ki povzročajo srbenje.",
    shorter_face_boas: "Brahicefalna pasma s kratkim obrazom: krajši obraz lahko povzroči resne težave z dihanjem (brahicefalni obstruktivni sindrom dihalnih poti, BOAS).",
    eye_problems_dry_eye_cataracts_pra_retina: "Pri pasmi se pojavljajo težave z očmi, na primer suho oko, siva mrena, progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto, in odstop mrežnice.",
    hypothyroidism: "Pri pasmi se lahko pojavi premalo delujoča ščitnica (hipotiroza), ki vpliva na težo, kožo in energijo.",
    open_fontanelle: "Pri pasmi se lahko pojavi odprta mečava, mehko mesto na lobanji, ki se ne zapre povsem.",
    collapsing_trachea: "Pri pasmi se lahko pojavi kolaps sapnika, šibkost sapnika, ki lahko povzroča kašelj in težko dihanje.",
    gm1_gangliosidosis: "Pri pasmi se lahko pojavi gangliozidoza GM1, dedna bolezen živčevja; test DNK staršev jo lahko izključi.",
    addisons_disease: "Pri pasmi se lahko pojavi Addisonova bolezen, pomanjkanje hormonov nadledvične žleze.",
    diabetes_mellitus: "Pri pasmi se lahko pojavi sladkorna bolezen (diabetes mellitus), pri kateri telo ne uravnava dobro krvnega sladkorja.",
    dental_disease_home_brushing: "Kot mnogi majhni psi je pasma nagnjena k boleznim zob, zato je priporočljivo psu doma ščetkati zobe s pasjo zobno ščetko in zobno pasto.",
    dermoid_sinus: "Pri pasmi se lahko pojavi dermoidni sinus, boleča bolezen, pri kateri je koža na hrbtu povezana s hrbtenjačo; klubi pasme imajo shemo za pregled mladičkov.",
    cataracts: "Pri pasmi se lahko pojavi siva mrena, ki zamegli očesno lečo in lahko vodi v slabši vid.",
    pra_inherited_blindness: "Pri pasmi se lahko pojavi progresivna atrofija mrežnice, dedna očesna bolezen, ki lahko počasi vodi v slepoto.",
    eyelids_turned: "Pri pasmi se lahko pojavijo veke, zavihane navznoter (entropij) ali navzven (ektropij); vprašajte za pregledane oči staršev.",
    glaucoma_poag: "Pri pasmi se lahko pojavi primarni glavkom odprtega zakota, ko se v očesu nabira tekočina, kar povzroča bolečino in lahko slepoto; za starše obstaja test DNK.",
    skin_fold_dermatitis: "Ohlapna koža dela gube, ki se lahko vnamejo in okužijo; vsak dan jih je treba pregledati ter ohranjati čiste in suhe.",
    eyelid_problems: "Pri pasmi se lahko pojavijo težave z vekami: navznoter (entropij) ali navzven (ektropij) zavihane veke in »češnjevo oko«, ko izstopi tretja veka.",
    skin_allergy_face_folds: "Pri pasmi se lahko pojavijo kožne alergije (atopija), ki povzročajo srbenje; kožne gube na obrazu je treba čistiti vsak dan.",
    skin_ear_allergies: "Pri pasmi se lahko pojavijo alergije na snovi iz okolja, ki lahko vodijo v ponavljajoča se vnetja kože ali ušes; PetMD psu z alergijami svetuje čiščenje ušes enkrat na teden.",
    gum_disease_daily_brushing: "Pasma je nagnjena k boleznim dlesni (gingivitis in parodontalna bolezen), zato PetMD svetuje vsakodnevno ščetkanje zob in letni pregled zob pri veterinarju.",
    pra_pk_def: "Pri pasmi se pojavljata dve dedni bolezni: progresivna atrofija mrežnice, očesna bolezen, ki lahko vodi v slepoto, in pomanjkanje piruvat-kinaze, bolezen krvi; z DNK-testi staršev se jima vzreditelji lahko izognejo.",
    windpipe_collapse_breathing: "Pri pasmi se lahko pojavi kolaps sapnika: obročki sapnika se sesedejo in otežijo dihanje.",
    eye_problems_pra_cataracts_entropion: "Pri pasmi se pojavljajo težave z očmi, na primer progresivna atrofija mrežnice, ki lahko počasi vodi v slepoto, siva mrena, ki zamegli lečo, in navznoter zavihane veke (entropij); na voljo so pregledi oči.",
    elbow_dysplasia_arthritis: "Pri pasmi se lahko pojavi displazija komolca, slabo razvit komolčni sklep, ki sčasoma lahko vodi v artritis.",
    entropion: "Pri pasmi se lahko pojavi entropij — veke, zavihane navznoter, ki dražijo oko; vprašajte za pregledane oči staršev.",
    autoimmune_conditions: "Pri pasmi se lahko pojavijo avtoimunske bolezni, pri katerih se telo odziva proti samemu sebi.",
    ear_infections_prone: "Pasma je nagnjena k vnetjem ušes; skrbno pazite na higieno ušes.",
    familial_nephropathy: "Pri pasmi se pojavlja dedna bolezen ledvic (družinska nefropatija); za starše je na voljo test DNK.",
    hereditary_nephritis: "Pri pasmi se pojavlja dedna bolezen ledvic (dedni nefritis, imenovan tudi samojedska dedna glomerulopatija).",
    panosteitis: "Pri pasmi se lahko pojavi panosteitis, boleče vnetje dolgih kosti, ki navadno prizadene mlade pse med rastjo.",
    urinary_incontinence: "Pri pasmi se lahko pojavi inkontinenca, nehotno uhajanje urina.",
    osteochondritis: "Pri pasmi se lahko pojavi osteohondritis dissecans (OCD), motnja sklepnega hrustanca pri psih med rastjo.",
    scottie_cramp: "Pri pasmi se pojavlja »škotski krč« — kratki napadi krčenja mišic, navadno ob vznemirjenju; ni boleč.",
    periodontal_disease: "Pri pasmi je znana težava bolezen obzobnih tkiv (parodontalna bolezen), okužba in vnetje dlesni in tkiv, ki držijo zobe.",
    extra_eyelashes: "Pri pasmi se lahko pojavi distihiaza — dodatne drobne trepalnice na notranji strani ali robu veke, ki lahko drgnejo oko; vprašajte za starše, pregledane po shemi za oči.",
    cm_sm_screening: "Pri pasmi se lahko pojavita Chiarijeva malformacija in siringomielija, boleča bolezen z votlinicami, polnimi tekočine, v hrbtenjači ob možganih; vzrediteljem svetujejo pregled staršev (v Združenem kraljestvu: shema BVA/KC).",
    prominent_eyes_injury_dry_eye: "Izbuljene oči se lažje poškodujejo, na njih pa lahko nastanejo razjede in izsušenost; pri pasmi se pojavljata tudi suho oko in češnjevo oko (izpad žleze tretje veke).",
    legg_perthes: "Pri pasmi se lahko pojavi Legg-Perthesova bolezen, boleče stanje, pri katerem kolčni sklep odmre in razpade.",
    glaucoma: "Pri pasmi se lahko pojavi glavkom, povečan pritisk v očesu, ki je lahko boleč in lahko vodi v slepoto.",
    lethal_acrodermatitis: "Pri pasmi se pojavlja letalni akrodermatitis, dedna bolezen, ki pri mladičih povzroča hude težave s kožo in rastjo.",
    kidney_disease_urine_screening: "Pri pasmi se pojavljajo težave z ledvicami; s testi urina lahko starše preverijo pred parjenjem.",
    primary_lens_luxation: "Pri pasmi se pojavlja primarna luksacija leče, boleča dedna bolezen oči, pri kateri leča zdrsne s svojega mesta in lahko povzroči slepoto; za pse v vzreji je na voljo test DNK.",
    inherited_ataxia: "Pri pasmi se pojavljajo dedne ataksije (pozno nastala in spinocerebelarna ataksija), ki povzročajo izgubo ravnotežja in usklajenosti gibov; za pse v vzreji so na voljo testi DNK.",
    hydrocephalus: "Pri pasmi se lahko pojavi hidrocefalus, kopičenje tekočine okoli možganov.",
    heart_disease_pda: "Pri pasmi se lahko pojavijo bolezni srca, tudi odprt arterijski vod (PDA) — žila ob srcu, ki se po rojstvu ne zapre; veterinar ga lahko zasliši že ob prvem pregledu mladička.",
    chiari_malformation: "Pri pasmi se lahko pojavi Chiarijeva malformacija s siringomielijo — boleče stanje, pri katerem se v hrbtenjači blizu možganov tvorijo votline s tekočino.",
    cataracts_entropion: "Pri pasmi se lahko pojavita siva mrena, ki zamegli očesno lečo, in navznoter zavihane veke (entropij); vprašajte za starša s pregledanimi očmi.",
    periodontal_daily_brushing: "Pasma je nagnjena k bolezni dlesni (parodontalni bolezni), zato je priporočljivo vsakodnevno ščetkanje zob s pasjo zobno pasto.",
    eye_problems_shallow_sockets: "Pri pasmi se pojavljajo težave z očmi, na primer suho oko, okužbe oči in razjede na površini očesa; zaradi plitvih očesnih votlin so poškodbe oči tudi verjetnejše.",
    eye_problems_dry_eye_entropion_lens_luxation: "Pri pasmi se pojavljajo težave z očmi, na primer suho oko, navznoter zavihane veke (entropij) in izpah leče; na voljo je pregled oči.",
    heart_valve_screening: "Pri pasmi se lahko pojavi bolezen srca; s pregledom srca lahko pred parjenjem preverijo, ali imajo starši težave s srčnimi zaklopkami.",
    dental_weight_problems: "Velika britanska raziskava navaja bolezni zob in prekomerno težo kot posebej pogosti težavi pri pasmi — lastniki ju lahko preprečujejo; pojavljajo se tudi prenatrpani zobje in mlečni zobje, ki ne izpadejo.",
  },
  page: {
    eyebrow: "Register živali",
    // Search terms people use ("ragdoll mačka", "značaj"); "značaj" only when the page has an intro about it.
    metaTitle: (name, one, species, hasIntro) =>
      species === "dog"
        ? `${name}: ${hasIntro ? "značaj, " : ""}gibanje, velikost in nega | PetPrep`
        : species === "cat"
          ? `${/mačka/i.test(name) ? name : `${name} mačka`}: ${hasIntro ? "značaj, " : ""}nega, velikost in življenjska doba | PetPrep`
          : `${name} (${one.toLowerCase()}): potrebe, življenjska doba in nega | PetPrep`,
    metaFacts: (name, facts) => `${name}: ${facts.join("; ")}. Viri, zdravje in nasveti za nakup.`,
    metaLabels: { weight: "teža", exercise: "gibanje", lifespan: "življenjska doba" },
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
    checklistTitle: "Pred nakupom: kaj preveriti pri vzreditelju",
    checklistIntro: () => "Vprašanja, ki jih razjasnite, preden mladička odpeljete domov. Točke so nasveti veterinarjev, organizacij za dobrobit živali in zvez vzrediteljev; vsaka navaja vir.",
    checklistCountry: { code: "SI", title: "V Sloveniji velja" },
    checklistLocalNote: "",
    checklistGeneralTitle: "Za vse pasme",
    checklistTestsTitle: "Zdravstveni testi staršev za to pasmo",
    checklistLevels: (speciesId) => ({
      minimum: speciesId === "cat" ? "Testi, ki jih felinološka zveza zahteva pred vzrejo" : "Testi, ki jih Royal Kennel Club priporoča kot minimum",
      best_practice: "Dodatni testi za najboljšo prakso",
      other_scheme: "Druge sheme pregledov za to pasmo",
    }),
    checklistUkNote: (speciesId) =>
      speciesId === "cat"
        ? "Seznam je iz vzrejnih pravil tuje felinološke zveze (glejte vir) in je v pomoč pri orientaciji. Vprašajte vzreditelja, katere teste so opravili starši."
        : "Seznami so od britanskega Royal Kennel Cluba in so v pomoč pri orientaciji; nacionalne kinološke zveze lahko postavijo svoja, strožja pravila. Vprašajte pasemski klub in vzreditelja, katere teste so opravili starši.",
    checklistStatus: {
      none_recommended: "Royal Kennel Club za to pasmo trenutno ne navaja priporočenih zdravstvenih pregledov pred vzrejo. Vzreditelja vseeno vprašajte o zdravju staršev.",
      not_found: "Za to pasmo še nismo našli zanesljivega vira, ki bi navajal zdravstvene teste staršev. Vprašajte pasemski klub in vzreditelja, katere teste so opravili starši.",
      not_checked: "Zdravstvenih testov staršev za to pasmo še nismo preverili. Vprašajte pasemski klub in vzreditelja, katere teste so opravili starši.",
    },
    sourcesTitle: "Viri",
    sourcesIntro: "Vsako dejstvo na tej strani navaja enega od teh virov.",
    sourceLabel: (id, publisher) => `Vir ${id}: ${publisher}`,
    disclaimer: "PetPrep je simulacija za družine. Ta stran ni veterinarski nasvet — za pravo žival se posvetujte z veterinarjem ali klubom pasme.",
    backTo: (many) => `Vse pasme: ${many.toLowerCase()}`,
    compareWith: "Primerjaj z drugimi pasmami",
    related: { title: "Podobne pasme", intro: (many) => `Druge pasme (${many.toLowerCase()}) v registru s podobnimi potrebami — vsaka z dejstvi iz virov.` },
    updated: "Posodobljeno",
    glanceTitle: "Na kratko",
    glanceNote: "Ključna dejstva iz virov na dnu strani. Kjer se viri razlikujejo, je navedena vsaka vrednost.",
    portraitAlt: { ai_photo: (name) => `${name} — fotografija (AI)`, ai_illustration: (name) => `${name} — ilustracija (AI)` },
    portraitCaption: { ai_photo: "Fotografija, ustvarjena z AI", ai_illustration: "Ilustracija, ustvarjena z AI" },
    portraitColours: {
      legend: "Barva dlake",
      alt: { ai_photo: (name, colour) => `${name}, ${colour} — fotografija (AI)`, ai_illustration: (name, colour) => `${name}, ${colour} — ilustracija (AI)` },
    },
    share: {
      button: "Deli",
      title: "Deli to pasmo",
      copy: "Kopiraj",
      copied: "Kopirano",
      linkLabel: "Povezava do te strani",
      more: "Več možnosti",
      text: (name) => `${name}: potrebe, viri in kako jo simulira PetPrep`,
      emailSubject: (name) => `${name} — register živali PetPrep`,
      on: (network) => `Deli na ${network}`,
    },
    og: { lead: "Potrebe, viri in kako jo simulira PetPrep", photoLabel: "AI fotografija" },
    qa: {
      title: "Vprašanja in odgovori",
      intro: "Odgovori temeljijo samo na dejstvih z viri s te strani; vsak odgovor navaja svoje vire.",
      questions: {
        exercise: (n) => `Koliko gibanja potrebuje ${mid(n)}?`,
        lifespan: (n) => `Kako dolgo živi ${mid(n)}?`,
        size: (n) => `Kakšne velikosti je ${mid(n)} in koliko tehta?`,
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
    german_shepherd: {
      aka: "German Shepherd, alzaški ovčar",
      text: [
        "Nemški ovčar je velik, močan ovčarski pes iz Nemčije s pokončnimi ušesi in gosto dvojno dlako, kratko ali dolgo. Standard ga opisuje kot uravnoteženega, samozavestnega psa z močnimi živci, The Royal Kennel Club pa kot vsestranskega delovnega in službenega psa, znanega po pogumu in inteligenci.",
        "Potrebuje vsaj dve uri gibanja na dan, primeren je za veliko hišo z vrtom in mu močno izpada dlaka. Britanske dobrodelne organizacije pišejo, da so nekateri lahko odlični družinski psi, ob majhnih otrocih pa naj bodo vedno pod nadzorom. The Royal Kennel Club vzrediteljem svetuje, naj psom pred paritvijo pregledajo kolke in komolce, in pri pasmi opozarja na obliko zadnjih nog.",
      ],
      sources: ["S95", "S97", "S99", "S100"],
    },
    cavalier_king_charles_spaniel: {
      aka: "Cavalier King Charles Spaniel, kavalir",
      text: [
        "Kavalir King Charles španjel je majhen pritlikavi španjel iz Velike Britanije z dolgimi, pernatimi ušesi in dolgo, svilnato dlako v štirih barvah: blenheim, rubinasta, črno-rjava in tribarvna. Standard ga opisuje kot živahnega, gracioznega psa z nežnim izrazom — športnega, ljubečega, prijaznega in neustrašnega.",
        "Potrebuje okoli eno uro gibanja na dan, lahko živi v stanovanju in velja za dobrega z otroki, a naj bo igra pod nadzorom in ne mara biti sam. Dlako je treba česati večkrat na teden. Britanski viri kot glavni zdravstveni težavi navajajo bolezen srčne zaklopke in bolečo bolezen hrbtenjače, povezano z obliko lobanje, zato vzrediteljem svetujejo pregled srca in MRI psov.",
      ],
      sources: ["S103", "S105", "S106", "S108", "S110"],
    },
    beagle: {
      aka: "beagle",
      text: [
        "Bigl je majhen gonič iz Velike Britanije, vzrejen za lov na zajce po sledi. Standard ga opisuje kot čvrstega, kompaktnega, veselega goniča — pogumnega, živahnega in pozornega, prijaznega, brez napadalnosti in plašnosti — s kratko, gosto dlako v barvah goničev, na primer tribarvno, rjavo-belo ali limonasto-belo, in vedno z belo konico repa.",
        "Potrebuje do približno eno uro gibanja na dan in se, če ga od mladega dobro socializirate, zelo dobro znajde v družini, a naj bo ob otrocih pod nadzorom in naj ne ostaja sam, ker takrat laja in lahko grize stvari. Kratko dlako je dovolj krtačiti enkrat na teden, a izpada. Šolanje začnite zgodaj in z nagradami. Britanski veterinarji pri biglih najpogosteje zabeležijo prekomerno težo in bolezni zob, zato pazite na obroke in zobe.",
      ],
      sources: ["S111", "S113", "S115", "S116"],
    },
    standard_poodle: {
      aka: "pudelj, veliki pudelj, standardni pudelj",
      text: [
        "Veliki koder je največja od štirih velikosti kodra (pudlja), pes za družbo iz Francije, ki izhaja iz evropskih psov za lov na race. Standard ga opisuje kot elegantnega, uravnoteženega psa ponosne drže — zvestega, veselega in dobrodušnega, učljivega — z bogato, kodrasto dlako ene same barve: črne, bele, rjave, sive ali plave (fawn).",
        "Potrebuje do približno eno uro gibanja na dan in mu ustreza velika hiša z velikim vrtom. Če ga kot mladička dobro socializirate, se z otroki in drugimi ljubljenčki praviloma dobro razume. Dlaka mu ne izpada, a zato ni hipoalergen: potrebuje vsakodnevno česanje in redno striženje pri pasjem frizerju. Znan je kot zelo ubogljiv pes, ki se dobro uči.",
      ],
      sources: ["S118", "S120", "S121", "S122"],
    },
    dachshund: {
      aka: "dachshund, teckel, jazbecar",
      text: [
        "Jazbečar je nemški lovec na jazbece in kunce, doma znan kot teckel, ki ga poznamo v več velikostih in s tremi vrstami dlake; ta stran je o standardni velikosti s kratko, gladko dlako. Standard ga opisuje kot psa, ki je glede na višino zmerno dolg, brez pretiravanja — zvestega, vsestranskega in dobrodušnega; inteligentnega, živahnega in pogumnega — z gosto, kratko, gladko dlako rdeče barve ali črne oziroma čokoladne s porjavelimi oznakami.",
        "Potrebuje do približno eno uro gibanja na dan, razdeljeno na nekaj sprehodov s časom za vohanje, in mu ustreza majhna hiša. Ljudi ima rad in se z otroki vseh starosti praviloma dobro razume, vedno pod nadzorom; zaradi močnega lovskega nagona pa ga ne priporočajo k manjšim živalim, sam doma pa ne zdrži dobro. Zaradi dolgega hrbta in kratkih nog je nagnjen k zdrsu diska, zato naj ne skače; vzrediteljem svetujejo pregled hrbtenice pred parjenjem.",
      ],
      sources: ["S124", "S125", "S126", "S127", "S129"],
    },
    australian_shepherd: {
      aka: "aussie, avstralski ovcar",
      text: [
        "Avstralski ovčar je kljub imenu ameriška pasma — inteligenten delovni pes z močnim pastirskim in čuvajskim nagonom. Standard ga opisuje kot uravnoteženega psa srednje velikosti, nekoliko daljšega kot visokega, dobrodušnega in ob prvem srečanju včasih zadržanega, s srednje dolgo, ravno do valovito dlako modre merle, črne, rdeče merle ali rdeče barve, z belimi in porjavelimi oznakami ali brez njih.",
        "Potrebuje več kot dve uri gibanja na dan in miselne izzive, kot so igre z ugankami in šolanje, ustreza pa mu velika hiša z velikim vrtom na podeželju. V pravem domu je lahko res dober družinski pes, a zaradi močnega pastirskega nagona rad »pase« otroke, zato ga ne priporočajo družinam z manjšimi otroki. Sam doma ne zdrži rad, dlako pa je treba ščetkati nekajkrat na teden.",
      ],
      sources: ["S131", "S133", "S134"],
    },
    havanese: {
      aka: "havanez, bichon havanais, havanski bison",
      text: [
        "Havanski bišon je majhen pes iz družine bišonov in nacionalni pes Kube. Standard ga opisuje kot čvrstega malega psa nizkih nog z zelo dolgo, mehko, ravno ali valovito dlako, ki je ne strižemo, in z repom, nošenim visoko čez hrbet. Je plave, črne, havansko rjave, tobačne, rdečerjave in redko bele barve, z lisami in žganimi oznakami ali brez njih.",
        "Standard ga opisuje kot ljubečega, igrivega in celo malo klovna, ki ima rad otroke in se z njimi neutrudno igra; britanski viri pravijo, da je ob pravi socializaciji odličen družinski pes in da se hitro uči. Potrebuje okoli 30 minut gibanja na dan, lahko živi v stanovanju in mu dlaka ne izpada — dolgo dlako pa je treba česati vsak dan, da se ne zavozla.",
      ],
      sources: ["S136", "S138", "S140"],
    },
    west_highland_white_terrier: {
      aka: "westie, west highland white terrier",
      text: [
        "Zahodnoškotski beli terier ali westie je majhen terier iz Velike Britanije. Standard ga opisuje kot čvrsto grajenega malega psa z globokimi prsmi, ravnim hrbtom in trdo dvojno dlako, dolgo približno 5 cm, z majhnimi pokončnimi koničastimi ušesi in temnimi očmi pod gostimi obrvmi. Edina barva, ki jo standard dovoljuje, je bela.",
        "Standard ga opisuje kot pozornega, veselega, pogumnega in samostojnega, a prijaznega psa. Britanski viri pravijo, da je ljubeč in igriv družinski pes za otroke vseh starosti, igro pa je treba vedno nadzorovati; potrebuje okoli uro gibanja na dan, lahko živi v stanovanju, dlaka mu izpada in česati ga je treba nekajkrat na teden. Zaradi lovskega nagona ne sodi k manjšim živalim, sam pa ne ostaja rad. Koža je znana skrb: The Royal Kennel Club sodnikom naroča, naj bodo pri tej pasmi pozorni na znake vnetja kože.",
      ],
      sources: ["S142", "S144", "S146", "S147"],
    },
    bernese_mountain_dog: {
      aka: "berner, berner sennenhund, bernese mountain dog",
      text: [
        "Bernski planšarski pes je velik švicarski kmečki pes, ki so ga v kantonu Bern nekoč uporabljali kot čuvaja, vlečnega psa in psa za govedo. Standard ga opisuje kot močnega, okretnega delovnega psa s čvrstimi nogami ter dolgo, sijočo, ravno ali rahlo valovito dlako. Edina barva, ki jo standard dovoljuje, je trobarvna: globoko črna z rjavimi oznakami na licih, nad očmi, na nogah in prsih ter z belimi oznakami na glavi in prsih.",
        "Standard ga opisuje kot samozavestnega in dobrodušnega psa ter »prijaznega in vdanega družinskega psa«, ki počasi dozoreva. Britanski viri pravijo, da potrebuje do eno uro gibanja na dan, sodi v veliko hišo z velikim vrtom, dlaka mu močno izpada in česati ga je treba večkrat na teden; sam naj ne ostaja dolgo. Običajno živi manj kot deset let, britanski viri pa med zdravstvenimi skrbmi navajajo displazijo kolkov in komolcev, zasuk želodca in nekatere vrste raka.",
      ],
      sources: ["S150", "S152", "S153", "S154"],
    },
    siberian_husky: {
      aka: "haski, husky, siberian husky",
      text: [
        "Sibirski haski je srednje velik delovni vlečni pes, ki ga FCI vodi kot ameriško pasmo, The Royal Kennel Club pa ga opisuje kot najlažjega in najhitrejšega med vlečnimi psi. Standard zahteva psa, ki je hiter in lahkoten, z dvojno, srednje dolgo dlako, debelimi pokončnimi uhlji, rjavimi ali modrimi očmi (dovoljeno je tudi eno rjavo in eno modro) in košatim repom. Barve segajo od črne do čisto bele; merle in tigrasta nista dovoljeni.",
        "Standard ga opisuje kot prijaznega in nežnega, pozornega in odprtega psa. Britanski viri pravijo, da potrebuje več kot dve uri gibanja na dan, veliko hišo z velikim vrtom ter zelo varno, visoko ograjo, saj haskiji radi pobegnejo; dlaka mu močno izpada, česati ga je treba nekajkrat na teden in sam se ne znajde dobro. PDSA ga priporoča za gospodinjstva z odraslimi ali najstniki, ne za družine z manjšimi otroki, med zdravstvenimi skrbmi pa navaja displazijo kolkov, težave z očmi in epilepsijo.",
      ],
      sources: ["S158", "S160", "S162"],
    },
    rottweiler: {
      aka: "rottweiler, rottie",
      text: [
        "Rotvajler je srednje velik do velik, močan delovni pes iz Nemčije. Standard opisuje čvrstega psa, ne pretežkega in ne prelahkega, s kratko, grobo in gladko prilegajočo se dlako, srednje velikimi visečimi uhlji in temno rjavimi mandljastimi očmi. Edina dovoljena barva je črna z jasno omejenimi rjavimi (tan) oznakami na licih, gobcu, grlu, prsih in nogah; bele lise so napaka.",
        "Standard ga opisuje kot dobrodušnega, mirnega, zelo vdanega, ubogljivega in delavnega psa, The Royal Kennel Club pa pravi, da je dobro vzgojen rotvajler čudovit družinski pes. Britanski viri pravijo, da potrebuje več kot dve uri gibanja na dan, veliko hišo z velikim vrtom in izkušenega lastnika, ker je tako močan; socializirati ga je treba že od malega. PDSA ga družinam z mlajšimi otroki in dojenčki ne priporoča, z drugimi živalmi pa ga nikoli ne puščajte brez nadzora. Dovolj je krtačenje enkrat na teden. Običajno živi manj kot deset let, The Royal Kennel Club pa pri pasmi spremlja obliko zadnjih nog.",
      ],
      sources: ["S166", "S168", "S169", "S171"],
    },
    bulldog: {
      aka: "bulldog, buldog, english bulldog",
      text: [
        "Angleški buldog je srednje velik pes kratke, gladke dlake iz Velike Britanije: precej čokat, nizek, širok, močan in kompakten, z razmeroma kratkim obrazom, majhnimi tankimi »rose« uhlji in okroglimi, zelo temnimi očmi. Standard dovoljuje enobarvne pse, na primer rdeče, rumenorjave, peščene in bele, ter tigraste in pied; črna in črna z rjavim sta zelo nezaželeni. Zahteva velike, široko odprte nosnice in pravi, da so psi s težavami pri dihanju zelo nezaželeni.",
        "Standard ga opisuje kot pozornega, pogumnega, zvestega, zanesljivega in neustrašnega psa, ki je videti strog, a je ljubeč, The Royal Kennel Club pa pravi, da je zaradi značaja in zvestobe še vedno zelo priljubljen družinski pes. Britanski viri pravijo, da potrebuje do ene ure gibanja na dan, nikoli v vročini dneva, in da se ob socializaciji v mladosti dobro razume z drugimi domačimi živalmi; krtačenje je potrebno enkrat na teden, gube na obrazu pa je treba čistiti vsak dan. PDSA ga opisuje kot pasmo z zelo sploščenim obrazom, ki ima zelo verjetno resne zdravstvene težave, na primer težko dihanje, in močno priporoča razmislek o bolj zdravi pasmi, križancu ali mešančku. Običajno živi manj kot deset let.",
      ],
      sources: ["S175", "S177", "S180"],
    },
    german_shorthaired_pointer: {
      aka: "kratkodlaki ptičar, GSP, german shorthaired pointer, deutsch kurzhaar",
      text: [
        "Nemški kratkodlaki ptičar je vsestranski lovski pes iz Nemčije za delo na polju in v vodi, s kratko, gosto dlako, ki je na otip trda, širokimi ploščatimi ušesi, nastavljenimi visoko, ter temno rjavimi mandljastimi očmi. Ameriški standard dovoljuje jetrno rjavo, jetrno rjavo z belim (npr. pikasto), črno in črno z belim; rdeče, oranžne, limonaste ali rumenorjave lise in povsem bel pes so izključujoča napaka. Standard opisuje kupiran rep — PetPrep psa vedno pokaže z naravnim repom.",
        "Standard ga opisuje kot prijaznega, inteligentnega in voljnega. The Royal Kennel Club in PDSA pravita, da potrebuje več kot dve uri gibanja na dan; PDSA dodaja, da ga na sprehodu lahko odnese nagon za lovom, označevanjem in prinašanjem, zato potrebuje dober odpoklic, in da se razmeroma lahko uči. Česati ga je treba enkrat do dvakrat na teden, dlaka mu zmerno izpada. Velika britanska raziskava navaja mediano pričakovane življenjske dobe 13,4 leta.",
      ],
      sources: ["S185", "S186", "S187", "S188", "S189", "S123"],
    },
    yorkshire_terrier: {
      aka: "jorkširski terier, yorkie, jorki",
      text: [
        "Yorkshirski terier je pritlikavi terier iz Velike Britanije, ki po standardu pasme tehta do 3,2 kg, z dolgo, povsem ravno, svetlečo in svilnato dlako, ki od preče po hrbtu enakomerno pada ob obeh straneh. Standard dovoljuje eno barvo: temno jekleno modro od zatilja do repa ter bogato, svetlo zlatorjavo na glavi, prsih in nogah; majhna ušesa v obliki črke V nosi pokončno. Standard opisuje kupiran in nekupiran rep — PetPrep psa vedno pokaže z naravnim repom.",
        "Standard ga opisuje kot pozornega, inteligentnega in živahnega, a uravnovešenega. The Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje vsak dan; PDSA dodaja, da rad teka, prinaša in se igra, da zna biti pri učenju precej trmast in da je zaradi zelo krhkih kosti primernejši za družine s starejšimi otroki. Velika britanska raziskava je kot najpogostejšo težavo pasme ugotovila bolezen zob, svetuje vsakodnevno nego zob, npr. ščetkanje, in navaja mediano starosti ob smrti 13,56 leta.",
      ],
      sources: ["S190", "S192", "S194", "S195", "S196"],
    },
    cane_corso: {
      aka: "italijanski cane corso, Cane Corso Italiano, korzo",
      text: [
        "Cane corso je srednje velik do velik italijanski molos, robusten in čvrst pes z nekaj elegance, nekoliko daljši kot visok. Standard opisuje kratko, svetlečo, zelo gosto dlako v črni, sivih odtenkih, plavi ali rdeči barvi s temno masko, temno pšenični ali progasti barvi; velike bele lise niso dovoljene. Po veljavnem standardu FCI so ušesa nekupirana in rep naraven — v Združenem kraljestvu je kupiranje prepovedano —, zato ga PetPrep vedno pokaže z naravnimi ušesi in repom.",
        "Standard ga opisuje kot čuvaja posesti, družine in živine, zelo okretnega in odzivnega. PDSA pravi, da je družaben in ljubeč do svojih ljudi, da potrebuje okoli dve uri gibanja na dan in zaposlitev, ker sovraži dolgčas, in da je zaradi velikosti primernejši za izkušene lastnike. Ne priporoča ga za dom z majhnimi otroki, ki bi jih lahko po nesreči podrl; primeren je za dom brez otrok ali s starejšimi otroki. Zadošča česanje enkrat na teden, a dlaka mu izpada in se rad slini. PDSA navaja povprečno življenjsko dobo manj kot deset let.",
      ],
      sources: ["S197", "S199"],
    },
    pembroke_welsh_corgi: {
      aka: "corgi, korgi, Welsh Corgi (Pembroke)",
      text: [
        "Welsh corgi pembroke je majhen pastirski pes za govedo iz Walesa, nizek, močan in čvrsto grajen, ki na majhnem prostoru deluje vzdržljivo in krepko. Standard opisuje srednje dolgo, ravno dlako z gosto podlanko v rdeči, soboljevi, plavi ali črni barvi z rjavimi oznakami, z belimi oznakami na nogah, prsih in vratu ali brez, ter pokončna ušesa. Rep so nekoč običajno kupirali; standard opisuje tudi naravni rep in PetPrep psa vedno pokaže z naravnim repom.",
        "Standard ga opisuje kot pogumnega, delavnega, odprtega in prijaznega. The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje večkrat na teden; PDSA ga opisuje kot prijaznega, veselega in igrivega psa, ki rad ugaja in se razmeroma lahko uči, a lahko grize za pete otrok, ki tečejo, zato pomagata socializacija z otroki in učenje od malega. The Royal Kennel Club navaja življenjsko dobo več kot 12 let in vzrediteljem priporoča pregled kolkov staršev.",
      ],
      sources: ["S202", "S204", "S206"],
    },
    dobermann: {
      aka: "dobermann, Doberman Pinscher",
      text: [
        "Doberman je nemški spremljevalni, zaščitni in delovni pes srednje velikosti, močan in mišičast, z elegantnimi linijami in ponosno držo. Standard FCI opisuje kratko, trdo in gosto dlako, ki se tesno in gladko prilega telesu, v črni ali rjavi barvi z jasno omejenimi rjasto rdečimi oznakami; bele lise niso dovoljene. Ušesa in rep po standardu FCI ostanejo naravni in PetPrep psa vedno pokaže z naravnimi ušesi in repom.",
        "Standard ga opisuje kot prijaznega, mirnega in zelo predanega družini. The Royal Kennel Club pravi, da je zaradi zvestobe in ubogljivosti odličen družinski pes, ter priporoča več kot dve uri gibanja na dan in česanje enkrat na teden. PDSA dodaja, da je zelo energičen, da potrebuje veliko miselnega in telesnega gibanja ter zgodnjo socializacijo in da ga zaradi velikosti in moči ne priporočajo družinam z majhnimi otroki ali začetnikom. The Royal Kennel Club navaja življenjsko dobo več kot 10 let.",
      ],
      sources: ["S207", "S209", "S211"],
    },
    boxer: {
      aka: "nemški boksar, Deutscher Boxer",
      text: [
        "Boksar je nemški delovni in družinski pes srednje velikosti, kvadratne postave, z močnimi kostmi in dobro razvitimi mišicami. Standardi opisujejo kratko, svetlečo in gladko dlako v rumeni ali tigrasti barvi s črno masko; bele oznake so dovoljene, a ne smejo pokrivati več kot tretjine dlake. Gobec naj bo širok in globok, nikoli kratek, z odprtimi nosnicami. Rep so nekoč običajno kupirali; standard opisuje tudi nekupiran rep in PetPrep psa vedno pokaže z naravnimi ušesi in repom.",
        "Standard ga opisuje kot uravnovešenega, vodljivega, neustrašnega in samozavestnega. The Royal Kennel Club pravi, da je zelo priljubljen družinski spremljevalec, ter priporoča več kot dve uri gibanja na dan in česanje enkrat na teden. PDSA ga opisuje kot zelo energičnega in igrivega psa, ki ima rad družbo ljudi in lahko razvije ločitveno tesnobo, če ostaja sam, ima zelo močan lovski nagon, zaradi velikosti in živahnosti pa ga ne priporočajo za dom z mlajšimi otroki ali za začetnike; nekateri boksarji s krajšim gobčkom imajo lahko resne težave z dihanjem. The Royal Kennel Club navaja življenjsko dobo več kot 10 let.",
      ],
      sources: ["S215", "S217", "S219"],
    },
    miniature_schnauzer: {
      aka: "Zwergschnauzer, mali šnavcer",
      text: [
        "Pritlikavi šnavcer je majhen nemški družabni pes: močan, čokat in skoraj kvadraten, z ostro, žimasto in gosto dlako, košatimi obrvmi in brado. Standard FCI dovoljuje barve poper in sol, črno s srebrno, čisto črno in čisto belo; PetPrep pokaže prve tri. Rep so nekoč običajno kupirali, ušesa včasih tudi; standard FCI zahteva naraven rep in viseča ušesa, PetPrep pa psa vedno pokaže z naravnimi ušesi in repom.",
        "FCI ga uvršča med hišne in družabne pse, The Royal Kennel Club pa pravi, da je kot spremljevalec zelo priljubljen. The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje večkrat na teden ter navaja, da mu dlaka ne izpada. PDSA ga opisuje kot igrivega in radovednega psa, ki se lahko dobro razume z otroki, če jih spozna zgodaj, je pri šolanju lahko trmast, česati pa ga je treba dva- do trikrat na teden in ga občasno dati ostriči ali trimati profesionalnemu frizerju. The Royal Kennel Club navaja življenjsko dobo več kot 10 let.",
      ],
      sources: ["S221", "S223", "S226"],
    },
    shih_tzu: {
      aka: "ši-cu, šicu, shih-tzu",
      text: [
        "Shih tzu je majhen družabni pes iz Tibeta; za njegov standard FCI skrbi Velika Britanija. Standardi ga opisujejo kot čvrstega psa z bogato dlako, ponosno držo in obrazom, ki spominja na krizantemo: z dolgo, gosto krovno dlako, velikimi temnimi okroglimi očmi, velikimi visečimi ušesi in bogato operjenim repom, nošenim čez hrbet. Standardi dovoljujejo veliko barv; PetPrep pokaže zlato-belo, črno-belo in jetrno-belo, nikoli pa merle. Gobček je kratek in ploščat, PDSA pa navaja težave z dihanjem zaradi krajšega obraza, zato PetPrep psa vedno nariše z zmernim obrazom in odprtimi nosnicami.",
        "FCI ga opisuje kot inteligentnega, dejavnega in budnega, prijaznega in samostojnega. The Royal Kennel Club priporoča do eno uro gibanja na dan in vsakodnevno česanje ter navaja, da je primeren tudi za stanovanje. PDSA pravi, da je shih tzu lahko dobrodušen družinski pes, če ima pravo socializacijo in šolanje, da je odlična izbira za začetnike in da ga moramo z otroki vedno nadzorovati; svetuje vsakodnevno česanje in pri večini psov striženje pri profesionalnem frizerju na šest do osem tednov. The Royal Kennel Club navaja življenjsko dobo več kot 10 let.",
      ],
      sources: ["S229", "S231", "S233"],
    },
    great_dane: {
      aka: "doga, deutsche dogge",
      text: [
        "Nemška doga je nemški velikan: standard FCI pravi, da združuje veliko, močno in skladno grajeno telo s ponosom, močjo in eleganco, z dolgo, ozko glavo, naravno visečimi ušesi in zelo kratko, gladko, svetlečo dlako. Standarda navajata rumeno in tigrasto barvo — najraje s črno masko — ter harlekin, črno in modro; PetPrep pokaže samo barve, ki jih navajata FCI in The Royal Kennel Club, nikoli merle ali mantle, in psa vedno nariše z naravnimi ušesi in repom ter tesno prilegajočimi vekami, ker The Royal Kennel Club sodnikom naroča, naj pazijo na veke, zavihane navznoter ali navzven, in na slabo grajene zadnje noge.",
        "FCI jo opisuje kot prijazno, ljubečo in vdano lastnikom, do tujcev pa je lahko zadržana. The Royal Kennel Club pravi, da je kljub velikosti čudovit družinski pes, in priporoča več kot dve uri gibanja na dan, veliko hišo z vrtom in česanje enkrat na teden. PDSA pravi, da se nemške doge rade slinijo, da imajo precej močan lovski nagon in da jih zaradi velikosti in moči ne priporoča v domu z mlajšimi otroki; svetuje premor med obrokom in gibanjem, da se prepreči zasuk želodca. The Royal Kennel Club navaja življenjsko dobo manj kot 10 let.",
      ],
      sources: ["S239", "S241", "S243"],
    },
    pomeranian: {
      aka: "pom, pritlikavi špic, nemški pritlikavi špic",
      text: [
        "Pomeranec je najmanjši špic: FCI ga vodi kot pritlikavo različico nemškega špica z višino 21 cm ± 3 cm, standard The Royal Kennel Club pa opisuje kompaktnega, kratkega psička z lisičjo glavo, majhnimi pokončnimi ušesi in repom, zavihanim čez hrbet. Dvojna dlaka ima mehko, puhasto podlanko in dolgo, ravno krovno dlako, ki okoli vratu oblikuje ovratnik. Standard dovoljuje veliko enobarvnih barv, na primer oranžno, krem, belo, črno in rjavo, nikoli pa merle; PetPrep ga riše z naravno, nepostriženo dlako.",
        "FCI njegov značaj opisuje kot družaben in vesel, standard The Royal Kennel Club pa kot odprt, živahen in inteligenten. The Royal Kennel Club priporoča do 30 minut gibanja na dan in ga uvršča v stanovanje; PDSA pravi, da je treba dvojno dlako česati dva- do trikrat na teden. AKC pravi, da pomeranec bolj ustreza družinam s starejšimi otroki, da se z drugimi živalmi lahko dobro razume, če je zgodaj socializiran, in močno priporoča zgodnjo socializacijo in šolo za mladičke. The Royal Kennel Club navaja življenjsko dobo več kot 12 let.",
      ],
      sources: ["S246", "S247", "S249", "S250", "S251"],
    },
    boston_terrier: {
      aka: "boston, ameriški gentleman",
      text: [
        "Bostonski terier izvira iz Združenih držav Amerike. Standard FCI opisuje živahnega, zelo inteligentnega psa z gladko dlako, kratko glavo, kompaktnim telesom, kratkim repom in skladno postavo, tigrastega, črnega z rdečkastim odsevom (»seal«) ali črnega, z enakomernimi belimi oznakami: obvezni so bel pas na gobčku, bela lisa med očmi in bele prsi, prednost ima tigrasta barva. PetPrep ga riše tigrastega z belimi oznakami, z zmernim gobčkom, odprtimi nosnicami ter naravnimi ušesi in repom.",
        "Je pasma s sploščenim obrazom (brahicefalna), zato PDSA opozarja, da z njim nikoli ne hodite na sprehod v vročini dneva, ker se hitro pregreje. The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje enkrat na teden, uvršča ga v stanovanje in navaja življenjsko dobo več kot 10 let. PDSA bostonske terierje opisuje kot odlične družinske ljubljenčke, ki se ob dobri socializaciji v mladosti še posebej dobro razumejo z otroki; AKC pravi, da se dobro razumejo z otroki, ki znajo z živalmi ravnati nežno, da ne prenašajo dobro dolgega samovanja, in močno priporoča zgodnjo socializacijo in šolo za mladičke.",
      ],
      sources: ["S254", "S255", "S259", "S260"],
    },
    miniature_american_shepherd: {
      aka: "mini american, miniaturni avstralski ovčar",
      text: [
        "Mali ameriški ovčar izvira iz Združenih držav Amerike. Standard FCI opisuje majhnega pastirskega psa z močnim pastirskim in čuvajskim nagonom, inteligentnega in predvsem delovnega psa, nekoliko daljšega kot visokega, s srednje dolgo, ravno do valovito dlako, odporno proti vremenu. Barve so črna, modra merle, rdeča in rdeča merle, z belimi in rjavimi oznakami ali brez njih, oči so lahko rjave, modre, lešnikove ali jantarne. PetPrep ga riše v modri merle barvi z naravnim repom.",
        "PetMD pravi, da ima veliko energije in potrebuje vsaj eno uro gibanja na dan, najbolje dve, ter naloge, ki mu zaposlijo glavo, in da ga je treba česati nekajkrat na teden; AKC pravi, da je večji del leta dovolj česanje enkrat na teden, v času menjave dlake pa vsak dan. Po AKC je lahko odličen družinski pes, če je vzgojen in zgodaj socializiran, z otroki se navadno dobro razume, a jih lahko poskuša »pasti«; PetMD dodaja, da ga navezanost na družino lahko pripelje do ločitvene tesnobe, ko ostane sam. PetMD navaja življenjsko dobo 12 do 13 let.",
      ],
      sources: ["S265", "S267", "S269"],
    },
    chihuahua: {
      aka: "chihuahua, civava",
      text: [
        "Čivava izvira iz Mehike. Standard The Kennel Club opisuje majhnega, drobnega in čvrstega psa predrznega izraza ter veselega, živahnega in inteligentnega značaja, z zaobljeno lobanjo v obliki jabolka, zmerno kratkim, rahlo koničastim gobčkom, velikimi okroglimi očmi, ki ne izstopajo, velikimi ušesi in srpastim repom; dovoljena je vsaka barva ali kombinacija barv, nikoli pa merle, zaželena teža je 1,8–2,7 kg. The Royal Kennel Club vodi kratkodlako in dolgodlako čivavo kot dve pasmi; PetPrep riše kratkodlako čivavo rumenorjave barve z zmerno glavo.",
        "The Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje enkrat na teden, primerna je za stanovanje, življenjska doba pa je več kot 12 let. PDSA piše, da so čivave tako majhne in lahke, da jih otroci radi dvigujejo, česar same ne marajo, zato so primernejše za družine z nekoliko starejšimi otroki. PDSA dodaja, da imajo kot psi spremljevalci radi družbo in potrebujejo nekoga doma ves čas, ter da jih je treba že od mladosti socializirati z veliko različnimi ljudmi, izkušnjami in kraji.",
      ],
      sources: ["S272", "S274", "S275", "S277"],
    },
    english_springer_spaniel: {
      aka: "springer španjel, springer, English Springer Spaniel",
      text: [
        "Angleški springer španjel izvira iz Velike Britanije, kjer so ga vzredili za iskanje, dvigovanje in prinašanje divjadi. Standard The Kennel Club opisuje simetrično grajenega, čvrstega, močnega, veselega in dejavnega psa — med britanskimi španjeli z najdaljšimi nogami — prijaznega, veselega in ubogljivega značaja, z dolgimi, z dlako obraslimi ušesi, temno lešnikovimi očmi ter tesno, ravno dlako, ki je odporna proti vremenu; barve so jetrno-bela ali črno-bela, obe tudi z žganimi oznakami, višina je približno 51 cm. PetPrep ga riše jetrno-belega, z naravnim repom.",
        "The Royal Kennel Club priporoča več kot 2 uri gibanja na dan in česanje večkrat na teden, življenjska doba pa je več kot 10 let. PDSA piše, da so springerji dobri družinski psi, ki se dobro razumejo z otroki in drugimi domačimi ljubljenčki, so ubogljivi in se radi učijo ter jih je treba česati enkrat ali dvakrat na teden in ostriči vsake 3 mesece. American Kennel Club dodaja, da jih ne smete dolgo puščati samih ter da sta zgodnja socializacija in tečaj za mladičke ključna.",
      ],
      sources: ["S281", "S282", "S284", "S285", "S286"],
    },
    shetland_sheepdog: {
      aka: "sheltie, šeltie, Shetland Sheepdog",
      text: [
        "Šetlandski ovčar izvira iz Velike Britanije in je majhen dolgodlaki delovni pes. Standard FCI ga opisuje kot pozornega, nežnega, inteligentnega, močnega in dejavnega psa, ki je naklonjen in zvest lastniku ter zadržan do tujcev, z glavo v obliki dolgega, topega klina, majhnimi, napol pokončnimi ušesi s konicami, ki padajo naprej, in dvojno dlako z dolgo, trdo krovno dlako; barve so sable (od svetlo zlate do temno mahagonijeve), tribarvna, modri merle, črno-bela ter črna z žganimi oznakami, idealna višina je 37 cm za psa in 35,5 cm za psico. PetPrep ga riše zlato sable barve z belimi oznakami.",
        "The Royal Kennel Club priporoča do ene ure gibanja na dan in česanje vsak dan, življenjska doba pa je več kot 10 let. PDSA piše, da so šetlandski ovčarji zelo nežni, igrivi in ubogljivi psi, ki se pogosto dobro vključijo v družinsko življenje in se lepo razumejo z otroki, ter da sta vzgoja in socializacija v mladosti zelo pomembni. American Kennel Club dodaja, da potrebujejo redno telesno in miselno zaposlitev, da se zaradi pastirskega nagona najbolje znajdejo v domu s starejšimi otroki in da so znani kot zelo glasni.",
      ],
      sources: ["S289", "S290", "S291", "S293", "S294"],
    },
    brittany: {
      aka: "epagneul breton, bretonski španjel, Brittany",
      text: [
        "Bretonski ptičar je ptičar iz Francije, kjer mu pravijo epagneul breton. The Royal Kennel Club ga opisuje kot zelo energičnega in inteligentnega psa, ki išče, nakaže in prinese divjad, nežnega in ljubečega, a polnega življenja in razigranosti, z gosto, precej fino dlako, visoko nasajenimi trikotnimi ušesi in repom, ki je pogosto naravno kratek; barve standarda so oranžna, jetrna ali črna z belo, roan ali tribarvna, višina je 48–51 cm za psa in 47–50 cm za psico. PetPrep ga riše oranžno-belega.",
        "The Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje večkrat na teden, življenjska doba pa je več kot 10 let. American Kennel Club piše, da so bretonski ptičarji psi z veliko energije, ki potrebujejo veliko gibanja in miselne zaposlitve, da so nežni in z otroki običajno potrpežljivi ter da jih tedensko krtačenje ohranja lepe. PetMD dodaja, da je zgodnja socializacija mladičkov nujna, da ne marajo biti dolgo sami in da imajo kot psi, vzrejeni za lov na ptice, močan lovski nagon.",
      ],
      sources: ["S296", "S298", "S299", "S301", "S302"],
    },
    american_cocker_spaniel: {
      aka: "Cocker Spaniel (ZDA), ameriški koker",
      text: [
        "Ameriški koker španjel — v Združenih državah kar Cocker Spaniel — je druga pasma kot angleški koker španjel. Standard American Kennel Club ga opisuje kot najmanjšega psa v skupini lovskih psov, z dolgimi, operjenimi ušesi, zaobljeno lobanjo, širokim in globokim gobcem ter svilnato, ravno ali rahlo valovito dlako; je lahko črn, enobarven od svetlo kremaste do temno rdeče barve ali večbarven z belo. Standard zahteva uravnotežen značaj brez plašnosti.",
        "The Royal Kennel Club priporoča česanje vsak dan in več kot dve uri gibanja na dan, življenjska doba pa je več kot 10 let; American Kennel Club in PetMD pišeta, da ne potrebuje veliko gibanja. PetMD te prijazne pse opisuje kot odlične družinske pse, prijazne do ljudi in drugih živali, in svetuje zgodnjo socializacijo in šolanje; VCA piše, da so z otroki običajno zelo dobri, da se radi zredijo in da jim je treba ušesa pregledati vsak teden.",
      ],
      sources: ["S303", "S305", "S307", "S308", "S309", "S310"],
    },
    belgian_malinois: {
      aka: "malinois, belgijski ovčar (malinois)",
      text: [
        "Belgijski ovčar malinois je kratkodlaka različica belgijskega ovčarja, ovčarskega psa iz Belgije. Standard FCI opisuje skladno grajenega psa, ki združuje eleganco in moč, in dovoljuje eno samo barvo: plavo s črnim nadihom in črno masko. Standarda FCI in American Kennel Club opisujeta razmeroma majhna, pokončna, trikotna ušesa, kratko, trdo dlako z gosto podlanko ter pozoren, inteligenten, radoveden in samozavesten značaj.",
        "The Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje večkrat na teden, življenjska doba pa je več kot 10 let. American Kennel Club piše, da ni dobra izbira za prvega psa, da se najbolje znajde v družini s starejšimi, odgovornimi otroki in da ne sme biti dolgo sam; PetMD omenja močan lovski nagon, da lahko poskuša »pasti« otroke ter da potrebuje vsakodnevno šolanje in zgodnjo socializacijo.",
      ],
      sources: ["S312", "S313", "S314", "S315", "S316", "S317"],
    },
    basset_hound: {
      aka: "basset hound, basset",
      text: [
        "Baset je kratkonog goniški pes, ki sledi vonju, iz Velike Britanije. Standard FCI opisuje čvrstega, uravnoteženega goniča, ki je miren, nikoli napadalen ali plašen, in ljubeč, z nizko nastavljenimi, dolgimi, žametnimi ušesi, gladko kratko dlako ter v barvah črno-belo-rjavi ali limonasto-beli. The Royal Kennel Club v programu Breed Watch sodnike na razstavah prosi, naj bodo pozorni na zavihane veke, predolga ušesa, vnete kožne gube in odvečno kožo.",
        "The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje enkrat na teden, življenjska doba pa je več kot 10 let. PDSA ga opisuje kot potrpežljivega psa, ki se z otroki zelo dobro razume in ima rad družbo, a ima velik apetit, zato je treba paziti na težo; svetuje vsakodnevni pregled kožnih gub in premor med obrokom in gibanjem. American Kennel Club dodaja, da ga nos rad odpelje drugam, zato sta pomembna varen povodec in ograjen prostor.",
      ],
      sources: ["S320", "S321", "S322", "S323", "S324"],
    },
    hungarian_vizsla: {
      aka: "vižla, madžarska vižla, Hungarian Vizsla",
      text: [
        "Madžarski kratkodlaki ptičar ali vižla je srednje velik, eleganten lovski pes z Madžarske s kratko rdečkasto zlato dlako. Standard FCI opisuje živahnega, prijaznega in uravnoteženega psa, ki se zlahka uči in pri delu ostaja v tesnem stiku z vodnikom; barve so odtenki rdečkasto zlate in temno peščeno zlate. The Royal Kennel Club v programu Breed Watch za pasmo ne navaja posebnih točk za pozornost sodnikov.",
        "The Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje enkrat na teden, življenjska doba pa je več kot 12 let. PDSA ga opisuje kot psa, ki je zelo navezan na ljudi, ima rad družbo in lahko trpi zaradi ločitvene tesnobe, ko ostane sam; s starejšimi otroki se dobro razume, za dom z zelo majhnimi otroki in za začetnike pa ga PDSA ne priporoča, zaradi močnega lovskega nagona pa tudi ne skupaj z manjšimi živalmi. PDSA svetuje tudi premor med obrokom in gibanjem.",
      ],
      sources: ["S327", "S328", "S329"],
    },
    english_cocker_spaniel: {
      aka: "koker španjel, angleški koker, English Cocker Spaniel",
      text: [
        "Angleški koker španjel — v Veliki Britaniji preprosto koker španjel — je druga pasma kot ameriški koker španjel. Standard FCI opisuje veselega, čvrstega lovskega psa, uravnoteženega in kompaktnega, z nizko nasajenimi uhlji in ploskim, svilnatim kožuhom; standard AKC ga opisuje kot veselega in ljubečega psa uravnotežene narave ter navaja enobarvno črno, čokoladno rjavo in odtenke rdeče ter večbarvne vzorce z belo. The Royal Kennel Club v programu Breed Watch za pasmo ne navaja posebnih točk za pozornost sodnikov.",
        "The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje vsak dan, življenjska doba pa je več kot 10 let; raziskava VetCompass med britanskimi angleškimi koker španjeli je ugotovila srednjo starost ob smrti 11,44 leta. PDSA piše, da se zaradi potrpežljive narave praviloma dobro razume z otroki, vedno pod nadzorom, a opozarja, da je znan po ločitveni tesnobi in naj nikoli ne ostane sam več kot štiri ure. PDSA svetuje tudi vsakodnevno česanje in premor med obrokom in gibanjem.",
      ],
      sources: ["S336", "S337", "S339", "S342", "S343"],
    },
    maltese: {
      aka: "malteški bišon, malteški psiček, Maltese",
      text: [
        "Maltežan je pritlikavi pes iz osrednjega Sredozemlja, pri FCI pod italijanskim pokroviteljstvom. Standard FCI opisuje majhnega psa s podolgovatim telesom, živahnega, ljubečega, zelo mirnega in zelo inteligentnega, ki tehta 3–4 kg in ima zelo dolgo, gosto, svilnato dlako, ki težko pada po vsem telesu. Kožuh nima podlanke, edina barva pa je čisto bela (dovoljen je bled slonokoščen odtenek). The Royal Kennel Club v programu Breed Watch za pasmo ne navaja posebnih točk za pozornost sodnikov.",
        "The Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje vsak dan, navaja, da ne izgublja dlake, življenjska doba pa je več kot 12 let. PDSA ga opisuje kot bistrega, prijaznega in ljubečega psa, ki je lahko do neznancev zadržan, a se s pravo socializacijo v mladosti lahko nauči samozavesti in družabnosti. PetMD opozarja, da lahko razvije ločitveno tesnobo, če je predolgo sam, da morajo biti srečanja z majhnimi otroki pod nadzorom, in svetuje vsakodnevno ščetkanje zob.",
      ],
      sources: ["S346", "S347", "S348", "S351"],
    },
    pug: {
      aka: "mopsek, Pug, Carlin",
      text: [
        "Mops je majhen pes družnik s Kitajske, pri FCI pod britanskim pokroviteljstvom. Standard FCI opisuje izrazito kvadratnega in čokatega psa — »multum in parvo« — z velikim šarmom, dostojanstvom in inteligenco ter umirjeno, veselo in živahno naravo, z idealno težo 6,3–8,1 kg, fino, gladko, kratko in svetlečo dlako srebrne, marelične, plave ali črne barve in repom, tesno zavitim čez bok. Zahteva dokaj velike, dobro odprte nosnice, stisnjene nosnice in težka guba nad nosom pa so nesprejemljive. The Royal Kennel Club pasmo uvršča v 3. kategorijo programa Breed Watch, med točkami za pozornost pa so težave z dihanjem, izbuljene oči, dermatitis v kožnih gubah in prekomerna teža.",
        "PDSA mopsa opisuje kot pasmo z močno sploščenim obrazom (brahicefalno), ki se hitro zadiha, svetuje, naj se ne giba v vročini, njihovi veterinarji pa toplo priporočajo raje pasmo z normalnim gobčkom ali mešanca z mopsom. The Royal Kennel Club priporoča do 1 ure gibanja na dan in česanje enkrat na teden, navaja, da izgublja dlako, življenjska doba pa je več kot 10 let. PDSA ga opisuje kot psa, ki se pogosto dobro razume z otroki in drugimi ljubljenčki, a ima zelo rad družbo in ne prenaša dobro samote; PetMD svetuje vsakodnevno čiščenje in sušenje kožnih gub na obrazu in navaja, da je debelost pri pasmi pogosta.",
      ],
      sources: ["S354", "S355", "S356", "S357", "S359"],
    },
    rough_collie: {
      aka: "škotski ovčar, collie, Rough Collie",
      text: [
        "Dolgodlaki škotski ovčar je velik ovčarski pes iz Velike Britanije. Standard FCI opisuje psa izjemne lepote, ki stoji z mirnim dostojanstvom, prijazne narave brez sledu živčnosti ali napadalnosti, z zelo gosto dlako z ravno, trdo krovno dlako in s tremi barvami: soboljo, trobarvno in modri merle. Standard The Royal Kennel Club ga opisuje kot odličnega psa družnika — prijaznega, veselega in dejavnega, dobrega z otroki in drugimi psi — z višino 56–61 cm pri psih in 51–56 cm pri psicah. The Royal Kennel Club pasmo uvršča v 2. kategorijo programa Breed Watch in ne registrira mladičev iz parjenja merle × merle.",
        "The Royal Kennel Club priporoča do 1 ure gibanja na dan in česanje vsak dan, navaja, da izgublja dlako, življenjska doba pa je več kot 12 let. PetMD piše, da so škotski ovčarji ljubeči, posebej do otrok, in se dobro razumejo z drugimi živalmi, a ne prenašajo dobro dolge samote, ko so razburjeni, pa lahko ščipajo za gležnje in pete. Navaja tudi, da je socializacija mladička ključna in da se pri pasmi pojavlja mutacija MDR1, ki vpliva na to, kako pes presnavlja nekatera zdravila.",
      ],
      sources: ["S364", "S365", "S366", "S368"],
    },
    mastiff: {
      aka: "mastif, Mastiff, English Mastiff",
      text: [
        "Angleški mastif je zelo velik čuvaj iz Velike Britanije. Standard FCI ga opisuje kot spoj veličine in poguma — miren, naklonjen lastnikom, a zmožen varovanja — s kvadratasto glavo, širokim, globokim in močnim telesom ter kratko, tesno prilegajočo se dlako marelične, plave ali tigraste barve. PDSA navaja povprečno višino 71–78 cm in povprečno težo 80–85 kg ter piše, da ga The Kennel Club uvršča v 3. kategorijo: med pasme z vidnimi težavami v zgradbi, ki lahko povzročajo bolečino, nelagodje ali zdravstvene težave.",
        "PDSA odraslemu psu priporoča okoli uro gibanja na dan — mladička pa ne smemo preobremenjevati, dokler se mu razvijajo kosti in sklepi —, česanje enkrat na teden in vsakodnevno čiščenje gub na obrazu, povprečna življenjska doba pa je manj kot 10 let. PetMD piše, da so mastifi odlični družinski psi za dom z otroki, ki znajo ravnati z živalmi, morda pa ne za dom z malčki ali dojenčki, ker so tako veliki; z drugimi ljubljenčki se navadno dobro razumejo, če jih spoznajo kot mladiči, veliko se slinijo, uro pred obrokom in po njem pa naj ne bodo dejavni zaradi nevarnosti zasuka želodca.",
      ],
      sources: ["S370", "S371", "S374"],
    },
    shiba_inu: {
      aka: "shiba inu, japonski šiba inu, Shiba Inu",
      text: [
        "Šiba inu je majhen špic z Japonske; ime pomeni »majhen pes«, po navedbah The Royal Kennel Club pa so ga vzgojili za lov na manjše ptice. Standard FCI ga opisuje kot majhnega, uravnoteženega psa z močnimi kostmi, zvestega, z ostrimi čuti in zelo pozornega, z ostro zunanjo dlako nad mehko, gosto podlanko, majhnimi pokončnimi trikotnimi ušesi in debelim zavitim repom; barve so rdeča, črna s porjavelimi oznakami in sezamova, vedno z belkastimi oznakami »urajiro« na licih, prsih in spodnji strani telesa. Standard AKC navaja povprečno težo okoli 10 kg za pse in okoli 8 kg za psice.",
        "The Royal Kennel Club priporoča do ene ure gibanja na dan in česanje enkrat na teden, piše, da linja, življenjsko dobo pa navaja kot več kot 10 let; velika britanska študija je ugotovila mediano 14,6 leta. AKC ga opisuje kot samozavestnega, samostojnega psa, ki je primernejši za izkušenega lastnika, se najbolje počuti s starejšimi otroki in ga zunaj ograjenega prostora nikoli ne smemo spustiti s povodca. PetMD dodaja, da potrebuje veliko miselnih izzivov, da mu koristi socializacija v mladičkovem obdobju in da mu je treba zobe ščetkati vsak dan.",
      ],
      sources: ["S376", "S377", "S378", "S380", "S381", "S383"],
    },
    rhodesian_ridgeback: {
      aka: "ridgeback, Rhodesian Ridgeback, afriški levji pes",
      text: [
        "Rodezijski ridgeback izvira iz južne Afrike. Najbolj prepoznaven je po grebenu na hrbtu – pasu dlake, ki raste v nasprotno smer kot preostala dlaka. Standard FCI ga opisuje kot uravnoteženega, močnega, mišičastega, okretnega in dejavnega psa, ki je dostojanstven, inteligenten in do tujcev zadržan, posebej cenjen kot čuvaj in družinski pes. Kratka, gosta dlaka je svetlo do rdeče pšenične barve, standard pa navaja težo okoli 36,5 kg za pse in 32 kg za psice.",
        "The Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje enkrat na teden, piše, da linja in da sodi v veliko hišo z velikim vrtom, življenjsko dobo pa navaja kot več kot 10 let. PDSA ga opisuje kot igrivega, močnega in zelo zvestega psa z zelo močnim lovskim nagonom, ki ga ne priporoča lastnikom brez izkušenj; nikoli naj ne bo sam več kot štiri ure, socializirati ga je treba že od malega, med obrokom in gibanjem pa svetuje premor. Woodgreen dodaja, da se najbolje znajde s starejšimi otroki.",
      ],
      sources: ["S385", "S387", "S390", "S392"],
    },
    papillon: {
      aka: "kontinentalni pritlikavi španjel, falen (različica s povešenimi ušesi), Papillon",
      text: [
        "Papijon je različica kontinentalnega pritlikavega španjela s pokončnimi ušesi; pasma izvira iz Belgije in Francije, različico s povešenimi ušesi pa imenujejo falen. Standard FCI ga opisuje kot majhnega, elegantnega pritlikavega španjela z dolgo dlako in živahnim značajem, visokega okoli 28 cm, ki tehta do 4,5 kg (psi) oziroma 5 kg (psice). Velika ušesa nosi kot razprta metuljeva krila, dlaka pa je vedno bela z barvnimi lisami.",
        "The Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje večkrat na teden, piše, da linja in da lahko živi v stanovanju, življenjsko dobo pa navaja kot več kot 12 let. PDSA ga opisuje kot nežnega, igrivega in zelo ubogljivega psa, ki se dobro razume z vsemi ter potrebuje šolanje in socializacijo že od malega; svetuje česanje dvakrat do trikrat na teden. PetMD dodaja, da papijon vsak dan potrebuje miselne izzive, da se pri nekaterih lahko razvije stiska ob ločitvi, da mu je treba vsak dan ščetkati zobe in da ga lahko zelo majhni otroci po nesreči poškodujejo.",
      ],
      sources: ["S396", "S397", "S398", "S400"],
    },
    portuguese_water_dog: {
      aka: "Cão de Água Português, Portie, Portuguese Water Dog",
      text: [
        "Portugalski vodni pes izvira s Portugalske, kjer je pomagal ribičem. Standard The Royal Kennel Club ga opisuje kot čvrstega, skoraj kvadratnega in zelo mišičastega psa — zelo inteligentnega in neutrudno energičnega, odličnega plavalca in potapljača — visokega 50–57 cm (psi) oziroma 43–52 cm (psice), ki tehta 19–25 kg (psi) oziroma 16–22 kg (psice). Bogata enojna dlaka nima podlanke in je črna, bela, rjava ali črna oziroma rjava z belim; pri tradicionalnem »levjem« striženju sta gobec in zadnji del telesa ostrižena na kratko.",
        "The Royal Kennel Club priporoča do eno uro gibanja na dan in česanje vsak dan, piše, da ne linja in da mu ustreza velika hiša, življenjsko dobo pa navaja kot več kot 10 let. PDSA ga opisuje kot zelo prijaznega in ljubečega psa, ki se dobro razume z drugimi ljubljenčki, je odličen družinski pes ter potrebuje šolanje in socializacijo že od malega; doda še striženje in oblikovanje dlake pri pasjem frizerju večkrat na leto.",
      ],
      sources: ["S403", "S404", "S405"],
    },
    bichon_frise: {
      aka: "Bichon Frise, Bichon à poil frisé, Bichon Tenerife",
      text: [
        "Kodrasti bišon je francosko-belgijski pes za družbo. Standard FCI ga opisuje kot veselega malega psa živahnega koraka z zelo ohlapno belo dlako v spiralnih kodrih — pravega psa za družbo, ki ga lahko vzamete povsod, ni živčen in ne laja pogosto — visokega 25–29 cm, ki tehta približno 5 kg. Odrasel pes je vedno čisto bel, z zelo temnimi okroglimi očmi, črnim smrčkom, povešenimi ušesi in košatim repom, nošenim čez hrbet.",
        "The Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje vsak dan, piše, da ne linja in da mu ustreza stanovanje, življenjsko dobo pa navaja kot več kot 12 let. PDSA ga opisuje kot zelo ljubečega psa, ki se odlično razume z otroki in drugimi ljubljenčki; doda še, da je treba dlako striči na vsakih nekaj mesecev, pogosto pri pasjem frizerju.",
      ],
      sources: ["S410", "S411", "S413"],
    },
    newfoundland: {
      aka: "Newfoundland, novofundlandski pes, njufi",
      text: [
        "Novofundlandec izvira iz Kanade; FCI ga uvršča med molose gorskega tipa in priznava tri barve: črno, belo-črno (landseer) in rjavo. PDSA ga opisuje kot nežnega velikana in navaja povprečno višino 66–71 cm ter povprečno težo 50–69 kg; PetMD dodaja, da je zaradi svoje zgodovine rojen plavalec.",
        "PDSA za odraslega psa priporoča vsaj eno uro gibanja na dan, mladička pa ne smete preobremeniti, dokler se mu razvijajo kosti in sklepi; česanje opisuje kot vsakodnevno opravilo, piše, da se rad slini, in navaja življenjsko dobo pod 10 let. PetMD ga opisuje kot odličnega družinskega psa, ki se dobro razume z otroki, malimi živalmi in drugimi psi; svetuje, da igro majhnih otrok s psom vedno nadzorujete, in opozarja, da ima lahko kdaj težave, ko ostane sam.",
      ],
      sources: ["S419", "S423", "S424"],
    },
    dalmatian: {
      aka: "dalmatinski pas, Dalmatian, Carriage Dog",
      text: [
        "Dalmatinec izvira iz Hrvaške; FCI ga uvršča med pasme, sorodne goničem. Kratka, sijoča dlaka je čisto bela z jasno ločenimi črnimi ali rjavimi pikami, standard pa zahteva tudi pikasta ušesa. FCI navaja višino 56–62 cm za pse in 54–60 cm za psice; PDSA navaja povprečno težo 18–27 kg.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje enkrat na teden ter navaja, da linja in da potrebuje veliko hišo z vrtom. PDSA ga opisuje kot odličnega psa za aktivna gospodinjstva, ki se bolje znajde ob starejših otrocih, potrebuje družbo in ga nikoli ne smete pustiti samega več kot štiri ure; med zdravstvenimi težavami pasme navaja gluhost in omenja, da obstaja test sluha BAER.",
      ],
      sources: ["S428", "S429", "S430"],
    },
    australian_cattle_dog: {
      aka: "avstralski govedarski pes, Blue Heeler, Queensland Heeler",
      text: [
        "Avstralski govedar izvira iz Avstralije; FCI ga uvršča med pse za vodenje goveda. Standard Kennel Cluba opisuje močnega, kompaktnega delovnega psa z gladko, vremensko odporno dvojno dlako v modri (marmorirani ali pegasti) ali enakomerno rdeče pegasti barvi in navaja višino 46–51 cm za pse in 43–48 cm za psice; PDSA navaja povprečno težo 16–20 kg.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje enkrat na teden ter navaja, da linja. PDSA ga opisuje kot zelo pametnega in zelo energičnega psa, ki potrebuje veliko telesnega in miselnega dela; zaradi močnega pastirskega nagona lahko otroke, ki tečejo, grize za pete, pomagata pa socializacija in vzgoja že v mladosti.",
      ],
      sources: ["S436", "S437", "S438"],
    },
    whippet: {
      aka: "whippet, vipet",
      text: [
        "Mali angleški hrt (whippet) izvira iz Velike Britanije; FCI ga uvršča med kratkodlake hrte. Standard Kennel Cluba opisuje uravnoteženo povezavo mišične moči in elegance, fino, kratko in tesno prilegajočo dlako v kateri koli barvi ali kombinaciji barv razen merle ter nežen, ljubeč in umirjen značaj; navaja višino 47–51 cm za pse in 44–47 cm za psice, PDSA pa povprečno težo 11–18 kg.",
        "PDSA priporoča vsaj uro gibanja na dan, tudi tek brez povodca na varovanem prostoru, in česanje z mehko krtačo enkrat na teden. Opisuje ga kot priljubljeno izbiro za družine, ker je ob otrocih miren in nežen, a priporoča dom s starejšimi otroki; ne mara biti sam in ima zelo močan lovski nagon, zato ga PDSA ne priporoča v domu z manjšimi živalmi. Pozimi mu lahko pomaga plašček, debelo in mehko ležišče pa varuje izstopajoče kosti.",
      ],
      sources: ["S442", "S443", "S444"],
    },
    wirehaired_pointing_griffon: {
      aka: "korthals, korthalsov grifon, grifon",
      text: [
        "Francoski ostrodlaki ptičar (Korthalsov grifon) izvira iz Francije; FCI ga uvršča med celinske ptičarje in ga opisuje kot vsestranskega ptičarja. Standard FCI opisuje krepkega, robustnega psa, ki je daljši kot višji, z ostro, grobo dlako, ki ni nikoli kodrasta ali volnata, z vedno rjavim nosom in najraje jekleno sivo dlako z rjavimi (jetrnimi) lisami; navaja višino približno 55–60 cm za pse in 50–55 cm za psice ter ga opisuje kot nežnega, ponosnega in zelo nežnega do otrok. PetMD navaja težo 35–70 funtov (približno 16–32 kg).",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, veliko hišo in velik vrt ter česanje večkrat na teden. PetMD svetuje tedensko česanje (nekateri psi potrebujejo tudi ročno trimanje), pravi, da so grifoni do otrok praviloma potrpežljivi in nežni, če so bili kot mladički socializirani, in da imajo zaradi lovske preteklosti lahko močan lovski nagon, zato lahko lovijo manjše živali, kot so mačke in kunci.",
      ],
      sources: ["S449", "S450", "S453"],
    },
    chesapeake_bay_retriever: {
      aka: "chessie, Chesapeake",
      text: [
        "Chesapeake Bay retriver, pogosto imenovan Chessie, izvira iz Združenih držav Amerike; FCI ga uvršča med prinašalce. Standard FCI opisuje delovnega prinašalca, ki je enako spreten na kopnem in v vodi, ne sme biti prevelik ali pretežak, ima gosto, kratko dlako z gosto, volnato podlanko ter jasne rumenkaste ali jantarne oči; dovoljena je vsaka rjava barva, barva »sedge« (rdečkasto zlata) ali barva suhe trave, črna dlaka pa ga izloči. Navaja višino 58–66 cm in težo 29,5–36,5 kg za pse ter 53–61 cm in 25–32 kg za psice.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, veliko hišo in velik vrt ter česanje enkrat na teden. PetMD ga opisuje kot vedrega, veselega in zelo ljubečega psa, ki lahko postane uničevalen, če nima dovolj spodbud ali je predolgo sam, pravi, da je ob pravilnem uvajanju in socializaciji odličen družinski pes, in svetuje, naj pes ne teče tik pred jedjo ali po njej.",
      ],
      sources: ["S458", "S459", "S461"],
    },
    samoyed: {
      aka: "sammy, samojedski pes",
      text: [
        "Samojed izvira iz severne Rusije in Sibirije; FCI ga uvršča med nordijske vlečne pse. Standard FCI opisuje belega, elegantnega arktičnega špica srednje velikosti z bogato, gosto polarno dlako, temno rjavimi očmi, majhnimi, debelimi, pokončnimi uhlji in rahlo privzdignjenimi kotički ustnic v značilnem »samojedskem nasmešku«; dlaka je čisto bela, krem ali bela s piškotno barvo, modre ali raznobarvne oči pa ga izločijo. Navaja idealno višino 57 cm za pse in 53 cm za psice, z dovoljenim odstopanjem 3 cm.",
        "PDSA priporoča vsaj dve uri gibanja vsak dan in vsakodnevno česanje, pravi, da samojedi zelo izgubljajo dlako, da se navadno odlično razumejo z otroki in so zvesti vsej družini, da jih nikoli ne smemo pustiti samih več kot štiri ure, da zaradi spretnega pobegovanja potrebujejo zelo varen vrt in da imajo močan lovski nagon, ter svetuje premor med obrokom in gibanjem. PetMD dodaja, da samojedi slabo prenašajo vročino.",
      ],
      sources: ["S464", "S467", "S469"],
    },
    scottish_terrier: {
      aka: "scottie, škotski terier",
      text: [
        "Škotski terier, pogosto imenovan scottie, izvira iz Velike Britanije; FCI ga uvršča med male terierje. Standard Kennel Cluba opisuje čvrstega psa s kratkimi nogami, budne drže, ki v majhnem telesu kaže veliko moči in živahnosti; je zvest in vdan, dostojanstven, samostojen in zadržan, a pogumen in zelo inteligenten — drzen, a nikoli napadalen. Tesno prilegajoča se dvojna dlaka ima trdo, žičnato krovno dlako; barva je črna, pšenično rumena ali tigrasta v katerem koli odtenku. Navaja višino 25–28 cm in težo 8,5–10,5 kg.",
        "PDSA pravi, da škotski terierji potrebujejo približno uro gibanja na dan in vsakodnevno nego dlake, na dva do tri mesece pa trimanje in striženje pri pasjem frizerju; opisuje jih kot zveste in vdane svoji družini ter pravi, da so lahko trmasti, zato učenje zahteva potrpežljivost in vztrajnost. PetMD piše, da so ob pravem učenju in socializaciji lahko dobri družinski psi, da je socializacija mladička pomembna in da jih ne smemo dolgo puščati samih.",
      ],
      sources: ["S473", "S474", "S475"],
    },
    weimaraner: {
      aka: "weimarec, vajmarski ptičar, Weimaraner",
      text: [
        "Weimarski ptičar izvira iz Nemčije; FCI ga uvršča med celinske ptičarje in priznava kratkodlako in dolgodlako različico. Standard FCI opisuje srednje velikega do velikega lovskega psa delovnega tipa, žilavega in zelo mišičastega, z jantarnimi očmi in širokimi, precej dolgimi uhlji; dlaka je srebrno, srnje ali mišje siva, dovoljene so le majhne bele lise na prsih in prstih, vsaka barva razen sive pa psa izključi. Navaja višino 59–70 cm in težo okoli 30–40 kg za pse ter 57–65 cm in okoli 25–35 kg za psice.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, veliko hišo in velik vrt ter nego dlake enkrat na teden. PDSA piše, da so weimarski ptičarji v pravih rokah čudoviti družinski psi in da so najboljši pri lastnikih, ki pasmo poznajo, a jih zaradi zelo močnega lovskega nagona ne priporoča za dom z manjšimi otroki ali manjšimi živalmi; pravi, da lahko ob samoti razvijejo ločitveno tesnobo, ter svetuje socializacijo od malega in premor med obrokom in gibanjem. PetMD dodaja čiščenje ušes in kopanje enkrat na mesec.",
      ],
      sources: ["S478", "S479", "S480", "S481"],
    },
    italian_greyhound: {
      aka: "italijanski hrt, italijanski hrtek, Piccolo Levriero Italiano, Italian Greyhound",
      text: [
        "Mali italijanski hrt izvira iz Italije; FCI ga kot »Piccolo Levriero Italiano« uvršča med kratkodlake hrte. Standard Kennel Club ga opisuje kot hrta v malem, v vseh razmerjih bolj vitkega, elegantnega, gracioznega in hitrega v gibanju, inteligentnega, ljubečega in živahnega, čeprav se lahko zdi zadržan, s kratko, fino, svetlečo dlako na tanki koži. Navaja višino 32–38 cm in težo 3,6–4,5 kg; sprejete barve so črna, modra, kremasta, rumenorjava, rdeča in bela ali katera koli od teh z belimi lisami — nikoli merle, tigrasta ali s porjavelimi oznakami.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan, pravi, da je primeren za majhno hišo v mestu ali na podeželju, da potrebuje nego dlake enkrat na teden in da mu dlaka ne izpada. PDSA piše, da so mali italijanski hrti polni energije in naj se gibljejo v ograjenem prostoru, ker jih je težko priklicati, ko zagledajo plen, da so lahko plašni, zato je zgodnja socializacija nujna, in da zaradi krhkih kosti med rastjo morda niso najboljša izbira za dom z majhnimi otroki ali drugimi živalmi. PetMD dodaja, da jih tanka dlaka slabo greje, zato jih hitro zebe.",
      ],
      sources: ["S485", "S486", "S487", "S488"],
    },
    giant_schnauzer: {
      aka: "riesenschnauzer, veliki snavcer, Giant Schnauzer",
      text: [
        "Veliki šnavcer izvira iz Nemčije; FCI ga kot »Riesenschnauzer« uvršča med pinčerje in šnavcerje. Standard Royal Kennel Club ga opisuje kot močno grajenega, robustnega in žilavega psa skoraj kvadratne oblike, pogumnega, zanesljivega, dobrodušnega in umirjenega, s trdo, žičasto krovno dlako in dobro podlanko. Navaja višino 65–70 cm za pse in 60–65 cm za psice; standard FCI navaja težo 35–47 kg. Sprejete barve so čisto črna, poper in sol s temno masko na obrazu ter črno-srebrna — druge barve niso.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, pravi, da je primeren za veliko hišo z velikim vrtom, da potrebuje nego dlake vsak dan in da mu dlaka ne izpada. PDSA piše, da dlaka potrebuje vsakodnevno nego in redno striženje, da so veliki šnavcerji lahko ljubki družinski psi za družine s starejšimi otroki, če so kot mladički dobro socializirani, in da so ti psi z močno voljo primerni za izkušene lastnike. PetMD dodaja, da dlako na nekaj mesecev strokovno trimajo in da pasma ni primerna za dom, kjer ljudi pogosto ni doma.",
      ],
      sources: ["S494", "S495", "S496", "S497"],
    },
    bloodhound: {
      aka: "pes svetega Huberta, Chien de Saint-Hubert, St. Hubert Hound",
      text: [
        "Bloodhound izvira iz Belgije, kjer ga FCI vodi kot »Chien de Saint-Hubert«, velikega goniča. Standard FCI ga opisuje kot najmočnejšega med vsemi goniči: nežnega, mirnega, prijaznega in družabnega z ljudmi ter posebej navezanega na lastnika, s kratko, gosto dlako, odporno proti vremenu, in mehko, ohlapno kožo. Psi tehtajo približno 46–54 kg, psice približno 40–48 kg; barve so tri: črno-rjava, jetrno-rjava in rdeča.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, pravi, da je primeren za veliko hišo z velikim vrtom, da potrebuje nego dlake enkrat na teden in da mu dlaka izpada. PDSA piše, da je bloodhound primernejši za izkušene lastnike, da ga zaradi velikosti in zelo močnega lovskega nagona ne priporočajo za dom z manjšimi otroki ali manjšimi živalmi, da se slini in da morajo biti kožne gube čiste in suhe. Svetuje tudi premor med hranjenjem in gibanjem.",
      ],
      sources: ["S501", "S502", "S503"],
    },
    akita: {
      aka: "akita, American Akita, Great Japanese Dog",
      text: [
        "Akita v tem registru je ameriški tip: FCI jo vodi kot ameriško akito (»American Akita«), pasmo japonskega izvora, ločeno od japonske akite inu. Standard FCI opisuje velikega, čvrsto grajenega, uravnoteženega psa z močnimi kostmi, majhnimi pokončnimi uhlji in velikim repom, zavitim čez hrbet; psi so v vihru visoki 66–71 cm. Dovoljena je vsaka barva, na primer rdeča, rdečkasto plava, bela, lisasta ali tigrasta. PDSA navaja povprečno težo 31–59 kg.",
        "PDSA opisuje izjemno zveste družinske pse, ki so samostojni in zelo veliki, zato so najprimernejši za izkušene lastnike; akite ne priporoča za dom z majhnimi otroki in odsvetuje, da bi jo puščali samo, ker mnoge tega ne prenašajo dobro. Priporoča vsaj dve uri gibanja vsak dan, socializacijo od mladih nog, premor med hranjenjem in gibanjem ter vsaj tedensko krtačenje — akiti dlaka močno izpada. Opozarja tudi na močan lovski nagon in na to, da se v zelo vročem vremenu lahko pregreje.",
      ],
      sources: ["S506", "S507", "S508"],
    },
    cardigan_welsh_corgi: {
      aka: "Welsh Corgi (Cardigan), cardi, valižanski korgi",
      text: [
        "Welsh corgi cardigan izvira iz Velike Britanije; FCI ga uvršča med goniče goveda. Standard ameriškega kinološkega kluba (AKC) navaja višino 10,5–12,5 palca (približno 27–32 cm) v vihru in idealno težo psov 30–38 funtov (približno 14–17 kg). Za razliko od bratranca pembroka ima dolg, košat rep.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan, kot dovolj navaja majhno hišo z majhnim ali srednjim vrtom, pravi, da potrebuje nego dlake večkrat na teden in da mu dlaka izpada; življenjska doba je po njegovih podatkih več kot 12 let, cardigan pa je na seznamu ogroženih britanskih pasem. PDSA piše, da valižanski korgiji radi ugajajo, zato je šolanje razmeroma lahko, da navadno zadostuje krtačenje dva- do trikrat na teden in da lahko tekajoče otroke ščipnejo v pete — pomagata socializacija z otroki in šolanje v mladosti.",
      ],
      sources: ["S206", "S513", "S515", "S517"],
    },
    german_wirehaired_pointer: {
      aka: "Deutsch Drahthaar, drahthaar, GWP",
      text: [
        "Nemški ostrodlaki ptičar izvira iz Nemčije; FCI ga vodi kot »Deutsch Drahthaar« med celinskimi ptičarji. Standard Royal Kennel Cluba opisuje srednje velikega lovskega psa z ostro dlako, ki v celoti pokriva kožo — nežnega, ljubečega in umirjenega, pozornega, vodljivega in zelo zvestega. Psi so visoki 60–67 cm in tehtajo 25–34 kg, psice 56–62 cm in 20,5–29 kg. Standardne barve so rjavo-bela, enobarvno rjava in črno-bela.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan, pravi, da je primeren za veliko hišo z velikim vrtom na podeželju, da potrebuje nego dlake večkrat na teden in da mu dlaka izpada. PetMD piše, da potrebuje veliko gibanja in miselnih izzivov, da se tesno naveže na družino in je ob zgodnjem šolanju in socializaciji lahko odličen družinski pes, da se dobro razume z otroki, ki znajo ravnati z živalmi, da ga nikoli ne smemo dolgo puščati samega in da ima močan lovski nagon. Dlako dvakrat na leto ročno trimajo.",
      ],
      sources: ["S519", "S521", "S522", "S524"],
    },
    saint_bernard: {
      aka: "St. Bernard, bernhardiner, sveti bernard, pes svetega Bernarda",
      text: [
        "Bernardinec izvira iz Švice; FCI ga vodi kot »St. Bernard« med molosi gorskega tipa. Standard FCI opisuje psa, ki je po naravi prijazen, umirjen do živahen in pozoren, ter priznava dve različici: kratkodlako z gosto, gladko, tesno prilegajočo se dlako in dolgodlako. Psi so visoki najmanj 70 cm, psice najmanj 65 cm, do 90 oziroma 80 cm; PDSA navaja težo 54–81 kg.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan, pravi, da je primeren za veliko hišo z velikim vrtom, da potrebuje nego dlake večkrat na teden, da mu dlaka izpada in da običajno živi manj kot deset let. PDSA piše, da bernardinci najraje preživljajo čas z družino in se odlično razumejo z ljudmi vseh starosti, tudi z otroki, da jih je treba kot mladičke dobro socializirati, da jih je treba počesati vsaj trikrat na teden, da se slinijo, da slabše prenašajo vročino in da morajo po obroku nekaj časa počakati, preden gredo na sprehod. PetMD dodaja, da se lahko pri teh na ljudi navezanih psih razvije ločitvena tesnoba, če jih dolgo puščamo same.",
      ],
      sources: ["S527", "S528", "S529", "S532", "S533"],
    },
    staffordshire_bull_terrier: {
      aka: "staffie, staffy, stafford, staffordshirski bulterier",
      text: [
        "Stafordširski bulterier izvira iz Velike Britanije; FCI ga uvršča med terierje bulterierskega tipa. Standard FCI opisuje gladkodlakega, uravnoteženega psa, ki je za svojo velikost zelo močan — po tradiciji izjemno pogumen in vztrajen, zelo inteligenten in ljubeč, posebej z otroki. Visok je 35,5–40,5 cm; psi tehtajo 12,7–17 kg, psice 11–15,4 kg. Je tigrast, rdeč, plav, črn, moder ali bel, sam ali z belo.",
        "Royal Kennel Club ga imenuje čudovit družinski pes in priporoča do eno uro gibanja na dan; potrebuje nego dlake enkrat na teden, dlaka mu izpada in običajno živi več kot 12 let. PDSA piše, da so »staffiji« do otrok potrpežljivi in prijazni, a ker so zelo navezani na ljudi, so znani po ločitveni tesnobi, ko ostanejo sami, znani so tudi po grizenju stvari, in zaradi zelo močnega lovskega nagona manjše živali v njihovi bližini niso dobra ideja.",
      ],
      sources: ["S536", "S537", "S538", "S540"],
    },
    airedale_terrier: {
      aka: "kralj terierjev, airedale terier, erdelterier",
      text: [
        "Airedalski terier izvira iz Velike Britanije; FCI ga uvršča med velike in srednje velike terierje. Standard FCI ga imenuje največji med terierji — mišičast, dejaven, precej čokat pes, ki je odprt in samozavesten, prijazen, pogumen in inteligenten, vedno pozoren, ne napadalen, a neustrašen. Psi so visoki okoli 58–61 cm, psice okoli 56–59 cm. Trda, gosta, žimnata dlaka je rjava s črnim ali sivim sedlom.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan; dlaka potrebuje nego vsak dan, ne izpada, pasma pa običajno živi več kot 10 let. PetMD ga opisuje kot odličnega družinskega psa, ki se ob dobri vzgoji praviloma razume z otroki, a ga ne smete predolgo pustiti samega sebi; svetuje česanje nekajkrat na teden, hitro čiščenje ušes vsak teden in obisk pasjega frizerja trikrat ali štirikrat na leto.",
      ],
      sources: ["S545", "S546", "S547", "S549"],
    },
    russell_terrier: {
      aka: "russell terier (AKC), jack russell, JRT",
      text: [
        "Jack Russell terier — ameriški kinološki klub (AKC) ga imenuje russell terier — izvira iz Anglije, razvili pa so ga v Avstraliji; FCI ga uvršča med male terierje. Standard ga opisuje kot močnega, dejavnega in gibčnega delovnega terierja z izrazitim značajem: živahen, pozoren in dejaven, drzen in neustrašen, prijazen, a mirno samozavesten. Visok je 25–30 cm in tehta okoli 5–6 kg. Gladka, lomljena ali groba dlaka je pretežno bela s črnimi in/ali rjavimi lisami.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan in česanje enkrat na teden; pasmi dlaka izpada, običajno pa živi več kot 10 let. PDSA ga opisuje kot pametnega, živahnega psa, ki je lahko dober družinski pes, če ga od malega vzgajate in socializirate, a se bolje znajde v družinah z malo starejšimi otroki; ima zelo močan lovski nagon, zato manjših živali v domu ne priporočajo, rad pa tudi koplje.",
      ],
      sources: ["S557", "S558", "S559", "S560"],
    },
    bullmastiff: {
      aka: "bull mastif",
      text: [
        "Bulmastif je stara angleška čuvajska pasma iz 19. stoletja, ki izvira iz buldoga in starega angleškega mastifa; FCI ga uvršča med molose. Standard ga opisuje kot močnega, sorazmernega psa velike moči, ki pa ni okoren — vzdržljiv, dejaven, zanesljiv, živahen, pozoren in zvest. Psi so visoki 64–69 cm in tehtajo 50–59 kg, psice 61–66 cm in 41–50 kg. Kratka, trda dlaka je katerega koli odtenka plavo rjave, rdeče ali tigraste barve, vedno s črnim gobcem.",
        "Royal Kennel Club priporoča več kot dve uri gibanja na dan in česanje enkrat na teden, pasma pa običajno živi manj kot 10 let. PDSA ga opisuje kot zelo zvestega psa, ki je zaradi velikosti in moči primernejši za dom samo z odraslimi ali za družine s starejšimi otroki; potrebuje zgodnjo socializacijo, najbolje je, da je nekdo ves čas doma, ima zelo močan lovski nagon, se veliko slini, med hranjenjem in gibanjem pa potrebuje premor.",
      ],
      sources: ["S565", "S566", "S567", "S568"],
    },
    chinese_crested: {
      aka: "kitajski čopasti pes, powder puff",
      text: [
        "Kitajski goli pes je majhen, živahen in eleganten družabni pes s Kitajske; FCI ga uvršča med gole pse. Ima dve različici: golo, z gladkim golim telesom in dlako le na glavi (čop), nogah in repu, ter »powder puff«, ki jo v celoti pokriva tančica dolge mehke dlake. Psi so visoki 28–33 cm, psice 23–30 cm; PetMD navaja težo 3,6–5,4 kg. Dovoljena je vsaka barva razen merle, značaj pa je opisan kot vesel in nikoli napadalen.",
        "Royal Kennel Club priporoča do 30 minut gibanja na dan in česanje enkrat na teden; primeren je za stanovanje, pasma pa običajno živi več kot 12 let. PetMD ga opisuje kot prijaznega psa, ki se vklopi v večino družin, tudi z otroki in drugimi živalmi — vsak stik z otroki naj bo pod nadzorom. Golo kožo je treba zaščititi pred soncem in mrazom, kremplje vsak teden pregledati, mladičke pa zgodaj in dosledno socializirati.",
      ],
      sources: ["S570", "S571", "S572", "S574"],
    },
    nova_scotia_duck_tolling_retriever: {
      aka: "toller, novoškotski retriver, novoskotski prinasalec, Nova Scotia Duck Tolling Retriever",
      text: [
        "Novoškotski prinašalec — »toller« — je prinašalec iz Kanade; standard FCI opisuje, kako teka in se igra ob obali na očeh rac, da jih privabi bliže, nato pa jih prinese. Standard ga opisuje kot srednje velikega, močnega, kompaktnega in mišičastega psa, ki je zelo inteligenten, se zlahka uči in je izjemno vzdržljiv. FCI navaja za pse 48–51 cm in 20–23 kg, za psice 45–48 cm in 17–20 kg. Vodoodbojna dvojna dlaka je v odtenkih rdeče ali oranžne, običajno z belo na konici repa, tačkah, prsih ali lisi na glavi.",
        "Royal Kennel Club priporoča do eno uro gibanja na dan in česanje večkrat na teden, pasmi pa izpada dlaka; PetMD svetuje česanje enkrat do dvakrat na teden. Velika britanska raziskava (McMillan 2024, prek Dogs Trust) navaja mediano življenjske dobe 13,2 leta, PetMD 12–14 let; kot drugi srednje veliki psi zraste do približno 12–15 mesecev (PetMD). AKC ga opisuje kot zelo ljubečega psa, ki se običajno dobro razume z otroki, potrebuje veliko gibanja in miselnih izzivov, ima lahko močan lovski nagon do manjših živali in mu koristita zgodnja socializacija ter tečaj za mladičke.",
      ],
      sources: ["S576", "S577", "S578", "S579", "S580", "S123", "S10"],
    },
    cairn_terrier: {
      aka: "cairn, kern terier, cairnie, Cairn Terrier",
      text: [
        "Cairn terier izvira iz Velike Britanije; FCI ga uvršča med male terierje. Standard Kennel Cluba ga opisuje kot okretnega, budnega terierja delovnega, naravnega videza — živahnega, pogumnega in trdoživega, neustrašne in vesele narave, samozavestnega, a ne napadalnega. Vremensko odporna dvojna dlaka ima bogato, ostro krovno dlako; barva je kremasta, pšenično rumena, rdeča, siva ali skoraj črna, dovoljena je tudi tigrasta, značilna pa so temnejša ušesa in gobec. Standard navaja višino približno 28–31 cm in idealno težo 6–7,5 kg.",
        "PDSA priporoča vsaj eno uro gibanja na dan in pravi, da imajo cairn terierji neskončno energije in močan lovski nagon, zato jih je treba zgodaj socializirati z mačkami in drugimi malimi živalmi ter biti previden brez povodca; ko so socializirani, se zelo dobro razumejo z otroki in so odlični družinski psi. Svetuje ročno trimanje dlake dvakrat na leto in česanje enkrat do dvakrat na teden; po Dogs Trust zelo malo izgubljajo dlako. Velika britanska raziskava (McMillan 2024, prek Dogs Trust) navaja mediano življenjske dobe 14,0 leta, PetMD 13–15 let; kot drugi majhni psi zraste do približno 9–12 mesecev (PetMD). PetMD dodaja, da potrebujejo veliko gibanja in miselnih izzivov.",
      ],
      sources: ["S583", "S584", "S585", "S586", "S587", "S123", "S10"],
    },
    bull_terrier: {
      aka: "bulterier, bul terier, Bull Terrier, English Bull Terrier",
      text: [
        "Bulterier izvira iz Velike Britanije; FCI ga uvršča med terierje bul tipa (skupina 3). Je srednje velik terier s kratko dlako: PDSA navaja povprečno višino 51–61 cm in povprečno težo 22–31 kg, PetMD pa atletsko postavo, visoko približno 53–56 cm, s težo približno 23–32 kg. PetMD pravi, da je redno gibanje nujno, da so bulterierji ljubeči do družine, tudi do otrok, a niso vedno prijazni do drugih psov ali mačk, ter da sta ključni zgodnja in pogosta socializacija in vzgoja.",
        "PDSA priporoča vsaj eno uro gibanja na dan, razdeljeno čez dan, in premor po obroku pred gibanjem. Pravi, da se dobro socializiran bulterier razume z ljudmi vseh starosti, a je, ker je nekoliko razburljiv, bolje za družine s starejšimi otroki; rad ima čim več družbe in ima močan lovski nagon, zato je ob mačkah in drugih malih živalih potrebna previdnost. Za dlako zadošča česanje enkrat na teden. PDSA navaja povprečno življenjsko dobo več kot 10 let, PetMD 12–13 let; kot drugi srednje veliki psi zraste do približno 12–15 mesecev (PetMD).",
      ],
      sources: ["S589", "S591", "S592", "S10"],
    },
    british_shorthair: {
      aka: "britanka, British Blue",
      text: [
        "Britanska kratkodlaka mačka je čvrsta mačka z gosto dlako in velikimi okroglimi očmi — CFA jo imenuje mačka »medvedek«. Večina ljudi si jo predstavlja modro-sivo, a je v več barvah in vzorcih. Počasi dozoreva: po CFA doseže polno velikost pri približno treh letih, po VCA telesna zrelost lahko traja do pet let.",
        "CFA jo opisuje kot zelo ljubečo mačko, ki se naveže na svoje ljudi; razume se z vsemi v gospodinjstvu ne glede na starost, a običajno ne mara, da jo nosite naokrog, in živela je že s psi, kunci in pticami. VCA navaja zmerno aktivnost in svetuje, da dlako počešete vsaj enkrat na teden. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "ragdolka, ragdoll mačka, Rag doll",
      text: [
        "CFA opisuje ragdolla kot veliko, umirjeno mačko s poldolgo, gosto in svilnato dlako ter modrimi očmi. Temnejše »točke« ima v več vzorcih — colourpoint brez bele, mitted z belimi tačkami, bicolour z več bele in van. Počasi dozoreva: polno barvo dlake doseže pri dveh letih, polno velikost in težo pa pri približno štirih.",
        "CFA ga opisuje kot nežno mačko, ki vas pričaka pri vratih in vam sledi iz sobe v sobo; pogosto se igra brez iztegnjenih krempljev. PetMD piše, da je primeren tudi za družine z otroki, a naj bo prvo srečanje z otroki ali drugimi živalmi počasno in pod nadzorom, ter navaja, da nekaterim ragdollom zadošča česanje enkrat do dvakrat na teden; CFA svetuje redno česanje. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C30", "C32"],
    },
    siberian_cat: {
      aka: "sibirka, Siberian",
      text: [
        "GCCF opisuje sibirsko mačko kot pasmo, ki se razvija počasi, z gosto, vremensko odporno dlako: pod bolj grobo krovno dlako ima gosto, mehko podlanko, ki jo spomladi in jeseni močno menja. Samci tehtajo približno 7,7–11,8 kg, samice 5,9–7,7 kg, popolnoma razvita je lahko šele pri štirih do petih letih, GCCF pa navaja življenjsko dobo 12 do 15 let ali več.",
        "GCCF jo opisuje kot energično in igrivo, a potrpežljivo mačko — dobro izbiro za družine z majhnimi otroki —, ki se dobro razume tudi z drugimi živalmi, tudi s psi. PetMD svetuje česanje vsaj enkrat na teden, med spomladanskim in jesenskim linjanjem pa več, in poudarja, da sibirska mačka ne velja za hipoalergeno. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C34", "C35"],
    },
    maine_coon: {
      aka: "maine coon mačka, majkun",
      text: [
        "Maine Coon velja za eno največjih pasem domačih mačk: ima mišičasto, pravokotno telo s širokimi prsmi, velike tačke in dolg, košat rep. TICA navaja, da odrasli samci tehtajo v povprečju približno 5,9–8,2 kg, samice 4,1–5,9 kg, CFA pa, da so nekateri samci težji od 9 kg. Raste počasi: po CFA se pogosto povsem razvije šele pri treh ali štirih letih, po TICA lahko popolna zrelost traja tri do pet let.",
        "TICA ga opisuje kot nežno, prijazno in igrivo mačko, CFA kot družabno, zvesto in inteligentno; namesto mijavkanja se pogosto oglaša s čivkajočim trilčkom. Vetstreet piše, da se razume z vsemi, tudi z otroki, psi in drugimi mačkami. Ima težko, poldolgo dlako, ki je na ramenih krajša, na ovratniku, trebuhu in zadnjem delu pa daljša. Viri se glede nege razlikujejo: Vetstreet navaja, da zadošča česanje enkrat na teden, CFA svetuje krtačenje ali česanje vsaj nekajkrat na teden, TICA pa, da gostejša dlaka lahko potrebuje vsakodnevno česanje. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C17", "C18"],
    },
    bengal: {
      aka: "bengalka, Bengal",
      text: [
        "PDSA opisuje bengalsko mačko kot zelo inteligentno in energično mačko, ki potrebuje veliko miselnih izzivov in priložnosti za gibanje ter ima rada visoko razgledno točko, na primer mačje drevo. Je ljubeča, a se bo raje zvila ob vas kot v vašem naročju, in zna biti precej glasna. VCA navaja, da bengalke rastejo počasi in lahko telesno dozorijo šele pri dveh letih.",
        "Njena kratka, mehka, pegasta ali marmorirana dlaka potrebuje le rahlo krtačenje ali česanje enkrat na teden (PDSA). PetMD opozarja, da bengalka morda ni najboljša izbira za družine z majhnimi otroki, s psi in drugimi mačkami pa se ob pravilnem uvajanju lahko razume. Pasma je nastala s križanjem azijske leopardje mačke z domačimi mačkami; PetPrep prikazuje le registrirano domačo bengalsko mačko. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C44", "C45", "C46"],
    },
    norwegian_forest_cat: {
      aka: "wegie, skogkatt, Norwegian Forest Cat",
      text: [
        "GCCF opisuje norveško gozdno mačko kot nežno in prijazno mačko, ki rada živi v družini. Počasi dozoreva in povsem zraste šele pri približno štirih do petih letih; samci tehtajo približno 5,4–7,3 kg, samice 4,1–5,4 kg, GCCF pa navaja življenjsko dobo 14 do 16 let.",
        "Ima veliko energije, rada se igra in pleza; po GCCF dobro prenaša otroke, ki jo spoštujejo, druge mačke in pse, ki so navajeni mačk. PetMD svetuje česanje in krtačenje vsaj enkrat na teden, med spomladanskim in jesenskim linjanjem pogosteje, in opozarja, da se lahko pojavi ločitvena tesnoba, če je pogosto in dolgo sama. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C37", "C38"],
    },
  },
};

export default sl;
