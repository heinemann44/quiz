import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import TextoRico from '../ui/TextoRico.jsx';

// Encerramento (terminal, sem botão): parágrafos finais — incl. o resumo do
// código secreto, que vem como texto na config (RF-11), não mais num bloco fixo.
export default function Encerramento({ passo }) {
  const { tema } = useAlbum();
  return (
    <section
      className="flex flex-1 flex-col gap-3 p-6 text-[0.95rem]"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      {(passo.paragrafos ?? []).map((paragrafo, i) => (
        <TextoRico key={i} texto={paragrafo} className="block" />
      ))}
    </section>
  );
}

Encerramento.propTypes = {
  passo: PropTypes.object.isRequired,
  codigoSecreto: PropTypes.array,
  figurinhas: PropTypes.array,
};
