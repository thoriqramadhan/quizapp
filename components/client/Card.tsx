'use client'
import { optionProps } from "@/app/home/create/page";
import { useModal } from "@/lib/context/modal";
import { cn } from "@/utils/style"
import { getChoiceAplhabet, getChoiceWithoutAlphabet } from "@/utils/typhography";
import { Check, DivideIcon, X } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import DOMPurify from 'dompurify'

type InitValue = {
    defaultValue: string,
    defaultCorrectAnswer: string
}

interface CardAnswer extends React.HTMLAttributes<HTMLDivElement> {
    mainColor: string,
    shadowColorRgb: string,
    handleChange: (option: optionProps, value: string) => void,
    choiceIndex: 0 | 1 | 2 | 3,
    InitValue: InitValue
}

export const CardAnswer: FC<CardAnswer> = ({ className, mainColor, shadowColorRgb, handleChange, choiceIndex, InitValue, ...props }) => {
    const [isOpenAnswer, setIsOpenAnswer] = useState(false)
    const correctAnswer = getChoiceWithoutAlphabet(InitValue.defaultCorrectAnswer, 0)
    function getCorrectAnswer() {
        if (correctAnswer == 'a' && choiceIndex == 0) {
            return true
        } else if (correctAnswer == 'b' && choiceIndex == 1) {
            return true
        } else if (correctAnswer == 'c' && choiceIndex == 2) {
            return true
        } else if (correctAnswer == 'd' && choiceIndex == 3) {
            return true
        }
        return false
    }
    useEffect(() => { setIsOpenAnswer(false) }, [InitValue.defaultValue])
    return <div style={{ backgroundColor: `#${mainColor}`, boxShadow: `0px 10px rgba(${shadowColorRgb}` }} className={cn(` cursor-pointer rounded-xl  flex-all-center overflow-y-auto px-3 relative select-none`, className)} onClick={() => setIsOpenAnswer(true)} {...props}>
        {
            isOpenAnswer || InitValue.defaultValue ? <TextareaAutosize value={getChoiceWithoutAlphabet(InitValue.defaultValue, 1)} onChange={(event) => handleChange({ isAnswer: true, answerIndex: choiceIndex }, event.target.value)} autoFocus className="outline-0 bg-transparent text-medium  text-center font-medium text-white  w-[500px] resize-none my-2 text-4xl" /> : <p className='text-white text-4xl'>
                Add Answer
            </p>
        }
        <label htmlFor={`correctChoice-${choiceIndex}`} className="flex-all-center w-5 h-5 rounded-sm borde cursor-pointer bg-white absolute top-5 right-5 " onClick={(e) => e.stopPropagation()}>
            <input type="radio" name="correctChoice" id={`correctChoice-${choiceIndex}`} checked={getCorrectAnswer()} hidden className="peer" onChange={() => handleChange({ isSetCorrectChoice: true, answerIndex: choiceIndex })} />
            <Check size={15} color="#69f034" className="invisible peer-checked:visible" />
        </label>
    </div>
}


interface QuestionViewCardProps extends HTMLAttributes<HTMLDivElement> {
    isSelected: boolean,
    title: string | number
}
export const QuestionViewCard: FC<QuestionViewCardProps> = ({ isSelected, title, ...props }) => {
    return <div className={`w-[240px] h-[120px] relative shrink-0 bg-zinc-50 cursor-pointer rounded-2xl ${isSelected && 'border-[4px] border-[#5E40D2]'}`} {...props} >
        <span className='absolute bg-[#5E40D2] px-5 py-2 rounded-br-xl rounded-tl-xl text-white'>{title}</span>
    </div>
}



interface ModalCardProps {

}

export const ModalCard: FC<ModalCardProps> = ({ }) => {
    const { modalText, isOpen, modalHandler } = useModal()
    const sanitizedHtml = DOMPurify.sanitize(modalText);
    return (
        <>
            {
                <div className={cn(`${isOpen ? 'top-5' : '-top-[1000px]'} z-[100] transition-300 min-w-[100px] bg-white rounded-lg border shadow-sm py-6 px-7 absolute left-1/2 flex-all-center`)}>
                    <X className="absolute top-2 right-2 cursor-pointer" size={13} color="red" onClick={() => modalHandler({ changeModalState: true })} />
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className="text-red-400"></div>
                </div>
            }
        </>
    );
}



interface QuizCardProps {

}

export const QuizCard: FC<QuizCardProps> = ({ }) => {
    return <div className="w-[300px] h-[380px] flex flex-col shrink-0 rounded-md bg-white border cursor-pointer">
        <span className='w-full h-[40%] block bg-zinc-50'>
        </span>
        <div className="p-5 flex-1">
            <p className='h-[40%] text-medium'>Hello this </p>
        </div>
        <div className="w-full p-5 flex gap-3 flex-y-center">
            <span className='block w-10 h-10 bg-zinc-50 rounded-full'></span>
            <p className='font-medium'>Arthur Rogan</p>
        </div>
    </div>
}
