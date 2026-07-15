import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("rihla_admin_session")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute && !token) {
    // Redirect unauthenticated requests to login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute && token) {
    // Redirect authenticated requests away from login to dashboard root
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Intercept all routes under /admin
export const config = {
  matcher: ["/admin/:path*"]
};
