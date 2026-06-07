import { useEffect, useState } from 'react';
import { useColegioRepo } from '../services/ColegioRepoContext.jsx';

/**
 * Carrega o colégio pelo repo injetado. Estados: carregando | pronto | erro.
 * `colegio` pode ser null em 'pronto' (escola inexistente — RF-15).
 * @param {string} escolaId
 * @returns {{ estado: 'carregando'|'pronto'|'erro', colegio?: import('../services/supabase.js').Colegio|null }}
 */
export function useColegio(escolaId) {
  const repo = useColegioRepo();
  // `paraId` amarra o resultado ao escolaId que o gerou. Trocar de escolaId volta
  // a "carregando" no render (sem setState no corpo do effect — react-hooks).
  const [resultado, setResultado] = useState({
    estado: 'carregando',
    paraId: escolaId,
  });

  useEffect(() => {
    let vivo = true;
    repo
      .getColegio(escolaId)
      .then(
        (colegio) =>
          vivo && setResultado({ estado: 'pronto', colegio, paraId: escolaId }),
      )
      .catch(() => vivo && setResultado({ estado: 'erro', paraId: escolaId }));
    return () => {
      vivo = false;
    };
  }, [escolaId, repo]);

  if (resultado.paraId !== escolaId) return { estado: 'carregando' };
  return resultado;
}
