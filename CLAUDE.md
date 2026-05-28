@AGENTS.md

# mk_wedding - guidance for Claude

This is a wedding website built on **Next.js 16 (App Router) + Tailwind v4**, deployed to **Cloudflare Workers** (with static assets) via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). RSVPs are stored in **Cloudflare D1**.

## Editing content

Most "what does this page say?" edits flow through these files:
- `src/lib/site.ts` - couple names, date, venue, RSVP deadline, hashtag. **Change here first** before patching individual pages.
- `src/app/story/page.tsx` - the chapters array (Year/Title/Body)
- `src/app/schedule/page.tsx` - the events array (Time/Title/Location/Details)

## Cloudflare bindings

Bindings are declared in `wrangler.jsonc` and typed in `cloudflare-env.d.ts`. Today: a D1 binding `DB` and an `ADMIN_PASSWORD` var. Access them with:

```ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
const { env } = await getCloudflareContext({ async: true });
env.DB // D1Database
```

There's a thin helper at `src/lib/db.ts` (`getDB()`) - use it instead of calling `getCloudflareContext` directly in route handlers.

## Admin auth

`/admin/*` and `/api/admin/*` are gated by HTTP Basic auth in `src/proxy.ts`. The password is `env.ADMIN_PASSWORD`. There is no real session - every request re-authenticates. Don't redesign this without asking.

> Note: Next 16 renamed `middleware.ts` to `proxy.ts`. Keep using `proxy.ts`.

## D1 schema changes

Don't write D1-changing migrations into existing files. Add a new `migrations/000N_*.sql` and run:
- `npm run db:migrate:local` (Miniflare)
- `npm run db:migrate:remote` (production)

## Style and commit rules

- **No em-dash character anywhere.** Site copy, code, comments, docs, commit messages. Use commas, colons, periods, pipes (`|`), or middle dots (`·`) instead.
- **Commits:** keep messages simple (one short subject line). **Never** include a `Co-Authored-By: Claude ...` trailer or any Claude attribution. **Always offer the user three message options to pick from** before committing.

## Don't add for now

- No real auth, OAuth, sessions, or "admin user accounts" - basic auth on one password is intentional for v1.
- No analytics, A/B testing, feature flags, or CMS.
- No image uploads / photo galleries (not in v1 scope per the user).
- No multi-event abstraction (one wedding, one couple).

## Verifying changes

- `npm run lint` - ESLint
- `npx tsc --noEmit` - type check
- `npm run build` - full Next build (catches the most issues)
- `npm run dev` - Turbopack dev server on :3000 (RSVP/admin will 500 until D1 is wired locally; see README)
- `npm run preview` - boots the actual Workers bundle locally via Wrangler

## Known TODOs

- `wrangler.jsonc` has `database_id: "REPLACE_WITH_D1_DATABASE_ID"`. Set after `wrangler d1 create mk-wedding-db`.
- Custom domain not chosen yet - attach via Cloudflare dashboard or add `routes` in `wrangler.jsonc` once known.
- `ADMIN_PASSWORD` in `wrangler.jsonc` is a placeholder. Production password should be set via `wrangler secret put ADMIN_PASSWORD` (not committed).
