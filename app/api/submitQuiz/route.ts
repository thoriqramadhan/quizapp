import { getEmail } from "@/helper/db";
import { decrypt } from "@/lib/action/jwt";
import { disconnectPrisma, prisma } from "@/utils/db";
import { getChoiceWithoutAlphabet, wordWithout } from "@/utils/typhography";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { data } = body
        const userScore = Number(wordWithout(data.quizPercentage, '%'))
        const cookiesStore = await cookies() 
        const jwtSign = cookiesStore.get('session')?.value
        // user info
        const userInfo = (await decrypt(jwtSign)).user
        const userDB = await getEmail(userInfo.email)
        await prisma.participant.create(
            {
                data: {
                    title: `${userDB?.name}-Participant`,
                    userId: userDB?.id,
                    quizId: Number(data.quizId),
                    score: userScore
                }
            }
        )
        await disconnectPrisma()
        return NextResponse.json([data, userScore , userDB] , {status: 200})
    } catch (error) {
        console.log(error);
        
        return new NextResponse('failed' , {status: 400})
    }
}