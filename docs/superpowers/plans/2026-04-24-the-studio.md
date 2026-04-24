# The Studio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `thestudiowalnuthills.com` as a single-page static site on Vercel, corroborating the 705 East McMillan address for the upcoming Google Business Profile rename.

**Architecture:** Fork of `sh-astro-starter` (Astro 6 + Tailwind v4 + semantic CSS tokens). Strip the multi-page starter to a single `index.astro` composed of five small section components. Replace Playfair+Manrope with Fraunces+Inter, replace the forest-green+orange palette with dusty-green+cream+oxblood, drop texture backgrounds. Zero JS output, Vercel adapter, `LocalBusiness` JSON-LD for GBP SEO corroboration.

**Tech Stack:** Astro 6, Tailwind v4, Fraunces Variable, Inter Variable, Vercel, Node 22+, npm.

**Spec:** `docs/superpowers/specs/2026-04-24-the-studio-design.md`

---

## File Structure

**Create:**
- `src/components/sections/Hero.astro` — type-only opening block
- `src/components/sections/Origin.astro` — two short origin paragraphs
- `src/components/sections/InResidence.astro` — Scrappy Hat + Marigold cards
- `src/components/sections/Visit.astro` — exterior photo, address, maps link
- `src/components/layout/StudioFooter.astro` — minimal mailto + copyright footer
- `public/fonts/Fraunces-Variable.woff2`
- `public/fonts/Fraunces-Italic-Variable.woff2`
- `public/fonts/Inter-Variable.woff2`
- `public/images/exterior.jpg` — copied from image cache
- `public/og-image.png` — static OG placeholder (text wordmark on cream)
- `public/favicon.svg` — minimal serif "S"

**Modify:**
- `src/styles/tokens.css` — palette + font-family + @font-face
- `src/styles/global.css` — remove texture references on `body`
- `src/styles/components.css` — strip texture refs from `.section-*`, `.paper-card`, unused utilities
- `src/layouts/BaseLayout.astro` — swap font preloads, swap Organization JSON-LD for LocalBusiness
- `src/layouts/PageLayout.astro` — remove Nav import/render
- `src/lib/site.ts` — The Studio config
- `src/pages/index.astro` — compose the five sections

**Delete:**
- `src/pages/about.astro`, `services.astro`, `contact.astro`
- `src/content/` (directory), `src/content.config.ts`
- `src/data/navigation.ts`
- `src/components/sections/Hero.astro`, `Stats.astro`, `HowItWorks.astro`, `ServiceCards.astro`, `Testimonials.astro`, `FAQ.astro`, `CTA.astro` (starter versions — we replace Hero with a new one)
- `src/components/layout/Nav.astro`, `Footer.astro`
- `src/components/ui/FieldNote.astro`, `StatBlock.astro`, `Card.astro` (unused)
- `public/textures/`
- `public/fonts/PlayfairDisplay-*.woff2`, `Manrope-Variable.woff2`, `JetBrainsMono-Variable.woff2`

---

## Task 1: Strip unused starter files

**Files:** See Delete list above.

- [ ] **Step 1.1: Delete unused pages and content collections**

```bash
cd ~/projects/thestudio-site
rm src/pages/about.astro src/pages/services.astro src/pages/contact.astro
rm -rf src/content src/content.config.ts
rm src/data/navigation.ts
```

- [ ] **Step 1.2: Delete starter section components (will be replaced)**

```bash
rm src/components/sections/Hero.astro
rm src/components/sections/Stats.astro
rm src/components/sections/HowItWorks.astro
rm src/components/sections/ServiceCards.astro
rm src/components/sections/Testimonials.astro
rm src/components/sections/FAQ.astro
rm src/components/sections/CTA.astro
```

- [ ] **Step 1.3: Delete unused layout and UI components**

```bash
rm src/components/layout/Nav.astro src/components/layout/Footer.astro
rm src/components/ui/FieldNote.astro src/components/ui/StatBlock.astro src/components/ui/Card.astro
```

- [ ] **Step 1.4: Delete starter fonts and textures**

