import { Suspense } from "react";

import { getViewsCount } from "app/db/actions";
import { getBlogPosts } from "app/db/blog";
import { Icons } from "components/icons";

import ViewCounter from "./view-counter";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
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

async function BlogLink({ slug, name }) {
  return (
    <div className="group" key={slug}>
      <a
        href={`/blog/${slug}`}
        className="transition-all border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-neutral-300 hover:bg-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-700 rounded flex items-center justify-between px-3 py-4 w-full"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <Icons.arrow />
        </div>
      </a>
    </div>
  );
}
