# Plano Técnico — Álbum de Figurinhas Interativo

**Versão:** 2.0
**Data:** 2026-06-06
**Depende de:** [constitution.md](./constitution.md) · [spec.md](./spec.md)

---

## 1. Stack

| Camada | Tecnologia | Plano |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS | — |
| Roteamento | react-router-dom | — |
| Config das escolas | Supabase (Postgres) via `@supabase/supabase-js` | Free (500MB) |
| Logos das escolas | Cloudinary | Free (25GB) |
| Assets dos álbuns | `public/assets/<albumId>/` (servidos pela Vercel/CDN) | — |
| Hospedagem | Vercel (deploy via GitHub) | Hobby |

Trocar qualquer item desta tabela é emenda à constituição (P-10).

---

## 2. Arquitetura e rotas

```
Aluno → /quiz/:escolaId
   → busca colégio (escolas) + álbuns liberados (escola_albuns where liberado=true)
   → 0 liberados → tela Indisponível
   → 1 liberado  → entra direto no álbum
   → 2+ liberados → SeletorAlbuns (lista liberados; bloqueados = 🔒)
            ↓ escolhe álbum
Aluno → /quiz/:escolaId/:albumId   (também é deep link)
   → valida que o álbum está liberado p/ o colégio (senão: Bloqueado)
   → carrega config/albuns/<albumId>.json
   → pré-carrega assets do álbum
   → motor renderiza passos[0..n] em ordem (estado só em memória)
```

Rotas:
```
/quiz/:escolaId            → QuizEntradaPage  (resolve: direto | seletor | indisponível)
/quiz/:escolaId/:albumId   → AlbumPage        (motor do álbum; valida liberação)
/                          → landing simples do produto (opcional)
*                          → NaoEncontrado
```

Estados de carregamento: `carregando` → (`colégio inativo/inexistente` | `nenhum álbum liberado` | `álbum bloqueado` | `seletor` | `álbum pronto`).

> **Regra do link (RF-01):** o `escolaId` é sempre o mesmo por colégio. Quando há mais de um álbum, o aluno escolhe no seletor (ou recebe o deep link `/quiz/:escolaId/:albumId` direto para um álbum específico). Liberar o Álbum 3 depois é só inserir a linha em `escola_albuns` — o link do colégio não muda.

Gestão (nós): direto no **Supabase Studio** — sem painel no produto (P-06).

---

## 3. Modelo de dados (Supabase)

Duas tabelas: `escolas` (1 linha por colégio) e `escola_albuns` (1 linha por álbum liberado para o colégio). Relação 1→N permite o cenário "pagou pelo Álbum 1 e 2, o 3 fica bloqueado".

### Tabela `escolas`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | text (PK) | Slug da escola, usado na URL (ex.: `colegio-abc`) |
| `nome` | text | Nome de exibição |
| `logo_url` | text | URL da logo no Cloudinary |
| `ativo` | boolean | `false` desativa **todos** os links do colégio sem excluir |
| `criado_em` | timestamptz | Default `now()` |

### Tabela `escola_albuns`

| Campo | Tipo | Descrição |
|---|---|---|
| `escola_id` | text (FK→escolas.id) | Colégio |
| `album_id` | text | Id do álbum/config (ex.: `eca-digital`) = nome do JSON |
| `liberado` | boolean | `true` = pago/liberado; `false` = bloqueado (aparece com 🔒) |
| `ordem` | int | Ordem de exibição no seletor (opcional) |
| `criado_em` | timestamptz | Default `now()` |
| — | PK | composta (`escola_id`, `album_id`) |

- **RLS:** habilitado nas duas. Policy de **SELECT público** apenas; sem insert/update/delete pela anon key (escrita só por nós no Studio).
- Nenhuma tabela de aluno/respostas/progresso (P-04).

