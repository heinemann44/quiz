import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';

// A capa continua sendo uma arte fechada: o logo da escola entra como asset da
// config e ocupa o placeholder desenhado na própria imagem.
export default function Capa({ passo, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const logoEscola = resolverAsset(assetsBasePath, passo.logoEscola);
  const corFundo = passo.corFundo ?? tema.corFundo;
  const estiloBotao = estiloDoBotao(tema, passo.botao?.estilo);

  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: corFundo }}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {fundo && (
          <img
            src={fundo}
            alt="Capa do álbum"
            className="h-full w-full object-contain"
          />
        )}
        {!fundo && passo.titulo && (
          <h1 className="px-6 text-center text-3xl font-black text-white">
            {passo.titulo}
          </h1>
        )}
        {logoEscola && (
          <img
            src={logoEscola}
            alt="Logo da escola"
            className="absolute left-[1%] top-0 h-auto w-[20%] object-contain"
          />
        )}
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloBotao}
        />
      </RodapeAcao>
    </section>
  );
}

Capa.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
