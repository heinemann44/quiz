import { describe, it, expect } from 'vitest';
import { linkDeAcesso } from './links.js';

describe('linkDeAcesso', () => {
  it('monta a rota de entrada do aluno a partir da origem', () => {
    expect(linkDeAcesso('colegio-demo', 'https://app.vercel.app')).toBe(
      'https://app.vercel.app/quiz/colegio-demo',
    );
  });

  it('usa a origem da janela por padrão (jsdom)', () => {
    // jsdom expõe window.location.origin (http://localhost:3000 por padrão).
    expect(linkDeAcesso('colegio-multi')).toBe(
      `${window.location.origin}/quiz/colegio-multi`,
    );
  });
});
