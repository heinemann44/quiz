import { resolverEstilo } from './estilo.js';

const tema = {
  corFundo: '#FFF',
  corTexto: '#000',
  corPrimaria: '#00F',
  fonteCorpo: 'Inter',
};

describe('resolverEstilo (cascata RF-16 / P-11)', () => {
  it('sem override, cai no tema', () => {
    expect(resolverEstilo(tema)).toEqual({
      corFundo: '#FFF',
      corTexto: '#000',
      fonte: 'Inter',
    });
  });

  it('passo sobrescreve o tema', () => {
    expect(resolverEstilo(tema, { corFundo: '#111' }).corFundo).toBe('#111');
  });

  it('elemento vence passo (mais específico)', () => {
    const r = resolverEstilo(tema, { corTexto: '#222' }, { corTexto: '#333' });
    expect(r.corTexto).toBe('#333');
  });

  it('undefined numa camada não apaga o valor anterior', () => {
    const r = resolverEstilo(
      tema,
      { corFundo: '#abc' },
      { corFundo: undefined },
    );
    expect(r.corFundo).toBe('#abc');
  });

  it('chaves extras (borda, negrito) passam adiante', () => {
    const r = resolverEstilo(tema, { corBorda: '#D4A017', negrito: true });
    expect(r.corBorda).toBe('#D4A017');
    expect(r.negrito).toBe(true);
  });
});
