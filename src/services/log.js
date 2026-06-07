// Logging estruturado (JSON) para dev/observabilidade — o agente parseia e filtra
// (AGENTS §Logging). O que o ALUNO vê é texto amigável, nunca isto.

/**
 * @param {'erro'|'aviso'} nivel
 * @param {string} evento  identificador curto e grepável (ex.: 'config-invalida')
 * @param {object} dados   campos de contexto
 */
export function logEstruturado(nivel, evento, dados = {}) {
  const linha = JSON.stringify({
    ts: new Date().toISOString(),
    nivel,
    evento,
    ...dados,
  });
  if (nivel === 'erro') console.error(linha);
  else console.warn(linha);
}
