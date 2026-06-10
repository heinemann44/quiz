import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverAsset } from '../../engine/preload.js';
import { resolverEstilo } from '../../engine/estilo.js';
import HeaderEscola from '../layout/HeaderEscola.jsx';
import Personagem from '../ui/Personagem.jsx';
import BalaoPersonagem from '../ui/BalaoPersonagem.jsx';
import OpcaoBalao from '../ui/OpcaoBalao.jsx';
import { estiloFundoTela } from '../ui/fundoTela.js';

// Variante "balões" (doc/tema-5/pergunta-5): enunciado num balão no topo e o
// personagem segurando as opções Sim/Não. Não tem sub-tela de erro — errar volta
// ao conteúdo da seção (passo.aoErrar, resolvido no motor). Selecionada por nome
// na config (`tela: "baloes"`), mantendo o motor genérico (P-11).
export default function Baloes({ passo, onResponder }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  const estiloBalao = resolverEstilo(
    tema,
    { corFundo: '#FFFFFF', corTexto: tema.corTexto },
    passo.estilo,
  );
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <BalaoPersonagem texto={passo.enunciado} estilo={estiloBalao} />
        <div className="flex w-full justify-center gap-8">
          {passo.opcoes.map((opcao) => (
            <OpcaoBalao
              key={opcao.rotulo}
              texto={opcao.texto}
              estilo={resolverEstilo(tema, passo.estilo, opcao.estilo)}
              onClick={() => onResponder(opcao.rotulo)}
            />
          ))}
        </div>
        {passo.personagem && (
          <Personagem
            src={resolverAsset(assetsBasePath, passo.personagem.imagem)}
            className="h-44 w-36"
          />
        )}
      </div>
    </section>
  );
}

Baloes.propTypes = {
  passo: PropTypes.object.isRequired,
  onResponder: PropTypes.func,
};
