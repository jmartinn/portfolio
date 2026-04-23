import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects and experiments — things I build to learn, explore, and have fun.",
};

const projects = [
  {
    title: "Threshold",
    description:
      "A self-hosted web client for my building's Fermax Blue smart intercom. Reverse-engineered over a Saturday.",
    tech: ["TypeScript", "Next.js", "WebRTC", "Socket.IO"],
    status: "in-progress" as const,
  },
  {
    title: "Strapex",
    description:
      "An open-source payment gateway inspired by Stripe. Still early days.",
    tech: ["TypeScript", "Next.js", "PostgreSQL"],
    href: "https://github.com/jmartinn/strapex",
    status: "in-progress" as const,
  },
  {
    title: "Portfolio",
    description:
      "This website. Perpetually being tweaked.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    href: "https://github.com/jmartinn/portfolio",
    status: "active" as const,
  },
  {
    title: "Video to ASCII",
    description:
      "A C++ experiment that converts video frames to ASCII art in real-time. Pure fun.",
    tech: ["C++", "OpenCV"],
    href: "https://github.com/jmartinn/video-to-ascii",
    status: "completed" as const,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="mb-12">
        <h1 className="mb-4 font-serif text-2xl font-medium tracking-tight text-foreground">
          Projects
        </h1>
        <p className="text-muted-foreground">
          Things I&apos;ve built or I&apos;m building. Some are finished, most
          aren&apos;t.
        </p>
      </section>

      <section>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          More projects on{" "}
          <Link
            href="https://github.com/jmartinn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors duration-200 hover:text-foreground hover:decoration-accent"
          >
            GitHub
          </Link>
          .
        </p>
      </section>
    </>
  );
}

function ProjectCard({
  title,
  description,
  tech,
  href,
  status,
}: {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  status: "active" | "in-progress" | "completed";
}) {
  const statusColors = {
    active: "bg-green-500/20 text-green-700 dark:text-green-400",
    "in-progress": "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    completed: "bg-muted text-muted-foreground",
  };

  const statusLabels = {
    active: "Active",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const content = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
            {title}
          </h2>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-foreground/[0.04] px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {href && (
        <div className="flex shrink-0 items-center gap-2 self-start">
          <svg
            aria-hidden="true"
            className="size-4 text-muted opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group -mx-3 block rounded-lg px-3 py-4 transition-colors duration-200 hover:bg-muted/30"
      >
        {content}
      </a>
    );
  }

  return <div className="-mx-3 px-3 py-4">{content}</div>;
}
