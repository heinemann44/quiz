import { screen, fireEvent } from '@testing-library/react';
import App from '../App.jsx';
import { renderRota } from '../test/renderRota.jsx';
import { colegio, vinculo } from '../test/fixtures.js';

const abrir = (id, albumId, valor) =>
  renderRota(<App />, {
    rota: `/quiz/${id}/${albumId}`,
    porId: { [id]: valor },
  });

describe('AlbumPage — validação de liberação (RF-01b)', () => {
  it('álbum liberado → entra no motor (capa → boas-vindas)', async () => {
    abrir('colegio-x', 'eca-digital', colegio([vinculo('eca-digital', true)]));
    // A capa é arte cheia (título gravado em capa.png), então valido o motor real
    // avançando para as boas-vindas do Álbum 1.
    fireEvent.click(
      await screen.findByRole('button', { name: 'Próxima página' }),
    );
    expect(screen.getByText(/Bem-vindo/)).toBeInTheDocument();
  });

  it('liberado no banco mas sem config → não encontrado (RF-01b)', async () => {
    abrir(
      'colegio-x',
      'mundo-do-trabalho',
      colegio([vinculo('mundo-do-trabalho', true)]),
    );
    expect(
      await screen.findByText('Página não encontrada'),
    ).toBeInTheDocument();
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

// Caminha o Álbum 1 real (config + motor + componentes da Fase 5) ponta a ponta:
// 5 seções, 6 figurinhas, 2 troféus, pergunta de balões com retorno ao conteúdo.
describe('AlbumPage — fluxo completo do Álbum 1 (Fase 5)', () => {
  const proxima = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
  const clica = (alvo) => fireEvent.click(screen.getByText(alvo));
  const revela = (n) => {
    expect(
      screen.getByText(new RegExp(`Figurinha Nº 0${n}`)),
    ).toBeInTheDocument();
    proxima(); // card → tela cheia
    proxima(); // tela cheia → coleta e avança
  };

  it('vai da capa ao encerramento com código secreto "S 2" e 6 figurinhas', async () => {
    abrir('colegio-x', 'eca-digital', colegio([vinculo('eca-digital', true)]));
    expect(
      await screen.findByRole('button', { name: 'Próxima página' }),
    ).toBeInTheDocument();
    proxima(); // capa → boas-vindas
    expect(screen.getByText(/Bem-vindo/)).toBeInTheDocument();
    proxima(); // → seção 1 conteúdo

    // Seção 1: conteúdo (Enki) → pergunta (erra, "Volte", acerta) → figurinha 01
    expect(screen.getByText(/meu nome é/)).toBeInTheDocument();
    proxima();
    expect(screen.getByText(/precisa proteger crianças/)).toBeInTheDocument();
    clica('Quando o app só funciona à noite.');
    expect(screen.getByLabelText('resposta errada')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Volte' }));
    clica('Quando é feito para crianças ou pode ser usado por elas.');
    revela(1);

    // Seção 2
    expect(
      screen.getByText(/direito de receber orientação/),
    ).toBeInTheDocument();
    proxima();
    expect(
      screen.getByText(/devem fazer quando seus jovens/),
    ).toBeInTheDocument();
    clica('Ajudar, proteger e acompanhar.');
    revela(2);

    // Seção 3 → primeiro troféu "S"
    expect(
      screen.getByText(/uso da tecnologia por crianças/),
    ).toBeInTheDocument();
    proxima();
    expect(
      screen.getByText(/O que a tecnologia deve garantir/),
    ).toBeInTheDocument();
    clica('Inclusão e respeito às diferenças.');
    revela(3);
    // Troféu 1 (Sec03Trofeu): valor "S" exibido junto do "anote!"; a legenda é o
    // marcador estável da tela. O código "S 2" é conferido no encerramento.
    expect(
      screen.getByText('Primeira letra do código secreto'),
    ).toBeInTheDocument();
    proxima();

    // Seção 4: pergunta (2 opções) → figurinha 04; informativo → figurinha 05
    expect(
      screen.getByText(/Sites e apps devem ser seguros/),
    ).toBeInTheDocument();
    proxima();
    expect(
      screen.getByText(/Como deve ser a segurança dos jovens/),
    ).toBeInTheDocument();
    clica(
      'Segurança desde o começo, oferecendo ajuda de verdade e trabalho em equipe.',
    );
    revela(4);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir figurinha' }));
    revela(5);

    // Seção 5: balões — erra "Não" volta ao conteúdo; acerta "Sim" → figurinha 06
    expect(screen.getByText('Artigo 8º')).toBeInTheDocument();
    proxima();
    expect(screen.getByText(/Os apps devem criar alertas/)).toBeInTheDocument();
    clica('Não');
    expect(screen.getByText(/Veja, a resposta está em/)).toBeInTheDocument();
    proxima(); // relê o conteúdo → volta à pergunta
    expect(screen.getByText(/Os apps devem criar alertas/)).toBeInTheDocument();
    clica('Sim');
    revela(6);

    // Segundo troféu "2" → encerramento
    expect(screen.getByText('2')).toBeInTheDocument();
    proxima();
    expect(screen.getByText(/Missão cumprida/)).toBeInTheDocument();
    expect(screen.getByText(/S\s+2/)).toBeInTheDocument();
    expect(screen.getByText(/Figurinhas conquistadas: 6/)).toBeInTheDocument();
  });
});
