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

// TELA PRÓPRIA da seção 1 (doc/tema-1/tema-1.png). Endereçada pelo id do passo
// ("sec01-conteudo"). Ajuste o posicionamento AQUI livremente — não afeta nenhuma
// outra tela. Começa igual à `Conteudo` base; diverge conforme o print pedir.
export default function Sec01Conteudo({ passo, onAvancar }) {
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

Sec01Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
