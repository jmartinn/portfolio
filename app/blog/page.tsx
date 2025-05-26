import Link from "next/link";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { ThemeToggleInline } from "@/components/theme-toggle";
import { Icons } from "@/components/ui/icons";
import { getViewsCount } from "@/lib/db/actions";
import { getBlogPosts } from "@/lib/db/blog";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const allViews = await getViewsCount();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="fixed left-0 top-0 z-40 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 md:px-24">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.ArrowLeft className="size-4" />
            <span className="text-sm">Back to home</span>
          </Link>
          <ThemeToggleInline />
        </div>
      </header>

      <section className="mx-auto max-w-screen-xl px-6 pt-32 md:px-24">
        <div className="mb-16">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-light md:text-4xl">Journal</h2>
              <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                Thoughts, guides, and explorations on design, development, and
                the spaces in between.
              </p>
            </div>
            <a
              href="/feed.xml"
              className="flex items-center space-x-2 rounded-md border border-foreground/20 px-3 py-2 text-xs transition-colors hover:bg-foreground/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Rss className="size-3" />
              <span>RSS</span>
            </a>
          </div>
        </div>

        <div className="space-y-16">
          {posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              title={post.metadata.title}
              excerpt={post.metadata.summary}
              date={post.metadata.publishedAt}
              category="Development"
              slug={`/blog/${post.slug}`}
              allViews={allViews}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