```sql
create table escolas (
  id text primary key,
  nome text not null,
  logo_url text not null,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table escola_albuns (
  escola_id text not null references escolas(id) on delete cascade,
  album_id  text not null,
  liberado  boolean not null default true,
  ordem     int not null default 0,
  criado_em timestamptz not null default now(),
  primary key (escola_id, album_id)
);

alter table escolas enable row level security;
alter table escola_albuns enable row level security;
create policy "leitura publica escolas" on escolas for select using (true);
create policy "leitura publica escola_albuns" on escola_albuns for select using (true);
```

> Para liberar o Álbum 3 do `colegio-abc` depois: `insert into escola_albuns values ('colegio-abc','tema-3',true,3,now());` — ou flipar `liberado` de `false` para `true`. Sem deploy, sem mudar o link.

---

## 4. O motor (engine)

### Conceito
O motor é uma **máquina de passos**: lê `config.passos` (array ordenado) e renderiza o passo atual conforme seu `tipo`. Toda a navegação avança o índice; alguns tipos têm **sub-telas internas**.

### Estado (apenas em memória — P-05)
```
indiceAtual: number              // passo atual
subTela: 'principal' | 'erro' | 'recompensa-card' | 'recompensa-cheia'
opcaoEscolhidaErrada: string|null // para desenhar o X na opção
figurinhasColetadas: Figurinha[]  // alimenta o contador e o encerramento
codigoSecreto: { valor, tipo }[]  // alimenta troféus e o encerramento
```

### Transições por tipo
- **`capa`, `boas-vindas`, `conteudo` (sem recompensa):** botão → `indiceAtual++`.
- **`pergunta`:**
  - opção correta → `subTela='recompensa-card'` → (botão) `recompensa-cheia` → (botão) coleta figurinha em `figurinhasColetadas`, `indiceAtual++`, `subTela='principal'`.
  - opção errada → guarda `opcaoEscolhidaErrada`, `subTela='erro'` → botão "Volte" → `subTela='principal'` (sem penalidade).
- **`conteudo` com `recompensa`:** botão "Abrir figurinha" → mesmo sub-fluxo de recompensa do acerto.
- **`trofeu`:** ao entrar, registra `{valor,tipo}` em `codigoSecreto`; botão → `indiceAtual++`.
- **`encerramento`:** terminal; usa `figurinhasColetadas` e `codigoSecreto` para o resumo.

> O sub-fluxo de recompensa (card → cheia) é **derivado** do campo `recompensa` do passo — não é um passo separado na config. Assim a config fica concisa e a numeração das figurinhas é coerente.

### Resolução de estilo (RF-16)
`engine/estilo.js` resolve, para cada elemento, a cascata `tema` → `passo.estilo` → `elemento.estilo` em um objeto final de **cores/tipografia**. **Layout não passa por aqui:** posição/medidas são do componente do tipo (Tailwind/JSX), selecionadas por **variante nomeada** vinda da config (ex.: `personagem.posicao`, `balao.variante`). Sem override de cor, usa o `tema`; sem variante, usa o layout padrão do tipo. (P-11)

### Pré-carregamento (RNF-03)
Ao montar a `AlbumPage` e após carregar o JSON, pré-carregar (via `new Image()`/`<link rel=preload>`) todos os fundos, personagens, cards e figurinhas referenciados na config, resolvendo caminhos sobre `assetsBasePath`.

---

## 5. Configuração do álbum (conceito)

Um arquivo por álbum em `src/config/albuns/<albumId>.json` é a **SSOT do álbum** (P-01): metadados + `tema` + lista ordenada de `passos`. Caminhos de imagem relativos a `assetsBasePath`; texto aceita `**negrito**` e `\n`. **O schema detalhado de cada tipo de tela fica para depois** (§5.4) — aqui entra só a forma geral, o suficiente para montar a base.

