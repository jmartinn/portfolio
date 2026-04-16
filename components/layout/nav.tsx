"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="mb-16 flex items-center justify-between"
    >
      <LayoutGroup>
        <div className="flex items-center gap-0.5">
          {navItems.map(({ path, name }) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "relative px-3 py-1.5 text-sm transition-all duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md bg-foreground/[0.06]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}
        </div>
      </LayoutGroup>
      <ThemeToggle />
    </motion.nav>
  );
}
