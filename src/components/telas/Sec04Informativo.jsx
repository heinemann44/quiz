import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../engine/estilo.js';
import {
  textoDoBotao,
  textoBalao,
  estiloBalao,
  textoBloco,
  estiloBloco,
} from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// TELA PRÓPRIA do informativo da seção 4 (doc/tema-4/informativo-tema-4.png).
// PADRÃO PRÓPRIO (não é o conteúdo padrão): Inanna grande à esquerda (ancorada
// embaixo, na frente); balão no topo-esquerda; box ESCURO (1º bloco) à direita, ao
// lado dela; box AZUL (2º bloco) mais largo, abaixo. Botão "Abrir figurinha" segue
// o padrão (RodapeAcao). Cores dos boxes vêm da config (estilo de cada bloco).
export default function Sec04Informativo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoTexto = textoBalao(passo.balao);
  const balaoEstilo = resolverEstilo(
    tema,
    passo.estilo,
    estiloBalao(passo.balao),
  );
  const blocos = passo.blocos ?? [];
  const estiloBox = (bloco) =>
    resolverEstilo(tema, tema.caixa, passo.estilo, estiloBloco(bloco));
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}

      <div className="relative flex flex-1 flex-col gap-1 p-2">
        {/* Inanna: esquerda, grande, ancorada embaixo e NA FRENTE (z-10). */}
        {personagemSrc && (
          <div className="pointer-events-none absolute top-25 left-0 z-10 w-[38%]">
            <Personagem src={personagemSrc} className="w-full max-w-none" />
          </div>
        )}

        {/* Balão OVAL e inclinado em direção à Inanna (-rotate-6 = layout da tela,
            P-11), diferente do padrão retangular. */}
        {balaoTexto && (
          <div className="relative z-20 ml-[10%] w-[75%] -rotate-15">
            <BalaoPersonagem
              texto={balaoTexto}
              estilo={{ ...balaoEstilo, tamanhoFonte: '0.8rem' }}
              bico="esquerda"
              oval
            />
          </div>
        )}

        {/* Box ESCURO (1º bloco): à direita, ao lado da personagem. */}
        {blocos[0] && (
          <div className="z-0 ml-auto w-[67%]">
            <CaixaConteudo
              texto={textoBloco(blocos[0])}
              estilo={estiloBox(blocos[0])}
            />
          </div>
        )}

        {/* Box AZUL (2º bloco): mais largo, abaixo. */}
        {blocos[1] && (
          <div className="z-0 ml-auto w-[100%]">
            <CaixaConteudo
              texto={textoBloco(blocos[1])}
              estilo={estiloBox(blocos[1])}
            />
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

Sec04Informativo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
