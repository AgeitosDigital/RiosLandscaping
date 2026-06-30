# Rios Landscaping

Professional landscaping website for [Rios Landscaping](https://rioslandscaping.co) — Houston, TX.

Built with **Next.js**, deployed on **Vercel**, and backed by **Supabase** for quote requests and portfolio images.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Supabase (PostgreSQL + Storage)
- Vercel (hosting)

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/AgeitosDigital/RiosLandscaping.git
cd RiosLandscaping
npm install
```

### 2. Environment variables

Copy the example env file and add your Supabase anon key:

```bash
cp .env.example .env.local
```

Get your **anon key** from the [Supabase API settings](https://supabase.com/dashboard/project/mvwssjrvreememnhrsbr/settings/api).

```env
NEXT_PUBLIC_SUPABASE_URL=https://mvwssjrvreememnhrsbr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=https://rioslandscaping.co
```

### 3. Run database migration

In the [Supabase SQL Editor](https://supabase.com/dashboard/project/mvwssjrvreememnhrsbr/sql/new), run the migration at:

```
supabase/migrations/20250630143000_initial_schema.sql
```

This creates:
- `quote_requests` — customer quote form submissions
- `gallery_images` — portfolio metadata (images stored in Storage)
- `portfolio` storage bucket with public read access

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add the same environment variables from `.env.local`
4. Connect the domain `rioslandscaping.co` in Vercel project settings

## Project structure

```
src/
  app/           # Pages, layout, server actions
  components/    # UI sections (Hero, Services, Gallery, Quote form)
  lib/           # Supabase clients, constants, gallery helpers
  types/         # TypeScript types
supabase/
  migrations/    # Database schema
```

## Quote form

Customers submit quote requests via the homepage form. Submissions are stored in Supabase `quote_requests` and can be viewed in the Supabase Table Editor.

## Gallery images

Upload images to the `portfolio` bucket in Supabase Storage, then add rows to `gallery_images` with the file path. Until images are added, the site shows placeholder photos.
