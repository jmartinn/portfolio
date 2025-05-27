import type { Metadata } from "next";

import { WorkCard } from "./card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Here are some of my projects that I've built within the past years",
};

export default function WorkPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        take a look at my work so far
      </h1>
      <WorkCard
        title="Strapex"
        description="An open-source, Stripe inspired payment gateway which aims to democratize payments among users"
        image=""
      />
    </section>
  );
}
