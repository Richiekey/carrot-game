create table public.carrot_plots (
  id bigserial primary key,
  user_id text not null,
  plot_id integer not null,
  planted_at timestamptz not null default now(),
  watered_days jsonb not null default '[]',
  last_watered_at timestamptz,
  harvested boolean not null default false
);
