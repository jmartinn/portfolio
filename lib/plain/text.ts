// Utilities for the text-mode edition of the site (served to curl & friends).

// Prose column width. 76 keeps a comfortable margin inside an 80-col terminal.
export const PLAIN_WIDTH = 76;

const ESC = "[";

export const bold = (text: string) => `${ESC}1m${text}${ESC}22m`;
export const dim = (text: string) => `${ESC}2m${text}${ESC}22m`;

/**
 * Word-wraps a single logical line to the given width, preserving an
 * optional prefix (used for blockquotes and list continuations).
 */
export function wrap(text: string, width = PLAIN_WIDTH, prefix = ""): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return prefix.trimEnd();

  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (prefix.length + candidate.length > width && current) {
      lines.push(prefix + current);
      current = word;
    } else {
      current = candidate;
    }
  }
  lines.push(prefix + current);
  return lines.join("\n");
}

/** A section heading: bold title over a dim rule of the same length. */
export function heading(title: string): string {
  return `${bold(title)}\n${dim("-".repeat(title.length))}`;
}

/**
 * Converts raw MDX post content to terminal-friendly plaintext.
 *
 * Keeps the markdown itself (it reads natively in a terminal) and only
 * removes what a terminal can't render: frontmatter, imports, and JSX
 * components, which collapse to short bracketed placeholders.
 */
export function mdxToPlain(raw: string): string {
  let content = raw.replace(/^---\s*[\s\S]*?\s*---/, "").trim();

  content = content
    .replace(/^import\s.*$/gm, "")
    // <Figure caption="...">...</Figure> -> [figure: caption]
    .replace(
      /<Figure\s+caption="([^"]*)"\s*>[\s\S]*?<\/Figure>/g,
      (_, caption: string) => `[figure: ${caption.replace(/\s+/g, " ")}]`
    )
    // <StaticTweet id="..." /> -> a link that actually works in a terminal
    .replace(
      /<StaticTweet\s+id="(\d+)"\s*\/>/g,
      "[tweet: https://x.com/i/status/$1]"
    )
    // Any other component, self-closing or paired -> named placeholder
    .replace(
      /<([A-Z]\w*)[^>]*\/>/g,
      (_, name: string) => `[${componentLabel(name)} — view in a browser]`
    )
    .replace(
      /<([A-Z]\w*)[^>]*>[\s\S]*?<\/\1>/g,
      (_, name: string) => `[${componentLabel(name)} — view in a browser]`
    );

  // Wrap prose while leaving fenced code blocks untouched.
  const out: string[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
    } else if (/^#{1,6}\s/.test(line)) {
      out.push(bold(line));
    } else if (/^>\s?/.test(line)) {
      out.push(wrap(line.replace(/^>\s?/, ""), PLAIN_WIDTH, "> "));
    } else if (/^(\s*)([-*]|\d+\.)\s+/.test(line)) {
      const marker = line.match(/^(\s*)([-*]|\d+\.)\s+/)![0];
      out.push(
        wrap(line.slice(marker.length), PLAIN_WIDTH, " ".repeat(marker.length))
          .split("\n")
          .map((l, i) => (i === 0 ? marker + l.trimStart() : l))
          .join("\n")
      );
    } else {
      out.push(wrap(line));
    }
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Human label for a JSX component placeholder. */
function componentLabel(name: string): string {
  if (/Timeline|Flow|Diagram/i.test(name)) return "diagram";
  return `interactive: ${name}`;
}

/**
 * Lays out two text blocks side by side (art left, info right),
 * padding the left block to a fixed column.
 */
export function sideBySide(
  left: string,
  right: string,
  gutterCol: number
): string {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  const rows = Math.max(leftLines.length, rightLines.length);

  const lines: string[] = [];
  for (let i = 0; i < rows; i++) {
    const l = leftLines[i] ?? "";
    const r = rightLines[i] ?? "";
    lines.push(r ? l.padEnd(gutterCol) + r : l);
  }
  return lines.map((line) => line.trimEnd()).join("\n");
}
