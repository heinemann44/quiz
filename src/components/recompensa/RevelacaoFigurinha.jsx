import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import HeaderAlbum from '../layout/HeaderAlbum.jsx';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

const dois = (n) => String(n ?? '').padStart(2, '0');

// 1ª tela da recompensa: card "Figurinha Nº NN" sobre fundo comemorativo (RF-06).
export default function RevelacaoFigurinha({ figurinha, contador, onAvancar }) {
  const { tema, assetsBasePath, fundoComemoracao } = useAlbum();
  const src = resolverAsset(
    assetsBasePath,
    figurinha.imagemCard ?? figurinha.imagemCheia,
  );
  const fundo = resolverAsset(assetsBasePath, fundoComemoracao);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      <HeaderAlbum contador={contador} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="font-bold" style={{ color: tema.corTexto }}>
          Figurinha Nº {dois(figurinha.numero)}
        </p>
        <Figura src={src} alt="" placeholder="🎴" className="h-56 w-44" />
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto="Próxima página"
          onClick={onAvancar}
          estilo={estiloDoBotao(tema)}
        />
      </RodapeAcao>
    </section>
  );
}

RevelacaoFigurinha.propTypes = {
  figurinha: PropTypes.object.isRequired,
  contador: PropTypes.number,
  onAvancar: PropTypes.func,
};
