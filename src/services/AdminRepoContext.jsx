import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { adminRepo } from './adminRepo.js';

// Injeção de dependência do repositório de escrita do backoffice (AGENTS
// §Dependências). Padrão = repo real (Supabase); testes injetam um fake via Provider.
const AdminRepoContext = createContext(adminRepo);

export function AdminRepoProvider({ repo, children }) {
  return (
    <AdminRepoContext.Provider value={repo}>
      {children}
    </AdminRepoContext.Provider>
  );
}

AdminRepoProvider.propTypes = {
  repo: PropTypes.object.isRequired,
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminRepo = () => useContext(AdminRepoContext);
