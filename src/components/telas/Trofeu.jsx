import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import Figura from '../ui/Figura.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';

// Troféu: imagem + valor (letra/número) do código secreto + "anote!" (RF-10).
export default function Trofeu({ passo, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <Figura
          src={resolverAsset(assetsBasePath, passo.imagemTrofeu)}
          alt="Troféu"
          placeholder="🏆"
          className="h-48 w-40"
        />
        {passo.legenda && <p>{passo.legenda}</p>}
        <p className="text-4xl font-bold">{passo.valor}</p>
        <p className="font-semibold">{passo.instrucao ?? 'anote!'}</p>
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloDoBotao(tema, passo.botao?.estilo)}
        />
      </RodapeAcao>
    </section>
  );
}

Trofeu.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
