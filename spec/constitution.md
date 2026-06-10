# Constituição do Projeto — Álbum de Figurinhas Interativo

**Versão:** 2.1
**Data:** 2026-06-10
**Status:** Base para desenvolvimento (Spec-Driven Development)
**SSOT de conteúdo/visual:** as imagens em [doc/](../doc/) (fluxo real do protótipo).

> Este arquivo define os **princípios inegociáveis** do projeto. Ele tem precedência sobre `spec.md` e `plan.md`. Toda decisão de implementação que conflitar com um princípio aqui deve ser revista — não o princípio. Substitui a `quiz-educacional-spec.md` v1.

---

## Princípios

### P-01 — A configuração é a fonte única da verdade
Todo o conteúdo e a aparência de um álbum (textos, cores, ordem das seções, perguntas, opções, figurinhas, troféus) vivem em **um arquivo de configuração JSON por álbum**. Adicionar/alterar uma seção, mudar um texto, uma cor ou uma figurinha **nunca** pode exigir alteração de código. Se exigir, o motor está errado.

### P-02 — Motor genérico que seleciona telas nomeadas
A aplicação é um **motor (engine) que renderiza passos** a partir da config: ele despacha por `tipo`/sub-tela e **seleciona a TELA nomeada** do passo num registro (`components/telas/registro.js`). O motor permanece **genérico** — não conhece telas concretas; ele resolve um nome e busca o componente.

Há **duas faixas** de tela: um **layout PADRÃO por tipo** (capa, boas-vindas, conteúdo, pergunta, troféu, encerramento + sub-fluxo de recompensa), usado como fallback; e **telas próprias, montadas uma a uma**, endereçadas por nome (o `id` do passo, ou `passo.tela`/`passo.telaErro`). Quando o layout de uma tela diverge, ela vira um **componente de tela próprio** — assim ajustar uma tela **nunca afeta as outras** (cada uma é dona do seu posicionamento). Construir o quiz = preencher a config + (quando o layout divergir) adicionar um componente de tela e registrá-lo.

> **Emenda v2.0→v2.1:** a v2.0 dizia "um componente por _tipo_, nunca por tela". Na prática, telas muito diferentes compartilhando um componente acoplavam o layout (mexer numa quebrava outra). A regra agora admite **componentes de tela próprios** selecionados por **nome** — o motor segue genérico e a config segue selecionando **variantes nomeadas, nunca coordenadas** (ver P-11).

### P-03 — Mobile-first é obrigatório
O alvo é tela de celular (~390px de largura). No desktop o conteúdo é exibido centralizado dentro de uma **moldura de smartphone (MobileFrame)**, sem distorção. Nenhuma tela é projetada para desktop largo.

### P-04 — Zero dados do aluno (privacidade por padrão)
Nenhum dado pessoal é solicitado, coletado, armazenado ou transmitido. Sem login, sem cadastro, sem formulário, sem analytics que identifique o aluno. Compatível com a LGPD por design. Não existe tabela de alunos, respostas ou progresso.

### P-05 — Sem estado persistente
O progresso vive apenas em memória durante a sessão. Recarregar a página **reinicia o quiz do começo**. Não usar `localStorage`/`sessionStorage`/cookies para progresso.

### P-06 — Conteúdo protegido
O colégio recebe **apenas um link**. Config e assets não são editáveis pelo colégio e não há painel de administração no produto. O gerenciamento (escolas, logos, vínculo de álbum) é feito por nós, direto no Supabase Studio.

### P-07 — Escalabilidade sem código
- **Novo colégio:** inserir 1 linha na tabela `escolas` + subir a logo. Zero deploy.
- **Liberar um álbum para um colégio:** inserir 1 linha em `escola_albuns`. Um colégio pode ter **vários álbuns**, liberados individualmente (ex.: pagou pelo 1 e 2, o 3 fica bloqueado). Zero deploy.
- **Novo álbum/tema:** criar 1 arquivo JSON + a pasta de assets correspondente. Zero alteração nos componentes existentes.

### P-11 — Cores na config; layout no componente (sem CSS-em-JSON)
**Cores e tipografia** de cada tela são definidas na config, por cascata `tema` (global) → `passo.estilo` → `elemento.estilo` — nenhuma cor de conteúdo é fixada no JSX. **Layout e posição, ao contrário, vivem no componente de tela** (Tailwind/JSX): os **elementos** (`components/ui/`: balão, opção, enunciado, personagem, botão…) são átomos **puros** (recebem texto + cores, **sem posição embutida**), e a **tela** (`components/telas/`) compõe esses átomos posicionando-os. A config só seleciona **variantes nomeadas** — qual tela renderizar (`passo.tela`/`passo.telaErro`) e variantes discretas de elemento (ex.: personagem `esquerda|direita`). **Proibido posicionamento livre em JSON** (âncora/x/y/rotação/z-index) — é o anti-padrão *inner-platform* (reimplementar CSS em JSON). Variação de layout que não couber no layout padrão do tipo vira **tela própria** (montada uma a uma); telas únicas (capa, boas-vindas, encerramento) são componentes feitos à mão.

### P-08 — Não punitivo
Tentativas ilimitadas por pergunta. Errar nunca bloqueia o avanço nem retira recompensa. A recompensa é **garantida** ao acertar, independente de quantas tentativas foram necessárias.

### P-09 — Navegação por botão, sem animação obrigatória
A transição entre passos é **troca direta de componente** acionada por botão (o botão padrão é "Próxima página"). Animações não fazem parte do escopo da base; arte comemorativa (ex.: fundo de fogos na revelação da figurinha) é **imagem estática**, não animação.

### P-10 — Custo inicial zero
Stack fixa em planos gratuitos: **React + Vite + Tailwind** (front), **Vercel** (host/CDN), **Supabase** (config das escolas), **Cloudinary** (logos). Trocar qualquer peça da stack é uma emenda à constituição, não uma decisão de implementação.

---

## Governança

- **Hierarquia:** `constitution.md` > `spec.md` > `plan.md` > código.
- **Emendas:** qualquer mudança em um princípio exige atualizar este arquivo, subir a versão e registrar a data. Mudanças de requisito que não tocam princípios vão para `spec.md`; mudanças técnicas, para `plan.md`.
- **SSOT visual:** em caso de divergência entre texto da spec e as imagens em [doc/](../doc/), **as imagens vencem** até que a spec seja corrigida.

### Histórico de emendas
- **v2.1 (2026-06-10):** P-02 reescrito — motor genérico passa a **selecionar telas nomeadas** (layout padrão por tipo + telas próprias montadas uma a uma); P-11 ajustado para separar **elementos puros** (`ui/`) de **telas** (`telas/`). Motivação: telas muito diferentes compartilhando um componente acoplavam o layout (ajustar uma quebrava outra). Decisão do usuário.
