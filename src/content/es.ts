import type { Dictionary } from "./types";

const es: Dictionary = {
  meta: {
    siteTitle: "PetPrep — Listos para una mascota. A su lado toda su vida.",
    siteDescription:
      "PetPrep es un simulador de mascotas de 12 semanas que muestra a los padres si su hijo está realmente preparado para una mascota real y que después se convierte en un asistente de IA para toda la vida del animal.",
    slogan: "Listos para una mascota. A su lado toda su vida.",
    keywords: [
      "está mi hijo preparado para un perro",
      "app de responsabilidad con mascotas para niños",
      "simulador de mascota virtual",
      "simulador de mascota con IA",
      "antes de tener un perro",
      "niños y mascotas",
      "test para saber si estás preparado para una mascota",
      "panel para padres",
      "probar una raza de perro antes de comprarlo",
      "qué raza de perro me conviene",
    ],
  },
  nav: { home: "Inicio", menu: "Menú", close: "Cerrar menú", skip: "Ir al contenido" },
  lang: { label: "Idioma", switchTo: "Cambiar de idioma" },
  cta: {
    primary: "Empieza gratis con un perro mestizo",
    secondary: "Descubre cómo funciona",
    earlyAccess: "Consigue acceso anticipado",
    earlyAccessSubject: "PetPrep: acceso anticipado",
    ios: "Descárgala para iPhone",
    android: "Descárgala para Android",
    comingSoon: "Muy pronto en iPhone y Android",
    readMore: "Leer más",
    contactUs: "Contacta con nosotros",
  },
  common: {
    planned: "Previsto",
    plannedNote:
      "Esta página describe lo que estamos desarrollando a continuación. Todavía no está disponible en la app y algunos detalles pueden cambiar.",
    legalDraft:
      "Estamos ultimando este texto con nuestros asesores jurídicos antes del lanzamiento público. Si algo no queda claro, escríbenos.",
    lastUpdated: "Última actualización",
    breadcrumbHome: "Inicio",
    screensNote: "Las pantallas de la app que se muestran en este sitio son vistas previas del producto; la app final puede variar ligeramente.",
    perPet: "por mascota",
    free: "Gratis",
    forever: "para siempre",
    notFoundTitle: "Esta página se ha escapado sin correa.",
    notFoundText: "La página que buscas no existe o se ha movido.",
    notFoundCta: "Volver a la página de inicio",
  },
  footer: {
    tagline: "Listos para una mascota. A su lado toda su vida.",
    groups: [
      { title: "Producto", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Empresa", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Confianza", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Todos los derechos reservados.",
    dataEu: "Datos alojados en la UE.",
    languages: "Pronto, más idiomas.",
    company: "PetPrep es un producto de",
    cookieSettings: "Configuración de cookies",
    a11yBadge: { title: "Juego accesible", text: "Gestos más fáciles · Lectores de pantalla · Menos movimiento" },
  },
  screens: {
    pin: "El niño entra con un código de 6 dígitos que le da su padre o su madre: sin correo electrónico ni contraseña.",
    contract: "El Contrato de responsabilidad, firmado con el dedo. Al firmarlo, la mascota cobra vida.",
    hud: "La pantalla de inicio del niño: el estado de la mascota en directo, cuatro necesidades y los botones de cuidado.",
    picker: "Los padres eligen la mascota: raza, origen (adoptada o de un criador) y edad al llegar.",
    parent: "El panel para padres: un semáforo, el Care Score y las rutinas de hoy de cada hijo.",
    report: "El informe de 7, 30 u 84 días de un niño: rutinas, paseos y tareas olvidadas, día a día.",
    assistant: "Cuando llega a casa: el asistente de IA convierte los datos del collar en una sugerencia clara.",
    certificate: "Tras 12 semanas: el Certificado de responsabilidad con el Care Score del niño.",
  },
  pricingPlans: {
    free: {
      name: "Perro mestizo",
      text: "La simulación completa con un perro mestizo que parece de verdad.",
      features: [
        "Simulación de 12 semanas con consecuencias reales",
        "Paseos reales, contados en pasos reales con el móvil",
        "Panel para padres, semáforo y Care Score",
        "Horas de silencio y botón de pausa",
        "Imagen fotorrealista de tu mascota y vídeos cortos",
      ],
      cta: "Empieza gratis",
    },
    challenge: {
      name: "El Reto PetPrep de 12 semanas",
      badge: "12 semanas + certificado",
      unit: "por mascota · 12 semanas",
      text: "Para las familias que quieren la experiencia completa y un certificado al final.",
      features: [
        "Todo lo incluido en Perro mestizo",
        "Razas exigentes, como el [border collie](breed:border_collie)",
        "Los estados de ánimo de tu mascota en vídeos con IA",
        "Certificado de responsabilidad",
        "Un solo precio cuando los hermanos comparten mascota",
        "Acceso para ambos padres",
      ],
      cta: "Elige el reto",
    },
    note:
      "Las compras se hacen en la app a través de App Store o Google Play. Una segunda mascota en la misma familia es un reto aparte. Los precios incluyen el IVA cuando corresponda.",
  },
  earlyAccess: {
    title: "Consigue acceso anticipado",
    text: "Sé de las primeras familias en probar PetPrep. Te escribiremos cuando esté lista, y nada más.",
    label: "Tu correo electrónico",
    placeholder: "tu@ejemplo.es",
    button: "Consigue acceso anticipado",
    sending: "Enviando…",
    successTitle: "Ya estás en la lista.",
    successText: "¡Gracias! Serás de los primeros en recibir un correo cuando PetPrep esté lista.",
    invalid: "Introduce un correo electrónico válido.",
    error: "Algo ha salido mal. Vuelve a intentarlo en un momento.",
    consent: "Al suscribirte, aceptas recibir correos sobre PetPrep. Puedes darte de baja cuando quieras.",
    privacyLink: "Política de privacidad",
  },
  contactCards: [
    { title: "Familias", text: "Preguntas sobre la app, tu cuenta o el reto.", email: "hello" },
    { title: "Privacidad", text: "Acceso, exportación o eliminación de datos, y cualquier duda sobre privacidad.", email: "privacy" },
    { title: "Socios", text: "Tiendas de mascotas, protectoras, veterinarios, adiestradores, aseguradoras y colegios.", email: "partners" },
    { title: "Inversores", text: "Dosier para inversores, presentación y data room a petición.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep — ¿Está tu hijo preparado para una mascota? Descúbrelo en 12 semanas.",
      description:
        "Antes de que llegue a casa una mascota real, tu hijo cuida durante 12 semanas de una mascota con IA que parece de verdad: comidas, limpieza y paseos reales. Cada día ves si está realmente preparado.",
    },
    hero: {
      eyebrow: "El Reto PetPrep de 12 semanas",
      title: "Listos para una mascota. A su lado toda su vida.",
      lead:
        "Antes de que llegue a casa una mascota real, tu hijo o hija cuida durante 12 semanas de una mascota con IA que parece de verdad: le da de comer, limpia lo que ensucia y da paseos reales. Cada día ves si está realmente preparado.",
      trust: ["Perro mestizo gratis para siempre", "Sin anuncios ni chats con desconocidos", "Los niños no necesitan correo electrónico"],
    },
    phone: {
      petName: "Luna",
      petAge: "Cachorra · 3 meses",
      live: "EN DIRECTO",
      video: "Vídeo fotorrealista de la mascota con IA",
      actions: ["Comida", "Agua", "Paseo", "Limpiar"],
    },
    parentCard: { child: "Lucía", status: "Todo bien", scoreLabel: "Care Score", progress: "Semana 3 de 12 · 31 de 36 rutinas a tiempo" },
    notification: { app: "PetPrep", text: "Tu mascota está mirando su comedero. La hora del desayuno termina a las 9:00." },
    promoVideo: {
      eyebrow: "PetPrep en un minuto",
      title: "Mira cómo funciona.",
      text: "Desde elegir la mascota y firmar el contrato hasta el colegio, los paseos, el cuidado del pelaje y el certificado: todo lo que hace tu hijo en 12 semanas y todo lo que ves en el panel. Curio, nuestra mascota de marca, solo viene a saludar; la mascota de la app es un perro con IA que parece de verdad.",
      alt: "Vídeo promocional de PetPrep: pantallas de la app, un niño cuidando de un perro y un padre siguiendo el Care Score.",
      note: "El vídeo está en inglés. La app aún no está disponible al público en App Store ni en Google Play: apúntate para tener acceso anticipado.",
    },
    promise: {
      quote: "Todas las familias han oído alguna vez «Te prometo que lo cuidaré». PetPrep convierte esa promesa en una",
      highlight: "prueba",
      text:
        "Fracasar en la simulación es un éxito para tu familia: lo descubres antes de que sufra un animal de verdad y antes de comprometerte a años de cuidados y gastos.",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Tres pasos del «porfa» al «preparado».",
      steps: [
        {
          title: "Tú eliges la mascota",
          text: "Crea una cuenta familiar, añade a tu hijo solo con un apodo y elige la mascota: raza, adoptada o de criador, cachorro o sénior.",
        },
        {
          title: "Tu hijo firma la promesa",
          text: "Tu hijo entra con un código de 6 dígitos: sin correo electrónico ni contraseña. Firma el Contrato de responsabilidad con el dedo y nace su mascota, única en el mundo.",
        },
        {
          title: "12 semanas de cuidados reales",
          text: "Una semana real equivale a un mes de vida de la mascota. Al final, un Certificado de responsabilidad con el Care Score: una prueba objetiva o un «todavía no» sincero.",
        },
      ],
      link: "Cómo funciona en detalle",
    },
    realism: {
      title: "Lo más parecido a una mascota real que puede ofrecer una app.",
      text: "Los horarios de comida, los paseos y el crecimiento se basan en fuentes como asociaciones veterinarias y clubes caninos, no en cifras inventadas para un juego.",
      items: [
        { title: "Paseos reales, pasos reales", text: "El paseo diario cuenta los pasos del móvil de tu hijo. ¿Hoy no ha habido ningún paseo? Mañana la mascota lo nota." },
        { title: "Crece", text: "Un cachorro come cuatro veces al día, luego tres y después dos, y estrena foto a medida que crece." },
        { title: "Se comporta como un animal de verdad", text: "Los cachorros necesitan salir. Los perros aburridos muerden las zapatillas. Hay que limpiar antes de cenar." },
        { title: "Respeta el colegio y el sueño", text: "Las horas de silencio pausan los recordatorios. Una comida que cae en horario escolar te toca a ti, no a tu hijo." },
        { title: "Consecuencias reales, con delicadeza", text: "El descuido acaba en una visita al veterinario o en la protectora: nunca da miedo y siempre hay una nueva oportunidad." },
        { title: "Única", text: "Cada mascota tiene su propio pelaje, sus manchas y sus ojos: fotorrealista e irrepetible." },
      ],
    },
    parents: {
      eyebrow: "Para padres",
      title: "Ves la verdad en directo.",
      text: "Un semáforo claro para cada hijo, un Care Score basado en las rutinas hechas a tiempo y una cronología de quién ha hecho qué. Los hermanos que comparten mascota tienen cada uno su propia puntuación justa.",
      points: [
        { strong: "Horas de silencio y botón de pausa", text: "tú tienes el control." },
        { strong: "Los niños entran con un código", text: "sin correo, sin apellidos, sin anuncios." },
        { strong: "Ambos padres, todos los hijos", text: "una familia, una sola vista." },
      ],
      link: "Todo lo que ven los padres",
    },
    adults: {
      eyebrow: "Para adultos",
      title: "Prueba la raza antes de llevarte una mascota a casa.",
      text: "¿Te has enamorado de una raza en concreto? PetPrep no es solo para niños. Durante 12 semanas cuidas de una mascota con IA de esa raza, con sus necesidades diarias reales, y descubres si de verdad es para ti antes de comprar o adoptar.",
      points: [
        {
          strong: "Las necesidades reales de la raza",
          text: "comidas en franjas horarias, agua, limpieza y un objetivo diario de pasos basado en necesidades de ejercicio documentadas: un border collie adulto necesita 12.000 pasos al día; un perro mestizo, 6000.",
        },
        {
          strong: "Adiestramiento y accidentes de cachorro",
          text: "una sesión corta de adiestramiento cada día y un cachorro que solo aguanta aproximadamente una hora por cada mes de edad antes de tener que salir; si no, aparece un charco en el suelo.",
        },
        {
          strong: "En 12 semanas ves si encaja en tu vida",
          text: "tus días de trabajo, tu tiempo libre y el tiempo que hace. Como será un perro de familia, puedes añadir más adelante a tu pareja o a tus hijos.",
        },
      ],
      how: "Cómo empezar: crea una cuenta como padre o madre, añádete como perfil de cuidador y entra con el código de 6 dígitos, en el mismo móvil o en otro.",
      note: "Ya disponibles: el perro mestizo y el gato doméstico gratuitos, y todas las razas de perro y de gato del [registro de animales](page:animals) en el reto de 12 semanas.",
      link: "Cómo usar PetPrep por tu cuenta",
    },
    after: {
      eyebrow: "Cuando llega a casa",
      title: "Cuando llega la mascota real, PetPrep se queda.",
      text: "Pulsa «Ya tenemos una mascota real» y el simulador se convierte en un asistente de IA que ya conoce el ritmo de tu familia, para los años que vienen.",
      features: [
        { title: "Collar inteligente", text: "Actividad y avisos cuando algo no va bien." },
        { title: "Primer contacto con IA", text: "Responde rápido y luego te pasa a un veterinario de verdad." },
        { title: "Crecimiento y comida", text: "Peso semanal, curva de crecimiento y cuándo cambiar de pienso." },
        { title: "Socios de confianza", text: "Veterinarios, adiestradores y aseguradoras cerca de ti, siempre bien identificados." },
        { title: "Test de ADN", text: "Qué razas hay en tu perro mestizo y a qué conviene prestar atención." },
        { title: "Ficha para el veterinario", text: "La mezcla de razas y los resultados de ADN en un solo lugar, listos para el veterinario." },
      ],
      link: "Sobre el asistente de IA",
      planned: "En desarrollo",
    },
    species: {
      title: "Hoy, perros y gatos. Pronto, más especies.",
      text: "Pensada para familias de todo el mundo, en su propio idioma.",
      chips: [
        { label: "Perro · disponible", active: true, link: "species:dog" },
        { label: "Gato · disponible", active: true, link: "species:cat" },
        { label: "Razas de perro y gato · en el reto", link: "page:animals" },
        { label: "Más especies · previsto", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Precios", title: "Precios sencillos y justos." },
    faq: { title: "Lo que preguntan los padres", link: "Todas las preguntas" },
    final: { title: "¿Listos para una mascota?", text: "Descúbrelo en 12 semanas. Empieza gratis, en iPhone o Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Cómo funciona PetPrep: el reto de 12 semanas antes de tener una mascota",
        description:
          "Cómo funciona el Reto PetPrep de 12 semanas: elegir la mascota, el Contrato de responsabilidad, los cuidados diarios, los paseos reales, las horas de silencio y el certificado.",
      },
      eyebrow: "Cómo funciona",
      title: "Doce semanas que demuestran cuánto vale una promesa.",
      lead:
        "Tu hijo cuida de una mascota fotorrealista con IA que se comporta como una de verdad, hasta donde lo permite una app. Una semana real equivale a un mes de vida de la mascota, así que en 12 semanas la mascota crece y tú ves si los cuidados se mantienen.",
      blocks: [
        {
          type: "steps",
          heading: "Del primer toque al certificado",
          items: [
            { title: "El padre o la madre crea la familia", text: "Regístrate con tu correo electrónico (pronto podrás entrar con Apple y Google). Añade a cada hijo con un apodo y, si quieres, el año de nacimiento. Es todo lo que te pedimos sobre tu hijo." },
            { title: "Tú eliges la mascota", text: "Elige la raza (el perro mestizo es gratis), de dónde viene la mascota (adoptada en una protectora o comprada a un criador) y su edad al llegar: cachorro, joven, adulto o sénior." },
            { title: "Tu hijo entra con un código", text: "Recibes un código de 6 dígitos válido durante 15 minutos. Tu hijo lo escribe en su móvil: sin correo electrónico ni contraseña. ¿Ha perdido el móvil? Cierra su sesión en todos los dispositivos con un solo toque." },
            { title: "El Contrato de responsabilidad", text: "Tu hijo firma una promesa con el dedo. La firma es el nacimiento de la mascota: las necesidades empiezan a contar desde ese momento, así que no se pierde nada si firma más tarde." },
            { title: "Doce semanas de cuidados", text: "Darle de comer en las franjas horarias adecuadas, agua fresca, limpieza y un paseo diario con pasos reales. A medida que la mascota crece, sus necesidades cambian." },
            { title: "El certificado", text: "Tras 12 semanas, la mascota cumple un año. Tu hijo recibe un Certificado de responsabilidad con su Care Score o bien queda claro, sin riesgo para nadie, que todavía no es el momento." },
          ],
        },
        {
          type: "screens",
          heading: "Lo que ve tu hijo",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Lo que necesita cada día un perro mestizo adulto",
          intro: "Las cifras proceden de fuentes veterinarias y de clubes caninos; cuando las fuentes solo dan un intervalo, PetPrep fija el valor y lo indica.",
          head: ["Necesidad", "Con qué frecuencia", "Si se olvida"],
          rows: [
            ["Comida", "Por la mañana (6–10) y por la tarde (17–21), una vez por franja", "Tiene hambre al cabo de unas 12,5 horas"],
            ["Agua", "3 veces al día, con al menos 3 horas de diferencia", "Tiene sed al cabo de unas 10 horas"],
            ["Paseo", "6000 pasos reales (los cachorros empiezan con 2000)", "Ningún paseo → enferma a la mañana siguiente"],
            ["Limpieza", "Cuando la mascota ensucia; nunca durante las horas de silencio", "Ni comida ni agua hasta que se limpie"],
          ],
          note: "Los cachorros comen 4 veces al día, luego 3 y después 2, y solo aguantan aproximadamente una hora por cada mes de edad. Un [border collie](breed:border_collie) necesita 12.000 pasos y le entra hambre antes.",
        },
        {
          type: "cards",
          heading: "Pensado para la vida real de una familia",
          columns: 3,
          items: [
            { title: "Horas de silencio", text: "Configura el horario del colegio y del sueño. La mascota va más despacio, no se envían recordatorios y nunca ensucia en esas horas." },
            { title: "Comidas en horario escolar", text: "Una franja de comida que cae entera dentro de las horas de silencio le toca al padre o a la madre: nunca cuenta en contra de tu hijo." },
            { title: "Pausa cuando quieras", text: "Un botón pausa el juego, por ejemplo para una charla en familia. Mientras está en pausa, nada empeora." },
            { title: "Recordatorios amables", text: "Primero la mascota avisa a tu hijo con suavidad y luego con urgencia. Solo si una necesidad se queda a cero durante una hora recibes tú una alarma." },
            { title: "Consecuencias reales", text: "El descuido supone 12 horas en el veterinario. Tras un día entero sin cuidados, la protectora se lleva a la mascota, y se puede volver a empezar." },
            { title: "Mascotas compartidas", text: "Los hermanos pueden compartir una mascota. Cada acción se atribuye al niño que la hizo, así que la puntuación sigue siendo justa." },
          ],
        },
        {
          type: "callout",
          title: "Fracasar también es un resultado.",
          text: "Si la mascota acaba en la protectora virtual, la familia ha aprendido algo valioso antes de que lo pagara un animal de verdad. Se puede volver a empezar, también con una raza más fácil.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Para padres: el panel de PetPrep, el Care Score y los controles",
        description:
          "Lo que ven los padres en PetPrep: un semáforo diario por hijo, el Care Score, rutinas, informes, notificaciones, horas de silencio, pausa y privacidad desde el diseño.",
      },
      eyebrow: "Para padres",
      title: "Una prueba objetiva, no otra promesa.",
      lead:
        "No tendrás que adivinar si los paseos se hicieron de verdad. PetPrep mide los cuidados según unas rutinas diarias claras y te muestra, hijo por hijo, cómo va la cosa.",
      blocks: [
        {
          type: "cards",
          heading: "El semáforo",
          intro: "Cada hijo y cada mascota reciben un color para hoy, en la hora local de tu familia, siempre con el motivo explicado.",
          columns: 3,
          items: [
            { title: "Verde: todo bien", text: "Las rutinas van bien.", tag: "ok" },
            { title: "Amarillo: requiere atención", text: "Hoy se han saltado más de dos rutinas.", tag: "warn" },
            { title: "Rojo: urgente", text: "Hoy la mascota se ha puesto enferma, una necesidad lleva más de una hora a cero o la mascota ha ido a la protectora.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "El Care Score",
          paragraphs: [
            "Care Score = rutinas hechas a tiempo ÷ rutinas previstas × 100, menos 10 puntos por cada enfermedad, entre 0 y 100.",
            "Una rutina es una tarea concreta: cada franja de comida, cada una de las tres veces que se rellena el agua, limpiar cada vez que ensucia en menos de dos horas (el colegio y el sueño no cuentan) y alcanzar el objetivo del paseo diario.",
            "El tiempo en que el juego está en pausa, la mascota está en el veterinario o aún no se ha firmado el contrato nunca cuenta en contra de tu hijo. Los días pasados quedan congelados, así que una puntuación no se puede reescribir después.",
            "Los hermanos que comparten mascota se reparten cada rutina de forma justa. Solo cuentan las acciones de cada niño: si uno lo hace todo, saca 100 y el otro 0.",
          ],
        },
        {
          type: "screens",
          heading: "Tu vista",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "Tú tienes el control",
          items: [
            "Horas de silencio para el colegio y el sueño, en tu hora local, también con los cambios de horario de verano e invierno.",
            "Pausa el juego de cualquier mascota con un toque y una confirmación; la pantalla de tu hijo se bloquea al instante.",
            "Invita al otro progenitor con un código de un solo uso: así los dos padres ven a todos los hijos y todas las mascotas.",
            "Cierra la sesión de un hijo en todos los dispositivos si pierde el móvil; los códigos son de un solo uso y caducan a los 15 minutos.",
            "Exporta todos los datos de tu familia en un archivo, o elimina al instante desde la app el perfil de un hijo o toda tu cuenta.",
          ],
        },
        {
          type: "list",
          heading: "Privacidad desde el diseño",
          items: [
            "Los niños entran con un código: sin correo electrónico, sin contraseña, sin apellidos.",
            "Guardamos un apodo y, si lo añades, el año de nacimiento. Nada más sobre tu hijo.",
            "Las notificaciones nunca incluyen el nombre de tu hijo ni el de la mascota, porque pueden aparecer en la pantalla de bloqueo.",
            "Los pasos se obtienen de Apple Health (iPhone) o Health Connect (Android) si lo permites (solo lectura), y del sensor de movimiento del móvil cuando lo hay. PetPrep no usa GPS ni rastrea la ubicación.",
            "Sin anuncios, sin chats con desconocidos y con servidores en la UE.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Cuando llega a casa: el asistente de IA de PetPrep para tu mascota real",
        description:
          "Cuando tu familia tiene una mascota real, PetPrep se convierte en un asistente de IA: actividad del collar inteligente, avisos, primer contacto con IA y un veterinario de verdad, crecimiento y alimentación.",
      },
      eyebrow: "Cuando llega a casa",
      title: "La simulación termina. Los cuidados, no.",
      lead:
        "Cuando tu familia lleva a casa una mascota real, con un solo toque PetPrep se convierte en un asistente para toda la vida del animal: en tiempo real, sin barras de salud y conociendo ya la rutina de tu familia.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Lo que hará el asistente",
          columns: 2,
          items: [
            { title: "Integración con collares inteligentes", text: "Conecta los localizadores GPS y de actividad más populares, o un collar PetPrep, y ve la actividad en contexto." },
            { title: "Avisos que se explican", text: "«Max ha corrido hoy 2 km, la mitad de lo habitual, y ha comido más. Un paseo extra por la tarde le ayudará a tranquilizarse». Una observación, un motivo, una sugerencia." },
            { title: "Primero la IA, después un veterinario de verdad", text: "Haz una pregunta o sube una foto. El asistente responde a preguntas generales, estima la urgencia y te pasa a un veterinario de verdad cuando hace falta: los signos urgentes van directamente a un veterinario." },
            { title: "Test de ADN para tu perro o tu gato", text: "Pide un test de ADN en la app o sube el resultado de uno que ya tengas. PetPrep muestra qué razas hay en la mezcla, qué es típico de ellas y qué problemas de salud son más frecuentes en esas razas, con fuentes. Los porcentajes de raza no son un diagnóstico, y un test de ADN no detecta alergias." },
            { title: "Una ficha para el veterinario", text: "La mezcla de razas y cualquier resultado directo de ADN en una sola página o código QR, para que tu veterinario sepa al momento qué lleva un mestizo." },
            { title: "Crecimiento y nutrición", text: "Registra el peso cada semana, consulta la curva de crecimiento y recibe un recordatorio cuando toque cambiar de pienso." },
          ],
        },
        {
          type: "screens",
          heading: "Un adelanto",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principios en los que no cederemos",
          items: [
            "El asistente de IA no es un veterinario y nunca da un diagnóstico. Cada respuesta sobre salud incluye una forma de contactar con un veterinario de verdad.",
            "Las ofertas de socios (tiendas, aseguradoras, adiestradores, veterinarios) siempre están identificadas, e indicamos cuándo cobramos una comisión.",
            "No compartimos nada con un socio sin tu consentimiento.",
            "Los datos de tu hijo del reto solo pasan al asistente si tú lo aceptas.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Precios: PetPrep es gratis para empezar; el reto de 12 semanas cuesta 49,99 €",
        description:
          "La mascota mestiza es gratis para siempre. El Reto PetPrep de 12 semanas cuesta 49,99 € por mascota, en un único pago. Un solo precio para los hermanos que comparten mascota.",
      },
      eyebrow: "Precios",
      title: "Precios sencillos y justos.",
      lead: "Empieza gratis con una mascota mestiza. Compra el reto completo de 12 semanas cuando estés listo: las 12 semanas empiezan con la compra.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Deseos: cosas para tu mascota",
          intro:
            "En la app, tu hijo pide cosas para su mascota; tú decides y las compras. Tu hijo nunca ve un precio. Los artículos son solo estéticos: nunca cambian las necesidades, el Care Score ni el certificado. También están disponibles para el perro mestizo y el gato doméstico gratuitos.",
          head: ["Artículo", "Precio"],
          rows: [
            ["Cama (gato: cesta)", "5,99 €"],
            ["Comedero y bebedero", "5,99 €"],
            ["Juguete (perro: cuerda o juguete con pito; gato: ratón de peluche o caña con plumas)", "5,99 € por juguete"],
            ["Premios, paquete de 10", "2,99 €"],
            ["Pack de bienvenida: cama + comedero y bebedero + juguete", "15,99 € (en lugar de 17,97 €)"],
          ],
          note: "Los Deseos llegarán con la próxima actualización de la app; se podrán comprar en cuanto los artículos estén disponibles en App Store y Google Play. Los precios son los de Eslovenia; la tienda muestra el precio de tu país.",
        },
        {
          type: "faq",
          heading: "Preguntas sobre precios",
          items: [
            { q: "¿La versión gratuita es gratis de verdad?", a: "Sí. La mascota mestiza es gratis para siempre, con la simulación completa, paseos reales y el panel para padres." },
            { q: "¿Qué incluye el reto?", a: "Razas exigentes como el [border collie](breed:border_collie), los estados de ánimo de tu mascota en vídeos con IA, el Certificado de responsabilidad al final y acceso para ambos padres." },
            { q: "¿Los hermanos pagan dos veces?", a: "No. Los niños que comparten una mascota pagan un solo precio. Una segunda mascota en la familia es un reto aparte." },
            { q: "¿Cómo se paga?", a: "En la app, a través de App Store o Google Play. Los reembolsos se gestionan desde la cuenta de tu tienda." },
            { q: "¿Qué son los Deseos? ¿Puede mi hijo comprar cosas por su cuenta?", a: "Tu hijo puede pedir una cama, comedero y bebedero, un juguete o premios para su mascota, con un máximo de tres peticiones abiertas a la vez. Recibes una notificación y lo compras o eliges «Not now» («Ahora no»). Tu hijo nunca ve los precios y no puede comprar nada en la app infantil." },
            { q: "¿Los artículos comprados hacen el juego más fácil?", a: "No. Los artículos son solo estéticos. Nunca cambian las necesidades, el Care Score ni el certificado, y en los Deseos no hay veterinario ni medicinas: nunca «paga para salvar a tu mascota»." },
            { q: "¿Es igual para adultos?", a: "Sí. Si usas PetPrep por tu cuenta para probar una raza, se aplica lo mismo: el perro mestizo es gratis para siempre y el reto de 12 semanas cuesta 49,99 € por mascota." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Preguntas frecuentes: lo que preguntan los padres sobre PetPrep",
        description:
          "Respuestas sobre PetPrep: tiempo diario, uso por parte de adultos, privacidad y ubicación, pasos, hermanos, qué pasa si un niño fracasa, idiomas, especies y mascotas reales.",
      },
      eyebrow: "Preguntas frecuentes",
      title: "Lo que preguntan los padres.",
      lead: "Respuestas breves y sinceras. ¿Echas algo en falta? Escríbenos.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "¿Para qué edad es PetPrep?", a: "Para niños, está pensada para edades de unos 7 a 12 años y funciona bien hasta los 16. También la usan adultos, para comprobar si una raza concreta es realmente para ellos antes de comprar o adoptar." },
            { q: "¿Puedo usar PetPrep por mi cuenta, sin niños?", a: "Sí. Crea una cuenta como padre o madre y añádete como perfil de cuidador: basta con un apodo; deja vacío el año de nacimiento. Elige la raza, crea un código de 6 dígitos y luego, en el mismo móvil o en otro, elige «Soy un niño» y escribe el código: así te conviertes en el cuidador. Como será un perro de familia, puedes añadir más adelante a tu pareja o a tus hijos para cuidarlo juntos. El precio es el mismo que para las familias." },
            { q: "¿Cuánto tiempo lleva cada día?", a: "Unos minutos para la comida, el agua y la limpieza, más el paseo que un perro real necesitaría de todos modos." },
            { q: "¿La app rastrea la ubicación de mi hijo?", a: "No. Para los paseos solo cuenta pasos. Si lo permites, los lee de Apple Health (iPhone) o Health Connect (Android), en modo de solo lectura y únicamente los pasos; cuando está disponible, también usa el sensor de movimiento del móvil. Pide permiso en la pantalla del paseo. No se usa GPS." },
            { q: "¿Mi hijo necesita un correo electrónico?", a: "No. Tú creas la cuenta; tu hijo entra con un código de 6 dígitos que generas tú. Solo guardamos un apodo y, si quieres, el año de nacimiento." },
            { q: "¿Qué pasa si mi hijo se olvida?", a: "Primero la mascota envía recordatorios amables. Si una necesidad se queda a cero, la mascota enferma y pasa 12 horas en el veterinario. Tras un día entero sin cuidados, se la lleva la protectora virtual, y se puede volver a empezar." },
            { q: "¿Pueden los hermanos compartir una mascota?", a: "Sí. Cada niño firma su propio contrato, cada acción se atribuye a quien la hizo y cada niño recibe su propio Care Score justo." },
            { q: "¿Y el colegio y la hora de dormir?", a: "Configura las horas de silencio. La mascota va más despacio, no se envía nada y las comidas que caen enteras en las horas de silencio corren de tu cuenta." },
            { q: "¿Da miedo a los niños?", a: "No. Las consecuencias son reales pero suaves: la mascota va al veterinario o a la protectora, nunca hay nada desagradable y siempre hay una nueva oportunidad." },
            { q: "¿Qué animales hay disponibles?", a: "Hoy, [perros](species:dog) y [gatos](species:cat): un perro mestizo y un gato doméstico gratuitos y, en el reto de 12 semanas, todas las razas del [registro de animales](page:animals), que también recoge sus necesidades con fuentes. Hay más especies previstas." },
            { q: "¿En qué idiomas?", a: "Hoy la app está en inglés y esloveno. Llegarán más idiomas a medida que PetPrep se lance en nuevos países." },
            { q: "¿Qué pasa cuando tengamos una mascota real?", a: "PetPrep puede convertirse en un asistente de IA para tu mascota real. Esta parte está en desarrollo." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Socios: colabora con PetPrep",
        description:
          "PetPrep colabora con tiendas de mascotas, protectoras, veterinarios, adiestradores, aseguradoras, fabricantes de collares y colegios para ayudar a las familias a tener mascotas de forma responsable.",
      },
      eyebrow: "Socios",
      title: "Familias mejor preparadas para todos los que se preocupan por los animales.",
      lead:
        "Las familias que terminan PetPrep saben lo que exige de verdad una mascota. Estamos creando una red de socios que llegue a ellas en el momento adecuado, siempre bien identificada y con el consentimiento de la familia.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Con quién trabajamos",
          columns: 3,
          items: [
            { title: "Tiendas de mascotas", text: "Llega a las familias justo cuando demuestran que están preparadas, por ejemplo con una oferta de kit de inicio junto al certificado." },
            { title: "Protectoras, asociaciones y criadores", text: "Recomienda PetPrep antes de la adopción o la compra para reducir las decisiones impulsivas y las devoluciones." },
            { title: "Veterinarios", text: "Cuando la mascota real llega a casa, el asistente de IA responde a las primeras preguntas y deriva a los dueños a tu clínica, con un resumen del caso que solo se comparte con consentimiento." },
            { title: "Adiestradores y escuelas caninas", text: "Recomendaciones y reservas cuando una familia da el paso de tener un perro de verdad." },
            { title: "Aseguradoras de mascotas", text: "Ofertas adaptadas a la raza cuando se registra una mascota real, siempre bien identificadas." },
            { title: "Fabricantes de collares y dispositivos IoT", text: "Integración de los datos de actividad para avisos más inteligentes y bien explicados." },
          ],
        },
        {
          type: "list",
          heading: "Por qué confían en nosotros nuestros socios",
          items: [
            "Los niños entran sin correo electrónico y reducimos sus datos al mínimo, en servidores de la UE.",
            "A la pantalla de un niño solo llega contenido verificado; no hay anuncios.",
            "Cada oferta de un socio está identificada y cada comisión se comunica a la familia.",
          ],
        },
        { type: "callout", title: "Hablemos.", text: "Estamos preparando las condiciones de colaboración. Cuéntanos quién eres y qué tienes en mente.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Invierte en PetPrep: de la preparación para una mascota al cuidado de por vida",
        description:
          "PetPrep convierte la promesa de un niño en una prueba antes de que la familia tenga una mascota y después se convierte en un asistente de IA para toda su vida. Antes del lanzamiento; dosier a petición.",
      },
      eyebrow: "Inversores",
      title: "De un reto de 12 semanas a una relación de 10 a 15 años.",
      lead:
        "PetPrep da a los padres una prueba objetiva de si su hijo está preparado para una mascota real y después acompaña a la familia durante toda la vida del animal.",
      blocks: [
        {
          type: "cards",
          heading: "La oportunidad",
          columns: 3,
          items: [
            { title: "Problema", text: "Los niños prometen cuidar de una mascota; los padres no tienen una forma neutral de comprobarlo antes de comprometer dinero y años de cuidados." },
            { title: "Solución", text: "Una simulación realista de 12 semanas con un panel para padres en directo y un Care Score objetivo, que termina con un Certificado de responsabilidad." },
            { title: "Expansión", text: "Cuando la mascota real llega a casa, un asistente de IA para ella: datos del collar, primer contacto con IA y veterinarios, crecimiento y nutrición, tests de ADN y servicios de socios." },
          ],
        },
        {
          type: "table",
          heading: "Modelo de negocio",
          head: ["Fuente de ingresos", "Modelo", "Estado"],
          rows: [
            ["Mascota mestiza", "Gratis para siempre (captación)", "Decidido"],
            ["Reto PetPrep de 12 semanas", "49,99 € por mascota, pago único", "Decidido"],
            ["Deseos: cosas para la mascota (solo estéticas)", "Compras dentro de la app: 5,99 € por artículo, premios a 2,99 € los 10, pack a 15,99 €; también en la versión gratuita", "Desarrollado; compra en la tienda muy pronto"],
            ["Ofertas de socios", "Comisiones de tiendas, aseguradoras, veterinarios y adiestradores", "Previsto"],
            ["Asistente de IA para la mascota real", "Suscripción", "Previsto"],
            ["Tests de ADN para perros y gatos", "Venta de tests y comisión de socios", "Previsto"],
          ],
        },
        {
          type: "list",
          heading: "Lo que ya está construido",
          items: [
            "Motor de juego en el servidor con sincronización en tiempo real, probado con simulaciones de días completos, días de cambio de horario y casos límite familiares.",
            "Familias con varios padres, varios hijos y mascotas compartidas, con una puntuación justa para cada niño.",
            "Mascotas fotorrealistas únicas creadas con IA, con costes de IA medidos y limitados, y archivos multimedia almacenados en nuestros propios servidores de la UE.",
            "Necesidades de las mascotas basadas en fuentes veterinarias y de clubes caninos citadas, con cada cifra trazable hasta su fuente.",
            "Seguridad infantil desde el diseño: acceso con PIN sin correo electrónico, datos mínimos, sin anuncios y solo contenido multimedia verificado.",
          ],
        },
        {
          type: "prose",
          heading: "Fase",
          paragraphs: [
            "PetPrep está en fase previa al lanzamiento, con una beta cerrada prevista. El primer mercado es Eslovenia y su región, seguidos de los países DACH y el Reino Unido; el producto está pensado para localizarse a escala mundial desde el primer día.",
            "Fundador: David Tacer, desarrollador de software y emprendedor (Data Vallis David Tacer s.p., Dravograd, Eslovenia). Más [sobre nosotros](page:about).",
          ],
        },
        { type: "callout", title: "Solicita el dosier para inversores.", text: "Compartimos el dosier, la presentación y la data room a petición.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contacto con PetPrep: familias, privacidad, socios, inversores",
        description: "Contacta con PetPrep: preguntas de familias, solicitudes de privacidad, colaboraciones y consultas de inversores. Respondemos en inglés o en esloveno.",
      },
      eyebrow: "Contacto",
      title: "Leemos todos los mensajes.",
      lead: "Escribe a la dirección adecuada y te responderemos lo antes posible, en inglés o en esloveno.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Datos de la empresa" }],
    },
    privacy: {
      navLabel: "Privacidad",
      meta: {
        title: "Política de privacidad — PetPrep",
        description: "Cómo PetPrep recoge, utiliza y protege los datos personales de padres e hijos, y cómo ejercer tus derechos conforme al RGPD.",
      },
      eyebrow: "Legal",
      title: "Política de privacidad",
      lead: "Traducción: la versión en inglés es la única vinculante. PetPrep está pensado sobre todo para niños, así que recogemos el mínimo de datos posible y te explicamos exactamente qué hacemos con ellos.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Quién es el responsable",
              paragraphs: [
                "El responsable del tratamiento de los datos personales tratados a través de la aplicación PetPrep y de este sitio web es {company}, {address}; {companyIds}. Contacto para cuestiones de privacidad: {privacyEmail}.",
              ],
            },
            {
              heading: "2. Qué datos recogemos",
              items: [
                "Cuenta de padre o madre: nombre (cómo te llama tu familia), dirección de correo electrónico, contraseña (almacenada solo como hash seguro), la zona horaria de tu dispositivo y el momento en que aceptaste las condiciones y esta política.",
                "Perfil de cuidador (un niño o un adulto que cuida de la mascota): un apodo de hasta 30 caracteres y, de forma opcional, un año de nacimiento, que se deja vacío en el caso de un adulto. Sin correo electrónico, contraseña, apellidos ni fecha de nacimiento.",
                "Dispositivos: el modelo del teléfono (por ejemplo, «iPhone», nunca el nombre que el usuario haya puesto al teléfono) y, para las notificaciones, un token push, la plataforma y la versión de la aplicación.",
                "Actividad de cuidado: acciones en la simulación (comida, agua, limpieza, paseos), totales diarios de pasos (o de impulsos de silla de ruedas en el modo adaptado; consulta los apartados 3 y 4), puntuaciones e informes.",
                "El Contrato de responsabilidad: la firma que el niño traza con el dedo, almacenada como trazo vectorial junto con la fecha y hora de la firma.",
                "Códigos: los códigos de inicio de sesión y de invitación se almacenan solo como hash y caducan.",
                "Informes de errores de la aplicación: si la aplicación se bloquea o se cierra inesperadamente, puede enviar un breve informe técnico a nuestro servidor en la UE (tipo y texto del error, ubicación en el código, versión de la aplicación y del sistema operativo, nombre de la pantalla, rol de padre/hijo). No contiene nombre, dirección de correo electrónico, ID de usuario ni dirección IP, no se comparte con ningún tercero y se elimina a los 30 días.",
                "Lista de acceso anticipado (este sitio web): tu dirección de correo electrónico, el idioma de la página y el momento en que te apuntaste.",
              ],
            },
            {
              heading: "3. Datos de salud y actividad física (pasos, Apple Health y Health Connect)",
              paragraphs: [
                "PetPrep accede a un único tipo de datos de salud y actividad física y lo recoge: cuántos pasos da el cuidador cada día (actividad física). Lo utilizamos para una sola función, el paseo diario de la mascota en la simulación: el niño camina y sus pasos cuentan como el paseo de la mascota.",
                "Cómo accedemos a ellos: la aplicación del teléfono del niño cuenta los pasos. Si lo permites en el cuadro de diálogo de permisos del sistema, los lee de Apple Health (iPhone) o de Health Connect (Android), solo en modo lectura y solo los pasos. Cuando está disponible, también utiliza el sensor de movimiento del teléfono (Android: permiso «Actividad física»; iPhone: «Movimiento y forma física»); sin permiso para Apple Health o Health Connect, solo cuenta el sensor de movimiento.",
                "Qué recogemos: la aplicación envía a nuestro servidor únicamente el total de pasos del día, su fuente (Apple Health, Health Connect o el sensor de movimiento) y el momento del envío. Almacenamos un total diario por perfil de cuidador; nunca movimientos individuales, rutas, ubicación, frecuencia cardiaca, sueño, peso ni ningún otro dato de salud. Nunca escribimos nada en Apple Health ni en Health Connect.",
                "Cómo los utilizamos y compartimos: los totales de pasos se utilizan solo para hacer funcionar el paseo en la simulación y para mostrarlo a los padres (panel e informes). No los utilizamos para publicidad, elaboración de perfiles, evaluaciones de salud ni para entrenar modelos de IA, no los vendemos y no los compartimos con terceros; solo nuestro proveedor de alojamiento (Hetzner, servidores en la UE) los almacena por cuenta nuestra. El uso que hacemos de los datos recibidos de Health Connect cumple la política de permisos de Health Connect, incluidos sus requisitos de uso limitado.",
                "Base jurídica y conservación: la lectura de los pasos es opcional y solo se produce con el permiso que concedes en el dispositivo; tratamos el total diario para prestar el servicio que has elegido (ejecución de un contrato). Los totales de pasos se incluyen en la exportación de datos de tu familia y se eliminan junto con el perfil de cuidador o con tu cuenta; desaparecen de nuestras copias de seguridad cifradas en un plazo máximo de 35 días.",
                "Puedes revocar el permiso en cualquier momento en los ajustes de tu dispositivo: iPhone → Ajustes → Salud → Acceso a datos y dispositivos → PetPrep; Android → Health Connect → Permisos de aplicaciones → PetPrep. El permiso del sensor de movimiento se puede revocar en los ajustes del teléfono para la aplicación PetPrep. A partir de entonces, el paseo deja de contar pasos nuevos.",
              ],
            },
            {
              heading: "4. Modo adaptado (impulsos de silla de ruedas)",
              paragraphs: [
                "El modo adaptado está pensado para niños que usan silla de ruedas: el paseo cuenta entonces impulsos de silla de ruedas en lugar de pasos. Llegará a la aplicación con la próxima actualización; a continuación describimos qué datos tratamos si un padre o una madre lo activa.",
                "Si un padre o una madre activa el modo adaptado para un niño, almacenamos únicamente el hecho de que está activado. No pedimos ni almacenamos ningún motivo, diagnóstico ni estado de salud.",
                "Mientras está activado, la aplicación del teléfono del niño lee únicamente impulsos de silla de ruedas en lugar de pasos, de Apple Health (registrados por un Apple Watch) o de Health Connect, con un permiso de solo lectura independiente. En ese caso no utiliza el sensor de movimiento. A nuestro servidor solo llega el número de impulsos del día; anotamos en ese día que se cuentan impulsos.",
                "Un padre o una madre puede registrar minutos de paseo para un niño en modo adaptado (solo para el día en curso). Almacenamos la fecha, el número de minutos y qué progenitor registró el paseo.",
                "Dado que el hecho de que el modo adaptado esté activado puede revelar el estado de salud de un niño, solo lo tratamos sobre la base de tu consentimiento explícito (art. 9, apartado 2, letra a, del RGPD), que otorgas como padre, madre o tutor legal en nombre del niño (art. 8 del RGPD) al activar el interruptor. Puedes desactivar el modo en cualquier momento; la aplicación vuelve entonces a contar pasos.",
                "Estos datos (el interruptor, los días contados en impulsos y los paseos registrados) se incluyen en la exportación de datos de tu familia y se eliminan junto con el perfil del niño o con tu cuenta; desaparecen de nuestras copias de seguridad cifradas en un plazo máximo de 35 días, como el resto de los datos.",
              ],
            },
            {
              heading: "5. Qué no recogemos",
              items: [
                "Ninguna ubicación: PetPrep no utiliza GPS.",
                "Ningún otro dato de salud de Apple Health o Health Connect aparte del recuento diario de pasos o de impulsos de silla de ruedas.",
                "Ninguna publicidad ni ningún SDK de publicidad o seguimiento de terceros en la aplicación.",
                "Ningún chat entre usuarios.",
                "Ninguna cookie publicitaria en este sitio web. Las cookies analíticas solo se instalan si las permites (consulta «Cookies» más abajo).",
              ],
            },
            {
              heading: "6. Por qué tratamos los datos (finalidades y bases jurídicas)",
              items: [
                "Para prestar el servicio que has solicitado: cuentas, la simulación, el panel, los informes y las notificaciones (ejecución de un contrato).",
                "Para tramitar las compras a través de App Store o Google Play (ejecución de un contrato).",
                "Para el paseo diario (totales diarios de pasos, datos de salud y actividad física; consulta el apartado 3): ejecución de un contrato; la lectura de Apple Health, Health Connect o el sensor de movimiento, solo con el permiso que concedes en el dispositivo.",
                "Para el modo adaptado (el hecho de que esté activado, los impulsos de silla de ruedas y los paseos registrados): el consentimiento explícito del padre o la madre, otorgado al activar el interruptor (art. 9, apartado 2, letra a, y art. 8 del RGPD; consulta el apartado 4).",
                "Para mantener la seguridad del servicio, por ejemplo limitando los intentos repetidos de inicio de sesión (interés legítimo).",
                "Para hacer funcionar y proteger el servicio mediante informes de errores de la aplicación que nos ayudan a corregir bloqueos y cierres inesperados (interés legítimo).",
                "Para cumplir obligaciones legales, como la contabilidad de las compras (obligación legal).",
                "Para enviarte correos electrónicos sobre el lanzamiento de PetPrep si te has apuntado a la lista de acceso anticipado (consentimiento; puedes darte de baja desde cualquier correo).",
                "Para entender cómo usan los visitantes este sitio web, con Google Analytics, solo si permites las cookies analíticas (consentimiento; puedes cambiarlo en cualquier momento en la configuración de cookies).",
              ],
            },
            {
              heading: "7. Niños",
              paragraphs: [
                "Solo un padre, una madre o un tutor legal puede crear una cuenta y añadir a un niño. El progenitor decide qué puede hacer el niño y puede eliminar el perfil del niño en cualquier momento. Nunca pedimos a un niño datos de contacto, nunca mostramos anuncios y nunca permitimos el contacto con desconocidos.",
                "El titular de la cuenta también puede crear un perfil de cuidador para sí mismo o para otro adulto de la familia, por ejemplo para comprobar si una raza le encaja antes de comprar o adoptar. A ese perfil se le aplican las mismas reglas y los mismos datos mínimos, y también todas las protecciones pensadas para los niños.",
              ],
            },
            {
              heading: "8. Imágenes y vídeos generados por IA",
              paragraphs: [
                "La foto y los vídeos cortos de cada mascota los crea un servicio de IA únicamente a partir de una descripción de la mascota (raza, pelaje, manchas y similares). La descripción nunca contiene nombres ni ninguna información sobre tu familia. Los archivos terminados se almacenan en nuestros propios servidores en la UE y se muestran mediante enlaces de corta duración.",
              ],
            },
            {
              heading: "9. Proveedores de servicios",
              items: [
                "Alojamiento: Hetzner Online (servidores en la UE).",
                "Generación de imágenes y vídeos con IA: fal.ai (solo recibe la descripción de la mascota).",
                "Notificaciones push: Apple Push Notification service y Firebase Cloud Messaging a través de Expo; las notificaciones no contienen nombres.",
                "Compras: Apple App Store y Google Play; gestión de compras a través de RevenueCat cuando las compras estén activas.",
                "Correos de acceso anticipado: Klaviyo (solo recibe la dirección de correo electrónico y el idioma que indicas en este sitio web).",
                "Consentimiento de cookies del sitio web: CookieYes (almacena tu elección de consentimiento).",
                "Analítica del sitio web: Google Analytics 4, de Google Ireland Ltd., solo con tu consentimiento; Google Analytics 4 no almacena las direcciones IP.",
              ],
            },
            {
              heading: "10. Cuánto tiempo conservamos los datos",
              paragraphs: [
                "Conservamos tus datos mientras exista tu cuenta. Cuando eliminas en la aplicación el perfil de un niño o tu cuenta, los datos se eliminan de inmediato y no se pueden recuperar; desaparecen automáticamente de nuestras copias de seguridad cifradas en un plazo máximo de 35 días. Los registros que la ley nos obliga a conservar (por ejemplo, de las compras) se conservan durante el plazo que exige la ley. Los informes de errores de la aplicación se eliminan automáticamente a los 30 días.",
              ],
            },
            {
              heading: "11. Tus derechos",
              paragraphs: [
                "Tienes derecho a acceder a tus datos, rectificarlos, exportarlos y suprimirlos, a oponerte a su tratamiento y a solicitar su limitación, así como a presentar una reclamación ante una autoridad de control; en Eslovenia, el Comisionado de Información (Informacijski pooblaščenec). En la aplicación puedes exportar todos los datos de tu familia en un archivo (Control → Account → Export my data, «Exportar mis datos») y eliminar el perfil de un niño o toda tu cuenta. Para cualquier otra cuestión, escribe a {privacyEmail}.",
              ],
            },
            {
              heading: "12. Seguridad",
              paragraphs: [
                "Las contraseñas y los códigos se almacenan como hash, las conexiones están cifradas, las actualizaciones en directo solo llegan a los miembros de tu familia y los archivos generados por IA se verifican antes de llegar a la pantalla de un niño.",
              ],
            },
            {
              heading: "13. Cambios",
              paragraphs: ["Te informaremos en la aplicación de los cambios importantes antes de que entren en vigor. La fecha que aparece arriba indica la versión más reciente."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Las cookies necesarias hacen que el sitio web funcione y recuerdan tu elección de consentimiento. Las cookies analíticas (Google Analytics) solo se instalan si las permites en el banner, y puedes cambiar tu elección en cualquier momento.",
            "La tabla siguiente se genera automáticamente a partir del último análisis de este sitio web, por lo que siempre muestra las cookies que utilizamos realmente.",
          ],
          settings: "Cambiar la configuración de cookies",
          fallback: "La lista de cookies se carga con el banner de consentimiento. Si no la ves, permite los scripts en esta página o escribe a {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Condiciones de uso",
      meta: {
        title: "Condiciones de uso — PetPrep",
        description:
          "Las condiciones de uso de la aplicación y el sitio web de PetPrep: cuentas y perfiles de niños, el reto de 12 semanas y el certificado, compras y reembolsos, contenido generado por IA, modo adaptado, uso adecuado, eliminación y legislación aplicable.",
      },
      eyebrow: "Legal",
      title: "Condiciones de uso",
      lead: "Traducción: la versión en inglés es la única vinculante. Las reglas para usar PetPrep, escritas para que se lean.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. El servicio",
              paragraphs: [
                "PetPrep lo presta {company}, {address}; {companyIds}, la misma empresa que es responsable del tratamiento según la política de privacidad. Estas condiciones se aplican a la aplicación PetPrep y al sitio web petprep.si.",
                "PetPrep es una simulación del cuidado de una mascota. Ayuda a familias y particulares a averiguar si están preparados para cuidar de una mascota real: a niños, y a adultos que quieren comprobar si una raza les encaja antes de comprar o adoptar. Es una herramienta educativa, no asesoramiento veterinario ni de ningún otro tipo profesional.",
              ],
            },
            {
              heading: "2. Cuentas, perfiles y niños",
              items: [
                "Las cuentas las crean adultos: padres, tutores legales o adultos que usan PetPrep para sí mismos. Al registrarte, aceptas estas condiciones y la política de privacidad.",
                "Los cuidadores (niños o adultos) cuidan de la mascota a través de un perfil de cuidador creado por el titular de la cuenta, que también puede crear uno para sí mismo. Un perfil solo necesita un apodo y, de forma opcional, un año de nacimiento; no necesitamos nada más sobre un niño, así que, por favor, no lo introduzcas en ninguna parte de la aplicación.",
                "Un niño inicia sesión con un código de 6 dígitos (PIN) que creas en tu aplicación. El código es de corta duración y solo funciona una vez; dáselo únicamente al niño al que va destinado.",
                "Como padre, madre o tutor legal, eres responsable de cómo usa tu hijo PetPrep: de si es adecuado para él, de cuánto tiempo le dedica y de que esté seguro durante los paseos (por ejemplo, en el tráfico). Puedes detener el juego de cualquier mascota en cualquier momento.",
                "Puedes invitar a otro progenitor a la familia con un código de invitación; ambos ven todos los datos de la familia y ambos pueden detener el juego.",
                "Facilita información exacta y mantén seguros tu contraseña, tus códigos y tus dispositivos.",
              ],
            },
            {
              heading: "3. El reto de 12 semanas, el Care Score y el certificado",
              items: [
                "El reto dura 12 semanas (84 días de programa) y empieza con la compra; cada cuidador tiene su propia fecha de finalización. El tiempo durante el que el juego espera el pago no cuenta para las 12 semanas.",
                "El Care Score (0–100) muestra qué parte de las rutinas previstas (comida, agua, limpieza, el paseo, una sesión de adiestramiento) ha realizado el propio cuidador; cada enfermedad de la mascota lo reduce. El tiempo en que el juego está detenido o la mascota está en el veterinario, así como las horas de silencio, nunca cuentan en contra del cuidador.",
                "Tras 12 semanas se registra una puntuación final que ya no cambia; el cuidado posterior al reto no la afecta. Con una puntuación de 70 o más puedes crear en la aplicación un Certificado de responsabilidad (PDF); por debajo de 70 recibes un informe del reto.",
                "Si la comida, el agua o la limpieza se mantienen al 0 % durante 24 horas, la mascota «se lleva al refugio» (fin del juego). El juego con esa mascota termina, no hay certificado y recibes un informe del reto.",
                "El Care Score y el certificado solo muestran cómo cuidó el cuidador de una mascota simulada en la aplicación. No garantizan que un niño, ni ninguna otra persona, esté preparado para una mascota real, no son una evaluación profesional y no sustituyen tu propio criterio ni el consejo de un veterinario, un criador o un refugio. La decisión sobre una mascota real es siempre tuya.",
                "Las reglas del juego (comidas, paseos y cuidados según la raza y la edad) están simplificadas y se basan en fuentes públicas. No son asesoramiento veterinario; consulta a un veterinario sobre la salud y el cuidado de un animal de verdad.",
              ],
            },
            {
              heading: "4. Funciones gratuitas y de pago, compras y reembolsos",
              items: [
                "El perro mestizo y el gato doméstico son gratuitos para siempre y son la forma de probar PetPrep; no existe una prueba gratuita del reto. Una mascota gratuita no tiene programa de 12 semanas ni certificado, el padre o la madre ve el historial de los últimos 7 días y la mascota tiene un conjunto básico de imágenes y vídeos.",
                "El Reto PetPrep de 12 semanas con una raza de pago es una compra única (49,99 € en Eslovenia; la tienda muestra el precio para tu país). Una compra equivale a un reto para una mascota; cada nuevo reto con una nueva mascota es una nueva compra. Los hermanos que cuidan de la misma mascota pagan una sola vez.",
                "El padre o la madre compra en su propia aplicación a través de App Store o Google Play; en la aplicación del niño no hay compras. La tienda procesa el pago según sus propias condiciones.",
                "Puedes crear una mascota del reto antes de comprarlo. Hasta que el reto esté pagado, el juego está en pausa: la mascota espera a salvo, sus necesidades no bajan y nada empeora. En cuanto compras, el juego continúa donde se detuvo.",
                "Los reembolsos los gestionan App Store y Google Play según sus propias normas; solicítalo en la tienda donde hiciste la compra. Si la tienda reembolsa una compra antes de que termine el reto, el juego de esa mascota vuelve a quedar en pausa. Las imágenes y los vídeos creados después de la compra se conservan.",
                "Tras un fin del juego (refugio), una compra no desbloquea la mascota; un nuevo reto es una nueva mascota y una nueva compra.",
                "Deseos (cosas para la mascota, cuando estén disponibles): un niño puede pedirlas, pero solo el padre o la madre puede comprarlas, en su propia aplicación. Un artículo comprado pertenece a la mascota para la que se compró y es solo estético: no afecta al juego, a la puntuación ni al certificado. Tras un fin del juego o cuando se elimina la mascota, la compra se considera consumida y no se reembolsa. Si la tienda reembolsa la compra, el artículo (en el caso de los premios, los premios no usados) se retira.",
                "Si eliminas una mascota, un niño o la cuenta mientras un reto comprado sigue en curso, la compra se considera consumida: no se traslada a otra mascota y la eliminación no supone un reembolso. La aplicación te avisa antes y te pide que lo confirmes.",
              ],
            },
            {
              heading: "5. Imágenes y vídeos generados por IA",
              items: [
                "Las imágenes y los vídeos de las mascotas los genera la inteligencia artificial (IA) únicamente a partir de una descripción de la mascota (raza, color, pelaje, etc.), nunca a partir de datos sobre tu familia. Son ilustraciones de una mascota simulada y pueden no coincidir exactamente con ningún animal real ni con ningún estándar de raza.",
                "Cuando los mostramos públicamente, como los retratos de razas de este sitio web, se indica que están generados por IA.",
                "Un aspecto no es necesariamente único: las mascotas de la misma raza de pago y del mismo color pueden compartir las mismas imágenes y vídeos, y las mascotas gratuitas reciben uno de los aspectos compartidos de su raza. Un reto de pago incluye un conjunto de vídeos más amplio que una mascota gratuita.",
                "Una vez firmado el contrato o realizada una compra, la preparación de las imágenes y los vídeos puede tardar unos minutos; mientras tanto, la aplicación muestra que la mascota se está preparando y marca lo que todavía no está listo.",
                "La información sobre razas de la aplicación y del registro de animales de este sitio web está resumida a partir de las fuentes públicas que citamos y no la ha verificado un veterinario.",
              ],
            },
            {
              heading: "6. Pasos, datos de salud y modo adaptado",
              items: [
                "El paseo diario cuenta los pasos reales del cuidador. Si lo permites, la aplicación los lee de Apple Health o Health Connect, solo en modo lectura (nunca escribe nada allí), o del sensor de movimiento del teléfono. Qué datos tratamos se describe en la política de privacidad (apartado 3).",
                "El modo adaptado está pensado para niños que usan silla de ruedas: el paseo cuenta entonces impulsos de silla de ruedas en lugar de pasos. Puedes usarlo si la función está disponible en tu versión de la aplicación. El padre o la madre lo activa para cada niño por separado; activarlo constituye tu consentimiento y desactivarlo lo retira (política de privacidad, apartado 4).",
                "En el modo adaptado, el padre o la madre puede registrar minutos de paseo para el niño, solo para el día en curso. Eres responsable de estos registros: registra solo paseos que hayan tenido lugar realmente, ya que cuentan para el Care Score y el certificado.",
                "PetPrep no utiliza la ubicación ni avisa de peligros durante un paseo; la seguridad de los paseos es responsabilidad tuya.",
              ],
            },
            {
              heading: "7. Notificaciones",
              paragraphs: [
                "Si lo permites en el dispositivo, la aplicación envía notificaciones push: recordatorios al cuidador, avisos a los padres cuando una mascota se queda sin comida, agua o limpieza, y noticias sobre enfermedades, el fin del juego y el final del reto. Las notificaciones nunca contienen el nombre del niño ni el de la mascota y no se envían durante las horas de silencio. Puedes retirar el permiso en cualquier momento en los ajustes del dispositivo; sin notificaciones, un cuidador puede saltarse rutinas, lo que afecta al juego y a la puntuación.",
              ],
            },
            {
              heading: "8. Uso adecuado",
              items: [
                "No intentes hacer trampas con el recuento de pasos o de impulsos, registrar paseos que no han tenido lugar, acceder a datos de otras familias, aplicar ingeniería inversa al servicio ni perturbar su funcionamiento.",
                "No pongas a las mascotas nombres ofensivos o inapropiados, ni introduzcas datos personales de un niño que la aplicación no pida.",
                "Podemos limitar o suspender las cuentas que incumplan estas reglas o pongan en riesgo a niños, y podemos eliminar un nombre de mascota inapropiado.",
              ],
            },
            {
              heading: "9. Propiedad intelectual",
              paragraphs: [
                "PetPrep, su logotipo, su diseño, su software y su contenido pertenecen a {company}. Puedes usar la aplicación, así como las imágenes, los vídeos y el certificado de tu mascota, para el uso personal y no comercial de tu familia; por ejemplo, para compartirlos con familiares.",
              ],
            },
            {
              heading: "10. Responsabilidad",
              paragraphs: [
                "Trabajamos para que PetPrep esté disponible y sea preciso, pero el servicio se presta tal cual; además, depende de servicios de terceros (las tiendas de aplicaciones, Apple Health, Health Connect, las notificaciones push, el servicio de IA) que no controlamos. En la medida en que lo permita la ley, no somos responsables de daños indirectos ni de las decisiones sobre la compra o adopción de una mascota real. Nada de lo dispuesto en estas condiciones limita los derechos que te corresponden como consumidor en virtud de la legislación imperativa.",
              ],
            },
            {
              heading: "11. Eliminación de la cuenta y fin del uso",
              paragraphs: [
                "Puedes eliminar el perfil de un niño o tu cuenta en cualquier momento en la aplicación. La eliminación es inmediata y definitiva; cuando el último progenitor de una familia elimina su cuenta, se elimina toda la familia. Antes puedes exportar tus datos (Control → Account → Export my data, «Exportar mis datos»). Lo que ocurre con los datos se describe en la política de privacidad; lo que ocurre con una compra se describe en el apartado 4.",
              ],
            },
            {
              heading: "12. Cambios en estas condiciones",
              paragraphs: [
                "Actualizamos estas condiciones cuando cambian la aplicación o la ley. Te informaremos en la aplicación de los cambios importantes antes de que entren en vigor. La fecha que aparece arriba indica la versión más reciente. Si no estás de acuerdo con un cambio, puedes eliminar tu cuenta en cualquier momento.",
              ],
            },
            {
              heading: "13. Legislación y litigios",
              paragraphs: [
                "Estas condiciones se rigen por la legislación de la República de Eslovenia. Los consumidores también pueden acogerse a las protecciones imperativas del país en el que residen y utilizar la plataforma de resolución de litigios en línea de la UE.",
              ],
            },
            {
              heading: "14. Contacto",
              paragraphs: [
                "Preguntas sobre estas condiciones: {termsEmail}. Prestador del servicio: {company}, {address}; {companyIds}. Preguntas sobre privacidad: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Seguridad infantil",
      meta: {
        title: "Seguridad infantil — cómo protege PetPrep a los niños",
        description:
          "Cómo protege PetPrep a los niños: cuentas creadas por los padres, inicio de sesión con código y sin correo electrónico, datos mínimos, sin anuncios ni chat, sin seguimiento de la ubicación, archivos verificados.",
      },
      eyebrow: "Confianza",
      title: "Pensado para los niños desde la primera línea de código.",
      lead: "Traducción: la versión en inglés es la única vinculante. El niño es el usuario principal de PetPrep, así que la seguridad y la privacidad son reglas del producto, no ajustes.",
      blocks: [
        {
          type: "cards",
          heading: "Nuestros estándares",
          columns: 2,
          items: [
            { title: "Los padres crean todas las cuentas", text: "Los niños no pueden registrarse por su cuenta. El padre o la madre añade al niño y genera un código de inicio de sesión de un solo uso, válido durante 15 minutos." },
            { title: "Sin correo ni contraseña para los niños", text: "El niño inicia sesión con el código de sus padres. Los códigos incorrectos, caducados y ya usados reciben la misma respuesta, así que nadie puede adivinar qué niños existen." },
            { title: "Datos mínimos", text: "Un apodo y, de forma opcional, un año de nacimiento. Sin apellidos, sin fecha de nacimiento, sin fotos del niño." },
            { title: "Sin anuncios, sin chat, sin desconocidos", text: "No hay publicidad ni ninguna forma de contactar con otros usuarios." },
            { title: "Sin seguimiento de la ubicación", text: "Los paseos solo cuentan pasos, de Apple Health o Health Connect (con tu permiso y solo en modo lectura) o del sensor de movimiento del teléfono. No se utiliza el GPS." },
            { title: "Actualizaciones en directo privadas", text: "Las actualizaciones en tiempo real solo llegan a los niños que cuidan de esa mascota y a los padres de la misma familia." },
            { title: "Archivos verificados", text: "Solo se muestran imágenes y vídeos creados para PetPrep y comprobados por nuestro servidor, desde nuestro propio almacenamiento en la UE." },
            { title: "Notificaciones sin nombres", text: "Las notificaciones nunca incluyen el nombre del niño ni el de la mascota, porque pueden aparecer en la pantalla de bloqueo." },
          ],
        },
        {
          type: "list",
          heading: "Los padres mantienen el control",
          items: [
            "Horas de silencio para el colegio y el sueño, sin notificaciones.",
            "Un botón de pausa que bloquea la pantalla del niño en directo.",
            "Cerrar la sesión de un niño en todos los dispositivos a la vez.",
            "Exportar o eliminar todos los datos al instante desde la aplicación.",
          ],
        },
        { type: "callout", title: "Comunica una preocupación", text: "Si algo de PetPrep te preocupa, escríbenos y te responderemos con prioridad.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Accesibilidad",
      meta: {
        title: "Accesibilidad — PetPrep para todos los niños",
        description:
          "Cómo se adapta PetPrep a los niños a los que les cuesta deslizar el dedo, que usan VoiceOver o TalkBack o que prefieren menos movimiento, con las mismas reglas y los mismos puntos para todos.",
      },
      eyebrow: "Confianza",
      title: "Todos los niños pueden cuidar de su mascota.",
      lead: "A algunos niños les cuesta deslizar el dedo, otros usan un lector de pantalla o prefieren menos movimiento en la pantalla. PetPrep se adapta a ellos, con las mismas reglas, los mismos puntos y el mismo certificado que todos los demás.",
      blocks: [
        {
          type: "cards",
          heading: "En la aplicación",
          columns: 3,
          items: [
            { title: "Gestos más sencillos", text: "En lugar de deslizar, el niño mantiene el dedo pulsado o pulsa un botón, en todos los juegos de deslizar: el cepillado, la caña con plumas, el cambio de arena y el lanzamiento de la pelota. El padre o la madre lo activa para cada niño en el área para padres." },
            { title: "Lectores de pantalla", text: "Con VoiceOver o TalkBack activados, los juegos pasan solos a la opción de mantener pulsado. La cabecera de la mascota lee en voz alta todo sobre la mascota, y cada paso de los juegos de cuidado es un botón propio." },
            { title: "Menos movimiento", text: "Cuando el teléfono está configurado para reducir el movimiento, los botones que laten y Curio, que se balancea, se quedan quietos." },
          ],
        },
        {
          type: "cards",
          heading: "Llega con la próxima actualización de la aplicación",
          items: [
            { title: "Paseos en silla de ruedas", text: "En el modo adaptado, los impulsos de silla de ruedas cuentan exactamente igual que los pasos: un impulso es un paso. El padre o la madre también puede registrar los minutos de paseo del día, para que el niño no tenga que hacer nada más. El padre o la madre lo activa para cada niño, y al desactivarlo se elimina la marca del historial." },
          ],
        },
        { type: "callout", title: "El mismo reto para todos", text: "Las adaptaciones cambian cómo juega un niño, nunca lo que cuenta. Las puntuaciones, los plazos y el Certificado de responsabilidad funcionan exactamente igual. Nunca preguntamos por qué un niño necesita una adaptación.", tone: "mint" },
        { type: "callout", title: "¿Hay algo que no le funciona a tu hijo?", text: "Cuéntanos qué se lo ha puesto difícil y lo revisaremos.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Eliminar cuenta",
      meta: {
        title: "Elimina tu cuenta y tus datos de PetPrep",
        description:
          "Cómo eliminar tu cuenta de PetPrep (Data Vallis) en la aplicación o por correo electrónico, qué datos se eliminan, qué se conserva y durante cuánto tiempo.",
      },
      eyebrow: "Confianza",
      title: "Elimina tu cuenta de PetPrep",
      lead: "Traducción: la versión en inglés es la única vinculante. PetPrep es un producto de Data Vallis. Puedes eliminar tu cuenta y los datos de tu familia en cualquier momento: al instante en la aplicación o por correo electrónico si ya no tienes la aplicación.",
      blocks: [
        {
          type: "steps",
          heading: "Elimina tu cuenta en la aplicación (al instante)",
          items: [
            { title: "Inicia sesión como padre o madre", text: "Abre PetPrep, toca «I’m a parent» («Soy padre o madre») e inicia sesión." },
            { title: "Abre tu cuenta", text: "Ve a Controls → Account. Opcional: toca antes «Export my data» («Exportar mis datos») para guardar una copia." },
            { title: "Elimina", text: "Toca «Delete account» («Eliminar cuenta»), confirma con tu contraseña (o con tu inicio de sesión de Google o Apple) y escribe DELETE; después toca «Delete for good» («Eliminar definitivamente»)." },
            { title: "Listo", text: "La eliminación es inmediata y no se puede deshacer. Se cierra la sesión en todos tus dispositivos y en los de tus hijos." },
          ],
        },
        {
          type: "prose",
          heading: "¿Ya no tienes la aplicación? Solicita la eliminación por correo electrónico",
          paragraphs: [
            "Escribe a [privacy@petprep.si](mailto:privacy@petprep.si) desde la dirección de correo electrónico de tu cuenta de padre o madre en PetPrep, con el asunto «Delete my account» («Eliminar mi cuenta»). Comprobamos que la solicitud procede del titular de la cuenta, eliminamos la cuenta en un plazo máximo de un mes (normalmente en pocos días) y te lo confirmamos por correo electrónico.",
            "Para eliminar solo el perfil de un niño, inicia sesión como padre o madre y abre el perfil del niño en Controls → Children → Delete profile («Eliminar perfil»).",
          ],
        },
        {
          type: "table",
          heading: "Qué se elimina y qué se conserva",
          head: ["Datos", "Qué ocurre"],
          rows: [
            ["Tu cuenta de padre o madre (nombre, correo electrónico, contraseña, vínculo con el inicio de sesión de Google o Apple)", "Se elimina de inmediato"],
            ["Si eres el único progenitor de la familia: perfiles de los niños (apodo, año de nacimiento), mascotas, imágenes y vídeos de IA, contratos y firmas, registro de cuidados, Care Scores, certificados, recuentos de pasos, horas de silencio, códigos de inicio de sesión", "Se eliminan de inmediato"],
            ["Si queda otro progenitor en la familia", "Solo se elimina tu cuenta; la familia sigue con el otro progenitor"],
            ["Dispositivos y tokens de notificación", "Se cierra la sesión y se eliminan de inmediato"],
            ["Registros de compras (producto, fecha, ID de transacción de la tienda, un ID de compra anónimo, sin nombre ni correo electrónico)", "Se conservan durante el tiempo que exige la normativa contable y fiscal, ya sin vínculo con tu familia"],
            ["Registros de costes de IA", "Se conservan a efectos contables sin ningún vínculo contigo, con tus hijos ni con tus mascotas"],
            ["Copias de seguridad cifradas", "Se eliminan automáticamente en un plazo de 35 días"],
          ],
          note: "Las compras en sí las gestionan App Store y Google Play; Apple y Google conservan sus registros según sus propias políticas. Un reto comprado pero no terminado no se reembolsa al eliminar la cuenta.",
        },
        { type: "callout", title: "¿Tienes preguntas?", text: "Escribe a privacy@petprep.si. Encontrarás los detalles en nuestra política de privacidad.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Registro de animales de PetPrep: especies y razas, con fuentes",
        description:
          "Perros, gatos y sus razas: qué necesita cada uno, a quién le encaja y cómo lo simula PetPrep. Busca y compara razas; cada dato enlaza a su fuente.",
      },
      navLabel: "Animales",
      eyebrow: "Registro de animales",
      title: "Conoce al animal antes de que llegue a casa.",
      lead:
        "Lo que de verdad necesita cada especie y cada raza de PetPrep, según clubes caninos, registros felinos, organizaciones veterinarias benéficas y estudios, con todas las fuentes enlazadas. Y, además, las reglas con las que PetPrep lo simula.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Sobre PetPrep: la empresa, el fundador y de dónde salen nuestros datos sobre animales",
        description:
          "Quién hace PetPrep: Data Vallis David Tacer s.p., de Dravograd (Eslovenia), su fundador David Tacer, nuestra misión y cómo el registro de animales obtiene y comprueba sus datos.",
      },
      navLabel: "Quiénes somos",
      eyebrow: "Quiénes somos",
      title: "Quién hace PetPrep.",
      lead: "PetPrep se hace en Maribor (Eslovenia), en una pequeña empresa de software. En esta página te contamos quiénes somos, por qué creamos PetPrep y cómo decidimos lo que la app y el registro de animales dicen sobre los animales.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "La empresa",
          paragraphs: [
            "PetPrep es un producto de Data Vallis David Tacer s.p., una empresa de desarrollo de software (empresario individual) con domicilio social en Dravograd (Eslovenia). Esta misma empresa gestiona este sitio web y la app PetPrep, y es la responsable del tratamiento de los datos personales (consulta la [política de privacidad](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "El fundador",
          paragraphs: [
            "PetPrep lo fundó David Tacer, desarrollador de software y emprendedor de Maribor (Eslovenia).",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Nuestra misión",
          paragraphs: [
            "En todas las familias se oye alguna vez «Te prometo que lo cuidaré yo». PetPrep convierte esa promesa en una prueba: durante 12 semanas, un niño (o un adulto que quiere una raza concreta) cuida de una mascota de IA realista con las necesidades diarias de un animal de verdad, y los padres ven cada día si el cuidado se mantiene.",
            "No superar la simulación también es un buen resultado: la familia lo descubre antes de que sufra un animal de verdad y antes de comprometerse a años de cuidados y gastos. Y cuando por fin llega a casa una mascota real, queremos que PetPrep siga siendo útil durante toda la vida del animal.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Cómo se elabora el registro de animales",
          intro: "El [registro de animales](page:animals) y la app usan los mismos datos. Estas reglas deciden qué puede decir:",
          items: [
            "Cada dato indica su fuente y enlaza a ella. Las fuentes se clasifican según el peso que merecen: A: estándares de raza, artículos revisados por pares y guías de asociaciones veterinarias; B: páginas de consejos de hospitales veterinarios, universidades y organizaciones nacionales de bienestar animal; C: resúmenes secundarios (enciclopedias, artículos de prensa), que solo se usan junto con una fuente A o B.",
            "Solo se presentan como datos los que tienen fuente. Un valor que ninguna fuente respalda no se publica. Cuando las fuentes no coinciden, se muestra cada una con su propio valor.",
            "Las reglas del juego no son consejos veterinarios. Cuando el juego necesita una cifra que las fuentes no dan con exactitud (por ejemplo, un objetivo diario de pasos), PetPrep la fija a partir de las fuentes y la muestra solo en «Cómo lo simula PetPrep», marcada como regla del juego.",
            "Las notas de salud son solo informativas. Resumen lo que dicen las fuentes sobre una raza y no las ha revisado ningún veterinario. Para un animal de verdad, consulta a tu veterinario.",
            "Los estándares de raza se resumen con nuestras propias palabras, nunca se copian en extenso, y nunca decimos que una raza es «hipoalergénica».",
            "El registro se genera a partir de los datos de investigación de PetPrep, los mismos que usa la app. Cuando cambia una fuente o un valor, el registro se vuelve a exportar y cada página de raza muestra la fecha de su última actualización. Si ves algún error, escríbenos a hello@petprep.si.",
          ],
        },
        { type: "callout", title: "¿Tienes preguntas sobre PetPrep?", text: "Escribe al buzón adecuado desde la página de contacto: familias, privacidad, socios o inversores.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Conoce a Curio, la mascota de PetPrep",
        description:
          "Curio es la mascota de PetPrep: el cubito curioso de nuestro logo y el protagonista de nuestros vídeos cortos. Quién es, en qué se diferencia de la mascota realista de la app, imágenes y kit de prensa.",
      },
      navLabel: "Conoce a Curio",
      eyebrow: "Nuestra mascota",
      title: "Conoce a Curio.",
      lead: "Curio es el cubito curioso del logo de PetPrep, que ha cobrado vida. Protagoniza nuestros vídeos cortos como la mascota que espera junto a la puerta a que alguien cumpla su promesa. Es nuestra mascota de marca, no el animal que cuidas en la app.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascota de PetPrep: un cubo suave de color grafito con grandes ojos blancos, una naricita frambuesa y un collar menta, saludando con la mano.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "¿Quién es Curio?",
          paragraphs: [
            "Curio empezó siendo el símbolo de nuestro logo: un cuadrado grafito de esquinas redondeadas, con dos grandes ojos que miran hacia arriba y a la derecha, y una naricita frambuesa. En esloveno lo llamamos Radovednež, «el curioso». En octubre de 2026 le salieron unos bracitos, unas patitas cortas y un collar menta con una chapa redonda, y se convirtió en un personaje.",
            "Curio no tiene boca. Todo lo que siente se le nota en los ojos: muy abiertos cuando alguien susurra «¿paseo?», dos rayitas soñolientas cuando todavía no ha vuelto nadie a casa, arcos felices cuando el cuenco está lleno.",
            "Curio no es niño ni niña, ni perro ni gato. Representa a todas las mascotas que esperan, cada día, a que alguien cumpla su promesa.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "Curio en pocas palabras",
          columns: 3,
          items: [
            { title: "Nombre", text: "Curio en inglés, Radovednež en esloveno." },
            { title: "Hecho de", text: "Grafito suave, un collar menta y una chapa frambuesa: los colores de PetPrep." },
            { title: "Habla", text: "Nunca. Solo con los ojos." },
            { title: "Le encanta", text: "Pasear, un cuenco lleno y los niños que vuelven el día 15." },
            { title: "Vive", text: "En nuestros vídeos cortos de [TikTok](https://www.tiktok.com/@petprep.si) e [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Su trabajo", text: "Recordar a las familias, con un guiño, que una mascota necesita cuidados todos los días." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "Curio no es la mascota de la app",
          intro: "En nuestros vídeos, Curio hace de mascota que necesita cuidados, porque todas los necesitan. En PetPrep, los niños (y los adultos que ponen a prueba una raza) cuidan de algo mucho más parecido a un animal de verdad.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "Curio, la mascota de dibujos animados, saludando sobre un fondo claro.",
              label: "Mascota de marca",
              title: "Curio, nuestra mascota",
              text: "Un personaje de dibujos para nuestros vídeos, pegatinas y esta página. Muestra de qué va PetPrep. No se puede adoptar.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Retrato realista generado con IA de un labrador retriever, tal como se ven las mascotas en la app PetPrep.",
              label: "En la app · imagen de IA",
              tone: "mint",
              title: "Tu mascota en PetPrep",
              text: "Una simulación realista con IA de una raza real, como este [labrador retriever](+breed:labrador_retriever), con las necesidades diarias de un animal de verdad: comidas, agua, paseos contados en pasos reales, limpieza y adiestramiento. Descubre [cómo funciona](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "Curio en imágenes",
          intro: "Curio es un personaje 3D estilizado, creado con herramientas de IA a partir de nuestro propio diseño. Las escenas nuevas aparecen primero en nuestros vídeos.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "Curio saludando sobre un fondo menta.", caption: "¡Hola! El saludo de siempre.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "Curio de pie en una estantería blanca, saludando.", caption: "En la estantería, esperando a alguien." },
            { src: "/curio/curio-character-sheet.webp", alt: "Curio de frente, de lado y de espaldas, con cuatro expresiones de los ojos.", caption: "Desde todos los ángulos, y cómo expresa sus sentimientos con los ojos." },
            { src: "/curio/curio-waving.webp", alt: "Curio sobre un fondo transparente.", caption: "Recortado y listo para tu publicación (consulta el kit de prensa).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Kit de prensa",
          intro: "Para creadores, periodistas y socios que escriben sobre PetPrep. Preguntas o ideas de colaboración: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Descargarlo todo", meta: "ZIP, 1,1 MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, fondo transparente", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, cuadrado, claro", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, cuadrado, menta", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Hoja de personaje", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logo de PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Símbolo de PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Cómo usar a Curio",
          rules: [
            "Usa a Curio en publicaciones, artículos y vídeos sobre PetPrep. Para anuncios, productos o merchandising, pregúntanos antes.",
            "Muestra a Curio tal como es: cubo grafito, ojos blancos, nariz frambuesa, collar menta. No le añadas boca, orejas, pelo ni cejas, y no cambies sus colores ni lo deformes.",
            "Curio es la mascota de marca de PetPrep. No lo presentes como la mascota de la app ni como un perro o un gato de verdad.",
            "No uses a Curio de forma que dé a entender que PetPrep respalda otro producto, causa o persona.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Preguntas sobre Curio",
          items: [
            { q: "¿Curio es un perro o un gato?", a: "Ninguna de las dos cosas. Curio es un cubito de nuestro logo. En los vídeos hace de mascota, pero no pertenece a ninguna especie." },
            { q: "¿Puede mi hijo cuidar de Curio en la app?", a: "No. En la app, tu familia cuida de una mascota realista de una raza real, con las mismas necesidades diarias que el animal de verdad. Curio solo aparece en nuestros vídeos y en la web." },
            { q: "¿Por qué Curio no tiene boca?", a: "Porque nuestro logo tampoco la tiene. Curio lo dice todo con los ojos, y nunca pide premios en voz alta." },
            { q: "¿Dónde puedo ver los nuevos vídeos de Curio?", a: "En TikTok e Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Consejos de cuidado: qué pueden comer perros y gatos, con fuentes | PetPrep",
        description:
          "Qué alimentos son tóxicos, arriesgados o aceptables para perros y gatos: el motivo, los síntomas y qué hacer, con todas las fuentes enlazadas. Hecho por PetPrep para familias que se preparan para tener una mascota.",
      },
      navLabel: "Consejos",
      eyebrow: "Consejos de cuidado",
      title: "¿Qué es seguro para tu mascota?",
      lead:
        "Respuestas claras y con fuentes para familias: qué alimentos son tóxicos, cuáles tienen riesgo y cuáles se pueden dar como premio, para perros y gatos, y pronto para más especies. Cada respuesta enlaza sus fuentes.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Dibujos para colorear de perros y gatos, gratis para imprimir | PetPrep",
        description:
          "Dibujos para colorear gratis e imprimibles: golden retriever, labrador, border collie, cachorro mestizo, gatito y Curio. PDF en A4 y US Letter, cada uno con un dato real sobre el cuidado de mascotas y su fuente.",
      },
      navLabel: "Dibujos para colorear",
      eyebrow: "Dibujos para colorear",
      title: "Dibujos para colorear gratis.",
      lead:
        "Perros, gatos y Curio para colorear o copiar: imprime una página o el cuadernillo entero. Cada página trae un dato real sobre el cuidado de mascotas, de una fuente veterinaria o de un club canino, para leerlo juntos.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Para niños que quieren una mascota: dibujos para colorear, Curio y #walkyourpet | PetPrep",
        description:
          "Todo lo que PetPrep tiene para niños: dibujos para colorear gratis con datos reales sobre el cuidado de mascotas, Curio, nuestra mascota de marca, y #walkyourpet, para que niños y padres se preparen juntos para tener una mascota.",
      },
      navLabel: "Para niños",
      eyebrow: "Para niños",
      title: "Para niños que quieren una mascota.",
      lead: "Dibujos para colorear e imprimir, Curio y #walkyourpet, para que niños y padres se preparen juntos para tener una mascota.",
      hero: { src: "/curio/curio-waving.webp", alt: "Curio, la mascota de PetPrep: un cubo suave de color grafito con grandes ojos blancos, una naricita frambuesa y un collar menta, saludando con la mano.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet: el movimiento que empezó con una niña de verdad",
        description:
          "«We could go walk your pet». Lo dijo una niña, y ahora es un movimiento: familias que salen a la calle porque una mascota necesita su paseo. Cómo empezó, qué significa en PetPrep y cómo sumarse.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Saca a pasear a tu mascota.",
      lead: "Esta frase no la inventamos nosotros. La dijo una niña. Ahora es una invitación para todas las familias: salir a la calle, porque una mascota necesita su paseo, ya sea una de verdad o la que cuidas para practicar en PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Tarjeta de historia de redes sociales: «Overheard at the founder's house» («Oído en casa del fundador»). Una niña dice «Lahko bi šli walk your pet» («Podríamos ir a walk your pet») y el título dice «#walkyourpet is a thing now» («#walkyourpet ya es una realidad»).", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Cómo empezó",
          paragraphs: [
            "En octubre de 2026, una amiga de los hijos de nuestro fundador estaba de visita en su casa. Estaban decidiendo si salir o no, y ella dijo, medio en esloveno y medio en inglés: «Lahko bi šli walk your pet», es decir, «Podríamos ir a walk your pet».",
            "Nadie se lo había pedido. Conocía PetPrep, donde el paseo de un perro solo cuenta si sales de verdad a la calle, y «walk your pet» se había convertido sin más en un motivo para salir. Nos gustó tanto que nos lo quedamos: en inglés, para todos los idiomas.",
            "Una conversación real. Niños reales.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "Qué significa en PetPrep",
          intro: "En PetPrep, el paseo diario del perro son los pasos reales de tu hijo, que se leen de Apple Health o de Health Connect si lo permites. Quedarse en el sofá no cuenta, así que «walk your pet» siempre significa salir a la calle. Sin GPS y sin ubicación: solo pasos.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Súmate al movimiento",
          intro: "Para esto no hace falta la app. Cualquier familia que sale a la calle por una mascota, de verdad o de práctica, forma parte de él.",
          items: [
            { title: "Sal a la calle", text: "Saca al perro a dar su paseo. O, si todavía estás decidiendo si tener una mascota, da el paseo que darías con ella." },
            { title: "Captura el momento", text: "Las zapatillas junto a la puerta, una correa, el camino, unas patas en la hierba. Sin caras y sin nombres." },
            { title: "Compártelo", text: "Publícalo con #walkyourpet y etiqueta a @petprep.si en Instagram o TikTok. Con tu permiso, podemos compartir los mejores momentos aquí y en nuestros perfiles." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Compartir con seguridad",
          intro: "#walkyourpet va de niños, así que estas reglas se aplican a todo lo que compartimos:",
          items: [
            "Publican los padres, no los niños. Solo un padre o una madre decide qué se sube a internet.",
            "Nada de caras, nombres, colegios ni direcciones de niños, y nunca el hijo de otra familia.",
            "Solo volvemos a publicar algo con el permiso de los padres, y lo retiramos en cuanto nos lo pidas.",
            "Las frases de los niños son siempre reales. Nunca inventamos ni «mejoramos» lo que ha dicho un niño.",
            "Es una invitación, no una obligación. Sin rachas que mantener, sin presión: solo un buen motivo para salir.",
          ],
        },
        {
          type: "callout",
          title: "El primer momento es nuestro. El siguiente puede ser el tuyo.",
          text: "Comparte el paseo de tu familia con #walkyourpet y etiqueta a @petprep.si. Preguntas o una historia que quieras contarnos: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Preguntas",
          items: [
            { q: "¿Necesito PetPrep para participar?", a: "No. Cualquiera que salga a la calle por una mascota puede usar #walkyourpet. PetPrep es donde nació la frase, y donde el paseo de un perro de práctica solo cuenta con pasos reales." },
            { q: "¿Funciona con gatos en PetPrep?", a: "Como paseo, no. Los gatos no salen a pasear, así que en PetPrep sus necesidades se cubren con juego, no con pasos. Los paseos son cosa de perros." },
            { q: "¿Por qué la frase está en inglés?", a: "Porque así la dijo la niña: en inglés, en mitad de una frase en esloveno. Los niños de todo el mundo mezclan idiomas, así que la frase se queda igual en todas las lenguas." },
            { q: "¿Vais a publicar fotos de mi hijo?", a: "Solo lo que compartas tú y nos permitas volver a publicar, y nunca la cara ni el nombre de un niño. Escríbenos a hello@petprep.si y lo retiramos." },
          ],
        },
      ],
    },
  },
};

export default es;
