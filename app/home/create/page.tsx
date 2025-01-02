'use client'
import { Button } from '@/components/client/Button';
import { CardAnswer } from '@/components/client/Card';
import ErrorMessage from '@/components/server/ErrorMessage';
import { InputSection } from '@/components/server/Form';
import { InputLiteral, InputSelect } from '@/components/server/ui/Input';
import { useQuiz } from '@/lib/context/createQuiz';
import { validateString } from '@/lib/validations/global';
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
                !question.isInitial ? (
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
    const [questionData, setQuestionData] = useState({
        projectName: '',
        coverImg: '',
        tags: '',
    })

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
        handleChangeQuestion({
            isInitial: false,
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

const AnswerContainer: FC<AnswerContainerProps> = () => {
    const [IsOpenQuestion, setIsOpenQuestion] = useState(false)
    const inputParent = useRef<HTMLLabelElement>(null)
    useEffect(() => {
        const inputQuestionParent = inputParent!.current
        const inputQuestion = inputQuestionParent?.getElementsByTagName('textarea')[0]
        inputQuestion?.focus()
    }, [IsOpenQuestion])
    return (
        <>
            <div className="w-full flex gap-x-3">
                <Button className='rounded-2xl font-normal text-sm py-2'>
                    10 Sec
                </Button>
                <Button className='rounded-2xl font-medium text-sm py-2 box-border' variant='outline'>
                    Quiz <ChevronDown size={15} />
                </Button>
            </div>
            <label htmlFor="quiz_question" ref={inputParent} onClick={() => setIsOpenQuestion(prev => true)} defaultValue={''} className='w-full border-[3px] min-h-[100px] max-h-fit flex rounded-2xl items-center justify-center bg-zinc-50 cursor-pointer overflow-y-auto'>
                {
                    IsOpenQuestion ? <TextareaAutosize name='quiz_question' className='outline-0 bg-transparent text-medium  font-medium text-zinc-600  w-[500px] resize-none my-2' /> : <h1 className='text-medium font-medium text-zinc-600'>Tap to add question</h1>
                }
            </label>
            <section className='w-full h-[800px] grid md:h-[400px] md:grid-cols-2 md:grid-rows-2 gap-5 mb-5'>
                <CardAnswer mainColor='007AF7' shadowColorRgb='0,92,208' />

                <CardAnswer mainColor='FF3D3E' shadowColorRgb='219,47,47' />

                <CardAnswer mainColor='FF9306' shadowColorRgb='255,103,0' />

                <CardAnswer mainColor='00D796' shadowColorRgb='0,187,122' />

            </section>
            <QuestionView />
        </>
    )
}
interface QuestionViewProps { }

const QuestionView: FC<QuestionViewProps> = () => {
    const { question, handleChangeQuestion } = useQuiz()
    function handleMainCard() {
        console.log('clicked main');

        handleChangeQuestion({ ...question, isInitial: !question.isInitial })

    }
    return (
        <section className='w-full py-5 border-y-[3px] flex-y-center gap-x-10 justify-between'>
            <section className=' max-w-[calc(100%-40px)] flex space-x-5 overflow-x-auto'>
                {/* main card V*/}
                <div className="w-[240px] h-[120px] relative shrink-0 bg-zinc-50 border-[#5E40D2] border-[4px] cursor-pointer rounded-2xl" onClick={handleMainCard}>
                    <span className='absolute bg-[#5E40D2] px-5 py-2 rounded-br-xl text-white'>Main</span>
                </div>
                {
                    question.quiz!.map((item, index) => (
                        <div key={index} className="w-[240px] h-[120px] relative shrink-0 bg-zinc-50 border-[#5E40D2] border-[4px] cursor-pointer rounded-2xl">
                            <span className='absolute bg-[#5E40D2] px-5 py-2 rounded-br-xl text-white'>{index + 1}</span>
                        </div>
                    ))
                }
            </section>
            <Button className='p-5 h-fit rounded-xl'><Plus /></Button>
        </section>
    )
}


export default CreateQuiz;