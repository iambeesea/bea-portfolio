-- Portfolio schema: projects, experiences, contact messages, storage.
-- Visitors may read published content. Nothing else is open to the public:
-- contact messages are written only by the server (service role).

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at current
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text not null,
  category          text not null,
  role              text,
  year              text,
  organization      text,
  short_description text not null,
  overview          text,
  problem           text,
  role_detail       text,
  solution          text,
  process           text,
  learnings         text,
  outcome           text,
  features          text[] not null default '{}',
  stack             text[] not null default '{}',
  tags              text[] not null default '{}',
  project_url       text,
  github_url        text,
  thumbnail_url     text,
  aspect_ratio      text not null default '4 / 3',
  featured          boolean not null default false,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on column public.projects.stack is
  'Technology names. A plain array on purpose: nothing queries by technology, so a join table would add upkeep without a benefit.';

-- slug already has a unique index. This one serves the only list query:
-- published projects in display order.
create index projects_published_order_idx on public.projects (sort_order) where status = 'published';

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- experiences (work, leadership, education)
-- ---------------------------------------------------------------------------
create table public.experiences (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('work', 'leadership', 'education')),
  role        text not null,
  company     text not null,
  location    text,
  date_label  text not null,
  start_date  date,
  end_date    date,
  current     boolean not null default false,
  summary     text not null,
  bullets     text[] not null default '{}',
  tags        text[] not null default '{}',
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create index experiences_kind_order_idx on public.experiences (kind, sort_order) where published;

create trigger experiences_set_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contact_messages
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 100),
  email       text not null check (char_length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject     text check (subject is null or char_length(subject) <= 150),
  message     text not null check (char_length(message) between 10 and 4000),
  ip_hash     text,
  user_agent  text check (user_agent is null or char_length(user_agent) <= 400),
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Serves the rate-limit lookup: recent messages from one sender.
create index contact_messages_ip_recent_idx on public.contact_messages (ip_hash, created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.projects         enable row level security;
alter table public.experiences      enable row level security;
alter table public.contact_messages enable row level security;

create policy "Published projects are public"
  on public.projects for select
  to anon, authenticated
  using (status = 'published');

create policy "Published experiences are public"
  on public.experiences for select
  to anon, authenticated
  using (published);

-- contact_messages has no policies on purpose: with RLS on, the anon and
-- authenticated roles can neither read nor write it. Only the service role,
-- used by the server-side contact action, can insert and read.

-- Belt and braces: remove table privileges the public roles never need.
revoke insert, update, delete, truncate on public.projects, public.experiences from anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: one public bucket for portfolio images
--   portfolio/projects/  portfolio/profile/  portfolio/assets/
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "Portfolio images are public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');
-- No insert/update/delete policies: uploads happen in the Supabase dashboard.
