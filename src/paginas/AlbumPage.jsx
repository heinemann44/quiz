import { useParams } from 'react-router-dom';
import { useColegio } from './useColegio.js';
import Carregando from '../components/ui/Carregando.jsx';
import AvisoTela from '../components/ui/AvisoTela.jsx';
import NaoEncontrado from './NaoEncontrado.jsx';
import LinkInativo from './LinkInativo.jsx';
import AlbumBloqueado from './AlbumBloqueado.jsx';

const liberadoPara = (colegio, albumId) =>
  colegio.albuns.some((a) => a.albumId === albumId && a.liberado);

/**
 * /quiz/:escolaId/:albumId — deep link. Valida que o álbum está liberado para o
 * colégio (RF-01b). O motor (config + useQuiz) entra na Fase 2.
 */
export default function AlbumPage() {
  const { escolaId, albumId } = useParams();
  const { estado, colegio } = useColegio(escolaId);

  if (estado === 'carregando') return <Carregando />;
  if (estado === 'erro') {
    return (
      <AvisoTela
        titulo="Não foi possível carregar"
        mensagem="Tente novamente em instantes."
      />
    );
  }
  if (!colegio) return <NaoEncontrado />;
  if (!colegio.escola.ativo) return <LinkInativo motivo="inativo" />;
  if (!liberadoPara(colegio, albumId)) return <AlbumBloqueado />;

  // Liberado: stub até a Fase 2 (motor). Mantém o albumId visível para validação.
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold">Álbum liberado</h1>
      <p className="text-slate-600">
        álbum: <span className="font-mono">{albumId}</span>
      </p>
      <p className="text-sm text-slate-400">(motor na Fase 2)</p>
    </main>
  );
}
