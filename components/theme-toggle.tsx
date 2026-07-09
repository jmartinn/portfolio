"use client";

import { useSyncExternalStore } from "react";

import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

// `false` on the server, `true` after hydration — a mounted flag without setState-in-effect.
const subscribe = () => () => {};

// Cycle order: follow the OS, then pin light, then pin dark, then back to OS.
const THEMES = ["system", "light", "dark"] as const;

const transition = { duration: 0.2, ease: [0.25, 0.4, 0.25, 1] } as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="size-8" />;
  }

  const current = (
    THEMES.includes(theme as (typeof THEMES)[number]) ? theme : "system"
  ) as (typeof THEMES)[number];
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];

  return (
    <motion.button
      onClick={() => setTheme(next)}
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md",
        "text-muted-foreground transition-colors duration-200 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Theme: ${current}. Switch to ${next} mode.`}
      title={`Theme: ${current}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {current === "dark" ? (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
            transition={transition}
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : current === "light" ? (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
            transition={transition}
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        ) : (
          <motion.svg
            key="system"
            initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
            transition={transition}
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
