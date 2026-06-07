import { useState } from 'react';
import PropTypes from 'prop-types';

// Logo da consultoria é chrome do app (não conteúdo de álbum) — placeholder até
// o asset real entrar. Logo do colégio cai em placeholder neutro se falhar (RN-02).
function LogoEscola({ escola }) {
  const [falhou, setFalhou] = useState(false);
  if (falhou || !escola.logoUrl) {
    return (
      <span className="text-xs font-semibold text-slate-400">
        {escola.nome}
      </span>
    );
  }
  return (
    <img
      src={escola.logoUrl}
      alt={`Logo ${escola.nome}`}
      className="h-10 w-auto object-contain"
      onError={() => setFalhou(true)}
    />
  );
}

LogoEscola.propTypes = {
  escola: PropTypes.shape({ nome: PropTypes.string, logoUrl: PropTypes.string })
    .isRequired,
};

/**
 * Faixa superior: logo do colégio à esquerda, título ao centro, consultoria à
 * direita (RF-02).
 * @param {{ escola: import('../../services/supabase.js').Escola, titulo?: string }} props
 */
export default function HeaderEscola({ escola, titulo }) {
  return (
    <header className="flex items-center justify-between gap-2 border-b border-slate-200 p-3">
      <LogoEscola escola={escola} />
      {titulo && (
        <h1 className="text-sm font-semibold text-slate-700">{titulo}</h1>
      )}
      <span className="text-xs font-semibold text-slate-300">Consultoria</span>
    </header>
  );
}

HeaderEscola.propTypes = {
  escola: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
  }).isRequired,
  titulo: PropTypes.string,
};
