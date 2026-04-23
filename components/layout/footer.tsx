import { NowPlaying } from "@/components/now-playing";

const links = [
  { href: "https://github.com/jmartinn", label: "GitHub" },
  { href: "https://x.com/jmartinn07", label: "Twitter" },
  { href: "https://linkedin.com/in/jmartinn", label: "LinkedIn" },
  { href: "mailto:juamp_m@hotmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8" style={{ viewTransitionName: "site-footer" }}>
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
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
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
