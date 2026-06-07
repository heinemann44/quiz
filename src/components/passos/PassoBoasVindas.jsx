import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { resolverEstilo } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import TextoRico from '../ui/TextoRico.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';

// Boas-vindas: texto corrido da missão + botão (doc/inicio/boas-vindas.png).
export default function PassoBoasVindas({ passo, onAvancar }) {
  const { tema } = useAlbum();
  const estiloBotao = resolverEstilo(
    tema,
    { corFundo: tema.corPrimaria },
    passo.botao?.estilo,
  );
  return (
    <section
      className="flex flex-1 flex-col gap-3 p-6"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      {(passo.paragrafos ?? []).map((paragrafo, i) => (
        <TextoRico key={i} texto={paragrafo} className="block" />
      ))}
      <div className="mt-auto pt-4 text-center">
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloBotao}
        />
      </div>
    </section>
  );
}

PassoBoasVindas.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
