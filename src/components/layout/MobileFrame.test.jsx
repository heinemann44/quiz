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

  it('limita a largura a ~390px no desktop (P-03)', () => {
    const { container } = render(
      <MobileFrame>
        <span>x</span>
      </MobileFrame>,
    );
    expect(container.querySelector('.max-w-\\[390px\\]')).not.toBeNull();
  });
});
