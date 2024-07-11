import type { MetadataRoute } from "next";

import { getBlogPosts } from "app/db/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  const blogs = posts.map((post) => ({
    url: `https://www.jmartinn.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog", "/uses", "/work"].map((route) => ({
    url: `https://www.jmartinn.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
