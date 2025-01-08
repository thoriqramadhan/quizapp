import { prisma } from "@/utils/db";
import { optional } from "zod";

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

type optionProps = {
    with: ('question' | 'user') []
}
export async function getAllQuiz(option?: optionProps) {
    const optionBuilder = {}
    if (option?.with) {
        optionBuilder.include = {}
        option.with.forEach(option => {
            if (option == 'question') {
                optionBuilder.include.question = true;
            } else if (option == 'user') {
                optionBuilder.include.User = true;
            }
        })
    }
    console.log(optionBuilder)
    try {
        return await prisma.quiz.findMany(optionBuilder)
    } catch (error) {
        return 'Error getting quiz :' + error
    }
}