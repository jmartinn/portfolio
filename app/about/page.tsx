import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import avatar from "@/public/images/avatar.jpeg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Juan Pedro Martin, a frontend engineer passionate about thoughtful design and robust engineering.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mb-12">
          <h1 className="mb-4 font-serif text-2xl font-medium tracking-tight text-foreground">
            About
          </h1>
          <p className="text-muted-foreground">
            A bit more about who I am and what drives me.
          </p>
        </section>

        <div className="mb-12 flex justify-center">
          <Image
            alt="Juan Pedro Martin"
            className="rounded-xl"
            src={avatar}
            placeholder="blur"
            width={280}
            height={280}
            priority
          />
        </div>

        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            Hola, I&apos;m Juan&mdash;a frontend engineer with a deep
            appreciation for thoughtful design and robust engineering.
          </p>

          <p>
            I specialize in building fast, accessible, and maintainable web
            applications using modern tools like <strong>React</strong>,{" "}
            <strong>Next.js</strong>, <strong>Tailwind</strong>, and{" "}
            <strong>TypeScript</strong>. My work focuses on bridging the gap
            between clean architecture and intuitive, user-centered interfaces.
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

          <h2 className="font-serif">Beyond Code</h2>

          <p>
            Outside of work, I&apos;m guided by values like{" "}
            <strong>discipline</strong>, <strong>curiosity</strong>, and{" "}
            <strong>faith</strong>. I like to push limits&mdash;whether it&apos;s
            in the terminal, on the track, or in how I think and learn.
          </p>

          <p>
            I&apos;m also into <strong>note-taking systems</strong> (Zettelkasten
            + Obsidian), testing new tools, and documenting what I learn. I
            believe in learning by doing, and contributing however I can&mdash;
            through open-source, mentoring, or just building things that help
            others.
          </p>

          <blockquote>
            My goal? Keep refining the craft. Build things that are useful,
            thoughtful, and well-made.
          </blockquote>

          <hr />

          <h2 className="font-serif">Connect</h2>

          <p>
            I&apos;m always open to meaningful collaborations and conversations.
            You can find me on{" "}
            <a
              href="https://github.com/jmartinn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href="https://linkedin.com/in/jmartinn"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            , or{" "}
            <a
              href="https://x.com/jmartinn07"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            . Or just{" "}
            <a href="mailto:juamp_m@hotmail.com">send me an email</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
