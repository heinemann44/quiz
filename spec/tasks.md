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
| 5.5 | Fidelidade visual (telas montadas uma a uma · pixel-perfect) | ✅ concluída |
| 6 | Deploy + validação | ✅ validada em `hml` (go-live `prd` pendente) |
| 7 | Replicação (Álbuns 2 e 3) | ⏳ reestruturação feita; conteúdo pendente |
| 8 | Backoffice (admin) | ✅ concluída |

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

## Fase 5.5 — Fidelidade visual: telas montadas uma a uma (pixel-perfect)   ✅ concluída

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
- [x] T5.5.1 Layout das telas de **conteúdo** (`doc/tema-N`): cada seção virou tela
  própria (`SecNNConteudo`) — personagem posicionado, balão com bico, caixa(s).
- [x] T5.5.2 Layout das telas de **pergunta** e **erro** (`pergunta-N`/`errado-N`):
  `SecNNPergunta` + `SecNNErro` por seção, com pose de erro e cores próprias.
- [x] T5.5.3 Telas de **figurinha** (`Figurinha`/`FigurinhaCheia`): card e figurinha
  cheia sobre o fundo comemorativo, header ajustado (contador removido a pedido).
- [x] T5.5.4 **Capa**, **boas-vindas**, **troféu** (`Sec03Trofeu`/`Sec05Trofeu`),
  **encerramento** e os **balões** (`Sec05Pergunta`) batendo com os prints.
- [x] T5.5.5 Conferência em ~390px no `MobileFrame` (P-03); extensões nomeadas onde
  faltou (`oval`/`bicoTopo` no balão, `corRotuloTexto`, `children` na caixa) — P-11.

**⚖️ Regra (exceção a "a imagem vence"):** a **posição do botão de ação** é fixa —
canto **inferior-direito**, 16px, via `RodapeAcao` — e **prevalece sobre os prints**
em todas as telas. Não reposicionar o botão pra imitar `doc/`.

**Notas de implementação (concluído — Álbum 1 inteiro como telas próprias):**
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
- **Telas próprias (todas as 5 seções):** `SecNNConteudo/Pergunta/Erro` + troféus
  (`Sec03/Sec05Trofeu`), informativo (`Sec04Informativo`) e balões (`Sec05Pergunta`)
  — cada uma registrada por id em `registro.js`, isolada (ajustar uma não afeta as
  outras). Telas-base por tipo seguem como fallback p/ dev/preview e álbuns futuros.
- **Padrões próprios por tela:** seção 4 informativo (personagem grande à esquerda +
  box escuro ao lado + box azul largo; balão **oval** inclinado); seção 5 conteúdo
  (caixa no topo, personagem colado abaixo) e pergunta (balão de fala desenhado na
  tela, Sim/Não sobrepostos ao personagem). Erros 3 e 4 com arranjo invertido.
- **Encerramento:** resumo do código secreto migrou para parágrafos na config
  (sem bloco fixo no componente); fonte reduzida.
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

**🧪 Como testar:** `npm run dev` → **`/quiz/colegio-demo/eca-digital`**. Caminhe
capa → boas-vindas → **5 seções** (cada conteúdo/pergunta/erro como tela própria;
erre uma pergunta e confira a pose de erro + "Volte" no fluxo) → figurinhas 01–06
(card → cheia ampliada) → troféus **"S"** e **"2"** (faixa branca, fundo
`trofeu-1.png`) → seção 5 balões **Sim/Não** (errar "Não" volta ao conteúdo) →
encerramento com o resumo do código nos parágrafos. Confira em ~390px no
`MobileFrame`. Automático: `npm test` (68 verdes).

**Concluída:** ✅ 2026-06-11 · commits `16e3091`→`42c6357` (5 seções + encerramento
como telas próprias por id) · 68 testes verdes · logo da consultoria segue placeholder.

---

## Fase 6 — Deploy + validação   ✅

**Objetivo:** deploy Vercel (via GitHub) + env vars no painel; validação com escola
fictícia. (plan §8.7) **Depende de:** Fase 5.

