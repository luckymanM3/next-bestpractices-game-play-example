import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("isLoggedIn");
  const isAuthenticatedRoute = req.nextUrl.pathname.startsWith("/games");


  if (!isLoggedIn && isAuthenticatedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}