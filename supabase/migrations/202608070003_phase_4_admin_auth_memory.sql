begin;

alter table public.profiles
  add column if not exists role text not null default 'user'
    check (role in ('user', 'admin'));

alter table public.clients
  alter column user_id drop not null,
  add column if not exists visitor_id_hash text,
  add column if not exists is_active boolean not null default true,
  add column if not exists last_contact_at timestamptz;

alter table public.conversations
  alter column user_id drop not null,
  add column if not exists visitor_id_hash text;

create unique index if not exists clients_visitor_id_hash_idx
  on public.clients(visitor_id_hash)
  where visitor_id_hash is not null;

create index if not exists clients_last_contact_at_idx
  on public.clients(last_contact_at desc);

create index if not exists conversations_created_at_idx
  on public.conversations(created_at desc);

create index if not exists conversations_visitor_id_hash_idx
  on public.conversations(visitor_id_hash)
  where visitor_id_hash is not null;

create index if not exists messages_conversation_created_at_desc_idx
  on public.messages(conversation_id, created_at desc);

create or replace function public.touch_conversation_on_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists messages_touch_conversation on public.messages;
create trigger messages_touch_conversation
after insert on public.messages
for each row execute function public.touch_conversation_on_message();

drop policy if exists "Users can update their profile" on public.profiles;

revoke update on public.profiles from authenticated;
grant update (full_name, avatar_url, phone) on public.profiles to authenticated;

create policy "Users can update safe profile fields"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

grant usage on schema public to authenticated, service_role;
grant select on public.profiles to authenticated;
grant select, insert, update, delete on
  public.clients,
  public.conversations,
  public.messages,
  public.site_settings
to service_role;

notify pgrst, 'reload schema';

commit;
