import React, { FC } from 'react';
import Label from './ui/Label';
import { InputLiteral, InputLiteralProps, InputLiteralTypeProps } from './ui/Input';

interface InputSectionProps {
    name: string,
    type: InputLiteralTypeProps
    isRequired?: boolean
    error?: React.ReactNode
}

<section className='flex flex-col space-y-2'>
</section>
export const InputSection: FC<InputSectionProps> = ({ name, isRequired, error }) => {
    return (
        <section className='flex flex-col space-y-2'>
            <Label htmlFor={name} isRequired={isRequired} />
            <InputLiteral type={'text'} name={name} required={isRequired} />
            {error}
        </section>
    )

}
