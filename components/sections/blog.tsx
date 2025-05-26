import Link from "next/link";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Icons } from "@/components/ui/icons";

export function BlogSection() {
  // Highlighted posts - manually curated
  const highlightedPosts = [
    {
      title: "Building My Homelab: A DevOps Journey",
      excerpt:
        "From a curious developer to managing my own infrastructure - my journey into building and maintaining a homelab with Kubernetes, Flux, and modern DevOps practices.",
      date: "2025-01-08",
      category: "DevOps",
      slug: "/blog/building-my-homelab",
    },
    {
      title: "Balancing Perfectionism and Productivity",
      excerpt:
        "A guide to productive perfectionism and how to balance the pursuit of excellence with getting things done.",
      date: "2024-12-15",
      category: "Productivity",
      slug: "/blog/balancing-perfectionism",
    },
    {
      title: "Video To ASCII Using C++",
      excerpt:
        "A technical deep dive into converting video files to ASCII art using C++ and exploring the intersection of programming and visual art.",
      date: "2024-11-20",
      category: "Development",
      slug: "/blog/video-to-ascii",
    },
  ];

  return (
    <section
      id="blog"
      className="min-h-screen px-6 py-24 md:px-12 lg:px-16 xl:px-24"
    >
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-foreground/60">
          Journal
        </h2>
        <Link
          href="/blog"
          className="group inline-flex items-center text-sm transition-colors hover:text-foreground/80"
        >
          View all
          <Icons.ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="space-y-16">
        {highlightedPosts.map((post, index) => (
          <BlogPostCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
}
