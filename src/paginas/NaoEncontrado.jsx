// Rota coringa (*). Mensagem amigável, sem detalhe técnico (RF-14/RF-15).
export default function NaoEncontrado() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold">Página não encontrada</h1>
      <p className="text-slate-600">Confira o link com a escola.</p>
    </main>
  );
}
