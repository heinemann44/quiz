# Especificação — Álbum de Figurinhas Interativo (ECA Digital)

**Versão:** 2.1
**Data:** 2026-06-07
**Depende de:** [constitution.md](./constitution.md)
**Detalhamento técnico em:** [plan.md](./plan.md)
**SSOT:** imagens em [doc/](../doc/)

---

## 1. Visão geral

Produto educacional mobile, vendido para colégios. Cada colégio recebe um **link exclusivo** com a sua própria logo. O aluno acessa o link e percorre um **álbum de figurinhas interativo**: uma sequência de seções com conteúdo educativo e perguntas; ao acertar (ou ao concluir uma seção informativa) ele **revela uma figurinha**, e em pontos específicos ganha um **troféu** que contém uma **letra ou número do "código secreto"**. Ao final vê a tela de encerramento com o resumo do código conquistado.

O produto tem **3 álbuns** (temas) independentes — este projeto entrega o **Álbum 1 (ECA Digital)** e a base reaproveitável para os Álbuns 2 e 3. O aluno interage **sem cadastro nem identificação**.

> Correção importante em relação à v1: o que a v1 chamava de "3 quizzes/temas" são os **3 álbuns**. Dentro de um álbum existem várias **seções**. As pastas `doc/tema-1..tema-5` são as **seções do Álbum 1**, não álbuns diferentes.

---

## 2. Glossário

| Termo | Significado |
|---|---|
| **Álbum (tema)** | Um quiz completo, definido por um arquivo de config. Ex.: ECA Digital = Álbum 1. |
| **Seção** | Um trecho do álbum (ex.: "seção 01"). Costuma ter uma tela de conteúdo + uma pergunta. |
| **Passo** | Unidade atômica do motor (item do array `passos` da config). Cada passo tem um `tipo`. |
| **Figurinha** | Recompensa colecionável, **numerada globalmente** no álbum (01, 02, …). Revelada em 2 telas: card e tela cheia. |
| **Troféu** | Recompensa especial que carrega **um valor do código secreto** (uma letra OU um número). |
| **Código secreto** | Conjunto de letras/números dos troféus. Junta-se ao dos outros álbuns para um certificado (fora de escopo). |
| **Coleção** | O conjunto dos álbuns (1, 2, 3). Um colégio pode ter um ou mais álbuns liberados. |
| **Escola/colégio** | Cliente. Define a logo e **quais álbuns** estão liberados, via `escolas` + `escola_albuns`. |
| **Seletor de álbuns** | Tela que lista os álbuns liberados do colégio quando ele tem mais de um (hub da coleção). |
| **Consultoria** | Nós (donos do produto). Logo fixa no canto superior direito. |

---

## 3. Atores

- **Aluno (anônimo):** acessa o link, percorre o álbum. Não se identifica.
- **Operador (nós):** cadastra escolas e logos no Supabase, cria configs de álbum. Não há painel no produto.

---

## 4. Fluxo macro (derivado das prints)

```
/quiz/:escolaId  → resolve colégio + álbuns liberados
  ├─ 0 álbuns liberados → [Indisponível]
  ├─ 1 álbum liberado   → entra direto nesse álbum ↓
  └─ 2+ álbuns liberados → [Seletor de álbuns] (lista liberados; bloqueados = "🔒")
                              ↓ aluno escolhe um álbum
─────────────────── (a partir daqui, dentro de um álbum) ───────────────────
[Capa]  doc/inicio/home.png
  ↓ "Próxima página"
[Boas-vindas]  doc/inicio/boas-vindas.png   (texto da missão + explicação do código secreto)
  ↓ "Próxima página"
┌─ por SEÇÃO, na ordem da config ────────────────────────────────────┐
│ [Conteúdo/intro]  doc/tema-N/tema-N.png   (mascote + balão + caixa) │
│   ↓ "Próxima página"                                                │
│ [Pergunta]  doc/tema-N/pergunta-N.png     (balão + enunciado + opções)
│   ├─ resposta ERRADA → [Erro] doc/tema-N/errado-N.png              │
│   │     (opção errada marcada com X) ↓ "Volte" → volta p/ Pergunta │
│   └─ resposta CERTA → concede figurinha ↓                          │
│ [Revelação da figurinha — card]  doc/tema-N/correto-N.png          │
│   ↓ "Próxima página"                                               │
│ [Figurinha em tela cheia]  doc/tema-N/figurinha-N.png              │
│   ↓ "Próxima página"                                               │
│ (seção pode ter também um bloco INFORMATIVO que concede +1 figurinha)
│  [Informativo] doc/tema-4/informativo-tema-4.png "Abrir figurinha" │
│   → [Revelação] → [Figurinha cheia]                                │
│ (em pontos definidos na config:)                                   │
│  [Troféu]  doc/trofeu/trofeu-N.png  (letra/número + "anote!")      │
│   ↓ "Próxima página"                                               │
└────────────────────────────────────────────────────────────────────┘
  ↓ (última seção concluída)
[Encerramento]  doc/fim/encerramento.png  (resumo do código secreto)
```

