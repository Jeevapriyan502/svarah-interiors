-- ============================================================
-- Svarah Interiors — Supabase schema
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Lead status for CRM-style tracking
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'closed');

-- ── Leads table (contact form submissions) ───────────────────
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  client_name   text not null check (char_length(trim(client_name)) >= 2),
  email         text not null check (email ~* '^[a-zA-Z0-9._%+-]+@gmail\.com$'),
  phone_number  text not null check (char_length(trim(phone_number)) >= 10),
  project_type  text not null check (
    project_type in (
      'Residential',
      'Commercial',
      'Hospitality',
      'Renovation',
      'Full Interior',
      'Consultation'
    )
  ),
  message       text,
  status        public.lead_status not null default 'new'
);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

-- Indexes
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

-- ── Row Level Security ───────────────────────────────────────
-- The Next.js API uses the service role key (server-only).
-- Public/anon users have NO direct access to leads.
alter table public.leads enable row level security;

-- Revoke default public grants (defense in depth)
revoke all on public.leads from anon, authenticated;

-- Service role bypasses RLS; this policy documents server-only access.
create policy "Service role full access"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- ── Optional: view leads in Supabase Table Editor ────────────
-- Authenticated dashboard users can read leads (uncomment if needed):
--
-- create policy "Authenticated users can read leads"
--   on public.leads
--   for select
--   to authenticated
--   using (true);
