import Image from "next/image";

import { BlogLink } from "@/components/blog/blog-post-card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import avatar from "@/public/images/avatar.jpeg";

export default function Page() {
  return (
    <section>
      <h1 className="group mb-8 text-2xl font-semibold tracking-tighter">
        hey, I&apos;m Juan{" "}
        <span className="inline-block origin-[70%_70%] transition-transform group-hover:animate-waving-hand">
          👋
        </span>
      </h1>

      <div className="my-8 flex items-center justify-start space-x-6 md:space-x-8">
        <Image
          alt="Juan Pedro Martin"
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="flex flex-col space-y-3 text-neutral-500 dark:text-neutral-400">
          <a
            rel="noopener noreferrer"
            aria-label="Twitter"
            target="_blank"
            href="https://x.com/jmartinn07"
            className="flex items-center gap-2 transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Icons.twitter />
          </a>
          <a
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            target="_blank"
            href="https://www.linkedin.com/in/juampemartin/"
            className="flex items-center gap-2 transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Icons.linkedin />
          </a>
          <a
            rel="noopener noreferrer"
            aria-label="GitHub"
            target="_blank"
            href="https://github.com/jmartinn"
            className="flex items-center gap-2 transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Icons.github />
          </a>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I&apos;m a frontend engineer currently working at{" "}
          <Badge href="https://interamplify.com">
            <Icons.interamplify />
            Interamplify
          </Badge>
          , where I craft performant, accessible, and beautifully designed web
          experiences using technologies like{" "}
          <Badge href="https://react.dev">
            <Image
              alt="React logomark"
              src="/react-logo.svg"
              className="!mr-1 inline-block align-middle"
              height="16"
              width="16"
            />
            React
          </Badge>
          ,{" "}
          <Badge href="https://nextjs.org">
            <Image
              alt="Next.js logomark"
              src="/next-logo.svg"
              className="!mr-1 inline-block align-middle"
              width="16"
              height="16"
            />
            Next.js
          </Badge>
          , and{" "}
          <Badge href="https://typescriptlang.org">
            <Image
              alt="TypeScript logomark"
              src="/typescript-logo.svg"
              className="!mr-1 inline-block align-middle"
              width="16"
              height="16"
            />
            TypeScript
          </Badge>
          . My focus is bridging the gap between robust engineering and
          thoughtful design—building interfaces that feel as good as they look.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Beyond the keyboard, I&apos;m a sports enthusiast who thrives on
          pushing limits—whether on the track or in tech. Discipline and
          optimism guide how I work and live.
        </p>
        <blockquote className="font-semibold">
          I believe great software is built with precision, creativity, and
          care. It&apos;s more than functionality; it&apos;s an experience.
        </blockquote>
        <p>
          I&apos;m always open to meaningful collaborations and side projects,
          especially those that challenge convention and push craft forward.
          I&apos;m constantly learning, refining, and exploring the intersection
          of engineering and design.
        </p>
      </div>

      <div className="my-8 flex w-full flex-col space-y-4">
        <BlogLink
          name="A Guide to Productive Perfectionism"
          slug="balancing-perfectionism"
          summary="A front-end developer's journey in harnessing perfectionism's power while avoiding its pitfalls."
        />
        <BlogLink
          name="Video To ASCII Using C++"
          slug="video-to-ascii"
          summary="A journey into creating a C++ application that transforms videos into mesmerizing ASCII art in real-time."
        />
      </div>
    </section>
  );
}
