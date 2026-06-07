import { TipoPasso } from './tipos.js';

/** Sub-telas dentro de um passo (plan §4). */
export const SubTela = {
  PRINCIPAL: 'principal',
  ERRO: 'erro',
  CARD: 'recompensa-card',
  CHEIA: 'recompensa-cheia',
};

/** Ações da máquina. */
export const Acao = {
  AVANCAR: 'AVANCAR',
  RESPONDER: 'RESPONDER',
  VOLTAR_ERRO: 'VOLTAR_ERRO',
};

const passoEm = (config, indice) => config.passos[indice];
const temRecompensa = (passo) => Boolean(passo?.recompensa);

/**
 * Estado inicial em memória (P-05). Recarregar a página recria isto do zero (RF-12).
 * @param {object} config
 */
export function criarEstadoInicial(config) {
  const base = {
    indice: 0,
    subTela: SubTela.PRINCIPAL,
    opcaoErrada: null,
    figurinhas: [],
    codigo: [],
  };
  return registrarTrofeu(base, config);
}

/**
 * Transição pura da máquina de passos.
 * @param {object} estado @param {{tipo: string, rotulo?: string}} acao @param {object} config
 */
export function reduzir(estado, acao, config) {
  switch (acao.tipo) {
    case Acao.RESPONDER:
      return responder(estado, acao.rotulo, config);
    case Acao.VOLTAR_ERRO:
      return { ...estado, subTela: SubTela.PRINCIPAL, opcaoErrada: null };
    case Acao.AVANCAR:
      return avancar(estado, config);
    default:
      return estado;
  }
}

// Pergunta: acerto abre a recompensa; erro marca a opção (tentativas ilimitadas, RN-03).
function responder(estado, rotulo, config) {
  const passo = passoEm(config, estado.indice);
  if (
    passo?.tipo !== TipoPasso.PERGUNTA ||
    estado.subTela !== SubTela.PRINCIPAL
  )
    return estado;
  if (rotulo === passo.respostaCorreta) {
    return { ...estado, subTela: SubTela.CARD, opcaoErrada: null };
  }
  return { ...estado, subTela: SubTela.ERRO, opcaoErrada: rotulo };
}

// Botão primário ("Próxima"/"Abrir figurinha"/dentro da recompensa).
function avancar(estado, config) {
  if (estado.subTela === SubTela.CARD)
    return { ...estado, subTela: SubTela.CHEIA };
  if (estado.subTela === SubTela.CHEIA) return coletarEAvancar(estado, config);

  const passo = passoEm(config, estado.indice);
  if (passo?.tipo === TipoPasso.PERGUNTA) return estado; // avança via responder
  if (passo?.tipo === TipoPasso.ENCERRAMENTO) return estado; // terminal (RF-11)
  if (temRecompensa(passo)) return { ...estado, subTela: SubTela.CARD }; // conteúdo informativo (RF-07)
  return irProximo(estado, config);
}

// Fim da revelação: coleta a figurinha (RN-04) e segue.
function coletarEAvancar(estado, config) {
  const figurinha = passoEm(config, estado.indice).recompensa.figurinha;
  return irProximo(
    { ...estado, figurinhas: [...estado.figurinhas, figurinha] },
    config,
  );
}

function irProximo(estado, config) {
  const indice = Math.min(estado.indice + 1, config.passos.length - 1);
  const proximo = {
    ...estado,
    indice,
    subTela: SubTela.PRINCIPAL,
    opcaoErrada: null,
  };
  return registrarTrofeu(proximo, config);
}

// Ao entrar num troféu, registra seu valor no código secreto (RN-05/RN-06).
function registrarTrofeu(estado, config) {
  const passo = passoEm(config, estado.indice);
  if (passo?.tipo !== TipoPasso.TROFEU) return estado;
  return {
    ...estado,
    codigo: [...estado.codigo, { valor: passo.valor, tipo: passo.tipoValor }],
  };
}
