import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoRetangulo from '../../ui/OpcaoRetangulo.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 4 do Álbum 2. Layout (definido pelo usuário):
// balão AMARELO centralizado no topo (texto marrom escuro, bico apontando pra
// baixo); abaixo, personagem na largura máxima da tela; e ABAIXO dela, duas
// opções RETANGULARES amarelas lado a lado (esquerda = opção 1, direita = opção
// 2). Cores vêm da config (P-11) — passo.estilo serve balão e opções. Isolada por
// álbum.
export default function Sec04Pergunta({ passo, onResponder }) {
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
        tamanhoTexto="text-base"
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        {/* balão amarelo com bico apontando pra baixo (pra personagem, abaixo). */}
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
        {/* personagem em largura máxima. */}
        {personagemSrc && (
          <Personagem src={personagemSrc} className="w-full" />
        )}
        {/* opções lado a lado, ABAIXO da imagem (não sobrepostas). */}
        <div className="grid w-full grid-cols-2 items-stretch gap-3">
          {opcao(esquerda)}
          {opcao(direita)}
        </div>
      </div>
    </section>
  );
}

Sec04Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
