import PropTypes from 'prop-types';
import FigurinhaCheia from '../FigurinhaCheia.jsx';

// TELA PRÓPRIA do Álbum 3: revela uma figurinha em tamanho cheio como passo
// AVULSO (não é recompensa de pergunta). Reaproveita a FigurinhaCheia — só adapta
// o formato de props do renderer (passo/onAvancar) pro dela (figurinha/onAvancar).
// A figurinha vem da config (P-01). Isolada por álbum.
export default function FigurinhaFinal({ passo, onAvancar }) {
  return <FigurinhaCheia figurinha={passo.figurinha} onAvancar={onAvancar} />;
}

FigurinhaFinal.propTypes = {
  passo: PropTypes.object.isRequired,
  onAvancar: PropTypes.func,
};
