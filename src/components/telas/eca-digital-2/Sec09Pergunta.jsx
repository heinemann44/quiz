import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 9 do Álbum 2. Layout (definido pelo usuário):
// personagem "enki" no topo; logo abaixo, colado e um pouco SOBREPOSTO, um quadro
// (cores da seção 9) com a pergunta; e embaixo, os personagens "não" (esq.) e
// "sim" (dir.) — eles SÃO as alternativas (clicar = responder). Cada opção carrega
// sua `imagem` na config; cores na config (P-11). Isolada por álbum.
export default function Sec09Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const enkiSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <button
        type="button"
        onClick={() => onResponder(op.rotulo)}
        className="w-[45%]"
        aria-label={op.texto}
      >
        <Personagem
          src={resolverAsset(assetsBasePath, op.imagem)}
          className="w-full"
        />
      </button>
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundo)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center p-4">
        {enkiSrc && (
          <Personagem src={enkiSrc} className="max-h-28 w-auto z-10" />
        )}
        {/* quadro da pergunta colado/sobreposto ao enki (z-10 + -mt). */}
        <CaixaConteudo
          texto={passo.enunciado}
          estilo={resolverEstilo(tema, tema.caixa, passo.estilo)}
          className="relative -mt-3 w-full text-center font-bold"
        />
        {/* personagens não/sim como botões de resposta. */}
        <div className="mt-4 flex w-full items-end justify-between">
          {opcao(esquerda)}
          {opcao(direita)}
        </div>
      </div>
    </section>
  );
}

Sec09Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
