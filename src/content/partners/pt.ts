import type { PartnerLocalePack } from "../partners.ts";

/** Português europeu (M6-S08). Tratamento formal com os parceiros. */
export const pt: PartnerLocalePack = {
  copy: {
    form: {
      heading: "Pedido de colaboração",
      intro: "Diga-nos quem é e o que tem em mente. Respondemos pessoalmente, normalmente em poucos dias úteis. Não enviamos e-mails automáticos.",
      company: "Empresa ou organização",
      contactName: "Pessoa de contacto",
      email: "Endereço de e-mail",
      type: "Tipo de colaboração",
      typePlaceholder: "Escolha…",
      message: "Mensagem",
      messageHint: "Uma breve descrição da sua ideia, do país e dos prazos.",
      types: {
        series: "Patrocínio da série «12 Weeks»",
        sponsored_content: "Conteúdo patrocinado em petprep.si",
        insurer: "Seguradora (encaminhamento de contactos em preparação)",
        directory: "Parceiro fundador do diretório",
        shelter: "Abrigo ou associação",
        other: "Outro",
      },
      consentBefore: "Aceito que a PetPrep trate os dados deste formulário para responder ao meu pedido, tal como descrito na ",
      consentLink: "política de privacidade",
      consentAfter: ".",
      submit: "Enviar pedido",
      sending: "A enviar…",
      successTitle: "Obrigado, recebemos o seu pedido.",
      successText: "Responderemos por e-mail.",
      errors: {
        company: "Indique a sua empresa ou organização.",
        contact_name: "Indique uma pessoa de contacto.",
        email: "Introduza um endereço de e-mail válido.",
        type: "Escolha um tipo de colaboração.",
        message: "Escreva uma mensagem breve.",
        consent: "Para enviar o formulário é necessário o seu consentimento.",
      },
      rateLimited: "Já enviou vários pedidos. Tente novamente dentro de alguns minutos.",
      invalid: "Há algo errado no formulário. Verifique os campos assinalados.",
      fallbackBefore: "De momento não é possível enviar o formulário. Escreva-nos para ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Números",
      intro: "Indicamos apenas o que pode ser verificado no produto. Situação a {date}.",
      breeds: "raças no registo de animais",
      breedsNote: "{dogs} raças de cães e {cats} raças de gatos, cada uma com a sua página e fontes citadas.",
      languages: "idiomas do site",
      languagesNote: "A aplicação está atualmente em esloveno e inglês.",
    },
  },
  kit: {
    htmlLang: "pt-PT",
    company: "PetPrep (empresa em constituição)",
    title: "Dossiê de imprensa",
    tagline: "Preparados para um animal. Ao seu lado a vida inteira.",
    what: {
      heading: "O que é a PetPrep",
      paragraphs: [
        "A PetPrep é uma aplicação com um registo de animais que ajuda a família a preparar-se para um cão ou um gato antes de o levar para casa. Num desafio de 12 semanas, a criança cuida de um animal virtual realista, enquanto os pais veem num painel como correm realmente os cuidados.",
        "O registo de raças explica o que cada animal precisa, com fontes citadas. Cada número pode ser rastreado até à fonte e todo o conteúdo de parceiros está identificado como tal.",
      ],
    },
    audience: {
      heading: "Público",
      paragraphs: [
        "Famílias prestes a decidir sobre um animal de companhia e adultos que querem testar se uma raça realmente lhes convém. O leitor já sabe que espécie e que raça está a estudar, por isso a atenção é concreta.",
      ],
    },
    coop: {
      heading: "Formas de colaboração",
      items: [
        ["Patrocínio da série «12 Weeks»", "Menção ao patrocinador no episódio e na respetiva descrição. O patrocinador não edita a série."],
        ["Conteúdo patrocinado em petprep.si", "Um artigo identificado como tal, junto à página de uma raça ou na base de conhecimento, sem influência no conteúdo nem nas fontes."],
        ["Seguradoras", "Patrocínio fixo ou pagamento por contacto encaminhado. Contactos apenas com o consentimento explícito dos pais. O encaminhamento de contactos está em preparação."],
        ["Parceiro fundador do diretório", "Veterinários, escolas de treino canino, tosquiadores, criadores: uma entrada em destaque. 190 € por ano, preço garantido, vagas limitadas por país."],
        ["Abrigos e associações", "Uma entrada gratuita e a possibilidade de recomendar a PetPrep a quem adota."],
      ],
    },
    examples: {
      heading: "Exemplos de conteúdo",
      items: [
        ["A aplicação", "Um desafio de 12 semanas com um animal virtual realista e um painel para os pais."],
        ["Registo de raças", "{breeds} raças ({dogs} cães, {cats} gatos) com fontes, situação a {date}."],
        ["Série «12 Weeks»", "Uma série de vídeo que acompanha 12 semanas de cuidados com um animal; um espaço para a menção de um patrocinador."],
      ],
    },
    never: {
      heading: "O que não fazemos",
      text: "Anúncios na aplicação infantil, venda de dados, promessas de saúde e promoção de raças cuja publicidade as associações veterinárias desaconselham.",
    },
    contact: { heading: "Contacto", text: "Escreva-nos para {email} ou use o formulário em {url}." },
    page: "Página",
  },
  page: {
    meta: {
      title: "Parceiros e patrocinadores – colabore com a PetPrep",
      description:
        "Patrocínio da série «12 Weeks», conteúdo patrocinado, seguradoras, parceiros fundadores do diretório, abrigos e associações. Tudo identificado, sem influência no conteúdo nem nas fontes.",
    },
    eyebrow: "Parceiros e patrocinadores",
    title: "Chegue às famílias mesmo antes de decidirem sobre um animal.",
    lead:
      "A PetPrep é uma aplicação e um registo de raças onde a família se prepara antes de levar um cão ou um gato para casa. Procuramos parceiros que se importem com a adoção responsável e que o digam abertamente, com a colaboração claramente identificada.",
    blocks: [
      {
        type: "prose",
        heading: "A quem se dirige a PetPrep",
        paragraphs: [
          "A PetPrep dirige-se a famílias prestes a decidir sobre um animal e a adultos que querem testar se uma raça realmente lhes convém. O nosso leitor não procura às cegas: já sabe que espécie e que raça está a estudar e, no [registo de animais](page:animals), lê o que esse animal precisa, com fontes citadas.",
          "Para um parceiro, é um momento raro. A decisão ainda não foi tomada, mas o interesse é concreto. Por isso, é importante para nós que cada colaboração esteja claramente identificada e nunca altere aquilo que as famílias leem.",
        ],
      },
      {
        type: "cards",
        heading: "Formas de colaborar",
        columns: 3,
        items: [
          { title: "Patrocínio da série «12 Weeks»", text: "A série acompanha 12 semanas de cuidados com um animal. O patrocinador é mencionado no episódio e na respetiva descrição; não edita a série." },
          { title: "Conteúdo patrocinado em petprep.si", text: "Um artigo junto à página de uma raça ou na base de conhecimento. Está sempre identificado como patrocinado e o patrocinador não tem qualquer influência na página nem nas fontes citadas." },
          { title: "Seguradoras", text: "Pagamento por contacto encaminhado ou um patrocínio fixo. Só passamos um contacto com o consentimento explícito dos pais e nunca dados de uma criança. O encaminhamento de contactos está em preparação e ainda não está disponível." },
          { title: "Parceiro fundador do diretório", text: "Para veterinários, escolas de treino canino, tosquiadores e criadores: uma entrada em destaque com logótipo, descrição e ligação. 190 € por ano; o preço fica garantido para os parceiros fundadores. As vagas são limitadas por país." },
          { title: "Abrigos e associações", text: "A entrada é gratuita. Pode recomendar a PetPrep a quem adota, para que chegue mais bem preparado à chegada do animal." },
        ],
      },
      {
        type: "list",
        heading: "O que não fazemos",
        items: [
          "Não mostramos anúncios na aplicação infantil.",
          "Não vendemos dados.",
          "Não fazemos promessas de saúde.",
          "Não promovemos raças cuja publicidade as associações veterinárias desaconselham.",
          "Não deixamos que um patrocinador influencie o conteúdo ou as fontes.",
        ],
      },
      { type: "partnerStats" },
      {
        type: "downloads",
        id: "media-kit",
        heading: "Dossiê de imprensa",
        intro: "Uma breve apresentação da PetPrep para parceiros e meios de comunicação: o que é a PetPrep, a quem se destina, formas de colaboração e exemplos de conteúdo.",
        items: [
          { href: "/media/petprep-media-kit-pt.pdf", label: "Dossiê de imprensa (português)", meta: "PDF" },
          { href: "/media/petprep-media-kit-en.pdf", label: "Dossiê de imprensa (inglês)", meta: "PDF" },
        ],
      },
      { type: "partnerForm" },
    ],
  },
};
