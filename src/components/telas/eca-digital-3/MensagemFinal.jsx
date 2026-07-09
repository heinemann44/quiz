import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../../engine/estilo.js';
import { textoDoBotao, textoBloco, estiloBloco } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import BalaoPersonagem from '../../ui/BalaoPersonagem.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA de mensagem de despedida do Álbum 3 (fora do fluxo de perguntas).
// Layout (definido pelo usuário): uma caixa AZUL-ESCURA/texto branco no topo com a
// mensagem final; abaixo, a imagem na largura máxima. Cores/texto vêm da config
// (P-01/P-11). Isolada por álbum.
export default function MensagemFinal({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoEstilo = resolverEstilo(tema, passo.balao?.estilo);
  const balaoDireitaEstilo = resolverEstilo(tema, passo.balaoDireita?.estilo);
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
        <div className="relative flex flex-1 items-end justify-center">
          {personagemSrc && (
            <Personagem src={personagemSrc} className="w-full" />
          )}
          {passo.balao && (
            <div
              className="absolute left-1/2 top-2 max-w-[70%] -translate-x-1/2 rounded-2xl px-4 py-2 text-center text-sm font-bold shadow"
              style={{
                backgroundColor: balaoEstilo.corFundo,
                color: balaoEstilo.corTexto,
              }}
            >
              <TextoRico texto={passo.balao.texto} />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-px"
                style={{
                  backgroundColor: balaoEstilo.corFundo,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />
            </div>
          )}
          {/* balão lateral: estreito (max-w baixo) → o texto quebra e ele cresce
              em altura; ancorado à direita da imagem, bico apontando pra ela. */}
          {passo.balaoDireita && (
            <div className="absolute right-0 top-1/4 max-w-[25%]">
              <BalaoPersonagem
                texto={passo.balaoDireita.texto}
                estilo={balaoDireitaEstilo}
                bico="esquerda"
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

MensagemFinal.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
