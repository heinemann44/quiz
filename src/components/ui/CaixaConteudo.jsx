import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bloco de texto/destaque do conteúdo. Cores da config; texto rico via TextoRico.
// `className` extra ajusta layout pontual (ex.: enunciado centralizado).
export default function CaixaConteudo({ texto, estilo = {}, className = '' }) {
  return (
    <div
      className={`rounded-lg p-3 ${className}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <TextoRico texto={texto} />
    </div>
  );
}

CaixaConteudo.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  className: PropTypes.string,
};
