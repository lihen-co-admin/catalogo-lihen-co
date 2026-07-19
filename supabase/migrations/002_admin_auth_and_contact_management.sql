-- Etapa 8 · Autenticación y autorización del panel administrativo.
-- Ejecutar después de 001_create_contact_requests.sql.

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

drop policy if exists "Admin can read own profile" on public.admin_profiles;
create policy "Admin can read own profile"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = user_id and active = true);

-- Solo perfiles administrativos activos pueden leer solicitudes.
drop policy if exists "Authorized admins can read contact requests" on public.contact_requests;
create policy "Authorized admins can read contact requests"
on public.contact_requests
for select
to authenticated
using (
  exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid() and ap.active = true
  )
);

-- Solo perfiles administrativos activos pueden actualizar el estado.
drop policy if exists "Authorized admins can update contact requests" on public.contact_requests;
create policy "Authorized admins can update contact requests"
on public.contact_requests
for update
to authenticated
using (
  exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid() and ap.active = true
  )
)
with check (
  exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid() and ap.active = true
  )
  and status in ('new', 'in_review', 'answered', 'closed')
);

-- IMPORTANTE:
-- 1. Crea la cuenta desde Supabase > Authentication > Users > Add user.
-- 2. Copia el UUID de la cuenta.
-- 3. Autorízala con un INSERT como este, cambiando los valores:
-- insert into public.admin_profiles (user_id, display_name)
-- values ('UUID-DE-LA-CUENTA', 'Lina Lizeth');
