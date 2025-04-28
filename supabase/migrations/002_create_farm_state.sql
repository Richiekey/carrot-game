create table public.farm_state (
  user_id text primary key,
  seed_balance numeric not null default 0,
  last_claimed timestamptz
);
