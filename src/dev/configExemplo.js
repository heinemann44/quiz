// Config de EXEMPLO só para o preview de dev (/preview). NÃO é o álbum real —
// esse é o config/albuns/eca-digital.json da Fase 4. Cobre todos os tipos e
// variantes (2 e 3 opções, A/B/C e Sim/Não, personagem esq/dir, balão topo/lateral).
export const escolaExemplo = {
  id: 'colegio-demo',
  nome: 'Colégio Demo',
  logoUrl: 'https://placehold.co/120x48/3B4BC8/FFFFFF?text=Escola',
  ativo: true,
};

export const configExemplo = {
  albumId: 'exemplo',
  titulo: 'ECA Digital',
  assetsBasePath: '/assets/exemplo',
  tema: {
    corPrimaria: '#3B4BC8',
    corSecundaria: '#D4A017',
    corFundo: '#E8E0F0',
    corTexto: '#1A1A2E',
    fonteCorpo: 'Inter, sans-serif',
  },
  passos: [
    {
      id: 'capa',
      tipo: 'capa',
      titulo: 'ECA Digital — Álbum 1',
      textoBotao: 'Próxima página',
    },
    {
      id: 'bv',
      tipo: 'boas-vindas',
      paragrafos: [
        'Bem-vindo(a) ao **Álbum 1** da Coleção!',
        'Responda às perguntas e **revele cada figurinha** para avançar.',
      ],
      textoBotao: 'Próxima página',
    },
    {
      id: 'sec1-conteudo',
      tipo: 'conteudo',
      tituloHeader: 'ECA Digital — seção 01',
      personagem: { imagem: 'personagens/astro.png', posicao: 'direita' },
      balao: { texto: 'Oi! Vamos começar?', variante: 'lateral' },
      blocos: ['A lei **protege crianças** em jogos, apps e sites.'],
      textoBotao: 'Próxima página',
    },
    {
      id: 'sec1-pergunta',
      tipo: 'pergunta',
      tituloHeader: 'ECA Digital — seção 01',
      personagem: { imagem: 'personagens/inanna.png', posicao: 'direita' },
      balao: { texto: 'Acerte e abra a **1ª figurinha**!', variante: 'topo' },
      balaoErro: 'Leia com atenção!',
      enunciado: 'Quando um aplicativo precisa proteger crianças?',
      opcoes: [
        { rotulo: 'A', texto: 'Só se for pago' },
        { rotulo: 'B', texto: 'Nunca' },
        { rotulo: 'C', texto: 'Sempre que houver público infantil' },
      ],
      respostaCorreta: 'C',
      recompensa: {
        figurinha: {
          numero: 1,
          titulo: 'Proteção às crianças',
          legenda: 'Capítulo 1 — ECA Digital (Art. 1º)',
          imagemCheia: 'figurinhas/01.png',
        },
      },
    },
    {
      id: 'sec1-trofeu',
      tipo: 'trofeu',
      valor: 'S',
      tipoValor: 'letra',
      legenda: 'Primeira letra do código secreto',
      imagemTrofeu: 'trofeus/01.png',
    },
    {
      id: 'sec2-informativo',
      tipo: 'conteudo',
      tituloHeader: 'ECA Digital — seção 02',
      personagem: { imagem: 'personagens/inanna.png', posicao: 'esquerda' },
      balao: { texto: 'Agora abra **outra figurinha**!', variante: 'topo' },
      blocos: ['As **medidas de segurança** devem existir desde o **começo**.'],
      textoBotao: 'Abrir figurinha',
      recompensa: {
        figurinha: {
          numero: 2,
          titulo: 'Segurança desde o começo',
          legenda: 'Capítulo 2 — ECA Digital',
          imagemCheia: 'figurinhas/02.png',
        },
      },
    },
    {
      id: 'sec2-pergunta',
      tipo: 'pergunta',
      tituloHeader: 'ECA Digital — seção 02',
      enunciado: 'Conteúdo impróprio pode ser oferecido a crianças?',
      opcoes: [
        { rotulo: 'Sim', texto: 'Pode sim' },
        { rotulo: 'Não', texto: 'Não pode' },
      ],
      respostaCorreta: 'Não',
      recompensa: {
        figurinha: {
          numero: 3,
          titulo: 'Conteúdo seguro',
          imagemCheia: 'figurinhas/03.png',
        },
      },
    },
    {
      id: 'sec2-trofeu',
      tipo: 'trofeu',
      valor: '2',
      tipoValor: 'numero',
      legenda: 'Primeiro número do código secreto',
      imagemTrofeu: 'trofeus/02.png',
    },
    {
      id: 'fim',
      tipo: 'encerramento',
      mostrarCodigoSecreto: true,
      paragrafos: [
        '**Missão cumprida... por enquanto!**',
        'Sua aventura continua no próximo álbum.',
      ],
    },
  ],
};
