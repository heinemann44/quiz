import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../engine/estilo.js';
import { textoDoBotao, textoBalao, estiloBalao, textoBloco } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// TELA PRÓPRIA do conteúdo da seção 2 (doc/tema-2/tema-2.png). Endereçada pelo id
// "sec02-conteudo". Espelha a Sec01Conteudo como base; a seção 2 não tem balão
// (robô à direita + 2 caixas de texto). Ajuste o posicionamento AQUI sem afetar
// outras telas.
export default function Sec02Conteudo({ passo, onAvancar }) {
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
      <div className="flex flex-1 flex-col gap-6 px-4 pb-4 pt-1">
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
              <Personagem src={personagemSrc} className="h-65 w-35" />
            </div>
          )}
        </div>
        {/* UMA caixa só com os 2 parágrafos (linha em branco entre eles) — a
            seção 2 é um bloco único, não caixas separadas. */}
        <div className="-mt-26">
          <CaixaConteudo
            texto={(passo.blocos ?? []).map(textoBloco).join('\n\n')}
            estilo={resolverEstilo(tema, tema.caixa, passo.estilo)}
          />
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

Sec02Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
