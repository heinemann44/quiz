import { Routes, Route } from 'react-router-dom';
import MobileFrame from './components/layout/MobileFrame.jsx';
import QuizEntradaPage from './paginas/QuizEntradaPage.jsx';
import AlbumPage from './paginas/AlbumPage.jsx';
import NaoEncontrado from './paginas/NaoEncontrado.jsx';

// Rotas conforme plan §2. Todo o app vive dentro do MobileFrame (P-03).
export default function App() {
  return (
    <MobileFrame>
      <Routes>
        <Route path="/quiz/:escolaId" element={<QuizEntradaPage />} />
        <Route path="/quiz/:escolaId/:albumId" element={<AlbumPage />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </MobileFrame>
  );
}
