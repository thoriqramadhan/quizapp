'use client'
import { cn } from '@/utils/style';
import clsx from 'clsx';
import { ChevronDown, CircleEllipsis } from 'lucide-react';
import React, { cloneElement, Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import { number } from 'zod';

type OptionAlign = 'left' | 'center' | 'right'
interface DropdownProps {
    defaultValue?: string | number,
    className: string,
    optionAlign?: OptionAlign,
    dropdownOptions: (string | number)[],
    externalSetter?: (value: any) => void
}

export const Dropdown: FC<DropdownProps> = ({ defaultValue, className, optionAlign, dropdownOptions, externalSetter }) => {
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
                <DropdownItemContainer isOpen={isOpen} >
                    {dropdownOptions.map((option, index) => (
                        <DropdownItem key={index} value={option} setter={setDropdownState} />
                    ))}
                </DropdownItemContainer>
            </span >
        </>
    )
}


interface DropdownItemContainerProps {
    children: React.ReactNode,
    isOpen: boolean,
    optionContainerAlign?: OptionAlign,
}

export const DropdownItemContainer: FC<DropdownItemContainerProps> = ({ children, isOpen, optionContainerAlign }) => {
    return <section className={cn(`z-50 absolute top-[calc(100%+5px)] rounded-md max-h-[300px] min-w-[100px] overflow-x-hidden overflow-y-auto max-w-[185px] bg-red-500 scrollbar-thin shadow-md border transition-500 ${!isOpen && 'overflow-y-hidden h-[0px] border-none'}`, { '-translate-x-[calc(87%)]': optionContainerAlign == 'left' })}>
        {children}
    </section>
}

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    optionAlign?: OptionAlign
    value: string | number,
    className?: string,
    callbackFn?: () => void | undefined,
    setter?: Dispatch<SetStateAction<string | number>>
}

export const DropdownItem: FC<DropdownItemProps> = ({ optionAlign, value, className, setter, callbackFn, ...props }) => {
    const getOnClickHandler = () => {
        if (callbackFn) {
            callbackFn()
            console.log('called callback');

        } else {
            setter!(value)
            console.log('called setter');

        }
    }
    return <div className={cn('w-full py-1 px-2 max-h-[32px] whitespace-nowrap text-truncate overflow-y-auto bg-white transition-300 cursor-pointer hover:bg-zinc-50', {
        '': optionAlign == 'left',
        'flex-all-center': optionAlign == 'center',
        'flex justify-end items-center': optionAlign == 'right',
    }, className)} {...props}
        onClick={getOnClickHandler}
    >
        {value.toString()}
    </div>
}

interface OptionDropdownProps {
    optionAlign?: OptionAlign,
    dropdownOptions?: (string | number)[],
    children: React.ReactNode
}

export const OptionDropdown: FC<OptionDropdownProps> = ({ optionAlign, dropdownOptions, children }) => {
    const [isOpen, setisOpen] = useState(false)
    // cloneElement untuk memodifikasi sebuah component sebelum ke render.
    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return cloneElement(child, { optionAlign })
        }
        return child;
    })
    return (
        <>
            <div className="relative">
                <CircleEllipsis className='cursor-pointer' onClick={() => setisOpen(prev => !prev)} />
                <DropdownItemContainer isOpen={isOpen} optionContainerAlign='left'>
                    <DropdownItem optionAlign={optionAlign} value={'Hello'} />
                    {enhancedChildren}
                </DropdownItemContainer>
            </div>
        </>
    )
}