```bash
rm -f public/fonts/PlayfairDisplay-Variable.woff2 public/fonts/PlayfairDisplay-Italic-Variable.woff2 public/fonts/Manrope-Variable.woff2 public/fonts/JetBrainsMono-Variable.woff2
rm -rf public/textures
```

- [ ] **Step 1.5: Commit**

```bash
git add -A
git commit -m "chore: strip unused starter scaffolding"
```

---

## Task 2: Download Fraunces + Inter variable fonts

**Files:**
- Create: `public/fonts/Fraunces-Variable.woff2`
- Create: `public/fonts/Fraunces-Italic-Variable.woff2`
- Create: `public/fonts/Inter-Variable.woff2`

- [ ] **Step 2.1: Fetch font CSS from Google Fonts to discover latest woff2 URLs**

```bash
cd ~/projects/thestudio-site
curl -sSL 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@100..900&display=swap' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' \
  -o /tmp/studio-fonts.css
grep -o 'https://[^)]*\.woff2' /tmp/studio-fonts.css | sort -u
```

Expected: several `.woff2` URLs for Fraunces (regular + italic) and Inter. Identify one regular-axis Fraunces file, one italic Fraunces file, and the Inter file. The Google response serves subset-specific URLs (latin, latin-ext, etc.) — pick the `latin` subset for each.

- [ ] **Step 2.2: Download the three font files**

Identify the URLs from step 2.1 output and curl them directly. Example commands (the engineer should substitute the exact URLs from step 2.1 — Google Fonts rotates filenames periodically):

```bash
# Example — replace <URL> placeholders with URLs from step 2.1
curl -sSL '<FRAUNCES_LATIN_REGULAR_URL>' -o public/fonts/Fraunces-Variable.woff2
curl -sSL '<FRAUNCES_LATIN_ITALIC_URL>' -o public/fonts/Fraunces-Italic-Variable.woff2
curl -sSL '<INTER_LATIN_URL>' -o public/fonts/Inter-Variable.woff2
ls -la public/fonts/
```

Expected: three files, each 40-200KB.

- [ ] **Step 2.3: Commit**

```bash
git add public/fonts/
git commit -m "feat: add Fraunces and Inter variable fonts"
```

---

## Task 3: Rewrite design tokens

**Files:**
- Modify: `src/styles/tokens.css` — full rewrite

- [ ] **Step 3.1: Replace `tokens.css` with The Studio palette and fonts**

Replace the entire contents of `src/styles/tokens.css` with:

```css
/*
 * DESIGN TOKENS — The Studio
 *
 * Warm editorial palette. Dusty green + cream + oxblood accent.
 * Fraunces display, Inter body.
 */

:root {
  /* === BRAND COLORS === */
  --brand-primary: #3F4D42;       /* dusty dark green, echoing exterior paint */
  --brand-primary-light: #4F5D52; /* hover/lighter */
  --brand-primary-card: #3F4D42;
  --brand-primary-pale: #E8EBE8;

  --brand-accent: #7A2E2A;        /* oxblood door red — used once */
  --brand-accent-light: #8E3E3A;
  --brand-accent-dark: #5E2220;

  /* === SURFACES === */
  --bg: #F5EFE6;
  --bg-warm: #F4EDE2;
  --bg-aged: #EFE7D9;
  --cream: #FAF6EE;

  /* === TEXT === */
  --text: #2C2420;
  --text-soft: #4A3F38;
  --text-muted: #6B6259;
  --text-faint: #A39889;

  /* === BORDERS === */
  --border: rgba(44, 36, 32, 0.08);
  --border-soft: rgba(44, 36, 32, 0.12);
  --border-strong: rgba(44, 36, 32, 0.22);

  /* === FONTS === */
  --font-display: "Fraunces", "Georgia", serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, "SF Mono", monospace;

  /* === TYPOGRAPHY SCALE (fluid) === */
  --text-2xs: 10px;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: clamp(20px, 2vw, 24px);
  --text-2xl: clamp(24px, 3vw, 32px);
  --text-3xl: clamp(28px, 4vw, 40px);
  --text-4xl: clamp(36px, 5vw, 52px);
  --text-5xl: clamp(48px, 7vw, 72px);
  --text-6xl: clamp(60px, 9vw, 96px);
  --text-7xl: clamp(72px, 12vw, 144px);

  /* === SPACING (4px base) === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* === BORDER RADIUS === */
  --r-sm: 4px;
  --r-md: 6px;
  --r-lg: 10px;
  --r-xl: 16px;
  --r-full: 9999px;

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px rgba(44, 36, 32, 0.06), 0 1px 2px rgba(44, 36, 32, 0.04);
  --shadow-md: 0 4px 12px rgba(44, 36, 32, 0.08), 0 2px 4px rgba(44, 36, 32, 0.05);
  --shadow-lg: 0 12px 32px rgba(44, 36, 32, 0.12), 0 4px 8px rgba(44, 36, 32, 0.06);

  /* === MOTION === */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
}

/* === FONT FACES === */
@font-face {
  font-family: "Fraunces";
  src: url("/fonts/Fraunces-Variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Fraunces";
  src: url("/fonts/Fraunces-Italic-Variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3.2: Verify build still succeeds (CSS will reference missing components until later tasks)**

```bash
cd ~/projects/thestudio-site
npm install
```

Expected: `npm install` succeeds without errors.

- [ ] **Step 3.3: Commit**

```bash
git add src/styles/tokens.css package-lock.json
git commit -m "feat: swap tokens to The Studio palette and fonts"
```

---

## Task 4: Strip texture references from styles

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/components.css`

