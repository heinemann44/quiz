import PropTypes from 'prop-types';

// Botão de ação. Cores vêm da config (estilo já resolvido); layout é do componente.
export default function BotaoAcao({ texto, onClick, estilo = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-5 py-2 font-semibold text-white shadow"
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      {texto}
    </button>
  );
}

BotaoAcao.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estilo: PropTypes.object,
};
