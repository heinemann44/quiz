import { useParams } from 'react-router-dom';

// Stub da Fase 0: só ecoa o escolaId da rota. A resolução real
// (direto | seletor | indisponível) chega na Fase 1 com o Supabase.
export default function QuizEntradaPage() {
  const { escolaId } = useParams();
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold">Entrada do quiz</h1>
      <p className="text-slate-600">
        escola: <span className="font-mono">{escolaId}</span>
      </p>
      <p className="text-sm text-slate-400">(mock — Fase 0)</p>
    </main>
  );
}
