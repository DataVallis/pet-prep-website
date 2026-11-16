import type { PartnerLocalePack } from "../partners.ts";

/** Español (M6-S08). Trato de usted con los socios. */
export const es: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Solicitud de colaboración",
      intro: "Cuéntenos quién es y qué tiene en mente. Respondemos personalmente, normalmente en pocos días laborables. No enviamos correos automáticos.",
      company: "Empresa u organización",
      contactName: "Persona de contacto",
      email: "Correo electrónico",
      type: "Tipo de colaboración",
      typePlaceholder: "Elija una opción…",
      message: "Mensaje",
      messageHint: "Una breve descripción de su idea, el país y los plazos.",
      types: {
        series: "Patrocinio de la serie «12 Weeks»",
        sponsored_content: "Contenido patrocinado en petprep.si",
        insurer: "Aseguradora (derivación de contactos en preparación)",
        directory: "Socio fundador del directorio",
        shelter: "Protectora o asociación",
        other: "Otro",
      },
      consentBefore: "Acepto que PetPrep trate los datos de este formulario para responder a mi solicitud, tal como se describe en la ",
      consentLink: "política de privacidad",
      consentAfter: ".",
      submit: "Enviar solicitud",
      sending: "Enviando…",
      successTitle: "Gracias, hemos recibido su solicitud.",
      successText: "Le responderemos por correo electrónico.",
      errors: {
        company: "Indique su empresa u organización.",
        contact_name: "Indique una persona de contacto.",
        email: "Introduzca un correo electrónico válido.",
        type: "Elija un tipo de colaboración.",
        message: "Escriba un mensaje breve.",
        consent: "Para enviar el formulario necesitamos su consentimiento.",
      },
      rateLimited: "Ya ha enviado varias solicitudes. Inténtelo de nuevo en unos minutos.",
      invalid: "Algo en el formulario no es correcto. Revise los campos marcados.",
      fallbackBefore: "Ahora mismo no es posible enviar el formulario. Escríbanos a ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Cifras",
      intro: "Solo indicamos lo que se puede comprobar en el producto. Datos a {date}.",
      breeds: "razas en el registro de animales",
      breedsNote: "{dogs} razas de perros y {cats} razas de gatos, cada una con su propia página y sus fuentes citadas.",
      languages: "idiomas del sitio web",
      languagesNote: "Hoy la aplicación está en esloveno e inglés.",
    },
  },
  kit: {
    htmlLang: "es",
    company: "PetPrep (empresa en constitución)",
    title: "Dosier de prensa",
    tagline: "Listos para una mascota. Con ella toda la vida.",
    what: {
      heading: "Qué es PetPrep",
      paragraphs: [
        "PetPrep es una aplicación con un registro de animales que ayuda a una familia a prepararse para un perro o un gato antes de llevarlo a casa. En un reto de 12 semanas, el niño cuida de una mascota virtual realista, mientras que los padres ven en un panel cómo van realmente los cuidados.",
        "El registro de razas explica qué necesita cada animal, con fuentes citadas. Cada cifra se puede rastrear hasta su fuente y todo contenido de socios está señalado como tal.",
      ],
    },
    audience: {
      heading: "Público",
      paragraphs: [
        "Familias a punto de decidir si tener una mascota y adultos que quieren comprobar si una raza de verdad les conviene. El lector ya sabe qué especie y qué raza está estudiando, así que su atención es concreta.",
      ],
    },
    coop: {
      heading: "Formas de colaboración",
      items: [
        ["Patrocinio de la serie «12 Weeks»", "Mención del patrocinador en el episodio y en su descripción. El patrocinador no edita la serie."],
        ["Contenido patrocinado en petprep.si", "Un artículo señalado como tal junto a la página de una raza o en la base de conocimiento, sin influencia en el contenido ni en las fuentes."],
        ["Aseguradoras", "Patrocinio fijo o pago por contacto derivado. Solo con el consentimiento explícito de los padres. La derivación de contactos está en preparación."],
        ["Socio fundador del directorio", "Veterinarios, escuelas caninas, peluqueros, criadores: una ficha destacada. 190 € al año, precio garantizado, plazas limitadas por país."],
        ["Protectoras y asociaciones", "Una ficha gratuita y la posibilidad de recomendar PetPrep a quienes adoptan."],
      ],
    },
    examples: {
      heading: "Ejemplos de contenido",
      items: [
        ["La aplicación", "Un reto de 12 semanas con una mascota virtual realista y un panel para los padres."],
        ["Registro de razas", "{breeds} razas ({dogs} perros, {cats} gatos) con fuentes, datos a {date}."],
        ["Serie «12 Weeks»", "Una serie de vídeo que sigue 12 semanas de cuidado de una mascota; un lugar para la mención de un patrocinador."],
      ],
    },
    never: {
      heading: "Lo que no hacemos",
      text: "Anuncios en la aplicación infantil, venta de datos, promesas de salud y promoción de razas cuya publicidad desaconsejan las asociaciones veterinarias.",
    },
    contact: { heading: "Contacto", text: "Escríbanos a {email} o use el formulario en {url}." },
    page: "Página",
  },
  page: {
    meta: {
      title: "Socios y patrocinadores – colabore con PetPrep",
      description:
        "Patrocinio de la serie «12 Weeks», contenido patrocinado, aseguradoras, socios fundadores del directorio, protectoras y asociaciones. Todo señalado, sin influencia en el contenido ni en las fuentes.",
    },
    eyebrow: "Socios y patrocinadores",
    title: "Llegue a las familias justo antes de que decidan sobre una mascota.",
    lead:
      "PetPrep es una aplicación y un registro de razas donde una familia se prepara antes de llevar un perro o un gato a casa. Buscamos socios a quienes importe la tenencia responsable de animales y que quieran decirlo abiertamente, con la colaboración claramente señalada.",
    blocks: [
      {
        type: "prose",
        heading: "A quién se dirige PetPrep",
        paragraphs: [
          "PetPrep se dirige a familias a punto de decidir sobre una mascota y a adultos que quieren comprobar si una raza de verdad les conviene. Nuestro lector no busca a ciegas: ya sabe qué especie y qué raza está estudiando y, en el [registro de animales](page:animals), lee qué necesita ese animal, con fuentes citadas.",
          "Para un socio, este es un momento poco frecuente. La decisión aún no está tomada, pero el interés es concreto. Por eso nos importa que cada colaboración esté claramente señalada y nunca cambie lo que leen las familias.",
        ],
      },
      {
        type: "cards",
        heading: "Formas de colaborar",
        columns: 3,
        items: [
          { title: "Patrocinio de la serie «12 Weeks»", text: "La serie sigue 12 semanas de cuidado de una mascota. El patrocinador se menciona en el episodio y en su descripción; no edita la serie." },
          { title: "Contenido patrocinado en petprep.si", text: "Un artículo junto a la página de una raza o en la base de conocimiento. Siempre se señala como patrocinado y el patrocinador no tiene ninguna influencia en la página ni en sus fuentes citadas." },
          { title: "Aseguradoras", text: "Pago por contacto derivado o un patrocinio fijo. Solo pasamos un contacto con el consentimiento explícito de los padres y nunca datos de un menor. La derivación de contactos está en preparación y todavía no está disponible." },
          { title: "Socio fundador del directorio", text: "Para veterinarios, escuelas caninas, peluqueros y criadores: una ficha destacada con logotipo, descripción y enlace. 190 € al año; el precio queda garantizado para los socios fundadores. Las plazas están limitadas por país." },
          { title: "Protectoras y asociaciones", text: "La ficha es gratuita. Puede recomendar PetPrep a quienes adoptan para que lleguen mejor preparados a la llegada del animal." },
        ],
      },
      {
        type: "list",
        heading: "Lo que no hacemos",
        items: [
          "No mostramos anuncios en la aplicación infantil.",
          "No vendemos datos.",
          "No hacemos promesas de salud.",
          "No promocionamos razas cuya publicidad desaconsejan las asociaciones veterinarias.",
          "No dejamos que un patrocinador influya en el contenido ni en las fuentes.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Dosier de prensa",
        intro: "Un breve resumen de PetPrep para socios y medios: qué es PetPrep, a quién va dirigido, formas de colaboración y ejemplos de contenido.",
        items: [
          { href: "/media/petprep-media-kit-es.pdf", label: "Dosier de prensa (español)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Dosier de prensa (inglés)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
