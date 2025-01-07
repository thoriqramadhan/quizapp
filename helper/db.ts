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
    with: 'question'
}
export async function getAllQuiz(option?: optionProps) {
    let optionBuilder; 
    if (option?.with == 'question') {
        optionBuilder = {include: {question:true}}
    }
    try {
        return await prisma.quiz.findMany(optionBuilder)
    } catch (error) {
        return 'Error creating quiz :' + error
    }
}