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
        {/* Layout fixado pelo usuário (fase 6, responsivo): balão 2/3 da largura
            no topo-esquerda, em camada ACIMA do personagem; personagem 1/3 no
            topo-direita com +20px de padding no topo; caixa de texto em largura
            total logo abaixo do personagem (sem sobreposição). */}
        {/* Grid com balão e personagem na MESMA célula: flex lado a lado nunca
            sobrepõe (encolhe pra caber). Como camadas, cada um tem largura e
            âncora próprias e o balão (z-10) cobre o personagem na interseção. */}
        <div className="grid items-start">
          <div
            className={`relative z-10 col-start-1 row-start-1 w-2/3 ${
              esquerda ? 'justify-self-end' : 'justify-self-start'
            }`}
          >
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
            <div
              className={`col-start-1 row-start-1 w-2/5 pt-6 ${
                esquerda ? 'justify-self-start' : 'justify-self-end'
              }`}
            >
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
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
