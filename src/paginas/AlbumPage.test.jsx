import { screen } from '@testing-library/react';
import App from '../App.jsx';
import { renderRota } from '../test/renderRota.jsx';
import { colegio, vinculo } from '../test/fixtures.js';

const abrir = (id, albumId, valor) =>
  renderRota(<App />, {
    rota: `/quiz/${id}/${albumId}`,
    porId: { [id]: valor },
  });

describe('AlbumPage — validação de liberação (RF-01b)', () => {
  it('álbum liberado → entra (stub do motor)', async () => {
    abrir('colegio-x', 'eca-digital', colegio([vinculo('eca-digital', true)]));
    expect(await screen.findByText('Álbum liberado')).toBeInTheDocument();
  });

  it('álbum não liberado → bloqueado, sem revelar se existe', async () => {
    abrir('colegio-x', 'eca-digital', colegio([vinculo('eca-digital', false)]));
    expect(await screen.findByText('Álbum não disponível')).toBeInTheDocument();
  });

  it('álbum fora do vínculo do colégio → bloqueado', async () => {
    abrir('colegio-x', 'outro-album', colegio([vinculo('eca-digital', true)]));
    expect(await screen.findByText('Álbum não disponível')).toBeInTheDocument();
  });

  it('escola inexistente → não encontrado', async () => {
    abrir('colegio-x', 'eca-digital', null);
    expect(
      await screen.findByText('Página não encontrada'),
    ).toBeInTheDocument();
  });

  it('escola inativa → indisponível', async () => {
    abrir(
      'colegio-x',
      'eca-digital',
      colegio([vinculo('eca-digital', true)], { ativo: false }),
    );
    expect(
      await screen.findByText(/Fale com a sua escola/),
    ).toBeInTheDocument();
  });
});
