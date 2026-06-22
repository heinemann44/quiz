import { clienteSupabase, ambiente, urlPublicaLogo } from './supabase.js';

// Repositório de escrita do backoffice (emenda E-02). Embrulha o Supabase atrás
// da nossa interface (AGENTS §Dependências); injetado via contexto, fakeável em
// teste. Toda escrita exige sessão de admin (RLS `authenticated`, migration 0005).

const BUCKET_LOGOS = 'logos';

// Cache longo (1 ano) da logo no Storage. SEGURO porque o nome do arquivo é
// VERSIONADO (id-timestamp): trocar a logo gera URL nova, então cache imutável
// nunca serve imagem velha. Sem isto o Storage servia `no-cache` e o logo
// revalidava (piscava) a cada troca de tela — o header remonta por passo.
const CACHE_LOGO = '31536000';

/** Linha do banco → escola do admin (com arquivo cru E url resolvida da logo). */
const mapEscolaAdmin = (l) => ({
  id: l.id,
  nome: l.nome,
  ativo: l.ativo,
  logoArquivo: l.logo_url, // nome guardado (ex.: "colegio-demo.png")
  logoUrl: urlPublicaLogo(l.logo_url), // url pública pra exibir
});

const mapVinculo = (l) => ({
  albumId: l.album_id,
  liberado: l.liberado,
  ordem: l.ordem,
});

/** @returns {Promise<object[]>} todas as escolas, ordenadas por nome. */
export async function listarEscolas() {
  const { data, error } = await clienteSupabase()
    .from('escolas')
    .select('id, nome, logo_url, ativo')
    .order('nome');
  if (error) throw error;
  return data.map(mapEscolaAdmin);
}

/** @returns {Promise<object[]>} vínculos de álbum do colégio (liberado/ordem). */
export async function listarVinculos(escolaId) {
  const { data, error } = await clienteSupabase()
    .from('escola_albuns')
    .select('album_id, liberado, ordem')
    .eq('escola_id', escolaId)
    .order('ordem');
  if (error) throw error;
  return data.map(mapVinculo);
}

/**
 * Cria um colégio. `id` é o slug usado na URL; logo começa vazia (placeholder).
 * @param {{ id: string, nome: string, ativo?: boolean }} escola
 */
export async function criarEscola({ id, nome, ativo = true }) {
  const { error } = await clienteSupabase()
    .from('escolas')
    .insert({ id, nome, ativo, logo_url: '' });
  if (error) throw error;
}

/** Atualiza nome/ativo (não toca na logo — ela tem fluxo próprio). */
export async function atualizarEscola({ id, nome, ativo }) {
  const { error } = await clienteSupabase()
    .from('escolas')
    .update({ nome, ativo })
    .eq('id', id);
  if (error) throw error;
}

/** Remove o colégio (cascata apaga os vínculos). A logo no Storage some à parte. */
export async function removerEscola(id) {
  const { error } = await clienteSupabase().from('escolas').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Substitui TODO o conjunto de vínculos do colégio pelo informado (delete + insert).
 * Sem transação multi-statement no supabase-js; em baixo volume é aceitável.
 * @param {string} escolaId
 * @param {{ albumId: string, liberado: boolean, ordem: number }[]} vinculos
 */
export async function salvarVinculos(escolaId, vinculos) {
  const sb = clienteSupabase();
  const { error: erroDel } = await sb
    .from('escola_albuns')
    .delete()
    .eq('escola_id', escolaId);
  if (erroDel) throw erroDel;
  if (vinculos.length === 0) return;
  const linhas = vinculos.map((v) => ({
    escola_id: escolaId,
    album_id: v.albumId,
    liberado: v.liberado,
    ordem: v.ordem,
  }));
  const { error: erroIns } = await sb.from('escola_albuns').insert(linhas);
  if (erroIns) throw erroIns;
}

/**
 * Sobe a logo no Storage (logos/<ambiente>/<id>-<versao>.<ext>) e grava o nome em
 * escolas.logo_url. O nome leva um timestamp de VERSÃO: URL nova a cada troca —
 * sem isso o browser/CDN seguem servindo a imagem antiga do cache (CACHE_LOGO),
 * pois a URL não mudaria. O arquivo anterior é removido (evita órfão).
 * @returns {Promise<string>} o nome do arquivo gravado.
 */
export async function enviarLogo(escolaId, file, arquivoAnterior) {
  const arquivo = `${escolaId}-${Date.now()}.${extensaoDe(file)}`;
  const sb = clienteSupabase();
  const { error } = await sb.storage
    .from(BUCKET_LOGOS)
    .upload(`${ambiente}/${arquivo}`, file, {
      upsert: true,
      cacheControl: CACHE_LOGO,
    });
  if (error) throw error;
  if (arquivoAnterior && arquivoAnterior !== arquivo) {
    await sb.storage.from(BUCKET_LOGOS).remove([`${ambiente}/${arquivoAnterior}`]);
  }
  await gravarLogoUrl(escolaId, arquivo);
  return arquivo;
}

/** Remove a logo do Storage e zera escolas.logo_url (volta ao placeholder). */
export async function removerLogo(escolaId, arquivo) {
  const sb = clienteSupabase();
  if (arquivo) {
    const { error } = await sb.storage
      .from(BUCKET_LOGOS)
      .remove([`${ambiente}/${arquivo}`]);
    if (error) throw error;
  }
  await gravarLogoUrl(escolaId, '');
}

async function gravarLogoUrl(escolaId, arquivo) {
  const { error } = await clienteSupabase()
    .from('escolas')
    .update({ logo_url: arquivo })
    .eq('id', escolaId);
  if (error) throw error;
}

/** Extensão do arquivo (minúscula) a partir do nome; 'png' como padrão seguro. */
function extensaoDe(file) {
  const ponto = file.name?.lastIndexOf('.') ?? -1;
  return ponto > 0 ? file.name.slice(ponto + 1).toLowerCase() : 'png';
}

/** Repositório do backoffice — injetado via AdminRepoContext, fakeável em teste. */
export const adminRepo = {
  listarEscolas,
  listarVinculos,
  criarEscola,
  atualizarEscola,
  removerEscola,
  salvarVinculos,
  enviarLogo,
  removerLogo,
};
