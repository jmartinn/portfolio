import { Suspense } from "react";

import ViewCounter from "@/components/blog/view-counter";
import { Icons } from "@/components/ui/icons";
import { getViewsCount } from "@/lib/db/actions";
import { getBlogPosts } from "@/lib/db/blog";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        read my blog
      </h1>
      <div className="space-y-6">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, idx) => (
            <BlogLink
              key={`blog-card-${idx}`}
              name={post.metadata.title}
              slug={post.slug}
            />
          ))}
      </div>
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}

interface BlogLinkProps {
  slug: string;
  name: string;
}

async function BlogLink({ slug, name }: BlogLinkProps) {
  return (
    <div className="group" key={slug}>
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 transition-all hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-5" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <Icons.arrow />
        </div>
      </a>
    </div>
  );
}
