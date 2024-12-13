import { FC } from 'react';

interface ErrorMessageProps {
    text: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
    return <p className='text-sm text-red-400 tracking-wider font-medium'>{text}</p>
}

export default ErrorMessage;