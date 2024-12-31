'use client'
import { createContext, useContext, useState } from "react";

type changeQuestionOptionProps = {
    isInitial: boolean,
    value: any
}
type QuestionObject = {
    projectName: string,
    coverImg: string,
    tags: string,
    quiz: any[]
}
type QuizContextType = {
    question: QuestionObject,
    handleChangeQuestion: (option: changeQuestionOptionProps) => void
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
        projectName: '',
        coverImg: '',
        tags: '',
        quiz: []
    }
    const [question, setQuestion] = useState<QuestionObject>(initialQuestionObject)
    function handleChangeQuestion(option: changeQuestionOptionProps) {
        console.log('you using the context!', option);
    }
    return <QuizContext.Provider value={{ question, handleChangeQuestion }}>
        {children}
    </QuizContext.Provider>
}