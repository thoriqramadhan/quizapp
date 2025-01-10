import { decrypt } from "@/lib/action/jwt";
import { cookies } from "next/headers";

export async function getAuthInfo() {
    try {
        const cookieStore = await cookies()
        const cookieJwtSignature = cookieStore.get('session')?.value

        const authData = (await decrypt(cookieJwtSignature)).user
        return authData;
    } catch (error) {
        throw new Error('Failed to get auth info ' + error)
    }
}