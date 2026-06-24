import Sec01Conteudo from './Sec01Conteudo.jsx';
import Sec01Pergunta from './Sec01Pergunta.jsx';

// Telas próprias do álbum eca-digital-3 — endereçadas pelo id do passo. Escopo
// POR ÁLBUM: estes ids só valem aqui (não colidem com os dos outros álbuns). Cada
// tela é dona do seu layout; mexer numa não afeta as outras. Construção tela a
// tela (Fase 7): vai crescendo conforme as seções entram.
export default {
  'sec01-conteudo': Sec01Conteudo,
  'sec01-pergunta': Sec01Pergunta,
};
