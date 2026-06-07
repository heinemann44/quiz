import { useState } from 'react';
import PropTypes from 'prop-types';

// Logo da consultoria é chrome do app (não conteúdo de álbum). Servida estática
// em public/marca/; cai em texto se o arquivo ainda não existir.
const LOGO_CONSULTORIA = '/marca/consultoria.png';

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

function LogoConsultoria() {
  const [falhou, setFalhou] = useState(false);
  if (falhou) {
    return (
      <span className="text-xs font-semibold text-slate-300">Consultoria</span>
    );
  }
  return (
    <img
      src={LOGO_CONSULTORIA}
      alt="Logo da consultoria"
      className="h-8 w-auto object-contain"
      onError={() => setFalhou(true)}
    />
  );
}

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
      <LogoConsultoria />
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
