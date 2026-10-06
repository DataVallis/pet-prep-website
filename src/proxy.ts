import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 * - English (default) is served from the root: /how-it-works -> internally /en/how-it-works.
 * - Slovenian lives under /sl.
 * - /en/... is never a public URL: it redirects to the root path (one canonical URL per page),
 *   except generated Open Graph images, which Next.js addresses by their file route.
 */
const REWRITTEN = "x-petprep-locale-rewrite";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A request we already rewrote to /en/... (the standalone server runs the proxy again
  // on the rewritten URL): let it through instead of redirecting it back to the root.
  if (request.headers.get(REWRITTEN) === "1") {
    return NextResponse.next();
  }

  if (pathname === "/sl" || pathname.startsWith("/sl/")) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (pathname.includes("opengraph-image") || pathname.includes("twitter-image")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  const headers = new Headers(request.headers);
  headers.set(REWRITTEN, "1");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: [
    // Everything except Next internals, API routes and files with an extension
    // (sitemap.xml, robots.txt, llms.txt, images, fonts, icons).
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
