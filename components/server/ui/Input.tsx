import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputLiteralTypeProps = 'password' | 'text' | 'email'
interface InputLiteralProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    name: string
    type: InputLiteralTypeProps,
    defaultValue?: string
}

export const InputLiteral: FC<InputLiteralProps> = ({ className, name, type, defaultValue, ...props }) => {
    return <input type={type} name={name} id={name} defaultValue={defaultValue} className={twMerge(`border-b-[3px] focus:outline-none`, className)} {...props} />
}

interface InputBoolean {
    className?: string
    type: 'checkbox'
    name: string
}

export const InputBoolean: FC<InputBoolean> = ({ className, type, name, ...props }) => {
    return <input type={type} name={name} id={name} className={twMerge('bg-slate-500', className)} {...props} />
}

export type InputOption = {
    value: any
}
interface InputSelect {
    className?: string,
    name: string,
    option: InputOption[],
    defaultValue?: string | number
}

export const InputSelect: FC<InputSelect> = ({ name, option, defaultValue }) => {
    return <select name={name} className='border-b-[3px] focus:outline-none pb-[3px]' defaultValue={defaultValue} id={name}>
        {option.map((item, index) => (
            <option value={item.value} key={index}>{item.value}</option>
        ))}
    </select>
}


