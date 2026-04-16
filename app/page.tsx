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
            <Image
              alt="Juan Pedro Martin"
              className="rounded-full transition-transform duration-300 hover:scale-105"
              src={avatar}
              placeholder="blur"
              width={72}
              height={72}
              priority
            />
            <div>
              <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
                Juan Pedro Martin
              </h1>
              <p className="text-muted-foreground">Frontend Engineer</p>
            </div>
          </div>

          <div className="space-y-4 leading-relaxed text-foreground/90">
            <p>
              I&apos;m a frontend engineer who believes great software should feel as
              good as it looks. Currently at{" "}
              <a
                href="https://www.bbva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors duration-200 hover:decoration-accent"
              >
                BBVA
              </a>
              , building accessible, performant web experiences.
            </p>
            <p>
              Beyond the keyboard, I&apos;m driven by discipline, curiosity, and
              faith. I push limits&mdash;on the track, in the terminal, and in
              how I think.
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
                    <h3 className="font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
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
                      className="size-3.5 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
              company="BBVA"
              role="Frontend Engineer"
              period="2025 - Present"
              href="https://www.bbva.com"
            />
            <WorkItem
              company="Interamplify"
              role="Frontend Engineer"
              period="2023 - 2025"
              href="https://interamplify.com"
            />
            <WorkItem
              company="Freelance"
              role="Web Developer"
              period="2021 - 2023"
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
            className="size-3.5 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
