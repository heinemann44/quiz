# AGENTS.md — Álbum de Figurinhas Interativo

Instruções para o **agente de IA** que vai codar neste repositório. Em 2026 o
leitor principal do código é o agente, não o humano — então escrevemos código
limpo *para o agente*, e damos ao agente regras explícitas de código limpo.
Baseado em [Clean Code pra Agentes de IA, do Akita](https://akitaonrails.com/2026/04/20/clean-code-para-agentes-de-ia/).

LLM **não segue Clean Code sozinha** — segue o que está escrito aqui. Leia este
arquivo a cada iteração. Linhas curtas, imperativas: cada linha gasta contexto.

> Status: fim da spec, início do dev. Spec madura em `spec/`, visual congelado em
> `doc/`. A partir daqui: código guiado pela spec.

---

## Hierarquia da verdade (de cima vence)

1. `spec/constitution.md` — princípios **P-01…P-11** (inegociáveis).
2. `spec/spec.md` — requisitos (RF/RNF) e critérios de aceite.
3. `spec/plan.md` — stack, modelo de dados, motor, conceito do JSON, pastas, fases.
4. `doc/` — **SSOT visual** (prints reais). *Imagem vence texto* em divergência.
5. Código — consequência, nunca origem da verdade.

Antes de codar uma seção/tela, **abra o print** em `doc/<tema-X>/` — as pastas
`tema-1..tema-5` são as **seções do Álbum 1** (não álbuns). Os nomes de arquivo
(`pergunta-N`, `correto-N`, `errado-N`, `figurinha-N`, `trofeu-N`) mapeiam para os
tipos de passo do motor.

---

## Regras de Clean Code (siga em todo código gerado)

### Funções e arquivos
- Função: faz **uma coisa** (SRP). Mire 4–20 linhas.
- Arquivo: < ~200 linhas. Componente de passo grande → extraia para `ui/`.
- Sem aninhamento profundo: **máx. 2 níveis** de indentação. Use early-return.

### Nomes
- Nomes significativos e **únicos/grepáveis**. Nada de `data`, `info`, `handle`, `tmp`.
- Em pt-BR, coerente com a spec e as chaves do JSON (`passo`, `figurinha`, `recompensa`).

### Tipos
- JS sem tipo dinâmico solto: anote com **JSDoc** as funções do `engine/` e os
  formatos da config. `PropTypes` nos componentes que recebem dados da config.

### DRY
- Zero duplicação de lógica/conteúdo. `**negrito**` e `\n` → só `ui/TextoRico`.
  Resolver caminho de asset → uma função (`assetsBasePath` + relativo), não inline.

### Erros
- Mensagem de erro carrega **contexto**: valor recebido e esperado
  (ex.: `respostaCorreta "D" não existe em opcoes [A,B,C] no passo "secao-01-pergunta"`).
- Erro voltado ao **aluno** nunca expõe detalhe técnico (RF-14, RF-15).

### Comentários
- Comente o **porquê** (intenção/decisão), não o **como**. Nada de comentário óbvio.
- **Não apague** comentários de contexto ao refatorar. Cite o motivo da escolha
  quando ela for não-óbvia (ex.: por que o sub-fluxo de recompensa é derivado).

---

## Testes

- Rodam com **um comando**, sem setup manual: `npm test` (Vitest — montar na Fase 0).
- Cubra a **lógica do motor**: `useQuiz` (transições por tipo, estado em memória),
  `tipos.js` (validação da config), `estilo.js` (cascata de cores), resolução de
  assets. UI visual valida pelo print.
- Princípios **F.I.R.S.T.** (rápido, isolado, repetível, auto-verificável, oportuno).
- Mock do Supabase via **classe fake nomeada** (`FakeColegioRepo` com `getColegio`),
  injetada — não monkeypatch espalhado.
- Toda nova função do motor e todo bug corrigido entram com teste.

---

## Dependências

- **Injeção de dependência**: o motor recebe a config e o repositório de colégio
  como parâmetro/prop — não importa Supabase direto dentro de componente.
- **Embrulhe lib de terceiro** atrás de interface nossa: todo acesso ao Supabase
  passa por `services/supabase.js` (`getColegio(id)` → `{ escola, albunsLiberados }`);
  componentes não conhecem `@supabase/supabase-js`. Idem Cloudinary.

---

## Estrutura (siga `plan.md` §6 — não reinvente)

```
src/
├── paginas/      QuizEntradaPage · AlbumPage · SeletorAlbuns · AlbumBloqueado · LinkInativo · NaoEncontrado
├── engine/       useQuiz.js (máquina de passos) · tipos.js (validação) · estilo.js (cascata de cores) · preload.js
├── components/
│   ├── layout/   MobileFrame · HeaderEscola · HeaderAlbum
│   ├── passos/   UM componente por TIPO (P-02): Capa, BoasVindas, Conteudo, Pergunta, Trofeu, Encerramento
│   ├── recompensa/  RevelacaoFigurinha · FigurinhaCheia
│   └── ui/       Personagem · BalaoPersonagem · OpcaoResposta · CaixaConteudo · BotaoAcao · TextoRico
├── config/albuns/<id>.json   ← SSOT do álbum (P-01)
└── services/supabase.js      ← cliente + getColegio(id) → { escola, albunsLiberados }
public/assets/<id>/  fundos · personagens · figurinhas · trofeus
```

- Caminhos previsíveis, convenção de framework. Tela nova **de um tipo existente** =
  entrada no JSON. Tipo novo de passo = novo componente em `passos/`. Tela **única**
  (capa, boas-vindas, encerramento) = componente próprio à mão.
- **Cores na config, layout no componente** (P-11): cor por cascata `tema`→`passo`→
  `elemento`; posição por **variante nomeada** (ex.: personagem `esquerda|direita`,
  balão `topo|lateral`), nunca x/y/âncora no JSON.
- Sub-fluxo de recompensa (card → tela cheia) é **derivado** do campo `recompensa`
  do passo, não um passo separado na config.
- **Rotas:** `/quiz/:escolaId` (entrada → direto | seletor | indisponível) e
  `/quiz/:escolaId/:albumId` (deep link, valida liberação). Multi-álbum por colégio
  com liberação individual na tabela `escola_albuns`.

---

## Formatação

- **Prettier + ESLint** com defaults da linguagem. Sem debate de estilo: roda o
  formatter e segue. Configurar na Fase 0; nenhum PR discute aspas/vírgula.

---

## Logging

- **JSON estruturado** (campo a campo) para dev/observabilidade — agente parseia e
  filtra. Use no carregamento de config/colégio e na validação.
- **Texto simples e amigável** só no que o aluno vê.

---

## Observabilidade (comandos previsíveis — feedback rápido pro agente)

Defina e mantenha estes scripts em `package.json`. Se validar exigir 10 passos
manuais, o agente não valida e o ciclo quebra.

| Comando | Faz |
|---|---|
| `npm run dev` | sobe o app local (Vite) |
| `npm test` | roda os testes (Vitest), sem setup manual |
| `npm run lint` | ESLint |
| `npm run build` | build de produção (tem que passar antes de "pronto") |

Setup **idempotente**: clonar → `npm install` → `npm run dev` chega a um estado
funcional (com `.env` de exemplo). Sem passo manual escondido.

---

## Guardrails do projeto (violou = bug, não estilo)

- **P-01 — Config é a SSOT.** Nenhum texto/cor/imagem de álbum no JSX. Qualquer
  string de conteúdo hard-coded no código é bug. Conteúdo é JSON, não código.
- **P-02 — Motor genérico.** Um componente por *tipo* de passo, nunca por tela.
- **P-03 — Mobile-first ~390px** dentro de `MobileFrame` no desktop.
- **P-04 / P-05 — Zero dado do aluno, zero persistência.** Sem login, formulário,
  analytics de aluno, `localStorage`/cookies de progresso. Recarregar reinicia.
- **P-10 — Stack fixa free** (React+Vite+Tailwind · Vercel · Supabase · Cloudinary).
  Trocar peça = **emenda à constituição**: não faça sozinho, levante a questão.
- **P-11 — Cores na config, layout no JSX.** Cor/tipografia por cascata no JSON;
  posição por **variante nomeada**. **x/y/âncora/rotação no JSON = bug** (anti
  inner-platform). Tela única = componente próprio.
- Config é **somente-leitura** pro motor; estado de sessão é separado e em memória.
- Só a **anon key** do Supabase no front (`.env`, git-ignored; também na Vercel).

---

## Fluxo por tarefa (laço curto, sem one-shot)

1. **Contexto antes de comando.** Spec + print relevante. Ambiguidade → pergunte
   ou proponha emenda; não invente requisito/feature.
2. **Planeje** em 3–6 passos e quais arquivos; confirme antes de gerar volume.
3. **TDD** na lógica do motor (teste primeiro).
4. Implemente a **menor fatia ponta a ponta** que funciona.
5. **Commit pequeno e reversível**, mensagem no imperativo dizendo o *porquê*.
6. **Revise** contra spec + print + estas regras.

### Ordem das fases (`plan.md` §8)
0 Andaime → 1 Dados/Supabase (`escolas` + `escola_albuns`, entrada/seletor) → 2 Motor
→ 3 Tipos de passo → 4 Álbum 1 mínimo (valida critérios de aceite `spec.md` §10) →
5 Preencher conteúdo via JSON → 6 Deploy Vercel → 7 Replicar álbuns (zero código).

---

## "Pronto" =

- [ ] Bate com a spec e com o print (`doc/` vence em divergência).
- [ ] Nenhum P-01…P-11 violado; nenhum conteúdo hard-coded.
- [ ] Funções pequenas, nomes grepáveis, ≤2 níveis, JSDoc/PropTypes nas bordas.
- [ ] Lógica de motor com teste; `npm test`, `npm run lint`, `npm run build` verdes.
- [ ] Funciona em ~390px dentro do `MobileFrame`.
- [ ] Commit pequeno explicando o porquê.
