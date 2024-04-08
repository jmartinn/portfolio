import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { CustomMDX } from "app/components/mdx";
import { notFound } from "next/navigation";
import { getViewsCount } from "app/db/actions";
import { getBlogPosts } from "app/db/blog";
import { increment } from "app/db/actions";
import { formatDate } from "lib/utils";
import ViewCounter from "../view-counter";

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
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
    : `https://www.jmartinn.com/og?title=${title}&aoc=${keywords?.includes(
      "aoc",
    )}`;

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

export default function Blog({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

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
              : `https://www.jmartinn.com/og?title=${post.metadata.title}`,
            url: `https://www.jmartinn.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "jmartinn",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-3xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

const incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
