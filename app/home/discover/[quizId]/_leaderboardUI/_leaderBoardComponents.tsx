'use client'
import { Participant } from '@/types/participant';
import { cn } from '@/utils/style';
import { FC } from 'react';

interface _leaderBoardComponentsProps {
    participants: Participant[]
}

const _leaderBoardComponents: FC<_leaderBoardComponentsProps> = ({ participants }) => {
    return (
        <>
            {
                participants.length > 0 &&
                <section className='w-full flex flex-col space-y-5' >
                    <p className='text-slate-700 font-semibold'>Leaderboard</p>
                    <div className='w-full relative flex gap-x-3 justify-center py-10 '>
                        {
                            participants.map((participant, index) => (
                                <div className={cn(`flex flex-col justify-center items-center gap-y-4 relative order-1 ${index == 0 && '-top-10 order-2'} ${index == 2 && 'order-3'}`)} key={index} >
                                    {/* profi\le picture */}
                                    <div className={`w-20 h-20 bg-red-200 rounded-full block border-[3px] border-[#715BC7] relative `}>
                                        <div className="w-8 h-8 rounded-full bg-[#715BC7] absolute -bottom-3  left-1/2 -translate-x-1/2 flex-all-center text-white">{index + 1}</div>
                                    </div>
                                    <span className="text-center">
                                        <h1 className='font-semibold text-lg leading-tight'>{participant.participant?.name}</h1>
                                        <p>{participant.score}%</p>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    {/* 4 - infinite */}
                    {
                        participants.length > 3 &&
                        <>
                            <div className='w-full rounded-t-2xl h-[400px] bg-red-100 p-3 space-y-2 overflow-y-auto thin-scrollbar'>
                                {
                                    Array.from({ length: 10 }).map((item, index) => (
                                        <div key={index} className='w-full min-h-10 bg-slate-700 rounded-xl py-2 px-5 items-center text-white flex justify-between'>
                                            <div className='flex gap-x-2 items-center '>
                                                <p>{index + 4}</p>
                                                <div className="w-10 h-10 rounded-full border"></div>
                                                <p>Sumanto Prasetyo</p>
                                            </div>
                                            <div>100%</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }
                </section >
            }
        </>
    )
}

export default _leaderBoardComponents;