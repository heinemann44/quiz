import PropTypes from 'prop-types';

// Elemento PURO: o card branco de uma opção (círculo do rótulo sobrepondo o topo
// + texto). Modo `errada` (RF-05): o círculo fica VERMELHO (`corErro`) com "X" na
// lateral e o texto à esquerda. O card e o círculo são forma INTRÍNSECA do átomo;
// como as opções se arranjam (grade, meia-largura) é layout da TELA — não daqui.
export default function OpcaoResposta({
  rotulo,
  texto,
  estilo = {},
  errada = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`relative flex flex-col rounded-lg text-xs leading-snug shadow-sm disabled:opacity-100 ${errada ? 'items-start py-3 pl-6 pr-3 text-left' : 'items-center px-2 pb-3 pt-6 text-center'}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <span
        aria-label={errada ? 'resposta errada' : undefined}
        className={`absolute flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow ${errada ? '-left-4 top-1/2 -translate-y-1/2' : '-top-4'}`}
        style={{
          backgroundColor: errada ? estilo.corErro : estilo.corRotulo,
          color: errada ? '#FFFFFF' : estilo.corTexto,
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
};
