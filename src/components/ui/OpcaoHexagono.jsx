import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Hexágono "deitado" (pontas nas laterais, topo/base retos) — sobra mais largura
// no meio pro texto. clip-path não aceita `border`, então a borda é uma camada de
// trás (corBorda) levemente maior que o preenchimento (corFundo, via inset).
const HEX = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

// Elemento PURO: opção de resposta em balão HEXAGONAL (forma + cores + texto). A
// POSIÇÃO/escala na tela é da tela que o compõe; `tamanho` ajusta só o quadrado.
export default function OpcaoHexagono({
  texto,
  estilo = {},
  onClick,
  tamanho = 'h-26 w-26',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center justify-center ${tamanho}`}
      style={{ backgroundColor: estilo.corBorda, clipPath: HEX }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[3px]"
        style={{ backgroundColor: estilo.corFundo, clipPath: HEX }}
      />
      <span
        className="relative z-10 px-4 text-center text-xs font-bold leading-tight"
        style={{ color: estilo.corTexto }}
      >
        <TextoRico texto={texto} />
      </span>
    </button>
  );
}

OpcaoHexagono.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  onClick: PropTypes.func,
  tamanho: PropTypes.string,
};
