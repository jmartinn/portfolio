import { getBlogPosts } from "@/lib/db/blog";

export async function GET() {
  const allBlogs = getBlogPosts();
  const baseUrl = "https://www.jmartinn.com";

  const itemsXml = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map(
      (post) => `
        <item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${escapeXml(post.metadata.summary || "")}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
        </item>
      `
    )
    .join("");

  const rssFeed = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>JMartin's Blog</title>
        <link>${baseUrl}</link>
        <description>Stay updated with the latest posts from JMartin's Portfolio Blog, where I share insights on web development, project showcases, and personal reflections on the tech industry. Subscribe to dive into my world of coding and creativity</description>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        ${itemsXml}
      </channel>
    </rss>
  `.trim();

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
    return c;
  });
}
