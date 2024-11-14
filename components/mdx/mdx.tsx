import React, { type AnchorHTMLAttributes, createElement } from "react";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { rehypePrettyCode } from "rehype-pretty-code";

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

// Options for rehype-pretty-code
const options = {
  theme: "github-dark",
  keepBackground: true,
};

// Rehype plugins array
const rehypePlugins = [[rehypePrettyCode, options]];

export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      // FIX: Fix type error
      // @ts-expect-error: Components type missmatch
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          // FIX: Fix type error
          // @ts-expect-error: Plugins type missmatch
          rehypePlugins,
        },
      }}
    />
  );
}
