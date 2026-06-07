import { criarEstadoInicial, reduzir, Acao, SubTela } from './maquina.js';
import { configFixture as cfg } from '../test/configFixture.js';

// Aplica uma sequência de ações sobre o estado inicial. Cada ação é Acao.* ou
// ['RESPONDER', rotulo].
function rodar(...acoes) {
  return acoes.reduce((estado, a) => {
    const acao = Array.isArray(a) ? { tipo: a[0], rotulo: a[1] } : { tipo: a };
    return reduzir(estado, acao, cfg);
  }, criarEstadoInicial(cfg));
}

const A = Acao.AVANCAR;

describe('máquina de passos (plan §4)', () => {
  it('estado inicial: capa, principal, sem coletas', () => {
    const e = criarEstadoInicial(cfg);
    expect(e).toMatchObject({
      indice: 0,
      subTela: SubTela.PRINCIPAL,
      figurinhas: [],
      codigo: [],
    });
  });

  it('passos simples avançam o índice', () => {
    expect(rodar(A).indice).toBe(1); // capa → bv
    expect(rodar(A, A).indice).toBe(2); // → c1
    expect(rodar(A, A, A).indice).toBe(3); // c1 sem recompensa → c2
  });

  it('conteúdo com recompensa dispara card → cheia → coleta e avança (RF-07)', () => {
    const naC2 = rodar(A, A, A); // indice 3 = c2
    const card = reduzir(naC2, { tipo: A }, cfg);
    expect(card.subTela).toBe(SubTela.CARD);
    const cheia = reduzir(card, { tipo: A }, cfg);
    expect(cheia.subTela).toBe(SubTela.CHEIA);
    const depois = reduzir(cheia, { tipo: A }, cfg);
    expect(depois.indice).toBe(4); // → p1
    expect(depois.figurinhas).toEqual([
      { numero: 1, imagemCheia: 'figurinhas/01.png' },
    ]);
  });

  it('pergunta: resposta errada marca a opção, sem avançar (RN-03)', () => {
    const errou = rodar(A, A, A, A, A, A, ['RESPONDER', 'A']); // chega em p1 e erra
    expect(errou.subTela).toBe(SubTela.ERRO);
    expect(errou.opcaoErrada).toBe('A');
    expect(errou.indice).toBe(4);
  });

  it('pergunta: "Volte" limpa o erro e volta à principal', () => {
    const voltou = rodar(
      A,
      A,
      A,
      A,
      A,
      A,
      ['RESPONDER', 'A'],
      Acao.VOLTAR_ERRO,
    );
    expect(voltou.subTela).toBe(SubTela.PRINCIPAL);
    expect(voltou.opcaoErrada).toBeNull();
  });

  it('tentativas ilimitadas: erra, volta e acerta → recompensa', () => {
    const certo = rodar(
      A,
      A,
      A,
      A,
      A,
      A,
      ['RESPONDER', 'A'],
      Acao.VOLTAR_ERRO,
      ['RESPONDER', 'A'],
      Acao.VOLTAR_ERRO,
      ['RESPONDER', 'B'],
    );
    expect(certo.subTela).toBe(SubTela.CARD);
  });

  it('acerto coleta figurinha; troféu registra o código ao entrar (RN-05/06)', () => {
    const noTrofeu = rodar(
      A,
      A,
      A, // → c2
      A,
      A,
      A, // c2: card, cheia, coleta → p1 (figurinha 1)
      ['RESPONDER', 'B'],
      A,
      A, // p1 acerto: card, cheia, coleta → t1 (figurinha 2)
    );
    expect(noTrofeu.indice).toBe(5); // t1
    expect(noTrofeu.figurinhas.map((f) => f.numero)).toEqual([1, 2]);
    expect(noTrofeu.codigo).toEqual([{ valor: 'S', tipo: 'letra' }]);
  });

  it('encerramento é terminal: avançar não muda nada (RF-11)', () => {
    const fim = rodar(A, A, A, A, A, A, ['RESPONDER', 'B'], A, A, A); // até o fim
    expect(cfg.passos[fim.indice].tipo).toBe('encerramento');
    expect(reduzir(fim, { tipo: A }, cfg)).toEqual(fim);
  });
});

// SSOT (doc/tema-5): a pergunta 5 não tem tela de erro — errar manda o aluno
// reler o conteúdo da seção ("a resposta está em negrito"). Emenda ao RF-05.
describe('máquina: pergunta com aoErrar="voltar-conteudo"', () => {
  const cfgVoltar = {
    passos: [
      { id: 'sec', tipo: 'conteudo' },
      {
        id: 'perg',
        tipo: 'pergunta',
        aoErrar: 'voltar-conteudo',
        respostaCorreta: 'sim',
        opcoes: [
          { rotulo: 'sim', texto: 'Sim' },
          { rotulo: 'nao', texto: 'Não' },
        ],
        recompensa: { figurinha: { numero: 6 } },
      },
    ],
  };
  const naPergunta = reduzir(
    criarEstadoInicial(cfgVoltar),
    { tipo: Acao.AVANCAR },
    cfgVoltar,
  );

  it('errar volta ao conteúdo anterior, sem tela de erro', () => {
    expect(naPergunta.indice).toBe(1);
    const errou = reduzir(
      naPergunta,
      { tipo: Acao.RESPONDER, rotulo: 'nao' },
      cfgVoltar,
    );
    expect(errou.indice).toBe(0); // voltou ao conteúdo
    expect(errou.subTela).toBe(SubTela.PRINCIPAL);
    expect(errou.opcaoErrada).toBeNull();
  });

  it('acertar segue para a recompensa normalmente', () => {
    const acertou = reduzir(
      naPergunta,
      { tipo: Acao.RESPONDER, rotulo: 'sim' },
      cfgVoltar,
    );
    expect(acertou.subTela).toBe(SubTela.CARD);
  });
});
