"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Icons } from "@/components/ui/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Blog post error:", error);
  }, [error]);

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
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-light md:text-4xl">
            Something went wrong
          </h1>
          <p className="mb-8 text-foreground/80">
            We encountered an error while loading this blog post. This could be
            a temporary issue.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Try again
            </button>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
