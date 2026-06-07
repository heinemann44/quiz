import { validarConfig } from '../../engine/tipos.js';
import config from './eca-digital.json';

const passosDoTipo = (tipo) => config.passos.filter((p) => p.tipo === tipo);

// Guarda: o álbum real precisa passar na validação do motor (RF-03/04).
describe('config eca-digital.json', () => {
  it('passa na validação do motor sem problemas', () => {
    expect(validarConfig(config)).toEqual([]);
  });

  // Conteúdo da Fase 5: estrutura do Álbum 1 conforme a SSOT (doc/).
  it('tem 6 figurinhas numeradas em sequência (RF-08)', () => {
    const numeros = config.passos
      .map((p) => p.recompensa?.figurinha?.numero)
      .filter((n) => n != null);
    expect(numeros).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('tem os dois troféus do código secreto: "S" (letra) e "2" (número) (RF-10)', () => {
    expect(passosDoTipo('trofeu')).toMatchObject([
      { valor: 'S', tipoValor: 'letra' },
      { valor: '2', tipoValor: 'numero' },
    ]);
  });

  it('a pergunta 5 usa balões Sim/Não e volta ao conteúdo ao errar (SSOT/emenda RF-05)', () => {
    const perg5 = config.passos.find((p) => p.id === 'sec05-pergunta');
    expect(perg5.variante).toBe('baloes');
    expect(perg5.aoErrar).toBe('voltar-conteudo');
    expect(perg5.opcoes.map((o) => o.rotulo)).toEqual(['sim', 'nao']);
  });

  it('conteúdo e pergunta de cada seção têm fundo de seção (complemento Fase 5)', () => {
    const secoes = config.passos.filter(
      (p) =>
        p.id.startsWith('sec') &&
        (p.tipo === 'conteudo' || p.tipo === 'pergunta'),
    );
    expect(secoes).toHaveLength(11);
    expect(secoes.every((p) => Boolean(p.imagemFundo))).toBe(true);
  });
});
