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
          <li>Mac Mini (2023)</li>
          <li>24&quot; LG 24MP400-B</li>
          <li>Logitech Signature M650</li>
          <li>Keychron V4 QMK</li>
        </ul>
        <h3 id="coding">Coding</h3>
        <ul>
          <li>
            Editor: Neovim (
            <a
              href="https://github.com/jmartinn/dotfiles/tree/main/.config/nvim"
              target="_blank"
            >
              Settings / Plugins
            </a>
            )
          </li>
          <li>
            Theme:{" "}
            <a href="https://github.com/folke/tokyonight.nvim">Tokyo Night</a>
          </li>
          <li>Terminal: WezTerm / zsh</li>
        </ul>
        <h3 id="audio-video">Audio</h3>
        <ul>
          <li>Sony WH-1000XM4</li>
        </ul>
        <h3 id="software">Software</h3>
        <ul>
          <li>Obsidian</li>
          <li>TablePlus</li>
          <li>Rectangle</li>
          <li>Screen Studio</li>
          <li>CleanShot X</li>
          <li>Raycast</li>
        </ul>
      </div>
    </section>
  );
}
