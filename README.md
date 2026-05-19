# Random Trip

A trip coordination ritual for people who love each other but don't live near each other.

## What this is

Random Trip removes the coordination overhead from group travel — no voting on destinations, no one person stuck planning, no awkward budget conversations. A destination gets picked based on where everyone is, what everyone can spend, and what the group has loved before. All anyone has to do is join.

### Before making changes, see `/design-docs` folder.

They provide context and capture the history of previous decisions to undo.

- [`vision.md`](vision.md) — Product philosophy and audience
- [`ROADMAP.md`](ROADMAP.md) — Phased MVP and deployment plan

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build locally
```

## Current state

- **`app/page.tsx`** + **`app/globals.css`** — Marketing landing

## Stack

Next.js 15 (App Router), React 19, TypeScript. Deployed on Vercel.

## Deploy to `custom-domain.com`

1. Push this repo to GitHub.
2. [Import the project in Vercel](https://vercel.com/new) (framework preset: Next.js).
3. Deploy; confirm the `*.vercel.app` URL shows the landing page.
4. Vercel → **Project → Settings → Domains** → add `custom-domain.com`.
5. At your DNS host for `custom-domain.com`, add the record Vercel shows (usually **CNAME** `trip` → `cname.vercel-dns.com`).

Subsequent pushes to `main` deploy automatically.
