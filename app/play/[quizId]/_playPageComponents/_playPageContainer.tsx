"use client"
import { Button } from '@/components/client/Button';
import { DropdownItem, OptionDropdown } from '@/components/client/Dropdown';
import { QuestionObjectDB } from '@/types/questionObject';
import { getChoiceWithoutAlphabet } from '@/utils/typhography';
import { FC, useEffect, useState } from 'react';

interface _PlayPageContainerProps {
    questions: QuestionObjectDB[]
}

const _PlayPageContainer: FC<_PlayPageContainerProps> = ({ questions }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const quizPercentage = Math.floor((currentPage / questions.length) * 100);
    const currentQuestionInit = questions[currentPage - 1]
    const [currentQuestion, setCurrentQuestion] = useState<QuestionObjectDB>(currentQuestionInit)
    return (
        <>
            <section className="w-full flex justify-between items-center">
                <p className='font-semibold '>{currentPage}/{questions.length}</p>
                <p className='text-xl font-semibold'>Quiz</p>
                <OptionDropdown >
                    <DropdownItem value={'test'} />
                </OptionDropdown>
            </section>
            {/* content */}
            <section className='space-y-5 pt-5'>
                {/* progress bar */}
                <div className="w-full rounded-full h-[20px] bg-zinc-100 overflow-hidden" id='progress-bar'>
                    <div className=" h-full  rounded-r-full bg-red-400 flex items-center justify-end pr-2" style={{ width: `${quizPercentage}%` }}>
                        <p className='text-xs text-white'>{quizPercentage}%</p>
                    </div>
                </div>

                {/* img */}
                <div className="w-full h-[250px] bg-zinc-50 border rounded-xl"></div>
                <div className="text-center px-[70px]">
                    <p className='font-semibold text-lg tex-slate-700'>{currentQuestion.question}</p>
                </div>
                <hr />
                <section className='grid grid-cols-2 w-full h-[400px] gap-5'>
                    {currentQuestion.choice.map((answer, index) => (
                        <div key={index} className="bg-red-600 rounded-lg cursor-pointer flex-all-center">
                            <p className='text-white text-xl'>{getChoiceWithoutAlphabet(answer, 1)}</p>
                        </div>
                    ))}
                </section>
                <div className="w-full flex items-end justify-end">
                    <Button className=''>Next</Button>
                </div>
            </section>
        </>
    )
}

export default _PlayPageContainer;