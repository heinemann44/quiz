import PropTypes from 'prop-types';

// Rodapé padrão do botão de ação: empurra pro fim da coluna (mt-auto), alinha à
// direita e dá 16px de respiro nas bordas (p-4). É o posicionamento único do
// BotaoAcao em todas as telas que o usam — layout no JSX, num lugar só (DRY/P-11).
export default function RodapeAcao({ children }) {
  return <div className="mt-auto flex justify-end p-4">{children}</div>;
}

RodapeAcao.propTypes = { children: PropTypes.node };
