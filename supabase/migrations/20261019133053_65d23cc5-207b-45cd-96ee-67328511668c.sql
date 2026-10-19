create type public.app_role as enum ('admin', 'client', 'visitor');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "users read own profile" on public.profiles for select to authenticated using (auth.uid() = id or public.has_role(auth.uid(), 'admin'));
create policy "users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  insert into public.user_roles (user_id, role) values (new.id, 'client');
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text,
  icon text,
  features jsonb not null default '[]'::jsonb,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
create policy "public read active services" on public.services for select using (is_active = true);
create policy "admin manage services" on public.services for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_name text,
  category text,
  thumbnail_url text,
  gallery_urls jsonb not null default '[]'::jsonb,
  tech_stack jsonb not null default '[]'::jsonb,
  case_study_md text,
  is_featured boolean not null default false,
  published_at timestamptz default now()
);
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "public read projects" on public.projects for select using (true);
create policy "admin manage projects" on public.projects for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.workflows (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete set null,
  title text not null,
  description text,
  steps jsonb not null default '[]'::jsonb,
  video_url text,
  created_at timestamptz not null default now()
);
grant select on public.workflows to anon, authenticated;
grant insert, update, delete on public.workflows to authenticated;
grant all on public.workflows to service_role;
alter table public.workflows enable row level security;
create policy "public read workflows" on public.workflows for select using (true);
create policy "admin manage workflows" on public.workflows for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 255),
  company text check (char_length(company) <= 100),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 10 and 5000),
  service_interest text check (char_length(service_interest) <= 200),
  budget text check (char_length(budget) <= 100),
  preferred_contact text check (char_length(preferred_contact) <= 50),
  preferred_date text check (char_length(preferred_date) <= 100),
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon, authenticated;
grant select, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "anyone can create enquiry" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "admin read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin update enquiries" on public.enquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));