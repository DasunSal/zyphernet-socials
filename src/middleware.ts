import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of paths that should be protected
const protectedPaths = ["/search", "/profile", "/create"];

export function middleware(request: NextRequest) {
  // Get the session cookie from the request headers
  const sessionCookie = request.cookies.get("session");

  // Check if the current path is one of the protected routes
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // If no session cookie exists, redirect to the login page
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to continue if the session exists or path doesn't require auth
  return NextResponse.next();
}

// Specify which routes this middleware applies to
export const config = {
  matcher: ["/search", "/profile", "/create"], // You can add more routes here if needed
};
