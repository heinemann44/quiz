# Tarefas — Álbum de Figurinhas Interativo

**Documento vivo de progresso.** Deriva de [plan.md §8](./plan.md). Não é fonte da
verdade — é rastreio de execução (abaixo do plan, acima do código na hierarquia).
Nenhum requisito nasce aqui; se faltar requisito, vá ao `spec.md`/`plan.md`.

## Como usar
- `- [ ]` pendente · `- [x]` feita. Marque `[x]` **só quando passa o "Pronto"** do
  [AGENTS.md](../AGENTS.md) (`npm test` · `npm run lint` · `npm run build` verdes).
- Cada tarefa cita sua origem (RF/RNF, princípio P-NN, §plan ou print em `doc/`).
- **Fase concluída** = todas as tarefas `[x]` + DoD da fase + selo no rodapé da
  seção (`✅ AAAA-MM-DD · commit <hash>`). O commit usa escopo `fase-N`.
- Estado da fase no título: `⬜ não iniciada` · `⏳ em andamento` · `✅ concluída`.
- **Ritual por fase** (AGENTS §Ritual por fase): a fase **abre** com o agente
  pedindo os **insumos** do usuário (assets, decisões) e tirando **dúvidas**; e
  **fecha** com **🧪 Como testar** — passos manuais para o usuário validar.

## Mapa das fases
| Fase | Tema | Estado |
|---|---|---|
| 0 | Andaime | ✅ concluída |
| 1 | Dados / Supabase | ✅ concluída |
| 2 | Motor | ✅ concluída |
| 3 | Tipos de passo | ⬜ |
| 4 | Álbum 1 mínimo (valida `spec.md §10`) | ⬜ |
| 5 | Preencher conteúdo (JSON) | ⬜ |
| 6 | Deploy + validação | ⬜ |
| 7 | Replicação (Álbuns 2 e 3) | ⬜ |

---

## Fase 0 — Andaime   ✅ concluída

**Objetivo:** Vite + React + Tailwind + react-router; `MobileFrame`; rotas
`/quiz/:escolaId` e `/quiz/:escolaId/:albumId` com mock. (plan §8.1)
**Depende de:** —

**Tarefas:**
- [x] T0.1 Scaffold Vite + React; estrutura de `src/` conforme plan §6.
- [x] T0.2 ESLint + Prettier com defaults (AGENTS §Formatação). Sem debate de estilo.
- [x] T0.3 Vitest configurado; `npm test` roda sem setup manual (AGENTS §Testes).
- [x] T0.4 Scripts `dev`/`test`/`lint`/`build` no `package.json` (AGENTS §Observabilidade).
- [x] T0.5 Tailwind + `components/layout/MobileFrame.jsx` centrado ~390px (P-03).
- [x] T0.6 `App.jsx` com rotas: `/quiz/:escolaId`, `/quiz/:escolaId/:albumId`, `*` → `NaoEncontrado` (plan §2).
- [x] T0.7 Páginas-stub renderizando mock dentro do `MobileFrame` (sem Supabase ainda).
- [x] T0.8 `.env.example` com `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`; `.env` no gitignore (plan §7).

**Pronto quando:** `npm install && npm run dev` sobe; as rotas renderizam mock no
`MobileFrame`; `npm test`/`lint`/`build` verdes (P-03, setup idempotente).

**🧪 Como testar:** supersedida pela Fase 1 (os stubs viraram telas reais). Base do
andaime se valida por `npm install && npm run dev` subir + `npm test`/`lint`/`build` verdes.

**Concluída:** ✅ 2026-06-06 · commit `f5d32fc` · 5 testes verdes (MobileFrame + roteamento)

---

## Fase 1 — Dados / Supabase   ✅ concluída

**Objetivo:** tabelas `escolas` + `escola_albuns` + RLS; `services/supabase.js`
(`getColegio`); `QuizEntradaPage` (direto/seletor/indisponível) + `AlbumPage`
validando liberação; estados de erro amigáveis. (plan §8.2, §3)
**Depende de:** Fase 0.

**Tarefas:**
- [x] T1.1 Migration `escolas` + `escola_albuns` + RLS (SELECT público) + GRANT
  SELECT ao anon; escrita bloqueada. Versionada em `supabase/migrations/` (plan §3).
- [x] T1.2 `supabase/seed.sql` com 4 cenários de dev (direto / seletor+🔒 / sem
  álbuns / inativo).
- [x] T1.3 `services/supabase.js` embrulha o supabase-js: `colegioRepo.getColegio`
  → `{ escola, albuns }`, cliente preguiçoso (AGENTS §Dependências).
- [x] T1.4 DI: `ColegioRepoContext` (injeta repo) + `FakeColegioRepo` (test double)
  + hook `useColegio` (carregando|pronto|erro).
- [x] T1.5 `resolverEntrada` puro + testes TDD (inexistente|inativo|indisponivel|
  direto|seletor) (RF-01/14/15).
- [x] T1.6 `QuizEntradaPage` despacha os 5 desfechos; `AlbumPage` valida liberação (RF-01b).
- [x] T1.7 `SeletorAlbuns` (liberados clicáveis + bloqueados 🔒) + `HeaderEscola`
  com logos (RF-01a/02); `AvisoTela` unifica telas amigáveis.
