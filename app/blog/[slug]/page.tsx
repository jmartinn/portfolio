import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportView } from "@/components/blog/report-view";
import ViewCounter from "@/components/blog/view-counter";
import { BlogMDX } from "@/components/mdx/mdx";
import { ThemeToggleInline } from "@/components/theme-toggle";
import { Icons } from "@/components/ui/icons";
import { getViewsCount } from "@/lib/db/actions";
import { getBlogPost, getBlogPosts } from "@/lib/db/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const publishedTime = new Date(post.metadata.publishedAt).toISOString();

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    keywords: post.metadata.keywords,
    authors: [{ name: "Juan Pedro Martin", url: "https://jmartinn.com" }],
    creator: "Juan Pedro Martin",
    publisher: "Juan Pedro Martin",
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: "article",
      publishedTime,
      authors: ["Juan Pedro Martin"],
      url: `https://jmartinn.com/blog/${slug}`,
      siteName: "Juan Pedro Martin",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.summary,
      creator: "@jmartinn07",
    },
    alternates: {
      canonical: `https://jmartinn.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allViews = await getViewsCount();

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
    <div className="relative min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="fixed left-0 top-0 z-40 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 md:px-24">
          <Link href="/blog" className="flex items-center space-x-2">
            <Icons.ArrowLeft className="size-4" />
            <span className="text-sm">Back to journal</span>
          </Link>
          <ThemeToggleInline />
        </div>
      </header>

      <section className="mx-auto max-w-screen-xl px-6 pt-32 md:px-24">
        <article className="mx-auto max-w-2xl">
          <div className="mb-12">
            <div className="mb-4 flex items-center space-x-4 text-xs text-foreground/60">
              <span>{post.metadata.publishedAt}</span>
              <span className="size-1 rounded-full bg-foreground/40"></span>
              <span>Development</span>
              {post.metadata.readingTime && (
                <>
                  <span className="size-1 rounded-full bg-foreground/40"></span>
                  <span>{post.metadata.readingTime} min read</span>
                </>
              )}
              <span className="size-1 rounded-full bg-foreground/40"></span>
              <Suspense fallback={<span>--- views</span>}>
                <ViewCounter slug={slug} allViews={allViews} />
              </Suspense>
            </div>
            <h1 className="mb-8 text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              {post.metadata.title}
            </h1>
          </div>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <BlogMDX source={post.content} />
          </div>

          <ReportView slug={slug} />
        </article>
      </section>
    </div>
  );
}
