import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoHexagono from '../../ui/OpcaoHexagono.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 3 do Álbum 2. Layout (definido pelo usuário):
// pergunta num quadro DOURADO com texto preto no topo; abaixo, personagem
// centralizada; uma opção em hexágono DOURADO (texto preto) sobreposta a cada
// lado dela (esquerda = opção 1, direita = opção 2). Cores vêm da config (P-11) —
// passo.estilo serve tanto o quadro quanto os hexágonos. Isolada por álbum.
export default function Sec03Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoHexagono
        texto={op.texto}
        estilo={resolverEstilo(tema, passo.estilo, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
        tamanho="h-32 w-32"
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <CaixaConteudo
          texto={passo.enunciado}
          estilo={resolverEstilo(tema, tema.caixa, passo.estilo)}
          className="w-full text-center font-bold"
        />
        {/* personagem central; hexágonos ancorados às bordas (left/right-0) e
            sobrepostos a ela — garante que não saiam da tela. */}
        <div className="relative flex w-full flex-1 items-center justify-center">
          {personagemSrc && (
            <Personagem src={personagemSrc} className="max-h-100 w-auto" />
          )}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            {opcao(esquerda)}
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {opcao(direita)}
          </div>
        </div>
      </div>
    </section>
  );
}

Sec03Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
