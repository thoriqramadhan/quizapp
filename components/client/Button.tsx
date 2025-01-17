'use client';
import { checkIsQuizOwned, handleSubmitPreview } from '@/lib/action/discover';
import { QuizObject } from '@/types/questionObject';
import { cn } from '@/utils/style';
import { cva, VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';


const buttonVariant = cva('px-3 py-1 rounded-md flex gap-x-2 items-center justify-center text-white font-semibold transition-300 hover:scale-105 focus:outline-[#5E40D2]', {
    variants: {
        variant: {
            default: 'bg-[#715BC7] shadow-md',
            outline: 'border-[2px] border-[#715BC7] text-black'
        },
    },
    defaultVariants: {
        variant: 'default'
    }
})
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
    children: React.ReactNode,
    icon?: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ icon, children, className, variant, ...props }) => {
    return <button className={cn(buttonVariant({ variant }), className)} {...props}>{icon ?? ''} {children} </button>
}


interface PreviewPageButtonsProps {
    quizId: number,
    quizData: QuizObject[]
}

export const PreviewPageButtons: FC<PreviewPageButtonsProps> = ({ quizId, quizData }) => {
    const router = useRouter()
    const [isDuplicate, setIsDuplicate] = useState(false)
    async function clickHandler(value: string) {
        if (value == 'save_quiz') {
            await handleSubmitPreview(value, quizId)
            return
        } else {
            router.push(`/play/${quizId}`)
        }
        // await checkIsQuizOwned(quizId)
    }
    useEffect(() => {
        // quizData.forEach(item => {
        //     if (item.id == quizId) {
        //         setIsDuplicate(true)
        //     }
        // });
    }, [quizData])

    return <div className="flex gap-x-5">
        {
            isDuplicate ? '' : <Button className='w-full py-2 rounded-lg' onClick={() => clickHandler('save_quiz')}>
                Save
            </Button>
        }
        <Button className='w-full py-2 rounded-lg' variant={'outline'} onClick={() => clickHandler('play_quiz')}>
            Play
        </Button>
    </div>
}
