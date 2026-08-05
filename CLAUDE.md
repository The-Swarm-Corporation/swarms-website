# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package manager

Use **pnpm only** — never npm or yarn (`packageManager: pnpm@10.34.3` is pinned in package.json).

```sh
pnpm install       # install dependencies
pnpm dev           # dev server (Turbopack)
pnpm build         # production build — the primary verification step
pnpm lint          # next lint
```

There is no test suite. `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so a passing build does not prove type-correctness; run `npx tsc --noEmit` for type checks (ignore pre-existing errors in generated `.next/` files). Do not commit `pnpm-workspace.yaml` — pnpm 11+ auto-generates it and it breaks the Vercel build (see .gitignore).

## What this is

The swarms.ai marketing site: Next.js App Router (Next 16, React 19, Tailwind), deployed on Vercel. Mostly statically generated; a few API route handlers.

## Bilingual structure (English + Chinese)

- English pages live in the `app/(en)` route group (no URL prefix). Chinese mirrors of a subset live in `app/zh` (blog, framework, installation, pricing).
- **Every new blog post needs a Chinese translation** at `content/blog/zh/<same-slug>.mdx`. The same slug is what makes the `LanguageToggle` (中文/EN) work between `/blog/<slug>` and `/zh/blog/<slug>`.
- When touching blog rendering, apply the same change to both `app/(en)/blog/` and `app/zh/blog/` — they are parallel implementations, not shared.

## Blog system

- Posts are `.mdx` files in `content/blog/` (EN) and `content/blog/zh/` (ZH) with gray-matter frontmatter: `title`, `description`, `date`, `author`, `categories`, `featured`, `readTime`, `image` (optional). Despite the extension they are rendered as markdown via `react-markdown`, not compiled MDX.
- `lib/blog.ts` reads the filesystem at build time; slug = filename.
- The `/blog` hero shows the newest post with `featured: true` (fallback: newest overall).
- `image:` is a `/public` path or remote URL. Remote hosts must be allowlisted in `images.remotePatterns` in `next.config.mjs`. Sizing/safe-zone guidance: `docs/BLOG_IMAGE_GUIDELINES.md` (source banners at 1920×1080, 16:9).
- Each post is also served as raw markdown at `/blog/<slug>/markdown` (noindexed, for AI agents/copy button) and gets generated OG/Twitter images from `og-shared.tsx`.
- **Renaming a published post's slug requires a 301** — add it to `renamedPosts` in `next.config.mjs`; removed routes go in `removedRoutes` there.

### Writing style for posts

- No em dashes in blog prose (EN or ZH) — use commas, colons, or parentheses.
- Avoid AI-slop phrasing: no "not X, Y" contrast headings, no stock AI vocabulary.

## API routes and proxy.ts

- Route handlers live under `app/(en)/api/` (newsletter signup via Resend, github-stars, blog JSON). Env vars: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` (in `.env`).
- **There is no auth layer — every merged API route is publicly reachable.** `proxy.ts` (Next 16's rename of the `middleware` convention) 404s any production API path whose segment looks like scaffolding (`test`, `debug`, `dev`, `internal`, `admin`, ...). It exists because a debug route once leaked the entire subscriber list; do not add routes that expose data without real authentication.

## Git

The canonical repo is `The-Swarm-Corporation/swarms-website` (it moved from `kyegomez/swarms-website-td`; make sure `origin` points to the new URL or `gh pr create` fails). PRs target `main`.
