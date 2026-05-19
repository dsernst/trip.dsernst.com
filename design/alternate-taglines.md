# Alternate taglines

Notes from a review of link-preview copy (OG image, Signal, iMessage) and whether the primary tagline could be stronger. **Not actionable yet** — the current line is shipped and good enough for now; revisit when polishing marketing or OG assets.

## Current line (locked)

**"For the people you keep meaning to see."**

- One-line pitch in [`vision.md`](../vision.md)
- Locked in [`copy-principles.md`](copy-principles.md) — hero subtext, footer, OG image
- `og:description` (Signal/Slack) uses a different line: **"A trip ritual for people who matter."** — see [`app/layout.tsx`](../app/layout.tsx) `openGraph.description`

### What it does well

- Names the **audience** without saying "family" or "friends"
- Names the **problem** (intention without follow-through) without blame
- Matches voice: warm, not hype-y; feeling is implied

### Why it might feel "not strong enough" (especially on link previews)

- OG image is often the only explanatory text; the line says *who* it's for, not *what Random Trip is*
- Cold shares (someone who doesn't know the product) may want **ritual / trips / chosen for you** more than pure emotion
- On Signal: image tagline + title + description can feel redundant if description repeats the same idea (mitigated by splitting badge line into `openGraph.description`)

## Platform constraints (link previews)

| Client | Typical preview |
|--------|------------------|
| **iMessage** | Large image + title + domain — often **no description** |
| **Signal** | Image + title + description |

Implications:

- **Image** should carry what iMessage won't show in metadata (e.g. emotional tagline).
- **`og:description`** is the slot for complementary copy on Signal — not necessarily a repeat of the image.
- Design OG for **thumbnail size**, not full 1200×630 — small badge text was illegible; removed from OG image (hero unchanged).

Local preview: `http://localhost:3000/opengraph-image` — see comments in [`app/opengraph-image.tsx`](../app/opengraph-image.tsx).

## What "stronger" might mean

| Direction | Tension |
|-----------|---------|
| **More emotional** | Deeper feeling; risk sentimentality (violates copy principles) |
| **More specific** | Clearer audience; longer, less universal |
| **More product / ritual** | Clearer what it is; risk sounding like SaaS |
| **More urgent** | More punch; risk guilt or pressure ("show up" energy) |

## Candidate lines (from vision + discussion)

Grouped by angle. All need voice-check against [`copy-principles.md`](copy-principles.md) before any lock.

### Audience-forward (from vision)

- "For people who love each other but don't live near each other."
- "For family and old friends spread across cities."

### Ritual / product

- "A trip ritual for people spread across the map."
- "A trip ritual — somewhere new, regularly."
- "Meet somewhere new, regularly — without the planning."

### Problem + structure (vision: "structure that makes it happen anyway")

- "You keep meaning to visit. This makes it happen."
- "The structure that makes visits happen anyway."
- "Visits keep getting deprioritized. This is the structure that makes them happen." *(long)*

### Outcome / practical

- "More face-to-face time, less coordination."
- "Less planning. More face-to-face."
- "The trip happens. You just join."
- "Group trips, chosen for you. Just join."

### Already in use elsewhere

- **"A trip ritual for people who matter"** — hero badge; `openGraph.description` (clearer *what it is* than the main tagline)
- **"Random Trip handles the hard parts"** — hero (tool framing)
- **"All you have to do is join."** — hero (locked; "join" not "show up")

## Recommendation when revisiting

1. **Keep the locked line on the site** unless doing a deliberate rebrand pass (update `vision.md` + `copy-principles.md` together).
2. Consider **OG-only variants** first — test on `/opengraph-image` without changing hero/footer.
3. Test in a **real group chat** (Signal + iMessage); use cache buster `?c=N` after deploy.
4. Ask: is the gap **emotion**, **clarity**, or **urgency**? That picks which bucket to pull from.

## Status

- **Now:** Good enough shipped; 80/20 is having something live.
- **Later:** Pick 2–3 OG candidates, preview locally, optional A/B in chats before any global tagline change.
