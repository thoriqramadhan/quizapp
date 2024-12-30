'use client';
import { cn } from '@/utils/style';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideProps } from 'lucide-react';
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

