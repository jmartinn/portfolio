"use client";

import { useEffect, useRef, useState } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarNav } from "@/components/layout/sidebar";
import { AboutSection } from "@/components/sections/about";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { WorkSection } from "@/components/sections/work";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <SidebarNav activeSection={activeSection} />
      <MobileNav activeSection={activeSection} />

      <div className="relative mx-auto max-w-screen-xl lg:pl-32 xl:pl-40">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <BlogSection />
        <ContactSection />
      </div>
    </div>
  );
}
