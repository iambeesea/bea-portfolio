# Bea Portfolio

Beatrice Capule's portfolio: a single-page, animated "constellation" site built with Next.js, React, TypeScript, Tailwind CSS and Supabase, deployed on Vercel.

The design comes from the Claude Design project "Bea Portfolio (Try)".

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed to run: without Supabase the site shows its built-in content, and the contact form tells visitors to email instead.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no output |
| `npm run format` | Prettier |

## How it is organised

```
app/                    Routes, metadata, sitemap, robots, manifest, error pages
  actions/contact.ts    Contact form server action (validation, rate limit, Supabase)
components/
  experience/           The interactive stage and its host component
  layout/               Navigation
  sections/             Hero, Journey, About, Experience, Tech, Work, Contact
  overlays/             Intro, case study, lightbox
  projects/             Project card
  seo/                  Structured data
lib/
  content/              Content loader, built-in content, tech list
  experience/           Animation engine and view helpers
  supabase/             Server clients (public and service role)
  validation/           Contact form schema (shared by browser and server)
  site.ts               Name, email, links, SEO defaults
types/                  Content and database types
supabase/               Database migration and seed data
public/                 Photos and tech icons
```

### How a page is built

1. `app/page.tsx` runs on the server and loads projects and experience from Supabase (`lib/content`).
2. If Supabase is not configured, unreachable or empty, it uses `lib/content/fallback.ts`, so the page never breaks because of the database.
3. The content is passed to `PortfolioExperience`, the one client component, which renders the sections and runs the animation engine.
4. The page is cached and refreshed every five minutes, so edits made in Supabase appear without a redeploy.

### Where to change things

| To change | Edit |
| --- | --- |
| Projects, experience, leadership, education | Supabase tables (or `lib/content/fallback.ts`) |
| Tech constellation | `lib/content/technologies.ts` |
| Name, email, LinkedIn, SEO title and description | `lib/site.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| A section's layout or copy | `components/sections/` |

### The animation engine

`lib/experience/engine.ts` holds the scroll, canvas, sound and hover effects, carried over from the design prototype. It drives the page directly through refs and `data-*` attributes, so it is the one file excluded from type-checking (`// @ts-nocheck`), and the sections keep the design's inline styles because the engine reads and resets them. Tailwind supplies the design tokens (`bg-bg`, `text-ink`, `font-wide`, …) and styles everything outside the engine.

## Supabase

Schema, security rules and seed data live in `supabase/`.

- `projects` — public can read rows with `status = 'published'`.
- `experiences` — work, leadership and education; public can read rows with `published = true`.
- `contact_messages` — no public access at all. Only the server writes to it, with the service role key.
- Storage bucket `portfolio` — public read, for project images (`projects/`, `profile/`, `assets/`).

Set a project's `thumbnail_url` to a file in the `portfolio` bucket to give its card a cover image.

### Setup

1. Create a Supabase project.
2. In the SQL editor, run `supabase/migrations/20261006000000_portfolio.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` to `.env.local` and fill in the values from Project Settings → API.

Contact messages arrive in the `contact_messages` table; nothing emails you when one comes in. Check the table in the dashboard, or add a Supabase database webhook if you want a notification.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | Public address of the site, for canonical URLs, the sitemap and link previews |
| `NEXT_PUBLIC_SUPABASE_URL` | For Supabase | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For Supabase | Public key; limited by Row Level Security to reading published content |
| `SUPABASE_SERVICE_ROLE_KEY` | For the contact form | Secret, server only; stores contact messages |
| `CONTACT_IP_SALT` | No | Random string that salts the hashed sender address used for rate limiting |

Never commit real keys. `.env*` files are ignored by git, except `.env.example`.

## Deploying to Vercel

1. Import the GitHub repository in Vercel. The defaults (Next.js preset) are correct.
2. Add the environment variables above under Settings → Environment Variables.
3. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final address and redeploy.
