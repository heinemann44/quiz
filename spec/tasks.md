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
| 3 | Tipos de passo | ✅ concluída |
| 4 | Álbum 1 mínimo (valida `spec.md §10`) | ✅ concluída |
| 5 | Preencher conteúdo (JSON) | ✅ concluída |
| 5.5 | Fidelidade visual (telas montadas uma a uma · pixel-perfect) | ⏳ |
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

## Fase 3 — Tipos de passo   ✅ concluída

**Objetivo:** ~6 componentes de passo + sub-fluxos de erro e recompensa, lendo
config + cascata de cores. (plan §8.4, §6)
**Depende de:** Fase 2.

**📦 Insumos do usuário:** nenhum (arte real só na Fase 4 → placeholders). Logo da
consultoria: optou por **placeholder** por ora.

**Tarefas:**
- [x] T3.1 ui/: `TextoRico` (negrito/\n, DRY), `BotaoAcao`, `Figura` (fallback
  RN-02), `Personagem` (variante esq|dir|centro), `BalaoPersonagem` (topo|lateral),
  `OpcaoResposta` (X no erro), `CaixaConteudo`.
- [x] T3.2 `layout/HeaderAlbum` ("Álbum de Figurinhas" + contador, RF-09).
- [x] T3.3 passos/: Capa, BoasVindas, Conteudo (com/sem recompensa), Pergunta
  (+ sub-tela de erro), Trofeu, Encerramento — um por tipo (P-02).
- [x] T3.4 recompensa/: `RevelacaoFigurinha` (card) + `FigurinhaCheia` (RF-06).
- [x] T3.5 `PassoRenderer` (motor→UI) + `AlbumContext` (tema/assets/escola);
  `campos.js` normaliza string|objeto (plan §5.3).
- [x] T3.6 dev/: `PreviewPage` + `configExemplo` + rota `/preview` (só DEV).
- [x] T3.7 Testes RTL: TextoRico, PassoRenderer e fluxo completo no PreviewPage.

**Pronto quando:** todos os tipos renderizam lendo a config + cascata; erro/recompensa
funcionam; `npm test`/`lint`/`build` verdes. (cores via config — aceite §10.9; arte na Fase 4)

**🧪 Como testar:** `npm run dev` e abrir **`/quiz/colegio-demo/eca-digital`**? não —
ainda é stub. Use o preview de dev:
- Abra **`http://localhost:5173/preview`** e clique "Próxima página" pelo fluxo:
  capa → boas-vindas → conteúdo → **pergunta** (erre → X + "Volte"; acerte →
  **revelação → figurinha cheia**) → **troféu "S"** → conteúdo "Abrir figurinha"
  → pergunta **Sim/Não** → troféu "2" → **encerramento** com código "S 2".
- Arte aparece como **placeholder** (🧑‍🚀/🎴/🏆) — real entra na Fase 4.
- Automático: `npm test` (o fluxo todo está em `src/dev/PreviewPage.test.jsx`).

**Concluída:** ✅ 2026-06-07 · commit `18a4293` · 53 testes verdes

---

## Fase 4 — Álbum 1 mínimo   ✅ concluída

**Objetivo:** `config/albuns/eca-digital.json` mínimo (1 de cada tipo) + assets;
valida **ponta a ponta os 9 critérios de aceite da base** ([spec.md §10](./spec.md)). (plan §8.5)
**Depende de:** Fase 3. Porta de saída da BASE.

**📦 Insumos do usuário:** assets do lote mínimo — o usuário fornece; caminhos/nomes
definidos em `public/assets/eca-digital/README.md` + `public/marca/consultoria.png`.
Até chegarem, a arte aparece como **placeholder** (nada quebra). Texto da seção 1:
transcrito dos prints (best-effort; refino na Fase 5).

**Tarefas:**
- [x] T4.1 `config/albuns/eca-digital.json` real (capa, boas-vindas, conteúdo,
  pergunta+figurinha, troféu, encerramento) + `index.js` (`carregarAlbum`, P-01).
- [x] T4.2 `AlbumRunner` (pré-carrega assets + `useQuiz` + `PassoRenderer`),
  reaproveitado pelo `PreviewPage` (DRY).
