# Quiz Educacional — Documento de Especificação do Projeto

**Versão:** 1.0  
**Data:** Junho 2026  
**Status:** Base para desenvolvimento inicial

---

## 1. Visão Geral

Sistema de quiz educacional mobile-first, comercializado para colégios, onde cada instituição recebe um link exclusivo com sua própria logo. O produto consiste em 3 quizzes temáticos independentes, com perguntas, recompensas e assets visuais próprios por tema. O aluno interage livremente sem necessidade de cadastro ou identificação.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Plano gratuito |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS | — |
| Hospedagem | Vercel | Hobby (gratuito) |
| Banco de dados | Supabase | Free tier (500MB) |
| Armazenamento de logos | Cloudinary | Free tier (25GB) |

### Critérios de escolha
- Custo inicial zero
- Escalável mediante upgrade dos planos
- Deploy automatizado via Vercel + GitHub
- Sem necessidade de servidor próprio no início

---

## 3. Arquitetura Geral

```
Aluno acessa link exclusivo
        ↓
seudominio.com/quiz/[id-colegio]
        ↓
React busca configuração no Supabase
(nome do colégio, logo_url, tema do quiz)
        ↓
Quiz carrega com logo e tema corretos
        ↓
Nenhum dado do aluno é armazenado
```

### Estrutura de rotas
```
/quiz/:escolaId        → Quiz do colégio (rota pública)
/                      → Página de apresentação do produto (opcional)
```

### Gerenciamento interno (você)
- Feito diretamente pelo Supabase Studio (interface visual sem necessidade de painel próprio)
- Cadastro de escolas, logos e temas por você

---

## 4. Modelo de Dados

### Tabela: `escolas`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | text (PK) | Slug único da escola (ex: `colegio-abc`) |
| `nome` | text | Nome de exibição da escola |
| `logo_url` | text | URL da logo no Cloudinary |
| `quiz_tema` | text | Identificador do tema (`eca`, `tema2`, `tema3`) |
| `ativo` | boolean | Permite desativar um link sem excluir |
| `criado_em` | timestamp | Data de cadastro |

> Nenhuma tabela de alunos, respostas ou progresso é necessária.

---

## 5. Estrutura de Configuração do Quiz

Cada quiz é definido por um arquivo de configuração em JSON. Esse arquivo controla todo o conteúdo e visual do quiz para um determinado tema.

```json
{
  "tema": "eca-digital",
  "corPrimaria": "#3B4BC8",
  "corSecundaria": "#D4A017",
  "corFundo": "#E8E0F0",
  "corTexto": "#1A1A2E",
  "fonteDestaque": "bold",

  "telas": {
    "home": {
      "imagemFundo": "fundo_eca.png",
      "titulo": "ECA Digital",
      "subtitulo": "Conheça seus direitos na internet",
      "textoBotao": "Começar",
      "corBotao": "#3B4BC8"
    },
    "apresentacaoTema": {
      "imagemPersonagem": "personagem_frente.png",
      "balaoTexto": "Olá! Vamos aprender juntos sobre o ECA Digital?",
      "textoBotao": "Vamos lá!"
    }
  },

  "secoes": [
    {
      "id": "secao-01",
      "tipo": "pergunta",
      "imagemFundo": "fundo_azul.png",
      "imagemPersonagem": "inanna_notebook.png",
      "posicaoPersonagem": "esquerda",
      "balaoTexto": "Oi, meu nome é Inanna\nacerte a resposta e abra\na 1ª figurinha",
      "enunciado": "Quando um aplicativo ou jogo precisa proteger crianças?",
      "corEnunciado": "#FFFFFF",
      "corFundoEnunciado": "#2563EB",
      "opcoes": [
        { "letra": "A", "texto": "Quando o app só funciona à noite." },
        { "letra": "B", "texto": "Só quando o celular está sem internet." },
        { "letra": "C", "texto": "Quando é feito para crianças ou pode ser usado por elas." }
      ],
      "respostaCorreta": "C",
      "corOpcao": "#D4A017",
      "recompensa": {
        "figurinha": "figurinha_01.png",
        "textoBalao": "Parabéns! Você ganhou uma figurinha!"
      }
    },
    {
      "id": "secao-02",
      "tipo": "conteudo",
      "imagemFundo": "fundo_roxo.png",
      "imagemPersonagem": "inanna_apontando.png",
      "posicaoPersonagem": "esquerda",
      "balaoTexto": "Agora que você está bem informado(a)\nabra outra figurinha",
      "blocos": [
        {
          "tipo": "caixa-texto",
          "corFundo": "#000000",
          "corTexto": "#FFFFFF",
          "conteudo": "exploração, abuso sexual, violência física, intimidação, assédio..."
        },
        {
          "tipo": "caixa-destaque",
          "corFundo": "#5B4FCF",
          "corTexto": "#FFFFFF",
          "conteudo": "As **medidas razoáveis** de segurança devem ser **colocadas** desde o **começo**..."
        }
      ],
      "textoBotao": "Abrir figurinha",
      "recompensa": {
        "figurinha": "figurinha_02.png"
      }
    }
  ],

  "trofeus": [
    { "apos_pergunta": 1, "imagem": "trofeu_A.png", "letra": "A" },
    { "apos_pergunta": 2, "imagem": "trofeu_B.png", "letra": "B" }
  ]
}
```

