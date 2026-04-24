#!/usr/bin/env tsx
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, statSync, unlinkSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { parseArgs } from "node:util";

import { put } from "@vercel/blob";
import { imageSize } from "image-size";

import { assetPathname, isVideo } from "../lib/media/path";

const USAGE = `
Usage:
  pnpm media <file> --slug=<post-slug> --alt="<alt text>" [--caption="<caption>"] [--poster-at=<seconds>] [--no-poster]

Flags:
  --slug        Post slug (required). Becomes the Blob folder: blog/<slug>/<filename>
  --alt         Accessibility text (required). Used for <img alt> or <video aria-label>.
  --caption     If set, wraps the snippet in <Figure caption="...">.
  --poster-at   Seconds offset for video poster frame. Default: 1.
  --no-poster   Skip poster generation for videos.

Examples:
  pnpm media ./screenshot.png --slug=my-post --alt="Dashboard view" --caption="The dashboard."
  pnpm media ./demo.mp4 --slug=my-post --alt="Live session demo" --poster-at=2
`.trim();

function fail(msg: string): never {
  console.error(`\x1b[31merror:\x1b[0m ${msg}\n\n${USAGE}`);
  process.exit(1);
}

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    slug: { type: "string" },
    alt: { type: "string" },
    caption: { type: "string" },
    "poster-at": { type: "string", default: "1" },
    "no-poster": { type: "boolean", default: false },
    help: { type: "boolean", short: "h" },
  },
  allowPositionals: true,
});

if (values.help || positionals.length === 0) {
  console.log(USAGE);
  process.exit(values.help ? 0 : 1);
}

const filePath = resolve(positionals[0]);
const slug = values.slug ?? fail("--slug is required");
const alt = values.alt ?? fail("--alt is required");
const caption = values.caption;

const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN ??
  Object.entries(process.env).find(
    ([k]) => k.includes("BLOB") && k.endsWith("_READ_WRITE_TOKEN")
  )?.[1];

if (!blobToken) {
  fail(
    "No Blob token found. Create a Blob store in the Vercel dashboard, then run `vercel env pull .env.local`."
  );
}

try {
  statSync(filePath);
} catch {
  fail(`file not found: ${filePath}`);
}

const filename = basename(filePath);
const pathname = assetPathname(slug, filename);

async function uploadFile(path: string, pathname: string): Promise<string> {
  const buffer = readFileSync(path);
  const result = await put(pathname, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: blobToken,
  });
  return result.url;
}

function getImageDimensions(path: string): { width: number; height: number } {
  const buffer = readFileSync(path);
  const { width, height } = imageSize(buffer);
  if (!width || !height) fail(`could not read image dimensions: ${path}`);
  return { width, height };
}

function getVideoDimensions(path: string): { width: number; height: number } {
  const out = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "json",
      path,
    ],
    { encoding: "utf8" }
  );
  const parsed = JSON.parse(out) as {
    streams: Array<{ width?: number; height?: number }>;
  };
  const s = parsed.streams[0];
  if (!s?.width || !s?.height) fail(`could not read video dimensions: ${path}`);
  return { width: s.width, height: s.height };
}

function generatePoster(videoPath: string, atSeconds: string): string {
  const posterPath = resolve(
    `/tmp/poster-${Date.now()}-${basename(videoPath, extname(videoPath))}.jpg`
  );
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-ss",
      atSeconds,
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      posterPath,
    ],
    { stdio: "pipe" }
  );
  return posterPath;
}

function copyToClipboard(text: string): boolean {
  const result = spawnSync("pbcopy", [], { input: text });
  return result.status === 0;
}

function buildSnippet(opts: {
  slug: string;
  filename: string;
  alt: string;
  caption?: string;
  kind: "image" | "video";
  width?: number;
  height?: number;
  posterFilename?: string;
}): string {
  const attrs: string[] = [
    `slug="${opts.slug}"`,
    `src="${opts.filename}"`,
    `alt="${opts.alt.replace(/"/g, '\\"')}"`,
  ];
  if (opts.kind === "image") {
    attrs.push(`width={${opts.width}}`, `height={${opts.height}}`);
  } else if (opts.posterFilename) {
    attrs.push(`poster="${opts.posterFilename}"`);
  }
  const asset = `<Asset ${attrs.join(" ")} />`;
  if (!opts.caption) return asset;
  return `<Figure caption="${opts.caption.replace(/"/g, '\\"')}">\n  ${asset}\n</Figure>`;
}

async function main() {
  const kind: "image" | "video" = isVideo(filename) ? "video" : "image";
  console.log(`\x1b[2m→ uploading ${kind} to blob:${pathname}\x1b[0m`);

  let width: number | undefined;
  let height: number | undefined;
  let posterFilename: string | undefined;

  if (kind === "image") {
    ({ width, height } = getImageDimensions(filePath));
  } else {
    ({ width, height } = getVideoDimensions(filePath));
    if (!values["no-poster"]) {
      const posterBase = basename(filename, extname(filename));
      posterFilename = `${posterBase}-poster.jpg`;
      const tmpPoster = generatePoster(filePath, values["poster-at"]!);
      try {
        const posterUrl = await uploadFile(
          tmpPoster,
          assetPathname(slug, posterFilename)
        );
        console.log(`\x1b[2m  poster uploaded: ${posterUrl}\x1b[0m`);
      } finally {
        try {
          unlinkSync(tmpPoster);
        } catch {}
      }
    }
  }

  const url = await uploadFile(filePath, pathname);
  console.log(`\x1b[2m  file uploaded: ${url}\x1b[0m`);

  if (!process.env.NEXT_PUBLIC_BLOB_BASE_URL) {
    const base = new URL(url).origin;
    console.log(
      `\n\x1b[33m⚠\x1b[0m NEXT_PUBLIC_BLOB_BASE_URL is not set. Add this to .env.local:\n  NEXT_PUBLIC_BLOB_BASE_URL=${base}\n`
    );
  }

  const snippet = buildSnippet({
    slug,
    filename,
    alt,
    caption,
    kind,
    width,
    height,
    posterFilename,
  });

  const dims = kind === "image" ? ` · ${width}×${height}` : "";
  console.log(
    `\n\x1b[32m✓\x1b[0m ${(statSync(filePath).size / 1024 / 1024).toFixed(1)} MB${dims}\n`
  );
  console.log(snippet);

  if (copyToClipboard(snippet)) {
    console.log(`\n\x1b[2m(copied to clipboard)\x1b[0m`);
  }
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  fail(msg);
});
