'use client'
import { createContext, useContext, useState } from "react";


type ModalContextType = {
    modalText: string,
    modalHandler: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)
export function useModal() {
    const context = useContext(ModalContext)
    return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalText, setModalText] = useState('')
    function modalHandler() {

    }

    return <ModalContext.Provider value={{ modalText, modalHandler }}>
        {children}
    </ModalContext.Provider>
}