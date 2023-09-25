import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Here are some of my projects that I've built within the past years",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        Takea look at my projects
      </h1>
      <p>
        🚧 Whoops! This part of the sidewalk is under construction 🚧 <br />
        Take a coffe and come back later! ☕️
      </p>
    </section>
  );
}
