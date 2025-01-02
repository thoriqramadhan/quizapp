'use client'
import { optionProps } from "@/app/home/create/page";
import { cn } from "@/utils/style"
import { Check } from "lucide-react";
import { FC, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';

interface CardAnswer extends React.HTMLAttributes<HTMLDivElement> {
    mainColor: string,
    shadowColorRgb: string,
    handleChange: (option: optionProps, value: string) => void,
    choiceIndex: 0 | 1 | 2 | 3
}

export const CardAnswer: FC<CardAnswer> = ({ className, mainColor, shadowColorRgb, handleChange, choiceIndex, ...props }) => {
    const [isOpenAnswer, setIsOpenAnswer] = useState(false)
    function handleOpen() {
        setIsOpenAnswer(true)
    }
    return <div style={{ backgroundColor: `#${mainColor}`, boxShadow: `0px 10px rgba(${shadowColorRgb}` }} className={cn(` cursor-pointer rounded-xl  flex-all-center overflow-y-auto px-3 relative`, className)} onClick={() => setIsOpenAnswer(true)} {...props}>
        {
            isOpenAnswer ? <TextareaAutosize onChange={(event) => handleChange({ isAnswer: true, answerIndex: choiceIndex }, event.target.value)} autoFocus className="outline-0 bg-transparent text-medium  font-medium text-white  w-[500px] resize-none my-2 text-4xl" /> : <p className='text-white text-4xl'>
                Add Answer
            </p>
        }
        <label htmlFor={`correctChoice-${choiceIndex}`} className="flex-all-center w-5 h-5 rounded-sm borde cursor-pointer bg-white absolute top-5 right-5 " onClick={(e) => e.stopPropagation()}>
            <input type="radio" name="correctChoice" id={`correctChoice-${choiceIndex}`} hidden className="peer" onChange={() => handleChange({ isSetCorrectChoice: true, answerIndex: choiceIndex })} />
            <Check size={15} color="#69f034" className="invisible peer-checked:visible" />
        </label>
    </div>
}