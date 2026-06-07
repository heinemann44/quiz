import PropTypes from 'prop-types';
import AvisoTela from '../components/ui/AvisoTela.jsx';

// Indisponibilidade genérica e discreta (RF-14 / RN-08): não expõe se a escola
// está inativa ou apenas sem álbuns liberados.
const MENSAGENS = {
  inativo: 'Este link está indisponível no momento. Fale com a sua escola.',
  indisponivel:
    'Nenhum álbum disponível por aqui ainda. Fale com a sua escola.',
};

export default function LinkInativo({ motivo = 'inativo' }) {
  return <AvisoTela titulo="Indisponível" mensagem={MENSAGENS[motivo]} />;
}

LinkInativo.propTypes = {
  motivo: PropTypes.oneOf(['inativo', 'indisponivel']),
};
