import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL, STORAGE_KEY } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/painel")) {
    const authCookie = request.cookies.get(`${STORAGE_KEY}_token`);

    if (!authCookie) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }

    const url = `${BASE_URL}/api/verify-token`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ token: authCookie.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.status !== 200) {
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
