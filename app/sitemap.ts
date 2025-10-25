import type { MetadataRoute } from "next";

import { siteRoutes } from "@/lib/config/navigation";
import { getBlogPosts } from "@/lib/db/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogs = posts.map((post) => ({
    url: `https://www.jmartinn.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = siteRoutes.map((route) => ({
    url: `https://www.jmartinn.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
