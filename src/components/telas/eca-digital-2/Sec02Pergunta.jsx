import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo } from '../../../engine/estilo.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import OpcaoResposta from '../../ui/OpcaoResposta.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 2 do Álbum 2. Layout (definido pelo usuário):
// personagem CENTRALIZADA no topo; logo abaixo, colada e um pouco sobreposta por
// ela (-mt + z), a pergunta num quadro BRANCO com BORDA LARANJA; embaixo, 2
// alternativas lado a lado (A esquerda, B direita) — cards brancos com borda
// laranja e a bolinha da letra no topo. A moldura vem da config (`corBorda`,
// P-11). Isolada por álbum — ajustar aqui não afeta as outras telas.
export default function Sec02Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const [esquerda, direita] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoResposta
        rotulo={op.rotulo}
        texto={op.texto}
        estilo={resolverEstilo(tema, passo.estilo, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
        tamanhoRotulo="h-10 w-10 text-xl"
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
        {personagemSrc && (
          <Personagem
            src={personagemSrc}
            className="relative z-10 h-48 w-auto"
          />
        )}
        <CaixaConteudo
          texto={passo.enunciado}
          estilo={resolverEstilo(tema, tema.caixa, passo.estilo)}
          className="-mt-2 w-full text-center font-bold"
        />
        <div className="grid w-full grid-cols-2 items-stretch gap-3 pt-6">
          {opcao(esquerda)}
          {opcao(direita)}
        </div>
      </div>
    </section>
  );
}

Sec02Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
