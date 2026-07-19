import { BLOG_REVALIDATE_SECONDS, MAX_SLUG_LENGTH } from "@/lib/constants";
import {
  renderBlogIndex,
  renderFallback,
  renderHome,
  renderPost,
} from "@/lib/plain/pages";

/**
 * The text-mode edition of the site. Terminal clients (curl, wget, ...)
 * are rewritten here by proxy.ts; the /plain/* URLs also work directly.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const segments = (await params).path ?? [];

  let body: string;
  let status = 200;

  if (segments.length === 0) {
    body = await renderHome();
  } else if (segments.length === 1 && segments[0] === "blog") {
    body = await renderBlogIndex();
  } else if (
    segments.length === 2 &&
    segments[0] === "blog" &&
    /^[a-z0-9-]+$/.test(segments[1]) &&
    segments[1].length <= MAX_SLUG_LENGTH
  ) {
    const post = await renderPost(segments[1]);
    if (post) {
      body = post;
    } else {
      ({ body, status } = renderFallback(`/blog/${segments[1]}`));
    }
  } else {
    ({ body, status } = renderFallback(`/${segments.join("/")}`));
  }

  return new Response(body + "\n", {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": `public, s-maxage=${BLOG_REVALIDATE_SECONDS}, stale-while-revalidate`,
      // The canonical content lives on the HTML pages.
      "X-Robots-Tag": "noindex",
    },
  });
}
