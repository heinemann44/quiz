import PropTypes from 'prop-types';

// Verniz glossy sobre a cor da config (P-11): brilho leve no topo, sombra na
// base — dá o 3D do protótipo sem alterar muito a cor nem introduzir cores novas.
const glossy = (cor) =>
  `linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.14) 100%), ${cor}`;

// Botão de ação padrão ("Próxima página"): pílula glossy (cor do botão) com o
// texto, e um círculo maior com play que sobrepõe o fim da pílula. O círculo é
// in-flow (margem negativa, não `absolute`) pra a caixa do <button> englobá-lo —
// senão ele transborda a caixa e o respiro de 16px do RodapeAcao não o alcança.
// Cores vêm da config (P-11); caixa-alta e brilhos são visual, não conteúdo.
export default function BotaoAcao({ texto, onClick, estilo = {} }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center">
      <span
        className="flex items-center rounded-full py-2.5 pl-7 pr-20 shadow-lg ring-1 ring-white/30"
        style={{ background: glossy(estilo.corFundo), fontFamily: estilo.fonte }}
      >
        <span
          className="whitespace-nowrap text-base font-extrabold uppercase tracking-wide"
          style={{ color: estilo.corTexto }}
        >
          {texto}
        </span>
      </span>
      <span className="-ml-16 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-300/60">
        <span
          className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full shadow-inner"
          style={{ background: glossy(estilo.corCirculo) }}
        >
          <PlayIcon />
        </span>
      </span>
    </button>
  );
}

// Triângulo de play (decorativo; o nome acessível do botão vem do `texto`).
function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="ml-0.5 h-8 w-8 fill-white drop-shadow"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

BotaoAcao.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estilo: PropTypes.object,
};
