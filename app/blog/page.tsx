import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { getBlogPosts } from "@/lib/db/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, guides, and explorations on design, development, and the spaces in between.",
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
      <Nav />
      <main>
        <section className="mb-12">
          <h1 className="mb-4 font-serif text-2xl font-medium tracking-tight text-foreground">
            Writing
          </h1>
          <p className="text-muted-foreground">
            Thoughts, guides, and explorations on design, development, and the
            spaces in between.
          </p>
        </section>

        <div className="flex flex-col gap-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group -mx-3 rounded-lg px-3 py-4 transition-colors hover:bg-foreground/[0.03]"
            >
              <article className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium text-foreground transition-colors group-hover:text-accent">
                    {post.metadata.title}
                  </h2>
                  {post.metadata.summary && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
                <time className="shrink-0 text-sm text-muted">
                  {new Date(post.metadata.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </time>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
