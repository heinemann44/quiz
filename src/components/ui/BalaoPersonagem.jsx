import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bico do balão: triângulo RETÂNGULO (clip-path) na cor do balão, na LATERAL do
// lado do personagem (`direcao`) — lado vertical colado na borda, base alinhada
// à base do balão, ponta saindo pra fora. O canto do balão daquele lado fica
// RETO (rounded-*-none), então o bico encosta flush, sem invadir o texto (só 2px
// de sobreposição pra não dar fresta).
function BicoBalao({ direcao, cor }) {
  const direita = direcao !== 'esquerda';
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 h-4 w-4 ${
        direita ? 'left-full -translate-x-0.5' : 'right-full translate-x-0.5'
      }`}
      style={{
        backgroundColor: cor,
        clipPath: direita
          ? 'polygon(0 0, 0 100%, 100% 100%)'
          : 'polygon(100% 0, 100% 100%, 0 100%)',
      }}
    />
  );
}

BicoBalao.propTypes = {
  direcao: PropTypes.oneOf(['esquerda', 'direita']),
  cor: PropTypes.string,
};

// Elemento PURO: a "nuvem" do balão de fala — só a forma + cores + texto rico.
// Sem alinhamento próprio (era `variante topo|lateral` com `self-*`): ONDE o balão
// fica é decisão da TELA. `bico` desenha a ponta apontando pro personagem;
// `corDestaque` pinta o **negrito**.
export default function BalaoPersonagem({ texto, estilo = {}, bico }) {
  return (
    <div
      className={`relative rounded-2xl p-3 text-sm font-bold ${
        bico === 'direita'
          ? 'rounded-br-none'
          : bico === 'esquerda'
            ? 'rounded-bl-none'
            : ''
      }`}
      style={{
        backgroundColor: estilo.corFundo,
        color: estilo.corTexto,
        fontSize: estilo.tamanhoFonte, // tipografia da cascata (P-11); sobrepõe text-sm quando definida
      }}
    >
      <TextoRico texto={texto} corDestaque={estilo.corDestaque} />
      {bico && <BicoBalao direcao={bico} cor={estilo.corFundo} />}
    </div>
  );
}

BalaoPersonagem.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  bico: PropTypes.oneOf(['esquerda', 'direita']),
};
