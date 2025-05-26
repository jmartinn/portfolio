import React, { type AnchorHTMLAttributes, createElement } from "react";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { rehypePrettyCode } from "rehype-pretty-code";

import { getHighlighter } from "@/lib/shiki";
import { cn } from "@/lib/utils";

import { TweetComponent } from "../tweet/tweet";

interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

function CustomLink(props: CustomLinkProps) {
  const href: string = props.href!;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage({ ...props }: ImageProps) {
  return <Image className="rounded-lg" {...props} alt={props.alt ?? ""} />;
}

interface CalloutProps {
  emoji: React.ReactNode;
  children: React.ReactNode;
}

function Callout({ emoji, children }: CalloutProps) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{emoji}</div>
      <div className="callout w-full">{children}</div>
    </div>
  );
}

interface ProsCardProps {
  title: string;
  pros: string[];
}

function ProsCard({ title, pros }: ProsCardProps) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`What you might find useful about ${title}`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 size-4">
              <svg className="size-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ConsCardProps {
  title: string;
  cons: string[];
}

function ConsCard({ title, cons }: ConsCardProps) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`What you might not find useful about ${title}`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 size-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function slugify(str: string | number) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number): React.FC<{ children: React.ReactNode }> {
  const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const slug = slugify(children as string);
    return createElement(
      `h${level}`,
      { id: slug },
      createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor",
      }),
      children
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

// Blog-specific heading components with anchor links AND improved styling
function createBlogHeading(
  level: number,
  className: string
): React.FC<{ children: React.ReactNode }> {
  const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const slug = slugify(children as string);
    return createElement(
      `h${level}`,
      {
        id: slug,
        className: className,
      },
      createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor",
      }),
      children
    );
  };
  Component.displayName = `BlogHeading${level}`;
  return Component;
}

// Blog-specific styled components
const blogComponents = {
  h1: createBlogHeading(
    1,
    "mb-6 text-2xl font-medium leading-tight text-foreground md:text-3xl"
  ),
  h2: createBlogHeading(
    2,
    "mb-4 mt-8 text-xl font-medium leading-tight text-foreground md:text-2xl"
  ),
  h3: createBlogHeading(
    3,
    "mb-3 mt-6 text-lg font-medium leading-tight text-foreground md:text-xl"
  ),
  h4: createBlogHeading(
    4,
    "mb-3 mt-4 text-base font-semibold leading-tight text-foreground md:text-lg"
  ),
  h5: createBlogHeading(
    5,
    "mb-2 mt-4 text-sm font-semibold leading-tight text-foreground md:text-base"
  ),
  h6: createBlogHeading(
    6,
    "mb-2 mt-4 text-xs font-semibold uppercase tracking-wide leading-tight text-foreground/80 md:text-sm"
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-foreground/80" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/60"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    if (props.className?.includes("language-")) {
      return <code {...props} />;
    }
    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
        {...props}
      />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 overflow-x-auto rounded-lg p-4 text-sm" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-foreground/20 pl-4 italic text-foreground/70"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 list-disc space-y-1 pl-6 text-foreground/80"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 list-decimal space-y-1 pl-6 text-foreground/80"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/80" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground/90" {...props} />
  ),
  // Include existing special components
  Image: RoundedImage,
  Callout,
  ProsCard,
  ConsCard,
  StaticTweet: TweetComponent,
  Table,
};

// Original components for general use
const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  StaticTweet: TweetComponent,
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="overflow-auto rounded-lg p-4">{children}</pre>
  ),
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <code className={cn("whitespace-pre font-mono text-sm", className)}>
      {children}
    </code>
  ),
  Table,
};

const options = {
  theme: "one-dark-pro",
  keepBackground: true,
};

const rehypePlugins = [[rehypePrettyCode, options]];

// Original CustomMDX for general use
export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          // @ts-expect-error: Plugins type missmatch
          rehypePlugins,
        },
      }}
    />
  );
}

// Blog-specific MDX component with enhanced styling and shiki
export function BlogMDX(props: React.JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...blogComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                getHighlighter,
                theme: {
                  dark: "github-dark-dimmed",
                  light: "github-light",
                },
                keepBackground: true,
                defaultLang: "plaintext",
                onVisitLine(node: {
                  children: Array<{ type: string; value: string }>;
                }) {
                  // Prevent lines from collapsing in `display: grid` mode, and allow empty
                  // lines to be copy/pasted
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node: {
                  properties: { className: string[] };
                }) {
                  node.properties.className.push("line--highlighted");
                },
                onVisitHighlightedChars(node: {
                  properties: { className: string[] };
                }) {
                  node.properties.className = ["word--highlighted"];
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
