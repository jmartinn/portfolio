# jmartinn.com

Source for my [personal website](https://jmartinn.com): writing, projects,
and information about my work.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and MDX. The site
includes an RSS feed, generated Open Graph images, blog view counts, and a
Spotify widget. Blog media is stored in Vercel Blob.

## Local development

Use Node.js 22 LTS and pnpm 11.5.0 (the version pinned in `package.json`).

```sh
git clone https://github.com/jmartinn/portfolio.git
cd portfolio
pnpm install --frozen-lockfile
```

Create `.env.local` with the configuration for the integrations below, then run:

```sh
pnpm dev
```

Open `http://localhost:3000`. This is a personal site, not a standalone
template: media, resume downloads, and service-backed features require
configuration. There is no tracked `.env.example`.

### Integrations

Keep credentials in `.env.local` or your deployment's environment settings,
never in source control. Only public values should use the `NEXT_PUBLIC_` prefix.

| Integration | Configuration |
| --- | --- |
| Blog media | `NEXT_PUBLIC_BLOB_BASE_URL`: public base URL of the Vercel Blob store. Media uploads also require `BLOB_READ_WRITE_TOKEN`. |
| Resume download | `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The route reads `main.pdf` from a `resume` storage bucket. |
| Resume error redirect | `NEXT_PUBLIC_APP_URL`: site origin, such as `http://localhost:3000` locally. |
| Spotify | `SPOTIFY_CLIENT_ID`, `SPOTIFY_REFRESH_TOKEN`, and `SPOTIFY_AUTH_TOKEN` (base64-encoded client ID and client secret, separated by a colon). |
| Spotify token cache | Redis REST credentials compatible with `@vercel/kv`: `KV_REST_API_URL` and `KV_REST_API_TOKEN`. |
| Blog view counts | PostgreSQL connection settings for `@vercel/postgres`, including `POSTGRES_URL`. |

The view counter expects this table:

```sql
CREATE TABLE views (
  slug TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);
```

## Commands

```sh
pnpm dev       # Development server
pnpm build     # Production build
pnpm start     # Serve the production build
pnpm lint      # ESLint
pnpm lint:fix  # ESLint with automatic fixes
pnpm format    # Format application source with Prettier
pnpm media     # Blog media management CLI
```

## Layout

```text
app/           Pages, layouts, and route handlers
app/(api)/     Spotify, resume, RSS, and Open Graph routes
components/    UI and MDX components
content/       Blog posts in MDX
lib/           Configuration, database actions, media helpers, and utilities
public/        Static assets
scripts/       Media management tooling
```

## Writing

Add an `.mdx` file to `content/` with frontmatter:

```mdx
---
title: "Post title"
publishedAt: "2026-01-01"
summary: "A short description of the post."
keywords: ["typescript"]
---

Post content.
```

The filename supplies the post slug. Custom MDX components are registered in
`mdx-components.tsx`.

## Deployment

The site is deployed on Vercel. Configure the integrations above in the
project's environment settings; deploying the application does not provision
its storage or databases automatically.

## License

See [LICENSE.md](LICENSE.md). This repository is licensed under
CC BY-NC-ND 4.0; it is not a permissively licensed website template.
