import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    // Allow access to other routes
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login",
      error: "/auth/signup",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/auth/signup", "/auth/login", "/admin/dashboard", "/admin/dashboard/working-hours", "/admin/dashboard/menus"],
};