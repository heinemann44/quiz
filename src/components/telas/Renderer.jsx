import PropTypes from 'prop-types';
import { SubTela } from '../../engine/maquina.js';
import {
  TELA_POR_TIPO,
  TELA_POR_ID,
  TELA_ERRO_PADRAO,
  nomeDaTela,
  nomeDaTelaErro,
} from './registro.js';
import Figurinha from './Figurinha.jsx';
import FigurinhaCheia from './FigurinhaCheia.jsx';

/**
 * Ponte motor→UI. O motor continua genérico: ele entrega `passo`/`subTela` e este
 * renderer seleciona a TELA nomeada. O sub-fluxo de recompensa (card→cheia) tem
 * prioridade sobre o tipo, pois é derivado do campo `recompensa` (plan §4).
 * @param {{ quiz: ReturnType<import('../../engine/useQuiz.js').useQuiz> }} props
 */
export default function Renderer({ quiz }) {
  const { passo, subTela } = quiz;

  if (subTela === SubTela.CARD || subTela === SubTela.CHEIA) {
    const Tela = subTela === SubTela.CARD ? Figurinha : FigurinhaCheia;
    return (
      <Tela
        figurinha={passo.recompensa.figurinha}
        contador={quiz.figurinhas.length}
        onAvancar={quiz.avancar}
      />
    );
  }

  if (subTela === SubTela.ERRO) {
    // Tela de erro própria (por id/nome) ou a base de erro. Lookup no registro
    // (acesso a membro) — referência estável, sem criar componente no render.
    const TelaErro = TELA_POR_ID[nomeDaTelaErro(passo)] ?? TELA_ERRO_PADRAO;
    return (
      <TelaErro
        passo={passo}
        opcaoErrada={quiz.opcaoErrada}
        onVoltarErro={quiz.voltarDoErro}
      />
    );
  }

  // Tela própria (por id/nome) tem prioridade; sem ela, cai no layout padrão do
  // tipo (P-11: "sem variante → layout padrão").
  const Tela = TELA_POR_ID[nomeDaTela(passo)] ?? TELA_POR_TIPO[passo.tipo];
  // Props uniformes: cada tela usa só o que precisa (avançar, responder ou o
  // resumo do encerramento). Mantém o renderer genérico, sem um wiring por tipo.
  return Tela ? (
    <Tela
      passo={passo}
      onAvancar={quiz.avancar}
      onResponder={quiz.responder}
      codigoSecreto={quiz.codigoSecreto}
      figurinhas={quiz.figurinhas}
    />
  ) : null;
}

Renderer.propTypes = { quiz: PropTypes.object.isRequired };
