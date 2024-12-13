import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface LabelProps {
    htmlFor: string
    className?: string
}

const Label: FC<LabelProps> = ({ htmlFor, className }) => {
    return <label htmlFor={htmlFor} className={twMerge('font-semibold text-slate-500', className)}>Name</label>
}

export default Label;