create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text,
  cpf text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists clientes_cpf_unique
  on public.clientes ((nullif(regexp_replace(coalesce(cpf, ''), '\D', '', 'g'), '')));

create unique index if not exists clientes_telefone_unique
  on public.clientes ((nullif(regexp_replace(coalesce(telefone, ''), '\D', '', 'g'), '')));

create index if not exists clientes_nome_idx
  on public.clientes (lower(nome));

create table if not exists public.orcamentos (
  id uuid primary key default gen_random_uuid(),
  numero_orcamento varchar(3) not null,
  cliente_id uuid references public.clientes(id) on delete set null,
  nome_cliente_snapshot text not null,
  telefone_snapshot text,
  cpf_snapshot text,
  veiculo_modelo text,
  veiculo_cor text,
  placa text,
  prazo text,
  data_orcamento date not null default current_date,
  data_validade date,
  observacoes text,
  subtotal numeric(12,2) not null default 0,
  desconto_tipo text not null default 'valor' check (desconto_tipo in ('valor', 'percentual')),
  desconto_valor numeric(12,2) not null default 0,
  desconto_percentual numeric(7,2) not null default 0,
  total numeric(12,2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists orcamentos_cliente_id_idx
  on public.orcamentos (cliente_id);

create index if not exists orcamentos_data_orcamento_idx
  on public.orcamentos (data_orcamento desc);

create index if not exists orcamentos_numero_idx
  on public.orcamentos (numero_orcamento);

create table if not exists public.orcamento_itens (
  id bigserial primary key,
  orcamento_id uuid not null references public.orcamentos(id) on delete cascade,
  ordem integer not null default 1,
  categoria text,
  servico text not null,
  detalhes text,
  quantidade numeric(12,2) not null default 1,
  valor_unitario numeric(12,2) not null default 0,
  valor_total numeric(12,2) not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists orcamento_itens_orcamento_id_idx
  on public.orcamento_itens (orcamento_id, ordem);

drop trigger if exists clientes_set_updated_at on public.clientes;
create trigger clientes_set_updated_at
before update on public.clientes
for each row
execute function public.set_updated_at();

drop trigger if exists orcamentos_set_updated_at on public.orcamentos;
create trigger orcamentos_set_updated_at
before update on public.orcamentos
for each row
execute function public.set_updated_at();

alter table public.clientes enable row level security;
alter table public.orcamentos enable row level security;
alter table public.orcamento_itens enable row level security;

drop policy if exists "clientes_public_full_access" on public.clientes;
create policy "clientes_public_full_access"
on public.clientes
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "orcamentos_public_full_access" on public.orcamentos;
create policy "orcamentos_public_full_access"
on public.orcamentos
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "orcamento_itens_public_full_access" on public.orcamento_itens;
create policy "orcamento_itens_public_full_access"
on public.orcamento_itens
for all
to anon, authenticated
using (true)
with check (true);
