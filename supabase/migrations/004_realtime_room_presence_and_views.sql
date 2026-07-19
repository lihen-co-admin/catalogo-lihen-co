-- ETAPA 10: estado público de la sala, presencia Realtime y control administrativo.

alter table public.event_rooms
  add column if not exists event_status text not null default 'preparing'
    check (event_status in ('preparing','registration','waiting','live','paused','finished')),
  add column if not exists active_activity text,
  add column if not exists announcement text,
  add column if not exists updated_at timestamptz not null default now();

-- El público solo puede leer el estado general de la sala; no contiene datos personales.
drop policy if exists "public can read event room state" on public.event_rooms;
create policy "public can read event room state" on public.event_rooms
for select to anon, authenticated using (true);

-- Solo perfiles administrativos activos pueden modificar el estado del evento.
drop policy if exists "admins can update event room state" on public.event_rooms;
create policy "admins can update event room state" on public.event_rooms
for update to authenticated
using (exists(select 1 from public.admin_profiles ap where ap.user_id=auth.uid() and ap.active=true))
with check (exists(select 1 from public.admin_profiles ap where ap.user_id=auth.uid() and ap.active=true));

-- Permite a un participante actualizar únicamente su propio estado usando su UUID y código.
create or replace function public.set_event_participant_status(
  p_public_id uuid,
  p_access_code text,
  p_status text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_status not in ('registered','connected','waiting','active','winner','disabled','left') then
    raise exception 'Estado no permitido';
  end if;

  update public.event_participants
     set registration_status = p_status,
         connected_at = case when p_status = 'connected' then now() else connected_at end
   where public_id = p_public_id
     and access_code = p_access_code;

  return found;
end;
$$;

revoke all on function public.set_event_participant_status(uuid,text,text) from public;
grant execute on function public.set_event_participant_status(uuid,text,text) to anon, authenticated;

-- Realtime de cambios de estado general. El bloque evita error si ya estaba agregado.
do $$
begin
  alter publication supabase_realtime add table public.event_rooms;
exception
  when duplicate_object then null;
end $$;

update public.event_rooms
set event_status = case when room_open then 'live' else 'registration' end,
    updated_at = now()
where slug = 'inauguracion-lihen';
