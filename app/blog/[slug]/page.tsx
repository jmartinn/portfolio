import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReportView } from "@/components/blog/report-view";
import ViewCounter from "@/components/blog/view-counter";
import { CustomMDX } from "@/components/mdx/mdx";
import { getViewsCount } from "@/lib/db/actions";
import { getBlogPosts } from "@/lib/db/blog";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

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
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    keywords,
  } = post.metadata;
  const ogImage = image
    ? `https://www.jmartinn.com${image}`
    : `https://www.jmartinn.com/og?title=${title}`;

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

export default async function Blog({ params }: { params: Params }) {
  const { slug } = await params;

  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://www.jmartinn.com${post.metadata.image}`
              : `http://www.jmartinn.com/og?title=${post.metadata.title}`,
            url: `https://www.jmartinn.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "jmartinn",
            },
          }),
        }}
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

        <span className="md:pr-12">
          <Suspense fallback={<span className="h-5" />}>
            <Views slug={post.slug} />
          </Suspense>
          <ReportView slug={post.slug} />
        </span>
      </span>
      <article className="prose prose-neutral prose-quoteless mb-6 text-justify dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}
