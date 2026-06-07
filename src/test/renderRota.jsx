import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ColegioRepoProvider } from '../services/ColegioRepoContext.jsx';
import { FakeColegioRepo } from '../services/FakeColegioRepo.js';

/**
 * Renderiza a árvore com um repo fake injetado e uma rota inicial.
 * @param {import('react').ReactNode} ui
 * @param {{ rota?: string, porId?: Record<string, object|null> }} opcoes
 */
export function renderRota(ui, { rota = '/', porId = {} } = {}) {
  const repo = new FakeColegioRepo(porId);
  return render(
    <ColegioRepoProvider repo={repo}>
      <MemoryRouter initialEntries={[rota]}>{ui}</MemoryRouter>
    </ColegioRepoProvider>,
  );
}
