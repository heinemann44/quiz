import PropTypes from 'prop-types';

// Elemento PRÓPRIO do "Voltar" (RF-05, doc/tema-1/errado-1) — NÃO é o BotaoAcao de
// "Próxima página". Visual: retângulo dourado com borda escura grossa + a palavra,
// e uma SETA AZUL curva apontando pra trás (esquerda), saindo POR BAIXO do botão
// (totalmente visível). Cores via `estilo` (P-11) com defaults fiéis à arte.
export default function BotaoVoltar({ texto, onClick, estilo = {} }) {
  const corFundo = estilo.corFundo ?? '#E7B948';
  const corTexto = estilo.corTexto ?? '#14233A';
  const corBorda = estilo.corBorda ?? '#14233A';
  const corSeta = estilo.corSeta ?? '#2E6FB7';
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex flex-col items-center"
    >
      <span
        className="relative z-10 block rounded-md border-[3px] px-9 py-2 text-lg font-extrabold uppercase tracking-wide"
        style={{
          backgroundColor: corFundo,
          color: corTexto,
          borderColor: corBorda,
        }}
      >
        {texto}
      </span>
      {/* Seta começando na LATERAL DIREITA do botão (-mt-6 sobe o SVG até a altura
          do botão) e com arco ABERTO (ponto de controle bem à direita) varrendo
          pra esquerda, ponta à esquerda. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 180 96"
        className="-mt-6 h-16 w-[160%]"
        fill="none"
        stroke={corSeta}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M150 14 C 350 46, 132 70, 44 70" />
        <path d="M62 56 L 36 70 L 62 84" />
      </svg>
    </button>
  );
}

BotaoVoltar.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estilo: PropTypes.object,
};
