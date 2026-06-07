import { resolverAsset, coletarAssets, precarregar } from './preload.js';
import { configFixture } from '../test/configFixture.js';

describe('resolverAsset', () => {
  it('junta base + caminho relativo', () => {
    expect(resolverAsset('/assets/eca', 'fundos/capa.png')).toBe(
      '/assets/eca/fundos/capa.png',
    );
  });
  it('normaliza barra final da base', () => {
    expect(resolverAsset('/assets/eca/', 'x.png')).toBe('/assets/eca/x.png');
  });
  it('caminho absoluto ou http passa direto', () => {
    expect(resolverAsset('/assets/eca', '/x.png')).toBe('/x.png');
    expect(resolverAsset('/assets/eca', 'https://cdn/x.png')).toBe(
      'https://cdn/x.png',
    );
  });
  it('caminho vazio é devolvido como veio', () => {
    expect(resolverAsset('/assets/eca', undefined)).toBeUndefined();
  });
});

describe('coletarAssets', () => {
  it('coleta caminhos resolvidos, sem repetição e ignorando ausentes', () => {
    const assets = coletarAssets(configFixture);
    expect(assets).toContain('/assets/fixture/fundos/capa.png');
    expect(assets).toContain('/assets/fixture/figurinhas/01.png');
    expect(assets).toContain('/assets/fixture/trofeus/01.png');
    expect(new Set(assets).size).toBe(assets.length); // sem duplicatas
  });
});

describe('precarregar', () => {
  it('instancia uma Image por asset', () => {
    const srcs = [];
    vi.stubGlobal(
      'Image',
      class {
        set src(v) {
          srcs.push(v);
        }
      },
    );
    precarregar(configFixture);
    expect(srcs.length).toBe(coletarAssets(configFixture).length);
    vi.unstubAllGlobals();
  });
});
