/** Tipos de passo conhecidos pelo motor (P-02). Conjunto pequeno e fechado. */
export const TipoPasso = {
  CAPA: 'capa',
  BOAS_VINDAS: 'boas-vindas',
  CONTEUDO: 'conteudo',
  PERGUNTA: 'pergunta',
  TROFEU: 'trofeu',
  ENCERRAMENTO: 'encerramento',
};

const TIPOS_CONHECIDOS = new Set(Object.values(TipoPasso));

/**
 * Validação leve da config na carga (RF-03/04; plan §9). Retorna lista de
 * problemas com contexto — vazia = ok. O schema completo por tipo firma na
 * Fase 4; aqui só o essencial para o motor não quebrar.
 * @param {object} config
 * @returns {string[]}
 */
export function validarConfig(config) {
  if (!config || !Array.isArray(config.passos) || config.passos.length === 0) {
    return ['config sem "passos" (esperado: array não vazio)'];
  }
  const problemas = [];
  const idsVistos = new Set();
  config.passos.forEach((passo, i) => {
    const ref = passo?.id ? `passo "${passo.id}"` : `passo #${i}`;
    validarIdentidade(passo, ref, idsVistos, problemas);
    if (passo?.tipo === TipoPasso.PERGUNTA)
      validarPergunta(passo, ref, problemas);
    if (passo?.recompensa) validarRecompensa(passo, ref, problemas);
    if (passo?.tipo === TipoPasso.TROFEU && passo.valor == null) {
      problemas.push(`troféu sem "valor" no ${ref}`);
    }
  });
  return problemas;
}

function validarIdentidade(passo, ref, idsVistos, problemas) {
  if (!passo?.id) problemas.push(`${ref} sem "id"`);
  else if (idsVistos.has(passo.id))
    problemas.push(`id duplicado "${passo.id}"`);
  else idsVistos.add(passo.id);

  if (!TIPOS_CONHECIDOS.has(passo?.tipo)) {
    problemas.push(`tipo desconhecido "${passo?.tipo}" no ${ref}`);
  }
}

function validarPergunta(passo, ref, problemas) {
  const opcoes = passo.opcoes;
  if (!Array.isArray(opcoes) || opcoes.length < 2 || opcoes.length > 3) {
    problemas.push(`${ref}: pergunta precisa de 2 a 3 opções (RF-04)`);
    return;
  }
  const rotulos = opcoes.map((o) => o?.rotulo);
  if (!rotulos.includes(passo.respostaCorreta)) {
    problemas.push(
      `respostaCorreta "${passo.respostaCorreta}" não existe em opções [${rotulos.join(',')}] no ${ref}`,
    );
  }
}

function validarRecompensa(passo, ref, problemas) {
  if (passo.recompensa?.figurinha?.numero == null) {
    problemas.push(`${ref}: recompensa sem "figurinha.numero"`);
  }
}
