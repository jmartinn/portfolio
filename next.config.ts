import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import {
  BundledHighlighterOptions,
  BundledLanguage,
  BundledTheme,
} from "shiki";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "rose-pine-dawn",
          },
          keepBackground: true,
          defaultLang: "plaintext",
          getHighlighter: (
            options: BundledHighlighterOptions<BundledLanguage, BundledTheme>
          ) =>
            import("shiki").then(({ getHighlighter }) =>
              getHighlighter({
                ...options,
                langs: [
                  "javascript",
                  "typescript",
                  "jsx",
                  "tsx",
                  "json",
                  "bash",
                  "shell",
                  "html",
                  "css",
                  "python",
                  "cpp",
                  "c++",
                  "c",
                  "java",
                  "rust",
                  "go",
                  "sql",
                  "yaml",
                  "markdown",
                ],
              })
            ),
          onVisitLine(node: {
            children: Array<{ type: string; value: string }>;
          }) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] };
          }) {
            if (!node.properties.className) {
              node.properties.className = [];
            }
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
});

const ContentSecurityPolicy = `
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
    frame-src 'self' vercel.live;
    frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

export default withMDX(nextConfig);
