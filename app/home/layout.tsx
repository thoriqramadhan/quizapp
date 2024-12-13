import Appbar from '@/components/server/Appbar';
import React, { FC } from 'react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <main className='w-full h-screen flex'>
        <Appbar />
        {children}
    </main>
}

export default Layout;