> O arquivo de configuração é a fonte única da verdade para cada quiz. Adicionar uma nova seção, mudar cores ou textos não requer alteração de código.

---

## 6. Fluxo de Telas

### 6.1 Fluxo Base

```
[Home]
  ↓ botão "Começar"
[Apresentação do Tema]
  ↓ botão "Vamos lá"
[Seção N] ← tipo definido na config
  ├── tipo: "pergunta"
  │     ↓ resposta errada
  │   [Tela de Erro] → botão "Tentar novamente" → volta para [Seção N]
  │     ↓ resposta correta
  │   [Recompensa - figurinha pequena]
  │     ↓ botão "Ver figurinha"
  │   [Figurinha em tela cheia]
  │     ↓ (se completou múltiplo de 3 perguntas)
  │   [Troféu com letra]
  │     ↓ botão "Continuar"
  └── tipo: "conteudo"
        ↓ botão "Abrir figurinha" (ou "Continuar")
      [Recompensa - figurinha pequena]
        ↓
      [Figurinha em tela cheia]
        ↓
[Próxima seção...]
  ↓ (última seção concluída)
[Tela Final]
```

### 6.2 Descrição das Telas

| Tela | Descrição |
|---|---|
| **Home** | Imagem de fundo, logos (escola + consultoria), título, subtítulo, botão para começar |
| **Apresentação do Tema** | Personagem com balão de boas-vindas, botão para avançar |
| **Pergunta** | Personagem + balão motivacional, caixa com enunciado, 3 opções A/B/C |
| **Erro** | Mensagem de encorajamento, botão para tentar novamente |
| **Recompensa (pequena)** | Figurinha em tamanho reduzido, texto de parabéns, botão "Ver figurinha" |
| **Figurinha tela cheia** | Mesma figurinha em tamanho máximo, botão "Continuar" |
| **Troféu** | Imagem do troféu com letra, texto explicativo, botão "Continuar" |
| **Conteúdo informativo** | Personagem + balão, blocos de texto customizáveis, botão de ação |
| **Tela Final** | Mensagem de conclusão, resumo das figurinhas e troféus conquistados |

---

