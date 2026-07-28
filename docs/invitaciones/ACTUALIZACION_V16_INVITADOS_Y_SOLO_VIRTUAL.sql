-- LIHEN.CO · Actualización V16 de invitados y modalidad solo virtual
-- Ejecutar en Supabase SQL Editor después de revisar.
begin;

alter table public.invitations
  add column if not exists virtual_only boolean not null default false;

alter table public.invitations drop constraint if exists invitations_named_guests_check;
alter table public.invitations drop constraint if exists invitations_max_attendees_check;
alter table public.invitations
  add constraint invitations_named_guests_check check (named_guests between 1 and 4);
alter table public.invitations
  add constraint invitations_max_attendees_check check (max_attendees between 1 and 4);

delete from public.invitations
where access_code in ('LHN-DIA-001', 'LHN-DIA-002', 'LHN-LIZ-022', 'LHN-LIZ-030');

insert into public.invitations
(access_code,responsible,display_name,named_guests,max_attendees,notes,virtual_only)
values
  ('LHN-DIA-003','Diana Restrepo','Erika Palomino',1,3,null,false),
  ('LHN-DIA-004','Diana Restrepo','Alejandra y Sary Zuluaga',2,3,null,false),
  ('LHN-DIA-005','Diana Restrepo','Lina Pomelo',1,3,null,false),
  ('LHN-DIA-006','Diana Restrepo','Valentina Gómez',1,3,null,false),
  ('LHN-DIA-007','Diana Restrepo','Mónica Ospitia',1,3,null,false),
  ('LHN-DIA-008','Diana Restrepo','Leydi',1,3,'Referencia interna: la de las arepas',false),
  ('LHN-DIA-009','Diana Restrepo','Yulieth Mejía',1,3,null,false),
  ('LHN-DIA-010','Diana Restrepo','Ana Sofía y Luciana Mejía',2,3,null,false),
  ('LHN-DIA-011','Diana Restrepo','Paola América',1,3,null,false),
  ('LHN-DIA-012','Diana Restrepo','Lorena Cosme',1,3,null,false),
  ('LHN-DIA-013','Diana Restrepo','Lina y Natalia Castañeda',2,3,null,false),
  ('LHN-DIA-014','Diana Restrepo','Julieth Toro',1,3,null,false),
  ('LHN-DIA-015','Diana Restrepo','Jessica Castro',1,3,null,false),
  ('LHN-DIA-016','Diana Restrepo','Maritza',1,3,null,false),
  ('LHN-DIA-017','Diana Restrepo','Syndi y Gabriela Erazo',2,3,null,false),
  ('LHN-DIA-018','Diana Restrepo','Gabriela Valencia',1,3,null,false),
  ('LHN-DIA-019','Diana Restrepo','Paola Quiroga',1,3,null,false),
  ('LHN-DIA-020','Diana Restrepo','Jennifer',1,3,null,false),
  ('LHN-DIA-021','Diana Restrepo','Claudia',1,3,null,false),
  ('LHN-DIA-022','Diana Restrepo','Angie y Claudia Duque',2,3,null,false),
  ('LHN-DIA-023','Diana Restrepo','Paula y Kathe Villegas',2,3,null,false),
  ('LHN-DIA-024','Diana Restrepo','Layni',1,3,null,false),
  ('LHN-DIA-025','Diana Restrepo','Clara',1,3,null,false),
  ('LHN-DIA-026','Diana Restrepo','Isis y Valentina Zea',2,3,null,false),
  ('LHN-DIA-027','Diana Restrepo','Melisa',1,3,null,false),
  ('LHN-LIZ-001','Lizeth Londoño','Juan Pablo Giraldo',1,3,null,false),
  ('LHN-LIZ-002','Lizeth Londoño','Edilberto Londoño',1,3,null,false),
  ('LHN-LIZ-003','Lizeth Londoño','Edilberto Bohórquez',1,3,null,false),
  ('LHN-LIZ-004','Lizeth Londoño','María Elena Tabares',1,3,null,false),
  ('LHN-LIZ-005','Lizeth Londoño','María del Carmen Tabares',1,3,null,false),
  ('LHN-LIZ-006','Lizeth Londoño','Andrea Tabares y Miguel Ángel',2,3,'Puede agregar 1 acompañante',false),
  ('LHN-LIZ-007','Lizeth Londoño','Fernanda Tabares',1,3,null,false),
  ('LHN-LIZ-008','Lizeth Londoño','Geraldine Ayala Tabares',1,3,null,false),
  ('LHN-LIZ-009','Lizeth Londoño','Herbinson Ayala Tabares',1,3,null,false),
  ('LHN-LIZ-010','Lizeth Londoño','Johan Ayala Tabares',1,3,null,false),
  ('LHN-LIZ-011','Lizeth Londoño','Paola Mosquera',1,3,null,false),
  ('LHN-LIZ-012','Lizeth Londoño','Marcela Mosquera',1,3,null,false),
  ('LHN-LIZ-013','Lizeth Londoño','Kamila Reyes',1,3,null,false),
  ('LHN-LIZ-014','Lizeth Londoño','Natalia Moreno',1,3,null,false),
  ('LHN-LIZ-015','Lizeth Londoño','Zayuri Giraldo',1,3,null,false),
  ('LHN-LIZ-016','Lizeth Londoño','Arcenire Londoño',1,3,null,false),
  ('LHN-LIZ-017','Lizeth Londoño','Anderson Osorio',1,3,null,false),
  ('LHN-LIZ-018','Lizeth Londoño','Andrés Cardona',1,3,null,true),
  ('LHN-LIZ-019','Lizeth Londoño','Angélica',1,3,'Brasil; apellido pendiente; probable modalidad virtual',true),
  ('LHN-LIZ-020','Lizeth Londoño','Cristian Mosquera',1,3,null,false),
  ('LHN-LIZ-021','Lizeth Londoño','David Valencia',1,3,null,false),
  ('LHN-LIZ-023','Lizeth Londoño','Diego Franco',1,3,null,true),
  ('LHN-LIZ-024','Lizeth Londoño','Idali Hurtado',1,3,'Vecina',false),
  ('LHN-LIZ-025','Lizeth Londoño','Edwin Roa',1,3,null,true),
  ('LHN-LIZ-026','Lizeth Londoño','Eliuth García',1,3,null,true),
  ('LHN-LIZ-027','Lizeth Londoño','Héctor Bedoya',1,3,null,false),
  ('LHN-LIZ-028','Lizeth Londoño','Isaac Medina',1,3,null,true),
  ('LHN-LIZ-029','Lizeth Londoño','Jesús Flórez',1,3,null,true),
  ('LHN-LIZ-031','Lizeth Londoño','Jhonny Benavides',1,3,null,true),
  ('LHN-LIZ-032','Lizeth Londoño','Jorge Londoño Gómez',1,3,null,false),
  ('LHN-LIZ-033','Lizeth Londoño','Kamilo Lara',1,3,null,false),
  ('LHN-LIZ-034','Lizeth Londoño','Karen Elena Correa',1,3,'Brasil; probable modalidad virtual',true),
  ('LHN-LIZ-035','Lizeth Londoño','Laura Sofía',1,3,'Apellido pendiente',false),
  ('LHN-LIZ-036','Lizeth Londoño','Lila',1,3,'Apellido pendiente',false),
  ('LHN-LIZ-037','Lizeth Londoño','Jhon David',1,3,'Invitación separada; puede agregar hasta 2 acompañantes',false),
  ('LHN-HEL-001','Hellen Restrepo','Yuri Montenegro',1,3,null,false),
  ('LHN-HEL-002','Hellen Restrepo','Lucía Santacruz',1,3,null,false),
  ('LHN-HEL-003','Hellen Restrepo','Gloria Anturi',1,3,null,false),
  ('LHN-HEL-004','Hellen Restrepo','Danna Rojas',1,3,null,false),
  ('LHN-HEL-005','Hellen Restrepo','Nilsa Salinas',1,3,null,false),
  ('LHN-HEL-006','Hellen Restrepo','Lucia Santacruz',1,3,null,false),
  ('LHN-HEL-007','Hellen Restrepo','Tiana',1,3,'Apellido pendiente',false),
  ('LHN-HEL-008','Hellen Restrepo','Brenda Popo',1,3,null,false),
  ('LHN-HEL-009','Hellen Restrepo','Didier Ramirez',2,3,null,false),
  ('LHN-HEL-010','Hellen Restrepo','Laura Navarez',2,3,null,false),
  ('LHN-HEL-011','Hellen Restrepo','Karen Restrepo',1,3,null,false),
  ('LHN-HEL-012','Hellen Restrepo','Valeria Hurtado',1,3,null,false),
  ('LHN-HEL-013','Hellen Restrepo','Angie Garcia',1,3,null,false),
  ('LHN-HEL-014','Hellen Restrepo','Angeli Ocampo',2,3,null,false),
  ('LHN-HEL-015','Hellen Restrepo','Karen Dayana Box',1,3,null,false),
  ('LHN-HEL-016','Hellen Restrepo','Miguel Riascos box',1,3,null,false),
  ('LHN-HEL-017','Hellen Restrepo','Daniela Box',1,3,null,false),
  ('LHN-HEL-018','Hellen Restrepo','Camila Palacio',1,3,null,false),
  ('LHN-HEL-019','Hellen Restrepo','Carol Moreno',2,3,null,false),
  ('LHN-HEL-020','Hellen Restrepo','Ana Ramirez',3,3,null,false),
  ('LHN-HEL-021','Hellen Restrepo','Angela cartagena',3,3,null,false),
  ('LHN-HEL-022','Hellen Restrepo','Sofia chambo',2,3,null,false),
  ('LHN-HEL-023','Hellen Restrepo','Sofia Bravo',1,3,null,false),
  ('LHN-HEL-024','Hellen Restrepo','Brayan Suescun',1,3,null,false),
  ('LHN-HEL-025','Hellen Restrepo','Yosef Moreno',2,3,null,false),
  ('LHN-HEL-026','Hellen Restrepo','Liseth Ruiz',1,3,null,false),
  ('LHN-HEL-027','Hellen Restrepo','Nicol Correa',1,3,null,false),
  ('LHN-HEL-028','Hellen Restrepo','Jeimy',4,4,'Apellido pendiente',false),
  ('LHN-HEL-029','Hellen Restrepo','Estefany salazar',2,3,null,false),
  ('LHN-HEL-030','Hellen Restrepo','Laura Velazco',2,3,null,false),
  ('LHN-HEL-031','Hellen Restrepo','Diana Sacananbuy',1,3,null,false),
  ('LHN-LIZ-038','Lizeth Londoño','Sirney Marin Tabares',1,3,null,true),
  ('LHN-HEL-032','Hellen Restrepo','Juan Carlos Restrepo Martinez',1,3,null,true),
  ('LHN-LIZ-039','Lizeth Londoño','Nelvi',2,3,'Apellido pendiente',false),
  ('LHN-LIZ-040','Lizeth Londoño','Yurani Tabares',1,3,null,false),
  ('LHN-LIZ-041','Lizeth Londoño','Orfaneri Londoño',1,3,null,true),
  ('LHN-LIZ-042','Lizeth Londoño','Fary Bohorquez',1,3,null,true),
  ('LHN-LIZ-043','Lizeth Londoño','Sandra Cordoba',1,3,null,false),
  ('LHN-LIZ-044','Lizeth Londoño','Mery Bohórquez',1,3,null,true),
  ('LHN-LIZ-045','Lizeth Londoño','Angelli  Londoño',1,3,null,true),
  ('LHN-LIZ-046','Lizeth Londoño','Steven Pelaez',1,3,null,false),
  ('LHN-LIZ-047','Lizeth Londoño','Martha',1,3,'Apellido pendiente',true),
  ('LHN-HEL-033','Hellen Restrepo','Esteban Bermudez',1,3,null,false),
  ('LHN-HEL-034','Hellen Restrepo','Evelin',1,3,'Apellido pendiente',false),
  ('LHN-HEL-035','Hellen Restrepo','Juan Jose',1,3,null,true),
  ('LHN-HEL-036','Hellen Restrepo','Erick Ramiro Sarasti',1,3,null,true),
  ('LHN-HEL-037','Hellen Restrepo','Heidi Sarasti',1,3,null,false),
  ('LHN-HEL-038','Hellen Restrepo','Yaneth',1,3,'Apellido pendiente',true),
  ('LHN-LIZ-048','Lizeth Londoño','Leonardo Londoño',1,3,null,true)
