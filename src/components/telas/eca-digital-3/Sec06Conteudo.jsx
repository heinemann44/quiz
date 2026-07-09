import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../../engine/estilo.js';
import { textoDoBotao, textoBloco, estiloBloco } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import BalaoPersonagem from '../../ui/BalaoPersonagem.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da seção 6 do Álbum 3 (Artigo 33). Layout (definido pelo usuário):
// enunciado num quadro VERDE-ÁGUA/texto azul-escuro no topo; abaixo, a personagem
// ocupando ~2/3 da tela, alinhada à DIREITA; e um BALÃO DE FALA (mesmas cores do
// enunciado) sobreposto ao topo-esquerda dela (bico apontando pra ela). Texto e
// cores do balão vêm da config (P-01/P-11). Isolada por álbum.
export default function Sec06Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoEstilo = resolverEstilo(tema, passo.balao?.estilo);
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
        <div className="relative flex flex-1 items-end justify-end">
          {personagemSrc && <Personagem src={personagemSrc} className="w-2/3" />}
          {passo.balao && (
            <div className="absolute left-0 top-2 max-w-[55%]">
              <BalaoPersonagem
                texto={passo.balao.texto}
                estilo={balaoEstilo}
                bico="direita"
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

Sec06Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
