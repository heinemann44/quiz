-- Emenda ao P-10: logos das escolas passam do Cloudinary para o Supabase Storage
-- (um fornecedor a menos; o Supabase já está na stack). Bucket PÚBLICO `logos`:
-- leitura anônima via URL pública (logo é chrome do app, não dado sensível).
--
-- Storage é GLOBAL no projeto (não tem schema como o Postgres). Pra isolar os
-- ambientes, os arquivos vivem em SUBPASTAS por ambiente: logos/dev/, logos/hml/,
-- logos/prd/. `escolas.logo_url` guarda só o ARQUIVO (ex.: "colegio-demo.png"); o
-- app prefixa o ambiente (VITE_SUPABASE_SCHEMA) ao montar a URL pública
-- (urlPublicaLogo). Upload (escrita) fica restrito ao painel/service role.
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do update set public = excluded.public;
