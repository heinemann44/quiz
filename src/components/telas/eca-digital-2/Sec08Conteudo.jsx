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
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da seção 8 do Álbum 2 (Artigo 22). Layout (definido pelo usuário):
// enunciado num quadro ROSA CLARO/texto preto no topo; abaixo, um balão BRANCO
// (texto preto); e abaixo a personagem na largura máxima. Cores vêm da config
// (P-11). Isolada por álbum — ajustar aqui não afeta as outras telas.
export default function Sec08Conteudo({ passo, onAvancar }) {
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
        {/* balão branco com a ponta apontando pra BAIXO (pra personagem, abaixo). */}
        {balaoTexto && (
          <div
            className="relative rounded-2xl p-3 text-sm font-bold"
            style={{
              backgroundColor: balaoEstilo.corFundo,
              color: balaoEstilo.corTexto,
            }}
          >
            <TextoRico texto={balaoTexto} />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-px"
              style={{
                backgroundColor: balaoEstilo.corFundo,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />
          </div>
        )}
        {personagemSrc && (
          <Personagem src={personagemSrc} className="w-full" />
        )}
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

Sec08Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
