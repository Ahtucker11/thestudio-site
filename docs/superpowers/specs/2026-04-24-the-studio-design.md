# The Studio — Design Spec

**Date:** 2026-04-24
**Domain:** thestudiowalnuthills.com
**Stack:** Astro 6 + Tailwind v4 + Vercel (forked from `sh-astro-starter`)
**Scope:** Single-page marketing site, zero-JS, mobile-first.

---

## Purpose

A small, warm, editorial one-pager establishing The Studio at 705 East McMillan as a real place with a name, history, and current residents.

**Primary audiences, in order:**
1. Google's crawler — domain needs real content corroborating an upcoming Google Business Profile rename from "TUCKER | ART" to "The Studio."
2. Anyone who receives the address and wants context before visiting.
3. Scrappy Hat and Marigold prospects who want to understand the space they're being invited to.

**Deadline driver:** GBP rename sequence. Site must be live and crawlable before the GBP name change.

---

## Non-Goals

Explicitly out of scope in v1:

- No contact form (mailto only)
- No CMS, admin, or blog
- No testimonials, client logos, or case studies
- No booking / scheduling interface
- No newsletter signup
- No cookie banner (no tracking)
- No dark mode
- No animations beyond optional subtle scroll fade
- No logos inside "in residence" cards — text only
- No social links (The Studio has no accounts)

---

## Brand Direction

