import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import HeaderAlbum from '../layout/HeaderAlbum.jsx';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// 2ª tela da recompensa: figurinha em tamanho cheio + título/legenda (RF-06).
export default function FigurinhaCheia({ figurinha, contador, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo }}
    >
      <HeaderAlbum contador={contador} />
      <div
        className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center"
        style={{ color: tema.corTexto }}
      >
        <Figura
          src={resolverAsset(assetsBasePath, figurinha.imagemCheia)}
          alt={figurinha.titulo ?? ''}
          className="h-60 w-48"
        />
        {figurinha.titulo && <h2 className="font-bold">{figurinha.titulo}</h2>}
        {figurinha.legenda && <p className="text-sm">{figurinha.legenda}</p>}
      </div>
      <div className="p-4 text-center">
        <BotaoAcao
          texto="Próxima página"
          onClick={onAvancar}
          estilo={resolverEstilo(tema, { corFundo: tema.corPrimaria })}
        />
      </div>
    </section>
  );
}

FigurinhaCheia.propTypes = {
  figurinha: PropTypes.object.isRequired,
  contador: PropTypes.number,
  onAvancar: PropTypes.func,
};
