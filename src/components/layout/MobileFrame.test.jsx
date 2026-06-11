import { render, screen } from '@testing-library/react';
import MobileFrame from './MobileFrame.jsx';

describe('MobileFrame', () => {
  it('renderiza o conteúdo filho', () => {
    render(
      <MobileFrame>
        <p>conteudo</p>
      </MobileFrame>,
    );
    expect(screen.getByText('conteudo')).toBeInTheDocument();
  });

  // Teto de ~390px só a partir de sm (≥640px): no celular a coluna é fluida
  // (largura toda, sem barras laterais); no desktop vira moldura de telefone.
  it('limita a largura a ~390px só no desktop (sm+), fluida no celular (P-03)', () => {
    const { container } = render(
      <MobileFrame>
        <span>x</span>
      </MobileFrame>,
    );
    expect(container.querySelector('.sm\\:max-w-\\[390px\\]')).not.toBeNull();
    expect(container.querySelector('.w-full')).not.toBeNull();
  });
});
