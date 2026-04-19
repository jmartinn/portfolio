import type { ReactNode } from "react";

interface FigureProps {
  children: ReactNode;
  caption?: string;
}

export function Figure({ children, caption }: FigureProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded-lg border border-border bg-muted/10 p-6">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
