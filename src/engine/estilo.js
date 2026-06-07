/**
 * Resolve a cascata de estilo — **só cor/tipografia**, nunca layout (P-11 / RF-16).
 * Camadas posteriores vencem; `undefined` não sobrescreve. Ordem: base do `tema`
 * → `passo.estilo` → `elemento.estilo` (plan §5.2).
 * @param {object} tema  base global (corFundo, corTexto, fonteCorpo…)
 * @param {...(object|undefined)} camadas  passo.estilo, elemento.estilo, …
 * @returns {object} estilo resolvido
 */
export function resolverEstilo(tema, ...camadas) {
  return [baseDoTema(tema), ...camadas].reduce(mesclar, {});
}

function mesclar(acc, camada) {
  if (!camada) return acc;
  for (const [chave, valor] of Object.entries(camada)) {
    if (valor !== undefined) acc[chave] = valor;
  }
  return acc;
}

// Defaults genéricos herdados do tema. Defaults específicos de um elemento
// (ex.: fundo do botão = corPrimaria) são passados pelo componente como camada.
function baseDoTema(tema = {}) {
  return {
    corFundo: tema.corFundo,
    corTexto: tema.corTexto,
    fonte: tema.fonteCorpo,
  };
}
