import { TipoPasso } from '../../engine/tipos.js';
import Capa from './Capa.jsx';
import BoasVindas from './BoasVindas.jsx';
import Conteudo from './Conteudo.jsx';
import Pergunta from './Pergunta.jsx';
import Erro from './Erro.jsx';
import Baloes from './Baloes.jsx';
import Trofeu from './Trofeu.jsx';
import Encerramento from './Encerramento.jsx';
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

// Registro das telas — a config seleciona a tela por NOME (variante nomeada,
// P-11), nunca por coordenada. O motor segue genérico: ele só resolve o nome e
// busca aqui. Duas faixas:
//
// 1) TELA_POR_TIPO — layout PADRÃO de cada tipo (fallback). É o que o preview de
//    dev e álbuns futuros usam sem precisar nomear tela a tela.
// 2) TELA_POR_ID — telas montadas UMA A UMA, endereçadas pelo id do passo (ou
//    pelo nome em `passo.tela`/`passo.telaErro`). Cada uma é dona do seu layout;
//    mexer numa NÃO afeta as outras. Adicionar uma tela própria = criar o
//    componente + uma linha aqui (zero acoplamento).

export const TELA_POR_TIPO = {
  [TipoPasso.CAPA]: Capa,
  [TipoPasso.BOAS_VINDAS]: BoasVindas,
  [TipoPasso.CONTEUDO]: Conteudo,
  [TipoPasso.PERGUNTA]: Pergunta,
  [TipoPasso.TROFEU]: Trofeu,
  [TipoPasso.ENCERRAMENTO]: Encerramento,
};

// Tela-base da sub-tela de erro (a pergunta não tem um "tipo" próprio de erro).
export const TELA_ERRO_PADRAO = Erro;

export const TELA_POR_ID = {
  // Variante nomeada reutilizável (pergunta Sim/Não).
  baloes: Baloes,
  // Telas próprias do Álbum 1 — seção 1.
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
};

/** Nome da tela principal de um passo: `passo.tela` (override) ou o id. */
export const nomeDaTela = (passo) => passo?.tela ?? passo?.id;

/** Nome da tela de erro: `passo.telaErro` (override) ou `${id}-erro`. */
export const nomeDaTelaErro = (passo) =>
  passo?.telaErro ?? `${passo?.id}-erro`;

/** Todos os nomes válidos no registro (telas próprias + variantes nomeadas). */
export const nomesDeTela = () => Object.keys(TELA_POR_ID);

/**
 * Guarda leve: todo passo precisa resolver para uma tela renderável e todo
 * override `tela`/`telaErro` precisa existir no registro. Mensagens com contexto
 * (valor recebido + opções), no padrão do `validarConfig` (AGENTS §Erros). Roda
 * na carga, junto da validação de conteúdo — fora do motor (que segue genérico).
 * @param {object} config
 * @returns {string[]} problemas (vazio = ok)
 */
export function validarTelas(config) {
  const nomes = nomesDeTela();
  const problemas = [];
  for (const passo of config?.passos ?? []) {
    const ref = `passo "${passo?.id}"`;
    if (passo?.tela && !TELA_POR_ID[passo.tela]) {
      problemas.push(`tela "${passo.tela}" do ${ref} não existe no registro [${nomes.join(',')}]`);
    } else if (!passo?.tela && !TELA_POR_ID[passo?.id] && !TELA_POR_TIPO[passo?.tipo]) {
      problemas.push(`${ref} (tipo "${passo?.tipo}") não tem tela própria nem layout padrão`);
    }
    if (passo?.telaErro && !TELA_POR_ID[passo.telaErro]) {
      problemas.push(`telaErro "${passo.telaErro}" do ${ref} não existe no registro [${nomes.join(',')}]`);
    }
  }
  return problemas;
}
