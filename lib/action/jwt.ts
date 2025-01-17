'use server'
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey =  process.env.NEXT_PUBLIC_jWTSECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function signJWT(payload: { user: User, expiredAt: Date }) {
    try {
        return await new SignJWT(payload)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(encodedKey)
    } catch (error) {
        throw new Error('Error creating jwt signature key.')
    }
}

export async function decrypt(jwtSignature: string) {
    console.log('JWTSECRET:', process.env.JWTSECRET);
    try {
        const { payload } = await jwtVerify(jwtSignature, encodedKey)
        return payload;
    } catch (error) {
        console.error('Failed to verify session!', error);
        throw new Error('Invalid or expired JWT signature.');
    }
}

export async function createSession(user: User) {
    try {
        const expiredAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        console.log('creating jwt sign')
        const jwtSignature = await signJWT({ user, expiredAt })
        const cookiesStore = await cookies()
        console.log('creating cookies')
    cookiesStore.set('session', jwtSignature, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: 'lax',
        path:'/'
    })
    } catch (error) {
        console.log(error)
    }
}
