import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Elemento PURO: opção em formato de BOLA (círculo cheio) com o texto por dentro.
// Fundo (`corFundo`), moldura (`corBorda`) e texto (`corTexto`) vêm da config
// (P-11). Forma redonda é intrínseca do átomo; tamanho e posição são da TELA via
// `className`/`tamanhoTexto`. Difere do OpcaoAlvo (anéis, só rótulo) e do
// OpcaoRetangulo (cantos arredondados).
export default function OpcaoBola({
  texto,
  estilo = {},
  onClick,
  className = '',
  tamanhoTexto = 'text-xs',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex aspect-square items-center justify-center rounded-full p-4 text-center font-bold leading-tight shadow ${tamanhoTexto} ${className}`}
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        border: estilo.corBorda ? `3px solid ${estilo.corBorda}` : undefined,
      }}
    >
      <TextoRico texto={texto} />
    </button>
  );
}

OpcaoBola.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  tamanhoTexto: PropTypes.string,
};
