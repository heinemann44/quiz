import { TipoPasso } from '../../engine/tipos.js';
import Capa from './Capa.jsx';
import BoasVindas from './BoasVindas.jsx';
import Conteudo from './Conteudo.jsx';
import Pergunta from './Pergunta.jsx';
import Erro from './Erro.jsx';
import Baloes from './Baloes.jsx';
import Trofeu from './Trofeu.jsx';
import Encerramento from './Encerramento.jsx';
import ecaDigital1 from './eca-digital-1/registro.js';
import ecaDigital2 from './eca-digital-2/registro.js';

// Registro das telas — a config seleciona a tela por NOME (variante nomeada,
// P-11), nunca por coordenada. O motor segue genérico: ele só resolve o nome e
// busca aqui. Três faixas:
//
// 1) TELA_POR_TIPO — layout PADRÃO de cada tipo (fallback). É o que o preview de
//    dev e álbuns sem tela própria usam, sem nomear tela a tela.
// 2) TELA_COMPARTILHADA — variantes nomeadas reutilizáveis por QUALQUER álbum
//    (ex.: pergunta Sim/Não `baloes`).
// 3) TELA_POR_ALBUM — telas montadas UMA A UMA, escopadas por álbum. O id
//    ("sec01-conteudo") só vale dentro do seu álbum, então álbuns diferentes
//    reusam os mesmos ids sem colisão. Cada tela é dona do seu layout; mexer numa
//    NÃO afeta as outras. Álbum novo = nova pasta `telas/<albumId>/` + registro +
//    uma linha aqui (zero acoplamento, zero código de motor).

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

// Variante nomeada reutilizável por qualquer álbum (pergunta Sim/Não). Exportado
// como OBJETO (não função) para o Renderer resolver a tela por ACESSO A MEMBRO —
// chamar função no render dispara react-hooks/static-components.
export const TELA_COMPARTILHADA = {
  baloes: Baloes,
};

// Telas próprias por álbum. Adicionar álbum 2/3 = importar o registro da pasta e
// somar uma linha aqui (ex.: 'eca-digital-2': ecaDigital2).
export const TELA_POR_ALBUM = {
  'eca-digital-1': ecaDigital1,
  'eca-digital-2': ecaDigital2,
};

const registroDoAlbum = (albumId) => TELA_POR_ALBUM[albumId] ?? {};

/**
 * Resolve a tela própria/variante de um passo dentro de um álbum: primeiro a tela
 * própria do álbum, depois a variante compartilhada. `undefined` se não houver.
 * Uso fora do render (validação) — o Renderer resolve por acesso a membro.
 * @param {string} albumId
 * @param {string} nome  id do passo ou `passo.tela`/`passo.telaErro`
 */
export const telaPorId = (albumId, nome) =>
  registroDoAlbum(albumId)[nome] ?? TELA_COMPARTILHADA[nome];

/** Nome da tela principal de um passo: `passo.tela` (override) ou o id. */
export const nomeDaTela = (passo) => passo?.tela ?? passo?.id;

/** Nome da tela de erro: `passo.telaErro` (override) ou `${id}-erro`. */
export const nomeDaTelaErro = (passo) => passo?.telaErro ?? `${passo?.id}-erro`;

/** Nomes válidos para um álbum (telas próprias + variantes compartilhadas). */
const nomesDeTela = (albumId) => [
  ...Object.keys(registroDoAlbum(albumId)),
  ...Object.keys(TELA_COMPARTILHADA),
];

/**
 * Guarda leve: todo passo precisa resolver para uma tela renderável e todo
 * override `tela`/`telaErro` precisa existir no registro DO ÁLBUM (ou nas
 * compartilhadas). Mensagens com contexto (valor recebido + opções), no padrão do
 * `validarConfig` (AGENTS §Erros). Roda na carga, junto da validação de conteúdo
 * — fora do motor (que segue genérico).
 * @param {object} config
 * @returns {string[]} problemas (vazio = ok)
 */
export function validarTelas(config) {
  const albumId = config?.albumId;
  const nomes = nomesDeTela(albumId);
  const existe = (nome) => telaPorId(albumId, nome) != null;
  const problemas = [];
  for (const passo of config?.passos ?? []) {
    const ref = `passo "${passo?.id}"`;
    if (passo?.tela && !existe(passo.tela)) {
      problemas.push(
        `tela "${passo.tela}" do ${ref} não existe no álbum "${albumId}" [${nomes.join(',')}]`,
      );
    } else if (!passo?.tela && !existe(passo?.id) && !TELA_POR_TIPO[passo?.tipo]) {
      problemas.push(`${ref} (tipo "${passo?.tipo}") não tem tela própria nem layout padrão`);
    }
    if (passo?.telaErro && !existe(passo.telaErro)) {
      problemas.push(
        `telaErro "${passo.telaErro}" do ${ref} não existe no álbum "${albumId}" [${nomes.join(',')}]`,
      );
    }
  }
  return problemas;
}