- [ ] **Step 4.1: Rewrite `global.css` to remove texture background images**

Replace the entire contents of `src/styles/global.css` with:

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./components.css";
@import "./animations.css";

@theme inline {
  --color-bg: var(--bg);
  --color-bg-warm: var(--bg-warm);
  --color-bg-aged: var(--bg-aged);
  --color-cream: var(--cream);
  --color-brand: var(--brand-primary);
  --color-brand-light: var(--brand-primary-light);
  --color-brand-card: var(--brand-primary-card);
  --color-brand-pale: var(--brand-primary-pale);
  --color-accent: var(--brand-accent);
  --color-accent-light: var(--brand-accent-light);
  --color-text: var(--text);
  --color-text-soft: var(--text-soft);
  --color-text-muted: var(--text-muted);
  --color-text-faint: var(--text-faint);
  --color-border: var(--border);
  --color-border-soft: var(--border-soft);
  --color-border-strong: var(--border-strong);

  --font-display: var(--font-display);
  --font-sans: var(--font-body);
  --font-mono: var(--font-mono);
}

/* ===== BASE ===== */

html {
  background-color: var(--bg);
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
}

a {
  color: inherit;
  transition: color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}
```

- [ ] **Step 4.2: Simplify `components.css` — remove texture-dependent classes and starter-specific utilities we don't use**

Replace the entire contents of `src/styles/components.css` with:

```css
/*
 * COMPONENT CLASSES — The Studio
 * Minimal set. No textures. No form inputs (no forms on this site).
 */

/* ===== LAYOUT ===== */

.container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.container-narrow {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* ===== SECTION LABELS ===== */

.section-label {
  display: inline-block;
  position: relative;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-bottom: 8px;
}

.section-label::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 24px;
  height: 2px;
  background: var(--brand-accent);
}

/* ===== RESIDENCE CARD ===== */

.residence-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  background: var(--cream);
}

.residence-card-name {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 30px);
  font-weight: 420;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text);
  margin: 0;
}

.residence-card-descriptor {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.4;
  color: var(--text-soft);
  margin: 0;
}

.residence-card-body {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-soft);
  margin: 0;
}

.residence-card-link {
  margin-top: auto;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border-strong);
  padding-bottom: 2px;
  align-self: flex-start;
}

.residence-card-link:hover {
  color: var(--brand-primary);
  border-bottom-color: var(--brand-primary);
}

/* ===== VISIT ADDRESS ===== */

.address-block {
  font-family: var(--font-body);
  font-size: 17px;
  font-style: normal;
  line-height: 1.55;
  color: var(--text);
}

.address-block-line {
  display: block;
}