- [x] T4.3 `AlbumPage` liga o motor real: valida liberação → carrega+valida config
  (`tipos.js`) → motor; falhas viram aviso amigável + log estruturado (RF-15).
- [x] T4.4 Header com logo da escola **e** consultoria (RF-02); recompensa usa
  `fundoComemoracao`; `services/log.js` (JSON estruturado).
- [x] T4.5 Pastas de assets + manifesto (README) para o usuário soltar a arte.
- [x] T4.6 Testes: `eca-digital.json` válido + AlbumPage→motor + liberado-sem-config.

**Pronto quando:** os critérios §10 passam ponta a ponta (comportamento; arte por
placeholder até os assets); `npm test`/`lint`/`build` verdes. ✅

**🧪 Como testar:**
- `npm run dev` → **`/quiz/colegio-demo/eca-digital`**: entra direto no álbum real.
  Caminhe: capa → boas-vindas → conteúdo → **pergunta** (erre → X + "Volte"; acerte
  → revelação → figurinha cheia c/ contador) → **troféu "S"** → encerramento com
  código **"S"**. Recarregar reinicia do começo (RF-12).
- Deep link bloqueado: **`/quiz/colegio-multi/consumo-consciente`** → "Álbum não disponível".
- Solte os assets em `public/assets/eca-digital/` (ver README) e a arte aparece
  **sem mudar código**. `/preview` segue como sandbox.
- Automático: `npm test` (55).

**Concluída:** ✅ 2026-06-07 · commit `383b104` · 55 testes verdes · arte por placeholder
(aguarda assets do usuário)

---

## Fase 5 — Preencher conteúdo (JSON)   ✅ concluída

**Objetivo:** demais seções/figurinhas/troféus do Álbum 1, tela a tela, via
JSON + assets — com os **complementos de motor/componente** que a base não cobria
(não foi 100% "zero código", como o `plan.md` antecipava). (plan §8.6)
**Depende de:** Fase 4 (base aprovada).

**📦 Insumos do usuário:** assets do Álbum 1 já estavam no repo (figurinhas 01–06,
troféus 01–02, personagens por seção incl. poses de erro, fundos `secao-1..5`,
`fundo-figurinha`, `header-figurinha`, `capa`). **Pendente:** `public/marca/
consultoria.png` (segue placeholder). **Decisões do usuário:** pergunta 5 segue a
SSOT (sem tela de erro, volta ao conteúdo) e replica o layout de balões Sim/Não.

**Tarefas:**
- [x] T5.1 Complementos de motor/componente (config-driven, P-01/P-02 intactos):
  fundo por seção em conteúdo/pergunta (`imagemFundo`), **pose de erro** do
  personagem (`personagemErro`), banner `header-figurinha` no `HeaderAlbum`,
  variante de pergunta **`baloes`** (Sim/Não) + `aoErrar: "voltar-conteudo"` (TDD
  no motor `maquina.js`; `preload` coleta imagens de raiz e pose de erro).
- [x] T5.2 `eca-digital.json` completo: capa, boas-vindas, 5 seções
  (conteúdo+pergunta), informativo da seção 4, 6 figurinhas, troféus "S" e "2",
  encerramento — **texto exato transcrito da SSOT** (`doc/`).
- [x] T5.3 Correções de fidelidade à SSOT (imagem vence): opções reais da
  pergunta 1, mascote **Enki** (não "Astro"), e título/legenda das figurinhas/capa
  **já gravados na arte** → motor para de duplicar (usa `alt`; `FigurinhaCheia`).
- [x] T5.4 Testes: walkthrough ponta a ponta do Álbum 1 real (5 seções, 6
  figurinhas, 2 troféus, balões com retorno ao conteúdo, código "S 2"),
  `PerguntaBaloes`, guardas de estrutura da config; `aoErrar`/`preload` por TDD.
- [x] T5.5 Emenda **RF-05a** na `spec.md` (v2.1): erro alternativo por pergunta.

