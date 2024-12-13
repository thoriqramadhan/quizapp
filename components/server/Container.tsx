import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode,
    className?: string
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    return <div className={twMerge(`w-full h-screen overflow-hidden ${className}`)} {...props}>
        {children}
    </div>;
}
