# Assets — Álbum 1 (eca-digital)

Caminhos batem com `assetsBasePath: /assets/eca-digital` do
`src/config/albuns/eca-digital.json`. Arquivo ausente → a tela mostra
**placeholder** (nada quebra).

## Convenção de nomes (em uso)

- **personagens/** `<personagem>-<contexto>.png`, contexto ∈
  `secao-N` (conteúdo) · `pergunta-N` · `resposta-errada-pergunta-N` (erro) ·
  `informativo-secao-N`. Personagens: `enki`, `inanna`, `enlil`, `joao`.
- **figurinhas/** numeração global 2 dígitos: `01.png` … `06.png` (tela cheia);
  card opcional `NN-card.png` (se ausente, usa a cheia).
- **trofeus/** na ordem: `01.png` (letra "S"), `02.png` (número "2").
- **fundos/** `secao-1.png`…`secao-5.png` (fundo de cada seção),
  `fundo-figurinha.png` (telas de figurinha), `header-figurinha.png`, `capa.png`.

## Cobertura por seção

| Seção | conteúdo | pergunta | erro | figurinha(s) |
|---|---|---|---|---|
| 1 | enki-secao-1 | inanna-pergunta-1 | inanna-resposta-errada-pergunta-1 | 01 |
| 2 | enki-secao-2 | enlil-pergunta-2 | enlil-resposta-errada-pergunta-2 | 02 |
| 3 | enki-secao-3 | joao-pergunta-3 | joao-resposta-errada-pergunta-3 | 03 |
| 4 | enki-secao-4 + inanna-informativo-secao-4 | inanna-pergunta-4 | inanna-resposta-errada-pergunta-4 | 04, 05 |
| 5 | joao-secao-5 | joao-pergunta-5 | — sem tela de erro (volta ao tema da seção 5) | 06 |

## Pendências (fornecer)

- `fundos/capa.png` — fundo da capa.
- `public/marca/consultoria.png` — logo da consultoria (chrome do app).

### Temporários (substituir depois)

Da **pergunta 5 em diante** alguns assets são provisórios (tirados de print) e
serão trocados pelo usuário: `figurinhas/06.png`, `trofeus/02.png`,
`personagens/joao-secao-5.png`, `personagens/joao-pergunta-5.png` (por isso saíram
menores/baixa-res). Servem para montar o fluxo enquanto a arte final não vem.

## Notas

- **Peso:** ~49 MB. Otimização (resize/compressão) ficou para a **Fase 6 (deploy)**.
- A logo da **escola** vem do banco (`escolas.logo_url`, Cloudinary) — não é arquivo aqui.
- **Todos os assets acima já são consumidos pelo motor (Fase 5):** `secao-N.png`
  como fundo de conteúdo/pergunta (`imagemFundo`), `*-resposta-errada-*` como pose
  de erro (`personagemErro`) e `header-figurinha.png` como banner das telas de
  figurinha (`headerFigurinha`). Título/legenda das figurinhas e da `capa` **já
  estão gravados na arte** — o motor não os repete em texto (usa só `alt`).
