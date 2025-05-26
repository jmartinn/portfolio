import Link from "next/link";

import { Icons } from "@/components/ui/icons";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="fixed left-0 top-0 z-40 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 md:px-24">
          <Link href="/blog" className="flex items-center space-x-2">
            <Icons.ArrowLeft className="size-4" />
            <span className="text-sm">Back to journal</span>
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-screen-xl px-6 pt-32 md:px-24">
        <article className="mx-auto max-w-2xl">
          <div className="mb-12">
            <div className="mb-4 flex items-center space-x-4">
              <div className="h-3 w-20 animate-pulse rounded bg-foreground/10"></div>
              <div className="size-1 rounded-full bg-foreground/40"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-foreground/10"></div>
              <div className="size-1 rounded-full bg-foreground/40"></div>
              <div className="h-3 w-12 animate-pulse rounded bg-foreground/10"></div>
            </div>
            <div className="mb-8 space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded bg-foreground/10"></div>
              <div className="h-8 w-1/2 animate-pulse rounded bg-foreground/10"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-foreground/10"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-foreground/10"></div>
            <div className="h-4 w-4/5 animate-pulse rounded bg-foreground/10"></div>
            <div className="h-4 w-full animate-pulse rounded bg-foreground/10"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-foreground/10"></div>
          </div>
        </article>
      </section>
    </div>
  );
}
