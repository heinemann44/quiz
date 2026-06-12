import { clienteSupabase } from './supabase.js';

// Embrulho do Supabase Auth (e-mail/senha) para o backoffice (emenda E-02).
// Componentes não tocam supabase-js — usam estas funções. Erros sobem para a UI
// traduzir em aviso amigável (a mensagem técnica nunca vai crua pro usuário).

/**
 * Autentica admin por e-mail/senha.
 * @returns {Promise<import('@supabase/supabase-js').Session>}
 */
export async function entrar(email, senha) {
  const { data, error } = await clienteSupabase().auth.signInWithPassword({
    email,
    password: senha,
  });
  if (error) throw error;
  return data.session;
}

/** Encerra a sessão do admin. */
export async function sair() {
  const { error } = await clienteSupabase().auth.signOut();
  if (error) throw error;
}

/** @returns {Promise<import('@supabase/supabase-js').Session|null>} sessão atual. */
export async function sessaoAtual() {
  const { data } = await clienteSupabase().auth.getSession();
  return data.session;
}

/**
 * Observa mudanças de sessão (login/logout/expiração).
 * @param {(sessao: import('@supabase/supabase-js').Session|null) => void} aoMudar
 * @returns {() => void} cancela a inscrição.
 */
export function observarSessao(aoMudar) {
  const { data } = clienteSupabase().auth.onAuthStateChange((_evento, sessao) =>
    aoMudar(sessao),
  );
  return () => data.subscription.unsubscribe();
}
