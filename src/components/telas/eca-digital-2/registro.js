import Sec01Conteudo from './Sec01Conteudo.jsx';
import Sec01Pergunta from './Sec01Pergunta.jsx';
import Sec02Conteudo from './Sec02Conteudo.jsx';
import Sec02Pergunta from './Sec02Pergunta.jsx';

// Telas próprias do álbum eca-digital-2 — endereçadas pelo id do passo. Escopo
// POR ÁLBUM: estes ids só valem aqui (não colidem com os do eca-digital-1). Cada
// tela é dona do seu layout; mexer numa não afeta as outras. Construção tela a
// tela (Fase 7): vai crescendo conforme as seções entram.
export default {
  'sec01-conteudo': Sec01Conteudo,
  'sec01-pergunta': Sec01Pergunta,
  'sec02-conteudo': Sec02Conteudo,
  'sec02-pergunta': Sec02Pergunta,
};
