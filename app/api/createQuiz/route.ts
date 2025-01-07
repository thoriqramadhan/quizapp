import { getEmail } from "@/helper/db";
import { decrypt } from "@/lib/action/jwt";
import { QuestionObject } from "@/lib/context/createQuiz";
import { UserDb } from "@/types/auth";
import { prisma } from "@/utils/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,) {
    try {
        const body = await req.json()
        const { question }: { question: QuestionObject} = body
        const sessionInfo = (await cookies()).get('session')
        const userSessionInfo = await decrypt(sessionInfo!.value)
        const userDB = await getEmail(userSessionInfo.user.email) as UserDb
        await prisma.quiz.create({
            data: {
                name: question!.projectName!,
                authorId: userDB!.id!,
                question: {
                create: question!.quiz!.map(q => ({
                question: q.question,
                type: q.type,
                time: q.time,
                choice: q.choice,
                correctChoice: q.correctChoice,
            }))
        }
            }
        })
        return NextResponse.json('Success creating question', {status: 200})
    } catch (error) {
        return new NextResponse(`${error}` ,{ status: 400})
    }
}