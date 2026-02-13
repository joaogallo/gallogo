import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/playground",
  "/lessons",
  "/challenges",
  "/gallery",
  "/leaderboard",
  "/profile",
];

const AUTH_PATHS = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/playground", req.nextUrl));
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn && PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|sounds).*)",
  ],
};
