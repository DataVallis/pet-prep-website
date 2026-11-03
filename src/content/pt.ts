import type { Dictionary } from "./types";

const pt: Dictionary = {
  meta: {
    siteTitle: "PetPrep – Prontos para um animal de estimação. Presentes durante toda a vida dele.",
    siteDescription:
      "O PetPrep é um simulador de animal de estimação com 12 semanas de duração que mostra aos pais se o filho está mesmo preparado para ter um animal a sério – e que depois passa a ser um assistente de IA para toda a vida do animal.",
    slogan: "Prontos para um animal de estimação. Presentes durante toda a vida dele.",
    keywords: [
      "o meu filho está preparado para um cão",
      "aplicação de responsabilidade com animais de estimação para crianças",
      "simulador de animal de estimação virtual",
      "simulador de animal de estimação com IA",
      "antes de ter um cão",
      "crianças e animais de estimação",
      "teste de preparação para ter um animal de estimação",
      "painel dos pais",
      "experimentar uma raça de cão antes de comprar",
      "esta raça é indicada para mim",
    ],
  },
  nav: { home: "Início", menu: "Menu", close: "Fechar menu", skip: "Saltar para o conteúdo" },
  lang: { label: "Idioma", switchTo: "Mudar de idioma" },
  cta: {
    primary: "Começa grátis com um cão sem raça definida",
    secondary: "Vê como funciona",
    earlyAccess: "Pede acesso antecipado",
    earlyAccessSubject: "Acesso antecipado ao PetPrep",
    ios: "Descarregar para iPhone",
    android: "Descarregar para Android",
    comingSoon: "Brevemente no iPhone e no Android",
    readMore: "Ler mais",
    contactUs: "Contacta-nos",
  },
  common: {
    planned: "Planeado",
    plannedNote:
      "Esta página descreve o que vamos construir a seguir. Ainda não está disponível na aplicação e os detalhes podem mudar.",
    legalDraft:
      "Este texto está a ser finalizado com os nossos consultores jurídicos antes do lançamento público. Contacta-nos se algo não estiver claro.",
    lastUpdated: "Última atualização",
    breadcrumbHome: "Início",
    screensNote: "Os ecrãs da aplicação mostrados neste site são pré-visualizações do produto; a aplicação final pode ter um aspeto ligeiramente diferente.",
    perPet: "por animal",
    free: "Gratuito",
    forever: "para sempre",
    notFoundTitle: "Esta página fugiu da trela.",
    notFoundText: "A página que procuras não existe ou mudou de sítio.",
    notFoundCta: "Voltar à página inicial",
  },
  footer: {
    tagline: "Prontos para um animal de estimação. Presentes durante toda a vida dele.",
    groups: [
      { title: "Produto", links: ["howItWorks", "parents", "animals", "care", "kids", "coloring", "afterAdoption", "pricing", "faq"] },
      { title: "Empresa", links: ["about", "curio", "walkyourpet", "partners", "investors", "contact"] },
      { title: "Confiança", links: ["privacy", "terms", "childSafety", "accessibility", "deleteAccount"] },
    ],
    rights: "Todos os direitos reservados.",
    dataEu: "Dados guardados na UE.",
    languages: "Mais idiomas brevemente.",
    company: "O PetPrep é um produto da",
    cookieSettings: "Definições de cookies",
    a11yBadge: { title: "Jogo acessível", text: "Gestos mais fáceis · Leitores de ecrã · Menos movimento" },
  },
  screens: {
    pin: "A criança entra com um código de 6 dígitos dado pelo pai ou pela mãe – sem e-mail nem palavra-passe.",
    contract: "O Contrato de responsabilidade, assinado com o dedo. A assinatura dá vida ao animal.",
    hud: "O ecrã inicial da criança: o estado do animal em direto, quatro necessidades e os botões de cuidados.",
    picker: "Os pais escolhem o animal: raça, origem (adotado ou de um criador) e idade à chegada.",
    parent: "O painel dos pais: um semáforo, o Care Score e as rotinas de hoje de cada filho.",
    report: "O relatório de 7, 30 ou 84 dias de uma criança: rotinas, passeios e tarefas esquecidas, dia a dia.",
    assistant: "Quando ele chega a casa: o assistente de IA transforma os dados da coleira numa sugestão clara.",
    certificate: "Ao fim de 12 semanas: o Certificado de responsabilidade com o Care Score da criança.",
  },
  pricingPlans: {
    free: {
      name: "Cão sem raça definida",
      text: "A simulação completa com um cão sem raça definida realista.",
      features: [
        "Simulação de 12 semanas com consequências reais",
        "Passeios reais, contados em passos reais pelo telemóvel",
        "Painel dos pais, semáforo e Care Score",
        "Horas de silêncio e botão de pausa",
        "Imagem fotorrealista do teu animal e vídeos curtos",
      ],
      cta: "Começa grátis",
    },
    challenge: {
      name: "O Desafio PetPrep de 12 semanas",
      badge: "12 semanas + certificado",
      unit: "por animal · 12 semanas",
      text: "Para as famílias que querem a experiência completa e um certificado no fim.",
      features: [
        "Tudo o que está incluído no Cão sem raça definida",
        "Raças exigentes, como o [border collie](breed:border_collie)",
        "Os estados de espírito do teu animal em vídeos de IA",
        "Certificado de responsabilidade",
        "Um só preço quando os irmãos partilham um animal",
        "Acesso para o pai e para a mãe",
      ],
      cta: "Escolhe o desafio",
    },
    note:
      "As compras são feitas na aplicação, através da App Store ou do Google Play. Um segundo animal na mesma família é um desafio à parte. Os preços incluem IVA, quando aplicável.",
  },
  earlyAccess: {
    title: "Pede acesso antecipado",
    text: "Sê uma das primeiras famílias a experimentar o PetPrep. Enviamos-te um e-mail quando estiver pronto – e mais nada.",
    label: "O teu endereço de e-mail",
    placeholder: "tu@exemplo.pt",
    button: "Pedir acesso antecipado",
    sending: "A enviar…",
    successTitle: "Já estás na lista.",
    successText: "Obrigado! Serás dos primeiros a receber um e-mail quando o PetPrep estiver pronto.",
    invalid: "Introduz um endereço de e-mail válido.",
    error: "Algo correu mal. Tenta de novo daqui a instantes.",
    consent: "Ao subscrever, aceitas receber e-mails sobre o PetPrep. Podes cancelar a subscrição a qualquer momento.",
    privacyLink: "Política de privacidade",
  },
  contactCards: [
    { title: "Famílias", text: "Perguntas sobre a aplicação, a tua conta ou o desafio.", email: "hello" },
    { title: "Privacidade", text: "Acesso, exportação ou eliminação de dados, ou qualquer dúvida sobre privacidade.", email: "privacy" },
    { title: "Parceiros", text: "Lojas de animais, associações de proteção animal, veterinários, treinadores, seguradoras e escolas.", email: "partners" },
    { title: "Investidores", text: "Resumo para investidores, apresentação e data room mediante pedido.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep – O teu filho está preparado para um animal? Descobre em 12 semanas.",
      description:
        "Antes de um animal a sério chegar a casa, o teu filho cuida durante 12 semanas de um animal de IA realista: refeições, limpeza, passeios reais. Vês todos os dias se está mesmo preparado.",
    },
    hero: {
      eyebrow: "O Desafio PetPrep de 12 semanas",
      title: "Prontos para um animal de estimação. Presentes durante toda a vida dele.",
      lead:
        "Antes de um animal a sério chegar a casa, o teu filho cuida durante 12 semanas de um animal de IA realista – dá-lhe de comer, limpa o que ele suja e leva-o a passeios reais. Vês todos os dias se está mesmo preparado.",
      trust: ["Cão sem raça definida gratuito para sempre", "Sem anúncios nem conversas com desconhecidos", "As crianças não precisam de e-mail"],
    },
    phone: {
      petName: "Luna",
      petAge: "Cachorra · 3 meses",
      live: "EM DIRETO",
      video: "Vídeo fotorrealista do animal de IA",
      actions: ["Comida", "Água", "Passeio", "Limpar"],
    },
    parentCard: { child: "Inês", status: "Tudo bem", scoreLabel: "Care Score", progress: "Semana 3 de 12 · 31 de 36 rotinas a horas" },
    notification: { app: "PetPrep", text: "O teu animal está a olhar para a tigela da comida. A hora do pequeno-almoço termina às 9h00." },
    promoVideo: {
      eyebrow: "O PetPrep num minuto",
      title: "Vê como funciona.",
      text: "Da escolha do animal e da assinatura do contrato até à escola, aos passeios, à escovagem e ao certificado – tudo o que o teu filho faz em 12 semanas e tudo o que vês no painel. O Curio, a nossa mascote, só vem dizer olá; o animal da aplicação é um cão de IA realista.",
      alt: "Vídeo promocional do PetPrep: ecrãs da aplicação, uma criança a cuidar de um cão, um pai a acompanhar o Care Score.",
      note: "O vídeo está em inglês. A aplicação ainda não está disponível ao público na App Store nem no Google Play – inscreve-te para teres acesso antecipado.",
    },
    promise: {
      quote: "Todas as famílias já ouviram «Prometo que tomo conta dele». O PetPrep transforma a promessa numa",
      highlight: "prova",
      text:
        "Falhar na simulação é um sucesso para a tua família: descobres-o antes de um animal a sério sofrer – e antes de assumires anos de cuidados e despesas.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Três passos do «por favor» ao «pronto».",
      steps: [
        {
          title: "Tu escolhes o animal",
          text: "Cria uma conta familiar, adiciona o teu filho só com uma alcunha e escolhe o animal – a raça, se é adotado ou de um criador, cachorro ou sénior.",
        },
        {
          title: "O teu filho assina a promessa",
          text: "Um código de 6 dígitos dá acesso ao teu filho – sem e-mail nem palavra-passe. Ele assina o Contrato de responsabilidade com o dedo e nasce o seu animal, único no mundo.",
        },
        {
          title: "12 semanas de cuidados a sério",
          text: "Uma semana real é um mês da vida do animal. No fim: um Certificado de responsabilidade com o Care Score – uma prova objetiva ou um «não» honesto.",
        },
      ],
      link: "Como funciona em pormenor",
    },
    realism: {
      title: "Tão perto de um animal a sério quanto uma aplicação consegue.",
      text: "Os horários das refeições, os passeios e o crescimento baseiam-se em fontes como associações veterinárias e clubes de canicultura – não foram inventados para um jogo.",
      items: [
        { title: "Passeios reais, passos reais", text: "O passeio diário conta os passos no telemóvel do teu filho. Hoje não houve passeio nenhum? O animal sente-o amanhã." },
        { title: "Cresce", text: "Um cachorro come quatro vezes por dia, depois três, depois duas – e ganha uma fotografia nova à medida que cresce." },
        { title: "Porta-se como um animal a sério", text: "Os cachorros precisam de ir à rua. Os cães aborrecidos roem chinelos. E as poças vêm antes do jantar." },
        { title: "Respeita a escola e o sono", text: "As horas de silêncio suspendem os lembretes. Uma refeição que calha durante a escola é tarefa tua, não do teu filho." },
        { title: "Consequências reais, com cuidado", text: "Se houver descuido, o animal vai ao veterinário ou ao abrigo – nunca de forma assustadora e sempre com um novo começo." },
        { title: "Único no mundo", text: "Cada animal tem a sua pelagem, as suas manchas e os seus olhos – fotorrealista e nunca igual a outro." },
      ],
    },
    parents: {
      eyebrow: "Para os pais",
      title: "Vês a verdade, em direto.",
      text: "Um semáforo claro para cada filho, um Care Score feito das rotinas cumpridas a horas e uma cronologia de quem fez o quê. Os irmãos que partilham um animal têm, cada um, a sua pontuação justa.",
      points: [
        { strong: "Horas de silêncio e botão de pausa", text: "o controlo continua a ser teu." },
        { strong: "As crianças entram com um código", text: "sem e-mail, sem apelido, sem anúncios." },
        { strong: "Pai e mãe, todos os filhos", text: "uma família, uma só visão." },
      ],
      link: "Tudo o que os pais veem",
    },
    adults: {
      eyebrow: "Para adultos",
      title: "Experimenta a raça antes de a levares para casa.",
      text: "Apaixonaste-te por uma raça em particular? O PetPrep não é só para crianças. Durante 12 semanas cuidas de um animal de IA dessa raça, com as suas necessidades diárias reais – e descobres se é mesmo para ti, antes de comprares ou adotares.",
      points: [
        {
          strong: "As necessidades reais da raça",
          text: "refeições em janelas horárias, água, limpeza e uma meta diária de passos baseada em necessidades de exercício documentadas: um border collie adulto precisa de 12\u00a0000 passos por dia, um cão sem raça definida de 6000.",
        },
        {
          strong: "Treino e acidentes de cachorro",
          text: "uma pequena sessão de treino todos os dias e um cachorro que só se aguenta cerca de uma hora por cada mês de idade antes de ter de ir à rua – senão, há uma poça no chão.",
        },
        {
          strong: "12 semanas mostram se a raça se encaixa na tua vida",
          text: "nos teus dias de trabalho, no teu tempo livre e com o tempo que faz lá fora. Como vai ser o cão da família, podes juntar mais tarde o teu companheiro ou a tua companheira, ou os teus filhos.",
        },
      ],
      how: "Como começar: cria uma conta como pai ou mãe, adiciona-te como perfil de cuidador e entra com o código de 6 dígitos – no mesmo telemóvel ou noutro.",
      note: "Disponível hoje: o cão sem raça definida e o gato doméstico gratuitos, e todas as raças de cães e gatos do [registo de animais](page:animals) no desafio de 12 semanas.",
      link: "Como usar o PetPrep só para ti",
    },
    after: {
      eyebrow: "Quando ele chega a casa",
      title: "Quando chega o animal a sério, o PetPrep fica.",
      text: "Toca em «Já temos um animal a sério» e o simulador transforma-se num assistente de IA para os anos que aí vêm – já a conhecer o ritmo da tua família.",
      features: [
        { title: "Coleira inteligente", text: "Atividade e alertas quando algo não está bem." },
        { title: "Primeiro contacto com IA", text: "Responde depressa e depois encaminha-te para um veterinário a sério." },
        { title: "Crescimento e alimentação", text: "Peso semanal, curva de crescimento, quando mudar de ração." },
        { title: "Parceiros de confiança", text: "Veterinários, treinadores e seguradoras perto de ti – claramente identificados." },
        { title: "Teste de ADN", text: "Que raças há no teu cão sem raça definida – e a que deves estar atento." },
        { title: "Ficha para o veterinário", text: "Mistura de raças e resultados do ADN num só sítio, prontos para o veterinário." },
      ],
      link: "Sobre o assistente de IA",
      planned: "Em desenvolvimento",
    },
    species: {
      title: "Cães e gatos hoje. Mais espécies a caminho.",
      text: "Feito para famílias de todo o mundo, na sua própria língua.",
      chips: [
        { label: "Cão · disponível", active: true, link: "species:dog" },
        { label: "Gato · disponível", active: true, link: "species:cat" },
        { label: "Raças de cães e gatos · no desafio", link: "page:animals" },
        { label: "Mais espécies · planeado", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Preços", title: "Preços simples e justos." },
    faq: { title: "Perguntas que os pais fazem", link: "Todas as perguntas" },
    final: { title: "Prontos para um animal de estimação?", text: "Descobre em 12 semanas. Começa grátis, no iPhone ou no Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "Como funciona o PetPrep – o desafio de 12 semanas para saber se estão prontos para um animal de estimação",
        description:
          "Como funciona o desafio PetPrep de 12 semanas: escolher o animal, o Contrato de responsabilidade, os cuidados diários, passeios reais, horas de silêncio e o certificado.",
      },
      eyebrow: "Como funciona",
      title: "Doze semanas que mostram quanto vale uma promessa.",
      lead:
        "O teu filho cuida de um animal de IA fotorrealista que se comporta como um animal a sério, tanto quanto uma aplicação o permite. Uma semana real equivale a um mês da vida do animal, por isso em 12 semanas o animal cresce – e vês se os cuidados se mantêm.",
      blocks: [
        {
          type: "steps",
          heading: "Do primeiro toque ao certificado",
          items: [
            { title: "O pai ou a mãe cria a família", text: "Registas-te com o teu e-mail (o início de sessão com a Apple e a Google está a caminho). Adicionas cada filho com uma alcunha e, se quiseres, o ano de nascimento. É tudo o que perguntamos sobre o teu filho." },
            { title: "Tu escolhes o animal", text: "Escolhes a raça (o cão sem raça definida é gratuito), a origem do animal – adotado num abrigo ou comprado a um criador – e a idade à chegada: cachorro, jovem, adulto ou sénior." },
            { title: "O teu filho entra com um código", text: "Recebes um código de 6 dígitos válido durante 15 minutos. O teu filho escreve-o no telemóvel dele – sem e-mail nem palavra-passe. Se o telemóvel se perder, termina a sessão em todos os dispositivos com um toque." },
            { title: "O Contrato de responsabilidade", text: "O teu filho assina uma promessa com o dedo. A assinatura é o nascimento do animal: as necessidades começam a contar a partir desse momento, por isso não se perde nada se assinar mais tarde." },
            { title: "Doze semanas de cuidados", text: "Alimentação nas janelas horárias certas, água fresca, limpeza e um passeio diário com passos reais. À medida que o animal cresce, as necessidades mudam." },
            { title: "O certificado", text: "Ao fim de 12 semanas o animal faz um ano. O teu filho recebe um Certificado de responsabilidade com o seu Care Score – ou descobrem os dois, em segurança, que ainda não é a altura certa." },
          ],
        },
        {
          type: "screens",
          heading: "O que o teu filho vê",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "Do que precisa um cão adulto sem raça definida todos os dias",
          intro: "Os números vêm de fontes veterinárias e de clubes de canicultura; quando as fontes só indicam um intervalo, o PetPrep fixa o valor e di-lo claramente.",
          head: ["Necessidade", "Com que frequência", "Se for esquecida"],
          rows: [
            ["Comida", "Manhã (6–10) e noite (17–21), uma vez por janela", "Fome ao fim de cerca de 12,5 horas"],
            ["Água", "3 vezes por dia, com pelo menos 3 horas de intervalo", "Sede ao fim de cerca de 10 horas"],
            ["Passeio", "6000 passos reais (os cachorros começam com 2000)", "Nenhum passeio → doente na manhã seguinte"],
            ["Limpeza", "Quando o animal suja – nunca durante as horas de silêncio", "Sem comida nem água até a sujidade ser limpa"],
          ],
          note: "Os cachorros comem 4, depois 3, depois 2 vezes por dia e só se aguentam cerca de uma hora por cada mês de idade. Um [border collie](breed:border_collie) precisa de 12\u00a0000 passos e fica com fome mais depressa.",
        },
        {
          type: "cards",
          heading: "Pensado para a vida real em família",
          columns: 3,
          items: [
            { title: "Horas de silêncio", text: "Define os horários da escola e do sono. O animal abranda, não são enviados lembretes e nunca aparece sujidade nessas horas." },
            { title: "Refeições durante a escola", text: "Uma janela de alimentação que calha toda dentro das horas de silêncio fica a cargo dos pais – nunca conta contra o teu filho." },
            { title: "Pausa a qualquer momento", text: "Um botão põe o jogo em pausa, por exemplo para uma conversa em família. Nada piora durante a pausa." },
            { title: "Lembretes gentis", text: "Primeiro, o animal chama suavemente a atenção do teu filho; depois, com mais urgência. Só recebes um alarme se uma necessidade ficar a zero durante uma hora." },
            { title: "Consequências reais", text: "O descuido significa 12 horas no veterinário. Um dia inteiro de descuido significa que o abrigo fica com o animal – e podem recomeçar." },
            { title: "Animais partilhados", text: "Os irmãos podem partilhar um animal. Cada ação é atribuída à criança que a fez, por isso a pontuação continua justa." },
          ],
        },
        {
          type: "callout",
          title: "Falhar também é um resultado.",
          text: "Se o animal acabar no abrigo virtual, aprenderam algo valioso – antes de um animal a sério pagar o preço. Podem recomeçar, também com uma raça mais fácil.",
          tone: "dark",
        },
      ],
    },
    parents: {
      meta: {
        title: "Para os pais – o painel do PetPrep, o Care Score e os controlos",
        description:
          "O que os pais veem no PetPrep: um semáforo diário por filho, o Care Score, rotinas, relatórios, notificações, horas de silêncio, pausa e privacidade desde a conceção.",
      },
      eyebrow: "Para os pais",
      title: "Uma prova objetiva, não mais uma promessa.",
      lead:
        "Não vais ter de adivinhar se os passeios aconteceram mesmo. O PetPrep mede os cuidados com base em rotinas diárias claras e mostra-te, filho a filho, como está a correr.",
      blocks: [
        {
          type: "cards",
          heading: "O semáforo",
          intro: "Cada filho e cada animal recebe uma cor para o dia de hoje, na hora local da tua família – sempre com o motivo explicado por palavras.",
          columns: 3,
          items: [
            { title: "Verde – tudo bem", text: "As rotinas estão em dia.", tag: "ok" },
            { title: "Amarelo – precisa de atenção", text: "Hoje falharam mais de duas rotinas.", tag: "warn" },
            { title: "Vermelho – urgente", text: "O animal ficou doente hoje, uma necessidade está a zero há mais de uma hora ou o animal foi para o abrigo.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "O Care Score",
          paragraphs: [
            "Care Score = rotinas cumpridas a horas ÷ rotinas previstas × 100, menos 10 pontos por cada doença, e o resultado fica sempre entre 0 e 100.",
            "Uma rotina é uma tarefa concreta: cada janela de alimentação, cada uma das três mudanças de água, limpar cada sujidade no prazo de duas horas (a escola e o sono não contam) e atingir a meta diária do passeio.",
            "O tempo em que puseste o jogo em pausa, em que o animal esteve no veterinário ou antes de o contrato ser assinado nunca conta contra o teu filho. Os dias passados ficam fechados, por isso uma pontuação não pode ser reescrita mais tarde.",
            "Os irmãos que partilham um animal dividem cada rotina de forma justa. Só contam as ações de cada criança – se uma fizer tudo, fica com 100 e a outra com 0.",
          ],
        },
        {
          type: "screens",
          heading: "O que tu vês",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "O controlo continua a ser teu",
          items: [
            "Horas de silêncio para a escola e o sono, na tua hora local – também quando muda a hora de verão.",
            "Põe o jogo em pausa para qualquer animal com um toque confirmado; o ecrã do teu filho bloqueia em direto.",
            "Convida o outro pai ou a outra mãe com um código de utilização única; os dois veem todos os filhos e todos os animais.",
            "Termina a sessão de um filho em todos os dispositivos se um telemóvel se perder; os códigos só podem ser usados uma vez e expiram ao fim de 15 minutos.",
            "Exporta todos os dados da tua família num ficheiro, ou elimina o perfil de um filho ou a tua conta inteira de imediato na aplicação.",
          ],
        },
        {
          type: "list",
          heading: "Privacidade desde a conceção",
          items: [
            "As crianças entram com um código – sem e-mail, sem palavra-passe, sem apelido.",
            "Guardamos uma alcunha e, se a acrescentares, o ano de nascimento. Mais nada sobre o teu filho.",
            "As notificações nunca incluem o nome do teu filho nem do animal, porque podem aparecer no ecrã de bloqueio.",
            "Os passos vêm do Apple Health (iPhone) ou do Health Connect (Android), se o permitires (só leitura), e do sensor de movimento do telemóvel, quando disponível. O PetPrep não usa GPS nem segue a localização.",
            "Sem anúncios, sem conversas com desconhecidos, servidores na UE.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "Quando ele chega a casa – o assistente de IA do PetPrep para o teu animal a sério",
        description:
          "Quando a tua família tem um animal a sério, o PetPrep torna-se um assistente de IA: atividade da coleira inteligente, alertas, primeiro contacto com IA e com um veterinário a sério, crescimento e alimentação.",
      },
      eyebrow: "Quando ele chega a casa",
      title: "A simulação acaba. Os cuidados não.",
      lead:
        "Quando a tua família leva um animal a sério para casa, um toque transforma o PetPrep num assistente para toda a vida do animal – em tempo real, sem barras de saúde e já a conhecer a rotina da tua família.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "O que o assistente vai fazer",
          columns: 2,
          items: [
            { title: "Integração com coleiras inteligentes", text: "Liga localizadores GPS e monitores de atividade populares – ou uma coleira PetPrep – e vê a atividade em contexto." },
            { title: "Alertas que explicam", text: "«O Max correu hoje 2\u00a0km, metade do habitual, e comeu uma refeição maior. Um passeio extra à noite vai ajudá-lo a acalmar.» Uma observação, um motivo, uma sugestão." },
            { title: "Primeiro a IA, depois um veterinário a sério", text: "Faz uma pergunta ou envia uma fotografia. O assistente responde a perguntas gerais, avalia a urgência e encaminha-te para um veterinário a sério quando é preciso – os sinais urgentes vão diretamente para um veterinário." },
            { title: "Teste de ADN para o teu cão ou gato", text: "Encomenda um teste de ADN na aplicação ou carrega o resultado de um que já tenhas. O PetPrep mostra que raças há na mistura, o que é típico delas e que problemas de saúde são mais comuns nessas raças – com fontes. As percentagens de raça não são um diagnóstico e um teste de ADN não mostra alergias." },
            { title: "Uma ficha para o veterinário", text: "A mistura de raças e eventuais resultados diretos do ADN numa só página ou código QR, para o teu veterinário saber logo o que há num cão ou gato sem raça definida." },
            { title: "Crescimento e nutrição", text: "Regista o peso todas as semanas, vê a curva de crescimento e recebe um lembrete quando for altura de mudar de ração." },
          ],
        },
        {
          type: "screens",
          heading: "Uma antevisão",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Princípios de que não abdicamos",
          items: [
            "O assistente de IA não é um veterinário e nunca faz um diagnóstico. Cada resposta sobre saúde inclui uma forma de chegar a um veterinário a sério.",
            "As ofertas de parceiros (lojas, seguradoras, treinadores, veterinários) estão sempre identificadas e dizemos quando recebemos uma comissão.",
            "Nada é partilhado com um parceiro sem o teu consentimento.",
            "Os dados do teu filho no desafio só passam para o assistente se concordares.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Preços – o PetPrep é gratuito para começar, 49,99\u00a0€ pelo desafio de 12 semanas",
        description:
          "O cão sem raça definida é gratuito para sempre. O Desafio PetPrep de 12 semanas custa 49,99\u00a0€ por animal, numa compra única. Um só preço para os irmãos que partilham um animal.",
      },
      eyebrow: "Preços",
      title: "Preços simples e justos.",
      lead: "Começa grátis com um cão sem raça definida. Compra o desafio completo de 12 semanas quando for o momento certo – as 12 semanas começam com a compra.",
      blocks: [
        { type: "pricing" },
        {
          type: "table",
          id: "wishes",
          heading: "Desejos – coisas para o teu animal",
          intro:
            "Na aplicação, o teu filho pede coisas para o animal; tu decides e compras. O teu filho nunca vê preços. Os artigos são só estéticos: nunca alteram as necessidades, o Care Score nem o certificado. Também disponíveis para o cão sem raça definida e o gato doméstico gratuitos.",
          head: ["Artigo", "Preço"],
          rows: [
            ["Cama (gato: cesto)", "5,99\u00a0€"],
            ["Tigelas para comida e água", "5,99\u00a0€"],
            ["Brinquedo (cão: corda ou brinquedo que chia; gato: rato de peluche ou cana com penas)", "5,99\u00a0€ por brinquedo"],
            ["Guloseimas, pacote de 10", "2,99\u00a0€"],
            ["Pacote de boas-vindas: cama + tigelas + brinquedo", "15,99\u00a0€ (em vez de 17,97\u00a0€)"],
          ],
          note: "Os Desejos chegam com a próxima atualização da aplicação; podem ser comprados assim que os artigos estiverem disponíveis na App Store e no Google Play. Os preços são os da Eslovénia; a loja mostra o preço do teu país.",
        },
        {
          type: "faq",
          heading: "Perguntas sobre preços",
          items: [
            { q: "A versão gratuita é mesmo gratuita?", a: "Sim. O cão sem raça definida é gratuito para sempre, com a simulação completa, passeios reais e o painel dos pais." },
            { q: "O que inclui o desafio?", a: "Raças exigentes como o [border collie](breed:border_collie), os estados de espírito do teu animal em vídeos de IA, o Certificado de responsabilidade no fim e acesso para o pai e para a mãe." },
            { q: "Os irmãos pagam duas vezes?", a: "Não. As crianças que partilham um animal pagam um só preço. Um segundo animal na família é um desafio à parte." },
            { q: "Como pago?", a: "Na aplicação, através da App Store ou do Google Play. Os reembolsos são tratados pela tua conta da loja." },
            { q: "O que são os Desejos, e o meu filho pode comprar coisas sozinho?", a: "O teu filho pode pedir uma cama, tigelas, um brinquedo ou guloseimas para o animal – até três pedidos abertos de cada vez. Recebes uma notificação e compras ou escolhes «Agora não». O teu filho nunca vê preços e não pode comprar nada na aplicação da criança." },
            { q: "Os artigos comprados tornam o jogo mais fácil?", a: "Não. Os artigos são só estéticos. Nunca alteram as necessidades, o Care Score nem o certificado, e nos Desejos não há veterinário nem medicamentos – nunca «paga para salvar o teu animal»." },
            { q: "É igual para adultos?", a: "Sim. Se usares o PetPrep sozinho para experimentar uma raça, aplica-se o mesmo: o cão sem raça definida é gratuito para sempre e o desafio de 12 semanas custa 49,99\u00a0€ por animal." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "Perguntas frequentes – o que os pais perguntam sobre o PetPrep",
        description:
          "Respostas sobre o PetPrep: tempo diário, uso por adultos, privacidade e localização, passos, irmãos, o que acontece se a criança falhar, idiomas, espécies, animais a sério.",
      },
      eyebrow: "Perguntas frequentes",
      title: "Perguntas que os pais fazem.",
      lead: "Respostas curtas e honestas. Falta alguma coisa? Escreve-nos.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Para que idades é o PetPrep?", a: "Foi pensado para crianças dos 7 aos 12 anos, aproximadamente, e funciona bem até aos 16. Os adultos também o usam, para testar se uma raça em particular é mesmo para eles antes de comprarem ou adotarem." },
            { q: "Posso usar o PetPrep sem crianças?", a: "Sim. Cria uma conta como pai ou mãe e adiciona-te como perfil de cuidador – basta uma alcunha; deixa o ano de nascimento em branco. Escolhe a raça, cria um código de 6 dígitos e depois, no mesmo telemóvel ou noutro, escolhe «I’m a kid» («Sou criança») e escreve o código – é assim que passas a ser o cuidador. Como vai ser o cão da família, podes juntar mais tarde o teu companheiro ou a tua companheira, ou os teus filhos, para cuidarem dele juntos. O preço é o mesmo das famílias." },
            { q: "Quanto tempo exige por dia?", a: "Alguns minutos para a comida, a água e a limpeza – mais o passeio de que um cão a sério precisaria de qualquer forma." },
            { q: "A aplicação segue a localização do meu filho?", a: "Não. Para os passeios, só conta passos. Se o permitires, lê-os do Apple Health (iPhone) ou do Health Connect (Android) – só leitura e só passos; quando disponível, usa também o sensor de movimento do telemóvel. Pede autorização no ecrã do passeio. Não usa GPS." },
            { q: "O meu filho precisa de um endereço de e-mail?", a: "Não. Tu crias a conta; o teu filho entra com um código de 6 dígitos que tu geras. Só guardamos uma alcunha e, se quiseres, o ano de nascimento." },
            { q: "O que acontece se o meu filho se esquecer?", a: "Primeiro o animal envia lembretes gentis. Se uma necessidade ficar a zero, o animal adoece e passa 12 horas no veterinário. Depois de um dia inteiro sem cuidados, o abrigo virtual fica com ele – e podem recomeçar." },
            { q: "Os irmãos podem partilhar um animal?", a: "Sim. Cada criança assina o seu próprio contrato, cada ação é atribuída a quem a fez e cada criança tem o seu próprio Care Score, justo." },
            { q: "E a escola e a hora de dormir?", a: "Define horas de silêncio. O animal abranda, não é enviado nada e as refeições que calham totalmente nas horas de silêncio ficam a teu cargo." },
            { q: "É assustador para as crianças?", a: "Não. As consequências são reais, mas suaves: o animal vai ao veterinário ou para o abrigo, nunca há nada chocante e há sempre um novo começo." },
            { q: "Que animais estão disponíveis?", a: "[Cães](species:dog) e [gatos](species:cat) hoje: um cão sem raça definida e um gato doméstico gratuitos e, no desafio de 12 semanas, todas as raças do [registo de animais](page:animals), que indica também as suas necessidades com fontes. Estão planeadas mais espécies." },
            { q: "Em que idiomas?", a: "Hoje a aplicação está em inglês e em esloveno. Vão chegar mais idiomas à medida que o PetPrep for lançado em novos países." },
            { q: "O que acontece depois de termos um animal a sério?", a: "O PetPrep pode tornar-se um assistente de IA para o teu animal a sério. Esta parte está em desenvolvimento." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Parceiros – trabalha com o PetPrep",
        description:
          "O PetPrep trabalha com lojas de animais, abrigos, veterinários, treinadores, seguradoras, fabricantes de coleiras e escolas para ajudar as famílias a ter animais de forma responsável.",
      },
      eyebrow: "Parceiros",
      title: "Famílias mais bem preparadas para todos os que gostam de animais.",
      lead:
        "As famílias que terminam o PetPrep sabem o que um animal exige a sério. Estamos a construir uma rede de parceiros que vai ao encontro delas no momento certo – com identificação clara e sempre com o consentimento da família.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Com quem trabalhamos",
          columns: 3,
          items: [
            { title: "Lojas de animais", text: "Chega às famílias no momento em que provam que estão prontas – por exemplo, com uma oferta de kit inicial junto ao certificado." },
            { title: "Abrigos, associações de resgate e criadores", text: "Recomenda o PetPrep antes da adoção ou da compra, para haver menos decisões impulsivas e menos devoluções." },
            { title: "Veterinários", text: "Quando o animal a sério chega a casa, o assistente de IA responde às primeiras perguntas e encaminha os donos para ti, com um resumo do caso partilhado apenas com consentimento." },
            { title: "Treinadores e escolas de treino canino", text: "Recomendações e marcações quando uma família passa para um cão a sério." },
            { title: "Seguradoras de animais", text: "Ofertas adequadas à raça quando um animal a sério é registado – claramente identificadas." },
            { title: "Fabricantes de coleiras e IoT", text: "Integração dos dados de atividade para alertas mais inteligentes e explicados." },
          ],
        },
        {
          type: "list",
          heading: "Porque é que os parceiros confiam em nós",
          items: [
            "As crianças entram sem e-mail e mantemos os seus dados no mínimo, em servidores na UE.",
            "Só chega ao ecrã de uma criança conteúdo verificado; não há anúncios.",
            "Todas as ofertas de parceiros estão identificadas e todas as comissões são comunicadas à família.",
          ],
        },
        { type: "callout", title: "Vamos conversar.", text: "Os termos de parceria estão a ser preparados. Diz-nos quem és e o que tens em mente.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Investe no PetPrep – da preparação para um animal aos cuidados para toda a vida",
        description:
          "O PetPrep transforma a promessa de uma criança numa prova antes de a família ter um animal e depois torna-se um assistente de IA para toda a vida dele. Pré-lançamento; resumo mediante pedido.",
      },
      eyebrow: "Investidores",
      title: "De um desafio de 12 semanas a uma relação de 10–15 anos.",
      lead:
        "O PetPrep dá aos pais uma prova objetiva de que o filho está ou não preparado para um animal a sério – e depois fica com a família durante toda a vida do animal.",
      blocks: [
        {
          type: "cards",
          heading: "A oportunidade",
          columns: 3,
          items: [
            { title: "Problema", text: "As crianças prometem cuidar de um animal; os pais não têm uma forma neutra de o testar antes de investirem dinheiro e anos de cuidados." },
            { title: "Solução", text: "Uma simulação realista de 12 semanas com um painel dos pais em direto e um Care Score objetivo, que termina com um Certificado de responsabilidade." },
            { title: "Expansão", text: "Quando o animal a sério chega a casa, um assistente de IA para ele: dados da coleira, primeiro contacto com IA e veterinários, crescimento e nutrição, testes de ADN, serviços de parceiros." },
          ],
        },
        {
          type: "table",
          heading: "Modelo de negócio",
          head: ["Fonte de receita", "Modelo", "Estado"],
          rows: [
            ["Cão sem raça definida", "Gratuito para sempre (aquisição)", "Decidido"],
            ["Desafio PetPrep de 12 semanas", "49,99\u00a0€ por animal, compra única", "Decidido"],
            ["Desejos – coisas para o animal (só estéticas)", "Compras na aplicação: 5,99\u00a0€ por artigo, guloseimas a 2,99\u00a0€ por 10, pack a 15,99\u00a0€; também na versão gratuita", "Desenvolvido; compra na loja em breve"],
            ["Ofertas de parceiros", "Comissões de lojas, seguradoras, veterinários e treinadores", "Planeado"],
            ["Assistente de IA para o animal a sério", "Subscrição", "Planeado"],
            ["Testes de ADN para cães e gatos", "Venda de testes e comissão de parceiros", "Planeado"],
          ],
        },
        {
          type: "list",
          heading: "O que já está construído",
          items: [
            "Motor de jogo no servidor com sincronização em tempo real, testado com simulações de dias inteiros, dias de mudança da hora e casos-limite familiares.",
            "Famílias com vários pais, vários filhos e animais partilhados, com uma pontuação justa por criança.",
            "Animais de IA fotorrealistas e únicos, com custos de IA medidos e limitados, e ficheiros multimédia guardados nos nossos próprios servidores na UE.",
            "Necessidades dos animais baseadas em fontes veterinárias e de clubes de canicultura citadas, com cada número rastreável até à sua fonte.",
            "Segurança infantil desde a conceção: acesso por PIN sem e-mail, dados mínimos, sem anúncios, só conteúdos multimédia verificados.",
          ],
        },
        {
          type: "prose",
          heading: "Fase",
          paragraphs: [
            "O PetPrep está em pré-lançamento, com uma beta fechada planeada. O primeiro mercado é a Eslovénia e a região, seguindo-se a região DACH e o Reino Unido; o produto foi pensado desde o primeiro dia para ser localizado em qualquer país.",
            "Fundador: David Tacer, programador de software e empreendedor (Data Vallis David Tacer s.p., Dravograd, Eslovénia). Mais [sobre nós](page:about).",
          ],
        },
        { type: "callout", title: "Pede o resumo para investidores.", text: "Partilhamos o resumo, a apresentação e o data room mediante pedido.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contactar o PetPrep – famílias, privacidade, parceiros, investidores",
        description: "Contacta o PetPrep: perguntas de famílias, pedidos sobre privacidade, parcerias e contactos de investidores. Respondemos em inglês ou em esloveno.",
      },
      eyebrow: "Contacto",
      title: "Lemos todas as mensagens.",
      lead: "Escreve para a caixa de correio certa e respondemos assim que pudermos, em inglês ou em esloveno.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Dados da empresa" }],
    },
    privacy: {
      navLabel: "Privacidade",
      meta: {
        title: "Política de privacidade – PetPrep",
        description: "Como o PetPrep recolhe, utiliza e protege os dados pessoais de pais e crianças, e como exercer os teus direitos ao abrigo do RGPD.",
      },
      eyebrow: "Informação legal",
      title: "Política de privacidade",
      lead: "Tradução: apenas a versão inglesa é vinculativa. O PetPrep foi feito sobretudo para crianças, por isso recolhemos o mínimo possível e explicamos exatamente o que fazemos com esses dados.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Quem é o responsável",
              paragraphs: [
                "O responsável pelo tratamento dos dados pessoais tratados através da aplicação PetPrep e deste site é {company}, {address}; {companyIds}. Contacto para questões de privacidade: {privacyEmail}.",
              ],
            },
            {
              heading: "2. O que recolhemos",
              items: [
                "Conta do pai ou da mãe: nome (como a tua família te chama), endereço de e-mail, palavra-passe (guardada apenas como hash seguro), o fuso horário do teu dispositivo e o momento em que aceitaste os termos e esta política.",
                "Perfil de cuidador (uma criança ou um adulto que cuida do animal): uma alcunha com até 30 caracteres e, opcionalmente, o ano de nascimento – deixado em branco no caso de um adulto. Sem e-mail, palavra-passe, apelido nem data de nascimento.",
                "Dispositivos: o modelo do telemóvel (por exemplo, «iPhone», nunca um nome que o utilizador tenha dado ao telemóvel) e, para as notificações, um token push, a plataforma e a versão da aplicação.",
                "Atividade de cuidados: ações na simulação (alimentação, água, limpeza, passeios), totais diários de passos (ou totais de impulsos da cadeira de rodas no modo adaptado – ver secções 3 e 4), pontuações e relatórios.",
                "O Contrato de responsabilidade: a assinatura da criança feita com o dedo, guardada como linha vetorial com a hora da assinatura.",
                "Códigos: os códigos de acesso e de convite são guardados apenas como hashes e expiram.",
                "Relatórios de erros da aplicação: se a aplicação bloquear ou falhar, pode enviar um breve relatório técnico para o nosso servidor na UE (tipo e texto do erro, localização no código, versão da aplicação e do sistema operativo, nome do ecrã, papel de pai/mãe ou criança). Não contém nome, endereço de e-mail, ID de utilizador nem endereço IP, não é partilhado com terceiros e é eliminado ao fim de 30 dias.",
                "Lista de acesso antecipado (este site): o teu endereço de e-mail, o idioma da página e o momento em que te inscreveste.",
              ],
            },
            {
              heading: "3. Dados de saúde e de condição física (passos, Apple Health e Health Connect)",
              paragraphs: [
                "O PetPrep acede a um único tipo de dados de saúde e de condição física e recolhe-o: quantos passos o cuidador dá por dia (atividade física). Usamo-lo para uma única funcionalidade – o passeio diário do animal na simulação: a criança caminha e os seus passos contam como o passeio do animal.",
                "Como acedemos: a aplicação no telemóvel da criança conta os passos. Se o permitires na janela de autorização do sistema, lê-os do Apple Health (iPhone) ou do Health Connect (Android) – só leitura e só passos. Quando disponível, usa também o sensor de movimento do telemóvel (Android: autorização «Atividade física»; iPhone: «Movimento e condição física»); sem autorização para o Apple Health ou o Health Connect, conta apenas o sensor de movimento.",
                "O que recolhemos: a aplicação envia ao nosso servidor apenas o total de passos de hoje, a sua origem (Apple Health, Health Connect ou o sensor de movimento) e a hora do envio. Guardamos um total diário por perfil de cuidador – nunca movimentos individuais, percursos, localização, frequência cardíaca, sono, peso ou quaisquer outros dados de saúde. Nunca escrevemos nada no Apple Health nem no Health Connect.",
                "Como os usamos e partilhamos: os totais de passos são usados apenas para o passeio na simulação e para o mostrar aos pais (painel e relatórios). Não os usamos para publicidade, definição de perfis, avaliações de saúde ou treino de modelos de IA, não os vendemos e não os partilhamos com terceiros; apenas o nosso fornecedor de alojamento (Hetzner, servidores na UE) os guarda em nosso nome. A nossa utilização dos dados recebidos do Health Connect cumpre a política de autorizações do Health Connect, incluindo os seus requisitos de utilização limitada.",
                "Fundamento jurídico e conservação: a leitura dos passos é opcional e só acontece com a autorização que dás no dispositivo; tratamos o total diário para prestar o serviço que escolheste (execução de um contrato). Os totais de passos estão incluídos na exportação de dados da tua família e são eliminados juntamente com o perfil de cuidador ou com a tua conta; saem das nossas cópias de segurança encriptadas, no máximo, em 35 dias.",
                "Podes revogar a autorização a qualquer momento nas definições do dispositivo: iPhone → Definições → Saúde → Acesso a dados e dispositivos → PetPrep; Android → Health Connect → Autorizações de apps → PetPrep. A autorização do sensor de movimento pode ser revogada nas definições do telemóvel para a aplicação PetPrep. A partir daí, o passeio deixa de contar passos novos.",
              ],
            },
            {
              heading: "4. Modo adaptado (impulsos da cadeira de rodas)",
              paragraphs: [
                "O modo adaptado destina-se a crianças que usam cadeira de rodas: o passeio passa a contar impulsos da cadeira de rodas em vez de passos. Chega à aplicação com a próxima atualização; abaixo descrevemos que dados tratamos se um pai ou uma mãe o ativar.",
                "Se um pai ou uma mãe ativar o modo adaptado para um filho, guardamos apenas o facto de estar ativado. Não pedimos nem guardamos um motivo, diagnóstico ou condição de saúde.",
                "Enquanto está ativado, a aplicação no telemóvel da criança lê apenas os impulsos da cadeira de rodas em vez dos passos – do Apple Health (registados por um Apple Watch), com uma autorização própria, só de leitura. No Android, a aplicação não lê impulsos; em vez disso, um pai ou uma mãe regista os minutos de passeio. Nesse caso não usa o sensor de movimento. Só o número de impulsos de hoje chega ao nosso servidor; registamos nesse dia que se contam impulsos.",
                "No modo adaptado, um pai ou uma mãe pode registar minutos de passeio de um filho (apenas para o dia de hoje). Guardamos a data, o número de minutos e qual dos pais registou o passeio.",
                "Como o facto de o modo adaptado estar ativado pode indicar uma condição de saúde da criança, só o tratamos com base no teu consentimento explícito (artigo 9.º, n.º 2, alínea a), do RGPD), que dás como pai, mãe ou representante legal em nome da criança (artigo 8.º do RGPD) ao ativar o interruptor. Podes desativar o modo a qualquer momento; a aplicação volta então a contar passos.",
                "Estes dados (o interruptor, os dias contados em impulsos e os passeios registados) estão incluídos na exportação de dados da tua família e são eliminados juntamente com o perfil da criança ou com a tua conta; saem das nossas cópias de segurança encriptadas, no máximo, em 35 dias, tal como todos os outros dados.",
              ],
            },
            {
              heading: "5. O que não recolhemos",
              items: [
                "Nenhuma localização: o PetPrep não usa GPS.",
                "Nenhuns outros dados de saúde do Apple Health ou do Health Connect além do número diário de passos ou de impulsos da cadeira de rodas.",
                "Nenhuma publicidade e nenhum SDK de publicidade ou de rastreio de terceiros na aplicação.",
                "Nenhuma conversa entre utilizadores.",
                "Nenhum cookie de publicidade neste site. Os cookies analíticos só são instalados se os permitires (ver Cookies abaixo).",
              ],
            },
            {
              heading: "6. Porque tratamos os dados (finalidades e fundamentos jurídicos)",
              items: [
                "Para prestar o serviço que pediste: contas, a simulação, o painel, relatórios e notificações (execução de um contrato).",
                "Para processar compras através da App Store ou do Google Play (execução de um contrato).",
                "Para o passeio diário (totais diários de passos – dados de saúde e de condição física, ver secção 3): execução de um contrato; leitura do Apple Health, do Health Connect ou do sensor de movimento apenas com a autorização que dás no dispositivo.",
                "Para o modo adaptado (o facto de estar ativado, os impulsos da cadeira de rodas e os passeios registados): o consentimento explícito do pai ou da mãe, dado ao ativar o interruptor (artigo 9.º, n.º 2, alínea a), e artigo 8.º do RGPD – ver secção 4).",
                "Para manter o serviço seguro, por exemplo limitando tentativas repetidas de início de sessão (interesse legítimo).",
                "Para operar e proteger o serviço com relatórios de erros da aplicação que nos ajudam a corrigir bloqueios e falhas (interesse legítimo).",
                "Para cumprir obrigações legais, como a contabilidade das compras (obrigação legal).",
                "Para te enviar e-mails sobre o lançamento do PetPrep, se te inscreveste na lista de acesso antecipado (consentimento – podes cancelar a subscrição em qualquer e-mail).",
                "Para perceber como os visitantes usam este site, com o Google Analytics, apenas se permitires os cookies analíticos (consentimento – podes alterá-lo a qualquer momento em Definições de cookies).",
              ],
            },
            {
              heading: "7. Crianças",
              paragraphs: [
                "Só um pai, uma mãe ou um representante legal pode criar uma conta e adicionar uma criança. Os pais decidem o que a criança pode fazer e podem eliminar o perfil da criança a qualquer momento. Nunca pedimos dados de contacto a uma criança, nunca mostramos anúncios e nunca permitimos o contacto com desconhecidos.",
                "O titular da conta também pode criar um perfil de cuidador para si próprio ou para outro adulto da família – por exemplo, para testar se uma raça lhe convém antes de comprar ou adotar. Aplicam-se a esse perfil as mesmas regras e os mesmos dados mínimos; todas as proteções pensadas para crianças aplicam-se também a ele.",
              ],
            },
            {
              heading: "8. Imagens e vídeos gerados por IA",
              paragraphs: [
                "A fotografia e os vídeos curtos de cada animal são criados por um serviço de IA apenas a partir de uma descrição do animal (raça, pelagem, manchas e afins). A descrição nunca contém nomes nem qualquer informação sobre a tua família. Os ficheiros finais são guardados nos nossos próprios servidores na UE e mostrados através de ligações de curta duração.",
              ],
            },
            {
              heading: "9. Prestadores de serviços",
              items: [
                "Alojamento: Hetzner Online (servidores na UE).",
                "Geração de imagens e vídeos por IA: fal.ai (recebe apenas a descrição do animal).",
                "Notificações push: Apple Push Notification service e Firebase Cloud Messaging através da Expo; as notificações não contêm nomes.",
                "Compras: Apple App Store e Google Play; gestão das compras através da RevenueCat quando as compras ficarem disponíveis.",
                "E-mails de acesso antecipado: Klaviyo (recebe apenas o endereço de e-mail e o idioma que indicas neste site).",
                "Consentimento de cookies do site: CookieYes (guarda a tua escolha de consentimento).",
                "Análise do site: Google Analytics 4, da Google Ireland Ltd., apenas com o teu consentimento; o Google Analytics 4 não guarda endereços IP.",
              ],
            },
            {
              heading: "10. Durante quanto tempo guardamos os dados",
              paragraphs: [
                "Guardamos os teus dados enquanto a tua conta existir. Quando eliminas o perfil de um filho ou a tua conta na aplicação, os dados são eliminados de imediato e não podem ser recuperados; saem automaticamente das nossas cópias de segurança encriptadas, no máximo, em 35 dias. Os registos que a lei nos obriga a conservar (por exemplo, das compras) são guardados durante o período exigido por lei. Os relatórios de erros da aplicação são eliminados automaticamente ao fim de 30 dias.",
              ],
            },
            {
              heading: "11. Os teus direitos",
              paragraphs: [
                "Tens direito a aceder aos teus dados, retificá-los, exportá-los e apagá-los, a opor-te ao tratamento e a pedir a sua limitação, e a apresentar reclamação a uma autoridade de controlo – na Eslovénia, o Comissário para a Informação (Informacijski pooblaščenec). Na aplicação podes exportar todos os dados da tua família num ficheiro (Control → Account → Export my data, «Exportar os meus dados») e eliminar o perfil de um filho ou a tua conta inteira. Para tudo o resto, escreve para {privacyEmail}.",
              ],
            },
            {
              heading: "12. Segurança",
              paragraphs: [
                "As palavras-passe e os códigos são guardados como hashes, as ligações são encriptadas, as atualizações em direto só chegam aos membros da tua família e os conteúdos de IA são verificados antes de chegarem ao ecrã de uma criança.",
              ],
            },
            {
              heading: "13. Alterações",
              paragraphs: ["Antes de as alterações importantes entrarem em vigor, avisamos-te na aplicação. A data no topo indica a versão mais recente."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "14. Cookies",
          paragraphs: [
            "Os cookies necessários mantêm o site a funcionar e memorizam a tua escolha de consentimento. Os cookies analíticos (Google Analytics) só são instalados se os permitires no banner e podes alterar a tua escolha a qualquer momento.",
            "A tabela abaixo é gerada automaticamente a partir da análise mais recente deste site, por isso indica sempre os cookies que usamos de facto.",
          ],
          settings: "Alterar definições de cookies",
          fallback: "A lista de cookies carrega com o banner de consentimento. Se não a vires, permite scripts nesta página ou escreve para {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Termos de utilização",
      meta: {
        title: "Termos de utilização – PetPrep",
        description:
          "Os termos de utilização da aplicação e do site PetPrep: contas e perfis de crianças, o desafio de 12 semanas e o certificado, compras e reembolsos, conteúdos de IA, modo adaptado, utilização justa, eliminação e lei aplicável.",
      },
      eyebrow: "Informação legal",
      title: "Termos de utilização",
      lead: "Tradução: apenas a versão inglesa é vinculativa. As regras para usar o PetPrep, escritas para serem lidas.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. O serviço",
              paragraphs: [
                "O PetPrep é disponibilizado por {company}, {address}; {companyIds} – a mesma empresa que é responsável pelo tratamento de dados nos termos da política de privacidade. Estes termos aplicam-se à aplicação PetPrep e ao site petprep.si.",
                "O PetPrep é uma simulação de cuidados com animais de estimação. Ajuda famílias e pessoas a descobrir se estão preparadas para cuidar de um animal a sério – crianças e adultos que querem testar se uma raça lhes convém antes de comprar ou adotar. É uma ferramenta educativa, não aconselhamento veterinário nem outro aconselhamento profissional.",
              ],
            },
            {
              heading: "2. Contas, perfis e crianças",
              items: [
                "As contas são criadas por adultos: pais, representantes legais ou adultos que usam o PetPrep para si próprios. Ao registares-te, aceitas estes termos e a política de privacidade.",
                "Os cuidadores (crianças ou adultos) cuidam do animal através de um perfil de cuidador criado pelo titular da conta, que também pode criar um para si próprio. Um perfil precisa apenas de uma alcunha e, opcionalmente, do ano de nascimento – não precisamos de mais nada sobre uma criança, por isso não o introduzas em lado nenhum da aplicação.",
                "Uma criança entra com um código de 6 dígitos (PIN) que crias na tua aplicação. O código tem uma validade curta e só funciona uma vez; dá-o apenas à criança a quem se destina.",
                "Como pai, mãe ou representante legal, és responsável pela forma como o teu filho usa o PetPrep: se é adequado para ele, quanto tempo passa na aplicação e se está em segurança durante os passeios (por exemplo, no trânsito). Podes parar o jogo de qualquer animal a qualquer momento.",
                "Podes convidar outro pai ou outra mãe para a família com um código de convite; ambos veem todos os dados da família e ambos podem parar o jogo.",
                "Fornece informações corretas e mantém seguros a tua palavra-passe, os códigos e os dispositivos.",
              ],
            },
            {
              heading: "3. O desafio de 12 semanas, o Care Score e o certificado",
              items: [
                "O desafio dura 12 semanas (84 dias de programa) e começa com a compra; cada cuidador tem o seu próprio fim. O tempo em que o jogo está à espera de pagamento não conta para as 12 semanas.",
                "O Care Score (0–100) mostra que parte das rotinas previstas (alimentação, água, limpeza, o passeio, uma sessão de treino) o cuidador cumpriu sozinho; cada doença do animal fá-lo descer. O tempo em que o jogo está parado, em que o animal está no veterinário e as horas de silêncio nunca contam contra o cuidador.",
                "Ao fim de 12 semanas é registada uma pontuação final que não muda depois; os cuidados após o desafio não a afetam. Com uma pontuação de 70 ou mais, podes criar na aplicação um Certificado de responsabilidade (PDF); abaixo de 70 recebes um relatório do desafio.",
                "Se a comida, a água ou a limpeza ficarem a 0% durante 24 horas, o animal é «levado para o abrigo» (fim do jogo). O jogo com esse animal termina, não há certificado e recebes um relatório do desafio.",
                "O Care Score e o certificado mostram apenas como o cuidador tratou de um animal simulado na aplicação. Não são uma garantia de que uma criança, ou qualquer outra pessoa, está preparada para um animal a sério, não são uma avaliação profissional e não substituem o teu próprio juízo nem o conselho de um veterinário, criador ou abrigo. A decisão sobre um animal a sério é sempre tua.",
                "As regras do jogo (refeições, passeios e cuidados por raça e idade) são simplificadas e baseiam-se em fontes públicas. Não são aconselhamento veterinário; pergunta a um veterinário sobre a saúde e os cuidados de um animal a sério.",
              ],
            },
            {
              heading: "4. Funcionalidades gratuitas e pagas, compras e reembolsos",
              items: [
                "O cão sem raça definida e o gato doméstico são gratuitos para sempre e são a forma de experimentar o PetPrep; não há período experimental gratuito do desafio. Um animal gratuito não tem programa de 12 semanas nem certificado, os pais veem o histórico dos últimos 7 dias e o animal tem um conjunto básico de imagens e vídeos.",
                "O Desafio PetPrep de 12 semanas com uma raça paga é uma compra única (49,99\u00a0€ na Eslovénia; a loja mostra o preço do teu país). Uma compra é um desafio para um animal; cada novo desafio com um novo animal é uma nova compra. Os irmãos que cuidam do mesmo animal pagam uma só vez.",
                "O pai ou a mãe compra na sua própria aplicação através da App Store ou do Google Play; não há compras na aplicação da criança. A loja processa o pagamento segundo os seus próprios termos.",
                "Podes criar um animal do desafio antes de comprar. Até o desafio estar pago, o jogo está em pausa: o animal espera em segurança, as suas necessidades não descem e nada piora. Depois de comprares, o jogo continua onde parou.",
                "Os reembolsos são tratados pela App Store e pelo Google Play segundo as suas próprias regras; pede-o à loja onde compraste. Se a loja reembolsar uma compra antes de o desafio terminar, o jogo desse animal volta a ficar em pausa. As imagens e os vídeos criados depois da compra mantêm-se.",
                "Depois de um fim de jogo (abrigo), uma compra não desbloqueia o animal; um novo desafio é um novo animal e uma nova compra.",
                "Desejos (coisas para o animal, quando estiverem disponíveis): uma criança pode pedir, mas só um pai ou uma mãe pode comprar, na sua própria aplicação. Um artigo comprado pertence ao animal para o qual foi comprado e é só estético – não afeta o jogo, a pontuação nem o certificado. Depois de um fim de jogo ou quando o animal é eliminado, a compra fica usada e não é reembolsada. Se a loja reembolsar a compra, o artigo (no caso das guloseimas, as guloseimas não usadas) é removido.",
                "Se eliminares um animal, um filho ou a conta enquanto um desafio comprado ainda está a decorrer, a compra fica usada: não passa para outro animal e eliminar não é um reembolso. A aplicação avisa-te primeiro e pede-te confirmação.",
              ],
            },
            {
              heading: "5. Imagens e vídeos gerados por IA",
              items: [
                "As imagens e os vídeos dos animais são gerados por inteligência artificial (IA) apenas a partir de uma descrição do animal (raça, cor, pelagem, etc.), nunca a partir de dados sobre a tua família. São ilustrações de um animal simulado e podem não corresponder perfeitamente a nenhum animal real nem a nenhum padrão de raça.",
                "Quando os mostramos publicamente, como os retratos de raças neste site, estão identificados como gerados por IA.",
                "Um aspeto não é necessariamente único: animais da mesma raça paga e da mesma cor podem partilhar as mesmas imagens e vídeos, e os animais gratuitos recebem um dos aspetos partilhados da sua raça. Um desafio pago inclui um conjunto maior de vídeos do que um animal gratuito.",
                "Depois de o contrato ser assinado ou de ser feita uma compra, a preparação das imagens e dos vídeos pode demorar alguns minutos; entretanto, a aplicação mostra que o animal se está a preparar e assinala o que ainda está em preparação.",
                "As informações sobre raças na aplicação e no registo de animais deste site são resumidas a partir das fontes públicas que citamos e não são verificadas por um veterinário.",
              ],
            },
            {
              heading: "6. Passos, dados de saúde e modo adaptado",
              items: [
                "O passeio diário conta os passos reais do cuidador. Se o permitires, a aplicação lê-os do Apple Health ou do Health Connect, só para leitura (nunca escreve lá nada), ou do sensor de movimento do telemóvel. Os dados que tratamos estão descritos na política de privacidade (secção 3).",
                "O modo adaptado destina-se a crianças que usam cadeira de rodas: o passeio passa a contar impulsos da cadeira de rodas em vez de passos. Podes usá-lo se a funcionalidade estiver disponível na tua versão da aplicação. O pai ou a mãe ativa-o para cada criança individualmente; ativá-lo é o teu consentimento e desativá-lo retira-o (política de privacidade, secção 4).",
                "No modo adaptado, o pai ou a mãe pode registar minutos de passeio da criança, apenas para o dia de hoje. És responsável por estes registos: regista apenas passeios que aconteceram de facto, porque contam para o Care Score e para o certificado.",
                "O PetPrep não usa a localização e não avisa sobre perigos durante um passeio; a segurança dos passeios é da tua responsabilidade.",
              ],
            },
            {
              heading: "7. Notificações",
              paragraphs: [
                "Se as permitires no dispositivo, a aplicação envia notificações push: lembretes ao cuidador, alertas aos pais quando um animal não tem comida, água ou limpeza, e avisos sobre doença, fim do jogo e fim do desafio. As notificações nunca contêm o nome da criança nem do animal e não são enviadas durante as horas de silêncio. Podes retirar a autorização a qualquer momento nas definições do dispositivo; sem notificações, um cuidador pode falhar rotinas, o que afeta o jogo e a pontuação.",
              ],
            },
            {
              heading: "8. Utilização justa",
              items: [
                "Não tentes fazer batota na contagem de passos ou de impulsos, registar passeios que não aconteceram, aceder aos dados de outras famílias, fazer engenharia inversa do serviço ou perturbá-lo.",
                "Não dês aos animais nomes ofensivos ou inadequados e não introduzas dados pessoais sobre uma criança que a aplicação não pede.",
                "Podemos limitar ou suspender contas que violem estas regras ou ponham crianças em risco, e podemos remover um nome de animal inadequado.",
              ],
            },
            {
              heading: "9. Propriedade intelectual",
              paragraphs: [
                "O PetPrep, o seu logótipo, design, software e conteúdos pertencem a {company}. Podes usar a aplicação, bem como as imagens, os vídeos e o certificado do teu animal, para uso pessoal e não comercial da tua família – por exemplo, partilhá-los com familiares.",
              ],
            },
            {
              heading: "10. Responsabilidade",
              paragraphs: [
                "Trabalhamos para manter o PetPrep disponível e correto, mas o serviço é prestado tal como está; depende também de serviços de terceiros (as lojas de aplicações, o Apple Health, o Health Connect, as notificações push, o serviço de IA) que não controlamos. Na medida em que a lei o permite, não somos responsáveis por danos indiretos nem por decisões sobre comprar ou adotar um animal a sério. Nada nestes termos limita os direitos que tens enquanto consumidor ao abrigo de legislação imperativa.",
              ],
            },
            {
              heading: "11. Eliminar a conta e deixar de usar o serviço",
              paragraphs: [
                "Podes eliminar o perfil de um filho ou a tua conta a qualquer momento na aplicação. A eliminação é imediata e definitiva; quando o último pai ou a última mãe de uma família elimina a sua conta, toda a família é eliminada. Podes exportar primeiro os teus dados (Control → Account → Export my data, «Exportar os meus dados»). O que acontece aos dados está descrito na política de privacidade; o que acontece a uma compra está descrito na secção 4.",
              ],
            },
            {
              heading: "12. Alterações a estes termos",
              paragraphs: [
                "Atualizamos estes termos quando a aplicação ou a lei mudam. Antes de as alterações importantes entrarem em vigor, avisamos-te na aplicação. A data no topo indica a versão mais recente. Se não concordares com uma alteração, podes eliminar a tua conta a qualquer momento.",
              ],
            },
            {
              heading: "13. Lei aplicável e litígios",
              paragraphs: [
                "Estes termos regem-se pela lei da República da Eslovénia. Os consumidores podem também invocar as proteções imperativas do país onde vivem e recorrer à plataforma europeia de resolução de litígios em linha.",
              ],
            },
            {
              heading: "14. Contacto",
              paragraphs: [
                "Questões sobre estes termos: {termsEmail}. Prestador do serviço: {company}, {address}; {companyIds}. Questões de privacidade: {privacyEmail}.",
              ],
            },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Segurança infantil",
      meta: {
        title: "Segurança infantil – como o PetPrep protege as crianças",
        description:
          "Como o PetPrep protege as crianças: contas criadas pelos pais, acesso por código sem e-mail, dados mínimos, sem anúncios nem conversas, sem rastreio da localização, conteúdos verificados.",
      },
      eyebrow: "Confiança",
      title: "Feito para crianças desde a primeira linha de código.",
      lead: "Tradução: apenas a versão inglesa é vinculativa. A criança é a principal utilizadora do PetPrep, por isso a segurança e a privacidade são regras do produto, não definições.",
      blocks: [
        {
          type: "cards",
          heading: "As nossas regras",
          columns: 2,
          items: [
            { title: "Todas as contas são criadas pelos pais", text: "As crianças não se podem registar sozinhas. O pai ou a mãe adiciona a criança e gera um código de acesso de utilização única, válido durante 15 minutos." },
            { title: "Sem e-mail nem palavra-passe para as crianças", text: "A criança entra com o código dado pelos pais. Os códigos errados, expirados e já usados recebem todos a mesma resposta, para que ninguém consiga adivinhar que crianças existem." },
            { title: "Dados mínimos", text: "Uma alcunha e, opcionalmente, o ano de nascimento. Sem apelido, sem data de nascimento, sem fotografias da criança." },
            { title: "Sem anúncios, sem conversas, sem desconhecidos", text: "Não há publicidade nem forma de contactar outros utilizadores." },
            { title: "Sem rastreio da localização", text: "Os passeios contam apenas passos – do Apple Health ou do Health Connect (com a tua autorização, só leitura) ou do sensor de movimento do telemóvel. Não se usa GPS." },
            { title: "Atualizações em direto privadas", text: "As atualizações em tempo real só chegam às crianças que cuidam desse animal e aos pais da mesma família." },
            { title: "Conteúdos verificados", text: "Só são mostradas imagens e vídeos produzidos para o PetPrep e verificados pelo nosso servidor, a partir do nosso próprio armazenamento na UE." },
            { title: "Notificações sem nomes", text: "As notificações nunca incluem o nome da criança nem do animal, porque podem aparecer no ecrã de bloqueio." },
          ],
        },
        {
          type: "list",
          heading: "O controlo continua com os pais",
          items: [
            "Horas de silêncio para a escola e o sono, sem notificações.",
            "Um botão de pausa que bloqueia o ecrã da criança em direto.",
            "Terminar a sessão de uma criança em todos os dispositivos de uma só vez.",
            "Exportar ou eliminar todos os dados de imediato na aplicação.",
          ],
        },
        { type: "callout", title: "Comunica uma preocupação", text: "Se alguma coisa no PetPrep te preocupar, escreve-nos e respondemos com prioridade.", tone: "dark" },
        { type: "contact" },
      ],
    },
    accessibility: {
      navLabel: "Acessibilidade",
      meta: {
        title: "Acessibilidade – o PetPrep para todas as crianças",
        description:
          "Como o PetPrep se adapta às crianças que têm dificuldade em deslizar o dedo, usam o VoiceOver ou o TalkBack, ou preferem menos movimento – com as mesmas regras e os mesmos pontos para todos.",
      },
      eyebrow: "Confiança",
      title: "Todas as crianças podem cuidar do seu animal.",
      lead: "Algumas crianças têm dificuldade em deslizar o dedo, usam um leitor de ecrã ou preferem menos movimento no ecrã. O PetPrep adapta-se a elas – com as mesmas regras, os mesmos pontos e o mesmo certificado que todas as outras.",
      blocks: [
        {
          type: "cards",
          heading: "Na aplicação",
          columns: 3,
          items: [
            { title: "Gestos mais fáceis", text: "Em vez de deslizar, a criança mantém o dedo pressionado ou carrega num botão – em todos os jogos de deslizar: escovar, a cana com penas, mudar a areia e atirar a bola. O pai ou a mãe ativa esta opção para cada criança na área dos pais." },
            { title: "Leitores de ecrã", text: "Com o VoiceOver ou o TalkBack ligados, os jogos passam sozinhos para o modo de manter pressionado. O cabeçalho do animal lê em voz alta tudo sobre o animal e cada passo dos jogos de cuidados é um botão próprio." },
            { title: "Menos movimento", text: "Quando o telemóvel está definido para reduzir o movimento, os botões que pulsam e o Curio a baloiçar ficam parados." },
          ],
        },
        {
          type: "cards",
          heading: "Na próxima atualização da aplicação",
          items: [
            { title: "Passeios em cadeira de rodas", text: "No modo adaptado, os impulsos da cadeira de rodas contam exatamente como passos – um impulso é um passo. O pai ou a mãe também pode registar os minutos de passeio de hoje, para a criança não ter de fazer nada a mais. O pai ou a mãe ativa-o para cada criança, e desativá-lo remove a marcação do histórico." },
          ],
        },
        { type: "callout", title: "O mesmo desafio para todos", text: "As adaptações mudam a forma como a criança joga, nunca o que conta. As pontuações, os horários e o Certificado de responsabilidade funcionam exatamente da mesma forma. Nunca perguntamos porque é que uma criança precisa de uma adaptação.", tone: "mint" },
        { type: "callout", title: "Alguma coisa não funciona para o teu filho?", text: "Diz-nos o que atrapalhou e vamos analisar.", tone: "dark" },
        { type: "contact" },
      ],
    },
    deleteAccount: {
      navLabel: "Eliminar conta",
      meta: {
        title: "Eliminar a tua conta e os teus dados do PetPrep",
        description:
          "Como eliminar a tua conta do PetPrep (Data Vallis) na aplicação ou por e-mail, que dados são eliminados, o que é guardado e durante quanto tempo.",
      },
      eyebrow: "Confiança",
      title: "Elimina a tua conta do PetPrep",
      lead: "Tradução: apenas a versão inglesa é vinculativa. O PetPrep é feito pela Data Vallis. Podes eliminar a tua conta e os dados da tua família a qualquer momento – de imediato na aplicação, ou por e-mail se já não tiveres a aplicação.",
      blocks: [
        {
          type: "steps",
          heading: "Eliminar a conta na aplicação (imediato)",
          items: [
            { title: "Inicia sessão como pai ou mãe", text: "Abre o PetPrep, toca em «I’m a parent» («Sou pai ou mãe») e inicia sessão." },
            { title: "Abre a tua conta", text: "Vai a Controls → Account. Opcional: toca primeiro em «Export my data» («Exportar os meus dados») para guardares uma cópia." },
            { title: "Elimina", text: "Toca em «Delete account» («Eliminar conta»), confirma com a tua palavra-passe (ou com o teu início de sessão Google / Apple) e escreve DELETE; depois toca em «Delete for good» («Eliminar definitivamente»)." },
            { title: "Concluído", text: "A eliminação é imediata e não pode ser anulada. A sessão é terminada em todos os teus dispositivos e nos dos teus filhos." },
          ],
        },
        {
          type: "prose",
          heading: "Já não tens a aplicação? Pede a eliminação por e-mail",
          paragraphs: [
            "Escreve para [privacy@petprep.si](mailto:privacy@petprep.si) a partir do endereço de e-mail da tua conta de pai ou mãe no PetPrep, com o assunto «Eliminar a minha conta». Confirmamos que o pedido vem do titular da conta, eliminamos a conta no prazo máximo de um mês (normalmente em poucos dias) e depois confirmamos por e-mail.",
            "Para eliminar apenas o perfil de um filho, inicia sessão como pai ou mãe e abre o perfil da criança em Controls → Children → Delete profile («Eliminar perfil»).",
          ],
        },
        {
          type: "table",
          heading: "O que é eliminado e o que é guardado",
          head: ["Dados", "O que acontece"],
          rows: [
            ["A tua conta de pai ou mãe (nome, e-mail, palavra-passe, ligação ao início de sessão Google / Apple)", "Eliminada de imediato"],
            ["Se fores o único pai ou a única mãe da família: perfis das crianças (alcunha, ano de nascimento), animais, imagens e vídeos de IA, contratos e assinaturas, registo de cuidados, Care Scores, certificados, contagens de passos, horas de silêncio, códigos de acesso", "Eliminados de imediato"],
            ["Se ficar outro pai ou outra mãe na família", "Só a tua conta é eliminada; a família fica com o outro pai ou a outra mãe"],
            ["Dispositivos e tokens de notificação", "Sessão terminada e eliminados de imediato"],
            ["Registos de compras (produto, data, ID da transação na loja, um ID de compra anónimo – sem nome nem e-mail)", "Guardados durante o tempo exigido pela legislação contabilística e fiscal, já sem ligação à tua família"],
            ["Registos de custos de IA", "Guardados para fins contabilísticos sem qualquer ligação a ti, aos teus filhos ou aos teus animais"],
            ["Cópias de segurança encriptadas", "Removidas automaticamente no prazo de 35 dias"],
          ],
          note: "As compras em si são tratadas pela App Store e pelo Google Play; os respetivos registos são guardados pela Apple e pela Google segundo as suas próprias políticas. Um desafio comprado mas não terminado não é reembolsado quando eliminas a conta.",
        },
        { type: "callout", title: "Dúvidas?", text: "Escreve para privacy@petprep.si. Os pormenores estão na nossa política de privacidade.", tone: "dark" },
      ],
    },
    animals: {
      meta: {
        title: "Registo de animais do PetPrep – espécies e raças, com fontes",
        description:
          "Cães, gatos e as suas raças: de que precisa cada um, a quem convém e como o PetPrep o simula. Pesquisa e compara raças; cada facto tem ligação à sua fonte.",
      },
      navLabel: "Animais",
      eyebrow: "Registo de animais",
      title: "Conhece o animal antes de ele chegar a casa.",
      lead:
        "Do que precisa realmente cada espécie e cada raça no PetPrep – segundo clubes de canicultura, registos de gatos, instituições veterinárias de solidariedade e estudos, com todas as fontes ligadas. E ainda as regras que o PetPrep usa para o simular.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "Sobre o PetPrep – empresa, fundador e como escolhemos as fontes sobre animais",
        description:
          "Quem faz o PetPrep: Data Vallis David Tacer s.p., de Dravograd, Eslovénia, o fundador David Tacer, a nossa missão e como o registo de animais escolhe e verifica as suas fontes.",
      },
      navLabel: "Sobre nós",
      eyebrow: "Sobre nós",
      title: "Quem faz o PetPrep.",
      lead: "O PetPrep é feito em Maribor, na Eslovénia, por uma pequena empresa de software. Esta página diz quem somos, porque construímos o PetPrep e como decidimos o que a aplicação e o registo de animais dizem sobre os animais.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "A empresa",
          paragraphs: [
            "O PetPrep é um produto da Data Vallis David Tacer s.p., uma empresa de desenvolvimento de software (empresário em nome individual) com sede em Dravograd, na Eslovénia. A mesma empresa gere este site e a aplicação PetPrep e é a responsável pelo tratamento dos dados pessoais (ver a [política de privacidade](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "O fundador",
          paragraphs: [
            "O PetPrep foi fundado por David Tacer, programador de software e empreendedor de Maribor, na Eslovénia.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "A nossa missão",
          paragraphs: [
            "Todas as famílias já ouviram «Prometo que tomo conta dele». O PetPrep transforma essa promessa numa prova: durante 12 semanas, uma criança – ou um adulto que quer uma raça em particular – cuida de um animal de IA realista com as necessidades diárias de um animal a sério, e os pais veem todos os dias se os cuidados se mantêm.",
            "Falhar na simulação também é um bom resultado: a família descobre antes de um animal a sério sofrer e antes de se comprometer com anos de cuidados e despesas. Quando um animal a sério chega mesmo a casa, queremos que o PetPrep continue útil durante toda a vida do animal.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "Como é construído o registo de animais",
          intro: "O [registo de animais](page:animals) e a aplicação usam os mesmos dados. Estas regras decidem o que o registo pode dizer:",
          items: [
            "Cada facto indica a sua fonte e tem ligação a ela. As fontes são classificadas consoante o peso que merecem: A – padrões de raça, artigos com revisão por pares e diretrizes de associações veterinárias; B – páginas de conselhos de hospitais veterinários, universidades e instituições nacionais de proteção animal; C – resumos secundários (enciclopédias, artigos de imprensa), usados apenas em conjunto com uma fonte A ou B.",
            "Só os factos com fonte são apresentados como factos. Um valor que nenhuma fonte sustente não é publicado. Quando as fontes discordam, cada uma é apresentada com o seu próprio valor.",
            "As regras do jogo não são aconselhamento veterinário. Quando o jogo precisa de um número que as fontes não dão com exatidão (por exemplo, uma meta diária de passos), o PetPrep decide-o a partir das fontes e mostra-o apenas em «Como o PetPrep o simula», identificado como regra do jogo.",
            "As notas de saúde são meramente informativas. Resumem o que as fontes dizem sobre uma raça e não foram revistas por um veterinário. Para um animal a sério, pergunta a um veterinário.",
            "Os padrões de raça são resumidos por palavras nossas, nunca copiados extensamente, e nunca chamamos «hipoalergénica» a nenhuma raça.",
            "O registo é gerado a partir dos dados de investigação do PetPrep, os mesmos que a aplicação usa. Quando uma fonte ou um valor muda, o registo é exportado de novo e cada página de raça mostra a data da sua última atualização. Se encontrares um erro, escreve para hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Dúvidas sobre o PetPrep?", text: "Escreve para a caixa de correio certa na página de contacto – famílias, privacidade, parceiros ou investidores.", tone: "mint" },
        { type: "contact" },
      ],
    },
    curio: {
      meta: {
        title: "Conhece o Curio – a mascote do PetPrep",
        description:
          "O Curio é a mascote do PetPrep: o pequeno cubo curioso do nosso logótipo e a estrela dos nossos vídeos curtos. Quem é, em que é diferente do animal realista da aplicação, imagens e um kit de imprensa.",
      },
      navLabel: "Conhece o Curio",
      eyebrow: "A nossa mascote",
      title: "Conhece o Curio.",
      lead: "O Curio é o pequeno cubo curioso do logótipo do PetPrep, que ganhou vida. É a estrela dos nossos vídeos curtos, no papel do animal que espera junto à porta que alguém cumpra uma promessa. É a nossa mascote – não o animal de que cuidas na aplicação.",
      hero: { src: "/curio/curio-waving.webp", alt: "O Curio, a mascote do PetPrep: um cubo cor de grafite, macio, com grandes olhos brancos, um pequeno nariz cor de framboesa e uma coleira verde-menta, a acenar.", width: 720, height: 948 },
      blocks: [
        {
          type: "prose",
          id: "who",
          heading: "Quem é o Curio?",
          paragraphs: [
            "O Curio começou por ser o símbolo do nosso logótipo: um quadrado cor de grafite com cantos arredondados, dois olhos grandes a olhar para cima e para a direita e um pequeno nariz cor de framboesa. Em esloveno chamamos-lhe Radovednež – «o curioso». Em outubro de 2026 ganhou uns bracinhos, umas perninhas curtas e uma coleira verde-menta com uma medalha redonda, e tornou-se uma personagem.",
            "O Curio não tem boca. Tudo o que sente vê-se nos olhos: muito abertos quando alguém sussurra «passeio?», duas linhas sonolentas quando ainda ninguém chegou a casa, arcos felizes quando a tigela está cheia.",
            "O Curio não é menino nem menina, nem cão nem gato. Representa todos os animais que esperam, todos os dias, que alguém cumpra uma promessa.",
          ],
        },
        {
          type: "cards",
          id: "facts",
          heading: "O Curio num relance",
          columns: 3,
          items: [
            { title: "Nome", text: "Curio em inglês, Radovednež em esloveno." },
            { title: "Feito de", text: "Grafite macia, uma coleira verde-menta e uma medalha cor de framboesa – as cores do PetPrep." },
            { title: "Fala", text: "Nunca. Só com os olhos." },
            { title: "Adora", text: "Passeios, uma tigela cheia e crianças que voltam ao 15.º dia." },
            { title: "Vive", text: "Nos nossos vídeos curtos no [TikTok](https://www.tiktok.com/@petprep.si) e no [Instagram](https://www.instagram.com/petprep.si/), @petprep.si." },
            { title: "Trabalho", text: "Lembrar as famílias, com uma piscadela de olho, que um animal precisa de cuidados todos os dias." },
          ],
        },
        {
          type: "pair",
          id: "not-the-pet",
          heading: "O Curio não é o animal da aplicação",
          intro: "Nos nossos vídeos, o Curio faz de animal que precisa de cuidados, porque todos os animais precisam. No PetPrep, as crianças – e os adultos que estão a testar uma raça – cuidam de algo muito mais próximo da realidade.",
          items: [
            {
              src: "/curio/curio-profile-light.webp",
              alt: "O Curio, a mascote de desenho animado, a acenar sobre um fundo claro.",
              label: "Mascote",
              title: "Curio – a nossa mascote",
              text: "Uma personagem de desenho animado para os nossos vídeos, autocolantes e esta página. Mostra do que trata o PetPrep. Não o podes adotar.",
            },
            {
              src: "/animals/dogs/labrador-retriever.webp",
              alt: "Um retrato realista gerado por IA de um labrador retriever, tal como os animais aparecem na aplicação PetPrep.",
              label: "Na aplicação · imagem de IA",
              tone: "mint",
              title: "O teu animal no PetPrep",
              text: "Uma simulação realista com IA de uma raça real – como este [labrador retriever](+breed:labrador_retriever) – com as necessidades diárias de um animal a sério: refeições, água, passeios contados em passos reais, limpeza e treino. Vê [como funciona](+page:howItWorks).",
            },
          ],
        },
        {
          type: "gallery",
          id: "gallery",
          heading: "O Curio em imagens",
          intro: "O Curio é uma personagem 3D estilizada, criada com ferramentas de IA a partir do nosso próprio design. As cenas novas aparecem primeiro nos nossos vídeos.",
          items: [
            { src: "/curio/curio-profile-mint.webp", alt: "O Curio a acenar sobre um fundo verde-menta.", caption: "Olá! O aceno clássico.", bg: "mint" },
            { src: "/curio/curio-shelf.webp", alt: "O Curio de pé numa prateleira branca, a acenar.", caption: "Na prateleira, à espera de alguém." },
            { src: "/curio/curio-character-sheet.webp", alt: "O Curio de frente, de lado e de costas, com quatro expressões dos olhos.", caption: "De todos os lados, e como os olhos mostram o que sente." },
            { src: "/curio/curio-waving.webp", alt: "O Curio sobre um fundo transparente.", caption: "Recortado – pronto para a tua publicação (vê o kit de imprensa).", bg: "graphite" },
          ],
        },
        {
          type: "downloads",
          id: "media-kit",
          heading: "Kit de imprensa",
          intro: "Para criadores de conteúdos, jornalistas e parceiros que escrevem sobre o PetPrep. Dúvidas ou ideias de colaboração: hello@petprep.si.",
          all: { href: "/curio/petprep-curio-media-kit.zip", label: "Descarregar tudo", meta: "ZIP, 1,1\u00a0MB" },
          items: [
            { href: "/curio/kit/curio-transparent.png", label: "Curio, fundo transparente", meta: "PNG, 848 × 1117" },
            { href: "/curio/kit/curio-square-light.png", label: "Curio, quadrado, claro", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-square-mint.png", label: "Curio, quadrado, verde-menta", meta: "PNG, 1080 × 1080" },
            { href: "/curio/kit/curio-character-sheet.jpg", label: "Folha de personagem", meta: "JPG, 823 × 1080" },
            { href: "/curio/kit/petprep-logo-horizontal.svg", label: "Logótipo PetPrep", meta: "SVG" },
            { href: "/curio/kit/petprep-mark.svg", label: "Símbolo PetPrep", meta: "SVG" },
          ],
          rulesHeading: "Como usar o Curio",
          rules: [
            "Usa o Curio em publicações, artigos e vídeos sobre o PetPrep. Para anúncios, produtos ou merchandising, pergunta-nos primeiro.",
            "Mostra o Curio tal como é: cubo cor de grafite, olhos brancos, nariz cor de framboesa, coleira verde-menta. Não lhe acrescentes boca, orelhas, pelo ou sobrancelhas, e não lhe mudes as cores nem o deformes.",
            "O Curio é a mascote do PetPrep. Não o apresentes como o animal da aplicação nem como um cão ou gato a sério.",
            "Não uses o Curio de forma a sugerir que o PetPrep apoia outro produto, causa ou pessoa.",
          ],
        },
        {
          type: "faq",
          id: "questions",
          heading: "Perguntas sobre o Curio",
          items: [
            { q: "O Curio é um cão ou um gato?", a: "Nem uma coisa nem outra. O Curio é um pequeno cubo do nosso logótipo. Faz de animal nos nossos vídeos, mas não pertence a nenhuma espécie." },
            { q: "O meu filho pode cuidar do Curio na aplicação?", a: "Não. Na aplicação, a tua família cuida de um animal realista de uma raça real, com as mesmas necessidades diárias do animal a sério. O Curio só aparece nos nossos vídeos e no site." },
            { q: "Porque é que o Curio não tem boca?", a: "Porque o nosso logótipo também não tem. O Curio diz tudo com os olhos – e nunca pede guloseimas em voz alta." },
            { q: "Onde posso ver os novos vídeos do Curio?", a: "No TikTok e no Instagram, @petprep.si." },
          ],
        },
      ],
    },
    care: {
      meta: {
        title: "Conselhos sobre animais – o que os cães e os gatos podem comer, com fontes | PetPrep",
        description:
          "Que alimentos são tóxicos, arriscados ou seguros para cães e gatos – o motivo, os sinais e o que fazer, com todas as fontes ligadas. Feito pelo PetPrep para famílias que se preparam para ter um animal.",
      },
      navLabel: "Conselhos",
      eyebrow: "Conselhos",
      title: "O que é seguro para o teu animal?",
      lead:
        "Respostas claras e com fontes para as famílias: que alimentos são tóxicos, quais são arriscados e quais se podem dar como guloseima – para cães e gatos, e mais espécies a caminho. Cada resposta tem ligação às suas fontes.",
      blocks: [{ type: "careHub" }],
    },
    coloring: {
      meta: {
        title: "Desenhos para colorir de cães e gatos, grátis para imprimir | PetPrep",
        description:
          "Desenhos para colorir grátis para imprimir: golden retriever, labrador, border collie, cachorro sem raça definida, gatinho e Curio. PDF em A4 e US Letter, cada um com uma curiosidade real sobre cuidados com animais e a respetiva fonte.",
      },
      navLabel: "Desenhos para colorir",
      eyebrow: "Desenhos para colorir",
      title: "Desenhos para colorir grátis, para imprimir.",
      lead:
        "Cães, gatos e o Curio para colorir ou copiar – imprime uma página ou o livro inteiro. Cada página tem uma curiosidade real sobre cuidados com animais, de uma fonte veterinária ou de um clube de canicultura, para lerem juntos.",
      blocks: [{ type: "coloringHub" }],
    },
    kids: {
      meta: {
        title: "Para crianças que querem um animal de estimação – desenhos para colorir, Curio e #walkyourpet | PetPrep",
        description:
          "Tudo o que o PetPrep tem para crianças: desenhos para colorir grátis para imprimir, com curiosidades reais sobre cuidados com animais, o Curio, a nossa mascote, e o #walkyourpet – para crianças e pais que se preparam juntos para ter um animal de estimação.",
      },
      navLabel: "Para crianças",
      eyebrow: "Para crianças",
      title: "Para crianças que querem um animal de estimação.",
      lead: "Desenhos para colorir e imprimir, o Curio e o #walkyourpet – para crianças e pais que se preparam juntos para ter um animal de estimação.",
      hero: { src: "/curio/curio-waving.webp", alt: "O Curio, a mascote do PetPrep: um cubo cor de grafite, macio, com grandes olhos brancos, um pequeno nariz cor de framboesa e uma coleira verde-menta, a acenar.", width: 720, height: 948 },
      blocks: [{ type: "kidsHub" }],
    },
    walkyourpet: {
      meta: {
        title: "#walkyourpet – o movimento que começou com uma criança real",
        description:
          "«We could go walk your pet.» Foi uma criança que o disse e agora é um movimento: famílias que saem à rua porque um animal precisa de passear. Como começou, o que significa no PetPrep e como participar.",
      },
      navLabel: "#walkyourpet",
      eyebrow: "#walkyourpet",
      title: "Walk your pet.",
      lead: "Não fomos nós que inventámos esta frase. Foi uma criança. Agora é um convite para todas as famílias: saiam à rua, porque um animal precisa do seu passeio – seja um animal a sério, seja aquele com que estão a treinar no PetPrep.",
      hero: { src: "/walkyourpet/story-01.webp", alt: "Cartão de história: «Overheard at the founder’s house» («Ouvido em casa do fundador»). Uma criança diz «Lahko bi šli walk your pet» («Podíamos ir walk your pet») e o título diz «#walkyourpet is a thing now» («O #walkyourpet já é uma realidade»).", width: 720, height: 1280 },
      blocks: [
        {
          type: "prose",
          id: "how-it-started",
          heading: "Como começou",
          paragraphs: [
            "Em outubro de 2026, os filhos do nosso fundador tinham uma amiga lá em casa. Estavam a decidir se saíam ou não, e ela disse, meio em esloveno, meio em inglês: «Lahko bi šli walk your pet» – «Podíamos ir walk your pet».",
            "Ninguém lho pediu. Ela conhecia o PetPrep, onde o passeio de um cão só conta se se sair mesmo à rua, e «walk your pet» tinha-se tornado simplesmente uma razão para sair. Gostámos tanto que ficámos com a frase – em inglês, para todas as línguas.",
            "Conversa real. Crianças reais.",
          ],
        },
        {
          type: "screens",
          id: "in-the-app",
          heading: "O que significa no PetPrep",
          intro: "No PetPrep, o passeio diário do cão são os passos reais do teu filho, lidos do Apple Health ou do Health Connect, se o permitires. Ficar no sofá não conta, por isso «walk your pet» significa sempre sair à rua. Sem GPS e sem localização – só passos.",
          items: [{ screen: "hud", caption: "" }],
        },
        {
          type: "steps",
          id: "join",
          heading: "Junta-te ao movimento",
          intro: "Não precisas da aplicação para isto. Todas as famílias que saem à rua por um animal – a sério ou de treino – fazem parte dele.",
          items: [
            { title: "Sai à rua", text: "Leva o cão a passear. Ou, se ainda estás a decidir se vais ter um animal, dá o passeio que darias com ele." },
            { title: "Capta o momento", text: "Sapatos junto à porta, uma trela, o caminho, patas na relva. Sem caras, sem nomes." },
            { title: "Partilha", text: "Publica com #walkyourpet e identifica @petprep.si no Instagram ou no TikTok. Com a tua autorização, podemos partilhar os melhores momentos aqui e nos nossos perfis." },
          ],
        },
        {
          type: "list",
          id: "sharing-safely",
          heading: "Partilhar em segurança",
          intro: "O #walkyourpet tem a ver com crianças, por isso estas regras aplicam-se a tudo o que partilhamos:",
          items: [
            "Quem publica são os pais, não as crianças. Só os pais decidem o que vai para a internet.",
            "Sem caras, nomes, escolas ou moradas de crianças – e nunca o filho de outra família.",
            "Só voltamos a publicar com autorização dos pais e retiramos uma publicação sempre que pedires.",
            "As citações das crianças são sempre reais. Nunca inventamos nem «melhoramos» o que uma criança disse.",
            "É um convite, não uma obrigação. Sem sequências para manter, sem pressão – só uma boa razão para sair.",
          ],
        },
        {
          type: "callout",
          title: "O primeiro momento é nosso. O próximo pode ser teu.",
          text: "Partilha o passeio da tua família com #walkyourpet e identifica @petprep.si. Dúvidas ou uma história que queiras contar: hello@petprep.si.",
          tone: "dark",
        },
        {
          type: "faq",
          id: "questions",
          heading: "Perguntas",
          items: [
            { q: "Preciso do PetPrep para participar?", a: "Não. Qualquer pessoa que saia à rua por um animal pode usar #walkyourpet. Foi no PetPrep que a frase nasceu, e é lá que o passeio de um cão de treino só conta em passos reais." },
            { q: "Funciona para gatos no PetPrep?", a: "Não como passeio. Os gatos não vão passear, por isso no PetPrep as necessidades de um gato satisfazem-se com brincadeira, não com passos. Os passeios são para os cães." },
            { q: "Porque é que a frase está em inglês?", a: "Porque foi assim que a criança a disse – em inglês, no meio de uma frase em esloveno. As crianças de todo o mundo misturam línguas, por isso a frase fica igual em todos os idiomas." },
            { q: "O meu filho vai aparecer nas vossas publicações?", a: "Só o que partilhares tu e nos autorizares a voltar a publicar, e nunca a cara ou o nome de uma criança. Pede-nos em hello@petprep.si e removemos." },
          ],
        },
      ],
    },
  },
};

export default pt;
