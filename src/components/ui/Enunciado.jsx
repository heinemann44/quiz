import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Elemento PURO: a barra do enunciado da pergunta (texto centralizado em negrito
// sobre uma faixa colorida). Cores vêm por prop (cascata do tema, P-11); `className`
// extra deixa a TELA ajustar só o posicionamento (ex.: `-mt-2` pra encostar no topo).
export default function Enunciado({ texto, estilo = {}, className = '' }) {
  return (
    <div
      className={`rounded-lg p-3 text-center font-semibold ${className}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      <TextoRico texto={texto} />
    </div>
  );
}

Enunciado.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  className: PropTypes.string,
};
