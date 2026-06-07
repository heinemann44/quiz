import { useParams, Navigate } from 'react-router-dom';
import { useColegio } from './useColegio.js';
import { resolverEntrada, Desfecho } from '../services/resolverEntrada.js';
import Carregando from '../components/ui/Carregando.jsx';
import AvisoTela from '../components/ui/AvisoTela.jsx';
import NaoEncontrado from './NaoEncontrado.jsx';
import LinkInativo from './LinkInativo.jsx';
import SeletorAlbuns from './SeletorAlbuns.jsx';

/**
 * /quiz/:escolaId — resolve o colégio e decide: direto | seletor | indisponível
 * | inativo | inexistente (RF-01/01a/14/15).
 */
export default function QuizEntradaPage() {
  const { escolaId } = useParams();
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

  const entrada = resolverEntrada(colegio);
  switch (entrada.desfecho) {
    case Desfecho.INEXISTENTE:
      return <NaoEncontrado />;
    case Desfecho.INATIVO:
      return <LinkInativo motivo="inativo" />;
    case Desfecho.INDISPONIVEL:
      return <LinkInativo motivo="indisponivel" />;
    case Desfecho.DIRETO:
      return <Navigate to={`/quiz/${escolaId}/${entrada.albumId}`} replace />;
    default:
      return <SeletorAlbuns escolaId={escolaId} colegio={colegio} />;
  }
}