**Pronto quando:** o Álbum 1 percorre as 5 seções lendo só a config + assets; os
complementos são genéricos (não telas hard-coded); `npm test`/`lint`/`build`
verdes. ✅

**🧪 Como testar:**
- `npm run dev` → **`/quiz/colegio-demo/eca-digital`** (seed de dev) entra direto no
  Álbum 1. Caminhe: capa → boas-vindas → **5 seções** (cada uma com fundo próprio;
  Enki/Inanna/Enlil/João conforme o print) → erre uma pergunta e veja **a pose de
  erro trocar** + X + "Volte" → acerte → **revelação → figurinha cheia** com banner
  "Álbum de Figurinhas" e contador → 1º troféu **"S"** (após seção 3) → seção 4 tem
  pergunta **+** informativo "Abrir figurinha" (figs 04 e 05) → seção 5: pergunta
  de **balões Sim/Não**; ao errar (**"Não"**) **volta ao conteúdo** para reler, ao
  acertar (**"Sim"**) ganha a fig 06 → 2º troféu **"2"** → encerramento com código
  **"S 2"** e **6 figurinhas**. Recarregar reinicia (RF-12).
- Confira o visual contra `doc/` (a imagem vence): em especial
  `doc/tema-5/pergunta-5.png` (balões) e as telas de figurinha.
- Automático: `npm test` (65 verdes; o fluxo real está em
  `src/paginas/AlbumPage.test.jsx`).

**Concluída:** ✅ 2026-06-07 · 65 testes verdes · arte real (consultoria por
placeholder) · commit `8a39bb4`

> ⚠️ **Escopo:** a Fase 5 entregou **fluxo + conteúdo** (texto/cores via config),
> não a fidelidade pixel-a-pixel ao protótipo. A composição visual (posição do
> personagem, balão com bico, caixas) ainda diverge de `doc/`. Como a constituição
> manda *"a imagem vence"*, isso vira a **Fase 5.5** abaixo.

---

## Fase 5.5 — Fidelidade visual: telas montadas uma a uma (pixel-perfect)   ⏳

**Objetivo:** aproximar cada tela do Álbum 1 do respectivo print em `doc/`
(composição/posição), fechando o item de "Pronto" *"bate com o print"*. É trabalho
de **layout no componente** (Tailwind/JSX + **variantes nomeadas**, P-11) — **não
mexe no JSON de conteúdo** já entregue (P-01). (lacuna do `plan.md §8`, inserida
entre Fase 5 e 6)
**Depende de:** Fase 5.

**🏗️ Mudança de arquitetura (emenda v2.1):** o que vazava ajustes de uma tela pra
outra (telas diferentes num componente só, ex.: `pergunta` e `erro` com
`-bottom-25` compartilhado) virou: **elementos puros** em `ui/` (sem posição) +
**telas montadas uma a uma** em `telas/` (cada uma dona do seu layout), com o
motor genérico selecionando a **tela nomeada** (`registro.js`). Agora ajustar uma
tela **não afeta as outras** — base estável pro pixel-perfect.

**📦 Insumos do usuário:** `public/marca/consultoria.png` (logo da consultoria,
hoje placeholder) ajuda a fechar o header. Apontar telas prioritárias se houver.

**Tarefas (detalhar tela a tela ao iniciar, abrindo cada print):**
- [x] T5.5.0 **Arquitetura "telas uma a uma"** (emenda v2.1): `ui/` vira elementos
  PUROS (Personagem/BalaoPersonagem/OpcaoResposta sem posição; novo `Enunciado`);
  `telas/` com layout padrão por tipo + **`Pergunta` separada de `Erro`** + telas
  próprias da seção 1 (`Sec01*`); `registro.js` + `Renderer` (seleção por nome,
  motor genérico); guarda `validarTelas`; teste de regressão pergunta×erro. Removidos
  `passos/` e `recompensa/`. `tela: "baloes"` no JSON (era `variante`).
- [ ] T5.5.1 Layout das telas de **conteúdo** (`doc/tema-N`): personagem grande na
  lateral/posição certa, balão com bico, caixas como no print.
- [ ] T5.5.2 Layout das telas de **pergunta** e **erro** (`pergunta-N`/`errado-N`):
  enunciado, opções e pose de erro posicionados como no print.
