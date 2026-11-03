import type { InvestorsCopy } from "./types";

const es: InvestorsCopy = {
  meta: {
    title: "PetPrep para inversores: un fundador y un motor de contenido para un producto a 15 años",
    description:
      "Con PetPrep, un niño demuestra en 12 semanas de simulación realista que está preparado para tener una mascota, y la app acompaña a la familia durante toda la vida del animal. Cifras en directo, mapa de ingresos y cómo pedir el dosier para inversores.",
  },
  eyebrow: "Para inversores",
  title: "Un fundador y un motor de contenido para un producto que las familias conservan 15 años.",
  seriesTitle: "«12 Weeks»",
  lead: "Con PetPrep, un niño demuestra en 12 semanas de simulación realista que está preparado para tener una mascota, y la app acompaña a la familia durante toda la vida del animal. Todo lo que la rodea, desde nuestra serie hasta una biblioteca de cuidados donde cada dato tiene su fuente, existe para atraer a las familias a un coste casi nulo.",
  watch: "Ver «12 Weeks» en YouTube",
  brief: "Pedir el dosier para inversores",
  heroStats: {
    breeds: "razas de perros y gatos con normas de cuidado respaldadas por fuentes",
    sources: "fuentes veterinarias y de clubes caninos y felinos",
    episodes: "episodios de nuestra comedia familiar «12 Weeks»",
  },
  opportunity: {
    eyebrow: "La oportunidad",
    title: "De un reto de 12 semanas a una relación de 10 a 15 años.",
    items: [
      { tag: "Problema", text: "Los niños prometen cuidar de una mascota; los padres no tienen una forma neutral de comprobarlo antes de comprometer dinero y años de cuidados." },
      { tag: "Solución", text: "Una simulación realista de 12 semanas con un panel para padres en directo y un Care Score objetivo, que termina con un Certificado de responsabilidad." },
      { tag: "Ampliación", text: "Cuando la mascota real llega a casa, PetPrep se convierte en su asistente de IA: datos del collar, primer contacto con el veterinario mediante IA, crecimiento y nutrición, pruebas de ADN y servicios de socios." },
    ],
  },
  flywheel: {
    eyebrow: "El círculo virtuoso",
    title: "El contenido trae a las familias. Las mascotas reales las retienen durante años.",
    lead: "Cada pieza de contenido es un paso del mismo ciclo, no un proyecto paralelo.",
    steps: [
      { title: "Motor de contenido", text: "Serie, Curio, dibujos para colorear y biblioteca de cuidados, creados por un solo fundador con agentes de IA." },
      { title: "Las familias encuentran PetPrep", text: "A través de buscadores, redes sociales y #walkyourpet, en lugar de publicidad de pago." },
      { title: "Reto de 12 semanas", text: "Primeros ingresos: 49,99 € por mascota, pago único.", highlight: true },
      { title: "Llega una mascota real", text: "PetPrep pasa a ser el asistente de IA de la familia para cuidar de la mascota durante 10 a 15 años." },
      { title: "Socios para toda la vida", text: "Seguros, veterinarios, alimentación y pruebas de ADN: ofertas adaptadas a la mascota de la familia que los padres deciden ver." },
      { title: "Los ingresos financian más contenido", text: "Los patrocinadores y los ingresos de la fase 2 pagan la siguiente temporada, y el ciclo vuelve a empezar." },
    ],
  },
  engine: {
    eyebrow: "Motor de contenido · cifras en directo",
    title: "Lo que hemos logrado hasta ahora",
    lead: "Cada cifra de abajo se actualiza sola a partir de nuestro registro, nuestra base de conocimiento y nuestros canales.",
    updated: "Actualizado automáticamente a partir de nuestro registro, nuestra base de conocimiento y nuestros canales.",
    cards: {
      breeds: { label: "Razas en el registro", note: (dogs, cats) => `${dogs} razas de perros y ${cats} de gatos, y cada noche se añaden nuevas` },
      sources: { label: "Fuentes", note: "Veterinarios, clubes de raza y estudios, con citas" },
      episodes: { label: "Episodios de «12 Weeks»", note: (views) => (views ? `${views} visualizaciones en YouTube` : "En YouTube") },
      coloring: { label: "Dibujos para colorear gratis", note: "Para imprimir, en A4 y US Letter" },
      curio: { value: "Piloto", label: "Serie de animación Curio", note: "Episodio piloto disponible en YouTube y TikTok" },
      foods: { label: "Alimentos explicados", note: "Biblioteca de cuidados, alimentos nuevos cada noche" },
      languages: { label: "Idiomas", note: "Web y biblioteca de cuidados" },
      vets: { label: "Países con directorio de veterinarios", note: "Veterinarios de urgencias por país" },
    },
    status: { live: "En marcha", building: "En construcción", planned: "Previsto" },
    media: {
      playlist: "«12 Weeks»: la serie",
      channel: "Canal de YouTube @petprep-si →",
      play: "Reproducir",
      all: "Todos los episodios (lista de reproducción)",
      episode: (n) => `Episodio ${n}`,
      consent: "Se reproduce desde YouTube (youtube-nocookie.com): no se carga nada hasta que pulses.",
      more: "Más para ver",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Piloto de nuestra comedia familiar sin diálogos" },
      curioAll: "Curio – todos los episodios",
      promo: { title: "PetPrep en 60 segundos", text: "¿Está tu hijo listo para una mascota de verdad?" },
      curio: { title: "Conoce a Curio", text: "Nuestra mascota y sus vídeos cortos" },
      coloring: { title: "Dibujos para colorear", text: "Gratis para imprimir, cada uno con un dato con fuente sobre el cuidado de mascotas" },
      walkthrough: { title: "Cómo funciona la app", text: "El reto de 12 semanas, paso a paso" },
    },
    closing: "Todo esto lo produce un solo fundador con agentes de IA, sin equipo de producción ni agencia. Cada pieza lleva de vuelta a la app.",
  },
  built: {
    eyebrow: "Lo ya construido",
    title: "Un producto real, no un prototipo",
    items: [
      "Motor de juego en el servidor con sincronización en tiempo real, probado con simulaciones de días enteros, días de cambio de hora y casos límite de familias.",
      "Familias con varios padres, varios hijos y mascotas compartidas, con una puntuación justa para cada niño.",
      "Mascotas de IA fotorrealistas con costes de IA medidos y limitados, y archivos multimedia en servidores alquilados en Alemania (Hetzner, UE).",
      "Necesidades de las mascotas basadas en fuentes citadas de veterinarios y clubes caninos y felinos, con cada cifra rastreable hasta su fuente.",
      "Seguridad infantil desde el diseño: acceso con PIN sin correo electrónico, datos mínimos, sin publicidad y solo contenido multimedia verificado.",
      "Juego accesible: gestos más sencillos, lectores de pantalla y empujar una silla de ruedas cuenta como paseo.",
    ],
  },
  revenue: {
    eyebrow: "Mapa de ingresos",
    title: "La fase 1 financia la captación. La fase 2 es el negocio.",
    phases: [
      {
        tag: "Fase 1 · Antes de la mascota",
        name: "Financia la captación",
        items: [
          { name: "Reto de 12 semanas", price: "49,99 € por mascota, pago único", status: "live", label: "Hecho" },
          { name: "Deseos (objetos para la mascota)", price: "De 2,99 a 15,99 €, solo estéticos", status: "live", label: "Hecho" },
          { name: "Patrocinio de la serie", price: "Paquetes por temporada", status: "building", label: "En curso" },
          { name: "Tienda: libros para colorear, peluche de Curio, puzles", price: "Físicos y digitales", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Fase 2 · Con una mascota real",
        name: "El negocio",
        items: [
          { name: "Asistente de IA para el cuidado de la mascota", price: "Suscripción desde 3,99 € al mes + recargas", status: "planned", label: "Previsto" },
          { name: "Socios de seguros para mascotas", price: "Ofertas que los padres deciden ver, comisión por cada recomendación", status: "planned", label: "Previsto" },
          { name: "Red de veterinarios socios", price: "Reservas y teleconsultas", status: "planned", label: "Previsto" },
          { name: "Pruebas de ADN y tiendas de mascotas socias", price: "Afiliación y, más adelante, kit propio", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Marca",
        name: "Curio y la serie",
        items: [
          { name: "Serie de animación Curio", price: "Patrocinadores de temporada", status: "live", label: "Piloto publicado" },
          { name: "#walkyourpet", price: "Un movimiento que alimenta todos los canales", status: "live", label: "En marcha" },
        ],
      },
    ],
    retention: "Una familia que adopta tras el reto se queda con PetPrep los 10 a 15 años de vida de la mascota, no solo 12 semanas.",
    stageTag: "Situación",
    stage: "Antes del lanzamiento, en beta cerrada en iOS y Android. Después llegará el lanzamiento en App Store y Google Play.",
  },
  team: {
    eyebrow: "Equipo",
    title: "El rendimiento de un estudio. El coste de una sola persona.",
    founderName: "David Tacer, fundador y CEO.",
    founder: "Lleva 12 años al frente de su propia empresa de software (más de 400 proyectos) y es fundador de CHERR.IO (ganador de FutureHack, Davos 2018). Desarrolla PetPrep a tiempo completo con un equipo de agentes de IA de programación y contenido.",
    points: [
      "Cada dato tiene una fuente y una cita, revisadas por un revisor independiente.",
      "Los datos de las familias se quedan en la UE, los niños entran sin correo electrónico y la app no tiene publicidad.",
      "Procesos nocturnos investigan, comprueban y publican nuevas razas y páginas de cuidados.",
    ],
  },
  webSummit: {
    title: "Nos vemos en el Web Summit de Lisboa",
    text: "Del 9 al 12 de noviembre de 2026. Compartimos el dosier, la presentación, la sala de datos y el acceso a la beta bajo petición.",
    watch: "Ver la serie",
  },
  contactTitle: "Ponte en contacto",
};

export default es;
