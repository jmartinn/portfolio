import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogPosts, getMDXMetadata } from "@/lib/db/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const mdxMetadata = await getMDXMetadata(slug);
  const post = getBlogPost(slug);

  if (!post && !mdxMetadata) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata = mdxMetadata || post?.metadata;
  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    keywords,
  } = metadata;

  const ogImage = `https://www.jmartinn.com/og?title=${title}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://www.jmartinn.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  // Get metadata from both sources
  const mdxMetadata = await getMDXMetadata(slug);
  const post = getBlogPost(slug);

  if (!post && !mdxMetadata) {
    notFound();
  }

  const MDXContent = await getMDXComponent(slug);

  if (!MDXContent) {
    notFound();
  }

  // Use MDX metadata if available, fallback to parsed metadata
  const metadata = mdxMetadata || post?.metadata;
  const readingTime = post?.readingTime || "5 min read";

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
        suppressHydrationWarning
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
