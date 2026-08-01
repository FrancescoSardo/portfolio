# portfolio-wb

Personal portfolio of Francesco Sardo. Terminal-styled single-page site with per-project case studies.

Live: https://portfolio-five-delta-70.vercel.app

## Stack

- Next.js 16 (App Router, static prerender) + React 19
- Tailwind CSS 4
- framer-motion for animation, lucide-react for icons, next-themes for dark mode
- Vercel hosting + `@vercel/analytics`

Note for AI agents: `AGENTS.md` warns this Next.js version has breaking changes vs training data. Check `node_modules/next/dist/docs/` before writing framework code.

## Structure

```
src/
  app/
    page.tsx              # single-page home: Hero, About, Experience, Projects, AI Lab, ...
    projects/<slug>/      # one case-study page per project
  components/
    sections/             # home page sections
    projects/             # CaseStudyLayout, ProjectCard
    ui/                   # small primitives (TerminalWindow, StatCard, TechBadge, ...)
  lib/
    projects.ts           # project card data — drives home grid + slugs
    experience.ts         # work history data
    motion.ts, utils.ts
public/img/               # case-study screenshots
```

## Content model

Data lives in code, no CMS.

Add a project:
1. Append an entry to `src/lib/projects.ts` (slug, status, hook, techStack, metrics, links).
2. Create `src/app/projects/<slug>/page.tsx` using `CaseStudyLayout` (copy an existing page, e.g. `shopi-pulse`).
3. Drop screenshots in `public/img/`, reference them in the page's `IMAGES` array.

Edit work history in `src/lib/experience.ts`.

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # static build — run before pushing
npm run lint
```

## Deploy

Vercel project linked to the GitHub repo (`FrancescoSardo/portfolio`); push to `main` deploys.

If a push does not show up on the live site, the GitHub integration has dropped: redeploy `main` from the Vercel dashboard, or `npx vercel login && npx vercel link && npx vercel --prod` locally.
