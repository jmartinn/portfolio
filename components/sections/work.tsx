import { ProjectItem } from "../project-card";

export function WorkSection() {
  return (
    <section
      id="work"
      className="min-h-screen px-6 py-24 md:px-12 lg:px-16 xl:px-24"
    >
      <div className="mb-16">
        <h2 className="mb-4 text-xs uppercase tracking-widest text-foreground/60">
          Work
        </h2>
        <h3 className="mb-4 text-3xl font-light md:text-4xl">
          Selected Projects
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
          A collection of projects I&apos;ve built, ranging from open-source
          contributions to personal experiments with modern web technologies.
        </p>
      </div>

      <div className="space-y-16">
        <ProjectItem
          title="Strapex"
          description="Currently building an exciting open-source project with a friend. This has been our main focus for the past few months, combining modern web technologies with thoughtful user experience design."
          tags={["React", "TypeScript", "Next.js", "Tailwind CSS"]}
          year="2024"
          githubUrl="https://github.com/strapexlabs/strapex"
          liveUrl="https://strapex.com"
        />

        <div className="border-t border-foreground/10 pt-16">
          <h4 className="mb-4 text-xl font-light">Professional Work</h4>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
            Most of my recent work has been in professional settings, building
            production applications and contributing to large-scale projects.
            While I can&apos;t showcase proprietary work, I&apos;m always happy
            to discuss the technical challenges I&apos;ve solved and the
            approaches I&apos;ve taken.
          </p>
        </div>
      </div>
    </section>
  );
}
