begin;

alter table public.profiles
  drop constraint if exists profiles_role_check;

update public.profiles set role = 'client' where role = 'user';

alter table public.profiles
  alter column role set default 'client',
  add column if not exists email text,
  add column if not exists birth_date date,
  add column if not exists gender text,
  add column if not exists height_cm numeric(5,2),
  add column if not exists weight_kg numeric(6,2),
  add column if not exists goal text,
  add column if not exists restrictions text,
  add column if not exists injuries text,
  add column if not exists experience_level text;

alter table public.profiles
  add constraint profiles_role_check check (role in ('client', 'admin')),
  add constraint profiles_height_cm_check check (height_cm is null or height_cm between 50 and 300),
  add constraint profiles_weight_kg_check check (weight_kg is null or weight_kg between 20 and 500),
  add constraint profiles_experience_level_check check (
    experience_level is null or experience_level in ('beginner', 'intermediate', 'advanced')
  );

update public.profiles as profiles
set email = users.email
from auth.users as users
where profiles.id = users.id and profiles.email is null;

create unique index if not exists profiles_email_lower_idx
  on public.profiles(lower(email)) where email is not null;

create unique index if not exists clients_user_id_unique_idx
  on public.clients(user_id) where user_id is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    new.email,
    'client'
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

create or replace function public.claim_visitor_client(
  target_user_id uuid,
  target_visitor_hash text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  visitor_client_id uuid;
  user_client_id uuid;
begin
  select id into visitor_client_id
  from public.clients
  where visitor_id_hash = target_visitor_hash
  for update;

  if visitor_client_id is null then
    return null;
  end if;

  select id into user_client_id
  from public.clients
  where user_id = target_user_id
  for update;

  if user_client_id is not null and user_client_id <> visitor_client_id then
    update public.conversations
    set client_id = user_client_id,
        user_id = target_user_id
    where client_id = visitor_client_id;

    delete from public.clients where id = visitor_client_id;
  else
    update public.clients
    set user_id = target_user_id,
        updated_at = now()
    where id = visitor_client_id;
    user_client_id := visitor_client_id;

    update public.conversations
    set user_id = target_user_id
    where client_id = visitor_client_id;
  end if;

  return user_client_id;
end;
$$;

revoke all on function public.claim_visitor_client(uuid, text) from public, anon, authenticated;
grant execute on function public.claim_visitor_client(uuid, text) to service_role;

revoke update on public.profiles from authenticated;
grant update (
  full_name, avatar_url, phone, birth_date, gender, height_cm, weight_kg,
  goal, restrictions, injuries, experience_level
) on public.profiles to authenticated;

notify pgrst, 'reload schema';

commit;