### 5.1 Raiz
```jsonc
{
  "albumId": "eca-digital",
  "numeroAlbum": 1,
  "titulo": "ECA Digital",
  "subtitulo": "Álbum 1 — Coleção Álbum Interativo",
  "assetsBasePath": "/assets/eca-digital",

  "tema": {
    "corPrimaria":   "#3B4BC8",
    "corSecundaria": "#D4A017",
    "corFundo":      "#E8E0F0",
    "corTexto":      "#1A1A2E",
    "corAcerto":     "#22C55E",
    "corErro":       "#EF4444",
    "fonteTitulo":   "Poppins, sans-serif",
    "fonteCorpo":    "Inter, sans-serif"
  },

  "passos": [ /* ver 5.3 */ ]
}
```
> `tema` é a **base da cascata** de estilo (§5.2): todo passo herda esses valores e pode sobrescrevê-los por passo ou por elemento.

### 5.2 Estilo (cascata) e variantes de layout
Duas coisas mantidas **separadas de propósito** (P-11), para não cair no anti-padrão *inner-platform* (reimplementar CSS em JSON):

**a) Cores/tipografia → na config, por cascata.** `tema` (global) → `passo.estilo` → `elemento.estilo` — o mais específico vence; sem override, cai no `tema`. É só *theming*, nunca layout. (RF-16)
```jsonc
"estilo": {
  "corFundo": "#2563EB",   // fundo do elemento (ou da tela, se no passo)
  "corTexto": "#FFFFFF",   // cor da letra
  "corBorda": "#D4A017",
  "corBico":  "#FFFFFF",   // só balão: cor do "bico"
  "tamanhoFonte": "1.1rem",
  "negrito": true,
  "alinhamento": "centro"  // esquerda|centro|direita
}
```
Elementos que aceitam `estilo` na config: `passo` (tela), `balao`, `enunciado`, `opcoes`/`opcao`, `blocos`, `botao`.

**b) Layout/posição → no componente de tela (Tailwind/JSX), via variantes nomeadas.** A config só **escolhe nomes discretos**; as coordenadas/medidas vivem no código, não no JSON. O nome mais importante é **qual TELA renderizar** — a tela é dona do posicionamento (P-02/P-11):
```jsonc
"tela":     "baloes",     // (opcional) seleciona uma tela nomeada no registro;
                          //  default = o id do passo (tela própria) ou o layout padrão do tipo
"telaErro": "sec01-pergunta-erro", // (opcional) tela da sub-tela de erro; default `${id}-erro`
"personagem": { "imagem": "personagens/inanna.png", "posicao": "esquerda" } // esquerda|direita|centro
```

> **Não existe posicionamento livre na config** (sem âncora/x/y/rotação/z-index). Variação de layout que não couber no layout padrão do tipo vira **tela própria** (`components/telas/SecNN….jsx`) registrada por nome — nunca coordenada no JSON. Telas únicas (capa, boas-vindas, encerramento) são componentes feitos à mão que leem só conteúdo + cores. Os **elementos** (`components/ui/`) são átomos puros (texto + cores, sem posição); a **tela** os compõe.

### 5.3 Passos (campos comuns)
Todo passo tem `id` (único) e `tipo`. Opcionalmente: `tituloHeader`, `imagemFundo`, `personagem`, `balao`, `estilo` (do passo) e `botao`.

```jsonc
// personagem: imagem + variante de lado (layout no componente)
"personagem": { "imagem": "personagens/inanna.png", "posicao": "esquerda" }, // esquerda|direita|centro

// balao: string simples (usa o tema) OU objeto com texto + estilo (cores) + variante (layout)
"balao": "Oi! Vamos começar?",
"balao": {
  "texto": "Oi, meu nome é Inanna\nacerte a resposta e abra\na 1ª figurinha",
  "estilo":  { "corFundo": "#FFFFFF", "corTexto": "#1A1A2E", "corBico": "#FFFFFF" },
  "variante": "topo"                                   // topo|lateral
},

// botao: texto + cores (layout/posição é do componente)
"botao": { "texto": "Próxima página", "estilo": { "corFundo": "#3B4BC8", "corTexto": "#FFFFFF" } }
```
> `textoBotao: "..."` (string) continua válido como atalho de `botao.texto` quando não precisa estilizar.