---

## 5. Tipos de tela / passo

O motor conhece um conjunto **pequeno e fechado** de tipos. Cada print do fluxo é uma instância de um destes tipos — por isso **não é necessário especificar tela a tela** (P-02). O schema de cada tipo está em [plan.md](./plan.md#5-schema-do-arquivo-de-configuração).

| Tipo de passo | Print de referência | O que mostra | Saída |
|---|---|---|---|
| `capa` | `inicio/home.png` | Fundo ilustrado, logo da escola (sup. esq.), logo consultoria (inf. dir.), título/álbum | botão "Próxima página" |
| `boas-vindas` | `inicio/boas-vindas.png` | Texto corrido da missão e explicação do código secreto | botão "Próxima página" |
| `conteudo` | `tema-N/tema-N.png`, `tema-4/informativo-tema-4.png` | Personagem + balão + uma ou mais caixas de texto (com **negrito**). Pode **conceder figurinha** | botão ("Próxima página" ou "Abrir figurinha") |
| `pergunta` | `tema-N/pergunta-N.png` | Personagem + balão + enunciado + **2 a 3 opções** (rótulos A/B/C **ou** Sim/Não). Concede figurinha ao acertar | seleção de opção |
| *(sub) erro* | `tema-N/errado-N.png` | Reexibe enunciado, marca a opção escolhida com **X vermelho**, balão de encorajamento | botão "Volte" → volta à pergunta |
| *(sub) revelação* | `tema-N/correto-N.png` | Header "Álbum de Figurinhas", "Figurinha Nº NN", card sobre fundo comemorativo | botão "Próxima página" |
| *(sub) figurinha cheia* | `tema-N/figurinha-N.png` | Figurinha em tamanho máximo + título + legenda do capítulo, contador de figurinhas | botão "Próxima página" |
| `trofeu` | `trofeu/trofeu-N.png` | Imagem do troféu + valor (letra/número) + "anote!" | botão "Próxima página" |
| `encerramento` | `fim/encerramento.png` | Texto de conclusão + resumo do código secreto conquistado | terminal |

**Header (faixa superior):** logo da escola à esquerda, título da seção ao centro, logo da consultoria à direita. Nas telas de figurinha/álbum a faixa muda para o tema "Álbum de Figurinhas" e exibe o **contador de figurinhas**.

---

## 6. Requisitos funcionais

- **RF-01 — Acesso por link exclusivo.** O aluno acessa via `/quiz/:escolaId`. O sistema busca no Supabase os dados do colégio (logo) e a lista de **álbuns liberados**. Com **1** álbum liberado, entra direto nele; com **2+**, exibe o **seletor de álbuns**. Deep link direto a um álbum: `/quiz/:escolaId/:albumId`.
- **RF-01a — Seletor de álbuns.** Quando o colégio tem mais de um álbum, o seletor lista os **álbuns liberados** (clicáveis) e mostra os **não liberados como bloqueados** ("🔒 / em breve"), sem permitir entrar. A logo do colégio e a da consultoria aparecem no seletor.
- **RF-01b — Álbum bloqueado/inexistente.** Acessar `/quiz/:escolaId/:albumId` de um álbum **não liberado** para aquele colégio exibe mensagem amigável de "álbum não disponível" (não revela se o álbum existe). `albumId` sem config válida → tela de não encontrado.
- **RF-02 — Logos no header.** Logo do colégio sempre no canto superior esquerdo; logo da consultoria fixa no canto superior direito, em todas as telas com header.
- **RF-03 — Sequência de passos vinda da config.** A ordem, a quantidade e o tipo de cada passo são definidos no JSON do álbum. O motor renderiza na ordem do array `passos`.
- **RF-04 — Pergunta de múltipla escolha com nº variável de opções.** Uma pergunta tem de **2 a 3 opções**. Os rótulos podem ser **A/B/C** ou **Sim/Não** (definidos na config). Exatamente uma é correta.
- **RF-05 — Comportamento no erro.** Ao escolher a opção errada, exibe a tela de erro: reexibe o enunciado, **marca a opção escolhida com X vermelho** e mostra balão de encorajamento (com **pose própria** do personagem). Botão "Volte" retorna à pergunta. **Tentativas ilimitadas.**
  - **RF-05a — Erro alternativo por pergunta (emenda v2.1).** Uma pergunta pode, via config (`aoErrar`), substituir a tela de erro padrão por **voltar ao conteúdo da seção** para reler — sem penalidade, mantendo as tentativas ilimitadas. Caso real na SSOT: `doc/tema-5/pergunta-5` não tem tela de erro e o balão da seção indica onde está a resposta. A imagem vence (constituição §SSOT visual); telas Sim/Não que não cabem na lista de opções usam **variante nomeada** de layout (P-11), não coordenadas no JSON.
- **RF-06 — Recompensa de figurinha em 2 telas.** Ao acertar uma pergunta, o aluno revela a figurinha: primeiro o **card** ("Figurinha Nº NN" sobre fundo comemorativo), depois a **figurinha em tela cheia** (título + legenda do capítulo). Só então avança.
- **RF-07 — Seção informativa que concede figurinha.** Um passo `conteudo` pode ter o botão "Abrir figurinha" e conceder uma figurinha, disparando o mesmo sub-fluxo de revelação (ex.: `tema-4/informativo-tema-4` → figurinha 05).
- **RF-08 — Figurinhas numeradas globalmente.** As figurinhas do álbum são numeradas em sequência contínua (01…06 no Álbum 1), independente de virem de pergunta ou de conteúdo informativo.
- **RF-09 — Contador de figurinhas.** As telas de álbum/figurinha exibem um contador do total de figurinhas já conquistadas na sessão.
- **RF-10 — Troféu com letra/número do código.** Em pontos definidos na config, um passo `trofeu` exibe a imagem do troféu e **um valor** — uma **letra** (ex.: "S") **ou** um **número** (ex.: "2") — com a instrução "anote!". O valor e o tipo são fixos na config.
- **RF-11 — Tela de encerramento.** Ao concluir o último passo, exibe o encerramento ("Missão cumprida… por enquanto") com o **resumo do código secreto** (letras e números) conquistado no álbum e o gancho para o próximo álbum.
- **RF-12 — Reinício ao recarregar.** Recarregar a página reinicia o álbum do começo (sem persistência).
- **RF-13 — Sem identificação do aluno.** O aluno começa direto, sem qualquer formulário.
- **RF-14 — Link inativo.** Se `ativo = false` na escola, exibir mensagem amigável de indisponibilidade, sem revelar detalhes do sistema.
- **RF-15 — Escola inexistente.** `escolaId` não encontrado → tela de "não encontrado" amigável (sem stack trace nem detalhes técnicos).
- **RF-16 — Cores configuráveis por tela; layout por variantes.** Cada passo pode definir, via config, as **cores** (fundo da tela, fundo/texto/bico do balão, cor da letra, cor do círculo e texto de cada opção, cor do botão, fundo/texto das caixas de conteúdo), resolvidas pela cascata `tema` → `passo.estilo` → `elemento.estilo`. O **layout/posição** não vai para a config: é do componente do tipo, selecionado por **variantes nomeadas** (ex.: personagem `esquerda|direita`, balão `topo|lateral`). Não há posicionamento livre em JSON (P-11). Detalhe em [plan.md §5.2](./plan.md#52-estilo-cascata-e-variantes-de-layout).

---

## 7. Requisitos não funcionais

- **RNF-01 — Mobile-first.** Layout ~390px; no desktop, centralizado em `MobileFrame`, sem distorção. (P-03)
- **RNF-02 — Sem animações na base.** Transições por troca direta de componente; arte comemorativa é estática. (P-09)
- **RNF-03 — Performance / pré-carregamento.** Carregamento inicial rápido; assets do álbum (personagens, figurinhas, fundos) **pré-carregados** ao iniciar para evitar flashes entre passos.
- **RNF-04 — Conteúdo protegido.** Sem painel para o colégio; config/assets não editáveis por ele. (P-06)
- **RNF-05 — Escalabilidade.** Novo colégio = 1 linha + logo; novo álbum = 1 JSON + assets. (P-07)
- **RNF-06 — Privacidade.** Zero dados de aluno; LGPD by design. (P-04)
- **RNF-07 — Disponibilidade.** Vercel + CDN global, sem configuração extra.
- **RNF-08 — Acessibilidade básica.** Contraste legível, `alt` em imagens significativas, alvos de toque ≥ 44px. Acessibilidade avançada (leitor de tela completo) fica fora do escopo da base.

---

## 8. Regras de negócio

- **RN-01 — Um colégio, um ou mais álbuns.** Cada colégio pode ter de 1 a N álbuns liberados, definidos por nós no Supabase (uma linha em `escola_albuns` por álbum liberado); o colégio não altera esse vínculo.
- **RN-01a — Liberação por pagamento.** Um álbum só fica acessível ao colégio quando há linha correspondente em `escola_albuns` com `liberado = true`. Reflete o que o colégio pagou (ex.: pagou 1 e 2, o 3 fica bloqueado). Liberar/revogar é trocar essa linha — sem deploy.
- **RN-02 — Logo obrigatória.** Todo link tem uma logo de colégio. Sem logo válida, exibir placeholder neutro (não quebrar a tela).
- **RN-03 — Tentativas ilimitadas.** Pode errar quantas vezes quiser e sempre terá chance de acertar. (P-08)
- **RN-04 — Recompensa garantida.** A figurinha é concedida toda vez que acerta, independente do nº de tentativas.
- **RN-05 — Troféu garantido.** O troféu/valor do código é concedido ao alcançar o passo de troféu; independe de tentativas anteriores.
- **RN-06 — Código secreto fixo.** Letras e números dos troféus são definidos na config e iguais para todos os alunos; nunca aleatórios.
- **RN-07 — Certificado fora de escopo.** A troca do código secreto (somando os 3 álbuns) por certificado é um fluxo externo, fora deste projeto.
- **RN-08 — Link inativo discreto.** `ativo = false` mostra indisponibilidade genérica, sem expor o sistema.

---

## 9. Fora de escopo (nesta versão)

Login/cadastro de aluno · ranking ou relatórios por colégio · painel administrativo no produto (gestão é via Supabase Studio) · geração de certificado / troca do código secreto · modo offline/PWA · acessibilidade avançada (leitores de tela) · timer por pergunta · animações · mais de 3 opções por pergunta · edição de conteúdo pelo colégio.

---

## 10. Critérios de aceite da BASE

A base é considerada pronta quando, **com o Álbum 1 configurado**:

1. `/quiz/:escolaId` resolve o colégio e seus álbuns liberados: com 1, entra direto; com 2+, mostra o **seletor** (liberados clicáveis, bloqueados com 🔒); `/quiz/:escolaId/:albumId` faz deep link e barra álbum não liberado. Logo da escola e da consultoria no header.
2. O motor percorre todos os **tipos de passo** (capa, boas-vindas, conteúdo com e sem figurinha, pergunta, troféu, encerramento) **lendo só a config** — nenhum texto/cor/imagem hard-coded.
3. Pergunta suporta **2 e 3 opções** e rótulos **A/B/C** e **Sim/Não**.
4. Erro mostra **X na opção escolhida** e botão "Volte"; acerto dispara **revelação → figurinha cheia**; tentativas ilimitadas.
5. Figurinhas são numeradas globalmente; o **contador** reflete o total conquistado.
6. Troféu mostra **letra/número**; o **encerramento** resume o código secreto da sessão.
7. Recarregar reinicia do começo; `ativo = false` e escola inexistente mostram telas amigáveis.
8. Funciona em ~390px e centralizado no `MobileFrame` no desktop.
9. Um passo com `estilo` na config renderiza com cores próprias (balão, letra, opções, botão) sem tocar em código; sem override, cai no `tema`. Variação de layout usa variante nomeada (ex.: personagem `esquerda|direita`), não coordenadas no JSON.

Atingida a base, novas seções/figurinhas/troféus e os Álbuns 2 e 3 entram **só editando/criando JSON + assets** — que é como você montará as telas restantes uma a uma com auxílio da IA.
