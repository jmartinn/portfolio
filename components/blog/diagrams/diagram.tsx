"use client";

import { useEffect, useRef } from "react";

import { stage } from "./stage";

interface DiagramProps {
  children: React.ReactNode;
  /** Annotation rendered below the SVG in the shared diagram voice. */
  note?: string;
}

/**
 * Shared wrapper for hand-built blog diagrams. Watches the viewport and
 * flips `data-dg` from "ready" to "in" once, letting the CSS diagram
 * system (see globals.css) choreograph the build-in. The attribute is set
 * imperatively, so server HTML (and no-JS visitors) never hide anything.
 */
export function Diagram({ children, note }: DiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.dg = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.dg = "in";
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {children}
      {note && (
        <p
          className="dg-fade mx-auto mt-2 max-w-lg text-center font-hand text-[1.05rem] leading-snug text-muted-foreground"
          style={{ ...stage(9), rotate: "-0.7deg" }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
