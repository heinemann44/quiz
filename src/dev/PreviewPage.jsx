import { useQuiz } from '../engine/useQuiz.js';
import { AlbumProvider } from '../components/AlbumContext.jsx';
import PassoRenderer from '../components/passos/PassoRenderer.jsx';
import { configExemplo, escolaExemplo } from './configExemplo.js';

// Host de DEV (/preview) para clicar o fluxo com placeholders. Na Fase 4 a
// AlbumPage faz o mesmo com o config real e o motor — este host é descartável.
export default function PreviewPage() {
  const quiz = useQuiz(configExemplo);
  const valor = {
    tema: configExemplo.tema,
    assetsBasePath: configExemplo.assetsBasePath,
    escola: escolaExemplo,
  };
  return (
    <AlbumProvider valor={valor}>
      <PassoRenderer quiz={quiz} />
    </AlbumProvider>
  );
}
