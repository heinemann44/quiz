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
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloEnunciado = resolverEstilo(tema, {
    corFundo: tema.corPrimaria,
    corTexto: '#FFFFFF',
  });
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {personagem && (
          <Personagem
            src={resolverAsset(assetsBasePath, personagem.imagem)}
            posicao={personagem.posicao}
          />
        )}
        {balao && (
          <BalaoPersonagem
            texto={textoBalao(balao)}
            estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao))}
            variante={varianteBalao(balao)}
          />
        )}
        <CaixaConteudo texto={passo.enunciado} estilo={estiloEnunciado} />
        <div className="flex flex-col gap-2">
          {passo.opcoes.map((opcao) => (
            <OpcaoResposta
              key={opcao.rotulo}
              rotulo={opcao.rotulo}
              texto={opcao.texto}
              estilo={resolverEstilo(tema, passo.estilo, opcao.estilo)}
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
