import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloEnunciado } from '../../../engine/estilo.js';
import { textoBalao, estiloBalao } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import BalaoPersonagem from '../../ui/BalaoPersonagem.jsx';
import Enunciado from '../../ui/Enunciado.jsx';
import OpcaoResposta from '../../ui/OpcaoResposta.jsx';
import BotaoVoltar from '../../ui/BotaoVoltar.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA do erro da pergunta 4 (doc/tema-4/errado-4.png). Arranjo invertido
// (como o erro 3): personagem (pose de erro) na metade ESQUERDA/topo; balão na 2ª
// coluna a partir da direita (bico pra esquerda); e à DIREITA, no meio vertical, o
// stack enunciado + opção errada + "Volte". Reaproveita as cores próprias da
// pergunta 4 (estiloEnunciado/estiloOpcao do passo).
export default function Sec04Erro({ passo, opcaoErrada, onVoltarErro }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const balao = passo.balaoErro ?? passo.balao;
  const personagem = passo.personagemErro ?? passo.personagem;
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const opcaoEscolhida = passo.opcoes.find((o) => o.rotulo === opcaoErrada);
  const estiloOpcao = resolverEstilo(
    tema,
    tema.caixa,
    { corRotulo: tema.corSecundaria, corErro: tema.corErro },
    passo.estilo,
    passo.estiloOpcao,
    opcaoEscolhida?.estilo,
  );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}

      {/* Área livre (sob o header, acima do botão). */}
      <div className="relative flex-1">
        {/* Personagem: metade ESQUERDA, topo (camada de baixo, z-10). */}
        {personagem && (
          <div className="absolute left-0 top-10 z-10 w-1/2">
            <Personagem
              src={resolverAsset(assetsBasePath, personagem.imagem)}
              className="w-full"
            />
          </div>
        )}

        {/* Balão: 2ª coluna a partir da direita (right-1/4), topo, 2/5 da largura;
            bico aponta pra esquerda (personagem). */}
        {balao && (
          <div className="absolute right-1/8 top-0 z-20 w-2/5">
            <BalaoPersonagem
              texto={textoBalao(balao)}
              estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao), {
                tamanhoFonte: '1.125rem',
              })}
              bico="esquerda"
            />
          </div>
        )}

        {/* Bloco enunciado + opção errada + "Volte": à DIREITA (right-4), 2/3 da
            largura, centrado no meio vertical, stack com 12px de respiro. */}
        <div className="absolute right-4 top-2/3 z-20 flex w-2/3 -translate-y-1/2 flex-col items-center gap-3">
          <Enunciado
            texto={passo.enunciado}
            estilo={estiloEnunciado(tema, passo.estiloEnunciado)}
            className="w-full"
          />
          {opcaoEscolhida && (
            <div className="w-3/4">
              <OpcaoResposta
                rotulo={opcaoEscolhida.rotulo}
                texto={opcaoEscolhida.texto}
                estilo={estiloOpcao}
                errada
              />
            </div>
          )}
          <BotaoVoltar
            texto={passo.textoBotaoErro ?? 'Volte'}
            onClick={onVoltarErro}
          />
        </div>
      </div>
    </section>
  );
}

Sec04Erro.propTypes = {
  passo: PropTypes.object.isRequired,
  opcaoErrada: PropTypes.string,
  onVoltarErro: PropTypes.func,
};
