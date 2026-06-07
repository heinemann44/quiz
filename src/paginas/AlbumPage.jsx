import { useParams } from 'react-router-dom';
import { useColegio } from './useColegio.js';
import { carregarAlbum } from '../config/albuns/index.js';
import { validarConfig } from '../engine/tipos.js';
import { logEstruturado } from '../services/log.js';
import Carregando from '../components/ui/Carregando.jsx';
import AvisoTela from '../components/ui/AvisoTela.jsx';
import NaoEncontrado from './NaoEncontrado.jsx';
import LinkInativo from './LinkInativo.jsx';
import AlbumBloqueado from './AlbumBloqueado.jsx';
import AlbumRunner from '../components/AlbumRunner.jsx';

const liberadoPara = (colegio, albumId) =>
  colegio.albuns.some((a) => a.albumId === albumId && a.liberado);

/**
 * /quiz/:escolaId/:albumId — valida liberação (RF-01b), carrega e valida a config
 * do álbum e entrega o motor (AlbumRunner). Falhas viram telas amigáveis (RF-15);
 * o detalhe técnico vai para o log estruturado.
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

  const config = carregarAlbum(albumId);
  if (!config) return <NaoEncontrado />; // liberado no banco, mas sem config (RF-01b)

  const problemas = validarConfig(config);
  if (problemas.length > 0) {
    logEstruturado('erro', 'config-invalida', { albumId, problemas });
    return (
      <AvisoTela
        titulo="Não foi possível abrir o álbum"
        mensagem="Tente novamente mais tarde."
      />
    );
  }

  return <AlbumRunner config={config} escola={colegio.escola} />;
}
