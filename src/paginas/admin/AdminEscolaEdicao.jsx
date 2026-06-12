import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdminRepo } from '../../services/AdminRepoContext.jsx';
import GerenciadorLogo from '../../components/admin/GerenciadorLogo.jsx';
import EditorVinculos from '../../components/admin/EditorVinculos.jsx';
import LinkAcesso from '../../components/admin/LinkAcesso.jsx';

// Edição de um colégio. Dois modos: criar (só id/nome/ativo → depois reabre em
// edição) e editar (nome/ativo + logo + álbuns + link). Separar os modos evita o
// problema de gerenciar logo/vínculos antes do colégio existir.
export default function AdminEscolaEdicao() {
  const { escolaId } = useParams();
  const navegar = useNavigate();
  const repo = useAdminRepo();
  const criando = !escolaId;

  const [escola, setEscola] = useState(
    criando ? { id: '', nome: '', ativo: true } : null,
  );
  const [vinculos, setVinculos] = useState([]);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    setErro('');
    try {
      const lista = await repo.listarEscolas();
      const atual = lista.find((e) => e.id === escolaId);
      if (!atual) return setErro('Colégio não encontrado.');
      setEscola(atual);
      setVinculos(await repo.listarVinculos(escolaId));
    } catch {
      setErro('Não foi possível carregar o colégio.');
    }
  }

  useEffect(() => {
    // fetch-on-mount: carregar() faz setState após await (assíncrono, seguro).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!criando) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escolaId]);

  async function criar(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErro('');
    try {
      await repo.criarEscola(escola);
      navegar(`/admin/escolas/${escola.id}`);
    } catch {
      setErro('Não foi possível criar (o id já existe ou é inválido?).');
      setSalvando(false);
    }
  }

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErro('');
    setAviso('');
    try {
      await repo.atualizarEscola(escola);
      await repo.salvarVinculos(escola.id, vinculos);
      setAviso('Alterações salvas.');
    } catch {
      setErro('Não foi possível salvar as alterações.');
    } finally {
      setSalvando(false);
    }
  }

  if (!escola) {
    return <p className="text-slate-500">{erro || 'Carregando…'}</p>;
  }

  return (
    <section>
      <Link to="/admin" className="text-sm text-slate-500 hover:underline">
        ← Colégios
      </Link>
      <h1 className="mt-1 mb-4 text-2xl font-bold">
        {criando ? 'Novo colégio' : escola.nome}
      </h1>

      <form
        onSubmit={criando ? criar : salvar}
        className="space-y-5 rounded-lg border border-slate-200 bg-white p-5"
      >
        <label className="block text-sm font-semibold text-slate-700">
          Identificador (slug na URL)
          <input
            value={escola.id}
            readOnly={!criando}
            onChange={(e) =>
              setEscola({ ...escola, id: normalizarSlug(e.target.value) })
            }
            placeholder="ex.: colegio-abc"
            required
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal read-only:bg-slate-100 read-only:text-slate-500"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Nome
          <input
            value={escola.nome}
            onChange={(e) => setEscola({ ...escola, nome: e.target.value })}
            required
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={escola.ativo}
            onChange={(e) => setEscola({ ...escola, ativo: e.target.checked })}
          />
          Ativo (desmarcar bloqueia todos os links do colégio)
        </label>

        {!criando && (
          <>
            <GerenciadorLogo escola={escola} aoMudar={carregar} />
            <EditorVinculos vinculos={vinculos} aoMudar={setVinculos} />
            <LinkAcesso escolaId={escola.id} />
          </>
        )}

        {erro && <p className="text-sm text-red-600">{erro}</p>}
        {aviso && <p className="text-sm text-green-700">{aviso}</p>}

        <button
          type="submit"
          disabled={salvando}
          className="rounded bg-slate-800 px-5 py-2 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {criando ? 'Criar colégio' : salvando ? 'Salvando…' : 'Salvar'}
        </button>
      </form>
    </section>
  );
}

// Slug previsível: minúsculas, espaços/inválidos viram hífen (id vai pra URL).
function normalizarSlug(texto) {
  return texto
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
