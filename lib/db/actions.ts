"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

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

export async function increment(slug: string) {
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET count = views.count + 1
  `;

  revalidatePath(`/blog/${slug}`);
}
