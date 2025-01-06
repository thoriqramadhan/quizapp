'use client'
import { Button } from '@/components/client/Button';
import { CardAnswer } from '@/components/client/Card';
import Dropdown from '@/components/client/Dropdown';
import ErrorMessage from '@/components/server/ErrorMessage';
import { InputSection } from '@/components/server/Form';
import { InputLiteral, InputSelect } from '@/components/server/ui/Input';
import { useQuiz } from '@/lib/context/createQuiz';
import { validateString } from '@/lib/validations/global';
import { getChoiceAplhabet } from '@/utils/typhography';
import { questionObjectInitiator } from '@/utils/utils';
import { ArrowLeft, ChevronDown, CircleEllipsis, Plus } from 'lucide-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { IoMdImage } from 'react-icons/io';
import TextareaAutosize from 'react-textarea-autosize';

interface PageProps {

}

// Parent Components
// Parent Only for controlling page switch & save question to localeStorage
const CreateQuiz: FC<PageProps> = ({ }) => {
    const { question, handleChangeQuestion } = useQuiz()
    return <>
        <article className="space-y-5 overflow-hidden w-full">
            {/* V Options */}
            <div className='flex justify-between items-center w-full'>
                <span className='flex items-center gap-x-5'>
                    <ArrowLeft className='cursor-pointer' />
                    <h1 className='text-title'>Create Quiz</h1>
                </span>
                <CircleEllipsis className='cursor-pointer' />
            </div>
            {/* question */}
            {
                !question.pageAt == 0 ? (
                    <>
                        <AnswerContainer />
                    </>
                ) :
                    (
                        <InitialQuestion />
                    )
            }
        </article>
    </>;
}

// Other Componentes 
interface InitialQuestionProps { }

const InitialQuestion: FC<InitialQuestionProps> = () => {
    const { question, handleChangeQuestion } = useQuiz()

    const [errors, setErrors] = useState({ project_name: undefined, tags: undefined })
    function handleFormAction(formData: FormData) {
        const validateProjectName = validateString(5, 10, formData.get('project_name')!.toString())
        const validateTags = validateString(3, 10, formData.get('tags')!.toString())
        let isError = false;
        if (validateProjectName?.error) {
            setErrors(prev => {
                return { ...prev, project_name: validateProjectName!.error }
            })
            isError = true
        }
        if (validateTags?.error) {
            setErrors(prev => {
                return { ...prev, tags: validateProjectName!.error }
            })
            isError = true
        }
        if (isError) {
            return;
        }

        handleChangeQuestion({
            pageAt: question.pageAt + 1,
            projectName: isError ? '' : validateProjectName as string,
            coverImg: '',
            tags: isError ? '' : validateTags as string,
        })
    }
    return (
        <>
            <form action={handleFormAction} className='space-y-5'>
                <label htmlFor="quiz_img" className='w-full border-[3px] h-[240px] flex flex-col items-center justify-center cursor-pointer rounded-3xl bg-zinc-50 border-[#9984EA] gap-y-3'>
                    <IoMdImage color='#9984EA' size={50} />
                    <p className='text-medium text-[#5E40D2]'>Add Cover Image</p>
                    <input type="file" name="quiz_img" id="quiz_img" hidden accept='.jpg | .png' />
                </label>
                <section className='grid grid-cols-1 space-y-5 md:space-y-0 md:grid-cols-2 md:gap-x-5'>
                    <InputSection isRequired={true} name='project_name' error={errors.project_name && <ErrorMessage text={errors.project_name} />}>
                        <InputLiteral name='project_name' type='text' defaultValue={question.projectName} />
                    </InputSection>
                    <InputSection isRequired={true} name='tags' error={errors.tags && <ErrorMessage text={errors.tags} />}>
                        <InputSelect name='tags' option={[{ value: 'test' }, { value: 'test2' }]} defaultValue={question.tags} />
                    </InputSection>
                </section>
                <Button className='w-full' type='submit'>Next</Button>
            </form>
        </>
    )
}
interface AnswerContainerProps { }