### 5.4 Tipos de passo (schema detalhado fica para depois)
Cada item de `passos` tem `id` + `tipo`. Tipos previstos (comportamento no fluxo em [spec.md §4–§5](./spec.md)): `capa`, `boas-vindas`, `conteudo` (com `recompensa` opcional), `pergunta`, `trofeu`, `encerramento`. O sub-fluxo de recompensa (revelação → figurinha cheia) é **derivado** do campo `recompensa` do passo, não é um tipo à parte.

O **schema completo de cada tipo** (campos de `pergunta`, `figurinha`, `trofeu`, blocos de `conteudo`, etc.) será definido **tela a tela, na fase de conteúdo** — não faz parte da base. Para a base, o motor só precisa: despachar por `tipo`, conhecer os campos comuns (§5.3) e a cascata de cores (§5.2). Esqueleto mínimo só para fixar a forma:

```jsonc
{
  "albumId": "eca-digital", "tema": { /* §5.1 */ },
  "passos": [
    { "id": "capa",        "tipo": "capa",        "imagemFundo": "fundos/capa.png", "textoBotao": "Próxima página" },
    { "id": "boas-vindas", "tipo": "boas-vindas", "paragrafos": ["..."],            "textoBotao": "Próxima página" },
    { "id": "p1",          "tipo": "pergunta",    "enunciado": "...", "opcoes": [/* 2–3 */], "respostaCorreta": "C",
      "recompensa": { "figurinha": { "numero": 1 } } },
    { "id": "t1",          "tipo": "trofeu",      "valor": "S", "tipoValor": "letra" },
    { "id": "fim",         "tipo": "encerramento","mostrarCodigoSecreto": true }
  ]
}
```

---

## 6. Estrutura de pastas

```
src/
├── App.jsx                       → rotas
├── paginas/
│   ├── QuizEntradaPage.jsx       → /quiz/:escolaId (resolve: direto | seletor | indisponível)
│   ├── AlbumPage.jsx             → /quiz/:escolaId/:albumId (valida liberação + monta motor)
│   ├── SeletorAlbuns.jsx         → hub: lista álbuns liberados + bloqueados (🔒)
│   ├── AlbumBloqueado.jsx        → álbum não liberado p/ o colégio
│   ├── LinkInativo.jsx           → colégio inativo / sem álbuns liberados
│   └── NaoEncontrado.jsx
├── engine/
│   ├── useQuiz.js                → máquina de passos + estado (seção 4)
│   ├── tipos.js                  → constantes de tipo + validação leve da config
│   ├── estilo.js                 → resolve a cascata de cores tema→passo→elemento (RF-16)
│   └── preload.js                → pré-carregamento de assets (RNF-03)
├── components/
│   ├── layout/
│   │   ├── MobileFrame.jsx       → moldura de celular no desktop (P-03)
│   │   ├── HeaderEscola.jsx      → logo escola + título seção + logo consultoria
│   │   └── HeaderAlbum.jsx       → faixa "Álbum de Figurinhas" + contador
│   ├── telas/                    → TELAS (P-02): Renderer seleciona a tela nomeada
│   │   ├── registro.js          → nome→componente (por tipo = fallback; por id = própria)
│   │   ├── Renderer.jsx         → motor→UI: resolve a tela do passo/sub-tela
│   │   ├── Capa·BoasVindas·Conteudo·Pergunta·Erro·Baloes·Trofeu·Encerramento.jsx  (layout padrão do tipo)
│   │   ├── Figurinha·FigurinhaCheia.jsx   (sub-fluxo de recompensa)
│   │   └── SecNN….jsx           → telas próprias, montadas uma a uma (ex.: Sec01Pergunta)
│   └── ui/                       → ELEMENTOS: átomos PUROS (texto+cores, sem posição)
│       ├── Personagem.jsx
│       ├── BalaoPersonagem.jsx  → balão de fala (+ bico)
│       ├── Enunciado.jsx        → barra do enunciado da pergunta
│       ├── OpcaoResposta.jsx    → círculo do rótulo + texto (+ X no erro)
│       ├── OpcaoBalao.jsx       → opção Sim/Não (variante balões)
│       ├── CaixaConteudo.jsx    → bloco texto/destaque
│       ├── BotaoAcao.jsx · RodapeAcao.jsx
│       └── TextoRico.jsx        → renderiza **negrito** e \n
├── config/
│   └── albuns/
│       └── eca-digital.json
├── services/
│   └── supabase.js               → cliente + getColegio(id) → { escola, albunsLiberados[] }
└── styles/  (tailwind)
```

