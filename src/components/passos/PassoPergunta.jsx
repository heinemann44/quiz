import PropTypes from 'prop-types';
import PerguntaLista from './PerguntaLista.jsx';
import PerguntaBaloes from './PerguntaBaloes.jsx';

// Pergunta (P-02). O layout é escolhido por variante nomeada (P-11): "lista"
// (padrão, opções A/B/C) ou "baloes" (Sim/Não, doc/tema-5/pergunta-5).
export default function PassoPergunta(props) {
  if (props.passo.variante === 'baloes') {
    return (
      <PerguntaBaloes passo={props.passo} onResponder={props.onResponder} />
    );
  }
  return <PerguntaLista {...props} />;
}

PassoPergunta.propTypes = {
  passo: PropTypes.object.isRequired,
  subTela: PropTypes.string,
  opcaoErrada: PropTypes.string,
  onResponder: PropTypes.func,
  onVoltarErro: PropTypes.func,
};
