import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Gates every /admin route except the login page itself.
 *
 * This runs on the Edge runtime, so it uses `jose` only (no Node crypto, no
 * database). It is a fast first line of defence — each server action and API
 * route still calls `requireSession()` independently, so a forged request that
 * somehow skipped middleware is rejected at the data layer too.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (isLoginPage) {
    // Already signed in? Skip the login form.
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    // Preserve where they were heading so login can bounce them back.
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("next", pathname);
    }
    const response = NextResponse.redirect(loginUrl);
    // Clear a stale or tampered cookie so the browser stops sending it.
    if (token) response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
