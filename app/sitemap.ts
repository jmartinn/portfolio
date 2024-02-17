import { getBlogPosts } from "app/db/blog";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://www.jmartinn.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/blog", "/uses", "/work"].map((route) => ({
    url: `https://www.jmartinn.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