.visit-map-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border-strong);
  padding-bottom: 2px;
}

.visit-map-link:hover {
  color: var(--brand-primary);
  border-bottom-color: var(--brand-primary);
}

.visit-note {
  margin-top: 24px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 46ch;
}
```

- [ ] **Step 4.3: Commit**

```bash
git add src/styles/
git commit -m "refactor: strip textures, simplify component styles"
```

---

## Task 5: Update site config and SEO

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 5.1: Replace `src/lib/site.ts`**

```typescript
/**
 * Site configuration — The Studio
 */
export const site = {
  name: "The Studio",
  tagline: "A small creative studio in Walnut Hills, Cincinnati.",
  url: import.meta.env.PUBLIC_SITE_URL || "https://thestudiowalnuthills.com",
  email: "hello@thestudiowalnuthills.com",
  phone: "",
  address: {
    street: "705 East McMillan Street, Unit 1",
    city: "Cincinnati",
    state: "OH",
    zip: "45206",
  },
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },
  booking: {
    calSlug: "",
    fallbackUrl: "",
  },
  analytics: {
    gaId: "",
  },
  founders: [] as Array<{ name: string; title: string }>,
  knowsAbout: [] as string[],
};
```

- [ ] **Step 5.2: Modify `src/layouts/BaseLayout.astro` — swap font preloads and JSON-LD**

Change two things in the existing file:

1. Replace the two `<link rel="preload">` lines (Manrope, PlayfairDisplay) with Fraunces + Inter:

Find:
```html
    <link rel="preload" href="/fonts/Manrope-Variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/PlayfairDisplay-Variable.woff2" as="font" type="font/woff2" crossorigin />
```

Replace with:
```html
    <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/Fraunces-Variable.woff2" as="font" type="font/woff2" crossorigin />
```

2. Swap the import of `buildOrganizationJsonLd` for `buildLocalBusinessJsonLd`, and update the `<JsonLd>` call:

Find:
```astro
import { buildOrganizationJsonLd } from "../lib/seo";
```

Replace with:
```astro
import { buildLocalBusinessJsonLd } from "../lib/seo";
```

Find:
```astro
<JsonLd data={buildOrganizationJsonLd()} />
```

Replace with:
```astro
<JsonLd data={buildLocalBusinessJsonLd()} />
```

- [ ] **Step 5.3: Commit**

```bash
git add src/lib/site.ts src/layouts/BaseLayout.astro
git commit -m "feat: configure site for The Studio with LocalBusiness JSON-LD"
```

---

## Task 6: Simplify PageLayout and add StudioFooter

**Files:**
- Modify: `src/layouts/PageLayout.astro` — remove Nav
- Create: `src/components/layout/StudioFooter.astro`

- [ ] **Step 6.1: Create `src/components/layout/StudioFooter.astro`**

```astro
---
import { site } from "../../lib/site";
const year = new Date().getFullYear();
---

<footer class="studio-footer">
  <div class="container-narrow studio-footer-inner">
    <a href={`mailto:${site.email}`} class="studio-footer-email">{site.email}</a>
    <p class="studio-footer-copy">© {year} The Studio at 705 East McMillan</p>
  </div>
</footer>

