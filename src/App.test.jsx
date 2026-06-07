import { screen } from '@testing-library/react';
import App from './App.jsx';
import { renderRota } from './test/renderRota.jsx';
import { colegio, vinculo } from './test/fixtures.js';

describe('App — roteamento (plan §2)', () => {
  it('rota desconhecida cai no NaoEncontrado', () => {
    renderRota(<App />, { rota: '/rota-invalida' });
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });

  it('entrada com 1 álbum liberado redireciona direto para o álbum (RF-01)', async () => {
    renderRota(<App />, {
      rota: '/quiz/colegio-demo',
      porId: { 'colegio-demo': colegio([vinculo('eca-digital', true)]) },
    });
    expect(
      await screen.findByRole('button', { name: 'Próxima página' }),
    ).toBeInTheDocument();
    expect(screen.getByText('ECA Digital')).toBeInTheDocument();
  });
});
