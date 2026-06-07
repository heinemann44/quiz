import PropTypes from 'prop-types';

// Faixa das telas de figurinha: "Álbum de Figurinhas" + contador (RF-09).
export default function HeaderAlbum({ contador = 0 }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 p-3">
      <span className="text-sm font-bold text-slate-700">
        Álbum de Figurinhas
      </span>
      <span className="text-sm" aria-label="figurinhas conquistadas">
        ❤️ {contador}
      </span>
    </header>
  );
}

HeaderAlbum.propTypes = { contador: PropTypes.number };
