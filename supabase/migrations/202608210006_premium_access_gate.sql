begin;

create table public.premium_access (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references public.clients(id) on delete cascade,
  user_id uuid unique references public.profiles(id) on delete set null,
  invited_email text not null,
  status text not null default 'invited'
    check (status in ('invited', 'active', 'suspended', 'revoked')),
  invited_by uuid references public.profiles(id) on delete set null,
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint premium_access_invited_email_not_blank
    check (length(trim(invited_email)) > 0)
);

create unique index premium_access_invited_email_open_idx
  on public.premium_access(lower(trim(invited_email)))
  where status in ('invited', 'active');

create index premium_access_status_idx
  on public.premium_access(status);

create trigger premium_access_set_updated_at
before update on public.premium_access
for each row execute function public.set_updated_at();

alter table public.premium_access enable row level security;

revoke all on public.premium_access from public, anon, authenticated;
grant select, insert, update, delete on public.premium_access to service_role;

create or replace function public.claim_premium_access(
  target_user_id uuid,
  target_email text
)
returns table (
  id uuid,
  client_id uuid,
  user_id uuid,
  invited_email text,
  status text,
  activated_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  access_row public.premium_access%rowtype;
  linked_user_id uuid;
begin
  if target_user_id is null or nullif(trim(target_email), '') is null then
    return;
  end if;

  select pa.*
    into access_row
  from public.premium_access pa
  where lower(trim(pa.invited_email)) = lower(trim(target_email))
    and pa.status = 'invited'
    and (pa.user_id is null or pa.user_id = target_user_id)
  order by pa.created_at desc
  limit 1
  for update;

  if not found then
    return query
      select pa.id, pa.client_id, pa.user_id, pa.invited_email, pa.status,
             pa.activated_at, pa.created_at, pa.updated_at
      from public.premium_access pa
      where pa.user_id = target_user_id
        and pa.status = 'active'
      limit 1;
    return;
  end if;

  select c.user_id
    into linked_user_id
  from public.clients c
  where c.id = access_row.client_id
  for update;

  if linked_user_id is not null and linked_user_id <> target_user_id then
    raise exception 'Premium client is already linked to another account.';
  end if;

  update public.clients
  set user_id = target_user_id,
      updated_at = now()
  where id = access_row.client_id;

  update public.premium_access pa
  set user_id = target_user_id,
      status = 'active',
      activated_at = coalesce(pa.activated_at, now()),
      updated_at = now()
  where pa.id = access_row.id;

  return query
    select pa.id, pa.client_id, pa.user_id, pa.invited_email, pa.status,
           pa.activated_at, pa.created_at, pa.updated_at
    from public.premium_access pa
    where pa.id = access_row.id;
end;
$$;

revoke all on function public.claim_premium_access(uuid, text)
  from public, anon, authenticated;
grant execute on function public.claim_premium_access(uuid, text)
  to service_role;

notify pgrst, 'reload schema';

commit;
