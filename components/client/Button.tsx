'use client';
import { LucideProps } from 'lucide-react';
import React, { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    icon?: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ title, icon, ...props }) => {
    return <button className='px-3 py-1 rounded-md bg-[#715BC7] flex gap-x-2 items-center text-white font-semibold transition-300 shadow-md hover:scale-105 focus:outline-[#5E40D2]' {...props}>{icon ?? ''} {title} </button>
}

