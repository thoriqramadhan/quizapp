'use client'
import { Button } from '@/components/client/Button';
import { ArrowLeft, ChevronDown, CircleEllipsis, Image } from 'lucide-react';
import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { IoMdImage } from 'react-icons/io';

interface PageProps {

}

const CreateQuiz: FC<PageProps> = ({ }) => {
    const [isType, setIsType] = useState(false)
    const [question, setQuestion] = useState<string>('')
    const inputParent = useRef<HTMLLabelElement>(null)
    function handleOpenType(event: React.MouseEvent) {
        event.preventDefault()
        setIsType(prev => !prev)
    }
    function handleInputQuestion(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const inputElement = event.currentTarget
        // inputElement.style.width = `${event.target.value.length + 1}ch`
        setQuestion(event.target.value)
    }
    useEffect(() => {
        const inputQuestionParent = inputParent!.current
        const inputQuestion = inputQuestionParent?.getElementsByTagName('textarea')[0]
        inputQuestion?.focus()
    }, [isType])
    return <>
        <span className="space-y-5">
            <div className='flex justify-between items-center w-full'>
                <span className='flex items-center gap-x-5'>
                    <ArrowLeft className='cursor-pointer' />
                    <h1 className='text-title'>Create Quiz</h1>
                </span>
                <CircleEllipsis className='cursor-pointer' />
            </div>
            <label htmlFor="quiz_img" className='w-full border-[3px] h-[240px] flex flex-col items-center justify-center cursor-pointer rounded-3xl bg-zinc-50 border-[#9984EA] gap-y-3'>
                <IoMdImage color='#9984EA' size={50} />
                <p className='text-medium text-[#5E40D2]'>Add Cover Image</p>
                <input type="file" name="quiz_img" id="quiz_img" hidden accept='.jpg | .png' />
            </label>
            <div className="w-full flex gap-x-3">
                <Button className='rounded-2xl font-normal text-sm py-2'>
                    10 Sec
                </Button>
                <Button className='rounded-2xl font-medium text-sm py-2 box-border' variant='outline'>
                    Quiz <ChevronDown size={15} />
                </Button>
            </div>
            <label htmlFor="quiz_question" ref={inputParent} onClick={handleOpenType} defaultValue={''} className='w-full border-[3px] min-h-[100px] max-h-[200px] flex rounded-2xl items-center justify-center bg-zinc-50 cursor-pointer'>
                {
                    isType ? <textarea name="quiz_question" id="quiz_question" onChange={handleInputQuestion} value={question} className='outline-0 bg-transparent text-medium truncate font-medium text-zinc-600 w-[500px] resize-none'></textarea> : <h1 className='text-medium font-medium text-zinc-600'>Tap to add question</h1>
                }
            </label>
        </span>
    </>;
}

export default CreateQuiz;