import AvisoTela from '../components/ui/AvisoTela.jsx';

// Rota coringa (*) e escola inexistente (RF-15). Sem detalhe técnico.
export default function NaoEncontrado() {
  return (
    <AvisoTela
      titulo="Página não encontrada"
      mensagem="Confira o link enviado pela sua escola."
    />
  );
}
