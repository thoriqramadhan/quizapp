import Appbar from '@/components/server/Appbar';
import { QuizProvider } from '@/lib/context/createQuiz';
import React, { FC } from 'react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <main className='w-full h-screen min-w-screen flex overflow-x-hidden'>
        <Appbar />
        <section className='py-5 px-5 md:pl-[180px] min-w-full max-w-full overflow-x-hidden'>
            <QuizProvider>
                {children}
            </QuizProvider>
        </section>
    </main>
}

export default Layout;