import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Here's what tech I'm currently using for coding, working, and music.",
};

export default function UsesPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        here&apos;s what I use on a daily basis
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="computer-office">Computer / Office</h3>
        <ul>
          <li>
            <strong>Mac Mini (2023)</strong> - Reliable, compact, and powerful
            for daily development.
          </li>
          <li>
            <strong>24&quot; LG 24MP400-B</strong> - Just a monitor, nothing
            fancy.
          </li>
          <li>
            <strong>Logitech Signature M650</strong> - Silent and precise.
          </li>
          <li>
            <strong>Keychron V4 QMK</strong> - Customizable with a tactile
            mechanical feel.
          </li>
        </ul>
        <h3 id="coding">Coding</h3>
        <ul>
          <li>
            <strong>Neovim</strong> (
            <a
              href="https://github.com/jmartinn/dotfiles/tree/main/.config/nvim"
              target="_blank"
            >
              Settings / Plugins
            </a>
            ) - My editor of choice for it&apos;s speed and versatility.
          </li>
          <li>
            <strong>Theme:</strong>{" "}
            <a href="https://github.com/folke/tokyonight.nvim">Tokyo Night</a>-
            Aesthetic and easy on the eyes theme by the one and only{" "}
            <a href="https://github.com/folke">Folke.</a>
          </li>
          <li>
            <strong>Terminal: WezTerm / zsh</strong> - For seamless terminal
            work.
          </li>
        </ul>
        <h3 id="audio">Audio</h3>
        <ul>
          <li>
            <strong>Sony WH-1000XM4</strong> - Excellent noise-canceling.
          </li>
        </ul>
        <h3 id="software">Software</h3>
        <div>
          <h4 id="productivity">Productivity</h4>
          <ul>
            <li>
              <strong>Obsidian</strong> - Note-taking and knowledge management.
            </li>
            <li>
              <strong>Rectangle</strong> - Simple yet efficient macOS window
              tiling manager.
            </li>
          </ul>
        </div>
        <div>
          <h4>Development</h4>
          <ul>
            <li>
              <strong>TablePlus</strong> – Easy database management.
            </li>
            <li>
              <strong>Screen Studio</strong> – High-quality screen recordings
              for tutorials.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
