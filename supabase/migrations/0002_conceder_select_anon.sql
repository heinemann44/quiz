-- A policy RLS controla as LINHAS; o role ainda precisa do privilégio de TABELA.
-- Sem isto o anon leva "permission denied" no PostgREST (erro 42501). Só SELECT —
-- escrita segue bloqueada (sem grant de insert/update/delete e sem policy). plan §3.
grant select on table escolas to anon, authenticated;
grant select on table escola_albuns to anon, authenticated;
