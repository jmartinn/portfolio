import { NowPlaying } from "@/components/now-playing";

const links = [
  { href: "https://github.com/jmartinn", label: "github" },
  { href: "https://x.com/jmartinn07", label: "twitter" },
  { href: "https://linkedin.com/in/jmartinn", label: "linkedin" },
  { href: "mailto:juamp_m@hotmail.com", label: "email" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8">
      <div className="flex flex-col gap-6">
        <NowPlaying />
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <span>{label}</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted">
          {new Date().getFullYear()} Juan Pedro Martin
        </p>
      </div>
    </footer>
  );
}
