import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PAGE_PREFIXES = ["/admin"];
const PROTECTED_API_PREFIXES = ["/api/admin"];

function hasDidCookie(request: NextRequest) {
  return Boolean(request.cookies.get("did")?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasDid = hasDidCookie(request);

  if (
    !hasDid &&
    PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.json(
      { error: "Unauthorized: Please log in" },
      { status: 401 },
    );
  }

  if (
    !hasDid &&
    PROTECTED_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("auth", "required");
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
