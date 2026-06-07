// Construtores de Colegio para testes (formato de services/supabase.js).
export const vinculo = (albumId, liberado = true, ordem = 0) => ({
  albumId,
  liberado,
  ordem,
});

export const escola = (extra = {}) => ({
  id: 'colegio-x',
  nome: 'Colégio X',
  logoUrl: '',
  ativo: true,
  ...extra,
});

export const colegio = (albuns, extraEscola = {}) => ({
  escola: escola(extraEscola),
  albuns,
});
