import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL, STORAGE_KEY } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const tokenName = `${STORAGE_KEY}_token`;

  const authCookie = request.cookies.get(tokenName);
  if (pathname.startsWith("/painel")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }

    const urlVerify = `${BASE_URL}/api/verify-token`;

    const response = await fetch(urlVerify, {
      method: "POST",
      body: JSON.stringify({ token: authCookie.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
  }

  if (pathname.startsWith("/sair")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete(tokenName);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*", "/sair"],
};
