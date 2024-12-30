import React, { FC } from 'react';
import Label from './ui/Label';
import { InputBoolean, InputLiteral, InputLiteralTypeProps, InputOption, InputSelect } from './ui/Input';

interface InputSectionProps {
    name: string,
    type: 'literal' | 'checkbox' | 'select',
    isRequired?: boolean,
    error?: React.ReactNode,
    inputLiteralType?: InputLiteralTypeProps,
    selectOption?: InputOption[]
}

<section className='flex flex-col space-y-2'>
</section>
export const InputSection: FC<InputSectionProps> = ({ name, type, isRequired, error, inputLiteralType, selectOption }) => {
    function checkInputTypes() {
        const inputProps = { name, required: isRequired }
        if (type == 'literal') {
            return <InputLiteral {...inputProps} type={inputLiteralType} />
        } else if (type == 'checkbox') {
            return <InputBoolean {...inputProps} type='checkbox' />
        } else if (type == 'select') {
            return <InputSelect name={name} option={selectOption! || []} />
        }
    }
    return (
        <section className='flex flex-col space-y-2'>
            <Label htmlFor={name} isRequired={isRequired} />
            {checkInputTypes()}
            {error}
        </section>
    )

}
