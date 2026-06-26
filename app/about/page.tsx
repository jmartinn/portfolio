import type { Metadata } from "next";
import Image from "next/image";

import avatar from "@/public/images/avatar.jpeg";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Juan Pedro Martin — frontend engineer at a startup, based in Spain.",
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

      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <div className="float-right mb-4 ml-6 mt-1 size-32 shrink-0 overflow-hidden rounded-full sm:ml-8 sm:size-48">
          <Image
            alt="Juan Pedro Martin"
            className="size-full scale-[1.4] object-cover"
            src={avatar}
            placeholder="blur"
            width={384}
            height={384}
            priority
          />
        </div>

        <p className="text-lg leading-relaxed">
          Hola, I&apos;m Juan. I&apos;m a frontend engineer based in Spain,
          currently working at a startup.
        </p>

        <p>
          I mostly work with <strong>React</strong>, <strong>Next.js</strong>,
          and <strong>TypeScript</strong>, building things for the web. I like
          when software feels considered&mdash;when someone clearly thought
          about the small things. That&apos;s what I try to do, even if I
          don&apos;t always get it right.
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
          . Or just <a href="mailto:juamp_m@hotmail.com">send me an email</a>.
        </p>
      </article>
    </>
  );
}
