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

// Balão de fala. variante topo|lateral só muda layout; cores vêm da config.
// Sem borda (evita contorno em currentColor); `bico` desenha a ponta na base e
// `corDestaque` pinta o negrito.
export default function BalaoPersonagem({
  texto,
  estilo = {},
  variante = 'lateral',
  bico,
}) {
  return (
    <div
      className={`relative rounded-2xl p-3 text-sm font-bold ${variante === 'topo' ? 'self-center' : 'self-start'}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <TextoRico texto={texto} corDestaque={estilo.corDestaque} />
      {bico && <BicoBalao direcao={bico} cor={estilo.corFundo} />}
    </div>
  );
}

BalaoPersonagem.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  variante: PropTypes.oneOf(['topo', 'lateral']),
  bico: PropTypes.oneOf(['esquerda', 'direita']),
};
