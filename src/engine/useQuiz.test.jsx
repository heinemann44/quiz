import { renderHook, act } from '@testing-library/react';
import { useQuiz } from './useQuiz.js';
import { configFixture } from '../test/configFixture.js';

describe('useQuiz (hook)', () => {
  it('começa na capa, não acabou', () => {
    const { result } = renderHook(() => useQuiz(configFixture));
    expect(result.current.passo.id).toBe('capa');
    expect(result.current.acabou).toBe(false);
  });

  it('avancar troca de passo', () => {
    const { result } = renderHook(() => useQuiz(configFixture));
    act(() => result.current.avancar());
    expect(result.current.passo.id).toBe('bv');
  });

  it('erro expõe opcaoErrada; depois de voltar, acerto abre a recompensa', () => {
    const { result } = renderHook(() => useQuiz(configFixture));
    // capa→bv→c1→c2→(card→cheia→coleta)→p1
    for (let i = 0; i < 6; i++) act(() => result.current.avancar());
    expect(result.current.passo.id).toBe('p1');

    act(() => result.current.responder('A'));
    expect(result.current.opcaoErrada).toBe('A');

    act(() => result.current.voltarDoErro());
    act(() => result.current.responder('B'));
    expect(result.current.subTela).toBe('recompensa-card');
  });
});
