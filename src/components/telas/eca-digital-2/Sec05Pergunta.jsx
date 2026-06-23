import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoRetangulo from '../../ui/OpcaoRetangulo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 5 do Álbum 2. Layout (definido pelo usuário):
// balão no topo (mesma cor de fundo do enunciado — bege, bico pra baixo); 48px de
// espaço; personagem centralizado; um quadro de resposta ancorado a cada lado dele
// (esquerda = opção 1, direita = opção 2). Cores vêm da config (P-11) —
// passo.estilo serve balão e quadros. Isolada por álbum.
export default function Sec05Pergunta({ passo, onResponder }) {
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
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        {/* balão bege com bico apontando pra baixo (pra personagem, abaixo). */}
        <div
          className="relative max-w-[85%] rounded-2xl px-4 py-3 text-center text-sm font-bold"
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
        {/* grupo balão+personagem centralizado na vertical (justify-center acima);
            gap menor entre eles (balão desce, fica perto do personagem). */}
        <div className="relative mt-6 flex w-full items-center justify-center">
          {personagemSrc && (
            <Personagem src={personagemSrc} className="max-h-70 w-auto" />
          )}
          <div className="absolute left-0 top-1/4 w-2/6 -translate-y-1/2">
            {opcao(esquerda)}
          </div>
          <div className="absolute right-0 top-1/5 w-2/6 -translate-y-1/2">
            {opcao(direita)}
          </div>
        </div>
      </div>
    </section>
  );
}

Sec05Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
