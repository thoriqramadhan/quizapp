'use client';
import { handleSubmitPreview } from '@/lib/action/discover';
import { cn } from '@/utils/style';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideProps } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';


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
    quizId: number
}

export const PreviewPageButtons: FC<PreviewPageButtonsProps> = ({ quizId }) => {
    const router = useRouter()
    async function clickHandler(value: string) {
        // router.push(`/play/${quizId}`)
        await handleSubmitPreview(value, quizId)
    }
    return <div className="flex gap-x-5">
        <Button className='w-full py-2 rounded-lg' onClick={() => clickHandler('save_quiz')}>
            Save
        </Button>
        <Button className='w-full py-2 rounded-lg' variant={'outline'} onClick={() => clickHandler('play_quiz')}>
            Play
        </Button>
    </div>
}