- [x] T1.8 Testes de página (RTL + `FakeColegioRepo`) cobrindo entrada e liberação.
- [x] T1.9 Ambientes por schema (`dev`/`hml`/`prd`) no mesmo projeto; app aponta
  via `VITE_SUPABASE_SCHEMA` (default `dev`); PostgREST expõe os schemas; testes
  seguem sem banco. (refino pós-fechamento)

**Pronto quando:** `/quiz/:escolaId` resolve os 5 desfechos e `/quiz/:escolaId/:albumId`
barra álbum não liberado; `npm test`/`lint`/`build` verdes; anon lê e escrita
bloqueada no banco real (RF-01/01a/01b/02/14/15 — parte do aceite §10.1).

**🧪 Como testar:** `npm run dev` e abrir (seed de dev no Supabase):
- `/quiz/colegio-demo` → entra direto (1 liberado) → "Álbum liberado".
- `/quiz/colegio-multi` → seletor: "Eca Digital" e "Mundo Do Trabalho" clicáveis + "Consumo Consciente" 🔒.
- `/quiz/colegio-sem-albuns` → "Indisponível / Nenhum álbum disponível".
- `/quiz/colegio-inativo` → "Indisponível / Fale com a sua escola".
- `/quiz/nao-existe` → "Página não encontrada".
- `/quiz/colegio-multi/consumo-consciente` (deep link bloqueado) → "Álbum não disponível".
- `/quiz/colegio-demo/eca-digital` (deep link liberado) → "Álbum liberado".
- Automático: `npm test` (18 verdes — sem banco, via FakeColegioRepo).

**Concluída:** ✅ 2026-06-06 · commit `a3b2d0d` · 18 testes verdes · advisors limpos
**Refino:** ambientes por schema (dev/hml/prd) · 2026-06-07 · commit `d4e1f5a`

---

## Fase 2 — Motor   ✅ concluída

**Objetivo:** `engine/useQuiz.js` (máquina de passos + estado em memória),
`tipos.js` (validação), `estilo.js` (cascata de cores), `preload.js`. (plan §8.3, §4)
**Depende de:** Fase 1. **TDD obrigatório** (AGENTS §Testes).

**Tarefas:**
- [x] T2.1 `tipos.js`: `TipoPasso` + `validarConfig` leve com mensagens
  contextuais (plan §9).
- [x] T2.2 `estilo.js`: cascata `tema→passo→elemento`, só cor/tipografia (P-11/RF-16).
- [x] T2.3 `maquina.js`: reducer **puro** da máquina de passos (transições por
  tipo, sub-fluxo de recompensa, erro/tentativas, troféu, encerramento) — TDD.
- [x] T2.4 `useQuiz.js`: hook fino sobre o reducer (estado em memória, P-05/RF-12).
- [x] T2.5 `preload.js`: `resolverAsset` (DRY) + `coletarAssets` + `precarregar`
  best-effort (RNF-03); disparo real valida na Fase 4.
- [x] T2.6 `test/configFixture.js` + testes cobrindo todos os tipos e sub-fluxos.

**Pronto quando:** transições do plan §4 cobertas por teste; `npm test`/`lint`/
`build` verdes. (motor headless — telas reais são da Fase 3)

**🧪 Como testar:** é fase headless (sem tela nova). Valida por teste:
- `npm test` → 48 verdes. O fluxo legível está em `src/engine/maquina.test.js`
  (capa→…→pergunta erro/acerto→recompensa→troféu→encerramento).
- Só o motor, com nomes: `npx vitest run src/engine`.
- Cobertura: `maquina` (transições), `tipos` (validação), `estilo` (cascata),
  `preload` (resolução/coleta de assets), `useQuiz` (hook).

**Concluída:** ✅ 2026-06-07 · commit `b5a6ffe` · 48 testes verdes

---

## Fase 3 — Tipos de passo   ⬜

**Objetivo:** ~6 componentes de passo + sub-fluxos de erro e recompensa, lendo
config + cascata de cores. (plan §8.4, §6)
**Depende de:** Fase 2.
_Detalhar tarefas ao iniciar a fase — um componente por tipo (P-02), validar contra print em `doc/`._

**Concluída:** —

---

## Fase 4 — Álbum 1 mínimo   ⬜

**Objetivo:** `config/albuns/eca-digital.json` mínimo (1 de cada tipo) + assets;
valida **ponta a ponta os 9 critérios de aceite da base** ([spec.md §10](./spec.md)). (plan §8.5)
**Depende de:** Fase 3.
_Detalhar tarefas ao iniciar a fase. Esta é a porta de saída da BASE._

**Concluída:** —

---

## Fase 5 — Preencher conteúdo (JSON)   ⬜

**Objetivo:** demais seções/figurinhas/troféus do Álbum 1, tela a tela, **só via
JSON + assets** (zero código novo). (plan §8.6)
**Depende de:** Fase 4 (base aprovada).
_Detalhar por seção (`doc/tema-1..5`, `doc/trofeu`, `doc/fim`) ao iniciar._

**Concluída:** —

---

## Fase 6 — Deploy + validação   ⬜

**Objetivo:** deploy Vercel + `.env` no painel; validação com escola fictícia. (plan §8.7)
**Depende de:** Fase 5.
_Detalhar tarefas ao iniciar a fase._

**Concluída:** —

---

## Fase 7 — Replicação   ⬜

**Objetivo:** Álbuns 2 e 3 = novo JSON + assets, **zero código**. (plan §8.8)
**Depende de:** Fase 6.
_Detalhar por álbum ao iniciar. Se exigir código, é sinal de gap na base → volte à fase certa._

**Concluída:** —
