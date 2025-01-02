'use client'
import { cn } from "@/utils/style"
import { FC, useState } from "react"
import TextareaAutosize from 'react-textarea-autosize';

interface CardAnswer extends React.HTMLAttributes<HTMLDivElement> {
    mainColor: string,
    shadowColorRgb: string
}

export const CardAnswer: FC<CardAnswer> = ({ className, mainColor, shadowColorRgb, ...props }) => {
    const [isOpenAnswer, setIsOpenAnswer] = useState(false)
    function handleOpen() {
        setIsOpenAnswer(true)

    }
    return <div style={{ backgroundColor: `#${mainColor}`, boxShadow: `0px 10px rgba(${shadowColorRgb}` }} className={cn(` cursor-pointer rounded-xl  flex-all-center overflow-y-auto `, className)} onClick={() => setIsOpenAnswer(true)} {...props}>
        {
            isOpenAnswer ? <TextareaAutosize autoFocus className="outline-0 bg-transparent text-medium  font-medium text-white  w-[500px] resize-none my-2 text-4xl" /> : <p className='text-white text-4xl'>
                Add Answer
            </p>
        }
    </div>
}