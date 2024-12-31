import React, { FC, isValidElement, ReactElement } from 'react';
import Label from './ui/Label';
import { InputBoolean, InputLiteral, InputLiteralTypeProps, InputOption, InputSelect } from './ui/Input';

type AllowedChildren = ReactElement
interface InputSectionProps {
    name: string,
    error?: React.ReactNode,
    isRequired: boolean,
    children: AllowedChildren
}

<section className='flex flex-col space-y-2'>
</section>
export const InputSection: FC<InputSectionProps> = ({ name, error, isRequired, children }) => {
    validateChildren(children)
    return (
        <section className='flex flex-col space-y-2'>
            <Label htmlFor={name} isRequired={isRequired} />
            {children}
            {error}
        </section>
    )

}

function validateChildren(children: AllowedChildren) {
    let maxFailed = 3;
    let failedCount = 0;
    if (children.type !== InputLiteral) {
        failedCount += 1;
    }
    if (children.type !== InputBoolean) {
        failedCount += 1;
    }
    if (children.type !== InputSelect) {
        failedCount += 1;
    }
    if (maxFailed == failedCount) {
        throw new Error("Only Accept InputLiter / InputSelect / InputBoolean components");
    }
}