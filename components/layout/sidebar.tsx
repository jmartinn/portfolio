"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

/**
 * Sidebar navigation component with smooth animated active indicator.
 * Uses Framer Motion's LayoutGroup for shared layout animations.
 * The active link background smoothly transitions between navigation items.
 * Responsive: horizontal on mobile, vertical/sticky on desktop.
 *
 * @returns Navigation sidebar with animated active state
 */
export function Sidebar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <aside className="-mx-4 overflow-y-hidden md:sticky md:top-1 md:mx-0 md:h-fit md:w-[150px] md:shrink-0 md:px-0">
      <div>
        <LayoutGroup>
          <nav
            className="relative flex flex-row items-start px-4 pb-0 md:relative md:flex-col md:overflow-auto md:px-0 md:pt-14"
            id="nav"
          >
            <div className="my-2 flex flex-row space-x-0 pr-10 md:mt-0 md:flex-col">
              {navItems.map(({ path, name }) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cn(
                      "flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                      {
                        "text-neutral-500": !isActive,
                        "font-bold": isActive,
                      }
                    )}
                  >
                    <span className="relative px-[10px] py-[5px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 z-[-1] rounded-md bg-neutral-100 dark:bg-neutral-800"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
