import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { colegioRepo } from './supabase.js';

// Injeção de dependência do repositório (AGENTS §Dependências). O padrão é o
// repo real (Supabase); testes injetam um FakeColegioRepo via Provider.
const ColegioRepoContext = createContext(colegioRepo);

export function ColegioRepoProvider({ repo, children }) {
  return (
    <ColegioRepoContext.Provider value={repo}>
      {children}
    </ColegioRepoContext.Provider>
  );
}

ColegioRepoProvider.propTypes = {
  repo: PropTypes.shape({ getColegio: PropTypes.func.isRequired }).isRequired,
  children: PropTypes.node,
};

// Hook fica junto do Provider de propósito (mesma unidade de DI); o aviso de
// fast-refresh não se aplica a um arquivo de contexto.
// eslint-disable-next-line react-refresh/only-export-components
export const useColegioRepo = () => useContext(ColegioRepoContext);
