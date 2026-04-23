import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight text-foreground">
          404
        </h1>
        <p className="mb-8 text-muted-foreground">
          This page doesn&apos;t exist. Maybe it never did, or maybe it moved.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-foreground underline decoration-muted underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          <svg
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Go back home
        </Link>
    </div>
  );
}
