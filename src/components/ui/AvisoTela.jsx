import PropTypes from 'prop-types';

/**
 * Tela de aviso amigável ao aluno (sem detalhe técnico — RF-14/15).
 * Base reutilizada por NaoEncontrado, LinkInativo e AlbumBloqueado.
 * @param {{ titulo: string, mensagem: string, children?: import('react').ReactNode }} props
 */
export default function AvisoTela({ titulo, mensagem, children }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-xl font-bold text-slate-800">{titulo}</h1>
      <p className="text-slate-600">{mensagem}</p>
      {children}
    </main>
  );
}

AvisoTela.propTypes = {
  titulo: PropTypes.string.isRequired,
  mensagem: PropTypes.string.isRequired,
  children: PropTypes.node,
};