- [ ] T5.5.3 Layout das telas de **figurinha** (`correto-N`/`figurinha-N`): card
  sobre o fundo comemorativo, banner e contador na posição do print.
- [ ] T5.5.4 **Capa**, **boas-vindas**, **troféu**, **encerramento** e a variante
  **balões** (`tema-5/pergunta-5`) batendo com os prints.
- [ ] T5.5.5 Conferência em ~390px no `MobileFrame` (P-03) e ajuste de novas
  variantes nomeadas onde o layout não couber nas atuais (P-11).

**⚖️ Regra (exceção a "a imagem vence"):** a **posição do botão de ação** é fixa —
canto **inferior-direito**, 16px, via `RodapeAcao` — e **prevalece sobre os prints**
em todas as telas. Não reposicionar o botão pra imitar `doc/`.

**Em andamento (parcial — não fecha box ainda):**
- **Capa** (parte de T5.5.4): encaixe da arte sem corte (`object-contain`,
  centralizada) e `corFundo` marinho `#001041` no passo (config, P-11) pra a
  sobra casar com a ilustração. Botão segue o padrão (direita-embaixo), não mais
  o centralizado do print — decisão do usuário.
- **Botão de ação padronizado** (transversal): `BotaoAcao` redesenhado conforme
  modelo do usuário — pílula glossy + texto caixa-alta + círculo com play. Cores
  em `tema.botao` (`corFundo`/`corTexto`/`corCirculo`, P-11) via helper
  `estiloDoBotao`. Posição única (canto inferior-direito, 16px) no novo
  `RodapeAcao`, aplicado nas 7 telas que usam o botão.
- **Boas-vindas** (parte de T5.5.4): espaçamento (`gap`/`leading`) e fonte
  ajustados pra caber sem rolagem; emoji no JSON.
- **Seção 1 — conteúdo** (parte de T5.5.1): balão + robô lado a lado (robô maior,
  sobreposto ao quadro via `z-10`/`-mt`); **bico** triângulo-retângulo na lateral
  (`clip-path`); quadro único com fundo branco (`tema.corCaixa`, P-11).
- **Balão de fala** (transversal): negrito é estilo do componente; `**…**` no
  texto marca a **cor de destaque** (`corDestaque`), não o negrito.
- **Header** (`HeaderEscola`): placeholders de logo viram badge na `corPrimaria`
  (mesmo padrão dos dois lados); logos/título reduzidos pra caber em 1 linha.
- **Fonte-base** global 18px (público infantil) em `styles/index.css` — lever
  único de escala geral.
- **Telas próprias:** seção 1 (`Sec01Conteudo/Pergunta/Erro`) já é componente
  próprio (isolado). Seções 2–5 ainda usam o **layout padrão do tipo** (telas-base
  compartilhadas) — viram tela própria quando o print exigir divergência, criando
  `telas/SecNN….jsx` + 1 linha no `registro.js` (zero acoplamento).
- **✅ Erro da pergunta 1 (`Sec01Erro`) — pixel-perfect concluído** (T5.5.2 parcial):
  personagem (pose de erro) na metade direita/topo; balão na 2ª coluna; stack à
  esquerda (meio vertical, gap 12px) com enunciado + opção errada + botão.
  - Novo elemento **`ui/BotaoVoltar.jsx`** (retângulo dourado + borda escura + seta
    azul curva em SVG) — separado do `BotaoAcao` de "Próxima página", que estava
    sendo reusado errado.
  - **Exceção à regra do botão:** aqui o "Volte" fica **no fluxo** (abaixo da opção),
    não no `RodapeAcao` inferior-direito — decisão do usuário para esta tela. A
    regra do canto inferior-direito segue valendo para o CTA primário "Próxima
    página".
  - `tamanhoFonte` passou a ser honrado pela cascata em `BalaoPersonagem` (P-11).

**Pronto quando:** cada tela é visualmente equivalente ao print de `doc/`
(a imagem vence); `npm test`/`lint`/`build` verdes; nenhuma coordenada x/y no JSON.

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
