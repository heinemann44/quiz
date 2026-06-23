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
import Sec06Erro from './Sec06Erro.jsx';
import Sec07Conteudo from './Sec07Conteudo.jsx';
import Sec07Pergunta from './Sec07Pergunta.jsx';
import Sec08Conteudo from './Sec08Conteudo.jsx';
import Sec08Pergunta from './Sec08Pergunta.jsx';

// Telas próprias do álbum eca-digital-2 — endereçadas pelo id do passo. Escopo
// POR ÁLBUM: estes ids só valem aqui (não colidem com os do eca-digital-1). Cada
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
  'sec06-pergunta-erro': Sec06Erro,
  // 2º troféu do álbum ("Y"): layout idêntico ao 1º e todo config-driven, então
  // REUSA a mesma tela (AGENTS: "layout que repete = entrada no JSON").
  'sec06-trofeu': Sec03Trofeu,
  'sec07-conteudo': Sec07Conteudo,
  'sec07-pergunta': Sec07Pergunta,
  'sec08-conteudo': Sec08Conteudo,
  'sec08-pergunta': Sec08Pergunta,
};
