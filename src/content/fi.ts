import type { Dictionary } from "./types";

const fi: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Valmis lemmikkiin. Mukana koko sen elämän.",
    siteDescription:
      "PetPrep on 12 viikon lemmikkisimulaattori, joka näyttää vanhemmille, onko lapsi todella valmis oikeaan lemmikkiin – ja muuttuu sen jälkeen tekoälyavustajaksi oikean eläimen koko elämän ajaksi.",
    slogan: "Valmis lemmikkiin. Mukana koko sen elämän.",
    keywords: [
      "onko lapseni valmis koiraan",
      "sovellus, joka opettaa lapselle vastuuta lemmikistä",
      "virtuaalinen lemmikkisimulaattori",
      "tekoälylemmikkisimulaattori",
      "ennen koiran hankkimista",
      "lapset ja lemmikit",
      "lemmikkivalmiustesti",
      "vanhemman näkymä",
      "kokeile koirarotua ennen ostamista",
      "sopiiko tämä rotu minulle",
    ],
  },
  nav: { home: "Etusivu", menu: "Valikko", close: "Sulje valikko", skip: "Siirry sisältöön" },
  lang: { label: "Kieli", switchTo: "Vaihda kieltä" },
  cta: {
    primary: "Aloita maksutta sekarotuisella",
    secondary: "Katso, miten se toimii",
    earlyAccess: "Hanki varhainen käyttöoikeus",
    earlyAccessSubject: "PetPrep – varhainen käyttöoikeus",
    ios: "Lataa iPhonelle",
    android: "Lataa Androidille",
    comingSoon: "Tulossa iPhonelle ja Androidille",
    readMore: "Lue lisää",
    contactUs: "Ota yhteyttä",
  },
  common: {
    planned: "Suunnitteilla",
    plannedNote:
      "Tällä sivulla kerrotaan, mitä rakennamme seuraavaksi. Ominaisuus ei ole vielä sovelluksessa, ja yksityiskohdat voivat muuttua.",
    legalDraft:
      "Viimeistelemme tätä tekstiä juristiemme kanssa ennen virallista julkaisua. Ota yhteyttä, jos jokin on epäselvää.",
    lastUpdated: "Päivitetty viimeksi",
    breadcrumbHome: "Etusivu",
    screensNote: "Tällä sivustolla näkyvät sovellusnäkymät ovat esikatseluja; valmis sovellus voi näyttää hieman erilaiselta.",
    perPet: "lemmikkiä kohden",
    free: "Maksuton",
    forever: "pysyvästi",
    notFoundTitle: "Tämä sivu karkasi hihnasta.",
    notFoundText: "Etsimääsi sivua ei ole olemassa, tai se on siirretty.",
    notFoundCta: "Takaisin etusivulle",
  },
  footer: {
    tagline: "Valmis lemmikkiin. Mukana koko sen elämän.",
    groups: [
      { title: "Tuote", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Yritys", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Luottamus", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Kaikki oikeudet pidätetään.",
    dataEu: "Tiedot säilytetään EU:ssa.",
    languages: "Lisää kieliä tulossa pian.",
    company: "PetPrepin takana on",
    cookieSettings: "Evästeasetukset",
    a11yBadge: { title: "Esteetöntä leikkiä", text: "Helpommat eleet · Ruudunlukijat · Vähemmän liikettä" },
  },
  screens: {
    pin: "Lapsi kirjautuu vanhemmalta saadulla 6-numeroisella koodilla – ei sähköpostia, ei salasanaa.",
    contract: "Vastuusopimus allekirjoitetaan sormella. Allekirjoitus herättää lemmikin henkiin.",
    hud: "Lapsen aloitusnäkymä: lemmikin tila reaaliajassa, neljä hoitotarvetta ja hoitopainikkeet.",
    picker: "Vanhemmat valitsevat lemmikin: rodun, alkuperän (adoptoitu tai kasvattajalta) ja iän saapumishetkellä.",
    parent: "Vanhemman näkymä: liikennevalo, Care Score ja päivän rutiinit jokaiselle lapselle.",
    report: "Lapsen raportti 7, 30 tai 84 päivältä: rutiinit, lenkit ja väliin jääneet tehtävät päivä päivältä.",
    assistant: "Kun lemmikki tulee kotiin: tekoälyavustaja muuttaa pantadatan yhdeksi selkeäksi ehdotukseksi.",
    certificate: "12 viikon jälkeen: Vastuutodistus ja lapsen Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Sekarotuinen",
      text: "Koko simulaatio aidonnäköisen sekarotuisen lemmikin kanssa.",
      features: [
        "Päivittäinen hoito todellisine seurauksineen",
        "Oikeat lenkit, jotka lasketaan puhelimen oikeina askelina",
        "Vanhemman näkymä, liikennevalo ja Care Score",
        "Hiljaiset tunnit ja taukopainike",
        "Fotorealistinen kuva lemmikistäsi ja lyhyitä videoita",
        "Lisää 12 viikon haaste myöhemmin, samalle lemmikille",
      ],
      cta: "Aloita maksutta",
    },
    challenge: {
      name: "PetPrepin 12 viikon haaste",
      badge: "12 viikkoa + todistus",
      unit: "lemmikkiä kohden · 12 viikkoa",
      text: "Perheille, jotka haluavat koko kokemuksen ja lopuksi todistuksen.",
      features: [
        "Kaikki, mitä Sekarotuinen sisältää",
        "Mikä tahansa rotu, kuten [bordercollie](breed:border_collie), tai sekarotuinen koira ja kotikissa",
        "Lemmikkisi tunnetilat tekoälyvideoina",
        "Vastuutodistus",
        "Yksi hinta, kun sisarukset jakavat lemmikin",
        "Käyttöoikeus molemmille vanhemmille",
      ],
      cta: "Valitse haaste",
    },
    note:
      "Ostokset tehdään sovelluksessa App Storen tai Google Playn kautta. Saman perheen toinen lemmikki on erillinen haaste. Hinnat sisältävät mahdollisen arvonlisäveron.",
  },
  earlyAccess: {
    title: "Hanki varhainen käyttöoikeus",
    text: "Ole ensimmäisten perheiden joukossa kokeilemassa PetPrepiä. Lähetämme sinulle sähköpostia, kun se on valmis – emme muuta.",
    label: "Sähköpostiosoitteesi",
    placeholder: "nimi@esimerkki.fi",
    button: "Hanki varhainen käyttöoikeus",
    sending: "Lähetetään…",
    successTitle: "Olet listalla.",
    successText: "Kiitos! Kerromme sinulle sähköpostilla ensimmäisenä, kun PetPrep on valmis.",
    invalid: "Anna kelvollinen sähköpostiosoite.",
    error: "Jokin meni vikaan. Yritä hetken kuluttua uudelleen.",
    consent: "Ilmoittautumalla hyväksyt, että saat PetPrepiä koskevia sähköposteja. Voit perua tilauksen milloin tahansa.",
    privacyLink: "Tietosuojaseloste",
  },
  contactCards: [
    { title: "Perheet", text: "Kysymykset sovelluksesta, tilistäsi tai haasteesta.", email: "hello" },
    { title: "Tietosuoja", text: "Tietojen tarkastaminen, vienti tai poistaminen ja muut tietosuojakysymykset.", email: "privacy" },
    { title: "Kumppanit", text: "Lemmikkikaupat, löytöeläinkodit, eläinlääkärit, kouluttajat, vakuutusyhtiöt ja koulut.", email: "partners" },
    { title: "Sijoittajat", text: "Sijoittajakatsaus, esitys ja datahuone pyynnöstä.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – Onko lapsesi valmis lemmikkiin? Selvitä se 12 viikossa.",
      description:
        "Ennen kuin oikea lemmikki tulee kotiin, lapsesi hoitaa aidonnäköistä tekoälylemmikkiä 12 viikkoa: ateriat, siivous, oikeat lenkit. Näet päivittäin, onko hän todella valmis.",
    },
    hero: {
      eyebrow: "PetPrepin 12 viikon haaste",
      title: "Valmis lemmikkiin. Mukana koko sen elämän.",
      lead:
        "Ennen kuin oikea lemmikki tulee kotiin, lapsesi hoitaa aidonnäköistä tekoälylemmikkiä 12 viikkoa – ruokkii, siivoaa ja lähtee oikeille lenkeille. Näet joka päivä, onko hän todella valmis.",
      trust: ["Sekarotuinen lemmikki aina maksutta", "Ei mainoksia, ei keskustelua vieraiden kanssa", "Lapsi ei tarvitse sähköpostia"],
    },
    phone: {
      petName: "Luna",
      petAge: "Pentu · 3 kk",
      live: "LIVE",
      video: "Fotorealistinen tekoälyvideo lemmikistä",
      actions: ["Ruoki", "Vesi", "Lenkki", "Siivoa"],
    },
    parentCard: { child: "Maija", status: "Kaikki hyvin", scoreLabel: "Care Score", progress: "Viikko 3/12 · 31/36 rutiinia ajallaan" },
    notification: { app: "PetPrep", text: "Lemmikkisi katselee ruokakuppiaan. Aamiaisaika päättyy klo 9.00." },
    promoVideo: {
      eyebrow: "PetPrep minuutissa",
      title: "Katso, miten se toimii.",
      text: "Lemmikin valinnasta ja sopimuksen allekirjoittamisesta kouluun, lenkkeihin, turkinhoitoon ja todistukseen – kaikki, mitä lapsesi tekee 12 viikossa, ja kaikki, mitä näet näkymässäsi. Maskottimme Curio vain tervehtii; sovelluksen lemmikki on aidonnäköinen tekoälykoira.",
      alt: "PetPrepin esittelyvideo: sovellusnäkymiä, lapsi hoitamassa koiraa ja vanhempi seuraamassa Care Scorea.",
      note: "Sovellus ei ole vielä julkisesti saatavilla App Storessa ja Google Playssa – ilmoittaudu varhaisen käyttöoikeuden listalle.",
    },
    promise: {
      quote: "Jokainen perhe kuulee: ”Lupaan, että pidän siitä huolta.” PetPrep muuttaa lupauksen",
      highlight: "todisteeksi",
      text:
        "Epäonnistuminen simulaatiossa on perheellesi onnistuminen: saatte tietää sen ennen kuin oikea eläin kärsii – ja ennen kuin sitoudutte vuosien hoitoon ja kuluihin.",
    },
    how: {
      eyebrow: "Näin se toimii",
      title: "Kolme askelta pyynnöstä valmiuteen.",
      steps: [
        {
          title: "Sinä valitset lemmikin",
          text: "Luo perhetili, lisää lapsesi pelkällä lempinimellä ja valitse lemmikki – rotu, adoptoitu vai kasvattajalta, pentu vai seniori.",
        },
        {
          title: "Lapsesi allekirjoittaa lupauksen",
          text: "Lapsi kirjautuu 6-numeroisella koodilla – ei sähköpostia, ei salasanaa. Hän allekirjoittaa Vastuusopimuksen sormella, ja ainutlaatuinen lemmikki syntyy.",
        },
        {
          title: "12 viikkoa oikeaa hoitoa",
          text: "Yksi oikea viikko on lemmikin elämässä yksi kuukausi. Lopuksi: Vastuutodistus ja Care Score – puolueeton todiste tai rehellinen ”ei”.",
        },
      ],
      link: "Näin se toimii tarkemmin",
    },
    realism: {
      title: "Niin lähellä oikeaa lemmikkiä kuin sovellus voi olla.",
      text: "Ruokinta-ajat, lenkit ja kasvu perustuvat esimerkiksi eläinlääkäriyhdistysten ja kennelliittojen lähteisiin – niitä ei ole keksitty peliä varten.",
      items: [
        { title: "Oikeat lenkit, oikeat askeleet", text: "Päivän lenkki laskee askeleet lapsesi puhelimesta. Eikö tänään lenkkeilty lainkaan? Lemmikki tuntee sen huomenna." },
        { title: "Se kasvaa", text: "Pentu syö neljä kertaa päivässä, sitten kolme ja sitten kaksi – ja saa kasvaessaan uuden kuvan." },
        { title: "Se käyttäytyy kuin oikea lemmikki", text: "Pentujen pitää päästä ulos. Tylsistynyt koira pureskelee tossuja. Sotkut tulevat ennen päivällistä." },
        { title: "Ottaa koulun ja unen huomioon", text: "Hiljaisten tuntien aikana muistutukset tauotetaan. Koulupäivän aikaan osuva ateria on sinun tehtäväsi, ei lapsesi." },
        { title: "Todelliset seuraukset, lempeästi", text: "Laiminlyönti tarkoittaa käyntiä eläinlääkärillä tai joutumista löytöeläinkotiin – ei koskaan pelottavasti, ja aina voi aloittaa alusta." },
        { title: "Ainutlaatuinen", text: "Jokainen lemmikki saa oman turkin, merkit ja silmät – fotorealistisesti eikä koskaan kahta samanlaista." },
      ],
    },
    parents: {
      eyebrow: "Vanhemmille",
      title: "Näet totuuden reaaliajassa.",
      text: "Selkeä liikennevalo jokaiselle lapselle, ajallaan tehdyistä rutiineista laskettu Care Score ja aikajana siitä, kuka teki mitäkin. Lemmikin jakavat sisarukset saavat kukin oman, reilun tuloksensa.",
      points: [
        { strong: "Hiljaiset tunnit ja taukopainike", text: "päätösvalta pysyy sinulla." },
        { strong: "Lapset kirjautuvat koodilla", text: "ei sähköpostia, ei sukunimeä, ei mainoksia." },
        { strong: "Molemmat vanhemmat, kaikki lapset", text: "yksi perhe, yksi näkymä." },
      ],
      link: "Kaikki, mitä vanhemmat näkevät",
    },
    adults: {
      eyebrow: "Aikuisille",
      title: "Kokeile rotua ennen kuin tuot sen kotiin.",
      text: "Oletko ihastunut tiettyyn rotuun? PetPrep ei ole vain lapsille. Hoidat 12 viikon ajan tuon rodun tekoälylemmikkiä sen todellisine päivittäisine tarpeineen – ja saat selville, sopiiko se todella sinulle, ennen kuin ostat tai adoptoit.",
      points: [
        {
          strong: "Rodun todelliset tarpeet",
          text: "ateriat tiettyinä aikaikkunoina, vesi, siivous ja päivittäinen askeltavoite, joka perustuu lähteillä perusteltuun liikuntatarpeeseen: aikuinen bordercollie tarvitsee 12 000 askelta päivässä, sekarotuinen 6 000.",
        },
        {
          strong: "Koulutus ja pennun vahingot",
          text: "lyhyt koulutushetki joka päivä ja pentu, joka jaksaa pidätellä vain noin tunnin jokaista ikäkuukautta kohden ennen kuin sen on päästävä ulos – tai lattialla on lätäkkö.",
        },
        {
          strong: "12 viikkoa näyttää, sopiiko se elämääsi",
          text: "työpäiviisi, vapaa-aikaasi ja säähän. Koska siitä tulee perheen koira, voit lisätä kumppanisi tai lapsesi myöhemmin.",
        },
      ],
      how: "Näin aloitat: luo tili vanhempana, lisää itsesi hoitajaprofiiliksi ja kirjaudu 6-numeroisella koodilla – samalla tai toisella puhelimella.",
      note: "Saatavilla jo nyt: maksuton sekarotuinen koira ja kotikissa sekä 12 viikon haaste jommankumman tai minkä tahansa [eläinhakemiston](page:animals) koira- ja kissarodun kanssa.",
      link: "Näin käytät PetPrepiä yksin",
    },
    after: {
      eyebrow: "Kun lemmikki tulee kotiin",
      title: "Kun oikea lemmikki saapuu, PetPrep jää.",
      text: "Napauta ”Saimme oikean lemmikin”, niin simulaattorista tulee tekoälyavustaja tuleville vuosille – ja se tuntee jo perheesi rytmin.",
      features: [
        { title: "Älypanta", text: "Aktiivisuus ja hälytykset, kun jokin on vialla." },
        { title: "Tekoäly ensikontaktina", text: "Vastaa nopeasti ja ohjaa sitten oikealle eläinlääkärille." },
        { title: "Kasvu ja ruoka", text: "Viikoittainen paino, kasvukäyrä ja tieto siitä, milloin ruoka vaihdetaan." },
        { title: "Luotetut kumppanit", text: "Eläinlääkärit, kouluttajat ja vakuutusyhtiöt lähelläsi – selvästi merkittyinä." },
        { title: "DNA-testi", text: "Mitä rotuja sekarotuisessasi on – ja mihin kannattaa kiinnittää huomiota." },
        { title: "Kortti eläinlääkärille", text: "Rotusekoitus ja DNA-löydökset yhdessä paikassa, valmiina eläinlääkäriä varten." },
      ],
      link: "Tietoa tekoälyavustajasta",
      planned: "Kehitteillä",
    },
    species: {
      title: "Koiria ja kissoja nyt. Lisää lajeja tulossa.",
      text: "Tehty perheille kaikkialla maailmassa, heidän omalla kielellään.",
      chips: [
        { label: "Koira · saatavilla", active: true, link: "species:dog" },
        { label: "Kissa · saatavilla", active: true, link: "species:cat" },
        { label: "Koira- ja kissarodut · haasteessa", link: "page:animals" },
        { label: "Lisää lajeja · suunnitteilla", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Hinnat", title: "Yksinkertainen ja reilu hinnoittelu." },
    faq: { title: "Vanhempien kysymyksiä", link: "Kaikki kysymykset" },
    final: { title: "Valmis lemmikkiin?", text: "Selvitä se 12 viikossa. Aloita maksutta iPhonella tai Androidilla." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Näin PetPrep toimii – 12 viikon lemmikkivalmiushaaste",
        description:
          "Näin PetPrepin 12 viikon haaste toimii: lemmikin valinta, Vastuusopimus, päivittäinen hoito, oikeat lenkit, hiljaiset tunnit ja todistus.",
      },
      eyebrow: "Näin se toimii",
      title: "Kaksitoista viikkoa, jotka näyttävät, minkä arvoinen lupaus on.",
      lead:
        "Lapsesi hoitaa fotorealistista tekoälylemmikkiä, joka käyttäytyy niin paljon oikean lemmikin tavoin kuin sovelluksessa on mahdollista. Yksi oikea viikko vastaa lemmikin elämässä yhtä kuukautta, joten 12 viikossa lemmikki kasvaa aikuiseksi – ja näet, kestääkö hoito.",
      blocks: [
        {
          type: "steps",
          heading: "Ensimmäisestä napautuksesta todistukseen",
          items: [
            { title: "Vanhempi luo perheen", text: "Rekisteröidyt sähköpostiosoitteellasi (Apple- ja Google-kirjautuminen ovat tulossa). Lisää jokainen lapsi lempinimellä ja halutessasi syntymävuodella. Muuta emme kysy lapsestasi." },
            { title: "Sinä valitset lemmikin", text: "Valitse rotu (sekarotuinen on maksuton), lemmikin alkuperä – adoptoitu löytöeläinkodista tai ostettu kasvattajalta – ja sen ikä saapumishetkellä: pentu, nuori, aikuinen tai seniori." },
            { title: "Lapsesi kirjautuu koodilla", text: "Saat 6-numeroisen koodin, joka on voimassa 15 minuuttia. Lapsesi kirjoittaa sen omaan puhelimeensa – ilman sähköpostia ja salasanaa. Katosiko puhelin? Kirjaa lapsi ulos kaikilta laitteilta yhdellä napautuksella." },
            { title: "Vastuusopimus", text: "Lapsesi allekirjoittaa lupauksen sormella. Allekirjoitus on lemmikin syntymä: tarpeet alkavat laskea vasta siitä hetkestä, joten mitään ei menetetä, vaikka hän allekirjoittaisi myöhemmin." },
            { title: "Kaksitoista viikkoa hoitoa", text: "Ruokinta oikeissa aikaikkunoissa, raikas vesi, siivoaminen ja päivittäinen lenkki oikeilla askelilla. Lemmikin kasvaessa sen tarpeet muuttuvat." },
            { title: "Todistus", text: "12 viikon jälkeen lemmikki täyttää vuoden. Lapsesi saa Vastuutodistuksen ja Care Scoren – tai saatte molemmat turvallisesti tietää, ettei nyt ole oikea aika." },
          ],
        },
        {
          type: "screens",
          heading: "Mitä lapsesi näkee",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Mitä aikuinen sekarotuinen koira tarvitsee päivittäin",
          intro: "Luvut perustuvat eläinlääkäri- ja kennelliittolähteisiin; kun lähteet antavat vain vaihteluvälin, PetPrep valitsee arvon ja kertoo tehneensä niin.",
          head: ["Tarve", "Kuinka usein", "Jos se unohtuu"],
          rows: [
            ["Ruoka", "Aamulla (klo 6–10) ja illalla (klo 17–21), kerran kussakin aikaikkunassa", "Nälkä noin 12,5 tunnin jälkeen"],
            ["Vesi", "3 kertaa päivässä, vähintään 3 tunnin välein", "Jano noin 10 tunnin jälkeen"],
            ["Lenkki", "6 000 oikeaa askelta (pennuilla aluksi 2 000)", "Ei lenkkiä lainkaan → sairas seuraavana aamuna"],
            ["Siivous", "Kun lemmikki sotkee – ei koskaan hiljaisten tuntien aikana", "Ei ruokaa eikä vettä ennen kuin on siivottu"],
          ],
          note: "Pennut syövät 4, sitten 3 ja sitten 2 kertaa päivässä ja jaksavat pidätellä vain noin tunnin jokaista ikäkuukautta kohden. [Bordercollie](breed:border_collie) tarvitsee 12 000 askelta, ja sille tulee nopeammin nälkä.",
        },
        {
          type: "cards",
          heading: "Rakennettu oikean perhe-elämän ympärille",
          columns: 3,
          items: [
            { title: "Hiljaiset tunnit", text: "Aseta koulu- ja uniajat. Lemmikin tahti hidastuu, muistutuksia ei lähetetä eikä sotkuja synny silloin." },
            { title: "Ateriat kouluaikana", text: "Ruokinta-aikaikkuna, joka osuu kokonaan hiljaisiin tunteihin, on vanhemman tehtävä – sitä ei koskaan lueta lapsen tappioksi." },
            { title: "Tauko milloin tahansa", text: "Yksi painike tauottaa pelin esimerkiksi perheen yhteisen keskustelun ajaksi. Tauon aikana mikään ei huonone." },
            { title: "Lempeät muistutukset", text: "Lemmikki muistuttaa lastasi ensin lempeästi, sitten kiireellisesti. Saat hälytyksen vain, jos jokin tarve pysyy nollassa tunnin ajan." },
            { title: "Todelliset seuraukset", text: "Laiminlyönti tarkoittaa 12 tuntia eläinlääkärissä. Kokonainen päivä ilman hoitoa tarkoittaa, että löytöeläinkoti ottaa lemmikin – ja voitte aloittaa alusta." },
            { title: "Yhteiset lemmikit", text: "Sisarukset voivat jakaa yhden lemmikin. Jokainen teko kirjataan sille lapselle, joka sen teki, joten tulos pysyy reiluna." },
          ],
        },
        {
          type: "callout",
          title: "Epäonnistuminenkin on tulos.",
          text: "Jos lemmikki päätyy virtuaaliseen löytöeläinkotiin, olette oppineet jotakin arvokasta – ennen kuin oikea eläin joutuu maksamaan hinnan. Voitte aloittaa alusta, myös helpommalla rodulla.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Vanhemmille – PetPrepin vanhemman näkymä, Care Score ja asetukset",
        description:
          "Mitä vanhemmat näkevät PetPrepissä: päivittäinen liikennevalo lapsikohtaisesti, Care Score, rutiinit, raportit, ilmoitukset, hiljaiset tunnit, tauko ja sisäänrakennettu tietosuoja.",
      },
      eyebrow: "Vanhemmille",
      title: "Puolueeton todiste, ei taas uusi lupaus.",
      lead:
        "Sinun ei tarvitse arvailla, tehtiinkö lenkit oikeasti. PetPrep vertaa hoitoa selkeisiin päivittäisiin rutiineihin ja näyttää lapsi kerrallaan, miten menee.",
      blocks: [
        {
          type: "cards",
          heading: "Liikennevalo",
          intro: "Jokainen lapsi ja jokainen lemmikki saa värin tälle päivälle perheesi paikallisen ajan mukaan – aina sanallisen syyn kera.",
          columns: 3,
          items: [
            { title: "Vihreä – kaikki hyvin", text: "Rutiinit ovat aikataulussa.", tag: "ok" },
            { title: "Keltainen – vaatii huomiota", text: "Tänään on jäänyt väliin yli kaksi rutiinia.", tag: "warn" },
            { title: "Punainen – kiireellinen", text: "Lemmikki sairastui tänään, jokin tarve on ollut nollassa yli tunnin tai lemmikki joutui löytöeläinkotiin.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "Care Score",
          paragraphs: [
            "Care Score = ajallaan tehdyt rutiinit ÷ odotetut rutiinit × 100, josta vähennetään 10 pistettä jokaisesta sairastumisesta, rajattuna välille 0–100.",
            "Rutiini on yksi konkreettinen tehtävä: jokainen ruokinta-aikaikkuna, jokainen kolmesta vedenlisäyksestä, jokaisen sotkun siivoaminen kahden tunnin kuluessa (koulu- ja uniaikaa ei lasketa) ja päivän lenkkitavoitteen saavuttaminen.",
            "Aikaa, jolloin peli oli tauolla, lemmikki oli eläinlääkärissä tai sopimusta ei ollut vielä allekirjoitettu, ei koskaan lueta lapsesi tappioksi. Menneet päivät jäädytetään, joten tulosta ei voi kirjoittaa myöhemmin uudelleen.",
            "Lemmikin jakavat sisarukset jakavat jokaisen rutiinin reilusti. Vain lapsen omat teot lasketaan – jos yksi tekee kaiken, hän saa 100 ja toinen 0.",
          ],
        },
        {
          type: "screens",
          heading: "Sinun näkymäsi",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Päätösvalta pysyy sinulla",
          items: [
            "Hiljaiset tunnit koulua ja unta varten paikallisen aikasi mukaan – myös kesäaikaan siirryttäessä ja siitä palattaessa.",
            "Tauota minkä tahansa lemmikin peli yhdellä vahvistetulla napautuksella; lapsesi näkymä lukittuu saman tien.",
            "Kutsu toinen vanhempi kertakäyttöisellä koodilla; näette molemmat jokaisen lapsen ja jokaisen lemmikin.",
            "Kirjaa lapsi ulos kaikilta laitteilta, jos puhelin katoaa; koodit ovat kertakäyttöisiä ja vanhenevat 15 minuutissa.",
            "Vie kaikki perheesi tiedot tiedostona tai poista lapsen profiili tai koko tilisi sovelluksessa saman tien.",
          ],
        },
        {
          type: "list",
          heading: "Sisäänrakennettu tietosuoja",
          items: [
            "Lapset kirjautuvat koodilla – ei sähköpostia, ei salasanaa, ei sukunimeä.",
            "Tallennamme lempinimen ja, jos lisäät sen, syntymävuoden. Muuta emme lapsestasi tallenna.",
            "Ilmoituksissa ei koskaan ole lapsesi nimeä, koska ne voivat näkyä lukitusnäytöllä; otsikkona voi olla lemmikin nimi, jos olet antanut sille nimen.",
            "Askeleet tulevat Apple Terveydestä (iPhone) tai Health Connectista (Android), jos sallit sen (vain luku), ja puhelimen liikeanturista, jos se on käytettävissä. PetPrep ei käytä GPS:ää eikä seuraa sijaintia.",
            "Ei mainoksia, ei keskustelua vieraiden kanssa, palvelimet EU:ssa.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Kun lemmikki tulee kotiin – PetPrepin tekoälyavustaja oikealle lemmikillesi",
        description:
          "Kun perheesi saa oikean lemmikin, PetPrepistä tulee tekoälyavustaja: älypannan aktiivisuustiedot, hälytykset, tekoäly ensikontaktina ja oikea eläinlääkäri, kasvu ja ruoka.",
      },
      eyebrow: "Kun lemmikki tulee kotiin",
      title: "Simulaatio päättyy. Hoito ei.",
      lead:
        "Kun perheesi tuo oikean lemmikin kotiin, yksi napautus muuttaa PetPrepin avustajaksi eläimen koko elämän ajaksi – reaaliajassa, ilman tarvepalkkeja ja jo valmiiksi perheesi arkeen tottuneena.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Mitä avustaja tulee tekemään",
          columns: 2,
          items: [
            { title: "Älypantaintegraatio", text: "Yhdistä suositut GPS- ja aktiivisuusseurannat – tai PetPrep-panta – ja näe aktiivisuus asiayhteydessään." },
            { title: "Hälytykset, jotka selittävät", text: "”Max juoksi tänään 2 km, puolet tavallisesta, ja söi tavallista isomman aterian. Ylimääräinen iltalenkki auttaa sitä rauhoittumaan.” Yksi havainto, yksi syy, yksi ehdotus." },
            { title: "Ensin tekoäly, sitten oikea eläinlääkäri", text: "Kysy kysymys tai lataa kuva. Avustaja vastaa yleisiin kysymyksiin, arvioi kiireellisyyden ja ohjaa sinut tarvittaessa oikealle eläinlääkärille – kiireelliset oireet ohjataan suoraan eläinlääkärille." },
            { title: "DNA-testi koirallesi tai kissallesi", text: "Tilaa DNA-testi sovelluksessa tai lataa jo tekemäsi testin tulos. PetPrep näyttää, mitä rotuja sekoituksessa on, mikä niille on tyypillistä ja mitkä terveysongelmat ovat näillä roduilla yleisempiä – lähteineen. Rotujen prosenttiosuudet eivät ole diagnoosi, eikä DNA-testi kerro allergioista." },
            { title: "Kortti eläinlääkärille", text: "Rotusekoitus ja mahdolliset suorat DNA-löydökset yhdellä sivulla tai QR-koodina, jotta eläinlääkärisi tietää heti, mitä sekarotuisessa on." },
            { title: "Kasvu ja ravinto", text: "Kirjaa paino viikoittain, katso kasvukäyrä ja saa muistutus, kun on aika vaihtaa ruoka." },
          ],
        },
        {
          type: "screens",
          heading: "Esikatselu",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Periaatteet, joista emme jousta",
          items: [
            "Tekoälyavustaja ei ole eläinlääkäri eikä koskaan tee diagnoosia. Jokaisessa terveyttä koskevassa vastauksessa on tapa tavoittaa oikea eläinlääkäri.",
            "Kumppanien tarjoukset (kaupat, vakuutusyhtiöt, kouluttajat, eläinlääkärit) on aina merkitty, ja kerromme, kun saamme palkkion.",
            "Mitään ei jaeta kumppanille ilman suostumustasi.",
            "Lapsesi haasteen tiedot siirtyvät avustajaan vain, jos hyväksyt sen.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Hinnat – PetPrepin aloitus on maksuton, 12 viikon haaste 49,99 €",
        description:
          "Sekarotuinen lemmikki on aina maksuton. PetPrepin 12 viikon haaste maksaa 49,99 € lemmikkiä kohden kertaostoksena. Yksi hinta lemmikin jakaville sisaruksille. Myös maksuttoman lemmikkisi päivityksenä.",
      },
      eyebrow: "Hinnat",
      title: "Yksinkertainen ja reilu hinnoittelu.",
      lead: "Aloita maksutta sekarotuisella lemmikillä. Osta koko 12 viikon haaste, kun olet valmis – 12 viikkoa alkaa ostohetkestä. Se onnistuu myös sille maksuttomalle lemmikille, jota lapsesi jo hoitaa.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Toiveet – tavaroita lemmikillesi",
          intro:
            "Sovelluksessa lapsesi toivoo tavaroita lemmikilleen; sinä päätät ja ostat. Lapsesi ei koskaan näe hintoja. Tavarat vaikuttavat vain ulkonäköön: ne eivät koskaan muuta tarpeita, Care Scorea tai todistusta. Saatavilla myös maksuttomalle sekarotuiselle koiralle ja kotikissalle.",
          head: ["Tavara", "Hinta"],
          rows: [
            ["Peti (kissalla: kori)", "5,99 €"],
            ["Ruoka- ja vesikupit", "5,99 €"],
            ["Lelu (koiralla: köysilelu tai vinkulelu, kissalla: pehmohiiri tai höyhenhuiska)", "5,99 € / lelu"],
            ["Herkut, 10 kpl:n pakkaus", "2,99 €"],
            ["Tervetulopaketti: peti + kupit + lelu", "15,99 € (17,97 €:n sijaan)"],
          ],
          note: "Toiveet tulevat sovelluksen seuraavassa päivityksessä; niitä voi ostaa, kun tavarat ovat saatavilla App Storessa ja Google Playssa. Hinnat koskevat Sloveniaa; kauppa näyttää maasi hinnan.",
        },
        {
          type: "faq",
          heading: "Kysymyksiä hinnoista",
          items: [
            { q: "Onko maksuton versio todella maksuton?", a: "On. Sekarotuinen lemmikki on aina maksuton, ja siinä on koko simulaatio, oikeat lenkit ja vanhemman näkymä." },
            { q: "Mitä haaste sisältää?", a: "Vaativat rodut, kuten [bordercollien](breed:border_collie), lemmikkisi tunnetilat tekoälyvideoina, Vastuutodistuksen lopuksi ja käyttöoikeuden molemmille vanhemmille. Voit valita sen myös sekarotuiselle koiralle tai kotikissalle." },
            { q: "Voimmeko päivittää lapseni nykyisen maksuttoman lemmikin haasteeseen?", a: "Kyllä, kunhan maksuton sekarotuinen koira tai kotikissa on vielä pelissä. Aloita haaste vanhemman sovelluksessa lapsesi kortilta. Lemmikki pysyy samana: nimi, ulkonäkö, ikä ja opitut käskyt. 12 viikkoa, Care Score ja todistus lasketaan ostosta; aiemmat päivät jäävät historiaan haastetta edeltävinä päivinä merkittyinä, eikä niitä lasketa. Hinta on sama: 49,99 € kertaostona, ei tilausta. Sovelluksen varhaisessa versiossa luotuja sekarotuisia koiria ei voi päivittää; sovellus kertoo, koskeeko tämä sinun koiraasi." },
            { q: "Voiko haasteen lemmikki palata ilmaisversioon?", a: "Ei pyynnöstä. Sekarotuinen koira tai kotikissa palaa ilmaisversioon vain, jos kauppa hyvittää oston; haaste päättyy silloin ilman todistusta. Jos ostat haasteen myöhemmin uudelleen, alkaa uusi 12 viikon jakso." },
            { q: "Painostaako sovellus ostamaan?", a: "Ei. Jos lapsesi on hoitanut maksutonta lemmikkiä vähintään 5:nä sen ensimmäisistä 7 päivästä, saat yhden ilmoituksen ja kortin näkymääsi haasteesta – kerran lemmikkiä kohden, ei koskaan hiljaisina tunteina. Lapsesi ei näe hintoja eikä tätä muistutusta." },
            { q: "Maksavatko sisarukset kahdesti?", a: "Eivät. Yhden lemmikin jakavat lapset maksavat yhden hinnan. Perheen toinen lemmikki on erillinen haaste." },
            { q: "Miten maksan?", a: "Sovelluksessa App Storen tai Google Playn kautta. Hyvitykset hoidetaan kauppatilisi kautta." },
            { q: "Mitä Toiveet ovat ja voiko lapseni ostaa jotain yksin?", a: "Lapsesi voi toivoa lemmikilleen petiä, kuppeja, lelua tai herkkuja – enintään kolme avointa toivetta kerrallaan. Saat ilmoituksen ja joko ostat tavaran tai valitset ”Ei nyt”. Lapsesi ei koskaan näe hintoja eikä voi ostaa mitään lapsen sovelluksessa." },
            { q: "Helpottavatko ostetut tavarat peliä?", a: "Eivät. Tavarat vaikuttavat vain ulkonäköön. Ne eivät koskaan muuta tarpeita, Care Scorea tai todistusta, eikä Toiveissa ole eläinlääkäriä tai lääkkeitä – ei koskaan ”maksa ja pelasta lemmikkisi”." },
            { q: "Koskeeko sama aikuisia?", a: "Koskee. Jos käytät PetPrepiä yksin rodun kokeilemiseen, sama pätee: sekarotuinen on aina maksuton, ja 12 viikon haaste maksaa 49,99 € lemmikkiä kohden." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "UKK – vanhempien kysymyksiä PetPrepistä",
        description:
          "Vastauksia PetPrepistä: päivittäinen ajankäyttö, käyttö aikuisena, tietosuoja ja sijainti, askeleet, sisarukset, mitä tapahtuu, jos lapsi epäonnistuu, kielet, lajit, oikeat lemmikit.",
      },
      eyebrow: "UKK",
      title: "Vanhempien kysymyksiä.",
      lead: "Lyhyitä, rehellisiä vastauksia. Puuttuuko jotain? Kirjoita meille.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Minkä ikäisille PetPrep on tarkoitettu?", a: "Lapsille se on suunniteltu noin 7–12-vuotiaille, ja se toimii hyvin 16-vuotiaaksi asti. Myös aikuiset käyttävät sitä selvittääkseen, sopiiko tietty rotu todella heille, ennen kuin he ostavat tai adoptoivat." },
            { q: "Voinko käyttää PetPrepiä yksin, ilman lapsia?", a: "Voit. Luo tili vanhempana ja lisää itsesi hoitajaprofiiliksi – lempinimi riittää, jätä syntymävuosi tyhjäksi. Valitse rotu, luo 6-numeroinen koodi ja valitse sitten samalla tai toisella puhelimella ”I’m a kid” (”Olen lapsi”) ja kirjoita koodi – näin sinusta tulee hoitaja. Koska siitä tulee perheen koira, voit myöhemmin lisätä kumppanisi tai lapsesi, jotta hoidatte sitä yhdessä. Hinta on sama kuin perheille." },
            { q: "Paljonko aikaa se vie päivässä?", a: "Muutaman minuutin ruokaan, veteen ja siivoamiseen – sekä lenkin, jonka oikea koirakin tarvitsisi." },
            { q: "Seuraako sovellus lapseni sijaintia?", a: "Ei. Lenkkejä varten se laskee vain askeleita. Jos sallit sen, sovellus lukee ne Apple Terveydestä (iPhone) tai Health Connectista (Android) – vain lukuoikeudella ja vain askeleet; jos puhelimen liikeanturi on käytettävissä, sovellus käyttää myös sitä. Lupaa kysytään lenkkinäkymässä. GPS:ää ei käytetä." },
            { q: "Tarvitseeko lapseni sähköpostiosoitteen?", a: "Ei. Sinä luot tilin; lapsesi kirjautuu luomallasi 6-numeroisella koodilla. Tallennamme vain lempinimen ja halutessasi syntymävuoden." },
            { q: "Mitä tapahtuu, jos lapseni unohtaa?", a: "Lemmikki lähettää ensin lempeitä muistutuksia. Jos jokin tarve pysyy nollassa, lemmikki sairastuu ja viettää 12 tuntia eläinlääkärissä. Jos lemmikki on kokonaisen päivän ilman hoitoa, virtuaalinen löytöeläinkoti ottaa sen – ja voitte aloittaa alusta." },
            { q: "Voivatko sisarukset jakaa lemmikin?", a: "Voivat. Jokainen lapsi allekirjoittaa oman sopimuksensa, jokainen teko kirjataan sen tekijälle ja jokainen lapsi saa oman, reilun Care Scorensa." },
            { q: "Entä koulu ja nukkumaanmeno?", a: "Aseta hiljaiset tunnit. Lemmikin tahti hidastuu, mitään ei lähetetä, ja kokonaan hiljaisiin tunteihin osuvat ateriat hoidat sinä." },
            { q: "Onko se lapsille pelottavaa?", a: "Ei. Seuraukset ovat todellisia mutta lempeitä: lemmikki joutuu eläinlääkäriin tai löytöeläinkotiin, mitään järkyttävää ei näytetä, ja aina voi aloittaa alusta." },
            { q: "Mitä eläimiä on saatavilla?", a: "Nyt [koirat](species:dog) ja [kissat](species:cat): maksuton sekarotuinen koira ja kotikissa sekä 12 viikon haaste jommankumman tai minkä tahansa [eläinhakemiston](page:animals) rodun kanssa – hakemistossa on myös niiden tarpeet lähteineen. Lisää lajeja on suunnitteilla." },
            { q: "Millä kielillä?", a: "Nyt englanniksi ja sloveniaksi. Lisää kieliä tulee, kun PetPrep julkaistaan uusissa maissa." },
            { q: "Mitä tapahtuu, kun saamme oikean lemmikin?", a: "PetPrepistä voi tulla tekoälyavustaja oikealle lemmikillesi. Tämä osa on kehitteillä." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Kumppanit – tee yhteistyötä PetPrepin kanssa",
        description:
          "PetPrep tekee yhteistyötä lemmikkikauppojen, löytöeläinkotien, eläinlääkärien, kouluttajien, vakuutusyhtiöiden, pantavalmistajien ja koulujen kanssa, jotta perheet hankkisivat lemmikin vastuullisesti.",
      },
      eyebrow: "Kumppanit",
      title: "Paremmin valmistautuneita perheitä kaikille, jotka välittävät eläimistä.",
      lead:
        "PetPrepin läpikäyneet perheet tietävät, mitä lemmikki todella vaatii. Rakennamme kumppaniverkostoa, joka kohtaa heidät oikealla hetkellä – selvästi merkittynä ja aina perheen suostumuksella.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Keiden kanssa teemme yhteistyötä",
          columns: 3,
          items: [
            { title: "Lemmikkikaupat", text: "Tavoita perheet sillä hetkellä, kun ne osoittavat olevansa valmiita – esimerkiksi aloituspakettitarjouksella todistuksen yhteydessä." },
            { title: "Löytöeläinkodit, eläinsuojeluyhdistykset ja kasvattajat", text: "Suosittele PetPrepiä ennen adoptiota tai ostoa, niin hetken mielijohteesta tehtyjä päätöksiä ja palautuksia on vähemmän." },
            { title: "Eläinlääkärit", text: "Kun oikea lemmikki tulee kotiin, tekoälyavustaja vastaa ensimmäisiin kysymyksiin ja ohjaa omistajat teille. Tapausyhteenveto jaetaan vain suostumuksella." },
            { title: "Kouluttajat ja koirakoulut", text: "Suosituksia ja ajanvarauksia, kun perhe hankkii oikean koiran." },
            { title: "Lemmikkivakuutusyhtiöt", text: "Rodun huomioivia tarjouksia, kun oikea lemmikki rekisteröidään – selvästi merkittyinä." },
            { title: "Panta- ja IoT-valmistajat", text: "Aktiivisuustietojen integrointi älykkäämpiä ja selittäviä hälytyksiä varten." },
          ],
        },
        {
          type: "list",
          heading: "Miksi kumppanit luottavat meihin",
          items: [
            "Lapset kirjautuvat ilman sähköpostia, keräämme heistä mahdollisimman vähän tietoja ja säilytämme ne EU:n palvelimilla.",
            "Lapsen näytölle pääsee vain tarkistettua sisältöä; mainoksia ei ole.",
            "Jokainen kumppanitarjous on merkitty, ja jokainen palkkio kerrotaan perheelle.",
          ],
        },
        { type: "callout", title: "Jutellaan.", text: "Kumppanuusehtoja valmistellaan. Kerro, kuka olet ja mitä sinulla on mielessä.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Sijoita PetPrepiin – lemmikkivalmiudesta elinikäiseen lemmikinhoitoon",
        description:
          "PetPrep muuttaa lapsen lupauksen todisteeksi ennen kuin perhe hankkii lemmikin ja toimii sitten tekoälyavustajana koko sen elämän ajan. Ennen julkaisua; katsaus pyynnöstä.",
      },
      eyebrow: "Sijoittajat",
      title: "12 viikon haasteesta 10–15 vuoden asiakassuhteeseen.",
      lead:
        "PetPrep antaa vanhemmille puolueettoman todisteen siitä, onko lapsi valmis oikeaan lemmikkiin – ja pysyy sitten perheen tukena eläimen koko elämän ajan.",
      blocks: [
        {
          type: "cards",
          heading: "Mahdollisuus",
          columns: 3,
          items: [
            { title: "Ongelma", text: "Lapset lupaavat hoitaa lemmikkiä; vanhemmilla ei ole puolueetonta tapaa testata sitä ennen kuin he sitoutuvat rahaan ja vuosien hoitoon." },
            { title: "Ratkaisu", text: "Realistinen 12 viikon simulaatio, jossa on reaaliaikainen vanhemman näkymä ja puolueeton Care Score ja joka päättyy Vastuutodistukseen." },
            { title: "Laajentuminen", text: "Kun oikea lemmikki tulee kotiin, tekoälyavustaja sille: pantadata, tekoäly ensikontaktina eläinlääkäreihin, kasvu ja ravinto, DNA-testit, kumppanipalvelut." },
          ],
        },
        {
          type: "table",
          heading: "Liiketoimintamalli",
          head: ["Tulovirta", "Malli", "Tila"],
          rows: [
            ["Sekarotuinen lemmikki", "Aina maksuton (asiakashankinta)", "Päätetty"],
            ["PetPrepin 12 viikon haaste", "49,99 € lemmikkiä kohden, kertaosto", "Päätetty"],
            ["Toiveet – tavaroita lemmikille (vain ulkonäkö)", "Sovelluksen sisäiset ostot: 5,99 € / tavara, herkut 2,99 € / 10 kpl, paketti 15,99 €; myös maksuttomassa versiossa", "Rakennettu, ostot kaupoissa tulossa pian"],
            ["Kumppanitarjoukset", "Palkkiot kaupoilta, vakuutusyhtiöiltä, eläinlääkäreiltä ja kouluttajilta", "Suunnitteilla"],
            ["Tekoälyavustaja oikealle lemmikille", "Tilaus", "Suunnitteilla"],
            ["DNA-testit koirille ja kissoille", "Testien myynti ja kumppanipalkkio", "Suunnitteilla"],
          ],
        },
        {
          type: "list",
          heading: "Tähän mennessä rakennettu",
          items: [
            "Palvelinpuolen pelimoottori reaaliaikaisella synkronoinnilla, testattu kokonaisten päivien simulaatioilla, kesäaikaan siirtymisen päivillä ja perheiden erikoistapauksilla.",
            "Perheet, joissa on useita vanhempia, useita lapsia ja yhteisiä lemmikkejä, sekä reilu lapsikohtainen pisteytys.",
            "Ainutlaatuiset fotorealistiset tekoälylemmikit mitatuin ja rajatuin tekoälykuluin; media tallennetaan vuokrapalvelimille Saksaan (Hetzner, EU).",
            "Lemmikkien tarpeet perustuvat nimettyihin eläinlääkäri- ja kennelliittolähteisiin, ja jokainen luku on jäljitettävissä lähteeseensä.",
            "Sisäänrakennettu lasten turvallisuus: PIN-kirjautuminen ilman sähköpostia, minimaaliset tiedot, ei mainoksia, vain tarkistettua mediaa.",
          ],
        },
        {
          type: "prose",
          heading: "Vaihe",
          paragraphs: [
            "PetPrep on julkaisua edeltävässä vaiheessa, ja suljettu beta on suunnitteilla. Ensimmäinen markkina on Slovenia ja sen lähialue, sen jälkeen DACH-maat ja Iso-Britannia; tuote on alusta asti rakennettu maailmanlaajuista lokalisointia varten.",
            "Perustaja: David Tacer, ohjelmistokehittäjä ja yrittäjä (Data Vallis David Tacer s.p., Dravograd, Slovenia). Lisää [meistä](page:about).",
          ],
        },
        { type: "callout", title: "Pyydä sijoittajakatsaus.", text: "Jaamme katsauksen, esityksen ja datahuoneen pyynnöstä.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Ota yhteyttä PetPrepiin – perheet, tietosuoja, kumppanit, sijoittajat",
        description: "Ota yhteyttä PetPrepiin: perheiden kysymykset, tietosuojapyynnöt, kumppanuudet ja sijoittajien tiedustelut. Vastaamme englanniksi tai sloveniaksi.",
      },
      eyebrow: "Yhteystiedot",
      title: "Luemme jokaisen viestin.",
      lead: "Kirjoita oikeaan osoitteeseen, niin vastaamme mahdollisimman pian englanniksi tai sloveniaksi.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Yrityksen tiedot" }],
    },
    privacy: {
      navLabel: "Tietosuoja",
      meta: {
        title: "Tietosuojaseloste – PetPrep",
        description: "Miten PetPrep kerää, käyttää ja suojaa vanhempien ja lasten henkilötietoja ja miten voit käyttää tietosuoja-asetuksen mukaisia oikeuksiasi.",
      },
      eyebrow: "Juridiset tiedot",
      title: "Tietosuojaseloste",
      lead: "Käännös – vain englanninkielinen versio on sitova. PetPrep on tehty ensisijaisesti lapsille, joten keräämme mahdollisimman vähän tietoja ja kerromme tarkasti, mitä teemme niillä.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Rekisterinpitäjä",
              paragraphs: [
                "PetPrep-sovelluksen ja tämän verkkosivuston kautta käsiteltävien henkilötietojen rekisterinpitäjä on {company}, {address}; {companyIds}. Tietosuojakysymykset: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Mitä keräämme",
              items: [
                "Vanhemman tili: nimi (miten perheesi sinua kutsuu), sähköpostiosoite, salasana (tallennetaan vain turvallisena tiivisteenä), laitteesi aikavyöhyke sekä aika, jolloin hyväksyit käyttöehdot ja tämän selosteen.",
                "Hoitajaprofiili (lapsi tai aikuinen, joka hoitaa lemmikkiä): enintään 30 merkin lempinimi ja halutessasi syntymävuosi – aikuisella se jätetään tyhjäksi. Ei sähköpostia, salasanaa, sukunimeä eikä syntymäaikaa.",
                "Laitteet: puhelimen malli (esimerkiksi ”iPhone”, ei koskaan käyttäjän puhelimelle antamaa nimeä) sekä ilmoituksia varten push-tunniste, alusta ja sovelluksen versio.",
                "Hoitotoiminta: simulaation toiminnot (ruokinta, vesi, siivous, lenkit), päivittäiset askelmäärät (tai pyörätuolin työnnöt mukautetussa tilassa – ks. kohdat 3 ja 4), pisteet ja raportit.",
                "Vastuusopimus: lapsen sormella tekemä allekirjoitus, joka tallennetaan vektoriviivana allekirjoitusajan kanssa.",
                "Koodit: kirjautumis- ja kutsukoodit tallennetaan vain tiivisteinä, ja ne vanhenevat.",
                "Sovelluksen virheraportit: jos sovellus jumiutuu tai kaatuu, se voi lähettää lyhyen teknisen raportin EU:ssa sijaitsevalle palvelimellemme (virheen tyyppi ja teksti, kohta koodissa, sovelluksen ja käyttöjärjestelmän versio, näkymän nimi, vanhemman tai lapsen rooli). Raportissa ei ole nimeä, sähköpostiosoitetta, käyttäjätunnusta eikä IP-osoitetta, sitä ei jaeta kolmansille osapuolille, ja se poistetaan 30 päivän kuluttua.",
                "Varhaisen käyttöoikeuden lista (tämä verkkosivusto): sähköpostiosoitteesi, sivun kieli ja ilmoittautumisaika.",
              ],
            },
            {
              heading: "3. Terveys- ja kuntoilutiedot (askeleet, Apple Terveys ja Health Connect)",
              paragraphs: [
                "PetPrep kerää ja käyttää vain yhdenlaisia terveys- ja kuntoilutietoja: kuinka monta askelta hoitaja kävelee päivässä (liikunta). Käytämme niitä vain yhteen toimintoon – lemmikin päivittäiseen lenkkiin simulaatiossa: lapsi kävelee, ja hänen askeleensa lasketaan lemmikin lenkiksi.",
                "Miten saamme tiedot: lapsen puhelimen sovellus laskee askeleet. Jos sallit sen järjestelmän lupaikkunassa, sovellus lukee ne Apple Terveydestä (iPhone) tai Health Connectista (Android) – vain lukuoikeudella ja vain askeleet. Jos puhelimen liikeanturi on käytettävissä, sovellus käyttää myös sitä (Android: ”Fyysinen aktiivisuus” -lupa; iPhone: ”Liike ja kunto”); ilman Apple Terveyden tai Health Connectin lupaa askeleet laskee vain liikeanturi.",
                "Mitä keräämme: sovellus lähettää palvelimellemme vain kuluvan päivän askelmäärän, sen lähteen (Apple Terveys, Health Connect tai liikeanturi) ja lähetysajan. Tallennamme yhden päiväsumman hoitajaprofiilia kohden – emme koskaan yksittäisiä liikkeitä, reittejä, sijaintia, sykettä, unta, painoa tai muita terveystietoja. Emme koskaan kirjoita mitään Apple Terveyteen tai Health Connectiin.",
                "Miten käytämme ja jaamme tietoja: askelmääriä käytetään vain lenkin toteuttamiseen simulaatiossa ja sen näyttämiseen vanhemmalle (vanhemman näkymä ja raportit). Emme käytä niitä mainontaan, profilointiin, terveysarviointeihin tai tekoälymallien kouluttamiseen, emme myy niitä emmekä jaa niitä kolmansille osapuolille; vain palvelintarjoajamme (Hetzner, palvelimet EU:ssa) säilyttää niitä puolestamme. Health Connectista saatujen tietojen käyttömme noudattaa Health Connectin lupakäytäntöä, mukaan lukien sen rajoitettua käyttöä koskevat vaatimukset (Limited Use).",
                "Oikeusperuste ja säilytys: askelten lukeminen on vapaaehtoista ja tapahtuu vain laitteella antamallasi luvalla; käsittelemme päiväsummaa tarjotaksemme valitsemasi palvelun (sopimuksen täytäntöönpano). Askelmäärät sisältyvät perheesi tietojen vientiin, ja ne poistetaan hoitajaprofiilin tai tilisi mukana; salatuista varmuuskopioistamme ne poistuvat viimeistään 35 päivän kuluessa.",
                "Voit perua luvan milloin tahansa laitteesi asetuksista: iPhone → Asetukset → Terveys → Datan käyttö ja laitteet → PetPrep; Android → Health Connect → Sovellusten luvat → PetPrep. Liikeanturin luvan voi perua puhelimen asetuksista PetPrep-sovelluksen kohdalta. Sen jälkeen lenkki ei laske uusia askelia.",
              ],
            },
            {
              heading: "4. Mukautettu tila (pyörätuolin työnnöt)",
              paragraphs: [
                "Mukautettu tila on tarkoitettu pyörätuolia käyttäville lapsille: lenkki laskee silloin askelten sijaan pyörätuolin työntöjä. Tila tulee sovellukseen seuraavassa päivityksessä; alla kerromme, mitä tietoja käsittelemme, jos vanhempi ottaa sen käyttöön.",
                "Jos vanhempi ottaa mukautetun tilan käyttöön lapselle, tallennamme vain tiedon siitä, että tila on käytössä. Emme kysy emmekä tallenna syytä, diagnoosia tai terveydentilaa.",
                "Kun tila on käytössä, lapsen puhelimen sovellus lukee askelten sijaan vain pyörätuolin työnnöt – Apple Terveydestä (Apple Watchin tallentamina) erillisellä lukuluvalla. Androidilla sovellus ei lue työntöjä; sen sijaan vanhempi kirjaa lenkkiminuutit. Liikeanturia ei silloin käytetä. Palvelimellemme lähetetään vain kuluvan päivän työntöjen määrä; merkitsemme kyseiselle päivälle, että se lasketaan työntöinä.",
                "Vanhempi voi kirjata mukautetussa tilassa olevalle lapselle lenkkiminuutteja (vain kuluvalle päivälle). Tallennamme päivämäärän, minuuttimäärän ja sen, kuka vanhempi lenkin kirjasi.",
                "Koska tieto mukautetun tilan käytöstä voi viitata lapsen terveydentilaan, käsittelemme sitä vain nimenomaisen suostumuksesi perusteella (tietosuoja-asetuksen 9 artiklan 2 kohdan a alakohta), jonka annat vanhempana tai huoltajana lapsen puolesta (tietosuoja-asetuksen 8 artikla) kääntämällä kytkimen päälle. Voit poistaa tilan käytöstä milloin tahansa; sovellus laskee sen jälkeen taas askeleita.",
                "Nämä tiedot (kytkin, työntöinä lasketut päivät ja kirjatut lenkit) sisältyvät perheesi tietojen vientiin, ja ne poistetaan lapsen profiilin tai tilisi mukana; salatuista varmuuskopioistamme ne poistuvat viimeistään 35 päivän kuluessa, kuten kaikki muutkin tiedot.",
              ],
            },
            {
              heading: "5. Mitä emme kerää",
              items: [
                "Ei sijaintia: PetPrep ei käytä GPS:ää.",
                "Ei muita terveystietoja Apple Terveydestä tai Health Connectista päivittäisen askelmäärän tai pyörätuolin työntöjen määrän lisäksi.",
                "Ei mainontaa eikä kolmansien osapuolten mainonta- tai seurantakirjastoja (SDK) sovelluksessa.",
                "Ei käyttäjien välistä keskustelua.",
                "Ei mainosevästeitä tällä verkkosivustolla. Analytiikkaevästeet asetetaan vain, jos sallit ne (ks. Evästeet alla).",
              ],
            },
            {
              heading: "6. Miksi käsittelemme tietoja (käyttötarkoitukset ja oikeusperusteet)",
              items: [
                "Pyytämäsi palvelun tarjoaminen: tilit, simulaatio, vanhemman näkymä, raportit ja ilmoitukset (sopimuksen täytäntöönpano).",
                "Ostojen käsittely App Storen tai Google Playn kautta (sopimuksen täytäntöönpano).",
                "Päivittäinen lenkki (päivittäiset askelmäärät – terveys- ja kuntoilutiedot, ks. kohta 3): sopimuksen täytäntöönpano; lukeminen Apple Terveydestä, Health Connectista tai liikeanturista vain laitteella antamallasi luvalla.",
                "Mukautettu tila (tieto sen käytöstä, pyörätuolin työnnöt ja kirjatut lenkit): vanhemman nimenomainen suostumus, joka annetaan kääntämällä kytkin päälle (tietosuoja-asetuksen 9 artiklan 2 kohdan a alakohta ja 8 artikla – ks. kohta 4).",
                "Palvelun turvallisuuden ylläpitäminen, esimerkiksi toistuvien kirjautumisyritysten rajoittaminen (oikeutettu etu).",
                "Palvelun ylläpito ja suojaaminen sovelluksen virheraporttien avulla, jotka auttavat meitä korjaamaan jumiutumisia ja kaatumisia (oikeutettu etu).",
                "Lakisääteisten velvoitteiden täyttäminen, kuten ostojen kirjanpito (lakisääteinen velvoite).",
                "Sähköpostin lähettäminen PetPrepin julkaisusta, jos liityit varhaisen käyttöoikeuden listalle (suostumus – voit perua tilauksen jokaisessa sähköpostissa).",
                "Sen ymmärtäminen, miten kävijät käyttävät tätä verkkosivustoa, Google Analyticsin avulla, vain jos sallit analytiikkaevästeet (suostumus – voit muuttaa sitä milloin tahansa kohdassa Evästeasetukset).",
              ],
            },
            {
              heading: "7. Lapset",
              paragraphs: [
                "Vain vanhempi tai huoltaja voi luoda tilin ja lisätä lapsen. Vanhempi päättää, mitä lapsi voi tehdä, ja voi poistaa lapsen profiilin milloin tahansa. Emme koskaan kysy lapselta yhteystietoja, emme koskaan näytä mainoksia emmekä koskaan salli yhteydenpitoa vieraisiin.",
                "Tilinhaltija voi luoda hoitajaprofiilin myös itselleen tai jollekulle toiselle perheen aikuiselle – esimerkiksi testatakseen ennen ostoa tai adoptiota, sopiiko rotu hänelle. Tällaiseen profiiliin sovelletaan samoja sääntöjä ja samoja minimaalisia tietoja; jokainen lapsille suunniteltu suoja koskee myös sitä.",
              ],
            },
            {
              heading: "8. Tekoälyllä luodut kuvat ja videot",
              paragraphs: [
                "Jokaisen lemmikin kuvan ja lyhyet videot luo tekoälypalvelu pelkästään lemmikin kuvauksen perusteella (rotu, turkki, merkit ja vastaavat). Kuvauksessa ei koskaan ole nimiä tai mitään tietoja perheestäsi. Valmis media tallennetaan vuokrapalvelimille Saksaan (Hetzner, EU) ja näytetään lyhytikäisten linkkien kautta.",
              ],
            },
            {
              heading: "9. Palveluntarjoajat",
              items: [
                "Palvelinpalvelu: Hetzner Online (palvelimet EU:ssa).",
                "Tekoälykuvien ja -videoiden luonti: fal.ai (saa vain lemmikin kuvauksen).",
                "Push-ilmoitukset: Apple Push Notification service ja Firebase Cloud Messaging Expon kautta; ilmoituksen otsikkona voi olla lemmikin nimi, jos olet antanut sille nimen, mutta lapsen nimeä ilmoituksissa ei koskaan ole.",
                "Ostot: Apple App Store ja Google Play; ostojen hallinta RevenueCatin kautta, kun ostot otetaan käyttöön.",
                "Varhaisen käyttöoikeuden sähköpostit: Klaviyo (saa vain sähköpostiosoitteen ja kielen, jotka annat tällä verkkosivustolla).",
                "Verkkosivuston evästesuostumus: Kockica (tallentaa suostumusvalintasi).",
                "Verkkosivuston analytiikka: Google Analytics 4, tarjoajana Google Ireland Ltd., vain suostumuksellasi; Google Analytics 4 ei tallenna IP-osoitteita.",
                "Sivuston tagien hallinta: Google Tag Manager, tarjoajana Google Ireland Ltd.; ei itse aseta evästeitä, ja sen lataamat tagit noudattavat suostumustasi.",
                "Upotetut videot: YouTube, tarjoajana Google Ireland Ltd. (youtube-nocookie.com), latautuvat vasta, kun painat toistoa ja sallit markkinointievästeet.",
              ],
            },
            {
              heading: "10. Kuinka kauan säilytämme tietoja",
              paragraphs: [
                "Säilytämme tietojasi niin kauan kuin tilisi on olemassa. Kun poistat lapsen profiilin tai tilisi sovelluksessa, tiedot poistetaan välittömästi, eikä niitä voi palauttaa; salatuista varmuuskopioistamme ne poistuvat automaattisesti viimeistään 35 päivän kuluessa. Tietoja, jotka meidän on lain mukaan säilytettävä (esimerkiksi ostoihin liittyvät), säilytetään lain edellyttämän ajan. Sovelluksen virheraportit poistetaan automaattisesti 30 päivän kuluttua.",
              ],
            },
            {
              heading: "11. Oikeutesi",
              paragraphs: [
                "Sinulla on oikeus tarkastaa, oikaista, siirtää ja poistaa tietosi, vastustaa käsittelyä ja rajoittaa sitä sekä tehdä valitus valvontaviranomaiselle – Sloveniassa tietosuojavaltuutetulle (Informacijski pooblaščenec). Sovelluksessa voit viedä kaikki perheesi tiedot tiedostona (Control → Account → Export my data, eli Hallinta → Tili → Vie tietoni) ja poistaa lapsen profiilin tai koko tilisi. Kaikissa muissa asioissa kirjoita osoitteeseen {privacyEmail}.",
              ],
            },
            {
              heading: "12. Tietoturva",
              paragraphs: [
                "Salasanat ja koodit tallennetaan tiivisteinä, yhteydet ovat salattuja, reaaliaikaiset päivitykset toimitetaan vain perheesi jäsenille, ja tekoälymedia tarkistetaan ennen kuin se näkyy lapsen näytöllä.",
              ],
            },
            {
              heading: "13. Muutokset",
              paragraphs: ["Kerromme tärkeistä muutoksista sovelluksessa ennen kuin ne tulevat voimaan. Ylhäällä oleva päivämäärä kertoo uusimman version."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Evästeet",
          paragraphs: [
            "Välttämättömät evästeet pitävät verkkosivuston toiminnassa ja muistavat suostumusvalintasi. Kaikki muut evästeet asetetaan vain, jos sallit ne bannerissa, luokittain: toiminnalliset (lisätoiminnot), analytiikka (Google Analytics: mitä sivuja vieraillaan) ja markkinointi (joillekin sivuille upotetut YouTube-videot; emme näytä mainoksia tällä sivustolla). Google Tag Manager ei itse aseta evästeitä, ja jokainen sen lataama tagi noudattaa valintaasi. Voit muuttaa tai perua valintasi milloin tahansa.",
            "Suostumusbanneri luo alla olevan taulukon automaattisesti sen perusteella, mitä se löytää tältä sivustolta, joten siinä ovat ne evästeet, joita todella käytämme.",
          ],
          settings: "Muuta evästeasetuksia",
          fallback: "Evästeluettelo latautuu suostumusbannerin mukana. Jos et näe sitä, salli skriptit tällä sivulla tai kirjoita osoitteeseen {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Käyttöehdot",
      meta: {
        title: "Käyttöehdot – PetPrep",
        description:
          "PetPrep-sovelluksen ja -verkkosivuston käyttöehdot: tilit ja lasten profiilit, 12 viikon haaste ja todistus, ostot ja hyvitykset, tekoälysisältö, mukautettu tila, asiallinen käyttö, poistaminen ja sovellettava laki.",
      },
      eyebrow: "Juridiset tiedot",
      title: "Käyttöehdot",
      lead: "Käännös – vain englanninkielinen versio on sitova. PetPrepin käytön säännöt – kirjoitettu luettaviksi.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Palvelu",
              paragraphs: [
                "PetPrepiä tarjoaa {company}, {address}; {companyIds} – sama yritys, joka on tietosuojaselosteen mukainen rekisterinpitäjä. Nämä ehdot koskevat PetPrep-sovellusta ja petprep.si-verkkosivustoa.",
                "PetPrep on lemmikinhoitosimulaatio. Se auttaa perheitä ja yksittäisiä ihmisiä selvittämään, ovatko he valmiita hoitamaan oikeaa lemmikkiä – lapsia sekä aikuisia, jotka haluavat testata ennen ostoa tai adoptiota, sopiiko rotu heille. Se on opetuksellinen työkalu, ei eläinlääkärin tai muun asiantuntijan neuvontaa.",
              ],
            },
            {
              heading: "2. Tilit, profiilit ja lapset",
              items: [
                "Tilit luovat aikuiset: vanhemmat, huoltajat tai aikuiset, jotka käyttävät PetPrepiä itse. Rekisteröityessäsi hyväksyt nämä ehdot ja tietosuojaselosteen.",
                "Hoitajat (lapset tai aikuiset) hoitavat lemmikkiä hoitajaprofiilin kautta. Profiilin luo tilinhaltija, joka voi luoda sellaisen myös itselleen. Profiiliin tarvitaan vain lempinimi ja halutessasi syntymävuosi – lapsesta emme tarvitse muuta, joten älä syötä muita tietoja mihinkään sovelluksessa.",
                "Lapsi kirjautuu 6-numeroisella koodilla (PIN), jonka luot omassa sovelluksessasi. Koodi on lyhytikäinen ja toimii vain kerran; anna se vain sille lapselle, jolle se on tarkoitettu.",
                "Vanhempana tai huoltajana olet vastuussa siitä, miten lapsesi käyttää PetPrepiä: sopiiko se hänelle, kuinka paljon aikaa hän käyttää siihen ja onko hän turvassa lenkeillä (esimerkiksi liikenteessä). Voit pysäyttää minkä tahansa lemmikin pelin milloin tahansa.",
                "Voit kutsua perheeseen toisen vanhemman kutsukoodilla; molemmat näkevät kaikki perheen tiedot, ja molemmat voivat pysäyttää pelin.",
                "Anna oikeat tiedot ja pidä salasanasi, koodisi ja laitteesi turvassa.",
              ],
            },
            {
              heading: "3. 12 viikon haaste, Care Score ja todistus",
              items: [
                "Haaste kestää 12 viikkoa (84 ohjelmapäivää) ja alkaa ostohetkestä; jokaisella hoitajalla on oma päättymispäivänsä. Aikaa, jonka peli odottaa maksua, ei lasketa 12 viikkoon. Jos päivität maksuttoman lemmikin haasteeseen, myös silloin 12 viikkoa alkaa ostohetkestä; lemmikin ikä ei nollaudu, ja ostoa edeltävät päivät näkyvät historiassa haastetta edeltävinä päivinä merkittyinä, mutta niitä ei lasketa 12 viikkoon, Care Scoreen eikä todistukseen.",
                "Care Score (0–100) näyttää, kuinka suuren osan odotetuista rutiineista (ruokinta, vesi, siivous, lenkki, koulutushetki) hoitaja teki itse; jokainen lemmikin sairastuminen laskee sitä. Aikaa, jonka peli on pysäytettynä tai lemmikki eläinlääkärissä, ja hiljaisia tunteja ei lueta koskaan hoitajan tappioksi.",
                "12 viikon jälkeen lopullinen tulos kirjataan, eikä se muutu myöhemmin; haasteen jälkeinen hoito ei vaikuta siihen. Jos tulos on vähintään 70, voit luoda sovelluksessa Vastuutodistuksen (PDF); alle 70 pisteellä saat haasteraportin.",
                "Jos ruoka, vesi tai siisteys pysyy 0 %:ssa 24 tuntia, lemmikki ”viedään löytöeläinkotiin” (peli päättyy). Peli kyseisen lemmikin kanssa loppuu, todistusta ei tule, ja saat haasteraportin.",
                "Care Score ja todistus kertovat vain, miten hoitaja huolehti simuloidusta lemmikistä sovelluksessa. Ne eivät takaa, että lapsi tai kukaan muu on valmis oikeaan lemmikkiin, eivät ole asiantuntija-arvio eivätkä korvaa omaa harkintaasi tai eläinlääkärin, kasvattajan tai löytöeläinkodin neuvoja. Päätös oikeasta lemmikistä on aina sinun.",
                "Pelin säännöt (ateriat, lenkit ja hoito rodun ja iän mukaan) ovat yksinkertaistettuja ja perustuvat julkisiin lähteisiin. Ne eivät ole eläinlääkärin neuvoja; kysy oikean eläimen terveydestä ja hoidosta eläinlääkäriltä.",
              ],
            },
            {
              heading: "4. Maksuttomat ja maksulliset ominaisuudet, ostot ja hyvitykset",
              items: [
                "Sekarotuinen koira ja kotikissa ovat aina maksuttomia, ja niiden avulla PetPrepiä voi kokeilla; haasteesta ei ole maksutonta kokeilujaksoa. Maksuttomalla lemmikillä ei ole 12 viikon ohjelmaa eikä todistusta, vanhempi näkee viimeisten 7 päivän historian, ja lemmikillä on peruskokoelma kuvia ja videoita.",
                "PetPrepin 12 viikon haaste on kertaosto, ei tilaus (49,99 € Sloveniassa; kauppa näyttää maasi hinnan). Sovelluksen nykyisessä versiossa voit valita sen mille tahansa rodulle, myös sekarotuiselle koiralle ja kotikissalle. Yksi osto on yksi haaste yhdelle lemmikille; jokainen uusi haaste uudella lemmikillä on uusi osto. Samaa lemmikkiä hoitavat sisarukset maksavat kerran.",
                "Vanhempi voi päivittää maksuttoman sekarotuisen koiran tai kotikissan, jota joku jo hoitaa, haasteeseen samaan hintaan ja saman lemmikin kanssa. Se ei ole mahdollista pelin päätyttyä eikä sovelluksen varhaisessa versiossa luoduille sekarotuisille koirille; sovellus näyttää, milloin näin on. Haasteessa olevaa lemmikkiä (myös päivitettyä lemmikkiä ja haasteeseen valittua sekarotuista koiraa tai kotikissaa) ei voi vaihtaa takaisin ilmaisversioon; vain hyvitys palauttaa sekarotuisen koiran tai kotikissan sinne (ks. alla).",
                "Vanhempi ostaa omassa sovelluksessaan App Storen tai Google Playn kautta; lapsen sovelluksessa ei ole ostoja. Kauppa käsittelee maksun omien ehtojensa mukaisesti.",
                "Voit luoda haastelemmikin ennen ostoa. Kunnes haaste on maksettu, peli on tauolla: lemmikki odottaa turvassa, sen tarpeet eivät laske eikä mikään huonone. Kun ostat, peli jatkuu siitä, mihin se jäi.",
                "Hyvitykset hoitavat App Store ja Google Play omien sääntöjensä mukaisesti; pyydä hyvitystä siitä kaupasta, josta ostit. Jos kauppa hyvittää oston ennen kuin haaste on päättynyt, kyseisen lemmikin peli asetetaan taas tauolle. Oston jälkeen luodut kuvat ja videot säilyvät. Sekarotuinen koira tai kotikissa ei siirry tauolle, vaan palaa ilmaisversioon: haaste päättyy ilman todistusta, ilmaisversion säännöt ovat taas voimassa ja lemmikillä on taas kuvien ja videoiden perusvalikoima. Jos ostat haasteen myöhemmin uudelleen samalle lemmikille, uusi 12 viikon jakso alkaa uudesta ostosta.",
                "Pelin päätyttyä (löytöeläinkoti) osto ei avaa lemmikkiä uudelleen; uusi haaste on uusi lemmikki ja uusi osto.",
                "Toiveet (tavaroita lemmikille, kun ne ovat saatavilla): lapsi voi toivoa, mutta vain vanhempi voi ostaa, omassa sovelluksessaan. Ostettu tavara kuuluu sille lemmikille, jolle se ostettiin, ja vaikuttaa vain ulkonäköön – se ei vaikuta peliin, tulokseen tai todistukseen. Kun peli päättyy tai lemmikki poistetaan, osto katsotaan käytetyksi eikä sitä hyvitetä. Jos kauppa hyvittää oston, tavara (herkkujen kohdalla käyttämättömät herkut) poistetaan.",
                "Jos poistat lemmikin, lapsen tai tilin, kun ostettu haaste on vielä käynnissä, osto katsotaan käytetyksi: se ei siirry toiselle lemmikille, eikä poistaminen ole hyvitys. Sovellus varoittaa sinua ensin ja pyytää vahvistuksen.",
              ],
            },
            {
              heading: "5. Tekoälyllä luodut kuvat ja videot",
              items: [
                "Lemmikkien kuvat ja videot luodaan tekoälyllä pelkästään lemmikin kuvauksen perusteella (rotu, väri, turkki ja niin edelleen), ei koskaan perheesi tietojen perusteella. Ne ovat kuvituksia simuloidusta lemmikistä, eivätkä ne välttämättä vastaa täydellisesti mitään oikeaa eläintä tai rotumääritelmää.",
                "Kun näytämme niitä julkisesti, kuten tämän verkkosivuston rotukuvia, ne on merkitty tekoälyllä luoduiksi.",
                "Ulkonäkö ei välttämättä ole ainutlaatuinen: saman maksullisen rodun ja värin lemmikeillä voi olla samat kuvat ja videot, ja maksuttomat lemmikit saavat yhden rotunsa yhteisistä ulkonäöistä. Maksullinen haaste sisältää laajemman videokokoelman kuin maksuton lemmikki.",
                "Kun sopimus on allekirjoitettu tai osto tehty, kuvien ja videoiden valmistelu voi kestää muutaman minuutin; sillä välin sovellus näyttää, että lemmikki valmistautuu, ja merkitsee sen, mitä vielä valmistellaan.",
                "Sovelluksen ja tämän verkkosivuston eläinhakemiston rotutiedot on koottu viittaamistamme julkisista lähteistä, eikä eläinlääkäri ole tarkistanut niitä.",
              ],
            },
            {
              heading: "6. Askeleet, terveystiedot ja mukautettu tila",
              items: [
                "Päivittäinen lenkki laskee hoitajan oikeat askeleet. Jos sallit sen, sovellus lukee ne Apple Terveydestä tai Health Connectista vain lukuoikeudella (se ei koskaan kirjoita sinne mitään) tai puhelimen liikeanturista. Käsittelemämme tiedot kuvataan tietosuojaselosteessa (kohta 3).",
                "Mukautettu tila on tarkoitettu pyörätuolia käyttäville lapsille: lenkki laskee silloin askelten sijaan pyörätuolin työntöjä. Voit käyttää sitä, jos ominaisuus on saatavilla sovellusversiossasi. Vanhempi ottaa sen käyttöön lapsikohtaisesti; käyttöönotto on suostumuksesi, ja käytöstä poistaminen peruu sen (tietosuojaseloste, kohta 4).",
                "Mukautetussa tilassa vanhempi voi kirjata lapselle lenkkiminuutteja, vain kuluvalle päivälle. Olet vastuussa näistä merkinnöistä: kirjaa vain lenkit, jotka todella tehtiin, koska ne vaikuttavat Care Scoreen ja todistukseen.",
                "PetPrep ei käytä sijaintia eikä varoita vaaroista lenkin aikana; lenkkien turvallisuus on sinun vastuullasi.",
              ],
            },
            {
              heading: "7. Ilmoitukset",
              paragraphs: [
                "Jos sallit ne laitteella, sovellus lähettää push-ilmoituksia: muistutuksia hoitajalle, hälytyksiä vanhemmille, kun lemmikiltä puuttuu ruoka, vesi tai siisteys, sekä tietoja sairastumisesta, pelin päättymisestä ja haasteen loppumisesta. Ilmoituksen otsikkona voi olla lemmikin nimi, jos olet antanut sille nimen; lapsen nimeä ilmoituksissa ei koskaan ole, eikä niitä lähetetä hiljaisten tuntien aikana. Voit perua luvan milloin tahansa laitteen asetuksista; ilman ilmoituksia hoitajalta voi jäädä rutiineja väliin, mikä vaikuttaa peliin ja tulokseen. Vanhemmat saavat lisäksi enintään kerran maksutonta lemmikkiä kohden muistutuksen haasteesta, kun joku on hoitanut sitä vähintään 5:nä sen ensimmäisistä 7 päivästä.",
              ],
            },
            {
              heading: "8. Asiallinen käyttö",
              items: [
                "Älä yritä huijata askel- tai työntömäärää, kirjata lenkkejä, joita ei tehty, päästä muiden perheiden tietoihin, purkaa palvelua takaisinmallintamalla tai häiritä sitä.",
                "Älä anna lemmikeille loukkaavia tai sopimattomia nimiä äläkä syötä lapsesta henkilötietoja, joita sovellus ei kysy.",
                "Voimme rajoittaa tai jäädyttää tilejä, jotka rikkovat näitä sääntöjä tai vaarantavat lapsia, ja voimme poistaa sopimattoman lemmikin nimen.",
              ],
            },
            {
              heading: "9. Immateriaalioikeudet",
              paragraphs: [
                "PetPrep, sen logo, ulkoasu, ohjelmisto ja sisältö kuuluvat yritykselle {company}. Voit käyttää sovellusta sekä lemmikkisi kuvia, videoita ja todistusta perheesi henkilökohtaiseen, ei-kaupalliseen käyttöön – esimerkiksi jakaa niitä sukulaisille.",
              ],
            },
            {
              heading: "10. Vastuu",
              paragraphs: [
                "Pyrimme pitämään PetPrepin saatavilla ja tarkkana, mutta palvelu tarjotaan sellaisenaan; se on myös riippuvainen muiden palveluista (sovelluskaupat, Apple Terveys, Health Connect, push-ilmoitukset, tekoälypalvelu), joita emme hallitse. Lain sallimissa rajoissa emme vastaa välillisistä vahingoista emmekä päätöksistä ostaa tai adoptoida oikea lemmikki. Mikään näissä ehdoissa ei rajoita oikeuksia, jotka sinulla on kuluttajana pakottavan lainsäädännön nojalla.",
              ],
            },
            {
              heading: "11. Tilin poistaminen ja käytön lopettaminen",
              paragraphs: [
                "Voit poistaa lapsen profiilin tai tilisi milloin tahansa sovelluksessa. Poistaminen on välitöntä ja pysyvää; kun perheen viimeinen vanhempi poistaa tilinsä, koko perhe poistetaan. Voit ensin viedä tietosi (Control → Account → Export my data, eli Hallinta → Tili → Vie tietoni). Tietojen käsittely kuvataan tietosuojaselosteessa ja ostojen käsittely kohdassa 4.",
              ],
            },
            {
              heading: "12. Muutokset näihin ehtoihin",
              paragraphs: [
                "Päivitämme näitä ehtoja, kun sovellus tai laki muuttuu. Kerromme tärkeistä muutoksista sovelluksessa ennen kuin ne tulevat voimaan. Ylhäällä oleva päivämäärä kertoo uusimman version. Jos et hyväksy muutosta, voit poistaa tilisi milloin tahansa.",
              ],
            },
            {
              heading: "13. Sovellettava laki ja riidat",
              paragraphs: [
                "Näihin ehtoihin sovelletaan Slovenian tasavallan lakia. Kuluttajat voivat lisäksi vedota asuinmaansa pakottavaan kuluttajansuojaan ja käyttää EU:n verkkovälitteistä riidanratkaisufoorumia.",
              ],
            },
            {
              heading: "14. Yhteystiedot",
              paragraphs: [
                "Kysymykset näistä ehdoista: {termsEmail}. Palveluntarjoaja: {company}, {address}; {companyIds}. Tietosuojakysymykset: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Lasten turvallisuus",
      meta: {
        title: "Lasten turvallisuus – näin PetPrep suojaa lapsia",
        description:
          "Näin PetPrep suojaa lapsia: vanhempien luomat tilit, koodikirjautuminen ilman sähköpostia, minimaaliset tiedot, ei mainoksia eikä keskustelua, ei sijainnin seurantaa, tarkistettu media.",
      },
      eyebrow: "Luottamus",
      title: "Rakennettu lapsille ensimmäisestä koodirivistä lähtien.",
      lead: "Käännös – vain englanninkielinen versio on sitova. Lapsi on PetPrepin tärkein käyttäjä, joten turvallisuus ja yksityisyys ovat tuotteen sääntöjä, eivät asetuksia.",
      blocks: [
        {
          type: "cards",
          heading: "Periaatteemme",
          columns: 2,
          items: [
            { title: "Vanhemmat luovat jokaisen tilin", text: "Lapset eivät voi rekisteröityä itse. Vanhempi lisää lapsen ja luo kertakäyttöisen kirjautumiskoodin, joka on voimassa 15 minuuttia." },
            { title: "Lapsille ei sähköpostia eikä salasanaa", text: "Lapsi kirjautuu vanhemman koodilla. Väärä, vanhentunut ja jo käytetty koodi saavat kaikki saman vastauksen, joten kukaan ei voi arvata, mitä lapsia on olemassa." },
            { title: "Minimaaliset tiedot", text: "Lempinimi ja halutessasi syntymävuosi. Ei sukunimeä, ei syntymäaikaa, ei kuvia lapsesta." },
            { title: "Ei mainoksia, ei keskustelua, ei vieraita", text: "Mainontaa ei ole, eikä muihin käyttäjiin voi ottaa yhteyttä." },
            { title: "Ei sijainnin seurantaa", text: "Lenkit laskevat vain askeleita – Apple Terveydestä tai Health Connectista (luvallasi, vain lukuoikeudella) tai puhelimen liikeanturista. GPS:ää ei käytetä." },
            { title: "Yksityiset reaaliaikaiset päivitykset", text: "Reaaliaikaiset päivitykset tavoittavat vain lemmikkiä hoitavat lapset ja saman perheen vanhemmat." },
            { title: "Tarkistettu media", text: "Näytämme vain PetPrepille tuotettuja ja palvelimemme tarkistamia kuvia ja videoita EU:ssa sijaitsevasta tallennustilastamme." },
            { title: "Ilmoitukset ilman lapsen nimeä", text: "Ilmoituksissa ei koskaan ole lapsen nimeä, koska ne voivat näkyä lukitusnäytöllä. Otsikkona voi näkyä vain lemmikin nimi, jos olet antanut sille nimen." },
          ],
        },
        {
          type: "list",
          heading: "Päätösvalta pysyy vanhemmilla",
          items: [
            "Hiljaiset tunnit koulua ja unta varten, ilman ilmoituksia.",
            "Taukopainike, joka lukitsee lapsen näytön saman tien.",
            "Kirjaa lapsi ulos kaikilta laitteilta kerralla.",
            "Vie tai poista kaikki tiedot saman tien sovelluksessa.",
          ],
        },
        { type: "callout", title: "Ilmoita huolenaiheesta", text: "Jos jokin PetPrepissä huolestuttaa sinua, kirjoita meille, niin käsittelemme asian etusijalla.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Saavutettavuus",
      meta: {
        title: "Saavutettavuus – PetPrep jokaiselle lapselle",
        description:
          "Näin PetPrep mukautuu lapsille, joille pyyhkäisyt ovat vaikeita, jotka käyttävät VoiceOveria tai TalkBackia tai haluavat vähemmän liikettä – samoin säännöin ja pistein kaikille.",
      },
      eyebrow: "Luottamus",
      title: "Jokainen lapsi voi hoitaa lemmikkiään.",
      lead: "Joillekin lapsille pyyhkäisyt ovat vaikeita, jotkut käyttävät ruudunlukijaa tai haluavat näytölle vähemmän liikettä. PetPrep mukautuu heihin – samoin säännöin, samoin pistein ja samalla todistuksella kuin kaikilla muillakin.",
      blocks: [
        {
          type: "cards",
          heading: "Sovelluksessa",
          columns: 3,
          items: [
            { title: "Helpommat eleet", text: "Pyyhkäisyn sijaan lapsi pitää sormea painettuna tai painaa painiketta – jokaisessa pyyhkäisypelissä: harjaamisessa, höyhenhuiskassa, hiekkalaatikon vaihdossa ja pallon heittämisessä. Vanhempi ottaa sen käyttöön lapsikohtaisesti vanhemman osiossa." },
            { title: "Ruudunlukijat", text: "Kun VoiceOver tai TalkBack on käytössä, pelit vaihtuvat itsestään painettuna pitämiseen. Lemmikin otsikkoalue lukee ääneen kaiken lemmikistä, ja hoitopelien jokainen vaihe on oma painikkeensa." },
            { title: "Vähemmän liikettä", text: "Kun puhelin on asetettu vähentämään liikettä, sykkivät painikkeet ja keinuva Curio pysyvät paikallaan." },
          ],
        },
        {
          type: "cards",
          heading: "Tulossa sovelluksen seuraavassa päivityksessä",
          items: [
            { title: "Pyörätuolilenkit", text: "Mukautetussa tilassa pyörätuolin työnnöt lasketaan täsmälleen kuten askeleet – yksi työntö on yksi askel. Vanhempi voi myös kirjata päivän lenkkiminuutit, joten lapsen ei tarvitse tehdä mitään ylimääräistä. Vanhempi ottaa tilan käyttöön lapsikohtaisesti, ja käytöstä poistaminen poistaa merkinnän historiasta." },
          ],
        },
        { type: "callout", title: "Sama haaste kaikille", text: "Mukautukset muuttavat sitä, miten lapsi pelaa, eivät koskaan sitä, mikä lasketaan. Pisteet, ajoitus ja Vastuutodistus toimivat täsmälleen samoin. Emme koskaan kysy, miksi lapsi tarvitsee mukautusta.", tone: "mint" },
        { type: "callout", title: "Eikö jokin toimi lapsellesi?", text: "Kerro, mikä oli esteenä, niin selvitämme asian.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Poista tili",
      meta: {
        title: "Poista PetPrep-tilisi ja tietosi",
        description:
          "Näin poistat PetPrep-tilisi (Data Vallis) sovelluksessa tai sähköpostitse: mitkä tiedot poistetaan, mitä säilytetään ja kuinka kauan.",
      },
      eyebrow: "Luottamus",
      title: "Poista PetPrep-tilisi",
      lead: "Käännös – vain englanninkielinen versio on sitova. PetPrepin tekee Data Vallis. Voit poistaa tilisi ja perheesi tiedot milloin tahansa – sovelluksessa heti tai sähköpostitse, jos sinulla ei enää ole sovellusta.",
      blocks: [
        {
          type: "steps",
          heading: "Poista tilisi sovelluksessa (heti)",
          items: [
            { title: "Kirjaudu sisään vanhempana", text: "Avaa PetPrep, napauta ”I’m a parent” (”Olen vanhempi”) ja kirjaudu sisään." },
            { title: "Avaa tilisi", text: "Siirry kohtaan Controls → Account (Hallinta → Tili). Halutessasi napauta ensin ”Export my data” (”Vie tietoni”), niin saat itsellesi kopion." },
            { title: "Poista", text: "Napauta ”Delete account” (”Poista tili”), vahvista salasanallasi (tai Google- tai Apple-kirjautumisellasi) ja kirjoita DELETE. Napauta sitten ”Delete for good” (”Poista pysyvästi”)." },
            { title: "Valmis", text: "Poistaminen tapahtuu heti, eikä sitä voi perua. Kaikki sinun ja lastesi laitteet kirjataan ulos." },
          ],
        },
        {
          type: "prose",
          heading: "Eikö sinulla ole enää sovellusta? Pyydä poistoa sähköpostitse",
          paragraphs: [
            "Kirjoita osoitteeseen [privacy@petprep.si](mailto:privacy@petprep.si) PetPrepin vanhemman tilisi sähköpostiosoitteesta aiheella ”Delete my account” (Poista tilini). Varmistamme, että pyyntö tulee tilin omistajalta, poistamme tilin viimeistään kuukauden kuluessa (yleensä muutamassa päivässä) ja vahvistamme sen sähköpostitse.",
            "Jos haluat poistaa vain yhden lapsen profiilin, kirjaudu sisään vanhempana ja avaa lapsi kohdassa Controls → Children → Delete profile (Hallinta → Lapset → Poista profiili).",
          ],
        },
        {
          type: "table",
          heading: "Mitä poistetaan ja mitä säilytetään",
          head: ["Tiedot", "Mitä tapahtuu"],
          rows: [
            ["Vanhemman tilisi (nimi, sähköposti, salasana, linkitys Google- tai Apple-kirjautumiseen)", "Poistetaan heti"],
            ["Jos olet perheen ainoa vanhempi: lasten profiilit (lempinimi, syntymävuosi), lemmikit, tekoälykuvat ja -videot, sopimukset ja allekirjoitukset, hoitoloki, Care Score -tulokset, todistukset, askelmäärät, hiljaiset tunnit, kirjautumiskoodit", "Poistetaan heti"],
            ["Jos perheeseen jää toinen vanhempi", "Vain sinun tilisi poistetaan; perhe jää toiselle vanhemmalle"],
            ["Laitteet ja ilmoitustunnisteet", "Kirjataan ulos ja poistetaan heti"],
            ["Ostotiedot (tuote, päivämäärä, kaupan tapahtumatunnus, anonyymi ostotunnus – ei nimeä eikä sähköpostia)", "Säilytetään niin kauan kuin kirjanpito- ja verolainsäädäntö edellyttää, eikä niitä enää yhdistetä perheeseesi"],
            ["Tekoälykulujen tiedot", "Säilytetään kirjanpitoa varten ilman mitään yhteyttä sinuun, lapsiisi tai lemmikkeihisi"],
            ["Salatut varmuuskopiot", "Poistuvat automaattisesti 35 päivän kuluessa"],
          ],
          note: "Itse ostot hoitavat App Store ja Google Play; niiden tiedot säilyttävät Apple ja Google omien käytäntöjensä mukaisesti. Ostettua mutta keskeneräistä haastetta ei hyvitetä, kun poistat tilin.",
        },
        { type: "callout", title: "Kysyttävää?", text: "Kirjoita osoitteeseen privacy@petprep.si. Lisätietoja on tietosuojaselosteessamme.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "PetPrepin eläinhakemisto – lajit ja rodut lähteineen",
        description:
          "Koirat, kissat ja niiden rodut: mitä kukin tarvitsee, kenelle se sopii ja miten PetPrep simuloi sitä. Hae ja vertaile rotuja; jokaisen tiedon lähde on linkitetty.",
      },
      navLabel: "Eläimet",
      eyebrow: "Eläinhakemisto",
      title: "Tutustu eläimeen ennen kuin se tulee kotiin.",
      lead:
        "Mitä PetPrepin jokainen laji ja rotu todella tarvitsee – kennelliitoilta, kissarekistereiltä, eläinlääketieteellisiltä hyväntekeväisyysjärjestöiltä ja tutkimuksista, jokainen lähde linkitettynä. Lisäksi säännöt, joilla PetPrep sitä simuloi.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Tietoa PetPrepistä – yritys, perustaja ja lemmikkitietojen lähteet",
        description:
          "Kuka tekee PetPrepin: Data Vallis David Tacer s.p. Dravogradista Sloveniasta, perustaja David Tacer, missiomme ja se, miten eläinhakemisto hankkii ja tarkistaa tietonsa.",
      },
      navLabel: "Meistä",
      eyebrow: "Meistä",
      title: "Kuka tekee PetPrepin.",
      lead: "PetPrepin tekee pieni ohjelmistoyritys Mariborissa Sloveniassa. Tällä sivulla kerromme, keitä olemme, miksi rakennamme PetPrepiä ja miten päätämme, mitä sovellus ja eläinhakemisto sanovat eläimistä.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "Yritys",
          paragraphs: [
            "PetPrepiä tarjoaa Data Vallis David Tacer s.p., ohjelmistokehitysyritys (toiminimi), jonka kotipaikka on Dravograd Sloveniassa. Sama yritys ylläpitää tätä verkkosivustoa ja PetPrep-sovellusta ja on henkilötietojen rekisterinpitäjä (ks. [tietosuojaseloste](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "Perustaja",
          paragraphs: [
            "PetPrepin perusti David Tacer, ohjelmistokehittäjä ja yrittäjä Mariborista Sloveniasta.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Missiomme",
          paragraphs: [
            "Jokainen perhe kuulee: ”Lupaan, että pidän siitä huolta.” PetPrep muuttaa lupauksen todisteeksi: 12 viikon ajan lapsi – tai aikuinen, joka haluaa tietyn rodun – hoitaa aidonnäköistä tekoälylemmikkiä, jolla on oikean eläimen päivittäiset tarpeet, ja vanhempi näkee joka päivä, miten hoito sujuu.",
            "Epäonnistuminen simulaatiossa on myös hyvä tulos: perhe saa tietää sen ennen kuin oikea eläin kärsii ja ennen kuin se sitoutuu vuosien hoitoon ja kuluihin. Kun oikea lemmikki sitten tulee kotiin, haluamme PetPrepin pysyvän hyödyllisenä eläimen koko elämän ajan.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Näin eläinhakemisto rakennetaan",
          intro: "[Eläinhakemisto](page:animals) ja sovellus käyttävät samoja tietoja. Nämä säännöt ratkaisevat, mitä se saa sanoa:",
          items: [
            "Jokainen tieto mainitsee lähteensä ja linkittää siihen. Lähteet luokitellaan sen mukaan, kuinka paljon painoa ne ansaitsevat: A – rotumääritelmät, vertaisarvioidut tutkimukset ja eläinlääkäriyhdistysten ohjeet; B – eläinsairaaloiden, yliopistojen ja kansallisten eläinsuojelujärjestöjen neuvontasivut; C – toissijaiset yhteenvedot (tietosanakirjat, lehtiartikkelit), joita käytetään vain yhdessä A- tai B-lähteen kanssa.",
            "Faktoina näytetään vain lähteillä tuettuja tietoja. Arvoa, jota mikään lähde ei tue, ei julkaista. Kun lähteet ovat eri mieltä, kukin näytetään omalla arvollaan.",
            "Pelin säännöt eivät ole eläinlääkärin neuvoja. Kun peli tarvitsee luvun, jota lähteet eivät anna tarkasti (esimerkiksi päivittäinen askeltavoite), PetPrep päättää sen lähteiden pohjalta ja näyttää sen vain kohdassa ”Näin PetPrep simuloi sitä” pelisäännöksi merkittynä.",
            "Terveystiedot ovat vain tiedoksi. Ne tiivistävät, mitä lähteet sanovat rodusta, eikä eläinlääkäri ole tarkistanut niitä. Kysy oikeasta eläimestä eläinlääkäriltä.",
            "Rotumääritelmät tiivistetään omin sanoin, niitä ei koskaan kopioida laajasti, eikä mitään rotua koskaan kutsuta ”allergiaystävälliseksi”.",
            "Hakemisto luodaan PetPrepin tutkimusaineistosta, samoista tiedoista, joita sovellus käyttää. Kun lähde tai arvo muuttuu, hakemisto viedään uudelleen, ja jokaisella rotusivulla näkyy sen viimeisimmän päivityksen päivämäärä. Jos huomaat virheen, kirjoita osoitteeseen hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Kysyttävää PetPrepistä?", text: "Kirjoita oikeaan osoitteeseen yhteystietosivulla – perheet, tietosuoja, kumppanit tai sijoittajat.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Tutustu Curioon – PetPrepin maskottiin",
        description:
          "Curio on PetPrepin maskotti: logostamme tuttu utelias pieni kuutio ja lyhytvideoidemme tähti. Kuka se on, miten se eroaa sovelluksen aidonnäköisestä lemmikistä, kuvia ja mediapaketti.",
      },
      navLabel: "Tutustu Curioon",
      eyebrow: "Maskottimme",
      title: "Tutustu Curioon.",
      lead: "Curio on PetPrep-logon utelias pieni kuutio, joka on herätetty henkiin. Se esiintyy lyhytvideoissamme lemmikkinä, joka odottaa ovella, että joku pitäisi lupauksensa. Se on maskottimme – ei lemmikki, jota hoidat sovelluksessa.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPrepin maskotti: pehmeä grafiitinharmaa kuutio, jolla on isot valkoiset silmät, pieni vadelmanpunainen nenä ja mintunvihreä panta, vilkuttaa.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Kuka Curio on?",
          paragraphs: [
            "Curio sai alkunsa logomme tunnuksesta: pyöristetystä grafiitinharmaasta neliöstä, jonka kaksi isoa silmää katsovat ylös oikealle, ja pienestä vadelmanpunaisesta nenästä. Sloveniaksi kutsumme sitä nimellä Radovednež – ”utelias”. Lokakuussa 2026 se sai lyhyet kädet, tanakat jalat ja mintunvihreän pannan, jossa on pyöreä merkki, ja siitä tuli hahmo.",
            "Curiolla ei ole suuta. Kaikki, mitä se tuntee, näkyy sen silmistä: ne ovat apposen auki, kun joku kuiskaa ”lenkille?”, kaksi unista viivaa, kun kukaan ei ole vielä tullut kotiin, ja iloiset kaaret, kun kuppi on täynnä.",
            "Curio on ”se” – ei poika eikä tyttö, ei koira eikä kissa. Se edustaa jokaista lemmikkiä, joka odottaa joka päivä, että joku pitäisi lupauksensa.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio lyhyesti",
          columns: 3,
          items: [
            { title: "Nimi", text: "Englanniksi Curio, sloveniaksi Radovednež." },
            { title: "Tehty", text: "Pehmeästä grafiitista, mintunvihreästä pannasta ja vadelmanpunaisesta merkistä – PetPrepin väreistä." },
            { title: "Puhuu", text: "Ei koskaan. Vain silmillään." },
            { title: "Rakastaa", text: "Lenkkejä, täyttä kuppia ja lapsia, jotka palaavat vielä 15. päivänäkin." },
            { title: "Asuu", text: "Lyhytvideoissamme [TikTokissa](https://www.tiktok.com/@petprep.si) ja [Instagramissa](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Tehtävä", text: "Muistuttaa perheitä pilke silmäkulmassa, että lemmikki tarvitsee hoitoa joka ikinen päivä." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio ei ole sovelluksen lemmikki",
          intro: "Videoissamme Curio esittää lemmikkiä, joka tarvitsee hoitoa, koska jokainen lemmikki tarvitsee sitä. PetPrepissä lapset – ja rotua testaavat aikuiset – hoitavat jotakin, joka on paljon lähempänä oikeaa.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, piirroshahmomaskotti, vilkuttaa vaalealla taustalla.",
              label: "Maskotti",
              title: "Curio – maskottimme",
              text: "Piirroshahmo videoihimme, tarroihimme ja tälle sivulle. Se kertoo, mistä PetPrepissä on kyse. Sitä ei voi adoptoida.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Aidonnäköinen tekoälyllä luotu muotokuva labradorinnoutajasta – tältä lemmikit näyttävät PetPrep-sovelluksessa.",
              label: "Sovelluksessa · tekoälykuva",
              tone: "mint",
              title: "Lemmikkisi PetPrepissä",
              text: "Aidonnäköinen tekoälysimulaatio oikeasta rodusta – kuten tämä [labradorinnoutaja](+breed:labrador_retriever) – oikean eläimen päivittäisine tarpeineen: ateriat, vesi, oikeina askelina lasketut lenkit, siivous ja koulutus. Katso, [miten se toimii](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio kuvina",
          intro: "Curio on tyylitelty 3D-hahmo, joka on tehty tekoälytyökaluilla omasta suunnittelustamme. Uudet kohtaukset nähdään ensin videoissamme.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio vilkuttaa mintunvihreällä taustalla.", caption: "Hei! Klassinen vilkutus.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio seisoo valkoisella hyllyllä ja vilkuttaa.", caption: "Hyllyllä odottamassa jotakuta." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio edestä, sivulta ja takaa sekä neljä silmien ilmettä.", caption: "Joka puolelta – ja miten sen silmät näyttävät tunteet." },
            { src: "/curio/curio-waving.webp", alt: "Curio läpinäkyvällä taustalla.", caption: "Rajattu ja valmis käytettäväksi (ks. mediapaketti).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Mediapaketti",
          intro: "Sisällöntuottajille, toimittajille ja kumppaneille, jotka kirjoittavat PetPrepistä. Kysymykset ja yhteistyöideat: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Lataa kaikki", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, läpinäkyvä tausta", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, neliö, vaalea", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, neliö, mintunvihreä", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Hahmokortti", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "PetPrep-logo", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "PetPrep-tunnus", meta: "SVG" },
          ],
          rulesHeading: "Curion käyttö",
          rules: [
            "Käytä Curiota PetPrepiä käsittelevissä julkaisuissa, artikkeleissa ja videoissa. Mainoksiin, tuotteisiin tai oheistuotteisiin kysy meiltä ensin lupa.",
            "Näytä Curio sellaisena kuin se on: grafiitinharmaa kuutio, valkoiset silmät, vadelmanpunainen nenä, mintunvihreä panta. Älä lisää suuta, korvia, turkkia tai kulmakarvoja, äläkä muuta sen värejä tai venytä sitä.",
            "Curio on PetPrepin maskotti. Älä esitä sitä sovelluksen lemmikkinä tai oikeana koirana tai kissana.",
            "Älä käytä Curiota tavalla, joka antaa ymmärtää PetPrepin tukevan jotakin toista tuotetta, asiaa tai henkilöä.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Kysymyksiä Curiosta",
          items: [
            { q: "Onko Curio koira vai kissa?", a: "Ei kumpikaan. Curio on logomme pieni kuutio. Se esittää videoissamme lemmikkiä, mutta se ei kuulu mihinkään lajiin." },
            { q: "Voiko lapseni hoitaa Curiota sovelluksessa?", a: "Ei voi. Sovelluksessa perheesi hoitaa oikean rodun aidonnäköistä lemmikkiä, jolla on samat päivittäiset tarpeet kuin oikealla eläimellä. Curio esiintyy vain videoissamme ja verkkosivustolla." },
            { q: "Miksi Curiolla ei ole suuta?", a: "Koska logossammekaan ei ole. Curio sanoo kaiken silmillään – eikä se koskaan kerjää herkkuja ääneen." },
            { q: "Mistä näen uusia Curio-videoita?", a: "TikTokista ja Instagramista, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Lemmikin hoito – mitä koira ja kissa saavat syödä, lähteineen | PetPrep",
        description:
          "Mitkä ruoat ovat koirille ja kissoille myrkyllisiä, riskialttiita tai turvallisia – syy, oireet ja mitä tehdä, jokainen lähde linkitettynä. PetPrepiltä perheille, jotka valmistautuvat lemmikkiin.",
      },
      navLabel: "Hoito",
      eyebrow: "Hoitotietoa",
      title: "Mikä on turvallista lemmikillesi?",
      lead:
        "Selkeitä, lähteillä tuettuja vastauksia perheille: mitkä ruoat ovat myrkyllisiä, mitkä riskialttiita ja mitkä sopivat herkuksi – koirille ja kissoille, ja lisää lajeja on tulossa. Jokaisessa vastauksessa on linkit lähteisiin.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Ilmaiset tulostettavat koira- ja kissavärityskuvat lapsille | PetPrep",
        description:
          "Ilmaisia värityskuvia tulostettavaksi: kultainennoutaja, labradorinnoutaja, bordercollie, sekarotuinen koiranpentu, kissanpentu ja Curio. PDF-tiedostot A4- ja US Letter -koossa, jokaisessa oikea tieto lemmikin hoidosta lähteineen.",
      },
      navLabel: "Värityskuvat",
      eyebrow: "Värityskuvat",
      title: "Ilmaisia värityskuvia tulostettavaksi.",
      lead:
        "Koiria, kissoja ja Curio väritettäväksi tai piirrettäväksi mallista – tulosta yksi sivu tai koko kirja. Jokaisella sivulla on eläinlääkäri- tai kennelliittolähteestä peräisin oleva oikea tieto lemmikin hoidosta, jonka voitte lukea yhdessä.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Lapsille, jotka haluavat lemmikin – värityskuvat, Curio ja #walkyourpet | PetPrep",
        description:
          "Kaikki, mitä PetPrepillä on lapsille: ilmaiset tulostettavat värityskuvat oikeine hoitotietoineen, maskotti Curio ja #walkyourpet – lapsille ja vanhemmille, jotka valmistautuvat lemmikkiin yhdessä.",
      },
      navLabel: "Lapsille",
      eyebrow: "Lapsille",
      title: "Lapsille, jotka haluavat lemmikin.",
      lead: "Tulostettavia värityskuvia, Curio ja #walkyourpet – lapsille ja vanhemmille, jotka valmistautuvat lemmikkiin yhdessä.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, PetPrepin maskotti: pehmeä grafiitinharmaa kuutio, jolla on isot valkoiset silmät, pieni vadelmanpunainen nenä ja mintunvihreä panta, vilkuttaa.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – liike, joka alkoi oikean lapsen sanoista",
        description:
          "”Voitaisiin mennä walk your pet.” Lapsi sanoi sen, ja nyt siitä on tullut liike: perheet lähtevät ulos, koska lemmikki tarvitsee lenkin. Miten se alkoi, mitä se tarkoittaa PetPrepissä ja miten voit liittyä mukaan.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet – vie lemmikkisi lenkille.",
      lead: "Emme keksineet tätä lausetta. Lapsi keksi. Nyt se on kutsu jokaiselle perheelle: lähde ulos, koska lemmikki tarvitsee lenkkinsä – oikea lemmikki tai se, jonka kanssa harjoittelet PetPrepissä.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Tarinakortti: ”Overheard at the founder’s house.” (”Kuultua perustajan kotona.”) Lapsi sanoo ”Lahko bi šli walk your pet” – ”Voitaisiin mennä walk your pet” – ja otsikossa lukee ”#walkyourpet is a thing now.” (”#walkyourpet on nyt juttu.”)", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Miten se alkoi",
          paragraphs: [
            "Lokakuussa 2026 perustajamme lapsilla oli ystävä kylässä. He miettivät, lähtisivätkö ulos, ja hän sanoi puoliksi sloveniaksi ja puoliksi englanniksi: ”Lahko bi šli walk your pet” – ”Voitaisiin mennä walk your pet.”",
            "Kukaan ei pyytänyt häntä sanomaan niin. Hän tunsi PetPrepin, jossa koiran lenkki lasketaan vain, jos todella lähtee ulos, ja ”walk your pet” oli yksinkertaisesti muuttunut syyksi lähteä. Pidimme siitä niin paljon, että otimme sen käyttöön – englanniksi, kaikilla kielillä.",
            "Oikea keskustelu. Oikeat lapset.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Mitä se tarkoittaa PetPrepissä",
          intro: "PetPrepissä koiran päivittäinen lenkki on lapsesi oikeat askeleet, jotka luetaan Apple Terveydestä tai Health Connectista, jos sallit sen. Sohvalla istumista ei lasketa, joten ”walk your pet” tarkoittaa aina ulos lähtemistä. Ei GPS:ää eikä sijaintia – vain askeleet.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Liity mukaan liikkeeseen",
          intro: "Tähän et tarvitse sovellusta. Jokainen perhe, joka lähtee ulos lemmikin takia – oikean tai harjoituslemmikin – on mukana.",
          items: [
            { title: "Lähde ulos", text: "Vie koira lenkille. Tai jos vielä mietit lemmikin hankkimista, lähde sille lenkille, jonka tekisit sen kanssa." },
            { title: "Tallenna hetki", text: "Kengät oven vieressä, hihna, polku, tassut nurmikolla. Ei kasvoja, ei nimiä." },
            { title: "Jaa se", text: "Julkaise se tunnisteella #walkyourpet ja merkitse @petprep.si Instagramissa tai TikTokissa. Luvallasi voimme jakaa parhaita hetkiä täällä ja profiileissamme." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Jaa turvallisesti",
          intro: "#walkyourpet koskee lapsia, joten nämä säännöt pätevät kaikkeen, mitä jaamme:",
          items: [
            "Vanhemmat julkaisevat, eivät lapset. Vain vanhempi päättää, mitä verkkoon laitetaan.",
            "Ei lasten kasvoja, nimiä, kouluja tai osoitteita – eikä koskaan toisen perheen lasta.",
            "Jaamme julkaisuja uudelleen vain vanhemman luvalla, ja poistamme julkaisun aina, kun pyydät.",
            "Lasten lainaukset ovat aina aitoja. Emme koskaan keksi tai ”paranna” sitä, mitä lapsi sanoi.",
            "Se on kutsu, ei velvollisuus. Ei päiväputkia ylläpidettäväksi, ei painetta – vain hyvä syy lähteä ulos.",
          ],
        },
        {
          type: "callout",
          title: "Ensimmäinen hetki on meidän. Seuraava voi olla sinun.",
          text: "Jaa perheesi lenkki tunnisteella #walkyourpet ja merkitse @petprep.si. Kysymykset tai tarina, jonka haluaisit kertoa: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Kysymyksiä",
          items: [
            { q: "Tarvitsenko PetPrepin, jotta voin osallistua?", a: "Et. Kuka tahansa, joka lähtee ulos lemmikin takia, voi käyttää tunnistetta #walkyourpet. PetPrep on paikka, jossa lause syntyi ja jossa harjoituskoiran lenkki lasketaan vain oikeina askelina." },
            { q: "Toimiiko se kissoilla PetPrepissä?", a: "Ei lenkkinä. Kissat eivät käy lenkeillä, joten PetPrepissä kissan tarpeisiin vastataan leikillä, ei askelilla. Lenkit ovat koirille." },
            { q: "Miksi lause on englanniksi?", a: "Koska lapsi sanoi sen niin – englanniksi keskellä slovenialaista lausetta. Lapset kaikkialla sekoittavat englantia puheeseensa, joten lause pysyy samana kaikilla kielillä." },
            { q: "Julkaisetteko kuvia lapsestani?", a: "Vain sitä, minkä jaat itse ja annat meidän jakaa uudelleen, eikä koskaan lapsen kasvoja tai nimeä. Pyydä osoitteessa hello@petprep.si, niin poistamme sen." },
          ],
        },
      ],
    },
  },
};

export default fi;
