# SH Astro Starter — Claude Code Conventions

## What This Is

Reusable Astro starter template for ScrappyHat client marketing/branding websites. Fork per client, customize tokens + content, deploy.

## Stack

- **Astro 6.x** (static output by default)
- **Tailwind CSS v4** with inline `@theme` in `src/styles/global.css`
- **React** — only for interactive islands (MobileNav, BookingModal, Accordion)
- **Content Collections** with Zod schemas in `src/content.config.ts`
- **Vercel** adapter (swappable)

## Key Files

- `src/styles/tokens.css` — Design tokens (`:root` CSS vars). PRIMARY customization surface.
- `src/lib/site.ts` — Site config (name, URL, email, social). SECONDARY customization surface.
- `src/data/navigation.ts` — Nav and footer links.
- `src/content/` — All page content (YAML for data, Markdown for rich text).
- `src/content.config.ts` — Collection schemas. `seo.description` is required on services.

## Conventions

- **Semantic token names**: Use `--brand-primary` not `--green`, `--brand-accent` not `--orange`.
- **Astro components by default**: Only use React islands (`.tsx`) when client-side state is required.
- **FadeIn is CSS-only**: Uses IntersectionObserver via inline `<script>`, not React.
- **No `@apply`**: Use component CSS classes (`.btn-primary`, `.paper-card`) or Tailwind utilities directly.
- **Content collections are the source of truth**: Never hardcode FAQ, service, or testimonial data in components.

## SEO

- Every page must have: title, description, canonical URL, OG tags (via `SEOHead.astro`).
- Organization JSON-LD is rendered on every page in `BaseLayout.astro`.
- FAQPage JSON-LD is auto-generated from the `faqs` collection in `FAQ.astro`.
- `seo.description` is **required** in service frontmatter — build fails without it.

## Adding a New Page

1. Create `src/pages/your-page.astro`
2. Use `PageLayout` with `title`, `description`, `canonicalPath` props
3. Compose from existing section/ui components
4. Add to `src/data/navigation.ts` if it should appear in nav/footer
