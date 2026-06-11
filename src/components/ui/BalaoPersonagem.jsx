import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bico do balão: triângulo RETÂNGULO (clip-path) na cor do balão, na LATERAL do
// lado do personagem (`direcao`) — lado vertical colado na borda, base alinhada
// à base do balão, ponta saindo pra fora. O canto do balão daquele lado fica
// RETO (rounded-*-none), então o bico encosta flush, sem invadir o texto (só 2px
// de sobreposição pra não dar fresta).
function BicoBalao({ direcao, cor, oval, topo }) {
  const direita = direcao !== 'esquerda';
  // Oval: rabinho apontando pra BAIXO, no fundo da elipse (centro = ponto mais
  // baixo, então conecta sempre); a inclinação do balão dá a direção pro
  // personagem. Meio sobreposto (translate-y-1/3) pra ficar junto.
  if (oval) {
    // Rabinho no lado do personagem (esquerda por padrão), apontando pra
    // baixo-aquele-lado; base sobreposta na curva pra ficar junto.
    return (
      <span
        aria-hidden="true"
        className={`absolute bottom-2 h-6 w-18 translate-y-1/4 ${
          direita ? 'right-[5%]' : 'left-[5%]'
        }`}
        style={{
          backgroundColor: cor,
          clipPath: direita
            ? 'polygon(0 0, 100% 100%, 0 100%)'
            : 'polygon(100% 0, 0 100%, 100% 100%)',
        }}
      />
    );
  }
  // Retângulo: triângulo retângulo colado na lateral do lado do personagem.
  // No rodapé (bottom-0) ou no TOPO (top-0, triângulo espelhado na vertical).
  const vert = topo ? 'top-0' : 'bottom-0';
  const clip = topo
    ? direita
      ? 'polygon(0 100%, 0 0, 100% 0)'
      : 'polygon(100% 100%, 100% 0, 0 0)'
    : direita
      ? 'polygon(0 0, 0 100%, 100% 100%)'
      : 'polygon(100% 0, 100% 100%, 0 100%)';
  return (
    <span
      aria-hidden="true"
      className={`absolute h-4 w-4 ${vert} ${
        direita ? 'left-full -translate-x-0.5' : 'right-full translate-x-0.5'
      }`}
      style={{ backgroundColor: cor, clipPath: clip }}
    />
  );
}

BicoBalao.propTypes = {
  direcao: PropTypes.oneOf(['esquerda', 'direita']),
  cor: PropTypes.string,
  oval: PropTypes.bool,
  topo: PropTypes.bool,
};

// Elemento PURO: a "nuvem" do balão de fala — só a forma + cores + texto rico.
// Sem alinhamento próprio (era `variante topo|lateral` com `self-*`): ONDE o balão
// fica é decisão da TELA. `bico` desenha a ponta apontando pro personagem;
// `corDestaque` pinta o **negrito**.
export default function BalaoPersonagem({
  texto,
  estilo = {},
  bico,
  oval = false,
  bicoTopo = false,
}) {
  // oval: elipse (rounded-[50%]) com texto centralizado e mais respiro pra caber
  // na curva. retângulo: cantos arredondados, exceto o do bico (que fica reto).
  const base = oval ? 'rounded-[50%] px-8 py-6 text-center' : 'rounded-2xl p-3';
  const cantoBico =
    oval || !bico
      ? ''
      : bicoTopo
        ? bico === 'direita'
          ? 'rounded-tr-none'
          : 'rounded-tl-none'
        : bico === 'direita'
          ? 'rounded-br-none'
          : 'rounded-bl-none';
  return (
    <div
      className={`relative text-sm font-bold ${base} ${cantoBico}`}
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        fontSize: estilo.tamanhoFonte, // tipografia da cascata (P-11); sobrepõe text-sm quando definida
      }}
    >
      <TextoRico texto={texto} corDestaque={estilo.corDestaque} />
      {bico && (
        <BicoBalao
          direcao={bico}
          cor={estilo.corFundo}
          oval={oval}
          topo={bicoTopo}
        />
      )}
    </div>
  );
}

BalaoPersonagem.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  bico: PropTypes.oneOf(['esquerda', 'direita']),
  oval: PropTypes.bool,
  bicoTopo: PropTypes.bool,
};
