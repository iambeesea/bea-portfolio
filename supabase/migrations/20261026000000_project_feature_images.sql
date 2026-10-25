-- Optional screenshot for each "Key features" card, matched to features by position.
alter table public.projects
  add column feature_images text[] not null default '{}';

update public.projects
set
  thumbnail_url = '/images/projects/farm-to-table.webp',
  features = array[
    'Sales reports for administrators, filterable by period, listing each product''s price, quantity sold and income, with the total.',
    'Customer sign-up and authentication, with separate customer and administrator access.'
  ],
  feature_images = array[
    '/images/projects/farm-to-table-sales.webp',
    '/images/projects/farm-to-table-signup.webp'
  ]
where slug = 'farm-to-table';
