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
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
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
        {(passo.personagem || passo.balao) && (
          <div
            className={`relative z-10 flex items-start ${
              passo.personagem?.posicao === 'esquerda' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Balão à esquerda (toma o espaço livre); robô à direita, maior e
                alinhado ao topo. Wrappers neutralizam o self-* dos componentes,
                que foi pensado pra empilhamento vertical (doc/tema-N). */}
            <div className="flex-1">
              {passo.balao && (
                <BalaoPersonagem
                  texto={textoBalao(passo.balao)}
                  estilo={resolverEstilo(
                    tema,
                    passo.estilo,
                    estiloBalao(passo.balao),
                  )}
                  variante={varianteBalao(passo.balao)}
                  bico={
                    passo.personagem
                      ? passo.personagem.posicao === 'esquerda'
                        ? 'esquerda'
                        : 'direita'
                      : undefined
                  }
                />
              )}
            </div>
            {passo.personagem && (
              <div className="shrink-0">
                <Personagem src={personagemSrc} className="h-60 w-35" />
              </div>
            )}
          </div>
        )}
        {/* Cards puxados pra cima (-mt) pra o personagem (z-10 acima) ficar um
            pouco por cima do quadro. Fundo do card vem de tema.corCaixa (P-11). */}
        <div className="-mt-26 flex flex-col gap-3">
          {(passo.blocos ?? []).map((bloco, i) => (
            <CaixaConteudo
              key={i}
              texto={textoBloco(bloco)}
              estilo={resolverEstilo(
                tema,
                { corFundo: tema.corCaixa },
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