**Decisões da abertura (2026-06-11):** deploy **GitHub → Vercel** (o usuário liga o
repo no painel); validação **só em `hml`** (Preview); env vars no **padrão do plan**
(só a anon key no front, P-10; schema por ambiente).

**Tarefas (preparo de código — feito pelo agente):**
- [x] **`vercel.json`** com SPA rewrite (`/(.*) → /index.html`). Sem ele os deep
      links `/quiz/:escolaId/:albumId` dão 404 ao recarregar/abrir direto. Rewrite
      roda **após** o filesystem na Vercel → assets e build seguem servidos diretos.
- [x] **`hml` populado** via MCP com as 4 escolas fictícias (mesmos 5 desfechos do
      seed `dev`: direto, seletor, sem-álbuns, inativo). Project
      `slrsvoyyegqyeuhkzutz`.
- [x] `npm run build` / `lint` / `test` (68) verdes; `get_advisors security` sem alertas.

**Tarefas (ação do usuário no painel — fora do código):**
- [x] Conectar `heinemann44/quiz` na Vercel (framework autodetectado: Vite).
- [x] Env vars (Settings → Environment Variables):
      - `VITE_SUPABASE_URL` = `https://slrsvoyyegqyeuhkzutz.supabase.co`
      - `VITE_SUPABASE_ANON_KEY` = anon key (legacy JWT `eyJ...`) — **só a anon key** (P-10)
      - `VITE_SUPABASE_SCHEMA` = `prd` (Production) · `hml` (Preview)
- [x] **Validado na Preview (`hml`)** — branch `homolog`. Fluxo ponta a ponta OK no
      aparelho após os ajustes de responsividade abaixo.

**Ajustes de responsividade (no celular real, sobre a Preview/hml):**
- [x] **Barras laterais no celular:** `MobileFrame` virou coluna **fluida**
      (`w-full`) com teto `sm:max-w-[390px]` só no desktop. (commit `f500986`)
- [x] **Botão cortado no celular:** `min-h-screen` → `min-h-dvh` (o `100vh` do
      Chrome Android ignora a barra de URL e empurrava o `RodapeAcao` pra fora).
- [x] **Telas pixel-perfect refeitas em proporção da largura** (% no lugar de px
      fixos), pra acompanhar a coluna fluida sem quebrar a composição: `Sec01Conteudo`
      (balão+personagem em grid/camadas), `Sec04Informativo` (Inanna em fluxo → 2º
      parágrafo abaixo dela), `Sec05Pergunta`.

**🧪 Como testar (após o deploy):** abra um deploy **Preview** (qualquer branch/PR ≠
`main` → usa `VITE_SUPABASE_SCHEMA=hml`). Na URL `…vercel.app`:
- `/quiz/colegio-demo` → entra **direto** no álbum `eca-digital` (1 liberado).
- `/quiz/colegio-multi` → **seletor** (2 liberados + 1 🔒 bloqueado).
- `/quiz/colegio-sem-albuns` → **indisponível** (sem vínculos).
- `/quiz/colegio-inativo` → **indisponível** (escola inativa vence).
- `/quiz/colegio-xyz` → **não encontrado** (RF-15).
- **Deep link + reload:** abra `/quiz/colegio-demo/eca-digital` direto e **recarregue
  (F5)** — tem que carregar a tela, não 404 (valida o `vercel.json`).
- Caminhe o Álbum 1 ponta a ponta em ~390px no `MobileFrame`.

**Pendente para PRODUÇÃO (go-live — fora do escopo da validação):** popular o
schema `prd` com as escolas reais e apontar a Production (push em `main`). A
Production hoje usa `prd` (vazio) → mostra "indisponível" até o seed real. Decidir
no go-live (pode acompanhar a Fase 7).

**Concluída (validação):** ✅ 2026-06-11 · commits `a4101fc` (vercel.json + seed hml)
→ `f500986` (responsividade no celular) · Preview/`hml` validada ponta a ponta no
aparelho · 68 testes verdes. _Go-live em `prd` pendente (ver acima)._

