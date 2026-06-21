import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Ambiente do álbum compartilhado pelos componentes de passo: tema (cascata de
// cores), assetsBasePath (resolução de imagem) e escola (header). Evita drilling.
const AlbumContext = createContext({
  albumId: '',
  tema: {},
  assetsBasePath: '',
  escola: null,
  fundoComemoracao: null,
  headerFigurinha: null,
});

export function AlbumProvider({ valor, children }) {
  return (
    <AlbumContext.Provider value={valor}>{children}</AlbumContext.Provider>
  );
}

AlbumProvider.propTypes = {
  valor: PropTypes.shape({
    albumId: PropTypes.string,
    tema: PropTypes.object,
    assetsBasePath: PropTypes.string,
    escola: PropTypes.object,
    fundoComemoracao: PropTypes.string,
    headerFigurinha: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlbum = () => useContext(AlbumContext);
