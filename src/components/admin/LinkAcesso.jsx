import { useState } from 'react';
import PropTypes from 'prop-types';
import { linkDeAcesso } from '../../services/links.js';

// Link de acesso do colégio (rota de entrada do aluno) + botão copiar.
export default function LinkAcesso({ escolaId }) {
  const [copiado, setCopiado] = useState(false);
  const link = linkDeAcesso(escolaId);

  async function copiar() {
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">
        Link de acesso
      </label>
      <div className="mt-1 flex gap-2">
        <input
          readOnly
          value={link}
          className="flex-1 rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600"
        />
        <button
          type="button"
          onClick={copiar}
          className="rounded bg-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-300"
        >
          {copiado ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
    </div>
  );
}

LinkAcesso.propTypes = { escolaId: PropTypes.string.isRequired };
