'use client';
import { LucideProps } from 'lucide-react';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    icon?: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ icon, children, className, ...props }) => {
    return <button className={twMerge(`px-3 py-1 rounded-md bg-[#715BC7] flex gap-x-2 items-center text-white font-semibold transition-300 shadow-md hover:scale-105 focus:outline-[#5E40D2]`, className)} {...props}>{icon ?? ''} {children} </button>
}

