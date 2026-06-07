import { validarConfig, TipoPasso } from './tipos.js';

const passo = (extra) => ({ id: 'x', tipo: TipoPasso.CAPA, ...extra });
const comPassos = (...passos) => ({ passos });

describe('validarConfig (plan §9)', () => {
  it('config sem passos → problema', () => {
    expect(validarConfig({}).length).toBe(1);
    expect(validarConfig({ passos: [] }).length).toBe(1);
  });

  it('config mínima válida → sem problemas', () => {
    expect(validarConfig(comPassos(passo({ id: 'capa' })))).toEqual([]);
  });

  it('tipo desconhecido é apontado com contexto', () => {
    const [p] = validarConfig(comPassos(passo({ id: 'z', tipo: 'fantasma' })));
    expect(p).toMatch(/tipo desconhecido "fantasma".*passo "z"/);
  });

  it('id duplicado é apontado', () => {
    const probs = validarConfig(
      comPassos(passo({ id: 'a' }), passo({ id: 'a' })),
    );
    expect(probs.some((p) => /duplicado "a"/.test(p))).toBe(true);
  });

  it('pergunta: respostaCorreta fora das opções é apontada com contexto', () => {
    const p = passo({
      id: 'p1',
      tipo: TipoPasso.PERGUNTA,
      opcoes: [{ rotulo: 'A' }, { rotulo: 'B' }],
      respostaCorreta: 'D',
    });
    const [problema] = validarConfig(comPassos(p));
    expect(problema).toMatch(
      /respostaCorreta "D" não existe em opções \[A,B\] no passo "p1"/,
    );
  });

  it('pergunta: fora de 2–3 opções é apontada', () => {
    const p = passo({
      id: 'p',
      tipo: TipoPasso.PERGUNTA,
      opcoes: [{ rotulo: 'A' }],
      respostaCorreta: 'A',
    });
    expect(validarConfig(comPassos(p))[0]).toMatch(/2 a 3 opções/);
  });

  it('recompensa sem figurinha.numero é apontada', () => {
    const p = passo({
      id: 'c',
      tipo: TipoPasso.CONTEUDO,
      recompensa: { figurinha: {} },
    });
    expect(validarConfig(comPassos(p))[0]).toMatch(/figurinha\.numero/);
  });

  it('troféu sem valor é apontado', () => {
    const p = passo({ id: 't', tipo: TipoPasso.TROFEU });
    expect(validarConfig(comPassos(p))[0]).toMatch(/troféu sem "valor"/);
  });
});
