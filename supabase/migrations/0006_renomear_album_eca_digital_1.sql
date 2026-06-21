-- Renomeia o álbum `eca-digital` → `eca-digital-1` nos três ambientes.
-- Motivo: "ECA Digital" é o TEMA, com 3 álbuns (Fase 7). O id passa a carregar o
-- número (eca-digital-1/2/3) — tema ≠ álbum. Acompanha a renomeação no código
-- (config/albuns, assets, registro de telas). Idempotente: só afeta linhas que
-- ainda usam o id antigo; schemas sem essas linhas (ex.: prd vazio) são no-op.
do $$
declare s text;
begin
  foreach s in array array['dev','hml','prd'] loop
    execute format(
      'update %I.escola_albuns set album_id = ''eca-digital-1'' where album_id = ''eca-digital''',
      s
    );
  end loop;
end $$;