---

## Fase 7 — Replicação   ⏳

**Objetivo:** Álbuns 2 e 3 (mesmo tema **ECA Digital**) = novo JSON + assets +
telas próprias por álbum. (plan §8.8)
**Depende de:** Fase 6.

**Decisões da abertura (2026-06-21):**
- **Identidade:** tema ≠ álbum. O id passa a carregar o número:
  `eca-digital-1` (era `eca-digital`), `eca-digital-2`, `eca-digital-3`.
- **Telas:** os álbuns 2/3 **divergem por seção** (não reusam o layout do 1) →
  telas próprias **escopadas por álbum** (sem colisão de id).

**Reestruturação (pré-requisito — feita pelo agente):**
- [x] **Telas namespaced por álbum:** as 17 telas próprias do Álbum 1 foram para
  `src/components/telas/eca-digital-1/` + `registro.js` do álbum. O registro
  central virou **escopado por `albumId`** (`TELA_POR_ALBUM` + `TELA_COMPARTILHADA`
  + `TELA_POR_TIPO`); o `Renderer` lê o `albumId` do `AlbumContext`. Mexer numa
  tela/álbum não afeta os outros; os ids `sec01-…` agora valem **por álbum**.
- [x] **Renomeação `eca-digital` → `eca-digital-1`:** JSON (`albumId`,
  `assetsBasePath`), pasta de assets, `index.js`, `seed.sql`, testes e migration
  `0006` (renomeia `escola_albuns.album_id` em dev/hml/prd — idempotente).
- [x] **Scaffold dos álbuns 2/3:** `public/assets/eca-digital-2|3/README.md` com a
  convenção; extensão documentada no `registro.js` e no `index.js`.
- [x] `npm test` (76) / `lint` / `build` verdes.

### Álbum 2 (`eca-digital-2`) — ⏳ em construção, TELA A TELA

**Abordagem (diferente do álbum 1):** sem prints em `doc/` — o usuário **descreve o
layout** em texto, fornece o **conteúdo** e dropa os **assets** em
`public/assets/eca-digital-2/`, uma tela por vez. Liberado p/ `colegio-multi`
(dev+hml): deep link `/quiz/colegio-multi/eca-digital-2`. Numeração de seção
**contínua na coleção** (álbum 2 começa em **"seção 06"** no `tituloHeader`).

- [x] **Capa** (tela-base `Capa`, `fundos/capa.jpg`, `corFundo #080424`).
- [x] **Boas-vindas** (tela-base, texto da missão; realce/⭐ como o álbum 1).
- [x] **Seção 1 — conteúdo** (`telas/eca-digital-2/Sec01Conteudo`): enunciado em
  quadro branco/preto no topo; personagem esq + balão dir com bico no topo. Art. 8.
- [x] **Seção 1 — pergunta** (`Sec01Pergunta`): balão no topo, personagem central,
  opções em balão **hexagonal** (átomo novo `ui/OpcaoHexagono`) ancoradas às bordas,
  sobrepostas à personagem. Correta = "Deve aparecer no início do acesso".
- [x] **Figurinha nº 07** (arquivo `figurinhas/01.jpg`; numeração é **global na
  coleção** — álbum 1 usou 01–06): revelação em 2 telas (telas-base `card→cheia`)
  com `fundoComemoracao=fundo-figurinha.png` e `headerFigurinha` (banner). Arte
  autossuficiente — motor só exibe.
- [ ] **Erro provisório**: pergunta 1 está `aoErrar: "voltar-conteudo"` — definir o
  erro de fato (tela de erro dedicada? reler?).
- [ ] **Tela-card** mostra o rótulo "Figurinha Nº 01" sobre a arte (que já tem
  cabeçalho próprio) — decidir se vira tela-card própria do álbum 2.
- [ ] **Seções 7+** (conteúdo/pergunta/figurinha 02–09), **troféus/código secreto**
  (a figurinha traz um "2" no canto → há troféu nesse ponto?), **encerramento**.

