# Random Trip

A trip coordination ritual for people who love each other but don't live near each other.

## What this is

Random Trip removes the coordination overhead from group travel — no voting on destinations, no one person stuck planning, no awkward budget conversations. A destination gets picked based on where everyone is, what everyone can spend, and what the group has loved before. All anyone has to do is join.

### Before making changes, see `/design-docs` folder.

They provide context and capture the history of previous decisions to undo.

- [`vision.md`](vision.md) — Product philosophy and audience
- [`ROADMAP.md`](ROADMAP.md) — Phased MVP and deployment plan

## Development

Copy `.env.TEMPLATE` to `.env.local` and set keys.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Visual regression

Section screenshots are compared against baselines in `e2e/visual.spec.ts-snapshots/`. Tests run against a production build (`next build` + `next start`).

```bash
npm run playwright:install   # once per machine (Chromium into .playwright-browsers/)
npm run test:visual          # compare to baselines (builds app on port 3456)
npm run test:visual:update   # refresh baselines after intentional UI changes
```

Baselines are committed under `e2e/visual.spec.ts-snapshots/` (platform suffix, e.g. `-darwin`). Re-run `test:visual:update` on Linux before relying on CI there. Tests disable animations and mask the dynamic trip date in the opt-out section.
