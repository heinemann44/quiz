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

// Tela-base de conteúdo/intro: personagem + balão lado a lado + caixas de texto.
// Botão "Próxima página" ou "Abrir figurinha" quando concede recompensa
// (doc/tema-N, informativo-tema-4). É o layout PADRÃO do tipo; uma seção que
// precise divergir vira tela própria (ex.: Sec01Conteudo) sem afetar as demais.
export default function Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const esquerda = passo.personagem?.posicao === 'esquerda';
  const balaoTexto = textoBalao(passo.balao);
  const balaoEstilo = resolverEstilo(tema, passo.estilo, estiloBalao(passo.balao));
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-6 p-4">
        {/* Personagem + balão lado a lado, ancorados no topo e acima dos blocos
            (z-10), o personagem no lado `posicao` e o balão no oposto com o bico
            apontando pra ele. */}
        <div
          className={`relative z-10 flex items-start ${esquerda ? 'flex-row-reverse' : ''}`}
        >
          <div className="relative z-10 flex-1">
            {balaoTexto && (
              <BalaoPersonagem
                texto={balaoTexto}
                estilo={balaoEstilo}
                bico={
                  personagemSrc
                    ? esquerda
                      ? 'esquerda'
                      : 'direita'
                    : undefined
                }
              />
            )}
          </div>
          {personagemSrc && (
            <div className="shrink-0">
              <Personagem src={personagemSrc} className="h-60 w-35" />
            </div>
          )}
        </div>
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

Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
