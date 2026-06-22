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
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da seção 3 do Álbum 2 (Artigo 12). Layout (definido pelo usuário):
// enunciado num quadro DOURADO com texto preto no topo; abaixo, a personagem com
// um TEXTO PRETO sobreposto e CENTRALIZADO na imagem dela (não é balão — é legenda
// por cima). Cores vêm da config (P-11); o texto sobreposto reusa o campo `balao`.
// Isolada por álbum — ajustar aqui não afeta as outras telas.
export default function Sec03Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const sobreposto = textoBalao(passo.balao);
  const sobrepostoEstilo = resolverEstilo(tema, estiloBalao(passo.balao));
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
        {personagemSrc && (
          <div className="relative flex flex-1 items-center justify-center">
            <Personagem src={personagemSrc} className="max-h-64 w-auto" />
            {sobreposto && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <p
                  className="max-w-[60%] translate-y-6 text-center text-base font-bold leading-tight"
                  style={{ color: sobrepostoEstilo.corTexto }}
                >
                  <TextoRico texto={sobreposto} />
                </p>
              </div>
            )}
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

Sec03Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
