import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoBola from '../../ui/OpcaoBola.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 2 do Álbum 3 (Artigo 27). Layout (definido
// pelo usuário): balão VERDE/texto branco no topo (bico pra baixo); personagem no
// tamanho máximo; e duas opções em BOLA branca (borda + letra azul-escuro)
// SOBREPOSTAS ao personagem, uma de cada lado. Cores na config (P-11) —
// passo.estilo serve o balão; cada opcao traz seu próprio estilo. Isolada por álbum.
export default function Sec02Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const balaoEstilo = resolverEstilo(tema, passo.estilo);
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoBola
        texto={op.texto}
        estilo={resolverEstilo(tema, op.estilo)}
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
        {/* balão verde com bico apontando pra baixo (pra personagem, abaixo). */}
        <div
          className="relative max-w-[90%] rounded-2xl px-4 py-3 text-center text-sm font-bold"
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
        {/* personagem no tamanho máximo com as bolas sobrepostas na base. */}
        <div className="relative mt-4 flex w-full items-end justify-center">
          {personagemSrc && (
            <Personagem src={personagemSrc} className="w-full" />
          )}
          <div className="absolute bottom-40 left-0 w-7/15">
            {opcao(esquerda)}
          </div>
          <div className="absolute bottom-40 right-0 w-7/15">
            {opcao(direita)}
          </div>
        </div>
      </div>
    </section>
  );
}

Sec02Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
