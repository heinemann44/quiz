import { screen } from '@testing-library/react';
import App from '../App.jsx';
import { renderRota } from '../test/renderRota.jsx';
import { colegio, vinculo } from '../test/fixtures.js';

// Renderiza via <App/> para exercitar rota + params (RF-01/01a/14/15).
const entrar = (id, valor) =>
  renderRota(<App />, { rota: `/quiz/${id}`, porId: { [id]: valor } });

describe('QuizEntradaPage — desfechos da entrada', () => {
  it('escola inexistente → não encontrado (RF-15)', async () => {
    entrar('colegio-x', null);
    expect(
      await screen.findByText('Página não encontrada'),
    ).toBeInTheDocument();
  });

  it('escola inativa → indisponível discreto (RF-14)', async () => {
    entrar('colegio-x', colegio([vinculo('a', true)], { ativo: false }));
    expect(
      await screen.findByText(/Fale com a sua escola/),
    ).toBeInTheDocument();
  });

  it('sem álbuns liberados → indisponível', async () => {
    entrar('colegio-x', colegio([vinculo('a', false)]));
    expect(
      await screen.findByText(/Nenhum álbum disponível/),
    ).toBeInTheDocument();
  });

  it('2+ liberados → seletor com bloqueado marcado (RF-01a)', async () => {
    entrar(
      'colegio-x',
      colegio([
        vinculo('eca-digital', true, 1),
        vinculo('mundo-do-trabalho', true, 2),
        vinculo('consumo-consciente', false, 3),
      ]),
    );
    expect(await screen.findByText('Eca Digital')).toBeInTheDocument();
    expect(screen.getByText('Mundo Do Trabalho')).toBeInTheDocument();
    expect(screen.getByLabelText('bloqueado')).toBeInTheDocument();
  });
});
