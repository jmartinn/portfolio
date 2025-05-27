import BlogLink from "@/components/blog/blog-post-card";
import { getBlogPosts } from "@/lib/db/blog";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts, guides, and explorations on design, development, and the spaces in between.",
};

export default function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        read my blog
      </h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Thoughts, guides, and explorations on design, development, and the
        spaces in between.
      </p>
      <div className="space-y-6">
        {posts.map((post, idx) => (
          <BlogLink
            key={`blog-card-${idx}`}
            name={post.metadata.title}
            slug={post.slug}
            summary={post.metadata.summary}
          />
        ))}
      </div>
    </section>
  );
}
