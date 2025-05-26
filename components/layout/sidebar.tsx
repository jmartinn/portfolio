"use client";

import Link from "next/link";

interface SidebarNavProps {
  activeSection: string;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  const navItems = ["intro", "about", "work", "blog", "contact"];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col space-y-6 lg:flex xl:left-8 xl:space-y-8">
      {navItems.map((section) => (
        <Link
          key={section}
          href={`#${section}`}
          className={`group relative flex items-center ${
            activeSection === section ? "text-foreground" : "text-foreground/60"
          }`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(section);
          }}
        >
          <span
            className={`mr-3 h-px transition-all duration-300 ${
              activeSection === section
                ? "w-12 bg-foreground"
                : "w-8 bg-foreground/60 group-hover:w-12 group-hover:bg-foreground"
            }`}
          />
          <span className="text-xs font-medium uppercase leading-none tracking-[0.2em]">
            {section}
          </span>
        </Link>
      ))}
    </nav>
  );
}
