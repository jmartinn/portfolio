import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogPosts } from "@/lib/db/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

/**
 * Helper to get post data from the filesystem.
 * All blog posts are stored as MDX files in the content directory
 * and are parsed at build time using the file system.
 */
async function getPostData(slug: string) {
  const post = await getBlogPost(slug);

  if (!post) {
    return null;
  }

  return {
    metadata: post.metadata,
    readingTime: post.readingTime,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData || !postData.metadata) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for could not be found.",
    };
  }

  const { metadata } = postData;

  const publishedTime = new Date(metadata.publishedAt).toISOString();
  const ogImage = `https://www.jmartinn.com/og?title=${encodeURIComponent(metadata.title)}`;

  return {
    title: metadata.title,
    description: metadata.summary,
    keywords: metadata.keywords,
    authors: [{ name: "Juan Pedro Martin", url: "https://x.com/jmartinn07" }],
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: publishedTime,
      url: `https://www.jmartinn.com/blog/${slug}`,
      siteName: "Juan Pedro Martin",
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
      creator: "@jmartinn07",
      images: [ogImage],
    },
  };
}

async function getMDXComponent(slug: string) {
  try {
    const MDXContent = await import(`@/content/${slug}.mdx`);
    return MDXContent.default;
  } catch (error) {
    console.error(`Failed to load MDX content for slug: ${slug}`, error);
    return null;
  }
}

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;

  const postData = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  const MDXContent = await getMDXComponent(slug);

  if (!MDXContent) {
    notFound();
  }

  const { metadata, readingTime } = postData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://jmartinn.com/blog/${slug}`,
    headline: metadata.title,
    description: metadata.summary,
    author: {
      "@type": "Person",
      "@id": "https://jmartinn.com/#person",
      name: "Juan Pedro Martin",
      url: "https://jmartinn.com",
      sameAs: [
        "https://x.com/jmartinn07",
        "https://github.com/jmartinn",
        "https://linkedin.com/in/jmartinn",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Juan Pedro Martin",
      url: "https://jmartinn.com",
    },
    datePublished: new Date(metadata.publishedAt).toISOString(),
    dateModified: new Date(metadata.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jmartinn.com/blog/${slug}`,
    },
    url: `https://jmartinn.com/blog/${slug}`,
    keywords: metadata.keywords,
    timeRequired: `PT${readingTime.replace(" min read", "")}M`,
    inLanguage: "en-US",
    articleSection: "Technology",
    isAccessibleForFree: true,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="title max-w-[650px] text-3xl font-bold tracking-tighter dark:text-gray-100">
        {metadata.title}
      </h1>
      <span className="mt-2 flex font-mono text-sm text-neutral-600 dark:text-gray-400">
        <span className="flex grow">
          <span className="hidden md:inline">
            <span>
              <a
                href="https://x.com/jmartinn07"
                className="hover:text-gray-800 dark:hover:text-gray-300"
                target="_blank"
                rel="noreferrer"
              >
                @jmartinn
              </a>
            </span>
            <span className="mx-2">|</span>
          </span>
          <p>{formatDate(metadata.publishedAt)}</p>
        </span>
        <span>
          <p>{readingTime}</p>
        </span>
      </span>
      <article className="prose prose-neutral prose-quoteless mt-8 w-full dark:prose-invert">
        <MDXContent />
      </article>
    </section>
  );
}
