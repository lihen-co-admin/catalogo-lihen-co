-- ETAPA 11: colas presencial/virtual, alternancia, turno activo y cronómetro.

alter table public.event_rooms
  add column if not exists active_participant_id bigint references public.event_participants(id) on delete set null,
  add column if not exists active_participant_public_id uuid,
  add column if not exists active_display_name text,
  add column if not exists active_modality text check (active_modality in ('presencial','virtual')),
  add column if not exists last_turn_modality text check (last_turn_modality in ('presencial','virtual')),
  add column if not exists turn_status text not null default 'idle' check (turn_status in ('idle','running','paused')),
  add column if not exists turn_started_at timestamptz,
  add column if not exists turn_duration_seconds integer not null default 60 check (turn_duration_seconds between 10 and 600),
  add column if not exists turn_remaining_seconds integer not null default 60 check (turn_remaining_seconds between 0 and 600);

create or replace function public.is_active_event_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.admin_profiles where user_id=auth.uid() and active=true);
$$;

create or replace function public.activate_next_event_turn(p_duration_seconds integer default 60)
returns public.event_rooms
language plpgsql security definer set search_path=public as $$
declare
  v_room public.event_rooms;
  v_next public.event_participants;
  v_preferred text;
begin
  if not public.is_active_event_admin() then raise exception 'Acceso administrativo requerido'; end if;
  p_duration_seconds := greatest(10, least(coalesce(p_duration_seconds,60),600));
  select * into v_room from public.event_rooms where slug='inauguracion-lihen' for update;

  if v_room.active_participant_id is not null then
    update public.event_participants set registration_status='waiting'
    where id=v_room.active_participant_id and registration_status='active';
  end if;

  v_preferred := case when v_room.last_turn_modality='presencial' then 'virtual' else 'presencial' end;

  select * into v_next from public.event_participants
  where room_id=v_room.id and registration_status in ('registered','connected','waiting')
    and modality=v_preferred
  order by registered_order asc limit 1 for update skip locked;

  if v_next.id is null then
    select * into v_next from public.event_participants
    where room_id=v_room.id and registration_status in ('registered','connected','waiting')
    order by registered_order asc limit 1 for update skip locked;
  end if;

  if v_next.id is null then
    update public.event_rooms set active_participant_id=null,active_participant_public_id=null,active_display_name=null,active_modality=null,
      turn_status='idle',turn_started_at=null,turn_remaining_seconds=p_duration_seconds,turn_duration_seconds=p_duration_seconds,updated_at=now()
    where id=v_room.id returning * into v_room;
    return v_room;
  end if;

  update public.event_participants set registration_status='active' where id=v_next.id;
  update public.event_rooms set active_participant_id=v_next.id,active_participant_public_id=v_next.public_id,active_display_name=v_next.display_name,
    active_modality=v_next.modality,last_turn_modality=v_next.modality,turn_status='running',
    turn_started_at=now(),turn_duration_seconds=p_duration_seconds,turn_remaining_seconds=p_duration_seconds,
    event_status='live',updated_at=now()
  where id=v_room.id returning * into v_room;
  return v_room;
end;$$;

create or replace function public.pause_event_turn()
returns public.event_rooms language plpgsql security definer set search_path=public as $$
declare v_room public.event_rooms; v_left integer;
begin
  if not public.is_active_event_admin() then raise exception 'Acceso administrativo requerido'; end if;
  select * into v_room from public.event_rooms where slug='inauguracion-lihen' for update;
  if v_room.turn_status='running' then
    v_left := greatest(0, v_room.turn_remaining_seconds - floor(extract(epoch from (now()-v_room.turn_started_at)))::integer);
    update public.event_rooms set turn_status='paused',turn_started_at=null,turn_remaining_seconds=v_left,updated_at=now()
    where id=v_room.id returning * into v_room;
  end if;
  return v_room;
end;$$;

create or replace function public.resume_event_turn()
returns public.event_rooms language plpgsql security definer set search_path=public as $$
declare v_room public.event_rooms;
begin
  if not public.is_active_event_admin() then raise exception 'Acceso administrativo requerido'; end if;
  update public.event_rooms set turn_status='running',turn_started_at=now(),updated_at=now()
  where slug='inauguracion-lihen' and turn_status='paused' returning * into v_room;
  if v_room.id is null then select * into v_room from public.event_rooms where slug='inauguracion-lihen'; end if;
  return v_room;
end;$$;

create or replace function public.end_event_turn(p_next_status text default 'waiting')
returns public.event_rooms language plpgsql security definer set search_path=public as $$
declare v_room public.event_rooms;
begin
  if not public.is_active_event_admin() then raise exception 'Acceso administrativo requerido'; end if;
  if p_next_status not in ('waiting','winner','disabled','left') then raise exception 'Estado final no permitido'; end if;
  select * into v_room from public.event_rooms where slug='inauguracion-lihen' for update;
  if v_room.active_participant_id is not null then
    update public.event_participants set registration_status=p_next_status where id=v_room.active_participant_id;
  end if;
  update public.event_rooms set active_participant_id=null,active_participant_public_id=null,active_display_name=null,active_modality=null,
    turn_status='idle',turn_started_at=null,turn_remaining_seconds=turn_duration_seconds,updated_at=now()
  where id=v_room.id returning * into v_room;
  return v_room;
end;$$;

revoke all on function public.activate_next_event_turn(integer) from public;
revoke all on function public.pause_event_turn() from public;
revoke all on function public.resume_event_turn() from public;
revoke all on function public.end_event_turn(text) from public;
grant execute on function public.activate_next_event_turn(integer) to authenticated;
grant execute on function public.pause_event_turn() to authenticated;
grant execute on function public.resume_event_turn() to authenticated;
grant execute on function public.end_event_turn(text) to authenticated;

-- Los cambios de estado de participantes deben llegar al panel administrativo.
do $$ begin
  alter publication supabase_realtime add table public.event_participants;
exception when duplicate_object then null; end $$;
