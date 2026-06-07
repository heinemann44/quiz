import { render, screen, fireEvent } from '@testing-library/react';
import PassoRenderer from './PassoRenderer.jsx';
import { AlbumProvider } from '../AlbumContext.jsx';

const valor = {
  tema: { corPrimaria: '#000' },
  assetsBasePath: '',
  escola: null,
};
const montar = (quiz) =>
  render(
    <AlbumProvider valor={valor}>
      <PassoRenderer quiz={quiz} />
    </AlbumProvider>,
  );

describe('PassoRenderer (despacho motor→UI)', () => {
  it('despacha pelo tipo do passo', () => {
    montar({ passo: { tipo: 'capa', titulo: 'Capa X' }, subTela: 'principal' });
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
});
