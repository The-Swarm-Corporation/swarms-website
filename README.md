# Swarms Website

The open-source code behind [swarms.ai](https://swarms.ai): the marketing site, bilingual blog (English and 中文), and newsletter for the Swarms multi-agent platform.

[![Website](https://img.shields.io/badge/swarms.ai-live-red)](https://swarms.ai)
[![GitHub stars](https://img.shields.io/github/stars/The-Swarm-Corporation/swarms-website?style=flat)](https://github.com/The-Swarm-Corporation/swarms-website/stargazers)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm&logoColor=white)](https://pnpm.io)

## Quick Start

This project uses **pnpm only** (pinned in `package.json`). Do not use npm or yarn.

```sh
pnpm install
pnpm dev        # dev server at http://localhost:3000
```

## Environment Variables

Create a `.env` file in the repo root. All variables are optional for local development: the site builds and runs without them, but newsletter signup will fail.

| Variable | Used for |
| --- | --- |
| `RESEND_API_KEY` | Sending newsletter signup emails via [Resend](https://resend.com) |
| `RESEND_AUDIENCE_ID` | Adding subscribers to the Resend audience (contact list) |

```sh
# .env
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...
```

## Build

```sh
pnpm build      # production build (also the main verification step; there is no test suite)
pnpm start      # serve the production build
pnpm lint       # next lint
```

Deployed on [Vercel](https://vercel.com); every push to `main` goes live.

## Project Structure

```
app/(en)/          English pages (no URL prefix)
app/zh/            Chinese mirrors of a subset (blog, framework, installation, pricing)
content/blog/      Blog posts as .mdx with frontmatter
content/blog/zh/   Chinese translations, same filename/slug as the English post
components/        React components (blog/ holds the blog UI)
lib/               Blog loading, email, utilities
public/            Static assets, including blog cover art
docs/              Contributor docs, e.g. blog image guidelines
```

## Writing a Blog Post

1. Add `content/blog/<slug>.mdx` with frontmatter (`title`, `description`, `date`, `author`, `categories`, `featured`, `readTime`, and optional `image`).
2. Add the Chinese translation at `content/blog/zh/<slug>.mdx` with the same slug, which powers the 中文/EN toggle.
3. Cover art goes in `public/` at 1920×1080; see `docs/BLOG_IMAGE_GUIDELINES.md` for sizing and safe zones.

## Links

- [Swarms Marketplace](https://swarms.world)
- [Documentation](https://docs.swarms.world)
- [Swarms Framework](https://github.com/kyegomez/swarms)
