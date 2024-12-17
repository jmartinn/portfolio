import { Suspense } from "react";

import Image from "next/image";

import ViewCounter from "@/components/blog/view-counter";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { getViewsCount } from "@/lib/db/actions";
import avatar from "@/public/images/avatar.jpeg";

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

async function BlogLink({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 transition-all hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-5" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <Icons.arrow />
        </div>
      </a>
    </div>
  );
}

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

      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a frontend developer currently working at `}
        <Badge href="https://interamplify.com">
          <Icons.interamplify />
          Interamplify
        </Badge>
        {`, leveraging technologies like `}
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
        {`, `}
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
        {` or `}
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
        {` to craft seamless, dynamic web experiences. My goal is to bridge the gap between design and functionality.`}
      </p>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Beyond the keyboard, I&apos;m a sports enthusiast with a passion for
          pushing limits—whether it’s on the track or in the tech world.
          Discipline and optimism guide me in every project.
        </p>
        <blockquote className="font-semibold">
          I believe great software is built with precision, creativity, and
          care. It&apos;s more than functionality; it&apos;s an experience.
        </blockquote>
        <p>
          I&apos;m always eager to connect and collaborate on interesting
          projects, while consistently learning and growing in the ever-evolving
          tech industry.
        </p>
      </div>
      <div className="my-8 flex w-full flex-col space-y-4">
        <Suspense>
          <BlogLink
            name="A Guide to Productive Perfectionism"
            slug="balancing-perfectionism"
          />
          <BlogLink name="Video To ASCII Using C++" slug="video-to-ascii" />
        </Suspense>
      </div>
    </section>
  );
}