## 7. Componentes React Planejados

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx           → logos escola + consultoria + título da seção
│   │   └── MobileFrame.jsx      → moldura centralizadora (mobile no desktop)
│   ├── telas/
│   │   ├── TelaHome.jsx
│   │   ├── TelaApresentacao.jsx
│   │   ├── TelaPergunta.jsx
│   │   ├── TelaErro.jsx
│   │   ├── TelaRecompensa.jsx   → figurinha pequena
│   │   ├── TelaFigurinhaCheia.jsx
│   │   ├── TelaTrofeu.jsx
│   │   ├── TelaConteudo.jsx
│   │   └── TelaFinal.jsx
│   └── ui/
│       ├── OpcaoResposta.jsx    → botão A/B/C com círculo dourado
│       ├── BalaoPersonagem.jsx  → balão de fala da mascote
│       ├── CaixaTexto.jsx       → bloco de conteúdo customizável
│       └── BotaoAcao.jsx        → botão principal padronizado
├── hooks/
│   └── useQuiz.js               → lógica de estado e fluxo do quiz
├── config/
│   ├── eca-digital.json         → configuração do quiz tema 1
│   ├── tema2.json               → configuração do quiz tema 2
│   └── tema3.json               → configuração do quiz tema 3
├── services/
│   └── supabase.js              → busca configuração da escola
└── App.jsx                      → roteamento e carregamento inicial
```

---

## 8. Requisitos Funcionais

### RF-01 — Acesso por link exclusivo
O aluno acessa o quiz via URL no formato `/quiz/:escolaId`. O sistema busca no Supabase as configurações daquela escola (logo, tema) e carrega o quiz correspondente.

### RF-02 — Exibição de logo por escola
A logo do colégio contratante deve ser exibida no canto superior esquerdo do header em todas as telas. A logo da consultoria permanece fixa no canto superior direito.

### RF-03 — Fluxo de seções customizável
A sequência de seções (pergunta ou conteúdo informativo) é definida no arquivo de configuração do quiz. A ordem, quantidade e tipo de cada seção são flexíveis por tema.

### RF-04 — Pergunta com múltipla escolha
Telas do tipo `pergunta` exibem um enunciado e exatamente 3 alternativas (A, B, C). Apenas uma alternativa é correta.

### RF-05 — Comportamento em caso de erro
Ao selecionar uma alternativa incorreta, o aluno é levado à tela de erro com opção de tentar novamente. Não há limite de tentativas.

### RF-06 — Recompensa ao acertar
Ao acertar uma pergunta, o aluno recebe uma figurinha. A recompensa é exibida primeiro em tamanho reduzido e depois em tela cheia antes de avançar.

### RF-07 — Troféu a cada bloco de perguntas
A cada conjunto de perguntas definido na configuração (ex: a cada 3 acertos), o aluno recebe um troféu com uma letra. A sequência de letras e a imagem do troféu são fixas e definidas na configuração do quiz.

### RF-08 — Seções de conteúdo informativo
Telas do tipo `conteudo` exibem blocos de texto formatados (caixas coloridas com texto de destaque) e um botão de ação que pode levar à recompensa ou avançar o fluxo.

### RF-09 — Reinício ao atualizar a página
O quiz não persiste nenhum estado entre sessões. Ao recarregar a página, o fluxo reinicia do início.

### RF-10 — Quiz sem identificação do aluno
Nenhum dado pessoal é solicitado. O aluno começa o quiz diretamente sem formulários de cadastro ou login.

### RF-11 — Tela final de conclusão
Ao completar todas as seções, o aluno vê uma tela de conclusão com resumo das figurinhas e troféus conquistados.

---

## 9. Requisitos Não Funcionais

### RNF-01 — Mobile-first obrigatório
O quiz é projetado exclusivamente para visualização mobile (~390px de largura). No desktop, deve ser exibido centralizado em uma moldura que simula um smartphone, sem distorção do layout.

### RNF-02 — Sem animações
A navegação entre telas é feita por troca direta de componentes, sem transições animadas. Toda a interação é controlada por botões.

### RNF-03 — Performance
O carregamento inicial do quiz deve ser rápido. Assets (imagens de personagens e figurinhas) devem ser otimizados e, idealmente, pré-carregados ao iniciar o quiz.

### RNF-04 — Proteção do conteúdo
O colégio recebe apenas um link de acesso. O código-fonte, arquivo de configuração e assets não são acessíveis diretamente pelo link público. A escola não possui painel de edição.

### RNF-05 — Escalabilidade horizontal
Adicionar um novo colégio requer apenas inserir uma linha na tabela `escolas` do Supabase e fazer upload da logo. Nenhuma alteração de código é necessária.

### RNF-06 — Escalabilidade de temas
Adicionar um novo tema de quiz requer apenas criar um novo arquivo de configuração `.json` e seus assets correspondentes, sem alteração dos componentes existentes.

### RNF-07 — Zero dados de aluno
Nenhuma informação do aluno é coletada, armazenada ou transmitida. O sistema é compatível com LGPD por design (privacy by default).

### RNF-08 — Disponibilidade
Hospedado na Vercel com CDN global, o quiz deve ter alta disponibilidade sem configuração adicional.

---

## 10. Regras de Negócio

### RN-01 — Um colégio, um quiz
Cada colégio contratante está vinculado a exatamente um dos 3 temas de quiz. Essa associação é definida por você no Supabase e não pode ser alterada pelo colégio.

### RN-02 — Logo obrigatória
Todo link gerado deve ter uma logo de colégio associada. Links sem logo configurada devem exibir um placeholder ou retornar erro amigável.

### RN-03 — Tentativas ilimitadas por pergunta
O quiz não é punitivo. O aluno pode errar quantas vezes quiser e sempre terá a oportunidade de acertar e receber a recompensa.

### RN-04 — Recompensa garantida ao acertar
A figurinha é entregue toda vez que o aluno acerta, independentemente de quantas tentativas foram necessárias.

### RN-05 — Troféu garantido ao acertar o bloco
O troféu com a letra correspondente é entregue ao acertar a última pergunta do bloco, independentemente de tentativas anteriores.

### RN-06 — Letras do troféu são fixas
As letras exibidas nos troféus são definidas na configuração do quiz e são sempre as mesmas para todos os alunos. Não são geradas aleatoriamente.

### RN-07 — Código de certificado fora do escopo
O sistema de troca de troféus por certificado (usando as letras acumuladas dos 3 quizzes) é um fluxo externo e não faz parte deste projeto.

### RN-08 — Link inativo
Se o campo `ativo` da escola estiver como `false` no Supabase, o link deve exibir uma mensagem de indisponibilidade, sem revelar detalhes do sistema.

---

## 11. Assets por Quiz

Cada tema de quiz deve conter os seguintes assets na pasta `public/assets/[tema]/`:

```
public/assets/eca-digital/
├── fundos/
│   ├── fundo_home.png
│   ├── fundo_secao_01.png
│   └── ...
├── personagens/
│   ├── personagem_01.png   → pose específica por seção
│   ├── personagem_02.png
│   └── ...
├── figurinhas/
│   ├── figurinha_01.png
│   ├── figurinha_02.png
│   └── ...
└── trofeus/
    ├── trofeu_A.png
    ├── trofeu_B.png
    └── ...
