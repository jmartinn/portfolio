import fs from "fs";
import path from "path";

import { cache } from "react";

type Metadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
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
      metadata[key.trim() as "keywords"] = value
        .split(",")
        .map((word) => word.trim());
    } else {
      // FIX: Provide a more accurate type
      // @ts-expect-error: Wrong type
      metadata[key.trim()] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const tweetIds = extractTweetIds(content);
    return {
      metadata,
      slug,
      tweetIds,
      content,
    };
  });
}

function extractTweetIds(content: string) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  return tweetMatches?.map((tweet: string) => tweet.match(/[0-9]+/g)![0]) || [];
}

export const getBlogPosts = cache((): Post[] => {
  return getMDXData(path.join(process.cwd(), "content"));
});

export const getBlogPost = cache((slug: string): Post | undefined => {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug);
});
