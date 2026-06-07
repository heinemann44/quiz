import { useParams } from 'react-router-dom';

// Stub da Fase 0: ecoa escolaId + albumId. Validação de liberação e o
// motor (useQuiz) entram nas Fases 1 e 2.
export default function AlbumPage() {
  const { escolaId, albumId } = useParams();
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold">Álbum</h1>
      <p className="text-slate-600">
        escola: <span className="font-mono">{escolaId}</span>
      </p>
      <p className="text-slate-600">
        álbum: <span className="font-mono">{albumId}</span>
      </p>
      <p className="text-sm text-slate-400">(mock — Fase 0)</p>
    </main>
  );
}
