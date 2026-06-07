-- Seed de DEV (escolas fictícias) no schema `dev`. Exercita os 5 desfechos da
-- entrada (RF-01/01a/14/15). NÃO é dado de produção. Reaplicável: trunca antes.
set search_path to dev;

truncate escola_albuns, escolas cascade;

insert into escolas (id, nome, logo_url, ativo) values
  ('colegio-demo',       'Colégio Demo',        'https://placehold.co/160x80/3B4BC8/FFFFFF?text=Demo',  true),
  ('colegio-multi',      'Colégio Multi Álbum', 'https://placehold.co/160x80/22C55E/FFFFFF?text=Multi', true),
  ('colegio-sem-albuns', 'Colégio Sem Álbuns',  'https://placehold.co/160x80/D4A017/FFFFFF?text=Sem',   true),
  ('colegio-inativo',    'Colégio Inativo',     'https://placehold.co/160x80/EF4444/FFFFFF?text=Off',   false);

insert into escola_albuns (escola_id, album_id, liberado, ordem) values
  ('colegio-demo',    'eca-digital',         true,  1),  -- 1 liberado → entra direto
  ('colegio-multi',   'eca-digital',         true,  1),  -- 2 liberados + 1 bloqueado → seletor
  ('colegio-multi',   'mundo-do-trabalho',   true,  2),
  ('colegio-multi',   'consumo-consciente',  false, 3),  -- 🔒
  ('colegio-inativo', 'eca-digital',         true,  1);  -- inativo vence
-- colegio-sem-albuns: sem linhas → indisponível
