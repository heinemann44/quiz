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

// TELA PRÓPRIA do conteúdo da seção 5 (doc/tema-5/tema-5.png). Padrão INVERTIDO:
// a caixa de texto fica no TOPO (full width); abaixo, João à esquerda e o balão à
// direita (bico apontando pra ele). Ajuste AQUI sem afetar outras telas.
export default function Sec05Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoTexto = textoBalao(passo.balao);
  const balaoEstilo = resolverEstilo(
    tema,
    passo.estilo,
    estiloBalao(passo.balao),
  );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col p-4">
        {/* Caixa(s) de conteúdo no TOPO. */}
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
        {/* João (esquerda) + balão (direita) COLADOS na caixa de conteúdo (sem
            mt-auto, logo abaixo dela). */}
        <div className="flex items-end gap-2">
          {personagemSrc && (
            <div className="shrink-0">
              <Personagem
                src={personagemSrc}
                className="h-65 w-auto max-w-none"
              />
            </div>
          )}
          {balaoTexto && (
            <div className="mb-35 flex-1">
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

Sec05Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
