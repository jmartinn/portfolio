export function assetPathname(slug: string, filename: string): string {
  return `blog/${slug}/${filename}`;
}

export function assetUrl(slug: string, filename: string): string {
  const base = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_BLOB_BASE_URL is not set. Add it to .env.local — e.g. https://<store-id>.public.blob.vercel-storage.com"
    );
  }
  return `${base.replace(/\/$/, "")}/${assetPathname(slug, filename)}`;
}

export function isVideo(filename: string): boolean {
  return /\.(mp4|webm|mov|m4v)$/i.test(filename);
}
