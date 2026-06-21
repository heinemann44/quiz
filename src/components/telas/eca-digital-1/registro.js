import Sec01Conteudo from './Sec01Conteudo.jsx';
import Sec01Pergunta from './Sec01Pergunta.jsx';
import Sec01Erro from './Sec01Erro.jsx';
import Sec02Conteudo from './Sec02Conteudo.jsx';
import Sec02Pergunta from './Sec02Pergunta.jsx';
import Sec02Erro from './Sec02Erro.jsx';
import Sec03Conteudo from './Sec03Conteudo.jsx';
import Sec03Pergunta from './Sec03Pergunta.jsx';
import Sec03Erro from './Sec03Erro.jsx';
import Sec03Trofeu from './Sec03Trofeu.jsx';
import Sec04Conteudo from './Sec04Conteudo.jsx';
import Sec04Pergunta from './Sec04Pergunta.jsx';
import Sec04Erro from './Sec04Erro.jsx';
import Sec04Informativo from './Sec04Informativo.jsx';
import Sec05Conteudo from './Sec05Conteudo.jsx';
import Sec05Pergunta from './Sec05Pergunta.jsx';
import Sec05Trofeu from './Sec05Trofeu.jsx';

// Telas próprias do álbum eca-digital-1 — endereçadas pelo id do passo (ou por
// `passo.tela`/`passo.telaErro`). Escopo POR ÁLBUM: estes ids (sec01-conteudo…)
// só valem dentro deste álbum, então os álbuns 2 e 3 podem reusar os mesmos ids
// sem colisão. Cada tela é dona do seu layout; mexer numa não afeta as outras.
export default {
  'sec01-conteudo': Sec01Conteudo,
  'sec01-pergunta': Sec01Pergunta,
  'sec01-pergunta-erro': Sec01Erro,
  'sec02-conteudo': Sec02Conteudo,
  'sec02-pergunta': Sec02Pergunta,
  'sec02-pergunta-erro': Sec02Erro,
  'sec03-conteudo': Sec03Conteudo,
  'sec03-pergunta': Sec03Pergunta,
  'sec03-pergunta-erro': Sec03Erro,
  'sec03-trofeu': Sec03Trofeu,
  'sec04-conteudo': Sec04Conteudo,
  'sec04-pergunta': Sec04Pergunta,
  'sec04-pergunta-erro': Sec04Erro,
  'sec04-informativo': Sec04Informativo,
  'sec05-conteudo': Sec05Conteudo,
  'sec05-pergunta': Sec05Pergunta,
  'sec05-trofeu': Sec05Trofeu,
};
