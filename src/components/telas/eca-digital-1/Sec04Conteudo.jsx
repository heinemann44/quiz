import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { resolverEstilo, estiloDoBotao } from '../../../engine/estilo.js';
import { textoDoBotao, textoBloco } from '../campos.js';
import HeaderEscola from '../../layout/HeaderEscola.jsx';
import Personagem from '../../ui/Personagem.jsx';
import CaixaConteudo from '../../ui/CaixaConteudo.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA PRÓPRIA do conteúdo da seção 4 (doc/tema-4/tema-4.png). Endereçada por
// "sec04-conteudo". Personagem CENTRALIZADO na horizontal no topo, seguido de UMA
// caixa com os 2 parágrafos (a seção 4 não tem balão). Ajuste AQUI sem afetar
// outras telas.
export default function Sec04Conteudo({ passo, onAvancar }) {
  const { tema, assetsBasePath, escola } = useAlbum();
  const personagemSrc = resolverAsset(assetsBasePath, passo.personagem?.imagem);
  const fundoSecao = resolverAsset(assetsBasePath, passo.imagemFundo);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={estiloFundoTela(tema, fundoSecao)}
    >
      {escola && <HeaderEscola escola={escola} titulo={passo.tituloHeader} />}
      <div className="flex flex-1 flex-col px-4">
        {personagemSrc && (
          <div className="relative z-10 flex justify-center">
            <Personagem src={personagemSrc} className="h-40 w-55" />
          </div>
        )}
        {/* UMA caixa com os 2 parágrafos. Puxada pra cima (-mt-6) pra o personagem
            sobrepor um pouco o topo; pt-7 mantém o texto abaixo da sobreposição. */}
        <div className="-mt-4">
          <CaixaConteudo
            texto={(passo.blocos ?? []).map(textoBloco).join('\n\n')}
            estilo={resolverEstilo(tema, tema.caixa, passo.estilo)}
            className="pt-7"
          />
        </div>
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloDoBotao(tema, passo.botao?.estilo)}
        />
      </RodapeAcao>
    </section>
  );
}

Sec04Conteudo.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
