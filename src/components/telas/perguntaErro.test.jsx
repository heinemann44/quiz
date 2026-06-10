import { render, screen } from '@testing-library/react';
import Renderer from './Renderer.jsx';
import { AlbumProvider } from '../AlbumContext.jsx';

// Regressão do bug que originou esta arquitetura: a tela de PERGUNTA e a de ERRO
// eram o MESMO componente (um `if (erro)` + `-bottom-25` compartilhado), então
// ajustar o personagem do erro mexia na pergunta. Agora são telas SEPARADAS:
// cada `subTela` resolve para um componente próprio. Estes testes travam isso —
// se alguém voltar a fundir as duas, a separação some e o teste quebra.

const valor = {
  tema: { corPrimaria: '#000', corErro: '#EF4444', corSecundaria: '#D4A017' },
  assetsBasePath: '',
  escola: null,
};
const passo = {
  id: 'p-generica', // id sem tela própria → cai nas telas-base Pergunta/Erro
  tipo: 'pergunta',
  enunciado: 'Pergunta?',
  balao: 'oi',
  personagem: { imagem: 'a.png', posicao: 'direita' },
  personagemErro: { imagem: 'b.png', posicao: 'esquerda' },
  balaoErro: 'leia',
  opcoes: [
    { rotulo: 'A', texto: 'opcao-A' },
    { rotulo: 'B', texto: 'opcao-B' },
    { rotulo: 'C', texto: 'opcao-C' },
  ],
  respostaCorreta: 'C',
};
const montar = (quiz) =>
  render(
    <AlbumProvider valor={valor}>
      <Renderer quiz={{ passo, ...quiz }} />
    </AlbumProvider>,
  );

describe('pergunta × erro são telas distintas', () => {
  it('tela de pergunta: todas as opções, sem "Volte" nem marca de erro', () => {
    montar({ subTela: 'principal', responder: vi.fn() });
    expect(screen.getByText('opcao-A')).toBeInTheDocument();
    expect(screen.getByText('opcao-B')).toBeInTheDocument();
    expect(screen.getByText('opcao-C')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Volte' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText('resposta errada')).not.toBeInTheDocument();
  });

  it('tela de erro: só a opção escolhida com X e o botão "Volte"', () => {
    montar({ subTela: 'erro', opcaoErrada: 'A', voltarDoErro: vi.fn() });
    expect(screen.getByText('opcao-A')).toBeInTheDocument();
    expect(screen.queryByText('opcao-B')).not.toBeInTheDocument();
    expect(screen.queryByText('opcao-C')).not.toBeInTheDocument();
    expect(screen.getByLabelText('resposta errada')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volte' })).toBeInTheDocument();
  });
});
