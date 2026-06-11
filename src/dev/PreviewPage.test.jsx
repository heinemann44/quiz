import { render, screen, fireEvent } from '@testing-library/react';
import PreviewPage from './PreviewPage.jsx';

const proxima = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
const clicarTexto = (re) => fireEvent.click(screen.getByText(re));

// Caminha o fluxo inteiro com a config de exemplo — valida a Fase 3 ponta a ponta
// (todos os tipos, erro/acerto, recompensa, troféu, encerramento, contador).
describe('PreviewPage — fluxo completo dos passos', () => {
  it('vai da capa ao encerramento passando por erro, recompensa e troféu', () => {
    render(<PreviewPage />);

    // capa → boas-vindas → conteúdo → pergunta
    expect(screen.getByText(/ECA Digital — Álbum 1/)).toBeInTheDocument();
    proxima();
    expect(screen.getByText(/Bem-vindo/)).toBeInTheDocument();
    proxima();
    expect(screen.getByText(/Vamos começar/)).toBeInTheDocument();
    proxima();
    expect(
      screen.getByText(/Quando um aplicativo precisa proteger/),
    ).toBeInTheDocument();

    // erro: marca a opção e mostra "Volte"; depois volta
    clicarTexto('Só se for pago');
    expect(screen.getByLabelText('resposta errada')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Volte' }));

    // acerto → revelação (Nº 01) → figurinha cheia (contador 0 antes de coletar)
    clicarTexto(/público infantil/);
    expect(screen.getByText(/Figurinha Nº 01/)).toBeInTheDocument();
    proxima();
    expect(screen.getByAltText('Proteção às crianças')).toBeInTheDocument();
    proxima();

    // troféu "S"
    expect(screen.getByText('S')).toBeInTheDocument();
    proxima();

    // conteúdo informativo → "Abrir figurinha" (Nº 02)
    expect(screen.getByText(/Agora abra/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir figurinha' }));
    expect(screen.getByText(/Figurinha Nº 02/)).toBeInTheDocument();
    proxima();
    proxima(); // cheia → pergunta Sim/Não

    // pergunta Sim/Não (rótulos), acerto "Não pode" → figurinha 03
    expect(screen.getByText(/Conteúdo impróprio/)).toBeInTheDocument();
    clicarTexto('Não pode');
    expect(screen.getByText(/Figurinha Nº 03/)).toBeInTheDocument();
    proxima();
    proxima(); // cheia → troféu "2"
    expect(screen.getByText('2')).toBeInTheDocument();
    proxima();

    // encerramento (só os parágrafos; o bloco de código foi removido da tela)
    expect(screen.getByText(/Missão cumprida/)).toBeInTheDocument();
  });
});
