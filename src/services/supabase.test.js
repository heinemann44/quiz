import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { urlPublicaLogo } from './supabase.js';

// URL fixa via stub: valida a montagem da URL pública do Storage sem depender do
// .env real (que pode não existir no ambiente de teste).
const BASE = 'https://projeto.supabase.co';

describe('urlPublicaLogo', () => {
  beforeEach(() => vi.stubEnv('VITE_SUPABASE_URL', BASE));
  afterEach(() => vi.unstubAllEnvs());

  it('isola por ambiente: caminho vira logos/<schema>/<arquivo>', () => {
    vi.stubEnv('VITE_SUPABASE_SCHEMA', 'hml');
    expect(urlPublicaLogo('colegio-demo.png')).toBe(
      `${BASE}/storage/v1/object/public/logos/hml/colegio-demo.png`,
    );
  });

  it('cai em dev quando o schema não está definido', () => {
    vi.stubEnv('VITE_SUPABASE_SCHEMA', '');
    expect(urlPublicaLogo('x.png')).toBe(
      `${BASE}/storage/v1/object/public/logos/dev/x.png`,
    );
  });

  it('repassa uma URL http(s) já pronta (compat/placeholder)', () => {
    const url = 'https://placehold.co/160x80/png';
    expect(urlPublicaLogo(url)).toBe(url);
  });

  it('retorna string vazia quando não há referência', () => {
    expect(urlPublicaLogo('')).toBe('');
    expect(urlPublicaLogo(undefined)).toBe('');
    expect(urlPublicaLogo(null)).toBe('');
  });
});
