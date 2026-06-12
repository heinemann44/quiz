import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAdminRepo } from '../../services/AdminRepoContext.jsx';

// Gerencia a logo do colégio (CRUD da logo): a PRÓPRIA imagem (ou o placeholder)
// é o botão que abre o seletor de arquivo — o input nativo fica escondido, que o
// "Procurar…" do browser quebrava o layout. Hover mostra "Trocar/Enviar".
export default function GerenciadorLogo({ escola, aoMudar }) {
  const repo = useAdminRepo();
  const inputRef = useRef(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');

  async function enviar(evento) {
    const file = evento.target.files?.[0];
    if (!file) return;
    setOcupado(true);
    setErro('');
    try {
      await repo.enviarLogo(escola.id, file, escola.logoArquivo);
      await aoMudar();
    } catch {
      setErro('Falha ao enviar a logo.');
    } finally {
      setOcupado(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function remover() {
    setOcupado(true);
    setErro('');
    try {
      await repo.removerLogo(escola.id, escola.logoArquivo);
      await aoMudar();
    } catch {
      setErro('Falha ao remover a logo.');
    } finally {
      setOcupado(false);
    }
  }

  const temLogo = Boolean(escola.logoArquivo);
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">Logo</label>
      <div className="mt-1 flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={ocupado}
          title={temLogo ? 'Trocar logo' : 'Enviar logo'}
          className={`group relative grid h-16 w-32 place-items-center overflow-hidden rounded bg-slate-50 hover:bg-slate-100 disabled:opacity-50 ${
            temLogo
              ? 'border border-slate-200'
              : 'border border-dashed border-slate-300'
          }`}
        >
          {escola.logoUrl ? (
            <img
              src={escola.logoUrl}
              alt={`Logo ${escola.nome}`}
              className="max-h-14 max-w-28 object-contain"
            />
          ) : (
            <span className="text-xs text-slate-400">enviar logo</span>
          )}
          {/* Overlay no hover: deixa claro que a imagem é clicável. */}
          <span className="absolute inset-0 hidden place-items-center bg-slate-900/50 text-xs font-semibold text-white group-hover:grid">
            {ocupado ? 'Enviando…' : temLogo ? 'Trocar' : 'Enviar'}
          </span>
        </button>
        {temLogo && (
          <button
            type="button"
            onClick={remover}
            disabled={ocupado}
            className="rounded px-2 py-1 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Remover logo
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={enviar}
        className="hidden"
      />
      <p className="mt-1 text-xs text-slate-400">
        PNG transparente, ~96px de altura. Clique na imagem para{' '}
        {temLogo ? 'trocar' : 'enviar'}.
      </p>
      {erro && <p className="mt-1 text-sm text-red-600">{erro}</p>}
    </div>
  );
}

GerenciadorLogo.propTypes = {
  escola: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string,
    logoUrl: PropTypes.string,
    logoArquivo: PropTypes.string,
  }).isRequired,
  aoMudar: PropTypes.func.isRequired,
};
