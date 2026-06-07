import { resolverEntrada, Desfecho } from './resolverEntrada.js';

const escola = (extra = {}) => ({
  id: 'x',
  nome: 'X',
  logoUrl: '',
  ativo: true,
  ...extra,
});
const vinculo = (albumId, liberado, ordem = 0) => ({
  albumId,
  liberado,
  ordem,
});

describe('resolverEntrada (RF-01/01a/14/15)', () => {
  it('colégio nulo → inexistente (RF-15)', () => {
    expect(resolverEntrada(null).desfecho).toBe(Desfecho.INEXISTENTE);
  });

  it('escola inativa → inativo, mesmo com álbum liberado (RF-14)', () => {
    const colegio = {
      escola: escola({ ativo: false }),
      albuns: [vinculo('a', true)],
    };
    expect(resolverEntrada(colegio).desfecho).toBe(Desfecho.INATIVO);
  });

  it('zero álbuns liberados → indisponível', () => {
    const colegio = { escola: escola(), albuns: [vinculo('a', false)] };
    expect(resolverEntrada(colegio).desfecho).toBe(Desfecho.INDISPONIVEL);
  });

  it('um álbum liberado → direto, devolvendo o albumId', () => {
    const colegio = {
      escola: escola(),
      albuns: [vinculo('eca-digital', true)],
    };
    const r = resolverEntrada(colegio);
    expect(r.desfecho).toBe(Desfecho.DIRETO);
    expect(r.albumId).toBe('eca-digital');
  });

  it('dois ou mais liberados → seletor', () => {
    const colegio = {
      escola: escola(),
      albuns: [vinculo('a', true), vinculo('b', true), vinculo('c', false)],
    };
    expect(resolverEntrada(colegio).desfecho).toBe(Desfecho.SELETOR);
  });
});
