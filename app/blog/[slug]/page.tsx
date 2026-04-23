import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ScrollMarkers } from "@/components/blog/scroll-markers";
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
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="mb-10">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              aria-hidden="true"
              className="size-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to writing
          </Link>

          <h1 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground text-balance">
            {metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={metadata.publishedAt}>
              {formatDate(metadata.publishedAt)}
            </time>
            <span className="text-border">|</span>
            <span>{readingTime}</span>
          </div>
        </header>

        <article className="prose prose-neutral prose-quoteless max-w-none dark:prose-invert">
          <MDXContent />
        </article>

        <ScrollMarkers />
    </>
  );
}
