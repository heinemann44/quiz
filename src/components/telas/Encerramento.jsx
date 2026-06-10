import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';
import TextoRico from '../ui/TextoRico.jsx';

// Encerramento (terminal, sem botão): texto + resumo do código secreto (RF-11).
export default function Encerramento({
  passo,
  codigoSecreto = [],
  figurinhas = [],
}) {
  const { tema } = useAlbum();
  return (
    <section
      className="flex flex-1 flex-col gap-3 p-6"
      style={{ backgroundColor: tema.corFundo, color: tema.corTexto }}
    >
      {(passo.paragrafos ?? []).map((paragrafo, i) => (
        <TextoRico key={i} texto={paragrafo} className="block" />
      ))}
      {passo.mostrarCodigoSecreto && (
        <div className="rounded-lg border p-3">
          <p className="font-semibold">Seu código secreto</p>
          <p className="text-2xl font-bold">
            {codigoSecreto.map((c) => c.valor).join('  ') || '—'}
          </p>
          <p className="text-sm">
            Figurinhas conquistadas: {figurinhas.length}
          </p>
        </div>
      )}
    </section>
  );
}

Encerramento.propTypes = {
  passo: PropTypes.object.isRequired,
  codigoSecreto: PropTypes.array,
  figurinhas: PropTypes.array,
};