> A base entrega o **layout padrão de cada tipo** (telas-base) + os elementos `ui/`. Telas que repetem o padrão são entradas no JSON; telas que divergem do print viram **tela própria** em `telas/` (montadas uma a uma) — é assim que se fecha o pixel-perfect sem acoplar uma tela na outra.

### Assets por álbum
```
public/assets/eca-digital/
├── fundos/        (capa, comemoração, fundos de seção)
├── personagens/   (poses do mascote/Inanna por seção)
├── figurinhas/    (NN.png e, opcional, NN_card.png)
└── trofeus/
```
Logos das **escolas** ficam no Cloudinary (vêm de `logo_url`). A logo da **consultoria** é asset estático do app.

---

## 7. Variáveis de ambiente

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
`.env` no git-ignore; configurar também no painel da Vercel. Só a **anon key** (leitura pública via RLS).

---

## 8. Estratégia de implementação (fases)

1. **Fase 0 — Andaime:** Vite + React + Tailwind + react-router; `MobileFrame`; rotas `/quiz/:escolaId` e `/quiz/:escolaId/:albumId` com mock.
2. **Fase 1 — Dados:** tabelas `escolas` + `escola_albuns` + RLS no Supabase; `services/supabase.js` (`getColegio`); `QuizEntradaPage` resolvendo direto/seletor/indisponível + `AlbumPage` validando liberação; estados de erro amigáveis.
3. **Fase 2 — Motor:** `useQuiz.js` (máquina de passos + estado em memória) + `tipos.js` + `estilo.js` (cascata) + pré-carregamento.
4. **Fase 3 — Tipos de passo:** os ~6 componentes de passo + sub-fluxos de erro e recompensa, todos lendo a config e a cascata de cores.
5. **Fase 4 — Álbum 1 mínimo:** `eca-digital.json` com 1 capa, 1 boas-vindas, 1 conteúdo, 1 pergunta (com figurinha), 1 troféu, 1 encerramento + assets — valida ponta a ponta os **critérios de aceite da base** (`spec.md` §10).
6. **Fase 5 — Preencher o conteúdo:** demais seções/figurinhas/troféus do Álbum 1 via JSON (telas montadas uma a uma com IA). *Inclui os complementos de motor/componente que os assets exigem (fundo por seção, pose de erro, banner de figurinha, variante de balões) — config-driven.*
   - **Fase 5.5 — Fidelidade visual (pixel-perfect):** aproximar cada tela do print em `doc/` (composição/posição). É **layout no componente** (P-11), não JSON. Lacuna do plano original: a Fase 5 entregou fluxo+conteúdo; a constituição (*"a imagem vence"*) exige o casamento visual antes do deploy.
7. **Fase 6 — Deploy + validação:** Vercel + escola fictícia.
8. **Fase 7 — Replicação:** Álbuns 2 e 3 = novo JSON + assets (zero código).

---

## 9. Convenções

- **Idioma:** código e config em português (chaves do JSON em pt-BR, como nas prints).
- **Imutabilidade da config:** o motor trata a config como somente-leitura; estado de sessão é separado.
- **Sem hard-code:** nenhum texto/cor/imagem de álbum no JSX — sempre da config (P-01). Em PR/review, qualquer string de conteúdo no código é bug.
- **Falhas amigáveis:** erros de rede/escola/config nunca expõem detalhes técnicos ao aluno (RF-14, RF-15).
- **Validação da config:** `tipos.js` valida na carga (tipos conhecidos, `respostaCorreta` existe em `opcoes`, figurinha tem `numero`/`imagemCheia`) e loga aviso claro em dev.
