import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

// O Router fica no main.jsx; aqui injetamos um MemoryRouter por rota.
function renderEm(rota) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <App />
    </MemoryRouter>,
  );
}

describe('roteamento (plan §2)', () => {
  it('/quiz/:escolaId mostra a entrada com o escolaId', () => {
    renderEm('/quiz/colegio-abc');
    expect(screen.getByText('Entrada do quiz')).toBeInTheDocument();
    expect(screen.getByText('colegio-abc')).toBeInTheDocument();
  });

  it('/quiz/:escolaId/:albumId mostra o álbum com escola e álbum', () => {
    renderEm('/quiz/colegio-abc/eca-digital');
    expect(screen.getByText('Álbum')).toBeInTheDocument();
    expect(screen.getByText('eca-digital')).toBeInTheDocument();
  });

  it('rota desconhecida cai no NaoEncontrado', () => {
    renderEm('/rota-invalida');
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });
});
