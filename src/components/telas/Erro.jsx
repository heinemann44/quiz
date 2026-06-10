import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo, estiloDoBotao, estiloEnunciado } from '../../engine/estilo.js';
import { textoBalao, estiloBalao } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import Enunciado from '../ui/Enunciado.jsx';
import OpcaoResposta from '../ui/OpcaoResposta.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// Tela-base de ERRO (sub-tela da pergunta, doc/tema-1/errado-1): reexibe o
// enunciado, mostra só a opção escolhida com o X, troca o balão (`balaoErro`) e a
// pose do personagem (`personagemErro`) e oferece "Volte" (RF-04/05).
//
// É DELIBERADAMENTE um arquivo separado da `Pergunta` (mesmo com topo parecido):
// assim o posicionamento do erro é tunado sozinho, sem vazar pra tela de pergunta
// — exatamente o acoplamento que motivou esta arquitetura.
export default function Erro({ passo, opcaoErrada, onVoltarErro }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const balao = passo.balaoErro ?? passo.balao;
  const personagem = passo.personagemErro ?? passo.personagem;
  const esquerda = personagem?.posicao === 'esquerda';
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const opcaoEscolhida = passo.opcoes.find((o) => o.rotulo === opcaoErrada);
  const estiloOpcao = resolverEstilo(
    tema,
    tema.caixa,
    { corRotulo: tema.corSecundaria, corErro: tema.corErro },
    passo.estilo,
    opcaoEscolhida?.estilo,
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
        {opcaoEscolhida && (
          <div className="flex pt-4">
            <div className="w-1/2">
              <OpcaoResposta
                rotulo={opcaoEscolhida.rotulo}
                texto={opcaoEscolhida.texto}
                estilo={estiloOpcao}
                errada
              />
            </div>
          </div>
        )}
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto={passo.textoBotaoErro ?? 'Volte'}
          onClick={onVoltarErro}
          estilo={estiloDoBotao(tema)}
        />
      </RodapeAcao>
    </section>
  );
}

Erro.propTypes = {
  passo: PropTypes.object.isRequired,
  opcaoErrada: PropTypes.string,
  onVoltarErro: PropTypes.func,
};
