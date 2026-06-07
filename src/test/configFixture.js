// Config-fixture mínima para testar o motor (não é o álbum real — esse é da Fase 4).
// Cobre todos os tipos e sub-fluxos: conteúdo com/sem recompensa, pergunta
// (erro/acerto), troféu e encerramento.
export const configFixture = {
  albumId: 'fixture',
  assetsBasePath: '/assets/fixture',
  tema: {
    corFundo: '#FFFFFF',
    corTexto: '#000000',
    corPrimaria: '#0000FF',
    fonteCorpo: 'Inter',
  },
  passos: [
    {
      id: 'capa',
      tipo: 'capa',
      imagemFundo: 'fundos/capa.png',
      textoBotao: 'Próxima',
    },
    {
      id: 'bv',
      tipo: 'boas-vindas',
      paragrafos: ['Olá!'],
      textoBotao: 'Próxima',
    },
    {
      id: 'c1',
      tipo: 'conteudo',
      personagem: { imagem: 'personagens/inanna.png', posicao: 'esquerda' },
      textoBotao: 'Próxima',
    },
    {
      id: 'c2',
      tipo: 'conteudo',
      textoBotao: 'Abrir figurinha',
      recompensa: {
        figurinha: { numero: 1, imagemCheia: 'figurinhas/01.png' },
      },
    },
    {
      id: 'p1',
      tipo: 'pergunta',
      enunciado: 'Quanto é 2 + 2?',
      opcoes: [
        { rotulo: 'A', texto: '3' },
        { rotulo: 'B', texto: '4' },
      ],
      respostaCorreta: 'B',
      recompensa: {
        figurinha: { numero: 2, imagemCheia: 'figurinhas/02.png' },
      },
    },
    {
      id: 't1',
      tipo: 'trofeu',
      valor: 'S',
      tipoValor: 'letra',
      imagemTrofeu: 'trofeus/01.png',
    },
    { id: 'fim', tipo: 'encerramento', mostrarCodigoSecreto: true },
  ],
};
