# Fork & Customize Checklist

Follow this checklist when creating a new client site from this template.

## 1. Create Your Repo

Use GitHub's "Use this template" button — gives you a clean repo with no upstream history.

## 2. Brand Identity (~10 min)

Edit `src/styles/tokens.css`:

- [ ] `--brand-primary` — main brand color
- [ ] `--brand-primary-light` — hover/lighter variant
- [ ] `--brand-primary-card` — card background variant
- [ ] `--brand-primary-pale` — very light tint
- [ ] `--brand-accent` — accent/CTA color
- [ ] `--brand-accent-light` — accent hover
- [ ] `--brand-accent-dark` — accent dark variant
- [ ] `--bg`, `--bg-warm`, `--bg-aged`, `--cream` — background surfaces
- [ ] `--text`, `--text-soft`, `--text-muted`, `--text-faint` — text hierarchy
- [ ] `--shadow-*` — update rgba tints to match brand primary

## 3. Fonts

- [ ] Replace woff2 files in `public/fonts/`
- [ ] Update `@font-face` declarations in `tokens.css`
- [ ] Update `--font-display`, `--font-body`, `--font-mono` variable values

## 4. Textures

- [ ] Replace SVGs in `public/textures/` or remove if not using textures
- [ ] If removing textures, clear `--tex-*` vars and texture references in `components.css`

## 5. Site Config

Edit `src/lib/site.ts`:

- [ ] `name` — business name
- [ ] `tagline` — one-line description
- [ ] `url` — production URL (also set in `.env`)
- [ ] `email`, `phone`, `address`
- [ ] `social` — LinkedIn, Instagram, Facebook URLs
- [ ] `booking` — Cal.com slug or fallback URL
- [ ] `analytics` — GA4 measurement ID
- [ ] `founders` — for Organization JSON-LD
- [ ] `knowsAbout` — topics for Organization schema

## 6. Navigation

Edit `src/data/navigation.ts`:

- [ ] `navLinks` — header navigation items
- [ ] `footerLinks` — footer navigation items

## 7. Content

Edit files in `src/content/`:

- [ ] `faqs/general.yaml` — FAQ questions and answers
- [ ] `services/*.md` — one file per service (title, tagline, features, SEO description, markdown body)
- [ ] `testimonials/testimonials.yaml` — client testimonials
- [ ] `team/team.yaml` — team member bios

## 8. Pages

Edit page files in `src/pages/`:

- [ ] `index.astro` — hero heading, subheading, CTAs, stats, process steps
- [ ] `about.astro` — company story text
- [ ] `contact.astro` — form action URL (Formspree, Netlify Forms, etc.)

## 9. Assets

- [ ] `public/favicon.svg` — site favicon
- [ ] `public/og-fallback.png` — fallback Open Graph image (1200x630)
- [ ] `src/assets/logo.png` — site logo

## 10. Environment

Copy `.env.example` to `.env`:

- [ ] `PUBLIC_SITE_URL` — canonical production URL
- [ ] `PUBLIC_CAL_SLUG` — Cal.com slug (if using booking)
- [ ] `PUBLIC_GA_ID` — Google Analytics ID

## 11. Deploy

- [ ] Connect repo to Vercel (or swap adapter in `astro.config.mjs`)
- [ ] Set environment variables in deployment platform
- [ ] Verify build: `npm run build`
- [ ] Check Lighthouse scores (target 95+ all metrics)

## 12. Verify SEO

- [ ] All pages have unique title + description
- [ ] Canonical URLs are correct
- [ ] OG images render (check with social media debuggers)
- [ ] robots.txt is accessible at `/robots.txt`
- [ ] Sitemap is accessible at `/sitemap-index.xml`
- [ ] JSON-LD validates (Google Rich Results Test)
