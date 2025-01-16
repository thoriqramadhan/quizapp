import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { decrypt } from "./lib/action/jwt";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const publicRoute = ['/login', '/register'];
    const isInPublicRoute = publicRoute.includes(pathname);

    const cookiesStore = cookies();
    const jwtSign = (await cookiesStore).get('session')?.value
    console.log('JWT Token:', jwtSign);

    let authInfo = null
    if (jwtSign) {
        try {
            authInfo = await decrypt(jwtSign); // Pastikan nilai jwtSign.value diproses
            console.log('Decrypted JWT:', authInfo);
        } catch (error) {
            console.error('Failed to verify session!', error);
        }
    }

    if (!isInPublicRoute) {
        if (!authInfo) {
            console.log('Redirecting to /login...');
            return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
        } else {
            console.log('Access granted, proceeding...');
            return NextResponse.next();
        }
    } else{
        if (authInfo) {
            return NextResponse.redirect(new URL('/home', request.nextUrl.origin));
        }
    }
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
