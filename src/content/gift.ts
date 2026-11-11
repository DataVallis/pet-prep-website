import type { GiftLocale, MessageKey } from "../lib/gift.ts";

// TODO(David): the refund wording below (14 days if unredeemed, none once redeemed) is Claude's proposal from spec §3.1; needs the legal review (M5-06) before the switch goes on.

/**
 * Gift voucher copy (M6-S01), Slovenian and English only. Original text in the PetPrep voice: Slovenian
 * addresses parents formally (vikanje); no ages, no promise of a real pet, no invented numbers.
 * The price and the validity are not written here: they come from src/lib/gift.ts (one constant).
 */
export type GiftCopy = {
  meta: { title: string; description: string };
  langName: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  buy: { button: string; soon: string; priceNote: string; validity: string; refund: string };
  what: { heading: string; paragraphs: string[] };
  how: { heading: string; steps: { title: string; text: string }[] };
  included: { heading: string; items: string[] };
  audience: { heading: string; forTitle: string; forItems: string[]; notTitle: string; notItems: string[] };
  faq: { heading: string; items: { q: string; a: string }[] };
  redeemLink: { heading: string; text: string; button: string };
  kit: { text: string; button: string };
  thanks: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    lead: string;
    codeLabel: string;
    codeHint: string;
    codeInvalid: string;
    print: string;
    privacy: string;
    previewHeading: string;
    previewEmpty: string;
    stepsHeading: string;
    steps: string[];
    notChecked: string;
    voucher: { kind: string; title: string; line: string; code: string; redeemAt: string; validity: string; forLabel: string; fromLabel: string; parentNote: string };
  };
  redeem: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    lead: string;
    codeLabel: string;
    codeHint: string;
    emailLabel: string;
    emailHint: string;
    button: string;
    pending: string;
    noAccountHelp: string;
    giftLink: string;
  };
  messages: Record<MessageKey, string>;
};

