import PropTypes from 'prop-types';

// Opção em formato de balão que o personagem "segura" (doc/tema-5/pergunta-5):
// usada na variante Sim/Não. Cores vêm da config; o círculo é layout do componente.
export default function OpcaoBalao({ texto, estilo = {}, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-24 w-24 items-center justify-center rounded-full border-2 p-2 text-center font-bold shadow"
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        borderColor: estilo.corBorda,
      }}
    >
      {texto}
    </button>
  );
}

OpcaoBalao.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  onClick: PropTypes.func,
};
