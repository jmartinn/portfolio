import fs from "fs";
import path from "path";

import { cache } from "react";

import { BLOG_REVALIDATE_SECONDS, READING_SPEED_WPM } from "@/lib/constants";

export const revalidate = BLOG_REVALIDATE_SECONDS;

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
  readingTime: string;
};

/**
 * Calculates reading time based on word count.
 * Simple word count divided by reading speed WPM constant.
 *
 * @param text - The text content to analyze
 * @returns Formatted reading time string like "5 min read"
 */
function calculateReadingTime(text: string): string {
  const numberOfWords = text.split(/\s/g).length;
  const minutes = numberOfWords / READING_SPEED_WPM;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
}

/**
 * Extracts content from MDX file, removing frontmatter.
 * Used for calculating reading time and extracting tweet IDs.
 *
 * @param fileContent - The raw MDX file content with frontmatter
 * @returns Content without frontmatter
 */
function extractContent(fileContent: string): string {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  return fileContent.replace(frontmatterRegex, "").trim();
}

/**
 * Extracts Tweet IDs from MDX content that contains <StaticTweet /> components.
 * Searches for <StaticTweet id="123456" /> patterns and extracts the numeric IDs.
 *
 * @param content - The MDX content to search
 * @returns Array of tweet ID strings, empty if none found
 *
 * @example
 * ```ts
 * extractTweetIds("<StaticTweet id=\"123\" />") // => ["123"]
 * ```
 */
function extractTweetIds(content: string) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  return tweetMatches?.map((tweet: string) => tweet.match(/[0-9]+/g)![0]) || [];
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Reads raw MDX file content for extracting tweet IDs and calculating reading time.
 * Note: Frontmatter is obtained from the compiled MDX export, not parsed here.
 */
function readMDXFileContent(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Normalizes frontmatter to ensure keywords is an array.
 * Keywords can come as a comma-separated string from YAML or as an array.
 *
 * @param frontmatter - Raw frontmatter from MDX
 * @returns Normalized metadata with keywords as array
 */
function normalizeFrontmatter(frontmatter: unknown): Metadata {
  const metadata = { ...(frontmatter as Record<string, unknown>) };

  // Convert comma-separated keywords string to array
  if (metadata.keywords && typeof metadata.keywords === "string") {
    metadata.keywords = metadata.keywords
      .split(",")
      .map((keyword: string) => keyword.trim())
      .filter(Boolean);
  }

  return metadata as Metadata;
}

/**
 * Gets MDX data by combining:
 * 1. Frontmatter from compiled MDX exports (via remark-mdx-frontmatter)
 * 2. Content analysis for reading time and tweet IDs
 *
 * @throws Error if content directory doesn't exist or MDX files are malformed
 */
async function getMDXData(dir: string): Promise<Post[]> {
  const mdxFiles = getMDXFiles(dir);

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));

      try {
        const mdxModule = await import(`@/content/${slug}.mdx`);

        if (!mdxModule.frontmatter) {
          throw new Error(`No frontmatter found in ${slug}.mdx`);
        }

        const metadata = normalizeFrontmatter(mdxModule.frontmatter);

        const rawContent = readMDXFileContent(path.join(dir, file));
        const content = extractContent(rawContent);

        const tweetIds = extractTweetIds(content);
        const readingTime = calculateReadingTime(content);

        return {
          metadata,
          slug,
          tweetIds,
          readingTime,
        };
      } catch (error) {
        console.error(`Error processing ${slug}.mdx:`, error);
        throw error;
      }
    })
  );

  return posts;
}

/**
 * Gets all blog posts from the content directory.
 * Posts are regenerated via ISR every BLOG_REVALIDATE_SECONDS.
 * Results are cached using React's cache() for request deduplication.
 *
 * Uses frontmatter exported from compiled MDX files (via remark-mdx-frontmatter).
 *
 * @returns Promise resolving to array of all blog posts with metadata and reading time
 */
export const getBlogPosts = cache(async (): Promise<Post[]> => {
  return await getMDXData(path.join(process.cwd(), "content"));
});

/**
 * Gets a single blog post by slug without loading all posts.
 * Results are cached using React's cache() for request deduplication.
 *
 * @param slug - The URL slug of the blog post (filename without extension)
 * @returns Promise resolving to Post object if found, undefined otherwise
 */
export const getBlogPost = cache(
  async (slug: string): Promise<Post | undefined> => {
    try {
      const contentDir = path.join(process.cwd(), "content");
      const filePath = path.join(contentDir, `${slug}.mdx`);

      if (!fs.existsSync(filePath)) {
        return undefined;
      }

      const mdxModule = await import(`@/content/${slug}.mdx`);

      if (!mdxModule.frontmatter) {
        console.error(`No frontmatter found in ${slug}.mdx`);
        return undefined;
      }

      const metadata = normalizeFrontmatter(mdxModule.frontmatter);

      const rawContent = readMDXFileContent(filePath);
      const content = extractContent(rawContent);

      const tweetIds = extractTweetIds(content);
      const readingTime = calculateReadingTime(content);

      return {
        metadata,
        slug,
        tweetIds,
        readingTime,
      };
    } catch (error) {
      console.error(`Error loading blog post ${slug}:`, error);
      return undefined;
    }
  }
);

/**
 * Dynamically imports an MDX file and extracts its normalized frontmatter metadata.
 * Useful for getting metadata without loading full post content.
 * Results are cached using React's cache() for request deduplication.
 *
 * @param slug - The blog post slug (filename without extension)
 * @returns Promise resolving to normalized metadata object, or null if file not found
 *
 * @example
 * ```ts
 * const metadata = await getMDXMetadata("my-post");
 * // { title, publishedAt, summary, keywords: [...], ... }
 * ```
 */
export const getMDXMetadata = cache(
  async (slug: string): Promise<Metadata | null> => {
    try {
      const MDXModule = await import(`@/content/${slug}.mdx`);
      const frontmatter = MDXModule.frontmatter || MDXModule.metadata;

      if (!frontmatter) {
        return null;
      }

      return normalizeFrontmatter(frontmatter);
    } catch (error) {
      console.error(`Error loading metadata for ${slug}:`, error);
      return null;
    }
  }
);
