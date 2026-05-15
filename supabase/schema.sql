create table matches (
  id uuid primary key default gen_random_uuid(),
  player_id uuid,
  mode text default 'sandbox',
  started_at timestamptz default now(),
  ended_at timestamptz,
  winner text,
  total_moves integer default 0,
  total_captures integer default 0
);

create table moves (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade,
  player text not null,
  from_notation text not null,
  to_notation text not null,
  is_capture boolean default false,
  is_valid boolean default true,
  raw_command text,
  executed_at timestamptz default now()
);

alter table matches enable row level security;
alter table moves enable row level security;

create policy "Anyone can insert matches" on matches for insert with check (true);
create policy "Anyone can read matches" on matches for select using (true);
create policy "Anyone can insert moves" on moves for insert with check (true);
create policy "Anyone can read moves" on moves for select using (true);
