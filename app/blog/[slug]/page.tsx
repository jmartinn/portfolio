import { notFound } from "next/navigation";

import { BlogMDX } from "@/components/mdx/mdx";
import { getBlogPost, getBlogPosts } from "@/lib/db/blog";
import { formatDate, calculateReadingTime } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    keywords,
  } = post.metadata;

  return {
    title,
    description,
    ...keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://www.jmartinn.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// @ts-expect-error: Invalid types
export default async function Blog({ params }) {
  const { slug } = await params;

  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.summary,
    author: {
      "@type": "Person",
      name: "Juan Pedro Martin",
      url: "https://jmartinn.com",
    },
    publisher: {
      "@type": "Person",
      name: "Juan Pedro Martin",
      url: "https://jmartinn.com",
    },
    datePublished: new Date(post.metadata.publishedAt).toISOString(),
    dateModified: new Date(post.metadata.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jmartinn.com/blog/${slug}`,
    },
    url: `https://jmartinn.com/blog/${slug}`,
    keywords: post.metadata.keywords,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="title max-w-[650px] text-3xl font-bold tracking-tighter dark:text-gray-100">
        {post.metadata.title}
      </h1>
      <span className="mt-2 flex font-mono text-sm text-neutral-600 dark:text-gray-400">
        <span className="flex grow">
          <span className="hidden md:inline">
            <span>
              <a
                href="https://x.com/jmartinn07"
                className="hover:text-gray-800 dark:hover:text-gray-300"
                target="_blank"
              >
                @jmartinn
              </a>
            </span>

            <span className="mx-2">|</span>
          </span>

          <p>{formatDate(post.metadata.publishedAt)}</p>
        </span>
        <span>
          <p>{readingTime}</p>
        </span>
      </span>
      <article className="prose prose-neutral prose-quoteless mt-8 w-full dark:prose-invert">
        <BlogMDX source={post.content} />
      </article>
    </section>
  );
}
