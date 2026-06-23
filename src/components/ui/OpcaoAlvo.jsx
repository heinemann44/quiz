import PropTypes from 'prop-types';

// Elemento PURO: opção em formato de ALVO (anéis concêntricos / bullseye). Duas
// faixas (`corFundo`/`corAnel`) de decoração; o rótulo fica grande por cima, com
// CONTORNO (`corRotulo`, fallback `corAnel`) em volta das letras pra destacar
// sobre as faixas — sem fundo sólido. FORMA e tamanho são da TELA (P-11) via
// `className`; cores da config.
export default function OpcaoAlvo({ texto, estilo = {}, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex aspect-square items-center justify-center rounded-full shadow ${className}`}
      style={{ backgroundColor: estilo.corFundo }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full"
        style={{ backgroundColor: estilo.corAnel }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-[34%] rounded-full"
        style={{ backgroundColor: estilo.corFundo }}
      />
      <span
        className="relative z-10 text-2xl font-extrabold"
        style={{
          color: estilo.corTexto,
          WebkitTextStrokeColor: estilo.corRotulo ?? estilo.corAnel,
          WebkitTextStrokeWidth: '3px',
          paintOrder: 'stroke',
        }}
      >
        {texto}
      </span>
    </button>
  );
}

OpcaoAlvo.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
