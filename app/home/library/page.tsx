import { QuizCard } from '@/components/client/Card';
import { getAllOwnedQuiz } from '@/helper/db';
import { QuizObject } from '@/types/questionObject';
import { FC } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = async ({ }) => {
    const ownedQuiz = (await getAllOwnedQuiz())?.savedQuiz
    console.log(ownedQuiz);


    return (
        <>
            <div className='text-title'>Explore Quiz</div>
            <section className="w-full flex gap-5 flex-wrap">
                {
                    ownedQuiz!.map((quiz, index) => (
                        // <div key={index}>{quiz.name}</div>
                        <QuizCard quizObject={quiz} key={index} />
                    ))
                }
            </section>
        </>
    )
}

export default Page;