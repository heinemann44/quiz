import { createClient } from '@supabase/supabase-js';

// Embrulha o supabase-js atrás da nossa interface (AGENTS §Dependências):
// nenhum componente importa @supabase/supabase-js direto — todos usam colegioRepo.

/**
 * @typedef {{ id: string, nome: string, logoUrl: string, ativo: boolean }} Escola
 * @typedef {{ albumId: string, liberado: boolean, ordem: number }} VinculoAlbum
 * @typedef {{ escola: Escola, albuns: VinculoAlbum[] }} Colegio
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Schema = ambiente: dev (local), hml (homologação), prd (produção). Default dev;
// o deploy sobrescreve via VITE_SUPABASE_SCHEMA (Vercel, por ambiente).
const schema = import.meta.env.VITE_SUPABASE_SCHEMA || 'dev';

// Cliente preguiçoso: só nasce no primeiro acesso real ao banco. Assim importar
// este módulo (ex.: em teste com FakeColegioRepo) não exige .env configurado.
let clientMemo;
function client() {
  if (!url || !anonKey) {
    throw new Error(
      'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env',
    );
  }
  if (!clientMemo) clientMemo = createClient(url, anonKey, { db: { schema } });
  return clientMemo;
}

const mapEscola = (linha) => ({
  id: linha.id,
  nome: linha.nome,
  logoUrl: linha.logo_url,
  ativo: linha.ativo,
});

const mapVinculo = (linha) => ({
  albumId: linha.album_id,
  liberado: linha.liberado,
  ordem: linha.ordem,
});

/**
 * Busca o colégio e seus vínculos de álbum (liberados e bloqueados).
 * @param {string} escolaId
 * @returns {Promise<Colegio|null>} null quando a escola não existe (RF-15).
 *   Lança em falha de rede/DB — a página converte em aviso amigável (RF-14/15).
 */
async function getColegio(escolaId) {
  const { data: escola, error } = await client()
    .from('escolas')
    .select('id, nome, logo_url, ativo')
    .eq('id', escolaId)
    .maybeSingle();
  if (error) throw error;
  if (!escola) return null;

  const { data: albuns, error: erroAlbuns } = await client()
    .from('escola_albuns')
    .select('album_id, liberado, ordem')
    .eq('escola_id', escolaId)
    .order('ordem');
  if (erroAlbuns) throw erroAlbuns;

  return { escola: mapEscola(escola), albuns: albuns.map(mapVinculo) };
}

/** Repositório de colégio — injetado via ColegioRepoContext. */
export const colegioRepo = { getColegio };
