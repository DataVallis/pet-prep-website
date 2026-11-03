import type { InvestorsCopy } from "./types";

const fi: InvestorsCopy = {
  meta: {
    title: "PetPrep sijoittajille: yksi perustaja ja sisältömoottori 15 vuoden tuotteelle",
    description:
      "PetPrepissä lapsi osoittaa 12 viikon realistisessa simulaatiossa olevansa valmis lemmikkiin, ja sovellus pysyy perheen mukana koko lemmikin elämän ajan. Luvut reaaliajassa, tulokartta ja ohjeet sijoittajayhteenvedon pyytämiseen.",
  },
  eyebrow: "Sijoittajille",
  title: "Yksi perustaja ja sisältömoottori tuotteelle, jota perheet käyttävät 15 vuotta.",
  seriesTitle: "”12 Weeks”",
  lead: "PetPrepissä lapsi osoittaa 12 viikon realistisessa simulaatiossa olevansa valmis lemmikkiin – ja sovellus pysyy perheen mukana koko lemmikin elämän ajan. Kaikki sen ympärillä, sarjastamme hoitokirjastoon, jossa jokaisella tiedolla on lähde, on olemassa, jotta perheet löytävät meidät lähes ilman kuluja.",
  watch: "Katso ”12 Weeks” YouTubessa",
  brief: "Pyydä sijoittajayhteenveto",
  heroStats: {
    breeds: "koira- ja kissarotua, joiden hoito-ohjeet perustuvat lähteisiin",
    sources: "eläinlääkäreiden ja kennelliittojen lähdettä",
    episodes: "jaksoa perhekomediastamme ”12 Weeks”",
  },
  opportunity: {
    eyebrow: "Mahdollisuus",
    title: "12 viikon haasteesta 10–15 vuoden suhteeseen.",
    items: [
      { tag: "Ongelma", text: "Lapset lupaavat hoitaa lemmikkiä, mutta vanhemmilla ei ole puolueetonta tapaa kokeilla sitä ennen kuin sitoutuvat rahaan ja vuosien hoitoon." },
      { tag: "Ratkaisu", text: "Realistinen 12 viikon simulaatio, jossa on vanhempien reaaliaikainen näkymä ja objektiivinen Care Score ja jonka päätteeksi lapsi saa Vastuutodistuksen." },
      { tag: "Laajennus", text: "Kun oikea lemmikki muuttaa kotiin, PetPrepistä tulee sen tekoälyavustaja: pantadata, tekoälyn avulla tehty ensimmäinen yhteys eläinlääkäriin, kasvu ja ruokinta, DNA-testit ja kumppanipalvelut." },
    ],
  },
  flywheel: {
    eyebrow: "Vauhtipyörä",
    title: "Sisältö tuo perheet. Oikeat lemmikit pitävät ne mukana vuosia.",
    lead: "Jokainen sisältö on askel samassa kierrossa, ei sivuprojekti.",
    steps: [
      { title: "Sisältömoottori", text: "Sarja, Curio, värityskuvat ja hoitokirjasto, joita tekee yksi perustaja tekoälyagenttien kanssa." },
      { title: "Perheet löytävät PetPrepin", text: "Haun, sosiaalisen median ja #walkyourpet-liikkeen kautta maksetun mainonnan sijaan." },
      { title: "12 viikon haaste", text: "Ensimmäinen tulo: 49,99 € lemmikkiä kohden, kertamaksu.", highlight: true },
      { title: "Oikea lemmikki muuttaa kotiin", text: "PetPrepistä tulee perheen tekoälyavustaja lemmikin hoitoon 10–15 vuodeksi." },
      { title: "Kumppanit pitkäksi aikaa", text: "Vakuutukset, eläinlääkärit, ruoka ja DNA-testit: perheen lemmikille sopivia tarjouksia, jotka vanhemmat itse päättävät katsoa." },
      { title: "Tulot rahoittavat lisää sisältöä", text: "Sponsorit ja toisen vaiheen tulot maksavat seuraavan kauden, ja kierto jatkuu." },
    ],
  },
  engine: {
    eyebrow: "Sisältömoottori · luvut reaaliajassa",
    title: "Mitä olemme tähän mennessä rakentaneet",
    lead: "Jokainen alla oleva luku päivittyy itse rekisteristämme, tietopankistamme ja kanavistamme.",
    updated: "Päivittyy automaattisesti rekisteristämme, tietopankistamme ja kanavistamme.",
    cards: {
      breeds: { label: "Rotua rekisterissä", note: (dogs, cats) => `${dogs} koirarotua ja ${cats} kissarotua, uusia lisätään joka yö` },
      sources: { label: "Lähdettä", note: "Eläinlääkärit, kennelliitot ja tutkimukset, sitaatteineen" },
      episodes: { label: "Jaksoa ”12 Weeks” -sarjasta", note: (views) => (views ? `${views} katselukertaa YouTubessa` : "YouTubessa") },
      coloring: { label: "Ilmaista värityskuvaa", note: "Tulostettavia, A4 ja US Letter" },
      curio: { value: "Pilotti", label: "Curio-animaatiosarja", note: "Pilottijakso on katsottavissa YouTubessa ja TikTokissa" },
      foods: { label: "Selitettyä ruoka-ainetta", note: "Hoitokirjasto, uusia ruoka-aineita joka yö" },
      languages: { label: "Kieltä", note: "Sivusto ja hoitokirjasto" },
      vets: { label: "Maata, joilla on eläinlääkärihakemisto", note: "Päivystävät eläinlääkärit maittain" },
    },
    status: { live: "Käytössä", building: "Rakenteilla", planned: "Suunniteltu" },
    media: {
      playlist: "”12 Weeks” – sarja",
      channel: "YouTube-kanava @petprep-si →",
      play: "Toista",
      all: "Kaikki jaksot (soittolista)",
      episode: (n) => `Jakso ${n}`,
      consent: "Toistetaan YouTubesta (youtube-nocookie.com) – mitään ei ladata, ennen kuin napsautat.",
      more: "Lisää katsottavaa",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Hiljaisen perhekomediamme pilotti" },
      curioAll: "Curio – kaikki jaksot",
      promo: { title: "PetPrep 60 sekunnissa", text: "Onko lapsesi valmis oikeaan lemmikkiin?" },
      curio: { title: "Tutustu Curioon", text: "Maskottimme ja sen lyhyet videot" },
      coloring: { title: "Värityskuvat", text: "Ilmaisia tulostettavia, jokaisessa lähteellä varustettu tieto lemmikin hoidosta" },
      walkthrough: { title: "Näin sovellus toimii", text: "12 viikon haaste vaihe vaiheelta" },
    },
    closing: "Tämän kaiken tekee yksi perustaja tekoälyagenttien kanssa, ilman tuotantotiimiä tai toimistoa. Jokainen sisältö johtaa takaisin sovellukseen.",
  },
  built: {
    eyebrow: "Mitä on jo rakennettu",
    title: "Oikea tuote, ei prototyyppi",
    items: [
      "Palvelimella toimiva pelimoottori reaaliaikaisella synkronoinnilla, testattuna kokonaisten vuorokausien simulaatioilla, kellonsiirtopäivillä ja perheiden poikkeustilanteilla.",
      "Perheet, joissa on useita vanhempia, useita lapsia ja yhteisiä lemmikkejä ja joissa jokaista lasta arvioidaan reilusti erikseen.",
      "Valokuvamaiset tekoälylemmikit, joiden tekoälykulut mitataan ja rajataan, ja media vuokratuilla palvelimilla Saksassa (Hetzner, EU).",
      "Lemmikkien tarpeet perustuvat siteerattuihin eläinlääkäreiden ja kennelliittojen lähteisiin, ja jokainen luku voidaan jäljittää lähteeseensä.",
      "Lasten turvallisuus suunnittelusta lähtien: kirjautuminen PIN-koodilla ilman sähköpostia, mahdollisimman vähän tietoja, ei mainoksia ja vain tarkistettua mediaa.",
      "Esteetön pelaaminen: helpommat eleet, ruudunlukijat ja pyörätuolin työntäminen lasketaan kävelyksi.",
    ],
  },
  revenue: {
    eyebrow: "Tulokartta",
    title: "Ensimmäinen vaihe maksaa perheiden hankinnan. Toinen vaihe on liiketoiminta.",
    phases: [
      {
        tag: "Vaihe 1 · Ennen lemmikkiä",
        name: "Maksaa perheiden hankinnan",
        items: [
          { name: "12 viikon haaste", price: "49,99 € lemmikkiä kohden, kertamaksu", status: "live", label: "Valmis" },
          { name: "Toiveet (tavaroita lemmikille)", price: "2,99–15,99 €, vain ulkonäköä", status: "live", label: "Valmis" },
          { name: "Sarjan sponsorointi", price: "Kausipaketit", status: "building", label: "Työn alla" },
          { name: "Kauppa: värityskirjat, Curio-pehmo, palapelit", price: "Fyysisiä ja digitaalisia", status: "planned", label: "Suunniteltu" },
        ],
      },
      {
        tag: "Vaihe 2 · Oikean lemmikin kanssa",
        name: "Liiketoiminta",
        items: [
          { name: "Tekoälyavustaja lemmikin hoitoon", price: "Tilaus alkaen 3,99 € kuukaudessa + lisäosto", status: "planned", label: "Suunniteltu" },
          { name: "Lemmikkivakuutuskumppanit", price: "Tarjouksia, jotka vanhemmat itse päättävät katsoa, palkkio jokaisesta ohjauksesta", status: "planned", label: "Suunniteltu" },
          { name: "Eläinlääkärikumppaneiden verkosto", price: "Ajanvaraukset ja etävastaanotot", status: "planned", label: "Suunniteltu" },
          { name: "DNA-testit ja lemmikkikauppakumppanit", price: "Kumppanuusmyynti, myöhemmin oma testipakkaus", status: "planned", label: "Suunniteltu" },
        ],
      },
      {
        tag: "Brändi",
        name: "Curio ja sarja",
        items: [
          { name: "Curio-animaatiosarja", price: "Kausisponsorit", status: "live", label: "Pilotti julkaistu" },
          { name: "#walkyourpet", price: "Liike, joka ruokkii kaikkia kanavia", status: "live", label: "Käytössä" },
        ],
      },
    ],
    retention: "Perhe, joka hankkii eläimen haasteen jälkeen, pysyy PetPrepin mukana eläimen 10–15 vuotta, ei vain 12 viikkoa.",
    stageTag: "Vaihe",
    stage: "Ennen julkaisua, suljetussa betassa iOS:llä ja Androidilla. Julkaisu App Storessa ja Google Playssa seuraa.",
  },
  team: {
    eyebrow: "Tiimi",
    title: "Studion tulokset. Yhden ihmisen kustannukset.",
    founderName: "David Tacer, perustaja ja toimitusjohtaja.",
    founder: "Johtanut omaa ohjelmistoyritystään 12 vuotta (yli 400 projektia), CHERR.IO:n perustaja (FutureHack-voittaja, Davos 2018). Rakentaa PetPrepiä kokopäiväisesti ohjelmointiin ja sisältöön erikoistuneiden tekoälyagenttien tiimin kanssa.",
    points: [
      "Jokaisella tiedolla on lähde ja sitaatti, jotka riippumaton tarkastaja tarkistaa.",
      "Perheiden tiedot pysyvät EU:ssa, lapset kirjautuvat ilman sähköpostia eikä sovelluksessa ole mainoksia.",
      "Yölliset prosessit tutkivat, tarkistavat ja julkaisevat uusia rotuja ja hoitosivuja.",
    ],
  },
  webSummit: {
    title: "Tapaamme Web Summitissa Lissabonissa",
    text: "9.–12. marraskuuta 2026. Jaamme yhteenvedon, esityksen, data roomin ja betapääsyn pyynnöstä.",
    watch: "Katso sarja",
  },
  contactTitle: "Ota yhteyttä",
};

export default fi;
