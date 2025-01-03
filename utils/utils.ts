import { QuestionObject } from "@/lib/context/createQuiz"

export function questionObjectInitiator(question: QuestionObject) {
    const newQuestionObject = question
            const questionObjectInit = {
                question: '',
                type: 'quiz',
                time: '',
                choice: [],
                correctChoice: ''
            }
            newQuestionObject.quiz?.push(questionObjectInit)
            localStorage.setItem('createQuestion', JSON.stringify(newQuestionObject))
}