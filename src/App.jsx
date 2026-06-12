import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MobileFrame from './components/layout/MobileFrame.jsx';
import QuizEntradaPage from './paginas/QuizEntradaPage.jsx';
import AlbumPage from './paginas/AlbumPage.jsx';
import NaoEncontrado from './paginas/NaoEncontrado.jsx';
import PreviewPage from './dev/PreviewPage.jsx';

// Backoffice carregado sob demanda: só baixa o bundle do /admin quem o acessa —
// o app do aluno não paga por ele. (adminRepo real vem do contexto por padrão.)
const AdminApp = lazy(() => import('./paginas/admin/AdminApp.jsx'));

// Rotas conforme plan §2 + backoffice (emenda E-02). O /admin fica FORA do
// MobileFrame (é desktop, ator admin); o app do aluno vive dentro dele (P-03).
export default function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="/*" element={<AppAluno />} />
    </Routes>
  );
}

function AppAluno() {
  return (
    <MobileFrame>
      <Routes>
        <Route path="/quiz/:escolaId" element={<QuizEntradaPage />} />
        <Route path="/quiz/:escolaId/:albumId" element={<AlbumPage />} />
        {/* Host de dev para ver os componentes de passo (Fase 3). Só em DEV. */}
        {import.meta.env.DEV && (
          <Route path="/preview" element={<PreviewPage />} />
        )}
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </MobileFrame>
  );
}
