# Personal Website

This is the source code for my personal website [jmartinn.com](https://jmartinn.com). The site serves as a platform to showcase my work, share my thoughts through blog posts, and provide information about my professional journey.

## Overview

This portfolio is built with modern web technologies and features a minimalist design focused on content and user experience. While the source code is available for reference, please note that the design, content, and assets are not licensed for reuse.

## Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown for the component era
- [Vercel](https://vercel.com) - For deployment and analytics

## Features

- Responsive minimalist design
- Blog with MDX support
- Dynamic OG image generation
- RSS feed
- Sitemap generation
- View counter for blog posts
- Performance monitoring with Vercel Analytics and Speed Insights

## Project Structure

```tree
portfolio/
├── app/                # Next.js 13+ app directory
│   ├── (api)/          # API routes (analytics, RSS, resume)
│   ├── blog/           # Blog pages and post layouts
│   ├── about/          # About page
│   ├── uses/           # Uses page
│   └── work/           # Work showcase page
├── components/         # Reusable React components
│   ├── blog/           # Blog-specific components
│   ├── layout/         # Layout components (footer, sidebar)
│   ├── mdx/            # MDX components
│   └── ui/             # UI components (badge, toast, icons)
├── content/            # MDX files for blog posts
├── lib/                # Utility functions and database actions
│   ├── config/         # Application configuration
│   ├── db/             # Database operations
│   ├── constants.ts    # Application constants
│   ├── utils.ts        # Utility functions
│   └── validation.ts   # Input validation
└── public/             # Static assets (fonts, images)
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (recommended package manager)
- **Git** for version control

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jmartinn/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the required values. See [Environment Variables](#environment-variables) section for details.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### 5. Build for Production

```bash
pnpm build
pnpm start
```

## Environment Variables

### Required Services

#### Supabase (Resume Storage)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Create storage bucket named "resume"
4. Upload your resume PDF as "main.pdf"
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

#### Spotify API (Music Widget)

1. Create app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Set redirect URI to `http://localhost:3000/callback`
3. Follow [OAuth2 Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) to get refresh token
4. Generate auth token: `echo -n "CLIENT_ID:CLIENT_SECRET" | base64`
5. Add to `.env.local`:
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_REFRESH_TOKEN=your_refresh_token
   SPOTIFY_AUTH_TOKEN=your_base64_token
   ```

#### Vercel Postgres (View Tracking)

1. Deploy to Vercel
2. Add Postgres storage in project dashboard
3. Run migration:
   ```sql
   CREATE TABLE views (
     slug TEXT PRIMARY KEY,
     count INTEGER NOT NULL DEFAULT 0
   );
   ```
4. Environment variables added automatically by Vercel

#### Vercel KV (Token Cache)

1. Deploy to Vercel
2. Add KV storage in project dashboard
3. Environment variables added automatically by Vercel

## Adding Blog Posts

1. Create a new `.mdx` file in the `content/` directory:

```bash
touch content/my-new-post.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "My New Post"
publishedAt: "2025-10-24"
summary: "A brief description of the post"
keywords: ["nextjs", "react", "typescript"]
---

Your content here with **markdown** and React components!
```

3. The post will automatically appear in the blog listing

## Available Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
pnpm format    # Format code with Prettier
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

Vercel will automatically:
- Install dependencies
- Run build
- Deploy to CDN
- Provide Postgres and KV storage

## Tech Stack Details

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Content**: MDX with custom components
- **Database**: Vercel Postgres
- **Cache**: Vercel KV (Redis)
- **Storage**: Supabase
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics + Speed Insights

## Project Architecture

### ISR (Incremental Static Regeneration)

Blog posts use ISR with 1-hour revalidation:
- Posts are statically generated at build time
- Regenerated at most once per hour
- Provides optimal performance with fresh content

### Caching Strategy

- **React Cache**: Request deduplication for blog posts
- **Vercel KV**: 59-minute TTL for Spotify tokens
- **ISR**: 1-hour revalidation for blog content

### API Routes

- `/api/track` - Get currently playing Spotify track
- `/api/spotify/token` - Refresh Spotify access token
- `/resume` - Download resume PDF
- `/rss` - RSS feed for blog
- `/og` - Dynamic OpenGraph image generation

## Contributing

This is a personal portfolio, but feel free to:
- Report bugs via GitHub Issues
- Suggest improvements
- Use as reference for your own portfolio

## License

The code is open source, but content and design are not licensed for reuse.
