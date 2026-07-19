-- Etapa 17: ganadores, recompensas, ranking y reclamación por WhatsApp.
create table if not exists public.event_rewards (
 id uuid primary key default gen_random_uuid(),
 room_id bigint not null references public.event_rooms(id) on delete cascade,
 participant_id bigint not null references public.event_participants(id) on delete cascade,
 game_key text not null check(game_key in('trivia','word','flash','roulette')),
 source_id text not null,
 reward_label text not null,
 reward_type text not null default 'game_reward',
 claim_code text not null unique default ('LIH-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
 claim_status text not null default 'pending' check(claim_status in('pending','claimed','delivered','cancelled')),
 claimed_at timestamptz,
 delivered_at timestamptz,
 notes text,
 created_at timestamptz not null default now(),
 unique(game_key,source_id,participant_id)
);
alter table public.event_rewards enable row level security;

create or replace view public.event_winner_ranking as
select rw.id,r.slug room_slug,p.public_id participant_public_id,p.display_name,p.modality,
 rw.game_key,rw.reward_label,rw.claim_status,rw.created_at,
 count(*) over(partition by p.id) total_rewards
from public.event_rewards rw join public.event_rooms r on r.id=rw.room_id
join public.event_participants p on p.id=rw.participant_id
where rw.claim_status<>'cancelled';

grant select on public.event_winner_ranking to anon,authenticated;

create or replace view public.event_rewards_admin as
select rw.*,p.display_name,p.full_name,p.email,p.modality,p.public_id participant_public_id
from public.event_rewards rw join public.event_participants p on p.id=rw.participant_id;
grant select on public.event_rewards_admin to authenticated;

create or replace function public.register_event_reward(
 p_room_id bigint,p_participant_id bigint,p_game_key text,p_source_id text,p_reward_label text,p_reward_type text default 'game_reward'
) returns public.event_rewards language plpgsql security definer set search_path=public as $$
declare v public.event_rewards;
begin
 insert into event_rewards(room_id,participant_id,game_key,source_id,reward_label,reward_type)
 values(p_room_id,p_participant_id,p_game_key,p_source_id,p_reward_label,p_reward_type)
 on conflict(game_key,source_id,participant_id) do update set reward_label=excluded.reward_label
 returning * into v;
 update event_participants set registration_status='winner' where id=p_participant_id and registration_status not in('disabled','left');
 return v;
end $$;
revoke all on function public.register_event_reward(bigint,bigint,text,text,text,text) from public;

create or replace function public.get_my_event_rewards(p_public_id uuid,p_access_code text)
returns table(id uuid,game_key text,reward_label text,claim_code text,claim_status text,created_at timestamptz)
language sql security definer set search_path=public as $$
 select rw.id,rw.game_key,rw.reward_label,rw.claim_code,rw.claim_status,rw.created_at
 from event_rewards rw join event_participants p on p.id=rw.participant_id
 where p.public_id=p_public_id and p.access_code=p_access_code and rw.claim_status<>'cancelled'
 order by rw.created_at desc;
$$;

create or replace function public.claim_event_reward(p_public_id uuid,p_access_code text,p_reward_id uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v event_rewards; p event_participants;
begin
 select * into p from event_participants where public_id=p_public_id and access_code=p_access_code;
 if p.id is null then raise exception 'Acceso de participante inválido'; end if;
 update event_rewards set claim_status=case when claim_status='pending' then 'claimed' else claim_status end,
 claimed_at=coalesce(claimed_at,now()) where id=p_reward_id and participant_id=p.id and claim_status in('pending','claimed') returning * into v;
 if v.id is null then raise exception 'Recompensa no disponible'; end if;
 return jsonb_build_object('id',v.id,'game_key',v.game_key,'reward_label',v.reward_label,'claim_code',v.claim_code,'claim_status',v.claim_status);
end $$;
grant execute on function public.get_my_event_rewards(uuid,text),public.claim_event_reward(uuid,text,uuid) to anon,authenticated;

create or replace function public.admin_update_event_reward(p_reward_id uuid,p_status text,p_notes text default null)
returns public.event_rewards language plpgsql security definer set search_path=public as $$
declare v event_rewards;
begin
 if not public.is_event_admin(auth.uid()) then raise exception 'Acceso no autorizado'; end if;
 if p_status not in('pending','claimed','delivered','cancelled') then raise exception 'Estado inválido'; end if;
 update event_rewards set claim_status=p_status,notes=nullif(trim(p_notes),''),
 delivered_at=case when p_status='delivered' then coalesce(delivered_at,now()) else delivered_at end
 where id=p_reward_id returning * into v; return v;
end $$;
grant execute on function public.admin_update_event_reward(uuid,text,text) to authenticated;

create or replace function public.sync_existing_event_rewards() returns integer language plpgsql security definer set search_path=public as $$
declare n integer:=0;
begin
 insert into event_rewards(room_id,participant_id,game_key,source_id,reward_label,reward_type)
 select tr.room_id,tr.winner_participant_id,'trivia',tr.id::text,'Recompensa por Trivia LIHEN','game_reward'
 from event_trivia_rounds tr where tr.winner_participant_id is not null
 on conflict do nothing; get diagnostics n=row_count;
 insert into event_rewards(room_id,participant_id,game_key,source_id,reward_label,reward_type)
 select wr.room_id,wr.winner_participant_id,'word',wr.id::text,'Recompensa por Encuentra la palabra','game_reward'
 from event_word_rounds wr where wr.winner_participant_id is not null on conflict do nothing;
 insert into event_rewards(room_id,participant_id,game_key,source_id,reward_label,reward_type)
 select fr.room_id,fs.participant_id,'flash',fs.id::text,'Recompensa por Reto relámpago','game_reward'
 from event_flash_submissions fs join event_flash_rounds fr on fr.id=fs.round_id where fs.review_status='approved' on conflict do nothing;
 insert into event_rewards(room_id,participant_id,game_key,source_id,reward_label,reward_type)
 select rr.room_id,rs.participant_id,'roulette',rs.id::text,rs.prize_label,'roulette_prize'
 from event_roulette_spins rs join event_roulette_rounds rr on rr.id=rs.round_id where rs.is_winner=true on conflict do nothing;
 return n;
end $$;

create or replace function public.event_reward_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin
 if tg_table_name='event_trivia_rounds' and new.winner_participant_id is not null and (old.winner_participant_id is distinct from new.winner_participant_id) then
  perform register_event_reward(new.room_id,new.winner_participant_id,'trivia',new.id::text,'Recompensa por Trivia LIHEN');
 elsif tg_table_name='event_word_rounds' and new.winner_participant_id is not null and (old.winner_participant_id is distinct from new.winner_participant_id) then
  perform register_event_reward(new.room_id,new.winner_participant_id,'word',new.id::text,'Recompensa por Encuentra la palabra');
 elsif tg_table_name='event_flash_submissions' and new.review_status='approved' and old.review_status is distinct from new.review_status then
  perform register_event_reward((select room_id from event_flash_rounds where id=new.round_id),new.participant_id,'flash',new.id::text,'Recompensa por Reto relámpago');
 end if; return new;
end $$;

drop trigger if exists trg_reward_trivia on public.event_trivia_rounds;
create trigger trg_reward_trivia after update on public.event_trivia_rounds for each row execute function public.event_reward_trigger();
drop trigger if exists trg_reward_word on public.event_word_rounds;
create trigger trg_reward_word after update on public.event_word_rounds for each row execute function public.event_reward_trigger();
drop trigger if exists trg_reward_flash on public.event_flash_submissions;
create trigger trg_reward_flash after update on public.event_flash_submissions for each row execute function public.event_reward_trigger();

create or replace function public.roulette_reward_trigger() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.is_winner then perform register_event_reward((select room_id from event_roulette_rounds where id=new.round_id),new.participant_id,'roulette',new.id::text,new.prize_label,'roulette_prize'); end if; return new; end $$;
drop trigger if exists trg_reward_roulette on public.event_roulette_spins;
create trigger trg_reward_roulette after insert on public.event_roulette_spins for each row execute function public.roulette_reward_trigger();

select public.sync_existing_event_rewards();
do $$ begin alter publication supabase_realtime add table public.event_rewards; exception when duplicate_object then null; end $$;
