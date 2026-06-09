import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import { estiloDoBotao } from '../../engine/estilo.js';
import { textoDoBotao } from './campos.js';
import TextoRico from '../ui/TextoRico.jsx';
import BotaoAcao from '../ui/BotaoAcao.jsx';
import RodapeAcao from '../ui/RodapeAcao.jsx';

// Boas-vindas: texto corrido da missão + botão (doc/inicio/boas-vindas.png).
export default function PassoBoasVindas({ passo, onAvancar }) {
  const { tema } = useAlbum();
  const estiloBotao = estiloDoBotao(tema, passo.botao?.estilo);
  return (
    <section
      className="flex flex-1 flex-col"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      <div className="flex flex-1 flex-col gap-2 px-6 py-4 text-[17px]">
        {(passo.paragrafos ?? []).map((paragrafo, i) => (
          <TextoRico key={i} texto={paragrafo} className="block leading-snug" />
        ))}
      </div>
      <RodapeAcao>
        <BotaoAcao
          texto={textoDoBotao(passo)}
          onClick={onAvancar}
          estilo={estiloBotao}
        />
      </RodapeAcao>
    </section>
  );
}

PassoBoasVindas.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
