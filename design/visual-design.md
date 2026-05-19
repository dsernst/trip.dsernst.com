# Design

## Aesthetic direction

Warm, editorial, slightly travel-worn. The feeling of a well-loved passport or a vintage travel poster — not a SaaS dashboard, not a lifestyle brand, not a startup landing page.

The design should feel **personal and considered**, not generated. Every choice is intentional.

## Color palette

```
--cream:       #F2E8D5   /* primary background */
--light-cream: #FAF5EC   /* secondary background, slightly lighter */
--ink:         #1C1A14   /* primary text, near-black with warmth */
--forest:      #2A4A35   /* hero, footer, dark sections */
--amber:       #D4821A   /* primary accent, CTAs, labels */
--sage:        #8AAF8A   /* secondary accent, used on dark backgrounds */
--terra:       #B85C38   /* tertiary accent */
```

**Dominant relationship:** forest green and warm cream. Amber is the accent — used sparingly for labels, highlights, and the hero logotype.

**Never use:** purple gradients, white backgrounds, generic blue CTAs, or any palette that reads as "tech startup."

## Typography

**Display font: Fraunces** (Google Fonts)
- Used for: the logotype, section headings, step headings, pull quotes
- Weights: 700 and 900, with italic variants
- The italic variant is expressive and should be used for the "Trip." in the logotype and the footer wordmark
- Fraunces is distinctive, slightly quirky, warm — it signals craft without being precious

**Body font: DM Sans**
- Used for: body copy, labels, UI elements
- Weights: 300 (body), 400, 500 (labels, emphasis)
- Clean and legible without being generic

**Never use:** Inter, Roboto, Arial, Space Grotesk, or system fonts. The font pairing is locked.

## Layout principles

- **Maximum content width:** 860–900px, centered
- **Section padding:** 100px top and bottom
- **Sections alternate** between light (cream/light-cream) and dark (forest, ink) backgrounds — this creates rhythm without needing decorative dividers
- **No decorative horizontal rules** between sections — background color changes do the work

## Section structure (current)

1. **Hero** — forest green background, full viewport height, centered text, dot-grid texture overlay
2. **How it works** — light cream background, numbered steps in a list
3. **Budget & location** — forest green background, two-column layout with cards
4. **Opt-out** — ink (near-black) background, two-column with a mock UI card
5. **Reviews** — cream background, 2×2 review card grid
6. **Footer** — forest green, minimal

## Texture & atmosphere

- The hero uses a **dot-grid background** (`radial-gradient` on a repeating pattern) at low opacity — adds depth without weight
- **Radial gradient overlays** in amber and terra on the hero create warmth in the corners
- These effects should remain subtle — atmosphere, not decoration

## The mock UI card (opt-out section)

The trip card showing who's in/out is a key piece of UI. Design rules:
- Dark, frosted-glass feeling — `rgba(255,255,255,0.05)` backgrounds on dark sections
- Avatar initials with distinct muted colors per person (sage, amber, terra, slate blue)
- Status tags: `In` in sage-tinted green, `Out this round` in terra-tinted red
- No icons, no checkboxes — just clean tags

## Animation

- Page load: `fadeUp` stagger on hero elements (badge → h1 → subtext → scroll hint)
- Scroll hint: a slow `scrollPulse` on the vertical line beneath the label
- Keep animations minimal and purposeful — no scroll-triggered animations currently, and that's fine

## Things explicitly rejected

- Emojis anywhere in the UI
- Bold or italic text used for decoration rather than meaning
- Purple, white-background, or gradient-heavy palettes
- Generic SaaS card layouts
- Any design pattern that reads as "AI product"
