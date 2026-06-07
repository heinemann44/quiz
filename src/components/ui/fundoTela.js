// Fundo de uma tela: imagem (se houver) ou a cor do tema. Compartilhado pelas
// telas de seção (conteúdo/pergunta) e de recompensa (DRY). Combine com as
// classes utilitárias `bg-cover bg-center` no componente.
export const estiloFundoTela = (tema, fundoUrl) =>
  fundoUrl
    ? { backgroundImage: `url(${fundoUrl})` }
    : { backgroundColor: tema?.corFundo };
