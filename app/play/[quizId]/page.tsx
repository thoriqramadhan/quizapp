import DropdownOptionContainer from '@/components/client/Container';
import { DropdownItem, OptionDropdown } from '@/components/client/Dropdown';
import _PlayPageContainer from "../[quizId]/_playPageComponents/_playPageContainer"
import { FC } from 'react';
import { getQuizById } from '@/helper/db';
import { QuestionObjectDB } from '@/types/questionObject';

interface PageProps {
    params: Promise<{ quizId: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    const quizId = (await params).quizId
    const quizObject = await getQuizById(Number(quizId), { with: ['question'] })
    const questionArray = quizObject!.question as QuestionObjectDB[] | []

    return <article className='py-5 px-10'>
        <_PlayPageContainer questions={questionArray} quizId={quizId} />
    </article>
}

export default Page;