export type optionProps = {
    isQuestion?: boolean,
    isAnswer?: boolean,
    isSetCorrectChoice?: boolean,
    answerIndex?: 0 | 1 | 2 | 3
}
type QuestionObject = {
    question: string,
    type: string,
    time: string,
    choice: string[],
    correctChoice: string
}
const AnswerContainer: FC<AnswerContainerProps> = () => {
    const { question, handleChangeQuestion } = useQuiz()
    const questionObjectInit = {
        question: '',
        type: 'quiz',
        time: '',
        choice: [],
        correctChoice: ''
    }
    const [questionObject, setQuestionObject] = useState<QuestionObject>(question!.quiz[question.pageAt - 1] || questionObjectInit)
    const [IsOpenQuestion, setIsOpenQuestion] = useState(false)
    const questionData = questionObject.question


    const timeOptions = [5, 10, 15, 20]


    function handleChange(option: optionProps, value?: string) {
        if (option.isQuestion) {

            setQuestionObject(prev => {
                return {
                    ...prev,
                    question: value
                }
            })
        }
        if (option.isAnswer) {
            if (typeof option.answerIndex !== 'number') {
                throw new Error('answer index needed.')
            }
            const choiceReference = questionObject.choice
            choiceReference[option!.answerIndex!] = `${getChoiceAplhabet(option!.answerIndex!)}${value}`
            setQuestionObject(prev => {
                return {
                    ...prev,
                    choice: choiceReference
                }
            })
        }
        if (option.isSetCorrectChoice) {
            setQuestionObject(prev => {
                return {
                    ...prev,
                    correctChoice: getChoiceAplhabet(option!.answerIndex!)
                }
            })
        }
    }
    function handleTimeChange(value: string | number) {
        setQuestionObject(prev => {
            return {
                ...prev,
                time: value.toString()
            }
        })
    }
    function handleTypeChange(value: string | number) {
        setQuestionObject(prev => {
            return {
                ...prev,
                type: value.toString()
            }
        })
    }
    // Todo handleSubmit
    /*
        1.Validate all data
        2.save to localeStorage
        3.reset all data 
        4.+1 page now
     */
    function handleSubmit() {
        const newQuestionObject = question.quiz;
        newQuestionObject[question.pageAt - 1] = questionObject
        const newQuestion = { ...question, quiz: newQuestionObject, pageAt: question.pageAt + 1 }
        // make a new empty question object
        newQuestion.quiz?.push(questionObjectInit)
        console.log(newQuestion.quiz);

        handleChangeQuestion(newQuestion)
    }
    useEffect(() => {
        setQuestionObject(question!.quiz[question.pageAt - 1] || questionObjectInit)
    }, [question])
    return (
        <>
            <div className="w-full flex gap-x-3">
                <Dropdown className='rounded-2xl font-normal text-sm py-2' defaultValue={timeOptions[0]} dropdownOptions={timeOptions} externalSetter={handleTimeChange} />
                <Dropdown className='rounded-2xl font-normal text-sm py-2' defaultValue={'Quiz'} dropdownOptions={['Quiz']} externalSetter={handleTypeChange} />
            </div>
            {/* question */}
            <label htmlFor="quiz_question" onClick={() => setIsOpenQuestion(true)} className='w-full border-[3px] min-h-[100px] max-h-fit flex rounded-2xl items-center justify-center bg-zinc-50 cursor-pointer overflow-y-auto'>
                {
                    IsOpenQuestion || questionData ? <TextareaAutosize name='quiz_question' value={questionData} onChange={(event) => handleChange({ isQuestion: true }, event.target.value)} className='outline-0 text-center bg-transparent text-medium  font-medium text-zinc-600  w-[500px] resize-none my-2' /> : <h1 className='text-medium font-medium text-zinc-600'>Tap to add question</h1>
                }
            </label>
            {/* answer */}
            <section className='w-full h-[800px] grid md:h-[400px] md:grid-cols-2 md:grid-rows-2 gap-5 mb-5'>
                <CardAnswer mainColor='007AF7' shadowColorRgb='0,92,208' choiceIndex={0} handleChange={handleChange} InitValue={{ defaultValue: questionObject.choice[0], defaultCorrectAnswer: questionObject.correctChoice }} />

                <CardAnswer mainColor='FF3D3E' shadowColorRgb='219,47,47' choiceIndex={1} handleChange={handleChange} InitValue={{ defaultValue: questionObject.choice[1], defaultCorrectAnswer: questionObject.correctChoice }} />

                <CardAnswer mainColor='FF9306' shadowColorRgb='255,103,0' choiceIndex={2} handleChange={handleChange} InitValue={{ defaultValue: questionObject.choice[2], defaultCorrectAnswer: questionObject.correctChoice }} />

                <CardAnswer mainColor='00D796' shadowColorRgb='0,187,122' choiceIndex={3} handleChange={handleChange} InitValue={{ defaultValue: questionObject.choice[3], defaultCorrectAnswer: questionObject.correctChoice }} />

            </section>
            <QuestionView handleSubmit={handleSubmit} />
        </>
    )
}
interface QuestionViewProps {
    handleSubmit: () => void
}

const QuestionView: FC<QuestionViewProps> = ({ handleSubmit }) => {
    const { question, handleChangeQuestion } = useQuiz()
    function handleMainCard() {
        console.log('clicked main');
        handleChangeQuestion({ ...question, pageAt: 0 })
    }
    function handleCard(cardIndex: number) {
        handleChangeQuestion({ ...question, pageAt: cardIndex })
    }

    return (
        <section className='w-full py-5 border-t-[3px] flex-y-center gap-x-10 justify-between'>
            <section className=' max-w-[calc(100%-40px)] flex space-x-5 overflow-x-auto'>
                {/* main card V*/}
                <div className="w-[240px] h-[120px] relative shrink-0 bg-zinc-50 border-[#5E40D2] border-[4px] cursor-pointer rounded-2xl" onClick={handleMainCard}>
                    <span className='absolute bg-[#5E40D2] px-5 py-2 rounded-br-xl text-white'>Main</span>
                </div>
                {
                    question.quiz?.length > 0 && question.quiz!.map((item, index) => (
                        // card 
                        <div onClick={() => handleCard(index + 1)} key={index} className="w-[240px] h-[120px] relative shrink-0 bg-zinc-50 border-[#5E40D2] border-[4px] cursor-pointer rounded-2xl">
                            <span className='absolute bg-[#5E40D2] px-5 py-2 rounded-br-xl text-white'>{index + 1}</span>
                        </div>
                    ))
                }
            </section>
            <Button className='p-5 h-fit rounded-xl' onClick={handleSubmit}><Plus /></Button>
        </section>
    )
}


export default CreateQuiz;