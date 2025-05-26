"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { Icons } from "../ui/icons";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24 md:items-start md:px-12 lg:px-16 xl:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "tween",
          delay: 0.2,
        }}
        className="motion-element max-w-2xl"
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <motion.h1
          className="mb-8 text-3xl font-light leading-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3,
          }}
        >
          <span className="block">Juan, Frontend Engineer</span>
          <span className="mt-4 block text-lg font-extralight text-foreground/70 md:text-xl lg:text-2xl">
            Building performant, beautiful web applications
          </span>
        </motion.h1>
        <motion.p
          className="mb-8 max-w-md text-sm leading-relaxed text-foreground/80 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.5,
          }}
        >
          I&apos;m Juan, a frontend engineer from Spain who&apos;s passionate
          about building fast, accessible, and beautifully crafted web
          applications. I believe great engineering and thoughtful design go
          hand in hand.
        </motion.p>
        <motion.div
          className="group inline-flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.7,
          }}
        >
          <Link
            href="#work"
            className="text-sm uppercase tracking-widest transition-colors hover:text-foreground/80"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("work");
            }}
          >
            View work
          </Link>
          <Icons.ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}
