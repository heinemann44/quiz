import PropTypes from 'prop-types';
import TextoRico from './TextoRico.jsx';

// Bloco de texto/destaque do conteúdo. Cores da config; texto rico via TextoRico.
// `className` extra ajusta layout pontual (ex.: enunciado centralizado).
// `children` (opcional) renderiza ANTES do texto — útil p/ um espaçador `float`
// que faz o texto contornar o personagem (P-11: layout fica na tela).
export default function CaixaConteudo({
  texto,
  estilo = {},
  className = '',
  children,
}) {
  return (
    <div
      className={`rounded-lg p-3 ${className}`}
      style={{ backgroundColor: estilo.corFundo, color: estilo.corTexto }}
    >
      {children}
      <TextoRico texto={texto} />
    </div>
  );
}

CaixaConteudo.propTypes = {
  texto: PropTypes.string,
  estilo: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
