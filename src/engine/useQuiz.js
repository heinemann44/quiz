import { useReducer } from 'react';
import { criarEstadoInicial, reduzir, Acao } from './maquina.js';
import { TipoPasso } from './tipos.js';

/**
 * Motor do álbum: máquina de passos com estado só em memória (P-05/RF-12).
 * Config é somente-leitura; a navegação vive aqui. Os componentes de passo
 * (Fase 3) consomem `passo`/`subTela` e chamam as ações.
 * @param {object} config
 */
export function useQuiz(config) {
  const [estado, dispatch] = useReducer(
    (s, a) => reduzir(s, a, config),
    config,
    criarEstadoInicial,
  );
  const passo = config.passos[estado.indice];

  return {
    passo,
    subTela: estado.subTela,
    opcaoErrada: estado.opcaoErrada,
    figurinhas: estado.figurinhas,
    codigoSecreto: estado.codigo,
    acabou: passo.tipo === TipoPasso.ENCERRAMENTO,
    avancar: () => dispatch({ tipo: Acao.AVANCAR }),
    responder: (rotulo) => dispatch({ tipo: Acao.RESPONDER, rotulo }),
    voltarDoErro: () => dispatch({ tipo: Acao.VOLTAR_ERRO }),
  };
}
