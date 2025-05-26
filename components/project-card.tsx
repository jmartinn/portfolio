import { Icons } from "@/components/ui/icons";

interface ProjectItemProps {
  title: string;
  description: string;
  tags: string[];
  year: string;
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectItem({
  title,
  description,
  tags,
  year,
  githubUrl,
  liveUrl,
}: ProjectItemProps) {
  return (
    <article className="group">
      <div className="grid gap-4 md:grid-cols-[2fr,1fr] md:gap-8">
        <div>
          <h4 className="mb-2 text-xl font-light md:text-2xl">{title}</h4>
          <p className="mb-4 text-sm text-foreground/80 md:text-base">
            {description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground/80"
              >
                <Icons.GitHub className="size-4" />
                View Code
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground/80"
              >
                <Icons.ExternalLink className="size-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
        <div className="flex items-start justify-start md:justify-end">
          <span className="text-sm text-foreground/60">{year}</span>
        </div>
      </div>
    </article>
  );
}