### Álbum 3 (`eca-digital-3`) — ⬜ não iniciado
Novo JSON + telas próprias (`telas/eca-digital-3/`) + assets + 1 linha no `index.js`
e em `TELA_POR_ALBUM` + liberação por colégio.

> Se a base exigir **código de motor** novo (não só tela/JSON), é gap → voltar à fase certa.

**Concluída:** —

---

## Fase 8 — Backoffice (admin)   ✅

**Objetivo:** painel `/admin` (mesmo app, fora do `MobileFrame`) para o CRUD de
**colégios**, dos **álbuns liberados** por colégio (com o **link de acesso**) e da
**logo** do colégio. Escopo enxuto ("só o necessário"). **Emenda E-02.**

**Decisões da abertura (2026-06-11):**
- **Auth:** Supabase Auth **e-mail/senha**; usuários admin criados no painel.
- **Catálogo de álbuns:** vem do **código** (`config/albuns/*.json`) — álbum segue
  SSOT em JSON (P-01); backoffice só liga/desliga e ordena por colégio.
- **Local:** rotas `/admin/*` no **mesmo app**, atrás de login, fora do `MobileFrame`.
- **Segurança (inegociável):** escrita só para `authenticated` (RLS por role); a
  anon key segue só-leitura. P-04/P-05 valem para o app do **aluno**, não pro admin.

**Tarefas:**
- [x] Migration `0005`: policies de escrita (`authenticated`) em `escolas` +
      `escola_albuns` (dev/hml/prd) e no bucket `logos`. Aplicada via MCP.
- [x] Helpers puros + teste: `listarAlbuns()` (catálogo) e `linkDeAcesso(escolaId)`.
- [x] `services/auth.js` (entrar/sair/sessão) e `services/adminRepo.js` (CRUD
      escolas, vínculos, logo) — embrulhando o Supabase (DI, AGENTS §Dependências).
- [x] UI `/admin`: login → lista de colégios → edição (nome/ativo, logo
      upload/remover, álbuns liberados + ordem, link copiável).
- [x] `App.jsx`: `/admin/*` fora do `MobileFrame`; guard de sessão.

**Insumo do usuário:** criar o 1º usuário admin no painel do Supabase
(Authentication → Users) — e-mail/senha. Sem isso não há login.

**Armadilhas resolvidas no diagnóstico do upload de logo (403 RLS):**
- **Client singleton (HMR):** o client do supabase-js virou singleton em
  `globalThis` — com `let` de módulo o hot-reload recriava instâncias do GoTrue e
  a sessão sumia no request de Storage (ia como anon).
- **Policy de SELECT é obrigatória no upsert:** o upload usa `x-upsert`
  (INSERT…ON CONFLICT) e o `remove()` exigem que a linha seja **visível** —
  removê-la (pra calar o advisor "public bucket listing") quebrava o upsert e
  fazia o remove virar no-op silencioso. Restaurada e documentada no `0005`.
- **Cache da logo:** o arquivo é versionado (`<id>-<timestamp>.<ext>`) — URL nova
  a cada troca, senão browser/CDN serviam a imagem antiga (max-age 3600).
- _Nota: a troca da signing key do projeto p/ HS256 foi feita no diagnóstico mas
  NÃO era a causa (as escritas PostgREST já passavam com ES256). Reversível._

**🧪 Como testar:** `npm run dev` → `/admin`. Login (admin criado no painel) →
lista de colégios → **+ Novo** (slug+nome) → editar: trocar nome/ativo, **logo**
(clicar na imagem → enviar/trocar/remover), **álbuns** (Não incluído/Liberado/
Bloqueado 🔒 + ordem), **link** copiável. Salvar reflete em `/quiz/:escolaId`.

**Concluída:** ✅ 2026-06-12 · backoffice `/admin` funcional (CRUD colégios +
vínculos + logo no Storage) validado no dev. Migration `0005`; services `auth`/
`adminRepo`; UI em `paginas/admin` + `components/admin`.
