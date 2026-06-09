import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../engine/estilo.js';
import {
  textoDoBotao,
  textoBalao,
  estiloBalao,
  varianteBalao,
  textoBloco,
  estiloBloco,
} from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import PersonagemComBalao from './PersonagemComBalao.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// Conteúdo/intro: personagem + balão + caixas de texto. Botão "Próxima página"
// ou "Abrir figurinha" quando concede recompensa (doc/tema-N, informativo-tema-4).
export default function PassoConteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-6 p-4">
        <PersonagemComBalao
          src={personagemSrc}
          posicao={passo.personagem?.posicao}
          tamanho="h-60 w-35"
          balaoTexto={textoBalao(passo.balao)}
          balaoEstilo={resolverEstilo(tema, passo.estilo, estiloBalao(passo.balao))}
          balaoVariante={varianteBalao(passo.balao)}
        />
        {/* Cards puxados pra cima (-mt) pra o personagem (z-10 acima) ficar um
            pouco por cima do quadro. Fundo do card vem de tema.caixa (P-11). */}
        <div className="-mt-26 flex flex-col gap-3">
          {(passo.blocos ?? []).map((bloco, i) => (
            <CaixaConteudo
              key={i}
              texto={textoBloco(bloco)}
              estilo={resolverEstilo(
                tema,
                tema.caixa,
                passo.estilo,
                estiloBloco(bloco),
              )}
            />
          ))}
        </div>
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

PassoConteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
