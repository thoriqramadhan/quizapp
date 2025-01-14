"use client"
import { Button } from '@/components/client/Button';
import { DropdownItem, OptionDropdown } from '@/components/client/Dropdown';
import { cardColor } from '@/constant/cardColor';
import { QuestionObjectDB } from '@/types/questionObject';
import { getChoiceAplhabet, getChoiceWithoutAlphabet } from '@/utils/typhography';
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface _PlayPageContainerProps {
    questions: QuestionObjectDB[],
    quizId: string
}

const _PlayPageContainer: FC<_PlayPageContainerProps> = ({ questions, quizId }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const quizPercentage = Math.floor((currentPage / questions.length) * 100);
    const currentQuestionInit = questions[currentPage - 1]
    const [currentQuestion, setCurrentQuestion] = useState<QuestionObjectDB>(currentQuestionInit)
    const [selectedChoice, setSelectedChoice] = useState('e.');
    const [playerOngoingAnswer, setPlayerOngoingAnswer] = useState(JSON.parse(localStorage.getItem(`playerQuizData-${quizId}`)) || [])

    function handleUpdate() {
        const selectedData = {
            no: currentPage,
            selectedChoice: getChoiceAplhabet(selectedChoice)
        }
        const onGoingReference = playerOngoingAnswer;
        onGoingReference[currentPage - 1] = selectedData
        localStorage.setItem(`playerQuizData-${quizId}`, JSON.stringify(onGoingReference))
    }
    function handleNextQuestion(option: 'prev' | 'next') {
        if (option == 'next') {
            if (currentPage == questions.length) {
                return
            }
            handleUpdate()
            setCurrentPage(prev => prev + 1)
        } else {
            if (currentPage == 1) {
                return
            }
            setCurrentPage(prev => prev - 1)
        }
    }

    useEffect(() => {
        setCurrentQuestion(currentQuestionInit)
        setSelectedChoice(playerOngoingAnswer[currentPage - 1] ?? 'da')
    }, [currentPage])
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
                    {
                        cardColor.map((item, index) => (
                            <PlayPageCard key={index} choiceText={currentQuestion.choice[index]} index={index} setSelectedChoice={setSelectedChoice} mainColor={item.mainColor} shadowColor={item.shadowColor} isSelected={getChoiceAplhabet(index) == selectedChoice} />
                        ))
                    }
                </section>
                <div className="w-full flex items-end justify-between">
                    <Button className='' onClick={() => handleNextQuestion('prev')}>Previous</Button>
                    <Button className='' onClick={() => handleNextQuestion('next')}>Next</Button>
                </div>
            </section>
        </>
    )
}


interface playPageCardProps {
    mainColor: string,
    shadowColor: string,
    choiceText: string,
    index: 0 | 1 | 2 | 3,
    setSelectedChoice: Dispatch<SetStateAction<number>>,
    isSelected: boolean
}

const PlayPageCard: FC<playPageCardProps> = ({ mainColor, shadowColor, choiceText, index, setSelectedChoice, isSelected }) => {
    function handleOnChange(e: ChangeEvent) {
        setSelectedChoice(getChoiceAplhabet(index))
    }
    const boxShadowStyle = isSelected ? `0px 10px rgba(${shadowColor}` : 'none';
    return (
        <label style={{ backgroundColor: `${mainColor}`, boxShadow: boxShadowStyle }} className='cursor-pointer rounded-xl flex-all-center overflow-y-auto px-3 relative select-none text-white text-xl '>
            <input type="radio" name={`choice`} id={`choice-${index}`} hidden onChange={handleOnChange} value={`${choiceText}`} />
            {getChoiceWithoutAlphabet(choiceText, 1)}
        </label>
    )
}

export default _PlayPageContainer;