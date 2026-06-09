import PropTypes from 'prop-types';
import Figura from './Figura.jsx';

// Posição por variante nomeada (P-11) — nunca x/y/âncora na config.
const POSICAO = {
  esquerda: 'self-start',
  direita: 'self-end',
  centro: 'self-center',
};

export default function Personagem({
  src,
  alt = '',
  posicao = 'direita',
  className = 'h-40 w-32',
}) {
  return (
    <Figura
      src={src}
      alt={alt}
      placeholder="🧑‍🚀"
      className={`${className} ${POSICAO[posicao] ?? ''}`}
    />
  );
}

Personagem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  posicao: PropTypes.oneOf(['esquerda', 'direita', 'centro']),
  className: PropTypes.string,
};
