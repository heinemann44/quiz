import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import { textoBalao, estiloBalao } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import BalaoPersonagem from '../../ui/BalaoPersonagem.jsx';
import BotaoVoltar from '../../ui/BotaoVoltar.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA do erro da pergunta da seção 6 do Álbum 2. Layout (definido pelo
// usuário): balão branco com a MESMA pergunta no topo; personagem (pose de erro)
// embaixo à ESQUERDA; à direita dela um balão DOURADO/texto preto ("Lance outra
// bola..."); e o BotaoVoltar (mesmo do Álbum 1) embaixo à direita, na base do
// personagem. Cores na config (P-11). Isolada por álbum.
export default function Sec06Erro({ passo, onVoltarErro }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const balaoEstilo = resolverEstilo(tema, estiloBalao(passo.balao));
  const personagem = passo.personagemErro ?? passo.personagem;
  const personagemSrc = resolverAsset(assetsBasePath, personagem?.imagem);
  const balaoErro = passo.balaoErro;
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col p-4">
        {/* balão branco com a mesma pergunta. */}
        <div
          className="mx-auto max-w-[90%] rounded-2xl px-4 py-3 text-center text-sm font-bold"
          style={{
            backgroundColor: balaoEstilo.corFundo,
            color: balaoEstilo.corTexto,
          }}
        >
          <TextoRico texto={passo.enunciado} />
        </div>
        {/* personagem (erro) embaixo à esquerda; balão dourado à direita dela;
            BotaoVoltar embaixo à direita, na base do personagem. */}
        <div className="relative flex-1">
          {personagemSrc && (
            <div className="absolute top-1/8 left-0 w-1/2">
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          )}
          {balaoErro && (
            <div className="absolute right-2 top-1/8 w-1/2">
              <BalaoPersonagem
                texto={textoBalao(balaoErro)}
                estilo={resolverEstilo(tema, estiloBalao(balaoErro))}
                bico="esquerda"
              />
            </div>
          )}
          <div className="absolute bottom-0 right-2">
            <BotaoVoltar
              texto={passo.textoBotaoErro ?? 'Voltar'}
              onClick={onVoltarErro}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

Sec06Erro.propTypes = {
  passo: PropTypes.object.isRequired,
  onVoltarErro: PropTypes.func,
};
