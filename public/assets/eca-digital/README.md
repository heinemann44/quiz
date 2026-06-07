# Assets — Álbum 1 (eca-digital)

Coloque os arquivos de arte aqui. Os caminhos batem com os referenciados em
`src/config/albuns/eca-digital.json` (`assetsBasePath: /assets/eca-digital`).
Enquanto um arquivo não existe, a tela mostra um **placeholder** — nada quebra.

## Lote mínimo (Fase 4 — seção 1)

| Arquivo | O quê | Formato |
|---|---|---|
| `fundos/capa.png` | fundo da capa | PNG ou JPG |
| `fundos/comemoracao.png` | fundo das telas de figurinha | PNG ou JPG |
| `personagens/astro.png` | mascote (tela de conteúdo) | **PNG transparente** |
| `personagens/inanna.png` | personagem (tela de pergunta) | **PNG transparente** |
| `figurinhas/01.png` | figurinha 01 em tela cheia | **PNG transparente** |
| `figurinhas/01-card.png` | (opcional) versão "card" da figurinha 01 | PNG |
| `trofeus/01.png` | troféu 01 (letra "S") | **PNG transparente** |

> A logo da **consultoria** vai em `public/marca/consultoria.png` (chrome do app).
> A logo da **escola** vem do banco (`escolas.logo_url`, Cloudinary) — não é arquivo aqui.

## Convenção de nomes (para escalar nas Fases 5 e 7)

- **figurinhas/** numeração global de 2 dígitos: `01.png` … `06.png` (tela cheia);
  card opcional `NN-card.png`.
- **trofeus/** na ordem: `01.png` (letra "S"), `02.png` (número "2"), …
- **personagens/** por nome: `astro.png`, `inanna.png`; poses futuras `nome-pose.png`.
- **fundos/** `capa.png`, `comemoracao.png`; fundos de seção futuros `secao-NN.png`.

## Dimensões (mobile ~390px, exporte ~2x)

- Fundos: ~780 px de largura.
- Personagens / figurinhas / troféus: ~400–600 px no maior lado, fundo transparente.
