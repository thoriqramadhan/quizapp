import { LogIn, LogOut } from 'lucide-react';
import { FC } from 'react';

interface AppbarProps {

}

const Appbar: FC<AppbarProps> = ({ }) => {
    return <>
        <nav className='hidden md:flex w-[170px] h-full flex-col bg-[#5E40D2] text-white px-5 py-5'>
            <h1 className='font-bold text-xl'>Quizapp</h1>
            <div className="mt-10">
                <section className="w-full flex flex-col gap-y-3">
                    <div className="w-full hover:bg-[#9984EA]/30 hover:backdrop-blur-md transition-300 p-1">
                        <p>Test</p>
                    </div>
                </section>
            </div>
        </nav>;
    </>
}

export default Appbar;