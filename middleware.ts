import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const LOGIN_PAGE = "/auth/login";
const WORKPLACE_PAGE = "/auth/workplaces";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.next();
  }

  const url = new URL(req.url);
  const pathname = url.pathname;

  // redirect to login page
  const token = req.cookies.get("token");
  if (!token) {
    if (pathname === LOGIN_PAGE) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
  }

  // redirect workplaces
  const decoded = jwt.decode(token.value);
  if (!decoded || typeof decoded === "string") {
    throw new Error("Unknown format");
  }

  if (!decoded.partner_id) {
    if (pathname === WORKPLACE_PAGE) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/workplaces", req.url));
  } else if (decoded.partner_id === WORKPLACE_PAGE) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Normal process
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
