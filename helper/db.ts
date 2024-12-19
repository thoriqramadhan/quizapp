import { prisma } from "@/utils/db";

export async function getEmail(email: string) {
    try {
        const emailDB = await prisma.user.findFirst(({
            where: {
                emai: email
            }
        }))
        console.log(emailDB)
        return emailDB
    } catch (error) {
        console.log(error)
        return null
    }
}