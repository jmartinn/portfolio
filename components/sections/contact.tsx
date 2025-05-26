import { Icons } from "@/components/ui/icons";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-24 md:px-12 lg:px-16 xl:px-24"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="mb-12 text-xs uppercase tracking-widest text-foreground/60">
            Contact
          </h2>
          <h3 className="mb-6 text-3xl font-light md:text-4xl">
            Let&apos;s connect
          </h3>
          <p className="mb-12 max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
            I&apos;m currently focused on my full-time role, but I&apos;m always
            open to interesting conversations about frontend engineering,
            design, and building great web experiences. Feel free to reach out!
          </p>
          <div className="space-y-4">
            <a
              href="mailto:hello@jmartinn.com"
              className="group inline-flex items-center text-sm transition-colors hover:text-foreground/80"
            >
              juamp_m@hotmail.com
              <Icons.ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="pt-8">
              <h4 className="mb-4 text-xs uppercase tracking-widest text-foreground/60">
                Elsewhere
              </h4>
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com/jmartinn"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-foreground/80"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com/in/jmartinn"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-foreground/80"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/jmartinn"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-foreground/80"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="h-px w-full bg-foreground/10" />
        </div>
      </div>
    </section>
  );
}
