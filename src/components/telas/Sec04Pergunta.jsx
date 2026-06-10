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

// TELA PRÓPRIA da pergunta da seção 4 (doc/tema-4/pergunta-4.png). Endereçada por
// "sec04-pergunta". Personagem um pouco à ESQUERDA do centro, balão à DIREITA
// (bico apontando pra ele), enunciado e opções abaixo. Cor do enunciado vem da
// config (estiloEnunciado do passo). Ajuste AQUI sem afetar outras telas.
export default function Sec04Pergunta({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const { balao, personagem } = passo;
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloOpcao = (opcao) =>
    resolverEstilo(
      tema,
      tema.caixa,
      { corRotulo: tema.corSecundaria, corErro: tema.corErro },
      passo.estilo,
      passo.estiloOpcao,
      opcao.estilo,
    );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col p-4">
        <div className="relative z-10 h-56">
          {/* Balão à direita, topo; bico aponta pra esquerda (personagem). */}
          {balao && (
            <div className="absolute right-0 top-0 z-20 w-1/3">
              <BalaoPersonagem
                texto={textoBalao(balao)}
                estilo={resolverEstilo(tema, passo.estilo, estiloBalao(balao))}
                bico="esquerda"
              />
            </div>
          )}
          {/* Personagem um pouco à esquerda do centro (centro = 50%; aqui 42%). */}
          {personagem && (
            <div className="absolute left-[42%] top-6 -translate-x-1/2">
              <Personagem
                src={resolverAsset(assetsBasePath, personagem.imagem)}
                className="h-48 w-auto max-w-none"
              />
            </div>
          )}
        </div>
        <Enunciado
          texto={passo.enunciado}
          estilo={estiloEnunciado(tema, passo.estiloEnunciado)}
          className="relative -mt-2"
        />
        <div
          className={`grid mt-4 gap-2 pt-4 ${passo.opcoes.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
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

Sec04Pergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
