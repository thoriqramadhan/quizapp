'use server'
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWTSECRET
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
    try {
        const { payload } = await jwtVerify(jwtSignature, encodedKey)
        return payload;
    } catch (error) {
        console.log('Failed to verify session!')
        console.log(error)
    }
}

export async function createSession(user: User) {
    const expiredAt = new Date(Date.now() + 2 * 24 + 60 + 60 + 1000)
    const jwtSignature = await signJWT({user , expiredAt})
    const cookiesStore = await cookies()
    cookiesStore.set('session', jwtSignature, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: 'lax',
        path:'/'
    })
}
