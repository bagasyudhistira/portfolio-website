# Portfolio Website

Personal portfolio of Bagas Yudhistira Fauzi — back-end developer (Java/Spring, PostgreSQL, enterprise systems).

Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. Auto-deployed to Vercel on every push to `main`.

## Requirements

- Node.js >= 26.0.0 (the development version is pinned in `.nvmrc`)
- npm >= 10

## Local development

```bash
npm ci
npm run dev      # http://localhost:3000 (redirects to /en)
```

## Checks

```bash
npm run lint     # ESLint (flat config)
npm run build    # production build + type check
npm start        # serve the production build
```

CI runs `npm ci`, lint, and the production build on pushes and pull requests targeting `main` or `dev`. No email credentials are required for CI.

Run `npm audit` to check current dependency advisories. Security overrides pin patched `glob` and affected modern `minimatch` versions used by build/lint tooling; older, unaffected `minimatch` major versions are retained. Reassess these overrides when upstream dependencies adopt patched releases.

## Environment

The contact form sends mail through Resend. Set this in `.env.local` (and in the Vercel project settings for production):

```
RESEND_API_KEY=re_...
```

Without the key the page still renders; submitting the form returns an error toast.

Set `NEXT_PUBLIC_SITE_URL` to your production origin (for example, `https://your-domain.example`). It is used for canonical URLs, localized sitemap entries, robots configuration, and social-image URLs. When omitted, the existing Vercel production URL is used. Rebuild after changing it.

Search and sharing endpoints:
- `/sitemap.xml` — English and Indonesian URLs with language alternates
- `/robots.txt` — crawler guidance and sitemap location
- `/og` — shared 1200 × 630 PNG preview for Open Graph and Twitter cards

## Structure

- `app/[locale]/` — localized App Router layout and page (`/en`, `/id`)
- `app/` — global styles, sitemap, robots configuration, and social-image route
- `components/` — profile, projects, skills, experience, contact, navigation, and motion provider
- `context/` — theme and active-section providers
- `lib/content/` — typed English and Indonesian portfolio content
- `lib/` — shared links (`data.ts`), site URL, hooks, utilities, and email template
- `messages/` — translated interface labels and metadata
- `i18n/` — locale routing, navigation, and translation loading
- `actions/` — server actions (`sendEmail`)
- `public/` — images used by the page (WebP)
- `.github/workflows/ci.yml` — lint and production-build checks

## Notes

- Portfolio content lives in `lib/content/en.ts` and `lib/content/id.ts`; keep both locales aligned. Shared contact and navigation links live in `lib/data.ts`.
- Career duration is calculated in the browser from 1 January 2025 (UTC), rounded to the nearest whole year and refreshed every minute without requiring a new deployment. Run `node --test lib/career.test.mjs` to check rounding boundaries.
- “Day to day” highlights technologies used on professional projects since January 2025, excluding JasperReports. JasperReports and technologies from earlier projects or other experience appear under “Also familiar with”.
- Keyboard users can skip navigation with the localized “Skip to content” link. Focus indicators and text contrast support both themes.
- Motion follows the system's reduced-motion preference; smooth scrolling and CSS transitions are disabled when reduced motion is requested.
- `next lint` no longer exists in Next.js 16 — linting runs through `eslint` directly with `eslint.config.mjs`.
