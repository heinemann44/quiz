import PropTypes from 'prop-types';

// ÚNICO lugar que interpreta **negrito** e \n (DRY — AGENTS). Quebra em linhas
// por \n; dentro de cada linha, troca **x** por <strong>. `corDestaque` (opcional)
// pinta o negrito numa cor diferente do texto normal (P-11 — ex.: balão de fala).
function pedacos(linha, corDestaque) {
  return linha
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((parte, i) =>
      parte.startsWith('**') && parte.endsWith('**') ? (
        <strong key={i} style={corDestaque ? { color: corDestaque } : undefined}>
          {parte.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{parte}</span>
      ),
    );
}

export default function TextoRico({ texto, className, corDestaque }) {
  const linhas = String(texto ?? '').split('\n');
  return (
    <span className={className}>
      {linhas.map((linha, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {pedacos(linha, corDestaque)}
        </span>
      ))}
    </span>
  );
}

TextoRico.propTypes = {
  texto: PropTypes.string,
  className: PropTypes.string,
  corDestaque: PropTypes.string,
};
