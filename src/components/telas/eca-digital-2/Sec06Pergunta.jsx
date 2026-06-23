import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import { estiloBalao } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoAlvo from '../../ui/OpcaoAlvo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 6 do Álbum 2. Layout (definido pelo usuário):
// balão de pergunta BRANCO/texto preto no topo (bico pra baixo); personagem
// alinhado embaixo à ESQUERDA; as duas alternativas ("Não"/"Sim") em formato de
// ALVO empilhadas à DIREITA. Cores vêm da config (P-11): balão em `balao.estilo`,
// alvos em `passo.estilo`. Isolada por álbum.
export default function Sec06Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const balaoEstilo = resolverEstilo(tema, estiloBalao(passo.balao));
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoAlvo
        texto={op.texto}
        estilo={resolverEstilo(tema, passo.estilo, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
        className="w-18"
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col p-4">
        {/* balão de pergunta branco (sem bico — removido a pedido do usuário). */}
        <div
          className="mx-auto max-w-[90%] rounded-2xl px-4 py-3 text-center text-sm font-bold"
          style={{
            backgroundColor: balaoEstilo.corFundo,
            color: balaoEstilo.corTexto,
          }}
        >
          <TextoRico texto={passo.enunciado} />
        </div>
        {/* personagem embaixo à esquerda; alvos lado a lado à direita. */}
        <div className="relative flex-1">
          {personagemSrc && (
            <div className="absolute bottom-30 left-0 w-7/12">
              <Personagem src={personagemSrc} className="w-full" />
            </div>
          )}
          <div className="absolute right-2 top-6 flex items-center gap-4">
            {opcao(esquerda)}
            {opcao(direita)}
          </div>
        </div>
      </div>
    </section>
  );
}

Sec06Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
