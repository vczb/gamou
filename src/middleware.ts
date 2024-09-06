import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STORAGE_KEY } from "./utils/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/painel")) {
    const authCookie = request.cookies.get(`${STORAGE_KEY}_token`);

    if (!authCookie) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
  }

  return NextResponse.next();
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(`${STORAGE_KEY}_token`, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return response;
}

export const config = {
  matcher: ["/painel/:path*"],
};
