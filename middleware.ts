import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { siteConfig } from "./config/site";

// Define protected routes that require the user to be authenticated
const protectedRoutes = [siteConfig.sitePaths.chatHome];

export async function middleware(req: NextRequest) {
  // Get the session token
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    // If no session exists, redirect to /signin
    if (!session) {
      const signInUrl = new URL(siteConfig.sitePaths.signin, req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If the user is trying to access /signin or /register while already logged in
  if (
    (pathname === siteConfig.sitePaths.signin ||
      pathname === siteConfig.sitePaths.register) &&
    session
  ) {
    const chatUrl = new URL(siteConfig.sitePaths.chatHome, req.url);
    return NextResponse.redirect(chatUrl);
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Paths middleware should run on
export const config = {
  matcher: [
    "/chat", // Assuming this is the route for chatHome
    "/auth/register",
    "/auth/signin",
  ],
};
