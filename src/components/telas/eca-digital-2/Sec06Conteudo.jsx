import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../../engine/estilo.js';
import { textoDoBotao, textoBloco, estiloBloco } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da seção 6 do Álbum 2 (Artigo 20). Layout (definido pelo usuário):
// enunciado num quadro BRANCO/texto preto alinhado ao topo; abaixo, personagem à
// DIREITA um pouco SOBREPOSTO ao enunciado (negative mt + paint por cima). Cores
// vêm da config (P-11). Isolada por álbum.
export default function Sec06Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col p-4">
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
        {/* personagem à direita, um pouco sobreposto ao enunciado (negative mt). */}
        {personagemSrc && (
          <div className="-mt-2 flex justify-end">
            <div className="w-4/5 pr-8">
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          </div>
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

Sec06Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
