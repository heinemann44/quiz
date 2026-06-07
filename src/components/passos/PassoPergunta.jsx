import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import { SubTela } from '../../engine/maquina.js';
import { textoBalao, estiloBalao, varianteBalao } from './campos.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import CaixaConteudo from '../ui/CaixaConteudo.jsx';
import OpcaoResposta from '../ui/OpcaoResposta.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// Pergunta + sub-tela de erro (P-02 / RF-04/05). No erro: reexibe o enunciado,
// marca a opção escolhida com X e mostra "Volte" (doc/tema-N/pergunta|errado).
export default function PassoPergunta({
  passo,
  subTela,
  opcaoErrada,
  onResponder,
  onVoltarErro,
}) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const erro = subTela === SubTela.ERRO;
  const balao = erro ? (passo.balaoErro ?? passo.balao) : passo.balao;
  const estiloEnunciado = resolverEstilo(tema, {
    corFundo: tema.corPrimaria,
    corTexto: '#FFFFFF',
  });
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo }}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {passo.personagem && (
          <Personagem
            src={resolverAsset(assetsBasePath, passo.personagem.imagem)}
            posicao={passo.personagem.posicao}
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
        <div className="p-4 text-center">
          <BotaoAcao
            texto={passo.textoBotaoErro ?? 'Volte'}
            onClick={onVoltarErro}
            estilo={resolverEstilo(tema, { corFundo: tema.corPrimaria })}
          />
        </div>
      )}
    </section>
  );
}

PassoPergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  subTela: PropTypes.string,
  opcaoErrada: PropTypes.string,
  onResponder: PropTypes.func,
  onVoltarErro: PropTypes.func,
};
