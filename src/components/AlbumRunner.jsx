import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuiz } from '../engine/useQuiz.js';
import { precarregar, precarregarImagens } from '../engine/preload.js';
import { AlbumProvider } from './AlbumContext.jsx';
import Renderer from './telas/Renderer.jsx';

/**
 * Monta o motor de um álbum: pré-carrega assets (RNF-03), roda a máquina de
 * passos e renderiza pelo Renderer (telas/), que seleciona a TELA nomeada do
 * passo. Usado pela AlbumPage (config real) e pelo PreviewPage (config exemplo).
 * @param {{ config: object, escola: object|null }} props
 */
export default function AlbumRunner({ config, escola }) {
  const quiz = useQuiz(config);
  useEffect(() => {
    precarregar(config);
  }, [config]);
  // O logo do colégio vem do Supabase (fora da config); aquece o cache uma vez
  // pra ele não recarregar a cada troca de tela — o header remonta por passo.
  useEffect(() => {
    precarregarImagens([escola?.logoUrl]);
  }, [escola?.logoUrl]);

  const valor = {
    albumId: config.albumId,
    tema: config.tema,
    assetsBasePath: config.assetsBasePath,
    fundoComemoracao: config.fundoComemoracao,
    headerFigurinha: config.headerFigurinha,
    escola,
  };
  return (
    <AlbumProvider valor={valor}>
      <Renderer quiz={quiz} />
    </AlbumProvider>
  );
}

AlbumRunner.propTypes = {
  config: PropTypes.object.isRequired,
  escola: PropTypes.object,
};
