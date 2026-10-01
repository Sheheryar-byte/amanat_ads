import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware runs on every request BEFORE the page renders.
 * It protects /admin and /adminforms39 by checking for a valid
 * HttpOnly session cookie set by /api/admin/login.
 *
 * Note: Next.js middleware receives pathnames WITHOUT the basePath prefix.
 * So a request to /ms39/admin is seen here as /admin.
 */
export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  const secret = process.env.ADMIN_SECRET;

  // Valid session = cookie exists AND matches the server-side secret
  const isAuthenticated = !!secret && session?.value === secret;

  if (!isAuthenticated) {
    // Redirect to login — include the full /ms39 basePath in the redirect URL
    const loginUrl = new URL("/ms39/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protects these routes (paths are without basePath, as seen by middleware)
  matcher: ["/admin", "/adminforms39"],
};
