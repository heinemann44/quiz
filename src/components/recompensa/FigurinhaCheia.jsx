import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import HeaderAlbum from '../layout/HeaderAlbum.jsx';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// 2ª tela da recompensa: figurinha em tamanho cheio + título/legenda (RF-06).
export default function FigurinhaCheia({ figurinha, contador, onAvancar }) {
  const { tema, assetsBasePath, fundoComemoracao } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, fundoComemoracao);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      <HeaderAlbum contador={contador} />
      <div
        className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center"
        style={{ color: tema.corTexto }}
      >
        <Figura
          src={resolverAsset(assetsBasePath, figurinha.imagemCheia)}
          alt={figurinha.alt ?? figurinha.titulo ?? ''}
          className="h-72 w-56"
        />
        {/* Título/legenda só quando vêm da config como texto; na arte final do
            álbum eles já estão gravados no card, então o JSON usa apenas `alt`. */}
        {figurinha.titulo && <h2 className="font-bold">{figurinha.titulo}</h2>}
        {figurinha.legenda && <p className="text-sm">{figurinha.legenda}</p>}
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
  contador: PropTypes.number,
  onAvancar: PropTypes.func,
};
