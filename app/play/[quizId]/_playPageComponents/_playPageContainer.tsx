import { DropdownItem, OptionDropdown } from '@/components/client/Dropdown';
import { FC } from 'react';

interface _PlayPageContainerProps {

}

const _PlayPageContainer: FC<_PlayPageContainerProps> = ({ }) => {
    return (
        <>
            <section className="w-full flex justify-between items-center">
                <p className='font-semibold '>5/10</p>
                <p className='text-xl font-semibold'>Quiz</p>
                <OptionDropdown >
                    <DropdownItem value={'test'} />
                </OptionDropdown>
            </section>
            {/* content */}
            <section className='space-y-5 pt-5'>
                {/* progress bar */}
                <div className="w-full rounded-full h-[20px] bg-zinc-100 overflow-hidden" id='progress-bar'>
                    <div className="w-[50%] h-full  rounded-r-full bg-red-400 flex items-center justify-end pr-2">
                        <p className='text-xs text-white'>50%</p>
                    </div>
                </div>

                {/* img */}
                <div className="w-full h-[250px] bg-zinc-50 border rounded-xl"></div>
                <div className="text-center px-[70px]">
                    <p className='font-semibold text-lg tex-slate-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, temporibus.</p>
                </div>
                <hr />
                <section className='grid grid-cols-2 w-full h-[400px] gap-5'>
                    {Array.from({ length: 4 }).map((answer, index) => (
                        <div key={index} className="bg-red-600 rounded-lg cursor-pointer flex-all-center">
                            <p className='text-white text-xl'>Hello</p>
                        </div>
                    ))}
                </section>
            </section>
        </>
    )
}

export default _PlayPageContainer;