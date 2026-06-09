import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../engine/estilo.js';
import { SubTela } from '../../engine/maquina.js';
import { textoBalao, estiloBalao, varianteBalao } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import OpcaoResposta from '../ui/OpcaoResposta.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// Layout padrão da pergunta: enunciado + lista de opções A/B/C (doc/tema-N).
// Na sub-tela de erro reexibe o enunciado, marca a opção com X, troca o balão e
// a pose do personagem (personagemErro) e mostra "Volte" (RF-04/05).
export default function PerguntaLista({
  passo,
  subTela,
  opcaoErrada,
  onResponder,
  onVoltarErro,
}) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const erro = subTela === SubTela.ERRO;
  const balao = erro ? (passo.balaoErro ?? passo.balao) : passo.balao;
  const personagem = erro
    ? (passo.personagemErro ?? passo.personagem)
    : passo.personagem;
  const esquerda = personagem?.posicao === 'esquerda';
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloEnunciado = resolverEstilo(
    tema,
    { corFundo: tema.corPrimaria, corTexto: '#FFFFFF' },
    tema.enunciado,
  );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Zona-topo de altura fixa: o personagem fica ancorado na base, então
            aumentá-lo faz a cabeça crescer PRA CIMA (atrás do balão), sem empurrar
            enunciado/opções. A altura da zona (h-56) define onde o enunciado
            começa; o tamanho do personagem é independente. Camadas: balão (z-20)
            na frente do personagem (z-10), que cobre o enunciado (atrás). */}
        <div className="relative z-10 h-56">
          {balao && (
            <div
              className={`absolute top-0 z-20 w-1/2 ${esquerda ? 'right-0' : 'left-0'}`}
            >
              <BalaoPersonagem
                texto={textoBalao(balao)}
                estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao))}
                variante={varianteBalao(balao)}
                bico={esquerda ? 'esquerda' : 'direita'}
              />
            </div>
          )}
          {personagem && (
            <div className={`absolute -bottom-25 ${esquerda ? 'left-0' : 'right-0'}`}>
              <Personagem
                src={resolverAsset(assetsBasePath, personagem.imagem)}
                className="h-80 w-52"
              />
            </div>
          )}
        </div>
        <CaixaConteudo
          texto={passo.enunciado}
          estilo={estiloEnunciado}
          className="relative -mt-2 text-center font-semibold"
        />
        <div
          className={`grid gap-2 ${passo.opcoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {passo.opcoes.map((opcao) => (
            <OpcaoResposta
              key={opcao.rotulo}
              rotulo={opcao.rotulo}
              texto={opcao.texto}
              estilo={resolverEstilo(
                tema,
                tema.caixa,
                { corRotulo: tema.corSecundaria },
                passo.estilo,
                opcao.estilo,
              )}
              errada={erro && opcao.rotulo === opcaoErrada}
              onClick={erro ? undefined : () => onResponder(opcao.rotulo)}
            />
          ))}
        </div>
      </div>
      {erro && (
        <RodapeAcao>
          <BotaoAcao
            texto={passo.textoBotaoErro ?? 'Volte'}
            onClick={onVoltarErro}
            estilo={estiloDoBotao(tema)}
          />
        </RodapeAcao>
      )}
    </section>
  );
}

PerguntaLista.propTypes = {
  passo: PropTypes.object.isRequired,
  subTela: PropTypes.string,
  opcaoErrada: PropTypes.string,
  onResponder: PropTypes.func,
  onVoltarErro: PropTypes.func,
};
