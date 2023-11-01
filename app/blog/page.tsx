import type { Metadata } from "next";

import { Suspense } from "react";
import Link from "next/link";
import ViewCounter from "./view-counter";

import { allBlogs } from "contentlayer/generated";
import { getViewsCount } from "lib/metrics";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">read my blog</h1>
      <div className="space-y-6">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50  dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.title}
                </p>
                <Suspense fallback={<p className="h-6" />}>
                  <Views slug={post.slug} />
                </Suspense>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views;
  try {
    views = await getViewsCount();
  } catch (error) {
    console.error(error);
  }

  return <ViewCounter allViews={views} slug={slug} trackView={false} />;
}
