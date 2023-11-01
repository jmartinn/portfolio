import Image from "next/image";
import {
  ArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./components/icons";
import { bio, avatar } from "lib/info";
import { Suspense } from "react";
import { BlogLink } from "./components/blog-link";

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        hey, I'm Juan 👋
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
            className="flex items-center gap-2 dark:hover:text-neutral-200"
          >
            <TwitterIcon />
          </a>
          <a
            className="flex items-center gap-2 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/juampemartin/"
          >
            <LinkedInIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jmartinn"
            className="flex items-center gap-2 dark:hover:text-neutral-200"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
      {bio()}
      <div className="prose prose-neutral dark:prose-invert text-justify">
        <p>
          Apart from coding, I have a passion for sports and bring my optimism
          and discipline into every project I take on.
        </p>
        <blockquote className="font-semibold">
          I firmly believe that developers are akin to poets, scripting the
          world's most impactful language - the language of machines.
        </blockquote>
        <p>
          I'm always eager to connect and collaborate on interesting projects,
          while consistently learning and growing in this ever-evolving tech
          industry.
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          <BlogLink name="Video To ASCII Using C++" slug="video-to-ascii" />
          <BlogLink
            name="The Importance of Clean Code in Software"
            slug="clean-code"
          />
        </Suspense>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/juamp_m"
          >
            <ArrowIcon />
            <p className="h-7">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:juamp_m@hotmail.com"
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <p className="h-7">send me an email</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
