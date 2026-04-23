"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  text: string;
}

export function ScrollMarkers() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article.prose");
    if (!article) return;

    const headings = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2[id]")
    );
    if (headings.length === 0) return;

    setSections(
      headings.map((h) => ({
        id: h.id,
        text: (h.textContent ?? "").trim(),
      }))
    );

    let rafId = 0;
    const update = () => {
      const trigger = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top < trigger) {
          current = h.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (sections.length === 0) return null;

  const activeIndex = activeId
    ? sections.findIndex((s) => s.id === activeId)
    : -1;

  return (
    <nav
      aria-label="Sections on this page"
      className="pointer-events-none fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3.5">
        {sections.map((s, i) => {
          const isActive = i === activeIndex;
          const isPassed = activeIndex > -1 && i < activeIndex;

          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(s.id);
                  if (!el) return;
                  const prefersReduced = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                  ).matches;
                  el.scrollIntoView({
                    behavior: prefersReduced ? "auto" : "smooth",
                    block: "start",
                  });
                  history.replaceState(null, "", `#${s.id}`);
                }}
                aria-label={`Jump to: ${s.text}`}
                className="group/tick pointer-events-auto flex items-center gap-3 py-1.5"
              >
                <span className="-translate-x-1 whitespace-nowrap text-xs text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover/tick:translate-x-0 group-hover/tick:opacity-100">
                  {s.text}
                </span>
                <span
                  className={`block h-px transition-[width,background-color] duration-300 ease-out group-hover/tick:w-8 group-hover/tick:bg-foreground ${
                    isActive
                      ? "w-7 bg-foreground"
                      : isPassed
                        ? "w-3 bg-muted-foreground/50"
                        : "w-3 bg-muted/70"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
