import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

import { increment } from "app/db/actions";
import getIP from "lib/get-ip";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let slug: string | undefined = undefined;
  if ("slug" in body) {
    slug = body.slug;
  }
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }
  const ip = await getIP(req);
  if (ip) {
    const isNew = await kv.set(["deduplicate", ip, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }
  increment(slug);
  return new NextResponse(null, { status: 202 });
}
