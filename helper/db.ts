import { prisma } from "@/utils/db";

export async function getEmail(email: string) {
    try {
        const emailDB = await prisma.user.findFirst(({
            where: {
                email: email
            }
        }))
        console.log(emailDB)
        return emailDB
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getUserByName(name: string) {
    
}