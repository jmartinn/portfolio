import Image from "next/image";

import avatar from "@/public/images/avatar.jpeg";

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 md:px-12 lg:px-16 xl:px-24"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="mb-12 text-xs uppercase tracking-widest text-foreground/60">
            About
          </h2>
          <div className="space-y-6 text-sm leading-relaxed md:text-base">
            <p>
              Hola! I&apos;m Juan, a frontend engineer with a deep appreciation
              for well-crafted digital experiences. My journey in software
              development has taught me that the best applications are those
              where robust engineering meets thoughtful design—and I&apos;m
              passionate about building exactly that.
            </p>
            <p>
              With a strong foundation in modern web technologies, I specialize
              in creating performant, accessible, and maintainable applications.
              What sets me apart is my eye for design and user experience,
              allowing me to bridge the gap between technical implementation and
              beautiful, intuitive interfaces.
            </p>
            <p>
              I believe in writing clean, scalable code while never compromising
              on the user experience. Whether it&apos;s optimizing performance,
              implementing complex interactions, or ensuring accessibility
              standards, I approach every project with both technical rigor and
              design sensibility.
            </p>
          </div>
        </div>
        <div className="space-y-12">
          <Image
            src={avatar}
            alt="Juan's Photo"
            width={400}
            height={400}
            className="aspect-square w-full max-w-sm rounded-md object-cover grayscale transition-all duration-300 hover:grayscale-0"
          />
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-widest text-foreground/60">
              Technical Skills
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm md:text-base">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML / CSS</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>Git / GitHub</li>
              <li>Performance Optimization</li>
              <li>Accessibility (a11y)</li>
              <li>Responsive Design</li>
              <li>UI/UX Sensibility</li>
              <li>Design Systems</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs uppercase tracking-widest text-foreground/60">
              Experience
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium md:text-base">
                  Frontend Developer — Interamplify
                </p>
                <p className="text-xs text-foreground/60">May 2022 — Present</p>
              </div>
              <div>
                <p className="text-sm font-medium md:text-base">
                  Frontend Engineer — Strapex
                </p>
                <p className="text-xs text-foreground/60">2024 — Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
