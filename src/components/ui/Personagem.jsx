import PropTypes from 'prop-types';
import Figura from './Figura.jsx';

// Elemento PURO: só a imagem do personagem num tamanho. A POSIÇÃO na tela (lado,
// âncora, sobreposição) é responsabilidade da TELA que o compõe — nunca daqui.
// Antes este átomo carregava `posicao → self-*`, e isso vazava layout entre telas
// (o mesmo ajuste mexia em pergunta e erro). Agora cada tela posiciona o seu.
export default function Personagem({ src, alt = '', className = 'h-40 w-32' }) {
  return <Figura src={src} alt={alt} placeholder="🧑‍🚀" className={className} />;
}

Personagem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