export const giftCopy: Record<GiftLocale, GiftCopy> = {
  sl: {
    meta: {
      title: "Darilni bon: 12-tedenski PetPrep izziv",
      description: "Ne podarite kužka. Podarite preizkus: darilni bon za 12-tedenski PetPrep izziv, v katerem se otrok in družina preizkusita v skrbi za žival, preden se odločite za pravo.",
    },
    langName: "English",
    breadcrumb: "Darilni bon",
    eyebrow: "Darilni bon",
    title: "Ne podarite kužka. Podarite preizkus.",
    lead: "Darilni bon za 12-tedenski PetPrep izziv: dvanajst tednov skrbi za realistično simulirano žival, preden se družina odloči za pravo. Za otroka, ki si želi žival, in za starše, ki si želijo odgovor.",
    buy: {
      button: "Kupite darilni bon",
      soon: "Kmalu",
      priceNote: "Enkratno plačilo, brez naročnine.",
      validity: "Bon velja 12 mesecev od nakupa.",
      refund: "Neunovčen bon lahko v 14 dneh vrnete.",
    },
    what: {
      heading: "Kaj je PetPrep",
      paragraphs: [
        "PetPrep je aplikacija, v kateri otrok vsak dan skrbi za realistično simulirano žival: jo hrani, napoji, odpelje na sprehod, jo uči in čisti. Če skrb zamudi, žival to pokaže, tako kot bi jo v resnici.",
        "Vi kot starš imate nadzorno ploščo s semaforjem in oceno skrbi, tako da vidite, kako gre, ne da bi nadzorovali vsak korak.",
        "Po dvanajstih tednih družina dobi potrdilo o odgovornosti in, kar je pomembnejše, pošten odgovor, ali je pripravljena na pravo žival.",
      ],
    },
    how: {
      heading: "Kako deluje bon",
      steps: [
        { title: "Kupite", text: "Bon kupite na tej strani. Kodo prejmete po e-pošti." },
        { title: "Natisnite", text: "Po nakupu kodo prilepite na strani »hvala« in natisnite bon na list A4. Na list gresta dva bona, ki ju prepognete ali razrežete." },
        { title: "Starš unovči", text: "Starš na spletni strani vnese kodo in e-naslov svojega računa v aplikaciji. Izziv se doda družini." },
        { title: "Otrok začne", text: "V aplikaciji starš izbere ljubljenčka, za katerega izziv velja, in dvanajst tednov se začne." },
      ],
    },
    included: {
      heading: "Kaj je vključeno",
      items: [
        "En 12-tedenski PetPrep izziv za enega ljubljenčka, enako kot nakup v aplikaciji",
        "Katera koli vrsta in pasma, ki je ob izbiri v aplikaciji na voljo",
        "Poln nabor posnetkov, celotna zgodovina skrbi in potrdilo o odgovornosti",
        "Natisljiv bon z vašo osebno posvetilno vrstico (polji »Za« in »Od« izpolnite z roko)",
      ],
    },
    audience: {
      heading: "Za koga je in za koga ni",
      forTitle: "Bon je za vas, če",
      forItems: [
        "otrok v vaši družini že dolgo prosi za žival in si želite, da to preizkusi, preden se odločite,",
        "iščete darilo za vnuka, nečakinjo ali krščenca, ki ni živa žival in ni obljuba,",
        "želite, da izkušnja skrbi za žival izhaja iz otrokovih dejanj, ne iz vaših besed.",
      ],
      notTitle: "Bon ni za vas, če",
      notItems: [
        "želite podariti pravo žival: PetPrep je simulacija in bon ne vključuje ne obljublja prave živali,",
        "družina nima starša z računom v aplikaciji: unovčitev poteka prek starševskega računa,",
        "iščete hitro igro brez sodelovanja staršev: PetPrep je zasnovan tako, da starš spremlja in odloča.",
      ],
    },
    faq: {
      heading: "Pogosta vprašanja",
      items: [
        { q: "Kako dolgo bon velja?", a: "Bon je veljaven 12 mesecev od nakupa. Ko ga starš unovči, izziv ostane v družinskem računu in ne poteče. Dvanajst tednov se začne, ko starš izziv dodeli ljubljenčku v aplikaciji, ne ob unovčitvi." },
        { q: "Ali lahko bon vrnem?", a: "Neunovčen bon lahko vrnete v 14 dneh od nakupa. Unovčenega bona ni mogoče vrniti. Vračila obravnavamo prek Lemon Squeezy, prek katerega ste opravili nakup, zakonske pravice potrošnika pa ostanejo nespremenjene." },
        { q: "Na katerih napravah deluje?", a: "Aplikacija PetPrep je za iPhone in za telefone z Androidom. Bon unovčite na tej spletni strani, v katerem koli brskalniku." },
        { q: "Ali potrebujem račun?", a: "Za nakup in tiskanje bona računa ne potrebujete. Za unovčitev mora imeti družina starševski račun v aplikaciji: kodo vnesete skupaj z e-naslovom tega računa. Če se v aplikacijo prijavljate z Googlom ali Applom, vnesite e-naslov, ki ga vidite v aplikaciji (Nadzor → Račun)." },
        { q: "Ali bon velja tudi za mačko?", a: "Da. Danes sta v aplikaciji pes in mačka, bon pa velja za katero koli vrsto in pasmo, ki je ob izbiri v aplikaciji na voljo." },
        { q: "Ali bo otrok po izzivu dobil žival?", a: "Tega bon ne obljublja in ne vključuje. Izziv družini pomaga pošteno odgovoriti na vprašanje, ali je pripravljena. Odločitev o pravi živali ostane vaša." },
        { q: "Kaj se zgodi s kodo, ko jo vpišem?", a: "Na strani za natis bona se koda ne shrani in ne pošlje nikamor: bon se nariše v vašem brskalniku. Kodo preveri šele unovčitev." },
      ],
    },
    redeemLink: {
      heading: "Že imate bon?",
      text: "Starš lahko bon unovči na spletni strani. Potrebuje kodo z bona in e-naslov svojega računa v aplikaciji.",
      button: "Unovčite bon",
    },
    kit: {
      text: "Vsakemu bonu je priložen natisljiv komplet »Obljuba o ljubljenčku«.",
      button: "Oglejte si komplet",
    },
    thanks: {
      meta: { title: "Hvala za nakup: natisnite bon", description: "Prilepite kodo iz e-pošte in natisnite darilni bon." },
      eyebrow: "Darilni bon",
      title: "Hvala za nakup. Natisnimo bon.",
      lead: "Kodo bona ste prejeli po e-pošti od Lemon Squeezy. Prilepite jo spodaj in bon se nariše tukaj, v vašem brskalniku.",
      codeLabel: "Koda iz e-pošte Lemon Squeezy",
      codeHint: "Kodo prilepite tako, kot je v e-pošti.",
      codeInvalid: "Koda ni videti pravilno. Sestavljena je iz 8 do 64 črk, številk in vezajev.",
      print: "Natisnite bon",
      privacy: "Koda ostane v vašem brskalniku. Ne shranjujemo je, ne pošiljamo je na strežnik in ni v naslovu strani. Ko zaprete stran, je ni več.",
      previewHeading: "Predogled bona",
      previewEmpty: "Vpišite kodo in tu se pokaže bon.",
      stepsHeading: "Kako bon unovčite",
      steps: [
        "Starš v aplikaciji PetPrep ustvari račun starša.",
        "Odpre stran za unovčitev bona.",
        "Vnese kodo z bona in e-naslov starševskega računa.",
        "V aplikaciji izbere ljubljenčka, za katerega izziv velja.",
      ],
      notChecked: "Stran ne preverja, ali je koda veljavna. To se zgodi šele ob unovčitvi.",
      voucher: {
        kind: "Darilni bon",
        title: "12-tedenski PetPrep izziv",
        line: "En izziv za enega ljubljenčka v aplikaciji PetPrep.",
        code: "Koda",
        redeemAt: "Unovčite na",
        validity: "Velja 12 mesecev od nakupa",
        forLabel: "Za",
        fromLabel: "Od",
        parentNote: "Kodo unovči starš, z e-naslovom svojega računa v aplikaciji.",
      },
    },
    redeem: {
      meta: { title: "Unovčite darilni bon", description: "Vnesite kodo darilnega bona in e-naslov starševskega računa v aplikaciji PetPrep." },
      eyebrow: "Darilni bon",
      title: "Unovčite darilni bon",
      lead: "Vnesite kodo z bona in e-naslov, s katerim ste prijavljeni v aplikaciji PetPrep. Izziv se doda družinskemu računu, ljubljenčka pa izberete v aplikaciji.",
      codeLabel: "Koda bona",
      codeHint: "Koda je na bonu. Presledke lahko pustite.",
      emailLabel: "E-naslov starševskega računa",
      emailHint: "Vnesite e-naslov, s katerim ste prijavljeni v aplikaciji (Nadzor → Račun).",
      button: "Unovčite bon",
      pending: "Preverjamo …",
      noAccountHelp: "Računa starša še nimate? Najprej ga ustvarite v aplikaciji.",
      giftLink: "Bona še nimate? Oglejte si darilni bon.",
    },
    messages: {
      redeemed: "Izziv je dodan. Odprite aplikacijo in izberite ljubljenčka.",
      redeemed_already: "Ta bon je že unovčen v vašem družinskem računu. Izziv vas čaka v aplikaciji.",
      invalid_request: "Vnesite kodo bona in veljaven e-naslov.",
      invalid_code: "Te kode ne prepoznamo. Preverite, ali se natančno ujema s kodo na bonu, in poskusite znova.",
      expired: "Ta bon je potekel. Bon velja 12 mesecev od nakupa.",
      refunded: "Ta bon ni več veljaven, ker je bil vrnjen ali preklican.",
      already_redeemed: "Ta bon je že unovčen v drugem družinskem računu. Če menite, da gre za napako, nam pišite na david@petprep.si.",
      no_account: "S tem e-naslovom ni računa starša. Najprej v aplikaciji ustvarite račun starša, nato se vrnite sem. Koda ostane neporabljena.",
      unavailable: "Unovčitev bonov trenutno ni na voljo. Poskusite znova pozneje.",
      rate_limited: "Preveč poskusov. Počakajte nekaj minut in poskusite znova.",
      upstream_error: "Bona trenutno ne moremo preveriti. Poskusite znova čez nekaj minut, nič ni bilo porabljeno.",
      timeout: "Odgovora nismo prejeli pravočasno. Če ste bon morda že unovčili, ga vnesite znova: stran bo pokazala, da je že unovčen v vašem računu. Sicer poskusite znova čez nekaj minut.",
    },
  },
  en: {
    meta: {
      title: "Gift voucher: the 12-week PetPrep challenge",
      description: "Don't give a puppy. Give a trial: a gift voucher for the 12-week PetPrep challenge, where a child and their family practise caring for a pet before choosing a real one.",
    },
    langName: "Slovenščina",
    breadcrumb: "Gift voucher",
    eyebrow: "Gift voucher",
    title: "Don't give a puppy. Give a trial.",
    lead: "A gift voucher for the 12-week PetPrep challenge: twelve weeks of caring for a lifelike simulated pet before a family decides on a real one. For the child who keeps asking for a pet, and for the parents who would like an answer.",
    buy: {
      button: "Buy a gift voucher",
      soon: "Coming soon",
      priceNote: "One-time payment, no subscription.",
      validity: "The voucher is valid for 12 months from purchase.",
      refund: "An unredeemed voucher can be refunded within 14 days.",
    },
    what: {
      heading: "What PetPrep is",
      paragraphs: [
        "PetPrep is an app where a child looks after a lifelike simulated pet every day: feeding, watering, walking, training and cleaning up. If care is missed, the pet shows it, just as a real one would.",
        "As the parent you get a dashboard with a traffic light and a Care Score, so you can see how it is going without supervising every step.",
        "After twelve weeks the family receives a Certificate of Responsibility and, more importantly, an honest answer to whether they are ready for a real pet.",
      ],
    },
    how: {
      heading: "How the voucher works",
      steps: [
        { title: "Buy", text: "Buy the voucher on this page. The code arrives by e-mail." },
        { title: "Print", text: "After the purchase, paste the code on the thank-you page and print the voucher on an A4 sheet. Two vouchers fit on one sheet, to fold or cut." },
        { title: "A parent redeems", text: "On the website, a parent enters the code and the e-mail address of their account in the app. The challenge is added to the family." },
        { title: "The child begins", text: "In the app, the parent chooses the pet the challenge is for, and the twelve weeks begin." },
      ],
    },
    included: {
      heading: "What is included",
      items: [
        "One 12-week PetPrep challenge for one pet, the same as buying it in the app",
        "Any species and breed that is available in the app when the pet is chosen",
        "The full set of videos, the whole care history and the Certificate of Responsibility",
        "A printable voucher with space for your own message (fill in “For” and “From” by hand)",
      ],
    },
    audience: {
      heading: "Who it is for, and who it is not for",
      forTitle: "The voucher is for you if",
      forItems: [
        "a child in your family has long been asking for a pet and you would like them to try it first,",
        "you want a gift for a grandchild, a niece or a godchild that is not a living animal and not a promise,",
        "you want the experience of caring for a pet to come from the child's own actions, not from your words.",
      ],
      notTitle: "The voucher is not for you if",
      notItems: [
        "you want to give a real animal: PetPrep is a simulation, and the voucher neither includes nor promises a real pet,",
        "the family has no parent with an account in the app: redeeming goes through the parent account,",
        "you are looking for a quick game without a parent involved: PetPrep is built so that a parent follows along and decides.",
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      items: [
        { q: "How long is the voucher valid?", a: "The voucher is valid for 12 months from purchase. Once a parent redeems it, the challenge stays in the family account and does not expire. The twelve weeks start when the parent assigns the challenge to a pet in the app, not when the voucher is redeemed." },
        { q: "Can I get a refund?", a: "An unredeemed voucher can be refunded within 14 days of purchase. A redeemed voucher cannot be refunded. Refunds are handled through Lemon Squeezy, where you bought it, and your statutory consumer rights are not affected." },
        { q: "Which devices does it work on?", a: "The PetPrep app is for iPhone and for Android phones. You redeem the voucher on this website, in any browser." },
        { q: "Do I need an account?", a: "Not to buy or print the voucher. To redeem it, the family needs a parent account in the app: you enter the code together with the e-mail address of that account. If you sign in to the app with Google or Apple, enter the e-mail address shown in the app (Controls → Account)." },
        { q: "Does the voucher work for a cat?", a: "Yes. Today the app has dogs and cats, and the voucher works for any species and breed available in the app when the pet is chosen." },
        { q: "Will the child get a pet after the challenge?", a: "The voucher does not promise or include that. The challenge helps a family answer honestly whether they are ready. The decision about a real pet stays with you." },
        { q: "What happens to the code when I type it in?", a: "On the voucher printing page the code is not stored and not sent anywhere: the voucher is drawn in your browser. The code is only checked when it is redeemed." },
      ],
    },
    redeemLink: {
      heading: "Already have a voucher?",
      text: "A parent can redeem the voucher on the website. They need the code from the voucher and the e-mail address of their account in the app.",
      button: "Redeem a voucher",
    },
    kit: {
      text: "Every voucher comes with the printable “Pet Promise” kit.",
      button: "See the kit",
    },
    thanks: {
      meta: { title: "Thank you: print your voucher", description: "Paste the code from your e-mail and print the gift voucher." },
      eyebrow: "Gift voucher",
      title: "Thank you. Let's print the voucher.",
      lead: "Lemon Squeezy e-mailed you the voucher code. Paste it below and the voucher is drawn here, in your browser.",
      codeLabel: "Code from the Lemon Squeezy e-mail",
      codeHint: "Paste the code exactly as it appears in the e-mail.",
      codeInvalid: "This code does not look right. It is 8 to 64 letters, digits and hyphens.",
      print: "Print the voucher",
      privacy: "The code stays in your browser. We do not store it, send it to a server or put it in the page address. When you close the page it is gone.",
      previewHeading: "Voucher preview",
      previewEmpty: "Enter the code and the voucher appears here.",
      stepsHeading: "How to redeem the voucher",
      steps: [
        "A parent creates a parent account in the PetPrep app.",
        "They open the voucher redemption page.",
        "They enter the code from the voucher and the e-mail address of the parent account.",
        "In the app they choose the pet the challenge is for.",
      ],
      notChecked: "This page does not check whether the code is valid. That only happens when it is redeemed.",
      voucher: {
        kind: "Gift voucher",
        title: "The 12-week PetPrep challenge",
        line: "One challenge for one pet in the PetPrep app.",
        code: "Code",
        redeemAt: "Redeem at",
        validity: "Valid for 12 months from purchase",
        forLabel: "For",
        fromLabel: "From",
        parentNote: "A parent redeems the code, with the e-mail address of their account in the app.",
      },
    },
    redeem: {
      meta: { title: "Redeem a gift voucher", description: "Enter the gift voucher code and the e-mail address of the parent account in the PetPrep app." },
      eyebrow: "Gift voucher",
      title: "Redeem a gift voucher",
      lead: "Enter the code from the voucher and the e-mail address you use in the PetPrep app. The challenge is added to the family account, and you choose the pet in the app.",
      codeLabel: "Voucher code",
      codeHint: "The code is on the voucher. Spaces are fine.",
      emailLabel: "E-mail address of the parent account",
      emailHint: "Use the e-mail address of your parent account in the app (Controls → Account).",
      button: "Redeem voucher",
      pending: "Checking…",
      noAccountHelp: "No parent account yet? Create one in the app first.",
      giftLink: "No voucher yet? See the gift voucher.",
    },
    messages: {
      redeemed: "The challenge has been added. Open the app and choose the pet it is for.",
      redeemed_already: "This voucher is already redeemed in your family account. The challenge is waiting for you in the app.",
      invalid_request: "Please enter the voucher code and a valid e-mail address.",
      invalid_code: "We don't recognise this code. Check that it matches the code on the voucher exactly, then try again.",
      expired: "This voucher has expired. Vouchers are valid for 12 months from purchase.",
      refunded: "This voucher is no longer valid because it was refunded or cancelled.",
      already_redeemed: "This voucher has already been redeemed in another family account. If you think this is a mistake, write to david@petprep.si.",
      no_account: "There is no parent account with this e-mail address. Create a parent account in the app first, then come back here. Your code has not been used.",
      unavailable: "Voucher redemption is not available right now. Please try again later.",
      rate_limited: "Too many attempts. Please wait a few minutes and try again.",
      upstream_error: "We can't check the voucher right now. Please try again in a few minutes. Nothing has been used.",
      timeout: "We did not get an answer in time. If the voucher may already have been redeemed, enter it again: the page will show that it is already redeemed in your account. Otherwise try again in a few minutes.",
    },
  },
};
