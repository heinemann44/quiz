-- Seed de DEV (escolas fictícias) no schema `dev`. Exercita os 5 desfechos da
-- entrada (RF-01/01a/14/15). NÃO é dado de produção. Reaplicável: trunca antes.
set search_path to dev;

truncate escola_albuns, escolas cascade;

-- logo_url = ARQUIVO no bucket `logos` (não mais URL). O app prefixa o ambiente
-- (logos/<schema>/<arquivo>) ao montar a URL pública (urlPublicaLogo). Arquivo
-- ausente cai no placeholder do header.
insert into escolas (id, nome, logo_url, ativo) values
  ('colegio-demo',       'Colégio Demo',        'colegio-demo.png',       true),
  ('colegio-multi',      'Colégio Multi Álbum', 'colegio-multi.png',      true),
  ('colegio-sem-albuns', 'Colégio Sem Álbuns',  'colegio-sem-albuns.png', true),
  ('colegio-inativo',    'Colégio Inativo',     'colegio-inativo.png',    false);

insert into escola_albuns (escola_id, album_id, liberado, ordem) values
  ('colegio-demo',    'eca-digital-1',       true,  1),  -- 1 liberado → entra direto
  ('colegio-multi',   'eca-digital-1',       true,  1),  -- 2 liberados + 1 bloqueado → seletor
  ('colegio-multi',   'mundo-do-trabalho',   true,  2),
  ('colegio-multi',   'consumo-consciente',  false, 3),  -- 🔒
  ('colegio-inativo', 'eca-digital-1',       true,  1);  -- inativo vence
-- colegio-sem-albuns: sem linhas → indisponível
