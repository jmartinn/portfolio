"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

/**
 * Gets the total view count across all blog posts.
 * Aggregates the count column from the views table.
 *
 * @returns Promise resolving to total view count, or 0 if database not configured
 */
export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const res = await sql`
    SELECT count
    FROM views
  `;

  const views = res.rows;

  return views.reduce((acc, curr) => acc + Number(curr.count), 0);
}

/**
 * Gets view counts for all blog posts.
 * Returns an array of objects with slug and count for each post.
 *
 * @returns Promise resolving to array of { slug, count } objects, or empty array if database not configured
 */
export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const res = await sql`
    SELECT slug, count
    FROM views
  `;

  return res.rows as { slug: string; count: number }[];
}

/**
 * Increments the view count for a specific blog post.
 * Uses PostgreSQL's ON CONFLICT to perform an upsert:
 * - If slug exists, increments the count
 * - If slug doesn't exist, inserts new row with count=1
 * After updating, revalidates the blog post page to refresh ISR cache.
 *
 * @param slug - The blog post slug to increment views for
 * @returns Promise that resolves when operation completes
 *
 * @example
 * ```ts
 * await increment("my-blog-post"); // Views: 1 -> 2
 * ```
 */
export async function increment(slug: string) {
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1
  `;

  revalidatePath(`/blog/${slug}`);
}
