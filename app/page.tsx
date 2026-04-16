import Image from "next/image";
import Link from "next/link";

import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/animate-in";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
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
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="mb-16">
          <AnimateIn>
            <div className="mb-8 flex items-center gap-5">
              <div className="avatar-glow rounded-full">
                <Image
                  alt="Juan Pedro Martin"
                  className="rounded-full transition-transform duration-300 hover:scale-105"
                  src={avatar}
                  placeholder="blur"
                  width={72}
                  height={72}
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
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                I&apos;m a frontend engineer who believes great software should feel as
                good as it looks. Currently at{" "}
                <a
                  href="https://interamplify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover font-medium text-foreground"
                >
                  Interamplify
                </a>
                , building accessible, performant web experiences.
              </p>
              <p>
                Beyond the keyboard, I&apos;m driven by discipline, curiosity, and
                faith. I push limits&mdash;on the track, in the terminal, and in
                how I think.
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Writing Section */}
        <AnimateIn delay={0.2}>
          <section className="mb-16">
            <h2 className="mb-6 font-serif text-lg font-medium tracking-tight text-foreground">
              Writing
            </h2>
            <StaggerContainer className="flex flex-col gap-1">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group -mx-3 flex rounded-lg px-3 py-3 transition-all duration-200 hover:bg-foreground/[0.03]"
                  >
                    <div className="flex w-full items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                          {post.metadata.title}
                        </h3>
                        {post.metadata.summary && (
                          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">
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
                          className="arrow-slide size-3.5 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
                </StaggerItem>
              ))}
            </StaggerContainer>
            <Link
              href="/blog"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <span>View all posts</span>
              <svg
                className="arrow-slide size-3.5"
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
        </AnimateIn>

        {/* Work Section */}
        <AnimateIn delay={0.3}>
          <section>
            <h2 className="mb-6 font-serif text-lg font-medium tracking-tight text-foreground">
              Work
            </h2>
            <StaggerContainer className="space-y-1">
              <StaggerItem>
                <WorkItem
                  company="Interamplify"
                  role="Frontend Engineer"
                  period="2023 - Present"
                  href="https://interamplify.com"
                />
              </StaggerItem>
              <StaggerItem>
                <WorkItem
                  company="Freelance"
                  role="Web Developer"
                  period="2021 - 2023"
                />
              </StaggerItem>
            </StaggerContainer>
          </section>
        </AnimateIn>
      </main>
      <Footer />
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
            className="arrow-slide size-3.5 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
        className="group -mx-3 block rounded-lg px-3 py-3 transition-all duration-200 hover:bg-foreground/[0.03]"
      >
        {content}
      </a>
    );
  }

  return <div className="-mx-3 px-3 py-3">{content}</div>;
}
