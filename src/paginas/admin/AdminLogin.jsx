import { useState } from 'react';
import { entrar } from '../../services/auth.js';
import { ambiente } from '../../services/supabase.js';

// Login do backoffice (e-mail/senha, Supabase Auth). Erro técnico vira aviso
// amigável; a sessão criada é observada pelo AdminApp (que troca pra lista).
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await entrar(email, senha);
    } catch {
      setErro('E-mail ou senha inválidos.');
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100 p-6">
      <form
        onSubmit={aoSubmeter}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow"
      >
        <h1 className="mb-1 text-xl font-bold text-slate-800">Backoffice</h1>
        <p className="mb-4 text-sm text-slate-400">Ambiente: {ambiente}</p>

        <label className="mb-3 block text-sm font-semibold text-slate-700">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>
        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Senha
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        {erro && <p className="mb-3 text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded bg-slate-800 py-2 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
