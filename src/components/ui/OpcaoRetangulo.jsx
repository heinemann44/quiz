import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Elemento PURO: opção de resposta num bloco simples (fundo + texto rico),
// conteúdo centralizado. Sem rótulo/badge; FORMA e posição são da TELA (P-11) via
// `className` — ex.: `aspect-square` p/ quadrado. `estilo.corBorda` (opcional)
// desenha a moldura na aresta; `estilo.corBordaInterna` (opcional) desenha uma
// moldura DENTRO do bloco, com folga da aresta (visual de "quadro emoldurado").
export default function OpcaoRetangulo({
  texto,
  estilo = {},
  onClick,
  className = '',
  tamanhoTexto = 'text-xs',
}) {
  const conteudo = <TextoRico texto={texto} />;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-lg px-3 py-2 text-center font-bold leading-tight shadow ${tamanhoTexto} ${className}`}
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        border: estilo.corBorda ? `2px solid ${estilo.corBorda}` : undefined,
      }}
    >
      {estilo.corBordaInterna ? (
        <span
          className="flex h-full w-full items-center justify-center rounded p-2"
          style={{ border: `2px solid ${estilo.corBordaInterna}` }}
        >
          {conteudo}
        </span>
      ) : (
        conteudo
      )}
    </button>
  );
}

OpcaoRetangulo.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  tamanhoTexto: PropTypes.string,
};
