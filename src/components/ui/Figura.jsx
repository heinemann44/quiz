import { useState } from 'react';
import PropTypes from 'prop-types';

// Imagem com fallback neutro (RN-02). Sem src ou em erro de carga, mostra um
// placeholder — útil agora, que a arte real só chega na Fase 4.
export default function Figura({
  src,
  alt = '',
  className = '',
  placeholder = '🖼️',
}) {
  const [falhou, setFalhou] = useState(false);
  if (!src || falhou) {
    return (
      <div
        aria-label={alt || 'imagem'}
        className={`flex items-center justify-center rounded bg-slate-100 text-3xl text-slate-300 ${className}`}
      >
        {placeholder}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      onError={() => setFalhou(true)}
    />
  );
}

Figura.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
