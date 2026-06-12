import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminRepo } from '../../services/AdminRepoContext.jsx';

// Lista de colégios: ponto de entrada do CRUD. Criar leva à edição; cada linha
// abre a edição; remover pede confirmação (cascata apaga vínculos — migration).
export default function AdminEscolas() {
  const repo = useAdminRepo();
  const [escolas, setEscolas] = useState(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    setErro('');
    try {
      setEscolas(await repo.listarEscolas());
    } catch {
      setErro('Não foi possível carregar os colégios.');
    }
  }

  useEffect(() => {
    // fetch-on-mount: carregar() faz setState após await (assíncrono, seguro).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function remover(escola) {
    if (!confirm(`Remover "${escola.nome}"? Isso apaga também os álbuns liberados.`))
      return;
    try {
      await repo.removerEscola(escola.id);
      carregar();
    } catch {
      setErro('Não foi possível remover o colégio.');
    }
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Colégios</h1>
        <Link
          to="escolas/novo"
          className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          + Novo colégio
        </Link>
      </div>

      {erro && <p className="mb-3 text-sm text-red-600">{erro}</p>}
      {escolas === null && <p className="text-slate-500">Carregando…</p>}
      {escolas?.length === 0 && (
        <p className="text-slate-500">Nenhum colégio cadastrado ainda.</p>
      )}

      {escolas?.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {escolas.map((escola) => (
            <li
              key={escola.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <Link to={`escolas/${escola.id}`} className="min-w-0 flex-1">
                <span className="font-semibold">{escola.nome}</span>{' '}
                <span className="text-sm text-slate-400">/{escola.id}</span>
                {!escola.ativo && (
                  <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                    inativo
                  </span>
                )}
              </Link>
              <Link
                to={`escolas/${escola.id}`}
                className="rounded bg-slate-100 px-3 py-1.5 text-sm font-semibold hover:bg-slate-200"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => remover(escola)}
                className="rounded px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
