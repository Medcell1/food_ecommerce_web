import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";



export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log(`PathName ====> ${req.nextUrl.pathname}`);
        console.log(`token===>${req.nextauth.token}`);



        if (
            req.nextUrl.pathname === "/signup" &&
            req.nextauth.token === null
        ) {
          console.log('It is  signup and theres  token');
            return NextResponse.redirect(new URL("/signup", req.url));
        }

        if (
            req.nextUrl.pathname === "/login" &&
            req.nextauth.token !== null
        ) {
          console.log('It is  login and theres no token');

            return NextResponse.redirect(new URL("/dashboard/admin-dashboard", req.url));
        }

        if (
            req.nextUrl.pathname === "/login" &&
            req.nextauth.token === null
        ) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: "/signup",
            error: "/login",
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);


