import { Button, PreviewPageButtons } from '@/components/client/Button';
import OptionDropDownBuilder from '@/components/client/ui/OptionDropDownBuilder';
import _leaderBoardComponents from './_leaderboardUI/_leaderBoardComponents';
import { getAllParticipant, getQuizById } from '@/helper/db';
import { handleSubmitPreview } from '@/lib/action/discover';
import { QuizObject } from '@/types/questionObject';
import { cn } from '@/utils/style';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface PageProps {
    params: Promise<{ quizId: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    // how this work so we await promise that returning a { quizId: number } object after that we quickly catch that value. 
    const quizId = (await params).quizId;
    const quizData = (await getQuizById(Number(quizId), { with: ['user', 'question'] })) as QuizObject
    const participantData = await getAllParticipant(Number(quizId))
    console.log(participantData);

    const { name, User, question } = quizData
    const { name: username } = User;
    async function handleSubmit(formData: FormData) {

        const test = formData.get('selected_method')
        console.log(test);

    }

    const quizStat = [
        {
            title: 'Question',
            value: `${question.length}`
        },
        {
            title: 'Saved',
            value: '10'
        },
        {
            title: 'Liked',
            value: '10'
        },
        {
            title: 'Played',
            value: '10'
        },
        {
            title: 'Bookmarked',
            value: '10'
        },
    ]
    const enhanceIcon = (icon: React.ReactNode) => {
        if (React.isValidElement(icon)) {
            return React.cloneElement(icon, { size: 10 })
        }
        return icon
    }
    return <>
        <section className="w-full p-3  flex justify-between">
            <Link href={'/home/discover'}>
                <ArrowLeft /></Link>

            <span className='flex gap-x-3'>
                <OptionDropDownBuilder />
            </span>
        </section>
        <div className='w-full min-h-[250px] border rounded-md bg-zinc-50'>

        </div>
        <p className='text-medium'>{name}</p>
        {/* stats */}
        <section className='w-full border-y flex *:border-r '>
            {quizStat.map((item, index) => (
                <div className="flex-all-center flex-col px-3 py-3 flex-1 last:border-r-0" key={index}>
                    <p className='font-semibold'>{item.value}</p>
                    <p className='text-slate-600 font-medium'>{item.title}</p>
                </div>
            ))}
        </section>
        {/* profile */}
        <section className='w-full flex justify-between items-center'>
            <div className="h-[50px] gap-x-3 flex items-center">
                <span className='w-[50px] h-full rounded-full bg-zinc-50'></span>
                <section>
                    <p className='text-slate-700 font-medium'>{username}</p>
                    <p className='text-sm text-slate-500'>@andremkce</p>
                </section>
            </div>
            <Button variant={'outline'} className='rounded-full text-[#5E40D2]'>
                Follow {enhanceIcon(<Plus />)}
            </Button>
        </section>
        {/* description */}
        <section className='space-y-3'>
            <p className='text-slate-700 font-semibold'>Description</p>
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin">
                <p className='text-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus architecto voluptates molestias id esse, perspiciatis facere vitae ducimus, assumenda enim nisi, error impedit. Quos iure distinctio eligendi animi blanditiis minus maiores corrupti nihil, reiciendis atque a cumque illo. Rem modi quidem eveniet, incidunt aperiam veritatis quasi, quis nihil, ratione rerum architecto obcaecati quisquam quibusdam eaque illo consectetur eius atque expedita soluta? Nisi, ratione eum culpa quis corporis sapiente repellendus atque a? Molestiae temporibus voluptate dolorum, optio, quaerat tempora ea reprehenderit omnis tempore quod enim a quia expedita possimus illo soluta exercitationem suscipit. Officiis nobis reiciendis repellendus reprehenderit temporibus voluptatibus in.</p>
            </div>
        </section>
        {/* leaderboard */}
        <_leaderBoardComponents participants={participantData} />

        {/* bottomn*/}
        <PreviewPageButtons quizId={Number(quizId)} quizData={quizData} />

    </>
}


export default Page;