import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bico do balão: triângulo RETÂNGULO (clip-path) na cor do balão, na LATERAL do
// lado do personagem (`direcao`) — lado vertical colado na borda, base alinhada
// à base do balão, ponta saindo pra fora. Sobrepõe metade no balão pra conectar
// mesmo com o canto arredondado (cor sobre cor = sem emenda).
function BicoBalao({ direcao, cor }) {
  const direita = direcao !== 'esquerda';
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 h-8 w-8 ${
        direita ? 'left-full -translate-x-4' : 'right-full translate-x-4'
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
      className="relative rounded-2xl p-3 text-sm font-bold"
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
