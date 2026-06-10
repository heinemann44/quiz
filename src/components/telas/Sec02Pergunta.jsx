import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloEnunciado } from '../../engine/estilo.js';
import { textoBalao, estiloBalao } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import Enunciado from '../ui/Enunciado.jsx';
import OpcaoResposta from '../ui/OpcaoResposta.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// TELA PRÓPRIA da pergunta da seção 2 (doc/tema-2/pergunta-2.png). Endereçada por
// "sec02-pergunta". Espelha o layout-base de pergunta: personagem + balão no topo,
// enunciado e opções em grade. Ajuste AQUI sem afetar outras telas.
export default function Sec02Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const { balao, personagem } = passo;
  const esquerda = personagem?.posicao === 'esquerda';
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloOpcao = (opcao) =>
    resolverEstilo(
      tema,
      tema.caixa,
      { corRotulo: tema.corSecundaria, corErro: tema.corErro },
      passo.estilo,
      opcao.estilo,
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="relative z-10 h-56">
          {balao && (
            <div
              className={`absolute top-0 z-20 w-1/2 ${esquerda ? 'right-0' : 'left-0'}`}
            >
              <BalaoPersonagem
                texto={textoBalao(balao)}
                estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao))}
                bico={esquerda ? 'esquerda' : 'direita'}
              />
            </div>
          )}
          {personagem && (
            <div
              className={`absolute -bottom-17 ${esquerda ? 'left-0' : 'right-0'}`}
            >
              <Personagem
                src={resolverAsset(assetsBasePath, personagem.imagem)}
                className="h-80 w-52"
              />
            </div>
          )}
        </div>
        <Enunciado
          texto={passo.enunciado}
          estilo={estiloEnunciado(tema)}
          className="relative -mt-2"
        />
        <div
          className={`grid gap-2 pt-4 ${passo.opcoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {passo.opcoes.map((opcao) => (
            <OpcaoResposta
              key={opcao.rotulo}
              rotulo={opcao.rotulo}
              texto={opcao.texto}
              estilo={estiloOpcao(opcao)}
              onClick={() => onResponder(opcao.rotulo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

Sec02Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
