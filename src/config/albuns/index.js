import ecaDigital from './eca-digital.json';

// Registro de álbuns: albumId → config (SSOT do álbum, P-01). Novo álbum = novo
// JSON + uma linha aqui (Fase 7, zero código de motor).
const ALBUNS = {
  'eca-digital': ecaDigital,
};

/**
 * Carrega a config de um álbum pelo id.
 * @param {string} albumId
 * @returns {object|null} null se não há config para esse id (RF-01b).
 */
export function carregarAlbum(albumId) {
  return ALBUNS[albumId] ?? null;
}
