import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Balão de fala. variante topo|lateral só muda layout; cores vêm da config.
export default function BalaoPersonagem({
  texto,
  estilo = {},
  variante = 'lateral',
}) {
  return (
    <div
      className={`rounded-2xl border p-3 text-sm ${variante === 'topo' ? 'self-center' : 'self-start'}`}
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        borderColor: estilo.corBorda,
      }}
    >
      <TextoRico texto={texto} />
    </div>
  );
}

BalaoPersonagem.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  variante: PropTypes.oneOf(['topo', 'lateral']),
};
