import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoRetangulo from '../../ui/OpcaoRetangulo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 7 do Álbum 2. Layout (definido pelo usuário):
// balão AZUL ESCURO/texto branco no topo (bico pra baixo); SEM espaçamento, o
// personagem centralizado; SEM espaçamento, duas opções QUADRADAS (esquerda =
// opção 1, direita = opção 2). Mesmas cores da seção 7. Cores na config (P-11) —
// passo.estilo serve balão e quadrados. Isolada por álbum.
export default function Sec07Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const enunciadoEstilo = resolverEstilo(tema, passo.estilo);
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoRetangulo
        texto={op.texto}
        estilo={resolverEstilo(tema, passo.estilo, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
        className="aspect-square"
        tamanhoTexto="text-sm"
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center p-4">
        {/* balão azul escuro com bico apontando pra baixo (pra personagem). */}
        <div
          className="relative max-w-[90%] rounded-2xl px-4 py-3 text-center text-sm font-bold"
          style={{
            backgroundColor: enunciadoEstilo.corFundo,
            color: enunciadoEstilo.corTexto,
          }}
        >
          <TextoRico texto={passo.enunciado} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-px"
            style={{
              backgroundColor: enunciadoEstilo.corFundo,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </div>
        {/* personagem centralizado, com um espaçamento pequeno topo/base (my-3). */}
        {personagemSrc && (
          <Personagem src={personagemSrc} className="my-3 max-h-72 w-auto" />
        )}
        {/* opções quadradas lado a lado, sem espaçamento acima. */}
        <div className="grid w-full grid-cols-2 items-stretch gap-3">
          {opcao(esquerda)}
          {opcao(direita)}
        </div>
      </div>
    </section>
  );
}

Sec07Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
