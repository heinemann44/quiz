import { render, screen, fireEvent } from '@testing-library/react';
import Renderer from './Renderer.jsx';
import { AlbumProvider } from '../AlbumContext.jsx';

const valor = {
  tema: { corPrimaria: '#000' },
  assetsBasePath: '',
  escola: null,
};
const montar = (quiz) =>
  render(
    <AlbumProvider valor={valor}>
      <Renderer quiz={quiz} />
    </AlbumProvider>,
  );

describe('Renderer (motor→UI por registro de telas)', () => {
  it('seleciona a tela pelo tipo quando não há tela própria', () => {
    montar({
      passo: { tipo: 'capa', titulo: 'Capa X' },
      subTela: 'principal',
    });
    expect(screen.getByText('Capa X')).toBeInTheDocument();
  });

  it('sub-tela de recompensa tem prioridade sobre o tipo', () => {
    const avancar = vi.fn();
    montar({
      passo: { tipo: 'pergunta', recompensa: { figurinha: { numero: 5 } } },
      subTela: 'recompensa-card',
      figurinhas: [],
      avancar,
    });
    expect(screen.getByText(/Figurinha Nº 05/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
    expect(avancar).toHaveBeenCalled();
  });

  it('usa a tela própria (por id) quando registrada — isolamento por tela', () => {
    montar({
      passo: {
        id: 'sec01-pergunta',
        tipo: 'pergunta',
        enunciado: 'Pergunta da seção 1?',
        opcoes: [
          { rotulo: 'A', texto: 'aa' },
          { rotulo: 'B', texto: 'bb' },
          { rotulo: 'C', texto: 'cc' },
        ],
        respostaCorreta: 'C',
      },
      subTela: 'principal',
      responder: vi.fn(),
    });
    expect(screen.getByText('Pergunta da seção 1?')).toBeInTheDocument();
  });
});
