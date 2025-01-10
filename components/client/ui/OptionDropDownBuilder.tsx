'use client'
import { FC, useState } from 'react';
import { DropdownItem, OptionDropdown } from '../Dropdown';

interface OptionDropDownBuilderProps {

}

const OptionDropDownBuilder: FC<OptionDropDownBuilderProps> = ({ }) => {
    const [isOpen, setIsOpen] = useState(false)
    return <OptionDropdown>
        <DropdownItem value={'test'} />
    </OptionDropdown>
}

export default OptionDropDownBuilder;