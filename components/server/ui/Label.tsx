import { capitalizeFirstLetter } from '@/utils/typhography';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface LabelProps {
    htmlFor: string
    className?: string
    isRequired?: boolean
}

const Label: FC<LabelProps> = ({ htmlFor, className, isRequired = false }) => {
    return <label htmlFor={htmlFor} className={twMerge('font-semibold text-slate-500', className)}>{capitalizeFirstLetter(htmlFor)} {isRequired ?? <span className='text-red-400'>*</span>}</label>
}

export default Label;