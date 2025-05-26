import { Suspense } from "react";

import Link from "next/link";

import { Icons } from "@/components/ui/icons";

import ViewCounter from "./view-counter";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  allViews?: { slug: string; count: number }[];
}

export function BlogPostCard({
  title,
  excerpt,
  date,
  category,
  slug,
  allViews = [],
}: BlogPostCardProps) {
  return (
    <article className="group">
      <Link href={slug} className="block">
        <div className="flex items-start justify-between gap-8">
          <div className="max-w-4xl flex-1">
            <div className="mb-2 flex items-center space-x-4 text-xs text-foreground/60">
              <span>{date}</span>
              <span className="size-1 rounded-full bg-foreground/40"></span>
              <span>{category}</span>
              <span className="size-1 rounded-full bg-foreground/40"></span>
              <Suspense fallback={<span>--- views</span>}>
                <ViewCounter
                  slug={slug.replace("/blog/", "")}
                  allViews={allViews}
                />
              </Suspense>
            </div>
            <h3 className="mb-2 text-xl font-light transition-colors group-hover:text-foreground/80 md:text-2xl lg:text-3xl">
              {title}
            </h3>
            <p className="max-w-2xl text-sm text-foreground/80 md:text-base">
              {excerpt}
            </p>
          </div>
          <div className="shrink-0 pt-9">
            <Icons.ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
