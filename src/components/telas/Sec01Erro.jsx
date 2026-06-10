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
import BotaoVoltar from '../ui/BotaoVoltar.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// TELA PRÓPRIA do erro da pergunta 1 (doc/tema-1/errado-1.png).
// Composição (montada uma a uma): personagem (pose de erro) na METADE DIREITA /
// topo; balão de fala iniciando na 2ª coluna, topo (camada acima do personagem);
// e, no meio vertical à esquerda, um stack centralizado (gap 12px) com o enunciado,
// a opção errada (com o X) e o botão "Volte" (BotaoVoltar, componente próprio).
export default function Sec01Erro({ passo, opcaoErrada, onVoltarErro }) {
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
        {/* Personagem: metade direita, topo (camada de baixo, z-10). */}
        {personagem && (
          <div className="absolute right-0 top-0 z-10 w-1/2">
            <Personagem
              src={resolverAsset(assetsBasePath, personagem.imagem)}
              className="w-full"
            />
          </div>
        )}

        {/* Balão: começa na 2ª das 4 colunas (borda esquerda em 25% = left-1/4),
            alinhado ao topo (top-0), 1/3 da largura (w-1/3), camada de cima (z-20). */}
        {balao && (
          <div className="absolute left-1/4 top-0 z-20 w-1/3">
            <BalaoPersonagem
              texto={textoBalao(balao)}
              estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao), {
                tamanhoFonte: '1.125rem',
              })}
              bico="direita"
            />
          </div>
        )}

        {/* Bloco enunciado + opção errada: alinhado à esquerda (left-4), 2/3 da
            largura (w-2/3), centrado no meio vertical (top-1/2 + -translate-y-1/2).
            Empilhados com 12px de respiro (gap-3) e centralizados entre si
            (items-center). A opção entra logo abaixo do enunciado. */}
        <div className="absolute left-4 top-2/3 z-20 flex w-2/3 -translate-y-1/2 flex-col items-center gap-3">
          <Enunciado
            texto={passo.enunciado}
            estilo={estiloEnunciado(tema)}
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
          {/* "Volte" logo abaixo da opção: mesmo stack (gap-3 = 12px) e
              centralizado (items-center) com o enunciado/opção. Componente próprio
              (BotaoVoltar), não o BotaoAcao de "Próxima página". */}
          <BotaoVoltar
            texto={passo.textoBotaoErro ?? 'Volte'}
            onClick={onVoltarErro}
          />
        </div>
      </div>
    </section>
  );
}

Sec01Erro.propTypes = {
  passo: PropTypes.object.isRequired,
  opcaoErrada: PropTypes.string,
  onVoltarErro: PropTypes.func,
};
