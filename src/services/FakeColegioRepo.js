/**
 * Test double do colegioRepo (AGENTS §Testes). Injete via ColegioRepoProvider.
 * Mapa de escolaId → Colegio|null. Id ausente devolve null (inexistente).
 * @typedef {import('./supabase.js').Colegio} Colegio
 */
export class FakeColegioRepo {
  /** @param {Record<string, Colegio|null>} porId */
  constructor(porId = {}) {
    this.porId = porId;
  }

  /** @param {string} escolaId @returns {Promise<Colegio|null>} */
  async getColegio(escolaId) {
    return escolaId in this.porId ? this.porId[escolaId] : null;
  }
}
