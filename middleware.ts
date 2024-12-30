import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    console.log(pathname)
    return NextResponse.next()
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};