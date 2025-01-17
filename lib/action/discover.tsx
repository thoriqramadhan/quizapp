'use server'

import { getAllOwnedQuiz, getQuizById, setOwnedQuiz } from "@/helper/db";
import { prisma } from "@/utils/db";

type actionProps = 'save_quiz' | 'play_quiz'
export async function handleSubmitPreview(actionName: actionProps, quizId: number) {
    const quizData = await getQuizById(quizId, { with: ['user'] })
    // console.log(quizData);

    if (actionName == 'save_quiz') {
        await setOwnedQuiz(quizId, quizData)
    }

}


export async function checkIsQuizOwned(selectedQuizId: number) {
    const ownedQuiz = await getAllOwnedQuiz()
    console.log(ownedQuiz);

}