import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// Capa: fundo ilustrado + logos no header + botão (doc/inicio/home.png).
export default function PassoCapa({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloBotao = resolverEstilo(
    tema,
    { corFundo: tema.corPrimaria },
    passo.botao?.estilo,
  );
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo }}
    >
      {escola && <HeaderEscola escola={escola} />}
      <div
        className="flex flex-1 flex-col items-center justify-center gap-4 bg-cover bg-center p-6"
        style={fundo ? { backgroundImage: `url(${fundo})` } : undefined}
      >
        {passo.titulo && (
          <h1 className="text-2xl font-bold" style={{ color: tema.corTexto }}>
            {passo.titulo}
          </h1>
        )}
      </div>
      <div className="p-4 text-center">
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloBotao}
        />
      </div>
    </section>
  );
}

PassoCapa.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
