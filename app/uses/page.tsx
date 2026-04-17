import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools and hardware I use day to day.",
};

export default function UsesPage() {
  return (
    <>
        <section className="mb-12">
          <h1 className="mb-4 font-serif text-2xl font-medium tracking-tight text-foreground">
            Uses
          </h1>
          <p className="text-muted-foreground">
            The tools and hardware I use day to day.
          </p>
        </section>

        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <h2 className="font-serif">Computer / Office</h2>
          <ul>
            <li>
              <strong>Mac Mini (2023)</strong> &mdash; Reliable, compact, and
              powerful for daily development.
            </li>
            <li>
              <strong>27&quot; LG UltraFine 27US500-W</strong> &mdash; Just a
              monitor, nothing fancy.
            </li>
            <li>
              <strong>Logitech Signature M650</strong> &mdash; Silent and
              precise.
            </li>
            <li>
              <strong>Keychron V4 QMK</strong> &mdash; Customizable with a
              tactile mechanical feel.
            </li>
          </ul>

          <h2 className="font-serif">Coding</h2>
          <ul>
            <li>
              <strong>Neovim</strong> (
              <a
                href="https://github.com/jmartinn/dotfiles/tree/main/.config/nvim"
                target="_blank"
                rel="noopener noreferrer"
              >
                Settings / Plugins
              </a>
              ) &mdash; My editor of choice for its speed and versatility.
            </li>
            <li>
              <strong>Theme:</strong>{" "}
              <a
                href="https://github.com/folke/tokyonight.nvim"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tokyo Night
              </a>{" "}
              &mdash; Aesthetic and easy on the eyes theme by the one and only{" "}
              <a
                href="https://github.com/folke"
                target="_blank"
                rel="noopener noreferrer"
              >
                Folke
              </a>
              .
            </li>
            <li>
              <strong>Terminal: Ghostty / zsh</strong> &mdash; For seamless
              terminal work.
            </li>
          </ul>

          <h2 className="font-serif">Audio</h2>
          <ul>
            <li>
              <strong>Sony WH-1000XM4</strong> &mdash; Excellent noise-canceling.
            </li>
          </ul>

          <h2 className="font-serif">Software</h2>

          <h3 className="font-serif">Productivity</h3>
          <ul>
            <li>
              <strong>Obsidian</strong> &mdash; Note-taking and knowledge
              management.
            </li>
            <li>
              <strong>Aerospace</strong> &mdash; Simple yet efficient macOS
              tiling window manager.
            </li>
          </ul>

          <h3 className="font-serif">Development</h3>
          <ul>
            <li>
              <strong>TablePlus</strong> &mdash; Easy database management.
            </li>
            <li>
              <strong>Screen Studio</strong> &mdash; High-quality screen
              recordings for tutorials.
            </li>
          </ul>
        </article>
    </>
  );
}
