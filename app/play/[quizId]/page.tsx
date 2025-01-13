import DropdownOptionContainer from '@/components/client/Container';
import { DropdownItem, OptionDropdown } from '@/components/client/Dropdown';
import _PlayPageContainer from "../[quizId]/_playPageComponents/_playPageContainer"
import { FC } from 'react';
import { getQuizById } from '@/helper/db';

interface PageProps {
    params: Promise<{ quizId: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    const quizId = (await params).quizId
    const quiz = await getQuizById(Number(quizId), { with: ['question'] })
    console.log(quiz);


    return <article className='py-5 px-10'>
        <_PlayPageContainer />
    </article>
}

export default Page;