```

> Cada tema tem seu próprio conjunto de assets. Personagens podem se repetir entre temas mas em poses/posições diferentes, portanto cada arquivo é independente.

---

## 12. Estratégia de Migração do Protótipo

A migração do protótipo atual (feito em ferramenta de apresentação) para o sistema web será feita de forma incremental:

1. **Fase 1 — Estrutura base:** Criar o projeto React com roteamento, layout mobile e integração com Supabase
2. **Fase 2 — Primeiro quiz:** Migrar um tema completo (telas, assets e configuração JSON)
3. **Fase 3 — Validação:** Testar o fluxo completo com escola fictícia antes de vender
4. **Fase 4 — Replicação:** Migrar os outros 2 temas seguindo o mesmo padrão
5. **Fase 5 — Comercialização:** Cadastrar os primeiros colégios no Supabase e gerar os links

---

## 13. Fora do Escopo (nesta versão)

- Sistema de login de alunos
- Ranking ou planejamento de alunos
- Relatórios de acesso por colégio
- Painel administrativo web (gerenciamento via Supabase Studio)
- Sistema de certificados e troca de troféus
- Modo offline / PWA
- Acessibilidade avançada (leitores de tela, etc.)
- Suporte a mais de 3 alternativas por pergunta
- Timer por pergunta

---

## 14. Próximos Passos Imediatos

1. [ ] Criar repositório no GitHub
2. [ ] Inicializar projeto com `npm create vite@latest` (React + JS)
3. [ ] Instalar dependências: `tailwindcss`, `react-router-dom`, `@supabase/supabase-js`
4. [ ] Criar tabela `escolas` no Supabase
5. [ ] Configurar variáveis de ambiente (`.env`) com chaves do Supabase
6. [ ] Criar o `MobileFrame.jsx` e validar o layout centralizado
7. [ ] Criar o primeiro arquivo de configuração JSON com o tema 1
8. [ ] Migrar os assets do primeiro quiz para `public/assets/`
9. [ ] Implementar o `useQuiz.js` com a lógica de fluxo
10. [ ] Implementar as telas uma a uma, seguindo o arquivo de configuração
11. [ ] Deploy na Vercel e teste com link de escola fictícia
