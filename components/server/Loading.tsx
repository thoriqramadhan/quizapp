import { Loader2, LucideProps } from 'lucide-react';
import { FC } from 'react';

interface LoadingProps extends LucideProps {
    size?: number
}

const Loading: FC<LoadingProps> = ({ size }) => {
    return <Loader2 size={size ?? 20} className='animate-spin' />
}

export default Loading;