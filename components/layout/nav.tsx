"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Signature } from "@/components/layout/signature";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  const linkItems = navItems.filter((item) => item.path !== "/");

  return (
    <nav
      className="mb-16 flex items-center justify-between"
      style={{ viewTransitionName: "site-nav" }}
    >
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center text-foreground transition-colors duration-200 hover:text-accent"
        >
          <Signature />
        </Link>
        <LayoutGroup>
          <div className="flex items-center gap-0.5">
            {linkItems.map(({ path, name }) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "relative px-3 py-1.5 text-sm transition-colors duration-200",
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
                        duration: 0.35,
                        bounce: 0.15,
                      }}
                    />
                  )}
                  <span className="relative z-10">{name}</span>
                </Link>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
      <ThemeToggle />
    </nav>
  );
}
