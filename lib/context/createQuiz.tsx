'use client'
import { createContext, useContext, useEffect, useState } from "react";


export type QuestionObject = {
    pageAt: number,
    projectName?: string,
    coverImg?: string,
    tags?: string,
    quiz?: any[]
}
type QuizContextType = {
    question: QuestionObject,
    handleChangeQuestion: (value: QuestionObject) => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)
export function useQuiz() {
    const context = useContext(QuizContext)
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export function QuizProvider({ children }) {
    const initialQuestionObject = {
        isInitial: true,
        pageAt: 0,
        projectName: '',
        coverImg: '',
        tags: '',
        quiz: []
    }
    const [question, setQuestion] = useState<QuestionObject>(JSON.parse(localStorage.getItem('createQuestion')) || initialQuestionObject)
    function handleChangeQuestion(value: QuestionObject) {
        setQuestion(prev => {
            return {
                ...prev,
                ...value
            }
        })
    }

    useEffect(() => {
        localStorage.setItem('createQuestion', JSON.stringify(question))
        if (question.quiz?.length == 0) {
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
    }, [question])

    return <QuizContext.Provider value={{ question, handleChangeQuestion }}>
        {children}
    </QuizContext.Provider>
}