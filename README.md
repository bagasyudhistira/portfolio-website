# Portfolio Website

Personal portfolio of Bagas Yudhistira Fauzi — back-end developer (Java/Spring, PostgreSQL, enterprise systems).

Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. Auto-deployed to Vercel on every push to `main`.

## Requirements

- Node.js >= 20.9
- npm >= 10

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Checks

```bash
npm run lint     # ESLint (flat config)
npm run build    # production build + type check
npm start        # serve the production build
```

## Environment

The contact form sends mail through Resend. Set this in `.env.local` (and in the Vercel project settings for production):

```
RESEND_API_KEY=re_...
```

Without the key the page still renders; submitting the form returns an error toast.

## Structure

- `app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/` — presentational sections (intro, about, projects, skills, experience, contact)
- `context/` — theme and active-section providers
- `lib/` — content data (`data.ts`), hooks, utilities, email template
- `actions/` — server actions (`sendEmail`)
- `public/` — images used by the page (WebP)

## Notes

- Content lives in `lib/data.ts`; edit there rather than in the components.
- `next lint` no longer exists in Next.js 16 — linting runs through `eslint` directly with `eslint.config.mjs`.
