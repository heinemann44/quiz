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
      porId: { 'colegio-demo': colegio([vinculo('eca-digital-1', true)]) },
    });
    // 1 álbum liberado entra direto no motor: a capa do álbum traz o botão de
    // avanço (o seletor, não — confirma o redirect direto, RF-01).
    expect(
      await screen.findByRole('button', { name: 'Próxima página' }),
    ).toBeInTheDocument();
  });
});
