// Link de acesso do colégio (mostrado/copiado no backoffice). É a rota de entrada
// do aluno (plan §2): /quiz/:escolaId — a entrada resolve direto/seletor sozinha.
// Helper puro e único (DRY): a montagem do link mora só aqui.

/**
 * Monta o link de acesso (absoluto) para um colégio.
 * @param {string} escolaId slug do colégio
 * @param {string} [origem] origem (protocolo+host); default = window.location.origin
 * @returns {string} ex.: "https://app.vercel.app/quiz/colegio-demo"
 */
export function linkDeAcesso(escolaId, origem = origemPadrao()) {
  return `${origem}/quiz/${escolaId}`;
}

function origemPadrao() {
  return typeof window === 'undefined' ? '' : window.location.origin;
}
