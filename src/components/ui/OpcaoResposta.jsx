import PropTypes from 'prop-types';

// Opção de resposta: círculo do rótulo + texto. X vermelho quando foi a escolha
// errada (RF-05). Não clicável na sub-tela de erro.
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
      className="flex items-center gap-3 rounded-lg border p-3 text-left disabled:opacity-100"
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        borderColor: estilo.corBorda,
      }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-bold">
        {rotulo}
      </span>
      <span className="flex-1">{texto}</span>
      {errada && (
        <span aria-label="resposta errada" className="font-bold text-red-600">
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
