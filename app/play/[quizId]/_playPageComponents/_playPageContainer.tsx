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
    const donePercentage = Math.floor((currentPage / questions.length) * 100);
    const currentQuestionInit = questions[currentPage - 1]

    const [currentQuestion, setCurrentQuestion] = useState<QuestionObjectDB>(currentQuestionInit)
    const [selectedChoice, setSelectedChoice] = useState('e.');
    const [playerOngoingAnswer, setPlayerOngoingAnswer] = useState(JSON.parse(localStorage.getItem(`playerQuizData-${quizId}`)) || [])

    const [quizResultData, setQuizResultData] = useState({
        quizPercentage: '',
        stats: []
    });


    function handleUpdate() {
        let isChoiceValid = false;
        if (selectedChoice == 'a.' || selectedChoice == 'b.' || selectedChoice == 'c.' || selectedChoice == 'd.') {
            isChoiceValid = true
        }
        if (isChoiceValid) {
            const selectedData = {
                no: currentPage,
                selectedChoice: selectedChoice
            }
            const onGoingReference = playerOngoingAnswer;
            onGoingReference[currentPage - 1] = selectedData
            localStorage.setItem(`playerQuizData-${quizId}`, JSON.stringify(onGoingReference))
            return true
        }
        return false

    }
    function handleSubmit() {
        let correctAnswer = 0;
        const userStatistic = {
            quizPercentage: '',
            totalCorrectChoice: 0,
            stats: []
        };
        const userAnswer = JSON.parse(localStorage.getItem(`playerQuizData-${quizId}`))

        for (let index = 0; index < questions.length; index++) {
            let status = 'salah'
            if (userAnswer[index].selectedChoice == questions[index].correctChoice) {
                userStatistic.totalCorrectChoice += 1
                status = 'benar'
            }
            const finalData = {
                quizNo: index + 1,
                selectedChoice: userAnswer[index].selectedChoice,
                correctChoice: questions[index].correctChoice,
                status
            }
            userStatistic.stats.push(finalData)
        }
        const quizPercentagePoint = `${Math.floor(((userStatistic.totalCorrectChoice / questions.length) * 100))}%`
        userStatistic.quizPercentage = quizPercentagePoint
        setQuizResultData(userStatistic)

    }
    function handleNextQuestion(option: 'prev' | 'next') {
        if (option == 'next') {
            const isValid = handleUpdate()
            if (isValid) {
                setCurrentPage(prev => prev + 1)
            }
        } else {
            if (currentPage == 1) {
                return
            }
            const isValid = handleUpdate()
            setCurrentPage(prev => prev - 1)
        }
    }
    useEffect(() => {
        setCurrentQuestion(currentQuestionInit)
        const selectedInit = playerOngoingAnswer[currentPage - 1]?.selectedChoice ?? 'da'
        setSelectedChoice(selectedInit)
        if (currentPage > questions.length) {
            handleSubmit()
            return
        }
    }, [currentPage])
    return (
        <>
            {currentQuestion ?
                <>
                    <section className="w-full flex justify-between items-center">
                        <p className='font-semibold '>{currentPage}/{questions.length}</p>
                        <p className='text-xl font-semibold'>Quiz</p>
                        <OptionDropdown >
                            <DropdownItem value={'test'} />
                        </OptionDropdown>
                    </section>
                    <section className='space-y-5 pt-5 my-5'>
                        {/* progress bar */}
                        <div className="w-full rounded-full h-[20px] bg-zinc-100 overflow-hidden" id='progress-bar'>
                            <div className=" h-full  rounded-r-full bg-red-400 flex items-center justify-end pr-2" style={{ width: `${donePercentage}%` }}>
                                <p className='text-xs text-white'>{donePercentage}%</p>
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
                            <Button className='' onClick={() => handleNextQuestion('next')}>{currentPage == questions.length ? 'Done' : 'Next'}</Button>
                        </div>
                    </section>
                </> :
                <QuizResultStatistic quizResultData={quizResultData} />
            }
        </>
    )
}


interface playPageCardProps {
    mainColor: string,
    shadowColor: string,
    choiceText: string,
    index: 0 | 1 | 2 | 3,
    setSelectedChoice: Dispatch<SetStateAction<string>>,
    isSelected: boolean
}

const PlayPageCard: FC<playPageCardProps> = ({ mainColor, shadowColor, choiceText, index, setSelectedChoice, isSelected }) => {
    function handleOnChange(e: ChangeEvent) {
        setSelectedChoice(getChoiceAplhabet(index))
    }
    // console.log(isSelected);

    const boxShadowStyle = isSelected ? `0px 10px rgba(${shadowColor}` : 'none';
    return (
        <label style={{ backgroundColor: `${mainColor}`, boxShadow: boxShadowStyle }} className='cursor-pointer rounded-xl flex-all-center overflow-y-auto px-3 relative select-none text-white text-xl '>
            <input type="radio" name={`choice`} id={`choice-${index}`} hidden onChange={handleOnChange} value={`${choiceText}`} />
            {getChoiceWithoutAlphabet(choiceText, 1)}
        </label>
    )
}


interface QuizResultStatisticProps {
    quizResultData: {
        quizPercentage: string,
        stats: never[],
        totalCorrectChoice: number
    }
}

const QuizResultStatistic: FC<QuizResultStatisticProps> = ({ quizResultData }) => {
    return <div className='w-full h-screen flex-all-center '>
        <div className="w-full min-h-[600px] border rounded-lg shadow-md bg-slate-700 py-10 px-10">
            <section className="w-full flex justify-center flex-col items-center space-y-5 overflow-hidden">
                <div className='text-5xl font-bold text-white'><span className='text-green-400'>{quizResultData.totalCorrectChoice}</span> / {quizResultData.stats.length}</div>
                <div className="w-full flex gap-x-5">
                    <p className='text-white font-bold'>{quizResultData.quizPercentage}</p>
                    <div className='flex-1 h-5 rounded-md bg-red-400 overflow-hidden'>
                        <span className='h-full bg-green-300 block ' style={{ width: quizResultData.quizPercentage }} ></span>
                    </div>
                </div>
            </section>
            <table className='bg-white table-auto w-full border-collapse border border-slate-500 text-center mt-5'>
                <thead>
                    <tr>
                        <th className='border border-slate-600'>No</th>
                        <th className='border border-slate-600'>Selected Choice</th>
                        <th className='border border-slate-600'>Correct Choice</th>
                    </tr>
                </thead>
                <tbody>
                    {quizResultData.stats.map((item, index) => (
                        <tr className={`${item.status == 'benar' ? 'bg-green-400' : 'bg-red-400'} text-white`} key={index}>
                            <td className='border border-slate-600'>{item.quizNo}</td>
                            <td className='border border-slate-600'>{item.selectedChoice}</td>
                            <td className='border border-slate-600'>{item.correctChoice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default _PlayPageContainer;