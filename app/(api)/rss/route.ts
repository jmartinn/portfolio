import { getBlogPosts } from "@/lib/db/blog";

export async function GET() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();
      return `
        <item>
          <title><![CDATA[${post.metadata.title}]]></title>
          <description><![CDATA[${post.metadata.summary}]]></description>
          <link>https://jmartinn.com/blog/${post.slug}</link>
          <guid>https://jmartinn.com/blog/${post.slug}</guid>
          <pubDate>${pubDate}</pubDate>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Juan Pedro Martin - Blog</title>
    <description>Thoughts, guides, and explorations on design, development, and the spaces in between.</description>
    <link>https://jmartinn.com</link>
    <atom:link href="https://jmartinn.com/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>juamp_m@hotmail.com (Juan Pedro Martin)</managingEditor>
    <webMaster>juamp_m@hotmail.com (Juan Pedro Martin)</webMaster>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
