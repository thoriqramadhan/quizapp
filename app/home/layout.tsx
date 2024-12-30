import Appbar from '@/components/server/Appbar';
import React, { FC } from 'react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <main className='w-full h-screen flex'>
        <Appbar />
        <section className='px-5 py-5 flex-1 md:pl-[180px]'>
            {children}
        </section>
    </main>
}

export default Layout;