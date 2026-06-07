import PropTypes from 'prop-types';

// ÚNICO lugar que interpreta **negrito** e \n (DRY — AGENTS). Quebra em linhas
// por \n; dentro de cada linha, troca **x** por <strong>.
function pedacos(linha) {
  return linha
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((parte, i) =>
      parte.startsWith('**') && parte.endsWith('**') ? (
        <strong key={i}>{parte.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{parte}</span>
      ),
    );
}

export default function TextoRico({ texto, className }) {
  const linhas = String(texto ?? '').split('\n');
  return (
    <span className={className}>
      {linhas.map((linha, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {pedacos(linha)}
        </span>
      ))}
    </span>
  );
}

TextoRico.propTypes = { texto: PropTypes.string, className: PropTypes.string };
