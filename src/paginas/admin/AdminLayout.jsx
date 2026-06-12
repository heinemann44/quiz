import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sair } from '../../services/auth.js';
import { ambiente } from '../../services/supabase.js';

// Moldura do backoffice (desktop, FORA do MobileFrame do aluno). Barra superior
// com título, ambiente atual e sair; conteúdo centralizado numa coluna larga.
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-dvh bg-slate-100 text-slate-800">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <Link to="/admin" className="text-lg font-bold">
          Backoffice <span className="text-slate-400">· {ambiente}</span>
        </Link>
        <button
          type="button"
          onClick={() => sair()}
          className="rounded bg-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-300"
        >
          Sair
        </button>
      </header>
      <main className="mx-auto max-w-3xl p-6">{children}</main>
    </div>
  );
}

AdminLayout.propTypes = { children: PropTypes.node };
