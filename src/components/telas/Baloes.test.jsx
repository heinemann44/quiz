import { render, screen, fireEvent } from '@testing-library/react';
import Baloes from './Baloes.jsx';
import { AlbumProvider } from '../AlbumContext.jsx';

const valor = {
  tema: { corPrimaria: '#000' },
  assetsBasePath: '',
  escola: null,
};
const passo = {
  id: 'sec05-pergunta',
  tipo: 'pergunta',
  tela: 'baloes',
  enunciado: 'Os apps devem criar alertas?',
  opcoes: [
    { rotulo: 'sim', texto: 'Sim' },
    { rotulo: 'nao', texto: 'Não' },
  ],
  respostaCorreta: 'sim',
};

const montar = (onResponder) =>
  render(
    <AlbumProvider valor={valor}>
      <Baloes passo={passo} onResponder={onResponder} />
    </AlbumProvider>,
  );

describe('Baloes (variante Sim/Não)', () => {
  it('mostra o enunciado no balão e as opções como balões', () => {
    montar(vi.fn());
    expect(
      screen.getByText('Os apps devem criar alertas?'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sim' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Não' })).toBeInTheDocument();
  });

  it('clicar numa opção responde com o rótulo dela', () => {
    const onResponder = vi.fn();
    montar(onResponder);
    fireEvent.click(screen.getByText('Não'));
    expect(onResponder).toHaveBeenCalledWith('nao');
  });
});
