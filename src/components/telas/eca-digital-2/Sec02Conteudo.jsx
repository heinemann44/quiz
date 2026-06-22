import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../../engine/estilo.js';
import {
  textoDoBotao,
  textoBalao,
  estiloBalao,
  textoBloco,
  estiloBloco,
} from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import BalaoPersonagem from '../../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da seção 2 do Álbum 2 (enunciado do Artigo 10). Layout (definido
// pelo usuário): quadro BRANCO com BORDA LARANJA no topo (a moldura vem da config
// via `estilo.corBorda`, P-11); abaixo, personagem alinhada à ESQUERDA e um balão
// à DIREITA dela ("Leia com atenção e responda o certo!"). Isolada por álbum —
// ajustar aqui não afeta o Álbum 1 nem a seção 1.
export default function Sec02Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoTexto = textoBalao(passo.balao);
  const balaoEstilo = resolverEstilo(tema, estiloBalao(passo.balao));
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-4 p-4">
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
        <div className="flex items-start gap-2">
          {personagemSrc && (
            <div className="w-4/7 shrink-0 pl-4">
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          )}
          {balaoTexto && (
            <div className="flex-1 pt-18">
              <BalaoPersonagem
                texto={balaoTexto}
                estilo={balaoEstilo}
                bico="esquerda"
                bicoTopo
              />
            </div>
          )}
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

Sec02Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
