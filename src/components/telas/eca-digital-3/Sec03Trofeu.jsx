import PropTypes from 'prop-types';
import { useAlbum } from '../../AlbumContext.jsx';
import { resolverAsset } from '../../../engine/preload.js';
import { estiloDoBotao } from '../../../engine/estilo.js';
import { textoDoBotao } from '../campos.js';
import Figura from '../../ui/Figura.jsx';
import BotaoAcao from '../../ui/BotaoAcao.jsx';
import RodapeAcao from '../../ui/RodapeAcao.jsx';
import { estiloFundoTela } from '../../ui/fundoTela.js';

// TELA do troféu do Álbum 3 — mesmo padrão dos Álbuns 1/2 (troféu grande
// centralizado + faixa branca com a legenda do código e "valor" anote!). GENÉRICA
// por config: serve TODOS os troféus do álbum — só muda valor/legenda/imagem no
// JSON. Isolada por álbum (não importa a tela dos outros).
export default function Sec03Trofeu({ passo, onAvancar }) {
  const { tema, assetsBasePath } = useAlbum();
  const fundo = resolverAsset(assetsBasePath, passo.imagemFundo);
  return (
    <section
      className="flex flex-1 flex-col bg-cover bg-center"
      style={{ ...estiloFundoTela(tema, fundo), color: tema.corTexto }}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
        <Figura
          src={resolverAsset(assetsBasePath, passo.imagemTrofeu)}
          alt="Troféu"
          placeholder="🏆"
          className="max-h-[26rem] w-auto"
        />
        {/* Faixa branca atrás do texto, pra ler sobre o fundo. */}
        <div className="w-full rounded bg-white px-4 py-2">
          {passo.legenda && <p>{passo.legenda}</p>}
          <p className="font-semibold">
            &ldquo;{passo.valor}&rdquo; {passo.instrucao ?? 'anote!'}
          </p>
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

Sec03Trofeu.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
