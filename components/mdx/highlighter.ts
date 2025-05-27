import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark", "rose-pine-dawn"],
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
        "go",
        "sql",
        "yaml",
        "toml",
        "dockerfile",
        "c",
        "c++",
        "cpp",
      ],
    });
  }
  return highlighter;
}
