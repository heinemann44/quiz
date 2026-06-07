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

## Mapa das fases
| Fase | Tema | Estado |
|---|---|---|
| 0 | Andaime | ✅ concluída |
| 1 | Dados / Supabase | ⬜ |
| 2 | Motor | ⬜ |
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

**Concluída:** ✅ 2026-06-06 · commit `f5d32fc` · 5 testes verdes (MobileFrame + roteamento)

---

## Fase 1 — Dados / Supabase   ⬜

**Objetivo:** tabelas `escolas` + `escola_albuns` + RLS; `services/supabase.js`
(`getColegio`); `QuizEntradaPage` (direto/seletor/indisponível) + `AlbumPage`
validando liberação; estados de erro amigáveis. (plan §8.2, §3)
**Depende de:** Fase 0.
_Detalhar tarefas ao iniciar a fase._

**Concluída:** —

---

## Fase 2 — Motor   ⬜

**Objetivo:** `engine/useQuiz.js` (máquina de passos + estado em memória),
`tipos.js` (validação), `estilo.js` (cascata de cores), `preload.js`. (plan §8.3, §4)
**Depende de:** Fase 1. **TDD obrigatório** (AGENTS §Testes).
_Detalhar tarefas ao iniciar a fase._

**Concluída:** —

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
