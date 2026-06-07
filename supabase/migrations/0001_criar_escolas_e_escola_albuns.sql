-- Fase 1 — modelo de dados (plan §3). Duas tabelas de config; zero dado de aluno (P-04).
-- Aplicada no Supabase via MCP (migration: criar_escolas_e_escola_albuns).
create table escolas (
  id text primary key,                 -- slug usado na URL (ex.: colegio-abc)
  nome text not null,
  logo_url text not null,              -- URL da logo no Cloudinary
  ativo boolean not null default true, -- false desativa todos os links sem excluir
  criado_em timestamptz not null default now()
);

create table escola_albuns (
  escola_id text not null references escolas(id) on delete cascade,
  album_id  text not null,                 -- id do álbum/config (= nome do JSON)
  liberado  boolean not null default true, -- true = pago/liberado; false = 🔒
  ordem     int not null default 0,        -- ordem no seletor
  criado_em timestamptz not null default now(),
  primary key (escola_id, album_id)
);

-- RLS: só leitura pública. Sem policies de insert/update/delete => anon não escreve
-- (escrita só por nós no Studio). plan §3.
alter table escolas enable row level security;
alter table escola_albuns enable row level security;
create policy "leitura publica escolas" on escolas for select using (true);
create policy "leitura publica escola_albuns" on escola_albuns for select using (true);
