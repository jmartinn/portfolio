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
        <span className="not-prose">
          <Badge href="https://interamplify.com">
            <Icons.interamplify />
            Interamplify
          </Badge>
        </span>
        {`, leveraging technologies like `}
        <Badge href="https://react.dev">
          <Image
            alt="React logomark"
            src="/react-logo.svg"
            className="!mr-1"
            width="14"
            height="10"
          />
          React
        </Badge>
        {`, `}
        <Badge href="https://nextjs.org">
          <Image
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Next.js
        </Badge>
        {` or `}
        <Badge href="https://typescriptlang.org">
          <svg
            width="13"
            height="13"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 inline-flex"
          >
            <style>{`.st0{fill:#007acc}.st1{fill:#fff}`}</style>
            <path className="st0" d="M0 200V0h400v400H0" />
            <path
              className="st1"
              d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5 0-.3-31.7-.4-70.2-.4l-70 .3v16.4l-.3-.1zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8 0 .6-17.3 12.3-27.8 18.8-.4.3-2-1.4-3.6-4-5.2-7.4-10.5-10.6-18.8-11.2-12-.8-20 5.5-20 16 0 3.2.6 5 1.8 7.6 2.7 5.5 7.7 8.8 23.2 15.6 28.6 12.3 41 20.4 48.5 32 8.5 13 10.4 33.4 4.7 48.7-6.4 16.7-22 28-44.3 31.7-7 1.2-23 1-30.5-.3-16-3-31.3-11-40.7-21.3-3.7-4-10.8-14.7-10.4-15.4l3.8-2.4 15-8.7 11.3-6.6 2.6 3.5c3.3 5.2 10.7 12.2 15 14.6 13 6.7 30.4 5.8 39-2 3.7-3.4 5.3-7 5.3-12 0-4.6-.7-6.7-3-10.2-3.2-4.4-9.6-8-27.6-16-20.7-8.8-29.5-14.4-37.7-23-4.7-5.2-9-13.3-11-20-1.5-5.8-2-20-.6-25.7 4.3-20 19.4-34 41-38 7-1.4 23.5-.8 30.4 1l-.2.2z"
            />
          </svg>
          TypeScript
        </Badge>
        {` to craft seamless, dynamic web experiences. My goal is to bridge the gap between desisgn and functionality.`}
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
