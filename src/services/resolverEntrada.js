/**
 * @typedef {import('./supabase.js').Colegio} Colegio
 * @typedef {{ desfecho: string, albumId?: string }} Entrada
 */

/** Desfechos possíveis da rota /quiz/:escolaId (RF-01/01a/14/15). */
export const Desfecho = {
  INEXISTENTE: 'inexistente',
  INATIVO: 'inativo',
  INDISPONIVEL: 'indisponivel',
  DIRETO: 'direto',
  SELETOR: 'seletor',
};

/**
 * Decide o que mostrar na entrada a partir do colégio carregado. Lógica pura.
 * @param {Colegio|null} colegio
 * @returns {Entrada}
 */
export function resolverEntrada(colegio) {
  if (!colegio) return { desfecho: Desfecho.INEXISTENTE };
  if (!colegio.escola.ativo) return { desfecho: Desfecho.INATIVO };

  const liberados = colegio.albuns.filter((a) => a.liberado);
  if (liberados.length === 0) return { desfecho: Desfecho.INDISPONIVEL };
  if (liberados.length === 1) {
    return { desfecho: Desfecho.DIRETO, albumId: liberados[0].albumId };
  }
  return { desfecho: Desfecho.SELETOR };
}
