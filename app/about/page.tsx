import type { Metadata } from "next";

import { Icons } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Juan Pedro Martin, a frontend engineer passionate about thoughtful design and robust engineering.",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">about me</h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Learn more about my journey, values, and what drives me as an engineer.
      </p>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hola, I&apos;m Juan — a frontend engineer with a deep appreciation for
        thoughtful design and robust engineering.
      </p>
      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          I specialize in building fast, accessible, and maintainable web
          applications using modern tools like <b>React</b>, <b>Next.js</b>,{" "}
          <b>Tailwind</b>, and <b>TypeScript</b>. My work focuses on bridging
          the gap between clean architecture and intuitive, user-centered
          interfaces.
        </p>
        <p>
          What sets me apart is my eye for design and user experience, allowing
          me to bridge the gap between technical implementation and beautiful,
          intuitive interfaces. I believe in writing clean, scalable code while
          never compromising on the user experience.
        </p>
        <p>
          That said, my passion for engineering goes beyond the frontend.
          You&apos;ll just as likely find me building an SDK, designing backend
          infrastructure, or streamlining dev workflows. I enjoy working across
          the stack, especially when the goal is improving clarity, performance,
          and maintainability.
        </p>
        <hr />
        <p>
          Outside of work, I&apos;m guided by values like <b>discipline</b>,{" "}
          <b>curiosity</b>, and <b>faith</b>. I like to push limits—whether
          it&apos;s in the terminal, on the track, or in how I think and learn.
        </p>
        <p>
          I&apos;m also into <b>note-taking systems</b> (Zettelkasten +
          Obsidian), testing new tools, and documenting what I learn. I believe
          in learning by doing, and contributing however I can—through
          open-source, mentoring, or just building things that help others.
        </p>
        <p>
          My goal? Keep refining the craft. Build things that are useful,
          thoughtful, and well-made.
        </p>

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/juampemartin"
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900"
          >
            <div className="flex items-center">
              <Icons.linkedin />
              <div className="ml-3">LinkedIn</div>
            </div>
            <Icons.arrow />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jmartinn"
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900"
          >
            <div className="flex items-center">
              <Icons.github />
              <div className="ml-3">GitHub</div>
            </div>
            <Icons.arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
