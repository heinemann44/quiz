import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';

// Faixa das telas de figurinha: banner "Álbum de Figurinhas" (arte do álbum,
// headerFigurinha). Sem banner, cai num cabeçalho de texto. (Contador ❤️ removido
// a pedido — RF-09 segue só no encerramento.)
export default function HeaderAlbum() {
  const { assetsBasePath, headerFigurinha } = useAlbum();
  const banner = resolverAsset(assetsBasePath, headerFigurinha);
  if (!banner) {
    return (
      <header className="flex items-center justify-center border-b border-slate-200 p-3">
        <span className="text-sm font-bold text-slate-700">
          Álbum de Figurinhas
        </span>
      </header>
    );
  }
  return (
    <header className="flex items-center justify-center p-2">
      <img
        src={banner}
        alt="Álbum de Figurinhas"
        className="h-24 object-contain"
      />
    </header>
  );
}
