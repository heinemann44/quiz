# CLAUDE.md

> Este arquivo é só um ponteiro. As instruções operacionais do projeto vivem em
> **[AGENTS.md](./AGENTS.md)** — mantidas em formato universal para funcionar em
> qualquer agente (Claude Code, Codex, Cursor…). **Leia o AGENTS.md antes de
> qualquer tarefa.**

@AGENTS.md

---

Regra de ouro deste repositório: **contexto antes de comando.** Antes de escrever
código, carregue a hierarquia de verdade e *pergunte/planeje*, não dispare um
"one-shot prompt".

1. **`spec/constitution.md`** — princípios inegociáveis (P-01…P-11). Vencem tudo.
2. **`spec/spec.md`** — requisitos (RF/RNF) e critérios de aceite.
3. **`spec/plan.md`** — arquitetura, schema da config, estrutura de pastas, fases.
4. **`doc/`** — **SSOT visual**: os prints do protótipo. Em divergência entre
   texto da spec e imagem, **a imagem vence** (até a spec ser corrigida).

Detalhe operacional, fluxo de trabalho, definição de "pronto" e o que conta como
bug: tudo em **[AGENTS.md](./AGENTS.md)**.
