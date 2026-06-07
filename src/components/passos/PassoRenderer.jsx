import PropTypes from 'prop-types';
import { TipoPasso } from '../../engine/tipos.js';
import { SubTela } from '../../engine/maquina.js';
import PassoCapa from './PassoCapa.jsx';
import PassoBoasVindas from './PassoBoasVindas.jsx';
import PassoConteudo from './PassoConteudo.jsx';
import PassoPergunta from './PassoPergunta.jsx';
import PassoTrofeu from './PassoTrofeu.jsx';
import PassoEncerramento from './PassoEncerramento.jsx';
import RevelacaoFigurinha from '../recompensa/RevelacaoFigurinha.jsx';
import FigurinhaCheia from '../recompensa/FigurinhaCheia.jsx';

// Despacho por tipo de passo (P-02). Reaproveitado pela AlbumPage na Fase 4.
const PORTIPO = {
  [TipoPasso.CAPA]: (q) => <PassoCapa passo={q.passo} onAvancar={q.avancar} />,
  [TipoPasso.BOAS_VINDAS]: (q) => (
    <PassoBoasVindas passo={q.passo} onAvancar={q.avancar} />
  ),
  [TipoPasso.CONTEUDO]: (q) => (
    <PassoConteudo passo={q.passo} onAvancar={q.avancar} />
  ),
  [TipoPasso.PERGUNTA]: (q) => (
    <PassoPergunta
      passo={q.passo}
      subTela={q.subTela}
      opcaoErrada={q.opcaoErrada}
      onResponder={q.responder}
      onVoltarErro={q.voltarDoErro}
    />
  ),
  [TipoPasso.TROFEU]: (q) => (
    <PassoTrofeu passo={q.passo} onAvancar={q.avancar} />
  ),
  [TipoPasso.ENCERRAMENTO]: (q) => (
    <PassoEncerramento
      passo={q.passo}
      codigoSecreto={q.codigoSecreto}
      figurinhas={q.figurinhas}
    />
  ),
};

/**
 * Ponte motor→UI. O sub-fluxo de recompensa (card→cheia) tem prioridade sobre o
 * tipo do passo, pois é derivado do campo `recompensa` (plan §4).
 * @param {{ quiz: ReturnType<import('../../engine/useQuiz.js').useQuiz> }} props
 */
export default function PassoRenderer({ quiz }) {
  if (quiz.subTela === SubTela.CARD || quiz.subTela === SubTela.CHEIA) {
    const figurinha = quiz.passo.recompensa.figurinha;
    const Tela =
      quiz.subTela === SubTela.CARD ? RevelacaoFigurinha : FigurinhaCheia;
    return (
      <Tela
        figurinha={figurinha}
        contador={quiz.figurinhas.length}
        onAvancar={quiz.avancar}
      />
    );
  }
  const render = PORTIPO[quiz.passo.tipo];
  return render ? render(quiz) : null;
}

PassoRenderer.propTypes = { quiz: PropTypes.object.isRequired };
