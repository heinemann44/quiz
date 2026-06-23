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

// TELA PRÓPRIA da seção 4 do Álbum 2 (Artigo 18). Layout (definido pelo usuário):
// personagem à ESQUERDA alinhada ao topo; à DIREITA um balão AMARELO (texto azul
// escuro) com o bico na lateral esquerda apontando pra ela, alinhado ao topo;
// ABAIXO, um quadro AMARELO (texto azul escuro) com o conteúdo. Cores vêm da
// config (P-11). Isolada por álbum — ajustar aqui não afeta as outras telas.
export default function Sec04Conteudo({ passo, onAvancar }) {
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
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-2">
          {personagemSrc && (
            <div className="w-1/2 shrink-0 pl-4">
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          )}
          {balaoTexto && (
            <div className="flex-1 pt-24">
              <BalaoPersonagem
                texto={balaoTexto}
                estilo={balaoEstilo}
                bico="esquerda"
                bicoTopo
              />
            </div>
          )}
        </div>
        {/* enunciado COLADO ao personagem: -mt puxa a caixa pra cima, encaixando
            no rodapé do personagem (pedido do usuário). */}
        <div className="-mt-4">
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

Sec04Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
