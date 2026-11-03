import type { InvestorsCopy } from "./types";

const pt: InvestorsCopy = {
  meta: {
    title: "PetPrep para investidores: um fundador e um motor de conteúdos para um produto a 15 anos",
    description:
      "Com o PetPrep, uma criança prova, em 12 semanas de simulação realista, que está preparada para ter um animal de estimação, e a app acompanha a família durante toda a vida do animal. Números em direto, mapa de receitas e como pedir o dossiê para investidores.",
  },
  eyebrow: "Para investidores",
  title: "Um fundador e um motor de conteúdos para um produto que as famílias mantêm durante 15 anos.",
  seriesTitle: "«12 Weeks»",
  lead: "Com o PetPrep, uma criança prova, em 12 semanas de simulação realista, que está preparada para ter um animal de estimação, e a app acompanha a família durante toda a vida do animal. Tudo o que a rodeia, desde a nossa série até uma biblioteca de cuidados em que cada facto tem uma fonte, existe para trazer as famílias até nós a um custo quase nulo.",
  watch: "Ver «12 Weeks» no YouTube",
  brief: "Pedir o dossiê para investidores",
  heroStats: {
    breeds: "raças de cães e gatos com regras de cuidados baseadas em fontes",
    sources: "fontes de veterinários e de clubes de raça",
    episodes: "episódios da nossa comédia familiar «12 Weeks»",
  },
  opportunity: {
    eyebrow: "A oportunidade",
    title: "De um desafio de 12 semanas a uma relação de 10 a 15 anos.",
    items: [
      { tag: "Problema", text: "As crianças prometem cuidar de um animal; os pais não têm uma forma neutra de o verificar antes de assumirem despesas e anos de cuidados." },
      { tag: "Solução", text: "Uma simulação realista de 12 semanas, com um painel para os pais em direto e um Care Score objetivo, que termina com um Certificado de responsabilidade." },
      { tag: "Expansão", text: "Quando o animal verdadeiro chega a casa, o PetPrep passa a ser o seu assistente de IA: dados da coleira, primeiro contacto com o veterinário através de IA, crescimento e alimentação, testes de ADN e serviços de parceiros." },
    ],
  },
  flywheel: {
    eyebrow: "O ciclo virtuoso",
    title: "Os conteúdos trazem as famílias. Os animais verdadeiros mantêm-nas durante anos.",
    lead: "Cada conteúdo é um passo do mesmo ciclo, não um projeto paralelo.",
    steps: [
      { title: "Motor de conteúdos", text: "Série, Curio, desenhos para colorir e biblioteca de cuidados, feitos por um único fundador com agentes de IA." },
      { title: "As famílias encontram o PetPrep", text: "Através de pesquisa, redes sociais e #walkyourpet, em vez de publicidade paga." },
      { title: "Desafio de 12 semanas", text: "A primeira receita: 49,99 € por animal, pagamento único.", highlight: true },
      { title: "Chega um animal verdadeiro", text: "O PetPrep passa a ser o assistente de IA da família para cuidar do animal durante 10 a 15 anos." },
      { title: "Parceiros para a vida", text: "Seguros, veterinários, alimentação e testes de ADN: ofertas adequadas ao animal da família, que os pais escolhem ver." },
      { title: "As receitas financiam mais conteúdos", text: "Patrocinadores e receitas da fase 2 pagam a temporada seguinte, e o ciclo recomeça." },
    ],
  },
  engine: {
    eyebrow: "Motor de conteúdos · números em direto",
    title: "O que já fizemos",
    lead: "Cada número abaixo atualiza-se sozinho a partir do nosso registo, da nossa base de conhecimento e dos nossos canais.",
    updated: "Atualizado automaticamente a partir do nosso registo, da nossa base de conhecimento e dos nossos canais.",
    cards: {
      breeds: { label: "Raças no registo", note: (dogs, cats) => `${dogs} raças de cães e ${cats} de gatos, e todas as noites juntamos novas` },
      sources: { label: "Fontes", note: "Veterinários, clubes de raça e estudos, com citações" },
      episodes: { label: "Episódios de «12 Weeks»", note: (views) => (views ? `${views} visualizações no YouTube` : "No YouTube") },
      coloring: { label: "Desenhos para colorir gratuitos", note: "Para imprimir, em A4 e US Letter" },
      curio: { value: "Piloto", label: "Série de animação Curio", note: "Episódio piloto publicado no YouTube e no TikTok" },
      foods: { label: "Alimentos explicados", note: "Biblioteca de cuidados, novos alimentos todas as noites" },
      languages: { label: "Idiomas", note: "Site e biblioteca de cuidados" },
      vets: { label: "Países com diretório de veterinários", note: "Veterinários de urgência por país" },
    },
    status: { live: "Ativo", building: "Em construção", planned: "Previsto" },
    media: {
      playlist: "«12 Weeks»: a série",
      channel: "Canal de YouTube @petprep-si →",
      play: "Reproduzir",
      all: "Todos os episódios (lista de reprodução)",
      episode: (n) => `Episódio ${n}`,
      consent: "Reproduzido a partir do YouTube (youtube-nocookie.com): nada é carregado até clicares.",
      more: "Mais para ver",
      curioPilot: { title: "Curio – Rock, Paper, Leash", text: "Piloto da nossa comédia familiar sem diálogos" },
      curioAll: "Curio – todos os episódios",
      promo: { title: "PetPrep em 60 segundos", text: "O teu filho está preparado para um animal a sério?" },
      curio: { title: "Conhece o Curio", text: "A nossa mascote e os seus vídeos curtos" },
      coloring: { title: "Desenhos para colorir", text: "Gratuitos para imprimir, cada um com um facto com fonte sobre os cuidados com animais" },
      walkthrough: { title: "Como funciona a app", text: "O desafio de 12 semanas, passo a passo" },
    },
    closing: "Tudo isto é produzido por um único fundador com agentes de IA, sem equipa de produção nem agência. Cada conteúdo reconduz à app.",
  },
  built: {
    eyebrow: "O que já está construído",
    title: "Um produto a sério, não um protótipo",
    items: [
      "Motor de jogo no servidor com sincronização em tempo real, testado com simulações de dias inteiros, dias de mudança de hora e casos-limite de famílias.",
      "Famílias com vários pais, várias crianças e animais partilhados, com uma avaliação justa para cada criança.",
      "Animais de IA fotorrealistas, com custos de IA medidos e limitados, e multimédia em servidores alugados na Alemanha (Hetzner, UE).",
      "Necessidades dos animais baseadas em fontes citadas de veterinários e clubes de raça, com cada número rastreável até à fonte.",
      "Segurança infantil desde a conceção: entrada com PIN sem e-mail, dados mínimos, sem publicidade e apenas multimédia verificada.",
      "Jogo acessível: gestos mais simples, leitores de ecrã e empurrar uma cadeira de rodas conta como passeio.",
    ],
  },
  revenue: {
    eyebrow: "Mapa de receitas",
    title: "A fase 1 paga a aquisição. A fase 2 é o negócio.",
    phases: [
      {
        tag: "Fase 1 · Antes do animal",
        name: "Paga a aquisição",
        items: [
          { name: "Desafio de 12 semanas", price: "49,99 € por animal, pagamento único", status: "live", label: "Construído" },
          { name: "Desejos (objetos para o animal)", price: "De 2,99 a 15,99 €, apenas estéticos", status: "live", label: "Construído" },
          { name: "Patrocínio da série", price: "Pacotes por temporada", status: "building", label: "Em curso" },
          { name: "Loja: livros de colorir, peluche do Curio, puzzles", price: "Físicos e digitais", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Fase 2 · Com um animal verdadeiro",
        name: "O negócio",
        items: [
          { name: "Assistente de IA para os cuidados com o animal", price: "Subscrição a partir de 3,99 € por mês + carregamentos", status: "planned", label: "Previsto" },
          { name: "Parceiros de seguros para animais", price: "Ofertas que os pais escolhem ver, comissão por cada encaminhamento", status: "planned", label: "Previsto" },
          { name: "Rede de veterinários parceiros", price: "Marcações e teleconsultas", status: "planned", label: "Previsto" },
          { name: "Testes de ADN e lojas de animais parceiras", price: "Afiliação e, mais tarde, kit próprio", status: "planned", label: "Previsto" },
        ],
      },
      {
        tag: "Marca",
        name: "O Curio e a série",
        items: [
          { name: "Série de animação Curio", price: "Patrocinadores de temporada", status: "live", label: "Piloto publicado" },
          { name: "#walkyourpet", price: "Um movimento que alimenta todos os canais", status: "live", label: "Ativo" },
        ],
      },
    ],
    retention: "Uma família que adota depois do desafio fica com o PetPrep durante os 10 a 15 anos de vida do animal, e não apenas 12 semanas.",
    stageTag: "Fase atual",
    stage: "Antes do lançamento, em beta fechada no iOS e no Android. O lançamento na App Store e no Google Play segue-se.",
  },
  team: {
    eyebrow: "Equipa",
    title: "O resultado de um estúdio. O custo de uma só pessoa.",
    founderName: "David Tacer, fundador e CEO.",
    founder: "Dirige há 12 anos a sua própria empresa de software (mais de 400 projetos), fundador da CHERR.IO (vencedor do FutureHack, Davos 2018). Desenvolve o PetPrep a tempo inteiro, com uma equipa de agentes de IA para programação e conteúdos.",
    points: [
      "Cada facto tem uma fonte e uma citação, verificadas por um revisor independente.",
      "Os dados das famílias ficam na UE, as crianças entram sem e-mail e a app não tem publicidade.",
      "Processos noturnos pesquisam, verificam e publicam novas raças e novas páginas de cuidados.",
    ],
  },
  webSummit: {
    title: "Encontra-nos na Web Summit, em Lisboa",
    text: "De 9 a 12 de novembro de 2026. Partilhamos o dossiê, a apresentação, a data room e o acesso à beta mediante pedido.",
    watch: "Ver a série",
  },
  contactTitle: "Fala connosco",
};

export default pt;
