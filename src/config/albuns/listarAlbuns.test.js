import { describe, it, expect } from 'vitest';
import { listarAlbuns } from './index.js';

describe('listarAlbuns', () => {
  it('lista o catálogo como { id, titulo }', () => {
    const albuns = listarAlbuns();
    expect(albuns).toContainEqual({ id: 'eca-digital', titulo: 'ECA Digital' });
  });

  it('todo item tem id e titulo não-vazios', () => {
    for (const a of listarAlbuns()) {
      expect(a.id).toBeTruthy();
      expect(a.titulo).toBeTruthy();
    }
  });
});
