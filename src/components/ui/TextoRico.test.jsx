import { render, screen } from '@testing-library/react';
import TextoRico from './TextoRico.jsx';

describe('TextoRico (negrito + \\n)', () => {
  it('renderiza **trecho** como negrito', () => {
    render(<TextoRico texto="texto com **destaque** aqui" />);
    const forte = screen.getByText('destaque');
    expect(forte.tagName).toBe('STRONG');
  });

  it('quebra linha no \\n', () => {
    const { container } = render(<TextoRico texto={'linha 1\nlinha 2'} />);
    expect(container.querySelectorAll('br').length).toBe(1);
    expect(screen.getByText(/linha 1/)).toBeInTheDocument();
    expect(screen.getByText(/linha 2/)).toBeInTheDocument();
  });
});
