import type { Metadata } from "next";
import Image from "next/image";

import avatar from "@/public/images/avatar.jpeg";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Juan Pedro Martin — frontend engineer at BBVA, based in Spain.",
};

export default function AboutPage() {
  return (
    <>
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
            className="rounded-xl transition-transform duration-300 hover:scale-[1.02]"
            src={avatar}
            placeholder="blur"
            width={280}
            height={280}
            priority
          />
        </div>

        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            Hola, I&apos;m Juan. I&apos;m a frontend engineer based in Spain,
            currently working at <strong>BBVA</strong>.
          </p>

          <p>
            I mostly work with <strong>React</strong>,{" "}
            <strong>Next.js</strong>, and <strong>TypeScript</strong>, building
            things for the web. I like when software feels considered&mdash;when
            someone clearly thought about the small things. That&apos;s what I
            try to do, even if I don&apos;t always get it right.
          </p>

          <p>
            I&apos;m not strictly a frontend person, though. I enjoy working
            across the stack&mdash;building APIs, setting up infrastructure,
            improving how a team ships code. I like understanding how things work
            end to end.
          </p>

          <hr />

          <h2 className="font-serif">Beyond Code</h2>

          <p>
            I run, take notes in <strong>Obsidian</strong>, and try to learn
            something new most days. My faith matters to me. So does showing up
            consistently and doing good work, even when nobody&apos;s watching.
          </p>

          <hr />

          <h2 className="font-serif">Connect</h2>

          <p>
            I&apos;m always happy to chat. You can find me on{" "}
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
    </>
  );
}
