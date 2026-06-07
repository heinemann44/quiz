import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import {
  textoDoBotao,
  textoBalao,
  estiloBalao,
  varianteBalao,
  textoBloco,
  estiloBloco,
} from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// Conteúdo/intro: personagem + balão + caixas de texto. Botão "Próxima página"
// ou "Abrir figurinha" quando concede recompensa (doc/tema-N, informativo-tema-4).
export default function PassoConteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo }}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {passo.personagem && (
          <Personagem src={personagemSrc} posicao={passo.personagem.posicao} />
        )}
        {passo.balao && (
          <BalaoPersonagem
            texto={textoBalao(passo.balao)}
            estilo={resolverEstilo(
              tema,
              passo.estilo,
              estiloBalao(passo.balao),
            )}
            variante={varianteBalao(passo.balao)}
          />
        )}
        {(passo.blocos ?? []).map((bloco, i) => (
          <CaixaConteudo
            key={i}
            texto={textoBloco(bloco)}
            estilo={resolverEstilo(tema, passo.estilo, estiloBloco(bloco))}
          />
        ))}
      </div>
      <div className="p-4 text-center">
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={resolverEstilo(
            tema,
            { corFundo: tema.corPrimaria },
            passo.botao?.estilo,
          )}
        />
      </div>
    </section>
  );
}

PassoConteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
