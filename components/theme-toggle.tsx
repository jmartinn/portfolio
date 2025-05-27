"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsTransitioning(true);

    // Add a brief delay to show the transition effect
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleThemeChange}
      className="fixed right-8 top-8 z-40 flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-foreground/30 hover:bg-background/95 active:scale-95"
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <div
        className={`transition-all duration-300 ${isTransitioning ? "rotate-180 scale-75" : "rotate-0 scale-100"}`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

export function ThemeToggleInline() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsTransitioning(true);

    // Add a brief delay to show the transition effect
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleThemeChange}
      className="flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-foreground/30 hover:bg-background/95 active:scale-95"
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <div
        className={`transition-all duration-300 ${isTransitioning ? "rotate-180 scale-75" : "rotate-0 scale-100"}`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
