import AvisoTela from '../components/ui/AvisoTela.jsx';

// Álbum não liberado para o colégio (RF-01b). Não revela se o álbum existe.
export default function AlbumBloqueado() {
  return (
    <AvisoTela
      titulo="Álbum não disponível"
      mensagem="Este álbum ainda não está liberado para a sua escola."
    />
  );
}
