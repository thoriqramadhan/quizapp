import { LogIn, LogOut } from 'lucide-react';
import { FC } from 'react';

interface AppbarProps {

}

const Appbar: FC<AppbarProps> = ({ }) => {
    return <nav className='w-full h-14 bg-[#9984EA] flex items-center px-5 justify-between'>
        <h1 className='font-bold text-white tracking-wide sticky top-0'>QuizApp</h1>
        <div className="text-white space-x-3 flex ">
            <LogIn size={20} />
            Login
        </div>

    </nav>;
}

export default Appbar;