import type { NextApiRequest } from "next";

export async function getIP(request: Request | NextApiRequest) {
  const xff =
    request instanceof Request
      ? request.headers.get("x-forwarded-for")
      : request.headers["x-forwarded-for"];

  const ip = xff
    ? Array.isArray(xff)
      ? xff[0]
      : xff.split(",")[0]
    : "127.0.0.1";

  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hash;
}
