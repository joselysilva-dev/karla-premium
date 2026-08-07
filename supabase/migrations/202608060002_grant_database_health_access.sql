begin;

do $$
begin
  if to_regclass('public.site_settings') is null then
    raise exception
      'A tabela public.site_settings não existe. Aplique primeiro a migration 202608050001_initial_schema.sql.';
  end if;
end;
$$;

grant usage on schema public to service_role;
grant select on table public.site_settings to service_role;

notify pgrst, 'reload schema';

commit;
