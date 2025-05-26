import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { increment } from "@/lib/db/actions";
import { getIP } from "@/lib/get-ip";

export const runtime = "edge";

const requestSchema = z.object({
  slug: z.string().min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { slug } = requestSchema.parse(body);

    // Get client IP for deduplication
    const ip = await getIP(req);

    if (ip) {
      // Check if this IP has already viewed this post in the last 24 hours
      const deduplicationKey = ["deduplicate", ip, slug].join(":");
      const isNew = await kv.set(deduplicationKey, true, {
        nx: true,
        ex: 24 * 60 * 60, // 24 hours
      });

      if (!isNew) {
        // Already counted this view from this IP
        return new NextResponse(null, { status: 202 });
      }
    }

    // Increment the view count
    await increment(slug);

    return new NextResponse(null, {
      status: 202,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error incrementing view count:", error);

    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}
