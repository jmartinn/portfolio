import type { ReactNode } from "react";

interface FigureProps {
  children: ReactNode;
  caption?: string;
}

export function Figure({ children, caption }: FigureProps) {
  return (
    <figure className="not-prose my-8">
      {/* Centered flex row: a lone figure sits centered, siblings pair up
          side by side. `nowrap` keeps a pair paired on narrow screens —
          flexbox would otherwise wrap them to a tall stack instead of
          shrinking them, which is the opposite of what small shots are for. */}
      <div className="flex flex-nowrap items-start justify-center gap-3 rounded-lg border border-border bg-muted/10 p-3 sm:gap-4 sm:p-6">
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
