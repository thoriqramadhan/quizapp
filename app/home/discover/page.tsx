import { QuizCard } from '@/components/client/Card';
import { getAllQuiz } from '@/helper/db';
import { FC } from 'react';

interface DiscoverProps {

}

const DiscoverPage: FC<DiscoverPageProps> = async ({ }) => {
    const quizData = (await getAllQuiz({ with: ['question', 'user'] })) as unknown as QuizObject[]
    return <>
        <div className='text-title'>Explore Quiz</div>
        <section className="w-full flex gap-5 flex-wrap">
            {
                quizData.map((quiz, index) => (
                    <QuizCard quizObject={quiz} key={index} />
                ))
            }
        </section>
    </>
}

export default DiscoverPage;