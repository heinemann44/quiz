import PropTypes from 'prop-types';

// Opção de resposta (card): círculo do rótulo no topo (cor `corRotulo`) + texto
// abaixo. Usado em grade de colunas (doc/tema-N). X vermelho quando foi a escolha
// errada (RF-05); não clicável na sub-tela de erro.
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
      className="relative mt-4 flex flex-col items-center rounded-lg px-2 pb-3 pt-6 text-center text-xs leading-snug shadow-sm disabled:opacity-100"
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <span
        className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow"
        style={{ backgroundColor: estilo.corRotulo, color: estilo.corTexto }}
      >
        {rotulo}
      </span>
      <span>{texto}</span>
      {errada && (
        <span
          aria-label="resposta errada"
          className="absolute right-1 top-1 font-bold text-red-600"
        >
          ✕
        </span>
      )}
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
