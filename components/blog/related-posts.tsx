import Link from "next/link";

import { getBlogPosts } from "@/lib/db/blog";

interface PostMetadata {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  summary: string;
  image?: string;
  keywords?: string[];
}

interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
  tweetIds: string[];
}

interface ScoredPost extends Post {
  score: number;
}

interface RelatedPostsProps {
  currentSlug: string;
  keywords: string[];
  limit?: number;
}

export default async function RelatedPosts({
  currentSlug,
  keywords,
  limit = 2,
}: RelatedPostsProps) {
  // Get all blog posts
  const allPosts = getBlogPosts();

  // Filter out the current post
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  if (!otherPosts.length) return null;

  // Score each post by matching keywords
  const scoredPosts = otherPosts.map((post) => {
    const postKeywords = post.metadata.keywords || [];
    const postTags = [...postKeywords, post.metadata.title.toLowerCase()];

    // Calculate relevancy score based on keyword matches
    const score = keywords.reduce((total, keyword) => {
      const keywordLower = keyword.toLowerCase();
      return (
        total +
        (postTags.some(
          (tag) =>
            typeof tag === "string" && tag.toLowerCase().includes(keywordLower)
        )
          ? 1
          : 0)
      );
    }, 0);

    return { ...post, score } as ScoredPost;
  });

  // Sort by score (highest first) and limit results
  const relatedPosts = scoredPosts
    .sort((a, b) => b.score - a.score)
    .filter((post) => post.score > 0)
    .slice(0, limit);

  if (!relatedPosts.length) return null;

  return (
    <div className="mt-12 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col space-y-1 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {post.metadata.title}
            </h3>
            <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
              {post.metadata.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
