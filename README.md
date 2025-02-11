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
└── public/             # Static assets (fonts, images)
```
