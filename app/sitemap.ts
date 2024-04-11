import { getBlogPosts } from "app/db/blog";

export default async function sitemap() {
  const posts = await getBlogPosts();

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
