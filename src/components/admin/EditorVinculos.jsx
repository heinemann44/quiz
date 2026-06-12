import PropTypes from 'prop-types';
import { listarAlbuns } from '../../config/albuns/index.js';

// Edita quais álbuns o colégio tem e em que estado. Três estados por álbum:
// "fora" (sem vínculo), "liberado" (entra no álbum) e "bloqueado" (aparece com 🔒
// no seletor). Catálogo vem do código (P-01); o admin só liga/desliga e ordena.
// Controlado: recebe os vínculos atuais e devolve o conjunto novo em `aoMudar`.
const FORA = 'fora';

export default function EditorVinculos({ vinculos, aoMudar }) {
  const catalogo = listarAlbuns();
  const porId = new Map(vinculos.map((v) => [v.albumId, v]));

  function estadoDe(albumId) {
    const v = porId.get(albumId);
    if (!v) return FORA;
    return v.liberado ? 'liberado' : 'bloqueado';
  }

  function mudarEstado(albumId, estado) {
    const outros = vinculos.filter((v) => v.albumId !== albumId);
    if (estado === FORA) return aoMudar(reordenar(outros));
    const ordem = porId.get(albumId)?.ordem ?? outros.length + 1;
    aoMudar(
      reordenar([
        ...outros,
        { albumId, liberado: estado === 'liberado', ordem },
      ]),
    );
  }

  function mudarOrdem(albumId, ordem) {
    aoMudar(vinculos.map((v) => (v.albumId === albumId ? { ...v, ordem } : v)));
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">
        Álbuns do colégio
      </label>
      <ul className="mt-1 divide-y divide-slate-200 rounded border border-slate-200">
        {catalogo.map((album) => {
          const estado = estadoDe(album.id);
          return (
            // Título+slug empilhados num bloco que TRUNCA (não quebra palavra);
            // controles à direita com nowrap — era isso que embaralhava a linha.
            <li
              key={album.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
            >
              <div className="min-w-0 flex-1 basis-40">
                <p className="truncate font-semibold">{album.titulo}</p>
                <p className="truncate text-xs text-slate-400">/{album.id}</p>
              </div>
              {estado !== FORA && (
                <label className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-500">
                  ordem
                  <input
                    type="number"
                    min="1"
                    value={porId.get(album.id)?.ordem ?? 1}
                    onChange={(e) =>
                      mudarOrdem(album.id, Number(e.target.value))
                    }
                    className="w-14 rounded border border-slate-300 px-2 py-1 text-sm"
                  />
                </label>
              )}
              <select
                value={estado}
                onChange={(e) => mudarEstado(album.id, e.target.value)}
                className="rounded border border-slate-300 px-2 py-1.5 text-sm"
              >
                <option value={FORA}>Não incluído</option>
                <option value="liberado">Liberado</option>
                <option value="bloqueado">Bloqueado 🔒</option>
              </select>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Mantém a ordem sequencial e estável (por ordem atual) após incluir/remover.
function reordenar(vinculos) {
  return [...vinculos]
    .sort((a, b) => a.ordem - b.ordem)
    .map((v, i) => ({ ...v, ordem: i + 1 }));
}

EditorVinculos.propTypes = {
  vinculos: PropTypes.arrayOf(
    PropTypes.shape({
      albumId: PropTypes.string.isRequired,
      liberado: PropTypes.bool.isRequired,
      ordem: PropTypes.number.isRequired,
    }),
  ).isRequired,
  aoMudar: PropTypes.func.isRequired,
};
