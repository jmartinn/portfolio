"use client";

import { useRef, useState } from "react";

import { play } from "cuelume";
import { AnimatePresence, motion } from "motion/react";

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const transition = { duration: 0.15, ease: [0.25, 0.4, 0.25, 1] } as const;

export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    play("success");
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mb-4 mt-6">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code]:font-normal"
        {...props}
      />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute right-2 top-2 flex size-7 items-center justify-center rounded-md border bg-muted",
          "text-muted-foreground transition-[color,opacity] duration-200 hover:text-foreground",
          "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={transition}
            >
              <Icons.check className="size-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="clipboard"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={transition}
            >
              <Icons.clipboard className="size-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
