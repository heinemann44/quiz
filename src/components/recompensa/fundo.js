// Fundo das telas de recompensa: imagem comemorativa do álbum, se houver; senão
// a cor do tema. Compartilhado por RevelacaoFigurinha e FigurinhaCheia (DRY).
export const estiloFundo = (tema, fundoUrl) =>
  fundoUrl
    ? { backgroundImage: `url(${fundoUrl})` }
    : { backgroundColor: tema.corFundo };