<style>
  .studio-footer {
    padding: 80px 0 64px;
    border-top: 1px solid var(--border-soft);
    margin-top: 96px;
  }

  .studio-footer-inner {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .studio-footer-email {
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid var(--border-strong);
    padding-bottom: 2px;
    align-self: flex-start;
  }

  .studio-footer-email:hover {
    color: var(--brand-primary);
    border-bottom-color: var(--brand-primary);
  }

  .studio-footer-copy {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
  }
</style>
```

- [ ] **Step 6.2: Replace `src/layouts/PageLayout.astro`**

```astro
---
import BaseLayout from "./BaseLayout.astro";
import StudioFooter from "../components/layout/StudioFooter.astro";

interface Props {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
}

const { title, description, canonicalPath, ogImage, noindex } = Astro.props;
---

<BaseLayout
  title={title}
  description={description}
  canonicalPath={canonicalPath}
  ogImage={ogImage}
  noindex={noindex}
>
  <slot name="head" slot="head" />
  <main id="main-content">
    <slot />
  </main>
  <StudioFooter />
</BaseLayout>
```

- [ ] **Step 6.3: Commit**

```bash
git add src/layouts/PageLayout.astro src/components/layout/StudioFooter.astro
git commit -m "feat: minimal page layout and studio footer"
```

---

## Task 7: Build Hero and Origin sections

**Files:**
- Create: `src/components/sections/Hero.astro`
- Create: `src/components/sections/Origin.astro`

- [ ] **Step 7.1: Create `src/components/sections/Hero.astro`**

```astro
---
---
<section class="hero">
  <div class="container-narrow hero-inner">
    <p class="hero-label">705 East McMillan · Walnut Hills</p>
    <h1 class="hero-mark">The Studio</h1>
    <p class="hero-tagline">A small creative studio in Walnut Hills, Cincinnati.</p>
  </div>
</section>

<style>
  .hero {
    padding: clamp(112px, 16vh, 192px) 0 clamp(64px, 10vh, 112px);
  }

  .hero-inner {
    text-align: left;
  }

  .hero-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 0 0 28px;
  }

  .hero-mark {
    font-family: var(--font-display);
    font-size: var(--text-7xl);
    font-weight: 360;
    line-height: 0.95;
    letter-spacing: -0.025em;
    color: var(--text);
    margin: 0;
  }

  .hero-tagline {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(19px, 2.2vw, 26px);
    line-height: 1.4;
    color: var(--text-soft);
    margin: 28px 0 0;
    max-width: 30ch;
  }
</style>
```

- [ ] **Step 7.2: Create `src/components/sections/Origin.astro`**

```astro
---
---
<section class="origin">
  <div class="container-narrow origin-inner">
    <p>705 East McMillan is a historic Walnut Hills storefront. Dale Tucker opened it as an art studio in 2024, and it's now home to a small group of independent businesses — a shared place to work, meet, and occasionally host.</p>
    <p>The pressed tin ceilings, wood floors, and bay windows haven't changed much. The kind of work happening here has.</p>
  </div>
</section>

<style>
  .origin {
    padding: 48px 0 96px;
  }

  .origin-inner p {
    font-size: clamp(17px, 1.8vw, 20px);
    line-height: 1.7;
    color: var(--text-soft);
    margin: 0 0 20px;
    max-width: 58ch;
  }

  .origin-inner p:last-child {
    margin-bottom: 0;
  }
</style>
```

- [ ] **Step 7.3: Commit**

```bash
git add src/components/sections/Hero.astro src/components/sections/Origin.astro
git commit -m "feat: hero and origin sections"
```

---

## Task 8: Build InResidence section

**Files:**
- Create: `src/components/sections/InResidence.astro`

- [ ] **Step 8.1: Create `src/components/sections/InResidence.astro`**

```astro
---
const residents = [
  {
    name: "Scrappy Hat Solutions",
    descriptor: "Embedded product execution for venture-backed B2B startups.",
    body: "A two-person consultancy that embeds with founders as their product function — shipping real software, not decks. Run by Adam Tucker and Jake Smierciak.",
    href: "https://scrappyhat.com",
    linkLabel: "scrappyhat.com",
  },
  {
    name: "Marigold Birth Collective",
    descriptor: "Doula care and birth education in Greater Cincinnati.",
    body: "Evidence-based, family-centered support through pregnancy, birth, and early postpartum. Founded and run by Courtney Tucker.",
    href: "https://marigoldbirthcollective.com",
    linkLabel: "marigoldbirthcollective.com",
  },
];
---

