'use client'
import { createContext, useContext, useState } from "react";


type ModalContextType = {
    modalText: string,
    isOpen: boolean,
    modalHandler: (config: modalOption) => void,
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)
export function useModal() {
    const context = useContext(ModalContext)
    return context;
}

type modalOption = {
    changeModalState: boolean,
    changeModalText?: string,
    autoClose?: boolean
}
export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalText, setModalText] = useState('Input your text')
    const [isOpen, setIsOpen] = useState(true)
    function modalHandler(config: modalOption) {
        if (config.changeModalState) {
            setIsOpen(prev => !prev)
        }
        const modalTextState = config.changeModalText
        if (modalTextState) {
            setModalText(modalTextState)
        }
        if (config.autoClose) {
            setTimeout(() => {
                setIsOpen(false)
            }, 2000)
        }
    }

    return <ModalContext.Provider value={{ modalText, isOpen, modalHandler }}>
        {children}
    </ModalContext.Provider>
}