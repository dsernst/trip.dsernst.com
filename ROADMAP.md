# Roadmap

Phased plan for taking Random Trip from the current static explainer to a deployed Next.js app on Vercel. See also [`vision.md`](vision.md) for product philosophy and [`design/`](design/) for visual and copy constraints.

## Agreed stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js (App Router) |
| Hosting | Vercel monolith |
| Domain (v0) | `trip.dsernst.com` |
| Auth / DB | Deferred — decide when the product needs real accounts and relational data |

**Team:** Solo for now; React familiarity is a plus for future contributors.

**Why Next:** Known well, fast to ship, one repo for marketing + app, strong Vercel integration.

---

## Phased MVP (in order)

### Phase 0 — Ship the site (top priority)

- [x] Create a Next.js app in this repo.
- [x] Port `random-trip.html` into the home route (`app/page.tsx` + `app/globals.css`), keeping look and copy as close as possible. Follow [`design/visual-design.md`](design/visual-design.md) and [`design/copy-principles.md`](design/copy-principles.md).
- [x] Deploy to Vercel; add custom domain `trip.dsernst.com`.

No auth, no database. Public marketing only.

### Phase 1 — Beta signup

- [x] “Join the beta” section before footer — phone first, then name (one field at a time).
- [x] Server Action → Pushover notification (`PUSHOVER_APP_TOKEN`, `PUSHOVER_USER_KEY`).
- [x] Honeypot (`components/HoneypotInput.tsx` + `lib/honeypot.ts`).
- [ ] **DB milestone** — persist signups (phone E.164, name, `created_at`); same action writes DB + Pushover.

### Phase 2 — Your groups (v0, no real accounts)

- Private page, e.g. `/beta/setup`, gated by an env secret in the URL or a single password field (`BETA_ADMIN_SECRET`) — not full auth, just keeping random visitors out.
- Capture groups you already have in mind (~4–5): **group name** + **people** in one big freeform textbox per group (or equivalent).
- Persist via the same lightweight store as Phase 1 option B (**Vercel Blob or KV** as a single `groups.json`), **or** a committed `data/groups.json` if you prefer zero storage services for now.

Real invites, logins, and per-trip opt-in/out UI come after auth + DB.

---

## Repo shape (when scaffolded)

```text
app/
  page.tsx              # current landing (ported from random-trip.html)
  layout.tsx
  globals.css             # design tokens + base styles
  beta/
    page.tsx            # signup (Phase 1)
    setup/page.tsx      # groups editor (Phase 2)
lib/                    # storage helpers when Phase 1/2 are enabled
```

The existing HTML becomes the home page; no separate marketing framework.

---

## Deploy checklist

1. Push repo to GitHub (if not already).
2. Import project in Vercel → deploy.
3. Project → **Settings → Domains** → add `trip.dsernst.com`.
4. At your DNS host for `dsernst.com`, add the record Vercel shows (usually **CNAME** `trip` → `cname.vercel-dns.com`).

---

## Explicitly not in v0

- User accounts, OAuth, Clerk, etc.
- Postgres / Prisma / Drizzle (until ready)
- Destination-picking algorithm, trip rounds, live opt-in/out (beyond static demo on the landing page)
- Flight/hotel booking or social features outside the group

---

## Open decisions (pick when implementing Phase 1/2)

| Decision | Options |
|----------|---------|
| **Beta signups** | Email to you (Resend) vs append to Blob/KV |
| **Groups persistence** | Vercel Blob/KV vs git-committed `data/groups.json` |

Groups editor needs *some* server-side persistence if the textbox should survive deploys; email-only works for beta signups without a dashboard.

---

## Later (post–v0)

- Auth provider + Postgres (or equivalent)
- Group invites and membership
- Per-person budget and location
- Trip rounds, opt-in/out, destination engine fed by reviews
- Optional: public “vision” page linked from homepage ([`design/README.md`](design/README.md) TODO)