<section class="in-residence">
  <div class="container in-residence-inner">
    <p class="section-label">In residence</p>
    <div class="residence-grid">
      {residents.map((r) => (
        <article class="residence-card">
          <h2 class="residence-card-name">{r.name}</h2>
          <p class="residence-card-descriptor">{r.descriptor}</p>
          <p class="residence-card-body">{r.body}</p>
          <a class="residence-card-link" href={r.href} target="_blank" rel="noopener">{r.linkLabel} →</a>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .in-residence {
    padding: 64px 0;
  }

  .in-residence-inner > .section-label {
    margin-bottom: 32px;
  }

  .residence-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 768px) {
    .residence-grid {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }
</style>
```

- [ ] **Step 8.2: Commit**

```bash
git add src/components/sections/InResidence.astro
git commit -m "feat: in-residence cards for Scrappy Hat and Marigold"
```

---

## Task 9: Copy exterior photo and build Visit section

**Files:**
- Create: `public/images/exterior.jpg`
- Create: `src/components/sections/Visit.astro`

- [ ] **Step 9.1: Copy the exterior photo from image cache**

```bash
cd ~/projects/thestudio-site
mkdir -p public/images
cp /Users/adamtucker/.claude/image-cache/695ba869-86a0-475f-a87f-2ae8863fae5d/2.png public/images/exterior.jpg
ls -la public/images/
```

Expected: one file `exterior.jpg`, around 1.9MB. (The `.jpg` extension on a `.png` source is fine — browsers detect actual type from bytes, but we'll keep `.jpg` as the filename since the spec names it that way. If the image is too large for production, a follow-up can optimize.)

- [ ] **Step 9.2: Create `src/components/sections/Visit.astro`**

```astro
---
import { site } from "../../lib/site";

const mapsHref = "https://www.google.com/maps/search/?api=1&query=705+East+McMillan+St+Unit+1+Cincinnati+OH+45206";
---

<section class="visit">
  <div class="container visit-inner">
    <p class="section-label">Visit</p>

    <div class="visit-layout">
      <figure class="visit-photo">
        <img
          src="/images/exterior.jpg"
          alt="The Studio at 705 East McMillan Street — grey-green storefront with bay windows and red door."
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div class="visit-details">
        <address class="address-block">
          <span class="address-block-line">{site.address.street}</span>
          <span class="address-block-line">{site.address.city}, {site.address.state} {site.address.zip}</span>
        </address>

        <a class="visit-map-link" href={mapsHref} target="_blank" rel="noopener">View on Google Maps →</a>

        <p class="visit-note">By appointment or invitation. We're not open to walk-ins — but if you're visiting someone who works here, you're in the right place.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .visit {
    padding: 64px 0 96px;
  }

  .visit-inner > .section-label {
    margin-bottom: 32px;
  }

  .visit-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: start;
  }

  @media (min-width: 768px) {
    .visit-layout {
      grid-template-columns: 1.2fr 1fr;
      gap: 56px;
    }
  }

  .visit-photo {
    margin: 0;
    border-radius: var(--r-lg);
    overflow: hidden;
    background: var(--bg-aged);
  }

  .visit-photo img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .visit-details {
    padding-top: 8px;
  }
</style>
```

- [ ] **Step 9.3: Commit**

```bash
git add public/images/ src/components/sections/Visit.astro
git commit -m "feat: visit section with exterior photo"
```

---

## Task 10: Compose index page, add favicon and OG image

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/404.astro` (minimal rewrite)
- Create: `public/favicon.svg`
- Create: `public/og-image.png` (generated via script)
- Delete: `public/favicon.svg` (starter version, if different) — verify before delete

- [ ] **Step 10.1: Replace `src/pages/index.astro`**

```astro
---
import PageLayout from "../layouts/PageLayout.astro";
import Hero from "../components/sections/Hero.astro";
import Origin from "../components/sections/Origin.astro";
import InResidence from "../components/sections/InResidence.astro";
import Visit from "../components/sections/Visit.astro";
import { site } from "../lib/site";
---

<PageLayout
  title="Walnut Hills, Cincinnati"
  description={`${site.tagline} Home to Scrappy Hat Solutions and Marigold Birth Collective.`}
  canonicalPath="/"
  ogImage="/og-image.png"
>
  <Hero />
  <Origin />
  <InResidence />
  <Visit />
</PageLayout>
```

Note: the SEO helper composes `${title} | ${site.name}` into the final `<title>`, yielding `Walnut Hills, Cincinnati | The Studio`. That matches the spec's desired `The Studio — Walnut Hills, Cincinnati` intent after the separator. If the engineer wants the exact dash-delimited format, override at Step 10.4.

- [ ] **Step 10.2: Replace `src/pages/404.astro`**

```astro
---
import PageLayout from "../layouts/PageLayout.astro";
---

<PageLayout
  title="Page not found"
  description="The page you are looking for does not exist."
  noindex={true}
>
  <section style="padding: 192px 0 96px; min-height: 60vh;">
    <div class="container-narrow">
      <p style="font-family: var(--font-body); font-size: 11px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 24px;">404</p>
      <h1 style="font-family: var(--font-display); font-size: var(--text-5xl); font-weight: 360; line-height: 1; letter-spacing: -0.02em; color: var(--text); margin: 0 0 24px;">Not here.</h1>
      <p style="font-size: 17px; line-height: 1.65; color: var(--text-soft); max-width: 48ch;">
        The page you're looking for doesn't exist. <a href="/" style="color: var(--text); border-bottom: 1px solid var(--border-strong); text-decoration: none; padding-bottom: 2px;">Return to the studio</a>.
      </p>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 10.3: Replace `public/favicon.svg` with a minimal serif "S" on cream**

First check if starter has one:

```bash
ls -la public/favicon.svg 2>/dev/null || echo "no existing favicon"
```

Then write/overwrite `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#F5EFE6"/>
  <text x="16" y="23" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="400" fill="#2C2420">S</text>
</svg>
```

- [ ] **Step 10.4: Generate static OG image**

Create `public/og-image.png` as a 1200×630 PNG with the Fraunces "The Studio" wordmark on cream. Since we don't have Fraunces rasterizer tooling, create a simple SVG and convert, or use `sips`/`rsvg-convert` if available. Pragmatic fallback: create an SVG with an embedded font via `Georgia` (system serif close enough for OG) and convert via `rsvg-convert` or `sips`.

```bash
cat > /tmp/og.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F5EFE6"/>
  <text x="600" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="140" font-weight="400" fill="#2C2420" letter-spacing="-2">The Studio</text>
  <text x="600" y="395" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="28" font-weight="300" fill="#4A3F38">A small creative studio in Walnut Hills, Cincinnati.</text>
  <rect x="588" y="430" width="24" height="2" fill="#7A2E2A"/>
</svg>
EOF

# Try rsvg-convert first (Homebrew: `librsvg`), fall back to sips/qlmanage
if command -v rsvg-convert >/dev/null 2>&1; then
  rsvg-convert -w 1200 -h 630 /tmp/og.svg -o public/og-image.png
elif command -v qlmanage >/dev/null 2>&1; then
  qlmanage -t -s 1200 -o /tmp /tmp/og.svg && mv /tmp/og.svg.png public/og-image.png
else
  echo "No SVG rasterizer available. Either install librsvg (brew install librsvg) or copy a manually-generated PNG to public/og-image.png."
fi
ls -la public/og-image.png
```

Expected: a 1200×630 PNG at `public/og-image.png`. If the rasterizer step fails, proceed anyway — the file can be generated separately; the site will still build since `SEOHead` uses `/og-fallback.png` as the default. We'll update the config to point at `og-image.png` once the file exists.

- [ ] **Step 10.5: Delete starter's `public/og-fallback.png` or replace it**

```bash
ls public/og-fallback.png 2>/dev/null && rm public/og-fallback.png || echo "no og-fallback present"
# If og-image.png was not generated, alias the Studio favicon svg as a temporary OG placeholder — NOT recommended. Prefer to fix the PNG generation.
```

- [ ] **Step 10.6: Commit**

```bash
git add src/pages/index.astro src/pages/404.astro public/favicon.svg public/og-image.png 2>/dev/null || true
git add -A
git commit -m "feat: compose index, minimal 404, favicon, og image"
```

---

## Task 11: Build, preview, and Lighthouse

**Files:** none new; verification only.

- [ ] **Step 11.1: Run a production build**

```bash
cd ~/projects/thestudio-site
npm run build
```

Expected: build completes with no errors. Output directory `dist/` contains `index.html`, `404.html`, `sitemap-index.xml`, `robots.txt`, fonts, and the exterior image.

- [ ] **Step 11.2: Serve the preview build**

Run in background:

```bash
cd ~/projects/thestudio-site && npm run preview -- --port 4321 &
```

Wait a few seconds, then:

```bash
curl -sI http://localhost:4321/ | head -5
curl -s http://localhost:4321/ | grep -c "The Studio"
```

Expected: HTTP 200; "The Studio" appears multiple times in the rendered HTML (hero + footer + JSON-LD).

- [ ] **Step 11.3: Visual check in browser**

Open `http://localhost:4321/` in the default browser:

```bash
open http://localhost:4321/
```

Walk through every section:
- Hero: "705 East McMillan · Walnut Hills" label + "The Studio" serif + italic tagline
- Origin: two prose paragraphs, no orphaned widows
- In residence: two cards side-by-side on desktop, stacked on mobile, links work and open new tabs
- Visit: exterior photo left, address + maps link + quiet copy right on desktop; stacked on mobile
- Footer: mailto + copyright
- No nav
- No console errors (check DevTools)

Resize window to mobile (~375px wide) and re-verify layout.

- [ ] **Step 11.4: Run Lighthouse against the preview**

```bash
# macOS Chrome CLI (assumes Chrome installed)
npx lighthouse http://localhost:4321/ \
  --only-categories=performance,accessibility,seo,best-practices \
  --preset=desktop \
  --output=html \
  --output-path=./lighthouse-desktop.html \
  --chrome-flags="--headless"
```

Expected: performance ≥ 95, accessibility ≥ 95, SEO ≥ 95, best-practices ≥ 95. Open the HTML report to review any issues.

If accessibility falls short: most common cause is color contrast on `--text-muted` or link underlines. Fix by darkening the token or strengthening borders, then re-run.

- [ ] **Step 11.5: Stop the preview server**

```bash
pkill -f 'astro preview' || true
```

- [ ] **Step 11.6: Final commit if Lighthouse report was saved**

```bash
git status
# If lighthouse-desktop.html was produced, add to .gitignore rather than committing:
echo "lighthouse-*.html" >> .gitignore
git add .gitignore
git commit -m "chore: ignore lighthouse output"
```

---

## Task 12: Handoff notes

**Files:** none; surface notes to Adam.

- [ ] **Step 12.1: Summarize for Adam**

Report back with:
- Path: `~/projects/thestudio-site/`
- Git log: show `git log --oneline` so Adam can see the commit history
- Remaining setup: (1) create a GitHub repo and push, (2) connect Namecheap DNS to Vercel, (3) deploy, (4) set up `hello@thestudiowalnuthills.com` email alias, (5) wait for Google crawl, (6) rename GBP
- Known v2 follow-ups: swap the `.jpg`-named PNG exterior file for an optimized JPEG; generate a proper Fraunces-rendered OG image; add interior photos to the reserved slots in Hero/In Residence when the space is staged

---

## Self-Review

**Spec coverage check:**
- Palette → Task 3 ✓
- Fonts → Tasks 2 + 3 ✓
- Hero → Task 7 ✓
- Origin (rewritten for 2024) → Task 7 ✓
- In Residence → Task 8 ✓
- Visit with exterior photo → Task 9 ✓
- Footer mailto + copyright → Task 6 ✓
- Starter strip → Task 1 ✓
- LocalBusiness JSON-LD → Task 5 ✓
- `site.ts` config → Task 5 ✓
- Oxblood accent used only on section labels → Task 4 (`.section-label::after`) ✓
- Perf/a11y ≥ 95 → Task 11 ✓
- Favicon + OG image → Task 10 ✓

No gaps identified.

**Placeholder check:** One intentional placeholder remains in Task 2 (`<URL>` substitutions after Google Fonts discovery) — unavoidable since Google Fonts rotates filenames. The step provides the discovery command so the engineer can fill them in deterministically.

**Type consistency:** `site.ts` shape matches what `seo.ts` reads (address object, email, url). `buildLocalBusinessJsonLd` already exists in starter; no new interfaces introduced.
