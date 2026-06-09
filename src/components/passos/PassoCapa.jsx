import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { estiloDoBotao } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';

// Capa: a arte (capa.png) já traz título, logos e rodapé embutidos
// (doc/inicio/home.png), então não há header próprio — os logos estão na arte.
// A arte é mais "quadrada" que o quadro alto do celular, então object-contain
// (sem cortar, pra não comer os logos das bordas) sempre deixa sobra em cima/
// embaixo. Pintamos essa sobra com a cor da própria arte (passo.corFundo, P-11)
// para ela virar continuação da ilustração — não uma moldura.
export default function PassoCapa({ passo, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const corFundo = passo.corFundo ?? tema.corFundo;
  const estiloBotao = estiloDoBotao(tema, passo.botao?.estilo);
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: corFundo }}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center">
        {fundo && (
          <img
            src={fundo}
            alt="Capa do álbum"
            className="h-full w-full object-contain"
          />
        )}
        {passo.titulo && (
          <h1 className="text-2xl font-bold" style={{ color: tema.corTexto }}>
            {passo.titulo}
          </h1>
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

PassoCapa.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
