import React, { FC } from 'react';
import Label from './ui/Label';
import { InputLiteral, InputLiteralTypeProps } from './ui/Input';

interface InputSectionProps {
    name: string,
    type: InputLiteralTypeProps
    isRequired?: boolean
    error?: React.ReactNode
}

<section className='flex flex-col space-y-2'>
</section>
export const InputSection: FC<InputSectionProps> = ({ name, type, isRequired, error }) => {
    return (
        <section className='flex flex-col space-y-2'>
            <Label htmlFor={name} isRequired={isRequired} />
            <InputLiteral type={type} name={name} required={isRequired} />
            {error}
        </section>
    )

}
