import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // The token will exists if the user is logged in.
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl

    // Token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect('/');
    }

    // Don't have a token
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}