import { NextResponse, type NextRequest } from "next/server";

// Terminal clients identify themselves at the start of the UA string.
const TERMINAL_UA = /^(curl|wget|httpie|lynx|w3m|links|elinks)[\s/]/i;

/**
 * Serves the text-mode edition to terminal clients: `curl jmartinn.com`
 * gets plaintext, browsers get the real site. Rewrites (not redirects),
 * so the URL a visitor typed is the URL that answers.
 */
export default function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (TERMINAL_UA.test(userAgent)) {
    const url = request.nextUrl.clone();
    url.pathname = `/plain${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except internals, API routes, files, /plain itself, and
  // routes whose real payload is already terminal-friendly (feed, resume).
  matcher: ["/((?!_next|api|plain|og|rss|resume|.*\\..*).*)"],
};
