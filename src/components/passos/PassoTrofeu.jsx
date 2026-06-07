import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// Troféu: imagem + valor (letra/número) do código secreto + "anote!" (RF-10).
export default function PassoTrofeu({ passo, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  return (
    <section
      className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      <Figura
        src={resolverAsset(assetsBasePath, passo.imagemTrofeu)}
        alt="Troféu"
        placeholder="🏆"
        className="h-48 w-40"
      />
      {passo.legenda && <p>{passo.legenda}</p>}
      <p className="text-4xl font-bold">{passo.valor}</p>
      <p className="font-semibold">{passo.instrucao ?? 'anote!'}</p>
      <BotaoAcao
        texto={textoDoBotao(passo)}
        onClick={onAvancar}
        estilo={resolverEstilo(
          tema,
          { corFundo: tema.corPrimaria },
          passo.botao?.estilo,
        )}
      />
    </section>
  );
}

PassoTrofeu.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
