import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark-dimmed", "github-light"],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "css",
        "html",
        "json",
        "markdown",
        "bash",
        "shell",
        "python",
        "rust",
        "go",
        "sql",
        "yaml",
        "toml",
        "dockerfile",
        "c",
        "c++",
        "cpp",
        "java",
        "php",
        "ruby",
        "swift",
        "kotlin",
        "dart",
        "vue",
        "svelte",
        "astro",
      ],
    });
  }
  return highlighter;
}
