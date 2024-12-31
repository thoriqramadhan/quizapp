'use client'
import { createContext, useContext, useState } from "react";

const QuizContext = createContext<any>(undefined)
export function useQuiz() {
    const context = useContext(QuizContext)
    return context;
}

export function QuizProvider({ children }) {
    const [question, setQuestion] = useState({})
    function handleChangeQuestion() {
        console.log('you using the context!');

    }
    return <QuizContext.Provider value={{ question, handleChangeQuestion }}>
        {children}
    </QuizContext.Provider>
}