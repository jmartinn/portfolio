import type { Metadata } from "next";

import { Icons } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description: "VP of Developer Experience at Vercel.",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">about me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I&apos;m Juan, a passionate <b>frontend developer</b> and tech
        enthusiast.
      </p>
      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          I specialize in building{" "}
          <b>responsive, accessible, and dynamic web applications</b> using
          tools like <b>React</b>, <b>Tailwind</b>, <b>Next.js</b>, and{" "}
          <b>TypeScript</b>. I thrive on turning designs into seamless user
          experiences, with a strong focus on <b>scalability</b> and{" "}
          <b>performance</b>.
        </p>
        <p>
          What sets me apart is my dedication to{" "}
          <b>clean code, attention to detail</b>, and a drive to{" "}
          <b>always learn</b>. Whether it&apos;s solving tricky bugs or pushing
          for better UX, I see coding as more than work—it&apos;s a{" "}
          <b>creative craft</b>.
        </p>
        <hr />
        <p>
          Outside of coding, I&apos;m a believer in the values of{" "}
          <b>discipline</b>, <b>optimism</b>, and faith. I strive to balance
          pushing limits—whether in tech or sports—with gratitude and humility.
        </p>
        <p>
          I&apos;m also passionate about <b>note-taking systems</b> (hello
          Obsidian and Zettelkasten), experimenting with <b>new tools</b>, and
          sharing my findings with others. I believe in learning by doing and
          contributing wherever I can, whether that’s through <b>open-source</b>{" "}
          contributions or helping others grow.
        </p>
        <p>
          My career goal is simple: to <b>create meaningful experiences</b> on
          the web while continuously improving my craft. If that resonates, feel
          free to connect—we can build something <b>awesome</b> together.
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
