import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    className?: string,
    children: React.ReactNode
}

export const CardLayout: FC<CardProps> = ({ className, children }) => {
    return <div className={twMerge('p-5 rounded-lg shadow-lg border bg-white', className)}>
        {children}
    </div>
}
