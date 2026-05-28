# mk_wedding

Wedding website - Next.js + Tailwind, deployed to Cloudflare (Workers + static assets) via OpenNext. RSVPs are stored in Cloudflare D1.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Cloudflare Workers (via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)) for hosting
- Cloudflare D1 (SQLite) for RSVP storage
- Wrangler 4 for local dev + deploy

## Routes

| Path                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `/`                     | Hero / landing                                       |
| `/story`                | "Our story" timeline                                 |
| `/schedule`             | Day-of event schedule + venue                        |
| `/rsvp`                 | RSVP form (POSTs to `/api/rsvp`)                     |
| `/api/rsvp`             | Writes a row into D1                                 |
| `/admin`                | Password-protected RSVP list (Basic auth)            |
| `/api/admin/rsvps.csv`  | CSV export (also Basic-auth protected)               |

Admin auth uses HTTP Basic via `src/proxy.ts`. The username can be anything; the password is whatever `ADMIN_PASSWORD` is set to.

## Edit site content

Couple names, wedding date, venue, RSVP deadline, etc. all live in **`src/lib/site.ts`** - edit them in one place.

Page-specific content lives next to each page:
- "Our story" chapters: `src/app/story/page.tsx`
- Schedule events: `src/app/schedule/page.tsx`
- Meal choices: `src/app/api/rsvp/route.ts` (the `MEALS` set) and `src/app/rsvp/RsvpForm.tsx`

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # set ADMIN_PASSWORD for local /admin
npm run dev                       # next dev on http://localhost:3000
```

For the RSVP form and admin pages to work locally you also need a local D1 database:

```bash
npx wrangler d1 create mk-wedding-db   # one-time; paste the id into wrangler.jsonc
npm run db:migrate:local                # applies migrations/0001_init.sql locally
```

## Production preview (Workers runtime, local)

```bash
npm run preview
```

This runs `opennextjs-cloudflare build && opennextjs-cloudflare preview`, which boots the actual Worker bundle in Wrangler - closer to production than `next dev`.

## Deploy

```bash
# one-time setup
npx wrangler login
npx wrangler d1 create mk-wedding-db   # paste id into wrangler.jsonc
npx wrangler secret put ADMIN_PASSWORD # set a real password
npm run db:migrate:remote               # apply schema to remote D1

# every deploy
npm run deploy
```

The custom domain isn't set up yet. Once you have one, add a `routes` block to `wrangler.jsonc` or attach a custom domain via the Cloudflare dashboard.

## Migrations

SQL migrations live in `migrations/`. Add new files numbered sequentially (e.g. `0002_add_table.sql`) and run `npm run db:migrate:local` / `npm run db:migrate:remote`.
