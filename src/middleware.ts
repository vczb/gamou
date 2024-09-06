import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is under /painel/
  if (pathname.startsWith("/painel")) {
    // Get the auth cookie
    const authCookie = request.cookies.get("authToken");

    // If no cookie, redirect to /entrar
    if (!authCookie) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
  }

  return NextResponse.next();
}

// Helper function to set the cookie (use this in your sign-in/sign-up handler)
export function setAuthCookie(response: NextResponse, token: string) {
  // Set the cookie with HttpOnly, Secure, and SameSite attributes for security
  response.cookies.set("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return response;
}

export const config = {
  matcher: ["/painel/:path*", "/signin", "/signup"], // Apply middleware to /painel/* and potentially other sign-in routes
};
