import Sec01Conteudo from './Sec01Conteudo.jsx';
import Sec01Pergunta from './Sec01Pergunta.jsx';
import Sec02Conteudo from './Sec02Conteudo.jsx';
import Sec02Pergunta from './Sec02Pergunta.jsx';
import Sec03Conteudo from './Sec03Conteudo.jsx';
import Sec03Pergunta from './Sec03Pergunta.jsx';
import Sec03Trofeu from './Sec03Trofeu.jsx';
import Sec04Conteudo from './Sec04Conteudo.jsx';
import Sec04Pergunta from './Sec04Pergunta.jsx';
import Sec05Conteudo from './Sec05Conteudo.jsx';
import Sec05Pergunta from './Sec05Pergunta.jsx';
import Sec06Conteudo from './Sec06Conteudo.jsx';
import Sec06Pergunta from './Sec06Pergunta.jsx';
import MensagemFinal from './MensagemFinal.jsx';
import FigurinhaFinal from './FigurinhaFinal.jsx';

// Telas próprias do álbum eca-digital-3 — endereçadas pelo id do passo. Escopo
// POR ÁLBUM: estes ids só valem aqui (não colidem com os dos outros álbuns). Cada
// tela é dona do seu layout; mexer numa não afeta as outras. Construção tela a
// tela (Fase 7): vai crescendo conforme as seções entram.
export default {
  'sec01-conteudo': Sec01Conteudo,
  'sec01-pergunta': Sec01Pergunta,
  'sec02-conteudo': Sec02Conteudo,
  'sec02-pergunta': Sec02Pergunta,
  'sec03-conteudo': Sec03Conteudo,
  'sec03-pergunta': Sec03Pergunta,
  'sec03-trofeu': Sec03Trofeu,
  'sec04-conteudo': Sec04Conteudo,
  'sec04-pergunta': Sec04Pergunta,
  'sec05-conteudo': Sec05Conteudo,
  'sec05-pergunta': Sec05Pergunta,
  'sec06-conteudo': Sec06Conteudo,
  'sec06-pergunta': Sec06Pergunta,
  // troféu genérico do álbum (mesma tela dos demais; só muda valor/imagem no JSON).
  'sec06-trofeu': Sec03Trofeu,
  'mensagem-final': MensagemFinal,
  'figurinha-final': FigurinhaFinal,
};
