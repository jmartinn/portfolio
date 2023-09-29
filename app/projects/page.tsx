import type { Metadata } from "next";

// import { ProjectCard } from "app/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Here are some of my projects that I've built within the past years",
  alternates: {
    canonical: "https://jmartinn.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        take a look at my projects
      </h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          title="Video To ASCII"
          description="Generate ASCII art from a video using C++ and OpenCV"
          link={"https://github.com/jmartinn/vid-to-ascii"}
        />
        <ProjectCard
          title="Video To ASCII"
          description="Generate ASCII art from a video using C++ and OpenCV"
          link={"https://github.com/jmartinn/vid-to-ascii"}
        />
        <ProjectCard
          title="Video To ASCII"
          description="Generate ASCII art from a video using C++ and OpenCV"
          link={"https://github.com/jmartinn/vid-to-ascii"}
        />
        <ProjectCard
          title="Video To ASCII"
          description="Generate ASCII art from a video using C++ and OpenCV"
          link={"https://github.com/jmartinn/vid-to-ascii"}
        />
      </div> */}
    </section>
  );
}
