import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bloco de texto/destaque do conteúdo. Cores da config; texto rico via TextoRico.
export default function CaixaConteudo({ texto, estilo = {} }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <TextoRico texto={texto} />
    </div>
  );
}

CaixaConteudo.propTypes = { texto: PropTypes.string, estilo: PropTypes.object };
