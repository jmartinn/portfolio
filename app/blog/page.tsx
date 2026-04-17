import { Metadata } from "next";
import Link from "next/link";

import { getBlogPosts } from "@/lib/db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about web development, tools, and things I've learned along the way.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = (await getBlogPosts()).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <>
        <section className="mb-12">
          <h1 className="mb-4 font-serif text-2xl font-medium tracking-tight text-foreground">
            Writing
          </h1>
          <p className="text-muted-foreground">
            Things I&apos;ve learned, figured out, or just wanted to write down.
          </p>
        </section>

        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group -mx-3 rounded-lg px-3 py-4 transition-colors duration-200 hover:bg-muted/30"
            >
              <article className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                    {post.metadata.title}
                  </h2>
                  {post.metadata.summary && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <time className="text-sm text-muted">
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                  <svg
                    className="size-3.5 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
    </>
  );
}
