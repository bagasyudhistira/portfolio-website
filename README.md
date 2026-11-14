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

The contact form uses Resend, Cloudflare Turnstile, and Upstash Redis. Configure these in `.env.local` and Vercel project settings (never commit secret values):

```dotenv
RESEND_API_KEY=your-resend-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-public-site-key
TURNSTILE_SECRET_KEY=your-secret-key
TURNSTILE_ALLOWED_HOSTNAMES=your-domain.example,your-project.vercel.app
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
CONTACT_RATE_LIMIT_SECRET=your-random-secret-at-least-32-characters
```

Create a Turnstile widget with your deployed hostnames and an Upstash Redis database; copy the Redis REST credentials, not the Redis connection URL. `TURNSTILE_ALLOWED_HOSTNAMES` contains exact hostnames without schemes or paths. Include each preview hostname you want to support. Only the `NEXT_PUBLIC_` site key is public; all other protection credentials remain server-side. Rebuild/redeploy after configuring the public site key.

Before calling Resend, the server validates input, verifies the single-use Turnstile token with action `contact` and an allowed hostname, and enforces atomic Redis counters: 3 attempts per IP per 15 minutes starting with the first attempt, and 50 send reservations globally per UTC day. Failed challenges count toward the IP limit; failed email deliveries consume the daily budget. Redis also atomically reserves each hashed challenge token for 10 minutes to reject concurrent replays independently of Cloudflare. IP addresses are HMAC-hashed in Redis with expiring keys. Keep the hash secret stable: rotating it resets IP counters.

Production trusts only Vercel's overwritten `x-vercel-forwarded-for` header; missing/invalid IPs block sending. Local development uses a loopback bucket. Other hosting providers require a trusted-IP integration before enabling sending. The form fails closed on missing configuration, network errors, failed verification, or exhausted limits; the direct-email link remains available. These controls reduce abuse, but a distributed attack can still exhaust the global budget.

For local testing, use Cloudflare's documented Turnstile test keys and a separate Redis database, allowing `localhost`; never deploy test keys to production. Run `node --test lib/contact-protection.test.mjs` for mocked protection tests that do not send emails or contact services. No credentials are needed for lint, tests, or build.

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
