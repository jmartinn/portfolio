import Image from "next/image";
import Link from "next/link";

import { getBlogPosts } from "@/lib/db/blog";
import avatar from "@/public/images/avatar.jpeg";

export default async function Page() {
  const posts = (await getBlogPosts())
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-5">
          <div className="size-20 shrink-0 overflow-hidden rounded-full transition-transform duration-200 hover:scale-105">
            <Image
              alt="Juan Pedro Martin"
              className="size-full scale-[1.4] object-cover"
              src={avatar}
              placeholder="blur"
              width={160}
              height={160}
              priority
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
              Juan Pedro Martin
            </h1>
            <p className="text-muted-foreground">Frontend Engineer</p>
          </div>
        </div>

        <div className="space-y-4 leading-relaxed text-foreground/90">
          <p>
            I&apos;m a frontend engineer currently working at a startup, mostly
            with React and TypeScript. I care about the details&mdash;how things
            look, how they feel, whether they&apos;re actually pleasant to use.
          </p>
          <p>
            Outside of work, I run, tinker with my Neovim setup, and try to
            write here when I have something worth saying.
          </p>
        </div>
      </section>

      {/* Writing Section */}
      <section className="mb-16">
        <h2 className="mb-6 font-serif text-lg font-medium tracking-tight text-foreground">
          Writing
        </h2>
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group -mx-3 flex rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-muted/30"
            >
              <div className="flex w-full items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                    {post.metadata.title}
                  </h3>
                  {post.metadata.summary && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm text-muted">
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <svg
                    aria-hidden="true"
                    className="size-3.5 text-muted opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="group mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <span>View all posts</span>
          <svg
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </section>

      {/* Work Section */}
      <section>
        <h2 className="mb-6 font-serif text-lg font-medium tracking-tight text-foreground">
          Work
        </h2>
        <div className="space-y-1">
          <WorkItem
            company="Startup"
            role="Frontend Engineer"
            period="2026 - Present"
          />
          <WorkItem
            company="BBVA"
            role="Frontend Engineer"
            period="2026"
            href="https://www.bbva.com"
          />
          <WorkItem
            company="Interamplify"
            role="Frontend Engineer"
            period="2022 - 2026"
            href="https://interamplify.com"
          />
        </div>
      </section>
    </>
  );
}

function WorkItem({
  company,
  role,
  period,
  href,
}: {
  company: string;
  role: string;
  period: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
          {company}
        </h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm text-muted">{period}</span>
        {href && (
          <svg
            aria-hidden="true"
            className="size-3.5 text-muted opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group -mx-3 block rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-muted/30"
      >
        {content}
      </a>
    );
  }

  return <div className="-mx-3 px-3 py-3">{content}</div>;
}
