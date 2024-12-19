import { Backpack, icons, LogIn, LogOut, Pencil, Telescope } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface AppbarProps {

}
type appBarItemType = {
    title: string,
    href: string,
    icon?: React.ReactNode
}
const Appbar: FC<AppbarProps> = ({ }) => {
    const iconSize = 17;
    const appBarItem = [
        {
            title: 'Create',
            href: "/home/create",
            icon: <Pencil size={iconSize} />
        },
        {
            title: 'Owned',
            href: '/home/owned',
            icon: <Backpack size={iconSize} />
        },
        {
            title: 'Explore',
            href: '/home/explore',
            icon: <Telescope size={iconSize} />
        }
    ] as appBarItemType[]
    return <>
        <nav className='hidden md:flex w-[170px] h-full flex-col bg-[#5E40D2] text-white py-5'>
            <h1 className='font-bold text-xl mx-5'>Quizapp</h1>
            <div className="mt-10">
                <section className="w-full flex flex-col gap-y-3">
                    {
                        appBarItem.map((item, index) => (
                            <Link key={index} href={item.href} className="w-full hover:bg-[#9984EA]/30 hover:backdrop-blur-md transition-300 p-1 cursor-pointer flex gap-x-2 items-center px-5">
                                {item.icon} {item.title}
                            </Link>
                        ))
                    }
                </section>
            </div>
        </nav>;
    </>
}

export default Appbar;