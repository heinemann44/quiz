import PropTypes from 'prop-types';

// Elemento PURO: o card branco de uma opção (círculo do rótulo sobrepondo o topo
// + texto). Modo `errada` (RF-05): o círculo fica VERMELHO (`corErro`) com "X" na
// lateral e o texto à esquerda. `corBorda` (opcional) desenha a moldura do card e
// da bolinha — cor vem da config (P-11). O card e o círculo são forma INTRÍNSECA
// do átomo; como as opções se arranjam (grade, meia-largura) é layout da TELA.
export default function OpcaoResposta({
  rotulo,
  texto,
  estilo = {},
  errada = false,
  onClick,
  tamanhoRotulo = 'h-8 w-8 text-sm',
  tamanhoTexto = 'text-xs',
}) {
  const borda = estilo.corBorda ? `2px solid ${estilo.corBorda}` : undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`relative flex flex-col rounded-lg leading-snug shadow-sm disabled:opacity-100 ${tamanhoTexto} ${errada ? 'items-start py-3 pl-6 pr-3 text-left' : 'items-center px-2 pb-3 pt-6 text-center'}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto, border: borda }}
    >
      <span
        aria-label={errada ? 'resposta errada' : undefined}
        className={`absolute flex items-center justify-center rounded-full font-bold shadow ${tamanhoRotulo} ${errada ? '-left-4 top-1/2 -translate-y-1/2' : '-top-4'}`}
        style={{
          backgroundColor: errada ? estilo.corErro : estilo.corRotulo,
          // letra da bola: cor própria (corRotuloTexto) ou cai na cor do texto.
          color: errada ? '#FFFFFF' : (estilo.corRotuloTexto ?? estilo.corTexto),
          border: errada ? undefined : borda,
        }}
      >
        {errada ? '✕' : rotulo}
      </span>
      <span>{texto}</span>
    </button>
  );
}

OpcaoResposta.propTypes = {
  rotulo: PropTypes.string,
  texto: PropTypes.string,
  estilo: PropTypes.object,
  errada: PropTypes.bool,
  onClick: PropTypes.func,
  tamanhoRotulo: PropTypes.string,
  tamanhoTexto: PropTypes.string,
};
