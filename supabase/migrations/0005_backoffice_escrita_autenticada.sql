-- Backoffice (emenda E-02): libera ESCRITA só para usuário autenticado (Supabase
-- Auth). A anon key do front segue só-leitura (policies de SELECT do 0003). Duplo
-- portão: GRANT (tabela) + POLICY (linha) — PostgREST exige os dois.
--
-- Premissa de segurança: neste app *authenticated = admin* — os ÚNICOS usuários no
-- Supabase Auth são os admins criados no painel (o aluno nunca loga, P-04/P-05).
-- Por isso o predicado é `using(true)`: todo admin gerencia todas as escolas (não
-- há dono por linha). O advisor marca isso como "always true" — é intencional.
-- NÃO crie usuários Auth não-admin: ganhariam escrita.
--
-- Tabelas vivem por schema (dev/hml/prd) → foreach. Storage é global → policies do
-- bucket `logos` ficam fora do laço, em storage.objects.
do $$
declare s text;
begin
  foreach s in array array['dev','hml','prd'] loop
    -- escolas: CRUD para authenticated (FOR ALL cobre insert/update/delete/select).
    execute format('drop policy if exists "escrita autenticada escolas" on %I.escolas', s);
    execute format($f$create policy "escrita autenticada escolas" on %I.escolas
      for all to authenticated using (true) with check (true)$f$, s);

    -- escola_albuns: idem (liberar/bloquear álbum, ordem).
    execute format('drop policy if exists "escrita autenticada escola_albuns" on %I.escola_albuns', s);
    execute format($f$create policy "escrita autenticada escola_albuns" on %I.escola_albuns
      for all to authenticated using (true) with check (true)$f$, s);

    execute format('grant insert, update, delete on %I.escolas to authenticated', s);
    execute format('grant insert, update, delete on %I.escola_albuns to authenticated', s);
  end loop;
end $$;

-- Bucket `logos` (global): authenticated faz upload/replace/remove; leitura pública
-- já vem do bucket public=true (0004). Restrito ao bucket pelo predicado bucket_id.
drop policy if exists "logos escrita autenticada (insert)" on storage.objects;
create policy "logos escrita autenticada (insert)" on storage.objects
  for insert to authenticated with check (bucket_id = 'logos');

drop policy if exists "logos escrita autenticada (update)" on storage.objects;
create policy "logos escrita autenticada (update)" on storage.objects
  for update to authenticated using (bucket_id = 'logos') with check (bucket_id = 'logos');

drop policy if exists "logos escrita autenticada (delete)" on storage.objects;
create policy "logos escrita autenticada (delete)" on storage.objects
  for delete to authenticated using (bucket_id = 'logos');

-- SELECT para authenticated é OBRIGATÓRIO (aprendido na prática): o upload com
-- x-upsert (INSERT ... ON CONFLICT) e o remove() só funcionam se a linha for
-- visível — sem este SELECT o upsert falha com "new row violates RLS" e o remove
-- vira no-op silencioso. O advisor avisa "public bucket allows listing"; aceito:
-- só admin logado lista, e o conteúdo são nomes de arquivo de logo (inócuo).
drop policy if exists "logos leitura autenticada" on storage.objects;
create policy "logos leitura autenticada" on storage.objects
  for select to authenticated using (bucket_id = 'logos');
