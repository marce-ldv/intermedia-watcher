import jwtDecode from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN = "token";

export interface AuthToken {
  iat: number;
  exp: number;
  data: any;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function middleware(req: NextRequest) {
  const { cookies } = req;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const token = (cookies && cookies.get(AUTH_TOKEN).value) ?? "";
  const token = cookies.get(AUTH_TOKEN)
  const decodedToken = token ? jwtDecode<AuthToken>(token.value) : null

  const isAuthorized = decodedToken !== null;

  if (!isAuthorized && typeof window !== "undefined") {
    sessionStorage.clear();
  }

  if (req.nextUrl.pathname.startsWith("/login") && isAuthorized) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return isAuthorized || req.nextUrl.pathname.startsWith("/login")
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next|favicon.ico|/api|api/api).*)",
  ],
};