Warm editorial / small gallery. Grounded in lineage (Dale Tucker's art studio) without being precious. Confident enough to sit next to both Scrappy Hat (product consultancy) and Marigold (doula practice) as a neutral home.

Visually distinct from Scrappy Hat — different serif, different body font, different palette.

### Palette

All values below get mapped to the starter's existing semantic tokens in `src/styles/tokens.css`. No new token names introduced.

| Token | Value | Role |
|---|---|---|
| `--brand-primary` | `#3F4D42` | Dusty dark green, echoes exterior paint |
| `--brand-primary-light` | `#4F5D52` | Hover variant |
| `--brand-primary-card` | `#3F4D42` | Unused here but schema requires it |
| `--brand-primary-pale` | `#E8EBE8` | Very light tint |
| `--brand-accent` | `#7A2E2A` | Oxblood door red — one tiny moment only |
| `--brand-accent-light` | `#8E3E3A` | |
| `--brand-accent-dark` | `#5E2220` | |
| `--bg` | `#F5EFE6` | Primary cream background |
| `--bg-warm` | `#F4EDE2` | |
| `--bg-aged` | `#EFE7D9` | |
| `--cream` | `#FAF6EE` | |
| `--text` | `#2C2420` | Warm charcoal |
| `--text-soft` | `#4A3F38` | |
| `--text-muted` | `#6B6259` | Muted warm gray |
| `--text-faint` | `#A39889` | |

**Avoid:** pure white, pure black, forest green (Scrappy Hat's color), bright saturated accents.

**Accent rule:** `--brand-accent` (oxblood) appears on the page in exactly one place: a 2px-wide, 24px-long hairline underline sitting beneath the uppercase-tracked section labels (`In residence`, `Visit`). Not on buttons, not on links, not on the hero, not in cards.

### Typography

- **Display:** **Fraunces Variable** (Google Fonts, variable weight + italic axis). Used for the main "The Studio" mark, section headers, business names in residence cards.
- **Body:** **Inter Variable** (Google Fonts, no italic needed). Used for all running prose, labels, and UI.
- **Accent/labels:** Same Inter in uppercase, tracked-out, small size. No third font.

Both fonts self-hosted as woff2 in `public/fonts/` per starter convention. `@font-face` declarations in `tokens.css` replace the starter's Playfair + Manrope.

### Voice

Understated. Warm but not saccharine. Short sentences. No startup-speak, no "coworking space" marketing language, no bullet lists of amenities. "Small gallery about page," not "WeWork landing page."

---

## Page Structure

Single scrollable page. Generous whitespace. Mobile-first. No header nav. No on-page anchors. Sections flow top to bottom.

### 1. Hero (type-only)

- Small label (uppercase tracked): `705 East McMillan · Walnut Hills`
- Display mark: `The Studio` (Fraunces, large, confident weight)
- Italic sub-tagline (Fraunces italic): `A small creative studio in Walnut Hills, Cincinnati.`

No decorative rule, no ornament, no photo in v1. Typography and whitespace carry the opening.

### 2. Origin

Two short paragraphs. Rewritten from the brief to reflect the actual 2024 purchase date:

> 705 East McMillan is a historic Walnut Hills storefront. Dale Tucker opened it as an art studio in 2024, and it's now home to a small group of independent businesses — a shared place to work, meet, and occasionally host.
>
> The pressed tin ceilings, wood floors, and bay windows haven't changed much. The kind of work happening here has.

### 3. In Residence

Section label (uppercase, tracked): `In residence`

Two cards. Side-by-side on desktop (≥768px), stacked on mobile. Restrained visual treatment — thin rule or whitespace separation, no photos in cards.

**Card 1 — Scrappy Hat Solutions**
- Name: Scrappy Hat Solutions (Fraunces)
- Descriptor: *Embedded product execution for venture-backed B2B startups.*
- Body: A two-person consultancy that embeds with founders as their product function — shipping real software, not decks. Run by Adam Tucker and Jake Smierciak.
- Link: `scrappyhat.com →` (opens in new tab)

**Card 2 — Marigold Birth Collective**
- Name: Marigold Birth Collective (Fraunces)
- Descriptor: *Doula care and birth education in Greater Cincinnati.*
- Body: Evidence-based, family-centered support through pregnancy, birth, and early postpartum. Founded and run by Courtney Tucker.
- Link: `marigoldbirthcollective.com →` (opens in new tab)

### 4. Visit

Section label: `Visit`

**Exterior photo** — `IMG_1764.jpeg`, placed above or beside the address block. Copied into `public/images/exterior.jpg`. Alt text: `The Studio at 705 East McMillan Street — grey-green storefront with bay windows and red door.`

**Address block:**
```
705 East McMillan Street, Unit 1
Cincinnati, Ohio 45206
```

**Maps link:** `View on Google Maps →` opens in new tab, URL:
`https://www.google.com/maps/search/?api=1&query=705+East+McMillan+St+Unit+1+Cincinnati+OH+45206`

**Quiet copy below address:**
> By appointment or invitation. We're not open to walk-ins — but if you're visiting someone who works here, you're in the right place.

### 5. Footer

Two lines, tight. No social, no nav.

- `hello@thestudiowalnuthills.com` (mailto:)
- `© 2026 The Studio at 705 East McMillan`

---

## Placeholder Slots (for v2 imagery)

Design the layout so images are additive, not load-bearing. Reserve but don't render:

1. Hero image slot (full-bleed band beneath the type hero) — future staged interior
2. Two detail slots near "In residence" — tied to each business OR one shared interior detail
3. (Already filled in v1): exterior photo in Visit

Site must remain good without any of the placeholder images filled.

---

## Technical Decisions

### Stack choices

- **Astro static output**, Vercel adapter (starter default). No SSR needed.
- **No React islands.** Everything renders as Astro components. FadeIn (if used) via starter's CSS-only IntersectionObserver pattern, not React.
- **Tailwind v4 inline `@theme`** in `global.css` (starter's pattern).
- **No `@apply`** — use component CSS classes or Tailwind utilities directly, per starter conventions.

### SEO

- `PageLayout` wraps index with `title`, `description`, `canonicalPath`.
- Page title: `The Studio — Walnut Hills, Cincinnati`
- Meta description: `A small creative studio in Cincinnati's Walnut Hills neighborhood. Home to Scrappy Hat Solutions and Marigold Birth Collective.`
- OG image: 1200×630 static PNG, Fraunces "The Studio" wordmark on cream. Stored at `public/og-image.png`.
- **JSON-LD:** Replace starter's `Organization` schema with `LocalBusiness` on the index page. Include `name`, `address`, `url`. This is the core corroboration signal for the GBP rename.

### Performance / a11y targets

- Lighthouse performance > 95
- Lighthouse accessibility > 95
- Color contrast: verify `--text` (`#2C2420`) on `--bg` (`#F5EFE6`) hits AAA (~15:1, should be fine)
- Semantic HTML (`<main>`, `<section>`, `<address>`, `<footer>`)
- Exterior photo has descriptive alt text

### Domain & deploy

- Domain `thestudiowalnuthills.com` registered at Namecheap 2026-04-24, privacy on, auto-renew on
- DNS → Vercel (Adam handles)
- SSL auto via Vercel
- `hello@thestudiowalnuthills.com` setup is Adam's task, non-blocking for site launch

### `site.ts` config

- `name`: "The Studio"
- `tagline`: "A small creative studio in Walnut Hills, Cincinnati."
- `url`: `https://thestudiowalnuthills.com`
- `email`: `hello@thestudiowalnuthills.com`
- `address`: 705 East McMillan St, Unit 1, Cincinnati, OH 45206
- `phone`, `social`, `booking`, `analytics`, `founders`, `knowsAbout`: empty/omitted

---

## Starter Deltas

### Remove

- `src/pages/about.astro`, `services.astro`, `contact.astro`
- `src/content/` (all of it) + `src/content.config.ts`
- `src/data/navigation.ts` (or reduce to empty exports)
- `src/components/sections/` starter sections (Services, FAQ, Testimonials, etc.) — audit and remove
- `src/components/layout/` nav components if `navLinks` empty won't render cleanly
- `public/textures/*` — no textures in this design
- `--tex-*` variables in `tokens.css`
- `@font-face` declarations for Playfair, Manrope, JetBrains Mono

### Keep (load-bearing)

- `BaseLayout.astro`, `PageLayout.astro`
- `src/lib/seo.ts`, `SEOHead.astro` component
- `tokens.css` / `global.css` / `components.css` file structure
- Astro config + Vercel adapter + sitemap integration
- `robots.txt.ts`
- `404.astro` (minimal, keep)

### Add

- `public/fonts/Fraunces-Variable.woff2`, `Fraunces-Italic-Variable.woff2`, `Inter-Variable.woff2`
- `public/images/exterior.jpg` (from `IMG_1764.jpeg`)
- `public/og-image.png`
- `public/favicon.svg` — minimal monogram
- New section components under `src/components/sections/`:
  - `Hero.astro`
  - `Origin.astro`
  - `InResidence.astro`
  - `Visit.astro`
  - `StudioFooter.astro` (if starter footer doesn't fit)
- `src/pages/index.astro` rewritten to compose the five sections

---

## Open Items (non-blocking)

- `hello@thestudiowalnuthills.com` wiring (Adam's task before GBP rename)
- Interior photos for v2 (when the space is staged)

---

## Definition of Done

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run preview` renders the page correctly on desktop + mobile viewport
- [ ] Lighthouse (on preview build): perf ≥ 95, a11y ≥ 95
- [ ] `robots.txt` and `sitemap-index.xml` accessible
- [ ] LocalBusiness JSON-LD validates in Google Rich Results Test (Adam will verify post-deploy)
- [ ] No console errors or warnings
- [ ] Exterior photo loads and has alt text
- [ ] Mailto link works
- [ ] Google Maps link opens in new tab
- [ ] Copy matches spec exactly (origin paragraph, in-residence blurbs, Visit quiet copy)
- [ ] Initial commit + subsequent focused commits pushed to a new `thestudio-site` GitHub repo (Adam creates)

Launch is Adam's final step: connect DNS at Namecheap → Vercel, deploy, wait 24–48h for crawl, update GBP website field, rename GBP.
