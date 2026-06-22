import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoHexagono from '../../ui/OpcaoHexagono.jsx';
import TextoRico from '../../ui/TextoRico.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 1 do Álbum 2. Layout (definido pelo usuário):
// balão de pergunta no TOPO; personagem CENTRALIZADA logo abaixo; uma opção em
// balão HEXAGONAL de cada lado dela (esquerda = opção 1, direita = opção 2). A
// personagem (pergunta-1.png) aponta pros dois lados. Isolada por álbum.
export default function Sec01Pergunta({ passo, onResponder }) {
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
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
        {/* Balão de pergunta: nuvem branca com rabinho apontando pra baixo (pra
            personagem, logo abaixo — grupo centralizado na vertical). */}
        <div
          className="relative max-w-[70%] rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold"
          style={{ color: tema.corTexto }}
        >
          <TextoRico texto={passo.enunciado} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-px bg-white"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>
        {/* personagem central; opções HEXAGONAIS ancoradas às bordas (left/right-0)
            e sobrepostas a ela — garante que não saiam da tela. */}
        <div className="relative flex w-full items-center justify-center">
          {personagemSrc && (
            <Personagem
              src={personagemSrc}
              className="h-64 w-auto max-w-none"
            />
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

Sec01Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
