import AlbumRunner from '../components/AlbumRunner.jsx';
import { configExemplo, escolaExemplo } from './configExemplo.js';

// Host de DEV (/preview) para clicar o fluxo com placeholders, usando o MESMO
// AlbumRunner da AlbumPage — só muda a config (exemplo) e a escola.
export default function PreviewPage() {
  return <AlbumRunner config={configExemplo} escola={escolaExemplo} />;
}
