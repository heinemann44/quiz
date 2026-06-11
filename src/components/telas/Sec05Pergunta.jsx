import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import OpcaoBalao from '../ui/OpcaoBalao.jsx';
import TextoRico from '../ui/TextoRico.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 5 (doc/tema-5/pergunta-5.png). Variante balões
// Sim/Não: enunciado numa caixa clara no topo; João no CENTRO com as opções nas
// laterais (Sim à esquerda, Não à direita, na altura das mãos). Sem sub-tela de
// erro — errar volta ao conteúdo (aoErrar no motor). Ajuste AQUI sem afetar outras.
export default function Sec05Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const [opcaoSim, opcaoNao] = passo.opcoes ?? [];
  const opcao = (op) =>
    op && (
      <OpcaoBalao
        texto={op.texto}
        estilo={resolverEstilo(tema, passo.estilo, op.estilo)}
        onClick={() => onResponder(op.rotulo)}
      />
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        {/* Balão de fala PRÓPRIO desta tela: nuvem branca + rabinho apontando pra
            BAIXO (pro João, centralizado). Desenhado aqui pra não sobrecarregar o
            átomo BalaoPersonagem com mais um caso de bico. */}
        <div
          className="relative max-w-[60%] rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold"
          style={{ color: tema.corTexto }}
        >
          <TextoRico texto={passo.enunciado} />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full h-15 w-5 -translate-x-1/2 -translate-y-px bg-white"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>
        {/* João no centro; Sim/Não SOBREPOSTOS a ele, centralizados na vertical.
            O `gap-20` é a DISTÂNCIA entre os dois balões — ajuste à vontade. */}
        <div className="relative flex flex-1 items-center justify-center">
          {personagemSrc && (
            <Personagem
              src={personagemSrc}
              className="h-64 w-auto max-w-none"
            />
          )}
          <div className="absolute left-1/2 top-1/5 flex -translate-x-1/2 -translate-y-1/2 items-center gap-13">
            {opcao(opcaoSim)}
            {opcao(opcaoNao)}
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
