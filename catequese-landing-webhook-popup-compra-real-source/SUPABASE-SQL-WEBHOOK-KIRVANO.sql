-- Supabase SQL para liberar materiais comprados via webhook Kirvano
-- Rode este SQL no Supabase: SQL Editor > New query > Run

create extension if not exists pgcrypto;

create table if not exists public.order_access (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text,
  customer_name text,
  order_id text,
  status_text text,
  basic_access boolean not null default false,
  complete_access boolean not null default false,
  activities365_access boolean not null default false,
  uno_da_fe_access boolean not null default false,
  lifetime_access boolean not null default false,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists order_access_email_idx on public.order_access (email);
create index if not exists order_access_code_idx on public.order_access (code);
create index if not exists order_access_order_id_idx on public.order_access (order_id);
create index if not exists order_access_created_at_idx on public.order_access (created_at desc);
