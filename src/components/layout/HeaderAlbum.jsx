import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';

// Contador de figurinhas conquistadas na sessão (RF-09).
function Contador({ contador }) {
  return (
    <span
      className="rounded-full bg-black/40 px-2 py-0.5 text-sm font-semibold text-white"
      aria-label="figurinhas conquistadas"
    >
      ❤️ {contador}
    </span>
  );
}
Contador.propTypes = { contador: PropTypes.number.isRequired };

// Faixa das telas de figurinha: banner "Álbum de Figurinhas" (arte do álbum,
// headerFigurinha) com o contador sobreposto. Sem banner, cai num cabeçalho de
// texto — a arte real entra só editando a config (P-01).
export default function HeaderAlbum({ contador = 0 }) {
  const { assetsBasePath, headerFigurinha } = useAlbum();
  const banner = resolverAsset(assetsBasePath, headerFigurinha);
  if (!banner) {
    return (
      <header className="flex items-center justify-between border-b border-slate-200 p-3">
        <span className="text-sm font-bold text-slate-700">
          Álbum de Figurinhas
        </span>
        <Contador contador={contador} />
      </header>
    );
  }
  return (
    <header className="relative flex items-center justify-center p-2">
      <img
        src={banner}
        alt="Álbum de Figurinhas"
        className="h-16 object-contain"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <Contador contador={contador} />
      </span>
    </header>
  );
}

HeaderAlbum.propTypes = { contador: PropTypes.number };
