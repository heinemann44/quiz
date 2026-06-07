import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderEscola from '../components/layout/HeaderEscola.jsx';

// Rótulo derivado do slug enquanto não há config do álbum (título vem do JSON na
// Fase 5). Ex.: "mundo-do-trabalho" → "Mundo Do Trabalho".
const rotuloAlbum = (albumId) =>
  albumId
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

function ItemLiberado({ escolaId, album }) {
  return (
    <Link
      to={`/quiz/${escolaId}/${album.albumId}`}
      className="rounded-lg border border-slate-200 p-4 text-left font-semibold text-slate-800 hover:bg-slate-50"
    >
      {rotuloAlbum(album.albumId)}
    </Link>
  );
}

function ItemBloqueado({ album }) {
  return (
    <div
      aria-disabled="true"
      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-400"
    >
      <span>{rotuloAlbum(album.albumId)}</span>
      <span aria-label="bloqueado">🔒</span>
    </div>
  );
}

/**
 * Hub da coleção quando o colégio tem 2+ álbuns liberados (RF-01a).
 * @param {{ escolaId: string, colegio: import('../services/supabase.js').Colegio }} props
 */
export default function SeletorAlbuns({ escolaId, colegio }) {
  return (
    <>
      <HeaderEscola escola={colegio.escola} titulo="Seus álbuns" />
      <nav className="flex flex-1 flex-col gap-3 p-4">
        {colegio.albuns.map((album) =>
          album.liberado ? (
            <ItemLiberado
              key={album.albumId}
              escolaId={escolaId}
              album={album}
            />
          ) : (
            <ItemBloqueado key={album.albumId} album={album} />
          ),
        )}
      </nav>
    </>
  );
}

const albumShape = PropTypes.shape({
  albumId: PropTypes.string.isRequired,
  liberado: PropTypes.bool.isRequired,
});

ItemLiberado.propTypes = {
  escolaId: PropTypes.string.isRequired,
  album: albumShape.isRequired,
};
ItemBloqueado.propTypes = { album: albumShape.isRequired };
SeletorAlbuns.propTypes = {
  escolaId: PropTypes.string.isRequired,
  colegio: PropTypes.shape({
    escola: PropTypes.object.isRequired,
    albuns: PropTypes.arrayOf(albumShape).isRequired,
  }).isRequired,
};
