-- Ambientes isolados por schema: dev (local), hml (homologação), prd (produção).
-- Mesma estrutura nos três; o app escolhe via VITE_SUPABASE_SCHEMA. Os testes não
-- usam banco (FakeColegioRepo). SUPERSEDE 0001/0002 (que viviam em public).
do $$
declare s text;
begin
  foreach s in array array['dev','hml','prd'] loop
    execute format('create schema if not exists %I', s);
    execute format('grant usage on schema %I to anon, authenticated', s);

    execute format($f$
      create table %I.escolas (
        id text primary key,
        nome text not null,
        logo_url text not null,
        ativo boolean not null default true,
        criado_em timestamptz not null default now()
      )$f$, s);

    execute format($f$
      create table %I.escola_albuns (
        escola_id text not null references %I.escolas(id) on delete cascade,
        album_id  text not null,
        liberado  boolean not null default true,
        ordem     int not null default 0,
        criado_em timestamptz not null default now(),
        primary key (escola_id, album_id)
      )$f$, s, s);

    -- RLS (linha) + GRANT SELECT (tabela): PostgREST exige os dois. Escrita bloqueada.
    execute format('alter table %I.escolas enable row level security', s);
    execute format('alter table %I.escola_albuns enable row level security', s);
    execute format($f$create policy "leitura publica escolas" on %I.escolas for select using (true)$f$, s);
    execute format($f$create policy "leitura publica escola_albuns" on %I.escola_albuns for select using (true)$f$, s);
    execute format('grant select on %I.escolas to anon, authenticated', s);
    execute format('grant select on %I.escola_albuns to anon, authenticated', s);
  end loop;
end $$;

-- Consolida nos schemas de ambiente: remove a versão inicial em public.
drop table if exists public.escola_albuns;
drop table if exists public.escolas;

-- Expõe os schemas ao PostgREST (default segue public). Canônico também no painel:
-- Settings → API → Exposed schemas. Recarrega config e cache de schema.
alter role authenticator set pgrst.db_schemas = 'public, dev, hml, prd';
notify pgrst, 'reload schema';
notify pgrst, 'reload config';