on conflict (access_code) do update set
  responsible=excluded.responsible,
  display_name=excluded.display_name,
  named_guests=excluded.named_guests,
  max_attendees=excluded.max_attendees,
  notes=excluded.notes,
  virtual_only=excluded.virtual_only;

drop function if exists public.get_invitation_by_code(text);

create or replace function public.get_invitation_by_code(p_code text)
returns table(
  access_code text,
  responsible text,
  display_name text,
  named_guests integer,
  max_attendees integer,
  status text,
  virtual_only boolean
)
language sql security definer set search_path=public as $$
  select i.access_code,i.responsible,i.display_name,i.named_guests,i.max_attendees,
         case when i.confirmed_at is null then 'pending' else 'confirmed' end,
         i.virtual_only
  from public.invitations i
  where upper(i.access_code)=upper(trim(p_code))
  limit 1;
$$;

create or replace function public.confirm_invitation(p_code text,p_mode text,p_attendees integer)
returns jsonb language plpgsql security definer set search_path=public as $$
declare
  inv public.invitations;
  private_config public.invitation_private_event_config;
  location_payload jsonb := null;
begin
  select * into inv
  from public.invitations
  where upper(access_code)=upper(trim(p_code))
  for update;

  if inv.id is null then raise exception 'Invitación no encontrada'; end if;
  if p_mode not in ('presencial','virtual','no_asiste') then raise exception 'Modalidad inválida'; end if;
  if inv.virtual_only and p_mode='presencial' then
    raise exception 'Esta invitación está habilitada únicamente para modalidad virtual';
  end if;
  if p_mode='presencial' and (p_attendees<inv.named_guests or p_attendees>inv.max_attendees) then
    raise exception 'Cantidad fuera del cupo autorizado';
  end if;

  update public.invitations
     set attendance_mode=p_mode,
         confirmed_attendees=case when p_mode='presencial' then p_attendees else 0 end,
         confirmed_at=now()
   where id=inv.id;

  if p_mode='presencial' then
    select * into private_config
    from public.invitation_private_event_config
    where id=1;
    if private_config.id is not null then
      location_payload := jsonb_build_object(
        'address', private_config.event_address,
        'maps_url', private_config.maps_url
      );
    end if;
  end if;

  return jsonb_build_object(
    'ok', true,
    'mode', p_mode,
    'location', location_payload
  );
end;$$;

grant execute on function public.get_invitation_by_code(text) to anon;
grant execute on function public.confirm_invitation(text,text,integer) to anon;

commit;

select responsible,
       count(*) as total_invitaciones,
       count(*) filter (where virtual_only) as solo_virtual
from public.invitations
group by responsible
order by responsible;