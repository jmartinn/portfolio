import { Suspense } from "react";

import Image from "next/image";

import ViewCounter from "app/blog/view-counter";
import { getViewsCount } from "app/db/actions";
import { Icons } from "components/icons";
import { Badge } from "components/ui/badge";
import avatar from "public/images/avatar.jpeg";

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

async function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="border transition-all border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-neutral-300 hover:bg-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-700 rounded flex items-center justify-between px-3 py-4 w-full"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <Icons.arrow />
        </div>
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        hey, I&apos;m Juan 👋
      </h1>
      <div className="flex items-center justify-start my-8 space-x-6 md:space-x-8">
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
            target="_blank"
            href="https://twitter.com/juamp_m"
            className="flex items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Icons.twitter />
          </a>
          <a
            className="flex items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/juampemartin/"
          >
            <Icons.linkedin />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jmartinn"
            className="flex items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Icons.github />
          </a>
        </div>
      </div>

      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a frontend developer, sport enthusiast, and an optimist at heart. I currently
        work as Frontend Developer at `}
        <span className="not-prose">
          <Badge href="https://interamplify.com">
            <Icons.interamplify />
            Interamplify
          </Badge>
        </span>
        {`, where I leverage technologies like `}
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
            className="inline-flex mr-1"
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
        {` to create and enhance dynamic web experiences.`}
      </p>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Apart from coding, I have a passion for sports and bring my optimism
          and discipline into every project I take on.
        </p>
        <blockquote className="font-semibold">
          I firmly believe that developers are akin to poets, scripting the
          world&apos;s most impactful language - the language of machines.
        </blockquote>
        <p>
          I&apos;m always eager to connect and collaborate on interesting
          projects, while consistently learning and growing in this
          ever-evolving tech industry.
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          <BlogLink name="Video To ASCII Using C++" slug="video-to-ascii" />
          <BlogLink
            name="Advent Of Code Day 2: Cube Conundrum"
            slug="advent-of-code-day-2"
          />
        </Suspense>
      </div>
    </section>
  );
}
