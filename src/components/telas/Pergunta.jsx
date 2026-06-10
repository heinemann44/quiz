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

// Tela-base de pergunta (variante lista A/B/C, doc/tema-N): personagem+balão no
// topo, enunciado e opções em grade. NÃO tem a tela de erro — erro é a tela
// `Erro` (arquivo próprio), então ajustar o personagem do erro nunca move o
// personagem daqui. É o layout PADRÃO; uma seção que divirja vira tela própria.
export default function Pergunta({ passo, onResponder }) {
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
        {/* Zona-topo de altura fixa (h-56): o personagem fica ancorado na base,
            então aumentá-lo cresce PRA CIMA (atrás do balão) sem empurrar
            enunciado/opções. Camadas: balão (z-20) na frente do personagem (z-10). */}
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
              className={`absolute -bottom-25 ${esquerda ? 'left-0' : 'right-0'}`}
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
        {/* pt-4 dá o respiro pro círculo do rótulo (que sobe -top-4 no card). */}
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

Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
