import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoRetangulo from '../../ui/OpcaoRetangulo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 4 do Álbum 3 (Artigo 29). Layout (definido
// pelo usuário): balão PRETO/texto branco no topo (bico pra baixo); personagem
// centralizado à DIREITA; à esquerda dele, as duas opções empilhadas — quadrados
// pretos com moldura branca INTERNA e texto branco. Cores na config (P-11) —
// passo.estilo serve o balão; cada opcao traz seu próprio estilo. Isolada por álbum.
export default function Sec04Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const balaoEstilo = resolverEstilo(tema, passo.estilo);
  const [cima, baixo] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoRetangulo
        texto={op.texto}
        estilo={resolverEstilo(tema, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
        className="aspect-square"
        tamanhoTexto="text-[11px]"
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* balão preto com bico apontando pra baixo. */}
        <div
          className="relative self-center rounded-2xl px-4 py-3 text-center text-sm font-bold"
          style={{
            backgroundColor: balaoEstilo.corFundo,
            color: balaoEstilo.corTexto,
          }}
        >
          <TextoRico texto={passo.enunciado} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-px"
            style={{
              backgroundColor: balaoEstilo.corFundo,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </div>
        {/* opções empilhadas à esquerda; personagem maior à direita, sobrepondo
            um pouco as opções (margin negativa + z-10). items-start encosta o
            conjunto logo abaixo do balão. */}
        <div className="flex flex-1 items-start">
          <div className="flex w-2/5 flex-col gap-3">
            {opcao(cima)}
            {opcao(baixo)}
          </div>
          {personagemSrc && (
            <Personagem
              src={personagemSrc}
              className="relative z-10 -ml-6 w-3/5"
            />
          )}
        </div>
      </div>
    </section>
  );
}

Sec04Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
