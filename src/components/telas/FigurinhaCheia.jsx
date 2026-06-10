import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// 2ª tela da recompensa: figurinha em tamanho cheio (RF-06). Sem header, a
// figurinha ocupa o máximo da área (object-contain pra não cortar), sobre o fundo
// comemorativo; só o botão "Próxima página" no rodapé.
export default function FigurinhaCheia({ figurinha, onAvancar }) {
  const { tema, assetsBasePath, fundoComemoracao } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, fundoComemoracao);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <Figura
          src={resolverAsset(assetsBasePath, figurinha.imagemCheia)}
          alt={figurinha.alt ?? figurinha.titulo ?? ''}
          className="h-full w-full scale-108"
        />
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

FigurinhaCheia.propTypes = {
  figurinha: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
