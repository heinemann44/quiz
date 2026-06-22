// Resolução de caminho de asset em UM lugar (DRY). Usado pelo preload e pelos
// componentes de passo (Fase 3). assetsBasePath + relativo; absoluto/http passa direto.

/**
 * @param {string} base  assetsBasePath da config (ex.: "/assets/eca-digital-1")
 * @param {string} caminho  relativo (ex.: "fundos/capa.png") ou absoluto
 * @returns {string}
 */
export function resolverAsset(base, caminho) {
  if (!caminho) return caminho;
  if (/^(https?:)?\/\//.test(caminho) || caminho.startsWith('/'))
    return caminho;
  return `${(base ?? '').replace(/\/$/, '')}/${caminho}`;
}

// Campos de imagem de um passo (Fase 5: fundo de seção, pose de erro do personagem).
const imagensDoPasso = (passo) => [
  passo.imagemFundo,
  passo.personagem?.imagem,
  passo.personagemErro?.imagem,
  passo.imagemTrofeu,
  passo.recompensa?.figurinha?.imagemCard,
  passo.recompensa?.figurinha?.imagemCheia,
];

// Imagens na raiz da config (não pertencem a um passo): fundo comemorativo e
// banner das telas de figurinha.
const imagensDaRaiz = (config) => [
  config?.fundoComemoracao,
  config?.headerFigurinha,
];

/**
 * Todos os caminhos de asset da config, resolvidos e sem repetição.
 * @param {object} config
 * @returns {string[]}
 */
export function coletarAssets(config) {
  const base = config?.assetsBasePath ?? '';
  const caminhos = new Set();
  const adicionar = (img) => img && caminhos.add(resolverAsset(base, img));
  imagensDaRaiz(config).forEach(adicionar);
  for (const passo of config?.passos ?? []) {
    imagensDoPasso(passo).forEach(adicionar);
  }
  return [...caminhos];
}

/**
 * Dispara o download (best-effort) de URLs JÁ resolvidas: o navegador as guarda
 * em cache e serve instantâneo nas telas seguintes — é o que evita o logo
 * "recarregar" a cada troca de passo (o header remonta, mas a imagem vem do
 * cache). Sem DOM (teste/SSR) é no-op. Ignora valores vazios.
 * @param {Array<string|undefined>} urls
 */
export function precarregarImagens(urls) {
  if (typeof Image === 'undefined') return;
  for (const url of urls) {
    if (url) new Image().src = url;
  }
}

/**
 * Pré-carrega os assets da config (best-effort, RNF-03): falha de uma imagem não
 * quebra o álbum. Sem DOM (teste/SSR) é no-op. O disparo real se valida na Fase 4.
 * @param {object} config
 */
export function precarregar(config) {
  precarregarImagens(coletarAssets(config));
}
