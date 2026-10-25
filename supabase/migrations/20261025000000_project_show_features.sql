-- Lets a case study leave out its "Key features" section.
alter table public.projects
  add column show_features boolean not null default true;

update public.projects set show_features = false where slug = 'lolcode';
