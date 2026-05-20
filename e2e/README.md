# Visual regression

Section screenshots are compared against baselines. Tests run against a production build (`next build` + `next start` on port 3456).

Everything lives under `e2e/`: config, specs, and committed baselines in `snapshots/`. Ephemeral output (browsers, test results, HTML report) goes in `cache/` and is gitignored.

## Commands

```bash
npm run playwright:install   # once per machine (Chromium → cache/.playwright-browsers/)
npm run test:visual          # compare to baselines
npm run test:visual:update   # refresh baselines after intentional UI changes
```

## Baselines

`snapshots/{platform}/{desktop|mobile}/` — e.g. `darwin/desktop/1-hero.png`, numbered in page order.

Re-run `test:visual:update` on Linux before relying on CI there (platform folder will be `linux/`).

## Stability

Tests disable animations, honor `prefers-reduced-motion`, and mask the dynamic trip date in the opt-out section.
