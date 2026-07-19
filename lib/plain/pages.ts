import fs from "fs";
import path from "path";

import { navItems } from "@/lib/config/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/db/blog";

import { AVATAR_ASCII } from "./avatar";
import { bold, dim, heading, mdxToPlain, sideBySide, wrap } from "./text";

const SITE = "jmartinn.com";

const sortedPosts = async () =>
  (await getBlogPosts()).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

function footer(): string {
  return dim(
    `text-mode edition — the one with the sounds is at https://${SITE}`
  );
}

/** The homepage: a neofetch-style card, recent writing, and curl hints. */
export async function renderHome(): Promise<string> {
  const posts = (await sortedPosts()).slice(0, 3);

  const info = [
    bold("jmartinn"),
    dim("--------"),
    `${dim("name:")}     Juan Pedro Martin`,
    `${dim("role:")}     Frontend Engineer`,
    `${dim("location:")} Spain`,
    `${dim("stack:")}    React · TypeScript · Next.js`,
    `${dim("editor:")}   Neovim`,
    `${dim("shell:")}    zsh`,
    "",
    `${dim("web:")}      https://${SITE}`,
    `${dim("github:")}   https://github.com/jmartinn`,
    `${dim("x:")}        https://x.com/jmartinn07`,
    `${dim("email:")}    juamp_m@hotmail.com`,
  ].join("\n");

  const writing = posts
    .map(
      (post) =>
        `${dim(post.metadata.publishedAt)}  ${post.metadata.title}\n` +
        `${" ".repeat(12)}${dim(`curl ${SITE}/blog/${post.slug}`)}`
    )
    .join("\n");

  return [
    sideBySide(AVATAR_ASCII, info, 40),
    "",
    heading("recent writing"),
    writing,
    "",
    `${dim("$")} curl ${SITE}/blog ${dim("# everything I've written")}`,
    `${dim("$")} curl ${SITE}/rss ${dim("# subscribe")}`,
    "",
    footer(),
  ].join("\n");
}

/** The full blog index. */
export async function renderBlogIndex(): Promise<string> {
  const posts = await sortedPosts();

  const list = posts
    .map(
      (post) =>
        `${dim(post.metadata.publishedAt)}  ${post.metadata.title} ${dim(
          `(${post.readingTime})`
        )}\n${" ".repeat(12)}${dim(`curl ${SITE}/blog/${post.slug}`)}`
    )
    .join("\n\n");

  return [heading("writing"), "", list, "", footer()].join("\n");
}

/** A single post, rendered from its MDX source. */
export async function renderPost(slug: string): Promise<string | null> {
  const post = await getBlogPost(slug);
  if (!post) return null;

  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", `${slug}.mdx`),
    "utf-8"
  );

  return [
    bold(`# ${post.metadata.title}`),
    dim(`${post.metadata.publishedAt} · ${post.readingTime}`),
    "",
    wrap(post.metadata.summary),
    "",
    mdxToPlain(raw),
    "",
    footer(),
  ].join("\n");
}

/** Fallback for pages that only exist in the browser. */
export function renderFallback(pathname: string): {
  body: string;
  status: number;
} {
  const known = navItems.some((item) => item.path === pathname);

  const map = [
    `${dim("$")} curl ${SITE} ${dim("# who I am")}`,
    `${dim("$")} curl ${SITE}/blog ${dim("# what I write")}`,
  ].join("\n");

  const body = [
    known
      ? wrap(`${pathname} is browser-only — it doesn't translate to text.`)
      : wrap(`Nothing at ${pathname}.`),
    "",
    map,
    "",
    footer(),
  ].join("\n");

  return { body, status: known ? 200 : 404 };
}
