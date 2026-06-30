-- Quote requests from the contact form
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  address text,
  service_type text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz not null default now()
);

-- Portfolio / gallery images (files stored in Supabase Storage)
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  storage_path text not null,
  display_order integer not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists gallery_images_display_order_idx on public.gallery_images (display_order asc);

alter table public.quote_requests enable row level security;
alter table public.gallery_images enable row level security;

-- Anyone can submit a quote request
create policy "Anyone can insert quote requests"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (true);

-- Public can view gallery images
create policy "Anyone can view gallery images"
  on public.gallery_images
  for select
  to anon, authenticated
  using (true);

-- Storage bucket for portfolio images
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "Public read access for portfolio images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio');
