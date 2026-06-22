import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAlbum } from '../AlbumContext.jsx';

// Logo da consultoria é chrome do app (não conteúdo de álbum). Servida estática
// em public/marca/; cai num placeholder se o arquivo ainda não existir.
const LOGO_CONSULTORIA = '/marca/consultoria.png';

// Placeholder de logo (enquanto não há a marca real): caixa visível na cor
// primária com texto branco — mesmo padrão dos dois lados (cor da config, P-11).
function PlaceholderLogo({ texto, cor }) {
  return (
    <span
      className="shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold text-white"
      style={{ backgroundColor: cor }}
    >
      {texto}
    </span>
  );
}

PlaceholderLogo.propTypes = {
  texto: PropTypes.string,
  cor: PropTypes.string,
};

function LogoEscola({ escola, cor }) {
  const [falhou, setFalhou] = useState(false);
  if (falhou || !escola.logoUrl) {
    return <PlaceholderLogo texto={escola.nome} cor={cor} />;
  }
  return (
    <img
      src={escola.logoUrl}
      alt={`Logo ${escola.nome}`}
      className="h-7 w-auto shrink-0 object-contain"
      // decode síncrono: ao remontar o header (cada passo), pinta do cache no
      // mesmo frame em vez de "piscar" com o decode assíncrono padrão.
      decoding="sync"
      onError={() => setFalhou(true)}
    />
  );
}

LogoEscola.propTypes = {
  escola: PropTypes.shape({ nome: PropTypes.string, logoUrl: PropTypes.string })
    .isRequired,
  cor: PropTypes.string,
};

function LogoConsultoria({ cor }) {
  const [falhou, setFalhou] = useState(false);
  if (falhou) {
    return <PlaceholderLogo texto="Consultoria" cor={cor} />;
  }
  return (
    <img
      src={LOGO_CONSULTORIA}
      alt="Logo da consultoria"
      className="h-6 w-auto shrink-0 object-contain"
      onError={() => setFalhou(true)}
    />
  );
}

LogoConsultoria.propTypes = { cor: PropTypes.string };

/**
 * Faixa superior: logo do colégio à esquerda, título ao centro, consultoria à
 * direita (RF-02).
 * @param {{ escola: import('../../services/supabase.js').Escola, titulo?: string }} props
 */
export default function HeaderEscola({ escola, titulo }) {
  const { tema } = useAlbum();
  const cor = tema?.corPrimaria;
  return (
    <header className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
      <LogoEscola escola={escola} cor={cor} />
      {titulo && (
        <h1 className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-slate-700">
          {titulo}
        </h1>
      )}
      <LogoConsultoria cor={cor} />
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
