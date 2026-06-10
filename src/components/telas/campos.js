// Normalização de campos da config que aceitam string OU objeto (plan §5.3).
// Mantém os componentes de tela limpos e sem duplicar essa lógica (DRY).

/** Texto do botão: `botao.texto` > `textoBotao` (atalho) > padrão. */
export const textoDoBotao = (passo, padrao = 'Próxima página') =>
  passo?.botao?.texto ?? passo?.textoBotao ?? padrao;

/** Balão: string simples OU objeto { texto, estilo }. */
export const textoBalao = (balao) =>
  typeof balao === 'string' ? balao : balao?.texto;
export const estiloBalao = (balao) =>
  typeof balao === 'string' ? undefined : balao?.estilo;

/** Bloco de conteúdo: string simples OU objeto { texto, estilo }. */
export const textoBloco = (bloco) =>
  typeof bloco === 'string' ? bloco : bloco?.texto;
export const estiloBloco = (bloco) =>
  typeof bloco === 'string' ? undefined : bloco?.estilo;
