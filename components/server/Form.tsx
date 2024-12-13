import { FC } from 'react';
import Label from './ui/Label';
import { InputLiteral, InputLiteralProps, InputLiteralTypeProps } from './ui/Input';

interface InputSectionProps {
    name: string,
    type: InputLiteralTypeProps
}

<section className='flex flex-col space-y-2'>
</section>
export const InputSection: FC<InputSectionProps> = ({ name }) => {
    return (
        <section className='flex flex-col space-y-2'>
            <Label htmlFor={name} />
            <InputLiteral type={'text'} name={name} />
        </section>
    )

}
