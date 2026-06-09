import PropTypes from 'prop-types';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';

// Personagem + balão lado a lado: personagem no lado `posicao`, balão no oposto
// com o bico apontando pra ele, ambos alinhados ao topo. Fica acima (z-10) pra
// poder sobrepor o conteúdo abaixo. Os wrappers neutralizam o self-* dos
// componentes (pensado p/ empilhamento vertical). Compartilhado por conteúdo e
// pergunta (doc/tema-N) — DRY.
export default function PersonagemComBalao({
  src,
  posicao = 'direita',
  tamanho = 'h-44 w-36',
  balaoTexto,
  balaoEstilo,
  balaoVariante,
}) {
  if (!src && !balaoTexto) return null;
  const esquerda = posicao === 'esquerda';
  return (
    <div
      className={`relative z-10 flex items-start ${esquerda ? 'flex-row-reverse' : ''}`}
    >
      <div className="relative z-10 flex-1">
        {balaoTexto && (
          <BalaoPersonagem
            texto={balaoTexto}
            estilo={balaoEstilo}
            variante={balaoVariante}
            bico={src ? (esquerda ? 'esquerda' : 'direita') : undefined}
          />
        )}
      </div>
      {src && (
        <div className="shrink-0">
          <Personagem src={src} className={tamanho} />
        </div>
      )}
    </div>
  );
}

PersonagemComBalao.propTypes = {
  src: PropTypes.string,
  posicao: PropTypes.oneOf(['esquerda', 'direita']),
  tamanho: PropTypes.string,
  balaoTexto: PropTypes.string,
  balaoEstilo: PropTypes.object,
  balaoVariante: PropTypes.string,
};
