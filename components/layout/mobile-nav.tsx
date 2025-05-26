"use client";

import Link from "next/link";

interface MobileNavProps {
  activeSection: string;
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const navItems = ["intro", "about", "work", "blog", "contact"];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 backdrop-blur-sm lg:hidden">
      <div className="flex justify-around py-3">
        {navItems.map((section) => (
          <Link
            key={section}
            href={`#${section}`}
            className={`text-xs uppercase tracking-wider transition-colors ${
              activeSection === section
                ? "text-foreground"
                : "text-foreground/60"
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(section);
            }}
          >
            {section}
          </Link>
        ))}
      </div>
    </div>
  );
}
