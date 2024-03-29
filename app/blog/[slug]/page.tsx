import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { CustomMDX } from "app/components/mdx";
import { notFound } from "next/navigation";
import { getViewsCount } from "app/db/actions";
import { getBlogPosts } from "app/db/blog";
import { increment } from "app/db/actions";
import { unstable_noStore as noStore } from "next/cache";
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

function formatDate(date: string): string {
  noStore();
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  if (daysAgo < 0) {
    monthsAgo--;
    daysAgo += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate();
  }
  if (monthsAgo < 0) {
    yearsAgo--;
    monthsAgo += 12;
  }

  let formattedDate = "";
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (diffDays > 0) {
    formattedDate = `${diffDays}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
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
