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
const fciGroups: Record<number, string> = { 1: "ovčarski in pastirski psi", 2: "pinči in šnavcerji, molosi ter švicarski planšarski in pastirski psi", 3: "terierji", 4: "jazbečarji", 5: "špici in pasme pramaternega tipa", 6: "goniči, krvosledniki in sorodne pasme", 7: "ptičarji", 8: "prinašalci, šarivci in vodni psi", 9: "psi za družbo in pritlikavi psi" };
const origins: Record<string, string> = { GB: "Velika Britanija", FR: "Francija", DE: "Nemčija", US: "ZDA", CU: "Kuba", CH: "Švica" };

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
    size: { label: "Velikost", values: { toy: "Zelo majhen", small: "Majhen", medium: "Srednje velik", medium_large: "Srednje velik do velik", large: "Velik", giant: "Zelo velik" } },
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
    size: { toy: "zelo majhen", small: "majhen", medium: "srednje velik", medium_large: "srednje velik do velik", large: "velik", giant: "zelo velik" },
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
    walk_sensor: () => "Sprehodi štejejo prave korake s senzorja gibanja v telefonu — brez GPS.",
    play_instead_of_steps: (p, f) =>
      `Brez sprehodov: odrasla mačka potrebuje ${p.sessions} ${form(p.sessions, "igro", "igri", "igre", "iger")} na dan s palico z vabo, vsaj ${f.num(p.gap_minutes / 60)} ${form(p.gap_minutes / 60, "uro", "uri", "ure", "ur")} narazen.`,
    litter_rule: (p) =>
      `Stranišče: odrasla mačka ga uporabi ${p.uses}-krat na dan; vsako uporabo je treba počistiti v ${p.scoop_hours} urah (zunaj tihih ur), ves pesek pa zamenjati vsakih ${p.change_days} dni.`,
    scratching_after_missed_play: () => "Po dnevu brez dovolj igre mačka enkrat nekaj spraska; otrok jo odnese na praskalnik.",
    grooming_rule: (p) => (p.per_week === 1 ? "Česanje enkrat na teden." : p.per_week === 2 ? "Česanje dvakrat na teden." : `Česanje ${p.per_week}-krat na teden.`),
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
      dna_hsf4: "Test DNK za dedno sivo mreno (HSF4)",
      dna_lafora: "Test DNK za Laforino bolezen",
      dna_nccd: "Test DNK za neonatalno degeneracijo skorje malih možganov (NCCD)",
      dna_fviid: "Test DNK za pomanjkanje faktorja VII (FVIID)",
      dna_mls: "Test DNK za Musladin-Luekejev sindrom (MLS)",
      dna_vwd1: "Test DNK za von Willebrandovo bolezen tipa 1 (vWD1)",
      dna_hcm_mc: "Test DNK za hipertrofično kardiomiopatijo (MC HCM)",
      dna_sma: "Test DNK za spinalno mišično atrofijo (SMA)",
      dna_pk_def: "Test DNK za pomanjkanje piruvat-kinaze (PK def)",
      hcm_negative: "Vzrejne mačke morajo biti HCM negativne (bolezen srca: hipertrofična kardiomiopatija)",
      dna_gsd4: "Test DNK za bolezen kopičenja glikogena tipa IV (GSD IV)",
      dna_pra_b: "Test DNK za progresivno atrofijo mrežnice pri bengalski mački (PRA-b)",
      dna_jlpp: "Test DNK za juvenilno paralizo grla in polinevropatijo (JLPP)",
      dna_lemp2: "Test DNK za levkoencefalomielopatijo (LEMP-2)",
      dna_huu: "Test DNK za hiperurikozurijo (HUU)",
    },
  },
  health: {
    weight_gain: "Hitro se zredi — pazite na velikost obrokov in priboljške.",
    hip_elbow_dysplasia_eye_conditions: "Lahko je nagnjen k displaziji kolkov in komolcev ter k več dednim boleznim oči.",
    cancer_risk: "Viri pri tej pasmi navajajo večje tveganje za raka.",
    flat_face_breathing: "Pasma s ploščatim obrazom (brahicefalna): kratek gobček, ozke nosnice in odvečno mehko tkivo v dihalih lahko otežijo dihanje (brahicefalni obstruktivni sindrom dihalnih poti, BOAS).",
    heat_stroke_risk: "Hitro se pregreje in je bolj dovzeten za toplotni udar kot večina psov, zlasti v toplem vremenu.",
    skin_fold_ear_problems: "Nagnjen je k vnetjem ušes in okužbam kožnih gub; kožne gube morajo biti čiste in suhe.",
    merle_colour_risk: "Barva merle ni v standardu pasme; pri tej pasmi pomeni večje tveganje za težave s sluhom in vidom.",
    hind_leg_conformation: "The Royal Kennel Club pri tej pasmi opozarja na obliko zadnjih nog in način gibanja; zdrav pes ima raven hrbet in zmerno zakotene zadnje noge.",
    hip_elbow_dysplasia: "Lahko je nagnjen k displaziji kolkov in komolcev; vzrediteljem svetujejo, naj psom pred paritvijo pregledajo kolke in komolce.",
    degenerative_myelopathy: "Pri pasmi se pojavlja degenerativna mielopatija, bolezen hrbtenjače, ki počasi slabi zadnje noge; na voljo je test DNK.",
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
    pra_pk_def: "Pri pasmi se pojavljata dve dedni bolezni: progresivna atrofija mrežnice, očesna bolezen, ki lahko vodi v slepoto, in pomanjkanje piruvat-kinaze, bolezen krvi; z DNK-testi staršev se jima vzreditelji lahko izognejo.",
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
    british_shorthair: {
      aka: "britanka, British Blue",
      text: [
        "Britanska kratkodlaka mačka je čvrsta mačka z gosto dlako in velikimi okroglimi očmi — CFA jo imenuje mačka »medvedek«. Večina ljudi si jo predstavlja modro-sivo, a je v več barvah in vzorcih. Počasi dozoreva: po CFA doseže polno velikost pri približno treh letih, po VCA telesna zrelost lahko traja do pet let.",
        "CFA jo opisuje kot zelo ljubečo mačko, ki se naveže na svoje ljudi; razume se z vsemi v gospodinjstvu ne glede na starost, a običajno ne mara, da jo nosite naokrog, in živela je že s psi, kunci in pticami. VCA navaja zmerno aktivnost in svetuje, da dlako počešete vsaj enkrat na teden. Rodovniški mucki gredo v nov dom običajno pri 12–13 tednih (PDSA).",
      ],
      sources: ["C13", "C27", "C28"],
    },
    ragdoll: {
      aka: "ragdoll mačka, Rag doll",
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
