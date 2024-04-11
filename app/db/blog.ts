"use server";

import { sql } from "./postgres";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  keywords?: string[];
};

type Post = {
  slug: string;
  metadata: Metadata;
  tweetIds: string[];
  content: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (key.trim() === "keywords") {
      metadata[key.trim()] = value.split(",").map((word) => word.trim());
    } else {
      metadata[key.trim()] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function extractTweetIds(content: string) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  return tweetMatches?.map((tweet: string) => tweet.match(/[0-9]+/g)![0]) || [];
}

export async function getBlogPosts(): Promise<Post[]> {
  const rawPosts = await sql`
    SELECT slug, content
    FROM posts
  `;

  const posts: Post[] = rawPosts.map(({ slug, content }) => {
    const { metadata, content: processedContent } = parseFrontmatter(content);
    const tweetIds = extractTweetIds(processedContent);

    return {
      slug,
      metadata,
      tweetIds,
      content: processedContent,
    };
  });

  return posts;
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  const rawPost = await sql`
    SELECT slug, content
    FROM posts
    WHERE slug = ${slug}
    LIMIT 1
  `;

  if (rawPost.length === 0) {
    return null;
  }

  const { slug: postSlug, content } = rawPost[0];
  const { metadata, content: processedContent } = parseFrontmatter(content);
  const tweetIds = extractTweetIds(processedContent);

  return {
    slug: postSlug,
    metadata,
    tweetIds,
    content: processedContent,
  };
}
