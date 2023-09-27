import type { Metadata } from "next";

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
        Take a look at my projects
      </h1>
      <p>
        🚧 Whoops! This part of the sidewalk is under construction 🚧 <br />
        Take a coffe and come back later! ☕️
      </p>
    </section>
  );
}
