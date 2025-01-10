import { QuizObject } from "@/types/questionObject";
import { getAuthInfo } from "@/utils/auth";
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
function quizOptionBuilder(option?: optionProps) {
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
    return optionBuilder
}
export async function getAllQuiz(option?: optionProps) {
    const optionBuilder = quizOptionBuilder(option) 
    try {
        return await prisma.quiz.findMany(optionBuilder)
    } catch (error) {
        return 'Error getting quiz :' + error
    }
}


export async function getQuizById( id: number,option?: optionProps) {
    const optionBuilder = quizOptionBuilder(option)
    try {
        return await prisma.quiz.findFirst({
            where: {
                id
            },
            ...optionBuilder
        }
        )
    } catch (error) {
        return 'Error getting quiz ' + error
    }
}

export async function setOwnedQuiz(quizId: number , quizData: QuizObject) {
    const authInfo = await getAuthInfo() as number
    const savedQuizDB = await prisma.user.findFirst({
        where: {
            id: authInfo.id
        },
        select: {
            savedQuiz: true
        }
    })
    const newSavedQuiz = Array.isArray(savedQuizDB?.savedQuiz)
            ? [...savedQuizDB.savedQuiz]
            : []; 
    newSavedQuiz?.push(quizData)
    
    await prisma.user.update({
        where: {
            email: authInfo!.email
        },
        data: {
            savedQuiz: newSavedQuiz
        }
    })
}