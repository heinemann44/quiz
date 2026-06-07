// Resolução de caminho de asset em UM lugar (DRY). Usado pelo preload e pelos
// componentes de passo (Fase 3). assetsBasePath + relativo; absoluto/http passa direto.

/**
 * @param {string} base  assetsBasePath da config (ex.: "/assets/eca-digital")
 * @param {string} caminho  relativo (ex.: "fundos/capa.png") ou absoluto
 * @returns {string}
 */
export function resolverAsset(base, caminho) {
  if (!caminho) return caminho;
  if (/^(https?:)?\/\//.test(caminho) || caminho.startsWith('/'))
    return caminho;
  return `${(base ?? '').replace(/\/$/, '')}/${caminho}`;
}

// Campos da config que carregam imagem. Cresce junto com o schema na Fase 4.
const imagensDoPasso = (passo) => [
  passo.imagemFundo,
  passo.personagem?.imagem,
  passo.imagemTrofeu,
  passo.recompensa?.figurinha?.imagemCard,
  passo.recompensa?.figurinha?.imagemCheia,
];

/**
 * Todos os caminhos de asset da config, resolvidos e sem repetição.
 * @param {object} config
 * @returns {string[]}
 */
export function coletarAssets(config) {
  const base = config?.assetsBasePath ?? '';
  const caminhos = new Set();
  for (const passo of config?.passos ?? []) {
    for (const img of imagensDoPasso(passo)) {
      if (img) caminhos.add(resolverAsset(base, img));
    }
  }
  return [...caminhos];
}

/**
 * Pré-carrega os assets (best-effort, RNF-03): falha de uma imagem não quebra o
 * álbum. Sem DOM (teste/SSR) é no-op. O disparo real se valida na Fase 4.
 * @param {object} config
 */
export function precarregar(config) {
  if (typeof Image === 'undefined') return;
  for (const url of coletarAssets(config)) {
    new Image().src = url;
  }
}
