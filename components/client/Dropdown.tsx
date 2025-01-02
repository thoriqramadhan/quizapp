'use client'
import { cn } from '@/utils/style';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { number } from 'zod';

type OptionAlign = 'left' | 'center' | 'right'
interface DropdownProps {
    defaultValue?: string | number,
    className: string,
    optionAlign?: OptionAlign,
    dropdownOptions: (string | number)[],
    externalSetter?: (value: any) => void
}

const Dropdown: FC<DropdownProps> = ({ defaultValue, className, optionAlign, dropdownOptions, externalSetter }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [dropdownState, setDropdownState] = useState(defaultValue ?? 'Your data')
    useEffect(() => {
        setIsOpen(prev => !prev)
        if (externalSetter) {
            externalSetter(dropdownState)
        }
    }, [dropdownState])
    return (
        <>
            <span className='relative h-fit'>
                <div className={cn(`px-3 py-1 flex-all-center border gap-x-2 cursor-pointer`, className)} onClick={() => setIsOpen(prev => !prev)}>{dropdownState.toString()} <ChevronDown className={`transition-300 ${isOpen && 'rotate-180'}`} size={15} /></div>
                {/* option V */}
                <section className={cn(`z-50 absolute top-[calc(100%+5px)] rounded-md max-h-[300px] min-w-[100px] overflow-y-auto max-w-[185px] bg-red-500 scrollbar-thin shadow-md border transition-500 ${!isOpen && 'overflow-y-hidden h-[0px] border-none'}`)}>
                    {dropdownOptions.map((option, index) => (
                        <DropdownItem key={index} value={option} setter={setDropdownState} />
                    ))}
                </section>
            </span >
        </>
    )
}


interface DropdownItemProps {
    optionAlign?: OptionAlign
    value: string | number,
    setter: Dispatch<SetStateAction<string | number>>
}

const DropdownItem: FC<DropdownItemProps> = ({ optionAlign, value, setter }) => {
    return <div className={clsx('w-full py-1 px-2 bg-white transition-300 cursor-pointer hover:bg-zinc-50', {
        '': optionAlign == 'left',
        'flex-all-center': optionAlign == 'center',
        'flex justify-end items-center': optionAlign == 'right',
    })}
        onClick={() => setter(value)}>
        {value.toString()}
    </div>
}

export default Dropdown